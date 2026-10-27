import os
import sys
from build_numpy_complete import make_lesson, write_module_ts, OUTPUT_DIR

# ==============================================================================
# MODULE 2: Indexing, Slicing, and Reshaping (12 Lessons)
# ==============================================================================
m2_raw = [
    {
        "id": "numpy-m2-l1", "moduleId": "numpy-module-2",
        "title": "Accessing Elements in One-Dimensional Arrays",
        "subtitle": "0-based positive integer indexing, offset calculation, and single element extraction",
        "order": 1, "readTime": 12, "difficulty": "Beginner",
        "analogy": {
            "title": "Lockers on a School Hallway",
            "text": "Imagine a straight hallway with 10 student lockers numbered 0 to 9. If you want Locker 0, you stand at the door and take 0 steps. If you want Locker 4, you take exactly 4 steps forward. In a 1D NumPy array, arr[i] tells the CPU to jump exactly i locker widths forward from the start of memory.",
            "metaphor": "Positive indexing is direct step counting from the start of the memory corridor."
        },
        "problemSolved": {
            "title": "Direct Memory Access Without Traversal",
            "description": "Linked lists require walking node-by-node from the head (O(N) time). NumPy 1D arrays compute the exact byte address in O(1) constant time, instantly retrieving values.",
            "keyPoints": ["Instant O(1) access to any position.", "Zero-based indexing matches C memory offsets.", "Throws IndexError if index is outside bounds."]
        },
        "intuition": {
            "overview": "Offset = BaseAddress + index * itemsize.",
            "steps": [
                {"step": 1, "title": "Index Verification", "description": "NumPy checks that 0 <= index < array.size."},
                {"step": 2, "title": "Pointer Math", "description": "Multiplies index by byte-width of dtype."},
                {"step": 3, "title": "Memory Fetch", "description": "CPU reads raw bytes directly from the memory bus."}
            ]
        },
        "mathematics": {
            "overview": "Vector element access in Euclidean n-space.",
            "foundations": [
                {"name": "Element Access", "latex": "x_i \\in \\mathbf{x} \\quad \\text{for } i \\in \\{0, 1, \\dots, n-1\\}", "explanation": "Retrieving scalar component i of vector x."},
                {"name": "Byte Offset", "latex": "\\text{Address}(i) = \\text{Base} + i \\cdot s_0", "explanation": "Memory stride calculation."}
            ]
        },
        "derivation": {
            "title": "Constant Time O(1) Access",
            "objective": "Verify why array indexing requires no searching.",
            "steps": [
                {"step": 1, "label": "Pointer Offset", "latex": "\\text{Ptr} = \\text{Base} + i \\times \\text{sizeof}(T)", "explanation": "Single addition and multiplication instruction."},
                {"step": 2, "label": "Hardware Level", "latex": "\\text{Time} = O(1)", "explanation": "Independent of array size N."}
            ]
        },
        "variables": [
            {"symbol": "i", "name": "Index", "description": "Zero-based element index", "dimensions": "Scalar"},
            {"symbol": "s_0", "name": "Stride", "description": "Bytes per item", "dimensions": "Bytes"}
        ],
        "numericalExample": {
            "scenario": "Accessing cricket scores for 5 overs: [6, 12, 4, 18, 10].",
            "dataset": [{"Over": 1, "Runs": 6}, {"Over": 2, "Runs": 12}, {"Over": 3, "Runs": 4}, {"Over": 4, "Runs": 18}, {"Over": 5, "Runs": 10}],
            "calculations": [{"step": "Over 4 runs (index 3)", "math": "arr[3]", "result": "18 runs"}],
            "finalConclusion": "The score in over 4 is retrieved in 1 CPU cycle."
        },
        "visualExplanation": {
            "title": "1D Array Indexing Memory Diagram",
            "description": "Visualizing index 0 to 4 pointing to consecutive 8-byte slots in RAM.",
            "features": ["Index 0: Base + 0 bytes", "Index 3: Base + 24 bytes", "Index 4: Base + 32 bytes"]
        },
        "code": "import numpy as np\nscores = np.array([6, 12, 4, 18, 10])\nfirst = scores[0]\nfourth = scores[3]\nprint('All scores:', scores)\nprint('First over:', first)\nprint('Fourth over:', fourth)",
        "lineByLineExplanation": [
            {"lines": "1-2", "codeSnippet": "import numpy as np; scores = np.array([6, 12, 4, 18, 10])", "explanation": "Creates a 1D array of 5 scores."},
            {"lines": "3-4", "codeSnippet": "first = scores[0]; fourth = scores[3]", "explanation": "Extracts first element (index 0) and 4th element (index 3)."}
        ],
        "commonMistakes": [{"mistake": "Using 1-based indexing for the first element", "solution": "Always start indexing at 0", "whyWrong": "scores[1] retrieves the second element, not the first", "howToFix": "Remember scores[0] is the very first element"}],
        "realWorldUseCases": [
            {"industry": "Sports Analytics", "application": "Cricket Scorecards", "benefit": "Instant access to ball-by-ball run tallies."},
            {"industry": "Finance", "application": "Stock Prices", "benefit": "Retrieving market open or close prices."}
        ],
        "practiceQuestions": [
            {"id": "pq1", "question": "What is the index of the third element in a NumPy array?", "hint": "Subtract 1 for zero-based indexing.", "answer": "The third element is at index 2."},
            {"id": "pq2", "question": "What error is raised if you access arr[10] on an array of length 5?", "hint": "Index is out of range.", "answer": "IndexError: index 10 is out of bounds for axis 0 with size 5."},
            {"id": "pq3", "question": "Does indexing a single element return an array or a scalar?", "hint": "Think about array dimensions.", "answer": "It returns a scalar value (e.g. numpy.int64)."}
        ],
        "quiz": [
            {
                "id": "q1",
                "question": "If arr = np.array([10, 20, 30, 40]), what is arr[2]?",
                "options": ["30", "20", "40", "10"],
                "correctIndex": 0,
                "explanation": "Index 2 corresponds to the third element, which is 30."
            },
            {
                "id": "q2",
                "question": "What is the computational complexity of retrieving arr[i] in a 1D NumPy array?",
                "options": ["O(1)", "O(N)", "O(log N)", "O(N^2)"],
                "correctIndex": 0,
                "explanation": "Contiguous array addressing calculates the byte offset directly in O(1) time."
            },
            {
                "id": "q3",
                "question": "What happens if you assign a new value to an indexed element, like arr[0] = 99?",
                "options": ["It modifies the element in place inside the existing array.", "It deletes the array.", "It converts the array into a dictionary.", "It raises a TypeError."],
                "correctIndex": 0,
                "explanation": "NumPy arrays are mutable; assigning to an index updates that memory slot directly."
            }
        ],
        "independentExercise": {
            "title": "Accessing Temperature Sensor Logs",
            "problem": "Given an array of temperatures [21.5, 22.0, 24.5, 23.0, 25.5], extract the first, third, and last temperature reading using positive indexing.",
            "difficulty": "Beginner",
            "hints": ["First is index 0", "Third is index 2", "Last is index 4"],
            "starterCode": "import numpy as np\ntemps = np.array([21.5, 22.0, 24.5, 23.0, 25.5])\n# Extract here:\n",
            "solution": "import numpy as np\ntemps = np.array([21.5, 22.0, 24.5, 23.0, 25.5])\nprint('First:', temps[0])\nprint('Third:', temps[2])\nprint('Last:', temps[4])"
        }
    },
    {
        "id": "numpy-m2-l2", "moduleId": "numpy-module-2",
        "title": "Indexing Two-Dimensional Arrays",
        "subtitle": "Row and column coordinate addressing using arr[row, col] syntax",
        "order": 2, "readTime": 14, "difficulty": "Beginner",
        "analogy": {
            "title": "Seating Chart in a Cinema",
            "text": "When you buy a ticket for Row 3, Seat 5, the usher walks down to Row 3 first, then slides across to Seat 5. In NumPy 2D arrays, arr[row, col] uses this exact coordinate system: the first index picks the row, the second index picks the column.",
            "metaphor": "2D indexing is a coordinate grid (Row, Column) specifying exact row and column intersections."
        },
        "problemSolved": {
            "title": "Replacing Nested Python List Lookup Chaining",
            "description": "In Python lists, a 2D lookup requires two separate pointer operations: `matrix[row][col]`. NumPy combines row and column indexing into a single tuple: `matrix[row, col]`, calculating the physical offset in a single step.",
            "keyPoints": ["Single-step coordinate syntax: arr[r, c].", "Faster and cleaner than nested arr[r][c].", "Directly supports multi-dimensional slicing."]
        },
        "intuition": {
            "overview": "Offset = BaseAddress + row * row_stride + col * col_stride.",
            "steps": [
                {"step": 1, "title": "Row Offset", "description": "Jumps across full row buffers in RAM."},
                {"step": 2, "title": "Column Offset", "description": "Steps across individual column items."},
                {"step": 3, "title": "Value Return", "description": "Reads the scalar value at that intersection."}
            ]
        },
        "mathematics": {
            "overview": "Matrix entry extraction in $\\mathbb{R}^{M \\times N}$.",
            "foundations": [
                {"name": "Matrix Entry", "latex": "A_{i,j} \\in \\mathbf{A} \\quad i \\in [0, M-1], j \\in [0, N-1]", "explanation": "Row i, column j element."},
                {"name": "2D Strided Offset", "latex": "\\text{Address}(i, j) = \\text{Base} + i \\cdot s_0 + j \\cdot s_1", "explanation": "Row stride s_0 and column stride s_1."}
            ]
        },
        "derivation": {
            "title": "Row-Major 2D Offset Calculation",
            "objective": "Derive the exact RAM address for cell (i, j) in a matrix with C-order layout.",
            "steps": [
                {"step": 1, "label": "Full Row Size", "latex": "s_0 = N \\times \\text{itemsize}", "explanation": "Each row contains N columns."},
                {"step": 2, "label": "Column Step", "latex": "s_1 = \\text{itemsize}", "explanation": "Columns are adjacent in RAM."},
                {"step": 3, "label": "Total Offset", "latex": "\\text{Offset} = (i \\times N + j) \\times \\text{itemsize}", "explanation": "Single multiply-accumulate formula."}
            ]
        },
        "variables": [
            {"symbol": "i", "name": "Row Index", "description": "Target row index", "dimensions": "Scalar"},
            {"symbol": "j", "name": "Column Index", "description": "Target column index", "dimensions": "Scalar"},
            {"symbol": "N", "name": "Columns Count", "description": "Total columns in matrix", "dimensions": "Scalar"}
        ],
        "numericalExample": {
            "scenario": "Student marks across 3 subjects for 2 students: [[85, 90, 78], [92, 88, 95]].",
            "dataset": [{"Student": "Alice (Row 0)", "Math": 85, "Physics": 90, "Chem": 78}, {"Student": "Bob (Row 1)", "Math": 92, "Physics": 88, "Chem": 95}],
            "calculations": [{"step": "Bob's Chemistry Score (Row 1, Col 2)", "math": "marks[1, 2]", "result": "95"}],
            "finalConclusion": "marks[1, 2] extracts Bob's chemistry score with zero ambiguity."
        },
        "visualExplanation": {
            "title": "2D Grid Coordinate System",
            "description": "Visualizing rows along Axis 0 (down) and columns along Axis 1 (across).",
            "features": ["Axis 0: Rows (top to bottom)", "Axis 1: Columns (left to right)", "Target [1, 2] is row index 1, column index 2."]
        },
        "code": "import numpy as np\ngrid = np.array([\n    [10, 20, 30],\n    [40, 50, 60],\n    [70, 80, 90]\n])\ncenter_element = grid[1, 1]\ncorner_element = grid[0, 2]\nprint('Grid:\\n', grid)\nprint('Center element [1, 1]:', center_element)\nprint('Top-right corner [0, 2]:', corner_element)",
        "lineByLineExplanation": [
            {"lines": "1-5", "codeSnippet": "grid = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])", "explanation": "Defines a 3x3 square matrix."},
            {"lines": "6-7", "codeSnippet": "center_element = grid[1, 1]; corner_element = grid[0, 2]", "explanation": "Accesses row 1, col 1 (50) and row 0, col 2 (30)."}
        ],
        "commonMistakes": [{"mistake": "Writing grid[col, row] instead of grid[row, col]", "solution": "Remember: Rows come first, Columns come second (RC)", "whyWrong": "Inverting the order accesses the transposed cell", "howToFix": "Think of Remote Control: Row then Column"}],
        "realWorldUseCases": [
            {"industry": "Computer Vision", "application": "Pixel Access", "benefit": "Accessing pixel brightness at coordinates (y, x)."},
            {"industry": "Education", "application": "Grading Portals", "benefit": "Looking up student test marks by student ID and exam ID."}
        ],
        "practiceQuestions": [
            {"id": "pq1", "question": "In a 2D array of shape (4, 5), what are the maximum valid row and column indices?", "hint": "Subtract 1 from dimensions.", "answer": "Row index 3, column index 4."},
            {"id": "pq2", "question": "Why is arr[row, col] preferred over arr[row][col] in NumPy?", "hint": "Think about intermediate object creation.", "answer": "arr[row, col] accesses the element directly via strided offset, whereas arr[row][col] creates a temporary slice array for the row first."},
            {"id": "pq3", "question": "How do you extract the entire first row of a matrix?", "hint": "Use a colon for columns.", "answer": "arr[0, :] extracts the entire first row."}
        ],
        "quiz": [
            {
                "id": "q1",
                "question": "Given mat = np.array([[1, 2], [3, 4]]), what is mat[0, 1]?",
                "options": ["2", "1", "3", "4"],
                "correctIndex": 0,
                "explanation": "Row 0, column 1 is the value 2."
            },
            {
                "id": "q2",
                "question": "What is the convention for 2D NumPy array indexing order?",
                "options": ["arr[row, column]", "arr[column, row]", "arr[depth, width]", "arr[height, depth]"],
                "correctIndex": 0,
                "explanation": "NumPy uses row-major indexing: row index first, then column index."
            },
            {
                "id": "q3",
                "question": "What does arr[2] return when arr is a 2D matrix?",
                "options": ["The entire 3rd row as a 1D array.", "A single number.", "The 3rd column.", "An error."],
                "correctIndex": 0,
                "explanation": "Providing a single index to a 2D array indexes along Axis 0, returning that entire row."
            }
        ],
        "independentExercise": {
            "title": "Extracting Quarter Sales Figures",
            "problem": "Create a 2x4 matrix representing sales of 2 branches across 4 quarters: [[120, 150, 130, 170], [90, 110, 140, 160]]. Extract Branch 2's Q3 sales (row 1, col 2).",
            "difficulty": "Beginner",
            "hints": ["Branch 2 is row 1", "Q3 is col 2"],
            "starterCode": "import numpy as np\nsales = np.array([[120, 150, 130, 170], [90, 110, 140, 160]])\n# Extract Branch 2 Q3:\n",
            "solution": "import numpy as np\nsales = np.array([[120, 150, 130, 170], [90, 110, 140, 160]])\nq3_branch2 = sales[1, 2]\nprint('Branch 2 Q3 Sales:', q3_branch2)"
        }
    }
]

print("Module 2 initial definitions ready.")

