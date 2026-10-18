import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule8Data: PythonModuleData = {
  "id": "python-module-8",
  "number": 8,
  "title": "Advanced Python",
  "subtitle": "Decorators, Generators, Type Hints, Dataclasses & Functional Patterns",
  "description": "Elevate your Python to production quality. Deep-dive into decorators with arguments, itertools pipelines, full type annotation with mypy, dataclasses for clean data modeling, abstract base classes, functional programming patterns, and profiling for performance.",
  "icon": "Code2",
  "badge": "Advanced Python",
  "estimatedHours": 10,
  "topicsCount": 10,
  "lessons": [
    {
      "id": "py-advanced-copying",
      "moduleId": "python-module-8",
      "title": "Shallow and Deep Copying",
      "description": "copy.copy vs copy.deepcopy, the copy protocol (__copy__, __deepcopy__), and when each matters.",
      "order": 1,
      "readTimeMinutes": 20,
      "visualizerType": "memory-model",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-advanced-decorators-depth",
      "moduleId": "python-module-8",
      "title": "Decorators in Depth",
      "description": "Decorators with arguments, class decorators, stacking decorators, and functools.wraps.",
      "order": 2,
      "readTimeMinutes": 30,
      "visualizerType": "execution-trace",
      "difficulty": "Advanced"
    },
    {
      "id": "py-advanced-iterators-depth",
      "moduleId": "python-module-8",
      "title": "Iterators and Generators in Depth",
      "description": "Coroutine protocol, yield from, async generators, and itertools: chain, islice, groupby.",
      "order": 3,
      "readTimeMinutes": 30,
      "visualizerType": "execution-trace",
      "difficulty": "Advanced"
    },
    {
      "id": "py-advanced-type-hints",
      "moduleId": "python-module-8",
      "title": "Type Hints and Annotations",
      "description": "PEP 484 basics, Optional, Union, List, Dict, Callable, TypeVar, and running mypy.",
      "order": 4,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-advanced-dataclasses",
      "moduleId": "python-module-8",
      "title": "Dataclasses",
      "description": "@dataclass, field(), frozen dataclasses, post_init, and comparison with NamedTuple.",
      "order": 5,
      "readTimeMinutes": 22,
      "visualizerType": "oop-diagram",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-advanced-abc",
      "moduleId": "python-module-8",
      "title": "Abstract Base Classes",
      "description": "collections.abc interfaces, virtual subclasses, and designing extensible APIs.",
      "order": 6,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "py-advanced-functional",
      "moduleId": "python-module-8",
      "title": "Functional Programming Concepts",
      "description": "Pure functions, immutability, function composition, currying, and monads informally.",
      "order": 7,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "py-advanced-regex",
      "moduleId": "python-module-8",
      "title": "Regular Expressions",
      "description": "re module, patterns, groups, lookaheads, match vs search vs findall, and compiled patterns.",
      "order": 8,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-advanced-collections",
      "moduleId": "python-module-8",
      "title": "collections and itertools",
      "description": "Counter, defaultdict, deque, namedtuple, OrderedDict, chain, product, combinations, permutations.",
      "order": 9,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-advanced-profiling",
      "moduleId": "python-module-8",
      "title": "Time and Memory Profiling",
      "description": "timeit, cProfile, memory_profiler, line_profiler, and optimizing Python bottlenecks.",
      "order": 10,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Advanced"
    }
  ]
};

export const pythonModule8Lessons: Record<string, PythonLessonContent> = {
  "py-advanced-decorators-depth": {
    "id": "py-advanced-decorators-depth",
    "moduleId": "python-module-8",
    "title": "Decorators in Depth",
    "subtitle": "Parameterized Decorators, functools.wraps, Stacking & Class Decorators",
    "order": 2,
    "readTimeMinutes": 30,
    "difficulty": "Advanced",
    "visualizerType": "execution-trace",
    "objectives": [
      "Deconstruct the @ syntax down to first principles: decorated = decorator(func)",
      "Construct parameterized decorators requiring a three-level closure factory pattern",
      "Preserve docstrings, names, and annotations using @functools.wraps",
      "Understand the execution order of stacked decorators (bottom-up definition, outside-in execution)",
      "Implement class decorators that modify or wrap entire class definitions",
      "Build callable class decorators using the __call__ dunder method for stateful interception"
    ],
    "prerequisites": [
      "First-class functions (passing and returning functions)",
      "*args and **kwargs variadic arguments",
      "Closures and the nonlocal keyword"
    ],
    "analogy": {
      "title": "The Security Checkpoint and Gift Wrapping",
      "text": "Imagine a package delivery service: a function is a plain product inside a box. A decorator does not change the product inside; instead, it wraps the box in protective bubble wrap, stamps it with tracking barcodes, logs the shipping manifest, and inspects the seal. When the recipient opens the package, all wrapper layers execute automatically before the core product is revealed. Parameterized decorators are custom packaging machines configured with specific bubble thickness or inspection rules.",
      "metaphor": "A decorator is a metaprogramming higher-order function that takes a callable as input and returns an augmented callable, leaving original call sites untouched."
    },
    "problemSolved": {
      "title": "Why Decorators in Production Systems?",
      "description": "Production applications require cross-cutting concerns: performance timing, authentication, rate limiting, logging, caching, and retry logic. Without decorators, these concerns must be duplicated inside hundreds of functions. Decorators eliminate code duplication by cleanly separating cross-cutting infrastructure from core business logic.",
      "keyPoints": [
        "DRY principle for cross-cutting concerns: write retry or auth logic once, apply everywhere with a single line",
        "Separation of concerns: business functions contain zero logging or metric-reporting boilerplate",
        "Transparent augmentation: call sites and caller signatures remain 100% identical",
        "Framework foundation: powers FastAPI route declarations, Flask route dispatchers, and pytest fixtures"
      ]
    },
    "intuition": {
      "overview": "Understanding decorators requires mastering 3 nested layers: 1) The outer factory that takes decorator arguments, 2) The middle decorator that takes the target function, and 3) The inner wrapper that intercepts *args and **kwargs at runtime.",
      "steps": [
        {
          "step": 1,
          "title": "The Syntactic Sugar",
          "description": "@decorator above def my_func(): ... is strictly identical to my_func = decorator(my_func) executed at definition time."
        },
        {
          "step": 2,
          "title": "Preserving Metadata with @wraps",
          "description": "Without functools.wraps, my_func.__name__ becomes \"wrapper\" and my_func.__doc__ is erased, breaking debugging and documentation generators."
        },
        {
          "step": 3,
          "title": "Parameterized Decorators (Factory Pattern)",
          "description": "When you write @repeat(num_times=3), repeat(...) is called FIRST to return the actual decorator function, which then accepts the decorated function."
        },
        {
          "step": 4,
          "title": "Stacking Order",
          "description": "When decorators are stacked: @dec1 then @dec2 over func(), evaluation at import is dec1(dec2(func)). At call time, dec1 runs outer, calling dec2, which calls func."
        }
      ]
    },
    "codeExample": {
      "title": "Parameterized Retry Decorator with Exponential Backoff",
      "code": "import functools\nimport time\n\ndef retry(max_attempts: int = 3, delay: float = 0.5):\n    \"\"\"Decorator factory accepting configuration arguments.\"\"\"\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            attempts = 0\n            current_delay = delay\n            while attempts < max_attempts:\n                try:\n                    return func(*args, **kwargs)\n                except Exception as err:\n                    attempts += 1\n                    if attempts >= max_attempts:\n                        print(f\"[RETRY] Function '{func.__name__}' failed after {attempts} attempts. Raising error.\")\n                        raise\n                    print(f\"[RETRY] Attempt {attempts} failed: {err}. Retrying in {current_delay:.2f}s...\")\n                    time.sleep(current_delay)\n                    current_delay *= 2  # Exponential backoff\n        return wrapper\n    return decorator\n\n# Usage:\ncall_count = 0\n\n@retry(max_attempts=3, delay=0.1)\ndef unstable_network_call(endpoint: str):\n    \"\"\"Simulates a flaky API network call.\"\"\"\n    global call_count\n    call_count += 1\n    if call_count < 3:\n        raise ConnectionResetError(f\"TCP reset on {endpoint}\")\n    return f\"200 OK from {endpoint}\"\n\nprint(unstable_network_call(\"https://api.example.com/data\"))\nprint(f\"Original docstring preserved: '{unstable_network_call.__doc__}'\")\nprint(f\"Original name preserved: '{unstable_network_call.__name__}'\")",
      "explanation": "Shows a production-grade retry decorator with exponential backoff. Using @functools.wraps preserves the decorated function name and docstring intact."
    },
    "runnableCode": {
      "code": "import functools\n\ndef timer_decorator(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f\"-> Calling {func.__name__} with args={args}\")\n        result = func(*args, **kwargs)\n        print(f\"<- Finished {func.__name__}, returned {result}\")\n        return result\n    return wrapper\n\ndef memoize(func):\n    cache = {}\n    @functools.wraps(func)\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper\n\n@timer_decorator\n@memoize\ndef fibonacci(n: int) -> int:\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(\"fibonacci(5):\", fibonacci(5))",
      "expectedOutput": "-> Calling fibonacci with args=(5,)\n-> Calling fibonacci with args=(4,)\n-> Calling fibonacci with args=(3,)\n-> Calling fibonacci with args=(2,)\n-> Calling fibonacci with args=(1,)\n<- Finished fibonacci, returned 1\n-> Calling fibonacci with args=(0,)\n<- Finished fibonacci, returned 0\n<- Finished fibonacci, returned 1\n<- Finished fibonacci, returned 2\n<- Finished fibonacci, returned 3\n<- Finished fibonacci, returned 5\nfibonacci(5): 5"
    },
    "lineByLineExplanation": [
      {
        "line": "3-10",
        "lines": "3-10",
        "code": "def timer_decorator(func): ...",
        "codeSnippet": "def timer_decorator(func): ...",
        "explanation": "Standard decorator returning wrapper. Uses *args and **kwargs to support arbitrary target signatures."
      },
      {
        "line": "12-19",
        "lines": "12-19",
        "code": "def memoize(func): cache = {}; ...",
        "codeSnippet": "def memoize(func): cache = {}; ...",
        "explanation": "Closure retaining a private dictionary cache over the lifespan of the decorated function."
      },
      {
        "line": "21-23",
        "lines": "21-23",
        "code": "@timer_decorator\n@memoize\ndef fibonacci(n): ...",
        "codeSnippet": "@timer_decorator\n@memoize\ndef fibonacci(n): ...",
        "explanation": "Stacking: timer_decorator wraps memoize, which wraps fibonacci. Memoization prevents exponential recomputation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting @functools.wraps on the inner wrapper",
        "solution": "Always apply @functools.wraps(func) to wrapper functions. Without it, introspection, help(), docstrings, and framework route names will report \"wrapper\".",
        "codeExample": "# BAD:\ndef my_dec(f):\n    def wrapper(*args): return f(*args)\n    return wrapper\n\n# GOOD:\nimport functools\ndef my_dec(f):\n    @functools.wraps(f)\n    def wrapper(*args): return f(*args)\n    return wrapper"
      },
      {
        "mistake": "Using @decorator instead of @decorator() when parameters have default values",
        "solution": "If a decorator is defined as def dec(arg=default), it returns a decorator only when called as @dec(). If invoked as @dec without parens, the first positional argument passed to it will be the decorated function itself, causing type mismatches.",
        "codeExample": "@repeat()    # Correct for parameterized decorator\n@repeat      # Error: passes function as the first config argument"
      }
    ],
    "bestPractices": [
      "Always use @functools.wraps(func) on wrapper functions to preserve signatures and docstrings",
      "Ensure wrappers return the result of func(*args, **kwargs) rather than silently discarding return values",
      "Support arbitrary function signatures by accepting (*args, **kwargs) and passing them forward",
      "Keep decorator execution fast: time spent in wrappers directly adds latency to every single function call"
    ],
    "applications": [
      {
        "industry": "Web Frameworks (FastAPI, Flask)",
        "application": "Route declaration and authentication guardrails",
        "benefit": "@app.get(\"/items\") and @require_role(\"admin\") enforce permissions before handler execution."
      },
      {
        "industry": "Microservices & Distributed Systems",
        "application": "Circuit breakers and rate limiters",
        "benefit": "Prevents cascading service degradation by tripping circuits on consecutive remote call failures."
      },
      {
        "industry": "Machine Learning & Analytics",
        "application": "Experiment tracking and latency profiling",
        "benefit": "Automatically logs model inference latencies and input feature shapes to monitoring dashboards."
      }
    ],
    "practiceQuestions": [
      {
        "id": "q1",
        "question": "In what exact order do stacked decorators execute: @dec_a above @dec_b above def f()?",
        "hint": "Think about nested function composition: dec_a(dec_b(f)).",
        "answer": "At import/definition time, they are applied bottom-up: dec_b is called on f, then dec_a is called on that result. At runtime/call time, dec_a's wrapper executes first (outside-in), which calls dec_b's wrapper, which finally calls f."
      },
      {
        "id": "q2",
        "question": "Why does a parameterized decorator require 3 levels of nested functions?",
        "hint": "What does the outer function take, what does the middle function take, and what does the inner function take?",
        "answer": "Level 1 (factory) accepts decorator arguments. Level 2 (decorator) accepts the target function. Level 3 (wrapper) intercepts the runtime call arguments (*args, **kwargs)."
      },
      {
        "id": "q3",
        "question": "What dunder method must a class implement to be used as a decorator instance?",
        "hint": "What method makes an object instance callable like a function?",
        "answer": "The __call__ method. When an instance is invoked with parentheses, Python executes instance.__call__(*args, **kwargs)."
      }
    ],
    "quiz": [
      {
        "id": "quiz-1",
        "question": "What does the @functools.wraps decorator specifically do?",
        "options": [
          "Compiles the function into native C bytecode",
          "Copies metadata (__name__, __doc__, __annotations__) from the decorated function to the wrapper",
          "Executes the function inside a background thread",
          "Enforces static type checking on parameters"
        ],
        "correctIndex": 1,
        "explanation": "@functools.wraps copies name, docstring, module, and annotations from the original function to the wrapper."
      },
      {
        "id": "quiz-2",
        "question": "What is the equivalent non-decorator syntax for: @d1 \\n @d2 \\n def func(): pass?",
        "options": [
          "func = d2(d1(func))",
          "func = d1(d2(func))",
          "func = d1(func) + d2(func)",
          "func = (d1 and d2)(func)"
        ],
        "correctIndex": 1,
        "explanation": "Decorators are evaluated bottom-up at definition time: d1 wraps the result of d2(func)."
      },
      {
        "id": "quiz-3",
        "question": "If a decorator does not return anything (returns None), what happens when the decorated function is called?",
        "options": [
          "It executes normally",
          "TypeError: 'NoneType' object is not callable",
          "Returns None silently",
          "Raises an AttributeError"
        ],
        "correctIndex": 1,
        "explanation": "The function name is bound to whatever the decorator returned. If it returned None, attempting to call it raises TypeError: 'NoneType' object is not callable."
      }
    ],
    "codingChallenge": {
      "title": "Call Counter Decorator with Function Attribute",
      "problem": "Write a decorator count_calls(func) that tracks how many times func has been called. The call count must be accessible directly via the function attribute func.calls (e.g. f.calls == 3). It must also return the original function's result and use @functools.wraps.",
      "hints": [
        "Initialize wrapper.calls = 0 before returning wrapper.",
        "Inside wrapper, increment wrapper.calls += 1 before calling func.",
        "Remember to return func(*args, **kwargs)."
      ],
      "starterCode": "import functools\n\ndef count_calls(func):\n    # Implement count_calls decorator\n    pass",
      "solution": "import functools\n\ndef count_calls(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper"
    },
    "summary": {
      "keyTakeaways": [
        "Decorators are higher-order functions that transform callables: func = decorator(func)",
        "Parameterized decorators use 3-layer factories: factory(args) -> decorator(func) -> wrapper(*args, **kwargs)",
        "@functools.wraps is essential in production to preserve docstrings, names, and reflection attributes",
        "Stacked decorators compose bottom-up at definition time and execute outside-in at call time",
        "Stateful decorators can be cleanly implemented using function attributes or callable classes with __call__"
      ],
      "nextLessonId": "py-advanced-iterators-depth",
      "nextLessonTitle": "Iterators and Generators in Depth",
      "nextLessonModuleId": "python-module-8"
    },
    "lineByLine": [
      {
        "line": "3-10",
        "lines": "3-10",
        "code": "def timer_decorator(func): ...",
        "codeSnippet": "def timer_decorator(func): ...",
        "explanation": "Standard decorator returning wrapper. Uses *args and **kwargs to support arbitrary target signatures."
      },
      {
        "line": "12-19",
        "lines": "12-19",
        "code": "def memoize(func): cache = {}; ...",
        "codeSnippet": "def memoize(func): cache = {}; ...",
        "explanation": "Closure retaining a private dictionary cache over the lifespan of the decorated function."
      },
      {
        "line": "21-23",
        "lines": "21-23",
        "code": "@timer_decorator\n@memoize\ndef fibonacci(n): ...",
        "codeSnippet": "@timer_decorator\n@memoize\ndef fibonacci(n): ...",
        "explanation": "Stacking: timer_decorator wraps memoize, which wraps fibonacci. Memoization prevents exponential recomputation."
      }
    ]
  },
  "py-advanced-copying": {
    "id": "py-advanced-copying",
    "moduleId": "python-module-8",
    "title": "Shallow and Deep Copying",
    "subtitle": "The Copy Protocol: __copy__, __deepcopy__, Memoization, and Cyclic Graphs",
    "order": 1,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "memory-model",
    "objectives": [
      "Master the copy protocol: implement custom `__copy__()` and `__deepcopy__(memo)` methods.",
      "Understand how `copy.deepcopy` uses the `memo` dictionary to handle cyclic object references.",
      "Differentiate between container duplication and leaf object reference preservation.",
      "Prevent memory explosion and recursion limit crashes when copying complex object graphs."
    ],
    "prerequisites": [
      "Python OOP, references, and mutability."
    ],
    "analogy": {
      "title": "The Blueprint and The Recursive Clone Machine",
      "text": "A shallow copy is taking a blueprint of a house and printing a duplicate sheet of paper: you have two blueprints, but both point to the exact same physical water main on Elm Street. A deep copy builds an entire duplicate house on a new lot, including digging duplicate pipes and plumbing. The copy protocol (`__deepcopy__`) is the master contractor specifying which custom fixtures must be cloned and which public utilities can remain shared.",
      "metaphor": "__copy__ duplicates the shell; __deepcopy__ recursively clones the object graph using memoization."
    },
    "problemSolved": {
      "title": "Customizing Clone Semantics and Handling Self-Referential Graphs",
      "description": "Standard deepcopy can be slow or fail on objects with unpicklable resources (sockets, file descriptors, database connections). Implementing custom copy protocol methods allows fine-grained control over cloning.",
      "keyPoints": [
        "`copy.copy(obj)` invokes `obj.__copy__()` if defined.",
        "`copy.deepcopy(obj, memo)` invokes `obj.__deepcopy__(memo)` if defined.",
        "The `memo` dictionary maps `id(original)` to cloned instances to prevent infinite recursion on cycles."
      ]
    },
    "intuition": {
      "overview": "The `copy` module inspects object types, handles atomic immutable types (returning themselves), and recursively copies compound types using memoization.",
      "steps": [
        {
          "step": 1,
          "title": "Memo Check",
          "description": "Deepcopy checks if `id(obj)` is in `memo`; if found, returns already cloned instance."
        },
        {
          "step": 2,
          "title": "Protocol Dispatch",
          "description": "Calls `__deepcopy__(memo)` if defined, otherwise decomposes `__dict__`."
        },
        {
          "step": 3,
          "title": "Memo Recording",
          "description": "Stores newly cloned object in memo before recursing into children."
        }
      ]
    },
    "codeExample": {
      "title": "Implementing the Custom Copy Protocol with Cycles",
      "code": "import copy\n\nclass Node:\n    def __init__(self, val):\n        self.val = val\n        self.neighbors = []\n\n    def __repr__(self):\n        return f\"Node({self.val}, neighbor_count={len(self.neighbors)})\"\n\n    def __deepcopy__(self, memo):\n        # Prevent infinite loop on cyclic graph!\n        if id(self) in memo:\n            return memo[id(self)]\n\n        # Allocate new instance without calling __init__\n        cloned = self.__class__(self.val)\n        memo[id(self)] = cloned  # Record before recursing!\n\n        # Recursively clone neighbors\n        cloned.neighbors = [copy.deepcopy(n, memo) for n in self.neighbors]\n        return cloned\n\n# Create cyclic graph: A -> B -> A\nn1 = Node(1)\nn2 = Node(2)\nn1.neighbors.append(n2)\nn2.neighbors.append(n1)\n\ncloned_n1 = copy.deepcopy(n1)\nprint(\"Original n1:\", n1)\nprint(\"Cloned n1:\", cloned_n1)\nprint(\"Is cloned neighbor independent?\", cloned_n1.neighbors[0] is not n2)",
      "explanation": "Demonstrates implementing __deepcopy__ with memo dictionary handling cyclic graphs."
    },
    "runnableCode": {
      "code": "import copy\n\nclass Session:\n    def __init__(self, user, token):\n        self.user = user\n        self.token = token\n        \n    def __copy__(self):\n        # Shallow copy preserves user reference, regenerates token\n        return Session(self.user, f\"{self.token}_copy\")\n\ns1 = Session(\"alice\", \"tok_123\")\ns2 = copy.copy(s1)\nprint(\"s1 token:\", s1.token)\nprint(\"s2 token:\", s2.token)",
      "expectedOutput": "s1 token: tok_123\ns2 token: tok_123_copy"
    },
    "lineByLine": [
      {
        "line": 7,
        "lines": "7",
        "code": "    def __copy__(self):",
        "codeSnippet": "    def __copy__(self):",
        "explanation": "Defines custom shallow copy protocol."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "        return Session(self.user, f\"{self.token}_copy\")",
        "codeSnippet": "        return Session(self.user, f\"{self.token}_copy\")",
        "explanation": "Reuses user reference while mutating token."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "s2 = copy.copy(s1)",
        "codeSnippet": "s2 = copy.copy(s1)",
        "explanation": "Invokes __copy__ protocol."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to pass `memo` to nested `copy.deepcopy(child, memo)` calls inside `__deepcopy__`.",
        "solution": "Always pass the `memo` dictionary forward into all recursive deepcopy calls.",
        "whyWrong": "Losing the memo dict causes infinite recursion and `RecursionError` on cyclic graphs.",
        "howToFix": "Always pass the `memo` dictionary forward into all recursive deepcopy calls."
      },
      {
        "mistake": "Deepcopying open file objects, network sockets, or database connections.",
        "solution": "Exclude OS handles in `__deepcopy__` or re-establish them in the clone.",
        "whyWrong": "Operating system handles cannot be duplicated via memory cloning; raises TypeError.",
        "howToFix": "Exclude OS handles in `__deepcopy__` or re-establish them in the clone."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Abstract Syntax Tree (AST) Transforms",
        "description": "Cloning and modifying code syntax nodes during code generation."
      },
      {
        "title": "Game State Snapshots",
        "description": "Cloning deep game state representations for minimax search in chess engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-advanced-copying-pq1",
        "question": "What two methods define Python's copy protocol?",
        "hint": "Dunder methods.",
        "answer": "`__copy__(self)` and `__deepcopy__(self, memo)`."
      },
      {
        "id": "py-advanced-copying-pq2",
        "question": "Why does `copy.deepcopy` take a `memo` argument?",
        "hint": "Cycle detection.",
        "answer": "To keep track of already-copied objects and prevent infinite recursion on circular references."
      },
      {
        "id": "py-advanced-copying-pq3",
        "question": "What happens when you pass an immutable integer or string to `copy.deepcopy`?",
        "hint": "Atomic types.",
        "answer": "It returns the exact same object immediately, because immutable atomic types cannot mutate."
      }
    ],
    "quiz": [
      {
        "id": "py-advanced-copying-q1",
        "question": "What is stored in the `memo` dictionary during `copy.deepcopy`?",
        "options": [
          "Object names and docstrings",
          "Mapping from id(original_object) to cloned_object",
          "The program's bytecode",
          "File descriptors"
        ],
        "correctIndex": 1,
        "explanation": "The `memo` dict maps `id(original)` to the cloned instance to prevent duplicate clones and infinite cycles."
      },
      {
        "id": "py-advanced-copying-q2",
        "question": "Which method is called when `copy.copy(obj)` is executed on an instance?",
        "options": [
          "__clone__",
          "__copy__",
          "__shallow__",
          "__duplicate__"
        ],
        "correctIndex": 1,
        "explanation": "`copy.copy()` invokes the instance's `__copy__()` special method if present."
      },
      {
        "id": "py-advanced-copying-q3",
        "question": "Why does `copy.deepcopy` of `(1, 2, \"hello\")` return the original tuple instead of a copy?",
        "options": [
          "Tuples are bugged in copy module",
          "Immutable tuples containing only immutable objects are immutable; copying is unnecessary",
          "It creates a shallow copy instead",
          "Tuples do not support deepcopy"
        ],
        "correctIndex": 1,
        "explanation": "Since the tuple and all its contents are immutable, Python returns the original reference safely."
      }
    ],
    "codingChallenge": {
      "title": "Custom Deepcopy for State Container",
      "problem": "Write a class `StateContainer` with attributes `name: str` and `tags: list[str]`. Implement `__deepcopy__(self, memo)` so that cloning creates an independent copy of `tags`, prepends `\"clone_\"` to `name`, and correctly registers `self` in `memo`.",
      "hints": [
        "In __deepcopy__: check if id(self) in memo: return memo[id(self)].",
        "Create cloned instance with f\"clone_{self.name}\" and copy.deepcopy(self.tags, memo).",
        "Record memo[id(self)] = cloned; return cloned."
      ],
      "starterCode": "import copy\n\nclass StateContainer:\n    # Write your solution here\n    pass",
      "solution": "import copy\n\nclass StateContainer:\n    def __init__(self, name: str, tags: list[str]):\n        self.name = name\n        self.tags = list(tags)\n        \n    def __deepcopy__(self, memo):\n        if id(self) in memo:\n            return memo[id(self)]\n        cloned = StateContainer(f\"clone_{self.name}\", copy.deepcopy(self.tags, memo))\n        memo[id(self)] = cloned\n        return cloned",
      "testCases": [
        {
          "input": "s = StateContainer(\"root\", [\"prod\"]); c = copy.deepcopy(s); (c.name, c.tags)",
          "expectedOutput": "(\"clone_root\", [\"prod\"])"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 7,
        "lines": "7",
        "code": "    def __copy__(self):",
        "codeSnippet": "    def __copy__(self):",
        "explanation": "Defines custom shallow copy protocol."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "        return Session(self.user, f\"{self.token}_copy\")",
        "codeSnippet": "        return Session(self.user, f\"{self.token}_copy\")",
        "explanation": "Reuses user reference while mutating token."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "s2 = copy.copy(s1)",
        "codeSnippet": "s2 = copy.copy(s1)",
        "explanation": "Invokes __copy__ protocol."
      }
    ],
    "applications": [
      {
        "industry": "Abstract Syntax Tree (AST) Transforms",
        "application": "Cloning and modifying code syntax nodes during code generation.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Abstract Syntax Tree (AST) Transforms",
        "description": "Cloning and modifying code syntax nodes during code generation."
      },
      {
        "industry": "Game State Snapshots",
        "application": "Cloning deep game state representations for minimax search in chess engines.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Game State Snapshots",
        "description": "Cloning deep game state representations for minimax search in chess engines."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Master the copy protocol: implement custom `__copy__()` and `__deepcopy__(memo)` methods.",
        "Understand how `copy.deepcopy` uses the `memo` dictionary to handle cyclic object references.",
        "Differentiate between container duplication and leaf object reference preservation."
      ]
    }
  },
  "py-advanced-iterators-depth": {
    "id": "py-advanced-iterators-depth",
    "moduleId": "python-module-8",
    "title": "Iterators and Generators in Depth",
    "subtitle": "Generator send(), throw(), close(), and Advanced itertools Combinatorics",
    "order": 3,
    "readTimeMinutes": 30,
    "difficulty": "Advanced",
    "visualizerType": "execution-trace",
    "objectives": [
      "Use generator coroutine methods: `send(value)`, `throw(exc)`, and `close()`.",
      "Understand two-way communication through `received = yield output`.",
      "Use `itertools.groupby` (with sorting requirement) for data clustering.",
      "Use `itertools.islice`, `itertools.chain`, and `itertools.product` for streaming pipelines."
    ],
    "prerequisites": [
      "Generators, yield, and comprehensions."
    ],
    "analogy": {
      "title": "The Two-Way Pneumatic Communication Tube",
      "text": "A standard generator is a one-way conveyor belt: you press a button, and it sends you a package. A generator using `send()` is a two-way pneumatic tube: you send a canister with instructions down the tube (`gen.send(\"expedite\")`), the worker inside reads it, adjusts the machinery, and sends a modified package back up to you.",
      "metaphor": "yield is both an output producer and an input receiver in coroutine generators."
    },
    "problemSolved": {
      "title": "Bidirectional Data Streams and Combinatorial Iteration",
      "description": "Simple generators only push data to consumers. Coroutine generators can receive dynamic configuration at runtime via `.send()`. Advanced itertools combinatorics eliminate nested loop boilerplates.",
      "keyPoints": [
        "`received = yield value` pauses and yields value, and returns what the caller passes into `gen.send(item)`.",
        "A freshly created generator must be primed with `next(gen)` or `gen.send(None)` before sending data.",
        "`itertools.groupby` requires input data to be pre-sorted by the grouping key.",
        "`itertools.islice(iterable, start, stop, step)` slices generators without converting to lists."
      ]
    },
    "intuition": {
      "overview": "In Python, `yield` is an expression, not just a statement. Its evaluated value inside the generator frame is whatever was passed into `send()`.",
      "steps": [
        {
          "step": 1,
          "title": "Priming",
          "description": "First next(gen) runs until the first yield expression."
        },
        {
          "step": 2,
          "title": "Bidirectional Exchange",
          "description": "gen.send(val) resumes execution, evaluates (yield x) to val, and runs to next yield."
        },
        {
          "step": 3,
          "title": "Termination",
          "description": "gen.close() raises GeneratorExit inside generator frame."
        }
      ]
    },
    "codeExample": {
      "title": "Running Average Coroutine with send() and itertools.groupby",
      "code": "import itertools\n\n# Coroutine generator computing cumulative running average\ndef running_average():\n    total = 0.0\n    count = 0\n    avg = None\n    while True:\n        # yield current avg, receive next number\n        val = yield avg\n        if val is None:\n            break\n        total += val\n        count += 1\n        avg = total / count\n\navg_gen = running_average()\nnext(avg_gen) # Priming generator\n\nprint(\"Add 10:\", avg_gen.send(10)) # 10.0\nprint(\"Add 20:\", avg_gen.send(20)) # 15.0\nprint(\"Add 30:\", avg_gen.send(30)) # 20.0\n\n# itertools.groupby example\ndata = [(\"fruit\", \"apple\"), (\"fruit\", \"banana\"), (\"veg\", \"carrot\")]\nfor category, items in itertools.groupby(data, key=lambda x: x[0]):\n    names = [item[1] for item in items]\n    print(f\"{category}: {names}\")",
      "explanation": "Demonstrates coroutine two-way communication using send(), and grouping pre-sorted data using itertools.groupby."
    },
    "runnableCode": {
      "code": "import itertools\n\n# Cartesian product of suits and ranks\nsuits = [\"♠\", \"♥\"]\nranks = [\"A\", \"K\"]\ndeck = list(itertools.product(suits, ranks))\nprint(\"Cartesian Product Deck:\", deck)\n\n# islice on infinite generator\ndef evens():\n    n = 0\n    while True:\n        yield n\n        n += 2\n\nfirst_five = list(itertools.islice(evens(), 5))\nprint(\"First five evens via islice:\", first_five)",
      "expectedOutput": "Cartesian Product Deck: [('♠', 'A'), ('♠', 'K'), ('♥', 'A'), ('♥', 'K')]\nFirst five evens via islice: [0, 2, 4, 6, 8]"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "deck = list(itertools.product(suits, ranks))",
        "codeSnippet": "deck = list(itertools.product(suits, ranks))",
        "explanation": "Computes Cartesian product equivalent to nested for loops."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "first_five = list(itertools.islice(evens(), 5))",
        "codeSnippet": "first_five = list(itertools.islice(evens(), 5))",
        "explanation": "Lazily slices first 5 items from infinite stream in O(1) memory."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `itertools.groupby` on unsorted data.",
        "solution": "Always sort data by the grouping key first: `sorted(data, key=...)` before `groupby`.",
        "whyWrong": "`groupby` groups CONSECUTIVE items only; if identical keys are separated, multiple separate groups are created.",
        "howToFix": "Always sort data by the grouping key first: `sorted(data, key=...)` before `groupby`."
      },
      {
        "mistake": "Sending a non-None value into an unprimed generator: `gen.send(10)`.",
        "solution": "Prime the generator first using `next(gen)` or `gen.send(None)`.",
        "whyWrong": "Raises `TypeError: can't send non-None value to a just-started generator`.",
        "howToFix": "Prime the generator first using `next(gen)` or `gen.send(None)`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "State Machines & Event Parsers",
        "description": "Receiving network packets via `send()` and transitioning internal protocol states."
      },
      {
        "title": "ETL Batch Partitioning",
        "description": "Using `itertools.chain.from_iterable` and `groupby` to batch stream records."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-advanced-iterators-depth-pq1",
        "question": "What value must be passed to `gen.send()` when starting a brand new generator?",
        "hint": "Priming value.",
        "answer": "`None` (or simply call `next(gen)`)."
      },
      {
        "id": "py-advanced-iterators-depth-pq2",
        "question": "What prerequisite must input data satisfy before calling `itertools.groupby`?",
        "hint": "Ordering requirement.",
        "answer": "The input sequence must be pre-sorted by the grouping key."
      },
      {
        "id": "py-advanced-iterators-depth-pq3",
        "question": "What does `itertools.chain([\"a\", \"b\"], [1, 2])` do?",
        "hint": "Concatenating iterables.",
        "answer": "It lazily chains the iterables end-to-end, yielding \"a\", \"b\", 1, 2."
      }
    ],
    "quiz": [
      {
        "id": "py-advanced-iterators-depth-q1",
        "question": "What exception is raised inside a generator when the caller calls `gen.close()`?",
        "options": [
          "StopIteration",
          "GeneratorExit",
          "SystemExit",
          "KeyboardInterrupt"
        ],
        "correctIndex": 1,
        "explanation": "`gen.close()` raises `GeneratorExit` inside the generator to trigger cleanup."
      },
      {
        "id": "py-advanced-iterators-depth-q2",
        "question": "Which itertools function computes all combinations of length r from an iterable without replacement?",
        "options": [
          "itertools.permutations",
          "itertools.combinations",
          "itertools.product",
          "itertools.cycle"
        ],
        "correctIndex": 1,
        "explanation": "`itertools.combinations(iterable, r)` generates unique combinations of length r without replacement."
      },
      {
        "id": "py-advanced-iterators-depth-q3",
        "question": "Why does `val = yield x` allow two-way communication?",
        "options": [
          "It shares a global variable",
          "yield produces x for the caller, and evaluates to the argument passed into send()",
          "It compiles to a socket",
          "It uses multi-threading"
        ],
        "correctIndex": 1,
        "explanation": "The yield expression produces `x` to the caller and evaluates to the value passed in by `.send()`."
      }
    ],
    "codingChallenge": {
      "title": "Group Consecutive Runs with itertools.groupby",
      "problem": "Write a function `compress_runs(data: list) -> list[tuple[any, int]]` that takes a list and returns a run-length encoded list of `(value, count)` tuples representing consecutive identical runs using `itertools.groupby`.",
      "hints": [
        "Iterate through itertools.groupby(data).",
        "For each key, group: count elements using len(list(group)).",
        "Append (key, count) to results."
      ],
      "starterCode": "import itertools\n\ndef compress_runs(data: list) -> list[tuple[any, int]]:\n    # Write your solution here\n    pass",
      "solution": "import itertools\n\ndef compress_runs(data: list) -> list[tuple[any, int]]:\n    return [(key, len(list(group))) for key, group in itertools.groupby(data)]",
      "testCases": [
        {
          "input": "[\"A\", \"A\", \"A\", \"B\", \"B\", \"C\", \"A\"]",
          "expectedOutput": "[(\"A\", 3), (\"B\", 2), (\"C\", 1), (\"A\", 1)]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "deck = list(itertools.product(suits, ranks))",
        "codeSnippet": "deck = list(itertools.product(suits, ranks))",
        "explanation": "Computes Cartesian product equivalent to nested for loops."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "first_five = list(itertools.islice(evens(), 5))",
        "codeSnippet": "first_five = list(itertools.islice(evens(), 5))",
        "explanation": "Lazily slices first 5 items from infinite stream in O(1) memory."
      }
    ],
    "applications": [
      {
        "industry": "State Machines & Event Parsers",
        "application": "Receiving network packets via `send()` and transitioning internal protocol states.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "State Machines & Event Parsers",
        "description": "Receiving network packets via `send()` and transitioning internal protocol states."
      },
      {
        "industry": "ETL Batch Partitioning",
        "application": "Using `itertools.chain.from_iterable` and `groupby` to batch stream records.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "ETL Batch Partitioning",
        "description": "Using `itertools.chain.from_iterable` and `groupby` to batch stream records."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Use generator coroutine methods: `send(value)`, `throw(exc)`, and `close()`.",
        "Understand two-way communication through `received = yield output`.",
        "Use `itertools.groupby` (with sorting requirement) for data clustering."
      ]
    }
  },
  "py-advanced-type-hints": {
    "id": "py-advanced-type-hints",
    "moduleId": "python-module-8",
    "title": "Type Hints and Annotations",
    "subtitle": "PEP 484, Union, Optional, Callable, TypeVar, Generic Types, and mypy",
    "order": 4,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Apply type annotations to function parameters, return values, and variables.",
      "Use modern Python 3.10+ union syntax (`int | str`) and Optional types.",
      "Annotate complex structures: Callable[[ArgTypes], ReturnType], TypeVar, and Generic classes.",
      "Understand that type annotations have zero runtime overhead and run static analysis with mypy."
    ],
    "prerequisites": [
      "Python functions, classes, and decorators."
    ],
    "analogy": {
      "title": "The Architectural Specifications Blueprint",
      "text": "Python source code without type hints is like assembling IKEA furniture with only black-and-white pictures: you might mistake a 30mm bolt for a 35mm bolt, and only discover the error when the shelf collapses hours later. Type hints are crisp, color-coded dimension stamps on every single part: the assembler (developer) and structural inspector (`mypy`) verify exact matches before anything is screwed together.",
      "metaphor": "Type hints provide machine-verifiable documentation and IDE autocompletion."
    },
    "problemSolved": {
      "title": "Catching Type Incompatibility Bugs Before Code Reaches Production",
      "description": "Dynamic typing allows rapid prototyping, but in large systems, passing `None` or a string where an integer is expected causes production crashes. Static type checking with `mypy` catches type errors before deployment.",
      "keyPoints": [
        "Type hints do NOT enforce types at runtime; Python executes annotated code dynamically.",
        "In Python 3.10+, use `X | None` instead of `Optional[X]`, and `list[int]` instead of `typing.List[int]`.",
        "`TypeVar` enables generic functions and classes where types are determined by arguments.",
        "Static type checkers like `mypy` and `pyright` analyze annotations without running the code."
      ]
    },
    "intuition": {
      "overview": "CPython stores annotations in the `__annotations__` dictionary of functions, classes, and modules, leaving runtime evaluation unaffected.",
      "steps": [
        {
          "step": 1,
          "title": "Annotation",
          "description": "Developer annotates `def f(x: int) -> str:`."
        },
        {
          "step": 2,
          "title": "Static Inspection",
          "description": "Mypy validates call sites across the codebase against signatures."
        },
        {
          "step": 3,
          "title": "Runtime Ignored",
          "description": "CPython executes bytecode normally with zero performance degradation."
        }
      ]
    },
    "codeExample": {
      "title": "Generic Stack and TypeVar Implementation",
      "code": "from typing import TypeVar, Generic, Callable\n\nT = TypeVar('T')\n\nclass Stack(Generic[T]):\n    \"\"\"Generic LIFO stack retaining type information.\"\"\"\n    def __init__(self) -> None:\n        self._items: list[T] = []\n\n    def push(self, item: T) -> None:\n        self._items.append(item)\n\n    def pop(self) -> T:\n        if not self._items:\n            raise IndexError(\"pop from empty stack\")\n        return self._items.pop()\n\n    def map_elements(self, func: Callable[[T], T]) -> None:\n        self._items = [func(item) for item in self._items]\n\n# Strongly-typed string stack\nstr_stack = Stack[str]()\nstr_stack.push(\"hello\")\nstr_stack.push(\"world\")\nstr_stack.map_elements(str.upper)\nprint(\"Popped item:\", str_stack.pop())",
      "explanation": "Demonstrates TypeVar and Generic for reusable typed data structures, and typing Callable."
    },
    "runnableCode": {
      "code": "def calculate_discount(price: float, discount: float | None = None) -> float:\n    rate = discount if discount is not None else 0.10\n    return round(price * (1 - rate), 2)\n\nprint(\"Default discount:\", calculate_discount(100.0))\nprint(\"Custom discount:\", calculate_discount(100.0, 0.25))",
      "expectedOutput": "Default discount: 90.0\nCustom discount: 75.0"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "def calculate_discount(price: float, discount: float | None = None) -> float:",
        "codeSnippet": "def calculate_discount(price: float, discount: float | None = None) -> float:",
        "explanation": "Uses Python 3.10+ union pipe syntax for optional float parameter."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    return round(price * (1 - rate), 2)",
        "codeSnippet": "    return round(price * (1 - rate), 2)",
        "explanation": "Returns annotated float value."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming type hints enforce types at runtime: `x: int = \"string\"` raising an error.",
        "solution": "Run static type checkers like `mypy` in CI/CD pipelines to catch mismatches.",
        "whyWrong": "Python is still dynamically typed; assigning a string to an annotated int variable executes without runtime error.",
        "howToFix": "Run static type checkers like `mypy` in CI/CD pipelines to catch mismatches."
      },
      {
        "mistake": "Importing `List`, `Dict`, `Tuple` from `typing` in modern Python 3.9+.",
        "solution": "Use built-in generic collections: `list[T]`, `dict[K, V]`.",
        "whyWrong": "Deprecated by PEP 585; standard built-in types `list[int]`, `dict[str, int]` should be used directly.",
        "howToFix": "Use built-in generic collections: `list[T]`, `dict[K, V]`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "FastAPI and Pydantic",
        "description": "Using type hints to automatically validate JSON request schemas and generate OpenAPI/Swagger docs."
      },
      {
        "title": "Enterprise Refactoring",
        "description": "Enabling confident codebase-wide refactoring across millions of lines of Python at Instagram and Dropbox."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-advanced-type-hints-pq1",
        "question": "Does CPython raise an error at runtime if you pass a string to a function expecting `int`?",
        "hint": "Static vs runtime checking.",
        "answer": "No, Python ignores type hints at runtime; only static analyzers (like mypy) flag errors."
      },
      {
        "id": "py-advanced-type-hints-pq2",
        "question": "What is the syntax for a union of `int` and `str` in Python 3.10+?",
        "hint": "Pipe operator.",
        "answer": "`int | str`."
      },
      {
        "id": "py-advanced-type-hints-pq3",
        "question": "Where are function type annotations stored at runtime in Python?",
        "hint": "Dunder attribute.",
        "answer": "In the function's `__annotations__` dictionary."
      }
    ],
    "quiz": [
      {
        "id": "py-advanced-type-hints-q1",
        "question": "What is the purpose of `typing.TypeVar`?",
        "options": [
          "To convert types at runtime",
          "To define generic type parameters that preserve relationships across inputs and outputs",
          "To declare environment variables",
          "To disable dynamic typing"
        ],
        "correctIndex": 1,
        "explanation": "`TypeVar` allows writing generic functions/classes where type relationships are preserved."
      },
      {
        "id": "py-advanced-type-hints-q2",
        "question": "Which tool is the industry-standard static type checker for Python?",
        "options": [
          "pip",
          "mypy",
          "pytest",
          "gunicorn"
        ],
        "correctIndex": 1,
        "explanation": "`mypy` is the canonical static type checker developed under Python steering council leadership."
      },
      {
        "id": "py-advanced-type-hints-q3",
        "question": "What does `Callable[[int, int], bool]` annotate?",
        "options": [
          "A tuple of two ints and a bool",
          "A function that accepts two integers and returns a boolean",
          "A boolean array",
          "A class with three methods"
        ],
        "correctIndex": 1,
        "explanation": "`Callable[[ArgTypes...], ReturnType]` specifies the argument types and return type of a function."
      }
    ],
    "codingChallenge": {
      "title": "Generic Identity and Pair Swapper",
      "problem": "Using `typing.TypeVar`, write a generic function `swap_pair(pair: tuple[T, U]) -> tuple[U, T]` that takes a 2-tuple of arbitrary types `(first, second)` and returns `(second, first)`.",
      "hints": [
        "Unpack first, second = pair.",
        "Return (second, first)."
      ],
      "starterCode": "from typing import TypeVar\n\nT = TypeVar('T')\nU = TypeVar('U')\n\ndef swap_pair(pair: tuple[T, U]) -> tuple[U, T]:\n    # Write your solution here\n    pass",
      "solution": "from typing import TypeVar\n\nT = TypeVar('T')\nU = TypeVar('U')\n\ndef swap_pair(pair: tuple[T, U]) -> tuple[U, T]:\n    return pair[1], pair[0]",
      "testCases": [
        {
          "input": "(1, \"apple\")",
          "expectedOutput": "(\"apple\", 1)"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "def calculate_discount(price: float, discount: float | None = None) -> float:",
        "codeSnippet": "def calculate_discount(price: float, discount: float | None = None) -> float:",
        "explanation": "Uses Python 3.10+ union pipe syntax for optional float parameter."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    return round(price * (1 - rate), 2)",
        "codeSnippet": "    return round(price * (1 - rate), 2)",
        "explanation": "Returns annotated float value."
      }
    ],
    "applications": [
      {
        "industry": "FastAPI and Pydantic",
        "application": "Using type hints to automatically validate JSON request schemas and generate OpenAPI/Swagger docs.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "FastAPI and Pydantic",
        "description": "Using type hints to automatically validate JSON request schemas and generate OpenAPI/Swagger docs."
      },
      {
        "industry": "Enterprise Refactoring",
        "application": "Enabling confident codebase-wide refactoring across millions of lines of Python at Instagram and Dropbox.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Enterprise Refactoring",
        "description": "Enabling confident codebase-wide refactoring across millions of lines of Python at Instagram and Dropbox."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Apply type annotations to function parameters, return values, and variables.",
        "Use modern Python 3.10+ union syntax (`int | str`) and Optional types.",
        "Annotate complex structures: Callable[[ArgTypes], ReturnType], TypeVar, and Generic classes."
      ]
    }
  },
  "py-advanced-dataclasses": {
    "id": "py-advanced-dataclasses",
    "moduleId": "python-module-8",
    "title": "Dataclasses",
    "subtitle": "@dataclass, field(), Frozen Immutability, __post_init__, and asdict()",
    "order": 5,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "oop-diagram",
    "objectives": [
      "Generate boilerplate methods automatically (`__init__`, `__repr__`, `__eq__`) using `@dataclass`.",
      "Configure attributes using `field(default_factory=...)` to avoid shared mutable defaults.",
      "Create immutable, hashable records using `@dataclass(frozen=True)`.",
      "Perform post-initialization validation and attribute derivation with `__post_init__()`."
    ],
    "prerequisites": [
      "Python OOP, constructors, and type hints."
    ],
    "analogy": {
      "title": "The Prefabricated Luxury Apartment",
      "text": "Writing a traditional Python class for data storage is like hand-pouring the concrete, tiling the bathroom, and wiring the fuse box yourself (`__init__`, `__repr__`, `__eq__`, `__hash__`). A `@dataclass` is a prefabricated modular home: you specify the room names and dimensions (annotated fields), and the factory cranes install plumbing, electrical, and doors automatically.",
      "metaphor": "@dataclass generates standard object-oriented boilerplate code automatically."
    },
    "problemSolved": {
      "title": "Eliminating Repetitive Class Boilerplate for Data-Holding Objects",
      "description": "Writing 20 lines of repetitive `self.x = x`, `def __repr__`, and `def __eq__` for every domain entity causes fatigue and typos. Dataclasses generate clean, efficient implementations at class creation time.",
      "keyPoints": [
        "Dataclasses use type annotations to identify fields.",
        "Never use mutable objects as defaults: use `field(default_factory=list)`.",
        "`frozen=True` makes instances immutable and hashable.",
        "`dataclasses.asdict(obj)` converts instances to nested dictionaries."
      ]
    },
    "intuition": {
      "overview": "The `@dataclass` decorator inspects the class's `__annotations__`, dynamically writes code strings for `__init__`, `__repr__`, and `__eq__`, and compiles them onto the class.",
      "steps": [
        {
          "step": 1,
          "title": "Field Discovery",
          "description": "Reads class attributes that have type annotations."
        },
        {
          "step": 2,
          "title": "Method Generation",
          "description": "Generates Python code for __init__, __repr__, and __eq__ matching fields."
        },
        {
          "step": 3,
          "title": "Compilation",
          "description": "Attaches compiled functions to the class namespace."
        }
      ]
    },
    "codeExample": {
      "title": "Production Dataclass with Validation and default_factory",
      "code": "from dataclasses import dataclass, field, asdict\n\n@dataclass(frozen=True)\nclass Customer:\n    id: int\n    name: str\n    email: str\n    roles: tuple[str, ...] = (\"user\",)  # Immutable tuple default\n\n@dataclass\nclass Order:\n    order_id: str\n    customer: Customer\n    items: list[str] = field(default_factory=list)  # Safe mutable default\n    discount: float = 0.0\n    total: float = field(init=False)  # Computed in __post_init__\n\n    def __post_init__(self):\n        # Validate and derive attributes\n        if self.discount < 0:\n            raise ValueError(\"Discount cannot be negative\")\n        self.total = len(self.items) * 20.0 * (1 - self.discount)\n\nc = Customer(1, \"Alex\", \"alex@example.com\")\norder = Order(\"ORD-001\", c, items=[\"Widget\", \"Gadget\"])\nprint(\"Order Repr:\", order)\nprint(\"Order as dict:\", asdict(order))",
      "explanation": "Demonstrates frozen dataclass, default_factory, init=False, __post_init__, and asdict()."
    },
    "runnableCode": {
      "code": "from dataclasses import dataclass\n\n@dataclass\nclass Point3D:\n    x: float\n    y: float\n    z: float = 0.0\n\np1 = Point3D(1.0, 2.0)\np2 = Point3D(1.0, 2.0, 0.0)\nprint(\"Are points equal?\", p1 == p2)\nprint(\"Generated repr:\", p1)",
      "expectedOutput": "Are points equal? True\nGenerated repr: Point3D(x=1.0, y=2.0, z=0.0)"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "@dataclass",
        "codeSnippet": "@dataclass",
        "explanation": "Applies dataclass decorator to synthesize dunder methods."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "    x: float",
        "codeSnippet": "    x: float",
        "explanation": "Declares field x with type float."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "    z: float = 0.0",
        "codeSnippet": "    z: float = 0.0",
        "explanation": "Declares field z with default value 0.0."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "print(\"Are points equal?\", p1 == p2)",
        "codeSnippet": "print(\"Are points equal?\", p1 == p2)",
        "explanation": "Demonstrates synthesized __eq__ comparing all fields."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using a mutable default directly: `items: list = []` inside a dataclass.",
        "solution": "Use `field(default_factory=list)`.",
        "whyWrong": "Raises `ValueError: mutable default <class 'list'> for field items is not allowed: use default_factory`.",
        "howToFix": "Use `field(default_factory=list)`."
      },
      {
        "mistake": "Declaring a field without a type annotation: `name = \"Alice\"`.",
        "solution": "Always include a type annotation: `name: str = \"Alice\"`.",
        "whyWrong": "Dataclasses ignore unannotated attributes, treating them as regular class attributes rather than instance fields.",
        "howToFix": "Always include a type annotation: `name: str = \"Alice\"`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Configuration Management",
        "description": "Holding typed, validated application configs parsed from YAML or environment."
      },
      {
        "title": "API Data Transfer Objects (DTOs)",
        "description": "Passing structured records between service layers without dictionary key typos."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-advanced-dataclasses-pq1",
        "question": "How do you create an immutable dataclass in Python?",
        "hint": "Decorator argument.",
        "answer": "Using `@dataclass(frozen=True)`."
      },
      {
        "id": "py-advanced-dataclasses-pq2",
        "question": "What special method is called immediately after `__init__` in a dataclass?",
        "hint": "Post initialization hook.",
        "answer": "The `__post_init__(self)` method."
      },
      {
        "id": "py-advanced-dataclasses-pq3",
        "question": "How do you convert a dataclass instance into a standard Python dictionary?",
        "hint": "Dataclasses module helper.",
        "answer": "Using `dataclasses.asdict(instance)`."
      }
    ],
    "quiz": [
      {
        "id": "py-advanced-dataclasses-q1",
        "question": "What happens if you try to modify an attribute on a `@dataclass(frozen=True)` instance?",
        "options": [
          "It silently ignores the change",
          "Raises FrozenInstanceError (subclass of AttributeError)",
          "The object is re-cloned",
          "ValueError is raised"
        ],
        "correctIndex": 1,
        "explanation": "Frozen dataclasses prevent attribute reassignment, raising `dataclasses.FrozenInstanceError`."
      },
      {
        "id": "py-advanced-dataclasses-q2",
        "question": "Which parameter in `field()` specifies a callable to generate new instances of a mutable default?",
        "options": [
          "factory",
          "default_factory",
          "generator",
          "init_func"
        ],
        "correctIndex": 1,
        "explanation": "`default_factory` accepts a callable (like `list`, `dict`, `set`) that is invoked for each new instance."
      },
      {
        "id": "py-advanced-dataclasses-q3",
        "question": "Do dataclasses require type annotations on fields?",
        "options": [
          "No, type annotations are optional",
          "Yes, dataclasses only detect fields that have type annotations",
          "Only on numbers",
          "Only on strings"
        ],
        "correctIndex": 1,
        "explanation": "The dataclass decorator inspects `__annotations__` exclusively to determine which attributes are fields."
      }
    ],
    "codingChallenge": {
      "title": "Inventory Item Dataclass",
      "problem": "Create a `@dataclass` `InventoryItem` with fields `sku: str`, `price: float`, `quantity: int = 0`, and `tags: list[str] = field(default_factory=list)`. Add a method `total_value() -> float` that returns `round(self.price * self.quantity, 2)`.",
      "hints": [
        "Use @dataclass decorator.",
        "tags: list[str] = field(default_factory=list).",
        "Provide total_value method returning round(price * quantity, 2)."
      ],
      "starterCode": "from dataclasses import dataclass, field\n\n# Write your solution here",
      "solution": "from dataclasses import dataclass, field\n\n@dataclass\nclass InventoryItem:\n    sku: str\n    price: float\n    quantity: int = 0\n    tags: list[str] = field(default_factory=list)\n    \n    def total_value(self) -> float:\n        return round(self.price * self.quantity, 2)",
      "testCases": [
        {
          "input": "item = InventoryItem(\"SKU123\", 14.50, 4); item.total_value()",
          "expectedOutput": "58.0"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "@dataclass",
        "codeSnippet": "@dataclass",
        "explanation": "Applies dataclass decorator to synthesize dunder methods."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "    x: float",
        "codeSnippet": "    x: float",
        "explanation": "Declares field x with type float."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "    z: float = 0.0",
        "codeSnippet": "    z: float = 0.0",
        "explanation": "Declares field z with default value 0.0."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "print(\"Are points equal?\", p1 == p2)",
        "codeSnippet": "print(\"Are points equal?\", p1 == p2)",
        "explanation": "Demonstrates synthesized __eq__ comparing all fields."
      }
    ],
    "applications": [
      {
        "industry": "Configuration Management",
        "application": "Holding typed, validated application configs parsed from YAML or environment.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Configuration Management",
        "description": "Holding typed, validated application configs parsed from YAML or environment."
      },
      {
        "industry": "API Data Transfer Objects (DTOs)",
        "application": "Passing structured records between service layers without dictionary key typos.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "API Data Transfer Objects (DTOs)",
        "description": "Passing structured records between service layers without dictionary key typos."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Generate boilerplate methods automatically (`__init__`, `__repr__`, `__eq__`) using `@dataclass`.",
        "Configure attributes using `field(default_factory=...)` to avoid shared mutable defaults.",
        "Create immutable, hashable records using `@dataclass(frozen=True)`."
      ]
    }
  },
  "py-advanced-abc": {
    "id": "py-advanced-abc",
    "moduleId": "python-module-8",
    "title": "Abstract Base Classes",
    "subtitle": "collections.abc Interfaces, Virtual Subclasses via register(), and Structural Protocols",
    "order": 6,
    "readTimeMinutes": 22,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Use built-in abstract interfaces from `collections.abc` (Iterable, Sequence, Mapping).",
      "Register virtual subclasses without inheritance using `ABCMeta.register()`.",
      "Understand `__subclasshook__` for customized `issubclass()` checks.",
      "Compare nominal subtyping (ABCs) with structural subtyping (`typing.Protocol`)."
    ],
    "prerequisites": [
      "Python OOP, inheritance, and abstract classes basics."
    ],
    "analogy": {
      "title": "The International Diplomatic Passport vs DNA Test",
      "text": "Inheriting from a class is a biological DNA test: you are a child because of genetic lineage. A virtual subclass registered via `ABC.register()` is an honorary diplomatic passport granted by the embassy: you don't share the genetic bloodline, but all border agents (`isinstance`, `issubclass`) treat you with full diplomatic status.",
      "metaphor": "Virtual subclasses satisfy type checks without inheriting implementation code."
    },
    "problemSolved": {
      "title": "Unifying Custom Classes with Built-In Container Protocols",
      "description": "When third-party libraries create custom dictionaries or streams, they might not inherit from `collections.abc.Mapping`. Virtual subclasses allow registering them so standard functions recognize them as mappings.",
      "keyPoints": [
        "`collections.abc` provides standard interfaces: `Iterable`, `Iterator`, `Sequence`, `Mapping`, `MutableMapping`.",
        "`BaseABC.register(MyClass)` makes `isinstance(MyClass(), BaseABC)` return `True` without inheritance.",
        "`__subclasshook__` allows classes to dynamically claim subclasses based on method presence."
      ]
    },
    "intuition": {
      "overview": "Python's `ABCMeta` metaclass maintains a registry of virtual subclasses and executes `__subclasshook__` during `isinstance` and `issubclass` checks.",
      "steps": [
        {
          "step": 1,
          "title": "Interface Design",
          "description": "Define ABC with __subclasshook__ or register method."
        },
        {
          "step": 2,
          "title": "Registration",
          "description": "Call ABC.register(TargetClass) or implement required methods."
        },
        {
          "step": 3,
          "title": "Dispatch",
          "description": "isinstance(target, ABC) checks registry and subclass hook dynamically."
        }
      ]
    },
    "codeExample": {
      "title": "Using collections.abc and Custom __subclasshook__",
      "code": "from collections.abc import Mapping\nfrom abc import ABC, abstractmethod\n\n# Checking built-in interfaces\nprint(\"Is dict a Mapping?\", issubclass(dict, Mapping)) # True\n\n# Dynamic structural interface using __subclasshook__\nclass Sized(ABC):\n    @classmethod\n    def __subclasshook__(cls, subclass):\n        # Any class with __len__ is automatically considered a Sized subclass!\n        if any(\"__len__\" in B.__dict__ for B in subclass.__mro__):\n            return True\n        return NotImplemented\n\nclass CustomContainer:\n    def __len__(self):\n        return 42\n\nc = CustomContainer()\nprint(\"Is CustomContainer an instance of Sized?\", isinstance(c, Sized)) # True!",
      "explanation": "Demonstrates collections.abc inspection and implementing a custom __subclasshook__ for duck-typed ABC matching."
    },
    "runnableCode": {
      "code": "from abc import ABC\n\nclass Greeter(ABC):\n    pass\n\nclass ForeignGreeter:\n    def greet(self): return \"Bonjour\"\n\n# Register virtual subclass without inheritance!\nGreeter.register(ForeignGreeter)\n\nf = ForeignGreeter()\nprint(\"Is instance of Greeter?\", isinstance(f, Greeter))\nprint(\"Is subclass of Greeter?\", issubclass(ForeignGreeter, Greeter))",
      "expectedOutput": "Is instance of Greeter? True\nIs subclass of Greeter? True"
    },
    "lineByLine": [
      {
        "line": 9,
        "lines": "9",
        "code": "Greeter.register(ForeignGreeter)",
        "codeSnippet": "Greeter.register(ForeignGreeter)",
        "explanation": "Registers ForeignGreeter as a virtual subclass of Greeter."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"Is instance of Greeter?\", isinstance(f, Greeter))",
        "codeSnippet": "print(\"Is instance of Greeter?\", isinstance(f, Greeter))",
        "explanation": "Returns True without any actual code inheritance."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming virtual subclasses inherit methods from the ABC.",
        "solution": "If you need implementation code reuse, use standard inheritance.",
        "whyWrong": "Virtual subclasses registered via `.register()` inherit ZERO code or attributes; only `isinstance` and `issubclass` are affected.",
        "howToFix": "If you need implementation code reuse, use standard inheritance."
      },
      {
        "mistake": "Returning `False` from `__subclasshook__` instead of `NotImplemented`.",
        "solution": "Return `NotImplemented` if condition is not met.",
        "whyWrong": "Returning `False` explicitly forbids subclasses; returning `NotImplemented` allows fallback checks in MRO.",
        "howToFix": "Return `NotImplemented` if condition is not met."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Data Science Vector Checking",
        "description": "Checking `isinstance(data, collections.abc.Sequence)` to support both lists and NumPy arrays."
      },
      {
        "title": "Mocking in Test Suites",
        "description": "Registering lightweight test double mocks as virtual subclasses of heavy services."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-advanced-abc-pq1",
        "question": "Where are standard container abstract base classes located in the Python standard library?",
        "hint": "Module in collections.",
        "answer": "`collections.abc`."
      },
      {
        "id": "py-advanced-abc-pq2",
        "question": "What does `ABC.register(Class)` do?",
        "hint": "Virtual subclass registration.",
        "answer": "It registers `Class` as a virtual subclass of the ABC so `issubclass(Class, ABC)` returns `True` without actual inheritance."
      },
      {
        "id": "py-advanced-abc-pq3",
        "question": "What method allows an ABC to customize `issubclass` checks based on method presence?",
        "hint": "Special classmethod hook.",
        "answer": "The `__subclasshook__(cls, subclass)` classmethod."
      }
    ],
    "quiz": [
      {
        "id": "py-advanced-abc-q1",
        "question": "Do virtual subclasses registered with `MyABC.register(Target)` inherit methods from `MyABC`?",
        "options": [
          "Yes, all methods",
          "Only abstract methods",
          "No, registration does not provide implementation inheritance",
          "Only __init__"
        ],
        "correctIndex": 2,
        "explanation": "Registration only affects `isinstance` and `issubclass` type checks; no implementation code is shared."
      },
      {
        "id": "py-advanced-abc-q2",
        "question": "Which class in `collections.abc` requires both `__len__` and `__getitem__`?",
        "options": [
          "Iterable",
          "Sequence",
          "Callable",
          "Iterator"
        ],
        "correctIndex": 1,
        "explanation": "A `Sequence` requires `__len__` and `__getitem__`."
      },
      {
        "id": "py-advanced-abc-q3",
        "question": "What should `__subclasshook__` return if it cannot decide whether a class is a subclass?",
        "options": [
          "False",
          "None",
          "NotImplemented",
          "TypeError"
        ],
        "correctIndex": 2,
        "explanation": "Returning `NotImplemented` allows Python to continue standard mechanism checks."
      }
    ],
    "codingChallenge": {
      "title": "Custom Iterable Subclasshook",
      "problem": "Create an abstract class `HasYield` with a `__subclasshook__(cls, subclass)` that returns `True` if `\"produce\"` exists anywhere in `subclass.__mro__`, and `NotImplemented` otherwise. Verify that an unrelated class implementing `def produce(self): pass` returns `True` for `issubclass(Target, HasYield)`.",
      "hints": [
        "In __subclasshook__(cls, subclass): check any(\"produce\" in B.__dict__ for B in subclass.__mro__).",
        "Return True if found, else NotImplemented."
      ],
      "starterCode": "from abc import ABC\n\nclass HasYield(ABC):\n    # Write your solution here\n    pass",
      "solution": "from abc import ABC\n\nclass HasYield(ABC):\n    @classmethod\n    def __subclasshook__(cls, subclass):\n        if any(\"produce\" in B.__dict__ for B in subclass.__mro__):\n            return True\n        return NotImplemented",
      "testCases": [
        {
          "input": "class Worker: def produce(self): pass; issubclass(Worker, HasYield)",
          "expectedOutput": "True"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 9,
        "lines": "9",
        "code": "Greeter.register(ForeignGreeter)",
        "codeSnippet": "Greeter.register(ForeignGreeter)",
        "explanation": "Registers ForeignGreeter as a virtual subclass of Greeter."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"Is instance of Greeter?\", isinstance(f, Greeter))",
        "codeSnippet": "print(\"Is instance of Greeter?\", isinstance(f, Greeter))",
        "explanation": "Returns True without any actual code inheritance."
      }
    ],
    "applications": [
      {
        "industry": "Data Science Vector Checking",
        "application": "Checking `isinstance(data, collections.abc.Sequence)` to support both lists and NumPy arrays.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Data Science Vector Checking",
        "description": "Checking `isinstance(data, collections.abc.Sequence)` to support both lists and NumPy arrays."
      },
      {
        "industry": "Mocking in Test Suites",
        "application": "Registering lightweight test double mocks as virtual subclasses of heavy services.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Mocking in Test Suites",
        "description": "Registering lightweight test double mocks as virtual subclasses of heavy services."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Use built-in abstract interfaces from `collections.abc` (Iterable, Sequence, Mapping).",
        "Register virtual subclasses without inheritance using `ABCMeta.register()`.",
        "Understand `__subclasshook__` for customized `issubclass()` checks."
      ]
    }
  },
  "py-advanced-functional": {
    "id": "py-advanced-functional",
    "moduleId": "python-module-8",
    "title": "Functional Programming Concepts",
    "subtitle": "Pure Functions, Immutability, Currying, Function Composition, and Monadic Flow",
    "order": 7,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Write pure functions without side effects and understand referential transparency.",
      "Implement function composition: chaining mathematical transformations cleanly.",
      "Understand Currying: converting multi-argument functions into sequences of single-argument functions.",
      "Implement the Maybe / Result pattern for elegant, exception-free error handling."
    ],
    "prerequisites": [
      "Higher-order functions, lambdas, and closures."
    ],
    "analogy": {
      "title": "The Mathematical Calculator vs The Shared Chalkboard",
      "text": "Imperative programming is like people scribbling on a shared chalkboard: one person writes `x = 5`, another erases it, and a third draws an arrow. In functional programming, every operation is a pure pocket calculator: `sqrt(16)` always outputs `4`. It doesn't alter the battery level, doesn't change your coffee cup, and produces identical output every single time.",
      "metaphor": "Pure functions produce outputs solely from inputs without mutating external state."
    },
    "problemSolved": {
      "title": "Eliminating Race Conditions, Side Effects, and Mutable State Bugs",
      "description": "Mutable shared state is the leading cause of concurrent race conditions and difficult-to-reproduce bugs. Functional programming patterns make code deterministic, easily parallelizable, and trivial to unit test.",
      "keyPoints": [
        "A pure function has two properties: 1. Same input ALWAYS produces same output; 2. No side effects (no I/O, no mutation).",
        "Function composition creates pipelines: `f(g(x))`.",
        "Currying transforms `f(a, b)` into `f(a)(b)`."
      ]
    },
    "intuition": {
      "overview": "Functional programming treats computation as the evaluation of mathematical functions, avoiding state changes and mutable data.",
      "steps": [
        {
          "step": 1,
          "title": "Immutability",
          "description": "Data structures are treated as read-only snapshots."
        },
        {
          "step": 2,
          "title": "Purity",
          "description": "Functions compute new values rather than mutating incoming arguments."
        },
        {
          "step": 3,
          "title": "Composition",
          "description": "Simple functions compose into high-level pipelines."
        }
      ]
    },
    "codeExample": {
      "title": "Currying, Function Composition, and Pure Transforms",
      "code": "from functools import reduce\n\n# Pure functions\ndef sanitize(s: str) -> str:\n    return s.strip().lower()\n\ndef remove_punctuation(s: str) -> str:\n    return \"\".join(c for c in s if c.isalnum() or c.isspace())\n\n# Compose multiple functions: compose(f, g)(x) = f(g(x))\ndef compose(*functions):\n    return reduce(lambda f, g: lambda x: f(g(x)), functions)\n\nclean_pipeline = compose(remove_punctuation, sanitize)\nprint(\"Cleaned:\", clean_pipeline(\"  Hello, World! 2026...  \"))\n\n# Currying implementation\ndef curry2(fn):\n    \"\"\"Curries a 2-argument function.\"\"\"\n    return lambda a: lambda b: fn(a, b)\n\nadd = lambda a, b: a + b\ncurried_add = curry2(add)\nadd_five = curried_add(5)\nprint(\"Curried 5 + 10:\", add_five(10))",
      "explanation": "Demonstrates pure functions, composable functional pipelines using reduce, and currying."
    },
    "runnableCode": {
      "code": "# Maybe monad pattern for safe chaining without None checks\nclass Maybe:\n    def __init__(self, value):\n        self.value = value\n\n    def bind(self, func):\n        if self.value is None:\n            return Maybe(None)\n        return Maybe(func(self.value))\n\n    def get_or_else(self, default):\n        return self.value if self.value is not None else default\n\n# Safe pipeline handling missing data\nres1 = Maybe(\"42\").bind(int).bind(lambda x: x * 2).get_or_else(0)\nres2 = Maybe(None).bind(int).bind(lambda x: x * 2).get_or_else(0)\nprint(\"Valid pipeline result:\", res1)\nprint(\"None pipeline fallback:\", res2)",
      "expectedOutput": "Valid pipeline result: 84\nNone pipeline fallback: 0"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "    def bind(self, func):",
        "codeSnippet": "    def bind(self, func):",
        "explanation": "If value is None, short-circuits; otherwise applies function."
      },
      {
        "line": 14,
        "lines": "14",
        "code": "res1 = Maybe(\"42\").bind(int)...",
        "codeSnippet": "res1 = Maybe(\"42\").bind(int)...",
        "explanation": "Chains operations without nested if-else statements."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Mutating an input list inside a supposedly pure function: `def add_elem(lst, x): lst.append(x); return lst`.",
        "solution": "Return a new list: `return lst + [x]` or `[*lst, x]`.",
        "whyWrong": "Mutates caller's list in-place, introducing unpredictable side effects.",
        "howToFix": "Return a new list: `return lst + [x]` or `[*lst, x]`."
      },
      {
        "mistake": "Writing overly complex nested lambda compositions in Python.",
        "solution": "Balance functional idioms with Pythonic readability.",
        "whyWrong": "Hurts readability and produces unhelpful tracebacks.",
        "howToFix": "Balance functional idioms with Pythonic readability."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Concurrent Data Pipelines",
        "description": "Spark and PySpark map-reduce transformations executed across distributed worker nodes."
      },
      {
        "title": "Redux-Style State Reducers",
        "description": "Predictable state management in UI applications using pure reducer functions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-advanced-functional-pq1",
        "question": "What defines a \"pure function\"?",
        "hint": "Two key properties.",
        "answer": "1. It always produces the same output for the same input; 2. It causes zero observable side effects."
      },
      {
        "id": "py-advanced-functional-pq2",
        "question": "What is \"currying\" in functional programming?",
        "hint": "Transforming argument structures.",
        "answer": "Translating a function that takes multiple arguments into a chain of functions that each take a single argument."
      },
      {
        "id": "py-advanced-functional-pq3",
        "question": "What is referential transparency?",
        "hint": "Replacing expressions with values.",
        "answer": "An expression is referentially transparent if it can be replaced with its corresponding value without changing the program's behavior."
      }
    ],
    "quiz": [
      {
        "id": "py-advanced-functional-q1",
        "question": "Which of the following functions is PURE?",
        "options": [
          "def f(): return random.random()",
          "def f(x): print(x); return x",
          "def f(x, y): return x + y",
          "def f(x): global_total += x; return global_total"
        ],
        "correctIndex": 2,
        "explanation": "`f(x, y): return x + y` depends only on its inputs and causes zero side effects."
      },
      {
        "id": "py-advanced-functional-q2",
        "question": "What is the mathematical definition of function composition `(f ∘ g)(x)`?",
        "options": [
          "f(x) * g(x)",
          "f(g(x))",
          "g(f(x))",
          "f(x) + g(x)"
        ],
        "correctIndex": 1,
        "explanation": "Function composition `f ∘ g` evaluates to `f(g(x))`."
      },
      {
        "id": "py-advanced-functional-q3",
        "question": "Why are pure functions naturally thread-safe?",
        "options": [
          "They acquire the Python GIL",
          "They do not read or write shared mutable memory, eliminating race conditions",
          "They compile to C threads",
          "They run on separate CPU cores"
        ],
        "correctIndex": 1,
        "explanation": "Without shared mutable state, threads cannot interfere with each other's calculations."
      }
    ],
    "codingChallenge": {
      "title": "Build Pure Pipe Function",
      "problem": "Write a function `pipe(initial_value, *functions)` that passes `initial_value` through a sequence of functions from left to right: `pipe(val, f, g, h) = h(g(f(val)))`. If no functions are provided, return `initial_value`.",
      "hints": [
        "Initialize result = initial_value.",
        "Iterate for fn in functions: result = fn(result).",
        "Return result."
      ],
      "starterCode": "def pipe(initial_value, *functions):\n    # Write your solution here\n    pass",
      "solution": "def pipe(initial_value, *functions):\n    result = initial_value\n    for fn in functions:\n        result = fn(result)\n    return result",
      "testCases": [
        {
          "input": "pipe(5, lambda x: x * 2, lambda x: x + 1, str)",
          "expectedOutput": "\"11\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "    def bind(self, func):",
        "codeSnippet": "    def bind(self, func):",
        "explanation": "If value is None, short-circuits; otherwise applies function."
      },
      {
        "line": 14,
        "lines": "14",
        "code": "res1 = Maybe(\"42\").bind(int)...",
        "codeSnippet": "res1 = Maybe(\"42\").bind(int)...",
        "explanation": "Chains operations without nested if-else statements."
      }
    ],
    "applications": [
      {
        "industry": "Concurrent Data Pipelines",
        "application": "Spark and PySpark map-reduce transformations executed across distributed worker nodes.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Concurrent Data Pipelines",
        "description": "Spark and PySpark map-reduce transformations executed across distributed worker nodes."
      },
      {
        "industry": "Redux-Style State Reducers",
        "application": "Predictable state management in UI applications using pure reducer functions.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Redux-Style State Reducers",
        "description": "Predictable state management in UI applications using pure reducer functions."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Write pure functions without side effects and understand referential transparency.",
        "Implement function composition: chaining mathematical transformations cleanly.",
        "Understand Currying: converting multi-argument functions into sequences of single-argument functions."
      ]
    }
  },
  "py-advanced-regex": {
    "id": "py-advanced-regex",
    "moduleId": "python-module-8",
    "title": "Regular Expressions",
    "subtitle": "re Module, Precompiled Patterns, Named Capture Groups, and Lookarounds",
    "order": 8,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master pattern matching using Python's built-in `re` module.",
      "Distinguish between `re.match()`, `re.search()`, `re.findall()`, and `re.finditer()`.",
      "Extract structured substrings using named capture groups `(?P<name>pattern)`.",
      "Precompile expensive regular expressions with `re.compile()` for high-throughput loops."
    ],
    "prerequisites": [
      "Python strings and slicing."
    ],
    "analogy": {
      "title": "The Metal Detector with Custom Frequency Tuning",
      "text": "A simple string method like `.find(\"word\")` is a metal detector that only rings for copper pennies. Regular expressions are a military-grade ground-penetrating radar: you can program it to ring only for \"three capital letters followed by a hyphen and four numbers\" or \"an email containing an @ symbol with a valid domain\".",
      "metaphor": "Regular expressions define formal grammar patterns for text search and extraction."
    },
    "problemSolved": {
      "title": "Complex Text Extraction and Validation",
      "description": "Validating emails, phone numbers, log formats, and parsing HTML/markdown using basic string methods requires hundreds of lines of fragile loops. Regular expressions condense pattern matching into declarative rules.",
      "keyPoints": [
        "`re.match()` checks only at the START of the string; `re.search()` searches anywhere.",
        "Always use raw strings `r\"\\d+\"` to prevent Python from escaping backslashes.",
        "`(?P<name>pattern)` creates named capture groups accessible via `match.group(\"name\")`.",
        "`re.compile()` precompiles regular expression ASTs for repeated matching."
      ]
    },
    "intuition": {
      "overview": "The `re` engine parses the pattern string into an internal byte-code machine that walks the input text character by character with backtracking.",
      "steps": [
        {
          "step": 1,
          "title": "Compile",
          "description": "re.compile parses pattern string into an internal RegexObject."
        },
        {
          "step": 2,
          "title": "Match / Search",
          "description": "Executes regex automaton against input text, producing a Match object."
        },
        {
          "step": 3,
          "title": "Extraction",
          "description": "Extracts captured substring groups or replaces matches via re.sub."
        }
      ]
    },
    "codeExample": {
      "title": "Named Capture Groups and re.compile",
      "code": "import re\n\n# Raw string r\"...\" prevents Python backslash escape issues\nLOG_PATTERN = re.compile(\n    r\"\\[(?P<timestamp>[^\\]]+)\\] (?P<level>INFO|WARN|ERROR): (?P<message>.*)\"\n)\n\nlog_line = \"[2026-10-18 10:00:00] ERROR: Database connection lost on port 5432\"\n\nmatch = LOG_PATTERN.match(log_line)\nif match:\n    data = match.groupdict()\n    print(\"Parsed log dict:\", data)\n    print(\"Extracted level:\", match.group(\"level\"))",
      "explanation": "Demonstrates compiling a regex pattern, named capture groups (?P<name>), and match.groupdict()."
    },
    "runnableCode": {
      "code": "import re\n\ntext = \"Contact us at support@example.com or sales@shop.org for help.\"\nemail_pattern = r\"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\"\n\n# findall extracts all matching substrings\nemails = re.findall(email_pattern, text)\nprint(\"Extracted emails:\", emails)\n\n# re.sub replaces matches\ncensored = re.sub(email_pattern, \"[REDACTED]\", text)\nprint(\"Censored text:\", censored)",
      "expectedOutput": "Extracted emails: ['support@example.com', 'sales@shop.org']\nCensored text: Contact us at [REDACTED] or [REDACTED] for help."
    },
    "lineByLine": [
      {
        "line": 7,
        "lines": "7",
        "code": "emails = re.findall(email_pattern, text)",
        "codeSnippet": "emails = re.findall(email_pattern, text)",
        "explanation": "Finds all non-overlapping matches returning list of string matches."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "censored = re.sub(email_pattern, \"[REDACTED]\", text)",
        "codeSnippet": "censored = re.sub(email_pattern, \"[REDACTED]\", text)",
        "explanation": "Substitutes all pattern occurrences with replacement string."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `re.match()` when you intended `re.search()`.",
        "solution": "Use `re.search()` if the pattern can appear anywhere within the string.",
        "whyWrong": "`re.match()` only checks if the pattern matches at the VERY BEGINNING (index 0) of the string.",
        "howToFix": "Use `re.search()` if the pattern can appear anywhere within the string."
      },
      {
        "mistake": "Omitting the `r` prefix on regex strings: `\"\\d+\"` instead of `r\"\\d+\"`.",
        "solution": "Always declare regex patterns using raw strings: `r\"pattern\"`.",
        "whyWrong": "Python standard string escape sequences can mangle regex escape tokens (e.g. `\\b` word boundary becomes ASCII backspace 0x08).",
        "howToFix": "Always declare regex patterns using raw strings: `r\"pattern\"`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Form Validation",
        "description": "Validating international phone numbers, passwords, and postal codes."
      },
      {
        "title": "Log Ingestion Parsers",
        "description": "Parsing unstructured syslog, Apache, and Nginx logs into structured database records."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-advanced-regex-pq1",
        "question": "Why should regex patterns always use raw string literals `r\"...\"` in Python?",
        "hint": "Backslash escaping.",
        "answer": "To prevent Python's string parser from interpreting backslashes as string escape sequences before the regex engine receives them."
      },
      {
        "id": "py-advanced-regex-pq2",
        "question": "What is the difference between `re.match()` and `re.search()`?",
        "hint": "Starting position.",
        "answer": "`re.match()` matches only at the beginning of the string; `re.search()` searches for a match anywhere in the string."
      },
      {
        "id": "py-advanced-regex-pq3",
        "question": "How do you access named capture groups from a `Match` object as a dictionary?",
        "hint": "Method name.",
        "answer": "Using `match.groupdict()`."
      }
    ],
    "quiz": [
      {
        "id": "py-advanced-regex-q1",
        "question": "What does `re.findall(r\"\\d+\", \"abc123xyz456\")` return?",
        "options": [
          "[\"123\", \"456\"]",
          "[\"123456\"]",
          "MatchObject",
          "123"
        ],
        "correctIndex": 0,
        "explanation": "`re.findall` returns a list of all matching string occurrences."
      },
      {
        "id": "py-advanced-regex-q2",
        "question": "What is the syntax for defining a named capture group in Python regex?",
        "options": [
          "(?<name>pattern)",
          "(?P<name>pattern)",
          "(:name:pattern)",
          "(?#name:pattern)"
        ],
        "correctIndex": 1,
        "explanation": "Python uses the `(?P<name>pattern)` syntax for named capture groups."
      },
      {
        "id": "py-advanced-regex-q3",
        "question": "When should `re.compile()` be preferred over calling `re.search()` directly?",
        "options": [
          "Always, it is mandatory",
          "When the same regular expression pattern is executed repeatedly in a loop or high-frequency function",
          "Only for unicode strings",
          "Never"
        ],
        "correctIndex": 1,
        "explanation": "Precompiling patterns avoids reparsing and recompiling the regex AST on every iteration."
      }
    ],
    "codingChallenge": {
      "title": "Extract Hashtags from Tweet",
      "problem": "Write a function `extract_hashtags(tweet: str) -> list[str]` that extracts all valid hashtags (words starting with `#` followed by one or more alphanumeric characters or underscores, e.g. `#Python_3`). Return them as a lowercase list without the `#` symbol.",
      "hints": [
        "Use regex pattern r\"#([\\w]+)\".",
        "re.findall with capturing group returns the group contents.",
        "Lowercase extracted tokens: [h.lower() for h in matches]."
      ],
      "starterCode": "import re\n\ndef extract_hashtags(tweet: str) -> list[str]:\n    # Write your solution here\n    pass",
      "solution": "import re\n\ndef extract_hashtags(tweet: str) -> list[str]:\n    matches = re.findall(r\"#(\\w+)\", tweet)\n    return [m.lower() for m in matches]",
      "testCases": [
        {
          "input": "\"Learning #Python and #Machine_Learning with #AI!\"",
          "expectedOutput": "[\"python\", \"machine_learning\", \"ai\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 7,
        "lines": "7",
        "code": "emails = re.findall(email_pattern, text)",
        "codeSnippet": "emails = re.findall(email_pattern, text)",
        "explanation": "Finds all non-overlapping matches returning list of string matches."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "censored = re.sub(email_pattern, \"[REDACTED]\", text)",
        "codeSnippet": "censored = re.sub(email_pattern, \"[REDACTED]\", text)",
        "explanation": "Substitutes all pattern occurrences with replacement string."
      }
    ],
    "applications": [
      {
        "industry": "Form Validation",
        "application": "Validating international phone numbers, passwords, and postal codes.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Form Validation",
        "description": "Validating international phone numbers, passwords, and postal codes."
      },
      {
        "industry": "Log Ingestion Parsers",
        "application": "Parsing unstructured syslog, Apache, and Nginx logs into structured database records.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Log Ingestion Parsers",
        "description": "Parsing unstructured syslog, Apache, and Nginx logs into structured database records."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Master pattern matching using Python's built-in `re` module.",
        "Distinguish between `re.match()`, `re.search()`, `re.findall()`, and `re.finditer()`.",
        "Extract structured substrings using named capture groups `(?P<name>pattern)`."
      ]
    }
  },
  "py-advanced-collections": {
    "id": "py-advanced-collections",
    "moduleId": "python-module-8",
    "title": "collections and itertools",
    "subtitle": "deque, Counter, defaultdict, ChainMap, and itertools Pipelines",
    "order": 9,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Use collections.deque for high-performance O(1) double-ended queue operations.",
      "Use collections.Counter for mathematical multi-set arithmetic and tallying.",
      "Use collections.ChainMap for layered configuration scopes (defaults -> env -> cli).",
      "Combine collections with itertools for clean algorithmic data processing."
    ],
    "prerequisites": [
      "Python collections basics and loops."
    ],
    "analogy": {
      "title": "The Industrial Specialized Tool Chest",
      "text": "A standard list and dict are a basic hammer and screwdriver: they get simple jobs done. `collections` and `itertools` are the master mechanic's rollaway chest: double-headed hydraulic wrenches (`deque`), automatic hardware sorting bins (`Counter`), and conveyor belt couplers (`itertools.chain`).",
      "metaphor": "collections and itertools provide high-performance specialized container algorithms."
    },
    "problemSolved": {
      "title": "Eliminating O(N) List Inefficiencies and Complex Combinatorics",
      "description": "Using `list.insert(0, x)` or `list.pop(0)` takes O(N) time, dragging down queue algorithms. `collections.deque` provides O(1) appends and pops at both ends. `Counter` provides multi-set math.",
      "keyPoints": [
        "`collections.deque` implements a doubly-linked list of blocks for O(1) appends and pops on both sides.",
        "`Counter` supports arithmetic operators: `c1 + c2`, `c1 - c2`, `c1 & c2`.",
        "`collections.ChainMap` searches through multiple dictionaries in sequence without merging them into a new copy."
      ]
    },
    "intuition": {
      "overview": "These specialized standard library modules are implemented in C for memory efficiency and optimal asymptotic time complexity.",
      "steps": [
        {
          "step": 1,
          "title": "Selection",
          "description": "Choose deque for FIFO/LIFO queues, Counter for multiset tallies, ChainMap for hierarchical configs."
        },
        {
          "step": 2,
          "title": "Execution",
          "description": "Perform operations with guaranteed asymptotic speed."
        },
        {
          "step": 3,
          "title": "Chaining",
          "description": "Pipe into itertools for lazy consumption."
        }
      ]
    },
    "codeExample": {
      "title": "deque Sliding Window and ChainMap Scopes",
      "code": "from collections import deque, ChainMap, Counter\n\n# O(1) Bounded buffer with deque\nrecent_events = deque(maxlen=3)\nfor i in range(5):\n    recent_events.append(f\"event_{i}\")\nprint(\"Bounded buffer (last 3 items):\", list(recent_events))\n\n# ChainMap for configuration overrides\ndefaults = {\"theme\": \"light\", \"port\": 8080}\nenv_vars = {\"theme\": \"dark\"}\ncli_args = {\"port\": 9000}\n\n# Scoped lookup: CLI overrides Env, which overrides Defaults\nconfig = ChainMap(cli_args, env_vars, defaults)\nprint(\"Effective theme:\", config[\"theme\"]) # \"dark\" from env_vars\nprint(\"Effective port:\", config[\"port\"])   # 9000 from cli_args\n\n# Counter multiset arithmetic\nc1 = Counter(a=3, b=1)\nc2 = Counter(a=1, b=2)\nprint(\"Counter addition:\", c1 + c2) # Counter({'a': 4, 'b': 3})",
      "explanation": "Demonstrates bounded deque buffers, multi-layered config resolution with ChainMap, and Counter math."
    },
    "runnableCode": {
      "code": "from collections import deque\n\ndq = deque([1, 2, 3])\ndq.appendleft(0)  # O(1) left append!\ndq.append(4)      # O(1) right append!\nprint(\"Deque after appends:\", list(dq))\n\nleft_val = dq.popleft() # O(1) left pop!\nprint(f\"Popped left: {left_val}, remaining: {list(dq)}\")",
      "expectedOutput": "Deque after appends: [0, 1, 2, 3, 4]\nPopped left: 0, remaining: [1, 2, 3, 4]"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "dq.appendleft(0)",
        "codeSnippet": "dq.appendleft(0)",
        "explanation": "Pushes 0 to the front in O(1) time."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "dq.append(4)",
        "codeSnippet": "dq.append(4)",
        "explanation": "Pushes 4 to the back in O(1) time."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "left_val = dq.popleft()",
        "codeSnippet": "left_val = dq.popleft()",
        "explanation": "Pops 0 from the front in O(1) time without shifting elements."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using a standard list as a queue: `q.pop(0)`.",
        "solution": "Use `collections.deque` and `dq.popleft()` for O(1) performance.",
        "whyWrong": "Every `pop(0)` on a standard list forces all N remaining elements to shift left in memory (O(N) time).",
        "howToFix": "Use `collections.deque` and `dq.popleft()` for O(1) performance."
      },
      {
        "mistake": "Merging dictionaries with `.update()` when layered dynamic scoping is needed.",
        "solution": "Use `collections.ChainMap` to dynamically chain views without copying.",
        "whyWrong": "Overwrites values and creates a detached third dictionary copy.",
        "howToFix": "Use `collections.ChainMap` to dynamically chain views without copying."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Breadth-First Search (BFS)",
        "description": "Using `deque` for the BFS node discovery queue."
      },
      {
        "title": "Configuration Hierarchies",
        "description": "CLI tools resolving options across system config, user config, and command line flags."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-advanced-collections-pq1",
        "question": "What is the time complexity of `deque.popleft()` vs `list.pop(0)`?",
        "hint": "Asymptotic complexity.",
        "answer": "`deque.popleft()` is O(1); `list.pop(0)` is O(N)."
      },
      {
        "id": "py-advanced-collections-pq2",
        "question": "What does `ChainMap(a, b)[\"key\"]` return if `\"key\"` exists in both `a` and `b`?",
        "hint": "Search order.",
        "answer": "It returns the value from `a` (the first mapping in the chain)."
      },
      {
        "id": "py-advanced-collections-pq3",
        "question": "What happens when you append to a `deque(maxlen=3)` that already contains 3 items?",
        "hint": "Bounded behavior.",
        "answer": "It automatically discards the opposite end element to maintain maximum length 3."
      }
    ],
    "quiz": [
      {
        "id": "py-advanced-collections-q1",
        "question": "Which collection should you use for an efficient double-ended queue?",
        "options": [
          "list",
          "collections.deque",
          "queue.LifoQueue",
          "collections.OrderedDict"
        ],
        "correctIndex": 1,
        "explanation": "`collections.deque` provides O(1) pushes and pops from both ends."
      },
      {
        "id": "py-advanced-collections-q2",
        "question": "What does `collections.Counter(\"banana\")[\"a\"]` evaluate to?",
        "options": [
          "1",
          "2",
          "3",
          "KeyError"
        ],
        "correctIndex": 2,
        "explanation": "The letter \"a\" appears 3 times in \"banana\"."
      },
      {
        "id": "py-advanced-collections-q3",
        "question": "What happens when accessing a missing key in a `collections.Counter`?",
        "options": [
          "Raises KeyError",
          "Returns 0",
          "Returns None",
          "Inserts key with 0"
        ],
        "correctIndex": 1,
        "explanation": "`Counter` returns 0 for missing keys instead of raising `KeyError`."
      }
    ],
    "codingChallenge": {
      "title": "Top K Frequent Elements",
      "problem": "Write a function `top_k_frequent(nums: list[int], k: int) -> list[int]` that uses `collections.Counter` to find the `k` most frequent numbers in `nums`, returning them sorted by frequency descending.",
      "hints": [
        "Use counts = Counter(nums).",
        "Use counts.most_common(k).",
        "Extract number from (num, count) tuples: [item[0] for item in counts.most_common(k)]."
      ],
      "starterCode": "from collections import Counter\n\ndef top_k_frequent(nums: list[int], k: int) -> list[int]:\n    # Write your solution here\n    pass",
      "solution": "from collections import Counter\n\ndef top_k_frequent(nums: list[int], k: int) -> list[int]:\n    counts = Counter(nums)\n    return [val for val, _ in counts.most_common(k)]",
      "testCases": [
        {
          "input": "[1, 1, 1, 2, 2, 3], 2",
          "expectedOutput": "[1, 2]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "dq.appendleft(0)",
        "codeSnippet": "dq.appendleft(0)",
        "explanation": "Pushes 0 to the front in O(1) time."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "dq.append(4)",
        "codeSnippet": "dq.append(4)",
        "explanation": "Pushes 4 to the back in O(1) time."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "left_val = dq.popleft()",
        "codeSnippet": "left_val = dq.popleft()",
        "explanation": "Pops 0 from the front in O(1) time without shifting elements."
      }
    ],
    "applications": [
      {
        "industry": "Breadth-First Search (BFS)",
        "application": "Using `deque` for the BFS node discovery queue.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Breadth-First Search (BFS)",
        "description": "Using `deque` for the BFS node discovery queue."
      },
      {
        "industry": "Configuration Hierarchies",
        "application": "CLI tools resolving options across system config, user config, and command line flags.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Configuration Hierarchies",
        "description": "CLI tools resolving options across system config, user config, and command line flags."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Use collections.deque for high-performance O(1) double-ended queue operations.",
        "Use collections.Counter for mathematical multi-set arithmetic and tallying.",
        "Use collections.ChainMap for layered configuration scopes (defaults -> env -> cli)."
      ]
    }
  },
  "py-advanced-profiling": {
    "id": "py-advanced-profiling",
    "moduleId": "python-module-8",
    "title": "Time and Memory Profiling",
    "subtitle": "timeit, cProfile, pstats, and Eliminating Python Bottlenecks",
    "order": 10,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Measure micro-benchmarks accurately using standard library `timeit`.",
      "Profile full applications and identify CPU bottlenecks using `cProfile` and `pstats`.",
      "Understand cumulative time (cumtime) vs internal time (tottime) in profile reports.",
      "Follow Donald Knuth's golden rule: \"Premature optimization is the root of all evil\" — measure before optimizing."
    ],
    "prerequisites": [
      "Python functions, classes, and algorithmic complexity."
    ],
    "analogy": {
      "title": "The Highway Traffic Helicopter and Stopwatch",
      "text": "Guessing where code is slow is like a driver assuming the highway delay is at the toll booth. Profiling with `cProfile` is the traffic helicopter hovering above the entire metropolitan area: it points its camera at every single interchange, measuring exact cars-per-second, and reveals that 92% of the delay is actually at a single bottleneck bridge on ramp 4.",
      "metaphor": "Profilers replace guesswork with deterministic runtime telemetry."
    },
    "problemSolved": {
      "title": "Identifying Real Performance Bottlenecks with Scientific Accuracy",
      "description": "Developers frequently spend hours optimizing functions that only account for 1% of runtime while ignoring the single function consuming 90% of execution time. Profilers direct optimization efforts where they have maximum impact.",
      "keyPoints": [
        "`timeit` disables garbage collection during runs to measure raw algorithmic execution time.",
        "`cProfile` has negligible overhead and records call counts, total time, and cumulative time.",
        "`tottime` is time spent inside the function excluding sub-calls; `cumtime` includes all sub-calls."
      ]
    },
    "intuition": {
      "overview": "CPython provides low-level profiling hooks (`sys.setprofile`) that `cProfile` hooks into to timestamp call and return events.",
      "steps": [
        {
          "step": 1,
          "title": "Instrument",
          "description": "cProfile wraps execution block with event hooks."
        },
        {
          "step": 2,
          "title": "Measure",
          "description": "Records per-function invocations, CPU ticks, and hierarchy."
        },
        {
          "step": 3,
          "title": "Analyze",
          "description": "pstats sorts and displays hottest functions by tottime or cumtime."
        }
      ]
    },
    "codeExample": {
      "title": "Profiling Code with cProfile and pstats",
      "code": "import cProfile\nimport pstats\nimport io\nimport time\n\ndef slow_step():\n    time.sleep(0.05)\n\ndef fast_step():\n    return sum(x ** 2 for x in range(10_000))\n\ndef main_workflow():\n    fast_step()\n    slow_step()\n    fast_step()\n\n# Run profiling\npr = cProfile.Profile()\npr.enable()\nmain_workflow()\npr.disable()\n\n# Format and sort stats\nstream = io.StringIO()\nps = pstats.Stats(pr, stream=stream).sort_stats(\"cumtime\")\nps.print_stats(5)\nprint(\"Profile report (top 5 by cumulative time):\\n\", stream.getvalue()[:400])",
      "explanation": "Demonstrates programmatic profiling using cProfile.Profile() and sorting results by cumulative time with pstats."
    },
    "runnableCode": {
      "code": "import timeit\n\n# Compare list comprehension vs list(map())\ncomp_time = timeit.timeit(\"[x * 2 for x in range(1000)]\", number=1000)\nmap_time = timeit.timeit(\"list(map(lambda x: x * 2, range(1000)))\", number=1000)\n\nprint(f\"Comprehension time (1000 runs): {comp_time:.4f}s\")\nprint(f\"Map time (1000 runs): {map_time:.4f}s\")\nprint(\"Comprehension faster?\", comp_time < map_time)",
      "expectedOutput": "Comprehension faster? True"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "comp_time = timeit.timeit(...)",
        "codeSnippet": "comp_time = timeit.timeit(...)",
        "explanation": "Executes expression 1000 times, measuring total wall-clock duration."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "print(\"Comprehension faster?\", comp_time < map_time)",
        "codeSnippet": "print(\"Comprehension faster?\", comp_time < map_time)",
        "explanation": "Demonstrates list comprehensions generally outperform lambda maps."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `time.time()` for micro-benchmarking tiny functions.",
        "solution": "Use the `timeit` module, which runs many iterations and controls for clock noise.",
        "whyWrong": "Subject to system clock resolution limits, background OS interruptions, and garbage collection interference.",
        "howToFix": "Use the `timeit` module, which runs many iterations and controls for clock noise."
      },
      {
        "mistake": "Optimizing based on `tottime` instead of checking call frequency.",
        "solution": "Check both `ncalls` and `percall` stats to understand the root cause.",
        "whyWrong": "A fast 1-microsecond function called 10 million times might show high total time simply because of call count.",
        "howToFix": "Check both `ncalls` and `percall` stats to understand the root cause."
      }
    ],
    "realWorldApplications": [
      {
        "title": "API Response Optimization",
        "description": "Profiling slow web requests to identify whether DB queries or JSON serialization is the bottleneck."
      },
      {
        "title": "Data Science Training Loops",
        "description": "Identifying data loader bottlenecks that starve GPUs during deep learning training."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-advanced-profiling-pq1",
        "question": "What is the difference between `tottime` and `cumtime` in a cProfile report?",
        "hint": "Sub-function inclusion.",
        "answer": "`tottime` is time spent strictly inside the function excluding sub-calls; `cumtime` includes time spent inside the function PLUS all sub-calls it initiated."
      },
      {
        "id": "py-advanced-profiling-pq2",
        "question": "What standard library module is designed for accurate micro-benchmarking of small code snippets?",
        "hint": "Module name.",
        "answer": "The `timeit` module."
      },
      {
        "id": "py-advanced-profiling-pq3",
        "question": "How can you run cProfile from the command line without modifying script code?",
        "hint": "Python -m flag.",
        "answer": "`python -m cProfile -s cumtime my_script.py`."
      }
    ],
    "quiz": [
      {
        "id": "py-advanced-profiling-q1",
        "question": "Which built-in C-extension profiler is recommended for general production profiling in Python?",
        "options": [
          "profile",
          "cProfile",
          "hotshot",
          "sys.timer"
        ],
        "correctIndex": 1,
        "explanation": "`cProfile` is a C extension with low overhead suitable for profiling long-running programs."
      },
      {
        "id": "py-advanced-profiling-q2",
        "question": "What does `ncalls` mean in a pstats report?",
        "options": [
          "Number of CPU cores utilized",
          "Total number of times the function was called",
          "Network calls made",
          "Name of callers"
        ],
        "correctIndex": 1,
        "explanation": "`ncalls` indicates the total number of invocations for that function."
      },
      {
        "id": "py-advanced-profiling-q3",
        "question": "Why does `timeit` run test code thousands of times by default?",
        "options": [
          "To stress test RAM",
          "To average out operating system thread scheduling and CPU frequency scaling noise",
          "Because Python bytecode is slow",
          "To prevent memory leaks"
        ],
        "correctIndex": 1,
        "explanation": "Repeating runs smooths out OS scheduling noise and clock jitter for reliable microsecond benchmarks."
      }
    ],
    "codingChallenge": {
      "title": "Benchmark and Pick Faster Function",
      "problem": "Write a function `pick_faster(fn1: callable, fn2: callable, runs: int = 500) -> str` that runs both functions `runs` times using `time.perf_counter()`, returning `\"fn1\"` if fn1 took less total time, or `\"fn2\"` if fn2 was faster (or equal).",
      "hints": [
        "Record start = time.perf_counter(); loop runs times; t1 = time.perf_counter() - start.",
        "Repeat for fn2.",
        "Return \"fn1\" if t1 < t2 else \"fn2\"."
      ],
      "starterCode": "import time\n\ndef pick_faster(fn1, fn2, runs: int = 500) -> str:\n    # Write your solution here\n    pass",
      "solution": "import time\n\ndef pick_faster(fn1, fn2, runs: int = 500) -> str:\n    s1 = time.perf_counter()\n    for _ in range(runs):\n        fn1()\n    t1 = time.perf_counter() - s1\n    \n    s2 = time.perf_counter()\n    for _ in range(runs):\n        fn2()\n    t2 = time.perf_counter() - s2\n    \n    return \"fn1\" if t1 < t2 else \"fn2\"",
      "testCases": [
        {
          "input": "f_fast = lambda: 1 + 1; f_slow = lambda: sum(range(100)); pick_faster(f_fast, f_slow)",
          "expectedOutput": "\"fn1\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "comp_time = timeit.timeit(...)",
        "codeSnippet": "comp_time = timeit.timeit(...)",
        "explanation": "Executes expression 1000 times, measuring total wall-clock duration."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "print(\"Comprehension faster?\", comp_time < map_time)",
        "codeSnippet": "print(\"Comprehension faster?\", comp_time < map_time)",
        "explanation": "Demonstrates list comprehensions generally outperform lambda maps."
      }
    ],
    "applications": [
      {
        "industry": "API Response Optimization",
        "application": "Profiling slow web requests to identify whether DB queries or JSON serialization is the bottleneck.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "API Response Optimization",
        "description": "Profiling slow web requests to identify whether DB queries or JSON serialization is the bottleneck."
      },
      {
        "industry": "Data Science Training Loops",
        "application": "Identifying data loader bottlenecks that starve GPUs during deep learning training.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Data Science Training Loops",
        "description": "Identifying data loader bottlenecks that starve GPUs during deep learning training."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Measure micro-benchmarks accurately using standard library `timeit`.",
        "Profile full applications and identify CPU bottlenecks using `cProfile` and `pstats`.",
        "Understand cumulative time (cumtime) vs internal time (tottime) in profile reports."
      ]
    }
  }
};
