import { ModuleData, LessonContent } from '@/lib/types';

export const numpyModule3Data: ModuleData = {
  "id": "numpy-module-3",
  "number": 3,
  "title": "Array Operations and Broadcasting",
  "subtitle": "Mastering Vectorized Arithmetic, Comparison Masks, Universal Functions & Broadcasting",
  "description": "Discover the immense power of NumPy vectorization. Learn arithmetic operations, ufuncs, broadcasting rules, multi-axis reductions, sorting, and conditional filtering.",
  "icon": "Layers",
  "badge": "Operations & Broadcasting",
  "estimatedHours": 12,
  "topicsCount": 13,
  "lessons": [
    {
      "id": "numpy-m3-l1",
      "moduleId": "numpy-module-3",
      "title": "Arithmetic Operations on Arrays",
      "description": "Applying +, -, *, /, **, //, and % directly across arrays at hardware speeds",
      "order": 1,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m3-l2",
      "moduleId": "numpy-module-3",
      "title": "Element-Wise Calculations Across Arrays",
      "description": "Mathematical operations computed independently for every corresponding pair of elements",
      "order": 2,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m3-l3",
      "moduleId": "numpy-module-3",
      "title": "Comparison Operators (>, <, ==, !=, >=, <=)",
      "description": "Generating boolean masks through element-wise relational comparisons",
      "order": 3,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m3-l4",
      "moduleId": "numpy-module-3",
      "title": "Logical Operations (logical_and, logical_or, logical_not)",
      "description": "Combining multi-criteria conditions using bitwise operators (&, |, ~) and logical ufuncs",
      "order": 4,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m3-l5",
      "moduleId": "numpy-module-3",
      "title": "Universal Functions (sqrt, exp, log, abs)",
      "description": "High-performance vectorized mathematical functions operating element-wise",
      "order": 5,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m3-l6",
      "moduleId": "numpy-module-3",
      "title": "Broadcasting Rules and Dimension Alignment",
      "description": "Operating on arrays of different shapes without copying data in memory",
      "order": 6,
      "readTimeMinutes": 16,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m3-l7",
      "moduleId": "numpy-module-3",
      "title": "Aggregation Functions (sum, prod, cumsum, cumprod)",
      "description": "Collapsing array dimensions and computing running cumulative metrics",
      "order": 7,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m3-l8",
      "moduleId": "numpy-module-3",
      "title": "Understanding Axis 0 versus Axis 1 Across Matrices",
      "description": "Dissecting row-wise vs column-wise reductions and dimension collapse mechanics",
      "order": 8,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m3-l9",
      "moduleId": "numpy-module-3",
      "title": "Sorting Arrays (sort, argsort, lexsort)",
      "description": "Ordering numerical data and extracting permutation indices for multi-column sorting",
      "order": 9,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m3-l10",
      "moduleId": "numpy-module-3",
      "title": "Finding Unique Values & Counts with unique()",
      "description": "Deduplicating elements and computing frequency distributions in categorical data",
      "order": 10,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m3-l11",
      "moduleId": "numpy-module-3",
      "title": "Counting Occurrences & Histogram Binning (bincount)",
      "description": "Ultra-fast integer frequency counting and histogram computation",
      "order": 11,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m3-l12",
      "moduleId": "numpy-module-3",
      "title": "Searching Arrays (where, nonzero, argmax, argmin)",
      "description": "Locating indices of matching criteria, non-zero values, and peak extrema",
      "order": 12,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m3-l13",
      "moduleId": "numpy-module-3",
      "title": "Boolean Masks and Advanced Conditional Filtering",
      "description": "In-place conditional assignment and complex multi-clause array masking",
      "order": 13,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    }
  ]
};

export const numpyModule3Lessons: Record<string, LessonContent> = {
  "numpy-m3-l1": {
    "id": "numpy-m3-l1",
    "moduleId": "numpy-module-3",
    "title": "Arithmetic Operations on Arrays",
    "subtitle": "Applying +, -, *, /, **, //, and % directly across arrays at hardware speeds",
    "order": 1,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Arithmetic Operations on Arrays.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "An Assembly Line with Parallel Workers",
      "text": "Imagine 1,000 workers on an assembly line. When a batch of 1,000 car parts arrives, all 1,000 workers install a bolt at the exact same instant. In NumPy, array arithmetic executes in parallel across all elements simultaneously rather than one by one.",
      "metaphor": "Arithmetic operations apply element-by-element across arrays without explicit loops."
    },
    "problemSolved": {
      "title": "Slow Python Loops for Basic Arithmetic",
      "description": "Looping through large numbers with for i in range(len(a)): c.append(a[i] + b[i]) in pure Python wastes CPU cycles on pointer chasing. NumPy runs vector arithmetic in compiled C.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Arithmetic Operations on Arrays.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Arithmetic Operations on Arrays.",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Arithmetic Operations on Arrays",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Adjusting Employee Salaries",
      "dataset": [
        {
          "Record": 1,
          "Context": "Applying a 10% raise across all employee salary records: salaries * 1.10.",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Arithmetic Operations on Arrays",
      "description": "How Arithmetic Operations on Arrays operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\na = np.array([10, 20, 30, 40])\nb = np.array([2, 4, 5, 8])\nprint('Addition (a + b):', a + b)\nprint('Subtraction (a - b):', a - b)\nprint('Multiplication (a * b):', a * b)\nprint('Division (a / b):', a / b)\nprint('Exponentiation (a ** 2):', a ** 2)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\na = np.array([10, 20, 30, 40])\nb = np.array([2, 4, 5, 8])\nprint('Addition (a + b):', a + b)\nprint('Subtraction (a - b):', a - b)\nprint('Multiplication (a * b):', a * b)\nprint('Division (a / b):', a / b)\nprint('Exponentiation (a ** 2):', a ** 2)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\na = np.array([10, 20, 30, 40])\nb = np.array([2, 4, 5, 8])\nprint('Addition (a + b):', a + b)\nprint('Subtraction (a - b):', a - b)\nprint('Multiplication (a * b):', a * b)\nprint('Division (a / b):', a / b)\nprint('Exponentiation (a ** 2):', a ** 2)",
      "expectedOutput": "Addition (a + b): [12 24 35 48]\nSubtraction (a - b): [ 8 16 25 32]\nMultiplication (a * b): [ 20  80 150 320]\nDivision (a / b): [5. 5. 6. 5.]\nExponentiation (a ** 2): [ 100  400  900 1600]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What happens when you multiply two NumPy arrays with a * b?",
        "hint": "Think about array dimensions.",
        "answer": "It performs element-wise multiplication (Hadamard product), NOT matrix multiplication."
      },
      {
        "id": "pq2",
        "question": "Is Arithmetic Operations on Arrays vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Arithmetic Operations on Arrays benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Arithmetic Operations on Arrays in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Arithmetic Operations on Arrays",
      "problem": "Given quantities [5, 10, 2] and unit prices [20, 15, 50], calculate total line item costs.",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nq = np.array([5, 10, 2])\np = np.array([20, 15, 50])\nprint('Total costs:', q * p)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Arithmetic Operations on Arrays and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l2",
      "nextLessonTitle": "Element-Wise Calculations Across Arrays",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l2": {
    "id": "numpy-m3-l2",
    "moduleId": "numpy-module-3",
    "title": "Element-Wise Calculations Across Arrays",
    "subtitle": "Mathematical operations computed independently for every corresponding pair of elements",
    "order": 2,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Element-Wise Calculations Across Arrays.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Calculating Shopping Bill Totals for Multiple Customers",
      "text": "When 100 customers bring their shopping carts to the checkout registers, each register calculates (price * quantity) for that cart independently. Element-wise calculations operate on paired positions across matching arrays.",
      "metaphor": "Element-wise operations pair index i of array A with index i of array B."
    },
    "problemSolved": {
      "title": "Aligning Paired Measurements",
      "description": "In physics and data science, you frequently calculate differences or ratios between baseline and test measurements. Element-wise operations calculate paired metrics instantly.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Element-Wise Calculations Across Arrays.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Element-Wise Calculations Across Arrays.",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Element-Wise Calculations Across Arrays",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Calculating Machine Learning Prediction Residuals",
      "dataset": [
        {
          "Record": 1,
          "Context": "Subtracting model predictions from actual values to compute residuals.",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Element-Wise Calculations Across Arrays",
      "description": "How Element-Wise Calculations Across Arrays operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nactual = np.array([100, 150, 200])\npredicted = np.array([90, 160, 195])\nerrors = actual - predicted\nsquared_errors = errors ** 2\nprint('Errors:', errors)\nprint('Squared errors:', squared_errors)\nprint('Mean squared error:', np.mean(squared_errors))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nactual = np.array([100, 150, 200])\npredicted = np.array([90, 160, 195])\nerrors = actual - predicted\nsquared_errors = errors ** 2\nprint('Errors:', errors)\nprint('Squared errors:', squared_errors)\nprint('Mean squared error:', np.mean(squared_errors))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nactual = np.array([100, 150, 200])\npredicted = np.array([90, 160, 195])\nerrors = actual - predicted\nsquared_errors = errors ** 2\nprint('Errors:', errors)\nprint('Squared errors:', squared_errors)\nprint('Mean squared error:', np.mean(squared_errors))",
      "expectedOutput": "Errors: [ 10 -10   5]\nSquared errors: [100 100  25]\nMean squared error: 75.0"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Must two arrays have the exact same shape for element-wise operations?",
        "hint": "Think about array dimensions.",
        "answer": "They must either have the exact same shape or compatible dimensions that satisfy NumPy broadcasting rules."
      },
      {
        "id": "pq2",
        "question": "Is Element-Wise Calculations Across Arrays vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Element-Wise Calculations Across Arrays benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Element-Wise Calculations Across Arrays in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Element-Wise Calculations Across Arrays",
      "problem": "Compute percentage difference between today's prices [105, 95] and yesterday's [100, 100].",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\ntoday = np.array([105, 95])\nyesterday = np.array([100, 100])\npct = ((today - yesterday) / yesterday) * 100\nprint('Percentage change:', pct)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Element-Wise Calculations Across Arrays and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l3",
      "nextLessonTitle": "Comparison Operators (>, <, ==, !=, >=, <=)",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l3": {
    "id": "numpy-m3-l3",
    "moduleId": "numpy-module-3",
    "title": "Comparison Operators (>, <, ==, !=, >=, <=)",
    "subtitle": "Generating boolean masks through element-wise relational comparisons",
    "order": 3,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Comparison Operators (>, <, ==, !=, >=, <=).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Grading an Entire Class with a Passing Rubric",
      "text": "A teacher has a stack of 100 exam papers. Instead of reading each score slowly, a scanner marks every paper with score >= 50 as 'Pass' (True) and below 50 as 'Fail' (False). In NumPy, comparison operators return an array of booleans.",
      "metaphor": "Comparison operators return boolean arrays indicating condition satisfaction per element."
    },
    "problemSolved": {
      "title": "Generating Conditional Flags Without Looping",
      "description": "Conditional queries in databases require selecting rows matching criteria. NumPy comparisons produce boolean masks that can filter data or count matches vectorially.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Comparison Operators (>, <, ==, !=, >=, <=).",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Comparison Operators (>, <, ==, !=, >=, <=).",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Comparison Operators (>, <, ==, !=, >=, <=)",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Detecting Speed Limit Violations",
      "dataset": [
        {
          "Record": 1,
          "Context": "Identifying traffic sensor vehicles exceeding 65 mph.",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Comparison Operators (>, <, ==, !=, >=, <=)",
      "description": "How Comparison Operators (>, <, ==, !=, >=, <=) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nspeeds = np.array([55, 72, 60, 85, 45, 90])\nspeed_limit = 65\nspeeding_mask = speeds > speed_limit\nprint('Speeds:', speeds)\nprint('Speeding mask (> 65):', speeding_mask)\nprint('Total speeders:', np.sum(speeding_mask))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nspeeds = np.array([55, 72, 60, 85, 45, 90])\nspeed_limit = 65\nspeeding_mask = speeds > speed_limit\nprint('Speeds:', speeds)\nprint('Speeding mask (> 65):', speeding_mask)\nprint('Total speeders:', np.sum(speeding_mask))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nspeeds = np.array([55, 72, 60, 85, 45, 90])\nspeed_limit = 65\nspeeding_mask = speeds > speed_limit\nprint('Speeds:', speeds)\nprint('Speeding mask (> 65):', speeding_mask)\nprint('Total speeders:', np.sum(speeding_mask))",
      "expectedOutput": "Speeds: [55 72 60 85 45 90]\nSpeeding mask (> 65): [False  True False  True False  True]\nTotal speeders: 3"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What data type is produced by comparing a NumPy array with a scalar (e.g. arr > 10)?",
        "hint": "Think about array dimensions.",
        "answer": "It returns an array of boolean values (dtype=bool)."
      },
      {
        "id": "pq2",
        "question": "Is Comparison Operators (>, <, ==, !=, >=, <=) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Comparison Operators (>, <, ==, !=, >=, <=) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Comparison Operators (>, <, ==, !=, >=, <=) in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Comparison Operators (>, <, ==, !=, >=, <=)",
      "problem": "Create an array of test scores [45, 80, 95, 60] and check which scores are at least 70.",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nscores = np.array([45, 80, 95, 60])\nprint(scores >= 70)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Comparison Operators (>, <, ==, !=, >=, <=) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l4",
      "nextLessonTitle": "Logical Operations (logical_and, logical_or, logical_not)",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l4": {
    "id": "numpy-m3-l4",
    "moduleId": "numpy-module-3",
    "title": "Logical Operations (logical_and, logical_or, logical_not)",
    "subtitle": "Combining multi-criteria conditions using bitwise operators (&, |, ~) and logical ufuncs",
    "order": 4,
    "readTimeMinutes": 12,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Logical Operations (logical_and, logical_or, logical_not).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Job Hiring Criteria with Multiple Requirements",
      "text": "A recruiter searches for candidates who have: (Experience > 3 years) AND (Degree == 'CS'). In NumPy, you combine conditions using the bitwise & operator (or np.logical_and), wrapping each condition in parentheses.",
      "metaphor": "Use & for element-wise AND, | for OR, and ~ for NOT on NumPy boolean masks."
    },
    "problemSolved": {
      "title": "The Python 'and' / 'or' Trap on Arrays",
      "description": "Using Python's built-in 'and' or 'or' on arrays throws 'ValueError: The truth value of an array with more than one element is ambiguous'. You must use & and |.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Logical Operations (logical_and, logical_or, logical_not).",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Logical Operations (logical_and, logical_or, logical_not).",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Logical Operations (logical_and, logical_or, logical_not)",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Voter Eligibility Filtering",
      "dataset": [
        {
          "Record": 1,
          "Context": "Selecting citizens eligible for jury duty (age >= 18 and age <= 65).",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Logical Operations (logical_and, logical_or, logical_not)",
      "description": "How Logical Operations (logical_and, logical_or, logical_not) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nages = np.array([16, 22, 35, 14, 68, 42])\n# Eligible voters between 18 and 65\neligible = (ages >= 18) & (ages <= 65)\nprint('Ages:', ages)\nprint('Eligible mask:', eligible)\nprint('Eligible ages:', ages[eligible])",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nages = np.array([16, 22, 35, 14, 68, 42])\n# Eligible voters between 18 and 65\neligible = (ages >= 18) & (ages <= 65)\nprint('Ages:', ages)\nprint('Eligible mask:', eligible)\nprint('Eligible ages:', ages[eligible])",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nages = np.array([16, 22, 35, 14, 68, 42])\n# Eligible voters between 18 and 65\neligible = (ages >= 18) & (ages <= 65)\nprint('Ages:', ages)\nprint('Eligible mask:', eligible)\nprint('Eligible ages:', ages[eligible])",
      "expectedOutput": "Ages: [16 22 35 14 68 42]\nEligible mask: [False  True  True False False  True]\nEligible ages: [22 35 42]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Why must you wrap conditions in parentheses like (a > 5) & (b < 10) in NumPy?",
        "hint": "Think about array dimensions.",
        "answer": "Bitwise operators like & have higher operator precedence than comparison operators (> or <). Without parentheses, Python evaluates 5 & b first."
      },
      {
        "id": "pq2",
        "question": "Is Logical Operations (logical_and, logical_or, logical_not) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Logical Operations (logical_and, logical_or, logical_not) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Logical Operations (logical_and, logical_or, logical_not) in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Logical Operations (logical_and, logical_or, logical_not)",
      "problem": "Find numbers in arr = np.arange(10) that are greater than 2 AND less than 8.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\narr = np.arange(10)\nprint(arr[(arr > 2) & (arr < 8)])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Logical Operations (logical_and, logical_or, logical_not) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l5",
      "nextLessonTitle": "Universal Functions (sqrt, exp, log, abs)",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l5": {
    "id": "numpy-m3-l5",
    "moduleId": "numpy-module-3",
    "title": "Universal Functions (sqrt, exp, log, abs)",
    "subtitle": "High-performance vectorized mathematical functions operating element-wise",
    "order": 5,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Universal Functions (sqrt, exp, log, abs).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Scientific Calculators with One-Touch Operation Keys",
      "text": "A scientific calculator has a 'sqrt' key. When pressed on an array of numbers, it transforms all values in parallel. NumPy universal functions (ufuncs) are pre-compiled C routines executing on strided buffers.",
      "metaphor": "Ufuncs wrap fast C loops that compute math functions over ndarrays with SIMD speed."
    },
    "problemSolved": {
      "title": "Mathematical Domain Errors & NaN Handling",
      "description": "Computing log(-1) or sqrt(-1) in pure Python crashes with ValueError. NumPy ufuncs gracefully return np.nan (Not a Number) and issue a runtime warning without crashing the pipeline.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Universal Functions (sqrt, exp, log, abs).",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Universal Functions (sqrt, exp, log, abs).",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Universal Functions (sqrt, exp, log, abs)",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Log-Transforming Skewed House Prices",
      "dataset": [
        {
          "Record": 1,
          "Context": "Applying natural log transformation to compress skewed financial data.",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Universal Functions (sqrt, exp, log, abs)",
      "description": "How Universal Functions (sqrt, exp, log, abs) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nx = np.array([1.0, 4.0, 9.0, 16.0])\nprint('sqrt(x):', np.sqrt(x))\nprint('exp(x/4):', np.exp(x / 4))\nprint('log(x):', np.log(x))\nneg = np.array([-5, 10, -20])\nprint('abs(neg):', np.abs(neg))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nx = np.array([1.0, 4.0, 9.0, 16.0])\nprint('sqrt(x):', np.sqrt(x))\nprint('exp(x/4):', np.exp(x / 4))\nprint('log(x):', np.log(x))\nneg = np.array([-5, 10, -20])\nprint('abs(neg):', np.abs(neg))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nx = np.array([1.0, 4.0, 9.0, 16.0])\nprint('sqrt(x):', np.sqrt(x))\nprint('exp(x/4):', np.exp(x / 4))\nprint('log(x):', np.log(x))\nneg = np.array([-5, 10, -20])\nprint('abs(neg):', np.abs(neg))",
      "expectedOutput": "sqrt(x): [1. 2. 3. 4.]\nexp(x/4): [ 1.28402542  2.71828183  9.48773584 54.59815003]\nlog(x): [0.         1.38629436 2.19722458 2.77258872]\nabs(neg): [ 5 10 20]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What does np.log() calculate by default in NumPy?",
        "hint": "Think about array dimensions.",
        "answer": "np.log() calculates the natural logarithm (base e), NOT base 10."
      },
      {
        "id": "pq2",
        "question": "Is Universal Functions (sqrt, exp, log, abs) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Universal Functions (sqrt, exp, log, abs) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Universal Functions (sqrt, exp, log, abs) in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Universal Functions (sqrt, exp, log, abs)",
      "problem": "Compute the square root of numbers [25, 49, 81, 100] using NumPy.",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nprint(np.sqrt(np.array([25, 49, 81, 100])))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Universal Functions (sqrt, exp, log, abs) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l6",
      "nextLessonTitle": "Broadcasting Rules and Dimension Alignment",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l6": {
    "id": "numpy-m3-l6",
    "moduleId": "numpy-module-3",
    "title": "Broadcasting Rules and Dimension Alignment",
    "subtitle": "Operating on arrays of different shapes without copying data in memory",
    "order": 6,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Broadcasting Rules and Dimension Alignment.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Stretching a Stamp Across a Full Page",
      "text": "Imagine you have a single rubber stamp with your signature (shape 1) and a column of 5 documents (shape 5, 1). Broadcasting 'stretches' the stamp vertically to sign all 5 documents without creating 5 physical rubber stamps.",
      "metaphor": "Broadcasting aligns trailing dimensions from right to left; dimensions match if they are equal or one of them is 1."
    },
    "problemSolved": {
      "title": "Memory Waste from Manual Array Tiling",
      "description": "Using np.tile() or np.repeat() to duplicate rows consumes massive RAM. Broadcasting simulates duplication virtually by setting strides to 0, achieving the same result with zero extra memory.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Broadcasting Rules and Dimension Alignment.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Broadcasting Rules and Dimension Alignment.",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Broadcasting Rules and Dimension Alignment",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Centering Features by Subtracting Mean",
      "dataset": [
        {
          "Record": 1,
          "Context": "Subtracting a 1D mean vector of shape (D,) from a 2D data matrix of shape (N, D).",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Broadcasting Rules and Dimension Alignment",
      "description": "How Broadcasting Rules and Dimension Alignment operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nmatrix = np.array([\n    [10, 20, 30],\n    [40, 50, 60]\n])\nrow_vector = np.array([1, 2, 3])  # Shape (3,) broadcasts to (2, 3)\nresult = matrix + row_vector\nprint('Matrix (2, 3):\\n', matrix)\nprint('Row vector (3,):', row_vector)\nprint('Broadcast sum:\\n', result)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nmatrix = np.array([\n    [10, 20, 30],\n    [40, 50, 60]\n])\nrow_vector = np.array([1, 2, 3])  # Shape (3,) broadcasts to (2, 3)\nresult = matrix + row_vector\nprint('Matrix (2, 3):\\n', matrix)\nprint('Row vector (3,):', row_vector)\nprint('Broadcast sum:\\n', result)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nmatrix = np.array([\n    [10, 20, 30],\n    [40, 50, 60]\n])\nrow_vector = np.array([1, 2, 3])  # Shape (3,) broadcasts to (2, 3)\nresult = matrix + row_vector\nprint('Matrix (2, 3):\\n', matrix)\nprint('Row vector (3,):', row_vector)\nprint('Broadcast sum:\\n', result)",
      "expectedOutput": "Matrix (2, 3):\n [[10 20 30]\n [40 50 60]]\nRow vector (3,): [1 2 3]\nBroadcast sum:\n [[11 22 33]\n [41 52 63]]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "State the fundamental rule of NumPy broadcasting.",
        "hint": "Think about array dimensions.",
        "answer": "Starting from the trailing (rightmost) dimensions, two shapes are compatible if they are equal or one of them is 1."
      },
      {
        "id": "pq2",
        "question": "Is Broadcasting Rules and Dimension Alignment vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Broadcasting Rules and Dimension Alignment benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Broadcasting Rules and Dimension Alignment in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Broadcasting Rules and Dimension Alignment",
      "problem": "Add a 1D array of 3 numbers to a 3x3 matrix using broadcasting.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nm = np.ones((3, 3))\nv = np.array([10, 20, 30])\nprint(m + v)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Broadcasting Rules and Dimension Alignment and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l7",
      "nextLessonTitle": "Aggregation Functions (sum, prod, cumsum, cumprod)",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l7": {
    "id": "numpy-m3-l7",
    "moduleId": "numpy-module-3",
    "title": "Aggregation Functions (sum, prod, cumsum, cumprod)",
    "subtitle": "Collapsing array dimensions and computing running cumulative metrics",
    "order": 7,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Aggregation Functions (sum, prod, cumsum, cumprod).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Adding Up Cash Register Receipts at the End of the Day",
      "text": "At the end of a business day, the shop manager adds up all receipts into a single total revenue figure (sum). A running bank balance that updates with each transaction is a cumulative sum (cumsum).",
      "metaphor": "Aggregations reduce arrays across specified axes into scalar summaries or lower-rank tensors."
    },
    "problemSolved": {
      "title": "Accumulating Multi-Dimensional Totals",
      "description": "Data science requires summarizing data across different groups. NumPy aggregations collapse specific dimensions smoothly.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Aggregation Functions (sum, prod, cumsum, cumprod).",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Aggregation Functions (sum, prod, cumsum, cumprod).",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Aggregation Functions (sum, prod, cumsum, cumprod)",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Running Bank Account Balance",
      "dataset": [
        {
          "Record": 1,
          "Context": "Calculating account balance after a sequence of deposits: cumsum([100, 50, -20, 200]).",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Aggregation Functions (sum, prod, cumsum, cumprod)",
      "description": "How Aggregation Functions (sum, prod, cumsum, cumprod) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nvals = np.array([10, 20, 30, 40])\nprint('Sum:', np.sum(vals))\nprint('Product:', np.prod(vals))\nprint('Cumulative sum (running total):', np.cumsum(vals))\nprint('Cumulative product:', np.cumprod(np.array([1, 2, 3, 4])))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nvals = np.array([10, 20, 30, 40])\nprint('Sum:', np.sum(vals))\nprint('Product:', np.prod(vals))\nprint('Cumulative sum (running total):', np.cumsum(vals))\nprint('Cumulative product:', np.cumprod(np.array([1, 2, 3, 4])))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nvals = np.array([10, 20, 30, 40])\nprint('Sum:', np.sum(vals))\nprint('Product:', np.prod(vals))\nprint('Cumulative sum (running total):', np.cumsum(vals))\nprint('Cumulative product:', np.cumprod(np.array([1, 2, 3, 4])))",
      "expectedOutput": "Sum: 100\nProduct: 240000\nCumulative sum (running total): [ 10  30  60 100]\nCumulative product: [ 1  2  6 24]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What is the difference between np.sum() and np.cumsum()?",
        "hint": "Think about array dimensions.",
        "answer": "np.sum() collapses the array into a single total scalar, whereas np.cumsum() returns an array of the running cumulative total at each step."
      },
      {
        "id": "pq2",
        "question": "Is Aggregation Functions (sum, prod, cumsum, cumprod) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Aggregation Functions (sum, prod, cumsum, cumprod) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Aggregation Functions (sum, prod, cumsum, cumprod) in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Aggregation Functions (sum, prod, cumsum, cumprod)",
      "problem": "Compute the cumulative sum of sales [50, 75, 100, 25].",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nprint(np.cumsum(np.array([50, 75, 100, 25])))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Aggregation Functions (sum, prod, cumsum, cumprod) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l8",
      "nextLessonTitle": "Understanding Axis 0 versus Axis 1 Across Matrices",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l8": {
    "id": "numpy-m3-l8",
    "moduleId": "numpy-module-3",
    "title": "Understanding Axis 0 versus Axis 1 Across Matrices",
    "subtitle": "Dissecting row-wise vs column-wise reductions and dimension collapse mechanics",
    "order": 8,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Understanding Axis 0 versus Axis 1 Across Matrices.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Squashing a Cardboard Box Downwards vs Sideways",
      "text": "Imagine a 2D grid of numbers. If a giant hydraulic press squashes the box downwards (vertically), all rows collapse down into a single row along the columns (axis=0). If you squash it sideways (horizontally), all columns collapse into a single column along the rows (axis=1).",
      "metaphor": "axis=0 collapses rows (computes statistics down each column); axis=1 collapses columns (computes statistics across each row)."
    },
    "problemSolved": {
      "title": "The Universal Beginner Axis Confusion",
      "description": "Most beginners assume axis=0 means 'perform operation on rows'. In fact, axis=0 collapses along the row direction, giving you per-column results.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Understanding Axis 0 versus Axis 1 Across Matrices.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Understanding Axis 0 versus Axis 1 Across Matrices.",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Understanding Axis 0 versus Axis 1 Across Matrices",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Student Report Card Analytics",
      "dataset": [
        {
          "Record": 1,
          "Context": "Computing subject-wise class averages (axis=0) and student-wise GPAs (axis=1).",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Understanding Axis 0 versus Axis 1 Across Matrices",
      "description": "How Understanding Axis 0 versus Axis 1 Across Matrices operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\n# 3 students, 2 subjects (Math, English)\ngrades = np.array([\n    [80, 90],\n    [70, 85],\n    [95, 92]\n])\nsubject_means = np.mean(grades, axis=0)  # Down columns: Math mean, English mean\nstudent_means = np.mean(grades, axis=1)  # Across rows: Student 0, 1, 2 means\nprint('Grades:\\n', grades)\nprint('Subject averages (axis=0):', subject_means)\nprint('Student averages (axis=1):', student_means)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\n# 3 students, 2 subjects (Math, English)\ngrades = np.array([\n    [80, 90],\n    [70, 85],\n    [95, 92]\n])\nsubject_means = np.mean(grades, axis=0)  # Down columns: Math mean, English mean\nstudent_means = np.mean(grades, axis=1)  # Across rows: Student 0, 1, 2 means\nprint('Grades:\\n', grades)\nprint('Subject averages (axis=0):', subject_means)\nprint('Student averages (axis=1):', student_means)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\n# 3 students, 2 subjects (Math, English)\ngrades = np.array([\n    [80, 90],\n    [70, 85],\n    [95, 92]\n])\nsubject_means = np.mean(grades, axis=0)  # Down columns: Math mean, English mean\nstudent_means = np.mean(grades, axis=1)  # Across rows: Student 0, 1, 2 means\nprint('Grades:\\n', grades)\nprint('Subject averages (axis=0):', subject_means)\nprint('Student averages (axis=1):', student_means)",
      "expectedOutput": "Grades:\n [[80 90]\n [70 85]\n [95 92]]\nSubject averages (axis=0): [81.66666667 89.        ]\nStudent averages (axis=1): [85.  77.5 93.5]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "In a 2D matrix of shape (5, 4), what is the shape of np.sum(matrix, axis=0)?",
        "hint": "Think about array dimensions.",
        "answer": "The shape is (4,) because axis 0 (size 5) was collapsed."
      },
      {
        "id": "pq2",
        "question": "Is Understanding Axis 0 versus Axis 1 Across Matrices vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Understanding Axis 0 versus Axis 1 Across Matrices benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Understanding Axis 0 versus Axis 1 Across Matrices in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Understanding Axis 0 versus Axis 1 Across Matrices",
      "problem": "Given a 2x3 matrix, calculate the sum across columns for each row (axis=1).",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nm = np.array([[1, 2, 3], [4, 5, 6]])\nprint(np.sum(m, axis=1))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Understanding Axis 0 versus Axis 1 Across Matrices and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l9",
      "nextLessonTitle": "Sorting Arrays (sort, argsort, lexsort)",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l9": {
    "id": "numpy-m3-l9",
    "moduleId": "numpy-module-3",
    "title": "Sorting Arrays (sort, argsort, lexsort)",
    "subtitle": "Ordering numerical data and extracting permutation indices for multi-column sorting",
    "order": 9,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Sorting Arrays (sort, argsort, lexsort).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Ordering Contestants by Height vs Giving Contestants Rank Numbers",
      "text": "np.sort() rearranges the actual contestants in line from shortest to tallest. np.argsort() leaves the contestants standing where they are and hands them rank badges telling you which order to call them.",
      "metaphor": "sort() returns sorted values; argsort() returns the index permutation that sorts the array."
    },
    "problemSolved": {
      "title": "Sorting Paired Datasets (Features and Labels Together)",
      "description": "If you sort student scores with np.sort(), you lose which score belongs to which student name. np.argsort() gives the index permutation to sort both scores and names together.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Sorting Arrays (sort, argsort, lexsort).",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Sorting Arrays (sort, argsort, lexsort).",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Sorting Arrays (sort, argsort, lexsort)",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Leaderboard Generation",
      "dataset": [
        {
          "Record": 1,
          "Context": "Sorting players by score in descending order using sort_indices[::-1].",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Sorting Arrays (sort, argsort, lexsort)",
      "description": "How Sorting Arrays (sort, argsort, lexsort) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nscores = np.array([45, 92, 78, 64])\nnames = np.array(['Alice', 'Bob', 'Charlie', 'David'])\nsorted_scores = np.sort(scores)\nsort_indices = np.argsort(scores)\nprint('Original scores:', scores)\nprint('Sorted scores:', sorted_scores)\nprint('Sort indices (argsort):', sort_indices)\nprint('Names sorted by score:', names[sort_indices])",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nscores = np.array([45, 92, 78, 64])\nnames = np.array(['Alice', 'Bob', 'Charlie', 'David'])\nsorted_scores = np.sort(scores)\nsort_indices = np.argsort(scores)\nprint('Original scores:', scores)\nprint('Sorted scores:', sorted_scores)\nprint('Sort indices (argsort):', sort_indices)\nprint('Names sorted by score:', names[sort_indices])",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nscores = np.array([45, 92, 78, 64])\nnames = np.array(['Alice', 'Bob', 'Charlie', 'David'])\nsorted_scores = np.sort(scores)\nsort_indices = np.argsort(scores)\nprint('Original scores:', scores)\nprint('Sorted scores:', sorted_scores)\nprint('Sort indices (argsort):', sort_indices)\nprint('Names sorted by score:', names[sort_indices])",
      "expectedOutput": "Original scores: [45 92 78 64]\nSorted scores: [45 64 78 92]\nSort indices (argsort): [0 3 2 1]\nNames sorted by score: ['Alice' 'David' 'Charlie' 'Bob']"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What does np.argsort() return?",
        "hint": "Think about array dimensions.",
        "answer": "It returns an integer array of indices that would sort the input array."
      },
      {
        "id": "pq2",
        "question": "Is Sorting Arrays (sort, argsort, lexsort) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Sorting Arrays (sort, argsort, lexsort) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Sorting Arrays (sort, argsort, lexsort) in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Sorting Arrays (sort, argsort, lexsort)",
      "problem": "Sort an array of prices [150, 45, 200, 99] and find the index of the cheapest item.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nprices = np.array([150, 45, 200, 99])\nprint('Cheapest index:', np.argsort(prices)[0])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Sorting Arrays (sort, argsort, lexsort) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l10",
      "nextLessonTitle": "Finding Unique Values & Counts with unique()",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l10": {
    "id": "numpy-m3-l10",
    "moduleId": "numpy-module-3",
    "title": "Finding Unique Values & Counts with unique()",
    "subtitle": "Deduplicating elements and computing frequency distributions in categorical data",
    "order": 10,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Finding Unique Values & Counts with unique().",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Counting Unique Colored Marbles in a Jar",
      "text": "If you dump a jar of 500 red, blue, and green marbles, np.unique() tells you: 'There are only 3 distinct colors (red, blue, green), and here is the exact count for each color.'",
      "metaphor": "np.unique() finds distinct values and optionally returns inverse indices and frequency counts."
    },
    "problemSolved": {
      "title": "Finding Unique Class Labels in Machine Learning",
      "description": "Classification tasks require knowing all unique class labels (e.g. ['Cat', 'Dog', 'Bird']) and checking for class imbalance. np.unique(y, return_counts=True) gives both in one pass.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Finding Unique Values & Counts with unique().",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Finding Unique Values & Counts with unique().",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Finding Unique Values & Counts with unique()",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Auditing Medical Diagnosis Classes",
      "dataset": [
        {
          "Record": 1,
          "Context": "Checking patient cohort distribution across diagnostic categories.",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Finding Unique Values & Counts with unique()",
      "description": "How Finding Unique Values & Counts with unique() operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nlabels = np.array(['Dog', 'Cat', 'Dog', 'Dog', 'Bird', 'Cat'])\nuniques, counts = np.unique(labels, return_counts=True)\nprint('Unique labels:', uniques)\nprint('Counts per label:', counts)\nfor u, c in zip(uniques, counts):\n    print(f'{u}: {c}')",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nlabels = np.array(['Dog', 'Cat', 'Dog', 'Dog', 'Bird', 'Cat'])\nuniques, counts = np.unique(labels, return_counts=True)\nprint('Unique labels:', uniques)\nprint('Counts per label:', counts)\nfor u, c in zip(uniques, counts):\n    print(f'{u}: {c}')",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nlabels = np.array(['Dog', 'Cat', 'Dog', 'Dog', 'Bird', 'Cat'])\nuniques, counts = np.unique(labels, return_counts=True)\nprint('Unique labels:', uniques)\nprint('Counts per label:', counts)\nfor u, c in zip(uniques, counts):\n    print(f'{u}: {c}')",
      "expectedOutput": "Unique labels: ['Bird' 'Cat' 'Dog']\nCounts per label: [1 2 3]\nBird: 1\nCat: 2\nDog: 3"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What parameter in np.unique() returns the count of each unique value?",
        "hint": "Think about array dimensions.",
        "answer": "The parameter is return_counts=True."
      },
      {
        "id": "pq2",
        "question": "Is Finding Unique Values & Counts with unique() vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Finding Unique Values & Counts with unique() benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Finding Unique Values & Counts with unique() in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Finding Unique Values & Counts with unique()",
      "problem": "Find the unique numbers and their counts in np.array([1, 2, 2, 3, 3, 3, 4]).",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nvals, counts = np.unique(np.array([1, 2, 2, 3, 3, 3, 4]), return_counts=True)\nprint(vals, counts)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Finding Unique Values & Counts with unique() and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l11",
      "nextLessonTitle": "Counting Occurrences & Histogram Binning (bincount)",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l11": {
    "id": "numpy-m3-l11",
    "moduleId": "numpy-module-3",
    "title": "Counting Occurrences & Histogram Binning (bincount)",
    "subtitle": "Ultra-fast integer frequency counting and histogram computation",
    "order": 11,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Counting Occurrences & Histogram Binning (bincount).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Sorting Election Ballots into Candidate Bins",
      "text": "In an election with Candidate 0, 1, and 2, election workers drop each paper ballot into Bin 0, Bin 1, or Bin 2. At the end, they simply count the height of each bin. np.bincount() counts non-negative integer occurrences at C speed.",
      "metaphor": "bincount() counts occurrences of non-negative integers up to the maximum value in O(N)."
    },
    "problemSolved": {
      "title": "Fast Categorical Aggregations and Mode Calculation",
      "description": "Finding the most frequent integer (mode) or computing categorical histograms is significantly faster with bincount() than generic dictionary counting.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Counting Occurrences & Histogram Binning (bincount).",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Counting Occurrences & Histogram Binning (bincount).",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Counting Occurrences & Histogram Binning (bincount)",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Product Star Rating Analysis",
      "dataset": [
        {
          "Record": 1,
          "Context": "Computing customer review distributions from 1-star to 5-star ratings.",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Counting Occurrences & Histogram Binning (bincount)",
      "description": "How Counting Occurrences & Histogram Binning (bincount) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nratings = np.array([5, 4, 5, 3, 5, 4, 1, 5, 2])\ncounts = np.bincount(ratings)\nprint('Rating counts (index is rating score):', counts)\nprint('Most frequent rating (argmax of counts):', np.argmax(counts))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nratings = np.array([5, 4, 5, 3, 5, 4, 1, 5, 2])\ncounts = np.bincount(ratings)\nprint('Rating counts (index is rating score):', counts)\nprint('Most frequent rating (argmax of counts):', np.argmax(counts))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nratings = np.array([5, 4, 5, 3, 5, 4, 1, 5, 2])\ncounts = np.bincount(ratings)\nprint('Rating counts (index is rating score):', counts)\nprint('Most frequent rating (argmax of counts):', np.argmax(counts))",
      "expectedOutput": "Rating counts (index is rating score): [0 1 1 1 2 4]\nMost frequent rating (argmax of counts): 5"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Can np.bincount() be used on floating-point numbers or negative integers?",
        "hint": "Think about array dimensions.",
        "answer": "No, np.bincount() only accepts 1D arrays of non-negative integers."
      },
      {
        "id": "pq2",
        "question": "Is Counting Occurrences & Histogram Binning (bincount) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Counting Occurrences & Histogram Binning (bincount) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Counting Occurrences & Histogram Binning (bincount) in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Counting Occurrences & Histogram Binning (bincount)",
      "problem": "Count the frequency of die rolls [1, 6, 3, 6, 2, 6, 4] using np.bincount().",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nrolls = np.array([1, 6, 3, 6, 2, 6, 4])\nprint('Counts (0 to 6):', np.bincount(rolls))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Counting Occurrences & Histogram Binning (bincount) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l12",
      "nextLessonTitle": "Searching Arrays (where, nonzero, argmax, argmin)",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l12": {
    "id": "numpy-m3-l12",
    "moduleId": "numpy-module-3",
    "title": "Searching Arrays (where, nonzero, argmax, argmin)",
    "subtitle": "Locating indices of matching criteria, non-zero values, and peak extrema",
    "order": 12,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Searching Arrays (where, nonzero, argmax, argmin).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A Metal Detector on a Beach",
      "text": "Walking across a beach with a metal detector, it beeps only when metal is found underfoot and tells you the exact GPS coordinate. np.where() finds the exact indices where a condition is True.",
      "metaphor": "where() returns indices matching conditions; argmax() and argmin() locate global extrema."
    },
    "problemSolved": {
      "title": "Finding Top Predictions and Outlier Locations",
      "description": "In classification models, outputting the predicted class label requires finding the index with the maximum probability: np.argmax(probs, axis=1).",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Searching Arrays (where, nonzero, argmax, argmin).",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Searching Arrays (where, nonzero, argmax, argmin).",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Searching Arrays (where, nonzero, argmax, argmin)",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Peak Temperature Spike Detection",
      "dataset": [
        {
          "Record": 1,
          "Context": "Locating the exact hour of maximum sensor temperature during a heatwave.",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Searching Arrays (where, nonzero, argmax, argmin)",
      "description": "How Searching Arrays (where, nonzero, argmax, argmin) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nvals = np.array([12, 45, 98, 23, 76, 98])\nprint('Index of max value (argmax):', np.argmax(vals))\nprint('Index of min value (argmin):', np.argmin(vals))\nprint('Indices where value > 50:', np.where(vals > 50)[0])",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nvals = np.array([12, 45, 98, 23, 76, 98])\nprint('Index of max value (argmax):', np.argmax(vals))\nprint('Index of min value (argmin):', np.argmin(vals))\nprint('Indices where value > 50:', np.where(vals > 50)[0])",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nvals = np.array([12, 45, 98, 23, 76, 98])\nprint('Index of max value (argmax):', np.argmax(vals))\nprint('Index of min value (argmin):', np.argmin(vals))\nprint('Indices where value > 50:', np.where(vals > 50)[0])",
      "expectedOutput": "Index of max value (argmax): 2\nIndex of min value (argmin): 0\nIndices where value > 50: [2 4 5]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "What does np.argmax() return if there are multiple occurrences of the maximum value?",
        "hint": "Think about array dimensions.",
        "answer": "It returns the index of the first occurrence of the maximum value."
      },
      {
        "id": "pq2",
        "question": "Is Searching Arrays (where, nonzero, argmax, argmin) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Searching Arrays (where, nonzero, argmax, argmin) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Searching Arrays (where, nonzero, argmax, argmin) in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Searching Arrays (where, nonzero, argmax, argmin)",
      "problem": "Find the index of the minimum value in np.array([45, 12, 89, 7, 23]).",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.array([45, 12, 89, 7, 23])\nprint('Min index:', np.argmin(a))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Searching Arrays (where, nonzero, argmax, argmin) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m3-l13",
      "nextLessonTitle": "Boolean Masks and Advanced Conditional Filtering",
      "nextLessonModuleId": "numpy-module-3"
    }
  },
  "numpy-m3-l13": {
    "id": "numpy-m3-l13",
    "moduleId": "numpy-module-3",
    "title": "Boolean Masks and Advanced Conditional Filtering",
    "subtitle": "In-place conditional assignment and complex multi-clause array masking",
    "order": 13,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Boolean Masks and Advanced Conditional Filtering.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A Photo Editing Stencil",
      "text": "When an artist paints through a paper stencil, paint only sticks to the cutout shapes (True) while the covered paper (False) remains untouched. A boolean mask protects certain elements while mutating others in place.",
      "metaphor": "Boolean masks allow reading or updating specific array subsets in-place vectorially."
    },
    "problemSolved": {
      "title": "Replacing Outliers and Clipping Extremes In-Place",
      "description": "In sensor telemetry, invalid noise spikes (e.g. temperature > 1000) must be replaced with a capped ceiling or NaN without copying the array. Mask assignment updates targeted elements in place.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Boolean Masks and Advanced Conditional Filtering.",
      "steps": [
        {
          "step": 1,
          "title": "Memory Inspection",
          "description": "NumPy evaluates shapes, strides, and contiguity."
        },
        {
          "step": 2,
          "title": "Index / Axis Alignment",
          "description": "Computes exact element offsets using strided arithmetic."
        },
        {
          "step": 3,
          "title": "Hardware Execution",
          "description": "Runs hardware-accelerated SIMD instructions over the data buffer."
        }
      ]
    },
    "mathematics": {
      "overview": "Mathematical foundations for Boolean Masks and Advanced Conditional Filtering.",
      "foundations": [
        {
          "name": "Tensor Operation",
          "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}",
          "explanation": "General multi-axis transformation."
        },
        {
          "name": "Element Mapping",
          "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]",
          "explanation": "Vectorized element-wise calculation."
        }
      ]
    },
    "derivation": {
      "title": "Complexity & Correctness of Boolean Masks and Advanced Conditional Filtering",
      "objective": "Verify computational complexity and memory usage.",
      "steps": [
        {
          "step": 1,
          "label": "Dimension Check",
          "latex": "\\text{Total elements } N = \\prod d_i",
          "explanation": "Input array has N total elements."
        },
        {
          "step": 2,
          "label": "Execution Rate",
          "latex": "O(N) \\text{ arithmetic operations in C}",
          "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."
        }
      ]
    },
    "variables": [
      {
        "symbol": "N",
        "name": "Element Count",
        "description": "Total values in array",
        "dimensions": "Scalar"
      },
      {
        "symbol": "s",
        "name": "Strides",
        "description": "Byte step tuple per axis",
        "dimensions": "Tuple"
      }
    ],
    "numericalExample": {
      "scenario": "Telemetry Data Cleansing",
      "dataset": [
        {
          "Record": 1,
          "Context": "Replacing sensor communication dropouts and impossible values with NaN.",
          "Status": "Verified"
        }
      ],
      "calculations": [
        {
          "step": "Verification",
          "math": "Operation executed",
          "result": "Verified"
        }
      ],
      "finalConclusion": "The operation produced the exact mathematical result expected."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Boolean Masks and Advanced Conditional Filtering",
      "description": "How Boolean Masks and Advanced Conditional Filtering operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nsensor_data = np.array([22.5, 23.0, 999.0, 24.1, -99.0, 25.3])\n# Clean outliers in place\ninvalid_mask = (sensor_data > 100) | (sensor_data < -40)\nsensor_data[invalid_mask] = np.nan\nprint('Cleaned sensor data with NaNs in place:', sensor_data)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nsensor_data = np.array([22.5, 23.0, 999.0, 24.1, -99.0, 25.3])\n# Clean outliers in place\ninvalid_mask = (sensor_data > 100) | (sensor_data < -40)\nsensor_data[invalid_mask] = np.nan\nprint('Cleaned sensor data with NaNs in place:', sensor_data)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nsensor_data = np.array([22.5, 23.0, 999.0, 24.1, -99.0, 25.3])\n# Clean outliers in place\ninvalid_mask = (sensor_data > 100) | (sensor_data < -40)\nsensor_data[invalid_mask] = np.nan\nprint('Cleaned sensor data with NaNs in place:', sensor_data)",
      "expectedOutput": "Cleaned sensor data with NaNs in place: [22.5 23.   nan 24.1  nan 25.3]"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-2",
        "codeSnippet": "import numpy as np",
        "explanation": "Loads NumPy library."
      },
      {
        "lines": "3-5",
        "codeSnippet": "# Operation execution",
        "explanation": "Executes the operation and outputs the result."
      }
    ],
    "hyperparameters": [
      {
        "name": "axis",
        "defaultVal": "None",
        "range": "None, 0, 1",
        "effect": "Dimension along which operation is computed",
        "recommendation": "Set axis explicitly for multi-dimensional arrays."
      }
    ],
    "assumptions": [
      {
        "assumption": "Compatible shapes",
        "whyItMatters": "Prevents dimension broadcast mismatch errors",
        "howToVerify": "Check .shape on all operands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Axis direction confusion",
        "solution": "Remember axis=0 collapses rows, axis=1 collapses columns",
        "whyWrong": "Produces inverted summary dimensions",
        "howToFix": "Verify the output shape after aggregation"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Finance",
        "application": "Portfolio Returns",
        "benefit": "Instant daily percentage change computation."
      },
      {
        "industry": "E-Commerce",
        "application": "Recommendation Engine",
        "benefit": "Vectorized user similarity metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Does assigning to a boolean mask like arr[arr < 0] = 0 modify the original array in place?",
        "hint": "Think about array dimensions.",
        "answer": "Yes, boolean mask assignment mutates the underlying array memory in place."
      },
      {
        "id": "pq2",
        "question": "Is Boolean Masks and Advanced Conditional Filtering vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Boolean Masks and Advanced Conditional Filtering benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Boolean Masks and Advanced Conditional Filtering in NumPy?",
        "options": [
          "Executes at compiled C speed over contiguous memory blocks.",
          "It makes Python code run in interpreted mode.",
          "It restricts all data to single integers.",
          "It automatically deletes negative numbers."
        ],
        "correctIndex": 0,
        "explanation": "NumPy functions are pre-compiled in C and execute across contiguous buffers without Python interpreter overhead."
      },
      {
        "id": "q2",
        "question": "What is the result of applying a comparison operator like arr > 5?",
        "options": [
          "An array of booleans of the same shape as arr.",
          "A single boolean True or False.",
          "An array of only positive numbers.",
          "An error message."
        ],
        "correctIndex": 0,
        "explanation": "Comparison operators execute element-wise and return a boolean mask of the exact same shape."
      },
      {
        "id": "q3",
        "question": "What does axis=0 specify in a 2D aggregation like np.mean(arr, axis=0)?",
        "options": [
          "Compute the mean down the rows, resulting in one mean per column.",
          "Compute the mean across the columns, resulting in one mean per row.",
          "Compute the overall scalar mean of all elements.",
          "Transpose the matrix before computing."
        ],
        "correctIndex": 0,
        "explanation": "axis=0 collapses the rows (vertical direction), producing one value per column."
      }
    ],
    "independentExercise": {
      "title": "Practice Task: Boolean Masks and Advanced Conditional Filtering",
      "problem": "Replace all negative numbers in np.array([-5, 10, -2, 20]) with 0 in place.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.array([-5, 10, -2, 20])\na[a < 0] = 0\nprint(a)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Boolean Masks and Advanced Conditional Filtering and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l1",
      "nextLessonTitle": "Sum, Mean, Median, Minimum, and Maximum",
      "nextLessonModuleId": "numpy-m4-l1"
    }
  }
};
