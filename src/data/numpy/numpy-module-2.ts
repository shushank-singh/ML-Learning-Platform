import { ModuleData, LessonContent } from '@/lib/types';

export const numpyModule2Data: ModuleData = {
  "id": "numpy-module-2",
  "number": 2,
  "title": "Indexing, Slicing, and Reshaping",
  "subtitle": "Mastering Multi-Axis Coordinate Traversal, Views vs Copies, and Tensor Reshaping",
  "description": "Unlock total control over array manipulation. Learn integer indexing, multi-dimensional slicing, boolean filtering, fancy indexing, reshaping, and memory view mechanics.",
  "icon": "Layers",
  "badge": "Array Manipulation",
  "estimatedHours": 12,
  "topicsCount": 12,
  "lessons": [
    {
      "id": "numpy-m2-l1",
      "moduleId": "numpy-module-2",
      "title": "Accessing Elements in One-Dimensional Arrays",
      "description": "0-based positive integer indexing, offset calculation, and single element extraction",
      "order": 1,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m2-l2",
      "moduleId": "numpy-module-2",
      "title": "Indexing Two-Dimensional Arrays",
      "description": "Row and column coordinate addressing using arr[row, col] syntax",
      "order": 2,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m2-l3",
      "moduleId": "numpy-module-2",
      "title": "Slicing Arrays with [start:stop:step] Across Dimensions",
      "description": "Extracting contiguous sub-arrays, intervals, and multi-axis window slices",
      "order": 3,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m2-l4",
      "moduleId": "numpy-module-2",
      "title": "Negative Indexing & Reversing Array Dimensions",
      "description": "Accessing elements from the end of arrays and reversing sequences with negative steps",
      "order": 4,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m2-l5",
      "moduleId": "numpy-module-2",
      "title": "Boolean Indexing & Conditional Filtering",
      "description": "Filtering arrays using logical masks and conditional predicate expressions",
      "order": 5,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m2-l6",
      "moduleId": "numpy-module-2",
      "title": "Fancy Indexing with Integer Arrays & Index Lists",
      "description": "Selecting arbitrary subsets of elements and rows using integer arrays",
      "order": 6,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m2-l7",
      "moduleId": "numpy-module-2",
      "title": "Reshaping Arrays with reshape() and Auto-Dimension -1",
      "description": "Reorganizing array dimensions without moving underlying data bytes in RAM",
      "order": 7,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m2-l8",
      "moduleId": "numpy-module-2",
      "title": "Flattening Dimensions: flatten() vs ravel() In-Depth",
      "description": "Collapsing multi-dimensional arrays into 1D vectors: views vs deep copies",
      "order": 8,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m2-l9",
      "moduleId": "numpy-module-2",
      "title": "Transposing Matrices with .T and np.transpose()",
      "description": "Flipping rows into columns and multi-axis dimension permutation",
      "order": 9,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m2-l10",
      "moduleId": "numpy-module-2",
      "title": "Adding & Removing Dimensions (newaxis, expand_dims, squeeze)",
      "description": "Manipulating tensor ranks for broadcasting compatibility and model inputs",
      "order": 10,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m2-l11",
      "moduleId": "numpy-module-2",
      "title": "Understanding Views versus Copies in NumPy",
      "description": "Memory pointers, sharing buffers (.base), and avoiding unintended side-effects",
      "order": 11,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Advanced"
    },
    {
      "id": "numpy-m2-l12",
      "moduleId": "numpy-module-2",
      "title": "Combining Indexing, Slicing & Filtering in Real Pipelines",
      "description": "Integrating boolean masks, dimension slicing, and fancy selection in data workflows",
      "order": 12,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    }
  ]
};

export const numpyModule2Lessons: Record<string, LessonContent> = {
  "numpy-m2-l1": {
    "id": "numpy-m2-l1",
    "moduleId": "numpy-module-2",
    "title": "Accessing Elements in One-Dimensional Arrays",
    "subtitle": "0-based positive integer indexing, offset calculation, and single element extraction",
    "order": 1,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Accessing Elements in One-Dimensional Arrays.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Lockers on a School Hallway",
      "text": "Imagine a straight hallway with 10 student lockers numbered 0 to 9. If you want Locker 0, you take 0 steps. If you want Locker 4, you take 4 steps forward. In a 1D NumPy array, arr[i] tells the CPU to jump exactly i locker widths forward from the start of memory in O(1) time.",
      "metaphor": "Positive indexing is direct step counting from the start of the memory corridor."
    },
    "problemSolved": {
      "title": "Direct Memory Access Without Traversal",
      "description": "Linked lists require walking node-by-node from the head (O(N) time). NumPy 1D arrays compute the exact byte address in O(1) constant time, instantly retrieving values.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Accessing Elements in One-Dimensional Arrays.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Accessing Elements in One-Dimensional Arrays.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Accessing Elements in One-Dimensional Arrays",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Cricket Over Scores",
      "dataset": [
        {
          "Record": 1,
          "Context": "Scores of 5 overs: [6, 12, 4, 18, 10]. Accessing over 1 (index 0) and over 4 (index 3).",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Accessing Elements in One-Dimensional Arrays",
      "description": "How Accessing Elements in One-Dimensional Arrays navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nscores = np.array([6, 12, 4, 18, 10])\nfirst = scores[0]\nfourth = scores[3]\nprint('All scores:', scores)\nprint('First over:', first)\nprint('Fourth over:', fourth)",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\nscores = np.array([6, 12, 4, 18, 10])\nfirst = scores[0]\nfourth = scores[3]\nprint('All scores:', scores)\nprint('First over:', first)\nprint('Fourth over:', fourth)",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\nscores = np.array([6, 12, 4, 18, 10])\nfirst = scores[0]\nfourth = scores[3]\nprint('All scores:', scores)\nprint('First over:', first)\nprint('Fourth over:', fourth)",
      "expectedOutput": "All scores: [ 6 12  4 18 10]\nFirst over: 6\nFourth over: 18"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What is the index of the third element in a NumPy array?",
        "hint": "Review the slicing rules.",
        "answer": "The third element is at index 2 (due to 0-based indexing)."
      },
      {
        "id": "pq2",
        "question": "Does Accessing Elements in One-Dimensional Arrays create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Accessing Elements in One-Dimensional Arrays essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Accessing Elements in One-Dimensional Arrays",
      "problem": "Given an array of temperatures [21.5, 22.0, 24.5, 23.0, 25.5], extract the first and third readings.",
      "difficulty": "Beginner",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\ntemps = np.array([21.5, 22.0, 24.5, 23.0, 25.5])\nprint(temps[0], temps[2])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Accessing Elements in One-Dimensional Arrays thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l2",
      "nextLessonTitle": "Indexing Two-Dimensional Arrays",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l2": {
    "id": "numpy-m2-l2",
    "moduleId": "numpy-module-2",
    "title": "Indexing Two-Dimensional Arrays",
    "subtitle": "Row and column coordinate addressing using arr[row, col] syntax",
    "order": 2,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Indexing Two-Dimensional Arrays.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Seating Chart in a Cinema",
      "text": "When you buy a ticket for Row 2, Seat 4, the usher walks down to Row 2 first, then slides across to Seat 4. In NumPy 2D arrays, arr[row, col] uses this exact coordinate system: the first index picks the row, the second index picks the column.",
      "metaphor": "2D indexing is a coordinate grid (Row, Column) specifying exact intersections."
    },
    "problemSolved": {
      "title": "Replacing Nested Python List Lookup Chaining",
      "description": "In Python lists, a 2D lookup requires two separate pointer operations: matrix[row][col]. NumPy combines row and column indexing into a single tuple: matrix[row, col], calculating the physical offset in a single step.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Indexing Two-Dimensional Arrays.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Indexing Two-Dimensional Arrays.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Indexing Two-Dimensional Arrays",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Student Marks Grid",
      "dataset": [
        {
          "Record": 1,
          "Context": "3 students across 3 exams. Accessing student 0 exam 2 score.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Indexing Two-Dimensional Arrays",
      "description": "How Indexing Two-Dimensional Arrays navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\ngrid = np.array([\n    [10, 20, 30],\n    [40, 50, 60],\n    [70, 80, 90]\n])\nprint('Row 0, Col 2:', grid[0, 2])\nprint('Center [1, 1]:', grid[1, 1])\nprint('Entire row 1:', grid[1, :])",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\ngrid = np.array([\n    [10, 20, 30],\n    [40, 50, 60],\n    [70, 80, 90]\n])\nprint('Row 0, Col 2:', grid[0, 2])\nprint('Center [1, 1]:', grid[1, 1])\nprint('Entire row 1:', grid[1, :])",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\ngrid = np.array([\n    [10, 20, 30],\n    [40, 50, 60],\n    [70, 80, 90]\n])\nprint('Row 0, Col 2:', grid[0, 2])\nprint('Center [1, 1]:', grid[1, 1])\nprint('Entire row 1:', grid[1, :])",
      "expectedOutput": "Row 0, Col 2: 30\nCenter [1, 1]: 50\nEntire row 1: [40 50 60]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Why is arr[row, col] preferred over arr[row][col] in NumPy?",
        "hint": "Review the slicing rules.",
        "answer": "arr[row, col] calculates the direct strided memory offset without creating an intermediate array slice."
      },
      {
        "id": "pq2",
        "question": "Does Indexing Two-Dimensional Arrays create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Indexing Two-Dimensional Arrays essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Indexing Two-Dimensional Arrays",
      "problem": "Create a 2x3 matrix [[1, 2, 3], [4, 5, 6]] and extract the element at row 1, col 2.",
      "difficulty": "Beginner",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\nm = np.array([[1, 2, 3], [4, 5, 6]])\nprint(m[1, 2])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Indexing Two-Dimensional Arrays thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l3",
      "nextLessonTitle": "Slicing Arrays with [start:stop:step] Across Dimensions",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l3": {
    "id": "numpy-m2-l3",
    "moduleId": "numpy-module-2",
    "title": "Slicing Arrays with [start:stop:step] Across Dimensions",
    "subtitle": "Extracting contiguous sub-arrays, intervals, and multi-axis window slices",
    "order": 3,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Slicing Arrays with [start:stop:step] Across Dimensions.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Cutting Slices from a Loaf of Bread",
      "text": "When cutting a loaf of bread, you choose where to start slicing (start), where to stop (stop), and how thick each slice should be (step). arr[1:5:2] starts at index 1, stops before index 5, and skips every 2nd element.",
      "metaphor": "Slicing extracts continuous windows with zero memory duplication."
    },
    "problemSolved": {
      "title": "Extracting Sub-matrices Without Memory Duplication",
      "description": "Copying large blocks of matrices to extract a region of interest consumes huge RAM. NumPy slices create zero-copy views that share the original buffer.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Slicing Arrays with [start:stop:step] Across Dimensions.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Slicing Arrays with [start:stop:step] Across Dimensions.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Slicing Arrays with [start:stop:step] Across Dimensions",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Sensor Time Window",
      "dataset": [
        {
          "Record": 1,
          "Context": "Extracting readings between minute 2 and minute 6 from an hourly recording.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Slicing Arrays with [start:stop:step] Across Dimensions",
      "description": "How Slicing Arrays with [start:stop:step] Across Dimensions navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\narr = np.arange(10)\nsub1 = arr[2:7]\nsub2 = arr[1:9:2]\nprint('Full array:', arr)\nprint('Slice [2:7]:', sub1)\nprint('Slice [1:9:2] (every 2nd):', sub2)\nmat = np.arange(16).reshape(4, 4)\nprint('2D submatrix [1:3, 1:3]:\\n', mat[1:3, 1:3])",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\narr = np.arange(10)\nsub1 = arr[2:7]\nsub2 = arr[1:9:2]\nprint('Full array:', arr)\nprint('Slice [2:7]:', sub1)\nprint('Slice [1:9:2] (every 2nd):', sub2)\nmat = np.arange(16).reshape(4, 4)\nprint('2D submatrix [1:3, 1:3]:\\n', mat[1:3, 1:3])",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\narr = np.arange(10)\nsub1 = arr[2:7]\nsub2 = arr[1:9:2]\nprint('Full array:', arr)\nprint('Slice [2:7]:', sub1)\nprint('Slice [1:9:2] (every 2nd):', sub2)\nmat = np.arange(16).reshape(4, 4)\nprint('2D submatrix [1:3, 1:3]:\\n', mat[1:3, 1:3])",
      "expectedOutput": "Full array: [0 1 2 3 4 5 6 7 8 9]\nSlice [2:7]: [2 3 4 5 6]\nSlice [1:9:2] (every 2nd): [1 3 5 7]\n2D submatrix [1:3, 1:3]:\n [[ 5  6]\n [ 9 10]]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Is the element at the 'stop' index included in a NumPy slice?",
        "hint": "Review the slicing rules.",
        "answer": "No, slicing follows Python convention: start is inclusive, stop is exclusive [start, stop)."
      },
      {
        "id": "pq2",
        "question": "Does Slicing Arrays with [start:stop:step] Across Dimensions create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Slicing Arrays with [start:stop:step] Across Dimensions essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Slicing Arrays with [start:stop:step] Across Dimensions",
      "problem": "Given arr = np.arange(10), extract elements from index 3 up to (not including) index 8.",
      "difficulty": "Beginner",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\narr = np.arange(10)\nprint(arr[3:8])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Slicing Arrays with [start:stop:step] Across Dimensions thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l4",
      "nextLessonTitle": "Negative Indexing & Reversing Array Dimensions",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l4": {
    "id": "numpy-m2-l4",
    "moduleId": "numpy-module-2",
    "title": "Negative Indexing & Reversing Array Dimensions",
    "subtitle": "Accessing elements from the end of arrays and reversing sequences with negative steps",
    "order": 4,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Negative Indexing & Reversing Array Dimensions.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Counting Backwards from the Finish Line",
      "text": "Instead of measuring how far you ran from the starting line, you look at how far you are from the finish line: -1 is the last runner, -2 is second to last. arr[::-1] runs the entire race backwards.",
      "metaphor": "Negative indices count backward from the array length: -1 = last item, -k = len - k."
    },
    "problemSolved": {
      "title": "Unknown Array Lengths When Accessing Tail Elements",
      "description": "In dynamic data feeds, you often want the most recent reading without calling len(arr) first. Negative indexing provides clean, readable access to trailing elements.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Negative Indexing & Reversing Array Dimensions.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Negative Indexing & Reversing Array Dimensions.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Negative Indexing & Reversing Array Dimensions",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Stock Ticker Stream",
      "dataset": [
        {
          "Record": 1,
          "Context": "Retrieving the latest closing price and reversing a historical timeline.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Negative Indexing & Reversing Array Dimensions",
      "description": "How Negative Indexing & Reversing Array Dimensions navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\narr = np.array([100, 200, 300, 400, 500])\nprint('Last element (-1):', arr[-1])\nprint('Second to last (-2):', arr[-2])\nprint('Last 3 elements (-3:):', arr[-3:])\nprint('Reversed array (::-1):', arr[::-1])",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\narr = np.array([100, 200, 300, 400, 500])\nprint('Last element (-1):', arr[-1])\nprint('Second to last (-2):', arr[-2])\nprint('Last 3 elements (-3:):', arr[-3:])\nprint('Reversed array (::-1):', arr[::-1])",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\narr = np.array([100, 200, 300, 400, 500])\nprint('Last element (-1):', arr[-1])\nprint('Second to last (-2):', arr[-2])\nprint('Last 3 elements (-3:):', arr[-3:])\nprint('Reversed array (::-1):', arr[::-1])",
      "expectedOutput": "Last element (-1): 500\nSecond to last (-2): 400\nLast 3 elements (-3:): [300 400 500]\nReversed array (::-1): [500 400 300 200 100]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What does arr[::-1] do to a 1D array?",
        "hint": "Review the slicing rules.",
        "answer": "It creates a view that reverses the sequence by applying a negative stride of -1."
      },
      {
        "id": "pq2",
        "question": "Does Negative Indexing & Reversing Array Dimensions create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Negative Indexing & Reversing Array Dimensions essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Negative Indexing & Reversing Array Dimensions",
      "problem": "Create an array of numbers [1, 2, 3, 4, 5] and reverse it using negative indexing.",
      "difficulty": "Beginner",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\na = np.array([1, 2, 3, 4, 5])\nprint(a[::-1])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Negative Indexing & Reversing Array Dimensions thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l5",
      "nextLessonTitle": "Boolean Indexing & Conditional Filtering",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l5": {
    "id": "numpy-m2-l5",
    "moduleId": "numpy-module-2",
    "title": "Boolean Indexing & Conditional Filtering",
    "subtitle": "Filtering arrays using logical masks and conditional predicate expressions",
    "order": 5,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Boolean Indexing & Conditional Filtering.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "A Sieve or Security Checkpoint",
      "text": "Imagine an airport security gate where passengers with a valid boarding pass get a green light (True) and those without get a red light (False). Only the green-light passengers pass through. In NumPy, arr[arr > 50] creates a boolean mask and keeps only True elements.",
      "metaphor": "Boolean indexing filters arrays by selecting elements that evaluate to True for a condition."
    },
    "problemSolved": {
      "title": "Manual Iteration and Append Loops for Filtering",
      "description": "Filtering millions of records with pure Python 'for x in data: if x > threshold' is slow and bulky. Boolean indexing evaluates the condition vectorially in C.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Boolean Indexing & Conditional Filtering.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Boolean Indexing & Conditional Filtering.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Boolean Indexing & Conditional Filtering",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Filtering Passing Students",
      "dataset": [
        {
          "Record": 1,
          "Context": "Selecting all exam scores >= 70 from a class test.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Boolean Indexing & Conditional Filtering",
      "description": "How Boolean Indexing & Conditional Filtering navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nscores = np.array([45, 82, 91, 58, 73, 88, 32])\nmask = scores >= 70\npassing_scores = scores[mask]\nprint('All scores:', scores)\nprint('Boolean mask (>= 70):', mask)\nprint('Filtered high scores:', passing_scores)",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\nscores = np.array([45, 82, 91, 58, 73, 88, 32])\nmask = scores >= 70\npassing_scores = scores[mask]\nprint('All scores:', scores)\nprint('Boolean mask (>= 70):', mask)\nprint('Filtered high scores:', passing_scores)",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\nscores = np.array([45, 82, 91, 58, 73, 88, 32])\nmask = scores >= 70\npassing_scores = scores[mask]\nprint('All scores:', scores)\nprint('Boolean mask (>= 70):', mask)\nprint('Filtered high scores:', passing_scores)",
      "expectedOutput": "All scores: [45 82 91 58 73 88 32]\nBoolean mask (>= 70): [False  True  True False  True  True False]\nFiltered high scores: [82 91 73 88]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Does boolean indexing return a view or a copy?",
        "hint": "Review the slicing rules.",
        "answer": "Boolean indexing always returns a copy (a new 1D array) because the filtered indices may not follow regular strides."
      },
      {
        "id": "pq2",
        "question": "Does Boolean Indexing & Conditional Filtering create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Boolean Indexing & Conditional Filtering essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Boolean Indexing & Conditional Filtering",
      "problem": "Filter out all negative numbers from np.array([-5, 10, -2, 8, -1, 15]).",
      "difficulty": "Intermediate",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\na = np.array([-5, 10, -2, 8, -1, 15])\nprint(a[a >= 0])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Boolean Indexing & Conditional Filtering thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l6",
      "nextLessonTitle": "Fancy Indexing with Integer Arrays & Index Lists",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l6": {
    "id": "numpy-m2-l6",
    "moduleId": "numpy-module-2",
    "title": "Fancy Indexing with Integer Arrays & Index Lists",
    "subtitle": "Selecting arbitrary subsets of elements and rows using integer arrays",
    "order": 6,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Fancy Indexing with Integer Arrays & Index Lists.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Calling Out Names from a Student Roll Sheet",
      "text": "A teacher doesn't have to call students in alphabetical order or in a contiguous slice. The teacher can call: 'Students #0, #4, and #2, come to the board!' Fancy indexing passes an array of arbitrary indices [0, 4, 2] to pick exactly those elements in that order.",
      "metaphor": "Fancy indexing uses arrays or lists of integers to extract elements in any arbitrary order."
    },
    "problemSolved": {
      "title": "Extracting Non-Contiguous Subsets & Shuffling",
      "description": "When generating train/test splits or sampling mini-batches, samples are non-contiguous. Fancy indexing retrieves arbitrary index batches in one vectorized operation.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Fancy Indexing with Integer Arrays & Index Lists.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Fancy Indexing with Integer Arrays & Index Lists.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Fancy Indexing with Integer Arrays & Index Lists",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Mini-Batch Sampling in ML",
      "dataset": [
        {
          "Record": 1,
          "Context": "Extracting training examples 0, 4, and 2 from a dataset.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Fancy Indexing with Integer Arrays & Index Lists",
      "description": "How Fancy Indexing with Integer Arrays & Index Lists navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\narr = np.array([10, 20, 30, 40, 50, 60, 70])\nindices = [0, 4, 2]\nselected = arr[indices]\nprint('Source array:', arr)\nprint('Selected at [0, 4, 2]:', selected)\nmat = np.arange(12).reshape(4, 3)\nprint('Selecting rows 0 and 2 from matrix:\\n', mat[[0, 2]])",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\narr = np.array([10, 20, 30, 40, 50, 60, 70])\nindices = [0, 4, 2]\nselected = arr[indices]\nprint('Source array:', arr)\nprint('Selected at [0, 4, 2]:', selected)\nmat = np.arange(12).reshape(4, 3)\nprint('Selecting rows 0 and 2 from matrix:\\n', mat[[0, 2]])",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\narr = np.array([10, 20, 30, 40, 50, 60, 70])\nindices = [0, 4, 2]\nselected = arr[indices]\nprint('Source array:', arr)\nprint('Selected at [0, 4, 2]:', selected)\nmat = np.arange(12).reshape(4, 3)\nprint('Selecting rows 0 and 2 from matrix:\\n', mat[[0, 2]])",
      "expectedOutput": "Source array: [10 20 30 40 50 60 70]\nSelected at [0, 4, 2]: [10 50 30]\nSelecting rows 0 and 2 from matrix:\n [[0 1 2]\n [6 7 8]]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Does fancy indexing return a view or a copy?",
        "hint": "Review the slicing rules.",
        "answer": "Fancy indexing always returns a copy because the requested elements cannot generally be represented by fixed strides."
      },
      {
        "id": "pq2",
        "question": "Does Fancy Indexing with Integer Arrays & Index Lists create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Fancy Indexing with Integer Arrays & Index Lists essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Fancy Indexing with Integer Arrays & Index Lists",
      "problem": "Select the 1st, 3rd, and 5th elements (indices 0, 2, 4) from np.array([100, 200, 300, 400, 500]).",
      "difficulty": "Intermediate",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\na = np.array([100, 200, 300, 400, 500])\nprint(a[[0, 2, 4]])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Fancy Indexing with Integer Arrays & Index Lists thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l7",
      "nextLessonTitle": "Reshaping Arrays with reshape() and Auto-Dimension -1",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l7": {
    "id": "numpy-m2-l7",
    "moduleId": "numpy-module-2",
    "title": "Reshaping Arrays with reshape() and Auto-Dimension -1",
    "subtitle": "Reorganizing array dimensions without moving underlying data bytes in RAM",
    "order": 7,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Reshaping Arrays with reshape() and Auto-Dimension -1.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Rearranging 12 Toy Blocks into Different Box Shapes",
      "text": "If you have 12 toy blocks, you can line them up in 1 row of 12 (1x12), stack them as 3 rows of 4 (3x4), or build a 2x6 rectangle. The blocks themselves never change; only your grid organization changes.",
      "metaphor": "reshape() changes the shape tuple while keeping total element count (size) constant."
    },
    "problemSolved": {
      "title": "Reshaping Flat 1D Sensor Feeds into 2D Feature Matrices",
      "description": "Flat data streams must be packaged into 2D matrices (samples, features) for machine learning models. Using -1 lets NumPy infer the missing dimension automatically.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Reshaping Arrays with reshape() and Auto-Dimension -1.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Reshaping Arrays with reshape() and Auto-Dimension -1.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Reshaping Arrays with reshape() and Auto-Dimension -1",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Packaging Batch Features",
      "dataset": [
        {
          "Record": 1,
          "Context": "Converting 12 sequential hourly readings into 2 days of 6 readings.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Reshaping Arrays with reshape() and Auto-Dimension -1",
      "description": "How Reshaping Arrays with reshape() and Auto-Dimension -1 navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\na = np.arange(12)\nm_3x4 = a.reshape(3, 4)\nm_auto = a.reshape(2, -1)  # NumPy infers 6 columns\nprint('Original 1D:', a)\nprint('Reshaped to (3, 4):\\n', m_3x4)\nprint('Reshaped with -1 (2, -1):\\n', m_auto)",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\na = np.arange(12)\nm_3x4 = a.reshape(3, 4)\nm_auto = a.reshape(2, -1)  # NumPy infers 6 columns\nprint('Original 1D:', a)\nprint('Reshaped to (3, 4):\\n', m_3x4)\nprint('Reshaped with -1 (2, -1):\\n', m_auto)",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\na = np.arange(12)\nm_3x4 = a.reshape(3, 4)\nm_auto = a.reshape(2, -1)  # NumPy infers 6 columns\nprint('Original 1D:', a)\nprint('Reshaped to (3, 4):\\n', m_3x4)\nprint('Reshaped with -1 (2, -1):\\n', m_auto)",
      "expectedOutput": "Original 1D: [ 0  1  2  3  4  5  6  7  8  9 10 11]\nReshaped to (3, 4):\n [[ 0  1  2  3]\n [ 4  5  6  7]\n [ 8  9 10 11]]\nReshaped with -1 (2, -1):\n [[ 0  1  2  3  4  5]\n [ 6  7  8  9 10 11]]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What does passing -1 as a dimension in reshape() do?",
        "hint": "Review the slicing rules.",
        "answer": "NumPy automatically calculates the exact size of that dimension based on the total elements and the other specified dimensions."
      },
      {
        "id": "pq2",
        "question": "Does Reshaping Arrays with reshape() and Auto-Dimension -1 create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Reshaping Arrays with reshape() and Auto-Dimension -1 essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Reshaping Arrays with reshape() and Auto-Dimension -1",
      "problem": "Reshape a 1D array of 8 elements into a 2x4 matrix.",
      "difficulty": "Beginner",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\na = np.arange(8)\nprint(a.reshape(2, 4))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Reshaping Arrays with reshape() and Auto-Dimension -1 thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l8",
      "nextLessonTitle": "Flattening Dimensions: flatten() vs ravel() In-Depth",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l8": {
    "id": "numpy-m2-l8",
    "moduleId": "numpy-module-2",
    "title": "Flattening Dimensions: flatten() vs ravel() In-Depth",
    "subtitle": "Collapsing multi-dimensional arrays into 1D vectors: views vs deep copies",
    "order": 8,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Flattening Dimensions: flatten() vs ravel() In-Depth.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Unrolling a Carpet vs Photocopying a Map",
      "text": "ravel() unrolls a carpet flat on the floor: it is the exact same carpet, and stepping on it dirties the original (view). flatten() takes a photo of the carpet and prints a copy: spilling ink on the photo leaves the real carpet clean (copy).",
      "metaphor": "ravel() returns a memory-efficient view when possible; flatten() always creates a deep copy."
    },
    "problemSolved": {
      "title": "Unintentional Memory Doubling During Image Flattening",
      "description": "In deep learning, flattening a batch of 10,000 images with flatten() doubles RAM usage because it allocates duplicate memory. ravel() creates a zero-copy 1D view.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Flattening Dimensions: flatten() vs ravel() In-Depth.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Flattening Dimensions: flatten() vs ravel() In-Depth.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Flattening Dimensions: flatten() vs ravel() In-Depth",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Flattening 2D Image Pixels",
      "dataset": [
        {
          "Record": 1,
          "Context": "Converting a 2x2 image patch into a flat vector for a neural network input.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Flattening Dimensions: flatten() vs ravel() In-Depth",
      "description": "How Flattening Dimensions: flatten() vs ravel() In-Depth navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\norig = np.array([[1, 2], [3, 4]])\nr = orig.ravel()\nf = orig.flatten()\nr[0] = 99\nprint('After modifying ravel[0] to 99:')\nprint('Original array (mutated!):\\n', orig)\nf[1] = 88\nprint('After modifying flatten[1] to 88:')\nprint('Original array (unaffected):\\n', orig)",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\norig = np.array([[1, 2], [3, 4]])\nr = orig.ravel()\nf = orig.flatten()\nr[0] = 99\nprint('After modifying ravel[0] to 99:')\nprint('Original array (mutated!):\\n', orig)\nf[1] = 88\nprint('After modifying flatten[1] to 88:')\nprint('Original array (unaffected):\\n', orig)",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\norig = np.array([[1, 2], [3, 4]])\nr = orig.ravel()\nf = orig.flatten()\nr[0] = 99\nprint('After modifying ravel[0] to 99:')\nprint('Original array (mutated!):\\n', orig)\nf[1] = 88\nprint('After modifying flatten[1] to 88:')\nprint('Original array (unaffected):\\n', orig)",
      "expectedOutput": "After modifying ravel[0] to 99:\nOriginal array (mutated!):\n [[99  2]\n [ 3  4]]\nAfter modifying flatten[1] to 88:\nOriginal array (unaffected):\n [[99  2]\n [ 3  4]]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "When does ravel() return a copy instead of a view?",
        "hint": "Review the slicing rules.",
        "answer": "ravel() returns a copy only if the array memory is non-contiguous (e.g. from complex slicing or transpositions)."
      },
      {
        "id": "pq2",
        "question": "Does Flattening Dimensions: flatten() vs ravel() In-Depth create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Flattening Dimensions: flatten() vs ravel() In-Depth essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Flattening Dimensions: flatten() vs ravel() In-Depth",
      "problem": "Verify that flatten() returns an independent copy by mutating its first element.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\nx = np.array([[10, 20], [30, 40]])\nf = x.flatten()\nf[0] = 999\nprint('Original first element unchanged:', x[0, 0])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Flattening Dimensions: flatten() vs ravel() In-Depth thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l9",
      "nextLessonTitle": "Transposing Matrices with .T and np.transpose()",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l9": {
    "id": "numpy-m2-l9",
    "moduleId": "numpy-module-2",
    "title": "Transposing Matrices with .T and np.transpose()",
    "subtitle": "Flipping rows into columns and multi-axis dimension permutation",
    "order": 9,
    "readTimeMinutes": 12,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Transposing Matrices with .T and np.transpose().",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Rotating a Spreadsheet by 90 Degrees",
      "text": "Imagine rotating a spreadsheet so that employee names (originally down the rows) become the column headers, and department details become the rows. Transposing swaps axis 0 with axis 1.",
      "metaphor": "Transposition swaps matrix axes: A.T has shape (cols, rows) with zero data movement."
    },
    "problemSolved": {
      "title": "Aligning Matrix Dimensions for Matrix Multiplication",
      "description": "Matrix multiplication requires inner dimensions to match (M x K) @ (K x N). Transposing feature matrices X (N x D) to X.T (D x N) enables dot products in linear regression.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Transposing Matrices with .T and np.transpose().",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Transposing Matrices with .T and np.transpose().",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Transposing Matrices with .T and np.transpose()",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Transposing Feature Matrix",
      "dataset": [
        {
          "Record": 1,
          "Context": "Flipping a 2-sample, 3-feature matrix into a 3-feature, 2-sample matrix.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Transposing Matrices with .T and np.transpose()",
      "description": "How Transposing Matrices with .T and np.transpose() navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nmat = np.array([[1, 2, 3], [4, 5, 6]])\nprint('Original (2, 3):\\n', mat)\nprint('Transposed mat.T (3, 2):\\n', mat.T)\nprint('Original strides:', mat.strides)\nprint('Transposed strides:', mat.T.strides)",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\nmat = np.array([[1, 2, 3], [4, 5, 6]])\nprint('Original (2, 3):\\n', mat)\nprint('Transposed mat.T (3, 2):\\n', mat.T)\nprint('Original strides:', mat.strides)\nprint('Transposed strides:', mat.T.strides)",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\nmat = np.array([[1, 2, 3], [4, 5, 6]])\nprint('Original (2, 3):\\n', mat)\nprint('Transposed mat.T (3, 2):\\n', mat.T)\nprint('Original strides:', mat.strides)\nprint('Transposed strides:', mat.T.strides)",
      "expectedOutput": "Original (2, 3):\n [[1 2 3]\n [4 5 6]]\nTransposed mat.T (3, 2):\n [[1 4]\n [2 5]\n [3 6]]\nOriginal strides: (24, 8)\nTransposed strides: (8, 24)"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Does .T copy the array in memory?",
        "hint": "Review the slicing rules.",
        "answer": "No, .T simply swaps the shape and strides tuples, creating a zero-copy view."
      },
      {
        "id": "pq2",
        "question": "Does Transposing Matrices with .T and np.transpose() create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Transposing Matrices with .T and np.transpose() essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Transposing Matrices with .T and np.transpose()",
      "problem": "Transpose a 3x2 matrix of integers and verify its shape.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\nm = np.ones((3, 2))\nprint('Transposed shape:', m.T.shape)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Transposing Matrices with .T and np.transpose() thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l10",
      "nextLessonTitle": "Adding & Removing Dimensions (newaxis, expand_dims, squeeze)",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l10": {
    "id": "numpy-m2-l10",
    "moduleId": "numpy-module-2",
    "title": "Adding & Removing Dimensions (newaxis, expand_dims, squeeze)",
    "subtitle": "Manipulating tensor ranks for broadcasting compatibility and model inputs",
    "order": 10,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Adding & Removing Dimensions (newaxis, expand_dims, squeeze).",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Upgrading a Flat Postcard to a 3D Box",
      "text": "A flat postcard is 2D (height, width). Putting it into a single-slot box gives it a 3rd dimension (1, height, width). It is still 1 postcard, but now it fits into 3D shipping containers. np.newaxis adds a dummy dimension of size 1.",
      "metaphor": "np.newaxis and expand_dims insert dimensions of size 1; squeeze removes dimensions of size 1."
    },
    "problemSolved": {
      "title": "Dimension Mismatch in Machine Learning Estimators",
      "description": "Scikit-learn expects 2D feature matrices (N, 1) rather than flat 1D vectors (N,). np.newaxis converts 1D arrays into 2D column vectors without copying data.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Adding & Removing Dimensions (newaxis, expand_dims, squeeze).",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Adding & Removing Dimensions (newaxis, expand_dims, squeeze).",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Adding & Removing Dimensions (newaxis, expand_dims, squeeze)",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Preparing Scikit-Learn Feature Input",
      "dataset": [
        {
          "Record": 1,
          "Context": "Converting 1D target predictions into a 2D column vector.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Adding & Removing Dimensions (newaxis, expand_dims, squeeze)",
      "description": "How Adding & Removing Dimensions (newaxis, expand_dims, squeeze) navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nv = np.array([1, 2, 3])\ncol = v[:, np.newaxis]\nrow = v[np.newaxis, :]\nprint('1D shape:', v.shape)\nprint('Column vector (v[:, np.newaxis]):\\n', col, col.shape)\nprint('Squeezed back:', np.squeeze(col).shape)",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\nv = np.array([1, 2, 3])\ncol = v[:, np.newaxis]\nrow = v[np.newaxis, :]\nprint('1D shape:', v.shape)\nprint('Column vector (v[:, np.newaxis]):\\n', col, col.shape)\nprint('Squeezed back:', np.squeeze(col).shape)",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\nv = np.array([1, 2, 3])\ncol = v[:, np.newaxis]\nrow = v[np.newaxis, :]\nprint('1D shape:', v.shape)\nprint('Column vector (v[:, np.newaxis]):\\n', col, col.shape)\nprint('Squeezed back:', np.squeeze(col).shape)",
      "expectedOutput": "1D shape: (3,)\nColumn vector (v[:, np.newaxis]):\n [[1]\n [2]\n [3]] (3, 1)\nSqueezed back: (3,)"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What is the difference between arr[:, np.newaxis] and np.expand_dims(arr, axis=1)?",
        "hint": "Review the slicing rules.",
        "answer": "They are functionally identical; np.newaxis is slicing syntax, whereas expand_dims is a functional wrapper."
      },
      {
        "id": "pq2",
        "question": "Does Adding & Removing Dimensions (newaxis, expand_dims, squeeze) create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Adding & Removing Dimensions (newaxis, expand_dims, squeeze) essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Adding & Removing Dimensions (newaxis, expand_dims, squeeze)",
      "problem": "Convert a 1D array of 4 numbers into a column vector of shape (4, 1).",
      "difficulty": "Intermediate",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\na = np.array([10, 20, 30, 40])\ncol = a[:, np.newaxis]\nprint(col.shape)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Adding & Removing Dimensions (newaxis, expand_dims, squeeze) thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l11",
      "nextLessonTitle": "Understanding Views versus Copies in NumPy",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l11": {
    "id": "numpy-m2-l11",
    "moduleId": "numpy-module-2",
    "title": "Understanding Views versus Copies in NumPy",
    "subtitle": "Memory pointers, sharing buffers (.base), and avoiding unintended side-effects",
    "order": 11,
    "readTimeMinutes": 14,
    "difficulty": "Advanced",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Understanding Views versus Copies in NumPy.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "A Window Looking Outside vs A Printed Photograph",
      "text": "Looking out your living room window gives you a view of the garden outside. If someone paints the fence red, you see it change through the window (view). If you take a photograph of the garden and someone paints the fence, the photo stays unchanged (copy).",
      "metaphor": "Views share memory (.base is not None); copies allocate independent memory (.base is None)."
    },
    "problemSolved": {
      "title": "Accidental In-Place Mutations in Data Pipelines",
      "description": "Modifying a sliced sub-array can accidentally mutate the master dataset, producing silent data corruption bugs. Checking .base detects shared memory buffers.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Understanding Views versus Copies in NumPy.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Understanding Views versus Copies in NumPy.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Understanding Views versus Copies in NumPy",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "Verifying Training Data Isolation",
      "dataset": [
        {
          "Record": 1,
          "Context": "Ensuring validation set slices are isolated copies so preprocessing does not taint the training set.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Understanding Views versus Copies in NumPy",
      "description": "How Understanding Views versus Copies in NumPy navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nmaster = np.array([10, 20, 30, 40])\nview_slice = master[1:3]\ncopy_slice = master[1:3].copy()\nprint('view_slice shares buffer (base is master):', view_slice.base is master)\nprint('copy_slice has own memory (base is None):', copy_slice.base is None)\nview_slice[0] = 999\nprint('Master after mutating view:', master)",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\nmaster = np.array([10, 20, 30, 40])\nview_slice = master[1:3]\ncopy_slice = master[1:3].copy()\nprint('view_slice shares buffer (base is master):', view_slice.base is master)\nprint('copy_slice has own memory (base is None):', copy_slice.base is None)\nview_slice[0] = 999\nprint('Master after mutating view:', master)",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\nmaster = np.array([10, 20, 30, 40])\nview_slice = master[1:3]\ncopy_slice = master[1:3].copy()\nprint('view_slice shares buffer (base is master):', view_slice.base is master)\nprint('copy_slice has own memory (base is None):', copy_slice.base is None)\nview_slice[0] = 999\nprint('Master after mutating view:', master)",
      "expectedOutput": "view_slice shares buffer (base is master): True\ncopy_slice has own memory (base is None): True\nMaster after mutating view: [ 10 999  30  40]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "How can you programmatically verify whether an array is a view or an independent copy?",
        "hint": "Review the slicing rules.",
        "answer": "Inspect array.base: if it is None, the array owns its memory (copy); if it points to another array, it is a view."
      },
      {
        "id": "pq2",
        "question": "Does Understanding Views versus Copies in NumPy create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Understanding Views versus Copies in NumPy essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Understanding Views versus Copies in NumPy",
      "problem": "Create an array, take a slice, copy it, and check which one has .base is not None.",
      "difficulty": "Advanced",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\na = np.array([1, 2, 3])\nv = a[0:2]\nc = a[0:2].copy()\nprint('View has base:', v.base is not None)\nprint('Copy has base:', c.base is not None)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Understanding Views versus Copies in NumPy thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m2-l12",
      "nextLessonTitle": "Combining Indexing, Slicing & Filtering in Real Pipelines",
      "nextLessonModuleId": "numpy-module-2"
    }
  },
  "numpy-m2-l12": {
    "id": "numpy-m2-l12",
    "moduleId": "numpy-module-2",
    "title": "Combining Indexing, Slicing & Filtering in Real Pipelines",
    "subtitle": "Integrating boolean masks, dimension slicing, and fancy selection in data workflows",
    "order": 12,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage of Combining Indexing, Slicing & Filtering in Real Pipelines.",
      "Understand the underlying memory layout, strides, and complexity.",
      "Avoid common bugs, index errors, and unintended view mutations.",
      "Apply the technique to practical data science workflows."
    ],
    "prerequisites": [
      "NumPy Foundations",
      "Array attributes (.shape, .dtype)"
    ],
    "analogy": {
      "title": "Selecting Top Students in a Specific Exam",
      "text": "In a school gradebook, you might want to: (1) Pick students from Class A (row filter), (2) Select only Science and Math columns (column slice), and (3) Highlight scores above 85 (boolean mask). Real data science combines all three techniques seamlessly.",
      "metaphor": "Chaining and combining indexing modes enables precise, high-speed multi-axis data filtering."
    },
    "problemSolved": {
      "title": "Multi-Step Data Extraction and Querying",
      "description": "Real-world datasets contain thousands of rows and hundreds of columns. Combining row filters with column slices retrieves exact sub-matrices in a single concise line of code.",
      "keyPoints": [
        "Provides constant time O(1) or fast vectorized indexing.",
        "Eliminates slow nested Python for loops.",
        "Enables clean, expressive multi-dimensional coordinate access."
      ]
    },
    "intuition": {
      "overview": "Memory and strided navigation in Combining Indexing, Slicing & Filtering in Real Pipelines.",
      "steps": [
        {
          "step": 1,
          "title": "Coordinate Mapping",
          "description": "NumPy parses index coordinates or slicing bounds."
        },
        {
          "step": 2,
          "title": "Stride Arithmetic",
          "description": "Computes exact memory offsets without scanning elements."
        },
        {
          "step": 3,
          "title": "Buffer Return",
          "description": "Returns a view or newly allocated copy as appropriate."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Combining Indexing, Slicing & Filtering in Real Pipelines.",
      "foundations": [
        {
          "name": "Submatrix Selection",
          "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}",
          "explanation": "Coordinate restriction in linear algebra."
        },
        {
          "name": "Strided Offset",
          "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k",
          "explanation": "Multi-dimensional memory offset formula."
        }
      ]
    },
    "derivation": {
      "title": "Structural Complexity of Combining Indexing, Slicing & Filtering in Real Pipelines",
      "objective": "Verify the computational cost and view/copy properties.",
      "steps": [
        {
          "step": 1,
          "label": "Strided Navigation",
          "latex": "O(1) \\text{ for basic slicing (view)}",
          "explanation": "Adjusting shape and strides metadata takes constant time."
        },
        {
          "step": 2,
          "label": "Boolean/Fancy Indexing",
          "latex": "O(K) \\text{ for K extracted elements (copy)}",
          "explanation": "Requires creating a new contiguous buffer for non-regular elements."
        }
      ]
    },
    "variables": [
      {
        "symbol": "I",
        "name": "Row Indices",
        "description": "Selected row coordinates",
        "dimensions": "Index set"
      },
      {
        "symbol": "J",
        "name": "Column Indices",
        "description": "Selected column coordinates",
        "dimensions": "Index set"
      }
    ],
    "numericalExample": {
      "scenario": "School Gradebook Analytics",
      "dataset": [
        {
          "Record": 1,
          "Context": "Finding physics and chemistry scores for all students who scored > 80 in math.",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The indexing operation returned the exact expected values."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Combining Indexing, Slicing & Filtering in Real Pipelines",
      "description": "How Combining Indexing, Slicing & Filtering in Real Pipelines navigates and extracts data from the array buffer.",
      "features": [
        "Rows navigate along Axis 0 (down).",
        "Columns navigate along Axis 1 (across).",
        "Views share the parent buffer with updated strides."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\n# 4 students, 3 subjects (Math, Physics, Chemistry)\ngrades = np.array([\n    [75, 80, 85],\n    [92, 88, 95],\n    [60, 65, 70],\n    [88, 90, 82]\n])\n# Math scores (column 0) > 80\nmath_filter = grades[:, 0] > 80\nprint('Students with Math > 80 (Physics & Chem only):\\n', grades[math_filter, 1:])",
      "explanation": "Runnable example demonstrating the concept."
    },
    "sklearnCode": {
      "title": "Machine Learning Workflow Application",
      "code": "import numpy as np\n# 4 students, 3 subjects (Math, Physics, Chemistry)\ngrades = np.array([\n    [75, 80, 85],\n    [92, 88, 95],\n    [60, 65, 70],\n    [88, 90, 82]\n])\n# Math scores (column 0) > 80\nmath_filter = grades[:, 0] > 80\nprint('Students with Math > 80 (Physics & Chem only):\\n', grades[math_filter, 1:])",
      "explanation": "How feature matrices are sliced and indexed in model pipelines."
    },
    "runnableCode": {
      "code": "import numpy as np\n# 4 students, 3 subjects (Math, Physics, Chemistry)\ngrades = np.array([\n    [75, 80, 85],\n    [92, 88, 95],\n    [60, 65, 70],\n    [88, 90, 82]\n])\n# Math scores (column 0) > 80\nmath_filter = grades[:, 0] > 80\nprint('Students with Math > 80 (Physics & Chem only):\\n', grades[math_filter, 1:])",
      "expectedOutput": "Students with Math > 80 (Physics & Chem only):\n [[88 95]\n [90 82]]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Imports the NumPy package."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Indexing / Slicing execution",
        "explanation": "Performs the operation and prints the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "step",
        "defaultVal": "1",
        "range": "Integers (+ or -)",
        "effect": "Interval between elements in a slice",
        "recommendation": "Use -1 to reverse arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Valid bounds",
        "whyItMatters": "Out of bounds indices raise IndexError",
        "howToVerify": "Check array.shape beforehand"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidental view mutation",
        "solution": "Use .copy() when you need independence",
        "whyWrong": "Slices modify the parent array",
        "howToFix": "Call arr[slice].copy()"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Price Time-Series Slicing",
        "benefit": "Fast sliding window calculations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding Box Cropping",
        "benefit": "Cropping regions of interest without copying entire images."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Can you combine a boolean row mask with a column slice in the same index bracket?",
        "hint": "Review the slicing rules.",
        "answer": "Yes, grades[mask, 1:] uses a boolean mask on axis 0 and a slice on axis 1 simultaneously."
      },
      {
        "id": "pq2",
        "question": "Does Combining Indexing, Slicing & Filtering in Real Pipelines create a view or a copy?",
        "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.",
        "answer": "Basic slices create views; boolean and integer array indexing create copies."
      },
      {
        "id": "pq3",
        "question": "Why is Combining Indexing, Slicing & Filtering in Real Pipelines essential in machine learning?",
        "hint": "Think of train/test splits and feature extraction.",
        "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Which operation creates an independent copy rather than a view?",
        "options": [
          "arr[arr > 50] (Boolean indexing)",
          "arr[1:5] (Basic slicing)",
          "arr[::-1] (Reversal)",
          "arr.T (Transposition)"
        ],
        "correctIndex": 0,
        "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
      },
      {
        "id": "q2",
        "question": "What is the result of arr[1:4] on a 1D array?",
        "options": [
          "Elements at indices 1, 2, and 3",
          "Elements at indices 1, 2, 3, and 4",
          "Elements at indices 0, 1, 2, and 3",
          "Only element 1 and 4"
        ],
        "correctIndex": 0,
        "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
      },
      {
        "id": "q3",
        "question": "How do you check whether a slice is a view of an original array?",
        "options": [
          "slice.base is original",
          "slice.is_view()",
          "slice == original",
          "slice.view_check()"
        ],
        "correctIndex": 0,
        "explanation": "The .base attribute of a view references the parent array object."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Combining Indexing, Slicing & Filtering in Real Pipelines",
      "problem": "From a 3x3 matrix, select rows where column 0 is positive, and return only columns 1 and 2.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the example code above",
        "Check your index offsets"
      ],
      "starterCode": "import numpy as np\n# Your code here:\n",
      "solution": "import numpy as np\nm = np.array([[-1, 10, 20], [2, 30, 40], [5, 50, 60]])\nprint(m[m[:, 0] > 0, 1:])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Combining Indexing, Slicing & Filtering in Real Pipelines thoroughly.",
        "Understood view vs copy mechanics and memory footprint.",
        "Ready for the next lesson in the curriculum."
      ],
      "nextLessonId": "numpy-m3-l1",
      "nextLessonTitle": "Arithmetic Operations on Arrays",
      "nextLessonModuleId": "numpy-module-3"
    }
  }
};
