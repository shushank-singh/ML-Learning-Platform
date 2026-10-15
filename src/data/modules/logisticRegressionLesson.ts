import { LessonContent } from '@/lib/types';

export const logisticRegressionLesson: LessonContent = {
  id: 'logistic-regression',
  moduleId: 'module-4',
  title: 'Logistic Regression & Maximum Likelihood Estimation',
  subtitle: 'From Odd Ratios and the Sigmoid Link to Binary Cross-Entropy Optimization',
  order: 1,
  readTimeMinutes: 26,
  difficulty: 'Beginner',
  visualizerType: 'logistic-boundary',

  analogy: {
    title: 'The Dimmer Switch & Decision Gavel',
    text: 'Ordinary regression is like a rheostat dimmer dial that can turn voltage up to 1,000V or down to -500V. But in classification, our lightbulb can only be ON (1) or OFF (0). The Sigmoid function acts like an intelligent safety fuse: no matter how extremely high or low the input score goes, it squashes the output smoothly into a calibrated probability between 0% and 100%. Then, our decision gavel hits when that probability crosses a chosen threshold (like 50%).',
    metaphor: 'Logistic regression maps unbounded linear evidence into calibrated confidence, which is then thresholded into crisp decisions.',
  },

  problemSolved: {
    title: 'Predicting Categorical Class Probabilities from Continuous Features',
    description: 'Applying linear regression to classification fails dramatically: predictions exceed [0, 1], and distant outliers distort the decision threshold. Logistic regression models the probability of class membership using the Bernoulli likelihood framework.',
    keyPoints: [
      'Constrains predictions strictly within the valid probabilistic interval [0, 1].',
      'Accommodates nonlinear probability transitions via the S-shaped sigmoid curve.',
      'Maximizes the likelihood of observing the true binary outcomes via convex log-loss.',
      'Generates calibrated posterior probabilities P(Y=1|X) crucial for cost-sensitive risk assessment.',
    ],
  },

  intuition: {
    overview: 'Instead of modeling y directly, we model the log-odds (logit) of the positive class as a linear function of features: ln(p / (1 - p)) = wᵀx + b. Solving for p yields the famous Sigmoid activation function.',
    steps: [
      {
        step: 1,
        title: 'Calculate the Linear Logit Score',
        description: 'Compute z = w₁x₁ + w₂x₂ + ... + w_d x_d + b representing net evidence for the positive class.',
      },
      {
        step: 2,
        title: 'Apply the Sigmoid Activation',
        description: 'Transform z through σ(z) = 1 / (1 + e⁻ᶻ) to convert net evidence into posterior probability P(Y=1|x).',
      },
      {
        step: 3,
        title: 'Apply the Classification Threshold',
        description: 'Predict class 1 if P(Y=1|x) ≥ τ (default 0.50), otherwise predict class 0.',
      },
    ],
  },

  mathematics: {
    overview: 'Let Y ∈ {0, 1} be a Bernoulli random variable conditioned on feature vector x. We define P(Y=1|x; w) = σ(wᵀx).',
    foundations: [
      {
        name: 'The Sigmoid (Logistic) Function',
        latex: '\\sigma(z) = \\frac{1}{1 + e^{-z}} = \\frac{e^z}{1 + e^z}',
        explanation: 'S-shaped curve with derivative σ\'(z) = σ(z)(1 - σ(z)), which makes calculus extraordinarily elegant.',
      },
      {
        name: 'Bernoulli Likelihood Function',
        latex: 'L(\\mathbf{w}) = \\prod_{i=1}^{N} \\hat{y}_i^{y_i} (1 - \\hat{y}_i)^{1 - y_i}',
        explanation: 'Joint probability of observing the N independent training labels given parameter vector w.',
      },
      {
        name: 'Binary Cross-Entropy (Negative Log Likelihood)',
        latex: 'J(\\mathbf{w}) = -\\frac{1}{N} \\sum_{i=1}^{N} \\left[ y_i \\ln(\\hat{y}_i) + (1 - y_i) \\ln(1 - \\hat{y}_i) \\right]',
        explanation: 'Taking the negative logarithm turns the product into a sum and yields a strictly convex loss surface.',
      },
    ],
  },

  derivation: {
    title: 'Derivation of the Cross-Entropy Gradient Vector',
    objective: 'Derive ∇w J(w) to enable Gradient Descent parameter updates.',
    steps: [
      {
        step: 1,
        label: 'Derivative of the Sigmoid Function',
        latex: '\\frac{d\\sigma(z)}{dz} = \\frac{d}{dz}(1 + e^{-z})^{-1} = -(1 + e^{-z})^{-2}(-e^{-z}) = \\frac{1}{1 + e^{-z}} \\cdot \\frac{e^{-z}}{1 + e^{-z}} = \\sigma(z)(1 - \\sigma(z))',
        explanation: 'The rate of change of probability peaks at z=0 (p=0.5) and decays symmetrically towards 0 at extreme evidence.',
      },
      {
        step: 2,
        label: 'Apply the Chain Rule to Cross-Entropy Loss',
        latex: '\\frac{\\partial J_i}{\\partial w_j} = \\frac{\\partial J_i}{\\partial \\hat{y}_i} \\cdot \\frac{\\partial \\hat{y}_i}{\\partial z_i} \\cdot \\frac{\\partial z_i}{\\partial w_j}',
        explanation: 'We decompose the derivative with respect to each weight w_j through intermediate variables ŷ_i and z_i.',
      },
      {
        step: 3,
        label: 'Evaluate Each Factor',
        latex: '\\frac{\\partial J_i}{\\partial \\hat{y}_i} = -\\frac{y_i}{\\hat{y}_i} + \\frac{1 - y_i}{1 - \\hat{y}_i} = \\frac{\\hat{y}_i - y_i}{\\hat{y}_i(1 - \\hat{y}_i)}, \\quad \\frac{\\partial \\hat{y}_i}{\\partial z_i} = \\hat{y}_i(1 - \\hat{y}_i), \\quad \\frac{\\partial z_i}{\\partial w_j} = x_{ij}',
        explanation: 'Remarkably, the denominator ŷ_i(1 - ŷ_i) in the loss derivative cancels exactly with the numerator from the sigmoid derivative!',
      },
      {
        step: 4,
        label: 'Combine and State the Final Vectorized Gradient',
        latex: '\\nabla_{\\mathbf{w}} J(\\mathbf{w}) = \\frac{1}{N} \\mathbf{X}^T (\\hat{\\mathbf{y}} - \\mathbf{y})',
        explanation: 'The gradient has the exact same algebraic form as Linear Regression, with ŷ replaced by the sigmoid probability σ(Xw)!',
      },
    ],
  },

  variables: [
    {
      symbol: 'z',
      name: 'Logit (Log-Odds) Evidence',
      description: 'Inner product wᵀx + b of features and parameters.',
      dimensions: 'Scalar',
    },
    {
      symbol: '\\hat{y}_i',
      name: 'Predicted Positive Probability',
      description: 'Model output probability P(Y=1|x) = σ(z).',
      dimensions: 'Scalar in (0, 1)',
    },
    {
      symbol: 'y_i',
      name: 'Binary Ground Truth',
      description: 'Observed class label: 0 (negative) or 1 (positive).',
      dimensions: '{0, 1}',
    },
    {
      symbol: '\\tau',
      name: 'Decision Threshold',
      description: 'Cutoff probability for assigning class 1. Tuning τ trades precision for recall.',
      dimensions: 'Scalar in [0, 1]',
    },
  ],

  numericalExample: {
    scenario: 'Single sample with feature x = 2.0, true label y = 1, current weight w = 0.5, and bias b = -0.2.',
    dataset: [
      { feature_x: 2.0, weight_w: 0.5, bias_b: -0.2, true_label_y: 1 },
    ],
    calculations: [
      {
        step: 'Compute Logit Score z',
        math: 'z = w \\cdot x + b = (0.5)(2.0) + (-0.2) = 1.0 - 0.2 = 0.8',
        result: 'z = 0.80',
      },
      {
        step: 'Compute Sigmoid Probability ŷ',
        math: '\\hat{y} = \\sigma(0.8) = \\frac{1}{1 + e^{-0.8}} = \\frac{1}{1 + 0.4493} = 0.6899',
        result: 'ŷ = 0.690 (69.0% probability)',
      },
      {
        step: 'Compute Log Loss Error',
        math: 'J = -[1 \\cdot \\ln(0.6899) + 0] = -(-0.3712) = 0.3712',
        result: 'Loss J = 0.3712',
      },
      {
        step: 'Compute Gradient wrt w',
        math: '\\frac{\\partial J}{\\partial w} = (\\hat{y} - y) \\cdot x = (0.6899 - 1) \\cdot 2.0 = (-0.3101) \\cdot 2.0 = -0.6202',
        result: '∂J/∂w = -0.6202',
      },
    ],
    finalConclusion: 'Since the gradient is negative (-0.6202), Gradient Descent will increase weight w (w := w - α·grad), which pushes z higher, making ŷ closer to 1.0!',
  },

  visualExplanation: {
    title: 'Visualizing 2D Decision Boundaries and Probability Contours',
    description: 'In the interactive laboratory below, adjust weights w₁, w₂, bias b, and decision threshold τ. Watch the separating boundary rotate and shift, and inspect how individual misclassified points are circled in red.',
    features: [
      'Live 2D decision boundary line w₁x₁ + w₂x₂ + b = logit(τ)',
      'Real-time accuracy and binary cross-entropy metric updates',
      'Threshold tuning slider demonstrating sensitivity adjustments',
    ],
  },

  scratchCode: {
    title: 'Vectorized Logistic Regression with Batch Gradient Descent in NumPy',
    explanation: 'Below is a scratch implementation featuring vectorized sigmoid, cross-entropy loss tracking, and gradient descent optimization.',
    code: `import numpy as np

class LogisticRegressionScratch:
    def __init__(self, lr=0.1, n_iters=1000, fit_intercept=True):
        self.lr = lr
        self.n_iters = n_iters
        self.fit_intercept = fit_intercept
        self.weights = None
        self.bias = 0.0
        self.loss_history = []

    def _sigmoid(self, z):
        # Clip z to prevent numerical overflow in exp(-z)
        z_clipped = np.clip(z, -500, 500)
        return 1.0 / (1.0 + np.exp(-z_clipped))

    def fit(self, X, y):
        N, d = X.shape
        self.weights = np.zeros(d)
        self.bias = 0.0

        for _ in range(self.n_iters):
            # Forward pass: logit and probability
            linear_model = X @ self.weights + self.bias
            y_pred = self._sigmoid(linear_model)

            # Compute cross-entropy loss
            eps = 1e-15
            y_clipped = np.clip(y_pred, eps, 1 - eps)
            loss = -np.mean(y * np.log(y_clipped) + (1 - y) * np.log(1 - y_clipped))
            self.loss_history.append(loss)

            # Gradient calculation
            dw = (1.0 / N) * (X.T @ (y_pred - y))
            db = (1.0 / N) * np.sum(y_pred - y)

            # Parameter updates
            self.weights -= self.lr * dw
            self.bias -= self.lr * db
        return self

    def predict_proba(self, X):
        return self._sigmoid(X @ self.weights + self.bias)

    def predict(self, X, threshold=0.5):
        return (self.predict_proba(X) >= threshold).astype(int)

# Quick demonstration
X_demo = np.array([[1.0, 1.0], [2.0, 2.5], [4.5, 4.0], [5.0, 5.5]])
y_demo = np.array([0, 0, 1, 1])

clf = LogisticRegressionScratch(lr=0.5, n_iters=400)
clf.fit(X_demo, y_demo)
print(f"Learned Weights: {clf.weights}")
print(f"Learned Bias: {clf.bias:.4f}")
print(f"Predictions: {clf.predict(X_demo)}")
`,
  },

  sklearnCode: {
    title: 'Scikit-Learn LogisticRegression with L2 Regularization & Class Weighting',
    explanation: 'Scikit-learn implements LogisticRegression with liblinear/lbfgs solvers, C regularization parameter, and ROC-AUC evaluation.',
    code: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.datasets import make_classification

# Generate realistic binary classification dataset
X, y = make_classification(n_samples=200, n_features=4, n_informative=3, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Instantiate with L-BFGS solver and C parameter (inverse regularization strength)
model = LogisticRegression(C=1.0, penalty='l2', solver='lbfgs', random_state=42)
model.fit(X_train, y_train)

# Evaluate predictions and probabilities
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

print("ROC AUC Score:", round(roc_auc_score(y_test, y_prob), 4))
print("\nClassification Report:\n", classification_report(y_test, y_pred))
`,
  },

  runnableCode: {
    code: `import numpy as np

# Verify Sigmoid and Cross-Entropy on small synthetic dataset
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# 4 Data samples: [x1, x2]
X = np.array([[1, 2], [2, 1], [4, 5], [5, 4]])
y = np.array([0, 0, 1, 1])

w = np.array([0.8, 0.7])
b = -4.0

z = X @ w + b
p = sigmoid(z)
loss = -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

print("Linear Logits (z):", np.round(z, 3))
print("Sigmoid Probabilities (P(Y=1)):", np.round(p, 3))
print("Initial Cross-Entropy Loss:", round(loss, 4))
print("Predictions at tau=0.5:", (p >= 0.5).astype(int))
`,
    expectedOutput: `Linear Logits (z): [-1.8 -1.9  2.7  2.8]
Sigmoid Probabilities (P(Y=1)): [0.142 0.13  0.937 0.943]
Initial Cross-Entropy Loss: 0.1009
Predictions at tau=0.5: [0 0 1 1]`,
  },

  lineByLineExplanation: [
    {
      lines: 'Lines 4-5',
      codeSnippet: 'def sigmoid(z): return 1 / (1 + np.exp(-z))',
      explanation: 'Evaluates the logistic function element-wise across the input numpy array.',
    },
    {
      lines: 'Lines 12-13',
      codeSnippet: 'z = X @ w + b',
      explanation: 'Calculates the affine transformation z = w₁x₁ + w₂x₂ + b for all N samples in a single matrix-vector product.',
    },
    {
      lines: 'Lines 14-15',
      codeSnippet: 'loss = -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))',
      explanation: 'Computes empirical cross-entropy loss by weighting log likelihoods according to true binary targets.',
    },
  ],

  hyperparameters: [
    {
      name: 'C',
      defaultVal: '1.0',
      range: 'Float (0, ∞)',
      effect: 'Inverse of regularization strength (C = 1/λ). Smaller values enforce stronger regularization, shrinking weights toward zero.',
      recommendation: 'Tune logarithmically over [1e-4, 1e-3, ..., 1e2].',
    },
    {
      name: 'penalty',
      defaultVal: "'l2'",
      range: "['l1', 'l2', 'elasticnet', None]",
      effect: "'l1' induces exact sparsity (zero weights for irrelevant features). 'l2' shrinks weights smoothly.",
      recommendation: "Use 'l2' as standard default; use 'l1' for embedded feature selection.",
    },
    {
      name: 'solver',
      defaultVal: "'lbfgs'",
      range: "['lbfgs', 'liblinear', 'saga', 'newton-cg']",
      effect: 'Optimization algorithm used to find optimal weights. SAGA supports elasticnet and large datasets.',
      recommendation: "Keep 'lbfgs' for small/medium datasets; use 'saga' for large datasets with L1/elasticnet.",
    },
  ],

  assumptions: [
    {
      assumption: 'Linearity in the Logit Scale',
      whyItMatters: 'Predictors X must have a linear relationship with the log-odds ln(p / (1 - p)).',
      howToVerify: 'Group continuous predictors into deciles and plot the empirical log-odds of each bin.',
    },
    {
      assumption: 'Absence of Severe Multicollinearity',
      whyItMatters: 'Correlated predictors produce inflated standard errors and uninterpretable odds ratios.',
      howToVerify: 'Compute Variance Inflation Factors (VIF) and correlation matrices.',
    },
    {
      assumption: 'Sufficient Sample Size per Class',
      whyItMatters: 'Extreme class rarity can lead to complete or quasi-complete separation where weights explode to infinity.',
      howToVerify: 'Verify minimum of 10-20 events per variable (EPV rule).',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Interpreting weights w_j directly as linear probability increases',
      solution: 'Weights w_j represent additive increases in log-odds. The odds ratio is e^{w_j}. A 1-unit increase in x_j multiplies odds by e^{w_j}, not probability.',
    },
    {
      mistake: 'Using default 0.50 threshold on heavily imbalanced datasets (e.g. 1% fraud)',
      solution: 'A trivial model predicting 0 always achieves 99% accuracy. Tune threshold τ using Precision-Recall curves or Cost-Benefit matrices.',
    },
  ],

  realWorldUseCases: [
    {
      industry: 'Banking & Financial Technology',
      application: 'Credit Card Fraud Scoring',
      benefit: 'Calculates real-time fraud probability with sub-millisecond inference and regulatory explainability.',
    },
    {
      industry: 'E-Commerce & SaaS',
      application: 'Customer Churn Prediction',
      benefit: 'Identifies subscribers at high risk of cancelling within 30 days to trigger retention discounts.',
    },
    {
      industry: 'Digital Marketing',
      application: 'Ad Click-Through Rate (CTR) Estimation',
      benefit: 'Powers real-time bidding auction engines ranking ad impressions by expected value.',
    },
  ],

  practiceQuestions: [
    {
      id: 'lq1',
      question: 'Why does Ordinary Least Squares with MSE fail when applied to binary classification labels y ∈ {0, 1}?',
      hint: 'Consider the shape of the error surface when combining MSE with the non-linear sigmoid function.',
      answer: 'Combining MSE with the non-linear sigmoid activation produces a non-convex loss surface littered with local minima and plateaus where gradients vanish. Binary cross-entropy with sigmoid is strictly convex, guaranteeing convergence to the global minimum.',
    },
    {
      id: 'lq2',
      question: 'If a logistic regression model has weight w_1 = 0.693 for a binary feature x_1 (e.g. "Has PhD"), what is the effect on the odds of positive outcome?',
      hint: 'Calculate e^{0.693}.',
      answer: 'e^{0.693} ≈ 2.0. Having a PhD doubles (increases by 100%) the odds of the positive outcome compared to not having a PhD, holding all other features fixed.',
    },
  ],

  quiz: [
    {
      id: 'lquiz-1',
      question: 'What is the derivative of the Sigmoid function σ(z)?',
      options: [
        'σ\'(z) = σ(z)(1 - σ(z))',
        'σ\'(z) = 1 - σ(z)',
        'σ\'(z) = σ(z)²',
        'σ\'(z) = e⁻ᶻ',
      ],
      correctIndex: 0,
      explanation: 'The derivative σ\'(z) = σ(z)(1 - σ(z)) is one of the most celebrated properties of the logistic function.',
    },
    {
      id: 'lquiz-2',
      question: 'How does decreasing the regularization parameter C in scikit-learn LogisticRegression affect model complexity?',
      options: [
        'It decreases regularization, leading to larger weights and potential overfitting.',
        'It increases regularization, shrinking weights closer to zero and reducing variance.',
        'It has no effect on regularization.',
        'It changes the threshold τ from 0.5 to 0.0.',
      ],
      correctIndex: 1,
      explanation: 'In scikit-learn, C = 1/λ. Decreasing C increases the penalty on weight magnitudes, shrinking parameters toward zero.',
    },
  ],

  independentExercise: {
    title: 'Implement Threshold Tuning to Optimize F1-Score',
    problem: 'Write a function find_optimal_threshold(y_true, y_probs) that evaluates thresholds from 0.1 to 0.9 with step 0.05 and returns the threshold that maximizes the F1-Score.',
    hints: [
      'Iterate over thresholds and compute binary predictions: y_pred = (y_probs >= t).astype(int)',
      'Calculate TP, FP, FN to compute Precision and Recall.',
      'F1 = 2 * (P * R) / (P + R + 1e-9)',
    ],
    starterCode: `import numpy as np

def find_optimal_threshold(y_true, y_probs):
    thresholds = np.arange(0.1, 0.95, 0.05)
    best_t = 0.5
    best_f1 = 0.0
    
    # TODO: loop over thresholds, compute F1, update best_t
    
    return best_t, best_f1

# Test data with imbalanced distribution
np.random.seed(42)
y_true = np.array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1])
y_probs = np.array([0.1, 0.2, 0.15, 0.35, 0.45, 0.25, 0.1, 0.4, 0.42, 0.65, 0.8, 0.9])

best_thresh, score = find_optimal_threshold(y_true, y_probs)
print(f"Optimal Threshold: {best_thresh:.2f}, Best F1: {score:.4f}")
`,
    solution: `import numpy as np

def find_optimal_threshold(y_true, y_probs):
    thresholds = np.arange(0.1, 0.95, 0.05)
    best_t = 0.5
    best_f1 = 0.0

    for t in thresholds:
        y_pred = (y_probs >= t).astype(int)
        tp = np.sum((y_pred == 1) & (y_true == 1))
        fp = np.sum((y_pred == 1) & (y_true == 0))
        fn = np.sum((y_pred == 0) & (y_true == 1))

        precision = tp / (tp + fp) if (tp + fp) > 0 else 0
        recall = tp / (tp + fn) if (tp + fn) > 0 else 0
        f1 = (2 * precision * recall) / (precision + recall) if (precision + recall) > 0 else 0

        if f1 > best_f1:
            best_f1 = f1
            best_t = t

    return best_t, best_f1

# Test data with imbalanced distribution
np.random.seed(42)
y_true = np.array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1])
y_probs = np.array([0.1, 0.2, 0.15, 0.35, 0.45, 0.25, 0.1, 0.4, 0.42, 0.65, 0.8, 0.9])

best_thresh, score = find_optimal_threshold(y_true, y_probs)
print(f"Optimal Threshold: {best_thresh:.2f}, Best F1: {score:.4f}")
`,
  },

  summary: {
    keyTakeaways: [
      'Logistic regression models the log-odds ln(p / (1 - p)) = wᵀx + b.',
      'The Sigmoid link function σ(z) guarantees predictions stay in valid probability bounds (0, 1).',
      'The Negative Log-Likelihood / Binary Cross-Entropy loss is strictly convex with no local minima.',
      'Decision threshold τ can be calibrated to meet specific business precision vs recall tradeoffs.',
    ],
    nextLessonId: 'svm',
    nextLessonTitle: 'Support Vector Machines: Maximum Margin Hyperplanes & The Kernel Trick',
    nextLessonModuleId: 'module-4',
  },
};
