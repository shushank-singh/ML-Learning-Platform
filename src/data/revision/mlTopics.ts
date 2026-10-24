import { RevisionTopic } from './types';

export const ML_REVISION_TOPICS: RevisionTopic[] = [
  {
    id: 'ml-bias-variance',
    subject: 'ml',
    category: 'ML Foundations',
    title: 'Bias-Variance Tradeoff',
    subtitle: 'Underfitting vs. Overfitting Dilemma in Machine Learning',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Foundations', 'Overfitting', 'Underfitting', 'Generalization'],
    quickRecall: {
      oneLiner:
        'Total error equals Bias² (underfitting error) + Variance (sensitivity to training noise) + Irreducible Noise (ε).',
      whenToUse:
        'When diagnosing model performance to decide whether to add model capacity or introduce regularization.',
      whyItMatters:
        'Finding the sweet spot between bias and variance guarantees the lowest possible error on unseen test data.',
      keyPoints: [
        'High Bias: Model is overly simplistic, misses patterns, causes high train and test error.',
        'High Variance: Model memorizes noise, fits training data perfectly, fails miserably on test data.',
        'Sweet Spot: Point on the complexity axis where test MSE is minimized.',
        'Remedy High Bias: Use deeper/more complex models, add interaction features, decrease regularization.',
        'Remedy High Variance: Collect more training samples, prune features, apply L1/L2 regularization, dropout.',
      ],
      formulaOrSyntax: {
        label: 'Mean Squared Error Decomposition',
        codeOrLatex: '\\text{MSE} = \\mathbb{E}[(y - \\hat{f}(x))^2] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma_\\epsilon^2',
        isLatex: true,
      },
      complexity: {
        time: 'Diagnostic: O(1)',
        space: 'O(1)',
        explanation: 'Conceptual trade-off balancing capacity against dataset scale.',
      },
      commonMistakeOrTrap: {
        mistake:
          'Assuming a 100% training accuracy means the model is flawless.',
        fix: 'A 100% training accuracy with poor validation accuracy is the textbook hallmark of catastrophic overfitting.',
        interviewTrap:
          'Question: "Can you eliminate both bias and variance completely?" Answer: No, reducing bias increases model flexibility, which inherently elevates variance for a fixed dataset size.',
      },
      examCheatsheet: [
        'High Bias = Underfitting (High Train Error, High Test Error)',
        'High Variance = Overfitting (Low Train Error, High Test Error)',
        'Irreducible error cannot be reduced by any model architecture',
        'L1/L2 regularization moves the model leftward towards lower variance',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'The U-Shaped Error Curve & Model Complexity Spectrum',
      caption:
        'As model complexity increases, Bias decreases monotonically while Variance increases quadratically. The optimal model balances both.',
      visualKey: 'ml-bias-variance-plot',
      details: {
        comparison: {
          headers: ['Metric', 'Underfitting (High Bias)', 'Optimal Model', 'Overfitting (High Variance)'],
          rows: [
            ['Train Error', 'High (Poor fit)', 'Low', 'Extremely Low / Near Zero'],
            ['Validation Error', 'High', 'Lowest (Minimum)', 'Very High (Generalization Gap)'],
            ['Model Complexity', 'Too Simple (e.g. Linear line for curves)', 'Balanced (e.g. Degree 3)', 'Overly Complex (e.g. Degree 15 Polynomial)'],
            ['Solution', 'Add features, use non-linear kernels', 'Tune hyperparameters', 'Regularize (L1/L2), get more data, prune'],
          ],
        },
      },
    },
    animation: {
      type: 'bias-variance-interactive',
      title: 'Polynomial Degree vs Generalization Error',
      description:
        'Adjust the polynomial degree slider from 1 to 10 to witness underfitting, sweet spot, and severe oscillating overfitting.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Model Polynomial Degree',
        min: 1,
        max: 10,
        step: 1,
        defaultVal: 3,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What happens when model complexity increases excessively?',
        options: [
          'Bias increases, Variance decreases',
          'Bias decreases, Variance increases',
          'Both Bias and Variance decrease to 0',
          'Irreducible error is completely eliminated',
        ],
        correctIndex: 1,
        explanation:
          'Greater model complexity allows fitting subtle variations (reducing bias) at the cost of being sensitive to noise (increasing variance).',
      },
      {
        id: 'q2',
        question: 'Which of the following is an effective remedy for high variance?',
        options: [
          'Adding more complex polynomial features',
          'Removing regularization constraints',
          'Collecting more training data or applying L2 regularization',
          'Using a deeper neural network without dropout',
        ],
        correctIndex: 2,
        explanation:
          'More data constrains parameter flexibility and regularization penalizes high weights, both taming high variance.',
      },
      {
        id: 'q3',
        question: 'What represents the irreducible error in MSE decomposition?',
        options: [
          'The error due to insufficient training epochs',
          'Inherent noise in data generation and unmeasured latent variables',
          'Hardware floating-point rounding errors',
          'Cross-entropy loss penalty',
        ],
        correctIndex: 1,
        explanation:
          'Irreducible error σ² is the natural noise inherent in the process that cannot be eliminated by any estimator.',
      },
    ],
  },
  {
    id: 'ml-gradient-descent',
    subject: 'ml',
    category: 'ML Foundations',
    title: 'Gradient Descent & Learning Rate',
    subtitle: 'First-Order Iterative Optimization of Loss Functions',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Optimization', 'Calculus', 'Loss Landscape', 'Learning Rate'],
    quickRecall: {
      oneLiner:
        'Weights update in the opposite direction of the gradient: w = w - η * ∇L(w).',
      whenToUse:
        'Everywhere in machine learning and deep learning to find parameter values that minimize cost.',
      whyItMatters:
        'Analytical closed-form solutions (like Normal Equation) scale poorly at O(d³); Gradient Descent scales at O(nd).',
      keyPoints: [
        'Gradient ∇L points in the direction of steepest ascent; negative gradient points downhill.',
        'Learning Rate (η) dictates step magnitude: too small crawls slowly, too large diverges.',
        'Batch GD computes gradients across all N samples; SGD computes on 1 sample; Mini-batch uses 32-256 samples.',
        'Convex loss functions (like MSE) have a single global minimum; non-convex have saddle points and local minima.',
      ],
      formulaOrSyntax: {
        label: 'Weight Update Equation',
        codeOrLatex: '\\theta_{t+1} = \\theta_t - \\eta \\cdot \\nabla_\\theta J(\\theta_t)',
        isLatex: true,
      },
      complexity: {
        time: 'O(k \\cdot n \\cdot d)',
        space: 'O(d)',
        explanation: 'k iterations, n samples, d dimensions.',
      },
      commonMistakeOrTrap: {
        mistake: 'Failing to normalize/standardize input features before gradient descent.',
        fix: 'Unscaled features produce distorted elliptical contours where gradient oscillates instead of descending directly toward the minimum.',
        interviewTrap:
          'Question: "Does gradient descent always guarantee finding the global minimum?" Answer: Only for strictly convex functions. For deep neural nets, it reaches good local minima or saddle points.',
      },
      examCheatsheet: [
        'η too small: Slow convergence, gets trapped in plateau',
        'η too large: Overshoots, bounces around, or diverges to NaN',
        'SGD has noisy updates that can jump out of shallow local minima',
        'Momentum adds fraction of previous velocity to accelerate through valleys',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'Loss Bowl Descent Trajectory & Learning Rate Dynamics',
      caption:
        'Visualizing parameter stepping on a quadratic loss surface under Optimal vs. Overshooting learning rates.',
      visualKey: 'ml-gradient-descent-plot',
      details: {
        comparison: {
          headers: ['Variant', 'Batch GD', 'Stochastic GD (SGD)', 'Mini-Batch GD'],
          rows: [
            ['Batch Size', 'Full Dataset (N)', '1 Sample', '32 to 512 (Vectorized)'],
            ['Gradient Quality', 'Exact, smooth trajectory', 'Noisy, erratic steps', 'Balanced, low variance'],
            ['Hardware Speed', 'Slow for big data', 'Cannot vectorize well', 'Optimal GPU vectorization'],
          ],
        },
      },
    },
    animation: {
      type: 'gradient-descent-interactive',
      title: 'Step Down the 2D Loss Surface',
      description:
        'Tweak the Learning Rate slider from 0.01 to 1.1 and press Play to observe smooth descent vs. wild oscillation.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Learning Rate (η)',
        min: 0.05,
        max: 1.05,
        step: 0.05,
        defaultVal: 0.2,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why do we subtract the gradient in the weight update rule?',
        options: [
          'Because the gradient points towards maximum increase of loss',
          'Because computers cannot calculate positive gradients',
          'To ensure weights always remain positive numbers',
          'To invert the covariance matrix',
        ],
        correctIndex: 0,
        explanation:
          'The gradient vector points in the direction of steepest ascent. Subtracting it moves parameters downhill towards the minimum loss.',
      },
      {
        id: 'q2',
        question: 'What is the primary danger of setting learning rate η too large?',
        options: [
          'The algorithm will take millions of steps without moving',
          'The updates will overshoot the minimum and diverge to infinity',
          'Features will automatically get deleted',
          'The model will underfit by zeroing out all weights',
        ],
        correctIndex: 1,
        explanation:
          'Excessive learning rate produces steps larger than the valley width, causing the loss to explode or bounce uncontrollably.',
      },
      {
        id: 'q3',
        question: 'Why is feature scaling critical prior to running Gradient Descent?',
        options: [
          'It makes the loss contours circular rather than elongated ellipses',
          'It reduces the number of training rows',
          'It eliminates the need for a bias term',
          'It forces all target labels to be integers',
        ],
        correctIndex: 0,
        explanation:
          'Unscaled features stretch the loss landscape into steep canyons where gradients bounce orthogonally rather than descending smoothly.',
      },
    ],
  },
  {
    id: 'ml-linear-regression',
    subject: 'ml',
    category: 'Linear & Logistic Regression',
    title: 'Linear Regression & Cost Minimization',
    subtitle: 'Ordinary Least Squares Line Fitting and Residuals',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Regression', 'OLS', 'Supervised Learning', 'Residuals'],
    quickRecall: {
      oneLiner:
        'Models a continuous relationship by minimizing the sum of squared vertical residuals: y = w^T x + b.',
      whenToUse:
        'When predicting continuous target values (e.g. house price, revenue, temperature) with linear relationships.',
      whyItMatters:
        'The foundational supervised regression model with high interpretability of individual feature weights.',
      keyPoints: [
        'Hypothesis: y_hat = w0 + w1*x1 + ... + wd*xd.',
        'Cost Function: Mean Squared Error (MSE) measures average squared deviation.',
        'Closed-form Normal Equation: w = (X^T X)^(-1) X^T y requires O(d³) matrix inversion.',
        'Key Gauss-Markov assumptions: Linearity, Independence of errors, Homoscedasticity, Normality of residuals.',
      ],
      formulaOrSyntax: {
        label: 'Ordinary Least Squares Cost Function',
        codeOrLatex: 'J(w, b) = \\frac{1}{2m} \\sum_{i=1}^{m} \\left( (w \\cdot x^{(i)} + b) - y^{(i)} \\right)^2',
        isLatex: true,
      },
      complexity: {
        time: 'Train: O(n \\cdot d^2 + d^3) [Normal Eq] or O(epochs \\cdot n \\cdot d) [GD]',
        space: 'O(d) for weights',
      },
      commonMistakeOrTrap: {
        mistake: 'Interpreting correlation as causation when analyzing feature weights.',
        fix: 'Regression coefficients show associative relationships given all other variables in the model; unmeasured confounders can mislead.',
        interviewTrap:
          'Question: "What happens if two features are perfectly collinear in X?" Answer: (X^T X) becomes singular (determinant = 0) and cannot be inverted in the closed-form solution.',
      },
      examCheatsheet: [
        'R² Score = 1 - (SS_res / SS_tot); 1.0 means perfect fit, 0 means as good as baseline mean',
        'Residuals must have zero mean and constant variance (Homoscedasticity)',
        'Extrapolating outside the feature domain is dangerously unreliable',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Fitted Regression Line with Residual Error Lines',
      caption:
        'Every data point projects a vertical distance (residual e_i) to the fitted line. OLS squares these distances to penalize outliers.',
      visualKey: 'ml-linear-regression-viz',
      details: {
        inputOutput: {
          input: 'Feature x = 5 (Square Footage in 100s)',
          output: 'Prediction y_hat = 2.4 * 5 + 1.2 = $13.2k',
        },
      },
    },
    animation: {
      type: 'linear-regression-interactive',
      title: 'Slope and Intercept Fitting Visualizer',
      description:
        'Adjust the Slope (w) and Intercept (b) to visually minimize the red residual squares until MSE drops to minimum.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Weight / Slope (w)',
        min: -2,
        max: 4,
        step: 0.2,
        defaultVal: 1.6,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does Ordinary Least Squares square the residual errors instead of using absolute values?',
        options: [
          'Because squared errors are differentiable and penalize large outliers more heavily',
          'Because negative numbers cannot be represented in binary',
          'To ensure the line passes through the origin',
          'It is required by Python syntax',
        ],
        correctIndex: 0,
        explanation:
          'Squaring makes the objective function smooth and convex with a continuous derivative everywhere, making gradient descent straightforward.',
      },
      {
        id: 'q2',
        question: 'What is the condition known as Homoscedasticity?',
        options: [
          'All features have zero mean',
          'Residual variance remains constant across all values of the predicted variable',
          'The model has equal number of rows and columns',
          'Weights sum up to 1',
        ],
        correctIndex: 1,
        explanation:
          'Homoscedasticity assumes constant variance of residuals across the range of fitted values.',
      },
      {
        id: 'q3',
        question: 'What does an R² score of 0.85 indicate?',
        options: [
          '85% of sample rows were classified correctly',
          '85% of variance in the dependent target is explained by the independent features',
          'The learning rate was set to 0.85',
          'The model is 85% likely to overfit',
        ],
        correctIndex: 1,
        explanation:
          'R² is the coefficient of determination: proportion of variance explained by the model compared to predicting the mean.',
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
        label: 'Sigmoid Probability & Log Loss',
        codeOrLatex: 'P(y=1|x) = \\sigma(w^T x + b) = \\frac{1}{1 + e^{-(w^T x + b)}}, \\quad \\mathcal{L} = -[y\\log(\\hat{y}) + (1-y)\\log(1-\\hat{y})]',
        isLatex: true,
      },
      complexity: {
        time: 'Inference: O(d) dot product | Train: O(epochs \\cdot n \\cdot d)',
        space: 'O(d) for weights vector',
      },
      commonMistakeOrTrap: {
        mistake: 'Assuming 0.5 is always the required classification threshold.',
        fix: 'In cancer detection or fraud prevention, lower the threshold (e.g. to 0.1) to boost recall and catch rare positive cases.',
        interviewTrap:
          'Question: "Can Logistic Regression solve the XOR problem?" Answer: No, its decision boundary is strictly linear. You must add polynomial/interaction features or use neural networks.',
      },
      examCheatsheet: [
        'Sigmoid derivative: σ\'(z) = σ(z)(1 - σ(z)), maximum derivative is 0.25 at z=0',
        'Log-odds increase by w_j for every 1-unit increase in feature x_j',
        'Odd ratio = e^(w_j)',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'S-Shaped Sigmoid Curve & Decision Boundary',
      caption:
        'Linear combination z mapped to [0, 1] probability. Crossing threshold θ shifts the discrete predicted label from 0 to 1.',
      visualKey: 'ml-logistic-boundary-viz',
      details: {
        comparison: {
          headers: ['Property', 'Linear Regression', 'Logistic Regression'],
          rows: [
            ['Output Range', '(-∞, +∞) Continuous Real', '[0, 1] Calibrated Probability'],
            ['Loss Function', 'Mean Squared Error (MSE)', 'Binary Cross-Entropy (Log Loss)'],
            ['Task Type', 'Regression', 'Binary & Multiclass Classification'],
          ],
        },
      },
    },
    animation: {
      type: 'logistic-threshold-interactive',
      title: 'Probability Threshold Classifier',
      description:
        'Slide the Decision Threshold from 0.1 to 0.9 and observe how Confusion Matrix, Precision, and Recall dynamically shift.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Classification Threshold',
        min: 0.1,
        max: 0.9,
        step: 0.05,
        defaultVal: 0.5,
      },
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
        explanation:
          'Log loss asymptotes to infinity as prediction diverges from ground truth label, heavily punishing overconfident false assertions.',
      },
      {
        id: 'q3',
        question: 'What shape is the decision boundary of standard Logistic Regression?',
        options: ['Spherical', 'Strictly Linear / Hyperplane', 'Circular', 'Fractal'],
        correctIndex: 1,
        explanation:
          'Because the boundary occurs where w^T x + b = 0, the decision boundary in feature space is a straight line, flat plane, or hyperplane.',
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
      whenToUse:
        'When models overfit or when dealing with multicollinear features or thousands of redundant predictors.',
      whyItMatters:
        'Lasso acts as automated feature selection; Ridge stabilizes models with highly correlated input features.',
      keyPoints: [
        'Ridge Penalty: λ * Σ w_j² (L2 Norm). Smooth circular constraint in weight space.',
        'Lasso Penalty: λ * Σ |w_j| (L1 Norm). Diamond-shaped constraint whose sharp corners hit axes at w_j = 0.',
        'ElasticNet: Combines both L1 and L2 penalties: r*L1 + (1-r)*L2 to handle groups of correlated features.',
        'Hyperparameter λ (or alpha): As λ → ∞, all weights shrink toward 0 (high bias).',
      ],
      formulaOrSyntax: {
        label: 'Cost Functions with Regularization',
        codeOrLatex: 'J_{\\text{Ridge}} = \\text{MSE} + \\lambda \\sum_{j=1}^d w_j^2, \\quad J_{\\text{Lasso}} = \\text{MSE} + \\lambda \\sum_{j=1}^d |w_j|',
        isLatex: true,
      },
      complexity: {
        time: 'Ridge: Closed form O(d³) | Lasso: Coordinate Descent O(iterations \\cdot n \\cdot d)',
        space: 'O(d)',
      },
      commonMistakeOrTrap: {
        mistake: 'Applying L1 or L2 regularization without standardizing features first.',
        fix: 'Features with large numeric scales will be unfairly penalized less than small-scale features; always scale to mean=0, std=1.',
        interviewTrap:
          'Question: "Why does Lasso produce exact zeros while Ridge does not?" Answer: Geometry! The diamond constraint of L1 has vertices on the coordinate axes where the elliptical contours of MSE intersect first.',
      },
      examCheatsheet: [
        'L1 (Lasso) = Sparse solutions (Feature Selection), Non-differentiable at 0',
        'L2 (Ridge) = Dense small weights, Analytical solution (X^TX + λI)^(-1)X^Ty, Handles multicollinearity',
        'ElasticNet avoids Lasso picking only 1 feature at random from a correlated cluster',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Geometric Duality: L1 Diamond vs. L2 Circle Contours',
      caption:
        'The loss ellipse touches the corner of the L1 diamond on the coordinate axis (w1=0), causing sparsity.',
      visualKey: 'ml-regularization-geometry',
      details: {
        comparison: {
          headers: ['Characteristic', 'Ridge (L2)', 'Lasso (L1)', 'ElasticNet (L1 + L2)'],
          rows: [
            ['Penalty Term', 'λ * Σ w_j²', 'λ * Σ |w_j|', 'λ1*Σ|w_j| + λ2*Σw_j²'],
            ['Weight Values', 'Shrinks close to zero, never 0', 'Drives many weights exactly to 0', 'Sparse + grouped selection'],
            ['Feature Selection', 'No (Keeps all features)', 'Yes (Built-in selection)', 'Yes (Balanced selection)'],
            ['Multicollinearity', 'Excellent (Distributes weights)', 'Selects arbitrary 1 from group', 'Best for grouped correlations'],
          ],
        },
      },
    },
    animation: {
      type: 'regularization-lambda-interactive',
      title: 'Shrinkage Path Visualizer',
      description:
        'Increase Regularization Strength λ to watch weights compress toward zero. Watch L1 snap weights straight to 0 while L2 keeps them tiny.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Regularization Strength (λ)',
        min: 0,
        max: 50,
        step: 2,
        defaultVal: 5,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does Lasso regularization produce sparse models with zero weights?',
        options: [
          'Its L1 contour has sharp corners that intersect loss ellipses on the coordinate axes',
          'It deletes data rows with negative values',
          'It rounds floating points to integers',
          'It replaces division with subtraction',
        ],
        correctIndex: 0,
        explanation:
          'The sharp vertices of the L1 diamond align with the parameter axes, making tangency with the loss contour occur at w_j = 0.',
      },
      {
        id: 'q2',
        question: 'When should you prefer Ridge regression over Lasso?',
        options: [
          'When you have 10,000 features and want to eliminate 9,900 of them',
          'When you have many correlated features that all contribute small signals to the target',
          'When you want all weights to become exactly zero',
          'When no scaling is performed',
        ],
        correctIndex: 1,
        explanation:
          'Ridge preserves all features while shrinking correlated parameters cooperatively, preventing arbitrary feature drops.',
      },
      {
        id: 'q3',
        question: 'What happens to the model when regularization parameter λ is set to 0?',
        options: [
          'All weights become 0',
          'The model reduces to unregularized Ordinary Least Squares (OLS)',
          'The model predicts only the mean',
          'Variance drops to zero',
        ],
        correctIndex: 1,
        explanation:
          'When λ=0, the penalty term disappears completely, yielding standard OLS regression.',
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
        time: 'Train: O(1) [Lazy] | Inference: O(N \\cdot d) brute force, or O(d \\log N) with KD-Tree',
        space: 'O(N \\cdot d) [Stores entire training set in RAM]',
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
        inputOutput: {
          input: 'Query point at coordinate (3.5, 4.2)',
          output: '3 Nearest: [Class A, Class A, Class B] -> Predicted Class A (67% confidence)',
        },
      },
    },
    animation: {
      type: 'knn-radius-interactive',
      title: 'K Neighbors Radius Slider',
      description:
        'Slide K from 1 to 15 to watch the neighbor circle expand and observe the classification vote update in real time.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Number of Neighbors (K)',
        min: 1,
        max: 15,
        step: 2,
        defaultVal: 3,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the training time complexity of standard KNN?',
        options: ['O(N log N)', 'O(N²)', 'O(1) because it simply stores training data', 'O(d³)'],
        correctIndex: 2,
        explanation: 'KNN is a lazy learner; training merely stores references to data points in memory.',
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
        explanation:
          'When K=1, every training point is its own nearest neighbor, causing 0% train error but jagged, brittle boundaries around noise.',
      },
      {
        id: 'q3',
        question: 'Why does KNN fail on datasets with 500 features?',
        options: [
          'Because of the Curse of Dimensionality: high-dimensional space is sparse and distance metrics lose contrast',
          'Computers cannot calculate square roots in high dimensions',
          'KNN only works on 2D planes',
          'Memory addresses overflow',
        ],
        correctIndex: 0,
        explanation:
          'In high dimensions, volume grows exponentially, points become uniformly distant, and distance metrics lose discriminative power.',
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
        time: 'Train: O(n \\cdot d \\cdot \\log n) | Inference: O(\\text{depth}) \\le O(\\log n)',
        space: 'O(\\text{nodes})',
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
        steps: [
          { label: 'Root Split', desc: 'Feature: Petal Length ≤ 2.45cm (Gini = 0.66 → pure Setosa leaf)' },
          { label: 'Level 1 Split', desc: 'Feature: Petal Width ≤ 1.75cm (Separates Versicolor from Virginica)' },
          { label: 'Leaf Prediction', desc: 'Terminal node contains 98% pure class assignment' },
        ],
      },
    },
    animation: {
      type: 'decision-tree-depth-interactive',
      title: 'Tree Depth vs Partition Granularity',
      description:
        'Increase Max Depth from 1 to 6 to visualize recursive box-cutting of the 2D feature plane.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Maximum Depth',
        min: 1,
        max: 6,
        step: 1,
        defaultVal: 2,
      },
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
        explanation:
          'The split criterion only checks whether a value is greater or smaller than a threshold, which is completely unaffected by scaling.',
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
        explanation:
          'An unpruned tree will keep splitting until every training sample is isolated into its own leaf, resulting in high variance.',
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
        time: 'Train: O(n^2 \\cdot d) to O(n^3) [Quadratic Programming] | Inference: O(S \\cdot d) [S = # Support Vectors]',
        space: 'O(S \\cdot d)',
      },
      commonMistakeOrTrap: {
        mistake: 'Training an SVM on 1,000,000 samples with an RBF kernel.',
        fix: 'Kernel SVM scales quadratically/cubically with sample size n; for big data, use LinearSVC or SGDClassifier with hinge loss.',
        interviewTrap:
          'Question: "What happens to the SVM decision boundary as RBF parameter γ (gamma) goes to infinity?" Answer: It creates isolated tight circular islands around individual support vectors, leading to extreme overfitting.',
      },
      examCheatsheet: [
        'Only Support Vectors on or inside margin lines define weights',
        'C parameter: High C = low bias, high variance; Low C = high bias, low variance',
        'RBF Gamma: High γ = tight complex boundaries; Low γ = smooth boundaries',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'Maximum Margin Street & Critical Support Vectors',
      caption:
        'The hyperplane w^T x + b = 0 runs precisely down the center of the margin street (width = 2 / ||w||).',
      visualKey: 'ml-svm-margin-viz',
      details: {
        comparison: {
          headers: ['Parameter', 'Low Value', 'High Value'],
          rows: [
            ['C (Regularization penalty)', 'Wide margin, tolerates many misclassifications', 'Narrow margin, strictly penalizes slack violations'],
            ['Gamma γ (RBF Kernel)', 'Broad Gaussian bell, smooth boundary', 'Pointed Gaussian spike, highly complex boundary'],
          ],
        },
      },
    },
    animation: {
      type: 'svm-margin-interactive',
      title: 'Margin Street & Slack Slider',
      description:
        'Adjust the C Penalty slider to watch the margin corridor expand or contract around the critical support vectors.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Margin Penalty (C)',
        min: 0.1,
        max: 10,
        step: 0.5,
        defaultVal: 1.0,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which points in the training set determine the position of the SVM hyperplane?',
        options: [
          'All points equally',
          'Only the Support Vectors that lie on or violate the margin boundaries',
          'Only the points located furthest from the boundary',
          'The centroid of each class',
        ],
        correctIndex: 1,
        explanation:
          'Non-support vector points can be shifted or deleted without changing the optimal separating hyperplane at all.',
      },
      {
        id: 'q2',
        question: 'What is the primary computational benefit of the Kernel Trick?',
        options: [
          'It eliminates all multiplications',
          'It computes dot products in high-dimensional Hilbert space without explicitly mapping vectors there',
          'It replaces floating points with integers',
          'It guarantees 0% error on all test sets',
        ],
        correctIndex: 1,
        explanation:
          'The kernel trick evaluates inner products K(x, z) directly in the input space, avoiding the exponential cost of explicit high-dimensional feature coordinates.',
      },
      {
        id: 'q3',
        question: 'What happens when parameter C is set to a huge number (e.g. C = 10,000)?',
        options: [
          'The model ignores all misclassifications',
          'The margin shrinks as the solver attempts to classify every single training point correctly, increasing variance',
          'The model becomes equivalent to linear regression',
          'The boundary becomes a circle',
        ],
        correctIndex: 1,
        explanation:
          'High C imposes a massive penalty for margin violations, forcing a narrow margin and risking overfitting.',
      },
    ],
  },
  {
    id: 'ml-evaluation-metrics',
    subject: 'ml',
    category: 'Evaluation Metrics',
    title: 'Precision, Recall, F1 & ROC-AUC',
    subtitle: 'Diagnostic Metrics for Skewed and Imbalanced Classification',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Confusion Matrix', 'Precision', 'Recall', 'F1-Score', 'ROC-AUC'],
    quickRecall: {
      oneLiner:
        'Accuracy is deceptive on imbalanced datasets; Precision measures exactness, Recall measures completeness, and ROC-AUC measures ranking power across all thresholds.',
      whenToUse:
        'Whenever evaluating classification models, especially with class imbalance (e.g. 99% non-fraud, 1% fraud).',
      whyItMatters:
        'A naive model predicting "No Fraud" gets 99% accuracy while having a disastrous 0% recall.',
      keyPoints: [
        'Precision = TP / (TP + FP): Of all predicted positives, how many were truly positive? (High cost of False Positives, e.g. spam filter).',
        'Recall = TP / (TP + FN): Of all actual positives, how many did we catch? (High cost of False Negatives, e.g. cancer detection).',
        'F1-Score = 2 * (Precision * Recall) / (Precision + Recall): Harmonic mean, penalizes extreme imbalances.',
        'ROC Curve plots TPR vs FPR across all thresholds. AUC = 0.5 is random coin flip; AUC = 1.0 is perfect ranking.',
      ],
      formulaOrSyntax: {
        label: 'Core Classification Formulas',
        codeOrLatex: '\\text{Prec} = \\frac{TP}{TP + FP}, \\quad \\text{Rec} = \\frac{TP}{TP + FN}, \\quad F_1 = \\frac{2 \\cdot \\text{Prec} \\cdot \\text{Rec}}{\\text{Prec} + \\text{Rec}}',
        isLatex: true,
      },
      complexity: {
        time: 'O(N) to compute confusion counts | O(N \\log N) for ROC-AUC sorting',
        space: 'O(1) storage for 2x2 matrix',
      },
      commonMistakeOrTrap: {
        mistake: 'Using ROC-AUC on extremely heavily imbalanced datasets (e.g. 1 positive in 10,000 negatives).',
        fix: 'Use Precision-Recall (PR) AUC instead; ROC-AUC can remain artificially high because huge True Negatives depress FPR.',
        interviewTrap:
          'Question: "Why is F1 computed with the harmonic mean instead of arithmetic mean?" Answer: If Precision=0.01 and Recall=1.0, arithmetic mean is 0.505 (looks okay), but harmonic mean drops to 0.019 (correctly sounds the alarm).',
      },
      examCheatsheet: [
        'False Positive (Type I Error): Said Yes, actually No',
        'False Negative (Type II Error): Said No, actually Yes',
        'Specificity = TN / (TN + FP) = 1 - FPR',
        'ROC-AUC is invariant to positive/negative class prevalence',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'The 2x2 Confusion Matrix & Metric Mapping',
      caption:
        'Row represents actual label; column represents model prediction. Diagonal entries (TP, TN) are correct predictions.',
      visualKey: 'ml-metrics-roc-viz',
      details: {
        comparison: {
          headers: ['Metric', 'Formula', 'Primary Priority Focus', 'Typical Domain'],
          rows: [
            ['Precision', 'TP / (TP + FP)', 'Minimize False Positives', 'Spam filter, content moderation'],
            ['Recall / Sensitivity', 'TP / (TP + FN)', 'Minimize False Negatives', 'Cancer screening, fraud alerts'],
            ['F1 Score', 'Harmonic Mean', 'Balanced compromise', 'Information retrieval, search'],
            ['ROC-AUC', 'Area Under TPR vs FPR', 'Threshold-free ranking power', 'Model comparison benchmarks'],
          ],
        },
      },
    },
    animation: {
      type: 'confusion-matrix-interactive',
      title: 'Threshold vs Precision-Recall Balancer',
      description:
        'Shift the probability cutoff to see True Positives, False Positives, and the Precision/Recall needle trade places.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Decision Cutoff',
        min: 0.1,
        max: 0.9,
        step: 0.1,
        defaultVal: 0.5,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'If a cancer screening model predicts "Healthy" for a patient who actually has a tumor, what kind of error occurred?',
        options: ['True Positive', 'False Positive (Type I)', 'False Negative (Type II)', 'True Negative'],
        correctIndex: 2,
        explanation: 'A missed positive diagnosis is a False Negative, which recall aims to minimize.',
      },
      {
        id: 'q2',
        question: 'Why is accuracy a misleading metric for a dataset where 99.5% of rows are non-fraudulent?',
        options: [
          'Because a dummy classifier predicting "No Fraud" on everything gets 99.5% accuracy while catching 0 fraudsters',
          'Because accuracy cannot be represented as a percentage',
          'Because the denominator is 0',
          'Because accuracy requires balanced test batches',
        ],
        correctIndex: 0,
        explanation:
          'High class imbalance renders accuracy meaningless because the majority class overwhelms the metric.',
      },
      {
        id: 'q3',
        question: 'What is the ROC-AUC score of a random guesser?',
        options: ['0.0', '0.5', '1.0', '-1.0'],
        correctIndex: 1,
        explanation:
          'A random classifier creates a diagonal line on the ROC plot (TPR = FPR), resulting in an area of exactly 0.5.',
      },
    ],
  },
  {
    id: 'ml-random-forest-xgboost',
    subject: 'ml',
    category: 'Random Forest, XGBoost and LightGBM',
    title: 'Random Forest vs. Gradient Boosting',
    subtitle: 'Bagging Independent Trees vs. Boosting Sequential Residuals',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 55,
    tags: ['Ensembles', 'Bagging', 'Boosting', 'Random Forest', 'XGBoost'],
    quickRecall: {
      oneLiner:
        'Random Forest trains deep trees in parallel on bootstrap samples to reduce variance; Gradient Boosting trains shallow trees sequentially on residual errors to reduce bias.',
      whenToUse:
        'The gold standard for tabular competitive machine learning; beats neural nets on structured tabular data in 90% of benchmarks.',
      whyItMatters:
        'Combines multiple weak learners into a highly robust, non-linear predictor resistant to overfitting.',
      keyPoints: [
        'Bagging (Random Forest): Bootstrap Aggregation + Random feature subset at each split. Trees are uncorrelated and averaged.',
        'Boosting (XGBoost/LightGBM): Each subsequent tree fits the negative gradient (residual) of the previous ensemble: F_{m}(x) = F_{m-1}(x) + η * h_m(x).',
        'XGBoost innovations: 2nd-order Taylor expansion loss, weighted quantile sketch, built-in L1/L2 tree leaf regularization.',
        'LightGBM innovation: Histogram-based splits and Leaf-wise (best-first) tree growth for 10x faster training.',
      ],
      formulaOrSyntax: {
        label: 'Gradient Boosting Residual Update',
        codeOrLatex: 'F_m(x) = F_{m-1}(x) + \\eta \\cdot \\arg\\min_h \\sum_{i=1}^n L(y_i, F_{m-1}(x_i) + h(x_i))',
        isLatex: true,
      },
      complexity: {
        time: 'Random Forest: O(M \\cdot n \\log n \\cdot d) [Parallelizable] | XGBoost: O(M \\cdot n \\cdot d) [Sequential]',
        space: 'O(M \\cdot \\text{nodes})',
      },
      commonMistakeOrTrap: {
        mistake: 'Using high learning rates (e.g. η = 0.5) with thousands of trees in XGBoost.',
        fix: 'Use small learning rates (η = 0.01 - 0.05) paired with early stopping on a validation set.',
        interviewTrap:
          'Question: "Can adding more trees cause Random Forest to overfit?" Answer: No! Adding more trees in Random Forest averages out variance and converges by the Law of Large Numbers. In Boosting, however, too many trees will overfit.',
      },
      examCheatsheet: [
        'Random Forest: Reduces Variance, Parallel trees, Hard to overfit with more trees',
        'Gradient Boosting: Reduces Bias & Variance, Sequential residuals, Can overfit without early stopping',
        'LightGBM grows leaf-wise; XGBoost grows level-wise (depth-first)',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Architectural Comparison: Parallel Bagging vs. Sequential Boosting',
      caption:
        'Random Forest averages independent trees simultaneously. Gradient Boosting passes residuals downstream sequentially.',
      visualKey: 'ml-ensembles-architecture',
      details: {
        comparison: {
          headers: ['Dimension', 'Random Forest (Bagging)', 'Gradient Boosting / XGBoost'],
          rows: [
            ['Tree Construction', 'Parallel & Independent', 'Sequential (Tree i fits residuals of Tree i-1)'],
            ['Tree Depth', 'Deep, fully-grown trees (High variance)', 'Shallow stumps (Depth 3-6, High bias)'],
            ['Primary Objective', 'Variance reduction via averaging', 'Bias and variance reduction via gradients'],
            ['Risk of Overfitting with more trees', 'Minimal (reaches convergence asymptote)', 'High (requires early stopping)'],
          ],
        },
      },
    },
    animation: {
      type: 'boosting-residuals-interactive',
      title: 'Sequential Residual Fitting Simulator',
      description:
        'Step through Trees 1 to 5 to watch the cumulative ensemble gradually eliminate the undulating residual error.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Current Boosting Iteration',
        min: 1,
        max: 5,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does Random Forest select a random subset of features at each split instead of using all features?',
        options: [
          'To de-correlate the individual trees so their ensemble average has much lower variance',
          'To save RAM on graphics cards',
          'Because some features are illegal to evaluate',
          'To convert continuous numbers to categories',
        ],
        correctIndex: 0,
        explanation:
          'If one feature is dominant, all trees would pick it first. Restricting feature subsets forces trees to find alternative patterns, decorrelating them.',
      },
      {
        id: 'q2',
        question: 'In Gradient Boosting, what does each subsequent tree fit?',
        options: [
          'A random projection of the original labels',
          'The negative gradients (pseudo-residuals) of the cumulative loss function',
          'Only the data points that were correctly classified',
          'The inverse of the covariance matrix',
        ],
        correctIndex: 1,
        explanation:
          'Each new tree is trained to predict the residual errors where the existing ensemble performed poorly.',
      },
      {
        id: 'q3',
        question: 'What is a major speed advantage of LightGBM over standard XGBoost?',
        options: [
          'It replaces floating points with strings',
          'It buckets continuous features into discrete histogram bins and uses leaf-wise splitting',
          'It only runs on 1 core',
          'It deletes half the training rows',
        ],
        correctIndex: 1,
        explanation:
          'Histogram binning reduces split computation from O(data * features) to O(bins * features), giving an order-of-magnitude speed boost.',
      },
    ],
  },
  {
    id: 'ml-kmeans',
    subject: 'ml',
    category: 'K-Means and DBSCAN',
    title: 'K-Means Clustering & Centroid Shift',
    subtitle: 'Iterative Lloyd Algorithm for Partitioning Unlabeled Data',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Clustering', 'Unsupervised', 'Centroids', 'Inertia', 'Elbow Method'],
    quickRecall: {
      oneLiner:
        'Iteratively alternates between assigning each sample to its nearest centroid and shifting each centroid to the mean of its assigned cluster.',
      whenToUse:
        'Customer segmentation, image color quantization, and anomaly detection where clusters are spherical and roughly equal in size.',
      whyItMatters:
        'The most popular unsupervised clustering algorithm due to linear scalability O(k*n*d) per iteration.',
      keyPoints: [
        'Objective: Minimize Within-Cluster Sum of Squares (WCSS / Inertia).',
        'Lloyd Step 1 (Assignment): Assign point x_i to argmin_k ||x_i - μ_k||².',
        'Lloyd Step 2 (Update): Recompute centroid μ_k = (1 / |C_k|) * Σ x_i.',
        'Initialization sensitivity: Random init can get stuck in poor local minima; K-Means++ spreads initial centroids far apart.',
      ],
      formulaOrSyntax: {
        label: 'K-Means Objective (Inertia)',
        codeOrLatex: 'J = \\sum_{k=1}^K \\sum_{x_i \\in C_k} ||x_i - \\mu_k||^2',
        isLatex: true,
      },
      complexity: {
        time: 'O(I \\cdot K \\cdot N \\cdot d) where I = iterations, K = clusters, N = samples',
        space: 'O(N + K \\cdot d)',
      },
      commonMistakeOrTrap: {
        mistake: 'Using K-Means on elongated, non-convex, or varying-density clusters.',
        fix: 'Use density-based DBSCAN or Gaussian Mixture Models (GMM) for complex manifold shapes.',
        interviewTrap:
          'Question: "How do you pick the optimal K if there are no target labels?" Answer: Use the Elbow Method (identifying the inflection point where Inertia reduction flattens) and Silhouette Score (near +1 means well-separated).',
      },
      examCheatsheet: [
        'K-Means++: First centroid random, subsequent centroids chosen with probability proportional to D(x)²',
        'Guaranteed to converge to a local minimum; not guaranteed global optimum',
        'Requires feature scaling because distances are directly compared',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'Centroid Voronoi Partitions & Iterative Drift',
      caption:
        'Centroids μ_1, μ_2, μ_3 drift through 2D space toward local cluster centers until assignments stabilize.',
      visualKey: 'ml-kmeans-cluster-viz',
      details: {
        steps: [
          { label: 'Step 1: Init', desc: 'Initialize 3 centroids via K-Means++ heuristics' },
          { label: 'Step 2: Assign', desc: 'Partition points based on nearest Euclidean centroid' },
          { label: 'Step 3: Relocate', desc: 'Recalculate center of mass for each color cluster' },
        ],
      },
    },
    animation: {
      type: 'kmeans-iterations-interactive',
      title: 'Centroid Drift Iteration Player',
      description:
        'Press Step or Play to watch centroids migrate into the center of the three scatter point clouds.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Iteration',
        min: 0,
        max: 6,
        step: 1,
        defaultVal: 0,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the primary innovation introduced by K-Means++ initialization?',
        options: [
          'It removes outliers before clustering',
          'It selects initial centroids with probability proportional to their squared distance from nearest existing centroid',
          'It automatically finds the optimal number of clusters K',
          'It replaces Euclidean distance with Manhattan distance',
        ],
        correctIndex: 1,
        explanation:
          'K-Means++ spaces initial centroids far apart, drastically speeding up convergence and avoiding bad local optima.',
      },
      {
        id: 'q2',
        question: 'What does the Silhouette Coefficient measure for a cluster assignment?',
        options: [
          'How similar an object is to its own cluster compared to other clusters (-1 to +1)',
          'The number of iterations taken to converge',
          'The determinant of the covariance matrix',
          'The memory usage in megabytes',
        ],
        correctIndex: 0,
        explanation:
          'Silhouette evaluates cohesion within a cluster versus separation from neighboring clusters; values close to +1 denote dense, well-separated clusters.',
      },
      {
        id: 'q3',
        question: 'Under which scenario does K-Means perform poorly?',
        options: [
          'Spherical clusters of identical density',
          'Concentric circular rings or crescent-shaped clusters',
          '2D Gaussian distributions',
          'Small datasets with 3 clearly separated dots',
        ],
        correctIndex: 1,
        explanation:
          'K-Means assumes spherical clusters separated by linear Voronoi boundaries, so it cannot resolve concentric circles or complex non-convex geometry.',
      },
    ],
  },
  {
    id: 'ml-pca',
    subject: 'ml',
    category: 'PCA and Dimensionality Reduction',
    title: 'Principal Component Analysis (PCA)',
    subtitle: 'Variance Maximization via Covariance Eigendecomposition',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Dimensionality Reduction', 'Unsupervised', 'Eigenvalues', 'Orthogonal Projection'],
    quickRecall: {
      oneLiner:
        'Orthogonally projects high-dimensional data onto axes of maximum variance, eliminating multicollinearity and reducing noise.',
      whenToUse:
        'High-dimensional datasets (e.g. gene expressions, image compression, visualization) where features suffer from multicollinearity.',
      whyItMatters:
        'Compresses 100+ correlated features into 2 or 3 uncorrelated principal components while retaining 95%+ of dataset information.',
      keyPoints: [
        'First Principal Component (PC1) points in the direction of greatest variance; PC2 is strictly orthogonal to PC1.',
        'Computed via Singular Value Decomposition (SVD) on centered matrix X: X = U Σ V^T.',
        'Eigenvalues of Covariance Matrix Σ equal the variance explained by each corresponding eigenvector.',
        'Data centering (mean = 0) is mandatory; standardization (variance = 1) is crucial when features have different units.',
      ],
      formulaOrSyntax: {
        label: 'Covariance Matrix & Projection',
        codeOrLatex: '\\mathbf{C} = \\frac{1}{n} \\mathbf{X}^T \\mathbf{X}, \\quad \\mathbf{C} \\mathbf{v}_i = \\lambda_i \\mathbf{v}_i, \\quad \\mathbf{Z} = \\mathbf{X} \\mathbf{W}_k',
        isLatex: true,
      },
      complexity: {
        time: 'Covariance Eigendecomposition: O(d^3 + d^2 \\cdot n) | Truncated SVD: O(n \\cdot d \\cdot k)',
        space: 'O(d \\cdot k) projection matrix',
      },
      commonMistakeOrTrap: {
        mistake: 'Applying PCA for feature selection and trying to read original feature names directly.',
        fix: 'PCA performs feature extraction (linear combination of ALL features), not feature elimination; components lose 1:1 physical meaning.',
        interviewTrap:
          'Question: "Are principal components correlated with each other?" Answer: Strictly No! By mathematical definition, all eigenvectors are mutually orthogonal, so correlation between distinct components is exactly 0.',
      },
      examCheatsheet: [
        'Explained Variance Ratio = λ_i / Σ λ_k',
        'Scree plot shows "elbow" where cumulative explained variance crosses 90-95%',
        'PCA is unsupervised (does not know or use target labels y)',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Orthogonal Axis Rotation & Projection onto PC1',
      caption:
        'The elliptical scatter plot rotates to align PC1 along the major variance axis and PC2 along the minor axis.',
      visualKey: 'ml-pca-projection-viz',
      details: {
        comparison: {
          headers: ['Component', 'Explained Variance', 'Cumulative Variance', 'Role'],
          rows: [
            ['PC 1', '72.4%', '72.4%', 'Captures main diagonal spread (Size factor)'],
            ['PC 2', '21.8%', '94.2%', 'Captures orthogonal variation (Shape factor)'],
            ['PC 3 - PC 10', '5.8% combined', '100.0%', 'Considered negligible noise and discarded'],
          ],
        },
      },
    },
    animation: {
      type: 'pca-projection-interactive',
      title: 'Axis of Maximum Spread Simulator',
      description:
        'Rotate the projection axis line to observe the shadow projections and watch explained variance peak at the optimal eigenvector angle.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Axis Angle (degrees)',
        min: 0,
        max: 180,
        step: 5,
        defaultVal: 35,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the relationship between the first and second Principal Components?',
        options: [
          'They are parallel to each other',
          'They are strictly orthogonal (perpendicular, correlation = 0)',
          'PC2 contains more variance than PC1',
          'They must sum to 180 degrees',
        ],
        correctIndex: 1,
        explanation:
          'Principal components are chosen to be mutually orthogonal, ensuring zero correlation between extracted features.',
      },
      {
        id: 'q2',
        question: 'Why must data be centered (mean subtracted) before computing PCA?',
        options: [
          'To ensure the first principal component aligns with variance rather than the distance from the origin',
          'Because negative numbers cannot be squared',
          'To eliminate all outliers',
          'Because SVD fails on non-zero numbers',
        ],
        correctIndex: 0,
        explanation:
          'If data is not centered, the first component will point toward the center of mass rather than the true direction of maximum variance.',
      },
      {
        id: 'q3',
        question: 'How do you determine how many principal components to keep?',
        options: [
          'Always keep exactly 2 for plotting',
          'Use a Scree plot to select the components whose cumulative explained variance exceeds a threshold (e.g. 90-95%)',
          'Count the number of rows in the dataset',
          'Keep only components with negative eigenvalues',
        ],
        correctIndex: 1,
        explanation:
          'The cumulative explained variance ratio indicates how much information is preserved; practitioners select k components that cover 90-95% of total variance.',
      },
    ],
  },
];
