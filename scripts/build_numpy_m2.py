import os
import sys
import json
import subprocess
from numpy_helpers import create_lesson, write_module_ts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "numpy")
os.makedirs(OUTPUT_DIR, exist_ok=True)

m2_raw = [
    (
        "numpy-m2-l1", "Accessing Elements in One-Dimensional Arrays",
        "0-based positive integer indexing, offset calculation, and single element extraction",
        1, 12, "Beginner",
        "Lockers on a School Hallway",
        "Imagine a straight hallway with 10 student lockers numbered 0 to 9. If you want Locker 0, you take 0 steps. If you want Locker 4, you take 4 steps forward. In a 1D NumPy array, arr[i] tells the CPU to jump exactly i locker widths forward from the start of memory in O(1) time.",
        "Positive indexing is direct step counting from the start of the memory corridor.",
        "Direct Memory Access Without Traversal",
        "Linked lists require walking node-by-node from the head (O(N) time). NumPy 1D arrays compute the exact byte address in O(1) constant time, instantly retrieving values.",
        "import numpy as np\nscores = np.array([6, 12, 4, 18, 10])\nfirst = scores[0]\nfourth = scores[3]\nprint('All scores:', scores)\nprint('First over:', first)\nprint('Fourth over:', fourth)",
        "Cricket Over Scores", "Scores of 5 overs: [6, 12, 4, 18, 10]. Accessing over 1 (index 0) and over 4 (index 3).",
        "What is the index of the third element in a NumPy array?", "The third element is at index 2 (due to 0-based indexing).",
        "Given an array of temperatures [21.5, 22.0, 24.5, 23.0, 25.5], extract the first and third readings.",
        "import numpy as np\ntemps = np.array([21.5, 22.0, 24.5, 23.0, 25.5])\nprint(temps[0], temps[2])"
    ),
    (
        "numpy-m2-l2", "Indexing Two-Dimensional Arrays",
        "Row and column coordinate addressing using arr[row, col] syntax",
        2, 14, "Beginner",
        "Seating Chart in a Cinema",
        "When you buy a ticket for Row 2, Seat 4, the usher walks down to Row 2 first, then slides across to Seat 4. In NumPy 2D arrays, arr[row, col] uses this exact coordinate system: the first index picks the row, the second index picks the column.",
        "2D indexing is a coordinate grid (Row, Column) specifying exact intersections.",
        "Replacing Nested Python List Lookup Chaining",
        "In Python lists, a 2D lookup requires two separate pointer operations: matrix[row][col]. NumPy combines row and column indexing into a single tuple: matrix[row, col], calculating the physical offset in a single step.",
        "import numpy as np\ngrid = np.array([\n    [10, 20, 30],\n    [40, 50, 60],\n    [70, 80, 90]\n])\nprint('Row 0, Col 2:', grid[0, 2])\nprint('Center [1, 1]:', grid[1, 1])\nprint('Entire row 1:', grid[1, :])",
        "Student Marks Grid", "3 students across 3 exams. Accessing student 0 exam 2 score.",
        "Why is arr[row, col] preferred over arr[row][col] in NumPy?", "arr[row, col] calculates the direct strided memory offset without creating an intermediate array slice.",
        "Create a 2x3 matrix [[1, 2, 3], [4, 5, 6]] and extract the element at row 1, col 2.",
        "import numpy as np\nm = np.array([[1, 2, 3], [4, 5, 6]])\nprint(m[1, 2])"
    ),
    (
        "numpy-m2-l3", "Slicing Arrays with [start:stop:step] Across Dimensions",
        "Extracting contiguous sub-arrays, intervals, and multi-axis window slices",
        3, 14, "Beginner",
        "Cutting Slices from a Loaf of Bread",
        "When cutting a loaf of bread, you choose where to start slicing (start), where to stop (stop), and how thick each slice should be (step). arr[1:5:2] starts at index 1, stops before index 5, and skips every 2nd element.",
        "Slicing extracts continuous windows with zero memory duplication.",
        "Extracting Sub-matrices Without Memory Duplication",
        "Copying large blocks of matrices to extract a region of interest consumes huge RAM. NumPy slices create zero-copy views that share the original buffer.",
        "import numpy as np\narr = np.arange(10)\nsub1 = arr[2:7]\nsub2 = arr[1:9:2]\nprint('Full array:', arr)\nprint('Slice [2:7]:', sub1)\nprint('Slice [1:9:2] (every 2nd):', sub2)\nmat = np.arange(16).reshape(4, 4)\nprint('2D submatrix [1:3, 1:3]:\\n', mat[1:3, 1:3])",
        "Sensor Time Window", "Extracting readings between minute 2 and minute 6 from an hourly recording.",
        "Is the element at the 'stop' index included in a NumPy slice?", "No, slicing follows Python convention: start is inclusive, stop is exclusive [start, stop).",
        "Given arr = np.arange(10), extract elements from index 3 up to (not including) index 8.",
        "import numpy as np\narr = np.arange(10)\nprint(arr[3:8])"
    ),
    (
        "numpy-m2-l4", "Negative Indexing & Reversing Array Dimensions",
        "Accessing elements from the end of arrays and reversing sequences with negative steps",
        4, 12, "Beginner",
        "Counting Backwards from the Finish Line",
        "Instead of measuring how far you ran from the starting line, you look at how far you are from the finish line: -1 is the last runner, -2 is second to last. arr[::-1] runs the entire race backwards.",
        "Negative indices count backward from the array length: -1 = last item, -k = len - k.",
        "Unknown Array Lengths When Accessing Tail Elements",
        "In dynamic data feeds, you often want the most recent reading without calling len(arr) first. Negative indexing provides clean, readable access to trailing elements.",
        "import numpy as np\narr = np.array([100, 200, 300, 400, 500])\nprint('Last element (-1):', arr[-1])\nprint('Second to last (-2):', arr[-2])\nprint('Last 3 elements (-3:):', arr[-3:])\nprint('Reversed array (::-1):', arr[::-1])",
        "Stock Ticker Stream", "Retrieving the latest closing price and reversing a historical timeline.",
        "What does arr[::-1] do to a 1D array?", "It creates a view that reverses the sequence by applying a negative stride of -1.",
        "Create an array of numbers [1, 2, 3, 4, 5] and reverse it using negative indexing.",
        "import numpy as np\na = np.array([1, 2, 3, 4, 5])\nprint(a[::-1])"
    ),
    (
        "numpy-m2-l5", "Boolean Indexing & Conditional Filtering",
        "Filtering arrays using logical masks and conditional predicate expressions",
        5, 14, "Intermediate",
        "A Sieve or Security Checkpoint",
        "Imagine an airport security gate where passengers with a valid boarding pass get a green light (True) and those without get a red light (False). Only the green-light passengers pass through. In NumPy, arr[arr > 50] creates a boolean mask and keeps only True elements.",
        "Boolean indexing filters arrays by selecting elements that evaluate to True for a condition.",
        "Manual Iteration and Append Loops for Filtering",
        "Filtering millions of records with pure Python 'for x in data: if x > threshold' is slow and bulky. Boolean indexing evaluates the condition vectorially in C.",
        "import numpy as np\nscores = np.array([45, 82, 91, 58, 73, 88, 32])\nmask = scores >= 70\npassing_scores = scores[mask]\nprint('All scores:', scores)\nprint('Boolean mask (>= 70):', mask)\nprint('Filtered high scores:', passing_scores)",
        "Filtering Passing Students", "Selecting all exam scores >= 70 from a class test.",
        "Does boolean indexing return a view or a copy?", "Boolean indexing always returns a copy (a new 1D array) because the filtered indices may not follow regular strides.",
        "Filter out all negative numbers from np.array([-5, 10, -2, 8, -1, 15]).",
        "import numpy as np\na = np.array([-5, 10, -2, 8, -1, 15])\nprint(a[a >= 0])"
    ),
    (
        "numpy-m2-l6", "Fancy Indexing with Integer Arrays & Index Lists",
        "Selecting arbitrary subsets of elements and rows using integer arrays",
        6, 14, "Intermediate",
        "Calling Out Names from a Student Roll Sheet",
        "A teacher doesn't have to call students in alphabetical order or in a contiguous slice. The teacher can call: 'Students #0, #4, and #2, come to the board!' Fancy indexing passes an array of arbitrary indices [0, 4, 2] to pick exactly those elements in that order.",
        "Fancy indexing uses arrays or lists of integers to extract elements in any arbitrary order.",
        "Extracting Non-Contiguous Subsets & Shuffling",
        "When generating train/test splits or sampling mini-batches, samples are non-contiguous. Fancy indexing retrieves arbitrary index batches in one vectorized operation.",
        "import numpy as np\narr = np.array([10, 20, 30, 40, 50, 60, 70])\nindices = [0, 4, 2]\nselected = arr[indices]\nprint('Source array:', arr)\nprint('Selected at [0, 4, 2]:', selected)\nmat = np.arange(12).reshape(4, 3)\nprint('Selecting rows 0 and 2 from matrix:\\n', mat[[0, 2]])",
        "Mini-Batch Sampling in ML", "Extracting training examples 0, 4, and 2 from a dataset.",
        "Does fancy indexing return a view or a copy?", "Fancy indexing always returns a copy because the requested elements cannot generally be represented by fixed strides.",
        "Select the 1st, 3rd, and 5th elements (indices 0, 2, 4) from np.array([100, 200, 300, 400, 500]).",
        "import numpy as np\na = np.array([100, 200, 300, 400, 500])\nprint(a[[0, 2, 4]])"
    ),
    (
        "numpy-m2-l7", "Reshaping Arrays with reshape() and Auto-Dimension -1",
        "Reorganizing array dimensions without moving underlying data bytes in RAM",
        7, 14, "Beginner",
        "Rearranging 12 Toy Blocks into Different Box Shapes",
        "If you have 12 toy blocks, you can line them up in 1 row of 12 (1x12), stack them as 3 rows of 4 (3x4), or build a 2x6 rectangle. The blocks themselves never change; only your grid organization changes.",
        "reshape() changes the shape tuple while keeping total element count (size) constant.",
        "Reshaping Flat 1D Sensor Feeds into 2D Feature Matrices",
        "Flat data streams must be packaged into 2D matrices (samples, features) for machine learning models. Using -1 lets NumPy infer the missing dimension automatically.",
        "import numpy as np\na = np.arange(12)\nm_3x4 = a.reshape(3, 4)\nm_auto = a.reshape(2, -1)  # NumPy infers 6 columns\nprint('Original 1D:', a)\nprint('Reshaped to (3, 4):\\n', m_3x4)\nprint('Reshaped with -1 (2, -1):\\n', m_auto)",
        "Packaging Batch Features", "Converting 12 sequential hourly readings into 2 days of 6 readings.",
        "What does passing -1 as a dimension in reshape() do?", "NumPy automatically calculates the exact size of that dimension based on the total elements and the other specified dimensions.",
        "Reshape a 1D array of 8 elements into a 2x4 matrix.",
        "import numpy as np\na = np.arange(8)\nprint(a.reshape(2, 4))"
    ),
    (
        "numpy-m2-l8", "Flattening Dimensions: flatten() vs ravel() In-Depth",
        "Collapsing multi-dimensional arrays into 1D vectors: views vs deep copies",
        8, 14, "Intermediate",
        "Unrolling a Carpet vs Photocopying a Map",
        "ravel() unrolls a carpet flat on the floor: it is the exact same carpet, and stepping on it dirties the original (view). flatten() takes a photo of the carpet and prints a copy: spilling ink on the photo leaves the real carpet clean (copy).",
        "ravel() returns a memory-efficient view when possible; flatten() always creates a deep copy.",
        "Unintentional Memory Doubling During Image Flattening",
        "In deep learning, flattening a batch of 10,000 images with flatten() doubles RAM usage because it allocates duplicate memory. ravel() creates a zero-copy 1D view.",
        "import numpy as np\norig = np.array([[1, 2], [3, 4]])\nr = orig.ravel()\nf = orig.flatten()\nr[0] = 99\nprint('After modifying ravel[0] to 99:')\nprint('Original array (mutated!):\\n', orig)\nf[1] = 88\nprint('After modifying flatten[1] to 88:')\nprint('Original array (unaffected):\\n', orig)",
        "Flattening 2D Image Pixels", "Converting a 2x2 image patch into a flat vector for a neural network input.",
        "When does ravel() return a copy instead of a view?", "ravel() returns a copy only if the array memory is non-contiguous (e.g. from complex slicing or transpositions).",
        "Verify that flatten() returns an independent copy by mutating its first element.",
        "import numpy as np\nx = np.array([[10, 20], [30, 40]])\nf = x.flatten()\nf[0] = 999\nprint('Original first element unchanged:', x[0, 0])"
    ),
    (
        "numpy-m2-l9", "Transposing Matrices with .T and np.transpose()",
        "Flipping rows into columns and multi-axis dimension permutation",
        9, 12, "Intermediate",
        "Rotating a Spreadsheet by 90 Degrees",
        "Imagine rotating a spreadsheet so that employee names (originally down the rows) become the column headers, and department details become the rows. Transposing swaps axis 0 with axis 1.",
        "Transposition swaps matrix axes: A.T has shape (cols, rows) with zero data movement.",
        "Aligning Matrix Dimensions for Matrix Multiplication",
        "Matrix multiplication requires inner dimensions to match (M x K) @ (K x N). Transposing feature matrices X (N x D) to X.T (D x N) enables dot products in linear regression.",
        "import numpy as np\nmat = np.array([[1, 2, 3], [4, 5, 6]])\nprint('Original (2, 3):\\n', mat)\nprint('Transposed mat.T (3, 2):\\n', mat.T)\nprint('Original strides:', mat.strides)\nprint('Transposed strides:', mat.T.strides)",
        "Transposing Feature Matrix", "Flipping a 2-sample, 3-feature matrix into a 3-feature, 2-sample matrix.",
        "Does .T copy the array in memory?", "No, .T simply swaps the shape and strides tuples, creating a zero-copy view.",
        "Transpose a 3x2 matrix of integers and verify its shape.",
        "import numpy as np\nm = np.ones((3, 2))\nprint('Transposed shape:', m.T.shape)"
    ),
    (
        "numpy-m2-l10", "Adding & Removing Dimensions (newaxis, expand_dims, squeeze)",
        "Manipulating tensor ranks for broadcasting compatibility and model inputs",
        10, 14, "Intermediate",
        "Upgrading a Flat Postcard to a 3D Box",
        "A flat postcard is 2D (height, width). Putting it into a single-slot box gives it a 3rd dimension (1, height, width). It is still 1 postcard, but now it fits into 3D shipping containers. np.newaxis adds a dummy dimension of size 1.",
        "np.newaxis and expand_dims insert dimensions of size 1; squeeze removes dimensions of size 1.",
        "Dimension Mismatch in Machine Learning Estimators",
        "Scikit-learn expects 2D feature matrices (N, 1) rather than flat 1D vectors (N,). np.newaxis converts 1D arrays into 2D column vectors without copying data.",
        "import numpy as np\nv = np.array([1, 2, 3])\ncol = v[:, np.newaxis]\nrow = v[np.newaxis, :]\nprint('1D shape:', v.shape)\nprint('Column vector (v[:, np.newaxis]):\\n', col, col.shape)\nprint('Squeezed back:', np.squeeze(col).shape)",
        "Preparing Scikit-Learn Feature Input", "Converting 1D target predictions into a 2D column vector.",
        "What is the difference between arr[:, np.newaxis] and np.expand_dims(arr, axis=1)?", "They are functionally identical; np.newaxis is slicing syntax, whereas expand_dims is a functional wrapper.",
        "Convert a 1D array of 4 numbers into a column vector of shape (4, 1).",
        "import numpy as np\na = np.array([10, 20, 30, 40])\ncol = a[:, np.newaxis]\nprint(col.shape)"
    ),
    (
        "numpy-m2-l11", "Understanding Views versus Copies in NumPy",
        "Memory pointers, sharing buffers (.base), and avoiding unintended side-effects",
        11, 14, "Advanced",
        "A Window Looking Outside vs A Printed Photograph",
        "Looking out your living room window gives you a view of the garden outside. If someone paints the fence red, you see it change through the window (view). If you take a photograph of the garden and someone paints the fence, the photo stays unchanged (copy).",
        "Views share memory (.base is not None); copies allocate independent memory (.base is None).",
        "Accidental In-Place Mutations in Data Pipelines",
        "Modifying a sliced sub-array can accidentally mutate the master dataset, producing silent data corruption bugs. Checking .base detects shared memory buffers.",
        "import numpy as np\nmaster = np.array([10, 20, 30, 40])\nview_slice = master[1:3]\ncopy_slice = master[1:3].copy()\nprint('view_slice shares buffer (base is master):', view_slice.base is master)\nprint('copy_slice has own memory (base is None):', copy_slice.base is None)\nview_slice[0] = 999\nprint('Master after mutating view:', master)",
        "Verifying Training Data Isolation", "Ensuring validation set slices are isolated copies so preprocessing does not taint the training set.",
        "How can you programmatically verify whether an array is a view or an independent copy?", "Inspect array.base: if it is None, the array owns its memory (copy); if it points to another array, it is a view.",
        "Create an array, take a slice, copy it, and check which one has .base is not None.",
        "import numpy as np\na = np.array([1, 2, 3])\nv = a[0:2]\nc = a[0:2].copy()\nprint('View has base:', v.base is not None)\nprint('Copy has base:', c.base is not None)"
    ),
    (
        "numpy-m2-l12", "Combining Indexing, Slicing & Filtering in Real Pipelines",
        "Integrating boolean masks, dimension slicing, and fancy selection in data workflows",
        12, 14, "Intermediate",
        "Selecting Top Students in a Specific Exam",
        "In a school gradebook, you might want to: (1) Pick students from Class A (row filter), (2) Select only Science and Math columns (column slice), and (3) Highlight scores above 85 (boolean mask). Real data science combines all three techniques seamlessly.",
        "Chaining and combining indexing modes enables precise, high-speed multi-axis data filtering.",
        "Multi-Step Data Extraction and Querying",
        "Real-world datasets contain thousands of rows and hundreds of columns. Combining row filters with column slices retrieves exact sub-matrices in a single concise line of code.",
        "import numpy as np\n# 4 students, 3 subjects (Math, Physics, Chemistry)\ngrades = np.array([\n    [75, 80, 85],\n    [92, 88, 95],\n    [60, 65, 70],\n    [88, 90, 82]\n])\n# Math scores (column 0) > 80\nmath_filter = grades[:, 0] > 80\nprint('Students with Math > 80 (Physics & Chem only):\\n', grades[math_filter, 1:])",
        "School Gradebook Analytics", "Finding physics and chemistry scores for all students who scored > 80 in math.",
        "Can you combine a boolean row mask with a column slice in the same index bracket?", "Yes, grades[mask, 1:] uses a boolean mask on axis 0 and a slice on axis 1 simultaneously.",
        "From a 3x3 matrix, select rows where column 0 is positive, and return only columns 1 and 2.",
        "import numpy as np\nm = np.array([[-1, 10, 20], [2, 30, 40], [5, 50, 60]])\nprint(m[m[:, 0] > 0, 1:])"
    )
]

def make_m2_lesson(t, next_topic=None):
    (id, title, subtitle, order, readTime, difficulty,
     analogy_title, analogy_text, analogy_metaphor,
     prob_title, prob_desc,
     code,
     scenario, scen_desc,
     pq_q, pq_a,
     ex_prob, ex_sol) = t

    nextId = next_topic[0] if next_topic else "numpy-m3-l1"
    nextTitle = next_topic[1] if next_topic else "Arithmetic Operations on Arrays"
    nextModule = "numpy-module-2" if next_topic else "numpy-module-3"

    return create_lesson(
        id=id,
        moduleId="numpy-module-2",
        title=title,
        subtitle=subtitle,
        order=order,
        readTime=readTime,
        difficulty=difficulty,
        objectives=[
            f"Master practical usage of {title}.",
            "Understand the underlying memory layout, strides, and complexity.",
            "Avoid common bugs, index errors, and unintended view mutations.",
            "Apply the technique to practical data science workflows."
        ],
        prerequisites=["NumPy Foundations", "Array attributes (.shape, .dtype)"],
        analogy={"title": analogy_title, "text": analogy_text, "metaphor": analogy_metaphor},
        problemSolved={"title": prob_title, "description": prob_desc, "keyPoints": [
            "Provides constant time O(1) or fast vectorized indexing.",
            "Eliminates slow nested Python for loops.",
            "Enables clean, expressive multi-dimensional coordinate access."
        ]},
        intuition={"overview": f"Memory and strided navigation in {title}.", "steps": [
            {"step": 1, "title": "Coordinate Mapping", "description": "NumPy parses index coordinates or slicing bounds."},
            {"step": 2, "title": "Stride Arithmetic", "description": "Computes exact memory offsets without scanning elements."},
            {"step": 3, "title": "Buffer Return", "description": "Returns a view or newly allocated copy as appropriate."}
        ]},
        mathematics={"overview": f"Mathematical foundations for {title}.", "foundations": [
            {"name": "Submatrix Selection", "latex": "\\mathbf{B} = \\mathbf{A}[I, J] \\quad \\text{where } I \\subseteq \\{0, \\dots, M-1\\}", "explanation": "Coordinate restriction in linear algebra."},
            {"name": "Strided Offset", "latex": "\\text{Address} = \\text{Base} + \\sum_{k} i_k \\cdot s_k", "explanation": "Multi-dimensional memory offset formula."}
        ]},
        derivation={"title": f"Structural Complexity of {title}", "objective": "Verify the computational cost and view/copy properties.", "steps": [
            {"step": 1, "label": "Strided Navigation", "latex": "O(1) \\text{ for basic slicing (view)}", "explanation": "Adjusting shape and strides metadata takes constant time."},
            {"step": 2, "label": "Boolean/Fancy Indexing", "latex": "O(K) \\text{ for K extracted elements (copy)}", "explanation": "Requires creating a new contiguous buffer for non-regular elements."}
        ]},
        variables=[
            {"symbol": "I", "name": "Row Indices", "description": "Selected row coordinates", "dimensions": "Index set"},
            {"symbol": "J", "name": "Column Indices", "description": "Selected column coordinates", "dimensions": "Index set"}
        ],
        numericalExample={
            "scenario": scenario,
            "dataset": [{"Record": 1, "Context": scen_desc, "Status": "Optimal"}],
            "calculations": [{"step": "Verification", "math": "Operation executed", "result": "Verified"}],
            "finalConclusion": "The indexing operation returned the exact expected values."
        },
        visualExplanation={
            "title": f"Visual Architecture: {title}",
            "description": f"How {title} navigates and extracts data from the array buffer.",
            "features": [
                "Rows navigate along Axis 0 (down).",
                "Columns navigate along Axis 1 (across).",
                "Views share the parent buffer with updated strides."
            ]
        },
        scratchCode={"title": "Interactive Python Demonstration", "code": code, "explanation": "Runnable example demonstrating the concept."},
        sklearnCode={"title": "Machine Learning Workflow Application", "code": code, "explanation": "How feature matrices are sliced and indexed in model pipelines."},
        runnableCode_snippet=code,
        lineByLineExplanation=[
            {"lines": "1-2", "codeSnippet": "import numpy as np", "explanation": "Imports the NumPy package."},
            {"lines": "3-5", "codeSnippet": "# Indexing / Slicing execution", "explanation": "Performs the operation and prints the result."}
        ],
        hyperparameters=[{"name": "step", "defaultVal": "1", "range": "Integers (+ or -)", "effect": "Interval between elements in a slice", "recommendation": "Use -1 to reverse arrays."}],
        assumptions=[{"assumption": "Valid bounds", "whyItMatters": "Out of bounds indices raise IndexError", "howToVerify": "Check array.shape beforehand"}],
        commonMistakes=[{"mistake": "Accidental view mutation", "solution": "Use .copy() when you need independence", "whyWrong": "Slices modify the parent array", "howToFix": "Call arr[slice].copy()"}],
        realWorldUseCases=[
            {"industry": "Finance", "application": "Price Time-Series Slicing", "benefit": "Fast sliding window calculations."},
            {"industry": "Computer Vision", "application": "Bounding Box Cropping", "benefit": "Cropping regions of interest without copying entire images."}
        ],
        practiceQuestions=[
            {"id": "pq1", "question": pq_q, "hint": "Review the slicing rules.", "answer": pq_a},
            {"id": "pq2", "question": f"Does {title} create a view or a copy?", "hint": "Basic slicing creates views; boolean/fancy indexing creates copies.", "answer": "Basic slices create views; boolean and integer array indexing create copies."},
            {"id": "pq3", "question": f"Why is {title} essential in machine learning?", "hint": "Think of train/test splits and feature extraction.", "answer": "It allows separating feature columns from target labels and filtering outlier rows efficiently."}
        ],
        quiz=[
            {
                "id": "q1",
                "question": f"Which operation creates an independent copy rather than a view?",
                "options": ["arr[arr > 50] (Boolean indexing)", "arr[1:5] (Basic slicing)", "arr[::-1] (Reversal)", "arr.T (Transposition)"],
                "correctIndex": 0,
                "explanation": "Boolean indexing cannot be represented by fixed strides, so it always creates a brand new copy."
            },
            {
                "id": "q2",
                "question": "What is the result of arr[1:4] on a 1D array?",
                "options": ["Elements at indices 1, 2, and 3", "Elements at indices 1, 2, 3, and 4", "Elements at indices 0, 1, 2, and 3", "Only element 1 and 4"],
                "correctIndex": 0,
                "explanation": "Slices are inclusive of start and exclusive of stop: indices 1, 2, 3."
            },
            {
                "id": "q3",
                "question": "How do you check whether a slice is a view of an original array?",
                "options": ["slice.base is original", "slice.is_view()", "slice == original", "slice.view_check()"],
                "correctIndex": 0,
                "explanation": "The .base attribute of a view references the parent array object."
            }
        ],
        independentExercise={
            "title": f"Practice Task: {title}",
            "problem": ex_prob,
            "difficulty": difficulty,
            "hints": ["Review the example code above", "Check your index offsets"],
            "starterCode": "import numpy as np\n# Your code here:\n",
            "solution": ex_sol
        },
        summary={
            "keyTakeaways": [
                f"Mastered {title} thoroughly.",
                "Understood view vs copy mechanics and memory footprint.",
                "Ready for the next lesson in the curriculum."
            ],
            "nextLessonId": nextId,
            "nextLessonTitle": nextTitle,
            "nextLessonModuleId": nextModule
        }
    )

m2_lessons_dict = {}
m2_summaries = []
for idx, item in enumerate(m2_raw):
    next_it = m2_raw[idx + 1] if idx + 1 < len(m2_raw) else None
    les = make_m2_lesson(item, next_it)
    m2_lessons_dict[les["id"]] = les
    m2_summaries.append({
        "id": les["id"],
        "moduleId": les["moduleId"],
        "title": les["title"],
        "description": les["subtitle"],
        "order": les["order"],
        "readTimeMinutes": les["readTimeMinutes"],
        "visualizerType": les["visualizerType"],
        "difficulty": les["difficulty"]
    })

m2_data = {
    "id": "numpy-module-2",
    "number": 2,
    "title": "Indexing, Slicing, and Reshaping",
    "subtitle": "Mastering Multi-Axis Coordinate Traversal, Views vs Copies, and Tensor Reshaping",
    "description": "Unlock total control over array manipulation. Learn integer indexing, multi-dimensional slicing, boolean filtering, fancy indexing, reshaping, and memory view mechanics.",
    "icon": "Layers",
    "badge": "Array Manipulation",
    "estimatedHours": 12,
    "topicsCount": len(m2_summaries),
    "lessons": m2_summaries
}

write_module_ts(os.path.join(OUTPUT_DIR, "numpy-module-2.ts"), "numpyModule2", m2_data, m2_lessons_dict)
print("Module 2 generated successfully!")

