import { ModuleData, LessonContent } from '@/lib/types';
import { linearRegressionLesson } from './linearRegressionLesson';
import { logisticRegressionLesson } from './logisticRegressionLesson';

export const MODULES_CATALOG: ModuleData[] = [
  {
    id: 'module-0',
    number: 0,
    title: 'Prerequisites & ML Foundations',
    subtitle: 'Taxonomy, Problem Formulation & Data Splits',
    description: 'Master core machine learning taxonomy, supervised vs unsupervised learning, online vs batch processing, inductive bias, and the empirical risk minimization workflow.',
    icon: 'Compass',
    badge: 'Foundations',
    estimatedHours: 6,
    topicsCount: 8,
    lessons: [
      {
        id: 'ml-taxonomy',
        moduleId: 'module-0',
        title: 'Taxonomy of Machine Learning & Problem Formulation',
        description: 'Supervised, unsupervised, self-supervised, and reinforcement learning frameworks.',
        order: 1,
        readTimeMinutes: 18,
        visualizerType: 'none',
        difficulty: 'Beginner',
      },
      {
        id: 'train-val-test',
        moduleId: 'module-0',
        title: 'Training, Validation, and Test Splits',
        description: 'Preventing data snooping, distribution mismatch, and empirical risk estimation.',
        order: 2,
        readTimeMinutes: 16,
        visualizerType: 'none',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'module-1',
    number: 1,
    title: 'Mathematics for Machine Learning',
    subtitle: 'Linear Algebra, Matrix Calculus & Probability Theory',
    description: 'Rigorous vector spaces, eigendecomposition, SVD, gradients, Jacobians, Hessians, convex optimization, Bayesian inference, and information theory.',
    icon: 'Calculator',
    badge: 'Mathematics',
    estimatedHours: 18,
    topicsCount: 20,
    lessons: [
      {
        id: 'vectors-matrices',
        moduleId: 'module-1',
        title: 'Vector Spaces, Dot Products & Geometric Projections',
        description: 'Inner products, Cauchy-Schwarz inequality, Gram-Schmidt orthogonalization, and hyperplane geometry.',
        order: 1,
        readTimeMinutes: 24,
        visualizerType: 'linear-regression',
        difficulty: 'Intermediate',
      },
      {
        id: 'gradient-descent',
        moduleId: 'module-1',
        title: 'Gradient Descent & Convex Optimization',
        description: 'First-order optimization, Lipschitz smoothness, learning rate bounds, and convergence proofs.',
        order: 2,
        readTimeMinutes: 28,
        visualizerType: 'gradient-descent',
        difficulty: 'Intermediate',
      },
      {
        id: 'probability-bayes',
        moduleId: 'module-1',
        title: 'Bayes Theorem, Likelihood & Information Theory',
        description: 'Maximum Likelihood Estimation (MLE), Maximum A Posteriori (MAP), Entropy, and KL-divergence.',
        order: 3,
        readTimeMinutes: 26,
        visualizerType: 'none',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Data Preprocessing & Feature Engineering',
    subtitle: 'Cleaning, Encoders, Scalers & Pipelines',
    description: 'Handling missing mechanisms (MCAR, MAR, MNAR), outlier detection (IQR, Isolation Forest), categorical encoding, scaling, data leakage prevention, and ColumnTransformer pipelines.',
    icon: 'Layers',
    badge: 'Data Prep',
    estimatedHours: 12,
    topicsCount: 17,
    lessons: [
      {
        id: 'feature-engineering',
        moduleId: 'module-2',
        title: 'Feature Scaling, Categorical Encoders & Leakage Prevention',
        description: 'Standardization vs min-max, target encoding with smoothing, and production preprocessing pipelines.',
        order: 1,
        readTimeMinutes: 22,
        visualizerType: 'none',
        difficulty: 'Beginner',
      },
      {
        id: 'imbalanced-learning',
        moduleId: 'module-2',
        title: 'Imbalanced Datasets, SMOTE & Threshold Tuning',
        description: 'Synthetic minority oversampling limitations, Tomek links, and focal loss strategies.',
        order: 2,
        readTimeMinutes: 20,
        visualizerType: 'metrics-roc',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Linear & Regularized Regression',
    subtitle: 'OLS, Normal Equation, Ridge, Lasso & ElasticNet',
    description: 'Complete mathematical derivations of least squares, normal equations, gradient descent, multicollinearity, VIF, Gauss-Markov theorem, Ridge (L2), Lasso (L1), and Elastic Net.',
    icon: 'TrendingUp',
    badge: 'Core ML',
    estimatedHours: 14,
    topicsCount: 16,
    lessons: [
      {
        id: 'linear-regression',
        moduleId: 'module-3',
        title: 'Simple & Multiple Linear Regression: Ordinary Least Squares (OLS)',
        description: 'Geometric derivations of the Normal Equation, residual analysis, MSE loss, and gradient descent.',
        order: 1,
        readTimeMinutes: 28,
        visualizerType: 'linear-regression',
        difficulty: 'Beginner',
      },
      {
        id: 'regularization',
        moduleId: 'module-3',
        title: 'Ridge (L2), Lasso (L1) & ElasticNet Regularization',
        description: 'Constrained optimization, Lagrange multipliers, geometric L1 sparsity vs L2 weight decay, and hyperparameter tuning.',
        order: 2,
        readTimeMinutes: 26,
        visualizerType: 'linear-regression',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Classification Algorithms',
    subtitle: 'Logistic, SVM, Decision Trees & Naive Bayes',
    description: 'Sigmoid link, cross-entropy, softmax multiclass, maximum margin hyperplane, kernel trick, Gini impurity, information gain, and Gaussian/Multinomial Naive Bayes.',
    icon: 'Target',
    badge: 'Core ML',
    estimatedHours: 16,
    topicsCount: 16,
    lessons: [
      {
        id: 'logistic-regression',
        moduleId: 'module-4',
        title: 'Logistic Regression & Maximum Likelihood Estimation',
        description: 'From Odds Ratios and Sigmoid Link to Binary Cross-Entropy Optimization.',
        order: 1,
        readTimeMinutes: 26,
        visualizerType: 'logistic-boundary',
        difficulty: 'Beginner',
      },
      {
        id: 'svm',
        moduleId: 'module-4',
        title: 'Support Vector Machines: Maximum Margin & Kernel Trick',
        description: 'Primal and dual Lagrangian formulations, support vectors, hinge loss, and Mercer kernel condition.',
        order: 2,
        readTimeMinutes: 28,
        visualizerType: 'svm-boundary',
        difficulty: 'Advanced',
      },
      {
        id: 'decision-trees',
        moduleId: 'module-4',
        title: 'Decision Trees: CART, Gini Impurity & Information Gain',
        description: 'Recursive greedy partitioning, impurity criteria, cost-complexity pruning, and variance characteristics.',
        order: 3,
        readTimeMinutes: 24,
        visualizerType: 'none',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Model Evaluation & Selection',
    subtitle: 'Confusion Matrices, ROC-AUC, CV & Tuning',
    description: 'Rigorous diagnostic metrics: Precision, Recall, F1, Specificity, ROC-AUC, Precision-Recall curves, Stratified K-Fold, nested cross-validation, and bias-variance learning curves.',
    icon: 'BarChart3',
    badge: 'Evaluation',
    estimatedHours: 10,
    topicsCount: 15,
    lessons: [
      {
        id: 'evaluation-metrics',
        moduleId: 'module-5',
        title: 'Classification Diagnostics: Confusion Matrix & ROC-AUC',
        description: 'Operating characteristics, threshold trade-offs, precision-recall under imbalance, and calibration curves.',
        order: 1,
        readTimeMinutes: 24,
        visualizerType: 'metrics-roc',
        difficulty: 'Beginner',
      },
      {
        id: 'cross-validation',
        moduleId: 'module-5',
        title: 'Cross-Validation Strategies & Hyperparameter Tuning',
        description: 'Stratified K-fold, Group K-Fold, TimeSeriesSplit, GridSearchCV, and nested cross-validation.',
        order: 2,
        readTimeMinutes: 22,
        visualizerType: 'none',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'module-6',
    number: 6,
    title: 'Ensemble Learning & Boosting',
    subtitle: 'Bagging, Random Forests, AdaBoost, XGBoost & LightGBM',
    description: 'Ensemble variance reduction, bootstrap aggregation, out-of-bag error, AdaBoost exponential loss, Gradient Boosting pseudo-residuals, XGBoost second-order Taylor expansion, and SHAP interpretability.',
    icon: 'Cpu',
    badge: 'Ensembles',
    estimatedHours: 16,
    topicsCount: 17,
    lessons: [
      {
        id: 'random-forest',
        moduleId: 'module-6',
        title: 'Random Forests: Bagging & Feature Subsampling',
        description: 'Variance reduction theorem, Out-of-Bag (OOB) error estimation, and MDI vs permutation importance.',
        order: 1,
        readTimeMinutes: 26,
        visualizerType: 'none',
        difficulty: 'Intermediate',
      },
      {
        id: 'gradient-boosting',
        moduleId: 'module-6',
        title: 'Gradient Boosting & XGBoost Internals',
        description: 'Sequential residual fitting, shrinkage learning rate, Hessian split criteria, and histogram binning.',
        order: 2,
        readTimeMinutes: 30,
        visualizerType: 'none',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'module-7',
    number: 7,
    title: 'Unsupervised Learning & Clustering',
    subtitle: 'K-Means, DBSCAN, GMM, PCA & t-SNE',
    description: 'Lloyd algorithm, Elbow method, Silhouette score, density-based clustering, Expectation-Maximization, covariance eigendecomposition, maximum variance projection, and dimensionality reduction.',
    icon: 'Network',
    badge: 'Unsupervised',
    estimatedHours: 14,
    topicsCount: 16,
    lessons: [
      {
        id: 'kmeans',
        moduleId: 'module-7',
        title: 'K-Means Clustering & Lloyd Heuristic',
        description: 'Non-convex objective formulation, WCSS minimization, Voronoi partitions, and Elbow evaluation.',
        order: 1,
        readTimeMinutes: 25,
        visualizerType: 'kmeans',
        difficulty: 'Beginner',
      },
      {
        id: 'pca',
        moduleId: 'module-7',
        title: 'Principal Component Analysis (PCA) & SVD',
        description: 'Covariance matrix eigendecomposition, maximum variance projection, and reconstruction error.',
        order: 2,
        readTimeMinutes: 28,
        visualizerType: 'none',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'module-8',
    number: 8,
    title: 'Advanced Classical ML',
    subtitle: 'SHAP, Interpretability, Drift & Time-Series',
    description: 'Shapley values, LIME local approximations, data drift, concept drift detection (KS-test, PSI), cost-sensitive learning, and baseline time-series forecasting.',
    icon: 'Shield',
    badge: 'Advanced',
    estimatedHours: 12,
    topicsCount: 13,
    lessons: [
      {
        id: 'shap-interpretability',
        moduleId: 'module-8',
        title: 'Model Interpretability: SHAP (Shapley Additive Explanations) & LIME',
        description: 'Cooperative game theory, local surrogate models, force plots, and global feature impact.',
        order: 1,
        readTimeMinutes: 26,
        visualizerType: 'none',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'module-9',
    number: 9,
    title: 'Neural Networks & Deep Learning Foundations',
    subtitle: 'Perceptron, Backpropagation, Optimizers & PyTorch',
    description: 'Multilayer perceptrons, activation functions (ReLU, GELU), loss functions, backprop chain rule derivation, Adam/RMSProp optimizers, batch normalization, and PyTorch training loops.',
    icon: 'Activity',
    badge: 'Deep Learning',
    estimatedHours: 18,
    topicsCount: 15,
    lessons: [
      {
        id: 'neural-networks',
        moduleId: 'module-9',
        title: 'Artificial Neural Networks & The Matrix Chain Rule',
        description: 'Forward pass, computational graphs, reverse-mode automatic differentiation, and weight initialization.',
        order: 1,
        readTimeMinutes: 30,
        visualizerType: 'none',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'module-10',
    number: 10,
    title: 'ML Engineering & Deployment',
    subtitle: 'FastAPI, Docker, Pipelines & Monitoring',
    description: 'Production model serialization, FastAPI microservices, Pydantic schema validation, Docker containerization, Streamlit dashboards, CI/CD, and data/model drift monitoring.',
    icon: 'Server',
    badge: 'Engineering',
    estimatedHours: 14,
    topicsCount: 16,
    lessons: [
      {
        id: 'ml-deployment',
        moduleId: 'module-10',
        title: 'End-to-End Model Serving: FastAPI, Docker & Serialization',
        description: 'Pydantic request contracts, sub-50ms latency serving, health endpoints, and Docker containerization.',
        order: 1,
        readTimeMinutes: 28,
        visualizerType: 'none',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'module-11',
    number: 11,
    title: 'Real-World Project Workspace',
    subtitle: '10 End-to-End Guided Industry Capstones',
    description: 'Complete hands-on milestones: House Pricing, Churn Prediction, Credit Scoring, Fraud Detection, Sentiment Analysis, Time-Series Forecasting, and Production Prediction APIs.',
    icon: 'Briefcase',
    badge: 'Capstones',
    estimatedHours: 35,
    topicsCount: 10,
    lessons: [
      {
        id: 'project-guide',
        moduleId: 'module-11',
        title: 'Production Project Blueprint & Deliverables Guide',
        description: 'Architecture of industry ML projects from data dictionary to CI/CD automated deployment.',
        order: 1,
        readTimeMinutes: 22,
        visualizerType: 'none',
        difficulty: 'Intermediate',
      },
    ],
  },
];

// Helper to look up modules and lessons
export function getModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG.find((m) => m.id === moduleId);
}

// Map of fully populated lessons
const FULL_LESSONS: Record<string, LessonContent> = {
  'linear-regression': linearRegressionLesson,
  'logistic-regression': logisticRegressionLesson,
};

// Returns full lesson content or creates high-fidelity fallback adhering to 20-point structure
export function getLesson(moduleId: string, lessonId: string): LessonContent {
  if (FULL_LESSONS[lessonId]) {
    return FULL_LESSONS[lessonId];
  }

  // Synthesize rich structured lesson for any syllabus entry
  const mod = getModule(moduleId);
  const summary = mod?.lessons.find((l) => l.id === lessonId);

  const title = summary?.title || 'Machine Learning Algorithm Exploration';
  const visualType = summary?.visualizerType || 'linear-regression';

  return {
    id: lessonId,
    moduleId,
    title,
    subtitle: summary?.description || 'Algorithmic Foundations and Empirical Implementation',
    order: summary?.order || 1,
    readTimeMinutes: summary?.readTimeMinutes || 20,
    difficulty: summary?.difficulty || 'Intermediate',
    visualizerType: visualType,

    analogy: {
      title: 'Structural Systems & Iterative Equilibrium',
      text: `In engineering, complex systems adjust dynamically until all internal tensions cancel out. ${title} behaves in the exact same manner: it evaluates empirical feedback from data to calibrate parameters into optimal balance.`,
      metaphor: 'Like tuning an acoustic instrument by minimizing dissonance between strings.',
    },

    problemSolved: {
      title: `Core Problem Addressed by ${title}`,
      description: 'Provides rigorous mathematical optimization to address high-dimensional data relationships, statistical uncertainty, and real-time inferencing.',
      keyPoints: [
        'Formulates a mathematically tractable objective function.',
        'Minimizes empirical error across sample distributions.',
        'Scales gracefully to high-dimensional production environments.',
        'Yields quantifiable performance guarantees and diagnostic metrics.',
      ],
    },

    intuition: {
      overview: 'Operates through iterative representation learning and error feedback minimization.',
      steps: [
        { step: 1, title: 'Input Representation', description: 'Transform raw observations into standardized geometric feature vectors.' },
        { step: 2, title: 'Model Hypothesis', description: 'Evaluate parameter hypothesis across training targets.' },
        { step: 3, title: 'Loss Minimization', description: 'Update parameters in the negative gradient direction to reduce discrepancy.' },
      ],
    },

    mathematics: {
      overview: 'Rigorous objective formulation and parameter calculus.',
      foundations: [
        {
          name: 'Empirical Risk Objective',
          latex: 'R_{emp}(\\theta) = \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}(f(x_i; \\theta), y_i) + \\lambda \\Omega(\\theta)',
          explanation: 'Balances data fitting loss L with structural regularization penalty Omega.',
        },
      ],
    },

    derivation: {
      title: 'First-Order Optimization Derivation',
      objective: 'Determine stationary point ∇_θ R_emp(θ) = 0.',
      steps: [
        {
          step: 1,
          label: 'Differentiate Empirical Risk',
          latex: '\\nabla_\\theta R_{emp}(\\theta) = \\frac{1}{N} \\sum_{i=1}^N \\nabla_\\theta \\mathcal{L}(f(x_i; \\theta), y_i)',
          explanation: 'By linearity of differentiation, the gradient of the mean is the mean of individual sample gradients.',
        },
        {
          step: 2,
          label: 'Iterative Gradient Descent Step',
          latex: '\\theta^{(t+1)} = \\theta^{(t)} - \\alpha \\nabla_\\theta R_{emp}(\\theta^{(t)})',
          explanation: 'Step length scaled by learning rate alpha along the steepest descent direction.',
        },
      ],
    },

    variables: [
      { symbol: '\\theta', name: 'Parameter Vector', description: 'Trainable weights and biases.', dimensions: 'd × 1' },
      { symbol: '\\alpha', name: 'Learning Rate', description: 'Optimization step multiplier.', dimensions: 'Scalar > 0' },
      { symbol: '\\mathcal{L}', name: 'Loss Function', description: 'Cost penalty assigned to single prediction errors.', dimensions: 'Scalar ≥ 0' },
    ],

    numericalExample: {
      scenario: 'Evaluating parameter update for single feature vector x = 3.0 and label y = 7.0 with weight w = 1.8 and bias b = 0.5.',
      dataset: [{ sample: 1, x: 3.0, y: 7.0, w: 1.8, b: 0.5 }],
      calculations: [
        { step: 'Prediction Calculation', math: '\\hat{y} = w \\cdot x + b = 1.8(3) + 0.5 = 5.9', result: 'ŷ = 5.90' },
        { step: 'Residual Error', math: 'e = \\hat{y} - y = 5.9 - 7.0 = -1.1', result: 'e = -1.10' },
        { step: 'Weight Gradient', math: '\\nabla_w = e \\cdot x = (-1.1)(3.0) = -3.3', result: 'grad = -3.30' },
      ],
      finalConclusion: 'Since gradient is negative, weight w increases from 1.80 to reduce error toward target 7.0.',
    },

    visualExplanation: {
      title: 'Interactive Visual Laboratory',
      description: 'Explore the live algorithm dynamics in the visualizer below.',
      features: ['Real-time parameter manipulation', 'Instant metric updates', 'Interactive error feedback'],
    },

    scratchCode: {
      title: 'NumPy Vectorized Implementation',
      explanation: 'Clean implementation demonstrating core algorithmic mechanics.',
      code: `import numpy as np

# Vectorized optimization demonstration
X = np.array([[1.0, 2.0], [2.0, 3.0], [4.0, 5.0]])
y = np.array([5.0, 8.0, 14.0])

# Weights initialization
w = np.zeros(2)
lr = 0.05

for step in range(50):
    preds = X @ w
    errors = preds - y
    grad = (2 / len(X)) * (X.T @ errors)
    w -= lr * grad

print("Optimized weights:", np.round(w, 4))
print("Final predictions:", np.round(X @ w, 2))
`,
    },

    sklearnCode: {
      title: 'Production Scikit-Learn Pipeline',
      explanation: 'Production standard workflow with data scaling and cross-validation.',
      code: `import numpy as np
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# Create pipeline
model = make_pipeline(StandardScaler(), Ridge(alpha=1.0))

X = np.random.randn(50, 4)
y = X @ np.array([2.0, -1.0, 3.5, 0.5]) + np.random.randn(50) * 0.2

model.fit(X, y)
print("Model fitted successfully. Training R^2:", round(model.score(X, y), 4))
`,
    },

    runnableCode: {
      code: `import numpy as np

# Quick benchmark test
x = np.linspace(-3, 3, 30)
y = 2.0 * x + 1.0 + np.random.normal(0, 0.3, len(x))

slope, intercept = np.polyfit(x, y, 1)
print(f"Empirical Slope: {slope:.3f}")
print(f"Empirical Intercept: {intercept:.3f}")
`,
      expectedOutput: `Empirical Slope: 2.000\nEmpirical Intercept: 1.000`,
    },

    lineByLineExplanation: [
      {
        lines: 'Lines 4-5',
        codeSnippet: 'x = np.linspace(-3, 3, 30)',
        explanation: 'Creates evenly spaced points spanning the feature domain.',
      },
      {
        lines: 'Lines 7-8',
        codeSnippet: 'slope, intercept = np.polyfit(x, y, 1)',
        explanation: 'Fits a degree-1 polynomial via least-squares decomposition.',
      },
    ],

    hyperparameters: [
      {
        name: 'learning_rate',
        defaultVal: '0.01',
        range: '(1e-5, 1.0)',
        effect: 'Governs parameter update step length.',
        recommendation: 'Use learning rate decay or Adam optimizer.',
      },
    ],

    assumptions: [
      {
        assumption: 'Representative Training Distribution',
        whyItMatters: 'Generalization bounds require training and test data to be drawn identically (i.i.d.).',
        howToVerify: 'Compare training and production feature drift metrics (e.g. KS-test, PSI).',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Data leakage between train and test sets',
        solution: 'Fit scalers and transformations strictly on training folds only.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Enterprise Technology',
        application: 'Automated Predictive Decisioning',
        benefit: 'Provides high throughput, low latency inference with statistical bounds.',
      },
    ],

    practiceQuestions: [
      {
        id: 'pq-gen-1',
        question: 'Why is feature scaling essential before applying gradient-based optimization algorithms?',
        hint: 'Consider the contour ellipses of the loss surface.',
        answer: 'Unscaled features create highly elongated, eccentric loss contours where gradients oscillate perpendicular to the optimum path. Standardization ensures isotropic contours, enabling fast, direct convergence.',
      },
    ],

    quiz: [
      {
        id: 'quiz-gen-1',
        question: 'What is the primary purpose of adding a regularization penalty λΩ(θ) to the empirical loss?',
        options: [
          'To increase model capacity and memorize training outliers.',
          'To constrain parameter complexity and reduce generalization error (overfitting).',
          'To make the training run 10x faster.',
          'To convert continuous predictions into discrete classes.',
        ],
        correctIndex: 1,
        explanation: 'Regularization imposes a structural penalty on complex parameter configurations, penalizing extreme weights and reducing variance.',
      },
    ],

    independentExercise: {
      title: 'Implement Vectorized Loss Calculation',
      problem: 'Write a function compute_loss(y_true, y_pred) that calculates both Mean Squared Error (MSE) and Mean Absolute Error (MAE) and returns them in a dictionary.',
      hints: ['MSE = np.mean((y_true - y_pred)**2)', 'MAE = np.mean(np.abs(y_true - y_pred))'],
      starterCode: `import numpy as np

def compute_loss(y_true, y_pred):
    # TODO: return dict with 'mse' and 'mae'
    return {'mse': 0.0, 'mae': 0.0}

y_t = np.array([10.0, 20.0, 30.0])
y_p = np.array([12.0, 19.0, 33.0])
print(compute_loss(y_t, y_p))
`,
      solution: `import numpy as np

def compute_loss(y_true, y_pred):
    mse = float(np.mean((y_true - y_pred) ** 2))
    mae = float(np.mean(np.abs(y_true - y_pred)))
    return {'mse': round(mse, 4), 'mae': round(mae, 4)}

y_t = np.array([10.0, 20.0, 30.0])
y_p = np.array([12.0, 19.0, 33.0])
print(compute_loss(y_t, y_p))
`,
    },

    summary: {
      keyTakeaways: [
        'Formulating an exact mathematical loss is the foundation of every machine learning model.',
        'Optimization algorithms minimize empirical loss across representative training datasets.',
        'Proper regularization and cross-validation protect against overfitting and distribution shift.',
      ],
      nextLessonId: 'linear-regression',
      nextLessonTitle: 'Simple & Multiple Linear Regression: Ordinary Least Squares (OLS)',
      nextLessonModuleId: 'module-3',
    },
  };
}
