import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const javaModule4Data: JavaModuleData = {
  "id": "java-module-4",
  "number": 4,
  "title": "Arrays and Strings",
  "subtitle": "1D Arrays, 2D Matrices, String Internals, StringBuilder & Algorithms",
  "description": "Master linear and multidimensional memory blocks in Java. Learn heap allocation of arrays, in-place traversals, utility sorting and binary searching, string manipulation, StringBuilder performance, and regex pattern matching.",
  "icon": "BarChart",
  "badge": "Data Structures",
  "estimatedHours": 9,
  "topicsCount": 10,
  "lessons": [
    {
      "id": "java-arrays-1d",
      "moduleId": "java-module-4",
      "title": "Single-Dimensional Arrays in Java",
      "description": "Array declaration, contiguous heap allocation, default initialization, and indexing.",
      "order": 1,
      "readTimeMinutes": 15,
      "visualizerType": "array-algorithm",
      "difficulty": "Beginner"
    },
    {
      "id": "java-array-traversal",
      "moduleId": "java-module-4",
      "title": "Array Traversals and In-Place Reversals",
      "description": "Forward and backward loops, two-pointer in-place array reversal, and min/max finding.",
      "order": 2,
      "readTimeMinutes": 15,
      "visualizerType": "array-algorithm",
      "difficulty": "Beginner"
    },
    {
      "id": "java-arrays-utility",
      "moduleId": "java-module-4",
      "title": "The java.util.Arrays Utility Class",
      "description": "Built-in sorting, binary searching, array copying, and deep string representations.",
      "order": 3,
      "readTimeMinutes": 14,
      "visualizerType": "array-algorithm",
      "difficulty": "Beginner"
    },
    {
      "id": "java-2d-matrices",
      "moduleId": "java-module-4",
      "title": "Multidimensional Arrays (2D Matrices & Grids)",
      "description": "Rows and columns, matrix addition, and nested traversal loops.",
      "order": 4,
      "readTimeMinutes": 16,
      "visualizerType": "array-algorithm",
      "difficulty": "Beginner"
    },
    {
      "id": "java-jagged-arrays",
      "moduleId": "java-module-4",
      "title": "Jagged (Ragged) Arrays in Java",
      "description": "Arrays of arrays with non-uniform row lengths and dynamic row allocation.",
      "order": 5,
      "readTimeMinutes": 14,
      "visualizerType": "array-algorithm",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-string-methods",
      "moduleId": "java-module-4",
      "title": "String Class Internals & Essential Methods",
      "description": "length, charAt, substring, indexOf, toLowerCase, and trim.",
      "order": 6,
      "readTimeMinutes": 15,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-string-equality",
      "moduleId": "java-module-4",
      "title": "String Equality: == vs .equals() vs compareTo()",
      "description": "Memory reference identity vs character content equality and lexicographic sorting.",
      "order": 7,
      "readTimeMinutes": 14,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "java-stringbuilder",
      "moduleId": "java-module-4",
      "title": "StringBuilder vs StringBuffer vs String",
      "description": "Mutable char buffers, append efficiency, and preventing quadratic memory churn.",
      "order": 8,
      "readTimeMinutes": 16,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "java-regex-patterns",
      "moduleId": "java-module-4",
      "title": "Regular Expressions & Pattern Matching",
      "description": "Validating emails, phone numbers, splitting tokens, and String.replaceAll.",
      "order": 9,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-string-algorithms",
      "moduleId": "java-module-4",
      "title": "Practical String Algorithms: Palindromes & Anagrams",
      "description": "Frequency counting, string normalization, and two-pointer validation.",
      "order": 10,
      "readTimeMinutes": 18,
      "visualizerType": "array-algorithm",
      "difficulty": "Intermediate"
    }
  ]
};

export const javaModule4Lessons: Record<string, JavaLessonContent> = {
  "java-arrays-1d": {
    "id": "java-arrays-1d",
    "moduleId": "java-module-4",
    "title": "Single-Dimensional Arrays in Java",
    "subtitle": "Contiguous Heap Memory, Zero-Based Indexing, and Array Bounds Checking",
    "order": 1,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "array-algorithm",
    "objectives": [
      "Master Single-Dimensional Arrays in Java.",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "Single-Dimensional Arrays in Java Metaphor",
      "text": "An apartment building with numbered mailboxes [0], [1], [2], [3] all in a single row. The building has a fixed size from the moment it is built.",
      "metaphor": "An apartment building with numbered mailboxes [0], [1], [2], [3] all in a single row. The building has a fixed size from the moment it is built."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Single-Dimensional Arrays in Java.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Single-Dimensional Arrays in Java",
      "code": "public class Main {\n    public static void main(String[] args) {\n        // Declare and allocate array of size 4\n        int[] scores = new int[4];\n        scores[0] = 95;\n        scores[1] = 82;\n        scores[2] = 88;\n        scores[3] = 91;\n\n        System.out.println(\"Array Length: \" + scores.length);\n        System.out.println(\"First element: \" + scores[0]);\n        System.out.println(\"Last element: \" + scores[scores.length - 1]);\n    }\n}",
      "explanation": "Examine the implementation of Single-Dimensional Arrays in Java."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        // Declare and allocate array of size 4\n        int[] scores = new int[4];\n        scores[0] = 95;\n        scores[1] = 82;\n        scores[2] = 88;\n        scores[3] = 91;\n\n        System.out.println(\"Array Length: \" + scores.length);\n        System.out.println(\"First element: \" + scores[0]);\n        System.out.println(\"Last element: \" + scores[scores.length - 1]);\n    }\n}",
      "expectedOutput": "Array Length: 4\\nFirst element: 95\\nLast element: 91"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accessing index scores[scores.length], which throws an ArrayIndexOutOfBoundsException.",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-arrays-1d",
        "question": "What is the default value of elements in a newly allocated int[] array in Java?",
        "answer": "0",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-arrays-1d",
        "question": "What is the default value of elements in a newly allocated int[] array in Java?",
        "options": [
          "null",
          "0",
          "garbage memory",
          "-1"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-arrays-1d",
      "title": "Exercise: Single-Dimensional Arrays in Java",
      "difficulty": "Beginner",
      "description": "Write a program that uses Single-Dimensional Arrays in Java to complete the task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Declare and allocate array of size 4\n        int[] scores = new int[4];\n        scores[0] = 95;\n        scores[1] = 82;\n        scores[2] = 88;\n        scores[3] = 91;\n\n        System.out.println(\"Array Length: \" + scores.length);\n        System.out.println(\"First element: \" + scores[0]);\n        System.out.println(\"Last element: \" + scores[scores.length - 1]);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        // Declare and allocate array of size 4\n        int[] scores = new int[4];\n        scores[0] = 95;\n        scores[1] = 82;\n        scores[2] = 88;\n        scores[3] = 91;\n\n        System.out.println(\"Array Length: \" + scores.length);\n        System.out.println(\"First element: \" + scores[0]);\n        System.out.println(\"Last element: \" + scores[scores.length - 1]);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Single-Dimensional Arrays in Java.",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-array-traversal",
      "nextLessonTitle": "Array Traversals and In-Place Reversals",
      "nextLessonModuleId": "java-module-4"
    }
  },
  "java-array-traversal": {
    "id": "java-array-traversal",
    "moduleId": "java-module-4",
    "title": "Array Traversals and In-Place Reversals",
    "subtitle": "Iterating Forward, Backward, and Reversing Elements with Two Pointers",
    "order": 2,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "array-algorithm",
    "objectives": [
      "Master Array Traversals and In-Place Reversals.",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "Array Traversals and In-Place Reversals Metaphor",
      "text": "Two people standing at opposite ends of a row of chairs, walking toward the center and swapping seats as they meet.",
      "metaphor": "Two people standing at opposite ends of a row of chairs, walking toward the center and swapping seats as they meet."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Array Traversals and In-Place Reversals.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Array Traversals and In-Place Reversals",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n\n        // In-place two-pointer reversal\n        int left = 0;\n        int right = arr.length - 1;\n        while (left < right) {\n            int temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;\n            left++;\n            right--;\n        }\n\n        System.out.print(\"Reversed array: \");\n        for (int num : arr) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n    }\n}",
      "explanation": "Examine the implementation of Array Traversals and In-Place Reversals."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n\n        // In-place two-pointer reversal\n        int left = 0;\n        int right = arr.length - 1;\n        while (left < right) {\n            int temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;\n            left++;\n            right--;\n        }\n\n        System.out.print(\"Reversed array: \");\n        for (int num : arr) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n    }\n}",
      "expectedOutput": "Reversed array: 5 4 3 2 1 "
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Allocating a brand new array when an in-place swap can achieve O(1) auxiliary space.",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-array-traversal",
        "question": "What is the time complexity of reversing an array of size n in-place?",
        "answer": "O(n)",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-array-traversal",
        "question": "What is the time complexity of reversing an array of size n in-place?",
        "options": [
          "O(n^2)",
          "O(n)",
          "O(log n)",
          "O(1)"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-array-traversal",
      "title": "Exercise: Array Traversals and In-Place Reversals",
      "difficulty": "Beginner",
      "description": "Write a program that uses Array Traversals and In-Place Reversals to complete the task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n\n        // In-place two-pointer reversal\n        int left = 0;\n        int right = arr.length - 1;\n        while (left < right) {\n            int temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;\n            left++;\n            right--;\n        }\n\n        System.out.print(\"Reversed array: \");\n        for (int num : arr) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n\n        // In-place two-pointer reversal\n        int left = 0;\n        int right = arr.length - 1;\n        while (left < right) {\n            int temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;\n            left++;\n            right--;\n        }\n\n        System.out.print(\"Reversed array: \");\n        for (int num : arr) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Array Traversals and In-Place Reversals.",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-arrays-utility",
      "nextLessonTitle": "The java.util.Arrays Utility Class",
      "nextLessonModuleId": "java-module-4"
    }
  },
  "java-arrays-utility": {
    "id": "java-arrays-utility",
    "moduleId": "java-module-4",
    "title": "The java.util.Arrays Utility Class",
    "subtitle": "High-Performance Dual-Pivot Quicksort, Binary Search, and Printable Formatting",
    "order": 3,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "array-algorithm",
    "objectives": [
      "Master The java.util.Arrays Utility Class.",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "The java.util.Arrays Utility Class Metaphor",
      "text": "A master organizer who sorts files alphabetically so you can use binary search (flipping to the middle of the phonebook) in seconds.",
      "metaphor": "A master organizer who sorts files alphabetically so you can use binary search (flipping to the middle of the phonebook) in seconds."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind The java.util.Arrays Utility Class.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The java.util.Arrays Utility Class",
      "code": "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] numbers = {45, 12, 85, 32, 10};\n\n        // Sort ascending\n        Arrays.sort(numbers);\n        System.out.println(\"Sorted: \" + Arrays.toString(numbers));\n\n        // Binary search on sorted array\n        int index = Arrays.binarySearch(numbers, 32);\n        System.out.println(\"Found 32 at index: \" + index);\n    }\n}",
      "explanation": "Examine the implementation of The java.util.Arrays Utility Class."
    },
    "runnableCode": {
      "code": "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] numbers = {45, 12, 85, 32, 10};\n\n        // Sort ascending\n        Arrays.sort(numbers);\n        System.out.println(\"Sorted: \" + Arrays.toString(numbers));\n\n        // Binary search on sorted array\n        int index = Arrays.binarySearch(numbers, 32);\n        System.out.println(\"Found 32 at index: \" + index);\n    }\n}",
      "expectedOutput": "Sorted: [10, 12, 32, 45, 85]\\nFound 32 at index: 2"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Calling Arrays.binarySearch on an unsorted array, which produces unpredictable negative results.",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-arrays-utility",
        "question": "What must be true before calling Arrays.binarySearch() on an array?",
        "answer": "Array must be sorted in ascending order",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-arrays-utility",
        "question": "What must be true before calling Arrays.binarySearch() on an array?",
        "options": [
          "Array must be empty",
          "Array must be sorted in ascending order",
          "Array must contain only unique values",
          "Array must be primitive double"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-arrays-utility",
      "title": "Exercise: The java.util.Arrays Utility Class",
      "difficulty": "Beginner",
      "description": "Write a program that uses The java.util.Arrays Utility Class to complete the task.",
      "starterCode": "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] numbers = {45, 12, 85, 32, 10};\n\n        // Sort ascending\n        Arrays.sort(numbers);\n        System.out.println(\"Sorted: \" + Arrays.toString(numbers));\n\n        // Binary search on sorted array\n        int index = Arrays.binarySearch(numbers, 32);\n        System.out.println(\"Found 32 at index: \" + index);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] numbers = {45, 12, 85, 32, 10};\n\n        // Sort ascending\n        Arrays.sort(numbers);\n        System.out.println(\"Sorted: \" + Arrays.toString(numbers));\n\n        // Binary search on sorted array\n        int index = Arrays.binarySearch(numbers, 32);\n        System.out.println(\"Found 32 at index: \" + index);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The java.util.Arrays Utility Class.",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-2d-matrices",
      "nextLessonTitle": "Multidimensional Arrays (2D Matrices & Grids)",
      "nextLessonModuleId": "java-module-4"
    }
  },
  "java-2d-matrices": {
    "id": "java-2d-matrices",
    "moduleId": "java-module-4",
    "title": "Multidimensional Arrays (2D Matrices & Grids)",
    "subtitle": "Tabular Grids, Row-Major Indexing: matrix[row][col]",
    "order": 4,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "array-algorithm",
    "objectives": [
      "Master Multidimensional Arrays (2D Matrices & Grids).",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "Multidimensional Arrays (2D Matrices & Grids) Metaphor",
      "text": "A chessboard or Excel spreadsheet with rows (horizontal) and columns (vertical).",
      "metaphor": "A chessboard or Excel spreadsheet with rows (horizontal) and columns (vertical)."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Multidimensional Arrays (2D Matrices & Grids).",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Multidimensional Arrays (2D Matrices & Grids)",
      "code": "public class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n\n        System.out.println(\"Center element [1][1]: \" + matrix[1][1]);\n        System.out.println(\"Matrix dimensions: \" + matrix.length + \"x\" + matrix[0].length);\n    }\n}",
      "explanation": "Examine the implementation of Multidimensional Arrays (2D Matrices & Grids)."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n\n        System.out.println(\"Center element [1][1]: \" + matrix[1][1]);\n        System.out.println(\"Matrix dimensions: \" + matrix.length + \"x\" + matrix[0].length);\n    }\n}",
      "expectedOutput": "Center element [1][1]: 5\\nMatrix dimensions: 3x3"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Inverting row and column coordinates: matrix[col][row] instead of matrix[row][col].",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-2d-matrices",
        "question": "How do you access the element in the 3rd row and 2nd column of matrix?",
        "answer": "matrix[2][1]",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-2d-matrices",
        "question": "How do you access the element in the 3rd row and 2nd column of matrix?",
        "options": [
          "matrix[3][2]",
          "matrix[2][1]",
          "matrix[1][2]",
          "matrix(2, 1)"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-2d-matrices",
      "title": "Exercise: Multidimensional Arrays (2D Matrices & Grids)",
      "difficulty": "Beginner",
      "description": "Write a program that uses Multidimensional Arrays (2D Matrices & Grids) to complete the task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n\n        System.out.println(\"Center element [1][1]: \" + matrix[1][1]);\n        System.out.println(\"Matrix dimensions: \" + matrix.length + \"x\" + matrix[0].length);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n\n        System.out.println(\"Center element [1][1]: \" + matrix[1][1]);\n        System.out.println(\"Matrix dimensions: \" + matrix.length + \"x\" + matrix[0].length);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Multidimensional Arrays (2D Matrices & Grids).",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-jagged-arrays",
      "nextLessonTitle": "Jagged (Ragged) Arrays in Java",
      "nextLessonModuleId": "java-module-4"
    }
  },
  "java-jagged-arrays": {
    "id": "java-jagged-arrays",
    "moduleId": "java-module-4",
    "title": "Jagged (Ragged) Arrays in Java",
    "subtitle": "Arrays of Arrays with Varying Row Lengths",
    "order": 5,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "array-algorithm",
    "objectives": [
      "Master Jagged (Ragged) Arrays in Java.",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "Jagged (Ragged) Arrays in Java Metaphor",
      "text": "A pyramid bookshelf where the top shelf only holds 1 book, the middle holds 2, and the bottom holds 3.",
      "metaphor": "A pyramid bookshelf where the top shelf only holds 1 book, the middle holds 2, and the bottom holds 3."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Jagged (Ragged) Arrays in Java.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Jagged (Ragged) Arrays in Java",
      "code": "public class Main {\n    public static void main(String[] args) {\n        // Allocate ragged array where rows have different lengths\n        int[][] jagged = new int[3][];\n        jagged[0] = new int[]{1};\n        jagged[1] = new int[]{2, 3};\n        jagged[2] = new int[]{4, 5, 6};\n\n        System.out.println(\"Row 0 length: \" + jagged[0].length);\n        System.out.println(\"Row 1 length: \" + jagged[1].length);\n        System.out.println(\"Row 2 length: \" + jagged[2].length);\n    }\n}",
      "explanation": "Examine the implementation of Jagged (Ragged) Arrays in Java."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        // Allocate ragged array where rows have different lengths\n        int[][] jagged = new int[3][];\n        jagged[0] = new int[]{1};\n        jagged[1] = new int[]{2, 3};\n        jagged[2] = new int[]{4, 5, 6};\n\n        System.out.println(\"Row 0 length: \" + jagged[0].length);\n        System.out.println(\"Row 1 length: \" + jagged[1].length);\n        System.out.println(\"Row 2 length: \" + jagged[2].length);\n    }\n}",
      "expectedOutput": "Row 0 length: 1\\nRow 1 length: 2\\nRow 2 length: 3"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accessing jagged[i][j] before allocating jagged[i], causing a NullPointerException.",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-jagged-arrays",
        "question": "In Java, what is a 2D array under the hood?",
        "answer": "An array of references to other independent 1D array objects",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-jagged-arrays",
        "question": "In Java, what is a 2D array under the hood?",
        "options": [
          "A single contiguous 1D memory buffer",
          "An array of references to other independent 1D array objects",
          "A matrix struct",
          "A pointer table in C"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-jagged-arrays",
      "title": "Exercise: Jagged (Ragged) Arrays in Java",
      "difficulty": "Beginner",
      "description": "Write a program that uses Jagged (Ragged) Arrays in Java to complete the task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Allocate ragged array where rows have different lengths\n        int[][] jagged = new int[3][];\n        jagged[0] = new int[]{1};\n        jagged[1] = new int[]{2, 3};\n        jagged[2] = new int[]{4, 5, 6};\n\n        System.out.println(\"Row 0 length: \" + jagged[0].length);\n        System.out.println(\"Row 1 length: \" + jagged[1].length);\n        System.out.println(\"Row 2 length: \" + jagged[2].length);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        // Allocate ragged array where rows have different lengths\n        int[][] jagged = new int[3][];\n        jagged[0] = new int[]{1};\n        jagged[1] = new int[]{2, 3};\n        jagged[2] = new int[]{4, 5, 6};\n\n        System.out.println(\"Row 0 length: \" + jagged[0].length);\n        System.out.println(\"Row 1 length: \" + jagged[1].length);\n        System.out.println(\"Row 2 length: \" + jagged[2].length);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Jagged (Ragged) Arrays in Java.",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-string-methods",
      "nextLessonTitle": "String Class Internals & Essential Methods",
      "nextLessonModuleId": "java-module-4"
    }
  },
  "java-string-methods": {
    "id": "java-string-methods",
    "moduleId": "java-module-4",
    "title": "String Class Internals & Essential Methods",
    "subtitle": "Exploring charAt, substring, indexOf, toUpperCase, and trim",
    "order": 6,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "array-algorithm",
    "objectives": [
      "Master String Class Internals & Essential Methods.",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "String Class Internals & Essential Methods Metaphor",
      "text": "A high-precision Swiss army knife for text analysis: measuring, slicing, cleaning whitespace, and finding keywords.",
      "metaphor": "A high-precision Swiss army knife for text analysis: measuring, slicing, cleaning whitespace, and finding keywords."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind String Class Internals & Essential Methods.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating String Class Internals & Essential Methods",
      "code": "public class Main {\n    public static void main(String[] args) {\n        String text = \"  Learn Java Programming  \";\n        String clean = text.trim();\n\n        System.out.println(\"Length: \" + clean.length());\n        System.out.println(\"Character at 0: \" + clean.charAt(0));\n        System.out.println(\"Substring [6..10]: '\" + clean.substring(6, 10) + \"'\");\n        System.out.println(\"Index of 'Java': \" + clean.indexOf(\"Java\"));\n    }\n}",
      "explanation": "Examine the implementation of String Class Internals & Essential Methods."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        String text = \"  Learn Java Programming  \";\n        String clean = text.trim();\n\n        System.out.println(\"Length: \" + clean.length());\n        System.out.println(\"Character at 0: \" + clean.charAt(0));\n        System.out.println(\"Substring [6..10]: '\" + clean.substring(6, 10) + \"'\");\n        System.out.println(\"Index of 'Java': \" + clean.indexOf(\"Java\"));\n    }\n}",
      "expectedOutput": "Length: 22\\nCharacter at 0: L\\nSubstring [6..10]: 'Java'\\nIndex of 'Java': 6"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Remembering that substring(start, end) includes start but EXCLUDES end.",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-string-methods",
        "question": "What does text.substring(0, 3) return for text = \"Java\"?",
        "answer": "\"Jav\"",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-string-methods",
        "question": "What does text.substring(0, 3) return for text = \"Java\"?",
        "options": [
          "\"Java\"",
          "\"Jav\"",
          "\"av\"",
          "\"J\""
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-string-methods",
      "title": "Exercise: String Class Internals & Essential Methods",
      "difficulty": "Beginner",
      "description": "Write a program that uses String Class Internals & Essential Methods to complete the task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        String text = \"  Learn Java Programming  \";\n        String clean = text.trim();\n\n        System.out.println(\"Length: \" + clean.length());\n        System.out.println(\"Character at 0: \" + clean.charAt(0));\n        System.out.println(\"Substring [6..10]: '\" + clean.substring(6, 10) + \"'\");\n        System.out.println(\"Index of 'Java': \" + clean.indexOf(\"Java\"));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        String text = \"  Learn Java Programming  \";\n        String clean = text.trim();\n\n        System.out.println(\"Length: \" + clean.length());\n        System.out.println(\"Character at 0: \" + clean.charAt(0));\n        System.out.println(\"Substring [6..10]: '\" + clean.substring(6, 10) + \"'\");\n        System.out.println(\"Index of 'Java': \" + clean.indexOf(\"Java\"));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered String Class Internals & Essential Methods.",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-string-equality",
      "nextLessonTitle": "String Equality: == vs .equals() vs compareTo()",
      "nextLessonModuleId": "java-module-4"
    }
  },
  "java-string-equality": {
    "id": "java-string-equality",
    "moduleId": "java-module-4",
    "title": "String Equality: == vs .equals() vs compareTo()",
    "subtitle": "Identity Comparison vs Content Comparison vs Lexicographical Sorting",
    "order": 7,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "memory-model",
    "objectives": [
      "Master String Equality: == vs .equals() vs compareTo().",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "String Equality: == vs .equals() vs compareTo() Metaphor",
      "text": "Two identical paperback copies of the same novel: == checks if they are the exact same physical copy in your hand (false). .equals() checks if the text inside the books matches word for word (true).",
      "metaphor": "Two identical paperback copies of the same novel: == checks if they are the exact same physical copy in your hand (false). .equals() checks if the text inside the books matches word for word (true)."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind String Equality: == vs .equals() vs compareTo().",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating String Equality: == vs .equals() vs compareTo()",
      "code": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Apple\");\n        String b = new String(\"Apple\");\n\n        System.out.println(\"a == b (Memory Address): \" + (a == b));\n        System.out.println(\"a.equals(b) (Characters): \" + a.equals(b));\n        System.out.println(\"a.compareTo(\"Banana\"): \" + a.compareTo(\"Banana\")); // Negative because A < B\n    }\n}",
      "explanation": "Examine the implementation of String Equality: == vs .equals() vs compareTo()."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Apple\");\n        String b = new String(\"Apple\");\n\n        System.out.println(\"a == b (Memory Address): \" + (a == b));\n        System.out.println(\"a.equals(b) (Characters): \" + a.equals(b));\n        System.out.println(\"a.compareTo(\"Banana\"): \" + a.compareTo(\"Banana\")); // Negative because A < B\n    }\n}",
      "expectedOutput": "a == b (Memory Address): false\\na.equals(b) (Characters): true\\na.compareTo(\"Banana\"): -1"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using == in if-conditions to compare string text.",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-string-equality",
        "question": "What does str1.compareTo(str2) return if str1 is lexicographically smaller than str2?",
        "answer": "A negative integer",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-string-equality",
        "question": "What does str1.compareTo(str2) return if str1 is lexicographically smaller than str2?",
        "options": [
          "A positive integer",
          "Zero",
          "A negative integer",
          "false"
        ],
        "correctIndex": 2,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-string-equality",
      "title": "Exercise: String Equality: == vs .equals() vs compareTo()",
      "difficulty": "Beginner",
      "description": "Write a program that uses String Equality: == vs .equals() vs compareTo() to complete the task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Apple\");\n        String b = new String(\"Apple\");\n\n        System.out.println(\"a == b (Memory Address): \" + (a == b));\n        System.out.println(\"a.equals(b) (Characters): \" + a.equals(b));\n        System.out.println(\"a.compareTo(\"Banana\"): \" + a.compareTo(\"Banana\")); // Negative because A < B\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Apple\");\n        String b = new String(\"Apple\");\n\n        System.out.println(\"a == b (Memory Address): \" + (a == b));\n        System.out.println(\"a.equals(b) (Characters): \" + a.equals(b));\n        System.out.println(\"a.compareTo(\"Banana\"): \" + a.compareTo(\"Banana\")); // Negative because A < B\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered String Equality: == vs .equals() vs compareTo().",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-stringbuilder",
      "nextLessonTitle": "StringBuilder vs StringBuffer vs String",
      "nextLessonModuleId": "java-module-4"
    }
  },
  "java-stringbuilder": {
    "id": "java-stringbuilder",
    "moduleId": "java-module-4",
    "title": "StringBuilder vs StringBuffer vs String",
    "subtitle": "High-Speed Mutable Character Sequences without Heap Allocation Thrashing",
    "order": 8,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "memory-model",
    "objectives": [
      "Master StringBuilder vs StringBuffer vs String.",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "StringBuilder vs StringBuffer vs String Metaphor",
      "text": "A dry-erase whiteboard (StringBuilder) where you can add, insert, or erase words in-place, compared to printing a new sheet of paper for every single letter added (String concatenation).",
      "metaphor": "A dry-erase whiteboard (StringBuilder) where you can add, insert, or erase words in-place, compared to printing a new sheet of paper for every single letter added (String concatenation)."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind StringBuilder vs StringBuffer vs String.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating StringBuilder vs StringBuffer vs String",
      "code": "public class Main {\n    public static void main(String[] args) {\n        // StringBuilder modifies character buffer in-place\n        StringBuilder sb = new StringBuilder(\"Java\");\n        sb.append(\" Mastery\");\n        sb.append(\" Lab\");\n        sb.insert(4, \" 17\");\n\n        System.out.println(\"Result: \" + sb.toString());\n        System.out.println(\"Reversed: \" + sb.reverse().toString());\n    }\n}",
      "explanation": "Examine the implementation of StringBuilder vs StringBuffer vs String."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        // StringBuilder modifies character buffer in-place\n        StringBuilder sb = new StringBuilder(\"Java\");\n        sb.append(\" Mastery\");\n        sb.append(\" Lab\");\n        sb.insert(4, \" 17\");\n\n        System.out.println(\"Result: \" + sb.toString());\n        System.out.println(\"Reversed: \" + sb.reverse().toString());\n    }\n}",
      "expectedOutput": "Result: Java 17 Mastery Lab\\nReversed: baL yretsaM 71 avaJ"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Concatenating strings inside a heavy loop using '+' operator, which creates O(n^2) garbage objects on the Heap.",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-stringbuilder",
        "question": "Why is StringBuilder preferred over StringBuffer in single-threaded environments?",
        "answer": "It is not synchronized, making it significantly faster",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-stringbuilder",
        "question": "Why is StringBuilder preferred over StringBuffer in single-threaded environments?",
        "options": [
          "It has more methods",
          "It is not synchronized, making it significantly faster",
          "It uses less memory per character",
          "It supports emojis"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-stringbuilder",
      "title": "Exercise: StringBuilder vs StringBuffer vs String",
      "difficulty": "Beginner",
      "description": "Write a program that uses StringBuilder vs StringBuffer vs String to complete the task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // StringBuilder modifies character buffer in-place\n        StringBuilder sb = new StringBuilder(\"Java\");\n        sb.append(\" Mastery\");\n        sb.append(\" Lab\");\n        sb.insert(4, \" 17\");\n\n        System.out.println(\"Result: \" + sb.toString());\n        System.out.println(\"Reversed: \" + sb.reverse().toString());\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        // StringBuilder modifies character buffer in-place\n        StringBuilder sb = new StringBuilder(\"Java\");\n        sb.append(\" Mastery\");\n        sb.append(\" Lab\");\n        sb.insert(4, \" 17\");\n\n        System.out.println(\"Result: \" + sb.toString());\n        System.out.println(\"Reversed: \" + sb.reverse().toString());\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered StringBuilder vs StringBuffer vs String.",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-regex-patterns",
      "nextLessonTitle": "Regular Expressions & Pattern Matching",
      "nextLessonModuleId": "java-module-4"
    }
  },
  "java-regex-patterns": {
    "id": "java-regex-patterns",
    "moduleId": "java-module-4",
    "title": "Regular Expressions & Pattern Matching",
    "subtitle": "Validating Formats, Extracting Tokens, and Text Transformations",
    "order": 9,
    "readTimeMinutes": 15,
    "difficulty": "Intermediate",
    "visualizerType": "array-algorithm",
    "objectives": [
      "Master Regular Expressions & Pattern Matching.",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "Regular Expressions & Pattern Matching Metaphor",
      "text": "A passport scanner at border control checking if the barcode strictly matches the official national security format pattern.",
      "metaphor": "A passport scanner at border control checking if the barcode strictly matches the official national security format pattern."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Regular Expressions & Pattern Matching.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Regular Expressions & Pattern Matching",
      "code": "public class Main {\n    public static void main(String[] args) {\n        String email = \"student@javalab.org\";\n        boolean isValid = email.matches(\"^[\\\\w.-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,6}$\");\n        System.out.println(\"Is valid email: \" + isValid);\n\n        String text = \"Java101Python202Rust303\";\n        String[] words = text.split(\"\\\\d+\");\n        System.out.println(\"Extracted: \" + java.util.Arrays.toString(words));\n    }\n}",
      "explanation": "Examine the implementation of Regular Expressions & Pattern Matching."
    },
    "runnableCode": {
      "code": "public class Main {\n    public static void main(String[] args) {\n        String email = \"student@javalab.org\";\n        boolean isValid = email.matches(\"^[\\\\w.-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,6}$\");\n        System.out.println(\"Is valid email: \" + isValid);\n\n        String text = \"Java101Python202Rust303\";\n        String[] words = text.split(\"\\\\d+\");\n        System.out.println(\"Extracted: \" + java.util.Arrays.toString(words));\n    }\n}",
      "expectedOutput": "Is valid email: true\\nExtracted: [Java, Python, Rust]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to double-escape backslashes in Java regex strings (e.g. \\\\d instead of \\d).",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-regex-patterns",
        "question": "What regex character class matches one or more digits in Java?",
        "answer": "\\\\d+",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-regex-patterns",
        "question": "What regex character class matches one or more digits in Java?",
        "options": [
          "\\d*",
          "\\\\d+",
          "\\num",
          "[0-9]?"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-regex-patterns",
      "title": "Exercise: Regular Expressions & Pattern Matching",
      "difficulty": "Beginner",
      "description": "Write a program that uses Regular Expressions & Pattern Matching to complete the task.",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        String email = \"student@javalab.org\";\n        boolean isValid = email.matches(\"^[\\\\w.-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,6}$\");\n        System.out.println(\"Is valid email: \" + isValid);\n\n        String text = \"Java101Python202Rust303\";\n        String[] words = text.split(\"\\\\d+\");\n        System.out.println(\"Extracted: \" + java.util.Arrays.toString(words));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "public class Main {\n    public static void main(String[] args) {\n        String email = \"student@javalab.org\";\n        boolean isValid = email.matches(\"^[\\\\w.-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,6}$\");\n        System.out.println(\"Is valid email: \" + isValid);\n\n        String text = \"Java101Python202Rust303\";\n        String[] words = text.split(\"\\\\d+\");\n        System.out.println(\"Extracted: \" + java.util.Arrays.toString(words));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Regular Expressions & Pattern Matching.",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-string-algorithms",
      "nextLessonTitle": "Practical String Algorithms: Palindromes & Anagrams",
      "nextLessonModuleId": "java-module-4"
    }
  },
  "java-string-algorithms": {
    "id": "java-string-algorithms",
    "moduleId": "java-module-4",
    "title": "Practical String Algorithms: Palindromes & Anagrams",
    "subtitle": "Two-Pointer Technique, Character Frequency Hashing, and Invariant Verification",
    "order": 10,
    "readTimeMinutes": 15,
    "difficulty": "Intermediate",
    "visualizerType": "array-algorithm",
    "objectives": [
      "Master Practical String Algorithms: Palindromes & Anagrams.",
      "Understand heap representation of arrays and strings.",
      "Optimize algorithmic time and space complexity."
    ],
    "prerequisites": [
      "Module 3: Conditions and Loops"
    ],
    "analogy": {
      "title": "Practical String Algorithms: Palindromes & Anagrams Metaphor",
      "text": "Rearranging letters in a Scrabble tile rack: if both words use the exact same frequency of letter tiles, they are anagrams.",
      "metaphor": "Rearranging letters in a Scrabble tile rack: if both words use the exact same frequency of letter tiles, they are anagrams."
    },
    "problemSolved": {
      "title": "Efficient Sequential Memory Storage and Text Processing",
      "description": "Handling collections of values and strings with high efficiency and minimal memory overhead.",
      "keyPoints": [
        "Contiguous memory addressing",
        "Immutable vs mutable string buffers",
        "O(1) index access"
      ]
    },
    "intuition": {
      "overview": "Internal JVM mechanisms behind Practical String Algorithms: Palindromes & Anagrams.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Layout",
          "description": "Arrays allocated as contiguous heap objects with fixed length."
        },
        {
          "step": 2,
          "title": "Pointer Traversal",
          "description": "Index offset calculated by multiplying index by element type size."
        },
        {
          "step": 3,
          "title": "Bounds Checking",
          "description": "JVM enforces bounds at runtime to prevent buffer overflows."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Practical String Algorithms: Palindromes & Anagrams",
      "code": "import java.util.Arrays;\n\npublic class Main {\n    public static boolean isAnagram(String s1, String s2) {\n        char[] a1 = s1.toLowerCase().toCharArray();\n        char[] a2 = s2.toLowerCase().toCharArray();\n        Arrays.sort(a1);\n        Arrays.sort(a2);\n        return Arrays.equals(a1, a2);\n    }\n\n    public static void main(String[] args) {\n        String w1 = \"listen\";\n        String w2 = \"silent\";\n        System.out.println(\"'\" + w1 + \"' and '\" + w2 + \"' are anagrams: \" + isAnagram(w1, w2));\n    }\n}",
      "explanation": "Examine the implementation of Practical String Algorithms: Palindromes & Anagrams."
    },
    "runnableCode": {
      "code": "import java.util.Arrays;\n\npublic class Main {\n    public static boolean isAnagram(String s1, String s2) {\n        char[] a1 = s1.toLowerCase().toCharArray();\n        char[] a2 = s2.toLowerCase().toCharArray();\n        Arrays.sort(a1);\n        Arrays.sort(a2);\n        return Arrays.equals(a1, a2);\n    }\n\n    public static void main(String[] args) {\n        String w1 = \"listen\";\n        String w2 = \"silent\";\n        System.out.println(\"'\" + w1 + \"' and '\" + w2 + \"' are anagrams: \" + isAnagram(w1, w2));\n    }\n}",
      "expectedOutput": "'listen' and 'silent' are anagrams: true"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-4",
        "codeSnippet": "public class Main { ... }",
        "explanation": "Class structure and execution method."
      },
      {
        "lines": "5-12",
        "codeSnippet": "// Core array or string logic",
        "explanation": "Data structure manipulation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Neglecting case sensitivity ('Listen' vs 'silent') when checking anagrams without toLowerCase().",
        "solution": "Follow idiomatic Java practices.",
        "whyWrong": "Violating bounds or using reference comparison leads to errors."
      }
    ],
    "bestPractices": [
      "Use StringBuilder for loop concatenations.",
      "Always verify array length before indexing."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "useCase": "High-throughput parsing of logs, matrices, and JSON payloads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-string-algorithms",
        "question": "What is an anagram?",
        "answer": "A word formed by rearranging the exact letters of another word",
        "explanation": "Standard Java behavior."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-string-algorithms",
        "question": "What is an anagram?",
        "options": [
          "A word that reads the same backward",
          "A word formed by rearranging the exact letters of another word",
          "A palindrome with digits",
          "A substring of a larger text"
        ],
        "correctIndex": 1,
        "explanation": "Verified by the Java Language Specification."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-string-algorithms",
      "title": "Exercise: Practical String Algorithms: Palindromes & Anagrams",
      "difficulty": "Beginner",
      "description": "Write a program that uses Practical String Algorithms: Palindromes & Anagrams to complete the task.",
      "starterCode": "import java.util.Arrays;\n\npublic class Main {\n    public static boolean isAnagram(String s1, String s2) {\n        char[] a1 = s1.toLowerCase().toCharArray();\n        char[] a2 = s2.toLowerCase().toCharArray();\n        Arrays.sort(a1);\n        Arrays.sort(a2);\n        return Arrays.equals(a1, a2);\n    }\n\n    public static void main(String[] args) {\n        String w1 = \"listen\";\n        String w2 = \"silent\";\n        System.out.println(\"'\" + w1 + \"' and '\" + w2 + \"' are anagrams: \" + isAnagram(w1, w2));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "import java.util.Arrays;\n\npublic class Main {\n    public static boolean isAnagram(String s1, String s2) {\n        char[] a1 = s1.toLowerCase().toCharArray();\n        char[] a2 = s2.toLowerCase().toCharArray();\n        Arrays.sort(a1);\n        Arrays.sort(a2);\n        return Arrays.equals(a1, a2);\n    }\n\n    public static void main(String[] args) {\n        String w1 = \"listen\";\n        String w2 = \"silent\";\n        System.out.println(\"'\" + w1 + \"' and '\" + w2 + \"' are anagrams: \" + isAnagram(w1, w2));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Practical String Algorithms: Palindromes & Anagrams.",
        "Understood array memory layout and string pool mechanics.",
        "Ready for Methods and Recursion in Module 5."
      ],
      "nextLessonId": "java-methods-structure",
      "nextLessonTitle": "Method Structure and Return Types",
      "nextLessonModuleId": "java-module-5"
    }
  }
};
