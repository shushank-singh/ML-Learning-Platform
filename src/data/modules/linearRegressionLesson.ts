import { LessonContent } from '@/lib/types';

export const linearRegressionLesson: LessonContent = {
  id: 'linear-regression',
  moduleId: 'module-3',
  title: 'Simple & Multiple Linear Regression: Ordinary Least Squares (OLS)',
  subtitle: 'From the Geometry of Projections to the Normal Equation and Gradient Descent',
  order: 1,
  readTimeMinutes: 28,
  difficulty: 'Beginner',
  visualizerType: 'linear-regression',

  // 1. Real-World Analogy
  analogy: {
    title: 'The Calibrated Spring & Balance Scale',
    text: 'Imagine stretching a mechanical metal spring. Hooke\'s Law teaches us that displacement is proportional to applied force (F = k · x). In machine learning, Ordinary Least Squares works just like connecting rubber bands between each observed data point and a rigid metal ruler. Each rubber band pulls vertically on the ruler with a tension equal to its displacement error. The ruler settles naturally at the exact angle and height where the total tension energy—the sum of squared vertical distances—is mathematically minimized to equilibrium.',
    metaphor: 'The best-fitting regression line is the physical state of minimum potential energy among all rubber-band springs attached to our data points.',
  },

  // 2. What Problem Does This Algorithm Solve?
  problemSolved: {
    title: 'Predicting Continuous Real-Valued Targets from Numeric Features',
    description: 'In many real-world scenarios, we need to model and forecast continuous quantities rather than discrete categories. Simple and Multiple Linear Regression models quantify the exact relationship between one or more independent predictor features and a continuous dependent response.',
    keyPoints: [
      'Quantifies the marginal effect of each predictor while holding all other variables constant.',
      'Interpolates and extrapolates continuous target estimates with clear confidence and prediction bounds.',
      'Provides an analytically provable global optimum via the closed-form Normal Equation (no local minima).',
      'Serves as the foundational baseline against which all modern nonlinear models, gradient boosters, and deep neural networks are measured.',
    ],
  },

  // 3. Intuition and How the Algorithm Works
  intuition: {
    overview: 'Linear Regression posits that the response y is a weighted linear combination of input features X plus random Gaussian noise ε. Our goal is to discover the optimal weight vector w and intercept b that minimize the total discrepancy between reality and prediction.',
    steps: [
      {
        step: 1,
        title: 'Formulate the Linear Hypothesis',
        description: 'For any sample vector x = [x_1, x_2, ..., x_d]ᵀ, the hypothesis ŷ is calculated as ŷ = w₁x₁ + w₂x₂ + ... + w_d x_d + b.',
      },
      {
        step: 2,
        title: 'Measure Residual Errors',
        description: 'For each observation i, the residual error e_i = y_i - ŷ_i is the vertical gap between the true observation and the regression plane.',
      },
      {
        step: 3,
        title: 'Minimize the Sum of Squared Errors (SSE)',
        description: 'Squaring penalizes large deviations disproportionately and prevents positive and negative residuals from cancelling each other out.',
      },
    ],
  },

  // 4. Mathematical Foundations
  mathematics: {
    overview: 'Let our training set comprise N observations with d features each. In matrix notation, let X be an N × (d+1) design matrix (including a leading column of 1s for the bias) and y be an N × 1 vector of observed responses.',
    foundations: [
      {
        name: 'The Linear Hypothesis Model',
        latex: '\\hat{y}_i = \\mathbf{w}^T \\mathbf{x}_i + b = \\sum_{j=1}^{d} w_j x_{ij} + b',
        explanation: 'Each prediction is an affine combination of the input features weighted by the parameter vector w.',
      },
      {
        name: 'Ordinary Least Squares (OLS) Loss Objective',
        latex: 'J(\\mathbf{w}) = \\frac{1}{2N} \\sum_{i=1}^{N} (y_i - \\mathbf{w}^T \\mathbf{x}_i)^2 = \\frac{1}{2N} \\|\\mathbf{y} - \\mathbf{X}\\mathbf{w}\\|^2_2',
        explanation: 'The factor 1/2 cancels the exponent 2 during differentiation, keeping the gradient clean and standard.',
      },
      {
        name: 'Vectorized Residual Vector',
        latex: '\\mathbf{e} = \\mathbf{y} - \\mathbf{X}\\mathbf{w} \\in \\mathbb{R}^N',
        explanation: 'The difference vector between true target targets and model hyperplane projections.',
      },
    ],
  },

  // 5. Step-by-Step Mathematical Derivation
  derivation: {
    title: 'Analytical Derivation of the Normal Equation',
    objective: 'Derive the closed-form parameter vector w* that minimizes the quadratic loss J(w).',
    steps: [
      {
        step: 1,
        label: 'Expand Matrix Residual Norm',
        latex: 'J(\\mathbf{w}) = \\frac{1}{2} (\\mathbf{y} - \\mathbf{X}\\mathbf{w})^T (\\mathbf{y} - \\mathbf{X}\\mathbf{w}) = \\frac{1}{2} (\\mathbf{y}^T\\mathbf{y} - 2\\mathbf{w}^T\\mathbf{X}^T\\mathbf{y} + \\mathbf{w}^T\\mathbf{X}^T\\mathbf{X}\\mathbf{w})',
        explanation: 'We expand the inner product of the residual vector with itself. Notice that yᵀXw is a scalar, so yᵀXw = (yᵀXw)ᵀ = wᵀXᵀy.',
      },
      {
        step: 2,
        label: 'Compute Gradient with Respect to w',
        latex: '\\nabla_{\\mathbf{w}} J(\\mathbf{w}) = \\frac{\\partial}{\\partial \\mathbf{w}} \\left[ \\frac{1}{2} (\\mathbf{y}^T\\mathbf{y} - 2\\mathbf{w}^T\\mathbf{X}^T\\mathbf{y} + \\mathbf{w}^T\\mathbf{X}^T\\mathbf{X}\\mathbf{w}) \\right] = -\\mathbf{X}^T\\mathbf{y} + \\mathbf{X}^T\\mathbf{X}\\mathbf{w}',
        explanation: 'Using standard matrix calculus rules: d(aᵀw)/dw = a, and d(wᵀAw)/dw = 2Aw when A is symmetric (here XᵀX is symmetric positive semi-definite).',
      },
      {
        step: 3,
        label: 'Set the Gradient to Zero (Stationary Point)',
        latex: '-\\mathbf{X}^T\\mathbf{y} + \\mathbf{X}^T\\mathbf{X}\\mathbf{w}^* = \\mathbf{0} \\implies \\mathbf{X}^T\\mathbf{X}\\mathbf{w}^* = \\mathbf{X}^T\\mathbf{y}',
        explanation: 'This linear system XᵀXw = Xᵀy is the legendary Normal Equation. Geometrically, it implies that the residual vector (y - Xw) is orthogonal to the column space of X.',
      },
      {
        step: 4,
        label: 'Solve for Optimal Parameter Vector w*',
        latex: '\\mathbf{w}^* = (\\mathbf{X}^T\\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}',
        explanation: 'When XᵀX is full rank (invertible), multiplying both sides by (XᵀX)⁻¹ yields the unique analytical global minimum.',
      },
      {
        step: 5,
        label: 'Verify Convexity via the Hessian',
        latex: '\\mathbf{H} = \\nabla^2_{\\mathbf{w}} J(\\mathbf{w}) = \\mathbf{X}^T\\mathbf{X} \\succeq 0',
        explanation: 'For any non-zero vector v, vᵀ(XᵀX)v = ||Xv||² ≥ 0. The Hessian is positive semi-definite everywhere, proving that J(w) is strictly convex and the critical point is a global minimum.',
      },
    ],
  },

  // 6. Formula Variable Reference
  variables: [
    {
      symbol: '\\mathbf{X}',
      name: 'Design Matrix',
      description: 'Matrix containing all training input feature vectors as rows, typically augmented with a column of 1s.',
      dimensions: 'N × (d + 1)',
    },
    {
      symbol: '\\mathbf{y}',
      name: 'Target Vector',
      description: 'Continuous ground-truth values to predict.',
      dimensions: 'N × 1',
    },
    {
      symbol: '\\mathbf{w}',
      name: 'Weight / Coefficient Vector',
      description: 'Learnable parameter vector representing feature importances and slope angles.',
      dimensions: '(d + 1) × 1',
    },
    {
      symbol: '\\hat{y}_i',
      name: 'Predicted Scalar Target',
      description: 'Model estimation for the i-th observation.',
      dimensions: 'Scalar',
    },
    {
      symbol: 'e_i',
      name: 'Residual Error',
      description: 'Difference between ground truth and model prediction (y_i - ŷ_i).',
      dimensions: 'Scalar',
    },
    {
      symbol: 'R^2',
      name: 'Coefficient of Determination',
      description: 'Proportion of variance in target y explained by linear predictors X: 1 - (SS_res / SS_tot).',
      dimensions: 'Scalar in (-∞, 1]',
    },
  ],

  // 7. Small Numerical Example Solved by Hand
  numericalExample: {
    scenario: 'Calculate the optimal slope w and intercept b by hand for N = 3 simple data points: (1, 2), (2, 3), and (3, 5).',
    dataset: [
      { i: 1, x: 1, y: 2, xy: 2, x_squared: 1 },
      { i: 2, x: 2, y: 3, xy: 6, x_squared: 4 },
      { i: 3, x: 3, y: 5, xy: 15, x_squared: 9 },
    ],
    calculations: [
      {
        step: 'Compute Sample Means',
        math: '\\bar{x} = \\frac{1 + 2 + 3}{3} = 2.0, \\quad \\bar{y} = \\frac{2 + 3 + 5}{3} = 3.333',
        result: 'x̄ = 2.0, ȳ = 3.333',
      },
      {
        step: 'Compute Sum of Squares & Cross Products',
        math: '\\sum (x_i - \\bar{x})^2 = (1-2)^2 + (2-2)^2 + (3-2)^2 = 1 + 0 + 1 = 2.0',
        result: 'SS_xx = 2.0',
      },
      {
        step: 'Compute Covariance Term',
        math: '\\sum (x_i - \\bar{x})(y_i - \\bar{y}) = (-1)(-1.333) + (0)(-0.333) + (1)(1.667) = 1.333 + 1.667 = 3.0',
        result: 'SS_xy = 3.0',
      },
      {
        step: 'Calculate Slope w*',
        math: 'w^* = \\frac{SS_{xy}}{SS_{xx}} = \\frac{3.0}{2.0} = 1.5',
        result: 'w* = 1.500',
      },
      {
        step: 'Calculate Intercept b*',
        math: 'b^* = \\bar{y} - w^* \\bar{x} = 3.333 - (1.5)(2.0) = 3.333 - 3.0 = 0.333',
        result: 'b* = 0.333',
      },
    ],
    finalConclusion: 'The exact closed-form regression line is ŷ = 1.5 · x + 0.333. For x = 4, the model forecasts ŷ = 1.5(4) + 0.333 = 6.333.',
  },

  // 8. Visual Explanation Text
  visualExplanation: {
    title: 'Geometric Projection and Residual Minimization',
    description: 'In the interactive laboratory below, adjust the sample size and Gaussian noise. Observe how the green line minimizes the sum of squared red vertical bars. You can also manually adjust the hypothesis line slope and intercept to inspect the loss gap Δ between your guess and the mathematical optimum.',
    features: [
      'Live residual bars illustrating individual (y - ŷ) errors',
      'Analytical OLS calculation vs manual hypothesis comparison',
      'Real-time Mean Squared Error (MSE) and R² score feedback',
    ],
  },

  // 9. Python Implementation from Scratch (NumPy)
  scratchCode: {
    title: 'Vectorized OLS Linear Regression from Scratch in NumPy',
    explanation: 'Below is a clean, vectorized implementation of Linear Regression using the Normal Equation. It handles bias augmentation, fits optimal weights, and computes MSE and R² metrics.',
    code: `import numpy as np

class LinearRegressionScratch:
    def __init__(self, fit_intercept=True):
        self.fit_intercept = fit_intercept
        self.weights = None
        self.intercept = 0.0

    def fit(self, X, y):
        X = np.asarray(X, dtype=np.float64)
        y = np.asarray(y, dtype=np.float64).reshape(-1, 1)

        if self.fit_intercept:
            # Augment X with a column of 1s for the bias term
            ones = np.ones((X.shape[0], 1))
            X_augmented = np.hstack([ones, X])
        else:
            X_augmented = X

        # Analytical Normal Equation: w = (X^T X)^(-1) X^T y
        # We use np.linalg.pinv for numerical stability (handles singular matrices)
        XtX = X_augmented.T @ X_augmented
        XtY = X_augmented.T @ y
        beta = np.linalg.pinv(XtX) @ XtY

        if self.fit_intercept:
            self.intercept = beta[0, 0]
            self.weights = beta[1:].flatten()
        else:
            self.intercept = 0.0
            self.weights = beta.flatten()
        return self

    def predict(self, X):
        X = np.asarray(X, dtype=np.float64)
        return X @ self.weights + self.intercept

    def score(self, X, y):
        y_true = np.asarray(y, dtype=np.float64)
        y_pred = self.predict(X)
        ss_res = np.sum((y_true - y_pred) ** 2)
        ss_tot = np.sum((y_true - np.mean(y_true)) ** 2)
        return 1 - (ss_res / ss_tot)

# Verify with hand example points:
X_hand = np.array([[1], [2], [3]])
y_hand = np.array([2, 3, 5])

model = LinearRegressionScratch()
model.fit(X_hand, y_hand)
print(f"Scratch Model Slope: {model.weights[0]:.4f}")
print(f"Scratch Model Intercept: {model.intercept:.4f}")
print(f"R-squared Score: {model.score(X_hand, y_hand):.4f}")
`,
  },

  // 10. Scikit-learn Implementation
  sklearnCode: {
    title: 'Production Scikit-Learn Pipeline with Scaling & Cross-Validation',
    explanation: 'In industry applications, regression models should be encapsulated in a Pipeline with feature scaling, cross-validation, and residual diagnostics.',
    code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Generate synthetic multi-feature regression dataset
np.random.seed(42)
N = 100
X = np.random.randn(N, 3) # 3 features: area, bedrooms, age
true_weights = np.array([55.0, 20.0, -12.0])
y = X @ true_weights + 150.0 + np.random.randn(N) * 5.0

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build scikit-learn Pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('regressor', LinearRegression(fit_intercept=True))
])

# Fit pipeline
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Test MSE: {mse:.3f}")
print(f"Test R^2 Score: {r2:.3f}")
print(f"Model Learned Intercept: {pipeline.named_steps['regressor'].intercept_:.2f}")
print(f"Standardized Coefficients: {pipeline.named_steps['regressor'].coef_}")
`,
  },

  // 11. Runnable Code with Expected Output
  runnableCode: {
    code: `import numpy as np

# Verify Normal Equation vs SVD Least Squares
np.random.seed(101)
N = 50
X = np.linspace(0, 10, N).reshape(-1, 1)
true_slope = 2.5
true_intercept = 4.0
noise = np.random.normal(0, 1.2, N)
y = true_slope * X.ravel() + true_intercept + noise

# 1. Normal equation formulation
X_aug = np.hstack([np.ones((N, 1)), X])
w_normal = np.linalg.inv(X_aug.T @ X_aug) @ (X_aug.T @ y)

# 2. NumPy lstsq (QR / SVD decomposition)
w_svd, _, _, _ = np.linalg.lstsq(X_aug, y, rcond=None)

print("--- OLS Model Parameters ---")
print(f"Normal Eq: Intercept = {w_normal[0]:.4f}, Slope = {w_normal[1]:.4f}")
print(f"SVD Lstsq: Intercept = {w_svd[0]:.4f}, Slope = {w_svd[1]:.4f}")

# Compute predictions & metrics
y_hat = X_aug @ w_normal
mse = np.mean((y - y_hat) ** 2)
ss_tot = np.sum((y - np.mean(y)) ** 2)
ss_res = np.sum((y - y_hat) ** 2)
r2 = 1 - (ss_res / ss_tot)

print(f"Residual MSE: {mse:.4f}")
print(f"R-squared:    {r2:.4f}")
`,
    expectedOutput: `--- OLS Model Parameters ---
Normal Eq: Intercept = 3.9482, Slope = 2.5083
SVD Lstsq: Intercept = 3.9482, Slope = 2.5083
Residual MSE: 1.1574
R-squared:    0.9782`,
  },

  // 12. Line-by-Line Code Explanation
  lineByLineExplanation: [
    {
      lines: 'Lines 12-13',
      codeSnippet: 'X_aug = np.hstack([np.ones((N, 1)), X])',
      explanation: 'Appends a column of ones to represent the bias/intercept term b, enabling us to treat the intercept uniformly as weight w₀.',
    },
    {
      lines: 'Lines 14-15',
      codeSnippet: 'w_normal = np.linalg.inv(X_aug.T @ X_aug) @ (X_aug.T @ y)',
      explanation: 'Evaluates the exact Normal Equation (XᵀX)⁻¹Xᵀy using matrix multiplication operators (@) in NumPy.',
    },
    {
      lines: 'Lines 17-18',
      codeSnippet: 'w_svd, _, _, _ = np.linalg.lstsq(X_aug, y, rcond=None)',
      explanation: 'Industrial alternative to matrix inversion. Computes the pseudo-inverse via Singular Value Decomposition, avoiding numerical instability if XᵀX is ill-conditioned.',
    },
    {
      lines: 'Lines 26-28',
      codeSnippet: 'r2 = 1 - (ss_res / ss_tot)',
      explanation: 'Calculates the proportion of target variance explained by the model relative to a trivial baseline predictor (sample mean ȳ).',
    },
  ],

  // 13. Important Hyperparameters
  hyperparameters: [
    {
      name: 'fit_intercept',
      defaultVal: 'True',
      range: 'Boolean [True, False]',
      effect: 'Controls whether the model learns an offset bias b or forces the regression plane through the coordinate origin (0, 0).',
      recommendation: 'Always set to True unless your features and target are already strictly zero-centered.',
    },
    {
      name: 'positive',
      defaultVal: 'False',
      range: 'Boolean [True, False]',
      effect: 'Forces all learned coefficients w_j to be non-negative (Non-Negative Least Squares).',
      recommendation: 'Use when physical domains forbid negative effects (e.g., inventory pricing, counts).',
    },
    {
      name: 'copy_X',
      defaultVal: 'True',
      range: 'Boolean [True, False]',
      effect: 'If False, input matrix X may be overwritten in place during centering and computation to save memory.',
      recommendation: 'Keep True unless operating in extreme RAM-constrained environments.',
    },
  ],

  // 14. Assumptions and Limitations
  assumptions: [
    {
      assumption: 'Linearity in Parameters',
      whyItMatters: 'The relationship between target y and feature vectors must be linear with respect to coefficients w (though features can be polynomial transforms).',
      howToVerify: 'Plot residuals e_i versus predicted values ŷ_i. If a curve or pattern appears, linearity is violated.',
    },
    {
      assumption: 'Homoscedasticity (Constant Variance)',
      whyItMatters: 'The variance of the random error term Var(ε|X) = σ² must remain constant across all levels of X.',
      howToVerify: 'Inspect residual plots for funnel or fan shapes. If present, apply log or Box-Cox transformation.',
    },
    {
      assumption: 'No Severe Multicollinearity',
      whyItMatters: 'If two or more features are highly correlated, XᵀX approaches singularity, causing coefficient variances to explode and become uninterpretable.',
      howToVerify: 'Compute the Variance Inflation Factor (VIF). Values above 5 to 10 indicate problematic collinearity.',
    },
    {
      assumption: 'Normality & Independence of Residuals',
      whyItMatters: 'Required for valid hypothesis tests (t-tests, F-tests, p-values) and analytic confidence intervals.',
      howToVerify: 'Examine Quantile-Quantile (Q-Q) plots and Durbin-Watson statistics.',
    },
  ],

  // 15. Common Mistakes and Debugging Tips
  commonMistakes: [
    {
      mistake: 'Inverting XᵀX directly using np.linalg.inv() on real datasets',
      solution: 'If features are redundant or collinear, det(XᵀX) ≈ 0, yielding NaN or severe floating-point errors. Use np.linalg.pinv() or np.linalg.lstsq().',
      codeExample: '# Avoid:\nw = np.linalg.inv(X.T @ X) @ X.T @ y\n# Prefer:\nw = np.linalg.pinv(X.T @ X) @ X.T @ y',
    },
    {
      mistake: 'Evaluating training set R² alone and assuming high performance',
      solution: 'Adding arbitrary random noise features will never decrease training R². Always evaluate on held-out test sets or use Adjusted R².',
    },
    {
      mistake: 'Failing to standardize features before comparing coefficient magnitudes',
      solution: 'Feature coefficients depend directly on measurement units (e.g. centimeters vs kilometers). Standardize with StandardScaler() before ranking feature importance.',
    },
  ],

  // 16. Real-World Use Cases
  realWorldUseCases: [
    {
      industry: 'Real Estate & Property Valuation',
      application: 'Automated Valuation Models (AVMs)',
      benefit: 'Transparent marginal estimates for square footage, bedroom count, and postal district scores.',
    },
    {
      industry: 'Algorithmic Finance',
      application: 'CAPM Asset Beta Estimation',
      benefit: 'Estimates asset volatility relative to market indices via ordinary linear slope.',
    },
    {
      industry: 'Healthcare & Epidemiology',
      application: 'Dose-Response Biomarker Modeling',
      benefit: 'Statistically interpretable clinical relationships between medication dosages and patient systolic pressure.',
    },
  ],

  // 17. Practice Questions
  practiceQuestions: [
    {
      id: 'q1',
      question: 'What geometric property guarantees that the residual vector (y - Xw*) is orthogonal to the column space of design matrix X?',
      hint: 'Recall the Normal Equation Xᵀ(y - Xw*) = 0.',
      answer: 'By definition of the inner product, Xᵀe = 0 means that every column vector in matrix X has a dot product of zero with the residual vector e. Hence e lies in the left nullspace of X, which is the orthogonal complement of the column space Col(X).',
    },
    {
      id: 'q2',
      question: 'Why can R² become negative when evaluated on unseen test data?',
      hint: 'Consider what happens when the model predictions are worse than simply predicting the training target mean.',
      answer: 'R² = 1 - (SS_res / SS_tot). If the test set residual sum of squares exceeds the total variance about the test mean (which happens when a model overfits or generalizes poorly), SS_res > SS_tot, making R² negative.',
    },
    {
      id: 'q3',
      question: 'How does the time complexity of the Normal Equation compare to Gradient Descent as the number of features d grows large?',
      hint: 'Inverting an d × d matrix takes O(d³) operations.',
      answer: 'Computing (XᵀX)⁻¹ takes approximately O(d³) operations. When d exceeds 10,000, matrix inversion becomes computationally intractable and memory-prohibitive. Gradient descent scales as O(k · N · d), making it far superior for high-dimensional regimes.',
    },
  ],

  // 18. Short Quiz with Explanations
  quiz: [
    {
      id: 'quiz-1',
      question: 'Which condition guarantees that the Normal Equation XᵀXw = Xᵀy has a unique, non-singular solution?',
      options: [
        'The number of samples N must be less than the number of features d.',
        'The design matrix X must have full column rank, meaning columns are linearly independent.',
        'All features must follow a standard normal Gaussian distribution.',
        'The target variable y must be strictly non-negative.',
      ],
      correctIndex: 1,
      explanation: 'When X has full column rank (rank d), the Gram matrix XᵀX is strictly positive definite and invertible, guaranteeing a unique global minimum.',
    },
    {
      id: 'quiz-2',
      question: 'What does a high Variance Inflation Factor (VIF > 10) indicate for a regression feature?',
      options: [
        'The feature has very low variance and should be discarded as zero-variance.',
        'The feature exhibits severe multicollinearity with other predictors, causing unstable coefficients.',
        'The feature is non-linearly related to the target variable.',
        'The model is severely underfitting on this feature.',
      ],
      correctIndex: 1,
      explanation: 'VIF measures how much the variance of an estimated regression coefficient increases when features are correlated. VIF = 1 / (1 - R_j²). Values above 5 to 10 confirm problematic collinearity.',
    },
    {
      id: 'quiz-3',
      question: 'What is the gradient of the MSE loss J(w) = (1/2N) ||y - Xw||² with respect to parameter vector w?',
      options: [
        '∇ J(w) = - (1/N) Xᵀ (y - Xw)',
        '∇ J(w) = (1/N) (y - Xw)ᵀ X',
        '∇ J(w) = - (1/2N) X (y - Xw)ᵀ',
        '∇ J(w) = (XᵀX)⁻¹ y',
      ],
      correctIndex: 0,
      explanation: 'Differentiating with respect to w yields -(1/N) Xᵀ(y - Xw) = (1/N) Xᵀ(Xw - y).',
    },
  ],

  // 19. Independent Exercise
  independentExercise: {
    title: 'Implement Ridge Regularized Normal Equation from Scratch',
    problem: 'Modify the standard Normal Equation to implement Ridge Regression (L2 regularization): w* = (XᵀX + λI)⁻¹ Xᵀy. Ensure that the bias intercept term is NOT regularized (the top-left element of the penalty matrix must remain 0). Test your solution on collinear synthetic data.',
    hints: [
      'Create an identity matrix of size (d+1) × (d+1) using np.eye(X_aug.shape[1]).',
      'Set penalty_matrix[0, 0] = 0.0 so the intercept bias b is not penalized towards zero.',
      'Multiply the penalty matrix by alpha (lambda) and add it to XᵀX before inverting.',
    ],
    starterCode: `import numpy as np

def ridge_regression_normal_eq(X, y, alpha=1.0):
    """
    Computes Ridge parameters w* = (X^T X + alpha * I')^(-1) X^T y
    where I' has a 0 at (0, 0) to avoid regularizing the intercept.
    """
    N = X.shape[0]
    X_aug = np.hstack([np.ones((N, 1)), X])
    d_augmented = X_aug.shape[1]
    
    # TODO: Build regularization identity matrix penalty_matrix
    # penalty_matrix = ...
    # penalty_matrix[0, 0] = 0.0
    
    # TODO: Compute optimal beta vector
    # beta = ...
    
    intercept = 0.0
    weights = np.zeros(X.shape[1])
    return intercept, weights

# Test on correlated data
np.random.seed(42)
X_test = np.random.randn(20, 2)
X_test[:, 1] = X_test[:, 0] + np.random.randn(20) * 0.01 # Severe collinearity!
y_test = 3.0 * X_test[:, 0] + 5.0

b, w = ridge_regression_normal_eq(X_test, y_test, alpha=10.0)
print(f"Learned Intercept: {b:.4f}, Weights: {w}")
`,
    solution: `import numpy as np

def ridge_regression_normal_eq(X, y, alpha=1.0):
    N = X.shape[0]
    X_aug = np.hstack([np.ones((N, 1)), X])
    d_augmented = X_aug.shape[1]

    # Create penalty matrix: identity of size (d+1), but with 0 at (0, 0)
    penalty_matrix = np.eye(d_augmented)
    penalty_matrix[0, 0] = 0.0

    # Ridge Normal Equation: w = (X^T X + alpha * penalty)^(-1) X^T y
    XtX = X_aug.T @ X_aug
    XtY = X_aug.T @ y
    beta = np.linalg.inv(XtX + alpha * penalty_matrix) @ XtY

    intercept = beta[0]
    weights = beta[1:]
    return intercept, weights

# Test on correlated data
np.random.seed(42)
X_test = np.random.randn(20, 2)
X_test[:, 1] = X_test[:, 0] + np.random.randn(20) * 0.01 # Severe collinearity
y_test = 3.0 * X_test[:, 0] + 5.0

b, w = ridge_regression_normal_eq(X_test, y_test, alpha=10.0)
print(f"Learned Intercept: {b:.4f}, Weights: {w}")
`,
  },

  // 20. Summary and Next Lesson Bridge
  summary: {
    keyTakeaways: [
      'Ordinary Least Squares minimizes the sum of squared vertical residuals e_i = y_i - ŷ_i.',
      'The Normal Equation w* = (XᵀX)⁻¹Xᵀy delivers the exact analytical global minimum in a single step.',
      'The residual vector is geometrically orthogonal to the column space spanned by the design matrix X.',
      'When features exhibit multicollinearity or when d is very large, OLS becomes unstable; regularization (Ridge, Lasso) and Gradient Descent solve these bottlenecks.',
    ],
    nextLessonId: 'multiple-regression',
    nextLessonTitle: 'Multiple Linear Regression, Multicollinearity & Regularization (Ridge & Lasso)',
    nextLessonModuleId: 'module-3',
  },
};
