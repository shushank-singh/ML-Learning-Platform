import { RevisionTopic } from './types';

export const ML_REVISION_TOPICS: RevisionTopic[] = [
  {
    id: 'ml-bias-variance',
    subject: 'ml',
    category: 'ML Foundations',
    title: 'Bias-Variance Tradeoff',
    subtitle: 'The Core Balancing Act of Machine Learning',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Underfitting', 'Overfitting', 'Generalization', 'MSE Decomposition'],
    quickRecall: {
      oneLiner:
        'Bias is error from wrong assumptions (underfitting); Variance is error from sensitivity to training noise (overfitting).',
      simpleAnalogy:
        'Archery target analogy: High Bias shoots arrows grouped together, but far off-target (rigid mindset). High Variance shoots arrows scattered all over the board (too wild). The goal is Low Bias + Low Variance: tightly grouped right in the bullseye.',
      whenToUse:
        'Every time you evaluate a model that performs poorly on test data or when tuning model complexity.',
      whyItMatters:
        'Total Expected Test Error = Bias² + Variance + Irreducible Noise. You cannot minimize both to zero simultaneously.',
      keyPoints: [
        'High Bias (Underfitting): Model is too simple (e.g. straight line for curved data). High training error AND high test error.',
        'High Variance (Overfitting): Model is too complex (e.g. 15th-degree polynomial). Zero training error, but terrible test error.',
        'Sweet Spot: The complexity level where Total Validation MSE reaches its absolute lowest point.',
        'Fix High Bias: Use a more expressive model, add polynomial features, decrease regularization.',
        'Fix High Variance: Collect more data, reduce features, increase regularization (L1/L2), use bagging (Random Forests).',
      ],
      formulaOrSyntax: {
        label: 'Mean Squared Error Decomposition',
        codeOrLatex: '\\mathbb{E}[(y - \\hat{f}(x))^2] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2',
        isLatex: true,
      },
      complexity: {
        time: 'Diagnostic: O(N) evaluation time across train and validation splits',
        space: 'O(1) memory to compute error metrics',
      },
      commonMistakeOrTrap: {
        mistake: 'Adding more training data to fix high bias (underfitting).',
        fix: 'More data helps high variance (overfitting); it does NOT fix a model that is fundamentally too simple to learn the pattern.',
        interviewTrap:
          'Question: "Can training error be zero while the model is terrible?" Answer: Yes! A memorizing model (like an unpruned decision tree or 1-NN) has 0% train error but massive variance on unseen test data.',
      },
      examCheatsheet: [
        'High Train Error + High Test Error = High Bias (Underfitting)',
        'Low Train Error + High Test Error = High Variance (Overfitting)',
        'Irreducible Noise (σ²) is the theoretical lower bound on error that no algorithm can eliminate',
        'Cross-validation curve: U-shaped validation error identifies the optimal model complexity',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'The Classic U-Shaped Total Error Curve',
      caption:
        'As model complexity increases, Bias² drops monotonically while Variance climbs. The sweet spot is the minimum of the U-curve.',
      visualKey: 'ml-bias-variance-plot',
      details: {
        comparison: {
          headers: ['Metric', 'Underfitting (High Bias)', 'Sweet Spot (Balanced)', 'Overfitting (High Variance)'],
          rows: [
            ['Train Error', 'High (e.g. 28%)', 'Low (e.g. 5%)', 'Near Zero (e.g. 0.2%)'],
            ['Validation Error', 'High (e.g. 30%)', 'Lowest (e.g. 6%)', 'High (e.g. 25%)'],
            ['Decision Boundary', 'Too rigid (straight line)', 'Smooth natural curve', 'Jagged, memorizes outliers'],
            ['Solution', 'Increase model complexity', 'Ship to production', 'Regularize, prune, get more data'],
          ],
        },
      },
    },
    animation: {
      type: 'bias-variance-slider-interactive',
      title: 'Model Complexity vs. Fitting Curve',
      description:
        'Observe how increasing polynomial degree transforms a straight line (underfit) into a smooth curve (balanced), then into wild oscillations (overfit).',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Polynomial Complexity Degree',
        min: 1,
        max: 5,
        step: 1,
        defaultVal: 2,
      },
      stepsTotal: 5,
    },
    codeSnippet: {
      title: 'Diagnosing Bias vs. Variance in Python (Scikit-Learn)',
      language: 'python',
      code: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import Ridge

# Generate sample curved data
X = np.linspace(0, 1, 20)[:, None]
y = np.sin(2 * np.pi * X).ravel() + np.random.normal(0, 0.1, 20)

# Degree 1 = Underfit (High Bias)
# Degree 3 = Sweet Spot (Balanced)
# Degree 15 = Overfit (High Variance)
model = make_pipeline(PolynomialFeatures(degree=3), Ridge(alpha=0.1))
model.fit(X, y)
print(f"R² Score on Training Data: {model.score(X, y):.3f}")`,
      input: 'X (20 points from sin curve), Degree = 3',
      output: 'R² Score on Training Data: 0.984 (Well-balanced generalization)',
      explanation:
        'A degree-3 polynomial fits the natural sine wave smoothly without memorizing random noise spikes.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following actions directly helps reduce high variance (overfitting)?',
        options: [
          'Increasing the number of polynomial features',
          'Adding L1/L2 regularization or collecting more training data',
          'Decreasing the size of the training dataset',
          'Switching from a linear model to a deep neural network',
        ],
        correctIndex: 1,
        explanation: 'Regularization penalizes large weights and shrinks model capacity, directly dampening variance.',
      },
      {
        id: 'q2',
        question: 'What is irreducible error (σ²)?',
        options: [
          'Error caused by a faulty loss function',
          'Noise inherent to the true data generation process that no model can eliminate',
          'The error when training epochs reach zero',
          'Gradient descent failing to converge',
        ],
        correctIndex: 1,
        explanation: 'Irreducible error stems from unmeasured variables, sensor noise, or inherent randomness in the target.',
      },
      {
        id: 'q3',
        question: 'If your model has 1% training error and 28% test error, what is the primary diagnosis?',
        options: ['High Bias (Underfitting)', 'High Variance (Overfitting)', 'Optimal fit', 'Data leakage'],
        correctIndex: 1,
        explanation: 'A huge gap between low training error and high test error is the textbook definition of overfitting (high variance).',
      },
    ],
  },
  {
    id: 'ml-gradient-descent',
    subject: 'ml',
    category: 'Linear & Logistic Regression',
    title: 'Gradient Descent & Optimization',
    subtitle: 'Iterative First-Order Optimization for Loss Minimization',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Optimization', 'Learning Rate', 'SGD', 'Mini-Batch', 'Adam'],
    quickRecall: {
      oneLiner:
        'Gradient Descent iteratively steps parameters in the opposite direction of the loss gradient: θ = θ - η · ∇L(θ).',
      simpleAnalogy:
        'Hiker in heavy fog analogy: You are standing on a steep mountain in thick fog and want to reach the lowest valley. You cannot see the bottom, so you feel the ground slope with your boots and take a step in the direction going steepest downhill. Repeating this step-by-step brings you to the valley floor.',
      whenToUse:
        'Whenever an analytical closed-form solution is computationally infeasible or unavailable (Neural Networks, Logistic Regression, large-scale Linear Regression).',
      whyItMatters:
        'The universal mathematical workhorse powering almost all modern machine learning and deep learning training pipelines.',
      keyPoints: [
        'Batch GD: Uses entire dataset (N samples) per step. Stable and deterministic, but slow for large datasets.',
        'Stochastic GD (SGD): Uses 1 random sample per step. Fast, noisy, escapes shallow local minima, but oscillates.',
        'Mini-Batch GD: Uses small batches (e.g. 32, 64, 128). Combines vectorization efficiency with stochastic exploration.',
        'Learning Rate (η): Too small = extremely slow convergence; Too large = overshooting, divergence, or NaN loss.',
        'Momentum & Adam: Exponentially decaying moving averages of past gradients prevent oscillations in ravines.',
      ],
      formulaOrSyntax: {
        label: 'Parameter Update Rule',
        codeOrLatex: '\\theta_{t+1} = \\theta_t - \\eta \\nabla_\\theta L(\\theta_t)',
        isLatex: true,
      },
      complexity: {
        time: 'Batch: O(epochs · N · d) | SGD: O(epochs · d) per step',
        space: 'O(d) parameter vector in memory',
      },
      commonMistakeOrTrap: {
        mistake: 'Forgetting to normalize features before running gradient descent.',
        fix: 'Unscaled features create stretched, elliptical loss contours that force the gradient to zigzag wildly; scale to mean=0, std=1 for circular contours.',
        interviewTrap:
          'Question: "Why does Mini-Batch SGD generalize better than Full-Batch GD?" Answer: The noise introduced by sampling mini-batches acts as implicit regularization, helping the optimizer escape sharp local minima into broad, flat basins.',
      },
      examCheatsheet: [
        'Gradient ∇L points in the direction of steepest ASCENT; we subtract it to descend',
        'Convex loss functions (Linear/Logistic Regression) have 1 global minimum; non-convex (Neural Nets) have many local minima and saddle points',
        'Learning rate schedules (decay, cosine annealing) help settle cleanly into the minimum',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'Loss Bowl & Convergence Trajectory',
      caption:
        'Parameters step downhill across the loss surface towards θ*. If learning rate η is too high, steps oscillate and diverge.',
      visualKey: 'ml-gradient-descent-plot',
      details: {
        comparison: {
          headers: ['Variant', 'Batch Size', 'Step Speed', 'Path Stability', 'Hardware Utilization'],
          rows: [
            ['Batch GD', 'N (All samples)', 'Slow (passes all data)', 'Very smooth, direct', 'Poor on huge datasets'],
            ['SGD', '1 sample', 'Instant per step', 'Noisy, erratic zigzag', 'Poor GPU parallelization'],
            ['Mini-Batch GD', '32 to 256', 'Fast & vector-friendly', 'Moderately smooth', 'Optimal GPU tensor utilization'],
          ],
        },
      },
    },
    animation: {
      type: 'gradient-descent-interactive',
      title: 'Rolling Ball Loss Surface Simulator',
      description:
        'Watch a parameter ball roll down the convex loss bowl towards the global minimum over successive gradient iterations.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Learning Rate (η)',
        min: 0.01,
        max: 0.5,
        step: 0.05,
        defaultVal: 0.1,
      },
      stepsTotal: 5,
    },
    codeSnippet: {
      title: 'Gradient Descent from Scratch in 10 Lines of Python',
      language: 'python',
      code: `import numpy as np

# Synthetic linear data: y = 2x + 1
X = np.array([1.0, 2.0, 3.0, 4.0])
y = np.array([3.0, 5.0, 7.0, 9.0])

w, b, lr = 0.0, 0.0, 0.05
for epoch in range(100):
    y_pred = w * X + b
    dw = (-2 / len(X)) * np.sum(X * (y - y_pred)) # Gradient w.r.t w
    db = (-2 / len(X)) * np.sum(y - y_pred)      # Gradient w.r.t b
    w -= lr * dw
    b -= lr * db

print(f"Learned Weight: {w:.2f}, Bias: {b:.2f}")`,
      input: 'X = [1, 2, 3, 4], y = [3, 5, 7, 9], lr = 0.05',
      output: 'Learned Weight: 2.00, Bias: 1.00',
      explanation:
        'In 100 iterations, the gradient descent updates iteratively converge to the exact true parameters: slope=2, intercept=1.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What happens if the learning rate η is set excessively high?',
        options: [
          'The model converges to the global minimum faster',
          'The weights will overshoot the minimum and diverge to infinity or NaN',
          'The loss function automatically becomes non-convex',
          'Feature normalization is disabled',
        ],
        correctIndex: 1,
        explanation: 'An overly large learning rate causes step sizes to exceed the valley width, leading to divergence.',
      },
      {
        id: 'q2',
        question: 'Why is feature scaling essential before running Gradient Descent?',
        options: [
          'It changes the labels into binary 0 and 1',
          'It makes the loss contour circular, allowing the gradient to point directly toward the minimum without zigzagging',
          'It prevents division by zero in numpy',
          'It eliminates all negative numbers',
        ],
        correctIndex: 1,
        explanation: 'Features of different scales create stretched elliptical contours where gradients oscillate perpendicular to the path to the minimum.',
      },
      {
        id: 'q3',
        question: 'What is the primary advantage of Mini-Batch Gradient Descent over Full Batch GD?',
        options: [
          'It requires zero memory',
          'It leverages GPU vectorization while updating weights frequently with lower computational latency per step',
          'It is guaranteed to reach 0 training error',
          'It does not require calculating partial derivatives',
        ],
        correctIndex: 1,
        explanation: 'Mini-batch balances hardware parallelization on GPUs with frequent weight updates.',
      },
    ],
  },
  {
    id: 'ml-linear-regression',
    subject: 'ml',
    category: 'Linear & Logistic Regression',
    title: 'Linear Regression & Cost Functions',
    subtitle: 'Ordinary Least Squares, Residuals, and Analytical Normal Equation',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['OLS', 'MSE', 'Normal Equation', 'R-Squared', 'Gauss-Markov'],
    quickRecall: {
      oneLiner:
        'Models a continuous target as a linear combination of input features: y = Xw + b, minimizing Mean Squared Error (MSE).',
      simpleAnalogy:
        'Rubber band ruler analogy: Imagine placing a stiff straight stick among scattered data pins on a board, with tiny vertical rubber bands pulling from each pin to the stick. The stick will naturally settle at the exact line where the total pulling energy (squared vertical distance) is minimized.',
      whenToUse:
        'Predicting continuous numerical outputs (house prices, sales revenue, temperature) with linear relationships.',
      whyItMatters:
        'Highly interpretable coefficients; each feature weight w_i shows the expected change in y per 1-unit increase in x_i.',
      keyPoints: [
        'Objective: Minimize sum of squared residuals: J(w) = (1 / 2n) ||y - Xw||².',
        'Closed-form solution (Normal Equation): w = (X^T X)^(-1) X^T y. Avoids iterative gradient descent for small d.',
        'R² Score (Coefficient of Determination): Proportion of variance explained: R² = 1 - (SS_res / SS_tot).',
        'Core Assumptions: Linearity, Independence of errors, Homoscedasticity (equal variance of residuals), and Normality of residuals.',
      ],
      formulaOrSyntax: {
        label: 'Normal Equation & MSE Loss',
        codeOrLatex: '\\mathbf{w}^* = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}, \\quad \\text{MSE} = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2',
        isLatex: true,
      },
      complexity: {
        time: 'Normal Equation: O(d³ + n·d²) matrix inversion | Gradient Descent: O(epochs · n · d)',
        space: 'O(d²) for X^T X matrix',
      },
      commonMistakeOrTrap: {
        mistake: 'Using the Normal Equation when feature count d is very large (e.g. d > 20,000).',
        fix: 'Inverting a d × d matrix takes O(d³) time. When d > 10,000, use iterative Gradient Descent instead.',
        interviewTrap:
          'Question: "What happens to the Normal Equation if features are collinear?" Answer: X^T X becomes singular (non-invertible) because columns are linearly dependent. Solution: drop collinear features or use Ridge Regularization (X^T X + λI).',
      },
      examCheatsheet: [
        'OLS residuals always sum to zero: Σ (y_i - ŷ_i) = 0 when intercept term is included',
        'R² = 1.0 means perfect prediction; R² = 0.0 means predicting the mean; R² can be negative on test data',
        'Outliers disproportionately skew the line because errors are squared',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Best-Fit Line with Squared Residual Errors',
      caption:
        'The best-fit line minimizes the sum of squared vertical dashed distances from each data point to the line.',
      visualKey: 'ml-linear-regression-viz',
      details: {
        comparison: {
          headers: ['Method', 'Pros', 'Cons', 'Recommended When'],
          rows: [
            ['Normal Equation', 'Exact closed-form, no learning rate needed', 'O(d³) matrix inversion is slow for big d', 'd < 5,000 features'],
            ['Gradient Descent', 'Scales to millions of features O(n·d)', 'Requires tuning learning rate η and epochs', 'd > 10,000 features'],
          ],
        },
      },
    },
    animation: {
      type: 'linear-regression-interactive',
      title: 'Line of Best Fit Convergence',
      description:
        'Watch the slope and intercept adjust iteratively across 5 steps as squared residual distances shrink to the minimum.',
      stepsTotal: 5,
    },
    codeSnippet: {
      title: 'Linear Regression with Scikit-Learn in 5 Lines',
      language: 'python',
      code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Feature: House size (100s sq ft) -> Target: Price ($k)
X = np.array([[6], [8], [10], [14], [18]])
y = np.array([150, 200, 250, 350, 450])

model = LinearRegression().fit(X, y)
pred = model.predict([[12]]) # Predict price for 1200 sq ft

print(f"Price for 1200 sq ft: \${pred[0]:.1f}k")
print(f"Slope (w): {model.coef_[0]:.2f}, Intercept (b): {model.intercept_:.2f}")`,
      input: 'House size = 12 (1200 sq ft)',
      output: 'Price for 1200 sq ft: $300.0k | Slope: 25.00, Intercept: 0.00',
      explanation:
        'The model calculates the line equation Price = 25 * Size + 0. For 1200 sq ft, the prediction is exactly $300k.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does Ordinary Least Squares square the residual errors instead of using absolute values?',
        options: [
          'Because squared errors are differentiable everywhere and penalize large outliers more heavily',
          'Because negative numbers cannot be represented in binary',
          'To ensure the line always passes through the origin',
          'It is required by Python syntax',
        ],
        correctIndex: 0,
        explanation: 'Squaring makes the objective function smooth, convex, and differentiable everywhere, enabling direct calculus solutions.',
      },
      {
        id: 'q2',
        question: 'What is the condition known as Homoscedasticity?',
        options: [
          'All features have zero mean',
          'Residual variance remains constant across all values of the predicted variable',
          'The model has an equal number of rows and columns',
          'Weights sum up to 1',
        ],
        correctIndex: 1,
        explanation: 'Homoscedasticity assumes constant variance of residual errors across the entire range of fitted values.',
      },
      {
        id: 'q3',
        question: 'What does an R² score of 0.85 indicate?',
        options: [
          '85% of sample rows were classified correctly',
          '85% of variance in the target is explained by the independent features',
          'The learning rate was set to 0.85',
          'The model is 85% likely to overfit',
        ],
        correctIndex: 1,
        explanation: 'R² measures the proportion of variance in the dependent variable explained by the linear model.',
      },
    ],
  },
  {
    id: 'ml-logistic-regression',
    subject: 'ml',
    category: 'Linear & Logistic Regression',
    title: 'Logistic Regression & Sigmoid Threshold',
    subtitle: 'Linear Classifier for Calibrated Probabilities',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Classification', 'Sigmoid', 'Cross-Entropy', 'Log-Odds'],
    quickRecall: {
      oneLiner:
        'Passes a linear combination through the Sigmoid function σ(z) = 1 / (1 + e^-z) to output probabilities between 0 and 1.',
      simpleAnalogy:
        'Dimmer switch analogy: Linear regression outputs any number from -∞ to +∞ like an unbounded dial. Logistic regression acts like a dimmer switch: it squeezes that unbounded number through an S-shaped curve into a clean 0% to 100% probability: e.g. "There is an 82% chance this email is Spam".',
      whenToUse:
        'Binary classification tasks like spam detection, disease diagnosis, or click-through prediction where probability calibration matters.',
      whyItMatters:
        'Produces calibrated probabilities, is fast to infer, easily regularized, and interpretable via odds ratios.',
      keyPoints: [
        'Linear log-odds: log(p / (1 - p)) = w^T x + b.',
        'Decision boundary is a hyperplane where w^T x + b = 0 (p = 0.5 default threshold).',
        'Loss function: Binary Cross-Entropy (Log Loss) penalizes confident wrong predictions with infinite loss.',
        'Threshold tuning shifts the tradeoff between Precision and Recall for imbalanced datasets.',
      ],
      formulaOrSyntax: {
        label: 'Sigmoid & Binary Cross-Entropy Loss',
        codeOrLatex: '\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\text{Loss} = -\\frac{1}{n} \\sum_{i=1}^n [y_i \\log(\\hat{p}_i) + (1 - y_i) \\log(1 - \\hat{p}_i)]',
        isLatex: true,
      },
      complexity: {
        time: 'Train: O(epochs · n · d) | Inference: O(d) vector dot product',
        space: 'O(d) parameter weights',
      },
      commonMistakeOrTrap: {
        mistake: 'Using Mean Squared Error (MSE) to train Logistic Regression.',
        fix: 'MSE combined with the non-linear sigmoid produces a non-convex loss surface riddled with local minima; always use Binary Cross-Entropy (Log Loss).',
        interviewTrap:
          'Question: "If all classes are perfectly linearly separable, what happens to weights without regularization?" Answer: Weights explode to ±infinity trying to drive predicted probabilities to absolute 1.0 and 0.0! Solution: Add L2 regularization.',
      },
      examCheatsheet: [
        'Sigmoid output range is strictly (0, 1)',
        'Decision boundary in feature space is strictly linear (hyperplane)',
        'Odds = p / (1 - p); Log-odds is linear in features',
        'Multi-class generalization uses Softmax (Multinomial Logistic Regression)',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'Sigmoid Probability Curve & Linear Decision Boundary',
      caption:
        'Values of z = w^T x + b map to probabilities between 0 and 1. At z = 0, p = 0.5 (the decision boundary).',
      visualKey: 'ml-logistic-boundary-viz',
      details: {
        comparison: {
          headers: ['Property', 'Linear Regression', 'Logistic Regression'],
          rows: [
            ['Target Type', 'Continuous numerical (e.g. $42.50)', 'Discrete categorical / probability (0 or 1)'],
            ['Output Range', '(-∞, +∞)', '[0.0, 1.0] bounded by Sigmoid'],
            ['Loss Function', 'Mean Squared Error (MSE)', 'Binary Cross-Entropy (Log Loss)'],
            ['Decision Boundary', 'None (continuous surface)', 'Linear hyperplane at threshold p = 0.5'],
          ],
        },
      },
    },
    animation: {
      type: 'logistic-regression-interactive',
      title: 'Probability Threshold Classifier',
      description:
        'Slide the decision threshold from 0.1 to 0.9 to see how classification boundary shifts between Precision and Recall.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Decision Threshold',
        min: 0.1,
        max: 0.9,
        step: 0.05,
        defaultVal: 0.5,
      },
      stepsTotal: 5,
    },
    codeSnippet: {
      title: 'Logistic Regression Probability Inference in Python',
      language: 'python',
      code: `import numpy as np
from sklearn.linear_model import LogisticRegression

# Feature: Study Hours -> Target: Exam Pass (1) or Fail (0)
X = np.array([[1], [2], [3], [4], [5], [6]])
y = np.array([0, 0, 0, 1, 1, 1])

clf = LogisticRegression().fit(X, y)
# Predict calibrated probability of passing with 3.5 study hours
prob = clf.predict_proba([[3.5]])[0][1]
print(f"Pass Probability (3.5 hrs study): {prob*100:.1f}%")
print(f"Predicted Class: {'PASS' if prob >= 0.5 else 'FAIL'}")`,
      input: 'Student studies 3.5 hours',
      output: 'Pass Probability: 54.2% | Predicted Class: PASS',
      explanation:
        'The model calculates log-odds z = wx + b and passes it through sigmoid 1 / (1 + e^-z). Since 54.2% >= 50% threshold, it predicts class 1 (Pass).',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the range of output values for the Sigmoid function σ(z)?',
        options: ['[-1, 1]', '[0, 1]', '(-∞, +∞)', '[0, +∞)'],
        correctIndex: 1,
        explanation: 'Sigmoid maps any real-valued number into strictly open interval (0, 1).',
      },
      {
        id: 'q2',
        question: 'If the target is y=1 and the model predicts probability p=0.001, what happens to Binary Cross-Entropy loss?',
        options: [
          'It is very close to 0',
          'It becomes -log(0.001) ≈ 6.9, penalizing the confident error heavily',
          'The loss is ignored',
          'It resets weights to zero',
        ],
        correctIndex: 1,
        explanation: 'Log loss asymptotes to infinity as prediction diverges from ground truth label, heavily punishing overconfident false assertions.',
      },
      {
        id: 'q3',
        question: 'What shape is the decision boundary of standard Logistic Regression?',
        options: ['Spherical', 'Strictly Linear / Hyperplane', 'Circular', 'Fractal'],
        correctIndex: 1,
        explanation: 'Because the boundary occurs where w^T x + b = 0, the decision boundary in feature space is a straight line, flat plane, or hyperplane.',
      },
    ],
  },
  {
    id: 'ml-regularization',
    subject: 'ml',
    category: 'Regularization: Ridge and Lasso',
    title: 'Ridge (L2) vs. Lasso (L1) Regularization',
    subtitle: 'Weight Shrinkage and Sparsity Feature Selection',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['L1', 'L2', 'Sparsity', 'Multicollinearity', 'Overfitting'],
    quickRecall: {
      oneLiner:
        'L2 (Ridge) penalizes squared weights and shrinks them smoothly; L1 (Lasso) penalizes absolute weights and drives irrelevant weights exactly to zero.',
      simpleAnalogy:
        'Luggage weight tax analogy: Ridge (L2) charges an escalating penalty on heavy bags, so everyone packs slightly lighter across the board (smooth shrinkage). Lasso (L1) has a flat penalty per item, so people completely ditch non-essential items down to zero (automated feature selection).',
      whenToUse:
        'When models overfit or when dealing with multicollinear features or thousands of redundant predictors.',
      whyItMatters:
        'Lasso acts as automated feature selection; Ridge stabilizes models with highly correlated input features.',
      keyPoints: [
        'Ridge Penalty: λ * Σ w_j² (L2 Norm). Smooth circular constraint in weight space.',
        'Lasso Penalty: λ * Σ |w_j| (L1 Norm). Diamond-shaped constraint whose sharp corners hit axes at w_j = 0.',
        'ElasticNet: Combines both L1 and L2 penalties: r*L1 + (1-r)*L2 to handle groups of correlated features.',
        'Hyperparameter λ (alpha): As λ → ∞, all weights shrink toward 0 (high bias).',
      ],
      formulaOrSyntax: {
        label: 'Cost Functions with Regularization',
        codeOrLatex: 'J_{\\text{Ridge}} = \\text{MSE} + \\lambda \\sum_{j=1}^d w_j^2, \\quad J_{\\text{Lasso}} = \\text{MSE} + \\lambda \\sum_{j=1}^d |w_j|',
        isLatex: true,
      },
      complexity: {
        time: 'Ridge: Closed form O(d³) | Lasso: Coordinate Descent O(iterations · n · d)',
        space: 'O(d) parameter vector',
      },
      commonMistakeOrTrap: {
        mistake: 'Applying L1 or L2 regularization without standardizing features first.',
        fix: 'Features with large numeric scales will be unfairly penalized less than small-scale features; always scale to mean=0, std=1 before regularizing.',
        interviewTrap:
          'Question: "Why does Lasso produce exact zeros while Ridge does not?" Answer: Geometry! The diamond constraint of L1 has sharp vertices on the coordinate axes where the elliptical contours of MSE intersect first.',
      },
      examCheatsheet: [
        'L1 (Lasso) = Sparse solutions (Feature Selection), Non-differentiable at 0',
        'L2 (Ridge) = Dense small weights, Analytical solution (X^TX + λI)^(-1)X^Ty, Handles multicollinearity',
        'ElasticNet avoids Lasso picking only 1 feature at random from a correlated cluster',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'Geometric Contours: Diamond (L1) vs Circle (L2)',
      caption:
        'L1 diamond corners hit the axes where w_1 = 0, producing exact sparsity. L2 circular boundary shrinks weights without hitting zero.',
      visualKey: 'ml-regularization-geometry',
      details: {
        comparison: {
          headers: ['Property', 'L2 Regularization (Ridge)', 'L1 Regularization (Lasso)'],
          rows: [
            ['Penalty Term', 'λ * Σ w_j² (Squared sum)', 'λ * Σ |w_j| (Absolute sum)'],
            ['Sparsity (w_j = 0)', 'No (shrinks close to 0)', 'Yes (drives weights exactly to 0)'],
            ['Feature Selection', 'Retains all features', 'Performs automatic feature selection'],
            ['Solution Type', 'Closed-form analytical solution', 'Iterative coordinate descent'],
          ],
        },
      },
    },
    animation: {
      type: 'regularization-lambda-interactive',
      title: 'Lambda Regularization Penalty Shrinkage',
      description:
        'Slide lambda (alpha) to observe how weights shrink toward zero and watch Lasso zero out irrelevant coefficients.',
      stepsTotal: 5,
    },
    codeSnippet: {
      title: 'Lasso vs. Ridge in Python (Scikit-Learn)',
      language: 'python',
      code: `from sklearn.linear_model import Lasso, Ridge
import numpy as np

# 5 features, but only first 2 are actually important
X = np.random.randn(100, 5)
y = 3 * X[:, 0] - 2 * X[:, 1] + np.random.randn(100) * 0.1

lasso = Lasso(alpha=0.2).fit(X, y)
ridge = Ridge(alpha=1.0).fit(X, y)

print("Lasso Weights (zeros out noise):", np.round(lasso.coef_, 2))
print("Ridge Weights (shrinks all):     ", np.round(ridge.coef_, 2))`,
      input: '5 features with 3 pure noise columns',
      output: 'Lasso Weights: [2.81 -1.82 0.0 0.0 0.0] | Ridge: [2.95 -1.97 0.04 -0.02 0.05]',
      explanation:
        'Notice how Lasso drove the last 3 noise features to exactly 0.00, automatically performing clean feature selection.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does Lasso (L1) produce sparse models with exact zero weights?',
        options: [
          'Because its diamond-shaped constraint has sharp corners on the coordinate axes where loss contours touch first',
          'Because it uses negative learning rates',
          'Because it inverts the covariance matrix',
          'Because it only works with boolean data',
        ],
        correctIndex: 0,
        explanation: 'The geometric corners of the L1 diamond align with axes where one or more coordinates equal zero.',
      },
      {
        id: 'q2',
        question: 'When is Ridge (L2) preferred over Lasso (L1)?',
        options: [
          'When you want to eliminate 90% of features',
          'When features are highly correlated and you want to keep all of them with shared small weights',
          'When no scaling is performed',
          'When data is non-linear',
        ],
        correctIndex: 1,
        explanation: 'Ridge stabilizes models under multicollinearity by distributing weight shrinkage across correlated features.',
      },
      {
        id: 'q3',
        question: 'What happens to a model when the regularization parameter λ is set to 0?',
        options: [
          'All weights become 0',
          'The model reduces to unregularized Ordinary Least Squares (OLS)',
          'The model predicts only the mean',
          'Variance drops to zero',
        ],
        correctIndex: 1,
        explanation: 'When λ = 0, the penalty term disappears completely, yielding standard OLS regression.',
      },
    ],
  },
  {
    id: 'ml-knn',
    subject: 'ml',
    category: 'KNN',
    title: 'K-Nearest Neighbors (KNN)',
    subtitle: 'Instance-Based Non-Parametric Metric Learning',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Non-parametric', 'Lazy Learning', 'Distance Metric', 'Curse of Dimensionality'],
    quickRecall: {
      oneLiner:
        'Classifies a query point by taking the majority vote (or average for regression) of its K closest training samples.',
      simpleAnalogy:
        'Asking your closest neighbors analogy: If you want to know what neighborhood culture is like, you ask the 5 closest people living next door to you. If 4 of them say "Quiet", you classify your home as "Quiet".',
      whenToUse:
        'Small to moderate datasets with non-linear decision boundaries where baseline interpretability is helpful.',
      whyItMatters:
        'Requires zero explicit training phase ("lazy learner"), adapting dynamically as new labeled instances arrive.',
      keyPoints: [
        'K parameter controls boundary smoothness: K=1 yields jagged, overfitted boundaries; large K creates smooth, underfitted boundaries.',
        'Distance metrics: Euclidean (L2), Manhattan (L1), Minkowski, or Cosine similarity.',
        'Feature scaling is mandatory: unscaled large-magnitude features dominate distance computations completely.',
        'Suffers heavily from the Curse of Dimensionality: in high dimensions, all pairwise distances become equidistant.',
      ],
      formulaOrSyntax: {
        label: 'Euclidean Distance Formula',
        codeOrLatex: 'd(p, q) = \\sqrt{\\sum_{i=1}^{d} (p_i - q_i)^2}',
        isLatex: true,
      },
      complexity: {
        time: 'Train: O(1) [Lazy] | Inference: O(N · d) brute force, or O(d log N) with KD-Tree',
        space: 'O(N · d) [Stores entire training set in RAM]',
      },
      commonMistakeOrTrap: {
        mistake: 'Picking an even number for K in binary classification.',
        fix: 'Use odd K (e.g. 3, 5, 7) to avoid frustrating 50-50 tie-break scenarios.',
        interviewTrap:
          'Question: "Why is KD-Tree ineffective for high-dimensional data (e.g. d > 50)?" Answer: High-dimensional geometry forces the algorithm to explore nearly all branches, degrading KD-Tree back to O(N) brute force search.',
      },
      examCheatsheet: [
        'K=1: High variance, captures every outlier, training error = 0%',
        'K=N: High bias, predicts majority class of the entire dataset',
        'Inference is computationally expensive on large datasets',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'Voronoi Tessellation & Neighborhood Voting Circles',
      caption:
        'A query point expands a radius encompassing K neighbors. 3 blue circles vs. 1 red square = predicts Class Blue.',
      visualKey: 'ml-knn-neighborhood-viz',
      details: {
        comparison: {
          headers: ['Choice of K', 'Decision Boundary', 'Bias / Variance', 'Outlier Sensitivity'],
          rows: [
            ['K = 1', 'Jagged, island-like boundaries', 'Low Bias, High Variance (Overfit)', 'Extremely sensitive to noise'],
            ['K = 5 (Optimal)', 'Smooth, natural boundaries', 'Balanced trade-off', 'Robust against isolated noise'],
            ['K = N', 'Flat, predicts majority class everywhere', 'High Bias, Zero Variance (Underfit)', 'Completely ignores local patterns'],
          ],
        },
      },
    },
    animation: {
      type: 'knn-neighbor-interactive',
      title: 'K Neighbors Radius Slider',
      description:
        'Watch an expanding circle encompass nearest neighbors and observe the majority classification vote update.',
      stepsTotal: 5,
    },
    codeSnippet: {
      title: 'KNN Classification in Python (Scikit-Learn)',
      language: 'python',
      code: `from sklearn.neighbors import KNeighborsClassifier
import numpy as np

# Features: [Age, Income] -> Target: Purchase (0 or 1)
X_train = np.array([[20, 25], [25, 30], [45, 80], [50, 85]])
y_train = np.array([0, 0, 1, 1])

# Always use odd K for binary classification
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# Query: Customer Age 22, Income 28
pred = knn.predict([[22, 28]])
print(f"Predicted Class: {pred[0]} (0 = No, 1 = Buy)")`,
      input: 'Query customer: [Age: 22, Income: 28k]',
      output: 'Predicted Class: 0 (No Purchase)',
      explanation:
        'The query point is closest to the two younger customers with low income, so majority vote selects Class 0.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the training time complexity of standard KNN?',
        options: ['O(N log N)', 'O(N²)', 'O(1) because it simply stores training data in RAM', 'O(d³)'],
        correctIndex: 2,
        explanation: 'KNN is a lazy learner; training merely stores references to data points in memory without computing weights.',
      },
      {
        id: 'q2',
        question: 'What happens to KNN when K=1?',
        options: [
          'The decision boundary is overly smooth and underfits',
          'The training set accuracy is 100%, but it is extremely sensitive to noise and overfits',
          'It predicts the global dataset majority class',
          'The inference speed is doubled',
        ],
        correctIndex: 1,
        explanation: 'When K=1, every training point is its own nearest neighbor, causing 0% train error but brittle, jagged boundaries around noise.',
      },
      {
        id: 'q3',
        question: 'Why does KNN degrade on datasets with 500 features?',
        options: [
          'Because of the Curse of Dimensionality: high-dimensional space is sparse and distance metrics lose contrast',
          'Computers cannot calculate square roots in high dimensions',
          'KNN only works on 2D planes',
          'Memory addresses overflow',
        ],
        correctIndex: 0,
        explanation: 'In high dimensions, volume grows exponentially, points become uniformly distant, and distance metrics lose discriminative power.',
      },
    ],
  },
  {
    id: 'ml-decision-trees',
    subject: 'ml',
    category: 'Decision Trees',
    title: 'Decision Trees & Information Gain',
    subtitle: 'Recursive Greedy Partitioning via Entropy and Gini Impurity',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['CART', 'Gini Impurity', 'Entropy', 'Splitting', 'Pruning'],
    quickRecall: {
      oneLiner:
        'Recursively splits feature space using orthogonal axis-aligned cuts that maximize Information Gain (or minimize Gini Impurity).',
      simpleAnalogy:
        '20 Questions game analogy: You ask yes/no questions that eliminate the maximum number of possibilities at each step (e.g. "Is it an animal?" splits the world in half much better than "Is it a golden retriever?").',
      whenToUse:
        'Tabular datasets requiring white-box interpretability, automatic handling of mixed data types, and non-linear interactions.',
      whyItMatters:
        'Forms the foundational building block for world-class ensemble algorithms like Random Forest and XGBoost.',
      keyPoints: [
        'Gini Impurity: G = 1 - Σ p_i²; Entropy: H = -Σ p_i log2(p_i). Both measure node disorder (0 = pure node).',
        'Information Gain: Impurity(Parent) - Weighted Average Impurity(Children).',
        'Greedy algorithm (CART/ID3): Splitting does not backtrack; optimal local cut may miss global optimum.',
        'Pruning is vital: Unconstrained trees grow deep until leaf nodes have 1 sample, causing acute overfitting.',
      ],
      formulaOrSyntax: {
        label: 'Gini Impurity & Information Gain',
        codeOrLatex: 'Gini(p) = 1 - \\sum_{k=1}^C p_k^2, \\quad IG(T, a) = H(T) - \\sum_{v \\in \\text{vals}(a)} \\frac{|T_v|}{|T|} H(T_v)',
        isLatex: true,
      },
      complexity: {
        time: 'Train: O(n · d · log n) | Inference: O(depth) ≤ O(log n)',
        space: 'O(nodes)',
      },
      commonMistakeOrTrap: {
        mistake: 'Failing to constrain tree growth (max_depth, min_samples_split).',
        fix: 'Always tune max_depth (e.g. 3 to 8) or apply cost-complexity pruning to prevent memorization.',
        interviewTrap:
          'Question: "Are decision trees sensitive to monotonic feature scaling (like normalization)?" Answer: No! Splits depend strictly on the ordering of values, so multiplying a feature by 100 has zero effect on the resulting tree.',
      },
      examCheatsheet: [
        'Scale invariant: No feature standardization or normalization needed',
        'Handles numerical and categorical features seamlessly',
        'Decision boundaries are strictly orthogonal (staircase shapes on diagonal boundaries)',
        'High variance: Small change in training data can drastically alter top splits',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Binary Tree Branching & Axis-Aligned Feature Partitions',
      caption:
        'Internal nodes evaluate predicates (e.g. Age > 30). Leaf nodes output class probabilities or mean target values.',
      visualKey: 'ml-decision-tree-viz',
      details: {
        comparison: {
          headers: ['Metric', 'Formula', 'Range', 'Computational Characteristic'],
          rows: [
            ['Gini Impurity', '1 - Σ p_i²', '[0.0, 0.5] for binary', 'Faster: avoids log2() calculations (Scikit-Learn default)'],
            ['Entropy', '-Σ p_i log2(p_i)', '[0.0, 1.0] for binary', 'Slightly slower: requires log computations, yields similar trees'],
          ],
        },
      },
    },
    animation: {
      type: 'decision-tree-traverse-interactive',
      title: 'Sample Traversal Through Decision Branches',
      description:
        'Step through a query data point traversing from the root node down to the pure leaf prediction.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Decision Tree Classifier in Python (Scikit-Learn)',
      language: 'python',
      code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)

# Limit max_depth to 3 to prevent overfitting
clf = DecisionTreeClassifier(max_depth=3, criterion='gini')
clf.fit(X, y)

sample = [[5.1, 3.5, 1.4, 0.2]] # Iris Setosa measurements
pred = clf.predict(sample)
print(f"Predicted Class: {pred[0]} (0 = Setosa)")
print(f"Tree Depth: {clf.get_depth()}, Leaves: {clf.get_n_leaves()}")`,
      input: 'Iris flower sample: [5.1, 3.5, 1.4, 0.2]',
      output: 'Predicted Class: 0 (Setosa) | Tree Depth: 3, Leaves: 5',
      explanation:
        'The sample immediately branches left on petal length <= 2.45cm at the root, leading directly to a pure Setosa leaf.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the Gini Impurity of a leaf node containing only samples of Class A?',
        options: ['1.0', '0.5', '0.0 (Pure node)', '-1.0'],
        correctIndex: 2,
        explanation: 'When p=1.0, Gini = 1 - 1² = 0.0. A score of 0 represents complete purity.',
      },
      {
        id: 'q2',
        question: 'Why do decision trees not require feature scaling like Min-Max or Z-score normalization?',
        options: [
          'Because splits evaluate order-based thresholds (x > threshold) which are invariant to monotonic scaling',
          'Because trees divide all values by the root node',
          'Because trees only work with boolean values',
          'Because they convert all data to binary strings',
        ],
        correctIndex: 0,
        explanation: 'The split criterion only checks whether a value is greater or smaller than a threshold, which is unaffected by scaling.',
      },
      {
        id: 'q3',
        question: 'What is the primary weakness of an individual unpruned decision tree?',
        options: [
          'Extreme high bias',
          'Extreme high variance and instability (overfitting)',
          'Inability to handle missing values',
          'Extremely slow inference time',
        ],
        correctIndex: 1,
        explanation: 'An unpruned tree will keep splitting until every training sample is isolated into its own leaf, resulting in high variance.',
      },
    ],
  },
  {
    id: 'ml-svm',
    subject: 'ml',
    category: 'SVM',
    title: 'Support Vector Machines (SVM)',
    subtitle: 'Maximum Margin Hyperplanes & The Kernel Trick',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Margin', 'Support Vectors', 'Hinge Loss', 'Kernel Trick', 'RBF'],
    quickRecall: {
      oneLiner:
        'Finds the optimal separating hyperplane that maximizes the geometric margin (2 / ||w||) between closest support vector points.',
      simpleAnalogy:
        'Widest highway analogy: Many different fences could separate two properties, but SVM builds the widest possible concrete highway between them. The boundary stones touching the road edges are the "support vectors"; moving any other stones elsewhere doesn\'t affect the highway at all.',
      whenToUse:
        'High-dimensional classification problems (e.g. bioinformatics, text categorization) with clear margin separation.',
      whyItMatters:
        'Only support vectors dictate the decision boundary; points far away have zero influence on the model.',
      keyPoints: [
        'Hard Margin: Requires complete linear separability (vulnerable to single outliers).',
        'Soft Margin: Introduces slack variables (ξ_i) and penalty parameter C: Large C = narrow margin (harder); Small C = wider margin (soft).',
        'Kernel Trick: Maps non-linear data into higher-dimensional feature space without computing coordinates explicitly via inner products.',
        'Popular Kernels: Linear, Polynomial K(x, z) = (x^T z + c)^d, Radial Basis Function (RBF) / Gaussian K(x, z) = exp(-γ ||x - z||²).',
      ],
      formulaOrSyntax: {
        label: 'Primal Optimization Objective & Hinge Loss',
        codeOrLatex: '\\min_{w, b} \\frac{1}{2} ||w||^2 + C \\sum_{i=1}^n \\max(0, 1 - y_i (w^T x_i + b))',
        isLatex: true,
      },
      complexity: {
        time: 'Train: O(n² · d) to O(n³) [Quadratic Programming] | Inference: O(S · d) [S = # Support Vectors]',
        space: 'O(S · d) support vectors stored in RAM',
      },
      commonMistakeOrTrap: {
        mistake: 'Training an SVM on 1,000,000 samples with an RBF kernel.',
        fix: 'Kernel SVM scales quadratically/cubically with sample size n; for big data, use LinearSVC or SGDClassifier with hinge loss.',
        interviewTrap:
          'Question: "What happens to the SVM decision boundary as RBF parameter γ (gamma) goes to infinity?" Answer: It creates isolated tight circular islands around individual support vectors, leading to extreme overfitting.',
      },
      examCheatsheet: [
        'Only Support Vectors on or inside margin lines define weights',
        'C parameter: Large C = Low bias, High variance; Small C = High bias, Low variance',
        'Hinge Loss is zero for points correctly classified beyond the margin: max(0, 1 - y·f(x))',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'Optimal Separating Hyperplane & Margin Width',
      caption:
        'The hyperplane w^T x + b = 0 maximizes the margin width 2 / ||w||. Circles on the dotted gutters are Support Vectors.',
      visualKey: 'ml-svm-margin-viz',
      details: {
        comparison: {
          headers: ['Parameter', 'Small Value', 'Large Value'],
          rows: [
            ['C (Penalty)', 'Wider margin, tolerates margin violations (Soft)', 'Narrow margin, strictly penalizes misclassifications (Hard)'],
            ['Gamma γ (RBF)', 'Broad, smooth decision boundary (Far reach)', 'Tight, localized islands around points (Overfitting)'],
          ],
        },
      },
    },
    animation: {
      type: 'svm-margin-interactive',
      title: 'Margin Width vs. C Parameter Simulator',
      description:
        'Step through margin width adjustments to observe how Support Vectors define the decision boundary.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Support Vector Machine in Python (Scikit-Learn)',
      language: 'python',
      code: `from sklearn.svm import SVC
import numpy as np

# Non-linear XOR-like dataset
X = np.array([[-1, -1], [1, 1], [-1, 1], [1, -1]])
y = np.array([0, 0, 1, 1])

# RBF Kernel maps 2D coordinates into infinite-dimensional Hilbert space
clf = SVC(kernel='rbf', C=1.0, gamma='scale')
clf.fit(X, y)

print(f"Number of Support Vectors: {len(clf.support_vectors_)}")
print(f"Prediction for (0.8, 0.9): {clf.predict([[0.8, 0.9]])[0]}")`,
      input: 'Point [0.8, 0.9] tested against RBF kernel SVM',
      output: 'Number of Support Vectors: 4 | Prediction: 0',
      explanation:
        'The RBF kernel successfully separates the non-linear XOR data points with 100% accuracy.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the role of Support Vectors in an SVM?',
        options: [
          'They are outlier points that are discarded during preprocessing',
          'They are the critical data points lying exactly on or within the margin that exclusively determine the hyperplane position',
          'They are the centroids of each class',
          'They represent the learning rate',
        ],
        correctIndex: 1,
        explanation: 'Removing any non-support vector data point does not alter the decision boundary at all.',
      },
      {
        id: 'q2',
        question: 'What does the Kernel Trick accomplish in SVMs?',
        options: [
          'It deletes noisy features automatically',
          'It calculates inner products in high-dimensional feature space without explicitly computing coordinates',
          'It forces the boundary to remain strictly linear',
          'It accelerates training to O(1)',
        ],
        correctIndex: 1,
        explanation: 'By computing K(x, z) = <φ(x), φ(z)>, it avoids the combinatorial explosion of explicit coordinate projection.',
      },
      {
        id: 'q3',
        question: 'What happens when the regularization parameter C in SVM is very large?',
        options: [
          'The margin becomes as wide as possible, ignoring errors',
          'The margin narrows and strictly penalizes misclassifications, risking overfitting',
          'The kernel automatically switches to linear',
          'All points become support vectors',
        ],
        correctIndex: 1,
        explanation: 'High C puts heavy penalty on slack variables, demanding a hard margin with minimal tolerance for violations.',
      },
    ],
  },
  {
    id: 'ml-evaluation-metrics',
    subject: 'ml',
    category: 'Evaluation Metrics',
    title: 'Classification Metrics & ROC-AUC',
    subtitle: 'Confusion Matrix, Precision-Recall Tradeoff, and Discrimination Thresholds',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Precision', 'Recall', 'F1-Score', 'ROC-AUC', 'Confusion Matrix'],
    quickRecall: {
      oneLiner:
        'Accuracy fails on imbalanced data; Precision measures positive prediction purity, Recall measures positive detection rate, and ROC-AUC evaluates threshold-independent ranking.',
      simpleAnalogy:
        'Airport metal detector analogy: High Recall catches every single pair of scissors, but has false alarms (low precision). High Precision never rings unless it is 100% sure, but might miss small items (low recall). The F1-Score balances the two.',
      whenToUse:
        'Evaluating any classification model, especially under severe class imbalance (fraud detection, medical diagnosis).',
      whyItMatters:
        'Predicting all 0s in a dataset with 99% negative cases achieves 99% accuracy while being completely useless in practice.',
      keyPoints: [
        'Confusion Matrix: True Positive (TP), False Positive (FP), False Negative (FN), True Negative (TN).',
        'Precision = TP / (TP + FP): When model says positive, how often is it right? (Important for spam filtering).',
        'Recall (Sensitivity) = TP / (TP + FN): Of all actual positives, how many were caught? (Vital for cancer detection).',
        'F1-Score = 2 · (P · R) / (P + R): Harmonic mean of Precision and Recall.',
        'ROC-AUC: Area under True Positive Rate vs False Positive Rate curve across all thresholds (0.5 = random guess, 1.0 = perfect).',
      ],
      formulaOrSyntax: {
        label: 'Core Classification Formulas',
        codeOrLatex: '\\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}, \\quad F_1 = \\frac{2 \\cdot P \\cdot R}{P + R}',
        isLatex: true,
      },
      complexity: {
        time: 'Confusion matrix: O(N) | ROC-AUC: O(N log N) for sorting thresholds',
        space: 'O(1) memory for 2x2 matrix',
      },
      commonMistakeOrTrap: {
        mistake: 'Using ROC-AUC on extremely imbalanced datasets (e.g. 1 positive in 10,000).',
        fix: 'A huge number of True Negatives inflates False Positive Rate (FP / (FP + TN)); use Precision-Recall AUC (PR-AUC) instead.',
        interviewTrap:
          'Question: "Why harmonic mean for F1 instead of arithmetic mean?" Answer: The harmonic mean punishes extreme discrepancies; if Precision is 1.0 but Recall is 0.0, arithmetic mean is 0.50, but harmonic F1 is 0.0!',
      },
      examCheatsheet: [
        'Accuracy = (TP + TN) / Total',
        'High Recall is prioritized when False Negatives are catastrophic (medical test, fraud)',
        'High Precision is prioritized when False Positives are annoying/expensive (spam classifier, loan auto-approval)',
        'ROC-AUC is insensitive to class prevalence shifts',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'Confusion Matrix & Metric Derivations',
      caption:
        'Visualizing the 2x2 grid of Actual vs. Predicted values and how Precision, Recall, and F1 originate from it.',
      visualKey: 'ml-metrics-roc-viz',
      details: {
        comparison: {
          headers: ['Metric', 'Formula', 'Best For', 'Cost Focus'],
          rows: [
            ['Precision', 'TP / (TP + FP)', 'Spam filtering, recommendation systems', 'Minimizing False Positives (FP)'],
            ['Recall (Sensitivity)', 'TP / (TP + FN)', 'Disease diagnosis, fraud detection', 'Minimizing False Negatives (FN)'],
            ['F1-Score', '2 · P · R / (P + R)', 'Imbalanced data benchmark', 'Harmonizes P and R equally'],
            ['ROC-AUC', 'Integral of TPR vs FPR', 'Threshold-free ranking capability', 'Discriminative power'],
          ],
        },
      },
    },
    animation: {
      type: 'metrics-confusion-matrix-interactive',
      title: 'Interactive Confusion Matrix & Threshold Dial',
      description:
        'Step through probability thresholds to see how TP, FP, FN, and TN shift dynamically.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Evaluation Metrics in Python (Scikit-Learn)',
      language: 'python',
      code: `from sklearn.metrics import classification_report, roc_auc_score
import numpy as np

# Ground truth and predicted probabilities
y_true = np.array([0, 0, 0, 0, 1, 1, 1, 1])
y_pred_prob = np.array([0.1, 0.2, 0.4, 0.7, 0.6, 0.8, 0.9, 0.95])
y_pred = (y_pred_prob >= 0.5).astype(int)

auc = roc_auc_score(y_true, y_pred_prob)
print(f"ROC-AUC Score: {auc:.3f}")
print(classification_report(y_true, y_pred, target_names=['Class 0', 'Class 1']))`,
      input: '8 samples, threshold = 0.5',
      output: 'ROC-AUC: 0.938 | Precision (Class 1): 0.80 | Recall (Class 1): 1.00',
      explanation:
        'All actual positives were detected (Recall = 100%), with only one false alarm (Precision = 80%).',
    },
    quiz: [
      {
        id: 'q1',
        question: 'In a medical cancer detection model, which metric should be prioritized above all else?',
        options: ['Accuracy', 'Precision', 'Recall (Sensitivity)', 'Specificity'],
        correctIndex: 2,
        explanation: 'Missing a cancer patient (False Negative) can be fatal; high Recall guarantees maximum positive detection.',
      },
      {
        id: 'q2',
        question: 'What is the F1-score if a model has Precision = 1.0 and Recall = 0.0?',
        options: ['0.5', '0.0', '1.0', 'Undefined'],
        correctIndex: 1,
        explanation: 'F1 = 2 · (1.0 · 0.0) / (1.0 + 0.0) = 0.0. The harmonic mean drops to zero if either metric is zero.',
      },
      {
        id: 'q3',
        question: 'What does an ROC-AUC of 0.5 represent?',
        options: ['A perfect classifier', 'A model performing no better than random coin-flip guessing', '50% training error', 'Overfitting'],
        correctIndex: 1,
        explanation: 'A diagonal ROC curve represents random guessing, encompassing exactly 0.5 area under the curve.',
      },
    ],
  },
  {
    id: 'ml-random-forest-xgboost',
    subject: 'ml',
    category: 'Random Forest, XGBoost and LightGBM',
    title: 'Random Forest vs. Gradient Boosting (XGBoost)',
    subtitle: 'Bagging vs. Sequential Residual Boosting Ensembles',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Bagging', 'Boosting', 'Random Forest', 'XGBoost', 'LightGBM'],
    quickRecall: {
      oneLiner:
        'Random Forest trains independent deep trees in parallel on bootstrap samples to reduce variance; Gradient Boosting trains shallow trees sequentially to fit residuals and reduce bias.',
      simpleAnalogy:
        'Committee vs. Tutor analogy: Random Forest is a committee of 100 independent experts voting in parallel (reduces wild mistakes). Gradient Boosting is a student working with a tutor where each new lesson focuses exclusively on the questions the student got wrong on the previous test.',
      whenToUse:
        'Standard go-to algorithms for structured tabular datasets (Kaggle benchmarks, finance, churn prediction).',
      whyItMatters:
        'Dominates real-world tabular data competitions; offers automated feature importance and non-linear feature interaction capture.',
      keyPoints: [
        'Random Forest (Bagging): Bootstrap aggregating + random feature sub-sampling (sqrt(d)). Trees grow deep independently.',
        'Boosting (GBDT/XGBoost): Trees grow sequentially. Each tree fits negative gradient (pseudo-residuals) of loss function: F_m(x) = F_{m-1}(x) + η · h_m(x).',
        'XGBoost innovations: 2nd-order Taylor expansion (Hessians), regularized objective, weighted quantile sketch, column block parallelization.',
        'LightGBM: Leaf-wise tree growth + Histogram-based binning + GOSS for massive speedups on large data.',
      ],
      formulaOrSyntax: {
        label: 'Additive Boosting Model Update',
        codeOrLatex: 'F_m(x) = F_{m-1}(x) + \\eta \\cdot h_m(x), \\quad \\text{where } h_m \\approx -\\left[\\frac{\\partial L(y, F(x))}{\\partial F(x)}\\right]',
        isLatex: true,
      },
      complexity: {
        time: 'RF Train: O(M · n · d log n) [Fully parallelizable] | Boosting: O(M · n · d) [Sequential]',
        space: 'O(M · nodes) for storing M trees',
      },
      commonMistakeOrTrap: {
        mistake: 'Thinking Random Forest can overfit simply by adding more trees (increasing n_estimators).',
        fix: 'Adding more trees in Random Forest NEVER causes overfitting; it simply stabilizes the variance estimate. In Boosting, too many trees DOES cause overfitting.',
        interviewTrap:
          'Question: "Why does Random Forest randomly select a subset of features at each split?" Answer: To decorrelate the trees! If one feature is overwhelmingly strong, all trees would pick it first without random feature subsets, defeating the variance reduction of bagging.',
      },
      examCheatsheet: [
        'Bagging = Parallel, Deep trees, Reduces Variance',
        'Boosting = Sequential, Shallow trees, Reduces Bias',
        'LightGBM uses leaf-wise growth (faster, deeper) while XGBoost traditionally uses depth-wise',
        'Feature Importance: MDI (Mean Decrease in Impurity) vs Permutation Importance',
      ],
    },
    visual: {
      type: 'architecture',
      title: 'Bagging (Parallel Independent) vs. Boosting (Sequential Residuals)',
      caption:
        'Random Forest averages independent trees in parallel. Gradient Boosting trains tree m to correct the residual mistakes of tree m-1.',
      visualKey: 'ml-ensembles-architecture',
      details: {
        comparison: {
          headers: ['Feature', 'Random Forest', 'Gradient Boosting (XGBoost)'],
          rows: [
            ['Architecture', 'Parallel independent trees (Bagging)', 'Sequential chained trees (Boosting)'],
            ['Tree Depth', 'Deep, unpruned trees (low bias, high variance)', 'Shallow stumps/trees (high bias, low variance)'],
            ['Primary Goal', 'Reduces Variance', 'Reduces Bias'],
            ['Risk with High Estimators', 'No risk of overfitting (asymptotic error)', 'Can overfit if n_estimators is too large'],
          ],
        },
      },
    },
    animation: {
      type: 'ensembles-bagging-boosting-interactive',
      title: 'Parallel Voting vs. Sequential Correction Simulator',
      description:
        'Step through sequential boosting iterations correcting residual errors one tree at a time.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Random Forest vs. XGBoost in Python',
      language: 'python',
      code: `from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=500, n_features=10, random_state=42)

# Random Forest: 100 parallel trees
rf = RandomForestClassifier(n_estimators=100, max_depth=6).fit(X, y)
# Gradient Boosting: 100 sequential trees with learning rate
gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3).fit(X, y)

print(f"Random Forest Accuracy:     {rf.score(X, y)*100:.1f}%")
print(f"Gradient Boosting Accuracy: {gb.score(X, y)*100:.1f}%")`,
      input: '500 samples with 10 features',
      output: 'Random Forest Accuracy: 97.4% | Gradient Boosting Accuracy: 98.8%',
      explanation:
        'Gradient Boosting achieves higher training accuracy by progressively correcting residual errors from earlier trees.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What happens if you increase the number of trees (n_estimators) in a Random Forest to 1,000?',
        options: [
          'The model will severely overfit',
          'The variance error will stabilize asymptotically and the model will NOT overfit',
          'The bias will drop to zero',
          'Feature importances become negative',
        ],
        correctIndex: 1,
        explanation: 'Bagging averages independent predictions; adding more trees reduces variance without increasing overfitting.',
      },
      {
        id: 'q2',
        question: 'What does each new tree in Gradient Boosting attempt to predict?',
        options: [
          'The original target labels y',
          'The pseudo-residuals (negative gradients of the loss) of the previous ensemble',
          'A random subset of the training points',
          'The average of the previous trees',
        ],
        correctIndex: 1,
        explanation: 'Boosting fits each new base learner to the negative gradient (residuals) of the existing ensemble loss.',
      },
      {
        id: 'q3',
        question: 'Why does Random Forest select a random subset of features at each split (mtry)?',
        options: [
          'To save RAM during training',
          'To decorrelate the individual trees so their averaged variance drops significantly',
          'To force trees to be linear',
          'To guarantee convergence',
        ],
        correctIndex: 1,
        explanation: 'Decorrelating trees ensures that a single dominant feature does not dominate the root split across all trees.',
      },
    ],
  },
  {
    id: 'ml-kmeans',
    subject: 'ml',
    category: 'K-Means and DBSCAN',
    title: 'K-Means Clustering & The Elbow Method',
    subtitle: 'Centroid-Based Partitioning & Within-Cluster Sum of Squares',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Clustering', 'Unsupervised', 'Elbow Method', 'Silhouette Score', 'WCSS'],
    quickRecall: {
      oneLiner:
        'Partitions N samples into K clusters by iteratively assigning each point to its nearest centroid and recalculating centroids as cluster means.',
      simpleAnalogy:
        'Distributing party tables analogy: You place K pizza tables randomly in a ballroom. Guests walk to whichever table is closest to them. Once everyone has sat down, each table is picked up and moved to the exact geometric center of its seated guests. Repeating this stabilizes the tables right in the center of natural friend groups.',
      whenToUse:
        'Customer segmentation, image color quantization, anomaly detection, document grouping.',
      whyItMatters:
        'Fastest unsupervised clustering algorithm with linear scaling O(N · K · d · i).',
      keyPoints: [
        'Objective: Minimize Within-Cluster Sum of Squares (WCSS / Inertia): Σ Σ ||x_i - μ_k||².',
        'Expectation-Maximization (Lloyd\'s algorithm): 1) Assignment step (assign to closest μ_k), 2) Update step (recompute μ_k as mean).',
        'K-Means++ initialization: Chooses initial seeds with probability proportional to D(x)² (distance squared), preventing poor local minima.',
        'Optimal K selection: Elbow Method (inflection point of inertia curve) and Silhouette Score (cohesion vs separation, range -1 to +1).',
      ],
      formulaOrSyntax: {
        label: 'Inertia / WCSS Objective',
        codeOrLatex: 'J = \\sum_{k=1}^K \\sum_{x_i \\in C_k} ||x_i - \\mu_k||^2, \\quad \\mu_k = \\frac{1}{|C_k|} \\sum_{x_i \\in C_k} x_i',
        isLatex: true,
      },
      complexity: {
        time: 'O(iterations · n · K · d) [Linear in dataset size n]',
        space: 'O((n + K) · d) coordinates and cluster assignments',
      },
      commonMistakeOrTrap: {
        mistake: 'Using K-Means on elongated, crescent-shaped, or concentric ring data.',
        fix: 'K-Means assumes spherical, isotropic clusters of similar density; use DBSCAN or Gaussian Mixture Models (GMM) for arbitrary non-spherical shapes.',
        interviewTrap:
          'Question: "Does K-Means always find the global minimum of WCSS?" Answer: No! Lloyd\'s algorithm is greedy and can get trapped in sub-optimal local minima depending on initialization. Solution: use K-Means++ with multiple restarts (n_init=10).',
      },
      examCheatsheet: [
        'Sensitive to outliers: Outliers skew centroid means significantly',
        'Mandatory feature scaling: Distance metrics depend heavily on scale',
        'Silhouette Score: +1 = well-clustered, 0 = on border, -1 = misclustered',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'Voronoi Cluster Cells & Centroid Convergence',
      caption:
        'Centroids (stars) iteratively migrate to the mean of their assigned data points, forming polygonal Voronoi boundary cells.',
      visualKey: 'ml-kmeans-cluster-viz',
      details: {
        comparison: {
          headers: ['Metric', 'Elbow Method', 'Silhouette Score'],
          rows: [
            ['Criterion', 'Inertia (Within-Cluster Sum of Squares)', 'Ratio of intra-cluster distance to nearest-cluster distance'],
            ['Optimal Indicator', 'Arm-elbow inflection point', 'Highest peak value (closer to +1.0)'],
            ['Subjectivity', 'Can be ambiguous on smooth curves', 'Mathematically quantitative metric'],
          ],
        },
      },
    },
    animation: {
      type: 'kmeans-clustering-interactive',
      title: 'K-Means Centroid Migration Simulator',
      description:
        'Watch centroids jump to the mean of their colored clusters across 4 successive convergence steps.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'K-Means Clustering & Inertia in Python',
      language: 'python',
      code: `from sklearn.cluster import KMeans
import numpy as np

# 6 2D points with 2 natural clusters
X = np.array([[1, 2], [1, 4], [2, 2], [8, 7], [8, 9], [9, 8]])

# Initialize with KMeans++
kmeans = KMeans(n_clusters=2, init='k-means++', n_init=10, random_state=42)
kmeans.fit(X)

print("Cluster Labels:   ", kmeans.labels_)
print("Centroid Centers: \n", np.round(kmeans.cluster_centers_, 1))
print(f"Inertia (WCSS):   {kmeans.inertia_:.2f}")`,
      input: '6 2D data points with K=2',
      output: 'Cluster Labels: [0 0 0 1 1 1] | Inertia: 7.33',
      explanation:
        'The algorithm cleanly separates points into 2 clusters around centroids [1.3, 2.7] and [8.3, 8.0].',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the primary advantage of K-Means++ initialization over standard random initialization?',
        options: [
          'It selects initial centroids far apart from each other, drastically reducing the risk of bad local minima',
          'It automatically determines the optimal number of clusters K',
          'It scales features automatically',
          'It supports categorical strings',
        ],
        correctIndex: 0,
        explanation: 'K-Means++ samples initial seeds with probability proportional to distance squared, dispersing them across the dataset.',
      },
      {
        id: 'q2',
        question: 'What type of cluster shapes does K-Means struggle to partition accurately?',
        options: [
          'Spherical isotropic clusters',
          'Concentric rings and arbitrary non-spherical serpentine shapes',
          'Clusters with equal numbers of points',
          'Clusters with normalized features',
        ],
        correctIndex: 1,
        explanation: 'K-Means uses Euclidean distance from a central mean, creating convex Voronoi cells that fail on non-convex shapes like nested rings.',
      },
      {
        id: 'q3',
        question: 'What does a Silhouette Score of +0.82 suggest about a clustering result?',
        options: [
          'Clusters are poorly separated and overlapping',
          'Samples are well-clustered, tightly cohesive within their cluster, and far from neighboring clusters',
          '82% of points are outliers',
          'K must be doubled',
        ],
        correctIndex: 1,
        explanation: 'Silhouette scores close to +1 indicate strong intra-cluster cohesion and clean inter-cluster separation.',
      },
    ],
  },
  {
    id: 'ml-pca',
    subject: 'ml',
    category: 'PCA and Dimensionality Reduction',
    title: 'Principal Component Analysis (PCA)',
    subtitle: 'Orthogonal Variance Maximization & Eigen-Decomposition',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['PCA', 'SVD', 'Eigenvalues', 'Dimensionality Reduction', 'Variance'],
    quickRecall: {
      oneLiner:
        'Linear dimensionality reduction technique that projects high-dimensional data onto orthogonal axes that maximize variance.',
      simpleAnalogy:
        'Shadow casting analogy: Imagine holding a 3D teapot in front of a wall with a bright flashlight. Rotating the teapot until its 2D shadow captures the complete outline of the handle and spout is what PCA does: it finds the best 2D angle that preserves the maximum amount of 3D information.',
      whenToUse:
        'Feature compression, speeding up downstream models, eliminating multicollinearity, and visualizing high-dimensional data in 2D/3D.',
      whyItMatters:
        'Reduces the Curse of Dimensionality while preserving the maximum possible signal (variance) in fewer features.',
      keyPoints: [
        'Data centering is mandatory: Subtract feature means (X - μ) before computing covariance.',
        'Covariance Matrix: C = (1/n) X^T X. Eigenvectors represent principal component directions; Eigenvalues represent variance explained.',
        'Singular Value Decomposition (SVD): X = U Σ V^T computes principal directions V without explicitly forming X^T X.',
        'Explained Variance Ratio: Cumulative sum of sorted eigenvalues shows what percentage of total information is retained.',
      ],
      formulaOrSyntax: {
        label: 'Covariance Eigen-Decomposition & Projection',
        codeOrLatex: '\\mathbf{C} = \\frac{1}{n} \\mathbf{X}^T \\mathbf{X}, \\quad \\mathbf{C} \\mathbf{v}_i = \\lambda_i \\mathbf{v}_i, \\quad \\mathbf{Z} = \\mathbf{X} \\mathbf{V}_k',
        isLatex: true,
      },
      complexity: {
        time: 'Covariance + Eigen: O(d² · n + d³) | Truncated SVD: O(n · d · k)',
        space: 'O(d · k) projection matrix',
      },
      commonMistakeOrTrap: {
        mistake: 'Applying PCA on unstandardized features with vastly different scales.',
        fix: 'A feature with scale 1,000,000 will dominate the 1st principal component purely due to variance magnitude; always standardize with StandardScaler.',
        interviewTrap:
          'Question: "Is PCA supervised or unsupervised?" Answer: Unsupervised! It cares strictly about variance in X, ignoring target labels y completely. For supervised dimensionality reduction that maximizes class separability, use Linear Discriminant Analysis (LDA).',
      },
      examCheatsheet: [
        'Principal components are mutually orthogonal (covariance between any two PCs = 0)',
        'PC1 captures the single largest variance; PC2 captures the 2nd largest orthogonal variance',
        'PCA is sensitive to outliers because variance is squared',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Orthogonal Axis Rotation & Projection onto PC1',
      caption:
        'The first principal component (PC1) aligns with the longest axis of data variance. Points project orthogonally onto PC1.',
      visualKey: 'ml-pca-projection-viz',
      details: {
        comparison: {
          headers: ['Component', 'Explained Variance', 'Cumulative Variance', 'Information Retained'],
          rows: [
            ['PC 1', '72.4%', '72.4%', 'Dominant primary axis of variation'],
            ['PC 2', '18.1%', '90.5%', 'Second orthogonal variation (90%+ retained)'],
            ['PC 3', '6.5%', '97.0%', 'Minor variation'],
            ['PC 4', '3.0%', '100.0%', 'Negligible noise floor'],
          ],
        },
      },
    },
    animation: {
      type: 'pca-projection-interactive',
      title: 'Axis Rotation & Orthogonal Projection Simulator',
      description:
        'Rotate the coordinate axes to watch data points project onto the highest variance eigenvector line.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'PCA Dimensionality Reduction in Python (Scikit-Learn)',
      language: 'python',
      code: `from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import numpy as np

# Synthetic 4-dimensional data
X = np.random.randn(50, 4)

# 1. Mandatory standardization
X_scaled = StandardScaler().fit_transform(X)

# 2. Reduce from 4D down to 2D
pca = PCA(n_components=2)
X_projected = pca.fit_transform(X_scaled)

print("Explained Variance Ratio per PC: ", np.round(pca.explained_variance_ratio_, 3))
print(f"Total Retained Variance:          {np.sum(pca.explained_variance_ratio_)*100:.1f}%")
print(f"Projected Shape:                 {X_projected.shape}")`,
      input: '50 samples with 4 features, compressed to 2 PCs',
      output: 'Explained Variance: [0.421, 0.285] | Total Retained: 70.6% | Shape: (50, 2)',
      explanation:
        'In just 2 dimensions instead of 4, the dataset preserves over 70% of the total geometric variance.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why must data be standardized (zero mean, unit variance) before applying PCA?',
        options: [
          'Otherwise, features with large numeric scales will dominate the principal components simply due to units',
          'PCA will throw an error with negative numbers',
          'To convert categorical data to numbers',
          'To ensure labels are positive',
        ],
        correctIndex: 0,
        explanation: 'PCA maximizes variance; unscaled variables with large numerical values artificially dominate variance calculations.',
      },
      {
        id: 'q2',
        question: 'What is the geometric relationship between Principal Component 1 and Principal Component 2?',
        options: ['They are parallel', 'They are strictly orthogonal (perpendicular at 90 degrees)', 'They have the same slope', 'They intersect at 45 degrees'],
        correctIndex: 1,
        explanation: 'All principal components are eigenvectors of a symmetric matrix, making them strictly mutually orthogonal (zero covariance).',
      },
      {
        id: 'q3',
        question: 'What is the main difference between PCA and Linear Discriminant Analysis (LDA)?',
        options: [
          'PCA is unsupervised (ignores class labels); LDA is supervised (maximizes separation between class labels)',
          'PCA only works on images',
          'LDA uses non-linear kernels',
          'PCA requires neural networks',
        ],
        correctIndex: 0,
        explanation: 'PCA maximizes total feature variance without considering labels; LDA explicitly maximizes the ratio of between-class to within-class variance.',
      },
    ],
  },

  {
    "id": "ml-feature-scaling",
    "subject": "ml",
    "category": "Data Preprocessing",
    "title": "Feature Scaling: StandardScaler vs MinMaxScaler",
    "subtitle": "Z-Score Normalization, Min-Max Scaling & Data Leakage Prevention",
    "difficulty": "Beginner",
    "isInterviewFavorite": true,
    "readTimeSeconds": 50,
    "tags": [
      "StandardScaler",
      "MinMaxScaler",
      "Normalization",
      "Data Leakage"
    ],
    "quickRecall": {
      "oneLiner": "Feature scaling standardizes the range of independent variables so distance-based and gradient-based algorithms treat all features equally.",
      "simpleAnalogy": "Comparing someone's height in centimeters (180 cm) with their salary in dollars ($80,000): without scaling, distance calculations in KNN or SVM assume salary is 400 times more important purely because the numbers are bigger. Scaling puts every feature on an equal playing field.",
      "whenToUse": "Always before KNN, SVM, K-Means, PCA, Neural Networks, and Gradient Descent. Tree-based algorithms (Decision Trees, Random Forest, XGBoost) do NOT require feature scaling because split rules are monotonic.",
      "whyItMatters": "Unscaled features distort Euclidean distance metrics and cause gradient descent to oscillate inefficiently along narrow loss surface valleys.",
      "keyPoints": [
        "StandardScaler (Z-Score): Scales data to mean = 0 and std = 1. Formula: z = (x - μ) / σ. Handles normal distributions and preserves outliers.",
        "MinMaxScaler: Compresses values strictly into [0, 1]. Formula: (x - min) / (max - min). Very sensitive to extreme outliers.",
        "RobustScaler: Uses Median and Interquartile Range (IQR). Best when dataset contains severe outliers.",
        "Trees are Immune: Decision trees, Random Forests, and XGBoost only look at rank order, so scaling does not change their split points.",
        "CRITICAL LEAKAGE TRAP: Always call fit() ONLY on training data, then use transform() on both train and test data. Never fit on the full dataset!"
      ],
      "formulaOrSyntax": {
        "label": "Z-Score vs Min-Max Formulas",
        "codeOrLatex": "z = \\frac{x - \\mu}{\\sigma} \\quad \\text{vs} \\quad x_{\\text{scaled}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}",
        "isLatex": true
      },
      "complexity": {
        "time": "O(N * D) where N is samples and D is features",
        "space": "O(D) to store mean and standard deviation per feature"
      },
      "commonMistakeOrTrap": {
        "mistake": "Calling scaler.fit_transform(X) on the entire dataset BEFORE splitting into train and test sets.",
        "fix": "Split first! Then X_train_scaled = scaler.fit_transform(X_train), and X_test_scaled = scaler.transform(X_test).",
        "interviewTrap": "Question: 'Does Random Forest need feature scaling?' Answer: No! Decision trees make orthogonal splits based on relative order (e.g., Age > 30), not distances or gradient magnitudes."
      },
      "examCheatsheet": [
        "StandardScaler: Mean = 0, Std = 1 (Unbounded)",
        "MinMaxScaler: Range strictly [0, 1] (Outlier vulnerable)",
        "Required for: KNN, SVM, PCA, Neural Nets, Gradient Descent",
        "Not required for: Decision Trees, Random Forest, XGBoost, Naive Bayes"
      ]
    },
    "visual": {
      "type": "diagram",
      "title": "Feature Scaling: Before vs. After Normalization",
      "caption": "Before scaling, Feature 2 dominates the distance metric. After Z-Score scaling, both dimensions share an identical isotropic scale.",
      "visualKey": "ml-feature-scaling",
      "details": {
        "comparison": {
          "headers": [
            "Property",
            "StandardScaler",
            "MinMaxScaler",
            "RobustScaler"
          ],
          "rows": [
            [
              "Output Range",
              "Unbounded (typically -3 to +3)",
              "Strictly [0, 1]",
              "Unbounded"
            ],
            [
              "Center / Spread",
              "Mean = 0, Std = 1",
              "Min = 0, Max = 1",
              "Median = 0, IQR = 1"
            ],
            [
              "Outlier Sensitivity",
              "Moderate",
              "High (outliers compress rest)",
              "Low (robust)"
            ],
            [
              "Best Used For",
              "Normal data, PCA, Neural Nets",
              "Image pixels (0-255), Bounded ranges",
              "Datasets with heavy outliers"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Feature Scaling Transformation Pipeline",
      "description": "Walk through calculating feature means, computing standard deviation, and normalizing samples to a zero-centered Gaussian distribution.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Preventing Data Leakage with StandardScaler in Scikit-Learn",
      "language": "python",
      "code": "from sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nimport numpy as np\n\n# Sample features: [Age (20-60), Salary ($30k-$150k)]\nX = np.array([[25, 35000], [45, 95000], [35, 60000], [50, 140000], [22, 30000]])\ny = np.array([0, 1, 0, 1, 0])\n\n# Step 1: Always split BEFORE scaling to prevent data leakage\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Step 2: Fit ONLY on training data, then transform both\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\n\nprint(\"Scaled Train Mean:\", np.round(X_train_scaled.mean(axis=0), 2))\nprint(\"Scaled Train Std:\", np.round(X_train_scaled.std(axis=0), 2))",
      "input": "Raw features with unequal ranges (Age 20-50, Salary 30k-140k)",
      "output": "Scaled Train Mean: [0. 0.], Scaled Train Std: [1. 1.]",
      "explanation": "StandardScaler calculates mean and standard deviation solely from X_train and applies identical parameters to X_test."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "Which of the following algorithms does NOT require feature scaling?",
        "options": [
          "K-Nearest Neighbors (KNN)",
          "Principal Component Analysis (PCA)",
          "Random Forest Classifier",
          "Support Vector Machine (SVM)"
        ],
        "correctIndex": 2,
        "explanation": "Tree-based models make greedy threshold splits per single feature and are completely invariant to monotonic feature scaling."
      },
      {
        "id": "q2",
        "question": "What constitutes data leakage during feature preprocessing?",
        "options": [
          "Using test data features to compute scaler mean and standard deviation",
          "Using cross-validation",
          "Shuffling the dataset before splitting",
          "Using MinMaxScaler instead of StandardScaler"
        ],
        "correctIndex": 0,
        "explanation": "Fitting a scaler on the entire dataset leaks statistical information (mean, max, std) from the test set into the model."
      },
      {
        "id": "q3",
        "question": "If a dataset has extreme, unpredictable outliers, which scaler is most resilient?",
        "options": [
          "MinMaxScaler",
          "StandardScaler",
          "RobustScaler",
          "Binarizer"
        ],
        "correctIndex": 2,
        "explanation": "RobustScaler uses the median and Interquartile Range (IQR), making it resistant to being skewed by extreme outliers."
      }
    ]
  },
  {
    "id": "ml-naive-bayes",
    "subject": "ml",
    "category": "Naive Bayes",
    "title": "Naive Bayes Classifier & Laplace Smoothing",
    "subtitle": "Conditional Independence Assumption, Prior/Likelihood & Zero Frequency Trap",
    "difficulty": "Beginner",
    "isInterviewFavorite": true,
    "readTimeSeconds": 50,
    "tags": [
      "Bayes Theorem",
      "Prior",
      "Likelihood",
      "Laplace Smoothing",
      "NLP"
    ],
    "quickRecall": {
      "oneLiner": "Naive Bayes applies Bayes' theorem by naively assuming all features are conditionally independent given the class label.",
      "simpleAnalogy": "Detecting spam email: you see words 'Free', 'Lottery', and 'Cash'. Naive Bayes calculates spam probability by treating each word as an independent clue, ignoring that 'Free Lottery' often appear together. Despite this simplification, it is lightning fast and surprisingly accurate for text classification.",
      "whenToUse": "Text classification, spam filtering, sentiment analysis, multi-class document tagging, and real-time prediction when training data is small.",
      "whyItMatters": "Zero iterative training epochs: it simply counts word frequencies to calculate probabilities, achieving O(N) training speed.",
      "keyPoints": [
        "Bayes Theorem: Posterior P(Class | Features) ∝ Likelihood P(Features | Class) × Prior P(Class).",
        "Naive Assumption: P(x₁, x₂, ... xₙ | C) = P(x₁|C) × P(x₂|C) × ... × P(xₙ|C).",
        "Variants: GaussianNB (continuous normal data), MultinomialNB (word counts), BernoulliNB (binary word presence).",
        "Zero Frequency Problem: If a word never appeared in training with a class, its probability is 0, which multiplies the entire product to 0!",
        "Laplace Smoothing (+α): Adds a pseudocount (typically α = 1) to numerator and denominator to ensure no probability is ever zero."
      ],
      "formulaOrSyntax": {
        "label": "Bayes Rule with Laplace Smoothing",
        "codeOrLatex": "P(y | x) \\propto P(y) \\prod_{i=1}^{d} \\frac{\\text{count}(x_i, y) + \\alpha}{\\text{count}(y) + \\alpha \\cdot |V|}",
        "isLatex": true
      },
      "complexity": {
        "time": "Training: O(N * D) simple counting. Inference: O(D * C) fast multiplications",
        "space": "O(C * D) where C is number of classes and D is vocabulary size"
      },
      "commonMistakeOrTrap": {
        "mistake": "Multiplying raw probabilities directly, leading to floating-point underflow (0.000000000...).",
        "fix": "Sum the logarithms instead: log(P(C)) + Σ log(P(xᵢ | C)). Adding logs turns tiny decimal multiplications into stable additions.",
        "interviewTrap": "Question: 'Why is Naive Bayes called Naive? Does it still work when features are correlated?' Answer: It naively assumes features are conditionally independent. Even when violated, it ranks relative probabilities accurately enough for classification."
      },
      "examCheatsheet": [
        "MultinomialNB: Best for discrete word frequency counts (NLP)",
        "GaussianNB: Best for continuous numeric features (assumes bell curve)",
        "Laplace Smoothing: α = 1 prevents zero-probability collapse",
        "Log-Sum-Exp trick: Prevents numerical underflow when multiplying many probabilities"
      ]
    },
    "visual": {
      "type": "flowchart",
      "title": "Bayesian Probability Update & Classification",
      "caption": "Prior probability multiplied by feature likelihoods yields the posterior probability. The argmax class wins.",
      "visualKey": "ml-naive-bayes",
      "details": {
        "comparison": {
          "headers": [
            "Variant",
            "Input Data Type",
            "Typical Use Case",
            "Key Hyperparameter"
          ],
          "rows": [
            [
              "MultinomialNB",
              "Discrete counts (integers >= 0)",
              "Spam filtering, text classification",
              "alpha (smoothing)"
            ],
            [
              "BernoulliNB",
              "Binary indicators (0 or 1)",
              "Short texts, keyword presence",
              "binarize threshold"
            ],
            [
              "GaussianNB",
              "Continuous real numbers",
              "Sensor data, medical diagnostics",
              "var_smoothing"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Posterior Probability Calculation Trace",
      "description": "Follow how prior odds get updated word-by-word into the final classification probability.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Spam Classification with MultinomialNB & Laplace Smoothing",
      "language": "python",
      "code": "from sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\ncorpus = [\n    \"Send money now to claim lottery prize\",\n    \"Win free cash bonus today\",\n    \"Hey, are we still meeting for lunch?\",\n    \"Project report slides attached for review\"\n]\nlabels = [1, 1, 0, 0] # 1: Spam, 0: Ham\n\nvectorizer = CountVectorizer()\nX = vectorizer.fit_transform(corpus)\n\nclf = MultinomialNB(alpha=1.0)\nclf.fit(X, labels)\n\ntest_email = [\"Claim your free prize today\"]\nX_test = vectorizer.transform(test_email)\npred = clf.predict(X_test)\nprobs = clf.predict_proba(X_test)[0]\n\nprint(\"Prediction:\", \"Spam\" if pred[0] == 1 else \"Ham\")\nprint(f\"Spam Probability: {probs[1]:.2%}\")",
      "input": "Unseen sentence: 'Claim your free prize today'",
      "output": "Prediction: Spam | Spam Probability: 91.4%",
      "explanation": "Laplace smoothing ensures rare words without training history do not zero out the posterior spam probability."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "Why is Laplace smoothing used in Naive Bayes?",
        "options": [
          "To speed up gradient descent",
          "To prevent zero probabilities when an unseen word has count 0 in a class",
          "To normalize feature vectors to unit length",
          "To convert text into continuous embeddings"
        ],
        "correctIndex": 1,
        "explanation": "Without Laplace smoothing, a single unseen word with count 0 would wipe out the entire product of probabilities to zero."
      },
      {
        "id": "q2",
        "question": "What is the core assumption that gives Naive Bayes its name?",
        "options": [
          "All classes have equal prior probabilities",
          "The data is strictly linearly separable",
          "Features are conditionally independent given the class label",
          "The loss function is convex"
        ],
        "correctIndex": 2,
        "explanation": "Naive Bayes assumes that every feature contributes independently to the probability of the class."
      },
      {
        "id": "q3",
        "question": "How do production Naive Bayes implementations prevent numerical underflow?",
        "options": [
          "By rounding probabilities to integers",
          "By summing logarithms of probabilities instead of multiplying raw decimals",
          "By increasing the learning rate",
          "By skipping rare words"
        ],
        "correctIndex": 1,
        "explanation": "Multiplying dozens of small decimals causes underflow; working in log-space converts products into additions: log(A*B) = log(A) + log(B)."
      }
    ]
  },
  {
    "id": "ml-bagging-vs-boosting",
    "subject": "ml",
    "category": "Bagging and Boosting",
    "title": "Bagging vs Boosting Ensembles",
    "subtitle": "Parallel Independent Ensembles vs Sequential Residual Correction",
    "difficulty": "Intermediate",
    "isInterviewFavorite": true,
    "readTimeSeconds": 55,
    "tags": [
      "Ensemble",
      "Bagging",
      "Boosting",
      "Random Forest",
      "XGBoost",
      "Variance vs Bias"
    ],
    "quickRecall": {
      "oneLiner": "Bagging trains independent models in parallel to reduce variance (overfitting); Boosting trains models sequentially to correct earlier errors and reduce bias.",
      "simpleAnalogy": "Bagging is like 50 students independently answering an exam and taking the majority vote (cancels out individual careless mistakes). Boosting is like a student taking an exam, a second student studying the exact questions the first student got wrong, and a third studying what both missed—building a master team.",
      "whenToUse": "Bagging (Random Forest): When your base models overfit (high variance). Boosting (XGBoost, LightGBM, CatBoost): When you want maximum Kaggle-level predictive accuracy.",
      "whyItMatters": "Ensembles consistently outperform single models on tabular data. Understanding Bagging vs Boosting is one of the top 3 machine learning interview topics.",
      "keyPoints": [
        "Bagging (Bootstrap Aggregation): Samples data with replacement. Models run completely in parallel. Reduces Variance.",
        "Boosting: Models trained sequentially. Each model fits the pseudo-residuals (gradients) of previous models. Reduces Bias.",
        "Overfitting Risk: Bagging rarely overfits when adding more trees. Boosting CAN overfit if too many trees are added with a high learning rate.",
        "Base Learners: Bagging typically uses deep, low-bias trees. Boosting typically uses shallow, high-bias trees (stumps)."
      ],
      "formulaOrSyntax": {
        "label": "Bagging Vote vs Boosting Additive Expansion",
        "codeOrLatex": "\\hat{y}_{\\text{bag}} = \\frac{1}{B} \\sum_{b=1}^{B} f_b(x) \\quad \\text{vs} \\quad \\hat{y}_{\\text{boost}} = \\sum_{m=1}^{M} \\eta f_m(x)",
        "isLatex": true
      },
      "complexity": {
        "time": "Bagging: O(B * T / cores) parallelizable. Boosting: O(M * T) strictly sequential",
        "space": "O(B * tree_size) memory for all stored base estimators"
      },
      "commonMistakeOrTrap": {
        "mistake": "Thinking that increasing n_estimators in XGBoost or AdaBoost will never overfit.",
        "fix": "Adding too many trees in Boosting WILL overfit training residuals! Use early stopping and a small learning rate (eta < 0.1). In Random Forest, adding more trees never causes overfitting.",
        "interviewTrap": "Question: 'Can you train trees in Bagging in parallel? Can you train trees in Boosting in parallel?' Answer: Bagging trees are 100% independent and trivially parallelizable across all CPU cores. Boosting trees depend on the residual errors of the previous tree, so they must be built sequentially (though finding feature split points within a tree can be parallelized in XGBoost/LightGBM)."
      },
      "examCheatsheet": [
        "Bagging = Bootstrap + Aggregation (Parallel, reduces Variance, e.g. Random Forest)",
        "Boosting = Sequential Residual Learning (Iterative, reduces Bias, e.g. XGBoost, LightGBM)",
        "Bagging base trees: Deep & complex (low bias, high variance)",
        "Boosting base trees: Shallow stumps (high bias, low variance)"
      ]
    },
    "visual": {
      "type": "flowchart",
      "title": "Bagging (Parallel) vs Boosting (Sequential) Architecture",
      "caption": "Bagging trains models independently on random bootstrap subsets. Boosting passes residual loss sequentially down the chain.",
      "visualKey": "ml-bagging-vs-boosting",
      "details": {
        "comparison": {
          "headers": [
            "Dimension",
            "Bagging (e.g. Random Forest)",
            "Boosting (e.g. XGBoost)"
          ],
          "rows": [
            [
              "Architecture",
              "Parallel independent estimators",
              "Sequential iterative chain"
            ],
            [
              "Primary Error Reduced",
              "Variance (prevents overfitting)",
              "Bias (learns complex patterns)"
            ],
            [
              "Base Learners",
              "Deep trees (fully grown)",
              "Shallow trees (depth 3-6)"
            ],
            [
              "Overfitting Risk",
              "Very low as n_estimators increases",
              "High if learning rate is large or unchecked"
            ],
            [
              "Speed / Parallelism",
              "Trivially parallel across cores",
              "Sequential across tree iterations"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Sequential Residual Fitting in Gradient Boosting",
      "description": "Watch Tree 1 make predictions, compute residuals, and have Tree 2 fit directly to the remaining errors.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Comparing Random Forest (Bagging) vs Gradient Boosting in Scikit-Learn",
      "language": "python",
      "code": "from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import cross_val_score\n\nX, y = make_classification(n_samples=1000, n_features=20, random_state=42)\n\nbagging_model = RandomForestClassifier(n_estimators=100, n_jobs=-1, random_state=42)\nbag_score = cross_val_score(bagging_model, X, y, cv=5).mean()\n\nboosting_model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)\nboost_score = cross_val_score(boosting_model, X, y, cv=5).mean()\n\nprint(f\"Random Forest (Bagging) Accuracy: {bag_score:.3f}\")\nprint(f\"Gradient Boosting (Boosting) Accuracy: {boost_score:.3f}\")",
      "input": "1000 samples, 20 features, 5-Fold Cross Validation",
      "output": "Random Forest: 0.902 | Gradient Boosting: 0.918",
      "explanation": "Gradient Boosting achieves higher accuracy by sequentially targeting sample errors that previous shallow trees missed."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary error component reduced by Bagging (Random Forest)?",
        "options": [
          "Bias",
          "Variance",
          "Irreducible Noise",
          "Data Leakage"
        ],
        "correctIndex": 1,
        "explanation": "Bagging averages predictions from independent high-variance trees, dampening random fluctuations and reducing variance."
      },
      {
        "id": "q2",
        "question": "Why are base trees in Gradient Boosting typically kept very shallow (depth 3 to 6)?",
        "options": [
          "Because boosting works best by aggregating many weak learners with high bias and low variance",
          "Because shallow trees use more memory",
          "Because Python cannot handle deep trees",
          "Because shallow trees cannot handle continuous numbers"
        ],
        "correctIndex": 0,
        "explanation": "Boosting sequentially reduces bias at each step; keeping individual trees shallow prevents rapid overfitting to noise."
      },
      {
        "id": "q3",
        "question": "What happens if you increase the number of trees in Random Forest to 5,000?",
        "options": [
          "The model will severely overfit",
          "The model error will stabilize and not overfit, but training time will increase",
          "The model accuracy will drop to 50%",
          "The variance will increase exponentially"
        ],
        "correctIndex": 1,
        "explanation": "Random Forest does not overfit with more trees because averaging independent estimators asymptotically approaches a stable expected value."
      }
    ]
  },
  {
    "id": "ml-dbscan",
    "subject": "ml",
    "category": "K-Means and DBSCAN",
    "title": "DBSCAN: Density-Based Spatial Clustering",
    "subtitle": "Core Points, Border Points, Noise Detection & Non-Spherical Clusters",
    "difficulty": "Intermediate",
    "isInterviewFavorite": true,
    "readTimeSeconds": 50,
    "tags": [
      "Clustering",
      "DBSCAN",
      "Unsupervised",
      "Density",
      "Outlier Detection"
    ],
    "quickRecall": {
      "oneLiner": "DBSCAN groups together points that are closely packed within radius ε while labeling low-density points in sparse regions as outliers/noise.",
      "simpleAnalogy": "K-Means is like drawing circular boundaries around predefined team captains (k centroids). DBSCAN is like water flowing through connected valleys: it discovers clusters of ANY shape (crescents, rings, interlocking spirals) and leaves lone puddles marked as noise.",
      "whenToUse": "When clusters have arbitrary, non-spherical shapes, when the number of clusters K is unknown, and when dataset contains substantial noise and anomalies.",
      "whyItMatters": "Does not require choosing K in advance! Unlike K-Means, which forces every anomaly into some cluster, DBSCAN explicitly outputs label -1 for noise.",
      "keyPoints": [
        "Two Hyperparameters: ε (Epsilon = neighborhood search radius) and min_samples (minimum points to form dense region).",
        "Point Classifications: Core Point (has ≥ min_samples in ε), Border Point (in ε of a Core point, but < min_samples itself), Noise (neither).",
        "Arbitrary Shapes: Discovers concentric rings and snake-like clusters that K-Means completely fails to separate.",
        "Deterministic: Given fixed ordering, core cluster assignments are deterministic.",
        "Limitation: Struggles when clusters have widely differing densities (HDBSCAN solves this)."
      ],
      "formulaOrSyntax": {
        "label": "Epsilon Neighborhood Condition",
        "codeOrLatex": "N_\\varepsilon(p) = \\{q \\in D \\mid \\text{dist}(p, q) \\le \\varepsilon\\}, \\quad |N_\\varepsilon(p)| \\ge \\text{min\\_samples}",
        "isLatex": true
      },
      "complexity": {
        "time": "O(N log N) with spatial tree index (KD-Tree / BallTree); O(N²) worst-case brute force",
        "space": "O(N) to track visited points and cluster labels"
      },
      "commonMistakeOrTrap": {
        "mistake": "Using DBSCAN directly on high-dimensional data without dimensionality reduction.",
        "fix": "Due to the curse of dimensionality, distance in high dimensions becomes uniform, so finding dense clusters fails. Run PCA or UMAP first.",
        "interviewTrap": "Question: 'How does DBSCAN handle noise compared to K-Means?' Answer: K-Means assigns EVERY point to the nearest centroid, pulling centroids toward outliers. DBSCAN labels noise as -1 and ignores them during cluster formation."
      },
      "examCheatsheet": [
        "Core point: ≥ min_samples within distance ε",
        "Border point: In ε of a Core point, but < min_samples",
        "Noise point: Label -1 (Outlier)",
        "Does NOT require specifying number of clusters K"
      ]
    },
    "visual": {
      "type": "boundary-plot",
      "title": "DBSCAN: Core, Border, and Noise Point Topology",
      "caption": "Core points (green) have sufficient neighbors within ε. Border points (amber) touch core points. Outliers (red) are classified as noise (-1).",
      "visualKey": "ml-dbscan",
      "details": {
        "comparison": {
          "headers": [
            "Feature",
            "DBSCAN",
            "K-Means"
          ],
          "rows": [
            [
              "Cluster Shapes",
              "Arbitrary non-linear shapes",
              "Spherical / convex blobs only"
            ],
            [
              "Number of Clusters",
              "Discovered automatically",
              "Must be specified beforehand (K)"
            ],
            [
              "Outlier Handling",
              "Labels noise explicitly (-1)",
              "Forces outliers into clusters"
            ],
            [
              "Varying Densities",
              "Struggles with single global ε",
              "Assumes roughly equal cluster variance"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Density-Connected Cluster Expansion Trace",
      "description": "Watch DBSCAN identify a core point, expand its neighborhood, link border points, and isolate noise.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Clustering Non-Linear Data (Moons) with DBSCAN in Scikit-Learn",
      "language": "python",
      "code": "from sklearn.cluster import DBSCAN\nfrom sklearn.datasets import make_moons\nimport numpy as np\n\nX, _ = make_moons(n_samples=300, noise=0.08, random_state=42)\n\ndb = DBSCAN(eps=0.2, min_samples=5)\nlabels = db.fit_predict(X)\n\nunique_clusters = set(labels) - {-1}\nn_noise = list(labels).count(-1)\n\nprint(f\"Discovered Clusters: {len(unique_clusters)}\")\nprint(f\"Noise Points Identified: {n_noise}\")\nprint(f\"Unique Labels: {np.unique(labels)}\")",
      "input": "300 points from interlocking crescent moons with noise",
      "output": "Discovered Clusters: 2 | Noise Points Identified: 6 | Labels: [-1, 0, 1]",
      "explanation": "DBSCAN identifies the 2 moon clusters without needing K=2 and correctly isolates noise points with label -1."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What defines a Core Point in DBSCAN?",
        "options": [
          "A point at the geometric centroid of all data",
          "A point with at least min_samples points within radius ε",
          "A point that is closest to an outlier",
          "A point with zero error loss"
        ],
        "correctIndex": 1,
        "explanation": "A point is a core point if its ε-neighborhood contains at least min_samples points (including itself)."
      },
      {
        "id": "q2",
        "question": "What label does Scikit-Learn DBSCAN assign to noise/outlier points?",
        "options": [
          "0",
          "NaN",
          "-1",
          "999"
        ],
        "correctIndex": 2,
        "explanation": "Scikit-learn assigns -1 to any point that is neither a core point nor reachable from a core point."
      },
      {
        "id": "q3",
        "question": "Why does DBSCAN outperform K-Means on concentric circle datasets?",
        "options": [
          "Because DBSCAN uses deep neural weights",
          "Because DBSCAN groups points by local density connectivity rather than Euclidean distance to a center",
          "Because DBSCAN normalizes the data to [0, 1]",
          "Because DBSCAN calculates eigenvalues"
        ],
        "correctIndex": 1,
        "explanation": "K-Means assumes clusters are convex, spherical blobs; DBSCAN follows arbitrary contiguous density paths."
      }
    ]
  },
  {
    "id": "ml-neural-networks",
    "subject": "ml",
    "category": "Neural Networks",
    "title": "Multi-Layer Perceptrons & Backpropagation",
    "subtitle": "Feedforward Computation, Activation Functions (ReLU) & Gradient Chain Rule",
    "difficulty": "Advanced",
    "isInterviewFavorite": true,
    "readTimeSeconds": 60,
    "tags": [
      "Neural Networks",
      "Perceptron",
      "Backpropagation",
      "ReLU",
      "Chain Rule",
      "Deep Learning"
    ],
    "quickRecall": {
      "oneLiner": "An MLP stacks layers of linear transformations followed by non-linear activations, updating synaptic weights via backward chain rule differentiation.",
      "simpleAnalogy": "An assembly line inspection team: worker 1 calculates initial measurements (W₁x + b₁), passes them through a gatekeeper who silences negative numbers (ReLU activation). Subsequent layers build higher-level features (edges → shapes → objects). If the final prediction is off, the error is passed backward along the line so every worker adjusts their wrench (Backpropagation).",
      "whenToUse": "When data has complex non-linear interactions: computer vision, audio, natural language, and high-dimensional representations.",
      "whyItMatters": "Universal Approximation Theorem: A feedforward neural network with a single hidden layer and non-linear activation can approximate any continuous function.",
      "keyPoints": [
        "Forward Pass: Computes layer outputs z^[l] = W^[l] a^[l-1] + b^[l], then applies non-linear activation a^[l] = g(z^[l]).",
        "Non-Linear Activation: Without activations like ReLU or Sigmoid, stacking 100 linear layers collapses mathematically into a single linear regression!",
        "ReLU (Rectified Linear Unit): f(x) = max(0, x). Solves vanishing gradient in positive domain and computes lightning fast.",
        "Loss Function: Binary Cross-Entropy for 2 classes, Categorical Cross-Entropy for multi-class, MSE for regression.",
        "Backpropagation: Computes ∂Loss/∂W by systematically applying the calculus chain rule backward from output to input."
      ],
      "formulaOrSyntax": {
        "label": "Layer Forward Pass & Chain Rule Derivative",
        "codeOrLatex": "a^{[l]} = \\sigma(W^{[l]} a^{[l-1]} + b^{[l]}), \\quad \\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}} = \\frac{\\partial \\mathcal{L}}{\\partial a^{[l]}} \\frac{\\partial a^{[l]}}{\\partial z^{[l]}} \\frac{\\partial z^{[l]}}{\\partial W^{[l]}}",
        "isLatex": true
      },
      "complexity": {
        "time": "O(E * N * Σ(d_{l-1} * d_l)) for E epochs, N samples, across layer dimensions",
        "space": "O(Σ(d_{l-1} * d_l)) to store layer weight matrices and gradients"
      },
      "commonMistakeOrTrap": {
        "mistake": "Using Sigmoid activations in deep hidden layers, causing Vanishing Gradients.",
        "fix": "Use ReLU, Leaky ReLU, or GELU in hidden layers. Reserve Sigmoid exclusively for binary output layers and Softmax for multi-class.",
        "interviewTrap": "Question: 'What happens if you initialize all neural network weights to 0.0?' Answer: Symmetry Trap! All neurons in a layer compute identical outputs and identical gradients during backprop, preventing individual neurons from learning distinct features."
      },
      "examCheatsheet": [
        "Hidden layer activation: ReLU = max(0, z) (avoids vanishing gradient)",
        "Output activation: Sigmoid (Binary), Softmax (Multi-class), Linear (Regression)",
        "Backprop = Chain Rule of calculus applied backward from Loss",
        "Zero weight initialization causes neuron symmetry failure (always use He or Xavier)"
      ]
    },
    "visual": {
      "type": "architecture",
      "title": "Multi-Layer Perceptron (MLP) Forward & Backward Flow",
      "caption": "Forward pass propagates inputs through weights and activations to compute loss. Backward pass propagates error gradients to update weights.",
      "visualKey": "ml-neural-networks",
      "details": {
        "comparison": {
          "headers": [
            "Activation",
            "Formula",
            "Range",
            "Primary Advantage / Risk"
          ],
          "rows": [
            [
              "ReLU",
              "max(0, x)",
              "[0, ∞)",
              "Fast, no vanishing gradient / Dying ReLU risk"
            ],
            [
              "Sigmoid",
              "1 / (1 + e^-x)",
              "(0, 1)",
              "Smooth probability / Severe vanishing gradient for deep nets"
            ],
            [
              "Softmax",
              "e^z_i / Σ e^z_j",
              "[0, 1] sums to 1.0",
              "Multi-class probability distribution"
            ],
            [
              "Leaky ReLU",
              "max(0.01x, x)",
              "(-∞, ∞)",
              "Prevents dying neurons by keeping slight negative gradient"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Forward Activation & Backprop Weight Update",
      "description": "Step through forward matrix multiplication, activation thresholding, loss computation, and backprop gradient descent.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Building a 2-Layer Neural Network with Scikit-Learn MLPClassifier",
      "language": "python",
      "code": "from sklearn.neural_network import MLPClassifier\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\n\nX, y = make_classification(n_samples=1000, n_features=20, n_classes=2, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmlp = MLPClassifier(\n    hidden_layer_sizes=(64, 32),\n    activation='relu',\n    solver='adam',\n    max_iter=200,\n    random_state=42\n)\nmlp.fit(X_train, y_train)\n\ntrain_acc = mlp.score(X_train, y_train)\ntest_acc = mlp.score(X_test, y_test)\n\nprint(f\"MLP Train Accuracy: {train_acc:.1%}\")\nprint(f\"MLP Test Accuracy:  {test_acc:.1%}\")",
      "input": "1000 samples, 20 features, hidden layers (64, 32)",
      "output": "MLP Train Accuracy: 98.5% | MLP Test Accuracy: 93.0%",
      "explanation": "The hidden layers learn non-linear feature representations through ReLU transformations, converging with Adam optimizer."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What would happen if a deep neural network had NO non-linear activation functions in its hidden layers?",
        "options": [
          "It would compute faster and reach 100% accuracy",
          "It would mathematically collapse into a simple linear regression model",
          "The loss function would become non-convex",
          "Backpropagation would divide by zero"
        ],
        "correctIndex": 1,
        "explanation": "The composition of linear functions is always another linear function: W₂*(W₁*x) = (W₂*W₁)*x = W_comb*x."
      },
      {
        "id": "q2",
        "question": "Why should neural network weights NOT be initialized to all zeros?",
        "options": [
          "It causes all neurons to compute the same values and gradients, destroying feature diversity (symmetry problem)",
          "It causes memory out-of-bounds error",
          "It forces the learning rate to zero",
          "It changes ReLU into Sigmoid"
        ],
        "correctIndex": 0,
        "explanation": "Symmetric weights result in identical gradients across all hidden units, preventing them from learning different patterns."
      },
      {
        "id": "q3",
        "question": "What calculus principle powers the backpropagation algorithm?",
        "options": [
          "Taylor Series expansion",
          "Chain Rule of differentiation",
          "L'Hopital's rule",
          "Lagrange Multipliers"
        ],
        "correctIndex": 1,
        "explanation": "Backpropagation computes the gradient of the loss with respect to each weight by repeatedly applying the chain rule backward."
      }
    ]
  },
  {
    "id": "ml-mlops-drift",
    "subject": "ml",
    "category": "Model Deployment and MLOps",
    "title": "Model Deployment, Data Drift & Concept Drift",
    "subtitle": "Covariate Shift vs Concept Shift, FastAPI Serving & Monitoring Metrics",
    "difficulty": "Advanced",
    "isInterviewFavorite": true,
    "readTimeSeconds": 55,
    "tags": [
      "MLOps",
      "Data Drift",
      "Concept Drift",
      "Deployment",
      "FastAPI",
      "Monitoring"
    ],
    "quickRecall": {
      "oneLiner": "MLOps bridges model development and production serving, managing continuous testing, low-latency inference, and drift monitoring.",
      "simpleAnalogy": "A model trained in 2019 predicting airline ticket demand: in 2020 (during lockdown), the distribution of search inputs changed radically (Data Drift: people searching for refunds instead of trips), and the relationship between price and willingness to fly changed completely (Concept Drift: even $1 flights didn't sell). Models in production decay without active monitoring!",
      "whenToUse": "When shipping any ML model from a Jupyter Notebook to real-world customer-facing production services.",
      "whyItMatters": "Code runs forever; machine learning models silently degrade over time as the real world evolves around them.",
      "keyPoints": [
        "Data Drift (Covariate Shift): Distribution of inputs P(X) changes over time while relationship P(Y|X) remains same (e.g. users get younger).",
        "Concept Drift: The true mapping P(Y|X) changes (e.g. economic inflation changes what is considered a high income borrower).",
        "Drift Detection: Kolmogorov-Smirnov (KS) test for numeric features, Population Stability Index (PSI), Chi-Square test for categories.",
        "Serving Paradigms: Real-time REST/gRPC API (FastAPI, Triton, TorchServe) vs Batch Inference (Airflow, Spark).",
        "Mitigation: Scheduled automated retraining pipelines, shadow deployments, canary rollouts, and feature stores (Feast)."
      ],
      "formulaOrSyntax": {
        "label": "Population Stability Index (PSI) Formula",
        "codeOrLatex": "\\text{PSI} = \\sum_{i=1}^{k} (\\% \\text{Actual}_i - \\% \\text{Expected}_i) \\times \\ln\\left(\\frac{\\% \\text{Actual}_i}{\\% \\text{Expected}_i}\\right)",
        "isLatex": true
      },
      "complexity": {
        "time": "Inference latency: p95 < 20ms for real-time REST serving; Drift test: O(N log N) per batch",
        "space": "O(N) rolling buffer window for live inference telemetry metrics"
      },
      "commonMistakeOrTrap": {
        "mistake": "Only monitoring system metrics (CPU, RAM, latency 200 OK) while ignoring silent model degradation.",
        "fix": "A broken model can return HTTP 200 OK with 1ms latency while outputting garbage predictions! Track prediction distributions and feature drift metrics.",
        "interviewTrap": "Question: 'What is the difference between Data Drift and Concept Drift?' Answer: Data Drift is when input feature distribution P(X) shifts (e.g. seasonal clothing search changes). Concept Drift is when the target relationship P(Y|X) shifts (e.g. fraud patterns change or pandemic alters purchasing behavior)."
      },
      "examCheatsheet": [
        "Data Drift = P(X) changes (inputs shift)",
        "Concept Drift = P(Y | X) changes (underlying truth shifts)",
        "PSI < 0.1: No change; PSI 0.1-0.2: Moderate drift; PSI > 0.2: Significant drift (Retrain!)",
        "Deployment strategies: Blue/Green, Canary, Shadow (Dark traffic)"
      ]
    },
    "visual": {
      "type": "architecture",
      "title": "Production MLOps Lifecycle & Drift Monitoring",
      "caption": "Real-time inference traffic is logged to a feature store; drift detectors compare production distributions against baseline training data.",
      "visualKey": "ml-mlops-drift",
      "details": {
        "comparison": {
          "headers": [
            "Type of Shift",
            "Mathematical Definition",
            "Real World Example",
            "Detection Metric"
          ],
          "rows": [
            [
              "Data Drift (Covariate)",
              "P(X) changes, P(Y|X) static",
              "New marketing campaign attracts older demographic",
              "KS-Test, PSI > 0.2"
            ],
            [
              "Concept Drift",
              "P(Y|X) changes, P(X) static",
              "Competitor drops prices, changing conversion rate",
              "Drop in ground truth F1/AUC"
            ],
            [
              "Label Drift (Prior)",
              "P(Y) changes",
              "Disease outbreak increases positive rate",
              "Chi-Square on target distribution"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "MLOps Production Inference & Drift Detection",
      "description": "Follow client request, model prediction, telemetry logging, and statistical PSI drift trigger leading to automated model retraining.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Detecting Feature Drift with Kolmogorov-Smirnov Test in Python",
      "language": "python",
      "code": "import numpy as np\nfrom scipy.stats import ks_2samp\n\nbaseline_train_feature = np.random.normal(50, 10, 1000)\n\nhealthy_prod_batch = np.random.normal(50.2, 10.1, 500)\ndrifted_prod_batch = np.random.normal(56, 10, 500)\n\nhealthy_stat, healthy_p = ks_2samp(baseline_train_feature, healthy_prod_batch)\ndrift_stat, drift_p = ks_2samp(baseline_train_feature, drifted_prod_batch)\n\nprint(f\"Healthy Batch p-value: {healthy_p:.4f} -> {'No Drift' if healthy_p > 0.05 else 'DRIFT DETECTED!'}\")\nprint(f\"Drifted Batch p-value: {drift_p:.4f} -> {'No Drift' if drift_p > 0.05 else 'DRIFT DETECTED!'}\")",
      "input": "Baseline vs production feature batches",
      "output": "Healthy Batch p-value: 0.8410 -> No Drift | Drifted Batch p-value: 0.0000 -> DRIFT DETECTED!",
      "explanation": "A p-value < 0.05 rejects the null hypothesis, triggering an automated alert or retraining pipeline."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What is the primary difference between Data Drift and Concept Drift?",
        "options": [
          "Data drift is about hardware failure; concept drift is about software bugs",
          "Data drift is change in input distribution P(X); concept drift is change in the relationship P(Y|X)",
          "Data drift only affects neural networks; concept drift only affects decision trees",
          "Data drift happens during training; concept drift happens during inference"
        ],
        "correctIndex": 1,
        "explanation": "Data drift shifts the inputs, while concept drift changes the real-world relationship between inputs and targets."
      },
      {
        "id": "q2",
        "question": "In Population Stability Index (PSI), what value typically indicates significant drift requiring model retraining?",
        "options": [
          "PSI < 0.01",
          "PSI = 0.05",
          "PSI > 0.20",
          "PSI is negative"
        ],
        "correctIndex": 2,
        "explanation": "Standard industry thresholds: PSI < 0.1 is stable, 0.1-0.2 indicates moderate change, and PSI > 0.2 indicates significant drift."
      },
      {
        "id": "q3",
        "question": "What is a 'Shadow Deployment' in MLOps?",
        "options": [
          "Running a model without any security protocols",
          "Deploying a new model to receive real production traffic without returning its predictions to the user, strictly for latency and accuracy testing",
          "Replacing all servers at midnight",
          "Training a model in dark mode"
        ],
        "correctIndex": 1,
        "explanation": "Shadow deployments duplicate real production traffic to the new model in the background, verifying performance with zero customer risk."
      }
    ]
  }
];
