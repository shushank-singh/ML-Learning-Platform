import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const javaModule6Data: JavaModuleData = {
  "id": "java-module-6",
  "number": 6,
  "title": "OOP Fundamentals",
  "subtitle": "Classes, Objects, Constructors, this Keyword, Encapsulation & Modifiers",
  "order": 6,
  "icon": "Boxes",
  "badge": "Object-Oriented",
  "estimatedHours": 10,
  "topicsCount": 10,
  "description": "Step into real Java engineering. Understand classes as blueprints and objects as heap instances, master constructors, explore the this keyword, enforce encapsulation with private fields and getters/setters, understand access modifiers, and study object lifecycle and garbage collection.",
  "lessons": [
    {
      "id": "java-oop-paradigms",
      "moduleId": "java-module-6",
      "title": "OOP Paradigms: Why Object-Oriented Programming Matters",
      "description": "Moving from procedural code to modeling domain entities with state and behavior.",
      "order": 1,
      "readTimeMinutes": 14,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-classes-and-objects",
      "moduleId": "java-module-6",
      "title": "Classes as Blueprints and Objects on the Heap",
      "description": "Class definition in the Method Area vs instantiated objects allocated on the Heap.",
      "order": 2,
      "readTimeMinutes": 16,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-instance-variables",
      "moduleId": "java-module-6",
      "title": "Instance Variables & Field Initialization",
      "description": "Heap storage per object, default value rules, and variable shadowing.",
      "order": 3,
      "readTimeMinutes": 14,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "java-constructors",
      "moduleId": "java-module-6",
      "title": "Constructors in Java: Default, No-Arg, and Parameterized",
      "description": "Object initialization protocols, constructor overloading, and the new operator.",
      "order": 4,
      "readTimeMinutes": 16,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-this-keyword",
      "moduleId": "java-module-6",
      "title": "The this Keyword & Constructor Chaining this()",
      "description": "Disambiguating field names from parameters and delegating constructors.",
      "order": 5,
      "readTimeMinutes": 14,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-encapsulation-getters",
      "moduleId": "java-module-6",
      "title": "Encapsulation: Data Hiding, Getters & Setters",
      "description": "Protecting object invariants, read-only properties, and defensive validation.",
      "order": 6,
      "readTimeMinutes": 16,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-access-modifiers",
      "moduleId": "java-module-6",
      "title": "Access Modifiers: public, private, protected & package-private",
      "description": "The 4 levels of encapsulation visibility and access control boundaries.",
      "order": 7,
      "readTimeMinutes": 15,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-static-fields-blocks",
      "moduleId": "java-module-6",
      "title": "Static Variables & Static Initialization Blocks",
      "description": "Class-level state shared across all instances and static {} execution order.",
      "order": 8,
      "readTimeMinutes": 16,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "java-object-lifecycle",
      "moduleId": "java-module-6",
      "title": "Object Lifecycle, References & Garbage Collection",
      "description": "Creation, reachability graphs, orphan objects, and automatic memory reclamation.",
      "order": 9,
      "readTimeMinutes": 18,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "java-oop-bank-project",
      "moduleId": "java-module-6",
      "title": "Project: Encapsulated Bank Account & ATM Engine",
      "description": "Building a production-style banking class with balance protection and audit logging.",
      "order": 10,
      "readTimeMinutes": 20,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    }
  ]
};

export const javaModule6Lessons: Record<string, JavaLessonContent> = {
  "java-oop-paradigms": {
    "id": "java-oop-paradigms",
    "moduleId": "java-module-6",
    "title": "OOP Paradigms: Why Object-Oriented Programming Matters",
    "subtitle": "Encapsulation, Abstraction, Inheritance, and Polymorphism in Software Design",
    "order": 1,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master OOP Paradigms: Why Object-Oriented Programming Matters.",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "OOP Paradigms: Why Object-Oriented Programming Matters Metaphor",
      "text": "A physical car: the engine, fuel injection, and pistons are encapsulated under the hood. You interact through an abstract interface (steering wheel and pedals) without needing to touch raw wires.",
      "metaphor": "A physical car: the engine, fuel injection, and pistons are encapsulated under the hood. You interact through an abstract interface (steering wheel and pedals) without needing to touch raw wires."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind OOP Paradigms: Why Object-Oriented Programming Matters.",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating OOP Paradigms: Why Object-Oriented Programming Matters",
      "code": "class Car {\n    String brand;\n    int speed;\n\n    void accelerate(int increase) { speed += increase; }\n    void brake(int decrease) { speed = Math.max(0, speed - decrease); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.brand = \"Tesla\";\n        car.accelerate(45);\n        System.out.println(car.brand + \" running at \" + car.speed + \" mph.\");\n    }\n}",
      "explanation": "Examine the OOP structure of OOP Paradigms: Why Object-Oriented Programming Matters."
    },
    "runnableCode": {
      "code": "class Car {\n    String brand;\n    int speed;\n\n    void accelerate(int increase) { speed += increase; }\n    void brake(int decrease) { speed = Math.max(0, speed - decrease); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.brand = \"Tesla\";\n        car.accelerate(45);\n        System.out.println(car.brand + \" running at \" + car.speed + \" mph.\");\n    }\n}",
      "expectedOutput": "Tesla running at 45 mph."
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Treating Java as purely procedural by making every method static and dumping everything into Main.",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-oop-paradigms",
        "question": "What are the four core pillars of Object-Oriented Programming?",
        "answer": "Encapsulation, Abstraction, Inheritance, Polymorphism",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-oop-paradigms",
        "question": "What are the four core pillars of Object-Oriented Programming?",
        "options": [
          "HTML, CSS, JS, SQL",
          "Encapsulation, Abstraction, Inheritance, Polymorphism",
          "Compilation, Interpretation, JIT, GC",
          "Stack, Heap, Method Area, Registers"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-oop-paradigms",
      "title": "Exercise: OOP Paradigms: Why Object-Oriented Programming Matters",
      "difficulty": "Beginner",
      "description": "Implement OOP Paradigms: Why Object-Oriented Programming Matters to complete the object-oriented task.",
      "starterCode": "class Car {\n    String brand;\n    int speed;\n\n    void accelerate(int increase) { speed += increase; }\n    void brake(int decrease) { speed = Math.max(0, speed - decrease); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.brand = \"Tesla\";\n        car.accelerate(45);\n        System.out.println(car.brand + \" running at \" + car.speed + \" mph.\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Car {\n    String brand;\n    int speed;\n\n    void accelerate(int increase) { speed += increase; }\n    void brake(int decrease) { speed = Math.max(0, speed - decrease); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.brand = \"Tesla\";\n        car.accelerate(45);\n        System.out.println(car.brand + \" running at \" + car.speed + \" mph.\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered OOP Paradigms: Why Object-Oriented Programming Matters.",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-classes-and-objects",
      "nextLessonTitle": "Classes as Blueprints and Objects on the Heap",
      "nextLessonModuleId": "java-module-6"
    }
  },
  "java-classes-and-objects": {
    "id": "java-classes-and-objects",
    "moduleId": "java-module-6",
    "title": "Classes as Blueprints and Objects on the Heap",
    "subtitle": "The Architectural Schema vs The Tangible Physical Instance",
    "order": 2,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Classes as Blueprints and Objects on the Heap.",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "Classes as Blueprints and Objects on the Heap Metaphor",
      "text": "A cookie cutter (the class) vs the actual sugar cookies baked from it (the objects). The cookie cutter is one piece of metal; you can stamp 100 cookies from it.",
      "metaphor": "A cookie cutter (the class) vs the actual sugar cookies baked from it (the objects). The cookie cutter is one piece of metal; you can stamp 100 cookies from it."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind Classes as Blueprints and Objects on the Heap.",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Classes as Blueprints and Objects on the Heap",
      "code": "class User {\n    String username;\n    int loginCount;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // user1 and user2 are distinct heap objects\n        User user1 = new User();\n        user1.username = \"Alice\";\n        user1.loginCount = 5;\n\n        User user2 = new User();\n        user2.username = \"Bob\";\n        user2.loginCount = 12;\n\n        System.out.println(\"User 1: \" + user1.username + \", Logins: \" + user1.loginCount);\n        System.out.println(\"User 2: \" + user2.username + \", Logins: \" + user2.loginCount);\n    }\n}",
      "explanation": "Examine the OOP structure of Classes as Blueprints and Objects on the Heap."
    },
    "runnableCode": {
      "code": "class User {\n    String username;\n    int loginCount;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // user1 and user2 are distinct heap objects\n        User user1 = new User();\n        user1.username = \"Alice\";\n        user1.loginCount = 5;\n\n        User user2 = new User();\n        user2.username = \"Bob\";\n        user2.loginCount = 12;\n\n        System.out.println(\"User 1: \" + user1.username + \", Logins: \" + user1.loginCount);\n        System.out.println(\"User 2: \" + user2.username + \", Logins: \" + user2.loginCount);\n    }\n}",
      "expectedOutput": "User 1: Alice, Logins: 5\\nUser 2: Bob, Logins: 12"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing the class name with object reference variables.",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-classes-and-objects",
        "question": "Where are instantiated Java objects stored in memory?",
        "answer": "The JVM Heap",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-classes-and-objects",
        "question": "Where are instantiated Java objects stored in memory?",
        "options": [
          "The CPU registers",
          "The JVM Stack",
          "The JVM Heap",
          "The hard disk directly"
        ],
        "correctIndex": 2,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-classes-and-objects",
      "title": "Exercise: Classes as Blueprints and Objects on the Heap",
      "difficulty": "Beginner",
      "description": "Implement Classes as Blueprints and Objects on the Heap to complete the object-oriented task.",
      "starterCode": "class User {\n    String username;\n    int loginCount;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // user1 and user2 are distinct heap objects\n        User user1 = new User();\n        user1.username = \"Alice\";\n        user1.loginCount = 5;\n\n        User user2 = new User();\n        user2.username = \"Bob\";\n        user2.loginCount = 12;\n\n        System.out.println(\"User 1: \" + user1.username + \", Logins: \" + user1.loginCount);\n        System.out.println(\"User 2: \" + user2.username + \", Logins: \" + user2.loginCount);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class User {\n    String username;\n    int loginCount;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // user1 and user2 are distinct heap objects\n        User user1 = new User();\n        user1.username = \"Alice\";\n        user1.loginCount = 5;\n\n        User user2 = new User();\n        user2.username = \"Bob\";\n        user2.loginCount = 12;\n\n        System.out.println(\"User 1: \" + user1.username + \", Logins: \" + user1.loginCount);\n        System.out.println(\"User 2: \" + user2.username + \", Logins: \" + user2.loginCount);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Classes as Blueprints and Objects on the Heap.",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-instance-variables",
      "nextLessonTitle": "Instance Variables & Field Initialization",
      "nextLessonModuleId": "java-module-6"
    }
  },
  "java-instance-variables": {
    "id": "java-instance-variables",
    "moduleId": "java-module-6",
    "title": "Instance Variables & Field Initialization",
    "subtitle": "Default Field Values in Java (0, 0.0, false, null) vs Local Variables",
    "order": 3,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "memory-model",
    "objectives": [
      "Master Instance Variables & Field Initialization.",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "Instance Variables & Field Initialization Metaphor",
      "text": "A brand new smartphone fresh out of the factory box: before you customize it, it has standard factory default settings.",
      "metaphor": "A brand new smartphone fresh out of the factory box: before you customize it, it has standard factory default settings."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind Instance Variables & Field Initialization.",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Instance Variables & Field Initialization",
      "code": "class Employee {\n    String name;      // Defaults to null\n    int employeeId;   // Defaults to 0\n    double salary;    // Defaults to 0.0\n    boolean isActive; // Defaults to false\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        System.out.println(\"name default: \" + emp.name);\n        System.out.println(\"id default: \" + emp.employeeId);\n        System.out.println(\"salary default: \" + emp.salary);\n        System.out.println(\"active default: \" + emp.isActive);\n    }\n}",
      "explanation": "Examine the OOP structure of Instance Variables & Field Initialization."
    },
    "runnableCode": {
      "code": "class Employee {\n    String name;      // Defaults to null\n    int employeeId;   // Defaults to 0\n    double salary;    // Defaults to 0.0\n    boolean isActive; // Defaults to false\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        System.out.println(\"name default: \" + emp.name);\n        System.out.println(\"id default: \" + emp.employeeId);\n        System.out.println(\"salary default: \" + emp.salary);\n        System.out.println(\"active default: \" + emp.isActive);\n    }\n}",
      "expectedOutput": "name default: null\\nid default: 0\\nsalary default: 0.0\\nactive default: false"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming local variables inside methods get default values like instance fields do (they do not).",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-instance-variables",
        "question": "What is the default value of an uninitialized boolean instance field in a Java class?",
        "answer": "false",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-instance-variables",
        "question": "What is the default value of an uninitialized boolean instance field in a Java class?",
        "options": [
          "true",
          "false",
          "null",
          "0"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-instance-variables",
      "title": "Exercise: Instance Variables & Field Initialization",
      "difficulty": "Beginner",
      "description": "Implement Instance Variables & Field Initialization to complete the object-oriented task.",
      "starterCode": "class Employee {\n    String name;      // Defaults to null\n    int employeeId;   // Defaults to 0\n    double salary;    // Defaults to 0.0\n    boolean isActive; // Defaults to false\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        System.out.println(\"name default: \" + emp.name);\n        System.out.println(\"id default: \" + emp.employeeId);\n        System.out.println(\"salary default: \" + emp.salary);\n        System.out.println(\"active default: \" + emp.isActive);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Employee {\n    String name;      // Defaults to null\n    int employeeId;   // Defaults to 0\n    double salary;    // Defaults to 0.0\n    boolean isActive; // Defaults to false\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        System.out.println(\"name default: \" + emp.name);\n        System.out.println(\"id default: \" + emp.employeeId);\n        System.out.println(\"salary default: \" + emp.salary);\n        System.out.println(\"active default: \" + emp.isActive);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Instance Variables & Field Initialization.",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-constructors",
      "nextLessonTitle": "Constructors in Java: Default, No-Arg, and Parameterized",
      "nextLessonModuleId": "java-module-6"
    }
  },
  "java-constructors": {
    "id": "java-constructors",
    "moduleId": "java-module-6",
    "title": "Constructors in Java: Default, No-Arg, and Parameterized",
    "subtitle": "Ensuring Proper Object Initialization at Creation Time",
    "order": 4,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Constructors in Java: Default, No-Arg, and Parameterized.",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "Constructors in Java: Default, No-Arg, and Parameterized Metaphor",
      "text": "A newborn baby birth certificate: you cannot create the record without filling in the baby's name and birth time right at the moment of birth.",
      "metaphor": "A newborn baby birth certificate: you cannot create the record without filling in the baby's name and birth time right at the moment of birth."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind Constructors in Java: Default, No-Arg, and Parameterized.",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Constructors in Java: Default, No-Arg, and Parameterized",
      "code": "class Book {\n    String title;\n    double price;\n\n    // Parameterized constructor\n    public Book(String title, double price) {\n        this.title = title;\n        this.price = price;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Book b = new Book(\"Effective Java\", 45.0);\n        System.out.println(\"Book: \" + b.title + \", Price: $\" + b.price);\n    }\n}",
      "explanation": "Examine the OOP structure of Constructors in Java: Default, No-Arg, and Parameterized."
    },
    "runnableCode": {
      "code": "class Book {\n    String title;\n    double price;\n\n    // Parameterized constructor\n    public Book(String title, double price) {\n        this.title = title;\n        this.price = price;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Book b = new Book(\"Effective Java\", 45.0);\n        System.out.println(\"Book: \" + b.title + \", Price: $\" + b.price);\n    }\n}",
      "expectedOutput": "Book: Effective Java, Price: $45.0"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Giving a constructor a return type (e.g. public void Book()); doing so turns it into a normal method, not a constructor!",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-constructors",
        "question": "What is the return type of a Java constructor?",
        "answer": "Constructors have NO return type declared",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-constructors",
        "question": "What is the return type of a Java constructor?",
        "options": [
          "void",
          "The class type",
          "Constructors have NO return type declared",
          "Object"
        ],
        "correctIndex": 2,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-constructors",
      "title": "Exercise: Constructors in Java: Default, No-Arg, and Parameterized",
      "difficulty": "Beginner",
      "description": "Implement Constructors in Java: Default, No-Arg, and Parameterized to complete the object-oriented task.",
      "starterCode": "class Book {\n    String title;\n    double price;\n\n    // Parameterized constructor\n    public Book(String title, double price) {\n        this.title = title;\n        this.price = price;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Book b = new Book(\"Effective Java\", 45.0);\n        System.out.println(\"Book: \" + b.title + \", Price: $\" + b.price);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Book {\n    String title;\n    double price;\n\n    // Parameterized constructor\n    public Book(String title, double price) {\n        this.title = title;\n        this.price = price;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Book b = new Book(\"Effective Java\", 45.0);\n        System.out.println(\"Book: \" + b.title + \", Price: $\" + b.price);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Constructors in Java: Default, No-Arg, and Parameterized.",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-this-keyword",
      "nextLessonTitle": "The this Keyword & Constructor Chaining this()",
      "nextLessonModuleId": "java-module-6"
    }
  },
  "java-this-keyword": {
    "id": "java-this-keyword",
    "moduleId": "java-module-6",
    "title": "The this Keyword & Constructor Chaining this()",
    "subtitle": "Self-Reference to the Current Object and Reusing Constructors",
    "order": 5,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master The this Keyword & Constructor Chaining this().",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "The this Keyword & Constructor Chaining this() Metaphor",
      "text": "Pointing to yourself and saying 'me' or 'my': this.width means 'my width field, not the parameter you just passed me'.",
      "metaphor": "Pointing to yourself and saying 'me' or 'my': this.width means 'my width field, not the parameter you just passed me'."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind The this Keyword & Constructor Chaining this().",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The this Keyword & Constructor Chaining this()",
      "code": "class Rectangle {\n    int width;\n    int height;\n\n    // No-arg constructor delegates to 2-arg constructor\n    public Rectangle() {\n        this(10, 10); // Constructor chaining!\n    }\n\n    public Rectangle(int width, int height) {\n        this.width = width;   // this.width disambiguates field from parameter\n        this.height = height;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Rectangle r1 = new Rectangle();\n        Rectangle r2 = new Rectangle(20, 30);\n        System.out.println(\"r1: \" + r1.width + \"x\" + r1.height);\n        System.out.println(\"r2: \" + r2.width + \"x\" + r2.height);\n    }\n}",
      "explanation": "Examine the OOP structure of The this Keyword & Constructor Chaining this()."
    },
    "runnableCode": {
      "code": "class Rectangle {\n    int width;\n    int height;\n\n    // No-arg constructor delegates to 2-arg constructor\n    public Rectangle() {\n        this(10, 10); // Constructor chaining!\n    }\n\n    public Rectangle(int width, int height) {\n        this.width = width;   // this.width disambiguates field from parameter\n        this.height = height;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Rectangle r1 = new Rectangle();\n        Rectangle r2 = new Rectangle(20, 30);\n        System.out.println(\"r1: \" + r1.width + \"x\" + r1.height);\n        System.out.println(\"r2: \" + r2.width + \"x\" + r2.height);\n    }\n}",
      "expectedOutput": "r1: 10x10\\nr2: 20x30"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Calling this(...) anywhere other than the very first line of a constructor body.",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-this-keyword",
        "question": "Where must constructor chaining this(...) appear in a constructor?",
        "answer": "As the very first statement",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-this-keyword",
        "question": "Where must constructor chaining this(...) appear in a constructor?",
        "options": [
          "Anywhere in the constructor",
          "As the very first statement",
          "In the return statement",
          "At the very end"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-this-keyword",
      "title": "Exercise: The this Keyword & Constructor Chaining this()",
      "difficulty": "Beginner",
      "description": "Implement The this Keyword & Constructor Chaining this() to complete the object-oriented task.",
      "starterCode": "class Rectangle {\n    int width;\n    int height;\n\n    // No-arg constructor delegates to 2-arg constructor\n    public Rectangle() {\n        this(10, 10); // Constructor chaining!\n    }\n\n    public Rectangle(int width, int height) {\n        this.width = width;   // this.width disambiguates field from parameter\n        this.height = height;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Rectangle r1 = new Rectangle();\n        Rectangle r2 = new Rectangle(20, 30);\n        System.out.println(\"r1: \" + r1.width + \"x\" + r1.height);\n        System.out.println(\"r2: \" + r2.width + \"x\" + r2.height);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Rectangle {\n    int width;\n    int height;\n\n    // No-arg constructor delegates to 2-arg constructor\n    public Rectangle() {\n        this(10, 10); // Constructor chaining!\n    }\n\n    public Rectangle(int width, int height) {\n        this.width = width;   // this.width disambiguates field from parameter\n        this.height = height;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Rectangle r1 = new Rectangle();\n        Rectangle r2 = new Rectangle(20, 30);\n        System.out.println(\"r1: \" + r1.width + \"x\" + r1.height);\n        System.out.println(\"r2: \" + r2.width + \"x\" + r2.height);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The this Keyword & Constructor Chaining this().",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-encapsulation-getters",
      "nextLessonTitle": "Encapsulation: Data Hiding, Getters & Setters",
      "nextLessonModuleId": "java-module-6"
    }
  },
  "java-encapsulation-getters": {
    "id": "java-encapsulation-getters",
    "moduleId": "java-module-6",
    "title": "Encapsulation: Data Hiding, Getters & Setters",
    "subtitle": "Protecting Object State with private Fields and Public Validation Mutators",
    "order": 6,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Encapsulation: Data Hiding, Getters & Setters.",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "Encapsulation: Data Hiding, Getters & Setters Metaphor",
      "text": "A capsule pill: the active medicine is safely enclosed inside a protective gelatin shell so outside dirt cannot touch it directly.",
      "metaphor": "A capsule pill: the active medicine is safely enclosed inside a protective gelatin shell so outside dirt cannot touch it directly."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind Encapsulation: Data Hiding, Getters & Setters.",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Encapsulation: Data Hiding, Getters & Setters",
      "code": "class BankAccount {\n    private double balance; // Data hidden from outside tampering\n\n    public BankAccount(double initialBalance) {\n        if (initialBalance >= 0) this.balance = initialBalance;\n    }\n\n    public double getBalance() { return balance; }\n\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(100.0);\n        acc.deposit(50.0);\n        System.out.println(\"Protected Balance: $\" + acc.getBalance());\n    }\n}",
      "explanation": "Examine the OOP structure of Encapsulation: Data Hiding, Getters & Setters."
    },
    "runnableCode": {
      "code": "class BankAccount {\n    private double balance; // Data hidden from outside tampering\n\n    public BankAccount(double initialBalance) {\n        if (initialBalance >= 0) this.balance = initialBalance;\n    }\n\n    public double getBalance() { return balance; }\n\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(100.0);\n        acc.deposit(50.0);\n        System.out.println(\"Protected Balance: $\" + acc.getBalance());\n    }\n}",
      "expectedOutput": "Protected Balance: $150.0"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Making fields public, allowing any external class to corrupt internal state (e.g. acc.balance = -9999).",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-encapsulation-getters",
        "question": "What is the primary objective of Encapsulation in OOP?",
        "answer": "To hide internal data and restrict direct access through controlled methods",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-encapsulation-getters",
        "question": "What is the primary objective of Encapsulation in OOP?",
        "options": [
          "To make code compile faster",
          "To hide internal data and restrict direct access through controlled methods",
          "To eliminate classes",
          "To share code across packages"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-encapsulation-getters",
      "title": "Exercise: Encapsulation: Data Hiding, Getters & Setters",
      "difficulty": "Beginner",
      "description": "Implement Encapsulation: Data Hiding, Getters & Setters to complete the object-oriented task.",
      "starterCode": "class BankAccount {\n    private double balance; // Data hidden from outside tampering\n\n    public BankAccount(double initialBalance) {\n        if (initialBalance >= 0) this.balance = initialBalance;\n    }\n\n    public double getBalance() { return balance; }\n\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(100.0);\n        acc.deposit(50.0);\n        System.out.println(\"Protected Balance: $\" + acc.getBalance());\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class BankAccount {\n    private double balance; // Data hidden from outside tampering\n\n    public BankAccount(double initialBalance) {\n        if (initialBalance >= 0) this.balance = initialBalance;\n    }\n\n    public double getBalance() { return balance; }\n\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(100.0);\n        acc.deposit(50.0);\n        System.out.println(\"Protected Balance: $\" + acc.getBalance());\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Encapsulation: Data Hiding, Getters & Setters.",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-access-modifiers",
      "nextLessonTitle": "Access Modifiers: public, private, protected & package-private",
      "nextLessonModuleId": "java-module-6"
    }
  },
  "java-access-modifiers": {
    "id": "java-access-modifiers",
    "moduleId": "java-module-6",
    "title": "Access Modifiers: public, private, protected & package-private",
    "subtitle": "Defining Visibility Boundaries Across Classes, Packages, and Subclasses",
    "order": 7,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Access Modifiers: public, private, protected & package-private.",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "Access Modifiers: public, private, protected & package-private Metaphor",
      "text": "Security clearance badges: public is the lobby open to everyone, private is the CEO's personal locked safe.",
      "metaphor": "Security clearance badges: public is the lobby open to everyone, private is the CEO's personal locked safe."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind Access Modifiers: public, private, protected & package-private.",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Access Modifiers: public, private, protected & package-private",
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Access Modifier Matrix:\");\n        System.out.println(\"- public: Accessible everywhere\");\n        System.out.println(\"- protected: Same package + subclasses\");\n        System.out.println(\"- (default): Same package only\");\n        System.out.println(\"- private: Enclosing class only\");\n    }\n}",
      "explanation": "Examine the OOP structure of Access Modifiers: public, private, protected & package-private."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Access Modifier Matrix:\");\n        System.out.println(\"- public: Accessible everywhere\");\n        System.out.println(\"- protected: Same package + subclasses\");\n        System.out.println(\"- (default): Same package only\");\n        System.out.println(\"- private: Enclosing class only\");\n    }\n}",
      "expectedOutput": "Access Modifier Matrix:\\n- public: Accessible everywhere\\n- protected: Same package + subclasses\\n- (default): Same package only\\n- private: Enclosing class only"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing default package-private visibility (no modifier) with protected.",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-access-modifiers",
        "question": "Which access modifier restricts access exclusively to the enclosing class?",
        "answer": "private",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-access-modifiers",
        "question": "Which access modifier restricts access exclusively to the enclosing class?",
        "options": [
          "public",
          "protected",
          "private",
          "package-private"
        ],
        "correctIndex": 2,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-access-modifiers",
      "title": "Exercise: Access Modifiers: public, private, protected & package-private",
      "difficulty": "Beginner",
      "description": "Implement Access Modifiers: public, private, protected & package-private to complete the object-oriented task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Access Modifier Matrix:\");\n        System.out.println(\"- public: Accessible everywhere\");\n        System.out.println(\"- protected: Same package + subclasses\");\n        System.out.println(\"- (default): Same package only\");\n        System.out.println(\"- private: Enclosing class only\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Access Modifier Matrix:\");\n        System.out.println(\"- public: Accessible everywhere\");\n        System.out.println(\"- protected: Same package + subclasses\");\n        System.out.println(\"- (default): Same package only\");\n        System.out.println(\"- private: Enclosing class only\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Access Modifiers: public, private, protected & package-private.",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-static-fields-blocks",
      "nextLessonTitle": "Static Variables & Static Initialization Blocks",
      "nextLessonModuleId": "java-module-6"
    }
  },
  "java-static-fields-blocks": {
    "id": "java-static-fields-blocks",
    "moduleId": "java-module-6",
    "title": "Static Variables & Static Initialization Blocks",
    "subtitle": "Shared Class-Level State and the static {} Pre-Execution Block",
    "order": 8,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Static Variables & Static Initialization Blocks.",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "Static Variables & Static Initialization Blocks Metaphor",
      "text": "A shared ticket dispenser at a bakery: every customer takes a ticket from the same shared roll, incrementing the master counter.",
      "metaphor": "A shared ticket dispenser at a bakery: every customer takes a ticket from the same shared roll, incrementing the master counter."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind Static Variables & Static Initialization Blocks.",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Static Variables & Static Initialization Blocks",
      "code": "class Counter {\n    static int globalCount = 0; // Shared across all instances\n    int instanceId;\n\n    public Counter() {\n        globalCount++;\n        this.instanceId = globalCount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n        Counter c3 = new Counter();\n\n        System.out.println(\"c1 ID: \" + c1.instanceId);\n        System.out.println(\"c3 ID: \" + c3.instanceId);\n        System.out.println(\"Total Instances: \" + Counter.globalCount);\n    }\n}",
      "explanation": "Examine the OOP structure of Static Variables & Static Initialization Blocks."
    },
    "runnableCode": {
      "code": "class Counter {\n    static int globalCount = 0; // Shared across all instances\n    int instanceId;\n\n    public Counter() {\n        globalCount++;\n        this.instanceId = globalCount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n        Counter c3 = new Counter();\n\n        System.out.println(\"c1 ID: \" + c1.instanceId);\n        System.out.println(\"c3 ID: \" + c3.instanceId);\n        System.out.println(\"Total Instances: \" + Counter.globalCount);\n    }\n}",
      "expectedOutput": "c1 ID: 1\\nc3 ID: 3\\nTotal Instances: 3"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accessing static variables through an instance reference (c1.globalCount) instead of the class name (Counter.globalCount).",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-static-fields-blocks",
        "question": "How many copies of a static variable exist in memory regardless of how many objects are instantiated?",
        "answer": "Exactly one copy shared across all instances",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-static-fields-blocks",
        "question": "How many copies of a static variable exist in memory regardless of how many objects are instantiated?",
        "options": [
          "One copy per instance",
          "Exactly one copy shared across all instances",
          "None until instantiated",
          "Two copies"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-static-fields-blocks",
      "title": "Exercise: Static Variables & Static Initialization Blocks",
      "difficulty": "Beginner",
      "description": "Implement Static Variables & Static Initialization Blocks to complete the object-oriented task.",
      "starterCode": "class Counter {\n    static int globalCount = 0; // Shared across all instances\n    int instanceId;\n\n    public Counter() {\n        globalCount++;\n        this.instanceId = globalCount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n        Counter c3 = new Counter();\n\n        System.out.println(\"c1 ID: \" + c1.instanceId);\n        System.out.println(\"c3 ID: \" + c3.instanceId);\n        System.out.println(\"Total Instances: \" + Counter.globalCount);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Counter {\n    static int globalCount = 0; // Shared across all instances\n    int instanceId;\n\n    public Counter() {\n        globalCount++;\n        this.instanceId = globalCount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n        Counter c3 = new Counter();\n\n        System.out.println(\"c1 ID: \" + c1.instanceId);\n        System.out.println(\"c3 ID: \" + c3.instanceId);\n        System.out.println(\"Total Instances: \" + Counter.globalCount);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Static Variables & Static Initialization Blocks.",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-object-lifecycle",
      "nextLessonTitle": "Object Lifecycle, References & Garbage Collection",
      "nextLessonModuleId": "java-module-6"
    }
  },
  "java-object-lifecycle": {
    "id": "java-object-lifecycle",
    "moduleId": "java-module-6",
    "title": "Object Lifecycle, References & Garbage Collection",
    "subtitle": "Allocation via new, Reference Reachability, and Automatic Deallocation",
    "order": 9,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "memory-model",
    "objectives": [
      "Master Object Lifecycle, References & Garbage Collection.",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "Object Lifecycle, References & Garbage Collection Metaphor",
      "text": "A helium balloon held by a string: as long as someone holds the string (reference), the balloon stays grounded. Let go of the string (null), and the balloon floats away to be recycled.",
      "metaphor": "A helium balloon held by a string: as long as someone holds the string (reference), the balloon stays grounded. Let go of the string (null), and the balloon floats away to be recycled."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind Object Lifecycle, References & Garbage Collection.",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Object Lifecycle, References & Garbage Collection",
      "code": "public class Main {\n    public static void main(String[] args) {\n        String obj1 = new String(\"Temporary Data\");\n        System.out.println(\"Created object: \" + obj1);\n\n        obj1 = null; // Sever the reference!\n        // The String object on the heap is now an orphan with 0 references.\n        // It is eligible for Garbage Collection by the JVM.\n        System.out.println(\"Reference cleared to null. Memory eligible for GC.\");\n    }\n}",
      "explanation": "Examine the OOP structure of Object Lifecycle, References & Garbage Collection."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        String obj1 = new String(\"Temporary Data\");\n        System.out.println(\"Created object: \" + obj1);\n\n        obj1 = null; // Sever the reference!\n        // The String object on the heap is now an orphan with 0 references.\n        // It is eligible for Garbage Collection by the JVM.\n        System.out.println(\"Reference cleared to null. Memory eligible for GC.\");\n    }\n}",
      "expectedOutput": "Created object: Temporary Data\\nReference cleared to null. Memory eligible for GC."
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming System.gc() forces immediate garbage collection; it is merely a non-binding hint to the JVM.",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-object-lifecycle",
        "question": "When does a Java object on the heap become eligible for Garbage Collection?",
        "answer": "When it is no longer reachable by any live reference",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-object-lifecycle",
        "question": "When does a Java object on the heap become eligible for Garbage Collection?",
        "options": [
          "Immediately after creation",
          "When it is no longer reachable by any live reference",
          "When System.gc() is called",
          "When the method ends"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-object-lifecycle",
      "title": "Exercise: Object Lifecycle, References & Garbage Collection",
      "difficulty": "Beginner",
      "description": "Implement Object Lifecycle, References & Garbage Collection to complete the object-oriented task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        String obj1 = new String(\"Temporary Data\");\n        System.out.println(\"Created object: \" + obj1);\n\n        obj1 = null; // Sever the reference!\n        // The String object on the heap is now an orphan with 0 references.\n        // It is eligible for Garbage Collection by the JVM.\n        System.out.println(\"Reference cleared to null. Memory eligible for GC.\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        String obj1 = new String(\"Temporary Data\");\n        System.out.println(\"Created object: \" + obj1);\n\n        obj1 = null; // Sever the reference!\n        // The String object on the heap is now an orphan with 0 references.\n        // It is eligible for Garbage Collection by the JVM.\n        System.out.println(\"Reference cleared to null. Memory eligible for GC.\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Object Lifecycle, References & Garbage Collection.",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-oop-bank-project",
      "nextLessonTitle": "Project: Encapsulated Bank Account & ATM Engine",
      "nextLessonModuleId": "java-module-6"
    }
  },
  "java-oop-bank-project": {
    "id": "java-oop-bank-project",
    "moduleId": "java-module-6",
    "title": "Project: Encapsulated Bank Account & ATM Engine",
    "subtitle": "Consolidating Classes, Encapsulation, Validation, and Transaction Auditing",
    "order": 10,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Project: Encapsulated Bank Account & ATM Engine.",
      "Apply encapsulation and constructor patterns.",
      "Structure maintainable object-oriented code."
    ],
    "prerequisites": [
      "Module 5: Methods and Recursion"
    ],
    "analogy": {
      "title": "Project: Encapsulated Bank Account & ATM Engine Metaphor",
      "text": "A real ATM machine with an armored safe: users cannot reach inside to grab cash directly; they must provide credentials and valid transaction requests.",
      "metaphor": "A real ATM machine with an armored safe: users cannot reach inside to grab cash directly; they must provide credentials and valid transaction requests."
    },
    "problemSolved": {
      "title": "Modeling Complex Real-World Domains Safely",
      "description": "Encapsulating state and operations prevents unauthorized mutations and architectural chaos.",
      "keyPoints": [
        "Information hiding",
        "Reliable constructor initialization",
        "Object reusability"
      ]
    },
    "intuition": {
      "overview": "Architectural principles behind Project: Encapsulated Bank Account & ATM Engine.",
      "steps": [
        {
          "step": 1,
          "title": "Class Blueprint",
          "description": "Defines schema and behaviors."
        },
        {
          "step": 2,
          "title": "Heap Instantiation",
          "description": "new allocates memory and calls constructor."
        },
        {
          "step": 3,
          "title": "Method Invocation",
          "description": "Object interacts via controlled public APIs."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Project: Encapsulated Bank Account & ATM Engine",
      "code": "class ATM {\n    private double balance;\n    private int pin;\n\n    public ATM(double initialBalance, int pin) {\n        this.balance = initialBalance;\n        this.pin = pin;\n    }\n\n    public boolean withdraw(int enteredPin, double amount) {\n        if (enteredPin != this.pin) {\n            System.out.println(\"Error: Invalid PIN.\");\n            return false;\n        }\n        if (amount <= 0 || amount > balance) {\n            System.out.println(\"Error: Insufficient funds or invalid amount.\");\n            return false;\n        }\n        balance -= amount;\n        System.out.printf(\"Success: Withdrew $%.2f. New Balance: $%.2f%n\", amount, balance);\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        ATM atm = new ATM(500.0, 1234);\n        atm.withdraw(9999, 50.0);  // Invalid PIN\n        atm.withdraw(1234, 150.0); // Valid withdrawal\n    }\n}",
      "explanation": "Examine the OOP structure of Project: Encapsulated Bank Account & ATM Engine."
    },
    "runnableCode": {
      "code": "class ATM {\n    private double balance;\n    private int pin;\n\n    public ATM(double initialBalance, int pin) {\n        this.balance = initialBalance;\n        this.pin = pin;\n    }\n\n    public boolean withdraw(int enteredPin, double amount) {\n        if (enteredPin != this.pin) {\n            System.out.println(\"Error: Invalid PIN.\");\n            return false;\n        }\n        if (amount <= 0 || amount > balance) {\n            System.out.println(\"Error: Insufficient funds or invalid amount.\");\n            return false;\n        }\n        balance -= amount;\n        System.out.printf(\"Success: Withdrew $%.2f. New Balance: $%.2f%n\", amount, balance);\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        ATM atm = new ATM(500.0, 1234);\n        atm.withdraw(9999, 50.0);  // Invalid PIN\n        atm.withdraw(1234, 150.0); // Valid withdrawal\n    }\n}",
      "expectedOutput": "Error: Invalid PIN.\\nSuccess: Withdrew $150.00. New Balance: $350.00"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... { ... }",
        "explanation": "Class declaration and field definitions."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Object instantiation and usage",
        "explanation": "Heap object lifecycle and method execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Allowing negative deposits or withdrawals without bounds checks.",
        "solution": "Follow OOP best practices.",
        "whyWrong": "Breaks encapsulation or violates Java syntax."
      }
    ],
    "bestPractices": [
      "Make all fields private by default.",
      "Expose minimal required public API."
    ],
    "applications": [
      {
        "industry": "Enterprise Banking",
        "useCase": "Modeling financial accounts, ledgers, and transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-oop-bank-project",
        "question": "What principle ensures that an ATM's cash balance cannot be manipulated directly from external classes?",
        "answer": "Encapsulation with private access",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-oop-bank-project",
        "question": "What principle ensures that an ATM's cash balance cannot be manipulated directly from external classes?",
        "options": [
          "Polymorphism",
          "Encapsulation with private access",
          "Inheritance",
          "Generics"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-oop-bank-project",
      "title": "Exercise: Project: Encapsulated Bank Account & ATM Engine",
      "difficulty": "Beginner",
      "description": "Implement Project: Encapsulated Bank Account & ATM Engine to complete the object-oriented task.",
      "starterCode": "class ATM {\n    private double balance;\n    private int pin;\n\n    public ATM(double initialBalance, int pin) {\n        this.balance = initialBalance;\n        this.pin = pin;\n    }\n\n    public boolean withdraw(int enteredPin, double amount) {\n        if (enteredPin != this.pin) {\n            System.out.println(\"Error: Invalid PIN.\");\n            return false;\n        }\n        if (amount <= 0 || amount > balance) {\n            System.out.println(\"Error: Insufficient funds or invalid amount.\");\n            return false;\n        }\n        balance -= amount;\n        System.out.printf(\"Success: Withdrew $%.2f. New Balance: $%.2f%n\", amount, balance);\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        ATM atm = new ATM(500.0, 1234);\n        atm.withdraw(9999, 50.0);  // Invalid PIN\n        atm.withdraw(1234, 150.0); // Valid withdrawal\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class ATM {\n    private double balance;\n    private int pin;\n\n    public ATM(double initialBalance, int pin) {\n        this.balance = initialBalance;\n        this.pin = pin;\n    }\n\n    public boolean withdraw(int enteredPin, double amount) {\n        if (enteredPin != this.pin) {\n            System.out.println(\"Error: Invalid PIN.\");\n            return false;\n        }\n        if (amount <= 0 || amount > balance) {\n            System.out.println(\"Error: Insufficient funds or invalid amount.\");\n            return false;\n        }\n        balance -= amount;\n        System.out.printf(\"Success: Withdrew $%.2f. New Balance: $%.2f%n\", amount, balance);\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        ATM atm = new ATM(500.0, 1234);\n        atm.withdraw(9999, 50.0);  // Invalid PIN\n        atm.withdraw(1234, 150.0); // Valid withdrawal\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Project: Encapsulated Bank Account & ATM Engine.",
        "Understood classes, objects, and encapsulation.",
        "Ready for Advanced OOP in Module 7."
      ],
      "nextLessonId": "java-inheritance-extends",
      "nextLessonTitle": "Inheritance with the extends Keyword",
      "nextLessonModuleId": "java-module-7"
    }
  }
};
