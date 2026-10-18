import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule7Data: PythonModuleData = {
  "id": "python-module-7",
  "number": 7,
  "title": "Exceptions, Files, and Modules",
  "subtitle": "Error Handling, I/O, Packaging & Environment Management",
  "description": "Write robust programs that handle failure gracefully. Master exception hierarchies, create custom exceptions, read and write files with context managers, organize code into packages, manage dependencies with virtual environments and pip, and implement structured logging.",
  "icon": "Shield",
  "badge": "Exceptions & Files",
  "estimatedHours": 7,
  "topicsCount": 8,
  "lessons": [
    {
      "id": "py-exceptions-handling",
      "moduleId": "python-module-7",
      "title": "Exception Handling: try, except, finally",
      "description": "Exception hierarchy, catching multiple types, else clause, finally cleanup, and re-raising.",
      "order": 1,
      "readTimeMinutes": 22,
      "visualizerType": "execution-trace",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-exceptions-custom",
      "moduleId": "python-module-7",
      "title": "Creating Custom Exceptions",
      "description": "Subclassing Exception, adding attributes, exception chaining with raise ... from.",
      "order": 2,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-files-reading-writing",
      "moduleId": "python-module-7",
      "title": "File Reading and Writing",
      "description": "open() modes, read/readline/readlines, write/writelines, binary files, and pathlib.",
      "order": 3,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-files-context-managers",
      "moduleId": "python-module-7",
      "title": "Context Managers (with statement)",
      "description": "__enter__ and __exit__, contextlib.contextmanager decorator, and resource management.",
      "order": 4,
      "readTimeMinutes": 20,
      "visualizerType": "execution-trace",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-modules-imports",
      "moduleId": "python-module-7",
      "title": "Imports and Packages",
      "description": "import, from...import, __init__.py, relative imports, and the sys.path module search order.",
      "order": 5,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-modules-venv",
      "moduleId": "python-module-7",
      "title": "Virtual Environments and pip",
      "description": "Creating venvs, pip install/freeze, requirements.txt, and why isolated environments matter.",
      "order": 6,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "py-modules-env-vars",
      "moduleId": "python-module-7",
      "title": "Environment Variables and Configuration",
      "description": "os.environ, python-dotenv, config files, and separating secrets from code.",
      "order": 7,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-modules-logging",
      "moduleId": "python-module-7",
      "title": "Logging and Debugging",
      "description": "logging module, log levels, handlers, formatters, and structured logging best practices.",
      "order": 8,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    }
  ]
};

export const pythonModule7Lessons: Record<string, PythonLessonContent> = {
  "py-exceptions-handling": {
    "id": "py-exceptions-handling",
    "moduleId": "python-module-7",
    "title": "Exception Handling: try, except, else, finally",
    "subtitle": "Exception Hierarchies, Defensive Design, Resource Cleanup & Exception Chaining",
    "order": 1,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "execution-trace",
    "objectives": [
      "Master the complete 4-part exception handling syntax: try, except, else, and finally",
      "Understand the Python BaseException vs Exception hierarchy and why catching BaseException is harmful",
      "Handle multiple exception types cleanly using tuples and specific except blocks",
      "Use the else clause correctly for code that should execute only when no errors occurred",
      "Guarantee resource cleanup in finally blocks even when exceptions or early returns happen",
      "Inspect and re-raise exceptions with tracebacks and exception chaining (raise ... from)"
    ],
    "prerequisites": [
      "Control flow (if-else, loops) and function definitions",
      "Understanding of runtime errors (ValueError, ZeroDivisionError, FileNotFoundError)"
    ],
    "analogy": {
      "title": "The Industrial Circuit Breaker and Safety Shutter",
      "text": "Imagine an automated chemical reactor: the 'try' block is the hazardous chemical reaction chamber. The 'except' blocks are specialized fire extinguishers tailored to specific emergencies (foam for oil, gas for electrical). The 'else' block is the packing conveyor that operates only if the reaction succeeded without triggering any alarms. The 'finally' block is the hydraulic safety purge and cooling fan: whether the reaction succeeded or the entire chamber burst into flames, the purge valve runs unconditionally to ensure the facility never blows up.",
      "metaphor": "Exception handling converts sudden runtime panics into predictable, recoverable control flows through a type-matched dispatch table."
    },
    "problemSolved": {
      "title": "Why Structured Exception Handling?",
      "description": "Without exception handling, any unexpected input, missing file, or network glitch causes the entire program to crash with a brutal traceback. Structured handling lets programs degrade gracefully, log diagnostic data, release scarce resources, and inform users cleanly.",
      "keyPoints": [
        "Resilience: prevents transient network or input errors from taking down long-running web servers or workers",
        "Guaranteed cleanup: ensures file handles, database connections, and locks are always released via finally",
        "Separation of concerns: separates happy-path business logic from rare error-recovery routines",
        "Detailed diagnostics: attaches context and preserves root cause stack traces using exception chaining"
      ]
    },
    "intuition": {
      "overview": "Python tests each except clause from top to bottom, executing the first one whose class is an instance of or subclass of the raised exception.",
      "steps": [
        {
          "step": 1,
          "title": "The try Block",
          "description": "Encloses the risky operation that might raise an exception. Execution proceeds normally line by line until an error occurs or the block completes."
        },
        {
          "step": 2,
          "title": "The except Block(s)",
          "description": "If an exception occurs in try, Python immediately interrupts execution and searches for a matching except handler. Unmatched exceptions propagate up the call stack."
        },
        {
          "step": 3,
          "title": "The else Block",
          "description": "Executes ONLY if the try block completed successfully without raising any exceptions. Best place for logic that depends on the try block succeeding."
        },
        {
          "step": 4,
          "title": "The finally Block",
          "description": "ALWAYS executes before leaving the try statement, regardless of whether an exception occurred, was handled, was re-raised, or a return statement was executed."
        }
      ]
    },
    "codeExample": {
      "title": "The Complete try-except-else-finally Lifecycle",
      "code": "def process_transaction(amount_str: str, balance: float) -> float:\n    print(f\"\\n--- Processing amount: '{amount_str}' ---\")\n    try:\n        amount = float(amount_str)\n        if amount <= 0:\n            raise ValueError(\"Transaction amount must be strictly positive.\")\n        if amount > balance:\n            raise ArithmeticError(f\"Insufficient funds: requested {amount}, balance {balance}\")\n    except ValueError as val_err:\n        print(f\"[RECOVERED] Value error: {val_err}\")\n        return balance\n    except ArithmeticError as arith_err:\n        print(f\"[RECOVERED] Arithmetic error: {arith_err}\")\n        return balance\n    else:\n        balance -= amount\n        print(f\"[SUCCESS] Debited {amount}. New balance: {balance}\")\n        return balance\n    finally:\n        print(\"[AUDIT LOG] Transaction cycle concluded.\")\n\ncurrent_bal = 100.0\ncurrent_bal = process_transaction(\"40.0\", current_bal)   # Success\ncurrent_bal = process_transaction(\"-15.0\", current_bal)  # Negative\ncurrent_bal = process_transaction(\"abc\", current_bal)    # Non-numeric\ncurrent_bal = process_transaction(\"200.0\", current_bal)  # Insufficient",
      "explanation": "Demonstrates all four blocks interacting with different input types. Notice that the finally block prints its audit log on every single call without exception."
    },
    "runnableCode": {
      "code": "def divide_safely(a: str, b: str):\n    try:\n        num = float(a)\n        den = float(b)\n        result = num / den\n    except (ValueError, TypeError) as parse_err:\n        print(f\"Invalid input: {parse_err}\")\n    except ZeroDivisionError:\n        print(\"Error: Cannot divide by zero!\")\n    else:\n        print(f\"Result: {a} / {b} = {result:.2f}\")\n    finally:\n        print(\"Operation attempt completed.\")\n\ndivide_safely(\"10\", \"2\")\nprint(\"---\")\ndivide_safely(\"10\", \"0\")\nprint(\"---\")\ndivide_safely(\"ten\", \"2\")",
      "expectedOutput": "Result: 10 / 2 = 5.00\nOperation attempt completed.\n---\nError: Cannot divide by zero!\nOperation attempt completed.\n---\nInvalid input: could not convert string to float: 'ten'\nOperation attempt completed."
    },
    "lineByLineExplanation": [
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "except (ValueError, TypeError) as parse_err:",
        "codeSnippet": "except (ValueError, TypeError) as parse_err:",
        "explanation": "Catches multiple distinct exception types in a single tuple handler."
      },
      {
        "line": "10-11",
        "lines": "10-11",
        "code": "else: print(f\"Result: ...\")",
        "codeSnippet": "else: print(f\"Result: ...\")",
        "explanation": "Runs only if division was successful and no exceptions were raised."
      },
      {
        "line": "12-13",
        "lines": "12-13",
        "code": "finally: print(\"Operation attempt completed.\")",
        "codeSnippet": "finally: print(\"Operation attempt completed.\")",
        "explanation": "Guaranteed cleanup step that runs regardless of success, failure, or return."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using a bare 'except:' without specifying an exception class",
        "solution": "Always catch 'Exception' or specific subclasses. A bare 'except:' catches SystemExit and KeyboardInterrupt (Ctrl+C), making the program impossible to terminate gracefully.",
        "codeExample": "# BAD:\ntry: do_work()\nexcept: pass  # Catches KeyboardInterrupt, masking Ctrl+C!\n\n# GOOD:\ntry: do_work()\nexcept Exception as e: log_error(e)"
      },
      {
        "mistake": "Putting too much code inside the try block",
        "solution": "Keep the try block minimal: include only the specific statement likely to raise the expected error. Broad try blocks mask unrelated bugs.",
        "codeExample": "# BAD: Putting file open, parsing, network, and database in 1 try\n# GOOD: Narrow try blocks around the exact risky calls."
      }
    ],
    "bestPractices": [
      "Catch specific exceptions (e.g. FileNotFoundError, KeyError) rather than general Exception",
      "Use the else clause for code that depends on the try block succeeding to avoid accidentally catching unintended exceptions",
      "Always release external resources in finally blocks or use context managers (with statements)",
      "Use 'raise ... from err' for exception chaining to preserve original diagnostic context"
    ],
    "applications": [
      {
        "industry": "Web APIs and Microservices",
        "application": "Global exception middleware and HTTP error mapping",
        "benefit": "Transforms low-level database or validation exceptions into structured RFC-7807 JSON error responses."
      },
      {
        "industry": "Financial Transaction Processing",
        "application": "Atomic transaction rollback and ledger auditing",
        "benefit": "Guarantees rollback in except blocks and audit log flushing in finally blocks."
      },
      {
        "industry": "Distributed Systems",
        "application": "Exponential backoff and retry decorators",
        "benefit": "Catches network timeouts and socket disconnects to retry without crashing background worker queues."
      }
    ],
    "practiceQuestions": [
      {
        "id": "q1",
        "question": "What is the order of execution between a return statement inside a try block and its finally block?",
        "hint": "Can finally prevent or modify a return?",
        "answer": "The expression in the try block's return statement is evaluated, but before the function actually exits, the finally block is executed. If finally contains another return, it overrides the try return."
      },
      {
        "id": "q2",
        "question": "Why should you inherit from Exception rather than BaseException when creating custom errors?",
        "hint": "What built-in exceptions inherit directly from BaseException?",
        "answer": "BaseException is the root of KeyboardInterrupt, SystemExit, and GeneratorExit. Inheriting from Exception ensures your error can be caught by standard 'except Exception:' handlers without disrupting system signals."
      },
      {
        "id": "q3",
        "question": "When does the else block execute in a try statement?",
        "hint": "Think about whether exceptions occurred.",
        "answer": "The else block executes only if the try block ran to completion without raising any exceptions."
      }
    ],
    "quiz": [
      {
        "id": "quiz-1",
        "question": "Which of the following will NEVER be caught by 'except Exception:'?",
        "options": [
          "ValueError",
          "ZeroDivisionError",
          "KeyboardInterrupt",
          "KeyError"
        ],
        "correctIndex": 2,
        "explanation": "KeyboardInterrupt inherits directly from BaseException, not from Exception."
      },
      {
        "id": "quiz-2",
        "question": "What happens if an exception is raised in the try block and no matching except clause is found?",
        "options": [
          "The finally block runs, then the exception propagates up the call stack",
          "The finally block is skipped",
          "The program silently ignores the error",
          "The else block runs instead"
        ],
        "correctIndex": 0,
        "explanation": "The finally block always runs first; then the unhandled exception propagates up the call stack."
      },
      {
        "id": "quiz-3",
        "question": "What is the syntax for catching both FileNotFoundError and PermissionError together?",
        "options": [
          "except FileNotFoundError or PermissionError:",
          "except (FileNotFoundError, PermissionError):",
          "except FileNotFoundError, PermissionError:",
          "except [FileNotFoundError, PermissionError]:"
        ],
        "correctIndex": 1,
        "explanation": "Multiple exceptions must be grouped in parentheses as a tuple."
      }
    ],
    "codingChallenge": {
      "title": "Robust Integer Parser with Bounds Checking",
      "problem": "Write a function safe_parse_int(value: str, min_val: int, max_val: int) -> int. If value cannot be converted to an integer, raise ValueError(\"Invalid integer string\"). If value is outside [min_val, max_val], raise ValueError(f\"Value {v} out of range [{min_val}, {max_val}]\"). Return the parsed integer if valid.",
      "hints": [
        "Use int(value) inside a try block.",
        "Catch ValueError and re-raise with the required custom message.",
        "Check boundaries in the else block."
      ],
      "starterCode": "def safe_parse_int(value: str, min_val: int, max_val: int) -> int:\n    # Write safe parsing logic\n    pass",
      "solution": "def safe_parse_int(value: str, min_val: int, max_val: int) -> int:\n    try:\n        parsed = int(value)\n    except ValueError as err:\n        raise ValueError(\"Invalid integer string\") from err\n    else:\n        if parsed < min_val or parsed > max_val:\n            raise ValueError(f\"Value {parsed} out of range [{min_val}, {max_val}]\")\n        return parsed"
    },
    "summary": {
      "keyTakeaways": [
        "try -> except -> else -> finally provides a comprehensive failure-handling lifecycle",
        "finally guarantees execution for resource cleanup, even across returns and unhandled errors",
        "else ensures code only runs if try succeeded without triggering unnecessary error handlers",
        "Never use bare except:; catch specific exceptions or Exception to avoid blocking KeyboardInterrupt",
        "Use 'raise ... from' for transparent exception chaining and preserving causality"
      ],
      "nextLessonId": "py-exceptions-custom",
      "nextLessonTitle": "Creating Custom Exceptions",
      "nextLessonModuleId": "python-module-7"
    },
    "lineByLine": [
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "except (ValueError, TypeError) as parse_err:",
        "codeSnippet": "except (ValueError, TypeError) as parse_err:",
        "explanation": "Catches multiple distinct exception types in a single tuple handler."
      },
      {
        "line": "10-11",
        "lines": "10-11",
        "code": "else: print(f\"Result: ...\")",
        "codeSnippet": "else: print(f\"Result: ...\")",
        "explanation": "Runs only if division was successful and no exceptions were raised."
      },
      {
        "line": "12-13",
        "lines": "12-13",
        "code": "finally: print(\"Operation attempt completed.\")",
        "codeSnippet": "finally: print(\"Operation attempt completed.\")",
        "explanation": "Guaranteed cleanup step that runs regardless of success, failure, or return."
      }
    ]
  },
  "py-exceptions-custom": {
    "id": "py-exceptions-custom",
    "moduleId": "python-module-7",
    "title": "Creating Custom Exceptions",
    "subtitle": "Subclassing Exception, Context Attributes, and Exception Chaining with raise ... from",
    "order": 2,
    "readTimeMinutes": 18,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Define domain-specific custom exception classes by subclassing Exception.",
      "Attach contextual error metadata (error codes, user IDs, invalid values) to exception instances.",
      "Use explicit exception chaining with `raise NewError from original_error` to preserve root causes.",
      "Design hierarchical exception trees for cohesive library error handling."
    ],
    "prerequisites": [
      "Basic try/except handling and class inheritance."
    ],
    "analogy": {
      "title": "The Specialized Hospital Diagnostic Triage",
      "text": "A generic `Exception` is a patient shouting \"I am sick!\" (too vague to treat specifically). A custom exception is a medical diagnosis like `CardiacArrhythmiaError` or `FracturedFemurError`. It carries exact patient vitals, timestamps, and doctor notes so specialists in the ER can apply targeted treatments immediately.",
      "metaphor": "Custom exceptions provide precise error taxonomy with structured debugging context."
    },
    "problemSolved": {
      "title": "Differentiating Application Errors from System Failures",
      "description": "Catching generic ValueError or KeyError often masks underlying bugs. Custom exceptions allow client code to catch only the specific business-logic failures they know how to handle.",
      "keyPoints": [
        "Always inherit custom exceptions from `Exception`, never from `BaseException`.",
        "End custom exception class names with `Error` (e.g. `UserNotFoundError`).",
        "`raise ... from err` sets `__cause__`, preserving the original traceback."
      ]
    },
    "intuition": {
      "overview": "Exceptions are standard Python objects. When raised, CPython unwinds execution frames until an except block matches `isinstance(raised_exception, ExceptType)`.",
      "steps": [
        {
          "step": 1,
          "title": "Definition",
          "description": "Create class inheriting from Exception with custom __init__ for attributes."
        },
        {
          "step": 2,
          "title": "Raising with Cause",
          "description": "Use raise MyError(\"msg\") from original_exc to link root causes."
        },
        {
          "step": 3,
          "title": "Granular Catching",
          "description": "Callers catch MyError without accidentally catching unrelated ValueErrors."
        }
      ]
    },
    "codeExample": {
      "title": "Hierarchical Custom Exceptions with Chaining",
      "code": "class AppError(Exception):\n    \"\"\"Base exception for all application errors.\"\"\"\n    pass\n\nclass DatabaseConnectionError(AppError):\n    def __init__(self, host: str, port: int, original_error: Exception | None = None):\n        self.host = host\n        self.port = port\n        message = f\"Failed to connect to database at {host}:{port}\"\n        super().__init__(message)\n\ndef connect_to_db(host, port):\n    try:\n        # Simulate lower-level socket error\n        raise TimeoutError(\"Connection timed out after 3000ms\")\n    except TimeoutError as err:\n        raise DatabaseConnectionError(host, port) from err\n\ntry:\n    connect_to_db(\"db.prod.internal\", 5432)\nexcept DatabaseConnectionError as e:\n    print(f\"Caught: {e}\")\n    print(f\"Host: {e.host}, Root cause: {e.__cause__}\")",
      "explanation": "Demonstrates custom exception inheritance, custom attribute storage, and exception chaining via `from err`."
    },
    "runnableCode": {
      "code": "class InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        super().__init__(f\"Attempted to withdraw ${amount}, but balance is only ${balance}\")\n        self.balance = balance\n        self.amount = amount\n\ntry:\n    raise InsufficientFundsError(25.0, 100.0)\nexcept InsufficientFundsError as e:\n    print(\"Error:\", e)\n    print(\"Deficit:\", e.amount - e.balance)",
      "expectedOutput": "Error: Attempted to withdraw $100.0, but balance is only $25.0\nDeficit: 75.0"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "class InsufficientFundsError(Exception):",
        "codeSnippet": "class InsufficientFundsError(Exception):",
        "explanation": "Subclasses built-in Exception."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    def __init__(self, balance, amount):",
        "codeSnippet": "    def __init__(self, balance, amount):",
        "explanation": "Accepts domain-specific parameters."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "        super().__init__(f\"...\")",
        "codeSnippet": "        super().__init__(f\"...\")",
        "explanation": "Passes formatted message string to parent Exception for str(e)."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "        self.balance = balance",
        "codeSnippet": "        self.balance = balance",
        "explanation": "Stores balance on exception object for programmatic recovery."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Inheriting custom exceptions directly from `BaseException`.",
        "solution": "Always inherit from `Exception`.",
        "whyWrong": "Bypasses standard `except Exception:` blocks and interferes with system signals like KeyboardInterrupt.",
        "howToFix": "Always inherit from `Exception`."
      },
      {
        "mistake": "Raising strings: `raise \"Error occurred\"`.",
        "solution": "Always instantiate an Exception class: `raise ValueError(\"Error occurred\")`.",
        "whyWrong": "Forbidden in modern Python; raises `TypeError: exceptions must derive from BaseException`.",
        "howToFix": "Always instantiate an Exception class: `raise ValueError(\"Error occurred\")`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Payment Gateways",
        "description": "Raising `CardDeclinedError`, `ExpiredTokenError`, or `FraudDetectionError`."
      },
      {
        "title": "REST API Frameworks",
        "description": "FastAPI and Flask catching domain exceptions and converting them to JSON HTTP status codes."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-exceptions-custom-pq1",
        "question": "Why should custom exceptions inherit from `Exception` rather than `BaseException`?",
        "hint": "Signal handling and generic catch blocks.",
        "answer": "`BaseException` is reserved for system-exiting exceptions like `KeyboardInterrupt` and `SystemExit`. Catching `Exception` should catch all normal program errors without swallowing system interrupts."
      },
      {
        "id": "py-exceptions-custom-pq2",
        "question": "How do you access the original exception when chained with `raise CustomError from original_err`?",
        "hint": "Dunder attribute on exception object.",
        "answer": "Via the `__cause__` attribute on the caught exception."
      },
      {
        "id": "py-exceptions-custom-pq3",
        "question": "What is the naming convention for custom exception classes in PEP 8?",
        "hint": "Suffix convention.",
        "answer": "They should end with the suffix `Error` (e.g. `PaymentError`)."
      }
    ],
    "quiz": [
      {
        "id": "py-exceptions-custom-q1",
        "question": "Which statement correctly preserves the original traceback when re-raising a custom exception?",
        "options": [
          "raise MyError() with original",
          "raise MyError() from original",
          "raise MyError(original)",
          "raise original -> MyError"
        ],
        "correctIndex": 1,
        "explanation": "The `raise ... from ...` syntax explicitly chains the new exception to the underlying cause."
      },
      {
        "id": "py-exceptions-custom-q2",
        "question": "What is `e.__cause__` if an exception was raised with `raise MyError() from root_exc`?",
        "options": [
          "None",
          "A reference to root_exc",
          "The string name of root_exc",
          "A tuple of stack frames"
        ],
        "correctIndex": 1,
        "explanation": "`__cause__` stores a direct reference to the original chained exception object."
      },
      {
        "id": "py-exceptions-custom-q3",
        "question": "What base class should all custom domain errors inherit from?",
        "options": [
          "BaseException",
          "Exception",
          "RuntimeError",
          "StandardError"
        ],
        "correctIndex": 1,
        "explanation": "All non-system-exiting exceptions must inherit from `Exception`."
      }
    ],
    "codingChallenge": {
      "title": "Implement Validated Age Field Exception",
      "problem": "Create a custom exception `InvalidAgeError(ValueError)` whose `__init__` takes `age: int` and sets `self.age = age` with message `f\"Invalid age: {age}. Age must be between 0 and 120.\"`. Write a function `validate_age(age: int) -> int` that raises this exception if `age < 0` or `age > 120`, otherwise returns `age`.",
      "hints": [
        "In InvalidAgeError.__init__: super().__init__(f\"Invalid age: {age}. Age must be between 0 and 120.\"); self.age = age.",
        "In validate_age: if age < 0 or age > 120: raise InvalidAgeError(age); return age."
      ],
      "starterCode": "class InvalidAgeError(ValueError):\n    # Write your solution here\n    pass\n\ndef validate_age(age: int) -> int:\n    # Write your solution here\n    pass",
      "solution": "class InvalidAgeError(ValueError):\n    def __init__(self, age: int):\n        super().__init__(f\"Invalid age: {age}. Age must be between 0 and 120.\")\n        self.age = age\n\ndef validate_age(age: int) -> int:\n    if age < 0 or age > 120:\n        raise InvalidAgeError(age)\n    return age",
      "testCases": [
        {
          "input": "validate_age(25)",
          "expectedOutput": "25"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "class InsufficientFundsError(Exception):",
        "codeSnippet": "class InsufficientFundsError(Exception):",
        "explanation": "Subclasses built-in Exception."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    def __init__(self, balance, amount):",
        "codeSnippet": "    def __init__(self, balance, amount):",
        "explanation": "Accepts domain-specific parameters."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "        super().__init__(f\"...\")",
        "codeSnippet": "        super().__init__(f\"...\")",
        "explanation": "Passes formatted message string to parent Exception for str(e)."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "        self.balance = balance",
        "codeSnippet": "        self.balance = balance",
        "explanation": "Stores balance on exception object for programmatic recovery."
      }
    ],
    "applications": [
      {
        "industry": "Payment Gateways",
        "application": "Raising `CardDeclinedError`, `ExpiredTokenError`, or `FraudDetectionError`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Payment Gateways",
        "description": "Raising `CardDeclinedError`, `ExpiredTokenError`, or `FraudDetectionError`."
      },
      {
        "industry": "REST API Frameworks",
        "application": "FastAPI and Flask catching domain exceptions and converting them to JSON HTTP status codes.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "REST API Frameworks",
        "description": "FastAPI and Flask catching domain exceptions and converting them to JSON HTTP status codes."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Define domain-specific custom exception classes by subclassing Exception.",
        "Attach contextual error metadata (error codes, user IDs, invalid values) to exception instances.",
        "Use explicit exception chaining with `raise NewError from original_error` to preserve root causes."
      ]
    }
  },
  "py-files-reading-writing": {
    "id": "py-files-reading-writing",
    "moduleId": "python-module-7",
    "title": "File Reading and Writing",
    "subtitle": "open() Modes, Encoding, read/readline/readlines, and Modern pathlib.Path",
    "order": 3,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master standard file access modes: `\"r\"`, `\"w\"`, `\"a\"`, `\"x\"`, and binary modes (`\"rb\"`, `\"wb\"`).",
      "Always specify explicit character encodings (`encoding=\"utf-8\"`) to prevent cross-platform file corruption.",
      "Compare file reading strategies: read(), readline(), readlines(), and chunked streaming.",
      "Use modern object-oriented filesystem paths with standard library `pathlib.Path`."
    ],
    "prerequisites": [
      "Python basics and string manipulation."
    ],
    "analogy": {
      "title": "The Scribe and the Parchment Scroll",
      "text": "Opening a file is unrolling a parchment scroll on a desk. Mode `\"r\"` lets you read the text without ink on your fingers. Mode `\"w\"` scrapes the parchment completely blank (truncates) before inking new lines. Mode `\"a\"` moves your quill directly to the bottom of the scroll to write new paragraphs without touching previous lines.",
      "metaphor": "File handles are operating system streams controlled by mode flags and buffer pointers."
    },
    "problemSolved": {
      "title": "Reliable, Platform-Independent File Input/Output",
      "description": "Relying on platform-default encodings (e.g. Windows cp1252 vs Linux UTF-8) leads to corrupted files and UnicodeDecodeError crashes. Standardized file operations guarantee cross-platform persistence.",
      "keyPoints": [
        "Always specify `encoding=\"utf-8\"` when reading or writing text files.",
        "`\"w\"` truncates (erases) existing files immediately upon opening.",
        "`pathlib.Path` provides object-oriented paths with cross-platform slash handling (`/` operator).",
        "Iterating over a file object directly `for line in f:` streams lines in O(1) memory."
      ]
    },
    "intuition": {
      "overview": "The OS kernel manages file descriptors. Python wraps OS file handles in buffered stream objects that handle decoding between raw bytes and Unicode strings.",
      "steps": [
        {
          "step": 1,
          "title": "Open",
          "description": "OS grants file descriptor with specified access permissions and buffer."
        },
        {
          "step": 2,
          "title": "Stream/Seek",
          "description": "Pointer advances as bytes are read or flushed from write buffers."
        },
        {
          "step": 3,
          "title": "Close",
          "description": "Flushes remaining buffers and releases OS file descriptor."
        }
      ]
    },
    "codeExample": {
      "title": "Modern File I/O with pathlib.Path and Explicit UTF-8",
      "code": "from pathlib import Path\n\n# Modern pathlib usage\ndata_dir = Path(\"sample_data\")\ndata_dir.mkdir(exist_ok=True)\nfile_path = data_dir / \"records.txt\"\n\n# Writing lines\nwith open(file_path, \"w\", encoding=\"utf-8\") as f:\n    f.write(\"id,event\\n\")\n    f.write(\"101,login\\n\")\n    f.write(\"102,logout\\n\")\n\n# Memory-efficient line streaming\nwith open(file_path, \"r\", encoding=\"utf-8\") as f:\n    for line_num, line in enumerate(f, start=1):\n        print(f\"Line {line_num}: {line.strip()}\")\n\n# pathlib one-liner convenience\ncontent = file_path.read_text(encoding=\"utf-8\")\nprint(f\"Total characters: {len(content)}\")",
      "explanation": "Demonstrates creating paths with Path, writing text, streaming lines, and using Path.read_text()."
    },
    "runnableCode": {
      "code": "import io\n\n# Demonstrating file stream mechanics using in-memory StringIO\nstream = io.StringIO()\nstream.write(\"First line\\nSecond line\\nThird line\")\n\n# Seek back to beginning to read\nstream.seek(0)\nfor line in stream:\n    print(\"Streamed:\", line.strip())",
      "expectedOutput": "Streamed: First line\nStreamed: Second line\nStreamed: Third line"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "stream = io.StringIO()",
        "codeSnippet": "stream = io.StringIO()",
        "explanation": "Creates an in-memory text stream behaving identically to a file."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "stream.write(\"First line\\n...\")",
        "codeSnippet": "stream.write(\"First line\\n...\")",
        "explanation": "Writes text into stream buffer."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "stream.seek(0)",
        "codeSnippet": "stream.seek(0)",
        "explanation": "Rewinds the file pointer back to the 0th byte offset."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "for line in stream:",
        "codeSnippet": "for line in stream:",
        "explanation": "Streams lines one by one in O(1) auxiliary memory."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `open(file, \"r\")` without `encoding=\"utf-8\"`.",
        "solution": "Always pass `encoding=\"utf-8\"` explicitly for text files.",
        "whyWrong": "CPython falls back to locale-dependent encodings (like CP-1252 on Windows), causing crashes on accented or emoji characters.",
        "howToFix": "Always pass `encoding=\"utf-8\"` explicitly for text files."
      },
      {
        "mistake": "Reading massive files using `f.read()` or `f.readlines()`.",
        "solution": "Stream lines one by one: `for line in f:`.",
        "whyWrong": "Loads the entire file into RAM at once, causing Out-Of-Memory crashes on multi-gigabyte files.",
        "howToFix": "Stream lines one by one: `for line in f:`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Configuration Ingestion",
        "description": "Reading `.env`, `.ini`, or YAML files to bootstrap microservices."
      },
      {
        "title": "Log Rotation & Auditing",
        "description": "Appending transaction receipts to append-only audit files."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-files-reading-writing-pq1",
        "question": "What is the difference between open mode `\"w\"` and `\"a\"`?",
        "hint": "Truncation vs appending.",
        "answer": "`\"w\"` truncates (wipes) the file before writing, whereas `\"a\"` preserves existing contents and appends to the end."
      },
      {
        "id": "py-files-reading-writing-pq2",
        "question": "Why is `for line in f:` preferable to `for line in f.readlines():`?",
        "hint": "Memory streaming.",
        "answer": "`for line in f:` reads lines lazily on demand (O(1) memory), while `f.readlines()` reads all lines into a memory list at once."
      },
      {
        "id": "py-files-reading-writing-pq3",
        "question": "How can you check if a file exists using `pathlib`?",
        "hint": "Method on Path object.",
        "answer": "Using `Path(\"my_file.txt\").exists()`."
      }
    ],
    "quiz": [
      {
        "id": "py-files-reading-writing-q1",
        "question": "Which open mode creates a file for writing, but FAILS with FileExistsError if the file already exists?",
        "options": [
          "\"w\"",
          "\"a\"",
          "\"x\"",
          "\"r+\""
        ],
        "correctIndex": 2,
        "explanation": "Exclusive creation mode `\"x\"` opens for writing only if the target file does not already exist."
      },
      {
        "id": "py-files-reading-writing-q2",
        "question": "What does `Path(\"dir\") / \"sub\" / \"file.txt\"` do in Python?",
        "options": [
          "Divides directory numbers",
          "Constructs a cross-platform Path object using overloaded / operator",
          "Raises TypeError",
          "Splits text file"
        ],
        "correctIndex": 1,
        "explanation": "`pathlib.Path` overloads the `/` operator to cleanly join path segments across operating systems."
      },
      {
        "id": "py-files-reading-writing-q3",
        "question": "Which file mode is required for reading binary files like images or compiled binaries?",
        "options": [
          "\"r\"",
          "\"rb\"",
          "\"binary\"",
          "\"raw\""
        ],
        "correctIndex": 1,
        "explanation": "Binary read mode is `\"rb\"`, returning `bytes` objects rather than `str`."
      }
    ],
    "codingChallenge": {
      "title": "Count Words in File Stream",
      "problem": "Write a function `count_file_metrics(stream: io.StringIO) -> tuple[int, int, int]` that takes an open text stream (already sought to start) and returns `(line_count, word_count, char_count)` without reading the entire content into memory at once.",
      "hints": [
        "Initialize lines = 0, words = 0, chars = 0.",
        "Iterate for line in stream.",
        "lines += 1; chars += len(line); words += len(line.split())."
      ],
      "starterCode": "import io\n\ndef count_file_metrics(stream: io.StringIO) -> tuple[int, int, int]:\n    # Write your solution here\n    pass",
      "solution": "import io\n\ndef count_file_metrics(stream: io.StringIO) -> tuple[int, int, int]:\n    lines = 0\n    words = 0\n    chars = 0\n    for line in stream:\n        lines += 1\n        chars += len(line)\n        words += len(line.split())\n    return lines, words, chars",
      "testCases": [
        {
          "input": "s = io.StringIO(\"hello world\\npython code\"); count_file_metrics(s)",
          "expectedOutput": "(2, 4, 23)"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "stream = io.StringIO()",
        "codeSnippet": "stream = io.StringIO()",
        "explanation": "Creates an in-memory text stream behaving identically to a file."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "stream.write(\"First line\\n...\")",
        "codeSnippet": "stream.write(\"First line\\n...\")",
        "explanation": "Writes text into stream buffer."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "stream.seek(0)",
        "codeSnippet": "stream.seek(0)",
        "explanation": "Rewinds the file pointer back to the 0th byte offset."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "for line in stream:",
        "codeSnippet": "for line in stream:",
        "explanation": "Streams lines one by one in O(1) auxiliary memory."
      }
    ],
    "applications": [
      {
        "industry": "Configuration Ingestion",
        "application": "Reading `.env`, `.ini`, or YAML files to bootstrap microservices.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Configuration Ingestion",
        "description": "Reading `.env`, `.ini`, or YAML files to bootstrap microservices."
      },
      {
        "industry": "Log Rotation & Auditing",
        "application": "Appending transaction receipts to append-only audit files.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Log Rotation & Auditing",
        "description": "Appending transaction receipts to append-only audit files."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Master standard file access modes: `\"r\"`, `\"w\"`, `\"a\"`, `\"x\"`, and binary modes (`\"rb\"`, `\"wb\"`).",
        "Always specify explicit character encodings (`encoding=\"utf-8\"`) to prevent cross-platform file corruption.",
        "Compare file reading strategies: read(), readline(), readlines(), and chunked streaming."
      ]
    }
  },
  "py-files-context-managers": {
    "id": "py-files-context-managers",
    "moduleId": "python-module-7",
    "title": "Context Managers (with statement)",
    "subtitle": "__enter__ and __exit__, Exception Suppression, and @contextmanager",
    "order": 4,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "execution-trace",
    "objectives": [
      "Understand why context managers (`with`) guarantee resource cleanup and prevent descriptor leaks.",
      "Implement class-based context managers with `__enter__()` and `__exit__()`.",
      "Handle and optionally suppress exceptions inside `__exit__()` by returning True.",
      "Build lightweight generator-based context managers using `@contextlib.contextmanager`."
    ],
    "prerequisites": [
      "Python classes, exception handling, and generator yield."
    ],
    "analogy": {
      "title": "The Cleanroom Airlock and Hazmat Suit",
      "text": "Entering a sterile cleanroom requires suiting up in an airlock (`__enter__`). Inside, you conduct your experiment. Regardless of whether your experiment succeeds, crashes, or catches fire, the airlock system forces you to decontaminate, strip the suit, and seal the chamber on your way out (`__exit__`). No researcher can ever walk away leaving the airlock open.",
      "metaphor": "Context managers guarantee setup and teardown actions around arbitrary execution blocks."
    },
    "problemSolved": {
      "title": "Guaranteed Resource Cleanup Without Verbose try/finally Boilerplate",
      "description": "Manually calling `file.close()`, `db.disconnect()`, or `lock.release()` in `try/finally` blocks is verbose and prone to omission. Context managers encapsulate RAII (Resource Acquisition Is Initialization) cleanly.",
      "keyPoints": [
        "`with obj as target:` calls `target = obj.__enter__()` and guarantees `obj.__exit__()` executes upon block exit.",
        "`__exit__(exc_type, exc_val, exc_tb)` receives exception details if an error occurred.",
        "Returning `True` from `__exit__` suppresses the active exception; returning anything else propagates it."
      ]
    },
    "intuition": {
      "overview": "The `with` statement guarantees that cleanup executes even on exceptions, breaks, or returns.",
      "steps": [
        {
          "step": 1,
          "title": "Enter",
          "description": "__enter__() acquires the resource and returns the bound target."
        },
        {
          "step": 2,
          "title": "Execute",
          "description": "The inner block statements execute."
        },
        {
          "step": 3,
          "title": "Exit",
          "description": "__exit__() releases resources, passing (None, None, None) on success or exception info on failure."
        }
      ]
    },
    "codeExample": {
      "title": "Timer and Execution Block Context Managers",
      "code": "import time\nfrom contextlib import contextmanager\n\n# Class-based context manager\nclass ExecutionTimer:\n    def __enter__(self):\n        self.start = time.perf_counter()\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.elapsed = time.perf_counter() - self.start\n        print(f\"Elapsed: {self.elapsed:.6f}s\")\n        return False  # Do not suppress exceptions\n\n# Generator-based context manager\n@contextmanager\ndef temporary_flag(settings_dict, key, temp_val):\n    old_val = settings_dict.get(key)\n    settings_dict[key] = temp_val\n    try:\n        yield temp_val\n    finally:\n        if old_val is None:\n            settings_dict.pop(key, None)\n        else:\n            settings_dict[key] = old_val\n\nconfig = {\"debug\": False}\nwith temporary_flag(config, \"debug\", True):\n    print(\"Inside with block:\", config[\"debug\"])\nprint(\"Outside with block:\", config[\"debug\"])",
      "explanation": "Demonstrates both a class-based timer context manager and a generator-based temporary setting manager."
    },
    "runnableCode": {
      "code": "class SuppressErrors:\n    \"\"\"Context manager that suppresses specific exceptions.\"\"\"\n    def __init__(self, *exc_types):\n        self.exc_types = exc_types\n\n    def __enter__(self):\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        # Return True if exc_type matches any suppressed exception\n        return exc_type is not None and issubclass(exc_type, self.exc_types)\n\nprint(\"Starting safe block...\")\nwith SuppressErrors(ZeroDivisionError):\n    x = 1 / 0\n    print(\"Not reached\")\nprint(\"Survived ZeroDivisionError cleanly!\")",
      "expectedOutput": "Starting safe block...\nSurvived ZeroDivisionError cleanly!"
    },
    "lineByLine": [
      {
        "line": 8,
        "lines": "8",
        "code": "    def __exit__(self, exc_type, exc_val, exc_tb):",
        "codeSnippet": "    def __exit__(self, exc_type, exc_val, exc_tb):",
        "explanation": "Receives the exception type, instance, and traceback if an error occurs."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "        return exc_type is not None and issubclass(...)",
        "codeSnippet": "        return exc_type is not None and issubclass(...)",
        "explanation": "Returning True suppresses the exception from propagating to caller."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "with SuppressErrors(ZeroDivisionError):",
        "codeSnippet": "with SuppressErrors(ZeroDivisionError):",
        "explanation": "Wraps block suppressing division by zero."
      },
      {
        "line": 16,
        "lines": "16",
        "code": "print(\"Survived ZeroDivisionError cleanly!\")",
        "codeSnippet": "print(\"Survived ZeroDivisionError cleanly!\")",
        "explanation": "Execution continues smoothly after the with block."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Returning `None` or `False` from `__exit__` and expecting the exception to be suppressed.",
        "solution": "Return `True` explicitly if and only if you intend to suppress the exception.",
        "whyWrong": "Only an explicit truthy return value (like `return True`) tells Python to swallow the exception.",
        "howToFix": "Return `True` explicitly if and only if you intend to suppress the exception."
      },
      {
        "mistake": "Forgetting `finally:` in `@contextmanager` generator functions.",
        "solution": "Always wrap the `yield` statement in `try ... finally`.",
        "whyWrong": "If an exception occurs inside the `with` block, teardown logic after `yield` will never execute.",
        "howToFix": "Always wrap the `yield` statement in `try ... finally`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Database Transactions",
        "description": "Committing transactions on success and executing `rollback()` on exceptions."
      },
      {
        "title": "Thread Synchronization",
        "description": "Acquiring and releasing thread locks (`threading.Lock`)."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-files-context-managers-pq1",
        "question": "What arguments does `__exit__()` take in a class-based context manager?",
        "hint": "Three exception parameters.",
        "answer": "`self, exc_type, exc_val, exc_tb` (exception class, instance, and traceback)."
      },
      {
        "id": "py-files-context-managers-pq2",
        "question": "What does returning `True` from `__exit__()` signify?",
        "hint": "Exception handling.",
        "answer": "It tells Python to suppress the active exception so it does not propagate."
      },
      {
        "id": "py-files-context-managers-pq3",
        "question": "What decorator in `contextlib` converts a generator function into a context manager?",
        "hint": "Decorator name.",
        "answer": "`@contextlib.contextmanager`."
      }
    ],
    "quiz": [
      {
        "id": "py-files-context-managers-q1",
        "question": "Which method is executed when entering a `with` block?",
        "options": [
          "__init__",
          "__start__",
          "__enter__",
          "__open__"
        ],
        "correctIndex": 2,
        "explanation": "The `__enter__()` method is invoked upon entering a `with` statement."
      },
      {
        "id": "py-files-context-managers-q2",
        "question": "In a generator decorated with `@contextmanager`, what statement separates setup from cleanup?",
        "options": [
          "return",
          "yield",
          "pass",
          "break"
        ],
        "correctIndex": 1,
        "explanation": "Code before `yield` runs during `__enter__`; code after `yield` runs during `__exit__`."
      },
      {
        "id": "py-files-context-managers-q3",
        "question": "Does `__exit__()` run if an unhandled exception occurs inside the `with` block?",
        "options": [
          "No, the program crashes immediately",
          "Yes, __exit__ is guaranteed to run like a finally block",
          "Only if sys.settrace is enabled",
          "Only on Linux"
        ],
        "correctIndex": 1,
        "explanation": "`__exit__()` is guaranteed to execute even if an exception occurs inside the block."
      }
    ],
    "codingChallenge": {
      "title": "Custom File Buffer Context Manager",
      "problem": "Write a class `StringCapture` that acts as a context manager. In `__enter__`, it creates a list `self.records = []` and returns `self`. Provide a method `record(text: str)` that appends text to `self.records`. In `__exit__`, it sets a property `self.final_text = \" | \".join(self.records)`.",
      "hints": [
        "In __enter__: self.records = []; return self.",
        "In record(t): self.records.append(t).",
        "In __exit__(*args): self.final_text = \" | \".join(self.records)."
      ],
      "starterCode": "class StringCapture:\n    # Write your solution here\n    pass",
      "solution": "class StringCapture:\n    def __enter__(self):\n        self.records = []\n        return self\n        \n    def record(self, text: str):\n        self.records.append(text)\n        \n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.final_text = \" | \".join(self.records)\n        return False",
      "testCases": [
        {
          "input": "with StringCapture() as sc: sc.record(\"A\"); sc.record(\"B\"); sc.final_text",
          "expectedOutput": "\"A | B\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 8,
        "lines": "8",
        "code": "    def __exit__(self, exc_type, exc_val, exc_tb):",
        "codeSnippet": "    def __exit__(self, exc_type, exc_val, exc_tb):",
        "explanation": "Receives the exception type, instance, and traceback if an error occurs."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "        return exc_type is not None and issubclass(...)",
        "codeSnippet": "        return exc_type is not None and issubclass(...)",
        "explanation": "Returning True suppresses the exception from propagating to caller."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "with SuppressErrors(ZeroDivisionError):",
        "codeSnippet": "with SuppressErrors(ZeroDivisionError):",
        "explanation": "Wraps block suppressing division by zero."
      },
      {
        "line": 16,
        "lines": "16",
        "code": "print(\"Survived ZeroDivisionError cleanly!\")",
        "codeSnippet": "print(\"Survived ZeroDivisionError cleanly!\")",
        "explanation": "Execution continues smoothly after the with block."
      }
    ],
    "applications": [
      {
        "industry": "Database Transactions",
        "application": "Committing transactions on success and executing `rollback()` on exceptions.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Database Transactions",
        "description": "Committing transactions on success and executing `rollback()` on exceptions."
      },
      {
        "industry": "Thread Synchronization",
        "application": "Acquiring and releasing thread locks (`threading.Lock`).",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Thread Synchronization",
        "description": "Acquiring and releasing thread locks (`threading.Lock`)."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand why context managers (`with`) guarantee resource cleanup and prevent descriptor leaks.",
        "Implement class-based context managers with `__enter__()` and `__exit__()`.",
        "Handle and optionally suppress exceptions inside `__exit__()` by returning True."
      ]
    }
  },
  "py-modules-imports": {
    "id": "py-modules-imports",
    "moduleId": "python-module-7",
    "title": "Imports and Packages",
    "subtitle": "sys.path Search Order, __init__.py, Relative Imports, and sys.modules Cache",
    "order": 5,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Understand how Python searches for modules using `sys.path`.",
      "Structure multi-file codebases into packages using directories and `__init__.py`.",
      "Distinguish absolute imports (`from mypkg.utils import helper`) from relative imports (`from .utils import helper`).",
      "Understand how `sys.modules` caches imported modules as singletons."
    ],
    "prerequisites": [
      "Python functions and basic files."
    ],
    "analogy": {
      "title": "The Central Library Book Registry",
      "text": "When you import a module, Python is like a librarian looking up a book call number. It searches shelves in a strict order (`sys.path`): first your current desk, then the local branch, and finally the regional depository. Once found, the librarian places the book in a quick-access cart (`sys.modules`): if five other patrons request that same book later, the librarian hands them the cart copy instantly without searching the shelves again.",
      "metaphor": "Modules are loaded once and cached in sys.modules; sys.path defines resolution order."
    },
    "problemSolved": {
      "title": "Eliminating ModuleNotFoundError and Circular Import Deadlocks",
      "description": "As Python projects grow beyond a single script, organizing code into clean, importable packages with predictable dependencies is crucial to prevent import errors and circular dependency deadlocks.",
      "keyPoints": [
        "`sys.path[0]` is always the directory containing the script used to invoke Python.",
        "A directory containing `__init__.py` is treated as a regular package.",
        "Module code executes ONCE upon first import; subsequent imports return the cached module from `sys.modules`.",
        "Circular imports occur when module A imports B while module B imports A during top-level evaluation."
      ]
    },
    "intuition": {
      "overview": "CPython uses `importlib` to locate module files, load their bytecode or source, execute the module in a fresh namespace dictionary, and store the result in `sys.modules`.",
      "steps": [
        {
          "step": 1,
          "title": "Check Cache",
          "description": "If module name exists in `sys.modules`, return cached module object immediately."
        },
        {
          "step": 2,
          "title": "Path Resolution",
          "description": "Iterate through `sys.path` searching for matching .py, .pyc, or package directory."
        },
        {
          "step": 3,
          "title": "Execution",
          "description": "Execute top-level module statements in a new module namespace and cache in `sys.modules`."
        }
      ]
    },
    "codeExample": {
      "title": "Inspecting sys.path and sys.modules",
      "code": "import sys\nimport math\n\n# math is now cached in sys.modules\nprint(\"Math module cached?\", \"math\" in sys.modules)\nprint(\"Math module path:\", math.__file__ if hasattr(math, '__file__') else \"C-builtin\")\n\n# Inspecting search path\nprint(\"\\nTop 3 sys.path search roots:\")\nfor idx, p in enumerate(sys.path[:3]):\n    print(f\"{idx}: {p}\")\n\n# Package __all__ controls 'from pkg import *'\n__all__ = [\"useful_function\"]\ndef useful_function(): return \"Exported!\"",
      "explanation": "Demonstrates inspecting module caching in `sys.modules`, `sys.path` search order, and `__all__` export lists."
    },
    "runnableCode": {
      "code": "import sys\n\n# Demonstrating that imports are singletons\nimport json\nimport json as json_alias\n\nprint(\"Is same object?\", json is json_alias)\nprint(\"Cached in sys.modules?\", sys.modules[\"json\"] is json)",
      "expectedOutput": "Is same object? True\nCached in sys.modules? True"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "import json",
        "codeSnippet": "import json",
        "explanation": "Loads json into sys.modules."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "import json as json_alias",
        "codeSnippet": "import json as json_alias",
        "explanation": "Creates alias pointing to the exact same cached module."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "print(\"Is same object?\", json is json_alias)",
        "codeSnippet": "print(\"Is same object?\", json is json_alias)",
        "explanation": "Verifies modules are singletons in memory."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Naming your own file after a standard library module (e.g. naming your test script `math.py` or `random.py`).",
        "solution": "Never name project files with standard library module names.",
        "whyWrong": "Because current directory is first in `sys.path`, your file shadows the standard library, breaking standard imports with bizarre errors.",
        "howToFix": "Never name project files with standard library module names."
      },
      {
        "mistake": "Using wildcard imports: `from module import *`.",
        "solution": "Import explicit names: `from module import item1, item2`.",
        "whyWrong": "Pollutes current namespace, masks variable origins, and breaks static analysis tools and linters.",
        "howToFix": "Import explicit names: `from module import item1, item2`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Open-Source Library Distribution",
        "description": "Designing clean `__all__` public APIs in packages like requests or numpy."
      },
      {
        "title": "Plugin Architectures",
        "description": "Dynamic runtime module loading using `importlib.import_module(plugin_name)`."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-modules-imports-pq1",
        "question": "What dictionary in the `sys` module caches all previously loaded modules?",
        "hint": "Dunder or module dictionary.",
        "answer": "`sys.modules`."
      },
      {
        "id": "py-modules-imports-pq2",
        "question": "What list in the `sys` module determines the order of directories searched during an import?",
        "hint": "Path list.",
        "answer": "`sys.path`."
      },
      {
        "id": "py-modules-imports-pq3",
        "question": "What does a leading dot signify in a relative import: `from .helpers import util`?",
        "hint": "Current package directory.",
        "answer": "It specifies importing from the current package directory."
      }
    ],
    "quiz": [
      {
        "id": "py-modules-imports-q1",
        "question": "What happens when a Python module is imported a second time in the same process?",
        "options": [
          "Its code executes again from top to bottom",
          "Python loads the cached module object from sys.modules without re-executing it",
          "Raises ImportError",
          "A new thread is spawned"
        ],
        "correctIndex": 1,
        "explanation": "Modules are loaded and executed once; subsequent imports retrieve the cached instance from `sys.modules`."
      },
      {
        "id": "py-modules-imports-q2",
        "question": "What special variable in a module restricts what is imported when using `from mymodule import *`?",
        "options": [
          "__public__",
          "__all__",
          "__exports__",
          "__visible__"
        ],
        "correctIndex": 1,
        "explanation": "The `__all__` list specifies the explicit sequence of string names exported on wildcard imports."
      },
      {
        "id": "py-modules-imports-q3",
        "question": "Why does naming a script `test_email.py` work fine, but naming it `email.py` causes crashes?",
        "options": [
          "email is a reserved keyword",
          "It shadows the standard library email package in sys.path[0]",
          "Python filenames cannot be 5 characters",
          "It triggers email spam filters"
        ],
        "correctIndex": 1,
        "explanation": "`sys.path[0]` is the current directory, so local `email.py` shadows the standard library `email` module."
      }
    ],
    "codingChallenge": {
      "title": "Simulate Module Registry Cache",
      "problem": "Write a class `ModuleRegistry` that simulates a module cache. It has an internal dict `self._cache`. Implement `load(name: str, loader_fn: callable) -> dict`: if `name` is already in `self._cache`, return it directly without calling `loader_fn`. If not, call `loader_fn()`, store the result in `self._cache[name]`, and return it.",
      "hints": [
        "Initialize self._cache = {} in __init__.",
        "In load: check if name in self._cache: return self._cache[name].",
        "Otherwise: self._cache[name] = loader_fn(); return self._cache[name]."
      ],
      "starterCode": "class ModuleRegistry:\n    # Write your solution here\n    pass",
      "solution": "class ModuleRegistry:\n    def __init__(self):\n        self._cache = {}\n        \n    def load(self, name: str, loader_fn):\n        if name not in self._cache:\n            self._cache[name] = loader_fn()\n        return self._cache[name]",
      "testCases": [
        {
          "input": "calls = 0; fn = lambda: {\"val\": 42}; r = ModuleRegistry(); r.load(\"m\", fn); r.load(\"m\", fn)",
          "expectedOutput": "{\"val\": 42}"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "import json",
        "codeSnippet": "import json",
        "explanation": "Loads json into sys.modules."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "import json as json_alias",
        "codeSnippet": "import json as json_alias",
        "explanation": "Creates alias pointing to the exact same cached module."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "print(\"Is same object?\", json is json_alias)",
        "codeSnippet": "print(\"Is same object?\", json is json_alias)",
        "explanation": "Verifies modules are singletons in memory."
      }
    ],
    "applications": [
      {
        "industry": "Open-Source Library Distribution",
        "application": "Designing clean `__all__` public APIs in packages like requests or numpy.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Open-Source Library Distribution",
        "description": "Designing clean `__all__` public APIs in packages like requests or numpy."
      },
      {
        "industry": "Plugin Architectures",
        "application": "Dynamic runtime module loading using `importlib.import_module(plugin_name)`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Plugin Architectures",
        "description": "Dynamic runtime module loading using `importlib.import_module(plugin_name)`."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand how Python searches for modules using `sys.path`.",
        "Structure multi-file codebases into packages using directories and `__init__.py`.",
        "Distinguish absolute imports (`from mypkg.utils import helper`) from relative imports (`from .utils import helper`)."
      ]
    }
  },
  "py-modules-venv": {
    "id": "py-modules-venv",
    "moduleId": "python-module-7",
    "title": "Virtual Environments and pip",
    "subtitle": "venv Creation, pip Dependency Management, and requirements.txt Workflows",
    "order": 6,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Understand why isolated virtual environments prevent dependency conflicts (\"dependency hell\").",
      "Create and activate environments using `python -m venv .venv`.",
      "Install, upgrade, and remove packages using `pip install` and `pip freeze`.",
      "Lock reproducible environments using `requirements.txt`."
    ],
    "prerequisites": [
      "Basic command line familiarity and Python modules."
    ],
    "analogy": {
      "title": "The Isolated Kitchenettes for Competing Chefs",
      "text": "Installing packages globally is like two chefs sharing one spice rack: Chef Italian demands spicy chili powder in the red jar, but Chef Pastry overwrites it with powdered sugar. Chaos ensues. A virtual environment gives each chef their own private kitchenette (`.venv`) with their own private spice jars, completely isolated from each other and the master pantry.",
      "metaphor": "Virtual environments isolate site-packages and Python binaries per project."
    },
    "problemSolved": {
      "title": "Eliminating System-Wide Version Collisions",
      "description": "Project A might require Django 3.2 (LTS) while Project B requires Django 5.0. Installing globally breaks one project when upgrading the other. Virtual environments create self-contained directory trees for each project.",
      "keyPoints": [
        "`python -m venv <dir>` creates an isolated environment folder containing python and pip binaries.",
        "Activation scripts adjust the shell's `PATH` variable so `python` points to `.venv/bin/python`.",
        "`pip freeze > requirements.txt` exports exact installed package versions for deterministic deployment."
      ]
    },
    "intuition": {
      "overview": "A virtual environment works by setting `sys.prefix` and modifying `PATH` so Python resolves packages from the local `lib/site-packages` directory.",
      "steps": [
        {
          "step": 1,
          "title": "Create",
          "description": "python -m venv .venv copies Python symlink and initializes isolated site-packages."
        },
        {
          "step": 2,
          "title": "Activate",
          "description": "Prepends .venv/bin (or .venv/Scripts on Windows) to PATH environment variable."
        },
        {
          "step": 3,
          "title": "Install",
          "description": "pip install writes wheels directly into .venv/lib/site-packages."
        }
      ]
    },
    "codeExample": {
      "title": "Standard Virtual Environment CLI Workflow",
      "code": "# 1. Create a new virtual environment\n# python -m venv .venv\n\n# 2. Activate environment\n# On macOS/Linux: source .venv/bin/activate\n# On Windows: .venv\\Scripts\\activate\n\n# 3. Install packages\n# pip install requests==2.31.0 pandas\n\n# 4. Freeze dependencies to file\n# pip freeze > requirements.txt\n\n# 5. Install from requirements file in CI/CD\n# pip install -r requirements.txt",
      "explanation": "Demonstrates the standard production lifecycle for Python virtual environments and pip."
    },
    "runnableCode": {
      "code": "import sys\n\n# Checking if current Python session is running inside a virtual environment\nin_venv = sys.prefix != sys.base_prefix\nprint(f\"Is running in virtual environment? {in_venv}\")\nprint(f\"Active Python Prefix: {sys.prefix}\")\nprint(f\"Base System Prefix: {sys.base_prefix}\")",
      "expectedOutput": "Is running in virtual environment? True"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "in_venv = sys.prefix != sys.base_prefix",
        "codeSnippet": "in_venv = sys.prefix != sys.base_prefix",
        "explanation": "Compares active prefix against base system prefix."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(...)",
        "codeSnippet": "print(...)",
        "explanation": "If prefixes differ, Python is running inside an active virtual environment."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Committing the `.venv` directory to git source control repositories.",
        "solution": "Add `.venv/` and `venv/` to `.gitignore`, and commit `requirements.txt` instead.",
        "whyWrong": "Virtual environments are platform-specific binaries and several hundred megabytes in size; committing them clutters git.",
        "howToFix": "Add `.venv/` and `venv/` to `.gitignore`, and commit `requirements.txt` instead."
      },
      {
        "mistake": "Running `pip install` without activating the virtual environment.",
        "solution": "Verify shell prompt shows `(.venv)` or check `which python` / `where python` before installing.",
        "whyWrong": "Installs packages globally into user system Python, risking permissions errors or version pollution.",
        "howToFix": "Verify shell prompt shows `(.venv)` or check `which python` / `where python` before installing."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Docker Containers",
        "description": "Setting up clean isolated environments inside lightweight Alpine or Debian images."
      },
      {
        "title": "CI/CD Pipelines",
        "description": "GitHub Actions runners creating fresh venvs to test code against multiple Python versions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-modules-venv-pq1",
        "question": "What command creates a virtual environment named `.venv` in modern Python?",
        "hint": "Standard venv module.",
        "answer": "`python -m venv .venv`."
      },
      {
        "id": "py-modules-venv-pq2",
        "question": "How can you detect programmatically whether Python is running inside a virtual environment?",
        "hint": "Compare sys attributes.",
        "answer": "`sys.prefix != sys.base_prefix`."
      },
      {
        "id": "py-modules-venv-pq3",
        "question": "What command generates a frozen list of all installed packages with exact versions?",
        "hint": "Pip freeze command.",
        "answer": "`pip freeze > requirements.txt`."
      }
    ],
    "quiz": [
      {
        "id": "py-modules-venv-q1",
        "question": "Which file should you commit to version control to share dependencies with teammates?",
        "options": [
          ".venv directory",
          "requirements.txt",
          "pip.exe",
          "site-packages"
        ],
        "correctIndex": 1,
        "explanation": "`requirements.txt` is lightweight text tracking dependencies; `.venv` should always be git-ignored."
      },
      {
        "id": "py-modules-venv-q2",
        "question": "What does activating a virtual environment primarily do to your shell?",
        "options": [
          "Recompiles the Python kernel",
          "Prepends the virtual environment's bin or Scripts folder to your PATH environment variable",
          "Encrypts user files",
          "Disables network access"
        ],
        "correctIndex": 1,
        "explanation": "Activation scripts prepend the environment's executable directory to `PATH`."
      },
      {
        "id": "py-modules-venv-q3",
        "question": "How do you install all packages listed in a requirements.txt file?",
        "options": [
          "pip install requirements.txt",
          "pip install -r requirements.txt",
          "pip load requirements.txt",
          "python -m pip sync"
        ],
        "correctIndex": 1,
        "explanation": "The `-r` flag instructs pip to read package requirements from a file."
      }
    ],
    "codingChallenge": {
      "title": "Parse requirements.txt Specifier",
      "problem": "Write a function `parse_requirements(req_text: str) -> dict[str, str]` that takes the text of a `requirements.txt` file (where each line is `package==version`, e.g. \"requests==2.31.0\") and returns a dictionary mapping package names to version strings. Ignore empty lines and lines starting with \"#\".",
      "hints": [
        "Iterate through req_text.splitlines().",
        "Strip lines, ignore empty or lines starting with \"#\".",
        "Split by \"==\" and store in dict."
      ],
      "starterCode": "def parse_requirements(req_text: str) -> dict[str, str]:\n    # Write your solution here\n    pass",
      "solution": "def parse_requirements(req_text: str) -> dict[str, str]:\n    packages = {}\n    for line in req_text.splitlines():\n        cleaned = line.strip()\n        if not cleaned or cleaned.startswith(\"#\"):\n            continue\n        if \"==\" in cleaned:\n            name, version = cleaned.split(\"==\", 1)\n            packages[name.strip()] = version.strip()\n    return packages",
      "testCases": [
        {
          "input": "\"# Dependencies\\nrequests==2.31.0\\nnumpy==1.26.0\"",
          "expectedOutput": "{\"requests\": \"2.31.0\", \"numpy\": \"1.26.0\"}"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "in_venv = sys.prefix != sys.base_prefix",
        "codeSnippet": "in_venv = sys.prefix != sys.base_prefix",
        "explanation": "Compares active prefix against base system prefix."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(...)",
        "codeSnippet": "print(...)",
        "explanation": "If prefixes differ, Python is running inside an active virtual environment."
      }
    ],
    "applications": [
      {
        "industry": "Docker Containers",
        "application": "Setting up clean isolated environments inside lightweight Alpine or Debian images.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Docker Containers",
        "description": "Setting up clean isolated environments inside lightweight Alpine or Debian images."
      },
      {
        "industry": "CI/CD Pipelines",
        "application": "GitHub Actions runners creating fresh venvs to test code against multiple Python versions.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "CI/CD Pipelines",
        "description": "GitHub Actions runners creating fresh venvs to test code against multiple Python versions."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand why isolated virtual environments prevent dependency conflicts (\"dependency hell\").",
        "Create and activate environments using `python -m venv .venv`.",
        "Install, upgrade, and remove packages using `pip install` and `pip freeze`."
      ]
    }
  },
  "py-modules-env-vars": {
    "id": "py-modules-env-vars",
    "moduleId": "python-module-7",
    "title": "Environment Variables and Configuration",
    "subtitle": "os.environ, python-dotenv, Secret Hygiene, and Twelve-Factor App Principles",
    "order": 7,
    "readTimeMinutes": 18,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Read and write environment variables using standard library `os.environ`.",
      "Safely provide fallback defaults with `os.getenv(key, default)`.",
      "Follow Twelve-Factor App principles: separate sensitive configuration credentials from source code.",
      "Understand `.env` files and `python-dotenv` for local developer configuration."
    ],
    "prerequisites": [
      "Python dictionaries and file basics."
    ],
    "analogy": {
      "title": "The Safe Deposit Combination on a Post-It Note",
      "text": "Hardcoding database passwords or API keys directly inside your Python source code is like writing your bank vault combination directly onto the glass front window of your house: anyone who looks at the git repository can rob you. Environment variables are keeping the combination strictly in your head: the program asks the host environment for the key when it wakes up.",
      "metaphor": "Environment variables inject configuration into the process without baking secrets into code."
    },
    "problemSolved": {
      "title": "Preventing Leaked Credentials and Differentiating Environments",
      "description": "Code moves between development, staging, and production environments. Hardcoding URLs or credentials forces manual edits and risks leaking production secrets to GitHub. Environment variables make apps configurable from the outside.",
      "keyPoints": [
        "`os.environ` is a mapping reflecting the process's environment variables.",
        "`os.getenv(\"KEY\", \"fallback\")` returns fallback if KEY is not defined.",
        "Always add `.env` to `.gitignore` to prevent secret commits."
      ]
    },
    "intuition": {
      "overview": "When an operating system spawns a process, it passes an array of key-value string pairs. Python parses these into `os.environ`.",
      "steps": [
        {
          "step": 1,
          "title": "OS Injection",
          "description": "Host shell passes environment variables to child Python process."
        },
        {
          "step": 2,
          "title": "Lookup",
          "description": "Application reads variables at startup via os.environ or os.getenv()."
        },
        {
          "step": 3,
          "title": "Validation",
          "description": "Validates presence of critical secrets before launching server."
        }
      ]
    },
    "codeExample": {
      "title": "Reading Configuration with Validation and Defaults",
      "code": "import os\n\nclass AppConfig:\n    def __init__(self):\n        # Mandatory secret: must exist\n        self.api_key = os.getenv(\"API_KEY\")\n        if not self.api_key:\n            # In production, raise error; here we provide a demo fallback\n            self.api_key = \"demo-key-123\"\n\n        # Optional setting with default\n        self.port = int(os.getenv(\"PORT\", \"8000\"))\n        self.debug = os.getenv(\"DEBUG\", \"False\").lower() in (\"true\", \"1\")\n\nconfig = AppConfig()\nprint(f\"Loaded config: Port={config.port}, Debug={config.debug}, KeyLength={len(config.api_key)}\")",
      "explanation": "Demonstrates reading environment variables with os.getenv, type casting to int and bool, and validating mandatory keys."
    },
    "runnableCode": {
      "code": "import os\n\n# Setting a temporary variable in current process\nos.environ[\"APP_STAGE\"] = \"production\"\n\nstage = os.getenv(\"APP_STAGE\", \"development\")\ntimeout = int(os.getenv(\"TIMEOUT_SECONDS\", \"30\"))\n\nprint(f\"Stage: {stage}\")\nprint(f\"Timeout: {timeout} seconds\")",
      "expectedOutput": "Stage: production\nTimeout: 30 seconds"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "os.environ[\"APP_STAGE\"] = \"production\"",
        "codeSnippet": "os.environ[\"APP_STAGE\"] = \"production\"",
        "explanation": "Sets environment variable within the active process environment."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "stage = os.getenv(\"APP_STAGE\", \"development\")",
        "codeSnippet": "stage = os.getenv(\"APP_STAGE\", \"development\")",
        "explanation": "Fetches APP_STAGE, returning fallback if missing."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "timeout = int(os.getenv(\"TIMEOUT_SECONDS\", \"30\"))",
        "codeSnippet": "timeout = int(os.getenv(\"TIMEOUT_SECONDS\", \"30\"))",
        "explanation": "Converts environment string to integer."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting that all environment variables are strings: `if os.getenv(\"DEBUG\"):`.",
        "solution": "Explicitly check boolean values: `os.getenv(\"DEBUG\", \"0\").lower() in (\"true\", \"1\", \"yes\")`.",
        "whyWrong": "If `DEBUG=\"False\"`, `\"False\"` is a non-empty string which evaluates to truthy `True` in Python!",
        "howToFix": "Explicitly check boolean values: `os.getenv(\"DEBUG\", \"0\").lower() in (\"true\", \"1\", \"yes\")`."
      },
      {
        "mistake": "Hardcoding production API keys or tokens into source files.",
        "solution": "Store secrets in `.env` (git-ignored) and load them via environment variables.",
        "whyWrong": "Git history is permanent; credentials pushed to public or private repos are immediately harvested by bots.",
        "howToFix": "Store secrets in `.env` (git-ignored) and load them via environment variables."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Cloud Deployments (AWS/Heroku/K8s)",
        "description": "Injecting database connection strings and S3 bucket secrets into container pods."
      },
      {
        "title": "Feature Flagging",
        "description": "Enabling experimental beta features via `FEATURE_V2_ENABLED=1`."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-modules-env-vars-pq1",
        "question": "What is the return type of `os.getenv(\"PORT\")`?",
        "hint": "Strings vs numbers.",
        "answer": "A `str` (or `None` if absent, unless a default is specified)."
      },
      {
        "id": "py-modules-env-vars-pq2",
        "question": "Why does `bool(os.getenv(\"FEATURE_FLAG\", \"False\"))` evaluate to `True`?",
        "hint": "Non-empty string truthiness.",
        "answer": "Because the string `\"False\"` is non-empty, and all non-empty strings are truthy in Python."
      },
      {
        "id": "py-modules-env-vars-pq3",
        "question": "What file holds local development secrets and should always be in `.gitignore`?",
        "hint": "Hidden dot file name.",
        "answer": "The `.env` file."
      }
    ],
    "quiz": [
      {
        "id": "py-modules-env-vars-q1",
        "question": "What happens if you access `os.environ[\"MISSING_KEY\"]` directly with square brackets?",
        "options": [
          "Returns None",
          "Raises KeyError",
          "Returns empty string \"\"",
          "Raises EnvironmentError"
        ],
        "correctIndex": 1,
        "explanation": "Like a dictionary, direct key access `os.environ[key]` raises `KeyError` if missing. Use `os.getenv()` for defaults."
      },
      {
        "id": "py-modules-env-vars-q2",
        "question": "Which Twelve-Factor App methodology principle covers environment variables?",
        "options": [
          "III. Config: Store config in the environment",
          "I. Codebase",
          "VI. Processes",
          "XI. Logs"
        ],
        "correctIndex": 0,
        "explanation": "Factor III dictates storing configuration that varies across deploys in the environment."
      },
      {
        "id": "py-modules-env-vars-q3",
        "question": "What popular library automatically loads key-value pairs from a local `.env` file into `os.environ`?",
        "options": [
          "python-dotenv",
          "env-loader",
          "secrets-py",
          "config-manager"
        ],
        "correctIndex": 0,
        "explanation": "The `python-dotenv` package loads `.env` variables via `load_dotenv()`."
      }
    ],
    "codingChallenge": {
      "title": "Parse Typed Environment Configuration",
      "problem": "Write a function `parse_env_bool(val: str | None, default: bool = False) -> bool` that safely parses a string into a boolean: returns `True` for `\"true\"`, `\"1\"`, `\"yes\"` (case-insensitive), returns `False` for `\"false\"`, `\"0\"`, `\"no\"`, and returns `default` if `val` is `None` or empty.",
      "hints": [
        "Check if val is None or empty: return default.",
        "Check cleaned in (\"true\", \"1\", \"yes\"): return True.",
        "Check cleaned in (\"false\", \"0\", \"no\"): return False."
      ],
      "starterCode": "def parse_env_bool(val: str | None, default: bool = False) -> bool:\n    # Write your solution here\n    pass",
      "solution": "def parse_env_bool(val: str | None, default: bool = False) -> bool:\n    if not val:\n        return default\n    cleaned = val.strip().lower()\n    if cleaned in (\"true\", \"1\", \"yes\"):\n        return True\n    if cleaned in (\"false\", \"0\", \"no\"):\n        return False\n    return default",
      "testCases": [
        {
          "input": "\"True\"",
          "expectedOutput": "True"
        },
        {
          "input": "\"0\"",
          "expectedOutput": "False"
        },
        {
          "input": "None, True",
          "expectedOutput": "True"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "os.environ[\"APP_STAGE\"] = \"production\"",
        "codeSnippet": "os.environ[\"APP_STAGE\"] = \"production\"",
        "explanation": "Sets environment variable within the active process environment."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "stage = os.getenv(\"APP_STAGE\", \"development\")",
        "codeSnippet": "stage = os.getenv(\"APP_STAGE\", \"development\")",
        "explanation": "Fetches APP_STAGE, returning fallback if missing."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "timeout = int(os.getenv(\"TIMEOUT_SECONDS\", \"30\"))",
        "codeSnippet": "timeout = int(os.getenv(\"TIMEOUT_SECONDS\", \"30\"))",
        "explanation": "Converts environment string to integer."
      }
    ],
    "applications": [
      {
        "industry": "Cloud Deployments (AWS/Heroku/K8s)",
        "application": "Injecting database connection strings and S3 bucket secrets into container pods.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Cloud Deployments (AWS/Heroku/K8s)",
        "description": "Injecting database connection strings and S3 bucket secrets into container pods."
      },
      {
        "industry": "Feature Flagging",
        "application": "Enabling experimental beta features via `FEATURE_V2_ENABLED=1`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Feature Flagging",
        "description": "Enabling experimental beta features via `FEATURE_V2_ENABLED=1`."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Read and write environment variables using standard library `os.environ`.",
        "Safely provide fallback defaults with `os.getenv(key, default)`.",
        "Follow Twelve-Factor App principles: separate sensitive configuration credentials from source code."
      ]
    }
  },
  "py-modules-logging": {
    "id": "py-modules-logging",
    "moduleId": "python-module-7",
    "title": "Logging and Debugging",
    "subtitle": "logging Module, Log Levels, Handlers, Formatters, and Structured Output",
    "order": 8,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Use Python's standard `logging` module instead of ad-hoc `print()` statements.",
      "Understand the 5 standard log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL.",
      "Configure loggers with custom Formatters (timestamps, levels, module names) and Handlers (StreamHandler, FileHandler).",
      "Capture exception tracebacks automatically using `logger.exception()` or `exc_info=True`."
    ],
    "prerequisites": [
      "Python functions, exceptions, and files."
    ],
    "analogy": {
      "title": "The Airplane Flight Data Recorder (Black Box)",
      "text": "Scattering `print()` statements across code is like shouting out the cockpit window: once spoken, the words evaporate into the wind. The `logging` module is the aircraft black box: it continuously records airspeed, altitude, warning lights, and timestamps to non-volatile memory with prioritized severity levels. If a crisis occurs, engineers can reconstruct the exact second-by-second timeline.",
      "metaphor": "Logging provides persistent, structured, level-filtered diagnostic records."
    },
    "problemSolved": {
      "title": "Production Telemetry and Post-Mortem Debugging",
      "description": "In headless server environments, container clusters, or background jobs, there is no terminal to view `print()` statements. Logging routes messages to centralized log aggregators (Datadog, CloudWatch, Splunk) with severity levels.",
      "keyPoints": [
        "Standard levels in ascending priority: DEBUG (10), INFO (20), WARNING (30), ERROR (40), CRITICAL (50).",
        "The default root logger threshold is `WARNING`; DEBUG and INFO messages are ignored until threshold is lowered.",
        "`logger.exception(\"message\")` logs at ERROR level and automatically appends the active exception traceback."
      ]
    },
    "intuition": {
      "overview": "A Logger emits LogRecord objects. Handlers dispatch records to destinations (console, files, sockets). Formatters convert records to strings.",
      "steps": [
        {
          "step": 1,
          "title": "Emit",
          "description": "Calling logger.info() creates a LogRecord with metadata (filename, line, time)."
        },
        {
          "step": 2,
          "title": "Filter",
          "description": "Logger compares record level against its threshold; drops if lower."
        },
        {
          "step": 3,
          "title": "Format & Dispatch",
          "description": "Handlers format record according to format string and write to destinations."
        }
      ]
    },
    "codeExample": {
      "title": "Configuring a Structured Production Logger",
      "code": "import logging\nimport sys\n\n# Configure a named logger\nlogger = logging.getLogger(\"payment_service\")\nlogger.setLevel(logging.DEBUG)\n\n# Create handler and formatter\nhandler = logging.StreamHandler(sys.stdout)\nformatter = logging.Formatter(\n    fmt=\"%(asctime)s | %(levelname)-8s | %(name)s:%(lineno)d | %(message)s\",\n    datefmt=\"%Y-%m-%d %H:%M:%S\"\n)\nhandler.setFormatter(formatter)\nlogger.addHandler(handler)\n\n# Logging at various levels\nlogger.debug(\"Parsing card expiration date\")\nlogger.info(\"Transaction #9842 initiated for $99.00\")\nlogger.warning(\"Payment gateway latency high (850ms)\")\n\ntry:\n    1 / 0\nexcept ZeroDivisionError:\n    logger.exception(\"Failed to calculate discount percentage\")",
      "explanation": "Demonstrates configuring a named logger with StreamHandler, timestamped formatter, and logger.exception()."
    },
    "runnableCode": {
      "code": "import logging\n\n# Basic configuration\nlogging.basicConfig(level=logging.INFO, format=\"%(levelname)s: %(message)s\")\nlogger = logging.getLogger(\"demo\")\n\nlogger.info(\"Application started successfully\")\nlogger.warning(\"Low disk space on volume /var\")",
      "expectedOutput": "INFO: Application started successfully\nWARNING: Low disk space on volume /var"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "logging.basicConfig(level=logging.INFO, ...)",
        "codeSnippet": "logging.basicConfig(level=logging.INFO, ...)",
        "explanation": "Configures root logger with INFO threshold and format."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "logger = logging.getLogger(\"demo\")",
        "codeSnippet": "logger = logging.getLogger(\"demo\")",
        "explanation": "Obtains named logger instance."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "logger.info(...)",
        "codeSnippet": "logger.info(...)",
        "explanation": "Emits informational record."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "logger.warning(...)",
        "codeSnippet": "logger.warning(...)",
        "explanation": "Emits warning record."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `print()` for debugging in production code.",
        "solution": "Use `logging.getLogger(__name__)`.",
        "whyWrong": "Cannot be disabled dynamically, lacks timestamps/line numbers, and cannot route to files or monitoring tools.",
        "howToFix": "Use `logging.getLogger(__name__)`."
      },
      {
        "mistake": "Calling `logging.basicConfig()` multiple times.",
        "solution": "Configure logging once at application entry point or use custom handlers.",
        "whyWrong": "`basicConfig()` does nothing if root logger already has handlers configured (subsequent calls are ignored).",
        "howToFix": "Configure logging once at application entry point or use custom handlers."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Auditing Security Events",
        "description": "Recording user logins, failed password attempts, and permission escalations."
      },
      {
        "title": "Distributed Tracing",
        "description": "Injecting request IDs into log formatters to trace requests across microservices."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-modules-logging-pq1",
        "question": "What is the default threshold log level in Python's root logger?",
        "hint": "Debug, Info, or Warning?",
        "answer": "`WARNING`."
      },
      {
        "id": "py-modules-logging-pq2",
        "question": "How do you automatically include the active exception traceback in a log message?",
        "hint": "Method on logger.",
        "answer": "Using `logger.exception(\"message\")` or passing `exc_info=True` to `logger.error()`."
      },
      {
        "id": "py-modules-logging-pq3",
        "question": "What is the standard convention for naming loggers inside a module?",
        "hint": "Dunder variable.",
        "answer": "`logger = logging.getLogger(__name__)`."
      }
    ],
    "quiz": [
      {
        "id": "py-modules-logging-q1",
        "question": "Which log level has the highest numeric severity in Python?",
        "options": [
          "DEBUG",
          "INFO",
          "ERROR",
          "CRITICAL"
        ],
        "correctIndex": 3,
        "explanation": "CRITICAL (level 50) represents the highest standard severity level."
      },
      {
        "id": "py-modules-logging-q2",
        "question": "What is the purpose of a `Handler` in Python logging?",
        "options": [
          "To filter out profanity",
          "To direct log records to appropriate destinations (console, files, sockets)",
          "To compile Python code",
          "To encrypt strings"
        ],
        "correctIndex": 1,
        "explanation": "Handlers are responsible for sending log records to specific output endpoints."
      },
      {
        "id": "py-modules-logging-q3",
        "question": "Why is `logger = logging.getLogger(__name__)` the standard pattern?",
        "options": [
          "It creates a hierarchical logger reflecting the module's position in the package tree",
          "It encrypts the logger",
          "It runs in parallel threads",
          "It avoids importing logging"
        ],
        "correctIndex": 0,
        "explanation": "`__name__` maps to module dotted path (e.g. `mypackage.services.auth`), creating a clean hierarchical logger tree."
      }
    ],
    "codingChallenge": {
      "title": "Format Structured Log Message",
      "problem": "Write a function `build_log_entry(level: str, event: str, **context) -> str` that constructs a structured pipe-delimited log entry: `\"{LEVEL} | {EVENT} | key1=val1, key2=val2\"` with context keys sorted alphabetically (omit context section if context is empty). LEVEL must be uppercase.",
      "hints": [
        "Uppercase level: level.upper().",
        "Format context if present: \", \".join(f\"{k}={v}\" for k, v in sorted(context.items())).",
        "Combine: f\"{lvl} | {event} | {ctx}\" or f\"{lvl} | {event}\"."
      ],
      "starterCode": "def build_log_entry(level: str, event: str, **context) -> str:\n    # Write your solution here\n    pass",
      "solution": "def build_log_entry(level: str, event: str, **context) -> str:\n    lvl = level.upper()\n    if not context:\n        return f\"{lvl} | {event}\"\n    ctx_str = \", \".join(f\"{k}={v}\" for k, v in sorted(context.items()))\n    return f\"{lvl} | {event} | {ctx_str}\"",
      "testCases": [
        {
          "input": "\"info\", \"user_login\", ip=\"127.0.0.1\", user_id=42",
          "expectedOutput": "\"INFO | user_login | ip=127.0.0.1, user_id=42\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "logging.basicConfig(level=logging.INFO, ...)",
        "codeSnippet": "logging.basicConfig(level=logging.INFO, ...)",
        "explanation": "Configures root logger with INFO threshold and format."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "logger = logging.getLogger(\"demo\")",
        "codeSnippet": "logger = logging.getLogger(\"demo\")",
        "explanation": "Obtains named logger instance."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "logger.info(...)",
        "codeSnippet": "logger.info(...)",
        "explanation": "Emits informational record."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "logger.warning(...)",
        "codeSnippet": "logger.warning(...)",
        "explanation": "Emits warning record."
      }
    ],
    "applications": [
      {
        "industry": "Auditing Security Events",
        "application": "Recording user logins, failed password attempts, and permission escalations.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Auditing Security Events",
        "description": "Recording user logins, failed password attempts, and permission escalations."
      },
      {
        "industry": "Distributed Tracing",
        "application": "Injecting request IDs into log formatters to trace requests across microservices.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Distributed Tracing",
        "description": "Injecting request IDs into log formatters to trace requests across microservices."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Use Python's standard `logging` module instead of ad-hoc `print()` statements.",
        "Understand the 5 standard log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL.",
        "Configure loggers with custom Formatters (timestamps, levels, module names) and Handlers (StreamHandler, FileHandler)."
      ]
    }
  }
};
