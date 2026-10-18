import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const javaModule5Data: JavaModuleData = {
  "id": "java-module-5",
  "number": 5,
  "title": "Methods and Recursion",
  "subtitle": "Signatures, Return Values, Overloading, Call Stacks & Recursive Unwinding",
  "order": 5,
  "icon": "Layers",
  "badge": "Modular Programming",
  "estimatedHours": 9,
  "topicsCount": 10,
  "description": "Write reusable, modular Java code. Master method signatures, pass-by-value semantics, method overloading, static vs instance methods, call stack frames, base cases in recursion, and StackOverflow prevention.",
  "lessons": [
    {
      "id": "java-methods-structure",
      "moduleId": "java-module-5",
      "title": "Methods in Java: Structure, Signature & Return Types",
      "description": "Deconstructing access modifiers, return types, method identifiers, and parameter lists.",
      "order": 1,
      "readTimeMinutes": 14,
      "visualizerType": "call-stack",
      "difficulty": "Beginner"
    },
    {
      "id": "java-pass-by-value",
      "moduleId": "java-module-5",
      "title": "Pass-by-Value Semantics: Primitives vs References",
      "description": "Understanding why Java is strictly pass-by-value and how reference copying affects objects.",
      "order": 2,
      "readTimeMinutes": 16,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "java-method-overloading",
      "moduleId": "java-module-5",
      "title": "Method Overloading (Compile-Time Polymorphism)",
      "description": "Same method name with distinct parameter counts, types, or order.",
      "order": 3,
      "readTimeMinutes": 14,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-varargs",
      "moduleId": "java-module-5",
      "title": "Variable-Length Arguments (Varargs ...)",
      "description": "Handling arbitrary numbers of method parameters cleanly as syntactic arrays.",
      "order": 4,
      "readTimeMinutes": 12,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-static-methods",
      "moduleId": "java-module-5",
      "title": "Static Utility Methods vs Instance Methods",
      "description": "Class-level methods (Math.sqrt) vs object-level stateful instance methods.",
      "order": 5,
      "readTimeMinutes": 14,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-call-stack-frames",
      "moduleId": "java-module-5",
      "title": "Understanding the JVM Call Stack & Stack Frames",
      "description": "How methods push and pop frames, local variable lifecycles, and return address tracking.",
      "order": 6,
      "readTimeMinutes": 16,
      "visualizerType": "call-stack",
      "difficulty": "Beginner"
    },
    {
      "id": "java-recursion-fundamentals",
      "moduleId": "java-module-5",
      "title": "Introduction to Recursion: Base Case vs Recursive Call",
      "description": "The anatomy of a recursive function, termination conditions, and self-referential steps.",
      "order": 7,
      "readTimeMinutes": 16,
      "visualizerType": "call-stack",
      "difficulty": "Beginner"
    },
    {
      "id": "java-factorial-recursion",
      "moduleId": "java-module-5",
      "title": "Call Stack Analysis of Factorials and Countdown",
      "description": "Step-by-step tracing of stack frame allocation, base case hit, and value unwinding.",
      "order": 8,
      "readTimeMinutes": 18,
      "visualizerType": "call-stack",
      "difficulty": "Beginner"
    },
    {
      "id": "java-fibonacci-recursion",
      "moduleId": "java-module-5",
      "title": "Branching Recursion: Fibonacci & Call Trees",
      "description": "Binary recursion, visualizing exponential call trees, and redundant computation.",
      "order": 9,
      "readTimeMinutes": 18,
      "visualizerType": "call-stack",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-recursion-vs-iteration",
      "moduleId": "java-module-5",
      "title": "Recursion vs Iteration: Tradeoffs & StackOverflow Prevention",
      "description": "Performance comparison, tail recursion, memory limits (-Xss), and iterative conversion.",
      "order": 10,
      "readTimeMinutes": 18,
      "visualizerType": "call-stack",
      "difficulty": "Intermediate"
    }
  ]
};

export const javaModule5Lessons: Record<string, JavaLessonContent> = {
  "java-methods-structure": {
    "id": "java-methods-structure",
    "moduleId": "java-module-5",
    "title": "Methods in Java: Structure, Signature & Return Types",
    "subtitle": "Parameters, Return Statements, and the DRY (Don't Repeat Yourself) Principle",
    "order": 1,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "call-stack",
    "objectives": [
      "Master Methods in Java: Structure, Signature & Return Types.",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Methods in Java: Structure, Signature & Return Types Analogy",
      "text": "A microwave oven: you open the door, pass in food and cooking time (parameters), it does the internal cooking, and beeps returning warm food (return value).",
      "metaphor": "A microwave oven: you open the door, pass in food and cooking time (parameters), it does the internal cooking, and beeps returning warm food (return value)."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Methods in Java: Structure, Signature & Return Types.",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Methods in Java: Structure, Signature & Return Types",
      "code": "public class Main {\n    // Method declaration: public static <returnType> <name>(<parameters>)\n    public static double calculateTotal(double subtotal, double taxRate) {\n        return subtotal + (subtotal * taxRate);\n    }\n\n    public static void main(String[] args) {\n        double bill = calculateTotal(100.0, 0.08);\n        System.out.println(\"Total Bill with tax: $\" + bill);\n    }\n}",
      "explanation": "Examine the execution of Methods in Java: Structure, Signature & Return Types."
    },
    "runnableCode": {
      "code": "public class Main {\n    // Method declaration: public static <returnType> <name>(<parameters>)\n    public static double calculateTotal(double subtotal, double taxRate) {\n        return subtotal + (subtotal * taxRate);\n    }\n\n    public static void main(String[] args) {\n        double bill = calculateTotal(100.0, 0.08);\n        System.out.println(\"Total Bill with tax: $\" + bill);\n    }\n}",
      "expectedOutput": "Total Bill with tax: $108.0"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to return a value in a method with a non-void return type, causing a compile error.",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-methods-structure",
        "question": "What must match between a method signature and its return statement?",
        "answer": "The return type declared in the method header and the returned expression type",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-methods-structure",
        "question": "What must match between a method signature and its return statement?",
        "options": [
          "The parameter names",
          "The return type declared in the method header and the returned expression type",
          "The class name",
          "The static keyword"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-methods-structure",
      "title": "Exercise: Methods in Java: Structure, Signature & Return Types",
      "difficulty": "Beginner",
      "description": "Implement Methods in Java: Structure, Signature & Return Types to complete the task.",
      "starterCode": "public class Main {\n    // Method declaration: public static <returnType> <name>(<parameters>)\n    public static double calculateTotal(double subtotal, double taxRate) {\n        return subtotal + (subtotal * taxRate);\n    }\n\n    public static void main(String[] args) {\n        double bill = calculateTotal(100.0, 0.08);\n        System.out.println(\"Total Bill with tax: $\" + bill);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    // Method declaration: public static <returnType> <name>(<parameters>)\n    public static double calculateTotal(double subtotal, double taxRate) {\n        return subtotal + (subtotal * taxRate);\n    }\n\n    public static void main(String[] args) {\n        double bill = calculateTotal(100.0, 0.08);\n        System.out.println(\"Total Bill with tax: $\" + bill);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Methods in Java: Structure, Signature & Return Types.",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-pass-by-value",
      "nextLessonTitle": "Pass-by-Value Semantics: Primitives vs References",
      "nextLessonModuleId": "java-module-5"
    }
  },
  "java-pass-by-value": {
    "id": "java-pass-by-value",
    "moduleId": "java-module-5",
    "title": "Pass-by-Value Semantics: Primitives vs References",
    "subtitle": "Why Java Is Strictly Pass-by-Value and How Object References Behave",
    "order": 2,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "memory-model",
    "objectives": [
      "Master Pass-by-Value Semantics: Primitives vs References.",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Pass-by-Value Semantics: Primitives vs References Analogy",
      "text": "Handing someone a photocopy of your notes vs handing them the house key. Modifying the photocopy leaves your original intact. Modifying the house through the key changes the house itself.",
      "metaphor": "Handing someone a photocopy of your notes vs handing them the house key. Modifying the photocopy leaves your original intact. Modifying the house through the key changes the house itself."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Pass-by-Value Semantics: Primitives vs References.",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Pass-by-Value Semantics: Primitives vs References",
      "code": "class Box { int val = 10; }\n\npublic class Main {\n    public static void modifyPrimitive(int x) { x = 99; }\n    public static void modifyObject(Box b) { b.val = 99; }\n\n    public static void main(String[] args) {\n        int a = 10;\n        modifyPrimitive(a);\n        System.out.println(\"Primitive after method: \" + a); // Still 10!\n\n        Box box = new Box();\n        modifyObject(box);\n        System.out.println(\"Object field after method: \" + box.val); // 99!\n    }\n}",
      "explanation": "Examine the execution of Pass-by-Value Semantics: Primitives vs References."
    },
    "runnableCode": {
      "code": "class Box { int val = 10; }\n\npublic class Main {\n    public static void modifyPrimitive(int x) { x = 99; }\n    public static void modifyObject(Box b) { b.val = 99; }\n\n    public static void main(String[] args) {\n        int a = 10;\n        modifyPrimitive(a);\n        System.out.println(\"Primitive after method: \" + a); // Still 10!\n\n        Box box = new Box();\n        modifyObject(box);\n        System.out.println(\"Object field after method: \" + box.val); // 99!\n    }\n}",
      "expectedOutput": "Primitive after method: 10\\nObject field after method: 99"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming reassigning an object reference parameter inside a method changes the caller's variable.",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-pass-by-value",
        "question": "Is Java pass-by-reference or pass-by-value?",
        "answer": "Strictly pass-by-value (object references are copied by value)",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-pass-by-value",
        "question": "Is Java pass-by-reference or pass-by-value?",
        "options": [
          "Strictly pass-by-reference",
          "Strictly pass-by-value (object references are copied by value)",
          "Pass-by-name",
          "Hybrid based on operating system"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-pass-by-value",
      "title": "Exercise: Pass-by-Value Semantics: Primitives vs References",
      "difficulty": "Beginner",
      "description": "Implement Pass-by-Value Semantics: Primitives vs References to complete the task.",
      "starterCode": "class Box { int val = 10; }\n\npublic class Main {\n    public static void modifyPrimitive(int x) { x = 99; }\n    public static void modifyObject(Box b) { b.val = 99; }\n\n    public static void main(String[] args) {\n        int a = 10;\n        modifyPrimitive(a);\n        System.out.println(\"Primitive after method: \" + a); // Still 10!\n\n        Box box = new Box();\n        modifyObject(box);\n        System.out.println(\"Object field after method: \" + box.val); // 99!\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Box { int val = 10; }\n\npublic class Main {\n    public static void modifyPrimitive(int x) { x = 99; }\n    public static void modifyObject(Box b) { b.val = 99; }\n\n    public static void main(String[] args) {\n        int a = 10;\n        modifyPrimitive(a);\n        System.out.println(\"Primitive after method: \" + a); // Still 10!\n\n        Box box = new Box();\n        modifyObject(box);\n        System.out.println(\"Object field after method: \" + box.val); // 99!\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Pass-by-Value Semantics: Primitives vs References.",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-method-overloading",
      "nextLessonTitle": "Method Overloading (Compile-Time Polymorphism)",
      "nextLessonModuleId": "java-module-5"
    }
  },
  "java-method-overloading": {
    "id": "java-method-overloading",
    "moduleId": "java-module-5",
    "title": "Method Overloading (Compile-Time Polymorphism)",
    "subtitle": "Defining Multiple Methods with the Same Name but Distinct Signatures",
    "order": 3,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "call-stack",
    "objectives": [
      "Master Method Overloading (Compile-Time Polymorphism).",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Method Overloading (Compile-Time Polymorphism) Analogy",
      "text": "The word 'open': you can open a door, open a bank account, or open a conversation. The exact action depends on what noun you give it.",
      "metaphor": "The word 'open': you can open a door, open a bank account, or open a conversation. The exact action depends on what noun you give it."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Method Overloading (Compile-Time Polymorphism).",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Method Overloading (Compile-Time Polymorphism)",
      "code": "public class Main {\n    public static int add(int a, int b) { return a + b; }\n    public static double add(double a, double b) { return a + b; }\n    public static String add(String a, String b) { return a + b; }\n\n    public static void main(String[] args) {\n        System.out.println(\"Add ints: \" + add(5, 10));\n        System.out.println(\"Add doubles: \" + add(2.5, 4.5));\n        System.out.println(\"Add strings: \" + add(\"Java\", \"Lab\"));\n    }\n}",
      "explanation": "Examine the execution of Method Overloading (Compile-Time Polymorphism)."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static int add(int a, int b) { return a + b; }\n    public static double add(double a, double b) { return a + b; }\n    public static String add(String a, String b) { return a + b; }\n\n    public static void main(String[] args) {\n        System.out.println(\"Add ints: \" + add(5, 10));\n        System.out.println(\"Add doubles: \" + add(2.5, 4.5));\n        System.out.println(\"Add strings: \" + add(\"Java\", \"Lab\"));\n    }\n}",
      "expectedOutput": "Add ints: 15\\nAdd doubles: 7.0\\nAdd strings: JavaLab"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to overload a method by changing ONLY the return type, which the compiler rejects as a duplicate signature.",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-method-overloading",
        "question": "Can two methods in the same class differ ONLY by their return type?",
        "answer": "No, method signatures in Java only consist of method name and parameter types",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-method-overloading",
        "question": "Can two methods in the same class differ ONLY by their return type?",
        "options": [
          "Yes, the compiler chooses based on assignment",
          "No, method signatures in Java only consist of method name and parameter types",
          "Yes, if one is static",
          "Yes, in Java 17+"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-method-overloading",
      "title": "Exercise: Method Overloading (Compile-Time Polymorphism)",
      "difficulty": "Beginner",
      "description": "Implement Method Overloading (Compile-Time Polymorphism) to complete the task.",
      "starterCode": "public class Main {\n    public static int add(int a, int b) { return a + b; }\n    public static double add(double a, double b) { return a + b; }\n    public static String add(String a, String b) { return a + b; }\n\n    public static void main(String[] args) {\n        System.out.println(\"Add ints: \" + add(5, 10));\n        System.out.println(\"Add doubles: \" + add(2.5, 4.5));\n        System.out.println(\"Add strings: \" + add(\"Java\", \"Lab\"));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static int add(int a, int b) { return a + b; }\n    public static double add(double a, double b) { return a + b; }\n    public static String add(String a, String b) { return a + b; }\n\n    public static void main(String[] args) {\n        System.out.println(\"Add ints: \" + add(5, 10));\n        System.out.println(\"Add doubles: \" + add(2.5, 4.5));\n        System.out.println(\"Add strings: \" + add(\"Java\", \"Lab\"));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Method Overloading (Compile-Time Polymorphism).",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-varargs",
      "nextLessonTitle": "Variable-Length Arguments (Varargs ...)",
      "nextLessonModuleId": "java-module-5"
    }
  },
  "java-varargs": {
    "id": "java-varargs",
    "moduleId": "java-module-5",
    "title": "Variable-Length Arguments (Varargs ...)",
    "subtitle": "Simplifying Methods Accepting an Arbitrary Count of Parameters",
    "order": 4,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "call-stack",
    "objectives": [
      "Master Variable-Length Arguments (Varargs ...).",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Variable-Length Arguments (Varargs ...) Analogy",
      "text": "A shopping cart conveyor that can accept 0 items, 3 items, or 50 items into the same checkout lane.",
      "metaphor": "A shopping cart conveyor that can accept 0 items, 3 items, or 50 items into the same checkout lane."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Variable-Length Arguments (Varargs ...).",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Variable-Length Arguments (Varargs ...)",
      "code": "public class Main {\n    public static int sumAll(int... numbers) {\n        int total = 0;\n        for (int n : numbers) total += n;\n        return total;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Sum 0 items: \" + sumAll());\n        System.out.println(\"Sum 3 items: \" + sumAll(10, 20, 30));\n        System.out.println(\"Sum 5 items: \" + sumAll(1, 2, 3, 4, 5));\n    }\n}",
      "explanation": "Examine the execution of Variable-Length Arguments (Varargs ...)."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static int sumAll(int... numbers) {\n        int total = 0;\n        for (int n : numbers) total += n;\n        return total;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Sum 0 items: \" + sumAll());\n        System.out.println(\"Sum 3 items: \" + sumAll(10, 20, 30));\n        System.out.println(\"Sum 5 items: \" + sumAll(1, 2, 3, 4, 5));\n    }\n}",
      "expectedOutput": "Sum 0 items: 0\\nSum 3 items: 60\\nSum 5 items: 15"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Placing varargs before regular parameters in a method signature (varargs must ALWAYS be the final parameter).",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-varargs",
        "question": "Where must the varargs parameter (...) be positioned in a parameter list?",
        "answer": "As the last parameter only",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-varargs",
        "question": "Where must the varargs parameter (...) be positioned in a parameter list?",
        "options": [
          "At the very beginning",
          "Anywhere in the list",
          "As the last parameter only",
          "In the return statement"
        ],
        "correctIndex": 2,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-varargs",
      "title": "Exercise: Variable-Length Arguments (Varargs ...)",
      "difficulty": "Beginner",
      "description": "Implement Variable-Length Arguments (Varargs ...) to complete the task.",
      "starterCode": "public class Main {\n    public static int sumAll(int... numbers) {\n        int total = 0;\n        for (int n : numbers) total += n;\n        return total;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Sum 0 items: \" + sumAll());\n        System.out.println(\"Sum 3 items: \" + sumAll(10, 20, 30));\n        System.out.println(\"Sum 5 items: \" + sumAll(1, 2, 3, 4, 5));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static int sumAll(int... numbers) {\n        int total = 0;\n        for (int n : numbers) total += n;\n        return total;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Sum 0 items: \" + sumAll());\n        System.out.println(\"Sum 3 items: \" + sumAll(10, 20, 30));\n        System.out.println(\"Sum 5 items: \" + sumAll(1, 2, 3, 4, 5));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Variable-Length Arguments (Varargs ...).",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-static-methods",
      "nextLessonTitle": "Static Utility Methods vs Instance Methods",
      "nextLessonModuleId": "java-module-5"
    }
  },
  "java-static-methods": {
    "id": "java-static-methods",
    "moduleId": "java-module-5",
    "title": "Static Utility Methods vs Instance Methods",
    "subtitle": "Understanding Class-Level Invocation vs Object-Level Behavior",
    "order": 5,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "call-stack",
    "objectives": [
      "Master Static Utility Methods vs Instance Methods.",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Static Utility Methods vs Instance Methods Analogy",
      "text": "A town hall public clock (static, shared by everyone in town) vs a personal wristwatch (instance, unique to each individual wearer).",
      "metaphor": "A town hall public clock (static, shared by everyone in town) vs a personal wristwatch (instance, unique to each individual wearer)."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Static Utility Methods vs Instance Methods.",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Static Utility Methods vs Instance Methods",
      "code": "public class Main {\n    // Static method: called directly on class without 'new'\n    public static int square(int x) { return x * x; }\n\n    public static void main(String[] args) {\n        int result = Main.square(8);\n        System.out.println(\"8 squared via static method: \" + result);\n    }\n}",
      "explanation": "Examine the execution of Static Utility Methods vs Instance Methods."
    },
    "runnableCode": {
      "code": "public class Main {\n    // Static method: called directly on class without 'new'\n    public static int square(int x) { return x * x; }\n\n    public static void main(String[] args) {\n        int result = Main.square(8);\n        System.out.println(\"8 squared via static method: \" + result);\n    }\n}",
      "expectedOutput": "8 squared via static method: 64"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to access non-static instance fields or 'this' keyword inside a static method.",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-static-methods",
        "question": "Can a static method access an instance variable directly without creating an object?",
        "answer": "No, because static methods exist at class level before any instances are created",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-static-methods",
        "question": "Can a static method access an instance variable directly without creating an object?",
        "options": [
          "Yes, anytime",
          "No, because static methods exist at class level before any instances are created",
          "Yes, using super",
          "Only in the main method"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-static-methods",
      "title": "Exercise: Static Utility Methods vs Instance Methods",
      "difficulty": "Beginner",
      "description": "Implement Static Utility Methods vs Instance Methods to complete the task.",
      "starterCode": "public class Main {\n    // Static method: called directly on class without 'new'\n    public static int square(int x) { return x * x; }\n\n    public static void main(String[] args) {\n        int result = Main.square(8);\n        System.out.println(\"8 squared via static method: \" + result);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    // Static method: called directly on class without 'new'\n    public static int square(int x) { return x * x; }\n\n    public static void main(String[] args) {\n        int result = Main.square(8);\n        System.out.println(\"8 squared via static method: \" + result);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Static Utility Methods vs Instance Methods.",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-call-stack-frames",
      "nextLessonTitle": "Understanding the JVM Call Stack & Stack Frames",
      "nextLessonModuleId": "java-module-5"
    }
  },
  "java-call-stack-frames": {
    "id": "java-call-stack-frames",
    "moduleId": "java-module-5",
    "title": "Understanding the JVM Call Stack & Stack Frames",
    "subtitle": "How the JVM Manages Method Invocations, Parameters, and Return Addresses",
    "order": 6,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "call-stack",
    "objectives": [
      "Master Understanding the JVM Call Stack & Stack Frames.",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Understanding the JVM Call Stack & Stack Frames Analogy",
      "text": "A stack of dinner plates in a cafeteria: each method call pushes a new plate on top. Methods can only finish and pop from the top of the stack.",
      "metaphor": "A stack of dinner plates in a cafeteria: each method call pushes a new plate on top. Methods can only finish and pop from the top of the stack."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Understanding the JVM Call Stack & Stack Frames.",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Understanding the JVM Call Stack & Stack Frames",
      "code": "public class Main {\n    public static void stepC() { System.out.println(\"In Step C (Top of stack)\"); }\n    public static void stepB() { stepC(); }\n    public static void stepA() { stepB(); }\n\n    public static void main(String[] args) {\n        System.out.println(\"main() starts -> pushes frames\");\n        stepA();\n        System.out.println(\"main() ends -> all frames popped\");\n    }\n}",
      "explanation": "Examine the execution of Understanding the JVM Call Stack & Stack Frames."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void stepC() { System.out.println(\"In Step C (Top of stack)\"); }\n    public static void stepB() { stepC(); }\n    public static void stepA() { stepB(); }\n\n    public static void main(String[] args) {\n        System.out.println(\"main() starts -> pushes frames\");\n        stepA();\n        System.out.println(\"main() ends -> all frames popped\");\n    }\n}",
      "expectedOutput": "main() starts -> pushes frames\\nIn Step C (Top of stack)\\nmain() ends -> all frames popped"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming local variables persist in memory after their enclosing method frame pops off the stack.",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-call-stack-frames",
        "question": "What data structure does the JVM use to track active method invocations per thread?",
        "answer": "Call Stack (LIFO)",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-call-stack-frames",
        "question": "What data structure does the JVM use to track active method invocations per thread?",
        "options": [
          "Queue (FIFO)",
          "Call Stack (LIFO)",
          "Binary Tree",
          "Hash Map"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-call-stack-frames",
      "title": "Exercise: Understanding the JVM Call Stack & Stack Frames",
      "difficulty": "Beginner",
      "description": "Implement Understanding the JVM Call Stack & Stack Frames to complete the task.",
      "starterCode": "public class Main {\n    public static void stepC() { System.out.println(\"In Step C (Top of stack)\"); }\n    public static void stepB() { stepC(); }\n    public static void stepA() { stepB(); }\n\n    public static void main(String[] args) {\n        System.out.println(\"main() starts -> pushes frames\");\n        stepA();\n        System.out.println(\"main() ends -> all frames popped\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void stepC() { System.out.println(\"In Step C (Top of stack)\"); }\n    public static void stepB() { stepC(); }\n    public static void stepA() { stepB(); }\n\n    public static void main(String[] args) {\n        System.out.println(\"main() starts -> pushes frames\");\n        stepA();\n        System.out.println(\"main() ends -> all frames popped\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Understanding the JVM Call Stack & Stack Frames.",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-recursion-fundamentals",
      "nextLessonTitle": "Introduction to Recursion: Base Case vs Recursive Call",
      "nextLessonModuleId": "java-module-5"
    }
  },
  "java-recursion-fundamentals": {
    "id": "java-recursion-fundamentals",
    "moduleId": "java-module-5",
    "title": "Introduction to Recursion: Base Case vs Recursive Call",
    "subtitle": "Solving Self-Similar Subproblems and Preventing Infinite Recursion",
    "order": 7,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "call-stack",
    "objectives": [
      "Master Introduction to Recursion: Base Case vs Recursive Call.",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Introduction to Recursion: Base Case vs Recursive Call Analogy",
      "text": "Russian nesting dolls (Matryoshka): you open each doll to reveal a smaller version of itself, until you hit the solid core doll (the base case).",
      "metaphor": "Russian nesting dolls (Matryoshka): you open each doll to reveal a smaller version of itself, until you hit the solid core doll (the base case)."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Introduction to Recursion: Base Case vs Recursive Call.",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Introduction to Recursion: Base Case vs Recursive Call",
      "code": "public class Main {\n    public static void countdown(int n) {\n        // 1. Base case: Stops recursion!\n        if (n <= 0) {\n            System.out.println(\"Liftoff!\");\n            return;\n        }\n        // 2. Work & Recursive step\n        System.out.print(n + \"... \");\n        countdown(n - 1);\n    }\n\n    public static void main(String[] args) {\n        countdown(5);\n    }\n}",
      "explanation": "Examine the execution of Introduction to Recursion: Base Case vs Recursive Call."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void countdown(int n) {\n        // 1. Base case: Stops recursion!\n        if (n <= 0) {\n            System.out.println(\"Liftoff!\");\n            return;\n        }\n        // 2. Work & Recursive step\n        System.out.print(n + \"... \");\n        countdown(n - 1);\n    }\n\n    public static void main(String[] args) {\n        countdown(5);\n    }\n}",
      "expectedOutput": "5... 4... 3... 2... 1... Liftoff!"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Omitting the base case, causing infinite recursive calls and a StackOverflowError.",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-recursion-fundamentals",
        "question": "What must every valid recursive method contain to avoid infinite execution?",
        "answer": "A base case (termination condition)",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-recursion-fundamentals",
        "question": "What must every valid recursive method contain to avoid infinite execution?",
        "options": [
          "A loop",
          "A base case (termination condition)",
          "A static variable",
          "A try-catch block"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-recursion-fundamentals",
      "title": "Exercise: Introduction to Recursion: Base Case vs Recursive Call",
      "difficulty": "Beginner",
      "description": "Implement Introduction to Recursion: Base Case vs Recursive Call to complete the task.",
      "starterCode": "public class Main {\n    public static void countdown(int n) {\n        // 1. Base case: Stops recursion!\n        if (n <= 0) {\n            System.out.println(\"Liftoff!\");\n            return;\n        }\n        // 2. Work & Recursive step\n        System.out.print(n + \"... \");\n        countdown(n - 1);\n    }\n\n    public static void main(String[] args) {\n        countdown(5);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void countdown(int n) {\n        // 1. Base case: Stops recursion!\n        if (n <= 0) {\n            System.out.println(\"Liftoff!\");\n            return;\n        }\n        // 2. Work & Recursive step\n        System.out.print(n + \"... \");\n        countdown(n - 1);\n    }\n\n    public static void main(String[] args) {\n        countdown(5);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Introduction to Recursion: Base Case vs Recursive Call.",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-factorial-recursion",
      "nextLessonTitle": "Call Stack Analysis of Factorials and Countdown",
      "nextLessonModuleId": "java-module-5"
    }
  },
  "java-factorial-recursion": {
    "id": "java-factorial-recursion",
    "moduleId": "java-module-5",
    "title": "Call Stack Analysis of Factorials and Countdown",
    "subtitle": "Stack Frame Growth During Computation and Return Value Unwinding",
    "order": 8,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "call-stack",
    "objectives": [
      "Master Call Stack Analysis of Factorials and Countdown.",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Call Stack Analysis of Factorials and Countdown Analogy",
      "text": "Climbing down a ladder to fetch a book: you climb down 5 steps (calls), pick up the book at the bottom (base case), and climb back up multiplying on each rung.",
      "metaphor": "Climbing down a ladder to fetch a book: you climb down 5 steps (calls), pick up the book at the bottom (base case), and climb back up multiplying on each rung."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Call Stack Analysis of Factorials and Countdown.",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Call Stack Analysis of Factorials and Countdown",
      "code": "public class Main {\n    public static long factorial(int n) {\n        if (n <= 1) return 1; // Base case\n        return n * factorial(n - 1); // Recursive call\n    }\n\n    public static void main(String[] args) {\n        int number = 5;\n        System.out.println(number + \"! = \" + factorial(number));\n    }\n}",
      "explanation": "Examine the execution of Call Stack Analysis of Factorials and Countdown."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static long factorial(int n) {\n        if (n <= 1) return 1; // Base case\n        return n * factorial(n - 1); // Recursive call\n    }\n\n    public static void main(String[] args) {\n        int number = 5;\n        System.out.println(number + \"! = \" + factorial(number));\n    }\n}",
      "expectedOutput": "5! = 120"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using int for factorials above 12, causing integer overflow (13! exceeds int max 2.14B).",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-factorial-recursion",
        "question": "What is factorial(4)?",
        "answer": "24",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-factorial-recursion",
        "question": "What is factorial(4)?",
        "options": [
          "10",
          "24",
          "12",
          "16"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-factorial-recursion",
      "title": "Exercise: Call Stack Analysis of Factorials and Countdown",
      "difficulty": "Beginner",
      "description": "Implement Call Stack Analysis of Factorials and Countdown to complete the task.",
      "starterCode": "public class Main {\n    public static long factorial(int n) {\n        if (n <= 1) return 1; // Base case\n        return n * factorial(n - 1); // Recursive call\n    }\n\n    public static void main(String[] args) {\n        int number = 5;\n        System.out.println(number + \"! = \" + factorial(number));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static long factorial(int n) {\n        if (n <= 1) return 1; // Base case\n        return n * factorial(n - 1); // Recursive call\n    }\n\n    public static void main(String[] args) {\n        int number = 5;\n        System.out.println(number + \"! = \" + factorial(number));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Call Stack Analysis of Factorials and Countdown.",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-fibonacci-recursion",
      "nextLessonTitle": "Branching Recursion: Fibonacci & Call Trees",
      "nextLessonModuleId": "java-module-5"
    }
  },
  "java-fibonacci-recursion": {
    "id": "java-fibonacci-recursion",
    "moduleId": "java-module-5",
    "title": "Branching Recursion: Fibonacci & Call Trees",
    "subtitle": "Binary Recursion, Exponential Call Growth O(2^n), and Redundancy",
    "order": 9,
    "readTimeMinutes": 15,
    "difficulty": "Intermediate",
    "visualizerType": "call-stack",
    "objectives": [
      "Master Branching Recursion: Fibonacci & Call Trees.",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Branching Recursion: Fibonacci & Call Trees Analogy",
      "text": "A family tree that branches into two parents at every level, doubling the number of ancestors with each generation.",
      "metaphor": "A family tree that branches into two parents at every level, doubling the number of ancestors with each generation."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Branching Recursion: Fibonacci & Call Trees.",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Branching Recursion: Fibonacci & Call Trees",
      "code": "public class Main {\n    public static int fibonacci(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n\n    public static void main(String[] args) {\n        System.out.print(\"Fibonacci series: \");\n        for (int i = 0; i <= 6; i++) {\n            System.out.print(fibonacci(i) + \" \");\n        }\n        System.out.println();\n    }\n}",
      "explanation": "Examine the execution of Branching Recursion: Fibonacci & Call Trees."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static int fibonacci(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n\n    public static void main(String[] args) {\n        System.out.print(\"Fibonacci series: \");\n        for (int i = 0; i <= 6; i++) {\n            System.out.print(fibonacci(i) + \" \");\n        }\n        System.out.println();\n    }\n}",
      "expectedOutput": "Fibonacci series: 0 1 1 2 3 5 8 "
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using naive recursion for large Fibonacci numbers (e.g. fib(50)) which performs over a trillion redundant method calls.",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-fibonacci-recursion",
        "question": "What is the time complexity of naive recursive Fibonacci fib(n)?",
        "answer": "O(2^n) exponential",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-fibonacci-recursion",
        "question": "What is the time complexity of naive recursive Fibonacci fib(n)?",
        "options": [
          "O(n)",
          "O(log n)",
          "O(2^n) exponential",
          "O(1)"
        ],
        "correctIndex": 2,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-fibonacci-recursion",
      "title": "Exercise: Branching Recursion: Fibonacci & Call Trees",
      "difficulty": "Beginner",
      "description": "Implement Branching Recursion: Fibonacci & Call Trees to complete the task.",
      "starterCode": "public class Main {\n    public static int fibonacci(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n\n    public static void main(String[] args) {\n        System.out.print(\"Fibonacci series: \");\n        for (int i = 0; i <= 6; i++) {\n            System.out.print(fibonacci(i) + \" \");\n        }\n        System.out.println();\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static int fibonacci(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n\n    public static void main(String[] args) {\n        System.out.print(\"Fibonacci series: \");\n        for (int i = 0; i <= 6; i++) {\n            System.out.print(fibonacci(i) + \" \");\n        }\n        System.out.println();\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Branching Recursion: Fibonacci & Call Trees.",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-recursion-vs-iteration",
      "nextLessonTitle": "Recursion vs Iteration: Tradeoffs & StackOverflow Prevention",
      "nextLessonModuleId": "java-module-5"
    }
  },
  "java-recursion-vs-iteration": {
    "id": "java-recursion-vs-iteration",
    "moduleId": "java-module-5",
    "title": "Recursion vs Iteration: Tradeoffs & StackOverflow Prevention",
    "subtitle": "Comparing Stack Overhead, Speed, Readability, and JVM Thread Limits (-Xss)",
    "order": 10,
    "readTimeMinutes": 15,
    "difficulty": "Intermediate",
    "visualizerType": "call-stack",
    "objectives": [
      "Master Recursion vs Iteration: Tradeoffs & StackOverflow Prevention.",
      "Understand stack memory and parameter passing.",
      "Trace recursive call unwinding."
    ],
    "prerequisites": [
      "Module 4: Arrays and Strings"
    ],
    "analogy": {
      "title": "Recursion vs Iteration: Tradeoffs & StackOverflow Prevention Analogy",
      "text": "Using an elevator to go up 100 floors (iteration, steady loop) vs having 100 people stand on each other's shoulders (recursion, stacking up until it collapses).",
      "metaphor": "Using an elevator to go up 100 floors (iteration, steady loop) vs having 100 people stand on each other's shoulders (recursion, stacking up until it collapses)."
    },
    "problemSolved": {
      "title": "Code Reusability and Stack Management",
      "description": "Modularizes logic into clean functions and provides mathematical recursion mechanisms.",
      "keyPoints": [
        "DRY principle",
        "LIFO stack execution",
        "Clean subproblem breakdown"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Recursion vs Iteration: Tradeoffs & StackOverflow Prevention.",
      "steps": [
        {
          "step": 1,
          "title": "Method Invocation",
          "description": "Pushes new stack frame with local variables."
        },
        {
          "step": 2,
          "title": "Execution & Evaluation",
          "description": "Evaluates parameters and executes method body."
        },
        {
          "step": 3,
          "title": "Return & Pop",
          "description": "Returns result to caller and deallocates stack frame."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Recursion vs Iteration: Tradeoffs & StackOverflow Prevention",
      "code": "public class Main {\n    // Iterative version: O(1) auxiliary space, no stack growth\n    public static long factorialIterative(int n) {\n        long result = 1;\n        for (int i = 2; i <= n; i++) {\n            result *= i;\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Iterative factorial 6: \" + factorialIterative(6));\n    }\n}",
      "explanation": "Examine the execution of Recursion vs Iteration: Tradeoffs & StackOverflow Prevention."
    },
    "runnableCode": {
      "code": "public class Main {\n    // Iterative version: O(1) auxiliary space, no stack growth\n    public static long factorialIterative(int n) {\n        long result = 1;\n        for (int i = 2; i <= n; i++) {\n            result *= i;\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Iterative factorial 6: \" + factorialIterative(6));\n    }\n}",
      "expectedOutput": "Iterative factorial 6: 720"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and method declaration."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Method execution and logic",
        "explanation": "Method invocation and stack handling."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming recursion is always faster than iteration; recursion carries function call and stack frame overhead.",
        "solution": "Follow standard Java practices.",
        "whyWrong": "Improper method or recursion design causes errors."
      }
    ],
    "bestPractices": [
      "Keep methods focused on doing one single task well.",
      "Always test base cases thoroughly in recursion."
    ],
    "applications": [
      {
        "industry": "Compiler & Parsing",
        "useCase": "Recursive descent parsers and syntax tree evaluations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-recursion-vs-iteration",
        "question": "What exception is thrown when recursive depth exceeds the JVM stack size limit?",
        "answer": "StackOverflowError",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-recursion-vs-iteration",
        "question": "What exception is thrown when recursive depth exceeds the JVM stack size limit?",
        "options": [
          "OutOfMemoryError",
          "StackOverflowError",
          "RecursionDepthException",
          "IndexOutOfBoundsException"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-recursion-vs-iteration",
      "title": "Exercise: Recursion vs Iteration: Tradeoffs & StackOverflow Prevention",
      "difficulty": "Beginner",
      "description": "Implement Recursion vs Iteration: Tradeoffs & StackOverflow Prevention to complete the task.",
      "starterCode": "public class Main {\n    // Iterative version: O(1) auxiliary space, no stack growth\n    public static long factorialIterative(int n) {\n        long result = 1;\n        for (int i = 2; i <= n; i++) {\n            result *= i;\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Iterative factorial 6: \" + factorialIterative(6));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    // Iterative version: O(1) auxiliary space, no stack growth\n    public static long factorialIterative(int n) {\n        long result = 1;\n        for (int i = 2; i <= n; i++) {\n            result *= i;\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Iterative factorial 6: \" + factorialIterative(6));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Recursion vs Iteration: Tradeoffs & StackOverflow Prevention.",
        "Understood call stack frame lifecycles.",
        "Ready for OOP Fundamentals in Module 6."
      ],
      "nextLessonId": "java-oop-paradigms",
      "nextLessonTitle": "OOP Paradigms: Why Object-Oriented Programming Matters",
      "nextLessonModuleId": "java-module-6"
    }
  }
};
