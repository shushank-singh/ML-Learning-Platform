import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule2Data: PythonModuleData = {
  "id": "python-module-2",
  "number": 2,
  "title": "Control Flow",
  "subtitle": "Conditionals, Loops, Iteration & Pattern Problems",
  "description": "Give your programs decision-making and repetition. Master truthiness and boolean logic, all forms of if/elif/else, for loops with range(), while loops with break/continue, nested loops, and solve classic pattern-printing problems that build loop intuition.",
  "icon": "GitBranch",
  "badge": "Control Flow",
  "estimatedHours": 5,
  "topicsCount": 7,
  "lessons": [
    {
      "id": "py-control-boolean-logic",
      "moduleId": "python-module-2",
      "title": "Boolean Logic and Truthiness",
      "description": "and/or/not, short-circuit evaluation, truthy/falsy values, and bool() coercion rules.",
      "order": 1,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "py-control-conditionals",
      "moduleId": "python-module-2",
      "title": "if, elif, and else",
      "description": "Branching logic, chained conditions, ternary expressions, and match-case (Python 3.10+).",
      "order": 2,
      "readTimeMinutes": 18,
      "visualizerType": "execution-trace",
      "difficulty": "Beginner"
    },
    {
      "id": "py-control-for-loops",
      "moduleId": "python-module-2",
      "title": "for Loops and range()",
      "description": "Iterating sequences, range(start, stop, step), reversed iteration, and enumerate.",
      "order": 3,
      "readTimeMinutes": 20,
      "visualizerType": "execution-trace",
      "difficulty": "Beginner"
    },
    {
      "id": "py-control-while-loops",
      "moduleId": "python-module-2",
      "title": "while Loops",
      "description": "Condition-controlled iteration, infinite loop prevention, and while-else clause.",
      "order": 4,
      "readTimeMinutes": 18,
      "visualizerType": "execution-trace",
      "difficulty": "Beginner"
    },
    {
      "id": "py-control-break-continue",
      "moduleId": "python-module-2",
      "title": "break, continue, and pass",
      "description": "Early loop exit, iteration skipping, and the pass placeholder for empty blocks.",
      "order": 5,
      "readTimeMinutes": 15,
      "visualizerType": "execution-trace",
      "difficulty": "Beginner"
    },
    {
      "id": "py-control-nested-loops",
      "moduleId": "python-module-2",
      "title": "Nested Loops",
      "description": "Inner/outer loop relationships, complexity implications, and multiplication tables.",
      "order": 6,
      "readTimeMinutes": 20,
      "visualizerType": "execution-trace",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-control-pattern-printing",
      "moduleId": "python-module-2",
      "title": "Pattern Printing Problems",
      "description": "Building triangle, pyramid, diamond, and number patterns to solidify nested loop mastery.",
      "order": 7,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Beginner"
    }
  ]
};

export const pythonModule2Lessons: Record<string, PythonLessonContent> = {
  "py-control-conditionals": {
    "id": "py-control-conditionals",
    "moduleId": "python-module-2",
    "title": "Conditional Branching: if, elif, else, and Pattern Matching",
    "subtitle": "Decision-Making Structures, Short-Circuit Evaluation, Ternary Expressions, and match-case",
    "order": 2,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Master multi-way conditional branching using if, elif, and else blocks.",
      "Understand Python's implicit truthiness rules (0, None, empty containers evaluate to False).",
      "Use inline ternary expressions (value_if_true if condition else value_if_false).",
      "Leverage short-circuit evaluation in and / or expressions for safe object attribute guarding.",
      "Use modern Structural Pattern Matching (match-case) introduced in Python 3.10."
    ],
    "prerequisites": [
      "Variables, primitive types, and boolean operators (and, or, not)"
    ],
    "previousLesson": {
      "id": "py-control-boolean-logic",
      "title": "Boolean Logic and Truthiness",
      "moduleId": "python-module-2"
    },
    "analogy": {
      "title": "The Railroad Switch Track",
      "text": "Picture a high-speed train approaching a railway junction with multiple branch tracks. The signal tower inspects condition after condition: Is Track 1 clear? If yes, the switch flips and the train barrels down Track 1, completely ignoring Track 2, Track 3, and Track 4. If Track 1 is blocked, it checks Track 2. If all specific tracks fail, the default siding (the else clause) directs the train into a safe maintenance bay. The train can only ever travel down exactly one track per junction.",
      "metaphor": "Conditional statements are mutually exclusive switches: Python evaluates conditions sequentially and enters the very first branch whose condition evaluates to truthy."
    },
    "problemSolved": {
      "title": "Enabling Dynamic Computational Decision Trees",
      "description": "Without conditionals, programs execute in rigid linear order from line 1 to line N. Conditionals grant programs the capacity to react dynamically to user input, hardware signals, database states, and error conditions.",
      "keyPoints": [
        "Multi-way branching with mutually exclusive elif blocks",
        "Concise inline conditional expressions (ternary operators)",
        "Guard clauses that prevent nested if-spaghetti and early returns"
      ]
    },
    "intuition": {
      "overview": "Python tests boolean conditions top-to-bottom. The moment a condition evaluates to True, its indented block executes, and all remaining elif and else clauses are bypassed entirely.",
      "steps": [
        {
          "step": 1,
          "title": "Condition Evaluation",
          "description": "The expression after if is converted to a boolean via bool(expr)."
        },
        {
          "step": 2,
          "title": "First Truthy Branch Executes",
          "description": "If truthy, the indented code block executes and control jumps past the entire conditional construct."
        },
        {
          "step": 3,
          "title": "Fallthrough to elif",
          "description": "If falsy, Python tests each subsequent elif in exact linear declaration order."
        },
        {
          "step": 4,
          "title": "The else Catch-All",
          "description": "If none of the if or elif conditions matched, the optional else block executes unconditionally."
        }
      ]
    },
    "codeExample": {
      "title": "Branching, Ternary Operators, and Pattern Matching",
      "code": "# 1. Classic if-elif-else with truthiness\nscore = 85\n\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelif score >= 70:\n    grade = 'C'\nelse:\n    grade = 'F'\n\n# 2. Ternary inline conditional\nstatus = \"Adult\" if age >= 18 else \"Minor\"\n\n# 3. Modern Structural Pattern Matching (Python 3.10+)\nhttp_status = 404\n\nmatch http_status:\n    case 200:\n        message = \"Success\"\n    case 400 | 404 as err:\n        message = f\"Client Error: {err}\"\n    case 500:\n        message = \"Server Error\"\n    case _:\n        message = \"Unknown status\"",
      "explanation": "Notice how the ternary operator reads like natural English: result = x if condition else y. In match-case, the wildcard case _ acts as the catch-all else branch."
    },
    "runnableCode": {
      "code": "# Test short-circuit evaluation and safe attribute access\nuser_profile = {\"username\": \"alex\", \"is_admin\": True}\n\n# Short-circuiting prevents KeyError if dict is None or missing key\nif user_profile and user_profile.get(\"is_admin\"):\n    role = \"Superuser Access Granted\"\nelse:\n    role = \"Standard User\"\n\n# Ternary formatting\nprint(f\"User: {user_profile['username']}\")\nprint(f\"Status: {role}\")\nprint(\"Active Session:\", \"YES\" if user_profile else \"NO\")",
      "expectedOutput": "User: alex\nStatus: Superuser Access Granted\nActive Session: YES"
    },
    "lineByLineExplanation": [
      {
        "line": "1-2",
        "lines": "1-2",
        "code": "if score >= 90: grade = \"A\"",
        "codeSnippet": "if score >= 90: grade = \"A\"",
        "explanation": "Tests first condition. If true, binds grade = \"A\" and skips all remaining branches."
      },
      {
        "line": "3-4",
        "lines": "3-4",
        "code": "elif score >= 80: grade = \"B\"",
        "codeSnippet": "elif score >= 80: grade = \"B\"",
        "explanation": "Only evaluated if prior conditions were false. Tests if score is in [80, 89]."
      },
      {
        "line": "6",
        "lines": "6",
        "code": "status = \"Adult\" if age >= 18 else \"Minor\"",
        "codeSnippet": "status = \"Adult\" if age >= 18 else \"Minor\"",
        "explanation": "Python ternary expression: evaluates condition first, then returns the left expression if true or the right if false."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using separate if statements instead of elif",
        "solution": "Using multiple independent if blocks causes all of them to be evaluated, allowing subsequent branches to overwrite earlier results.",
        "codeExample": "# BUG:\nif score >= 80: grade = \"B\"\nif score >= 70: grade = \"C\" # Overwrites grade to C for score 85!"
      },
      {
        "mistake": "Confusing assignment (=) with equality comparison (==)",
        "solution": "Use == for comparison. In Python, assignment inside an if condition causes a SyntaxError unless using the walrus operator (:=)."
      },
      {
        "mistake": "Excessive nested if statements (Pyramid of Doom)",
        "solution": "Use guard clauses with early returns: test failure conditions first and exit early, keeping the happy path unindented."
      }
    ],
    "bestPractices": [
      "Use guard clauses to flatten code: \"if not user: return\" instead of nesting the entire function body.",
      "Rely on Pythonic truthiness: write \"if items:\" instead of \"if len(items) > 0:\".",
      "Use structural pattern matching (match-case) when inspecting complex tuples, dictionaries, or data shapes.",
      "Take advantage of chained comparisons: Python natively supports \"18 <= age < 65\"."
    ],
    "applications": [
      {
        "industry": "API Gateways",
        "application": "Authentication & Routing",
        "benefit": "Verifying JWT tokens and routing requests based on HTTP status codes and headers."
      },
      {
        "industry": "E-Commerce",
        "application": "Discount & Tax Calculations",
        "benefit": "Applying tier-based discount rules and regional sales tax conditionally based on customer location."
      },
      {
        "industry": "Game Development",
        "application": "Finite State Machines",
        "benefit": "Branching character behavior based on current state (IDLE, WALKING, ATTACKING, DEAD)."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-cond-q1",
        "question": "What is the output of: x = [] ; print(\"Filled\" if x else \"Empty\")?",
        "hint": "What is the truthiness of an empty list in Python?",
        "answer": "Output is \"Empty\". In Python, empty collections (empty lists [], tuples (), dicts {}, sets, strings \"\") evaluate to False in a boolean context."
      },
      {
        "id": "py-cond-q2",
        "question": "How does chained comparison work in Python: \"if 1 < x < 10:\"?",
        "hint": "Does it evaluate x twice or expand to logical and?",
        "answer": "Python translates \"1 < x < 10\" to \"1 < x and x < 10\", but with the advantage that expression x is evaluated only once."
      },
      {
        "id": "py-cond-q3",
        "question": "How does short-circuit evaluation work with the \"and\" operator?",
        "hint": "If the first operand is False, does Python evaluate the second operand?",
        "answer": "In \"A and B\", Python evaluates A first. If A is falsy, Python immediately returns A without evaluating B, because the overall result cannot possibly be true. This prevents runtime errors like \"if user is not None and user.is_active:\"."
      }
    ],
    "quiz": [
      {
        "id": "py-cond-quiz-1",
        "question": "Which of the following values evaluates to True in a Python conditional?",
        "options": [
          "0",
          "\"\" (empty string)",
          "None",
          "\"0\" (string containing zero)"
        ],
        "correctIndex": 3,
        "explanation": "Any non-empty string in Python evaluates to True, even if it contains \"0\", \"False\", or whitespace."
      },
      {
        "id": "py-cond-quiz-2",
        "question": "What is the syntax for a ternary conditional expression in Python?",
        "options": [
          "condition ? true_val : false_val",
          "true_val if condition else false_val",
          "if (condition) true_val else false_val",
          "true_val unless not condition else false_val"
        ],
        "correctIndex": 1,
        "explanation": "Python uses the format: \"true_val if condition else false_val\"."
      },
      {
        "id": "py-cond-quiz-3",
        "question": "What keyword was introduced in Python 3.10 for structural pattern matching?",
        "options": [
          "switch / case",
          "match / case",
          "select / when",
          "choose / option"
        ],
        "correctIndex": 1,
        "explanation": "Python 3.10 introduced structural pattern matching using the \"match\" and \"case\" keywords (PEP 634)."
      }
    ],
    "codingChallenge": {
      "title": "Categorize HTTP Response Code",
      "problem": "Write a function \"categorize_http(status_code)\" that returns \"Informational\" (100-199), \"Success\" (200-299), \"Redirection\" (300-399), \"Client Error\" (400-499), \"Server Error\" (500-599), or \"Invalid Code\" for anything outside 100-599. Use chained comparisons.",
      "hints": [
        "Use chained comparison syntax: \"200 <= status_code < 300\".",
        "Return early from each branch to avoid unnecessary else clauses."
      ],
      "starterCode": "def categorize_http(status_code: int) -> str:\n    # Your code here\n    return \"Invalid Code\"\n\n# Test cases:\nprint(categorize_http(200))  # Expected: \"Success\"\nprint(categorize_http(404))  # Expected: \"Client Error\"\nprint(categorize_http(999))  # Expected: \"Invalid Code\"",
      "solution": "def categorize_http(status_code: int) -> str:\n    if 100 <= status_code < 200:\n        return \"Informational\"\n    elif 200 <= status_code < 300:\n        return \"Success\"\n    elif 300 <= status_code < 400:\n        return \"Redirection\"\n    elif 400 <= status_code < 500:\n        return \"Client Error\"\n    elif 500 <= status_code < 600:\n        return \"Server Error\"\n    else:\n        return \"Invalid Code\"\n\n# Test cases:\nprint(categorize_http(200))  # \"Success\"\nprint(categorize_http(404))  # \"Client Error\"\nprint(categorize_http(999))  # \"Invalid Code\""
    },
    "summary": {
      "keyTakeaways": [
        "Use if-elif-else for mutually exclusive decision trees.",
        "Python converts non-booleans to bool implicitly: 0, None, and empty containers are falsy.",
        "Ternary expressions \"x if cond else y\" provide clean inline conditionals.",
        "Short-circuit evaluation in and/or guards against null pointer / None attribute exceptions."
      ],
      "nextLessonId": "py-control-for-loops",
      "nextLessonTitle": "for Loops and range()",
      "nextLessonModuleId": "python-module-2"
    },
    "lineByLine": [
      {
        "line": "1-2",
        "lines": "1-2",
        "code": "if score >= 90: grade = \"A\"",
        "codeSnippet": "if score >= 90: grade = \"A\"",
        "explanation": "Tests first condition. If true, binds grade = \"A\" and skips all remaining branches."
      },
      {
        "line": "3-4",
        "lines": "3-4",
        "code": "elif score >= 80: grade = \"B\"",
        "codeSnippet": "elif score >= 80: grade = \"B\"",
        "explanation": "Only evaluated if prior conditions were false. Tests if score is in [80, 89]."
      },
      {
        "line": "6",
        "lines": "6",
        "code": "status = \"Adult\" if age >= 18 else \"Minor\"",
        "codeSnippet": "status = \"Adult\" if age >= 18 else \"Minor\"",
        "explanation": "Python ternary expression: evaluates condition first, then returns the left expression if true or the right if false."
      }
    ]
  },
  "py-control-boolean-logic": {
    "id": "py-control-boolean-logic",
    "moduleId": "python-module-2",
    "title": "Boolean Logic and Truthiness",
    "subtitle": "Truthy vs Falsy Invariants, De Morgan's Laws, and Short-Circuit Chaining",
    "order": 1,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Define Truthiness: which objects evaluate to True and which evaluate to False.",
      "List all built-in Falsy values: None, False, 0, 0.0, \"\", [], (), {}, set(), range(0).",
      "Apply De Morgan's Laws to simplify complex conditional expressions.",
      "Understand why `x and y` returns the operand itself, not necessarily True or False."
    ],
    "prerequisites": [
      "Python Fundamentals"
    ],
    "analogy": {
      "title": "The VIP Bouncer Checking IDs",
      "text": "A club bouncer lets people in if they have a non-empty ticket in their hand. If a guest shows an empty envelope (an empty list `[]`), a blank badge (an empty string `\"\"`), or empty pockets (`0`), the bouncer treats it as invalid (Falsy). Any envelope with something inside is valid (Truthy).",
      "metaphor": "In Python, empty containers and numeric zeros are falsy; populated objects are truthy."
    },
    "problemSolved": {
      "title": "Writing Idiomatic Python Conditions Without Redundant Length Checks",
      "description": "In other languages, checking an array requires `if (arr.length > 0)`. In Python, you write clean, idiomatic code: `if arr:` takes advantage of container truthiness.",
      "keyPoints": [
        "All empty collections and zero numerals are falsy.",
        "All non-empty collections and non-zero numerals are truthy.",
        "`and` / `or` return the actual value that determined the outcome, not a boolean literal."
      ]
    },
    "intuition": {
      "overview": "bool(x) calls x.__bool__() or x.__len__(). If __len__() returns 0, the object is Falsy.",
      "steps": [
        {
          "step": 1,
          "title": "Falsy Set",
          "description": "None, 0, 0.0, \"\", [], {}, (), set(), False."
        },
        {
          "step": 2,
          "title": "Truthy Set",
          "description": "Everything else!"
        },
        {
          "step": 3,
          "title": "Idiomatic Guard",
          "description": "`if users:` instead of `if len(users) > 0:`."
        }
      ]
    },
    "codeExample": {
      "title": "Truthy vs Falsy and Operand Returns",
      "code": "# Falsy evaluations\nprint(bool([]))      # False\nprint(bool({}))      # False\nprint(bool(0))       # False\n\n# Truthy evaluations\nprint(bool([0]))     # True! (list is non-empty, contains 0)\nprint(bool(\" \"))     # True! (string contains space)\n\n# Logical returns\nprint([] or \"default\")      # 'default'\nprint(\"hello\" and \"world\")  # 'world'",
      "explanation": "Demonstrates truthiness and the fact that `and`/`or` return the resolving operand."
    },
    "runnableCode": {
      "code": "print(bool([]))\nprint(bool([0]))\nprint([] or 'fallback')\nprint('apple' and 'banana')",
      "expectedOutput": "False\nTrue\nfallback\nbanana"
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "bool([0])",
        "codeSnippet": "bool([0])",
        "explanation": "Returns True because the list is non-empty, even though its item is 0."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "[] or \"fallback\"",
        "codeSnippet": "[] or \"fallback\"",
        "explanation": "[] is falsy, so `or` continues and returns the right operand \"fallback\"."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Checking `if x == True:` instead of `if x:`",
        "solution": "Writing `if x == True:` fails for truthy values like `x = [1, 2]` because [1, 2] does not equal the boolean literal True; use `if x:`.",
        "codeExample": "if x: # idiomatic truthiness"
      }
    ],
    "bestPractices": [
      "Use `if items:` instead of `if len(items) > 0:`.",
      "Use `if obj is None:` instead of `if not obj:` when you want to distinguish None from empty containers."
    ],
    "applications": [
      {
        "industry": "Web Development",
        "application": "Default configuration fallbacks in web frameworks",
        "benefit": "Enables clean one-line default assignments: `port = env_port or 8000`."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-bl-1",
        "question": "Simplify the expression `not (a and b)` using De Morgan's Law.",
        "hint": "Distribute the NOT.",
        "answer": "`not a or not b`."
      }
    ],
    "quiz": [
      {
        "id": "q-bl-1",
        "question": "Which of the following evaluates to True in Python?",
        "options": [
          "bool([0])",
          "bool(\"\")",
          "bool(0.0)",
          "bool(None)"
        ],
        "correctIndex": 0,
        "explanation": "`[0]` is a non-empty list containing one element, making it truthy."
      }
    ],
    "codingChallenge": {
      "title": "Clean Dictionary Defaults with Truthiness",
      "problem": "Write a function get_setting(config, key, default) that returns config[key] if the value is truthy, otherwise returns default.",
      "hints": [
        "Use config.get(key) or default."
      ],
      "starterCode": "def get_setting(config: dict, key: str, default):\n    # TODO: Return truthy setting or default\n    pass",
      "solution": "def get_setting(config: dict, key: str, default):\n    return config.get(key) or default"
    },
    "summary": {
      "keyTakeaways": [
        "Empty collections and zeros are falsy; populated objects are truthy.",
        "Use idiomatic `if items:` for non-empty checks."
      ],
      "nextLessonId": "py-control-conditionals",
      "nextLessonTitle": "if, elif, and else",
      "nextLessonModuleId": "python-module-2"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "bool([0])",
        "codeSnippet": "bool([0])",
        "explanation": "Returns True because the list is non-empty, even though its item is 0."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "[] or \"fallback\"",
        "codeSnippet": "[] or \"fallback\"",
        "explanation": "[] is falsy, so `or` continues and returns the right operand \"fallback\"."
      }
    ]
  },
  "py-control-for-loops": {
    "id": "py-control-for-loops",
    "moduleId": "python-module-2",
    "title": "for Loops and range()",
    "subtitle": "Iterator Consumption, Range Invariants, and the Optional else Clause",
    "order": 3,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Iterate over sequences using Python's collection-based for loop.",
      "Master range(start, stop, step) indexing and half-open intervals [start, stop).",
      "Understand why range() is an O(1) memory lazy sequence.",
      "Master the `for...else` construct: code in `else` runs only if loop finishes WITHOUT break."
    ],
    "prerequisites": [
      "Python Fundamentals"
    ],
    "analogy": {
      "title": "The Factory Conveyor Belt",
      "text": "A worker stands beside a conveyor belt. A mechanical arm advances the belt one box at a time. The worker takes each box, inspects it, and sets it aside. When the belt runs out of boxes, an alarm rings (the `else` clause) indicating the entire batch was inspected without interruption.",
      "metaphor": "A Python for loop consumes an iterator until StopIteration is raised."
    },
    "problemSolved": {
      "title": "Safe, Index-Free Collection Traversal",
      "description": "Traditional C-style loops require manual index counting `for (i=0; i<len; i++)`, which causes Off-By-One errors. Python's for loop iterates over actual items directly without index arithmetic.",
      "keyPoints": [
        "Iterates directly over elements in collections.",
        "range() produces lazy values on demand in O(1) memory.",
        "`for...else` executes when loop completes naturally without `break`."
      ]
    },
    "intuition": {
      "overview": "`for x in iterable:` requests next(iterator) repeatedly until StopIteration. `range(start, stop, step)` generates integers starting at `start` up to but not including `stop`.",
      "steps": [
        {
          "step": 1,
          "title": "Direct Iteration",
          "description": "for item in items:"
        },
        {
          "step": 2,
          "title": "Numbered Iteration",
          "description": "for i, item in enumerate(items):"
        },
        {
          "step": 3,
          "title": "Loop Else",
          "description": "for x in items: ... else: (runs if no break occurred)."
        }
      ]
    },
    "codeExample": {
      "title": "For Loops and the Else Clause",
      "code": "# Range with step\nfor i in range(10, 0, -2):\n    print(i, end=\" \") # 10 8 6 4 2\nprint()\n\n# For...else search pattern\ndef find_prime(nums):\n    for n in nums:\n        if n > 1 and all(n % d != 0 for d in range(2, int(n**0.5) + 1)):\n            print(f\"Found prime: {n}\")\n            break\n    else:\n        print(\"No prime found in list!\")",
      "explanation": "Demonstrates reverse step range and the for...else search pattern."
    },
    "runnableCode": {
      "code": "for i in range(1, 6, 2):\n    print(i)\nfor n in [4, 6, 8]:\n    if n % 2 != 0: break\nelse:\n    print(\"All numbers were even!\")",
      "expectedOutput": "1\n3\n5\nAll numbers were even!"
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "for i in range(1, 6, 2):",
        "codeSnippet": "for i in range(1, 6, 2):",
        "explanation": "Generates numbers 1, 3, 5 (stops before 6, incrementing by 2)."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "else: print(\"All numbers were even!\")",
        "codeSnippet": "else: print(\"All numbers were even!\")",
        "explanation": "Runs because the loop finished without hitting a `break` statement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Modifying a list while iterating over it (e.g. for x in lst: lst.remove(x))",
        "solution": "Modifying a list during iteration shifts elements and skips items; iterate over a copy `for x in list(lst):` or use list comprehension.",
        "codeExample": "for x in list(lst): # iterate over copy"
      }
    ],
    "bestPractices": [
      "Use `enumerate(items)` when you need both index and element.",
      "Use `zip(list1, list2)` to iterate through two parallel lists simultaneously."
    ],
    "applications": [
      {
        "industry": "Data Science",
        "application": "Epoch training loops in machine learning model training",
        "benefit": "Iterates cleanly over data batches."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-fl-1",
        "question": "How much memory does `range(1000000000)` consume in Python 3?",
        "hint": "range is a lazy sequence.",
        "answer": "Around 48 bytes! In Python 3, range() is a generator-like lazy object that computes values on demand, taking O(1) space regardless of size."
      }
    ],
    "quiz": [
      {
        "id": "q-fl-1",
        "question": "When does the `else` block of a Python `for` loop execute?",
        "options": [
          "When the loop completes all iterations without encountering a `break` statement",
          "Whenever an error occurs",
          "When the loop is empty",
          "Every time the loop finishes an iteration"
        ],
        "correctIndex": 0,
        "explanation": "The `else` clause attached to a for loop runs if and only if the loop terminates naturally (did not hit `break`)."
      }
    ],
    "codingChallenge": {
      "title": "Find First Duplicate",
      "problem": "Given a list of integers, find and return the first duplicate element. If no duplicates exist, return -1 using a for...else loop.",
      "hints": [
        "Track seen elements in a set."
      ],
      "starterCode": "def find_first_duplicate(nums: list[int]) -> int:\n    # TODO: Find first duplicate\n    pass",
      "solution": "def find_first_duplicate(nums: list[int]) -> int:\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return x\n        seen.add(x)\n    return -1"
    },
    "summary": {
      "keyTakeaways": [
        "for loops iterate over iterables directly.",
        "range() takes O(1) memory.",
        "for...else executes if loop finishes without break."
      ],
      "nextLessonId": "py-control-while-loops",
      "nextLessonTitle": "while Loops",
      "nextLessonModuleId": "python-module-2"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "for i in range(1, 6, 2):",
        "codeSnippet": "for i in range(1, 6, 2):",
        "explanation": "Generates numbers 1, 3, 5 (stops before 6, incrementing by 2)."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "else: print(\"All numbers were even!\")",
        "codeSnippet": "else: print(\"All numbers were even!\")",
        "explanation": "Runs because the loop finished without hitting a `break` statement."
      }
    ]
  },
  "py-control-while-loops": {
    "id": "py-control-while-loops",
    "moduleId": "python-module-2",
    "title": "while Loops",
    "subtitle": "Condition-Driven Iteration, Infinite Loops, and Convergence Guarantees",
    "order": 4,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Execute condition-driven iteration where step count is unknown in advance.",
      "Guarantee loop termination and prevent infinite loops via progress invariant.",
      "Implement event-listening sentinel loops with `while True:`.",
      "Apply `while...else` construct."
    ],
    "prerequisites": [
      "Boolean Logic and Truthiness"
    ],
    "analogy": {
      "title": "Filling a Bathtub to the Water Line",
      "text": "You turn on the water tap and watch the water rise. You don't know beforehand exactly how many seconds it will take. You simply keep the water running WHILE the water level has not reached the overflow drain, and turn off the tap the instant it reaches the mark.",
      "metaphor": "A while loop repeats as long as its condition remains True."
    },
    "problemSolved": {
      "title": "Indefinite Iteration When Step Count is Unknown",
      "description": "When the number of iterations cannot be determined in advance (e.g. reading network packets until socket closes, binary search convergence, user input validation), while loops drive execution dynamically.",
      "keyPoints": [
        "Iterates as long as condition evaluates to True.",
        "Must ensure progress toward condition termination.",
        "Core driver of game loops, server daemon listeners, and mathematical algorithms."
      ]
    },
    "intuition": {
      "overview": "Check condition. If True, execute block and repeat. If False, terminate. Always ensure at least one variable in the condition is modified inside the loop.",
      "steps": [
        {
          "step": 1,
          "title": "Condition Evaluation",
          "description": "while condition:"
        },
        {
          "step": 2,
          "title": "Loop Body",
          "description": "Execute instructions."
        },
        {
          "step": 3,
          "title": "Progress Step",
          "description": "Modify variables to guarantee convergence."
        }
      ]
    },
    "codeExample": {
      "title": "Euclid's Greatest Common Divisor (GCD) using While Loop",
      "code": "def gcd(a: int, b: int) -> int:\n    # While b != 0, replace (a, b) with (b, a % b)\n    while b:\n        a, b = b, a % b\n    return a\n\nprint(gcd(48, 18)) # 6",
      "explanation": "Uses a while loop to perform Euclidean division until remainder b reaches 0."
    },
    "runnableCode": {
      "code": "num = 16\nsteps = 0\nwhile num > 1:\n    num //= 2\n    steps += 1\nprint(f\"Halved to 1 in {steps} steps\")",
      "expectedOutput": "Halved to 1 in 4 steps"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "while num > 1:",
        "codeSnippet": "while num > 1:",
        "explanation": "Loop continues as long as num is strictly greater than 1."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "num //= 2",
        "codeSnippet": "num //= 2",
        "explanation": "Progress step: shrinks num, guaranteeing eventual loop termination."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting the loop update step, creating an infinite loop: while i < 10: print(i)",
        "solution": "Always ensure variables in the condition are mutated inside the loop body.",
        "codeExample": "i += 1 # progress"
      }
    ],
    "bestPractices": [
      "Add an explicit iteration timeout counter if looping over external network calls."
    ],
    "applications": [
      {
        "industry": "Game Development",
        "application": "Main game loop rendering frames",
        "benefit": "Runs while game_running is True."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-wl-1",
        "question": "How can you safely exit an intentional `while True:` loop?",
        "hint": "break or return.",
        "answer": "Use an explicit `break` or `return` statement when an exit condition is met."
      }
    ],
    "quiz": [
      {
        "id": "q-wl-1",
        "question": "What causes an infinite loop in a while construct?",
        "options": [
          "The loop condition never evaluates to False",
          "The loop runs out of memory",
          "Python limits while loops",
          "Using integers in conditions"
        ],
        "correctIndex": 0,
        "explanation": "If the loop condition is never modified to evaluate to False, the loop executes endlessly."
      }
    ],
    "codingChallenge": {
      "title": "Collatz Conjecture Steps",
      "problem": "Given a positive integer n, if n is even, divide by 2; if n is odd, multiply by 3 and add 1. Return the number of steps required to reach 1.",
      "hints": [
        "Use while n != 1."
      ],
      "starterCode": "def collatz_steps(n: int) -> int:\n    # TODO: Count Collatz steps to 1\n    pass",
      "solution": "def collatz_steps(n: int) -> int:\n    steps = 0\n    while n != 1:\n        if n % 2 == 0:\n            n //= 2\n        else:\n            n = 3 * n + 1\n        steps += 1\n    return steps"
    },
    "summary": {
      "keyTakeaways": [
        "while loops execute condition-driven iteration.",
        "Always ensure a progress step to guarantee termination."
      ],
      "nextLessonId": "py-control-break-continue",
      "nextLessonTitle": "break, continue, and pass",
      "nextLessonModuleId": "python-module-2"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "while num > 1:",
        "codeSnippet": "while num > 1:",
        "explanation": "Loop continues as long as num is strictly greater than 1."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "num //= 2",
        "codeSnippet": "num //= 2",
        "explanation": "Progress step: shrinks num, guaranteeing eventual loop termination."
      }
    ]
  },
  "py-control-break-continue": {
    "id": "py-control-break-continue",
    "moduleId": "python-module-2",
    "title": "break, continue, and pass",
    "subtitle": "Loop Control Jump Statements, Early Exits, and Syntactic Placeholders",
    "order": 5,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Terminate loops immediately using `break`.",
      "Skip remainder of current iteration and jump to next using `continue`.",
      "Use `pass` as an explicit no-op syntactic placeholder.",
      "Trace execution flow jumps using debugger breakpoints."
    ],
    "prerequisites": [
      "for Loops and range()",
      "while Loops"
    ],
    "analogy": {
      "title": "Factory Assembly Line Quality Control",
      "text": "Imagine inspecting bottles on an assembly line. If a bottle is slightly scratched, you mark it and skip packaging it, moving to the next bottle (`continue`). If a bottle is shattered and glass is everywhere, you hit the emergency red stop button to shut down the entire line (`break`).",
      "metaphor": "break terminates the whole loop; continue skips only the current iteration."
    },
    "problemSolved": {
      "title": "Fine-Grained Loop Control Without Deep Nesting",
      "description": "Without break and continue, code requires deeply nested `if/else` ladders. Using `continue` to skip invalid data early flattens code into clean, readable guard clauses.",
      "keyPoints": [
        "`break` exits innermost enclosing loop immediately.",
        "`continue` skips to next loop iteration.",
        "`pass` does nothing; satisfies Python's indentation syntax requirement."
      ]
    },
    "intuition": {
      "overview": "`break` breaks out of the loop. `continue` skips the rest of the current loop body and proceeds to the next iteration. `pass` is an empty placeholder.",
      "steps": [
        {
          "step": 1,
          "title": "Break",
          "description": "if target_found: break"
        },
        {
          "step": 2,
          "title": "Continue",
          "description": "if item is invalid: continue"
        },
        {
          "step": 3,
          "title": "Pass",
          "description": "def stub(): pass"
        }
      ]
    },
    "codeExample": {
      "title": "break vs continue vs pass in Action",
      "code": "# continue: skip odd numbers\nevens = []\nfor x in range(10):\n    if x % 2 != 0:\n        continue # Skip odd numbers\n    evens.append(x)\nprint(evens) # [0, 2, 4, 6, 8]\n\n# break: stop search\nfor x in range(100):\n    if x == 5:\n        break # Exit loop\nprint(x) # 5\n\n# pass: placeholder for future implementation\ndef future_feature():\n    pass # No-op",
      "explanation": "Demonstrates skipping iterations with continue, exiting with break, and stubbing with pass."
    },
    "runnableCode": {
      "code": "res = []\nfor i in range(10):\n    if i == 3: continue\n    if i == 6: break\n    res.append(i)\nprint(res)",
      "expectedOutput": "[0, 1, 2, 4, 5]"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "if i == 3: continue",
        "codeSnippet": "if i == 3: continue",
        "explanation": "Skips appending 3, jumping directly to i = 4."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "if i == 6: break",
        "codeSnippet": "if i == 6: break",
        "explanation": "Terminates loop permanently when i reaches 6."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Expecting `break` to exit all nested loops",
        "solution": "`break` only exits the single innermost loop; to exit outer loops, use boolean flags or return from a function.",
        "codeExample": "# break only exits inner loop"
      }
    ],
    "bestPractices": [
      "Use `continue` as an early-return guard clause to reduce nested indentation.",
      "Use `pass` or `...` (Ellipsis) when designing abstract stub interfaces."
    ],
    "applications": [
      {
        "industry": "Data Science",
        "application": "Data cleaning and NaN value skipping",
        "benefit": "Skips corrupted rows instantly using `continue`."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-bcp-1",
        "question": "Does `pass` do anything at runtime?",
        "hint": "Syntactic placeholder.",
        "answer": "No. `pass` is completely ignored at runtime by the Python interpreter; it exists solely because Python requires at least one indented statement in empty blocks."
      }
    ],
    "quiz": [
      {
        "id": "q-bcp-1",
        "question": "What is the difference between `break` and `continue`?",
        "options": [
          "`break` terminates the loop entirely, while `continue` only skips the rest of the current iteration",
          "`continue` exits the loop",
          "They are synonyms in Python",
          "`break` only works in while loops"
        ],
        "correctIndex": 0,
        "explanation": "break halts the loop completely; continue immediately jumps to the next iteration of the loop."
      }
    ],
    "codingChallenge": {
      "title": "Skip Multiples of 3 and Stop at Negative",
      "problem": "Process a list of integers: append positive numbers to a result list, skip multiples of 3, and terminate immediately if a negative number is encountered.",
      "hints": [
        "Use continue for x % 3 == 0 and break for x < 0."
      ],
      "starterCode": "def filter_stream(nums: list[int]) -> list[int]:\n    # TODO: Filter stream using break and continue\n    pass",
      "solution": "def filter_stream(nums: list[int]) -> list[int]:\n    res = []\n    for x in nums:\n        if x < 0:\n            break\n        if x % 3 == 0:\n            continue\n        res.append(x)\n    return res"
    },
    "summary": {
      "keyTakeaways": [
        "break halts the innermost loop.",
        "continue skips to the next iteration.",
        "pass serves as a syntactic no-op placeholder."
      ],
      "nextLessonId": "py-control-nested-loops",
      "nextLessonTitle": "Nested Loops",
      "nextLessonModuleId": "python-module-2"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "if i == 3: continue",
        "codeSnippet": "if i == 3: continue",
        "explanation": "Skips appending 3, jumping directly to i = 4."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "if i == 6: break",
        "codeSnippet": "if i == 6: break",
        "explanation": "Terminates loop permanently when i reaches 6."
      }
    ]
  },
  "py-control-nested-loops": {
    "id": "py-control-nested-loops",
    "moduleId": "python-module-2",
    "title": "Nested Loops",
    "subtitle": "2D Grid Navigation, Cartesian Products, and Breaking Outer Loops",
    "order": 6,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Traverse 2D matrices and grids using row and column nested loops.",
      "Calculate quadratic O(n²) time complexity from nested loops.",
      "Generate Cartesian products cleanly using `itertools.product`.",
      "Break out of multiple nested loops using helper functions or boolean flags."
    ],
    "prerequisites": [
      "for Loops and range()"
    ],
    "analogy": {
      "title": "The Odometer in a Car",
      "text": "A mechanical odometer displays miles. The tenths-of-a-mile digit (inner loop) must spin through all 10 digits (0 through 9) before the whole-miles digit (outer loop) ticks up by 1. The inner wheel spins 10 times faster than the outer wheel.",
      "metaphor": "The inner loop completes all its iterations for every single step of the outer loop."
    },
    "problemSolved": {
      "title": "Multi-Dimensional Data Processing and Pairwise Comparisons",
      "description": "Images, chessboards, spreadsheets, and distance tables are 2D grids. Nested loops process every cell (row, col) systematically.",
      "keyPoints": [
        "Outer loop runs R times, inner loop runs C times -> total R * C iterations.",
        "To break out of nested loops: wrap in a function and use `return`.",
        "`itertools.product` flattens nested loops into clean 1D loops."
      ]
    },
    "intuition": {
      "overview": "For each row r from 0 to rows - 1: for each col c from 0 to cols - 1: access matrix[r][c].",
      "steps": [
        {
          "step": 1,
          "title": "Row Selection",
          "description": "Outer loop picks current row."
        },
        {
          "step": 2,
          "title": "Column Sweep",
          "description": "Inner loop visits every cell in that row."
        },
        {
          "step": 3,
          "title": "Next Row",
          "description": "Advance to next row."
        }
      ]
    },
    "codeExample": {
      "title": "Matrix Traversal & Breaking Out of Nested Loops",
      "code": "matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n# Cleanest way to break out of nested loops: wrap in a function!\ndef find_cell(matrix, target):\n    for r in range(len(matrix)):\n        for c in range(len(matrix[0])):\n            if matrix[r][c] == target:\n                return (r, c) # Returns immediately from both loops!\n    return (-1, -1)\n\nprint(find_cell(matrix, 5)) # (1, 1)",
      "explanation": "Using a return statement cleanly terminates both outer and inner loops simultaneously."
    },
    "runnableCode": {
      "code": "coords = []\nfor i in range(2):\n    for j in range(3):\n        coords.append((i, j))\nprint(coords)",
      "expectedOutput": "[(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]"
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "for i in range(2):",
        "codeSnippet": "for i in range(2):",
        "explanation": "Outer loop runs 2 times (i = 0, 1)."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "for j in range(3):",
        "codeSnippet": "for j in range(3):",
        "explanation": "Inner loop runs 3 times for each i, resulting in 2 * 3 = 6 total iterations."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using break to exit nested loops and expecting both loops to terminate",
        "solution": "break only exits the innermost loop; use a return statement or a boolean flag.",
        "codeExample": "return (r, c) # exits both loops"
      }
    ],
    "bestPractices": [
      "Use `itertools.product(range(R), range(C))` to write flat, clean 2D grid loops."
    ],
    "applications": [
      {
        "industry": "Computer Vision",
        "application": "Image convolution filter kernel passes",
        "benefit": "Applies 3x3 filter kernels across every pixel coordinate in an image."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-nl-1",
        "question": "How can you replace a nested loop over rows and columns with a single loop?",
        "hint": "itertools.product.",
        "answer": "`from itertools import product; for r, c in product(range(R), range(C)):`"
      }
    ],
    "quiz": [
      {
        "id": "q-nl-1",
        "question": "If outer loop runs n times and inner loop runs m times, how many total iterations occur?",
        "options": [
          "n * m",
          "n + m",
          "n^m",
          "2^(n*m)"
        ],
        "correctIndex": 0,
        "explanation": "The inner loop runs m times for each of the n outer iterations, totaling n * m iterations."
      }
    ],
    "codingChallenge": {
      "title": "Transpose Matrix",
      "problem": "Given a 2D integer array matrix, return the transpose of matrix (flipping matrix over its main diagonal).",
      "hints": [
        "Construct new matrix of size cols x rows where result[c][r] = matrix[r][c]."
      ],
      "starterCode": "def transpose(matrix: list[list[int]]) -> list[list[int]]:\n    # TODO: Transpose matrix\n    pass",
      "solution": "def transpose(matrix: list[list[int]]) -> list[list[int]]:\n    rows, cols = len(matrix), len(matrix[0])\n    transposed = [[0] * rows for _ in range(cols)]\n    for r in range(rows):\n        for c in range(cols):\n            transposed[c][r] = matrix[r][c]\n    return transposed"
    },
    "summary": {
      "keyTakeaways": [
        "Nested loops traverse 2D grids in O(rows * cols) time.",
        "Wrap in functions and use `return` to break out of multiple loops cleanly."
      ],
      "nextLessonId": "py-control-pattern-printing",
      "nextLessonTitle": "Pattern Printing Problems",
      "nextLessonModuleId": "python-module-2"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "for i in range(2):",
        "codeSnippet": "for i in range(2):",
        "explanation": "Outer loop runs 2 times (i = 0, 1)."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "for j in range(3):",
        "codeSnippet": "for j in range(3):",
        "explanation": "Inner loop runs 3 times for each i, resulting in 2 * 3 = 6 total iterations."
      }
    ]
  },
  "py-control-pattern-printing": {
    "id": "py-control-pattern-printing",
    "moduleId": "python-module-2",
    "title": "Pattern Printing Problems",
    "subtitle": "Geometric Loop Coordination, String Multiplication, and Pyramid Symmetry",
    "order": 7,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Translate geometric patterns (pyramids, diamonds, butterflies) into mathematical row/column invariants.",
      "Leverage Python string multiplication `char * count` for clean row generation.",
      "Master symmetric spacing and inverted loops.",
      "Build problem-solving confidence in coordinate geometry mapping."
    ],
    "prerequisites": [
      "Nested Loops"
    ],
    "analogy": {
      "title": "The Dot-Matrix Printer Needle",
      "text": "A dot-matrix receipt printer prints line by line. To print a triangular company logo, the print head calculates how many spaces to advance before firing its ink needles, and how many asterisks to strike, before advancing the roller to the next line.",
      "metaphor": "Each row is defined by a mathematical relationship between row index, spaces, and stars."
    },
    "problemSolved": {
      "title": "Mastering Loop Index Coordination and Spatial Logic",
      "description": "Pattern printing problems are classic computer science drills that build strong mental models of loop index relationships, boundary conditions, and spatial symmetry.",
      "keyPoints": [
        "Row index i determines number of leading spaces and characters.",
        "Pyramid formula: (n - i) spaces followed by (2*i - 1) stars.",
        "Python string multiplication `\"*\" * k` eliminates manual inner character loops."
      ]
    },
    "intuition": {
      "overview": "For a pyramid of height n: for row i from 1 to n: spaces = n - i, stars = 2*i - 1. Print \" \" * spaces + \"*\" * stars.",
      "steps": [
        {
          "step": 1,
          "title": "Identify Invariant",
          "description": "Find formula for spaces and stars as a function of row i."
        },
        {
          "step": 2,
          "title": "Generate Rows",
          "description": "Use string multiplication to create each line."
        },
        {
          "step": 3,
          "title": "Symmetry",
          "description": "For diamonds, generate upper half (1..n) and invert lower half (n-1 down to 1)."
        }
      ]
    },
    "codeExample": {
      "title": "Printing Pyramids and Diamonds",
      "code": "def print_pyramid(n):\n    for i in range(1, n + 1):\n        spaces = \" \" * (n - i)\n        stars = \"*\" * (2 * i - 1)\n        print(spaces + stars)\n\ndef print_diamond(n):\n    # Upper pyramid\n    for i in range(1, n + 1):\n        print(\" \" * (n - i) + \"*\" * (2 * i - 1))\n    # Lower inverted pyramid\n    for i in range(n - 1, 0, -1):\n        print(\" \" * (n - i) + \"*\" * (2 * i - 1))",
      "explanation": "Uses Python string multiplication for clean geometric pattern generation."
    },
    "runnableCode": {
      "code": "n = 3\nfor i in range(1, n + 1):\n    print(\" \" * (n - i) + \"*\" * (2 * i - 1))",
      "expectedOutput": "  *\n ***\n*****"
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "for i in range(1, n + 1):",
        "codeSnippet": "for i in range(1, n + 1):",
        "explanation": "Iterates row by row from top (i=1) to base (i=n)."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(\" \" * (n - i) + \"*\" * (2 * i - 1))",
        "codeSnippet": "print(\" \" * (n - i) + \"*\" * (2 * i - 1))",
        "explanation": "Calculates leading whitespace and prints odd number of stars centered symmetrically."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Writing manual nested loops for characters when string multiplication is available",
        "solution": "In Python, `\"*\" * count` is faster, cleaner, and less bug-prone than manual inner loops.",
        "codeExample": "line = \" \" * spaces + \"*\" * stars"
      }
    ],
    "bestPractices": [
      "Always formulate formulas for spaces and characters on paper before typing code."
    ],
    "applications": [
      {
        "industry": "Education",
        "application": "Computer science introductory pedagogy",
        "benefit": "Instills deep understanding of iteration boundaries and nested indices."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-pp-1",
        "question": "How many asterisks are in the base of a pyramid of height n?",
        "hint": "Odd numbers formula.",
        "answer": "2 * n - 1 asterisks."
      }
    ],
    "quiz": [
      {
        "id": "q-pp-1",
        "question": "What is the formula for the number of stars on row i (1-indexed) in a centered pyramid?",
        "options": [
          "2 * i - 1",
          "i * 2",
          "i",
          "2 * i + 1"
        ],
        "correctIndex": 0,
        "explanation": "The rows progress through odd numbers: row 1 has 1 star, row 2 has 3 stars, row 3 has 5 stars, etc."
      }
    ],
    "codingChallenge": {
      "title": "Generate Pascal's Triangle Rows as Lists",
      "problem": "Given an integer numRows, return the first numRows of Pascal's triangle as a list of lists.",
      "hints": [
        "row[j] = prev_row[j-1] + prev_row[j]."
      ],
      "starterCode": "def generate_pascals_triangle(numRows: int) -> list[list[int]]:\n    # TODO: Generate Pascal's Triangle\n    pass",
      "solution": "def generate_pascals_triangle(numRows: int) -> list[list[int]]:\n    triangle = []\n    for i in range(numRows):\n        row = [1] * (i + 1)\n        for j in range(1, i):\n            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]\n        triangle.append(row)\n    return triangle"
    },
    "summary": {
      "keyTakeaways": [
        "Coordinate patterns map row index i to spaces and stars.",
        "String multiplication `\"*\" * k` streamlines line generation."
      ],
      "nextLessonId": "py-ds-strings-methods",
      "nextLessonTitle": "Strings and String Methods",
      "nextLessonModuleId": "python-module-3"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "for i in range(1, n + 1):",
        "codeSnippet": "for i in range(1, n + 1):",
        "explanation": "Iterates row by row from top (i=1) to base (i=n)."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(\" \" * (n - i) + \"*\" * (2 * i - 1))",
        "codeSnippet": "print(\" \" * (n - i) + \"*\" * (2 * i - 1))",
        "explanation": "Calculates leading whitespace and prints odd number of stars centered symmetrically."
      }
    ]
  }
};
