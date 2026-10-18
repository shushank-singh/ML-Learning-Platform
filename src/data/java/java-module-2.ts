import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const javaModule2Data: JavaModuleData = {
  "id": "java-module-2",
  "number": 2,
  "title": "Variables and Data Types",
  "subtitle": "Primitives, Strings, Constants, Type Casting & Operators",
  "description": "Master how Java handles memory and types. Explore all 8 primitive types, understand String immutability and the String Constant Pool, use the final keyword, perform widening and narrowing type casts, and utilize operators.",
  "icon": "Layers",
  "badge": "Core Syntax",
  "estimatedHours": 9,
  "topicsCount": 10,
  "lessons": [
    {
      "id": "java-variables-declaration",
      "moduleId": "java-module-2",
      "title": "Variables and Static Typing in Java",
      "description": "Variable declaration, memory allocation, and the compile-time type safety contract.",
      "order": 1,
      "readTimeMinutes": 14,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "java-primitive-integers",
      "moduleId": "java-module-2",
      "title": "Primitive Integral Types (byte, short, int, long)",
      "description": "Bit sizes, two's complement ranges, integer overflow, and numeric literals.",
      "order": 2,
      "readTimeMinutes": 15,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "java-floating-point",
      "moduleId": "java-module-2",
      "title": "Floating-Point Types (float, double, and IEEE 754)",
      "description": "32-bit float vs 64-bit double, precision gotchas, and why banking uses BigDecimal.",
      "order": 3,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-char-boolean",
      "moduleId": "java-module-2",
      "title": "Character and Boolean Types (char and boolean)",
      "description": "16-bit Unicode characters, ASCII codes, and boolean logic flags.",
      "order": 4,
      "readTimeMinutes": 12,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-strings-immutability",
      "moduleId": "java-module-2",
      "title": "Strings in Java: The String Constant Pool",
      "description": "Why Strings are immutable reference objects and how the JVM optimizes string storage.",
      "order": 5,
      "readTimeMinutes": 18,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "java-constants-final",
      "moduleId": "java-module-2",
      "title": "Constants with the final Keyword",
      "description": "Preventing variable reassignment, immutable constants, and naming conventions.",
      "order": 6,
      "readTimeMinutes": 12,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-type-casting",
      "moduleId": "java-module-2",
      "title": "Type Casting: Widening vs Narrowing",
      "description": "Implicit widening promotions and explicit narrowing casts with potential data loss.",
      "order": 7,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-arithmetic-operators",
      "moduleId": "java-module-2",
      "title": "Arithmetic and Assignment Operators",
      "description": "Addition, subtraction, integer division /, modulo %, and compound operators (+=, -=).",
      "order": 8,
      "readTimeMinutes": 14,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-relational-logical",
      "moduleId": "java-module-2",
      "title": "Relational & Logical Operators (Short-Circuit)",
      "description": "Comparison operators (==, !=, <, >) and short-circuit logic (&&, ||, !).",
      "order": 9,
      "readTimeMinutes": 15,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    },
    {
      "id": "java-bitwise-operators",
      "moduleId": "java-module-2",
      "title": "Bitwise and Bit-Shift Operations in Java",
      "description": "Bitwise AND (&), OR (|), XOR (^), bit inversion (~), and binary shifts (<<, >>, >>>).",
      "order": 10,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    }
  ]
};

export const javaModule2Lessons: Record<string, JavaLessonContent> = {
  "java-variables-declaration": {
    "id": "java-variables-declaration",
    "moduleId": "java-module-2",
    "title": "Variables and Static Typing in Java",
    "subtitle": "Strong Typing, Memory Allocation on the Stack, and Variable Scope",
    "order": 1,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "memory-model",
    "objectives": [
      "Define variable declaration, initialization, and assignment in Java.",
      "Understand why Java is statically and strongly typed.",
      "Distinguish variable scopes: local variables vs class fields."
    ],
    "prerequisites": [
      "Module 1: Java Fundamentals"
    ],
    "analogy": {
      "title": "The Labeled Wooden Storage Slots",
      "text": "In dynamic languages like JavaScript or Python, variables are sticky labels you can peel off a number and paste onto a text sentence. In Java, a variable declaration is like building a fixed wooden compartment into your desk: if you carve an \"int\" slot, it is physically sized for 32-bit whole numbers only. Trying to cram a word or decimal into it causes the carpenter (javac) to reject it before it even leaves the shop.",
      "metaphor": "Declaration = Carving the slot; Initialization = Storing the first item; Static Typing = The strict slot dimensions."
    },
    "problemSolved": {
      "title": "Preventing Catastrophic Type Mismatch Bugs in Production",
      "description": "In dynamically typed code, assigning a string to a price variable causes runtime crashes hours later when a customer pays. Java requires every variable to declare its type upfront, catching bugs at compile time.",
      "keyPoints": [
        "Static Typing: Types are validated before running.",
        "Strong Typing: No implicit hazardous type coercion.",
        "Memory Efficiency: JVM reserves exact required bytes."
      ]
    },
    "intuition": {
      "overview": "Syntax: DataType variableName = initialValue;",
      "steps": [
        {
          "step": 1,
          "title": "DataType",
          "description": "Specifies the memory size and permissible operations (e.g. int, double, boolean)."
        },
        {
          "step": 2,
          "title": "variableName",
          "description": "The identifier used to reference this memory location in camelCase."
        },
        {
          "step": 3,
          "title": "initialValue",
          "description": "The literal or computed expression stored in the variable."
        }
      ]
    },
    "codeExample": {
      "title": "Declaring and Reassigning Strongly Typed Variables",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int studentAge = 20;\n        double gpa = 3.85;\n        boolean isEnrolled = true;\n        char letterGrade = 'A';\n\n        System.out.println(\"Student Age: \" + studentAge);\n        System.out.println(\"GPA: \" + gpa);\n        System.out.println(\"Enrolled: \" + isEnrolled);\n        System.out.println(\"Grade: \" + letterGrade);\n\n        // Reassignment with same type is valid:\n        studentAge = 21;\n        System.out.println(\"Updated Age next year: \" + studentAge);\n    }\n}",
      "explanation": "Variables must match their declared type on every assignment."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int studentAge = 20;\n        double gpa = 3.85;\n        boolean isEnrolled = true;\n        char letterGrade = 'A';\n\n        System.out.println(\"Student Age: \" + studentAge);\n        System.out.println(\"GPA: \" + gpa);\n        System.out.println(\"Enrolled: \" + isEnrolled);\n        System.out.println(\"Grade: \" + letterGrade);\n\n        studentAge = 21;\n        System.out.println(\"Updated Age next year: \" + studentAge);\n    }\n}",
      "expectedOutput": "Student Age: 20\nGPA: 3.85\nEnrolled: true\nGrade: A\nUpdated Age next year: 21"
    },
    "lineByLineExplanation": [
      {
        "lines": "3",
        "codeSnippet": "int studentAge = 20;",
        "explanation": "Allocates a 32-bit integer variable named studentAge initialized to 20."
      },
      {
        "lines": "4",
        "codeSnippet": "double gpa = 3.85;",
        "explanation": "Allocates a 64-bit double precision floating point variable."
      },
      {
        "lines": "12",
        "codeSnippet": "studentAge = 21;",
        "explanation": "Mutates the existing variable with a new integer value."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using an uninitialized local variable.",
        "solution": "Always assign a value to local variables before reading them.",
        "whyWrong": "Java does NOT assign default values to local variables inside methods; reading them causes a compilation error."
      }
    ],
    "bestPractices": [
      "Declare variables as close as possible to their first use point.",
      "Use meaningful, descriptive variable names rather than cryptic abbreviations."
    ],
    "applications": [
      {
        "industry": "Core Software",
        "useCase": "Tracking state safely across enterprise financial workflows."
      }
    ],
    "practiceQuestions": [
      {
        "id": "q1",
        "question": "Can you reassign a Java variable declared as \"int count = 5;\" to a string \"five\"?",
        "answer": "No, Java enforces static typing.",
        "explanation": "Once count is declared as int, it can only store 32-bit integer values."
      }
    ],
    "quiz": [
      {
        "id": "quiz-1",
        "question": "Which of the following occurs if you try to print an uninitialized local variable in Java?",
        "options": [
          "It prints null",
          "It prints 0",
          "The code fails to compile with an \"uninitialized variable\" error",
          "It prints undefined"
        ],
        "correctIndex": 2,
        "explanation": "Local variables inside methods must be explicitly initialized before use."
      }
    ],
    "codingChallenge": {
      "id": "ch-m2-1",
      "title": "Product Inventory Variable Tracker",
      "difficulty": "Beginner",
      "description": "Declare variables for productId (int = 101), price (double = 49.99), and inStock (boolean = true), then print them formatted.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Declare and print productId, price, and inStock\n    }\n}",
      "hints": [
        "int productId = 101;",
        "double price = 49.99;",
        "boolean inStock = true;"
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int productId = 101;\n        double price = 49.99;\n        boolean inStock = true;\n\n        System.out.println(\"ID: \" + productId);\n        System.out.println(\"Price: $\" + price);\n        System.out.println(\"In Stock: \" + inStock);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Java variables are strongly and statically typed.",
        "Local variables must be initialized before they are read.",
        "Types dictate memory size and available operations."
      ],
      "nextLessonId": "java-primitive-integers",
      "nextLessonTitle": "Primitive Integral Types (byte, short, int, long)",
      "nextLessonModuleId": "java-module-2"
    }
  },
  "java-primitive-integers": {
    "id": "java-primitive-integers",
    "moduleId": "java-module-2",
    "title": "Primitive Integral Types (byte, short, int, long)",
    "subtitle": "Bit Widths, Signed Ranges, Integer Overflow, and Numeric Underscores",
    "order": 2,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Understand the core concepts of Primitive Integral Types (byte, short, int, long).",
      "Avoid common syntax and logic pitfalls.",
      "Apply standard Java conventions in production code."
    ],
    "prerequisites": [
      "Previous lessons in Module 2"
    ],
    "analogy": {
      "title": "Primitive Integral Types (byte, short, int, long) Analogy",
      "text": "Like shipping boxes of 4 fixed sizes: byte is a pocket envelope, short is a shoe box, int is a moving box, and long is a shipping container.",
      "metaphor": "Like shipping boxes of 4 fixed sizes: byte is a pocket envelope, short is a shoe box, int is a moving box, and long is a shipping container."
    },
    "problemSolved": {
      "title": "Precision, Performance, and Safety in Java",
      "description": "Without Primitive Integral Types (byte, short, int, long), writing robust, memory-safe, and high-performance software would be impossible.",
      "keyPoints": [
        "Strong typing",
        "Predictable runtime behavior",
        "Optimal memory usage"
      ]
    },
    "intuition": {
      "overview": "A deep dive into Primitive Integral Types (byte, short, int, long) mechanisms in the Java Virtual Machine.",
      "steps": [
        {
          "step": 1,
          "title": "Concept Definition",
          "description": "Bit Widths, Signed Ranges, Integer Overflow, and Numeric Underscores"
        },
        {
          "step": 2,
          "title": "Evaluation Mechanism",
          "description": "Evaluated according to Java Language Specification rules."
        },
        {
          "step": 3,
          "title": "Output Result",
          "description": "Yields verified runtime behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Primitive Integral Types (byte, short, int, long)",
      "code": "public class Main {\n    public static void main(String[] args) {\n        byte smallNumber = 127;          // 8-bit (-128 to 127)\n        short mediumNumber = 32000;      // 16-bit (-32,768 to 32,767)\n        int standardInt = 2_147_483_647; // 32-bit (underscores for readability)\n        long bigNumber = 9_000_000_000L; // 64-bit (L suffix required)\n\n        System.out.println(\"byte: \" + smallNumber);\n        System.out.println(\"short: \" + mediumNumber);\n        System.out.println(\"int: \" + standardInt);\n        System.out.println(\"long: \" + bigNumber);\n    }\n}",
      "explanation": "Examine how Primitive Integral Types (byte, short, int, long) functions in runnable code."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        byte smallNumber = 127;          // 8-bit (-128 to 127)\n        short mediumNumber = 32000;      // 16-bit (-32,768 to 32,767)\n        int standardInt = 2_147_483_647; // 32-bit (underscores for readability)\n        long bigNumber = 9_000_000_000L; // 64-bit (L suffix required)\n\n        System.out.println(\"byte: \" + smallNumber);\n        System.out.println(\"short: \" + mediumNumber);\n        System.out.println(\"int: \" + standardInt);\n        System.out.println(\"long: \" + bigNumber);\n    }\n}",
      "expectedOutput": "byte: 127\\nshort: 32000\\nint: 2147483647\\nlong: 9000000000"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class and main method definition."
      },
      {
        "lines": "5-10",
        "codeSnippet": "// Core demonstration logic",
        "explanation": "Demonstrates the specific operator or type conversion."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting the 'L' or 'l' suffix on long literals that exceed 32-bit integer limits.",
        "solution": "Follow standard Java practices outlined in the lesson.",
        "whyWrong": "Violating type rules results in either compile-time errors or unexpected data loss."
      }
    ],
    "bestPractices": [
      "Write clean, intention-revealing code.",
      "Check data boundaries and test with edge cases."
    ],
    "applications": [
      {
        "industry": "Enterprise Systems",
        "useCase": "High-throughput data processing and calculation engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-primitive-integers",
        "question": "What suffix is required when assigning a long literal that exceeds 2 billion?",
        "answer": "L",
        "explanation": "Detailed explanation adhering to Java standards."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-primitive-integers",
        "question": "What suffix is required when assigning a long literal that exceeds 2 billion?",
        "options": [
          "f",
          "L",
          "d",
          "b"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-primitive-integers",
      "title": "Exercise: Primitive Integral Types (byte, short, int, long)",
      "difficulty": "Beginner",
      "description": "Write a Java program that demonstrates the principle of Primitive Integral Types (byte, short, int, long).",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        byte smallNumber = 127;          // 8-bit (-128 to 127)\n        short mediumNumber = 32000;      // 16-bit (-32,768 to 32,767)\n        int standardInt = 2_147_483_647; // 32-bit (underscores for readability)\n        long bigNumber = 9_000_000_000L; // 64-bit (L suffix required)\n\n        System.out.println(\"byte: \" + smallNumber);\n        System.out.println(\"short: \" + mediumNumber);\n        System.out.println(\"int: \" + standardInt);\n        System.out.println(\"long: \" + bigNumber);\n    }\n}",
      "hints": [
        "Review the lesson explanation."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        byte smallNumber = 127;          // 8-bit (-128 to 127)\n        short mediumNumber = 32000;      // 16-bit (-32,768 to 32,767)\n        int standardInt = 2_147_483_647; // 32-bit (underscores for readability)\n        long bigNumber = 9_000_000_000L; // 64-bit (L suffix required)\n\n        System.out.println(\"byte: \" + smallNumber);\n        System.out.println(\"short: \" + mediumNumber);\n        System.out.println(\"int: \" + standardInt);\n        System.out.println(\"long: \" + bigNumber);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Primitive Integral Types (byte, short, int, long).",
        "Understood JVM internal representations.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "java-floating-point",
      "nextLessonTitle": "Floating-Point Types (float, double, and IEEE 754)",
      "nextLessonModuleId": "java-module-2"
    }
  },
  "java-floating-point": {
    "id": "java-floating-point",
    "moduleId": "java-module-2",
    "title": "Floating-Point Types (float, double, and IEEE 754)",
    "subtitle": "Single vs Double Precision, Decimal Rounding Gotchas, and Scientific Notation",
    "order": 3,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Understand the core concepts of Floating-Point Types (float, double, and IEEE 754).",
      "Avoid common syntax and logic pitfalls.",
      "Apply standard Java conventions in production code."
    ],
    "prerequisites": [
      "Previous lessons in Module 2"
    ],
    "analogy": {
      "title": "Floating-Point Types (float, double, and IEEE 754) Analogy",
      "text": "Writing decimals in base 10 is easy (1/2 = 0.5), but 1/3 = 0.33333... never terminates. In computer binary, 0.1 cannot be represented finitely, causing tiny rounding fractions.",
      "metaphor": "Writing decimals in base 10 is easy (1/2 = 0.5), but 1/3 = 0.33333... never terminates. In computer binary, 0.1 cannot be represented finitely, causing tiny rounding fractions."
    },
    "problemSolved": {
      "title": "Precision, Performance, and Safety in Java",
      "description": "Without Floating-Point Types (float, double, and IEEE 754), writing robust, memory-safe, and high-performance software would be impossible.",
      "keyPoints": [
        "Strong typing",
        "Predictable runtime behavior",
        "Optimal memory usage"
      ]
    },
    "intuition": {
      "overview": "A deep dive into Floating-Point Types (float, double, and IEEE 754) mechanisms in the Java Virtual Machine.",
      "steps": [
        {
          "step": 1,
          "title": "Concept Definition",
          "description": "Single vs Double Precision, Decimal Rounding Gotchas, and Scientific Notation"
        },
        {
          "step": 2,
          "title": "Evaluation Mechanism",
          "description": "Evaluated according to Java Language Specification rules."
        },
        {
          "step": 3,
          "title": "Output Result",
          "description": "Yields verified runtime behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Floating-Point Types (float, double, and IEEE 754)",
      "code": "public class Main {\n    public static void main(String[] args) {\n        float f = 3.14159f; // 32-bit (requires f suffix)\n        double d = 3.141592653589793; // 64-bit default\n        \n        System.out.println(\"Float: \" + f);\n        System.out.println(\"Double: \" + d);\n\n        // IEEE 754 floating point gotcha:\n        double diff = 0.1 + 0.2;\n        System.out.println(\"0.1 + 0.2 = \" + diff);\n    }\n}",
      "explanation": "Examine how Floating-Point Types (float, double, and IEEE 754) functions in runnable code."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        float f = 3.14159f; // 32-bit (requires f suffix)\n        double d = 3.141592653589793; // 64-bit default\n        \n        System.out.println(\"Float: \" + f);\n        System.out.println(\"Double: \" + d);\n\n        // IEEE 754 floating point gotcha:\n        double diff = 0.1 + 0.2;\n        System.out.println(\"0.1 + 0.2 = \" + diff);\n    }\n}",
      "expectedOutput": "Float: 3.14159\\nDouble: 3.141592653589793\\n0.1 + 0.2 = 0.30000000000000004"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class and main method definition."
      },
      {
        "lines": "5-10",
        "codeSnippet": "// Core demonstration logic",
        "explanation": "Demonstrates the specific operator or type conversion."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using double or float for financial banking transactions instead of BigDecimal.",
        "solution": "Follow standard Java practices outlined in the lesson.",
        "whyWrong": "Violating type rules results in either compile-time errors or unexpected data loss."
      }
    ],
    "bestPractices": [
      "Write clean, intention-revealing code.",
      "Check data boundaries and test with edge cases."
    ],
    "applications": [
      {
        "industry": "Enterprise Systems",
        "useCase": "High-throughput data processing and calculation engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-floating-point",
        "question": "Why is 0.1 + 0.2 not exactly equal to 0.3 in Java floating-point arithmetic?",
        "answer": "Binary floating point cannot precisely represent base-10 fractions like 0.1",
        "explanation": "Detailed explanation adhering to Java standards."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-floating-point",
        "question": "Why is 0.1 + 0.2 not exactly equal to 0.3 in Java floating-point arithmetic?",
        "options": [
          "The JVM is bugged",
          "Binary floating point cannot precisely represent base-10 fractions like 0.1",
          "Java truncates all calculations to 1 decimal place",
          "It requires the float suffix"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-floating-point",
      "title": "Exercise: Floating-Point Types (float, double, and IEEE 754)",
      "difficulty": "Beginner",
      "description": "Write a Java program that demonstrates the principle of Floating-Point Types (float, double, and IEEE 754).",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        float f = 3.14159f; // 32-bit (requires f suffix)\n        double d = 3.141592653589793; // 64-bit default\n        \n        System.out.println(\"Float: \" + f);\n        System.out.println(\"Double: \" + d);\n\n        // IEEE 754 floating point gotcha:\n        double diff = 0.1 + 0.2;\n        System.out.println(\"0.1 + 0.2 = \" + diff);\n    }\n}",
      "hints": [
        "Review the lesson explanation."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        float f = 3.14159f; // 32-bit (requires f suffix)\n        double d = 3.141592653589793; // 64-bit default\n        \n        System.out.println(\"Float: \" + f);\n        System.out.println(\"Double: \" + d);\n\n        // IEEE 754 floating point gotcha:\n        double diff = 0.1 + 0.2;\n        System.out.println(\"0.1 + 0.2 = \" + diff);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Floating-Point Types (float, double, and IEEE 754).",
        "Understood JVM internal representations.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "java-char-boolean",
      "nextLessonTitle": "Character and Boolean Types (char and boolean)",
      "nextLessonModuleId": "java-module-2"
    }
  },
  "java-char-boolean": {
    "id": "java-char-boolean",
    "moduleId": "java-module-2",
    "title": "Character and Boolean Types (char and boolean)",
    "subtitle": "16-bit Unicode Characters, ASCII Character Codes, and Boolean Logic Flags",
    "order": 4,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Understand the core concepts of Character and Boolean Types (char and boolean).",
      "Avoid common syntax and logic pitfalls.",
      "Apply standard Java conventions in production code."
    ],
    "prerequisites": [
      "Previous lessons in Module 2"
    ],
    "analogy": {
      "title": "Character and Boolean Types (char and boolean) Analogy",
      "text": "char is like a single glyph stamp in a universal typewriter containing every world language symbol. boolean is a simple light switch with only two physical positions: ON or OFF.",
      "metaphor": "char is like a single glyph stamp in a universal typewriter containing every world language symbol. boolean is a simple light switch with only two physical positions: ON or OFF."
    },
    "problemSolved": {
      "title": "Precision, Performance, and Safety in Java",
      "description": "Without Character and Boolean Types (char and boolean), writing robust, memory-safe, and high-performance software would be impossible.",
      "keyPoints": [
        "Strong typing",
        "Predictable runtime behavior",
        "Optimal memory usage"
      ]
    },
    "intuition": {
      "overview": "A deep dive into Character and Boolean Types (char and boolean) mechanisms in the Java Virtual Machine.",
      "steps": [
        {
          "step": 1,
          "title": "Concept Definition",
          "description": "16-bit Unicode Characters, ASCII Character Codes, and Boolean Logic Flags"
        },
        {
          "step": 2,
          "title": "Evaluation Mechanism",
          "description": "Evaluated according to Java Language Specification rules."
        },
        {
          "step": 3,
          "title": "Output Result",
          "description": "Yields verified runtime behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Character and Boolean Types (char and boolean)",
      "code": "public class Main {\n    public static void main(String[] args) {\n        char ch = 'A';\n        char unicodeHeart = '\\u2764';\n        boolean isReady = true;\n\n        System.out.println(\"Char: \" + ch + \" (ASCII code: \" + (int)ch + \")\");\n        System.out.println(\"Unicode symbol: \" + unicodeHeart);\n        System.out.println(\"Boolean flag: \" + isReady);\n    }\n}",
      "explanation": "Examine how Character and Boolean Types (char and boolean) functions in runnable code."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        char ch = 'A';\n        char unicodeHeart = '\\u2764';\n        boolean isReady = true;\n\n        System.out.println(\"Char: \" + ch + \" (ASCII code: \" + (int)ch + \")\");\n        System.out.println(\"Unicode symbol: \" + unicodeHeart);\n        System.out.println(\"Boolean flag: \" + isReady);\n    }\n}",
      "expectedOutput": "Char: A (ASCII code: 65)\\nUnicode symbol: ❤\\nBoolean flag: true"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class and main method definition."
      },
      {
        "lines": "5-10",
        "codeSnippet": "// Core demonstration logic",
        "explanation": "Demonstrates the specific operator or type conversion."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using double quotes for a char ('A' is a char, \"A\" is a String object).",
        "solution": "Follow standard Java practices outlined in the lesson.",
        "whyWrong": "Violating type rules results in either compile-time errors or unexpected data loss."
      }
    ],
    "bestPractices": [
      "Write clean, intention-revealing code.",
      "Check data boundaries and test with edge cases."
    ],
    "applications": [
      {
        "industry": "Enterprise Systems",
        "useCase": "High-throughput data processing and calculation engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-char-boolean",
        "question": "What is the size of the char primitive in Java?",
        "answer": "16 bits (UTF-16 code unit)",
        "explanation": "Detailed explanation adhering to Java standards."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-char-boolean",
        "question": "What is the size of the char primitive in Java?",
        "options": [
          "8 bits (ASCII only)",
          "16 bits (UTF-16 code unit)",
          "32 bits",
          "64 bits"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-char-boolean",
      "title": "Exercise: Character and Boolean Types (char and boolean)",
      "difficulty": "Beginner",
      "description": "Write a Java program that demonstrates the principle of Character and Boolean Types (char and boolean).",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        char ch = 'A';\n        char unicodeHeart = '\\u2764';\n        boolean isReady = true;\n\n        System.out.println(\"Char: \" + ch + \" (ASCII code: \" + (int)ch + \")\");\n        System.out.println(\"Unicode symbol: \" + unicodeHeart);\n        System.out.println(\"Boolean flag: \" + isReady);\n    }\n}",
      "hints": [
        "Review the lesson explanation."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        char ch = 'A';\n        char unicodeHeart = '\\u2764';\n        boolean isReady = true;\n\n        System.out.println(\"Char: \" + ch + \" (ASCII code: \" + (int)ch + \")\");\n        System.out.println(\"Unicode symbol: \" + unicodeHeart);\n        System.out.println(\"Boolean flag: \" + isReady);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Character and Boolean Types (char and boolean).",
        "Understood JVM internal representations.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "java-strings-immutability",
      "nextLessonTitle": "Strings in Java: The String Constant Pool",
      "nextLessonModuleId": "java-module-2"
    }
  },
  "java-strings-immutability": {
    "id": "java-strings-immutability",
    "moduleId": "java-module-2",
    "title": "Strings in Java: The String Constant Pool",
    "subtitle": "Why Java Strings Cannot Be Mutated and How the Heap String Pool Conserves Memory",
    "order": 5,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "memory-model",
    "objectives": [
      "Understand the core concepts of Strings in Java: The String Constant Pool.",
      "Avoid common syntax and logic pitfalls.",
      "Apply standard Java conventions in production code."
    ],
    "prerequisites": [
      "Previous lessons in Module 2"
    ],
    "analogy": {
      "title": "Strings in Java: The String Constant Pool Analogy",
      "text": "Like published books in a library: once printed, you cannot erase words on page 5. If you want a modified version, you print an entirely new edition. The String Constant Pool is the shared library shelf so identical book titles are not duplicated.",
      "metaphor": "Like published books in a library: once printed, you cannot erase words on page 5. If you want a modified version, you print an entirely new edition. The String Constant Pool is the shared library shelf so identical book titles are not duplicated."
    },
    "problemSolved": {
      "title": "Precision, Performance, and Safety in Java",
      "description": "Without Strings in Java: The String Constant Pool, writing robust, memory-safe, and high-performance software would be impossible.",
      "keyPoints": [
        "Strong typing",
        "Predictable runtime behavior",
        "Optimal memory usage"
      ]
    },
    "intuition": {
      "overview": "A deep dive into Strings in Java: The String Constant Pool mechanisms in the Java Virtual Machine.",
      "steps": [
        {
          "step": 1,
          "title": "Concept Definition",
          "description": "Why Java Strings Cannot Be Mutated and How the Heap String Pool Conserves Memory"
        },
        {
          "step": 2,
          "title": "Evaluation Mechanism",
          "description": "Evaluated according to Java Language Specification rules."
        },
        {
          "step": 3,
          "title": "Output Result",
          "description": "Yields verified runtime behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Strings in Java: The String Constant Pool",
      "code": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = \"Java\"; // Points to the same pool object!\n        String s3 = new String(\"Java\"); // Forces new heap allocation\n\n        System.out.println(\"s1 == s2: \" + (s1 == s2)); // true (same pool reference)\n        System.out.println(\"s1 == s3: \" + (s1 == s3)); // false (different addresses)\n        System.out.println(\"s1.equals(s3): \" + s1.equals(s3)); // true (same content)\n    }\n}",
      "explanation": "Examine how Strings in Java: The String Constant Pool functions in runnable code."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = \"Java\"; // Points to the same pool object!\n        String s3 = new String(\"Java\"); // Forces new heap allocation\n\n        System.out.println(\"s1 == s2: \" + (s1 == s2)); // true (same pool reference)\n        System.out.println(\"s1 == s3: \" + (s1 == s3)); // false (different addresses)\n        System.out.println(\"s1.equals(s3): \" + s1.equals(s3)); // true (same content)\n    }\n}",
      "expectedOutput": "s1 == s2: true\\ns1 == s3: false\\ns1.equals(s3): true"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class and main method definition."
      },
      {
        "lines": "5-10",
        "codeSnippet": "// Core demonstration logic",
        "explanation": "Demonstrates the specific operator or type conversion."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using == instead of .equals() to compare string text contents.",
        "solution": "Follow standard Java practices outlined in the lesson.",
        "whyWrong": "Violating type rules results in either compile-time errors or unexpected data loss."
      }
    ],
    "bestPractices": [
      "Write clean, intention-revealing code.",
      "Check data boundaries and test with edge cases."
    ],
    "applications": [
      {
        "industry": "Enterprise Systems",
        "useCase": "High-throughput data processing and calculation engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-strings-immutability",
        "question": "What operator should ALWAYS be used to compare the content of two String variables?",
        "answer": ".equals()",
        "explanation": "Detailed explanation adhering to Java standards."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-strings-immutability",
        "question": "What operator should ALWAYS be used to compare the content of two String variables?",
        "options": [
          "==",
          ".equals()",
          "===",
          ".compare()"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-strings-immutability",
      "title": "Exercise: Strings in Java: The String Constant Pool",
      "difficulty": "Beginner",
      "description": "Write a Java program that demonstrates the principle of Strings in Java: The String Constant Pool.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = \"Java\"; // Points to the same pool object!\n        String s3 = new String(\"Java\"); // Forces new heap allocation\n\n        System.out.println(\"s1 == s2: \" + (s1 == s2)); // true (same pool reference)\n        System.out.println(\"s1 == s3: \" + (s1 == s3)); // false (different addresses)\n        System.out.println(\"s1.equals(s3): \" + s1.equals(s3)); // true (same content)\n    }\n}",
      "hints": [
        "Review the lesson explanation."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = \"Java\"; // Points to the same pool object!\n        String s3 = new String(\"Java\"); // Forces new heap allocation\n\n        System.out.println(\"s1 == s2: \" + (s1 == s2)); // true (same pool reference)\n        System.out.println(\"s1 == s3: \" + (s1 == s3)); // false (different addresses)\n        System.out.println(\"s1.equals(s3): \" + s1.equals(s3)); // true (same content)\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Strings in Java: The String Constant Pool.",
        "Understood JVM internal representations.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "java-constants-final",
      "nextLessonTitle": "Constants with the final Keyword",
      "nextLessonModuleId": "java-module-2"
    }
  },
  "java-constants-final": {
    "id": "java-constants-final",
    "moduleId": "java-module-2",
    "title": "Constants with the final Keyword",
    "subtitle": "Locking Variable Reassignment, Immutable Values, and the static final Idiom",
    "order": 6,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Understand the core concepts of Constants with the final Keyword.",
      "Avoid common syntax and logic pitfalls.",
      "Apply standard Java conventions in production code."
    ],
    "prerequisites": [
      "Previous lessons in Module 2"
    ],
    "analogy": {
      "title": "Constants with the final Keyword Analogy",
      "text": "final is like engraving text into solid stone rather than writing in pencil on a whiteboard: once engraved, no one can erase or overwrite it.",
      "metaphor": "final is like engraving text into solid stone rather than writing in pencil on a whiteboard: once engraved, no one can erase or overwrite it."
    },
    "problemSolved": {
      "title": "Precision, Performance, and Safety in Java",
      "description": "Without Constants with the final Keyword, writing robust, memory-safe, and high-performance software would be impossible.",
      "keyPoints": [
        "Strong typing",
        "Predictable runtime behavior",
        "Optimal memory usage"
      ]
    },
    "intuition": {
      "overview": "A deep dive into Constants with the final Keyword mechanisms in the Java Virtual Machine.",
      "steps": [
        {
          "step": 1,
          "title": "Concept Definition",
          "description": "Locking Variable Reassignment, Immutable Values, and the static final Idiom"
        },
        {
          "step": 2,
          "title": "Evaluation Mechanism",
          "description": "Evaluated according to Java Language Specification rules."
        },
        {
          "step": 3,
          "title": "Output Result",
          "description": "Yields verified runtime behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Constants with the final Keyword",
      "code": "public class Main {\n    public static final double PI = 3.141592653589793;\n    public static final int DAYS_IN_WEEK = 7;\n\n    public static void main(String[] args) {\n        final int localLimit = 100;\n        System.out.println(\"PI: \" + PI);\n        System.out.println(\"Days in week: \" + DAYS_IN_WEEK);\n        System.out.println(\"Local limit: \" + localLimit);\n    }\n}",
      "explanation": "Examine how Constants with the final Keyword functions in runnable code."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static final double PI = 3.141592653589793;\n    public static final int DAYS_IN_WEEK = 7;\n\n    public static void main(String[] args) {\n        final int localLimit = 100;\n        System.out.println(\"PI: \" + PI);\n        System.out.println(\"Days in week: \" + DAYS_IN_WEEK);\n        System.out.println(\"Local limit: \" + localLimit);\n    }\n}",
      "expectedOutput": "PI: 3.141592653589793\\nDays in week: 7\\nLocal limit: 100"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class and main method definition."
      },
      {
        "lines": "5-10",
        "codeSnippet": "// Core demonstration logic",
        "explanation": "Demonstrates the specific operator or type conversion."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to reassign a final variable after initial assignment, causing a compiler error.",
        "solution": "Follow standard Java practices outlined in the lesson.",
        "whyWrong": "Violating type rules results in either compile-time errors or unexpected data loss."
      }
    ],
    "bestPractices": [
      "Write clean, intention-revealing code.",
      "Check data boundaries and test with edge cases."
    ],
    "applications": [
      {
        "industry": "Enterprise Systems",
        "useCase": "High-throughput data processing and calculation engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-constants-final",
        "question": "What Java keyword makes a variable constant so it cannot be reassigned?",
        "answer": "final",
        "explanation": "Detailed explanation adhering to Java standards."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-constants-final",
        "question": "What Java keyword makes a variable constant so it cannot be reassigned?",
        "options": [
          "const",
          "final",
          "static",
          "immutable"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-constants-final",
      "title": "Exercise: Constants with the final Keyword",
      "difficulty": "Beginner",
      "description": "Write a Java program that demonstrates the principle of Constants with the final Keyword.",
      "starterCode": "public class Main {\n    public static final double PI = 3.141592653589793;\n    public static final int DAYS_IN_WEEK = 7;\n\n    public static void main(String[] args) {\n        final int localLimit = 100;\n        System.out.println(\"PI: \" + PI);\n        System.out.println(\"Days in week: \" + DAYS_IN_WEEK);\n        System.out.println(\"Local limit: \" + localLimit);\n    }\n}",
      "hints": [
        "Review the lesson explanation."
      ],
      "solutionCode": "public class Main {\n    public static final double PI = 3.141592653589793;\n    public static final int DAYS_IN_WEEK = 7;\n\n    public static void main(String[] args) {\n        final int localLimit = 100;\n        System.out.println(\"PI: \" + PI);\n        System.out.println(\"Days in week: \" + DAYS_IN_WEEK);\n        System.out.println(\"Local limit: \" + localLimit);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Constants with the final Keyword.",
        "Understood JVM internal representations.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "java-type-casting",
      "nextLessonTitle": "Type Casting: Widening vs Narrowing",
      "nextLessonModuleId": "java-module-2"
    }
  },
  "java-type-casting": {
    "id": "java-type-casting",
    "moduleId": "java-module-2",
    "title": "Type Casting: Widening vs Narrowing",
    "subtitle": "Automatic Type Promotion (No Loss) vs Explicit Casting with Potential Overflow",
    "order": 7,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Understand the core concepts of Type Casting: Widening vs Narrowing.",
      "Avoid common syntax and logic pitfalls.",
      "Apply standard Java conventions in production code."
    ],
    "prerequisites": [
      "Previous lessons in Module 2"
    ],
    "analogy": {
      "title": "Type Casting: Widening vs Narrowing Analogy",
      "text": "Pouring water from a teacup into a gallon bucket (widening) is completely safe and never spills. Pouring water from a gallon bucket into a teacup (narrowing) requires explicit permission and will spill excess water.",
      "metaphor": "Pouring water from a teacup into a gallon bucket (widening) is completely safe and never spills. Pouring water from a gallon bucket into a teacup (narrowing) requires explicit permission and will spill excess water."
    },
    "problemSolved": {
      "title": "Precision, Performance, and Safety in Java",
      "description": "Without Type Casting: Widening vs Narrowing, writing robust, memory-safe, and high-performance software would be impossible.",
      "keyPoints": [
        "Strong typing",
        "Predictable runtime behavior",
        "Optimal memory usage"
      ]
    },
    "intuition": {
      "overview": "A deep dive into Type Casting: Widening vs Narrowing mechanisms in the Java Virtual Machine.",
      "steps": [
        {
          "step": 1,
          "title": "Concept Definition",
          "description": "Automatic Type Promotion (No Loss) vs Explicit Casting with Potential Overflow"
        },
        {
          "step": 2,
          "title": "Evaluation Mechanism",
          "description": "Evaluated according to Java Language Specification rules."
        },
        {
          "step": 3,
          "title": "Output Result",
          "description": "Yields verified runtime behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Type Casting: Widening vs Narrowing",
      "code": "public class Main {\n    public static void main(String[] args) {\n        // Widening (Implicit): int -> double (Safe)\n        int num = 100;\n        double wide = num;\n        System.out.println(\"Widened int to double: \" + wide);\n\n        // Narrowing (Explicit): double -> int (Truncates decimal)\n        double price = 99.95;\n        int dollars = (int) price;\n        System.out.println(\"Narrowed price to int: \" + dollars);\n\n        // Overflow narrowing gotcha:\n        int huge = 130;\n        byte overflow = (byte) huge; // 130 exceeds byte max 127\n        System.out.println(\"130 cast to byte overflows to: \" + overflow);\n    }\n}",
      "explanation": "Examine how Type Casting: Widening vs Narrowing functions in runnable code."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        // Widening (Implicit): int -> double (Safe)\n        int num = 100;\n        double wide = num;\n        System.out.println(\"Widened int to double: \" + wide);\n\n        // Narrowing (Explicit): double -> int (Truncates decimal)\n        double price = 99.95;\n        int dollars = (int) price;\n        System.out.println(\"Narrowed price to int: \" + dollars);\n\n        // Overflow narrowing gotcha:\n        int huge = 130;\n        byte overflow = (byte) huge; // 130 exceeds byte max 127\n        System.out.println(\"130 cast to byte overflows to: \" + overflow);\n    }\n}",
      "expectedOutput": "Widened int to double: 100.0\\nNarrowed price to int: 99\\n130 cast to byte overflows to: -126"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class and main method definition."
      },
      {
        "lines": "5-10",
        "codeSnippet": "// Core demonstration logic",
        "explanation": "Demonstrates the specific operator or type conversion."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Expecting (int) 9.99 to round to 10; casting truncates the decimal portion entirely (yields 9).",
        "solution": "Follow standard Java practices outlined in the lesson.",
        "whyWrong": "Violating type rules results in either compile-time errors or unexpected data loss."
      }
    ],
    "bestPractices": [
      "Write clean, intention-revealing code.",
      "Check data boundaries and test with edge cases."
    ],
    "applications": [
      {
        "industry": "Enterprise Systems",
        "useCase": "High-throughput data processing and calculation engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-type-casting",
        "question": "What happens when you cast 15.9 to an int using (int) 15.9?",
        "answer": "Truncates to 15",
        "explanation": "Detailed explanation adhering to Java standards."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-type-casting",
        "question": "What happens when you cast 15.9 to an int using (int) 15.9?",
        "options": [
          "Rounds to 16",
          "Truncates to 15",
          "Throws an ArithmeticException",
          "Produces 15.90"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-type-casting",
      "title": "Exercise: Type Casting: Widening vs Narrowing",
      "difficulty": "Beginner",
      "description": "Write a Java program that demonstrates the principle of Type Casting: Widening vs Narrowing.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Widening (Implicit): int -> double (Safe)\n        int num = 100;\n        double wide = num;\n        System.out.println(\"Widened int to double: \" + wide);\n\n        // Narrowing (Explicit): double -> int (Truncates decimal)\n        double price = 99.95;\n        int dollars = (int) price;\n        System.out.println(\"Narrowed price to int: \" + dollars);\n\n        // Overflow narrowing gotcha:\n        int huge = 130;\n        byte overflow = (byte) huge; // 130 exceeds byte max 127\n        System.out.println(\"130 cast to byte overflows to: \" + overflow);\n    }\n}",
      "hints": [
        "Review the lesson explanation."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        // Widening (Implicit): int -> double (Safe)\n        int num = 100;\n        double wide = num;\n        System.out.println(\"Widened int to double: \" + wide);\n\n        // Narrowing (Explicit): double -> int (Truncates decimal)\n        double price = 99.95;\n        int dollars = (int) price;\n        System.out.println(\"Narrowed price to int: \" + dollars);\n\n        // Overflow narrowing gotcha:\n        int huge = 130;\n        byte overflow = (byte) huge; // 130 exceeds byte max 127\n        System.out.println(\"130 cast to byte overflows to: \" + overflow);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Type Casting: Widening vs Narrowing.",
        "Understood JVM internal representations.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "java-arithmetic-operators",
      "nextLessonTitle": "Arithmetic and Assignment Operators",
      "nextLessonModuleId": "java-module-2"
    }
  },
  "java-arithmetic-operators": {
    "id": "java-arithmetic-operators",
    "moduleId": "java-module-2",
    "title": "Arithmetic and Assignment Operators",
    "subtitle": "Addition, Subtraction, Multiplication, Integer Truncation Division, and Modulo",
    "order": 8,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Understand the core concepts of Arithmetic and Assignment Operators.",
      "Avoid common syntax and logic pitfalls.",
      "Apply standard Java conventions in production code."
    ],
    "prerequisites": [
      "Previous lessons in Module 2"
    ],
    "analogy": {
      "title": "Arithmetic and Assignment Operators Analogy",
      "text": "Modulo (%) is like the leftover change when buying identical items: if tickets cost $5 and you pay with $17, 17 % 5 = $2 change remaining.",
      "metaphor": "Modulo (%) is like the leftover change when buying identical items: if tickets cost $5 and you pay with $17, 17 % 5 = $2 change remaining."
    },
    "problemSolved": {
      "title": "Precision, Performance, and Safety in Java",
      "description": "Without Arithmetic and Assignment Operators, writing robust, memory-safe, and high-performance software would be impossible.",
      "keyPoints": [
        "Strong typing",
        "Predictable runtime behavior",
        "Optimal memory usage"
      ]
    },
    "intuition": {
      "overview": "A deep dive into Arithmetic and Assignment Operators mechanisms in the Java Virtual Machine.",
      "steps": [
        {
          "step": 1,
          "title": "Concept Definition",
          "description": "Addition, Subtraction, Multiplication, Integer Truncation Division, and Modulo"
        },
        {
          "step": 2,
          "title": "Evaluation Mechanism",
          "description": "Evaluated according to Java Language Specification rules."
        },
        {
          "step": 3,
          "title": "Output Result",
          "description": "Yields verified runtime behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Arithmetic and Assignment Operators",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 17;\n        int b = 5;\n\n        System.out.println(\"Addition (a + b): \" + (a + b));\n        System.out.println(\"Integer Division (17 / 5): \" + (a / b));\n        System.out.println(\"Floating Division (17.0 / 5): \" + (17.0 / b));\n        System.out.println(\"Remainder Modulo (17 % 5): \" + (a % b));\n\n        int counter = 10;\n        counter += 5; // Compound assignment\n        System.out.println(\"Counter after += 5: \" + counter);\n    }\n}",
      "explanation": "Examine how Arithmetic and Assignment Operators functions in runnable code."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 17;\n        int b = 5;\n\n        System.out.println(\"Addition (a + b): \" + (a + b));\n        System.out.println(\"Integer Division (17 / 5): \" + (a / b));\n        System.out.println(\"Floating Division (17.0 / 5): \" + (17.0 / b));\n        System.out.println(\"Remainder Modulo (17 % 5): \" + (a % b));\n\n        int counter = 10;\n        counter += 5; // Compound assignment\n        System.out.println(\"Counter after += 5: \" + counter);\n    }\n}",
      "expectedOutput": "Addition (a + b): 22\\nInteger Division (17 / 5): 3\\nFloating Division (17.0 / 5): 3.4\\nRemainder Modulo (17 % 5): 2\\nCounter after += 5: 15"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class and main method definition."
      },
      {
        "lines": "5-10",
        "codeSnippet": "// Core demonstration logic",
        "explanation": "Demonstrates the specific operator or type conversion."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Dividing two integers (5 / 2) expecting 2.5, but getting integer 2.",
        "solution": "Follow standard Java practices outlined in the lesson.",
        "whyWrong": "Violating type rules results in either compile-time errors or unexpected data loss."
      }
    ],
    "bestPractices": [
      "Write clean, intention-revealing code.",
      "Check data boundaries and test with edge cases."
    ],
    "applications": [
      {
        "industry": "Enterprise Systems",
        "useCase": "High-throughput data processing and calculation engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-arithmetic-operators",
        "question": "What is the result of 14 % 4 in Java?",
        "answer": "2",
        "explanation": "Detailed explanation adhering to Java standards."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-arithmetic-operators",
        "question": "What is the result of 14 % 4 in Java?",
        "options": [
          "3",
          "2",
          "3.5",
          "0"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-arithmetic-operators",
      "title": "Exercise: Arithmetic and Assignment Operators",
      "difficulty": "Beginner",
      "description": "Write a Java program that demonstrates the principle of Arithmetic and Assignment Operators.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int a = 17;\n        int b = 5;\n\n        System.out.println(\"Addition (a + b): \" + (a + b));\n        System.out.println(\"Integer Division (17 / 5): \" + (a / b));\n        System.out.println(\"Floating Division (17.0 / 5): \" + (17.0 / b));\n        System.out.println(\"Remainder Modulo (17 % 5): \" + (a % b));\n\n        int counter = 10;\n        counter += 5; // Compound assignment\n        System.out.println(\"Counter after += 5: \" + counter);\n    }\n}",
      "hints": [
        "Review the lesson explanation."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int a = 17;\n        int b = 5;\n\n        System.out.println(\"Addition (a + b): \" + (a + b));\n        System.out.println(\"Integer Division (17 / 5): \" + (a / b));\n        System.out.println(\"Floating Division (17.0 / 5): \" + (17.0 / b));\n        System.out.println(\"Remainder Modulo (17 % 5): \" + (a % b));\n\n        int counter = 10;\n        counter += 5; // Compound assignment\n        System.out.println(\"Counter after += 5: \" + counter);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Arithmetic and Assignment Operators.",
        "Understood JVM internal representations.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "java-relational-logical",
      "nextLessonTitle": "Relational & Logical Operators (Short-Circuit)",
      "nextLessonModuleId": "java-module-2"
    }
  },
  "java-relational-logical": {
    "id": "java-relational-logical",
    "moduleId": "java-module-2",
    "title": "Relational & Logical Operators (Short-Circuit)",
    "subtitle": "Boolean Comparisons and Short-Circuit Evaluation Efficiency",
    "order": 9,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Understand the core concepts of Relational & Logical Operators (Short-Circuit).",
      "Avoid common syntax and logic pitfalls.",
      "Apply standard Java conventions in production code."
    ],
    "prerequisites": [
      "Previous lessons in Module 2"
    ],
    "analogy": {
      "title": "Relational & Logical Operators (Short-Circuit) Analogy",
      "text": "A security guard with a checklist of 2 badges: if the person fails the first badge (false in &&), the guard stops immediately and denies entry without wasting time checking the second badge.",
      "metaphor": "A security guard with a checklist of 2 badges: if the person fails the first badge (false in &&), the guard stops immediately and denies entry without wasting time checking the second badge."
    },
    "problemSolved": {
      "title": "Precision, Performance, and Safety in Java",
      "description": "Without Relational & Logical Operators (Short-Circuit), writing robust, memory-safe, and high-performance software would be impossible.",
      "keyPoints": [
        "Strong typing",
        "Predictable runtime behavior",
        "Optimal memory usage"
      ]
    },
    "intuition": {
      "overview": "A deep dive into Relational & Logical Operators (Short-Circuit) mechanisms in the Java Virtual Machine.",
      "steps": [
        {
          "step": 1,
          "title": "Concept Definition",
          "description": "Boolean Comparisons and Short-Circuit Evaluation Efficiency"
        },
        {
          "step": 2,
          "title": "Evaluation Mechanism",
          "description": "Evaluated according to Java Language Specification rules."
        },
        {
          "step": 3,
          "title": "Output Result",
          "description": "Yields verified runtime behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Relational & Logical Operators (Short-Circuit)",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int age = 22;\n        boolean hasLicense = true;\n\n        // Logical AND (&&): Both must be true\n        boolean canDrive = (age >= 18) && hasLicense;\n        System.out.println(\"Can Drive: \" + canDrive);\n\n        // Short-circuit demonstration:\n        int x = 0;\n        // x != 0 is false, so (10 / x > 1) is NEVER evaluated, avoiding division by zero!\n        boolean safeCheck = (x != 0) && (10 / x > 1);\n        System.out.println(\"Safe short-circuit check passed: \" + safeCheck);\n    }\n}",
      "explanation": "Examine how Relational & Logical Operators (Short-Circuit) functions in runnable code."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int age = 22;\n        boolean hasLicense = true;\n\n        // Logical AND (&&): Both must be true\n        boolean canDrive = (age >= 18) && hasLicense;\n        System.out.println(\"Can Drive: \" + canDrive);\n\n        // Short-circuit demonstration:\n        int x = 0;\n        // x != 0 is false, so (10 / x > 1) is NEVER evaluated, avoiding division by zero!\n        boolean safeCheck = (x != 0) && (10 / x > 1);\n        System.out.println(\"Safe short-circuit check passed: \" + safeCheck);\n    }\n}",
      "expectedOutput": "Can Drive: true\\nSafe short-circuit check passed: false"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class and main method definition."
      },
      {
        "lines": "5-10",
        "codeSnippet": "// Core demonstration logic",
        "explanation": "Demonstrates the specific operator or type conversion."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using single & or | instead of && or ||, which disables short-circuit protection and evaluates dangerous second operands.",
        "solution": "Follow standard Java practices outlined in the lesson.",
        "whyWrong": "Violating type rules results in either compile-time errors or unexpected data loss."
      }
    ],
    "bestPractices": [
      "Write clean, intention-revealing code.",
      "Check data boundaries and test with edge cases."
    ],
    "applications": [
      {
        "industry": "Enterprise Systems",
        "useCase": "High-throughput data processing and calculation engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-relational-logical",
        "question": "Why does (false && (10 / 0 == 0)) NOT throw an ArithmeticException?",
        "answer": "Because && short-circuits: the right side is never evaluated when left is false",
        "explanation": "Detailed explanation adhering to Java standards."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-relational-logical",
        "question": "Why does (false && (10 / 0 == 0)) NOT throw an ArithmeticException?",
        "options": [
          "Because 10 / 0 is valid in Java",
          "Because && short-circuits: the right side is never evaluated when left is false",
          "Because it is in parentheses",
          "Because of operator precedence"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-relational-logical",
      "title": "Exercise: Relational & Logical Operators (Short-Circuit)",
      "difficulty": "Beginner",
      "description": "Write a Java program that demonstrates the principle of Relational & Logical Operators (Short-Circuit).",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int age = 22;\n        boolean hasLicense = true;\n\n        // Logical AND (&&): Both must be true\n        boolean canDrive = (age >= 18) && hasLicense;\n        System.out.println(\"Can Drive: \" + canDrive);\n\n        // Short-circuit demonstration:\n        int x = 0;\n        // x != 0 is false, so (10 / x > 1) is NEVER evaluated, avoiding division by zero!\n        boolean safeCheck = (x != 0) && (10 / x > 1);\n        System.out.println(\"Safe short-circuit check passed: \" + safeCheck);\n    }\n}",
      "hints": [
        "Review the lesson explanation."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int age = 22;\n        boolean hasLicense = true;\n\n        // Logical AND (&&): Both must be true\n        boolean canDrive = (age >= 18) && hasLicense;\n        System.out.println(\"Can Drive: \" + canDrive);\n\n        // Short-circuit demonstration:\n        int x = 0;\n        // x != 0 is false, so (10 / x > 1) is NEVER evaluated, avoiding division by zero!\n        boolean safeCheck = (x != 0) && (10 / x > 1);\n        System.out.println(\"Safe short-circuit check passed: \" + safeCheck);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Relational & Logical Operators (Short-Circuit).",
        "Understood JVM internal representations.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "java-bitwise-operators",
      "nextLessonTitle": "Bitwise and Bit-Shift Operations in Java",
      "nextLessonModuleId": "java-module-2"
    }
  },
  "java-bitwise-operators": {
    "id": "java-bitwise-operators",
    "moduleId": "java-module-2",
    "title": "Bitwise and Bit-Shift Operations in Java",
    "subtitle": "Manipulating Raw Bits: AND (&), OR (|), XOR (^), NOT (~), and Shifts (<<, >>, >>>)",
    "order": 10,
    "readTimeMinutes": 15,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Understand the core concepts of Bitwise and Bit-Shift Operations in Java.",
      "Avoid common syntax and logic pitfalls.",
      "Apply standard Java conventions in production code."
    ],
    "prerequisites": [
      "Previous lessons in Module 2"
    ],
    "analogy": {
      "title": "Bitwise and Bit-Shift Operations in Java Analogy",
      "text": "Like a row of 8 light switches on a control panel: bitwise operators toggle each individual switch on or off simultaneously in one single CPU clock cycle.",
      "metaphor": "Like a row of 8 light switches on a control panel: bitwise operators toggle each individual switch on or off simultaneously in one single CPU clock cycle."
    },
    "problemSolved": {
      "title": "Precision, Performance, and Safety in Java",
      "description": "Without Bitwise and Bit-Shift Operations in Java, writing robust, memory-safe, and high-performance software would be impossible.",
      "keyPoints": [
        "Strong typing",
        "Predictable runtime behavior",
        "Optimal memory usage"
      ]
    },
    "intuition": {
      "overview": "A deep dive into Bitwise and Bit-Shift Operations in Java mechanisms in the Java Virtual Machine.",
      "steps": [
        {
          "step": 1,
          "title": "Concept Definition",
          "description": "Manipulating Raw Bits: AND (&), OR (|), XOR (^), NOT (~), and Shifts (<<, >>, >>>)"
        },
        {
          "step": 2,
          "title": "Evaluation Mechanism",
          "description": "Evaluated according to Java Language Specification rules."
        },
        {
          "step": 3,
          "title": "Output Result",
          "description": "Yields verified runtime behavior."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Bitwise and Bit-Shift Operations in Java",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 5;  // Binary: 0101\n        int b = 3;  // Binary: 0011\n\n        System.out.println(\"Bitwise AND (5 & 3): \" + (a & b)); // 0001 = 1\n        System.out.println(\"Bitwise OR  (5 | 3): \" + (a | b)); // 0111 = 7\n        System.out.println(\"Bitwise XOR (5 ^ 3): \" + (a ^ b)); // 0110 = 6\n\n        // Bit shift left: a << 1 is equivalent to multiplying by 2\n        System.out.println(\"Shift Left (5 << 1): \" + (a << 1)); // 10\n        // Bit shift right: a >> 1 is equivalent to dividing by 2\n        System.out.println(\"Shift Right (5 >> 1): \" + (a >> 1)); // 2\n    }\n}",
      "explanation": "Examine how Bitwise and Bit-Shift Operations in Java functions in runnable code."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 5;  // Binary: 0101\n        int b = 3;  // Binary: 0011\n\n        System.out.println(\"Bitwise AND (5 & 3): \" + (a & b)); // 0001 = 1\n        System.out.println(\"Bitwise OR  (5 | 3): \" + (a | b)); // 0111 = 7\n        System.out.println(\"Bitwise XOR (5 ^ 3): \" + (a ^ b)); // 0110 = 6\n\n        // Bit shift left: a << 1 is equivalent to multiplying by 2\n        System.out.println(\"Shift Left (5 << 1): \" + (a << 1)); // 10\n        // Bit shift right: a >> 1 is equivalent to dividing by 2\n        System.out.println(\"Shift Right (5 >> 1): \" + (a >> 1)); // 2\n    }\n}",
      "expectedOutput": "Bitwise AND (5 & 3): 1\\nBitwise OR  (5 | 3): 7\\nBitwise XOR (5 ^ 3): 6\\nShift Left (5 << 1): 10\\nShift Right (5 >> 1): 2"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class and main method definition."
      },
      {
        "lines": "5-10",
        "codeSnippet": "// Core demonstration logic",
        "explanation": "Demonstrates the specific operator or type conversion."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing logical && with bitwise &.",
        "solution": "Follow standard Java practices outlined in the lesson.",
        "whyWrong": "Violating type rules results in either compile-time errors or unexpected data loss."
      }
    ],
    "bestPractices": [
      "Write clean, intention-revealing code.",
      "Check data boundaries and test with edge cases."
    ],
    "applications": [
      {
        "industry": "Enterprise Systems",
        "useCase": "High-throughput data processing and calculation engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-bitwise-operators",
        "question": "What is the effect of shifting an integer x left by 1 bit (x << 1)?",
        "answer": "Multiplies x by 2",
        "explanation": "Detailed explanation adhering to Java standards."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-bitwise-operators",
        "question": "What is the effect of shifting an integer x left by 1 bit (x << 1)?",
        "options": [
          "Divides x by 2",
          "Multiplies x by 2",
          "Adds 1 to x",
          "Inverts all bits"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-bitwise-operators",
      "title": "Exercise: Bitwise and Bit-Shift Operations in Java",
      "difficulty": "Beginner",
      "description": "Write a Java program that demonstrates the principle of Bitwise and Bit-Shift Operations in Java.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int a = 5;  // Binary: 0101\n        int b = 3;  // Binary: 0011\n\n        System.out.println(\"Bitwise AND (5 & 3): \" + (a & b)); // 0001 = 1\n        System.out.println(\"Bitwise OR  (5 | 3): \" + (a | b)); // 0111 = 7\n        System.out.println(\"Bitwise XOR (5 ^ 3): \" + (a ^ b)); // 0110 = 6\n\n        // Bit shift left: a << 1 is equivalent to multiplying by 2\n        System.out.println(\"Shift Left (5 << 1): \" + (a << 1)); // 10\n        // Bit shift right: a >> 1 is equivalent to dividing by 2\n        System.out.println(\"Shift Right (5 >> 1): \" + (a >> 1)); // 2\n    }\n}",
      "hints": [
        "Review the lesson explanation."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int a = 5;  // Binary: 0101\n        int b = 3;  // Binary: 0011\n\n        System.out.println(\"Bitwise AND (5 & 3): \" + (a & b)); // 0001 = 1\n        System.out.println(\"Bitwise OR  (5 | 3): \" + (a | b)); // 0111 = 7\n        System.out.println(\"Bitwise XOR (5 ^ 3): \" + (a ^ b)); // 0110 = 6\n\n        // Bit shift left: a << 1 is equivalent to multiplying by 2\n        System.out.println(\"Shift Left (5 << 1): \" + (a << 1)); // 10\n        // Bit shift right: a >> 1 is equivalent to dividing by 2\n        System.out.println(\"Shift Right (5 >> 1): \" + (a >> 1)); // 2\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Bitwise and Bit-Shift Operations in Java.",
        "Understood JVM internal representations.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "java-if-else-branching",
      "nextLessonTitle": "If, Else-If, and Else Control Branching",
      "nextLessonModuleId": "java-module-3"
    }
  }
};
