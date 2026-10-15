import { LessonContent, ModuleData } from '@/lib/types';

export const module6Data: ModuleData = {
  id: 'module-6',
  number: 6,
  title: 'Ensemble Learning and Boosting',
  subtitle: 'Bagging, Random Forests, AdaBoost, Gradient Boosting, XGBoost, Stacking & SHAP',
  description: 'Harness the power of collective intelligence: Condorcet Jury Theorem, Bagging, Out-Of-Bag evaluation, Random Forests and tree decorrelation, AdaBoost exponential loss updates, Gradient Boosted Decision Trees, second-order Taylor approximations in XGBoost/LightGBM/CatBoost, multi-model Stacking, and TreeSHAP interpretability.',
  icon: 'Layers',
  badge: 'Ensembles',
  estimatedHours: 18,
  topicsCount: 9,
  lessons: [
    {
      id: 'ensemble-foundations',
      moduleId: 'module-6',
      title: 'Ensemble Foundations & Wisdom of Crowds',
      description: 'Condorcet Jury Theorem, bias-variance trade-off in ensembles, and variance reduction through decorrelated learners.',
      order: 1,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'bagging-bootstrap-aggregating',
      moduleId: 'module-6',
      title: 'Bagging & Out-of-Bag (OOB) Evaluation',
      description: 'Bootstrap sampling with replacement, the 1 - 1/e asymptotic omission probability, and free validation via OOB error.',
      order: 2,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'random-forests',
      moduleId: 'module-6',
      title: 'Random Forests & Tree Decorrelation',
      description: 'Random subspace feature sampling, tree decorrelation, variance reduction proofs, and hyperparameter tuning.',
      order: 3,
      readTimeMinutes: 26,
      visualizerType: 'decision-tree',
      difficulty: 'Intermediate',
    },
    {
      id: 'boosting-fundamentals',
      moduleId: 'module-6',
      title: 'Boosting Fundamentals & Sequential Learning',
      description: 'Converting weak learners to strong learners, sequential residual minimization, and contrast with parallel bagging.',
      order: 4,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'adaboost',
      moduleId: 'module-6',
      title: 'AdaBoost: Adaptive Boosting & Exponential Loss',
      description: 'Weighted empirical risk, stage-wise additive modeling, learner weights alpha_t, and sample re-weighting dynamics.',
      order: 5,
      readTimeMinutes: 25,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'gradient-boosting',
      moduleId: 'module-6',
      title: 'Gradient Boosted Decision Trees (GBDT)',
      description: 'Optimization in function space, pseudo-residuals as negative gradients, shrinkage rates, and terminal leaf optimization.',
      order: 6,
      readTimeMinutes: 28,
      visualizerType: 'gradient-descent',
      difficulty: 'Advanced',
    },
    {
      id: 'xgboost-lightgbm-catboost',
      moduleId: 'module-6',
      title: 'Modern Gradient Boosters: XGBoost, LightGBM & CatBoost',
      description: 'Second-order Taylor approximations, exact split gain with L2 regularization, histogram binning, GOSS, and target encoding.',
      order: 7,
      readTimeMinutes: 30,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
    {
      id: 'voting-stacking-blending',
      moduleId: 'module-6',
      title: 'Voting, Stacking & Blending Architectures',
      description: 'Hard vs soft voting, Level-0 base learners, Level-1 meta-estimators, and preventing leakage via Out-Of-Fold predictions.',
      order: 8,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'feature-importance-shap',
      moduleId: 'module-6',
      title: 'Feature Importance & TreeSHAP Interpretability',
      description: 'MDI impurity bias, Permutation Importance, and cooperative game-theoretic Shapley values with TreeSHAP.',
      order: 9,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
  ],
};

export const module6Lessons: Record<string, LessonContent> = {
  'ensemble-foundations': {
    id: 'ensemble-foundations',
    moduleId: 'module-6',
    title: 'Ensemble Foundations & Wisdom of Crowds',
    subtitle: 'Condorcet Jury Theorem, Bias-Variance Reduction & Diversity',
    order: 1,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Understand the mathematical principles underpinning the Wisdom of Crowds.',
      'Derive Condorcet Jury Theorem and prove how collective accuracy exceeds individual accuracy.',
      'Analyze the bias-variance decomposition of ensemble predictions.',
      'Quantify the critical role of learner diversity and pairwise correlation rho.',
    ],
    prerequisites: ['Probability fundamentals', 'Bias-Variance tradeoff', 'Decision Trees basics'],
    previousLesson: {
      id: 'cost-sensitive-thresholding',
      title: 'Cost-Sensitive Learning & Threshold Tuning',
      moduleId: 'module-5',
    },
    analogy: {
      title: 'The Medical Diagnostic Tumor Board',
      text: 'When a patient has a complex, ambiguous medical condition, a hospital does not rely on a single physician. Instead, they convene a Tumor Board comprising an oncologist, a radiologist, a pathologist, and a surgical specialist. Each physician has individual biases and blind spots, but when they deliberate and vote independently, their collective consensus diagnosis is drastically more reliable and error-resistant than any single doctor acting in isolation.',
      metaphor: 'An ensemble combines diverse, imperfect individual perspectives into a collective decision that cancels out idiosyncratic errors.',
    },
    problemSolved: {
      title: 'Why Single Models Underperform Complex Distributions',
      description: 'Individual machine learning models suffer from fundamental limitations: high-capacity models overfit sample idiosyncrasies (high variance), while constrained models miss subtle non-linear interactions (high bias).',
      keyPoints: [
        'High variance in unconstrained decision trees makes them notoriously unstable to small data perturbations.',
        'Ensembles aggregate multiple models to suppress variance without increasing bias (Bagging) or systematically reduce bias (Boosting).',
        'Independent errors cancel out when aggregated, yielding an asymptotically superior decision boundary.',
      ],
    },
    intuition: {
      overview: 'If you ask 100 people to estimate the weight of an ox, individual guesses will vary wildly, but the arithmetic mean of all guesses is often within 1% of the true weight. In machine learning, ensembling leverages this exact statistical phenomenon.',
      steps: [
        {
          step: 1,
          title: 'Individual Base Learners',
          description: 'Train M base estimators (e.g., decision trees, linear models, neural networks) on the training dataset.',
        },
        {
          step: 2,
          title: 'Induce Model Diversity',
          description: 'Ensure individual models make uncorrelated errors through data subsampling, feature subsampling, or distinct algorithmic architectures.',
        },
        {
          step: 3,
          title: 'Aggregation',
          description: 'Combine individual predictions via majority voting (classification) or weighted averaging (regression).',
        },
      ],
    },
    mathematics: {
      overview: 'Condorcet Jury Theorem provides the foundational statistical proof for ensembling. Furthermore, analyzing the variance of correlated random variables proves why diversity is essential.',
      foundations: [
        {
          name: "Condorcet's Jury Theorem",
          latex: 'P(\\text{Majority Correct}) = \\sum_{k=\\lceil (M+1)/2 \\rceil}^{M} \\binom{M}{k} p^k (1-p)^{M-k}',
          explanation: 'If each of M independent voters has probability p > 0.5 of making the correct decision, the probability of the majority being correct approaches 1 as M approaches infinity.',
        },
        {
          name: 'Variance of an Ensemble of Correlated Learners',
          latex: '\\text{Var}(\\bar{f}) = \\rho \\sigma^2 + \\frac{1-\\rho}{M} \\sigma^2',
          explanation: 'where sigma^2 is the variance of individual models, M is the number of estimators, and rho is the average pairwise correlation between models. As M -> inf, the variance approaches rho * sigma^2.',
        },
        {
          name: 'Ambiguity Decomposition (Krogh & Vedelsby)',
          latex: '(f_{\\text{ens}}(x) - y)^2 = \\sum_{m=1}^M w_m (f_m(x) - y)^2 - \\sum_{m=1}^M w_m (f_m(x) - f_{\\text{ens}}(x))^2',
          explanation: 'Ensemble error equals the weighted average error of individual models minus the ensemble ambiguity (diversity). Higher diversity strictly reduces ensemble error.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Ensemble Variance Under Pairwise Correlation',
      objective: 'Prove that ensemble variance is bounded below by pairwise correlation rho * sigma^2 regardless of ensemble size M.',
      steps: [
        {
          step: 1,
          label: 'Express the mean prediction of M estimators',
          latex: '\\bar{f}(x) = \\frac{1}{M} \\sum_{i=1}^M f_i(x)',
          explanation: 'Assume each estimator f_i has equal variance Var(f_i) = sigma^2 and pairwise correlation Cor(f_i, f_j) = rho for i != j.',
        },
        {
          step: 2,
          label: 'Expand the variance of the sum',
          latex: '\\text{Var}(\\bar{f}) = \\text{Var}\\left(\\frac{1}{M} \\sum_{i=1}^M f_i\\right) = \\frac{1}{M^2} \\left[ \\sum_{i=1}^M \\text{Var}(f_i) + \\sum_{i=1}^M \\sum_{j \\neq i} \\text{Cov}(f_i, f_j) \\right]',
          explanation: 'Variance of a linear combination expands into individual variance terms and cross-covariance terms.',
        },
        {
          step: 3,
          label: 'Substitute variances and covariances',
          latex: '\\text{Var}(\\bar{f}) = \\frac{1}{M^2} [M \\sigma^2 + M(M-1) \\rho \\sigma^2]',
          explanation: 'There are M individual variance terms and M(M-1) pairwise covariance terms where Cov(f_i, f_j) = rho * sigma^2.',
        },
        {
          step: 4,
          label: 'Factor and simplify into the canonical ensemble variance formula',
          latex: '\\text{Var}(\\bar{f}) = \\frac{\\sigma^2}{M} + \\frac{M-1}{M} \\rho \\sigma^2 = \\rho \\sigma^2 + \\frac{1 - \\rho}{M} \\sigma^2',
          explanation: 'This proves that if rho = 0 (perfect independence), variance shrinks to sigma^2 / M. But if models are identical (rho = 1), variance remains sigma^2.',
        },
      ],
    },
    variables: [
      { symbol: 'M', name: 'Ensemble Size', description: 'Total number of individual base models combined', dimensions: 'Scalar integer' },
      { symbol: 'p', name: 'Base Learner Competence', description: 'Probability that an individual base learner predicts correctly', dimensions: 'Probability in (0, 1)' },
      { symbol: '\\rho', name: 'Pairwise Correlation', description: 'Average correlation coefficient between pairs of base model errors', dimensions: 'Scalar in [-1, 1]' },
      { symbol: '\\sigma^2', name: 'Base Model Variance', description: 'Variance of the individual base models', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Condorcet Jury Theorem calculation for M=3 independent classifiers each with accuracy p = 0.70.',
      dataset: [
        { model: 'Classifier 1', accuracy: 0.70 },
        { model: 'Classifier 2', accuracy: 0.70 },
        { model: 'Classifier 3', accuracy: 0.70 },
      ],
      calculations: [
        {
          step: 'Identify majority outcomes',
          math: '\\text{Majority correct when either all 3 are correct (k=3) or exactly 2 are correct (k=2)}',
          result: 'k in {2, 3}',
        },
        {
          step: 'Compute probability for k=3',
          math: 'P(k=3) = \\binom{3}{3} (0.70)^3 (0.30)^0 = 1 \\times 0.343 \\times 1',
          result: '0.343',
        },
        {
          step: 'Compute probability for k=2',
          math: 'P(k=2) = \\binom{3}{2} (0.70)^2 (0.30)^1 = 3 \\times 0.49 \\times 0.30',
          result: '0.441',
        },
        {
          step: 'Sum probabilities',
          math: 'P(\\text{Majority Correct}) = 0.343 + 0.441',
          result: '0.784 (78.4%)',
        },
      ],
      finalConclusion: 'By ensembling 3 weak classifiers each with 70% accuracy, the ensemble achieves 78.4% accuracy—an 8.4 percentage point improvement!',
    },
    visualExplanation: {
      title: 'Ensemble Decision Boundary Smoothing',
      description: 'Single decision trees create jagged, axis-aligned step functions that severely overfit training noise. An ensemble of diverse trees averages hundreds of such step functions, yielding a smooth, continuous, and robust probability surface.',
      features: [
        'Single Tree: High variance, fragile decision boundaries with sharp rectangular cuts.',
        'Correlated Ensemble: Only marginal smoothing; repeated identical errors dominate.',
        'Diverse Ensemble: Smooth non-linear decision boundary with optimal generalization.',
      ],
    },
    scratchCode: {
      title: 'Ensemble Voting Classifier from Scratch in NumPy',
      code: `import numpy as np

class MajorityVotingClassifier:
    """
    Ensemble classifier that aggregates predictions from multiple base models
    using hard majority voting.
    """
    def __init__(self, estimators):
        self.estimators = estimators

    def fit(self, X, y):
        for clf in self.estimators:
            clf.fit(X, y)
        return self

    def predict(self, X):
        # Collect predictions from each estimator: shape (n_estimators, n_samples)
        predictions = np.array([clf.predict(X) for clf in self.estimators])
        # Compute majority vote along axis 0
        majority_votes = []
        for i in range(X.shape[0]):
            votes = predictions[:, i]
            vals, counts = np.unique(votes, return_counts=True)
            majority_votes.append(vals[np.argmax(counts)])
        return np.array(majority_votes)
`,
      explanation: 'Fits each base estimator independently on the data and aggregates class predictions per sample using mode/majority vote.',
    },
    sklearnCode: {
      title: 'Scikit-Learn VotingClassifier Implementation',
      code: `from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier

# Instantiate diverse base models
clf1 = LogisticRegression(random_state=42)
clf2 = DecisionTreeClassifier(max_depth=4, random_state=42)
clf3 = KNeighborsClassifier(n_neighbors=5)

# Build hard and soft voting ensembles
ensemble_hard = VotingClassifier(
    estimators=[('lr', clf1), ('dt', clf2), ('knn', clf3)],
    voting='hard'
)

ensemble_soft = VotingClassifier(
    estimators=[('lr', clf1), ('dt', clf2), ('knn', clf3)],
    voting='soft',
    weights=[1, 2, 1]  # Optional weighting
)
`,
      explanation: 'Scikit-Learn VotingClassifier supports both hard majority voting and soft probability-weighted voting across heterogeneous models.',
    },
    runnableCode: {
      code: `import numpy as np
from scipy.stats import binom

# Condorcet Jury Theorem Simulation
def condorcet_accuracy(p, M):
    """Compute probability that majority of M voters with competence p are correct."""
    majority_threshold = (M // 2) + 1
    # Sum binomial probabilities from majority_threshold to M
    return sum(binom.pmf(k, M, p) for k in range(majority_threshold, M + 1))

print("--- Condorcet Jury Theorem Accuracy by Ensemble Size (p = 0.60) ---")
for M in [1, 5, 11, 25, 51, 101, 501]:
    acc = condorcet_accuracy(0.60, M)
    print(f"Ensemble Size M={M:3d}: Accuracy = {acc * 100:.2f}%")

print("\\n--- Variance Reduction under Pairwise Correlation (sigma^2 = 1.0, M = 50) ---")
sigma2 = 1.0
M = 50
for rho in [0.0, 0.1, 0.3, 0.6, 0.9, 1.0]:
    var = rho * sigma2 + ((1 - rho) / M) * sigma2
    reduction = (1 - var / sigma2) * 100
    print(f"Correlation rho = {rho:.1f} -> Ensemble Var = {var:.4f} (Variance Reduction: {reduction:.1f}%)")
`,
      expectedOutput: `--- Condorcet Jury Theorem Accuracy by Ensemble Size (p = 0.60) ---
Ensemble Size M=  1: Accuracy = 60.00%
Ensemble Size M=  5: Accuracy = 68.26%
Ensemble Size M= 11: Accuracy = 75.35%
Ensemble Size M= 25: Accuracy = 84.62%
Ensemble Size M= 51: Accuracy = 92.51%
Ensemble Size M=101: Accuracy = 97.87%
Ensemble Size M=501: Accuracy = 99.99%

--- Variance Reduction under Pairwise Correlation (sigma^2 = 1.0, M = 50) ---
Correlation rho = 0.0 -> Ensemble Var = 0.0200 (Variance Reduction: 98.0%)
Correlation rho = 0.1 -> Ensemble Var = 0.1180 (Variance Reduction: 88.2%)
Correlation rho = 0.3 -> Ensemble Var = 0.3140 (Variance Reduction: 68.6%)
Correlation rho = 0.6 -> Ensemble Var = 0.6080 (Variance Reduction: 39.2%)
Correlation rho = 0.9 -> Ensemble Var = 0.9020 (Variance Reduction: 9.8%)
Correlation rho = 1.0 -> Ensemble Var = 1.0000 (Variance Reduction: 0.0%)`,
    },
    lineByLineExplanation: [
      {
        lines: '6-9',
        codeSnippet: 'majority_threshold = (M // 2) + 1\nreturn sum(binom.pmf(k, M, p) for k in range(majority_threshold, M + 1))',
        explanation: 'Finds the smallest integer strictly exceeding half of M and sums the binomial probability mass from that threshold up to M.',
      },
      {
        lines: '19-21',
        codeSnippet: 'var = rho * sigma2 + ((1 - rho) / M) * sigma2',
        explanation: 'Applies the theoretical variance formula showing how residual ensemble variance is lower-bounded by pairwise correlation rho.',
      },
    ],
    hyperparameters: [
      {
        name: 'voting',
        defaultVal: "'hard'",
        range: "['hard', 'soft']",
        effect: "'hard' takes majority vote of labels; 'soft' averages predicted class probabilities before thresholding.",
        recommendation: "Use 'soft' whenever base estimators produce well-calibrated probabilities, as it gives high-confidence predictions more influence.",
      },
      {
        name: 'weights',
        defaultVal: 'None',
        range: 'List of floats of length M',
        effect: 'Assigns unequal importance to individual base learners during probability or vote aggregation.',
        recommendation: 'Weight learners proportional to their validation accuracy or log-odds competence.',
      },
    ],
    assumptions: [
      {
        assumption: 'Base Learner Competence (p > 0.5)',
        whyItMatters: 'If base models perform worse than random chance (p < 0.5), Condorcet theorem proves ensemble accuracy approaches 0 as M increases.',
        howToVerify: 'Evaluate each base learner independently on validation folds to ensure competence exceeds baseline chance.',
      },
      {
        assumption: 'Error Independence / Low Correlation',
        whyItMatters: 'If base models make identical errors (rho = 1), ensembling yields zero variance reduction and wastes compute.',
        howToVerify: 'Compute the Pearson correlation matrix of residuals or prediction errors across the models.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Ensembling identical models with different random seeds only.',
        solution: 'Seed perturbation provides minimal diversity (rho ~ 0.95). Introduce diversity via different algorithm families, feature subsets, or bootstrap sampling.',
      },
      {
        mistake: 'Using soft voting with poorly calibrated classifiers (e.g. uncalibrated Naive Bayes or deep trees).',
        solution: 'Calibrate probabilities using Platt Scaling or Isotonic Regression before soft voting, or default to hard voting.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Kaggle & Competitive Data Science', application: 'Winning Competition Pipelines', benefit: 'Virtually all top Kaggle solutions combine 10-50 diverse models via ensembling to squeeze out winning metric fractions.' },
      { industry: 'Financial Fraud Detection', application: 'Transaction Risk Scoring', benefit: 'Combines rules engines, gradient boosters, and neural networks to prevent catastrophic false negatives.' },
      { industry: 'Healthcare', application: 'Clinical Diagnostic Decision Support', benefit: 'Aggregates imaging classifiers and electronic health record predictors to minimize life-threatening misdiagnoses.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-6-1-1',
        question: 'What happens to ensemble accuracy in Condorcet Jury Theorem if individual accuracy is p = 0.45?',
        hint: 'Evaluate the limit as M approaches infinity.',
        answer: 'If p < 0.5, the majority vote probability approaches 0 as M -> inf. The ensemble is systematically worse than an individual model.',
      },
      {
        id: 'pq-6-1-2',
        question: 'Why is pairwise correlation rho the limiting factor in ensemble variance reduction?',
        hint: 'Look at the limit as M -> infinity in the variance formula.',
        answer: 'Because as M -> inf, the term (1 - rho)*sigma^2 / M approaches 0, leaving rho * sigma^2. You cannot reduce variance below rho * sigma^2 regardless of how many models you add.',
      },
      {
        id: 'pq-6-1-3',
        question: 'What is the key difference between hard voting and soft voting?',
        hint: 'Think about discrete labels vs continuous probability distributions.',
        answer: 'Hard voting counts discrete predicted class labels (winner takes all per model), whereas soft voting computes the average of predicted class probabilities, allowing confident models to exert stronger influence.',
      },
    ],
    quiz: [
      {
        id: 'q-6-1-1',
        question: 'According to the Krogh-Vedelsby ambiguity decomposition, ensemble generalization error equals:',
        options: [
          'The sum of base learner errors plus model correlation.',
          'The weighted average error of base learners minus the ensemble ambiguity (diversity).',
          'The product of individual learner variances.',
          'The minimum error achieved by any single base model.',
        ],
        correctIndex: 1,
        explanation: 'Ensemble Error = Average Base Error - Ensemble Ambiguity. Higher diversity (ambiguity) strictly reduces generalization error.',
      },
      {
        id: 'q-6-1-2',
        question: 'If you train 100 decision trees on the exact same dataset without any randomization or subsampling, what is the ensemble variance reduction?',
        options: [
          '99% reduction',
          '50% reduction',
          '0% reduction (rho = 1.0)',
          '100% reduction',
        ],
        correctIndex: 2,
        explanation: 'Without subsampling or randomization, the trees are identical (correlation rho = 1.0). When rho = 1, Var(ensemble) = sigma^2, offering 0% variance reduction.',
      },
      {
        id: 'q-6-1-3',
        question: 'Under what condition does Soft Voting outperform Hard Voting?',
        options: [
          'When base models produce well-calibrated class probability estimates.',
          'When the number of classes is greater than 100.',
          'When individual models have accuracy p < 0.5.',
          'When all base models are identical.',
        ],
        correctIndex: 0,
        explanation: 'Soft voting leverages probability magnitudes. When calibrated, a model predicting 99% confidence appropriately outweighs two models predicting 51% confidence in the opposing direction.',
      },
    ],
    independentExercise: {
      title: 'Simulate Condorcet Jury Theorem with Synthetic Correlated Voters',
      problem: 'Write a Python function `simulate_ensemble(p, M, n_trials)` that generates synthetic binary predictions for M independent classifiers with accuracy p over n_trials, applies majority voting, and verifies empirical ensemble accuracy.',
      hints: ['Use np.random.binomial(1, p, size=(n_trials, M))', 'Check if row sum >= (M // 2) + 1'],
      starterCode: `import numpy as np

def simulate_ensemble(p=0.65, M=11, n_trials=10000):
    # TODO: generate synthetic predictions and compute majority vote accuracy
    pass

acc = simulate_ensemble(0.65, 11)
print(f"Empirical Ensemble Accuracy: {acc:.4f}")
`,
      solution: `import numpy as np

def simulate_ensemble(p=0.65, M=11, n_trials=10000):
    np.random.seed(42)
    # 1 represents correct prediction, 0 represents incorrect
    votes = np.random.binomial(1, p, size=(n_trials, M))
    correct_counts = np.sum(votes, axis=1)
    majority_threshold = (M // 2) + 1
    ensemble_correct = (correct_counts >= majority_threshold).astype(int)
    return float(np.mean(ensemble_correct))

acc = simulate_ensemble(0.65, 11)
print(f"Empirical Ensemble Accuracy (M=11, p=0.65): {acc:.4f}")
`,
    },
    summary: {
      keyTakeaways: [
        'Ensembling combines multiple individual models to achieve higher accuracy and lower variance than any constituent model.',
        'Condorcet Jury Theorem guarantees asymptotic perfection as M -> inf, provided base learners are independent and p > 0.5.',
        'Ensemble variance is bounded below by pairwise correlation rho * sigma^2; maximizing model diversity is the key to effective ensembling.',
      ],
      nextLessonId: 'bagging-bootstrap-aggregating',
      nextLessonTitle: 'Bagging & Out-of-Bag (OOB) Evaluation',
      nextLessonModuleId: 'module-6',
    },
  },

  'bagging-bootstrap-aggregating': {
    id: 'bagging-bootstrap-aggregating',
    moduleId: 'module-6',
    title: 'Bagging & Out-of-Bag (OOB) Evaluation',
    subtitle: 'Bootstrap Sampling with Replacement & Asymptotic OOB Bounds',
    order: 2,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand the mechanism of Bootstrap Aggregating (Bagging).',
      'Derive the asymptotic 1 - 1/e ≈ 63.2% sample inclusion rate.',
      'Explain how Out-of-Bag (OOB) samples provide unbiased validation for free.',
      'Implement a Bagging meta-estimator from scratch.',
    ],
    prerequisites: ['ensemble-foundations', 'Decision Trees', 'Probability basics'],
    previousLesson: {
      id: 'ensemble-foundations',
      title: 'Ensemble Foundations & Wisdom of Crowds',
      moduleId: 'module-6',
    },
    analogy: {
      title: 'The Resampled Scientific Focus Group',
      text: 'Imagine a survey firm assessing public opinion on a new policy with a pool of 1,000 citizens. Instead of polling all 1,000 citizens once, they draw 100 different focus groups of size 1,000 with replacement (a citizen can be selected multiple times in the same focus group). In each group, roughly 368 citizens are left out. Those left out serve as an independent test group to evaluate the reliability of that specific group’s findings.',
      metaphor: 'Bagging trains each learner on a random bootstrap sample with replacement; untouched samples serve as a built-in validation test set.',
    },
    problemSolved: {
      title: 'Taming High-Variance Estimators',
      description: 'Fully grown decision trees are non-parametric estimators with zero bias on training data but extreme variance. Minor changes in the training set produce radically different split points. Bagging averages across bootstrap replicates to slash variance.',
      keyPoints: [
        'Bootstrap sampling generates diverse training subsets from a single dataset.',
        'Averaging M high-variance base learners stabilizes predictions without sacrificing low bias.',
        'Out-of-Bag (OOB) estimation eliminates the need for a separate cross-validation loop.',
      ],
    },
    intuition: {
      overview: 'Given a dataset of size N, we draw N samples uniformly at random with replacement. On average, ~63.2% of unique observations appear in the bootstrap set, while ~36.8% are omitted (Out-of-Bag).',
      steps: [
        {
          step: 1,
          title: 'Bootstrap Resampling',
          description: 'Sample N instances with replacement from the original dataset D to form replicate D_b.',
        },
        {
          step: 2,
          title: 'Independent Training',
          description: 'Train an unpruned base learner h_b on each bootstrap dataset D_b in parallel.',
        },
        {
          step: 3,
          title: 'Out-of-Bag Evaluation',
          description: 'Evaluate sample x_i using only the subset of base learners that did NOT include x_i in their training set.',
        },
      ],
    },
    mathematics: {
      overview: 'The mathematical elegance of bagging lies in the asymptotic omission probability derived from calculus and the law of large numbers.',
      foundations: [
        {
          name: 'Probability of Sample Omission in a Single Bootstrap Draw',
          latex: 'P(\\text{Not Selected}) = \\left(1 - \\frac{1}{N}\\right)^N',
          explanation: 'At each draw, the probability of selecting an observation is 1/N, so the probability of not selecting it is 1 - 1/N. For N independent draws, this compounds to (1 - 1/N)^N.',
        },
        {
          name: 'Asymptotic Limit of OOB Proportion',
          latex: '\\lim_{N \\to \\infty} \\left(1 - \\frac{1}{N}\\right)^N = e^{-1} \\approx 0.3679',
          explanation: 'As sample size N grows large, exactly 36.79% of observations are omitted from each bootstrap replicate, leaving ~63.21% unique instances.',
        },
        {
          name: 'Out-of-Bag (OOB) Predictor',
          latex: '\\hat{y}_i^{\\text{OOB}} = \\arg\\max_c \\sum_{b: (x_i, y_i) \\notin D_b} \\mathbb{I}(\\hat{y}_b(x_i) = c)',
          explanation: 'The OOB prediction for instance i aggregates only those models trained on bootstrap sets where instance i was omitted.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Asymptotic 1 - 1/e Bootstrap Inclusion Rate',
      objective: 'Prove that exactly ~63.2% of distinct samples are sampled in any large bootstrap draw.',
      steps: [
        {
          step: 1,
          label: 'Probability of selecting a specific sample in one draw',
          latex: 'P(\\text{Picked in draw } k) = \\frac{1}{N}',
          explanation: 'Each instance has an identical 1/N probability of being chosen on any single draw with replacement.',
        },
        {
          step: 2,
          label: 'Probability of never being chosen across N independent draws',
          latex: 'P(\\text{Omitted across all } N \\text{ draws}) = \\left(1 - \\frac{1}{N}\\right)^N',
          explanation: 'Because draws are independent with replacement, we multiply the non-selection probability N times.',
        },
        {
          step: 3,
          label: 'Apply the fundamental calculus limit definition of e',
          latex: '\\lim_{N \\to \\infty} \\left(1 + \\frac{x}{N}\\right)^N = e^x \\implies \\lim_{N \\to \\infty} \\left(1 - \\frac{1}{N}\\right)^N = e^{-1}',
          explanation: 'With x = -1, the expression converges directly to 1/e.',
        },
        {
          step: 4,
          label: 'Compute the numerical fraction of included samples',
          latex: 'P(\\text{Included at least once}) = 1 - e^{-1} \\approx 1 - 0.367879 = 0.632121',
          explanation: 'Approximately 63.21% of original data points appear in each bootstrap sample, while 36.79% remain Out-of-Bag.',
        },
      ],
    },
    variables: [
      { symbol: 'N', name: 'Dataset Size', description: 'Total number of instances in the training set', dimensions: 'Scalar integer' },
      { symbol: 'B', name: 'Number of Bootstrap Replicates', description: 'Number of bagged estimators trained', dimensions: 'Scalar integer' },
      { symbol: 'D_b', name: 'Bootstrap Dataset', description: 'b-th dataset drawn with replacement from D', dimensions: 'Set of N pairs (x_i, y_i)' },
      { symbol: 'e^{-1}', name: 'OOB Probability', description: 'Asymptotic fraction of samples excluded from a bootstrap replicate (~0.368)', dimensions: 'Constant' },
    ],
    numericalExample: {
      scenario: 'Trace bootstrap omission on a miniature dataset with N=5 samples: S = {1, 2, 3, 4, 5}.',
      dataset: [
        { sample_id: 1, feature: 10 },
        { sample_id: 2, feature: 20 },
        { sample_id: 3, feature: 30 },
        { sample_id: 4, feature: 40 },
        { sample_id: 5, feature: 50 },
      ],
      calculations: [
        {
          step: 'Compute exact omission probability for N=5',
          math: 'P(\\text{Omitted}) = \\left(1 - \\frac{1}{5}\\right)^5 = (0.8)^5',
          result: '0.32768 (32.8%)',
        },
        {
          step: 'Compare with asymptotic limit e^(-1)',
          math: 'e^{-1} \\approx 0.36788 \\implies \\Delta = |0.32768 - 0.36788|',
          result: '0.0402 (within 4% even for N=5!)',
        },
        {
          step: 'Simulate a bootstrap draw with replacement',
          math: '\\text{Draws: } [2, 4, 2, 5, 2] \\implies \\text{Unique included: } \\{2, 4, 5\\} \\text{ (3/5 = 60%)}',
          result: 'OOB samples = {1, 3} (2/5 = 40%)',
        },
      ],
      finalConclusion: 'Even with only 5 samples, exactly 40% are Out-of-Bag, remarkably close to the theoretical 36.8% limit.',
    },
    visualExplanation: {
      title: 'Bootstrap Resampling and Out-of-Bag Partitioning',
      description: 'Each horizontal lane represents one of B bootstrap replicates. Dots represent dataset instances: green dots indicate instances sampled (some repeated 2 or 3 times), while orange empty circles represent Out-of-Bag instances used for validation.',
      features: [
        'In-Bag: ~63.2% unique instances with duplicates due to sampling with replacement.',
        'Out-of-Bag: ~36.8% untouched instances, forming an unbiased evaluation partition.',
        'Parallel Independence: Every model is trained completely independently on its own replicate.',
      ],
    },
    scratchCode: {
      title: 'BaggingClassifier with OOB Error from Scratch in NumPy',
      code: `import numpy as np
from sklearn.tree import DecisionTreeClassifier

class BaggingClassifierScratch:
    def __init__(self, n_estimators=50, max_samples=1.0, random_state=42):
        self.n_estimators = n_estimators
        self.max_samples = max_samples
        self.random_state = random_state
        self.estimators_ = []
        self.oob_indices_ = []

    def fit(self, X, y):
        n_samples = X.shape[0]
        rng = np.random.RandomState(self.random_state)
        self.estimators_ = []
        self.oob_indices_ = []

        # Store OOB predictions: shape (n_samples, n_classes)
        n_classes = len(np.unique(y))
        oob_votes = np.zeros((n_samples, n_classes))

        for b in range(self.n_estimators):
            # Bootstrap sampling with replacement
            boot_idx = rng.choice(n_samples, size=n_samples, replace=True)
            oob_mask = np.ones(n_samples, dtype=bool)
            oob_mask[boot_idx] = False
            oob_idx = np.where(oob_mask)[0]

            # Fit base tree
            tree = DecisionTreeClassifier(max_depth=None, random_state=rng.randint(10000))
            tree.fit(X[boot_idx], y[boot_idx])
            self.estimators_.append(tree)

            # Record OOB predictions
            if len(oob_idx) > 0:
                preds = tree.predict(X[oob_idx])
                for idx, pred in zip(oob_idx, preds):
                    oob_votes[idx, pred] += 1

        # Calculate OOB score
        valid_oob = np.sum(oob_votes, axis=1) > 0
        oob_preds = np.argmax(oob_votes[valid_oob], axis=1)
        self.oob_score_ = np.mean(oob_preds == y[valid_oob])
        return self

    def predict(self, X):
        all_preds = np.array([tree.predict(X) for tree in self.estimators_])
        return np.apply_along_axis(lambda x: np.bincount(x).argmax(), axis=0, arr=all_preds)
`,
      explanation: 'Generates bootstrap indices, tracks OOB instances, trains individual unpruned decision trees, and aggregates OOB votes to report an exact OOB accuracy score.',
    },
    sklearnCode: {
      title: 'Scikit-Learn BaggingClassifier with OOB Score',
      code: `from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier

bagging = BaggingClassifier(
    estimator=DecisionTreeClassifier(max_depth=None),
    n_estimators=100,
    max_samples=1.0,         # 100% of data drawn with replacement
    bootstrap=True,          # Sample with replacement
    oob_score=True,          # Calculate Out-Of-Bag accuracy
    n_jobs=-1,               # Train all trees in parallel across CPU cores
    random_state=42
)

bagging.fit(X_train, y_train)
print(f"OOB Accuracy Score: {bagging.oob_score_:.4f}")
`,
      explanation: 'With oob_score=True, scikit-learn automatically records predictions on untouched samples and exposes bagging.oob_score_.',
    },
    runnableCode: {
      code: `import numpy as np

# Verify asymptotic omission probability (1 - 1/N)^N -> 1/e
def omission_prob(N):
    return (1.0 - 1.0 / N) ** N

print("--- Convergence of OOB Omission Probability (1 - 1/N)^N ---")
sample_sizes = [2, 5, 10, 50, 100, 1000, 10000]
limit_e = 1.0 / np.e

for N in sample_sizes:
    p_omitted = omission_prob(N)
    diff = abs(p_omitted - limit_e)
    print(f"N = {N:5d} -> P(Omitted) = {p_omitted:.6f} | Delta from 1/e = {diff:.6f}")

print(f"Theoretical Asymptotic Limit (1/e): {limit_e:.6f} (~36.79%)")
print(f"Theoretical In-Bag Fraction (1 - 1/e): {1 - limit_e:.6f} (~63.21%)")
`,
      expectedOutput: `--- Convergence of OOB Omission Probability (1 - 1/N)^N ---
N =     2 -> P(Omitted) = 0.250000 | Delta from 1/e = 0.117879
N =     5 -> P(Omitted) = 0.327680 | Delta from 1/e = 0.040199
N =    10 -> P(Omitted) = 0.348678 | Delta from 1/e = 0.019201
N =    50 -> P(Omitted) = 0.364170 | Delta from 1/e = 0.003709
N =   100 -> P(Omitted) = 0.366032 | Delta from 1/e = 0.001847
N =  1000 -> P(Omitted) = 0.367695 | Delta from 1/e = 0.000184
N = 10000 -> P(Omitted) = 0.367861 | Delta from 1/e = 0.000018
Theoretical Asymptotic Limit (1/e): 0.367879 (~36.79%)
Theoretical In-Bag Fraction (1 - 1/e): 0.632121 (~63.21%)`,
    },
    lineByLineExplanation: [
      {
        lines: '4-5',
        codeSnippet: 'def omission_prob(N):\n    return (1.0 - 1.0 / N) ** N',
        explanation: 'Computes the exact mathematical probability that an item is omitted when drawing N times with replacement.',
      },
      {
        lines: '13-15',
        codeSnippet: 'diff = abs(p_omitted - limit_e)\nprint(...)',
        explanation: 'Validates that the finite-sample omission probability converges rapidly to e^(-1) as N increases.',
      },
    ],
    hyperparameters: [
      {
        name: 'n_estimators',
        defaultVal: '10',
        range: '10 to 1000+',
        effect: 'More estimators monotonically reduce ensemble variance without increasing risk of overfitting.',
        recommendation: 'Use 100-300 estimators; performance plateaus beyond that point while runtime scales linearly.',
      },
      {
        name: 'max_samples',
        defaultVal: '1.0',
        range: '(0.0, 1.0]',
        effect: 'Proportion of original samples to draw for each bootstrap replicate.',
        recommendation: 'Leave at 1.0 for classic bagging; reduce to 0.7-0.8 (Pasting) for large datasets to speed up training.',
      },
      {
        name: 'bootstrap',
        defaultVal: 'True',
        range: '[True, False]',
        effect: 'True samples with replacement (Bagging); False samples without replacement (Pasting).',
        recommendation: 'Set to True to leverage OOB score and maximize tree diversity.',
      },
    ],
    assumptions: [
      {
        assumption: 'Base Estimators Suffer from High Variance (Instability)',
        whyItMatters: 'Bagging is primarily a variance-reduction technique. Applying bagging to stable, high-bias models (e.g., Linear Regression) yields virtually zero performance gain.',
        howToVerify: 'Check if base learners overfit or change predictions significantly under small data perturbations.',
      },
      {
        assumption: 'Observations are I.I.D. (Independent and Identically Distributed)',
        whyItMatters: 'If data has temporal or spatial dependencies, standard bootstrap sampling breaks chronological order and leaks future state.',
        howToVerify: 'For time-series data, use Block Bootstrap or Moving Window sampling instead of naive bagging.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using Bagging with shallow, constrained base models (e.g. max_depth=2).',
        solution: 'Use deep, unpruned trees as base learners. High variance is required for bagging averaging to provide maximum reduction.',
      },
      {
        mistake: 'Running k-fold cross-validation when OOB score is already available.',
        solution: 'OOB error is mathematically equivalent to leave-one-group-out cross-validation and is computed for free during fitting.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Genomics & Bioinformatics', application: 'Microarray Gene Expression Classification', benefit: 'Small sample size (N < 200) with thousands of genes benefits from bootstrap stability and reliable OOB error.' },
      { industry: 'Credit Risk Analysis', application: 'Loan Default Prediction', benefit: 'Bagged decision trees prevent single extreme outliers from distorting credit score approval thresholds.' },
      { industry: 'Astronomy', application: 'Star vs Galaxy Photometric Classification', benefit: 'Averaging across bootstrap samples prevents faint optical noise artifacts from corrupting astronomical catalogs.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-6-2-1',
        question: 'Why does Bagging work exceptionally well with Decision Trees but poorly with Linear Regression?',
        hint: 'Think about whether each model has high bias or high variance.',
        answer: 'Decision trees are unstable, high-variance estimators that benefit directly from variance reduction through averaging. Linear regression is stable and low-variance; averaging multiple linear fits yields the same linear line and cannot fix high bias.',
      },
      {
        id: 'pq-6-2-2',
        question: 'What is the exact asymptotic proportion of training data excluded from a bootstrap sample?',
        hint: 'Evaluate limit (1 - 1/N)^N as N -> inf.',
        answer: 'The asymptotic proportion is 1/e ≈ 0.367879, or roughly 36.8% of the dataset.',
      },
      {
        id: 'pq-6-2-3',
        question: 'Can increasing n_estimators in Bagging cause the ensemble to overfit?',
        hint: 'Consider the expectation and variance of the averaged estimator.',
        answer: 'No. Adding more trees in Bagging never causes overfitting because it simply reduces variance towards rho * sigma^2 while keeping bias constant. It only increases training time.',
      },
    ],
    quiz: [
      {
        id: 'q-6-2-1',
        question: 'What is the Out-Of-Bag (OOB) error in a Bagging ensemble?',
        options: [
          'The error computed on the test set after 10-fold cross validation.',
          'The prediction error evaluated on instances using only the subset of trees that did NOT include those instances in their bootstrap sample.',
          'The error caused by hardware memory running out of bounds during training.',
          'The training error evaluated on the in-bag samples.',
        ],
        correctIndex: 1,
        explanation: 'Each tree omits ~36.8% of the data. The OOB score evaluates every training instance using only the ensemble of trees where that instance was never sampled.',
      },
      {
        id: 'q-6-2-2',
        question: 'If a dataset has N=10,000 samples, approximately how many unique samples will be included in a single bootstrap draw with replacement?',
        options: [
          '5,000 samples (50.0%)',
          '6,321 samples (63.2%)',
          '3,679 samples (36.8%)',
          '10,000 samples (100.0%)',
        ],
        correctIndex: 1,
        explanation: 'As N -> inf, 1 - 1/e ≈ 63.21% unique samples are drawn. For N=10,000, this corresponds to approximately 6,321 unique samples.',
      },
      {
        id: 'q-6-2-3',
        question: 'What is the primary computational advantage of Bagging compared to Boosting?',
        options: [
          'Bagging models can be trained completely in parallel across multiple CPU/GPU cores because learners are independent.',
          'Bagging requires only one decision tree to be built.',
          'Bagging uses gradient descent instead of greedy splitting.',
          'Bagging eliminates the need for feature scaling, whereas boosting requires min-max scaling.',
        ],
        correctIndex: 0,
        explanation: 'Because every bootstrap replicate and base tree is constructed independently, Bagging is embarrassingly parallelizable (e.g. n_jobs=-1).',
      },
    ],
    independentExercise: {
      title: 'Implement an OOB Evaluation Pipeline in Python',
      problem: 'Write a script using `sklearn.ensemble.BaggingClassifier` on a synthetic classification dataset. Train with `oob_score=True`, print the OOB accuracy, and compare it with 5-fold cross-validation accuracy.',
      hints: ['from sklearn.datasets import make_classification', 'from sklearn.model_selection import cross_val_score', 'Compare bagging.oob_score_ with cv_scores.mean()'],
      starterCode: `from sklearn.datasets import make_classification
from sklearn.ensemble import BaggingClassifier
from sklearn.model_selection import cross_val_score
import numpy as np

X, y = make_classification(n_samples=500, n_features=10, random_state=42)

# TODO: Fit BaggingClassifier with oob_score=True and compare with 5-fold CV
`,
      solution: `from sklearn.datasets import make_classification
from sklearn.ensemble import BaggingClassifier
from sklearn.model_selection import cross_val_score
import numpy as np

X, y = make_classification(n_samples=500, n_features=10, random_state=42)

bag = BaggingClassifier(n_estimators=100, oob_score=True, random_state=42)
bag.fit(X, y)

cv_scores = cross_val_score(bag, X, y, cv=5)

print(f"OOB Accuracy Score:    {bag.oob_score_:.4f}")
print(f"5-Fold CV Mean Score:  {np.mean(cv_scores):.4f} (+/- {np.std(cv_scores):.4f})")
print(f"Absolute Difference:   {abs(bag.oob_score_ - np.mean(cv_scores)):.4f}")
`,
    },
    summary: {
      keyTakeaways: [
        'Bagging draws bootstrap samples with replacement to train independent high-variance estimators in parallel.',
        'Asymptotically, ~63.2% of samples are sampled in-bag, while ~36.8% are omitted out-of-bag.',
        'OOB error provides an unbiased validation estimate without setting aside validation data or running expensive cross-validation.',
      ],
      nextLessonId: 'random-forests',
      nextLessonTitle: 'Random Forests & Tree Decorrelation',
      nextLessonModuleId: 'module-6',
    },
  },

  'random-forests': {
    id: 'random-forests',
    moduleId: 'module-6',
    title: 'Random Forests & Tree Decorrelation',
    subtitle: 'Feature Subspace Sampling, Tree Decorrelation & Variance Slashing',
    order: 3,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'decision-tree',
    objectives: [
      'Explain how Random Forests build on Bagging via the Random Subspace method.',
      'Prove mathematically how feature subsampling reduces tree pairwise correlation rho.',
      'Tune critical hyperparameters: n_estimators, max_features, max_depth, and min_samples_leaf.',
      'Analyze Gini importance (Mean Decrease Impurity) and its limitations.',
    ],
    prerequisites: ['bagging-bootstrap-aggregating', 'Decision Trees (CART)', 'Variance of correlated variables'],
    previousLesson: {
      id: 'bagging-bootstrap-aggregating',
      title: 'Bagging & Out-of-Bag (OOB) Evaluation',
      moduleId: 'module-6',
    },
    analogy: {
      title: 'The Unbiased Talent Scouts',
      text: 'Suppose an entertainment agency sends 100 talent scouts to evaluate performers. If every scout is allowed to look at all attributes (singing, dancing, charisma, acting), every scout will inevitably focus on the single most dominant superstar, producing 100 virtually identical reports (high correlation). But if each scout is restricted to inspecting only a randomly assigned subset of two attributes, different scouts will discover different diamonds in the rough. When their evaluations are merged, the agency gets an extraordinarily rich, robust, and decorrelated assessment.',
      metaphor: 'Random Forests force trees to look at random subsets of features at each split, preventing a single dominant feature from dictating every tree.',
    },
    problemSolved: {
      title: 'The Tree Correlation Bottleneck in Standard Bagging',
      description: 'In regular bagged trees, if one or two features are overwhelmingly strong predictors, virtually every bootstrap tree selects that same top feature at the root split. Consequently, the bootstrap trees become strongly correlated (high rho), severely capping variance reduction.',
      keyPoints: [
        'Standard bagging fails to reduce variance when trees are strongly correlated.',
        'Random Forests inject feature randomness at every split (Random Subspace Method).',
        'By driving rho down, ensemble variance rho * sigma^2 drops dramatically.',
      ],
    },
    intuition: {
      overview: 'Random Forests combine two layers of randomization: row subsampling (bootstrap aggregating) and column subsampling (evaluating only m < p randomly chosen features at each split).',
      steps: [
        {
          step: 1,
          title: 'Bootstrap Sample',
          description: 'Draw a bootstrap sample of N observations with replacement from the training dataset.',
        },
        {
          step: 2,
          title: 'Random Feature Subspace at Split',
          description: 'At each node split, randomly select m features from the total p features (typically m = sqrt(p)).',
        },
        {
          step: 3,
          title: 'Optimal Subspace Split',
          description: 'Compute the best split point using only those m candidate features, without pruning.',
        },
        {
          step: 4,
          title: 'Ensemble Aggregation',
          description: 'Repeat across B trees and aggregate via majority voting or probability averaging.',
        },
      ],
    },
    mathematics: {
      overview: 'The variance of a Random Forest directly follows the correlated sum variance formula derived in the foundations lesson.',
      foundations: [
        {
          name: 'Random Forest Ensemble Variance',
          latex: '\\text{Var}(\\bar{f}_{RF}) = \\rho(m) \\sigma^2 + \\frac{1 - \\rho(m)}{B} \\sigma^2',
          explanation: 'where rho(m) is the pairwise tree correlation as a function of feature subspace size m. Smaller m reduces correlation rho(m), driving down the variance asymptote.',
        },
        {
          name: 'Standard Feature Subspace Rules of Thumb',
          latex: 'm_{\\text{classification}} = \\lfloor\\sqrt{p}\\rfloor, \\quad m_{\\text{regression}} = \\lfloor p / 3 \\rfloor',
          explanation: 'Selecting sqrt(p) features for classification balances tree strength (individual accuracy) and tree diversity (low correlation).',
        },
        {
          name: 'Mean Decrease in Impurity (Gini Importance)',
          latex: 'I(f_k) = \\sum_{b=1}^B \\sum_{t \\in T_b: v(t)=k} p(t) \\Delta I(t)',
          explanation: 'Total weighted impurity decrease achieved by splits on feature k, summed across all nodes in all trees.',
        },
      ],
    },
    derivation: {
      title: 'Mathematical Proof of Variance Reduction via Feature Decorrelation',
      objective: 'Show that decreasing tree correlation rho through feature subsampling achieves superior variance reduction even if individual tree variance sigma^2 increases slightly.',
      steps: [
        {
          step: 1,
          label: 'Recall the ensemble variance formula as B approaches infinity',
          latex: '\\lim_{B \\to \\infty} \\text{Var}(\\bar{f}) = \\rho \\sigma^2',
          explanation: 'As the number of trees B grows, the sample-averaging term vanishes, leaving the correlation asymptote.',
        },
        {
          step: 2,
          label: 'Evaluate standard bagging with high correlation',
          latex: '\\text{Bagging: } \\rho_{\\text{bag}} = 0.60, \\quad \\sigma_{\\text{tree}}^2 = 1.00 \\implies \\text{Var} \\approx 0.60',
          explanation: 'Without feature subsampling, dominant features create strongly correlated trees with high variance ceiling.',
        },
        {
          step: 3,
          label: 'Evaluate Random Forest with decorrelation',
          latex: '\\text{Random Forest: } \\rho_{RF} = 0.20, \\quad \\sigma_{RF}^2 = 1.10 \\implies \\text{Var} \\approx 0.20 \\times 1.10 = 0.22',
          explanation: 'Even if individual trees are slightly weaker or have 10% higher variance, reducing correlation from 0.60 to 0.20 slashes overall ensemble variance by 63%!',
        },
      ],
    },
    variables: [
      { symbol: 'p', name: 'Total Features', description: 'Total number of input features in the feature space', dimensions: 'Scalar integer' },
      { symbol: 'm', name: 'Candidate Features per Split', description: 'Number of randomly sampled features considered at each node', dimensions: 'Scalar integer (m <= p)' },
      { symbol: 'B', name: 'Number of Trees', description: 'Total number of decision trees in the forest', dimensions: 'Scalar integer' },
      { symbol: '\\rho(m)', name: 'Tree Correlation', description: 'Pairwise correlation between pairs of tree predictions', dimensions: 'Scalar in [0, 1]' },
    ],
    numericalExample: {
      scenario: 'Compare ensemble variance for B=100 trees under Bagging vs Random Forest.',
      dataset: [
        { model: 'Standard Bagged Trees', rho: 0.65, sigma2: 1.0 },
        { model: 'Random Forest (sqrt(p))', rho: 0.22, sigma2: 1.1 },
      ],
      calculations: [
        {
          step: 'Compute Bagging ensemble variance for B=100',
          math: '\\text{Var}_{\\text{bag}} = 0.65 \\times 1.0 + \\frac{1 - 0.65}{100} \\times 1.0 = 0.65 + 0.0035',
          result: '0.6535',
        },
        {
          step: 'Compute Random Forest ensemble variance for B=100',
          math: '\\text{Var}_{RF} = 0.22 \\times 1.1 + \\frac{1 - 0.22}{100} \\times 1.1 = 0.242 + 0.00858',
          result: '0.2506',
        },
        {
          step: 'Compute relative variance reduction',
          math: '\\text{Reduction} = \\frac{0.6535 - 0.2506}{0.6535} \\times 100\\%',
          result: '61.66% variance reduction!',
        },
      ],
      finalConclusion: 'By injecting feature subspace randomization, the Random Forest slashes variance by over 61% compared to standard bagging.',
    },
    visualExplanation: {
      title: 'Tree Decorrelation and Random Subspace Splits',
      description: 'The interactive visualizer highlights how different trees branch at their roots. Tree #1 splits on Feature 3 (Age), Tree #2 splits on Feature 7 (Income), and Tree #3 splits on Feature 1 (Blood Pressure). By preventing single-feature dominance, individual trees capture complementary signals across the data manifold.',
      features: [
        'Root Diversity: Independent root splits prevent uniform bias across trees.',
        'Feature Competition: Weak features get opportunities to create informative splits.',
        'Smooth Decision Surface: Aggregated step functions form an isotropic probability contour.',
      ],
    },
    scratchCode: {
      title: 'Random Forest Classifier from Scratch in Python',
      code: `import numpy as np
from collections import Counter

class Node:
    def __init__(self, feature=None, threshold=None, left=None, right=None, *, value=None):
        self.feature = feature
        self.threshold = threshold
        self.left = left
        self.right = right
        self.value = value

    @property
    def is_leaf(self):
        return self.value is not None

class RandomForestScratch:
    def __init__(self, n_trees=50, max_depth=10, min_samples_split=2, n_features=None):
        self.n_trees = n_trees
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.n_features = n_features
        self.trees = []

    def fit(self, X, y):
        n_features = X.shape[1]
        self.n_features = self.n_features or int(np.sqrt(n_features))
        self.trees = []

        for _ in range(self.n_trees):
            # Bootstrap sample
            boot_idx = np.random.choice(X.shape[0], size=X.shape[0], replace=True)
            X_boot, y_boot = X[boot_idx], y[boot_idx]
            # Build tree with random subspace sampling at each split
            tree = self._build_tree(X_boot, y_boot, depth=0)
            self.trees.append(tree)

    def _build_tree(self, X, y, depth):
        n_samples, n_feats = X.shape
        n_labels = len(np.unique(y))

        if depth >= self.max_depth or n_labels == 1 or n_samples < self.min_samples_split:
            leaf_val = Counter(y).most_common(1)[0][0]
            return Node(value=leaf_val)

        # Randomly choose subset of features without replacement
        feat_indices = np.random.choice(n_feats, size=self.n_features, replace=False)
        best_feat, best_thresh = self._best_split(X, y, feat_indices)
        
        if best_feat is None:
            return Node(value=Counter(y).most_common(1)[0][0])

        left_mask = X[:, best_feat] <= best_thresh
        left = self._build_tree(X[left_mask], y[left_mask], depth + 1)
        right = self._build_tree(X[~left_mask], y[~left_mask], depth + 1)
        return Node(feature=best_feat, threshold=best_thresh, left=left, right=right)

    def _best_split(self, X, y, feat_indices):
        best_gain = -1
        split_feat, split_thresh = None, None
        current_gini = self._gini(y)

        for feat in feat_indices:
            thresholds = np.unique(X[:, feat])
            for thresh in thresholds:
                left_mask = X[:, feat] <= thresh
                if np.sum(left_mask) == 0 or np.sum(~left_mask) == 0:
                    continue
                gain = current_gini - (np.mean(left_mask) * self._gini(y[left_mask]) + 
                                       np.mean(~left_mask) * self._gini(y[~left_mask]))
                if gain > best_gain:
                    best_gain = gain
                    split_feat, split_thresh = feat, thresh
        return split_feat, split_thresh

    def _gini(self, y):
        counts = np.bincount(y)
        probs = counts / len(y)
        return 1.0 - np.sum(probs ** 2)

    def predict(self, X):
        tree_preds = np.array([[self._traverse(x, tree) for tree in self.trees] for x in X])
        return np.array([Counter(row).most_common(1)[0][0] for row in tree_preds])

    def _traverse(self, x, node):
        if node.is_leaf:
            return node.value
        if x[node.feature] <= node.threshold:
            return self._traverse(x, node.left)
        return self._traverse(x, node.right)
`,
      explanation: 'Constructs a forest of unpruned trees where each split randomly samples a subset of features without replacement, computing Gini impurity gains over candidate thresholds.',
    },
    sklearnCode: {
      title: 'Scikit-Learn RandomForestClassifier with Feature Importances',
      code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
import pandas as pd

data = load_breast_cancer()
X, y = data.data, data.target

rf = RandomForestClassifier(
    n_estimators=200,
    max_features='sqrt',       # m = sqrt(p) candidate features per split
    max_depth=12,
    min_samples_leaf=2,
    oob_score=True,
    n_jobs=-1,
    random_state=42
)

rf.fit(X, y)
print(f"OOB Accuracy: {rf.oob_score_:.4f}")

# Extract MDI Feature Importances
importances = pd.Series(rf.feature_importances_, index=data.feature_names)
print("\\nTop 5 Most Important Features (MDI):")
print(importances.sort_values(ascending=False).head(5))
`,
      explanation: 'Uses scikit-learn to configure a production Random Forest, report OOB accuracy, and inspect Gini feature importances.',
    },
    runnableCode: {
      code: `import numpy as np

# Theoretical Ensemble Variance Comparison: Bagging vs Random Forest
def calc_variance(rho, sigma2, B):
    return rho * sigma2 + ((1.0 - rho) / B) * sigma2

B_values = [1, 5, 10, 50, 100, 500]
rho_bag = 0.65       # Standard Bagging (correlated trees)
rho_rf = 0.20        # Random Forest (decorrelated trees)
sigma2 = 1.0

print(f"{'Trees (B)':<10} | {'Bagging Var':<12} | {'Random Forest Var':<18} | {'Variance Reduction':<15}")
print("-" * 65)

for B in B_values:
    v_bag = calc_variance(rho_bag, sigma2, B)
    v_rf = calc_variance(rho_rf, sigma2, B)
    pct_reduction = ((v_bag - v_rf) / v_bag) * 100
    print(f"{B:<10d} | {v_bag:<12.4f} | {v_rf:<18.4f} | {pct_reduction:<15.1f}%")
`,
      expectedOutput: `Trees (B)  | Bagging Var  | Random Forest Var  | Variance Reduction
-----------------------------------------------------------------
1          | 1.0000       | 1.0000             | 0.0            %
5          | 0.7200       | 0.3600             | 50.0           %
10         | 0.6850       | 0.2800             | 59.1           %
50         | 0.6570       | 0.2160             | 67.1           %
100        | 0.6535       | 0.2080             | 68.2           %
500        | 0.6507       | 0.2016             | 69.0           %`,
    },
    lineByLineExplanation: [
      {
        lines: '4-5',
        codeSnippet: 'def calc_variance(rho, sigma2, B):\n    return rho * sigma2 + ((1.0 - rho) / B) * sigma2',
        explanation: 'Implements the fundamental statistical formula for the variance of an average of B correlated estimators.',
      },
      {
        lines: '14-16',
        codeSnippet: 'pct_reduction = ((v_bag - v_rf) / v_bag) * 100\nprint(...)',
        explanation: 'Demonstrates that tree decorrelation (reducing rho from 0.65 to 0.20) provides an asymptotic ~69% reduction in ensemble prediction variance.',
      },
    ],
    hyperparameters: [
      {
        name: 'max_features',
        defaultVal: "'sqrt'",
        range: "['sqrt', 'log2', float, int]",
        effect: 'Controls the number of candidate features evaluated at each split. Smaller values decrease tree correlation but increase individual tree bias.',
        recommendation: "Use 'sqrt' for classification and 0.33 (p/3) for regression as strong empirical baselines.",
      },
      {
        name: 'n_estimators',
        defaultVal: '100',
        range: '50 to 1000+',
        effect: 'Number of trees in the forest. Performance strictly improves or plateaus; never overfits from too many trees.',
        recommendation: 'Use 200-500 trees in production for stable probability estimates.',
      },
      {
        name: 'min_samples_leaf',
        defaultVal: '1',
        range: '1 to 50',
        effect: 'Minimum number of training samples required to be in a leaf node. Higher values smooth the leaf predictions.',
        recommendation: 'Set to 2-5 on noisy datasets to prevent trees from isolating single noisy outliers in leaf nodes.',
      },
    ],
    assumptions: [
      {
        assumption: 'Feature Redundancy and Non-Sparse Features',
        whyItMatters: 'If only 1 feature out of 1,000 contains predictive signal, random feature subsampling will select that feature only 0.1% of the time, causing most splits to be pure noise.',
        howToVerify: 'For extremely sparse data (e.g. TF-IDF text), use linear models or gradient boosting with targeted feature selection rather than Random Forests.',
      },
      {
        assumption: 'Independence of Observations',
        whyItMatters: 'Bootstrap sampling assumes observations are interchangeable. Grouped or time-series data requires GroupKFold or time-based block sampling.',
        howToVerify: 'Inspect metadata for patient IDs, user sessions, or temporal timestamps.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Relying exclusively on Gini Importance (Mean Decrease Impurity) for feature selection.',
        solution: 'MDI is strongly biased toward continuous features and features with high cardinality (many unique categories). Use Permutation Importance or TreeSHAP instead.',
      },
      {
        mistake: 'Tuning max_depth to very small values (e.g. depth=2).',
        solution: 'Random Forests require deep, low-bias trees to achieve variance reduction through averaging. If you want shallow trees, use Gradient Boosting.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Remote Sensing & GIS', application: 'Land Cover Satellite Image Classification', benefit: 'Handles multi-spectral bands with non-linear correlations and missing sensor values with high accuracy.' },
      { industry: 'E-Commerce', application: 'Customer Churn Prediction', benefit: 'Robust baseline that handles mixed categorical and numerical data without requiring extensive feature scaling.' },
      { industry: 'Cybersecurity', application: 'Malware Family Classification', benefit: 'Resilient to noisy feature sets and high dimensionality in executable static analysis.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-6-3-1',
        question: 'Why do Random Forests use m = sqrt(p) instead of m = p at each node split?',
        hint: 'What happens to tree correlation rho when m = p?',
        answer: 'When m = p, every tree considers all features and chooses the same dominant features at upper splits, making trees highly correlated. Setting m = sqrt(p) forces trees to consider diverse alternative features, driving correlation rho down and slashing ensemble variance.',
      },
      {
        id: 'pq-6-3-2',
        question: 'Can a Random Forest overfit if you increase n_estimators from 100 to 1,000?',
        hint: 'Does averaging more models increase model capacity?',
        answer: 'No. Random Forests cannot overfit by adding more trees. As B -> inf, the variance converges to rho * sigma^2. Adding trees only stabilizes predictions; it never increases capacity.',
      },
      {
        id: 'pq-6-3-3',
        question: 'What is the main limitation of Gini Importance (MDI)?',
        hint: 'Think about a random noise feature with 10,000 unique numerical values.',
        answer: 'MDI exhibits high-cardinality bias: features with many unique values or continuous noise provide more opportunities for split points that trivially reduce sample impurity, falsely inflating their importance.',
      },
    ],
    quiz: [
      {
        id: 'q-6-3-1',
        question: 'What is the key structural modification that distinguishes Random Forests from standard Bagged Decision Trees?',
        options: [
          'Random Forests use gradient descent instead of greedy threshold splitting.',
          'Random Forests randomly sample a subset of candidate features at each node split.',
          'Random Forests train trees sequentially rather than in parallel.',
          'Random Forests prune all trees to a maximum depth of 3.',
        ],
        correctIndex: 1,
        explanation: 'The defining innovation of Random Forests (Breiman, 2001) is the Random Subspace method: sampling m features at each node split to decorrelate individual trees.',
      },
      {
        id: 'q-6-3-2',
        question: 'For a dataset with p = 64 features, what is the default number of candidate features evaluated at each split for classification?',
        options: [
          'm = 64 features',
          'm = 32 features',
          'm = 8 features (sqrt(64))',
          'm = 4 features',
        ],
        correctIndex: 2,
        explanation: 'For classification, the default heuristic is m = floor(sqrt(p)) = sqrt(64) = 8 candidate features.',
      },
      {
        id: 'q-6-3-3',
        question: 'If you set max_features=1 in a Random Forest, what is the mathematical consequence?',
        options: [
          'Trees become completely identical.',
          'Trees become completely decorrelated (lowest possible rho), but individual tree bias increases significantly.',
          'The ensemble degenerates into a linear model.',
          'Training becomes 100x slower.',
        ],
        correctIndex: 1,
        explanation: 'Evaluating only 1 random feature per split minimizes tree correlation rho to the absolute extreme, but individual trees are weaker (higher bias), requiring a larger forest.',
      },
    ],
    independentExercise: {
      title: 'Analyze Tree Decorrelation and Feature Importances',
      problem: 'Train a `RandomForestClassifier` on the Wine dataset. Compare the OOB score and top 3 features between `max_features=None` (standard bagging) and `max_features="sqrt"` (Random Forest).',
      hints: ['from sklearn.datasets import load_wine', 'Set oob_score=True on both models', 'Check rf.feature_importances_'],
      starterCode: `from sklearn.datasets import load_wine
from sklearn.ensemble import RandomForestClassifier

data = load_wine()
X, y = data.data, data.target

# TODO: Fit Bagging (max_features=None) vs RF (max_features='sqrt') and compare OOB scores
`,
      solution: `from sklearn.datasets import load_wine
from sklearn.ensemble import RandomForestClassifier
import numpy as np

data = load_wine()
X, y = data.data, data.target

# Standard Bagging (all features considered at every split)
bagging = RandomForestClassifier(n_estimators=150, max_features=None, oob_score=True, random_state=42)
bagging.fit(X, y)

# Random Forest (sqrt(p) features considered at each split)
rf = RandomForestClassifier(n_estimators=150, max_features='sqrt', oob_score=True, random_state=42)
rf.fit(X, y)

print(f"Bagging OOB Accuracy (max_features=p):    {bagging.oob_score_:.4f}")
print(f"Random Forest OOB Accuracy (m=sqrt(p)):  {rf.oob_score_:.4f}")
`,
    },
    summary: {
      keyTakeaways: [
        'Random Forests overcome the tree correlation bottleneck of standard bagging by sampling m = sqrt(p) random features at every split.',
        'Reducing tree correlation rho provides massive variance reduction: Var(RF) ≈ rho * sigma^2 + (1-rho)/B * sigma^2.',
        'Random Forests do not overfit as n_estimators increases, making them one of the most robust off-the-shelf tabular machine learning algorithms.',
      ],
      nextLessonId: 'boosting-fundamentals',
      nextLessonTitle: 'Boosting Fundamentals & Sequential Learning',
      nextLessonModuleId: 'module-6',
    },
  },

  'boosting-fundamentals': {
    id: 'boosting-fundamentals',
    moduleId: 'module-6',
    title: 'Boosting Fundamentals & Sequential Learning',
    subtitle: 'Converting Weak Learners to Strong Learners via Stage-Wise Additive Modeling',
    order: 4,
    readTimeMinutes: 20,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand the philosophical and mathematical shift from parallel Bagging to sequential Boosting.',
      'Formulate Boosting as Stage-Wise Additive Modeling (SAM).',
      'Explain Kearns & Valiant’s PAC learning hypothesis regarding weak vs strong learners.',
      'Contrast how Bagging attacks variance while Boosting attacks bias.',
    ],
    prerequisites: ['ensemble-foundations', 'bagging-bootstrap-aggregating', 'Bias-Variance tradeoff'],
    previousLesson: {
      id: 'random-forests',
      title: 'Random Forests & Tree Decorrelation',
      moduleId: 'module-6',
    },
    analogy: {
      title: 'The Adaptive Exam Preparation Regimen',
      text: 'Consider a student studying for the Medical Licensing Examination. Under Bagging, the student reads 10 random medical textbooks simultaneously and takes their average opinion. Under Boosting, the student takes Practice Exam 1, identifies the exact questions they got wrong (e.g. Cardiology), and spends the next week exclusively studying Cardiology. In Practice Exam 2, they focus on their new errors (e.g. Pharmacology). Each subsequent study session is adaptively targeted at eliminating remaining errors.',
      metaphor: 'Boosting trains learners sequentially, forcing each new learner to specialize in correcting the residual errors of its predecessors.',
    },
    problemSolved: {
      title: 'How to Build High-Accuracy Models from Simple Base Learners',
      description: 'While Bagging requires deep, complex, low-bias base learners to average away variance, Boosting can take simple, high-bias "weak learners" (such as 1-split decision stumps) and combine them into an arbitrarily strong non-linear classifier.',
      keyPoints: [
        'Answers the fundamental Kearns-Valiant question: Can weak learners be converted into a strong learner?',
        'Sequentially targets hard-to-predict instances through sample weights or residual fitting.',
        'Directly minimizes empirical training loss in a stage-wise additive fashion.',
      ],
    },
    intuition: {
      overview: 'Rather than training models independently in parallel, Boosting builds an additive sequence: F_m(x) = F_{m-1}(x) + alpha_m * h_m(x), where each new component h_m(x) addresses the shortcomings of F_{m-1}(x).',
      steps: [
        {
          step: 1,
          title: 'Initialize Base Predictor',
          description: 'Start with a simple constant baseline prediction (e.g. mean of targets or log-odds).',
        },
        {
          step: 2,
          title: 'Compute Residuals / Errors',
          description: 'Identify where the current ensemble fails: compute residual differences or assign higher weights to misclassified points.',
        },
        {
          step: 3,
          title: 'Fit Weak Learner on Errors',
          description: 'Train a new weak learner (e.g., depth-1 decision stump) to predict the residuals or fit weighted data.',
        },
        {
          step: 4,
          title: 'Additive Stage-Wise Update',
          description: 'Scale the new learner by a shrinkage factor and add it to the ensemble; repeat.',
        },
      ],
    },
    mathematics: {
      overview: 'Boosting is fundamentally grounded in Probably Approximately Correct (PAC) learning theory and stage-wise forward additive expansion.',
      foundations: [
        {
          name: 'Stage-Wise Additive Model (SAM)',
          latex: 'F_M(x) = \\sum_{m=1}^M \\alpha_m h_m(x; \\theta_m)',
          explanation: 'where alpha_m is the weight of the m-th learner and h_m(x; theta_m) is a parameterized weak base learner.',
        },
        {
          name: 'Empirical Risk Minimization in Forward Additive Modeling',
          latex: '(\\alpha_m, \\theta_m) = \\arg\\min_{\\alpha, \\theta} \\sum_{i=1}^N L(y_i, F_{m-1}(x_i) + \\alpha h(x_i; \\theta))',
          explanation: 'At each stage m, previously learned learners F_{m-1} are held fixed, solving only for the optimal new learner parameters.',
        },
        {
          name: 'Kearns & Valiant Weak Learning Assumption',
          latex: 'P(h(x) \\neq y) \\le \\frac{1}{2} - \\gamma \\quad \\text{for some } \\gamma > 0',
          explanation: 'A weak learner must perform slightly better than random guessing (gamma > 0). Schapire (1990) proved this implies the existence of an efficient strong PAC learner.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Residual Fitting Under Squared Error Loss',
      objective: 'Show that fitting a base learner to the residuals of the current ensemble is equivalent to greedy stage-wise gradient descent.',
      steps: [
        {
          step: 1,
          label: 'Define Squared Error Loss for Stage m',
          latex: 'L(y_i, F_m(x_i)) = \\frac{1}{2} (y_i - F_m(x_i))^2 = \\frac{1}{2} (y_i - [F_{m-1}(x_i) + h_m(x_i)])^2',
          explanation: 'We seek h_m to minimize the sum of squared differences at stage m.',
        },
        {
          step: 2,
          label: 'Define the residual r_{im}',
          latex: 'r_{im} = y_i - F_{m-1}(x_i)',
          explanation: 'The residual represents the exact error unexplained by the ensemble up to stage m-1.',
        },
        {
          step: 3,
          label: 'Substitute the residual into the loss objective',
          latex: 'L = \\frac{1}{2} (r_{im} - h_m(x_i))^2',
          explanation: 'Minimizing the overall loss at stage m is mathematically identical to fitting h_m directly to target values r_{im} using ordinary least squares!',
        },
      ],
    },
    variables: [
      { symbol: 'F_m(x)', name: 'Ensemble at Stage m', description: 'Cumulative prediction after adding m base estimators', dimensions: 'Function mapping X -> Y' },
      { symbol: 'h_m(x)', name: 'Weak Base Learner', description: 'm-th base estimator fitted to residuals or weighted data', dimensions: 'Function mapping X -> Y' },
      { symbol: '\\alpha_m', name: 'Learner Weight', description: 'Contribution weight assigned to the m-th learner', dimensions: 'Scalar' },
      { symbol: 'r_{im}', name: 'Residual', description: 'Unexplained target difference y_i - F_{m-1}(x_i)', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Trace 2 stages of sequential residual boosting on 3 data points: y = [10.0, 20.0, 30.0].',
      dataset: [
        { x: 1, y: 10.0 },
        { x: 2, y: 20.0 },
        { x: 3, y: 30.0 },
      ],
      calculations: [
        {
          step: 'Stage 0: Initialize with mean prediction',
          math: 'F_0(x) = \\bar{y} = \\frac{10 + 20 + 30}{3}',
          result: 'F_0 = 20.0 everywhere',
        },
        {
          step: 'Compute initial residuals r_{i,1} = y_i - F_0(x_i)',
          math: 'r_1 = [10 - 20, 20 - 20, 30 - 20]',
          result: 'r_1 = [-10.0, 0.0, +10.0]',
        },
        {
          step: 'Stage 1: Fit stump h_1 to residuals with learning rate eta = 0.5',
          math: 'h_1(x) = -10 \\text{ if } x \\le 1.5 \\text{ else } +5.0 \\implies F_1(x) = F_0 + 0.5 h_1',
          result: 'F_1(x=1) = 20 + 0.5(-10) = 15.0; F_1(x=3) = 20 + 0.5(5) = 22.5',
        },
        {
          step: 'Compute new residuals r_{i,2} = y_i - F_1(x_i)',
          math: 'r_2 = [10 - 15.0, 20 - 20.0, 30 - 22.5]',
          result: 'r_2 = [-5.0, 0.0, +7.5] (Errors strictly decreased!)',
        },
      ],
      finalConclusion: 'By fitting successive learners to residuals with shrinkage, overall ensemble error decreases monotonically from MSE = 66.7 to MSE = 27.1.',
    },
    visualExplanation: {
      title: 'Bagging vs Boosting Mechanics',
      description: 'Bagging trains diverse trees independently in parallel, averaging their predictions to reduce variance. Boosting trains trees sequentially in a chain, where each tree explicitly takes the error output of the previous tree as its training target to systematically reduce bias.',
      features: [
        'Bagging Architecture: Embarrassingly parallel, independent data samples, variance reduction.',
        'Boosting Architecture: Sequential feedback loop, weighted/residual targets, bias reduction.',
        'Overfitting Profile: Bagging is immune to tree count overfitting; Boosting can overfit if run for too many stages without shrinkage.',
      ],
    },
    scratchCode: {
      title: 'Simple Residual Booster from Scratch in NumPy',
      code: `import numpy as np
from sklearn.tree import DecisionTreeRegressor

class SimpleResidualBooster:
    def __init__(self, n_estimators=10, learning_rate=0.1, max_depth=1):
        self.n_estimators = n_estimators
        self.learning_rate = learning_rate
        self.max_depth = max_depth
        self.base_pred_ = None
        self.trees_ = []

    def fit(self, X, y):
        # Initialize with baseline mean
        self.base_pred_ = np.mean(y)
        f_current = np.full_like(y, fill_value=self.base_pred_, dtype=float)
        self.trees_ = []

        for m in range(self.n_estimators):
            # Compute residuals
            residuals = y - f_current
            # Fit weak learner to residuals
            tree = DecisionTreeRegressor(max_depth=self.max_depth)
            tree.fit(X, residuals)
            # Update predictions with shrinkage
            f_current += self.learning_rate * tree.predict(X)
            self.trees_.append(tree)
        return self

    def predict(self, X):
        preds = np.full(X.shape[0], fill_value=self.base_pred_, dtype=float)
        for tree in self.trees_:
            preds += self.learning_rate * tree.predict(X)
        return preds
`,
      explanation: 'Initializes with target mean, computes residuals y - F_m-1, fits a decision stump to residuals, and updates predictions with a learning rate.',
    },
    sklearnCode: {
      title: 'AdaBoostRegressor vs GradientBoostingRegressor Baseline',
      code: `from sklearn.ensemble import AdaBoostRegressor, GradientBoostingRegressor
from sklearn.tree import DecisionTreeRegressor

# AdaBoost with Decision Stumps (depth=1)
ada = AdaBoostRegressor(
    estimator=DecisionTreeRegressor(max_depth=1),
    n_estimators=100,
    learning_rate=0.1,
    random_state=42
)

# Gradient Boosting with Decision Trees (depth=3)
gbdt = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)
`,
      explanation: 'Scikit-learn provides AdaBoost and GradientBoosting implementations for stage-wise additive modeling.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate error reduction across boosting rounds on synthetic 1D data
np.random.seed(42)
X = np.linspace(-3, 3, 50)
y = np.sin(X) + np.random.normal(0, 0.1, size=50)

# Boosting rounds simulation
base_val = np.mean(y)
f = np.full_like(y, base_val)
learning_rate = 0.2

print(f"Stage 0 (Mean Baseline) MSE: {np.mean((y - f)**2):.4f}")

for stage in range(1, 11):
    residuals = y - f
    # Simple split at median of residuals to simulate a decision stump
    split_val = np.median(residuals)
    stump_pred = np.where(residuals > split_val, np.mean(residuals[residuals > split_val]), np.mean(residuals[residuals <= split_val]))
    f += learning_rate * stump_pred
    mse = np.mean((y - f)**2)
    print(f"Stage {stage:2d} MSE: {mse:.4f} (Residual Std: {np.std(y - f):.4f})")
`,
      expectedOutput: `Stage 0 (Mean Baseline) MSE: 0.4682
Stage  1 MSE: 0.3957 (Residual Std: 0.6291)
Stage  2 MSE: 0.3444 (Residual Std: 0.5868)
Stage  3 MSE: 0.3073 (Residual Std: 0.5543)
Stage  4 MSE: 0.2797 (Residual Std: 0.5289)
Stage  5 MSE: 0.2587 (Residual Std: 0.5086)
Stage  6 MSE: 0.2421 (Residual Std: 0.4920)
Stage  7 MSE: 0.2287 (Residual Std: 0.4782)
Stage  8 MSE: 0.2175 (Residual Std: 0.4664)
Stage  9 MSE: 0.2079 (Residual Std: 0.4560)
Stage 10 MSE: 0.1996 (Residual Std: 0.4468)`,
    },
    lineByLineExplanation: [
      {
        lines: '10-11',
        codeSnippet: 'base_val = np.mean(y)\nf = np.full_like(y, base_val)',
        explanation: 'Initializes the additive expansion with the optimal zero-order constant prediction.',
      },
      {
        lines: '16-20',
        codeSnippet: 'residuals = y - f\n...\nf += learning_rate * stump_pred',
        explanation: 'Computes residuals at each iteration and increments the cumulative prediction by shrunk weak predictions.',
      },
    ],
    hyperparameters: [
      {
        name: 'learning_rate (eta)',
        defaultVal: '0.1',
        range: '0.001 to 1.0',
        effect: 'Shrinkage factor scaling each tree’s contribution. Lower values require more trees but improve generalization.',
        recommendation: 'Set between 0.01 and 0.1 and tune n_estimators via early stopping.',
      },
      {
        name: 'n_estimators',
        defaultVal: '100',
        range: '50 to 5000+',
        effect: 'Number of boosting stages. Unlike Bagging, excessive n_estimators in Boosting can overfit noisy training sets.',
        recommendation: 'Use early stopping on validation loss to prevent overfitting.',
      },
    ],
    assumptions: [
      {
        assumption: 'Weak Learner Competence (PAC Assumption)',
        whyItMatters: 'Base estimators must consistently perform slightly better than random guessing across all re-weighted distributions.',
        howToVerify: 'Verify that weighted training error of every stage learner is strictly less than 0.5.',
      },
      {
        assumption: 'Low Label Noise',
        whyItMatters: 'Because boosting relentlessly focuses on hardest-to-predict samples, label noise and mislabeled outliers receive massive weights and distort boundaries.',
        howToVerify: 'Clean data beforehand; inspect high-residual samples after early boosting iterations.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using deep, unpruned trees as base learners in Boosting.',
        solution: 'Boosting requires high-bias weak learners (e.g. max_depth=1 to 6). Deep trees overfit on early rounds and leave no residuals for subsequent trees.',
      },
      {
        mistake: 'Setting learning_rate=1.0 without regularization.',
        solution: 'Without shrinkage (learning_rate < 0.2), boosting oscillates and overfits rapidly.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Search Engines', application: 'Webpage Learning-to-Rank (LambdaMART)', benefit: 'Sequentially optimizes document ranking positions based on user click-through residuals.' },
      { industry: 'Insurance', application: 'Actuarial Claim Frequency Modeling', benefit: 'Poisson and Gamma boosted trees model rare, high-severity claim events with high fidelity.' },
      { industry: 'High-Frequency Trading', application: 'Alpha Factor Combination', benefit: 'Sequentially combines hundreds of weak market microstructure signals into a predictive alpha stream.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-6-4-1',
        question: 'Why does Bagging primarily reduce variance, while Boosting primarily reduces bias?',
        hint: 'Consider how individual models are constructed in each paradigm.',
        answer: 'Bagging trains deep, low-bias trees independently and averages them, which directly cancels out uncorrelated variance. Boosting starts with shallow, high-bias weak learners and sequentially fits each new learner to unexplained residuals, directly chipping away at systematic bias.',
      },
      {
        id: 'pq-6-4-2',
        question: 'Can Boosting overfit if you increase n_estimators indefinitely?',
        hint: 'Contrast this with Bagging.',
        answer: 'Yes. Unlike Bagging, Boosting continues to fit remaining residuals until training error reaches zero. On noisy data, it will eventually memorize outliers and noise, degrading validation performance.',
      },
      {
        id: 'pq-6-4-3',
        question: 'What role does shrinkage (learning rate eta) play in boosting?',
        hint: 'Think about gradient step size in optimization.',
        answer: 'Shrinkage slows down learning by scaling each weak learner’s contribution by eta in (0, 1]. This leaves more residual variation for future trees to fit, smoothing the optimization path and substantially improving generalization.',
      },
    ],
    quiz: [
      {
        id: 'q-6-4-1',
        question: 'In Stage-Wise Additive Modeling (SAM), when training the m-th learner, what happens to learners 1 through m-1?',
        options: [
          'They are retrained jointly using backpropagation.',
          'They are held completely fixed with their weights frozen.',
          'They are discarded and replaced by the new learner.',
          'Their weights are decayed exponentially by 0.5.',
        ],
        correctIndex: 1,
        explanation: 'In stage-wise forward modeling, previously learned components F_{m-1} are frozen, and only the new learner h_m and its weight alpha_m are optimized.',
      },
      {
        id: 'q-6-4-2',
        question: 'Under Squared Error Loss, what target does the m-th weak learner fit in Boosting?',
        options: [
          'The original labels y_i.',
          'The residuals r_{im} = y_i - F_{m-1}(x_i).',
          'The moving average of predictions.',
          'The logarithm of the sample probabilities.',
        ],
        correctIndex: 1,
        explanation: 'Under squared error loss, minimizing the stage-wise loss is mathematically identical to fitting the new learner to the residual errors r_{im} = y_i - F_{m-1}(x_i).',
      },
      {
        id: 'q-6-4-3',
        question: 'Why is Boosting especially sensitive to mislabeled training data (label noise)?',
        options: [
          'Because weak learners cannot handle binary classes.',
          'Because boosting repeatedly focuses on hard instances, assigning mislabeled outliers immense weights and distorting boundaries.',
          'Because boosting does not support decision stumps.',
          'Because boosting requires data to follow a Gaussian distribution.',
        ],
        correctIndex: 1,
        explanation: 'Instances that cannot be fitted (like mislabeled points) persistently generate huge residuals, causing boosting to obsess over fitting unlearnable noise.',
      },
    ],
    independentExercise: {
      title: 'Compare Bagging vs Boosting on a High-Bias Problem',
      problem: 'Write a script comparing `RandomForestRegressor` and `GradientBoostingRegressor` on a noisy non-linear function with both models restricted to `max_depth=1` (decision stumps). Observe why stumps fail in RF but succeed in GBDT.',
      hints: ['from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor', 'Fit both with max_depth=1 and n_estimators=100', 'Evaluate R^2 scores'],
      starterCode: `import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

X = np.linspace(0, 10, 200).reshape(-1, 1)
y = np.sin(X).ravel() + 0.1 * np.random.randn(200)

# TODO: Compare RF vs GBDT with max_depth=1
`,
      solution: `import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

np.random.seed(42)
X = np.linspace(0, 10, 200).reshape(-1, 1)
y = np.sin(X).ravel() + 0.1 * np.random.randn(200)

# Random Forest with depth 1 stumps (averaging high bias stumps remains high bias!)
rf_stumps = RandomForestRegressor(n_estimators=100, max_depth=1, random_state=42).fit(X, y)

# Gradient Boosting with depth 1 stumps (additive stumps sequentially approximate non-linear curves!)
gb_stumps = GradientBoostingRegressor(n_estimators=100, max_depth=1, learning_rate=0.1, random_state=42).fit(X, y)

print(f"Random Forest (stumps) R^2:      {rf_stumps.score(X, y):.4f} (Failed - high bias!)")
print(f"Gradient Boosting (stumps) R^2:  {gb_stumps.score(X, y):.4f} (Success - sequential bias reduction!)")
`,
    },
    summary: {
      keyTakeaways: [
        'Boosting is a sequential ensemble method that converts weak learners into strong learners by fitting residual errors stage by stage.',
        'Unlike Bagging which parallelizes variance reduction, Boosting is inherently sequential and specializes in bias reduction.',
        'Shrinkage (learning rate) is essential in boosting to prevent premature overfitting and ensure smooth convergence.',
      ],
      nextLessonId: 'adaboost',
      nextLessonTitle: 'AdaBoost: Adaptive Boosting & Exponential Loss',
      nextLessonModuleId: 'module-6',
    },
  },

  'adaboost': {
    id: 'adaboost',
    moduleId: 'module-6',
    title: 'AdaBoost: Adaptive Boosting & Exponential Loss',
    subtitle: 'Sample Weight Dynamics, Learner Competence Alpha & Exponential Loss Minimization',
    order: 5,
    readTimeMinutes: 25,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand the complete algorithmic workflow of AdaBoost.M1 (Freund & Schapire).',
      'Derive the formula for learner weight alpha_t from exponential loss minimization.',
      'Trace sample weight updates and normalizations across successive boosting rounds.',
      'Implement AdaBoost from scratch in NumPy with verification against scikit-learn.',
    ],
    prerequisites: ['boosting-fundamentals', 'Decision Trees', 'Calculus optimization'],
    previousLesson: {
      id: 'boosting-fundamentals',
      title: 'Boosting Fundamentals & Sequential Learning',
      moduleId: 'module-6',
    },
    analogy: {
      title: 'The Strict Socratic Tutor',
      text: 'Imagine a tutor testing a student on 100 historical dates. In round 1, all questions carry equal importance (1 point each). The student misses 15 questions. In round 2, the tutor increases the point value of those 15 missed questions by 5x, while decreasing the point value of the 85 correctly answered questions. If the tutor is an expert, the student’s overall final exam score is a weighted vote where the tutor’s most reliable quizzes count the most.',
      metaphor: 'AdaBoost adaptively increases the weights of misclassified instances and scales each weak learner by its log-odds accuracy.',
    },
    problemSolved: {
      title: 'Optimal Weighting Under Binary Classification',
      description: 'AdaBoost provides an exact closed-form solution for both sample re-weighting and learner voting weights, provably minimizing exponential loss.',
      keyPoints: [
        'Derives closed-form stage-wise weights alpha_t without requiring line search.',
        'Exponentially upweights misclassified samples, forcing next stumps to pivot.',
        'Upper-bounds training error: training error drops exponentially with ensemble size.',
      ],
    },
    intuition: {
      overview: 'Every sample starts with equal weight w_i = 1/N. At each round, fit a weak learner, measure its weighted error rate epsilon_t, assign it a voting weight alpha_t, and multiply misclassified sample weights by exp(alpha_t).',
      steps: [
        {
          step: 1,
          title: 'Initialize Uniform Weights',
          description: 'Set initial sample weights w_i^(1) = 1/N for i = 1, ..., N.',
        },
        {
          step: 2,
          title: 'Train Weak Learner on Weighted Distribution',
          description: 'Fit h_t(x) in {-1, +1} to minimize weighted classification error epsilon_t.',
        },
        {
          step: 3,
          title: 'Compute Learner Weight alpha_t',
          description: 'Calculate alpha_t = 0.5 * ln((1 - epsilon_t) / epsilon_t).',
        },
        {
          step: 4,
          title: 'Update and Normalize Sample Weights',
          description: 'Set w_i^(t+1) = w_i^(t) * exp(-alpha_t * y_i * h_t(x_i)) / Z_t.',
        },
      ],
    },
    mathematics: {
      overview: 'AdaBoost is mathematically equivalent to coordinate descent minimizing the exponential loss L(y, F(x)) = exp(-y F(x)).',
      foundations: [
        {
          name: 'Weighted Error Rate of Weak Learner',
          latex: '\\epsilon_t = \\frac{\\sum_{i: y_i \\neq h_t(x_i)} w_i^{(t)}}{\\sum_{i=1}^N w_i^{(t)}}',
          explanation: 'Fraction of total sample weight assigned to instances misclassified by weak learner h_t.',
        },
        {
          name: 'Learner Voting Weight (Alpha)',
          latex: '\\alpha_t = \\frac{1}{2} \\ln \\left( \\frac{1 - \\epsilon_t}{\\epsilon_t} \\right)',
          explanation: 'Log-odds of learner competence. If epsilon = 0.5 (random guess), alpha = 0. If epsilon -> 0, alpha -> +inf.',
        },
        {
          name: 'Sample Weight Update Rule',
          latex: 'w_i^{(t+1)} = \\frac{w_i^{(t)} \\exp\\left(-\\alpha_t y_i h_t(x_i)\\right)}{Z_t}',
          explanation: 'where y_i in {-1, +1}. If correct, y_i h_t(x_i) = +1 (weight shrinks by exp(-alpha)). If incorrect, y_i h_t(x_i) = -1 (weight expands by exp(+alpha)).',
        },
        {
          name: 'Normalization Constant Z_t',
          latex: 'Z_t = \\sum_{i=1}^N w_i^{(t)} \\exp\\left(-\\alpha_t y_i h_t(x_i)\\right) = 2 \\sqrt{\\epsilon_t (1 - \\epsilon_t)}',
          explanation: 'Guarantees that updated weights sum to 1.0, forming a valid probability distribution.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Learner Weight alpha_t from Exponential Loss',
      objective: 'Prove that alpha_t = 0.5 * ln((1 - epsilon_t) / epsilon_t) is the exact analytical minimizer of exponential loss.',
      steps: [
        {
          step: 1,
          label: 'Express the exponential loss objective at stage t',
          latex: 'L(\\alpha_t) = \\sum_{i=1}^N \\exp\\left( -y_i [F_{t-1}(x_i) + \\alpha_t h_t(x_i)] \\right) = \\sum_{i=1}^N w_i^{(t)} \\exp(-y_i \\alpha_t h_t(x_i))',
          explanation: 'We absorb the cumulative prediction up to stage t-1 into the sample weights w_i^(t).',
        },
        {
          step: 2,
          label: 'Split the sum into correct and incorrect classifications',
          latex: 'L(\\alpha_t) = \\sum_{y_i = h_t(x_i)} w_i^{(t)} e^{-\\alpha_t} + \\sum_{y_i \\neq h_t(x_i)} w_i^{(t)} e^{+\\alpha_t}',
          explanation: 'For correct predictions y_i h_t(x_i) = 1; for errors y_i h_t(x_i) = -1.',
        },
        {
          step: 3,
          label: 'Substitute the weighted error rate epsilon_t',
          latex: 'L(\\alpha_t) = (1 - \\epsilon_t) e^{-\\alpha_t} + \\epsilon_t e^{+\\alpha_t}',
          explanation: 'Assuming weights are normalized such that sum w_i = 1.',
        },
        {
          step: 4,
          label: 'Take derivative with respect to alpha_t and set to zero',
          latex: '\\frac{d L}{d \\alpha_t} = -(1 - \\epsilon_t) e^{-\\alpha_t} + \\epsilon_t e^{+\\alpha_t} = 0',
          explanation: 'Set the first-order condition for unconstrained convex optimization.',
        },
        {
          step: 5,
          label: 'Solve algebraically for alpha_t',
          latex: 'e^{2 \\alpha_t} = \\frac{1 - \\epsilon_t}{\\epsilon_t} \\implies \\alpha_t = \\frac{1}{2} \\ln \\left( \\frac{1 - \\epsilon_t}{\\epsilon_t} \\right)',
          explanation: 'This proves that the AdaBoost alpha formula is the exact global minimizer of exponential loss.',
        },
      ],
    },
    variables: [
      { symbol: 'w_i^{(t)}', name: 'Sample Weight', description: 'Weight of the i-th training sample at boosting round t', dimensions: 'Scalar >= 0' },
      { symbol: '\\epsilon_t', name: 'Weighted Error Rate', description: 'Weighted fraction of mistakes made by weak learner h_t', dimensions: 'Scalar in [0, 1]' },
      { symbol: '\\alpha_t', name: 'Learner Weight', description: 'Voting power assigned to weak learner h_t in the final ensemble', dimensions: 'Scalar' },
      { symbol: 'Z_t', name: 'Normalization Factor', description: 'Partition function ensuring sample weights sum to 1', dimensions: 'Scalar > 0' },
    ],
    numericalExample: {
      scenario: 'Trace Round 1 of AdaBoost on 4 samples with labels y = [+1, +1, -1, -1] and initial uniform weights.',
      dataset: [
        { id: 1, y: '+1', pred: '+1', status: 'Correct' },
        { id: 2, y: '+1', pred: '+1', status: 'Correct' },
        { id: 3, y: '-1', pred: '+1', status: 'INCORRECT' },
        { id: 4, y: '-1', pred: '-1', status: 'Correct' },
      ],
      calculations: [
        {
          step: 'Compute initial uniform weights',
          math: 'w_i^{(1)} = \\frac{1}{4} = 0.25 \\text{ for all } i \\in \\{1, 2, 3, 4\\}',
          result: 'w = [0.25, 0.25, 0.25, 0.25]',
        },
        {
          step: 'Compute weighted error epsilon_1',
          math: '\\epsilon_1 = \\sum_{i \\in \\text{errors}} w_i = w_3 = 0.25',
          result: 'epsilon_1 = 0.25 (25% error)',
        },
        {
          step: 'Compute learner weight alpha_1',
          math: '\\alpha_1 = \\frac{1}{2} \\ln\\left(\\frac{1 - 0.25}{0.25}\\right) = \\frac{1}{2} \\ln(3.0) = \\frac{1}{2} (1.0986)',
          result: 'alpha_1 = 0.5493',
        },
        {
          step: 'Compute unnormalized new weights',
          math: 'e^{-\\alpha} = e^{-0.5493} = 0.5774; \\quad e^{+\\alpha} = e^{+0.5493} = 1.7321',
          result: 'w_correct = 0.25 * 0.5774 = 0.1443; w_error = 0.25 * 1.7321 = 0.4330',
        },
        {
          step: 'Compute normalization Z_1 and final weights',
          math: 'Z_1 = 3(0.1443) + 0.4330 = 0.8660 \\implies w_3^{(2)} = \\frac{0.4330}{0.8660} = 0.500',
          result: 'w^(2) = [0.1667, 0.1667, 0.5000, 0.1667] (Error now holds 50% of total weight!)',
        },
      ],
      finalConclusion: 'The misclassified sample’s weight doubled from 0.25 to 0.50, forcing learner 2 to focus on classifying sample 3 correctly.',
    },
    visualExplanation: {
      title: 'Sample Weight Bubble Dynamics',
      description: 'Each data point is represented as a bubble whose diameter is proportional to its current sample weight w_i. Misclassified points inflate like balloons, while correctly classified points shrink. In the next round, the decision stump is pulled gravitationally towards the inflated bubbles.',
      features: [
        'Round 1: All points have identical bubble sizes (uniform 1/N).',
        'Round 2: Misclassified outliers expand dramatically, dominating the loss.',
        'Final Boundary: Linear combination of simple decision lines creates complex non-linear polygonal boundaries.',
      ],
    },
    scratchCode: {
      title: 'AdaBoost.M1 from Scratch in NumPy',
      code: `import numpy as np

class DecisionStump:
    def __init__(self):
        self.polarity = 1
        self.feature_idx = None
        self.threshold = None
        self.alpha = None

    def predict(self, X):
        n_samples = X.shape[0]
        X_column = X[:, self.feature_idx]
        predictions = np.ones(n_samples)
        if self.polarity == 1:
            predictions[X_column < self.threshold] = -1
        else:
            predictions[X_column > self.threshold] = -1
        return predictions

class AdaBoostClassifierScratch:
    def __init__(self, n_estimators=50):
        self.n_estimators = n_estimators
        self.estimators_ = []

    def fit(self, X, y):
        # Expects y in {-1, +1}
        n_samples, n_features = X.shape
        w = np.full(n_samples, 1.0 / n_samples)
        self.estimators_ = []

        for _ in range(self.n_estimators):
            stump = DecisionStump()
            min_error = float('inf')

            # Greedy search for best split under weighted data
            for feat_i in range(n_features):
                thresholds = np.unique(X[:, feat_i])
                for thresh in thresholds:
                    for polarity in [1, -1]:
                        preds = np.ones(n_samples)
                        if polarity == 1:
                            preds[X[:, feat_i] < thresh] = -1
                        else:
                            preds[X[:, feat_i] > thresh] = -1

                        # Weighted error
                        error = np.sum(w[y != preds])
                        if error < min_error:
                            min_error = error
                            stump.polarity = polarity
                            stump.threshold = thresh
                            stump.feature_idx = feat_i

            # Avoid division by zero
            EPS = 1e-10
            min_error = np.clip(min_error, EPS, 1.0 - EPS)

            # Compute learner weight alpha
            stump.alpha = 0.5 * np.log((1.0 - min_error) / min_error)

            # Update sample weights
            predictions = stump.predict(X)
            w *= np.exp(-stump.alpha * y * predictions)
            w /= np.sum(w)  # Normalize to sum to 1

            self.estimators_.append(stump)
        return self

    def predict(self, X):
        stump_preds = [stump.alpha * stump.predict(X) for stump in self.estimators_]
        return np.sign(np.sum(stump_preds, axis=0))
`,
      explanation: 'Exhaustively searches for the lowest weighted-error decision stump, calculates alpha, updates weights using exp(-alpha*y*pred), normalizes, and votes using sign(sum(alpha * h(x))).',
    },
    sklearnCode: {
      title: 'Scikit-Learn AdaBoostClassifier Usage',
      code: `from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_moons

X, y = make_moons(n_samples=300, noise=0.25, random_state=42)

# AdaBoost using Decision Stumps (depth=1)
ada = AdaBoostClassifier(
    estimator=DecisionTreeClassifier(max_depth=1),
    n_estimators=50,
    learning_rate=1.0,
    algorithm='SAMME',
    random_state=42
)

ada.fit(X, y)
print(f"AdaBoost Accuracy on Moons: {ada.score(X, y):.4f}")
print(f"First 5 Learner Weights (alphas):\\n{ada.estimator_weights_[:5]}")
`,
      explanation: 'Scikit-learn implements AdaBoost with the SAMME algorithm, supporting multiclass problems and exposing estimator_weights_.',
    },
    runnableCode: {
      code: `import numpy as np

# Trace AdaBoost weight update and alpha formulas
epsilon = 0.25  # 25% weighted error
alpha = 0.5 * np.log((1.0 - epsilon) / epsilon)
print(f"Weighted Error epsilon:   {epsilon:.4f}")
print(f"Learner Weight alpha:     {alpha:.4f}")

# Sample weights
w_init = np.array([0.25, 0.25, 0.25, 0.25])
y = np.array([1, 1, -1, -1])
pred = np.array([1, 1, 1, -1])  # sample 3 misclassified

# Update unnormalized weights
correct_mask = (y == pred)
w_unnorm = w_init.copy()
w_unnorm[correct_mask] *= np.exp(-alpha)
w_unnorm[~correct_mask] *= np.exp(+alpha)

Z = np.sum(w_unnorm)
w_final = w_unnorm / Z

print(f"Normalization Factor Z:   {Z:.4f}")
print(f"Theoretical Z (2*sqrt(eps*(1-eps))): {2 * np.sqrt(epsilon * (1 - epsilon)):.4f}")
print(f"Updated Normalized Weights: {np.round(w_final, 4)}")
print(f"Sum of Weights:           {np.sum(w_final):.4f}")
`,
      expectedOutput: `Weighted Error epsilon:   0.2500
Learner Weight alpha:     0.5493
Normalization Factor Z:   0.8660
Theoretical Z (2*sqrt(eps*(1-eps))): 0.8660
Updated Normalized Weights: [0.1667 0.1667 0.5    0.1667]
Sum of Weights:           1.0000`,
    },
    lineByLineExplanation: [
      {
        lines: '4-5',
        codeSnippet: 'alpha = 0.5 * np.log((1.0 - epsilon) / epsilon)',
        explanation: 'Computes the optimal analytical learner competence alpha from weighted error epsilon.',
      },
      {
        lines: '15-19',
        codeSnippet: 'w_unnorm[correct_mask] *= np.exp(-alpha)\nw_unnorm[~correct_mask] *= np.exp(+alpha)\nZ = np.sum(w_unnorm)\nw_final = w_unnorm / Z',
        explanation: 'Multiplies correct samples by exp(-alpha) and misclassified samples by exp(+alpha), then normalizes by Z.',
      },
    ],
    hyperparameters: [
      {
        name: 'learning_rate',
        defaultVal: '1.0',
        range: '0.01 to 1.0',
        effect: 'Shrinks the contribution of each weak learner alpha_t by learning_rate. Reduces risk of overfitting.',
        recommendation: 'Reduce from 1.0 to 0.1-0.2 and increase n_estimators for better generalization.',
      },
      {
        name: 'estimator (base_estimator)',
        defaultVal: 'DecisionTreeClassifier(max_depth=1)',
        range: 'Any classifier supporting sample_weight',
        effect: 'Weak learner family. Depth-1 stumps provide standard classic AdaBoost behavior.',
        recommendation: 'Use depth=1 or depth=2 stumps; deeper trees will overfit rapidly.',
      },
    ],
    assumptions: [
      {
        assumption: 'Clean Labels Without Extreme Outliers',
        whyItMatters: 'AdaBoost assigns exponentially growing weights to misclassified points. A single mislabeled point will quickly acquire a weight approaching 1.0, dominating the model.',
        howToVerify: 'Inspect high-loss points; prefer Gradient Boosting with Huber loss if heavy label noise is present.',
      },
      {
        assumption: 'Base Estimators Achieve epsilon < 0.5',
        whyItMatters: 'If weighted error reaches or exceeds 0.5, alpha becomes <= 0 and training terminates prematurely.',
        howToVerify: 'Ensure base learner hypothesis class has sufficient capacity to split weighted data.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Applying AdaBoost on datasets with noisy or flipped labels.',
        solution: 'Exponential loss is non-robust to outliers. Switch to GBDT with Log-loss or Robust Huber loss.',
      },
      {
        mistake: 'Forgetting to encode labels as {-1, +1} when writing scratch implementations.',
        solution: 'AdaBoost mathematics relies on y * h(x) in {-1, +1}. If using {0, 1}, the algebra fails.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Computer Vision', application: 'Viola-Jones Real-Time Face Detection', benefit: 'Cascaded AdaBoost of Haar-like features pioneered real-time digital camera face detection in 2001.' },
      { industry: 'Biometrics', application: 'Fingerprint Spoof Detection', benefit: 'Combines simple textural ridge descriptors into an ultra-fast edge verification classifier.' },
      { industry: 'Vehicle Safety', application: 'Pedestrian Crossing Detection', benefit: 'Fast evaluation of simple pixel intensity differences enables high-framerate embedded processing.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-6-5-1',
        question: 'What is the value of alpha_t if a weak learner achieves an error rate of epsilon_t = 0.50 (pure random chance)?',
        hint: 'Evaluate ln((1 - 0.5) / 0.5).',
        answer: 'alpha_t = 0.5 * ln(0.5 / 0.5) = 0.5 * ln(1) = 0. A random learner receives zero voting weight in the final ensemble.',
      },
      {
        id: 'pq-6-5-2',
        question: 'Why does the normalizer Z_t equal 2 * sqrt(epsilon_t * (1 - epsilon_t))?',
        hint: 'Substitute alpha_t = 0.5 * ln((1 - eps)/eps) into (1 - eps)*e^(-alpha) + eps*e^(+alpha).',
        answer: 'Because e^(-alpha) = sqrt(eps / (1 - eps)) and e^(+alpha) = sqrt((1 - eps) / eps). Multiplying by (1 - eps) and eps respectively yields sqrt(eps*(1 - eps)) + sqrt(eps*(1 - eps)) = 2*sqrt(eps*(1 - eps)).',
      },
      {
        id: 'pq-6-5-3',
        question: 'Why is AdaBoost rarely used for noisy tabular datasets today compared to XGBoost/LightGBM?',
        hint: 'Consider the loss function: exponential loss vs logistic loss.',
        answer: 'Exponential loss penalizes negative margins exp(-y*F) exponentially, making it catastrophically sensitive to outliers and label noise. Logistic and Huber loss in GBDT penalize errors much more gracefully.',
      },
    ],
    quiz: [
      {
        id: 'q-6-5-1',
        question: 'What loss function is AdaBoost mathematically minimizing?',
        options: [
          'Mean Squared Error: (y - F(x))^2',
          'Exponential Loss: exp(-y * F(x))',
          'Hinge Loss: max(0, 1 - y * F(x))',
          'Cross-Entropy Loss: -log(p)',
        ],
        correctIndex: 1,
        explanation: 'Friedman, Hastie, and Tibshirani (2000) proved that AdaBoost is an exact stage-wise forward additive model minimizing exponential loss.',
      },
      {
        id: 'q-6-5-2',
        question: 'If a weak learner achieves an error rate of epsilon = 0.10, what is its voting weight alpha?',
        options: [
          'alpha ≈ 0.1000',
          'alpha ≈ 1.0986',
          'alpha ≈ 2.1972',
          'alpha ≈ 0.5493',
        ],
        correctIndex: 1,
        explanation: 'alpha = 0.5 * ln((1 - 0.10) / 0.10) = 0.5 * ln(0.90 / 0.10) = 0.5 * ln(9.0) = 0.5 * 2.1972 ≈ 1.0986.',
      },
      {
        id: 'q-6-5-3',
        question: 'What happens to the total weight of misclassified samples versus correctly classified samples immediately after the weight update and normalization?',
        options: [
          'Misclassified samples always receive exactly 50% of the total weight, and correctly classified samples receive 50%.',
          'Misclassified samples receive 90% of the weight.',
          'Correctly classified samples receive 100% of the weight.',
          'The weight distribution remains unchanged.',
        ],
        correctIndex: 0,
        explanation: 'Immediately after the update, the total weight of incorrect samples is eps * exp(alpha)/Z = 0.5, meaning errors and correct instances each make up exactly 50% of the new distribution.',
      },
    ],
    independentExercise: {
      title: 'Verify Weight Equalization in AdaBoost Round 1',
      problem: 'Write a Python snippet with a toy dataset of 6 samples and a decision stump making 2 errors. Calculate alpha, update weights, normalize, and verify that the sum of weights on the 2 error samples equals exactly 0.5000.',
      hints: ['Set initial weights w = 1/6', 'Error rate epsilon = 2/6 = 1/3', 'Check sum of weights for error indices after dividing by Z'],
      starterCode: `import numpy as np

# 6 samples: indices 0, 1 are errors; 2, 3, 4, 5 are correct
w = np.full(6, 1.0 / 6.0)
eps = 2.0 / 6.0

# TODO: Compute alpha, update weights, normalize, and check sum of error weights
`,
      solution: `import numpy as np

w = np.full(6, 1.0 / 6.0)
eps = 2.0 / 6.0  # 1/3

alpha = 0.5 * np.log((1.0 - eps) / eps)

# Errors at indices 0, 1
w_unnorm = w.copy()
w_unnorm[:2] *= np.exp(alpha)
w_unnorm[2:] *= np.exp(-alpha)

Z = np.sum(w_unnorm)
w_norm = w_unnorm / Z

sum_error_weights = np.sum(w_norm[:2])
sum_correct_weights = np.sum(w_norm[2:])

print(f"Learner alpha:            {alpha:.4f}")
print(f"Sum of Error Weights:     {sum_error_weights:.4f} (Exactly 50%!)")
print(f"Sum of Correct Weights:   {sum_correct_weights:.4f} (Exactly 50%!)")
`,
    },
    summary: {
      keyTakeaways: [
        'AdaBoost adaptively balances sample weights, forcing subsequent weak learners to specialize on previous mistakes.',
        'Learner voting weights alpha_t reflect log-odds competence, giving more accurate classifiers higher influence.',
        'AdaBoost provably minimizes exponential loss, but its extreme sensitivity to label noise makes modern GBDT preferable for most tabular tasks.',
      ],
      nextLessonId: 'gradient-boosting',
      nextLessonTitle: 'Gradient Boosted Decision Trees (GBDT)',
      nextLessonModuleId: 'module-6',
    },
  },

  'gradient-boosting': {
    id: 'gradient-boosting',
    moduleId: 'module-6',
    title: 'Gradient Boosted Decision Trees (GBDT)',
    subtitle: 'Functional Gradient Descent, Pseudo-Residuals & Terminal Leaf Optimization',
    order: 6,
    readTimeMinutes: 28,
    difficulty: 'Advanced',
    visualizerType: 'gradient-descent',
    objectives: [
      'Master the formulation of Gradient Boosting as Gradient Descent in Function Space (Friedman, 2001).',
      'Derive pseudo-residuals as negative gradients for arbitrary differentiable loss functions.',
      'Explain the difference between finding the tree split structure and computing optimal terminal leaf values gamma_jm.',
      'Implement a complete Gradient Boosting Regressor from scratch in NumPy.',
    ],
    prerequisites: ['adaboost', 'Derivatives & Gradients', 'Decision Trees'],
    previousLesson: {
      id: 'adaboost',
      title: 'AdaBoost: Adaptive Boosting & Exponential Loss',
      moduleId: 'module-6',
    },
    analogy: {
      title: 'The Master Sculptor and Apprentice',
      text: 'A master sculptor wants to carve a statue from marble. First, the master cuts a rough rectangular block that approximates the general height and width of the figure (base prediction F_0). Then, an apprentice steps in with a coarse chisel to knock off the largest protruding chunks of stone (pseudo-residuals). Another apprentice follows with a medium chisel, refining the contours. Finally, a finishing apprentice uses fine sandpaper to polish the surface. Each worker removes only the remaining imperfections left by the previous worker.',
      metaphor: 'GBDT uses trees to carve away the negative gradient (imperfections) of arbitrary loss functions stage by stage.',
    },
    problemSolved: {
      title: 'Generalizing Boosting Beyond Exponential Loss',
      description: 'While AdaBoost was strictly tied to binary classification and exponential loss, Jerome Friedman’s Gradient Boosting Machine (GBM) unified boosting under functional gradient descent, enabling any differentiable loss function (MSE, MAE, Huber, Log-loss, Poisson, Quantile) to be optimized with decision trees.',
      keyPoints: [
        'Optimizes arbitrary user-specified differentiable objective functions.',
        'Pseudo-residuals serve as universal direction vectors in function space.',
        'Shrinkage rate (eta) guarantees smooth convergence and robust generalization.',
      ],
    },
    intuition: {
      overview: 'In standard gradient descent, we update model parameter vectors along the negative gradient: theta_new = theta_old - eta * grad_theta(L). In Gradient Boosting, we update function predictions along the negative gradient of the loss with respect to predictions: F_m(x) = F_{m-1}(x) + eta * h_m(x).',
      steps: [
        {
          step: 1,
          title: 'Constant Initialization',
          description: 'Initialize F_0(x) with the constant value that minimizes the global loss across the training targets.',
        },
        {
          step: 2,
          title: 'Compute Pseudo-Residuals',
          description: 'Calculate the negative gradient r_{im} = -[d L(y_i, F(x_i)) / d F(x_i)] evaluated at F = F_{m-1}.',
        },
        {
          step: 3,
          title: 'Fit Tree to Gradients',
          description: 'Train a regression tree h_m(x) to predict pseudo-residuals r_{im}, creating leaf terminal regions R_{jm}.',
        },
        {
          step: 4,
          title: 'Optimize Leaf Values & Shrink',
          description: 'Compute the optimal step gamma_{jm} for each leaf region, and update: F_m(x) = F_{m-1}(x) + eta * sum_j gamma_{jm} I(x in R_{jm}).',
        },
      ],
    },
    mathematics: {
      overview: 'Friedman showed that pseudo-residuals represent the steepest descent direction in an N-dimensional function space evaluated at the training points.',
      foundations: [
        {
          name: 'Functional Gradient (Pseudo-Residual)',
          latex: 'r_{im} = -\\left[ \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\right]_{F(x) = F_{m-1}(x)}',
          explanation: 'Negative derivative of the loss function with respect to the current ensemble prediction.',
        },
        {
          name: 'Squared Error Loss Pseudo-Residual',
          latex: 'L(y, F) = \\frac{1}{2}(y - F)^2 \\implies r_{im} = -(-(y_i - F_{m-1}(x_i))) = y_i - F_{m-1}(x_i)',
          explanation: 'For squared error, the pseudo-residual is exactly the standard arithmetic residual.',
        },
        {
          name: 'Binary Cross-Entropy (Log-Loss) Pseudo-Residual',
          latex: 'L(y, F) = -[y \\ln(p) + (1-y)\\ln(1-p)], \\quad p = \\sigma(F) \\implies r_{im} = y_i - p_i',
          explanation: 'where p_i = 1 / (1 + exp(-F_{m-1}(x_i))). The pseudo-residual is the difference between observed label y in {0, 1} and predicted probability p_i!',
        },
        {
          name: 'Optimal Leaf Step Size (Gamma)',
          latex: '\\gamma_{jm} = \\arg\\min_\\gamma \\sum_{x_i \\in R_{jm}} L(y_i, F_{m-1}(x_i) + \\gamma)',
          explanation: 'Once the tree structure defines the disjoint regions R_{jm}, we solve a 1D optimization problem for the optimal leaf prediction.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Log-Loss Pseudo-Residual and Leaf Value',
      objective: 'Prove that the gradient of binary cross-entropy with respect to log-odds F is r_i = y_i - p_i, and derive the Newton-Raphson leaf update.',
      steps: [
        {
          step: 1,
          label: 'Express Log-Loss in terms of log-odds F',
          latex: 'L(y, F) = -y \\ln(\\sigma(F)) - (1 - y) \\ln(1 - \\sigma(F)) = -y F + \\ln(1 + e^F)',
          explanation: 'Using the algebraic identities ln(sigma(F)) = F - ln(1 + e^F) and ln(1 - sigma(F)) = -ln(1 + e^F).',
        },
        {
          step: 2,
          label: 'Differentiate with respect to F',
          latex: '\\frac{\\partial L}{\\partial F} = -y + \\frac{e^F}{1 + e^F} = -y + \\sigma(F) = p - y',
          explanation: 'The derivative of ln(1 + e^F) is e^F / (1 + e^F) = sigma(F) = p.',
        },
        {
          step: 3,
          label: 'Formulate the negative gradient (pseudo-residual)',
          latex: 'r_i = -\\frac{\\partial L}{\\partial F} = -(p_i - y_i) = y_i - p_i',
          explanation: 'The direction of steepest descent is observed target y_i minus predicted probability p_i.',
        },
        {
          step: 4,
          label: 'Derive the Newton-Raphson leaf approximation gamma_{jm}',
          latex: '\\gamma_{jm} \\approx \\frac{\\sum_{x_i \\in R_{jm}} r_i}{\\sum_{x_i \\in R_{jm}} p_i(1 - p_i)}',
          explanation: 'Taking a 1-step second-order Taylor expansion yields numerator = sum of first derivatives (residuals) and denominator = sum of second derivatives (Hessian p*(1-p)).',
        },
      ],
    },
    variables: [
      { symbol: 'F_{m-1}(x)', name: 'Current Ensemble Model', description: 'Ensemble prediction up to iteration m-1', dimensions: 'Function X -> R' },
      { symbol: 'r_{im}', name: 'Pseudo-Residual', description: 'Negative gradient of loss evaluated for instance i at stage m', dimensions: 'Scalar' },
      { symbol: 'R_{jm}', name: 'Terminal Leaf Region', description: 'Disjoint partition of feature space defined by leaf j of tree m', dimensions: 'Subspace of X' },
      { symbol: '\\gamma_{jm}', name: 'Terminal Leaf Value', description: 'Optimal prediction assigned to instances landing in leaf j', dimensions: 'Scalar' },
      { symbol: '\\eta', name: 'Learning Rate (Shrinkage)', description: 'Step size regularizer scaling the leaf values', dimensions: 'Scalar in (0, 1]' },
    ],
    numericalExample: {
      scenario: 'Trace Round 1 of GBDT Regression on 3 points: targets y = [10.0, 20.0, 30.0] with learning rate eta = 0.1.',
      dataset: [
        { id: 1, x: 1.0, y: 10.0 },
        { id: 2, x: 2.0, y: 20.0 },
        { id: 3, x: 3.0, y: 30.0 },
      ],
      calculations: [
        {
          step: 'Step 1: Compute constant initialization F_0',
          math: 'F_0 = \\arg\\min_c \\sum (y_i - c)^2 = \\bar{y} = \\frac{10 + 20 + 30}{3} = 20.0',
          result: 'F_0(x) = 20.0 everywhere',
        },
        {
          step: 'Step 2: Compute pseudo-residuals r_{i,1} = y_i - F_0',
          math: 'r_1 = 10 - 20 = -10.0; \\quad r_2 = 20 - 20 = 0.0; \\quad r_3 = 30 - 20 = +10.0',
          result: 'r = [-10.0, 0.0, +10.0]',
        },
        {
          step: 'Step 3: Fit tree with split at x <= 1.5',
          math: 'R_{1,1} = \\{x_1\\} \\implies \\gamma_{1,1} = -10.0; \\quad R_{2,1} = \\{x_2, x_3\\} \\implies \\gamma_{2,1} = \\frac{0 + 10}{2} = +5.0',
          result: 'Leaf 1: -10.0; Leaf 2: +5.0',
        },
        {
          step: 'Step 4: Update model with shrinkage eta = 0.1',
          math: 'F_1(x_1) = 20.0 + 0.1(-10.0) = 19.0; \\quad F_1(x_2) = 20.0 + 0.1(5.0) = 20.5; \\quad F_1(x_3) = 20.5',
          result: 'F_1 = [19.0, 20.5, 20.5]',
        },
        {
          step: 'Step 5: Verify new residuals',
          math: 'r_{new} = [10 - 19.0, 20 - 20.5, 30 - 20.5] = [-9.0, -0.5, +9.5]',
          result: 'MSE dropped from 66.7 to 57.2',
        },
      ],
      finalConclusion: 'In a single gradient step with eta = 0.1, the ensemble moved in the exact steepest descent direction, reducing MSE.',
    },
    visualExplanation: {
      title: 'Gradient Descent in Function Space Visualizer',
      description: 'The interactive visualizer graphs the target curve y = f(x) alongside the cumulative GBDT prediction F_m(x) and the residual gradient surface. Drag the iteration slider to watch the step-like tree leaves successively accumulate, smoothing into an exact fit of the underlying non-linear function.',
      features: [
        'Top Panel: True target vs Ensemble prediction F_m(x).',
        'Bottom Panel: Residual gradient landscape r_im waiting to be fitted.',
        'Shrinkage Slider: Demonstrates how low learning rates prevent jagged overshoot.',
      ],
    },
    scratchCode: {
      title: 'Gradient Boosting Regressor from Scratch in NumPy',
      code: `import numpy as np
from sklearn.tree import DecisionTreeRegressor

class GradientBoostingRegressorScratch:
    def __init__(self, n_estimators=100, learning_rate=0.1, max_depth=3):
        self.n_estimators = n_estimators
        self.learning_rate = learning_rate
        self.max_depth = max_depth
        self.f0 = None
        self.trees = []

    def fit(self, X, y):
        # 1. Initialize with target mean
        self.f0 = np.mean(y)
        f = np.full(y.shape[0], fill_value=self.f0, dtype=float)
        self.trees = []

        for m in range(self.n_estimators):
            # 2. Compute negative gradient (pseudo-residuals for MSE)
            residuals = y - f

            # 3. Fit regression tree to pseudo-residuals
            tree = DecisionTreeRegressor(max_depth=self.max_depth, random_state=m)
            tree.fit(X, residuals)

            # 4. Update predictions with shrinkage
            f += self.learning_rate * tree.predict(X)
            self.trees.append(tree)
        return self

    def predict(self, X):
        preds = np.full(X.shape[0], fill_value=self.f0, dtype=float)
        for tree in self.trees:
            preds += self.learning_rate * tree.predict(X)
        return preds
`,
      explanation: 'Implements Friedman’s GBDT algorithm: initializes F_0 to mean, computes pseudo-residuals r_im = y - F, fits a DecisionTreeRegressor, and updates with shrinkage.',
    },
    sklearnCode: {
      title: 'Scikit-Learn GradientBoostingRegressor with Early Stopping',
      code: `from sklearn.ensemble import GradientBoostingRegressor
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split

X, y = fetch_california_housing(return_X_y=True)
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

gbr = GradientBoostingRegressor(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=4,
    subsample=0.8,              # Stochastic Gradient Boosting
    n_iter_no_change=15,        # Early stopping patience
    validation_fraction=0.1,
    random_state=42
)

gbr.fit(X_train, y_train)
print(f"Optimal Iterations: {gbr.n_estimators_}")
print(f"Validation R^2 Score: {gbr.score(X_val, y_val):.4f}")
`,
      explanation: 'Scikit-learn GBDT supports stochastic row subsampling and automated early stopping via n_iter_no_change.',
    },
    runnableCode: {
      code: `import numpy as np

# Verify Pseudo-Residuals for Log-Loss: r_i = y_i - p_i
def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

# Synthetic binary targets and initial raw margin log-odds
y_true = np.array([1, 1, 0, 0])
F_0 = np.array([0.0, 0.0, 0.0, 0.0])  # log-odds 0 -> prob 0.5

probs = sigmoid(F_0)
residuals = y_true - probs

print("Initial Log-Odds F_0:     ", F_0)
print("Initial Probabilities p:  ", probs)
print("True Labels y:            ", y_true)
print("Pseudo-Residuals (y - p): ", residuals)

# Update log-odds by step in direction of residuals with learning rate 0.5
F_1 = F_0 + 0.5 * residuals
probs_1 = sigmoid(F_1)
print("\\nUpdated Log-Odds F_1:     ", np.round(F_1, 4))
print("Updated Probabilities p_1:", np.round(probs_1, 4))
print("New Residuals (y - p_1):  ", np.round(y_true - probs_1, 4))
`,
      expectedOutput: `Initial Log-Odds F_0:      [0. 0. 0. 0.]
Initial Probabilities p:   [0.5 0.5 0.5 0.5]
True Labels y:             [1 1 0 0]
Pseudo-Residuals (y - p):  [ 0.5  0.5 -0.5 -0.5]

Updated Log-Odds F_1:      [ 0.25  0.25 -0.25 -0.25]
Updated Probabilities p_1: [0.5622 0.5622 0.4378 0.4378]
New Residuals (y - p_1):   [ 0.4378  0.4378 -0.4378 -0.4378]`,
    },
    lineByLineExplanation: [
      {
        lines: '7-11',
        codeSnippet: 'probs = sigmoid(F_0)\nresiduals = y_true - probs',
        explanation: 'Transforms raw ensemble margin F_0 into probabilities via sigmoid and computes negative log-loss gradients r_i = y_i - p_i.',
      },
      {
        lines: '18-20',
        codeSnippet: 'F_1 = F_0 + 0.5 * residuals\nprobs_1 = sigmoid(F_1)',
        explanation: 'Applies functional gradient update to log-odds margins and verifies that predicted probabilities improve towards true labels.',
      },
    ],
    hyperparameters: [
      {
        name: 'learning_rate (shrinkage)',
        defaultVal: '0.1',
        range: '0.01 to 0.3',
        effect: 'Multiplies each tree’s output. Smaller values yield superior generalization but require more trees.',
        recommendation: 'Use 0.03 to 0.05 combined with early stopping.',
      },
      {
        name: 'max_depth',
        defaultVal: '3',
        range: '2 to 8',
        effect: 'Controls the order of feature interactions. Depth 3 captures up to 3-way interactions (2^3 = 8 leaves).',
        recommendation: 'Values between 3 and 6 are optimal for most tabular data; depth > 8 usually causes rapid overfitting.',
      },
      {
        name: 'subsample',
        defaultVal: '1.0',
        range: '(0.0, 1.0]',
        effect: 'Fraction of samples used to fit each tree (Stochastic Gradient Boosting). Subsampling introduces variance reduction.',
        recommendation: 'Set to 0.7-0.8 for faster training and reduced overfitting.',
      },
    ],
    assumptions: [
      {
        assumption: 'Smooth and Differentiable Loss Function',
        whyItMatters: 'GBDT requires computing the first derivative (gradient) of the loss with respect to predictions at every sample.',
        howToVerify: 'Verify loss function is continuous and has analytical first derivatives.',
      },
      {
        assumption: 'Stationarity Across Boosting Iterations',
        whyItMatters: 'If underlying data distribution shifts during collection, early trees fit a different target than later trees.',
        howToVerify: 'Verify train/test data splits are temporally coherent and uncorrupted by drift.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Training GBDT with learning_rate=0.1 and n_estimators=2000 without early stopping.',
        solution: 'GBDT will overfit when run for thousands of rounds without early stopping. Always set early stopping patience.',
      },
      {
        mistake: 'Interpreting GBDT raw outputs directly as probabilities without sigmoid transformation.',
        solution: 'In binary classification, GBDT trees output raw log-odds F(x) in (-inf, +inf). Apply sigmoid 1 / (1 + exp(-F)) to obtain probabilities.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Banking & FinTech', application: 'Credit Card Fraud Scoring', benefit: 'GBDT optimizes custom asymmetric cross-entropy to detect micro-fraud patterns in real time.' },
      { industry: 'AdTech', application: 'Click-Through Rate (CTR) Prediction', benefit: 'Optimizes log-loss across billions of ad impressions with calibrated probabilistic outputs.' },
      { industry: 'Supply Chain', application: 'Inventory Demand Forecasting', benefit: 'Quantile loss GBDT models upper 95th percentile buffer stock requirements.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-6-6-1',
        question: 'Why is GBDT described as performing gradient descent in "function space"?',
        hint: 'What is being adjusted at each iteration: parameter weights or function values?',
        answer: 'Because instead of adjusting fixed model parameters theta, each boosting step directly shifts the output function values F(x_i) by adding a new function h(x) aligned with the negative gradient of the loss.',
      },
      {
        id: 'pq-6-6-2',
        question: 'What is the pseudo-residual for Squared Error loss versus Binary Cross-Entropy loss?',
        hint: 'Evaluate -d L / d F for both losses.',
        answer: 'For Squared Error, r_i = y_i - F(x_i) (the standard residual). For Binary Cross-Entropy, r_i = y_i - p_i (observed label minus predicted probability).',
      },
      {
        id: 'pq-6-6-3',
        question: 'What is the role of the max_depth hyperparameter in determining feature interaction order?',
        hint: 'How many features can interact in a single tree of depth d?',
        answer: 'A tree of depth d can partition the feature space into at most 2^d leaves through d consecutive splits, capturing feature interactions of order at most d.',
      },
    ],
    quiz: [
      {
        id: 'q-6-6-1',
        question: 'In GBDT, what are the training targets used to fit the m-th decision tree?',
        options: [
          'The original labels y_i.',
          'The negative gradients (pseudo-residuals) r_{im} = -[d L / d F].',
          'The predicted probabilities p_i.',
          'The sample weights w_i.',
        ],
        correctIndex: 1,
        explanation: 'Friedman proved that the m-th tree fits the pseudo-residuals r_{im} = -d L / d F, which point in the direction of steepest loss descent.',
      },
      {
        id: 'q-6-6-2',
        question: 'What is Stochastic Gradient Boosting?',
        options: [
          'Fitting trees using neural network stochastic gradient descent.',
          'Subsampling a fraction of the training data without replacement (e.g. subsample=0.8) at each iteration.',
          'Randomly flipping 10% of the training labels.',
          'Setting the learning rate randomly at each stage.',
        ],
        correctIndex: 1,
        explanation: 'Stochastic Gradient Boosting (Friedman, 2002) samples a random subset of training data without replacement for each tree, speeding up training and reducing overfitting.',
      },
      {
        id: 'q-6-6-3',
        question: 'Why does GBDT require a learning rate (shrinkage) eta < 1.0?',
        options: [
          'Without shrinkage, trees cannot be trained.',
          'Shrinkage leaves unexplained variance for future trees to fit, preventing early trees from dominating and drastically improving generalization.',
          'Shrinkage is required to keep probabilities between 0 and 1.',
          'Shrinkage speeds up training by a factor of 10.',
        ],
        correctIndex: 1,
        explanation: 'Shrinkage acts as a regularizer. Scaling each tree by eta in (0, 1] slows down learning, preventing greedy early trees from overcommitting to training noise.',
      },
    ],
    independentExercise: {
      title: 'Implement Custom Huber Loss Pseudo-Residuals',
      problem: 'Write a Python function `compute_huber_residuals(y_true, y_pred, delta=1.0)` that calculates the pseudo-residuals for Huber loss: r_i = y - y_pred if |y - y_pred| <= delta, else delta * sign(y - y_pred). Test it on points with outliers.',
      hints: ['diff = y_true - y_pred', 'Use np.where(np.abs(diff) <= delta, diff, delta * np.sign(diff))'],
      starterCode: `import numpy as np

def compute_huber_residuals(y_true, y_pred, delta=1.0):
    # TODO: return pseudo-residuals for robust Huber loss
    pass

y_t = np.array([10.0, 10.0, 10.0])
y_p = np.array([9.5, 5.0, 100.0])  # small error, medium error, massive outlier
print(compute_huber_residuals(y_t, y_p, delta=1.5))
`,
      solution: `import numpy as np

def compute_huber_residuals(y_true, y_pred, delta=1.0):
    diff = y_true - y_pred
    return np.where(np.abs(diff) <= delta, diff, delta * np.sign(diff))

y_t = np.array([10.0, 10.0, 10.0])
y_p = np.array([9.5, 5.0, 100.0])  # small error, medium error, massive outlier
res = compute_huber_residuals(y_t, y_p, delta=1.5)

print(f"Huber Pseudo-Residuals (delta=1.5): {res}")
print("Notice how the massive outlier (-90.0) is clipped to exactly -1.5, protecting the tree from distortion!")
`,
    },
    summary: {
      keyTakeaways: [
        'Gradient Boosting generalizes boosting to any differentiable loss function via functional gradient descent.',
        'Pseudo-residuals r_{im} = -d L / d F serve as universal steepest descent targets.',
        'Combining shallow trees, shrinkage (eta < 0.1), and early stopping produces state-of-the-art predictive performance on tabular data.',
      ],
      nextLessonId: 'xgboost-lightgbm-catboost',
      nextLessonTitle: 'Modern Gradient Boosters: XGBoost, LightGBM & CatBoost',
      nextLessonModuleId: 'module-6',
    },
  },

  'xgboost-lightgbm-catboost': {
    id: 'xgboost-lightgbm-catboost',
    moduleId: 'module-6',
    title: 'Modern Gradient Boosters: XGBoost, LightGBM & CatBoost',
    subtitle: 'Second-Order Taylor Expansions, Histogram Binning & Categorical Encodings',
    order: 7,
    readTimeMinutes: 30,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Derive XGBoost’s exact second-order Taylor objective with analytic leaf weights and split gain.',
      'Explain LightGBM’s innovations: Histogram-based binning, Gradient-based One-Side Sampling (GOSS), and Exclusive Feature Bundling (EFB).',
      'Understand CatBoost’s Ordered Boosting, target encoding statistics without target leakage, and symmetric oblivious trees.',
      'Select the optimal modern booster and hyperparameters for diverse production workloads.',
    ],
    prerequisites: ['gradient-boosting', 'Taylor Series expansions', 'Categorical encoding'],
    previousLesson: {
      id: 'gradient-boosting',
      title: 'Gradient Boosted Decision Trees (GBDT)',
      moduleId: 'module-6',
    },
    analogy: {
      title: 'The Modern Formula 1 Trinity',
      text: 'If classical GBDT was a reliable production sports car, XGBoost, LightGBM, and CatBoost are specialized Formula 1 racing machines. XGBoost engineered a twin-turbo engine with exact second-order mathematical optimization. LightGBM stripped away excess chassis weight using histogram quantization and smart sample filtering (GOSS) for blisteringly fast pit stops. CatBoost engineered all-wheel-drive traction control designed specifically to master complex categorical terrain without spinning out.',
      metaphor: 'The modern boosting trinity pushes classical GBDT to extreme execution speeds and accuracy through second-order math and architectural optimizations.',
    },
    problemSolved: {
      title: 'The Computational and Overfitting Bottlenecks of Classical GBDT',
      description: 'Classical GBDT evaluated every single unique value across continuous features to find splits (O(n * p)), suffered from memory bloat, lacked built-in tree regularization, and required manual preprocessing of categorical variables.',
      keyPoints: [
        'XGBoost introduces 2nd-order Taylor expansions with L1/L2 leaf regularization.',
        'LightGBM replaces exact sorting with 256-bin histograms and GOSS, achieving 10-20x speedups.',
        'CatBoost handles high-cardinality categorical variables natively with Target Statistics and Ordered Boosting.',
      ],
    },
    intuition: {
      overview: 'Each of the modern libraries solves a key limitation: XGBoost perfects the objective function; LightGBM perfects split search and memory efficiency; CatBoost perfects categorical feature handling.',
      steps: [
        {
          step: 1,
          title: 'Second-Order Taylor Approximation',
          description: 'Approximate the loss using both first derivatives (gradients g_i) and second derivatives (hessians h_i).',
        },
        {
          step: 2,
          title: 'Analytic Leaf Weight & Gain',
          description: 'Directly solve for the optimal regularized leaf weight w_j* and compute split Gain in closed form.',
        },
        {
          step: 3,
          title: 'Algorithmic Speedups',
          description: 'Discretize continuous features into integer bins (LightGBM) or order categorical features chronologically (CatBoost).',
        },
      ],
    },
    mathematics: {
      overview: 'Tianqi Chen’s mathematical derivation of XGBoost’s objective function is one of the most influential formulations in modern applied machine learning.',
      foundations: [
        {
          name: 'Second-Order Taylor Objective Function',
          latex: '\\mathcal{L}^{(t)} \\approx \\sum_{i=1}^n \\left[ g_i f_t(x_i) + \\frac{1}{2} h_i f_t^2(x_i) \\right] + \\gamma T + \\frac{1}{2} \\lambda \\sum_{j=1}^T w_j^2',
          explanation: 'where g_i = d L / d F is the gradient, h_i = d^2 L / d F^2 is the hessian, T is the number of leaves, and lambda is the L2 leaf penalty.',
        },
        {
          name: 'Optimal Leaf Weight Formula',
          latex: 'w_j^* = - \\frac{\\sum_{i \\in I_j} g_i}{\\sum_{i \\in I_j} h_i + \\lambda} = - \\frac{G_j}{H_j + \\lambda}',
          explanation: 'Analytic global minimizer for leaf j, where G_j is sum of gradients and H_j is sum of hessians.',
        },
        {
          name: 'Optimal Split Gain Equation',
          latex: '\\text{Gain} = \\frac{1}{2} \\left[ \\frac{G_L^2}{H_L + \\lambda} + \\frac{G_R^2}{H_R + \\lambda} - \\frac{(G_L + G_R)^2}{H_L + H_R + \\lambda} \\right] - \\gamma',
          explanation: 'Measures the exact reduction in regularized loss achieved by splitting a node into Left (L) and Right (R) children. gamma acts as a minimum gain threshold.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of XGBoost Optimal Leaf Weight and Split Gain',
      objective: 'Prove that w_j* = -G_j / (H_j + lambda) and derive the exact tree split score.',
      steps: [
        {
          step: 1,
          label: 'Group instances by leaf index j',
          latex: '\\mathcal{L}^{(t)} = \\sum_{j=1}^T \\left[ \\left( \\sum_{i \\in I_j} g_i \\right) w_j + \\frac{1}{2} \\left( \\sum_{i \\in I_j} h_i + \\lambda \\right) w_j^2 \\right] + \\gamma T',
          explanation: 'Because f_t(x_i) = w_j for all instances landing in leaf j, we rewrite the sum over samples as a sum over leaves.',
        },
        {
          step: 2,
          label: 'Define shorthand G_j and H_j',
          latex: 'G_j = \\sum_{i \\in I_j} g_i, \\quad H_j = \\sum_{i \\in I_j} h_i \\implies \\mathcal{L}^{(t)} = \\sum_{j=1}^T \\left[ G_j w_j + \\frac{1}{2}(H_j + \\lambda) w_j^2 \\right] + \\gamma T',
          explanation: 'This separates the loss into independent quadratic equations for each leaf weight w_j.',
        },
        {
          step: 3,
          label: 'Differentiate with respect to w_j and set to zero',
          latex: '\\frac{\\partial \\mathcal{L}^{(t)}}{\\partial w_j} = G_j + (H_j + \\lambda) w_j = 0 \\implies w_j^* = - \\frac{G_j}{H_j + \\lambda}',
          explanation: 'The optimal weight for leaf j depends only on the sum of gradients and regularized sum of hessians.',
        },
        {
          step: 4,
          label: 'Substitute w_j* back into the objective',
          latex: '\\mathcal{L}^*(q) = -\\frac{1}{2} \\sum_{j=1}^T \\frac{G_j^2}{H_j + \\lambda} + \\gamma T',
          explanation: 'This score evaluates the quality of any proposed tree structure q.',
        },
        {
          step: 5,
          label: 'Compute the Gain from splitting a node into Left and Right leaves',
          latex: '\\text{Gain} = \\mathcal{L}_{\\text{parent}}^* - (\\mathcal{L}_L^* + \\mathcal{L}_R^*) = \\frac{1}{2} \\left[ \\frac{G_L^2}{H_L + \\lambda} + \\frac{G_R^2}{H_R + \\lambda} - \\frac{(G_L + G_R)^2}{H_L + H_R + \\lambda} \\right] - \\gamma',
          explanation: 'If Gain > 0, the split improves the regularized objective; otherwise, the branch is pruned.',
        },
      ],
    },
    variables: [
      { symbol: 'g_i', name: 'First-Order Gradient', description: 'Partial derivative of loss with respect to prediction for sample i', dimensions: 'Scalar' },
      { symbol: 'h_i', name: 'Second-Order Hessian', description: 'Second partial derivative of loss with respect to prediction for sample i', dimensions: 'Scalar > 0' },
      { symbol: '\\lambda', name: 'L2 Leaf Regularization', description: 'Shrinkage parameter on leaf weights w_j to prevent extreme leaf values', dimensions: 'Scalar >= 0' },
      { symbol: '\\gamma', name: 'Minimum Split Gain', description: 'Cost penalty for adding an extra leaf node (complexity control)', dimensions: 'Scalar >= 0' },
      { symbol: 'w_j^*', name: 'Optimal Leaf Weight', description: 'Optimal continuous prediction value assigned to leaf j', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Evaluate an XGBoost split candidate on a node with 3 samples: gradients g = [-0.8, -0.6, +1.0], hessians h = [1.0, 1.0, 1.0], lambda = 1.0, gamma = 0.1.',
      dataset: [
        { sample: 1, g: -0.8, h: 1.0, candidate_branch: 'Left' },
        { sample: 2, g: -0.6, h: 1.0, candidate_branch: 'Left' },
        { sample: 3, g: +1.0, h: 1.0, candidate_branch: 'Right' },
      ],
      calculations: [
        {
          step: 'Compute Left branch statistics (samples 1 and 2)',
          math: 'G_L = -0.8 + (-0.6) = -1.4; \\quad H_L = 1.0 + 1.0 = 2.0; \\quad \\text{Score}_L = \\frac{(-1.4)^2}{2.0 + 1.0} = \\frac{1.96}{3.0}',
          result: 'Score_L = 0.6533',
        },
        {
          step: 'Compute Right branch statistics (sample 3)',
          math: 'G_R = +1.0; \\quad H_R = 1.0; \\quad \\text{Score}_R = \\frac{(1.0)^2}{1.0 + 1.0} = \\frac{1.0}{2.0}',
          result: 'Score_R = 0.5000',
        },
        {
          step: 'Compute Parent node statistics before split',
          math: 'G_P = -1.4 + 1.0 = -0.4; \\quad H_P = 2.0 + 1.0 = 3.0; \\quad \\text{Score}_P = \\frac{(-0.4)^2}{3.0 + 1.0} = \\frac{0.16}{4.0}',
          result: 'Score_P = 0.0400',
        },
        {
          step: 'Compute final Split Gain',
          math: '\\text{Gain} = \\frac{1}{2} [0.6533 + 0.5000 - 0.0400] - 0.10 = \\frac{1}{2}(1.1133) - 0.10 = 0.5567 - 0.10',
          result: 'Gain = +0.4567 (Gain > 0 -> Split Accepted!)',
        },
      ],
      finalConclusion: 'The split produces a large positive gain of +0.4567, easily overcoming the complexity penalty gamma = 0.1.',
    },
    visualExplanation: {
      title: 'Architectural Comparison: XGBoost vs LightGBM vs CatBoost',
      description: 'The architectural diagram contrasts tree growth strategies: XGBoost traditionally grows depth-wise (level by level); LightGBM grows leaf-wise (best-first), splitting the single node that maximizes loss reduction regardless of balance; CatBoost grows symmetric oblivious trees where all nodes at the same depth share identical split criteria.',
      features: [
        'XGBoost: Level-wise tree growth, exact/approximate quantile splits, hardware cache awareness.',
        'LightGBM: Leaf-wise tree growth, 256-bin histogram quantization, GOSS gradient downsampling.',
        'CatBoost: Symmetric oblivious trees (fast SIMD inference), target statistics, ordered boosting to prevent leakage.',
      ],
    },
    scratchCode: {
      title: 'XGBoost Leaf Weight and Gain Calculation in NumPy',
      code: `import numpy as np

def compute_xgboost_leaf_weight(g, h, l2_lambda=1.0):
    """Compute optimal leaf weight w* = -G / (H + lambda)"""
    G = np.sum(g)
    H = np.sum(h)
    return -G / (H + l2_lambda)

def compute_xgboost_split_gain(g_left, h_left, g_right, h_right, l2_lambda=1.0, gamma=0.0):
    """Compute exact split Gain = 0.5 * [G_L^2/(H_L+lam) + G_R^2/(H_R+lam) - G_P^2/(H_P+lam)] - gamma"""
    GL, HL = np.sum(g_left), np.sum(h_left)
    GR, HR = np.sum(g_right), np.sum(h_right)
    GP, HP = GL + GR, HL + HR

    score_L = (GL ** 2) / (HL + l2_lambda)
    score_R = (GR ** 2) / (HR + l2_lambda)
    score_P = (GP ** 2) / (HP + l2_lambda)

    gain = 0.5 * (score_L + score_R - score_P) - gamma
    return gain

# Verification with numerical example
g_L, h_L = np.array([-0.8, -0.6]), np.array([1.0, 1.0])
g_R, h_R = np.array([1.0]), np.array([1.0])

w_L = compute_xgboost_leaf_weight(g_L, h_L, l2_lambda=1.0)
w_R = compute_xgboost_leaf_weight(g_R, h_R, l2_lambda=1.0)
gain = compute_xgboost_split_gain(g_L, h_L, g_R, h_R, l2_lambda=1.0, gamma=0.1)

print(f"Optimal Left Leaf Weight w_L*:   {w_L:.4f}")
print(f"Optimal Right Leaf Weight w_R*:  {w_R:.4f}")
print(f"Exact Split Gain:                {gain:.4f}")
`,
      explanation: 'Calculates closed-form optimal leaf weights and regularized split gains using Tianqi Chen’s exact formula.',
    },
    sklearnCode: {
      title: 'Modern Booster Shootout (XGBoost, LightGBM, CatBoost)',
      code: `import xgboost as xgb
import lightgbm as lgb
from catboost import CatBoostClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score

X, y = load_breast_cancer(return_X_y=True)

# 1. XGBoost
model_xgb = xgb.XGBClassifier(
    n_estimators=100, learning_rate=0.05, max_depth=4,
    reg_lambda=1.0, gamma=0.1, eval_metric='logloss', random_state=42
)

# 2. LightGBM (Histogram + Leaf-Wise)
model_lgb = lgb.LGBMClassifier(
    n_estimators=100, learning_rate=0.05, num_leaves=31,
    subsample_for_bin=200000, random_state=42, verbose=-1
)

# 3. CatBoost (Oblivious Trees)
model_cat = CatBoostClassifier(
    iterations=100, learning_rate=0.05, depth=4,
    random_seed=42, verbose=False
)

for name, model in [('XGBoost', model_xgb), ('LightGBM', model_lgb), ('CatBoost', model_cat)]:
    scores = cross_val_score(model, X, y, cv=5)
    print(f"{name:<10} 5-Fold CV Accuracy: {scores.mean():.4f} (+/- {scores.std():.4f})")
`,
      explanation: 'Demonstrates configuring and evaluating XGBoost, LightGBM, and CatBoost in production.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate LightGBM Histogram Binning Speedup Concept
np.random.seed(42)
n_samples = 100000
continuous_feature = np.random.normal(loc=50, scale=15, size=n_samples)

# Exact sorting (Classical GBDT): O(N log N)
import time
t0 = time.time()
sorted_vals = np.sort(continuous_feature)
t_sort = time.time() - t0

# Quantization into 256 integer bins (LightGBM): O(N)
t0 = time.time()
bins = np.linspace(continuous_feature.min(), continuous_feature.max(), 256)
binned_feature = np.digitize(continuous_feature, bins).astype(np.uint8)
t_bin = time.time() - t0

print(f"Sample Size: {n_samples:,} floating point numbers")
print(f"Classical GBDT Sorting Time:    {t_sort * 1000:.2f} ms (Memory: {continuous_feature.nbytes / 1024:.1f} KB)")
print(f"LightGBM 256-Bin Quantization: {t_bin * 1000:.2f} ms (Memory: {binned_feature.nbytes / 1024:.1f} KB)")
print(f"Memory Reduction: {continuous_feature.nbytes / binned_feature.nbytes:.1f}x smaller memory footprint!")
`,
      expectedOutput: `Sample Size: 100,000 floating point numbers
Classical GBDT Sorting Time:    5.12 ms (Memory: 781.2 KB)
LightGBM 256-Bin Quantization: 1.84 ms (Memory: 97.7 KB)
Memory Reduction: 8.0x smaller memory footprint!`,
    },
    lineByLineExplanation: [
      {
        lines: '10-12',
        codeSnippet: 'sorted_vals = np.sort(continuous_feature)',
        explanation: 'Simulates classical GBDT split evaluation, which requires sorting raw floating point numbers per feature.',
      },
      {
        lines: '17-18',
        codeSnippet: 'bins = np.linspace(..., 256)\nbinned_feature = np.digitize(...).astype(np.uint8)',
        explanation: 'Simulates LightGBM histogram binning, converting 64-bit floats into 8-bit integers (uint8) for an 8x memory reduction and O(K) histogram split search.',
      },
    ],
    hyperparameters: [
      {
        name: 'reg_lambda (lambda)',
        defaultVal: '1.0',
        range: '0.0 to 100.0+',
        effect: 'L2 regularization penalty on leaf weights. Higher values shrink weights towards zero, reducing variance.',
        recommendation: 'Increase lambda to 5.0 - 20.0 when training on noisy or small datasets.',
      },
      {
        name: 'gamma / min_split_loss',
        defaultVal: '0.0',
        range: '0.0 to 10.0',
        effect: 'Minimum loss reduction required to make a further partition. Acts as automated post-pruning.',
        recommendation: 'Set between 0.1 and 1.0 to prune weak splits.',
      },
      {
        name: 'num_leaves (LightGBM)',
        defaultVal: '31',
        range: '10 to 256',
        effect: 'Main control of model capacity in leaf-wise growth. Must be strictly smaller than 2^max_depth.',
        recommendation: 'Set num_leaves between 20 and 50 to prevent severe overfitting.',
      },
    ],
    assumptions: [
      {
        assumption: 'Dense, Heterogeneous Tabular Data',
        whyItMatters: 'Modern GBDTs dominate tabular datasets with non-linear feature interactions, but are suboptimal for unstructured audio, text, or vision data.',
        howToVerify: 'Verify task involves structured relational or tabular features.',
      },
      {
        assumption: 'Loss Twice-Differentiable',
        whyItMatters: 'Second-order Taylor expansion requires analytical computing of both gradient g_i and hessian h_i.',
        howToVerify: 'Verify loss function has non-zero positive second derivative (convexity).',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using LightGBM with default num_leaves=31 on very small datasets (N < 1000).',
        solution: 'Leaf-wise tree growth can create deep, asymmetric branches that overfit small datasets. Reduce num_leaves to 10-15 or use XGBoost with depth=3.',
      },
      {
        mistake: 'One-hot encoding high-cardinality categorical variables before passing to CatBoost or LightGBM.',
        solution: 'Pass categorical column indices directly to CatBoost (`cat_features`) or LightGBM (`categorical_feature`); native target encoding vastly outperforms one-hot encoding.',
      },
    ],
    realWorldUseCases: [
      { industry: 'E-Commerce & Retail', application: 'Personalized Product Recommendation Ranking', benefit: 'LightGBM histogram speed allows training on 50 million user-item interaction pairs in minutes.' },
      { industry: 'Credit Bureau & FinTech', application: 'Credit Underwriting Models', benefit: 'XGBoost with exact L2 regularization provides audited, high-precision risk tier scoring.' },
      { industry: 'Transportation & Logistics', application: 'Ride-Hailing ETA Prediction', benefit: 'CatBoost handles high-cardinality geographic zone IDs and vehicle categories natively without feature inflation.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-6-7-1',
        question: 'What is the mathematical benefit of using second-order Taylor expansion (gradients + hessians) in XGBoost compared to first-order GBDT?',
        hint: 'Think about Newton-Raphson optimization versus simple gradient descent.',
        answer: 'Second-order optimization incorporates the local curvature (hessian h_i) of the loss function. This allows XGBoost to take exact Newton-Raphson steps and derive closed-form optimal leaf weights w* without needing separate line search.',
      },
      {
        id: 'pq-6-7-2',
        question: 'How does LightGBM’s leaf-wise (best-first) tree growth differ from XGBoost’s traditional level-wise growth?',
        hint: 'Which node gets split at each step?',
        answer: 'Level-wise growth splits all nodes across an entire depth level simultaneously to maintain a balanced tree. Leaf-wise growth splits only the single leaf that yields the largest loss reduction (Gain), producing deeper, asymmetric trees with higher efficiency and accuracy for a given number of leaves.',
      },
      {
        id: 'pq-6-7-3',
        question: 'What are symmetric oblivious trees in CatBoost, and why are they computationally advantageous?',
        hint: 'Think about CPU branch prediction and SIMD evaluation.',
        answer: 'Oblivious trees apply the exact same feature and threshold split across all nodes at the same tree depth. This guarantees perfectly balanced trees whose decision paths can be evaluated as bitwise operations without conditional branching, resulting in ultra-fast model inference.',
      },
    ],
    quiz: [
      {
        id: 'q-6-7-1',
        question: 'In XGBoost, what happens to the optimal leaf weight w_j* as the L2 regularization parameter lambda approaches infinity?',
        options: [
          'w_j* approaches negative infinity.',
          'w_j* approaches 0.',
          'w_j* approaches the sample mean.',
          'w_j* is unaffected by lambda.',
        ],
        correctIndex: 1,
        explanation: 'Because w_j* = -G_j / (H_j + lambda), as lambda -> inf, the denominator grows unbounded, shrinking the leaf weight w_j* to exactly 0.',
      },
      {
        id: 'q-6-7-2',
        question: 'What is GOSS (Gradient-based One-Side Sampling) in LightGBM?',
        options: [
          'A technique that keeps all instances with large gradients (under-trained samples) and randomly samples a small fraction of instances with small gradients.',
          'A method to prune tree leaves from the left side only.',
          'An algorithm for one-hot encoding categorical variables.',
          'A GPU acceleration protocol.',
        ],
        correctIndex: 0,
        explanation: 'GOSS recognizes that instances with large gradients contribute more to information gain, so it preserves all large-gradient samples and randomly samples only 10-20% of small-gradient samples.',
      },
      {
        id: 'q-6-7-3',
        question: 'Why does CatBoost use "Ordered Boosting" instead of standard target statistics?',
        options: [
          'To sort features in alphabetical order.',
          'To prevent target leakage and prediction shift caused by calculating target statistics using the entire training set.',
          'To enforce monotonic constraints on all predictions.',
          'To force trees to be symmetric.',
        ],
        correctIndex: 1,
        explanation: 'Ordered boosting computes target statistics for sample i using only samples that precede i in a random permutation, completely eliminating target leakage.',
      },
    ],
    independentExercise: {
      title: 'Tune XGBoost Regularization to Prevent Overfitting',
      problem: 'Write a script using `xgboost.XGBClassifier` on a synthetic noisy dataset. Train one model with `reg_lambda=0, gamma=0` and another with `reg_lambda=10.0, gamma=1.0`. Compare their training vs test accuracy gaps to witness the regularization effect.',
      hints: ['from sklearn.datasets import make_classification', 'Compute train_acc - test_acc gap for both models'],
      starterCode: `from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
import xgboost as xgb

X, y = make_classification(n_samples=1000, n_features=20, n_informative=5, flip_y=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Compare unregularized vs regularized XGBoost models
`,
      solution: `from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
import xgboost as xgb

X, y = make_classification(n_samples=1000, n_features=20, n_informative=5, flip_y=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Unregularized Model
unreg = xgb.XGBClassifier(n_estimators=150, max_depth=6, reg_lambda=0.0, gamma=0.0, eval_metric='logloss', random_state=42)
unreg.fit(X_train, y_train)

# Regularized Model
reg = xgb.XGBClassifier(n_estimators=150, max_depth=6, reg_lambda=15.0, gamma=2.0, eval_metric='logloss', random_state=42)
reg.fit(X_train, y_train)

print(f"Unregularized Train Acc: {unreg.score(X_train, y_train):.4f} | Test Acc: {unreg.score(X_test, y_test):.4f} (Gap: {unreg.score(X_train, y_train) - unreg.score(X_test, y_test):.4f})")
print(f"Regularized   Train Acc: {reg.score(X_train, y_train):.4f} | Test Acc: {reg.score(X_test, y_test):.4f} (Gap: {reg.score(X_train, y_train) - reg.score(X_test, y_test):.4f})")
`,
    },
    summary: {
      keyTakeaways: [
        'XGBoost formalizes GBDT with second-order Taylor expansions, analytical leaf weights, and exact regularized split gain.',
        'LightGBM achieves dramatic speed and memory advantages through 256-bin histogram quantization, leaf-wise growth, and GOSS.',
        'CatBoost provides state-of-the-art handling of categorical features and fast inference via symmetric oblivious trees.',
      ],
      nextLessonId: 'voting-stacking-blending',
      nextLessonTitle: 'Voting, Stacking & Blending Architectures',
      nextLessonModuleId: 'module-6',
    },
  },

  'voting-stacking-blending': {
    id: 'voting-stacking-blending',
    moduleId: 'module-6',
    title: 'Voting, Stacking & Blending Architectures',
    subtitle: 'Multi-Model Meta-Learning, Out-of-Fold Predictions & Blending Schemes',
    order: 8,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand the architecture of Stacking (Stacked Generalization, Wolpert 1992).',
      'Explain why naive meta-feature generation causes catastrophic data leakage.',
      'Implement an Out-Of-Fold (OOF) cross-validation scheme to construct meta-training sets.',
      'Compare Voting, Blending, and Stacking meta-models.',
    ],
    prerequisites: ['ensemble-foundations', 'Cross-Validation protocols', 'Logistic Regression'],
    previousLesson: {
      id: 'xgboost-lightgbm-catboost',
      title: 'Modern Gradient Boosters: XGBoost, LightGBM & CatBoost',
      moduleId: 'module-6',
    },
    analogy: {
      title: 'The Multi-Specialist Hospital Consensus',
      text: 'In a prestigious medical clinic, a patient’s health record is reviewed independently by a Neurologist (Model 1), a Cardiologist (Model 2), and a Geneticist (Model 3). Rather than simply taking a raw majority vote, their detailed diagnostic likelihood reports are submitted to the Chief Medical Officer (Meta-Learner). The Chief Medical Officer has learned over years of practice that the Neurologist is extremely accurate for cognitive symptoms but overly cautious for vascular issues, and weights their opinions intelligently to make the final clinical diagnosis.',
      metaphor: 'Stacking uses a meta-model to learn the strengths and blind spots of diverse base models, combining their predictions optimally.',
    },
    problemSolved: {
      title: 'Beyond Simple Majority Voting',
      description: 'Hard voting and soft probability averaging assume all base models have equal credibility across all data regions. Stacking trains a machine learning model to learn which base models to trust for different types of instances.',
      keyPoints: [
        'Enables combining radically heterogeneous model families (e.g., Ridge + Random Forest + Neural Net).',
        'Learns non-linear combination weights rather than relying on manual tuning.',
        'Uses Out-of-Fold (OOF) predictions to guarantee that the meta-learner evaluates realistic generalization behavior.',
      ],
    },
    intuition: {
      overview: 'Stacking trains M base learners (Level-0) on k-fold splits of the training data. The out-of-fold predictions from these base learners become the feature inputs for a Level-1 meta-model (e.g., Logistic Regression or Ridge).',
      steps: [
        {
          step: 1,
          title: 'Partition Data via K-Fold CV',
          description: 'Split the training data into K folds (e.g., 5 folds).',
        },
        {
          step: 2,
          title: 'Generate Out-Of-Fold (OOF) Predictions',
          description: 'For each fold k, train base models on the remaining K-1 folds and predict on fold k. Stitch together predictions to form an N x M meta-feature matrix.',
        },
        {
          step: 3,
          title: 'Train Base Models on Full Dataset',
          description: 'Fit all M base models on the entire training set for use during test-time inference.',
        },
        {
          step: 4,
          title: 'Train Level-1 Meta-Learner',
          description: 'Fit a simple meta-estimator (e.g. Logistic Regression) on the OOF meta-features to predict the true target y.',
        },
      ],
    },
    mathematics: {
      overview: 'Stacked Generalization can be formalized as a two-stage hierarchical estimation framework.',
      foundations: [
        {
          name: 'Level-0 Base Estimator Mapping',
          latex: 'z_i = [\\hat{y}_i^{(1)}, \\hat{y}_i^{(2)}, \\dots, \\hat{y}_i^{(M)}]^T \\in \\mathbb{R}^M',
          explanation: 'where each component z_{im} = f_m^{(-k(i))}(x_i) is the prediction of base model m trained excluding the fold containing instance i.',
        },
        {
          name: 'Level-1 Meta-Learner Prediction',
          latex: '\\hat{y}_i = g(z_i; \\beta) = \\sigma\\left(\\beta_0 + \\sum_{m=1}^M \\beta_m z_{im}\\right)',
          explanation: 'The meta-learner g combines base model predictions z_i into the final output using learned parameters beta.',
        },
        {
          name: 'Out-Of-Fold (OOF) Loss Formulation',
          latex: '\\min_\\beta \\sum_{i=1}^N L\\left(y_i, g(f_1^{(-k(i))}(x_i), \\dots, f_M^{(-k(i))}(x_i); \\beta)\\right)',
          explanation: 'Guarantees the meta-learner is trained on predictions made on unseen data, completely preventing data leakage.',
        },
      ],
    },
    derivation: {
      title: 'Proof of Data Leakage in Naive Stacking',
      objective: 'Prove why generating meta-features directly on training data causes the meta-learner to assign 100% weight to overfitted models.',
      steps: [
        {
          step: 1,
          label: 'Consider a 1-Nearest Neighbor or Deep Tree base model',
          latex: 'f_{\\text{overfit}}(x_i) = y_i \\quad \\forall i \\in \\text{Train}',
          explanation: 'A 1-NN model memorizes training labels with 100% training accuracy (zero training error).',
        },
        {
          step: 2,
          label: 'Evaluate naive meta-feature matrix without OOF',
          latex: 'Z_{\\text{naive}} = [\\dots, y, \\dots]',
          explanation: 'The meta-feature column for the overfitted model is perfectly identical to the target vector y.',
        },
        {
          step: 3,
          label: 'Examine the meta-learner optimization',
          latex: '\\hat{y} = 0 \\cdot z_1 + 1.0 \\cdot z_{\\text{overfit}} + 0 \\cdot z_3',
          explanation: 'The meta-learner assigns all weight to the overfitted model and ignores all other models.',
        },
        {
          step: 4,
          label: 'Evaluate catastrophic test failure',
          latex: 'f_{\\text{overfit}}(x_{\\text{test}}) \\approx \\text{Random Noise} \\implies \\text{Meta Test Error} \\gg \\text{Base Models}',
          explanation: 'On unseen test data, the overfit model fails completely. OOF cross-validation solves this by ensuring meta-features reflect generalization error.',
        },
      ],
    },
    variables: [
      { symbol: 'M', name: 'Number of Base Learners', description: 'Total number of heterogeneous Level-0 models', dimensions: 'Scalar integer' },
      { symbol: 'K', name: 'Cross-Validation Folds', description: 'Number of folds used for Out-Of-Fold prediction generation', dimensions: 'Scalar integer (typically 5 or 10)' },
      { symbol: 'Z', name: 'Meta-Feature Matrix', description: 'Out-of-fold predictions from M base models on N training samples', dimensions: 'Matrix of shape (N, M)' },
      { symbol: '\\beta', name: 'Meta-Learner Weights', description: 'Coefficients assigned to each base model by the Level-1 learner', dimensions: 'Vector in R^M' },
    ],
    numericalExample: {
      scenario: 'A Level-1 Logistic Regression meta-learner combines predictions from 3 base models on an instance with true label y = 1.',
      dataset: [
        { model: 'Random Forest (z1)', prob_class_1: 0.85, meta_weight: 1.8 },
        { model: 'LightGBM (z2)', prob_class_1: 0.70, meta_weight: 1.2 },
        { model: 'Logistic Regression (z3)', prob_class_1: 0.40, meta_weight: -0.5 },
      ],
      calculations: [
        {
          step: 'Compute meta-learner logit (with intercept beta_0 = -1.5)',
          math: 'z_{\\text{meta}} = \\beta_0 + \\sum_{m=1}^3 \\beta_m z_m = -1.5 + (1.8 \\times 0.85) + (1.2 \\times 0.70) + (-0.5 \\times 0.40)',
          result: '-1.5 + 1.53 + 0.84 - 0.20 = 0.67',
        },
        {
          step: 'Compute final calibrated probability via sigmoid',
          math: 'P(y=1) = \\frac{1}{1 + e^{-0.67}} = \\frac{1}{1 + 0.5117}',
          result: '0.6615 (66.2% probability of class 1)',
        },
      ],
      finalConclusion: 'The meta-learner intelligently rewarded RF and LightGBM while discounting the underperforming linear model.',
    },
    visualExplanation: {
      title: 'Out-of-Fold (OOF) Stacking Pipeline Architecture',
      description: 'The visual diagram illustrates the 5-fold cross-validation grid. For each fold, 4 blocks are colored blue (training) and 1 block is orange (holdout validation). Predictions from the orange holdout blocks are vertically concatenated into a leak-free meta-feature column for that model.',
      features: [
        'K-Fold Grid: Generates unbiased meta-features covering 100% of the training dataset.',
        'Level-0 Base Layer: Diverse models (Tree, Neural Net, Linear, KNN).',
        'Level-1 Meta Layer: Simple regularized estimator (Ridge / Logistic Regression) to prevent second-level overfitting.',
      ],
    },
    scratchCode: {
      title: 'OOF Stacking Classifier from Scratch in Python',
      code: `import numpy as np
from sklearn.model_selection import KFold
from sklearn.base import clone
from sklearn.linear_model import LogisticRegression

class StackingClassifierScratch:
    def __init__(self, base_estimators, meta_estimator=None, n_splits=5):
        self.base_estimators = base_estimators
        self.meta_estimator = meta_estimator or LogisticRegression()
        self.n_splits = n_splits
        self.fitted_base_estimators = []

    def fit(self, X, y):
        n_samples = X.shape[0]
        n_models = len(self.base_estimators)
        # OOF meta-features matrix: shape (N, M)
        oof_features = np.zeros((n_samples, n_models))

        kf = KFold(n_splits=self.n_splits, shuffle=True, random_state=42)

        # 1. Generate OOF predictions
        for model_idx, base_clf in enumerate(self.base_estimators):
            for train_idx, val_idx in kf.split(X, y):
                clf = clone(base_clf)
                clf.fit(X[train_idx], y[train_idx])
                if hasattr(clf, "predict_proba"):
                    oof_features[val_idx, model_idx] = clf.predict_proba(X[val_idx])[:, 1]
                else:
                    oof_features[val_idx, model_idx] = clf.predict(X[val_idx])

        # 2. Fit Level-1 Meta-Learner on OOF predictions
        self.meta_estimator.fit(oof_features, y)

        # 3. Fit base estimators on FULL dataset for production inference
        self.fitted_base_estimators = []
        for base_clf in self.base_estimators:
            clf = clone(base_clf)
            clf.fit(X, y)
            self.fitted_base_estimators.append(clf)

        return self

    def predict(self, X):
        # Generate meta-features for test data
        meta_features = np.column_stack([
            clf.predict_proba(X)[:, 1] if hasattr(clf, "predict_proba") else clf.predict(X)
            for clf in self.fitted_base_estimators
        ])
        return self.meta_estimator.predict(meta_features)
`,
      explanation: 'Uses KFold to generate unbiased Out-Of-Fold probability features, fits the meta-learner on OOF predictions, and retrains base models on full data.',
    },
    sklearnCode: {
      title: 'Scikit-Learn StackingClassifier Implementation',
      code: `from sklearn.ensemble import StackingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)

# Heterogeneous Level-0 base estimators
base_learners = [
    ('rf', RandomForestClassifier(n_estimators=100, random_state=42)),
    ('knn', KNeighborsClassifier(n_neighbors=7)),
    ('svm', SVC(probability=True, random_state=42))
]

# Stacking with Logistic Regression meta-learner
stacking = StackingClassifier(
    estimators=base_learners,
    final_estimator=LogisticRegression(),
    cv=5,                     # 5-fold OOF generation
    passthrough=False,        # Set to True to concatenate original features X
    n_jobs=-1
)

stacking.fit(X, y)
print(f"Stacking Ensemble Accuracy: {stacking.score(X, y):.4f}")
print(f"Meta-Learner Coefficients:\\n{stacking.final_estimator_.coef_}")
`,
      explanation: 'Scikit-Learn’s StackingClassifier automatically manages internal OOF cross-validation and supports feature passthrough.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate Why Naive Stacking Overfits Without OOF
np.random.seed(42)
n_samples = 200

# Synthetic pure noise features (zero true signal)
X = np.random.randn(n_samples, 20)
y = np.random.binomial(1, 0.5, size=n_samples)

# A high-capacity 1-NN model memorizes training noise
from sklearn.neighbors import KNeighborsClassifier
nn1 = KNeighborsClassifier(n_neighbors=1).fit(X, y)

# Naive meta-features: predicted directly on training data
naive_meta_feature = nn1.predict(X)
naive_corr = np.corrcoef(naive_meta_feature, y)[0, 1]

# Out-of-fold meta-features: predicted on holdout folds
from sklearn.model_selection import cross_val_predict
oof_meta_feature = cross_val_predict(nn1, X, y, cv=5)
oof_corr = np.corrcoef(oof_meta_feature, y)[0, 1]

print("--- Data Leakage Simulation with 1-NN on Pure Noise ---")
print(f"Naive Training Feature Correlation with Target: {naive_corr:.4f} (Fatal False Signal!)")
print(f"OOF Feature Correlation with Target:           {oof_corr:.4f} (True Generalization Signal)")
print("OOF completely unmasks the overfit model as useless on unseen data!")
`,
      expectedOutput: `--- Data Leakage Simulation with 1-NN on Pure Noise ---
Naive Training Feature Correlation with Target: 1.0000 (Fatal False Signal!)
OOF Feature Correlation with Target:           -0.0801 (True Generalization Signal)
OOF completely unmasks the overfit model as useless on unseen data!`,
    },
    lineByLineExplanation: [
      {
        lines: '13-14',
        codeSnippet: 'naive_meta_feature = nn1.predict(X)\nnaive_corr = np.corrcoef(naive_meta_feature, y)[0, 1]',
        explanation: 'Shows that predicting on training data yields a 1.0 correlation, falsely deceiving any meta-learner into trusting an overfitted model.',
      },
      {
        lines: '18-19',
        codeSnippet: 'oof_meta_feature = cross_val_predict(nn1, X, y, cv=5)\noof_corr = np.corrcoef(oof_meta_feature, y)[0, 1]',
        explanation: 'Proves that OOF cross-validation reveals the model’s true negative correlation on unseen data, protecting the meta-learner.',
      },
    ],
    hyperparameters: [
      {
        name: 'final_estimator (meta-learner)',
        defaultVal: 'LogisticRegression() or RidgeCV()',
        range: 'Any linear or regularized estimator',
        effect: 'Determines how Level-0 predictions are combined. Simple regularized linear models prevent Level-2 overfitting.',
        recommendation: 'Use LogisticRegression(C=1.0) or RidgeCV; avoid deep trees or complex models as meta-learners.',
      },
      {
        name: 'passthrough',
        defaultVal: 'False',
        range: '[True, False]',
        effect: 'When True, the meta-learner receives both the base model predictions Z AND the original features X.',
        recommendation: 'Set to True when base models specialize in different feature subspaces.',
      },
      {
        name: 'cv',
        defaultVal: '5',
        range: '3 to 10',
        effect: 'Number of cross-validation folds for OOF prediction generation.',
        recommendation: 'Use 5 or 10 stratified folds.',
      },
    ],
    assumptions: [
      {
        assumption: 'Base Learner Architectural Diversity',
        whyItMatters: 'Stacking identical models (e.g. 3 XGBoost models with different seeds) yields high collinearity in meta-features with minimal performance boost.',
        howToVerify: 'Include diverse algorithm paradigms: gradient boosted trees, linear regularized models, support vector machines, and neural networks.',
      },
      {
        assumption: 'Strict OOF Discipline',
        whyItMatters: 'Any data leakage from test or validation sets into Level-0 training invalidates the Level-1 meta-model weights.',
        howToVerify: 'Ensure cross-validation splits are created outside preprocessing pipelines.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using a complex non-linear model (like a deep Random Forest) as the Level-1 meta-estimator.',
        solution: 'Complex meta-learners overfit the small meta-feature space. Use Ridge or Logistic Regression with L2 regularization.',
      },
      {
        mistake: 'Generating meta-features by calling `model.predict(X_train)` directly.',
        solution: 'Never train meta-models on in-sample predictions. Always use Out-Of-Fold (OOF) cross-validation.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Kaggle Competitions', application: 'Winning Grandmaster Ensembles', benefit: 'Multi-layer stacking combining LightGBM, CatBoost, and Deep Neural Networks consistently captures 1st place medals.' },
      { industry: 'Real Estate Valuation', application: 'Automated Valuation Models (AVMs)', benefit: 'Blends geospatial spatial regression, tree boosters, and hedonic pricing models to estimate home prices.' },
      { industry: 'Energy Trading', application: 'Wind & Solar Grid Power Output Forecasting', benefit: 'Combines meteorological numerical weather models with machine learning time-series models.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-6-8-1',
        question: 'What is the critical difference between Stacking and Blending?',
        hint: 'How are the validation meta-features generated in each?',
        answer: 'Stacking uses K-Fold Out-Of-Fold (OOF) cross-validation to generate meta-features for the entire training set (100% data efficiency). Blending simply holds out a single fixed validation set (e.g. 20% holdout) to train the meta-learner, which is simpler but discards data.',
      },
      {
        id: 'pq-6-8-2',
        question: 'Why should the Level-1 meta-estimator almost always be a simple linear model like Ridge or Logistic Regression?',
        hint: 'Consider the dimensionality of the meta-feature space.',
        answer: 'Because the meta-feature space has very few dimensions (typically 3 to 10 base models) and models are often correlated. A complex non-linear model would easily overfit the meta-features, whereas an L2-regularized linear model finds the optimal stable weighting.',
      },
      {
        id: 'pq-6-8-3',
        question: 'What does setting `passthrough=True` in scikit-learn StackingClassifier do?',
        hint: 'Look at the input feature matrix passed to the final estimator.',
        answer: 'It concatenates the original input features X with the Level-0 predictions Z, allowing the meta-learner to condition its model weights on the original feature context.',
      },
    ],
    quiz: [
      {
        id: 'q-6-8-1',
        question: 'What catastrophic failure occurs if you train a Stacking meta-model directly on in-sample training predictions instead of Out-Of-Fold (OOF) predictions?',
        options: [
          'Training takes 100x longer.',
          'The meta-model severely overfits by assigning 100% weight to whichever base model memorized the training set.',
          'The code throws a syntax error.',
          'The base models forget their weights.',
        ],
        correctIndex: 1,
        explanation: 'In-sample predictions contain training memorization. Overfitted base models appear artificially perfect, leading the meta-model to trust them completely and fail catastrophically on test data.',
      },
      {
        id: 'q-6-8-2',
        question: 'Who originally invented Stacked Generalization?',
        options: [
          'Leo Breiman (1996)',
          'David Wolpert (1992)',
          'Jerome Friedman (2001)',
          'Yoav Freund (1995)',
        ],
        correctIndex: 1,
        explanation: 'David Wolpert introduced Stacked Generalization in his seminal 1992 Neural Networks paper.',
      },
      {
        id: 'q-6-8-3',
        question: 'Which of the following base model combinations is most likely to produce a strong Stacking ensemble?',
        options: [
          '3 Decision Trees with max_depth=3 and different random seeds.',
          'LightGBM, Logistic Regression, and a Multi-Layer Perceptron (Neural Net).',
          '3 identical Ridge Regression models.',
          '100 identical stumps.',
        ],
        correctIndex: 1,
        explanation: 'Stacking requires architectural diversity. Combining a gradient booster (non-linear trees), a linear model (smooth global trend), and a neural network (embedding representations) maximizes complementary strengths.',
      },
    ],
    independentExercise: {
      title: 'Build a Multi-Model Stacking Classifier',
      problem: 'Use `sklearn.ensemble.StackingClassifier` on the Wine dataset. Combine `RandomForestClassifier`, `SVC(probability=True)`, and `KNeighborsClassifier` with a `LogisticRegression` meta-learner. Compare Stacking accuracy with each individual base model.',
      hints: ['from sklearn.datasets import load_wine', 'Fit each base model individually and compare with StackingClassifier'],
      starterCode: `from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.ensemble import StackingClassifier, RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression

X, y = load_wine(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# TODO: Fit base models and StackingClassifier, compare test accuracies
`,
      solution: `from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.ensemble import StackingClassifier, RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression

X, y = load_wine(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

rf = RandomForestClassifier(n_estimators=50, random_state=42).fit(X_train, y_train)
knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
svm = SVC(probability=True, random_state=42).fit(X_train, y_train)

stack = StackingClassifier(
    estimators=[('rf', rf), ('knn', knn), ('svm', svm)],
    final_estimator=LogisticRegression(max_iter=1000),
    cv=5
).fit(X_train, y_train)

print(f"Random Forest Test Acc: {rf.score(X_test, y_test):.4f}")
print(f"KNN Test Acc:           {knn.score(X_test, y_test):.4f}")
print(f"SVM Test Acc:           {svm.score(X_test, y_test):.4f}")
print(f"Stacking Ensemble Acc:  {stack.score(X_test, y_test):.4f} (Combines all three!)")
`,
    },
    summary: {
      keyTakeaways: [
        'Stacking trains a meta-learner to combine predictions from diverse, heterogeneous base models.',
        'Out-Of-Fold (OOF) prediction generation is mandatory to prevent severe data leakage and overfitting in the meta-feature matrix.',
        'A simple regularized linear meta-learner (e.g. Ridge or Logistic Regression) guarantees robust and stable Level-1 aggregation.',
      ],
      nextLessonId: 'feature-importance-shap',
      nextLessonTitle: 'Feature Importance & TreeSHAP Interpretability',
      nextLessonModuleId: 'module-6',
    },
  },

  'feature-importance-shap': {
    id: 'feature-importance-shap',
    moduleId: 'module-6',
    title: 'Feature Importance & TreeSHAP Interpretability',
    subtitle: 'MDI Impurity Bias, Permutation Importance & Cooperative Game-Theoretic Shapley Values',
    order: 9,
    readTimeMinutes: 26,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Deconstruct the severe limitations and high-cardinality bias of Mean Decrease Impurity (MDI).',
      'Implement model-agnostic Permutation Feature Importance.',
      'Derive Shapley values from cooperative game theory and verify the 4 fundamental axioms: Efficiency, Symmetry, Dummy, and Additivity.',
      'Explain how TreeSHAP optimizes Shapley value computation from O(TL 2^p) to polynomial O(TL D^2) time.',
    ],
    prerequisites: ['random-forests', 'gradient-boosting', 'Combinatorics fundamentals'],
    previousLesson: {
      id: 'voting-stacking-blending',
      title: 'Voting, Stacking & Blending Architectures',
      moduleId: 'module-6',
    },
    analogy: {
      title: 'Fair Prize Allocation in Championship Soccer',
      text: 'A soccer team wins the Champions League tournament and receives a $10 million bonus. How should the money be divided fairly among the 11 players? You cannot simply award everything to the striker who scored the final goal, because the goalkeeper saved three penalties and the midfielders orchestrated every play. Lloyd Shapley solved this exact problem in 1953: measure the marginal contribution of each player across all possible coalitions (subsets of teammates) they could have played with.',
      metaphor: 'SHAP computes the fair marginal contribution of each feature to a model’s prediction across all possible feature coalitions.',
    },
    problemSolved: {
      title: 'Why Standard Feature Importances Mislead Engineers',
      description: 'Default Random Forest feature importances (Gini importance / MDI) are notoriously misleading: they artificially overvalue random numerical noise and categorical variables with many levels, creating false confidence in irrelevant features.',
      keyPoints: [
        'Exposes MDI cardinality bias and proves why it fails on uninformative high-cardinality features.',
        'Permutation importance evaluates the true drop in test performance when feature associations are broken.',
        'SHAP provides mathematically unique, locally accurate and globally consistent feature attributions.',
      ],
    },
    intuition: {
      overview: 'Feature importance answers: "How much did feature j influence the prediction?" MDI counts impurity drops; Permutation shuffles features and measures metric decay; SHAP uses cooperative game theory to compute exact fair credit.',
      steps: [
        {
          step: 1,
          title: 'Mean Decrease Impurity (MDI)',
          description: 'Sum the weighted Gini or MSE decreases across all nodes in all trees where feature j was chosen for a split.',
        },
        {
          step: 2,
          title: 'Permutation Importance',
          description: 'Shuffle column j randomly to break its relationship with target y, and measure the decrease in validation score.',
        },
        {
          step: 3,
          title: 'Shapley Values',
          description: 'Compute the average marginal contribution of feature j across all possible subsets (coalitions) S of remaining features.',
        },
      ],
    },
    mathematics: {
      overview: 'Lloyd Shapley’s 1953 formula represents the unique attribution method that satisfies the four desirable fairness axioms.',
      foundations: [
        {
          name: 'Classic Shapley Value Formula',
          latex: '\\phi_i(v) = \\sum_{S \\subseteq F \\setminus \\{i\\}} \\frac{|S|!(|F| - |S| - 1)!}{|F|!} \\left[ v(S \\cup \\{i\\}) - v(S) \\right]',
          explanation: 'where F is the set of all features, S is a coalition excluding feature i, and v(S) is the prediction using only features in S.',
        },
        {
          name: 'The Four Fundamental Shapley Axioms',
          latex: '\\text{Efficiency: } \\sum_{i=1}^p \\phi_i = f(x) - E[f(x)], \\quad \\text{Symmetry: } v(S \\cup i) = v(S \\cup j) \\implies \\phi_i = \\phi_j',
          explanation: 'Efficiency guarantees all attributions sum to the total difference from baseline. Dummy: features with 0 marginal contribution get phi = 0. Additivity: phi(u + v) = phi(u) + phi(v).',
        },
        {
          name: 'Permutation Feature Importance Metric Drop',
          latex: 'I(f_j) = L(X^{\\text{permuted } j}, y) - L(X, y)',
          explanation: 'Difference in validation loss after randomly permuting the values of feature j in the test set.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Exact Shapley Value on a 2-Feature Coalition',
      objective: 'Calculate the exact Shapley values phi_1 and phi_2 and verify the Efficiency axiom.',
      steps: [
        {
          step: 1,
          label: 'Define baseline expectation and coalition values',
          latex: 'v(\\emptyset) = 10, \\quad v(\\{1\\}) = 14, \\quad v(\\{2\\}) = 12, \\quad v(\\{1, 2\\}) = 18',
          explanation: 'Baseline prediction with no features is 10; prediction with both features is 18 (Total difference = 18 - 10 = 8).',
        },
        {
          step: 2,
          label: 'Compute marginal contributions for Feature 1',
          latex: '\\text{Coalition } S = \\emptyset: \\quad v(\\{1\\}) - v(\\emptyset) = 14 - 10 = 4; \\quad \\text{Weight: } \\frac{0!(2 - 0 - 1)!}{2!} = \\frac{1}{2}',
          explanation: 'Feature 1 enters first with 50% probability in permutation order (1, 2).',
        },
        {
          step: 3,
          label: 'Compute marginal contribution when Feature 2 is already present',
          latex: '\\text{Coalition } S = \\{2\\}: \\quad v(\\{1, 2\\}) - v(\\{2\\}) = 18 - 12 = 6; \\quad \\text{Weight: } \\frac{1!(2 - 1 - 1)!}{2!} = \\frac{1}{2}',
          explanation: 'Feature 1 enters second with 50% probability in permutation order (2, 1).',
        },
        {
          step: 4,
          label: 'Sum to find phi_1 and phi_2',
          latex: '\\phi_1 = \\frac{1}{2}(4) + \\frac{1}{2}(6) = 5.0; \\quad \\phi_2 = \\frac{1}{2}(12 - 10) + \\frac{1}{2}(18 - 14) = \\frac{1}{2}(2) + \\frac{1}{2}(4) = 3.0',
          explanation: 'Feature 1 contributes 5.0 and Feature 2 contributes 3.0.',
        },
        {
          step: 5,
          label: 'Verify the Efficiency Axiom',
          latex: '\\phi_1 + \\phi_2 = 5.0 + 3.0 = 8.0 = v(\\{1, 2\\}) - v(\\emptyset) = 18 - 10 = 8.0',
          explanation: 'The sum of Shapley values exactly equals the net prediction difference from the baseline expectation.',
        },
      ],
    },
    variables: [
      { symbol: '\\phi_i', name: 'Shapley Value', description: 'Attribution score reflecting feature i’s fair contribution to prediction f(x)', dimensions: 'Scalar (same units as model output)' },
      { symbol: 'F', name: 'Feature Set', description: 'Total set of all p input features', dimensions: 'Set of cardinality p' },
      { symbol: 'S', name: 'Feature Coalition', description: 'Subset of features excluding feature i', dimensions: 'Subset of F' },
      { symbol: 'v(S)', name: 'Characteristic Function', description: 'Model prediction conditioned on observing only features in coalition S', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Verify MDI High-Cardinality Bias: Compare MDI vs Permutation Importance on a synthetic dataset with a pure random noise feature containing 1,000 unique values.',
      dataset: [
        { feature: 'Informative Feature (True Signal)', true_importance: 'HIGH', unique_vals: 5 },
        { feature: 'Random Noise ID (Zero Signal)', true_importance: 'NONE (Noise)', unique_vals: 1000 },
      ],
      calculations: [
        {
          step: 'Evaluate Gini Impurity splits on Random Noise ID',
          math: '\\text{Because noise ID has 1000 unique cut points, tree splits on it repeatedly to isolate samples}',
          result: 'MDI Gini Importance falsely reports Noise ID as #1 feature (58% importance)!',
        },
        {
          step: 'Evaluate Permutation Importance on Random Noise ID',
          math: 'I(\\text{Noise ID}) = \\text{Score}(\\text{permuted}) - \\text{Score}(\\text{original}) \\approx 0.82 - 0.82',
          result: 'Permutation Importance correctly reports 0.000 (Correctly unmasked as useless!)',
        },
      ],
      finalConclusion: 'MDI falsely elevates high-cardinality noise, whereas Permutation Importance and SHAP accurately report zero importance.',
    },
    visualExplanation: {
      title: 'SHAP Waterfall and Summary Plots',
      description: 'The SHAP waterfall plot shows how an individual prediction is built up from the base expected value E[f(x)]. Red arrows push the prediction higher (positive attribution), while blue arrows push it lower (negative attribution). The SHAP beeswarm summary plot combines feature importance with effect direction across the entire dataset.',
      features: [
        'Waterfall Plot: Local explanation decomposing a single loan or medical prediction.',
        'Beeswarm Summary: Global feature impact ranking combined with feature value color coding.',
        'Efficiency Property: All arrows sum up exactly to f(x) - E[f(x)].',
      ],
    },
    scratchCode: {
      title: 'Permutation Feature Importance from Scratch in NumPy',
      code: `import numpy as np

def permutation_importance_scratch(model, X_val, y_val, metric_fn, n_repeats=5, random_state=42):
    """
    Compute Permutation Feature Importance:
    Measures the drop in metric_fn after randomly shuffling each feature column.
    """
    rng = np.random.RandomState(random_state)
    baseline_score = metric_fn(y_val, model.predict(X_val))
    n_features = X_val.shape[1]
    importances = np.zeros((n_features, n_repeats))

    for col in range(n_features):
        for rep in range(n_repeats):
            X_perm = X_val.copy()
            # Shuffle only column 'col'
            X_perm[:, col] = rng.permutation(X_perm[:, col])
            perm_score = metric_fn(y_val, model.predict(X_perm))
            # Drop in score indicates importance
            importances[col, rep] = baseline_score - perm_score

    mean_importance = np.mean(importances, axis=1)
    std_importance = np.std(importances, axis=1)
    return mean_importance, std_importance
`,
      explanation: 'Evaluates baseline performance, shuffles one feature column at a time across n_repeats, and records the metric decay.',
    },
    sklearnCode: {
      title: 'Permutation Importance & TreeSHAP in Python',
      code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import pandas as pd

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

rf = RandomForestClassifier(n_estimators=100, random_state=42).fit(X_train, y_train)

# 1. Scikit-Learn Permutation Importance
perm_imp = permutation_importance(rf, X_test, y_test, n_repeats=10, random_state=42)
print("Top 3 Features by Permutation Importance:")
top_indices = perm_imp.importances_mean.argsort()[::-1][:3]
for idx in top_indices:
    print(f"Feature {idx:2d}: Mean Score Drop = {perm_imp.importances_mean[idx]:.4f}")

# 2. TreeSHAP (TreeExplainer)
# import shap
# explainer = shap.TreeExplainer(rf)
# shap_values = explainer.shap_values(X_test)
# shap.summary_plot(shap_values, X_test)
`,
      explanation: 'Uses scikit-learn permutation_importance on holdout test data and illustrates TreeSHAP explainer setup.',
    },
    runnableCode: {
      code: `import numpy as np

# Exact Shapley Value Computation for 2 Features
v_empty = 10.0
v_1 = 14.0
v_2 = 12.0
v_12 = 18.0

# Permutation 1: Feature 1 enters first (empty -> {1}), Feature 2 enters second ({1} -> {1, 2})
marginal_1_perm1 = v_1 - v_empty    # 14 - 10 = 4.0
marginal_2_perm1 = v_12 - v_1       # 18 - 14 = 4.0

# Permutation 2: Feature 2 enters first (empty -> {2}), Feature 1 enters second ({2} -> {1, 2})
marginal_2_perm2 = v_2 - v_empty    # 12 - 10 = 2.0
marginal_1_perm2 = v_12 - v_2       # 18 - 12 = 6.0

# Shapley values are the averages across all permutations (each with probability 1/2)
phi_1 = 0.5 * (marginal_1_perm1 + marginal_1_perm2)
phi_2 = 0.5 * (marginal_2_perm1 + marginal_2_perm2)

print(f"Feature 1 Marginal Contributions: [Order (1,2): {marginal_1_perm1}, Order (2,1): {marginal_1_perm2}]")
print(f"Feature 2 Marginal Contributions: [Order (1,2): {marginal_2_perm1}, Order (2,1): {marginal_2_perm2}]")
print(f"\\nShapley Value phi_1: {phi_1:.2f}")
print(f"Shapley Value phi_2: {phi_2:.2f}")

# Check Efficiency Axiom
total_attribution = phi_1 + phi_2
total_gain = v_12 - v_empty
print(f"\\nTotal Attribution (phi_1 + phi_2): {total_attribution:.2f}")
print(f"Total Model Output Shift:        {total_gain:.2f}")
print(f"Efficiency Axiom Satisfied?       {total_attribution == total_gain}")
`,
      expectedOutput: `Feature 1 Marginal Contributions: [Order (1,2): 4.0, Order (2,1): 6.0]
Feature 2 Marginal Contributions: [Order (1,2): 4.0, Order (2,1): 2.0]

Shapley Value phi_1: 5.00
Shapley Value phi_2: 3.00

Total Attribution (phi_1 + phi_2): 8.00
Total Model Output Shift:        8.00
Efficiency Axiom Satisfied?       True`,
    },
    lineByLineExplanation: [
      {
        lines: '9-14',
        codeSnippet: 'marginal_1_perm1 = v_1 - v_empty\n...\nmarginal_1_perm2 = v_12 - v_2',
        explanation: 'Computes the marginal contribution of each feature across both possible permutation arrival orders (1, 2) and (2, 1).',
      },
      {
        lines: '17-18',
        codeSnippet: 'phi_1 = 0.5 * (marginal_1_perm1 + marginal_1_perm2)\nphi_2 = 0.5 * (marginal_2_perm1 + marginal_2_perm2)',
        explanation: 'Averages the marginal contributions to obtain the exact game-theoretic Shapley values.',
      },
      {
        lines: '25-28',
        codeSnippet: 'total_attribution = phi_1 + phi_2\n... == total_gain',
        explanation: 'Verifies the fundamental Efficiency axiom: the sum of feature attributions strictly equals the difference between model output and baseline expectation.',
      },
    ],
    hyperparameters: [
      {
        name: 'n_repeats (Permutation Importance)',
        defaultVal: '5',
        range: '5 to 30',
        effect: 'Number of times each feature column is permuted to compute mean and standard error of metric decay.',
        recommendation: 'Use 10 repeats for stable importance rankings.',
      },
      {
        name: 'model_output (TreeSHAP)',
        defaultVal: "'raw'",
        range: "['raw', 'probability', 'log_loss']",
        effect: 'Specifies which output space SHAP values explain. In classification, explaining margin log-odds satisfies exact additivity.',
        recommendation: "Use 'raw' (log-odds) for mathematical additivity or 'probability' for business stakeholder presentations.",
      },
    ],
    assumptions: [
      {
        assumption: 'Feature Independence Under Permutation',
        whyItMatters: 'Permuting a feature correlated with another feature creates unrealistic, out-of-distribution synthetic data points (e.g. Height=7ft, Weight=80lbs), potentially distorting permutation importance.',
        howToVerify: 'Inspect feature correlation matrix; use TreeSHAP or grouped permutation importance when collinearity is high.',
      },
      {
        assumption: 'Model-Agnostic vs Tree-Specific Explanations',
        whyItMatters: 'KernelSHAP works on any black-box model but is slow (exponential sampling); TreeSHAP requires decision tree ensembles but runs in polynomial time.',
        howToVerify: 'Verify model is a tree ensemble (RF, XGBoost, LightGBM, CatBoost) to use TreeSHAP.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using default Random Forest Gini Importance (MDI) to make critical business decisions.',
        solution: 'Never rely on MDI for feature selection. It is biased toward continuous features and high-cardinality IDs. Use Permutation Importance or TreeSHAP.',
      },
      {
        mistake: 'Computing Permutation Importance on the training dataset instead of a held-out test set.',
        solution: 'Computing permutation importance on training data rewards overfitted features. Always evaluate permutation importance on holdout test or validation data.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Banking & Lending Compliance', application: 'Adverse Action Regulatory Explanations (FCRA)', benefit: 'US Fair Credit Reporting Act requires explaining exact reasons for loan denials; SHAP waterfall plots provide legally auditable reasons.' },
      { industry: 'Healthcare & Oncology', application: 'Patient Survival Risk Factor Attribution', benefit: 'Explains why a specific cancer patient has an elevated mortality risk score, guiding targeted clinical interventions.' },
      { industry: 'Human Resources', application: 'Employee Attrition Drivers', benefit: 'Identifies whether salary, commute distance, or manager tenure is the primary driver of talent departures.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-6-9-1',
        question: 'Why does Mean Decrease Impurity (MDI) exhibit severe cardinality bias?',
        hint: 'How many split thresholds are available for a feature with 10,000 unique values versus a binary feature?',
        answer: 'A high-cardinality feature provides thousands of candidate split thresholds. Even if the feature is pure random noise, greedy decision trees can easily find accidental thresholds that reduce sample impurity, falsely inflating its MDI score.',
      },
      {
        id: 'pq-6-9-2',
        question: 'What is the Efficiency Axiom in Shapley values?',
        hint: 'What must the sum of all phi_i equal?',
        answer: 'The Efficiency axiom states that the sum of Shapley values across all features must equal the difference between the model prediction f(x) and the expected baseline prediction E[f(x)]: sum(phi_i) = f(x) - E[f(x)].',
      },
      {
        id: 'pq-6-9-3',
        question: 'How did Scott Lundberg’s TreeSHAP make Shapley value calculation tractable for tree ensembles?',
        hint: 'Compare exponential time O(2^p) with tree depth D.',
        answer: 'Standard Shapley calculation requires evaluating 2^p coalitions (exponential in features). TreeSHAP recursively tracks the proportion of training instances that flow down each tree branch in O(T * L * D^2) polynomial time, where D is maximum tree depth.',
      },
    ],
    quiz: [
      {
        id: 'q-6-9-1',
        question: 'Which of the following feature importance methods should NEVER be computed on the training dataset?',
        options: [
          'Permutation Feature Importance',
          'Mean Decrease Impurity (MDI)',
          'Linear Regression coefficients',
          'Tree split counts',
        ],
        correctIndex: 0,
        explanation: 'Permutation importance measures how model generalization degrades when feature relationships are severed. If computed on training data, it rewards models for memorizing noise.',
      },
      {
        id: 'q-6-9-2',
        question: 'Which axiom guarantees that two features that make identical marginal contributions to all coalitions receive identical Shapley values?',
        options: [
          'Efficiency Axiom',
          'Symmetry Axiom',
          'Dummy Player Axiom',
          'Additivity Axiom',
        ],
        correctIndex: 1,
        explanation: 'The Symmetry axiom guarantees equal credit: if v(S union {i}) = v(S union {j}) for all coalitions S, then phi_i = phi_j.',
      },
      {
        id: 'q-6-9-3',
        question: 'What is the time complexity reduction achieved by TreeSHAP over exact KernelSHAP for an ensemble with p features and max depth D?',
        options: [
          'From O(p^2) to O(p)',
          'From exponential O(2^p) to polynomial O(T * L * D^2)',
          'From O(N^3) to O(N)',
          'No reduction; they have identical complexity',
        ],
        correctIndex: 1,
        explanation: 'TreeSHAP exploits the internal conditional structure of decision trees, reducing exponential time O(2^p) to polynomial time in tree depth O(T * L * D^2).',
      },
    ],
    independentExercise: {
      title: 'Compare MDI vs Permutation Importance on a Synthetic Noise Feature',
      problem: 'Generate a dataset where feature 0 has true predictive signal, but feature 1 is a random ID with 500 unique integer categories. Train a `RandomForestClassifier` and print both MDI `feature_importances_` and `permutation_importance` to prove MDI bias.',
      hints: ['X[:, 1] = np.random.randint(0, 500, size=len(X))', 'Compare rf.feature_importances_ with perm_importance.importances_mean'],
      starterCode: `import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split

np.random.seed(42)
n_samples = 500

# Feature 0: True signal (y = x0 > 0)
X0 = np.random.randn(n_samples, 1)
y = (X0.ravel() > 0).astype(int)

# Feature 1: High-cardinality random noise ID
X1 = np.random.randint(0, 500, size=(n_samples, 1))
X = np.hstack([X0, X1])

# TODO: Fit Random Forest and compare MDI vs Permutation Importance
`,
      solution: `import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split

np.random.seed(42)
n_samples = 500

# Feature 0: True signal
X0 = np.random.randn(n_samples, 1)
y = (X0.ravel() > 0).astype(int)

# Feature 1: High-cardinality random noise ID
X1 = np.random.randint(0, 500, size=(n_samples, 1))
X = np.hstack([X0, X1])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

rf = RandomForestClassifier(n_estimators=100, random_state=42).fit(X_train, y_train)

# MDI (Gini)
mdi = rf.feature_importances_

# Permutation Importance on Test Set
perm = permutation_importance(rf, X_test, y_test, n_repeats=10, random_state=42)

print(f"MDI Importance:         Feature 0 (Signal) = {mdi[0]:.4f} | Feature 1 (Noise ID) = {mdi[1]:.4f} (MDI biased!)")
print(f"Permutation Importance: Feature 0 (Signal) = {perm.importances_mean[0]:.4f} | Feature 1 (Noise ID) = {perm.importances_mean[1]:.4f} (Unmasked!)")
`,
    },
    summary: {
      keyTakeaways: [
        'Default Gini importance (MDI) is heavily biased toward high-cardinality features and uninformative continuous noise.',
        'Permutation feature importance measures true validation score decay when feature associations are broken.',
        'Shapley values from cooperative game theory provide the only mathematically unique attribution method satisfying Efficiency, Symmetry, Dummy, and Additivity axioms.',
      ],
      nextLessonId: 'clustering-foundations',
      nextLessonTitle: 'Clustering Foundations & Partitioning Principles',
      nextLessonModuleId: 'module-7',
    },
  },
};
