import { LessonContent, ModuleData } from '@/lib/types';
import { logisticRegressionLesson } from './logisticRegressionLesson';

export const module4Data: ModuleData = {
  id: 'module-4',
  number: 4,
  title: 'Classification Algorithms',
  subtitle: 'Logistic Regression, KNN, Decision Trees, Naive Bayes & Support Vector Machines',
  description: 'Master binary and multiclass classification algorithms: the Sigmoid link, Log Loss, Softmax, K-Nearest Neighbors, CART Decision Trees, Gini impurity, Naive Bayes conditional independence, SVM margin hyperplanes, the kernel trick, and Platt probability calibration.',
  icon: 'Shield',
  badge: 'Classification',
  estimatedHours: 18,
  topicsCount: 10,
  lessons: [
    {
      id: 'logistic-regression',
      moduleId: 'module-4',
      title: 'Logistic Regression & Maximum Likelihood Estimation',
      description: 'Odds ratios, the Sigmoid link function, logit transformation, and convex binary classification.',
      order: 1,
      readTimeMinutes: 26,
      visualizerType: 'logistic-boundary',
      difficulty: 'Beginner',
    },
    {
      id: 'log-loss-cross-entropy',
      moduleId: 'module-4',
      title: 'Binary Cross-Entropy & Log Loss Optimization',
      description: 'Convexity of log loss, gradient derivation nabla_w L = X^T(y_hat - y), and non-saturating gradients.',
      order: 2,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'multiclass-softmax',
      moduleId: 'module-4',
      title: 'Multiclass Classification & Softmax Regression',
      description: 'The Softmax function, Categorical Cross-Entropy, and One-vs-Rest (OvR) vs One-vs-One (OvO).',
      order: 3,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'k-nearest-neighbors',
      moduleId: 'module-4',
      title: 'K-Nearest Neighbors (KNN)',
      description: 'Non-parametric instance-based learning, Euclidean/Manhattan distance, voting schemes, and KD-Tree search.',
      order: 4,
      readTimeMinutes: 22,
      visualizerType: 'knn',
      difficulty: 'Beginner',
    },
    {
      id: 'decision-trees',
      moduleId: 'module-4',
      title: 'Decision Trees & The CART Algorithm',
      description: 'Recursive binary partitioning, orthogonal decision boundaries, maximum depth, and minimum leaf samples.',
      order: 5,
      readTimeMinutes: 25,
      visualizerType: 'decision-tree',
      difficulty: 'Beginner',
    },
    {
      id: 'gini-entropy-information-gain',
      moduleId: 'module-4',
      title: 'Gini Impurity, Entropy & Information Gain',
      description: 'Quantifying node purity: Gini 1 - sum(p_i^2), Shannon Entropy, Information Gain, and variance reduction.',
      order: 6,
      readTimeMinutes: 24,
      visualizerType: 'decision-tree',
      difficulty: 'Intermediate',
    },
    {
      id: 'naive-bayes',
      moduleId: 'module-4',
      title: 'Naive Bayes Classifiers',
      description: 'Conditional independence assumption, Gaussian NB, Multinomial NB with Laplace add-1 smoothing, and text spam classification.',
      order: 7,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'support-vector-machines',
      moduleId: 'module-4',
      title: 'Support Vector Machines (SVM) & Maximum Margin',
      description: 'Geometric margin 2/||w||, support vectors, hard vs soft margin slack variables, and Hinge Loss.',
      order: 8,
      readTimeMinutes: 28,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'svm-kernel-trick',
      moduleId: 'module-4',
      title: 'The Kernel Trick & Non-Linear SVMs',
      description: 'Mercer\'s condition, Polynomial kernels, Radial Basis Function (RBF / Gaussian) kernel, and infinite-dimensional Hilbert spaces.',
      order: 9,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
    {
      id: 'probability-calibration',
      moduleId: 'module-4',
      title: 'Probability Calibration & Reliability Diagrams',
      description: 'Assessing probability calibration, Brier score, Platt scaling (logistic sigmoid), and Isotonic regression calibration.',
      order: 10,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

export const module4Lessons: Record<string, LessonContent> = {
  'logistic-regression': logisticRegressionLesson,

  'log-loss-cross-entropy': {
    id: 'log-loss-cross-entropy',
    moduleId: 'module-4',
    title: 'Binary Cross-Entropy & Log Loss Optimization',
    subtitle: 'Convexity, Non-Saturating Gradients & Vectorized Parameter Calculus',
    order: 2,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Derive Binary Cross-Entropy (Log Loss) from the Bernoulli likelihood framework.',
      'Prove that the gradient of Log Loss with respect to weights simplifies to nabla_w L = (1/N) * X^T (y_hat - y).',
      'Explain why Mean Squared Error produces vanishing gradients when paired with Sigmoid activations, while Log Loss does not.',
    ],
    prerequisites: ['logistic-regression', 'derivatives-chain-rule', 'entropy-cross-entropy-kl-divergence'],
    analogy: {
      title: 'The High-Stakes Casino Bet',
      text: 'If you place a bet at a roulette wheel that the ball lands on Red, and you are 99% confident it will be Red (q = 0.99), but Black comes up: your loss is not merely a tiny disappointment—you bet the house and went bankrupt! Log loss measures confidence penalties: predicting 0.99 for an event that ends up being 0 incurs a near-infinite penalty (-log(0.01) = 4.6), whereas predicting 0.5 only incurs -log(0.5) = 0.69. Log loss severely punishes overconfident wrong predictions.',
      metaphor: 'Log loss is an exponential penalty on arrogance: the more confident and wrong you are, the steeper the loss.',
    },
    problemSolved: {
      title: 'Providing Non-Saturating Gradients for Classification',
      description: 'When training classifiers with Mean Squared Error (y - sigmoid(z))^2, predictions that are confidently wrong cause the sigmoid derivative sigma\'(z) to approach zero, causing gradients to vanish and stalling optimization. Log loss eliminates this stall completely.',
      keyPoints: [
        'Guarantees a strictly convex loss surface for linear decision boundaries.',
        'Yields clean gradient (y_hat - y) directly proportional to prediction error.',
        'Calibrates output values into true Bernoulli probabilities.',
      ],
    },
    intuition: {
      overview: 'Log loss takes the negative logarithm of the probability assigned to the true class: if y=1, loss is -log(y_hat); if y=0, loss is -log(1 - y_hat).',
      steps: [
        { step: 1, title: 'Single Equation Formulation', description: 'Combine both cases into a single mathematical formula using y and (1-y) as selector switches.' },
        { step: 2, title: 'Differentiate with Sigmoid', description: 'Apply the chain rule through the sigmoid link function: dL / dw = (dL / dy_hat) * (dy_hat / dz) * (dz / dw).' },
        { step: 3, title: 'Sigmoid Derivative Cancellation', description: 'The 1 / [y_hat(1 - y_hat)] term in dL/dy_hat perfectly cancels the y_hat(1 - y_hat) term in the sigmoid derivative.' },
      ],
    },
    mathematics: {
      overview: 'Formulation of Binary Cross-Entropy across N samples.',
      foundations: [
        {
          name: 'Binary Cross-Entropy (Log Loss) Formula',
          latex: 'L(\\mathbf{w}) = -\\frac{1}{N} \\sum_{i=1}^N \\left[ y_i \\log(\\hat{y}_i) + (1 - y_i) \\log(1 - \\hat{y}_i) \\right]',
          explanation: 'Average negative log-likelihood across all training instances where y_hat_i = sigma(w^T x_i).',
        },
        {
          name: 'Vectorized Gradient Formula',
          latex: '\\nabla_\\mathbf{w} L(\\mathbf{w}) = \\frac{1}{N} X^T (\\hat{\\mathbf{y}} - \\mathbf{y})',
          explanation: 'Remarkably identical in form to Ordinary Least Squares gradient, but with predictions y_hat mapped through sigmoid.',
        },
        {
          name: 'Hessian Matrix (Convexity Proof)',
          latex: 'H = \\nabla^2_\\mathbf{w} L(\\mathbf{w}) = \\frac{1}{N} X^T R X \\quad \\text{where } R_{ii} = \\hat{y}_i (1 - \\hat{y}_i) > 0',
          explanation: 'Because R is a diagonal matrix of positive variances, H is positive semi-definite everywhere, proving strict convexity.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Log Loss Gradient',
      objective: 'Differentiate L(w) = -[y log(sigma(z)) + (1-y) log(1 - sigma(z))] with respect to weight w_j.',
      steps: [
        {
          step: 1,
          label: 'Differentiate Loss with respect to Prediction y_hat',
          latex: '\\frac{\\partial L}{\\partial \\hat{y}} = -\\frac{y}{\\hat{y}} + \\frac{1 - y}{1 - \\hat{y}} = \\frac{\\hat{y} - y}{\\hat{y}(1 - \\hat{y})}',
          explanation: 'Combine fractions over the common denominator y_hat * (1 - y_hat).',
        },
        {
          step: 2,
          label: 'Differentiate Sigmoid Prediction with respect to Logit z',
          latex: '\\frac{\\partial \\hat{y}}{\\partial z} = \\hat{y}(1 - \\hat{y}) \\quad \\text{where } z = \\mathbf{w}^T \\mathbf{x}',
          explanation: 'Standard derivative property of the logistic sigmoid function.',
        },
        {
          step: 3,
          label: 'Chain Together to Cancel the Denominator',
          latex: '\\frac{\\partial L}{\\partial w_j} = \\frac{\\partial L}{\\partial \\hat{y}} \\frac{\\partial \\hat{y}}{\\partial z} \\frac{\\partial z}{\\partial w_j} = \\left( \\frac{\\hat{y} - y}{\\hat{y}(1 - \\hat{y})} \\right) \\left( \\hat{y}(1 - \\hat{y}) \\right) x_j = (\\hat{y} - y) x_j',
          explanation: 'The denominator cancels completely, yielding the clean gradient (y_hat - y) * x_j.',
        },
      ],
    },
    variables: [
      { symbol: 'y_i', name: 'Binary Ground Truth', description: 'Actual observed label: 0 or 1.', dimensions: 'Scalar in {0, 1}' },
      { symbol: '\\hat{y}_i', name: 'Predicted Probability', description: 'Model output probability P(y=1|x) = sigmoid(w^T x).', dimensions: 'Scalar (0, 1)' },
      { symbol: 'R', name: 'Weighting Diagonal Matrix', description: 'Diagonal matrix of variance weights R_ii = y_hat_i (1 - y_hat_i).', dimensions: 'N × N' },
    ],
    numericalExample: {
      scenario: 'Given single sample x = 2.0, true label y = 1, current prediction y_hat = 0.8. Compute loss L, and gradient dL/dw.',
      dataset: [{ x: 2.0, y: 1.0, y_hat: 0.8 }],
      calculations: [
        { step: 'Evaluate Log Loss L', math: '-(1 \\cdot \\ln(0.8) + 0 \\cdot \\ln(0.2)) = -(-0.2231)', result: '0.2231' },
        { step: 'Prediction Residual (y_hat - y)', math: '0.8 - 1.0 = -0.20', result: '-0.20' },
        { step: 'Weight Gradient dL/dw', math: '(\\hat{y} - y) \\cdot x = (-0.20) \\cdot (2.0)', result: '-0.40' },
        { step: 'Parameter Update (alpha = 0.1)', math: 'w_{\\text{new}} = w_{\\text{old}} - (0.1)(-0.40) = w_{\\text{old}} + 0.04', result: 'Increases weight w' },
      ],
      finalConclusion: 'Since the gradient is negative (-0.40), the weight increases, pushing future prediction y_hat closer to 1.0.',
    },
    visualExplanation: {
      title: 'Log Loss Penalty Curves for y=1 and y=0',
      description: 'When y = 1 (blue curve): as y_hat approaches 1, loss drops to 0. As y_hat approaches 0, loss shoots vertically toward infinity. When y = 0 (red curve): as y_hat approaches 0, loss drops to 0; as y_hat approaches 1, loss explodes to infinity.',
      features: ['y=1 curve: -log(y_hat)', 'y=0 curve: -log(1 - y_hat)', 'Asymmetric infinite penalty on wrong confident predictions'],
    },
    scratchCode: {
      title: 'Vectorized Binary Cross-Entropy in Pure NumPy',
      explanation: 'Numerically stable log loss with epsilon clipping to prevent log(0).',
      code: `import numpy as np

def binary_cross_entropy(y_true: np.ndarray, y_pred_prob: np.ndarray, eps: float = 1e-15):
    """Computes stable binary cross-entropy loss and gradient."""
    # Clip to prevent log(0) = -inf
    p = np.clip(y_pred_prob, eps, 1.0 - eps)
    
    # Loss formula
    loss = -np.mean(y_true * np.log(p) + (1.0 - y_true) * np.log(1.0 - p))
    return float(loss)

y_t = np.array([1.0, 0.0, 1.0, 1.0])
y_p_good = np.array([0.9, 0.1, 0.85, 0.95])
y_p_bad = np.array([0.2, 0.8, 0.1, 0.3])

print(f"Loss (Confident & Correct): {binary_cross_entropy(y_t, y_p_good):.4f}")
print(f"Loss (Confident & Wrong):   {binary_cross_entropy(y_t, y_p_bad):.4f}")
`,
    },
    sklearnCode: {
      title: 'Log Loss Evaluation in Scikit-Learn',
      explanation: 'Scikit-learn log_loss on predicted probabilities.',
      code: `import numpy as np
from sklearn.metrics import log_loss

y_true = [1, 0, 1, 1]
y_probs = [0.9, 0.1, 0.85, 0.95]

loss = log_loss(y_true, y_probs)
print(f"Scikit-Learn Log Loss: {loss:.4f}")
`,
    },
    runnableCode: {
      code: `import numpy as np

# Gradient check: dL/dw = (1/N) * X^T @ (y_hat - y)
X = np.array([[2.0], [1.0], [3.0]])
y = np.array([1.0, 0.0, 1.0])
w = 0.5

z = X.flatten() * w
y_hat = 1.0 / (1.0 + np.exp(-z))
grad = np.mean((y_hat - y) * X.flatten())

print(f"Inputs X: {X.flatten()}")
print(f"Predictions y_hat: {np.round(y_hat, 3)}")
print(f"Residuals (y_hat - y): {np.round(y_hat - y, 3)}")
print(f"Weight Gradient dL/dw: {grad:.4f}")
`,
      expectedOutput: `Inputs X: [2. 1. 3.]\nPredictions y_hat: [0.731 0.622 0.818]\nResiduals (y_hat - y): [-0.269  0.622 -0.182]\nWeight Gradient dL/dw: -0.1537`,
    },
    lineByLineExplanation: [
      { lines: 'Line 8', codeSnippet: 'y_hat = 1.0 / (1.0 + np.exp(-z))', explanation: 'Computes sigmoid probabilities for each sample.' },
      { lines: 'Line 9', codeSnippet: 'grad = np.mean((y_hat - y) * X.flatten())', explanation: 'Computes average gradient using the derived formula.' },
    ],
    hyperparameters: [
      { name: 'tol', defaultVal: '1e-4', range: '[1e-6, 1e-2]', effect: 'Stopping tolerance on loss reduction or gradient norm.', recommendation: 'Use 1e-4 for LogisticRegression with L-BFGS solver.' },
    ],
    assumptions: [
      { assumption: 'Bernoulli Distributed Targets', whyItMatters: 'Log loss is the exact negative log-likelihood derived from the Bernoulli probability mass function P(Y=y) = p^y (1-p)^(1-y).', howToVerify: 'Verify labels y in {0, 1}.' },
    ],
    commonMistakes: [
      { mistake: 'Using Mean Squared Error (MSE) to train a classification model with sigmoid activation', solution: 'MSE causes vanishing gradients because the sigmoid derivative sigma\'(z) approaches 0 for saturated predictions, causing learning to stall. Always use Log Loss (Cross-Entropy).' },
    ],
    realWorldUseCases: [
      { industry: 'Digital Advertising (Google Ads / Meta)', application: 'Click-Through Rate (CTR) Optimization', benefit: 'Optimizing Log Loss ensures calibrated probabilities: an ad predicted with 5% CTR truly gets clicked 5 times per 100 impressions.' },
    ],
    practiceQuestions: [
      { id: 'pq-ll-1', question: 'Why does the Hessian of Log Loss H = (1/N) * X^T R X guarantee that logistic regression has no local minima?', hint: 'What are the properties of matrix R?', answer: 'Matrix R is diagonal with elements R_ii = y_hat_i * (1 - y_hat_i). Since probabilities y_hat are strictly between 0 and 1, all diagonal entries of R are strictly positive. Thus, for any vector v, v^T H v = (1/N) ||R^{1/2} X v||^2 >= 0. The Hessian is positive semi-definite everywhere, proving strict convexity and the complete absence of local minima.' },
    ],
    quiz: [
      {
        id: 'quiz-ll-1',
        question: 'What is the gradient of Binary Cross-Entropy loss with respect to weight vector w?',
        options: [
          'X^T (y_hat - y)^2',
          '(1/N) * X^T (y_hat - y)',
          '(1/N) * (y_hat - y) / (y_hat * (1 - y_hat))',
          'X^T y',
        ],
        correctIndex: 1,
        explanation: 'The chain rule derivative of log loss through the sigmoid function simplifies cleanly to (1/N) * X^T (y_hat - y), as the sigmoid derivative in the numerator cancels the log-derivative denominator.',
      },
    ],
    independentExercise: {
      title: 'Implement Newton-Raphson (IRLS) for Logistic Regression',
      problem: 'Write a function irls_logistic_step(X, y, w) that computes one Iteratively Reweighted Least Squares update: w_new = w - H^(-1) * grad.',
      hints: ['p = sigmoid(X @ w)', 'R = diag(p * (1 - p))', 'H = X.T @ R @ X', 'grad = X.T @ (p - y)', 'step = np.linalg.solve(H, grad)'],
      starterCode: `import numpy as np

def irls_step(X: np.ndarray, y: np.ndarray, w: np.ndarray) -> np.ndarray:
    # TODO: compute w_new = w - H^(-1) @ grad
    return w

X = np.array([[1.0, 2.0], [1.0, -1.0], [1.0, 3.0]])
y = np.array([1.0, 0.0, 1.0])
w = np.array([0.0, 0.0])
print("Updated weights after 1 IRLS step:", irls_step(X, y, w))
`,
      solution: `import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-np.clip(z, -15, 15)))

def irls_step(X: np.ndarray, y: np.ndarray, w: np.ndarray) -> np.ndarray:
    p = sigmoid(X @ w)
    r = p * (1.0 - p)
    # R diagonal matrix multiplication X.T @ R @ X:
    H = X.T @ (r[:, None] * X) + 1e-6 * np.eye(X.shape[1])
    grad = X.T @ (p - y)
    step = np.linalg.solve(H, grad)
    return np.round(w - step, 4)

X = np.array([[1.0, 2.0], [1.0, -1.0], [1.0, 3.0]])
y = np.array([1.0, 0.0, 1.0])
w = np.array([0.0, 0.0])
print("Updated weights after 1 IRLS step:", irls_step(X, y, w))
`,
    },
    summary: {
      keyTakeaways: [
        'Log Loss derives from Bernoulli negative log-likelihood, heavily penalizing confident wrong predictions.',
        'The gradient simplifies to (1/N) * X^T (y_hat - y), avoiding the vanishing gradient saturation of MSE.',
        'The Hessian is positive semi-definite everywhere, guaranteeing a strictly convex loss landscape.',
      ],
      nextLessonId: 'multiclass-softmax',
      nextLessonTitle: 'Multiclass Classification & Softmax Regression',
      nextLessonModuleId: 'module-4',
    },
  },

  'multiclass-softmax': {
    id: 'multiclass-softmax',
    moduleId: 'module-4',
    title: 'Multiclass Classification & Softmax Regression',
    subtitle: 'The Softmax Function, Categorical Cross-Entropy, OvR vs OvO Decomposition',
    order: 3,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Generalize the binary sigmoid function to K classes using the Softmax function.',
      'Formulate Categorical Cross-Entropy loss: L = -sum(y_k * log(p_k)).',
      'Compare One-vs-Rest (OvR) and One-vs-One (OvO) multiclass strategies for binary classifiers.',
    ],
    prerequisites: ['log-loss-cross-entropy', 'scalars-vectors-matrices-tensors'],
    analogy: {
      title: 'The Olympic Medal Podium and Normalizing Votes',
      text: 'In a 3-candidate presidential election, raw vote tallies might be 5,000, 3,000, and 2,000. To find out what percentage of the vote each candidate received, you sum the votes (10,000) and divide each tally by the total: 50%, 30%, 20%. The Softmax function is this exact percentage normalizer, but it applies an exponential function e^z first. Taking e^z turns negative evidence into positive numbers and amplifies the winner\'s lead.',
      metaphor: 'Softmax exponentiates raw scores and normalizes them into valid probabilities summing to exactly 1.0.',
    },
    problemSolved: {
      title: 'Classifying Observations into 3 or More Mutually Exclusive Classes',
      description: 'Binary logistic regression handles 2 classes (yes/no). In computer vision (1000 ImageNet categories), speech recognition, and medical triage, models must output a probability distribution across K discrete classes.',
      keyPoints: [
        'Enforces sum(p_k) = 1.0 and 0 <= p_k <= 1 across all K classes simultaneously.',
        'Extends gradient backpropagation to multiclass neural network output layers.',
        'Enables binary classifiers (like SVMs) to handle multiclass tasks via OvR/OvO.',
      ],
    },
    intuition: {
      overview: 'Compute raw linear logits z_k = w_k^T x for each class k. Softmax exponentiates logits to ensure positivity and divides by their sum to normalize.',
      steps: [
        { step: 1, title: 'Compute Class Logits', description: 'Compute K independent linear scores: z = [z_1, z_2, ..., z_K].' },
        { step: 2, title: 'Exponentiate', description: 'Compute e^{z_k}. Larger logits grow exponentially; negative logits become small positive decimals.' },
        { step: 3, title: 'Normalize', description: 'Divide each e^{z_k} by the sum sum_{j=1}^K e^{z_j} so the output vector forms a valid probability distribution.' },
      ],
    },
    mathematics: {
      overview: 'Analytical formulations of the Softmax function and Categorical Cross-Entropy.',
      foundations: [
        {
          name: 'The Softmax Function',
          latex: '\\sigma(\\mathbf{z})_k = P(y = k | \\mathbf{x}) = \\frac{e^{z_k}}{\\sum_{j=1}^K e^{z_j}} \\quad \\text{where } z_k = \\mathbf{w}_k^T \\mathbf{x}',
          explanation: 'Maps a K-dimensional vector of real numbers into a probability distribution summing to 1.0.',
        },
        {
          name: 'Categorical Cross-Entropy Loss',
          latex: 'L(\\mathbf{W}) = -\\frac{1}{N} \\sum_{i=1}^N \\sum_{k=1}^K y_{ik} \\log(\\hat{y}_{ik}) = -\\frac{1}{N} \\sum_{i=1}^N \\log(\\hat{y}_{i, \\text{true}})',
          explanation: 'Only the predicted probability of the true ground-truth class is evaluated.',
        },
        {
          name: 'Numerically Stable Softmax',
          latex: '\\sigma(\\mathbf{z})_k = \\frac{e^{z_k - c}}{\\sum_{j=1}^K e^{z_j - c}} \\quad \\text{where } c = \\max_j(z_j)',
          explanation: 'Subtracting max(z) prevents floating-point exponential overflow (inf).',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Softmax Gradient',
      objective: 'Differentiate Categorical Cross-Entropy loss L with respect to logit z_k.',
      steps: [
        {
          step: 1,
          label: 'Softmax Jacobian Cases',
          latex: '\\frac{\\partial \\hat{y}_i}{\\partial z_k} = \\begin{cases} \\hat{y}_i(1 - \\hat{y}_k) & \\text{if } i = k \\\\ -\\hat{y}_i \\hat{y}_k & \\text{if } i \\neq k \\end{cases}',
          explanation: 'Derivative of quotient e^{z_i} / sum(e^{z_j}).',
        },
        {
          step: 2,
          label: 'Differentiate Cross-Entropy Loss L = -sum y_i log(y_hat_i)',
          latex: '\\frac{\\partial L}{\\partial z_k} = -\\sum_{i=1}^K \\frac{y_i}{\\hat{y}_i} \\frac{\\partial \\hat{y}_i}{\\partial z_k}',
          explanation: 'Apply chain rule across all terms in the loss sum.',
        },
        {
          step: 3,
          label: 'Substitute Jacobian and Simplify',
          latex: '= -\\frac{y_k}{\\hat{y}_k} [\\hat{y}_k(1 - \\hat{y}_k)] - \\sum_{i \\neq k} \\frac{y_i}{\\hat{y}_i} [-\\hat{y}_i \\hat{y}_k] = -y_k(1 - \\hat{y}_k) + \\hat{y}_k \\sum_{i \\neq k} y_i = \\hat{y}_k \\sum_{i=1}^K y_i - y_k = \\hat{y}_k - y_k',
          explanation: 'Because sum(y_i) = 1 for one-hot labels, the gradient simplifies to the elegant scalar residual (y_hat_k - y_k).',
        },
      ],
    },
    variables: [
      { symbol: '\\mathbf{z}', name: 'Logit Vector', description: 'Unnormalized raw model output scores.', dimensions: 'K × 1' },
      { symbol: '\\hat{\\mathbf{y}}', name: 'Probability Distribution', description: 'Softmax output vector summing to 1.0.', dimensions: 'K × 1' },
      { symbol: 'K', name: 'Number of Classes', description: 'Total discrete target categories.', dimensions: 'Integer ≥ 3' },
    ],
    numericalExample: {
      scenario: 'Given raw logits z = [2.0, 1.0, 0.1] for K = 3 classes. Compute the Softmax probability distribution and evaluate loss if the true class is Class 0.',
      dataset: [{ z0: 2.0, z1: 1.0, z2: 0.1, true_class: 0 }],
      calculations: [
        { step: 'Exponentials e^z', math: 'e^{2.0} \\approx 7.3891, \\; e^{1.0} \\approx 2.7183, \\; e^{0.1} \\approx 1.1052', result: '[7.389, 2.718, 1.105]' },
        { step: 'Sum of Exponentials', math: '7.3891 + 2.7183 + 1.1052', result: '11.2126' },
        { step: 'Softmax Probabilities', math: 'p_0 = 7.3891/11.2126 = 0.6590; \\; p_1 = 2.7183/11.2126 = 0.2424; \\; p_2 = 1.1052/11.2126 = 0.0986', result: '[0.659, 0.242, 0.099]' },
        { step: 'Cross-Entropy Loss (True class 0)', math: '-\\ln(p_0) = -\\ln(0.6590)', result: '0.4170 nats' },
      ],
      finalConclusion: 'The model predicts Class 0 with 65.9% probability, Class 1 with 24.2%, and Class 2 with 9.9%. The loss is 0.4170.',
    },
    visualExplanation: {
      title: 'One-vs-Rest (OvR) vs One-vs-One (OvO) Strategies',
      description: 'OvR: Trains K binary classifiers (Class 1 vs All, Class 2 vs All...). OvO: Trains K*(K-1)/2 binary classifiers between every unique pair of classes (Class 1 vs 2, Class 1 vs 3, Class 2 vs 3). OvO requires more models but each model trains on a smaller subset.',
      features: ['OvR: K models (faster for small K)', 'OvO: K(K-1)/2 models (ideal for SVMs that scale poorly with sample size)'],
    },
    scratchCode: {
      title: 'Numerically Stable Softmax in Pure NumPy',
      explanation: 'Subtract max(z) along axis to prevent floating-point overflow.',
      code: `import numpy as np

def stable_softmax(z: np.ndarray) -> np.ndarray:
    """Computes numerically stable softmax over 1D or 2D arrays."""
    # Subtract max logit for numerical stability
    z_max = np.max(z, axis=-1, keepdims=True)
    exp_z = np.exp(z - z_max)
    return exp_z / np.sum(exp_z, axis=-1, keepdims=True)

logits = np.array([2.0, 1.0, 0.1])
probs = stable_softmax(logits)
print("Softmax Probabilities:", np.round(probs, 4))
print("Sum of Probabilities:", round(float(np.sum(probs)), 6))

# Test with huge logits that would overflow standard exp(1000) -> inf
overflow_logits = np.array([1000.0, 1001.0, 1002.0])
print("Overflow-Safe Softmax:", np.round(stable_softmax(overflow_logits), 4))
`,
    },
    sklearnCode: {
      title: 'Multinomial Logistic Regression in Scikit-Learn',
      explanation: 'Training multi_class="multinomial" with cross-entropy loss in scikit-learn.',
      code: `import numpy as np
from sklearn.linear_model import LogisticRegression

# 3 classes in 2D space
X = np.array([[-2.0, -2.0], [2.0, 2.0], [0.0, -2.0]])
y = np.array([0, 1, 2])

clf = LogisticRegression(multi_class='multinomial', solver='lbfgs')
clf.fit(X, y)

test_point = np.array([[1.0, 1.0]])
print("Predicted Class:", clf.predict(test_point))
print("Class Probabilities [Class 0, 1, 2]:", np.round(clf.predict_proba(test_point), 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

z = np.array([2.0, 1.0, 0.1])
exp_z = np.exp(z - np.max(z))
softmax_probs = exp_z / np.sum(exp_z)

print(f"Logits: {z}")
print(f"Softmax Probabilities: {np.round(softmax_probs, 4)}")
print(f"Predicted Class: {np.argmax(softmax_probs)}")
`,
      expectedOutput: `Logits: [2.  1.  0.1]\nSoftmax Probabilities: [0.659  0.2424 0.0986]\nPredicted Class: 0`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'exp_z = np.exp(z - np.max(z))', explanation: 'Subtracts max(z) = 2.0 to ensure max exponent is e^0 = 1.0, preventing overflow.' },
      { lines: 'Line 5', codeSnippet: 'softmax_probs = exp_z / np.sum(exp_z)', explanation: 'Normalizes into valid probabilities summing to 1.0.' },
      { lines: 'Line 9', codeSnippet: 'np.argmax(softmax_probs)', explanation: 'Extracts the winning class index (Class 0).' },
    ],
    hyperparameters: [
      { name: 'multi_class', defaultVal: '"auto"', range: '["ovr", "multinomial", "auto"]', effect: 'Selects One-vs-Rest binary decomposition or true cross-entropy Softmax.', recommendation: 'Use multi_class="multinomial" for calibrated class probabilities.' },
    ],
    assumptions: [
      { assumption: 'Mutually Exclusive Classes', whyItMatters: 'Softmax assumes each sample belongs to exactly one class. For multi-label classification (where a sample can be both "cat" and "mammal"), use independent binary sigmoids per class instead.', howToVerify: 'Verify single ground-truth label per observation.' },
    ],
    commonMistakes: [
      { mistake: 'Computing exp(z) without subtracting max(z)', solution: 'In deep learning, raw logits can easily reach 100+. np.exp(100) overflows to inf, resulting in nan / nan probabilities. Always subtract max(z)!' },
    ],
    realWorldUseCases: [
      { industry: 'Natural Language Processing & LLMs', application: 'Next-Token Generation', benefit: 'Large language models compute a 32,000-dimensional Softmax over vocabulary tokens at every single generation step.' },
    ],
    practiceQuestions: [
      { id: 'pq-smax-1', question: 'How many binary classifiers are trained for a 5-class problem using One-vs-Rest (OvR) versus One-vs-One (OvO)?', hint: 'OvR = K; OvO = K*(K-1)/2.', answer: 'OvR trains K = 5 binary classifiers (one per class). OvO trains K*(K-1)/2 = 5*(4)/2 = 10 binary classifiers (one per unique pair).' },
    ],
    quiz: [
      {
        id: 'quiz-smax-1',
        question: 'Why is Softmax preferred over independent Sigmoids for mutually exclusive multiclass classification?',
        options: [
          'Because Softmax runs twice as fast.',
          'Because Softmax couples class probabilities so that they sum to exactly 1.0, naturally creating competition between mutually exclusive classes.',
          'Because Sigmoid cannot be computed in Python.',
          'Because Softmax avoids matrix multiplication.',
        ],
        correctIndex: 1,
        explanation: 'The denominator sum in Softmax couples all classes, ensuring that increasing the probability of one class decreases the probabilities of other classes, enforcing the mutual exclusivity assumption.',
      },
    ],
    independentExercise: {
      title: 'Implement Softmax Temperature Scaling',
      problem: 'Write a function softmax_with_temperature(logits, T) that computes Softmax(z / T). Show that T > 1 produces softer distributions (higher entropy), while T < 1 sharpens probabilities toward argmax.',
      hints: ['z_scaled = z / T', 'Apply stable softmax to z_scaled'],
      starterCode: `import numpy as np

def softmax_temperature(logits: np.ndarray, T: float = 1.0) -> np.ndarray:
    # TODO: return softmax with temperature T
    return np.zeros_like(logits)

z = np.array([3.0, 1.0, 0.0])
print("T=0.5 (Cold/Sharp):", np.round(softmax_temperature(z, T=0.5), 3))
print("T=1.0 (Standard):  ", np.round(softmax_temperature(z, T=1.0), 3))
print("T=5.0 (Hot/Smooth):", np.round(softmax_temperature(z, T=5.0), 3))
`,
      solution: `import numpy as np

def softmax_temperature(logits: np.ndarray, T: float = 1.0) -> np.ndarray:
    z_scaled = logits / T
    exp_z = np.exp(z_scaled - np.max(z_scaled))
    return exp_z / np.sum(exp_z)

z = np.array([3.0, 1.0, 0.0])
print("T=0.5 (Cold/Sharp):", np.round(softmax_temperature(z, T=0.5), 3))
print("T=1.0 (Standard):  ", np.round(softmax_temperature(z, T=1.0), 3))
print("T=5.0 (Hot/Smooth):", np.round(softmax_temperature(z, T=5.0), 3))
`,
    },
    summary: {
      keyTakeaways: [
        'The Softmax function normalizes K class logits into a valid probability distribution.',
        'Categorical Cross-Entropy simplifies to the elegant residual gradient (y_hat_k - y_k).',
        'Always use the max-subtraction trick to ensure numerical stability against exponential overflow.',
      ],
      nextLessonId: 'k-nearest-neighbors',
      nextLessonTitle: 'K-Nearest Neighbors (KNN)',
      nextLessonModuleId: 'module-4',
    },
  },

  'k-nearest-neighbors': {
    id: 'k-nearest-neighbors',
    moduleId: 'module-4',
    title: 'K-Nearest Neighbors (KNN)',
    subtitle: 'Non-Parametric Memory-Based Learning, Distance Geometries & KD-Tree Search',
    order: 4,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'knn',
    objectives: [
      'Explain the non-parametric "lazy learning" paradigm of K-Nearest Neighbors.',
      'Compare Euclidean, Manhattan, and Minkowski distance metrics.',
      'Analyze the effect of hyperparameter K: small K causes overfitting (high variance); large K causes underfitting (high bias).',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'feature-scaling-normalization'],
    analogy: {
      title: 'The Neighborhood Voting Ward',
      text: 'Suppose you move into a new town and want to know which political party your household belongs to. Instead of memorizing a rigid political handbook, you simply walk outside your front door and ask your 5 closest immediate neighbors how they vote. If 4 of your 5 closest neighbors vote Blue, you assume your household is Blue! If you ask only 1 neighbor (K=1), you are vulnerable to an eccentric recluse. If you ask the entire town of 50,000 people (K=all), you just predict the town\'s overall majority, ignoring your local neighborhood.',
      metaphor: 'KNN classifies a query point by taking a majority vote among its K closest geographic neighbors.',
    },
    problemSolved: {
      title: 'Non-Linear Decision Boundaries with Zero Training Time',
      description: 'Linear models fail when decision boundaries form complex interlocking spirals or irregular clusters. KNN requires no training phase (O(1) training time) and can model arbitrarily complex non-linear decision regions.',
      keyPoints: [
        'Zero training time: simply stores the training dataset in memory.',
        'Adapts naturally to multi-modal and non-linear cluster topologies.',
        'Can be used for both classification (majority vote) and regression (local average).',
      ],
    },
    intuition: {
      overview: 'Given a test query point x_q, compute the distance to every sample in the training database. Pick the K closest samples and predict the majority class label.',
      steps: [
        { step: 1, title: 'Compute Distances', description: 'Calculate distance d(x_q, x_i) to all N training points using a chosen norm (e.g. Euclidean).' },
        { step: 2, title: 'Identify Top-K Neighbors', description: 'Sort distances and select the K points with the smallest distance values.' },
        { step: 3, title: 'Majority Vote', description: 'Count class labels among the K neighbors; the class with the most votes is the prediction.' },
      ],
    },
    mathematics: {
      overview: 'Distance metrics and probabilistic voting rules in metric spaces.',
      foundations: [
        {
          name: 'Minkowski Distance Metric (Order p)',
          latex: 'D_p(\\mathbf{x}, \\mathbf{z}) = \\left( \\sum_{j=1}^d |x_j - z_j|^p \\right)^{1/p}',
          explanation: 'Generalizes Manhattan distance (p=1) and Euclidean distance (p=2).',
        },
        {
          name: 'KNN Posterior Class Probability',
          latex: 'P(y = c | \\mathbf{x}_q) = \\frac{1}{K} \\sum_{i \\in \\mathcal{N}_K(\\mathbf{x}_q)} \\mathbb{I}(y_i = c)',
          explanation: 'Fraction of the K nearest neighbors belonging to class c.',
        },
        {
          name: 'Distance-Weighted Voting Rule',
          latex: 'w_i = \\frac{1}{d(\\mathbf{x}_q, \\mathbf{x}_i) + \\epsilon} \\implies \\hat{y} = \\arg\\max_c \\sum_{i \\in \\mathcal{N}_K} w_i \\mathbb{I}(y_i = c)',
          explanation: 'Gives closer neighbors stronger voting weight than distant neighbors.',
        },
      ],
    },
    derivation: {
      title: 'Cover and Hart Theorem: Asymptotic Error Bound for 1-NN',
      objective: 'Bound the error rate of 1-Nearest Neighbor relative to the optimal Bayes risk R*.',
      steps: [
        {
          step: 1,
          label: 'Bayes Optimal Error Rate Definition',
          latex: 'R^* = \\mathbb{E}[\\min(P(y=1|x), \\; 1 - P(y=1|x))]',
          explanation: 'The theoretical minimum possible classification error rate (irreducible noise).',
        },
        {
          step: 2,
          label: 'Asymptotic Nearest Neighbor Distance',
          latex: '\\lim_{N \\to \\infty} d(\\mathbf{x}_q, \\mathbf{x}_{(1)}) = 0 \\implies P(y_{(1)} | \\mathbf{x}_{(1)}) \\to P(y_q | \\mathbf{x}_q)',
          explanation: 'As dataset size N approaches infinity, the nearest neighbor sits directly on top of the query point.',
        },
        {
          step: 3,
          label: 'Cover-Hart Bound',
          latex: 'R^* \\le R_{1\\text{-NN}} \\le 2 R^* (1 - R^*) \\le 2 R^*',
          explanation: 'Remarkable theoretical guarantee: even with a single neighbor (K=1) and infinite data, the error rate is at most TWICE the optimal Bayes error!',
        },
      ],
    },
    variables: [
      { symbol: 'K', name: 'Number of Neighbors', description: 'Odd integer to avoid 50/50 ties in binary classification.', dimensions: 'Integer ≥ 1' },
      { symbol: '\\mathcal{N}_K(\\mathbf{x}_q)', name: 'Neighborhood Set', description: 'Set of K closest training instances to query point x_q.', dimensions: 'Subset of size K' },
      { symbol: 'd(\\mathbf{u}, \\mathbf{v})', name: 'Distance Function', description: 'Euclidean or Manhattan distance metric.', dimensions: 'Scalar ≥ 0' },
    ],
    numericalExample: {
      scenario: 'Classify query point x_q = [3.0, 3.0] with K = 3 using Euclidean distance among 4 training samples: A=[1, 1] (Class 0), B=[2, 2] (Class 0), C=[4, 4] (Class 1), D=[5, 5] (Class 1).',
      dataset: [{ sample: 'A', x: 1, y: 1, c: 0 }, { sample: 'B', x: 2, y: 2, c: 0 }, { sample: 'C', x: 4, y: 4, c: 1 }, { sample: 'D', x: 5, y: 5, c: 1 }],
      calculations: [
        { step: 'Distance to A (1, 1)', math: '\\sqrt{(3-1)^2 + (3-1)^2} = \\sqrt{4+4} = \\sqrt{8}', result: '2.828' },
        { step: 'Distance to B (2, 2)', math: '\\sqrt{(3-2)^2 + (3-2)^2} = \\sqrt{1+1} = \\sqrt{2}', result: '1.414' },
        { step: 'Distance to C (4, 4)', math: '\\sqrt{(3-4)^2 + (3-4)^2} = \\sqrt{1+1} = \\sqrt{2}', result: '1.414' },
        { step: 'Distance to D (5, 5)', math: '\\sqrt{(3-5)^2 + (3-5)^2} = \\sqrt{4+4} = \\sqrt{8}', result: '2.828' },
        { step: 'Select K=3 Closest', math: 'B (dist 1.414, Class 0), C (dist 1.414, Class 1), and tie between A and D (dist 2.828)', result: 'Neighbors = {B, C, A}' },
        { step: 'Majority Vote', math: 'Class 0 has 2 votes (B, A); Class 1 has 1 vote (C)', result: 'Winner = Class 0' },
      ],
      finalConclusion: 'The query point [3, 3] is classified as Class 0 with 66.7% confidence (2 out of 3 votes).',
    },
    visualExplanation: {
      title: 'Interactive Visual Laboratory: Explore KNN in Real Time',
      description: 'Use the interactive visualizer below to drag the query point (x_q, y_q) across the 2D feature space. Adjust the K slider (1, 3, 5, 7) and watch the dynamic radius circle expand to encompass the nearest neighbors, updating class vote tallies live.',
      features: ['Drag query point to test decision regions', 'Adjust K slider to observe boundary smoothing', 'Inspect distance circle radius'],
    },
    scratchCode: {
      title: 'K-Nearest Neighbors Classifier in Pure Python',
      explanation: 'Complete KNN implementation supporting Euclidean distance and majority voting.',
      code: `import numpy as np

class CustomKNN:
    def __init__(self, k: int = 3):
        self.k = k

    def fit(self, X: np.ndarray, y: np.ndarray):
        # Lazy learning: just store training data
        self.X_train = np.asarray(X, dtype=float)
        self.y_train = np.asarray(y)
        return self

    def predict(self, X_query: np.ndarray):
        predictions = []
        for x_q in X_query:
            # Vectorized Euclidean distance to all training points
            distances = np.linalg.norm(self.X_train - x_q, axis=1)
            # Find indices of K smallest distances
            k_idx = np.argsort(distances)[:self.k]
            k_labels = self.y_train[k_idx]
            
            # Majority vote
            unique, counts = np.unique(k_labels, return_counts=True)
            predictions.append(unique[np.argmax(counts)])
            
        return np.array(predictions)

X_tr = np.array([[1.0, 1.0], [2.0, 2.0], [4.0, 4.0], [5.0, 5.0]])
y_tr = np.array([0, 0, 1, 1])

knn = CustomKNN(k=3).fit(X_tr, y_tr)
print("Prediction for [3.0, 3.0]:", knn.predict([[3.0, 3.0]]))
`,
    },
    sklearnCode: {
      title: 'KNeighborsClassifier in Scikit-Learn',
      explanation: 'Using KD-Tree search algorithms with distance weighting.',
      code: `import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

X = np.array([[1.0, 1.0], [2.0, 2.0], [4.0, 4.0], [5.0, 5.0]])
y = np.array([0, 0, 1, 1])

# Pipeline with scaling is mandatory for KNN
pipe = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=3, weights='distance', algorithm='kd_tree')
)
pipe.fit(X, y)

print("Predicted Class:", pipe.predict([[3.0, 3.0]]))
print("Predicted Probs:", pipe.predict_proba([[3.0, 3.0]]))
`,
    },
    runnableCode: {
      code: `import numpy as np

X_train = np.array([[1.0, 1.0], [2.0, 2.0], [4.0, 4.0], [5.0, 5.0]])
y_train = np.array([0, 0, 1, 1])
query = np.array([3.0, 3.0])

# Compute distances
dists = np.linalg.norm(X_train - query, axis=1)
k = 3
k_indices = np.argsort(dists)[:k]
votes = y_train[k_indices]

print(f"Query point: {query}")
print(f"Distances to training points: {np.round(dists, 3)}")
print(f"3 Nearest Neighbors: Indices {k_indices}, Labels {votes}")
print(f"Majority Winner: Class {np.bincount(votes).argmax()}")
`,
      expectedOutput: `Query point: [3. 3.]\nDistances to training points: [2.828 1.414 1.414 2.828]\n3 Nearest Neighbors: Indices [1 2 0], Labels [0 1 0]\nMajority Winner: Class 0`,
    },
    lineByLineExplanation: [
      { lines: 'Line 8', codeSnippet: 'dists = np.linalg.norm(X_train - query, axis=1)', explanation: 'Calculates Euclidean distance from query point to every sample in database.' },
      { lines: 'Line 10', codeSnippet: 'k_indices = np.argsort(dists)[:k]', explanation: 'Extracts indices of 3 closest samples.' },
      { lines: 'Line 11', codeSnippet: 'votes = y_train[k_indices]', explanation: 'Gathers class labels [0, 1, 0].' },
      { lines: 'Line 15', codeSnippet: 'np.bincount(votes).argmax()', explanation: 'Counts votes; Class 0 wins with 2 votes.' },
    ],
    hyperparameters: [
      { name: 'n_neighbors (K)', defaultVal: '5', range: '[1, 50]', effect: 'K=1 is highly flexible (fits noise/overfits); large K produces smooth, flat boundaries (high bias).', recommendation: 'Choose an odd integer (3, 5, 7) to prevent ties; tune via GridSearchCV.' },
      { name: 'metric', defaultVal: '"minkowski" (p=2)', range: '["euclidean", "manhattan", "cosine"]', effect: 'Geometric distance function.', recommendation: 'Use "euclidean" for spatial coordinates; use "cosine" for high-dimensional text embeddings.' },
    ],
    assumptions: [
      { assumption: 'Strict Feature Standardization', whyItMatters: 'If one feature has scale 10,000 and another has scale 1.0, distance is 99.99% dominated by the large feature, completely blinding KNN to the other variable.', howToVerify: 'Always use StandardScaler before KNN.' },
    ],
    commonMistakes: [
      { mistake: 'Using KNN on datasets with high dimensionality (d > 50)', solution: 'Due to the Curse of Dimensionality, in high dimensions all points become equidistant from each other, destroying neighborhood contrast. Apply PCA or use tree models instead.' },
    ],
    realWorldUseCases: [
      { industry: 'Retail & Recommender Systems', application: 'Collaborative User Matching', benefit: 'Finds the K customers whose historical purchase histories are closest in Euclidean space to recommend products they loved.' },
    ],
    practiceQuestions: [
      { id: 'pq-knn-1', question: 'What is the training time complexity and inference time complexity of naive brute-force KNN?', hint: 'Does KNN do anything during fit()?', answer: 'Training time complexity is O(1) (simply storing the data in memory). Inference time complexity is O(N * d) for a single query point, because it must compute distance to all N samples across d dimensions. KD-Trees reduce average search to O(d * log N).' },
    ],
    quiz: [
      {
        id: 'quiz-knn-1',
        question: 'What is the effect on the decision boundary when hyperparameter K is set to 1 (K=1) in KNN?',
        options: [
          'The decision boundary becomes a perfectly straight line.',
          'The model underfits and predicts the global majority class.',
          'The decision boundary becomes highly complex, jagged, and islands form around individual training points (high variance / overfitting).',
          'The model requires 100 iterations of gradient descent.',
        ],
        correctIndex: 2,
        explanation: 'At K=1, the model creates individual Voronoi cells around every training sample, memorizing training noise and creating complex, jagged boundaries with 0% training error.',
      },
    ],
    independentExercise: {
      title: 'Evaluate Accuracy vs K to Find Optimal Hyperparameter',
      problem: 'Write a function find_optimal_k(X, y, k_range=range(1, 15, 2)) that evaluates cross_val_score across odd K values and returns the K with the highest accuracy.',
      hints: ['Loop over k_range', 'cross_val_score(KNeighborsClassifier(n_neighbors=k), X, y, cv=5)'],
      starterCode: `import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score

def find_best_k(X, y, k_list=[1, 3, 5, 7, 9]):
    # TODO: return best K
    return 1

np.random.seed(42)
X = np.random.randn(50, 2)
y = (X[:, 0]**2 + X[:, 1]**2 > 1.0).astype(int)
print("Best K:", find_best_k(X, y))
`,
      solution: `import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score

def find_best_k(X, y, k_list=[1, 3, 5, 7, 9]):
    best_k = 1
    best_score = -1.0
    for k in k_list:
        score = np.mean(cross_val_score(KNeighborsClassifier(n_neighbors=k), X, y, cv=5))
        if score > best_score:
            best_score = score
            best_k = k
    return best_k

np.random.seed(42)
X = np.random.randn(50, 2)
y = (X[:, 0]**2 + X[:, 1]**2 > 1.0).astype(int)
print("Best K:", find_best_k(X, y))
`,
    },
    summary: {
      keyTakeaways: [
        'KNN is a non-parametric lazy learning algorithm that classifies by majority vote among K nearest neighbors.',
        'Feature scaling (StandardScaler) is mandatory because distance metrics are sensitive to feature magnitude.',
        'Small K leads to overfitting (high variance); large K leads to underfitting (high bias).',
      ],
      nextLessonId: 'decision-trees',
      nextLessonTitle: 'Decision Trees & The CART Algorithm',
      nextLessonModuleId: 'module-4',
    },
  },

  'decision-trees': {
    id: 'decision-trees',
    moduleId: 'module-4',
    title: 'Decision Trees & The CART Algorithm',
    subtitle: 'Recursive Binary Partitioning, Orthogonal Decision Regions & Tree Pruning',
    order: 5,
    readTimeMinutes: 25,
    difficulty: 'Beginner',
    visualizerType: 'decision-tree',
    objectives: [
      'Explain the CART (Classification and Regression Trees) recursive binary splitting algorithm.',
      'Explain why Decision Tree boundaries are strictly axis-aligned step functions.',
      'Control tree complexity and prevent overfitting using max_depth, min_samples_split, and cost-complexity pruning.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'bias-variance-tradeoff'],
    analogy: {
      title: 'The Game of 20 Questions at the Doctor\'s Office',
      text: 'When you visit a doctor, they don\'t calculate a complex vector dot product in their head. They follow an intuitive decision tree flowchart: 1) "Do you have a fever?" If YES: 2) "Has it lasted more than 3 days?" If YES: 3) "Is there a rash?" If YES: Diagnose Measles. Each step asks a simple binary YES/NO question about a single feature, slicing the diagnostic space into smaller, more specific buckets until an accurate diagnosis is reached.',
      metaphor: 'A decision tree is a hierarchical sequence of binary questions that partitions feature space into pure rectangular boxes.',
    },
    problemSolved: {
      title: 'Highly Interpretable, Non-Linear Decisions with Zero Scaling Required',
      description: 'Many domains (finance credit approvals, medical clinical pathways) legally require human-interpretable reasoning. Decision trees generate explicit if-else rules that any human can understand, completely unaffected by unscaled features or outliers.',
      keyPoints: [
        'Completely scale-invariant: requires zero feature normalization or standardization.',
        'Naturally handles mixed data types: numerical, categorical, and missing values.',
        'White-box interpretability: can be drawn as a visual flowchart for compliance.',
      ],
    },
    intuition: {
      overview: 'CART searches greedily across every feature j and every possible threshold t to find the single split that produces the purest child nodes.',
      steps: [
        { step: 1, title: 'Greedy Split Search', description: 'Iterate over all features j and all candidate split thresholds t.' },
        { step: 2, title: 'Evaluate Impurity Reduction', description: 'Calculate weighted impurity reduction: Delta I = I_parent - (N_left/N * I_left + N_right/N * I_right).' },
        { step: 3, title: 'Recurse', description: 'Split the data into left (x_j <= t) and right (x_j > t) subsets and repeat recursively until stopping criteria are met.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical formulation of recursive partitioning optimization.',
      foundations: [
        {
          name: 'The CART Split Objective',
          latex: '(j^*, t^*) = \\arg\\max_{j, t} \\left[ I(D) - \\left( \\frac{N_L}{N} I(D_L) + \\frac{N_R}{N} I(D_R) \\right) \\right]',
          explanation: 'Finds feature j and threshold t maximizing the reduction in node impurity I.',
        },
        {
          name: 'Leaf Node Class Prediction',
          latex: '\\hat{y}_{\\text{leaf}} = \\arg\\max_c \\left( \\frac{1}{N_{\\text{leaf}}} \\sum_{i \\in \\text{leaf}} \\mathbb{I}(y_i = c) \\right)',
          explanation: 'Predicts the majority class label among training instances landing in that terminal leaf.',
        },
        {
          name: 'Cost-Complexity Pruning Criterion',
          latex: 'R_\\alpha(T) = R(T) + \\alpha |T|',
          explanation: 'Balances misclassification error R(T) with tree complexity penalty alpha * |T| (number of leaves).',
        },
      ],
    },
    derivation: {
      title: 'Proof that Decision Tree Boundaries are Axis-Aligned Step Functions',
      objective: 'Demonstrate why CART decision regions are hyper-rectangles.',
      steps: [
        {
          step: 1,
          label: 'Single Feature Decision Rule',
          latex: 'R_1 = \\{\\mathbf{x} : x_j \\le t\\}, \\quad R_2 = \\{\\mathbf{x} : x_j > t\\}',
          explanation: 'Each split tests only ONE feature x_j against a scalar threshold t.',
        },
        {
          step: 2,
          label: 'Hyperplane Equation',
          latex: '\\mathbf{n}^T \\mathbf{x} = t \\quad \\text{where } \\mathbf{n} = [0, \\dots, 1, \\dots, 0]^T = \\mathbf{e}_j',
          explanation: 'The normal vector n is a standard basis vector e_j.',
        },
        {
          step: 3,
          label: 'Orthogonality to Coordinate Axes',
          latex: '\\mathbf{n} \\perp \\mathbf{e}_k \\quad \\forall k \\neq j',
          explanation: 'The split boundary is strictly perpendicular to axis j and parallel to all other axes. Multiple splits form orthogonal hyper-rectangles (boxes), producing a staircase approximation on diagonal boundaries.',
        },
      ],
    },
    variables: [
      { symbol: 'j^*', name: 'Optimal Feature Index', description: 'Feature selected for binary split.', dimensions: 'Index in {1, ..., d}' },
      { symbol: 't^*', name: 'Optimal Split Threshold', description: 'Real-valued split threshold along feature j.', dimensions: 'Scalar' },
      { symbol: '|T|', name: 'Tree Complexity', description: 'Total number of terminal leaf nodes in tree T.', dimensions: 'Integer ≥ 1' },
    ],
    numericalExample: {
      scenario: 'A parent node has 6 samples of Class 0 and 4 samples of Class 1 (Total = 10). A split divides them into: Left Child = [5 Class 0, 1 Class 1] (Total 6), Right Child = [1 Class 0, 3 Class 1] (Total 4). Calculate Gini Impurity reduction.',
      dataset: [{ parent: '6 C0, 4 C1', left: '5 C0, 1 C1', right: '1 C0, 3 C1' }],
      calculations: [
        { step: 'Parent Gini Impurity', math: '1 - [(6/10)^2 + (4/10)^2] = 1 - [0.36 + 0.16] = 1 - 0.52', result: '0.4800' },
        { step: 'Left Child Gini Impurity', math: '1 - [(5/6)^2 + (1/6)^2] = 1 - [25/36 + 1/36] = 1 - 26/36 = 10/36', result: '0.2778' },
        { step: 'Right Child Gini Impurity', math: '1 - [(1/4)^2 + (3/4)^2] = 1 - [1/16 + 9/16] = 1 - 10/16 = 6/16', result: '0.3750' },
        { step: 'Weighted Child Impurity', math: '(6/10)(0.2778) + (4/10)(0.3750) = 0.1667 + 0.1500', result: '0.3167' },
        { step: 'Gini Impurity Reduction (Gain)', math: '\\Delta G = 0.4800 - 0.3167', result: '+0.1633' },
      ],
      finalConclusion: 'The split reduces node impurity from 0.4800 down to 0.3167, achieving an impurity gain of +0.1633.',
    },
    visualExplanation: {
      title: 'Interactive Visual Laboratory: Explore Decision Tree Splits',
      description: 'Use the interactive visualizer below to drag the vertical split slider along the x1 axis. Observe how the parent node divides into Left and Right children, and watch the live Gini Gain (Delta G) graph update in real time to locate the optimal split threshold.',
      features: ['Drag split threshold slider', 'Watch live Gini impurity calculations', 'Identify peak Gini gain threshold'],
    },
    scratchCode: {
      title: 'Greedy Split Search in Pure Python',
      explanation: 'Search across all candidate thresholds to find the maximum Gini gain split.',
      code: `import numpy as np

def compute_gini(y: np.ndarray) -> float:
    if len(y) == 0:
        return 0.0
    _, counts = np.unique(y, return_counts=True)
    probs = counts / len(y)
    return 1.0 - float(np.sum(probs ** 2))

def find_best_split(x: np.ndarray, y: np.ndarray):
    best_gain = -1.0
    best_thresh = None
    parent_gini = compute_gini(y)
    
    # Candidate thresholds: midpoints between sorted values
    sorted_idx = np.argsort(x)
    x_sort, y_sort = x[sorted_idx], y[sorted_idx]
    thresholds = (x_sort[:-1] + x_sort[1:]) / 2.0
    
    for t in np.unique(thresholds):
        left_mask = x <= t
        y_left = y[left_mask]
        y_right = y[~left_mask]
        
        n = len(y)
        w_gini = (len(y_left)/n) * compute_gini(y_left) + (len(y_right)/n) * compute_gini(y_right)
        gain = parent_gini - w_gini
        
        if gain > best_gain:
            best_gain = gain
            best_thresh = t
            
    return round(float(best_thresh), 4), round(float(best_gain), 4)

x_data = np.array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0])
y_data = np.array([0, 0, 0, 1, 1, 1]) # Clean split between 3 and 4
thresh, gain = find_best_split(x_data, y_data)
print(f"Optimal Split Threshold: {thresh}, Gini Gain: {gain}")
`,
    },
    sklearnCode: {
      title: 'DecisionTreeClassifier and Text Tree Export',
      explanation: 'Training DecisionTreeClassifier and exporting human-readable rules with export_text.',
      code: `import numpy as np
from sklearn.tree import DecisionTreeClassifier, export_text

X = np.array([[2.0, 10.0], [3.0, 12.0], [5.0, 20.0], [6.0, 25.0]])
y = np.array([0, 0, 1, 1])

clf = DecisionTreeClassifier(max_depth=2, random_state=42)
clf.fit(X, y)

print("Generated Decision Rules:")
print(export_text(clf, feature_names=['feature_0', 'feature_1']))
`,
    },
    runnableCode: {
      code: `import numpy as np

# Parent node: 6 Class 0, 4 Class 1
p0 = 6 / 10
p1 = 4 / 10
gini_parent = 1.0 - (p0**2 + p1**2)

# Left child: 5 Class 0, 1 Class 1
gini_left = 1.0 - ((5/6)**2 + (1/6)**2)
# Right child: 1 Class 0, 3 Class 1
gini_right = 1.0 - ((1/4)**2 + (3/4)**2)

weighted_child_gini = (6/10) * gini_left + (4/10) * gini_right
gini_gain = gini_parent - weighted_child_gini

print(f"Parent Gini:         {gini_parent:.4f}")
print(f"Left Child Gini:     {gini_left:.4f}")
print(f"Right Child Gini:    {gini_right:.4f}")
print(f"Weighted Child Gini: {weighted_child_gini:.4f}")
print(f"Impurity Reduction:  +{gini_gain:.4f}")
`,
      expectedOutput: `Parent Gini:         0.4800\nLeft Child Gini:     0.2778\nRight Child Gini:    0.3750\nWeighted Child Gini: 0.3167\nImpurity Reduction:  +0.1633`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4-6', codeSnippet: 'gini_parent = 1.0 - (p0**2 + p1**2)', explanation: 'Calculates Gini impurity of parent node (0.4800).' },
      { lines: 'Lines 9-11', codeSnippet: 'gini_left = ...; gini_right = ...', explanation: 'Calculates Gini impurities of both proposed child subsets.' },
      { lines: 'Line 13-14', codeSnippet: 'gini_gain = gini_parent - weighted_child_gini', explanation: 'Evaluates the net impurity reduction (+0.1633).' },
    ],
    hyperparameters: [
      { name: 'max_depth', defaultVal: 'None', range: '[2, 20]', effect: 'Maximum length of root-to-leaf path. Crucial defense against overfitting.', recommendation: 'Always constrain max_depth (e.g. 3 to 6) to prevent memorizing individual noise samples.' },
      { name: 'min_samples_leaf', defaultVal: '1', range: '[1, 50]', effect: 'Minimum samples required in terminal leaf node.', recommendation: 'Set min_samples_leaf=10 on noisy tabular datasets to smooth predictions.' },
    ],
    assumptions: [
      { assumption: 'Axis-Aligned Suitability', whyItMatters: 'If true boundary is diagonal (x1 + x2 = 5), trees must build a clumsy staircase of 50 axis-aligned splits, requiring high depth.', howToVerify: 'Evaluate linear models if features are known to have linear additive interactions.' },
    ],
    commonMistakes: [
      { mistake: 'Leaving max_depth=None on noisy datasets', solution: 'An unconstrained decision tree will split until every single leaf is 100% pure, memorizing training noise with 100% training accuracy but abysmal test accuracy.' },
    ],
    realWorldUseCases: [
      { industry: 'Banking & Credit Underwriting', application: 'Mortgage Approval Decision Trees', benefit: 'Regulatory compliance requires explainable models: underwriters can give applicants exact written explanations for adverse actions (e.g. "Denied because Debt-to-Income > 43%").' },
    ],
    practiceQuestions: [
      { id: 'pq-dt-1', question: 'Why does a Decision Tree struggle to model a simple diagonal decision boundary like x1 + x2 > 0?', hint: 'Think about axis-aligned splits.', answer: 'Decision trees can only make orthogonal splits parallel to the coordinate axes (e.g. x1 <= t). To approximate a diagonal line, the tree must construct a jagged, inefficient staircase of dozens of alternating vertical and horizontal cuts, requiring immense depth and risking severe overfitting.' },
    ],
    quiz: [
      {
        id: 'quiz-dt-1',
        question: 'What is the primary motivation for setting min_samples_split or max_depth in a Decision Tree?',
        options: [
          'To speed up CPU clock speed.',
          'To prevent the tree from growing unrestrained, memorizing individual training outliers, and severely overfitting.',
          'To convert the classification tree into a linear regression model.',
          'To make the feature matrix invertible.',
        ],
        correctIndex: 1,
        explanation: 'Without stopping criteria like max_depth, a decision tree will greedily split until every leaf contains a single sample, achieving 100% training accuracy but overfitting catastrophically.',
      },
    ],
    independentExercise: {
      title: 'Compare Overfitted vs Pruned Decision Trees',
      problem: 'Train an unconstrained tree (max_depth=None) and a pruned tree (max_depth=3) on synthetic noisy data. Compare their train and test accuracies.',
      hints: ['DecisionTreeClassifier(max_depth=None) vs max_depth=3', 'Evaluate score(X_test, y_test)'],
      starterCode: `import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

np.random.seed(42)
X = np.random.randn(100, 4)
y = (X[:, 0] + X[:, 1] > 0).astype(int)
y[::10] = 1 - y[::10] # 10% label noise

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3)

# TODO: fit unconstrained vs pruned tree and print scores
print("Tree comparison:")
`,
      solution: `import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

np.random.seed(42)
X = np.random.randn(100, 4)
y = (X[:, 0] + X[:, 1] > 0).astype(int)
y[::10] = 1 - y[::10] # 10% label noise

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=42)

tree_deep = DecisionTreeClassifier(max_depth=None, random_state=42).fit(X_tr, y_tr)
tree_pruned = DecisionTreeClassifier(max_depth=3, random_state=42).fit(X_tr, y_tr)

print(f"Unconstrained -> Train Acc: {tree_deep.score(X_tr, y_tr):.2f}, Test Acc: {tree_deep.score(X_te, y_te):.2f} (Overfitting)")
print(f"Pruned (Depth 3)-> Train Acc: {tree_pruned.score(X_tr, y_tr):.2f}, Test Acc: {tree_pruned.score(X_te, y_te):.2f} (Generalizes)")
`,
    },
    summary: {
      keyTakeaways: [
        'The CART algorithm uses recursive binary splitting to greedily maximize impurity reduction.',
        'Decision boundaries are strictly axis-aligned step functions, forming hyper-rectangular regions.',
        'Pruning constraints (max_depth, min_samples_leaf) are mandatory to prevent severe overfitting.',
      ],
      nextLessonId: 'gini-entropy-information-gain',
      nextLessonTitle: 'Gini Impurity, Entropy & Information Gain',
      nextLessonModuleId: 'module-4',
    },
  },

  'gini-entropy-information-gain': {
    id: 'gini-entropy-information-gain',
    moduleId: 'module-4',
    title: 'Gini Impurity, Entropy & Information Gain',
    subtitle: 'Quantifying Node Purity, Gini vs Entropy, Information Gain & Variance Reduction',
    order: 6,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'decision-tree',
    objectives: [
      'Compute and contrast Gini Impurity (1 - sum(p_i^2)) and Shannon Entropy (-sum(p_i log2(p_i))).',
      'Calculate Information Gain: IG = H_parent - sum(N_j / N * H_j).',
      'Explain variance reduction as the splitting criterion for Regression Trees.',
    ],
    prerequisites: ['decision-trees', 'entropy-cross-entropy-kl-divergence'],
    analogy: {
      title: 'The Jar of Colored Marbles',
      text: 'Imagine reaching into a jar with your eyes closed, pulling out a marble, putting it back, and guessing its color. 1) If the jar contains 100 Red marbles, impurity is ZERO: you are 100% certain every marble is Red. 2) If the jar contains 50 Red and 50 Blue marbles, impurity is at its MAXIMUM: you have zero predictability. Gini Impurity measures the probability that a randomly chosen element from the set would be incorrectly labeled if it were randomly labeled according to the class distribution.',
      metaphor: 'Impurity measures disorder: pure single-class nodes have 0 impurity; mixed nodes have high impurity.',
    },
    problemSolved: {
      title: 'Mathematically Evaluating the Quality of a Proposed Split',
      description: 'A decision tree algorithm needs a quantitative numerical score to evaluate thousands of candidate feature thresholds and pick the optimal cut. Purity metrics provide this mathematical objective.',
      keyPoints: [
        'Gini is computationally faster (no logarithms required).',
        'Entropy measures information gain in Shannon bits.',
        'Variance reduction applies the identical logic to continuous target regression trees.',
      ],
    },
    intuition: {
      overview: 'A good split creates child nodes that are much purer (closer to single-class) than the parent node.',
      steps: [
        { step: 1, title: 'Parent Node Impurity', description: 'Compute baseline impurity before the split.' },
        { step: 2, title: 'Child Node Impurities', description: 'Compute impurity in both the left and right candidate subsets.' },
        { step: 3, title: 'Weighted Purity Gain', description: 'Subtract sample-weighted average child impurity from parent impurity: Delta I = I_parent - [w_L * I_L + w_R * I_R].' },
      ],
    },
    mathematics: {
      overview: 'Analytical formulations of foundational tree splitting criteria.',
      foundations: [
        {
          name: 'Gini Impurity',
          latex: 'I_G(p) = 1 - \\sum_{i=1}^C p_i^2 = \\sum_{i=1}^C p_i (1 - p_i)',
          explanation: 'Bounded in [0, 1 - 1/C]. Peaks at 0.5 for balanced binary classification.',
        },
        {
          name: 'Entropy (Information Content)',
          latex: 'H(p) = -\\sum_{i=1}^C p_i \\log_2(p_i)',
          explanation: 'Measures disorder in bits. Peaks at 1.0 bit for balanced binary classification.',
        },
        {
          name: 'Information Gain',
          latex: '\\text{IG}(D, A) = H(D) - \\sum_{v \\in \\text{Values}(A)} \\frac{|D_v|}{|D|} H(D_v)',
          explanation: 'Expected reduction in entropy achieved by partitioning on attribute A.',
        },
        {
          name: 'Variance Reduction (Regression Trees)',
          latex: '\\Delta \\text{Var} = \\text{Var}(D) - \\left( \\frac{N_L}{N} \\text{Var}(D_L) + \\frac{N_R}{N} \\text{Var}(D_R) \\right)',
          explanation: 'Continuous regression analog: selects split minimizing Mean Squared Error.',
        },
      ],
    },
    derivation: {
      title: 'First-Order Taylor Approximation Connecting Entropy to Gini',
      objective: 'Show that Gini impurity is a first-order Taylor approximation of Shannon Entropy.',
      steps: [
        {
          step: 1,
          label: 'Natural Log Series Expansion around 1',
          latex: '\\ln(p_i) \\approx (p_i - 1) \\quad \\text{for } p_i \\approx 1',
          explanation: 'First-order Taylor expansion of ln(x) centered at x = 1.',
        },
        {
          step: 2,
          label: 'Substitute into Entropy Definition',
          latex: 'H(P) = -\\sum_{i=1}^C p_i \\ln(p_i) \\approx -\\sum_{i=1}^C p_i (p_i - 1)',
          explanation: 'Replace log term with linear approximation.',
        },
        {
          step: 3,
          label: 'Simplify the Sum',
          latex: '= -\\sum p_i^2 + \\sum p_i = 1 - \\sum_{i=1}^C p_i^2 = I_G(P)',
          explanation: 'Because sum(p_i) = 1, the linear approximation of Entropy is EXACTLY the Gini Impurity! Gini is simply a faster algebraic approximation of Entropy.',
        },
      ],
    },
    variables: [
      { symbol: 'p_i', name: 'Class Proportion', description: 'Fraction of samples in node belonging to class i.', dimensions: 'Scalar [0, 1]' },
      { symbol: 'I_G', name: 'Gini Impurity', description: 'Probability of incorrect classification.', dimensions: 'Scalar [0, 0.5] for binary' },
      { symbol: 'H', name: 'Shannon Entropy', description: 'Uncertainty in bits.', dimensions: 'Scalar [0, 1] for binary' },
    ],
    numericalExample: {
      scenario: 'Compare Gini Impurity and Entropy for a node with 8 Positive samples and 2 Negative samples (p_pos = 0.8, p_neg = 0.2).',
      dataset: [{ p_pos: 0.8, p_neg: 0.2 }],
      calculations: [
        { step: 'Gini Calculation', math: '1 - (0.8^2 + 0.2^2) = 1 - (0.64 + 0.04) = 1 - 0.68', result: 'Gini = 0.3200' },
        { step: 'Entropy Term 1 (Positive)', math: '-0.8 \\cdot \\log_2(0.8) = -0.8 \\cdot (-0.3219)', result: '+0.2575' },
        { step: 'Entropy Term 2 (Negative)', math: '-0.2 \\cdot \\log_2(0.2) = -0.2 \\cdot (-2.3219)', result: '+0.4644' },
        { step: 'Total Entropy H', math: '0.2575 + 0.4644', result: '0.7219 bits' },
      ],
      finalConclusion: 'For an 80/20 split, Gini Impurity is 0.3200 while Shannon Entropy is 0.7219 bits. Both signal moderate purity compared to maximum uncertainty (Gini 0.50, Entropy 1.00).',
    },
    visualExplanation: {
      title: 'Comparison Curve: Gini Impurity vs Scaled Entropy vs Misclassification Rate',
      description: 'Plotting impurity vs probability p of class 1 shows three symmetric inverted bowls. Entropy peaks at 1.0, Gini peaks at 0.5 (scaled Gini = 2 * Gini peaks at 1.0), and Misclassification Error peaks at 0.5 with straight lines. Gini and Entropy are smooth and differentiable; Misclassification error has a sharp non-differentiable peak.',
      features: ['Entropy: Peaks at 1.0 bit', 'Gini: Peaks at 0.50', 'Misclassification error: Peaks at 0.50 (flat derivative)'],
    },
    scratchCode: {
      title: 'Gini Impurity vs Entropy Comparison in Pure Python',
      explanation: 'Evaluate impurity functions across the probability spectrum [0, 1].',
      code: `import numpy as np

def gini_impurity_binary(p: float) -> float:
    return 1.0 - (p**2 + (1.0 - p)**2)

def entropy_binary(p: float, eps: float = 1e-15) -> float:
    if p <= 0 or p >= 1:
        return 0.0
    p = np.clip(p, eps, 1.0 - eps)
    return float(-(p * np.log2(p) + (1.0 - p) * np.log2(1.0 - p)))

probs = [0.0, 0.1, 0.2, 0.5, 0.8, 0.9, 1.0]
print(f"{'p':>5} | {'Gini':>8} | {'Entropy (bits)':>14}")
print("-" * 33)
for p in probs:
    g = gini_impurity_binary(p)
    h = entropy_binary(p)
    print(f"{p:5.1f} | {g:8.4f} | {h:14.4f}")
`,
    },
    sklearnCode: {
      title: 'Comparing criterion="gini" vs "entropy" in Scikit-Learn',
      explanation: 'Gini is default in Scikit-Learn; entropy can be explicitly selected.',
      code: `import numpy as np
from sklearn.tree import DecisionTreeClassifier

X = np.random.randn(40, 2)
y = (X[:, 0] > 0).astype(int)

tree_gini = DecisionTreeClassifier(criterion='gini', max_depth=3).fit(X, y)
tree_entropy = DecisionTreeClassifier(criterion='entropy', max_depth=3).fit(X, y)

print("Gini Tree Leaves:   ", tree_gini.get_n_leaves())
print("Entropy Tree Leaves:", tree_entropy.get_n_leaves())
`,
    },
    runnableCode: {
      code: `import numpy as np

# 80/20 probability distribution
p = np.array([0.8, 0.2])

gini = 1.0 - np.sum(p**2)
entropy = -np.sum(p * np.log2(p))

print(f"Distribution: {p}")
print(f"Gini Impurity: {gini:.4f}")
print(f"Entropy:       {entropy:.4f} bits")
print("Notice how both reflect identical purity rankings!")
`,
      expectedOutput: `Distribution: [0.8 0.2]\nGini Impurity: 0.3200\nEntropy:       0.7219 bits\nNotice how both reflect identical purity rankings!`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'p = np.array([0.8, 0.2])', explanation: 'Class probabilities for a node with 80% majority.' },
      { lines: 'Line 6', codeSnippet: 'gini = 1.0 - np.sum(p**2)', explanation: 'Evaluates Gini: 1 - (0.64 + 0.04) = 0.3200.' },
      { lines: 'Line 7', codeSnippet: 'entropy = -np.sum(p * np.log2(p))', explanation: 'Evaluates Shannon entropy in bits: 0.7219.' },
    ],
    hyperparameters: [
      { name: 'criterion', defaultVal: '"gini"', range: '["gini", "entropy", "log_loss"]', effect: 'Impurity metric used to evaluate splits.', recommendation: 'Stick with "gini" (default); it yields virtually identical trees to entropy 98% of the time while executing faster.' },
    ],
    assumptions: [
      { assumption: 'Sufficient Subsample Size', whyItMatters: 'Small sample counts in candidate child nodes produce noisy, unreliable impurity scores.', howToVerify: 'Enforce min_samples_leaf >= 5.' },
    ],
    commonMistakes: [
      { mistake: 'Expecting criterion="entropy" to drastically outperform criterion="gini"', solution: 'Gini and Entropy produce identical splits on over 98% of real-world datasets. Choose Gini for computational speed.' },
    ],
    realWorldUseCases: [
      { industry: 'Search & Information Retrieval', application: 'Query Intent Routing', benefit: 'Decision trees use Information Gain to partition search queries into commercial, navigational, or informational categories.' },
    ],
    practiceQuestions: [
      { id: 'pq-gini-1', question: 'Why is Misclassification Error (1 - max(p_i)) NOT used as a splitting criterion in decision trees?', hint: 'Consider the derivative of impurity changes.', answer: 'Misclassification error is insensitive to changes in node probability distribution unless the majority class flips. For example, a split from [400, 400] into [300, 100] and [100, 300] improves purity greatly, but misclassification error remains 0.50 before and after! Both Gini and Entropy strictly reward purity gains.' },
    ],
    quiz: [
      {
        id: 'quiz-gini-1',
        question: 'What is the theoretical maximum Gini Impurity for a balanced 2-class problem?',
        options: ['0.0', '0.25', '0.50', '1.0'],
        correctIndex: 2,
        explanation: 'For 2 classes with equal probability p = [0.5, 0.5], Gini Impurity = 1 - (0.5^2 + 0.5^2) = 1 - (0.25 + 0.25) = 1 - 0.50 = 0.50.',
      },
    ],
    independentExercise: {
      title: 'Calculate Information Gain for Continuous Feature Split',
      problem: 'Write a function compute_information_gain(y_parent, y_left, y_right) that computes Information Gain using base-2 Shannon Entropy.',
      hints: ['H = -sum(p * log2(p))', 'IG = H_parent - (len(left)/N * H_left + len(right)/N * H_right)'],
      starterCode: `import numpy as np

def info_gain(y_p, y_l, y_r):
    # TODO: return Information Gain in bits
    return 0.0

y_parent = np.array([0]*6 + [1]*4)
y_left = np.array([0]*5 + [1]*1)
y_right = np.array([0]*1 + [1]*3)
print("Information Gain:", round(info_gain(y_parent, y_left, y_right), 4))
`,
      solution: `import numpy as np

def entropy(y):
    if len(y) == 0:
        return 0.0
    _, counts = np.unique(y, return_counts=True)
    probs = counts / len(y)
    return float(-np.sum(probs * np.log2(probs)))

def info_gain(y_p, y_l, y_r):
    h_p = entropy(y_p)
    n = len(y_p)
    w_h = (len(y_l)/n) * entropy(y_l) + (len(y_r)/n) * entropy(y_r)
    return h_p - w_h

y_parent = np.array([0]*6 + [1]*4)
y_left = np.array([0]*5 + [1]*1)
y_right = np.array([0]*1 + [1]*3)
print("Information Gain:", round(info_gain(y_parent, y_left, y_right), 4))
`,
    },
    summary: {
      keyTakeaways: [
        'Gini Impurity (1 - sum(p^2)) and Shannon Entropy measure disorder; pure nodes have zero impurity.',
        'Information Gain is the reduction in entropy achieved by partitioning on a feature.',
        'Gini is mathematically a first-order Taylor approximation of Entropy, running faster without logarithms.',
      ],
      nextLessonId: 'naive-bayes',
      nextLessonTitle: 'Naive Bayes Classifiers',
      nextLessonModuleId: 'module-4',
    },
  },

  'naive-bayes': {
    id: 'naive-bayes',
    moduleId: 'module-4',
    title: 'Naive Bayes Classifiers',
    subtitle: 'The Conditional Independence Assumption, Gaussian NB & Laplace Smoothing',
    order: 7,
    readTimeMinutes: 24,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'State the Naive Bayes conditional independence assumption: P(X|y) = prod_{j=1}^d P(x_j|y).',
      'Compare Gaussian NB (continuous features), Multinomial NB (word counts), and Bernoulli NB (binary presence).',
      'Apply Laplace add-1 smoothing to prevent the zero-frequency probability trap.',
    ],
    prerequisites: ['probability-bayes-theorem', 'probability-distributions'],
    analogy: {
      title: 'The Naive Airport Customs Agent',
      text: 'A traveler arrives at airport customs. A sophisticated agent considers complex correlations (e.g. traveling alone + paid cash + carrying 3 suitcases from Bogotá). A "naive" customs agent considers each clue as 100% INDEPENDENT: 1) Did they pay cash? 2) Are they sweating? 3) Do they carry luggage? Even though sweating and cash might correlate, the agent simply multiplies the independent probabilities together. Despite this "naive" oversimplification, the agent is surprisingly effective at stopping smugglers!',
      metaphor: 'Naive Bayes assumes all features are conditionally independent given the class label.',
    },
    problemSolved: {
      title: 'High-Speed Text and Tabular Classification with High Dimensions',
      description: 'When modeling text documents with 20,000 vocabulary words, estimating full joint probabilities P(w1, w2, ..., w20000 | y) requires more data than atoms in the universe. Naive Bayes decomposes this into 20,000 simple 1D probabilities.',
      keyPoints: [
        'Blazingly fast training: single pass O(N * d) counting frequencies.',
        'Immune to the curse of dimensionality because features are modeled independently in 1D.',
        'State-of-the-art baseline for spam detection, sentiment analysis, and medical triage.',
      ],
    },
    intuition: {
      overview: 'By assuming features are conditionally independent given the class label y, the joint probability factorizes into a simple product of marginal probabilities.',
      steps: [
        { step: 1, title: 'Class Priors', description: 'Estimate base rate P(y = c) as the class proportion in the training data.' },
        { step: 2, title: 'Feature Likelihoods', description: 'Estimate 1D distribution P(x_j | y = c) for each feature independently.' },
        { step: 3, title: 'Multiply in Log Space', description: 'Score class c via log P(c) + sum log P(x_j | c) and choose the argmax.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical formulation of the Naive Bayes classification rule.',
      foundations: [
        {
          name: 'Naive Bayes Decision Rule',
          latex: '\\hat{y} = \\arg\\max_{c} \\left[ P(y = c) \\prod_{j=1}^d P(x_j | y = c) \\right] = \\arg\\max_{c} \\left[ \\log P(y = c) + \\sum_{j=1}^d \\log P(x_j | y = c) \\right]',
          explanation: 'Log-space addition prevents floating-point underflow when multiplying many tiny probabilities.',
        },
        {
          name: 'Gaussian Naive Bayes Likelihood',
          latex: 'P(x_j | y = c) = \\frac{1}{\\sqrt{2\\pi \\sigma_{jc}^2}} \\exp\\left( -\\frac{(x_j - \\mu_{jc})^2}{2\\sigma_{jc}^2} \\right)',
          explanation: 'Models continuous features as 1D Gaussians with class-conditional mean mu_jc and variance sigma_jc^2.',
        },
        {
          name: 'Multinomial NB with Laplace Add-Alpha Smoothing',
          latex: '\\theta_{jc} = \\frac{N_{jc} + \\alpha}{N_c + \\alpha d} \\quad \\text{where } \\alpha = 1 \\text{ (Laplace smoothing)}',
          explanation: 'Adds pseudo-count alpha to prevent zero probabilities when encountering unseen words.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Zero-Probability Trap and Laplace Smoothing',
      objective: 'Show why unseen words crash standard maximum likelihood estimation.',
      steps: [
        {
          step: 1,
          label: 'Unseen Word in Test Document',
          latex: '\\text{If word } j \\text{ never appeared in training class } c \\implies P(x_j | c) = \\frac{N_{jc}}{N_c} = \\frac{0}{N_c} = 0',
          explanation: 'Raw frequency estimation yields an exact probability of zero.',
        },
        {
          step: 2,
          label: 'Collapse of Joint Product',
          latex: 'P(\\mathbf{x} | c) = P(x_1 | c) \\cdot P(x_2 | c) \\cdots P(x_j | c) \\cdots = P(x_1 | c) \\cdots 0 \\cdots = 0',
          explanation: 'A single zero cancels out all other 10,000 highly informative words in the product, making posterior probability zero!',
        },
        {
          step: 3,
          label: 'Laplace Add-1 Smoothing Solution',
          latex: 'P_{\\text{Laplace}}(x_j | c) = \\frac{N_{jc} + 1}{N_c + d} > 0',
          explanation: 'Assumes every word has been observed at least once, guaranteeing non-zero probabilities everywhere.',
        },
      ],
    },
    variables: [
      { symbol: 'N_{jc}', name: 'Word Count in Class', description: 'Total occurrences of word j in documents of class c.', dimensions: 'Integer ≥ 0' },
      { symbol: '\\alpha', name: 'Smoothing Parameter', description: 'Additive pseudo-count (alpha = 1 for Laplace; alpha < 1 for Lidstone).', dimensions: 'Scalar > 0' },
      { symbol: '\\mu_{jc}, \\sigma_{jc}^2', name: 'Gaussian Moments', description: 'Mean and variance of continuous feature j in class c.', dimensions: 'Scalars' },
    ],
    numericalExample: {
      scenario: 'Classify incoming email with words ["free", "lottery"] as Spam (Class 1) or Ham (Class 0). Priors: P(Spam) = 0.4, P(Ham) = 0.6. Likelihoods: P("free"|Spam) = 0.8, P("free"|Ham) = 0.1; P("lottery"|Spam) = 0.5, P("lottery"|Ham) = 0.01.',
      dataset: [{ word1: 'free', word2: 'lottery' }],
      calculations: [
        { step: 'Spam Unnormalized Posterior', math: 'P(\\text{Spam}) \\cdot P(\\text{free}|\\text{Spam}) \\cdot P(\\text{lottery}|\\text{Spam}) = 0.4 \\cdot 0.8 \\cdot 0.5', result: '0.1600' },
        { step: 'Ham Unnormalized Posterior', math: 'P(\\text{Ham}) \\cdot P(\\text{free}|\\text{Ham}) \\cdot P(\\text{lottery}|\\text{Ham}) = 0.6 \\cdot 0.1 \\cdot 0.01', result: '0.0006' },
        { step: 'Total Evidence P(words)', math: '0.1600 + 0.0006', result: '0.1606' },
        { step: 'Normalized P(Spam | words)', math: '0.1600 / 0.1606', result: '0.9963 (99.63%)' },
      ],
      finalConclusion: 'The email is classified as Spam with 99.63% posterior probability.',
    },
    visualExplanation: {
      title: 'Gaussian Naive Bayes Bell Curves per Class',
      description: 'For each feature, Gaussian NB fits a separate 1D normal curve for each class. At test time, a query value x_j is evaluated on both curves. The ratio of bell curve heights provides the likelihood ratio.',
      features: ['Class 0: Blue Gaussian bell curve', 'Class 1: Orange Gaussian bell curve', 'Intersection point: Decision threshold'],
    },
    scratchCode: {
      title: 'Gaussian Naive Bayes in Pure Python',
      explanation: 'Calculate class means and variances, and predict via log-likelihood.',
      code: `import numpy as np

class CustomGaussianNB:
    def fit(self, X: np.ndarray, y: np.ndarray):
        self.classes_ = np.unique(y)
        self.means_ = {}
        self.vars_ = {}
        self.priors_ = {}
        
        for c in self.classes_:
            X_c = X[y == c]
            self.means_[c] = np.mean(X_c, axis=0)
            # Add small epsilon to prevent variance = 0
            self.vars_[c] = np.var(X_c, axis=0) + 1e-9
            self.priors_[c] = len(X_c) / len(X)
        return self
        
    def predict(self, X: np.ndarray):
        preds = []
        for x in X:
            posteriors = []
            for c in self.classes_:
                mu = self.means_[c]
                var = self.vars_[c]
                prior = self.priors_[c]
                
                # Log Gaussian likelihood: -0.5 * log(2*pi*var) - ((x-mu)^2 / (2*var))
                log_lik = -0.5 * np.sum(np.log(2.0 * np.pi * var)) - 0.5 * np.sum(((x - mu)**2) / var)
                log_post = np.log(prior) + log_lik
                posteriors.append((log_post, c))
            preds.append(max(posteriors)[1])
        return np.array(preds)

X_tr = np.array([[-1.0, -1.0], [-2.0, -1.0], [1.0, 1.0], [2.0, 1.0]])
y_tr = np.array([0, 0, 1, 1])

gnb = CustomGaussianNB().fit(X_tr, y_tr)
print("Prediction for [1.5, 0.8]:", gnb.predict([[1.5, 0.8]]))
`,
    },
    sklearnCode: {
      title: 'MultinomialNB for Text Spam Classification',
      explanation: 'Combining CountVectorizer with MultinomialNB.',
      code: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

train_texts = ["win cash lottery prize", "important meeting tomorrow", "free cash prize now", "project report deadline"]
train_labels = [1, 0, 1, 0] # 1 = Spam, 0 = Ham

vec = CountVectorizer()
X_counts = vec.fit_transform(train_texts)

nb = MultinomialNB(alpha=1.0) # Laplace smoothing
nb.fit(X_counts, train_labels)

test_counts = vec.transform(["free lottery"])
print("Prediction (1=Spam):", nb.predict(test_counts))
print("Probabilities:", nb.predict_proba(test_counts))
`,
    },
    runnableCode: {
      code: `import numpy as np

# Spam filter numerical example verification
p_spam = 0.4
p_ham = 0.6

p_free_spam, p_free_ham = 0.8, 0.1
p_lottery_spam, p_lottery_ham = 0.5, 0.01

score_spam = p_spam * p_free_spam * p_lottery_spam
score_ham = p_ham * p_free_ham * p_lottery_ham

posterior_spam = score_spam / (score_spam + score_ham)
posterior_ham = score_ham / (score_spam + score_ham)

print(f"Unnormalized Spam Score: {score_spam:.4f}")
print(f"Unnormalized Ham Score:  {score_ham:.4f}")
print(f"Posterior P(Spam): {posterior_spam * 100:.2f}%")
print(f"Posterior P(Ham):  {posterior_ham * 100:.2f}%")
`,
      expectedOutput: `Unnormalized Spam Score: 0.1600\nUnnormalized Ham Score:  0.0006\nPosterior P(Spam): 99.63%\nPosterior P(Ham):  0.37%`,
    },
    lineByLineExplanation: [
      { lines: 'Line 9', codeSnippet: 'score_spam = p_spam * p_free_spam * p_lottery_spam', explanation: 'Multiplies prior and independent likelihoods under conditional independence assumption.' },
      { lines: 'Line 12', codeSnippet: 'posterior_spam = score_spam / (score_spam + score_ham)', explanation: 'Normalizes by total marginal probability to yield exact posterior percentage (99.63%).' },
    ],
    hyperparameters: [
      { name: 'alpha', defaultVal: '1.0', range: '[0.01, 10.0]', effect: 'Additive Laplace smoothing pseudo-count.', recommendation: 'Set alpha=1.0 for robust text classification; tune alpha in [0.1, 1.0] for dense corpora.' },
    ],
    assumptions: [
      { assumption: 'Conditional Independence of Features Given Class', whyItMatters: 'If features are strongly correlated (e.g. "Hong" and "Kong" in text), Naive Bayes double-counts evidence, producing overconfident probabilities near 0.0 or 1.0.', howToVerify: 'Verify that correlated feature pairs are pruned or combined.' },
    ],
    commonMistakes: [
      { mistake: 'Multiplying raw probabilities in Python without taking logarithms', solution: 'Multiplying 1,000 word probabilities (e.g. 0.001^1000) causes floating-point underflow to exact 0.0. Always sum log probabilities: log P(y) + sum(log P(x_i|y)).' },
    ],
    realWorldUseCases: [
      { industry: 'Customer Support & Ticketing', application: 'Automated Ticket Tagging', benefit: 'Instantly tags incoming IT support tickets as "Network", "Hardware", or "Billing" in under 1 millisecond using Multinomial NB.' },
    ],
    practiceQuestions: [
      { id: 'pq-nb-1', question: 'Even when the conditional independence assumption is clearly violated in real-world data, why does Naive Bayes often still achieve high classification accuracy?', hint: 'Does the ranking change even if probabilities are miscalibrated?', answer: 'Classification accuracy depends only on selecting the correct winning class (argmax), NOT on exact probability calibration. Even if probability values are distorted toward 0 or 1 by correlated features, the relative ranking of classes usually remains correct.' },
    ],
    quiz: [
      {
        id: 'quiz-nb-1',
        question: 'What is the purpose of Laplace smoothing (alpha = 1.0) in Multinomial Naive Bayes?',
        options: [
          'To make the algorithm run 10 times faster.',
          'To prevent zero-frequency probability estimates when a word in the test document never appeared in that training class.',
          'To normalize feature columns to zero mean and unit variance.',
          'To convert continuous features into integers.',
        ],
        correctIndex: 1,
        explanation: 'If a word never appeared in a class during training, maximum likelihood yields P(word|class) = 0, which zeroes out the entire multiplication. Laplace smoothing adds 1 pseudo-count to guarantee non-zero probabilities.',
      },
    ],
    independentExercise: {
      title: 'Implement Bernoulli Naive Bayes Classifier',
      problem: 'Write a function bernoulli_nb_score(binary_vector, p_prior_1, p_feature_given_1, p_feature_given_0) that computes log posterior odds ratio using Bernoulli likelihoods: p^x * (1-p)^(1-x).',
      hints: ['For each feature: if x=1 use p; if x=0 use (1-p)', 'Sum in log space'],
      starterCode: `import numpy as np

def bernoulli_score(x_bin: np.ndarray, p_prior: float, p_feat_1: np.ndarray, p_feat_0: np.ndarray):
    # TODO: return log posterior ratio log(P(1|x)/P(0|x))
    return 0.0

x = np.array([1, 0, 1])
p_1 = np.array([0.8, 0.7, 0.9])
p_0 = np.array([0.1, 0.2, 0.3])
print("Log odds ratio:", bernoulli_score(x, 0.5, p_1, p_0))
`,
      solution: `import numpy as np

def bernoulli_score(x_bin: np.ndarray, p_prior: float, p_feat_1: np.ndarray, p_feat_0: np.ndarray):
    # Likelihood class 1: p^x * (1-p)^(1-x)
    lik_1 = np.where(x_bin == 1, p_feat_1, 1.0 - p_feat_1)
    lik_0 = np.where(x_bin == 1, p_feat_0, 1.0 - p_feat_0)
    
    log_post_1 = np.log(p_prior) + np.sum(np.log(lik_1))
    log_post_0 = np.log(1.0 - p_prior) + np.sum(np.log(lik_0))
    return round(float(log_post_1 - log_post_0), 4)

x = np.array([1, 0, 1])
p_1 = np.array([0.8, 0.7, 0.9])
p_0 = np.array([0.1, 0.2, 0.3])
print("Log odds ratio:", bernoulli_score(x, 0.5, p_1, p_0))
`,
    },
    summary: {
      keyTakeaways: [
        'Naive Bayes assumes features are conditionally independent given the class label.',
        'Computations are fast, simple, and performed in log space to prevent underflow.',
        'Laplace smoothing (alpha = 1) prevents unseen features from zeroing out class probabilities.',
      ],
      nextLessonId: 'support-vector-machines',
      nextLessonTitle: 'Support Vector Machines (SVM) & Maximum Margin',
      nextLessonModuleId: 'module-4',
    },
  },

  'support-vector-machines': {
    id: 'support-vector-machines',
    moduleId: 'module-4',
    title: 'Support Vector Machines (SVM) & Maximum Margin',
    subtitle: 'Geometric Margin 2/||w||, Support Vectors, Slack Variables & Hinge Loss',
    order: 8,
    readTimeMinutes: 28,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Derive the Maximum Margin hyperplane formulation: maximize 2 / ||w|| subject to functional margin constraints.',
      'Explain why the SVM decision boundary is determined solely by the subset of Support Vectors on the margin.',
      'Formulate Soft Margin SVM using slack variables xi_i and demonstrate equivalence to Hinge Loss minimization.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'vector-operations-dot-products', 'convexity-optimization'],
    analogy: {
      title: 'The Widest Highway Between Two Warring Towns',
      text: 'Imagine two rival medieval towns separated by an open field. You are tasked with paving the widest possible paved concrete highway separating the two territories. If you pave a narrow dirt road close to Town A, any slight expansion of Town A encroaches on the road. Instead, you bulldoze the widest possible symmetric boulevard right down the middle, pushing its curbs outward until they bump directly into the closest houses of both towns. Those closest houses touching the curb are the Support Vectors—they alone dictate where the highway can lie.',
      metaphor: 'SVM builds the widest possible empty safety buffer (margin) between conflicting classes.',
    },
    problemSolved: {
      title: 'Maximizing Generalization Robustness Against Perturbations',
      description: 'Many different linear hyperplanes can separate training data (e.g. perceptron solutions). But a hyperplane passing too close to data points will fail when testing data is perturbed. SVM finds the unique hyperplane with the maximum possible geometric margin of safety.',
      keyPoints: [
        'Maximizes the margin of safety 2 / ||w||, giving the best theoretical generalization bounds.',
        'Sparse in data: depends strictly on the small subset of Support Vectors.',
        'Convex quadratic programming problem with a single unique global optimum.',
      ],
    },
    intuition: {
      overview: 'The geometric distance from any point x to the hyperplane w^T x + b = 0 is |w^T x + b| / ||w||. By fixing the functional margin to 1 for the closest points, maximizing the margin is mathematically equivalent to minimizing 0.5 * ||w||^2.',
      steps: [
        { step: 1, title: 'Linear Decision Rule', description: 'Classify as +1 if w^T x + b >= 0, and -1 if w^T x + b < 0.' },
        { step: 2, title: 'Margin Boundaries', description: 'Define canonical gutters: w^T x + b = +1 and w^T x + b = -1. The width of the corridor is exactly 2 / ||w||.' },
        { step: 3, title: 'Slack Variables (Soft Margin)', description: 'Allow noisy points to violate the margin by paying a linear penalty C * sum(xi_i).' },
      ],
    },
    mathematics: {
      overview: 'Convex quadratic programming formulation of Hard and Soft Margin SVM.',
      foundations: [
        {
          name: 'Hard-Margin SVM Optimization Problem',
          latex: '\\min_{\\mathbf{w}, b} \\frac{1}{2} \\|\\mathbf{w}\\|_2^2 \\quad \\text{subject to } y_i (\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1 \\quad \\forall i',
          explanation: 'Minimizing ||w||^2 maximizes the geometric margin 2 / ||w|| while ensuring all points sit outside the corridor.',
        },
        {
          name: 'Soft-Margin SVM with Slack Variables',
          latex: '\\min_{\\mathbf{w}, b, \\boldsymbol{\\xi}} \\frac{1}{2} \\|\\mathbf{w}\\|_2^2 + C \\sum_{i=1}^N \\xi_i \\quad \\text{subject to } y_i (\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1 - \\xi_i, \\; \\xi_i \\ge 0',
          explanation: 'Slack variable xi_i measures margin violation. C controls the tradeoff between margin width and classification errors.',
        },
        {
          name: 'Hinge Loss Equivalence',
          latex: 'L_{\\text{hinge}}(\\mathbf{w}, b) = \\frac{1}{N} \\sum_{i=1}^N \\max(0, \\; 1 - y_i (\\mathbf{w}^T \\mathbf{x}_i + b)) + \\frac{1}{2C} \\|\\mathbf{w}\\|_2^2',
          explanation: 'Soft-margin SVM is mathematically identical to unconstrained Hinge Loss minimization with L2 weight regularization.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Margin Width: Margin = 2 / ||w||',
      objective: 'Calculate the physical geometric perpendicular distance between the two margin boundaries.',
      steps: [
        {
          step: 1,
          label: 'Define Boundary Hyperplanes',
          latex: '\\mathbf{w}^T \\mathbf{x}_+ + b = +1 \\quad \\text{and} \\quad \\mathbf{w}^T \\mathbf{x}_- + b = -1',
          explanation: 'Let x_+ be a support vector on the positive boundary and x_- be a support vector on the negative boundary.',
        },
        {
          step: 2,
          label: 'Subtract the Two Equations',
          latex: '\\mathbf{w}^T (\\mathbf{x}_+ - \\mathbf{x}_-) = (+1) - (-1) = 2',
          explanation: 'The difference vector (x_+ - x_-) spans across the entire margin corridor.',
        },
        {
          step: 3,
          label: 'Project along Unit Normal Vector w / ||w||',
          latex: '\\text{Margin} = \\frac{\\mathbf{w}^T}{\\|\\mathbf{w}\\|} (\\mathbf{x}_+ - \\mathbf{x}_-) = \\frac{2}{\\|\\mathbf{w}\\|}',
          explanation: 'Proves the physical width of the corridor is exactly 2 / ||w||. Maximizing the width is equivalent to minimizing 0.5 * ||w||^2.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathbf{w}', name: 'Weight Vector', description: 'Vector normal (perpendicular) to the decision hyperplane.', dimensions: 'd × 1' },
      { symbol: 'b', name: 'Bias Term', description: 'Scalar offset determining distance of hyperplane from origin.', dimensions: 'Scalar' },
      { symbol: 'C', name: 'Regularization Parameter', description: 'Penalty multiplier for margin violations. Large C = hard margin; small C = wide soft margin.', dimensions: 'Scalar > 0' },
      { symbol: '\\xi_i', name: 'Slack Variable', description: 'Degree of margin violation for sample i (0 if on or outside correct margin).', dimensions: 'Scalar ≥ 0' },
    ],
    numericalExample: {
      scenario: 'Given weight vector w = [3.0, 4.0] and bias b = -5.0. Compute the margin width, and evaluate the classification and slack of point x = [2.0, 1.0] with true label y = +1.',
      dataset: [{ w1: 3.0, w2: 4.0, b: -5.0, x1: 2.0, x2: 1.0, y: 1.0 }],
      calculations: [
        { step: 'Norm of Weight Vector ||w||', math: '\\|w\\|_2 = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25}', result: '5.0' },
        { step: 'Margin Width Calculation', math: '2 / \\|w\\| = 2 / 5.0', result: '0.40' },
        { step: 'Evaluate Linear Score (w^T x + b)', math: '3(2) + 4(1) - 5 = 6 + 4 - 5', result: '5.0' },
        { step: 'Functional Margin y (w^T x + b)', math: '1.0 \\cdot 5.0 = 5.0 \\ge 1.0', result: '5.0 (Valid)' },
        { step: 'Slack Variable xi', math: '\\xi = \\max(0, \\; 1 - 5.0) = \\max(0, -4.0)', result: '0.0 (No penalty)' },
      ],
      finalConclusion: 'The margin width is 0.40. Point x sits well beyond the positive margin gutter (functional margin 5.0 >= 1.0), with zero slack penalty.',
    },
    visualExplanation: {
      title: 'The SVM Maximum Margin Architecture',
      description: 'The solid black central line is the decision boundary w^T x + b = 0. The dashed lines are the margin gutters w^T x + b = +1 and -1. The circled points lying directly on the dashed lines are the Support Vectors. Moving any non-support vector does NOT change the decision boundary at all!',
      features: ['Central solid line: Decision boundary', 'Dashed lines: Margins (width = 2/||w||)', 'Circled points: Support Vectors'],
    },
    scratchCode: {
      title: 'Linear SVM via Subgradient Descent on Hinge Loss in NumPy',
      explanation: 'Optimize soft-margin SVM parameters directly via Hinge Loss subgradient descent.',
      code: `import numpy as np

def fit_linear_svm(X: np.ndarray, y: np.ndarray, C: float = 1.0, lr: float = 0.01, epochs: int = 200):
    """Fits soft-margin SVM using subgradient descent on Hinge Loss."""
    N, d = X.shape
    w = np.zeros(d)
    b = 0.0
    
    for _ in range(epochs):
        for i in range(N):
            margin = y[i] * (np.dot(w, X[i]) + b)
            if margin < 1.0:
                # Inside margin or misclassified: Hinge loss active
                w = w - lr * (w / (C * N) - y[i] * X[i])
                b = b + lr * y[i]
            else:
                # Outside margin: only L2 regularization applies
                w = w - lr * (w / (C * N))
                
    return np.round(w, 4), round(b, 4)

X_data = np.array([[1.0, 1.0], [2.0, 1.0], [2.0, 3.0], [3.0, 3.0]])
y_data = np.array([-1.0, -1.0, 1.0, 1.0]) # Labels must be -1 and +1

w_svm, b_svm = fit_linear_svm(X_data, y_data, C=10.0)
print(f"SVM Weights: {w_svm}, Bias: {b_svm}")
`,
    },
    sklearnCode: {
      title: 'LinearSVC in Scikit-Learn',
      explanation: 'Training LinearSVC using optimized LibLinear C++ solver.',
      code: `import numpy as np
from sklearn.svm import LinearSVC

X = np.array([[1.0, 1.0], [2.0, 1.0], [2.0, 3.0], [3.0, 3.0]])
y = np.array([-1, -1, 1, 1])

svm = LinearSVC(C=1.0, loss='hinge', max_iter=2000, random_state=42)
svm.fit(X, y)

print("Coefficients w:", svm.coef_)
print("Intercept b:", svm.intercept_)
print("Predictions:", svm.predict([[1.5, 1.5], [2.5, 2.5]]))
`,
    },
    runnableCode: {
      code: `import numpy as np

# Geometric margin demonstration
w = np.array([3.0, 4.0])
b = -5.0
norm_w = np.linalg.norm(w)
margin = 2.0 / norm_w

print(f"Weight vector: {w}, Bias: {b}")
print(f"Norm ||w||: {norm_w:.1f}")
print(f"Total Margin Width (2 / ||w||): {margin:.2f}")

# Test point
x = np.array([2.0, 1.0])
score = np.dot(w, x) + b
distance_to_boundary = score / norm_w

print(f"Point {x} -> Raw Score: {score:.1f}, Signed Perpendicular Distance: {distance_to_boundary:.2f}")
`,
      expectedOutput: `Weight vector: [3. 4.], Bias: -5.0\nNorm ||w||: 5.0\nTotal Margin Width (2 / ||w||): 0.40\nPoint [2. 1.] -> Raw Score: 5.0, Signed Perpendicular Distance: 1.00`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4-6', codeSnippet: 'w = [3, 4]; norm_w = norm(w); margin = 2 / norm_w', explanation: 'Calculates the Euclidean norm ||w|| = 5.0 and margin width 2/5 = 0.40.' },
      { lines: 'Line 14', codeSnippet: 'distance_to_boundary = score / norm_w', explanation: 'Computes geometric perpendicular distance from point x to the hyperplane.' },
    ],
    hyperparameters: [
      { name: 'C', defaultVal: '1.0', range: '[1e-3, 1000.0]', effect: 'Tradeoff parameter. Large C penalizes misclassifications heavily (narrow hard margin, high variance). Small C allows errors (wide margin, high bias).', recommendation: 'Tune C over logarithmic grid [0.01, 0.1, 1, 10, 100] via cross-validation.' },
    ],
    assumptions: [
      { assumption: 'Standardization Required', whyItMatters: 'SVM margin distance is computed in Euclidean space. Unscaled features distort the geometric margin completely.', howToVerify: 'Always use StandardScaler before SVM.' },
    ],
    commonMistakes: [
      { mistake: 'Passing target labels as {0, 1} instead of {-1, +1}', solution: 'SVM formulation relies mathematically on the product y_i * (w^T x + b) >= 1. If y = 0, the product becomes 0 and breaks the margin constraint. Target labels must be -1 and +1.' },
    ],
    realWorldUseCases: [
      { industry: 'Bioinformatics & Oncology', application: 'Cancer Tumor Malignancy Classification', benefit: 'SVMs excel in high-dimensional genomic feature spaces (d >> N) with small patient sample sizes where maximizing margin guarantees generalization.' },
    ],
    practiceQuestions: [
      { id: 'pq-svm-1', question: 'What happens to the SVM decision boundary if you move a training data point that is NOT a support vector?', hint: 'Does that point touch the margin gutters?', answer: 'Nothing! The SVM decision boundary and margin gutters depend exclusively on the support vectors. Moving or deleting any non-support vector (a point sitting safely beyond the margin) has exactly zero effect on the learned parameters w and b.' },
    ],
    quiz: [
      {
        id: 'quiz-svm-1',
        question: 'What is the effect of setting a very large value for hyperparameter C (e.g. C = 10,000) in a Soft-Margin SVM?',
        options: [
          'The model ignores training errors and builds an ultra-wide margin.',
          'The model severely penalizes any margin violations, forcing a narrow margin that fits training points strictly (approaching Hard Margin / High Variance).',
          'The weights all shrink to exact zero.',
          'The model converts into Logistic Regression.',
        ],
        correctIndex: 1,
        explanation: 'The objective is min 0.5||w||^2 + C * sum(xi_i). As C -> infinity, the penalty for slack xi_i becomes so severe that the optimizer refuses to tolerate any misclassifications, forcing a narrow hard margin that overfits to training points.',
      },
    ],
    independentExercise: {
      title: 'Extract Support Vector Count from SVC',
      problem: 'Fit an SVC(kernel="linear", C=1.0) on a 2-class dataset and report the number of support vectors for each class using model.n_support_.',
      hints: ['from sklearn.svm import SVC', 'model.n_support_'],
      starterCode: `import numpy as np
from sklearn.svm import SVC

X = np.array([[1.0, 2.0], [2.0, 1.0], [1.5, 1.8], [4.0, 4.0], [5.0, 5.0], [4.5, 4.2]])
y = np.array([0, 0, 0, 1, 1, 1])

# TODO: print number of support vectors
print("Support vectors per class:")
`,
      solution: `import numpy as np
from sklearn.svm import SVC

X = np.array([[1.0, 2.0], [2.0, 1.0], [1.5, 1.8], [4.0, 4.0], [5.0, 5.0], [4.5, 4.2]])
y = np.array([0, 0, 0, 1, 1, 1])

clf = SVC(kernel='linear', C=1.0).fit(X, y)
print("Support vectors per class (Class 0, Class 1):", clf.n_support_)
print("Total SVs:", np.sum(clf.n_support_), "out of 6 training samples")
`,
    },
    summary: {
      keyTakeaways: [
        'SVM maximizes the geometric margin 2 / ||w|| to achieve optimal generalization robustness.',
        'The decision boundary depends exclusively on the small subset of Support Vectors lying on the margin.',
        'Soft-margin SVM balances margin width and classification errors via hyperparameter C (Hinge Loss).',
      ],
      nextLessonId: 'svm-kernel-trick',
      nextLessonTitle: 'The Kernel Trick & Non-Linear SVMs',
      nextLessonModuleId: 'module-4',
    },
  },

  'svm-kernel-trick': {
    id: 'svm-kernel-trick',
    moduleId: 'module-4',
    title: 'The Kernel Trick & Non-Linear SVMs',
    subtitle: 'Mercer\'s Condition, RBF Gaussian Kernels & Infinite-Dimensional Hilbert Spaces',
    order: 9,
    readTimeMinutes: 26,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Explain the Kernel Trick: computing inner products in high-dimensional feature space without ever explicitly mapping coordinates: K(x, z) = phi(x)^T phi(z).',
      'Formulate standard kernels: Linear, Polynomial, and Radial Basis Function (RBF / Gaussian).',
      'Explain how the RBF kernel implicitly maps data into an infinite-dimensional Hilbert space.',
    ],
    prerequisites: ['support-vector-machines', 'vector-operations-dot-products'],
    analogy: {
      title: 'The Red and Blue Marbles on a Rubber Sheet',
      text: 'Imagine red and blue marbles mixed together on a flat table: the blue marbles form a circle in the center, and the red marbles form an outer ring around them. No straight ruler (linear boundary) can separate the blue marbles from the red marbles in 2D. But imagine you are a magician: you push up on the bottom of the table beneath the blue marbles, popping them up into the third dimension (3D)! Now you can slice cleanly between the raised blue marbles and the flat red marbles with a single flat sheet of glass (a 2D plane). That is what kernels do: lift data into higher dimensions where non-linear patterns become linearly separable!',
      metaphor: 'The Kernel Trick computes high-dimensional distances without paying the computational cost of higher dimensions.',
    },
    problemSolved: {
      title: 'Non-Linear Classification in Extremely High Dimensions',
      description: 'Explicitly mapping features to higher dimensions (e.g. polynomial expansion of 1,000 features) causes memory exhaustion. The Kernel Trick computes the inner products directly in the original space in O(d) time.',
      keyPoints: [
        'Solves complex non-linear classification (e.g. XOR, concentric circles).',
        'Avoids the computational explosion of calculating explicit feature mappings phi(x).',
        'Mercer\'s theorem guarantees positive semi-definite Gram matrices and convex optimization.',
      ],
    },
    intuition: {
      overview: 'In the dual formulation of SVM, the data vectors ONLY appear inside dot products: x_i^T x_j. If we replace this dot product with a kernel function K(x_i, x_j), we compute the dot product in a higher-dimensional space for free!',
      steps: [
        { step: 1, title: 'Dual Formulation', description: 'SVM dual objective depends entirely on pairwise inner products x_i^T x_j.' },
        { step: 2, title: 'Kernel Substitution', description: 'Substitute K(x_i, x_j) = <phi(x_i), phi(x_j)>.' },
        { step: 3, title: 'Inference via Support Vectors', description: 'Predict y_hat = sign(sum alpha_i y_i K(x_i, x) + b).' },
      ],
    },
    mathematics: {
      overview: 'Analytical formulations of standard Mercer kernel functions.',
      foundations: [
        {
          name: 'Radial Basis Function (RBF / Gaussian) Kernel',
          latex: 'K(\\mathbf{x}, \\mathbf{z}) = \\exp\\left( -\\gamma \\|\\mathbf{x} - \\mathbf{z}\\|_2^2 \\right) \\quad \\text{where } \\gamma = \\frac{1}{2\\sigma^2}',
          explanation: 'Measures similarity using Gaussian decay: equals 1.0 when x = z; decays toward 0 as distance increases. gamma controls boundary sharpness.',
        },
        {
          name: 'Polynomial Kernel',
          latex: 'K(\\mathbf{x}, \\mathbf{z}) = (\\mathbf{x}^T \\mathbf{z} + c)^p',
          explanation: 'Computes all polynomial and interaction combinations up to degree p.',
        },
        {
          name: 'Mercer\'s Theorem Condition',
          latex: '\\sum_{i=1}^N \\sum_{j=1}^N c_i c_j K(\\mathbf{x}_i, \\mathbf{x}_j) \\ge 0 \\quad \\forall c \\in \\mathbb{R}^N',
          explanation: 'The Gram matrix K_ij = K(x_i, x_j) must be symmetric positive semi-definite for any finite dataset.',
        },
      ],
    },
    derivation: {
      title: 'Proof that the RBF Kernel Represents an Infinite-Dimensional Mapping',
      objective: 'Show that exp(-gamma ||x - z||^2) corresponds to an infinite Taylor series of polynomial powers.',
      steps: [
        {
          step: 1,
          label: 'Expand Squared Euclidean Norm',
          latex: '\\|\\mathbf{x} - \\mathbf{z}\\|^2 = \\|\\mathbf{x}\\|^2 + \\|\\mathbf{z}\\|^2 - 2 \\mathbf{x}^T \\mathbf{z}',
          explanation: 'Break the distance into squared norms and cross-product.',
        },
        {
          step: 2,
          label: 'Factorize the Exponential',
          latex: 'K(\\mathbf{x}, \\mathbf{z}) = e^{-\\gamma \\|\\mathbf{x}\\|^2} \\cdot e^{-\\gamma \\|\\mathbf{z}\\|^2} \\cdot \\exp(2\\gamma \\mathbf{x}^T \\mathbf{z})',
          explanation: 'Isolate the cross-term exp(2 gamma x^T z).',
        },
        {
          step: 3,
          label: 'Taylor Series Expansion of Exponential',
          latex: '\\exp(2\\gamma \\mathbf{x}^T \\mathbf{z}) = \\sum_{k=0}^{\\infty} \\frac{(2\\gamma)^k}{k!} (\\mathbf{x}^T \\mathbf{z})^k = \\sum_{k=0}^{\\infty} \\langle \\boldsymbol{\\phi}_k(\\mathbf{x}), \\; \\boldsymbol{\\phi}_k(\\mathbf{z}) \\rangle',
          explanation: 'Because the Taylor series has infinite terms (k = 0 to infinity), the RBF kernel implicitly projects x into an infinite-dimensional Hilbert feature space!',
        },
      ],
    },
    variables: [
      { symbol: '\\gamma \\text{ (gamma)}', name: 'RBF Kernel Width Parameter', description: 'Controls influence radius of support vectors. High gamma = tight boundaries (overfitting); low gamma = smooth broad boundaries.', dimensions: 'Scalar > 0' },
      { symbol: 'K(\\mathbf{x}, \\mathbf{z})', name: 'Kernel Function', description: 'Symmetric inner product surrogate.', dimensions: 'Scalar' },
      { symbol: '\\boldsymbol{\\phi}(\\mathbf{x})', name: 'Implicit Feature Mapping', description: 'High-dimensional vector function.', dimensions: 'R^d -> R^infinity' },
    ],
    numericalExample: {
      scenario: 'Compute the RBF kernel similarity between two 2D points: x = [1.0, 2.0] and z = [2.0, 3.0] with gamma = 0.5.',
      dataset: [{ x1: 1.0, x2: 2.0, z1: 2.0, z2: 3.0, gamma: 0.5 }],
      calculations: [
        { step: 'Difference Vector (x - z)', math: '[1.0 - 2.0, \\; 2.0 - 3.0] = [-1.0, -1.0]', result: '[-1.0, -1.0]' },
        { step: 'Squared Euclidean Distance ||x - z||²', math: '(-1.0)^2 + (-1.0)^2 = 1.0 + 1.0', result: '2.00' },
        { step: 'Exponent (-gamma * dist²)', math: '-0.5 \\cdot 2.0', result: '-1.00' },
        { step: 'RBF Kernel Value e^(-1.0)', math: 'e^{-1.0} = 1 / e', result: '0.3679' },
      ],
      finalConclusion: 'The RBF similarity between x and z is 0.3679 (on a scale where 1.0 is identical and 0.0 is infinitely far).',
    },
    visualExplanation: {
      title: 'Concentric Circles Separated by RBF Kernel',
      description: 'In 2D, concentric circles (blue ring inside red ring) cannot be separated linearly. The RBF kernel computes Gaussian bells around points, lifting the center circle into a 3D peak that a flat 2D plane can slice through effortlessly.',
      features: ['2D Input Space: Non-linearly separable rings', '3D Kernel Feature Space: Linearly separable plane'],
    },
    scratchCode: {
      title: 'RBF Kernel Gram Matrix in Pure NumPy',
      explanation: 'Compute pairwise RBF kernel Gram matrix using vectorized broadcasting.',
      code: `import numpy as np

def compute_rbf_kernel_matrix(X1: np.ndarray, X2: np.ndarray, gamma: float = 0.5):
    """Computes pairwise RBF kernel matrix K_ij = exp(-gamma * ||x_i - z_j||^2)."""
    # Squared Euclidean distance matrix: ||x - z||^2 = ||x||^2 + ||z||^2 - 2 x^T z
    sq_dists = np.sum(X1**2, axis=1, keepdims=True) + np.sum(X2**2, axis=1) - 2 * (X1 @ X2.T)
    return np.exp(-gamma * np.maximum(sq_dists, 0.0))

X = np.array([[0.0, 0.0], [1.0, 1.0], [2.0, 2.0]])
K = compute_rbf_kernel_matrix(X, X, gamma=0.5)

print("RBF Kernel Gram Matrix (K_ii = 1.0 on diagonal):")
print(np.round(K, 4))
`,
    },
    sklearnCode: {
      title: 'Non-Linear RBF SVC in Scikit-Learn',
      explanation: 'Fitting non-linear decision boundaries on circular data using SVC(kernel="rbf").',
      code: `import numpy as np
from sklearn.svm import SVC
from sklearn.datasets import make_circles

# Generate concentric circles (impossible for linear models)
X, y = make_circles(n_samples=50, factor=0.4, noise=0.05, random_state=42)

# RBF SVM separates circles with 100% accuracy
rbf_svc = SVC(kernel='rbf', C=1.0, gamma='scale').fit(X, y)

print("RBF SVM Training Accuracy:", rbf_svc.score(X, y))
print("Total Support Vectors:", len(rbf_svc.support_))
`,
    },
    runnableCode: {
      code: `import numpy as np

# RBF calculation verification
x = np.array([1.0, 2.0])
z = np.array([2.0, 3.0])
gamma = 0.5

sq_dist = np.sum((x - z)**2)
k_val = np.exp(-gamma * sq_dist)

print(f"Point x: {x}, Point z: {z}")
print(f"Squared Euclidean Distance: {sq_dist:.2f}")
print(f"RBF Kernel K(x, z): {k_val:.4f} (exp(-0.5 * 2) = e^-1)")
`,
      expectedOutput: `Point x: [1. 2.], Point z: [2. 3.]\nSquared Euclidean Distance: 2.00\nRBF Kernel K(x, z): 0.3679 (exp(-0.5 * 2) = e^-1)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 8', codeSnippet: 'sq_dist = np.sum((x - z)**2)', explanation: 'Calculates squared Euclidean distance ||x - z||^2 = 2.0.' },
      { lines: 'Line 9', codeSnippet: 'k_val = np.exp(-gamma * sq_dist)', explanation: 'Applies Gaussian exponential decay: e^(-1) = 0.3679.' },
    ],
    hyperparameters: [
      { name: 'gamma', defaultVal: '"scale"', range: '[1e-4, 100.0]', effect: 'Inverse radius of Gaussian bell. Large gamma creates tight, isolated islands around points (overfitting); small gamma creates flat, smooth regions (underfitting).', recommendation: 'Use gamma="scale" = 1 / (d * Var(X)); tune over [0.001, 0.01, 0.1, 1, 10].' },
      { name: 'C', defaultVal: '1.0', range: '[1e-3, 1000.0]', effect: 'Regularization penalty on margin slack.', recommendation: 'Perform 2D GridSearch over (C, gamma) simultaneously.' },
    ],
    assumptions: [
      { assumption: 'Symmetric Positive Semi-Definite Kernel (Mercer Condition)', whyItMatters: 'If kernel does not satisfy Mercer condition, the Gram matrix has negative eigenvalues, destroying convexity and causing solver failure.', howToVerify: 'Verify that all eigenvalues of the Gram matrix are >= 0.' },
    ],
    commonMistakes: [
      { mistake: 'Setting gamma too large (e.g. gamma = 100)', solution: 'When gamma is too large, the Gaussian bell radius shrinks to a microscopic pinhead around each training sample. The model memorizes training points with 100% accuracy, but predicts random noise in between.' },
    ],
    realWorldUseCases: [
      { industry: 'Computational Chemistry & Drug Discovery', application: 'Molecular Fingerprint Binding Affinity', benefit: 'RBF and Tanimoto kernels compare graph representations of chemical molecules to predict whether a candidate drug binds to a viral target protein.' },
    ],
    practiceQuestions: [
      { id: 'pq-ker-1', question: 'Why does the RBF kernel have computational complexity O(N^2 * d) instead of infinite time?', hint: 'Does it calculate the infinite feature vector explicitly?', answer: 'Because the Kernel Trick computes the closed-form algebraic formula exp(-gamma * ||x - z||^2) directly on the d-dimensional vectors in original space. It NEVER computes the infinite-dimensional coordinate representation explicitly.' },
    ],
    quiz: [
      {
        id: 'quiz-ker-1',
        question: 'What happens to an RBF SVM model when hyperparameter gamma is set to an excessively large value?',
        options: [
          'The decision boundary becomes a completely flat line.',
          'The model severely overfits, creating narrow spike-like islands around individual training samples.',
          'The model refuses to train.',
          'All kernel values become 0.',
        ],
        correctIndex: 1,
        explanation: 'Large gamma means the Gaussian similarity drops to zero rapidly over tiny distances, causing the model to wrap tight, isolated decision islands around individual training points (severe overfitting / high variance).',
      },
    ],
    independentExercise: {
      title: 'Compare Decision Boundaries with Varying Gamma',
      problem: 'Train three RBF SVC models with gamma=0.1 (low), gamma=1.0 (medium), and gamma=50.0 (high) on a circular dataset. Print their training accuracies.',
      hints: ['SVC(kernel="rbf", gamma=g)', 'model.score(X, y)'],
      starterCode: `import numpy as np
from sklearn.svm import SVC
from sklearn.datasets import make_moons

X, y = make_moons(n_samples=40, noise=0.2, random_state=42)

for g in [0.1, 1.0, 50.0]:
    # TODO: fit and print score
    pass
`,
      solution: `import numpy as np
from sklearn.svm import SVC
from sklearn.datasets import make_moons

X, y = make_moons(n_samples=40, noise=0.2, random_state=42)

for g in [0.1, 1.0, 50.0]:
    clf = SVC(kernel='rbf', gamma=g, random_state=42).fit(X, y)
    print(f"Gamma={g:4.1f} -> Train Acc: {clf.score(X, y):.2f}, Support Vectors: {len(clf.support_)}")
`,
    },
    summary: {
      keyTakeaways: [
        'The Kernel Trick maps data into high-dimensional space without ever calculating coordinates explicitly.',
        'The RBF (Gaussian) kernel implicitly projects data into an infinite-dimensional Hilbert space.',
        'Tuning (C, gamma) controls the balance between margin smoothness and localized fit.',
      ],
      nextLessonId: 'probability-calibration',
      nextLessonTitle: 'Probability Calibration & Reliability Diagrams',
      nextLessonModuleId: 'module-4',
    },
  },

  'probability-calibration': {
    id: 'probability-calibration',
    moduleId: 'module-4',
    title: 'Probability Calibration & Reliability Diagrams',
    subtitle: 'Assessing Calibration, Brier Score, Platt Scaling & Isotonic Regression',
    order: 10,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Define probability calibration: among samples assigned predicted probability p, exactly p fraction should be positive.',
      'Construct and interpret Reliability Diagrams (calibration curves).',
      'Apply Platt Scaling (logistic calibration) and Isotonic Regression (non-parametric monotonic step calibration).',
    ],
    prerequisites: ['logistic-regression', 'support-vector-machines', 'regression-metrics'],
    analogy: {
      title: 'The Rain Forecaster\'s Credibility',
      text: 'Imagine a weather forecaster says: "Tomorrow there is a 70% chance of rain." If it doesn\'t rain tomorrow, was the forecaster wrong? Not necessarily! But if you look back at all 100 days where the forecaster predicted a 70% chance of rain, it SHOULD have rained on exactly 70 of those 100 days. If it only rained on 20 of those days, the forecaster is poorly calibrated (overconfident). Calibration measures whether predicted probabilities match true long-run observed frequencies.',
      metaphor: 'A calibrated model means what it says: 70% probability means 70% empirical occurrence.',
    },
    problemSolved: {
      title: 'Making Model Probabilities Trustworthy for High-Stakes Decisions',
      description: 'Many classifiers (SVMs, Naive Bayes, Boosted Trees, Deep Neural Networks) output distorted probability scores: Naive Bayes pushes probabilities to 0.0 or 1.0 due to correlated features; SVM margins are not probabilities at all. Decisions based on utility costs (e.g. loan approvals, surgery) require calibrated probabilities.',
      keyPoints: [
        'Converts arbitrary decision scores into reliable, calibrated probabilities.',
        'Enables risk-adjusted decision thresholds based on financial cost matrices.',
        'Brier score measures joint accuracy and calibration in a single metric.',
      ],
    },
    intuition: {
      overview: 'Divide predicted probabilities into bins (e.g. [0.6, 0.7]). For all samples falling in that bin, compute the actual percentage of positive samples. A perfectly calibrated model falls on the 45-degree diagonal line.',
      steps: [
        { step: 1, title: 'Bin Predictions', description: 'Group test predictions into 10 decile probability bins: [0, 0.1], [0.1, 0.2], ..., [0.9, 1.0].' },
        { step: 2, title: 'Calculate Empirical Frequencies', description: 'Compute the actual positive fraction in each bin: p_true = sum(y_i in bin) / N_bin.' },
        { step: 3, title: 'Fit Calibrator on Validation Fold', description: 'Train a 1D post-processing model (Platt logistic or Isotonic step function) mapping raw scores to calibrated probabilities.' },
      ],
    },
    mathematics: {
      overview: 'Formulations for calibration metrics and post-processing calibration mappings.',
      foundations: [
        {
          name: 'The Brier Score (Mean Squared Probability Error)',
          latex: '\\text{BS} = \\frac{1}{N} \\sum_{i=1}^N (\\hat{p}_i - y_i)^2 \\quad \\text{where } \\text{BS} \\in [0, 1]',
          explanation: 'Strictly proper scoring rule measuring probability accuracy. BS = 0 is perfection; BS = 0.25 is random guessing for balanced 50/50 classes.',
        },
        {
          name: 'Platt Scaling (Logistic Sigmoid Calibrator)',
          latex: 'P(y_i = 1 | f_i) = \\frac{1}{1 + \\exp(A f_i + B)}',
          explanation: 'Fits a 1D logistic regression on the validation decision values f_i using parameters A and B.',
        },
        {
          name: 'Expected Calibration Error (ECE)',
          latex: '\\text{ECE} = \\sum_{m=1}^M \\frac{|B_m|}{N} |\\text{acc}(B_m) - \\text{conf}(B_m)|',
          explanation: 'Weighted average absolute difference between predicted confidence and empirical accuracy across M bins.',
        },
      ],
    },
    derivation: {
      title: 'Brier Score Decomposition: Reliability, Resolution, and Uncertainty',
      objective: 'Decompose Brier Score into calibration components via Murphy decomposition.',
      steps: [
        {
          step: 1,
          label: 'Murphy Partition Formula',
          latex: '\\text{BS} = \\text{Reliability} - \\text{Resolution} + \\text{Uncertainty}',
          explanation: 'Decomposes total probability error into three distinct statistical properties.',
        },
        {
          step: 2,
          label: 'Reliability Component (Calibration)',
          latex: '\\text{Reliability} = \\sum_{m=1}^M \\frac{|B_m|}{N} (\\bar{p}_m - \\bar{y}_m)^2',
          explanation: 'Measures how close the calibration curve is to the 45-degree diagonal. Perfect calibration yields Reliability = 0.',
        },
        {
          step: 3,
          label: 'Resolution and Uncertainty',
          latex: '\\text{Uncertainty} = \\bar{y}(1 - \\bar{y}), \\quad \\text{Resolution} = \\sum_{m=1}^M \\frac{|B_m|}{N} (\\bar{y}_m - \\bar{y})^2',
          explanation: 'Resolution measures how well the model separates instances into distinct probability bins away from the base rate.',
        },
      ],
    },
    variables: [
      { symbol: '\\hat{p}_i', name: 'Predicted Probability', description: 'Model output probability score for instance i.', dimensions: 'Scalar [0, 1]' },
      { symbol: 'f_i', name: 'Raw Decision Score', description: 'Uncalibrated output score (e.g. SVM margin distance).', dimensions: 'Scalar' },
      { symbol: '\\text{BS}', name: 'Brier Score', description: 'Mean squared probability error.', dimensions: 'Scalar [0, 1]' },
    ],
    numericalExample: {
      scenario: 'Given 4 predictions: probs = [0.9, 0.8, 0.3, 0.1] with true outcomes y = [1, 1, 0, 0]. Calculate the Brier Score.',
      dataset: [{ p: 0.9, y: 1 }, { p: 0.8, y: 1 }, { p: 0.3, y: 0 }, { p: 0.1, y: 0 }],
      calculations: [
        { step: 'Error 1 (p=0.9, y=1)', math: '(0.9 - 1.0)^2 = (-0.1)^2', result: '0.01' },
        { step: 'Error 2 (p=0.8, y=1)', math: '(0.8 - 1.0)^2 = (-0.2)^2', result: '0.04' },
        { step: 'Error 3 (p=0.3, y=0)', math: '(0.3 - 0.0)^2 = (0.3)^2', result: '0.09' },
        { step: 'Error 4 (p=0.1, y=0)', math: '(0.1 - 0.0)^2 = (0.1)^2', result: '0.01' },
        { step: 'Average Brier Score', math: '(0.01 + 0.04 + 0.09 + 0.01) / 4 = 0.15 / 4', result: '0.0375' },
      ],
      finalConclusion: 'The Brier score is 0.0375 (close to 0), indicating excellent probability calibration and high accuracy.',
    },
    visualExplanation: {
      title: 'Reliability Diagram (Calibration Curve)',
      description: 'The horizontal axis shows Mean Predicted Probability; the vertical axis shows Fraction of Positives. Perfectly calibrated: 45-degree diagonal line. Sigmoid curve under 45-degree line: Overconfident (predicts 80% when reality is only 60%). Sigmoid curve above diagonal: Underconfident.',
      features: ['Diagonal line: Perfect calibration', 'Below diagonal: Overconfident', 'Above diagonal: Underconfident'],
    },
    scratchCode: {
      title: 'Reliability Diagram Calculation in Pure Python',
      explanation: 'Bin predicted probabilities and calculate empirical positive fraction.',
      code: `import numpy as np

def compute_calibration_curve(y_true: np.ndarray, y_prob: np.ndarray, n_bins: int = 5):
    """Computes bin midpoints and empirical positive rates for calibration curve."""
    bins = np.linspace(0.0, 1.0, n_bins + 1)
    bin_confs = []
    bin_accs = []
    
    for i in range(n_bins):
        mask = (y_prob >= bins[i]) & (y_prob < bins[i+1] if i < n_bins - 1 else y_prob <= bins[i+1])
        if np.sum(mask) > 0:
            bin_confs.append(float(np.mean(y_prob[mask])))
            bin_accs.append(float(np.mean(y_true[mask])))
            
    return np.round(bin_confs, 3).tolist(), np.round(bin_accs, 3).tolist()

y_t = np.array([0, 0, 1, 1, 1, 0, 1, 1])
y_p = np.array([0.1, 0.2, 0.35, 0.4, 0.7, 0.8, 0.85, 0.95])

confs, accs = compute_calibration_curve(y_t, y_p, n_bins=3)
print("Mean Predicted Confidences:", confs)
print("True Empirical Fractions:  ", accs)
`,
    },
    sklearnCode: {
      title: 'CalibratedClassifierCV in Scikit-Learn',
      explanation: 'Calibrating an uncalibrated LinearSVC using Platt scaling (method="sigmoid") or Isotonic regression.',
      code: `import numpy as np
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import brier_score_loss

X = np.random.randn(100, 2)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

# LinearSVC has no predict_proba()
base_svm = LinearSVC(random_state=42)

# CalibratedClassifierCV fits Platt scaling via 3-fold CV
calibrated_svm = CalibratedClassifierCV(base_svm, method='sigmoid', cv=3)
calibrated_svm.fit(X, y)

probs = calibrated_svm.predict_proba(X[:3])
print("Calibrated Probabilities:\n", np.round(probs, 4))
print("Brier Score:", round(brier_score_loss(y, calibrated_svm.predict_proba(X)[:, 1]), 4))
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.metrics import brier_score_loss

y_true = np.array([1, 1, 0, 0])
y_probs = np.array([0.9, 0.8, 0.3, 0.1])

# Manual Brier Score
bs_manual = np.mean((y_probs - y_true)**2)
bs_sklearn = brier_score_loss(y_true, y_probs)

print(f"Predictions: {y_probs}")
print(f"Ground Truth: {y_true}")
print(f"Manual Brier Score:  {bs_manual:.4f}")
print(f"Sklearn Brier Score: {bs_sklearn:.4f}")
print("Brier Score matches perfectly!")
`,
      expectedOutput: `Predictions: [0.9 0.8 0.3 0.1]\nGround Truth: [1 1 0 0]\nManual Brier Score:  0.0375\nSklearn Brier Score: 0.0375\nBrier Score matches perfectly!`,
    },
    lineByLineExplanation: [
      { lines: 'Line 8', codeSnippet: 'bs_manual = np.mean((y_probs - y_true)**2)', explanation: 'Calculates mean squared deviation between probabilities and binary targets.' },
      { lines: 'Line 9', codeSnippet: 'bs_sklearn = brier_score_loss(y_true, y_probs)', explanation: 'Verifies agreement with scikit-learn standard implementation.' },
    ],
    hyperparameters: [
      { name: 'method', defaultVal: '"sigmoid"', range: '["sigmoid", "isotonic"]', effect: '"sigmoid" fits Platt 1D logistic scaling (ideal for small datasets); "isotonic" fits non-parametric monotonic step function (ideal for N > 1000).', recommendation: 'Use "sigmoid" for small datasets; use "isotonic" for large datasets.' },
    ],
    assumptions: [
      { assumption: 'Monotonicity of Raw Scores', whyItMatters: 'Calibration assumes higher raw model scores correspond to higher true probability.', howToVerify: 'Verify that receiver operating characteristic (ROC) curve is convex.' },
    ],
    commonMistakes: [
      { mistake: 'Calibrating a model on the same training data it was fitted on', solution: 'Calibrating on training data causes extreme overfitting. Always calibrate on a separate validation set or use CalibratedClassifierCV(cv=5).' },
    ],
    realWorldUseCases: [
      { industry: 'Medical Triage & Critical Care', application: 'ICU Mortality Risk Estimation', benefit: 'Doctors require calibrated probabilities (e.g. "Patient has 35% probability of septic shock within 12 hours") to allocate limited ICU ventilator beds.' },
    ],
    practiceQuestions: [
      { id: 'pq-cal-1', question: 'Why does Naive Bayes produce poorly calibrated probabilities, pushing scores artificially close to 0.0 or 1.0?', hint: 'Recall what Naive Bayes assumes about feature correlation.', answer: 'Naive Bayes assumes all features are conditionally independent. When real-world features are correlated, Naive Bayes double-counts evidence by multiplying redundant probabilities, pushing scores to extreme overconfidence (e.g. 0.99999 or 0.00001).' },
    ],
    quiz: [
      {
        id: 'quiz-cal-1',
        question: 'What is Platt Scaling in machine learning?',
        options: [
          'Scaling features using StandardScaler.',
          'Fitting a 1D logistic regression model on validation decision values to convert raw scores into calibrated probabilities.',
          'Scaling weights by the learning rate.',
          'A technique to increase tree depth.',
        ],
        correctIndex: 1,
        explanation: 'Platt scaling fits a univariate logistic regression model P(y=1|f) = 1 / (1 + exp(A*f + B)) on held-out decision values f to calibrate model predictions.',
      },
    ],
    independentExercise: {
      title: 'Calibrate Naive Bayes Using Platt Scaling',
      problem: 'Use CalibratedClassifierCV(GaussianNB(), method="sigmoid", cv=3) to calibrate a Naive Bayes model. Compare Brier score before and after calibration.',
      hints: ['brier_score_loss(y_test, model.predict_proba(X_test)[:, 1])'],
      starterCode: `import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import brier_score_loss

X = np.random.randn(100, 3)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

# TODO: compare Brier score of uncalibrated vs calibrated GaussianNB
print("Brier score comparison:")
`,
      solution: `import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import brier_score_loss

np.random.seed(42)
X = np.random.randn(100, 3)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

gnb = GaussianNB().fit(X[:70], y[:70])
cal_gnb = CalibratedClassifierCV(GaussianNB(), method='sigmoid', cv=3).fit(X[:70], y[:70])

bs_raw = brier_score_loss(y[70:], gnb.predict_proba(X[70:])[:, 1])
bs_cal = brier_score_loss(y[70:], cal_gnb.predict_proba(X[70:])[:, 1])

print(f"Raw Naive Bayes Brier Score:        {bs_raw:.4f}")
print(f"Calibrated Naive Bayes Brier Score: {bs_cal:.4f} (Improved!)")
`,
    },
    summary: {
      keyTakeaways: [
        'A model is calibrated when predicted probabilities match long-run empirical frequencies.',
        'The Brier Score measures mean squared error on probabilities.',
        'Platt scaling (logistic) and Isotonic regression post-process raw scores into calibrated probabilities.',
      ],
      nextLessonId: 'confusion-matrix-metrics',
      nextLessonTitle: 'Confusion Matrix, Precision, Recall & Specificity',
      nextLessonModuleId: 'module-5',
    },
  },
};
