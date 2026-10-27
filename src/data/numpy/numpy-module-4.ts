import { ModuleData, LessonContent } from '@/lib/types';

export const numpyModule4Data: ModuleData = {
  "id": "numpy-module-4",
  "number": 4,
  "title": "Mathematical and Statistical Operations",
  "subtitle": "Central Tendency, Linear Algebra, Modern Random Generators, and Missing Data Handling",
  "description": "Perform rigorous statistical and linear algebraic computations. Learn summary statistics, matrix multiplication (@), system solvers, reproducible RNG, and NaN-safe reductions.",
  "icon": "Layers",
  "badge": "Math & Statistics",
  "estimatedHours": 14,
  "topicsCount": 11,
  "lessons": [
    {
      "id": "numpy-m4-l1",
      "moduleId": "numpy-module-4",
      "title": "Sum, Mean, Median, Minimum, and Maximum",
      "description": "Measures of central tendency, range, and extreme values across arrays",
      "order": 1,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m4-l2",
      "moduleId": "numpy-module-4",
      "title": "Variance and Standard Deviation",
      "description": "Quantifying data dispersion, volatility, and spread around the central mean",
      "order": 2,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m4-l3",
      "moduleId": "numpy-module-4",
      "title": "Percentiles, Quantiles, and Interquartile Range (IQR)",
      "description": "Dividing sorted distributions into ranked segments and detecting non-parametric spread",
      "order": 3,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m4-l4",
      "moduleId": "numpy-module-4",
      "title": "Vector Dot Products and Geometric Projections",
      "description": "Computing scalar projections, similarity scores, and inner products",
      "order": 4,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m4-l5",
      "moduleId": "numpy-module-4",
      "title": "Matrix Multiplication with np.matmul() and the @ Operator",
      "description": "Executing linear algebraic transformations, projections, and neural network layer forward passes",
      "order": 5,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m4-l6",
      "moduleId": "numpy-module-4",
      "title": "Basic Linear Algebra (np.linalg.inv, det, solve)",
      "description": "Solving systems of linear equations, matrix inversion, and determinant computation",
      "order": 6,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Advanced"
    },
    {
      "id": "numpy-m4-l7",
      "moduleId": "numpy-module-4",
      "title": "Random Number Generation with np.random.default_rng()",
      "description": "Modern BitGenerator architectures, PCG64 random streams, and legacy API upgrades",
      "order": 7,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m4-l8",
      "moduleId": "numpy-module-4",
      "title": "Reproducible Random Numbers & Seed Management",
      "description": "Ensuring deterministic experiments, reproducible research, and debugging stability",
      "order": 8,
      "readTimeMinutes": 12,
      "visualizerType": "numpy-interactive",
      "difficulty": "Beginner"
    },
    {
      "id": "numpy-m4-l9",
      "moduleId": "numpy-module-4",
      "title": "Random Sampling and Probability Distributions",
      "description": "Drawing samples from Normal, Binomial, Poisson, and Uniform distributions",
      "order": 9,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m4-l10",
      "moduleId": "numpy-module-4",
      "title": "Covariance and Correlation Analysis",
      "description": "Quantifying linear relationships, dependency directions, and normalized Pearson matrices",
      "order": 10,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    },
    {
      "id": "numpy-m4-l11",
      "moduleId": "numpy-module-4",
      "title": "Handling Missing and NaN Values with NumPy Functions",
      "description": "Diagnosing np.nan, avoiding silent statistical poisoning, and using nan* functions",
      "order": 11,
      "readTimeMinutes": 14,
      "visualizerType": "numpy-interactive",
      "difficulty": "Intermediate"
    }
  ]
};

export const numpyModule4Lessons: Record<string, LessonContent> = {
  "numpy-m4-l1": {
    "id": "numpy-m4-l1",
    "moduleId": "numpy-module-4",
    "title": "Sum, Mean, Median, Minimum, and Maximum",
    "subtitle": "Measures of central tendency, range, and extreme values across arrays",
    "order": 1,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Sum, Mean, Median, Minimum, and Maximum.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Summarizing a Sports Team's Season Performance",
      "text": "To summarize a cricket team's season, the coach calculates: the total runs scored (sum), average runs per game (mean), typical middle performance ignoring blowouts (median), worst game (min), and best game (max).",
      "metaphor": "Summary statistics capture central tendency and bounds without inspecting every individual game."
    },
    "problemSolved": {
      "title": "Sensitivity of Mean to Extreme Outliers",
      "description": "If a billionaire walks into a cafe of 10 people, the mean net worth jumps to $100M, but the median stays at $50,000. NumPy provides both np.mean() and np.median() to diagnose skewness.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Sum, Mean, Median, Minimum, and Maximum.",
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
      "overview": "Mathematical foundations for Sum, Mean, Median, Minimum, and Maximum.",
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
      "title": "Complexity & Correctness of Sum, Mean, Median, Minimum, and Maximum",
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
      "scenario": "Student Exam Analytics",
      "dataset": [
        {
          "Record": 1,
          "Context": "Calculating class averages, median score, and range of marks.",
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
      "title": "Visual Architecture: Sum, Mean, Median, Minimum, and Maximum",
      "description": "How Sum, Mean, Median, Minimum, and Maximum operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nmarks = np.array([55, 60, 65, 70, 75, 80, 100])\nprint('Sum:', np.sum(marks))\nprint('Mean:', np.mean(marks))\nprint('Median:', np.median(marks))\nprint('Min:', np.min(marks))\nprint('Max:', np.max(marks))\nprint('Peak-to-Peak Range (max - min):', np.ptp(marks))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nmarks = np.array([55, 60, 65, 70, 75, 80, 100])\nprint('Sum:', np.sum(marks))\nprint('Mean:', np.mean(marks))\nprint('Median:', np.median(marks))\nprint('Min:', np.min(marks))\nprint('Max:', np.max(marks))\nprint('Peak-to-Peak Range (max - min):', np.ptp(marks))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nmarks = np.array([55, 60, 65, 70, 75, 80, 100])\nprint('Sum:', np.sum(marks))\nprint('Mean:', np.mean(marks))\nprint('Median:', np.median(marks))\nprint('Min:', np.min(marks))\nprint('Max:', np.max(marks))\nprint('Peak-to-Peak Range (max - min):', np.ptp(marks))",
      "expectedOutput": "Sum: 505\nMean: 72.14285714285714\nMedian: 70.0\nMin: 55\nMax: 100\nPeak-to-Peak Range (max - min): 45"
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
        "question": "Why is median more robust than mean?",
        "hint": "Think about array dimensions.",
        "answer": "Median is the 50th percentile rank; extreme outliers at either tail do not shift the middle rank."
      },
      {
        "id": "pq2",
        "question": "Is Sum, Mean, Median, Minimum, and Maximum vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Sum, Mean, Median, Minimum, and Maximum benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Sum, Mean, Median, Minimum, and Maximum in NumPy?",
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
      "title": "Practice Task: Sum, Mean, Median, Minimum, and Maximum",
      "problem": "Compute the mean and median of [10, 12, 14, 15, 1000].",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.array([10, 12, 14, 15, 1000])\nprint('Mean:', np.mean(a), 'Median:', np.median(a))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Sum, Mean, Median, Minimum, and Maximum and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l2",
      "nextLessonTitle": "Variance and Standard Deviation",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l2": {
    "id": "numpy-m4-l2",
    "moduleId": "numpy-module-4",
    "title": "Variance and Standard Deviation",
    "subtitle": "Quantifying data dispersion, volatility, and spread around the central mean",
    "order": 2,
    "readTimeMinutes": 12,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Variance and Standard Deviation.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A Predictable Train Schedule vs an Unpredictable Bus",
      "text": "Train A and Bus B both take an average of 30 minutes. But Train A always takes between 29 and 31 minutes (low variance), while Bus B takes between 10 and 50 minutes (high variance). Standard deviation measures this unpredictability.",
      "metaphor": "Variance (sigma^2) and Standard Deviation (sigma) measure the spread of observations around the mean."
    },
    "problemSolved": {
      "title": "Degrees of Freedom Trap (ddof=0 vs ddof=1)",
      "description": "By default, NumPy's np.std(ddof=0) computes population standard deviation (dividing by N). For sample data in statistics, you must pass ddof=1 (dividing by N - 1) to avoid underestimating true variance.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Variance and Standard Deviation.",
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
      "overview": "Mathematical foundations for Variance and Standard Deviation.",
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
      "title": "Complexity & Correctness of Variance and Standard Deviation",
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
      "scenario": "Employee Salary Dispersion",
      "dataset": [
        {
          "Record": 1,
          "Context": "Measuring income inequality and dispersion in a company department.",
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
      "title": "Visual Architecture: Variance and Standard Deviation",
      "description": "How Variance and Standard Deviation operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nsalaries = np.array([50, 52, 48, 51, 49, 110])\nvar_pop = np.var(salaries)\nstd_pop = np.std(salaries)\nstd_sample = np.std(salaries, ddof=1)\nprint('Mean salary:', np.mean(salaries))\nprint('Population std (ddof=0):', std_pop)\nprint('Sample std (ddof=1):', std_sample)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nsalaries = np.array([50, 52, 48, 51, 49, 110])\nvar_pop = np.var(salaries)\nstd_pop = np.std(salaries)\nstd_sample = np.std(salaries, ddof=1)\nprint('Mean salary:', np.mean(salaries))\nprint('Population std (ddof=0):', std_pop)\nprint('Sample std (ddof=1):', std_sample)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nsalaries = np.array([50, 52, 48, 51, 49, 110])\nvar_pop = np.var(salaries)\nstd_pop = np.std(salaries)\nstd_sample = np.std(salaries, ddof=1)\nprint('Mean salary:', np.mean(salaries))\nprint('Population std (ddof=0):', std_pop)\nprint('Sample std (ddof=1):', std_sample)",
      "expectedOutput": "Mean salary: 60.0\nPopulation std (ddof=0): 22.397916569776456\nSample std (ddof=1): 24.535688292770594"
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
        "question": "What is the mathematical relationship between variance and standard deviation?",
        "hint": "Think about array dimensions.",
        "answer": "Standard deviation is the square root of variance: sigma = sqrt(sigma^2)."
      },
      {
        "id": "pq2",
        "question": "Is Variance and Standard Deviation vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Variance and Standard Deviation benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Variance and Standard Deviation in NumPy?",
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
      "title": "Practice Task: Variance and Standard Deviation",
      "problem": "Calculate sample standard deviation (ddof=1) of marks [70, 75, 80, 85, 90].",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nm = np.array([70, 75, 80, 85, 90])\nprint('Sample std:', np.std(m, ddof=1))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Variance and Standard Deviation and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l3",
      "nextLessonTitle": "Percentiles, Quantiles, and Interquartile Range (IQR)",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l3": {
    "id": "numpy-m4-l3",
    "moduleId": "numpy-module-4",
    "title": "Percentiles, Quantiles, and Interquartile Range (IQR)",
    "subtitle": "Dividing sorted distributions into ranked segments and detecting non-parametric spread",
    "order": 3,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Percentiles, Quantiles, and Interquartile Range (IQR).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "College Entrance Exam Percentile Ranks",
      "text": "If you score in the 90th percentile on the SAT, you scored higher than 90% of all test takers. np.percentile() splits arrays into 100 slices. The Interquartile Range (IQR = Q3 - Q1) covers the middle 50% of students.",
      "metaphor": "Percentiles measure relative position regardless of distribution shape or normality."
    },
    "problemSolved": {
      "title": "Robust Outlier Detection Without Gaussian Assumptions",
      "description": "Z-scores fail when data is skewed. The Tukey IQR rule (outliers < Q1 - 1.5*IQR or > Q3 + 1.5*IQR) detects anomalies robustly in any distribution.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Percentiles, Quantiles, and Interquartile Range (IQR).",
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
      "overview": "Mathematical foundations for Percentiles, Quantiles, and Interquartile Range (IQR).",
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
      "title": "Complexity & Correctness of Percentiles, Quantiles, and Interquartile Range (IQR)",
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
      "scenario": "Customer Spending Quartiles",
      "dataset": [
        {
          "Record": 1,
          "Context": "Segmenting shoppers into budget (Q1), typical (Q2-Q3), and VIP (Q4) tiers.",
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
      "title": "Visual Architecture: Percentiles, Quantiles, and Interquartile Range (IQR)",
      "description": "How Percentiles, Quantiles, and Interquartile Range (IQR) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\ndata = np.array([12, 15, 18, 22, 25, 28, 32, 35, 40, 95])\nq25 = np.percentile(data, 25)\nq50 = np.percentile(data, 50)  # median\nq75 = np.percentile(data, 75)\niqr = q75 - q25\nprint('Q1 (25th):', q25, 'Q2 (Median):', q50, 'Q3 (75th):', q75)\nprint('IQR:', iqr)\nprint('Outlier bounds:', (q25 - 1.5 * iqr, q75 + 1.5 * iqr))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\ndata = np.array([12, 15, 18, 22, 25, 28, 32, 35, 40, 95])\nq25 = np.percentile(data, 25)\nq50 = np.percentile(data, 50)  # median\nq75 = np.percentile(data, 75)\niqr = q75 - q25\nprint('Q1 (25th):', q25, 'Q2 (Median):', q50, 'Q3 (75th):', q75)\nprint('IQR:', iqr)\nprint('Outlier bounds:', (q25 - 1.5 * iqr, q75 + 1.5 * iqr))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\ndata = np.array([12, 15, 18, 22, 25, 28, 32, 35, 40, 95])\nq25 = np.percentile(data, 25)\nq50 = np.percentile(data, 50)  # median\nq75 = np.percentile(data, 75)\niqr = q75 - q25\nprint('Q1 (25th):', q25, 'Q2 (Median):', q50, 'Q3 (75th):', q75)\nprint('IQR:', iqr)\nprint('Outlier bounds:', (q25 - 1.5 * iqr, q75 + 1.5 * iqr))",
      "expectedOutput": "Q1 (25th): 19.0 Q2 (Median): 26.5 Q3 (75th): 34.25\nIQR: 15.25\nOutlier bounds: (np.float64(-3.875), np.float64(57.125))"
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
        "question": "What is the difference between np.percentile() and np.quantile()?",
        "hint": "Think about array dimensions.",
        "answer": "np.percentile() accepts values from 0 to 100, while np.quantile() accepts values from 0.0 to 1.0."
      },
      {
        "id": "pq2",
        "question": "Is Percentiles, Quantiles, and Interquartile Range (IQR) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Percentiles, Quantiles, and Interquartile Range (IQR) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Percentiles, Quantiles, and Interquartile Range (IQR) in NumPy?",
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
      "title": "Practice Task: Percentiles, Quantiles, and Interquartile Range (IQR)",
      "problem": "Compute the 25th, 50th, and 75th percentiles of np.arange(1, 101).",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\na = np.arange(1, 101)\nprint(np.percentile(a, [25, 50, 75]))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Percentiles, Quantiles, and Interquartile Range (IQR) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l4",
      "nextLessonTitle": "Vector Dot Products and Geometric Projections",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l4": {
    "id": "numpy-m4-l4",
    "moduleId": "numpy-module-4",
    "title": "Vector Dot Products and Geometric Projections",
    "subtitle": "Computing scalar projections, similarity scores, and inner products",
    "order": 4,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Vector Dot Products and Geometric Projections.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Work Done Moving an Object & Shopping Bill Calculations",
      "text": "In physics, Work = Force * Displacement * cos(theta). If you push in the exact direction of travel, work is maximized. In shopping, Total Bill = Quantities (dot) Prices. The dot product multiplies matching pairs and sums them into a single scalar.",
      "metaphor": "The dot product u . v = sum(u_i * v_i) measures alignment and calculates linear combinations."
    },
    "problemSolved": {
      "title": "Calculating Cosine Similarity and Word Embeddings",
      "description": "In AI, comparing two text embeddings requires computing their normalized dot product: (u . v) / (||u|| * ||v||) to measure semantic similarity.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Vector Dot Products and Geometric Projections.",
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
      "overview": "Mathematical foundations for Vector Dot Products and Geometric Projections.",
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
      "title": "Complexity & Correctness of Vector Dot Products and Geometric Projections",
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
      "scenario": "Calculating Shopping Receipt Total",
      "dataset": [
        {
          "Record": 1,
          "Context": "Quantities [3 apples, 2 milks, 1 bread] dot Prices [$1.5, $3.0, $2.5].",
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
      "title": "Visual Architecture: Vector Dot Products and Geometric Projections",
      "description": "How Vector Dot Products and Geometric Projections operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nu = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\ndot_prod = np.dot(u, v)  # 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32\nprint('Vector u:', u)\nprint('Vector v:', v)\nprint('Dot product (u . v):', dot_prod)\nprint('Verified with sum(u * v):', np.sum(u * v))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nu = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\ndot_prod = np.dot(u, v)  # 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32\nprint('Vector u:', u)\nprint('Vector v:', v)\nprint('Dot product (u . v):', dot_prod)\nprint('Verified with sum(u * v):', np.sum(u * v))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nu = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\ndot_prod = np.dot(u, v)  # 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32\nprint('Vector u:', u)\nprint('Vector v:', v)\nprint('Dot product (u . v):', dot_prod)\nprint('Verified with sum(u * v):', np.sum(u * v))",
      "expectedOutput": "Vector u: [1 2 3]\nVector v: [4 5 6]\nDot product (u . v): 32\nVerified with sum(u * v): 32"
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
        "question": "What does a dot product of zero between two non-zero vectors mean geometrically?",
        "hint": "Think about array dimensions.",
        "answer": "It means the two vectors are strictly orthogonal (perpendicular at 90 degrees)."
      },
      {
        "id": "pq2",
        "question": "Is Vector Dot Products and Geometric Projections vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Vector Dot Products and Geometric Projections benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Vector Dot Products and Geometric Projections in NumPy?",
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
      "title": "Practice Task: Vector Dot Products and Geometric Projections",
      "problem": "Compute the dot product between [2, 3] and [4, -1].",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nprint(np.dot(np.array([2, 3]), np.array([4, -1])))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Vector Dot Products and Geometric Projections and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l5",
      "nextLessonTitle": "Matrix Multiplication with np.matmul() and the @ Operator",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l5": {
    "id": "numpy-m4-l5",
    "moduleId": "numpy-module-4",
    "title": "Matrix Multiplication with np.matmul() and the @ Operator",
    "subtitle": "Executing linear algebraic transformations, projections, and neural network layer forward passes",
    "order": 5,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Matrix Multiplication with np.matmul() and the @ Operator.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Calculating Factory Output Across Multiple Days and Products",
      "text": "A factory makes Chairs and Tables. Each requires Wood and Steel. A matrix multiplication takes the (Days x Products) production matrix and multiplies it by the (Products x Materials) bill-of-materials matrix to yield the (Days x Materials) requirements in one step.",
      "metaphor": "Matrix multiplication multiplies rows by columns: (M x K) @ (K x N) -> (M x N)."
    },
    "problemSolved": {
      "title": "The Fatal Trap of Using * Instead of @",
      "description": "Writing A * B performs element-wise multiplication. In linear regression and neural networks, you need true matrix multiplication: A @ B or np.matmul(A, B).",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Matrix Multiplication with np.matmul() and the @ Operator.",
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
      "overview": "Mathematical foundations for Matrix Multiplication with np.matmul() and the @ Operator.",
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
      "title": "Complexity & Correctness of Matrix Multiplication with np.matmul() and the @ Operator",
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
      "scenario": "Neural Network Dense Layer Forward Pass",
      "dataset": [
        {
          "Record": 1,
          "Context": "Multiplying input batch X (N x D) by weight matrix W (D x H) to compute layer activations.",
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
      "title": "Visual Architecture: Matrix Multiplication with np.matmul() and the @ Operator",
      "description": "How Matrix Multiplication with np.matmul() and the @ Operator operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nA = np.array([\n    [1, 2],\n    [3, 4]\n])\nB = np.array([\n    [5, 6],\n    [7, 8]\n])\nelem_mult = A * B\nmatrix_mult = A @ B  # Or np.matmul(A, B)\nprint('Element-wise A * B:\\n', elem_mult)\nprint('Matrix multiplication A @ B:\\n', matrix_mult)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nA = np.array([\n    [1, 2],\n    [3, 4]\n])\nB = np.array([\n    [5, 6],\n    [7, 8]\n])\nelem_mult = A * B\nmatrix_mult = A @ B  # Or np.matmul(A, B)\nprint('Element-wise A * B:\\n', elem_mult)\nprint('Matrix multiplication A @ B:\\n', matrix_mult)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nA = np.array([\n    [1, 2],\n    [3, 4]\n])\nB = np.array([\n    [5, 6],\n    [7, 8]\n])\nelem_mult = A * B\nmatrix_mult = A @ B  # Or np.matmul(A, B)\nprint('Element-wise A * B:\\n', elem_mult)\nprint('Matrix multiplication A @ B:\\n', matrix_mult)",
      "expectedOutput": "Element-wise A * B:\n [[ 5 12]\n [21 32]]\nMatrix multiplication A @ B:\n [[19 22]\n [43 50]]"
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
        "question": "What condition must be satisfied for two matrices A and B to be multiplied with A @ B?",
        "hint": "Think about array dimensions.",
        "answer": "The number of columns in A must exactly equal the number of rows in B."
      },
      {
        "id": "pq2",
        "question": "Is Matrix Multiplication with np.matmul() and the @ Operator vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Matrix Multiplication with np.matmul() and the @ Operator benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Matrix Multiplication with np.matmul() and the @ Operator in NumPy?",
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
      "title": "Practice Task: Matrix Multiplication with np.matmul() and the @ Operator",
      "problem": "Multiply a 2x3 matrix of ones by a 3x2 matrix of twos using @.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nA = np.ones((2, 3))\nB = np.full((3, 2), 2)\nprint(A @ B)"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Matrix Multiplication with np.matmul() and the @ Operator and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l6",
      "nextLessonTitle": "Basic Linear Algebra (np.linalg.inv, det, solve)",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l6": {
    "id": "numpy-m4-l6",
    "moduleId": "numpy-module-4",
    "title": "Basic Linear Algebra (np.linalg.inv, det, solve)",
    "subtitle": "Solving systems of linear equations, matrix inversion, and determinant computation",
    "order": 6,
    "readTimeMinutes": 14,
    "difficulty": "Advanced",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Basic Linear Algebra (np.linalg.inv, det, solve).",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Solving for Ticket Prices in a School Drama Production",
      "text": "2 adults and 3 children paid $34; 3 adults and 1 child paid $30. What is the price of an adult and child ticket? Linear algebra expresses this as A x = b and solves for x = A^(-1) b instantly.",
      "metaphor": "np.linalg provides robust LAPACK-backed routines for matrix inverses, determinants, and linear systems."
    },
    "problemSolved": {
      "title": "Numerical Instability of Explicit Matrix Inversion",
      "description": "Computing x = inv(A) @ b is slower and numerically unstable. Always use np.linalg.solve(A, b), which uses LU decomposition without explicit inversion.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Basic Linear Algebra (np.linalg.inv, det, solve).",
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
      "overview": "Mathematical foundations for Basic Linear Algebra (np.linalg.inv, det, solve).",
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
      "title": "Complexity & Correctness of Basic Linear Algebra (np.linalg.inv, det, solve)",
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
      "scenario": "Ordinary Least Squares Closed-Form Normal Equation",
      "dataset": [
        {
          "Record": 1,
          "Context": "Solving (X^T X) theta = X^T y to find optimal linear regression weights.",
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
      "title": "Visual Architecture: Basic Linear Algebra (np.linalg.inv, det, solve)",
      "description": "How Basic Linear Algebra (np.linalg.inv, det, solve) operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\n# 2x + 3y = 34\n# 3x + 1y = 30\nA = np.array([[2, 3], [3, 1]])\nb = np.array([34, 30])\n# Solve Ax = b directly\nsolution = np.linalg.solve(A, b)\ndet = np.linalg.det(A)\nprint('Determinant:', round(det, 2))\nprint('Solution [adult_price, child_price]:', solution)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\n# 2x + 3y = 34\n# 3x + 1y = 30\nA = np.array([[2, 3], [3, 1]])\nb = np.array([34, 30])\n# Solve Ax = b directly\nsolution = np.linalg.solve(A, b)\ndet = np.linalg.det(A)\nprint('Determinant:', round(det, 2))\nprint('Solution [adult_price, child_price]:', solution)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\n# 2x + 3y = 34\n# 3x + 1y = 30\nA = np.array([[2, 3], [3, 1]])\nb = np.array([34, 30])\n# Solve Ax = b directly\nsolution = np.linalg.solve(A, b)\ndet = np.linalg.det(A)\nprint('Determinant:', round(det, 2))\nprint('Solution [adult_price, child_price]:', solution)",
      "expectedOutput": "Determinant: -7.0\nSolution [adult_price, child_price]: [8. 6.]"
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
        "question": "Why is np.linalg.solve(A, b) preferred over np.linalg.inv(A) @ b?",
        "hint": "Think about array dimensions.",
        "answer": "np.linalg.solve is faster and much less prone to floating-point rounding errors and numerical instability."
      },
      {
        "id": "pq2",
        "question": "Is Basic Linear Algebra (np.linalg.inv, det, solve) vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Basic Linear Algebra (np.linalg.inv, det, solve) benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Basic Linear Algebra (np.linalg.inv, det, solve) in NumPy?",
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
      "title": "Practice Task: Basic Linear Algebra (np.linalg.inv, det, solve)",
      "problem": "Solve the system: 1x + 1y = 10 and 2x - 1y = 5.",
      "difficulty": "Advanced",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nA = np.array([[1, 1], [2, -1]])\nb = np.array([10, 5])\nprint(np.linalg.solve(A, b))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Basic Linear Algebra (np.linalg.inv, det, solve) and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l7",
      "nextLessonTitle": "Random Number Generation with np.random.default_rng()",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l7": {
    "id": "numpy-m4-l7",
    "moduleId": "numpy-module-4",
    "title": "Random Number Generation with np.random.default_rng()",
    "subtitle": "Modern BitGenerator architectures, PCG64 random streams, and legacy API upgrades",
    "order": 7,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Random Number Generation with np.random.default_rng().",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A Cryptographically Sound Roulette Wheel",
      "text": "Traditional random generators were like old physical roulette wheels with subtle manufacturer flaws. Modern np.random.default_rng() uses PCG64, an ultra-fast algorithm with a 128-bit period that eliminates bias.",
      "metaphor": "default_rng() is the official modern NumPy API replacing the legacy np.random.* functions."
    },
    "problemSolved": {
      "title": "Using Deprecated Legacy np.random.seed() and np.random.rand()",
      "description": "The legacy np.random functions rely on a global shared state with poor statistical properties. Modern code instantiates an isolated Generator: rng = np.random.default_rng().",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Random Number Generation with np.random.default_rng().",
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
      "overview": "Mathematical foundations for Random Number Generation with np.random.default_rng().",
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
      "title": "Complexity & Correctness of Random Number Generation with np.random.default_rng()",
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
      "scenario": "Monte Carlo Simulation",
      "dataset": [
        {
          "Record": 1,
          "Context": "Simulating 1,000 portfolio paths to assess financial market tail-risk.",
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
      "title": "Visual Architecture: Random Number Generation with np.random.default_rng()",
      "description": "How Random Number Generation with np.random.default_rng() operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nrng = np.random.default_rng(seed=42)\nuniform_floats = rng.uniform(low=0.0, high=1.0, size=4)\nrandom_ints = rng.integers(low=1, high=7, size=6)  # Die rolls 1 to 6\nprint('Uniform floats [0, 1):', uniform_floats)\nprint('6 Die rolls (1 to 6):', random_ints)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nrng = np.random.default_rng(seed=42)\nuniform_floats = rng.uniform(low=0.0, high=1.0, size=4)\nrandom_ints = rng.integers(low=1, high=7, size=6)  # Die rolls 1 to 6\nprint('Uniform floats [0, 1):', uniform_floats)\nprint('6 Die rolls (1 to 6):', random_ints)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nrng = np.random.default_rng(seed=42)\nuniform_floats = rng.uniform(low=0.0, high=1.0, size=4)\nrandom_ints = rng.integers(low=1, high=7, size=6)  # Die rolls 1 to 6\nprint('Uniform floats [0, 1):', uniform_floats)\nprint('6 Die rolls (1 to 6):', random_ints)",
      "expectedOutput": "Uniform floats [0, 1): [0.77395605 0.43887844 0.85859792 0.69736803]\n6 Die rolls (1 to 6): [2 1 4 6 5 5]"
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
        "question": "Why did NumPy replace np.random.rand() with np.random.default_rng()?",
        "hint": "Think about array dimensions.",
        "answer": "default_rng() uses the modern PCG64 BitGenerator, which is faster, has better statistical randomness, and avoids mutable global state."
      },
      {
        "id": "pq2",
        "question": "Is Random Number Generation with np.random.default_rng() vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Random Number Generation with np.random.default_rng() benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Random Number Generation with np.random.default_rng() in NumPy?",
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
      "title": "Practice Task: Random Number Generation with np.random.default_rng()",
      "problem": "Generate 5 random integers between 10 and 20 inclusive using default_rng().",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nrng = np.random.default_rng(42)\nprint(rng.integers(10, 21, size=5))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Random Number Generation with np.random.default_rng() and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l8",
      "nextLessonTitle": "Reproducible Random Numbers & Seed Management",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l8": {
    "id": "numpy-m4-l8",
    "moduleId": "numpy-module-4",
    "title": "Reproducible Random Numbers & Seed Management",
    "subtitle": "Ensuring deterministic experiments, reproducible research, and debugging stability",
    "order": 8,
    "readTimeMinutes": 12,
    "difficulty": "Beginner",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Reproducible Random Numbers & Seed Management.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Replaying a Recorded Chess Game Move-by-Move",
      "text": "If you record every move of a chess game in a notebook (the seed), anyone in the world who follows that notebook will recreate the exact identical board state at step 40. Seeding ensures your random experiments are 100% reproducible.",
      "metaphor": "Setting a seed initializes the pseudorandom generator algorithm to a deterministic starting point."
    },
    "problemSolved": {
      "title": "Non-Deterministic Machine Learning Training Runs",
      "description": "If you do not seed your random generator, every run gives slightly different train/test splits and weight initializations, making it impossible to know if an accuracy change came from your model or random luck.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Reproducible Random Numbers & Seed Management.",
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
      "overview": "Mathematical foundations for Reproducible Random Numbers & Seed Management.",
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
      "title": "Complexity & Correctness of Reproducible Random Numbers & Seed Management",
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
      "scenario": "Scientific Benchmarking & Paper Replication",
      "dataset": [
        {
          "Record": 1,
          "Context": "Ensuring academic peer reviewers can replicate experimental accuracy down to the decimal.",
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
      "title": "Visual Architecture: Reproducible Random Numbers & Seed Management",
      "description": "How Reproducible Random Numbers & Seed Management operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\n# Run 1 with seed 100\nrng1 = np.random.default_rng(seed=100)\nsample1 = rng1.normal(0, 1, 3)\n# Run 2 with same seed 100\nrng2 = np.random.default_rng(seed=100)\nsample2 = rng2.normal(0, 1, 3)\nprint('Run 1:', sample1)\nprint('Run 2:', sample2)\nprint('Exact match verified:', np.array_equal(sample1, sample2))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\n# Run 1 with seed 100\nrng1 = np.random.default_rng(seed=100)\nsample1 = rng1.normal(0, 1, 3)\n# Run 2 with same seed 100\nrng2 = np.random.default_rng(seed=100)\nsample2 = rng2.normal(0, 1, 3)\nprint('Run 1:', sample1)\nprint('Run 2:', sample2)\nprint('Exact match verified:', np.array_equal(sample1, sample2))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\n# Run 1 with seed 100\nrng1 = np.random.default_rng(seed=100)\nsample1 = rng1.normal(0, 1, 3)\n# Run 2 with same seed 100\nrng2 = np.random.default_rng(seed=100)\nsample2 = rng2.normal(0, 1, 3)\nprint('Run 1:', sample1)\nprint('Run 2:', sample2)\nprint('Exact match verified:', np.array_equal(sample1, sample2))",
      "expectedOutput": "Run 1: [-1.15754965  0.2897558   0.78085407]\nRun 2: [-1.15754965  0.2897558   0.78085407]\nExact match verified: True"
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
        "question": "What happens if you omit the seed parameter in np.random.default_rng()?",
        "hint": "Think about array dimensions.",
        "answer": "NumPy seeds the generator from the operating system's cryptographic entropy pool (/dev/urandom), producing non-reproducible sequences."
      },
      {
        "id": "pq2",
        "question": "Is Reproducible Random Numbers & Seed Management vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Reproducible Random Numbers & Seed Management benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Reproducible Random Numbers & Seed Management in NumPy?",
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
      "title": "Practice Task: Reproducible Random Numbers & Seed Management",
      "problem": "Demonstrate that two generators initialized with seed 99 generate identical arrays.",
      "difficulty": "Beginner",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nr1 = np.random.default_rng(99).integers(0, 100, 3)\nr2 = np.random.default_rng(99).integers(0, 100, 3)\nprint('Arrays equal:', np.array_equal(r1, r2))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Reproducible Random Numbers & Seed Management and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l9",
      "nextLessonTitle": "Random Sampling and Probability Distributions",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l9": {
    "id": "numpy-m4-l9",
    "moduleId": "numpy-module-4",
    "title": "Random Sampling and Probability Distributions",
    "subtitle": "Drawing samples from Normal, Binomial, Poisson, and Uniform distributions",
    "order": 9,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Random Sampling and Probability Distributions.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Rolling Fair Dice vs Human Height Distributions",
      "text": "A fair die has an equal chance for 1 through 6 (Uniform distribution). Human heights cluster around an average of 170cm with rare extremes (Normal Gaussian bell curve). Customer arrivals at a cafe follow a Poisson distribution.",
      "metaphor": "NumPy provides parameterized samplers for dozens of real-world statistical distributions."
    },
    "problemSolved": {
      "title": "Assuming All Data is Uniformly Distributed",
      "description": "Real-world sensor noise and stock returns are rarely uniform. Using the correct distribution (e.g. Normal or Poisson) is vital for realistic simulations.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Random Sampling and Probability Distributions.",
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
      "overview": "Mathematical foundations for Random Sampling and Probability Distributions.",
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
      "title": "Complexity & Correctness of Random Sampling and Probability Distributions",
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
      "scenario": "Synthetic Data Generation for ML Testing",
      "dataset": [
        {
          "Record": 1,
          "Context": "Generating synthetic patient vitals matching clinical distribution statistics.",
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
      "title": "Visual Architecture: Random Sampling and Probability Distributions",
      "description": "How Random Sampling and Probability Distributions operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nrng = np.random.default_rng(42)\n# Normal distribution (mean=170, std=10) for adult heights\nheights = rng.normal(loc=170, scale=10, size=5)\n# Binomial distribution (n=10 coin flips, p=0.5)\ncoin_heads = rng.binomial(n=10, p=0.5, size=5)\nprint('Simulated heights (cm):', np.round(heights, 1))\nprint('Heads out of 10 coin flips:', coin_heads)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nrng = np.random.default_rng(42)\n# Normal distribution (mean=170, std=10) for adult heights\nheights = rng.normal(loc=170, scale=10, size=5)\n# Binomial distribution (n=10 coin flips, p=0.5)\ncoin_heads = rng.binomial(n=10, p=0.5, size=5)\nprint('Simulated heights (cm):', np.round(heights, 1))\nprint('Heads out of 10 coin flips:', coin_heads)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nrng = np.random.default_rng(42)\n# Normal distribution (mean=170, std=10) for adult heights\nheights = rng.normal(loc=170, scale=10, size=5)\n# Binomial distribution (n=10 coin flips, p=0.5)\ncoin_heads = rng.binomial(n=10, p=0.5, size=5)\nprint('Simulated heights (cm):', np.round(heights, 1))\nprint('Heads out of 10 coin flips:', coin_heads)",
      "expectedOutput": "Simulated heights (cm): [173.  159.6 177.5 179.4 150.5]\nHeads out of 10 coin flips: [8 6 6 3 5]"
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
        "question": "What parameters define a normal Gaussian distribution in NumPy?",
        "hint": "Think about array dimensions.",
        "answer": "loc (the mean / center) and scale (the standard deviation / spread)."
      },
      {
        "id": "pq2",
        "question": "Is Random Sampling and Probability Distributions vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Random Sampling and Probability Distributions benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Random Sampling and Probability Distributions in NumPy?",
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
      "title": "Practice Task: Random Sampling and Probability Distributions",
      "problem": "Generate 1,000 samples from a Normal distribution with mean 0 and std 1, and print sample mean.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nrng = np.random.default_rng(42)\ns = rng.normal(0, 1, 1000)\nprint('Sample mean close to 0:', round(np.mean(s), 2))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Random Sampling and Probability Distributions and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l10",
      "nextLessonTitle": "Covariance and Correlation Analysis",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l10": {
    "id": "numpy-m4-l10",
    "moduleId": "numpy-module-4",
    "title": "Covariance and Correlation Analysis",
    "subtitle": "Quantifying linear relationships, dependency directions, and normalized Pearson matrices",
    "order": 10,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Covariance and Correlation Analysis.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "Ice Cream Sales vs Outdoor Temperature",
      "text": "As temperature rises in July, ice cream sales rise (positive correlation close to +1.0). As temperature rises, hot soup sales fall (negative correlation close to -1.0). Shoe size and test scores have zero correlation (~0.0).",
      "metaphor": "Covariance measures joint variability; Pearson correlation normalizes it to [-1, 1]."
    },
    "problemSolved": {
      "title": "Interpreting Covariance Without Scale Normalization",
      "description": "Covariance depends on measurement units (dollars vs cents). A covariance of 10,000 could be weak or strong. Correlation scales the relationship strictly to [-1, 1].",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Covariance and Correlation Analysis.",
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
      "overview": "Mathematical foundations for Covariance and Correlation Analysis.",
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
      "title": "Complexity & Correctness of Covariance and Correlation Analysis",
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
      "scenario": "Feature Selection in Machine Learning",
      "dataset": [
        {
          "Record": 1,
          "Context": "Identifying highly correlated redundant features to eliminate multicollinearity.",
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
      "title": "Visual Architecture: Covariance and Correlation Analysis",
      "description": "How Covariance and Correlation Analysis operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\n# Study hours vs Exam scores\nhours = np.array([2, 4, 6, 8, 10])\nscores = np.array([50, 65, 75, 85, 95])\ncorr_matrix = np.corrcoef(hours, scores)\nprint('Pearson Correlation Matrix:\\n', corr_matrix)\nprint('Correlation coefficient r:', round(corr_matrix[0, 1], 4))",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\n# Study hours vs Exam scores\nhours = np.array([2, 4, 6, 8, 10])\nscores = np.array([50, 65, 75, 85, 95])\ncorr_matrix = np.corrcoef(hours, scores)\nprint('Pearson Correlation Matrix:\\n', corr_matrix)\nprint('Correlation coefficient r:', round(corr_matrix[0, 1], 4))",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\n# Study hours vs Exam scores\nhours = np.array([2, 4, 6, 8, 10])\nscores = np.array([50, 65, 75, 85, 95])\ncorr_matrix = np.corrcoef(hours, scores)\nprint('Pearson Correlation Matrix:\\n', corr_matrix)\nprint('Correlation coefficient r:', round(corr_matrix[0, 1], 4))",
      "expectedOutput": "Pearson Correlation Matrix:\n [[1.         0.99589321]\n [0.99589321 1.        ]]\nCorrelation coefficient r: 0.9959"
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
        "question": "What does a Pearson correlation of -1.0 indicate?",
        "hint": "Think about array dimensions.",
        "answer": "A perfect negative linear relationship: as feature X increases, feature Y decreases in exact proportion."
      },
      {
        "id": "pq2",
        "question": "Is Covariance and Correlation Analysis vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Covariance and Correlation Analysis benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Covariance and Correlation Analysis in NumPy?",
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
      "title": "Practice Task: Covariance and Correlation Analysis",
      "problem": "Calculate the correlation coefficient between [1, 2, 3] and [2, 4, 6].",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nx = np.array([1, 2, 3])\ny = np.array([2, 4, 6])\nprint('Correlation:', round(np.corrcoef(x, y)[0, 1], 1))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Covariance and Correlation Analysis and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m4-l11",
      "nextLessonTitle": "Handling Missing and NaN Values with NumPy Functions",
      "nextLessonModuleId": "numpy-module-4"
    }
  },
  "numpy-m4-l11": {
    "id": "numpy-m4-l11",
    "moduleId": "numpy-module-4",
    "title": "Handling Missing and NaN Values with NumPy Functions",
    "subtitle": "Diagnosing np.nan, avoiding silent statistical poisoning, and using nan* functions",
    "order": 11,
    "readTimeMinutes": 14,
    "difficulty": "Intermediate",
    "visualizerType": "numpy-interactive",
    "objectives": [
      "Master practical usage and edge cases of Handling Missing and NaN Values with NumPy Functions.",
      "Understand the memory footprint, execution speed, and parameter options.",
      "Avoid common subtle bugs and unexpected dimensional changes.",
      "Apply to realistic data science and machine learning workflows."
    ],
    "prerequisites": [
      "Python fundamentals",
      "NumPy array basics"
    ],
    "analogy": {
      "title": "A Broken Thermometer in a Weather Station",
      "text": "If a sensor wire snaps, it records NaN (Not a Number). If you calculate average temperature with np.mean(), a single NaN infects the entire sum and returns NaN. You must use np.nanmean() to skip broken readings safely.",
      "metaphor": "Standard functions propagate NaN silently; np.nan* functions ignore NaNs during aggregation."
    },
    "problemSolved": {
      "title": "Silent NaN Poisoning of Entire Training Batches",
      "description": "If one feature value contains NaN, standard np.mean(X) evaluates to NaN, crashing downstream gradient descent. Recognizing and handling NaNs protects pipelines.",
      "keyPoints": [
        "Bypasses slow dynamic interpreter overhead.",
        "Enables high-performance vectorized operations at hardware speed.",
        "Ensures memory efficiency and clean mathematical syntax."
      ]
    },
    "intuition": {
      "overview": "Inner mechanics of Handling Missing and NaN Values with NumPy Functions.",
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
      "overview": "Mathematical foundations for Handling Missing and NaN Values with NumPy Functions.",
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
      "title": "Complexity & Correctness of Handling Missing and NaN Values with NumPy Functions",
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
      "scenario": "Weather Station Missing Value Imputation",
      "dataset": [
        {
          "Record": 1,
          "Context": "Imputing missing sensor readings with the monthly median before training.",
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
      "title": "Visual Architecture: Handling Missing and NaN Values with NumPy Functions",
      "description": "How Handling Missing and NaN Values with NumPy Functions operates on array buffers in memory.",
      "features": [
        "Vectorized loops run in compiled C.",
        "Broadcasting avoids redundant memory allocation.",
        "Seamless interoperability with downstream ML tools."
      ]
    },
    "scratchCode": {
      "title": "Interactive Python Demonstration",
      "code": "import numpy as np\nreadings = np.array([20.0, 22.0, np.nan, 26.0, np.nan, 30.0])\nprint('Standard mean (poisoned):', np.mean(readings))\nprint('nanmean (skips NaNs):', np.nanmean(readings))\nprint('nanstd:', round(np.nanstd(readings), 2))\nprint('Boolean mask of NaNs:', np.isnan(readings))\n# Replace NaNs with mean\ncleaned = np.nan_to_num(readings, nan=np.nanmean(readings))\nprint('Cleaned with imputed mean:', cleaned)",
      "explanation": "Direct executable verification."
    },
    "sklearnCode": {
      "title": "Data Science & ML Pipeline Usage",
      "code": "import numpy as np\nreadings = np.array([20.0, 22.0, np.nan, 26.0, np.nan, 30.0])\nprint('Standard mean (poisoned):', np.mean(readings))\nprint('nanmean (skips NaNs):', np.nanmean(readings))\nprint('nanstd:', round(np.nanstd(readings), 2))\nprint('Boolean mask of NaNs:', np.isnan(readings))\n# Replace NaNs with mean\ncleaned = np.nan_to_num(readings, nan=np.nanmean(readings))\nprint('Cleaned with imputed mean:', cleaned)",
      "explanation": "How top data teams use this pattern."
    },
    "runnableCode": {
      "code": "import numpy as np\nreadings = np.array([20.0, 22.0, np.nan, 26.0, np.nan, 30.0])\nprint('Standard mean (poisoned):', np.mean(readings))\nprint('nanmean (skips NaNs):', np.nanmean(readings))\nprint('nanstd:', round(np.nanstd(readings), 2))\nprint('Boolean mask of NaNs:', np.isnan(readings))\n# Replace NaNs with mean\ncleaned = np.nan_to_num(readings, nan=np.nanmean(readings))\nprint('Cleaned with imputed mean:', cleaned)",
      "expectedOutput": "Standard mean (poisoned): nan\nnanmean (skips NaNs): 24.5\nnanstd: 3.84\nBoolean mask of NaNs: [False False  True False  True False]\nCleaned with imputed mean: [20.  22.  24.5 26.  24.5 30. ]"
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
        "question": "Why does np.nan == np.nan evaluate to False in Python and NumPy?",
        "hint": "Think about array dimensions.",
        "answer": "By IEEE 754 floating-point standard, NaN represents an undefined value that is not equal to anything, including itself. Use np.isnan() to test for NaNs."
      },
      {
        "id": "pq2",
        "question": "Is Handling Missing and NaN Values with NumPy Functions vectorized?",
        "hint": "Does it use C loops?",
        "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."
      },
      {
        "id": "pq3",
        "question": "How does Handling Missing and NaN Values with NumPy Functions benefit machine learning pipelines?",
        "hint": "Think of execution speed.",
        "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary advantage of Handling Missing and NaN Values with NumPy Functions in NumPy?",
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
      "title": "Practice Task: Handling Missing and NaN Values with NumPy Functions",
      "problem": "Calculate the mean of [10.0, np.nan, 20.0] ignoring the NaN.",
      "difficulty": "Intermediate",
      "hints": [
        "Review the code example above",
        "Verify the expected output carefully"
      ],
      "starterCode": "import numpy as np\n# Your solution here:\n",
      "solution": "import numpy as np\nprint(np.nanmean(np.array([10.0, np.nan, 20.0])))"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Handling Missing and NaN Values with NumPy Functions and its application in data science.",
        "Learned to avoid common dimensional pitfalls and memory bugs.",
        "Ready to progress to the next topic in the learning path."
      ],
      "nextLessonId": "numpy-m5-l1",
      "nextLessonTitle": "Principles of Vectorization in Numerical Computing",
      "nextLessonModuleId": "numpy-m5-l1"
    }
  }
};
