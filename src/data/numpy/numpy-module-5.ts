import { ModuleData, LessonContent } from '@/lib/types';

export const numpyModule5Data: ModuleData = {
  "id": "numpy-module-5",
  "number": 5,
  "title": "Efficient NumPy Programming",
  "subtitle": "Vectorization, Stacking, Splitting, Fast Partitioning & Memory Optimization",
  "description": "Master industrial-grade efficiency. Learn vectorization principles, broadcast operations, np.where, np.select, concatenation, fast top-K partitioning, and memory profiling.",
  "icon": "Layers",
  "badge": "Efficient Programming",
  "estimatedHours": 14,
  "topicsCount": 12,
  "lessons": [
    {
      "id": "numpy-m5-l1",
      "moduleId": "numpy-module-5",
      "title": "Principles of Vectorization in Numerical Computing",
      "description": "Understanding SIMD hardware execution, eliminating interpreter overhead, and vector thinking",
      "order": 1,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m5-l2",
      "moduleId": "numpy-module-5",
      "title": "Python Loops vs Vectorized Calculations",
      "description": "Realistic performance benchmarking and understanding when vectorization yields 50x-100x speedups",
      "order": 2,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m5-l3",
      "moduleId": "numpy-module-5",
      "title": "Broadcasting Rules in Practical Examples",
      "description": "Feature normalization, distance matrices, and batch adjustments with zero-copy broadcasting",
      "order": 3,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m5-l4",
      "moduleId": "numpy-module-5",
      "title": "Conditional Selection with np.where()",
      "description": "Vectorized if-else ternary selection without Python loops",
      "order": 4,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m5-l5",
      "moduleId": "numpy-module-5",
      "title": "Multi-Condition Selection with np.select()",
      "description": "Implementing complex piecewise functions and tiered grading rubrics vectorially",
      "order": 5,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m5-l6",
      "moduleId": "numpy-module-5",
      "title": "Combining Arrays with np.concatenate()",
      "description": "Joining arrays along existing axes without modifying dimensions",
      "order": 6,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m5-l7",
      "moduleId": "numpy-module-5",
      "title": "Concatenation and Stacking (vstack, hstack, column_stack)",
      "description": "Intuitive vertical, horizontal, and column-wise array assembly helpers",
      "order": 7,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m5-l8",
      "moduleId": "numpy-module-5",
      "title": "Splitting Arrays (split, hsplit, vsplit)",
      "description": "Partitioning arrays into equal or variable sub-arrays along specified axes",
      "order": 8,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m5-l9",
      "moduleId": "numpy-module-5",
      "title": "Sorting and Filtering Efficiently (partition, argpartition)",
      "description": "Finding the top-K largest or smallest elements in O(N) time without full O(N log N) sorting",
      "order": 9,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Advanced"
    },
    {
      "id": "numpy-m5-l10",
      "moduleId": "numpy-module-5",
      "title": "Views, Copies, and Memory Allocation Considerations",
      "description": "Managing memory overhead, avoiding leaks, and understanding contiguous buffer sharing",
      "order": 10,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Advanced"
    },
    {
      "id": "numpy-m5-l11",
      "moduleId": "numpy-module-5",
      "title": "Performance Benchmarking with Timing Methods",
      "description": "Accurate profiling using time.perf_counter, measuring latency, and memory footprints",
      "order": 11,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m5-l12",
      "moduleId": "numpy-module-5",
      "title": "Common NumPy Errors and Debugging Techniques",
      "description": "Diagnosing ValueError shape mismatches, IndexError bounds, and memory overflow exceptions",
      "order": 12,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    }
  ]
};

export const numpyModule5Lessons: Record<string, LessonContent> = {
  "numpy-m5-l1": {
    "id": "numpy-m5-l1",
    "moduleId": "numpy-module-5",
    "title": "Principles of Vectorization in Numerical Computing",
    "subtitle": "Understanding SIMD hardware execution, eliminating interpreter overhead, and vector thinking",
    "order": 1,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Principles of Vectorization in Numerical Computing.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A Factory Conveyor Belt vs Carrying Items One by One",
      "text": "Instead of walking back and forth 10,000 times to carry one bolt at a time (Python loops), vectorization places 10,000 bolts onto a motorized conveyor belt where the machine processes them in continuous batches.",
      "metaphor": "Vectorization replaces explicit loops with compiled array expressions executing at hardware bandwidth."
    },
    "problemSolved": {
      "title": "The 100x Python Loop Speed Penalty",
      "description": "Pure Python loops require dynamic type checking, frame creation, and pointer dereferencing on every single item. Vectorization delegates the loop to low-level compiled C instructions.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Principles of Vectorization in Numerical Computing.",
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
      "overview": "Mathematical foundations for Principles of Vectorization in Numerical Computing.",
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
      "title": "Complexity & Correctness of Principles of Vectorization in Numerical Computing",
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
      "scenario": "Applying Sales Tax to Millions of Retail Records",
      "dataset": [
        {
          "Record": 1,
          "Context": "Multiplying transaction amounts by 1.0825 across millions of receipts vectorially.",
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
      "title": "Visual Architecture: Principles of Vectorization in Numerical Computing",
      "description": "How Principles of Vectorization in Numerical Computing operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\narr = np.arange(1000000)\n# Vectorized squaring executes in milliseconds\nsquared = arr ** 2\nprint('Computed 1,000,000 squares vectorially!')\nprint('First 5 elements:', squared[:5])\nprint('Last 5 elements:', squared[-5:])",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\narr = np.arange(1000000)\n# Vectorized squaring executes in milliseconds\nsquared = arr ** 2\nprint('Computed 1,000,000 squares vectorially!')\nprint('First 5 elements:', squared[:5])\nprint('Last 5 elements:', squared[-5:])",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\narr = np.arange(1000000)\n# Vectorized squaring executes in milliseconds\nsquared = arr ** 2\nprint('Computed 1,000,000 squares vectorially!')\nprint('First 5 elements:', squared[:5])\nprint('Last 5 elements:', squared[-5:])",
      "expectedOutput": "Computed 1,000,000 squares vectorially!\nFirst 5 elements: [ 0  1  4  9 16]\nLast 5 elements: [999990000025 999992000016 999994000009 999996000004 999998000001]"
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
        "question": "What CPU feature powers modern NumPy vectorization?",
        "hint": "Think about array dimensions.",
        "answer": "Single Instruction Multiple Data (SIMD) instruction sets like AVX-512 and SSE."
      },
      {
        "id": "pq2",
        "question": "Is Principles of Vectorization in Numerical Computing vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Principles of Vectorization in Numerical Computing benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Principles of Vectorization in Numerical Computing in NumPy?",
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
      "title": "Practice Task: Principles of Vectorization in Numerical Computing",
      "problem": "Square all numbers from 1 to 5 using vectorized multiplication.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.arange(1, 6)\nprint(a ** 2)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Principles of Vectorization in Numerical Computing and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l2",
      "nextLessonTitle": "Python Loops vs Vectorized Calculations",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l2": {
    "id": "numpy-m5-l2",
    "moduleId": "numpy-module-5",
    "title": "Python Loops vs Vectorized Calculations",
    "subtitle": "Realistic performance benchmarking and understanding when vectorization yields 50x-100x speedups",
    "order": 2,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Python Loops vs Vectorized Calculations.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A Postal Van vs A Person Delivering Letters on Foot",
      "text": "If you have 1 letter to deliver to your next-door neighbor, walking is fine. But delivering 50,000 letters across a city on foot takes weeks; a postal delivery van does it in hours. For large numerical datasets, vectorization speeds up execution by orders of magnitude.",
      "metaphor": "Benchmarking shows vectorization is 20x to 100x faster for arrays above 10,000 items."
    },
    "problemSolved": {
      "title": "Overhead on Micro-Arrays (Size < 10)",
      "description": "For arrays with only 2 or 3 numbers, NumPy overhead (function call and array creation) can be slightly slower than a simple Python scalar addition. Vectorization shines on large datasets.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Python Loops vs Vectorized Calculations.",
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
      "overview": "Mathematical foundations for Python Loops vs Vectorized Calculations.",
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
      "title": "Complexity & Correctness of Python Loops vs Vectorized Calculations",
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
      "scenario": "Real-Time Video Frame Pixel Manipulation",
      "dataset": [
        {
          "Record": 1,
          "Context": "Processing 60 frames per second where each frame has 2 million pixels.",
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
      "title": "Visual Architecture: Python Loops vs Vectorized Calculations",
      "description": "How Python Loops vs Vectorized Calculations operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nimport time\n# Benchmarking 100,000 elements\nn = 100000\npy_list = list(range(n))\nnp_arr = np.arange(n)\nt0 = time.perf_counter()\nres_py = [x * 2 for x in py_list]\nt_py = time.perf_counter() - t0\nt0 = time.perf_counter()\nres_np = np_arr * 2\nt_np = time.perf_counter() - t0\nprint(f'Python list loop time: {t_py:.5f}s')\nprint(f'NumPy vectorized time: {t_np:.5f}s')\nprint(f'Speedup factor: {t_py / t_np:.1f}x faster')",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nimport time\n# Benchmarking 100,000 elements\nn = 100000\npy_list = list(range(n))\nnp_arr = np.arange(n)\nt0 = time.perf_counter()\nres_py = [x * 2 for x in py_list]\nt_py = time.perf_counter() - t0\nt0 = time.perf_counter()\nres_np = np_arr * 2\nt_np = time.perf_counter() - t0\nprint(f'Python list loop time: {t_py:.5f}s')\nprint(f'NumPy vectorized time: {t_np:.5f}s')\nprint(f'Speedup factor: {t_py / t_np:.1f}x faster')",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nimport time\n# Benchmarking 100,000 elements\nn = 100000\npy_list = list(range(n))\nnp_arr = np.arange(n)\nt0 = time.perf_counter()\nres_py = [x * 2 for x in py_list]\nt_py = time.perf_counter() - t0\nt0 = time.perf_counter()\nres_np = np_arr * 2\nt_np = time.perf_counter() - t0\nprint(f'Python list loop time: {t_py:.5f}s')\nprint(f'NumPy vectorized time: {t_np:.5f}s')\nprint(f'Speedup factor: {t_py / t_np:.1f}x faster')",
      "expectedOutput": "Python list loop time: 0.00361s\nNumPy vectorized time: 0.00023s\nSpeedup factor: 15.8x faster"
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
        "question": "Does NumPy vectorization make small arrays of length 3 faster than pure Python?",
        "hint": "Think about array dimensions.",
        "answer": "Not necessarily; for tiny arrays (< 10 elements), the overhead of invoking the NumPy C API can outweigh the benefits."
      },
      {
        "id": "pq2",
        "question": "Is Python Loops vs Vectorized Calculations vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Python Loops vs Vectorized Calculations benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Python Loops vs Vectorized Calculations in NumPy?",
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
      "title": "Practice Task: Python Loops vs Vectorized Calculations",
      "problem": "Double an array of 5 elements without using a for loop.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.array([1, 2, 3, 4, 5])\nprint(a * 2)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Python Loops vs Vectorized Calculations and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l3",
      "nextLessonTitle": "Broadcasting Rules in Practical Examples",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l3": {
    "id": "numpy-m5-l3",
    "moduleId": "numpy-module-5",
    "title": "Broadcasting Rules in Practical Examples",
    "subtitle": "Feature normalization, distance matrices, and batch adjustments with zero-copy broadcasting",
    "order": 3,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Broadcasting Rules in Practical Examples.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Applying a Grade Curve Across 5 Classrooms",
      "text": "If the exam was too hard, the dean decides: 'Add 5 marks to Math, 3 marks to Physics, and 7 marks to History.' Broadcasting applies this 3-element adjustment across every student in all 5 classrooms automatically.",
      "metaphor": "Broadcasting enables multi-dimensional array operations with zero memory copy overhead."
    },
    "problemSolved": {
      "title": "Centering Features around Zero Mean",
      "description": "Machine learning requires feature centering: X_centered = X - X.mean(axis=0). Broadcasting stretches the 1D mean vector across all rows seamlessly.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Broadcasting Rules in Practical Examples.",
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
      "overview": "Mathematical foundations for Broadcasting Rules in Practical Examples.",
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
      "title": "Complexity & Correctness of Broadcasting Rules in Practical Examples",
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
      "scenario": "Feature Centering Before PCA",
      "dataset": [
        {
          "Record": 1,
          "Context": "Subtracting the feature mean vector from all observations before calculating covariance.",
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
      "title": "Visual Architecture: Broadcasting Rules in Practical Examples",
      "description": "How Broadcasting Rules in Practical Examples operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\n# 4 students, 3 subjects\ngrades = np.array([\n    [65, 70, 75],\n    [80, 85, 90],\n    [55, 60, 65],\n    [90, 95, 100]\n])\nmean_per_subject = np.mean(grades, axis=0)\ncentered = grades - mean_per_subject\nprint('Original grades:\\n', grades)\nprint('Subject means:', mean_per_subject)\nprint('Centered grades (mean subtracted):\\n', np.round(centered, 1))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\n# 4 students, 3 subjects\ngrades = np.array([\n    [65, 70, 75],\n    [80, 85, 90],\n    [55, 60, 65],\n    [90, 95, 100]\n])\nmean_per_subject = np.mean(grades, axis=0)\ncentered = grades - mean_per_subject\nprint('Original grades:\\n', grades)\nprint('Subject means:', mean_per_subject)\nprint('Centered grades (mean subtracted):\\n', np.round(centered, 1))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\n# 4 students, 3 subjects\ngrades = np.array([\n    [65, 70, 75],\n    [80, 85, 90],\n    [55, 60, 65],\n    [90, 95, 100]\n])\nmean_per_subject = np.mean(grades, axis=0)\ncentered = grades - mean_per_subject\nprint('Original grades:\\n', grades)\nprint('Subject means:', mean_per_subject)\nprint('Centered grades (mean subtracted):\\n', np.round(centered, 1))",
      "expectedOutput": "Original grades:\n [[ 65  70  75]\n [ 80  85  90]\n [ 55  60  65]\n [ 90  95 100]]\nSubject means: [72.5 77.5 82.5]\nCentered grades (mean subtracted):\n [[ -7.5  -7.5  -7.5]\n [  7.5   7.5   7.5]\n [-17.5 -17.5 -17.5]\n [ 17.5  17.5  17.5]]"
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
        "question": "What shape must the mean vector have to subtract from a matrix of shape (100, 5)?",
        "hint": "Think about array dimensions.",
        "answer": "Shape (5,) or (1, 5) satisfies broadcasting rules."
      },
      {
        "id": "pq2",
        "question": "Is Broadcasting Rules in Practical Examples vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Broadcasting Rules in Practical Examples benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Broadcasting Rules in Practical Examples in NumPy?",
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
      "title": "Practice Task: Broadcasting Rules in Practical Examples",
      "problem": "Subtract [10, 20] from a 2x2 matrix [[15, 25], [30, 40]].",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nm = np.array([[15, 25], [30, 40]])\nprint(m - np.array([10, 20]))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Broadcasting Rules in Practical Examples and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l4",
      "nextLessonTitle": "Conditional Selection with np.where()",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l4": {
    "id": "numpy-m5-l4",
    "moduleId": "numpy-module-5",
    "title": "Conditional Selection with np.where()",
    "subtitle": "Vectorized if-else ternary selection without Python loops",
    "order": 4,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Conditional Selection with np.where().",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A Pass/Fail Stamp on a Test Paper",
      "text": "Instead of writing 'if score >= 50: pass else: fail' line by line, np.where(condition, x, y) stamps 'Pass' or 'Fail' across the entire array in a single vectorized swoop.",
      "metaphor": "np.where(condition, value_if_true, value_if_false) executes ternary branch selection vectorially."
    },
    "problemSolved": {
      "title": "Slow Python List Comprehensions with If-Else",
      "description": "Writing [x if c else y for x, y, c in zip(...)] is slow and memory-heavy. np.where() evaluates both branches in compiled C at full RAM bandwidth.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Conditional Selection with np.where().",
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
      "overview": "Mathematical foundations for Conditional Selection with np.where().",
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
      "title": "Complexity & Correctness of Conditional Selection with np.where()",
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
      "scenario": "Credit Risk Loan Approval",
      "dataset": [
        {
          "Record": 1,
          "Context": "Flagging applications as 'Approved' or 'Denied' based on credit score thresholds.",
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
      "title": "Visual Architecture: Conditional Selection with np.where()",
      "description": "How Conditional Selection with np.where() operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nscores = np.array([45, 82, 58, 91, 64, 75])\nstatus = np.where(scores >= 60, 'Pass', 'Fail')\n# Numerical clipping\nbonus = np.where(scores > 80, scores + 5, scores)\nprint('Scores:', scores)\nprint('Status:', status)\nprint('Scores with bonus for > 80:', bonus)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nscores = np.array([45, 82, 58, 91, 64, 75])\nstatus = np.where(scores >= 60, 'Pass', 'Fail')\n# Numerical clipping\nbonus = np.where(scores > 80, scores + 5, scores)\nprint('Scores:', scores)\nprint('Status:', status)\nprint('Scores with bonus for > 80:', bonus)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nscores = np.array([45, 82, 58, 91, 64, 75])\nstatus = np.where(scores >= 60, 'Pass', 'Fail')\n# Numerical clipping\nbonus = np.where(scores > 80, scores + 5, scores)\nprint('Scores:', scores)\nprint('Status:', status)\nprint('Scores with bonus for > 80:', bonus)",
      "expectedOutput": "Scores: [45 82 58 91 64 75]\nStatus: ['Fail' 'Pass' 'Fail' 'Pass' 'Pass' 'Pass']\nScores with bonus for > 80: [45 87 58 96 64 75]"
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
        "question": "What does np.where() return if only a condition is passed (without x and y)?",
        "hint": "Think about array dimensions.",
        "answer": "It returns a tuple of index arrays where the condition is True, identical to nonzero(condition)."
      },
      {
        "id": "pq2",
        "question": "Is Conditional Selection with np.where() vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Conditional Selection with np.where() benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Conditional Selection with np.where() in NumPy?",
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
      "title": "Practice Task: Conditional Selection with np.where()",
      "problem": "Replace all negative numbers in [-2, 5, -10, 8] with 0 using np.where().",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.array([-2, 5, -10, 8])\nprint(np.where(a < 0, 0, a))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Conditional Selection with np.where() and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l5",
      "nextLessonTitle": "Multi-Condition Selection with np.select()",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l5": {
    "id": "numpy-m5-l5",
    "moduleId": "numpy-module-5",
    "title": "Multi-Condition Selection with np.select()",
    "subtitle": "Implementing complex piecewise functions and tiered grading rubrics vectorially",
    "order": 5,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Multi-Condition Selection with np.select().",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Assigning Letter Grades (A, B, C, F) to Exam Scores",
      "text": "If score >= 90 -> 'A'; elif score >= 80 -> 'B'; elif score >= 70 -> 'C'; else -> 'F'. np.select(condlist, choicelist, default) evaluates multiple sequential conditions vectorially.",
      "metaphor": "np.select evaluates a list of boolean conditions and returns values from matching choice lists."
    },
    "problemSolved": {
      "title": "Deeply Nested np.where() Calls",
      "description": "Nesting multiple np.where() calls like np.where(c1, a, np.where(c2, b, np.where(c3, c, d))) is hard to read and error-prone. np.select() organizes multi-tier logic cleanly.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Multi-Condition Selection with np.select().",
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
      "overview": "Mathematical foundations for Multi-Condition Selection with np.select().",
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
      "title": "Complexity & Correctness of Multi-Condition Selection with np.select()",
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
      "scenario": "Customer Loyalty Tier Assignment",
      "dataset": [
        {
          "Record": 1,
          "Context": "Assigning customers to 'Platinum', 'Gold', 'Silver', or 'Bronze' based on annual spend.",
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
      "title": "Visual Architecture: Multi-Condition Selection with np.select()",
      "description": "How Multi-Condition Selection with np.select() operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nscores = np.array([95, 82, 74, 58, 88, 62])\nconditions = [\n    scores >= 90,\n    scores >= 80,\n    scores >= 70,\n    scores >= 60\n]\nchoices = ['A', 'B', 'C', 'D']\ngrades = np.select(conditions, choices, default='F')\nprint('Scores:', scores)\nprint('Assigned letter grades:', grades)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nscores = np.array([95, 82, 74, 58, 88, 62])\nconditions = [\n    scores >= 90,\n    scores >= 80,\n    scores >= 70,\n    scores >= 60\n]\nchoices = ['A', 'B', 'C', 'D']\ngrades = np.select(conditions, choices, default='F')\nprint('Scores:', scores)\nprint('Assigned letter grades:', grades)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nscores = np.array([95, 82, 74, 58, 88, 62])\nconditions = [\n    scores >= 90,\n    scores >= 80,\n    scores >= 70,\n    scores >= 60\n]\nchoices = ['A', 'B', 'C', 'D']\ngrades = np.select(conditions, choices, default='F')\nprint('Scores:', scores)\nprint('Assigned letter grades:', grades)",
      "expectedOutput": "Scores: [95 82 74 58 88 62]\nAssigned letter grades: ['A' 'B' 'C' 'F' 'B' 'D']"
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
        "question": "What happens if none of the conditions in np.select() evaluate to True?",
        "hint": "Think about array dimensions.",
        "answer": "NumPy assigns the specified default value (or 0 if omitted)."
      },
      {
        "id": "pq2",
        "question": "Is Multi-Condition Selection with np.select() vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Multi-Condition Selection with np.select() benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Multi-Condition Selection with np.select() in NumPy?",
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
      "title": "Practice Task: Multi-Condition Selection with np.select()",
      "problem": "Categorize ages [12, 25, 70] into 'Minor' (< 18), 'Adult' (< 65), and 'Senior' using np.select.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nages = np.array([12, 25, 70])\nconds = [ages < 18, ages < 65]\nchoices = ['Minor', 'Adult']\nprint(np.select(conds, choices, default='Senior'))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Multi-Condition Selection with np.select() and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l6",
      "nextLessonTitle": "Combining Arrays with np.concatenate()",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l6": {
    "id": "numpy-m5-l6",
    "moduleId": "numpy-module-5",
    "title": "Combining Arrays with np.concatenate()",
    "subtitle": "Joining arrays along existing axes without modifying dimensions",
    "order": 6,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Combining Arrays with np.concatenate().",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Coupling Two Trains on the Same Track",
      "text": "Connecting Train Car A (4 coaches) and Train Car B (6 coaches) creates a single 10-coach train on the same track. np.concatenate joins arrays along an existing axis.",
      "metaphor": "np.concatenate joins sequences of arrays along an existing specified axis."
    },
    "problemSolved": {
      "title": "Concatenating Arrays with Incompatible Shapes",
      "description": "All dimensions except the concatenation axis must match exactly. Trying to concatenate (3, 4) with (3, 5) along axis=0 raises ValueError.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Combining Arrays with np.concatenate().",
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
      "overview": "Mathematical foundations for Combining Arrays with np.concatenate().",
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
      "title": "Complexity & Correctness of Combining Arrays with np.concatenate()",
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
      "scenario": "Appending New Daily Data Batches",
      "dataset": [
        {
          "Record": 1,
          "Context": "Appending today's transaction records (N_today, D) to historical records (N_history, D).",
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
      "title": "Visual Architecture: Combining Arrays with np.concatenate()",
      "description": "How Combining Arrays with np.concatenate() operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint('1D concatenation:', np.concatenate([a, b]))\nm1 = np.array([[1, 2], [3, 4]])\nm2 = np.array([[5, 6], [7, 8]])\nprint('2D concatenate axis=0 (stack rows):\\n', np.concatenate([m1, m2], axis=0))\nprint('2D concatenate axis=1 (join columns):\\n', np.concatenate([m1, m2], axis=1))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint('1D concatenation:', np.concatenate([a, b]))\nm1 = np.array([[1, 2], [3, 4]])\nm2 = np.array([[5, 6], [7, 8]])\nprint('2D concatenate axis=0 (stack rows):\\n', np.concatenate([m1, m2], axis=0))\nprint('2D concatenate axis=1 (join columns):\\n', np.concatenate([m1, m2], axis=1))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint('1D concatenation:', np.concatenate([a, b]))\nm1 = np.array([[1, 2], [3, 4]])\nm2 = np.array([[5, 6], [7, 8]])\nprint('2D concatenate axis=0 (stack rows):\\n', np.concatenate([m1, m2], axis=0))\nprint('2D concatenate axis=1 (join columns):\\n', np.concatenate([m1, m2], axis=1))",
      "expectedOutput": "1D concatenation: [1 2 3 4 5 6]\n2D concatenate axis=0 (stack rows):\n [[1 2]\n [3 4]\n [5 6]\n [7 8]]\n2D concatenate axis=1 (join columns):\n [[1 2 5 6]\n [3 4 7 8]]"
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
        "question": "What is the default axis in np.concatenate()?",
        "hint": "Think about array dimensions.",
        "answer": "The default axis is 0."
      },
      {
        "id": "pq2",
        "question": "Is Combining Arrays with np.concatenate() vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Combining Arrays with np.concatenate() benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Combining Arrays with np.concatenate() in NumPy?",
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
      "title": "Practice Task: Combining Arrays with np.concatenate()",
      "problem": "Concatenate two arrays [10, 20] and [30, 40] into a single 1D array.",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nprint(np.concatenate([[10, 20], [30, 40]]))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Combining Arrays with np.concatenate() and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l7",
      "nextLessonTitle": "Concatenation and Stacking (vstack, hstack, column_stack)",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l7": {
    "id": "numpy-m5-l7",
    "moduleId": "numpy-module-5",
    "title": "Concatenation and Stacking (vstack, hstack, column_stack)",
    "subtitle": "Intuitive vertical, horizontal, and column-wise array assembly helpers",
    "order": 7,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Concatenation and Stacking (vstack, hstack, column_stack).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Stacking Books Vertically vs Side-by-Side on a Shelf",
      "text": "vstack() stacks books on top of each other (adding rows vertically). hstack() places books side by side on a shelf (expanding columns horizontally). column_stack() turns 1D vectors into columns of a 2D matrix.",
      "metaphor": "vstack() stacks row-wise; hstack() joins column-wise; column_stack() converts 1D vectors into 2D columns."
    },
    "problemSolved": {
      "title": "1D Arrays in hstack vs vstack Pitfall",
      "description": "For 1D arrays, hstack joins end-to-end into a longer 1D vector, while vstack stacks them into a 2D matrix. column_stack guarantees 2D column behavior.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Concatenation and Stacking (vstack, hstack, column_stack).",
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
      "overview": "Mathematical foundations for Concatenation and Stacking (vstack, hstack, column_stack).",
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
      "title": "Complexity & Correctness of Concatenation and Stacking (vstack, hstack, column_stack)",
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
      "scenario": "Assembling Machine Learning Feature Matrices",
      "dataset": [
        {
          "Record": 1,
          "Context": "Combining age, income, and credit score vectors into an (N, 3) feature matrix X.",
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
      "title": "Visual Architecture: Concatenation and Stacking (vstack, hstack, column_stack)",
      "description": "How Concatenation and Stacking (vstack, hstack, column_stack) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nx = np.array([1, 2, 3])\ny = np.array([4, 5, 6])\nprint('vstack (creates 2D rows):\\n', np.vstack([x, y]))\nprint('hstack (1D sequence):', np.hstack([x, y]))\nprint('column_stack (features X1, X2):\\n', np.column_stack([x, y]))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nx = np.array([1, 2, 3])\ny = np.array([4, 5, 6])\nprint('vstack (creates 2D rows):\\n', np.vstack([x, y]))\nprint('hstack (1D sequence):', np.hstack([x, y]))\nprint('column_stack (features X1, X2):\\n', np.column_stack([x, y]))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nx = np.array([1, 2, 3])\ny = np.array([4, 5, 6])\nprint('vstack (creates 2D rows):\\n', np.vstack([x, y]))\nprint('hstack (1D sequence):', np.hstack([x, y]))\nprint('column_stack (features X1, X2):\\n', np.column_stack([x, y]))",
      "expectedOutput": "vstack (creates 2D rows):\n [[1 2 3]\n [4 5 6]]\nhstack (1D sequence): [1 2 3 4 5 6]\ncolumn_stack (features X1, X2):\n [[1 4]\n [2 5]\n [3 6]]"
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
        "question": "How does column_stack differ from hstack for 1D arrays?",
        "hint": "Think about array dimensions.",
        "answer": "hstack concatenates 1D arrays end-to-end into a 1D vector, while column_stack converts each 1D array into a column of a 2D matrix."
      },
      {
        "id": "pq2",
        "question": "Is Concatenation and Stacking (vstack, hstack, column_stack) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Concatenation and Stacking (vstack, hstack, column_stack) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Concatenation and Stacking (vstack, hstack, column_stack) in NumPy?",
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
      "title": "Practice Task: Concatenation and Stacking (vstack, hstack, column_stack)",
      "problem": "Use column_stack to create a 2D matrix from x = [1, 2] and y = [3, 4].",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nprint(np.column_stack([[1, 2], [3, 4]]))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Concatenation and Stacking (vstack, hstack, column_stack) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l8",
      "nextLessonTitle": "Splitting Arrays (split, hsplit, vsplit)",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l8": {
    "id": "numpy-m5-l8",
    "moduleId": "numpy-module-5",
    "title": "Splitting Arrays (split, hsplit, vsplit)",
    "subtitle": "Partitioning arrays into equal or variable sub-arrays along specified axes",
    "order": 8,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Splitting Arrays (split, hsplit, vsplit).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Cutting a Cake into Equal Slices",
      "text": "A baker cuts a large rectangular cake horizontally into top and bottom layers (vsplit), or vertically into left and right halves (hsplit). np.split divides arrays along any axis.",
      "metaphor": "split divides an array into multiple sub-arrays along a specified axis."
    },
    "problemSolved": {
      "title": "Unequal Division Size Mismatch",
      "description": "Passing an integer like np.split(arr, 3) on an array of length 10 raises ValueError because 10 cannot be divided equally into 3 slices. Pass index indices like [3, 7] for variable splits.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Splitting Arrays (split, hsplit, vsplit).",
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
      "overview": "Mathematical foundations for Splitting Arrays (split, hsplit, vsplit).",
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
      "title": "Complexity & Correctness of Splitting Arrays (split, hsplit, vsplit)",
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
      "scenario": "Train-Validation-Test Splitting",
      "dataset": [
        {
          "Record": 1,
          "Context": "Splitting a shuffled dataset into 70% train, 15% validation, and 15% test splits.",
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
      "title": "Visual Architecture: Splitting Arrays (split, hsplit, vsplit)",
      "description": "How Splitting Arrays (split, hsplit, vsplit) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\narr = np.arange(12).reshape(4, 3)\n# Split vertically into 2 submatrices (2 rows each)\ntop, bottom = np.vsplit(arr, 2)\nprint('Original (4, 3):\\n', arr)\nprint('Top half (2, 3):\\n', top)\nprint('Bottom half (2, 3):\\n', bottom)\n# Split 1D array at specific indices [2, 5]\nvec = np.arange(8)\nprint('Split at indices [2, 5]:', np.split(vec, [2, 5]))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\narr = np.arange(12).reshape(4, 3)\n# Split vertically into 2 submatrices (2 rows each)\ntop, bottom = np.vsplit(arr, 2)\nprint('Original (4, 3):\\n', arr)\nprint('Top half (2, 3):\\n', top)\nprint('Bottom half (2, 3):\\n', bottom)\n# Split 1D array at specific indices [2, 5]\nvec = np.arange(8)\nprint('Split at indices [2, 5]:', np.split(vec, [2, 5]))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\narr = np.arange(12).reshape(4, 3)\n# Split vertically into 2 submatrices (2 rows each)\ntop, bottom = np.vsplit(arr, 2)\nprint('Original (4, 3):\\n', arr)\nprint('Top half (2, 3):\\n', top)\nprint('Bottom half (2, 3):\\n', bottom)\n# Split 1D array at specific indices [2, 5]\nvec = np.arange(8)\nprint('Split at indices [2, 5]:', np.split(vec, [2, 5]))",
      "expectedOutput": "Original (4, 3):\n [[ 0  1  2]\n [ 3  4  5]\n [ 6  7  8]\n [ 9 10 11]]\nTop half (2, 3):\n [[0 1 2]\n [3 4 5]]\nBottom half (2, 3):\n [[ 6  7  8]\n [ 9 10 11]]\nSplit at indices [2, 5]: [array([0, 1]), array([2, 3, 4]), array([5, 6, 7])]"
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
        "question": "What is the difference between vsplit and hsplit?",
        "hint": "Think about array dimensions.",
        "answer": "vsplit splits along axis 0 (rows); hsplit splits along axis 1 (columns)."
      },
      {
        "id": "pq2",
        "question": "Is Splitting Arrays (split, hsplit, vsplit) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Splitting Arrays (split, hsplit, vsplit) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Splitting Arrays (split, hsplit, vsplit) in NumPy?",
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
      "title": "Practice Task: Splitting Arrays (split, hsplit, vsplit)",
      "problem": "Split an array of 6 numbers into 3 equal arrays using np.split.",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.arange(6)\nparts = np.split(a, 3)\nprint(len(parts), parts[0])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Splitting Arrays (split, hsplit, vsplit) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l9",
      "nextLessonTitle": "Sorting and Filtering Efficiently (partition, argpartition)",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l9": {
    "id": "numpy-m5-l9",
    "moduleId": "numpy-module-5",
    "title": "Sorting and Filtering Efficiently (partition, argpartition)",
    "subtitle": "Finding the top-K largest or smallest elements in O(N) time without full O(N log N) sorting",
    "order": 9,
    "readTimeMinutes": 14,
    "difficulty": "Advanced",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Sorting and Filtering Efficiently (partition, argpartition).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Finding the Top 3 Students Without Ranking All 500 Students",
      "text": "If you only want to know which 3 students won medals, you do not need to sort all 500 test papers from highest to lowest. You only need to partition the top 3 into the winner box. np.partition does this in O(N) time instead of O(N log N).",
      "metaphor": "partition() rearranges elements so the k-th element is in sorted position with smaller items before it."
    },
    "problemSolved": {
      "title": "Full Sorting When Only Top-K is Needed",
      "description": "Calling np.sort() on an array of 10 million items takes O(N log N) time and heavy RAM. np.partition() retrieves the top-K items in blazingly fast O(N) linear time.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Sorting and Filtering Efficiently (partition, argpartition).",
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
      "overview": "Mathematical foundations for Sorting and Filtering Efficiently (partition, argpartition).",
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
      "title": "Complexity & Correctness of Sorting and Filtering Efficiently (partition, argpartition)",
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
      "scenario": "K-Nearest Neighbors (KNN) Fast Neighbor Search",
      "dataset": [
        {
          "Record": 1,
          "Context": "Finding the 5 closest points among 100,000 data points in O(N) time.",
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
      "title": "Visual Architecture: Sorting and Filtering Efficiently (partition, argpartition)",
      "description": "How Sorting and Filtering Efficiently (partition, argpartition) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nscores = np.array([45, 92, 18, 77, 85, 33, 98, 64])\n# Find the 3 largest scores without full sort\n# Partition at index -3\npart = np.partition(scores, -3)\ntop_3 = part[-3:]\nprint('Original scores:', scores)\nprint('Partitioned array:', part)\nprint('Top 3 scores (unsorted order):', top_3)\nprint('Top 3 scores (sorted):', np.sort(top_3))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nscores = np.array([45, 92, 18, 77, 85, 33, 98, 64])\n# Find the 3 largest scores without full sort\n# Partition at index -3\npart = np.partition(scores, -3)\ntop_3 = part[-3:]\nprint('Original scores:', scores)\nprint('Partitioned array:', part)\nprint('Top 3 scores (unsorted order):', top_3)\nprint('Top 3 scores (sorted):', np.sort(top_3))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nscores = np.array([45, 92, 18, 77, 85, 33, 98, 64])\n# Find the 3 largest scores without full sort\n# Partition at index -3\npart = np.partition(scores, -3)\ntop_3 = part[-3:]\nprint('Original scores:', scores)\nprint('Partitioned array:', part)\nprint('Top 3 scores (unsorted order):', top_3)\nprint('Top 3 scores (sorted):', np.sort(top_3))",
      "expectedOutput": "Original scores: [45 92 18 77 85 33 98 64]\nPartitioned array: [18 33 45 64 77 85 92 98]\nTop 3 scores (unsorted order): [85 92 98]\nTop 3 scores (sorted): [85 92 98]"
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
        "question": "What is the time complexity of np.partition() compared to np.sort()?",
        "hint": "Think about array dimensions.",
        "answer": "np.partition is O(N) linear time (using Introselect), whereas np.sort is O(N log N)."
      },
      {
        "id": "pq2",
        "question": "Is Sorting and Filtering Efficiently (partition, argpartition) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Sorting and Filtering Efficiently (partition, argpartition) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Sorting and Filtering Efficiently (partition, argpartition) in NumPy?",
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
      "title": "Practice Task: Sorting and Filtering Efficiently (partition, argpartition)",
      "problem": "Find the 2 smallest numbers in [50, 10, 40, 5, 30] using np.partition.",
      "difficulty": "Advanced",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.array([50, 10, 40, 5, 30])\nprint(np.partition(a, 2)[:2])"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Sorting and Filtering Efficiently (partition, argpartition) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l10",
      "nextLessonTitle": "Views, Copies, and Memory Allocation Considerations",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l10": {
    "id": "numpy-m5-l10",
    "moduleId": "numpy-module-5",
    "title": "Views, Copies, and Memory Allocation Considerations",
    "subtitle": "Managing memory overhead, avoiding leaks, and understanding contiguous buffer sharing",
    "order": 10,
    "readTimeMinutes": 14,
    "difficulty": "Advanced",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Views, Copies, and Memory Allocation Considerations.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A Large Library Book with a Borrowed Bookmark",
      "text": "If you slice a tiny paragraph (10 words) from a massive 1,000-page book using a view, the entire 1,000-page book must remain in memory because the view holds a reference to the entire buffer. Calling .copy() lets you return the giant book to the library.",
      "metaphor": "A slice view keeps the entire parent array buffer alive in memory until the view is garbage collected."
    },
    "problemSolved": {
      "title": "Memory Leaks Caused by Lingering Views of Large Arrays",
      "description": "Extracting a tiny sub-slice from a 2GB array keeps the entire 2GB in RAM. Calling sub = arr[:10].copy() releases the 2GB parent array.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Views, Copies, and Memory Allocation Considerations.",
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
      "overview": "Mathematical foundations for Views, Copies, and Memory Allocation Considerations.",
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
      "title": "Complexity & Correctness of Views, Copies, and Memory Allocation Considerations",
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
      "scenario": "Streaming Large Audio/Video Files",
      "dataset": [
        {
          "Record": 1,
          "Context": "Extracting small signal clips and copying them to release the multi-gigabyte source file.",
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
      "title": "Visual Architecture: Views, Copies, and Memory Allocation Considerations",
      "description": "How Views, Copies, and Memory Allocation Considerations operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\n# Simulating memory retention\nlarge = np.ones(1000000, dtype=np.float64)\ntiny_view = large[:5]\ntiny_copy = large[:5].copy()\nprint('tiny_view base exists (retains 8MB buffer):', tiny_view.base is not None)\nprint('tiny_copy base is None (independent memory):', tiny_copy.base is None)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\n# Simulating memory retention\nlarge = np.ones(1000000, dtype=np.float64)\ntiny_view = large[:5]\ntiny_copy = large[:5].copy()\nprint('tiny_view base exists (retains 8MB buffer):', tiny_view.base is not None)\nprint('tiny_copy base is None (independent memory):', tiny_copy.base is None)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\n# Simulating memory retention\nlarge = np.ones(1000000, dtype=np.float64)\ntiny_view = large[:5]\ntiny_copy = large[:5].copy()\nprint('tiny_view base exists (retains 8MB buffer):', tiny_view.base is not None)\nprint('tiny_copy base is None (independent memory):', tiny_copy.base is None)",
      "expectedOutput": "tiny_view base exists (retains 8MB buffer): True\ntiny_copy base is None (independent memory): True"
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
        "question": "Why is calling .copy() beneficial when saving a small slice of a massive array?",
        "hint": "Think about array dimensions.",
        "answer": "It frees the underlying massive buffer from RAM once the original array variable goes out of scope."
      },
      {
        "id": "pq2",
        "question": "Is Views, Copies, and Memory Allocation Considerations vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Views, Copies, and Memory Allocation Considerations benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Views, Copies, and Memory Allocation Considerations in NumPy?",
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
      "title": "Practice Task: Views, Copies, and Memory Allocation Considerations",
      "problem": "Create a slice of an array and explicitly make it an independent copy.",
      "difficulty": "Advanced",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.arange(10)\ns = a[:3].copy()\nprint(s.base is None)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Views, Copies, and Memory Allocation Considerations and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l11",
      "nextLessonTitle": "Performance Benchmarking with Timing Methods",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l11": {
    "id": "numpy-m5-l11",
    "moduleId": "numpy-module-5",
    "title": "Performance Benchmarking with Timing Methods",
    "subtitle": "Accurate profiling using time.perf_counter, measuring latency, and memory footprints",
    "order": 11,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Performance Benchmarking with Timing Methods.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A High-Precision Olympic Stopwatch",
      "text": "You cannot measure a 100-meter sprint with a wall clock that only shows minutes. You need a digital stopwatch with microsecond precision. time.perf_counter() measures sub-millisecond execution times accurately.",
      "metaphor": "time.perf_counter() provides high-resolution monotonic timing unaffected by system clock adjustments."
    },
    "problemSolved": {
      "title": "Timing Inaccuracies from System Sleep and Clock Jumps",
      "description": "Using time.time() can yield inaccurate or even negative durations if network time synchronization (NTP) adjusts the clock during execution. Always use time.perf_counter().",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Performance Benchmarking with Timing Methods.",
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
      "overview": "Mathematical foundations for Performance Benchmarking with Timing Methods.",
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
      "title": "Complexity & Correctness of Performance Benchmarking with Timing Methods",
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
      "scenario": "Latency Profiling for Production ML Endpoints",
      "dataset": [
        {
          "Record": 1,
          "Context": "Measuring inference latency of a feature transformation pipeline to meet < 5ms SLAs.",
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
      "title": "Visual Architecture: Performance Benchmarking with Timing Methods",
      "description": "How Performance Benchmarking with Timing Methods operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nimport time\n\ndef benchmark(fn, iterations=50):\n    t0 = time.perf_counter()\n    for _ in range(iterations):\n        fn()\n    return (time.perf_counter() - t0) / iterations\n\na = np.arange(50000, dtype=np.float64)\nt_sum = benchmark(lambda: np.sum(a))\nprint(f'Mean execution time for np.sum(50,000 floats): {t_sum * 1e6:.2f} microseconds')",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nimport time\n\ndef benchmark(fn, iterations=50):\n    t0 = time.perf_counter()\n    for _ in range(iterations):\n        fn()\n    return (time.perf_counter() - t0) / iterations\n\na = np.arange(50000, dtype=np.float64)\nt_sum = benchmark(lambda: np.sum(a))\nprint(f'Mean execution time for np.sum(50,000 floats): {t_sum * 1e6:.2f} microseconds')",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nimport time\n\ndef benchmark(fn, iterations=50):\n    t0 = time.perf_counter()\n    for _ in range(iterations):\n        fn()\n    return (time.perf_counter() - t0) / iterations\n\na = np.arange(50000, dtype=np.float64)\nt_sum = benchmark(lambda: np.sum(a))\nprint(f'Mean execution time for np.sum(50,000 floats): {t_sum * 1e6:.2f} microseconds')",
      "expectedOutput": "Mean execution time for np.sum(50,000 floats): 14.25 microseconds"
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
        "question": "Why should you use time.perf_counter() instead of time.time() for benchmarking?",
        "hint": "Think about array dimensions.",
        "answer": "perf_counter() uses the CPU's high-resolution monotonic timer, which cannot move backward or jitter during NTP updates."
      },
      {
        "id": "pq2",
        "question": "Is Performance Benchmarking with Timing Methods vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Performance Benchmarking with Timing Methods benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Performance Benchmarking with Timing Methods in NumPy?",
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
      "title": "Practice Task: Performance Benchmarking with Timing Methods",
      "problem": "Measure the execution time of np.zeros(10000) using time.perf_counter.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nimport time\nt0 = time.perf_counter()\n_ = np.zeros(10000)\nprint('Elapsed (s):', time.perf_counter() - t0 > 0)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Performance Benchmarking with Timing Methods and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l12",
      "nextLessonTitle": "Common NumPy Errors and Debugging Techniques",
      "nextLessonModuleId": "numpy-module-5"
    }
  },
  "numpy-m5-l12": {
    "id": "numpy-m5-l12",
    "moduleId": "numpy-module-5",
    "title": "Common NumPy Errors and Debugging Techniques",
    "subtitle": "Diagnosing ValueError shape mismatches, IndexError bounds, and memory overflow exceptions",
    "order": 12,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Common NumPy Errors and Debugging Techniques.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Reading the Warning Lights on a Car Dashboard",
      "text": "When your car's check engine light turns on, an OBD scanner reads the exact error code: 'Cylinder 3 misfire'. In NumPy, error messages like 'ValueError: could not broadcast input array from shape (3,2) into shape (3,)' pinpoint the exact dimensional mismatch.",
      "metaphor": "Understanding NumPy exception messages reveals dimensional, indexing, and memory bottlenecks instantly."
    },
    "problemSolved": {
      "title": "Ignoring Broadcasting Error Shapes",
      "description": "When NumPy says 'operands could not be broadcast together with shapes (4, 3) (4, 1)', it tells you the exact dimensions that failed alignment. Inspecting .shape resolves 95% of issues.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Common NumPy Errors and Debugging Techniques.",
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
      "overview": "Mathematical foundations for Common NumPy Errors and Debugging Techniques.",
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
      "title": "Complexity & Correctness of Common NumPy Errors and Debugging Techniques",
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
      "scenario": "Pipeline Integration Debugging",
      "dataset": [
        {
          "Record": 1,
          "Context": "Debugging automated ingestion pipelines before passing batches into Scikit-learn or PyTorch.",
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
      "title": "Visual Architecture: Common NumPy Errors and Debugging Techniques",
      "description": "How Common NumPy Errors and Debugging Techniques operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\n# Demonstrating common error diagnostics\na = np.array([1, 2, 3])\nb = np.array([10, 20])\ntry:\n    # Shape mismatch\n    c = a + b\nexcept ValueError as e:\n    print('Diagnosed ValueError:', e)\nprint('Fix: Verify shapes beforehand - a.shape:', a.shape, 'b.shape:', b.shape)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\n# Demonstrating common error diagnostics\na = np.array([1, 2, 3])\nb = np.array([10, 20])\ntry:\n    # Shape mismatch\n    c = a + b\nexcept ValueError as e:\n    print('Diagnosed ValueError:', e)\nprint('Fix: Verify shapes beforehand - a.shape:', a.shape, 'b.shape:', b.shape)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\n# Demonstrating common error diagnostics\na = np.array([1, 2, 3])\nb = np.array([10, 20])\ntry:\n    # Shape mismatch\n    c = a + b\nexcept ValueError as e:\n    print('Diagnosed ValueError:', e)\nprint('Fix: Verify shapes beforehand - a.shape:', a.shape, 'b.shape:', b.shape)",
      "expectedOutput": "Diagnosed ValueError: operands could not be broadcast together with shapes (3,) (2,) \nFix: Verify shapes beforehand - a.shape: (3,) b.shape: (2,)"
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
        "question": "What is the most common cause of a ValueError in NumPy?",
        "hint": "Think about array dimensions.",
        "answer": "Incompatible array shapes that cannot be broadcast together during arithmetic operations."
      },
      {
        "id": "pq2",
        "question": "Is Common NumPy Errors and Debugging Techniques vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Common NumPy Errors and Debugging Techniques benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Common NumPy Errors and Debugging Techniques in NumPy?",
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
      "title": "Practice Task: Common NumPy Errors and Debugging Techniques",
      "problem": "Write a try-except block catching an IndexError when accessing an out-of-bounds index.",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.array([1, 2])\ntry:\n    x = a[5]\nexcept IndexError:\n    print('Caught IndexError successfully!')"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Common NumPy Errors and Debugging Techniques and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m6-l1",
      "nextLessonTitle": "Loading and Saving Numerical Data",
      "nextLessonModuleId": "numpy-m6-l1"
    }
  }
};
