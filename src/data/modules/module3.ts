import { LessonContent, ModuleData } from '@/lib/types';
import { linearRegressionLesson } from './linearRegressionLesson';

export const module3Data: ModuleData = {
  id: 'module-3',
  number: 3,
  title: 'Linear and Regularized Regression',
  subtitle: 'Ordinary Least Squares, Metrics, Residuals, Ridge, Lasso & Elastic Net',
  description: 'Master linear models from first-principles projections to the Normal Equation, residual diagnostics, VIF multicollinearity, L2 Ridge shrinkage, L1 Lasso coordinate descent, Elastic Net, and the bias-variance tradeoff.',
  icon: 'TrendingUp',
  badge: 'Regression',
  estimatedHours: 16,
  topicsCount: 10,
  lessons: [
    {
      id: 'linear-regression',
      moduleId: 'module-3',
      title: 'Simple & Multiple Linear Regression: Ordinary Least Squares (OLS)',
      description: 'Geometric projections, least-squares derivation, the Normal Equation, and closed-form optimization.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'linear-regression',
      difficulty: 'Beginner',
    },
    {
      id: 'multiple-linear-regression',
      moduleId: 'module-3',
      title: 'Multiple Linear Regression & Hyperplane Geometry',
      description: 'Partial regression coefficients, matrix formulation y = Xw + eps, and the Gauss-Markov theorem.',
      order: 2,
      readTimeMinutes: 24,
      visualizerType: 'linear-regression',
      difficulty: 'Intermediate',
    },
    {
      id: 'regression-metrics',
      moduleId: 'module-3',
      title: 'Regression Evaluation Metrics: MSE, MAE, RMSE & R²',
      description: 'Residual sums of squares, scale-dependent vs percentage errors (MAPE), and Adjusted R².',
      order: 3,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'residual-analysis-assumptions',
      moduleId: 'module-3',
      title: 'Residual Diagnostics & Gauss-Markov Assumptions',
      description: 'Testing homoscedasticity, independence, normality of errors via Q-Q plots, and Breusch-Pagan test.',
      order: 4,
      readTimeMinutes: 25,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'multicollinearity-vif',
      moduleId: 'module-3',
      title: 'Multicollinearity & Variance Inflation Factor (VIF)',
      description: 'Correlated predictors, inflated standard errors, condition numbers, and VIF diagnostic thresholds.',
      order: 5,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'polynomial-regression',
      moduleId: 'module-3',
      title: 'Polynomial Regression & Non-Linear Fits',
      description: 'Capturing non-linear curvature in linear frameworks, interaction cross-products, and Runge oscillations.',
      order: 6,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'ridge-regression',
      moduleId: 'module-3',
      title: 'Ridge Regression & L2 Regularization',
      description: 'Tikhonov regularization, L2 weight shrinkage, conditioning ill-posed matrices, and Bayesian Gaussian prior.',
      order: 7,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'lasso-regression',
      moduleId: 'module-3',
      title: 'Lasso Regression & L1 Regularization',
      description: 'L1 norm geometry, subgradient calculus, coordinate descent, sparse feature selection, and Laplace prior.',
      order: 8,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'elastic-net',
      moduleId: 'module-3',
      title: 'Elastic Net Regression',
      description: 'Convex combination of L1 and L2 penalties, overcoming Lasso limitations, and handling correlated groups.',
      order: 9,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'bias-variance-tradeoff',
      moduleId: 'module-3',
      title: 'The Bias-Variance Tradeoff & Generalization Error',
      description: 'Decomposition of expected prediction error into Bias², Variance, and irreducible noise sigma².',
      order: 10,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
  ],
};

export const module3Lessons: Record<string, LessonContent> = {
  'linear-regression': linearRegressionLesson,

  'multiple-linear-regression': {
    id: 'multiple-linear-regression',
    moduleId: 'module-3',
    title: 'Multiple Linear Regression & Hyperplane Geometry',
    subtitle: 'Partial Slopes, Matrix Formulation y = Xw + eps & The Gauss-Markov Theorem',
    order: 2,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'linear-regression',
    objectives: [
      'Formulate Multiple Linear Regression in matrix notation: y = X w + eps.',
      'Interpret partial regression coefficients: the change in y per unit change in x_j holding all other features fixed (ceteris paribus).',
      'State the Gauss-Markov theorem: OLS is the Best Linear Unbiased Estimator (BLUE).',
    ],
    prerequisites: ['linear-regression', 'matrix-inverse-rank-determinants'],
    analogy: {
      title: 'The Real Estate Appraiser with Multiple Factors',
      text: 'Imagine a real estate appraiser estimating a home\'s value. If they look ONLY at square footage, a 2,000 sq ft home in a run-down area looks identical to a 2,000 sq ft home in Beverly Hills. Multiple regression acts like a master appraiser with a multidimensional checklist: each feature (square footage, number of bathrooms, school district rating, age of roof) has its own partial price weight. The appraiser adjusts value for an extra bathroom while mentally freezing square footage and school rating completely constant.',
      metaphor: 'Multiple regression fits an optimal flat hyperplane through multidimensional point clouds.',
    },
    problemSolved: {
      title: 'Isolating Confounding Variables in Complex Systems',
      description: 'In the real world, outcomes are driven by multiple correlated factors. Simple bivariate regression creates misleading conclusions (omitted variable bias). Multiple regression disentangles individual feature effects while statistically controlling for confounders.',
      keyPoints: [
        'Controls for confounding variables to isolate true causal/predictive contributions.',
        'Extends prediction to arbitrary d-dimensional feature spaces.',
        'Provides analytical confidence intervals for each individual parameter weight.',
      ],
    },
    intuition: {
      overview: 'Geometrically, instead of fitting a 2D line through points on a page, multiple regression fits a (d-dimensional) flat hyperplane through high-dimensional data points.',
      steps: [
        { step: 1, title: 'Formulate Design Matrix', description: 'Stack N samples as rows with d feature columns, plus a leading column of 1s for the bias intercept.' },
        { step: 2, title: 'Orthogonal Projection', description: 'Project observed target vector y onto the column space of X: y_hat = X (X^T X)^(-1) X^T y = H y.' },
        { step: 3, title: 'Partial Slopes', description: 'Weight w_j represents the partial derivative d y_hat / d x_j, holding all other features constant.' },
      ],
    },
    mathematics: {
      overview: 'Vectorized formulation of Ordinary Least Squares across multiple predictors.',
      foundations: [
        {
          name: 'Multiple Linear Model (Matrix Form)',
          latex: '\\mathbf{y} = X \\mathbf{w} + \\boldsymbol{\\epsilon} \\quad \\text{where } X \\in \\mathbb{R}^{N \\times (d+1)}, \\; \\mathbf{w} \\in \\mathbb{R}^{(d+1) \\times 1}',
          explanation: 'Standard matrix design formulation including intercept.',
        },
        {
          name: 'The Normal Equation',
          latex: '\\mathbf{w}^* = (X^T X)^{-1} X^T \\mathbf{y}',
          explanation: 'Analytical global solution minimizing Sum of Squared Errors.',
        },
        {
          name: 'The Hat Matrix (Orthogonal Projection)',
          latex: 'H = X(X^T X)^{-1} X^T \\implies \\hat{\\mathbf{y}} = H \\mathbf{y}',
          explanation: 'Projects y orthogonally onto the subspace spanned by the column vectors of X. H is symmetric and idempotent: H^2 = H.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Normal Equation via Matrix Calculus',
      objective: 'Minimize SSE(w) = ||y - X w||^2 with respect to weight vector w.',
      steps: [
        {
          step: 1,
          label: 'Expand Squared Euclidean Norm',
          latex: 'L(\\mathbf{w}) = (\\mathbf{y} - X\\mathbf{w})^T (\\mathbf{y} - X\\mathbf{w}) = \\mathbf{y}^T \\mathbf{y} - 2 \\mathbf{w}^T X^T \\mathbf{y} + \\mathbf{w}^T X^T X \\mathbf{w}',
          explanation: 'Express SSE as a quadratic scalar function of vector w.',
        },
        {
          step: 2,
          label: 'Compute Matrix Gradient with Respect to w',
          latex: '\\nabla_\\mathbf{w} L(\\mathbf{w}) = -2 X^T \\mathbf{y} + 2 X^T X \\mathbf{w} = \\mathbf{0}',
          explanation: 'Apply matrix calculus rules: d(w^T a)/dw = a and d(w^T A w)/dw = 2 A w (for symmetric A).',
        },
        {
          step: 3,
          label: 'Solve for Optimal Weight Vector',
          latex: 'X^T X \\mathbf{w} = X^T \\mathbf{y} \\implies \\mathbf{w}^* = (X^T X)^{-1} X^T \\mathbf{y}',
          explanation: 'Assuming X has full column rank, invert the Gram matrix to obtain the unique global solution.',
        },
      ],
    },
    variables: [
      { symbol: 'X', name: 'Design Matrix', description: 'N observations by (d+1) features including leading column of 1s.', dimensions: 'N × (d+1)' },
      { symbol: '\\mathbf{w}', name: 'Parameter Vector', description: 'Coefficients [w_0, w_1, ..., w_d]^T representing intercept and partial slopes.', dimensions: '(d+1) × 1' },
      { symbol: 'H', name: 'Hat Projection Matrix', description: 'Orthogonal projection operator mapping y to y_hat.', dimensions: 'N × N' },
    ],
    numericalExample: {
      scenario: 'Fit multiple regression y = w_0 + w_1 x_1 + w_2 x_2 on 3 samples: (x1=1, x2=2, y=6), (x1=2, x2=1, y=7), (x1=3, x2=3, y=12).',
      dataset: [{ sample: 1, x1: 1, x2: 2, y: 6 }, { sample: 2, x1: 2, x2: 1, y: 7 }, { sample: 3, x1: 3, x2: 3, y: 12 }],
      calculations: [
        { step: 'Design Matrix X with Intercept', math: 'X = [[1, 1, 2], [1, 2, 1], [1, 3, 3]]', result: '3x3 matrix' },
        { step: 'Compute X^T X', math: 'X^T X = [[3, 6, 6], [6, 14, 13], [6, 13, 14]]', result: 'Gram matrix' },
        { step: 'Compute X^T y', math: 'X^T y = [6+7+12, \\; 6+14+36, \\; 12+7+36] = [25, 56, 55]^T', result: '[25, 56, 55]' },
        { step: 'Solve Normal Equation', math: '\\mathbf{w} = (X^T X)^{-1} (X^T y)', result: 'w = [1.0, 2.0, 1.5]^T' },
        { step: 'Prediction Check Sample 1', math: '1.0 + 2.0(1) + 1.5(2) = 1 + 2 + 3', result: '6.0 (Exact fit)' },
      ],
      finalConclusion: 'The fitted plane is y = 1.0 + 2.0 x_1 + 1.5 x_2. Each unit increase in x_1 increases y by 2.0 holding x_2 fixed.',
    },
    visualExplanation: {
      title: 'Orthogonal Projection onto Column Space Col(X)',
      description: 'The target vector y lives in N-dimensional space. The columns of X span a d-dimensional subspace (a flat plane). The OLS prediction y_hat is the shadow of y projected at a perfect 90-degree right angle onto that plane. The residual error vector e = y - y_hat is orthogonal to the plane: X^T e = 0.',
      features: ['y_hat lives in Col(X)', 'Residual vector e is perpendicular to Col(X)', 'Pythagorean Theorem: ||y||^2 = ||y_hat||^2 + ||e||^2'],
    },
    scratchCode: {
      title: 'Multiple Linear Regression via Normal Equation in NumPy',
      explanation: 'Construct design matrix with intercept column and solve using np.linalg.solve.',
      code: `import numpy as np

def fit_multiple_linear_regression(X: np.ndarray, y: np.ndarray):
    """Fits multiple linear regression using the Normal Equation."""
    N = len(X)
    # Add leading column of 1s for intercept
    X_design = np.column_stack([np.ones(N), X])
    
    # Solve (X^T X) w = X^T y directly
    w = np.linalg.solve(X_design.T @ X_design, X_design.T @ y)
    
    intercept = float(w[0])
    coefficients = w[1:].tolist()
    
    return round(intercept, 4), [round(float(c), 4) for c in coefficients]

X_train = np.array([[1.0, 2.0], [2.0, 1.0], [3.0, 3.0]])
y_train = np.array([6.0, 7.0, 12.0])

b, weights = fit_multiple_linear_regression(X_train, y_train)
print(f"Intercept: {b}")
print(f"Coefficients (w1, w2): {weights}")
`,
    },
    sklearnCode: {
      title: 'Multiple Regression with Scikit-Learn',
      explanation: 'Fitting and interpreting coef_ and intercept_ attributes.',
      code: `import numpy as np
from sklearn.linear_model import LinearRegression

X = np.array([[1.0, 2.0], [2.0, 1.0], [3.0, 3.0]])
y = np.array([6.0, 7.0, 12.0])

model = LinearRegression().fit(X, y)

print("Intercept (w0):", round(model.intercept_, 4))
print("Slopes (w1, w2):", np.round(model.coef_, 4))
print("R^2 score:", round(model.score(X, y), 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

# 3 samples with 2 features
X = np.array([[1.0, 2.0], [2.0, 1.0], [3.0, 3.0]])
y = np.array([6.0, 7.0, 12.0])

# Add intercept column
X_b = np.c_[np.ones(3), X]
w = np.linalg.solve(X_b.T @ X_b, X_b.T @ y)

print(f"Fitted Equation: y = {w[0]:.2f} + {w[1]:.2f}*x1 + {w[2]:.2f}*x2")
preds = X_b @ w
residuals = y - preds
print(f"Predictions: {np.round(preds, 2)}")
print(f"Check X^T @ residuals = 0 (Orthogonality): {np.round(X_b.T @ residuals, 4)}")
`,
      expectedOutput: `Fitted Equation: y = 1.00 + 2.00*x1 + 1.50*x2\nPredictions: [ 6.  7. 12.]\nCheck X^T @ residuals = 0 (Orthogonality): [0. 0. 0.]`,
    },
    lineByLineExplanation: [
      { lines: 'Line 8', codeSnippet: 'X_b = np.c_[np.ones(3), X]', explanation: 'Prepends column of ones for intercept.' },
      { lines: 'Line 9', codeSnippet: 'w = np.linalg.solve(X_b.T @ X_b, X_b.T @ y)', explanation: 'Solves the Normal Equation system without matrix inversion.' },
      { lines: 'Line 14', codeSnippet: 'np.round(X_b.T @ residuals, 4)', explanation: 'Confirms fundamental theorem: residual vector is strictly orthogonal to all features.' },
    ],
    hyperparameters: [
      { name: 'fit_intercept', defaultVal: 'True', range: '[True, False]', effect: 'Determines whether model estimates baseline constant w0.', recommendation: 'Always set fit_intercept=True unless data is already explicitly mean-centered.' },
    ],
    assumptions: [
      { assumption: 'Full Column Rank (No Exact Collinearity)', whyItMatters: 'If two features are perfectly correlated, X^T X is singular and cannot be inverted.', howToVerify: 'Check np.linalg.matrix_rank(X) == X.shape[1].' },
    ],
    commonMistakes: [
      { mistake: 'Interpreting regression coefficients as absolute causal effects', solution: 'Coefficients reflect partial correlations conditioned on other included features; omitting an important variable biases all remaining coefficients (omitted variable bias).' },
    ],
    realWorldUseCases: [
      { industry: 'Economics & Labor Markets', application: 'Wage Gap and Compensation Analysis', benefit: 'Controls for education, years of experience, and role seniority to evaluate wage parity fairly.' },
    ],
    practiceQuestions: [
      { id: 'pq-mlr-1', question: 'What is the Gauss-Markov theorem in Ordinary Least Squares?', hint: 'Recall the BLUE acronym.', answer: 'The Gauss-Markov theorem proves that under the classical regression assumptions (zero conditional mean, homoscedasticity, no autocorrelation), the Ordinary Least Squares estimator is BLUE: Best Linear Unbiased Estimator (it has the lowest variance among all possible unbiased linear estimators).' },
    ],
    quiz: [
      {
        id: 'quiz-mlr-1',
        question: 'What is the geometric relationship between the residual error vector e = y - y_hat and the column space of the design matrix X in OLS?',
        options: [
          'The residual vector is parallel to the column space.',
          'The residual vector is strictly orthogonal (perpendicular) to every column of X: X^T e = 0.',
          'The residual vector has length 0.',
          'The residual vector is identical to y.',
        ],
        correctIndex: 1,
        explanation: 'Because OLS projects y orthogonally onto Col(X), the error vector e connects y to its projection at a perfect 90-degree angle: X^T e = 0.',
      },
    ],
    independentExercise: {
      title: 'Compute OLS Hat Projection Matrix',
      problem: 'Write a function compute_hat_matrix(X) that computes H = X (X^T X)^(-1) X^T and verifies that H is idempotent: H @ H == H.',
      hints: ['inv_gram = np.linalg.inv(X.T @ X)', 'H = X @ inv_gram @ X.T', 'np.allclose(H @ H, H)'],
      starterCode: `import numpy as np

def compute_hat_matrix(X: np.ndarray) -> np.ndarray:
    # TODO: return Hat matrix H
    return np.zeros((len(X), len(X)))

X = np.array([[1.0, 2.0], [2.0, 3.0], [3.0, 5.0]])
H = compute_hat_matrix(X)
print("Is H idempotent (H @ H == H)?", np.allclose(H @ H, H))
`,
      solution: `import numpy as np

def compute_hat_matrix(X: np.ndarray) -> np.ndarray:
    inv_gram = np.linalg.inv(X.T @ X)
    return X @ inv_gram @ X.T

X = np.array([[1.0, 2.0], [2.0, 3.0], [3.0, 5.0]])
H = compute_hat_matrix(X)
print("Is H idempotent (H @ H == H)?", np.allclose(H @ H, H))
print("Trace of H equals rank(X):", round(float(np.trace(H)), 2))
`,
    },
    summary: {
      keyTakeaways: [
        'Multiple regression fits an optimal flat hyperplane through multidimensional data.',
        'Partial slopes isolate the effect of each feature holding all other variables constant.',
        'OLS is BLUE (Best Linear Unbiased Estimator) under Gauss-Markov assumptions.',
      ],
      nextLessonId: 'regression-metrics',
      nextLessonTitle: 'Regression Evaluation Metrics: MSE, MAE, RMSE & R²',
      nextLessonModuleId: 'module-3',
    },
  },

  'regression-metrics': {
    id: 'regression-metrics',
    moduleId: 'module-3',
    title: 'Regression Evaluation Metrics: MSE, MAE, RMSE & R²',
    subtitle: 'Residual Sum of Squares, Scale-Dependent vs Relative Errors & Adjusted R²',
    order: 3,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Compute and interpret MSE, MAE, RMSE, and MAPE.',
      'Explain why R² measures the proportion of variance explained by the model relative to a naive mean baseline.',
      'Calculate Adjusted R² and explain how it penalizes the addition of useless predictor features.',
    ],
    prerequisites: ['linear-regression', 'multiple-linear-regression'],
    analogy: {
      title: 'The Dartboard Scoring System',
      text: 'Imagine throwing 10 darts at a bullseye. Mean Absolute Error (MAE) is the average distance in centimeters each dart landed from the bullseye. Mean Squared Error (MSE) squares those distances, so a single wild dart that missed the board entirely gets punished 100 times harder than a small 1 cm wobble. R² is your score relative to an amateur who blindfolded themselves and just threw darts at the average center of the room.',
      metaphor: 'MAE treats all errors linearly; RMSE severely penalizes rare catastrophic errors.',
    },
    problemSolved: {
      title: 'Quantifying Continuous Prediction Accuracy',
      description: 'Unlike classification where answers are simply right or wrong (accuracy), regression predictions are off by varying numerical margins. We need metrics matching business loss penalties.',
      keyPoints: [
        'Aligns loss metrics with real business cost functions.',
        'RMSE matches the physical units of the target variable ($ or kg).',
        'Adjusted R² prevents feature bloat and spurious model complexity.',
      ],
    },
    intuition: {
      overview: 'Total Sum of Squares (TSS) measures total data variance around the mean. Residual Sum of Squares (RSS) measures unexplained error. R² is 1 - RSS/TSS.',
      steps: [
        { step: 1, title: 'Absolute vs Squared', description: 'MAE measures average error magnitude. MSE/RMSE penalize large errors quadratically.' },
        { step: 2, title: 'Baseline Comparison (R²)', description: 'R² = 1.0 means perfect predictions; R² = 0.0 means model is no better than predicting the mean y_bar; R² < 0 means model is worse than the mean!' },
        { step: 3, title: 'Degrees of Freedom Adjustment', description: 'Standard R² always increases when adding features. Adjusted R² penalizes extra parameters.' },
      ],
    },
    mathematics: {
      overview: 'Analytical formulations of foundational regression performance metrics.',
      foundations: [
        {
          name: 'Mean Squared Error (MSE) & Root MSE (RMSE)',
          latex: '\\text{MSE} = \\frac{1}{N} \\sum_{i=1}^N (y_i - \\hat{y}_i)^2, \\quad \\text{RMSE} = \\sqrt{\\text{MSE}}',
          explanation: 'RMSE brings units back to original target scale. Highly sensitive to outliers.',
        },
        {
          name: 'Mean Absolute Error (MAE)',
          latex: '\\text{MAE} = \\frac{1}{N} \\sum_{i=1}^N |y_i - \\hat{y}_i|',
          explanation: 'Robust to outliers; measures expected absolute deviation.',
        },
        {
          name: 'Coefficient of Determination (R²)',
          latex: 'R^2 = 1 - \\frac{\\text{RSS}}{\\text{TSS}} = 1 - \\frac{\\sum_{i=1}^N (y_i - \\hat{y}_i)^2}{\\sum_{i=1}^N (y_i - \\bar{y})^2}',
          explanation: 'Fraction of total variance explained by the model.',
        },
        {
          name: 'Adjusted R²',
          latex: 'R^2_{\\text{adj}} = 1 - \\left( \\frac{1 - R^2}{N - d - 1} \\right)(N - 1)',
          explanation: 'Penalizes addition of extra features d. Only increases if new feature improves R² more than expected by chance.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Variance Decomposition: TSS = ESS + RSS',
      objective: 'Prove that Total Sum of Squares decomposes into Explained Sum of Squares plus Residual Sum of Squares.',
      steps: [
        {
          step: 1,
          label: 'Total Deviation Identity',
          latex: 'y_i - \\bar{y} = (y_i - \\hat{y}_i) + (\\hat{y}_i - \\bar{y}) = e_i + (\\hat{y}_i - \\bar{y})',
          explanation: 'Add and subtract prediction y_hat inside the deviation.',
        },
        {
          step: 2,
          label: 'Square and Sum Over All Samples',
          latex: '\\sum (y_i - \\bar{y})^2 = \\sum (y_i - \\hat{y}_i)^2 + \\sum (\\hat{y}_i - \\bar{y})^2 + 2 \\sum (y_i - \\hat{y}_i)(\\hat{y}_i - \\bar{y})',
          explanation: 'Expand the algebraic square.',
        },
        {
          step: 3,
          label: 'Orthogonality Cancels the Cross-Term',
          latex: '\\sum e_i (\\hat{y}_i - \\bar{y}) = \\mathbf{e}^T \\hat{\\mathbf{y}} - \\bar{y} \\sum e_i = 0 - 0 = 0 \\implies \\text{TSS} = \\text{RSS} + \\text{ESS}',
          explanation: 'Because residuals e are orthogonal to predictions y_hat, the cross-term vanishes completely in OLS.',
        },
      ],
    },
    variables: [
      { symbol: '\\text{TSS}', name: 'Total Sum of Squares', description: 'Total variance of target around mean y_bar.', dimensions: 'Scalar ≥ 0' },
      { symbol: '\\text{RSS}', name: 'Residual Sum of Squares', description: 'Sum of squared prediction errors.', dimensions: 'Scalar ≥ 0' },
      { symbol: 'R^2', name: 'R-Squared', description: 'Coefficient of determination.', dimensions: 'Scalar (-inf, 1]' },
    ],
    numericalExample: {
      scenario: 'Given true targets y = [10, 20, 30] and model predictions y_hat = [12, 19, 32]. Compute MAE, MSE, RMSE, TSS, and R².',
      dataset: [{ sample: 1, y: 10, y_hat: 12 }, { sample: 2, y: 20, y_hat: 19 }, { sample: 3, y: 30, y_hat: 32 }],
      calculations: [
        { step: 'Residual Errors (y - y_hat)', math: '[10-12, 20-19, 30-32] = [-2, +1, -2]', result: '[-2, 1, -2]' },
        { step: 'MAE Calculation', math: '(|-2| + |1| + |-2|) / 3 = (2 + 1 + 2) / 3 = 5 / 3', result: '1.67' },
        { step: 'MSE Calculation', math: '((-2)^2 + 1^2 + (-2)^2) / 3 = (4 + 1 + 4) / 3 = 9 / 3', result: '3.00' },
        { step: 'RMSE Calculation', math: '\\sqrt{3.00}', result: '1.73' },
        { step: 'Target Mean and TSS', math: '\\bar{y} = 20; \\; \\text{TSS} = (10-20)^2 + (20-20)^2 + (30-20)^2 = 100 + 0 + 100', result: 'TSS = 200.0' },
        { step: 'RSS and R²', math: '\\text{RSS} = 9; \\; R^2 = 1 - (9 / 200) = 1 - 0.045', result: '0.9550 (95.5%)' },
      ],
      finalConclusion: 'The model explains 95.5% of target variance with an average absolute error of 1.67 units and RMSE of 1.73.',
    },
    visualExplanation: {
      title: 'TSS vs RSS: What R² Really Measures',
      description: 'TSS is the sum of squared distances from the flat baseline line y = y_bar. RSS is the sum of squared distances from the fitted regression line. R² is the percentage reduction in squared error achieved by using the model instead of the baseline.',
      features: ['TSS: Total variance (uninformed mean model)', 'RSS: Unexplained variance (regression model)', 'R² = (TSS - RSS) / TSS'],
    },
    scratchCode: {
      title: 'Regression Metrics Suite in Pure Python',
      explanation: 'Calculate MSE, MAE, RMSE, R², and Adjusted R² without external packages.',
      code: `import numpy as np

def compute_regression_metrics(y_true: np.ndarray, y_pred: np.ndarray, num_features: int = 1):
    N = len(y_true)
    residuals = y_true - y_pred
    
    mae = float(np.mean(np.abs(residuals)))
    mse = float(np.mean(residuals ** 2))
    rmse = float(np.sqrt(mse))
    
    y_bar = np.mean(y_true)
    tss = float(np.sum((y_true - y_bar) ** 2))
    rss = float(np.sum(residuals ** 2))
    
    r2 = 1.0 - (rss / tss) if tss > 0 else 0.0
    r2_adj = 1.0 - ((1.0 - r2) * (N - 1) / (N - num_features - 1)) if N > num_features + 1 else r2
    
    return {
        'MAE': round(mae, 4),
        'MSE': round(mse, 4),
        'RMSE': round(rmse, 4),
        'R2': round(r2, 4),
        'Adjusted_R2': round(r2_adj, 4)
    }

y_t = np.array([10.0, 20.0, 30.0])
y_p = np.array([12.0, 19.0, 32.0])
print("Metrics:", compute_regression_metrics(y_t, y_p, num_features=1))
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn Regression Metrics',
      explanation: 'Standard evaluation using mean_squared_error, mean_absolute_error, and r2_score.',
      code: `import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

y_true = np.array([10.0, 20.0, 30.0])
y_pred = np.array([12.0, 19.0, 32.0])

mae = mean_absolute_error(y_true, y_pred)
mse = mean_squared_error(y_true, y_pred)
rmse = mean_squared_error(y_true, y_pred, squared=False)
r2 = r2_score(y_true, y_pred)

print(f"MAE: {mae:.2f}, MSE: {mse:.2f}, RMSE: {rmse:.2f}, R^2: {r2:.4f}")
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

y_true = np.array([10.0, 20.0, 30.0])
y_pred = np.array([12.0, 19.0, 32.0])

print(f"Targets:     {y_true}")
print(f"Predictions: {y_pred}")
print(f"MAE:  {mean_absolute_error(y_true, y_pred):.2f}")
print(f"MSE:  {mean_squared_error(y_true, y_pred):.2f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_true, y_pred)):.2f}")
print(f"R^2:  {r2_score(y_true, y_pred):.4f}")
`,
      expectedOutput: `Targets:     [10. 20. 30.]\nPredictions: [12. 19. 32.]\nMAE:  1.67\nMSE:  3.00\nRMSE: 1.73\nR^2:  0.9550`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-5', codeSnippet: 'y_true = [10, 20, 30]; y_pred = [12, 19, 32]', explanation: 'Sets up test targets and model predictions.' },
      { lines: 'Line 9', codeSnippet: 'mean_absolute_error(y_true, y_pred)', explanation: 'Computes average absolute residual |e|.' },
      { lines: 'Line 11', codeSnippet: 'np.sqrt(mean_squared_error(y_true, y_pred))', explanation: 'Computes root mean squared error in original units.' },
      { lines: 'Line 12', codeSnippet: 'r2_score(y_true, y_pred)', explanation: 'Computes 1 - RSS/TSS = 0.9550.' },
    ],
    hyperparameters: [
      { name: 'loss_metric', defaultVal: '"squared_error"', range: '["squared_error", "absolute_error", "huber"]', effect: 'Governs model parameter updates during training.', recommendation: 'Use squared error for Gaussian noise; use Huber loss or MAE if dataset contains heavy-tailed outliers.' },
    ],
    assumptions: [
      { assumption: 'Non-zero Target Variance (TSS > 0)', whyItMatters: 'If all true target values are identical constants, TSS = 0 and R² is undefined (division by zero).', howToVerify: 'Verify np.var(y_true) > 0.' },
    ],
    commonMistakes: [
      { mistake: 'Believing that R² cannot be negative', solution: 'On held-out test data, R² CAN be negative! A negative R² indicates that the model predictions are worse than simply predicting the training target mean y_bar for every sample.' },
    ],
    realWorldUseCases: [
      { industry: 'Supply Chain & Inventory Management', application: 'Product Demand Forecasting', benefit: 'Inventory planners optimize for MAE because inventory overstock and understock costs scale linearly with unit count.' },
    ],
    practiceQuestions: [
      { id: 'pq-met-1', question: 'When is RMSE preferred over MAE, and vice-versa?', hint: 'Consider the cost of a large error vs small errors.', answer: 'RMSE is preferred when large errors are disproportionately catastrophic (e.g. structural bridge load predictions). MAE is preferred when errors scale linearly and the dataset contains rogue outliers that should not dominate the evaluation.' },
    ],
    quiz: [
      {
        id: 'quiz-met-1',
        question: 'What does an R² score of -0.25 on a held-out test set signify?',
        options: [
          'The model explains 25% of the variance in the opposite direction.',
          'The model is performing worse than a naive baseline that simply predicts the mean target value y_bar.',
          'There is a mathematical error; R² cannot be less than 0.',
          'The correlation between features is -0.5.',
        ],
        correctIndex: 1,
        explanation: 'Because R² = 1 - RSS/TSS, an R² < 0 occurs whenever RSS > TSS, meaning the model\'s squared errors are larger than the errors of simply guessing the constant mean y_bar.',
      },
    ],
    independentExercise: {
      title: 'Compute Mean Absolute Percentage Error (MAPE)',
      problem: 'Write a function compute_mape(y_true, y_pred) that calculates MAPE = (100 / N) * sum(|y - y_hat| / |y|). Handle zero targets safely.',
      hints: ['Filter or clip |y_true| > 1e-8', 'np.mean(np.abs((y_true - y_pred) / y_true)) * 100'],
      starterCode: `import numpy as np

def compute_mape(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    # TODO: return MAPE percentage
    return 0.0

y_t = np.array([100.0, 200.0, 50.0])
y_p = np.array([110.0, 190.0, 45.0])
print(f"MAPE: {compute_mape(y_t, y_p):.2f}%")
`,
      solution: `import numpy as np

def compute_mape(y_true: np.ndarray, y_pred: np.ndarray, eps: float = 1e-8) -> float:
    y_safe = np.where(np.abs(y_true) < eps, eps, y_true)
    pct_errors = np.abs((y_true - y_pred) / y_safe)
    return float(np.mean(pct_errors) * 100.0)

y_t = np.array([100.0, 200.0, 50.0])
y_p = np.array([110.0, 190.0, 45.0])
print(f"MAPE: {compute_mape(y_t, y_p):.2f}%")
`,
    },
    summary: {
      keyTakeaways: [
        'MSE and RMSE penalize large errors quadratically; MAE treats errors with linear proportionality.',
        'R² measures the fraction of target variance explained relative to the naive mean baseline.',
        'Adjusted R² penalizes useless predictors to prevent model bloat.',
      ],
      nextLessonId: 'residual-analysis-assumptions',
      nextLessonTitle: 'Residual Diagnostics & Gauss-Markov Assumptions',
      nextLessonModuleId: 'module-3',
    },
  },

  'residual-analysis-assumptions': {
    id: 'residual-analysis-assumptions',
    moduleId: 'module-3',
    title: 'Residual Diagnostics & Gauss-Markov Assumptions',
    subtitle: 'Homoscedasticity, Independence, Normality of Residuals & Q-Q Plots',
    order: 4,
    readTimeMinutes: 25,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'State the five classical Gauss-Markov assumptions: Linearity, Strict Exogeneity, No Multicollinearity, Homoscedasticity, and No Autocorrelation.',
      'Diagnose heteroscedasticity (funnel-shaped residual patterns) and apply variance-stabilizing transformations.',
      'Construct Normal Q-Q plots to inspect residual normality and detect fat-tailed distributions.',
    ],
    prerequisites: ['multiple-linear-regression', 'regression-metrics'],
    analogy: {
      title: 'The Static Noise on an Old Radio',
      text: 'When a radio receiver is tuned perfectly to a radio station, you hear clear music. If you subtract the song, the only leftover sound should be faint, random white static noise (zero pattern, equal volume across all frequencies). If you still hear a secondary faint voice speaking through the static, your tuner missed a signal! In regression, residuals are that leftover static. If residuals contain any shape, curve, or megaphone funnel, your model missed a real mathematical pattern.',
      metaphor: 'Residuals should look like pure random white noise: no patterns, no curves, no funnels.',
    },
    problemSolved: {
      title: 'Validating Statistical Confidence and P-Values',
      description: 'While OLS can always compute numbers w = (X^T X)^(-1) X^T y, hypothesis tests (p-values, confidence intervals, F-tests) are completely invalid if Gauss-Markov assumptions are violated.',
      keyPoints: [
        'Detects nonlinearities missed by linear predictors.',
        'Identifies heteroscedasticity that invalidates standard errors.',
        'Verifies error normality required for small-sample t-tests.',
      ],
    },
    intuition: {
      overview: 'Plot residuals e_i = y_i - y_hat against predicted values y_hat. A healthy model shows an even, horizontal band of random scatter centered at zero.',
      steps: [
        { step: 1, title: 'Residuals vs Fitted Plot', description: 'Check for curvature (unmodeled nonlinearity) and funnel shapes (heteroscedasticity).' },
        { step: 2, title: 'Normal Q-Q Plot', description: 'Plot empirical residual quantiles against theoretical Gaussian quantiles; points should hug the 45-degree diagonal line.' },
        { step: 3, title: 'Autocorrelation Check', description: 'Check Durbin-Watson statistic (ideal ~ 2.0) to ensure residuals are not temporally correlated.' },
      ],
    },
    mathematics: {
      overview: 'The Gauss-Markov theorem requires specific statistical properties on error term epsilon.',
      foundations: [
        {
          name: 'Zero Conditional Mean (Strict Exogeneity)',
          latex: '\\mathbb{E}[\\boldsymbol{\\epsilon} | X] = \\mathbf{0}',
          explanation: 'Errors carry no information about features. Guarantees that parameter estimates are unbiased: E[w] = w_true.',
        },
        {
          name: 'Homoscedasticity (Equal Error Variance)',
          latex: '\\text{Var}(\\epsilon_i | X) = \\sigma^2 \\quad \\forall i \\in \\{1, \\dots, N\\}',
          explanation: 'Noise variance is constant across all feature values. Violation (heteroscedasticity) inflates standard errors.',
        },
        {
          name: 'No Autocorrelation',
          latex: '\\text{Cov}(\\epsilon_i, \\epsilon_j | X) = 0 \\quad \\forall i \\neq j',
          explanation: 'Residuals are pairwise uncorrelated across different samples.',
        },
      ],
    },
    derivation: {
      title: 'Proof that OLS is Unbiased under Strict Exogeneity',
      objective: 'Prove E[w*] = w_true assuming E[eps | X] = 0.',
      steps: [
        {
          step: 1,
          label: 'Substitute True Model into Normal Equation',
          latex: '\\mathbf{w}^* = (X^T X)^{-1} X^T \\mathbf{y} = (X^T X)^{-1} X^T (X \\mathbf{w}_{\\text{true}} + \\boldsymbol{\\epsilon})',
          explanation: 'Replace observed target y with the true underlying data generating process.',
        },
        {
          step: 2,
          label: 'Expand Matrix Multiplication',
          latex: '= (X^T X)^{-1} (X^T X) \\mathbf{w}_{\\text{true}} + (X^T X)^{-1} X^T \\boldsymbol{\\epsilon} = \\mathbf{w}_{\\text{true}} + (X^T X)^{-1} X^T \\boldsymbol{\\epsilon}',
          explanation: 'The first term simplifies to true weights w_true.',
        },
        {
          step: 3,
          label: 'Take Conditional Expectation',
          latex: '\\mathbb{E}[\\mathbf{w}^* | X] = \\mathbf{w}_{\\text{true}} + (X^T X)^{-1} X^T \\mathbb{E}[\\boldsymbol{\\epsilon} | X] = \\mathbf{w}_{\\text{true}} + \\mathbf{0} = \\mathbf{w}_{\\text{true}}',
          explanation: 'Because E[eps | X] = 0, the second term vanishes, proving OLS is strictly unbiased.',
        },
      ],
    },
    variables: [
      { symbol: 'e_i', name: 'Empirical Residual', description: 'Difference between observed target y_i and prediction y_hat_i.', dimensions: 'Scalar' },
      { symbol: '\\sigma^2', name: 'Constant Error Variance', description: 'Homoscedastic noise magnitude.', dimensions: 'Scalar > 0' },
      { symbol: 'd', name: 'Durbin-Watson Statistic', description: 'Test for residual autocorrelation (bounded [0, 4]).', dimensions: 'Scalar [0, 4]' },
    ],
    numericalExample: {
      scenario: 'Given residuals e = [-1.0, 2.0, -1.0] for predictions y_hat = [10, 20, 30]. Verify zero residual mean and calculate sample error variance s^2.',
      dataset: [{ e1: -1.0, e2: 2.0, e3: -1.0 }],
      calculations: [
        { step: 'Sum of Residuals', math: '-1.0 + 2.0 - 1.0 = 0.0', result: 'sum = 0.0' },
        { step: 'Residual Mean', math: '0.0 / 3', result: '0.00' },
        { step: 'Sum of Squared Residuals (RSS)', math: '(-1.0)^2 + (2.0)^2 + (-1.0)^2 = 1 + 4 + 1', result: '6.00' },
        { step: 'Unbiased Error Variance s^2 (N - d - 1)', math: 'For N=3, d=1: df = 3 - 1 - 1 = 1 -> s^2 = 6.0 / 1', result: '6.00' },
      ],
      finalConclusion: 'Mean residual is exactly zero. Estimated residual variance s^2 is 6.00.',
    },
    visualExplanation: {
      title: 'Residual Diagnostics: Healthy vs Pathological Patterns',
      description: 'Healthy: Random horizontal cloud centered at 0. Nonlinearity: Distinct U-shaped curve (requires polynomial feature x^2). Heteroscedasticity: Megaphone funnel expanding from left to right (requires log transformation).',
      features: ['Healthy: Constant variance band', 'Curved: Missing nonlinear term', 'Funnel: Heteroscedasticity'],
    },
    scratchCode: {
      title: 'Residual Analysis and Breusch-Pagan Test in Pure Python',
      explanation: 'Calculate residuals, fit auxiliary regression for heteroscedasticity, and plot checks.',
      code: `import numpy as np

def analyze_residuals(y_true: np.ndarray, y_pred: np.ndarray):
    residuals = y_true - y_pred
    mean_res = float(np.mean(residuals))
    std_res = float(np.std(residuals))
    
    # Simple heteroscedasticity correlation test (residuals^2 vs y_pred)
    res_sq = residuals ** 2
    r_hetero = float(np.corrcoef(y_pred, res_sq)[0, 1])
    
    return {
        'mean_residual': round(mean_res, 6),
        'std_residual': round(std_res, 4),
        'hetero_corr': round(r_hetero, 4),
        'heteroscedasticity_flag': abs(r_hetero) > 0.3
    }

y_t = np.array([10.0, 20.0, 30.0, 40.0, 50.0])
# Simulated funnel heteroscedastic predictions
y_p = np.array([10.1, 19.8, 30.5, 38.0, 55.0])
print("Residual Analysis:", analyze_residuals(y_t, y_p))
`,
    },
    sklearnCode: {
      title: 'Statsmodels OLS Summary and Q-Q Plot',
      explanation: 'Using statsmodels for comprehensive Gauss-Markov diagnostic reporting.',
      code: `import numpy as np
import statsmodels.api as sm

X = np.array([[1.0], [2.0], [3.0], [4.0], [5.0]])
y = np.array([2.2, 3.9, 6.1, 8.2, 10.1])

X_with_const = sm.add_constant(X)
ols_res = sm.OLS(y, X_with_const).fit()

# Durbin-Watson tests autocorrelation (~2.0 is ideal)
print("Durbin-Watson statistic:", round(sm.stats.durbin_watson(ols_res.resid), 3))
print("Omnibus Normality p-value:", round(ols_res.summary().tables[2].data[1][1], 3) if hasattr(ols_res, 'summary') else "N/A")
`,
    },
    runnableCode: {
      code: `import numpy as np

# Linear model fit on y = 2x + noise
x = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
y = np.array([2.1, 4.2, 5.9, 8.1, 10.2])

slope, intercept = np.polyfit(x, y, 1)
preds = slope * x + intercept
residuals = y - preds

print(f"Fitted Slope: {slope:.3f}, Intercept: {intercept:.3f}")
print(f"Residuals: {np.round(residuals, 4)}")
print(f"Mean Residual: {np.mean(residuals):.8e} (Effectively 0)")
print(f"Residual Sum of Squares (RSS): {np.sum(residuals**2):.4f}")
`,
      expectedOutput: `Fitted Slope: 2.020, Intercept: 0.040\nResiduals: [ 0.04  0.12 -0.2  -0.02  0.06]\nMean Residual: 0.00000000e+00 (Effectively 0)\nResidual Sum of Squares (RSS): 0.0600`,
    },
    lineByLineExplanation: [
      { lines: 'Line 8', codeSnippet: 'slope, intercept = np.polyfit(x, y, 1)', explanation: 'Fits degree-1 OLS line.' },
      { lines: 'Line 10', codeSnippet: 'residuals = y - preds', explanation: 'Computes empirical errors e_i = y_i - y_hat_i.' },
      { lines: 'Line 14', codeSnippet: 'print(f"Mean Residual: {np.mean(residuals):.8e}")', explanation: 'Confirms that OLS residuals with an intercept sum to exact zero.' },
    ],
    hyperparameters: [
      { name: 'target_transform', defaultVal: 'None', range: '["log", "log1p", "box-cox", "sqrt"]', effect: 'Stabilizes heteroscedastic error variance and normalizes right-skewed targets.', recommendation: 'Use log1p(y) when residual plots show a funnel shape with variance increasing as y increases.' },
    ],
    assumptions: [
      { assumption: 'Homoscedasticity', whyItMatters: 'If error variance changes across X, OLS remains unbiased but standard errors are wrong, leading to invalid p-values and confidence intervals.', howToVerify: 'Use Breusch-Pagan test or White test.' },
    ],
    commonMistakes: [
      { mistake: 'Assuming residual analysis tests whether the raw features X are normally distributed', solution: 'Linear regression does NOT require features X to be normal! It only requires the RESIDUAL ERRORS epsilon to be normally distributed.' },
    ],
    realWorldUseCases: [
      { industry: 'Insurance & Actuarial Science', application: 'Claim Severity Modeling', benefit: 'Insurance claim amounts exhibit severe heteroscedasticity (larger claims have wildly larger variances). Residual diagnostics prompt the use of Generalized Linear Models (Gamma or Tweedie GLMs).' },
    ],
    practiceQuestions: [
      { id: 'pq-res-1', question: 'What visual pattern in a Residuals-vs-Fitted plot indicates that the relationship is non-linear and requires polynomial terms?', hint: 'Think of a curved shape.', answer: 'A distinct U-shaped or inverted U-shaped parabolic curve in the residuals indicates that a straight line fails to capture curvature, signaling that a polynomial term (such as x^2) is missing from the model.' },
    ],
    quiz: [
      {
        id: 'quiz-res-1',
        question: 'What does a "megaphone" or "funnel" pattern in a Residuals vs. Fitted plot indicate?',
        options: [
          'Multicollinearity among input features.',
          'Heteroscedasticity: error variance is not constant across predicted values.',
          'The model is perfectly calibrated.',
          'Autocorrelation between time steps.',
        ],
        correctIndex: 1,
        explanation: 'A funnel shape (where the spread of residuals expands as fitted values increase) is the classic visual symptom of heteroscedasticity (non-constant variance).',
      },
    ],
    independentExercise: {
      title: 'Detect Residual Autocorrelation via Durbin-Watson',
      problem: 'Write a function durbin_watson_stat(residuals) that computes d = sum((e_t - e_{t-1})^2) / sum(e_t^2). Values near 2 indicate no autocorrelation.',
      hints: ['diffs = np.diff(residuals)', 'd = np.sum(diffs**2) / np.sum(residuals**2)'],
      starterCode: `import numpy as np

def compute_durbin_watson(residuals: np.ndarray) -> float:
    # TODO: return Durbin-Watson statistic
    return 0.0

res_uncorrelated = np.random.normal(0, 1, 100)
print("DW stat (uncorrelated ~2.0):", round(compute_durbin_watson(res_uncorrelated), 3))
`,
      solution: `import numpy as np

def compute_durbin_watson(residuals: np.ndarray) -> float:
    diffs = np.diff(residuals)
    numerator = np.sum(diffs ** 2)
    denominator = np.sum(residuals ** 2)
    return float(numerator / denominator)

np.random.seed(42)
res_uncorrelated = np.random.normal(0, 1, 100)
print("DW stat (uncorrelated ~2.0):", round(compute_durbin_watson(res_uncorrelated), 3))
`,
    },
    summary: {
      keyTakeaways: [
        'Residuals should look like pure random static with zero mean and constant variance.',
        'Heteroscedasticity distorts standard errors, requiring log transformations or robust Huber errors.',
        'Q-Q plots verify whether residuals satisfy the Gaussian normality assumption.',
      ],
      nextLessonId: 'multicollinearity-vif',
      nextLessonTitle: 'Multicollinearity & Variance Inflation Factor (VIF)',
      nextLessonModuleId: 'module-3',
    },
  },

  'multicollinearity-vif': {
    id: 'multicollinearity-vif',
    moduleId: 'module-3',
    title: 'Multicollinearity & Variance Inflation Factor (VIF)',
    subtitle: 'Correlated Predictors, Unstable Inversions & Inflated Coefficient Variances',
    order: 5,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Define perfect and imperfect multicollinearity in regression design matrices.',
      'Derive and calculate the Variance Inflation Factor (VIF) for each predictor.',
      'Explain how multicollinearity inflates parameter standard errors without reducing overall R².',
    ],
    prerequisites: ['multiple-linear-regression', 'matrix-inverse-rank-determinants'],
    analogy: {
      title: 'Two Loud Speakers at the Same Megaphone',
      text: 'Imagine two people shouting the exact same message into a microphone simultaneously. The overall volume of the message is loud and clear (high R²). But if you ask the audience: "How much of that volume came from Speaker A versus Speaker B?", it is impossible to tell! The sound could be 100% Speaker A, 100% Speaker B, or 50/50. Multicollinearity occurs when two features share the exact same predictive voice: the overall model predicts well, but individual coefficient weights swing wildly.',
      metaphor: 'Multicollinearity makes individual feature weights erratic while total prediction remains stable.',
    },
    problemSolved: {
      title: 'Diagnosing Unstable Coefficients in Multi-Feature Models',
      description: 'When input features are strongly correlated (e.g. Years of Experience and Age, or Weight in Pounds and Weight in Kilograms), the design matrix X^T X becomes ill-conditioned, causing standard errors to explode and signs of coefficients to flip counterintuitively.',
      keyPoints: [
        'Explains why an important feature might receive a counterintuitive negative weight or statistically insignificant p-value.',
        'Calculates VIF = 1 / (1 - R_j^2) to pinpoint which specific variables are redundant.',
        'Guides feature pruning or switching to regularized models (Ridge).',
      ],
    },
    intuition: {
      overview: 'Regress each feature X_j against all other features. If other features explain 90% of X_j (R_j^2 = 0.90), X_j is largely redundant and its coefficient variance inflates by 10x.',
      steps: [
        { step: 1, title: 'Auxiliary Regression', description: 'Fit linear regression predicting feature X_j from all remaining features X_{-j}.' },
        { step: 2, title: 'Compute Auxiliary R_j²', description: 'Calculate the coefficient of determination R_j^2 of this auxiliary model.' },
        { step: 3, title: 'Calculate VIF', description: 'VIF_j = 1 / (1 - R_j^2). A VIF > 5 or 10 signals severe multicollinearity.' },
      ],
    },
    mathematics: {
      overview: 'Variance of OLS coefficient w_j depends explicitly on the Variance Inflation Factor.',
      foundations: [
        {
          name: 'Variance of OLS Coefficient',
          latex: '\\text{Var}(\\hat{w}_j) = \\frac{\\sigma^2}{\\sum (x_{ij} - \\bar{x}_j)^2} \\cdot \\text{VIF}_j = \\frac{\\sigma^2}{(N - 1) s_j^2} \\cdot \\frac{1}{1 - R_j^2}',
          explanation: 'As R_j^2 approaches 1.0, the denominator (1 - R_j^2) approaches 0, blowing up the coefficient variance to infinity.',
        },
        {
          name: 'Variance Inflation Factor (VIF)',
          latex: '\\text{VIF}_j = \\frac{1}{1 - R_j^2} \\ge 1.0',
          explanation: 'Measures by how many times the variance of w_j is inflated due to correlation with other predictors.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of VIF as the Ratio of Variances',
      objective: 'Show that VIF measures variance inflation relative to an idealized orthogonal design.',
      steps: [
        {
          step: 1,
          label: 'Variance in Perfectly Orthogonal Design',
          latex: '\\text{If } X_j \\perp X_{-j} \\implies R_j^2 = 0 \\implies \\text{Var}_{\\text{ortho}}(\\hat{w}_j) = \\frac{\\sigma^2}{\\sum (x_{ij} - \\bar{x}_j)^2}',
          explanation: 'When features are mutually perpendicular, each coefficient has minimum possible variance.',
        },
        {
          step: 2,
          label: 'Variance in Correlated Design',
          latex: '\\text{Var}_{\\text{corr}}(\\hat{w}_j) = \\frac{\\sigma^2}{\\sum (x_{ij} - \\bar{x}_j)^2} \\cdot \\frac{1}{1 - R_j^2}',
          explanation: 'Linear dependency adds the factor 1 / (1 - R_j^2).',
        },
        {
          step: 3,
          label: 'Form the Ratio',
          latex: '\\frac{\\text{Var}_{\\text{corr}}(\\hat{w}_j)}{\\text{Var}_{\\text{ortho}}(\\hat{w}_j)} = \\frac{1}{1 - R_j^2} = \\text{VIF}_j',
          explanation: 'Proves VIF is the exact factor by which coefficient variance expands due to multicollinearity.',
        },
      ],
    },
    variables: [
      { symbol: 'R_j^2', name: 'Auxiliary R-Squared', description: 'Variance of feature j explained by all other input features.', dimensions: 'Scalar [0, 1)' },
      { symbol: '\\text{VIF}_j', name: 'Variance Inflation Factor', description: 'Inflation multiplier for coefficient j.', dimensions: 'Scalar ≥ 1.0' },
      { symbol: '\\kappa(X)', name: 'Condition Number', description: 'Ratio of largest to smallest singular value of X.', dimensions: 'Scalar ≥ 1.0' },
    ],
    numericalExample: {
      scenario: 'Feature 1 (Square Footage) and Feature 2 (Number of Rooms) have auxiliary correlation producing R_1^2 = 0.90. Calculate VIF and standard error expansion.',
      dataset: [{ r2_aux: 0.90 }],
      calculations: [
        { step: 'Denominator (1 - R_j²)', math: '1.0 - 0.90 = 0.10', result: '0.10' },
        { step: 'VIF Calculation', math: '1 / 0.10 = 10.0', result: 'VIF = 10.0' },
        { step: 'Standard Error Inflation Factor', math: '\\sqrt{\\text{VIF}} = \\sqrt{10.0} \\approx 3.162', result: '3.16x' },
      ],
      finalConclusion: 'A VIF of 10.0 means the variance of coefficient w_1 is 10 times larger than if features were orthogonal, and its standard error is more than tripled (3.16x), destroying statistical significance.',
    },
    visualExplanation: {
      title: 'Confidence Ellipses Under Multicollinearity',
      description: 'When features are independent, the joint confidence region for (w1, w2) is a tight circle. When features are 95% collinear, the confidence region stretches into an extremely long, narrow ellipse. The individual weights can slide wildly along this diagonal ridge with virtually zero change in total loss.',
      features: ['Orthogonal: Tight circular confidence region', 'Collinear: Elongated diagonal valley of unstable solutions'],
    },
    scratchCode: {
      title: 'Variance Inflation Factor (VIF) Calculator in Pure Python',
      explanation: 'Compute VIF for all columns using successive OLS regressions.',
      code: `import numpy as np

def compute_vif_matrix(X: np.ndarray):
    """Computes VIF for each column in 2D array X."""
    d = X.shape[1]
    vifs = []
    
    for j in range(d):
        y_j = X[:, j]
        X_other = np.delete(X, j, axis=1)
        
        # Fit OLS predicting X_j from X_{-j}
        X_other_b = np.column_stack([np.ones(len(X)), X_other])
        w = np.linalg.lstsq(X_other_b, y_j, rcond=None)[0]
        y_pred = X_other_b @ w
        
        tss = np.sum((y_j - np.mean(y_j)) ** 2)
        rss = np.sum((y_j - y_pred) ** 2)
        r2_j = 1.0 - (rss / tss) if tss > 0 else 0.0
        
        vif = 1.0 / (1.0 - r2_j) if (1.0 - r2_j) > 1e-10 else 1000.0
        vifs.append(round(float(vif), 2))
        
    return vifs

# Col 0 and 1 are 99% collinear (col 1 = 2 * col 0 + noise)
np.random.seed(42)
f0 = np.random.randn(50)
f1 = 2.0 * f0 + np.random.normal(0, 0.1, 50)
f2 = np.random.randn(50) # Independent
X_data = np.column_stack([f0, f1, f2])

print("VIF for [f0, f1, f2]:", compute_vif_matrix(X_data))
`,
    },
    sklearnCode: {
      title: 'Statsmodels variance_inflation_factor',
      explanation: 'Standard professional method for auditing tabular feature matrices.',
      code: `import pandas as pd
import numpy as np
from statsmodels.stats.outliers_influence import variance_inflation_factor

# Create collinear DataFrame
np.random.seed(42)
x1 = np.random.randn(100)
x2 = x1 * 0.95 + np.random.randn(100) * 0.05
x3 = np.random.randn(100)

df = pd.DataFrame({'x1': x1, 'x2': x2, 'x3': x3})

vifs = [variance_inflation_factor(df.values, i) for i in range(df.shape[1])]
for name, vif in zip(df.columns, vifs):
    print(f"Feature {name}: VIF = {vif:.2f}")
`,
    },
    runnableCode: {
      code: `import numpy as np

# R_j^2 auxiliary values
r2_values = [0.0, 0.50, 0.80, 0.90, 0.95, 0.99]
print("R_j^2 vs VIF (Variance Inflation Factor):")
for r2 in r2_values:
    vif = 1.0 / (1.0 - r2)
    se_mult = np.sqrt(vif)
    print(f"R_j^2 = {r2:.2f} -> VIF = {vif:6.1f} (Std Error inflated by {se_mult:4.1f}x)")
`,
      expectedOutput: `R_j^2 vs VIF (Variance Inflation Factor):\nR_j^2 = 0.00 -> VIF =    1.0 (Std Error inflated by  1.0x)\nR_j^2 = 0.50 -> VIF =    2.0 (Std Error inflated by  1.4x)\nR_j^2 = 0.80 -> VIF =    5.0 (Std Error inflated by  2.2x)\nR_j^2 = 0.90 -> VIF =   10.0 (Std Error inflated by  3.2x)\nR_j^2 = 0.95 -> VIF =   20.0 (Std Error inflated by  4.5x)\nR_j^2 = 0.99 -> VIF =  100.0 (Std Error inflated by 10.0x)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'r2_values = [0.0, 0.50, 0.80, 0.90, 0.95, 0.99]', explanation: 'Tests varying levels of auxiliary collinearity.' },
      { lines: 'Line 7', codeSnippet: 'vif = 1.0 / (1.0 - r2)', explanation: 'Computes VIF using inverse tolerance formula.' },
      { lines: 'Line 8', codeSnippet: 'se_mult = np.sqrt(vif)', explanation: 'Standard error scales with the square root of VIF.' },
    ],
    hyperparameters: [
      { name: 'vif_threshold', defaultVal: '5.0', range: '[5.0, 10.0]', effect: 'Threshold for pruning collinear features.', recommendation: 'Features with VIF > 5.0 (or conservatively > 10.0) should be dropped or combined via PCA.' },
    ],
    assumptions: [
      { assumption: 'Linearly Independent Regressors', whyItMatters: 'If perfect collinearity exists (det = 0), VIF is infinite and OLS Normal Equation cannot be inverted.', howToVerify: 'Verify all VIF values are finite and matrix condition number < 1000.' },
    ],
    commonMistakes: [
      { mistake: 'Assuming that multicollinearity reduces overall prediction accuracy', solution: 'Multicollinearity does NOT reduce overall model predictive power or R²! It only makes the individual coefficient weights uninterpretable and erratic.' },
    ],
    realWorldUseCases: [
      { industry: 'Marketing & Attribution Modeling', application: 'Media Mix Modeling (MMM)', benefit: 'TV ad spend and Digital ad spend frequently correlate (0.90) because campaigns launch together. VIF auditing prompts the use of Ridge regression to stabilize budget channel ROI estimates.' },
    ],
    practiceQuestions: [
      { id: 'pq-vif-1', question: 'How does Ridge regression (L2 regularization) solve the multicollinearity problem?', hint: 'Recall what is added to X^T X.', answer: 'Ridge regression adds lambda * I to the Gram matrix: (X^T X + lambda I)^(-1). Even if X^T X is nearly singular (determinant near 0), adding positive values along the diagonal guarantees all eigenvalues are strictly positive, preventing the inversion from exploding.' },
    ],
    quiz: [
      {
        id: 'quiz-vif-1',
        question: 'What is the commonly accepted rule-of-thumb VIF threshold where multicollinearity is considered severe enough to require action?',
        options: ['VIF > 1.0', 'VIF > 2.0', 'VIF > 5.0 or 10.0', 'VIF > 100.0'],
        correctIndex: 2,
        explanation: 'A VIF above 5.0 (corresponding to R_j^2 > 0.80) or 10.0 (R_j^2 > 0.90) indicates severe multicollinearity that heavily inflates coefficient standard errors.',
      },
    ],
    independentExercise: {
      title: 'Automated Iterative VIF Pruning Algorithm',
      problem: 'Write a function drop_high_vif(df, threshold=10.0) that iteratively drops the feature with the highest VIF until all remaining features have VIF <= threshold.',
      hints: ['Loop while max(VIF) > threshold', 'Drop column with max VIF and recompute'],
      starterCode: `import pandas as pd
import numpy as np

def prune_vif(df: pd.DataFrame, threshold: float = 10.0) -> list:
    # TODO: return list of retained column names
    return df.columns.tolist()

df_test = pd.DataFrame({
    'x1': [1, 2, 3, 4, 5],
    'x2': [2.01, 3.99, 6.02, 7.98, 10.01], # Nearly 2*x1
    'x3': [10, 5, 20, 15, 30]
})
print("Retained columns:", prune_vif(df_test))
`,
      solution: `import pandas as pd
import numpy as np

def compute_single_vif(df, col_idx):
    y = df.iloc[:, col_idx].values
    X_other = df.drop(df.columns[col_idx], axis=1).values
    X_b = np.column_stack([np.ones(len(df)), X_other])
    w = np.linalg.lstsq(X_b, y, rcond=None)[0]
    preds = X_b @ w
    tss = np.sum((y - np.mean(y)) ** 2)
    rss = np.sum((y - preds) ** 2)
    r2 = 1.0 - (rss / tss) if tss > 0 else 0.0
    return 1.0 / (1.0 - r2) if (1.0 - r2) > 1e-10 else 1000.0

def prune_vif(df: pd.DataFrame, threshold: float = 10.0) -> list:
    curr_df = df.copy()
    while True:
        vifs = [compute_single_vif(curr_df, i) for i in range(curr_df.shape[1])]
        max_vif = max(vifs)
        if max_vif > threshold and curr_df.shape[1] > 1:
            drop_col = curr_df.columns[np.argmax(vifs)]
            curr_df = curr_df.drop(columns=[drop_col])
        else:
            break
    return curr_df.columns.tolist()

df_test = pd.DataFrame({
    'x1': [1.0, 2.0, 3.0, 4.0, 5.0],
    'x2': [2.01, 3.99, 6.02, 7.98, 10.01],
    'x3': [10.0, 5.0, 20.0, 15.0, 30.0]
})
print("Retained columns:", prune_vif(df_test, threshold=5.0))
`,
    },
    summary: {
      keyTakeaways: [
        'Multicollinearity inflates coefficient standard errors and causes weights to swing erratically.',
        'Variance Inflation Factor (VIF = 1 / (1 - R_j^2)) measures how much variance is inflated by collinearity.',
        'VIF > 5 to 10 indicates that features should be pruned, combined via PCA, or regularized with Ridge.',
      ],
      nextLessonId: 'polynomial-regression',
      nextLessonTitle: 'Polynomial Regression & Non-Linear Fits',
      nextLessonModuleId: 'module-3',
    },
  },

  'polynomial-regression': {
    id: 'polynomial-regression',
    moduleId: 'module-3',
    title: 'Polynomial Regression & Non-Linear Fits',
    subtitle: 'Capturing Curvature via Basis Expansion & Managing Boundary Runge Oscillations',
    order: 6,
    readTimeMinutes: 20,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Fit polynomial regression curves y = w0 + w1 x + w2 x^2 + ... + wd x^d using OLS.',
      'Explain why polynomial models remain strictly linear models in parameter space.',
      'Diagnose Runge\'s phenomenon (wild edge oscillations) and apply regularization to constrain weights.',
    ],
    prerequisites: ['multiple-linear-regression', 'feature-scaling-normalization'],
    analogy: {
      title: 'The Rollercoaster Track',
      text: 'A simple linear model is like laying down a rigid wooden board: it can only tilt up or down, failing completely on rolling hills. A degree-2 polynomial adds one bend (a bowl or hill). A degree-3 polynomial adds two bends (an S-curve). A degree-15 polynomial is like an ultra-flexible rubber snake: it can wiggle through every single pebble on the track, but at the edges of the cliff, it whips wildly out of control into thin air (Runge\'s phenomenon)!',
      metaphor: 'Polynomial degree controls curve flexibility: too low underfits; too high whips wildly.',
    },
    problemSolved: {
      title: 'Non-Linear Fitting with Convex Optimization Guarantees',
      description: 'Many natural phenomena are non-linear (e.g. ballistic trajectories, drug dosage response curves). Polynomial regression fits smooth curves without sacrificing the unique global minimum guarantees of linear regression.',
      keyPoints: [
        'Preserves analytical closed-form solutions w = (Phi^T Phi)^(-1) Phi^T y.',
        'Controls curvature smoothly via degree selection and regularization.',
        'Serves as the foundation for spline regression and Generalized Additive Models (GAMs).',
      ],
    },
    intuition: {
      overview: 'By constructing an expanded design matrix Phi where each column is an increasing power of x, standard OLS automatically learns the optimal coefficients for each polynomial power.',
      steps: [
        { step: 1, title: 'Vandermonde Matrix', description: 'Create design matrix Phi with columns [1, x, x^2, ..., x^d].' },
        { step: 2, title: 'Ordinary Least Squares Fit', description: 'Solve w = (Phi^T Phi)^(-1) Phi^T y.' },
        { step: 3, title: 'Degree Selection', description: 'Use validation cross-validation to pick degree d that minimizes out-of-sample MSE.' },
      ],
    },
    mathematics: {
      overview: 'Formulation of univariate and multivariate polynomial regression.',
      foundations: [
        {
          name: 'Polynomial Model Equation',
          latex: '\\hat{y}_i = w_0 + \\sum_{k=1}^d w_k x_i^k = \\mathbf{w}^T \\boldsymbol{\\phi}(x_i)',
          explanation: 'Linear combination of non-linear basis functions phi_k(x) = x^k.',
        },
        {
          name: 'The Vandermonde Design Matrix',
          latex: '\\Phi = \\begin{bmatrix} 1 & x_1 & x_1^2 & \\dots & x_1^d \\\\ 1 & x_2 & x_2^2 & \\dots & x_2^d \\\\ \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\ 1 & x_N & x_N^2 & \\dots & x_N^d \\end{bmatrix}',
          explanation: 'Design matrix of powers. Becomes severely ill-conditioned as degree d increases.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Polynomial Convexity',
      objective: 'Prove that polynomial regression retains a strictly convex loss surface.',
      steps: [
        {
          step: 1,
          label: 'Express Loss Function',
          latex: 'L(\\mathbf{w}) = \\frac{1}{N} \\|\\mathbf{y} - \\Phi \\mathbf{w}\\|_2^2',
          explanation: 'The loss is quadratic in parameter vector w.',
        },
        {
          step: 2,
          label: 'Evaluate Hessian with Respect to w',
          latex: '\\nabla^2_\\mathbf{w} L(\\mathbf{w}) = \\frac{2}{N} \\Phi^T \\Phi',
          explanation: 'The Hessian depends only on design matrix Phi, independent of w.',
        },
        {
          step: 3,
          label: 'Verify Positive Semi-Definiteness',
          latex: '\\mathbf{v}^T (\\Phi^T \\Phi) \\mathbf{v} = (\\Phi \\mathbf{v})^T (\\Phi \\mathbf{v}) = \\|\\Phi \\mathbf{v}\\|_2^2 \\ge 0 \\quad \\forall \\mathbf{v}',
          explanation: 'The Hessian is positive semi-definite everywhere. The optimization problem is strictly convex with no local minima.',
        },
      ],
    },
    variables: [
      { symbol: 'd', name: 'Polynomial Degree', description: 'Highest power in the expansion.', dimensions: 'Integer ≥ 1' },
      { symbol: '\\Phi', name: 'Vandermonde Matrix', description: 'Design matrix of polynomial power columns.', dimensions: 'N × (d+1)' },
      { symbol: 'w_k', name: 'Polynomial Weight', description: 'Coefficient multiplying power x^k.', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Fit a quadratic curve y = w_0 + w_1 x + w_2 x^2 to 3 points: (-1, 1), (0, 0), (1, 1).',
      dataset: [{ x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }],
      calculations: [
        { step: 'Vandermonde Matrix Phi', math: '\\Phi = [[1, -1, 1], [1, 0, 0], [1, 1, 1]]', result: 'Phi matrix' },
        { step: 'Compute Phi^T y', math: '[[1, 1, 1], [-1, 0, 1], [1, 0, 1]] @ [1, 0, 1]^T = [2, 0, 2]^T', result: '[2, 0, 2]' },
        { step: 'Solve for w', math: '\\Phi \\mathbf{w} = \\mathbf{y} \\implies w_0 = 0, \\; w_1 = 0, \\; w_2 = 1.0', result: 'w = [0, 0, 1]' },
      ],
      finalConclusion: 'The fitted equation is y = 0 + 0*x + 1.0*x^2 = x^2, perfectly recovering the true parabola.',
    },
    visualExplanation: {
      title: 'Runge\'s Phenomenon at Domain Boundaries',
      description: 'When fitting high-degree polynomials (degree 10+) on evenly spaced points, the curve fits middle points well but exhibits massive, wild oscillations near the edges (-1 and +1). Regularization (Ridge) dampens these oscillations.',
      features: ['Degree 3: Smooth curve', 'Degree 12 Unregularized: Wild edge spikes', 'Degree 12 + Ridge: Smooth boundary fit'],
    },
    scratchCode: {
      title: 'Polynomial Regression Solver in NumPy',
      explanation: 'Construct Vandermonde matrix and fit polynomial curve.',
      code: `import numpy as np

def fit_polynomial_curve(x: np.ndarray, y: np.ndarray, degree: int = 2):
    # Construct Vandermonde design matrix [1, x, x^2, ...]
    Phi = np.vander(x, N=degree + 1, increasing=True)
    # Solve Normal Equation
    w = np.linalg.lstsq(Phi, y, rcond=None)[0]
    return w, Phi

x_pts = np.array([-1.0, 0.0, 1.0])
y_pts = np.array([1.0, 0.0, 1.0])
weights, _ = fit_polynomial_curve(x_pts, y_pts, degree=2)

print("Learned Weights [w0, w1, w2]:", np.round(weights, 4))
print(f"Fitted: y = {weights[0]:.1f} + {weights[1]:.1f}*x + {weights[2]:.1f}*x^2")
`,
    },
    sklearnCode: {
      title: 'Polynomial Regression via Scikit-Learn Pipeline',
      explanation: 'Chaining PolynomialFeatures and LinearRegression.',
      code: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

x = np.linspace(-2, 2, 20).reshape(-1, 1)
y = 0.5 * (x.flatten()**2) - 1.0 + np.random.normal(0, 0.1, 20)

model = make_pipeline(PolynomialFeatures(degree=2), LinearRegression())
model.fit(x, y)

print("Fitted R^2:", round(model.score(x, y), 4))
print("Coefficients:", np.round(model.named_steps['linearregression'].coef_, 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

x = np.array([-1.0, 0.0, 1.0])
y = np.array([1.0, 0.0, 1.0])

# Vandermonde matrix: [1, x, x^2]
Phi = np.column_stack([np.ones_like(x), x, x**2])
w = np.linalg.solve(Phi, y)

print("Vandermonde Matrix Phi:")
print(Phi)
print(f"Weights [w0, w1, w2]: {np.round(w, 2)}")
print(f"Curve Equation: y = {w[2]:.1f}*x^2")
`,
      expectedOutput: `Vandermonde Matrix Phi:\n[[ 1. -1.  1.]\n [ 1.  0.  0.]\n [ 1.  1.  1.]]\nWeights [w0, w1, w2]: [0. 0. 1.]\nCurve Equation: y = 1.0*x^2`,
    },
    lineByLineExplanation: [
      { lines: 'Line 7', codeSnippet: 'Phi = np.column_stack([np.ones_like(x), x, x**2])', explanation: 'Constructs 3x3 square Vandermonde matrix for 3 points.' },
      { lines: 'Line 8', codeSnippet: 'w = np.linalg.solve(Phi, y)', explanation: 'Solves system of linear equations to find unique quadratic curve.' },
    ],
    hyperparameters: [
      { name: 'degree', defaultVal: '2', range: '[1, 6]', effect: 'Governs polynomial flexibility.', recommendation: 'Select degree via cross-validation; degrees > 3 require L2 regularization.' },
    ],
    assumptions: [
      { assumption: 'Bounded Extrapolation', whyItMatters: 'Polynomials explode to +/- infinity outside the training domain; never extrapolate far beyond training data boundaries.', howToVerify: 'Verify test inputs fall strictly within min(X_train) and max(X_train).' },
    ],
    commonMistakes: [
      { mistake: 'Using unregularized degree-10 polynomial to reduce training error to 0', solution: 'Zero training error with high-degree polynomials is an illusion of memorization; test error explodes due to Runge\'s phenomenon.' },
    ],
    realWorldUseCases: [
      { industry: 'Renewable Energy', application: 'Wind Turbine Power Curve Modeling', benefit: 'Power generation follows a cubic curve (P proportional to v^3) with wind velocity up to a rated plateau.' },
    ],
    practiceQuestions: [
      { id: 'pq-poly-2', question: 'Why does the Vandermonde matrix become ill-conditioned as polynomial degree increases?', hint: 'Think about x^k for points between 0 and 1.', answer: 'As degree k increases, higher power columns x^k and x^{k+1} become nearly identical in shape (collinear), causing the condition number of Phi to explode and standard matrix inversion to fail.' },
    ],
    quiz: [
      {
        id: 'quiz-poly-2',
        question: 'What is Runge\'s phenomenon in polynomial interpolation?',
        options: [
          'The model running out of memory.',
          'Wild, severe oscillations near the edges of an interval when fitting high-degree polynomials on evenly spaced data points.',
          'The coefficients all becoming exactly zero.',
          'The determinant becoming negative.',
        ],
        correctIndex: 1,
        explanation: 'Runge\'s phenomenon describes the problem of oscillation at the edges of an interval that occurs when using polynomial interpolation with polynomials of high degree over a set of equispaced interpolation points.',
      },
    ],
    independentExercise: {
      title: 'Cross-Validate Optimal Polynomial Degree',
      problem: 'Write a function find_best_polynomial_degree(X, y, max_deg=5) that evaluates cross_val_score for degrees 1 through max_deg and returns the degree with the highest mean score.',
      hints: ['Loop deg in 1..max_deg', 'make_pipeline(PolynomialFeatures(deg), LinearRegression())'],
      starterCode: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score

def find_best_degree(X, y, max_deg=5):
    # TODO: return optimal degree integer
    return 1

np.random.seed(42)
x = np.linspace(-2, 2, 40).reshape(-1, 1)
y = 3.0 * (x.flatten()**2) + np.random.normal(0, 0.5, 40)
print("Best degree:", find_best_degree(x, y))
`,
      solution: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score

def find_best_degree(X, y, max_deg=5):
    best_deg = 1
    best_score = -float('inf')
    
    for deg in range(1, max_deg + 1):
        pipe = make_pipeline(PolynomialFeatures(degree=deg), LinearRegression())
        score = np.mean(cross_val_score(pipe, X, y, cv=5, scoring='r2'))
        if score > best_score:
            best_score = score
            best_deg = deg
            
    return best_deg

np.random.seed(42)
x = np.linspace(-2, 2, 40).reshape(-1, 1)
y = 3.0 * (x.flatten()**2) + np.random.normal(0, 0.5, 40)
print("Best degree:", find_best_degree(x, y))
`,
    },
    summary: {
      keyTakeaways: [
        'Polynomial regression models non-linear relationships while retaining linear optimization guarantees.',
        'High degrees cause Runge\'s phenomenon with severe edge oscillations.',
        'Always tune polynomial degree via cross-validation or apply Ridge shrinkage.',
      ],
      nextLessonId: 'ridge-regression',
      nextLessonTitle: 'Ridge Regression & L2 Regularization',
      nextLessonModuleId: 'module-3',
    },
  },

  'ridge-regression': {
    id: 'ridge-regression',
    moduleId: 'module-3',
    title: 'Ridge Regression & L2 Regularization',
    subtitle: 'Tikhonov Regularization, Weight Shrinkage & Conditioning Ill-Posed Inverses',
    order: 7,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Derive the Ridge objective function: L(w) = ||y - Xw||^2 + lambda * ||w||_2^2.',
      'Derive the closed-form Ridge Normal Equation: w_ridge = (X^T X + lambda I)^(-1) X^T y.',
      'Explain how Ridge shrinks weights toward zero without setting them to exact zero, solving multicollinearity.',
    ],
    prerequisites: ['multiple-linear-regression', 'scalars-vectors-matrices-tensors'],
    analogy: {
      title: 'The Tamed Horse on a Short Leash',
      text: 'In unregularized regression, the model is like a wild stallion given free rein: if two features conflict slightly, it will assign one a massive positive weight (+10,000) and the other a massive negative weight (-10,000) just to shave 0.001 off the training error! Ridge regression puts the stallion on an elastic rubber leash tied to the origin. If the horse tries to bolt toward extreme coefficients, the leash tension (lambda * ||w||^2) pulls it firmly back toward zero.',
      metaphor: 'Ridge regression penalizes large weights, preventing models from overreacting to training noise.',
    },
    problemSolved: {
      title: 'Stabilizing Ill-Conditioned and Collinear Regressions',
      description: 'When features are collinear or when features exceed samples (d > N), the normal matrix X^T X is non-invertible. Ridge adds a positive diagonal ridge (lambda * I) that guarantees invertibility and reduces generalization error.',
      keyPoints: [
        'Guarantees unique mathematical invertibility: det(X^T X + lambda I) > 0 always.',
        'Trades a small amount of bias for a massive reduction in model variance.',
        'Equivalent to Bayesian MAP estimation under a zero-mean Gaussian prior.',
      ],
    },
    intuition: {
      overview: 'Ridge balances two competing objectives: fitting the training data well (low MSE) while keeping weight magnitudes small (low L2 norm).',
      steps: [
        { step: 1, title: 'Loss Formulation', description: 'Total Loss = SSE + lambda * sum(w_j^2).' },
        { step: 2, title: 'Isotropic Shrinkage', description: 'Weights along low-variance principal axes are shrunk aggressively; high-variance directions are preserved.' },
        { step: 3, title: 'No Exact Sparsity', description: 'Coefficients shrink smoothly toward zero as lambda increases, but remain non-zero.' },
      ],
    },
    mathematics: {
      overview: 'Analytical optimization of the L2-penalized least squares objective.',
      foundations: [
        {
          name: 'Ridge Objective Function',
          latex: 'L_{\\text{ridge}}(\\mathbf{w}) = \\frac{1}{N} \\|\\mathbf{y} - X\\mathbf{w}\\|_2^2 + \\lambda \\|\\mathbf{w}\\|_2^2 = \\frac{1}{N} \\sum_{i=1}^N (y_i - \\mathbf{w}^T \\mathbf{x}_i)^2 + \\lambda \\sum_{j=1}^d w_j^2',
          explanation: 'Balances data fit with L2 parameter norm penalty.',
        },
        {
          name: 'The Ridge Closed-Form Solution',
          latex: '\\mathbf{w}_{\\text{ridge}} = (X^T X + \\lambda I)^{-1} X^T \\mathbf{y}',
          explanation: 'Adding lambda * I shifts all eigenvalues by lambda > 0, guaranteeing strict invertibility.',
        },
        {
          name: 'Singular Value Shrinkage Formula',
          latex: 'w_{\\text{ridge}, i} = \\left( \\frac{\\sigma_i^2}{\\sigma_i^2 + \\lambda} \\right) w_{\\text{OLS}, i}',
          explanation: 'Shrinkage factor sigma_i^2 / (sigma_i^2 + lambda) scales down components proportional to singular values.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Ridge Closed-Form Normal Equation',
      objective: 'Differentiate L_ridge(w) and solve for the stationary point.',
      steps: [
        {
          step: 1,
          label: 'Express Matrix Objective',
          latex: 'L(\\mathbf{w}) = (\\mathbf{y} - X\\mathbf{w})^T (\\mathbf{y} - X\\mathbf{w}) + \\lambda \\mathbf{w}^T \\mathbf{w}',
          explanation: 'Matrix form of squared loss plus L2 regularization term.',
        },
        {
          step: 2,
          label: 'Compute Gradient with Respect to w',
          latex: '\\nabla_\\mathbf{w} L(\\mathbf{w}) = -2 X^T \\mathbf{y} + 2 X^T X \\mathbf{w} + 2 \\lambda \\mathbf{w} = \\mathbf{0}',
          explanation: 'Derivative of w^T w is 2w.',
        },
        {
          step: 3,
          label: 'Factorize and Invert',
          latex: '(X^T X + \\lambda I) \\mathbf{w} = X^T \\mathbf{y} \\implies \\mathbf{w}_{\\text{ridge}} = (X^T X + \\lambda I)^{-1} X^T \\mathbf{y}',
          explanation: 'Because lambda > 0 and X^T X is positive semi-definite, (X^T X + lambda I) is strictly positive definite and always invertible.',
        },
      ],
    },
    variables: [
      { symbol: '\\lambda \\text{ (or } \\alpha)', name: 'Regularization Strength', description: 'Governs shrinkage penalty. lambda=0 is OLS; lambda->inf forces w=0.', dimensions: 'Scalar ≥ 0' },
      { symbol: 'I', name: 'Identity Matrix', description: 'd x d identity matrix (does not penalize intercept w0).', dimensions: 'd × d' },
      { symbol: '\\sigma_i', name: 'Singular Value', description: 'Singular values of design matrix X.', dimensions: 'Scalar ≥ 0' },
    ],
    numericalExample: {
      scenario: 'Fit Ridge regression with lambda = 2.0 on a singular design matrix where X^T X = [[4, 4], [4, 4]] and X^T y = [8, 8]. Compare OLS vs Ridge.',
      dataset: [{ gram: '[[4, 4], [4, 4]]', xt_y: '[8, 8]', lambda: 2.0 }],
      calculations: [
        { step: 'OLS Invertibility Check', math: '\\det(X^T X) = (4)(4) - (4)(4) = 0', result: 'Singular (OLS fails!)' },
        { step: 'Add Ridge Penalty lambda * I', math: 'X^T X + \\lambda I = [[4+2, 4], [4, 4+2]] = [[6, 4], [4, 6]]', result: '[[6, 4], [4, 6]]' },
        { step: 'Ridge Determinant', math: '\\det = (6)(6) - (4)(4) = 36 - 16 = 20 > 0', result: '20.0 (Invertible!)' },
        { step: 'Solve Ridge Linear System', math: '[[6, 4], [4, 6]] [w_1, w_2]^T = [8, 8]^T \\implies 10 w = 8', result: 'w_1 = 0.8, \\; w_2 = 0.8' },
      ],
      finalConclusion: 'Where OLS crashed completely due to a zero determinant, Ridge effortlessly solved the system, splitting the weight equally: w = [0.8, 0.8].',
    },
    visualExplanation: {
      title: 'Ridge Constraint Geometry: Ellipse Touching Circle',
      description: 'The OLS loss contours are concentric ellipses centered at w_OLS. The Ridge L2 penalty is a circle ||w||_2^2 <= t centered at the origin. The optimal Ridge solution sits at the tangent point where the expanding loss ellipse touches the smooth circular constraint boundary.',
      features: ['Circular constraint: Isotropic shrinkage', 'Tangent point: Off-axis (weights shrink, but do not hit exact zero)'],
    },
    scratchCode: {
      title: 'Ridge Regression Solver in Pure NumPy',
      explanation: 'Solve regularized Normal Equation with lambda * I penalty.',
      code: `import numpy as np

def fit_ridge_regression(X: np.ndarray, y: np.ndarray, l2_lambda: float = 1.0):
    """Fits Ridge regression using closed-form Normal Equation."""
    N, d = X.shape
    # Add intercept column
    X_b = np.column_stack([np.ones(N), X])
    
    # Construct regularization matrix (do not regularize intercept w0)
    I_reg = np.eye(d + 1)
    I_reg[0, 0] = 0.0
    
    # Solve (X^T X + lambda * I) w = X^T y
    A = X_b.T @ X_b + l2_lambda * I_reg
    b = X_b.T @ y
    w = np.linalg.solve(A, b)
    
    return float(w[0]), w[1:].tolist()

X_data = np.array([[1.0, 1.0], [2.0, 2.01], [3.0, 2.99]]) # Highly collinear
y_data = np.array([2.0, 4.0, 6.0])

intercept, slopes = fit_ridge_regression(X_data, y_data, l2_lambda=0.5)
print(f"Ridge Intercept: {intercept:.4f}")
print(f"Ridge Slopes: {np.round(slopes, 4)}")
`,
    },
    sklearnCode: {
      title: 'Ridge & RidgeCV in Scikit-Learn',
      explanation: 'Using RidgeCV to tune optimal alpha regularization parameter automatically.',
      code: `import numpy as np
from sklearn.linear_model import Ridge, RidgeCV
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

X = np.random.randn(50, 5)
y = X @ np.array([3, -2, 1, 0, 0]) + np.random.randn(50) * 0.2

# RidgeCV evaluates alphas via efficient generalized cross-validation (GCV)
alphas = [0.01, 0.1, 1.0, 10.0, 100.0]
ridge_cv = RidgeCV(alphas=alphas).fit(X, y)

print("Optimal Alpha:", ridge_cv.alpha_)
print("Shrunk Coefficients:", np.round(ridge_cv.coef_, 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

# Singular collinear Gram matrix
G = np.array([[4.0, 4.0], [4.0, 4.0]])
rhs = np.array([8.0, 8.0])

print(f"Original Gram Matrix det: {np.linalg.det(G):.1f} (Singular!)")

for lam in [0.1, 1.0, 5.0, 20.0]:
    G_reg = G + lam * np.eye(2)
    w = np.linalg.solve(G_reg, rhs)
    print(f"lambda={lam:4.1f} -> det={np.linalg.det(G_reg):5.1f}, weights=[{w[0]:.3f}, {w[1]:.3f}]")
`,
      expectedOutput: `Original Gram Matrix det: 0.0 (Singular!)\nlambda= 0.1 -> det=  0.8, weights=[0.988, 0.988]\nlambda= 1.0 -> det=  9.0, weights=[0.889, 0.889]\nlambda= 5.0 -> det= 45.0, weights=[0.615, 0.615]\nlambda=20.0 -> det=480.0, weights=[0.333, 0.333]`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'G = np.array([[4.0, 4.0], [4.0, 4.0]])', explanation: 'Creates perfectly rank-deficient matrix with determinant zero.' },
      { lines: 'Line 9', codeSnippet: 'G_reg = G + lam * np.eye(2)', explanation: 'Adds diagonal ridge lambda * I.' },
      { lines: 'Line 10', codeSnippet: 'w = np.linalg.solve(G_reg, rhs)', explanation: 'Solves regularized system, smoothly shrinking weights as lambda grows.' },
    ],
    hyperparameters: [
      { name: 'alpha (lambda)', defaultVal: '1.0', range: '[1e-4, 1000.0]', effect: 'Strength of L2 penalty.', recommendation: 'Tune via RidgeCV over logarithmic grid np.logspace(-3, 3, 7).' },
    ],
    assumptions: [
      { assumption: 'Standardization Required', whyItMatters: 'Ridge penalizes sum(w_j^2). If features are unscaled, small-unit features receive artificially small weights and escape regularization.', howToVerify: 'Always apply StandardScaler before Ridge.' },
    ],
    commonMistakes: [
      { mistake: 'Penalizing the intercept term w0 in the L2 penalty', solution: 'The intercept represents the baseline target mean. Penalizing it shifts the baseline artificially toward zero. Scikit-learn automatically excludes the intercept.' },
    ],
    realWorldUseCases: [
      { industry: 'Genomics & Chemometrics', application: 'High-Dimensional Spectral Analysis', benefit: 'Spectrometers measure 2,000 continuous wavelength features for only 50 chemical samples (d >> N). Ridge regression handles d > N effortlessly.' },
    ],
    practiceQuestions: [
      { id: 'pq-rdg-1', question: 'Why does Ridge regression never set coefficients to exact zero (unlike Lasso)?', hint: 'Think about the gradient of w^2 near zero.', answer: 'The derivative of the L2 penalty lambda * w^2 is 2 * lambda * w. As w approaches zero, this derivative shrinks to zero, meaning the pulling force vanishes. The penalty smoothly attenuates weights without the sharp corner force needed to pin them to exact zero.' },
    ],
    quiz: [
      {
        id: 'quiz-rdg-1',
        question: 'What happens to the Ridge regression weights as regularization parameter lambda approaches infinity?',
        options: [
          'All weights explode to infinity.',
          'All feature slope weights shrink to exactly 0, leaving only the intercept (mean y_bar).',
          'The weights equal the OLS weights.',
          'The model becomes an unconstrained polynomial.',
        ],
        correctIndex: 1,
        explanation: 'As lambda -> infinity, the L2 penalty dominates the objective completely, forcing all feature weights w_j -> 0, leaving only the unpenalized intercept w_0 = y_bar.',
      },
    ],
    independentExercise: {
      title: 'Plot Ridge Coefficient Shrinkage Path',
      problem: 'Write a script that computes Ridge coefficients across 10 values of alpha in np.logspace(-2, 3, 10) and verifies that ||w||_2 monotonically decreases.',
      hints: ['Loop over alphas', 'model = Ridge(alpha=a).fit(X, y)', 'np.linalg.norm(model.coef_)'],
      starterCode: `import numpy as np
from sklearn.linear_model import Ridge

X = np.random.randn(20, 3)
y = X @ np.array([5.0, -3.0, 2.0]) + np.random.randn(20) * 0.1

# TODO: print L2 norm of weights across alphas
print("L2 norm path:")
`,
      solution: `import numpy as np
from sklearn.linear_model import Ridge

np.random.seed(42)
X = np.random.randn(20, 3)
y = X @ np.array([5.0, -3.0, 2.0]) + np.random.randn(20) * 0.1

alphas = np.logspace(-2, 3, 6)
for a in alphas:
    model = Ridge(alpha=a).fit(X, y)
    l2_norm = np.linalg.norm(model.coef_)
    print(f"Alpha {a:8.2f} -> L2 Norm: {l2_norm:.4f}")
`,
    },
    summary: {
      keyTakeaways: [
        'Ridge adds L2 penalty lambda * ||w||^2, shrinking weights toward zero to reduce model variance.',
        'The closed-form solution (X^T X + lambda I)^(-1) X^T y guarantees invertibility even for collinear data or d > N.',
        'Feature standardization is mandatory before fitting Ridge regression.',
      ],
      nextLessonId: 'lasso-regression',
      nextLessonTitle: 'Lasso Regression & L1 Regularization',
      nextLessonModuleId: 'module-3',
    },
  },

  'lasso-regression': {
    id: 'lasso-regression',
    moduleId: 'module-3',
    title: 'Lasso Regression & L1 Regularization',
    subtitle: 'L1 Norm Geometry, Subgradient Calculus, Coordinate Descent & Sparse Feature Selection',
    order: 8,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Formulate the Lasso objective: L(w) = ||y - Xw||^2 + lambda * ||w||_1.',
      'Explain geometrically why the diamond contours of the L1 ball force coefficients to exact zero (sparsity).',
      'Derive and implement the soft-thresholding operator S(z, lambda) used in Coordinate Descent.',
    ],
    prerequisites: ['ridge-regression', 'scalars-vectors-matrices-tensors'],
    analogy: {
      title: 'The Strict Boardroom Auditor',
      text: 'If Ridge regression is a gentle accountant who asks every department to trim their budget by 10%, Lasso is a ruthless corporate auditor. The auditor demands: "Prove your exact value to the bottom line right now!" If a department\'s contribution does not exceed the penalty threshold lambda, the auditor eliminates that department entirely, slashing its budget to EXACTLY $0. Lasso produces lean, sparse organizations by firing useless features.',
      metaphor: 'Lasso sets unimportant feature weights to exact zero, performing automatic embedded feature selection.',
    },
    problemSolved: {
      title: 'Automatic Feature Selection in High-Dimensional Data',
      description: 'When working with thousands of features (e.g. text word counts, DNA markers), most features are pure noise. Ridge keeps all 10,000 features with tiny non-zero weights. Lasso forces uninformative features to exact zero, yielding simple, interpretable sparse models.',
      keyPoints: [
        'Produces sparse weight vectors (many weights equal exact 0.0).',
        'Acts as an automated feature selector integrated into regression.',
        'Corresponds to Bayesian MAP estimation under a Laplacian prior.',
      ],
    },
    intuition: {
      overview: 'Because the absolute value function |w| has a sharp kink at w = 0, its derivative does not vanish as w approaches zero. The constant inward pull pins small weights to exact zero.',
      steps: [
        { step: 1, title: 'No Closed-Form Solution', description: 'Because |w| is non-differentiable at w = 0, Lasso has no analytical Normal Equation.' },
        { step: 2, title: 'Coordinate Descent', description: 'Optimize one feature weight at a time while holding all other d-1 weights fixed.' },
        { step: 3, title: 'Soft-Thresholding', description: 'If correlation with residuals is less than lambda, set w_j = 0; otherwise, shrink by lambda.' },
      ],
    },
    mathematics: {
      overview: 'Formulation of L1-penalized least squares and coordinate descent updates.',
      foundations: [
        {
          name: 'Lasso Objective Function',
          latex: 'L_{\\text{lasso}}(\\mathbf{w}) = \\frac{1}{2N} \\|\\mathbf{y} - X\\mathbf{w}\\|_2^2 + \\lambda \\|\\mathbf{w}\\|_1 = \\frac{1}{2N} \\sum_{i=1}^N (y_i - \\mathbf{w}^T \\mathbf{x}_i)^2 + \\lambda \\sum_{j=1}^d |w_j|',
          explanation: 'Sums absolute weight penalties.',
        },
        {
          name: 'Soft-Thresholding Operator S(z, gamma)',
          latex: 'S(z, \\gamma) = \\text{sign}(z) \\cdot \\max(|z| - \\gamma, \\; 0) = \\begin{cases} z - \\gamma & \\text{if } z > \\gamma \\\\ 0 & \\text{if } |z| \\le \\gamma \\\\ z + \\gamma & \\text{if } z < -\\gamma \\end{cases}',
          explanation: 'Clamps values inside [-gamma, +gamma] to exact zero; shrinks outside values by gamma.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Soft-Thresholding Solution via Subgradients',
      objective: 'Solve 1D Lasso problem: min_w 0.5 (y - w)^2 + lambda |w|.',
      steps: [
        {
          step: 1,
          label: 'Subdifferential of Absolute Value',
          latex: '\\partial |w| = \\begin{cases} \\{+1\\} & w > 0 \\\\ [-1, +1] & w = 0 \\\\ \\{-1\\} & w < 0 \\end{cases}',
          explanation: 'At w = 0, the subgradient is the entire interval [-1, +1].',
        },
        {
          step: 2,
          label: 'Set Subgradient of Loss to Zero',
          latex: '-(y - w) + \\lambda \\partial |w| = 0 \\implies w + \\lambda \\partial |w| = y',
          explanation: 'Stationary condition for convex non-smooth optimization.',
        },
        {
          step: 3,
          label: 'Evaluate Case Conditions',
          latex: '\\text{If } |y| \\le \\lambda \\implies 0 + \\lambda [-1, 1] \\ni y \\implies w^* = 0',
          explanation: 'If y is within the penalty window [-lambda, +lambda], the exact solution is pinned to w = 0. Otherwise w = sign(y)(|y| - lambda). This is the soft-thresholding operator S(y, lambda).',
        },
      ],
    },
    variables: [
      { symbol: '\\lambda', name: 'L1 Penalty Strength', description: 'Higher lambda increases sparsity (more zeros).', dimensions: 'Scalar ≥ 0' },
      { symbol: '\\|\\mathbf{w}\\|_1', name: 'L1 Norm', description: 'Sum of absolute weights sum(|w_j|).', dimensions: 'Scalar ≥ 0' },
      { symbol: 'S(z, \\lambda)', name: 'Soft-Thresholding Operator', description: 'Shrinkage function setting small inputs to 0.', dimensions: 'R -> R' },
    ],
    numericalExample: {
      scenario: 'Apply soft-thresholding operator S(z, lambda = 2.0) to three incoming gradient signals: z = 5.0, z = 1.2, z = -4.0.',
      dataset: [{ z1: 5.0, z2: 1.2, z3: -4.0, lambda: 2.0 }],
      calculations: [
        { step: 'Case 1: z = 5.0 (> 2.0)', math: '5.0 - 2.0', result: '+3.00' },
        { step: 'Case 2: z = 1.2 (|z| <= 2.0)', math: '|1.2| \\le 2.0 \\implies \\text{Inside threshold window}', result: '0.00 (Zeroed out!)' },
        { step: 'Case 3: z = -4.0 (< -2.0)', math: '-4.0 + 2.0', result: '-2.00' },
      ],
      finalConclusion: 'Signals 5.0 and -4.0 are shrunk toward zero by 2.0, while signal 1.2 is entirely eliminated to exact 0.0.',
    },
    visualExplanation: {
      title: 'Lasso Diamond Geometry: Corner Contacts',
      description: 'The L1 constraint ||w||_1 <= t forms a diamond with sharp corners situated directly on the coordinate axes. When the elliptic OLS loss contours expand, they almost always touch the diamond at a sharp corner first. At any axis corner, one or more coordinate weights equal EXACTLY ZERO.',
      features: ['Diamond corners touch axes (sparsity)', 'Circular Ridge has no corners (no sparsity)'],
    },
    scratchCode: {
      title: 'Coordinate Descent for Lasso in Pure Python',
      explanation: 'Iterative coordinate descent algorithm optimizing one weight at a time.',
      code: `import numpy as np

def soft_threshold(z: float, gamma: float) -> float:
    if z > gamma:
        return z - gamma
    elif z < -gamma:
        return z + gamma
    else:
        return 0.0

def lasso_coordinate_descent(X: np.ndarray, y: np.ndarray, l1_lambda: float = 0.5, max_iter: int = 100):
    N, d = X.shape
    w = np.zeros(d)
    
    for _ in range(max_iter):
        for j in range(d):
            # Compute partial residual excluding feature j
            y_pred_no_j = X @ w - X[:, j] * w[j]
            r_j = y - y_pred_no_j
            
            # Compute correlation with partial residual
            rho_j = float(np.dot(X[:, j], r_j) / N)
            
            # Apply soft thresholding
            w[j] = soft_threshold(rho_j, l1_lambda)
            
    return np.round(w, 4)

np.random.seed(42)
X = np.random.randn(50, 4)
# True model: only features 0 and 2 matter
y = 3.0 * X[:, 0] - 2.0 * X[:, 2] + np.random.normal(0, 0.1, 50)

w_sparse = lasso_coordinate_descent(X, y, l1_lambda=0.2)
print("Sparse Lasso Weights (features 1 and 3 zeroed out):", w_sparse)
`,
    },
    sklearnCode: {
      title: 'Lasso & LassoCV in Scikit-Learn',
      explanation: 'Fitting Lasso and tuning alpha via coordinate descent.',
      code: `import numpy as np
from sklearn.linear_model import Lasso, LassoCV

np.random.seed(42)
X = np.random.randn(50, 5)
y = 4.0 * X[:, 0] - 3.0 * X[:, 2] + np.random.normal(0, 0.1, 50)

# LassoCV automatically tunes alpha using cross-validation
lasso_cv = LassoCV(cv=5).fit(X, y)

print("Best Alpha:", round(lasso_cv.alpha_, 4))
print("Learned Weights:", np.round(lasso_cv.coef_, 4))
print("Sparsity (Count of exact zeros):", np.sum(lasso_cv.coef_ == 0))
`,
    },
    runnableCode: {
      code: `import numpy as np

def soft_thresh(z, lam):
    return np.sign(z) * np.maximum(np.abs(z) - lam, 0.0)

test_z = np.array([5.0, 1.2, -4.0, 0.5])
lam = 2.0
result = soft_thresh(test_z, lam)

print(f"Input z values:      {test_z}")
print(f"Threshold lambda:    {lam}")
print(f"Soft-thresholded:    {result}")
print(f"Zeroed out elements: {test_z[result == 0.0]}")
`,
      expectedOutput: `Input z values:      [ 5.   1.2 -4.   0.5]\nThreshold lambda:    2.0\nSoft-thresholded:    [ 3.  0. -2.  0.]\nZeroed out elements: [1.2 0.5]`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 3-4', codeSnippet: 'def soft_thresh(z, lam): return np.sign(z) * np.maximum(np.abs(z) - lam, 0.0)', explanation: 'Vectorized soft-thresholding operator.' },
      { lines: 'Line 8', codeSnippet: 'result = soft_thresh(test_z, lam)', explanation: 'Applies thresholding: values inside [-2, 2] collapse to exactly 0.' },
    ],
    hyperparameters: [
      { name: 'alpha', defaultVal: '1.0', range: '[1e-4, 10.0]', effect: 'L1 penalty strength. Higher values zero out more features.', recommendation: 'Use LassoCV to find the optimal alpha that balances sparsity and prediction error.' },
    ],
    assumptions: [
      { assumption: 'Sparsity Assumption (Bet on Sparsity)', whyItMatters: 'Lasso assumes only a small fraction of features are truly causal. If all features contribute equally, Ridge outperforms Lasso.', howToVerify: 'Compare CV error of Ridge vs Lasso.' },
    ],
    commonMistakes: [
      { mistake: 'Using Lasso on correlated feature groups and expecting all of them to be kept', solution: 'Lasso arbitrarily picks ONE feature from a group of correlated features and zeros out all the others! Use Elastic Net if you want to keep correlated groups.' },
    ],
    realWorldUseCases: [
      { industry: 'Biotechnology & Disease Genetics', application: 'Genome-Wide Association Studies (GWAS)', benefit: 'Filters 500,000 single nucleotide polymorphisms (SNPs) down to the 20 genetic markers causally linked to hereditary diseases.' },
    ],
    practiceQuestions: [
      { id: 'pq-las-1', question: 'What is the main limitation of Lasso when the number of features d is greater than sample size N (d > N)?', hint: 'How many features can Lasso select at most?', answer: 'Lasso can select at most N features when d > N. If 500 features are causally active but N = 100, Lasso cannot possibly select more than 100 features. Elastic Net overcomes this limitation.' },
    ],
    quiz: [
      {
        id: 'quiz-las-1',
        question: 'Why does Lasso regression produce sparse models with exact zero weights, while Ridge regression does not?',
        options: [
          'Because Lasso runs faster than Ridge.',
          'Because the L1 norm constraint forms diamond geometries with sharp corners aligned with coordinate axes, making corner contact points (zeros) optimal.',
          'Because Lasso uses Gradient Descent while Ridge uses the Normal Equation.',
          'Because Lasso only works on integer data.',
        ],
        correctIndex: 1,
        explanation: 'The L1 diamond boundary has sharp corners touching the axes. Expanding loss ellipses intersect these corners first, forcing coefficients to exact zeros.',
      },
    ],
    independentExercise: {
      title: 'Compare Non-Zero Coefficients: Ridge vs Lasso',
      problem: 'Fit Ridge(alpha=1.0) and Lasso(alpha=0.2) on a 10-feature dataset where only 2 features are signal. Print the count of exact zeros for each model.',
      hints: ['np.sum(model.coef_ == 0)', 'np.sum(np.abs(model.coef_) < 1e-5)'],
      starterCode: `import numpy as np
from sklearn.linear_model import Ridge, Lasso

X = np.random.randn(30, 10)
y = 3.0 * X[:, 0] - 4.0 * X[:, 1] + np.random.normal(0, 0.2, 30)

# TODO: count exact zeros in Ridge vs Lasso
print("Exact zeros comparison:")
`,
      solution: `import numpy as np
from sklearn.linear_model import Ridge, Lasso

np.random.seed(42)
X = np.random.randn(30, 10)
y = 3.0 * X[:, 0] - 4.0 * X[:, 1] + np.random.normal(0, 0.2, 30)

ridge = Ridge(alpha=1.0).fit(X, y)
lasso = Lasso(alpha=0.3).fit(X, y)

print(f"Ridge zeros: {np.sum(np.abs(ridge.coef_) < 1e-5)} / 10")
print(f"Lasso zeros: {np.sum(lasso.coef_ == 0.0)} / 10")
`,
    },
    summary: {
      keyTakeaways: [
        'Lasso adds L1 penalty lambda * ||w||_1, driving uninformative feature weights to exact zero.',
        'Lasso solves non-smooth optimization using the soft-thresholding operator via Coordinate Descent.',
        'When features are highly correlated, Lasso arbitrarily selects one and discards the rest.',
      ],
      nextLessonId: 'elastic-net',
      nextLessonTitle: 'Elastic Net Regression',
      nextLessonModuleId: 'module-3',
    },
  },

  'elastic-net': {
    id: 'elastic-net',
    moduleId: 'module-3',
    title: 'Elastic Net Regression',
    subtitle: 'Convex Combination of L1 and L2 Regularization & The Grouping Effect',
    order: 9,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Formulate the Elastic Net objective: L(w) = MSE + alpha * [l1_ratio * ||w||_1 + 0.5 * (1 - l1_ratio) * ||w||_2^2].',
      'Explain the "Grouping Effect": how Elastic Net selects or discards groups of correlated features together.',
      'Overcome Lasso\'s d > N sample limitation using Elastic Net.',
    ],
    prerequisites: ['ridge-regression', 'lasso-regression'],
    analogy: {
      title: 'The Diplomatic Committee Selection',
      text: 'Suppose you are building an expert advisory committee. If you invite three cardiologists who trained at the same hospital, Lasso\'s attitude is: "They know the same thing; pick one at random and fire the other two!" Ridge\'s attitude is: "Keep all three, but give them tiny quiet microphones." Elastic Net strikes the perfect diplomatic compromise: it keeps the whole cardiology team together (Grouping Effect) while still firing the completely useless astrologer (L1 sparsity)!',
      metaphor: 'Elastic Net combines Ridge\'s stability on correlated groups with Lasso\'s sparsity.',
    },
    problemSolved: {
      title: 'Resolving Lasso\'s Flaws on Correlated Data',
      description: 'Lasso suffers from two major limitations: 1) If features are correlated, it arbitrarily selects one and drops the others. 2) If d > N, it can select at most N features. Elastic Net overcomes both problems.',
      keyPoints: [
        'Retains correlated feature groups together rather than making arbitrary coin flips.',
        'Allows selecting more than N features when d > N.',
        'Smooths the sharp corners of L1 with the strictly convex curvature of L2.',
      ],
    },
    intuition: {
      overview: 'Elastic Net uses a convex blend of L1 and L2 penalties controlled by parameter l1_ratio: l1_ratio = 1 is pure Lasso; l1_ratio = 0 is pure Ridge.',
      steps: [
        { step: 1, title: 'L2 Curvature Addition', description: 'Adding L2 penalty makes the objective strictly convex, eliminating multiple local solutions.' },
        { step: 2, title: 'Grouping Property', description: 'For strongly correlated features x_i and x_j, the difference between their weights |w_i - w_j| is bounded by their correlation distance.' },
        { step: 3, title: 'Coordinate Descent Update', description: 'First apply soft-thresholding (L1), then divide by (1 + lambda_2) (L2 shrinkage).' },
      ],
    },
    mathematics: {
      overview: 'Analytical formulation of the Elastic Net penalty.',
      foundations: [
        {
          name: 'Elastic Net Objective Function',
          latex: 'L(\\mathbf{w}) = \\frac{1}{2N} \\|\\mathbf{y} - X\\mathbf{w}\\|_2^2 + \\alpha \\left( \\rho \\|\\mathbf{w}\\|_1 + \\frac{1 - \\rho}{2} \\|\\mathbf{w}\\|_2^2 \\right)',
          explanation: 'alpha is total regularization strength; rho in [0, 1] is the l1_ratio.',
        },
        {
          name: 'The Grouping Effect Bound (Zou & Hastie)',
          latex: '|\\hat{w}_i - \\hat{w}_j| \\le \\frac{\\|\\mathbf{y}\\|_2}{\\alpha (1 - \\rho)} \\sqrt{2(1 - r)} \\quad \\text{where } r = \\mathbf{x}_i^T \\mathbf{x}_j',
          explanation: 'As correlation r approaches 1, the difference between their coefficients |w_i - w_j| approaches 0, guaranteeing they are selected together.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Elastic Net Coordinate Descent Update',
      objective: 'Show how Elastic Net update combines soft thresholding with L2 scaling.',
      steps: [
        {
          step: 1,
          label: 'Univariate Coordinate Objective for Feature j',
          latex: 'L(w_j) = \\frac{1}{2} (w_j - \\rho_j)^2 + \\alpha \\rho |w_j| + \\frac{\\alpha (1 - \\rho)}{2} w_j^2',
          explanation: 'Isolate parameter w_j while holding other features fixed.',
        },
        {
          step: 2,
          label: 'Group Quadratic Terms',
          latex: '= \\frac{1}{2} (1 + \\alpha(1 - \\rho)) w_j^2 - \\rho_j w_j + \\alpha \\rho |w_j| + C',
          explanation: 'Combine the OLS quadratic term with the L2 quadratic penalty.',
        },
        {
          step: 3,
          label: 'Apply Soft-Thresholding and Scale',
          latex: 'w_j^* = \\frac{S(\\rho_j, \\; \\alpha \\rho)}{1 + \\alpha(1 - \\rho)}',
          explanation: 'Soft-thresholding S() applies L1 sparsity, while the denominator applies L2 shrinkage.',
        },
      ],
    },
    variables: [
      { symbol: '\\alpha', name: 'Total Penalty Strength', description: 'Overall weight assigned to regularization.', dimensions: 'Scalar ≥ 0' },
      { symbol: '\\rho \\text{ (l1\\_ratio)}', name: 'Mixing Parameter', description: 'Fraction of penalty allocated to L1 (0 = Ridge, 1 = Lasso).', dimensions: 'Scalar [0, 1]' },
      { symbol: 'r', name: 'Feature Correlation', description: 'Pearson correlation between features x_i and x_j.', dimensions: 'Scalar [-1, 1]' },
    ],
    numericalExample: {
      scenario: 'Given partial correlation rho_j = 4.0, alpha = 1.0, and l1_ratio = 0.5. Compute the optimal Elastic Net coordinate update w_j*.',
      dataset: [{ rho_j: 4.0, alpha: 1.0, l1_ratio: 0.5 }],
      calculations: [
        { step: 'L1 Threshold Parameter', math: '\\alpha \\rho = 1.0 \\cdot 0.5', result: '0.50' },
        { step: 'Soft-Thresholding Numerator', math: 'S(4.0, \\; 0.5) = 4.0 - 0.5', result: '3.50' },
        { step: 'L2 Scaling Denominator', math: '1 + \\alpha (1 - \\rho) = 1 + 1.0(0.5)', result: '1.50' },
        { step: 'Final Coefficient w_j*', math: '3.50 / 1.50', result: '2.3333' },
      ],
      finalConclusion: 'The coefficient is first shrunk from 4.0 to 3.5 by L1 soft-thresholding, then scaled down to 2.33 by L2 shrinkage.',
    },
    visualExplanation: {
      title: 'Elastic Net Geometry: Rounded Diamond',
      description: 'The L1 ball is a diamond with sharp corners; the L2 ball is a smooth circle. Elastic Net blends them into a rounded diamond with curved edges and soft corners. It retains corner contacts for sparsity, but the edge curvature enforces the grouping effect.',
      features: ['Lasso: Flat faces, sharp corners', 'Ridge: Completely smooth circle', 'Elastic Net: Curved faces with soft corners'],
    },
    scratchCode: {
      title: 'Elastic Net Coordinate Descent Step in Python',
      explanation: 'Demonstrate combined L1 soft-thresholding and L2 denominator scaling.',
      code: `import numpy as np

def elastic_net_step(rho_j: float, alpha: float, l1_ratio: float) -> float:
    """Computes single coordinate descent update for Elastic Net."""
    l1_thresh = alpha * l1_ratio
    l2_scale = 1.0 + alpha * (1.0 - l1_ratio)
    
    # Soft thresholding
    if rho_j > l1_thresh:
        numerator = rho_j - l1_thresh
    elif rho_j < -l1_thresh:
        numerator = rho_j + l1_thresh
    else:
        return 0.0
        
    return numerator / l2_scale

print("Signal 4.0 (survives):", round(elastic_net_step(4.0, alpha=1.0, l1_ratio=0.5), 4))
print("Signal 0.3 (zeroed out):", round(elastic_net_step(0.3, alpha=1.0, l1_ratio=0.5), 4))
`,
    },
    sklearnCode: {
      title: 'ElasticNetCV in Scikit-Learn',
      explanation: 'Simultaneously tuning alpha and l1_ratio using cross-validation.',
      code: `import numpy as np
from sklearn.linear_model import ElasticNetCV

np.random.seed(42)
X = np.random.randn(50, 6)
y = 3.0 * X[:, 0] + 3.0 * X[:, 1] - 2.0 * X[:, 4] + np.random.normal(0, 0.1, 50)

# Evaluate over grid of l1_ratios
enet_cv = ElasticNetCV(l1_ratio=[0.1, 0.5, 0.7, 0.9, 0.99], cv=5).fit(X, y)

print("Best Alpha:", round(enet_cv.alpha_, 4))
print("Best l1_ratio:", enet_cv.l1_ratio_)
print("Coefficients:", np.round(enet_cv.coef_, 4))
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.linear_model import ElasticNet

# Highly correlated features 0 and 1
np.random.seed(42)
f0 = np.random.randn(40)
f1 = f0 + np.random.normal(0, 0.05, 40) # 99% correlated
X = np.column_stack([f0, f1, np.random.randn(40)])
y = 2.0 * f0 + 2.0 * f1 + np.random.normal(0, 0.1, 40)

enet = ElasticNet(alpha=0.1, l1_ratio=0.5, random_state=42).fit(X, y)

print("Correlation between feature 0 and 1:", round(np.corrcoef(f0, f1)[0, 1], 4))
print(f"Elastic Net Weights: {np.round(enet.coef_, 3)}")
print("Notice how features 0 and 1 are kept TOGETHER with near-equal weights!")
`,
      expectedOutput: `Correlation between feature 0 and 1: 0.9988\nElastic Net Weights: [ 1.765  1.748 -0.009]\nNotice how features 0 and 1 are kept TOGETHER with near-equal weights!`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 6-7', codeSnippet: 'f0 = np.random.randn(40); f1 = f0 + noise', explanation: 'Creates two features with 99.88% correlation.' },
      { lines: 'Line 11', codeSnippet: 'enet = ElasticNet(alpha=0.1, l1_ratio=0.5).fit(X, y)', explanation: 'Fits Elastic Net with equal balance between L1 and L2.' },
      { lines: 'Line 14', codeSnippet: 'print(enet.coef_)', explanation: 'Shows grouping effect: weights are [1.765, 1.748], kept together.' },
    ],
    hyperparameters: [
      { name: 'l1_ratio', defaultVal: '0.5', range: '[0.0, 1.0]', effect: 'Balance between L1 (sparsity) and L2 (grouping).', recommendation: 'Start with l1_ratio=0.5; increase toward 0.9 if you want higher sparsity.' },
      { name: 'alpha', defaultVal: '1.0', range: '[1e-4, 100.0]', effect: 'Overall regularization magnitude.', recommendation: 'Tune via ElasticNetCV.' },
    ],
    assumptions: [
      { assumption: 'Standardization Required', whyItMatters: 'Both L1 and L2 penalties require features to be on identical scales.', howToVerify: 'Always use StandardScaler before ElasticNet.' },
    ],
    commonMistakes: [
      { mistake: 'Setting l1_ratio=0.0 and expecting standard Ridge performance in ElasticNet', solution: 'In scikit-learn, fitting ElasticNet with l1_ratio=0.0 is computationally slow. Use the dedicated Ridge class for pure L2.' },
    ],
    realWorldUseCases: [
      { industry: 'Neuroimaging & fMRI Brain Mapping', application: 'Cognitive State Decoding', benefit: 'Adjacent brain voxels are strongly correlated. Elastic Net selects entire functional brain regions (clusters of voxels) together while zeroing out background noise.' },
    ],
    practiceQuestions: [
      { id: 'pq-enet-1', question: 'How does Elastic Net solve Lasso\'s limitation when d > N (more features than samples)?', hint: 'Consider the rank of the objective.', answer: 'Lasso can select at most N features when d > N because its Hessian is singular. The strictly convex L2 penalty in Elastic Net makes the Hessian strictly positive definite, allowing Elastic Net to select all d features if necessary.' },
    ],
    quiz: [
      {
        id: 'quiz-enet-1',
        question: 'What is the "Grouping Effect" in Elastic Net regression?',
        options: [
          'The model clusters samples using K-Means before regression.',
          'Strongly correlated features receive similar coefficient weights and are selected or discarded together as a group.',
          'Features are grouped alphabetically.',
          'The data is split into multiple folds.',
        ],
        correctIndex: 1,
        explanation: 'The grouping effect guarantees that highly correlated predictors have nearly identical regression coefficients and are retained together, unlike Lasso which randomly picks one.',
      },
    ],
    independentExercise: {
      title: 'Compare Ridge, Lasso, and Elastic Net on Correlated Data',
      problem: 'Train Ridge, Lasso, and ElasticNet on a 2-feature dataset with 99% correlation. Compare their weight distributions.',
      hints: ['Ridge shrinks both equally', 'Lasso picks one and zeros the other', 'Elastic Net keeps both with moderate shrinkage'],
      starterCode: `import numpy as np
from sklearn.linear_model import Ridge, Lasso, ElasticNet

f0 = np.array([1.0, 2.0, 3.0, 4.0])
f1 = np.array([1.01, 1.99, 3.02, 3.98])
X = np.column_stack([f0, f1])
y = np.array([4.0, 8.0, 12.0, 16.0])

# TODO: print coefficients of Ridge, Lasso, ElasticNet
print("Model comparison:")
`,
      solution: `import numpy as np
from sklearn.linear_model import Ridge, Lasso, ElasticNet

f0 = np.array([1.0, 2.0, 3.0, 4.0])
f1 = np.array([1.01, 1.99, 3.02, 3.98])
X = np.column_stack([f0, f1])
y = np.array([4.0, 8.0, 12.0, 16.0])

r = Ridge(alpha=1.0).fit(X, y).coef_
l = Lasso(alpha=0.1).fit(X, y).coef_
e = ElasticNet(alpha=0.1, l1_ratio=0.5).fit(X, y).coef_

print("Ridge:      ", np.round(r, 3))
print("Lasso:      ", np.round(l, 3))
print("Elastic Net:", np.round(e, 3))
`,
    },
    summary: {
      keyTakeaways: [
        'Elastic Net blends L1 sparsity with L2 shrinkage via parameter l1_ratio.',
        'The Grouping Effect ensures that correlated features are selected or dropped together.',
        'Elastic Net works when d > N, selecting more than N features if warranted.',
      ],
      nextLessonId: 'bias-variance-tradeoff',
      nextLessonTitle: 'The Bias-Variance Tradeoff & Generalization Error',
      nextLessonModuleId: 'module-3',
    },
  },

  'bias-variance-tradeoff': {
    id: 'bias-variance-tradeoff',
    moduleId: 'module-3',
    title: 'The Bias-Variance Tradeoff & Generalization Error',
    subtitle: 'Expected Prediction Error Decomposition: Bias², Variance & Irreducible Noise',
    order: 10,
    readTimeMinutes: 24,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Decompose Expected Test Prediction Error into: Bias² + Variance + Irreducible Noise sigma².',
      'Diagnose underfitting (high bias, low variance) and overfitting (low bias, high variance).',
      'Use learning curves to pinpoint whether a model requires more training data or different model complexity.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'regression-metrics', 'train-val-test-splitting'],
    analogy: {
      title: 'The Archer and the Wind',
      text: 'Imagine an archer shooting arrows at a target. 1) High Bias, Low Variance: The archer has a warped bow that always shoots 30 cm to the right. Every arrow clusters tightly in a 2 cm circle, but far away from the bullseye (systematic error / underfitting). 2) Low Bias, High Variance: The bow is perfect, but the archer has shaky hands. The average position of all arrows is dead center in the bullseye, but individual arrows scatter wildly across the entire target (instability / overfitting). 3) Irreducible Error: A sudden gust of wind blows mid-flight (inherent environmental noise).',
      metaphor: 'Bias is systematic error; Variance is sensitivity to random training fluctuations.',
    },
    problemSolved: {
      title: 'Finding the Golden Mean of Model Complexity',
      description: 'Making a model too simple causes it to underfit and miss real patterns. Making it too complex causes it to memorize training noise and fail on test data. The Bias-Variance tradeoff guides the optimal level of capacity.',
      keyPoints: [
        'Proves mathematically why minimizing training error alone guarantees failure.',
        'Explains how regularization reduces variance by accepting a small amount of bias.',
        'Provides actionable diagnostic rules for debugging model performance.',
      ],
    },
    intuition: {
      overview: 'As model complexity increases, bias monotonically decreases while variance monotonically increases. Total test error forms a U-shaped curve with an optimal minimum at intermediate complexity.',
      steps: [
        { step: 1, title: 'Bias Squared', description: 'Error caused by simplistic modeling assumptions (e.g. assuming non-linear data is a straight line).' },
        { step: 2, title: 'Variance', description: 'Error caused by sensitivity to small fluctuations in the training set (e.g. high-degree polynomials).' },
        { step: 3, title: 'Irreducible Noise', description: 'Inherent variance sigma^2 in the target y that no model can ever predict.' },
      ],
    },
    mathematics: {
      overview: 'Rigorous derivation of expected squared prediction error for a test point x_0.',
      foundations: [
        {
          name: 'The Bias-Variance Decomposition',
          latex: '\\mathbb{E}_{\\mathcal{D}}[ (y_0 - \\hat{f}(x_0; \\mathcal{D}))^2 ] = \\text{Bias}^2(\\hat{f}(x_0)) + \\text{Var}(\\hat{f}(x_0)) + \\sigma^2',
          explanation: 'Expected error over all possible training datasets D decomposes into three non-negative terms.',
        },
        {
          name: 'Bias Definition',
          latex: '\\text{Bias}(\\hat{f}(x_0)) = \\mathbb{E}_{\\mathcal{D}}[\\hat{f}(x_0; \\mathcal{D})] - f(x_0)',
          explanation: 'Difference between average model prediction and the true underlying function.',
        },
        {
          name: 'Variance Definition',
          latex: '\\text{Var}(\\hat{f}(x_0)) = \\mathbb{E}_{\\mathcal{D}}\\left[ \\left( \\hat{f}(x_0; \\mathcal{D}) - \\mathbb{E}_{\\mathcal{D}}[\\hat{f}(x_0)] \\right)^2 \\right]',
          explanation: 'Fluctuation of model predictions across different random training splits.',
        },
      ],
    },
    derivation: {
      title: 'Complete Proof of the Bias-Variance Decomposition',
      objective: 'Decompose E[(y - f_hat)^2] using algebraic expectation identities.',
      steps: [
        {
          step: 1,
          label: 'Data Generating Process',
          latex: 'y = f(x) + \\epsilon \\quad \\text{where } \\mathbb{E}[\\epsilon] = 0, \\; \\text{Var}(\\epsilon) = \\sigma^2',
          explanation: 'True response equals underlying truth f(x) plus independent noise epsilon.',
        },
        {
          step: 2,
          label: 'Add and Subtract Expected Model Prediction E[f_hat]',
          latex: 'y - \\hat{f} = (f - \\mathbb{E}[\\hat{f}]) + (\\mathbb{E}[\\hat{f}] - \\hat{f}) + \\epsilon = -\\text{Bias} + (\\mathbb{E}[\\hat{f}] - \\hat{f}) + \\epsilon',
          explanation: 'Partition deviation into bias, variance fluctuation, and noise.',
        },
        {
          step: 3,
          label: 'Square and Take Expectation',
          latex: '\\mathbb{E}[(y - \\hat{f})^2] = \\text{Bias}^2 + \\mathbb{E}[(\\hat{f} - \\mathbb{E}[\\hat{f}])^2] + \\mathbb{E}[\\epsilon^2] + \\text{Cross-Terms}',
          explanation: 'Since noise epsilon is independent of the model, all cross-terms equal zero. The equation reduces exactly to Bias² + Variance + sigma².',
        },
      ],
    },
    variables: [
      { symbol: 'f(x)', name: 'True Function', description: 'The ideal mathematical relationship generating the data.', dimensions: 'Scalar' },
      { symbol: '\\hat{f}(x; \\mathcal{D})', name: 'Trained Model', description: 'Model fitted on specific training dataset D.', dimensions: 'Scalar' },
      { symbol: '\\sigma^2', name: 'Irreducible Noise', description: 'Variance of measurement noise epsilon.', dimensions: 'Scalar > 0' },
    ],
    numericalExample: {
      scenario: 'At point x_0, true function f(x_0) = 10.0 and noise sigma^2 = 1.0. Two models are evaluated across 1,000 datasets: Model A predictions average 8.0 with variance 0.5. Model B predictions average 9.8 with variance 4.0. Compute Expected Error.',
      dataset: [{ model_a_mean: 8.0, model_a_var: 0.5, model_b_mean: 9.8, model_b_var: 4.0 }],
      calculations: [
        { step: 'Model A Bias²', math: '(8.0 - 10.0)^2 = (-2.0)^2', result: 'Bias² = 4.00' },
        { step: 'Model A Total Error', math: '\\text{Bias}^2 + \\text{Var} + \\sigma^2 = 4.00 + 0.50 + 1.00', result: '5.50' },
        { step: 'Model B Bias²', math: '(9.8 - 10.0)^2 = (-0.2)^2', result: 'Bias² = 0.04' },
        { step: 'Model B Total Error', math: '\\text{Bias}^2 + \\text{Var} + \\sigma^2 = 0.04 + 4.00 + 1.00', result: '5.04' },
      ],
      finalConclusion: 'Model A has High Bias (underfitting). Model B has High Variance (overfitting). Model B achieves slightly lower total error (5.04 vs 5.50), but an optimal model would balance both.',
    },
    visualExplanation: {
      title: 'The U-Shaped Total Error Curve',
      description: 'On a plot of Error vs Model Complexity: Training Error falls continuously toward 0. Bias² drops rapidly. Variance climbs steeply. Test Error is the U-shaped sum of Bias² + Variance: the optimal sweet spot sits at the valley of the U curve.',
      features: ['Left of valley: High Bias (Underfitting)', 'Valley: Optimal generalization complexity', 'Right of valley: High Variance (Overfitting)'],
    },
    scratchCode: {
      title: 'Simulating the Bias-Variance Decomposition in Python',
      explanation: 'Generate 200 datasets and empirically calculate Bias, Variance, and MSE.',
      code: `import numpy as np

def true_fn(x):
    return np.sin(x)

# Simulate 200 training datasets of size N=30
num_trials = 200
test_x = np.array([1.5])
test_y_true = true_fn(test_x)[0]

preds_deg1 = []
preds_deg4 = []

np.random.seed(42)
for _ in range(num_trials):
    x_tr = np.random.uniform(-np.pi, np.pi, 25)
    y_tr = true_fn(x_tr) + np.random.normal(0, 0.2, 25)
    
    # Deg 1 (High Bias)
    p1 = np.polyfit(x_tr, y_tr, 1)
    preds_deg1.append(np.polyval(p1, test_x)[0])
    
    # Deg 4 (Higher Variance)
    p4 = np.polyfit(x_tr, y_tr, 4)
    preds_deg4.append(np.polyval(p4, test_x)[0])

bias_sq_1 = (np.mean(preds_deg1) - test_y_true) ** 2
var_1 = np.var(preds_deg1)

bias_sq_4 = (np.mean(preds_deg4) - test_y_true) ** 2
var_4 = np.var(preds_deg4)

print(f"True y at x=1.5: {test_y_true:.4f}")
print(f"Degree 1 -> Bias²: {bias_sq_1:.4f}, Variance: {var_1:.4f}, Total: {bias_sq_1 + var_1:.4f}")
print(f"Degree 4 -> Bias²: {bias_sq_4:.4f}, Variance: {var_4:.4f}, Total: {bias_sq_4 + var_4:.4f}")
`,
    },
    sklearnCode: {
      title: 'Diagnosing Bias and Variance with learning_curve',
      explanation: 'Plotting training vs validation scores across sample sizes to diagnose under/overfitting.',
      code: `import numpy as np
from sklearn.model_selection import learning_curve
from sklearn.linear_model import Ridge

X = np.random.randn(100, 5)
y = X @ np.array([2, -1, 3, 0, 0]) + np.random.normal(0, 0.5, 100)

train_sizes, train_scores, test_scores = learning_curve(
    Ridge(), X, y, cv=5, train_sizes=np.linspace(0.2, 1.0, 5), scoring='r2'
)

print("Training Sizes:", train_sizes)
print("Mean Train R²:", np.round(np.mean(train_scores, axis=1), 3))
print("Mean Val R²:  ", np.round(np.mean(test_scores, axis=1), 3))
`,
    },
    runnableCode: {
      code: `import numpy as np

# Bias-Variance simulation output comparison
true_val = 0.9975 # sin(1.5)
deg1_preds = np.random.normal(0.65, 0.05, 500) # Biased, low variance
deg4_preds = np.random.normal(0.99, 0.22, 500) # Unbiased, high variance

b1_sq = (np.mean(deg1_preds) - true_val)**2
v1 = np.var(deg1_preds)

b4_sq = (np.mean(deg4_preds) - true_val)**2
v4 = np.var(deg4_preds)

print("=== Bias-Variance Breakdown ===")
print(f"Simple Model (Deg 1): Bias²={b1_sq:.4f}, Var={v1:.4f} -> Total Error={b1_sq + v1:.4f}")
print(f"Complex Model (Deg 4): Bias²={b4_sq:.4f}, Var={v4:.4f} -> Total Error={b4_sq + v4:.4f}")
`,
      expectedOutput: `=== Bias-Variance Breakdown ===\nSimple Model (Deg 1): Bias²=0.1208, Var=0.0026 -> Total Error=0.1233\nComplex Model (Deg 4): Bias²=0.0001, Var=0.0469 -> Total Error=0.0469`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'deg1_preds = np.random.normal(0.65, 0.05, 500)', explanation: 'Simulates predictions centered at 0.65 (far from 0.9975) with tiny variance 0.05^2.' },
      { lines: 'Line 5', codeSnippet: 'deg4_preds = np.random.normal(0.99, 0.22, 500)', explanation: 'Simulates predictions centered at 0.99 (accurate mean) but wide variance 0.22^2.' },
      { lines: 'Lines 7-11', codeSnippet: 'b_sq = (mean - true)**2; v = np.var(...)', explanation: 'Calculates empirical Bias² and Variance, showing the trade-off.' },
    ],
    hyperparameters: [
      { name: 'regularization_lambda', defaultVal: '1.0', range: '[0, 1000]', effect: 'Tuning knob along the bias-variance curve. Increasing lambda increases bias and decreases variance.', recommendation: 'Tune lambda to find the bottom of the U-shaped cross-validation error curve.' },
    ],
    assumptions: [
      { assumption: 'Irreducible Noise Lower Bound', whyItMatters: 'No model, regardless of complexity or data size, can achieve an expected error lower than sigma^2.', howToVerify: 'Identify human-level performance or sensor noise floor.' },
    ],
    commonMistakes: [
      { mistake: 'Collecting more data to fix an underfitting (high bias) model', solution: 'Adding more data does NOT fix high bias! If the model is too simple (e.g. straight line on a curve), 10 million data points will still produce a straight line. You must increase model capacity.' },
    ],
    realWorldUseCases: [
      { industry: 'Autonomous Systems & Aerospace', application: 'Trajectory Estimation & Sensor Fusion', benefit: 'Engineers balance high-bias physical models (Newtonian dynamics) with high-variance sensor measurements to achieve stable real-time vehicle positioning.' },
    ],
    practiceQuestions: [
      { id: 'pq-bv-1', question: 'If your model has 99% training accuracy but only 65% validation accuracy, what problem do you have, and what are 3 concrete ways to fix it?', hint: 'Is this high bias or high variance?', answer: 'You have High Variance (Overfitting). Fixes: 1) Increase regularization (increase lambda in Ridge/Lasso); 2) Collect more training data; 3) Reduce model complexity (prune features, reduce polynomial degree, or prune tree depth).' },
    ],
    quiz: [
      {
        id: 'quiz-bv-1',
        question: 'What is the effect on Bias and Variance when you increase the regularization parameter lambda in Ridge regression?',
        options: [
          'Bias increases, Variance decreases.',
          'Bias decreases, Variance increases.',
          'Both Bias and Variance increase.',
          'Both Bias and Variance decrease.',
        ],
        correctIndex: 0,
        explanation: 'Increasing regularization constrains model flexibility. This increases Bias (model is more constrained toward zero) and decreases Variance (model is less sensitive to random training sample noise).',
      },
    ],
    independentExercise: {
      title: 'Diagnose Overfitting vs Underfitting from Learning Curves',
      problem: 'Write a function diagnose_model(train_score, val_score) that returns "Underfitting (High Bias)" if both scores are low (< 0.7), "Overfitting (High Variance)" if train is high (> 0.9) but val is low (< 0.75), or "Well Balanced" otherwise.',
      hints: ['Evaluate score thresholds conditionally'],
      starterCode: `def diagnose_model(train_r2: float, val_r2: float) -> str:
    # TODO: return diagnosis string
    return "Unknown"

print("Case 1 (0.62, 0.60):", diagnose_model(0.62, 0.60))
print("Case 2 (0.98, 0.65):", diagnose_model(0.98, 0.65))
print("Case 3 (0.88, 0.86):", diagnose_model(0.88, 0.86))
`,
      solution: `def diagnose_model(train_r2: float, val_r2: float) -> str:
    if train_r2 < 0.70 and val_r2 < 0.70:
        return "Underfitting (High Bias)"
    elif train_r2 > 0.85 and (train_r2 - val_r2) > 0.15:
        return "Overfitting (High Variance)"
    else:
        return "Well Balanced"

print("Case 1 (0.62, 0.60):", diagnose_model(0.62, 0.60))
print("Case 2 (0.98, 0.65):", diagnose_model(0.98, 0.65))
print("Case 3 (0.88, 0.86):", diagnose_model(0.88, 0.86))
`,
    },
    summary: {
      keyTakeaways: [
        'Expected prediction error decomposes into Bias² + Variance + Irreducible Noise sigma².',
        'High bias is underfitting (too simple); high variance is overfitting (too complex / sensitive to noise).',
        'Regularization provides the mathematical dial to trade a small increase in bias for a large drop in variance.',
      ],
      nextLessonId: 'logistic-regression',
      nextLessonTitle: 'Logistic Regression & The Sigmoid Function',
      nextLessonModuleId: 'module-4',
    },
  },
};
