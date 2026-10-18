import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const javaModule8Data: JavaModuleData = {
  "id": "java-module-8",
  "number": 8,
  "title": "Packages and Generics",
  "subtitle": "Namespaces, Enums, Nested Classes, Generics & Type Safety",
  "order": 8,
  "icon": "Shield",
  "badge": "Type Systems",
  "estimatedHours": 9,
  "topicsCount": 10,
  "description": "Organize large software systems and write compile-time type-safe code. Master packages, imports, enum types with methods, inner and anonymous classes, generic classes and methods, bounded type parameters, and wildcard PECS rules.",
  "lessons": [
    {
      "id": "java-packages-structure",
      "moduleId": "java-module-8",
      "title": "Java Packages and Directory Structure",
      "description": "Namespaces, reverse domain conventions, and organizing source code on disk.",
      "order": 1,
      "readTimeMinutes": 14,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-imports-static",
      "moduleId": "java-module-8",
      "title": "The import Statement and Static Imports",
      "description": "Explicit imports, wildcard imports, and importing static members directly.",
      "order": 2,
      "readTimeMinutes": 12,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-package-access",
      "moduleId": "java-module-8",
      "title": "Access Modifiers Across Packages",
      "description": "Package-private visibility vs public, protected, and private in modular apps.",
      "order": 3,
      "readTimeMinutes": 14,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-enums",
      "moduleId": "java-module-8",
      "title": "Enumerations (enum) with Fields & Methods",
      "description": "Type-safe constants, custom enum constructors, and switch integration.",
      "order": 4,
      "readTimeMinutes": 15,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-nested-classes",
      "moduleId": "java-module-8",
      "title": "Nested Classes: Static Nested vs Inner Classes",
      "description": "Encapsulating helper classes, enclosing instances, and the static difference.",
      "order": 5,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-anonymous-classes",
      "moduleId": "java-module-8",
      "title": "Anonymous Inner Classes & Local Classes",
      "description": "Inline class instantiation for single-use callbacks and event handlers.",
      "order": 6,
      "readTimeMinutes": 14,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-generics-intro",
      "moduleId": "java-module-8",
      "title": "Introduction to Java Generics: Type Safety",
      "description": "Eliminating ClassCastExceptions, compile-time type checks, and raw types.",
      "order": 7,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-generic-classes-methods",
      "moduleId": "java-module-8",
      "title": "Generic Classes & Generic Methods (<T>, <K, V>)",
      "description": "Creating reusable data containers and type-parameterized functions.",
      "order": 8,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-bounded-generics",
      "moduleId": "java-module-8",
      "title": "Bounded Type Parameters (<T extends Comparable>)",
      "description": "Restricting generic type arguments to subclasses of specific base types.",
      "order": 9,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-generics-wildcards",
      "moduleId": "java-module-8",
      "title": "Wildcards in Generics: ?, ? extends, and PECS",
      "description": "Producer Extends, Consumer Super (PECS) rule for flexible API signatures.",
      "order": 10,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    }
  ]
};

export const javaModule8Lessons: Record<string, JavaLessonContent> = {
  "java-packages-structure": {
    "id": "java-packages-structure",
    "moduleId": "java-module-8",
    "title": "Java Packages and Directory Structure",
    "subtitle": "Preventing Name Collisions with Reverse-Domain Namespaces (com.company.app)",
    "order": 1,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Master Java Packages and Directory Structure.",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "Java Packages and Directory Structure Metaphor",
      "text": "Postal ZIP codes: if two different cities both have a 'Main Street', the ZIP code (package) ensures the mail carrier delivers to the right address.",
      "metaphor": "Postal ZIP codes: if two different cities both have a 'Main Street', the ZIP code (package) ensures the mail carrier delivers to the right address."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind Java Packages and Directory Structure.",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Java Packages and Directory Structure",
      "code": "// package declaration must be the first non-comment line!\n// package com.javalab.models;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Package namespace: com.javalab.models\");\n        System.out.println(\"Directory path: src/com/javalab/models/Main.java\");\n    }\n}",
      "explanation": "Examine the implementation of Java Packages and Directory Structure."
    },
    "runnableCode": {
      "code": "// package declaration must be the first non-comment line!\n// package com.javalab.models;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Package namespace: com.javalab.models\");\n        System.out.println(\"Directory path: src/com/javalab/models/Main.java\");\n    }\n}",
      "expectedOutput": "Package namespace: com.javalab.models\\nDirectory path: src/com/javalab/models/Main.java"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Placing a package statement anywhere other than the very first line of a Java file.",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-packages-structure",
        "question": "What convention is standard for Java package naming?",
        "answer": "Reverse domain name in lowercase (e.g. com.google.common)",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-packages-structure",
        "question": "What convention is standard for Java package naming?",
        "options": [
          "ALL_CAPS",
          "Reverse domain name in lowercase (e.g. com.google.common)",
          "PascalCase",
          "CamelCase"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-packages-structure",
      "title": "Exercise: Java Packages and Directory Structure",
      "difficulty": "Beginner",
      "description": "Implement Java Packages and Directory Structure to complete the task.",
      "starterCode": "// package declaration must be the first non-comment line!\n// package com.javalab.models;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Package namespace: com.javalab.models\");\n        System.out.println(\"Directory path: src/com/javalab/models/Main.java\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "// package declaration must be the first non-comment line!\n// package com.javalab.models;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Package namespace: com.javalab.models\");\n        System.out.println(\"Directory path: src/com/javalab/models/Main.java\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Java Packages and Directory Structure.",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-imports-static",
      "nextLessonTitle": "The import Statement and Static Imports",
      "nextLessonModuleId": "java-module-8"
    }
  },
  "java-imports-static": {
    "id": "java-imports-static",
    "moduleId": "java-module-8",
    "title": "The import Statement and Static Imports",
    "subtitle": "Importing Types and Calling Math Constants/Methods Directly",
    "order": 2,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Master The import Statement and Static Imports.",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "The import Statement and Static Imports Metaphor",
      "text": "Creating a speed-dial button on your phone: instead of dialing the full 10-digit number (Math.sqrt), you press one button (sqrt).",
      "metaphor": "Creating a speed-dial button on your phone: instead of dialing the full 10-digit number (Math.sqrt), you press one button (sqrt)."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind The import Statement and Static Imports.",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The import Statement and Static Imports",
      "code": "import static java.lang.Math.PI;\nimport static java.lang.Math.sqrt;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Direct access without Math. prefix thanks to static import!\n        double radius = 5.0;\n        double area = PI * radius * radius;\n        System.out.println(\"Area: \" + area);\n        System.out.println(\"Square root of 25: \" + sqrt(25));\n    }\n}",
      "explanation": "Examine the implementation of The import Statement and Static Imports."
    },
    "runnableCode": {
      "code": "import static java.lang.Math.PI;\nimport static java.lang.Math.sqrt;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Direct access without Math. prefix thanks to static import!\n        double radius = 5.0;\n        double area = PI * radius * radius;\n        System.out.println(\"Area: \" + area);\n        System.out.println(\"Square root of 25: \" + sqrt(25));\n    }\n}",
      "expectedOutput": "Area: 78.53981633974483\\nSquare root of 25: 5.0"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Overusing static imports, causing confusing namespace pollution.",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-imports-static",
        "question": "Which package is automatically imported by Java into every single file without an import statement?",
        "answer": "java.lang",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-imports-static",
        "question": "Which package is automatically imported by Java into every single file without an import statement?",
        "options": [
          "java.util",
          "java.lang",
          "java.io",
          "java.net"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-imports-static",
      "title": "Exercise: The import Statement and Static Imports",
      "difficulty": "Beginner",
      "description": "Implement The import Statement and Static Imports to complete the task.",
      "starterCode": "import static java.lang.Math.PI;\nimport static java.lang.Math.sqrt;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Direct access without Math. prefix thanks to static import!\n        double radius = 5.0;\n        double area = PI * radius * radius;\n        System.out.println(\"Area: \" + area);\n        System.out.println(\"Square root of 25: \" + sqrt(25));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import static java.lang.Math.PI;\nimport static java.lang.Math.sqrt;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Direct access without Math. prefix thanks to static import!\n        double radius = 5.0;\n        double area = PI * radius * radius;\n        System.out.println(\"Area: \" + area);\n        System.out.println(\"Square root of 25: \" + sqrt(25));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The import Statement and Static Imports.",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-package-access",
      "nextLessonTitle": "Access Modifiers Across Packages",
      "nextLessonModuleId": "java-module-8"
    }
  },
  "java-package-access": {
    "id": "java-package-access",
    "moduleId": "java-module-8",
    "title": "Access Modifiers Across Packages",
    "subtitle": "Package-Private Default Scope vs Protected Subclasses Across Boundaries",
    "order": 3,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Master Access Modifiers Across Packages.",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "Access Modifiers Across Packages Metaphor",
      "text": "Neighborhood community gates: neighbors in the same community (package) share the private park; outsiders can only access the public sidewalk.",
      "metaphor": "Neighborhood community gates: neighbors in the same community (package) share the private park; outsiders can only access the public sidewalk."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind Access Modifiers Across Packages.",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Access Modifiers Across Packages",
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Package Boundaries:\");\n        System.out.println(\"- Same package: public, protected, package-private\");\n        System.out.println(\"- Different package subclass: public, protected\");\n        System.out.println(\"- Different package non-subclass: public only\");\n    }\n}",
      "explanation": "Examine the implementation of Access Modifiers Across Packages."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Package Boundaries:\");\n        System.out.println(\"- Same package: public, protected, package-private\");\n        System.out.println(\"- Different package subclass: public, protected\");\n        System.out.println(\"- Different package non-subclass: public only\");\n    }\n}",
      "expectedOutput": "Package Boundaries:\\n- Same package: public, protected, package-private\\n- Different package subclass: public, protected\\n- Different package non-subclass: public only"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming protected members are private outside their class; protected allows access to all classes in the same package as well.",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-package-access",
        "question": "Can a package-private method be called from a different package?",
        "answer": "No, package-private is strictly confined to the declaring package",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-package-access",
        "question": "Can a package-private method be called from a different package?",
        "options": [
          "Yes, anytime",
          "No, package-private is strictly confined to the declaring package",
          "Yes, if imported",
          "Only by subclasses"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-package-access",
      "title": "Exercise: Access Modifiers Across Packages",
      "difficulty": "Beginner",
      "description": "Implement Access Modifiers Across Packages to complete the task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Package Boundaries:\");\n        System.out.println(\"- Same package: public, protected, package-private\");\n        System.out.println(\"- Different package subclass: public, protected\");\n        System.out.println(\"- Different package non-subclass: public only\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Package Boundaries:\");\n        System.out.println(\"- Same package: public, protected, package-private\");\n        System.out.println(\"- Different package subclass: public, protected\");\n        System.out.println(\"- Different package non-subclass: public only\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Access Modifiers Across Packages.",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-enums",
      "nextLessonTitle": "Enumerations (enum) with Fields & Methods",
      "nextLessonModuleId": "java-module-8"
    }
  },
  "java-enums": {
    "id": "java-enums",
    "moduleId": "java-module-8",
    "title": "Enumerations (enum) with Fields & Methods",
    "subtitle": "Type-Safe Fixed Sets of Constants with Full Object Capabilities",
    "order": 4,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Master Enumerations (enum) with Fields & Methods.",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "Enumerations (enum) with Fields & Methods Metaphor",
      "text": "The four suits in a deck of cards (Hearts, Diamonds, Clubs, Spades): there will never be a 5th suit; enums guarantee no invalid values exist.",
      "metaphor": "The four suits in a deck of cards (Hearts, Diamonds, Clubs, Spades): there will never be a 5th suit; enums guarantee no invalid values exist."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind Enumerations (enum) with Fields & Methods.",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Enumerations (enum) with Fields & Methods",
      "code": "enum OrderStatus {\n    PENDING(\"Awaiting payment\"),\n    SHIPPED(\"On delivery truck\"),\n    DELIVERED(\"Handed to customer\");\n\n    private final String description;\n    OrderStatus(String desc) { this.description = desc; }\n    public String getDescription() { return description; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        OrderStatus status = OrderStatus.SHIPPED;\n        System.out.println(\"Status name: \" + status.name());\n        System.out.println(\"Status note: \" + status.getDescription());\n    }\n}",
      "explanation": "Examine the implementation of Enumerations (enum) with Fields & Methods."
    },
    "runnableCode": {
      "code": "enum OrderStatus {\n    PENDING(\"Awaiting payment\"),\n    SHIPPED(\"On delivery truck\"),\n    DELIVERED(\"Handed to customer\");\n\n    private final String description;\n    OrderStatus(String desc) { this.description = desc; }\n    public String getDescription() { return description; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        OrderStatus status = OrderStatus.SHIPPED;\n        System.out.println(\"Status name: \" + status.name());\n        System.out.println(\"Status note: \" + status.getDescription());\n    }\n}",
      "expectedOutput": "Status name: SHIPPED\\nStatus note: On delivery truck"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using arbitrary strings (e.g. \"shipped\" vs \"SHIPPED\") instead of type-safe enums.",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-enums",
        "question": "Can a Java enum have fields, constructors, and methods?",
        "answer": "Yes, Java enums are full-fledged classes with custom fields and methods",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-enums",
        "question": "Can a Java enum have fields, constructors, and methods?",
        "options": [
          "No, enums are only numbers",
          "Yes, Java enums are full-fledged classes with custom fields and methods",
          "Only static methods",
          "Only in Java 17+"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-enums",
      "title": "Exercise: Enumerations (enum) with Fields & Methods",
      "difficulty": "Beginner",
      "description": "Implement Enumerations (enum) with Fields & Methods to complete the task.",
      "starterCode": "enum OrderStatus {\n    PENDING(\"Awaiting payment\"),\n    SHIPPED(\"On delivery truck\"),\n    DELIVERED(\"Handed to customer\");\n\n    private final String description;\n    OrderStatus(String desc) { this.description = desc; }\n    public String getDescription() { return description; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        OrderStatus status = OrderStatus.SHIPPED;\n        System.out.println(\"Status name: \" + status.name());\n        System.out.println(\"Status note: \" + status.getDescription());\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "enum OrderStatus {\n    PENDING(\"Awaiting payment\"),\n    SHIPPED(\"On delivery truck\"),\n    DELIVERED(\"Handed to customer\");\n\n    private final String description;\n    OrderStatus(String desc) { this.description = desc; }\n    public String getDescription() { return description; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        OrderStatus status = OrderStatus.SHIPPED;\n        System.out.println(\"Status name: \" + status.name());\n        System.out.println(\"Status note: \" + status.getDescription());\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Enumerations (enum) with Fields & Methods.",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-nested-classes",
      "nextLessonTitle": "Nested Classes: Static Nested vs Inner Classes",
      "nextLessonModuleId": "java-module-8"
    }
  },
  "java-nested-classes": {
    "id": "java-nested-classes",
    "moduleId": "java-module-8",
    "title": "Nested Classes: Static Nested vs Inner Classes",
    "subtitle": "Encapsulating Helper Classes Within Their Primary Context",
    "order": 5,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Master Nested Classes: Static Nested vs Inner Classes.",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "Nested Classes: Static Nested vs Inner Classes Metaphor",
      "text": "A glove box inside a car: it is logically bundled inside the car's compartment, not floating loosely on the street.",
      "metaphor": "A glove box inside a car: it is logically bundled inside the car's compartment, not floating loosely on the street."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind Nested Classes: Static Nested vs Inner Classes.",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Nested Classes: Static Nested vs Inner Classes",
      "code": "class Outer {\n    static class StaticNested {\n        void display() { System.out.println(\"Static nested class (no outer instance needed)\"); }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Outer.StaticNested nested = new Outer.StaticNested();\n        nested.display();\n    }\n}",
      "explanation": "Examine the implementation of Nested Classes: Static Nested vs Inner Classes."
    },
    "runnableCode": {
      "code": "class Outer {\n    static class StaticNested {\n        void display() { System.out.println(\"Static nested class (no outer instance needed)\"); }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Outer.StaticNested nested = new Outer.StaticNested();\n        nested.display();\n    }\n}",
      "expectedOutput": "Static nested class (no outer instance needed)"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Instantiating an inner class without an instance of the outer class (static nested classes do not require an outer instance).",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-nested-classes",
        "question": "Does a static nested class require an instance of the outer enclosing class to be instantiated?",
        "answer": "No, it behaves like any top-level class scoped inside the outer namespace",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-nested-classes",
        "question": "Does a static nested class require an instance of the outer enclosing class to be instantiated?",
        "options": [
          "Yes, always",
          "No, it behaves like any top-level class scoped inside the outer namespace",
          "Only if it has private fields",
          "Only in subclasses"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-nested-classes",
      "title": "Exercise: Nested Classes: Static Nested vs Inner Classes",
      "difficulty": "Beginner",
      "description": "Implement Nested Classes: Static Nested vs Inner Classes to complete the task.",
      "starterCode": "class Outer {\n    static class StaticNested {\n        void display() { System.out.println(\"Static nested class (no outer instance needed)\"); }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Outer.StaticNested nested = new Outer.StaticNested();\n        nested.display();\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Outer {\n    static class StaticNested {\n        void display() { System.out.println(\"Static nested class (no outer instance needed)\"); }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Outer.StaticNested nested = new Outer.StaticNested();\n        nested.display();\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Nested Classes: Static Nested vs Inner Classes.",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-anonymous-classes",
      "nextLessonTitle": "Anonymous Inner Classes & Local Classes",
      "nextLessonModuleId": "java-module-8"
    }
  },
  "java-anonymous-classes": {
    "id": "java-anonymous-classes",
    "moduleId": "java-module-8",
    "title": "Anonymous Inner Classes & Local Classes",
    "subtitle": "One-Time On-The-Fly Class Declarations and Interface Implementations",
    "order": 6,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Master Anonymous Inner Classes & Local Classes.",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "Anonymous Inner Classes & Local Classes Metaphor",
      "text": "A disposable rental car: you don't buy and register a whole new car name; you use it once for an afternoon errand and return it.",
      "metaphor": "A disposable rental car: you don't buy and register a whole new car name; you use it once for an afternoon errand and return it."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind Anonymous Inner Classes & Local Classes.",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Anonymous Inner Classes & Local Classes",
      "code": "interface Greeter { void greet(); }\n\npublic class Main {\n    public static void main(String[] args) {\n        // Anonymous class instantiated directly on the interface!\n        Greeter greeter = new Greeter() {\n            @Override public void greet() {\n                System.out.println(\"Hello from an Anonymous Inner Class!\");\n            }\n        };\n        greeter.greet();\n    }\n}",
      "explanation": "Examine the implementation of Anonymous Inner Classes & Local Classes."
    },
    "runnableCode": {
      "code": "interface Greeter { void greet(); }\n\npublic class Main {\n    public static void main(String[] args) {\n        // Anonymous class instantiated directly on the interface!\n        Greeter greeter = new Greeter() {\n            @Override public void greet() {\n                System.out.println(\"Hello from an Anonymous Inner Class!\");\n            }\n        };\n        greeter.greet();\n    }\n}",
      "expectedOutput": "Hello from an Anonymous Inner Class!"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Writing huge 100-line anonymous classes; use separate named classes or lambdas for readability.",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-anonymous-classes",
        "question": "Can an anonymous class have a named constructor?",
        "answer": "No, because anonymous classes have no name",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-anonymous-classes",
        "question": "Can an anonymous class have a named constructor?",
        "options": [
          "Yes, with the same name as the interface",
          "No, because anonymous classes have no name",
          "Yes, named constructor()",
          "Only with private access"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-anonymous-classes",
      "title": "Exercise: Anonymous Inner Classes & Local Classes",
      "difficulty": "Beginner",
      "description": "Implement Anonymous Inner Classes & Local Classes to complete the task.",
      "starterCode": "interface Greeter { void greet(); }\n\npublic class Main {\n    public static void main(String[] args) {\n        // Anonymous class instantiated directly on the interface!\n        Greeter greeter = new Greeter() {\n            @Override public void greet() {\n                System.out.println(\"Hello from an Anonymous Inner Class!\");\n            }\n        };\n        greeter.greet();\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "interface Greeter { void greet(); }\n\npublic class Main {\n    public static void main(String[] args) {\n        // Anonymous class instantiated directly on the interface!\n        Greeter greeter = new Greeter() {\n            @Override public void greet() {\n                System.out.println(\"Hello from an Anonymous Inner Class!\");\n            }\n        };\n        greeter.greet();\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Anonymous Inner Classes & Local Classes.",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-generics-intro",
      "nextLessonTitle": "Introduction to Java Generics: Type Safety",
      "nextLessonModuleId": "java-module-8"
    }
  },
  "java-generics-intro": {
    "id": "java-generics-intro",
    "moduleId": "java-module-8",
    "title": "Introduction to Java Generics: Type Safety",
    "subtitle": "Eliminating ClassCastExceptions and Parameterizing Types at Compile Time",
    "order": 7,
    "readTimeMinutes": 15,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master Introduction to Java Generics: Type Safety.",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "Introduction to Java Generics: Type Safety Metaphor",
      "text": "A coin-sorting machine with calibrated slots: the quarter slot physically only accepts quarters, making it impossible to mix up coins.",
      "metaphor": "A coin-sorting machine with calibrated slots: the quarter slot physically only accepts quarters, making it impossible to mix up coins."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind Introduction to Java Generics: Type Safety.",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Introduction to Java Generics: Type Safety",
      "code": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Generics enforce that only Strings enter this list\n        ArrayList<String> names = new ArrayList<>();\n        names.add(\"Ada Lovelace\");\n        names.add(\"James Gosling\");\n\n        for (String name : names) {\n            System.out.println(\"Scientist: \" + name);\n        }\n    }\n}",
      "explanation": "Examine the implementation of Introduction to Java Generics: Type Safety."
    },
    "runnableCode": {
      "code": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Generics enforce that only Strings enter this list\n        ArrayList<String> names = new ArrayList<>();\n        names.add(\"Ada Lovelace\");\n        names.add(\"James Gosling\");\n\n        for (String name : names) {\n            System.out.println(\"Scientist: \" + name);\n        }\n    }\n}",
      "expectedOutput": "Scientist: Ada Lovelace\\nScientist: James Gosling"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using raw types (ArrayList without <Type>), which disables compile-time type safety.",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-generics-intro",
        "question": "What is the primary benefit of Java Generics?",
        "answer": "Compile-time type safety without manual casting",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-generics-intro",
        "question": "What is the primary benefit of Java Generics?",
        "options": [
          "Faster memory allocation",
          "Compile-time type safety without manual casting",
          "Automatic garbage collection",
          "Eliminating loops"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-generics-intro",
      "title": "Exercise: Introduction to Java Generics: Type Safety",
      "difficulty": "Beginner",
      "description": "Implement Introduction to Java Generics: Type Safety to complete the task.",
      "starterCode": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Generics enforce that only Strings enter this list\n        ArrayList<String> names = new ArrayList<>();\n        names.add(\"Ada Lovelace\");\n        names.add(\"James Gosling\");\n\n        for (String name : names) {\n            System.out.println(\"Scientist: \" + name);\n        }\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Generics enforce that only Strings enter this list\n        ArrayList<String> names = new ArrayList<>();\n        names.add(\"Ada Lovelace\");\n        names.add(\"James Gosling\");\n\n        for (String name : names) {\n            System.out.println(\"Scientist: \" + name);\n        }\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Introduction to Java Generics: Type Safety.",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-generic-classes-methods",
      "nextLessonTitle": "Generic Classes & Generic Methods (<T>, <K, V>)",
      "nextLessonModuleId": "java-module-8"
    }
  },
  "java-generic-classes-methods": {
    "id": "java-generic-classes-methods",
    "moduleId": "java-module-8",
    "title": "Generic Classes & Generic Methods (<T>, <K, V>)",
    "subtitle": "Building Reusable Type-Safe Containers and Utility Functions",
    "order": 8,
    "readTimeMinutes": 15,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master Generic Classes & Generic Methods (<T>, <K, V>).",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "Generic Classes & Generic Methods (<T>, <K, V>) Metaphor",
      "text": "A transparent shipping container: whether you ship bananas (<Fruit>) or smartphones (<Electronics>), the container safely holds them without mixing types.",
      "metaphor": "A transparent shipping container: whether you ship bananas (<Fruit>) or smartphones (<Electronics>), the container safely holds them without mixing types."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind Generic Classes & Generic Methods (<T>, <K, V>).",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Generic Classes & Generic Methods (<T>, <K, V>)",
      "code": "class KeyValuePair<K, V> {\n    private K key;\n    private V value;\n    public KeyValuePair(K key, V value) { this.key = key; this.value = value; }\n    public K getKey() { return key; }\n    public V getValue() { return value; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        KeyValuePair<String, Integer> score = new KeyValuePair<>(\"Alice\", 98);\n        System.out.println(\"Key: \" + score.getKey() + \", Value: \" + score.getValue());\n    }\n}",
      "explanation": "Examine the implementation of Generic Classes & Generic Methods (<T>, <K, V>)."
    },
    "runnableCode": {
      "code": "class KeyValuePair<K, V> {\n    private K key;\n    private V value;\n    public KeyValuePair(K key, V value) { this.key = key; this.value = value; }\n    public K getKey() { return key; }\n    public V getValue() { return value; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        KeyValuePair<String, Integer> score = new KeyValuePair<>(\"Alice\", 98);\n        System.out.println(\"Key: \" + score.getKey() + \", Value: \" + score.getValue());\n    }\n}",
      "expectedOutput": "Key: Alice, Value: 98"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Trying to use primitive types directly as generic type arguments (e.g. ArrayList<int> instead of ArrayList<Integer>).",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-generic-classes-methods",
        "question": "Can primitive types (like int, double) be passed directly as generic type arguments in Java?",
        "answer": "No, Java generics only accept reference types (wrapper classes like Integer, Double)",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-generic-classes-methods",
        "question": "Can primitive types (like int, double) be passed directly as generic type arguments in Java?",
        "options": [
          "Yes, anytime",
          "No, Java generics only accept reference types (wrapper classes like Integer, Double)",
          "Yes, in Java 17+",
          "Only with byte"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-generic-classes-methods",
      "title": "Exercise: Generic Classes & Generic Methods (<T>, <K, V>)",
      "difficulty": "Beginner",
      "description": "Implement Generic Classes & Generic Methods (<T>, <K, V>) to complete the task.",
      "starterCode": "class KeyValuePair<K, V> {\n    private K key;\n    private V value;\n    public KeyValuePair(K key, V value) { this.key = key; this.value = value; }\n    public K getKey() { return key; }\n    public V getValue() { return value; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        KeyValuePair<String, Integer> score = new KeyValuePair<>(\"Alice\", 98);\n        System.out.println(\"Key: \" + score.getKey() + \", Value: \" + score.getValue());\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class KeyValuePair<K, V> {\n    private K key;\n    private V value;\n    public KeyValuePair(K key, V value) { this.key = key; this.value = value; }\n    public K getKey() { return key; }\n    public V getValue() { return value; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        KeyValuePair<String, Integer> score = new KeyValuePair<>(\"Alice\", 98);\n        System.out.println(\"Key: \" + score.getKey() + \", Value: \" + score.getValue());\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Generic Classes & Generic Methods (<T>, <K, V>).",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-bounded-generics",
      "nextLessonTitle": "Bounded Type Parameters (<T extends Comparable>)",
      "nextLessonModuleId": "java-module-8"
    }
  },
  "java-bounded-generics": {
    "id": "java-bounded-generics",
    "moduleId": "java-module-8",
    "title": "Bounded Type Parameters (<T extends Comparable>)",
    "subtitle": "Enforcing Upper Bounds to Ensure Capability Guarantees on Generic Types",
    "order": 9,
    "readTimeMinutes": 15,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master Bounded Type Parameters (<T extends Comparable>).",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "Bounded Type Parameters (<T extends Comparable>) Metaphor",
      "text": "A VIP club entrance that admits anyone (<T>), provided they wear a formal suit (<T extends Suit>).",
      "metaphor": "A VIP club entrance that admits anyone (<T>), provided they wear a formal suit (<T extends Suit>)."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind Bounded Type Parameters (<T extends Comparable>).",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Bounded Type Parameters (<T extends Comparable>)",
      "code": "public class Main {\n    // T must implement Comparable<T> so compareTo is guaranteed to exist!\n    public static <T extends Comparable<T>> T findMax(T a, T b) {\n        return a.compareTo(b) >= 0 ? a : b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Max int: \" + findMax(10, 25));\n        System.out.println(\"Max string: \" + findMax(\"Zebra\", \"Apple\"));\n    }\n}",
      "explanation": "Examine the implementation of Bounded Type Parameters (<T extends Comparable>)."
    },
    "runnableCode": {
      "code": "public class Main {\n    // T must implement Comparable<T> so compareTo is guaranteed to exist!\n    public static <T extends Comparable<T>> T findMax(T a, T b) {\n        return a.compareTo(b) >= 0 ? a : b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Max int: \" + findMax(10, 25));\n        System.out.println(\"Max string: \" + findMax(\"Zebra\", \"Apple\"));\n    }\n}",
      "expectedOutput": "Max int: 25\\nMax string: Zebra"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using 'implements' in generic bounds; Java syntax strictly uses 'extends' for both classes and interfaces in bounds (<T extends Interface>).",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-bounded-generics",
        "question": "Which keyword is used to specify that a generic parameter T must implement an interface in bounds?",
        "answer": "extends",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-bounded-generics",
        "question": "Which keyword is used to specify that a generic parameter T must implement an interface in bounds?",
        "options": [
          "implements",
          "extends",
          "with",
          "super"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-bounded-generics",
      "title": "Exercise: Bounded Type Parameters (<T extends Comparable>)",
      "difficulty": "Beginner",
      "description": "Implement Bounded Type Parameters (<T extends Comparable>) to complete the task.",
      "starterCode": "public class Main {\n    // T must implement Comparable<T> so compareTo is guaranteed to exist!\n    public static <T extends Comparable<T>> T findMax(T a, T b) {\n        return a.compareTo(b) >= 0 ? a : b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Max int: \" + findMax(10, 25));\n        System.out.println(\"Max string: \" + findMax(\"Zebra\", \"Apple\"));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    // T must implement Comparable<T> so compareTo is guaranteed to exist!\n    public static <T extends Comparable<T>> T findMax(T a, T b) {\n        return a.compareTo(b) >= 0 ? a : b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Max int: \" + findMax(10, 25));\n        System.out.println(\"Max string: \" + findMax(\"Zebra\", \"Apple\"));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Bounded Type Parameters (<T extends Comparable>).",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-generics-wildcards",
      "nextLessonTitle": "Wildcards in Generics: ?, ? extends, and PECS",
      "nextLessonModuleId": "java-module-8"
    }
  },
  "java-generics-wildcards": {
    "id": "java-generics-wildcards",
    "moduleId": "java-module-8",
    "title": "Wildcards in Generics: ?, ? extends, and PECS",
    "subtitle": "Producer Extends, Consumer Super: The Secret to Designing Flexible APIs",
    "order": 10,
    "readTimeMinutes": 15,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master Wildcards in Generics: ?, ? extends, and PECS.",
      "Ensure compile-time type safety.",
      "Design scalable modular libraries."
    ],
    "prerequisites": [
      "Module 7: Advanced OOP"
    ],
    "analogy": {
      "title": "Wildcards in Generics: ?, ? extends, and PECS Metaphor",
      "text": "A food buffet: if you are eating (reading from list), any food (? extends Edible) works. If you are stocking food (writing into list), you need a bin that can hold everything (? super Apple).",
      "metaphor": "A food buffet: if you are eating (reading from list), any food (? extends Edible) works. If you are stocking food (writing into list), you need a bin that can hold everything (? super Apple)."
    },
    "problemSolved": {
      "title": "Type Safety and Enterprise Modularity",
      "description": "Prevents ClassCastExceptions and organizes code into maintainable packages.",
      "keyPoints": [
        "Compile-time verification",
        "Reusable generic containers",
        "Strict modularity"
      ]
    },
    "intuition": {
      "overview": "Mechanics behind Wildcards in Generics: ?, ? extends, and PECS.",
      "steps": [
        {
          "step": 1,
          "title": "Type Specification",
          "description": "Parameterizes types or defines visibility."
        },
        {
          "step": 2,
          "title": "Compile-Time Erasure",
          "description": "Compiler verifies safety and erases type params for bytecode."
        },
        {
          "step": 3,
          "title": "Runtime Execution",
          "description": "Runs with zero casting overhead."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Wildcards in Generics: ?, ? extends, and PECS",
      "code": "import java.util.List;\nimport java.util.Arrays;\n\npublic class Main {\n    // ? extends Number: accepts List<Integer>, List<Double>, etc.\n    public static double sumOfList(List<? extends Number> list) {\n        double sum = 0.0;\n        for (Number n : list) sum += n.doubleValue();\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        List<Integer> ints = Arrays.asList(1, 2, 3);\n        List<Double> doubles = Arrays.asList(1.5, 2.5);\n        System.out.println(\"Ints sum: \" + sumOfList(ints));\n        System.out.println(\"Doubles sum: \" + sumOfList(doubles));\n    }\n}",
      "explanation": "Examine the implementation of Wildcards in Generics: ?, ? extends, and PECS."
    },
    "runnableCode": {
      "code": "import java.util.List;\nimport java.util.Arrays;\n\npublic class Main {\n    // ? extends Number: accepts List<Integer>, List<Double>, etc.\n    public static double sumOfList(List<? extends Number> list) {\n        double sum = 0.0;\n        for (Number n : list) sum += n.doubleValue();\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        List<Integer> ints = Arrays.asList(1, 2, 3);\n        List<Double> doubles = Arrays.asList(1.5, 2.5);\n        System.out.println(\"Ints sum: \" + sumOfList(ints));\n        System.out.println(\"Doubles sum: \" + sumOfList(doubles));\n    }\n}",
      "expectedOutput": "Ints sum: 6.0\\nDoubles sum: 4.0"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Generic / Package declaration",
        "explanation": "Defines type parameter or structure."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Method execution and verification",
        "explanation": "Type-safe execution."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to add elements into a collection declared with <? extends Type>; it is read-only (producer).",
        "solution": "Follow generic guidelines.",
        "whyWrong": "Causes compile-time errors or type erasure bugs."
      }
    ],
    "bestPractices": [
      "Always use generic collections instead of raw types.",
      "Follow PECS rule for API parameters."
    ],
    "applications": [
      {
        "industry": "Frameworks & Libraries",
        "useCase": "Spring Data, Hibernate, and standard Collections Framework."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-generics-wildcards",
        "question": "What does the PECS mnemonic stand for in Java generics?",
        "answer": "Producer Extends, Consumer Super",
        "explanation": "Standard Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-generics-wildcards",
        "question": "What does the PECS mnemonic stand for in Java generics?",
        "options": [
          "Parameter Extends, Consumer Static",
          "Producer Extends, Consumer Super",
          "Private Extends, Concrete Super",
          "Package Extends, Class Super"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-generics-wildcards",
      "title": "Exercise: Wildcards in Generics: ?, ? extends, and PECS",
      "difficulty": "Beginner",
      "description": "Implement Wildcards in Generics: ?, ? extends, and PECS to complete the task.",
      "starterCode": "import java.util.List;\nimport java.util.Arrays;\n\npublic class Main {\n    // ? extends Number: accepts List<Integer>, List<Double>, etc.\n    public static double sumOfList(List<? extends Number> list) {\n        double sum = 0.0;\n        for (Number n : list) sum += n.doubleValue();\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        List<Integer> ints = Arrays.asList(1, 2, 3);\n        List<Double> doubles = Arrays.asList(1.5, 2.5);\n        System.out.println(\"Ints sum: \" + sumOfList(ints));\n        System.out.println(\"Doubles sum: \" + sumOfList(doubles));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.List;\nimport java.util.Arrays;\n\npublic class Main {\n    // ? extends Number: accepts List<Integer>, List<Double>, etc.\n    public static double sumOfList(List<? extends Number> list) {\n        double sum = 0.0;\n        for (Number n : list) sum += n.doubleValue();\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        List<Integer> ints = Arrays.asList(1, 2, 3);\n        List<Double> doubles = Arrays.asList(1.5, 2.5);\n        System.out.println(\"Ints sum: \" + sumOfList(ints));\n        System.out.println(\"Doubles sum: \" + sumOfList(doubles));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Wildcards in Generics: ?, ? extends, and PECS.",
        "Understood generics and packaging.",
        "Ready for Exception Handling in Module 9."
      ],
      "nextLessonId": "java-exception-hierarchy",
      "nextLessonTitle": "The Java Exception Hierarchy",
      "nextLessonModuleId": "java-module-9"
    }
  }
};
