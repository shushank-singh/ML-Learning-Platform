import { LessonContent, ModuleData } from '@/lib/types';

export const module1Data: ModuleData = {
  id: 'module-1',
  number: 1,
  title: 'Mathematics for Machine Learning',
  subtitle: 'Linear Algebra, Matrix Calculus, Probability & Optimization',
  description: 'Build an uncompromising mathematical foundation. Master vectors, matrices, eigenspaces, SVD, multivariable gradients, Hessians, convex optimization, Bayesian inference, and information theory.',
  icon: 'Calculator',
  badge: 'Mathematics',
  estimatedHours: 18,
  topicsCount: 15,
  lessons: [
    {
      id: 'scalars-vectors-matrices-tensors',
      moduleId: 'module-1',
      title: 'Scalars, Vectors, Matrices, and Tensors',
      description: 'Dimensionality, vector spaces, tensor ranks, matrix representations, and vector norms (L1, L2, L-inf).',
      order: 1,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'vector-operations-dot-products',
      moduleId: 'module-1',
      title: 'Vector Operations, Dot Products & Projections',
      description: 'Inner products, geometric projections, cosine similarity, Cauchy-Schwarz inequality, and orthogonal decomposition.',
      order: 2,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'matrix-inverse-rank-determinants',
      moduleId: 'module-1',
      title: 'Matrix Inverses, Rank, and Determinants',
      description: 'Linear independence, rank deficiency, singular matrices, determinants as volume scaling, and condition numbers.',
      order: 3,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'eigenvalues-eigenvectors',
      moduleId: 'module-1',
      title: 'Eigenvalues and Eigenvectors',
      description: 'Characteristic equations, invariant directional stretching, spectral decomposition, and positive semi-definite matrices.',
      order: 4,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'singular-value-decomposition',
      moduleId: 'module-1',
      title: 'Singular Value Decomposition (SVD)',
      description: 'Compact SVD factorization A = U Sigma V^T, low-rank approximation via Eckart-Young theorem, and Moore-Penrose pseudoinverse.',
      order: 5,
      readTimeMinutes: 28,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
    {
      id: 'derivatives-chain-rule',
      moduleId: 'module-1',
      title: 'Derivatives and the Multivariable Chain Rule',
      description: 'First principles rate of change, partial derivatives, computational graphs, and reverse accumulation.',
      order: 6,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'gradients-jacobian-hessian',
      moduleId: 'module-1',
      title: 'Gradients, Jacobians, and Hessian Matrices',
      description: 'Steepest ascent direction, vector-valued Jacobians, second-order curvature Hessians, and Taylor series approximations.',
      order: 7,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'gradient-descent-optimization',
      moduleId: 'module-1',
      title: 'Gradient Descent & First-Order Optimization',
      description: 'Iterative steepest descent, Lipschitz smoothness, step size bounds, oscillations, and convergence guarantees.',
      order: 8,
      readTimeMinutes: 24,
      visualizerType: 'gradient-descent',
      difficulty: 'Beginner',
    },
    {
      id: 'convexity-optimization',
      moduleId: 'module-1',
      title: 'Convexity and Optimization Theory',
      description: 'Convex sets, convex functions, Jensen inequality, first and second order convexity conditions, and global optimality.',
      order: 9,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'probability-bayes-theorem',
      moduleId: 'module-1',
      title: 'Probability Rules & Bayes Theorem',
      description: 'Axioms of Kolmogorov, joint/conditional probability, Bayes rule: prior, likelihood, evidence, and posterior.',
      order: 10,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'probability-distributions',
      moduleId: 'module-1',
      title: 'Discrete and Continuous Probability Distributions',
      description: 'Bernoulli, Binomial, Poisson, Gaussian (Normal), and Multivariate Normal distributions.',
      order: 11,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'expectation-variance-covariance',
      moduleId: 'module-1',
      title: 'Expectation, Variance, and Covariance Matrices',
      description: 'Expected value, dispersion, covariance tensor, Pearson correlation coefficient, and whitening transformations.',
      order: 12,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'sampling-central-limit-theorem',
      moduleId: 'module-1',
      title: 'Sampling and the Central Limit Theorem',
      description: 'Law of Large Numbers, asymptotic normality of sample means, standard error, and confidence interval estimation.',
      order: 13,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'mle-map-estimation',
      moduleId: 'module-1',
      title: 'Maximum Likelihood (MLE) & MAP Estimation',
      description: 'Frequentist parameter estimation via log-likelihood vs Bayesian MAP with Gaussian (L2) and Laplace (L1) priors.',
      order: 14,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'entropy-cross-entropy-kl-divergence',
      moduleId: 'module-1',
      title: 'Entropy, Cross-Entropy, and KL Divergence',
      description: 'Information content in nats and bits, Shannon entropy, cross-entropy classification loss, and relative entropy.',
      order: 15,
      readTimeMinutes: 25,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

export const module1Lessons: Record<string, LessonContent> = {
  'scalars-vectors-matrices-tensors': {
    id: 'scalars-vectors-matrices-tensors',
    moduleId: 'module-1',
    title: 'Scalars, Vectors, Matrices, and Tensors',
    subtitle: 'The Geometric and Algebraic Building Blocks of High-Dimensional Machine Learning',
    order: 1,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Define scalars (0D), vectors (1D), matrices (2D), and tensors (ND) algebraically and geometrically.',
      'Compute L1 (Manhattan), L2 (Euclidean), and L-infinity (Chebyshev) vector norms.',
      'Understand matrix dimensions, memory layout, broadcasting rules, and rank representations.',
    ],
    prerequisites: ['Basic high school algebra', 'Familiarity with Cartesian coordinates (x, y)'],
    analogy: {
      title: 'The Measurement Hierarchy: Point, Line, Sheet, and Cube',
      text: 'A scalar is a single isolated measurement, like reading a thermometer: 21.5°C (a zero-dimensional point). A vector is a recorded sequence of hourly temperature readings over a day: [18, 20, 22, 19] (a 1D line of values). A matrix is a weekly temperature table where rows are days and columns are hours (a 2D grid). A tensor stacks multiple weekly tables across different weather stations worldwide into a 3D or 4D block of numbers.',
      metaphor: 'Data representations grow like spatial dimensions: 0D point (scalar) → 1D line (vector) → 2D surface (matrix) → ND volume (tensor).',
    },
    problemSolved: {
      title: 'Standardizing Multi-Feature Tabular and Perceptual Data',
      description: 'Machine learning algorithms cannot process raw sensory reality directly. We must structure images, text, user profiles, and sensor signals into standardized linear algebraic data containers.',
      keyPoints: [
        'Organizes heterogeneous observations into indexed coordinate spaces.',
        'Enables compact parallel matrix multiplication across thousands of samples at hardware speed.',
        'Provides geometric distance metrics (norms) to measure similarity between entities.',
      ],
    },
    intuition: {
      overview: 'Linear algebra treats arrays not merely as data containers, but as geometric arrows living in multi-dimensional space.',
      steps: [
        { step: 1, title: 'Scalar Coordinate', description: 'A single real number c in R scaling magnitude without direction.' },
        { step: 2, title: 'Vector Arrow', description: 'An ordered tuple x = [x1, x2, ..., xd] pointing from the origin to a coordinate in d-dimensional space.' },
        { step: 3, title: 'Matrix Linear Map', description: 'A 2D array representing either a dataset of N vectors or a linear operator transforming space.' },
        { step: 4, title: 'Vector Norms', description: 'Functions measuring the length or magnitude of vector arrows using distinct geometric metrics.' },
      ],
    },
    mathematics: {
      overview: 'Vector norms map a vector x in R^d to a non-negative real scalar ||x|| satisfying non-negativity, absolute scalability, and the triangle inequality.',
      foundations: [
        {
          name: 'L1 Norm (Manhattan / Taxicab Norm)',
          latex: '\\|\\mathbf{x}\\|_1 = \\sum_{i=1}^{d} |x_i|',
          explanation: 'Sum of absolute coordinate differences. Measures grid distance. Induces sparsity when used as regularization (Lasso).',
        },
        {
          name: 'L2 Norm (Euclidean Norm)',
          latex: '\\|\\mathbf{x}\\|_2 = \\sqrt{\\sum_{i=1}^{d} x_i^2} = \\sqrt{\\mathbf{x}^T \\mathbf{x}}',
          explanation: 'Straight-line geometric distance from origin. Rotationally invariant. Foundational in OLS and Ridge regression.',
        },
        {
          name: 'L-Infinity Norm (Chebyshev Norm)',
          latex: '\\|\\mathbf{x}\\|_\\infty = \\max_{1 \\le i \\le d} |x_i|',
          explanation: 'The maximum absolute coordinate value. Governs worst-case boundary constraints.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the General L_p Norm and Triangle Inequality',
      objective: 'Show how the generalized Minkowski norm family connects L1, L2, and L_infinity.',
      steps: [
        {
          step: 1,
          label: 'Minkowski Norm Definition',
          latex: '\\|\\mathbf{x}\\|_p = \\left( \\sum_{i=1}^{d} |x_i|^p \\right)^{1/p} \\quad \\text{for } p \\ge 1',
          explanation: 'For any p >= 1, this function satisfies homogeneous scalability ||c * x|| = |c| * ||x||.',
        },
        {
          step: 2,
          label: 'Minkowski Inequality (Triangle Inequality)',
          latex: '\\|\\mathbf{x} + \\mathbf{y}\\|_p \\le \\|\\mathbf{x}\\|_p + \\|\\mathbf{y}\\|_p',
          explanation: 'Proves that the direct path length is always less than or equal to the detour path length across all normed vector spaces.',
        },
        {
          step: 3,
          label: 'Limiting Behavior as p approaches infinity',
          latex: '\\lim_{p \\to \\infty} \\left( \\sum_{i=1}^{d} |x_i|^p \\right)^{1/p} = \\max_i |x_i| = \\|\\mathbf{x}\\|_\\infty',
          explanation: 'As p grows large, the single largest coordinate exponentially dominates all smaller terms, converging to the maximum component.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathbf{x}', name: 'Feature Vector', description: 'A d-dimensional coordinate arrow in Euclidean space R^d.', dimensions: 'd × 1' },
      { symbol: '\\|\\mathbf{x}\\|_p', name: 'L_p Norm', description: 'Scalar length of vector x under the p-norm metric.', dimensions: 'Scalar ≥ 0' },
      { symbol: '\\mathbf{X}', name: 'Design Matrix', description: 'Collection of N sample vectors stacked row-wise with d features each.', dimensions: 'N × d' },
    ],
    numericalExample: {
      scenario: 'Given a 3-dimensional error vector e = [3.0, -4.0, 12.0], compute its L1 norm, L2 norm, and L-infinity norm step-by-step.',
      dataset: [{ sample: 1, e1: 3.0, e2: -4.0, e3: 12.0 }],
      calculations: [
        { step: 'Absolute Coordinates', math: '|3.0| = 3.0, |-4.0| = 4.0, |12.0| = 12.0', result: '[3.0, 4.0, 12.0]' },
        { step: 'L1 Norm Calculation', math: '\\|e\\|_1 = 3.0 + 4.0 + 12.0', result: '19.00' },
        { step: 'Squared Sum for L2', math: '3^2 + (-4)^2 + 12^2 = 9 + 16 + 144 = 169.0', result: '169.00' },
        { step: 'L2 Norm Calculation', math: '\\|e\\|_2 = \\sqrt{169.0}', result: '13.00' },
        { step: 'L-infinity Calculation', math: '\\|e\\|_\\infty = \\max(3.0, 4.0, 12.0)', result: '12.00' },
      ],
      finalConclusion: 'The Euclidean distance ||e||_2 = 13.0, the Manhattan distance ||e||_1 = 19.0, and the maximum coordinate ||e||_inf = 12.0. Notice ||e||_inf <= ||e||_2 <= ||e||_1.',
    },
    visualExplanation: {
      title: 'Unit Balls in 2D Space for Different Norms',
      description: 'The set of points {x : ||x||_p <= 1} forms distinct geometric shapes: L1 is a diamond (sharp vertices on axes), L2 is a perfect circle, and L-infinity is an axis-aligned square.',
      features: ['L1 diamond corners touch axes, explaining why Lasso regression forces weights to exact zero', 'L2 circular contour produces smooth isotropic shrinkage', 'L-infinity square constrains max bounds'],
    },
    scratchCode: {
      title: 'Pure Python & NumPy Vector Norm Implementations',
      explanation: 'Calculate L1, L2, and L-infinity norms without relying on high-level library blackboxes.',
      code: `import numpy as np

def compute_vector_norms(v: np.ndarray) -> dict:
    """Computes L1, L2, and L-inf norms from fundamental arithmetic."""
    v = np.asarray(v, dtype=np.float64)
    l1 = float(np.sum(np.abs(v)))
    l2 = float(np.sqrt(np.sum(v ** 2)))
    l_inf = float(np.max(np.abs(v)))
    return {
        'L1_norm': round(l1, 4),
        'L2_norm': round(l2, 4),
        'L_inf_norm': round(l_inf, 4)
    }

vec = np.array([3.0, -4.0, 12.0])
norms = compute_vector_norms(vec)
print("Computed norms:", norms)
`,
    },
    sklearnCode: {
      title: 'Linear Algebra Norms with NumPy linalg',
      explanation: 'Using numpy.linalg.norm across matrix rows and vectors.',
      code: `import numpy as np

v = np.array([3.0, -4.0, 12.0])

l1 = np.linalg.norm(v, ord=1)
l2 = np.linalg.norm(v, ord=2)
linf = np.linalg.norm(v, ord=np.inf)

print(f"L1: {l1:.2f}, L2: {l2:.2f}, L-inf: {linf:.2f}")

# Matrix Frobenius norm (matrix equivalent of vector L2)
A = np.array([[1, 2], [3, 4]])
frobenius = np.linalg.norm(A, 'fro')
print(f"Frobenius norm: {frobenius:.4f}")
`,
    },
    runnableCode: {
      code: `import numpy as np

x = np.array([3.0, -4.0, 12.0])
print(f"Vector: {x}")
print(f"L1 Norm: {np.linalg.norm(x, 1):.2f}")
print(f"L2 Norm: {np.linalg.norm(x, 2):.2f}")
print(f"L-inf Norm: {np.linalg.norm(x, np.inf):.2f}")
print(f"Unit Vector (L2 normalized): {np.round(x / np.linalg.norm(x, 2), 4)}")
`,
      expectedOutput: `Vector: [ 3. -4. 12.]\nL1 Norm: 19.00\nL2 Norm: 13.00\nL-inf Norm: 12.00\nUnit Vector (L2 normalized): [ 0.2308 -0.3077  0.9231]`,
    },
    lineByLineExplanation: [
      { lines: 'Line 3', codeSnippet: 'x = np.array([3.0, -4.0, 12.0])', explanation: 'Creates a 1D NumPy array representing a 3-dimensional vector in R^3.' },
      { lines: 'Lines 5-7', codeSnippet: 'np.linalg.norm(x, ord)', explanation: 'Executes the optimized BLAS routine to compute the respective Minkowski p-norm.' },
      { lines: 'Line 8', codeSnippet: 'x / np.linalg.norm(x, 2)', explanation: 'Scales the vector by the reciprocal of its L2 length, producing a unit-length vector with norm exactly 1.0.' },
    ],
    hyperparameters: [
      { name: 'norm_p', defaultVal: '2', range: '[1, inf]', effect: 'Determines the geometry of distance penalties.', recommendation: 'Use p=2 for smooth isotropic penalization; use p=1 for sparse feature selection.' },
    ],
    assumptions: [
      { assumption: 'Vector Space Axioms', whyItMatters: 'Norms only hold validity over spaces supporting vector addition and scalar multiplication.', howToVerify: 'Verify that all inputs are real-valued coordinate vectors.' },
    ],
    commonMistakes: [
      { mistake: 'Confusing vector dimensionality with matrix rank or number of samples', solution: 'A vector in R^d has d features. A dataset of N samples with d features is an N x d matrix.' },
    ],
    realWorldUseCases: [
      { industry: 'Recommender Systems', application: 'User Vector Normalization', benefit: 'Unit-normalizing user embedding vectors ensures cosine similarity focuses on preference direction rather than total activity volume.' },
    ],
    practiceQuestions: [
      { id: 'pq-1', question: 'Why does the L1 norm produce sparse model parameters when used as a regularization penalty?', hint: 'Consider the geometric corners of the L1 diamond contour.', answer: 'The L1 unit ball has sharp vertices aligned exactly with coordinate axes. When the elliptic contours of empirical loss expand, they typically make first contact at these axis vertices, forcing non-relevant feature weights to exactly 0.' },
    ],
    quiz: [
      {
        id: 'quiz-math-1',
        question: 'Given the vector v = [-2.0, 0.0, 4.0, -4.0], what is its L2 (Euclidean) norm?',
        options: ['10.0', '6.0', '36.0', '4.0'],
        correctIndex: 1,
        explanation: '||v||_2 = sqrt((-2)^2 + 0^2 + 4^2 + (-4)^2) = sqrt(4 + 0 + 16 + 16) = sqrt(36) = 6.0.',
      },
    ],
    independentExercise: {
      title: 'Normalize Matrix Rows to Unit L2 Norm',
      problem: 'Write a function normalize_rows(X) that takes a 2D NumPy array X and returns a matrix where each row has an L2 norm of 1.0. Handle zero vectors safely by leaving them as zeros.',
      hints: ['Compute row norms using np.linalg.norm(X, axis=1, keepdims=True)', 'Use np.where to avoid dividing by 0'],
      starterCode: `import numpy as np

def normalize_rows(X: np.ndarray) -> np.ndarray:
    # TODO: Normalize each row to unit L2 length
    return X

X = np.array([[3.0, 4.0], [1.0, -1.0], [0.0, 0.0]])
print(normalize_rows(X))
`,
      solution: `import numpy as np

def normalize_rows(X: np.ndarray) -> np.ndarray:
    norms = np.linalg.norm(X, axis=1, keepdims=True)
    # Avoid zero division
    safe_norms = np.where(norms == 0, 1.0, norms)
    return np.where(norms == 0, 0.0, X / safe_norms)

X = np.array([[3.0, 4.0], [1.0, -1.0], [0.0, 0.0]])
print(np.round(normalize_rows(X), 4))
`,
    },
    summary: {
      keyTakeaways: [
        'Scalars (0D), vectors (1D), matrices (2D), and tensors (ND) form the standard hierarchy of ML data representation.',
        'The L1 norm sums absolute values, L2 computes Euclidean length, and L-infinity extracts the maximum coordinate.',
        'Unit normalization transforms raw coordinate vectors into pure directional representations.',
      ],
      nextLessonId: 'vector-operations-dot-products',
      nextLessonTitle: 'Vector Operations, Dot Products & Projections',
      nextLessonModuleId: 'module-1',
    },
  },

  'vector-operations-dot-products': {
    id: 'vector-operations-dot-products',
    moduleId: 'module-1',
    title: 'Vector Operations, Dot Products & Projections',
    subtitle: 'Inner Products, Geometric Angles, Cosine Similarity & Orthogonality',
    order: 2,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Compute algebraic and geometric dot products: u · v = ||u|| ||v|| cos(theta).',
      'Calculate the scalar and vector projection of one vector onto another.',
      'Understand cosine similarity and orthogonal vector decomposition in machine learning.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'Trigonometric cosine function'],
    analogy: {
      title: 'Casting Shadows under a Vertical Sun',
      text: 'Imagine shining a bright flashlight directly overhead onto the ground. If you hold a rod at an angle, the shadow it casts on the floor represents its geometric projection. If the rod lies flat on the ground, the shadow equals its full length. If the rod stands perfectly vertical (90 degrees / orthogonal), the shadow shrinks to a single dimensionless dot: zero projection.',
      metaphor: 'The dot product u · v measures how much vector u points in the exact direction of vector v.',
    },
    problemSolved: {
      title: 'Measuring Semantic and Directional Similarity',
      description: 'In NLP embeddings, recommendation systems, and linear models, we need a mathematical tool to determine whether two vectors point in similar directions regardless of their overall length.',
      keyPoints: [
        'Evaluates directional alignment between feature vectors.',
        'Decomposes any vector into parallel and perpendicular orthogonal components.',
        'Powers the fundamental linear scoring hypothesis y_hat = w · x + b.',
      ],
    },
    intuition: {
      overview: 'The dot product bridges algebra (multiplying matching coordinate indices) and geometry (lengths multiplied by the cosine of the angle between them).',
      steps: [
        { step: 1, title: 'Coordinate Multiplication', description: 'Multiply matching dimension indices u_i * v_i and sum the scalar products.' },
        { step: 2, title: 'Geometric Angle Evaluation', description: 'If the angle is acute (< 90 deg), dot product is positive; if 90 deg, zero; if obtuse (> 90 deg), negative.' },
        { step: 3, title: 'Orthogonal Projection', description: 'Scale the target direction unit vector by the shadow length (u · v) / ||v||.' },
      ],
    },
    mathematics: {
      overview: 'The Euclidean inner product (dot product) satisfies commutativity, bilinearity, and positive definiteness.',
      foundations: [
        {
          name: 'Algebraic Dot Product',
          latex: '\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{u}^T \\mathbf{v} = \\sum_{i=1}^{d} u_i v_i',
          explanation: 'Sum of component-wise products across all d dimensions.',
        },
        {
          name: 'Geometric Dot Product',
          latex: '\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2 \\cos(\\theta)',
          explanation: 'Connects lengths and the enclosed angle theta between the two vector arrows.',
        },
        {
          name: 'Vector Projection Formula',
          latex: '\\text{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\left( \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|_2^2} \\right) \\mathbf{v}',
          explanation: 'Calculates the shadow vector of u along the direction of v.',
        },
        {
          name: 'Cosine Similarity',
          latex: '\\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2}',
          explanation: 'Normalized dot product bounded in [-1, +1], measuring pure angular agreement.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Law of Cosines via Vector Inner Products',
      objective: 'Prove that the algebraic dot product matches the geometric length-angle formulation.',
      steps: [
        {
          step: 1,
          label: 'Vector Difference Triangle',
          latex: '\\|\\mathbf{u} - \\mathbf{v}\\|_2^2 = (\\mathbf{u} - \\mathbf{v})^T (\\mathbf{u} - \\mathbf{v})',
          explanation: 'Consider the triangle formed by vectors u, v, and closing side (u - v).',
        },
        {
          step: 2,
          label: 'Expand Algebraic Bilinear Product',
          latex: '\\|\\mathbf{u} - \\mathbf{v}\\|_2^2 = \\|\\mathbf{u}\\|_2^2 + \\|\\mathbf{v}\\|_2^2 - 2 (\\mathbf{u} \\cdot \\mathbf{v})',
          explanation: 'Expanding the transpose multiplication reveals the cross-term -2(u · v).',
        },
        {
          step: 3,
          label: 'Equate with Geometric Law of Cosines',
          latex: '\\|\\mathbf{u}\\|_2^2 + \\|\\mathbf{v}\\|_2^2 - 2 \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos(\\theta) = \\|\\mathbf{u}\\|_2^2 + \\|\\mathbf{v}\\|_2^2 - 2 (\\mathbf{u} \\cdot \\mathbf{v}) \\implies \\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos(\\theta)',
          explanation: 'Cancelling squared magnitudes confirms the geometric equivalence.',
        },
      ],
    },
    variables: [
      { symbol: '\\theta', name: 'Enclosed Angle', description: 'Angle between vector u and vector v in the shared plane.', dimensions: 'Radians [0, pi]' },
      { symbol: '\\text{proj}_{\\mathbf{v}}(\\mathbf{u})', name: 'Vector Projection', description: 'The component of u parallel to v.', dimensions: 'd × 1' },
      { symbol: '\\cos(\\theta)', name: 'Cosine Similarity', description: 'Directional similarity metric between -1 and +1.', dimensions: 'Scalar [-1, 1]' },
    ],
    numericalExample: {
      scenario: 'Compute the dot product, cosine similarity, and projection of vector u = [4.0, 2.0] onto v = [3.0, 0.0].',
      dataset: [{ sample: 1, u1: 4.0, u2: 2.0, v1: 3.0, v2: 0.0 }],
      calculations: [
        { step: 'Dot Product u · v', math: '(4.0)(3.0) + (2.0)(0.0) = 12.0 + 0.0', result: '12.00' },
        { step: 'Norm of u', math: '\\|u\\|_2 = \\sqrt{4^2 + 2^2} = \\sqrt{20} \\approx 4.4721', result: '4.4721' },
        { step: 'Norm of v', math: '\\|v\\|_2 = \\sqrt{3^2 + 0^2} = 3.0', result: '3.00' },
        { step: 'Cosine Similarity', math: '12.0 / (4.4721 \\cdot 3.0) = 12.0 / 13.4164', result: '0.8944' },
        { step: 'Scalar Projection Factor', math: '(u · v) / \\|v\\|_2^2 = 12.0 / 9.0', result: '1.3333' },
        { step: 'Vector Projection', math: '1.3333 \\cdot [3.0, 0.0] = [4.0, 0.0]', result: '[4.0, 0.0]' },
      ],
      finalConclusion: 'The projection vector is [4.0, 0.0], perfectly matching the x-component of u since v lies entirely along the x-axis. The remaining perpendicular error is [0.0, 2.0].',
    },
    visualExplanation: {
      title: 'Orthogonal Decomposition of Vectors',
      description: 'Any vector u can be split into two orthogonal components: u = u_parallel + u_perpendicular, where u_parallel is the projection onto v, and u_perpendicular is orthogonal to v (dot product equals 0).',
      features: ['u_parallel = proj_v(u)', 'u_perp = u - proj_v(u)', 'u_perp · v = 0 (perfect right angle)'],
    },
    scratchCode: {
      title: 'Vector Projection & Cosine Similarity in NumPy',
      explanation: 'Step-by-step vector decomposition into parallel and orthogonal components.',
      code: `import numpy as np

def vector_decomposition(u: np.ndarray, v: np.ndarray):
    """Decomposes vector u into components parallel and orthogonal to v."""
    u = np.asarray(u, dtype=np.float64)
    v = np.asarray(v, dtype=np.float64)
    
    dot_uv = np.dot(u, v)
    norm_u = np.linalg.norm(u)
    norm_v = np.linalg.norm(v)
    
    cos_sim = dot_uv / (norm_u * norm_v)
    proj_v_u = (dot_uv / (norm_v ** 2)) * v
    orth_comp = u - proj_v_u
    
    return {
        'dot_product': round(float(dot_uv), 4),
        'cosine_similarity': round(float(cos_sim), 4),
        'projection': np.round(proj_v_u, 4).tolist(),
        'orthogonal_component': np.round(orth_comp, 4).tolist(),
        'orthogonality_check': round(float(np.dot(orth_comp, v)), 6)
    }

u = np.array([4.0, 2.0])
v = np.array([3.0, 0.0])
res = vector_decomposition(u, v)
print("Decomposition result:", res)
`,
    },
    sklearnCode: {
      title: 'Cosine Similarity with Scikit-Learn',
      explanation: 'Batch calculation of pairwise cosine similarity between multiple feature vectors.',
      code: `import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Two document or user embeddings
doc_A = np.array([[4.0, 2.0]])
doc_B = np.array([[3.0, 0.0]])

similarity = cosine_similarity(doc_A, doc_B)
print(f"Cosine Similarity Matrix:\n{similarity}")
`,
    },
    runnableCode: {
      code: `import numpy as np

u = np.array([4.0, 2.0])
v = np.array([3.0, 0.0])

dot = np.dot(u, v)
cos_sim = dot / (np.linalg.norm(u) * np.linalg.norm(v))
proj = (dot / np.dot(v, v)) * v
perp = u - proj

print(f"u: {u}, v: {v}")
print(f"Dot product: {dot:.1f}")
print(f"Cosine similarity: {cos_sim:.4f}")
print(f"Projection of u on v: {proj}")
print(f"Perpendicular remainder: {perp}")
print(f"Check perp dot v: {np.dot(perp, v):.1f} (Must be 0)")
`,
      expectedOutput: `u: [4. 2.], v: [3. 0.]\nDot product: 12.0\nCosine similarity: 0.8944\nProjection of u on v: [4. 0.]\nPerpendicular remainder: [0. 2.]\nCheck perp dot v: 0.0 (Must be 0)`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-5', codeSnippet: 'u = np.array([4.0, 2.0])', explanation: 'Initializes test vectors in R^2.' },
      { lines: 'Line 8', codeSnippet: 'cos_sim = dot / (np.linalg.norm(u) * np.linalg.norm(v))', explanation: 'Normalizes the dot product by the product of vector magnitudes to yield cosine similarity.' },
      { lines: 'Line 9', codeSnippet: 'proj = (dot / np.dot(v, v)) * v', explanation: 'Scales v by the scalar projection quotient (u · v) / ||v||^2.' },
      { lines: 'Line 10', codeSnippet: 'perp = u - proj', explanation: 'Subtracts the projected shadow to isolate the purely orthogonal residual vector.' },
    ],
    hyperparameters: [
      { name: 'distance_metric', defaultVal: 'cosine', range: '["cosine", "euclidean", "manhattan"]', effect: 'Cosine distance ignores magnitude differences and focuses entirely on angle.', recommendation: 'Use cosine similarity for high-dimensional text embeddings; use Euclidean distance for spatial coordinates.' },
    ],
    assumptions: [
      { assumption: 'Non-zero Norms', whyItMatters: 'Cosine similarity and projection onto zero vectors are mathematically undefined (division by zero).', howToVerify: 'Assert that ||u|| > 0 and ||v|| > 0 before projection.' },
    ],
    commonMistakes: [
      { mistake: 'Assuming high cosine similarity implies vectors are close in Euclidean space', solution: 'Vectors [1, 1] and [1000, 1000] have cosine similarity of 1.0 (identical direction), but their Euclidean distance is huge (>1400).' },
    ],
    realWorldUseCases: [
      { industry: 'Information Retrieval / Search Engines', application: 'Vector Search & Semantic Retrieval', benefit: 'Evaluating cosine similarity between user query embeddings and document embeddings retrieves relevant context in milliseconds.' },
    ],
    practiceQuestions: [
      { id: 'pq-2', question: 'If two nonzero vectors u and v satisfy u · v = 0, what does this tell us geometrically about their relationship?', hint: 'Recall u · v = ||u|| ||v|| cos(theta). What theta gives cos(theta) = 0?', answer: 'The angle between them is 90 degrees (pi/2 radians). The vectors are orthogonal (perpendicular), meaning neither has any projection onto the other.' },
    ],
    quiz: [
      {
        id: 'quiz-math-2',
        question: 'Given vectors a = [1, 2, 3] and b = [2, -1, 0], what is their dot product a · b?',
        options: ['4', '0', '-2', '8'],
        correctIndex: 1,
        explanation: 'a · b = (1)(2) + (2)(-1) + (3)(0) = 2 - 2 + 0 = 0. The vectors are orthogonal.',
      },
    ],
    independentExercise: {
      title: 'Implement Orthogonal Gram-Schmidt Basis',
      problem: 'Write a function gram_schmidt_2d(v1, v2) that takes two linearly independent 2D vectors and returns an orthonormal basis {e1, e2} where ||e1|| = 1, ||e2|| = 1, and e1 · e2 = 0.',
      hints: ['Set u1 = v1, then e1 = u1 / ||u1||', 'Set u2 = v2 - proj_{u1}(v2), then e2 = u2 / ||u2||'],
      starterCode: `import numpy as np

def gram_schmidt_2d(v1: np.ndarray, v2: np.ndarray):
    # TODO: Return orthonormal basis (e1, e2)
    return v1, v2

v1 = np.array([3.0, 1.0])
v2 = np.array([2.0, 2.0])
e1, e2 = gram_schmidt_2d(v1, v2)
print("e1:", e1, "e2:", e2)
print("Dot product e1 · e2:", np.dot(e1, e2))
`,
      solution: `import numpy as np

def gram_schmidt_2d(v1: np.ndarray, v2: np.ndarray):
    u1 = v1.astype(np.float64)
    e1 = u1 / np.linalg.norm(u1)
    
    # Orthogonal projection onto u1
    proj = (np.dot(v2, u1) / np.dot(u1, u1)) * u1
    u2 = v2 - proj
    e2 = u2 / np.linalg.norm(u2)
    
    return e1, e2

v1 = np.array([3.0, 1.0])
v2 = np.array([2.0, 2.0])
e1, e2 = gram_schmidt_2d(v1, v2)
print("e1:", np.round(e1, 4), "e2:", np.round(e2, 4))
print("Dot product e1 · e2:", round(float(np.dot(e1, e2)), 6))
`,
    },
    summary: {
      keyTakeaways: [
        'The dot product u · v combines coordinate multiplication with enclosed geometric angles.',
        'Cosine similarity measures pure direction, ignoring magnitude differences.',
        'Vector projection splits any vector into parallel and orthogonal components, forming the mathematical core of linear models.',
      ],
      nextLessonId: 'matrix-inverse-rank-determinants',
      nextLessonTitle: 'Matrix Inverses, Rank, and Determinants',
      nextLessonModuleId: 'module-1',
    },
  },

  'matrix-inverse-rank-determinants': {
    id: 'matrix-inverse-rank-determinants',
    moduleId: 'module-1',
    title: 'Matrix Inverses, Rank, and Determinants',
    subtitle: 'Linear Independence, Full Column Rank, Singular Systems & Volume Scaling',
    order: 3,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Define matrix invertibility, singularity, and full rank conditions.',
      'Interpret determinants geometrically as the signed volume expansion factor.',
      'Diagnose rank deficiency and ill-conditioned systems via the condition number.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'vector-operations-dot-products'],
    analogy: {
      title: 'The Stretcher and the Flattened Pancake',
      text: 'A matrix acts as a machine transforming geometric shapes. If you feed a 2D rubber square into a transformation matrix, it stretches and rotates into a parallelogram. The determinant measures how much the area grew or shrank: det(A) = 3 means the area tripled. If det(A) = 0, the matrix squashes the entire 2D square completely flat into a 1D line or a single 0D dot! Once flattened to a line, you cannot mathematically unflatten it back to the original square, meaning the transformation cannot be inverted.',
      metaphor: 'A singular matrix with det = 0 is a one-way trash compactor: information is irreversibly squashed into a lower dimension.',
    },
    problemSolved: {
      title: 'Solving Systems of Linear Equations in ML',
      description: 'The Normal Equation for Linear Regression requires computing (X^T X)^(-1). If the matrix cannot be inverted, the closed-form solution fails completely.',
      keyPoints: [
        'Explains why multicollinear features break Ordinary Least Squares.',
        'Provides criteria (rank, determinant, condition number) to detect non-invertible design matrices.',
        'Motivates L2 regularization (Ridge) as adding lambda * I to force invertibility.',
      ],
    },
    intuition: {
      overview: 'A matrix A has an inverse A^(-1) if and only if it does not collapse any dimension to zero (its determinant is non-zero and its rank is full).',
      steps: [
        { step: 1, title: 'Linear Independence', description: 'No column vector can be constructed as a weighted linear combination of the other columns.' },
        { step: 2, title: 'Matrix Rank', description: 'The maximum number of linearly independent column (or row) vectors in the matrix.' },
        { step: 3, title: 'Invertibility Condition', description: 'A square matrix A is invertible if and only if rank(A) = d and det(A) != 0.' },
      ],
    },
    mathematics: {
      overview: 'For a square d × d matrix A, the inverse satisfies A A^(-1) = A^(-1) A = I_d.',
      foundations: [
        {
          name: 'Inverse of 2x2 Matrix',
          latex: 'A^{-1} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\quad \\text{where } \\det(A) = ad - bc',
          explanation: 'Requires det(A) != 0 for division to be valid.',
        },
        {
          name: 'Matrix Condition Number',
          latex: '\\kappa(A) = \\|A\\| \\|A^{-1}\\| = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}}',
          explanation: 'Measures numerical sensitivity to floating-point errors. kappa close to 1 is well-conditioned; kappa >> 1000 is ill-conditioned.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Invertibility Failure under Exact Collinearity',
      objective: 'Demonstrate why duplicate or linearly dependent features collapse det(X^T X) to zero.',
      steps: [
        {
          step: 1,
          label: 'Collinear Column Construction',
          latex: '\\mathbf{x}_2 = c \\mathbf{x}_1 \\implies X = [\\mathbf{x}_1 \\quad c\\mathbf{x}_1]',
          explanation: 'Suppose feature 2 is an exact scalar multiple of feature 1.',
        },
        {
          step: 2,
          label: 'Evaluate Gram Matrix X^T X',
          latex: 'X^T X = \\begin{bmatrix} \\mathbf{x}_1^T \\mathbf{x}_1 & c \\mathbf{x}_1^T \\mathbf{x}_1 \\\\ c \\mathbf{x}_1^T \\mathbf{x}_1 & c^2 \\mathbf{x}_1^T \\mathbf{x}_1 \\end{bmatrix}',
          explanation: 'Form the 2x2 normal matrix.',
        },
        {
          step: 3,
          label: 'Determinant Computation',
          latex: '\\det(X^T X) = (\\mathbf{x}_1^T \\mathbf{x}_1)(c^2 \\mathbf{x}_1^T \\mathbf{x}_1) - (c \\mathbf{x}_1^T \\mathbf{x}_1)^2 = c^2 (\\mathbf{x}_1^T \\mathbf{x}_1)^2 - c^2 (\\mathbf{x}_1^T \\mathbf{x}_1)^2 = 0',
          explanation: 'The determinant is identically zero. The matrix is singular and cannot be inverted by Ordinary Least Squares.',
        },
      ],
    },
    variables: [
      { symbol: 'A^{-1}', name: 'Matrix Inverse', description: 'Multiplicative inverse matrix yielding the identity matrix.', dimensions: 'd × d' },
      { symbol: '\\det(A)', name: 'Determinant', description: 'Scalar volume expansion factor under the linear map A.', dimensions: 'Scalar' },
      { symbol: '\\text{rank}(A)', name: 'Matrix Rank', description: 'Dimension of the column vector space span.', dimensions: 'Integer [0, min(N, d)]' },
    ],
    numericalExample: {
      scenario: 'Compute the determinant, rank, and inverse of matrix A = [[3.0, 1.0], [2.0, 4.0]].',
      dataset: [{ sample: 1, a11: 3.0, a12: 1.0, a21: 2.0, a22: 4.0 }],
      calculations: [
        { step: 'Determinant Calculation', math: 'ad - bc = (3.0)(4.0) - (1.0)(2.0) = 12.0 - 2.0', result: '10.00' },
        { step: 'Adjugate Matrix', math: 'adj(A) = [[4.0, -1.0], [-2.0, 3.0]]', result: '[[4.0, -1.0], [-2.0, 3.0]]' },
        { step: 'Inverse Scaling', math: '(1 / 10.0) * adj(A)', result: '[[0.4, -0.1], [-0.2, 0.3]]' },
        { step: 'Verification Multiplication', math: 'A @ A^{-1} = [[3(0.4)+1(-0.2), 3(-0.1)+1(0.3)], [2(0.4)+4(-0.2), 2(-0.1)+4(0.3)]]', result: '[[1.0, 0.0], [0.0, 1.0]]' },
      ],
      finalConclusion: 'Since det(A) = 10.0 != 0, the matrix has full rank 2 and its unique inverse is [[0.4, -0.1], [-0.2, 0.3]].',
    },
    visualExplanation: {
      title: 'Geometric Transformation and Area Expansion',
      description: 'The unit square with vertices (0,0), (1,0), (0,1), (1,1) has area 1. Under transformation by matrix A = [[3, 1], [2, 4]], the unit vectors become (3, 2) and (1, 4), forming a parallelogram with area equal to det(A) = 10.',
      features: ['Positive det preserves orientation', 'Negative det reflects space like a mirror', 'Zero det squashes area to 0'],
    },
    scratchCode: {
      title: 'Matrix Inversion & Condition Number in NumPy',
      explanation: 'Compute rank, determinant, inverse, and verify numerical stability.',
      code: `import numpy as np

def analyze_matrix(A: np.ndarray):
    det = np.linalg.det(A)
    rank = np.linalg.matrix_rank(A)
    cond = np.linalg.cond(A)
    
    if abs(det) < 1e-10:
        inv = "Singular (No Inverse)"
    else:
        inv = np.linalg.inv(A)
        
    return {
        'det': round(float(det), 4),
        'rank': int(rank),
        'condition_number': round(float(cond), 4),
        'inverse': inv if isinstance(inv, str) else np.round(inv, 4).tolist()
    }

A = np.array([[3.0, 1.0], [2.0, 4.0]])
print("Analysis:", analyze_matrix(A))
`,
    },
    sklearnCode: {
      title: 'Solving Linear Systems via np.linalg.solve',
      explanation: 'Always prefer np.linalg.solve(A, b) over explicit np.linalg.inv(A) @ b for numerical accuracy.',
      code: `import numpy as np

# System of equations:
# 3x + 1y = 9
# 2x + 4y = 16

A = np.array([[3.0, 1.0], [2.0, 4.0]])
b = np.array([9.0, 16.0])

# Direct solve using LU decomposition (faster and numerically stable)
x = np.linalg.solve(A, b)
print(f"Solution [x, y]: {x}")
`,
    },
    runnableCode: {
      code: `import numpy as np

A = np.array([[3.0, 1.0], [2.0, 4.0]])
det = np.linalg.det(A)
inv = np.linalg.inv(A)
identity_check = A @ inv

print("Matrix A:")
print(A)
print(f"Determinant: {det:.2f}")
print("Inverse A^(-1):")
print(np.round(inv, 2))
print("A @ A^(-1) (Identity check):")
print(np.round(identity_check, 2))
`,
      expectedOutput: `Matrix A:\n[[3. 1.]\n [2. 4.]]\nDeterminant: 10.00\nInverse A^(-1):\n[[ 0.4 -0.1]\n [-0.2  0.3]]\nA @ A^(-1) (Identity check):\n[[1. 0.]\n [0. 1.]]`,
    },
    lineByLineExplanation: [
      { lines: 'Line 3', codeSnippet: 'A = np.array([[3.0, 1.0], [2.0, 4.0]])', explanation: 'Creates a 2x2 square real coefficient matrix.' },
      { lines: 'Line 4', codeSnippet: 'det = np.linalg.det(A)', explanation: 'Computes the determinant volume scaling factor.' },
      { lines: 'Line 5', codeSnippet: 'inv = np.linalg.inv(A)', explanation: 'Computes the inverse matrix using LAPACK dgesv factorization.' },
      { lines: 'Line 6', codeSnippet: 'identity_check = A @ inv', explanation: 'Verifies the property A @ A^(-1) = I.' },
    ],
    hyperparameters: [
      { name: 'rcond', defaultVal: '1e-15', range: '[0, 1]', effect: 'Cutoff ratio for small singular values in pseudoinverse.', recommendation: 'Use default machine epsilon unless dataset is severely ill-conditioned.' },
    ],
    assumptions: [
      { assumption: 'Square and Full Rank', whyItMatters: 'Matrix inversion is only defined for square matrices with non-zero determinant.', howToVerify: 'Check np.linalg.matrix_rank(A) == A.shape[0].' },
    ],
    commonMistakes: [
      { mistake: 'Computing inv(A) @ b instead of using solve(A, b)', solution: 'Never invert a matrix explicitly to solve linear systems. solve(A, b) is faster and avoids precision loss from condition number squaring.' },
    ],
    realWorldUseCases: [
      { industry: 'Quantitative Finance / Econometrics', application: 'Portfolio Covariance Inversion (Markowitz)', benefit: 'Inverting the asset covariance matrix determines minimum-variance portfolio weights.' },
    ],
    practiceQuestions: [
      { id: 'pq-3', question: 'What happens to the Normal Equation (X^T X)^(-1) X^T y when two input features are perfectly identical?', hint: 'What is the rank and determinant of X^T X?', answer: 'The columns of X become linearly dependent, making X^T X rank-deficient with det(X^T X) = 0. Its inverse does not exist, causing standard OLS solvers to crash or produce wild numerical artifacts.' },
    ],
    quiz: [
      {
        id: 'quiz-math-3',
        question: 'Which of the following matrices is singular (non-invertible)?',
        options: ['[[1, 0], [0, 1]]', '[[2, 4], [1, 2]]', '[[3, 1], [0, 2]]', '[[5, -1], [2, 3]]'],
        correctIndex: 1,
        explanation: 'For [[2, 4], [1, 2]], det = (2)(2) - (4)(1) = 4 - 4 = 0. The second row is half of the first row, so the matrix is singular.',
      },
    ],
    independentExercise: {
      title: 'Detect Ill-Conditioned Feature Matrices',
      problem: 'Write a function is_ill_conditioned(X, threshold=1000.0) that returns True if the condition number of (X^T X) exceeds the threshold, signaling multicollinearity.',
      hints: ['Compute Gram matrix G = X.T @ X', 'Calculate condition number using np.linalg.cond(G)'],
      starterCode: `import numpy as np

def is_ill_conditioned(X: np.ndarray, threshold: float = 1000.0) -> bool:
    # TODO: check if condition number of X.T @ X exceeds threshold
    return False

# Healthy matrix
X_clean = np.array([[1.0, 2.0], [2.0, 1.0], [3.0, 4.0]])
# Multicollinear matrix (col 2 is almost identical to col 1)
X_collinear = np.array([[1.0, 1.0001], [2.0, 2.0001], [3.0, 3.0001]])

print("Clean ill-conditioned?", is_ill_conditioned(X_clean))
print("Collinear ill-conditioned?", is_ill_conditioned(X_collinear))
`,
      solution: `import numpy as np

def is_ill_conditioned(X: np.ndarray, threshold: float = 1000.0) -> bool:
    G = X.T @ X
    cond = np.linalg.cond(G)
    return bool(cond > threshold)

X_clean = np.array([[1.0, 2.0], [2.0, 1.0], [3.0, 4.0]])
X_collinear = np.array([[1.0, 1.0001], [2.0, 2.0001], [3.0, 3.0001]])

print("Clean ill-conditioned?", is_ill_conditioned(X_clean))
print("Collinear ill-conditioned?", is_ill_conditioned(X_collinear))
`,
    },
    summary: {
      keyTakeaways: [
        'A matrix is invertible if and only if it has full rank and non-zero determinant.',
        'Determinants geometrically measure signed volume distortion under linear transformation.',
        'Ill-conditioned matrices amplify numerical noise; regularization is required to restore stability.',
      ],
      nextLessonId: 'eigenvalues-eigenvectors',
      nextLessonTitle: 'Eigenvalues and Eigenvectors',
      nextLessonModuleId: 'module-1',
    },
  },

  'eigenvalues-eigenvectors': {
    id: 'eigenvalues-eigenvectors',
    moduleId: 'module-1',
    title: 'Eigenvalues and Eigenvectors',
    subtitle: 'Invariant Directional Axes, Spectral Decomposition & Principal Coordinate Systems',
    order: 4,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Solve the characteristic equation det(A - lambda * I) = 0 for eigenvalues and eigenvectors.',
      'Understand how eigenvectors represent invariant transformation axes where vectors only stretch without rotating.',
      'Apply spectral decomposition A = Q Lambda Q^T to symmetric covariance matrices in PCA.',
    ],
    prerequisites: ['matrix-inverse-rank-determinants', 'Quadratic formula'],
    analogy: {
      title: 'The Taffy Puller and the Invariant Axis',
      text: 'When a mechanical candy machine stretches a lump of taffy, almost every point moves in an arc, rotating and shifting. But there exists a special central axis along which the candy simply stretches directly outward without bending or rotating at all. That invariant direction is the eigenvector, and the factor by which it stretches (e.g., 2.5x) is its eigenvalue.',
      metaphor: 'Eigenvectors are the pure stretching directions of a matrix; eigenvalues are their stretch factors.',
    },
    problemSolved: {
      title: 'Decoupling Correlated Features in Machine Learning',
      description: 'Tabular datasets feature complex inter-feature correlations. Eigendecomposition rotates the coordinate system to align with the axes of maximum data spread, forming the foundation of Principal Component Analysis (PCA).',
      keyPoints: [
        'Diagonalizes matrices to decouple complex coupled linear equations.',
        'Identifies the directions of highest variance in covariance matrices.',
        'Reveals stability in dynamical systems and Markov chains (PageRank).',
      ],
    },
    intuition: {
      overview: 'For almost all vectors x, multiplying by matrix A rotates and scales the vector. An eigenvector v is special: A * v points in the exact same (or opposite) direction as v, merely scaled by scalar lambda.',
      steps: [
        { step: 1, title: 'Fundamental Eigen Equation', description: 'A v = lambda v, where v != 0 is the eigenvector and lambda is the eigenvalue.' },
        { step: 2, title: 'Formulate Characteristic Equation', description: '(A - lambda I) v = 0. For non-trivial solutions v != 0, det(A - lambda I) must equal 0.' },
        { step: 3, title: 'Spectral Theorem', description: 'Every real symmetric matrix has d real eigenvalues and d mutually orthogonal eigenvectors.' },
      ],
    },
    mathematics: {
      overview: 'Eigenvalues lambda are the roots of the characteristic polynomial p(lambda) = det(A - lambda I).',
      foundations: [
        {
          name: 'Eigenvalue Equation',
          latex: 'A \\mathbf{v} = \\lambda \\mathbf{v} \\iff (A - \\lambda I) \\mathbf{v} = \\mathbf{0}',
          explanation: 'States that matrix multiplication acts as simple scalar multiplication along direction v.',
        },
        {
          name: 'Spectral Decomposition (Symmetric A)',
          latex: 'A = Q \\Lambda Q^T = \\sum_{i=1}^{d} \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T',
          explanation: 'Expresses symmetric matrix A as a sum of rank-1 projection matrices scaled by eigenvalues.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Eigenvalues for a 2x2 Matrix',
      objective: 'Solve det(A - lambda I) = 0 explicitly for a 2x2 matrix.',
      steps: [
        {
          step: 1,
          label: 'Construct (A - lambda I)',
          latex: 'A - \\lambda I = \\begin{bmatrix} a - \\lambda & b \\\\ c & d - \\lambda \\end{bmatrix}',
          explanation: 'Subtract lambda from the diagonal entries.',
        },
        {
          step: 2,
          label: 'Compute the Determinant',
          latex: '\\det(A - \\lambda I) = (a - \\lambda)(d - \\lambda) - bc = \\lambda^2 - (a + d)\\lambda + (ad - bc) = 0',
          explanation: 'Notice that (a + d) is the Trace of A and (ad - bc) is the Determinant of A.',
        },
        {
          step: 3,
          label: 'Characteristic Equation in Trace and Determinant',
          latex: '\\lambda^2 - \\text{Tr}(A)\\lambda + \\det(A) = 0 \\implies \\lambda = \\frac{\\text{Tr}(A) \\pm \\sqrt{\\text{Tr}(A)^2 - 4\\det(A)}}{2}',
          explanation: 'Roots can be found immediately using the quadratic formula.',
        },
      ],
    },
    variables: [
      { symbol: '\\lambda', name: 'Eigenvalue', description: 'Scalar stretch factor along the eigenvector direction.', dimensions: 'Scalar (Real or Complex)' },
      { symbol: '\\mathbf{v}', name: 'Eigenvector', description: 'Non-zero directional vector satisfying A v = lambda v.', dimensions: 'd × 1' },
      { symbol: '\\Lambda', name: 'Diagonal Eigenvalue Matrix', description: 'Diagonal matrix containing eigenvalues sorted in descending magnitude.', dimensions: 'd × d' },
    ],
    numericalExample: {
      scenario: 'Find eigenvalues and eigenvectors of symmetric matrix A = [[4.0, 2.0], [2.0, 1.0]].',
      dataset: [{ sample: 1, a11: 4.0, a12: 2.0, a21: 2.0, a22: 1.0 }],
      calculations: [
        { step: 'Trace and Determinant', math: 'Tr(A) = 4 + 1 = 5.0, det(A) = (4)(1) - (2)(2) = 0.0', result: 'Tr=5, det=0' },
        { step: 'Characteristic Equation', math: '\\lambda^2 - 5\\lambda + 0 = 0 \\implies \\lambda(\\lambda - 5) = 0', result: '\\lambda_1 = 5.0, \\lambda_2 = 0.0' },
        { step: 'Eigenvector for lambda = 5', math: '(A - 5I)v = [[-1, 2], [2, -4]]v = 0 \\implies -v_1 + 2v_2 = 0 \\implies v = [2, 1]^T', result: 'Normalized: [0.8944, 0.4472]' },
        { step: 'Eigenvector for lambda = 0', math: '(A - 0I)v = [[4, 2], [2, 1]]v = 0 \\implies 2v_1 + v_2 = 0 \\implies v = [-1, 2]^T', result: 'Normalized: [-0.4472, 0.8944]' },
        { step: 'Orthogonality Check', math: '(0.8944)(-0.4472) + (0.4472)(0.8944) = -0.4 + 0.4', result: '0.00' },
      ],
      finalConclusion: 'The eigenvectors [2, 1] and [-1, 2] are perfectly perpendicular (dot product = 0), verifying the Spectral Theorem for symmetric matrices.',
    },
    visualExplanation: {
      title: 'Principal Stretch Axes of Data Ellipsoids',
      description: 'The covariance matrix of a 2D dataset defines an ellipse. The first eigenvector points along the major axis of maximum spread; the second eigenvector points along the minor axis. Their lengths are proportional to sqrt(lambda).',
      features: ['Major axis = eigenvector 1', 'Minor axis = eigenvector 2', 'Orthogonal frame of maximum variance'],
    },
    scratchCode: {
      title: 'Power Iteration Algorithm in NumPy',
      explanation: 'Numerical method to find the dominant eigenvalue and eigenvector without solving polynomials.',
      code: `import numpy as np

def power_iteration(A: np.ndarray, num_simulations: int = 100):
    """Finds the largest eigenvalue and corresponding eigenvector."""
    b_k = np.random.rand(A.shape[1])
    b_k = b_k / np.linalg.norm(b_k)

    for _ in range(num_simulations):
        # Multiply by matrix
        b_k1 = np.dot(A, b_k)
        # Normalize
        b_k = b_k1 / np.linalg.norm(b_k1)

    # Rayleigh quotient for eigenvalue
    eigenvalue = float(np.dot(b_k, np.dot(A, b_k)))
    return round(eigenvalue, 4), np.round(b_k, 4)

A = np.array([[4.0, 2.0], [2.0, 1.0]])
val, vec = power_iteration(A)
print(f"Dominant Eigenvalue: {val}")
print(f"Dominant Eigenvector: {vec}")
`,
    },
    sklearnCode: {
      title: 'Eigendecomposition via np.linalg.eigh',
      explanation: 'Always use np.linalg.eigh (rather than eig) for symmetric matrices like covariance matrices.',
      code: `import numpy as np

# Covariance matrix (always symmetric)
cov_matrix = np.array([[4.0, 2.0], [2.0, 1.0]])

# eigh guarantees real eigenvalues and sorted ascending order
eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)

# Sort descending
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

print("Eigenvalues:", np.round(eigenvalues, 4))
print("Eigenvectors (columns):\n", np.round(eigenvectors, 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

A = np.array([[4.0, 2.0], [2.0, 1.0]])
eigenvalues, eigenvectors = np.linalg.eigh(A)

print("Eigenvalues (sorted ascending by eigh):")
print(np.round(eigenvalues, 2))
print("Eigenvectors (column-wise):")
print(np.round(eigenvectors, 4))

# Verification: A @ v == lambda * v
v1 = eigenvectors[:, 1] # dominant
lam1 = eigenvalues[1]
print("A @ v1:", np.round(A @ v1, 4))
print("lambda1 * v1:", np.round(lam1 * v1, 4))
`,
      expectedOutput: `Eigenvalues (sorted ascending by eigh):\n[0. 5.]\nEigenvectors (column-wise):\n[[-0.4472  0.8944]\n [ 0.8944  0.4472]]\nA @ v1: [4.4721 2.2361]\nlambda1 * v1: [4.4721 2.2361]`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'eigenvalues, eigenvectors = np.linalg.eigh(A)', explanation: 'Calls LAPACK dsyevd to compute eigenvalues and eigenvectors of a symmetric real matrix.' },
      { lines: 'Line 10', codeSnippet: 'v1 = eigenvectors[:, 1]', explanation: 'Extracts the second column representing the dominant eigenvector corresponding to lambda = 5.' },
      { lines: 'Lines 12-13', codeSnippet: 'A @ v1 vs lam1 * v1', explanation: 'Demonstrates exact numerical equivalence of matrix multiplication and scalar scaling.' },
    ],
    hyperparameters: [
      { name: 'solver', defaultVal: 'eigh', range: '["eigh", "eig"]', effect: 'eigh uses specialized algorithms for symmetric/Hermitian matrices, ensuring real eigenvalues and orthogonal eigenvectors.', recommendation: 'Use eigh for covariance matrices and kernel matrices.' },
    ],
    assumptions: [
      { assumption: 'Symmetry for Orthogonal Eigenbasis', whyItMatters: 'Only symmetric matrices are guaranteed to produce mutually orthogonal eigenvectors with purely real eigenvalues.', howToVerify: 'Check np.allclose(A, A.T).' },
    ],
    commonMistakes: [
      { mistake: 'Reading eigenvectors row-wise instead of column-wise from np.linalg.eig', solution: 'NumPy returns eigenvectors where eigenvectors[:, i] is the i-th eigenvector.' },
    ],
    realWorldUseCases: [
      { industry: 'Computer Vision / Face Recognition', application: 'Eigenfaces', benefit: 'Projecting face images onto top eigenvectors of pixel covariance extracts the essential facial features for classification in reduced dimensions.' },
    ],
    practiceQuestions: [
      { id: 'pq-4', question: 'What is the sum of all eigenvalues of a square matrix equal to?', hint: 'Think of the diagonal sum.', answer: 'The sum of all eigenvalues equals the Trace of the matrix (the sum of its main diagonal elements): sum(lambda_i) = Tr(A).' },
    ],
    quiz: [
      {
        id: 'quiz-math-4',
        question: 'If a 2x2 matrix has eigenvalues lambda_1 = 6 and lambda_2 = 2, what is its determinant?',
        options: ['8', '12', '4', '3'],
        correctIndex: 1,
        explanation: 'The determinant of a matrix equals the product of its eigenvalues: det(A) = lambda_1 * lambda_2 = 6 * 2 = 12.',
      },
    ],
    independentExercise: {
      title: 'Reconstruct Matrix from Spectral Decomposition',
      problem: 'Write a function reconstruct_matrix(eigenvalues, eigenvectors) that recreates the original matrix A = Q Lambda Q^T.',
      hints: ['Construct diagonal matrix np.diag(eigenvalues)', 'Perform matrix multiplication Q @ Lambda @ Q.T'],
      starterCode: `import numpy as np

def reconstruct_matrix(eigenvalues: np.ndarray, eigenvectors: np.ndarray) -> np.ndarray:
    # TODO: compute Q @ Lambda @ Q.T
    return np.zeros((len(eigenvalues), len(eigenvalues)))

vals = np.array([5.0, 0.0])
vecs = np.array([[2/np.sqrt(5), -1/np.sqrt(5)], [1/np.sqrt(5), 2/np.sqrt(5)]])
print(reconstruct_matrix(vals, vecs))
`,
      solution: `import numpy as np

def reconstruct_matrix(eigenvalues: np.ndarray, eigenvectors: np.ndarray) -> np.ndarray:
    Lambda = np.diag(eigenvalues)
    Q = eigenvectors
    return Q @ Lambda @ Q.T

vals = np.array([5.0, 0.0])
vecs = np.array([[2/np.sqrt(5), -1/np.sqrt(5)], [1/np.sqrt(5), 2/np.sqrt(5)]])
A_rec = reconstruct_matrix(vals, vecs)
print(np.round(A_rec, 4))
`,
    },
    summary: {
      keyTakeaways: [
        'Eigenvectors satisfy A v = lambda v, pointing in directions where the matrix only stretches space without rotating.',
        'Symmetric matrices (like covariance matrices) have real eigenvalues and mutually perpendicular eigenvectors.',
        'The product of eigenvalues is the determinant; the sum is the trace.',
      ],
      nextLessonId: 'singular-value-decomposition',
      nextLessonTitle: 'Singular Value Decomposition (SVD)',
      nextLessonModuleId: 'module-1',
    },
  },

  'singular-value-decomposition': {
    id: 'singular-value-decomposition',
    moduleId: 'module-1',
    title: 'Singular Value Decomposition (SVD)',
    subtitle: 'The Universal Factorization Theorem: A = U Sigma V^T, Low-Rank Approximations & Pseudoinverses',
    order: 5,
    readTimeMinutes: 28,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Factorize any arbitrary rectangular matrix into A = U Sigma V^T.',
      'Apply the Eckart-Young-Mirsky theorem to compute optimal low-rank matrix approximations.',
      'Calculate the Moore-Penrose pseudoinverse A^+ to solve under- and over-determined linear systems.',
    ],
    prerequisites: ['eigenvalues-eigenvectors', 'matrix-inverse-rank-determinants'],
    analogy: {
      title: 'The Master Sound Mixer and Compression',
      text: 'Imagine a high-definition orchestral recording with 100 instruments. Many instruments play duplicate harmonic chords. SVD acts like a master audio compressor: it sorts the music into pure sonic themes ordered by loudness (singular values). If you keep only the top 5 loudest themes and mute the 95 quiet ones, the human ear still hears 98% of the full symphony, while the audio file shrinks to 5% of its original size.',
      metaphor: 'SVD factorizes any data matrix into rotation (V^T) -> axis scaling (Sigma) -> rotation (U).',
    },
    problemSolved: {
      title: 'Compressing and Inverting Arbitrary Non-Square Data',
      description: 'Eigendecomposition only works for square matrices. SVD generalizes factorization to ANY rectangular N x d matrix, enabling latent semantic analysis, image compression, and collaborative filtering.',
      keyPoints: [
        'Guaranteed to exist for every rectangular real or complex matrix.',
        'Provides optimal low-rank rank-k approximations in Frobenius and spectral norms.',
        'Powers the Moore-Penrose pseudoinverse for regression when X^T X is non-invertible.',
      ],
    },
    intuition: {
      overview: 'Any linear transformation can be decomposed into three fundamental geometric steps: rotate the domain, scale along the axes, and rotate the range.',
      steps: [
        { step: 1, title: 'Right Singular Vectors V', description: 'Orthonormal eigenvectors of A^T A forming the input coordinate basis.' },
        { step: 2, title: 'Singular Values Sigma', description: 'Non-negative square roots of eigenvalues of A^T A sorted in descending order: sigma_1 >= sigma_2 >= ... >= 0.' },
        { step: 3, title: 'Left Singular Vectors U', description: 'Orthonormal eigenvectors of A A^T forming the output coordinate basis.' },
      ],
    },
    mathematics: {
      overview: 'For any matrix A in R^(N x d), SVD decomposes A into A = U Sigma V^T.',
      foundations: [
        {
          name: 'Full SVD Decomposition',
          latex: 'A = U \\Sigma V^T = \\sum_{i=1}^{r} \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T',
          explanation: 'Sum of r rank-one outer product matrices, where r = rank(A).',
        },
        {
          name: 'Eckart-Young-Mirsky Theorem',
          latex: 'A_k = \\sum_{i=1}^{k} \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T = \\arg\\min_{B: \\text{rank}(B)=k} \\|A - B\\|_F',
          explanation: 'Truncating SVD at top k singular values yields the provably best rank-k approximation.',
        },
        {
          name: 'Moore-Penrose Pseudoinverse',
          latex: 'A^+ = V \\Sigma^+ U^T \\quad \\text{where } \\Sigma^+_{ii} = 1/\\sigma_i \\text{ if } \\sigma_i > 0 \\text{ else } 0',
          explanation: 'Computes the minimum-norm least-squares solution w = A^+ y for any linear system.',
        },
      ],
    },
    derivation: {
      title: 'Connection Between SVD and Eigendecomposition',
      objective: 'Show how A^T A and A A^T determine the singular values and singular vectors.',
      steps: [
        {
          step: 1,
          label: 'Construct A^T A',
          latex: 'A^T A = (U \\Sigma V^T)^T (U \\Sigma V^T) = V \\Sigma^T U^T U \\Sigma V^T',
          explanation: 'Since U is orthogonal, U^T U = I.',
        },
        {
          step: 2,
          label: 'Derive Diagonal Eigensystem',
          latex: 'A^T A = V \\Sigma^2 V^T',
          explanation: 'This matches the spectral decomposition of A^T A. Thus, V are eigenvectors of A^T A and singular values are sigma_i = sqrt(lambda_i(A^T A)).',
        },
        {
          step: 3,
          label: 'Construct A A^T',
          latex: 'A A^T = U \\Sigma V^T V \\Sigma^T U^T = U \\Sigma^2 U^T',
          explanation: 'Similarly, U are the orthonormal eigenvectors of A A^T.',
        },
      ],
    },
    variables: [
      { symbol: 'U', name: 'Left Singular Vectors', description: 'Orthonormal columns spanning the column space of A.', dimensions: 'N × N (or N × r)' },
      { symbol: '\\Sigma', name: 'Singular Values Matrix', description: 'Diagonal matrix containing singular values sigma_i >= 0.', dimensions: 'N × d (or r × r)' },
      { symbol: 'V', name: 'Right Singular Vectors', description: 'Orthonormal columns spanning the row space of A.', dimensions: 'd × d (or d × r)' },
    ],
    numericalExample: {
      scenario: 'Perform SVD on rectangular 3x2 matrix A = [[3, 0], [0, -2], [0, 0]].',
      dataset: [{ sample: 1, a11: 3, a12: 0, a21: 0, a22: -2, a31: 0, a32: 0 }],
      calculations: [
        { step: 'Compute A^T A', math: 'A^T A = [[3^2, 0], [0, (-2)^2]] = [[9, 0], [0, 4]]', result: '[[9, 0], [0, 4]]' },
        { step: 'Eigenvalues and Singular Values', math: '\\lambda_1 = 9 \\implies \\sigma_1 = 3.0; \\lambda_2 = 4 \\implies \\sigma_2 = 2.0', result: '\\sigma = [3.0, 2.0]' },
        { step: 'Right Singular Vectors V', math: 'Eigenvectors of A^T A: v_1 = [1, 0]^T, v_2 = [0, 1]^T', result: 'V = I_2' },
        { step: 'Left Singular Vectors u_i = A v_i / sigma_i', math: 'u_1 = [3, 0, 0]^T / 3 = [1, 0, 0]^T; u_2 = [0, -2, 0]^T / 2 = [0, -1, 0]^T', result: 'u_1 = [1, 0, 0], u_2 = [0, -1, 0]' },
        { step: 'Reconstruction Check', math: '\\sigma_1 u_1 v_1^T + \\sigma_2 u_2 v_2^T = 3 [1,0,0]^T [1,0] + 2 [0,-1,0]^T [0,1]', result: '[[3, 0], [0, -2], [0, 0]]' },
      ],
      finalConclusion: 'The decomposition is exact: A = U Sigma V^T. The rank of matrix A is 2.',
    },
    visualExplanation: {
      title: 'SVD as Ellipsoid Transformation of the Unit Sphere',
      description: 'The unit sphere in R^d is transformed by A into a hyper-ellipsoid in R^N. The directions of the principal semi-axes are given by u_i, and their lengths are the singular values sigma_i.',
      features: ['Singular values = semi-axis lengths', 'Left singular vectors = ellipsoid orientation', 'Right singular vectors = pre-image axes'],
    },
    scratchCode: {
      title: 'Low-Rank Matrix Image Compression via SVD',
      explanation: 'Reconstruct a low-rank approximation of a matrix using top k singular values.',
      code: `import numpy as np

def low_rank_approximation(A: np.ndarray, k: int):
    """Computes optimal rank-k approximation using Truncated SVD."""
    U, s, Vt = np.linalg.svd(A, full_matrices=False)
    
    # Keep top k components
    U_k = U[:, :k]
    s_k = s[:k]
    Vt_k = Vt[:k, :]
    
    # Reconstruct
    A_k = U_k @ np.diag(s_k) @ Vt_k
    energy_captured = np.sum(s_k ** 2) / np.sum(s ** 2)
    
    return A_k, energy_captured

# Simulated 10x10 matrix
np.random.seed(42)
X = np.random.randn(10, 5) @ np.random.randn(5, 10)
A_3, energy = low_rank_approximation(X, k=3)
print(f"Energy preserved with k=3: {energy * 100:.2f}%")
`,
    },
    sklearnCode: {
      title: 'TruncatedSVD in Scikit-Learn (Latent Semantic Analysis)',
      explanation: 'TruncatedSVD works directly on sparse matrices without centering, unlike PCA.',
      code: `import numpy as np
from sklearn.decomposition import TruncatedSVD

# Sample document-term count matrix
X = np.array([
    [3, 1, 0, 0],
    [2, 0, 1, 0],
    [0, 1, 3, 2],
    [0, 0, 2, 4]
], dtype=float)

svd = TruncatedSVD(n_components=2, random_state=42)
X_reduced = svd.fit_transform(X)

print("Reduced Coordinates (2D topic embeddings):\n", np.round(X_reduced, 3))
print("Explained Variance Ratio:", np.round(svd.explained_variance_ratio_, 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

A = np.array([[3.0, 0.0], [0.0, -2.0], [0.0, 0.0]])
U, s, Vt = np.linalg.svd(A, full_matrices=False)

print("Singular Values sigma:")
print(np.round(s, 2))
print("Left Singular Vectors U:")
print(np.round(U, 2))
print("Right Singular Vectors V^T:")
print(np.round(Vt, 2))

# Reconstruct
A_rec = U @ np.diag(s) @ Vt
print("Reconstructed A:")
print(np.round(A_rec, 2))
`,
      expectedOutput: `Singular Values sigma:\n[3. 2.]\nLeft Singular Vectors U:\n[[ 1.  0.]\n [ 0. -1.]\n [ 0.  0.]]\nRight Singular Vectors V^T:\n[[1. 0.]\n [0. 1.]]\nReconstructed A:\n[[ 3.  0.]\n [ 0. -2.]\n [ 0.  0.]]`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'U, s, Vt = np.linalg.svd(A, full_matrices=False)', explanation: 'Computes economy-size SVD where U is N x min(N, d).' },
      { lines: 'Line 6', codeSnippet: 'print(s)', explanation: 'Displays singular values sorted in descending order [3.0, 2.0].' },
      { lines: 'Line 13', codeSnippet: 'A_rec = U @ np.diag(s) @ Vt', explanation: 'Reconstructs the original matrix by forming the diagonal matrix and multiplying factors.' },
    ],
    hyperparameters: [
      { name: 'n_components', defaultVal: '2', range: '[1, min(N, d)]', effect: 'Number of singular components retained.', recommendation: 'Choose k such that cumulative explained energy (sum(s_k^2)/sum(s^2)) exceeds 0.90 (90%).' },
    ],
    assumptions: [
      { assumption: 'Real or Complex Finite Matrix', whyItMatters: 'SVD requires finite numeric entries; NaN or Inf values cause LAPACK convergence errors.', howToVerify: 'Verify np.all(np.isfinite(A)).' },
    ],
    commonMistakes: [
      { mistake: 'Assuming np.linalg.svd returns V instead of V^T', solution: 'NumPy returns Vt (V transposed). To get V, use Vt.T.' },
    ],
    realWorldUseCases: [
      { industry: 'Entertainment / Streaming (Netflix)', application: 'Collaborative Filtering Matrix Factorization', benefit: 'Decomposes sparse User-Movie rating matrices into latent user preference vectors (U) and movie genre vectors (V).' },
    ],
    practiceQuestions: [
      { id: 'pq-5', question: 'How is SVD related to the pseudoinverse of a matrix with linearly dependent columns?', hint: 'Recall A^+ = V Sigma^+ U^T.', answer: 'When columns are dependent, singular values equal zero. The pseudoinverse sets 1/0 to 0 in Sigma^+, suppressing zero-variance directions and providing the minimum-norm least-squares solution.' },
    ],
    quiz: [
      {
        id: 'quiz-math-5',
        question: 'According to the Eckart-Young-Mirsky theorem, what is the best rank-k approximation of a matrix A?',
        options: [
          'The matrix formed by setting the smallest k rows of A to zero.',
          'The summation of the first k terms of the SVD outer product: sum_{i=1}^k sigma_i u_i v_i^T.',
          'The matrix computed by QR decomposition of the first k columns.',
          'The inverse matrix multiplied by k.',
        ],
        correctIndex: 1,
        explanation: 'Eckart-Young proves that truncating SVD at the top k singular values yields the optimal rank-k approximation under both Frobenius and spectral norms.',
      },
    ],
    independentExercise: {
      title: 'Compute Moore-Penrose Pseudoinverse using SVD',
      problem: 'Write a function custom_pinv(A, tol=1e-10) that computes the Moore-Penrose pseudoinverse A^+ using SVD decomposition.',
      hints: ['Get U, s, Vt from np.linalg.svd(A, full_matrices=False)', 'Invert singular values: s_inv = np.where(s > tol, 1.0 / s, 0.0)', 'Return Vt.T @ np.diag(s_inv) @ U.T'],
      starterCode: `import numpy as np

def custom_pinv(A: np.ndarray, tol: float = 1e-10) -> np.ndarray:
    # TODO: Implement A^+ = V @ Sigma^+ @ U^T
    return A.T

A = np.array([[1.0, 2.0], [2.0, 4.0]]) # Rank deficient (col 2 is 2x col 1)
pinv = custom_pinv(A)
print("Pseudoinverse:\n", np.round(pinv, 4))
print("NumPy pinv check:\n", np.round(np.linalg.pinv(A), 4))
`,
      solution: `import numpy as np

def custom_pinv(A: np.ndarray, tol: float = 1e-10) -> np.ndarray:
    U, s, Vt = np.linalg.svd(A, full_matrices=False)
    s_inv = np.where(s > tol, 1.0 / s, 0.0)
    return Vt.T @ np.diag(s_inv) @ U.T

A = np.array([[1.0, 2.0], [2.0, 4.0]])
pinv = custom_pinv(A)
print("Pseudoinverse:\n", np.round(pinv, 4))
print("NumPy pinv check:\n", np.round(np.linalg.pinv(A), 4))
`,
    },
    summary: {
      keyTakeaways: [
        'SVD factorizes any matrix A into rotation (V^T) -> stretch (Sigma) -> rotation (U).',
        'The singular values measure energy along orthogonal axes; truncating small values yields optimal compression.',
        'SVD enables stable inversion of singular and non-square matrices via the pseudoinverse.',
      ],
      nextLessonId: 'derivatives-chain-rule',
      nextLessonTitle: 'Derivatives and the Multivariable Chain Rule',
      nextLessonModuleId: 'module-1',
    },
  },

  'derivatives-chain-rule': {
    id: 'derivatives-chain-rule',
    moduleId: 'module-1',
    title: 'Derivatives and the Multivariable Chain Rule',
    subtitle: 'First Principles, Instantaneous Rate of Change & Computational Graphs',
    order: 6,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Define derivatives from first principles limits: f\'(x) = lim_{h -> 0} [f(x+h) - f(x)] / h.',
      'Differentiate standard ML loss functions (squared error, absolute error).',
      'Apply the multivariable chain rule through multi-stage computational graphs.',
    ],
    prerequisites: ['Basic high school algebra', 'Functional composition f(g(x))'],
    analogy: {
      title: 'The Steering Wheel Sensitivity & Gear Train',
      text: 'If you turn a car steering wheel by 1 degree, the front wheels might pivot by 0.2 degrees (derivative = 0.2). In a bicycle gear train, turning the pedal crank rotates the front sprocket, which drives the chain, which turns the rear cog, which spins the wheel. The total gear ratio is the product of the individual gear ratios multiplied together. The chain rule is nothing more than this gear multiplication: total rate of change is the product of each intermediate rate of change.',
      metaphor: 'The chain rule multiplies local sensitivity ratios along a chain of dependent operations.',
    },
    problemSolved: {
      title: 'Enabling Neural Network Backpropagation',
      description: 'Complex machine learning models are deep compositions of nested mathematical functions: y_hat = f_L(f_{L-1}(...f_1(x))). The chain rule enables us to compute how changing an early weight w_1 impacts the final loss L.',
      keyPoints: [
        'Decomposes complex derivatives into modular, local gradient computations.',
        'Forms the mathematical foundation of reverse-mode automatic differentiation in PyTorch and TensorFlow.',
        'Guarantees linear-time gradient evaluation O(E) through directed acyclic graphs.',
      ],
    },
    intuition: {
      overview: 'A derivative measures instantaneous sensitivity: if we nudge the input by an infinitesimal amount dx, by how much does the output dy change? The ratio dy/dx is the derivative.',
      steps: [
        { step: 1, title: 'Limit Definition', description: 'Evaluate the difference quotient as step size h approaches zero.' },
        { step: 2, title: 'Power and Sum Rules', description: 'Linear operators allow differentiating sums term by term: d/dx [af + bg] = a f\' + b g\'.' },
        { step: 3, title: 'Chain Rule Composition', description: 'If z = f(y) and y = g(x), then dz/dx = (dz/dy) * (dy/dx).' },
      ],
    },
    mathematics: {
      overview: 'Calculus provides analytical rules to compute exact rates of change across continuous functions.',
      foundations: [
        {
          name: 'First Principles Derivative Definition',
          latex: 'f\'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
          explanation: 'Slope of the tangent line to the curve f(x) at point x.',
        },
        {
          name: 'Univariate Chain Rule',
          latex: '\\frac{d}{dx} [f(g(x))] = f\'(g(x)) \\cdot g\'(x) \\iff \\frac{dz}{dx} = \\frac{dz}{dy} \\cdot \\frac{dy}{dx}',
          explanation: 'Derivative of the outer function evaluated at inner function, times derivative of inner function.',
        },
        {
          name: 'Multivariable Chain Rule (Tree Form)',
          latex: '\\frac{\\partial z}{\\partial t} = \\sum_{i=1}^{k} \\frac{\\partial z}{\\partial x_i} \\frac{\\partial x_i}{\\partial t}',
          explanation: 'Sums sensitivity across all parallel computational paths from input t to output z.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Derivative of Squared Error Loss',
      objective: 'Differentiate L(w) = (y - w*x)^2 with respect to parameter w using the chain rule.',
      steps: [
        {
          step: 1,
          label: 'Decompose into Intermediate Variables',
          latex: 'e = y - \\hat{y}, \\quad \\hat{y} = w \\cdot x, \\quad L = e^2',
          explanation: 'Express loss L as a composition of residual error e and prediction y_hat.',
        },
        {
          step: 2,
          label: 'Compute Local Partial Derivatives',
          latex: '\\frac{\\partial L}{\\partial e} = 2e, \\quad \\frac{\\partial e}{\\partial \\hat{y}} = -1, \\quad \\frac{\\partial \\hat{y}}{\\partial w} = x',
          explanation: 'Differentiate each intermediate stage with respect to its immediate input.',
        },
        {
          step: 3,
          label: 'Chain the Derivatives Together',
          latex: '\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial e} \\cdot \\frac{\\partial e}{\\partial \\hat{y}} \\cdot \\frac{\\partial \\hat{y}}{\\partial w} = (2e)(-1)(x) = -2(y - wx)x',
          explanation: 'Multiplying the local terms yields the exact regression gradient.',
        },
      ],
    },
    variables: [
      { symbol: 'h', name: 'Perturbation Step Size', description: 'Infinitesimal step approaching 0 in difference quotient.', dimensions: 'Scalar -> 0' },
      { symbol: '\\frac{df}{dx}', name: 'First Derivative', description: 'Rate of change of f with respect to x.', dimensions: 'Scalar' },
      { symbol: 'e', name: 'Residual Error', description: 'Difference between true label y and predicted value y_hat.', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Given y = 10.0, x = 3.0, and w = 2.0. Compute prediction y_hat, loss L = (y - w*x)^2, and parameter gradient dL/dw using the chain rule.',
      dataset: [{ sample: 1, y: 10.0, x: 3.0, w: 2.0 }],
      calculations: [
        { step: 'Prediction y_hat', math: '\\hat{y} = w \\cdot x = (2.0)(3.0)', result: '6.00' },
        { step: 'Residual e', math: 'e = y - \\hat{y} = 10.0 - 6.0', result: '4.00' },
        { step: 'Squared Loss L', math: 'L = e^2 = 4.0^2', result: '16.00' },
        { step: 'Local Gradient dL/de', math: '2e = 2(4.0)', result: '8.00' },
        { step: 'Local Gradient de/dw', math: '-x = -3.0', result: '-3.00' },
        { step: 'Total Gradient dL/dw', math: '(dL/de) * (de/dw) = (8.00)(-3.00)', result: '-24.00' },
      ],
      finalConclusion: 'Since dL/dw = -24.0 < 0, increasing w will decrease the error. Moving w upward moves y_hat closer to 10.0.',
    },
    visualExplanation: {
      title: 'Computational Graph and Backpropagation',
      description: 'Nodes represent mathematical operations (+, *, ^2); edges carry numerical values. During forward pass, values flow left to right. During backward pass, gradients flow right to left, multiplying local derivative values at each node.',
      features: ['Forward pass computes loss', 'Backward pass multiplies local Jacobians', 'Linear computational complexity'],
    },
    scratchCode: {
      title: 'Finite Difference Numerical Gradient Checker',
      explanation: 'Verify analytical derivatives against first principles numerical approximations.',
      code: `def loss_fn(w, x=3.0, y=10.0):
    return (y - w * x) ** 2

def analytical_gradient(w, x=3.0, y=10.0):
    return -2.0 * (y - w * x) * x

def numerical_gradient(w, eps=1e-5):
    # Central difference formula: [f(w+eps) - f(w-eps)] / (2*eps)
    return (loss_fn(w + eps) - loss_fn(w - eps)) / (2.0 * eps)

w_val = 2.0
grad_analytical = analytical_gradient(w_val)
grad_numerical = numerical_gradient(w_val)

print(f"Analytical gradient: {grad_analytical:.4f}")
print(f"Numerical gradient:  {grad_numerical:.4f}")
print(f"Difference: {abs(grad_analytical - grad_numerical):.8e}")
`,
    },
    sklearnCode: {
      title: 'Automatic Differentiation with Micrograd-style Python',
      explanation: 'Building a minimal scalar autograd engine supporting addition, multiplication, and backpropagation.',
      code: `class Value:
    def __init__(self, data, _children=()):
        self.data = float(data)
        self.grad = 0.0
        self._prev = set(_children)
        self._backward = lambda: None

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other))
        def _backward():
            self.grad += out.grad
            other.grad += out.grad
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other))
        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out

w = Value(2.0)
x = Value(3.0)
y_pred = w * x
print(f"Forward output: {y_pred.data}")
`,
    },
    runnableCode: {
      code: `def compute_derivatives(x, w, y):
    # Forward
    y_hat = w * x
    loss = (y - y_hat) ** 2
    
    # Backward (Chain Rule)
    dL_dyhat = -2.0 * (y - y_hat)
    dyhat_dw = x
    dL_dw = dL_dyhat * dyhat_dw
    
    return y_hat, loss, dL_dw

y_hat, loss, grad = compute_derivatives(x=3.0, w=2.0, y=10.0)
print(f"Prediction: {y_hat:.2f}")
print(f"Loss: {loss:.2f}")
print(f"Gradient dL/dw: {grad:.2f}")
`,
      expectedOutput: `Prediction: 6.00\nLoss: 16.00\nGradient dL/dw: -24.00`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 3-4', codeSnippet: 'y_hat = w * x; loss = (y - y_hat) ** 2', explanation: 'Forward evaluation calculating model prediction and squared loss.' },
      { lines: 'Line 7', codeSnippet: 'dL_dyhat = -2.0 * (y - y_hat)', explanation: 'Local derivative of outer squared loss with respect to prediction.' },
      { lines: 'Line 8', codeSnippet: 'dyhat_dw = x', explanation: 'Local derivative of linear prediction with respect to weight parameter.' },
      { lines: 'Line 9', codeSnippet: 'dL_dw = dL_dyhat * dyhat_dw', explanation: 'Chains the two local derivatives via the chain rule multiplication.' },
    ],
    hyperparameters: [
      { name: 'finite_diff_eps', defaultVal: '1e-5', range: '[1e-8, 1e-4]', effect: 'Step size for numerical gradient checking.', recommendation: 'Use 1e-5 or 1e-6 with central differences to balance truncation and rounding errors.' },
    ],
    assumptions: [
      { assumption: 'Differentiability (Smoothness)', whyItMatters: 'Classical derivatives require smooth continuous functions without kinks or jumps.', howToVerify: 'Verify that loss functions are continuous and piecewise differentiable.' },
    ],
    commonMistakes: [
      { mistake: 'Adding gradients instead of multiplying them along a serial chain', solution: 'Derivatives MULTIPLY along serial chains (dz/dx = dz/dy * dy/dx); they ADD across parallel merging branches.' },
    ],
    realWorldUseCases: [
      { industry: 'Deep Learning Frameworks', application: 'PyTorch Autograd Engine', benefit: 'The multivariable chain rule allows PyTorch to automatically differentiate multi-billion parameter neural networks in a single backward() call.' },
    ],
    practiceQuestions: [
      { id: 'pq-6', question: 'If f(u) = u^3 and u(x) = 2x + 1, what is df/dx evaluated at x = 1?', hint: 'Apply chain rule: df/dx = (df/du) * (du/dx).', answer: 'At x = 1, u = 2(1) + 1 = 3. df/du = 3u^2 = 3(3^2) = 27. du/dx = 2. By chain rule, df/dx = (27)(2) = 54.' },
    ],
    quiz: [
      {
        id: 'quiz-math-6',
        question: 'Given z = sin(y) and y = x^2, what is the derivative dz/dx according to the chain rule?',
        options: ['cos(x^2)', '2x * cos(x^2)', '2x * sin(x^2)', 'cos(2x)'],
        correctIndex: 1,
        explanation: 'dz/dy = cos(y) = cos(x^2), and dy/dx = 2x. By the chain rule, dz/dx = (dz/dy)(dy/dx) = 2x * cos(x^2).',
      },
    ],
    independentExercise: {
      title: 'Derive Gradient for Sigmoid Activation Function',
      problem: 'The sigmoid function is sigma(z) = 1 / (1 + exp(-z)). Prove computationally that its derivative can be expressed entirely in terms of its output: d sigma / dz = sigma(z) * (1 - sigma(z)).',
      hints: ['Write sigma(z) as (1 + exp(-z))^(-1)', 'Differentiate using the power rule and chain rule'],
      starterCode: `import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

def sigmoid_derivative_formula(z):
    s = sigmoid(z)
    # TODO: return derivative formula
    return 0.0

z_test = 0.5
print("Derivative:", sigmoid_derivative_formula(z_test))
`,
      solution: `import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

def sigmoid_derivative_formula(z):
    s = sigmoid(z)
    return s * (1.0 - s)

z_test = 0.5
print("Derivative at z=0.5:", round(sigmoid_derivative_formula(z_test), 4))
`,
    },
    summary: {
      keyTakeaways: [
        'The derivative measures instantaneous rate of change and sensitivity.',
        'The chain rule multiplies local derivatives along a sequence of dependent operations.',
        'Backpropagation in neural networks is simply the systematic application of the multivariable chain rule on computational graphs.',
      ],
      nextLessonId: 'gradients-jacobian-hessian',
      nextLessonTitle: 'Gradients, Jacobians, and Hessian Matrices',
      nextLessonModuleId: 'module-1',
    },
  },

  'gradients-jacobian-hessian': {
    id: 'gradients-jacobian-hessian',
    moduleId: 'module-1',
    title: 'Gradients, Jacobians, and Hessian Matrices',
    subtitle: 'Steepest Ascent Directions, First-Order Jacobians & Second-Order Curvature',
    order: 7,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Compute the gradient vector nabla f of a multivariable scalar function.',
      'Construct the Jacobian matrix J for vector-valued functions.',
      'Evaluate the Hessian matrix H to analyze loss surface curvature, saddle points, and condition numbers.',
    ],
    prerequisites: ['derivatives-chain-rule', 'matrix-inverse-rank-determinants'],
    analogy: {
      title: 'Walking in the Foggy Mountains',
      text: 'Imagine standing blindfolded on a foggy mountain ridge. If you feel around your feet with a walking stick: the direction pointing steepest uphill is the gradient vector. If you look at how your velocity changes as you walk along two paths simultaneously, that matrix of rates is the Jacobian. The curvature under your boots—whether you are at the bottom of an egg bowl (local minimum), on top of a peak (maximum), or in a horse saddle curving up in front but down at the sides (saddle point)—is measured by the Hessian matrix.',
      metaphor: 'Gradient = slope direction. Jacobian = vector mapping rate. Hessian = surface curvature.',
    },
    problemSolved: {
      title: 'Navigating High-Dimensional Non-Convex Loss Landscapes',
      description: 'Machine learning models optimize loss functions over millions of parameters. We need first-order gradients to find which way to step, and second-order Hessians to determine if we are trapped at a saddle point or a true minimum.',
      keyPoints: [
        'The gradient points in the exact direction of steepest rate of increase.',
        'The Hessian reveals loss landscape curvature (convex vs concave vs saddle point).',
        'Newton-Raphson optimization uses H^(-1) nabla f to take optimal quadratic steps directly to the optimum.',
      ],
    },
    intuition: {
      overview: 'First derivatives tell us which way is downhill; second derivatives tell us how fast the slope itself is changing (the curvature).',
      steps: [
        { step: 1, title: 'Gradient Vector nabla f', description: 'Column vector collecting all partial derivatives [df/dx1, df/dx2, ..., df/dxd]^T.' },
        { step: 2, title: 'Jacobian Matrix J', description: 'm x d matrix of all first-order partial derivatives of a vector-valued function f: R^d -> R^m.' },
        { step: 3, title: 'Hessian Matrix H', description: 'd x d symmetric matrix of second-order partial derivatives H_ij = d^2 f / (dx_i dx_j).' },
      ],
    },
    mathematics: {
      overview: 'Calculus generalizes to multivariable vectors through gradient vectors, Jacobian linear maps, and symmetric Hessian tensors.',
      foundations: [
        {
          name: 'Gradient Vector',
          latex: '\\nabla f(\\mathbf{x}) = \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1} \\\\ \\frac{\\partial f}{\\partial x_2} \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_d} \\end{bmatrix}',
          explanation: 'Points in direction of maximum rate of increase; magnitude ||nabla f|| is the slope.',
        },
        {
          name: 'Jacobian Matrix',
          latex: 'J_{ij} = \\frac{\\partial f_i}{\\partial x_j} \\quad \\implies \\quad J \\in \\mathbb{R}^{m \\times d}',
          explanation: 'Linearizes any vector-valued function f(x) locally around point x_0.',
        },
        {
          name: 'Hessian Matrix',
          latex: 'H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j} \\quad \\implies \\quad H \\in \\mathbb{R}^{d \\times d}',
          explanation: 'Symmetric by Schwarz theorem. Positive definite Hessian (all eigenvalues > 0) guarantees a strict local minimum.',
        },
      ],
    },
    derivation: {
      title: 'Second-Order Multivariable Taylor Series Expansion',
      objective: 'Approximate any smooth loss function f(theta) around point theta_0 using gradient and Hessian.',
      steps: [
        {
          step: 1,
          label: 'Quadratic Taylor Series Formulation',
          latex: 'f(\\theta_0 + \\Delta \\theta) \\approx f(\\theta_0) + \\nabla f(\\theta_0)^T \\Delta \\theta + \\frac{1}{2} \\Delta \\theta^T H(\\theta_0) \\Delta \\theta',
          explanation: 'Decomposes local change into scalar offset + linear slope + quadratic curvature.',
        },
        {
          step: 2,
          label: 'Differentiate with respect to Step Delta theta',
          latex: '\\nabla_{\\Delta \\theta} [f(\\theta_0 + \\Delta \\theta)] = \\nabla f(\\theta_0) + H(\\theta_0) \\Delta \\theta = \\mathbf{0}',
          explanation: 'Set the derivative of the quadratic surrogate to zero to find the stationary point.',
        },
        {
          step: 3,
          label: 'Solve for Newton-Raphson Step',
          latex: '\\Delta \\theta^* = - H(\\theta_0)^{-1} \\nabla f(\\theta_0)',
          explanation: 'The optimal step scales the negative gradient by the inverse curvature tensor.',
        },
      ],
    },
    variables: [
      { symbol: '\\nabla f', name: 'Gradient Vector', description: 'Vector of first partial derivatives.', dimensions: 'd × 1' },
      { symbol: 'J', name: 'Jacobian Matrix', description: 'Matrix of first derivatives for vector outputs.', dimensions: 'm × d' },
      { symbol: 'H', name: 'Hessian Matrix', description: 'Matrix of second partial derivatives measuring curvature.', dimensions: 'd × d' },
    ],
    numericalExample: {
      scenario: 'Given multivariable function f(x, y) = x^2 + 3xy + 4y^2. Compute gradient nabla f and Hessian H at point (x=1, y=2).',
      dataset: [{ sample: 1, x: 1.0, y: 2.0 }],
      calculations: [
        { step: 'Partial df/dx', math: '\\frac{\\partial f}{\\partial x} = 2x + 3y = 2(1) + 3(2) = 2 + 6', result: '8.00' },
        { step: 'Partial df/dy', math: '\\frac{\\partial f}{\\partial y} = 3x + 8y = 3(1) + 8(2) = 3 + 16', result: '19.00' },
        { step: 'Gradient Vector nabla f', math: '[8.00, 19.00]^T', result: '[8.0, 19.0]' },
        { step: 'Second Partial d^2f/dx^2', math: '\\frac{\\partial}{\\partial x}(2x + 3y) = 2.0', result: '2.00' },
        { step: 'Mixed Partial d^2f/dxdy', math: '\\frac{\\partial}{\\partial y}(2x + 3y) = 3.0', result: '3.00' },
        { step: 'Second Partial d^2f/dy^2', math: '\\frac{\\partial}{\\partial y}(3x + 8y) = 8.0', result: '8.00' },
        { step: 'Hessian Determinant Check', math: '\\det(H) = (2)(8) - (3)^2 = 16 - 9 = 7.0 > 0', result: '7.00 (Positive Definite)' },
      ],
      finalConclusion: 'Since H_11 = 2 > 0 and det(H) = 7 > 0, the Hessian is strictly positive definite everywhere, proving f(x, y) is strictly convex.',
    },
    visualExplanation: {
      title: 'Curvature Geometries and Eigenvalues of the Hessian',
      description: 'The eigenvalues of the Hessian determine local surface topology: all positive eigenvalues indicate a bowl (local minimum); all negative indicate a dome (local maximum); mixed positive and negative indicate a saddle point.',
      features: ['Positive Definite (lambda_i > 0): Local Minimum', 'Negative Definite (lambda_i < 0): Local Maximum', 'Indefinite (mixed signs): Saddle Point'],
    },
    scratchCode: {
      title: 'Exact Numerical Hessian and Gradient in Python',
      explanation: 'Calculate gradient vector and Hessian matrix via finite difference approximations.',
      code: `import numpy as np

def f(w):
    x, y = w[0], w[1]
    return x**2 + 3*x*y + 4*y**2

def compute_gradient_hessian(w, eps=1e-5):
    d = len(w)
    grad = np.zeros(d)
    hessian = np.zeros((d, d))
    
    # Gradient central difference
    for i in range(d):
        w_plus = w.copy()
        w_minus = w.copy()
        w_plus[i] += eps
        w_minus[i] -= eps
        grad[i] = (f(w_plus) - f(w_minus)) / (2 * eps)
        
    # Hessian second-order finite difference
    for i in range(d):
        for j in range(d):
            w_pp = w.copy(); w_pp[i] += eps; w_pp[j] += eps
            w_pm = w.copy(); w_pm[i] += eps; w_pm[j] -= eps
            w_mp = w.copy(); w_mp[i] -= eps; w_mp[j] += eps
            w_mm = w.copy(); w_mm[i] -= eps; w_mm[j] -= eps
            hessian[i, j] = (f(w_pp) - f(w_pm) - f(w_mp) + f(w_mm)) / (4 * eps**2)
            
    return np.round(grad, 2), np.round(hessian, 2)

w_point = np.array([1.0, 2.0])
g, H = compute_gradient_hessian(w_point)
print("Gradient at (1, 2):", g)
print("Hessian at (1, 2):\n", H)
`,
    },
    sklearnCode: {
      title: 'Newton-Conjugate-Gradient via SciPy Optimize',
      explanation: 'SciPy uses explicit Hessian or Hessian-vector products for rapid convergence.',
      code: `import numpy as np
from scipy.optimize import minimize

def objective(w):
    return (w[0] - 3)**2 + (w[1] - 4)**2

def jacobian(w):
    return np.array([2*(w[0] - 3), 2*(w[1] - 4)])

def hessian(w):
    return np.array([[2.0, 0.0], [0.0, 2.0]])

res = minimize(objective, x0=[0.0, 0.0], jac=jacobian, hess=hessian, method='Newton-CG')
print("Optimal parameters:", res.x)
print("Iterations needed:", res.nit)
`,
    },
    runnableCode: {
      code: `import numpy as np

# f(x, y) = x^2 + 3xy + 4y^2 at (1, 2)
x, y = 1.0, 2.0

# Analytical Gradient
grad = np.array([2*x + 3*y, 3*x + 8*y])
# Analytical Hessian
H = np.array([[2.0, 3.0], [3.0, 8.0]])

eigenvalues = np.linalg.eigvalsh(H)

print(f"Point: ({x}, {y})")
print(f"Gradient: {grad}")
print("Hessian Matrix:")
print(H)
print(f"Hessian Eigenvalues: {np.round(eigenvalues, 4)}")
print(f"Is Strictly Convex? {bool(np.all(eigenvalues > 0))}")
`,
      expectedOutput: `Point: (1.0, 2.0)\nGradient: [ 8. 19.]\nHessian Matrix:\n[[2. 3.]\n [3. 8.]]\nHessian Eigenvalues: [1.1492 8.8508]\nIs Strictly Convex? True`,
    },
    lineByLineExplanation: [
      { lines: 'Line 7', codeSnippet: 'grad = np.array([2*x + 3*y, 3*x + 8*y])', explanation: 'Evaluates first-order partial derivatives at point (1, 2).' },
      { lines: 'Line 9', codeSnippet: 'H = np.array([[2.0, 3.0], [3.0, 8.0]])', explanation: 'Constructs symmetric 2x2 second derivative matrix.' },
      { lines: 'Line 11', codeSnippet: 'eigenvalues = np.linalg.eigvalsh(H)', explanation: 'Computes real eigenvalues of symmetric matrix to verify positive definiteness.' },
    ],
    hyperparameters: [
      { name: 'optimization_order', defaultVal: '1st order (SGD/Adam)', range: '["1st order", "2nd order (Newton/L-BFGS)"]', effect: '1st order uses only gradients (O(d) memory); 2nd order uses curvature (O(d^2) memory).', recommendation: 'Use 1st order for deep learning with millions of parameters; use 2nd order (L-BFGS) for small tabular GLMs.' },
    ],
    assumptions: [
      { assumption: 'Twice Continuously Differentiable (C^2)', whyItMatters: 'Schwarz theorem requires second derivatives to be continuous so mixed partials commute: d^2f/dxdy = d^2f/dydx.', howToVerify: 'Verify that loss function has smooth second derivatives.' },
    ],
    commonMistakes: [
      { mistake: 'Assuming zero gradient (nabla f = 0) always means a minimum', solution: 'A zero gradient can be a local minimum, local maximum, or saddle point. You must check the Hessian eigenvalues to be certain.' },
    ],
    realWorldUseCases: [
      { industry: 'Machine Learning Boosting', application: 'XGBoost 2nd-Order Optimization', benefit: 'XGBoost uses the 1st-order gradient (g_i) and 2nd-order Hessian (h_i) of each sample to compute optimal leaf weights in closed form.' },
    ],
    practiceQuestions: [
      { id: 'pq-7', question: 'What does an indefinite Hessian matrix (some positive eigenvalues, some negative eigenvalues) signify at a critical point where nabla f = 0?', hint: 'Think about a horse saddle.', answer: 'It signifies a saddle point: the surface curves upward along the positive eigenvector directions (like a minimum), but curves downward along the negative eigenvector directions (like a maximum).' },
    ],
    quiz: [
      {
        id: 'quiz-math-7',
        question: 'If a critical point has nabla f = 0 and Hessian matrix H with eigenvalues [4.5, -2.1], what type of stationary point is it?',
        options: ['Strict Local Minimum', 'Strict Local Maximum', 'Saddle Point', 'Global Minimum'],
        correctIndex: 2,
        explanation: 'Because the eigenvalues have mixed signs (one positive 4.5, one negative -2.1), the Hessian is indefinite, indicating a saddle point.',
      },
    ],
    independentExercise: {
      title: 'Implement Newton-Raphson 2D Step',
      problem: 'Write a function newton_step(w, grad, H) that computes the updated parameter vector w_new = w - H^(-1) * grad.',
      hints: ['Solve linear system H * step = grad using np.linalg.solve(H, grad)', 'w_new = w - step'],
      starterCode: `import numpy as np

def newton_step(w: np.ndarray, grad: np.ndarray, H: np.ndarray) -> np.ndarray:
    # TODO: w_new = w - H^(-1) @ grad
    return w

w = np.array([5.0, 5.0])
grad = np.array([10.0, 10.0])
H = np.array([[2.0, 0.0], [0.0, 2.0]])
print("Updated parameters:", newton_step(w, grad, H))
`,
      solution: `import numpy as np

def newton_step(w: np.ndarray, grad: np.ndarray, H: np.ndarray) -> np.ndarray:
    step = np.linalg.solve(H, grad)
    return w - step

w = np.array([5.0, 5.0])
grad = np.array([10.0, 10.0])
H = np.array([[2.0, 0.0], [0.0, 2.0]])
print("Updated parameters:", newton_step(w, grad, H))
`,
    },
    summary: {
      keyTakeaways: [
        'The gradient vector points in the steepest uphill direction; negative gradient points downhill.',
        'The Jacobian matrix organizes first derivatives of multi-output vector functions.',
        'The Hessian matrix measures second-order curvature, distinguishing minima from saddle points.',
      ],
      nextLessonId: 'gradient-descent-optimization',
      nextLessonTitle: 'Gradient Descent & First-Order Optimization',
      nextLessonModuleId: 'module-1',
    },
  },

  'gradient-descent-optimization': {
    id: 'gradient-descent-optimization',
    moduleId: 'module-1',
    title: 'Gradient Descent & First-Order Optimization',
    subtitle: 'Iterative Minimization, Learning Rate Bounds, Lipschitz Smoothness & Oscillations',
    order: 8,
    readTimeMinutes: 24,
    difficulty: 'Beginner',
    visualizerType: 'gradient-descent',
    objectives: [
      'Implement the canonical first-order update rule: theta_{t+1} = theta_t - alpha * nabla L(theta_t).',
      'Explain the effect of learning rate alpha: under-stepping, optimal convergence, oscillation, and divergence.',
      'Understand the Lipschitz constant L and the theoretical upper bound alpha < 2 / L.',
    ],
    prerequisites: ['gradients-jacobian-hessian', 'scalars-vectors-matrices-tensors'],
    analogy: {
      title: 'Skiing Down a Dark Mountain at Night',
      text: 'You are on a mountain at night in total darkness, equipped with only a walking stick. To reach the warm village in the valley below, you feel the slope beneath your feet. Whichever way slopes downward, you take a step in that direction. If your steps are microscopic (tiny learning rate), you will freeze before you reach the bottom. If you take giant leaping strides of 100 meters (excessive learning rate), you will overshoot the valley entirely and crash into the opposite mountain wall!',
      metaphor: 'Gradient descent is walking downhill in small calibrated steps proportional to slope steepness.',
    },
    problemSolved: {
      title: 'Optimizing Non-Analytical Machine Learning Models',
      description: 'While simple linear regression has a closed-form Normal Equation, most modern algorithms (logistic regression, neural nets, support vector machines) have no analytical solution. Gradient descent provides a universal numerical optimizer.',
      keyPoints: [
        'Works for any differentiable loss function without requiring matrix inversion.',
        'Scales to millions of features where closed-form (X^T X)^(-1) is computationally impossible (O(d^3)).',
        'Forms the universal engine driving all modern deep learning models.',
      ],
    },
    intuition: {
      overview: 'By moving parameters in the negative gradient direction, we guarantee a decrease in loss for sufficiently small step sizes.',
      steps: [
        { step: 1, title: 'Evaluate Gradient', description: 'Compute nabla L(theta_t) at current parameter location.' },
        { step: 2, title: 'Scale by Learning Rate', description: 'Multiply the gradient vector by scalar alpha > 0.' },
        { step: 3, title: 'Update Parameters', description: 'Subtract step: theta_{t+1} = theta_t - alpha * nabla L(theta_t).' },
        { step: 4, title: 'Check Convergence', description: 'Repeat until ||nabla L|| < epsilon or max iterations reached.' },
      ],
    },
    mathematics: {
      overview: 'First-order optimization relies on gradient updates bounded by the Lipschitz smoothness constant of the gradient.',
      foundations: [
        {
          name: 'Gradient Descent Update Rule',
          latex: '\\theta^{(t+1)} = \\theta^{(t)} - \\alpha \\nabla L(\\theta^{(t)})',
          explanation: 'Iterative update where alpha is the learning rate step size.',
        },
        {
          name: 'Lipschitz Smoothness Condition',
          latex: '\\|\\nabla L(\\mathbf{u}) - \\nabla L(\\mathbf{v})\\| \\le L_L \\|\\mathbf{u} - \\mathbf{v}\\|',
          explanation: 'Upper bounds the maximum curvature (rate at which the gradient can change).',
        },
        {
          name: 'Convergence Step-Size Bound',
          latex: '0 < \\alpha < \\frac{2}{L_L}',
          explanation: 'Guarantees monotonic convergence for L-smooth convex functions; alpha = 1 / L_L gives optimal convergence rate.',
        },
      ],
    },
    derivation: {
      title: 'Proof of Monotonic Loss Decrease via Descent Lemma',
      objective: 'Show that setting alpha <= 1 / L guarantees L(theta_{t+1}) <= L(theta_t).',
      steps: [
        {
          step: 1,
          label: 'Quadratic Upper Bound (Descent Lemma)',
          latex: 'L(\\theta^{(t+1)}) \\le L(\\theta^{(t)}) + \\nabla L(\\theta^{(t)})^T (\\theta^{(t+1)} - \\theta^{(t)}) + \\frac{L_L}{2} \\|\\theta^{(t+1)} - \\theta^{(t)}\\|^2',
          explanation: 'For any L-smooth function, the function is bounded by a quadratic surrogate.',
        },
        {
          step: 2,
          label: 'Substitute the Gradient Step',
          latex: '\\theta^{(t+1)} - \\theta^{(t)} = -\\alpha \\nabla L(\\theta^{(t)})',
          explanation: 'Plug the update rule into the quadratic bound.',
        },
        {
          step: 3,
          label: 'Factorize the Bound',
          latex: 'L(\\theta^{(t+1)}) \\le L(\\theta^{(t)}) - \\alpha \\|\\nabla L\\|^2 + \\frac{L_L \\alpha^2}{2} \\|\\nabla L\\|^2 = L(\\theta^{(t)}) - \\alpha \\left( 1 - \\frac{L_L \\alpha}{2} \\right) \\|\\nabla L\\|^2',
          explanation: 'If alpha <= 1 / L_L, then (1 - L_L * alpha / 2) >= 1/2 > 0, ensuring strictly decreasing loss.',
        },
      ],
    },
    variables: [
      { symbol: '\\theta^{(t)}', name: 'Parameter State', description: 'Value of model weights at iteration t.', dimensions: 'd × 1' },
      { symbol: '\\alpha', name: 'Learning Rate', description: 'Step size governing update magnitude.', dimensions: 'Scalar > 0' },
      { symbol: 'L_L', name: 'Lipschitz Constant', description: 'Maximum eigenvalue of the loss Hessian, bounding curvature.', dimensions: 'Scalar > 0' },
    ],
    numericalExample: {
      scenario: 'Minimize 1D quadratic function L(w) = 3 w^2 starting from initial guess w_0 = 4.0 with learning rate alpha = 0.1 for 3 steps.',
      dataset: [{ iteration: 0, w: 4.0, loss: 48.0 }],
      calculations: [
        { step: 'Iteration 1: Gradient', math: '\\nabla L = 6 w = 6(4.0) = 24.0', result: 'grad = 24.0' },
        { step: 'Iteration 1: Update', math: 'w_1 = 4.0 - (0.1)(24.0) = 4.0 - 2.4', result: 'w_1 = 1.60, L = 7.68' },
        { step: 'Iteration 2: Gradient', math: '\\nabla L = 6(1.60) = 9.6', result: 'grad = 9.6' },
        { step: 'Iteration 2: Update', math: 'w_2 = 1.60 - (0.1)(9.6) = 1.60 - 0.96', result: 'w_2 = 0.64, L = 1.2288' },
        { step: 'Iteration 3: Update', math: 'w_3 = 0.64 - (0.1)(6 * 0.64) = 0.64 - 0.384', result: 'w_3 = 0.256, L = 0.1966' },
      ],
      finalConclusion: 'The parameter w steadily converges from 4.0 -> 1.60 -> 0.64 -> 0.256 toward the true minimum w* = 0.0.',
    },
    visualExplanation: {
      title: 'Interactive Visualizer: Observe Gradient Descent Paths',
      description: 'Use the interactive visualizer below to adjust the learning rate slider. Observe how small learning rates creep slowly, optimal learning rates converge smoothly, and excessive learning rates oscillate wildly and explode.',
      features: ['Adjust alpha slider to watch step trajectory', 'Inspect loss curve versus iteration number', 'Visualize 2D contour descent paths'],
    },
    scratchCode: {
      title: 'Complete Gradient Descent Loop in NumPy',
      explanation: 'From-scratch iterative optimization loop with convergence tolerance checking.',
      code: `import numpy as np

def gradient_descent(w_init: float, lr: float, max_iters: int = 50, tol: float = 1e-6):
    w = w_init
    history = []
    
    for i in range(max_iters):
        loss = 3.0 * (w ** 2)
        grad = 6.0 * w
        history.append((i, round(w, 4), round(loss, 4)))
        
        if abs(grad) < tol:
            print(f"Converged at step {i}!")
            break
            
        w -= lr * grad
        
    return w, history

w_opt, history = gradient_descent(w_init=4.0, lr=0.1, max_iters=15)
for step in history[:5]:
    print(f"Step {step[0]}: w = {step[1]}, Loss = {step[2]}")
print(f"Final optimized w: {w_opt:.6f}")
`,
    },
    sklearnCode: {
      title: 'SGDRegressor in Scikit-Learn',
      explanation: 'Scikit-learn implementation of stochastic gradient descent with adaptive learning rates.',
      code: `import numpy as np
from sklearn.linear_model import SGDRegressor

# Synthetic dataset
X = np.array([[1.0], [2.0], [3.0], [4.0]])
y = np.array([3.0, 5.0, 7.0, 9.0])

# SGD with inverse scaling learning rate schedule
sgd = SGDRegressor(loss='squared_error', max_iter=1000, tol=1e-4, learning_rate='invscaling', eta0=0.05, random_state=42)
sgd.fit(X, y)

print(f"Learned slope: {sgd.coef_[0]:.4f}")
print(f"Learned intercept: {sgd.intercept_[0]:.4f}")
`,
    },
    runnableCode: {
      code: `import numpy as np

w = 4.0
lr = 0.1
print("Running 4 iterations of Gradient Descent on L(w) = 3*w^2:")
for t in range(1, 5):
    grad = 6.0 * w
    w_new = w - lr * grad
    print(f"Step {t}: w = {w:.4f}, grad = {grad:.4f}, w_next = {w_new:.4f}")
    w = w_new
`,
      expectedOutput: `Running 4 iterations of Gradient Descent on L(w) = 3*w^2:\nStep 1: w = 4.0000, grad = 24.0000, w_next = 1.6000\nStep 2: w = 1.6000, grad = 9.6000, w_next = 0.6400\nStep 3: w = 0.6400, grad = 3.8400, w_next = 0.2560\nStep 4: w = 0.2560, grad = 1.5360, w_next = 0.1024`,
    },
    lineByLineExplanation: [
      { lines: 'Line 3', codeSnippet: 'w = 4.0; lr = 0.1', explanation: 'Initializes parameter at 4.0 with learning rate 0.1.' },
      { lines: 'Line 6', codeSnippet: 'grad = 6.0 * w', explanation: 'Computes analytical gradient of 3*w^2.' },
      { lines: 'Line 7', codeSnippet: 'w_new = w - lr * grad', explanation: 'Applies steepest descent step.' },
    ],
    hyperparameters: [
      { name: 'learning_rate (eta)', defaultVal: '0.01', range: '(1e-5, 1.0)', effect: 'Governs convergence speed and stability.', recommendation: 'Use learning rate schedules (cosine decay or warm restarts) or adaptive optimizers (Adam).' },
      { name: 'max_iter', defaultVal: '1000', range: '[100, 100000]', effect: 'Upper bound on optimization steps.', recommendation: 'Combine with early stopping tolerance to avoid unnecessary computations.' },
    ],
    assumptions: [
      { assumption: 'Differentiable Loss Surface', whyItMatters: 'Gradient descent requires gradient vectors to exist at every visited point.', howToVerify: 'Verify that loss functions avoid non-differentiable step discontinuities.' },
    ],
    commonMistakes: [
      { mistake: 'Forgetting to normalize features before running gradient descent', solution: 'Unnormalized features create elongated elliptical loss contours that cause severe zig-zag oscillations. Standardize features first!' },
    ],
    realWorldUseCases: [
      { industry: 'Ad Tech & Search', application: 'Logistic Click-Through-Rate (CTR) Prediction', benefit: 'Online stochastic gradient descent (FTRL-Proximal) continuously updates ad CTR models on billions of live clicks in real time.' },
    ],
    practiceQuestions: [
      { id: 'pq-8', question: 'For loss function L(w) = 0.5 * L_L * w^2, what happens if we set learning rate alpha = 2 / L_L?', hint: 'Evaluate w_{t+1} = w_t - (2 / L_L) * (L_L * w_t).', answer: 'w_{t+1} = w_t - 2 w_t = -w_t. The parameter oscillates endlessly between +w_0 and -w_0 without ever converging or exploding. Any alpha > 2/L_L causes explosive divergence.' },
    ],
    quiz: [
      {
        id: 'quiz-math-8',
        question: 'What happens during gradient descent if the learning rate is chosen to be significantly too large?',
        options: [
          'The model converges to the global minimum in a single step.',
          'The algorithm oscillates across the valley with increasing amplitude and diverges to infinity (NaN).',
          'The gradients become exactly zero immediately.',
          'The parameters stop updating completely.',
        ],
        correctIndex: 1,
        explanation: 'When alpha > 2 / L, each step overshoots the minimum by more than the previous distance, leading to unstable oscillations that diverge to infinity.',
      },
    ],
    independentExercise: {
      title: 'Implement Gradient Descent with Momentum',
      problem: 'Implement momentum-accelerated gradient descent: v_{t+1} = beta * v_t + alpha * grad; w_{t+1} = w_t - v_{t+1}. Show that it reaches the optimum faster on ill-conditioned functions.',
      hints: ['Initialize velocity v = 0', 'Update v using momentum factor beta=0.9'],
      starterCode: `import numpy as np

def momentum_descent(w_init=4.0, lr=0.05, beta=0.9, steps=10):
    w = w_init
    v = 0.0
    history = []
    # TODO: Implement momentum updates
    return w, history

w_final, _ = momentum_descent()
print("Final w:", w_final)
`,
      solution: `import numpy as np

def momentum_descent(w_init=4.0, lr=0.05, beta=0.9, steps=10):
    w = w_init
    v = 0.0
    history = []
    for _ in range(steps):
        grad = 6.0 * w
        v = beta * v + lr * grad
        w -= v
        history.append(w)
    return w, history

w_final, _ = momentum_descent()
print("Final w with momentum:", round(w_final, 4))
`,
    },
    summary: {
      keyTakeaways: [
        'Gradient descent updates parameters iteratively along the negative gradient: theta - alpha * nabla L.',
        'Learning rate selection is critical: too small stalls training; too large diverges.',
        'Feature scaling is mandatory for gradient descent to prevent eccentric contour oscillation.',
      ],
      nextLessonId: 'convexity-optimization',
      nextLessonTitle: 'Convexity and Optimization Theory',
      nextLessonModuleId: 'module-1',
    },
  },

  'convexity-optimization': {
    id: 'convexity-optimization',
    moduleId: 'module-1',
    title: 'Convexity and Optimization Theory',
    subtitle: 'Convex Sets, Jensen\'s Inequality, Stationary Points & Global Optimality Guarantees',
    order: 9,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Define convex sets and convex functions rigorously.',
      'Apply first-order and second-order convexity conditions (nabla^2 f >= 0).',
      'Explain why every local minimum of a convex function is guaranteed to be a global minimum.',
    ],
    prerequisites: ['gradients-jacobian-hessian', 'gradient-descent-optimization'],
    analogy: {
      title: 'The Ceramic Salad Bowl vs The Egg Carton',
      text: 'A convex function is like a smooth ceramic salad bowl: if you roll a marble from anywhere along the rim, it will always roll straight to the single lowest point at the center. No matter where you start, there are no false pockets. A non-convex function is like an egg carton with dozens of little dips: drop a marble, and it gets trapped in the first shallow pocket it hits, completely unaware of the much deeper hole two rows over.',
      metaphor: 'In convex optimization, local optimality EQUALS global optimality: there are no deceptive local traps.',
    },
    problemSolved: {
      title: 'Guaranteeing Globally Optimal Machine Learning Models',
      description: 'Many foundational ML models (Linear Regression, Logistic Regression, Support Vector Machines) have convex loss functions. This ensures that training algorithms will never get stuck in suboptimal local minima.',
      keyPoints: [
        'Guarantees unique global solutions independent of random weight initialization.',
        'Enables strong duality and efficient convex solvers (interior point methods, quadratic programming).',
        'Distinguishes provably solvable classical models from non-convex deep neural networks.',
      ],
    },
    intuition: {
      overview: 'A function is convex if the straight line segment connecting any two points on the graph always lies on or above the graph itself.',
      steps: [
        { step: 1, title: 'Convex Set', description: 'A set C where for any points x, y in C, the line segment between them stays entirely within C.' },
        { step: 2, title: 'Convex Function', description: 'f(t*x + (1-t)*y) <= t*f(x) + (1-t)*f(y) for all t in [0, 1].' },
        { step: 3, title: 'Second-Order Characterization', description: 'A twice-differentiable function is convex if and only if its Hessian matrix is positive semi-definite everywhere.' },
      ],
    },
    mathematics: {
      overview: 'Convex analysis provides the mathematical framework for rigorous optimization bounds.',
      foundations: [
        {
          name: 'Definition of Convex Function',
          latex: 'f(\\alpha \\mathbf{x} + (1 - \\alpha)\\mathbf{y}) \\le \\alpha f(\\mathbf{x}) + (1 - \\alpha) f(\\mathbf{y}) \\quad \\forall \\alpha \\in [0, 1]',
          explanation: 'The chord connecting (x, f(x)) and (y, f(y)) lies above the function curve.',
        },
        {
          name: 'First-Order Convexity Condition',
          latex: 'f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^T (\\mathbf{y} - \\mathbf{x})',
          explanation: 'The tangent hyperplane at any point x is a global under-estimator of the function everywhere.',
        },
        {
          name: 'Jensen\'s Inequality',
          latex: 'f(\\mathbb{E}[X]) \\le \\mathbb{E}[f(X)]',
          explanation: 'The function of the expectation is at most the expectation of the function (for convex f). Foundation of EM algorithm.',
        },
      ],
    },
    derivation: {
      title: 'Proof that Any Local Minimum of a Convex Function is a Global Minimum',
      objective: 'Prove by contradiction that no strictly lower point can exist elsewhere.',
      steps: [
        {
          step: 1,
          label: 'Assume a Lower Global Point Exists',
          latex: '\\text{Let } \\mathbf{x}^* \\text{ be a local min, and assume } \\exists \\mathbf{z} \\text{ such that } f(\\mathbf{z}) < f(\\mathbf{x}^*)',
          explanation: 'Suppose there exists an alternative point z with lower loss.',
        },
        {
          step: 2,
          label: 'Construct Interpolating Point',
          latex: '\\mathbf{y} = (1 - \\theta)\\mathbf{x}^* + \\theta \\mathbf{z} \\quad \\text{for small } \\theta \\in (0, 1)',
          explanation: 'Choose theta small enough that y falls inside the local neighborhood of x*.',
        },
        {
          step: 3,
          label: 'Apply Convexity and Contradiction',
          latex: 'f(\\mathbf{y}) \\le (1 - \\theta)f(\\mathbf{x}^*) + \\theta f(\\mathbf{z}) < (1 - \\theta)f(\\mathbf{x}^*) + \\theta f(\\mathbf{x}^*) = f(\\mathbf{x}^*)',
          explanation: 'This contradicts the assumption that x* is a local minimum. Thus, no such point z can exist.',
        },
      ],
    },
    variables: [
      { symbol: '\\alpha', name: 'Interpolation Weight', description: 'Fractional distance along the line segment between points.', dimensions: 'Scalar [0, 1]' },
      { symbol: '\\mathbf{x}^*', name: 'Global Minimizer', description: 'Point satisfying f(x*) <= f(x) for all x in domain.', dimensions: 'd × 1' },
      { symbol: 'H', name: 'Hessian Matrix', description: 'Must satisfy v^T H v >= 0 for all vectors v (positive semi-definite).', dimensions: 'd × d' },
    ],
    numericalExample: {
      scenario: 'Test whether f(x) = x^2 is convex by evaluating Jensen\'s inequality for points x = 2 and y = 6 with alpha = 0.5.',
      dataset: [{ sample: 1, x: 2.0, y: 6.0, alpha: 0.5 }],
      calculations: [
        { step: 'Convex Combination of Inputs', math: '\\alpha x + (1-\\alpha)y = 0.5(2) + 0.5(6) = 1 + 3', result: '4.00' },
        { step: 'Function of Combination', math: 'f(4.0) = 4.0^2', result: '16.00' },
        { step: 'Function Values at Endpoints', math: 'f(2) = 4.0, f(6) = 36.0', result: 'f(x)=4, f(y)=36' },
        { step: 'Combination of Function Values', math: '0.5 f(2) + 0.5 f(6) = 0.5(4) + 0.5(36) = 2 + 18', result: '20.00' },
        { step: 'Inequality Verification', math: 'f(\\alpha x + (1-\\alpha)y) = 16.00 \\le 20.00 = \\alpha f(x) + (1-\\alpha)f(y)', result: 'True (16 <= 20)' },
      ],
      finalConclusion: 'Since 16.0 <= 20.0, Jensen\'s inequality holds. The chord height (20) lies above the function curve (16).',
    },
    visualExplanation: {
      title: 'Epigraph of a Convex Function',
      description: 'The epigraph of a function is the set of points lying on or above its graph: epi(f) = {(x, t) : t >= f(x)}. A function is convex if and only if its epigraph forms a convex geometric set.',
      features: ['Epigraph forms a solid convex bowl', 'Tangent lines always lie beneath the curve', 'No overhangs or inward dents'],
    },
    scratchCode: {
      title: 'Testing Convexity via Numerical Hessian Sampling',
      explanation: 'Empirically verify convexity by checking whether minimum Hessian eigenvalue is non-negative everywhere.',
      code: `import numpy as np

def verify_convexity_2d(f_hessian_func, x_range=(-5, 5), y_range=(-5, 5), num_samples=20):
    """Samples points across domain and verifies positive semi-definiteness of Hessian."""
    xs = np.linspace(x_range[0], x_range[1], num_samples)
    ys = np.linspace(y_range[0], y_range[1], num_samples)
    
    min_eigenval = float('inf')
    is_convex = True
    
    for x in xs:
        for y in ys:
            H = f_hessian_func(x, y)
            eigvals = np.linalg.eigvalsh(H)
            current_min = float(np.min(eigvals))
            if current_min < min_eigenval:
                min_eigenval = current_min
            if current_min < -1e-6:
                is_convex = False
                
    return is_convex, round(min_eigenval, 6)

# Test function: f(x, y) = x^2 + y^2 (Hessian is constant [[2, 0], [0, 2]])
is_cvx, min_eig = verify_convexity_2d(lambda x, y: np.array([[2.0, 0.0], [0.0, 2.0]]))
print(f"Is convex? {is_cvx}, Minimum eigenvalue: {min_eig}")
`,
    },
    sklearnCode: {
      title: 'Convex Optimization in Scikit-Learn: Logistic Regression',
      explanation: 'Scikit-learn LogisticRegression solves a strictly convex optimization problem via L-BFGS or Liblinear.',
      code: `from sklearn.linear_model import LogisticRegression
import numpy as np

# Convex problem guarantees identical convergence regardless of initialization
X = np.array([[-2.0], [-1.0], [1.0], [2.0]])
y = np.array([0, 0, 1, 1])

clf = LogisticRegression(solver='lbfgs')
clf.fit(X, y)

print("Optimal coefficient:", np.round(clf.coef_, 4))
print("Optimal intercept:", np.round(clf.intercept_, 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

# Test Jensen's Inequality on f(x) = x^2
x1, x2 = 2.0, 6.0
alpha = 0.5

lhs = (alpha * x1 + (1 - alpha) * x2) ** 2
rhs = alpha * (x1 ** 2) + (1 - alpha) * (x2 ** 2)

print(f"f(alpha*x1 + (1-alpha)*x2) = {lhs:.2f}")
print(f"alpha*f(x1) + (1-alpha)*f(x2) = {rhs:.2f}")
print(f"LHS <= RHS is {lhs <= rhs} (Convexity confirmed)")
`,
      expectedOutput: `f(alpha*x1 + (1-alpha)*x2) = 16.00\nalpha*f(x1) + (1-alpha)*f(x2) = 20.00\nLHS <= RHS is True (Convexity confirmed)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 7', codeSnippet: 'lhs = (alpha * x1 + (1 - alpha) * x2) ** 2', explanation: 'Evaluates the function at the midpoint between x1 and x2.' },
      { lines: 'Line 8', codeSnippet: 'rhs = alpha * (x1 ** 2) + (1 - alpha) * (x2 ** 2)', explanation: 'Evaluates the linear chord height between f(x1) and f(x2).' },
      { lines: 'Line 12', codeSnippet: 'print(lhs <= rhs)', explanation: 'Confirms that the function curve lies below the chord.' },
    ],
    hyperparameters: [
      { name: 'tolerance (tol)', defaultVal: '1e-4', range: '[1e-6, 1e-2]', effect: 'Stopping threshold on gradient norm.', recommendation: 'Because convex functions have a single minimum, smaller tolerances reliably produce high precision.' },
    ],
    assumptions: [
      { assumption: 'Convex Domain', whyItMatters: 'Convex functions must be defined on convex sets so linear combinations remain in the domain.', howToVerify: 'Verify that parameter constraints form box or linear inequality bounds.' },
    ],
    commonMistakes: [
      { mistake: 'Assuming all neural network training is convex', solution: 'Deep neural networks are highly non-convex with countless saddle points and local minima. Only classical linear/logistic/SVM models are convex.' },
    ],
    realWorldUseCases: [
      { industry: 'Supply Chain & Operations', application: 'Linear and Quadratic Programming', benefit: 'Convex solvers determine optimal shipping routes and inventory allocation across millions of constraints in seconds.' },
    ],
    practiceQuestions: [
      { id: 'pq-9', question: 'Is the sum of two convex functions always convex?', hint: 'Evaluate the definition on f(x) + g(x).', answer: 'Yes. If f and g are convex, then for any alpha in [0, 1]: (f+g)(alpha x + (1-alpha)y) = f(...) + g(...) <= alpha f(x) + (1-alpha)f(y) + alpha g(x) + (1-alpha)g(y) = alpha (f+g)(x) + (1-alpha)(f+g)(y).' },
    ],
    quiz: [
      {
        id: 'quiz-math-9',
        question: 'Which of the following functions is strictly NON-CONVEX over the real line R?',
        options: ['f(x) = x^2', 'f(x) = exp(x)', 'f(x) = sin(x)', 'f(x) = |x|'],
        correctIndex: 2,
        explanation: 'sin(x) oscillates between -1 and +1 with alternating positive and negative curvature (second derivative is -sin(x)), making it non-convex.',
      },
    ],
    independentExercise: {
      title: 'Verify Convexity of Negative Log-Likelihood for Logistic Regression',
      problem: 'Prove computationally that the 1D logistic loss L(w) = log(1 + exp(-y * w * x)) has a strictly positive second derivative with respect to w everywhere, confirming its convexity.',
      hints: ['Let s = sigmoid(-y * w * x)', 'The second derivative simplifies to (x^2) * s * (1 - s)'],
      starterCode: `import numpy as np

def logistic_second_derivative(w, x=1.5, y=1.0):
    z = -y * w * x
    s = 1.0 / (1.0 + np.exp(-z))
    # TODO: return second derivative
    return 0.0

w_vals = np.linspace(-5, 5, 5)
print("Second derivatives:", [round(logistic_second_derivative(w), 4) for w in w_vals])
`,
      solution: `import numpy as np

def logistic_second_derivative(w, x=1.5, y=1.0):
    z = -y * w * x
    s = 1.0 / (1.0 + np.exp(-z))
    return (x ** 2) * s * (1.0 - s)

w_vals = np.linspace(-5, 5, 5)
print("Second derivatives:", [round(logistic_second_derivative(w), 4) for w in w_vals])
`,
    },
    summary: {
      keyTakeaways: [
        'A convex function lies below any chord connecting two of its points.',
        'A twice-differentiable function is convex if and only if its Hessian is positive semi-definite everywhere.',
        'Every local minimum of a convex function is guaranteed to be a global minimum.',
      ],
      nextLessonId: 'probability-bayes-theorem',
      nextLessonTitle: 'Probability Rules & Bayes Theorem',
      nextLessonModuleId: 'module-1',
    },
  },

  'probability-bayes-theorem': {
    id: 'probability-bayes-theorem',
    moduleId: 'module-1',
    title: 'Probability Rules & Bayes Theorem',
    subtitle: 'Kolmogorov Axioms, Conditional Likelihood, Prior Beliefs & Bayesian Inversion',
    order: 10,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'State the three Kolmogorov axioms of probability.',
      'Compute marginal, joint, and conditional probabilities via the Product and Sum Rules.',
      'Apply Bayes\' theorem: P(A|B) = [P(B|A) P(A)] / P(B) to real-world diagnosis and spam classification.',
    ],
    prerequisites: ['Basic set theory (unions, intersections)', 'scalars-vectors-matrices-tensors'],
    analogy: {
      title: 'The Medical Test Paradox',
      text: 'Suppose a rare disease affects 1 in 1,000 people (0.1% prior). A lab test is 99% accurate (if you have it, it shows positive 99% of the time; if healthy, it shows negative 99% of the time). You test positive! Are you 99% likely to be sick? No! Out of 100,000 people: 100 are sick (99 test positive), but 99,900 are healthy (and 1% false positives means 999 test positive). Out of 1,098 total positive tests, only 99 actually have the disease: about 9%! Bayes\' rule prevents you from ignoring the base rate.',
      metaphor: 'Bayes\' theorem is a mathematical scale that balances prior beliefs with fresh empirical evidence.',
    },
    problemSolved: {
      title: 'Reasoning Under Uncertainty in Machine Learning',
      description: 'Deterministic rules cannot handle noisy sensors, ambiguous natural language, or incomplete data. Probability provides the formal mathematical calculus for quantifying uncertainty and updating beliefs.',
      keyPoints: [
        'Converts raw observable features into calibrated class probabilities P(y|X).',
        'Incorporate prior domain knowledge into statistical modeling.',
        'Forms the mathematical foundation of Naive Bayes, Bayesian networks, and Kalman filters.',
      ],
    },
    intuition: {
      overview: 'Probability measures our degree of certainty. When new evidence arrives, Bayes\' rule tells us exactly how to update our prior belief into an updated posterior belief.',
      steps: [
        { step: 1, title: 'Prior P(A)', description: 'What we believed about hypothesis A before seeing the new evidence.' },
        { step: 2, title: 'Likelihood P(B|A)', description: 'How probable the observed evidence B is if hypothesis A were true.' },
        { step: 3, title: 'Evidence P(B)', description: 'The total probability of observing evidence B across all possible hypotheses.' },
        { step: 4, title: 'Posterior P(A|B)', description: 'Our updated belief in hypothesis A given that evidence B occurred.' },
      ],
    },
    mathematics: {
      overview: 'Probability theory is built upon Kolmogorov\'s three axioms: non-negativity, unit total measure, and countable additivity.',
      foundations: [
        {
          name: 'Kolmogorov Axioms',
          latex: 'P(E) \\ge 0, \\quad P(\\Omega) = 1, \\quad P(A \\cup B) = P(A) + P(B) \\text{ if } A \\cap B = \\emptyset',
          explanation: 'Foundational axioms from which all probability laws are derived.',
        },
        {
          name: 'The Product Rule (Conditional Probability)',
          latex: 'P(A \\cap B) = P(A | B) P(B) = P(B | A) P(A)',
          explanation: 'Joint probability is conditional probability multiplied by marginal evidence.',
        },
        {
          name: 'Bayes\' Theorem',
          latex: 'P(A | B) = \\frac{P(B | A) P(A)}{P(B)} = \\frac{P(B | A) P(A)}{\\sum_i P(B | A_i) P(A_i)}',
          explanation: 'Posterior = (Likelihood * Prior) / Marginal Evidence.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Bayes\' Theorem from Joint Symmetry',
      objective: 'Prove Bayes\' theorem directly from the definition of conditional probability.',
      steps: [
        {
          step: 1,
          label: 'Express Joint Probability from Both Perspectives',
          latex: 'P(A \\cap B) = P(A | B) P(B) \\quad \\text{and} \\quad P(A \\cap B) = P(B | A) P(A)',
          explanation: 'The probability of both A and B occurring is symmetric under exchange of labels.',
        },
        {
          step: 2,
          label: 'Equate the Right-Hand Sides',
          latex: 'P(A | B) P(B) = P(B | A) P(A)',
          explanation: 'Both expressions equal the exact same joint probability mass P(A, B).',
        },
        {
          step: 3,
          label: 'Divide by Marginal Evidence P(B)',
          latex: 'P(A | B) = \\frac{P(B | A) P(A)}{P(B)}',
          explanation: 'Yields Bayes\' theorem for any event with non-zero probability P(B) > 0.',
        },
      ],
    },
    variables: [
      { symbol: 'P(A)', name: 'Prior Probability', description: 'Base probability of hypothesis A before observing data.', dimensions: 'Scalar [0, 1]' },
      { symbol: 'P(B|A)', name: 'Likelihood', description: 'Probability of data B assuming hypothesis A is true.', dimensions: 'Scalar [0, 1]' },
      { symbol: 'P(A|B)', name: 'Posterior Probability', description: 'Updated probability of hypothesis A after observing data B.', dimensions: 'Scalar [0, 1]' },
    ],
    numericalExample: {
      scenario: 'Calculate posterior probability of disease D given a positive test T+: Prior P(D) = 0.001, Sensitivity P(T+|D) = 0.99, False Positive Rate P(T+|not D) = 0.01.',
      dataset: [{ prior: 0.001, sensitivity: 0.99, fpr: 0.01 }],
      calculations: [
        { step: 'Probability of Healthy P(not D)', math: '1 - 0.001 = 0.999', result: '0.9990' },
        { step: 'Numerator (P(T+|D) * P(D))', math: '0.99 \\cdot 0.001', result: '0.00099' },
        { step: 'False Positive Contribution', math: 'P(T+|not D) \\cdot P(not D) = 0.01 \\cdot 0.999', result: '0.00999' },
        { step: 'Total Evidence P(T+)', math: '0.00099 + 0.00999', result: '0.01098' },
        { step: 'Posterior P(D|T+)', math: '0.00099 / 0.01098', result: '0.09016 (9.02%)' },
      ],
      finalConclusion: 'Even with a 99% accurate test, a positive result only yields a ~9% posterior chance of having the disease due to the low base rate (base rate fallacy).',
    },
    visualExplanation: {
      title: 'Venn Diagram & Area Partitioning in Bayes\' Rule',
      description: 'The sample space is partitioned into Disease (0.1%) and Healthy (99.9%). The test positive event T+ slices across both regions. The posterior is the ratio of the tiny slice inside Disease to the total T+ area.',
      features: ['Prior sets baseline area', 'Likelihood filters evidence', 'Posterior re-normalizes area to 100%'],
    },
    scratchCode: {
      title: 'Bayes Theorem Calculator in Python',
      explanation: 'General function to compute posterior probability given prior and likelihoods.',
      code: `def bayes_theorem(prior_A: float, likelihood_B_given_A: float, likelihood_B_given_not_A: float) -> float:
    """Computes posterior probability P(A|B) using Bayes rule."""
    prior_not_A = 1.0 - prior_A
    evidence = (likelihood_B_given_A * prior_A) + (likelihood_B_given_not_A * prior_not_A)
    posterior_A_given_B = (likelihood_B_given_A * prior_A) / evidence
    return round(posterior_A_given_B, 4)

# Rare disease test
p_sick_given_pos = bayes_theorem(prior_A=0.001, likelihood_B_given_A=0.99, likelihood_B_given_not_A=0.01)
print(f"Posterior probability of disease: {p_sick_given_pos * 100:.2f}%")
`,
    },
    sklearnCode: {
      title: 'Gaussian Naive Bayes in Scikit-Learn',
      explanation: 'Applying Bayes theorem to classification with continuous Gaussian feature likelihoods.',
      code: `import numpy as np
from sklearn.naive_bayes import GaussianNB

# Training data: 4 samples with 2 features
X = np.array([[-1.0, -1.0], [-2.0, -1.0], [1.0, 1.0], [2.0, 1.0]])
y = np.array([0, 0, 1, 1])

gnb = GaussianNB()
gnb.fit(X, y)

test_sample = np.array([[0.5, 0.5]])
probabilities = gnb.predict_proba(test_sample)

print("Class Priors P(y):", gnb.class_prior_)
print("Posterior Probabilities P(y|X):", np.round(probabilities, 4))
`,
    },
    runnableCode: {
      code: `prior = 0.001
sensitivity = 0.99 # P(T+|D)
fpr = 0.01         # P(T+|not D)

evidence = (sensitivity * prior) + (fpr * (1.0 - prior))
posterior = (sensitivity * prior) / evidence

print(f"Prior P(D): {prior:.3f}")
print(f"Total Evidence P(T+): {evidence:.5f}")
print(f"Posterior P(D|T+): {posterior:.4f} ({posterior*100:.2f}%)")
`,
      expectedOutput: `Prior P(D): 0.001\nTotal Evidence P(T+): 0.01098\nPosterior P(D|T+): 0.0902 (9.02%)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 5', codeSnippet: 'evidence = (sensitivity * prior) + (fpr * (1.0 - prior))', explanation: 'Sums probability of positive test across both sick and healthy populations via law of total probability.' },
      { lines: 'Line 6', codeSnippet: 'posterior = (sensitivity * prior) / evidence', explanation: 'Applies Bayes formula to compute updated probability conditioned on positive test.' },
    ],
    hyperparameters: [
      { name: 'class_prior', defaultVal: 'empirical (None)', range: '[0, 1] per class', effect: 'Sets prior beliefs before observing features.', recommendation: 'Use empirical training proportions unless testing for rare events where adjusted priors prevent majority class collapse.' },
    ],
    assumptions: [
      { assumption: 'Mutually Exclusive and Exhaustive Partition', whyItMatters: 'The denominator sum(P(B|A_i) P(A_i)) requires hypotheses A_i to cover all possible states with no overlap.', howToVerify: 'Verify sum(P(A_i)) == 1.0.' },
    ],
    commonMistakes: [
      { mistake: 'Confusing P(A|B) with P(B|A) (Transposed Conditional Fallacy)', solution: 'P(Accused is Guilty | Evidence matches) != P(Evidence matches | Accused is Guilty). Always apply Bayes theorem to invert conditionals.' },
    ],
    realWorldUseCases: [
      { industry: 'Cybersecurity & Email', application: 'Spam Filtering', benefit: 'Evaluating word likelihoods P(word | Spam) vs P(word | Ham) classifies incoming messages into junk folders accurately.' },
    ],
    practiceQuestions: [
      { id: 'pq-10', question: 'What is the Base Rate Fallacy in probability?', hint: 'Think about the rare disease test calculation.', answer: 'The cognitive error of judging conditional probability P(A|B) purely based on likelihood P(B|A) while ignoring the low prior probability P(A).' },
    ],
    quiz: [
      {
        id: 'quiz-math-10',
        question: 'If events A and B are independent, what is P(A|B) equal to?',
        options: ['P(B)', 'P(A)', 'P(A) * P(B)', '0'],
        correctIndex: 1,
        explanation: 'By definition of statistical independence, knowing that B occurred provides zero information about A, so P(A|B) = P(A).',
      },
    ],
    independentExercise: {
      title: 'Implement Naive Bayes Prior and Likelihood Scoring',
      problem: 'Write a function compute_posterior_ratio(p_prior_spam, p_words_given_spam, p_words_given_ham) that multiplies priors and independent word likelihoods to return the odds ratio P(Spam|words) / P(Ham|words).',
      hints: ['Odds ratio = [P(Spam) * prod(P(w|Spam))] / [P(Ham) * prod(P(w|Ham))]'],
      starterCode: `import numpy as np

def compute_odds_ratio(prior_spam: float, lik_spam: list, lik_ham: list) -> float:
    # TODO: return odds ratio
    return 1.0

# 2 words: "free" and "money"
print("Odds ratio:", compute_odds_ratio(0.2, [0.8, 0.7], [0.05, 0.02]))
`,
      solution: `import numpy as np

def compute_odds_ratio(prior_spam: float, lik_spam: list, lik_ham: list) -> float:
    prior_ham = 1.0 - prior_spam
    p_spam = prior_spam * np.prod(lik_spam)
    p_ham = prior_ham * np.prod(lik_ham)
    return round(float(p_spam / p_ham), 2)

print("Odds ratio:", compute_odds_ratio(0.2, [0.8, 0.7], [0.05, 0.02]))
`,
    },
    summary: {
      keyTakeaways: [
        'Bayes\' theorem converts prior beliefs into updated posterior probabilities using likelihood and evidence.',
        'Never ignore the prior base rate; rare events require overwhelming evidence to achieve high posterior certainty.',
        'Independence allows joint probabilities to factorize into simple component products.',
      ],
      nextLessonId: 'probability-distributions',
      nextLessonTitle: 'Discrete and Continuous Probability Distributions',
      nextLessonModuleId: 'module-1',
    },
  },

  'probability-distributions': {
    id: 'probability-distributions',
    moduleId: 'module-1',
    title: 'Discrete and Continuous Probability Distributions',
    subtitle: 'Bernoulli, Binomial, Poisson, Gaussian & Multivariate Normal Covariance',
    order: 11,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Differentiate Probability Mass Functions (PMF) for discrete variables from Probability Density Functions (PDF) for continuous variables.',
      'Derive and interpret the Gaussian (Normal) distribution formula.',
      'Understand Multivariate Normal distributions and how covariance matrices shape probability ellipsoids.',
    ],
    prerequisites: ['probability-bayes-theorem', 'scalars-vectors-matrices-tensors'],
    analogy: {
      title: 'Counting Marbles vs Pouring Water',
      text: 'A discrete distribution is like counting solid marbles in jars: you can have exactly 3 marbles or 4 marbles, and the probability of having 3 is a concrete number like 35% (PMF). A continuous distribution is like pouring water into a glass: you can measure 250.0000... ml. The probability of measuring an infinitely precise volume to infinite decimal places is technically zero! Instead, we measure the probability of the volume falling within a continuous range [249ml, 251ml] by calculating the area under the density curve (PDF).',
      metaphor: 'PMF gives probabilities at exact points; PDF gives densities whose integrals over intervals give probabilities.',
    },
    problemSolved: {
      title: 'Modeling Diverse Data Types and Noise Profiles',
      description: 'Different real-world phenomena follow different statistical geometries: click-through rates are Bernoulli/Binomial, website visit arrivals are Poisson, and physical sensor measurements are Gaussian.',
      keyPoints: [
        'Matches model assumptions to empirical data characteristics.',
        'The Gaussian distribution arises naturally from the Central Limit Theorem when many small independent noise sources sum together.',
        'Multivariate normal densities form the mathematical engine of Gaussian Mixture Models (GMM) and Kalman filters.',
      ],
    },
    intuition: {
      overview: 'Distributions are mathematical blueprints describing how probability mass or density is distributed across the domain of a random variable.',
      steps: [
        { step: 1, title: 'Bernoulli Trial', description: 'Single binary coin toss with success probability p: P(X=1) = p, P(X=0) = 1-p.' },
        { step: 2, title: 'Binomial Distribution', description: 'Count of successes in n independent Bernoulli trials: n! / (k! (n-k)!) * p^k * (1-p)^(n-k).' },
        { step: 3, title: 'Gaussian Distribution', description: 'Symmetric bell curve defined completely by mean mu (center) and variance sigma^2 (spread).' },
        { step: 4, title: 'Multivariate Normal', description: 'Generalizes bell curve to d dimensions parameterized by mean vector mu and covariance matrix Sigma.' },
      ],
    },
    mathematics: {
      overview: 'Analytical formulations of foundational discrete PMFs and continuous PDFs.',
      foundations: [
        {
          name: 'Univariate Gaussian PDF',
          latex: 'p(x) = \\frac{1}{\\sqrt{2\\pi \\sigma^2}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)',
          explanation: 'Bell-shaped density curve integrated from -inf to +inf equals exactly 1.',
        },
        {
          name: 'Multivariate Gaussian PDF',
          latex: 'p(\\mathbf{x}) = \\frac{1}{(2\\pi)^{d/2} |\\Sigma|^{1/2}} \\exp\\left( -\\frac{1}{2} (\\mathbf{x} - \\boldsymbol{\\mu})^T \\Sigma^{-1} (\\mathbf{x} - \\boldsymbol{\\mu}) \\right)',
          explanation: 'Exponent contains the squared Mahalanobis distance accounting for feature correlations.',
        },
        {
          name: 'Poisson PMF',
          latex: 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}',
          explanation: 'Models count of independent events occurring in fixed time interval with rate lambda.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Normalizing Constant for Gaussian PDF',
      objective: 'Prove that the integral of exp(-x^2 / (2 sigma^2)) equals sqrt(2 pi sigma^2).',
      steps: [
        {
          step: 1,
          label: 'Square the Gaussian Integral I',
          latex: 'I^2 = \\left( \\int_{-\\infty}^{\\infty} e^{-x^2 / 2} dx \\right) \\left( \\int_{-\\infty}^{\\infty} e^{-y^2 / 2} dy \\right) = \\int_{-\\infty}^{\\infty} \\int_{-\\infty}^{\\infty} e^{-(x^2 + y^2)/2} dx dy',
          explanation: 'Express the product as a double integral over the 2D plane.',
        },
        {
          step: 2,
          label: 'Convert to Polar Coordinates',
          latex: 'x^2 + y^2 = r^2, \\quad dx dy = r dr d\\theta \\implies I^2 = \\int_{0}^{2\\pi} d\\theta \\int_{0}^{\\infty} r e^{-r^2/2} dr',
          explanation: 'The Jacobian of the Cartesian to polar transformation introduces factor r.',
        },
        {
          step: 3,
          label: 'Evaluate the Radial Integral',
          latex: 'I^2 = 2\\pi \\left[ -e^{-r^2/2} \\right]_{0}^{\\infty} = 2\\pi (0 - (-1)) = 2\\pi \\implies I = \\sqrt{2\\pi}',
          explanation: 'Taking the square root proves the normalization constant is 1 / sqrt(2 pi).',
        },
      ],
    },
    variables: [
      { symbol: '\\mu', name: 'Mean (Expected Value)', description: 'Center location of the distribution.', dimensions: 'Scalar or d × 1' },
      { symbol: '\\sigma^2', name: 'Variance', description: 'Measure of dispersion or spread around the mean.', dimensions: 'Scalar > 0' },
      { symbol: '\\Sigma', name: 'Covariance Matrix', description: 'Symmetric d x d matrix capturing pairwise feature variances and covariances.', dimensions: 'd × d' },
    ],
    numericalExample: {
      scenario: 'Calculate the probability density p(x) for a Gaussian distribution with mean mu = 10.0 and std dev sigma = 2.0 at point x = 12.0.',
      dataset: [{ sample: 1, mu: 10.0, sigma: 2.0, x: 12.0 }],
      calculations: [
        { step: 'Difference from Mean (x - mu)', math: '12.0 - 10.0 = 2.0', result: '2.00 (1 std dev away)' },
        { step: 'Exponent Calculation', math: '-\\frac{(x - \\mu)^2}{2\\sigma^2} = -\\frac{2^2}{2(4)} = -\\frac{4}{8}', result: '-0.50' },
        { step: 'Exponential Term', math: 'e^{-0.5} \\approx 0.6065', result: '0.6065' },
        { step: 'Normalization Factor', math: '\\frac{1}{\\sqrt{2\\pi \\sigma^2}} = \\frac{1}{\\sqrt{2 \\cdot 3.14159 \\cdot 4}} = \\frac{1}{\\sqrt{25.1327}} = \\frac{1}{5.0133}', result: '0.1995' },
        { step: 'Total Density p(x)', math: '0.1995 \\cdot 0.6065', result: '0.1210' },
      ],
      finalConclusion: 'The probability density at x = 12.0 is approximately 0.1210.',
    },
    visualExplanation: {
      title: '68-95-99.7 Empirical Rule for Normal Distributions',
      description: 'In any Gaussian distribution: 68.27% of probability mass lies within 1 standard deviation [mu - sigma, mu + sigma]; 95.45% lies within 2 standard deviations; and 99.73% lies within 3 standard deviations.',
      features: ['mu +/- 1 sigma: 68.3%', 'mu +/- 2 sigma: 95.5%', 'mu +/- 3 sigma: 99.7%'],
    },
    scratchCode: {
      title: 'Gaussian PDF Implementation in NumPy',
      explanation: 'Direct evaluation of univariate Gaussian density formula.',
      code: `import numpy as np

def gaussian_pdf(x: float, mu: float = 0.0, sigma: float = 1.0) -> float:
    """Computes Gaussian probability density function."""
    coeff = 1.0 / (np.sqrt(2.0 * np.pi) * sigma)
    exponent = -0.5 * ((x - mu) / sigma) ** 2
    return float(coeff * np.exp(exponent))

val = gaussian_pdf(x=12.0, mu=10.0, sigma=2.0)
print(f"Computed PDF at x=12.0: {val:.4f}")
`,
    },
    sklearnCode: {
      title: 'SciPy Stats Distribution Modeling',
      explanation: 'Using scipy.stats for density evaluations, CDF percentiles, and random sampling.',
      code: `import numpy as np
from scipy import stats

norm_dist = stats.norm(loc=10.0, scale=2.0)

# Evaluate PDF
pdf_val = norm_dist.pdf(12.0)
# Evaluate cumulative probability P(X <= 12)
cdf_val = norm_dist.cdf(12.0)

print(f"PDF at x=12.0: {pdf_val:.4f}")
print(f"P(X <= 12.0) [CDF]: {cdf_val:.4f} (approx 84.13%)")
`,
    },
    runnableCode: {
      code: `import numpy as np

mu = 10.0
sigma = 2.0
x = 12.0

coeff = 1.0 / (np.sqrt(2 * np.pi) * sigma)
exponent = np.exp(-0.5 * ((x - mu) / sigma) ** 2)
pdf = coeff * exponent

print(f"Mean: {mu}, Sigma: {sigma}")
print(f"Normalized distance: {(x - mu)/sigma:.1f} std dev")
print(f"Gaussian Density at x={x}: {pdf:.4f}")
`,
      expectedOutput: `Mean: 10.0, Sigma: 2.0\nNormalized distance: 1.0 std dev\nGaussian Density at x=12.0: 0.1210`,
    },
    lineByLineExplanation: [
      { lines: 'Line 7', codeSnippet: 'coeff = 1.0 / (np.sqrt(2 * np.pi) * sigma)', explanation: 'Calculates the scale normalization constant ensuring area integrates to 1.' },
      { lines: 'Line 8', codeSnippet: 'exponent = np.exp(-0.5 * ((x - mu) / sigma) ** 2)', explanation: 'Evaluates the quadratic decay from the mean.' },
      { lines: 'Line 9', codeSnippet: 'pdf = coeff * exponent', explanation: 'Multiplies normalizing constant and exponential term to yield point density.' },
    ],
    hyperparameters: [
      { name: 'covariance_type', defaultVal: 'full', range: '["full", "diag", "spherical"]', effect: 'Constrains degrees of freedom in multivariate Gaussian covariance matrix.', recommendation: 'Use "diag" for high-dimensional data to avoid parameter explosion and overfitting.' },
    ],
    assumptions: [
      { assumption: 'Symmetry and Normal Tails', whyItMatters: 'Gaussian distributions assume zero skewness and exponential tail decay (low likelihood of extreme outliers).', howToVerify: 'Inspect Q-Q plots or run Shapiro-Wilk normality test.' },
    ],
    commonMistakes: [
      { mistake: 'Treating PDF value as a probability > 1.0 being impossible', solution: 'PDF values CAN exceed 1.0 for small sigma (e.g. sigma=0.1 yields peak density ~3.98). Only integrals of PDF represent probabilities <= 1.0.' },
    ],
    realWorldUseCases: [
      { industry: 'Autonomous Vehicles / Robotics', application: 'Kalman Filtering', benefit: 'Models vehicle position and velocity uncertainty as multivariate Gaussians, updating estimates in real time via sensor fusion.' },
    ],
    practiceQuestions: [
      { id: 'pq-11', question: 'What is the relationship between the Bernoulli distribution and the Binomial distribution?', hint: 'Think of tossing a coin once versus tossing it n times.', answer: 'A Bernoulli distribution models a single binary trial. A Binomial distribution models the sum of n independent, identically distributed Bernoulli trials.' },
    ],
    quiz: [
      {
        id: 'quiz-math-11',
        question: 'In a standard normal distribution N(0, 1), approximately what percentage of observations fall between -2 and +2?',
        options: ['50%', '68.3%', '95.5%', '99.7%'],
        correctIndex: 2,
        explanation: 'According to the empirical rule, approximately 95.45% (about 95.5%) of mass falls within 2 standard deviations of the mean.',
      },
    ],
    independentExercise: {
      title: 'Calculate Bivariate Gaussian Mahalanobis Distance',
      problem: 'Write a function mahalanobis_distance(x, mu, cov) that computes d_M = sqrt((x - mu)^T cov^(-1) (x - mu)).',
      hints: ['Compute diff = x - mu', 'Use np.linalg.inv(cov) or solve', 'Return sqrt(diff.T @ inv_cov @ diff)'],
      starterCode: `import numpy as np

def mahalanobis_distance(x: np.ndarray, mu: np.ndarray, cov: np.ndarray) -> float:
    # TODO: compute Mahalanobis distance
    return 0.0

x = np.array([2.0, 3.0])
mu = np.array([0.0, 0.0])
cov = np.array([[2.0, 0.5], [0.5, 1.0]])
print("Mahalanobis Distance:", round(mahalanobis_distance(x, mu, cov), 4))
`,
      solution: `import numpy as np

def mahalanobis_distance(x: np.ndarray, mu: np.ndarray, cov: np.ndarray) -> float:
    diff = x - mu
    inv_cov = np.linalg.inv(cov)
    dist_sq = diff.T @ inv_cov @ diff
    return float(np.sqrt(dist_sq))

x = np.array([2.0, 3.0])
mu = np.array([0.0, 0.0])
cov = np.array([[2.0, 0.5], [0.5, 1.0]])
print("Mahalanobis Distance:", round(mahalanobis_distance(x, mu, cov), 4))
`,
    },
    summary: {
      keyTakeaways: [
        'Discrete variables use PMFs; continuous variables use PDFs whose area integrals equal probability.',
        'The Gaussian distribution is defined completely by its mean mu and variance sigma^2.',
        'Multivariate normals use covariance matrices to model inter-feature correlations and directional spread.',
      ],
      nextLessonId: 'expectation-variance-covariance',
      nextLessonTitle: 'Expectation, Variance, and Covariance Matrices',
      nextLessonModuleId: 'module-1',
    },
  },

  'expectation-variance-covariance': {
    id: 'expectation-variance-covariance',
    moduleId: 'module-1',
    title: 'Expectation, Variance, and Covariance Matrices',
    subtitle: 'Moments of Distributions, Dispersion, Correlation Metrics & Covariance Geometry',
    order: 12,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Compute expectation E[X], variance Var(X), and standard deviation.',
      'Construct empirical covariance matrices from data matrices: Sigma = (1 / N) X_centered^T X_centered.',
      'Differentiate raw covariance from normalized Pearson correlation r in [-1, +1].',
    ],
    prerequisites: ['probability-distributions', 'matrix-inverse-rank-determinants'],
    analogy: {
      title: 'The Center of Gravity and the Spread of Shrapnel',
      text: 'Expectation E[X] is the balance point (center of mass) of a distribution: if you cut out the probability density shape on cardboard, it would balance perfectly on your fingertip at E[X]. Variance measures how widely shrapnel disperses around that center after an explosion. Covariance measures whether two particles fly outward together in the same direction (+Cov), opposite directions (-Cov), or completely independently (0 Cov).',
      metaphor: 'Expectation is where data balances; variance is how wide it spreads; covariance is how features move together.',
    },
    problemSolved: {
      title: 'Capturing Inter-Feature Dependencies in Tabular Data',
      description: 'Features in machine learning rarely act in isolation. The covariance matrix quantifies all linear relationships across d features simultaneously, enabling feature selection, whitening, and PCA.',
      keyPoints: [
        'Linear operator properties of expectation E[aX + b] = a E[X] + b simplify derivations.',
        'Covariance matrices are always symmetric and positive semi-definite.',
        'Powers the Mahalanobis distance used in multivariate outlier detection.',
      ],
    },
    intuition: {
      overview: 'Variance is simply the covariance of a variable with itself. The full covariance matrix collects variances on the diagonal and pairwise covariances on the off-diagonals.',
      steps: [
        { step: 1, title: 'Expected Value E[X]', description: 'Weighted average of all possible values weighted by their probabilities: sum(x * P(x)) or int(x * p(x) dx).' },
        { step: 2, title: 'Variance Var(X)', description: 'Expected squared deviation from the mean: E[(X - E[X])^2] = E[X^2] - (E[X])^2.' },
        { step: 3, title: 'Covariance Cov(X, Y)', description: 'Measures joint variability: E[(X - E[X])(Y - E[Y])].' },
        { step: 4, title: 'Pearson Correlation r', description: 'Normalized covariance bounded strictly between -1 and +1: Cov(X, Y) / (sigma_X * sigma_Y).' },
      ],
    },
    mathematics: {
      overview: 'Expectation is a linear operator mapping random variables to real scalars.',
      foundations: [
        {
          name: 'Variance Formula',
          latex: '\\text{Var}(X) = \\mathbb{E}[(X - \\mu)^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2',
          explanation: 'Measures expected squared distance from the distribution mean.',
        },
        {
          name: 'Covariance Formula',
          latex: '\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mathbb{E}[X])(Y - \\mathbb{E}[Y])] = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y]',
          explanation: 'Positive if X and Y deviate in same direction; negative if in opposite directions.',
        },
        {
          name: 'Covariance Matrix Formulation',
          latex: '\\Sigma = \\frac{1}{N - 1} \\tilde{X}^T \\tilde{X} \\quad \\text{where } \\tilde{X} = X - \\mathbf{1}\\boldsymbol{\\mu}^T',
          explanation: 'Vectorized sample covariance matrix for mean-centered design matrix X_tilde.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Computational Variance Shortcut',
      objective: 'Prove that E[(X - mu)^2] = E[X^2] - (E[X])^2.',
      steps: [
        {
          step: 1,
          label: 'Expand Squared Difference',
          latex: '\\mathbb{E}[(X - \\mu)^2] = \\mathbb{E}[X^2 - 2\\mu X + \\mu^2]',
          explanation: 'Expand the algebraic square inside the expectation.',
        },
        {
          step: 2,
          label: 'Apply Linearity of Expectation',
          latex: '= \\mathbb{E}[X^2] - 2\\mu \\mathbb{E}[X] + \\mathbb{E}[\\mu^2]',
          explanation: 'Linearity allows expectation to distribute across sums and factor out constants.',
        },
        {
          step: 3,
          label: 'Substitute mu = E[X]',
          latex: '= \\mathbb{E}[X^2] - 2(\\mathbb{E}[X])(\\mathbb{E}[X]) + (\\mathbb{E}[X])^2 = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2',
          explanation: 'Simplifies to the classic "mean of square minus square of mean" identity.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathbb{E}[X]', name: 'Expected Value', description: 'First moment of random variable X.', dimensions: 'Scalar' },
      { symbol: '\\text{Var}(X)', name: 'Variance', description: 'Second central moment measuring dispersion.', dimensions: 'Scalar ≥ 0' },
      { symbol: '\\rho_{XY}', name: 'Pearson Correlation', description: 'Normalized linear correlation coefficient.', dimensions: 'Scalar [-1, 1]' },
    ],
    numericalExample: {
      scenario: 'Given small 2D dataset with 3 samples: X = [1, 2, 3], Y = [2, 4, 6]. Compute means, sample variances, covariance, and correlation.',
      dataset: [{ sample: 1, x: 1, y: 2 }, { sample: 2, x: 2, y: 4 }, { sample: 3, x: 3, y: 6 }],
      calculations: [
        { step: 'Means mu_X and mu_Y', math: '\\mu_X = (1+2+3)/3 = 2.0; \\mu_Y = (2+4+6)/3 = 4.0', result: 'mu_X=2, mu_Y=4' },
        { step: 'Mean-centered deviations', math: 'x_tilde = [-1, 0, 1]; y_tilde = [-2, 0, 2]', result: 'centered vectors' },
        { step: 'Sample Variance of X', math: '((-1)^2 + 0^2 + 1^2) / (3 - 1) = (1 + 0 + 1) / 2', result: '1.00' },
        { step: 'Sample Variance of Y', math: '((-2)^2 + 0^2 + 2^2) / 2 = (4 + 0 + 4) / 2', result: '4.00' },
        { step: 'Sample Covariance Cov(X, Y)', math: '((-1)(-2) + (0)(0) + (1)(2)) / 2 = (2 + 0 + 2) / 2', result: '2.00' },
        { step: 'Pearson Correlation r', math: 'Cov(X, Y) / (\\sigma_X \\cdot \\sigma_Y) = 2.0 / (\\sqrt{1} \\cdot \\sqrt{4}) = 2.0 / (1 \\cdot 2)', result: '1.00 (Perfect correlation)' },
      ],
      finalConclusion: 'Since Y is exactly 2X, the Pearson correlation r = 1.00, demonstrating a perfect deterministic linear relationship.',
    },
    visualExplanation: {
      title: 'Covariance Matrix as Geometric Stretch and Rotation',
      description: 'The diagonal elements of Sigma determine the width and height of the data scatter; the off-diagonal elements tilt and rotate the ellipse diagonally.',
      features: ['Off-diagonal > 0: Tilted upwards (positive correlation)', 'Off-diagonal = 0: Axis-aligned (uncorrelated)', 'Off-diagonal < 0: Tilted downwards (negative correlation)'],
    },
    scratchCode: {
      title: 'Covariance Matrix Calculation in Pure NumPy',
      explanation: 'Mean-center design matrix and compute Gram matrix with Bessel correction (N-1).',
      code: `import numpy as np

def compute_covariance_matrix(X: np.ndarray) -> np.ndarray:
    """Computes sample covariance matrix with N-1 Bessel correction."""
    N = X.shape[0]
    # Mean centering
    mean_vec = np.mean(X, axis=0)
    X_centered = X - mean_vec
    # Covariance formula
    cov_matrix = (X_centered.T @ X_centered) / (N - 1)
    return cov_matrix

data = np.array([[1.0, 2.0], [2.0, 4.0], [3.0, 6.0]])
cov = compute_covariance_matrix(data)
print("Computed Covariance Matrix:\n", cov)
print("NumPy np.cov check:\n", np.cov(data, rowvar=False))
`,
    },
    sklearnCode: {
      title: 'EmpiricalCovariance in Scikit-Learn',
      explanation: 'Estimating covariance and precision (inverse covariance) matrices.',
      code: `import numpy as np
from sklearn.covariance import EmpiricalCovariance

data = np.array([[1.0, 2.0], [2.0, 4.0], [3.0, 6.0], [4.0, 7.5]])
cov_model = EmpiricalCovariance()
cov_model.fit(data)

print("Empirical Covariance:\n", np.round(cov_model.covariance_, 4))
print("Precision Matrix (Inverse Covariance):\n", np.round(cov_model.precision_, 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

X = np.array([[1.0, 2.0], [2.0, 4.0], [3.0, 6.0]])
cov = np.cov(X, rowvar=False)
corr = np.corrcoef(X, rowvar=False)

print("Covariance Matrix:")
print(cov)
print("Correlation Matrix:")
print(corr)
`,
      expectedOutput: `Covariance Matrix:\n[[1. 2.]\n [2. 4.]]\nCorrelation Matrix:\n[[1. 1.]\n [1. 1.]]`,
    },
    lineByLineExplanation: [
      { lines: 'Line 3', codeSnippet: 'X = np.array([[1.0, 2.0], [2.0, 4.0], [3.0, 6.0]])', explanation: 'Creates 3 samples with 2 perfectly correlated features.' },
      { lines: 'Line 4', codeSnippet: 'cov = np.cov(X, rowvar=False)', explanation: 'Computes 2x2 sample covariance matrix treating columns as features.' },
      { lines: 'Line 5', codeSnippet: 'corr = np.corrcoef(X, rowvar=False)', explanation: 'Computes normalized correlation matrix with 1.0s on the diagonal.' },
    ],
    hyperparameters: [
      { name: 'ddof (degrees of freedom)', defaultVal: '1', range: '[0, 1]', effect: 'Divisor N - ddof. ddof=1 gives unbiased sample variance; ddof=0 gives MLE variance.', recommendation: 'Use ddof=1 for small datasets to prevent underestimating population variance.' },
    ],
    assumptions: [
      { assumption: 'Linear Relationship', whyItMatters: 'Pearson correlation only captures linear relationships; two variables can have r = 0 and yet be completely deterministically related non-linearly (e.g. Y = X^2).', howToVerify: 'Always plot scatter plots before relying on correlation numbers.' },
    ],
    commonMistakes: [
      { mistake: 'Passing rowvar=True (the default in np.cov) when rows are samples', solution: 'NumPy np.cov assumes rows are features by default! Always specify rowvar=False for standard (N samples x d features) data.' },
    ],
    realWorldUseCases: [
      { industry: 'Data Preprocessing', application: 'PCA Whitening Transformation', benefit: 'Transforming data by Sigma^(-1/2) creates uncorrelated features with unit variance, accelerating convergence in neural networks.' },
    ],
    practiceQuestions: [
      { id: 'pq-12', question: 'If two variables X and Y are independent, what is their covariance Cov(X, Y)?', hint: 'Evaluate E[XY] when variables are independent.', answer: 'If independent, E[XY] = E[X] E[Y]. Therefore Cov(X, Y) = E[XY] - E[X]E[Y] = 0. However, the converse is not always true: zero covariance does not guarantee independence (non-linear relationships can exist).' },
    ],
    quiz: [
      {
        id: 'quiz-math-12',
        question: 'If Var(X) = 4 and a = 3, what is Var(aX + 5)?',
        options: ['12', '17', '36', '41'],
        correctIndex: 2,
        explanation: 'Variance properties state that Var(aX + b) = a^2 * Var(X). Adding a constant b=5 does not change spread. Thus: 3^2 * 4 = 9 * 4 = 36.',
      },
    ],
    independentExercise: {
      title: 'Convert Covariance Matrix to Correlation Matrix',
      problem: 'Write a function cov_to_corr(cov) that converts any d x d covariance matrix into a correlation matrix using matrix operations.',
      hints: ['Extract diagonal std deviations: D = sqrt(diag(cov))', 'Correlation = cov / (D[:, None] * D[None, :])'],
      starterCode: `import numpy as np

def cov_to_corr(cov: np.ndarray) -> np.ndarray:
    # TODO: convert covariance to correlation
    return cov

cov = np.array([[4.0, 3.0], [3.0, 9.0]])
print("Correlation Matrix:\n", np.round(cov_to_corr(cov), 4))
`,
      solution: `import numpy as np

def cov_to_corr(cov: np.ndarray) -> np.ndarray:
    std = np.sqrt(np.diag(cov))
    outer_std = np.outer(std, std)
    return cov / outer_std

cov = np.array([[4.0, 3.0], [3.0, 9.0]])
print("Correlation Matrix:\n", np.round(cov_to_corr(cov), 4))
`,
    },
    summary: {
      keyTakeaways: [
        'Expectation E[X] is the probability-weighted center of gravity.',
        'Variance measures spread; Covariance measures joint linear directional variation.',
        'Correlation normalizes covariance into [-1, +1], providing a scale-free metric of linear agreement.',
      ],
      nextLessonId: 'sampling-central-limit-theorem',
      nextLessonTitle: 'Sampling and the Central Limit Theorem',
      nextLessonModuleId: 'module-1',
    },
  },

  'sampling-central-limit-theorem': {
    id: 'sampling-central-limit-theorem',
    moduleId: 'module-1',
    title: 'Sampling and the Central Limit Theorem',
    subtitle: 'Law of Large Numbers, Asymptotic Normality & Standard Error of the Mean',
    order: 13,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Differentiate population parameters from empirical sample statistics.',
      'State the Law of Large Numbers (LLN) and the Central Limit Theorem (CLT).',
      'Calculate the standard error of the mean: SE = sigma / sqrt(n).',
    ],
    prerequisites: ['probability-distributions', 'expectation-variance-covariance'],
    analogy: {
      title: 'The Guessing Crowd at the County Fair',
      text: 'At a county fair, 1,000 visitors guess the weight of an ox. Individual guesses vary wildly—some guess 400 kg, others guess 1,500 kg (a messy, skewed distribution). Yet if you take random groups of 30 people and compute their group averages, those sample averages cluster tightly in a beautiful, symmetric bell curve centered almost exactly on the true weight of the ox (750 kg). The CLT explains why group averages behave reliably even when individual data is wildly irregular.',
      metaphor: 'No matter how chaotic the source distribution, the distribution of sample means converges to a smooth Gaussian bell curve.',
    },
    problemSolved: {
      title: 'Constructing Confidence Intervals for Model Evaluation',
      description: 'When we test an ML model on 500 test samples, the accuracy score is just one sample mean. The CLT allows us to compute confidence intervals around test accuracy and perform statistical hypothesis testing (t-tests).',
      keyPoints: [
        'Explains why Gaussian assumptions are ubiquitous and justifiable across science and engineering.',
        'Quantifies how estimation uncertainty shrinks at rate 1 / sqrt(n) as sample size grows.',
        'Powers A/B testing and statistical significance determination in production.',
      ],
    },
    intuition: {
      overview: 'As you average more independent random variables together, idiosyncratic extremes cancel each other out, leaving a Gaussian distribution of sample averages.',
      steps: [
        { step: 1, title: 'Arbitrary Source Population', description: 'Start with ANY source distribution (Uniform, Exponential, Bimodal) with mean mu and finite variance sigma^2.' },
        { step: 2, title: 'Sample Drawing', description: 'Draw N independent samples {x_1, x_2, ..., x_n} and compute sample mean x_bar.' },
        { step: 3, title: 'Asymptotic Bell Curve', description: 'Repeat thousands of times. The histogram of x_bar forms a normal distribution centered at mu with variance sigma^2 / n.' },
      ],
    },
    mathematics: {
      overview: 'The Central Limit Theorem provides the asymptotic distribution of normalized sample sums.',
      foundations: [
        {
          name: 'The Central Limit Theorem (Formal Statement)',
          latex: '\\sqrt{n} \\left( \\bar{X}_n - \\mu \\right) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2) \\quad \\text{as } n \\to \\infty',
          explanation: 'The scaled difference between sample mean and true mean converges in distribution to standard normal.',
        },
        {
          name: 'Standard Error of the Mean (SE)',
          latex: '\\text{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}} \\approx \\frac{s}{\\sqrt{n}}',
          explanation: 'Standard deviation of the sample mean distribution; shrinks with the square root of n.',
        },
        {
          name: '95% Confidence Interval for Mean',
          latex: '\\text{CI}_{95\\%} = \\bar{X} \\pm 1.96 \\cdot \\frac{s}{\\sqrt{n}}',
          explanation: 'Contains true population mean in 95% of repeated sampling trials.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Variance of the Sample Mean',
      objective: 'Prove that Var(X_bar) = sigma^2 / n for n independent observations.',
      steps: [
        {
          step: 1,
          label: 'Express Sample Mean as Sum',
          latex: '\\bar{X}_n = \\frac{1}{n} \\sum_{i=1}^{n} X_i',
          explanation: 'Definition of arithmetic sample mean.',
        },
        {
          step: 2,
          label: 'Apply Variance Operator',
          latex: '\\text{Var}(\\bar{X}_n) = \\text{Var}\\left( \\frac{1}{n} \\sum_{i=1}^{n} X_i \\right) = \\frac{1}{n^2} \\text{Var}\\left( \\sum_{i=1}^{n} X_i \\right)',
          explanation: 'Constants factor out of the variance squared: Var(c X) = c^2 Var(X).',
        },
        {
          step: 3,
          label: 'Sum Independent Variances',
          latex: '= \\frac{1}{n^2} \\sum_{i=1}^{n} \\text{Var}(X_i) = \\frac{1}{n^2} (n \\sigma^2) = \\frac{\\sigma^2}{n}',
          explanation: 'Since samples are independent, covariances are zero. The result is sigma^2 / n.',
        },
      ],
    },
    variables: [
      { symbol: '\\bar{X}_n', name: 'Sample Mean', description: 'Average of n empirical observations.', dimensions: 'Scalar' },
      { symbol: 'n', name: 'Sample Size', description: 'Number of independent observations drawn in each sample.', dimensions: 'Integer ≥ 1' },
      { symbol: '\\text{SE}', name: 'Standard Error', description: 'Uncertainty of the estimated mean.', dimensions: 'Scalar > 0' },
    ],
    numericalExample: {
      scenario: 'A model test accuracy across n = 100 benchmark batches has sample mean x_bar = 85.0% and standard deviation s = 10.0%. Calculate Standard Error and 95% Confidence Interval.',
      dataset: [{ sample_size: 100, mean: 85.0, std: 10.0 }],
      calculations: [
        { step: 'Square Root of Sample Size', math: '\\sqrt{n} = \\sqrt{100}', result: '10.0' },
        { step: 'Standard Error Calculation', math: 's / \\sqrt{n} = 10.0 / 10.0', result: '1.00%' },
        { step: 'Margin of Error (95%)', math: '1.96 \\cdot \\text{SE} = 1.96 \\cdot 1.00', result: '1.96%' },
        { step: 'Lower Confidence Bound', math: '85.0 - 1.96', result: '83.04%' },
        { step: 'Upper Confidence Bound', math: '85.0 + 1.96', result: '86.96%' },
      ],
      finalConclusion: 'We can be 95% confident that the true population accuracy of the model lies within the interval [83.04%, 86.96%].',
    },
    visualExplanation: {
      title: 'Convergence of Uniform Distribution to Gaussian under Averaging',
      description: 'Start with a flat Uniform distribution [0, 1]. Averaging n=2 variables yields a triangular distribution. Averaging n=5 variables already forms a smooth bell curve. By n=30, the distribution of sample averages is indistinguishable from Gaussian.',
      features: ['n=1: Flat Uniform', 'n=2: Symmetric Triangle', 'n=30: Perfect Gaussian Bell'],
    },
    scratchCode: {
      title: 'Simulating the Central Limit Theorem in NumPy',
      explanation: 'Draw sample means from a highly skewed Exponential distribution and observe Gaussian convergence.',
      code: `import numpy as np

def simulate_clt(population_func, sample_size=30, num_experiments=5000):
    sample_means = []
    for _ in range(num_experiments):
        samples = population_func(size=sample_size)
        sample_means.append(np.mean(samples))
        
    means = np.array(sample_means)
    return {
        'mean_of_means': round(float(np.mean(means)), 4),
        'std_of_means': round(float(np.std(means)), 4),
        'theoretical_se': round(float(1.0 / np.sqrt(sample_size)), 4)
    }

# Exponential distribution with lambda = 1.0 (mean=1, std=1, highly right-skewed)
res = simulate_clt(lambda size: np.random.exponential(scale=1.0, size=size), sample_size=36)
print("CLT Simulation Results:", res)
`,
    },
    sklearnCode: {
      title: 'Bootstrapping Confidence Intervals with Scikit-Learn / SciPy',
      explanation: 'Non-parametric bootstrap estimation of metric confidence intervals without assuming normality.',
      code: `import numpy as np
from scipy.stats import bootstrap

# Model test accuracy across 50 folds
np.random.seed(42)
accuracies = np.random.normal(loc=0.85, scale=0.04, size=50)

# Resample 10,000 times
res = bootstrap((accuracies,), np.mean, confidence_level=0.95, n_resamples=5000, method='percentile')

print(f"Sample Mean: {np.mean(accuracies):.4f}")
print(f"95% Bootstrap CI: [{res.confidence_interval.low:.4f}, {res.confidence_interval.high:.4f}]")
`,
    },
    runnableCode: {
      code: `import numpy as np

# Draw 10,000 samples of size n=30 from a flat Uniform[0, 10]
np.random.seed(42)
n = 30
sample_means = [np.mean(np.random.uniform(0, 10, size=n)) for _ in range(1000)]

true_mu = 5.0
true_sigma = np.sqrt((10 - 0)**2 / 12) # ~2.8867
expected_se = true_sigma / np.sqrt(n)

print(f"True Population Mean: {true_mu:.2f}")
print(f"Empirical Mean of Means: {np.mean(sample_means):.4f}")
print(f"Theoretical Standard Error: {expected_se:.4f}")
print(f"Empirical Std Dev of Means: {np.std(sample_means):.4f}")
`,
      expectedOutput: `True Population Mean: 5.00\nEmpirical Mean of Means: 5.0041\nTheoretical Standard Error: 0.5270\nEmpirical Std Dev of Means: 0.5312`,
    },
    lineByLineExplanation: [
      { lines: 'Line 6', codeSnippet: 'sample_means = [np.mean(...) for _ in range(1000)]', explanation: 'Generates 1,000 independent sample means from non-Gaussian uniform data.' },
      { lines: 'Line 9', codeSnippet: 'expected_se = true_sigma / np.sqrt(n)', explanation: 'Calculates theoretical standard error using CLT formula sigma / sqrt(n).' },
      { lines: 'Line 14', codeSnippet: 'print(np.std(sample_means))', explanation: 'Demonstrates exact agreement between empirical dispersion and theoretical SE.' },
    ],
    hyperparameters: [
      { name: 'sample_size (n)', defaultVal: '30', range: '[10, 10000]', effect: 'Governs how closely the sample mean distribution matches Gaussian.', recommendation: 'Rule of thumb: n >= 30 is sufficient for moderate skewness; heavy-tailed data requires n >= 100.' },
    ],
    assumptions: [
      { assumption: 'Independent and Identically Distributed (i.i.d.)', whyItMatters: 'If samples are correlated (e.g. time series), variance does not shrink at 1/n rate.', howToVerify: 'Verify random sampling without temporal autocorrelation.' },
    ],
    commonMistakes: [
      { mistake: 'Confusing standard deviation (sigma) with standard error (SE)', solution: 'Standard deviation describes the spread of individual raw data points. Standard error describes the uncertainty of the calculated sample mean.' },
    ],
    realWorldUseCases: [
      { industry: 'A/B Testing & Product Analytics', application: 'Conversion Rate Significance Testing', benefit: 'CLT allows computing z-scores and p-values to determine if a 1.2% lift in checkout conversion is statistically significant or random noise.' },
    ],
    practiceQuestions: [
      { id: 'pq-13', question: 'If you want to cut the standard error of your model evaluation estimate in half, how much larger must your test set be?', hint: 'Recall SE = sigma / sqrt(n).', answer: 'You must increase the sample size by a factor of 4: sqrt(4n) = 2 sqrt(n), which halves the standard error.' },
    ],
    quiz: [
      {
        id: 'quiz-math-13',
        question: 'Under the Central Limit Theorem, what happens to the standard error of the sample mean as sample size n approaches infinity?',
        options: ['It approaches 1.0.', 'It approaches infinity.', 'It approaches 0.0.', 'It equals the population standard deviation.'],
        correctIndex: 2,
        explanation: 'Because SE = sigma / sqrt(n), as n -> infinity, the denominator grows unbounded, shrinking the standard error to 0.0 (the Law of Large Numbers).' },
    ],
    independentExercise: {
      title: 'Compute 95% Confidence Interval for Classification Accuracy',
      problem: 'Write a function accuracy_confidence_interval(correct_count, total_count) that uses the normal approximation to the binomial distribution to return (low, high) bounds.',
      hints: ['p = correct / total', 'SE = sqrt(p * (1 - p) / total)', 'CI = (p - 1.96*SE, p + 1.96*SE)'],
      starterCode: `import numpy as np

def accuracy_confidence_interval(correct: int, total: int):
    # TODO: return (ci_low, ci_high)
    return 0.0, 1.0

low, high = accuracy_confidence_interval(850, 1000)
print(f"95% CI: [{low:.4f}, {high:.4f}]")
`,
      solution: `import numpy as np

def accuracy_confidence_interval(correct: int, total: int):
    p = correct / total
    se = np.sqrt(p * (1.0 - p) / total)
    ci_low = max(0.0, p - 1.96 * se)
    ci_high = min(1.0, p + 1.96 * se)
    return round(ci_low, 4), round(ci_high, 4)

low, high = accuracy_confidence_interval(850, 1000)
print(f"95% CI: [{low:.4f}, {high:.4f}]")
`,
    },
    summary: {
      keyTakeaways: [
        'The Central Limit Theorem guarantees that sample means converge to a normal distribution regardless of population shape.',
        'Standard error measures estimation uncertainty and shrinks at rate 1 / sqrt(n).',
        'Confidence intervals quantify statistical certainty in model evaluation benchmarks.',
      ],
      nextLessonId: 'mle-map-estimation',
      nextLessonTitle: 'Maximum Likelihood (MLE) & MAP Estimation',
      nextLessonModuleId: 'module-1',
    },
  },

  'mle-map-estimation': {
    id: 'mle-map-estimation',
    moduleId: 'module-1',
    title: 'Maximum Likelihood (MLE) & MAP Estimation',
    subtitle: 'Frequentist Log-Likelihood vs Bayesian Priors: The Bridge to Regularization',
    order: 14,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Formulate Maximum Likelihood Estimation (MLE) and explain why we maximize log-likelihood.',
      'Derive how Maximum A Posteriori (MAP) with a Gaussian prior is mathematically equivalent to L2 (Ridge) regularization.',
      'Derive how MAP with a Laplace prior is mathematically equivalent to L1 (Lasso) regularization.',
    ],
    prerequisites: ['probability-bayes-theorem', 'gradients-jacobian-hessian'],
    analogy: {
      title: 'The Criminal Investigation: Evidence vs Prior Record',
      text: 'MLE is like a jury that is legally forbidden from knowing the suspect\'s criminal history: they evaluate purely who is most likely to have committed the crime based strictly on the fingerprints found at the scene (maximizing data likelihood alone). MAP estimation is a seasoned detective who considers BOTH the fingerprints at the scene AND the prior criminal history. If the evidence is sparse, the detective relies on prior probability; if the physical evidence is overwhelming, it dominates the prior.',
      metaphor: 'MLE fits purely to observed data; MAP balances data fitting with prior expectations (regularization).',
    },
    problemSolved: {
      title: 'Unifying Loss Functions and Regularization Under Probability',
      description: 'Why do we minimize squared error in linear regression? Why do we add L2 weight decay penalties? MLE and MAP prove that these standard loss formulations are not arbitrary heuristic tricks—they are the exact optimal solutions under Gaussian noise and Gaussian priors.',
      keyPoints: [
        'Connects machine learning loss minimization directly to probability theory.',
        'Explains why L2 penalty is a Gaussian prior and L1 penalty is a Laplace prior.',
        'Provides principled parameter estimation across all statistical models.',
      ],
    },
    intuition: {
      overview: 'MLE asks: "What parameter theta makes the observed data most probable?" MAP asks: "What parameter theta is most probable given BOTH the observed data and our prior belief?"',
      steps: [
        { step: 1, title: 'Likelihood Function L(theta)', description: 'Product of sample probabilities: prod_{i=1}^N p(x_i | theta).' },
        { step: 2, title: 'Negative Log-Likelihood (NLL)', description: 'Taking -log converts products into sums and converts maximization into loss minimization.' },
        { step: 3, title: 'Bayesian MAP Formulation', description: 'Multiply likelihood by prior P(theta): argmax [log p(D|theta) + log p(theta)].' },
      ],
    },
    mathematics: {
      overview: 'Rigorous mathematical formulation connecting probability estimation to objective functions.',
      foundations: [
        {
          name: 'Maximum Likelihood Estimation (MLE)',
          latex: '\\theta_{\\text{MLE}} = \\arg\\max_\\theta \\sum_{i=1}^N \\log p(x_i | \\theta) = \\arg\\min_\\theta -\\sum_{i=1}^N \\log p(x_i | \\theta)',
          explanation: 'Finds parameters maximizing probability of observing training dataset.',
        },
        {
          name: 'Maximum A Posteriori (MAP)',
          latex: '\\theta_{\\text{MAP}} = \\arg\\max_\\theta \\left[ \\sum_{i=1}^N \\log p(x_i | \\theta) + \\log p(\\theta) \\right]',
          explanation: 'Includes prior log p(theta) which acts as a structural penalty.',
        },
        {
          name: 'Gaussian Prior = L2 Regularization',
          latex: 'p(\\mathbf{w}) = \\mathcal{N}(0, \\sigma_0^2 I) \\implies \\log p(\\mathbf{w}) = -\\frac{1}{2\\sigma_0^2} \\|\\mathbf{w}\\|_2^2 + C',
          explanation: 'A zero-mean Gaussian prior mathematically generates the Ridge L2 regularization penalty.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Least Squares from Gaussian MLE',
      objective: 'Prove that maximizing likelihood under Gaussian noise is identical to Ordinary Least Squares.',
      steps: [
        {
          step: 1,
          label: 'Gaussian Noise Assumption',
          latex: 'y_i = \\mathbf{w}^T \\mathbf{x}_i + \\epsilon_i, \\quad \\epsilon_i \\sim \\mathcal{N}(0, \\sigma^2) \\implies y_i | \\mathbf{x}_i \\sim \\mathcal{N}(\\mathbf{w}^T \\mathbf{x}_i, \\sigma^2)',
          explanation: 'Each target is normally distributed around the linear model prediction.',
        },
        {
          step: 2,
          label: 'Formulate Joint Log-Likelihood',
          latex: '\\log p(y | X, \\mathbf{w}) = \\sum_{i=1}^N \\log \\left[ \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\left( -\\frac{(y_i - \\mathbf{w}^T \\mathbf{x}_i)^2}{2\\sigma^2} \\right) \\right]',
          explanation: 'Product of independent sample densities converted to sum by logarithm.',
        },
        {
          step: 3,
          label: 'Simplify and Minimize Negative Log-Likelihood',
          latex: '= -N \\log(\\sigma \\sqrt{2\\pi}) - \\frac{1}{2\\sigma^2} \\sum_{i=1}^N (y_i - \\mathbf{w}^T \\mathbf{x}_i)^2 \\implies \\arg\\min_\\mathbf{w} \\sum_{i=1}^N (y_i - \\mathbf{w}^T \\mathbf{x}_i)^2',
          explanation: 'Constants drop out, leaving exact Ordinary Least Squares (SSE) minimization!',
        },
      ],
    },
    variables: [
      { symbol: '\\theta', name: 'Model Parameters', description: 'Weights to be estimated from data.', dimensions: 'd × 1' },
      { symbol: 'p(D|\\theta)', name: 'Likelihood', description: 'Probability of observing dataset D given parameters.', dimensions: 'Scalar [0, 1]' },
      { symbol: 'p(\\theta)', name: 'Parameter Prior', description: 'Prior probability distribution over parameter space.', dimensions: 'Probability Density' },
    ],
    numericalExample: {
      scenario: 'Given 5 coin tosses with 4 Heads and 1 Tail. Compute the MLE estimate for probability of heads p, and compare with MAP estimate using Beta(3, 3) prior.',
      dataset: [{ heads: 4, tails: 1 }],
      calculations: [
        { step: 'MLE Estimate', math: 'p_{\\text{MLE}} = \\text{Heads} / \\text{Total} = 4 / 5', result: 'p = 0.8000' },
        { step: 'Beta Prior Parameters', math: '\\alpha = 3, \\beta = 3 \\text{ (Equivalent to 2 prior Heads, 2 prior Tails)}', result: 'alpha=3, beta=3' },
        { step: 'MAP Estimate Formula', math: 'p_{\\text{MAP}} = \\frac{H + \\alpha - 1}{(H + T) + \\alpha + \\beta - 2} = \\frac{4 + 3 - 1}{5 + 3 + 3 - 2}', result: '6 / 9' },
        { step: 'Evaluate MAP', math: '6.0 / 9.0', result: 'p = 0.6667' },
      ],
      finalConclusion: 'MLE overfits to the small sample, predicting 80% heads. MAP pulls the estimate toward the fair prior (0.5), yielding a more realistic 66.7%.',
    },
    visualExplanation: {
      title: 'MLE vs MAP as Tug-of-War between Data and Prior',
      description: 'The MAP objective is the sum of two curves: the data log-likelihood curve and the prior log-density curve. The MAP estimate sits at the peak of the combined curve, balancing empirical fit with prior shrinkage.',
      features: ['Small dataset: Prior dominates (strong regularization)', 'Huge dataset: Likelihood dominates (MAP converges to MLE)', 'Peak location: argmax of sum'],
    },
    scratchCode: {
      title: 'MLE vs MAP Estimation in Python',
      explanation: 'Numerical optimization of negative log-likelihood with and without L2 prior.',
      code: `import numpy as np
from scipy.optimize import minimize

# True parameters: w = 2.5
np.random.seed(42)
X = np.random.randn(5, 1)
y = 2.5 * X.squeeze() + np.random.randn(5) * 0.5

# Negative Log-Likelihood (MLE)
def nll_mle(w):
    preds = X.squeeze() * w
    return np.sum((y - preds) ** 2)

# Negative Log-Posterior with Gaussian prior sigma_0 = 1.0 (MAP / Ridge)
def nll_map(w, l2_lambda=1.0):
    return nll_mle(w) + l2_lambda * (w ** 2)

w_mle = minimize(nll_mle, x0=[0.0]).x[0]
w_map = minimize(nll_map, x0=[0.0]).x[0]

print(f"MLE Estimate (Data only): {w_mle:.4f}")
print(f"MAP Estimate (Data + L2 prior): {w_map:.4f} (Shrunk toward zero)")
`,
    },
    sklearnCode: {
      title: 'LinearRegression (MLE) vs Ridge (MAP) in Scikit-Learn',
      explanation: 'Scikit-learn LinearRegression is Gaussian MLE; Ridge is Gaussian MAP.',
      code: `import numpy as np
from sklearn.linear_model import LinearRegression, Ridge

np.random.seed(42)
X = np.random.randn(10, 3)
y = X @ np.array([3.0, -2.0, 0.5]) + np.random.randn(10) * 0.2

# MLE: no prior
mle_model = LinearRegression(fit_intercept=False).fit(X, y)
# MAP: Gaussian prior (alpha = 1.0)
map_model = Ridge(alpha=1.0, fit_intercept=False).fit(X, y)

print("MLE weights: ", np.round(mle_model.coef_, 4))
print("MAP (Ridge): ", np.round(map_model.coef_, 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

# Coin toss example: 4 Heads, 1 Tail
H, T = 4, 1
p_mle = H / (H + T)

# Prior: Beta(3, 3) -> prior expectation 0.5
alpha_prior, beta_prior = 3, 3
p_map = (H + alpha_prior - 1) / (H + T + alpha_prior + beta_prior - 2)

print(f"Observed: {H} Heads, {T} Tails")
print(f"MLE Estimate: {p_mle:.4f} (Overfits to sample)")
print(f"MAP Estimate: {p_map:.4f} (Regularized by prior)")
`,
      expectedOutput: `Observed: 4 Heads, 1 Tails\nMLE Estimate: 0.8000 (Overfits to sample)\nMAP Estimate: 0.6667 (Regularized by prior)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 5', codeSnippet: 'p_mle = H / (H + T)', explanation: 'Calculates the Maximum Likelihood Estimate (pure sample proportion).' },
      { lines: 'Line 9', codeSnippet: 'p_map = (H + alpha_prior - 1) / ...', explanation: 'Calculates the mode of the posterior Beta distribution incorporating prior pseudo-counts.' },
    ],
    hyperparameters: [
      { name: 'prior_variance (sigma_0^2)', defaultVal: '1.0', range: '(0, inf)', effect: 'Inversely proportional to regularization strength lambda = sigma^2 / sigma_0^2.', recommendation: 'Smaller prior variance imposes stronger shrinkage toward zero.' },
    ],
    assumptions: [
      { assumption: 'Gaussian Noise Assumption', whyItMatters: 'Least squares is ONLY the optimal MLE if the noise follows a normal distribution with equal variance.', howToVerify: 'Inspect residual plots for normality.' },
    ],
    commonMistakes: [
      { mistake: 'Believing that L1 and L2 regularization are arbitrary mathematical hacks', solution: 'They are provably optimal Bayesian MAP estimators under Laplace and Gaussian priors respectively.' },
    ],
    realWorldUseCases: [
      { industry: 'Clinical Trials / Drug Discovery', application: 'Small Cohort Efficacy Estimation', benefit: 'When testing a new drug on only 12 patients, MAP estimation uses historical trial priors to prevent wild overestimation of efficacy.' },
    ],
    practiceQuestions: [
      { id: 'pq-14', question: 'What happens to the MAP estimate as the number of training samples N approaches infinity?', hint: 'Consider the scale of the log-likelihood sum versus the single prior term.', answer: 'The log-likelihood sum grows linearly with N, while the prior log p(theta) remains constant. As N -> infinity, the data completely overwhelms the prior, and theta_MAP converges exactly to theta_MLE.' },
    ],
    quiz: [
      {
        id: 'quiz-math-14',
        question: 'Maximum A Posteriori (MAP) estimation with a zero-mean Laplace prior on weights p(w) proportional to exp(-|w| / b) corresponds to which regularization technique?',
        options: ['Ridge Regression (L2)', 'Lasso Regression (L1)', 'Elastic Net', 'Early Stopping'],
        correctIndex: 1,
        explanation: 'Taking the negative logarithm of the Laplace prior exp(-|w|/b) yields the sum of absolute values |w|, which is mathematically identical to L1 (Lasso) regularization.',
      },
    ],
    independentExercise: {
      title: 'Derive Normal Equation with L2 MAP Prior',
      problem: 'Write a function ridge_normal_equation(X, y, l2_lambda) that computes the MAP analytical solution w_MAP = (X^T X + l2_lambda * I)^(-1) X^T y.',
      hints: ['Construct identity matrix np.eye(X.shape[1])', 'Solve (X.T @ X + l2_lambda * I) w = X.T @ y using np.linalg.solve'],
      starterCode: `import numpy as np

def ridge_normal_equation(X: np.ndarray, y: np.ndarray, l2_lambda: float) -> np.ndarray:
    # TODO: solve regularized normal equation
    return np.zeros(X.shape[1])

X = np.array([[1.0, 2.0], [2.0, 4.0]]) # Singular
y = np.array([5.0, 10.0])
print("Ridge MAP weights:", ridge_normal_equation(X, y, l2_lambda=0.5))
`,
      solution: `import numpy as np

def ridge_normal_equation(X: np.ndarray, y: np.ndarray, l2_lambda: float) -> np.ndarray:
    d = X.shape[1]
    A = X.T @ X + l2_lambda * np.eye(d)
    b = X.T @ y
    return np.linalg.solve(A, b)

X = np.array([[1.0, 2.0], [2.0, 4.0]])
y = np.array([5.0, 10.0])
print("Ridge MAP weights:", np.round(ridge_normal_equation(X, y, l2_lambda=0.5), 4))
`,
    },
    summary: {
      keyTakeaways: [
        'MLE finds parameters that make observed data most likely: argmin NLL.',
        'MAP incorporates prior beliefs: argmax [log p(D|w) + log p(w)].',
        'Ordinary Least Squares is Gaussian MLE; Ridge is Gaussian MAP; Lasso is Laplace MAP.',
      ],
      nextLessonId: 'entropy-cross-entropy-kl-divergence',
      nextLessonTitle: 'Entropy, Cross-Entropy, and KL Divergence',
      nextLessonModuleId: 'module-1',
    },
  },

  'entropy-cross-entropy-kl-divergence': {
    id: 'entropy-cross-entropy-kl-divergence',
    moduleId: 'module-1',
    title: 'Entropy, Cross-Entropy, and KL Divergence',
    subtitle: 'Information Theory Foundations, Surprise, Relative Entropy & Classification Loss',
    order: 15,
    readTimeMinutes: 25,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Define self-information I(x) = -log2(p(x)) and Shannon entropy H(P).',
      'Explain how Cross-Entropy H(P, Q) is derived and why it serves as the standard classification loss.',
      'Compute Kullback-Leibler (KL) divergence D_KL(P || Q) as relative entropy and verify Gibbs\' inequality.',
    ],
    prerequisites: ['probability-distributions', 'derivatives-chain-rule'],
    analogy: {
      title: 'The Weather Forecast and 20 Questions',
      text: 'Imagine playing "20 Questions" to guess tomorrow\'s weather in the Sahara Desert, where it is sunny 99% of the time. You need almost zero questions—you already know it\'s sunny (near-zero entropy). But in Melbourne, where weather changes randomly every 15 minutes, you need many questions to pinpoint the weather (high entropy / high uncertainty). Shannon entropy measures the average number of yes/no questions (bits) required to encode an outcome.',
      metaphor: 'Entropy is the measure of pure surprise and uncertainty in an information source.',
    },
    problemSolved: {
      title: 'Measuring Discrepancy Between Predicted and True Probability Distributions',
      description: 'In classification tasks, neural networks output a predicted probability distribution Q = [q_1, ..., q_k] over classes, while the ground truth is a one-hot distribution P = [0, 1, ..., 0]. Cross-entropy measures the exact statistical discrepancy between Q and P.',
      keyPoints: [
        'Provides a steep, non-saturating gradient for classification compared to Mean Squared Error.',
        'Connects communication theory (bits, compression) directly to machine learning loss functions.',
        'KL divergence powers Variational Autoencoders (VAEs) and policy optimization in RL (TRPO/PPO).',
      ],
    },
    intuition: {
      overview: 'Rare events carry high information (high surprise); certain events carry zero information. Entropy is expected surprise.',
      steps: [
        { step: 1, title: 'Self-Information (Surprise)', description: 'I(x) = -log2(p(x)). If an event has probability 1, surprise is 0. If probability is 0.001, surprise is huge.' },
        { step: 2, title: 'Shannon Entropy H(P)', description: 'Average surprise across all possible outcomes: -sum p(x) log2 p(x).' },
        { step: 3, title: 'Cross-Entropy H(P, Q)', description: 'Average code length when true distribution is P, but we encode using model Q: -sum p(x) log q(x).' },
        { step: 4, title: 'KL Divergence D_KL(P || Q)', description: 'The excess bits wasted by using distribution Q instead of true P: H(P, Q) - H(P).' },
      ],
    },
    mathematics: {
      overview: 'Information theory was founded by Claude Shannon in 1948, establishing the fundamental limits of compression and communication.',
      foundations: [
        {
          name: 'Shannon Entropy',
          latex: 'H(P) = -\\sum_{x \\in \\mathcal{X}} P(x) \\log_2 P(x) = \\mathbb{E}_{x \\sim P}[-\\log_2 P(x)]',
          explanation: 'Measures intrinsic uncertainty in distribution P (in bits if log2, in nats if ln).',
        },
        {
          name: 'Cross-Entropy Loss',
          latex: 'H(P, Q) = -\\sum_{x} P(x) \\log Q(x) = H(P) + D_{\\text{KL}}(P \\parallel Q)',
          explanation: 'Since true distribution P is constant, minimizing Cross-Entropy is IDENTICAL to minimizing KL divergence.',
        },
        {
          name: 'Kullback-Leibler (KL) Divergence',
          latex: 'D_{\\text{KL}}(P \\parallel Q) = \\sum_{x} P(x) \\log \\left( \\frac{P(x)}{Q(x)} \\right) \\ge 0',
          explanation: 'Relative entropy measuring divergence of Q from P. Always >= 0 (Gibbs\' inequality); equals 0 iff P = Q.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Gibbs\' Inequality: D_KL(P || Q) >= 0',
      objective: 'Prove that KL divergence is non-negative and zero if and only if distributions are identical.',
      steps: [
        {
          step: 1,
          label: 'Apply Logarithm Property',
          latex: '-D_{\\text{KL}}(P \\parallel Q) = -\\sum_{x} P(x) \\log\\left( \\frac{P(x)}{Q(x)} \\right) = \\sum_{x} P(x) \\log\\left( \\frac{Q(x)}{P(x)} \\right)',
          explanation: 'Invert the ratio inside the logarithm.',
        },
        {
          step: 2,
          label: 'Apply Jensen\'s Inequality on Strictly Concave Function',
          latex: '\\sum_{x} P(x) \\log\\left( \\frac{Q(x)}{P(x)} \\right) \\le \\log \\left( \\sum_{x} P(x) \\frac{Q(x)}{P(x)} \\right) = \\log \\left( \\sum_{x} Q(x) \\right)',
          explanation: 'Because log(t) is concave, E[log(Z)] <= log(E[Z]).',
        },
        {
          step: 3,
          label: 'Evaluate the Sum of Valid Probabilities',
          latex: '\\log \\left( \\sum_{x} Q(x) \\right) = \\log(1) = 0 \\implies -D_{\\text{KL}}(P \\parallel Q) \\le 0 \\implies D_{\\text{KL}}(P \\parallel Q) \\ge 0',
          explanation: 'Proves KL divergence can never be negative.',
        },
      ],
    },
    variables: [
      { symbol: 'H(P)', name: 'Shannon Entropy', description: 'Average bits needed to encode outcomes from P.', dimensions: 'Scalar ≥ 0' },
      { symbol: 'H(P, Q)', name: 'Cross-Entropy', description: 'Average bits needed using model distribution Q to encode true P.', dimensions: 'Scalar ≥ 0' },
      { symbol: 'D_{\\text{KL}}(P \\parallel Q)', name: 'KL Divergence', description: 'Asymmetric relative entropy from Q to P.', dimensions: 'Scalar ≥ 0' },
    ],
    numericalExample: {
      scenario: 'Given true binary target P = [1.0, 0.0] (Class 0) and model prediction Q = [0.8, 0.2]. Compute H(P), H(P, Q), and D_KL(P || Q) using natural logs (nats).',
      dataset: [{ p0: 1.0, p1: 0.0, q0: 0.8, q1: 0.2 }],
      calculations: [
        { step: 'Entropy H(P)', math: '-(1.0 \\ln(1.0) + 0 \\ln(0)) = -(0 + 0)', result: '0.00 nats (Certain event)' },
        { step: 'Cross-Entropy H(P, Q)', math: '-(1.0 \\ln(0.8) + 0.0 \\ln(0.2)) = -\\ln(0.8) = -(-0.2231)', result: '0.2231 nats' },
        { step: 'KL Divergence Calculation', math: 'D_{\\text{KL}} = H(P, Q) - H(P) = 0.2231 - 0.0', result: '0.2231 nats' },
        { step: 'Direct KL formula check', math: '1.0 \\ln(1.0 / 0.8) = \\ln(1.25)', result: '0.2231 nats' },
      ],
      finalConclusion: 'The cross-entropy loss is exactly 0.2231 nats. Because the true distribution is a deterministic one-hot label with H(P) = 0, Cross-Entropy equals KL Divergence exactly.',
    },
    visualExplanation: {
      title: 'Entropy of a Bernoulli Distribution vs Probability p',
      description: 'The entropy curve of a binary coin toss is a symmetric inverted bowl. It is zero at p = 0 (always tails, zero surprise) and p = 1 (always heads, zero surprise). It peaks at exactly p = 0.5 with maximum entropy of 1.0 bit (maximum uncertainty).',
      features: ['p=0: 0 bits', 'p=0.5: 1.0 bit (maximum)', 'p=1: 0 bits'],
    },
    scratchCode: {
      title: 'Information Theoretic Metrics in Pure Python',
      explanation: 'Compute entropy, cross-entropy, and KL divergence from scratch.',
      code: `import numpy as np

def compute_info_metrics(p: np.ndarray, q: np.ndarray, eps: float = 1e-15):
    """Computes Shannon Entropy, Cross-Entropy, and KL Divergence."""
    # Clip to avoid log(0)
    p = np.clip(p, eps, 1.0)
    q = np.clip(q, eps, 1.0)
    p = p / np.sum(p)
    q = q / np.sum(q)
    
    entropy_p = -float(np.sum(p * np.log(p)))
    cross_entropy = -float(np.sum(p * np.log(q)))
    kl_divergence = float(np.sum(p * np.log(p / q)))
    
    return {
        'H(P)': round(entropy_p, 4),
        'H(P, Q)': round(cross_entropy, 4),
        'KL(P || Q)': round(kl_divergence, 4),
        'Identity Check': round(cross_entropy - (entropy_p + kl_divergence), 6)
    }

P = np.array([1.0, 0.0]) # True class 0
Q = np.array([0.8, 0.2]) # Model prediction
print("Information metrics:", compute_info_metrics(P, Q))
`,
    },
    sklearnCode: {
      title: 'Log Loss in Scikit-Learn',
      explanation: 'Scikit-learn log_loss computes cross-entropy across binary or multiclass predictions.',
      code: `import numpy as np
from sklearn.metrics import log_loss

# Ground truth labels (one-hot or binary)
y_true = [0, 1]
# Predicted probabilities for class 1
y_pred_probs = [[0.8, 0.2], [0.1, 0.9]]

loss = log_loss(y_true, y_pred_probs)
print(f"Scikit-learn Log Loss (Cross-Entropy): {loss:.4f}")
`,
    },
    runnableCode: {
      code: `import numpy as np

# Ground truth one-hot: class 0
p = np.array([1.0, 0.0])
# Predictions
q_good = np.array([0.9, 0.1])
q_bad = np.array([0.2, 0.8])

ce_good = -np.sum(p * np.log(q_good))
ce_bad = -np.sum(p * np.log(q_bad))

print(f"Cross-Entropy (Confident & Correct): {ce_good:.4f}")
print(f"Cross-Entropy (Confident & Wrong):   {ce_bad:.4f}")
print("Notice how cross-entropy severely penalizes confident mistakes!")
`,
      expectedOutput: `Cross-Entropy (Confident & Correct): 0.1054\nCross-Entropy (Confident & Wrong):   1.6094\nNotice how cross-entropy severely penalizes confident mistakes!`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-6', codeSnippet: 'p = [1.0, 0.0]; q_good = [0.9, 0.1]; q_bad = [0.2, 0.8]', explanation: 'Sets up ground truth and contrasting model prediction distributions.' },
      { lines: 'Lines 8-9', codeSnippet: 'ce = -np.sum(p * np.log(q))', explanation: 'Evaluates categorical cross-entropy loss.' },
      { lines: 'Line 12', codeSnippet: 'print(ce_bad)', explanation: 'Shows that predicting 0.2 for the true class generates a heavy penalty (1.6094 vs 0.1054).' },
    ],
    hyperparameters: [
      { name: 'label_smoothing', defaultVal: '0.0', range: '[0.0, 0.2]', effect: 'Replaces hard 0/1 one-hot labels with smoothed probabilities (e.g. 0.05 / 0.95) to prevent overconfident infinite logits.', recommendation: 'Use label_smoothing=0.1 on large deep learning classifiers to improve generalization.' },
    ],
    assumptions: [
      { assumption: 'Support Matching (Q(x) > 0 wherever P(x) > 0)', whyItMatters: 'If Q(x) = 0 for any event where P(x) > 0, the log term log(0) explodes to -infinity (infinite KL divergence).', howToVerify: 'Apply epsilon clipping (e.g. 1e-15) before taking logarithms.' },
    ],
    commonMistakes: [
      { mistake: 'Assuming KL divergence is symmetric: D_KL(P || Q) == D_KL(Q || P)', solution: 'KL divergence is NOT a true distance metric because it is asymmetric. D_KL(P || Q) != D_KL(Q || P). Use Jensen-Shannon divergence if symmetry is required.' },
    ],
    realWorldUseCases: [
      { industry: 'Generative AI / Deep Learning', application: 'Variational Autoencoders (VAEs)', benefit: 'VAEs use KL divergence as a regularization term in the loss to force the learned latent distribution to match a standard Gaussian N(0, I).' },
    ],
    practiceQuestions: [
      { id: 'pq-15', question: 'Why is Cross-Entropy preferred over Mean Squared Error (MSE) for training classification neural networks?', hint: 'Consider the derivative of sigmoid combined with MSE versus Cross-Entropy.', answer: 'When using MSE with sigmoid activations, predictions that are confidently wrong cause sigmoid saturation where the derivative approaches zero, causing vanishing gradients and stalling training. Cross-Entropy perfectly cancels out the sigmoid derivative, producing a gradient (y_hat - y) directly proportional to error with no stall.' },
    ],
    quiz: [
      {
        id: 'quiz-math-15',
        question: 'What is the Shannon entropy of a completely fair 8-sided die where each face has probability 1/8?',
        options: ['1 bit', '2 bits', '3 bits', '8 bits'],
        correctIndex: 2,
        explanation: 'H(P) = -sum_{i=1}^8 (1/8) log2(1/8) = -8 * (1/8) * (-3) = 3 bits. You need exactly 3 binary questions (2^3 = 8) to identify the die roll.',
      },
    ],
    independentExercise: {
      title: 'Implement Symmetric Jensen-Shannon Divergence',
      problem: 'Write a function jensen_shannon_divergence(P, Q) that computes the symmetric JS divergence: JSD(P || Q) = 0.5 * D_KL(P || M) + 0.5 * D_KL(Q || M), where M = 0.5 * (P + Q).',
      hints: ['Compute M = 0.5 * (P + Q)', 'Use np.sum(P * np.log(P / M)) for KL terms'],
      starterCode: `import numpy as np

def jensen_shannon_divergence(P: np.ndarray, Q: np.ndarray) -> float:
    # TODO: return JSD(P || Q)
    return 0.0

P = np.array([0.5, 0.5])
Q = np.array([0.9, 0.1])
print("JSD(P || Q):", round(jensen_shannon_divergence(P, Q), 4))
print("JSD(Q || P):", round(jensen_shannon_divergence(Q, P), 4)) # Must match!
`,
      solution: `import numpy as np

def kl_div(P, Q, eps=1e-15):
    P = np.clip(P, eps, 1.0); P /= np.sum(P)
    Q = np.clip(Q, eps, 1.0); Q /= np.sum(Q)
    return float(np.sum(P * np.log(P / Q)))

def jensen_shannon_divergence(P: np.ndarray, Q: np.ndarray) -> float:
    M = 0.5 * (P + Q)
    return 0.5 * kl_div(P, M) + 0.5 * kl_div(Q, M)

P = np.array([0.5, 0.5])
Q = np.array([0.9, 0.1])
print("JSD(P || Q):", round(jensen_shannon_divergence(P, Q), 4))
print("JSD(Q || P):", round(jensen_shannon_divergence(Q, P), 4))
`,
    },
    summary: {
      keyTakeaways: [
        'Shannon entropy measures the average surprise and minimum code length in bits.',
        'Cross-entropy evaluates the cost of encoding true distribution P using model predictions Q.',
        'KL divergence measures relative entropy; minimizing cross-entropy is mathematically identical to minimizing KL divergence.',
      ],
      nextLessonId: 'eda-inspection',
      nextLessonTitle: 'Data Inspection & Exploratory Data Analysis (EDA)',
      nextLessonModuleId: 'module-2',
    },
  },
};
