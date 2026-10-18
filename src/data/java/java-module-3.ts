import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const javaModule3Data: JavaModuleData = {
  "id": "java-module-3",
  "number": 3,
  "title": "Conditions and Loops",
  "subtitle": "If-Else, Switch Expressions, For, While, Do-While & Control Flow",
  "description": "Master program decision making and iterative processing. Compare if-else branching with modern enhanced switch expressions, analyze for, while, and do-while loops, utilize break and continue, and solve practical algorithmic challenges.",
  "icon": "GitFork",
  "badge": "Control Flow",
  "estimatedHours": 9,
  "topicsCount": 10,
  "lessons": [
    {
      "id": "java-if-else-branching",
      "moduleId": "java-module-3",
      "title": "If, Else-If, and Else Conditional Branching",
      "description": "Nested conditions, relational comparisons, and executing exclusive blocks.",
      "order": 1,
      "readTimeMinutes": 14,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    },
    {
      "id": "java-ternary-operator",
      "moduleId": "java-module-3",
      "title": "The Ternary Operator (? :) in Java",
      "description": "Compact inline conditional expressions for clean value assignments.",
      "order": 2,
      "readTimeMinutes": 10,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-switch-statement",
      "moduleId": "java-module-3",
      "title": "Switch Statements & Modern Switch Expressions",
      "description": "Traditional switch with break vs modern arrow syntax (->) and yield keyword.",
      "order": 3,
      "readTimeMinutes": 16,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    },
    {
      "id": "java-while-loop",
      "moduleId": "java-module-3",
      "title": "The While Loop (Pre-Condition Loops)",
      "description": "Loop conditions, iteration counters, and avoiding infinite loops.",
      "order": 4,
      "readTimeMinutes": 12,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    },
    {
      "id": "java-do-while-loop",
      "moduleId": "java-module-3",
      "title": "The Do-While Loop (Post-Condition Loops)",
      "description": "Guaranteed at-least-once execution and menu driven console interactions.",
      "order": 5,
      "readTimeMinutes": 12,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    },
    {
      "id": "java-for-loop",
      "moduleId": "java-module-3",
      "title": "The Classic Counting For Loop",
      "description": "Initialization, condition, and step increment in a single statement header.",
      "order": 6,
      "readTimeMinutes": 14,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    },
    {
      "id": "java-enhanced-for",
      "moduleId": "java-module-3",
      "title": "The Enhanced For Loop (For-Each Traversal)",
      "description": "Traversing arrays and collections cleanly without manual index management.",
      "order": 7,
      "readTimeMinutes": 12,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    },
    {
      "id": "java-nested-loops",
      "moduleId": "java-module-3",
      "title": "Nested Loops and Multi-Dimensional Coordinates",
      "description": "Row-major matrix traversals, grid coordinate systems, and quadratic complexity.",
      "order": 8,
      "readTimeMinutes": 16,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    },
    {
      "id": "java-break-continue",
      "moduleId": "java-module-3",
      "title": "Loop Control: break, continue, and Labeled Statements",
      "description": "Early loop exits, skipping iterations, and breaking outer nested loops with labels.",
      "order": 9,
      "readTimeMinutes": 15,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    },
    {
      "id": "java-loops-practice",
      "moduleId": "java-module-3",
      "title": "Practical Problem Solving: FizzBuzz, Primes & Palindromes",
      "description": "Combining branching and iteration to solve classic interview programming challenges.",
      "order": 10,
      "readTimeMinutes": 20,
      "visualizerType": "control-flow",
      "difficulty": "Beginner"
    }
  ]
};

export const javaModule3Lessons: Record<string, JavaLessonContent> = {
  "java-if-else-branching": {
    "id": "java-if-else-branching",
    "moduleId": "java-module-3",
    "title": "If, Else-If, and Else Conditional Branching",
    "subtitle": "Decision Trees, Exclusive Code Paths, and Logical Evaluations",
    "order": 1,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master If, Else-If, and Else Conditional Branching.",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "If, Else-If, and Else Conditional Branching Metaphor",
      "text": "Like a train track switch: depending on which lever is pulled (true condition), the train is diverted onto one specific track, ignoring all other routes.",
      "metaphor": "Like a train track switch: depending on which lever is pulled (true condition), the train is diverted onto one specific track, ignoring all other routes."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind If, Else-If, and Else Conditional Branching.",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating If, Else-If, and Else Conditional Branching",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int score = 88;\n        char grade;\n\n        if (score >= 90) {\n            grade = 'A';\n        } else if (score >= 80) {\n            grade = 'B';\n        } else if (score >= 70) {\n            grade = 'C';\n        } else {\n            grade = 'F';\n        }\n\n        System.out.println(\"Final Grade: \" + grade);\n    }\n}",
      "explanation": "Examine the control flow of If, Else-If, and Else Conditional Branching."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int score = 88;\n        char grade;\n\n        if (score >= 90) {\n            grade = 'A';\n        } else if (score >= 80) {\n            grade = 'B';\n        } else if (score >= 70) {\n            grade = 'C';\n        } else {\n            grade = 'F';\n        }\n\n        System.out.println(\"Final Grade: \" + grade);\n    }\n}",
      "expectedOutput": "Final Grade: B"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using = (assignment) instead of == (equality comparison) in condition checks.",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-if-else-branching",
        "question": "Which block executes if all if and else-if conditions evaluate to false?",
        "answer": "The default else block",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-if-else-branching",
        "question": "Which block executes if all if and else-if conditions evaluate to false?",
        "options": [
          "The first if block",
          "The default else block",
          "The program crashes",
          "The compiler throws an error"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-if-else-branching",
      "title": "Exercise: If, Else-If, and Else Conditional Branching",
      "difficulty": "Beginner",
      "description": "Implement If, Else-If, and Else Conditional Branching to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int score = 88;\n        char grade;\n\n        if (score >= 90) {\n            grade = 'A';\n        } else if (score >= 80) {\n            grade = 'B';\n        } else if (score >= 70) {\n            grade = 'C';\n        } else {\n            grade = 'F';\n        }\n\n        System.out.println(\"Final Grade: \" + grade);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int score = 88;\n        char grade;\n\n        if (score >= 90) {\n            grade = 'A';\n        } else if (score >= 80) {\n            grade = 'B';\n        } else if (score >= 70) {\n            grade = 'C';\n        } else {\n            grade = 'F';\n        }\n\n        System.out.println(\"Final Grade: \" + grade);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered If, Else-If, and Else Conditional Branching.",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-ternary-operator",
      "nextLessonTitle": "The Ternary Operator (? :) in Java",
      "nextLessonModuleId": "java-module-3"
    }
  },
  "java-ternary-operator": {
    "id": "java-ternary-operator",
    "moduleId": "java-module-3",
    "title": "The Ternary Operator (? :) in Java",
    "subtitle": "Compact Conditional Expressions: condition ? valueIfTrue : valueIfFalse",
    "order": 2,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master The Ternary Operator (? :) in Java.",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "The Ternary Operator (? :) in Java Metaphor",
      "text": "A rapid two-way fork in the road: you pick the left path if green, right path if red, with no extra paperwork.",
      "metaphor": "A rapid two-way fork in the road: you pick the left path if green, right path if red, with no extra paperwork."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind The Ternary Operator (? :) in Java.",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The Ternary Operator (? :) in Java",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int age = 19;\n        String status = (age >= 18) ? \"Adult\" : \"Minor\";\n        System.out.println(\"Status: \" + status);\n\n        int max = (10 > 25) ? 10 : 25;\n        System.out.println(\"Maximum: \" + max);\n    }\n}",
      "explanation": "Examine the control flow of The Ternary Operator (? :) in Java."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int age = 19;\n        String status = (age >= 18) ? \"Adult\" : \"Minor\";\n        System.out.println(\"Status: \" + status);\n\n        int max = (10 > 25) ? 10 : 25;\n        System.out.println(\"Maximum: \" + max);\n    }\n}",
      "expectedOutput": "Status: Adult\\nMaximum: 25"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Nesting ternary operators deeply, resulting in unreadable 'spaghetti' code.",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-ternary-operator",
        "question": "What is the return type of (5 > 2 ? 10 : 20.5)?",
        "answer": "double (due to numeric promotion)",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-ternary-operator",
        "question": "What is the return type of (5 > 2 ? 10 : 20.5)?",
        "options": [
          "int",
          "double (due to numeric promotion)",
          "boolean",
          "compiler error"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-ternary-operator",
      "title": "Exercise: The Ternary Operator (? :) in Java",
      "difficulty": "Beginner",
      "description": "Implement The Ternary Operator (? :) in Java to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int age = 19;\n        String status = (age >= 18) ? \"Adult\" : \"Minor\";\n        System.out.println(\"Status: \" + status);\n\n        int max = (10 > 25) ? 10 : 25;\n        System.out.println(\"Maximum: \" + max);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int age = 19;\n        String status = (age >= 18) ? \"Adult\" : \"Minor\";\n        System.out.println(\"Status: \" + status);\n\n        int max = (10 > 25) ? 10 : 25;\n        System.out.println(\"Maximum: \" + max);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The Ternary Operator (? :) in Java.",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-switch-statement",
      "nextLessonTitle": "Switch Statements & Modern Switch Expressions",
      "nextLessonModuleId": "java-module-3"
    }
  },
  "java-switch-statement": {
    "id": "java-switch-statement",
    "moduleId": "java-module-3",
    "title": "Switch Statements & Modern Switch Expressions",
    "subtitle": "Multi-Way Branching, Fall-Through Pitfalls, and Java 14+ Arrow Syntax (->)",
    "order": 3,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master Switch Statements & Modern Switch Expressions.",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "Switch Statements & Modern Switch Expressions Metaphor",
      "text": "A hotel elevator with numbered floor buttons: press 3 and you go straight to floor 3 without stopping at floors 1 and 2.",
      "metaphor": "A hotel elevator with numbered floor buttons: press 3 and you go straight to floor 3 without stopping at floors 1 and 2."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind Switch Statements & Modern Switch Expressions.",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Switch Statements & Modern Switch Expressions",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int dayOfWeek = 3;\n\n        // Modern switch expression (Java 14+) with no break needed!\n        String dayName = switch (dayOfWeek) {\n            case 1 -> \"Monday\";\n            case 2 -> \"Tuesday\";\n            case 3 -> \"Wednesday\";\n            case 4 -> \"Thursday\";\n            case 5 -> \"Friday\";\n            default -> \"Weekend\";\n        };\n\n        System.out.println(\"Day 3 is: \" + dayName);\n    }\n}",
      "explanation": "Examine the control flow of Switch Statements & Modern Switch Expressions."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int dayOfWeek = 3;\n\n        // Modern switch expression (Java 14+) with no break needed!\n        String dayName = switch (dayOfWeek) {\n            case 1 -> \"Monday\";\n            case 2 -> \"Tuesday\";\n            case 3 -> \"Wednesday\";\n            case 4 -> \"Thursday\";\n            case 5 -> \"Friday\";\n            default -> \"Weekend\";\n        };\n\n        System.out.println(\"Day 3 is: \" + dayName);\n    }\n}",
      "expectedOutput": "Day 3 is: Wednesday"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting break in traditional switch statements, causing unintended 'fall-through' execution.",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-switch-statement",
        "question": "What is the main benefit of modern switch expressions using arrow syntax (->)?",
        "answer": "No manual 'break' is required and they can return a value directly",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-switch-statement",
        "question": "What is the main benefit of modern switch expressions using arrow syntax (->)?",
        "options": [
          "They execute twice as fast",
          "No manual 'break' is required and they can return a value directly",
          "They only work on strings",
          "They eliminate the default case"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-switch-statement",
      "title": "Exercise: Switch Statements & Modern Switch Expressions",
      "difficulty": "Beginner",
      "description": "Implement Switch Statements & Modern Switch Expressions to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int dayOfWeek = 3;\n\n        // Modern switch expression (Java 14+) with no break needed!\n        String dayName = switch (dayOfWeek) {\n            case 1 -> \"Monday\";\n            case 2 -> \"Tuesday\";\n            case 3 -> \"Wednesday\";\n            case 4 -> \"Thursday\";\n            case 5 -> \"Friday\";\n            default -> \"Weekend\";\n        };\n\n        System.out.println(\"Day 3 is: \" + dayName);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int dayOfWeek = 3;\n\n        // Modern switch expression (Java 14+) with no break needed!\n        String dayName = switch (dayOfWeek) {\n            case 1 -> \"Monday\";\n            case 2 -> \"Tuesday\";\n            case 3 -> \"Wednesday\";\n            case 4 -> \"Thursday\";\n            case 5 -> \"Friday\";\n            default -> \"Weekend\";\n        };\n\n        System.out.println(\"Day 3 is: \" + dayName);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Switch Statements & Modern Switch Expressions.",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-while-loop",
      "nextLessonTitle": "The While Loop (Pre-Condition Loops)",
      "nextLessonModuleId": "java-module-3"
    }
  },
  "java-while-loop": {
    "id": "java-while-loop",
    "moduleId": "java-module-3",
    "title": "The While Loop (Pre-Condition Loops)",
    "subtitle": "Executing Code as Long as a Boolean Condition Remains True",
    "order": 4,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master The While Loop (Pre-Condition Loops).",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "The While Loop (Pre-Condition Loops) Metaphor",
      "text": "Checking if you have enough gas in your car: before each mile, you check if gas > 0. If yes, you drive. If no, you stop immediately.",
      "metaphor": "Checking if you have enough gas in your car: before each mile, you check if gas > 0. If yes, you drive. If no, you stop immediately."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind The While Loop (Pre-Condition Loops).",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The While Loop (Pre-Condition Loops)",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int count = 1;\n        while (count <= 5) {\n            System.out.println(\"Iteration: \" + count);\n            count++; // Essential update step!\n        }\n        System.out.println(\"Loop finished successfully.\");\n    }\n}",
      "explanation": "Examine the control flow of The While Loop (Pre-Condition Loops)."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int count = 1;\n        while (count <= 5) {\n            System.out.println(\"Iteration: \" + count);\n            count++; // Essential update step!\n        }\n        System.out.println(\"Loop finished successfully.\");\n    }\n}",
      "expectedOutput": "Iteration: 1\\nIteration: 2\\nIteration: 3\\nIteration: 4\\nIteration: 5\\nLoop finished successfully."
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to update the loop condition variable inside the body, creating an infinite loop that freezes the thread.",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-while-loop",
        "question": "When is the condition in a while loop evaluated?",
        "answer": "Before each iteration of the body",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-while-loop",
        "question": "When is the condition in a while loop evaluated?",
        "options": [
          "After the body executes",
          "Before each iteration of the body",
          "Only once when entering the program",
          "At compile-time"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-while-loop",
      "title": "Exercise: The While Loop (Pre-Condition Loops)",
      "difficulty": "Beginner",
      "description": "Implement The While Loop (Pre-Condition Loops) to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int count = 1;\n        while (count <= 5) {\n            System.out.println(\"Iteration: \" + count);\n            count++; // Essential update step!\n        }\n        System.out.println(\"Loop finished successfully.\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int count = 1;\n        while (count <= 5) {\n            System.out.println(\"Iteration: \" + count);\n            count++; // Essential update step!\n        }\n        System.out.println(\"Loop finished successfully.\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The While Loop (Pre-Condition Loops).",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-do-while-loop",
      "nextLessonTitle": "The Do-While Loop (Post-Condition Loops)",
      "nextLessonModuleId": "java-module-3"
    }
  },
  "java-do-while-loop": {
    "id": "java-do-while-loop",
    "moduleId": "java-module-3",
    "title": "The Do-While Loop (Post-Condition Loops)",
    "subtitle": "Guaranteeing at Least One Execution Cycle Before Evaluating the Condition",
    "order": 5,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master The Do-While Loop (Post-Condition Loops).",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "The Do-While Loop (Post-Condition Loops) Metaphor",
      "text": "A 'taste before you buy' policy: you take a sip of coffee first, and then decide if you want to keep drinking.",
      "metaphor": "A 'taste before you buy' policy: you take a sip of coffee first, and then decide if you want to keep drinking."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind The Do-While Loop (Post-Condition Loops).",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The Do-While Loop (Post-Condition Loops)",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int number = 100;\n        // Condition is false immediately (100 < 5), but body still runs once!\n        do {\n            System.out.println(\"Guaranteed execution: number = \" + number);\n            number++;\n        } while (number < 5);\n\n        System.out.println(\"Exited do-while loop.\");\n    }\n}",
      "explanation": "Examine the control flow of The Do-While Loop (Post-Condition Loops)."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int number = 100;\n        // Condition is false immediately (100 < 5), but body still runs once!\n        do {\n            System.out.println(\"Guaranteed execution: number = \" + number);\n            number++;\n        } while (number < 5);\n\n        System.out.println(\"Exited do-while loop.\");\n    }\n}",
      "expectedOutput": "Guaranteed execution: number = 100\\nExited do-while loop."
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting the semicolon at the end of the while condition: do { ... } while (condition);",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-do-while-loop",
        "question": "What is the minimum number of times a do-while loop body will execute?",
        "answer": "1",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-do-while-loop",
        "question": "What is the minimum number of times a do-while loop body will execute?",
        "options": [
          "0",
          "1",
          "2",
          "Infinite"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-do-while-loop",
      "title": "Exercise: The Do-While Loop (Post-Condition Loops)",
      "difficulty": "Beginner",
      "description": "Implement The Do-While Loop (Post-Condition Loops) to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int number = 100;\n        // Condition is false immediately (100 < 5), but body still runs once!\n        do {\n            System.out.println(\"Guaranteed execution: number = \" + number);\n            number++;\n        } while (number < 5);\n\n        System.out.println(\"Exited do-while loop.\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int number = 100;\n        // Condition is false immediately (100 < 5), but body still runs once!\n        do {\n            System.out.println(\"Guaranteed execution: number = \" + number);\n            number++;\n        } while (number < 5);\n\n        System.out.println(\"Exited do-while loop.\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The Do-While Loop (Post-Condition Loops).",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-for-loop",
      "nextLessonTitle": "The Classic Counting For Loop",
      "nextLessonModuleId": "java-module-3"
    }
  },
  "java-for-loop": {
    "id": "java-for-loop",
    "moduleId": "java-module-3",
    "title": "The Classic Counting For Loop",
    "subtitle": "Initialization, Loop Condition, and Update Step in a Single Compact Header",
    "order": 6,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master The Classic Counting For Loop.",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "The Classic Counting For Loop Metaphor",
      "text": "A lap runner on a stadium track: start at lap 1, keep running while lap <= 5, and tick off one lap after each circuit.",
      "metaphor": "A lap runner on a stadium track: start at lap 1, keep running while lap <= 5, and tick off one lap after each circuit."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind The Classic Counting For Loop.",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The Classic Counting For Loop",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 5; i++) {\n            sum += i;\n            System.out.println(\"Step i=\" + i + \", running sum=\" + sum);\n        }\n        System.out.println(\"Final total: \" + sum);\n    }\n}",
      "explanation": "Examine the control flow of The Classic Counting For Loop."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 5; i++) {\n            sum += i;\n            System.out.println(\"Step i=\" + i + \", running sum=\" + sum);\n        }\n        System.out.println(\"Final total: \" + sum);\n    }\n}",
      "expectedOutput": "Step i=1, running sum=1\\nStep i=2, running sum=3\\nStep i=3, running sum=6\\nStep i=4, running sum=10\\nStep i=5, running sum=15\\nFinal total: 15"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Off-by-one errors (using < when <= is intended, or vice-versa).",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-for-loop",
        "question": "Which part of the for loop header executes only once?",
        "answer": "Initialization",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-for-loop",
        "question": "Which part of the for loop header executes only once?",
        "options": [
          "Condition",
          "Update expression",
          "Initialization",
          "The loop body"
        ],
        "correctIndex": 2,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-for-loop",
      "title": "Exercise: The Classic Counting For Loop",
      "difficulty": "Beginner",
      "description": "Implement The Classic Counting For Loop to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 5; i++) {\n            sum += i;\n            System.out.println(\"Step i=\" + i + \", running sum=\" + sum);\n        }\n        System.out.println(\"Final total: \" + sum);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 5; i++) {\n            sum += i;\n            System.out.println(\"Step i=\" + i + \", running sum=\" + sum);\n        }\n        System.out.println(\"Final total: \" + sum);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The Classic Counting For Loop.",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-enhanced-for",
      "nextLessonTitle": "The Enhanced For Loop (For-Each Traversal)",
      "nextLessonModuleId": "java-module-3"
    }
  },
  "java-enhanced-for": {
    "id": "java-enhanced-for",
    "moduleId": "java-module-3",
    "title": "The Enhanced For Loop (For-Each Traversal)",
    "subtitle": "Clean, Safe Iteration Over Arrays and Iterable Collections",
    "order": 7,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master The Enhanced For Loop (For-Each Traversal).",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "The Enhanced For Loop (For-Each Traversal) Metaphor",
      "text": "A conveyor belt inspector picking up each item as it passes, with no need to check an index counter.",
      "metaphor": "A conveyor belt inspector picking up each item as it passes, with no need to check an index counter."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind The Enhanced For Loop (For-Each Traversal).",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The Enhanced For Loop (For-Each Traversal)",
      "code": "public class Main {\n    public static void main(String[] args) {\n        String[] languages = {\"Java\", \"Kotlin\", \"Scala\", \"Clojure\"};\n\n        System.out.println(\"JVM Languages:\");\n        for (String lang : languages) {\n            System.out.println(\"- \" + lang);\n        }\n    }\n}",
      "explanation": "Examine the control flow of The Enhanced For Loop (For-Each Traversal)."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        String[] languages = {\"Java\", \"Kotlin\", \"Scala\", \"Clojure\"};\n\n        System.out.println(\"JVM Languages:\");\n        for (String lang : languages) {\n            System.out.println(\"- \" + lang);\n        }\n    }\n}",
      "expectedOutput": "JVM Languages:\\n- Java\\n- Kotlin\\n- Scala\\n- Clojure"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to modify the array or collection structure (remove items) inside an enhanced for-each loop.",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-enhanced-for",
        "question": "Can you get the current numerical index directly from an enhanced for-each loop syntax?",
        "answer": "No, you must track an external counter or use classic for",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-enhanced-for",
        "question": "Can you get the current numerical index directly from an enhanced for-each loop syntax?",
        "options": [
          "Yes, using index variable",
          "No, you must track an external counter or use classic for",
          "Yes, using this.index",
          "Yes, with the at() function"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-enhanced-for",
      "title": "Exercise: The Enhanced For Loop (For-Each Traversal)",
      "difficulty": "Beginner",
      "description": "Implement The Enhanced For Loop (For-Each Traversal) to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        String[] languages = {\"Java\", \"Kotlin\", \"Scala\", \"Clojure\"};\n\n        System.out.println(\"JVM Languages:\");\n        for (String lang : languages) {\n            System.out.println(\"- \" + lang);\n        }\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        String[] languages = {\"Java\", \"Kotlin\", \"Scala\", \"Clojure\"};\n\n        System.out.println(\"JVM Languages:\");\n        for (String lang : languages) {\n            System.out.println(\"- \" + lang);\n        }\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The Enhanced For Loop (For-Each Traversal).",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-nested-loops",
      "nextLessonTitle": "Nested Loops and Multi-Dimensional Coordinates",
      "nextLessonModuleId": "java-module-3"
    }
  },
  "java-nested-loops": {
    "id": "java-nested-loops",
    "moduleId": "java-module-3",
    "title": "Nested Loops and Multi-Dimensional Coordinates",
    "subtitle": "Iterating Over Rows and Columns in Grids, Matrices, and Patterns",
    "order": 8,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master Nested Loops and Multi-Dimensional Coordinates.",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "Nested Loops and Multi-Dimensional Coordinates Metaphor",
      "text": "The clock face: the minute hand must complete 60 ticks (inner loop) for every single tick of the hour hand (outer loop).",
      "metaphor": "The clock face: the minute hand must complete 60 ticks (inner loop) for every single tick of the hour hand (outer loop)."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind Nested Loops and Multi-Dimensional Coordinates.",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Nested Loops and Multi-Dimensional Coordinates",
      "code": "public class Main {\n    public static void main(String[] args) {\n        // Print a 3x4 multiplication grid\n        for (int row = 1; row <= 3; row++) {\n            for (int col = 1; col <= 4; col++) {\n                System.out.printf(\"%3d\", row * col);\n            }\n            System.out.println(); // Newline after each row\n        }\n    }\n}",
      "explanation": "Examine the control flow of Nested Loops and Multi-Dimensional Coordinates."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        // Print a 3x4 multiplication grid\n        for (int row = 1; row <= 3; row++) {\n            for (int col = 1; col <= 4; col++) {\n                System.out.printf(\"%3d\", row * col);\n            }\n            System.out.println(); // Newline after each row\n        }\n    }\n}",
      "expectedOutput": "  1  2  3  4\\n  2  4  6  8\\n  3  6  9 12"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidentally using the outer loop variable in the inner loop increment (e.g. i++ instead of j++).",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-nested-loops",
        "question": "If an outer loop runs 5 times and an inner loop runs 4 times, how many total times does the inner loop body run?",
        "answer": "20 times",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-nested-loops",
        "question": "If an outer loop runs 5 times and an inner loop runs 4 times, how many total times does the inner loop body run?",
        "options": [
          "9 times",
          "20 times",
          "5 times",
          "4 times"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-nested-loops",
      "title": "Exercise: Nested Loops and Multi-Dimensional Coordinates",
      "difficulty": "Beginner",
      "description": "Implement Nested Loops and Multi-Dimensional Coordinates to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Print a 3x4 multiplication grid\n        for (int row = 1; row <= 3; row++) {\n            for (int col = 1; col <= 4; col++) {\n                System.out.printf(\"%3d\", row * col);\n            }\n            System.out.println(); // Newline after each row\n        }\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        // Print a 3x4 multiplication grid\n        for (int row = 1; row <= 3; row++) {\n            for (int col = 1; col <= 4; col++) {\n                System.out.printf(\"%3d\", row * col);\n            }\n            System.out.println(); // Newline after each row\n        }\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Nested Loops and Multi-Dimensional Coordinates.",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-break-continue",
      "nextLessonTitle": "Loop Control: break, continue, and Labeled Statements",
      "nextLessonModuleId": "java-module-3"
    }
  },
  "java-break-continue": {
    "id": "java-break-continue",
    "moduleId": "java-module-3",
    "title": "Loop Control: break, continue, and Labeled Statements",
    "subtitle": "Terminating Loops Early, Bypassing Iterations, and Labeled Multi-Level Jumps",
    "order": 9,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master Loop Control: break, continue, and Labeled Statements.",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "Loop Control: break, continue, and Labeled Statements Metaphor",
      "text": "break is the fire alarm (evacuate the building immediately). continue is skipping a damaged item on the conveyor belt and moving directly to inspect the next one.",
      "metaphor": "break is the fire alarm (evacuate the building immediately). continue is skipping a damaged item on the conveyor belt and moving directly to inspect the next one."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind Loop Control: break, continue, and Labeled Statements.",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Loop Control: break, continue, and Labeled Statements",
      "code": "public class Main {\n    public static void main(String[] args) {\n        // continue skips odd numbers\n        System.out.print(\"Even numbers: \");\n        for (int i = 1; i <= 6; i++) {\n            if (i % 2 != 0) continue;\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n\n        // break exits immediately upon finding target\n        int target = 4;\n        for (int i = 1; i <= 10; i++) {\n            if (i == target) {\n                System.out.println(\"Found target \" + target + \"! Breaking.\");\n                break;\n            }\n        }\n    }\n}",
      "explanation": "Examine the control flow of Loop Control: break, continue, and Labeled Statements."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        // continue skips odd numbers\n        System.out.print(\"Even numbers: \");\n        for (int i = 1; i <= 6; i++) {\n            if (i % 2 != 0) continue;\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n\n        // break exits immediately upon finding target\n        int target = 4;\n        for (int i = 1; i <= 10; i++) {\n            if (i == target) {\n                System.out.println(\"Found target \" + target + \"! Breaking.\");\n                break;\n            }\n        }\n    }\n}",
      "expectedOutput": "Even numbers: 2 4 6 \\nFound target 4! Breaking."
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Putting code directly after break or continue in the same block, causing an 'unreachable statement' error.",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-break-continue",
        "question": "What does the continue statement do in a loop?",
        "answer": "Skips the rest of the current iteration and jumps to the next iteration",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-break-continue",
        "question": "What does the continue statement do in a loop?",
        "options": [
          "Terminates the entire loop",
          "Skips the rest of the current iteration and jumps to the next iteration",
          "Restarts the program",
          "Exits the method"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-break-continue",
      "title": "Exercise: Loop Control: break, continue, and Labeled Statements",
      "difficulty": "Beginner",
      "description": "Implement Loop Control: break, continue, and Labeled Statements to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // continue skips odd numbers\n        System.out.print(\"Even numbers: \");\n        for (int i = 1; i <= 6; i++) {\n            if (i % 2 != 0) continue;\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n\n        // break exits immediately upon finding target\n        int target = 4;\n        for (int i = 1; i <= 10; i++) {\n            if (i == target) {\n                System.out.println(\"Found target \" + target + \"! Breaking.\");\n                break;\n            }\n        }\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        // continue skips odd numbers\n        System.out.print(\"Even numbers: \");\n        for (int i = 1; i <= 6; i++) {\n            if (i % 2 != 0) continue;\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n\n        // break exits immediately upon finding target\n        int target = 4;\n        for (int i = 1; i <= 10; i++) {\n            if (i == target) {\n                System.out.println(\"Found target \" + target + \"! Breaking.\");\n                break;\n            }\n        }\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Loop Control: break, continue, and Labeled Statements.",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-loops-practice",
      "nextLessonTitle": "Practical Problem Solving: FizzBuzz, Primes & Palindromes",
      "nextLessonModuleId": "java-module-3"
    }
  },
  "java-loops-practice": {
    "id": "java-loops-practice",
    "moduleId": "java-module-3",
    "title": "Practical Problem Solving: FizzBuzz, Primes & Palindromes",
    "subtitle": "Classic Algorithmic Challenges Combining Conditionals, Loops, and State Flags",
    "order": 10,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "control-flow",
    "objectives": [
      "Master Practical Problem Solving: FizzBuzz, Primes & Palindromes.",
      "Understand loop control mechanics and branch evaluation.",
      "Trace variable states step by step."
    ],
    "prerequisites": [
      "Module 2: Variables and Data Types"
    ],
    "analogy": {
      "title": "Practical Problem Solving: FizzBuzz, Primes & Palindromes Metaphor",
      "text": "The classic programming interview rite of passage: filtering multiples using modulo checks in precise precedence order.",
      "metaphor": "The classic programming interview rite of passage: filtering multiples using modulo checks in precise precedence order."
    },
    "problemSolved": {
      "title": "Controlling Flow and Iteration in Software",
      "description": "Enables computers to make dynamic choices and process repetitive workloads efficiently.",
      "keyPoints": [
        "Deterministic decision branches",
        "High-throughput iteration",
        "Early exit controls"
      ]
    },
    "intuition": {
      "overview": "Step-by-step logic behind Practical Problem Solving: FizzBuzz, Primes & Palindromes.",
      "steps": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "Computes boolean expression."
        },
        {
          "step": 2,
          "title": "Execute Branch or Body",
          "description": "Runs matching block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Advances loop counter or terminates."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Practical Problem Solving: FizzBuzz, Primes & Palindromes",
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"FizzBuzz [1..15]:\");\n        for (int i = 1; i <= 15; i++) {\n            if (i % 15 == 0) {\n                System.out.print(\"FizzBuzz \");\n            } else if (i % 3 == 0) {\n                System.out.print(\"Fizz \");\n            } else if (i % 5 == 0) {\n                System.out.print(\"Buzz \");\n            } else {\n                System.out.print(i + \" \");\n            }\n        }\n        System.out.println();\n    }\n}",
      "explanation": "Examine the control flow of Practical Problem Solving: FizzBuzz, Primes & Palindromes."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"FizzBuzz [1..15]:\");\n        for (int i = 1; i <= 15; i++) {\n            if (i % 15 == 0) {\n                System.out.print(\"FizzBuzz \");\n            } else if (i % 3 == 0) {\n                System.out.print(\"Fizz \");\n            } else if (i % 5 == 0) {\n                System.out.print(\"Buzz \");\n            } else {\n                System.out.print(i + \" \");\n            }\n        }\n        System.out.println();\n    }\n}",
      "expectedOutput": "FizzBuzz [1..15]:\\n1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz "
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and entry point."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Control flow logic",
        "explanation": "Condition testing and loop advancement."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Checking i % 3 before i % 15, which prematurely prints Fizz for 15 instead of FizzBuzz.",
        "solution": "Follow structured control flow guidelines.",
        "whyWrong": "Improper condition logic causes infinite loops or skipped branches."
      }
    ],
    "bestPractices": [
      "Keep conditions clean and simple.",
      "Always ensure loop termination conditions are reachable."
    ],
    "applications": [
      {
        "industry": "Algorithm Engineering",
        "useCase": "Search, filter, and batch processing loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-loops-practice",
        "question": "Why must the condition (i % 15 == 0) be tested BEFORE (i % 3 == 0)?",
        "answer": "Because numbers divisible by 15 are also divisible by 3 and would trigger the wrong branch",
        "explanation": "Standard Java execution behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-loops-practice",
        "question": "Why must the condition (i % 15 == 0) be tested BEFORE (i % 3 == 0)?",
        "options": [
          "It executes faster",
          "Because numbers divisible by 15 are also divisible by 3 and would trigger the wrong branch",
          "Because 15 is larger than 3",
          "Java requires descending order in modulo"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-loops-practice",
      "title": "Exercise: Practical Problem Solving: FizzBuzz, Primes & Palindromes",
      "difficulty": "Beginner",
      "description": "Implement Practical Problem Solving: FizzBuzz, Primes & Palindromes to solve the specified control flow task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"FizzBuzz [1..15]:\");\n        for (int i = 1; i <= 15; i++) {\n            if (i % 15 == 0) {\n                System.out.print(\"FizzBuzz \");\n            } else if (i % 3 == 0) {\n                System.out.print(\"Fizz \");\n            } else if (i % 5 == 0) {\n                System.out.print(\"Buzz \");\n            } else {\n                System.out.print(i + \" \");\n            }\n        }\n        System.out.println();\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"FizzBuzz [1..15]:\");\n        for (int i = 1; i <= 15; i++) {\n            if (i % 15 == 0) {\n                System.out.print(\"FizzBuzz \");\n            } else if (i % 3 == 0) {\n                System.out.print(\"Fizz \");\n            } else if (i % 5 == 0) {\n                System.out.print(\"Buzz \");\n            } else {\n                System.out.print(i + \" \");\n            }\n        }\n        System.out.println();\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Practical Problem Solving: FizzBuzz, Primes & Palindromes.",
        "Understood loop and branching evaluation order.",
        "Ready for Arrays and Strings in Module 4."
      ],
      "nextLessonId": "java-arrays-1d",
      "nextLessonTitle": "Single-Dimensional Arrays in Java",
      "nextLessonModuleId": "java-module-4"
    }
  }
};
