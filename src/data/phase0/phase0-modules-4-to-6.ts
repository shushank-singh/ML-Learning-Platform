import { LessonContent, ModuleData } from '@/lib/types';

// =========================================================================
// MODULE 0.4: NumPy, Pandas & Data Handling Assessment
// =========================================================================
export const phase0Mod4Data: ModuleData = {
  id: 'phase-0-mod-4',
  number: 0.4,
  title: 'NumPy, Pandas & Data Handling Assessment',
  subtitle: 'Diagnostic Assessment of Vectorization, Array Strides, Broadcasting & DataFrame Wrangling',
  description:
    'Evaluate your data manipulation proficiency before training machine learning models. Test your readiness in multidimensional NumPy array slicing, stride mechanics, automatic broadcasting rules, and Pandas DataFrame aggregations.',
  icon: 'Layers',
  badge: 'Phase 0 · Diagnostic',
  estimatedHours: 1,
  topicsCount: 1,
  lessons: [
    {
      id: 'p0-numpy-pandas-diagnostic',
      moduleId: 'phase-0-mod-4',
      title: 'NumPy & Pandas Diagnostic: Broadcasting, Indexing & Data Wrangling',
      description:
        'Diagnostic check covering contiguous array memory, broadcasting dimensions, boolean masking, vectorization vs loops, and missing value handling in Pandas.',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'numpy-interactive',
      difficulty: 'Beginner',
    },
  ],
};

export const p0Mod4Lessons: Record<string, LessonContent> = {
  'p0-numpy-pandas-diagnostic': {
    id: 'p0-numpy-pandas-diagnostic',
    moduleId: 'phase-0-mod-4',
    title: 'NumPy & Pandas Diagnostic: Broadcasting, Indexing & Data Wrangling',
    subtitle: 'Assessing Vectorized Computation, Memory Buffers, Broadcasting Rules & Tabular Transformation',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Beginner',
    visualizerType: 'numpy-interactive',
    objectives: [
      'Understand how NumPy contiguous memory buffers and C-strides deliver 50x-100x acceleration over native Python lists.',
      'Master the strict two-rule broadcasting mechanism allowing arithmetic across different array shapes.',
      'Differentiate between array views (zero-copy memory slices) and memory copies.',
      'Perform essential Pandas operations: missing value imputation, type casting, boolean filtering, and groupby aggregations.',
    ],
    prerequisites: ['Phase 0.3: Python Prerequisite Assessment.'],
    previousLesson: {
      id: 'p0-python-diagnostic',
      title: 'Module 0.3: Python Prerequisite Assessment',
      moduleId: 'phase-0-mod-3',
    },
    analogy: {
      title: 'The Industrial Assembly Line vs Individual Hand Delivery',
      text: 'Imagine moving 10,000 postal packages. The naive Python approach is sending an individual courier who walks to a warehouse shelf, picks up package #1, walks back, unpacks it, inspects its type tag, performs an action, and repeats this 10,000 times with enormous overhead. NumPy is an automated industrial conveyor belt where packages of identical known size (e.g. 64-bit floats) are laid out shoulder-to-shoulder in a contiguous physical memory strip. The CPU vector engine (SIMD) processes 4 or 8 numbers in a single clock cycle without checking data types or pointer indirections.',
      metaphor: 'Python lists are boxes of scattered pointers; NumPy arrays are tightly packed, contiguous memory blocks designed for vector pipelines.',
    },
    problemSolved: {
      title: 'Eliminating Slow Python For-Loops in Data Pipelines',
      description:
        'Writing explicit nested loops in pure Python to scale, normalize, or multiply feature matrices is hundreds of times slower than compiled C/Fortran vectorization. Machine learning algorithms operating on thousands of samples will grind to a halt unless computations are expressed in vectorized array primitives.',
      keyPoints: [
        'NumPy arrays are homogeneous: every element shares the exact same memory dtype (e.g. float64, int32).',
        'Broadcasting eliminates the need to manually copy or tile smaller arrays across larger dimensions.',
        'Slicing an array creates a view sharing the original memory buffer, preventing accidental RAM exhaustion.',
        'Pandas builds upon NumPy to provide labeled two-dimensional tables (DataFrames) with rich missing-data handling.',
      ],
    },
    intuition: {
      overview:
        'NumPy vectorization shifts iteration from the slow interpreted Python bytecode layer into pre-compiled, optimized C and BLAS (Basic Linear Algebra Subprograms) routines.',
      steps: [
        {
          step: 1,
          title: 'Homogeneous Contiguous Memory Buffers',
          description:
            'A NumPy array is a continuous memory pointer plus metadata: shape, dtype, and strides (byte jumps required to advance one element along each axis).',
        },
        {
          step: 2,
          title: 'Broadcasting Rules',
          description:
            'When operating on two arrays of different shapes, NumPy compares dimensions from right to left (trailing axes). Two dimensions are compatible if they are equal, or if one of them is 1.',
        },
        {
          step: 3,
          title: 'Views vs Copies',
          description:
            'Basic slicing (a[1:5]) creates a view sharing memory. Modifying a slice alters the parent array. Fancy indexing (a[[0, 2]]) creates a brand new copy.',
        },
        {
          step: 4,
          title: 'Pandas Alignment on Index',
          description:
            'Unlike raw NumPy arrays where operations are positional, Pandas DataFrames and Series align automatically on labeled index keys before applying arithmetic.',
        },
      ],
    },
    mathematics: {
      overview:
        'Memory stride arithmetic and broadcasting compatibility form the mathematical foundation of array operations.',
      foundations: [
        {
          name: 'Memory Offset Stride Formula',
          latex: '\\text{Byte Offset}(i, j) = i \\cdot s_0 + j \\cdot s_1',
          explanation:
            'To access element (i, j) in a 2D array, the CPU jumps i * s_0 + j * s_1 bytes from the base pointer, where s_0 and s_1 are the row and column strides.',
        },
        {
          name: 'Vectorized Mean Normalization',
          latex: '\\mathbf{X}_{\\text{norm}} = \\frac{\\mathbf{X} - \\boldsymbol{\\mu}}{\\boldsymbol{\\sigma}}, \\quad \\boldsymbol{\\mu} = \\frac{1}{m}\\sum_{i=1}^m \\mathbf{x}^{(i)}, \\quad \\boldsymbol{\\sigma} = \\sqrt{\\frac{1}{m}\\sum_{i=1}^m (\\mathbf{x}^{(i)} - \\boldsymbol{\\mu})^2}',
          explanation:
            'Subtracting a (1, D) mean vector from an (m, D) data matrix broadcasts mu across all m rows simultaneously in a single vectorized step.',
        },
      ],
    },
    derivation: {
      title: 'Broadcasting Dimension Compatibility Check',
      objective: 'Step through the formal right-to-left dimension matching algorithm.',
      steps: [
        {
          step: 1,
          label: 'Align Shapes from Trailing Dimension',
          latex: '\\text{Shape A: } (M, 1, K), \\quad \\text{Shape B: } (N, K)',
          explanation:
            'Pad the smaller shape on the left with 1s: Shape B becomes (1, N, K).',
        },
        {
          step: 2,
          label: 'Verify Compatibility on Every Axis',
          latex: '\\text{Axis 2: } K = K \\, \\checkmark, \\quad \\text{Axis 1: } 1 \\text{ vs } N \\, \\checkmark, \\quad \\text{Axis 0: } M \\text{ vs } 1 \\, \\checkmark',
          explanation:
            'Along every axis, dimensions either match exactly or one of them equals 1.',
        },
        {
          step: 3,
          label: 'Determine Output Shape',
          latex: '\\text{Output Shape} = (\\max(M, 1), \\max(1, N), \\max(K, K)) = (M, N, K)',
          explanation:
            'The resulting tensor has dimensions equal to the maximum along each coordinate axis.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathbf{X}', name: 'Feature Matrix', description: 'Data matrix containing m samples and D features', dimensions: '(m, D)' },
      { symbol: '\\boldsymbol{\\mu}', name: 'Mean Feature Vector', description: 'Column-wise average vector', dimensions: '(1, D)' },
      { symbol: 's_k', name: 'Stride along Axis k', description: 'Byte step size to advance index by 1 along axis k', dimensions: 'Bytes (Integer)' },
    ],
    numericalExample: {
      scenario: 'Normalizing a 3x2 matrix by subtracting feature column means.',
      dataset: [
        { sample: 'Row 0', feature_1: 10, feature_2: 200 },
        { sample: 'Row 1', feature_1: 20, feature_2: 400 },
        { sample: 'Row 2', feature_1: 30, feature_2: 600 },
      ],
      calculations: [
        {
          step: 'Compute Column Means (axis=0)',
          math: '\\mu_1 = \\frac{10+20+30}{3} = 20, \\quad \\mu_2 = \\frac{200+400+600}{3} = 400',
          result: 'mu = [20, 400]',
        },
        {
          step: 'Broadcast Subtraction X - mu',
          math: '\\begin{bmatrix} 10-20 & 200-400 \\\\ 20-20 & 400-400 \\\\ 30-20 & 600-400 \\end{bmatrix} = \\begin{bmatrix} -10 & -200 \\\\ 0 & 0 \\\\ 10 & 200 \\end{bmatrix}',
          result: 'Centered Matrix (3, 2)',
        },
      ],
      finalConclusion:
        'Broadcasting subtracted the (2,) mean vector across all 3 rows automatically without any explicit loops.',
    },
    visualExplanation: {
      title: 'NumPy Broadcasting & Stride Layout',
      description:
        'Visualizing 2D array memory buffers, row-major (C-order) contiguous layout, and dimension expansion.',
      features: [
        'Contiguous C-Memory: Elements (0,0), (0,1), (1,0), (1,1) stored sequentially in physical RAM.',
        'Broadcasting Expansion: A (1, D) row vector is virtually duplicated along axis 0 with stride 0 (no memory copied).',
        'Pandas DataFrame Structure: Columnar Series dictionary backed by 2D NumPy blocks with labeled Index and Column headers.',
      ],
    },
    scratchCode: {
      title: 'NumPy Diagnostic: Broadcasting & Vectorization in Action',
      code: `import numpy as np

# Diagnostic 1: Vectorized Standard Scaler
X = np.array([
    [10.0, 200.0],
    [20.0, 400.0],
    [30.0, 600.0]
])

# Compute mean and standard deviation along columns (axis=0)
mean = np.mean(X, axis=0)  # Shape (2,)
std = np.std(X, axis=0)    # Shape (2,)

# Broadcasted standard scaling: (3, 2) - (2,) / (2,)
X_scaled = (X - mean) / std

print("Column Means:", mean)
print("Column Stds:", std)
print("Standardized Matrix:\n", X_scaled)

# Diagnostic 2: Boolean Masking & Conditional Filtering
mask = X[:, 0] >= 20.0
filtered_rows = X[mask]
print("Rows with Feature 0 >= 20:\n", filtered_rows)
`,
      explanation:
        'Demonstrates axis-based reductions, broadcasted arithmetic, and boolean masking without explicit loops.',
    },
    sklearnCode: {
      title: 'Pandas Data Handling & Missing Imputation',
      code: `import pandas as pd
import numpy as np

# Diagnostic: Pandas DataFrame Cleaning
raw_data = {
    'age': [25, np.nan, 45, 35, np.nan],
    'income': [50000, 65000, np.nan, 80000, 52000],
    'city': ['NY', 'SF', 'NY', 'SF', 'NY']
}

df = pd.DataFrame(raw_data)

# Impute numerical missing values with column median
df['age'] = df['age'].fillna(df['age'].median())
df['income'] = df['income'].fillna(df['income'].median())

# GroupBy Aggregation
city_summary = df.groupby('city').agg({'age': 'mean', 'income': 'mean'})

print("Cleaned DataFrame:\n", df)
print("\nCity Aggregations:\n", city_summary)
`,
      explanation:
        'Demonstrates essential Pandas data hygiene: median imputation and grouped aggregations.',
    },
    runnableCode: {
      code: `import numpy as np

def test_broadcasting_rules():
    A = np.ones((4, 1, 5))
    B = np.ones((3, 5))
    # Shape A: (4, 1, 5)
    # Shape B: (1, 3, 5)
    # Result : (4, 3, 5)
    C = A + B
    print("Array A shape:", A.shape)
    print("Array B shape:", B.shape)
    print("Broadcasted sum C shape:", C.shape)
    assert C.shape == (4, 3, 5)
    print("✓ Broadcasting rule test PASSED!")

test_broadcasting_rules()
`,
      expectedOutput: `Array A shape: (4, 1, 5)
Array B shape: (3, 5)
Broadcasted sum C shape: (4, 3, 5)
✓ Broadcasting rule test PASSED!`,
    },
    lineByLineExplanation: [
      {
        lines: '1-3',
        codeSnippet: 'A = np.ones((4, 1, 5)); B = np.ones((3, 5))',
        explanation: 'Initializes two tensors of differing dimensions.',
      },
      {
        lines: '4-7',
        codeSnippet: 'C = A + B',
        explanation: 'NumPy automatically prepends 1 to B -> (1, 3, 5) and matches (4, 1, 5) to create (4, 3, 5).',
      },
      {
        lines: '8-11',
        codeSnippet: 'assert C.shape == (4, 3, 5)',
        explanation: 'Verifies the resulting broadcasted tensor dimensions.',
      },
    ],
    hyperparameters: [
      {
        name: 'Memory Layout (Order)',
        defaultVal: 'C-contiguous (row-major)',
        range: 'C (row-major) vs Fortran (column-major)',
        effect: 'Determines which axis iteration enjoys CPU L1/L2 cache prefetching.',
        recommendation: 'Use row-major order for machine learning sample-first tensors (N, D).',
      },
    ],
    assumptions: [
      {
        assumption: 'Fixed Datatype Homogeneity',
        whyItMatters: 'NumPy arrays cannot hold mixed strings and floats without falling back to slow object dtype pointers.',
        howToVerify: 'Inspect arr.dtype — avoid dtype=object.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using Python for-loops to iterate over rows in a DataFrame or NumPy array',
        solution: 'Use vectorized operations or df.apply() only as a last resort.',
        whyWrong: 'Iterating over 100,000 rows with for i in range(...) takes 10 seconds vs 0.005 seconds vectorized.',
        howToFix: 'Express the operation as array arithmetic (e.g. df["a"] * df["b"]).',
      },
      {
        mistake: 'Accidentally mutating a parent array through an unintended view slice',
        solution: 'Use sub_array = arr[1:5].copy() if you intend to modify the slice independently.',
        whyWrong: 'Standard slicing creates a view; changes to sub_array silently corrupt the original array.',
        howToFix: 'Always call .copy() when creating an isolated working copy.',
      },
    ],
    realWorldUseCases: [
      {
        industry: 'Quantitative Finance & Trading',
        application: 'High-Frequency Risk Matrix Calculations',
        benefit: 'Vectorized covariance calculations process millions of market ticks per second.',
      },
    ],
    practiceQuestions: [
      {
        id: 'p0-np-q1',
        question: 'Can an array of shape (5, 1) and an array of shape (1, 4) be added together in NumPy?',
        hint: 'Apply the two broadcasting rules from right to left.',
        answer: 'Yes. The resulting array will have shape (5, 4).',
        explanation:
          'Along axis 1, 1 and 4 are compatible (max is 4). Along axis 0, 5 and 1 are compatible (max is 5).',
      },
    ],
    quiz: [
      {
        id: 'p0-np-quiz-1',
        question: 'What is the fundamental reason NumPy vectorized operations are dramatically faster than Python loops?',
        options: [
          'NumPy converts all Python code into cloud API requests.',
          'NumPy arrays are stored in contiguous C-memory with known data types, allowing CPU SIMD vector registers to process multiple values per cycle without interpreter overhead.',
          'NumPy eliminates the need for computer RAM.',
          'NumPy runs only on graphics processing units (GPUs).',
        ],
        correctIndex: 1,
        explanation:
          'Contiguous memory and uniform typing allow compiled C routines and SIMD instructions to operate without Python object pointer dereferencing.',
      },
      {
        id: 'p0-np-quiz-2',
        question: 'Given an array a = np.array([10, 20, 30, 40]), what happens if you run b = a[1:3]; b[0] = 999?',
        options: [
          'b becomes [999, 30] and a remains unchanged.',
          'An IndexError is raised.',
          'b becomes [999, 30] and a[1] also becomes 999, because basic slicing creates a view into original memory.',
          'a is deleted from memory.',
        ],
        correctIndex: 2,
        explanation:
          'Basic slices in NumPy are views sharing the underlying buffer. To avoid mutating a, you must use b = a[1:3].copy().',
      },
    ],
    independentExercise: {
      title: 'Vectorized Min-Max Normalizer',
      problem:
        'Write a function `min_max_scale(matrix)` that normalizes every column of a 2D NumPy array into the range [0.0, 1.0] using pure vectorization.',
      hints: ['col_min = np.min(matrix, axis=0)', 'col_max = np.max(matrix, axis=0)', 'denom = col_max - col_min'],
      starterCode: `import numpy as np

def min_max_scale(matrix: np.ndarray) -> np.ndarray:
    # TODO: Implement vectorized scaling
    pass

X = np.array([[1.0, 100.0], [3.0, 200.0], [5.0, 300.0]])
print("Normalized:\\n", min_max_scale(X))
`,
      solution: `import numpy as np

def min_max_scale(matrix: np.ndarray) -> np.ndarray:
    col_min = np.min(matrix, axis=0)
    col_max = np.max(matrix, axis=0)
    denom = col_max - col_min
    # Handle zero-variance constant columns
    denom[denom == 0] = 1.0
    return (matrix - col_min) / denom
`,
    },
    summary: {
      keyTakeaways: [
        'NumPy arrays provide contiguous C-order memory buffers enabling vector SIMD instructions.',
        'Broadcasting compares shapes from right to left; dimensions match if equal or if one is 1.',
        'Basic slices create views; fancy indexing creates copies. Call .copy() to decouple state.',
        'Pandas automates column-wise label alignment and robust missing value imputation.',
      ],
      nextLessonId: 'p0-math-diagnostic',
      nextLessonTitle: 'Module 0.5: Linear Algebra, Calculus & Statistics Diagnostic',
      nextLessonModuleId: 'phase-0-mod-5',
    },
  },
};

// =========================================================================
// MODULE 0.5: Linear Algebra, Calculus & Statistics Diagnostic
// =========================================================================
export const phase0Mod5Data: ModuleData = {
  id: 'phase-0-mod-5',
  number: 0.5,
  title: 'Linear Algebra, Calculus & Statistics Diagnostic',
  subtitle: 'Vectors, Matrix Transformations, Gradients, Chain Rule, Probability & Distributions',
  description:
    'Evaluate your mathematical readiness for machine learning algorithms. Self-diagnose your mastery of dot products, matrix multiplication, partial derivatives, gradient descent updates, and Gaussian probability distributions.',
  icon: 'Calculator',
  badge: 'Phase 0 · Diagnostic',
  estimatedHours: 1,
  topicsCount: 1,
  lessons: [
    {
      id: 'p0-math-diagnostic',
      moduleId: 'phase-0-mod-5',
      title: 'Mathematics Diagnostic: Linear Algebra, Calculus & Probability',
      description:
        'Diagnostic self-assessment covering vector projections, matrix products, multivariable gradients, cost function optimization, and probability distributions.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'gradient-descent',
      difficulty: 'Beginner',
    },
  ],
};

export const p0Mod5Lessons: Record<string, LessonContent> = {
  'p0-math-diagnostic': {
    id: 'p0-math-diagnostic',
    moduleId: 'phase-0-mod-5',
    title: 'Mathematics Diagnostic: Linear Algebra, Calculus & Probability',
    subtitle: 'Assessing Linear Projections, Matrix Transformations, Partial Derivatives & Probability Axioms',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Beginner',
    visualizerType: 'gradient-descent',
    objectives: [
      'Evaluate proficiency in vector dot products, cosine similarities, and matrix multiplication dimensions.',
      'Test multivariable calculus: partial derivatives, the gradient vector, and the chain rule of differentiation.',
      'Verify understanding of gradient descent parameter optimization: learning rate alpha and cost landscapes.',
      'Assess probability fundamentals: random variables, expectation, variance, Bayes theorem, and normal distributions.',
    ],
    prerequisites: ['High school algebra and coordinate geometry.'],
    previousLesson: {
      id: 'p0-numpy-pandas-diagnostic',
      title: 'Module 0.4: NumPy, Pandas & Data Handling Assessment',
      moduleId: 'phase-0-mod-4',
    },
    analogy: {
      title: 'The Blind Hiker in the Foggy Mountain Valley',
      text: 'Imagine you are a hiker blindfolded in a dense mountain fog. Your goal is to reach the lowest cabin in the valley basin (the minimum of the loss function). You cannot see the landscape, but with your boots, you can feel the local slope of the ground beneath your feet (the partial derivatives). The direction of steepest ascent points uphill; taking a step in the exact opposite direction (negative gradient) moves you downhill toward the basin. The size of your stride is the learning rate alpha. If your stride is too small, you take days to reach the cabin; if your stride is giant, you leap across mountain peaks and fall off the cliff into divergence.',
      metaphor: 'Calculus gives the hiker the direction of the slope; linear algebra describes the coordinates of the mountain; probability quantifies the sensor noise.',
    },
    problemSolved: {
      title: 'Diagnosing Mathematical Roadblocks Early',
      description:
        'Machine learning algorithms are not arbitrary code recipes; they are closed-form linear algebra formulas and gradient optimization steps. Pinpointing whether you need to brush up on matrix dimensions, derivatives, or probability distributions prevents frustration when deriving backpropagation or Support Vector Machines.',
      keyPoints: [
        'Linear Algebra represents datasets (matrices), weights (vectors), and transformations (projections).',
        'Calculus determines how model weights must adjust to reduce prediction errors.',
        'Optimization algorithms navigate high-dimensional cost surfaces toward global or local minima.',
        'Probability and Statistics handle real-world data uncertainty, noise, and probabilistic predictions.',
      ],
    },
    intuition: {
      overview:
        'All classical and modern machine learning models operate at the intersection of three mathematical branches: linear algebra (representation), calculus (learning), and probability (inference).',
      steps: [
        {
          step: 1,
          title: 'Linear Algebra: Geometric Representations',
          description:
            'Data points are vectors in D-dimensional feature space. The dot product u . v measures directional alignment (cosine similarity). Matrix multiplication transforms one coordinate space into another.',
        },
        {
          step: 2,
          title: 'Calculus: Rates of Change & Gradients',
          description:
            'A derivative measures how output changes with respect to input. In multivariable models, the gradient vector collects all partial derivatives: nabla J = [dJ/dw1, dJ/dw2, ..., dJ/dwD].',
        },
        {
          step: 3,
          title: 'Optimization: Descent on Loss Landscapes',
          description:
            'Models iteratively update parameters: theta := theta - alpha * nabla J(theta). Convex functions (like linear regression MSE) have a single guaranteed global minimum.',
        },
        {
          step: 4,
          title: 'Probability: Modeling Noise and Likelihood',
          description:
            'Classifiers output probability scores in [0, 1]. Maximum Likelihood Estimation (MLE) chooses model weights that maximize the observed probability of the training data.',
        },
      ],
    },
    mathematics: {
      overview:
        'Core mathematical formulations that power 95% of machine learning algorithms.',
      foundations: [
        {
          name: 'Vector Dot Product & Cosine Similarity',
          latex: '\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^D u_i v_i = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos(\\theta)',
          explanation:
            'The dot product measures the projection of vector u onto vector v. When normalized by vector lengths, it yields cosine similarity in [-1, 1].',
        },
        {
          name: 'Multivariable Gradient Vector',
          latex: '\\nabla f(\\mathbf{x}) = \\left[ \\frac{\\partial f}{\\partial x_1}, \\frac{\\partial f}{\\partial x_2}, \\dots, \\frac{\\partial f}{\\partial x_D} \\right]^T',
          explanation:
            'The gradient points in the direction of greatest rate of increase of the function. Its magnitude indicates the steepness of the slope.',
        },
        {
          name: 'Gaussian (Normal) Distribution PDF',
          latex: 'p(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)',
          explanation:
            'The bell curve parameterized by mean mu (center) and variance sigma^2 (spread), governing errors under the Central Limit Theorem.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Mean Squared Error Gradient',
      objective: 'Derive the exact gradient for simple linear regression: J(w) = (1/2m) sum (w*x - y)^2.',
      steps: [
        {
          step: 1,
          label: 'Define Residual Error',
          latex: 'e^{(i)} = f(x^{(i)}; w) - y^{(i)} = (w x^{(i)} - y^{(i)})',
          explanation:
            'The error between predicted value and true label for sample i.',
        },
        {
          step: 2,
          label: 'Apply the Chain Rule to Squared Residual',
          latex: '\\frac{\\partial}{\\partial w} \\left( \\frac{1}{2} (e^{(i)})^2 \\right) = e^{(i)} \\cdot \\frac{\\partial e^{(i)}}{\\partial w} = (w x^{(i)} - y^{(i)}) \\cdot x^{(i)}',
          explanation:
            'The power rule brings down 2 (canceling the 1/2 factor), and the derivative of (w*x - y) with respect to w is x.',
        },
        {
          step: 3,
          label: 'Sum Across All m Training Samples',
          latex: '\\frac{\\partial J(w)}{\\partial w} = \\frac{1}{m} \\sum_{i=1}^m \\left( w x^{(i)} - y^{(i)} \\right) x^{(i)}',
          explanation:
            'The final gradient is the average of prediction errors weighted by feature values.',
        },
      ],
    },
    variables: [
      { symbol: '\\nabla J(\\mathbf{w})', name: 'Gradient Vector', description: 'Vector of partial derivatives of cost with respect to weights', dimensions: '(D, 1)' },
      { symbol: '\\|\\mathbf{v}\\|', name: 'Euclidean L2 Norm', description: 'Geometric length of vector: sqrt(sum v_i^2)', dimensions: 'Scalar >= 0' },
      { symbol: '\\mu, \\sigma', name: 'Mean and Std Dev', description: 'Parameters of the normal distribution', dimensions: 'Scalars' },
    ],
    numericalExample: {
      scenario: 'Calculating one step of Gradient Descent by hand for w on 2 points: (x=1, y=2) and (x=2, y=4). Initial w = 0, alpha = 0.1.',
      dataset: [
        { sample: 'Point 1', x: 1, y: 2, prediction_w0: 0, error: -2 },
        { sample: 'Point 2', x: 2, y: 4, prediction_w0: 0, error: -4 },
      ],
      calculations: [
        {
          step: 'Compute Sample Gradients: error * x',
          math: 'g_1 = (-2) \\cdot 1 = -2, \\quad g_2 = (-4) \\cdot 2 = -8',
          result: 'g_total = -10',
        },
        {
          step: 'Average Gradient across m=2 samples',
          math: '\\nabla J(w) = \\frac{-2 + (-8)}{2} = -5.0',
          result: '-5.0',
        },
        {
          step: 'Perform Weight Update w := w - alpha * gradient',
          math: 'w_{\\text{new}} = 0 - (0.1) \\cdot (-5.0) = 0 + 0.5 = 0.5',
          result: 'w = 0.5 (Moved toward true slope 2.0)',
        },
      ],
      finalConclusion:
        'In one step, w updated from 0.0 to 0.5, moving directly in the direction of the true relationship y = 2x.',
    },
    visualExplanation: {
      title: 'The 3D Cost Bowl & Gradient Descent Vector Step',
      description:
        'Visualizing the convex parabolic loss surface J(w1, w2) and the orthogonal descent direction.',
      features: [
        'Convex Paraboloid Bowl: The global minimum rests at the lowest center point of the bowl.',
        'Contour Ellipses: Level sets of constant loss where the gradient vector is always perpendicular to the contour line.',
        'Descent Trajectory: Successive parameter updates moving downhill toward zero gradient.',
      ],
    },
    scratchCode: {
      title: 'Python Numerical Gradient Verification Check',
      code: `import numpy as np

# Scalar test function: f(x) = x^3 - 4x + 2
def f(x):
    return x**3 - 4*x + 2

# Analytical Derivative: f'(x) = 3x^2 - 4
def df_analytical(x):
    return 3 * x**2 - 4

# Numerical Finite Difference Approximation
def df_numerical(f, x, epsilon=1e-5):
    # Two-sided symmetric difference: (f(x+h) - f(x-h)) / (2h)
    return (f(x + epsilon) - f(x - epsilon)) / (2 * epsilon)

test_x = 3.0
analytical = df_analytical(test_x)
numerical = df_numerical(f, test_x)
diff = abs(analytical - numerical)

print(f"Test at x = {test_x}:")
print(f"Analytical Derivative : {analytical:.6f}")
print(f"Numerical Difference  : {numerical:.6f}")
print(f"Absolute Difference   : {diff:.2e}")
print("✓ Gradient check passed!" if diff < 1e-4 else "Discrepancy detected.")
`,
      explanation:
        'Verifies mathematical derivatives against finite-difference numerical approximations used in neural network gradient checks.',
    },
    sklearnCode: {
      title: 'Computing Dot Products & Cosine Similarities in Python',
      code: `import numpy as np

u = np.array([1.0, 2.0, 3.0])
v = np.array([4.0, 5.0, 6.0])

# Vector Dot Product
dot_val = np.dot(u, v)

# Norms (Lengths)
norm_u = np.linalg.norm(u)
norm_v = np.linalg.norm(v)

# Cosine Similarity
cosine_sim = dot_val / (norm_u * norm_v)

print(f"Vector u: {u}")
print(f"Vector v: {v}")
print(f"Dot Product u . v: {dot_val:.2f}")
print(f"Cosine Similarity : {cosine_sim:.4f}")
`,
      explanation:
        'Computes geometric vector alignment and cosine similarity used extensively in modern vector search and embeddings.',
    },
    runnableCode: {
      code: `def math_prerequisite_quiz():
    results = []
    
    # Check 1: Matrix multiplication dimension rule
    # Can (3, 4) multiply (4, 2)? Inner dimensions match (4 == 4) -> Result (3, 2)
    can_multiply = (4 == 4)
    results.append(("Matrix Dimensions (3,4) @ (4,2)", can_multiply))
    
    # Check 2: Derivative of x^2 at x=5 is 2x = 10
    d_x2 = 2 * 5
    results.append(("Derivative of x^2 at 5 is 10", d_x2 == 10))
    
    # Check 3: Sum of probabilities in a valid discrete distribution must equal 1.0
    p_dist = [0.2, 0.5, 0.3]
    results.append(("Sum of probabilities equals 1.0", round(sum(p_dist), 2) == 1.0))
    
    for label, passed in results:
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {label}")

math_prerequisite_quiz()
`,
      expectedOutput: `✓ PASS: Matrix Dimensions (3,4) @ (4,2)
✓ PASS: Derivative of x^2 at 5 is 10
✓ PASS: Sum of probabilities equals 1.0`,
    },
    lineByLineExplanation: [
      {
        lines: '1-6',
        codeSnippet: 'can_multiply = (4 == 4)',
        explanation: 'Validates that matrix inner dimensions must match for multiplication (A: M x K, B: K x N).',
      },
      {
        lines: '7-11',
        codeSnippet: 'd_x2 = 2 * 5',
        explanation: 'Tests basic power-rule differentiation d/dx(x^2) = 2x.',
      },
      {
        lines: '12-16',
        codeSnippet: 'round(sum(p_dist), 2) == 1.0',
        explanation: 'Tests probability normalization axiom.',
      },
    ],
    hyperparameters: [
      {
        name: 'Learning Rate (alpha)',
        defaultVal: '0.01',
        range: '0.0001 - 0.5',
        effect: 'Controls the step size taken along the negative gradient vector.',
        recommendation: 'Use small values (0.001 - 0.01) with Adam or learning rate decay schedules.',
      },
    ],
    assumptions: [
      {
        assumption: 'Differentiability of Loss Function',
        whyItMatters: 'Gradient descent requires the loss function to be differentiable (or sub-differentiable) with respect to model weights.',
        howToVerify: 'Verify that cost function derivatives exist across the parameter domain.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Multiplying two matrices of shapes (3, 4) and (3, 4) using np.dot(A, B)',
        solution: 'For matrix multiplication, inner dimensions must match: A @ B.T or (3, 4) @ (4, 3).',
        whyWrong: 'Element-wise multiplication requires identical shapes (A * B); matrix dot products require (M, K) @ (K, N).',
        howToFix: 'Transpose the second matrix or reshape dimensions with .T.',
      },
      {
        mistake: 'Using a learning rate that is too large, causing cost to explode to NaN',
        solution: 'Scale down alpha by 10x (e.g. 0.1 -> 0.01) and normalize input features.',
        whyWrong: 'An oversized step overshoots the minimum and lands higher on the opposite slope, compounding exponentially.',
        howToFix: 'Standardize inputs with StandardScaler and monitor loss per epoch.',
      },
    ],
    realWorldUseCases: [
      {
        industry: 'Robotics & Autonomous Systems',
        application: 'Sensor Fusion & Trajectory Planning',
        benefit: 'Kalman filtering utilizes matrix transformations and Gaussian probability updates to estimate vehicle state.',
      },
    ],
    practiceQuestions: [
      {
        id: 'p0-math-q1',
        question: 'What are the dimensions of the product matrix C = A @ B if A has shape (5, 3) and B has shape (3, 7)?',
        hint: 'Inner dimensions collapse; outer dimensions determine resulting shape.',
        answer: 'The product matrix C will have shape (5, 7).',
        explanation:
          'Matrix multiplication of (M, K) by (K, N) produces an (M, N) matrix.',
      },
    ],
    quiz: [
      {
        id: 'p0-math-quiz-1',
        question: 'If the partial derivative of cost J with respect to weight w1 is positive (dJ/dw1 = +4.5), which direction should w1 move to reduce cost?',
        options: [
          'w1 should increase (move in positive direction).',
          'w1 should decrease (move in negative direction).',
          'w1 should be reset to zero immediately.',
          'w1 has no influence on the cost.',
        ],
        correctIndex: 1,
        explanation:
          'Because the derivative is positive, increasing w1 increases cost. Gradient descent moves opposite to the derivative: w1 := w1 - alpha * (+4.5), decreasing w1.',
      },
      {
        id: 'p0-math-quiz-2',
        question: 'What does a vector dot product equal to 0 between two non-zero vectors signify geometrically?',
        options: [
          'The two vectors are pointing in identical directions.',
          'The two vectors are perpendicular (orthogonal) to each other (angle = 90 degrees).',
          'The two vectors have zero length.',
          'The two vectors are parallel.',
        ],
        correctIndex: 1,
        explanation:
          'u . v = ||u|| ||v|| cos(theta). Since lengths are non-zero, cos(theta) = 0, which means theta = 90 degrees (orthogonal).',
      },
    ],
    independentExercise: {
      title: 'Hand-Coded Linear Gradient Descent Step',
      problem:
        'Write a function `single_gradient_step(w, b, X, y, alpha)` that performs one iteration of gradient descent on 1D feature X and returns updated (w, b).',
      hints: [
        'm = len(y)',
        'preds = w * X + b',
        'errors = preds - y',
        'dw = (1/m) * np.sum(errors * X)',
        'db = (1/m) * np.sum(errors)',
      ],
      starterCode: `import numpy as np

def single_gradient_step(w: float, b: float, X: np.ndarray, y: np.ndarray, alpha: float):
    # TODO: Implement parameter update step
    pass

X = np.array([1.0, 2.0, 3.0])
y = np.array([2.0, 4.0, 6.0])
w_new, b_new = single_gradient_step(0.0, 0.0, X, y, 0.1)
print(f"Updated w: {w_new:.3f}, Updated b: {b_new:.3f}")
`,
      solution: `import numpy as np

def single_gradient_step(w: float, b: float, X: np.ndarray, y: np.ndarray, alpha: float):
    m = len(y)
    preds = w * X + b
    errors = preds - y
    dw = (1.0 / m) * np.sum(errors * X)
    db = (1.0 / m) * np.sum(errors)
    w_updated = w - alpha * dw
    b_updated = b - alpha * db
    return w_updated, b_updated
`,
    },
    summary: {
      keyTakeaways: [
        'Linear algebra handles data representation and spatial transformations (matrices, dot products, projections).',
        'Calculus drives optimization via gradients (vectors of partial derivatives pointing in the direction of steepest ascent).',
        'Gradient descent parameter updates always subtract the gradient scaled by learning rate alpha.',
        'Probability distributions quantify uncertainty, forming the basis of maximum likelihood estimation.',
      ],
      nextLessonId: 'p0-prerequisite-recommendations',
      nextLessonTitle: 'Module 0.6: Personalized Prerequisite Recommendations',
      nextLessonModuleId: 'phase-0-mod-6',
    },
  },
};

// =========================================================================
// MODULE 0.6: Personalized Prerequisite Recommendations
// =========================================================================
export const phase0Mod6Data: ModuleData = {
  id: 'phase-0-mod-6',
  number: 0.6,
  title: 'Personalized Prerequisite Recommendations',
  subtitle: 'Diagnostic Scoring Rubric, Remediation Study Pathways & Phase 1 Readiness Certification',
  description:
    'Synthesize your Phase 0 diagnostic assessments. Receive a tailored study pathway recommending whether to proceed directly to Phase 1 (Machine Learning Foundations) or complete targeted bridge modules in Python or Mathematics.',
  icon: 'Compass',
  badge: 'Phase 0 · Roadmap',
  estimatedHours: 1,
  topicsCount: 1,
  lessons: [
    {
      id: 'p0-prerequisite-recommendations',
      moduleId: 'phase-0-mod-6',
      title: 'Your Personalized AI & ML Study Pathway',
      description:
        'Personalized diagnostic scoring, curriculum roadmaps, tailored study recommendations, and prerequisite gap remediation protocols.',
      order: 1,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
  ],
};

export const p0Mod6Lessons: Record<string, LessonContent> = {
  'p0-prerequisite-recommendations': {
    id: 'p0-prerequisite-recommendations',
    moduleId: 'phase-0-mod-6',
    title: 'Your Personalized AI & ML Study Pathway',
    subtitle: 'Diagnostic Synthesis, Custom Remediation Roadmaps & Milestone Progression Strategy',
    order: 1,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Calculate your readiness score across Python syntax, NumPy/Pandas data handling, and foundational mathematics.',
      'Select your personalized study pathway: Fast-Track, Python Bridge, or Math Foundation Bridge.',
      'Establish a weekly study routine tailored to your background (Software Engineer, Data Analyst, or Student).',
      'Begin Phase 1 (Machine Learning Foundations) with zero prerequisite uncertainty.',
    ],
    prerequisites: ['Phase 0.1 through 0.5 diagnostic assessments.'],
    previousLesson: {
      id: 'p0-math-diagnostic',
      title: 'Module 0.5: Linear Algebra, Calculus & Statistics Diagnostic',
      moduleId: 'phase-0-mod-5',
    },
    analogy: {
      title: 'The Triage Doctor and Personalized Prescription',
      text: 'When a patient visits a medical clinic, the doctor does not administer an identical treatment to everyone who walks through the door. First, they take your vitals: blood pressure, resting pulse, and oxygen saturation. If your vitals are excellent, you receive clearance for high-intensity athletic training. If your blood pressure is elevated, you receive a tailored dietary recommendation before running a marathon. Phase 0 has taken your academic vitals: Python fluency, array mechanics, and calculus basics. Now you receive your custom learning prescription.',
      metaphor: 'Phase 0 is your academic triage; Module 0.6 is your tailored study prescription ensuring you never embark on advanced ML with unaddressed foundational gaps.',
    },
    problemSolved: {
      title: 'Preventing Curriculum Churn & Burnout',
      description:
        'Learners often drop out of machine learning courses at Week 3 when confronted with gradient descent matrix math or vectorized array indexing because their prerequisite gaps were never diagnosed upfront. Structured triage ensures every learner enters Phase 1 with complete confidence.',
      keyPoints: [
        'Pathway 1: Fast-Track to Phase 1 — For experienced programmers with solid algebra and coding fundamentals.',
        'Pathway 2: Python & Data Bridge — Targeted 1-week review in the integrated Python Mastery Lab and NumPy modules.',
        'Pathway 3: Mathematics Foundation Bridge — Guided walkthrough of Phase 1 Module 1 (Mathematics for Machine Learning).',
        'Clear milestone certification: You are ready to train your first regression, classification, and neural models.',
      ],
    },
    intuition: {
      overview:
        'By matching your diagnostic scores against our three readiness tiers, you eliminate guesswork from your learning journey.',
      steps: [
        {
          step: 1,
          title: 'Tier A: High Readiness (>= 80% on all diagnostics)',
          description:
            'You are cleared to proceed directly to Phase 1 (Module 0: Introduction to ML, Module 2: Preprocessing, and Module 3: Regression).',
        },
        {
          step: 2,
          title: 'Tier B: Code-Strong, Math-Curious',
          description:
            'Typical for software engineers: comfortable with Python, but rusty with partial derivatives and linear algebra. Proceed to Phase 1 Module 1 (Mathematics for ML).',
        },
        {
          step: 3,
          title: 'Tier C: Math-Strong, Code-Emerging',
          description:
            'Typical for math, physics, or finance graduates: strong calculus, but unfamiliar with vectorization and OOP. Complete the Python Lab modules 1-6 first.',
        },
        {
          step: 4,
          title: 'Tier D: Comprehensive Foundations',
          description:
            'Begin with the Python Mastery Lab, work through NumPy Module 1, and then advance sequentially into Phase 1.',
        },
      ],
    },
    mathematics: {
      overview:
        'The Diagnostic Readiness Metric combines weighted scores from the three assessment modules.',
      foundations: [
        {
          name: 'Composite Readiness Score',
          latex: 'R_{\\text{score}} = 0.35 \\cdot S_{\\text{Python}} + 0.35 \\cdot S_{\\text{NumPy}} + 0.30 \\cdot S_{\\text{Math}}',
          explanation:
            'Weights Python fluency (35%), NumPy vectorization (35%), and mathematics fundamentals (30%) into a composite percentage.',
        },
      ],
    },
    derivation: {
      title: 'Optimal Study Hours Estimation Formulation',
      objective: 'Calculate the expected study hours to complete the curriculum based on background readiness.',
      steps: [
        {
          step: 1,
          label: 'Baseline Platform Curriculum Hours',
          latex: 'H_{\\text{base}} = 120 \\text{ Hours of In-Depth Instruction}',
          explanation:
            'Covering the core 12 phases from ML foundations to cloud AI deployment.',
        },
        {
          step: 2,
          label: 'Prerequisite Bridge Adjustment Factor',
          latex: 'H_{\\text{total}} = H_{\\text{base}} + \\max\\left(0, \\frac{100 - R_{\\text{score}}}{100}\\right) \\times 30 \\text{ Hours}',
          explanation:
            'Learners needing bridge remediation in Python or math dedicate up to 30 additional hours of targeted practice.',
        },
      ],
    },
    variables: [
      { symbol: 'R_{\\text{score}}', name: 'Readiness Score', description: 'Composite diagnostic percentage in [0, 100]', dimensions: 'Percentage' },
      { symbol: 'H_{\\text{total}}', name: 'Estimated Study Hours', description: 'Total recommended commitment to reach mastery', dimensions: 'Hours' },
    ],
    numericalExample: {
      scenario: 'Scoring a software engineer with 90% Python, 85% NumPy, and 60% Math.',
      dataset: [
        { subject: 'Python Diagnostic', score: 90, weight: 0.35 },
        { subject: 'NumPy/Pandas Diagnostic', score: 85, weight: 0.35 },
        { subject: 'Mathematics Diagnostic', score: 60, weight: 0.30 },
      ],
      calculations: [
        {
          step: 'Calculate Weighted Score',
          math: 'R = (0.35)(90) + (0.35)(85) + (0.30)(60) = 31.5 + 29.75 + 18.0 = 79.25\\%',
          result: 'R = 79.25%',
        },
      ],
      finalConclusion:
        'Recommendation: Pathway 2 (Software Engineer Fast-Track with Math Deep-Dive in Module 1).',
    },
    visualExplanation: {
      title: 'The AI & ML Learning Roadmap Architecture',
      description:
        'Sequential phased progression from Phase 0 orientation to production cloud deployment.',
      features: [
        'Phase 0: Orientation & Prerequisite Diagnostics (Complete)',
        'Phase 1: Machine Learning Foundations (Modules 0 - 11)',
        'Phase 2 - 3: Deep Learning & PyTorch',
        'Phase 6 - 8: Transformers, Generative AI & RAG',
        'Phase 9 - 11: AI Agents, MLOps & Production AI Deployment',
      ],
    },
    scratchCode: {
      title: 'Automated Study Pathway Recommender',
      code: `def generate_study_pathway(py_score: float, np_score: float, math_score: float):
    composite = 0.35 * py_score + 0.35 * np_score + 0.30 * math_score
    
    print(f"--- Diagnostic Results ---")
    print(f"Composite Score: {composite:.1f}%")
    
    if composite >= 80 and min(py_score, np_score, math_score) >= 70:
        return {
            "pathway": "Fast-Track to Phase 1",
            "next_step": "Jump immediately to Phase 1 Module 0: Introduction to ML.",
            "estimated_weeks": "10-12 weeks at 10 hrs/week"
        }
    elif py_score < 70 or np_score < 70:
        return {
            "pathway": "Python & Data Handling Bridge",
            "next_step": "Review Python Lab (Modules 1-5) and NumPy Module 1 before Phase 1.",
            "estimated_weeks": "12-14 weeks at 10 hrs/week"
        }
    else:
        return {
            "pathway": "Mathematics Foundation Bridge",
            "next_step": "Spend extra time on Phase 1 Module 1 (Mathematics for ML).",
            "estimated_weeks": "12-14 weeks at 10 hrs/week"
        }

# Example Evaluation
rec = generate_study_pathway(py_score=85, np_score=90, math_score=65)
print("Recommended Pathway:", rec["pathway"])
print("Actionable Next Step:", rec["next_step"])
`,
      explanation:
        'Automated scoring algorithm that evaluates learner diagnostic attributes and provides a customized next-step roadmap.',
    },
    sklearnCode: {
      title: 'Phase 1 Readiness Verification Check',
      code: `import numpy as np

# A quick 10-line verification of the full prerequisite stack
def test_full_prerequisite_stack():
    # 1. Python dictionary comprehension
    catalog = {f"phase_{i}": f"Module {i}" for i in range(12)}
    
    # 2. NumPy array vectorization
    X = np.arange(10, dtype=np.float64).reshape(5, 2)
    normalized = (X - np.mean(X, axis=0)) / (np.std(X, axis=0) + 1e-8)
    
    # 3. Linear dot product
    w = np.array([0.5, -0.2])
    predictions = np.dot(normalized, w)
    
    assert len(catalog) == 12
    assert normalized.shape == (5, 2)
    assert len(predictions) == 5
    print("✓ Full prerequisite stack validated! You are 100% prepared for Phase 1.")

test_full_prerequisite_stack()
`,
      explanation:
        'Validates Python comprehensions, NumPy vectorization, and linear dot-product operations in a single clean test.',
    },
    runnableCode: {
      code: `def verify_phase_0_completion():
    modules = [
        "0.1: Taxonomy of AI, ML, Deep Learning & Generative AI",
        "0.2: Platform Mastery & In-Browser Execution",
        "0.3: Python Prerequisite Assessment",
        "0.4: NumPy, Pandas & Data Handling Assessment",
        "0.5: Linear Algebra, Calculus & Statistics Diagnostic",
        "0.6: Personalized Prerequisite Recommendations"
    ]
    print("Complete AI & ML Academy — Phase 0 Certification:")
    for mod in modules:
        print(f"  ✓ Completed: {mod}")
    print("\\nStatus: 100% READY FOR PHASE 1 (MACHINE LEARNING FOUNDATIONS)")

verify_phase_0_completion()
`,
      expectedOutput: `Complete AI & ML Academy — Phase 0 Certification:
  ✓ Completed: 0.1: Taxonomy of AI, ML, Deep Learning & Generative AI
  ✓ Completed: 0.2: Platform Mastery & In-Browser Execution
  ✓ Completed: 0.3: Python Prerequisite Assessment
  ✓ Completed: 0.4: NumPy, Pandas & Data Handling Assessment
  ✓ Completed: 0.5: Linear Algebra, Calculus & Statistics Diagnostic
  ✓ Completed: 0.6: Personalized Prerequisite Recommendations

Status: 100% READY FOR PHASE 1 (MACHINE LEARNING FOUNDATIONS)`,
    },
    lineByLineExplanation: [
      {
        lines: '1-10',
        codeSnippet: 'def verify_phase_0_completion(): modules = [...]',
        explanation: 'Lists the completed six diagnostic modules of Phase 0.',
      },
      {
        lines: '11-14',
        codeSnippet: 'for mod in modules: print(...)',
        explanation: 'Emits the Phase 0 graduation status and triggers the Phase 1 unlocked milestone.',
      },
    ],
    hyperparameters: [
      {
        name: 'Weekly Study Pace',
        defaultVal: '8 - 10 hours/week',
        range: '5 - 20 hours/week',
        effect: 'Determines duration to complete the full 12-phase curriculum.',
        recommendation: 'Consistency (1-2 hours daily) is vastly superior to a single 10-hour marathon session.',
      },
    ],
    assumptions: [
      {
        assumption: 'Active Practical Engagement',
        whyItMatters: 'Reading notes passively yields low retention compared to writing code and interacting with visualizers.',
        howToVerify: 'Complete the independent exercise and quiz at the end of every lesson.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Waiting for "perfect" math prerequisites before starting machine learning',
        solution: 'Begin Phase 1 immediately; learn mathematical formulas in context as algorithms require them.',
        whyWrong: 'Pure abstract mathematics without code application feels dry and lacks motivation.',
        howToFix: 'Let algorithm needs motivate math study (e.g. studying cost derivatives while coding linear regression).',
      },
    ],
    realWorldUseCases: [
      {
        industry: 'Engineering Career Progression',
        application: 'Upskilling to Machine Learning Engineer (MLE)',
        benefit: 'Provides an accredited, rigorous portfolio-backed path from fundamentals to production systems.',
      },
    ],
    practiceQuestions: [
      {
        id: 'p0-rec-q1',
        question: 'What is the immediate next module after completing Phase 0?',
        hint: 'Check the Phase 1 Foundations roadmap.',
        answer: 'Phase 1 Module 0: Introduction to AI and Machine Learning (or Module 1: Mathematics for ML).',
        explanation:
          'Phase 1 begins with Module 0 ("Introduction to Machine Learning: Paradigms, Datasets & Workflows").',
      },
    ],
    quiz: [
      {
        id: 'p0-rec-quiz-1',
        question: 'Which study strategy produces the highest retention when learning machine learning algorithms?',
        options: [
          'Watching video lectures at 2x speed without opening an editor.',
          'Active learning: reading the intuition, experimenting with interactive visualizers, studying mathematical derivations, and implementing the algorithm in Python.',
          'Memorizing raw scikit-learn API documentation.',
          'Copying pre-written code without running it.',
        ],
        correctIndex: 1,
        explanation:
          'Active multi-modal retrieval (visual + mathematical + programming practice) builds strong neurological memory encoding.',
      },
      {
        id: 'p0-rec-quiz-2',
        question: 'What should you do if you find a mathematical derivation in Phase 1 challenging?',
        options: [
          'Quit the curriculum immediately.',
          'Use the integrated Gemini AI Tutor on the right sidebar for step-by-step plain-English breakdowns and review the hand-calculated numerical example.',
          'Skip all subsequent modules.',
          'Guess the code without understanding.',
        ],
        correctIndex: 1,
        explanation:
          'The AI Tutor is tuned to provide customized mathematical explanations, analogies, and line-by-line code breakdowns.',
      },
    ],
    independentExercise: {
      title: 'Create Your Personal ML Study Commitment Plan',
      problem:
        'Write a Python function `build_study_schedule(available_days, hours_per_day)` that prints a customized weekly study calendar targeting Phase 1.',
      hints: ['Multiply days by hours per day and assign specific topics to each study block.'],
      starterCode: `def build_study_schedule(available_days: list, hours_per_day: float):
    # TODO: Generate schedule
    pass

days = ["Mon", "Wed", "Fri", "Sun"]
build_study_schedule(days, 2.0)
`,
      solution: `def build_study_schedule(available_days: list, hours_per_day: float):
    total = len(available_days) * hours_per_day
    print(f"Weekly Commitment: {total:.1f} hours across {len(available_days)} days.")
    for d in available_days:
        print(f"  [{d}]: {hours_per_day:.1f} hrs — 1 Complete Lesson + Visualizer + Code Lab")
    print("Target: Complete Phase 1 in ~4-5 weeks.")
`,
    },
    summary: {
      keyTakeaways: [
        'Phase 0 orientation is complete: your foundational readiness is established.',
        'Choose the study pathway that matches your diagnostic scores (Fast-Track, Python Bridge, or Math Bridge).',
        'Consistency and active practice beat passive reading: code every lesson and use interactive visualizers.',
        'Next stop: Phase 1 Module 0 — Introduction to AI and Machine Learning Foundations!',
      ],
      nextLessonId: 'ai-ml-dl-foundations',
      nextLessonTitle: 'Phase 1 · Module 0: Introduction to AI and Machine Learning',
      nextLessonModuleId: 'module-0',
    },
  },
};

