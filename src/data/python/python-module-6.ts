import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule6Data: PythonModuleData = {
  "id": "python-module-6",
  "number": 6,
  "title": "Object-Oriented Programming",
  "subtitle": "Classes, Inheritance, Polymorphism & Python Data Model",
  "description": "The complete OOP track. Build classes from scratch, master encapsulation with properties, implement inheritance hierarchies, apply polymorphism through duck typing, understand composition, navigate the MRO, and unlock Python special methods for operator overloading.",
  "icon": "Box",
  "badge": "OOP",
  "estimatedHours": 10,
  "topicsCount": 11,
  "lessons": [
    {
      "id": "py-oop-classes-objects",
      "moduleId": "python-module-6",
      "title": "Classes and Objects",
      "description": "class keyword, instantiation, the object model, and how classes create namespaces.",
      "order": 1,
      "readTimeMinutes": 20,
      "visualizerType": "oop-diagram",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-oop-constructor",
      "moduleId": "python-module-6",
      "title": "Constructors and self",
      "description": "__init__ method, self as the instance reference, and initializing instance state.",
      "order": 2,
      "readTimeMinutes": 18,
      "visualizerType": "oop-diagram",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-oop-attributes",
      "moduleId": "python-module-6",
      "title": "Instance vs Class Attributes",
      "description": "Instance __dict__, class-level shared attributes, and accidental class-level mutation bugs.",
      "order": 3,
      "readTimeMinutes": 20,
      "visualizerType": "oop-diagram",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-oop-methods",
      "moduleId": "python-module-6",
      "title": "Instance, Class, and Static Methods",
      "description": "@classmethod with cls, @staticmethod utility functions, and when to use each.",
      "order": 4,
      "readTimeMinutes": 22,
      "visualizerType": "oop-diagram",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-oop-encapsulation",
      "moduleId": "python-module-6",
      "title": "Encapsulation and Access Control",
      "description": "Naming conventions for _protected and __private, @property for getter/setter, and __slots__.",
      "order": 5,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-oop-inheritance",
      "moduleId": "python-module-6",
      "title": "Inheritance",
      "description": "Single and multilevel inheritance, super(), method overriding, and isinstance/issubclass.",
      "order": 6,
      "readTimeMinutes": 25,
      "visualizerType": "oop-diagram",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-oop-polymorphism",
      "moduleId": "python-module-6",
      "title": "Polymorphism and Method Overriding",
      "description": "Duck typing, runtime polymorphism, and why Python prefers duck typing over interfaces.",
      "order": 7,
      "readTimeMinutes": 22,
      "visualizerType": "oop-diagram",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-oop-abstraction",
      "moduleId": "python-module-6",
      "title": "Abstract Classes and Abstraction",
      "description": "ABC module, @abstractmethod, and enforcing interface contracts in Python.",
      "order": 8,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "py-oop-composition",
      "moduleId": "python-module-6",
      "title": "Composition vs Inheritance",
      "description": "Has-a vs is-a relationships, delegation pattern, and favoring composition for flexibility.",
      "order": 9,
      "readTimeMinutes": 22,
      "visualizerType": "oop-diagram",
      "difficulty": "Advanced"
    },
    {
      "id": "py-oop-mro",
      "moduleId": "python-module-6",
      "title": "Method Resolution Order (MRO)",
      "description": "C3 linearization algorithm for multiple inheritance, __mro__, and diamond problem solution.",
      "order": 10,
      "readTimeMinutes": 25,
      "visualizerType": "oop-diagram",
      "difficulty": "Advanced"
    },
    {
      "id": "py-oop-special-methods",
      "moduleId": "python-module-6",
      "title": "Special Methods and Operator Overloading",
      "description": "__str__, __repr__, __len__, __eq__, __lt__, __add__ and making custom objects Pythonic.",
      "order": 11,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Advanced"
    }
  ]
};

export const pythonModule6Lessons: Record<string, PythonLessonContent> = {
  "py-oop-classes-objects": {
    "id": "py-oop-classes-objects",
    "moduleId": "python-module-6",
    "title": "Classes and Objects: The Python Object Model",
    "subtitle": "Blueprints, Instantiation, the self Reference, and the Internal __dict__",
    "order": 1,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "oop-diagram",
    "objectives": [
      "Understand classes as blueprints that define namespaces and shared behavior.",
      "Demystify the self parameter: how obj.method() is desugared to Class.method(obj).",
      "Inspect instance and class namespaces using the internal __dict__ attribute.",
      "Distinguish instance attributes (unique to each object) from class attributes (shared).",
      "Write Pythonic classes adhering to PEP 8 naming conventions (CapWords/PascalCase)."
    ],
    "prerequisites": [
      "Functions, parameters, and return values",
      "Dictionaries and key-value attribute lookups",
      "Object references and variable binding"
    ],
    "analogy": {
      "title": "Architectural Blueprints vs Constructed Houses",
      "text": "A class is like an architectural blueprint for a modern smart house. The blueprint itself is not a physical building — you cannot live inside it. It specifies that every house built from this blueprint will have a kitchen, two bedrooms, and an intercom. When the construction crew actually builds a house on Lot 42, that physical house is an \"instance\" or \"object\". House #1 can paint its front door blue, and House #2 on Lot 43 can paint its door red. When the resident in House #1 speaks into the intercom, the intercom knows which specific house is speaking because of the home address — in Python, that home address is \"self\".",
      "metaphor": "Class = Blueprint; Instance = Constructed House; self = The specific physical address of the house executing the action."
    },
    "problemSolved": {
      "title": "Bundling State and Behavior into Cohesive Units",
      "description": "In procedural code, data structures (dicts or tuples) are detached from the functions that manipulate them. If a function accidentally mutates an invalid dictionary key, bugs proliferate across the entire codebase. Classes encapsulate state and behavior together, ensuring that data is modified only through valid methods.",
      "keyPoints": [
        "Encapsulation: combines state (attributes) and behavior (methods) in one namespace",
        "Data integrity: methods enforce invariants before mutating attributes",
        "Polymorphism: different classes can implement the same method interface"
      ]
    },
    "intuition": {
      "overview": "In Python, everything is an object — even classes themselves! When a class is defined, Python executes its body and stores its attributes and functions in a class dictionary. When you call ClassName(), Python creates a new empty instance object and passes it to __init__ as self.",
      "steps": [
        {
          "step": 1,
          "title": "Class Definition",
          "description": "Python creates a class object in the current scope containing all defined methods."
        },
        {
          "step": 2,
          "title": "Instantiation (__new__ and __init__)",
          "description": "Calling Car(\"Tesla\") allocates a new instance in memory (__new__) and initializes its attributes (__init__) via self."
        },
        {
          "step": 3,
          "title": "The self Magic",
          "description": "Calling my_car.drive(50) is transformed by Python into Car.drive(my_car, 50). Python supplies self automatically."
        },
        {
          "step": 4,
          "title": "Attribute Lookup via __dict__",
          "description": "Accessing my_car.color checks my_car.__dict__ first. If not found, it checks Car.__dict__, then parent classes, then raises AttributeError."
        }
      ]
    },
    "codeExample": {
      "title": "Defining a Class and Inspecting State",
      "code": "class BankAccount:\n    # Class attribute (shared by all accounts)\n    bank_name = \"Global Python Reserve\"\n\n    def __init__(self, owner: str, initial_balance: float = 0.0):\n        # Instance attributes (unique to each instance)\n        self.owner = owner\n        self.balance = initial_balance\n\n    def deposit(self, amount: float) -> float:\n        if amount <= 0:\n            raise ValueError(\"Deposit must be positive\")\n        self.balance += amount\n        return self.balance\n\n    def withdraw(self, amount: float) -> float:\n        if amount > self.balance:\n            raise ValueError(\"Insufficient funds\")\n        self.balance -= amount\n        return self.balance\n\n# Create instances\nacc1 = BankAccount(\"Alice\", 500.0)\nacc2 = BankAccount(\"Bob\", 150.0)\n\n# Method calls\nacc1.deposit(200.0)\nprint(f\"Alice's balance: {acc1.balance}\")  # 700.0\nprint(f\"Bob's balance:   {acc2.balance}\")  # 150.0",
      "explanation": "Notice how acc1.deposit(200.0) modifies only Alice's balance without affecting Bob's balance, because self refers to the specific instance."
    },
    "runnableCode": {
      "code": "class Robot:\n    def __init__(self, name, model):\n        self.name = name\n        self.model = model\n        self.battery = 100\n\n    def say_hi(self):\n        print(f\"Beep boop! I am {self.name} (model: {self.model}), Battery: {self.battery}%\")\n\nbot1 = Robot(\"Optimus\", \"T-800\")\nbot2 = Robot(\"R2D2\", \"Astromech\")\n\nbot1.say_hi()\nbot2.say_hi()\n\n# Inspect internal __dict__\nprint(\"bot1 internal dictionary:\", bot1.__dict__)",
      "expectedOutput": "Beep boop! I am Optimus (model: T-800), Battery: 100%\nBeep boop! I am R2D2 (model: Astromech), Battery: 100%\nbot1 internal dictionary: {'name': 'Optimus', 'model': 'T-800', 'battery': 100}"
    },
    "lineByLineExplanation": [
      {
        "line": "1",
        "lines": "1",
        "code": "class BankAccount:",
        "codeSnippet": "class BankAccount:",
        "explanation": "Defines a new class named BankAccount. Follows PEP 8 CapWords naming convention."
      },
      {
        "line": "3",
        "lines": "3",
        "code": "bank_name = \"Global Python Reserve\"",
        "codeSnippet": "bank_name = \"Global Python Reserve\"",
        "explanation": "A class attribute stored in BankAccount.__dict__, accessible by all instances but shared in memory."
      },
      {
        "line": "5-8",
        "lines": "5-8",
        "code": "def __init__(self, owner, initial_balance=0.0):",
        "codeSnippet": "def __init__(self, owner, initial_balance=0.0):",
        "explanation": "The initializer method called immediately after instance creation. \"self\" binds to the newly allocated instance."
      },
      {
        "line": "10-14",
        "lines": "10-14",
        "code": "self.balance += amount",
        "codeSnippet": "self.balance += amount",
        "explanation": "Mutates the \"balance\" key inside the instance's private __dict__."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting the \"self\" parameter in method definitions",
        "solution": "Every instance method must take \"self\" as its first parameter: def method(self, arg): ... Otherwise, calling obj.method(arg) raises a TypeError: takes 1 positional argument but 2 were given.",
        "codeExample": "# BUG:\ndef drive(speed):\n    print(speed) # Fails when called as car.drive(60)!"
      },
      {
        "mistake": "Using a mutable default attribute at the class level",
        "solution": "Defining \"items = []\" at the class level shares the exact same list among all instances! Always initialize mutable lists or dicts inside __init__.",
        "codeExample": "# BUG: class Warehouse: items = [] # Shared by ALL warehouses!\n# FIX:\ndef __init__(self):\n    self.items = []"
      }
    ],
    "bestPractices": [
      "Name classes using PascalCase / CapWords (e.g., UserProfile, DatabaseConnection) according to PEP 8.",
      "Always initialize all instance attributes inside __init__ to make object shapes predictable.",
      "Use the leading underscore convention (_protected) to signal internal implementation details.",
      "Implement __repr__ and __str__ so your objects display meaningful information when printed."
    ],
    "applications": [
      {
        "industry": "Web Frameworks (Django / Flask)",
        "application": "ORM Models",
        "benefit": "Mapping database tables to Python classes and rows to instance objects."
      },
      {
        "industry": "Machine Learning (scikit-learn / PyTorch)",
        "application": "Estimators & Neural Network Modules",
        "benefit": "Every model (nn.Module, LinearRegression) is a class with state (weights) and methods (forward, fit, predict)."
      },
      {
        "industry": "GUI Applications",
        "application": "Component Widgets",
        "benefit": "Buttons, Windows, and Menus are instances with event listener callbacks and layout properties."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-q1",
        "question": "What actually happens when you write \"obj.method(x)\" in Python?",
        "hint": "How does Python translate the syntax using the Class object?",
        "answer": "Python translates \"obj.method(x)\" into \"type(obj).method(obj, x)\". It looks up the function on the class and passes the instance \"obj\" as the first argument, which is received by the parameter named \"self\"."
      },
      {
        "id": "py-oop-q2",
        "question": "What is the purpose of the __dict__ attribute on a Python instance?",
        "hint": "How are attributes stored internally in CPython?",
        "answer": "The __dict__ attribute is a standard Python dictionary used to store an object's writable attributes. Accessing \"obj.x\" typically reads \"obj.__dict__['x']\"."
      },
      {
        "id": "py-oop-q3",
        "question": "Why should you never declare a mutable object (like a list) as a class-level attribute if intended for instance use?",
        "hint": "Where is a class attribute stored in memory?",
        "answer": "A class attribute is stored once in the class's dictionary, not per instance. If it is mutable (like a list), all instances share the exact same list pointer. Appending to it through one instance alters it for every other instance."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-quiz-1",
        "question": "What is the name of the special method responsible for initializing instance attributes in Python?",
        "options": [
          "__construct__",
          "__init__",
          "__new__",
          "__start__"
        ],
        "correctIndex": 1,
        "explanation": "__init__ is the initializer method called automatically after the instance object is created in memory by __new__."
      },
      {
        "id": "py-oop-quiz-2",
        "question": "In the method signature \"def calculate(self, rate):\", what does \"self\" represent?",
        "options": [
          "The parent class",
          "A copy of the Python interpreter",
          "The specific instance of the class that called the method",
          "A keyword required by CPython compiler"
        ],
        "correctIndex": 2,
        "explanation": "\"self\" is a reference to the specific instance object currently executing the method, giving access to its instance attributes."
      },
      {
        "id": "py-oop-quiz-3",
        "question": "According to PEP 8, what naming style should be used for class definitions?",
        "options": [
          "snake_case (e.g. bank_account)",
          "camelCase (e.g. bankAccount)",
          "CapWords / PascalCase (e.g. BankAccount)",
          "UPPER_CASE (e.g. BANK_ACCOUNT)"
        ],
        "correctIndex": 2,
        "explanation": "PEP 8 specifies CapWords (also known as PascalCase) for class names."
      }
    ],
    "codingChallenge": {
      "title": "Design a Complete BankAccount Class",
      "problem": "Implement a BankAccount class with an initial balance, deposit(amount), withdraw(amount), and get_statement() method. Include validation: deposit amount must be > 0, withdraw amount must not exceed balance. Track all transactions in an instance list \"self.transactions\".",
      "hints": [
        "Store transactions in an instance list initialized inside __init__: self.transactions = [].",
        "In deposit and withdraw, update self.balance and append a descriptive string to self.transactions.",
        "Validate inputs: check amount > 0 and amount <= self.balance."
      ],
      "starterCode": "class BankAccount:\n    def __init__(self, owner: str, balance: float = 0.0):\n        # Your code here\n        pass\n\n    def deposit(self, amount: float):\n        # Your code here\n        pass\n\n    def withdraw(self, amount: float):\n        # Your code here\n        pass\n\n    def get_statement(self) -> list:\n        # Your code here\n        pass\n\n# Test case:\nacc = BankAccount(\"Sarah\", 100.0)\nacc.deposit(50.0)\nacc.withdraw(30.0)\nprint(acc.balance)  # Expected: 120.0\nprint(acc.get_statement())",
      "solution": "class BankAccount:\n    def __init__(self, owner: str, balance: float = 0.0):\n        self.owner = owner\n        self.balance = float(balance)\n        self.transactions = [f\"Initial balance: ${self.balance}\"]\n\n    def deposit(self, amount: float):\n        if amount <= 0:\n            raise ValueError(\"Deposit must be positive\")\n        self.balance += amount\n        self.transactions.append(f\"Deposit: +${amount}\")\n        return self.balance\n\n    def withdraw(self, amount: float):\n        if amount <= 0:\n            raise ValueError(\"Withdrawal must be positive\")\n        if amount > self.balance:\n            raise ValueError(\"Insufficient balance\")\n        self.balance -= amount\n        self.transactions.append(f\"Withdrawal: -${amount}\")\n        return self.balance\n\n    def get_statement(self) -> list:\n        return list(self.transactions)\n\n# Test case:\nacc = BankAccount(\"Sarah\", 100.0)\nacc.deposit(50.0)\nacc.withdraw(30.0)\nprint(\"Balance:\", acc.balance)\nprint(\"Transactions:\", acc.get_statement())"
    },
    "summary": {
      "keyTakeaways": [
        "Classes define reusable namespaces combining data and methods.",
        "The self parameter is the instance reference passed automatically by Python.",
        "Instance attributes live inside the instance's __dict__.",
        "Never use mutable default class attributes if they should be unique per instance."
      ],
      "nextLessonId": "py-oop-constructor",
      "nextLessonTitle": "Constructors and self",
      "nextLessonModuleId": "python-module-6"
    },
    "lineByLine": [
      {
        "line": "1",
        "lines": "1",
        "code": "class BankAccount:",
        "codeSnippet": "class BankAccount:",
        "explanation": "Defines a new class named BankAccount. Follows PEP 8 CapWords naming convention."
      },
      {
        "line": "3",
        "lines": "3",
        "code": "bank_name = \"Global Python Reserve\"",
        "codeSnippet": "bank_name = \"Global Python Reserve\"",
        "explanation": "A class attribute stored in BankAccount.__dict__, accessible by all instances but shared in memory."
      },
      {
        "line": "5-8",
        "lines": "5-8",
        "code": "def __init__(self, owner, initial_balance=0.0):",
        "codeSnippet": "def __init__(self, owner, initial_balance=0.0):",
        "explanation": "The initializer method called immediately after instance creation. \"self\" binds to the newly allocated instance."
      },
      {
        "line": "10-14",
        "lines": "10-14",
        "code": "self.balance += amount",
        "codeSnippet": "self.balance += amount",
        "explanation": "Mutates the \"balance\" key inside the instance's private __dict__."
      }
    ]
  },
  "py-oop-constructor": {
    "id": "py-oop-constructor",
    "moduleId": "python-module-6",
    "title": "Constructors and self",
    "subtitle": "__init__ Initializer, __new__ Allocator, and Demystifying the self Parameter",
    "order": 2,
    "readTimeMinutes": 18,
    "difficulty": "Intermediate",
    "visualizerType": "oop-diagram",
    "objectives": [
      "Distinguish between `__new__` (object allocator) and `__init__` (instance initializer).",
      "Understand why self must be passed explicitly as the first parameter in instance methods.",
      "Initialize instance attributes safely without class-level variable leakage.",
      "Implement input validation inside `__init__` to enforce domain invariants."
    ],
    "prerequisites": [
      "Classes and objects fundamentals."
    ],
    "analogy": {
      "title": "The Vehicle Factory and Customization Bay",
      "text": "When a new sports car is built, `__new__` is the chassis stamping press: it creates raw metal on four wheels out of nothing. `__init__` is the customization workshop: it takes that freshly stamped chassis (`self`), installs the requested leather seats, paints it red, and sets the VIN number before handing the keys to the customer.",
      "metaphor": "__new__ allocates memory; __init__ configures the state of self."
    },
    "problemSolved": {
      "title": "Predictable and Validated Instance State Initialization",
      "description": "Without a constructor, objects start in an uninitialized state, requiring callers to manually set attributes. `__init__` guarantees every instance starts with required attributes and validated invariants.",
      "keyPoints": [
        "`__init__` does NOT return a value (returning anything other than `None` raises TypeError).",
        "`self` is not a keyword; it is a convention representing the current instance.",
        "Calling `MyClass(arg)` is syntactic sugar for `obj = MyClass.__new__(MyClass); MyClass.__init__(obj, arg); return obj`."
      ]
    },
    "intuition": {
      "overview": "Python automatically binds the newly created instance to the first argument of `__init__`, allowing you to attach attributes to `self.__dict__`.",
      "steps": [
        {
          "step": 1,
          "title": "Allocation (__new__)",
          "description": "Python allocates a blank instance object in heap memory."
        },
        {
          "step": 2,
          "title": "Initialization (__init__)",
          "description": "Initializes instance attributes using caller arguments."
        },
        {
          "step": 3,
          "title": "Return Instance",
          "description": "Python delivers the configured instance back to the caller."
        }
      ]
    },
    "codeExample": {
      "title": "Robust BankAccount Initializer with Invariant Checks",
      "code": "class BankAccount:\n    \"\"\"Represents a bank account with positive balance invariant.\"\"\"\n    def __init__(self, owner: str, initial_balance: float = 0.0):\n        if initial_balance < 0:\n            raise ValueError(\"Initial balance cannot be negative\")\n        self.owner = owner\n        self.balance = float(initial_balance)\n        self.transactions = []\n\n    def deposit(self, amount: float):\n        if amount <= 0:\n            raise ValueError(\"Deposit amount must be positive\")\n        self.balance += amount\n        self.transactions.append(f\"+{amount}\")\n\nacc = BankAccount(\"Alice\", 100.0)\nacc.deposit(50.0)\nprint(f\"Owner: {acc.owner}, Balance: ${acc.balance}\")",
      "explanation": "Demonstrates input validation in __init__, initializing instance attributes, and mutating state in methods."
    },
    "runnableCode": {
      "code": "class User:\n    def __init__(self, username, email):\n        self.username = username\n        self.email = email\n        self.is_active = True\n\nu = User(\"coder42\", \"coder@example.com\")\nprint(\"Attributes dict:\", u.__dict__)\nprint(\"Is active?\", u.is_active)",
      "expectedOutput": "Attributes dict: {'username': 'coder42', 'email': 'coder@example.com', 'is_active': True}\nIs active? True"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "class User:",
        "codeSnippet": "class User:",
        "explanation": "Defines User class."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    def __init__(self, username, email):",
        "codeSnippet": "    def __init__(self, username, email):",
        "explanation": "Constructor accepting self reference and two parameters."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "        self.username = username",
        "codeSnippet": "        self.username = username",
        "explanation": "Attaches username attribute to this specific instance."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "u = User(\"coder42\", \"coder@example.com\")",
        "codeSnippet": "u = User(\"coder42\", \"coder@example.com\")",
        "explanation": "Instantiates User, invoking __init__ under the hood."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Trying to return a value from `__init__`: `return self` or `return True`.",
        "solution": "Never use return in `__init__`, or use bare `return` only for early termination.",
        "whyWrong": "Python raises `TypeError: __init__() should return None, not '...'`.",
        "howToFix": "Never use return in `__init__`, or use bare `return` only for early termination."
      },
      {
        "mistake": "Omitting `self.` when assigning attributes in `__init__`: `username = username`.",
        "solution": "Always prefix instance attributes with `self.`: `self.username = username`.",
        "whyWrong": "Only creates a local variable inside `__init__` that is destroyed when the constructor exits.",
        "howToFix": "Always prefix instance attributes with `self.`: `self.username = username`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Database ORM Entities",
        "description": "SQLAlchemy model initialization mapping database columns to instance fields."
      },
      {
        "title": "Network Client Connections",
        "description": "Configuring API client hosts, authentication tokens, and timeout values."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-constructor-pq1",
        "question": "What does `__new__` do versus `__init__`?",
        "hint": "Allocation vs initialization.",
        "answer": "`__new__` is the static method that actually allocates and returns the raw object instance; `__init__` initializes that instance's attributes."
      },
      {
        "id": "py-oop-constructor-pq2",
        "question": "Why is `self` required as the first parameter of methods in Python unlike Java or C++ (`this`)?",
        "hint": "Explicit is better than implicit.",
        "answer": "Python follows \"explicit is better than implicit\": methods are regular functions, and `obj.method()` is desugared to `Class.method(obj)`."
      },
      {
        "id": "py-oop-constructor-pq3",
        "question": "What is `obj.__dict__`?",
        "hint": "Instance namespace mapping.",
        "answer": "The dictionary containing all the writable instance attributes belonging to that object."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-constructor-q1",
        "question": "What is the return type of `__init__()`?",
        "options": [
          "The newly created object",
          "None",
          "boolean",
          "dict"
        ],
        "correctIndex": 1,
        "explanation": "`__init__()` must strictly return `None`. Python automatically delivers the instance created by `__new__()`."
      },
      {
        "id": "py-oop-constructor-q2",
        "question": "What is `self` in Python class methods?",
        "options": [
          "A reserved keyword enforced by the compiler",
          "A conventional name for the first argument referring to the current instance",
          "A pointer to the parent class",
          "A global variable"
        ],
        "correctIndex": 1,
        "explanation": "`self` is a conventional identifier (not a keyword) referencing the instance upon which the method was invoked."
      },
      {
        "id": "py-oop-constructor-q3",
        "question": "What happens if you define `def __init__(username):` without `self`?",
        "options": [
          "It works fine",
          "TypeError when instantiated because 2 arguments are passed internally",
          "SyntaxError",
          "username becomes self"
        ],
        "correctIndex": 1,
        "explanation": "Python passes the instance as the first argument, so `User(\"alice\")` attempts to pass 2 arguments into a 1-parameter function, raising TypeError."
      }
    ],
    "codingChallenge": {
      "title": "Build Product Inventory Record",
      "problem": "Write a class `Product` whose `__init__` accepts `name: str`, `price: float`, and optional `stock: int = 0`. Ensure `price` > 0 and `stock` >= 0, raising `ValueError` otherwise. Provide a method `total_value() -> float` returning `round(price * stock, 2)`.",
      "hints": [
        "Validate price > 0 and stock >= 0 in __init__.",
        "Assign self.name, self.price, self.stock.",
        "total_value returns round(self.price * self.stock, 2)."
      ],
      "starterCode": "class Product:\n    # Write your solution here\n    pass",
      "solution": "class Product:\n    def __init__(self, name: str, price: float, stock: int = 0):\n        if price <= 0:\n            raise ValueError(\"Price must be positive\")\n        if stock < 0:\n            raise ValueError(\"Stock cannot be negative\")\n        self.name = name\n        self.price = float(price)\n        self.stock = int(stock)\n        \n    def total_value(self) -> float:\n        return round(self.price * self.stock, 2)",
      "testCases": [
        {
          "input": "p = Product(\"Gadget\", 19.99, 10); p.total_value()",
          "expectedOutput": "199.9"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "class User:",
        "codeSnippet": "class User:",
        "explanation": "Defines User class."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    def __init__(self, username, email):",
        "codeSnippet": "    def __init__(self, username, email):",
        "explanation": "Constructor accepting self reference and two parameters."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "        self.username = username",
        "codeSnippet": "        self.username = username",
        "explanation": "Attaches username attribute to this specific instance."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "u = User(\"coder42\", \"coder@example.com\")",
        "codeSnippet": "u = User(\"coder42\", \"coder@example.com\")",
        "explanation": "Instantiates User, invoking __init__ under the hood."
      }
    ],
    "applications": [
      {
        "industry": "Database ORM Entities",
        "application": "SQLAlchemy model initialization mapping database columns to instance fields.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Database ORM Entities",
        "description": "SQLAlchemy model initialization mapping database columns to instance fields."
      },
      {
        "industry": "Network Client Connections",
        "application": "Configuring API client hosts, authentication tokens, and timeout values.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Network Client Connections",
        "description": "Configuring API client hosts, authentication tokens, and timeout values."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Distinguish between `__new__` (object allocator) and `__init__` (instance initializer).",
        "Understand why self must be passed explicitly as the first parameter in instance methods.",
        "Initialize instance attributes safely without class-level variable leakage."
      ]
    }
  },
  "py-oop-attributes": {
    "id": "py-oop-attributes",
    "moduleId": "python-module-6",
    "title": "Instance vs Class Attributes",
    "subtitle": "Namespaces, Shared Class State, and the Classic Shared Mutation Bug",
    "order": 3,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "oop-diagram",
    "objectives": [
      "Distinguish between class attributes (stored on the class object) and instance attributes (stored on self).",
      "Trace attribute lookup resolution: Instance `__dict__` -> Class `__dict__` -> Parent Classes.",
      "Avoid the infamous shared mutable class attribute bug (e.g. shared lists/dicts).",
      "Use class attributes appropriately for constants, default configurations, and instance counting."
    ],
    "prerequisites": [
      "Constructors and basic OOP."
    ],
    "analogy": {
      "title": "The Company Bulletin Board vs Personal Employee Desk",
      "text": "A class attribute is the cafeteria bulletin board: there is only one board for the entire company. If someone pins an announcement on the board, every employee sees it. An instance attribute is an employee's private desk drawer: each employee has their own desk, and what Alice places in her drawer has zero impact on Bob's drawer.",
      "metaphor": "Class attributes are shared across all instances; instance attributes belong to a single object."
    },
    "problemSolved": {
      "title": "Preventing Accidental Cross-Instance Data Leaks",
      "description": "Declaring a list or dictionary at the class level and mutating it from an instance causes silent data corruption across all instances of that class. Understanding attribute scoping prevents this critical pitfall.",
      "keyPoints": [
        "Class attributes are defined directly inside the class body, outside any method.",
        "Instance attributes are defined on `self` inside methods (usually `__init__`).",
        "Assigning `obj.x = 10` creates an instance attribute on `obj`, shadowing any class attribute named `x`."
      ]
    },
    "intuition": {
      "overview": "When reading `obj.attr`, Python first checks `obj.__dict__`. If absent, it checks `type(obj).__dict__`, and finally base classes.",
      "steps": [
        {
          "step": 1,
          "title": "Check Instance Dict",
          "description": "Looks for key in `obj.__dict__`."
        },
        {
          "step": 2,
          "title": "Check Class Dict",
          "description": "If not found on instance, looks in `MyClass.__dict__`."
        },
        {
          "step": 3,
          "title": "Assignment Shadowing",
          "description": "Writing `obj.attr = val` ALWAYS writes to `obj.__dict__`, never to `MyClass.__dict__`."
        }
      ]
    },
    "codeExample": {
      "title": "Class vs Instance Attributes and Shadowing",
      "code": "class Dog:\n    species = \"Canis familiaris\"  # Class attribute (shared by all dogs)\n    \n    def __init__(self, name: str):\n        self.name = name          # Instance attribute (unique to each dog)\n\nd1 = Dog(\"Buddy\")\nd2 = Dog(\"Bella\")\n\nprint(d1.species)  # \"Canis familiaris\"\nprint(d2.species)  # \"Canis familiaris\"\n\n# Shadowing: assigning to d1 creates an instance attribute on d1 only\nd1.species = \"Wolf\"\nprint(\"d1 species:\", d1.species)  # \"Wolf\"\nprint(\"d2 species:\", d2.species)  # Still \"Canis familiaris\"\nprint(\"Class species:\", Dog.species) # Still \"Canis familiaris\"",
      "explanation": "Demonstrates shared class attribute lookup followed by instance attribute shadowing."
    },
    "runnableCode": {
      "code": "class BuggyTeam:\n    members = [] # DANGEROUS: shared mutable class attribute!\n\nclass SafeTeam:\n    def __init__(self):\n        self.members = [] # SAFE: independent instance list\n\nt1 = BuggyTeam()\nt2 = BuggyTeam()\nt1.members.append(\"Alice\")\nprint(\"BuggyTeam t2 members:\", t2.members) # ['Alice'] (Corrupted!)\n\ns1 = SafeTeam()\ns2 = SafeTeam()\ns1.members.append(\"Alice\")\nprint(\"SafeTeam s2 members:\", s2.members)   # [] (Clean!)",
      "expectedOutput": "BuggyTeam t2 members: ['Alice']\nSafeTeam s2 members: []"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "    members = []",
        "codeSnippet": "    members = []",
        "explanation": "Class attribute created once at class definition time."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "        self.members = []",
        "codeSnippet": "        self.members = []",
        "explanation": "Instance attribute initialized freshly for each SafeTeam object."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "t1.members.append(\"Alice\")",
        "codeSnippet": "t1.members.append(\"Alice\")",
        "explanation": "Mutates the shared list in place via pointer reference."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "print(\"BuggyTeam t2 members:\", t2.members)",
        "codeSnippet": "print(\"BuggyTeam t2 members:\", t2.members)",
        "explanation": "t2 sees the mutation because both reference the exact same list."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Declaring mutable objects (lists, dicts, sets) as class attributes.",
        "solution": "Always initialize mutable collections inside `__init__` on `self`.",
        "whyWrong": "Every instance shares the exact same collection instance; mutating it affects all instances.",
        "howToFix": "Always initialize mutable collections inside `__init__` on `self`."
      },
      {
        "mistake": "Trying to update a class attribute using `self.attr = new_val`.",
        "solution": "Update class attributes via the class name directly: `ClassName.attr = new_val`.",
        "whyWrong": "Creates a new instance attribute on `self` shadowing the class attribute, leaving the class attribute unchanged.",
        "howToFix": "Update class attributes via the class name directly: `ClassName.attr = new_val`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Global Instance Counting",
        "description": "Tracking active database connection pool instances via a class attribute counter."
      },
      {
        "title": "Default Configuration Constants",
        "description": "Defining default timeouts and schema versions shared across all model instances."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-attributes-pq1",
        "question": "Where is an instance attribute stored internally in Python?",
        "hint": "Dunder attribute.",
        "answer": "In the object's `__dict__` dictionary."
      },
      {
        "id": "py-oop-attributes-pq2",
        "question": "What happens when you execute `obj.x = 5` if `x` was defined as a class attribute?",
        "hint": "Shadowing.",
        "answer": "Python creates a new instance attribute `x` in `obj.__dict__` with value 5, shadowing the class attribute for `obj`."
      },
      {
        "id": "py-oop-attributes-pq3",
        "question": "How do you modify a class attribute so that the change reflects across all instances?",
        "hint": "Access via the class.",
        "answer": "Modify it through the class object itself: `ClassName.x = new_value`."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-attributes-q1",
        "question": "Where should a mutable collection (like a list) belong if each instance needs its own data?",
        "options": [
          "Directly inside the class body",
          "Inside `__init__` bound to `self`",
          "In a global variable",
          "In a static method"
        ],
        "correctIndex": 1,
        "explanation": "Collections initialized on `self` inside `__init__` are unique to each instance."
      },
      {
        "id": "py-oop-attributes-q2",
        "question": "Given `class A: count = 0`; `a1 = A(); a2 = A(); a1.count += 1`. What is `a2.count`?",
        "options": [
          "1",
          "0",
          "2",
          "AttributeError"
        ],
        "correctIndex": 1,
        "explanation": "`a1.count += 1` is evaluated as `a1.count = a1.count + 1`, which assigns an instance attribute `count=1` to `a1`. `a2.count` still reads the class attribute 0."
      },
      {
        "id": "py-oop-attributes-q3",
        "question": "What is the attribute lookup sequence when accessing `instance.attr`?",
        "options": [
          "Class -> Instance -> Built-ins",
          "Instance -> Class -> Base classes in MRO",
          "Base classes -> Class -> Instance",
          "Global -> Class -> Instance"
        ],
        "correctIndex": 1,
        "explanation": "Python checks the instance dictionary first, then the class dictionary, then ancestor classes in MRO order."
      }
    ],
    "codingChallenge": {
      "title": "Track Active Session Count",
      "problem": "Write a class `UserSession` with a class attribute `active_sessions: int = 0`. Each time a new session is instantiated, increment `active_sessions`. Provide a method `close()` that decrements `active_sessions` (only if the session is currently active).",
      "hints": [
        "Increment UserSession.active_sessions in __init__.",
        "Track self.is_active = True.",
        "In close(): if self.is_active: self.is_active = False; UserSession.active_sessions -= 1."
      ],
      "starterCode": "class UserSession:\n    active_sessions: int = 0\n    # Write your solution here\n    pass",
      "solution": "class UserSession:\n    active_sessions: int = 0\n    \n    def __init__(self, user_id: str):\n        self.user_id = user_id\n        self.is_active = True\n        UserSession.active_sessions += 1\n        \n    def close(self):\n        if self.is_active:\n            self.is_active = False\n            UserSession.active_sessions -= 1",
      "testCases": [
        {
          "input": "s1 = UserSession(\"u1\"); s2 = UserSession(\"u2\"); c1 = UserSession.active_sessions; s1.close(); c2 = UserSession.active_sessions; (c1, c2)",
          "expectedOutput": "(2, 1)"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "    members = []",
        "codeSnippet": "    members = []",
        "explanation": "Class attribute created once at class definition time."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "        self.members = []",
        "codeSnippet": "        self.members = []",
        "explanation": "Instance attribute initialized freshly for each SafeTeam object."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "t1.members.append(\"Alice\")",
        "codeSnippet": "t1.members.append(\"Alice\")",
        "explanation": "Mutates the shared list in place via pointer reference."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "print(\"BuggyTeam t2 members:\", t2.members)",
        "codeSnippet": "print(\"BuggyTeam t2 members:\", t2.members)",
        "explanation": "t2 sees the mutation because both reference the exact same list."
      }
    ],
    "applications": [
      {
        "industry": "Global Instance Counting",
        "application": "Tracking active database connection pool instances via a class attribute counter.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Global Instance Counting",
        "description": "Tracking active database connection pool instances via a class attribute counter."
      },
      {
        "industry": "Default Configuration Constants",
        "application": "Defining default timeouts and schema versions shared across all model instances.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Default Configuration Constants",
        "description": "Defining default timeouts and schema versions shared across all model instances."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Distinguish between class attributes (stored on the class object) and instance attributes (stored on self).",
        "Trace attribute lookup resolution: Instance `__dict__` -> Class `__dict__` -> Parent Classes.",
        "Avoid the infamous shared mutable class attribute bug (e.g. shared lists/dicts)."
      ]
    }
  },
  "py-oop-methods": {
    "id": "py-oop-methods",
    "moduleId": "python-module-6",
    "title": "Instance, Class, and Static Methods",
    "subtitle": "@classmethod with cls, @staticmethod Utilities, and Alternative Constructors",
    "order": 4,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "oop-diagram",
    "objectives": [
      "Distinguish between instance methods (receiving self), class methods (receiving cls), and static methods (receiving neither).",
      "Use @classmethod to implement alternative constructors (e.g. from_dict, from_json, from_timestamp).",
      "Use @staticmethod for self-contained utility functions that logically belong to the class namespace.",
      "Understand how descriptor protocol binds functions to methods at access time."
    ],
    "prerequisites": [
      "Classes, attributes, and decorators."
    ],
    "analogy": {
      "title": "The Car, The Dealership, and The Tire Pressure Chart",
      "text": "An instance method is driving YOUR specific red sedan (requires the keys to `self`). A class method is the factory floor production manager: they take an order blueprint (`cls`) and stamp out a brand new car. A static method is the tire pressure calculation chart on the showroom wall: it doesn't touch any car or factory records, but it logically belongs in the automotive manual.",
      "metaphor": "instance method operates on self; classmethod operates on cls; staticmethod is an isolated utility."
    },
    "problemSolved": {
      "title": "Clean API Design and Polymorphic Object Construction",
      "description": "Python only supports a single `__init__` constructor per class. Class methods provide the canonical idiom for alternative constructors, while static methods group helper utilities cleanly.",
      "keyPoints": [
        "Instance methods receive `self` as the first argument automatically.",
        "@classmethod methods receive `cls` as the first argument, supporting subclass inheritance.",
        "@staticmethod methods behave like regular functions placed inside the class namespace."
      ]
    },
    "intuition": {
      "overview": "Python uses descriptors (`classmethod` and `staticmethod`) to control how functions are bound to instances or classes when accessed via dot notation.",
      "steps": [
        {
          "step": 1,
          "title": "Instance Method Call",
          "description": "`obj.method(x)` binds `self` to `obj`, invoking `Class.method(obj, x)`."
        },
        {
          "step": 2,
          "title": "Class Method Call",
          "description": "`Class.method(x)` or `obj.method(x)` binds `cls` to `Class`, invoking `func(Class, x)`."
        },
        {
          "step": 3,
          "title": "Static Method Call",
          "description": "Invokes function directly without prepending any instance or class argument."
        }
      ]
    },
    "codeExample": {
      "title": "Alternative Constructors with @classmethod and @staticmethod",
      "code": "import json\nfrom datetime import date\n\nclass Person:\n    def __init__(self, name: str, age: int):\n        self.name = name\n        self.age = age\n\n    @classmethod\n    def from_birth_year(cls, name: str, birth_year: int):\n        \"\"\"Alternative constructor calculating age from birth year.\"\"\"\n        current_year = date.today().year\n        return cls(name, current_year - birth_year)\n\n    @classmethod\n    def from_json(cls, json_str: str):\n        \"\"\"Alternative constructor parsing JSON payload.\"\"\"\n        data = json.loads(json_str)\n        return cls(data[\"name\"], data[\"age\"])\n\n    @staticmethod\n    def is_adult(age: int) -> bool:\n        \"\"\"Utility function with no dependency on self or cls.\"\"\"\n        return age >= 18\n\np = Person.from_birth_year(\"Bob\", 1995)\nprint(f\"Name: {p.name}, Age: {p.age}, Adult? {Person.is_adult(p.age)}\")",
      "explanation": "Demonstrates @classmethod for alternative constructors and @staticmethod for decoupled validation."
    },
    "runnableCode": {
      "code": "class MathOps:\n    @staticmethod\n    def is_prime(n: int) -> bool:\n        if n < 2:\n            return False\n        for i in range(2, int(n**0.5) + 1):\n            if n % i == 0:\n                return False\n        return True\n\nprint(\"Is 17 prime?\", MathOps.is_prime(17))\nprint(\"Is 21 prime?\", MathOps.is_prime(21))",
      "expectedOutput": "Is 17 prime? True\nIs 21 prime? False"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "    @staticmethod",
        "codeSnippet": "    @staticmethod",
        "explanation": "Decorator converting method to a plain function within class namespace."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    def is_prime(n: int) -> bool:",
        "codeSnippet": "    def is_prime(n: int) -> bool:",
        "explanation": "Notice no self or cls parameter."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "print(\"Is 17 prime?\", MathOps.is_prime(17))",
        "codeSnippet": "print(\"Is 17 prime?\", MathOps.is_prime(17))",
        "explanation": "Called directly on class without instantiation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `@staticmethod` instead of `@classmethod` for alternative constructors.",
        "solution": "Use `@classmethod` and instantiate using `cls(...)`.",
        "whyWrong": "Hardcoding the class name breaks subclass inheritance (calling `SubClass.from_dict()` would construct the parent class instead of SubClass).",
        "howToFix": "Use `@classmethod` and instantiate using `cls(...)`."
      },
      {
        "mistake": "Forgetting `self` or `cls` on standard methods.",
        "solution": "Ensure instance methods have `self` and `@classmethod` methods have `cls`.",
        "whyWrong": "Calling `obj.method()` passes `obj` as first argument, raising TypeError: method takes 0 positional arguments but 1 was given.",
        "howToFix": "Ensure instance methods have `self` and `@classmethod` methods have `cls`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "ORM Serializers",
        "description": "Django and Pydantic models constructing instances from dictionaries via `from_orm()` or `model_validate()`."
      },
      {
        "title": "Dataclass Converters",
        "description": "Parsing ISO 8601 timestamps and payloads into typed objects."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-methods-pq1",
        "question": "What is the primary argument passed to a `@classmethod`?",
        "hint": "Class object convention.",
        "answer": "`cls` (a reference to the class object itself)."
      },
      {
        "id": "py-oop-methods-pq2",
        "question": "When should a method be marked `@staticmethod` instead of a standalone function in a module?",
        "hint": "Logical grouping.",
        "answer": "When the utility logically belongs to the class's domain and namespace, but doesn't require access to instance or class state."
      },
      {
        "id": "py-oop-methods-pq3",
        "question": "Can an instance invoke a `@classmethod` or `@staticmethod`?",
        "hint": "Lookup resolution.",
        "answer": "Yes, both can be invoked through an instance (`obj.my_classmethod()`) or through the class (`Class.my_classmethod()`)."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-methods-q1",
        "question": "Which decorator is used to define an alternative constructor in Python?",
        "options": [
          "@staticmethod",
          "@classmethod",
          "@constructor",
          "@property"
        ],
        "correctIndex": 1,
        "explanation": "`@classmethod` receives `cls` and allows constructing instances of the exact class or subclass."
      },
      {
        "id": "py-oop-methods-q2",
        "question": "What arguments does a `@staticmethod` receive by default?",
        "options": [
          "self only",
          "cls only",
          "self and cls",
          "Only the arguments explicitly passed to it"
        ],
        "correctIndex": 3,
        "explanation": "Static methods receive only the arguments passed to them; neither `self` nor `cls` is passed."
      },
      {
        "id": "py-oop-methods-q3",
        "question": "If `Sub` inherits from `Base`, and `Base` defines `from_dict(cls, data): return cls(**data)`. Calling `Sub.from_dict(...)` returns an instance of which class?",
        "options": [
          "Base",
          "Sub",
          "dict",
          "TypeError"
        ],
        "correctIndex": 1,
        "explanation": "Because `cls` is dynamically bound to `Sub` when called on `Sub`, it constructs a `Sub` instance."
      }
    ],
    "codingChallenge": {
      "title": "Date Parser with Class Method Factory",
      "problem": "Write a class `SimpleDate` with attributes `year: int`, `month: int`, `day: int`. Implement `__init__(year, month, day)` and a class method `from_iso(cls, iso_str: str)` that parses an ISO formatted string `\"YYYY-MM-DD\"` (e.g. \"2026-10-18\") and returns a new `SimpleDate` instance.",
      "hints": [
        "Split iso_str by \"-\".",
        "Convert tokens to integers: year, month, day = map(int, iso_str.split(\"-\")).",
        "Return cls(year, month, day)."
      ],
      "starterCode": "class SimpleDate:\n    # Write your solution here\n    pass",
      "solution": "class SimpleDate:\n    def __init__(self, year: int, month: int, day: int):\n        self.year = int(year)\n        self.month = int(month)\n        self.day = int(day)\n        \n    @classmethod\n    def from_iso(cls, iso_str: str):\n        y, m, d = map(int, iso_str.split(\"-\"))\n        return cls(y, m, d)",
      "testCases": [
        {
          "input": "d = SimpleDate.from_iso(\"2026-10-18\"); (d.year, d.month, d.day)",
          "expectedOutput": "(2026, 10, 18)"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "    @staticmethod",
        "codeSnippet": "    @staticmethod",
        "explanation": "Decorator converting method to a plain function within class namespace."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    def is_prime(n: int) -> bool:",
        "codeSnippet": "    def is_prime(n: int) -> bool:",
        "explanation": "Notice no self or cls parameter."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "print(\"Is 17 prime?\", MathOps.is_prime(17))",
        "codeSnippet": "print(\"Is 17 prime?\", MathOps.is_prime(17))",
        "explanation": "Called directly on class without instantiation."
      }
    ],
    "applications": [
      {
        "industry": "ORM Serializers",
        "application": "Django and Pydantic models constructing instances from dictionaries via `from_orm()` or `model_validate()`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "ORM Serializers",
        "description": "Django and Pydantic models constructing instances from dictionaries via `from_orm()` or `model_validate()`."
      },
      {
        "industry": "Dataclass Converters",
        "application": "Parsing ISO 8601 timestamps and payloads into typed objects.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Dataclass Converters",
        "description": "Parsing ISO 8601 timestamps and payloads into typed objects."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Distinguish between instance methods (receiving self), class methods (receiving cls), and static methods (receiving neither).",
        "Use @classmethod to implement alternative constructors (e.g. from_dict, from_json, from_timestamp).",
        "Use @staticmethod for self-contained utility functions that logically belong to the class namespace."
      ]
    }
  },
  "py-oop-encapsulation": {
    "id": "py-oop-encapsulation",
    "moduleId": "python-module-6",
    "title": "Encapsulation and Access Control",
    "subtitle": "_protected, __private Name Mangling, @property Getters/Setters, and __slots__",
    "order": 5,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Understand Python's access conventions: `_single_leading_underscore` (protected convention).",
      "Demystify `__double_leading_underscore` name mangling (`_ClassName__var`).",
      "Use `@property`, `@<name>.setter`, and `@<name>.deleter` to control attribute access and validation.",
      "Optimize object memory and restrict attribute addition using `__slots__`."
    ],
    "prerequisites": [
      "Python OOP basics and constructors."
    ],
    "analogy": {
      "title": "The Thermostat with Built-in Safeguards",
      "text": "A naive class lets anyone twist the copper coils directly (raw public attribute), risking setting the temperature to 500 degrees or negative 50. Encapsulation with `@property` places a clean digital thermostat panel over the wall. You still say `heater.temperature = 72`, but behind the panel, validation circuits verify the temperature is between 50 and 90 before adjusting the furnace.",
      "metaphor": "@property turns method calls into natural attribute access with transparent validation."
    },
    "problemSolved": {
      "title": "Data Hiding and Safe Invariant Enforcement Without Breaking APIs",
      "description": "In Java or C++, developers write boilerplate `getTemperature()` and `setTemperature()` methods from day one. Python's `@property` allows starting with plain public attributes, and upgrading to getters/setters later without breaking existing caller code.",
      "keyPoints": [
        "`_attr` is a gentlemen's agreement: \"internal use only; do not touch outside the class\".",
        "`__attr` triggers name mangling to prevent accidental name collisions in subclasses.",
        "`@property` defines a getter; `@attr.setter` defines a setter.",
        "`__slots__` replaces `__dict__` with a fixed tuple of pointers, reducing RAM by ~60%."
      ]
    },
    "intuition": {
      "overview": "The descriptor protocol powers `@property`. Reading `obj.x` executes the getter method; assigning `obj.x = val` executes the setter method.",
      "steps": [
        {
          "step": 1,
          "title": "Property Lookup",
          "description": "Python sees `x` is a property descriptor on the class."
        },
        {
          "step": 2,
          "title": "Getter Execution",
          "description": "Invokes getter function passing `self`."
        },
        {
          "step": 3,
          "title": "Setter Validation",
          "description": "When writing `obj.x = v`, calls setter method to validate and store into private `_x`."
        }
      ]
    },
    "codeExample": {
      "title": "Using @property and Name Mangling",
      "code": "class Temperature:\n    def __init__(self, celsius: float = 0.0):\n        self._celsius = float(celsius) # Protected backing attribute\n\n    @property\n    def celsius(self) -> float:\n        \"\"\"Getter for celsius.\"\"\"\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value: float):\n        \"\"\"Setter with validation.\"\"\"\n        if value < -273.15:\n            raise ValueError(\"Temperature below absolute zero is impossible!\")\n        self._celsius = float(value)\n\n    @property\n    def fahrenheit(self) -> float:\n        \"\"\"Computed property.\"\"\"\n        return (self._celsius * 9 / 5) + 32\n\nt = Temperature(25.0)\nprint(f\"Celsius: {t.celsius}°C, Fahrenheit: {t.fahrenheit}°F\")\nt.celsius = 30.0 # Invokes setter transparently\nprint(\"Updated fahrenheit:\", t.fahrenheit)",
      "explanation": "Demonstrates getter, setter with validation, and a read-only computed property."
    },
    "runnableCode": {
      "code": "class SecretVault:\n    def __init__(self, code):\n        self.__code = code # Name mangled\n\nv = SecretVault(1234)\n# Direct access fails\ntry:\n    print(v.__code)\nexcept AttributeError as e:\n    print(\"Direct access raised:\", type(e).__name__)\n\n# Mangled access works (proves Python has no true private)\nprint(\"Mangled access:\", v._SecretVault__code)",
      "expectedOutput": "Direct access raised: AttributeError\nMangled access: 1234"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "        self.__code = code",
        "codeSnippet": "        self.__code = code",
        "explanation": "Double underscore triggers CPython compiler to mangle name to _SecretVault__code."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "    print(v.__code)",
        "codeSnippet": "    print(v.__code)",
        "explanation": "Looking for __code on v raises AttributeError because attribute was renamed."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"Mangled access:\", v._SecretVault__code)",
        "codeSnippet": "print(\"Mangled access:\", v._SecretVault__code)",
        "explanation": "Shows name mangling is for collision avoidance, not true security."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Naming the backing variable the same as the property: `self.celsius = celsius` inside `set celsius`.",
        "solution": "Name the private backing variable with a leading underscore: `self._celsius = value`.",
        "whyWrong": "Calls the setter recursively inside itself, resulting in `RecursionError: maximum recursion depth exceeded`.",
        "howToFix": "Name the private backing variable with a leading underscore: `self._celsius = value`."
      },
      {
        "mistake": "Assuming `__private` attributes provide cryptographic security against inspection.",
        "solution": "Treat encapsulation as an architectural safety guardrail, not data encryption.",
        "whyWrong": "Anyone can still access `obj._ClassName__private_var`. Python relies on convention.",
        "howToFix": "Treat encapsulation as an architectural safety guardrail, not data encryption."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Data Validation in Models",
        "description": "Validating email formats, zip codes, and positive balances upon assignment."
      },
      {
        "title": "High-Performance Micro-Objects",
        "description": "Using `__slots__` for millions of vector point objects in game engines to eliminate `__dict__` overhead."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-encapsulation-pq1",
        "question": "How does CPython mangle double-underscore attributes like `__secret` on a class `Vault`?",
        "hint": "Leading underscore and class name prefix.",
        "answer": "It renames them to `_Vault__secret`."
      },
      {
        "id": "py-oop-encapsulation-pq2",
        "question": "What is the purpose of defining `__slots__` on a class?",
        "hint": "Memory and dict avoidance.",
        "answer": "It prevents the dynamic creation of `__dict__`, reducing memory usage and restricting allowed attributes to a predefined set."
      },
      {
        "id": "py-oop-encapsulation-pq3",
        "question": "Can you create a read-only attribute using `@property`?",
        "hint": "Omit setter.",
        "answer": "Yes, define a `@property` getter without defining a corresponding `@<name>.setter`."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-encapsulation-q1",
        "question": "What happens when you try to assign to a property that has no setter method?",
        "options": [
          "AttributeError: can't set attribute",
          "It silently overwrites the property",
          "ValueError is raised",
          "A new instance attribute is created"
        ],
        "correctIndex": 0,
        "explanation": "Attempting to assign to a read-only property raises `AttributeError: can't set attribute`."
      },
      {
        "id": "py-oop-encapsulation-q2",
        "question": "Why does Python support name mangling for `__attributes`?",
        "options": [
          "To implement cryptographically secure data privacy",
          "To prevent accidental attribute overriding in subclasses",
          "To compile the attribute to C memory",
          "To speed up attribute lookups"
        ],
        "correctIndex": 1,
        "explanation": "Name mangling was designed to prevent name clashes when subclasses override methods or attributes."
      },
      {
        "id": "py-oop-encapsulation-q3",
        "question": "What is the convention for an attribute intended for internal use only?",
        "options": [
          "A single leading underscore `_attr`",
          "A single trailing underscore `attr_`",
          "Capital letters `ATTR`",
          "No underscore"
        ],
        "correctIndex": 0,
        "explanation": "PEP 8 specifies a single leading underscore `_attr` as the convention for protected/internal members."
      }
    ],
    "codingChallenge": {
      "title": "Encapsulated Wallet Balance",
      "problem": "Write a class `Wallet` with a private backing attribute `_balance: float` initialized via `__init__(initial_balance: float = 0.0)`. Create a `@property` `balance` with a getter and setter. The setter must ensure the new balance is non-negative (raising `ValueError(\"Balance cannot be negative\")` if < 0) and round the stored value to 2 decimal places.",
      "hints": [
        "Define __init__ setting self.balance = initial_balance (triggers setter).",
        "Define @property def balance(self): return self._balance.",
        "Define @balance.setter def balance(self, val): validate >= 0 and round(val, 2)."
      ],
      "starterCode": "class Wallet:\n    # Write your solution here\n    pass",
      "solution": "class Wallet:\n    def __init__(self, initial_balance: float = 0.0):\n        self.balance = initial_balance\n        \n    @property\n    def balance(self) -> float:\n        return self._balance\n        \n    @balance.setter\n    def balance(self, value: float):\n        if value < 0:\n            raise ValueError(\"Balance cannot be negative\")\n        self._balance = round(float(value), 2)",
      "testCases": [
        {
          "input": "w = Wallet(10.555); w.balance",
          "expectedOutput": "10.56"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "        self.__code = code",
        "codeSnippet": "        self.__code = code",
        "explanation": "Double underscore triggers CPython compiler to mangle name to _SecretVault__code."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "    print(v.__code)",
        "codeSnippet": "    print(v.__code)",
        "explanation": "Looking for __code on v raises AttributeError because attribute was renamed."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"Mangled access:\", v._SecretVault__code)",
        "codeSnippet": "print(\"Mangled access:\", v._SecretVault__code)",
        "explanation": "Shows name mangling is for collision avoidance, not true security."
      }
    ],
    "applications": [
      {
        "industry": "Data Validation in Models",
        "application": "Validating email formats, zip codes, and positive balances upon assignment.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Data Validation in Models",
        "description": "Validating email formats, zip codes, and positive balances upon assignment."
      },
      {
        "industry": "High-Performance Micro-Objects",
        "application": "Using `__slots__` for millions of vector point objects in game engines to eliminate `__dict__` overhead.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "High-Performance Micro-Objects",
        "description": "Using `__slots__` for millions of vector point objects in game engines to eliminate `__dict__` overhead."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand Python's access conventions: `_single_leading_underscore` (protected convention).",
        "Demystify `__double_leading_underscore` name mangling (`_ClassName__var`).",
        "Use `@property`, `@<name>.setter`, and `@<name>.deleter` to control attribute access and validation."
      ]
    }
  },
  "py-oop-inheritance": {
    "id": "py-oop-inheritance",
    "moduleId": "python-module-6",
    "title": "Inheritance",
    "subtitle": "Single and Multilevel Inheritance, super(), Method Overriding, and isinstance()",
    "order": 6,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "oop-diagram",
    "objectives": [
      "Model \"is-a\" relationships by deriving subclasses from base classes: `class Sub(Base):`.",
      "Delegate initialization and method calls to parent classes using `super()`.",
      "Override parent methods to specialize behavior in subclasses.",
      "Inspect runtime types safely using `isinstance(obj, Class)` and `issubclass(Sub, Base)`."
    ],
    "prerequisites": [
      "Python classes, self, and constructors."
    ],
    "analogy": {
      "title": "The Biological Taxonomy Tree",
      "text": "A Mammal has warm blood and feeds milk to its offspring (base class traits). A Whale is a Mammal (subclass): it inherits warm blood and milk production from Mammal, but overrides the standard walking limbs with flippers, and adds specialized echolocation systems.",
      "metaphor": "Inheritance allows specialized subclasses to inherit and extend base class capabilities."
    },
    "problemSolved": {
      "title": "Code Reuse and Polymorphic Hierarchies",
      "description": "Writing separate classes for Employee, Manager, and Contractor without inheritance results in massive duplication of common fields (name, id, salary). Base classes centralize shared logic.",
      "keyPoints": [
        "Subclasses inherit all attributes and methods of their base class.",
        "`super().__init__(...)` delegates constructor initialization up to the parent.",
        "Always prefer `isinstance(x, Base)` over strict identity checks `type(x) == Base` to respect inheritance."
      ]
    },
    "intuition": {
      "overview": "When accessing an attribute on a subclass instance, Python checks the subclass dictionary first; if not found, it traverses upward through the inheritance tree.",
      "steps": [
        {
          "step": 1,
          "title": "Derivation",
          "description": "`class Child(Parent):` establishes Child as a subtype of Parent."
        },
        {
          "step": 2,
          "title": "Delegation via super()",
          "description": "super() dynamically proxies calls to the next class in the MRO resolution chain."
        },
        {
          "step": 3,
          "title": "Specialization",
          "description": "Overriding methods replaces base implementations while preserving interfaces."
        }
      ]
    },
    "codeExample": {
      "title": "Employee and Manager Hierarchy with super()",
      "code": "class Employee:\n    def __init__(self, name: str, salary: float):\n        self.name = name\n        self.salary = salary\n\n    def get_details(self) -> str:\n        return f\"{self.name} earns ${self.salary:,.2f}\"\n\nclass Manager(Employee):\n    def __init__(self, name: str, salary: float, department: str):\n        super().__init__(name, salary)  # Delegates to Employee.__init__\n        self.department = department\n\n    def get_details(self) -> str:\n        # Overrides parent method while extending it\n        base_details = super().get_details()\n        return f\"{base_details} | Manages: {self.department}\"\n\nm = Manager(\"Sarah\", 125000.0, \"Engineering\")\nprint(m.get_details())\nprint(\"Is Employee?\", isinstance(m, Employee)) # True",
      "explanation": "Demonstrates single inheritance, calling `super().__init__()`, method overriding with `super().get_details()`, and `isinstance()`."
    },
    "runnableCode": {
      "code": "class Animal:\n    def speak(self):\n        return \"Generic animal noise\"\n\nclass Cat(Animal):\n    def speak(self):\n        return \"Meow!\"\n\na = Animal()\nc = Cat()\nprint(\"Animal speaks:\", a.speak())\nprint(\"Cat speaks:\", c.speak())\nprint(\"issubclass(Cat, Animal):\", issubclass(Cat, Animal))",
      "expectedOutput": "Animal speaks: Generic animal noise\nCat speaks: Meow!\nissubclass(Cat, Animal): True"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "class Cat(Animal):",
        "codeSnippet": "class Cat(Animal):",
        "explanation": "Declares Cat inheriting from Animal."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "    def speak(self):",
        "codeSnippet": "    def speak(self):",
        "explanation": "Overrides speak() method."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"issubclass(Cat, Animal):\", issubclass(Cat, Animal))",
        "codeSnippet": "print(\"issubclass(Cat, Animal):\", issubclass(Cat, Animal))",
        "explanation": "Verifies inheritance relationship."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to call `super().__init__()` in a subclass.",
        "solution": "Always invoke `super().__init__(...)` as the first statement in subclass `__init__`.",
        "whyWrong": "Parent attributes are never initialized, causing `AttributeError` when accessing base fields.",
        "howToFix": "Always invoke `super().__init__(...)` as the first statement in subclass `__init__`."
      },
      {
        "mistake": "Checking types using `type(x) == Parent` instead of `isinstance(x, Parent)`.",
        "solution": "Always use `isinstance(x, Parent)`.",
        "whyWrong": "`type(x) == Parent` returns `False` for subclasses of Parent, breaking polymorphism.",
        "howToFix": "Always use `isinstance(x, Parent)`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Custom Exceptions",
        "description": "Subclassing `Exception` or `ValueError` to create domain-specific application errors."
      },
      {
        "title": "GUI Components",
        "description": "Subclassing `Button` or `Widget` in Qt/Tkinter to create custom styled UI components."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-inheritance-pq1",
        "question": "What does `super()` do in Python 3?",
        "hint": "Parent delegation.",
        "answer": "It returns a proxy object that delegates method calls to the next class in the Method Resolution Order (MRO)."
      },
      {
        "id": "py-oop-inheritance-pq2",
        "question": "What is the root ancestor of all classes in Python 3?",
        "hint": "Built-in base.",
        "answer": "The built-in `object` class."
      },
      {
        "id": "py-oop-inheritance-pq3",
        "question": "What does `issubclass(bool, int)` return in Python?",
        "hint": "Boolean type history.",
        "answer": "`True`, because `bool` is literally a subclass of `int` in Python."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-inheritance-q1",
        "question": "Which syntax correctly defines class `B` inheriting from class `A`?",
        "options": [
          "class B extends A:",
          "class B(A):",
          "class B inherits A:",
          "class B : public A"
        ],
        "correctIndex": 1,
        "explanation": "In Python, base classes are placed inside parentheses following the class name: `class B(A):`."
      },
      {
        "id": "py-oop-inheritance-q2",
        "question": "What is the recommended way to check if an object `obj` is an instance of `Parent` or any of its subclasses?",
        "options": [
          "type(obj) is Parent",
          "isinstance(obj, Parent)",
          "obj.__class__ == Parent",
          "Parent in type(obj)"
        ],
        "correctIndex": 1,
        "explanation": "`isinstance(obj, Parent)` handles inheritance hierarchies correctly."
      },
      {
        "id": "py-oop-inheritance-q3",
        "question": "Why should you call `super().__init__()` in a subclass constructor?",
        "options": [
          "To initialize base class attributes",
          "To register the class in sys.modules",
          "To free memory in the heap",
          "It is optional and does nothing"
        ],
        "correctIndex": 0,
        "explanation": "Without calling `super().__init__()`, the base class constructor is skipped and its attributes remain uninitialized."
      }
    ],
    "codingChallenge": {
      "title": "Custom Exception Hierarchy",
      "problem": "Create a custom exception hierarchy: A base exception `ApplicationError(Exception)` and a subclass `ValidationError(ApplicationError)` whose constructor accepts `field: str` and `message: str`, setting `self.field = field` and passing `f\"Validation failed on {field}: {message}\"` to `super().__init__()`.",
      "hints": [
        "Accept field and message in __init__.",
        "Assign self.field = field.",
        "Call super().__init__(f\"Validation failed on {field}: {message}\")."
      ],
      "starterCode": "class ApplicationError(Exception):\n    pass\n\nclass ValidationError(ApplicationError):\n    # Write your solution here\n    pass",
      "solution": "class ApplicationError(Exception):\n    pass\n\nclass ValidationError(ApplicationError):\n    def __init__(self, field: str, message: str):\n        self.field = field\n        super().__init__(f\"Validation failed on {field}: {message}\")",
      "testCases": [
        {
          "input": "e = ValidationError(\"email\", \"missing @\"); (str(e), isinstance(e, ApplicationError))",
          "expectedOutput": "(\"Validation failed on email: missing @\", True)"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "class Cat(Animal):",
        "codeSnippet": "class Cat(Animal):",
        "explanation": "Declares Cat inheriting from Animal."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "    def speak(self):",
        "codeSnippet": "    def speak(self):",
        "explanation": "Overrides speak() method."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"issubclass(Cat, Animal):\", issubclass(Cat, Animal))",
        "codeSnippet": "print(\"issubclass(Cat, Animal):\", issubclass(Cat, Animal))",
        "explanation": "Verifies inheritance relationship."
      }
    ],
    "applications": [
      {
        "industry": "Custom Exceptions",
        "application": "Subclassing `Exception` or `ValueError` to create domain-specific application errors.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Custom Exceptions",
        "description": "Subclassing `Exception` or `ValueError` to create domain-specific application errors."
      },
      {
        "industry": "GUI Components",
        "application": "Subclassing `Button` or `Widget` in Qt/Tkinter to create custom styled UI components.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "GUI Components",
        "description": "Subclassing `Button` or `Widget` in Qt/Tkinter to create custom styled UI components."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Model \"is-a\" relationships by deriving subclasses from base classes: `class Sub(Base):`.",
        "Delegate initialization and method calls to parent classes using `super()`.",
        "Override parent methods to specialize behavior in subclasses."
      ]
    }
  },
  "py-oop-polymorphism": {
    "id": "py-oop-polymorphism",
    "moduleId": "python-module-6",
    "title": "Polymorphism and Method Overriding",
    "subtitle": "Duck Typing, Runtime Polymorphism, and Protocols vs Concrete Interfaces",
    "order": 7,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "oop-diagram",
    "objectives": [
      "Understand runtime polymorphism: invoking the same method name across different types.",
      "Embrace Python's core philosophy: Duck Typing (\"If it walks like a duck and quacks like a duck, it is a duck\").",
      "Implement polymorphic dispatch without rigid inheritance trees.",
      "Compare duck typing with EAFP (Easier to Ask for Forgiveness than Permission)."
    ],
    "prerequisites": [
      "Python inheritance and classes."
    ],
    "analogy": {
      "title": "The Universal USB-C Port",
      "text": "A laptop doesn't care if the device plugged into its USB-C port is an external hard drive, a webcam, a keyboard, or a synthesizer. As long as the device speaks the USB protocol (implements read and write data), the laptop communicates with it seamlessly. The laptop doesn't demand that the device descend from an \"OfficialLaptopPeripheral\" inheritance class.",
      "metaphor": "Polymorphism allows functions to accept any object providing the expected interface."
    },
    "problemSolved": {
      "title": "Decoupled, Flexible Architectures Without Rigid Inheritance",
      "description": "In statically typed languages like Java, objects must explicitly implement a shared interface to be used polymorphically. Python's duck typing enables dynamic polymorphism: if an object has the required method, it works.",
      "keyPoints": [
        "Polymorphism means \"many forms\": code works with objects of different classes through a shared interface.",
        "Duck typing focuses on what an object can DO (its methods and behaviors), not what it IS (its inheritance tree).",
        "Python uses dynamic dispatch: method lookups are resolved at runtime."
      ]
    },
    "intuition": {
      "overview": "Python function calls look up attributes dynamically on the target object. As long as `obj.render()` exists, the renderer function doesn't care what class `obj` belongs to.",
      "steps": [
        {
          "step": 1,
          "title": "Interface Agreement",
          "description": "Multiple distinct classes implement a method with identical signature (e.g. `draw()`)."
        },
        {
          "step": 2,
          "title": "Collection",
          "description": "Heterogeneous objects are placed into a single list."
        },
        {
          "step": 3,
          "title": "Polymorphic Iteration",
          "description": "A single loop invokes `.draw()` on each object; each executes its own behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Polymorphic Audio Exporter via Duck Typing",
      "code": "class MP3Audio:\n    def export(self, filename: str) -> str:\n        return f\"Exporting {filename}.mp3 (compressed 320kbps)\"\n\nclass FLACAudio:\n    def export(self, filename: str) -> str:\n        return f\"Exporting {filename}.flac (lossless 24-bit)\"\n\nclass WIDGETMockAudio: # Completely unrelated class!\n    def export(self, filename: str) -> str:\n        return f\"Mock export {filename} for testing\"\n\ndef render_track(audio_track, track_name: str):\n    \"\"\"Polymorphic function: works on any object with an export() method!\"\"\"\n    print(audio_track.export(track_name))\n\ntracks = [MP3Audio(), FLACAudio(), WIDGETMockAudio()]\nfor t in tracks:\n    render_track(t, \"song_01\")",
      "explanation": "Demonstrates duck typing where three unrelated classes all provide `.export()`, enabling polymorphic execution."
    },
    "runnableCode": {
      "code": "class Circle:\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14159 * self.r ** 2\n\nclass Square:\n    def __init__(self, s): self.s = s\n    def area(self): return self.s ** 2\n\nshapes = [Circle(2), Square(3)]\ntotal_area = sum(s.area() for s in shapes)\nprint(f\"Total combined area: {total_area:.2f}\")",
      "expectedOutput": "Total combined area: 21.57"
    },
    "lineByLine": [
      {
        "line": 7,
        "lines": "7",
        "code": "shapes = [Circle(2), Square(3)]",
        "codeSnippet": "shapes = [Circle(2), Square(3)]",
        "explanation": "List of heterogeneous shape objects."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "total_area = sum(s.area() for s in shapes)",
        "codeSnippet": "total_area = sum(s.area() for s in shapes)",
        "explanation": "Polymorphic call: invokes Circle.area() then Square.area()."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forcing unrelated classes into an artificial base class solely to achieve polymorphism.",
        "solution": "Rely on duck typing or `typing.Protocol` instead of deep inheritance.",
        "whyWrong": "Over-engineering inheritance hierarchies creates brittle, tightly coupled code.",
        "howToFix": "Rely on duck typing or `typing.Protocol` instead of deep inheritance."
      },
      {
        "mistake": "Using excessive `if isinstance(x, Circle): ... elif isinstance(x, Square): ...` checks.",
        "solution": "Put the polymorphic behavior inside each class and simply call `x.area()`.",
        "whyWrong": "Defeats the entire purpose of polymorphism and violates Open/Closed Principle.",
        "howToFix": "Put the polymorphic behavior inside each class and simply call `x.area()`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Payment Processing Gateways",
        "description": "Stripe, PayPal, and Crypto processors all implementing a polymorphic `charge(amount)` method."
      },
      {
        "title": "Serialization Engines",
        "description": "Custom objects implementing `.to_dict()` or `.json()` for API response serializers."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-polymorphism-pq1",
        "question": "What does \"duck typing\" mean in Python?",
        "hint": "Quacking ducks metaphor.",
        "answer": "An object's suitability is determined by the presence of certain methods and properties, rather than by its inheritance from a specific class."
      },
      {
        "id": "py-oop-polymorphism-pq2",
        "question": "What principle is violated when code relies on chained `if isinstance(...)` checks to determine behavior?",
        "hint": "SOLID principles.",
        "answer": "The Open/Closed Principle and Polymorphism principles."
      },
      {
        "id": "py-oop-polymorphism-pq3",
        "question": "How can you formally specify duck-typed interfaces in modern Python 3.8+?",
        "hint": "Typing module feature.",
        "answer": "Using `typing.Protocol` (structural subtyping)."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-polymorphism-q1",
        "question": "In Python, must two classes share a common parent class to be used polymorphically?",
        "options": [
          "Yes, always",
          "No, duck typing allows any objects with matching method signatures to be used polymorphically",
          "Only if they inherit from ABC",
          "Only in Python 2"
        ],
        "correctIndex": 1,
        "explanation": "Duck typing allows any objects with the expected methods to be used polymorphically without a shared parent."
      },
      {
        "id": "py-oop-polymorphism-q2",
        "question": "What is the primary benefit of polymorphism?",
        "options": [
          "Reduces memory footprint to O(1)",
          "Allows writing code that operates on multiple types without modification when new types are added",
          "Enables compiled C performance",
          "Eliminates garbage collection"
        ],
        "correctIndex": 1,
        "explanation": "Polymorphism allows calling code to remain decoupled and open to extension with new types."
      },
      {
        "id": "py-oop-polymorphism-q3",
        "question": "What Python philosophy is closely aligned with duck typing?",
        "options": [
          "LBYL (Look Before You Leap)",
          "EAFP (Easier to Ask for Forgiveness than Permission)",
          "Explicit is better than implicit",
          "Flat is better than nested"
        ],
        "correctIndex": 1,
        "explanation": "EAFP (\"try calling the method, handle AttributeError if missing\") is the behavioral twin of duck typing."
      }
    ],
    "codingChallenge": {
      "title": "Polymorphic Notification Service",
      "problem": "Create two classes `EmailNotifier` and `SMSNotifier`. Each must implement `send(recipient: str, message: str) -> str`. `EmailNotifier` returns `\"Email to {recipient}: {message}\"` and `SMSNotifier` returns `\"SMS to {recipient}: {message}\"`. Write a function `dispatch_alerts(notifiers: list, recipient: str, message: str) -> list[str]` that polymorphically calls `send` on all notifiers.",
      "hints": [
        "Implement send() on both classes.",
        "In dispatch_alerts, return [n.send(recipient, message) for n in notifiers]."
      ],
      "starterCode": "class EmailNotifier:\n    pass\n\nclass SMSNotifier:\n    pass\n\ndef dispatch_alerts(notifiers: list, recipient: str, message: str) -> list[str]:\n    # Write your solution here\n    pass",
      "solution": "class EmailNotifier:\n    def send(self, recipient: str, message: str) -> str:\n        return f\"Email to {recipient}: {message}\"\n\nclass SMSNotifier:\n    def send(self, recipient: str, message: str) -> str:\n        return f\"SMS to {recipient}: {message}\"\n\ndef dispatch_alerts(notifiers: list, recipient: str, message: str) -> list[str]:\n    return [n.send(recipient, message) for n in notifiers]",
      "testCases": [
        {
          "input": "dispatch_alerts([EmailNotifier(), SMSNotifier()], \"user@x.com\", \"Server down\")",
          "expectedOutput": "[\"Email to user@x.com: Server down\", \"SMS to user@x.com: Server down\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 7,
        "lines": "7",
        "code": "shapes = [Circle(2), Square(3)]",
        "codeSnippet": "shapes = [Circle(2), Square(3)]",
        "explanation": "List of heterogeneous shape objects."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "total_area = sum(s.area() for s in shapes)",
        "codeSnippet": "total_area = sum(s.area() for s in shapes)",
        "explanation": "Polymorphic call: invokes Circle.area() then Square.area()."
      }
    ],
    "applications": [
      {
        "industry": "Payment Processing Gateways",
        "application": "Stripe, PayPal, and Crypto processors all implementing a polymorphic `charge(amount)` method.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Payment Processing Gateways",
        "description": "Stripe, PayPal, and Crypto processors all implementing a polymorphic `charge(amount)` method."
      },
      {
        "industry": "Serialization Engines",
        "application": "Custom objects implementing `.to_dict()` or `.json()` for API response serializers.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Serialization Engines",
        "description": "Custom objects implementing `.to_dict()` or `.json()` for API response serializers."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand runtime polymorphism: invoking the same method name across different types.",
        "Embrace Python's core philosophy: Duck Typing (\"If it walks like a duck and quacks like a duck, it is a duck\").",
        "Implement polymorphic dispatch without rigid inheritance trees."
      ]
    }
  },
  "py-oop-abstraction": {
    "id": "py-oop-abstraction",
    "moduleId": "python-module-6",
    "title": "Abstract Classes and Abstraction",
    "subtitle": "abc Module, ABC Base Class, @abstractmethod, and Interface Enforcement",
    "order": 8,
    "readTimeMinutes": 22,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Define formal abstract base classes using `from abc import ABC, abstractmethod`.",
      "Enforce interface contracts: understand why instantiating a subclass missing abstract methods raises TypeError.",
      "Define abstract properties with `@property` combined with `@abstractmethod`.",
      "Recognize when to enforce contracts with ABCs versus relying on duck typing."
    ],
    "prerequisites": [
      "Python OOP, inheritance, and decorators."
    ],
    "analogy": {
      "title": "The Architectural Blueprints and Building Code",
      "text": "An Abstract Base Class is a municipal building code specification for a commercial skyscraper. It specifies that any building MUST have an emergency fire exit, an elevator shaft, and a sprinkler system (`@abstractmethod`). You cannot live inside a blueprint (you cannot instantiate an ABC). But when a developer builds an actual building (concrete subclass), the city inspector will not grant an occupancy permit until every required specification is physically constructed.",
      "metaphor": "ABCs define mandatory contracts that concrete subclasses must implement."
    },
    "problemSolved": {
      "title": "Guaranteed Interface Compliance Across Large Engineering Teams",
      "description": "Duck typing works well for small scripts, but in large codebases with dozens of developers, forgetting to implement a required method results in runtime crashes hours into production. ABCs catch missing methods immediately at instantiation time.",
      "keyPoints": [
        "Classes inheriting from `ABC` that define `@abstractmethod` cannot be instantiated directly.",
        "Subclasses MUST override all abstract methods to become concrete instantiable classes.",
        "`TypeError: Can't instantiate abstract class ... with abstract method ...` is raised immediately on `SubClass()` if any method is missing."
      ]
    },
    "intuition": {
      "overview": "CPython's ABCMeta metaclass inspects the class during definition and maintains a `__abstractmethods__` frozenset. If this set is non-empty upon instantiation, `__new__` raises TypeError.",
      "steps": [
        {
          "step": 1,
          "title": "Contract Definition",
          "description": "Base class inherits from `ABC` and marks signatures with `@abstractmethod`."
        },
        {
          "step": 2,
          "title": "Subclass Declaration",
          "description": "Concrete class inherits from the ABC and implements required methods."
        },
        {
          "step": 3,
          "title": "Instantiation Verification",
          "description": "CPython checks if all abstract methods are implemented before allowing instance allocation."
        }
      ]
    },
    "codeExample": {
      "title": "Database Storage Interface using ABC",
      "code": "from abc import ABC, abstractmethod\n\nclass BaseRepository(ABC):\n    @abstractmethod\n    def save(self, entity_id: str, data: dict) -> bool:\n        \"\"\"Persist data.\"\"\"\n        pass\n\n    @abstractmethod\n    def get_by_id(self, entity_id: str) -> dict | None:\n        \"\"\"Retrieve data by ID.\"\"\"\n        pass\n\nclass InMemoryRepository(BaseRepository):\n    def __init__(self):\n        self._store = {}\n\n    def save(self, entity_id: str, data: dict) -> bool:\n        self._store[entity_id] = data\n        return True\n\n    def get_by_id(self, entity_id: str) -> dict | None:\n        return self._store.get(entity_id)\n\nrepo = InMemoryRepository()\nrepo.save(\"u1\", {\"name\": \"Alice\"})\nprint(\"Fetched:\", repo.get_by_id(\"u1\"))",
      "explanation": "Demonstrates defining an ABC contract with @abstractmethod and implementing a concrete subclass."
    },
    "runnableCode": {
      "code": "from abc import ABC, abstractmethod\n\nclass Plugin(ABC):\n    @abstractmethod\n    def run(self):\n        pass\n\nclass IncompletePlugin(Plugin):\n    pass # Forgot to implement run()!\n\ntry:\n    p = IncompletePlugin()\nexcept TypeError as e:\n    print(\"Caught instantiation error:\")\n    print(e)",
      "expectedOutput": "Caught instantiation error:\nCan't instantiate abstract class IncompletePlugin without an implementation for abstract method 'run'"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "class Plugin(ABC):",
        "codeSnippet": "class Plugin(ABC):",
        "explanation": "Defines Abstract Base Class inheriting from ABC."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "    @abstractmethod",
        "codeSnippet": "    @abstractmethod",
        "explanation": "Marks run() as mandatory abstract method."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "class IncompletePlugin(Plugin):",
        "codeSnippet": "class IncompletePlugin(Plugin):",
        "explanation": "Subclass fails to implement run()."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "    p = IncompletePlugin()",
        "codeSnippet": "    p = IncompletePlugin()",
        "explanation": "CPython intercepts instantiation and raises TypeError."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `@abstractmethod` without inheriting from `ABC` (or setting `metaclass=ABCMeta`).",
        "solution": "Ensure the base class inherits from `abc.ABC`.",
        "whyWrong": "The `@abstractmethod` decorator is ignored; the class can still be instantiated freely without error.",
        "howToFix": "Ensure the base class inherits from `abc.ABC`."
      },
      {
        "mistake": "Putting `@property` inside `@abstractmethod`: `@abstractmethod @property`.",
        "solution": "Always place `@property` as the outer decorator: `@property @abstractmethod`.",
        "whyWrong": "Incorrect decorator ordering.",
        "howToFix": "Always place `@property` as the outer decorator: `@property @abstractmethod`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Plugin Architectures",
        "description": "Enforcing that third-party plugin extensions implement all lifecycle hooks (init, execute, teardown)."
      },
      {
        "title": "Machine Learning Estimators",
        "description": "Scikit-learn `BaseEstimator` requiring `fit(X, y)` and `predict(X)`."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-abstraction-pq1",
        "question": "What error is raised when attempting to instantiate an ABC with unimplemented abstract methods?",
        "hint": "Type check exception.",
        "answer": "`TypeError: Can't instantiate abstract class ... with abstract method ...`."
      },
      {
        "id": "py-oop-abstraction-pq2",
        "question": "Can an abstract method contain an actual implementation body in the ABC?",
        "hint": "super() in abstract methods.",
        "answer": "Yes, an abstract method can provide a common default implementation that subclasses can invoke via `super().method()`."
      },
      {
        "id": "py-oop-abstraction-pq3",
        "question": "What module in Python provides ABC functionality?",
        "hint": "Three-letter module name.",
        "answer": "The standard library `abc` module."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-abstraction-q1",
        "question": "Which class must a class inherit from to enforce abstract methods in Python?",
        "options": [
          "object",
          "abc.ABC",
          "interface",
          "Contract"
        ],
        "correctIndex": 1,
        "explanation": "Inheriting from `abc.ABC` sets `ABCMeta` as the metaclass, which enforces abstract methods."
      },
      {
        "id": "py-oop-abstraction-q2",
        "question": "When is the check for implemented abstract methods performed?",
        "options": [
          "At import time",
          "At instantiation time (when `Class()` is called)",
          "When the method is called",
          "During compilation to bytecode"
        ],
        "correctIndex": 1,
        "explanation": "The check happens dynamically when the class is instantiated (`__new__`)."
      },
      {
        "id": "py-oop-abstraction-q3",
        "question": "What is the correct syntax for an abstract property?",
        "options": [
          "@abstractproperty",
          "@property followed by @abstractmethod",
          "@abstractmethod followed by @property",
          "@abstract_prop"
        ],
        "correctIndex": 1,
        "explanation": "The modern idiom in Python 3 is stacking `@property` above `@abstractmethod`."
      }
    ],
    "codingChallenge": {
      "title": "Define Cache Storage Contract",
      "problem": "Using `abc.ABC` and `@abstractmethod`, write an abstract base class `BaseCache` with two abstract methods: `get(key: str) -> str | None` and `set(key: str, value: str) -> None`. Then create a concrete subclass `MemoryCache(BaseCache)` that implements both using an internal dictionary `self._cache`.",
      "hints": [
        "Define BaseCache(ABC) with @abstractmethod get and set.",
        "Define MemoryCache(BaseCache) initializing self._cache = {}.",
        "Implement get(k) and set(k, v)."
      ],
      "starterCode": "from abc import ABC, abstractmethod\n\n# Write your solution here",
      "solution": "from abc import ABC, abstractmethod\n\nclass BaseCache(ABC):\n    @abstractmethod\n    def get(self, key: str) -> str | None:\n        pass\n        \n    @abstractmethod\n    def set(self, key: str, value: str) -> None:\n        pass\n\nclass MemoryCache(BaseCache):\n    def __init__(self):\n        self._cache = {}\n        \n    def get(self, key: str) -> str | None:\n        return self._cache.get(key)\n        \n    def set(self, key: str, value: str) -> None:\n        self._cache[key] = value",
      "testCases": [
        {
          "input": "c = MemoryCache(); c.set(\"k1\", \"v1\"); c.get(\"k1\")",
          "expectedOutput": "\"v1\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "class Plugin(ABC):",
        "codeSnippet": "class Plugin(ABC):",
        "explanation": "Defines Abstract Base Class inheriting from ABC."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "    @abstractmethod",
        "codeSnippet": "    @abstractmethod",
        "explanation": "Marks run() as mandatory abstract method."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "class IncompletePlugin(Plugin):",
        "codeSnippet": "class IncompletePlugin(Plugin):",
        "explanation": "Subclass fails to implement run()."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "    p = IncompletePlugin()",
        "codeSnippet": "    p = IncompletePlugin()",
        "explanation": "CPython intercepts instantiation and raises TypeError."
      }
    ],
    "applications": [
      {
        "industry": "Plugin Architectures",
        "application": "Enforcing that third-party plugin extensions implement all lifecycle hooks (init, execute, teardown).",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Plugin Architectures",
        "description": "Enforcing that third-party plugin extensions implement all lifecycle hooks (init, execute, teardown)."
      },
      {
        "industry": "Machine Learning Estimators",
        "application": "Scikit-learn `BaseEstimator` requiring `fit(X, y)` and `predict(X)`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Machine Learning Estimators",
        "description": "Scikit-learn `BaseEstimator` requiring `fit(X, y)` and `predict(X)`."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Define formal abstract base classes using `from abc import ABC, abstractmethod`.",
        "Enforce interface contracts: understand why instantiating a subclass missing abstract methods raises TypeError.",
        "Define abstract properties with `@property` combined with `@abstractmethod`."
      ]
    }
  },
  "py-oop-composition": {
    "id": "py-oop-composition",
    "moduleId": "python-module-6",
    "title": "Composition vs Inheritance",
    "subtitle": "Favoring Composition Over Inheritance, Has-A Relationships, and Delegation",
    "order": 9,
    "readTimeMinutes": 22,
    "difficulty": "Advanced",
    "visualizerType": "oop-diagram",
    "objectives": [
      "Distinguish \"is-a\" relationships (inheritance) from \"has-a\" relationships (composition).",
      "Understand the classic Gang of Four principle: \"Favor object composition over class inheritance\".",
      "Avoid fragile base class problems and inheritance hierarchies that are too deep.",
      "Implement the delegation pattern where an outer class forwards calls to internal component instances."
    ],
    "prerequisites": [
      "Classes, objects, and inheritance basics."
    ],
    "analogy": {
      "title": "The Smartphone vs The Genetic Hybrid",
      "text": "Inheritance is like trying to breed a creature that is half-bird, half-fish, and half-bat so it can swim, fly, and walk. If the bird gene mutates, the fish behavior breaks. Composition is like building a smartphone: the phone HAS-A camera, HAS-A GPS chip, and HAS-A battery. If Sony invents a better camera module, you swap the camera component without rewriting the phone's operating system.",
      "metaphor": "Inheritance binds classes at compile-time; composition connects objects dynamically at runtime."
    },
    "problemSolved": {
      "title": "Preventing Fragile Base Class and Gorilla-Banana Problems",
      "description": "Joe Armstrong famously said: \"You wanted a banana, but what you got was a gorilla holding the banana and the entire jungle.\" Deep inheritance forces subclasses to inherit dozens of irrelevant methods. Composition lets you assemble exactly what you need.",
      "keyPoints": [
        "Inheritance models \"is-a\" (A Dog IS-A Animal).",
        "Composition models \"has-a\" (A Car HAS-A Engine).",
        "Composition allows swapping behaviors dynamically at runtime.",
        "Delegation passes work to internal components: `self.engine.start()`."
      ]
    },
    "intuition": {
      "overview": "Instead of inheriting from 5 different parent classes, an object holds references to independent helper instances and delegates tasks to them.",
      "steps": [
        {
          "step": 1,
          "title": "Component Identification",
          "description": "Break distinct responsibilities (logging, storage, serialization) into small independent classes."
        },
        {
          "step": 2,
          "title": "Injection",
          "description": "Pass component instances into the container object's `__init__` constructor."
        },
        {
          "step": 3,
          "title": "Delegation",
          "description": "The container invokes component methods when needed."
        }
      ]
    },
    "codeExample": {
      "title": "Car Composed of Engine and Transmission Components",
      "code": "class ElectricEngine:\n    def start(self) -> str:\n        return \"Silent electric hum (250 kW ready)\"\n\nclass V8Engine:\n    def start(self) -> str:\n        return \"V8 Roar! (450 HP ignited)\"\n\nclass Car:\n    \"\"\"Car HAS-AN Engine via composition.\"\"\"\n    def __init__(self, model: str, engine):\n        self.model = model\n        self.engine = engine  # Injected component\n\n    def drive(self) -> str:\n        # Delegation\n        engine_status = self.engine.start()\n        return f\"{self.model}: {engine_status} -> Rolling out!\"\n\ntesla = Car(\"Model S\", ElectricEngine())\nmustang = Car(\"Mustang GT\", V8Engine())\n\nprint(tesla.drive())\nprint(mustang.drive())",
      "explanation": "Demonstrates composing a Car with interchangeable engine components without inheritance coupling."
    },
    "runnableCode": {
      "code": "class ConsoleLogger:\n    def log(self, msg): print(f\"[LOG] {msg}\")\n\nclass UserService:\n    def __init__(self, logger=None):\n        self.logger = logger or ConsoleLogger() # Composition\n\n    def register_user(self, email):\n        self.logger.log(f\"Registering user: {email}\")\n        return True\n\nservice = UserService()\nservice.register_user(\"alex@example.com\")",
      "expectedOutput": "[LOG] Registering user: alex@example.com"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "        self.logger = logger or ConsoleLogger()",
        "codeSnippet": "        self.logger = logger or ConsoleLogger()",
        "explanation": "Stores logger component inside instance."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "        self.logger.log(f\"Registering user: {email}\")",
        "codeSnippet": "        self.logger.log(f\"Registering user: {email}\")",
        "explanation": "Delegates logging to component."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using inheritance simply to reuse 1 helper method: `class PaymentProcessor(EmailSender):`.",
        "solution": "Use composition: pass an `email_sender` instance to `PaymentProcessor`.",
        "whyWrong": "A PaymentProcessor is NOT an EmailSender; inheritance breaks domain modeling and leaks unwanted methods.",
        "howToFix": "Use composition: pass an `email_sender` instance to `PaymentProcessor`."
      },
      {
        "mistake": "Deep inheritance hierarchies (> 3 levels: A -> B -> C -> D -> E).",
        "solution": "Flatten hierarchies and compose components.",
        "whyWrong": "Makes debugging MRO and tracing method definitions nearly impossible.",
        "howToFix": "Flatten hierarchies and compose components."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Dependency Injection",
        "description": "Injecting database clients, cache layers, and notification services into FastAPI controllers."
      },
      {
        "title": "Game Development (Entity Component Systems)",
        "description": "Entities composed of HealthComponent, RenderComponent, and PhysicsComponent."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-composition-pq1",
        "question": "What is the relationship modeled by composition?",
        "hint": "Is-a or has-a?",
        "answer": "\"Has-a\" relationship (e.g. Order HAS-A Customer)."
      },
      {
        "id": "py-oop-composition-pq2",
        "question": "What is the \"Fragile Base Class\" problem?",
        "hint": "Base class changes breaking subclasses.",
        "answer": "When modifying an internal detail in a base class inadvertently breaks subclasses that relied on that internal behavior."
      },
      {
        "id": "py-oop-composition-pq3",
        "question": "What is delegation?",
        "hint": "Forwarding requests.",
        "answer": "A design pattern where an object handles a request by delegating it to an internal component object."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-composition-q1",
        "question": "Which design guideline summarizes the composition principle?",
        "options": [
          "Always inherit from at least 3 classes",
          "Favor object composition over class inheritance",
          "Never use classes in Python",
          "Inheritance is always faster than composition"
        ],
        "correctIndex": 1,
        "explanation": "The Gang of Four design principle states: \"Favor object composition over class inheritance\"."
      },
      {
        "id": "py-oop-composition-q2",
        "question": "If a `Computer` contains a `CPU`, `RAM`, and `HardDrive`, what design pattern is this?",
        "options": [
          "Multilevel Inheritance",
          "Composition",
          "Abstract Metaclass",
          "Singleton"
        ],
        "correctIndex": 1,
        "explanation": "The Computer \"has-a\" CPU, RAM, and HardDrive, representing composition."
      },
      {
        "id": "py-oop-composition-q3",
        "question": "Why is composition more flexible than inheritance at runtime?",
        "options": [
          "Components can be swapped dynamically on an instance without modifying classes",
          "Composition avoids RAM allocation",
          "It disables Python's GIL",
          "It runs in parallel threads"
        ],
        "correctIndex": 0,
        "explanation": "Composition allows swapping internal component objects at runtime (`obj.logger = CloudLogger()`)."
      }
    ],
    "codingChallenge": {
      "title": "Build Secure Authorizer via Composition",
      "problem": "Create a validator component `TokenValidator` with method `is_valid(token: str) -> bool` (returns True if token starts with \"Bearer_\"). Then build a class `APIClient` that takes a `validator: TokenValidator` in `__init__`. Provide a method `execute_query(token: str, query: str) -> str` that checks validation, returning `\"Executed: {query}\"` if valid, or raising `PermissionError(\"Invalid token\")` if invalid.",
      "hints": [
        "In TokenValidator.is_valid: return token.startswith(\"Bearer_\").",
        "In APIClient.__init__: store self.validator = validator.",
        "In execute_query: if not self.validator.is_valid(token): raise PermissionError."
      ],
      "starterCode": "class TokenValidator:\n    # Write your solution here\n    pass\n\nclass APIClient:\n    # Write your solution here\n    pass",
      "solution": "class TokenValidator:\n    def is_valid(self, token: str) -> bool:\n        return token.startswith(\"Bearer_\")\n\nclass APIClient:\n    def __init__(self, validator: TokenValidator):\n        self.validator = validator\n        \n    def execute_query(self, token: str, query: str) -> str:\n        if not self.validator.is_valid(token):\n            raise PermissionError(\"Invalid token\")\n        return f\"Executed: {query}\"",
      "testCases": [
        {
          "input": "client = APIClient(TokenValidator()); client.execute_query(\"Bearer_123\", \"SELECT *\")",
          "expectedOutput": "\"Executed: SELECT *\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "        self.logger = logger or ConsoleLogger()",
        "codeSnippet": "        self.logger = logger or ConsoleLogger()",
        "explanation": "Stores logger component inside instance."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "        self.logger.log(f\"Registering user: {email}\")",
        "codeSnippet": "        self.logger.log(f\"Registering user: {email}\")",
        "explanation": "Delegates logging to component."
      }
    ],
    "applications": [
      {
        "industry": "Dependency Injection",
        "application": "Injecting database clients, cache layers, and notification services into FastAPI controllers.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Dependency Injection",
        "description": "Injecting database clients, cache layers, and notification services into FastAPI controllers."
      },
      {
        "industry": "Game Development (Entity Component Systems)",
        "application": "Entities composed of HealthComponent, RenderComponent, and PhysicsComponent.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Game Development (Entity Component Systems)",
        "description": "Entities composed of HealthComponent, RenderComponent, and PhysicsComponent."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Distinguish \"is-a\" relationships (inheritance) from \"has-a\" relationships (composition).",
        "Understand the classic Gang of Four principle: \"Favor object composition over class inheritance\".",
        "Avoid fragile base class problems and inheritance hierarchies that are too deep."
      ]
    }
  },
  "py-oop-mro": {
    "id": "py-oop-mro",
    "moduleId": "python-module-6",
    "title": "Method Resolution Order (MRO)",
    "subtitle": "C3 Linearization Algorithm, Multiple Inheritance, and the Diamond Problem",
    "order": 10,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "oop-diagram",
    "objectives": [
      "Understand Multiple Inheritance in Python and the classic Diamond Problem.",
      "Trace Method Resolution Order (MRO) using `Class.__mro__` and `Class.mro()`.",
      "Understand the C3 Linearization algorithm rules: local precedence order and monotonic inheritance.",
      "Use `super()` safely in cooperative multiple inheritance setups."
    ],
    "prerequisites": [
      "Python inheritance, super(), and classes."
    ],
    "analogy": {
      "title": "The Ancestry Lineage Arbitration Court",
      "text": "Imagine you inherit family heirlooms from both your Mother and Father, who in turn both descend from Grandma Rose (a diamond family tree). If a question arises about which family rule book to follow, you cannot follow two conflicting orders at once. C3 Linearization is the supreme arbiter: it writes down a single, unbending linear sequence guaranteeing that children are consulted before parents, and birth order of parents is strictly respected.",
      "metaphor": "MRO linearizes a directed acyclic graph of multiple inheritance into a single deterministic order."
    },
    "problemSolved": {
      "title": "Deterministic Resolution in Complex Multiple Inheritance Graphs",
      "description": "In languages like C++, the diamond problem causes duplicate base class instances and ambiguous calls. Python solves this elegantly using the C3 Linearization algorithm, ensuring every class is visited exactly once in a strictly predictable order.",
      "keyPoints": [
        "The Diamond Problem occurs when class `D` inherits from `B` and `C`, and both `B` and `C` inherit from `A`.",
        "Python guarantees subclasses appear before base classes in the MRO.",
        "If multiple parents are specified `class D(B, C):`, B's branch is searched before C's branch.",
        "`Class.__mro__` displays the exact resolution sequence."
      ]
    },
    "intuition": {
      "overview": "C3 Linearization computes the MRO of class C as: `L[C] = C + merge(L[B1], L[B2], ..., (B1, B2, ...))`, preserving local precedence and monotonicity.",
      "steps": [
        {
          "step": 1,
          "title": "Subclass Precedence",
          "description": "A class always appears before its parents."
        },
        {
          "step": 2,
          "title": "Parent Order",
          "description": "Parents listed in the class definition header maintain left-to-right priority."
        },
        {
          "step": 3,
          "title": "Consistency Check",
          "description": "If no linear ordering satisfies monotonicity, Python raises TypeError: Cannot create a consistent method resolution order."
        }
      ]
    },
    "codeExample": {
      "title": "The Diamond Problem and Inspecting __mro__",
      "code": "class A:\n    def ping(self):\n        print(\"A ping\")\n\nclass B(A):\n    def ping(self):\n        print(\"B ping\")\n        super().ping()\n\nclass C(A):\n    def ping(self):\n        print(\"C ping\")\n        super().ping()\n\nclass D(B, C):\n    def ping(self):\n        print(\"D ping\")\n        super().ping()\n\nd = D()\nd.ping()\n\nprint(\"\\nMRO Sequence:\")\nfor idx, cls in enumerate(D.__mro__):\n    print(f\"{idx}: {cls.__name__}\")",
      "explanation": "Shows cooperative multiple inheritance in a diamond diagram. Notice that `super().ping()` in B calls C, not A!"
    },
    "runnableCode": {
      "code": "class Base: pass\nclass Left(Base): pass\nclass Right(Base): pass\nclass Child(Left, Right): pass\n\nprint(\"MRO tuple:\", [c.__name__ for c in Child.__mro__])",
      "expectedOutput": "MRO tuple: ['Child', 'Left', 'Right', 'Base', 'object']"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "class Child(Left, Right): pass",
        "codeSnippet": "class Child(Left, Right): pass",
        "explanation": "Multiple inheritance inheriting from Left then Right."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "print(\"MRO tuple:\", [c.__name__ for c in Child.__mro__])",
        "codeSnippet": "print(\"MRO tuple:\", [c.__name__ for c in Child.__mro__])",
        "explanation": "Order is Child -> Left -> Right -> Base -> object."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming `super()` in a class always calls its immediate parent class.",
        "solution": "Always inspect `Class.__mro__` to understand the true execution path.",
        "whyWrong": "In cooperative multiple inheritance, `super()` calls the NEXT class in the overall MRO sequence (which may be a sibling class, not the parent!).",
        "howToFix": "Always inspect `Class.__mro__` to understand the true execution path."
      },
      {
        "mistake": "Creating impossible inheritance orders: `class X(A, B): pass; class Y(B, A): pass; class Z(X, Y): pass`.",
        "solution": "Ensure consistent left-to-right inheritance ordering across all subclasses.",
        "whyWrong": "Raises `TypeError: Cannot create a consistent method resolution order (MRO) for bases A, B`.",
        "howToFix": "Ensure consistent left-to-right inheritance ordering across all subclasses."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Django Mixins",
        "description": "Combining `LoginRequiredMixin`, `PermissionRequiredMixin`, and `DetailView` in class-based views."
      },
      {
        "title": "DRF Serializers",
        "description": "Combining validation mixins with base model serializers."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-mro-pq1",
        "question": "What algorithm does Python use to calculate Method Resolution Order?",
        "hint": "Algorithm named after a letter and number.",
        "answer": "The C3 Linearization algorithm."
      },
      {
        "id": "py-oop-mro-pq2",
        "question": "What attribute on a class object returns its MRO as a tuple?",
        "hint": "Dunder attribute.",
        "answer": "`Class.__mro__` (or the `Class.mro()` method)."
      },
      {
        "id": "py-oop-mro-pq3",
        "question": "What is the very last class in every Python 3 class MRO?",
        "hint": "Root of all objects.",
        "answer": "The `object` class."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-mro-q1",
        "question": "In `class D(B, C): pass`, which class method is checked first if overridden in both B and C?",
        "options": [
          "C",
          "B",
          "A (common parent)",
          "object"
        ],
        "correctIndex": 1,
        "explanation": "Python resolves parents from left to right as listed in the class header; B precedes C."
      },
      {
        "id": "py-oop-mro-q2",
        "question": "What exception is raised if an inheritance hierarchy has conflicting precedence that cannot be linearized?",
        "options": [
          "RecursionError",
          "TypeError",
          "HierarchyError",
          "AttributeError"
        ],
        "correctIndex": 1,
        "explanation": "Python raises `TypeError: Cannot create a consistent method resolution order (MRO)`."
      },
      {
        "id": "py-oop-mro-q3",
        "question": "What does `super()` do in the context of C3 MRO?",
        "options": [
          "Calls the root object class directly",
          "Calls the next class in the MRO of the instance from which the call originated",
          "Calls the leftmost parent only",
          "Restarts the method lookup from scratch"
        ],
        "correctIndex": 1,
        "explanation": "`super()` delegates to the next class in the active MRO sequence of the calling instance."
      }
    ],
    "codingChallenge": {
      "title": "Inspect Call Order in Cooperative Mixins",
      "problem": "Write three classes `LoggerMixin`, `AuthMixin`, and `ActionHandler`. `LoggerMixin.execute(self)` appends `\"logged\"` to `self.log` and calls `super().execute()`. `AuthMixin.execute(self)` appends `\"authed\"` to `self.log` and calls `super().execute()`. `ActionHandler.execute(self)` appends `\"action\"` to `self.log`. Create `SubClass(LoggerMixin, AuthMixin, ActionHandler)` and demonstrate that calling `.execute()` populates `self.log` with `[\"logged\", \"authed\", \"action\"]`.",
      "hints": [
        "In LoggerMixin: self.log.append(\"logged\"); super().execute().",
        "In AuthMixin: self.log.append(\"authed\"); super().execute().",
        "class SubClass(LoggerMixin, AuthMixin, ActionHandler): pass."
      ],
      "starterCode": "class ActionHandler:\n    def __init__(self):\n        self.log = []\n    def execute(self):\n        self.log.append(\"action\")\n\n# Complete LoggerMixin, AuthMixin, and SubClass",
      "solution": "class ActionHandler:\n    def __init__(self):\n        self.log = []\n    def execute(self):\n        self.log.append(\"action\")\n\nclass LoggerMixin:\n    def execute(self):\n        self.log.append(\"logged\")\n        super().execute()\n\nclass AuthMixin:\n    def execute(self):\n        self.log.append(\"authed\")\n        super().execute()\n\nclass SubClass(LoggerMixin, AuthMixin, ActionHandler):\n    pass",
      "testCases": [
        {
          "input": "s = SubClass(); s.execute(); s.log",
          "expectedOutput": "[\"logged\", \"authed\", \"action\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "class Child(Left, Right): pass",
        "codeSnippet": "class Child(Left, Right): pass",
        "explanation": "Multiple inheritance inheriting from Left then Right."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "print(\"MRO tuple:\", [c.__name__ for c in Child.__mro__])",
        "codeSnippet": "print(\"MRO tuple:\", [c.__name__ for c in Child.__mro__])",
        "explanation": "Order is Child -> Left -> Right -> Base -> object."
      }
    ],
    "applications": [
      {
        "industry": "Django Mixins",
        "application": "Combining `LoginRequiredMixin`, `PermissionRequiredMixin`, and `DetailView` in class-based views.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Django Mixins",
        "description": "Combining `LoginRequiredMixin`, `PermissionRequiredMixin`, and `DetailView` in class-based views."
      },
      {
        "industry": "DRF Serializers",
        "application": "Combining validation mixins with base model serializers.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "DRF Serializers",
        "description": "Combining validation mixins with base model serializers."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand Multiple Inheritance in Python and the classic Diamond Problem.",
        "Trace Method Resolution Order (MRO) using `Class.__mro__` and `Class.mro()`.",
        "Understand the C3 Linearization algorithm rules: local precedence order and monotonic inheritance."
      ]
    }
  },
  "py-oop-special-methods": {
    "id": "py-oop-special-methods",
    "moduleId": "python-module-6",
    "title": "Special Methods and Operator Overloading",
    "subtitle": "__str__, __repr__, __len__, __eq__, __add__, and the Python Data Model",
    "order": 11,
    "readTimeMinutes": 28,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Implement the core Python Data Model methods to make custom classes first-class Python citizens.",
      "Distinguish `__str__` (readable representation for users) from `__repr__` (unambiguous code representation for developers).",
      "Implement sequence and container protocols: `__len__`, `__getitem__`, `__contains__`.",
      "Overload arithmetic and comparison operators: `__add__`, `__eq__`, `__lt__`, `__hash__`."
    ],
    "prerequisites": [
      "Python OOP, encapsulation, and hashing concepts."
    ],
    "analogy": {
      "title": "The Universal Embassy Protocol Adapter",
      "text": "When foreign ambassadors arrive at an international summit, they don't invent custom greeting procedures. If the summit protocol calls for a handshake (`+`), the ambassador extends their hand (`__add__`). If the protocol calls for presenting credentials, the ambassador presents their passport (`__repr__`). Implementing dunder methods allows your custom class to integrate with all built-in Python syntax.",
      "metaphor": "Special methods (\"dunder methods\") bind your class into Python's operator syntax."
    },
    "problemSolved": {
      "title": "Making Custom Classes Idiomatic, Natural, and Pythonic",
      "description": "Without special methods, classes force developers to call verbose methods like `vec1.add_vector(vec2)` or `user.is_equal_to(other)`. Dunder methods allow natural expressions like `vec1 + vec2` and `user == other`.",
      "keyPoints": [
        "`__repr__` should ideally produce a valid Python string that could recreate the object `eval(repr(obj)) == obj`.",
        "Implementing `__eq__` causes Python to automatically set `__hash__ = None` unless explicitly implemented.",
        "Container dunder methods: `__len__`, `__getitem__`, `__setitem__`, `__contains__` enable slicing, indexing, and `in` checks."
      ]
    },
    "intuition": {
      "overview": "When Python encounters an operator like `a + b`, it looks up the dunder method on the left operand's type: `type(a).__add__(a, b)`.",
      "steps": [
        {
          "step": 1,
          "title": "Operator Parsing",
          "description": "Syntax parser encounters `len(x)` or `a == b`."
        },
        {
          "step": 2,
          "title": "Dunder Lookup",
          "description": "Calls `x.__len__()` or `a.__eq__(b)`."
        },
        {
          "step": 3,
          "title": "Fallback / Reflection",
          "description": "If `__eq__` returns `NotImplemented`, Python tries reflected method `b.__eq__(a)`."
        }
      ]
    },
    "codeExample": {
      "title": "Complete 2D Vector with Operator Overloading",
      "code": "class Vector2D:\n    def __init__(self, x: float, y: float):\n        self.x = float(x)\n        self.y = float(y)\n\n    def __repr__(self) -> str:\n        return f\"Vector2D({self.x}, {self.y})\"\n\n    def __str__(self) -> str:\n        return f\"({self.x}, {self.y})\"\n\n    def __add__(self, other):\n        if not isinstance(other, Vector2D):\n            return NotImplemented\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    def __eq__(self, other) -> bool:\n        if not isinstance(other, Vector2D):\n            return False\n        return self.x == other.x and self.y == other.y\n\n    def __abs__(self) -> float:\n        \"\"\"Magnitude of vector: abs(v).\"\"\"\n        return (self.x**2 + self.y**2) ** 0.5\n\nv1 = Vector2D(3, 4)\nv2 = Vector2D(1, 2)\nv3 = v1 + v2\nprint(\"v3 repr:\", repr(v3))\nprint(\"v3 str:\", str(v3))\nprint(\"Magnitude of v1:\", abs(v1))\nprint(\"v1 == Vector2D(3, 4):\", v1 == Vector2D(3, 4))",
      "explanation": "Demonstrates implementing __repr__, __str__, __add__, __eq__, and __abs__ on a mathematical Vector class."
    },
    "runnableCode": {
      "code": "class Playlist:\n    def __init__(self, songs):\n        self.songs = list(songs)\n\n    def __len__(self):\n        return len(self.songs)\n\n    def __getitem__(self, index):\n        return self.songs[index]\n\n    def __contains__(self, song):\n        return song in self.songs\n\np = Playlist([\"Song A\", \"Song B\", \"Song C\"])\nprint(\"Playlist length:\", len(p))\nprint(\"Second song:\", p[1])\nprint(\"Has 'Song A'?\", \"Song A\" in p)",
      "expectedOutput": "Playlist length: 3\nSecond song: Song B\nHas 'Song A'? True"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "    def __len__(self):",
        "codeSnippet": "    def __len__(self):",
        "explanation": "Allows calling len(p)."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "    def __getitem__(self, index):",
        "codeSnippet": "    def __getitem__(self, index):",
        "explanation": "Allows square-bracket indexing p[1] and slicing."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "    def __contains__(self, song):",
        "codeSnippet": "    def __contains__(self, song):",
        "explanation": "Allows \"Song A\" in p membership checks."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Implementing `__str__` without implementing `__repr__`.",
        "solution": "Always implement `__repr__` first. If `__str__` is omitted, Python falls back to `__repr__` automatically.",
        "whyWrong": "If `__repr__` is missing, Python falls back to `<MyClass object at 0x...>` in debuggers, lists, and interactive shells.",
        "howToFix": "Always implement `__repr__` first. If `__str__` is omitted, Python falls back to `__repr__` automatically."
      },
      {
        "mistake": "Raising TypeError inside `__add__` when operand type is unsupported.",
        "solution": "Return `NotImplemented` instead of raising an error.",
        "whyWrong": "Prevents Python from trying the reflected right-hand method `__radd__`.",
        "howToFix": "Return `NotImplemented` instead of raising an error."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Custom Container Collections",
        "description": "Building matrix math libraries, graph nodes, and geometry engines."
      },
      {
        "title": "SQL Query Builders",
        "description": "Overloading bitwise operators `&` and `|` for database filter combinations (like Django Q objects)."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-oop-special-methods-pq1",
        "question": "What is the rule of thumb for `__repr__` versus `__str__`?",
        "hint": "Target audience.",
        "answer": "`__repr__` is for developers (unambiguous, matches constructor code if possible); `__str__` is for end users (clean and readable)."
      },
      {
        "id": "py-oop-special-methods-pq2",
        "question": "What should an operator method return if it does not know how to handle the other operand?",
        "hint": "Special singleton return value.",
        "answer": "It should return the built-in singleton `NotImplemented`."
      },
      {
        "id": "py-oop-special-methods-pq3",
        "question": "What dunder method is called when using the `in` keyword on an object?",
        "hint": "Membership check.",
        "answer": "The `__contains__(self, item)` method."
      }
    ],
    "quiz": [
      {
        "id": "py-oop-special-methods-q1",
        "question": "If only `__repr__` is defined on a class, what does `str(obj)` output?",
        "options": [
          "<Object at 0x...>",
          "It falls back to the output of __repr__",
          "TypeError",
          "None"
        ],
        "correctIndex": 1,
        "explanation": "If `__str__` is not defined, Python automatically falls back to `__repr__`."
      },
      {
        "id": "py-oop-special-methods-q2",
        "question": "Which method overloads the `+` operator?",
        "options": [
          "__plus__",
          "__add__",
          "__concat__",
          "__sum__"
        ],
        "correctIndex": 1,
        "explanation": "`__add__` is the dunder method for the addition operator `+`."
      },
      {
        "id": "py-oop-special-methods-q3",
        "question": "What happens to `__hash__` when a class defines `__eq__` without explicitly defining `__hash__`?",
        "options": [
          "It uses the default object id hash",
          "Python sets __hash__ = None, making instances unhashable",
          "It computes hash from all attributes",
          "SyntaxError"
        ],
        "correctIndex": 1,
        "explanation": "Python automatically sets `__hash__ = None` to uphold the contract that equal objects must have equal hash values."
      }
    ],
    "codingChallenge": {
      "title": "Custom Money Class with Operator Overloading",
      "problem": "Write a class Money with attributes amount: float and currency: str. Implement __repr__ returning \"Money(amount, 'CUR')\" (amount with 2 decimal places), __add__ allowing adding two Money instances of the same currency (raise ValueError(\"Currency mismatch\") if different), and __eq__ comparing both amount and currency.",
      "hints": [
        "In __init__: store round(float(amount), 2) and currency.upper().",
        "In __repr__: return f\"Money({self.amount:.2f}, '{self.currency}')\".",
        "In __add__: check currency match, return Money(self.amount + other.amount, self.currency)."
      ],
      "starterCode": "class Money:\n    # Write your solution here\n    pass",
      "solution": "class Money:\n    def __init__(self, amount: float, currency: str):\n        self.amount = round(float(amount), 2)\n        self.currency = currency.upper()\n        \n    def __repr__(self) -> str:\n        return f\"Money({self.amount:.2f}, '{self.currency}')\"\n        \n    def __add__(self, other):\n        if not isinstance(other, Money) or self.currency != other.currency:\n            raise ValueError(\"Currency mismatch\")\n        return Money(self.amount + other.amount, self.currency)\n        \n    def __eq__(self, other) -> bool:\n        if not isinstance(other, Money):\n            return False\n        return self.amount == other.amount and self.currency == other.currency",
      "testCases": [
        {
          "input": "m1 = Money(10.50, \"USD\"); m2 = Money(5.25, \"USD\"); repr(m1 + m2)",
          "expectedOutput": "\"Money(15.75, 'USD')\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "    def __len__(self):",
        "codeSnippet": "    def __len__(self):",
        "explanation": "Allows calling len(p)."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "    def __getitem__(self, index):",
        "codeSnippet": "    def __getitem__(self, index):",
        "explanation": "Allows square-bracket indexing p[1] and slicing."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "    def __contains__(self, song):",
        "codeSnippet": "    def __contains__(self, song):",
        "explanation": "Allows \"Song A\" in p membership checks."
      }
    ],
    "applications": [
      {
        "industry": "Custom Container Collections",
        "application": "Building matrix math libraries, graph nodes, and geometry engines.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Custom Container Collections",
        "description": "Building matrix math libraries, graph nodes, and geometry engines."
      },
      {
        "industry": "SQL Query Builders",
        "application": "Overloading bitwise operators `&` and `|` for database filter combinations (like Django Q objects).",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "SQL Query Builders",
        "description": "Overloading bitwise operators `&` and `|` for database filter combinations (like Django Q objects)."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Implement the core Python Data Model methods to make custom classes first-class Python citizens.",
        "Distinguish `__str__` (readable representation for users) from `__repr__` (unambiguous code representation for developers).",
        "Implement sequence and container protocols: `__len__`, `__getitem__`, `__contains__`."
      ]
    }
  }
};
