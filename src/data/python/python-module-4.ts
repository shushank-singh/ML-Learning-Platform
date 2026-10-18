import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule4Data: PythonModuleData = {
  "id": "python-module-4",
  "number": 4,
  "title": "Functions",
  "subtitle": "Parameters, Scope, Closures, Decorators & Higher-Order Functions",
  "description": "Functions are the fundamental unit of code reuse. Master every parameter type, understand Python scoping rules deeply, write closures and decorators, implement recursion, and use higher-order functions like map/filter/reduce to write expressive functional code.",
  "icon": "Workflow",
  "badge": "Functions",
  "estimatedHours": 8,
  "topicsCount": 10,
  "lessons": [
    {
      "id": "py-func-defining",
      "moduleId": "python-module-4",
      "title": "Defining and Calling Functions",
      "description": "def keyword, function signatures, docstrings, return values, and None returns.",
      "order": 1,
      "readTimeMinutes": 18,
      "visualizerType": "execution-trace",
      "difficulty": "Beginner"
    },
    {
      "id": "py-func-parameters",
      "moduleId": "python-module-4",
      "title": "Parameters and Return Values",
      "description": "Positional parameters, returning multiple values via tuples, and early returns.",
      "order": 2,
      "readTimeMinutes": 18,
      "visualizerType": "execution-trace",
      "difficulty": "Beginner"
    },
    {
      "id": "py-func-default-args",
      "moduleId": "python-module-4",
      "title": "Default and Keyword Arguments",
      "description": "Default parameter values, keyword-only arguments, mutable default pitfall.",
      "order": 3,
      "readTimeMinutes": 20,
      "visualizerType": "execution-trace",
      "difficulty": "Beginner"
    },
    {
      "id": "py-func-args-kwargs",
      "moduleId": "python-module-4",
      "title": "*args and **kwargs",
      "description": "Variadic positional and keyword argument packing/unpacking, and combining all parameter types.",
      "order": 4,
      "readTimeMinutes": 22,
      "visualizerType": "execution-trace",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-func-scope",
      "moduleId": "python-module-4",
      "title": "Scope and Namespaces (LEGB Rule)",
      "description": "Local, Enclosing, Global, Built-in scope resolution, global and nonlocal keywords.",
      "order": 5,
      "readTimeMinutes": 25,
      "visualizerType": "memory-model",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-func-lambda",
      "moduleId": "python-module-4",
      "title": "Lambda Functions",
      "description": "Anonymous single-expression functions, use with sorted/map/filter, and lambda limitations.",
      "order": 6,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-func-recursion",
      "moduleId": "python-module-4",
      "title": "Recursion in Python",
      "description": "Base cases, stack frames, Python recursion limit, tail recursion, and memoized recursion.",
      "order": 7,
      "readTimeMinutes": 25,
      "visualizerType": "execution-trace",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-func-higher-order",
      "moduleId": "python-module-4",
      "title": "Higher-Order Functions: map, filter, reduce",
      "description": "Passing functions as arguments, returning functions, functools.reduce, and partial application.",
      "order": 8,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-func-closures",
      "moduleId": "python-module-4",
      "title": "Closures",
      "description": "Functions that capture their enclosing scope, factory functions, and the cell object model.",
      "order": 9,
      "readTimeMinutes": 22,
      "visualizerType": "memory-model",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-func-decorators",
      "moduleId": "python-module-4",
      "title": "Decorators Introduction",
      "description": "Wrapping functions with @syntax, functools.wraps, timing and logging decorators.",
      "order": 10,
      "readTimeMinutes": 28,
      "visualizerType": "execution-trace",
      "difficulty": "Advanced"
    }
  ]
};

export const pythonModule4Lessons: Record<string, PythonLessonContent> = {
  "py-func-scope": {
    "id": "py-func-scope",
    "moduleId": "python-module-4",
    "title": "Scope and Namespaces: The LEGB Rule",
    "subtitle": "Local, Enclosing, Global, and Built-in Scopes, global and nonlocal Keywords",
    "order": 5,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "memory-model",
    "objectives": [
      "Understand how Python resolves variable names using the LEGB order (Local -> Enclosing -> Global -> Built-in)",
      "Distinguish between namespace lookup (reading) and namespace assignment (writing)",
      "Explain the UnboundLocalError and why assigning anywhere inside a function makes a variable local",
      "Use the global keyword responsibly to modify module-level state",
      "Use the nonlocal keyword to rebind variables in outer enclosing functions (closures)",
      "Inspect namespaces programmatically using locals(), globals(), and __builtins__"
    ],
    "prerequisites": [
      "Basic function definitions (def) and return statements",
      "Variables and assignment semantics in Python"
    ],
    "analogy": {
      "title": "The Concentric Security Clearance Rings",
      "text": "Imagine working in a classified facility with concentric security rings: your private desk (Local), the department floor (Enclosing), the whole building (Global), and the federal law library (Built-in). When searching for a document, you look on your desk first. If it is not there, you check your department floor, then the building bulletin board, and finally the federal archives. However, you cannot rewrite a document on the department floor or building bulletin board from your desk without explicit authorization (nonlocal or global credentials).",
      "metaphor": "A namespace is a dictionary mapping names to objects. The LEGB rule is the sequential lookup chain Python walks through when evaluating any unqualified name."
    },
    "problemSolved": {
      "title": "Why Do We Need Scopes and Namespaces?",
      "description": "Without scopes, every variable in an entire codebase would share a single global flat namespace. A variable named \"i\" or \"total\" in one function would overwrite a variable of the same name in another function or third-party library, creating catastrophic bugs.",
      "keyPoints": [
        "Namespace isolation: enables modular programming where function internals cannot accidentally collide",
        "State encapsulation: prevents uncontrolled side effects across distant parts of an application",
        "Closure state retention: allows inner functions to remember state from enclosing functions without global pollution",
        "Fast local variable access: CPython compiles local variable access to LOAD_FAST bytecode using fixed array offsets instead of dictionary lookups"
      ]
    },
    "intuition": {
      "overview": "Python determines variable scope at compile time (when parsing the function), not at runtime. If a variable is assigned anywhere inside a function, Python marks it as local to that function unless explicitly marked global or nonlocal.",
      "steps": [
        {
          "step": 1,
          "title": "L — Local Scope",
          "description": "Names assigned inside a function or passed as parameters. They exist only while the function is actively executing and are discarded when it returns."
        },
        {
          "step": 2,
          "title": "E — Enclosing (Nonlocal) Scope",
          "description": "Names in the local scope of any enclosing/outer functions (relevant in nested functions and closures). Looked up from innermost enclosing to outermost."
        },
        {
          "step": 3,
          "title": "G — Global (Module) Scope",
          "description": "Names defined at the top level of the current module file, or declared global inside a function."
        },
        {
          "step": 4,
          "title": "B — Built-in Scope",
          "description": "Names pre-loaded by Python upon startup: len, range, print, sum, Exception, etc. Accessible from anywhere in any module."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating LEGB, global, and nonlocal",
      "code": "x = \"global\"\n\ndef outer():\n    x = \"enclosing\"\n    count = 0\n    \n    def inner():\n        nonlocal count\n        count += 1\n        x = \"local\"\n        print(f\"Inside inner: x = {x}, count = {count}\")\n    \n    inner()\n    print(f\"Inside outer: x = {x}, count = {count}\")\n\nprint(f\"Module level before: x = {x}\")\nouter()\nprint(f\"Module level after: x = {x}\")",
      "explanation": "Shows how local x shadows enclosing x without mutating it, while nonlocal count enables inner() to mutate the enclosing function's count variable. The module-level global x remains completely unchanged throughout."
    },
    "runnableCode": {
      "code": "x = 100  # Global\n\ndef demo_legb():\n    # Reading global x\n    print(\"Reading global x inside func:\", x)\n\ndef demo_unbound():\n    y = 50\n    def inner():\n        # Notice: attempting to read y before assignment when y is assigned below\n        # causes UnboundLocalError at runtime\n        pass\n    inner()\n\ndef counter_closure():\n    ticks = 0\n    def tick():\n        nonlocal ticks\n        ticks += 1\n        return ticks\n    return tick\n\ndemo_legb()\nc = counter_closure()\nprint(\"Closure tick 1:\", c())\nprint(\"Closure tick 2:\", c())\nprint(\"Closure tick 3:\", c())",
      "expectedOutput": "Reading global x inside func: 100\nClosure tick 1: 1\nClosure tick 2: 2\nClosure tick 3: 3"
    },
    "lineByLineExplanation": [
      {
        "line": "1-5",
        "lines": "1-5",
        "code": "x = 100; def demo_legb(): print(x)",
        "codeSnippet": "x = 100; def demo_legb(): print(x)",
        "explanation": "x is looked up: not in demo_legb's local scope, no enclosing scope, found in global module scope."
      },
      {
        "line": "14-20",
        "lines": "14-20",
        "code": "nonlocal ticks; ticks += 1",
        "codeSnippet": "nonlocal ticks; ticks += 1",
        "explanation": "nonlocal tells Python to look in enclosing outer functions for 'ticks', permitting in-place rebinding."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "UnboundLocalError: local variable referenced before assignment",
        "solution": "If you assign to a variable inside a function (e.g. x += 1), Python marks x as local for the entire function. If you read it before the assignment, you get UnboundLocalError. Use global x or pass x as an argument.",
        "codeExample": "count = 0\ndef increment():\n    # count += 1  # FAILS: UnboundLocalError\n    global count\n    count += 1    # Works: explicitly global"
      },
      {
        "mistake": "Shadowing built-in names (e.g., naming a variable list, sum, or dict)",
        "solution": "Never use Python built-in names as variable or parameter names. It overrides them in the local/global scope.",
        "codeExample": "# BAD:\nlist = [1, 2, 3]\nnew_list = list(\"abc\")  # TypeError: 'list' object is not callable\n\n# GOOD:\nitems = [1, 2, 3]"
      }
    ],
    "bestPractices": [
      "Minimize usage of the global keyword; prefer passing arguments and returning values explicitly",
      "Use closures with nonlocal when you need lightweight state encapsulation without defining a full class",
      "Never shadow built-in functions (len, id, sum, max, min, type, list, dict, str)",
      "Use uppercase SNAKE_CASE for module-level constants (e.g. MAX_RETRIES = 3) to signal read-only intent"
    ],
    "applications": [
      {
        "industry": "Web Frameworks (Flask, FastAPI)",
        "application": "Application context and request state isolation",
        "benefit": "Thread-local or context-local namespaces prevent concurrent requests from leaking state to each other."
      },
      {
        "industry": "Decorators and Middleware",
        "application": "Rate limiting and caching decorators",
        "benefit": "Enclosing scopes retain state (like call counts and timestamps) across wrapped function invocations."
      },
      {
        "industry": "Data Engineering & ETL",
        "application": "Config management and pipeline parameters",
        "benefit": "Module-level configuration cleanly separated from task-level local transformations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "q1",
        "question": "What is the exact search order of the LEGB rule?",
        "hint": "Start from innermost where code executes and move outward.",
        "answer": "1. Local (current function), 2. Enclosing (outer functions in nesting order), 3. Global (module top-level), 4. Built-in (builtins module)."
      },
      {
        "id": "q2",
        "question": "Why does Python raise UnboundLocalError at compile/runtime when you write: x = 10; def f(): print(x); x = 20?",
        "hint": "When does Python decide the scope of a variable?",
        "answer": "During compilation of the function, Python sees 'x = 20' and classifies x as local throughout f(). When print(x) runs first, the local variable x has not yet been assigned a value."
      },
      {
        "id": "q3",
        "question": "What is the key difference between global and nonlocal?",
        "hint": "Where does each keyword direct the name lookup?",
        "answer": "'global' binds the name to the top-level module scope, skipping enclosing scopes. 'nonlocal' binds the name to the nearest enclosing function scope, and cannot bind to global or built-in scope."
      }
    ],
    "quiz": [
      {
        "id": "quiz-1",
        "question": "Where will Python look first when encountering a variable name inside a function?",
        "options": [
          "Global scope",
          "Local scope",
          "Enclosing scope",
          "Built-in scope"
        ],
        "correctIndex": 1,
        "explanation": "Local scope is the first level checked in the LEGB resolution order."
      },
      {
        "id": "quiz-2",
        "question": "What happens if you execute: def f(): nonlocal a; a = 1? (assuming no outer enclosing function)",
        "options": [
          "Creates a global variable a",
          "Creates a local variable a",
          "SyntaxError: no binding for nonlocal 'a' found",
          "Returns None"
        ],
        "correctIndex": 2,
        "explanation": "nonlocal requires an existing binding in an outer enclosing function; otherwise Python raises a SyntaxError."
      },
      {
        "id": "quiz-3",
        "question": "Which built-in function returns a dictionary representing the current local namespace?",
        "options": [
          "globals()",
          "locals()",
          "vars()",
          "dir()"
        ],
        "correctIndex": 1,
        "explanation": "locals() returns a dictionary of the current local symbol table."
      }
    ],
    "codingChallenge": {
      "title": "Stateful Accumulator Factory",
      "problem": "Write a function make_accumulator(initial_value: int) that returns a function add(amount: int) -> int. Each call to add(amount) should increase the running total and return the updated total. Use closures and the nonlocal keyword.",
      "hints": [
        "Define a nested function inside make_accumulator.",
        "Declare total as nonlocal inside the nested function.",
        "Return the nested function without calling it."
      ],
      "starterCode": "def make_accumulator(initial_value: int = 0):\n    # Write your closure here\n    pass",
      "solution": "def make_accumulator(initial_value: int = 0):\n    total = initial_value\n    def add(amount: int) -> int:\n        nonlocal total\n        total += amount\n        return total\n    return add"
    },
    "summary": {
      "keyTakeaways": [
        "LEGB: Local -> Enclosing -> Global -> Built-in is Python's sequential resolution order",
        "Assignment anywhere inside a function makes a variable local unless global or nonlocal is specified",
        "UnboundLocalError happens when a local variable is read before its assignment in the function body",
        "nonlocal enables closures to maintain state across invocations without global variables",
        "CPython optimizes local variable lookup into fast indexed bytecode (LOAD_FAST)"
      ],
      "nextLessonId": "py-func-lambda",
      "nextLessonTitle": "Lambda Functions",
      "nextLessonModuleId": "python-module-4"
    },
    "lineByLine": [
      {
        "line": "1-5",
        "lines": "1-5",
        "code": "x = 100; def demo_legb(): print(x)",
        "codeSnippet": "x = 100; def demo_legb(): print(x)",
        "explanation": "x is looked up: not in demo_legb's local scope, no enclosing scope, found in global module scope."
      },
      {
        "line": "14-20",
        "lines": "14-20",
        "code": "nonlocal ticks; ticks += 1",
        "codeSnippet": "nonlocal ticks; ticks += 1",
        "explanation": "nonlocal tells Python to look in enclosing outer functions for 'ticks', permitting in-place rebinding."
      }
    ]
  },
  "py-func-defining": {
    "id": "py-func-defining",
    "moduleId": "python-module-4",
    "title": "Defining and Calling Functions",
    "subtitle": "def Statement, Function Signatures, Docstrings, and None Returns",
    "order": 1,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Define reusable functions using the def keyword with clear signatures.",
      "Write clean docstrings adhering to PEP 257 standards for documentation.",
      "Understand explicit return statements vs implicit return None.",
      "Understand how functions are first-class objects in Python."
    ],
    "prerequisites": [
      "Python basics and variable assignments."
    ],
    "analogy": {
      "title": "The Bread Bakery Recipe Card",
      "text": "A function is a standardized recipe card. It specifies what ingredients are needed (parameters), the step-by-step baking procedure (function body), and what finished loaf is delivered back to the counter (return value). Anyone in the kitchen can follow the recipe anytime without reinventing bread.",
      "metaphor": "Functions encapsulate reusable logic with defined inputs and predictable outputs."
    },
    "problemSolved": {
      "title": "DRY Principle (Don't Repeat Yourself) and Code Modularity",
      "description": "Without functions, programs become massive monolithic scripts full of duplicated logic. Functions break complex systems down into isolated, testable, and reusable building blocks.",
      "keyPoints": [
        "Functions are declared with `def name(parameters):`.",
        "If a function reaches the end of its body without an explicit `return`, it returns `None`.",
        "Docstrings `\"\"\"...\"\"\"` provide built-in documentation accessible via `help()`."
      ]
    },
    "intuition": {
      "overview": "Executing a `def` statement creates a function object and binds it to a name in the current namespace. Calling the function allocates a new execution frame.",
      "steps": [
        {
          "step": 1,
          "title": "Definition",
          "description": "def compiles function body into a code object and creates a PyFunctionObject."
        },
        {
          "step": 2,
          "title": "Call Invocation",
          "description": "The `()` operator evaluates arguments and pushes a new stack frame."
        },
        {
          "step": 3,
          "title": "Return",
          "description": "Execution completes, pops the frame, and delivers the return value to the caller."
        }
      ]
    },
    "codeExample": {
      "title": "Clean Function with Docstring and Type Annotations",
      "code": "def calculate_tax(subtotal: float, tax_rate: float = 0.08) -> float:\n    \"\"\"Calculate total tax amount rounded to 2 decimal places.\n    \n    Args:\n        subtotal: Pre-tax price.\n        tax_rate: Tax percentage in decimal form (default 8%).\n        \n    Returns:\n        Rounded tax amount.\n    \"\"\"\n    if subtotal < 0:\n        raise ValueError(\"Subtotal cannot be negative\")\n    return round(subtotal * tax_rate, 2)\n\ntax = calculate_tax(100.0)\nprint(f\"Tax due: ${tax}\")",
      "explanation": "Demonstrates type hints, PEP 257 docstring format, input validation, and return value computation."
    },
    "runnableCode": {
      "code": "def greet(name: str) -> str:\n    \"\"\"Return a warm greeting.\"\"\"\n    return f\"Hello, {name}!\"\n\nmsg = greet(\"Learner\")\nprint(msg)\nprint(\"Docstring:\", greet.__doc__.strip())",
      "expectedOutput": "Hello, Learner!\nDocstring: Return a warm greeting."
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "def greet(name: str) -> str:",
        "codeSnippet": "def greet(name: str) -> str:",
        "explanation": "Declares greet function expecting string name and returning str."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    \"\"\"Return a warm greeting.\"\"\"",
        "codeSnippet": "    \"\"\"Return a warm greeting.\"\"\"",
        "explanation": "PEP 257 one-line docstring describing function intent."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    return f\"Hello, {name}!\"",
        "codeSnippet": "    return f\"Hello, {name}!\"",
        "explanation": "Constructs and returns greeting string."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "msg = greet(\"Learner\")",
        "codeSnippet": "msg = greet(\"Learner\")",
        "explanation": "Calls greet, passing \"Learner\" as positional argument."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing `print()` with `return`.",
        "solution": "Always `return` computed values so callers can store or pass them along.",
        "whyWrong": "`print()` outputs text to the console but returns `None`. You cannot capture, chain, or test printed output programmatically.",
        "howToFix": "Always `return` computed values so callers can store or pass them along."
      },
      {
        "mistake": "Calling a function without parentheses: `result = my_func`.",
        "solution": "Use parentheses to invoke the function: `result = my_func()`.",
        "whyWrong": "Binds `result` to the function object itself rather than calling it.",
        "howToFix": "Use parentheses to invoke the function: `result = my_func()`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "API Route Handlers",
        "description": "Expressing controller logic for endpoints in Flask, FastAPI, and Django."
      },
      {
        "title": "Unit Testing",
        "description": "Writing discrete testable units with deterministic inputs and outputs."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-func-defining-pq1",
        "question": "What does a Python function return if it contains no `return` statement?",
        "hint": "Default Python return value.",
        "answer": "It implicitly returns `None`."
      },
      {
        "id": "py-func-defining-pq2",
        "question": "How can you view a function's docstring interactively in Python?",
        "hint": "Built-in function or attribute.",
        "answer": "Using `help(function_name)` or accessing `function_name.__doc__`."
      },
      {
        "id": "py-func-defining-pq3",
        "question": "Are functions first-class objects in Python?",
        "hint": "Can they be assigned to variables and passed to other functions?",
        "answer": "Yes, functions can be assigned to variables, stored in data structures, and passed as arguments."
      }
    ],
    "quiz": [
      {
        "id": "py-func-defining-q1",
        "question": "What keyword defines a function in Python?",
        "options": [
          "function",
          "fn",
          "def",
          "define"
        ],
        "correctIndex": 2,
        "explanation": "Python uses the `def` keyword for function declarations."
      },
      {
        "id": "py-func-defining-q2",
        "question": "What is the return value of: `def f(): x = 5` when called as `result = f()`?",
        "options": [
          "5",
          "0",
          "None",
          "NameError"
        ],
        "correctIndex": 2,
        "explanation": "Functions without an explicit return statement return `None`."
      },
      {
        "id": "py-func-defining-q3",
        "question": "Where should a function docstring be placed?",
        "options": [
          "Above the def line",
          "As the first statement inside the function body",
          "At the end of the module",
          "Inside the return statement"
        ],
        "correctIndex": 1,
        "explanation": "A docstring must be the very first statement inside the function body."
      }
    ],
    "codingChallenge": {
      "title": "Format Full Name and Title",
      "problem": "Write a function `format_name(first: str, last: str, title: str = \"\") -> str` that takes first and last names, capitalizes each (e.g. \"john\" -> \"John\"), and prepends an optional title (e.g. \"Dr. John Doe\", or \"John Doe\" if title is empty).",
      "hints": [
        "Use .capitalize() or .title() on first and last.",
        "Check if title is non-empty before prepending."
      ],
      "starterCode": "def format_name(first: str, last: str, title: str = \"\") -> str:\n    # Write your solution here\n    pass",
      "solution": "def format_name(first: str, last: str, title: str = \"\") -> str:\n    full = f\"{first.capitalize()} {last.capitalize()}\"\n    return f\"{title} {full}\".strip() if title else full",
      "testCases": [
        {
          "input": "\"ada\", \"lovelace\", \"Lady\"",
          "expectedOutput": "\"Lady Ada Lovelace\""
        },
        {
          "input": "\"alan\", \"turing\"",
          "expectedOutput": "\"Alan Turing\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "def greet(name: str) -> str:",
        "codeSnippet": "def greet(name: str) -> str:",
        "explanation": "Declares greet function expecting string name and returning str."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    \"\"\"Return a warm greeting.\"\"\"",
        "codeSnippet": "    \"\"\"Return a warm greeting.\"\"\"",
        "explanation": "PEP 257 one-line docstring describing function intent."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    return f\"Hello, {name}!\"",
        "codeSnippet": "    return f\"Hello, {name}!\"",
        "explanation": "Constructs and returns greeting string."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "msg = greet(\"Learner\")",
        "codeSnippet": "msg = greet(\"Learner\")",
        "explanation": "Calls greet, passing \"Learner\" as positional argument."
      }
    ],
    "applications": [
      {
        "industry": "API Route Handlers",
        "application": "Expressing controller logic for endpoints in Flask, FastAPI, and Django.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "API Route Handlers",
        "description": "Expressing controller logic for endpoints in Flask, FastAPI, and Django."
      },
      {
        "industry": "Unit Testing",
        "application": "Writing discrete testable units with deterministic inputs and outputs.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Unit Testing",
        "description": "Writing discrete testable units with deterministic inputs and outputs."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Define reusable functions using the def keyword with clear signatures.",
        "Write clean docstrings adhering to PEP 257 standards for documentation.",
        "Understand explicit return statements vs implicit return None."
      ]
    }
  },
  "py-func-parameters": {
    "id": "py-func-parameters",
    "moduleId": "python-module-4",
    "title": "Parameters and Return Values",
    "subtitle": "Positional Arguments, Multiple Tuple Returns, and Guard Clauses",
    "order": 2,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Distinguish between formal parameters (in function definitions) and actual arguments (in function calls).",
      "Return multiple values seamlessly using tuple packing and unpacking.",
      "Implement guard clauses with early returns for cleaner code architecture.",
      "Pass arguments positionally and by keyword name."
    ],
    "prerequisites": [
      "Defining basic functions and tuples."
    ],
    "analogy": {
      "title": "The Parcel Delivery Dispatcher",
      "text": "When ordering packages, positional parameters are like standard delivery slots where slot 1 must be Street, slot 2 City, and slot 3 Zip. Keyword arguments are like labeled stickers: even if you hand the envelope upside-down, the clerk reads the \"Zip\" label and routes it correctly.",
      "metaphor": "Positional arguments bind by sequence index; keyword arguments bind by name."
    },
    "problemSolved": {
      "title": "Clean Input/Output Contracts for Functions",
      "description": "Writing functions that take varied inputs and deliver multiple outputs without cumbersome wrapper objects is a hallmark of Pythonic code.",
      "keyPoints": [
        "Returning multiple comma-separated values automatically packs them into a single tuple.",
        "Guard clauses handle validation and edge cases early, eliminating deep indentation.",
        "Positional arguments must precede keyword arguments in function calls."
      ]
    },
    "intuition": {
      "overview": "Python maps caller arguments to function parameters during frame setup. Returning `return a, b` evaluates to the single tuple `(a, b)`.",
      "steps": [
        {
          "step": 1,
          "title": "Argument Binding",
          "description": "Python matches positional arguments first, then binds keyword arguments by parameter name."
        },
        {
          "step": 2,
          "title": "Guard Check",
          "description": "Early return statements exit immediately if conditions are not satisfied."
        },
        {
          "step": 3,
          "title": "Tuple Return",
          "description": "Multiple return values are packed into a tuple and unpacked directly by the caller."
        }
      ]
    },
    "codeExample": {
      "title": "Multiple Returns and Early Guard Clauses",
      "code": "def get_min_max_mean(numbers: list[float]) -> tuple[float, float, float]:\n    \"\"\"Calculate min, max, and mean of a list using guard clause.\"\"\"\n    if not numbers:\n        raise ValueError(\"Number list cannot be empty\")\n        \n    minimum = min(numbers)\n    maximum = max(numbers)\n    mean = sum(numbers) / len(numbers)\n    return minimum, maximum, mean  # Implicit tuple packing\n\n# Unpacking caller side\nlow, high, avg = get_min_max_mean([10.0, 20.0, 30.0])\nprint(f\"Low: {low}, High: {high}, Average: {avg}\")",
      "explanation": "Demonstrates an early guard clause for empty input, followed by returning three values packed into a tuple."
    },
    "runnableCode": {
      "code": "def divide_with_remainder(dividend: int, divisor: int) -> tuple[int, int]:\n    if divisor == 0:\n        return 0, 0\n    quotient = dividend // divisor\n    remainder = dividend % divisor\n    return quotient, remainder\n\nq, r = divide_with_remainder(17, 5)\nprint(f\"17 // 5 = {q} with remainder {r}\")",
      "expectedOutput": "17 // 5 = 3 with remainder 2"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "def divide_with_remainder(dividend: int, divisor: int) -> tuple[int, int]:",
        "codeSnippet": "def divide_with_remainder(dividend: int, divisor: int) -> tuple[int, int]:",
        "explanation": "Function signature accepting two integers and returning a 2-tuple."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    if divisor == 0:",
        "codeSnippet": "    if divisor == 0:",
        "explanation": "Early guard clause checking for division by zero."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "    return quotient, remainder",
        "codeSnippet": "    return quotient, remainder",
        "explanation": "Returns two values separated by comma (packed as a tuple)."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "q, r = divide_with_remainder(17, 5)",
        "codeSnippet": "q, r = divide_with_remainder(17, 5)",
        "explanation": "Unpacks the returned tuple directly into variables q and r."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Putting positional arguments AFTER keyword arguments: `func(a=1, 2)`.",
        "solution": "All positional arguments must come before any keyword arguments: `func(2, a=1)`.",
        "whyWrong": "Raises `SyntaxError: positional argument follows keyword argument`.",
        "howToFix": "All positional arguments must come before any keyword arguments: `func(2, a=1)`."
      },
      {
        "mistake": "Deeply nesting if/else blocks instead of using early returns.",
        "solution": "Invert conditions and return early: `if not valid: return None`.",
        "whyWrong": "Creates \"arrow anti-pattern\" with excessive indentation levels.",
        "howToFix": "Invert conditions and return early: `if not valid: return None`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Mathematical Statistics",
        "description": "Returning coordinates, standard deviations, and regression coefficients simultaneously."
      },
      {
        "title": "Authentication Verification",
        "description": "Returning (is_authenticated: bool, user_id: str, error_message: str)."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-func-parameters-pq1",
        "question": "What actual Python type is returned when a function executes `return 1, 2, 3`?",
        "hint": "Comma separation creates...",
        "answer": "A `tuple`: `(1, 2, 3)`."
      },
      {
        "id": "py-func-parameters-pq2",
        "question": "Can you call a function using keyword arguments in any order?",
        "hint": "Named parameter binding.",
        "answer": "Yes, keyword arguments match parameters by name regardless of order: `func(b=2, a=1)`."
      },
      {
        "id": "py-func-parameters-pq3",
        "question": "What is a \"guard clause\"?",
        "hint": "Control flow pattern.",
        "answer": "A check at the beginning of a function that handles invalid inputs or edge cases and returns early."
      }
    ],
    "quiz": [
      {
        "id": "py-func-parameters-q1",
        "question": "Which of the following function calls is INVALID syntax?",
        "options": [
          "f(1, b=2)",
          "f(a=1, 2)",
          "f(a=1, b=2)",
          "f(1, 2)"
        ],
        "correctIndex": 1,
        "explanation": "Positional arguments cannot follow keyword arguments in Python syntax."
      },
      {
        "id": "py-func-parameters-q2",
        "question": "When unpacking `a, b = get_coords()`, what happens if `get_coords()` returns 3 items?",
        "options": [
          "a and b take first two, third is dropped",
          "ValueError: too many values to unpack",
          "TypeError is raised",
          "b becomes a tuple"
        ],
        "correctIndex": 1,
        "explanation": "Unpacking expects an exact match of target variables to sequence elements; mismatched lengths raise ValueError."
      },
      {
        "id": "py-func-parameters-q3",
        "question": "What is the primary benefit of early returns / guard clauses?",
        "options": [
          "Makes the code execute faster by skipping bytecode",
          "Reduces nesting indentation and clarifies precondition requirements",
          "Allocates less memory on the stack",
          "Enables multi-threading"
        ],
        "correctIndex": 1,
        "explanation": "Guard clauses clarify preconditions and prevent deeply nested \"arrow\" anti-patterns."
      }
    ],
    "codingChallenge": {
      "title": "Compute Bounding Box",
      "problem": "Write a function `compute_bounding_box(points: list[tuple[float, float]]) -> tuple[float, float, float, float]` that accepts a list of `(x, y)` coordinate tuples and returns `(min_x, min_y, max_x, max_y)`. If the list is empty, raise `ValueError(\"No points provided\")`.",
      "hints": [
        "Check if not points: raise ValueError.",
        "Extract all x's with [p[0] for p in points] and y's with [p[1] for p in points].",
        "Compute min and max for both."
      ],
      "starterCode": "def compute_bounding_box(points: list[tuple[float, float]]) -> tuple[float, float, float, float]:\n    # Write your solution here\n    pass",
      "solution": "def compute_bounding_box(points: list[tuple[float, float]]) -> tuple[float, float, float, float]:\n    if not points:\n        raise ValueError(\"No points provided\")\n    xs = [p[0] for p in points]\n    ys = [p[1] for p in points]\n    return min(xs), min(ys), max(xs), max(ys)",
      "testCases": [
        {
          "input": "[(0.0, 5.0), (10.0, -2.0), (3.0, 8.0)]",
          "expectedOutput": "(0.0, -2.0, 10.0, 8.0)"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "def divide_with_remainder(dividend: int, divisor: int) -> tuple[int, int]:",
        "codeSnippet": "def divide_with_remainder(dividend: int, divisor: int) -> tuple[int, int]:",
        "explanation": "Function signature accepting two integers and returning a 2-tuple."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    if divisor == 0:",
        "codeSnippet": "    if divisor == 0:",
        "explanation": "Early guard clause checking for division by zero."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "    return quotient, remainder",
        "codeSnippet": "    return quotient, remainder",
        "explanation": "Returns two values separated by comma (packed as a tuple)."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "q, r = divide_with_remainder(17, 5)",
        "codeSnippet": "q, r = divide_with_remainder(17, 5)",
        "explanation": "Unpacks the returned tuple directly into variables q and r."
      }
    ],
    "applications": [
      {
        "industry": "Mathematical Statistics",
        "application": "Returning coordinates, standard deviations, and regression coefficients simultaneously.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Mathematical Statistics",
        "description": "Returning coordinates, standard deviations, and regression coefficients simultaneously."
      },
      {
        "industry": "Authentication Verification",
        "application": "Returning (is_authenticated: bool, user_id: str, error_message: str).",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Authentication Verification",
        "description": "Returning (is_authenticated: bool, user_id: str, error_message: str)."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Distinguish between formal parameters (in function definitions) and actual arguments (in function calls).",
        "Return multiple values seamlessly using tuple packing and unpacking.",
        "Implement guard clauses with early returns for cleaner code architecture."
      ]
    }
  },
  "py-func-default-args": {
    "id": "py-func-default-args",
    "moduleId": "python-module-4",
    "title": "Default and Keyword Arguments",
    "subtitle": "Default Parameter Values, Keyword-Only Arguments (*), and the Mutable Default Trap",
    "order": 3,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Define functions with sensible default argument values.",
      "Enforce keyword-only arguments using bare asterisk syntax `def f(*, key=val):`.",
      "Understand the critical Python mutable default argument trap and its root cause.",
      "Use the canonical `param=None` idiom to safely handle default mutable containers."
    ],
    "prerequisites": [
      "Python function parameters and mutability."
    ],
    "analogy": {
      "title": "The Restaurant Default Side Order",
      "text": "When ordering a burger combo, the menu says \"comes with french fries\" (default argument). You can accept the default or say \"substitute onion rings\" (keyword override). But imagine if the kitchen put all default fries into one shared communal bowl: every customer who ordered without specifying a side would eat out of the same bowl that prior customers touched! That is the mutable default argument trap.",
      "metaphor": "Default arguments are evaluated once at definition time, sharing state if mutable."
    },
    "problemSolved": {
      "title": "Flexible APIs Without Shared Mutable State Bugs",
      "description": "APIs need flexible options that don't force callers to specify every parameter on every invocation, while preventing insidious bugs caused by shared mutable defaults.",
      "keyPoints": [
        "Default arguments are evaluated once when the `def` statement executes, not on each call.",
        "Using `*` in the parameter list forces all following parameters to be passed by keyword name.",
        "Always use immutable defaults like `None`, strings, or numbers."
      ]
    },
    "intuition": {
      "overview": "CPython stores default parameter values in the function object's `__defaults__` tuple at compile/definition time.",
      "steps": [
        {
          "step": 1,
          "title": "Evaluation at Def Time",
          "description": "Default expressions are evaluated when Python first reads the def line."
        },
        {
          "step": 2,
          "title": "Binding to __defaults__",
          "description": "The resulting values are stored on the function object."
        },
        {
          "step": 3,
          "title": "Call-Time Substitution",
          "description": "If caller omits the argument, Python copies the reference from `__defaults__`."
        }
      ]
    },
    "codeExample": {
      "title": "Keyword-Only Arguments and the None Default Pattern",
      "code": "def connect_db(host: str, port: int = 5432, *, timeout: int = 30, retries: int = 3):\n    \"\"\"Host and port are positional/keyword; timeout and retries are strictly keyword-only.\"\"\"\n    print(f\"Connecting to {host}:{port} with timeout={timeout}s, retries={retries}\")\n\n# Safe mutable default pattern\ndef append_log(entry: str, log_list: list[str] | None = None) -> list[str]:\n    if log_list is None:\n        log_list = []\n    log_list.append(entry)\n    return log_list\n\nconnect_db(\"localhost\", timeout=15) # port defaults to 5432\nprint(append_log(\"Event 1\"))\nprint(append_log(\"Event 2\")) # Independent list!",
      "explanation": "Shows `*` enforcing keyword-only arguments, and the standard `if param is None:` idiom preventing shared mutable state."
    },
    "runnableCode": {
      "code": "def create_user(username, *, is_admin=False):\n    return {\"username\": username, \"admin\": is_admin}\n\n# Valid call\nprint(create_user(\"alice\", is_admin=True))\n\n# create_user(\"bob\", True) would raise TypeError: takes 1 positional argument but 2 were given",
      "expectedOutput": "{'username': 'alice', 'admin': True}"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "def create_user(username, *, is_admin=False):",
        "codeSnippet": "def create_user(username, *, is_admin=False):",
        "explanation": "The bare `*` enforces that is_admin MUST be passed as a keyword argument."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    return {\"username\": username, \"admin\": is_admin}",
        "codeSnippet": "    return {\"username\": username, \"admin\": is_admin}",
        "explanation": "Constructs and returns user dictionary."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(create_user(\"alice\", is_admin=True))",
        "codeSnippet": "print(create_user(\"alice\", is_admin=True))",
        "explanation": "Passes username positionally and is_admin by keyword."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Defining `def add_item(item, basket=[]):` with a mutable default.",
        "solution": "Use `basket=None` and initialize `if basket is None: basket = []` inside the function.",
        "whyWrong": "The exact same list instance in `__defaults__` is modified on every call where `basket` is omitted.",
        "howToFix": "Use `basket=None` and initialize `if basket is None: basket = []` inside the function."
      },
      {
        "mistake": "Putting non-default arguments after default arguments: `def f(a=1, b):`.",
        "solution": "All parameters with default values must appear after parameters without defaults.",
        "whyWrong": "Raises `SyntaxError: non-default argument follows default argument`.",
        "howToFix": "All parameters with default values must appear after parameters without defaults."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Configuration Clients",
        "description": "HTTP client libraries (requests, httpx) setting default timeouts and retry counts."
      },
      {
        "title": "Defensive API Design",
        "description": "Keyword-only flags (`*, force=False`) preventing accidental boolean flips in production code."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-func-default-args-pq1",
        "question": "When are default parameter values evaluated in Python?",
        "hint": "Definition time vs call time.",
        "answer": "Once at function definition time (when the `def` statement executes)."
      },
      {
        "id": "py-func-default-args-pq2",
        "question": "What does a bare asterisk `*` in a parameter list signify?",
        "hint": "Positional vs keyword separator.",
        "answer": "It marks the boundary after which all subsequent parameters must be passed as keyword arguments."
      },
      {
        "id": "py-func-default-args-pq3",
        "question": "Where does Python store a function's default values at runtime?",
        "hint": "Dunder attribute on the function object.",
        "answer": "In the `__defaults__` (positional defaults) and `__kwdefaults__` (keyword-only defaults) attributes."
      }
    ],
    "quiz": [
      {
        "id": "py-func-default-args-q1",
        "question": "What happens when `def f(x=[]): x.append(1); return x` is called twice: `f(); print(f())`?",
        "options": [
          "[1]",
          "[1, 1]",
          "TypeError",
          "None"
        ],
        "correctIndex": 1,
        "explanation": "The default list `x` is created once and mutated on each call, producing `[1, 1]` on the second call."
      },
      {
        "id": "py-func-default-args-q2",
        "question": "Which syntax enforces that `retry` MUST be passed by keyword name?",
        "options": [
          "def f(a, retry: keyword):",
          "def f(a, *, retry=3):",
          "def f(a, **retry):",
          "def f(a, (retry=3)):"
        ],
        "correctIndex": 1,
        "explanation": "A bare `*` forces all subsequent parameters to be keyword-only."
      },
      {
        "id": "py-func-default-args-q3",
        "question": "Why must non-default parameters precede default parameters?",
        "options": [
          "To conserve stack memory",
          "To avoid ambiguity when matching positional arguments",
          "Python bytecode does not support it",
          "For PEP 8 style only"
        ],
        "correctIndex": 1,
        "explanation": "Otherwise Python cannot determine which arguments bind to which positional parameters unambiguously."
      }
    ],
    "codingChallenge": {
      "title": "Configure Retry Policy",
      "problem": "Write a function `configure_request(url: str, *, method: str = \"GET\", headers: dict | None = None, max_retries: int = 3) -> dict` that returns a dictionary of request configuration. Ensure `headers` defaults to an empty dictionary without suffering from the mutable default trap, and enforce keyword-only arguments for method, headers, and max_retries.",
      "hints": [
        "Check if headers is None, set to {}.",
        "Return a dict with keys \"url\", \"method\", \"headers\", \"max_retries\"."
      ],
      "starterCode": "def configure_request(url: str, *, method: str = \"GET\", headers: dict | None = None, max_retries: int = 3) -> dict:\n    # Write your solution here\n    pass",
      "solution": "def configure_request(url: str, *, method: str = \"GET\", headers: dict | None = None, max_retries: int = 3) -> dict:\n    if headers is None:\n        headers = {}\n    return {\n        \"url\": url,\n        \"method\": method,\n        \"headers\": headers,\n        \"max_retries\": max_retries\n    }",
      "testCases": [
        {
          "input": "\"https://api.example.com\"",
          "expectedOutput": "{\"url\": \"https://api.example.com\", \"method\": \"GET\", \"headers\": {}, \"max_retries\": 3}"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "def create_user(username, *, is_admin=False):",
        "codeSnippet": "def create_user(username, *, is_admin=False):",
        "explanation": "The bare `*` enforces that is_admin MUST be passed as a keyword argument."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    return {\"username\": username, \"admin\": is_admin}",
        "codeSnippet": "    return {\"username\": username, \"admin\": is_admin}",
        "explanation": "Constructs and returns user dictionary."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(create_user(\"alice\", is_admin=True))",
        "codeSnippet": "print(create_user(\"alice\", is_admin=True))",
        "explanation": "Passes username positionally and is_admin by keyword."
      }
    ],
    "applications": [
      {
        "industry": "Configuration Clients",
        "application": "HTTP client libraries (requests, httpx) setting default timeouts and retry counts.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Configuration Clients",
        "description": "HTTP client libraries (requests, httpx) setting default timeouts and retry counts."
      },
      {
        "industry": "Defensive API Design",
        "application": "Keyword-only flags (`*, force=False`) preventing accidental boolean flips in production code.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Defensive API Design",
        "description": "Keyword-only flags (`*, force=False`) preventing accidental boolean flips in production code."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Define functions with sensible default argument values.",
        "Enforce keyword-only arguments using bare asterisk syntax `def f(*, key=val):`.",
        "Understand the critical Python mutable default argument trap and its root cause."
      ]
    }
  },
  "py-func-args-kwargs": {
    "id": "py-func-args-kwargs",
    "moduleId": "python-module-4",
    "title": "*args and **kwargs",
    "subtitle": "Variadic Positional & Keyword Arguments, Unpacking Calls, and Forwarding",
    "order": 4,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "execution-trace",
    "objectives": [
      "Accept arbitrary positional arguments packed into a tuple via *args.",
      "Accept arbitrary keyword arguments packed into a dict via **kwargs.",
      "Unpack collections into function calls using `func(*my_list)` and `func(**my_dict)`.",
      "Forward arguments transparently in wrapper functions and decorators."
    ],
    "prerequisites": [
      "Function parameters and tuples/dictionaries."
    ],
    "analogy": {
      "title": "The Universal Shipping Container",
      "text": "A standard function call is like shipping specific items in custom molded slots. Using `*args` is like tossing any number of loose items into a sturdy canvas sack (a tuple). Using `**kwargs` is like packing a box where every item has a color-coded sticky label attached (a dictionary).",
      "metaphor": "*args packs positional parameters into a tuple; **kwargs packs keyword parameters into a dict."
    },
    "problemSolved": {
      "title": "Building Highly Dynamic and Forwarding Interfaces",
      "description": "When building decorator wrappers, subclass initializers, or mathematical aggregators (like sum or max), functions cannot know in advance how many arguments callers will supply. `*args` and `**kwargs` provide universal argument flexibility.",
      "keyPoints": [
        "`*args` gathers uncaptured positional arguments into a `tuple`.",
        "`**kwargs` gathers uncaptured keyword arguments into a `dict`.",
        "The formal parameter ordering is: positional -> default -> *args -> keyword-only -> **kwargs."
      ]
    },
    "intuition": {
      "overview": "During argument binding, Python captures any surplus positional values into `args` and any surplus keyword arguments into `kwargs`.",
      "steps": [
        {
          "step": 1,
          "title": "Positional Matching",
          "description": "Explicit positional parameters are satisfied first."
        },
        {
          "step": 2,
          "title": "*args Packing",
          "description": "All remaining positional values are packed into a tuple."
        },
        {
          "step": 3,
          "title": "**kwargs Packing",
          "description": "All remaining keyword pairs are packed into a dictionary."
        }
      ]
    },
    "codeExample": {
      "title": "Universal Argument Wrapper / Forwarder",
      "code": "def logger_wrapper(func):\n    def inner(*args, **kwargs):\n        print(f\"Calling {func.__name__} with args={args}, kwargs={kwargs}\")\n        result = func(*args, **kwargs) # Forwarding unpacking\n        print(f\"{func.__name__} returned {result}\")\n        return result\n    return inner\n\n@logger_wrapper\ndef multiply(a, b, factor=1):\n    return (a * b) * factor\n\nmultiply(3, 4, factor=2)",
      "explanation": "Demonstrates *args and **kwargs in an inner wrapper capturing all inputs and forwarding them via call unpacking."
    },
    "runnableCode": {
      "code": "def calculate_total(*prices, tax_rate=0.05, **discounts):\n    subtotal = sum(prices)\n    discount_total = sum(discounts.values())\n    net = max(0, subtotal - discount_total)\n    return round(net * (1 + tax_rate), 2)\n\ntotal = calculate_total(10.0, 25.0, 15.0, coupon=5.0, promo=2.0)\nprint(f\"Final Total: ${total}\")",
      "expectedOutput": "Final Total: $50.4"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "def calculate_total(*prices, tax_rate=0.05, **discounts):",
        "codeSnippet": "def calculate_total(*prices, tax_rate=0.05, **discounts):",
        "explanation": "Gathers variable prices into tuple prices, and arbitrary discounts into dict discounts."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    subtotal = sum(prices)",
        "codeSnippet": "    subtotal = sum(prices)",
        "explanation": "Sums all values in the prices tuple."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    discount_total = sum(discounts.values())",
        "codeSnippet": "    discount_total = sum(discounts.values())",
        "explanation": "Sums all numeric values provided via keyword discounts."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "total = calculate_total(10.0, 25.0, 15.0, coupon=5.0, promo=2.0)",
        "codeSnippet": "total = calculate_total(10.0, 25.0, 15.0, coupon=5.0, promo=2.0)",
        "explanation": "Passes three positional numbers and two keyword discounts."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Putting `**kwargs` before `*args` in a function definition.",
        "solution": "Follow strict ordering: `def f(pos, *args, kw_only, **kwargs):`.",
        "whyWrong": "Raises `SyntaxError: invalid syntax`. `**kwargs` must always be the very last parameter.",
        "howToFix": "Follow strict ordering: `def f(pos, *args, kw_only, **kwargs):`."
      },
      {
        "mistake": "Forgetting the asterisk when unpacking: `func(my_list)` instead of `func(*my_list)`.",
        "solution": "Use `*` for sequences and `**` for dictionaries.",
        "whyWrong": "Passes the entire list as a single argument instead of unpacking elements individually.",
        "howToFix": "Use `*` for sequences and `**` for dictionaries."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Decorator Middleware",
        "description": "Writing decorators that can wrap any function signature without knowing its parameters in advance."
      },
      {
        "title": "Inheritance `super().__init__()`",
        "description": "Passing leftover configuration keyword arguments up the class inheritance chain."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-func-args-kwargs-pq1",
        "question": "What type is `args` inside a function defined with `def f(*args):`?",
        "hint": "Tuple or list?",
        "answer": "A `tuple`."
      },
      {
        "id": "py-func-args-kwargs-pq2",
        "question": "What type is `kwargs` inside a function defined with `def f(**kwargs):`?",
        "hint": "Key-value map type.",
        "answer": "A `dict`."
      },
      {
        "id": "py-func-args-kwargs-pq3",
        "question": "How can you unpack a dictionary `d = {\"a\": 1, \"b\": 2}` into a function call?",
        "hint": "Double asterisk.",
        "answer": "`my_function(**d)`."
      }
    ],
    "quiz": [
      {
        "id": "py-func-args-kwargs-q1",
        "question": "Which parameter order is legal in Python?",
        "options": [
          "def f(**kwargs, *args):",
          "def f(*args, a):",
          "def f(**kwargs, a=1):",
          "def f(*args, **kwargs, a):"
        ],
        "correctIndex": 1,
        "explanation": "`*args` can be followed by keyword-only parameter `a`, which comes before `**kwargs`."
      },
      {
        "id": "py-func-args-kwargs-q2",
        "question": "What does `*` do when used inside a function call like `func(*[1, 2, 3])`?",
        "options": [
          "Multiplies the elements",
          "Unpacks the list into positional arguments",
          "Converts elements to strings",
          "Creates a generator"
        ],
        "correctIndex": 1,
        "explanation": "In a call, `*` unpacks an iterable into separate positional arguments."
      },
      {
        "id": "py-func-args-kwargs-q3",
        "question": "If `def f(*args): return len(args)` is called with `f()`, what does it return?",
        "options": [
          "0",
          "None",
          "TypeError",
          "1"
        ],
        "correctIndex": 0,
        "explanation": "When no arguments are passed, `args` is an empty tuple `()`, so `len(args)` is 0."
      }
    ],
    "codingChallenge": {
      "title": "Flexible Query String Builder",
      "problem": "Write a function `build_query(base_url: str, *path_segments: str, **params: str | int) -> str` that concatenates `base_url` with any number of `path_segments` separated by \"/\", and appends URL query parameters sorted alphabetically by key: `\"url/seg1/seg2?key1=val1&key2=val2\"` (omit \"?\" if params is empty).",
      "hints": [
        "Strip trailing slashes and join path segments with \"/\".",
        "Format params sorted alphabetically: [f\"{k}={v}\" for k, v in sorted(params.items())].",
        "Join params with \"&\" and prepend \"?\"."
      ],
      "starterCode": "def build_query(base_url: str, *path_segments: str, **params: str | int) -> str:\n    # Write your solution here\n    pass",
      "solution": "def build_query(base_url: str, *path_segments: str, **params: str | int) -> str:\n    url = base_url.rstrip(\"/\")\n    if path_segments:\n        url += \"/\" + \"/\".join(s.strip(\"/\") for s in path_segments)\n    if params:\n        query_str = \"&\".join(f\"{k}={v}\" for k, v in sorted(params.items()))\n        url += \"?\" + query_str\n    return url",
      "testCases": [
        {
          "input": "\"https://api.io\", \"v1\", \"users\", limit=10, active=1",
          "expectedOutput": "\"https://api.io/v1/users?active=1&limit=10\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "def calculate_total(*prices, tax_rate=0.05, **discounts):",
        "codeSnippet": "def calculate_total(*prices, tax_rate=0.05, **discounts):",
        "explanation": "Gathers variable prices into tuple prices, and arbitrary discounts into dict discounts."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    subtotal = sum(prices)",
        "codeSnippet": "    subtotal = sum(prices)",
        "explanation": "Sums all values in the prices tuple."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    discount_total = sum(discounts.values())",
        "codeSnippet": "    discount_total = sum(discounts.values())",
        "explanation": "Sums all numeric values provided via keyword discounts."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "total = calculate_total(10.0, 25.0, 15.0, coupon=5.0, promo=2.0)",
        "codeSnippet": "total = calculate_total(10.0, 25.0, 15.0, coupon=5.0, promo=2.0)",
        "explanation": "Passes three positional numbers and two keyword discounts."
      }
    ],
    "applications": [
      {
        "industry": "Decorator Middleware",
        "application": "Writing decorators that can wrap any function signature without knowing its parameters in advance.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Decorator Middleware",
        "description": "Writing decorators that can wrap any function signature without knowing its parameters in advance."
      },
      {
        "industry": "Inheritance `super().__init__()`",
        "application": "Passing leftover configuration keyword arguments up the class inheritance chain.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Inheritance `super().__init__()`",
        "description": "Passing leftover configuration keyword arguments up the class inheritance chain."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Accept arbitrary positional arguments packed into a tuple via *args.",
        "Accept arbitrary keyword arguments packed into a dict via **kwargs.",
        "Unpack collections into function calls using `func(*my_list)` and `func(**my_dict)`."
      ]
    }
  },
  "py-func-lambda": {
    "id": "py-func-lambda",
    "moduleId": "python-module-4",
    "title": "Lambda Functions",
    "subtitle": "Anonymous Single-Expression Functions, Key Functions, and Limitations",
    "order": 6,
    "readTimeMinutes": 18,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Define concise single-expression anonymous functions with the lambda keyword.",
      "Use lambdas as custom sort keys for sorted(), list.sort(), min(), and max().",
      "Understand lambda limitations: expressions only, no statements, no annotations.",
      "Follow PEP 8 guidelines on when to prefer a named def over a lambda."
    ],
    "prerequisites": [
      "Python functions and sorting basics."
    ],
    "analogy": {
      "title": "The Sticky Note Formula",
      "text": "A `def` function is a permanent hardbound operations manual with an official title, table of contents, and index. A `lambda` is a quick calculation scrawled on a sticky note (\"double this and add 1\") used once to solve an immediate step and thrown away immediately.",
      "metaphor": "Lambdas are disposable inline functions for quick syntactic shortcuts."
    },
    "problemSolved": {
      "title": "Inline Functions for Higher-Order Operations",
      "text": "When sorting records or mapping values, defining a full 3-line `def` function for a single trivial operation clutters code. Lambdas allow defining small transformation functions directly at the call site.",
      "keyPoints": [
        "Syntax: `lambda arguments: expression` (the expression is implicitly returned).",
        "Cannot contain statements like `if/else` statements (must use conditional expressions `x if c else y`), loops, or `return`.",
        "Most commonly used as the `key=` argument in `sorted()`, `min()`, and `max()`."
      ]
    },
    "intuition": {
      "overview": "A lambda creates a standard function object whose code body evaluates a single expression and returns its result.",
      "steps": [
        {
          "step": 1,
          "title": "Argument Evaluation",
          "description": "Arguments specified before the colon are bound in the lambda's local scope."
        },
        {
          "step": 2,
          "title": "Expression Evaluation",
          "description": "The single expression after the colon is computed."
        },
        {
          "step": 3,
          "title": "Return",
          "description": "The computed value is returned immediately."
        }
      ]
    },
    "codeExample": {
      "title": "Custom Sorting with Lambda Key Functions",
      "code": "students = [\n    {\"name\": \"Alice\", \"grade\": 88, \"age\": 20},\n    {\"name\": \"Bob\", \"grade\": 95, \"age\": 22},\n    {\"name\": \"Charlie\", \"grade\": 95, \"age\": 19}\n]\n\n# Sort by grade descending, then age ascending\nsorted_students = sorted(\n    students,\n    key=lambda s: (-s[\"grade\"], s[\"age\"])\n)\n\nfor s in sorted_students:\n    print(f\"{s['name']}: Grade {s['grade']}, Age {s['age']}\")",
      "explanation": "Uses a lambda returning a tuple key `(-grade, age)` to achieve multi-criteria sorting in a single pass."
    },
    "runnableCode": {
      "code": "words = [\"elephant\", \"cat\", \"hippopotamus\", \"dog\"]\n# Sort by word length\nby_length = sorted(words, key=lambda w: len(w))\nprint(\"By length:\", by_length)\n\n# Quick mathematical transform\nsquare = lambda x: x ** 2\nprint(\"5 squared:\", square(5))",
      "expectedOutput": "By length: ['cat', 'dog', 'elephant', 'hippopotamus']\n5 squared: 25"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "words = [\"elephant\", \"cat\", \"hippopotamus\", \"dog\"]",
        "codeSnippet": "words = [\"elephant\", \"cat\", \"hippopotamus\", \"dog\"]",
        "explanation": "List of strings with varying lengths."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "by_length = sorted(words, key=lambda w: len(w))",
        "codeSnippet": "by_length = sorted(words, key=lambda w: len(w))",
        "explanation": "Passes lambda extracting length of each word as the sort key."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "square = lambda x: x ** 2",
        "codeSnippet": "square = lambda x: x ** 2",
        "explanation": "Defines lambda taking x and returning x ** 2."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assigning a lambda to a variable: `f = lambda x: x + 1` (PEP 8 anti-pattern).",
        "solution": "Use standard def: `def f(x): return x + 1`.",
        "whyWrong": "Loses function name in stack traces and tracebacks (`<lambda>` instead of function name).",
        "howToFix": "Use standard def: `def f(x): return x + 1`."
      },
      {
        "mistake": "Trying to include statements inside a lambda: `lambda x: print(x); return x`.",
        "solution": "Use a regular `def` statement when multiple lines or statements are needed.",
        "whyWrong": "Raises `SyntaxError`. Lambdas only permit a single expression.",
        "howToFix": "Use a regular `def` statement when multiple lines or statements are needed."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Custom Dataframe Sorting",
        "description": "Sorting Pandas and SQL-like tables by calculated metrics."
      },
      {
        "title": "Event Callbacks",
        "description": "Passing quick inline parameter bindings to GUI button click handlers."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-func-lambda-pq1",
        "question": "What is the syntax of a lambda expression in Python?",
        "hint": "Keyword, parameters, colon, expression.",
        "answer": "`lambda param1, param2: expression`."
      },
      {
        "id": "py-func-lambda-pq2",
        "question": "Why does PEP 8 discourage `my_func = lambda x: x * 2`?",
        "hint": "Debugging and stack traces.",
        "answer": "Because `def my_func(x): return x * 2` gives the function an explicit `__name__` for better stack traces and readability."
      },
      {
        "id": "py-func-lambda-pq3",
        "question": "How can you write an if/else condition inside a lambda?",
        "hint": "Ternary conditional expression.",
        "answer": "Using ternary syntax: `lambda x: \"even\" if x % 2 == 0 else \"odd\"`."
      }
    ],
    "quiz": [
      {
        "id": "py-func-lambda-q1",
        "question": "Which of the following can a Python lambda function contain?",
        "options": [
          "A while loop",
          "A single expression",
          "An assert statement",
          "A try/except block"
        ],
        "correctIndex": 1,
        "explanation": "Python lambdas can only contain a single expression."
      },
      {
        "id": "py-func-lambda-q2",
        "question": "What is the output of `(lambda a, b: a * b + 1)(3, 4)`?",
        "options": [
          "13",
          "12",
          "7",
          "SyntaxError"
        ],
        "correctIndex": 0,
        "explanation": "Evaluates `3 * 4 + 1 = 13`."
      },
      {
        "id": "py-func-lambda-q3",
        "question": "What does the `key` argument in `sorted(items, key=...)` expect?",
        "options": [
          "A boolean flag",
          "A function that takes an element and returns its comparison key",
          "A dictionary of keys",
          "An integer column index"
        ],
        "correctIndex": 1,
        "explanation": "The `key` parameter takes a callable that extracts a comparison key from each element."
      }
    ],
    "codingChallenge": {
      "title": "Sort Coordinates by Distance",
      "problem": "Write a function `sort_by_distance(points: list[tuple[float, float]], origin: tuple[float, float] = (0.0, 0.0)) -> list[tuple[float, float]]` that returns points sorted in ascending order of Euclidean distance from the origin point using a lambda key.",
      "hints": [
        "Euclidean distance squared is (x - ox)**2 + (y - oy)**2.",
        "Use sorted(points, key=lambda p: (p[0] - origin[0])**2 + (p[1] - origin[1])**2)."
      ],
      "starterCode": "def sort_by_distance(points: list[tuple[float, float]], origin: tuple[float, float] = (0.0, 0.0)) -> list[tuple[float, float]]:\n    # Write your solution here\n    pass",
      "solution": "def sort_by_distance(points: list[tuple[float, float]], origin: tuple[float, float] = (0.0, 0.0)) -> list[tuple[float, float]]:\n    ox, oy = origin\n    return sorted(points, key=lambda p: (p[0] - ox)**2 + (p[1] - oy)**2)",
      "testCases": [
        {
          "input": "[(3.0, 4.0), (1.0, 1.0), (0.0, 2.0)], (0.0, 0.0)",
          "expectedOutput": "[(1.0, 1.0), (0.0, 2.0), (3.0, 4.0)]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "words = [\"elephant\", \"cat\", \"hippopotamus\", \"dog\"]",
        "codeSnippet": "words = [\"elephant\", \"cat\", \"hippopotamus\", \"dog\"]",
        "explanation": "List of strings with varying lengths."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "by_length = sorted(words, key=lambda w: len(w))",
        "codeSnippet": "by_length = sorted(words, key=lambda w: len(w))",
        "explanation": "Passes lambda extracting length of each word as the sort key."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "square = lambda x: x ** 2",
        "codeSnippet": "square = lambda x: x ** 2",
        "explanation": "Defines lambda taking x and returning x ** 2."
      }
    ],
    "applications": [
      {
        "industry": "Custom Dataframe Sorting",
        "application": "Sorting Pandas and SQL-like tables by calculated metrics.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Custom Dataframe Sorting",
        "description": "Sorting Pandas and SQL-like tables by calculated metrics."
      },
      {
        "industry": "Event Callbacks",
        "application": "Passing quick inline parameter bindings to GUI button click handlers.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Event Callbacks",
        "description": "Passing quick inline parameter bindings to GUI button click handlers."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Define concise single-expression anonymous functions with the lambda keyword.",
        "Use lambdas as custom sort keys for sorted(), list.sort(), min(), and max().",
        "Understand lambda limitations: expressions only, no statements, no annotations."
      ]
    }
  },
  "py-func-recursion": {
    "id": "py-func-recursion",
    "moduleId": "python-module-4",
    "title": "Recursion in Python",
    "subtitle": "Base Cases, Stack Frames, sys.getrecursionlimit(), and Memoization",
    "order": 7,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "execution-trace",
    "objectives": [
      "Design recursive functions with verified base cases and self-reducing recursive steps.",
      "Trace call stack frames and understand how Python manages call memory.",
      "Understand Python's recursion limit (sys.getrecursionlimit()) and RecursionError.",
      "Apply functools.lru_cache for transparent memoization of recursive functions."
    ],
    "prerequisites": [
      "Python functions and stack intuition."
    ],
    "analogy": {
      "title": "The Russian Matryoshka Doll",
      "text": "A recursive function is like opening a Russian nesting doll. You open a large doll to find an identical but smaller doll inside (recursive step). You repeat this until you reach the solid miniature doll that cannot be opened (the base case). Then you close each doll back up in reverse order to complete the assembly.",
      "metaphor": "Recursion solves problems by delegating to smaller instances of the same problem until reaching a base case."
    },
    "problemSolved": {
      "title": "Solving Naturally Hierarchical and Self-Similar Problems",
      "description": "Problems involving trees, graphs, nested directories, and divide-and-conquer algorithms (like Quicksort and Merge Sort) are vastly simpler and more elegant to express recursively than iteratively.",
      "keyPoints": [
        "Every recursive function MUST have at least one base case that stops execution.",
        "Python does NOT perform tail-call optimization (TCO); each call consumes a stack frame.",
        "Standard recursion limit is 1000 frames to prevent C stack overflow."
      ]
    },
    "intuition": {
      "overview": "Each recursive call pushes a new execution frame with its own local variables onto the call stack. Upon reaching the base case, return values propagate back down the stack.",
      "steps": [
        {
          "step": 1,
          "title": "Base Case Check",
          "description": "If terminal condition is reached, return base value immediately without recursing."
        },
        {
          "step": 2,
          "title": "Recursive Call",
          "description": "Call the function with modified arguments moving closer to the base case."
        },
        {
          "step": 3,
          "title": "Unwinding",
          "description": "Combine results as stack frames pop and return."
        }
      ]
    },
    "codeExample": {
      "title": "Memoized Recursive Fibonacci with functools.lru_cache",
      "code": "from functools import lru_cache\n\n# Without cache: O(2^N) exponential time!\n# With lru_cache: O(N) linear time!\n@lru_cache(maxsize=None)\ndef fibonacci(n: int) -> int:\n    \"\"\"Calculate the nth Fibonacci number recursively with memoization.\"\"\"\n    if n < 0:\n        raise ValueError(\"n must be non-negative\")\n    if n in (0, 1):\n        return n  # Base cases\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(\"Fibonacci(50):\", fibonacci(50))",
      "explanation": "Shows base cases for 0 and 1, followed by memoization turning exponential recursion into linear time."
    },
    "runnableCode": {
      "code": "def sum_nested(data):\n    \"\"\"Recursively sum all numbers in deeply nested lists.\"\"\"\n    total = 0\n    for item in data:\n        if isinstance(item, list):\n            total += sum_nested(item)  # Recurse into sublist\n        else:\n            total += item              # Base element\n    return total\n\nnested = [1, [2, [3, 4], 5], [6, 7]]\nprint(\"Total sum:\", sum_nested(nested))",
      "expectedOutput": "Total sum: 28"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "def sum_nested(data):",
        "codeSnippet": "def sum_nested(data):",
        "explanation": "Defines recursive function accepting a nested list structure."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "    if isinstance(item, list):",
        "codeSnippet": "    if isinstance(item, list):",
        "explanation": "Checks if current element is a nested container."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "        total += sum_nested(item)",
        "codeSnippet": "        total += sum_nested(item)",
        "explanation": "Recursive call to sum contents of the child list."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "        total += item",
        "codeSnippet": "        total += item",
        "explanation": "Base case addition when element is a number."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Omitting or improperly checking the base case.",
        "solution": "Always write and test base conditions first before writing recursive calls.",
        "whyWrong": "Leads to infinite recursion, raising `RecursionError: maximum recursion depth exceeded`.",
        "howToFix": "Always write and test base conditions first before writing recursive calls."
      },
      {
        "mistake": "Assuming Python optimizes tail recursion like Scheme or Haskell.",
        "solution": "Convert deep recursive algorithms (>1000 depth) to iterative loops with explicit stacks.",
        "whyWrong": "Python purposefully does not support Tail Call Elimination (TCO) to maintain accurate stack traces.",
        "howToFix": "Convert deep recursive algorithms (>1000 depth) to iterative loops with explicit stacks."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Filesystem Directory Walkers",
        "description": "Traversing arbitrary directory trees and nested folders recursively."
      },
      {
        "title": "Abstract Syntax Tree (AST) Parsing",
        "description": "Compilers and linters walking syntax trees to analyze code structures."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-func-recursion-pq1",
        "question": "What error is raised when a recursive function in Python runs without hitting a base case?",
        "hint": "Depth exceeded error.",
        "answer": "`RecursionError: maximum recursion depth exceeded`."
      },
      {
        "id": "py-func-recursion-pq2",
        "question": "What is the default recursion depth limit in CPython?",
        "hint": "Roughly how many frames?",
        "answer": "Default is typically 1,000 frames (inspectable via `sys.getrecursionlimit()`)."
      },
      {
        "id": "py-func-recursion-pq3",
        "question": "Why does `@functools.lru_cache` drastically accelerate recursive Fibonacci?",
        "hint": "Eliminates redundant subproblems.",
        "answer": "It caches previously computed results in a hash map, reducing time complexity from O(2^N) to O(N)."
      }
    ],
    "quiz": [
      {
        "id": "py-func-recursion-q1",
        "question": "What essential component must every recursive function possess?",
        "options": [
          "A global variable",
          "At least one base case",
          "A while loop",
          "A decorator"
        ],
        "correctIndex": 1,
        "explanation": "Without a base case, recursion continues indefinitely until exhausting the call stack."
      },
      {
        "id": "py-func-recursion-q2",
        "question": "Does Python automatically optimize tail-recursive functions?",
        "options": [
          "Yes, always",
          "Only when compiled with -O flag",
          "No, Python never optimizes tail calls",
          "Yes, for integers only"
        ],
        "correctIndex": 2,
        "explanation": "Python intentionally does not perform Tail Call Optimization to preserve complete stack traces."
      },
      {
        "id": "py-func-recursion-q3",
        "question": "Which module allows you to check or increase the recursion limit in Python?",
        "options": [
          "os",
          "sys",
          "math",
          "functools"
        ],
        "correctIndex": 1,
        "explanation": "`sys.getrecursionlimit()` and `sys.setrecursionlimit()` reside in the `sys` module."
      }
    ],
    "codingChallenge": {
      "title": "Flatten Arbitrarily Nested Lists",
      "problem": "Write a recursive function `flatten(nested_list: list) -> list` that takes an arbitrarily deeply nested list of integers and returns a single flat list containing all elements in left-to-right order.",
      "hints": [
        "Iterate over items in nested_list.",
        "If item is list, recursively call flatten(item) and extend result.",
        "Else append item directly."
      ],
      "starterCode": "def flatten(nested_list: list) -> list:\n    # Write your solution here\n    pass",
      "solution": "def flatten(nested_list: list) -> list:\n    result = []\n    for item in nested_list:\n        if isinstance(item, list):\n            result.extend(flatten(item))\n        else:\n            result.append(item)\n    return result",
      "testCases": [
        {
          "input": "[1, [2, [3, 4], 5], [6]]",
          "expectedOutput": "[1, 2, 3, 4, 5, 6]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "def sum_nested(data):",
        "codeSnippet": "def sum_nested(data):",
        "explanation": "Defines recursive function accepting a nested list structure."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "    if isinstance(item, list):",
        "codeSnippet": "    if isinstance(item, list):",
        "explanation": "Checks if current element is a nested container."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "        total += sum_nested(item)",
        "codeSnippet": "        total += sum_nested(item)",
        "explanation": "Recursive call to sum contents of the child list."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "        total += item",
        "codeSnippet": "        total += item",
        "explanation": "Base case addition when element is a number."
      }
    ],
    "applications": [
      {
        "industry": "Filesystem Directory Walkers",
        "application": "Traversing arbitrary directory trees and nested folders recursively.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Filesystem Directory Walkers",
        "description": "Traversing arbitrary directory trees and nested folders recursively."
      },
      {
        "industry": "Abstract Syntax Tree (AST) Parsing",
        "application": "Compilers and linters walking syntax trees to analyze code structures.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Abstract Syntax Tree (AST) Parsing",
        "description": "Compilers and linters walking syntax trees to analyze code structures."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Design recursive functions with verified base cases and self-reducing recursive steps.",
        "Trace call stack frames and understand how Python manages call memory.",
        "Understand Python's recursion limit (sys.getrecursionlimit()) and RecursionError."
      ]
    }
  },
  "py-func-higher-order": {
    "id": "py-func-higher-order",
    "moduleId": "python-module-4",
    "title": "Higher-Order Functions: map, filter, reduce",
    "subtitle": "Functions as First-Class Citizens, functools.reduce, and functools.partial",
    "order": 8,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Understand higher-order functions: functions that take or return other functions.",
      "Use built-in map() and filter() generators for lazy data transformations.",
      "Use functools.reduce() for iterative accumulators and folding.",
      "Create specialized functions using functools.partial."
    ],
    "prerequisites": [
      "Python functions and lambda expressions."
    ],
    "analogy": {
      "title": "The Manufacturing Assembly Line",
      "text": "A standard function is a machine that processes an apple into juice. A higher-order function is the factory manager: they take a whole conveyor belt of fruit and plug in whichever specific processing machine (slicer, peeler, juicer) you deliver into their hands.",
      "metaphor": "Higher-order functions accept behavior as data."
    },
    "problemSolved": {
      "title": "Expressive Functional Transformations Without Explicit Loops",
      "description": "Traditional imperative loops require manual accumulator variables and index tracking. Higher-order functions abstract iteration patterns into standard operations (transform, filter, accumulate).",
      "keyPoints": [
        "`map(func, iterable)` applies func to every item lazily.",
        "`filter(predicate, iterable)` yields only items where predicate(item) is True.",
        "`functools.reduce(func, iterable, [initial])` folds an iterable down to a single value.",
        "`functools.partial(func, *args, **kwargs)` freezes certain arguments to create a simpler callable."
      ]
    },
    "intuition": {
      "overview": "Because Python functions are first-class objects (instances of `function`), they can be stored in variables, passed into arguments, and returned from other functions.",
      "steps": [
        {
          "step": 1,
          "title": "Passing Callables",
          "description": "Caller passes function reference without parentheses."
        },
        {
          "step": 2,
          "title": "Lazy Iteration",
          "description": "map and filter return iterators that process items on demand (O(1) memory)."
        },
        {
          "step": 3,
          "title": "Partial Application",
          "description": "functools.partial binds fixed arguments, returning a new callable wrapper."
        }
      ]
    },
    "codeExample": {
      "title": "map, filter, reduce, and partial in Practice",
      "code": "from functools import reduce, partial\n\nnums = [1, 2, 3, 4, 5, 6]\n\n# map & filter\nevens = filter(lambda x: x % 2 == 0, nums)\nsquared_evens = list(map(lambda x: x ** 2, evens))\nprint(\"Squared evens:\", squared_evens)\n\n# reduce: compute product\nproduct = reduce(lambda acc, val: acc * val, nums, 1)\nprint(\"Product:\", product)\n\n# partial application\ndef power(base, exponent):\n    return base ** exponent\n\nsquare = partial(power, exponent=2)\ncube = partial(power, exponent=3)\nprint(\"Square of 7:\", square(7))\nprint(\"Cube of 3:\", cube(3))",
      "explanation": "Demonstrates map, filter, reduce for computation, and partial for freezing function parameters."
    },
    "runnableCode": {
      "code": "from functools import reduce\n\nwords = [\"Data\", \"Science\", \"Python\", \"Mastery\"]\n# Concatenate with hyphen using reduce\ncombined = reduce(lambda a, b: f\"{a}-{b}\", words)\nprint(\"Hyphenated:\", combined)\n\n# Filter words longer than 5 chars\nlong_words = list(filter(lambda w: len(w) > 5, words))\nprint(\"Long words:\", long_words)",
      "expectedOutput": "Hyphenated: Data-Science-Python-Mastery\nLong words: ['Science', 'Python', 'Mastery']"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "from functools import reduce",
        "codeSnippet": "from functools import reduce",
        "explanation": "Imports reduce from standard library functools."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "combined = reduce(lambda a, b: f\"{a}-{b}\", words)",
        "codeSnippet": "combined = reduce(lambda a, b: f\"{a}-{b}\", words)",
        "explanation": "Folds words list from left to right joining elements with \"-\"."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "long_words = list(filter(lambda w: len(w) > 5, words))",
        "codeSnippet": "long_words = list(filter(lambda w: len(w) > 5, words))",
        "explanation": "Filters words keeping only those with length > 5, cast to list."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `map` and `filter` when list comprehensions are cleaner in Python.",
        "solution": "Use list comprehensions unless working with pre-existing named functions or infinite iterators.",
        "whyWrong": "Python style guides generally prefer `[f(x) for x in seq if cond(x)]` over chained `map(..., filter(...))` for readability.",
        "howToFix": "Use list comprehensions unless working with pre-existing named functions or infinite iterators."
      },
      {
        "mistake": "Forgetting that `map()` and `filter()` return lazy iterators in Python 3.",
        "solution": "Wrap in `list(...)` if multiple passes or index access are required.",
        "whyWrong": "Printing them directly shows `<map object at 0x...>` instead of values, and they can only be consumed once.",
        "howToFix": "Wrap in `list(...)` if multiple passes or index access are required."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Data Cleaning Pipelines",
        "description": "Applying sanitizers and validators across streaming data records."
      },
      {
        "title": "Event Callbacks with Partial",
        "description": "Binding specific button IDs to a shared click handler in UI frameworks."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-func-higher-order-pq1",
        "question": "What does `functools.partial` return?",
        "hint": "New callable wrapper.",
        "answer": "A `partial` object (a callable that invokes the original function with pre-filled arguments)."
      },
      {
        "id": "py-func-higher-order-pq2",
        "question": "Why does `map(func, [1, 2, 3])` not immediately print `[f(1), f(2), f(3)]`?",
        "hint": "Lazy evaluation.",
        "answer": "Because `map` returns a lazy iterator in Python 3 that yields values only when iterated over."
      },
      {
        "id": "py-func-higher-order-pq3",
        "question": "What is the Pythonic alternative to `list(map(lambda x: x*2, nums))`?",
        "hint": "Comprehension syntax.",
        "answer": "A list comprehension: `[x * 2 for x in nums]`."
      }
    ],
    "quiz": [
      {
        "id": "py-func-higher-order-q1",
        "question": "Where does the `reduce` function live in modern Python 3?",
        "options": [
          "Built-in namespace",
          "functools module",
          "itertools module",
          "math module"
        ],
        "correctIndex": 1,
        "explanation": "In Python 3, `reduce` was moved from built-ins to the `functools` module."
      },
      {
        "id": "py-func-higher-order-q2",
        "question": "What does `filter(None, [0, 1, False, 2, \"\", 3])` return when cast to list?",
        "options": [
          "[0, 1, 2, 3]",
          "[1, 2, 3]",
          "[False, \"\"]",
          "[]"
        ],
        "correctIndex": 1,
        "explanation": "Passing `None` as the predicate to `filter()` filters out all falsy elements, keeping truthy ones (`[1, 2, 3]`)."
      },
      {
        "id": "py-func-higher-order-q3",
        "question": "What is the return type of `map(str, [1, 2, 3])` in Python 3?",
        "options": [
          "list",
          "tuple",
          "map iterator",
          "generator"
        ],
        "correctIndex": 2,
        "explanation": "In Python 3, `map` returns a lazy `map` iterator object."
      }
    ],
    "codingChallenge": {
      "title": "Pipeline Composition Engine",
      "problem": "Write a function `compose_pipeline(*functions)` that takes any number of single-argument functions and returns a new function representing their composition from left to right: `pipeline(x) = fn_last(...(fn_1(x)))`. If no functions are given, return the identity function.",
      "hints": [
        "Return an inner function that takes x.",
        "Iterate over functions, updating x = fn(x).",
        "Or use functools.reduce."
      ],
      "starterCode": "def compose_pipeline(*functions):\n    # Write your solution here\n    pass",
      "solution": "def compose_pipeline(*functions):\n    def pipeline(x):\n        result = x\n        for fn in functions:\n            result = fn(result)\n        return result\n    return pipeline",
      "testCases": [
        {
          "input": "add1 = lambda x: x + 1; double = lambda x: x * 2; pipeline = compose_pipeline(add1, double); pipeline(3)",
          "expectedOutput": "8"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "from functools import reduce",
        "codeSnippet": "from functools import reduce",
        "explanation": "Imports reduce from standard library functools."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "combined = reduce(lambda a, b: f\"{a}-{b}\", words)",
        "codeSnippet": "combined = reduce(lambda a, b: f\"{a}-{b}\", words)",
        "explanation": "Folds words list from left to right joining elements with \"-\"."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "long_words = list(filter(lambda w: len(w) > 5, words))",
        "codeSnippet": "long_words = list(filter(lambda w: len(w) > 5, words))",
        "explanation": "Filters words keeping only those with length > 5, cast to list."
      }
    ],
    "applications": [
      {
        "industry": "Data Cleaning Pipelines",
        "application": "Applying sanitizers and validators across streaming data records.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Data Cleaning Pipelines",
        "description": "Applying sanitizers and validators across streaming data records."
      },
      {
        "industry": "Event Callbacks with Partial",
        "application": "Binding specific button IDs to a shared click handler in UI frameworks.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Event Callbacks with Partial",
        "description": "Binding specific button IDs to a shared click handler in UI frameworks."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand higher-order functions: functions that take or return other functions.",
        "Use built-in map() and filter() generators for lazy data transformations.",
        "Use functools.reduce() for iterative accumulators and folding."
      ]
    }
  },
  "py-func-closures": {
    "id": "py-func-closures",
    "moduleId": "python-module-4",
    "title": "Closures",
    "subtitle": "Enclosing Scope Binding, Factory Functions, and the __closure__ Cell Model",
    "order": 9,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "memory-model",
    "objectives": [
      "Understand what constitutes a closure: nested function retaining access to outer enclosing scope.",
      "Use the nonlocal keyword to rebind variables in enclosing scopes.",
      "Inspect cell objects and free variables via `__closure__` and `__code__.co_freevars`.",
      "Write factory functions that generate customized specialized functions."
    ],
    "prerequisites": [
      "Python scope (LEGB rule) and functions as first-class objects."
    ],
    "analogy": {
      "title": "The Backpack of the Traveling Explorer",
      "text": "When a function finishes running, its local variables are usually packed away and destroyed. But when an inner function is created that references those variables and is returned outside, Python straps a durable backpack (`__closure__` cells) onto the inner function containing those specific variables so it can carry them wherever it travels.",
      "metaphor": "A closure is a function bundled together with references to its surrounding lexical environment."
    },
    "problemSolved": {
      "title": "Encapsulating State Without Full Object-Oriented Boilerplate",
      "description": "When you need a stateful function (like a counter or custom multiplier) without the verbosity of a full class with `__init__` and `self`, closures provide lightweight data hiding and state retention.",
      "keyPoints": [
        "A closure requires: 1. A nested function; 2. Referencing a variable in enclosing scope; 3. The enclosing function returns the inner function.",
        "`nonlocal` allows modifying enclosing variables without creating new local variables.",
        "Python stores captured variables in `cell` objects referenced by `func.__closure__`."
      ]
    },
    "intuition": {
      "overview": "When Python compiles an inner function that accesses outer variables, it marks them as free variables. The outer function wraps them in heap-allocated cell objects.",
      "steps": [
        {
          "step": 1,
          "title": "Cell Allocation",
          "description": "Outer function creates a cell object on the heap holding the shared variable reference."
        },
        {
          "step": 2,
          "title": "Inner Binding",
          "description": "Inner function's `__closure__` tuple references this same cell object."
        },
        {
          "step": 3,
          "title": "State Persistence",
          "description": "Even after outer function returns, the cell remains in memory as long as inner function exists."
        }
      ]
    },
    "codeExample": {
      "title": "Stateful Counter Closure with nonlocal",
      "code": "def make_counter(start: int = 0):\n    \"\"\"Factory function producing a stateful counter closure.\"\"\"\n    count = start  # Enclosing variable\n    \n    def counter(step: int = 1) -> int:\n        nonlocal count  # Rebinds enclosing variable\n        count += step\n        return count\n        \n    return counter\n\nc1 = make_counter(10)\nprint(\"c1 step 1:\", c1())   # 11\nprint(\"c1 step 5:\", c1(5))  # 16\n\n# Inspecting closure cell\nprint(\"Free variables:\", c1.__code__.co_freevars)\nprint(\"Cell content:\", c1.__closure__[0].cell_contents)",
      "explanation": "Demonstrates nonlocal rebinding and inspecting `__code__.co_freevars` and `__closure__[0].cell_contents`."
    },
    "runnableCode": {
      "code": "def make_multiplier(factor):\n    def multiply(x):\n        return x * factor\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\n\nprint(\"Double 5:\", double(5))\nprint(\"Triple 5:\", triple(5))",
      "expectedOutput": "Double 5: 10\nTriple 5: 15"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "def make_multiplier(factor):",
        "codeSnippet": "def make_multiplier(factor):",
        "explanation": "Outer factory function accepting factor."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    def multiply(x):",
        "codeSnippet": "    def multiply(x):",
        "explanation": "Inner function referencing factor from enclosing scope."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "        return x * factor",
        "codeSnippet": "        return x * factor",
        "explanation": "Computes product using enclosing factor."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "    return multiply",
        "codeSnippet": "    return multiply",
        "explanation": "Returns inner function object preserving enclosing environment."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Trying to mutate an enclosing immutable variable without `nonlocal`: `count += 1`.",
        "solution": "Declare `nonlocal count` inside the inner function before modifying it.",
        "whyWrong": "Python treats assignment as a declaration of a local variable, raising `UnboundLocalError: local variable referenced before assignment`.",
        "howToFix": "Declare `nonlocal count` inside the inner function before modifying it."
      },
      {
        "mistake": "Creating closures inside a loop: `funcs = [lambda: i for i in range(3)]`.",
        "solution": "Bind at definition time using a default argument: `funcs = [lambda i=i: i for i in range(3)]`.",
        "whyWrong": "Late binding: all lambdas bind to the SAME variable `i`, which has value 2 when the loop finishes.",
        "howToFix": "Bind at definition time using a default argument: `funcs = [lambda i=i: i for i in range(3)]`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Decorator Architecture",
        "description": "Decorators are built directly on closure mechanics to wrap functions."
      },
      {
        "title": "Configurable Middleware",
        "description": "Generating request authenticators with pre-baked API secrets."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-func-closures-pq1",
        "question": "What three criteria are required to form a closure in Python?",
        "hint": "Nested function, enclosing reference, return.",
        "answer": "1. A nested function; 2. It references a variable in an outer enclosing function; 3. The outer function returns the nested function."
      },
      {
        "id": "py-func-closures-pq2",
        "question": "Why is the `nonlocal` keyword necessary when incrementing a counter in a closure?",
        "hint": "Assignment creates local variables.",
        "answer": "Because `count += 1` performs assignment, which Python interprets as creating a local variable unless declared `nonlocal`."
      },
      {
        "id": "py-func-closures-pq3",
        "question": "How can you inspect the value stored inside a closure cell programmatically?",
        "hint": "Dunder attribute.",
        "answer": "Via `func.__closure__[index].cell_contents`."
      }
    ],
    "quiz": [
      {
        "id": "py-func-closures-q1",
        "question": "What is the output of `def make(): x=5; return lambda: x; f=make(); f()`?",
        "options": [
          "5",
          "None",
          "NameError: x is not defined",
          "0"
        ],
        "correctIndex": 0,
        "explanation": "The lambda forms a closure capturing `x=5`, so calling `f()` returns 5."
      },
      {
        "id": "py-func-closures-q2",
        "question": "Which keyword tells Python to rebind a variable in an outer enclosing function?",
        "options": [
          "global",
          "outer",
          "nonlocal",
          "closure"
        ],
        "correctIndex": 2,
        "explanation": "The `nonlocal` keyword allows rebinding identifiers in nearest enclosing (non-global) scopes."
      },
      {
        "id": "py-func-closures-q3",
        "question": "Given `funcs = [lambda: i for i in range(3)]`, what does `[f() for f in funcs]` return?",
        "options": [
          "[0, 1, 2]",
          "[2, 2, 2]",
          "[3, 3, 3]",
          "[0, 0, 0]"
        ],
        "correctIndex": 1,
        "explanation": "Due to late binding in Python closures, all lambdas look up the variable `i` at call time, when `i` is 2."
      }
    ],
    "codingChallenge": {
      "title": "Create Stateful Rate Limiter Closure",
      "problem": "Write a factory function `make_rate_limiter(max_calls: int)` that returns a closure `allow_call() -> bool`. Each time `allow_call()` is called, it increments an internal invocation count and returns `True` if total calls <= `max_calls`, or `False` if the limit has been exceeded.",
      "hints": [
        "Initialize calls = 0 in enclosing scope.",
        "Use nonlocal calls inside allow_call().",
        "Increment calls and return calls <= max_calls."
      ],
      "starterCode": "def make_rate_limiter(max_calls: int):\n    # Write your solution here\n    pass",
      "solution": "def make_rate_limiter(max_calls: int):\n    calls = 0\n    def allow_call() -> bool:\n        nonlocal calls\n        calls += 1\n        return calls <= max_calls\n    return allow_call",
      "testCases": [
        {
          "input": "limiter = make_rate_limiter(2); [limiter(), limiter(), limiter()]",
          "expectedOutput": "[True, True, False]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "def make_multiplier(factor):",
        "codeSnippet": "def make_multiplier(factor):",
        "explanation": "Outer factory function accepting factor."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    def multiply(x):",
        "codeSnippet": "    def multiply(x):",
        "explanation": "Inner function referencing factor from enclosing scope."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "        return x * factor",
        "codeSnippet": "        return x * factor",
        "explanation": "Computes product using enclosing factor."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "    return multiply",
        "codeSnippet": "    return multiply",
        "explanation": "Returns inner function object preserving enclosing environment."
      }
    ],
    "applications": [
      {
        "industry": "Decorator Architecture",
        "application": "Decorators are built directly on closure mechanics to wrap functions.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Decorator Architecture",
        "description": "Decorators are built directly on closure mechanics to wrap functions."
      },
      {
        "industry": "Configurable Middleware",
        "application": "Generating request authenticators with pre-baked API secrets.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Configurable Middleware",
        "description": "Generating request authenticators with pre-baked API secrets."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand what constitutes a closure: nested function retaining access to outer enclosing scope.",
        "Use the nonlocal keyword to rebind variables in enclosing scopes.",
        "Inspect cell objects and free variables via `__closure__` and `__code__.co_freevars`."
      ]
    }
  },
  "py-func-decorators": {
    "id": "py-func-decorators",
    "moduleId": "python-module-4",
    "title": "Decorators Introduction",
    "subtitle": "Function Wrapping with @syntax, functools.wraps, and Practical Decorators",
    "order": 10,
    "readTimeMinutes": 28,
    "difficulty": "Advanced",
    "visualizerType": "execution-trace",
    "objectives": [
      "Understand how the `@decorator` syntax translates to syntactic sugar for `func = decorator(func)`.",
      "Write robust decorators supporting any argument signature using `*args` and `**kwargs`.",
      "Preserve function metadata (__name__, __doc__, annotations) using `@functools.wraps`.",
      "Implement practical decorators for timing, logging, validation, and memoization."
    ],
    "prerequisites": [
      "Python higher-order functions, *args/**kwargs, and closures."
    ],
    "analogy": {
      "title": "The Gift Box and Ribbon",
      "text": "A function is a birthday gift. A decorator is the shiny wrapping paper, ribbon, and greeting tag you place around the box. When someone opens the gift, the ribbon and paper are handled first (pre-processing), the gift inside is revealed (function call), and a thank-you note is sent back (post-processing). The original gift was never physically altered.",
      "metaphor": "Decorators wrap existing functions to extend behavior without modifying original source code."
    },
    "problemSolved": {
      "title": "Cross-Cutting Concerns and Aspect-Oriented Programming",
      "description": "Concerns like execution timing, access control authentication, telemetry logging, and retry logic must often be applied across dozens of functions. Decorators eliminate repetitive boilerplate by encapsulating cross-cutting logic cleanly.",
      "keyPoints": [
        "`@my_decorator` placed above `def f():` is syntactic sugar for `f = my_decorator(f)`.",
        "Always decorate inner wrappers with `@functools.wraps(func)` to preserve introspection.",
        "Decorators can take arguments by adding a third outer function layer."
      ]
    },
    "intuition": {
      "overview": "A decorator is a callable that accepts a function object as an argument and returns a new callable (usually a closure wrapping the original).",
      "steps": [
        {
          "step": 1,
          "title": "Wrapping",
          "description": "When Python encounters @dec, it passes the newly compiled function into dec."
        },
        {
          "step": 2,
          "title": "Wrapper Definition",
          "description": "The decorator returns an inner wrapper function that intercepts calls."
        },
        {
          "step": 3,
          "title": "Metadata Preservation",
          "description": "@functools.wraps copies __name__, __doc__, and annotations from the target to the wrapper."
        }
      ]
    },
    "codeExample": {
      "title": "Production Timing and Logging Decorator",
      "code": "import time\nfrom functools import wraps\n\ndef time_it(func):\n    \"\"\"Decorator measuring and reporting execution duration.\"\"\"\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start_time = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start_time\n        print(f\"[{func.__name__}] finished in {elapsed:.6f}s\")\n        return result\n    return wrapper\n\n@time_it\ndef compute_sum(n: int) -> int:\n    \"\"\"Sum integers from 0 to n-1.\"\"\"\n    return sum(range(n))\n\nval = compute_sum(100_000)\nprint(f\"Result: {val}\")\nprint(f\"Preserved Name: {compute_sum.__name__}\")\nprint(f\"Preserved Doc: {compute_sum.__doc__}\")",
      "explanation": "Demonstrates a complete decorator using @wraps, timing measurement, and metadata verification."
    },
    "runnableCode": {
      "code": "from functools import wraps\n\ndef repeat(num_times):\n    \"\"\"Decorator factory accepting parameters.\"\"\"\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            results = []\n            for _ in range(num_times):\n                results.append(func(*args, **kwargs))\n            return results\n        return wrapper\n    return decorator\n\n@repeat(num_times=3)\ndef roll_dice():\n    return 6\n\nprint(\"Repeated calls:\", roll_dice())",
      "expectedOutput": "Repeated calls: [6, 6, 6]"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "def repeat(num_times):",
        "codeSnippet": "def repeat(num_times):",
        "explanation": "Outer decorator factory taking decorator arguments."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "    def decorator(func):",
        "codeSnippet": "    def decorator(func):",
        "explanation": "Actual decorator taking the target function."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "        @wraps(func)",
        "codeSnippet": "        @wraps(func)",
        "explanation": "Preserves function metadata on wrapper."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "        def wrapper(*args, **kwargs):",
        "codeSnippet": "        def wrapper(*args, **kwargs):",
        "explanation": "Wrapper function intercepting calls."
      },
      {
        "line": 14,
        "lines": "14",
        "code": "@repeat(num_times=3)",
        "codeSnippet": "@repeat(num_times=3)",
        "explanation": "Applies repeat decorator configured with num_times=3."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting `@functools.wraps(func)` on the inner wrapper.",
        "solution": "Always decorate the inner wrapper with `@wraps(func)`.",
        "whyWrong": "Overwrites the decorated function's `__name__` with \"wrapper\" and wipes out its `__doc__`, breaking debugging and auto-generated API docs.",
        "howToFix": "Always decorate the inner wrapper with `@wraps(func)`."
      },
      {
        "mistake": "Forgetting to return the result of `func(*args, **kwargs)` from the wrapper.",
        "solution": "Store `result = func(...)` and `return result` at the end of the wrapper.",
        "whyWrong": "The decorated function will return `None` to the caller regardless of what it computes.",
        "howToFix": "Store `result = func(...)` and `return result` at the end of the wrapper."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Authentication Middleware",
        "description": "Flask and Django `@login_required` decorators restricting endpoints to authenticated users."
      },
      {
        "title": "API Route Registration",
        "description": "FastAPI `@app.get(\"/users\")` registering handlers with the HTTP router."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-func-decorators-pq1",
        "question": "What does the `@` decorator syntax evaluate to behind the scenes?",
        "hint": "Assignment with function call.",
        "answer": "`@dec` above `def f():` is equivalent to `f = dec(f)`."
      },
      {
        "id": "py-func-decorators-pq2",
        "question": "Why is `@functools.wraps` essential when authoring decorators?",
        "hint": "Function introspection and metadata.",
        "answer": "It copies `__name__`, `__doc__`, `__annotations__`, and module attributes from the wrapped function to the wrapper."
      },
      {
        "id": "py-func-decorators-pq3",
        "question": "How many nested function levels are required for a decorator that takes arguments (e.g. `@retry(attempts=3)`)?",
        "hint": "Decorator factory pattern.",
        "answer": "Three levels: 1. Factory taking decorator arguments; 2. Decorator taking the function; 3. Wrapper intercepting the call."
      }
    ],
    "quiz": [
      {
        "id": "py-func-decorators-q1",
        "question": "What is `@my_dec` on top of `def my_func(): pass` equivalent to?",
        "options": [
          "my_func = my_dec(my_func)",
          "my_dec = my_func(my_dec)",
          "my_func = my_dec",
          "my_dec.register(my_func)"
        ],
        "correctIndex": 0,
        "explanation": "The decorator syntax `f = dec(f)` passes the defined function into the decorator and rebinds the name."
      },
      {
        "id": "py-func-decorators-q2",
        "question": "If you omit `@wraps(func)`, what will `decorated_func.__name__` be?",
        "options": [
          "decorated_func",
          "None",
          "wrapper (or inner function name)",
          "TypeError"
        ],
        "correctIndex": 2,
        "explanation": "Without `@wraps`, the function retains the name of the inner wrapper function defined inside the decorator."
      },
      {
        "id": "py-func-decorators-q3",
        "question": "Which tool in Python standard library provides caching/memoization as a decorator?",
        "options": [
          "functools.lru_cache",
          "itertools.cache",
          "sys.memoize",
          "collections.cache"
        ],
        "correctIndex": 0,
        "explanation": "`functools.lru_cache` provides LRU memoization out of the box."
      }
    ],
    "codingChallenge": {
      "title": "Build Retry Decorator with Fallback",
      "problem": "Write a decorator factory `retry_with_fallback(max_retries: int, fallback_value)` that wraps a function. If the wrapped function raises any Exception, it retries up to `max_retries` times. If it still fails after `max_retries` attempts, it returns `fallback_value` instead of crashing. Use `@functools.wraps`.",
      "hints": [
        "Define decorator(func), then wrapper(*args, **kwargs).",
        "Use a for loop range(max_retries): try func(...) except Exception: pass.",
        "Return fallback_value if loop exhausts."
      ],
      "starterCode": "from functools import wraps\n\ndef retry_with_fallback(max_retries: int, fallback_value):\n    # Write your solution here\n    pass",
      "solution": "from functools import wraps\n\ndef retry_with_fallback(max_retries: int, fallback_value):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            for _ in range(max_retries):\n                try:\n                    return func(*args, **kwargs)\n                except Exception:\n                    pass\n            return fallback_value\n        return wrapper\n    return decorator",
      "testCases": [
        {
          "input": "fail_func = lambda: 1/0; dec = retry_with_fallback(3, -1); wrapped = dec(fail_func); wrapped()",
          "expectedOutput": "-1"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "def repeat(num_times):",
        "codeSnippet": "def repeat(num_times):",
        "explanation": "Outer decorator factory taking decorator arguments."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "    def decorator(func):",
        "codeSnippet": "    def decorator(func):",
        "explanation": "Actual decorator taking the target function."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "        @wraps(func)",
        "codeSnippet": "        @wraps(func)",
        "explanation": "Preserves function metadata on wrapper."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "        def wrapper(*args, **kwargs):",
        "codeSnippet": "        def wrapper(*args, **kwargs):",
        "explanation": "Wrapper function intercepting calls."
      },
      {
        "line": 14,
        "lines": "14",
        "code": "@repeat(num_times=3)",
        "codeSnippet": "@repeat(num_times=3)",
        "explanation": "Applies repeat decorator configured with num_times=3."
      }
    ],
    "applications": [
      {
        "industry": "Authentication Middleware",
        "application": "Flask and Django `@login_required` decorators restricting endpoints to authenticated users.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Authentication Middleware",
        "description": "Flask and Django `@login_required` decorators restricting endpoints to authenticated users."
      },
      {
        "industry": "API Route Registration",
        "application": "FastAPI `@app.get(\"/users\")` registering handlers with the HTTP router.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "API Route Registration",
        "description": "FastAPI `@app.get(\"/users\")` registering handlers with the HTTP router."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand how the `@decorator` syntax translates to syntactic sugar for `func = decorator(func)`.",
        "Write robust decorators supporting any argument signature using `*args` and `**kwargs`.",
        "Preserve function metadata (__name__, __doc__, annotations) using `@functools.wraps`."
      ]
    }
  }
};
