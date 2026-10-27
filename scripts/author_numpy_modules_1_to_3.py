import os
import sys
from numpy_helpers import create_lesson, write_module_ts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "numpy")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ==============================================================================
# MODULE 1: NumPy Foundations (12 Lessons)
# ==============================================================================
m1_lessons = {}
m1_summaries = []

# Lesson 1: What NumPy Is & Why It Matters
l1_code = """import numpy as np

# Standard Python lists vs NumPy ndarray
python_list = [10, 20, 30, 40, 50]
numpy_array = np.array([10, 20, 30, 40, 50])

print("Python list:", python_list)
print("NumPy array:", numpy_array)
print("Type of numpy array:", type(numpy_array))
print("Array data type (dtype):", numpy_array.dtype)
print("Array shape:", numpy_array.shape)
"""
l1 = create_lesson(
    id="numpy-m1-l1",
    moduleId="numpy-module-1",
    title="What NumPy Is & Why It Matters in Data Science",
    subtitle="The high-performance numerical computing engine powering modern machine learning",
    order=1,
    readTime=12,
    difficulty="Beginner",
    objectives=[
        "Understand what NumPy is and why it was created.",
        "Recognize the critical differences between Python lists and contiguous numerical arrays.",
        "Inspect primary array attributes including dtype and shape.",
        "Run your first working NumPy array program."
    ],
    prerequisites=["Basic Python familiarity (variables, functions, lists)"],
    analogy={
        "title": "Loose Shopping Bags vs. Standardized Cargo Containers",
        "text": "Imagine going shopping where you toss apples, milk cartons, and shoes into random paper bags. Every time you want an apple, you have to open the bag, check what's inside, and handle it differently. That is how standard Python lists work: each item is a separate object with its own memory box and type tag. NumPy, in contrast, is like a freight container ship packed with identical steel cargo crates stacked in precise rows. Because every crate is the exact same size and holds the exact same data type, the crane (your CPU) can grab 10,000 crates in a single continuous swoop without inspecting them one by one.",
        "metaphor": "Python lists are loose grab bags; NumPy arrays are rigid, high-density shipping containers designed for industrial throughput."
    },
    problemSolved={
        "title": "The Python Speed Bottleneck in Scientific Computing",
        "description": "Standard Python is dynamic and interpreted. Looping through millions of numbers in pure Python takes hundreds of milliseconds because Python must look up types and pointer addresses on every iteration. NumPy solves this by storing raw, contiguous C-level data buffers and executing pre-compiled C/Fortran vector loops directly at hardware speeds.",
        "keyPoints": [
            "Contiguous memory layout eliminates pointer chasing.",
            "Homogeneous data typing eliminates per-element dynamic type checks.",
            "Vectorized C-level execution runs orders of magnitude faster than Python for loops."
        ]
    },
    intuition={
        "overview": "NumPy wraps a raw pointer to a contiguous block of RAM memory with metadata: itemsize, shape tuple, strides tuple, and dtype.",
        "steps": [
            {"step": 1, "title": "Memory Allocation", "description": "NumPy asks the OS for a single continuous block of bytes in RAM."},
            {"step": 2, "title": "Header Attachment", "description": "NumPy attaches a lightweight metadata descriptor containing shape, dtype, and strides."},
            {"step": 3, "title": "Direct CPU Vectorization", "description": "Calculations pass directly to vectorized CPU instructions (SIMD) without Python interpreter overhead."}
        ]
    },
    mathematics={
        "overview": "A NumPy 1D array represents a finite mathematical vector in Euclidean space $\\mathbb{R}^n$, stored in contiguous physical memory addresses.",
        "foundations": [
            {"name": "Euclidean Vector", "latex": "\\mathbf{x} = [x_1, x_2, \\dots, x_n]^T \\in \\mathbb{R}^n", "explanation": "A sequence of $n$ scalar elements indexed from $0$ to $n-1$."},
            {"name": "Memory Address Offset", "latex": "\\text{Address}(i) = \\text{BaseAddress} + i \\times \\text{itemsize}", "explanation": "Direct $O(1)$ memory address resolution for any element $i$."}
        ]
    },
    derivation={
        "title": "Address Resolution Derivation",
        "objective": "Prove that accessing any arbitrary element in a 1D NumPy array takes constant time O(1).",
        "steps": [
            {"step": 1, "label": "Contiguity Property", "latex": "A[0] \\text{ sits at byte address } B.", "explanation": "The array memory begins at fixed base pointer address B."},
            {"step": 2, "label": "Uniform Element Size", "latex": "\\Delta = \\text{sizeof}(\\text{dtype})", "explanation": "Every element occupies exactly the same number of bytes (e.g. 8 bytes for float64)."},
            {"step": 3, "label": "Instant Calculation", "latex": "A[k] = B + k \\times \\Delta", "explanation": "The CPU calculates the target address with a single multiply and add instruction in O(1) time."}
        ]
    },
    variables=[
        {"symbol": "B", "name": "Base Address", "description": "Starting physical memory location in RAM", "dimensions": "Pointer"},
        {"symbol": "k", "name": "Element Index", "description": "Zero-based position of the target element", "dimensions": "Scalar"},
        {"symbol": "\\Delta", "name": "Stride/Itemsize", "description": "Byte length of a single element (e.g. 4 or 8 bytes)", "dimensions": "Bytes"}
    ],
    numericalExample={
        "scenario": "Storing 5 student exam scores [75, 88, 92, 64, 80] as 64-bit integers.",
        "dataset": [
            {"Index": 0, "Score": 75, "ByteOffset": "0 bytes"},
            {"Index": 1, "Score": 88, "ByteOffset": "8 bytes"},
            {"Index": 2, "Score": 92, "ByteOffset": "16 bytes"},
            {"Index": 3, "Score": 64, "ByteOffset": "24 bytes"},
            {"Index": 4, "Score": 80, "ByteOffset": "32 bytes"}
        ],
        "calculations": [
            {"step": "Total RAM Consumed", "math": "5 \\text{ elements} \\times 8 \\text{ bytes}", "result": "40 bytes of contiguous payload"},
            {"step": "Address of Score 3", "math": "Base + 3 \\times 8", "result": "Base + 24 bytes"}
        ],
        "finalConclusion": "The entire array payload fits cleanly in a single 64-byte L1 CPU cache line."
    },
    visualExplanation={
        "title": "NumPy Array Buffer Anatomy",
        "description": "Visualizing how NumPy separates metadata (shape, strides, dtype) from the contiguous binary data buffer in RAM.",
        "features": [
            "Metadata header holds shape=(5,) and dtype=int64.",
            "Raw buffer holds consecutive 8-byte chunks in physical RAM.",
            "Zero pointer indirection enables instant L1 CPU cache prefetching."
        ]
    },
    scratchCode={
        "title": "Simulating a Contiguous Array in Pure Python",
        "code": """# Simulating uniform buffer addressing with byte offsets
class SimpleBuffer:
    def __init__(self, items):
        self.itemsize = 8  # 8 bytes per number
        self.data = list(items)
    
    def get_offset(self, index):
        return index * self.itemsize

buf = SimpleBuffer([10, 20, 30, 40])
print(f"Offset for index 2: {buf.get_offset(2)} bytes")
""",
        "explanation": "Illustrates how uniform item sizes allow instant computation of memory locations."
    },
    sklearnCode={
        "title": "NumPy as the Foundation of Scikit-Learn",
        "code": """import numpy as np
from sklearn.linear_model import LinearRegression

# Scikit-learn models natively consume NumPy 2D arrays
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

model = LinearRegression().fit(X, y)
print("Learned coefficient:", model.coef_)
""",
        "explanation": "Scikit-learn algorithms require inputs to be NumPy ndarrays or convertible arrays."
    },
    runnableCode_snippet=l1_code,
    lineByLineExplanation=[
        {"lines": "1", "codeSnippet": "import numpy as np", "explanation": "Imports the NumPy package with the universal community alias 'np'."},
        {"lines": "4-5", "codeSnippet": "python_list = [...]; numpy_array = np.array(...)", "explanation": "Creates a standard Python list and converts it into a typed NumPy ndarray."},
        {"lines": "9-10", "codeSnippet": "print(numpy_array.dtype, numpy_array.shape)", "explanation": "Inspects the data type (e.g. int64) and dimensional tuple (5,) of the array."}
    ],
    hyperparameters=[
        {"name": "dtype", "defaultVal": "None (inferred)", "range": "int32, int64, float32, float64, etc.", "effect": "Determines precision and RAM usage per element", "recommendation": "Use float32 for deep learning, float64 for high-precision scientific analysis."}
    ],
    assumptions=[
        {"assumption": "Homogeneity", "whyItMatters": "All elements must have the same data type.", "howToVerify": "Check array.dtype to confirm expected numerical representation."}
    ],
    commonMistakes=[
        {"mistake": "Mixing strings and numbers in np.array([1, 2, 'hello'])", "solution": "NumPy upcasts all elements to strings (Unicode), ruining math operations.", "whyWrong": "Arrays must be uniform; strings force all numbers to become text.", "howToFix": "Keep numerical data separate from text identifiers."}
    ],
    realWorldUseCases=[
        {"industry": "Finance", "application": "Algorithmic Trading", "benefit": "Processes millions of tick prices with sub-millisecond latency."},
        {"industry": "Healthcare", "application": "Medical Imaging (MRI/CT)", "benefit": "Manipulates 3D voxel arrays containing millions of scan points."}
    ],
    practiceQuestions=[
        {"id": "pq1", "question": "Why is a NumPy array faster than a Python list for numerical calculations?", "hint": "Think about memory contiguity and type checks.", "answer": "NumPy stores uniform data contiguously in RAM, allowing vectorized CPU instructions to run without per-element type checks or pointer dereferencing."},
        {"id": "pq2", "question": "What is the default alias used worldwide when importing NumPy?", "hint": "Short 2-letter abbreviation.", "answer": "The alias is 'np' via 'import numpy as np'."},
        {"id": "pq3", "question": "What happens if you pass a list of mixed floats and integers to np.array()?", "hint": "Type coercion rule.", "answer": "NumPy will automatically upcast the integers to floats to maintain data homogeneity without losing precision."}
    ],
    quiz=[
        {
            "id": "q1",
            "question": "What distinguishes a NumPy ndarray from a standard Python list?",
            "options": [
                "NumPy arrays store elements of identical type in contiguous memory.",
                "Python lists only store numbers, while NumPy arrays store everything.",
                "NumPy arrays are always slower because they run in C.",
                "NumPy arrays do not allow indexing or slicing."
            ],
            "correctIndex": 0,
            "explanation": "Homogeneous data types stored contiguously in memory give NumPy arrays their speed and efficiency."
        },
        {
            "id": "q2",
            "question": "Which array attribute reveals the number of elements along each dimension?",
            "options": ["size", "shape", "ndim", "dtype"],
            "correctIndex": 1,
            "explanation": "The 'shape' attribute returns a tuple indicating the length of each dimension."
        },
        {
            "id": "q3",
            "question": "If an array has shape (4, 3), how many total elements does it contain?",
            "options": ["7", "12", "4", "3"],
            "correctIndex": 1,
            "explanation": "4 rows multiplied by 3 columns equals 12 total elements."
        }
    ],
    independentExercise={
        "title": "Create and Inspect a 1D Exam Score Array",
        "problem": "Create a NumPy array containing the numbers [85, 90, 78, 92, 88]. Print the array, its shape, its data type, and the total number of elements using its attributes.",
        "difficulty": "Beginner",
        "hints": ["Use np.array([...])", "Check .shape, .dtype, and .size attributes"],
        "starterCode": "import numpy as np\n\n# Your code here:\nscores = ...\n",
        "solution": "import numpy as np\nscores = np.array([85, 90, 78, 92, 88])\nprint('Array:', scores)\nprint('Shape:', scores.shape)\nprint('Dtype:', scores.dtype)\nprint('Total elements:', scores.size)"
    },
    summary={
        "keyTakeaways": [
            "NumPy is the foundational numerical computing engine for Python data science.",
            "Contiguous memory layout and uniform dtypes enable CPU-speed vectorization.",
            "Core attributes to memorize: .shape, .ndim, .size, and .dtype."
        ],
        "nextLessonId": "numpy-m1-l2",
        "nextLessonTitle": "Python Lists vs NumPy Arrays (Performance, Memory & Homogeneity)",
        "nextLessonModuleId": "numpy-module-1"
    }
)
m1_lessons[l1["id"]] = l1
m1_summaries.append({
    "id": l1["id"],
    "moduleId": l1["moduleId"],
    "title": l1["title"],
    "description": l1["subtitle"],
    "order": l1["order"],
    "readTimeMinutes": l1["readTimeMinutes"],
    "visualizerType": l1["visualizerType"],
    "difficulty": l1["difficulty"]
})

print(f"Authored {l1['id']}: {l1['title']}")

