import os
import sys
import json
import subprocess
from numpy_helpers import create_lesson, write_module_ts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "numpy")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ==============================================================================
# MODULE 3: Array Operations and Broadcasting (13 Lessons)
# ==============================================================================
m3_raw = [
    (
        "numpy-m3-l1", "numpy-module-3", "Arithmetic Operations on Arrays",
        "Applying +, -, *, /, **, //, and % directly across arrays at hardware speeds",
        1, 12, "Beginner",
        "An Assembly Line with Parallel Workers",
        "Imagine 1,000 workers on an assembly line. When a batch of 1,000 car parts arrives, all 1,000 workers install a bolt at the exact same instant. In NumPy, array arithmetic executes in parallel across all elements simultaneously rather than one by one.",
        "Arithmetic operations apply element-by-element across arrays without explicit loops.",
        "Slow Python Loops for Basic Arithmetic",
        "Looping through large numbers with for i in range(len(a)): c.append(a[i] + b[i]) in pure Python wastes CPU cycles on pointer chasing. NumPy runs vector arithmetic in compiled C.",
        "import numpy as np\na = np.array([10, 20, 30, 40])\nb = np.array([2, 4, 5, 8])\nprint('Addition (a + b):', a + b)\nprint('Subtraction (a - b):', a - b)\nprint('Multiplication (a * b):', a * b)\nprint('Division (a / b):', a / b)\nprint('Exponentiation (a ** 2):', a ** 2)",
        "Adjusting Employee Salaries", "Applying a 10% raise across all employee salary records: salaries * 1.10.",
        "What happens when you multiply two NumPy arrays with a * b?", "It performs element-wise multiplication (Hadamard product), NOT matrix multiplication.",
        "Given quantities [5, 10, 2] and unit prices [20, 15, 50], calculate total line item costs.",
        "import numpy as np\nq = np.array([5, 10, 2])\np = np.array([20, 15, 50])\nprint('Total costs:', q * p)"
    ),
    (
        "numpy-m3-l2", "numpy-module-3", "Element-Wise Calculations Across Arrays",
        "Mathematical operations computed independently for every corresponding pair of elements",
        2, 12, "Beginner",
        "Calculating Shopping Bill Totals for Multiple Customers",
        "When 100 customers bring their shopping carts to the checkout registers, each register calculates (price * quantity) for that cart independently. Element-wise calculations operate on paired positions across matching arrays.",
        "Element-wise operations pair index i of array A with index i of array B.",
        "Aligning Paired Measurements",
        "In physics and data science, you frequently calculate differences or ratios between baseline and test measurements. Element-wise operations calculate paired metrics instantly.",
        "import numpy as np\nactual = np.array([100, 150, 200])\npredicted = np.array([90, 160, 195])\nerrors = actual - predicted\nsquared_errors = errors ** 2\nprint('Errors:', errors)\nprint('Squared errors:', squared_errors)\nprint('Mean squared error:', np.mean(squared_errors))",
        "Calculating Machine Learning Prediction Residuals", "Subtracting model predictions from actual values to compute residuals.",
        "Must two arrays have the exact same shape for element-wise operations?", "They must either have the exact same shape or compatible dimensions that satisfy NumPy broadcasting rules.",
        "Compute percentage difference between today's prices [105, 95] and yesterday's [100, 100].",
        "import numpy as np\ntoday = np.array([105, 95])\nyesterday = np.array([100, 100])\npct = ((today - yesterday) / yesterday) * 100\nprint('Percentage change:', pct)"
    ),
    (
        "numpy-m3-l3", "numpy-module-3", "Comparison Operators (>, <, ==, !=, >=, <=)",
        "Generating boolean masks through element-wise relational comparisons",
        3, 12, "Beginner",
        "Grading an Entire Class with a Passing Rubric",
        "A teacher has a stack of 100 exam papers. Instead of reading each score slowly, a scanner marks every paper with score >= 50 as 'Pass' (True) and below 50 as 'Fail' (False). In NumPy, comparison operators return an array of booleans.",
        "Comparison operators return boolean arrays indicating condition satisfaction per element.",
        "Generating Conditional Flags Without Looping",
        "Conditional queries in databases require selecting rows matching criteria. NumPy comparisons produce boolean masks that can filter data or count matches vectorially.",
        "import numpy as np\nspeeds = np.array([55, 72, 60, 85, 45, 90])\nspeed_limit = 65\nspeeding_mask = speeds > speed_limit\nprint('Speeds:', speeds)\nprint('Speeding mask (> 65):', speeding_mask)\nprint('Total speeders:', np.sum(speeding_mask))",
        "Detecting Speed Limit Violations", "Identifying traffic sensor vehicles exceeding 65 mph.",
        "What data type is produced by comparing a NumPy array with a scalar (e.g. arr > 10)?", "It returns an array of boolean values (dtype=bool).",
        "Create an array of test scores [45, 80, 95, 60] and check which scores are at least 70.",
        "import numpy as np\nscores = np.array([45, 80, 95, 60])\nprint(scores >= 70)"
    ),
    (
        "numpy-m3-l4", "numpy-module-3", "Logical Operations (logical_and, logical_or, logical_not)",
        "Combining multi-criteria conditions using bitwise operators (&, |, ~) and logical ufuncs",
        4, 12, "Intermediate",
        "Job Hiring Criteria with Multiple Requirements",
        "A recruiter searches for candidates who have: (Experience > 3 years) AND (Degree == 'CS'). In NumPy, you combine conditions using the bitwise & operator (or np.logical_and), wrapping each condition in parentheses.",
        "Use & for element-wise AND, | for OR, and ~ for NOT on NumPy boolean masks.",
        "The Python 'and' / 'or' Trap on Arrays",
        "Using Python's built-in 'and' or 'or' on arrays throws 'ValueError: The truth value of an array with more than one element is ambiguous'. You must use & and |.",
        "import numpy as np\nages = np.array([16, 22, 35, 14, 68, 42])\n# Eligible voters between 18 and 65\neligible = (ages >= 18) & (ages <= 65)\nprint('Ages:', ages)\nprint('Eligible mask:', eligible)\nprint('Eligible ages:', ages[eligible])",
        "Voter Eligibility Filtering", "Selecting citizens eligible for jury duty (age >= 18 and age <= 65).",
        "Why must you wrap conditions in parentheses like (a > 5) & (b < 10) in NumPy?", "Bitwise operators like & have higher operator precedence than comparison operators (> or <). Without parentheses, Python evaluates 5 & b first.",
        "Find numbers in arr = np.arange(10) that are greater than 2 AND less than 8.",
        "import numpy as np\narr = np.arange(10)\nprint(arr[(arr > 2) & (arr < 8)])"
    ),
    (
        "numpy-m3-l5", "numpy-module-3", "Universal Functions (sqrt, exp, log, abs)",
        "High-performance vectorized mathematical functions operating element-wise",
        5, 12, "Beginner",
        "Scientific Calculators with One-Touch Operation Keys",
        "A scientific calculator has a 'sqrt' key. When pressed on an array of numbers, it transforms all values in parallel. NumPy universal functions (ufuncs) are pre-compiled C routines executing on strided buffers.",
        "Ufuncs wrap fast C loops that compute math functions over ndarrays with SIMD speed.",
        "Mathematical Domain Errors & NaN Handling",
        "Computing log(-1) or sqrt(-1) in pure Python crashes with ValueError. NumPy ufuncs gracefully return np.nan (Not a Number) and issue a runtime warning without crashing the pipeline.",
        "import numpy as np\nx = np.array([1.0, 4.0, 9.0, 16.0])\nprint('sqrt(x):', np.sqrt(x))\nprint('exp(x/4):', np.exp(x / 4))\nprint('log(x):', np.log(x))\nneg = np.array([-5, 10, -20])\nprint('abs(neg):', np.abs(neg))",
        "Log-Transforming Skewed House Prices", "Applying natural log transformation to compress skewed financial data.",
        "What does np.log() calculate by default in NumPy?", "np.log() calculates the natural logarithm (base e), NOT base 10.",
        "Compute the square root of numbers [25, 49, 81, 100] using NumPy.",
        "import numpy as np\nprint(np.sqrt(np.array([25, 49, 81, 100])))"
    ),
    (
        "numpy-m3-l6", "numpy-module-3", "Broadcasting Rules and Dimension Alignment",
        "Operating on arrays of different shapes without copying data in memory",
        6, 16, "Intermediate",
        "Stretching a Stamp Across a Full Page",
        "Imagine you have a single rubber stamp with your signature (shape 1) and a column of 5 documents (shape 5, 1). Broadcasting 'stretches' the stamp vertically to sign all 5 documents without creating 5 physical rubber stamps.",
        "Broadcasting aligns trailing dimensions from right to left; dimensions match if they are equal or one of them is 1.",
        "Memory Waste from Manual Array Tiling",
        "Using np.tile() or np.repeat() to duplicate rows consumes massive RAM. Broadcasting simulates duplication virtually by setting strides to 0, achieving the same result with zero extra memory.",
        "import numpy as np\nmatrix = np.array([\n    [10, 20, 30],\n    [40, 50, 60]\n])\nrow_vector = np.array([1, 2, 3])  # Shape (3,) broadcasts to (2, 3)\nresult = matrix + row_vector\nprint('Matrix (2, 3):\\n', matrix)\nprint('Row vector (3,):', row_vector)\nprint('Broadcast sum:\\n', result)",
        "Centering Features by Subtracting Mean", "Subtracting a 1D mean vector of shape (D,) from a 2D data matrix of shape (N, D).",
        "State the fundamental rule of NumPy broadcasting.", "Starting from the trailing (rightmost) dimensions, two shapes are compatible if they are equal or one of them is 1.",
        "Add a 1D array of 3 numbers to a 3x3 matrix using broadcasting.",
        "import numpy as np\nm = np.ones((3, 3))\nv = np.array([10, 20, 30])\nprint(m + v)"
    ),
    (
        "numpy-m3-l7", "numpy-module-3", "Aggregation Functions (sum, prod, cumsum, cumprod)",
        "Collapsing array dimensions and computing running cumulative metrics",
        7, 12, "Beginner",
        "Adding Up Cash Register Receipts at the End of the Day",
        "At the end of a business day, the shop manager adds up all receipts into a single total revenue figure (sum). A running bank balance that updates with each transaction is a cumulative sum (cumsum).",
        "Aggregations reduce arrays across specified axes into scalar summaries or lower-rank tensors.",
        "Accumulating Multi-Dimensional Totals",
        "Data science requires summarizing data across different groups. NumPy aggregations collapse specific dimensions smoothly.",
        "import numpy as np\nvals = np.array([10, 20, 30, 40])\nprint('Sum:', np.sum(vals))\nprint('Product:', np.prod(vals))\nprint('Cumulative sum (running total):', np.cumsum(vals))\nprint('Cumulative product:', np.cumprod(np.array([1, 2, 3, 4])))",
        "Running Bank Account Balance", "Calculating account balance after a sequence of deposits: cumsum([100, 50, -20, 200]).",
        "What is the difference between np.sum() and np.cumsum()?", "np.sum() collapses the array into a single total scalar, whereas np.cumsum() returns an array of the running cumulative total at each step.",
        "Compute the cumulative sum of sales [50, 75, 100, 25].",
        "import numpy as np\nprint(np.cumsum(np.array([50, 75, 100, 25])))"
    ),
    (
        "numpy-m3-l8", "numpy-module-3", "Understanding Axis 0 versus Axis 1 Across Matrices",
        "Dissecting row-wise vs column-wise reductions and dimension collapse mechanics",
        8, 14, "Beginner",
        "Squashing a Cardboard Box Downwards vs Sideways",
        "Imagine a 2D grid of numbers. If a giant hydraulic press squashes the box downwards (vertically), all rows collapse down into a single row along the columns (axis=0). If you squash it sideways (horizontally), all columns collapse into a single column along the rows (axis=1).",
        "axis=0 collapses rows (computes statistics down each column); axis=1 collapses columns (computes statistics across each row).",
        "The Universal Beginner Axis Confusion",
        "Most beginners assume axis=0 means 'perform operation on rows'. In fact, axis=0 collapses along the row direction, giving you per-column results.",
        "import numpy as np\n# 3 students, 2 subjects (Math, English)\ngrades = np.array([\n    [80, 90],\n    [70, 85],\n    [95, 92]\n])\nsubject_means = np.mean(grades, axis=0)  # Down columns: Math mean, English mean\nstudent_means = np.mean(grades, axis=1)  # Across rows: Student 0, 1, 2 means\nprint('Grades:\\n', grades)\nprint('Subject averages (axis=0):', subject_means)\nprint('Student averages (axis=1):', student_means)",
        "Student Report Card Analytics", "Computing subject-wise class averages (axis=0) and student-wise GPAs (axis=1).",
        "In a 2D matrix of shape (5, 4), what is the shape of np.sum(matrix, axis=0)?", "The shape is (4,) because axis 0 (size 5) was collapsed.",
        "Given a 2x3 matrix, calculate the sum across columns for each row (axis=1).",
        "import numpy as np\nm = np.array([[1, 2, 3], [4, 5, 6]])\nprint(np.sum(m, axis=1))"
    ),
    (
        "numpy-m3-l9", "numpy-module-3", "Sorting Arrays (sort, argsort, lexsort)",
        "Ordering numerical data and extracting permutation indices for multi-column sorting",
        9, 14, "Intermediate",
        "Ordering Contestants by Height vs Giving Contestants Rank Numbers",
        "np.sort() rearranges the actual contestants in line from shortest to tallest. np.argsort() leaves the contestants standing where they are and hands them rank badges telling you which order to call them.",
        "sort() returns sorted values; argsort() returns the index permutation that sorts the array.",
        "Sorting Paired Datasets (Features and Labels Together)",
        "If you sort student scores with np.sort(), you lose which score belongs to which student name. np.argsort() gives the index permutation to sort both scores and names together.",
        "import numpy as np\nscores = np.array([45, 92, 78, 64])\nnames = np.array(['Alice', 'Bob', 'Charlie', 'David'])\nsorted_scores = np.sort(scores)\nsort_indices = np.argsort(scores)\nprint('Original scores:', scores)\nprint('Sorted scores:', sorted_scores)\nprint('Sort indices (argsort):', sort_indices)\nprint('Names sorted by score:', names[sort_indices])",
        "Leaderboard Generation", "Sorting players by score in descending order using sort_indices[::-1].",
        "What does np.argsort() return?", "It returns an integer array of indices that would sort the input array.",
        "Sort an array of prices [150, 45, 200, 99] and find the index of the cheapest item.",
        "import numpy as np\nprices = np.array([150, 45, 200, 99])\nprint('Cheapest index:', np.argsort(prices)[0])"
    ),
    (
        "numpy-m3-l10", "numpy-module-3", "Finding Unique Values & Counts with unique()",
        "Deduplicating elements and computing frequency distributions in categorical data",
        10, 12, "Beginner",
        "Counting Unique Colored Marbles in a Jar",
        "If you dump a jar of 500 red, blue, and green marbles, np.unique() tells you: 'There are only 3 distinct colors (red, blue, green), and here is the exact count for each color.'",
        "np.unique() finds distinct values and optionally returns inverse indices and frequency counts.",
        "Finding Unique Class Labels in Machine Learning",
        "Classification tasks require knowing all unique class labels (e.g. ['Cat', 'Dog', 'Bird']) and checking for class imbalance. np.unique(y, return_counts=True) gives both in one pass.",
        "import numpy as np\nlabels = np.array(['Dog', 'Cat', 'Dog', 'Dog', 'Bird', 'Cat'])\nuniques, counts = np.unique(labels, return_counts=True)\nprint('Unique labels:', uniques)\nprint('Counts per label:', counts)\nfor u, c in zip(uniques, counts):\n    print(f'{u}: {c}')",
        "Auditing Medical Diagnosis Classes", "Checking patient cohort distribution across diagnostic categories.",
        "What parameter in np.unique() returns the count of each unique value?", "The parameter is return_counts=True.",
        "Find the unique numbers and their counts in np.array([1, 2, 2, 3, 3, 3, 4]).",
        "import numpy as np\nvals, counts = np.unique(np.array([1, 2, 2, 3, 3, 3, 4]), return_counts=True)\nprint(vals, counts)"
    ),
    (
        "numpy-m3-l11", "numpy-module-3", "Counting Occurrences & Histogram Binning (bincount)",
        "Ultra-fast integer frequency counting and histogram computation",
        11, 14, "Intermediate",
        "Sorting Election Ballots into Candidate Bins",
        "In an election with Candidate 0, 1, and 2, election workers drop each paper ballot into Bin 0, Bin 1, or Bin 2. At the end, they simply count the height of each bin. np.bincount() counts non-negative integer occurrences at C speed.",
        "bincount() counts occurrences of non-negative integers up to the maximum value in O(N).",
        "Fast Categorical Aggregations and Mode Calculation",
        "Finding the most frequent integer (mode) or computing categorical histograms is significantly faster with bincount() than generic dictionary counting.",
        "import numpy as np\nratings = np.array([5, 4, 5, 3, 5, 4, 1, 5, 2])\ncounts = np.bincount(ratings)\nprint('Rating counts (index is rating score):', counts)\nprint('Most frequent rating (argmax of counts):', np.argmax(counts))",
        "Product Star Rating Analysis", "Computing customer review distributions from 1-star to 5-star ratings.",
        "Can np.bincount() be used on floating-point numbers or negative integers?", "No, np.bincount() only accepts 1D arrays of non-negative integers.",
        "Count the frequency of die rolls [1, 6, 3, 6, 2, 6, 4] using np.bincount().",
        "import numpy as np\nrolls = np.array([1, 6, 3, 6, 2, 6, 4])\nprint('Counts (0 to 6):', np.bincount(rolls))"
    ),
    (
        "numpy-m3-l12", "numpy-module-3", "Searching Arrays (where, nonzero, argmax, argmin)",
        "Locating indices of matching criteria, non-zero values, and peak extrema",
        12, 14, "Beginner",
        "A Metal Detector on a Beach",
        "Walking across a beach with a metal detector, it beeps only when metal is found underfoot and tells you the exact GPS coordinate. np.where() finds the exact indices where a condition is True.",
        "where() returns indices matching conditions; argmax() and argmin() locate global extrema.",
        "Finding Top Predictions and Outlier Locations",
        "In classification models, outputting the predicted class label requires finding the index with the maximum probability: np.argmax(probs, axis=1).",
        "import numpy as np\nvals = np.array([12, 45, 98, 23, 76, 98])\nprint('Index of max value (argmax):', np.argmax(vals))\nprint('Index of min value (argmin):', np.argmin(vals))\nprint('Indices where value > 50:', np.where(vals > 50)[0])",
        "Peak Temperature Spike Detection", "Locating the exact hour of maximum sensor temperature during a heatwave.",
        "What does np.argmax() return if there are multiple occurrences of the maximum value?", "It returns the index of the first occurrence of the maximum value.",
        "Find the index of the minimum value in np.array([45, 12, 89, 7, 23]).",
        "import numpy as np\na = np.array([45, 12, 89, 7, 23])\nprint('Min index:', np.argmin(a))"
    ),
    (
        "numpy-m3-l13", "numpy-module-3", "Boolean Masks and Advanced Conditional Filtering",
        "In-place conditional assignment and complex multi-clause array masking",
        13, 14, "Intermediate",
        "A Photo Editing Stencil",
        "When an artist paints through a paper stencil, paint only sticks to the cutout shapes (True) while the covered paper (False) remains untouched. A boolean mask protects certain elements while mutating others in place.",
        "Boolean masks allow reading or updating specific array subsets in-place vectorially.",
        "Replacing Outliers and Clipping Extremes In-Place",
        "In sensor telemetry, invalid noise spikes (e.g. temperature > 1000) must be replaced with a capped ceiling or NaN without copying the array. Mask assignment updates targeted elements in place.",
        "import numpy as np\nsensor_data = np.array([22.5, 23.0, 999.0, 24.1, -99.0, 25.3])\n# Clean outliers in place\ninvalid_mask = (sensor_data > 100) | (sensor_data < -40)\nsensor_data[invalid_mask] = np.nan\nprint('Cleaned sensor data with NaNs in place:', sensor_data)",
        "Telemetry Data Cleansing", "Replacing sensor communication dropouts and impossible values with NaN.",
        "Does assigning to a boolean mask like arr[arr < 0] = 0 modify the original array in place?", "Yes, boolean mask assignment mutates the underlying array memory in place.",
        "Replace all negative numbers in np.array([-5, 10, -2, 20]) with 0 in place.",
        "import numpy as np\na = np.array([-5, 10, -2, 20])\na[a < 0] = 0\nprint(a)"
    )
]

def generate_raw_module(mod_id, mod_num, title, subtitle, desc, badge, hours, raw_list, next_mod_id=None, next_mod_title=None):
    lessons_dict = {}
    summaries = []
    
    for idx, t in enumerate(raw_list):
        (id, mid, t_title, t_sub, order, readTime, diff,
         an_title, an_text, an_meta,
         pr_title, pr_desc,
         code,
         scen, scen_desc,
         pq_q, pq_a,
         ex_p, ex_s) = t

        next_t = raw_list[idx + 1] if idx + 1 < len(raw_list) else None
        nextId = next_t[0] if next_t else (next_mod_id if next_mod_id else "")
        nextTitle = next_t[2] if next_t else (next_mod_title if next_mod_title else "")
        nextModule = mid if next_t else (next_mod_id if next_mod_id else "")

        les = create_lesson(
            id=id,
            moduleId=mid,
            title=t_title,
            subtitle=t_sub,
            order=order,
            readTime=readTime,
            difficulty=diff,
            objectives=[
                f"Master practical usage and edge cases of {t_title}.",
                "Understand the memory footprint, execution speed, and parameter options.",
                "Avoid common subtle bugs and unexpected dimensional changes.",
                "Apply to realistic data science and machine learning workflows."
            ],
            prerequisites=["Python fundamentals", "NumPy array basics"],
            analogy={"title": an_title, "text": an_text, "metaphor": an_meta},
            problemSolved={"title": pr_title, "description": pr_desc, "keyPoints": [
                "Bypasses slow dynamic interpreter overhead.",
                "Enables high-performance vectorized operations at hardware speed.",
                "Ensures memory efficiency and clean mathematical syntax."
            ]},
            intuition={"overview": f"Inner mechanics of {t_title}.", "steps": [
                {"step": 1, "title": "Memory Inspection", "description": "NumPy evaluates shapes, strides, and contiguity."},
                {"step": 2, "title": "Index / Axis Alignment", "description": "Computes exact element offsets using strided arithmetic."},
                {"step": 3, "title": "Hardware Execution", "description": "Runs hardware-accelerated SIMD instructions over the data buffer."}
            ]},
            mathematics={"overview": f"Mathematical foundations for {t_title}.", "foundations": [
                {"name": "Tensor Operation", "latex": "\\mathbf{Y} = f(\\mathbf{X}) \\quad \\text{where } \\mathbf{X} \\in \\mathbb{R}^{n_1 \\times n_2}", "explanation": "General multi-axis transformation."},
                {"name": "Element Mapping", "latex": "y_i = g(x_i) \\quad \\forall i \\in [0, N-1]", "explanation": "Vectorized element-wise calculation."}
            ]},
            derivation={"title": f"Complexity & Correctness of {t_title}", "objective": "Verify computational complexity and memory usage.", "steps": [
                {"step": 1, "label": "Dimension Check", "latex": "\\text{Total elements } N = \\prod d_i", "explanation": "Input array has N total elements."},
                {"step": 2, "label": "Execution Rate", "latex": "O(N) \\text{ arithmetic operations in C}", "explanation": "Operates linearly with single-instruction multiple-data (SIMD) speed."}
            ]},
            variables=[
                {"symbol": "N", "name": "Element Count", "description": "Total values in array", "dimensions": "Scalar"},
                {"symbol": "s", "name": "Strides", "description": "Byte step tuple per axis", "dimensions": "Tuple"}
            ],
            numericalExample={
                "scenario": scen,
                "dataset": [{"Record": 1, "Context": scen_desc, "Status": "Verified"}],
                "calculations": [{"step": "Verification", "math": "Operation executed", "result": "Verified"}],
                "finalConclusion": "The operation produced the exact mathematical result expected."
            },
            visualExplanation={
                "title": f"Visual Architecture: {t_title}",
                "description": f"How {t_title} operates on array buffers in memory.",
                "features": [
                    "Vectorized loops run in compiled C.",
                    "Broadcasting avoids redundant memory allocation.",
                    "Seamless interoperability with downstream ML tools."
                ]
            },
            scratchCode={"title": "Interactive Python Demonstration", "code": code, "explanation": "Direct executable verification."},
            sklearnCode={"title": "Data Science & ML Pipeline Usage", "code": code, "explanation": "How top data teams use this pattern."},
            runnableCode_snippet=code,
            lineByLineExplanation=[
                {"lines": "1-2", "codeSnippet": "import numpy as np", "explanation": "Loads NumPy library."},
                {"lines": "3-5", "codeSnippet": "# Operation execution", "explanation": "Executes the operation and outputs the result."}
            ],
            hyperparameters=[{"name": "axis", "defaultVal": "None", "range": "None, 0, 1", "effect": "Dimension along which operation is computed", "recommendation": "Set axis explicitly for multi-dimensional arrays."}],
            assumptions=[{"assumption": "Compatible shapes", "whyItMatters": "Prevents dimension broadcast mismatch errors", "howToVerify": "Check .shape on all operands"}],
            commonMistakes=[{"mistake": "Axis direction confusion", "solution": "Remember axis=0 collapses rows, axis=1 collapses columns", "whyWrong": "Produces inverted summary dimensions", "howToFix": "Verify the output shape after aggregation"}],
            realWorldUseCases=[
                {"industry": "Finance", "application": "Portfolio Returns", "benefit": "Instant daily percentage change computation."},
                {"industry": "E-Commerce", "application": "Recommendation Engine", "benefit": "Vectorized user similarity metrics."}
            ],
            practiceQuestions=[
                {"id": "pq1", "question": pq_q, "hint": "Think about array dimensions.", "answer": pq_a},
                {"id": "pq2", "question": f"Is {t_title} vectorized?", "hint": "Does it use C loops?", "answer": "Yes, it runs pre-compiled C routines across contiguous memory buffers."},
                {"id": "pq3", "question": f"How does {t_title} benefit machine learning pipelines?", "hint": "Think of execution speed.", "answer": "It speeds up preprocessing and loss calculations by hundreds of times compared to pure Python."}
            ],
            quiz=[
                {
                    "id": "q1",
                    "question": f"What is the primary advantage of {t_title} in NumPy?",
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
            independentExercise={
                "title": f"Practice Task: {t_title}",
                "problem": ex_p,
                "difficulty": diff,
                "hints": ["Review the code example above", "Verify the expected output carefully"],
                "starterCode": "import numpy as np\n# Your solution here:\n",
                "solution": ex_s
            },
            summary={
                "keyTakeaways": [
                    f"Mastered {t_title} and its application in data science.",
                    "Learned to avoid common dimensional pitfalls and memory bugs.",
                    "Ready to progress to the next topic in the learning path."
                ],
                "nextLessonId": nextId,
                "nextLessonTitle": nextTitle,
                "nextLessonModuleId": nextModule
            }
        )
        lessons_dict[les["id"]] = les
        summaries.append({
            "id": les["id"],
            "moduleId": les["moduleId"],
            "title": les["title"],
            "description": les["subtitle"],
            "order": les["order"],
            "readTimeMinutes": les["readTimeMinutes"],
            "visualizerType": les["visualizerType"],
            "difficulty": les["difficulty"]
        })

    mod_data = {
        "id": mod_id,
        "number": mod_num,
        "title": title,
        "subtitle": subtitle,
        "description": desc,
        "icon": "Layers",
        "badge": badge,
        "estimatedHours": hours,
        "topicsCount": len(summaries),
        "lessons": summaries
    }
    
    file_path = os.path.join(OUTPUT_DIR, f"{mod_id}.ts")
    write_module_ts(file_path, f"numpyModule{mod_num}", mod_data, lessons_dict)
    print(f"Generated {mod_id} with {len(lessons_dict)} lessons.")

generate_raw_module(
    "numpy-module-3", 3,
    "Array Operations and Broadcasting",
    "Mastering Vectorized Arithmetic, Comparison Masks, Universal Functions & Broadcasting",
    "Discover the immense power of NumPy vectorization. Learn arithmetic operations, ufuncs, broadcasting rules, multi-axis reductions, sorting, and conditional filtering.",
    "Operations & Broadcasting", 12, m3_raw,
    "numpy-m4-l1", "Sum, Mean, Median, Minimum, and Maximum"
)

# ==============================================================================
# MODULE 4: Mathematical and Statistical Operations (11 Lessons)
# ==============================================================================
m4_raw = [
    (
        "numpy-m4-l1", "numpy-module-4", "Sum, Mean, Median, Minimum, and Maximum",
        "Measures of central tendency, range, and extreme values across arrays",
        1, 12, "Beginner",
        "Summarizing a Sports Team's Season Performance",
        "To summarize a cricket team's season, the coach calculates: the total runs scored (sum), average runs per game (mean), typical middle performance ignoring blowouts (median), worst game (min), and best game (max).",
        "Summary statistics capture central tendency and bounds without inspecting every individual game.",
        "Sensitivity of Mean to Extreme Outliers",
        "If a billionaire walks into a cafe of 10 people, the mean net worth jumps to $100M, but the median stays at $50,000. NumPy provides both np.mean() and np.median() to diagnose skewness.",
        "import numpy as np\nmarks = np.array([55, 60, 65, 70, 75, 80, 100])\nprint('Sum:', np.sum(marks))\nprint('Mean:', np.mean(marks))\nprint('Median:', np.median(marks))\nprint('Min:', np.min(marks))\nprint('Max:', np.max(marks))\nprint('Peak-to-Peak Range (max - min):', np.ptp(marks))",
        "Student Exam Analytics", "Calculating class averages, median score, and range of marks.",
        "Why is median more robust than mean?", "Median is the 50th percentile rank; extreme outliers at either tail do not shift the middle rank.",
        "Compute the mean and median of [10, 12, 14, 15, 1000].",
        "import numpy as np\na = np.array([10, 12, 14, 15, 1000])\nprint('Mean:', np.mean(a), 'Median:', np.median(a))"
    ),
    (
        "numpy-m4-l2", "numpy-module-4", "Variance and Standard Deviation",
        "Quantifying data dispersion, volatility, and spread around the central mean",
        2, 12, "Intermediate",
        "A Predictable Train Schedule vs an Unpredictable Bus",
        "Train A and Bus B both take an average of 30 minutes. But Train A always takes between 29 and 31 minutes (low variance), while Bus B takes between 10 and 50 minutes (high variance). Standard deviation measures this unpredictability.",
        "Variance (sigma^2) and Standard Deviation (sigma) measure the spread of observations around the mean.",
        "Degrees of Freedom Trap (ddof=0 vs ddof=1)",
        "By default, NumPy's np.std(ddof=0) computes population standard deviation (dividing by N). For sample data in statistics, you must pass ddof=1 (dividing by N - 1) to avoid underestimating true variance.",
        "import numpy as np\nsalaries = np.array([50, 52, 48, 51, 49, 110])\nvar_pop = np.var(salaries)\nstd_pop = np.std(salaries)\nstd_sample = np.std(salaries, ddof=1)\nprint('Mean salary:', np.mean(salaries))\nprint('Population std (ddof=0):', std_pop)\nprint('Sample std (ddof=1):', std_sample)",
        "Employee Salary Dispersion", "Measuring income inequality and dispersion in a company department.",
        "What is the mathematical relationship between variance and standard deviation?", "Standard deviation is the square root of variance: sigma = sqrt(sigma^2).",
        "Calculate sample standard deviation (ddof=1) of marks [70, 75, 80, 85, 90].",
        "import numpy as np\nm = np.array([70, 75, 80, 85, 90])\nprint('Sample std:', np.std(m, ddof=1))"
    ),
    (
        "numpy-m4-l3", "numpy-module-4", "Percentiles, Quantiles, and Interquartile Range (IQR)",
        "Dividing sorted distributions into ranked segments and detecting non-parametric spread",
        3, 14, "Intermediate",
        "College Entrance Exam Percentile Ranks",
        "If you score in the 90th percentile on the SAT, you scored higher than 90% of all test takers. np.percentile() splits arrays into 100 slices. The Interquartile Range (IQR = Q3 - Q1) covers the middle 50% of students.",
        "Percentiles measure relative position regardless of distribution shape or normality.",
        "Robust Outlier Detection Without Gaussian Assumptions",
        "Z-scores fail when data is skewed. The Tukey IQR rule (outliers < Q1 - 1.5*IQR or > Q3 + 1.5*IQR) detects anomalies robustly in any distribution.",
        "import numpy as np\ndata = np.array([12, 15, 18, 22, 25, 28, 32, 35, 40, 95])\nq25 = np.percentile(data, 25)\nq50 = np.percentile(data, 50)  # median\nq75 = np.percentile(data, 75)\niqr = q75 - q25\nprint('Q1 (25th):', q25, 'Q2 (Median):', q50, 'Q3 (75th):', q75)\nprint('IQR:', iqr)\nprint('Outlier bounds:', (q25 - 1.5 * iqr, q75 + 1.5 * iqr))",
        "Customer Spending Quartiles", "Segmenting shoppers into budget (Q1), typical (Q2-Q3), and VIP (Q4) tiers.",
        "What is the difference between np.percentile() and np.quantile()?", "np.percentile() accepts values from 0 to 100, while np.quantile() accepts values from 0.0 to 1.0.",
        "Compute the 25th, 50th, and 75th percentiles of np.arange(1, 101).",
        "import numpy as np\na = np.arange(1, 101)\nprint(np.percentile(a, [25, 50, 75]))"
    ),
    (
        "numpy-m4-l4", "numpy-module-4", "Vector Dot Products and Geometric Projections",
        "Computing scalar projections, similarity scores, and inner products",
        4, 14, "Intermediate",
        "Work Done Moving an Object & Shopping Bill Calculations",
        "In physics, Work = Force * Displacement * cos(theta). If you push in the exact direction of travel, work is maximized. In shopping, Total Bill = Quantities (dot) Prices. The dot product multiplies matching pairs and sums them into a single scalar.",
        "The dot product u . v = sum(u_i * v_i) measures alignment and calculates linear combinations.",
        "Calculating Cosine Similarity and Word Embeddings",
        "In AI, comparing two text embeddings requires computing their normalized dot product: (u . v) / (||u|| * ||v||) to measure semantic similarity.",
        "import numpy as np\nu = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\ndot_prod = np.dot(u, v)  # 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32\nprint('Vector u:', u)\nprint('Vector v:', v)\nprint('Dot product (u . v):', dot_prod)\nprint('Verified with sum(u * v):', np.sum(u * v))",
        "Calculating Shopping Receipt Total", "Quantities [3 apples, 2 milks, 1 bread] dot Prices [$1.5, $3.0, $2.5].",
        "What does a dot product of zero between two non-zero vectors mean geometrically?", "It means the two vectors are strictly orthogonal (perpendicular at 90 degrees).",
        "Compute the dot product between [2, 3] and [4, -1].",
        "import numpy as np\nprint(np.dot(np.array([2, 3]), np.array([4, -1])))"
    ),
    (
        "numpy-m4-l5", "numpy-module-4", "Matrix Multiplication with np.matmul() and the @ Operator",
        "Executing linear algebraic transformations, projections, and neural network layer forward passes",
        5, 14, "Intermediate",
        "Calculating Factory Output Across Multiple Days and Products",
        "A factory makes Chairs and Tables. Each requires Wood and Steel. A matrix multiplication takes the (Days x Products) production matrix and multiplies it by the (Products x Materials) bill-of-materials matrix to yield the (Days x Materials) requirements in one step.",
        "Matrix multiplication multiplies rows by columns: (M x K) @ (K x N) -> (M x N).",
        "The Fatal Trap of Using * Instead of @",
        "Writing A * B performs element-wise multiplication. In linear regression and neural networks, you need true matrix multiplication: A @ B or np.matmul(A, B).",
        "import numpy as np\nA = np.array([\n    [1, 2],\n    [3, 4]\n])\nB = np.array([\n    [5, 6],\n    [7, 8]\n])\nelem_mult = A * B\nmatrix_mult = A @ B  # Or np.matmul(A, B)\nprint('Element-wise A * B:\\n', elem_mult)\nprint('Matrix multiplication A @ B:\\n', matrix_mult)",
        "Neural Network Dense Layer Forward Pass", "Multiplying input batch X (N x D) by weight matrix W (D x H) to compute layer activations.",
        "What condition must be satisfied for two matrices A and B to be multiplied with A @ B?", "The number of columns in A must exactly equal the number of rows in B.",
        "Multiply a 2x3 matrix of ones by a 3x2 matrix of twos using @.",
        "import numpy as np\nA = np.ones((2, 3))\nB = np.full((3, 2), 2)\nprint(A @ B)"
    ),
    (
        "numpy-m4-l6", "numpy-module-4", "Basic Linear Algebra (np.linalg.inv, det, solve)",
        "Solving systems of linear equations, matrix inversion, and determinant computation",
        6, 14, "Advanced",
        "Solving for Ticket Prices in a School Drama Production",
        "2 adults and 3 children paid $34; 3 adults and 1 child paid $30. What is the price of an adult and child ticket? Linear algebra expresses this as A x = b and solves for x = A^(-1) b instantly.",
        "np.linalg provides robust LAPACK-backed routines for matrix inverses, determinants, and linear systems.",
        "Numerical Instability of Explicit Matrix Inversion",
        "Computing x = inv(A) @ b is slower and numerically unstable. Always use np.linalg.solve(A, b), which uses LU decomposition without explicit inversion.",
        "import numpy as np\n# 2x + 3y = 34\n# 3x + 1y = 30\nA = np.array([[2, 3], [3, 1]])\nb = np.array([34, 30])\n# Solve Ax = b directly\nsolution = np.linalg.solve(A, b)\ndet = np.linalg.det(A)\nprint('Determinant:', round(det, 2))\nprint('Solution [adult_price, child_price]:', solution)",
        "Ordinary Least Squares Closed-Form Normal Equation", "Solving (X^T X) theta = X^T y to find optimal linear regression weights.",
        "Why is np.linalg.solve(A, b) preferred over np.linalg.inv(A) @ b?", "np.linalg.solve is faster and much less prone to floating-point rounding errors and numerical instability.",
        "Solve the system: 1x + 1y = 10 and 2x - 1y = 5.",
        "import numpy as np\nA = np.array([[1, 1], [2, -1]])\nb = np.array([10, 5])\nprint(np.linalg.solve(A, b))"
    ),
    (
        "numpy-m4-l7", "numpy-module-4", "Random Number Generation with np.random.default_rng()",
        "Modern BitGenerator architectures, PCG64 random streams, and legacy API upgrades",
        7, 12, "Beginner",
        "A Cryptographically Sound Roulette Wheel",
        "Traditional random generators were like old physical roulette wheels with subtle manufacturer flaws. Modern np.random.default_rng() uses PCG64, an ultra-fast algorithm with a 128-bit period that eliminates bias.",
        "default_rng() is the official modern NumPy API replacing the legacy np.random.* functions.",
        "Using Deprecated Legacy np.random.seed() and np.random.rand()",
        "The legacy np.random functions rely on a global shared state with poor statistical properties. Modern code instantiates an isolated Generator: rng = np.random.default_rng().",
        "import numpy as np\nrng = np.random.default_rng(seed=42)\nuniform_floats = rng.uniform(low=0.0, high=1.0, size=4)\nrandom_ints = rng.integers(low=1, high=7, size=6)  # Die rolls 1 to 6\nprint('Uniform floats [0, 1):', uniform_floats)\nprint('6 Die rolls (1 to 6):', random_ints)",
        "Monte Carlo Simulation", "Simulating 1,000 portfolio paths to assess financial market tail-risk.",
        "Why did NumPy replace np.random.rand() with np.random.default_rng()?", "default_rng() uses the modern PCG64 BitGenerator, which is faster, has better statistical randomness, and avoids mutable global state.",
        "Generate 5 random integers between 10 and 20 inclusive using default_rng().",
        "import numpy as np\nrng = np.random.default_rng(42)\nprint(rng.integers(10, 21, size=5))"
    ),
    (
        "numpy-m4-l8", "numpy-module-4", "Reproducible Random Numbers & Seed Management",
        "Ensuring deterministic experiments, reproducible research, and debugging stability",
        8, 12, "Beginner",
        "Replaying a Recorded Chess Game Move-by-Move",
        "If you record every move of a chess game in a notebook (the seed), anyone in the world who follows that notebook will recreate the exact identical board state at step 40. Seeding ensures your random experiments are 100% reproducible.",
        "Setting a seed initializes the pseudorandom generator algorithm to a deterministic starting point.",
        "Non-Deterministic Machine Learning Training Runs",
        "If you do not seed your random generator, every run gives slightly different train/test splits and weight initializations, making it impossible to know if an accuracy change came from your model or random luck.",
        "import numpy as np\n# Run 1 with seed 100\nrng1 = np.random.default_rng(seed=100)\nsample1 = rng1.normal(0, 1, 3)\n# Run 2 with same seed 100\nrng2 = np.random.default_rng(seed=100)\nsample2 = rng2.normal(0, 1, 3)\nprint('Run 1:', sample1)\nprint('Run 2:', sample2)\nprint('Exact match verified:', np.array_equal(sample1, sample2))",
        "Scientific Benchmarking & Paper Replication", "Ensuring academic peer reviewers can replicate experimental accuracy down to the decimal.",
        "What happens if you omit the seed parameter in np.random.default_rng()?", "NumPy seeds the generator from the operating system's cryptographic entropy pool (/dev/urandom), producing non-reproducible sequences.",
        "Demonstrate that two generators initialized with seed 99 generate identical arrays.",
        "import numpy as np\nr1 = np.random.default_rng(99).integers(0, 100, 3)\nr2 = np.random.default_rng(99).integers(0, 100, 3)\nprint('Arrays equal:', np.array_equal(r1, r2))"
    ),
    (
        "numpy-m4-l9", "numpy-module-4", "Random Sampling and Probability Distributions",
        "Drawing samples from Normal, Binomial, Poisson, and Uniform distributions",
        9, 14, "Intermediate",
        "Rolling Fair Dice vs Human Height Distributions",
        "A fair die has an equal chance for 1 through 6 (Uniform distribution). Human heights cluster around an average of 170cm with rare extremes (Normal Gaussian bell curve). Customer arrivals at a cafe follow a Poisson distribution.",
        "NumPy provides parameterized samplers for dozens of real-world statistical distributions.",
        "Assuming All Data is Uniformly Distributed",
        "Real-world sensor noise and stock returns are rarely uniform. Using the correct distribution (e.g. Normal or Poisson) is vital for realistic simulations.",
        "import numpy as np\nrng = np.random.default_rng(42)\n# Normal distribution (mean=170, std=10) for adult heights\nheights = rng.normal(loc=170, scale=10, size=5)\n# Binomial distribution (n=10 coin flips, p=0.5)\ncoin_heads = rng.binomial(n=10, p=0.5, size=5)\nprint('Simulated heights (cm):', np.round(heights, 1))\nprint('Heads out of 10 coin flips:', coin_heads)",
        "Synthetic Data Generation for ML Testing", "Generating synthetic patient vitals matching clinical distribution statistics.",
        "What parameters define a normal Gaussian distribution in NumPy?", "loc (the mean / center) and scale (the standard deviation / spread).",
        "Generate 1,000 samples from a Normal distribution with mean 0 and std 1, and print sample mean.",
        "import numpy as np\nrng = np.random.default_rng(42)\ns = rng.normal(0, 1, 1000)\nprint('Sample mean close to 0:', round(np.mean(s), 2))"
    ),
    (
        "numpy-m4-l10", "numpy-module-4", "Covariance and Correlation Analysis",
        "Quantifying linear relationships, dependency directions, and normalized Pearson matrices",
        10, 14, "Intermediate",
        "Ice Cream Sales vs Outdoor Temperature",
        "As temperature rises in July, ice cream sales rise (positive correlation close to +1.0). As temperature rises, hot soup sales fall (negative correlation close to -1.0). Shoe size and test scores have zero correlation (~0.0).",
        "Covariance measures joint variability; Pearson correlation normalizes it to [-1, 1].",
        "Interpreting Covariance Without Scale Normalization",
        "Covariance depends on measurement units (dollars vs cents). A covariance of 10,000 could be weak or strong. Correlation scales the relationship strictly to [-1, 1].",
        "import numpy as np\n# Study hours vs Exam scores\nhours = np.array([2, 4, 6, 8, 10])\nscores = np.array([50, 65, 75, 85, 95])\ncorr_matrix = np.corrcoef(hours, scores)\nprint('Pearson Correlation Matrix:\\n', corr_matrix)\nprint('Correlation coefficient r:', round(corr_matrix[0, 1], 4))",
        "Feature Selection in Machine Learning", "Identifying highly correlated redundant features to eliminate multicollinearity.",
        "What does a Pearson correlation of -1.0 indicate?", "A perfect negative linear relationship: as feature X increases, feature Y decreases in exact proportion.",
        "Calculate the correlation coefficient between [1, 2, 3] and [2, 4, 6].",
        "import numpy as np\nx = np.array([1, 2, 3])\ny = np.array([2, 4, 6])\nprint('Correlation:', round(np.corrcoef(x, y)[0, 1], 1))"
    ),
    (
        "numpy-m4-l11", "numpy-module-4", "Handling Missing and NaN Values with NumPy Functions",
        "Diagnosing np.nan, avoiding silent statistical poisoning, and using nan* functions",
        11, 14, "Intermediate",
        "A Broken Thermometer in a Weather Station",
        "If a sensor wire snaps, it records NaN (Not a Number). If you calculate average temperature with np.mean(), a single NaN infects the entire sum and returns NaN. You must use np.nanmean() to skip broken readings safely.",
        "Standard functions propagate NaN silently; np.nan* functions ignore NaNs during aggregation.",
        "Silent NaN Poisoning of Entire Training Batches",
        "If one feature value contains NaN, standard np.mean(X) evaluates to NaN, crashing downstream gradient descent. Recognizing and handling NaNs protects pipelines.",
        "import numpy as np\nreadings = np.array([20.0, 22.0, np.nan, 26.0, np.nan, 30.0])\nprint('Standard mean (poisoned):', np.mean(readings))\nprint('nanmean (skips NaNs):', np.nanmean(readings))\nprint('nanstd:', round(np.nanstd(readings), 2))\nprint('Boolean mask of NaNs:', np.isnan(readings))\n# Replace NaNs with mean\ncleaned = np.nan_to_num(readings, nan=np.nanmean(readings))\nprint('Cleaned with imputed mean:', cleaned)",
        "Weather Station Missing Value Imputation", "Imputing missing sensor readings with the monthly median before training.",
        "Why does np.nan == np.nan evaluate to False in Python and NumPy?", "By IEEE 754 floating-point standard, NaN represents an undefined value that is not equal to anything, including itself. Use np.isnan() to test for NaNs.",
        "Calculate the mean of [10.0, np.nan, 20.0] ignoring the NaN.",
        "import numpy as np\nprint(np.nanmean(np.array([10.0, np.nan, 20.0])))"
    )
]

generate_raw_module(
    "numpy-module-4", 4,
    "Mathematical and Statistical Operations",
    "Central Tendency, Linear Algebra, Modern Random Generators, and Missing Data Handling",
    "Perform rigorous statistical and linear algebraic computations. Learn summary statistics, matrix multiplication (@), system solvers, reproducible RNG, and NaN-safe reductions.",
    "Math & Statistics", 14, m4_raw,
    "numpy-m5-l1", "Principles of Vectorization in Numerical Computing"
)

