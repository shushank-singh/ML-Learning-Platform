import os
import sys
import json
import subprocess
from numpy_helpers import create_lesson, write_module_ts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "numpy")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Helper from m3_m4
from build_numpy_m3_m4 import generate_raw_module

# ==============================================================================
# MODULE 5: Efficient NumPy Programming (12 Lessons)
# ==============================================================================
m5_raw = [
    (
        "numpy-m5-l1", "numpy-module-5", "Principles of Vectorization in Numerical Computing",
        "Understanding SIMD hardware execution, eliminating interpreter overhead, and vector thinking",
        1, 14, "Intermediate",
        "A Factory Conveyor Belt vs Carrying Items One by One",
        "Instead of walking back and forth 10,000 times to carry one bolt at a time (Python loops), vectorization places 10,000 bolts onto a motorized conveyor belt where the machine processes them in continuous batches.",
        "Vectorization replaces explicit loops with compiled array expressions executing at hardware bandwidth.",
        "The 100x Python Loop Speed Penalty",
        "Pure Python loops require dynamic type checking, frame creation, and pointer dereferencing on every single item. Vectorization delegates the loop to low-level compiled C instructions.",
        "import numpy as np\narr = np.arange(1000000)\n# Vectorized squaring executes in milliseconds\nsquared = arr ** 2\nprint('Computed 1,000,000 squares vectorially!')\nprint('First 5 elements:', squared[:5])\nprint('Last 5 elements:', squared[-5:])",
        "Applying Sales Tax to Millions of Retail Records", "Multiplying transaction amounts by 1.0825 across millions of receipts vectorially.",
        "What CPU feature powers modern NumPy vectorization?", "Single Instruction Multiple Data (SIMD) instruction sets like AVX-512 and SSE.",
        "Square all numbers from 1 to 5 using vectorized multiplication.",
        "import numpy as np\na = np.arange(1, 6)\nprint(a ** 2)"
    ),
    (
        "numpy-m5-l2", "numpy-module-5", "Python Loops vs Vectorized Calculations",
        "Realistic performance benchmarking and understanding when vectorization yields 50x-100x speedups",
        2, 14, "Intermediate",
        "A Postal Van vs A Person Delivering Letters on Foot",
        "If you have 1 letter to deliver to your next-door neighbor, walking is fine. But delivering 50,000 letters across a city on foot takes weeks; a postal delivery van does it in hours. For large numerical datasets, vectorization speeds up execution by orders of magnitude.",
        "Benchmarking shows vectorization is 20x to 100x faster for arrays above 10,000 items.",
        "Overhead on Micro-Arrays (Size < 10)",
        "For arrays with only 2 or 3 numbers, NumPy overhead (function call and array creation) can be slightly slower than a simple Python scalar addition. Vectorization shines on large datasets.",
        "import numpy as np\nimport time\n# Benchmarking 100,000 elements\nn = 100000\npy_list = list(range(n))\nnp_arr = np.arange(n)\nt0 = time.perf_counter()\nres_py = [x * 2 for x in py_list]\nt_py = time.perf_counter() - t0\nt0 = time.perf_counter()\nres_np = np_arr * 2\nt_np = time.perf_counter() - t0\nprint(f'Python list loop time: {t_py:.5f}s')\nprint(f'NumPy vectorized time: {t_np:.5f}s')\nprint(f'Speedup factor: {t_py / t_np:.1f}x faster')",
        "Real-Time Video Frame Pixel Manipulation", "Processing 60 frames per second where each frame has 2 million pixels.",
        "Does NumPy vectorization make small arrays of length 3 faster than pure Python?", "Not necessarily; for tiny arrays (< 10 elements), the overhead of invoking the NumPy C API can outweigh the benefits.",
        "Double an array of 5 elements without using a for loop.",
        "import numpy as np\na = np.array([1, 2, 3, 4, 5])\nprint(a * 2)"
    ),
    (
        "numpy-m5-l3", "numpy-module-5", "Broadcasting Rules in Practical Examples",
        "Feature normalization, distance matrices, and batch adjustments with zero-copy broadcasting",
        3, 14, "Intermediate",
        "Applying a Grade Curve Across 5 Classrooms",
        "If the exam was too hard, the dean decides: 'Add 5 marks to Math, 3 marks to Physics, and 7 marks to History.' Broadcasting applies this 3-element adjustment across every student in all 5 classrooms automatically.",
        "Broadcasting enables multi-dimensional array operations with zero memory copy overhead.",
        "Centering Features around Zero Mean",
        "Machine learning requires feature centering: X_centered = X - X.mean(axis=0). Broadcasting stretches the 1D mean vector across all rows seamlessly.",
        "import numpy as np\n# 4 students, 3 subjects\ngrades = np.array([\n    [65, 70, 75],\n    [80, 85, 90],\n    [55, 60, 65],\n    [90, 95, 100]\n])\nmean_per_subject = np.mean(grades, axis=0)\ncentered = grades - mean_per_subject\nprint('Original grades:\\n', grades)\nprint('Subject means:', mean_per_subject)\nprint('Centered grades (mean subtracted):\\n', np.round(centered, 1))",
        "Feature Centering Before PCA", "Subtracting the feature mean vector from all observations before calculating covariance.",
        "What shape must the mean vector have to subtract from a matrix of shape (100, 5)?", "Shape (5,) or (1, 5) satisfies broadcasting rules.",
        "Subtract [10, 20] from a 2x2 matrix [[15, 25], [30, 40]].",
        "import numpy as np\nm = np.array([[15, 25], [30, 40]])\nprint(m - np.array([10, 20]))"
    ),
    (
        "numpy-m5-l4", "numpy-module-5", "Conditional Selection with np.where()",
        "Vectorized if-else ternary selection without Python loops",
        4, 14, "Beginner",
        "A Pass/Fail Stamp on a Test Paper",
        "Instead of writing 'if score >= 50: pass else: fail' line by line, np.where(condition, x, y) stamps 'Pass' or 'Fail' across the entire array in a single vectorized swoop.",
        "np.where(condition, value_if_true, value_if_false) executes ternary branch selection vectorially.",
        "Slow Python List Comprehensions with If-Else",
        "Writing [x if c else y for x, y, c in zip(...)] is slow and memory-heavy. np.where() evaluates both branches in compiled C at full RAM bandwidth.",
        "import numpy as np\nscores = np.array([45, 82, 58, 91, 64, 75])\nstatus = np.where(scores >= 60, 'Pass', 'Fail')\n# Numerical clipping\nbonus = np.where(scores > 80, scores + 5, scores)\nprint('Scores:', scores)\nprint('Status:', status)\nprint('Scores with bonus for > 80:', bonus)",
        "Credit Risk Loan Approval", "Flagging applications as 'Approved' or 'Denied' based on credit score thresholds.",
        "What does np.where() return if only a condition is passed (without x and y)?", "It returns a tuple of index arrays where the condition is True, identical to nonzero(condition).",
        "Replace all negative numbers in [-2, 5, -10, 8] with 0 using np.where().",
        "import numpy as np\na = np.array([-2, 5, -10, 8])\nprint(np.where(a < 0, 0, a))"
    ),
    (
        "numpy-m5-l5", "numpy-module-5", "Multi-Condition Selection with np.select()",
        "Implementing complex piecewise functions and tiered grading rubrics vectorially",
        5, 14, "Intermediate",
        "Assigning Letter Grades (A, B, C, F) to Exam Scores",
        "If score >= 90 -> 'A'; elif score >= 80 -> 'B'; elif score >= 70 -> 'C'; else -> 'F'. np.select(condlist, choicelist, default) evaluates multiple sequential conditions vectorially.",
        "np.select evaluates a list of boolean conditions and returns values from matching choice lists.",
        "Deeply Nested np.where() Calls",
        "Nesting multiple np.where() calls like np.where(c1, a, np.where(c2, b, np.where(c3, c, d))) is hard to read and error-prone. np.select() organizes multi-tier logic cleanly.",
        "import numpy as np\nscores = np.array([95, 82, 74, 58, 88, 62])\nconditions = [\n    scores >= 90,\n    scores >= 80,\n    scores >= 70,\n    scores >= 60\n]\nchoices = ['A', 'B', 'C', 'D']\ngrades = np.select(conditions, choices, default='F')\nprint('Scores:', scores)\nprint('Assigned letter grades:', grades)",
        "Customer Loyalty Tier Assignment", "Assigning customers to 'Platinum', 'Gold', 'Silver', or 'Bronze' based on annual spend.",
        "What happens if none of the conditions in np.select() evaluate to True?", "NumPy assigns the specified default value (or 0 if omitted).",
        "Categorize ages [12, 25, 70] into 'Minor' (< 18), 'Adult' (< 65), and 'Senior' using np.select.",
        "import numpy as np\nages = np.array([12, 25, 70])\nconds = [ages < 18, ages < 65]\nchoices = ['Minor', 'Adult']\nprint(np.select(conds, choices, default='Senior'))"
    ),
    (
        "numpy-m5-l6", "numpy-module-5", "Combining Arrays with np.concatenate()",
        "Joining arrays along existing axes without modifying dimensions",
        6, 12, "Beginner",
        "Coupling Two Trains on the Same Track",
        "Connecting Train Car A (4 coaches) and Train Car B (6 coaches) creates a single 10-coach train on the same track. np.concatenate joins arrays along an existing axis.",
        "np.concatenate joins sequences of arrays along an existing specified axis.",
        "Concatenating Arrays with Incompatible Shapes",
        "All dimensions except the concatenation axis must match exactly. Trying to concatenate (3, 4) with (3, 5) along axis=0 raises ValueError.",
        "import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint('1D concatenation:', np.concatenate([a, b]))\nm1 = np.array([[1, 2], [3, 4]])\nm2 = np.array([[5, 6], [7, 8]])\nprint('2D concatenate axis=0 (stack rows):\\n', np.concatenate([m1, m2], axis=0))\nprint('2D concatenate axis=1 (join columns):\\n', np.concatenate([m1, m2], axis=1))",
        "Appending New Daily Data Batches", "Appending today's transaction records (N_today, D) to historical records (N_history, D).",
        "What is the default axis in np.concatenate()?", "The default axis is 0.",
        "Concatenate two arrays [10, 20] and [30, 40] into a single 1D array.",
        "import numpy as np\nprint(np.concatenate([[10, 20], [30, 40]]))"
    ),
    (
        "numpy-m5-l7", "numpy-module-5", "Concatenation and Stacking (vstack, hstack, column_stack)",
        "Intuitive vertical, horizontal, and column-wise array assembly helpers",
        7, 14, "Beginner",
        "Stacking Books Vertically vs Side-by-Side on a Shelf",
        "vstack() stacks books on top of each other (adding rows vertically). hstack() places books side by side on a shelf (expanding columns horizontally). column_stack() turns 1D vectors into columns of a 2D matrix.",
        "vstack() stacks row-wise; hstack() joins column-wise; column_stack() converts 1D vectors into 2D columns.",
        "1D Arrays in hstack vs vstack Pitfall",
        "For 1D arrays, hstack joins end-to-end into a longer 1D vector, while vstack stacks them into a 2D matrix. column_stack guarantees 2D column behavior.",
        "import numpy as np\nx = np.array([1, 2, 3])\ny = np.array([4, 5, 6])\nprint('vstack (creates 2D rows):\\n', np.vstack([x, y]))\nprint('hstack (1D sequence):', np.hstack([x, y]))\nprint('column_stack (features X1, X2):\\n', np.column_stack([x, y]))",
        "Assembling Machine Learning Feature Matrices", "Combining age, income, and credit score vectors into an (N, 3) feature matrix X.",
        "How does column_stack differ from hstack for 1D arrays?", "hstack concatenates 1D arrays end-to-end into a 1D vector, while column_stack converts each 1D array into a column of a 2D matrix.",
        "Use column_stack to create a 2D matrix from x = [1, 2] and y = [3, 4].",
        "import numpy as np\nprint(np.column_stack([[1, 2], [3, 4]]))"
    ),
    (
        "numpy-m5-l8", "numpy-module-5", "Splitting Arrays (split, hsplit, vsplit)",
        "Partitioning arrays into equal or variable sub-arrays along specified axes",
        8, 12, "Beginner",
        "Cutting a Cake into Equal Slices",
        "A baker cuts a large rectangular cake horizontally into top and bottom layers (vsplit), or vertically into left and right halves (hsplit). np.split divides arrays along any axis.",
        "split divides an array into multiple sub-arrays along a specified axis.",
        "Unequal Division Size Mismatch",
        "Passing an integer like np.split(arr, 3) on an array of length 10 raises ValueError because 10 cannot be divided equally into 3 slices. Pass index indices like [3, 7] for variable splits.",
        "import numpy as np\narr = np.arange(12).reshape(4, 3)\n# Split vertically into 2 submatrices (2 rows each)\ntop, bottom = np.vsplit(arr, 2)\nprint('Original (4, 3):\\n', arr)\nprint('Top half (2, 3):\\n', top)\nprint('Bottom half (2, 3):\\n', bottom)\n# Split 1D array at specific indices [2, 5]\nvec = np.arange(8)\nprint('Split at indices [2, 5]:', np.split(vec, [2, 5]))",
        "Train-Validation-Test Splitting", "Splitting a shuffled dataset into 70% train, 15% validation, and 15% test splits.",
        "What is the difference between vsplit and hsplit?", "vsplit splits along axis 0 (rows); hsplit splits along axis 1 (columns).",
        "Split an array of 6 numbers into 3 equal arrays using np.split.",
        "import numpy as np\na = np.arange(6)\nparts = np.split(a, 3)\nprint(len(parts), parts[0])"
    ),
    (
        "numpy-m5-l9", "numpy-module-5", "Sorting and Filtering Efficiently (partition, argpartition)",
        "Finding the top-K largest or smallest elements in O(N) time without full O(N log N) sorting",
        9, 14, "Advanced",
        "Finding the Top 3 Students Without Ranking All 500 Students",
        "If you only want to know which 3 students won medals, you do not need to sort all 500 test papers from highest to lowest. You only need to partition the top 3 into the winner box. np.partition does this in O(N) time instead of O(N log N).",
        "partition() rearranges elements so the k-th element is in sorted position with smaller items before it.",
        "Full Sorting When Only Top-K is Needed",
        "Calling np.sort() on an array of 10 million items takes O(N log N) time and heavy RAM. np.partition() retrieves the top-K items in blazingly fast O(N) linear time.",
        "import numpy as np\nscores = np.array([45, 92, 18, 77, 85, 33, 98, 64])\n# Find the 3 largest scores without full sort\n# Partition at index -3\npart = np.partition(scores, -3)\ntop_3 = part[-3:]\nprint('Original scores:', scores)\nprint('Partitioned array:', part)\nprint('Top 3 scores (unsorted order):', top_3)\nprint('Top 3 scores (sorted):', np.sort(top_3))",
        "K-Nearest Neighbors (KNN) Fast Neighbor Search", "Finding the 5 closest points among 100,000 data points in O(N) time.",
        "What is the time complexity of np.partition() compared to np.sort()?", "np.partition is O(N) linear time (using Introselect), whereas np.sort is O(N log N).",
        "Find the 2 smallest numbers in [50, 10, 40, 5, 30] using np.partition.",
        "import numpy as np\na = np.array([50, 10, 40, 5, 30])\nprint(np.partition(a, 2)[:2])"
    ),
    (
        "numpy-m5-l10", "numpy-module-5", "Views, Copies, and Memory Allocation Considerations",
        "Managing memory overhead, avoiding leaks, and understanding contiguous buffer sharing",
        10, 14, "Advanced",
        "A Large Library Book with a Borrowed Bookmark",
        "If you slice a tiny paragraph (10 words) from a massive 1,000-page book using a view, the entire 1,000-page book must remain in memory because the view holds a reference to the entire buffer. Calling .copy() lets you return the giant book to the library.",
        "A slice view keeps the entire parent array buffer alive in memory until the view is garbage collected.",
        "Memory Leaks Caused by Lingering Views of Large Arrays",
        "Extracting a tiny sub-slice from a 2GB array keeps the entire 2GB in RAM. Calling sub = arr[:10].copy() releases the 2GB parent array.",
        "import numpy as np\n# Simulating memory retention\nlarge = np.ones(1000000, dtype=np.float64)\ntiny_view = large[:5]\ntiny_copy = large[:5].copy()\nprint('tiny_view base exists (retains 8MB buffer):', tiny_view.base is not None)\nprint('tiny_copy base is None (independent memory):', tiny_copy.base is None)",
        "Streaming Large Audio/Video Files", "Extracting small signal clips and copying them to release the multi-gigabyte source file.",
        "Why is calling .copy() beneficial when saving a small slice of a massive array?", "It frees the underlying massive buffer from RAM once the original array variable goes out of scope.",
        "Create a slice of an array and explicitly make it an independent copy.",
        "import numpy as np\na = np.arange(10)\ns = a[:3].copy()\nprint(s.base is None)"
    ),
    (
        "numpy-m5-l11", "numpy-module-5", "Performance Benchmarking with Timing Methods",
        "Accurate profiling using time.perf_counter, measuring latency, and memory footprints",
        11, 14, "Intermediate",
        "A High-Precision Olympic Stopwatch",
        "You cannot measure a 100-meter sprint with a wall clock that only shows minutes. You need a digital stopwatch with microsecond precision. time.perf_counter() measures sub-millisecond execution times accurately.",
        "time.perf_counter() provides high-resolution monotonic timing unaffected by system clock adjustments.",
        "Timing Inaccuracies from System Sleep and Clock Jumps",
        "Using time.time() can yield inaccurate or even negative durations if network time synchronization (NTP) adjusts the clock during execution. Always use time.perf_counter().",
        "import numpy as np\nimport time\n\ndef benchmark(fn, iterations=50):\n    t0 = time.perf_counter()\n    for _ in range(iterations):\n        fn()\n    return (time.perf_counter() - t0) / iterations\n\na = np.arange(50000, dtype=np.float64)\nt_sum = benchmark(lambda: np.sum(a))\nprint(f'Mean execution time for np.sum(50,000 floats): {t_sum * 1e6:.2f} microseconds')",
        "Latency Profiling for Production ML Endpoints", "Measuring inference latency of a feature transformation pipeline to meet < 5ms SLAs.",
        "Why should you use time.perf_counter() instead of time.time() for benchmarking?", "perf_counter() uses the CPU's high-resolution monotonic timer, which cannot move backward or jitter during NTP updates.",
        "Measure the execution time of np.zeros(10000) using time.perf_counter.",
        "import numpy as np\nimport time\nt0 = time.perf_counter()\n_ = np.zeros(10000)\nprint('Elapsed (s):', time.perf_counter() - t0 > 0)"
    ),
    (
        "numpy-m5-l12", "numpy-module-5", "Common NumPy Errors and Debugging Techniques",
        "Diagnosing ValueError shape mismatches, IndexError bounds, and memory overflow exceptions",
        12, 14, "Beginner",
        "Reading the Warning Lights on a Car Dashboard",
        "When your car's check engine light turns on, an OBD scanner reads the exact error code: 'Cylinder 3 misfire'. In NumPy, error messages like 'ValueError: could not broadcast input array from shape (3,2) into shape (3,)' pinpoint the exact dimensional mismatch.",
        "Understanding NumPy exception messages reveals dimensional, indexing, and memory bottlenecks instantly.",
        "Ignoring Broadcasting Error Shapes",
        "When NumPy says 'operands could not be broadcast together with shapes (4, 3) (4, 1)', it tells you the exact dimensions that failed alignment. Inspecting .shape resolves 95% of issues.",
        "import numpy as np\n# Demonstrating common error diagnostics\na = np.array([1, 2, 3])\nb = np.array([10, 20])\ntry:\n    # Shape mismatch\n    c = a + b\nexcept ValueError as e:\n    print('Diagnosed ValueError:', e)\nprint('Fix: Verify shapes beforehand - a.shape:', a.shape, 'b.shape:', b.shape)",
        "Pipeline Integration Debugging", "Debugging automated ingestion pipelines before passing batches into Scikit-learn or PyTorch.",
        "What is the most common cause of a ValueError in NumPy?", "Incompatible array shapes that cannot be broadcast together during arithmetic operations.",
        "Write a try-except block catching an IndexError when accessing an out-of-bounds index.",
        "import numpy as np\na = np.array([1, 2])\ntry:\n    x = a[5]\nexcept IndexError:\n    print('Caught IndexError successfully!')"
    )
]

generate_raw_module(
    "numpy-module-5", 5,
    "Efficient NumPy Programming",
    "Vectorization, Stacking, Splitting, Fast Partitioning & Memory Optimization",
    "Master industrial-grade efficiency. Learn vectorization principles, broadcast operations, np.where, np.select, concatenation, fast top-K partitioning, and memory profiling.",
    "Efficient Programming", 14, m5_raw,
    "numpy-m6-l1", "Loading and Saving Numerical Data"
)

# ==============================================================================
# MODULE 6: NumPy for Data Science and Machine Learning (10 Lessons)
# ==============================================================================
m6_raw = [
    (
        "numpy-m6-l1", "numpy-module-6", "Loading and Saving Numerical Data",
        "Binary storage with .npy, compressed archives with .npz, and high-speed I/O",
        1, 14, "Beginner",
        "Freezing Leftovers in a Tupperware vs Writing a Handwritten Recipe",
        "Saving data to a text file (CSV) is like writing down a recipe on paper: it has to be parsed character by character. Saving with np.save(.npy) is like freezing the exact meal in Tupperware: you take it out and thaw it with zero reconstruction needed.",
        "Binary .npy files preserve exact data types, shapes, and bit representations without parsing overhead.",
        "Slow CSV Parsing on Multi-Gigabyte Numerical Datasets",
        "Reading a 10GB CSV file in Python takes minutes because every float must be converted from string text to binary. Loading an .npy file takes seconds via direct memory-mapped binary reads.",
        "import numpy as np\narr = np.array([[1.5, 2.5], [3.5, 4.5]])\n# Save to binary .npy\nnp.save('temp_weights.npy', arr)\n# Load back\nloaded = np.load('temp_weights.npy')\nprint('Loaded array:\\n', loaded)\nprint('Exact match:', np.array_equal(arr, loaded))\nimport os\nos.remove('temp_weights.npy')",
        "Checkpointing Neural Network Weights", "Saving million-parameter neural network weight tensors after every training epoch.",
        "What is the difference between np.save() and np.savez()?", "np.save stores a single array in an .npy file; np.savez packages multiple named arrays into an uncompressed or compressed (.npz) zip archive.",
        "Save an array [1, 2, 3] to 'test.npy' and load it back.",
        "import numpy as np, os\nnp.save('test.npy', [1, 2, 3])\nprint(np.load('test.npy'))\nos.remove('test.npy')"
    ),
    (
        "numpy-m6-l2", "numpy-module-6", "Working with CSV Data using genfromtxt()",
        "Ingesting structured tabular records, skipping headers, and handling missing cells",
        2, 14, "Intermediate",
        "A Bank Teller Sorting Foreign Currency Notes",
        "When a mixed bag of coins and foreign bills arrives, the teller sorts them by denomination, converts exchange rates, and sets aside counterfeit coins. np.genfromtxt() parses text CSV lines, skips header titles, and fills missing values.",
        "genfromtxt() parses tabular text files into structured ndarrays with custom missing-value handling.",
        "Crashes Caused by Missing Cells in loadtxt()",
        "np.loadtxt() assumes a pristine rectangular grid without missing numbers; if any cell is empty, it crashes. np.genfromtxt() handles missing fields gracefully with configurable fill values.",
        "import numpy as np\nimport io\n# Simulated CSV string with a header and missing value\ncsv_data = '''Age,Salary,Rating\n25,50000,4.2\n30,,4.8\n35,75000,3.9'''\ndata = np.genfromtxt(io.StringIO(csv_data), delimiter=',', skip_header=1, filling_values=0.0)\nprint('Parsed CSV data into NumPy array:\\n', data)\nprint('Shape:', data.shape)",
        "Loading Sensor Telemetry Logs", "Parsing thousands of IoT sensor log lines with occasional transmission dropouts.",
        "What does the skip_header parameter do in np.genfromtxt()?", "It skips the specified number of initial lines (e.g. skip_header=1 skips the column header names).",
        "Parse '1, 2\\n3, 4' as a 2x2 integer array using genfromtxt.",
        "import numpy as np, io\nprint(np.genfromtxt(io.StringIO('1,2\\n3,4'), delimiter=','))"
    ),
    (
        "numpy-m6-l3", "numpy-module-6", "Generating Synthetic Datasets for ML Experiments",
        "Simulating controlled clusters, regression curves, and custom noise distributions",
        3, 14, "Intermediate",
        "A Flight Simulator for Machine Learning Models",
        "Before a pilot flies a real passenger Boeing 777 in a storm, they train in a flight simulator where weather and wind speed can be dialed in precisely. Generating synthetic datasets allows data scientists to test algorithms under controlled signal-to-noise ratios.",
        "Synthetic generation creates ground-truth datasets with mathematically known parameters.",
        "Testing Models on Noisy Real Data Without Ground Truth",
        "On real messy data, if your model scores 60%, you don't know whether the data was too noisy or the model code had a bug. Synthetic datasets provide known ground truth to verify algorithm correctness.",
        "import numpy as np\nrng = np.random.default_rng(42)\n# True relationship: y = 3x + 5 + noise\nX = np.linspace(0, 10, 5)\nnoise = rng.normal(0, 0.5, size=5)\ny = 3 * X + 5 + noise\nprint('Feature X:', X)\nprint('Synthetic Target y with Gaussian noise:', np.round(y, 2))",
        "Benchmarking Regression Algorithms", "Generating synthetic linear and polynomial datasets to test estimator convergence.",
        "Why is adding Gaussian noise to synthetic features important?", "It simulates realistic sensor jitter and measurement uncertainty, testing model generalization.",
        "Generate 4 synthetic points along y = 2x with small random noise.",
        "import numpy as np\nrng = np.random.default_rng(42)\nX = np.arange(4)\nprint(2 * X + rng.normal(0, 0.1, 4))"
    ),
    (
        "numpy-m6-l4", "numpy-module-6", "Feature Normalization (Min-Max Scaling) from Scratch",
        "Rescaling features into [0, 1] bounds to prevent large features from dominating models",
        4, 14, "Beginner",
        "Converting Different Currency Scales to Percentages",
        "Comparing a salary of $80,000 to an age of 25 is difficult because the salary number is 3,200x bigger. Min-Max scaling converts both to a [0, 1] scale where 0 is the minimum and 1 is the maximum.",
        "Min-Max Normalization: x_norm = (x - x_min) / (x_max - x_min) maps values strictly into [0, 1].",
        "Large Features Dominating Distance Calculations in KNN & K-Means",
        "In KNN and Gradient Descent, an unscaled feature like 'Annual Income' ($100,000) completely drowns out 'Age' (30), distorting Euclidean distance. Normalization levels the playing field.",
        "import numpy as np\n# Student marks out of 100\nmarks = np.array([40.0, 60.0, 80.0, 100.0])\nx_min = np.min(marks)\nx_max = np.max(marks)\nnormalized = (marks - x_min) / (x_max - x_min)\nprint('Original marks:', marks)\nprint('Min-Max normalized [0, 1]:', normalized)",
        "Image Pixel Value Normalization", "Dividing 8-bit image RGB values by 255.0 to map them into the [0.0, 1.0] range for neural networks.",
        "What happens if an unseen test sample has a value larger than x_max during Min-Max scaling?", "Its normalized score will exceed 1.0, which is why clipping or robust scaling is sometimes needed.",
        "Normalize the array [10, 20, 30, 40] into [0, 1] range.",
        "import numpy as np\na = np.array([10.0, 20.0, 30.0, 40.0])\nprint((a - a.min()) / (a.max() - a.min()))"
    ),
    (
        "numpy-m6-l5", "numpy-module-6", "Feature Standardization (Z-Score) & Training-Set Parameter Fitting",
        "Transforming features to zero mean and unit variance while preventing data leakage",
        5, 14, "Intermediate",
        "Curving Student Exam Marks to a Standard Grading Scale",
        "If an exam was notoriously difficult (mean = 40%), a student with 60% performed remarkably well (+2 standard deviations above the mean). Z-score standardization transforms features to mean = 0 and std = 1.",
        "Standardization: z = (x - mu) / sigma centers the distribution at 0 with unit variance.",
        "Data Leakage from Fitting Parameters on the Entire Dataset",
        "CRITICAL ML RULE: You must compute mu_train and sigma_train strictly on the training set, then apply those same parameters to the test set. Computing statistics on the entire dataset leaks test distribution info.",
        "import numpy as np\n# Train-test split simulation\ntrain_X = np.array([10.0, 20.0, 30.0, 40.0])\ntest_X = np.array([15.0, 35.0])\n# Learn parameters from TRAIN ONLY\nmu = np.mean(train_X)\nsigma = np.std(train_X)\nscaled_train = (train_X - mu) / sigma\nscaled_test = (test_X - mu) / sigma  # Use TRAIN mu and sigma!\nprint('Learned mean:', mu, 'std:', round(sigma, 2))\nprint('Standardized train (mean ~0, std ~1):', np.round(scaled_train, 2))\nprint('Standardized test (leakage-free):', np.round(scaled_test, 2))",
        "Preprocessing for Support Vector Machines (SVM)", "Standardizing input features so margin hyperplanes are not biased toward wide-scale variables.",
        "Why must standardization parameters (mu, sigma) be learned from the training data only?", "Learning them from the full dataset introduces data leakage, giving the model unrealistic knowledge of the test set distribution.",
        "Standardize [10, 20, 30] using its mean and standard deviation.",
        "import numpy as np\na = np.array([10.0, 20.0, 30.0])\nprint(np.round((a - a.mean()) / a.std(), 2))"
    ),
    (
        "numpy-m6-l6", "numpy-module-6", "Calculating Distances Between Observations (Euclidean, Manhattan)",
        "Computing pairwise vector distance metrics and spatial distance matrices",
        6, 14, "Intermediate",
        "As the Crow Flies vs Walking City Blocks in Manhattan",
        "Euclidean distance is the straight-line distance a bird flies across a city: sqrt(dx^2 + dy^2). Manhattan distance is the walking distance a pedestrian takes along city street grids: |dx| + |dy|.",
        "Euclidean distance is the L2 norm; Manhattan distance is the L1 norm.",
        "Slow Python Loops for Pairwise Distance Matrices",
        "Writing nested loops for all N x N point pairs takes minutes. Vectorized broadcasting computes all N^2 pairwise distances in a single line.",
        "import numpy as np\np1 = np.array([1.0, 2.0])\np2 = np.array([4.0, 6.0])\neuclidean = np.linalg.norm(p1 - p2)\nmanhattan = np.sum(np.abs(p1 - p2))\nprint('Point 1:', p1)\nprint('Point 2:', p2)\nprint('Euclidean distance (L2):', euclidean)\nprint('Manhattan distance (L1):', manhattan)",
        "K-Nearest Neighbors Classification", "Finding the 5 closest customer profiles in feature space based on Euclidean distance.",
        "Which NumPy function computes the Euclidean norm (L2 distance) directly?", "np.linalg.norm(a - b).",
        "Calculate the Euclidean distance between points [0, 0] and [3, 4].",
        "import numpy as np\nprint(np.linalg.norm(np.array([3, 4]) - np.array([0, 0])))"
    ),
    (
        "numpy-m6-l7", "numpy-module-6", "Feature Transformations (Polynomials, Log Scales)",
        "Engineering non-linear features and stabilizing heteroscedastic feature variance",
        7, 14, "Intermediate",
        "Squaring Ingredients in a Chemical Reaction",
        "Sometimes reaction rate does not increase linearly with temperature; it increases with the square of temperature (Temp^2). Adding polynomial features lets linear models learn curved relationships.",
        "Transforming features (log, sqrt, polynomial) allows linear models to capture non-linear dynamics.",
        "Skewed Right-Tailed Feature Distributions",
        "Financial features like 'Annual Income' or 'House Price' have extreme right tails. Applying np.log1p() compresses the tail, making the distribution bell-shaped and easier for models to learn.",
        "import numpy as np\nx = np.array([1, 2, 3, 4])\n# Polynomial features: [1, x, x^2]\npoly = np.column_stack([np.ones_like(x), x, x ** 2])\nprint('Original feature x:', x)\nprint('Polynomial feature matrix [1, x, x^2]:\\n', poly)\n# Log transformation on skewed incomes\nincomes = np.array([25000, 45000, 120000, 1500000])\nprint('Log1p transformed incomes:', np.round(np.log1p(incomes), 2))",
        "Polynomial Regression Modeling", "Fitting quadratic and cubic trajectory curves for rocket launch simulations.",
        "Why is np.log1p(x) preferred over np.log(x) when features contain zeros?", "np.log1p(x) computes log(1 + x), which safely evaluates to 0 when x = 0 instead of returning -inf.",
        "Create a polynomial feature matrix [x, x^2] for x = np.array([2, 3, 4]).",
        "import numpy as np\nx = np.array([2, 3, 4])\nprint(np.column_stack([x, x ** 2]))"
    ),
    (
        "numpy-m6-l8", "numpy-module-6", "Preparing Numerical Feature Arrays (X) and Targets (y) for ML",
        "Structuring 2D input matrices, 1D target vectors, and type specifications for Scikit-learn",
        8, 14, "Beginner",
        "Formatting a Formal Loan Application Ledger",
        "In a loan underwriting office, the applicant details (Age, Income, Credit Score) go into a structured table X of shape (N rows, D features). The loan decision (Default or Paid) goes into a separate ledger y of shape (N rows).",
        "In machine learning convention: X is a 2D matrix (N samples, D features); y is a 1D vector (N samples).",
        "Passing 1D Arrays as Feature Matrices into Scikit-learn",
        "Passing a 1D array of shape (N,) as feature matrix X causes Scikit-learn to raise 'ValueError: Expected 2D array, got 1D array instead'. Use X.reshape(-1, 1) to make it 2D.",
        "import numpy as np\n# 4 samples, 2 features (Age, Income)\nX = np.array([\n    [25, 45000],\n    [32, 65000],\n    [47, 85000],\n    [51, 92000]\n], dtype=np.float64)\n# Target label: 1 (Approved), 0 (Denied)\ny = np.array([1, 1, 0, 1], dtype=np.int32)\nprint('Feature Matrix X shape (N, D):', X.shape)\nprint('Target Vector y shape (N,):', y.shape)",
        "Supervised ML Training Pipeline", "Feeding cleanly formatted feature matrix X and target vector y into Scikit-learn LogisticRegression.",
        "What shape must a single feature have when passed to Scikit-learn's fit() method?", "Shape (N, 1), a 2D matrix with 1 column.",
        "Convert a 1D array of 3 numbers into a 2D feature matrix X of shape (3, 1).",
        "import numpy as np\nx = np.array([10, 20, 30])\nprint(x.reshape(-1, 1).shape)"
    ),
    (
        "numpy-m6-l9", "numpy-module-6", "Understanding the Relationship Between NumPy and Pandas",
        "Interoperability, zero-copy buffer sharing, and extracting ndarrays with .to_numpy()",
        9, 12, "Beginner",
        "The Engine vs The Dashboard of a Modern Car",
        "NumPy is the high-horsepower engine block under the hood doing heavy piston work. Pandas is the dashboard, steering wheel, and GPS giving you labeled column gauges and human-friendly controls.",
        "Pandas DataFrames wrap NumPy 2D array buffers with labeled row indexes and column headers.",
        "Using Deprecated .values Instead of .to_numpy()",
        "In modern Pandas, df.values has inconsistent behavior with custom extension dtypes. The recommended, modern method is df.to_numpy() or series.to_numpy().",
        "import numpy as np\n# Simulating extracting NumPy buffer from structured records\nstudent_records = {'Alice': [85, 90], 'Bob': [78, 82]}\nnames = list(student_records.keys())\n# Extract raw NumPy matrix\nraw_matrix = np.array(list(student_records.values()))\nprint('Extracted raw NumPy matrix:\\n', raw_matrix)\nprint('Array type:', type(raw_matrix), 'shape:', raw_matrix.shape)",
        "Bridging Data Wrangling to ML Training", "Extracting raw float64 arrays from cleaned Pandas DataFrames to pass to PyTorch or Scikit-learn.",
        "What is the modern, recommended Pandas method for extracting a NumPy ndarray?", ".to_numpy().",
        "Convert a list of lists [[1, 2], [3, 4]] into a NumPy array.",
        "import numpy as np\nprint(np.array([[1, 2], [3, 4]]))"
    ),
    (
        "numpy-m6-l10", "numpy-module-6", "Common NumPy Operations Used Inside Scikit-Learn",
        "Argmax predictions, softmax probability calculation, and mini-batch slicing",
        10, 14, "Advanced",
        "The Inner Gears Inside a Swiss Watch",
        "When you look at a Swiss watch, you see beautiful ticking hands (Scikit-learn model.predict()). Inside, dozens of tiny brass gears (NumPy dot products, argmax, and broadcasting) spin in unison to drive the mechanism.",
        "Under the hood, all Scikit-learn estimators compile down to pure NumPy array vector operations.",
        "Numerically Unstable Softmax Computation",
        "Computing exp(logits) directly on large numbers (like 1000) causes floating-point overflow to inf. Stable softmax subtracts np.max(logits) before computing exp().",
        "import numpy as np\n# Numerically stable Softmax calculation from scratch\nlogits = np.array([2.0, 1.0, 0.1])\nshifted_logits = logits - np.max(logits)  # Stability trick\nexp_scores = np.exp(shifted_logits)\nprobabilities = exp_scores / np.sum(exp_scores)\npredicted_class = np.argmax(probabilities)\nprint('Logits:', logits)\nprint('Predicted probabilities:', np.round(probabilities, 3))\nprint('Argmax predicted class index:', predicted_class)",
        "Classification Prediction Generation", "Converting raw model logit scores into calibrated probability distributions.",
        "Why is subtracting np.max(logits) necessary when computing softmax?", "It prevents exp() from overflowing into 'inf' when logits contain large positive numbers.",
        "Compute the argmax of probabilities [0.1, 0.7, 0.2].",
        "import numpy as np\nprint(np.argmax([0.1, 0.7, 0.2]))"
    )
]

generate_raw_module(
    "numpy-module-6", 6,
    "NumPy for Data Science and Machine Learning",
    "I/O, Synthetic Generation, Scaling, Metrics & Scikit-Learn Integration",
    "Bridge numerical arrays directly into machine learning workflows. Master binary I/O, Min-Max scaling, Z-score standardization, distance metrics, and Scikit-Learn array conventions.",
    "NumPy for ML", 14, m6_raw,
    "numpy-fp-student-analytics", "Capstone Project: Student Performance Analytics"
)

# ==============================================================================
# NUMPY FINAL PROJECT: Student Performance Analytics (1 Capstone Lesson)
# ==============================================================================
fp_code = """import numpy as np

# 10 students across 5 subjects: [Math, Physics, Chemistry, English, CS]
marks = np.array([
    [85, 90, 78, 88, 92],  # Student 0
    [56, 62, 60, 70, 65],  # Student 1
    [92, 95, 89, 90, 98],  # Student 2
    [45, 50, 48, 55, 60],  # Student 3
    [78, 82, 80, 85, 88],  # Student 4
    [65, 70, 72, 68, 75],  # Student 5
    [88, 85, 84, 82, 90],  # Student 6
    [32, 40, 35, 45, 50],  # Student 7
    [95, 98, 94, 92, 96],  # Student 8
    [70, 75, 72, 78, 80],  # Student 9
])

# 1. Subject-wise and student-wise averages
subject_means = np.mean(marks, axis=0)
student_means = np.mean(marks, axis=1)

# 2. Highest and lowest overall scores
max_score = np.max(marks)
min_score = np.min(marks)

# 3. Overall median and standard deviation
overall_median = np.median(marks)
overall_std = np.std(marks)

# 4. Identify top-performing students (Mean > 85)
top_students_mask = student_means > 85
top_student_indices = np.where(top_students_mask)[0]

# 5. Normalization using Min-Max scaling
norm_marks = (marks - min_score) / (max_score - min_score)

# 6. Statistical Outlier Detection using IQR rule on student averages
q25, q75 = np.percentile(student_means, [25, 75])
iqr = q75 - q25
lower_bound = q25 - 1.5 * iqr
upper_bound = q75 + 1.5 * iqr
outlier_students = np.where((student_means < lower_bound) | (student_means > upper_bound))[0]

print("=== STUDENT PERFORMANCE ANALYTICS SUMMARY ===")
print("Subject Means [Math, Phys, Chem, Eng, CS]:", np.round(subject_means, 1))
print("Student Overall Means:", np.round(student_means, 1))
print(f"Global Extremes: Min={min_score}, Max={max_score}")
print(f"Global Median={overall_median:.1f}, Std Dev={overall_std:.1f}")
print("Top-Performing Student IDs (Mean > 85):", top_student_indices)
print(f"IQR Outlier Detection Bounds: [{lower_bound:.1f}, {upper_bound:.1f}]")
print("Detected Outlier Student IDs:", outlier_students)
print("Normalized Scores Sample (Student 0):", np.round(norm_marks[0], 2))
"""

fp_lesson = create_lesson(
    id="numpy-fp-student-analytics",
    moduleId="numpy-final-project",
    title="Capstone Project: Student Performance Analytics with NumPy",
    subtitle="End-to-End Real-World Applied Numerical Analytics Project using Pure NumPy",
    order=1,
    readTime=25,
    difficulty="Advanced",
    objectives=[
        "Load and analyze a multi-student, multi-subject academic marks matrix.",
        "Calculate multi-axis statistics including student GPAs and subject benchmarks.",
        "Filter and rank students using boolean indexing and condition masking.",
        "Implement Min-Max normalization and statistical IQR anomaly detection.",
        "Generate a structured, professional executive performance summary."
    ],
    prerequisites=["NumPy Foundations", "Indexing & Slicing", "Array Operations", "Statistical Functions"],
    analogy={
        "title": "A School District's Central Grading Supercomputer",
        "text": "Every semester, a school district collects hundreds of thousands of test marks across dozens of schools. Rather than hiring 500 clerks to calculate averages on paper, the district feeds the entire matrix into a central computing engine that calculates student GPAs, finds top scholars, normalizes grades for university entrance, and flags struggling students who need tutoring—all in less than 1 second.",
        "metaphor": "The capstone project transforms raw tabular exam data into actionable institutional insights using pure vectorized NumPy."
    },
    problemSolved={
        "title": "Holistic Multi-Dimensional Performance Analysis",
        "description": "Analyzing student performance requires combining multi-axis aggregations, conditional filtering, normalization, and statistical outlier checks into a coherent data science pipeline.",
        "keyPoints": [
            "Axis 0 gives subject benchmarks; Axis 1 gives student GPAs.",
            "Boolean indexing identifies students qualifying for honors.",
            "IQR statistical bounds objectively identify anomalies requiring attention."
        ]
    },
    intuition={
        "overview": "The capstone pipeline executes in 6 systematic stages: Load -> Aggregate -> Filter -> Rank -> Normalize -> Detect Outliers.",
        "steps": [
            {"step": 1, "title": "Matrix Ingestion", "description": "10x5 exam marks matrix loaded into contiguous RAM."},
            {"step": 2, "title": "Multi-Axis Reductions", "description": "Axis 0 collapses subjects; Axis 1 collapses students."},
            {"step": 3, "title": "Statistical Thresholding", "description": "Computes quartiles and flags outliers using the 1.5x IQR rule."},
            {"step": 4, "title": "Feature Normalization", "description": "Min-Max scales scores into [0.0, 1.0] for model readiness."}
        ]
    },
    mathematics={
        "overview": "Statistical foundations for capstone metrics.",
        "foundations": [
            {"name": "Student Mean", "latex": "\\bar{x}_{i} = \\frac{1}{M} \\sum_{j=1}^{M} X_{i,j}", "explanation": "Row-wise mean across all M subjects."},
            {"name": "Interquartile Range", "latex": "\\text{IQR} = Q_3 - Q_1 \\quad \\text{Outliers} \\notin [Q_1 - 1.5\\text{IQR}, Q_3 + 1.5\\text{IQR}]", "explanation": "Tukey outlier detection bounds."}
        ]
    },
    derivation={
        "title": "Complexity Analysis of Capstone Pipeline",
        "objective": "Verify that all operations run in O(N x M) linear time.",
        "steps": [
            {"step": 1, "label": "Reductions", "latex": "O(NM) \\text{ for mean and std calculations}", "explanation": "Single pass over the 2D array buffer."},
            {"step": 2, "label": "Percentiles", "latex": "O(N \\log N) \\text{ for student GPA quartiles}", "explanation": "Sorting 10 student averages takes negligible time."},
            {"step": 3, "label": "Normalization", "latex": "O(NM) \\text{ element-wise broadcasting}", "explanation": "Broadcasting scales all cells in parallel."}
        ]
    },
    variables=[
        {"symbol": "X", "name": "Marks Matrix", "description": "Student marks of shape (10, 5)", "dimensions": "10 x 5"},
        {"symbol": "Q_1, Q_3", "name": "Quartiles", "description": "25th and 75th percentiles of GPA distribution", "dimensions": "Scalars"}
    ],
    numericalExample={
        "scenario": "Analyzing 10 students across Math, Physics, Chem, English, and CS.",
        "dataset": [
            {"StudentID": "0", "Math": 85, "Physics": 90, "GPA": 86.6},
            {"StudentID": "2", "Math": 92, "Physics": 95, "GPA": 92.8},
            {"StudentID": "7", "Math": 32, "Physics": 40, "GPA": 40.4}
        ],
        "calculations": [
            {"step": "Class Highest Score", "math": "np.max(marks)", "result": "98 (Student 2 / Student 8)"},
            {"step": "Outlier Detection", "math": "Student 7 GPA (40.4) < Lower Bound (44.6)", "result": "Student 7 flagged as academic intervention outlier"}
        ],
        "finalConclusion": "Student 7 is objectively identified as needing immediate academic tutoring support."
    },
    visualExplanation={
        "title": "Visual Dashboard: Student Performance Pipeline",
        "description": "Visualizing the flow from raw 10x5 score matrix to executive summary report.",
        "features": [
            "Axis 0 collapses rows to reveal Subject Means.",
            "Axis 1 collapses columns to reveal Student GPAs.",
            "IQR box-plot bands isolate academic intervention outliers."
        ]
    },
    scratchCode={"title": "Interactive Capstone Prototype", "code": fp_code, "explanation": "Complete runnable capstone script."},
    sklearnCode={"title": "Preprocessing Integration", "code": fp_code, "explanation": "Prepares normalized features ready for clustering or classification."},
    runnableCode_snippet=fp_code,
    lineByLineExplanation=[
        {"lines": "3-15", "codeSnippet": "marks = np.array([...])", "explanation": "Defines the 10x5 marks matrix for 10 students across 5 subjects."},
        {"lines": "17-18", "codeSnippet": "subject_means = np.mean(marks, axis=0); student_means = np.mean(marks, axis=1)", "explanation": "Computes subject benchmarks along axis 0 and student GPAs along axis 1."},
        {"lines": "27-28", "codeSnippet": "top_students_mask = student_means > 85; top_student_indices = np.where(top_students_mask)[0]", "explanation": "Uses boolean indexing to filter students with GPA > 85."},
        {"lines": "33-37", "codeSnippet": "q25, q75 = np.percentile(student_means, [25, 75]); iqr = q75 - q25; outlier_students = ...", "explanation": "Calculates statistical IQR bounds and flags struggling outliers."}
    ],
    hyperparameters=[{"name": "iqr_multiplier", "defaultVal": "1.5", "range": "1.0 to 3.0", "effect": "Strictness of outlier boundary", "recommendation": "Use 1.5 for standard Tukey outliers, 3.0 for extreme outliers."}],
    assumptions=[{"assumption": "Score scale uniformity", "whyItMatters": "All subjects are graded out of 100", "howToVerify": "Check min >= 0 and max <= 100"}],
    commonMistakes=[{"mistake": "Computing subject average using axis=1", "solution": "Use axis=0 for subject averages (columns)", "whyWrong": "axis=1 computes student GPA, not subject benchmark", "howToFix": "Verify output length matches number of subjects"}],
    realWorldUseCases=[
        {"industry": "Higher Education", "application": "Dean's Honor Roll Selection", "benefit": "Automated merit scholarship and honors ranking."},
        {"industry": "EdTech", "application": "Personalized Learning Pathways", "benefit": "Detecting struggling students in specific subjects for automated tutoring."}
    ],
    practiceQuestions=[
        {"id": "pq1", "question": "Why did we use axis=0 to compute subject averages?", "hint": "Think about which direction subjects are arranged.", "answer": "Subjects are columns; axis=0 collapses down the rows, yielding one average per subject column."},
        {"id": "pq2", "question": "How does the Tukey IQR rule define an outlier?", "hint": "Formulas for lower and upper fences.", "answer": "An observation is an outlier if it falls below Q1 - 1.5*IQR or above Q3 + 1.5*IQR."},
        {"id": "pq3", "question": "Why is score normalization useful before applying machine learning?", "hint": "Think about distance metrics.", "answer": "It rescales all features into [0, 1] so no single test scale dominates Euclidean distance or gradient descent."}
    ],
    quiz=[
        {
            "id": "q1",
            "question": "In a 10x5 student marks matrix, what is the shape of np.mean(marks, axis=1)?",
            "options": ["(10,)", "(5,)", "(10, 5)", "(1,)"],
            "correctIndex": 0,
            "explanation": "axis=1 collapses the 5 subject columns, producing one average for each of the 10 students."
        },
        {
            "id": "q2",
            "question": "Which student was flagged as an academic outlier in the project analysis?",
            "options": ["Student 7", "Student 2", "Student 0", "Student 9"],
            "correctIndex": 0,
            "explanation": "Student 7 had an average score of 40.4%, which fell below the lower IQR bound of 44.6%."
        },
        {
            "id": "q3",
            "question": "What does Min-Max normalization do to an array?",
            "options": [
                "Scales all values strictly between 0.0 and 1.0.",
                "Transforms all values into negative numbers.",
                "Deletes all values below the median.",
                "Replaces all odd numbers with zero."
            ],
            "correctIndex": 0,
            "explanation": "Min-Max normalization subtracts the minimum and divides by the range, mapping values into [0.0, 1.0]."
        }
    ],
    independentExercise={
        "title": "Independent Challenge: Class Rank and Honors Certificate Generator",
        "problem": "Using the capstone marks matrix, write code to: (1) Rank all 10 students from 1st place to 10th place based on GPA using np.argsort(), (2) Count how many students scored >= 90 in Computer Science (Column 4), and (3) Print the student ID of the overall valedictorian (1st rank).",
        "difficulty": "Challenge",
        "hints": ["Use np.argsort(student_means)[::-1] for descending ranks", "Use marks[:, 4] >= 90 for CS scores"],
        "starterCode": "import numpy as np\n# Use marks array from capstone\n# Your solution here:\n",
        "solution": "import numpy as np\n# 1. Rank students descending\nstudent_means = np.mean(marks, axis=1)\nranked_indices = np.argsort(student_means)[::-1]\nprint('Class Ranks (1st to 10th):', ranked_indices)\n# 2. Count CS scores >= 90\ncs_honors = np.sum(marks[:, 4] >= 90)\nprint('Students with CS >= 90:', cs_honors)\n# 3. Valedictorian\nvaledictorian = ranked_indices[0]\nprint('Valedictorian Student ID:', valedictorian, 'with GPA:', round(student_means[valedictorian], 2))"
    },
    summary={
        "keyTakeaways": [
            "Completed the entire end-to-end NumPy Capstone Project successfully!",
            "Mastered multi-axis aggregations, boolean masking, normalization, and IQR outlier detection.",
            "Prepared to transition directly into Pandas Mastery for structured tabular data engineering."
        ],
        "nextLessonId": "pandas-m1-l1",
        "nextLessonTitle": "What Pandas Is and Why It Is Useful",
        "nextLessonModuleId": "pandas-module-1"
    }
)

fp_data = {
    "id": "numpy-final-project",
    "number": 7,
    "title": "NumPy Final Project",
    "subtitle": "Student Performance Analytics Capstone",
    "description": "Put all your NumPy skills into practice. Build a complete student performance analytics engine with multi-axis statistics, ranking, normalization, and outlier detection.",
    "icon": "Award",
    "badge": "NumPy Capstone",
    "estimatedHours": 8,
    "topicsCount": 1,
    "lessons": [
        {
            "id": fp_lesson["id"],
            "moduleId": fp_lesson["moduleId"],
            "title": fp_lesson["title"],
            "description": fp_lesson["subtitle"],
            "order": 1,
            "readTimeMinutes": 25,
            "visualizerType": "numpy-interactive",
            "difficulty": "Advanced"
        }
    ]
}

write_module_ts(os.path.join(OUTPUT_DIR, "numpy-project.ts"), "numpyProject", fp_data, {fp_lesson["id"]: fp_lesson})
print("NumPy Final Project generated successfully!")

# Write curriculum.ts for numpy
curriculum_content = """import { ModuleData, LessonContent } from '@/lib/types';
import { numpyModule1Data, numpyModule1Lessons } from './numpy-module-1';
import { numpyModule2Data, numpyModule2Lessons } from './numpy-module-2';
import { numpyModule3Data, numpyModule3Lessons } from './numpy-module-3';
import { numpyModule4Data, numpyModule4Lessons } from './numpy-module-4';
import { numpyModule5Data, numpyModule5Lessons } from './numpy-module-5';
import { numpyModule6Data, numpyModule6Lessons } from './numpy-module-6';
import { numpyProjectData, numpyProjectLessons } from './numpy-project';

export const MODULES_CATALOG_NUMPY: ModuleData[] = [
  numpyModule1Data,
  numpyModule2Data,
  numpyModule3Data,
  numpyModule4Data,
  numpyModule5Data,
  numpyModule6Data,
  numpyProjectData,
];

export const NUMPY_FULL_LESSONS: Record<string, LessonContent> = {
  ...numpyModule1Lessons,
  ...numpyModule2Lessons,
  ...numpyModule3Lessons,
  ...numpyModule4Lessons,
  ...numpyModule5Lessons,
  ...numpyModule6Lessons,
  ...numpyProjectLessons,
};

export function getNumPyModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_NUMPY.find((m) => m.id === moduleId);
}

export function getNumPyLesson(lessonId: string): LessonContent | undefined {
  return NUMPY_FULL_LESSONS[lessonId];
}
"""

with open(os.path.join(OUTPUT_DIR, "curriculum.ts"), "w", encoding="utf-8") as f:
    f.write(curriculum_content)
print("Wrote src/data/numpy/curriculum.ts successfully!")

