import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule10Data: PythonModuleData = {
  "id": "python-module-10",
  "number": 10,
  "title": "Practical Python",
  "subtitle": "JSON, HTTP APIs, Databases, Testing & Clean Code",
  "description": "Apply Python to real-world tasks. Parse JSON and CSV data, call REST APIs with requests, query SQLite databases, write unit tests with pytest, master advanced debugging, apply clean code principles, use Git, and learn to package and distribute Python projects.",
  "icon": "Briefcase",
  "badge": "Practical Python",
  "estimatedHours": 8,
  "topicsCount": 8,
  "lessons": [
    {
      "id": "py-practical-json-csv",
      "moduleId": "python-module-10",
      "title": "JSON and CSV Processing",
      "description": "json module serialization/deserialization, csv.reader/DictReader, and pandas read_csv basics.",
      "order": 1,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-practical-http",
      "moduleId": "python-module-10",
      "title": "HTTP and REST APIs with requests",
      "description": "GET/POST/PUT/DELETE, headers, authentication, error handling, and response parsing.",
      "order": 2,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-practical-sqlite",
      "moduleId": "python-module-10",
      "title": "SQLite and Database Connectivity",
      "description": "sqlite3 module, CRUD operations, parameterized queries, and preventing SQL injection.",
      "order": 3,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-practical-pytest",
      "moduleId": "python-module-10",
      "title": "Testing with pytest",
      "description": "Test discovery, assert, fixtures, parametrize, mocking, and TDD workflow.",
      "order": 4,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-practical-debugging",
      "moduleId": "python-module-10",
      "title": "Advanced Debugging Techniques",
      "description": "pdb commands, IDE debuggers, post-mortem debugging, and profiling integration.",
      "order": 5,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-practical-clean-code",
      "moduleId": "python-module-10",
      "title": "Clean Code and Project Structure",
      "description": "PEP 8, black formatting, type hints, SOLID principles, and standard project layout.",
      "order": 6,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-practical-git",
      "moduleId": "python-module-10",
      "title": "Git Fundamentals for Python Projects",
      "description": "init, add, commit, branch, merge, .gitignore for Python, and GitHub workflow basics.",
      "order": 7,
      "readTimeMinutes": 20,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "py-practical-packaging",
      "moduleId": "python-module-10",
      "title": "Packaging and Distribution",
      "description": "pyproject.toml, setuptools, building wheels, publishing to PyPI, and semantic versioning.",
      "order": 8,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Advanced"
    }
  ]
};

export const pythonModule10Lessons: Record<string, PythonLessonContent> = {
  "py-practical-pytest": {
    "id": "py-practical-pytest",
    "moduleId": "python-module-10",
    "title": "Testing with pytest",
    "subtitle": "Test Discovery, Plain Asserts, Fixtures, Parametrize & TDD Workflows",
    "order": 4,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Understand why pytest is the industry standard compared to legacy unittest",
      "Leverage pytest automatic test discovery conventions (test_*.py and test_* functions)",
      "Use standard Python assert statements with rich, informative failure introspection",
      "Build reusable test setup and teardown pipelines using @pytest.fixture",
      "Execute table-driven test suites using @pytest.mark.parametrize",
      "Assert expected exceptions cleanly using pytest.raises context managers"
    ],
    "prerequisites": [
      "Functions and parameter passing in Python",
      "Exceptions and error handling fundamentals"
    ],
    "analogy": {
      "title": "The Manufacturing Quality Control Rig",
      "text": "Imagine an automotive manufacturing line: instead of driving every completed car out onto the highway and hoping the brakes work, engineers mount the chassis on an automated test rig. The rig simulates emergency braking, arctic cold, and sudden potholes under controlled, repeatable conditions. Fixtures are the robotic clamps and electrical plugs prepared before each test run and safely detached afterward. Pytest is this automated rig, catching flaws before your code ships to end users.",
      "metaphor": "A unit test is an automated specification of system invariants that verifies behavior across nominal, boundary, and pathological inputs."
    },
    "problemSolved": {
      "title": "Why pytest over unittest or Manual Testing?",
      "description": "Manual testing is slow, incomplete, and easily forgotten under deadline pressure. Legacy unittest requires verbose boilerplate classes and specialized assert methods (self.assertEqual, self.assertRaises). Pytest enables developers to write readable, expressive tests with plain Python asserts while delivering extraordinary failure diagnostics.",
      "keyPoints": [
        "Zero boilerplate: no classes or inheritance required — just standard functions with \"test_\" prefixes",
        "Assert introspection: when an assert fails, pytest analyzes the AST to display the exact values of all intermediate sub-expressions",
        "Modular fixtures: dependency-injection fixtures replace rigid setUp/tearDown inheritance trees",
        "Parametrization: run dozens of boundary condition test vectors with a single 3-line decorator"
      ]
    },
    "intuition": {
      "overview": "Pytest discovers all files matching test_*.py, finds all functions named test_*(), executes each in an isolated environment with requested fixtures, and reports passes and detailed failure diffs.",
      "steps": [
        {
          "step": 1,
          "title": "Discovery",
          "description": "Pytest recursively scans directories from the current working directory, finding files matching test_*.py or *_test.py and functions prefixed with test_."
        },
        {
          "step": 2,
          "title": "Plain assert Introspection",
          "description": "Unlike standard Python assert which only raises AssertionError, pytest rewrites the test bytecode to capture and format every sub-expression when an assertion fails."
        },
        {
          "step": 3,
          "title": "Dependency Injection via Fixtures",
          "description": "Tests declare required dependencies as parameter names. Pytest resolves and executes corresponding @pytest.fixture functions before passing the result."
        },
        {
          "step": 4,
          "title": "Teardown with yield",
          "description": "Fixtures can yield a value. Code before yield runs during setup; code after yield runs during cleanup after the test finishes."
        }
      ]
    },
    "codeExample": {
      "title": "Complete pytest Suite: Fixtures, Parametrize, and Exception Testing",
      "code": "import pytest\n\n# 1. Component under test\nclass BankAccount:\n    def __init__(self, initial_balance: float = 0.0):\n        if initial_balance < 0:\n            raise ValueError(\"Initial balance cannot be negative\")\n        self.balance = initial_balance\n\n    def deposit(self, amount: float) -> float:\n        if amount <= 0:\n            raise ValueError(\"Deposit amount must be positive\")\n        self.balance += amount\n        return self.balance\n\n    def withdraw(self, amount: float) -> float:\n        if amount <= 0:\n            raise ValueError(\"Withdrawal amount must be positive\")\n        if amount > self.balance:\n            raise ValueError(\"Insufficient balance\")\n        self.balance -= amount\n        return self.balance\n\n# 2. Fixture for test setup\n@pytest.fixture\ndef funded_account():\n    account = BankAccount(100.0)\n    yield account\n    # Teardown / cleanup logic could go here\n\n# 3. Simple unit test with plain assert\ndef test_initial_balance(funded_account):\n    assert funded_account.balance == 100.0\n\n# 4. Parametrized test suite\n@pytest.mark.parametrize(\"deposit_amt, expected_balance\", [\n    (10.0, 110.0),\n    (50.5, 150.5),\n    (100.0, 200.0),\n])\ndef test_multiple_deposits(funded_account, deposit_amt, expected_balance):\n    assert funded_account.deposit(deposit_amt) == expected_balance\n\n# 5. Testing exceptions with pytest.raises\ndef test_withdraw_overdraft(funded_account):\n    with pytest.raises(ValueError, match=\"Insufficient balance\"):\n        funded_account.withdraw(150.0)",
      "explanation": "Demonstrates fixtures, plain assert statements, table-driven test cases via @pytest.mark.parametrize, and exception validation using pytest.raises with regex pattern matching."
    },
    "runnableCode": {
      "code": "def calculate_discount(price: float, discount_pct: float) -> float:\n    if not (0 <= discount_pct <= 100):\n        raise ValueError(\"Discount percentage must be between 0 and 100\")\n    return round(price * (1 - discount_pct / 100), 2)\n\n# Simulating pytest assertions programmatically\ntest_cases = [\n    (100.0, 20.0, 80.0),\n    (50.0, 10.0, 45.0),\n    (79.99, 15.0, 67.99),\n]\n\npassed = 0\nfor price, pct, expected in test_cases:\n    actual = calculate_discount(price, pct)\n    assert actual == expected, f\"Failed: {price} at {pct}% expected {expected}, got {actual}\"\n    print(f\"PASS: {price} - {pct}% = {actual}\")\n    passed += 1\n\nprint(f\"\\nAll {passed}/{len(test_cases)} tests passed successfully!\")",
      "expectedOutput": "PASS: 100.0 - 20.0% = 80.0\nPASS: 50.0 - 10.0% = 45.0\nPASS: 79.99 - 15.0% = 67.99\n\nAll 3/3 tests passed successfully!"
    },
    "lineByLineExplanation": [
      {
        "line": "1-4",
        "lines": "1-4",
        "code": "if not (0 <= discount_pct <= 100): raise ValueError(...)",
        "codeSnippet": "if not (0 <= discount_pct <= 100): raise ValueError(...)",
        "explanation": "Enforces invariant boundaries before calculation."
      },
      {
        "line": "14-16",
        "lines": "14-16",
        "code": "assert actual == expected, f\"Failed: ...\"",
        "codeSnippet": "assert actual == expected, f\"Failed: ...\"",
        "explanation": "Plain assert condition. Pytest automatically inspects both sides on failure without manual string concatenation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Naming test functions or files without the test_ prefix",
        "solution": "Pytest discovery requires files to be test_*.py or *_test.py, and functions to start with test_*. Otherwise, tests are silently skipped.",
        "codeExample": "# BAD: def check_user_login(): ... (skipped)\n# GOOD: def test_user_login(): ..."
      },
      {
        "mistake": "Putting assertions outside the pytest.raises context block",
        "solution": "pytest.raises must enclose the exact line of code expected to raise the exception.",
        "codeExample": "# BAD:\nfunded_account.withdraw(999)  # Crashes before pytest.raises!\nwith pytest.raises(ValueError): pass\n\n# GOOD:\nwith pytest.raises(ValueError):\n    funded_account.withdraw(999)"
      }
    ],
    "bestPractices": [
      "Follow the Arrange-Act-Assert (AAA) pattern inside each test function",
      "Test boundary values: 0, negative numbers, empty collections, maximum values, and None",
      "Use conftest.py for fixtures shared across multiple test files",
      "Run pytest with -v (verbose) and --tb=short for clear terminal feedback"
    ],
    "applications": [
      {
        "industry": "Continuous Integration / CD Pipelines",
        "application": "GitHub Actions and GitLab CI automated test gates",
        "benefit": "Blocks pull requests containing regressions from merging into the main branch."
      },
      {
        "industry": "FinTech and Banking Systems",
        "application": "Ledger consistency and decimal rounding verification",
        "benefit": "Verifies double-entry balancing rules across thousands of simulated transaction scenarios."
      },
      {
        "industry": "Machine Learning Infrastructure",
        "application": "Tensor shape validation and pipeline smoke tests",
        "benefit": "Validates that data loaders and transforms output expected tensor dtypes and shapes."
      }
    ],
    "practiceQuestions": [
      {
        "id": "q1",
        "question": "What is the pytest naming convention for test files, test classes, and test functions?",
        "hint": "Think about default discovery patterns.",
        "answer": "Files: test_*.py or *_test.py. Classes: Test* (no __init__). Functions: test_*()."
      },
      {
        "id": "q2",
        "question": "How do you perform cleanup/teardown in a pytest fixture?",
        "hint": "What keyword can you use instead of return in a generator fixture?",
        "answer": "Use the 'yield' statement instead of 'return'. Code before yield executes as setup; code after yield executes as teardown after the test concludes."
      },
      {
        "id": "q3",
        "question": "Why does pytest not require self.assertEqual() like unittest does?",
        "hint": "How does pytest handle standard assert statements?",
        "answer": "Pytest rewrites the abstract syntax tree (AST) of assert statements in test files at import time, providing rich introspection and diffs on failure using plain Python 'assert'."
      }
    ],
    "quiz": [
      {
        "id": "quiz-1",
        "question": "Which decorator allows running a single test function with multiple input and expected output combinations?",
        "options": [
          "@pytest.fixture",
          "@pytest.mark.parametrize",
          "@pytest.mark.repeat",
          "@pytest.loop"
        ],
        "correctIndex": 1,
        "explanation": "@pytest.mark.parametrize binds multiple sets of arguments to a test function."
      },
      {
        "id": "quiz-2",
        "question": "How do you assert that a specific function call raises an IndexError in pytest?",
        "options": [
          "assert raises(IndexError, func)",
          "with pytest.raises(IndexError): func()",
          "try: func() except IndexError: pass",
          "pytest.expect_error(IndexError, func)"
        ],
        "correctIndex": 1,
        "explanation": "'with pytest.raises(ExceptionType):' is the standard context manager for verifying expected exceptions."
      },
      {
        "id": "quiz-3",
        "question": "Where should shared fixtures accessible to all test files in a directory be placed?",
        "options": [
          "setup.py",
          "conftest.py",
          "fixtures.py",
          "__init__.py"
        ],
        "correctIndex": 1,
        "explanation": "conftest.py is automatically loaded by pytest to provide shared fixtures and configuration without explicit imports."
      }
    ],
    "codingChallenge": {
      "title": "TDD Palindrome Cleaner and Validator",
      "problem": "Write a function is_palindrome(text: str) -> bool that ignores casing, whitespace, and punctuation. For example, \"A man, a plan, a canal: Panama\" -> True, \"race a car\" -> False, \"\" -> True. Write both the implementation and verify all edge cases.",
      "hints": [
        "Filter characters with c.isalnum() and convert to lowercase: [c.lower() for c in text if c.isalnum()].",
        "Check if the cleaned sequence equals its reverse: cleaned == cleaned[::-1].",
        "Handle empty strings gracefully (they are palindromes)."
      ],
      "starterCode": "def is_palindrome(text: str) -> bool:\n    # Implement palindrome check ignoring non-alphanumeric chars\n    pass",
      "solution": "def is_palindrome(text: str) -> bool:\n    cleaned = [c.lower() for c in text if c.isalnum()]\n    return cleaned == cleaned[::-1]"
    },
    "summary": {
      "keyTakeaways": [
        "pytest replaces verbose test classes with plain functions and expressive asserts",
        "Test discovery runs automatically for test_*.py files and test_*() functions",
        "@pytest.fixture provides modular dependency injection with setup and teardown via yield",
        "@pytest.mark.parametrize eliminates code duplication in table-driven unit tests",
        "pytest.raises validates exception types and error message text with regex matching"
      ],
      "nextLessonId": "py-practical-debugging",
      "nextLessonTitle": "Advanced Debugging Techniques",
      "nextLessonModuleId": "python-module-10"
    },
    "lineByLine": [
      {
        "line": "1-4",
        "lines": "1-4",
        "code": "if not (0 <= discount_pct <= 100): raise ValueError(...)",
        "codeSnippet": "if not (0 <= discount_pct <= 100): raise ValueError(...)",
        "explanation": "Enforces invariant boundaries before calculation."
      },
      {
        "line": "14-16",
        "lines": "14-16",
        "code": "assert actual == expected, f\"Failed: ...\"",
        "codeSnippet": "assert actual == expected, f\"Failed: ...\"",
        "explanation": "Plain assert condition. Pytest automatically inspects both sides on failure without manual string concatenation."
      }
    ]
  },
  "py-practical-json-csv": {
    "id": "py-practical-json-csv",
    "moduleId": "python-module-10",
    "title": "JSON and CSV Processing",
    "subtitle": "json.loads/dumps, csv.DictReader/DictWriter, and Custom JSON Encoders",
    "order": 1,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Serialize and deserialize JSON payloads using `json.dumps()`, `json.loads()`, `json.dump()`, and `json.load()`.",
      "Handle non-serializable objects (datetime, Decimal, UUID) using custom `json.JSONEncoder` classes or default handlers.",
      "Parse and generate CSV files cleanly using `csv.reader`, `csv.writer`, `csv.DictReader`, and `csv.DictWriter`.",
      "Prevent dialect and newline errors when processing CSVs across platforms."
    ],
    "prerequisites": [
      "Python dictionaries, lists, and file I/O basics."
    ],
    "analogy": {
      "title": "The Universal Cargo Manifest and Shipping Crates",
      "text": "In global shipping, you cannot just throw loose items into a freighter. JSON is a standardized barcode-stamped shipping crate (hierarchical, typed strings, arrays, booleans) recognized by every port in the world. CSV is a flat tabular manifest grid: rows of items separated by commas. Python provides automated translators (`json` and `csv` modules) to pack Python objects into these international formats and unpack them upon delivery.",
      "metaphor": "JSON and CSV are the universal data interchange formats of web services and data science."
    },
    "problemSolved": {
      "title": "Interoperable Data Interchange with External Systems",
      "description": "Databases, web APIs, frontend apps, and spreadsheet software do not understand Python-specific binary memory formats. JSON and CSV provide universally portable text formats.",
      "keyPoints": [
        "`json.loads(s)` parses a JSON string; `json.dumps(obj)` serializes a Python object to string.",
        "`json.load(f)` and `json.dump(obj, f)` operate directly on open file handles.",
        "`csv.DictReader` maps rows directly to dictionaries keyed by header column names.",
        "Always pass `newline=\"\"` when opening files for writing with the `csv` module."
      ]
    },
    "intuition": {
      "overview": "The `json` module maps Python dicts to JSON objects, lists to arrays, str to string, numbers to numbers, True/False to true/false, and None to null.",
      "steps": [
        {
          "step": 1,
          "title": "Parse / Load",
          "description": "Parses raw string or file stream into Python native types."
        },
        {
          "step": 2,
          "title": "Manipulate",
          "description": "Transform structured dictionaries and lists using standard Python logic."
        },
        {
          "step": 3,
          "title": "Serialize / Dump",
          "description": "Converts modified Python objects back into compliant JSON or CSV text."
        }
      ]
    },
    "codeExample": {
      "title": "Custom JSON Serialization and CSV DictWriter",
      "code": "import json\nimport csv\nimport io\nfrom datetime import datetime\n\n# Handling non-serializable types with custom default\ndef custom_serializer(obj):\n    if isinstance(obj, datetime):\n        return obj.isoformat()\n    raise TypeError(f\"Object of type {type(obj)} is not JSON serializable\")\n\npayload = {\n    \"report_id\": 9942,\n    \"timestamp\": datetime(2026, 10, 18, 12, 0, 0),\n    \"active\": True\n}\njson_text = json.dumps(payload, default=custom_serializer, indent=2)\nprint(\"Serialized JSON:\\n\", json_text)\n\n# Writing and reading tabular CSV\ncsv_buffer = io.StringIO()\nfieldnames = [\"id\", \"name\", \"role\"]\nwriter = csv.DictWriter(csv_buffer, fieldnames=fieldnames)\nwriter.writeheader()\nwriter.writerow({\"id\": 1, \"name\": \"Alice\", \"role\": \"Engineer\"})\nwriter.writerow({\"id\": 2, \"name\": \"Bob\", \"role\": \"Designer\"})\n\ncsv_buffer.seek(0)\nreader = csv.DictReader(csv_buffer)\nfor row in reader:\n    print(f\"User #{row['id']}: {row['name']} ({row['role']})\")",
      "explanation": "Demonstrates custom JSON datetime serialization and reading/writing CSV with DictWriter/DictReader."
    },
    "runnableCode": {
      "code": "import json\n\nraw_json = '{\"project\": \"ML Mastery\", \"tags\": [\"AI\", \"Python\"], \"version\": 2.0}'\ndata = json.loads(raw_json)\n\nprint(\"Project Name:\", data[\"project\"])\nprint(\"First Tag:\", data[\"tags\"][0])\n\n# Compact dump without spaces\ncompact = json.dumps(data, separators=(\",\", \":\"))\nprint(\"Compact JSON:\", compact)",
      "expectedOutput": "Project Name: ML Mastery\nFirst Tag: AI\nCompact JSON: {\"project\":\"ML Mastery\",\"tags\":[\"AI\",\"Python\"],\"version\":2.0}"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "data = json.loads(raw_json)",
        "codeSnippet": "data = json.loads(raw_json)",
        "explanation": "Deserializes JSON string into a Python dictionary."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "compact = json.dumps(data, separators=(\",\", \":\"))",
        "codeSnippet": "compact = json.dumps(data, separators=(\",\", \":\"))",
        "explanation": "Serializes to compact payload by removing whitespace separators."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Passing a datetime, UUID, or set directly to `json.dumps()` without a custom serializer.",
        "solution": "Pass `default=str` or a custom serializer function to `json.dumps()`.",
        "whyWrong": "Raises `TypeError: Object of type ... is not JSON serializable`.",
        "howToFix": "Pass `default=str` or a custom serializer function to `json.dumps()`."
      },
      {
        "mistake": "Opening CSV files for writing without `newline=\"\"` on Windows: `open(\"data.csv\", \"w\")`.",
        "solution": "Always open with `newline=\"\"`: `open(\"data.csv\", \"w\", newline=\"\", encoding=\"utf-8\")`.",
        "whyWrong": "Causes extra blank rows between lines on Windows due to carriage return translation.",
        "howToFix": "Always open with `newline=\"\"`: `open(\"data.csv\", \"w\", newline=\"\", encoding=\"utf-8\")`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "REST API Payloads",
        "description": "Encoding JSON request and response bodies in web endpoints."
      },
      {
        "title": "Data Export / Reporting",
        "description": "Exporting user analytics tables into downloadable CSV spreadsheets for business intelligence."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-practical-json-csv-pq1",
        "question": "What is the difference between `json.loads` and `json.load`?",
        "hint": "String vs stream.",
        "answer": "`json.loads` parses a JSON string; `json.load` parses a JSON stream directly from an open file-like object."
      },
      {
        "id": "py-practical-json-csv-pq2",
        "question": "Why should you specify `newline=\"\"` when opening a file for writing with `csv.writer`?",
        "hint": "Cross-platform newline handling.",
        "answer": "To prevent Windows from translating newlines into `\\r\\r\\n`, which creates blank lines between records."
      },
      {
        "id": "py-practical-json-csv-pq3",
        "question": "What Python type does JSON `null` deserialize into?",
        "hint": "Python singleton.",
        "answer": "`None`."
      }
    ],
    "quiz": [
      {
        "id": "py-practical-json-csv-q1",
        "question": "Which of the following types is NOT natively serializable by Python's standard `json` module?",
        "options": [
          "dict",
          "set",
          "list",
          "bool"
        ],
        "correctIndex": 1,
        "explanation": "Sets are not part of the JSON specification and raise `TypeError` unless handled with a custom serializer."
      },
      {
        "id": "py-practical-json-csv-q2",
        "question": "What does `csv.DictReader` use for the dictionary keys of each row?",
        "options": [
          "Integer column indices (0, 1, 2)",
          "The column header names found in the first row of the CSV",
          "A random hash",
          "The filename"
        ],
        "correctIndex": 1,
        "explanation": "`csv.DictReader` automatically reads the first row as headers and maps subsequent cell values to those keys."
      },
      {
        "id": "py-practical-json-csv-q3",
        "question": "How can you pretty-print JSON with 4-space indentation?",
        "options": [
          "json.dumps(data, spaces=4)",
          "json.dumps(data, indent=4)",
          "json.dumps(data, format=True)",
          "json.pretty(data)"
        ],
        "correctIndex": 1,
        "explanation": "Passing `indent=4` formats JSON with 4-space indentation and newlines."
      }
    ],
    "codingChallenge": {
      "title": "Transform CSV Text to JSON Payload",
      "problem": "Write a function `csv_to_json(csv_text: str) -> str` that takes a comma-separated CSV string with a header row, parses the records using `csv.DictReader`, and returns a JSON array string representing the records formatted with `indent=2`.",
      "hints": [
        "Wrap csv_text in io.StringIO.",
        "Pass stream to csv.DictReader.",
        "Convert rows to list of dicts: records = list(reader).",
        "Return json.dumps(records, indent=2)."
      ],
      "starterCode": "import csv\nimport json\nimport io\n\ndef csv_to_json(csv_text: str) -> str:\n    # Write your solution here\n    pass",
      "solution": "import csv\nimport json\nimport io\n\ndef csv_to_json(csv_text: str) -> str:\n    stream = io.StringIO(csv_text.strip())\n    reader = csv.DictReader(stream)\n    return json.dumps(list(reader), indent=2)",
      "testCases": [
        {
          "input": "\"id,name\\n1,Alice\\n2,Bob\"",
          "expectedOutput": "[\n  {\n    \"id\": \"1\",\n    \"name\": \"Alice\"\n  },\n  {\n    \"id\": \"2\",\n    \"name\": \"Bob\"\n  }\n]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "data = json.loads(raw_json)",
        "codeSnippet": "data = json.loads(raw_json)",
        "explanation": "Deserializes JSON string into a Python dictionary."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "compact = json.dumps(data, separators=(\",\", \":\"))",
        "codeSnippet": "compact = json.dumps(data, separators=(\",\", \":\"))",
        "explanation": "Serializes to compact payload by removing whitespace separators."
      }
    ],
    "applications": [
      {
        "industry": "REST API Payloads",
        "application": "Encoding JSON request and response bodies in web endpoints.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "REST API Payloads",
        "description": "Encoding JSON request and response bodies in web endpoints."
      },
      {
        "industry": "Data Export / Reporting",
        "application": "Exporting user analytics tables into downloadable CSV spreadsheets for business intelligence.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Data Export / Reporting",
        "description": "Exporting user analytics tables into downloadable CSV spreadsheets for business intelligence."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Serialize and deserialize JSON payloads using `json.dumps()`, `json.loads()`, `json.dump()`, and `json.load()`.",
        "Handle non-serializable objects (datetime, Decimal, UUID) using custom `json.JSONEncoder` classes or default handlers.",
        "Parse and generate CSV files cleanly using `csv.reader`, `csv.writer`, `csv.DictReader`, and `csv.DictWriter`."
      ]
    }
  },
  "py-practical-http": {
    "id": "py-practical-http",
    "moduleId": "python-module-10",
    "title": "HTTP and REST APIs with requests",
    "subtitle": "GET/POST/PUT/DELETE, Headers, Auth, Response Parsing, and Timeout Safeguards",
    "order": 2,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Execute HTTP requests (GET, POST, PUT, DELETE) using the Python `requests` library.",
      "Inspect response status codes, headers, text, and parse JSON with `response.json()`.",
      "Pass query parameters (`params={}`), JSON payloads (`json={}`), and custom headers (`headers={}`).",
      "Always configure explicit timeouts (`timeout=5.0`) and call `response.raise_for_status()` to handle errors."
    ],
    "prerequisites": [
      "Python dictionaries, functions, and JSON basics."
    ],
    "analogy": {
      "title": "The International Diplomatic Courier and Embassy Reception",
      "text": "A REST API request is a diplomatic courier delivering a diplomatic pouch to a foreign embassy. The HTTP method is the instruction envelope: \"GET\" means inspect the archive, \"POST\" means submit a new treaty draft, \"DELETE\" means shred a file. The headers are the courier's security badge and passport (Authorization tokens). The status code is the embassy clerk's stamped reply: \"200 OK (Accepted)\", \"401 Unauthorized (Invalid Badge)\", or \"404 Not Found (Document does not exist)\".",
      "metaphor": "HTTP requests communicate across web networks using standardized verbs, headers, and status codes."
    },
    "problemSolved": {
      "title": "Consuming Remote Web Services and Microservices Reliably",
      "description": "Modern applications rely on external APIs (payment processors, cloud databases, weather feeds, OAuth). The `requests` library provides an elegant, human-readable interface to communicate over HTTP.",
      "keyPoints": [
        "Never send requests without a timeout: requests without timeouts can hang indefinitely, exhausting server worker threads.",
        "`response.raise_for_status()` raises `HTTPError` automatically for 4xx and 5xx failure codes.",
        "`requests.Session()` reuses underlying TCP connections (HTTP Keep-Alive), speeding up repeated requests.",
        "Passing `json={\"key\": \"val\"}` automatically serializes the dictionary and sets `Content-Type: application/json`."
      ]
    },
    "intuition": {
      "overview": "The requests library establishes a TCP handshake, encrypts TLS packets, transmits HTTP protocol text, and parses incoming byte streams into a Response object.",
      "steps": [
        {
          "step": 1,
          "title": "Assemble Request",
          "description": "Sets HTTP verb, URL, URL query params, body payload, and authentication headers."
        },
        {
          "step": 2,
          "title": "Network Round-Trip",
          "description": "Transmits over socket with configured timeout deadline."
        },
        {
          "step": 3,
          "title": "Parse Response",
          "description": "Inspects status_code, raises on error, or deserializes payload via .json()."
        }
      ]
    },
    "codeExample": {
      "title": "Production HTTP Client with Session, Timeouts, and Error Handling",
      "code": "import requests\n\nclass APIClient:\n    def __init__(self, base_url: str, auth_token: str):\n        self.base_url = base_url.rstrip(\"/\")\n        # Session reuses TCP connections across calls\n        self.session = requests.Session()\n        self.session.headers.update({\n            \"Authorization\": f\"Bearer {auth_token}\",\n            \"User-Agent\": \"MasteryLabClient/1.0\",\n            \"Accept\": \"application/json\"\n        })\n\n    def get_user(self, user_id: int, timeout: float = 5.0) -> dict:\n        url = f\"{self.base_url}/users/{user_id}\"\n        try:\n            # Always pass explicit timeout!\n            response = self.session.get(url, timeout=timeout)\n            response.raise_for_status()  # Raises HTTPError on 4xx/5xx\n            return response.json()\n        except requests.exceptions.Timeout:\n            print(\"Request timed out\")\n            return {}\n        except requests.exceptions.HTTPError as err:\n            print(f\"HTTP error occurred: {err}\")\n            return {}\n\n# Client instance ready for production calls\nclient = APIClient(\"https://api.example.com/v1\", \"secret_token_abc\")",
      "explanation": "Demonstrates configuring a reusable requests.Session(), setting default headers, enforcing timeouts, and catching specific HTTP exceptions."
    },
    "runnableCode": {
      "code": "# Mocking requests.Response mechanics locally\nclass MockResponse:\n    def __init__(self, status_code, json_data):\n        self.status_code = status_code\n        self._data = json_data\n        \n    def raise_for_status(self):\n        if self.status_code >= 400:\n            raise Exception(f\"HTTP Error {self.status_code}\")\n            \n    def json(self):\n        return self._data\n\n# Simulated API response handling\nresp = MockResponse(200, {\"status\": \"success\", \"user_count\": 1420})\nresp.raise_for_status()\nprint(\"Parsed API response:\", resp.json())",
      "expectedOutput": "Parsed API response: {'status': 'success', 'user_count': 1420}"
    },
    "lineByLine": [
      {
        "line": 9,
        "lines": "9",
        "code": "        if self.status_code >= 400:",
        "codeSnippet": "        if self.status_code >= 400:",
        "explanation": "Checks for client (4xx) or server (5xx) failure codes."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "resp = MockResponse(200, ...)",
        "codeSnippet": "resp = MockResponse(200, ...)",
        "explanation": "Simulates successful 200 OK HTTP response."
      },
      {
        "line": 16,
        "lines": "16",
        "code": "resp.raise_for_status()",
        "codeSnippet": "resp.raise_for_status()",
        "explanation": "Validates response is successful before proceeding."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Omitting the `timeout` argument in `requests.get()` or `requests.post()`.",
        "solution": "Always specify a timeout: `requests.get(url, timeout=10.0)`.",
        "whyWrong": "If the remote server hangs or drops packets, Python will wait indefinitely, hanging the entire thread and causing thread exhaustion in production.",
        "howToFix": "Always specify a timeout: `requests.get(url, timeout=10.0)`."
      },
      {
        "mistake": "Using `data=json.dumps(d)` and forgetting to set `Content-Type: application/json`.",
        "solution": "Use the `json=d` parameter: requests sets the correct header and serializes automatically.",
        "whyWrong": "The remote server may misinterpret the body as raw form-encoded text.",
        "howToFix": "Use the `json=d` parameter: requests sets the correct header and serializes automatically."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Third-Party Webhook Consumers",
        "description": "Calling Stripe, Twilio, or GitHub webhooks upon transaction events."
      },
      {
        "title": "Microservice RPC Communication",
        "description": "Internal HTTP communication between backend services in Kubernetes clusters."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-practical-http-pq1",
        "question": "What method on a `requests.Response` object automatically parses a JSON body into a Python dict/list?",
        "hint": "Method name.",
        "answer": "`response.json()`."
      },
      {
        "id": "py-practical-http-pq2",
        "question": "What does `response.raise_for_status()` do if the server returns a 404 or 500 status code?",
        "hint": "Error handling method.",
        "answer": "It raises a `requests.exceptions.HTTPError`."
      },
      {
        "id": "py-practical-http-pq3",
        "question": "Why should you use a `requests.Session()` object when making multiple requests to the same host?",
        "hint": "Connection reuse.",
        "answer": "It reuses underlying TCP connections (HTTP Keep-Alive), dramatically reducing connection handshake latency."
      }
    ],
    "quiz": [
      {
        "id": "py-practical-http-q1",
        "question": "Which parameter in `requests.post()` automatically serializes a dict to JSON and sets the Content-Type header?",
        "options": [
          "data",
          "json",
          "body",
          "payload"
        ],
        "correctIndex": 1,
        "explanation": "Passing `json=my_dict` serializes the dictionary and automatically sets `Content-Type: application/json`."
      },
      {
        "id": "py-practical-http-q2",
        "question": "What happens if a network request hangs and no `timeout` parameter was specified?",
        "options": [
          "Python times out after 30 seconds by default",
          "The request can hang indefinitely, blocking the thread forever",
          "Raises ValueError",
          "Retries 3 times"
        ],
        "correctIndex": 1,
        "explanation": "`requests` has NO default timeout; omitting it can cause processes to freeze indefinitely."
      },
      {
        "id": "py-practical-http-q3",
        "question": "What HTTP status code range represents client errors (e.g. Unauthorized or Not Found)?",
        "options": [
          "200-299",
          "300-399",
          "400-499",
          "500-599"
        ],
        "correctIndex": 2,
        "explanation": "4xx status codes indicate client-side errors (400 Bad Request, 401 Unauthorized, 404 Not Found)."
      }
    ],
    "codingChallenge": {
      "title": "Format Authorization Header",
      "problem": "Write a function `build_auth_headers(token: str, custom_headers: dict | None = None) -> dict[str, str]` that returns a dictionary containing `\"Authorization\": f\"Bearer {token}\"` and merges any optional `custom_headers`. If custom_headers is None, return just the authorization header.",
      "hints": [
        "Initialize headers = {\"Authorization\": f\"Bearer {token}\"}.",
        "If custom_headers: headers.update(custom_headers).",
        "Return headers."
      ],
      "starterCode": "def build_auth_headers(token: str, custom_headers: dict | None = None) -> dict[str, str]:\n    # Write your solution here\n    pass",
      "solution": "def build_auth_headers(token: str, custom_headers: dict | None = None) -> dict[str, str]:\n    headers = {\"Authorization\": f\"Bearer {token}\"}\n    if custom_headers:\n        headers.update(custom_headers)\n    return headers",
      "testCases": [
        {
          "input": "\"xyz123\", {\"X-Client\": \"App\"}",
          "expectedOutput": "{\"Authorization\": \"Bearer xyz123\", \"X-Client\": \"App\"}"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 9,
        "lines": "9",
        "code": "        if self.status_code >= 400:",
        "codeSnippet": "        if self.status_code >= 400:",
        "explanation": "Checks for client (4xx) or server (5xx) failure codes."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "resp = MockResponse(200, ...)",
        "codeSnippet": "resp = MockResponse(200, ...)",
        "explanation": "Simulates successful 200 OK HTTP response."
      },
      {
        "line": 16,
        "lines": "16",
        "code": "resp.raise_for_status()",
        "codeSnippet": "resp.raise_for_status()",
        "explanation": "Validates response is successful before proceeding."
      }
    ],
    "applications": [
      {
        "industry": "Third-Party Webhook Consumers",
        "application": "Calling Stripe, Twilio, or GitHub webhooks upon transaction events.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Third-Party Webhook Consumers",
        "description": "Calling Stripe, Twilio, or GitHub webhooks upon transaction events."
      },
      {
        "industry": "Microservice RPC Communication",
        "application": "Internal HTTP communication between backend services in Kubernetes clusters.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Microservice RPC Communication",
        "description": "Internal HTTP communication between backend services in Kubernetes clusters."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Execute HTTP requests (GET, POST, PUT, DELETE) using the Python `requests` library.",
        "Inspect response status codes, headers, text, and parse JSON with `response.json()`.",
        "Pass query parameters (`params={}`), JSON payloads (`json={}`), and custom headers (`headers={}`)."
      ]
    }
  },
  "py-practical-sqlite": {
    "id": "py-practical-sqlite",
    "moduleId": "python-module-10",
    "title": "SQLite and Database Connectivity",
    "subtitle": "sqlite3 Module, Parameterized Queries, Preventing SQL Injection, and Transactions",
    "order": 3,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Connect to SQLite databases and execute CRUD operations using standard library `sqlite3`.",
      "Prevent SQL Injection vulnerabilities by strictly using parameterized queries (`?` placeholders).",
      "Manage database transactions with automatic commit and rollback using connection context managers.",
      "Use `cursor.fetchone()`, `cursor.fetchall()`, and configure `row_factory = sqlite3.Row` for dict-like column access."
    ],
    "prerequisites": [
      "Python basics, context managers, and relational DB intuition."
    ],
    "analogy": {
      "title": "The Legal Contract and The Fill-in-the-Blank Form",
      "text": "Concatenating strings to build a SQL query is like signing a blank check and letting a stranger write whatever numbers and clauses they want in the middle of the contract (SQL Injection: `Robert'); DROP TABLE Students;--`). A parameterized query is a legal fill-in-the-blank form: the contract structure is locked in advance, and whatever text the user writes in the blank box is treated strictly as plain text data, never as executable contract code.",
      "metaphor": "Parameterized queries separate SQL command structure from user data values."
    },
    "problemSolved": {
      "title": "Local Embedded Relational Storage Without Server Infrastructure",
      "description": "Storing structured, searchable, indexed records on disk without the overhead of running a heavy PostgreSQL or MySQL server. SQLite provides an embedded zero-configuration ACID database engine in a single file.",
      "keyPoints": [
        "Always use parameter substitution `cursor.execute(\"SELECT * FROM users WHERE id = ?\", (user_id,))`.",
        "NEVER use f-strings or string formatting (`%` or `.format()`) to insert user input into SQL strings.",
        "Connecting to `sqlite3.connect(\":memory:\")` creates a lightning-fast in-memory database ideal for unit tests.",
        "`conn.commit()` persists changes; `conn.rollback()` aborts uncommitted transactions."
      ]
    },
    "intuition": {
      "overview": "The sqlite3 module communicates with the embedded C-level SQLite engine, compiling SQL statements and stepping through B-Tree rows.",
      "steps": [
        {
          "step": 1,
          "title": "Connect",
          "description": "sqlite3.connect() opens file and initializes transaction state."
        },
        {
          "step": 2,
          "title": "Prepare & Bind",
          "description": "Engine prepares bytecode; binds parameter values safely."
        },
        {
          "step": 3,
          "title": "Fetch / Commit",
          "description": "Cursor steps through results; connection commits transaction to disk."
        }
      ]
    },
    "codeExample": {
      "title": "Safe Database CRUD and sqlite3.Row Configuration",
      "code": "import sqlite3\n\n# Using in-memory database for demonstration\nconn = sqlite3.connect(\":memory:\")\n# Enable dictionary-like column access\nconn.row_factory = sqlite3.Row\ncursor = conn.cursor()\n\n# Create table\ncursor.execute(\"\"\"\nCREATE TABLE users (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    username TEXT UNIQUE NOT NULL,\n    email TEXT NOT NULL,\n    credits REAL DEFAULT 0.0\n);\n\"\"\")\n\n# Safe parameterized insertion\nusers_data = [\n    (\"alice\", \"alice@example.com\", 50.0),\n    (\"bob\", \"bob@example.com\", 25.0)\n]\ncursor.executemany(\"INSERT INTO users (username, email, credits) VALUES (?, ?, ?);\", users_data)\nconn.commit()\n\n# Safe parameterized query\ncursor.execute(\"SELECT * FROM users WHERE credits >= ? ORDER BY credits DESC;\", (30.0,))\nrows = cursor.fetchall()\n\nfor row in rows:\n    # sqlite3.Row allows column name access\n    print(f\"User: {row['username']}, Credits: ${row['credits']}\")\n\nconn.close()",
      "explanation": "Demonstrates creating tables, executemany insertion, safe parameterized queries with ?, and row_factory = sqlite3.Row."
    },
    "runnableCode": {
      "code": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nc = conn.cursor()\nc.execute(\"CREATE TABLE items (name TEXT, qty INT);\")\nc.execute(\"INSERT INTO items VALUES (?, ?);\", (\"Widget\", 10))\nconn.commit()\n\nc.execute(\"SELECT qty FROM items WHERE name = ?;\", (\"Widget\",))\nresult = c.fetchone()\nprint(\"Retrieved Quantity:\", result[0])\nconn.close()",
      "expectedOutput": "Retrieved Quantity: 10"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "conn = sqlite3.connect(\":memory:\")",
        "codeSnippet": "conn = sqlite3.connect(\":memory:\")",
        "explanation": "Creates temporary in-memory database."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "c.execute(\"INSERT INTO items VALUES (?, ?);\", (\"Widget\", 10))",
        "codeSnippet": "c.execute(\"INSERT INTO items VALUES (?, ?);\", (\"Widget\", 10))",
        "explanation": "Safely binds values via ? placeholder tuple."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "c.execute(\"SELECT qty FROM items WHERE name = ?;\", (\"Widget\",))",
        "codeSnippet": "c.execute(\"SELECT qty FROM items WHERE name = ?;\", (\"Widget\",))",
        "explanation": "Parameterized query preventing injection."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "result = c.fetchone()",
        "codeSnippet": "result = c.fetchone()",
        "explanation": "Fetches single row tuple from cursor."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using f-strings to inject variables into SQL: `f\"SELECT * FROM users WHERE name = '{user_input}'\"`.",
        "solution": "Always use parameterized placeholders: `execute(\"SELECT * FROM users WHERE name = ?\", (user_input,))`.",
        "whyWrong": "Enables SQL Injection attacks (e.g. user_input = \"' OR '1'='1\"), allowing attackers to dump or erase the entire database.",
        "howToFix": "Always use parameterized placeholders: `execute(\"SELECT * FROM users WHERE name = ?\", (user_input,))`."
      },
      {
        "mistake": "Passing a single item to a parameterized query without making it a tuple: `cursor.execute(sql, user_id)`.",
        "solution": "Wrap in a single-element tuple with a comma: `(user_id,)`.",
        "whyWrong": "The second argument must be a sequence; if user_id is a string, it iterates every character as a separate parameter.",
        "howToFix": "Wrap in a single-element tuple with a comma: `(user_id,)`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Mobile / Desktop Applications",
        "description": "SQLite powers local data persistence in iOS/Android apps, browsers, and desktop tools."
      },
      {
        "title": "Automated Test Suites",
        "description": "Running unit tests against `:memory:` SQLite databases for millisecond execution."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-practical-sqlite-pq1",
        "question": "What placeholder symbol is used for parameterized queries in Python's `sqlite3` module?",
        "hint": "Punctuation mark.",
        "answer": "The question mark `?`."
      },
      {
        "id": "py-practical-sqlite-pq2",
        "question": "How can you access columns by name instead of integer indices in `sqlite3` results?",
        "hint": "Row factory configuration.",
        "answer": "By setting `conn.row_factory = sqlite3.Row`."
      },
      {
        "id": "py-practical-sqlite-pq3",
        "question": "What special database name creates an in-memory SQLite database?",
        "hint": "Colon string.",
        "answer": "`\":memory:\"`."
      }
    ],
    "quiz": [
      {
        "id": "py-practical-sqlite-q1",
        "question": "Which method should you use to insert multiple rows efficiently in sqlite3?",
        "options": [
          "cursor.execute_all()",
          "cursor.executemany()",
          "cursor.insert_batch()",
          "cursor.batch()"
        ],
        "correctIndex": 1,
        "explanation": "`cursor.executemany(sql, seq_of_params)` prepares the statement once and executes it across all parameter rows."
      },
      {
        "id": "py-practical-sqlite-q2",
        "question": "Why is `execute(f\"SELECT * FROM items WHERE id = {item_id}\")` dangerous?",
        "options": [
          "It causes memory fragmentation",
          "It introduces severe SQL Injection security vulnerabilities",
          "SQLite does not support f-strings",
          "It is slower to compile"
        ],
        "correctIndex": 1,
        "explanation": "String formatting user input into SQL allows attackers to execute arbitrary SQL commands."
      },
      {
        "id": "py-practical-sqlite-q3",
        "question": "What happens to uncommitted database changes if a transaction encounters an exception inside `with conn:`?",
        "options": [
          "Changes are automatically committed",
          "The connection rolls back the transaction automatically",
          "The database file is deleted",
          "It raises SyntaxError"
        ],
        "correctIndex": 1,
        "explanation": "Using `with conn:` as a context manager automatically executes `rollback()` on exceptions and `commit()` on success."
      }
    ],
    "codingChallenge": {
      "title": "Initialize and Query SQLite Memory DB",
      "problem": "Write a function `init_and_query(records: list[tuple[str, int]]) -> list[str]` that creates an in-memory SQLite database with table `inventory (name TEXT, count INT)`, inserts all `records` via `executemany`, queries for items where `count > 5` ordered alphabetically by name, and returns a list of matching names.",
      "hints": [
        "connect to \":memory:\".",
        "execute CREATE TABLE inventory (name TEXT, count INT).",
        "executemany INSERT INTO inventory VALUES (?, ?).",
        "execute SELECT name FROM inventory WHERE count > 5 ORDER BY name ASC.",
        "return [row[0] for row in cursor.fetchall()]."
      ],
      "starterCode": "import sqlite3\n\ndef init_and_query(records: list[tuple[str, int]]) -> list[str]:\n    # Write your solution here\n    pass",
      "solution": "import sqlite3\n\ndef init_and_query(records: list[tuple[str, int]]) -> list[str]:\n    conn = sqlite3.connect(\":memory:\")\n    c = conn.cursor()\n    c.execute(\"CREATE TABLE inventory (name TEXT, count INT);\")\n    c.executemany(\"INSERT INTO inventory VALUES (?, ?);\", records)\n    conn.commit()\n    c.execute(\"SELECT name FROM inventory WHERE count > 5 ORDER BY name ASC;\")\n    results = [row[0] for row in c.fetchall()]\n    conn.close()\n    return results",
      "testCases": [
        {
          "input": "[(\"apple\", 10), (\"banana\", 2), (\"cherry\", 8)]",
          "expectedOutput": "[\"apple\", \"cherry\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "conn = sqlite3.connect(\":memory:\")",
        "codeSnippet": "conn = sqlite3.connect(\":memory:\")",
        "explanation": "Creates temporary in-memory database."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "c.execute(\"INSERT INTO items VALUES (?, ?);\", (\"Widget\", 10))",
        "codeSnippet": "c.execute(\"INSERT INTO items VALUES (?, ?);\", (\"Widget\", 10))",
        "explanation": "Safely binds values via ? placeholder tuple."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "c.execute(\"SELECT qty FROM items WHERE name = ?;\", (\"Widget\",))",
        "codeSnippet": "c.execute(\"SELECT qty FROM items WHERE name = ?;\", (\"Widget\",))",
        "explanation": "Parameterized query preventing injection."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "result = c.fetchone()",
        "codeSnippet": "result = c.fetchone()",
        "explanation": "Fetches single row tuple from cursor."
      }
    ],
    "applications": [
      {
        "industry": "Mobile / Desktop Applications",
        "application": "SQLite powers local data persistence in iOS/Android apps, browsers, and desktop tools.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Mobile / Desktop Applications",
        "description": "SQLite powers local data persistence in iOS/Android apps, browsers, and desktop tools."
      },
      {
        "industry": "Automated Test Suites",
        "application": "Running unit tests against `:memory:` SQLite databases for millisecond execution.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Automated Test Suites",
        "description": "Running unit tests against `:memory:` SQLite databases for millisecond execution."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Connect to SQLite databases and execute CRUD operations using standard library `sqlite3`.",
        "Prevent SQL Injection vulnerabilities by strictly using parameterized queries (`?` placeholders).",
        "Manage database transactions with automatic commit and rollback using connection context managers."
      ]
    }
  },
  "py-practical-debugging": {
    "id": "py-practical-debugging",
    "moduleId": "python-module-10",
    "title": "Advanced Debugging Techniques",
    "subtitle": "breakpoint(), pdb Interactive Shell, Post-Mortem Analysis, and Trace Inspection",
    "order": 5,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Use Python 3.7+ built-in `breakpoint()` to drop into interactive debugging sessions.",
      "Master core `pdb` commands: `n` (next), `s` (step), `c` (continue), `p` (print), `w` (where/stack trace), `q` (quit).",
      "Perform post-mortem debugging on crashed processes using `pdb.pm()` or `python -m pdb -c continue script.py`.",
      "Inspect live stack frames and execution namespaces dynamically."
    ],
    "prerequisites": [
      "Python functions, exceptions, and execution frames."
    ],
    "analogy": {
      "title": "The Time-Freezing Holodeck Debugger",
      "text": "Debugging with `print()` statements is like trying to investigate a bank robbery by looking at scattered Polaroid photos taken after the robbers fled. Using `breakpoint()` is walking into the bank and freezing physical time mid-robbery: you can walk around the frozen robbers, measure the height of the vault door, inspect what is in their pockets (variables), step time forward by one single millisecond (`n`), and watch how the gears turn.",
      "metaphor": "pdb freezes runtime execution to allow live inspection and stepping."
    },
    "problemSolved": {
      "title": "Resolving Elusive Bugs Without Guesswork Print Statements",
      "description": "When bugs only manifest inside complex nested loops or edge cases, adding dozens of `print()` statements clutters source code and requires restarting the program. Interactive debuggers let you step through live code directly.",
      "keyPoints": [
        "In Python 3.7+, `breakpoint()` is built-in; it defaults to calling `import pdb; pdb.set_trace()`.",
        "The environment variable `PYTHONBREAKPOINT=0` disables all breakpoints globally without code edits.",
        "Post-mortem debugging inspects the exact state of variables at the moment of an unhandled crash."
      ]
    },
    "intuition": {
      "overview": "The debugger registers a trace callback function (`sys.settrace`) that the CPython interpreter invokes before evaluating each line of bytecode.",
      "steps": [
        {
          "step": 1,
          "title": "Breakpoint Encounter",
          "description": "When execution hits breakpoint(), sys.settrace triggers interactive shell."
        },
        {
          "step": 2,
          "title": "Step / Inspect",
          "description": "Developer queries locals() and navigates call stack frames."
        },
        {
          "step": 3,
          "title": "Resume",
          "description": "Commands like continue (c) release stepping until the next breakpoint."
        }
      ]
    },
    "codeExample": {
      "title": "Core pdb Command Reference and breakpoint() Usage",
      "code": "def calculate_average(grades: list[float]) -> float:\n    total = sum(grades)\n    # breakpoint()  # Drops into interactive PDB prompt when uncommented\n    count = len(grades)\n    return total / count\n\n# Essential PDB Commands:\n# n (next)     : Execute current line, stay in current function\n# s (step)     : Step INTO called function\n# c (continue) : Resume execution until next breakpoint\n# p <expr>     : Evaluate and print expression\n# pp <expr>    : Pretty-print expression\n# w (where)    : Print current stack trace showing call hierarchy\n# u (up)       : Move up one frame in call stack (to caller)\n# d (down)     : Move down one frame in call stack\n# q (quit)     : Abort execution immediately",
      "explanation": "Reviews essential pdb navigation commands and the built-in breakpoint() hook."
    },
    "runnableCode": {
      "code": "import traceback\n\ndef inner_failing_function():\n    raise ValueError(\"Something went terribly wrong inside worker!\")\n\ndef outer_wrapper():\n    inner_failing_function()\n\ntry:\n    outer_wrapper()\nexcept ValueError:\n    # Programmatic stack trace inspection\n    print(\"Formatted Stack Trace:\")\n    traceback.print_exc(limit=2)",
      "expectedOutput": "Formatted Stack Trace:"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "    raise ValueError(...)",
        "codeSnippet": "    raise ValueError(...)",
        "explanation": "Raises exception deep in call stack."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "    traceback.print_exc(limit=2)",
        "codeSnippet": "    traceback.print_exc(limit=2)",
        "explanation": "Formats and prints call stack frames programmatically."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Leaving `breakpoint()` or `pdb.set_trace()` calls in production code deployed to live servers.",
        "solution": "Ensure CI/CD linter checks block `breakpoint()` or set `PYTHONBREAKPOINT=0` in production environments.",
        "whyWrong": "The server hangs indefinitely waiting for keyboard input on standard input that will never arrive.",
        "howToFix": "Ensure CI/CD linter checks block `breakpoint()` or set `PYTHONBREAKPOINT=0` in production environments."
      },
      {
        "mistake": "Confusing `n` (next) with `s` (step into).",
        "solution": "Use `n` to step over standard library calls, and `s` only when you want to step into your own functions.",
        "whyWrong": "Pressing `s` steps into standard library functions (like `json.loads` or `sum`), cluttering inspection.",
        "howToFix": "Use `n` to step over standard library calls, and `s` only when you want to step into your own functions."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Post-Mortem Crash Analysis",
        "description": "Dropping into `pdb.pm()` after an automated test suite crash to inspect the exact failing state."
      },
      {
        "title": "Complex Recursive Debugging",
        "description": "Stepping through recursive tree traversals to spot infinite loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-practical-debugging-pq1",
        "question": "What built-in function was introduced in Python 3.7 to trigger the interactive debugger?",
        "hint": "Built-in name.",
        "answer": "`breakpoint()`."
      },
      {
        "id": "py-practical-debugging-pq2",
        "question": "How can you disable all `breakpoint()` calls across an entire application without editing code?",
        "hint": "Environment variable.",
        "answer": "Set the environment variable `PYTHONBREAKPOINT=0`."
      },
      {
        "id": "py-practical-debugging-pq3",
        "question": "What pdb command displays the full call stack trace?",
        "hint": "Single letter command.",
        "answer": "`w` (for \"where\")."
      }
    ],
    "quiz": [
      {
        "id": "py-practical-debugging-q1",
        "question": "Which pdb command steps INTO a function call on the current line?",
        "options": [
          "n (next)",
          "s (step)",
          "c (continue)",
          "r (return)"
        ],
        "correctIndex": 1,
        "explanation": "`s` (step) steps into the called function, while `n` (next) steps over it."
      },
      {
        "id": "py-practical-debugging-q2",
        "question": "What does the pdb command `c` do?",
        "options": [
          "Clears all variables",
          "Continues program execution until the next breakpoint or termination",
          "Compiles the file",
          "Copies the frame"
        ],
        "correctIndex": 1,
        "explanation": "`c` (continue) resumes normal execution until another breakpoint is hit."
      },
      {
        "id": "py-practical-debugging-q3",
        "question": "What is \"post-mortem\" debugging in Python?",
        "options": [
          "Debugging a program after it has crashed with an unhandled exception using its traceback state",
          "Debugging dead code",
          "Running unit tests after deployment",
          "Profiling CPU usage"
        ],
        "correctIndex": 0,
        "explanation": "Post-mortem debugging inspects the call stack and local variables at the exact moment of an unhandled exception."
      }
    ],
    "codingChallenge": {
      "title": "Simulate Debug Command Parser",
      "problem": "Write a function `parse_debug_command(cmd: str) -> str` that maps single-letter pdb commands to descriptive strings: `\"n\"` -> `\"next\"`, `\"s\"` -> `\"step\"`, `\"c\"` -> `\"continue\"`, `\"w\"` -> `\"where\"`, `\"q\"` -> `\"quit\"`. Return `\"unknown\"` for any other input (strip whitespace, case-insensitive).",
      "hints": [
        "Clean cmd: cleaned = cmd.strip().lower().",
        "Use a dictionary mapping: {\"n\": \"next\", \"s\": \"step\", \"c\": \"continue\", \"w\": \"where\", \"q\": \"quit\"}.",
        "Return mapping.get(cleaned, \"unknown\")."
      ],
      "starterCode": "def parse_debug_command(cmd: str) -> str:\n    # Write your solution here\n    pass",
      "solution": "def parse_debug_command(cmd: str) -> str:\n    mapping = {\"n\": \"next\", \"s\": \"step\", \"c\": \"continue\", \"w\": \"where\", \"q\": \"quit\"}\n    return mapping.get(cmd.strip().lower(), \"unknown\")",
      "testCases": [
        {
          "input": "\"n\"",
          "expectedOutput": "\"next\""
        },
        {
          "input": "\"  S  \"",
          "expectedOutput": "\"step\""
        },
        {
          "input": "\"x\"",
          "expectedOutput": "\"unknown\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "    raise ValueError(...)",
        "codeSnippet": "    raise ValueError(...)",
        "explanation": "Raises exception deep in call stack."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "    traceback.print_exc(limit=2)",
        "codeSnippet": "    traceback.print_exc(limit=2)",
        "explanation": "Formats and prints call stack frames programmatically."
      }
    ],
    "applications": [
      {
        "industry": "Post-Mortem Crash Analysis",
        "application": "Dropping into `pdb.pm()` after an automated test suite crash to inspect the exact failing state.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Post-Mortem Crash Analysis",
        "description": "Dropping into `pdb.pm()` after an automated test suite crash to inspect the exact failing state."
      },
      {
        "industry": "Complex Recursive Debugging",
        "application": "Stepping through recursive tree traversals to spot infinite loops.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Complex Recursive Debugging",
        "description": "Stepping through recursive tree traversals to spot infinite loops."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Use Python 3.7+ built-in `breakpoint()` to drop into interactive debugging sessions.",
        "Master core `pdb` commands: `n` (next), `s` (step), `c` (continue), `p` (print), `w` (where/stack trace), `q` (quit).",
        "Perform post-mortem debugging on crashed processes using `pdb.pm()` or `python -m pdb -c continue script.py`."
      ]
    }
  },
  "py-practical-clean-code": {
    "id": "py-practical-clean-code",
    "moduleId": "python-module-10",
    "title": "Clean Code and Project Structure",
    "subtitle": "PEP 8 Style, Black Formatter, SOLID Principles, and Standard Project Layouts",
    "order": 6,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Adhere to PEP 8 style guide conventions: naming rules, line lengths, and import orders.",
      "Automate formatting and linting using `black`, `ruff`, and `flake8`.",
      "Structure professional Python codebases using the `src/` layout pattern.",
      "Apply SOLID design principles (Single Responsibility, Open/Closed, Dependency Inversion) to Pythonic code."
    ],
    "prerequisites": [
      "Python functions, classes, and packages."
    ],
    "analogy": {
      "title": "The Modern Architecture Building Code and Construction Standard",
      "text": "A shantytown shack has wires taped to pipes, doors that open inward into sinks, and no labeling on electrical panels (messy code). It might stand for a week, but no plumber can service it without risking electrocution. Professional building standards (Clean Code / PEP 8) mandate standardized conduit runs, color-coded wires, clear room blueprints, and fire exits. Anyone on the construction crew can walk in and immediately understand where everything belongs.",
      "metaphor": "Clean code and standard project layouts ensure codebases are maintainable and readable."
    },
    "problemSolved": {
      "title": "Maintainability and Readability at Scale",
      "description": "Guido van Rossum famously stated: \"Code is read much more often than it is written.\" Clean code conventions eliminate cognitive friction during code reviews and onboarding.",
      "keyPoints": [
        "PEP 8 naming: `snake_case` for functions/variables, `PascalCase` for classes, `UPPER_SNAKE` for constants.",
        "Import grouping: 1. Standard library; 2. Third-party packages; 3. Local application imports (separated by blank lines).",
        "The `src/` layout prevents accidental import of uninstalled development code over installed wheels.",
        "`ruff` and `black` automate code formatting and linting instantly."
      ]
    },
    "intuition": {
      "overview": "Clean architecture organizes code by separation of concerns: domain logic is decoupled from transport layers (HTTP/CLI) and storage layers (DB).",
      "steps": [
        {
          "step": 1,
          "title": "Single Responsibility",
          "description": "Each function or class does exactly ONE thing well."
        },
        {
          "step": 2,
          "title": "Standard Structure",
          "description": "src/<package>/ layout with clear subpackages (models, services, api)."
        },
        {
          "step": 3,
          "title": "Automated Enforcement",
          "description": "Pre-commit hooks run ruff and black before code can be committed."
        }
      ]
    },
    "codeExample": {
      "title": "Standard Python Project Layout and PEP 8 Formatting",
      "code": "# Standard Recommended Project Layout:\n# my_project/\n# ├── pyproject.toml\n# ├── README.md\n# ├── .gitignore\n# ├── src/\n# │   └── my_package/\n# │       ├── __init__.py\n# │       ├── models.py\n# │       ├── services.py\n# │       └── utils.py\n# └── tests/\n#     ├── conftest.py\n#     └── test_services.py\n\n# PEP 8 Compliant Python Code:\nimport os\nimport sys\nfrom typing import Final\n\nimport requests  # Third-party\n\nfrom my_package.models import User  # Local\n\nMAX_RETRIES: Final[int] = 3\n\nclass UserService:\n    \"\"\"Manages user domain operations.\"\"\"\n    def __init__(self, base_url: str):\n        self.base_url = base_url\n\n    def find_user_by_id(self, user_id: int) -> User | None:\n        \"\"\"Fetch user by primary key.\"\"\"\n        return None",
      "explanation": "Demonstrates standard src/ project structure, PEP 8 import grouping, and naming conventions."
    },
    "runnableCode": {
      "code": "# Demonstrating Single Responsibility Principle\nclass UserValidator:\n    @staticmethod\n    def is_valid_email(email: str) -> bool:\n        return \"@\" in email and \".\" in email\n\nclass UserNotifier:\n    @staticmethod\n    def send_welcome(email: str):\n        print(f\"Dispatched welcome email to: {email}\")\n\n# Composed cleanly\nemail = \"learner@example.com\"\nif UserValidator.is_valid_email(email):\n    UserNotifier.send_welcome(email)",
      "expectedOutput": "Dispatched welcome email to: learner@example.com"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "class UserValidator:",
        "codeSnippet": "class UserValidator:",
        "explanation": "Single responsibility: validation only."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "class UserNotifier:",
        "codeSnippet": "class UserNotifier:",
        "explanation": "Single responsibility: notification dispatch only."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "if UserValidator.is_valid_email(email):",
        "codeSnippet": "if UserValidator.is_valid_email(email):",
        "explanation": "Components are decoupled, highly testable, and reusable."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Putting all code in the project root directory alongside configuration files.",
        "solution": "Use the standard `src/` layout: `src/my_package/`.",
        "whyWrong": "Root imports can mask missing package installations and cause test runner confusion.",
        "howToFix": "Use the standard `src/` layout: `src/my_package/`."
      },
      {
        "mistake": "Writing massive 300-line \"god functions\" that parse JSON, validate data, insert into SQL, and send emails.",
        "solution": "Decompose into small, focused, pure helper functions.",
        "whyWrong": "Violates Single Responsibility Principle; impossible to test individual steps.",
        "howToFix": "Decompose into small, focused, pure helper functions."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Open-Source Projects",
        "description": "Standardized formatting allowing hundreds of contributors to collaborate without style flame wars."
      },
      {
        "title": "CI/CD Automated Gateways",
        "description": "Blocking git pull requests if formatting or lint checks fail."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-practical-clean-code-pq1",
        "question": "What is the official Python style guide document called?",
        "hint": "PEP number.",
        "answer": "PEP 8."
      },
      {
        "id": "py-practical-clean-code-pq2",
        "question": "What is the PEP 8 naming convention for class names versus function names?",
        "hint": "Casing styles.",
        "answer": "Classes use `PascalCase` (CapWords); functions use `snake_case`."
      },
      {
        "id": "py-practical-clean-code-pq3",
        "question": "What is the advantage of using a `src/` layout for Python projects?",
        "hint": "Import isolation.",
        "answer": "It prevents tests and scripts from accidentally importing the raw development directory instead of the properly installed package."
      }
    ],
    "quiz": [
      {
        "id": "py-practical-clean-code-q1",
        "question": "In PEP 8, how should imports be grouped and ordered?",
        "options": [
          "Alphabetical only",
          "1. Standard library, 2. Third-party, 3. Local imports (separated by blank lines)",
          "Random order",
          "Local imports first"
        ],
        "correctIndex": 1,
        "explanation": "PEP 8 specifies grouping imports into standard library, third-party, and local, separated by a blank line."
      },
      {
        "id": "py-practical-clean-code-q2",
        "question": "Which tool is known as \"the uncompromising Python code formatter\"?",
        "options": [
          "black",
          "pylint",
          "pytest",
          "pipenv"
        ],
        "correctIndex": 0,
        "explanation": "`black` is the widely used deterministic code formatter."
      },
      {
        "id": "py-practical-clean-code-q3",
        "question": "What does the Single Responsibility Principle (SRP) dictate?",
        "options": [
          "A function should only have one parameter",
          "A class or function should have one, and only one, reason to change",
          "A project can only have one file",
          "All methods must return single values"
        ],
        "correctIndex": 1,
        "explanation": "SRP states that a software component should have one focused responsibility and one reason to change."
      }
    ],
    "codingChallenge": {
      "title": "Validate PEP 8 Identifier Casing",
      "problem": "Write a function `is_snake_case(identifier: str) -> bool` that returns `True` if `identifier` is valid lowercase `snake_case` (consists only of lowercase letters, digits, and underscores, does NOT start or end with an underscore, and has no consecutive underscores), otherwise `False`.",
      "hints": [
        "Check if not identifier or identifier.startswith(\"_\") or identifier.endswith(\"_\"): return False.",
        "Check if \"__\" in identifier: return False.",
        "Check all chars are lowercase alphanumeric or \"_\"."
      ],
      "starterCode": "def is_snake_case(identifier: str) -> bool:\n    # Write your solution here\n    pass",
      "solution": "def is_snake_case(identifier: str) -> bool:\n    if not identifier or identifier.startswith(\"_\") or identifier.endswith(\"_\"):\n        return False\n    if \"__\" in identifier:\n        return False\n    return all(c.islower() or c.isdigit() or c == \"_\" for c in identifier)",
      "testCases": [
        {
          "input": "\"calculate_total_price\"",
          "expectedOutput": "True"
        },
        {
          "input": "\"CalculateTotal\"",
          "expectedOutput": "False"
        },
        {
          "input": "\"_private_var\"",
          "expectedOutput": "False"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "class UserValidator:",
        "codeSnippet": "class UserValidator:",
        "explanation": "Single responsibility: validation only."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "class UserNotifier:",
        "codeSnippet": "class UserNotifier:",
        "explanation": "Single responsibility: notification dispatch only."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "if UserValidator.is_valid_email(email):",
        "codeSnippet": "if UserValidator.is_valid_email(email):",
        "explanation": "Components are decoupled, highly testable, and reusable."
      }
    ],
    "applications": [
      {
        "industry": "Open-Source Projects",
        "application": "Standardized formatting allowing hundreds of contributors to collaborate without style flame wars.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Open-Source Projects",
        "description": "Standardized formatting allowing hundreds of contributors to collaborate without style flame wars."
      },
      {
        "industry": "CI/CD Automated Gateways",
        "application": "Blocking git pull requests if formatting or lint checks fail.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "CI/CD Automated Gateways",
        "description": "Blocking git pull requests if formatting or lint checks fail."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Adhere to PEP 8 style guide conventions: naming rules, line lengths, and import orders.",
        "Automate formatting and linting using `black`, `ruff`, and `flake8`.",
        "Structure professional Python codebases using the `src/` layout pattern."
      ]
    }
  },
  "py-practical-git": {
    "id": "py-practical-git",
    "moduleId": "python-module-10",
    "title": "Git Fundamentals for Python Projects",
    "subtitle": "init, branch, commit, merge, Essential Python .gitignore, and Clean Version Control",
    "order": 7,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Initialize, stage, commit, branch, and merge Git repositories for Python projects.",
      "Configure comprehensive `.gitignore` files for Python (excluding `__pycache__`, `.venv`, `.pytest_cache`, `.env`).",
      "Write clean, standardized conventional commit messages (`feat:`, `fix:`, `refactor:`, `docs:`).",
      "Manage feature branch workflows and resolve basic merge conflicts."
    ],
    "prerequisites": [
      "Basic command line usage."
    ],
    "analogy": {
      "title": "The Video Game Checkpoint System and Multiverse Timelines",
      "text": "Working without Git is playing a brutal 100-hour video game with zero save slots: one mistake, and your save file is corrupted forever. Git commits are permanent checkpoints: you can experiment, fail, and instantly reload any checkpoint from yesterday. Git branches are alternate multiverse timelines: you create a portal (`feature-branch`), defeat a boss, and merge that timeline back into the main universe (`main`) once it is verified safe.",
      "metaphor": "Git tracks history as a directed acyclic graph of immutable content snapshots."
    },
    "problemSolved": {
      "title": "Collaborative Version Control and Reversible Experimentation",
      "description": "Without version control, developers resort to terrible naming conventions like `script_v2_final_FINAL_edit.py`. Git provides distributed, atomic, cryptographic tracking of all code revisions.",
      "keyPoints": [
        "`git init` initializes a new repository in `.git/`.",
        "The staging area (`git add`) allows composing atomic, intentional commits.",
        "A `.gitignore` file stops compiled bytecode, temporary caches, and local secrets from polluting git history."
      ]
    },
    "intuition": {
      "overview": "Git models projects as a tree of cryptographic SHA-1/SHA-256 commit snapshots pointing to parent commits.",
      "steps": [
        {
          "step": 1,
          "title": "Modify",
          "description": "Edit code in the working directory."
        },
        {
          "step": 2,
          "title": "Stage",
          "description": "git add stages specific diffs into the index."
        },
        {
          "step": 3,
          "title": "Commit",
          "description": "git commit creates an immutable snapshot with author, timestamp, and message."
        }
      ]
    },
    "codeExample": {
      "title": "Essential Python .gitignore Template and CLI Workflow",
      "code": "# Standard Python .gitignore rules:\n# __pycache__/\n# *.py[cod]\n# *$py.class\n# .venv/\n# venv/\n# .env\n# .pytest_cache/\n# .mypy_cache/\n# dist/\n# build/\n# *.egg-info/\n\n# Standard Git Branching Commands:\n# git checkout -b feature/user-auth    # Create and switch to new branch\n# git add src/ tests/                  # Stage specific directories\n# git commit -m \"feat: add JWT auth\"   # Conventional commit\n# git checkout main                    # Switch back to main\n# git merge feature/user-auth          # Merge feature branch",
      "explanation": "Reviews essential Python .gitignore rules and basic git branch-commit-merge commands."
    },
    "runnableCode": {
      "code": "# Simulating a git commit message validator\ndef validate_commit_msg(msg: str) -> bool:\n    valid_prefixes = (\"feat:\", \"fix:\", \"docs:\", \"style:\", \"refactor:\", \"test:\", \"chore:\")\n    return any(msg.strip().startswith(p) for p in valid_prefixes)\n\nprint(\"feat: add login endpoint ->\", validate_commit_msg(\"feat: add login endpoint\"))\nprint(\"updated stuff ->\", validate_commit_msg(\"updated stuff\"))",
      "expectedOutput": "feat: add login endpoint -> True\nupdated stuff -> False"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "valid_prefixes = (\"feat:\", \"fix:\", ...)",
        "codeSnippet": "valid_prefixes = (\"feat:\", \"fix:\", ...)",
        "explanation": "Conventional Commits specification prefixes."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "return any(...)",
        "codeSnippet": "return any(...)",
        "explanation": "Validates that commit messages follow structured taxonomy."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Committing `__pycache__` or `.venv/` to git.",
        "solution": "Create a `.gitignore` file before running your very first `git add`.",
        "whyWrong": "Bloats repository size, creates massive diff noise, and can cause cross-platform execution issues.",
        "howToFix": "Create a `.gitignore` file before running your very first `git add`."
      },
      {
        "mistake": "Writing vague commit messages like \"fixes\" or \"updates\".",
        "solution": "Use Conventional Commits: `fix: handle ZeroDivisionError in average calculation`.",
        "whyWrong": "Makes `git log` and `git bisect` useless for debugging regressions months later.",
        "howToFix": "Use Conventional Commits: `fix: handle ZeroDivisionError in average calculation`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Pull Request Code Reviews",
        "description": "Reviewing isolated feature branch diffs on GitHub/GitLab before merging to main."
      },
      {
        "title": "git bisect Regression Pinpointing",
        "description": "Binary-searching git commit history to find the exact commit that introduced a bug."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-practical-git-pq1",
        "question": "What file instructs Git to ignore temporary files, virtual environments, and secrets?",
        "hint": "Dot filename.",
        "answer": "`.gitignore`."
      },
      {
        "id": "py-practical-git-pq2",
        "question": "What command creates and switches to a new branch in Git?",
        "hint": "Checkout or switch.",
        "answer": "`git checkout -b <branch_name>` or `git switch -c <branch_name>`."
      },
      {
        "id": "py-practical-git-pq3",
        "question": "What command shows the working tree status and staged changes?",
        "hint": "Status command.",
        "answer": "`git status`."
      }
    ],
    "quiz": [
      {
        "id": "py-practical-git-q1",
        "question": "Which of the following directories should ALMOST ALWAYS be in a Python `.gitignore`?",
        "options": [
          "src/",
          "tests/",
          "__pycache__/",
          "docs/"
        ],
        "correctIndex": 2,
        "explanation": "`__pycache__/` contains compiled bytecode files and should never be tracked in version control."
      },
      {
        "id": "py-practical-git-q2",
        "question": "What is the purpose of the Git staging area (the index)?",
        "options": [
          "To compile Python code",
          "To craft and review atomic commits before saving them to history",
          "To push code to GitHub automatically",
          "To delete untracked files"
        ],
        "correctIndex": 1,
        "explanation": "The staging area allows selectively grouping related changes into atomic commits."
      },
      {
        "id": "py-practical-git-q3",
        "question": "In the Conventional Commits specification, what prefix indicates a bug fix?",
        "options": [
          "bug:",
          "fix:",
          "patch:",
          "hotfix:"
        ],
        "correctIndex": 1,
        "explanation": "The `fix:` prefix indicates a bug fix in Conventional Commits."
      }
    ],
    "codingChallenge": {
      "title": "Filter Git Ignored Files",
      "problem": "Write a function `filter_ignored_files(filenames: list[str], ignore_extensions: list[str]) -> list[str]` that returns only filenames that do NOT end with any of the extensions listed in `ignore_extensions` (case-insensitive).",
      "hints": [
        "Normalize ignore_extensions to lowercase: tuple(ext.lower() for ext in ignore_extensions).",
        "Filter f for f in filenames if not f.lower().endswith(tuple_of_exts)."
      ],
      "starterCode": "def filter_ignored_files(filenames: list[str], ignore_extensions: list[str]) -> list[str]:\n    # Write your solution here\n    pass",
      "solution": "def filter_ignored_files(filenames: list[str], ignore_extensions: list[str]) -> list[str]:\n    exts = tuple(ext.lower() for ext in ignore_extensions)\n    return [f for f in filenames if not f.lower().endswith(exts)]",
      "testCases": [
        {
          "input": "[\"app.py\", \"app.pyc\", \"notes.txt\", \"data.pyo\"], [\".pyc\", \".pyo\"]",
          "expectedOutput": "[\"app.py\", \"notes.txt\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "valid_prefixes = (\"feat:\", \"fix:\", ...)",
        "codeSnippet": "valid_prefixes = (\"feat:\", \"fix:\", ...)",
        "explanation": "Conventional Commits specification prefixes."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "return any(...)",
        "codeSnippet": "return any(...)",
        "explanation": "Validates that commit messages follow structured taxonomy."
      }
    ],
    "applications": [
      {
        "industry": "Pull Request Code Reviews",
        "application": "Reviewing isolated feature branch diffs on GitHub/GitLab before merging to main.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Pull Request Code Reviews",
        "description": "Reviewing isolated feature branch diffs on GitHub/GitLab before merging to main."
      },
      {
        "industry": "git bisect Regression Pinpointing",
        "application": "Binary-searching git commit history to find the exact commit that introduced a bug.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "git bisect Regression Pinpointing",
        "description": "Binary-searching git commit history to find the exact commit that introduced a bug."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Initialize, stage, commit, branch, and merge Git repositories for Python projects.",
        "Configure comprehensive `.gitignore` files for Python (excluding `__pycache__`, `.venv`, `.pytest_cache`, `.env`).",
        "Write clean, standardized conventional commit messages (`feat:`, `fix:`, `refactor:`, `docs:`)."
      ]
    }
  },
  "py-practical-packaging": {
    "id": "py-practical-packaging",
    "moduleId": "python-module-10",
    "title": "Packaging and Distribution",
    "subtitle": "pyproject.toml, Modern Build Backends (Hatch/Flit/Setuptools), Wheels, and PyPI",
    "order": 8,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Configure modern Python packaging using PEP 518/621 `pyproject.toml` standards.",
      "Understand build backends (setuptools, flit, hatchling, poetry).",
      "Build distribution packages: Source Distributions (`sdist`, `.tar.gz`) and Built Distributions (Wheels, `.whl`).",
      "Follow Semantic Versioning (MAJOR.MINOR.PATCH) and understand publishing workflows with twine."
    ],
    "prerequisites": [
      "Python modules, packages, and virtual environments."
    ],
    "analogy": {
      "title": "The Manufacturing Shipping Carton and Commercial Pallet",
      "text": "Developing a module in your local folder is like hand-crafting a wooden chair in your home garage. Packaging is taking that chair, disassembling it into flat-pack IKEA boxes with standardized assembly instructions, barcodes, and CE certification stamps (`pyproject.toml` and `.whl`). Now, any department store (PyPI) or customer anywhere on earth (`pip install your-package`) can receive the box and assemble it flawlessly in seconds.",
      "metaphor": "pyproject.toml defines standardized metadata; wheels deliver pre-built distributable packages."
    },
    "problemSolved": {
      "title": "Universal, Reproducible Library Distribution Across the Python Ecosystem",
      "description": "Historically, Python packaging relied on fragile, executable `setup.py` scripts that created security risks and dependency cycles. Modern `pyproject.toml` provides declarative, reproducible package definitions.",
      "keyPoints": [
        "`pyproject.toml` replaces legacy `setup.py`, `setup.cfg`, and `requirements.txt` for library authors.",
        "Wheels (`.whl`) are ZIP archives containing ready-to-install code that bypass build steps during installation.",
        "`build` (`python -m build`) produces standard `dist/*.tar.gz` and `dist/*.whl` artifacts.",
        "Semantic Versioning: `MAJOR` (breaking changes), `MINOR` (new features, backward-compatible), `PATCH` (bug fixes)."
      ]
    },
    "intuition": {
      "overview": "The modern Python packaging standard separates build frontends (`pip`, `build`) from build backends (`setuptools`, `hatchling`) via standard hooks.",
      "steps": [
        {
          "step": 1,
          "title": "Declare Metadata",
          "description": "Write name, version, dependencies, and entry-points in pyproject.toml."
        },
        {
          "step": 2,
          "title": "Build Artifacts",
          "description": "Run python -m build to create source tarball and binary wheel."
        },
        {
          "step": 3,
          "title": "Publish",
          "description": "Upload artifacts to PyPI using twine."
        }
      ]
    },
    "codeExample": {
      "title": "Modern Declarative pyproject.toml Specification",
      "code": "[build-system]\nrequires = [\"hatchling\"]\nbuild-backend = \"hatchling.build\"\n\n[project]\nname = \"my-awesome-package\"\nversion = \"1.0.0\"\ndescription = \"A production-grade Python utility library\"\nreadme = \"README.md\"\nrequires-python = \">=3.10\"\nlicense = { text = \"MIT\" }\nauthors = [\n    { name = \"Developer\", email = \"dev@example.com\" }\n]\ndependencies = [\n    \"requests>=2.31.0\",\n    \"pydantic>=2.0.0\"\n]\n\n[project.optional-dependencies]\ndev = [\n    \"pytest>=8.0.0\",\n    \"mypy>=1.8.0\",\n    \"ruff>=0.2.0\"\n]\n\n[project.scripts]\nmy-cli = \"my_package.cli:main\"",
      "explanation": "Demonstrates a complete PEP 621 compliant pyproject.toml including dependencies, optional dev dependencies, and CLI entry points."
    },
    "runnableCode": {
      "code": "# Parsing Semantic Version strings programmatically\ndef parse_semver(version: str) -> tuple[int, int, int]:\n    parts = version.strip().lstrip(\"v\").split(\".\")\n    if len(parts) != 3:\n        raise ValueError(\"Invalid SemVer string\")\n    return int(parts[0]), int(parts[1]), int(parts[2])\n\nv1 = parse_semver(\"1.2.3\")\nv2 = parse_semver(\"2.0.0\")\nprint(\"Parsed 1.2.3:\", v1)\nprint(\"Is v2 greater than v1?\", v2 > v1)",
      "expectedOutput": "Parsed 1.2.3: (1, 2, 3)\nIs v2 greater than v1? True"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "def parse_semver(version: str) -> tuple[int, int, int]:",
        "codeSnippet": "def parse_semver(version: str) -> tuple[int, int, int]:",
        "explanation": "Parses semantic version string into integer components."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "print(\"Is v2 greater than v1?\", v2 > v1)",
        "codeSnippet": "print(\"Is v2 greater than v1?\", v2 > v1)",
        "explanation": "Tuple comparison naturally handles semantic version comparison."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using legacy `setup.py` with executable code for new projects.",
        "solution": "Adopt PEP 518/621 `pyproject.toml` standards.",
        "whyWrong": "`setup.py` executes arbitrary code at build time and is deprecated in favor of declarative `pyproject.toml`.",
        "howToFix": "Adopt PEP 518/621 `pyproject.toml` standards."
      },
      {
        "mistake": "Distributing only source distributions (`.tar.gz`) without wheels (`.whl`).",
        "solution": "Always build and publish wheels: `python -m build`.",
        "whyWrong": "Forces end-users to build from source on every `pip install`, increasing install times and requiring compilers for C-extensions.",
        "howToFix": "Always build and publish wheels: `python -m build`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Publishing to PyPI",
        "description": "Distributing open-source Python packages to millions of developers worldwide."
      },
      {
        "title": "Internal Enterprise Package Registries",
        "description": "Publishing shared proprietary business logic to private JFrog Artifactory or AWS CodeArtifact feeds."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-practical-packaging-pq1",
        "question": "What modern configuration file replaces `setup.py` and `setup.cfg` in Python packaging?",
        "hint": "TOML file.",
        "answer": "`pyproject.toml`."
      },
      {
        "id": "py-practical-packaging-pq2",
        "question": "What is a Python Wheel (`.whl`) file?",
        "hint": "Packaging archive format.",
        "answer": "A ZIP archive with a specially crafted filename and metadata that can be installed without running build code."
      },
      {
        "id": "py-practical-packaging-pq3",
        "question": "What tool is the standard command-line utility used to upload packages securely to PyPI?",
        "hint": "Tool name.",
        "answer": "`twine` (e.g. `twine upload dist/*`)."
      }
    ],
    "quiz": [
      {
        "id": "py-practical-packaging-q1",
        "question": "Which PEP introduced `pyproject.toml` as the standard configuration file for Python builds?",
        "options": [
          "PEP 8",
          "PEP 518",
          "PEP 484",
          "PEP 257"
        ],
        "correctIndex": 1,
        "explanation": "PEP 518 (with PEP 621) established `pyproject.toml` as the declarative packaging standard."
      },
      {
        "id": "py-practical-packaging-q2",
        "question": "In Semantic Versioning (MAJOR.MINOR.PATCH), when should you increment the MAJOR version?",
        "options": [
          "When you fix a small bug",
          "When you introduce breaking, backward-incompatible API changes",
          "Every calendar month",
          "When adding new optional features"
        ],
        "correctIndex": 1,
        "explanation": "MAJOR version is incremented when incompatible API changes are made."
      },
      {
        "id": "py-practical-packaging-q3",
        "question": "What command builds both an sdist (.tar.gz) and a wheel (.whl) for a modern project?",
        "options": [
          "python setup.py install",
          "python -m build",
          "pip package",
          "twine build"
        ],
        "correctIndex": 1,
        "explanation": "`python -m build` (using the PyPA `build` tool) produces both sdist and wheel artifacts in `dist/`."
      }
    ],
    "codingChallenge": {
      "title": "Compare Semantic Version Numbers",
      "problem": "Write a function `compare_semver(v1: str, v2: str) -> int` that compares two semantic version strings (\"X.Y.Z\"). Return `1` if `v1 > v2`, `-1` if `v1 < v2`, and `0` if `v1 == v2`.",
      "hints": [
        "Parse each version into a tuple of 3 integers: tuple(map(int, v.split(\".\"))).",
        "Compare t1 > t2: return 1; t1 < t2: return -1; else return 0."
      ],
      "starterCode": "def compare_semver(v1: str, v2: str) -> int:\n    # Write your solution here\n    pass",
      "solution": "def compare_semver(v1: str, v2: str) -> int:\n    t1 = tuple(map(int, v1.split(\".\")))\n    t2 = tuple(map(int, v2.split(\".\")))\n    if t1 > t2:\n        return 1\n    elif t1 < t2:\n        return -1\n    return 0",
      "testCases": [
        {
          "input": "\"1.2.0\", \"1.1.9\"",
          "expectedOutput": "1"
        },
        {
          "input": "\"2.0.1\", \"2.0.1\"",
          "expectedOutput": "0"
        },
        {
          "input": "\"0.9.5\", \"1.0.0\"",
          "expectedOutput": "-1"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "def parse_semver(version: str) -> tuple[int, int, int]:",
        "codeSnippet": "def parse_semver(version: str) -> tuple[int, int, int]:",
        "explanation": "Parses semantic version string into integer components."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "print(\"Is v2 greater than v1?\", v2 > v1)",
        "codeSnippet": "print(\"Is v2 greater than v1?\", v2 > v1)",
        "explanation": "Tuple comparison naturally handles semantic version comparison."
      }
    ],
    "applications": [
      {
        "industry": "Publishing to PyPI",
        "application": "Distributing open-source Python packages to millions of developers worldwide.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Publishing to PyPI",
        "description": "Distributing open-source Python packages to millions of developers worldwide."
      },
      {
        "industry": "Internal Enterprise Package Registries",
        "application": "Publishing shared proprietary business logic to private JFrog Artifactory or AWS CodeArtifact feeds.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Internal Enterprise Package Registries",
        "description": "Publishing shared proprietary business logic to private JFrog Artifactory or AWS CodeArtifact feeds."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Configure modern Python packaging using PEP 518/621 `pyproject.toml` standards.",
        "Understand build backends (setuptools, flit, hatchling, poetry).",
        "Build distribution packages: Source Distributions (`sdist`, `.tar.gz`) and Built Distributions (Wheels, `.whl`)."
      ]
    }
  }
};
