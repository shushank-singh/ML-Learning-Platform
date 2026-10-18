import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule11Data: PythonModuleData = {
  "id": "python-module-11",
  "number": 11,
  "title": "Python for Data Science",
  "subtitle": "NumPy, Pandas, Matplotlib, EDA & Scikit-learn Pipelines",
  "description": "Python is the lingua franca of data science. Master NumPy vectorized operations, reshape and index ndarrays, wrangle tabular data with Pandas, create publication-quality visualizations with Matplotlib, and build end-to-end sklearn pipelines for ML workflows.",
  "icon": "BarChart2",
  "badge": "Data Science",
  "estimatedHours": 8,
  "topicsCount": 6,
  "lessons": [
    {
      "id": "py-ds-numpy",
      "moduleId": "python-module-11",
      "title": "NumPy Fundamentals and Vectorization",
      "description": "ndarray creation, shape/dtype, broadcasting, indexing, and vectorized ops vs Python loops.",
      "order": 1,
      "readTimeMinutes": 30,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-ds-pandas",
      "moduleId": "python-module-11",
      "title": "Pandas Data Manipulation",
      "description": "Series, DataFrame, iloc/loc, groupby, merge, pivot_table, and handling missing values.",
      "order": 2,
      "readTimeMinutes": 35,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-ds-matplotlib",
      "moduleId": "python-module-11",
      "title": "Data Visualization with Matplotlib",
      "description": "Figure/Axes API, line/bar/scatter/histogram plots, subplots, styling, and saving figures.",
      "order": 3,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-ds-data-cleaning",
      "moduleId": "python-module-11",
      "title": "Data Cleaning and Exploratory Analysis",
      "description": "Handling nulls, outlier detection, feature distributions, correlation, and EDA checklist.",
      "order": 4,
      "readTimeMinutes": 30,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-ds-sklearn",
      "moduleId": "python-module-11",
      "title": "Scikit-learn Integration",
      "description": "fit/transform/predict API, train-test split, cross-validation, and model evaluation metrics.",
      "order": 5,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-ds-pipelines",
      "moduleId": "python-module-11",
      "title": "Reusable Data-Processing Pipelines",
      "description": "sklearn Pipeline, ColumnTransformer, custom transformers, and reproducible preprocessing.",
      "order": 6,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Advanced"
    }
  ]
};

export const pythonModule11Lessons: Record<string, PythonLessonContent> = {
  "py-ds-numpy": {
    "id": "py-ds-numpy",
    "moduleId": "python-module-11",
    "title": "NumPy Fundamentals & Vectorized Computing",
    "subtitle": "ndarrays, Memory Contiguity, Vectorization, Broadcasting & Boolean Masking",
    "order": 1,
    "readTimeMinutes": 30,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Understand the internal architecture of np.ndarray: contiguous memory buffers, strides, and dtypes",
      "Contrast NumPy memory locality with the pointer overhead of Python list-of-boxed-objects",
      "Execute element-wise vectorized arithmetic using CPU SIMD vector lanes",
      "Master the three formal rules of NumPy multidimensional array broadcasting",
      "Perform advanced indexing, slicing, boolean masking, and axis-based aggregations",
      "Avoid unnecessary array copying using views and understand stride semantics"
    ],
    "prerequisites": [
      "Python lists, nested loops, and basic math (vectors and matrices)",
      "Functions and slicing notation"
    ],
    "analogy": {
      "title": "The Contiguous Grain Silo vs Scavenger Hunt",
      "text": "A standard Python list of numbers is like a scavenger hunt: a list container stores an array of memory pointers, each pointing to a separate PyObject allocated somewhere in fragmented RAM, requiring the CPU cache to stall while following memory pointers. A NumPy ndarray is a monolithic grain silo: raw 64-bit floating-point numbers are packed shoulder-to-shoulder in one contiguous block of physical RAM. The CPU streams the entire block into L1 cache in single memory cycles and processes 4 to 8 numbers simultaneously using SIMD hardware vector instructions.",
      "metaphor": "An ndarray is a typed C-array wrapped with stride metadata, converting Python loops into compiled BLAS/LAPACK machine code."
    },
    "problemSolved": {
      "title": "Why NumPy is the Engine of Modern AI and Data Science",
      "description": "Pure Python loops are interpreted, dynamically typed, and branch-predicted at every iteration, making large matrix computations hundreds of times slower than compiled C or Fortran. NumPy bypasses the Python interpreter loop entirely, running bulk calculations at native machine speed.",
      "keyPoints": [
        "50x to 200x speedup: inner loops execute in optimized C/Fortran without Python runtime interpretation overhead",
        "SIMD vectorization: leverages AVX-512 / NEON hardware instructions to compute multiple floats per cycle",
        "Minimal memory footprint: stores raw 4-byte or 8-byte primitives with zero PyObject pointer overhead",
        "Ecosystem foundation: PyTorch, TensorFlow, Pandas, Scikit-learn, and SciPy are all built on NumPy array semantics"
      ]
    },
    "intuition": {
      "overview": "Vectorization replaces explicit Python for-loops with high-level array operations. Broadcasting allows arithmetic between arrays of different shapes by conceptually stretching singleton dimensions.",
      "steps": [
        {
          "step": 1,
          "title": "Contiguous Memory Buffer",
          "description": "An ndarray consists of a continuous chunk of memory plus a header storing shape (dimensions), dtype (data type), and strides (bytes to step along each axis)."
        },
        {
          "step": 2,
          "title": "Element-wise Vectorization",
          "description": "Writing c = a + b triggers a single compiled loop over the contiguous buffer, without instantiating intermediate Python float objects."
        },
        {
          "step": 3,
          "title": "Broadcasting Rules",
          "description": "Two dimensions are compatible if: 1) they are equal, or 2) one of them is 1. Dimensions are compared starting from the trailing (rightmost) dimension backward."
        },
        {
          "step": 4,
          "title": "Boolean Masking",
          "description": "Applying a condition arr > 0 produces a boolean array of matching shape, which can be passed back into arr[arr > 0] to filter elements in C-speed."
        }
      ]
    },
    "codeExample": {
      "title": "Vectorization, Broadcasting, and Axis Reductions in NumPy",
      "code": "import numpy as np\n\n# 1. Array Creation & Properties\narr = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], dtype=np.float64)\nprint(f\"Shape: {arr.shape}, Dtype: {arr.dtype}, Strides: {arr.strides}\")\n\n# 2. Vectorized Arithmetic vs Python loops\n# Vectorized scalar multiplication and addition\nnormalized = (arr - arr.mean()) / arr.std()\nprint(\"Normalized Array:\\n\", normalized.round(2))\n\n# 3. Broadcasting Example: (2, 3) array + (3,) vector\nrow_bias = np.array([10.0, 20.0, 30.0])  # Shape (3,) -> broadcasts to (2, 3)\nbiased = arr + row_bias\nprint(\"Biased Array:\\n\", biased)\n\n# 4. Axis Aggregations (axis=0 means down columns, axis=1 across rows)\ncol_sums = arr.sum(axis=0)  # Shape (3,)\nrow_means = arr.mean(axis=1) # Shape (2,)\nprint(f\"Column sums: {col_sums}, Row means: {row_means}\")\n\n# 5. Boolean Filtering\nmask = arr > 3.5\nprint(\"Elements > 3.5:\", arr[mask])",
      "explanation": "Illustrates memory inspection via strides, zero-loop normalization, broadcasting a 1D vector across a 2D matrix, axis-wise reductions, and boolean filtering."
    },
    "runnableCode": {
      "code": "import numpy as np\n\n# Create 2D matrix\nmatrix = np.arange(1, 10).reshape(3, 3)\nprint(\"Original 3x3 Matrix:\\n\", matrix)\n\n# Vectorized operation: square all elements\nsquares = matrix ** 2\nprint(\"\\nSquared Matrix:\\n\", squares)\n\n# Boolean masking: filter even numbers\neven_mask = (matrix % 2 == 0)\nprint(\"\\nEven mask:\\n\", even_mask)\nprint(\"Even numbers extracted:\", matrix[even_mask])\n\n# Matrix multiplication (@ operator)\nidentity = np.eye(3, dtype=int)\nresult = matrix @ identity\nprint(\"\\nMatrix @ Identity matches original:\", np.array_equal(result, matrix))",
      "expectedOutput": "Original 3x3 Matrix:\n [[1 2 3]\n [4 5 6]\n [7 8 9]]\n\nSquared Matrix:\n [[ 1  4  9]\n [16 25 36]\n [49 64 81]]\n\nEven mask:\n [[False  True False]\n [ True False  True]\n [False  True False]]\nEven numbers extracted: [2 4 6 8]\n\nMatrix @ Identity matches original: True"
    },
    "lineByLineExplanation": [
      {
        "line": "4",
        "lines": "4",
        "code": "matrix = np.arange(1, 10).reshape(3, 3)",
        "codeSnippet": "matrix = np.arange(1, 10).reshape(3, 3)",
        "explanation": "Generates 1..9 in contiguous memory and reinterprets strides to form a 3x3 grid without copying memory."
      },
      {
        "line": "8",
        "lines": "8",
        "code": "squares = matrix ** 2",
        "codeSnippet": "squares = matrix ** 2",
        "explanation": "SIMD-vectorized exponentiation executed directly on continuous machine words."
      },
      {
        "line": "17",
        "lines": "17",
        "code": "result = matrix @ identity",
        "codeSnippet": "result = matrix @ identity",
        "explanation": "Uses the matrix multiplication operator (@), calling optimized BLAS gemm routines under the hood."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using standard Python loops (for x in arr:) instead of vectorized operations",
        "solution": "Always express calculations as array-wide operations or use ufuncs (np.sin, np.exp, etc.). Iterating over an ndarray in Python negates NumPy's performance benefits.",
        "codeExample": "# BAD: 100x slower\nres = [x * 2 for x in arr]\n\n# GOOD: compiled C-speed\nres = arr * 2"
      },
      {
        "mistake": "Confusing views with copies and accidentally mutating original arrays",
        "solution": "Basic slicing (arr[1:5]) returns a VIEW sharing underlying memory. Mutating the slice mutates the original array! Use arr[1:5].copy() if you require independent memory.",
        "codeExample": "sub = arr[:2]       # VIEW: shares buffer\nsub[0] = 999        # MUTATES arr[0]!\nsub = arr[:2].copy() # INDEPENDENT COPY"
      }
    ],
    "bestPractices": [
      "Specify explicit dtypes (e.g. np.float32 or np.float64) to control memory consumption and numerical precision",
      "Use axis=0 for operations across rows (collapsing vertically) and axis=1 for operations across columns (collapsing horizontally)",
      "Leverage np.where(condition, x, y) for vectorized if-else logic",
      "Use the @ operator for matrix multiplication instead of np.dot or element-wise *"
    ],
    "applications": [
      {
        "industry": "Deep Learning & Neural Networks",
        "application": "Layer weight representation and forward pass batching",
        "benefit": "Batched linear transformations (X @ W + b) utilize tensor cores and BLAS routines at teraflop throughput."
      },
      {
        "industry": "Computer Vision & Image Processing",
        "application": "Pixel manipulation and color space conversion",
        "benefit": "Images are represented as (H, W, C) arrays where color channels can be normalized in a single vectorized statement."
      },
      {
        "industry": "Quantitative Finance & Algorithmic Trading",
        "application": "Rolling volatility and portfolio risk metrics",
        "benefit": "Calculates covariance matrices across thousands of securities in milliseconds."
      }
    ],
    "practiceQuestions": [
      {
        "id": "q1",
        "question": "What are the two conditions under which two dimensions are compatible for NumPy broadcasting?",
        "hint": "Examine dimensions starting from the trailing end.",
        "answer": "Two dimensions are compatible if: 1) they are equal in size, or 2) one of them is equal to 1."
      },
      {
        "id": "q2",
        "question": "Why does slicing a NumPy array (arr[1:3]) return a view, whereas slicing a Python list returns a new copy?",
        "hint": "Think about memory buffers and strides.",
        "answer": "NumPy arrays can represent sub-arrays simply by adjusting the pointer offset, shape, and strides without copying the underlying buffer. Python lists must allocate a new list container of pointers."
      },
      {
        "id": "q3",
        "question": "In a 2D array of shape (4, 5), what is the shape of the result when computing arr.sum(axis=0)?",
        "hint": "axis=0 collapses the rows.",
        "answer": "The result has shape (5,). Summing along axis=0 collapses the 4 rows down into column totals."
      }
    ],
    "quiz": [
      {
        "id": "quiz-1",
        "question": "Given an array A of shape (3, 1) and array B of shape (3, 4), what is the shape of A + B after broadcasting?",
        "options": [
          "(3, 1)",
          "(3, 4)",
          "(3, 3)",
          "ValueError: operands could not be broadcast together"
        ],
        "correctIndex": 1,
        "explanation": "Dimension 1 has sizes 1 and 4, which is compatible (1 expands to 4). Dimension 0 has sizes 3 and 3 (equal). Result shape is (3, 4)."
      },
      {
        "id": "quiz-2",
        "question": "Which of the following operations creates a deep copy rather than a memory view of an array?",
        "options": [
          "arr.reshape(2, 3)",
          "arr[1:4]",
          "arr.T",
          "arr.copy()"
        ],
        "correctIndex": 3,
        "explanation": "arr.copy() allocates a brand-new contiguous memory buffer and copies the elements."
      },
      {
        "id": "quiz-3",
        "question": "What operator performs matrix multiplication in modern Python/NumPy?",
        "options": [
          "*",
          "**",
          "@",
          "&"
        ],
        "correctIndex": 2,
        "explanation": "The @ operator performs matrix multiplication, whereas * performs element-wise Hadamard product."
      }
    ],
    "codingChallenge": {
      "title": "Vectorized Min-Max Feature Scaler",
      "problem": "Write a function min_max_scale(matrix: np.ndarray) -> np.ndarray that scales each feature column of a 2D matrix into the range [0.0, 1.0] using vectorization and broadcasting. Formula: (X - min) / (max - min). If max == min for a column, set that column to 0.0.",
      "hints": [
        "Compute col_min = matrix.min(axis=0) and col_max = matrix.max(axis=0).",
        "Use diff = col_max - col_min and np.where(diff == 0, 1.0, diff) to avoid zero division.",
        "Leverage broadcasting to subtract col_min from matrix."
      ],
      "starterCode": "import numpy as np\n\ndef min_max_scale(matrix: np.ndarray) -> np.ndarray:\n    # Scale each column to [0.0, 1.0]\n    pass",
      "solution": "import numpy as np\n\ndef min_max_scale(matrix: np.ndarray) -> np.ndarray:\n    col_min = matrix.min(axis=0)\n    col_max = matrix.max(axis=0)\n    diff = col_max - col_min\n    # Avoid zero division if column is constant\n    safe_diff = np.where(diff == 0, 1.0, diff)\n    scaled = (matrix - col_min) / safe_diff\n    # Zero out constant columns\n    return np.where(diff == 0, 0.0, scaled)"
    },
    "summary": {
      "keyTakeaways": [
        "ndarrays store raw data in contiguous RAM buffers, maximizing CPU L1 cache hits",
        "Vectorized operations replace slow Python loops with hardware SIMD machine instructions",
        "Broadcasting aligns array shapes with dimension 1 expansions along trailing axes",
        "Basic slices and reshapes create memory views; use .copy() when isolated data is needed",
        "NumPy is the foundational computational substrate for Pandas, PyTorch, and Scikit-learn"
      ],
      "nextLessonId": "py-ds-pandas",
      "nextLessonTitle": "Pandas Data Manipulation",
      "nextLessonModuleId": "python-module-11"
    },
    "lineByLine": [
      {
        "line": "4",
        "lines": "4",
        "code": "matrix = np.arange(1, 10).reshape(3, 3)",
        "codeSnippet": "matrix = np.arange(1, 10).reshape(3, 3)",
        "explanation": "Generates 1..9 in contiguous memory and reinterprets strides to form a 3x3 grid without copying memory."
      },
      {
        "line": "8",
        "lines": "8",
        "code": "squares = matrix ** 2",
        "codeSnippet": "squares = matrix ** 2",
        "explanation": "SIMD-vectorized exponentiation executed directly on continuous machine words."
      },
      {
        "line": "17",
        "lines": "17",
        "code": "result = matrix @ identity",
        "codeSnippet": "result = matrix @ identity",
        "explanation": "Uses the matrix multiplication operator (@), calling optimized BLAS gemm routines under the hood."
      }
    ]
  },
  "py-ds-pandas": {
    "id": "py-ds-pandas",
    "moduleId": "python-module-11",
    "title": "Pandas Data Manipulation",
    "subtitle": "Series, DataFrame, iloc vs loc, GroupBy, Merging, and Handling Missing Values",
    "order": 2,
    "readTimeMinutes": 35,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master core Pandas 2D tabular structures: Series (1D labelled) and DataFrame (2D labelled).",
      "Distinguish integer-position indexing (`iloc`) from label-based indexing (`loc`).",
      "Filter, slice, and query rows using boolean masks and `.query()`.",
      "Perform split-apply-combine aggregations with `.groupby()` and table reshaping with `.merge()`, `.pivot_table()`."
    ],
    "prerequisites": [
      "Python dictionaries, lists, and NumPy basics."
    ],
    "analogy": {
      "title": "The Supercharged Relational Spreadsheet",
      "text": "A Python list-of-dicts is like paper index cards in a shoebox. A Pandas DataFrame is a financial spreadsheet with millions of rows running on a supercomputer: every column has a strict C-type, every row has a fast index, and with one command (`df.groupby(\"region\")[\"revenue\"].sum()`), it aggregates millions of transactions in milliseconds.",
      "metaphor": "Pandas brings SQL-like relational power and Excel-like tabular indexing into pure Python."
    },
    "problemSolved": {
      "title": "High-Performance Tabular Wrangling and Cleaning",
      "description": "Raw real-world data contains nulls, misaligned timestamps, and categorical text across heterogeneous columns. Pandas provides vectorized data manipulation and relational algebra without manual for-loops.",
      "keyPoints": [
        "`df.loc[row_label, col_label]` is label-based indexing (inclusive of end bounds).",
        "`df.iloc[row_idx, col_idx]` is 0-based integer position indexing (half-open, exclusive of stop).",
        "Missing values are represented as `np.nan` or `pd.NA`, detected with `.isna()`, and filled with `.fillna()` or dropped with `.dropna()`.",
        "Split-Apply-Combine with `.groupby()` aggregates data by groups in parallel."
      ]
    },
    "intuition": {
      "overview": "A DataFrame is essentially an ordered collection of NumPy arrays aligned by a shared Index object. Vectorized column operations execute in contiguous C memory buffers.",
      "steps": [
        {
          "step": 1,
          "title": "Alignment",
          "description": "Operations align automatically on row and column index labels."
        },
        {
          "step": 2,
          "title": "Vectorized Transform",
          "description": "Applies SIMD-accelerated array transformations column-wise."
        },
        {
          "step": 3,
          "title": "Aggregation",
          "description": "Reduces grouped partitions into summary metrics."
        }
      ]
    },
    "codeExample": {
      "title": "Pandas DataFrame Wrangling and GroupBy Aggregations",
      "code": "import pandas as pd\nimport numpy as np\n\n# Creating DataFrame from dict\ndata = {\n    \"department\": [\"Eng\", \"Eng\", \"HR\", \"Sales\", \"Sales\"],\n    \"employee\": [\"Alice\", \"Bob\", \"Charlie\", \"Diana\", \"Eve\"],\n    \"salary\": [120_000, 110_000, 85_000, 95_000, np.nan],\n    \"years\": [5, 3, 4, 2, 1]\n}\ndf = pd.DataFrame(data)\n\n# Handling missing values\ndf[\"salary\"] = df[\"salary\"].fillna(df[\"salary\"].median())\n\n# Label-based vs Position-based indexing\nfirst_emp_salary = df.loc[0, \"salary\"]     # loc by labels\nfirst_cell = df.iloc[0, 0]                 # iloc by integer positions\n\n# GroupBy split-apply-combine\ndept_stats = df.groupby(\"department\")[\"salary\"].agg([\"mean\", \"count\"]).round(2)\nprint(\"Department Salary Stats:\\n\", dept_stats)",
      "explanation": "Demonstrates creating DataFrames, filling missing values, using loc and iloc, and computing groupby aggregations."
    },
    "runnableCode": {
      "code": "# Simulating core Pandas DataFrame mechanics in pure Python\nclass MiniDataFrame:\n    def __init__(self, data):\n        self.data = data\n        self.columns = list(data.keys())\n\n    def filter_by(self, column, threshold):\n        indices = [i for i, val in enumerate(self.data[column]) if val > threshold]\n        return {col: [self.data[col][i] for i in indices] for col in self.columns}\n\ndf = MiniDataFrame({\"name\": [\"Alice\", \"Bob\", \"Charlie\"], \"score\": [92, 78, 88]})\nfiltered = df.filter_by(\"score\", 80)\nprint(\"Students with score > 80:\", filtered[\"name\"])",
      "expectedOutput": "Students with score > 80: ['Alice', 'Charlie']"
    },
    "lineByLine": [
      {
        "line": 7,
        "lines": "7",
        "code": "        indices = [i for i, val in enumerate(self.data[column]) if val > threshold]",
        "codeSnippet": "        indices = [i for i, val in enumerate(self.data[column]) if val > threshold]",
        "explanation": "Vectorized boolean mask indexing simulation."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "        return {col: [self.data[col][i] for i in indices] ...}",
        "codeSnippet": "        return {col: [self.data[col][i] for i in indices] ...}",
        "explanation": "Filters all columns by matching row indices."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Iterating over DataFrame rows with a Python for loop: `for idx, row in df.iterrows():`.",
        "solution": "Use vectorized operations: `df[\"total\"] = df[\"price\"] * df[\"qty\"]` or `.apply()` as a last resort.",
        "whyWrong": "Extremely slow: destroys vectorization, creating a new Series object for every single row.",
        "howToFix": "Use vectorized operations: `df[\"total\"] = df[\"price\"] * df[\"qty\"]` or `.apply()` as a last resort."
      },
      {
        "mistake": "Triggering SettingWithCopyWarning by chaining brackets: `df[df[\"A\"] > 5][\"B\"] = 10`.",
        "solution": "Always use `.loc`: `df.loc[df[\"A\"] > 5, \"B\"] = 10`.",
        "whyWrong": "Unclear whether modifying a view or a copy; modification may silently fail to update original DataFrame.",
        "howToFix": "Always use `.loc`: `df.loc[df[\"A\"] > 5, \"B\"] = 10`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Financial Portfolio Analysis",
        "description": "Merging stock ticker pricing history with company fundamentals and calculating rolling returns."
      },
      {
        "title": "Customer Churn Modeling",
        "description": "Feature engineering aggregated transaction frequencies, recency, and monetary values."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-pandas-pq1",
        "question": "What is the primary difference between `df.loc` and `df.iloc`?",
        "hint": "Labels vs integer positions.",
        "answer": "`df.loc` selects rows and columns by index labels (names); `df.iloc` selects strictly by integer position (0, 1, 2...)."
      },
      {
        "id": "py-ds-pandas-pq2",
        "question": "Why should you avoid using `for row in df.iterrows():` for calculations?",
        "hint": "Vectorization vs iteration.",
        "answer": "Because row iteration converts each row into a Python Series object, running hundreds of times slower than vectorized column operations."
      },
      {
        "id": "py-ds-pandas-pq3",
        "question": "What method drops rows containing any missing (NaN) values in a DataFrame?",
        "hint": "Method name.",
        "answer": "`df.dropna()`."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-pandas-q1",
        "question": "Which method computes summary statistics (mean, std, min, max, quartiles) for all numeric columns in a DataFrame?",
        "options": [
          "df.summary()",
          "df.describe()",
          "df.stats()",
          "df.info()"
        ],
        "correctIndex": 1,
        "explanation": "`df.describe()` generates descriptive summary statistics for numeric columns."
      },
      {
        "id": "py-ds-pandas-q2",
        "question": "What is the recommended way to avoid SettingWithCopyWarning when updating a filtered subset?",
        "options": [
          "Use df.copy() only",
          "Use df.loc[condition, column] = value",
          "Disable warnings globally",
          "Use df.iloc"
        ],
        "correctIndex": 1,
        "explanation": "Using `df.loc[condition, column] = value` ensures direct assignment to the target memory."
      },
      {
        "id": "py-ds-pandas-q3",
        "question": "In `df.loc[\"a\":\"c\"]`, are the end boundary elements inclusive or exclusive?",
        "options": [
          "Exclusive (standard Python slicing)",
          "Inclusive of \"c\"",
          "It raises an error",
          "Random"
        ],
        "correctIndex": 1,
        "explanation": "Unlike standard Python integer slicing, `df.loc` label slicing is INCLUSIVE of the stop boundary."
      }
    ],
    "codingChallenge": {
      "title": "Calculate Column Mean with Fallback",
      "problem": "Write a function `clean_and_mean(records: list[dict], target_col: str, fill_value: float) -> float` that takes a list of row dictionaries (where `target_col` might be missing or `None`), replaces missing values with `fill_value`, and returns the average rounded to 2 decimal places. Return `0.0` if records is empty.",
      "hints": [
        "If not records: return 0.0.",
        "Extract values: val = r.get(target_col); if val is None: val = fill_value.",
        "Compute sum(vals) / len(vals) and round to 2."
      ],
      "starterCode": "def clean_and_mean(records: list[dict], target_col: str, fill_value: float) -> float:\n    # Write your solution here\n    pass",
      "solution": "def clean_and_mean(records: list[dict], target_col: str, fill_value: float) -> float:\n    if not records:\n        return 0.0\n    values = [float(r.get(target_col) if r.get(target_col) is not None else fill_value) for r in records]\n    return round(sum(values) / len(values), 2)",
      "testCases": [
        {
          "input": "[{\"val\": 10}, {\"val\": None}, {\"val\": 20}], \"val\", 0.0",
          "expectedOutput": "10.0"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 7,
        "lines": "7",
        "code": "        indices = [i for i, val in enumerate(self.data[column]) if val > threshold]",
        "codeSnippet": "        indices = [i for i, val in enumerate(self.data[column]) if val > threshold]",
        "explanation": "Vectorized boolean mask indexing simulation."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "        return {col: [self.data[col][i] for i in indices] ...}",
        "codeSnippet": "        return {col: [self.data[col][i] for i in indices] ...}",
        "explanation": "Filters all columns by matching row indices."
      }
    ],
    "applications": [
      {
        "industry": "Financial Portfolio Analysis",
        "application": "Merging stock ticker pricing history with company fundamentals and calculating rolling returns.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Financial Portfolio Analysis",
        "description": "Merging stock ticker pricing history with company fundamentals and calculating rolling returns."
      },
      {
        "industry": "Customer Churn Modeling",
        "application": "Feature engineering aggregated transaction frequencies, recency, and monetary values.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Customer Churn Modeling",
        "description": "Feature engineering aggregated transaction frequencies, recency, and monetary values."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Master core Pandas 2D tabular structures: Series (1D labelled) and DataFrame (2D labelled).",
        "Distinguish integer-position indexing (`iloc`) from label-based indexing (`loc`).",
        "Filter, slice, and query rows using boolean masks and `.query()`."
      ]
    }
  },
  "py-ds-matplotlib": {
    "id": "py-ds-matplotlib",
    "moduleId": "python-module-11",
    "title": "Data Visualization with Matplotlib",
    "subtitle": "Figure and Axes Object-Oriented API, Subplots, Styling, and Exporting",
    "order": 3,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master the Object-Oriented Matplotlib API (`fig, ax = plt.subplots()`).",
      "Understand the hierarchy: Figure -> Axes -> Axis -> Ticks, Spines, and Labels.",
      "Plot core visualization types: line plots, bar charts, scatter plots, and histograms.",
      "Customize titles, legends, grid lines, color palettes, and export high-DPI figures (`fig.savefig`)."
    ],
    "prerequisites": [
      "Python basics and NumPy arrays."
    ],
    "analogy": {
      "title": "The Artist's Canvas and Gallery Frames",
      "text": "A `Figure` is the physical blank wooden canvas frame hung on an art gallery wall. An `Axes` (with an \"e\", plural of axis) is an individual painting panel mounted onto that canvas. A single canvas can hold one large painting (`plt.subplots(1, 1)`), or a 2x2 collage of four separate paintings (`plt.subplots(2, 2)`). You paint data points onto the Axes panel, not onto the gallery floor.",
      "metaphor": "Figure is the window/page; Axes is the plotting area where data is drawn."
    },
    "problemSolved": {
      "title": "Communicating Data Insights Visually and Spotting Hidden Trends",
      "description": "Raw numbers in a table obscure trends, outliers, clusters, and distributions. Anscombe's Quartet proved that datasets with identical means and variances look completely different when plotted. Matplotlib turns data into visual graphics.",
      "keyPoints": [
        "Always prefer the Object-Oriented interface (`fig, ax = plt.subplots()`) over the stateful MATLAB-style `plt.plot()` interface.",
        "`ax.plot()` for continuous lines, `ax.scatter()` for point relationships, `ax.bar()` for categories, `ax.hist()` for distributions.",
        "`fig.tight_layout()` adjusts spacing to prevent labels from overlapping axes.",
        "`fig.savefig(\"chart.png\", dpi=300, bbox_inches=\"tight\")` exports crisp publication-ready images."
      ]
    },
    "intuition": {
      "overview": "Matplotlib builds a visual scene graph of Artists (lines, patches, text) attached to an Axes container, which is rendered by a raster (PNG) or vector (SVG/PDF) backend.",
      "steps": [
        {
          "step": 1,
          "title": "Create Canvas",
          "description": "fig, ax = plt.subplots() initializes figure and plotting axes."
        },
        {
          "step": 2,
          "title": "Draw Data",
          "description": "Calls ax.plot(x, y), ax.scatter(), or ax.hist() to add artist objects."
        },
        {
          "step": 3,
          "title": "Label & Save",
          "description": "Configures ax.set_title(), ax.set_xlabel(), and exports via fig.savefig()."
        }
      ]
    },
    "codeExample": {
      "title": "Clean Object-Oriented Multi-Panel Visualization",
      "code": "import matplotlib.pyplot as plt\nimport numpy as np\n\n# Generate sample synthetic data\nx = np.linspace(0, 10, 100)\ny1 = np.sin(x)\ny2 = np.cos(x)\n\n# Object-Oriented 1x2 Subplot Grid\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4), dpi=100)\n\n# Left Panel: Sine wave\nax1.plot(x, y1, color=\"#2563eb\", linewidth=2, label=\"sin(x)\")\nax1.set_title(\"Sine Wave Harmonic\")\nax1.set_xlabel(\"Time (radians)\")\nax1.set_ylabel(\"Amplitude\")\nax1.grid(True, linestyle=\"--\", alpha=0.6)\nax1.legend()\n\n# Right Panel: Cosine wave\nax2.plot(x, y2, color=\"#dc2626\", linewidth=2, linestyle=\"--\", label=\"cos(x)\")\nax2.set_title(\"Cosine Wave Phase\")\nax2.set_xlabel(\"Time (radians)\")\nax2.grid(True, linestyle=\"--\", alpha=0.6)\nax2.legend()\n\nfig.tight_layout()\n# fig.savefig(\"harmonics.png\", dpi=300, bbox_inches=\"tight\")\nprint(\"Figure rendered with 2 axes panels!\")",
      "explanation": "Demonstrates creating a 1x2 grid of subplots using the Object-Oriented API, styling lines, adding labels, and configuring grids."
    },
    "runnableCode": {
      "code": "# Inspecting Matplotlib components without GUI display\nclass MockAxes:\n    def __init__(self):\n        self.elements = []\n        self.labels = {}\n        \n    def plot(self, x, y, label=None):\n        self.elements.append({\"type\": \"line\", \"points\": len(x), \"label\": label})\n        \n    def set_title(self, title):\n        self.labels[\"title\"] = title\n\nax = MockAxes()\nax.plot([1, 2, 3], [10, 20, 30], label=\"growth\")\nax.set_title(\"Quarterly Growth\")\n\nprint(\"Plot elements:\", ax.elements)\nprint(\"Axes title:\", ax.labels[\"title\"])",
      "expectedOutput": "Plot elements: [{'type': 'line', 'points': 3, 'label': 'growth'}]\nAxes title: Quarterly Growth"
    },
    "lineByLine": [
      {
        "line": 7,
        "lines": "7",
        "code": "    def plot(self, x, y, label=None):",
        "codeSnippet": "    def plot(self, x, y, label=None):",
        "explanation": "Adds line artist to axes."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "ax.set_title(\"Quarterly Growth\")",
        "codeSnippet": "ax.set_title(\"Quarterly Growth\")",
        "explanation": "Sets title metadata on axes container."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Mixing the stateful `plt.plot()` syntax with the object-oriented `ax.plot()` syntax in the same script.",
        "solution": "Standardize on the OO interface: `fig, ax = plt.subplots(); ax.plot()`.",
        "whyWrong": "Leads to confusing bugs where settings are applied to the wrong active subplot.",
        "howToFix": "Standardize on the OO interface: `fig, ax = plt.subplots(); ax.plot()`."
      },
      {
        "mistake": "Forgetting `bbox_inches=\"tight\"` when calling `fig.savefig()`.",
        "solution": "Always include `fig.savefig(\"plot.png\", bbox_inches=\"tight\")`.",
        "whyWrong": "Axis tick labels and legends near image borders are often cropped off.",
        "howToFix": "Always include `fig.savefig(\"plot.png\", bbox_inches=\"tight\")`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Machine Learning Training Loss Curves",
        "description": "Plotting epoch-by-epoch training vs validation loss to diagnose overfitting."
      },
      {
        "title": "Scientific Publishing",
        "description": "Generating PDF and EPS vector figures for academic journals."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-matplotlib-pq1",
        "question": "What is the difference between a `Figure` and an `Axes` in Matplotlib?",
        "hint": "Canvas vs plot panel.",
        "answer": "`Figure` is the top-level window/canvas; `Axes` is the actual plotting area with axes, ticks, and data artists."
      },
      {
        "id": "py-ds-matplotlib-pq2",
        "question": "What standard method creates both a Figure and one or more Axes in a single call?",
        "hint": "Subplots function.",
        "answer": "`plt.subplots(nrows, ncols)`."
      },
      {
        "id": "py-ds-matplotlib-pq3",
        "question": "What parameter in `fig.savefig()` prevents axis labels from being clipped at the image edges?",
        "hint": "Bounding box setting.",
        "answer": "`bbox_inches=\"tight\"`."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-matplotlib-q1",
        "question": "Which method creates a scatter plot on an Axes object?",
        "options": [
          "ax.dots()",
          "ax.points()",
          "ax.scatter()",
          "ax.plot_scatter()"
        ],
        "correctIndex": 2,
        "explanation": "`ax.scatter(x, y)` draws scatter plot markers."
      },
      {
        "id": "py-ds-matplotlib-q2",
        "question": "How do you display a legend for labeled lines on an Axes?",
        "options": [
          "ax.show_legend()",
          "ax.legend()",
          "fig.legend_display()",
          "plt.enable_legend()"
        ],
        "correctIndex": 1,
        "explanation": "`ax.legend()` renders the legend using the `label` attributes of plotted artists."
      },
      {
        "id": "py-ds-matplotlib-q3",
        "question": "What is Anscombe's Quartet famous for demonstrating?",
        "options": [
          "How to sort arrays in O(N)",
          "Why data visualization is critical because datasets with identical summary statistics can look wildly different",
          "How to compute matrix inverses",
          "A musical algorithm"
        ],
        "correctIndex": 1,
        "explanation": "Anscombe's quartet comprises four datasets with identical statistical properties (mean, variance, correlation) that exhibit distinct shapes when plotted."
      }
    ],
    "codingChallenge": {
      "title": "Calculate Histogram Bins and Counts",
      "problem": "Write a function `compute_histogram_bins(values: list[float], num_bins: int) -> tuple[list[float], list[int]]` that calculates equal-width bin edges from min(values) to max(values), and counts how many values fall into each bin `[bin_left, bin_right)` (with the last bin inclusive of max). If values is empty, return `([], [])`.",
      "hints": [
        "If not values: return [], [].",
        "min_val = min(values); max_val = max(values); width = (max_val - min_val) / num_bins.",
        "Construct bin edges: [min_val + i * width for i in range(num_bins + 1)].",
        "Tally counts in each interval."
      ],
      "starterCode": "def compute_histogram_bins(values: list[float], num_bins: int) -> tuple[list[float], list[int]]:\n    # Write your solution here\n    pass",
      "solution": "def compute_histogram_bins(values: list[float], num_bins: int) -> tuple[list[float], list[int]]:\n    if not values or num_bins <= 0:\n        return [], []\n    min_v, max_v = float(min(values)), float(max(values))\n    if min_v == max_v:\n        return [min_v, max_v], [len(values)]\n    width = (max_v - min_v) / num_bins\n    edges = [round(min_v + i * width, 4) for i in range(num_bins + 1)]\n    counts = [0] * num_bins\n    for v in values:\n        idx = int((v - min_v) / width)\n        if idx >= num_bins:\n            idx = num_bins - 1\n        counts[idx] += 1\n    return edges, counts",
      "testCases": [
        {
          "input": "[1.0, 2.0, 3.0, 4.0], 2",
          "expectedOutput": "([1.0, 2.5, 4.0], [2, 2])"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 7,
        "lines": "7",
        "code": "    def plot(self, x, y, label=None):",
        "codeSnippet": "    def plot(self, x, y, label=None):",
        "explanation": "Adds line artist to axes."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "ax.set_title(\"Quarterly Growth\")",
        "codeSnippet": "ax.set_title(\"Quarterly Growth\")",
        "explanation": "Sets title metadata on axes container."
      }
    ],
    "applications": [
      {
        "industry": "Machine Learning Training Loss Curves",
        "application": "Plotting epoch-by-epoch training vs validation loss to diagnose overfitting.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Machine Learning Training Loss Curves",
        "description": "Plotting epoch-by-epoch training vs validation loss to diagnose overfitting."
      },
      {
        "industry": "Scientific Publishing",
        "application": "Generating PDF and EPS vector figures for academic journals.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Scientific Publishing",
        "description": "Generating PDF and EPS vector figures for academic journals."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Master the Object-Oriented Matplotlib API (`fig, ax = plt.subplots()`).",
        "Understand the hierarchy: Figure -> Axes -> Axis -> Ticks, Spines, and Labels.",
        "Plot core visualization types: line plots, bar charts, scatter plots, and histograms."
      ]
    }
  },
  "py-ds-data-cleaning": {
    "id": "py-ds-data-cleaning",
    "moduleId": "python-module-11",
    "title": "Data Cleaning and Exploratory Analysis",
    "subtitle": "Missing Data Imputation, IQR Outlier Detection, Feature Scaling, and Correlation",
    "order": 4,
    "readTimeMinutes": 30,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Execute systematic Exploratory Data Analysis (EDA): inspect shapes, dtypes, null distributions.",
      "Apply principled missing value imputation: mean, median, mode, or domain indicators.",
      "Detect and treat anomalies using the Interquartile Range (IQR) and Z-score methods.",
      "Compute correlation matrices (`df.corr()`) and identify multicollinearity."
    ],
    "prerequisites": [
      "Pandas, NumPy, and basic statistics."
    ],
    "analogy": {
      "title": "The Raw Ore Smelter and Refinement Refinery",
      "text": "Raw data extracted from databases is not shiny 24-karat gold; it is rocky ore loaded with dirt (missing values), sulfur contaminations (outlier glitches like negative ages), and uneven moisture content (different units and scales). Data cleaning is the smelting refinery: you blast away impurities and refine the metals so the downstream manufacturing line (Machine Learning models) doesn't jam and break.",
      "metaphor": "Garbage in, garbage out: clean data is the foundation of accurate models."
    },
    "problemSolved": {
      "title": "Preparing Real-World Messy Data for Machine Learning",
      "description": "Machine learning algorithms crash when given null values and produce distorted predictions when contaminated by extreme data-entry typos. Rigorous EDA and cleaning guarantees model validity.",
      "keyPoints": [
        "Median imputation is robust against outliers; mean imputation is sensitive to extreme values.",
        "IQR rule: outliers lie outside `[Q1 - 1.5 * IQR, Q3 + 1.5 * IQR]`.",
        "Pearson correlation measures linear relationships (-1.0 to +1.0).",
        "Never impute test set data using test set statistics (data leakage); fit on train, apply to test."
      ]
    },
    "intuition": {
      "overview": "Cleaning normalizes raw records into stationary, consistent distributions without leaking future information.",
      "steps": [
        {
          "step": 1,
          "title": "Audit Nulls",
          "description": "Quantify missingness percentage per column with df.isna().mean()."
        },
        {
          "step": 2,
          "title": "Outlier Truncation",
          "description": "Clamp or filter extreme values using IQR thresholds."
        },
        {
          "step": 3,
          "title": "Feature Scaling",
          "description": "Standardize features to zero mean and unit variance."
        }
      ]
    },
    "codeExample": {
      "title": "Systematic EDA and IQR Outlier Removal Pipeline",
      "code": "import numpy as np\n\ndef detect_outliers_iqr(data: list[float]) -> tuple[float, float, list[float]]:\n    \"\"\"Detect outliers using Interquartile Range (IQR) rule.\"\"\"\n    q25, q75 = np.percentile(data, [25, 75])\n    iqr = q75 - q25\n    lower_bound = q25 - (1.5 * iqr)\n    upper_bound = q75 + (1.5 * iqr)\n    \n    outliers = [x for x in data if x < lower_bound or x > upper_bound]\n    clean_data = [x for x in data if lower_bound <= x <= upper_bound]\n    return lower_bound, upper_bound, clean_data\n\n# Simulated dataset with extreme entry errors\nages = [22, 25, 29, 31, 35, 38, 42, 45, 180, -5] # 180 and -5 are outliers!\nlow, high, cleaned = detect_outliers_iqr(ages)\nprint(f\"Valid age range: [{low:.1f}, {high:.1f}]\")\nprint(f\"Cleaned count: {len(cleaned)} / {len(ages)}\")",
      "explanation": "Demonstrates computing percentiles, IQR, outlier thresholds, and filtering corrupted values."
    },
    "runnableCode": {
      "code": "import numpy as np\n\n# Z-score outlier detection: |z| > 3\nvals = [10, 11, 12, 10, 11, 100, 12, 11]\nmean = np.mean(vals)\nstd = np.std(vals)\nz_scores = [(x - mean) / std for x in vals]\n\noutliers = [vals[i] for i, z in enumerate(z_scores) if abs(z) > 2.0]\nprint(\"Detected outliers with |z| > 2:\", outliers)",
      "expectedOutput": "Detected outliers with |z| > 2: [100]"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "mean = np.mean(vals); std = np.std(vals)",
        "codeSnippet": "mean = np.mean(vals); std = np.std(vals)",
        "explanation": "Calculates mean and standard deviation."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "z_scores = [(x - mean) / std for x in vals]",
        "codeSnippet": "z_scores = [(x - mean) / std for x in vals]",
        "explanation": "Computes standard score (number of std devs from mean)."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "outliers = [vals[i] for i, z in enumerate(z_scores) ...]",
        "codeSnippet": "outliers = [vals[i] for i, z in enumerate(z_scores) ...]",
        "explanation": "Identifies values exceeding 2 standard deviations."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Imputing missing values using the mean of columns with heavy skew or extreme outliers.",
        "solution": "Use the median, which is resistant to extreme outliers.",
        "whyWrong": "A single billionaire in an income dataset shifts the mean by millions, imputing unrealistic values for missing citizens.",
        "howToFix": "Use the median, which is resistant to extreme outliers."
      },
      {
        "mistake": "Calculating imputation statistics on the entire dataset BEFORE train/test split.",
        "solution": "Always split into train and test sets FIRST, compute statistics on train only, and apply to both.",
        "whyWrong": "Data Leakage: test set information leaks into training data, producing overly optimistic validation scores.",
        "howToFix": "Always split into train and test sets FIRST, compute statistics on train only, and apply to both."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Credit Risk Scoring",
        "description": "Cleaning credit bureau histories, imputing missing employment durations, and capping debt-to-income outliers."
      },
      {
        "title": "IoT Sensor Streams",
        "description": "Filtering sensor dropouts (zeros or nulls) from factory temperature sensors."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-data-cleaning-pq1",
        "question": "What is the formula for the Interquartile Range (IQR)?",
        "hint": "Third and first quartiles.",
        "answer": "`IQR = Q3 - Q1` (the 75th percentile minus the 25th percentile)."
      },
      {
        "id": "py-ds-data-cleaning-pq2",
        "question": "Why is the median preferred over the mean for imputing skewed distributions?",
        "hint": "Robustness.",
        "answer": "The median is a robust statistic resistant to extreme outliers, whereas the mean is easily distorted by a single extreme value."
      },
      {
        "id": "py-ds-data-cleaning-pq3",
        "question": "What is \"data leakage\" in the context of preprocessing and normalization?",
        "hint": "Train vs test boundary.",
        "answer": "When information from the test or validation set is inadvertently used to train or normalize the model (e.g. scaling using whole-dataset statistics)."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-data-cleaning-q1",
        "question": "Under the standard Tukey IQR rule, what threshold defines an upper outlier?",
        "options": [
          "Q3 + 1.0 * IQR",
          "Q3 + 1.5 * IQR",
          "Mean + 2 * std",
          "Median + IQR"
        ],
        "correctIndex": 1,
        "explanation": "Values above `Q3 + 1.5 * IQR` are classified as outliers."
      },
      {
        "id": "py-ds-data-cleaning-q2",
        "question": "What does a Pearson correlation coefficient of -0.92 indicate?",
        "options": [
          "No relationship",
          "Strong negative linear relationship",
          "Weak positive relationship",
          "Zero variance"
        ],
        "correctIndex": 1,
        "explanation": "Values close to -1.0 indicate a strong negative linear correlation."
      },
      {
        "id": "py-ds-data-cleaning-q3",
        "question": "Which Pandas method identifies the count of null values per column in a DataFrame?",
        "options": [
          "df.isnull().sum()",
          "df.count_nulls()",
          "df.empty_cells()",
          "df.check_na()"
        ],
        "correctIndex": 0,
        "explanation": "`df.isnull().sum()` (or `df.isna().sum()`) tallies missing values per column."
      }
    ],
    "codingChallenge": {
      "title": "Standardize Features to Z-Score",
      "problem": "Write a function `standardize(features: list[float]) -> list[float]` that standardizes a list of floats to zero mean and unit variance: `(x - mean) / std`. If std is 0 (all values identical) or list has < 2 items, return a list of `0.0` with the same length. Round results to 4 decimal places.",
      "hints": [
        "mean = sum(features) / len(features).",
        "variance = sum((x - mean)**2 for x in features) / len(features).",
        "std = variance ** 0.5.",
        "If std == 0: return [0.0] * len(features)."
      ],
      "starterCode": "def standardize(features: list[float]) -> list[float]:\n    # Write your solution here\n    pass",
      "solution": "def standardize(features: list[float]) -> list[float]:\n    if len(features) < 2:\n        return [0.0] * len(features)\n    mean = sum(features) / len(features)\n    var = sum((x - mean) ** 2 for x in features) / len(features)\n    std = var ** 0.5\n    if std == 0:\n        return [0.0] * len(features)\n    return [round((x - mean) / std, 4) for x in features]",
      "testCases": [
        {
          "input": "[10.0, 20.0, 30.0]",
          "expectedOutput": "[-1.2247, 0.0, 1.2247]"
        },
        {
          "input": "[5.0, 5.0]",
          "expectedOutput": "[0.0, 0.0]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "mean = np.mean(vals); std = np.std(vals)",
        "codeSnippet": "mean = np.mean(vals); std = np.std(vals)",
        "explanation": "Calculates mean and standard deviation."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "z_scores = [(x - mean) / std for x in vals]",
        "codeSnippet": "z_scores = [(x - mean) / std for x in vals]",
        "explanation": "Computes standard score (number of std devs from mean)."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "outliers = [vals[i] for i, z in enumerate(z_scores) ...]",
        "codeSnippet": "outliers = [vals[i] for i, z in enumerate(z_scores) ...]",
        "explanation": "Identifies values exceeding 2 standard deviations."
      }
    ],
    "applications": [
      {
        "industry": "Credit Risk Scoring",
        "application": "Cleaning credit bureau histories, imputing missing employment durations, and capping debt-to-income outliers.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Credit Risk Scoring",
        "description": "Cleaning credit bureau histories, imputing missing employment durations, and capping debt-to-income outliers."
      },
      {
        "industry": "IoT Sensor Streams",
        "application": "Filtering sensor dropouts (zeros or nulls) from factory temperature sensors.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "IoT Sensor Streams",
        "description": "Filtering sensor dropouts (zeros or nulls) from factory temperature sensors."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Execute systematic Exploratory Data Analysis (EDA): inspect shapes, dtypes, null distributions.",
        "Apply principled missing value imputation: mean, median, mode, or domain indicators.",
        "Detect and treat anomalies using the Interquartile Range (IQR) and Z-score methods."
      ]
    }
  },
  "py-ds-sklearn": {
    "id": "py-ds-sklearn",
    "moduleId": "python-module-11",
    "title": "Scikit-learn Integration",
    "subtitle": "The Unified Estimator API: fit, transform, predict, train_test_split, and Metrics",
    "order": 5,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master the unified Scikit-learn Estimator API: `fit()`, `transform()`, and `predict()`.",
      "Split datasets into training and evaluation sets using `train_test_split()` with stratification.",
      "Train regression and classification estimators (LinearRegression, DecisionTreeClassifier).",
      "Evaluate models using appropriate metrics: Accuracy, Precision, Recall, F1-Score, and Mean Squared Error."
    ],
    "prerequisites": [
      "Python OOP, NumPy vectorization, and data cleaning."
    ],
    "analogy": {
      "title": "The Standardized Universal Diagnostic Tool",
      "text": "Before Scikit-learn, every machine learning algorithm had a completely different API: one library used `.train_model()`, another used `.learn()`, a third used `.run()`. Scikit-learn is the standard power outlet of data science: whether you plug in a Linear Regression toaster, a Random Forest vacuum cleaner, or a Support Vector Machine television, every single device has the exact same three-prong plug (`.fit()`, `.predict()`).",
      "metaphor": "The unified Estimator API makes all machine learning algorithms interchangeable."
    },
    "problemSolved": {
      "title": "Interchangeable Machine Learning Workflows Without Rewriting Code",
      "description": "Swapping a linear model for an advanced gradient-boosted tree in Scikit-learn requires changing a single import line. The Estimator contract guarantees consistent training, prediction, and evaluation workflows.",
      "keyPoints": [
        "Estimators implement `fit(X, y)` to learn parameters from training data.",
        "Transformers implement `transform(X)` (and `fit_transform(X)`) to preprocess feature matrices.",
        "Predictors implement `predict(X)` to generate predictions on unseen data.",
        "Features `X` must be a 2D array-like `(n_samples, n_features)`; targets `y` are typically a 1D array `(n_samples,)`."
      ]
    },
    "intuition": {
      "overview": "Scikit-learn stores learned model parameters with a trailing underscore (e.g. `model.coef_`, `model.intercept_`) to distinguish them from hyperparameters passed to `__init__`.",
      "steps": [
        {
          "step": 1,
          "title": "Instantiate",
          "description": "Model is configured with hyperparameters: model = LogisticRegression(C=1.0)."
        },
        {
          "step": 2,
          "title": "Fit",
          "description": "model.fit(X_train, y_train) optimizes internal weights on training data."
        },
        {
          "step": 3,
          "title": "Predict & Evaluate",
          "description": "predictions = model.predict(X_test); evaluate with accuracy_score(y_test, predictions)."
        }
      ]
    },
    "codeExample": {
      "title": "Complete Train-Test-Predict Workflow with Scikit-learn",
      "code": "from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, classification_report\nimport numpy as np\n\n# Synthetic classification dataset (100 samples, 2 features)\nnp.random.seed(42)\nX = np.random.randn(100, 2)\n# Class 1 if sum > 0 else 0\ny = (X[:, 0] + X[:, 1] > 0).astype(int)\n\n# 1. Stratified train-test split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, random_state=42, stratify=y\n)\n\n# 2. Instantiate and fit estimator\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\n\n# 3. Predict on unseen test data\ny_pred = model.predict(X_test)\nacc = accuracy_score(y_test, y_pred)\nprint(f\"Test Accuracy: {acc * 100:.1f}%\")\nprint(\"Learned coefficients (coef_):\", model.coef_)",
      "explanation": "Demonstrates a complete Scikit-learn workflow from train_test_split to model.fit, model.predict, and evaluation metrics."
    },
    "runnableCode": {
      "code": "# Simulating Scikit-learn Estimator API contract in pure Python\nclass SimpleLinearRegressor:\n    def __init__(self):\n        self.slope_ = None\n        self.intercept_ = None\n\n    def fit(self, X, y):\n        # Closed form 1D linear regression\n        x_vals = [row[0] for row in X]\n        x_mean = sum(x_vals) / len(x_vals)\n        y_mean = sum(y) / len(y)\n        self.slope_ = sum((x - x_mean) * (y[i] - y_mean) for i, x in enumerate(x_vals)) / sum((x - x_mean)**2 for x in x_vals)\n        self.intercept_ = y_mean - (self.slope_ * x_mean)\n        return self\n\n    def predict(self, X):\n        return [round(self.slope_ * row[0] + self.intercept_, 2) for row in X]\n\nreg = SimpleLinearRegressor()\nreg.fit([[1], [2], [3]], [2, 4, 6])\nprint(\"Predicted values for [[4], [5]]:\", reg.predict([[4], [5]]))",
      "expectedOutput": "Predicted values for [[4], [5]]: [8.0, 10.0]"
    },
    "lineByLine": [
      {
        "line": 7,
        "lines": "7",
        "code": "    def fit(self, X, y):",
        "codeSnippet": "    def fit(self, X, y):",
        "explanation": "Learns parameters, storing in trailing underscore attributes slope_ and intercept_."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "    def predict(self, X):",
        "codeSnippet": "    def predict(self, X):",
        "explanation": "Generates predictions on new feature samples."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Calling `.fit_transform()` on the test dataset: `X_test_scaled = scaler.fit_transform(X_test)`.",
        "solution": "Call `scaler.fit_transform(X_train)` on train data, but ONLY `scaler.transform(X_test)` on test data.",
        "whyWrong": "Data Leakage: fits scaler parameters to the test distribution instead of applying the learned training distribution.",
        "howToFix": "Call `scaler.fit_transform(X_train)` on train data, but ONLY `scaler.transform(X_test)` on test data."
      },
      {
        "mistake": "Passing a 1D array to an estimator expecting a 2D feature matrix: `model.fit([1, 2, 3], y)`.",
        "solution": "Reshape into 2D: `X.reshape(-1, 1)`.",
        "whyWrong": "Raises `ValueError: Expected 2D array, got 1D array instead`.",
        "howToFix": "Reshape into 2D: `X.reshape(-1, 1)`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Credit Card Fraud Classification",
        "description": "Training Random Forest and XGBoost classifiers to flag anomalous transactions."
      },
      {
        "title": "Customer Lifetime Value Regression",
        "description": "Predicting future customer spend based on engagement metrics."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-sklearn-pq1",
        "question": "What naming convention distinguishes learned parameters from user hyperparameters in Scikit-learn?",
        "hint": "Underscore placement.",
        "answer": "Learned parameters end with a trailing underscore (e.g. `model.coef_`, `model.intercept_`)."
      },
      {
        "id": "py-ds-sklearn-pq2",
        "question": "What is the difference between `transform()` and `fit_transform()`?",
        "hint": "Learning vs applying.",
        "answer": "`fit_transform()` learns parameters and transforms data in one pass (used on training data); `transform()` applies previously learned parameters without retraining (used on test data)."
      },
      {
        "id": "py-ds-sklearn-pq3",
        "question": "What does the `stratify=y` parameter do in `train_test_split`?",
        "hint": "Class balance.",
        "answer": "It ensures that the proportion of target classes in the train and test sets is identical to the original dataset."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-sklearn-q1",
        "question": "Which method is used to train an estimator on feature matrix X and labels y?",
        "options": [
          "estimator.train(X, y)",
          "estimator.fit(X, y)",
          "estimator.learn(X, y)",
          "estimator.execute(X, y)"
        ],
        "correctIndex": 1,
        "explanation": "All Scikit-learn estimators implement `fit(X, y)` to train."
      },
      {
        "id": "py-ds-sklearn-q2",
        "question": "Why should you NOT call `fit` or `fit_transform` on your test set?",
        "options": [
          "It runs out of memory",
          "It causes data leakage by allowing test set distributions to influence model parameters",
          "The test set must be immutable",
          "It raises a SyntaxError"
        ],
        "correctIndex": 1,
        "explanation": "Fitting on the test set leaks evaluation distribution into preprocessing, invalidating test results."
      },
      {
        "id": "py-ds-sklearn-q3",
        "question": "What shape must feature matrix X have when passed to Scikit-learn estimators?",
        "options": [
          "1D array of shape (n_samples,)",
          "2D array of shape (n_samples, n_features)",
          "3D tensor",
          "Scalar"
        ],
        "correctIndex": 1,
        "explanation": "Scikit-learn expects feature matrices to be 2D arrays: `(n_samples, n_features)`."
      }
    ],
    "codingChallenge": {
      "title": "Compute Binary Classification Metrics",
      "problem": "Write a function `evaluate_binary_model(y_true: list[int], y_pred: list[int]) -> dict[str, float]` that calculates and returns `{\"accuracy\": acc, \"precision\": prec, \"recall\": rec}` rounded to 4 decimal places. If denominator for precision or recall is 0, set that metric to 0.0.",
      "hints": [
        "Count TP (y_true=1 and y_pred=1), FP (y_true=0 and y_pred=1), FN (y_true=1 and y_pred=0).",
        "Accuracy = (correct) / len(y_true).",
        "Precision = TP / (TP + FP) if (TP + FP) > 0 else 0.0.",
        "Recall = TP / (TP + FN) if (TP + FN) > 0 else 0.0."
      ],
      "starterCode": "def evaluate_binary_model(y_true: list[int], y_pred: list[int]) -> dict[str, float]:\n    # Write your solution here\n    pass",
      "solution": "def evaluate_binary_model(y_true: list[int], y_pred: list[int]) -> dict[str, float]:\n    if not y_true:\n        return {\"accuracy\": 0.0, \"precision\": 0.0, \"recall\": 0.0}\n    tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 1)\n    fp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 1)\n    fn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 0)\n    correct = sum(1 for yt, yp in zip(y_true, y_pred) if yt == yp)\n    \n    acc = round(correct / len(y_true), 4)\n    prec = round(tp / (tp + fp), 4) if (tp + fp) > 0 else 0.0\n    rec = round(tp / (tp + fn), 4) if (tp + fn) > 0 else 0.0\n    return {\"accuracy\": acc, \"precision\": prec, \"recall\": rec}",
      "testCases": [
        {
          "input": "[1, 1, 0, 0], [1, 0, 0, 1]",
          "expectedOutput": "{\"accuracy\": 0.5, \"precision\": 0.5, \"recall\": 0.5}"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 7,
        "lines": "7",
        "code": "    def fit(self, X, y):",
        "codeSnippet": "    def fit(self, X, y):",
        "explanation": "Learns parameters, storing in trailing underscore attributes slope_ and intercept_."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "    def predict(self, X):",
        "codeSnippet": "    def predict(self, X):",
        "explanation": "Generates predictions on new feature samples."
      }
    ],
    "applications": [
      {
        "industry": "Credit Card Fraud Classification",
        "application": "Training Random Forest and XGBoost classifiers to flag anomalous transactions.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Credit Card Fraud Classification",
        "description": "Training Random Forest and XGBoost classifiers to flag anomalous transactions."
      },
      {
        "industry": "Customer Lifetime Value Regression",
        "application": "Predicting future customer spend based on engagement metrics.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Customer Lifetime Value Regression",
        "description": "Predicting future customer spend based on engagement metrics."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Master the unified Scikit-learn Estimator API: `fit()`, `transform()`, and `predict()`.",
        "Split datasets into training and evaluation sets using `train_test_split()` with stratification.",
        "Train regression and classification estimators (LinearRegression, DecisionTreeClassifier)."
      ]
    }
  },
  "py-ds-pipelines": {
    "id": "py-ds-pipelines",
    "moduleId": "python-module-11",
    "title": "Reusable Data-Processing Pipelines",
    "subtitle": "sklearn.pipeline.Pipeline, ColumnTransformer, and Custom Transformers",
    "order": 6,
    "readTimeMinutes": 28,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Chain preprocessing and modeling into a single reproducible atomic estimator using `sklearn.pipeline.Pipeline`.",
      "Apply different transformations to different columns using `ColumnTransformer` (e.g. OneHotEncoder on categoricals, StandardScaler on numerics).",
      "Build custom transformers by subclassing `BaseEstimator` and `TransformerMixin`.",
      "Eliminate data leakage permanently in cross-validation and production inference."
    ],
    "prerequisites": [
      "Scikit-learn estimator API, preprocessing, and OOP."
    ],
    "analogy": {
      "title": "The Automated Industrial Car Wash Tunnel",
      "text": "Manual preprocessing is washing a car by hand: you manually soap the wheels, spray the hood, and polish the glass. If you forget step 3 or use dirty soapy water on the clean test car (data leakage), the finish is ruined. A `Pipeline` is an automated car wash tunnel: you drive the raw car in one end, the conveyor belt pulls it through soaping, washing, drying, and waxing in locked lockstep, and a pristine showroom vehicle rolls out the other end.",
      "metaphor": "Pipelines bundle data transformation steps and final estimators into a single deployable object."
    },
    "problemSolved": {
      "title": "Eliminating Data Leakage and Deployment Discrepancies",
      "description": "When preprocessing steps are written as loose scripts, deploying to production requires duplicating all imputation, encoding, and scaling logic. A Pipeline bundles all transformations with the model into a single serialized file.",
      "keyPoints": [
        "A `Pipeline` consists of a list of `(name, transformer)` tuples ending in a final estimator.",
        "Calling `pipeline.fit(X_train, y_train)` fits all transformers and the final model sequentially.",
        "Calling `pipeline.predict(X_test)` automatically routes raw test features through all learned transformers before predicting.",
        "`ColumnTransformer` allows applying specific transformers to selected column subsets."
      ]
    },
    "intuition": {
      "overview": "The Pipeline coordinates the flow of data: the output of step N is passed as the input `X` to step N+1.",
      "steps": [
        {
          "step": 1,
          "title": "Assemble",
          "description": "Pipeline([(\"scaler\", StandardScaler()), (\"clf\", LogisticRegression())])."
        },
        {
          "step": 2,
          "title": "Fit Pipeline",
          "description": "Transformers call fit_transform(); final estimator calls fit()."
        },
        {
          "step": 3,
          "title": "Inference",
          "description": "Raw incoming data is transformed through the fitted pipeline and predicted in one line."
        }
      ]
    },
    "codeExample": {
      "title": "End-to-End Pipeline with ColumnTransformer and Custom Transformer",
      "code": "from sklearn.base import BaseEstimator, TransformerMixin\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.linear_model import LogisticRegression\nimport pandas as pd\n\n# Custom transformer: log transform selected numeric features\nclass LogTransformer(BaseEstimator, TransformerMixin):\n    def fit(self, X, y=None):\n        return self  # No parameters to learn\n\n    def transform(self, X):\n        import numpy as np\n        return np.log1p(np.maximum(0, X))\n\n# ColumnTransformer routing numeric vs categorical columns\npreprocessor = ColumnTransformer(\n    transformers=[\n        (\"num\", StandardScaler(), [\"age\", \"fare\"]),\n        (\"cat\", OneHotEncoder(handle_unknown=\"ignore\"), [\"embarked\"])\n    ]\n)\n\n# Atomic End-to-End Pipeline\nfull_pipeline = Pipeline(steps=[\n    (\"preprocessor\", preprocessor),\n    (\"classifier\", LogisticRegression())\n])\n\nprint(\"Pipeline configured with steps:\", [step[0] for step in full_pipeline.steps])",
      "explanation": "Demonstrates implementing a custom transformer with BaseEstimator and TransformerMixin, ColumnTransformer, and a complete Pipeline."
    },
    "runnableCode": {
      "code": "# Simulating Pipeline execution contract in pure Python\nclass MiniPipeline:\n    def __init__(self, steps):\n        self.steps = steps\n\n    def fit_transform(self, data):\n        current = data\n        for name, transformer in self.steps:\n            current = transformer.fit_transform(current)\n        return current\n\nclass AddOffset:\n    def __init__(self, offset): self.offset = offset\n    def fit_transform(self, data): return [x + self.offset for x in data]\n\nclass MultiplyScale:\n    def __init__(self, scale): self.scale = scale\n    def fit_transform(self, data): return [x * self.scale for x in data]\n\npipe = MiniPipeline([(\"offset\", AddOffset(10)), (\"scale\", MultiplyScale(2))])\nresult = pipe.fit_transform([1, 2, 3])\nprint(\"Transformed data (x+10)*2:\", result)",
      "expectedOutput": "Transformed data (x+10)*2: [22, 24, 26]"
    },
    "lineByLine": [
      {
        "line": 7,
        "lines": "7",
        "code": "        for name, transformer in self.steps:",
        "codeSnippet": "        for name, transformer in self.steps:",
        "explanation": "Sequentially feeds output of previous step to next transformer."
      },
      {
        "line": 20,
        "lines": "20",
        "code": "result = pipe.fit_transform([1, 2, 3])",
        "codeSnippet": "result = pipe.fit_transform([1, 2, 3])",
        "explanation": "Evaluates pipeline sequentially."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Putting an estimator in the middle of a `Pipeline`.",
        "solution": "Ensure all intermediate steps implement `transform()`.",
        "whyWrong": "All intermediate steps in a Pipeline must be Transformers implementing `fit` and `transform`. Only the final step can be a pure estimator.",
        "howToFix": "Ensure all intermediate steps implement `transform()`."
      },
      {
        "mistake": "Performing cross-validation on pre-scaled data rather than passing the Pipeline into `cross_val_score()`.",
        "solution": "Pass the entire `Pipeline` object into `cross_val_score(pipeline, X, y)`.",
        "whyWrong": "Leaks validation fold data into scaling parameters on every fold.",
        "howToFix": "Pass the entire `Pipeline` object into `cross_val_score(pipeline, X, y)`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Model Deployment (Joblib / BentoML)",
        "description": "Serializing a single `pipeline.joblib` file that handles raw JSON payloads directly in production."
      },
      {
        "title": "Kaggle Competition Pipelines",
        "description": "Ensuring zero data leakage across 5-fold cross-validation."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-pipelines-pq1",
        "question": "What two methods must a custom Scikit-learn transformer implement?",
        "hint": "Transformer contract.",
        "answer": "`fit(X, y=None)` and `transform(X)`."
      },
      {
        "id": "py-ds-pipelines-pq2",
        "question": "What is the purpose of `ColumnTransformer` in Scikit-learn?",
        "hint": "Heterogeneous columns.",
        "answer": "It applies different preprocessing transformers to specific subsets of columns (e.g. scaling numeric columns while one-hot encoding categorical columns)."
      },
      {
        "id": "py-ds-pipelines-pq3",
        "question": "Why does passing a `Pipeline` to `cross_val_score()` prevent data leakage?",
        "hint": "Per-fold fitting.",
        "answer": "Because the pipeline refits all preprocessing steps on each training fold independently, without seeing the validation fold."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-pipelines-q1",
        "question": "Which mixin in `sklearn.base` provides the `fit_transform()` method automatically when you implement `fit()` and `transform()`?",
        "options": [
          "ClassifierMixin",
          "TransformerMixin",
          "RegressorMixin",
          "PipelineMixin"
        ],
        "correctIndex": 1,
        "explanation": "`TransformerMixin` provides `fit_transform()` by calling `fit()` followed by `transform()`."
      },
      {
        "id": "py-ds-pipelines-q2",
        "question": "What requirement must all intermediate steps (except the last) in a `Pipeline` satisfy?",
        "options": [
          "They must be classifiers",
          "They must be transformers implementing both fit and transform",
          "They must be neural networks",
          "They must be written in C"
        ],
        "correctIndex": 1,
        "explanation": "Every intermediate step in a Pipeline must implement both `fit` and `transform`."
      },
      {
        "id": "py-ds-pipelines-q3",
        "question": "How do you serialize an entire Scikit-learn Pipeline to disk for production deployment?",
        "options": [
          "json.dump(pipeline)",
          "joblib.dump(pipeline, \"model.joblib\")",
          "pickle.json()",
          "sql.save(pipeline)"
        ],
        "correctIndex": 1,
        "explanation": "`joblib.dump(pipeline, \"model.joblib\")` is the standard tool for serializing Scikit-learn pipelines with NumPy arrays."
      }
    ],
    "codingChallenge": {
      "title": "Custom Feature Binarizer Transformer",
      "problem": "Write a class `ThresholdBinarizer` that implements the Scikit-learn transformer protocol: `fit(self, X, y=None)` (returns `self`) and `transform(self, X: list[list[float]]) -> list[list[int]]` which converts each number to `1` if `>= threshold`, else `0`. Accepts `threshold: float = 0.0` in `__init__`.",
      "hints": [
        "In __init__: self.threshold = float(threshold).",
        "In fit(self, X, y=None): return self.",
        "In transform(self, X): return [[1 if val >= self.threshold else 0 for val in row] for row in X]."
      ],
      "starterCode": "class ThresholdBinarizer:\n    # Write your solution here\n    pass",
      "solution": "class ThresholdBinarizer:\n    def __init__(self, threshold: float = 0.0):\n        self.threshold = float(threshold)\n        \n    def fit(self, X, y=None):\n        return self\n        \n    def transform(self, X: list[list[float]]) -> list[list[int]]:\n        return [[1 if val >= self.threshold else 0 for val in row] for row in X]\n        \n    def fit_transform(self, X, y=None):\n        return self.fit(X, y).transform(X)",
      "testCases": [
        {
          "input": "t = ThresholdBinarizer(5.0); t.fit_transform([[2.0, 5.0], [8.0, 1.0]])",
          "expectedOutput": "[[0, 1], [1, 0]]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 7,
        "lines": "7",
        "code": "        for name, transformer in self.steps:",
        "codeSnippet": "        for name, transformer in self.steps:",
        "explanation": "Sequentially feeds output of previous step to next transformer."
      },
      {
        "line": 20,
        "lines": "20",
        "code": "result = pipe.fit_transform([1, 2, 3])",
        "codeSnippet": "result = pipe.fit_transform([1, 2, 3])",
        "explanation": "Evaluates pipeline sequentially."
      }
    ],
    "applications": [
      {
        "industry": "Model Deployment (Joblib / BentoML)",
        "application": "Serializing a single `pipeline.joblib` file that handles raw JSON payloads directly in production.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Model Deployment (Joblib / BentoML)",
        "description": "Serializing a single `pipeline.joblib` file that handles raw JSON payloads directly in production."
      },
      {
        "industry": "Kaggle Competition Pipelines",
        "application": "Ensuring zero data leakage across 5-fold cross-validation.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Kaggle Competition Pipelines",
        "description": "Ensuring zero data leakage across 5-fold cross-validation."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Chain preprocessing and modeling into a single reproducible atomic estimator using `sklearn.pipeline.Pipeline`.",
        "Apply different transformations to different columns using `ColumnTransformer` (e.g. OneHotEncoder on categoricals, StandardScaler on numerics).",
        "Build custom transformers by subclassing `BaseEstimator` and `TransformerMixin`."
      ]
    }
  }
};
