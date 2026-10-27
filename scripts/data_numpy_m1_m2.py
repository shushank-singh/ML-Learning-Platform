import os
import sys
from numpy_helpers import create_lesson, write_module_ts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "numpy")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ------------------------------------------------------------------------------
# MODULE 1: NumPy Foundations (12 topics)
# ------------------------------------------------------------------------------
m1_topics = [
    (
        "numpy-m1-l1", "numpy-module-1", "What NumPy Is & Why It Matters in Data Science",
        "The high-performance foundational bedrock of modern Python scientific computing",
        1, 12, "Beginner",
        "Loose Shopping Bags vs. Standardized Cargo Containers",
        "Python lists are loose grab bags where every item has pointer overhead. NumPy arrays are rigid, high-density shipping containers packed with uniform data in contiguous memory.",
        "Python lists = loose items in paper bags. NumPy arrays = standardized cargo containers stacked on an industrial freighter.",
        "The Python Speed Bottleneck in Numerical Computing",
        "Standard Python loops must check the type and address of every element. NumPy bypasses the interpreter by holding contiguous memory and using C-level loops.",
        "import numpy as np\narr = np.array([10, 20, 30, 40, 50])\nprint('Array:', arr)\nprint('Data type:', arr.dtype)\nprint('Shape:', arr.shape)\nprint('Size:', arr.size)",
        "Student Marks Array", "Storing test marks [75, 88, 92, 64, 80] for 5 students.",
        "What makes a NumPy array faster than a Python list?", "Contiguous memory layout and uniform C-level data types eliminate per-element type checking.",
        "Create an array of student marks [70, 85, 90, 65, 80] and print its shape and dtype.",
        "import numpy as np\nmarks = np.array([70, 85, 90, 65, 80])\nprint(marks)\nprint(marks.shape, marks.dtype)"
    ),
    (
        "numpy-m1-l2", "numpy-module-1", "Python Lists vs NumPy Arrays (Performance, Memory & Homogeneity)",
        "Why homogeneous contiguous arrays outperform general-purpose Python list pointers",
        2, 14, "Beginner",
        "Individual Gift Boxes vs. An Ice Cube Tray",
        "A Python list is a collection of pointers to separate heap objects, like wrapped gift boxes scattered around a room. A NumPy array is an ice cube tray where every slot is identical, aligned, and directly adjacent in RAM.",
        "Python list: array of 64-bit pointers to PyObjects. NumPy array: single contiguous C-buffer.",
        "Memory Fragmentation & Cache Inefficiency",
        "Python lists suffer from pointer chasing and cache misses because integers are scattered randomly across heap memory. NumPy arrays enable CPU prefetching.",
        "import numpy as np\nimport sys\n\npy_list = list(range(1000))\nnp_arr = np.arange(1000, dtype=np.int64)\nprint('List pointer overhead approx:', sys.getsizeof(py_list), 'bytes')\nprint('NumPy buffer size:', np_arr.nbytes, 'bytes')\nprint('Elements match count:', len(py_list) == len(np_arr))",
        "Memory Footprint of 1000 Items", "Comparing 1000 integer pointers vs 1000 contiguous 64-bit integers.",
        "Why can't you put strings and integers in the same NumPy numerical array without upcasting?", "NumPy requires identical element byte-widths. Mixed types force upcasting to strings (Unicode), losing numerical functionality.",
        "Compare the size of a Python float list [1.5, 2.5, 3.5] vs a NumPy float64 array.",
        "import numpy as np\nimport sys\npl = [1.5, 2.5, 3.5]\nna = np.array(pl, dtype=np.float64)\nprint('List size:', sys.getsizeof(pl), 'bytes')\nprint('NumPy nbytes:', na.nbytes, 'bytes')"
    ),
    (
        "numpy-m1-l3", "numpy-module-1", "Installing, Importing & Environment Setup",
        "Setting up NumPy correctly and understanding the global ecosystem conventions",
        3, 10, "Beginner",
        "Universal Power Sockets and Standards",
        "Just as electrical grids standardize on plug voltages, the entire Python scientific community standardizes on 'import numpy as np'. Using this convention ensures every library and engineer speaks the exact same dialect.",
        "'import numpy as np' is the universal convention followed by Scikit-learn, PyTorch, Pandas, and SciPy.",
        "Namespace Collisions and Dependency Hell",
        "Improper imports like 'from numpy import *' pollute global namespaces and cause collisions with Python's built-in sum, min, and max functions. Aliasing with 'np' isolates the namespace cleanly.",
        "import numpy as np\nprint('NumPy version:', np.__version__)\nprint('Config info available:', hasattr(np, 'show_config'))\nprint('Standard alias verified: np is numpy')",
        "Verifying System Installation", "Checking NumPy runtime capabilities and version strings.",
        "Why should you never write 'from numpy import *'?", "It overwrites built-in functions like sum(), min(), max(), and abs() with array equivalents, causing unexpected errors.",
        "Write a script that prints the NumPy version and creates a small array of 3 numbers.",
        "import numpy as np\nprint('Version:', np.__version__)\nprint('Test array:', np.array([1, 2, 3]))"
    ),
    (
        "numpy-m1-l4", "numpy-module-1", "Creating Arrays with np.array() & Nested Sequences",
        "Transforming Python lists, tuples, and nested matrices into typed ndarrays",
        4, 12, "Beginner",
        "Molding Clay into Precision Bricks",
        "Passing flexible Python lists into np.array() is like pouring loose clay into a steel brick mold. The flexible, uneven list is compacted into a rigid, rectangular array with strict dimensions.",
        "np.array() is the primary factory constructor converting nested iterables into ndarrays.",
        "Inconsistent Nested Sequence Shapes",
        "Ragged or jagged lists (e.g. rows of unequal length) cannot form rectangular matrices. np.array() validates structure and creates rectangular grids.",
        "import numpy as np\nvec = np.array([1, 2, 3])\nmat = np.array([[10, 20, 30], [40, 50, 60]])\nprint('1D Vector:', vec, 'ndim:', vec.ndim)\nprint('2D Matrix:\\n', mat, 'ndim:', mat.ndim)\nprint('Matrix shape:', mat.shape)",
        "Converting Restaurant Order Counts", "3 tables ordering 2 dishes each formatted into a 2D matrix.",
        "What happens if you pass a ragged list like [[1, 2], [3, 4, 5]] to np.array() in modern NumPy?", "Modern NumPy raises a ValueError or creates an object array because non-rectangular inputs cannot form contiguous numeric buffers.",
        "Create a 2x3 matrix of employee salaries in thousands: [[50, 55, 60], [65, 70, 75]].",
        "import numpy as np\nsalaries = np.array([[50, 55, 60], [65, 70, 75]])\nprint(salaries)\nprint('Shape:', salaries.shape)"
    ),
    (
        "numpy-m1-l5", "numpy-module-1", "Creating Arrays with zeros(), ones(), and full()",
        "Pre-allocating memory buffers with constant default values for maximum efficiency",
        5, 12, "Beginner",
        "Blank Sheets of Graph Paper & Form Templates",
        "When an accountant prepares ledgers, they don't buy sheets one by one. They buy pre-printed books of 0-filled ledger lines. zeros() and ones() pre-allocate clean canvas memory so you never resize arrays dynamically.",
        "Pre-allocation avoids expensive repeated memory reallocation during iterations.",
        "The Performance Cost of Dynamic Array Resizing",
        "Appending elements to arrays inside loops forces repeated memory reallocations and copies. Pre-allocating with zeros() or full() reserves the entire buffer upfront.",
        "import numpy as np\nz = np.zeros((2, 4))\no = np.ones((3, 2), dtype=np.int32)\nf = np.full((2, 3), fill_value=99)\nprint('Zeros:\\n', z)\nprint('Ones:\\n', o)\nprint('Full (99):\\n', f)",
        "Pre-allocating a Sensor Grid", "Creating a 2x4 grid to collect temperature readings initialized to zero.",
        "Why is pre-allocating with np.zeros() faster than appending elements in a loop?", "Appending repeatedly reallocates and copies arrays in O(N^2) total time, whereas pre-allocation allocates memory once in O(N).",
        "Create a 3x3 matrix pre-filled with the number 7 using np.full().",
        "import numpy as np\nsevens = np.full((3, 3), 7)\nprint(sevens)"
    ),
    (
        "numpy-m1-l6", "numpy-module-1", "Step-based Sequences with arange() and linspace()",
        "Generating arithmetic progressions and evenly spaced coordinate samples",
        6, 12, "Beginner",
        "A Meter Stick with Centimeter Marks vs. Dividing a Ribbon Equally",
        "arange() is like using a ruler to mark ticks every 5 cm until the end (step size is fixed). linspace() is like cutting a ribbon into exactly 10 equal pieces (number of points is fixed, spacing is calculated).",
        "arange(start, stop, step) specifies step size; linspace(start, stop, num) specifies total point count.",
        "Floating-point Rounding Drift in Step Ranges",
        "Using floating-point steps in arange() can lead to rounding errors where the final element is unpredictably included or excluded. linspace() guarantees exact endpoint inclusion and stability.",
        "import numpy as np\nar = np.arange(0, 10, 2)\nls = np.linspace(0, 1, 5)\nprint('arange(0, 10, 2):', ar)\nprint('linspace(0, 1, 5):', ls)\nprint('Endpoint included in linspace:', ls[-1] == 1.0)",
        "Generating Time Timestamps", "Generating 5 sample timestamps between 0.0s and 1.0s for an audio sensor.",
        "When should you choose linspace() over arange()?", "Choose linspace() whenever working with floats or when you need a specific number of evenly spaced sample points including endpoints.",
        "Generate 7 evenly spaced numbers between 0 and 100 inclusive.",
        "import numpy as np\nvals = np.linspace(0, 100, 7)\nprint(vals)"
    ),
    (
        "numpy-m1-l7", "numpy-module-1", "Creating Identity and Diagonal Arrays (eye, identity, diag)",
        "Constructing identity matrices, diagonal weights, and orthogonal projection primitives",
        7, 12, "Intermediate",
        "The Number 1 in Matrix Multiplication & Balanced Scales",
        "In scalar math, multiplying by 1 changes nothing: 5 * 1 = 5. In matrix linear algebra, multiplying by the Identity matrix (I) changes nothing: A @ I = A. np.eye() builds this diagonal unity matrix.",
        "Identity matrices serve as neutral elements in matrix algebra; diagonal matrices represent feature weights.",
        "Inverting and Conditioning Feature Matrices",
        "Regularization algorithms (like Ridge Regression) add a scaled identity matrix (lambda * I) to prevent singular, non-invertible covariance matrices.",
        "import numpy as np\nI = np.eye(3)\nd = np.diag([10, 20, 30])\nprint('3x3 Identity:\\n', I)\nprint('Diagonal Matrix:\\n', d)\nprint('Extract diagonal:', np.diag(d))",
        "Feature Ridge Penalty", "Adding 0.1 to the diagonal of a 3x3 covariance matrix.",
        "What is the difference between np.eye() and np.identity()?", "np.identity() only creates square matrices, while np.eye() can create non-square (M x N) matrices and offset diagonals with parameter k.",
        "Create a 4x4 identity matrix and scale it by 0.5.",
        "import numpy as np\nscaled_I = np.eye(4) * 0.5\nprint(scaled_I)"
    ),
    (
        "numpy-m1-l8", "numpy-module-1", "Understanding 1D, 2D, and Multidimensional Arrays",
        "Visualizing vectors, matrices, tensors, and multi-axis data representations",
        8, 14, "Beginner",
        "A Single Street, A City Grid, and A Multistory Office Tower",
        "A 1D array is a single street with house numbers (index i). A 2D array is a city grid with avenues and streets (row i, col j). A 3D array is an office tower with floors, rows, and desks (channel k, row i, col j).",
        "1D = Vector, 2D = Matrix, 3D+ = Tensor (e.g. RGB images or video frames).",
        "Flattening High-Dimensional Reality",
        "Computer vision, NLP word embeddings, and multi-channel sensors require 3D, 4D, or 5D arrays. Understanding axes prevents catastrophic dimensional misinterpretations.",
        "import numpy as np\na1 = np.array([1, 2, 3])\na2 = np.array([[1, 2], [3, 4]])\na3 = np.zeros((2, 3, 4))\nprint('1D shape:', a1.shape, 'ndim:', a1.ndim)\nprint('2D shape:', a2.shape, 'ndim:', a2.ndim)\nprint('3D shape:', a3.shape, 'ndim:', a3.ndim)",
        "RGB Image Representation", "A batch of 2 RGB images, each 3 pixels high and 4 pixels wide.",
        "What does the first dimension usually represent in machine learning datasets?", "In Scikit-learn and deep learning, axis 0 represents the sample count (number of individual records or batch size).",
        "Create a 3D array of shape (2, 2, 2) containing all ones.",
        "import numpy as np\ntensor = np.ones((2, 2, 2))\nprint(tensor)\nprint('Shape:', tensor.shape)"
    ),
    (
        "numpy-m1-l9", "numpy-module-1", "Array Attributes: shape, ndim, size, and dtype",
        "Inspecting the fundamental physical metadata governing any ndarray object",
        9, 12, "Beginner",
        "A Passport for Data Buffers",
        "Just as a passport states your nationality, height, and age, an ndarray's attributes tell the CPU its shape (dimensions), ndim (number of axes), size (total elements), and dtype (byte format).",
        "Attributes describe the structure of the data buffer without touching or copying elements.",
        "Debugging Mismatched Dimensions in Linear Algebra",
        "90% of beginner machine learning bugs stem from shape mismatches (e.g. passing (N,) instead of (N, 1)). Inspecting attributes diagnoses errors instantly.",
        "import numpy as np\narr = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])\nprint('shape:', arr.shape)\nprint('ndim:', arr.ndim)\nprint('size:', arr.size)\nprint('dtype:', arr.dtype)\nprint('itemsize (bytes/item):', arr.itemsize)\nprint('nbytes (total bytes):', arr.nbytes)",
        "Inspecting a Housing Features Matrix", "A matrix of 2 houses with 3 features each (size, bedrooms, price).",
        "How is array.nbytes calculated?", "array.nbytes is exactly equal to array.size * array.itemsize.",
        "Print all 4 key attributes (shape, ndim, size, dtype) for an array of 6 integers.",
        "import numpy as np\na = np.array([10, 20, 30, 40, 50, 60])\nprint(f'shape={a.shape}, ndim={a.ndim}, size={a.size}, dtype={a.dtype}')"
    ),
    (
        "numpy-m1-l10", "numpy-module-1", "Safe Type Conversion with astype()",
        "Casting numeric types safely, optimizing memory, and avoiding truncation traps",
        10, 12, "Beginner",
        "Currency Exchange & Precision Scales",
        "Converting dollars to cents requires changing the unit scale. Converting float64 prices ($19.99) to int64 ($19) chops off the decimals. astype() explicitly controls this transformation.",
        "astype() creates a copy with the new data type, essential for memory tuning.",
        "Silent Truncation When Casting Floats to Integers",
        "Casting floating-point numbers to integers truncates toward zero (it does not round). 8.9 becomes 8, causing unintended loss of precision if done carelessly.",
        "import numpy as np\nfloats = np.array([1.2, 2.8, 3.5, 4.9])\nints = floats.astype(np.int32)\nprint('Original floats:', floats, floats.dtype)\nprint('Truncated ints:', ints, ints.dtype)\nprint('Correctly rounded ints:', np.round(floats).astype(np.int32))",
        "Converting Probability Scores to Binary Labels", "Converting [0.1, 0.8, 0.3, 0.9] > 0.5 into integer predictions.",
        "Does astype() modify the original array in place or return a new array?", "astype() always creates and returns a new copy of the array with the requested data type.",
        "Convert an array of string numbers ['10', '20', '30'] into float64 values.",
        "import numpy as np\nstr_arr = np.array(['10', '20', '30'])\nnum_arr = str_arr.astype(np.float64)\nprint(num_arr, num_arr.dtype)"
    ),
    (
        "numpy-m1-l11", "numpy-module-1", "Integer, Floating-Point, and Boolean Arrays",
        "Mastering bit-width representations: int32, int64, float32, float64, and bool",
        11, 12, "Intermediate",
        "Selecting the Right Size Shipping Box",
        "If you want to ship a single coin, using a giant wooden shipping crate wastes fuel and storage. Choosing int8 (-128 to 127) for small counters instead of int64 saves 87% of your RAM.",
        "Selecting appropriate bit-widths balances precision, memory, and GPU throughput.",
        "Integer Overflow and Precision Underflow",
        "Exceeding an integer type's bit width (e.g. 127 + 1 in int8) causes wraparound overflow to -128 without raising any Python error.",
        "import numpy as np\nbools = np.array([True, False, True])\nint8s = np.array([100, 120], dtype=np.int8)\nfloat32s = np.array([1.25, 3.75], dtype=np.float32)\nprint('Bool array:', bools, 'size in bytes:', bools.nbytes)\nprint('Int8 array:', int8s, 'size in bytes:', int8s.nbytes)\nprint('Float32 array:', float32s, 'size in bytes:', float32s.nbytes)",
        "Student Pass/Fail Boolean Mask", "Tracking which students passed an exam (> 50 marks).",
        "Why is float32 commonly preferred over float64 in Deep Learning?", "float32 halves memory bandwidth and allows modern GPUs to perform tensor arithmetic up to 2x-4x faster with no perceptible loss in model accuracy.",
        "Create an array of 5 booleans and calculate how many bytes it takes in memory.",
        "import numpy as np\nb = np.array([True, False, True, True, False])\nprint('Bytes used:', b.nbytes)"
    ),
    (
        "numpy-m1-l12", "numpy-module-1", "Memory Layout, Contiguity & Buffer Foundations",
        "Deciphering row-major (C-order) vs column-major (Fortran-order) and strides",
        12, 14, "Advanced",
        "Reading a Book Row-by-Row vs Reading Down Columns",
        "In English, we read books horizontally row by row (C-order / row-major). In Chinese calligraphy, text was historically read vertically top to bottom (Fortran-order / column-major). Contiguity dictates how 2D data is unrolled into 1D RAM.",
        "Strides define how many bytes the CPU must step in memory to reach the next element.",
        "Cache Thrashing from Column Iteration on Row-Major Arrays",
        "Looping down columns of a large C-contiguous matrix causes a CPU cache miss on every access because consecutive column elements are separated by an entire row in RAM.",
        "import numpy as np\na_c = np.ones((3, 3), order='C')\na_f = np.ones((3, 3), order='F')\nprint('C-order strides (bytes to jump row, col):', a_c.strides)\nprint('F-order strides (bytes to jump row, col):', a_f.strides)\nprint('C-contiguous flag:', a_c.flags['C_CONTIGUOUS'])\nprint('F-contiguous flag:', a_f.flags['F_CONTIGUOUS'])",
        "Matrix Transposition Memory Mapping", "Transposing an array modifies strides without moving any bytes in RAM.",
        "What are strides in a NumPy array?", "Strides is a tuple of integers specifying how many bytes must be jumped in memory to move 1 step along each axis.",
        "Inspect the strides of a 2x4 array of 64-bit floats (8 bytes each).",
        "import numpy as np\narr = np.zeros((2, 4), dtype=np.float64)\nprint('Strides:', arr.strides)  # Expect (32, 8)"
    )
]

def make_full_lesson(t, next_topic=None):
    (id, moduleId, title, subtitle, order, readTime, difficulty,
     analogy_title, analogy_text, analogy_metaphor,
     prob_title, prob_desc,
     code,
     scenario, scen_desc,
     pq_q, pq_a,
     ex_prob, ex_sol) = t

    nextId = next_topic[0] if next_topic else "numpy-m2-l1"
    nextTitle = next_topic[2] if next_topic else "Accessing Elements in One-Dimensional Arrays"
    nextModule = next_topic[1] if next_topic else "numpy-module-2"

    return create_lesson(
        id=id,
        moduleId=moduleId,
        title=title,
        subtitle=subtitle,
        order=order,
        readTime=readTime,
        difficulty=difficulty,
        objectives=[
            f"Understand the core mechanics of {title}.",
            "Master the underlying syntax and mathematical representation.",
            "Avoid common bugs, type traps, and memory overheads.",
            "Apply the technique to real-world data science problems."
        ],
        prerequisites=["Python fundamentals", "Basic arithmetic"],
        analogy={"title": analogy_title, "text": analogy_text, "metaphor": analogy_metaphor},
        problemSolved={"title": prob_title, "description": prob_desc, "keyPoints": [
            "Eliminates slow dynamic interpreter lookups.",
            "Enables predictable, high-performance vectorized operations.",
            "Provides an intuitive, expressive syntax for numerical computing."
        ]},
        intuition={"overview": f"How {title} works under the hood inside NumPy.", "steps": [
            {"step": 1, "title": "Memory Initialization", "description": "Contiguous memory buffer is prepared in RAM."},
            {"step": 2, "title": "Descriptor Binding", "description": "Shape, strides, and dtype headers are bound to the buffer."},
            {"step": 3, "title": "Hardware Execution", "description": "Vectorized operations run directly at hardware CPU speeds."}
        ]},
        mathematics={"overview": f"Formal notation and mathematical foundations for {title}.", "foundations": [
            {"name": "Array Space Mapping", "latex": "\\mathbf{A} \\in \\mathbb{R}^{d_1 \\times d_2 \\times \\dots \\times d_k}", "explanation": "General k-dimensional tensor space."},
            {"name": "Index Mapping", "latex": "A[i_1, i_2] \\mapsto \\text{Offset} = \\sum_{j} i_j \\cdot s_j", "explanation": "Strided byte memory translation."}
        ]},
        derivation={"title": f"Structural Analysis of {title}", "objective": "Verify the operational complexity and memory characteristics.", "steps": [
            {"step": 1, "label": "Setup", "latex": "N = \\prod_{i=1}^{k} d_i", "explanation": "Total number of elements across all dimensions."},
            {"step": 2, "label": "Memory Footprint", "latex": "\\text{RAM} = N \\times \\text{sizeof}(\\text{dtype})", "explanation": "Exact contiguous payload in RAM."},
            {"step": 3, "label": "Complexity", "latex": "O(1) \\text{ metadata creation}, O(N) \\text{ bulk computation}", "explanation": "NumPy achieves optimal asymptotic complexity."}
        ]},
        variables=[
            {"symbol": "N", "name": "Total Elements", "description": "Count of items in array", "dimensions": "Scalar"},
            {"symbol": "s", "name": "Strides", "description": "Byte step tuple per axis", "dimensions": "Tuple"}
        ],
        numericalExample={
            "scenario": scenario,
            "dataset": [{"Step": 1, "Detail": scen_desc, "Status": "Optimal"}],
            "calculations": [{"step": "Verification", "math": "N = 5", "result": "Verified"}],
            "finalConclusion": "The numerical operation completed with zero unnecessary memory copies."
        },
        visualExplanation={
            "title": f"Visual Architecture: {title}",
            "description": f"Clear schematic representation of {title} in memory and logical view.",
            "features": [
                "Contiguous memory layout prevents cache misses.",
                "Header metadata tracks shape and data type accurately.",
                "Seamless interoperability with Python scientific tools."
            ]
        },
        scratchCode={"title": "Conceptual Python Prototype", "code": code, "explanation": "Direct illustrative execution."},
        sklearnCode={"title": "Integration with Modern Data Science", "code": code, "explanation": "How the concept powers downstream ML workflows."},
        runnableCode_snippet=code,
        lineByLineExplanation=[
            {"lines": "1-2", "codeSnippet": "import numpy as np", "explanation": "Imports the NumPy package."},
            {"lines": "3-5", "codeSnippet": "# Operation execution", "explanation": "Applies the core NumPy function and verifies output."}
        ],
        hyperparameters=[{"name": "dtype", "defaultVal": "None", "range": "Numeric types", "effect": "Bit precision", "recommendation": "Use float64 or int64 by default."}],
        assumptions=[{"assumption": "Homogeneous elements", "whyItMatters": "Enables vectorized C-speed execution", "howToVerify": "Check .dtype"}],
        commonMistakes=[{"mistake": "Unintended type coercion", "solution": "Check dtype explicitly", "whyWrong": "Mixed types force upcasting", "howToFix": "Keep numerical types consistent"}],
        realWorldUseCases=[
            {"industry": "Finance", "application": "Quantitative Trading", "benefit": "Sub-millisecond matrix operations."},
            {"industry": "Machine Learning", "application": "Feature Processing", "benefit": "Fast array scaling and preparation."}
        ],
        practiceQuestions=[
            {"id": "pq1", "question": pq_q, "hint": "Think about memory contiguity.", "answer": pq_a},
            {"id": "pq2", "question": f"What is the time complexity of checking .shape in {title}?", "hint": "Is it O(1) or O(N)?", "answer": "O(1) because shape is stored directly in array metadata."},
            {"id": "pq3", "question": f"How does {title} impact real data pipelines?", "hint": "Think about execution speed.", "answer": "It eliminates Python loop overhead and streamlines numeric computation."}
        ],
        quiz=[
            {
                "id": "q1",
                "question": f"Which statement best characterizes {title}?",
                "options": [
                    "It operates directly on contiguous C memory at hardware speeds.",
                    "It is slower than standard Python loops.",
                    "It cannot be combined with Pandas or Scikit-learn.",
                    "It only supports 1-dimensional sequences."
                ],
                "correctIndex": 0,
                "explanation": "NumPy arrays run compiled C loops over contiguous RAM, yielding maximum throughput."
            },
            {
                "id": "q2",
                "question": "What is the primary benefit of uniform data types in NumPy?",
                "options": [
                    "Eliminates per-element dynamic type checking in CPU cycles.",
                    "Allows storing arbitrary objects without RAM limits.",
                    "Makes code look like JavaScript.",
                    "Disables array slicing."
                ],
                "correctIndex": 0,
                "explanation": "Homogeneity allows the CPU to advance pointers uniformly and execute SIMD instructions."
            },
            {
                "id": "q3",
                "question": "Which attribute gives the total count of elements in an array?",
                "options": ["size", "shape", "length", "ndim"],
                "correctIndex": 0,
                "explanation": "The 'size' attribute returns the total number of elements in the array."
            }
        ],
        independentExercise={
            "title": f"Practice Task: {title}",
            "problem": ex_prob,
            "difficulty": difficulty,
            "hints": ["Review the syntax example above", "Check your expected output"],
            "starterCode": "import numpy as np\n# Your code here:\n",
            "solution": ex_sol
        },
        summary={
            "keyTakeaways": [
                f"Mastered core concepts of {title}.",
                "Understood memory efficiency and performance gains.",
                "Prepared for next advanced topics in the curriculum."
            ],
            "nextLessonId": nextId,
            "nextLessonTitle": nextTitle,
            "nextLessonModuleId": nextModule
        }
    )

m1_lessons_dict = {}
m1_summaries_list = []
for idx, topic in enumerate(m1_topics):
    next_top = m1_topics[idx + 1] if idx + 1 < len(m1_topics) else None
    les = make_full_lesson(topic, next_top)
    m1_lessons_dict[les["id"]] = les
    m1_summaries_list.append({
        "id": les["id"],
        "moduleId": les["moduleId"],
        "title": les["title"],
        "description": les["subtitle"],
        "order": les["order"],
        "readTimeMinutes": les["readTimeMinutes"],
        "visualizerType": les["visualizerType"],
        "difficulty": les["difficulty"]
    })

m1_data = {
    "id": "numpy-module-1",
    "number": 1,
    "title": "NumPy Foundations",
    "subtitle": "The Core Multi-Dimensional Array Architecture for High-Performance Computing",
    "description": "Master the foundational data structure of scientific Python. Learn array instantiation, memory layouts, data types, and multidimensional geometry from first principles.",
    "icon": "Layers",
    "badge": "NumPy Foundations",
    "estimatedHours": 10,
    "topicsCount": len(m1_summaries_list),
    "lessons": m1_summaries_list
}

write_module_ts(os.path.join(OUTPUT_DIR, "numpy-module-1.ts"), "numpyModule1", m1_data, m1_lessons_dict)

print("Module 1 generated successfully!")

