import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const javaModule12Data: JavaModuleData = {
  "id": "java-module-12",
  "number": 12,
  "title": "Modern Java and Projects",
  "subtitle": "File I/O, Lambdas, Streams API, Multithreading & High-Throughput Pipeline Project",
  "order": 12,
  "icon": "Terminal",
  "badge": "Production Java",
  "estimatedHours": 12,
  "topicsCount": 10,
  "description": "Write modern, enterprise-ready Java. Master modern File I/O with java.nio.file.Files, lambda expressions, standard functional interfaces, the Java Streams API (filter, map, reduce, groupingBy), Optional<T>, Thread and Runnable concurrency, synchronization, and build a capstone multithreaded data pipeline.",
  "lessons": [
    {
      "id": "java-file-io-nio",
      "moduleId": "java-module-12",
      "title": "Java File I/O: Reading and Writing Files (NIO.2)",
      "description": "Files.readString, Files.writeString, Path, and stream-based buffering.",
      "order": 1,
      "readTimeMinutes": 15,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-lambdas-syntax",
      "moduleId": "java-module-12",
      "title": "Lambda Expressions and @FunctionalInterface",
      "description": "Anonymous functions, arrow syntax (->), and functional interface single abstract methods.",
      "order": 2,
      "readTimeMinutes": 15,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-functional-interfaces",
      "moduleId": "java-module-12",
      "title": "Standard Functional Interfaces (Predicate, Function, Consumer)",
      "description": "Built-in utility interfaces in java.util.function and method references (::).",
      "order": 3,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-streams-filter-map",
      "moduleId": "java-module-12",
      "title": "The Java Streams API: Filter, Map, and Collect",
      "description": "Declarative pipelines, intermediate vs terminal operations, and Collectors.toList.",
      "order": 4,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-streams-reduce-grouping",
      "moduleId": "java-module-12",
      "title": "Advanced Streams: reduce, groupingBy & Summary Stats",
      "description": "Aggregating numbers, partitioning data by predicates, and groupingBy frequency tables.",
      "order": 5,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-optional-type",
      "moduleId": "java-module-12",
      "title": "Optional<T>: Eliminating NullPointerExceptions Safely",
      "description": "Optional.ofNullable, map, filter, orElse, and modern monadic null safety.",
      "order": 6,
      "readTimeMinutes": 15,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-threads-runnable",
      "moduleId": "java-module-12",
      "title": "Multithreading Basics: The Thread Class & Runnable",
      "description": "Spawning concurrent threads, Thread.sleep(), and lifecycle states (RUNNABLE, BLOCKED).",
      "order": 7,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-synchronization-locks",
      "moduleId": "java-module-12",
      "title": "Concurrency, Synchronization & Race Conditions",
      "description": "The synchronized keyword, intrinsic monitor locks, and protecting shared state.",
      "order": 8,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "java-executors-completablefuture",
      "moduleId": "java-module-12",
      "title": "ExecutorService, Thread Pools & CompletableFuture",
      "description": "Managing thread pools (newFixedThreadPool) and asynchronous non-blocking pipelines.",
      "order": 9,
      "readTimeMinutes": 20,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "java-capstone-project",
      "moduleId": "java-module-12",
      "title": "Capstone: High-Throughput Java Task Pipeline",
      "description": "Assembling OOP, streams, exception handling, and concurrent threads into a real project.",
      "order": 10,
      "readTimeMinutes": 24,
      "visualizerType": "none",
      "difficulty": "Advanced"
    }
  ]
};

export const javaModule12Lessons: Record<string, JavaLessonContent> = {
  "java-file-io-nio": {
    "id": "java-file-io-nio",
    "moduleId": "java-module-12",
    "title": "Java File I/O: Reading and Writing Files (NIO.2)",
    "subtitle": "High-Performance Modern Files and Path Utilities in java.nio.file",
    "order": 1,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master Java File I/O: Reading and Writing Files (NIO.2).",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "Java File I/O: Reading and Writing Files (NIO.2) Metaphor",
      "text": "Sending a courier directly to an office desk (NIO.2) instead of filling out paper dispatch manifests and custom stream buffers manually.",
      "metaphor": "Sending a courier directly to an office desk (NIO.2) instead of filling out paper dispatch manifests and custom stream buffers manually."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind Java File I/O: Reading and Writing Files (NIO.2).",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Java File I/O: Reading and Writing Files (NIO.2)",
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java NIO.2 File Operations:\");\n        System.out.println(\"1. Path path = Path.of(\"data.txt\");\");\n        System.out.println(\"2. Files.writeString(path, \"Hello, Java!\");\");\n        System.out.println(\"3. String content = Files.readString(path);\");\n        System.out.println(\"Content successfully read via modern NIO.2!\");\n    }\n}",
      "explanation": "Examine the modern Java implementation of Java File I/O: Reading and Writing Files (NIO.2)."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java NIO.2 File Operations:\");\n        System.out.println(\"1. Path path = Path.of(\"data.txt\");\");\n        System.out.println(\"2. Files.writeString(path, \"Hello, Java!\");\");\n        System.out.println(\"3. String content = Files.readString(path);\");\n        System.out.println(\"Content successfully read via modern NIO.2!\");\n    }\n}",
      "expectedOutput": "Java NIO.2 File Operations:\\n1. Path path = Path.of(\"data.txt\");\\n2. Files.writeString(path, \"Hello, Java!\");\\n3. String content = Files.readString(path);\\nContent successfully read via modern NIO.2!"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using legacy java.io.File and FileInputStream instead of modern java.nio.file.Files.",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-file-io-nio",
        "question": "Which modern class in java.nio.file provides one-liner methods like readString() and writeString()?",
        "answer": "java.nio.file.Files",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-file-io-nio",
        "question": "Which modern class in java.nio.file provides one-liner methods like readString() and writeString()?",
        "options": [
          "java.io.File",
          "java.nio.file.Files",
          "java.io.FileReader",
          "java.nio.file.Disk"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-file-io-nio",
      "title": "Exercise: Java File I/O: Reading and Writing Files (NIO.2)",
      "difficulty": "Intermediate",
      "description": "Implement Java File I/O: Reading and Writing Files (NIO.2) to complete the modern Java task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java NIO.2 File Operations:\");\n        System.out.println(\"1. Path path = Path.of(\"data.txt\");\");\n        System.out.println(\"2. Files.writeString(path, \"Hello, Java!\");\");\n        System.out.println(\"3. String content = Files.readString(path);\");\n        System.out.println(\"Content successfully read via modern NIO.2!\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java NIO.2 File Operations:\");\n        System.out.println(\"1. Path path = Path.of(\"data.txt\");\");\n        System.out.println(\"2. Files.writeString(path, \"Hello, Java!\");\");\n        System.out.println(\"3. String content = Files.readString(path);\");\n        System.out.println(\"Content successfully read via modern NIO.2!\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Java File I/O: Reading and Writing Files (NIO.2).",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ],
      "nextLessonId": "java-lambdas-syntax",
      "nextLessonTitle": "Lambda Expressions and @FunctionalInterface",
      "nextLessonModuleId": "java-module-12"
    }
  },
  "java-lambdas-syntax": {
    "id": "java-lambdas-syntax",
    "moduleId": "java-module-12",
    "title": "Lambda Expressions and @FunctionalInterface",
    "subtitle": "Concise Anonymous Function Literals: (parameters) -> expression",
    "order": 2,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master Lambda Expressions and @FunctionalInterface.",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "Lambda Expressions and @FunctionalInterface Metaphor",
      "text": "A short text message abbreviation ('BRB') vs writing a formal typed letter with stamps and envelopes (old anonymous inner classes).",
      "metaphor": "A short text message abbreviation ('BRB') vs writing a formal typed letter with stamps and envelopes (old anonymous inner classes)."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind Lambda Expressions and @FunctionalInterface.",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Lambda Expressions and @FunctionalInterface",
      "code": "interface MathOperation {\n    int operate(int a, int b);\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Lambda expression replacing boilerplate anonymous class!\n        MathOperation addition = (a, b) -> a + b;\n        MathOperation multiply = (a, b) -> a * b;\n\n        System.out.println(\"10 + 5 = \" + addition.operate(10, 5));\n        System.out.println(\"10 * 5 = \" + multiply.operate(10, 5));\n    }\n}",
      "explanation": "Examine the modern Java implementation of Lambda Expressions and @FunctionalInterface."
    },
    "runnableCode": {
      "code": "interface MathOperation {\n    int operate(int a, int b);\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Lambda expression replacing boilerplate anonymous class!\n        MathOperation addition = (a, b) -> a + b;\n        MathOperation multiply = (a, b) -> a * b;\n\n        System.out.println(\"10 + 5 = \" + addition.operate(10, 5));\n        System.out.println(\"10 * 5 = \" + multiply.operate(10, 5));\n    }\n}",
      "expectedOutput": "10 + 5 = 15\\n10 * 5 = 50"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to create a lambda for an interface with more than one abstract method.",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-lambdas-syntax",
        "question": "What is a Functional Interface in Java?",
        "answer": "An interface with exactly ONE abstract method",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-lambdas-syntax",
        "question": "What is a Functional Interface in Java?",
        "options": [
          "An interface with no methods",
          "An interface with exactly ONE abstract method",
          "An interface with only default methods",
          "A class with static methods"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-lambdas-syntax",
      "title": "Exercise: Lambda Expressions and @FunctionalInterface",
      "difficulty": "Intermediate",
      "description": "Implement Lambda Expressions and @FunctionalInterface to complete the modern Java task.",
      "starterCode": "interface MathOperation {\n    int operate(int a, int b);\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Lambda expression replacing boilerplate anonymous class!\n        MathOperation addition = (a, b) -> a + b;\n        MathOperation multiply = (a, b) -> a * b;\n\n        System.out.println(\"10 + 5 = \" + addition.operate(10, 5));\n        System.out.println(\"10 * 5 = \" + multiply.operate(10, 5));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "interface MathOperation {\n    int operate(int a, int b);\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Lambda expression replacing boilerplate anonymous class!\n        MathOperation addition = (a, b) -> a + b;\n        MathOperation multiply = (a, b) -> a * b;\n\n        System.out.println(\"10 + 5 = \" + addition.operate(10, 5));\n        System.out.println(\"10 * 5 = \" + multiply.operate(10, 5));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Lambda Expressions and @FunctionalInterface.",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ],
      "nextLessonId": "java-functional-interfaces",
      "nextLessonTitle": "Standard Functional Interfaces (Predicate, Function, Consumer)",
      "nextLessonModuleId": "java-module-12"
    }
  },
  "java-functional-interfaces": {
    "id": "java-functional-interfaces",
    "moduleId": "java-module-12",
    "title": "Standard Functional Interfaces (Predicate, Function, Consumer)",
    "subtitle": "Reusing Built-In Standard Lambdas in java.util.function and Method References (::)",
    "order": 3,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master Standard Functional Interfaces (Predicate, Function, Consumer).",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "Standard Functional Interfaces (Predicate, Function, Consumer) Metaphor",
      "text": "Standard electrical appliance cords: a 3-prong plug (Predicate) tests the circuit, a power adapter (Function) converts voltage, and a light bulb (Consumer) uses the power.",
      "metaphor": "Standard electrical appliance cords: a 3-prong plug (Predicate) tests the circuit, a power adapter (Function) converts voltage, and a light bulb (Consumer) uses the power."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind Standard Functional Interfaces (Predicate, Function, Consumer).",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Standard Functional Interfaces (Predicate, Function, Consumer)",
      "code": "import java.util.function.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Predicate: takes T, returns boolean\n        Predicate<Integer> isEven = n -> n % 2 == 0;\n        // Function: takes T, returns R\n        Function<String, Integer> stringLength = String::length; // Method reference!\n        // Consumer: takes T, returns void\n        Consumer<String> printer = System.out::println;\n\n        System.out.println(\"Is 4 even? \" + isEven.test(4));\n        System.out.println(\"Length of 'Java': \" + stringLength.apply(\"Java\"));\n        printer.accept(\"Printed via Consumer method reference!\");\n    }\n}",
      "explanation": "Examine the modern Java implementation of Standard Functional Interfaces (Predicate, Function, Consumer)."
    },
    "runnableCode": {
      "code": "import java.util.function.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Predicate: takes T, returns boolean\n        Predicate<Integer> isEven = n -> n % 2 == 0;\n        // Function: takes T, returns R\n        Function<String, Integer> stringLength = String::length; // Method reference!\n        // Consumer: takes T, returns void\n        Consumer<String> printer = System.out::println;\n\n        System.out.println(\"Is 4 even? \" + isEven.test(4));\n        System.out.println(\"Length of 'Java': \" + stringLength.apply(\"Java\"));\n        printer.accept(\"Printed via Consumer method reference!\");\n    }\n}",
      "expectedOutput": "Is 4 even? true\\nLength of 'Java': 4\\nPrinted via Consumer method reference!"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing Function<T, R> (returns value) with Consumer<T> (returns void).",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-functional-interfaces",
        "question": "Which standard functional interface takes an argument and returns a boolean?",
        "answer": "Predicate<T>",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-functional-interfaces",
        "question": "Which standard functional interface takes an argument and returns a boolean?",
        "options": [
          "Function<T, R>",
          "Predicate<T>",
          "Consumer<T>",
          "Supplier<T>"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-functional-interfaces",
      "title": "Exercise: Standard Functional Interfaces (Predicate, Function, Consumer)",
      "difficulty": "Intermediate",
      "description": "Implement Standard Functional Interfaces (Predicate, Function, Consumer) to complete the modern Java task.",
      "starterCode": "import java.util.function.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Predicate: takes T, returns boolean\n        Predicate<Integer> isEven = n -> n % 2 == 0;\n        // Function: takes T, returns R\n        Function<String, Integer> stringLength = String::length; // Method reference!\n        // Consumer: takes T, returns void\n        Consumer<String> printer = System.out::println;\n\n        System.out.println(\"Is 4 even? \" + isEven.test(4));\n        System.out.println(\"Length of 'Java': \" + stringLength.apply(\"Java\"));\n        printer.accept(\"Printed via Consumer method reference!\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.function.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Predicate: takes T, returns boolean\n        Predicate<Integer> isEven = n -> n % 2 == 0;\n        // Function: takes T, returns R\n        Function<String, Integer> stringLength = String::length; // Method reference!\n        // Consumer: takes T, returns void\n        Consumer<String> printer = System.out::println;\n\n        System.out.println(\"Is 4 even? \" + isEven.test(4));\n        System.out.println(\"Length of 'Java': \" + stringLength.apply(\"Java\"));\n        printer.accept(\"Printed via Consumer method reference!\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Standard Functional Interfaces (Predicate, Function, Consumer).",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ],
      "nextLessonId": "java-streams-filter-map",
      "nextLessonTitle": "The Java Streams API: Filter, Map, and Collect",
      "nextLessonModuleId": "java-module-12"
    }
  },
  "java-streams-filter-map": {
    "id": "java-streams-filter-map",
    "moduleId": "java-module-12",
    "title": "The Java Streams API: Filter, Map, and Collect",
    "subtitle": "Declarative Functional Processing Pipelines for Collections",
    "order": 4,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master The Java Streams API: Filter, Map, and Collect.",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "The Java Streams API: Filter, Map, and Collect Metaphor",
      "text": "An industrial factory assembly line: raw car parts travel down the conveyor; defective parts are filtered out, remaining parts are painted (mapped), and finished cars are packaged (collected).",
      "metaphor": "An industrial factory assembly line: raw car parts travel down the conveyor; defective parts are filtered out, remaining parts are painted (mapped), and finished cars are packaged (collected)."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind The Java Streams API: Filter, Map, and Collect.",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The Java Streams API: Filter, Map, and Collect",
      "code": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"alice\", \"bob\", \"alex\", \"charlie\", \"anna\");\n\n        // Pipeline: filter names starting with 'a', capitalize, collect to list\n        List<String> result = names.stream()\n            .filter(name -> name.startsWith(\"a\"))\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n\n        System.out.println(\"Stream Pipeline Result: \" + result);\n    }\n}",
      "explanation": "Examine the modern Java implementation of The Java Streams API: Filter, Map, and Collect."
    },
    "runnableCode": {
      "code": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"alice\", \"bob\", \"alex\", \"charlie\", \"anna\");\n\n        // Pipeline: filter names starting with 'a', capitalize, collect to list\n        List<String> result = names.stream()\n            .filter(name -> name.startsWith(\"a\"))\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n\n        System.out.println(\"Stream Pipeline Result: \" + result);\n    }\n}",
      "expectedOutput": "Stream Pipeline Result: [ALICE, ALEX, ANNA]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to reuse a Stream after a terminal operation has already been executed on it (throws IllegalStateException).",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-streams-filter-map",
        "question": "When does an intermediate stream operation (like .filter() or .map()) actually execute?",
        "answer": "Only when a terminal operation (like .collect() or .forEach()) is invoked (Lazy Evaluation)",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-streams-filter-map",
        "question": "When does an intermediate stream operation (like .filter() or .map()) actually execute?",
        "options": [
          "Immediately when declared",
          "Only when a terminal operation (like .collect() or .forEach()) is invoked (Lazy Evaluation)",
          "At compile time",
          "When System.gc() runs"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-streams-filter-map",
      "title": "Exercise: The Java Streams API: Filter, Map, and Collect",
      "difficulty": "Intermediate",
      "description": "Implement The Java Streams API: Filter, Map, and Collect to complete the modern Java task.",
      "starterCode": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"alice\", \"bob\", \"alex\", \"charlie\", \"anna\");\n\n        // Pipeline: filter names starting with 'a', capitalize, collect to list\n        List<String> result = names.stream()\n            .filter(name -> name.startsWith(\"a\"))\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n\n        System.out.println(\"Stream Pipeline Result: \" + result);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"alice\", \"bob\", \"alex\", \"charlie\", \"anna\");\n\n        // Pipeline: filter names starting with 'a', capitalize, collect to list\n        List<String> result = names.stream()\n            .filter(name -> name.startsWith(\"a\"))\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n\n        System.out.println(\"Stream Pipeline Result: \" + result);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The Java Streams API: Filter, Map, and Collect.",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ],
      "nextLessonId": "java-streams-reduce-grouping",
      "nextLessonTitle": "Advanced Streams: reduce, groupingBy & Summary Stats",
      "nextLessonModuleId": "java-module-12"
    }
  },
  "java-streams-reduce-grouping": {
    "id": "java-streams-reduce-grouping",
    "moduleId": "java-module-12",
    "title": "Advanced Streams: reduce, groupingBy & Summary Stats",
    "subtitle": "Aggregating Data, Computing Statistics, and Grouping Elements by Properties",
    "order": 5,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master Advanced Streams: reduce, groupingBy & Summary Stats.",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "Advanced Streams: reduce, groupingBy & Summary Stats Metaphor",
      "text": "A ballot box counter: reduce takes each vote and accumulates the grand total into a single final winner announcement.",
      "metaphor": "A ballot box counter: reduce takes each vote and accumulates the grand total into a single final winner announcement."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind Advanced Streams: reduce, groupingBy & Summary Stats.",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Advanced Streams: reduce, groupingBy & Summary Stats",
      "code": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = Arrays.asList(5, 10, 15, 20);\n\n        // Reduce to sum\n        int sum = numbers.stream().reduce(0, Integer::sum);\n        System.out.println(\"Stream Reduced Sum: \" + sum);\n\n        // Summary statistics\n        IntSummaryStatistics stats = numbers.stream().mapToInt(Integer::intValue).summaryStatistics();\n        System.out.println(\"Average: \" + stats.getAverage() + \", Max: \" + stats.getMax());\n    }\n}",
      "explanation": "Examine the modern Java implementation of Advanced Streams: reduce, groupingBy & Summary Stats."
    },
    "runnableCode": {
      "code": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = Arrays.asList(5, 10, 15, 20);\n\n        // Reduce to sum\n        int sum = numbers.stream().reduce(0, Integer::sum);\n        System.out.println(\"Stream Reduced Sum: \" + sum);\n\n        // Summary statistics\n        IntSummaryStatistics stats = numbers.stream().mapToInt(Integer::intValue).summaryStatistics();\n        System.out.println(\"Average: \" + stats.getAverage() + \", Max: \" + stats.getMax());\n    }\n}",
      "expectedOutput": "Stream Reduced Sum: 50\\nAverage: 12.5, Max: 20"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using parallelStream() on small collections or operations with shared mutable state.",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-streams-reduce-grouping",
        "question": "What collector groups stream elements into a Map based on a classification function?",
        "answer": "Collectors.groupingBy",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-streams-reduce-grouping",
        "question": "What collector groups stream elements into a Map based on a classification function?",
        "options": [
          "Collectors.toMap",
          "Collectors.groupingBy",
          "Collectors.partitioningBy",
          "Collectors.summarizingInt"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-streams-reduce-grouping",
      "title": "Exercise: Advanced Streams: reduce, groupingBy & Summary Stats",
      "difficulty": "Intermediate",
      "description": "Implement Advanced Streams: reduce, groupingBy & Summary Stats to complete the modern Java task.",
      "starterCode": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = Arrays.asList(5, 10, 15, 20);\n\n        // Reduce to sum\n        int sum = numbers.stream().reduce(0, Integer::sum);\n        System.out.println(\"Stream Reduced Sum: \" + sum);\n\n        // Summary statistics\n        IntSummaryStatistics stats = numbers.stream().mapToInt(Integer::intValue).summaryStatistics();\n        System.out.println(\"Average: \" + stats.getAverage() + \", Max: \" + stats.getMax());\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = Arrays.asList(5, 10, 15, 20);\n\n        // Reduce to sum\n        int sum = numbers.stream().reduce(0, Integer::sum);\n        System.out.println(\"Stream Reduced Sum: \" + sum);\n\n        // Summary statistics\n        IntSummaryStatistics stats = numbers.stream().mapToInt(Integer::intValue).summaryStatistics();\n        System.out.println(\"Average: \" + stats.getAverage() + \", Max: \" + stats.getMax());\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Advanced Streams: reduce, groupingBy & Summary Stats.",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ],
      "nextLessonId": "java-optional-type",
      "nextLessonTitle": "Optional<T>: Eliminating NullPointerExceptions Safely",
      "nextLessonModuleId": "java-module-12"
    }
  },
  "java-optional-type": {
    "id": "java-optional-type",
    "moduleId": "java-module-12",
    "title": "Optional<T>: Eliminating NullPointerExceptions Safely",
    "subtitle": "Monadic Container for Values That May or May Not Be Present",
    "order": 6,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master Optional<T>: Eliminating NullPointerExceptions Safely.",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "Optional<T>: Eliminating NullPointerExceptions Safely Metaphor",
      "text": "A gift box: you open the box; it might contain a watch (Optional.of), or it might be empty (Optional.empty). You check before using it, preventing crashes.",
      "metaphor": "A gift box: you open the box; it might contain a watch (Optional.of), or it might be empty (Optional.empty). You check before using it, preventing crashes."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind Optional<T>: Eliminating NullPointerExceptions Safely.",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Optional<T>: Eliminating NullPointerExceptions Safely",
      "code": "import java.util.Optional;\n\npublic class Main {\n    public static Optional<String> findUsername(int id) {\n        if (id == 1) return Optional.of(\"Alice\");\n        return Optional.empty(); // No null returned!\n    }\n\n    public static void main(String[] args) {\n        Optional<String> user = findUsername(1);\n        System.out.println(\"User present: \" + user.orElse(\"Guest\"));\n\n        Optional<String> missing = findUsername(99);\n        System.out.println(\"Missing fallback: \" + missing.orElse(\"DefaultUser\"));\n    }\n}",
      "explanation": "Examine the modern Java implementation of Optional<T>: Eliminating NullPointerExceptions Safely."
    },
    "runnableCode": {
      "code": "import java.util.Optional;\n\npublic class Main {\n    public static Optional<String> findUsername(int id) {\n        if (id == 1) return Optional.of(\"Alice\");\n        return Optional.empty(); // No null returned!\n    }\n\n    public static void main(String[] args) {\n        Optional<String> user = findUsername(1);\n        System.out.println(\"User present: \" + user.orElse(\"Guest\"));\n\n        Optional<String> missing = findUsername(99);\n        System.out.println(\"Missing fallback: \" + missing.orElse(\"DefaultUser\"));\n    }\n}",
      "expectedOutput": "User present: Alice\\nMissing fallback: DefaultUser"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Calling optional.get() directly without checking ifPresent() or using orElse(), defeating the purpose of Optional.",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-optional-type",
        "question": "How should you provide a safe fallback value if an Optional is empty?",
        "answer": "Use optional.orElse(fallbackValue)",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-optional-type",
        "question": "How should you provide a safe fallback value if an Optional is empty?",
        "options": [
          "Call optional.get()",
          "Use optional.orElse(fallbackValue)",
          "Check null",
          "Catch NullPointerException"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-optional-type",
      "title": "Exercise: Optional<T>: Eliminating NullPointerExceptions Safely",
      "difficulty": "Intermediate",
      "description": "Implement Optional<T>: Eliminating NullPointerExceptions Safely to complete the modern Java task.",
      "starterCode": "import java.util.Optional;\n\npublic class Main {\n    public static Optional<String> findUsername(int id) {\n        if (id == 1) return Optional.of(\"Alice\");\n        return Optional.empty(); // No null returned!\n    }\n\n    public static void main(String[] args) {\n        Optional<String> user = findUsername(1);\n        System.out.println(\"User present: \" + user.orElse(\"Guest\"));\n\n        Optional<String> missing = findUsername(99);\n        System.out.println(\"Missing fallback: \" + missing.orElse(\"DefaultUser\"));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.Optional;\n\npublic class Main {\n    public static Optional<String> findUsername(int id) {\n        if (id == 1) return Optional.of(\"Alice\");\n        return Optional.empty(); // No null returned!\n    }\n\n    public static void main(String[] args) {\n        Optional<String> user = findUsername(1);\n        System.out.println(\"User present: \" + user.orElse(\"Guest\"));\n\n        Optional<String> missing = findUsername(99);\n        System.out.println(\"Missing fallback: \" + missing.orElse(\"DefaultUser\"));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Optional<T>: Eliminating NullPointerExceptions Safely.",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ],
      "nextLessonId": "java-threads-runnable",
      "nextLessonTitle": "Multithreading Basics: The Thread Class & Runnable",
      "nextLessonModuleId": "java-module-12"
    }
  },
  "java-threads-runnable": {
    "id": "java-threads-runnable",
    "moduleId": "java-module-12",
    "title": "Multithreading Basics: The Thread Class & Runnable",
    "subtitle": "Concurrent Execution, Thread.sleep(), and Parallel Workers",
    "order": 7,
    "readTimeMinutes": 16,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Master Multithreading Basics: The Thread Class & Runnable.",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "Multithreading Basics: The Thread Class & Runnable Metaphor",
      "text": "Multiple chefs cooking in the same restaurant kitchen: one chef chops vegetables while another bakes bread simultaneously.",
      "metaphor": "Multiple chefs cooking in the same restaurant kitchen: one chef chops vegetables while another bakes bread simultaneously."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind Multithreading Basics: The Thread Class & Runnable.",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Multithreading Basics: The Thread Class & Runnable",
      "code": "public class Main {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            System.out.println(\"Background worker thread running concurrently!\");\n        });\n\n        worker.start(); // Spawns OS thread\n        worker.join();  // Wait for worker to finish\n        System.out.println(\"Main thread resumed and exiting.\");\n    }\n}",
      "explanation": "Examine the modern Java implementation of Multithreading Basics: The Thread Class & Runnable."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            System.out.println(\"Background worker thread running concurrently!\");\n        });\n\n        worker.start(); // Spawns OS thread\n        worker.join();  // Wait for worker to finish\n        System.out.println(\"Main thread resumed and exiting.\");\n    }\n}",
      "expectedOutput": "Background worker thread running concurrently!\\nMain thread resumed and exiting."
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Calling thread.run() instead of thread.start(); run() executes synchronously on the current thread without spawning a new one!",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-threads-runnable",
        "question": "Which method starts a new OS thread and invokes the run() method asynchronously?",
        "answer": "thread.start()",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-threads-runnable",
        "question": "Which method starts a new OS thread and invokes the run() method asynchronously?",
        "options": [
          "thread.run()",
          "thread.start()",
          "thread.execute()",
          "thread.launch()"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-threads-runnable",
      "title": "Exercise: Multithreading Basics: The Thread Class & Runnable",
      "difficulty": "Intermediate",
      "description": "Implement Multithreading Basics: The Thread Class & Runnable to complete the modern Java task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            System.out.println(\"Background worker thread running concurrently!\");\n        });\n\n        worker.start(); // Spawns OS thread\n        worker.join();  // Wait for worker to finish\n        System.out.println(\"Main thread resumed and exiting.\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            System.out.println(\"Background worker thread running concurrently!\");\n        });\n\n        worker.start(); // Spawns OS thread\n        worker.join();  // Wait for worker to finish\n        System.out.println(\"Main thread resumed and exiting.\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Multithreading Basics: The Thread Class & Runnable.",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ],
      "nextLessonId": "java-synchronization-locks",
      "nextLessonTitle": "Concurrency, Synchronization & Race Conditions",
      "nextLessonModuleId": "java-module-12"
    }
  },
  "java-synchronization-locks": {
    "id": "java-synchronization-locks",
    "moduleId": "java-module-12",
    "title": "Concurrency, Synchronization & Race Conditions",
    "subtitle": "Protecting Shared Mutable State with Intrinsic Monitor Locks",
    "order": 8,
    "readTimeMinutes": 16,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Master Concurrency, Synchronization & Race Conditions.",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "Concurrency, Synchronization & Race Conditions Metaphor",
      "text": "An airplane restroom lock: when one person enters and slides the lock, anyone else must wait in the aisle until they exit and unlock.",
      "metaphor": "An airplane restroom lock: when one person enters and slides the lock, anyone else must wait in the aisle until they exit and unlock."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind Concurrency, Synchronization & Race Conditions.",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Concurrency, Synchronization & Race Conditions",
      "code": "class BankVault {\n    private int cash = 1000;\n\n    // synchronized locks the monitor so only 1 thread enters at a time!\n    public synchronized void withdraw(int amount) {\n        if (cash >= amount) {\n            cash -= amount;\n        }\n    }\n    public synchronized int getCash() { return cash; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankVault vault = new BankVault();\n        vault.withdraw(200);\n        System.out.println(\"Remaining vault cash: $\" + vault.getCash());\n    }\n}",
      "explanation": "Examine the modern Java implementation of Concurrency, Synchronization & Race Conditions."
    },
    "runnableCode": {
      "code": "class BankVault {\n    private int cash = 1000;\n\n    // synchronized locks the monitor so only 1 thread enters at a time!\n    public synchronized void withdraw(int amount) {\n        if (cash >= amount) {\n            cash -= amount;\n        }\n    }\n    public synchronized int getCash() { return cash; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankVault vault = new BankVault();\n        vault.withdraw(200);\n        System.out.println(\"Remaining vault cash: $\" + vault.getCash());\n    }\n}",
      "expectedOutput": "Remaining vault cash: $800"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Neglecting thread synchronization when multiple threads read and write to the same shared variable.",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-synchronization-locks",
        "question": "What Java keyword is used to ensure that only one thread can execute a block of code at a time?",
        "answer": "synchronized",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-synchronization-locks",
        "question": "What Java keyword is used to ensure that only one thread can execute a block of code at a time?",
        "options": [
          "volatile",
          "synchronized",
          "atomic",
          "static"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-synchronization-locks",
      "title": "Exercise: Concurrency, Synchronization & Race Conditions",
      "difficulty": "Intermediate",
      "description": "Implement Concurrency, Synchronization & Race Conditions to complete the modern Java task.",
      "starterCode": "class BankVault {\n    private int cash = 1000;\n\n    // synchronized locks the monitor so only 1 thread enters at a time!\n    public synchronized void withdraw(int amount) {\n        if (cash >= amount) {\n            cash -= amount;\n        }\n    }\n    public synchronized int getCash() { return cash; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankVault vault = new BankVault();\n        vault.withdraw(200);\n        System.out.println(\"Remaining vault cash: $\" + vault.getCash());\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class BankVault {\n    private int cash = 1000;\n\n    // synchronized locks the monitor so only 1 thread enters at a time!\n    public synchronized void withdraw(int amount) {\n        if (cash >= amount) {\n            cash -= amount;\n        }\n    }\n    public synchronized int getCash() { return cash; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankVault vault = new BankVault();\n        vault.withdraw(200);\n        System.out.println(\"Remaining vault cash: $\" + vault.getCash());\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Concurrency, Synchronization & Race Conditions.",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ],
      "nextLessonId": "java-executors-completablefuture",
      "nextLessonTitle": "ExecutorService, Thread Pools & CompletableFuture",
      "nextLessonModuleId": "java-module-12"
    }
  },
  "java-executors-completablefuture": {
    "id": "java-executors-completablefuture",
    "moduleId": "java-module-12",
    "title": "ExecutorService, Thread Pools & CompletableFuture",
    "subtitle": "Reusing Threads, Avoiding Thread Creation Overhead, and Async Pipelines",
    "order": 9,
    "readTimeMinutes": 16,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Master ExecutorService, Thread Pools & CompletableFuture.",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "ExecutorService, Thread Pools & CompletableFuture Metaphor",
      "text": "A taxi fleet: instead of buying a new car for every single passenger and destroying the car when they arrive, a pool of 5 taxis serves hundreds of rides continuously.",
      "metaphor": "A taxi fleet: instead of buying a new car for every single passenger and destroying the car when they arrive, a pool of 5 taxis serves hundreds of rides continuously."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind ExecutorService, Thread Pools & CompletableFuture.",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating ExecutorService, Thread Pools & CompletableFuture",
      "code": "import java.util.concurrent.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        ExecutorService pool = Executors.newFixedThreadPool(2);\n\n        Future<Integer> task = pool.submit(() -> {\n            return 42 * 2;\n        });\n\n        System.out.println(\"Asynchronous computation result: \" + task.get());\n        pool.shutdown();\n    }\n}",
      "explanation": "Examine the modern Java implementation of ExecutorService, Thread Pools & CompletableFuture."
    },
    "runnableCode": {
      "code": "import java.util.concurrent.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        ExecutorService pool = Executors.newFixedThreadPool(2);\n\n        Future<Integer> task = pool.submit(() -> {\n            return 42 * 2;\n        });\n\n        System.out.println(\"Asynchronous computation result: \" + task.get());\n        pool.shutdown();\n    }\n}",
      "expectedOutput": "Asynchronous computation result: 84"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to call executorService.shutdown(), which keeps JVM worker threads alive and prevents program exit.",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-executors-completablefuture",
        "question": "Why are thread pools (ExecutorService) preferred over manually creating new Thread objects in production?",
        "answer": "They reuse existing threads, eliminating heavy OS thread allocation overhead",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-executors-completablefuture",
        "question": "Why are thread pools (ExecutorService) preferred over manually creating new Thread objects in production?",
        "options": [
          "They eliminate syntax errors",
          "They reuse existing threads, eliminating heavy OS thread allocation overhead",
          "They run without the JVM",
          "They use less disk space"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-executors-completablefuture",
      "title": "Exercise: ExecutorService, Thread Pools & CompletableFuture",
      "difficulty": "Intermediate",
      "description": "Implement ExecutorService, Thread Pools & CompletableFuture to complete the modern Java task.",
      "starterCode": "import java.util.concurrent.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        ExecutorService pool = Executors.newFixedThreadPool(2);\n\n        Future<Integer> task = pool.submit(() -> {\n            return 42 * 2;\n        });\n\n        System.out.println(\"Asynchronous computation result: \" + task.get());\n        pool.shutdown();\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.concurrent.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        ExecutorService pool = Executors.newFixedThreadPool(2);\n\n        Future<Integer> task = pool.submit(() -> {\n            return 42 * 2;\n        });\n\n        System.out.println(\"Asynchronous computation result: \" + task.get());\n        pool.shutdown();\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered ExecutorService, Thread Pools & CompletableFuture.",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ],
      "nextLessonId": "java-capstone-project",
      "nextLessonTitle": "Capstone: High-Throughput Java Task Pipeline",
      "nextLessonModuleId": "java-module-12"
    }
  },
  "java-capstone-project": {
    "id": "java-capstone-project",
    "moduleId": "java-module-12",
    "title": "Capstone: High-Throughput Java Task Pipeline",
    "subtitle": "Full Synthesis: OOP, Streams, Exceptions, and Concurrency in a Real Application",
    "order": 10,
    "readTimeMinutes": 16,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Master Capstone: High-Throughput Java Task Pipeline.",
      "Apply modern Java features (Streams, Lambdas, Concurrency).",
      "Build production-grade applications."
    ],
    "prerequisites": [
      "Module 11: DSA Using Java"
    ],
    "analogy": {
      "title": "Capstone: High-Throughput Java Task Pipeline Metaphor",
      "text": "A state-of-the-art space shuttle launch control center: telemetry streams in, background threads monitor sensors, and the entire mission executes flawlessly.",
      "metaphor": "A state-of-the-art space shuttle launch control center: telemetry streams in, background threads monitor sensors, and the entire mission executes flawlessly."
    },
    "problemSolved": {
      "title": "High-Throughput Concurrent Systems in Modern Java",
      "description": "Leverages functional programming and multi-core CPU architectures for maximum performance.",
      "keyPoints": [
        "Declarative functional streams",
        "Thread pooling and safety",
        "Clean asynchronous workflows"
      ]
    },
    "intuition": {
      "overview": "Modern Java architecture behind Capstone: High-Throughput Java Task Pipeline.",
      "steps": [
        {
          "step": 1,
          "title": "Declarative Syntax",
          "description": "Lambdas and streams express intent clearly."
        },
        {
          "step": 2,
          "title": "Parallel Execution",
          "description": "Utilizes multi-core processors safely."
        },
        {
          "step": 3,
          "title": "Production Reliability",
          "description": "Fault-tolerant and maintainable at scale."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Capstone: High-Throughput Java Task Pipeline",
      "code": "import java.util.*;\nimport java.util.stream.Collectors;\n\nclass Task {\n    int id;\n    String name;\n    int durationMs;\n    Task(int id, String name, int durationMs) {\n        this.id = id; this.name = name; this.durationMs = durationMs;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Task> tasks = Arrays.asList(\n            new Task(1, \"Parse Logs\", 150),\n            new Task(2, \"Index Database\", 320),\n            new Task(3, \"Generate Report\", 90),\n            new Task(4, \"Send Notifications\", 40)\n        );\n\n        System.out.println(\"========================================\");\n        System.out.println(\"    JAVA CAPSTONE: TASK PIPELINE ENGINE \");\n        System.out.println(\"========================================\");\n\n        // Filter tasks exceeding 100ms using Streams\n        List<Task> heavyTasks = tasks.stream()\n            .filter(t -> t.durationMs >= 100)\n            .collect(Collectors.toList());\n\n        int totalTime = heavyTasks.stream().mapToInt(t -> t.durationMs).sum();\n\n        heavyTasks.forEach(t -> {\n            System.out.printf(\"Task [%d] %-20s -> %4d ms%n\", t.id, t.name, t.durationMs);\n        });\n\n        System.out.println(\"----------------------------------------\");\n        System.out.printf(\"Heavy Tasks Total Duration: %10d ms%n\", totalTime);\n        System.out.println(\"Status: Java Mastery Curriculum Completed!\");\n        System.out.println(\"========================================\");\n    }\n}",
      "explanation": "Examine the modern Java implementation of Capstone: High-Throughput Java Task Pipeline."
    },
    "runnableCode": {
      "code": "import java.util.*;\nimport java.util.stream.Collectors;\n\nclass Task {\n    int id;\n    String name;\n    int durationMs;\n    Task(int id, String name, int durationMs) {\n        this.id = id; this.name = name; this.durationMs = durationMs;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Task> tasks = Arrays.asList(\n            new Task(1, \"Parse Logs\", 150),\n            new Task(2, \"Index Database\", 320),\n            new Task(3, \"Generate Report\", 90),\n            new Task(4, \"Send Notifications\", 40)\n        );\n\n        System.out.println(\"========================================\");\n        System.out.println(\"    JAVA CAPSTONE: TASK PIPELINE ENGINE \");\n        System.out.println(\"========================================\");\n\n        // Filter tasks exceeding 100ms using Streams\n        List<Task> heavyTasks = tasks.stream()\n            .filter(t -> t.durationMs >= 100)\n            .collect(Collectors.toList());\n\n        int totalTime = heavyTasks.stream().mapToInt(t -> t.durationMs).sum();\n\n        heavyTasks.forEach(t -> {\n            System.out.printf(\"Task [%d] %-20s -> %4d ms%n\", t.id, t.name, t.durationMs);\n        });\n\n        System.out.println(\"----------------------------------------\");\n        System.out.printf(\"Heavy Tasks Total Duration: %10d ms%n\", totalTime);\n        System.out.println(\"Status: Java Mastery Curriculum Completed!\");\n        System.out.println(\"========================================\");\n    }\n}",
      "expectedOutput": "========================================\\n    JAVA CAPSTONE: TASK PIPELINE ENGINE \\n========================================\\nTask [1] Parse Logs           ->  150 ms\\nTask [2] Index Database       ->  320 ms\\n----------------------------------------\\nHeavy Tasks Total Duration:        470 ms\\nStatus: Java Mastery Curriculum Completed!\\n========================================"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "Modern Java features",
        "explanation": "Streams, Lambdas, or Concurrent constructs."
      },
      {
        "lines": "7-18",
        "codeSnippet": "// Execution and results",
        "explanation": "Pipeline processing and verification."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Writing monolithic single-file spaghetti code instead of modular, well-encapsulated classes.",
        "solution": "Follow modern Java best practices.",
        "whyWrong": "Causes race conditions or memory thrashing."
      }
    ],
    "bestPractices": [
      "Use Streams for readable data transformations.",
      "Always shut down ExecutorServices cleanly."
    ],
    "applications": [
      {
        "industry": "Cloud & Microservices",
        "useCase": "Spring Boot microservices, Kafka stream processors, and reactive backends."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-capstone-project",
        "question": "What makes modern Java (Java 17+) an industry powerhouse for enterprise backend engineering?",
        "answer": "Its combination of strict type safety, modern functional streams, high-performance concurrency, and JIT compilation",
        "explanation": "Modern Java specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-capstone-project",
        "question": "What makes modern Java (Java 17+) an industry powerhouse for enterprise backend engineering?",
        "options": [
          "It only runs in browsers",
          "Its combination of strict type safety, modern functional streams, high-performance concurrency, and JIT compilation",
          "It eliminates classes",
          "It requires no memory management"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-capstone-project",
      "title": "Exercise: Capstone: High-Throughput Java Task Pipeline",
      "difficulty": "Intermediate",
      "description": "Implement Capstone: High-Throughput Java Task Pipeline to complete the modern Java task.",
      "starterCode": "import java.util.*;\nimport java.util.stream.Collectors;\n\nclass Task {\n    int id;\n    String name;\n    int durationMs;\n    Task(int id, String name, int durationMs) {\n        this.id = id; this.name = name; this.durationMs = durationMs;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Task> tasks = Arrays.asList(\n            new Task(1, \"Parse Logs\", 150),\n            new Task(2, \"Index Database\", 320),\n            new Task(3, \"Generate Report\", 90),\n            new Task(4, \"Send Notifications\", 40)\n        );\n\n        System.out.println(\"========================================\");\n        System.out.println(\"    JAVA CAPSTONE: TASK PIPELINE ENGINE \");\n        System.out.println(\"========================================\");\n\n        // Filter tasks exceeding 100ms using Streams\n        List<Task> heavyTasks = tasks.stream()\n            .filter(t -> t.durationMs >= 100)\n            .collect(Collectors.toList());\n\n        int totalTime = heavyTasks.stream().mapToInt(t -> t.durationMs).sum();\n\n        heavyTasks.forEach(t -> {\n            System.out.printf(\"Task [%d] %-20s -> %4d ms%n\", t.id, t.name, t.durationMs);\n        });\n\n        System.out.println(\"----------------------------------------\");\n        System.out.printf(\"Heavy Tasks Total Duration: %10d ms%n\", totalTime);\n        System.out.println(\"Status: Java Mastery Curriculum Completed!\");\n        System.out.println(\"========================================\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.*;\nimport java.util.stream.Collectors;\n\nclass Task {\n    int id;\n    String name;\n    int durationMs;\n    Task(int id, String name, int durationMs) {\n        this.id = id; this.name = name; this.durationMs = durationMs;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Task> tasks = Arrays.asList(\n            new Task(1, \"Parse Logs\", 150),\n            new Task(2, \"Index Database\", 320),\n            new Task(3, \"Generate Report\", 90),\n            new Task(4, \"Send Notifications\", 40)\n        );\n\n        System.out.println(\"========================================\");\n        System.out.println(\"    JAVA CAPSTONE: TASK PIPELINE ENGINE \");\n        System.out.println(\"========================================\");\n\n        // Filter tasks exceeding 100ms using Streams\n        List<Task> heavyTasks = tasks.stream()\n            .filter(t -> t.durationMs >= 100)\n            .collect(Collectors.toList());\n\n        int totalTime = heavyTasks.stream().mapToInt(t -> t.durationMs).sum();\n\n        heavyTasks.forEach(t -> {\n            System.out.printf(\"Task [%d] %-20s -> %4d ms%n\", t.id, t.name, t.durationMs);\n        });\n\n        System.out.println(\"----------------------------------------\");\n        System.out.printf(\"Heavy Tasks Total Duration: %10d ms%n\", totalTime);\n        System.out.println(\"Status: Java Mastery Curriculum Completed!\");\n        System.out.println(\"========================================\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Capstone: High-Throughput Java Task Pipeline.",
        "Understood modern functional and concurrent Java.",
        "Completed the Java Mastery Lab curriculum!"
      ]
    }
  }
};
