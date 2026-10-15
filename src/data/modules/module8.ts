import { LessonContent, ModuleData } from '@/lib/types';

export const module8Data: ModuleData = {
  id: 'module-8',
  number: 8,
  title: 'Advanced Classical ML & Real-World Challenges',
  subtitle: 'Feature Selection, Explainable AI, Cost-Sensitive Learning, Fairness, Drift & Time Series',
  description: 'Tackle industry-grade machine learning challenges: Filter/Wrapper/Embedded feature selection with Boruta, LIME local surrogates & TreeSHAP interactions, asymmetric cost-sensitive matrices, algorithmic fairness metrics (Demographic Parity & Equalized Odds), Concept and Data Drift detection with Evidently & KS-tests, and feature engineering for Time Series forecasting.',
  icon: 'Shield',
  badge: 'Production Challenges',
  estimatedHours: 14,
  topicsCount: 6,
  lessons: [
    {
      id: 'advanced-feature-selection',
      moduleId: 'module-8',
      title: 'Advanced Feature Selection: Filter, Wrapper, Embedded & Boruta',
      description: 'Mutual Information entropy, Recursive Feature Elimination (RFE), Lasso sparsity, and Boruta shadow feature permutation tests.',
      order: 1,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'explainable-ai-shap-lime',
      moduleId: 'module-8',
      title: 'Explainable AI (XAI): LIME Local Surrogates & SHAP Interactions',
      description: 'LIME perturbation kernels, local linear fidelity, SHAP interaction values, and interpreting complex black-box models.',
      order: 2,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
    {
      id: 'cost-sensitive-learning',
      moduleId: 'module-8',
      title: 'Cost-Sensitive Learning & Asymmetric Error Optimization',
      description: 'Business cost matrices, optimal Bayes decision thresholds tau*, sample re-weighting, and maximizing expected ROI.',
      order: 3,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'fairness-bias-ethics',
      moduleId: 'module-8',
      title: 'Algorithmic Fairness, Bias & Ethical Machine Learning',
      description: 'Demographic Parity, Equalized Odds, Disparate Impact 80% rule, and the mathematical impossibility theorem of fairness.',
      order: 4,
      readTimeMinutes: 25,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'data-and-concept-drift',
      moduleId: 'module-8',
      title: 'Data Drift, Concept Drift & Model Monitoring',
      description: 'Covariate shift vs concept drift, Kolmogorov-Smirnov (KS) two-sample tests, Population Stability Index (PSI), and alerting.',
      order: 5,
      readTimeMinutes: 25,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'time-series-machine-learning',
      moduleId: 'module-8',
      title: 'Time Series Machine Learning: Lags, Windows & Leakage Prevention',
      description: 'Autoregressive lag features, rolling window aggregates, exponential smoothing, and Purged TimeSeriesSplit cross-validation.',
      order: 6,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

export const module8Lessons: Record<string, LessonContent> = {
  'advanced-feature-selection': {
    id: 'advanced-feature-selection',
    moduleId: 'module-8',
    title: 'Advanced Feature Selection: Filter, Wrapper, Embedded & Boruta',
    subtitle: 'Mutual Information, RFE Elimination & The Boruta Shadow Feature Algorithm',
    order: 1,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Categorize feature selection into Filter, Wrapper, and Embedded methodologies.',
      'Compute continuous Mutual Information I(X; Y) using k-NN entropy estimators.',
      'Understand Recursive Feature Elimination (RFE) and cross-validated RFECV.',
      'Master the Boruta algorithm: shadow feature permutations and binomial hypothesis testing.',
    ],
    prerequisites: ['module-2 Data Preprocessing', 'module-6 Ensemble Learning', 'Information Theory'],
    previousLesson: {
      id: 'anomaly-detection',
      title: 'Anomaly Detection: Isolation Forest & LOF',
      moduleId: 'module-7',
    },
    analogy: {
      title: 'The Elite Special Forces Packing List',
      text: 'A soldier preparing for a 30-day solitary Arctic mission cannot pack everything. They use three strategies: 1) Filter Method: Throw away any item weighing over 50 lbs without testing (fast heuristic). 2) Wrapper Method: Put on the backpack, run 5 miles, take off the least useful item, and repeat (thorough, slow). 3) Boruta Shadow Method: Pack identical dummy replica items made of cardboard alongside real tools; if a real tool performs no better than its cardboard replica, it is immediately discarded.',
      metaphor: 'Feature selection eliminates noisy, redundant variables to maximize generalization, reduce inference latency, and enhance interpretability.',
    },
    problemSolved: {
      title: 'Eliminating the Curse of Dimensionality and Noisy Features',
      description: 'Modern datasets frequently contain thousands of raw columns, but only a small subset carries true predictive signal. Including irrelevant features increases model variance, slows training, causes overfitting, and inflates cloud serving costs.',
      keyPoints: [
        'Filter methods rank features independently using statistical metrics in O(N * p) time.',
        'Wrapper methods (RFE) optimize feature subsets directly for a specific model architecture.',
        'Boruta solves the all-relevant feature problem by comparing features against randomized shadow copies.',
      ],
    },
    intuition: {
      overview: 'Feature selection methods operate at three levels of complexity: Filter methods rank features before modeling; Wrapper methods search combinatorially through feature subsets; Embedded methods perform selection during model fitting (e.g. Lasso or Tree splits). Boruta statistically proves whether a feature is genuinely better than random noise.',
      steps: [
        {
          step: 1,
          title: 'Create Shadow Features (Boruta)',
          description: 'Duplicate all p features and randomly shuffle their values across samples to destroy all relationship with target y.',
        },
        {
          step: 2,
          title: 'Train Random Forest on Extended Dataset',
          description: 'Fit a Random Forest on [X, X_shadow] and compute Z-score feature importances.',
        },
        {
          step: 3,
          title: 'Benchmark Against Maximum Shadow Importance',
          description: 'Find the maximum importance score among all shadow features (Z_max_shadow). A real feature achieves a "Hit" if Z_real > Z_max_shadow.',
        },
        {
          step: 4,
          title: 'Binomial Hypothesis Testing',
          description: 'Repeat across iterations. Accept features with significantly more hits than expected by random chance (p = 0.5); reject and prune lagging features.',
        },
      ],
    },
    mathematics: {
      overview: 'Feature selection combines non-parametric information theory (Mutual Information) with binomial hypothesis testing.',
      foundations: [
        {
          name: 'Mutual Information for Feature Selection',
          latex: 'I(X; Y) = H(Y) - H(Y \\mid X) = \\iint p(x, y) \\ln \\left( \\frac{p(x, y)}{p(x)p(y)} \\right) dx dy',
          explanation: 'Measures the reduction in uncertainty of target Y given knowledge of feature X. Captures arbitrary non-linear dependencies, unlike linear Pearson correlation.',
        },
        {
          name: 'Boruta Binomial Test for Feature Confirmation',
          latex: 'P(K \\ge k) = \\sum_{j=k}^M \\binom{M}{j} (0.5)^j (0.5)^{M - j}',
          explanation: 'Under the null hypothesis that a feature has zero signal, the probability of beating the maximum shadow feature in M trials follows a Binomial(M, 0.5) distribution.',
        },
        {
          name: 'Lasso L1 Sparsity Condition',
          latex: '\\min_w \\frac{1}{2N} \\|y - Xw\\|^2 + \\lambda \\sum_{j=1}^p |w_j|',
          explanation: 'The sharp non-differentiable corner of the L1 diamond ball at w_j = 0 forces uninformative feature weights to become exactly zero.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Boruta Feature Confirmation via Binomial Critical Values',
      objective: 'Calculate the minimum number of hits k required across M=20 iterations to confirm a feature at alpha = 0.01 significance.',
      steps: [
        {
          step: 1,
          label: 'Define the Null Hypothesis H_0',
          latex: 'H_0: \\text{Feature } j \\text{ is uninformative (pure noise)} \\implies P(Z_j > Z_{\\text{shadow}}^{\\max}) \\le 0.5',
          explanation: 'If a feature is pure noise, it has at most a 50% chance of beating the top shadow feature on any round.',
        },
        {
          step: 2,
          label: 'Formulate the cumulative binomial distribution for M = 20 trials',
          latex: 'P(K \\ge k \\mid H_0) = \\sum_{j=k}^{20} \\binom{20}{j} 0.5^{20}',
          explanation: 'Using the symmetric fair coin toss distribution.',
        },
        {
          step: 3,
          label: 'Evaluate tail probabilities for candidate hit counts',
          latex: 'P(K \\ge 15) = \\frac{\\sum_{j=15}^{20} \\binom{20}{j}}{2^{20}} = \\frac{15504 + 4845 + 1140 + 190 + 20 + 1}{1048576} = \\frac{21700}{1048576} \\approx 0.0207',
          explanation: '15 hits yields p = 0.0207 (significant at alpha = 0.05).',
        },
        {
          step: 4,
          label: 'Evaluate for k = 16 hits',
          latex: 'P(K \\ge 16) = \\frac{4845 + 1140 + 190 + 20 + 1}{1048576} = \\frac{6196}{1048576} \\approx 0.0059',
          explanation: 'Because 0.0059 < 0.01, a feature achieving >= 16 hits out of 20 trials is statistically confirmed with 99.4% confidence!',
        },
      ],
    },
    variables: [
      { symbol: 'I(X; Y)', name: 'Mutual Information', description: 'Reduction in entropy of target Y obtained by observing feature X', dimensions: 'Scalar >= 0 (nats or bits)' },
      { symbol: 'Z_{\\text{shadow}}^{\\max}', name: 'Maximum Shadow Z-Score', description: 'Highest importance score achieved by any randomly permuted shadow feature', dimensions: 'Scalar' },
      { symbol: 'M', name: 'Boruta Iterations', description: 'Total number of random forest trials executed', dimensions: 'Integer >= 10' },
      { symbol: 'k', name: 'Hit Count', description: 'Number of iterations where a feature’s importance exceeded the top shadow feature', dimensions: 'Integer in [0, M]' },
    ],
    numericalExample: {
      scenario: 'Trace Boruta iteration 1 on a dataset with 2 real features (X1, X2) and 1 target y.',
      dataset: [
        { sample: 1, x1: 10, x2: 5, y: 1 },
        { sample: 2, x1: 20, x2: 5, y: 0 },
        { sample: 3, x1: 30, x2: 5, y: 1 },
      ],
      calculations: [
        {
          step: 'Step 1: Generate shadow features by permuting columns',
          math: 'X_{\\text{shadow1}} = \\text{permute}(X_1) = [30, 10, 20]; \\quad X_{\\text{shadow2}} = \\text{permute}(X_2) = [5, 5, 5]',
          result: 'Extended dataset has 4 columns: [X1, X2, shadow1, shadow2]',
        },
        {
          step: 'Step 2: Train Random Forest and extract Z-scores',
          math: 'Z(X_1) = 8.5; \\quad Z(X_2) = 1.2; \\quad Z(\\text{shadow1}) = 3.1; \\quad Z(\\text{shadow2}) = 0.8',
          result: 'Z_max_shadow = max(3.1, 0.8) = 3.1',
        },
        {
          step: 'Step 3: Compare real features against Z_max_shadow',
          math: 'X_1: 8.5 > 3.1 \\implies \\text{HIT!}; \\quad X_2: 1.2 < 3.1 \\implies \\text{NO HIT}',
          result: 'X1 gets 1 hit; X2 gets 0 hits.',
        },
      ],
      finalConclusion: 'X1 clearly outshines random noise, whereas X2 fails to beat randomized shadow features.',
    },
    visualExplanation: {
      title: 'Boruta Shadow Feature Comparison',
      description: 'The visual diagram shows feature importances plotted as vertical bars. A dashed red horizontal threshold marks the highest shadow feature importance. Real features extending far above the red line are highlighted green (Confirmed), features oscillating around the red line are yellow (Tentative), and features permanently below the red line are red (Rejected).',
      features: [
        'Green Bars (Confirmed): Real signal beating random noise with p < 0.01.',
        'Red Dashed Line: Highest importance score among all permuted shadow features.',
        'Red Bars (Rejected): Features that perform worse than randomized dummy noise.',
      ],
    },
    scratchCode: {
      title: 'Boruta Feature Selection from Scratch in Python',
      code: `import numpy as np
from sklearn.ensemble import RandomForestClassifier

def boruta_scratch(X, y, n_iter=20, random_state=42):
    """
    Minimal Boruta implementation from scratch using Random Forest.
    """
    rng = np.random.RandomState(random_state)
    n_samples, n_features = X.shape
    hits = np.zeros(n_features)

    for i in range(n_iter):
        # 1. Create shadow features by permuting each column independently
        X_shadow = np.zeros_like(X)
        for col in range(n_features):
            X_shadow[:, col] = rng.permutation(X[:, col])

        # 2. Combine real and shadow features: shape (N, 2*p)
        X_extended = np.hstack([X, X_shadow])

        # 3. Fit Random Forest
        rf = RandomForestClassifier(n_estimators=50, max_depth=5, random_state=rng.randint(10000))
        rf.fit(X_extended, y)

        # 4. Extract importances
        importances = rf.feature_importances_
        real_imp = importances[:n_features]
        shadow_imp = importances[n_features:]
        max_shadow = np.max(shadow_imp)

        # 5. Record hits
        hits += (real_imp > max_shadow).astype(int)

    # Features with >= 15 hits out of 20 trials (p < 0.05) are confirmed
    confirmed = hits >= 15
    return confirmed, hits
`,
      explanation: 'Constructs permuted shadow features, fits Random Forest on extended data, tracks hits against max shadow importance, and confirms features exceeding binomial critical thresholds.',
    },
    sklearnCode: {
      title: 'Recursive Feature Elimination (RFECV) & Mutual Information',
      code: `from sklearn.feature_selection import RFECV, mutual_info_classif
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
import pandas as pd

X, y = load_breast_cancer(return_X_y=True)

# 1. Mutual Information (Filter Method)
mi_scores = mutual_info_classif(X, y, random_state=42)
print(f"Top 3 Features by Mutual Information: {np.argsort(mi_scores)[::-1][:3]}")

# 2. Recursive Feature Elimination with 5-Fold CV (Wrapper Method)
rf = RandomForestClassifier(n_estimators=50, random_state=42)
rfecv = RFECV(estimator=rf, step=1, cv=5, scoring='accuracy', n_jobs=-1)
rfecv.fit(X, y)

print(f"Optimal Number of Features Selected by RFECV: {rfecv.n_features_} / {X.shape[1]}")
print(f"Selected Feature Mask: {rfecv.support_}")
`,
      explanation: 'Evaluates non-linear Mutual Information filter scores and applies scikit-learn RFECV to automatically prune features to the optimal subset.',
    },
    runnableCode: {
      code: `import numpy as np
from scipy.stats import binom

# Compute Boruta Binomial Significance Thresholds (M = 20 trials)
M = 20
p_null = 0.5

print(f"{'Hit Count k':<12} | {'P(K >= k) under H_0':<22} | {'Statistical Status':<20}")
print("-" * 58)

for k in range(10, 21):
    # Survival function: P(K >= k) = 1 - cdf(k - 1)
    p_val = 1.0 - binom.cdf(k - 1, M, p_null)
    if p_val <= 0.01:
        status = "CONFIRMED (p < 0.01)"
    elif p_val <= 0.05:
        status = "CONFIRMED (p < 0.05)"
    else:
        status = "Tentative / Reject"
    print(f"{k:<12d} | {p_val:<22.6f} | {status:<20}")
`,
      expectedOutput: `Hit Count k  | P(K >= k) under H_0    | Statistical Status  
----------------------------------------------------------
10           | 0.588099               | Tentative / Reject  
11           | 0.411901               | Tentative / Reject  
12           | 0.251722               | Tentative / Reject  
13           | 0.131588               | Tentative / Reject  
14           | 0.057659               | Tentative / Reject  
15           | 0.020695               | CONFIRMED (p < 0.05)
16           | 0.005909               | CONFIRMED (p < 0.01)
17           | 0.001288               | CONFIRMED (p < 0.01)
18           | 0.000201               | CONFIRMED (p < 0.01)
19           | 0.000020               | CONFIRMED (p < 0.01)
20           | 0.000001               | CONFIRMED (p < 0.01)`,
    },
    lineByLineExplanation: [
      {
        lines: '11-12',
        codeSnippet: 'p_val = 1.0 - binom.cdf(k - 1, M, p_null)',
        explanation: 'Computes the upper-tail probability of observing k or more hits under the fair coin toss null hypothesis.',
      },
      {
        lines: '13-18',
        codeSnippet: 'if p_val <= 0.01: ...\nprint(...)',
        explanation: 'Demonstrates that k >= 16 hits achieves p = 0.0059, formally proving how Boruta makes objective statistical decisions.',
      },
    ],
    hyperparameters: [
      {
        name: 'step (in RFECV)',
        defaultVal: '1',
        range: '1 to 10 or float (0.1)',
        effect: 'Number of features removed at each iteration. Setting step=0.1 removes 10% of features each round for faster execution.',
        recommendation: 'Use step=0.05 on large feature sets (p > 500) to speed up RFECV.',
      },
      {
        name: 'n_iter (Boruta)',
        defaultVal: '100',
        range: '20 to 200',
        effect: 'Number of shadow feature iterations. More iterations provide higher statistical power to resolve tentative features.',
        recommendation: 'Use 50-100 iterations.',
      },
    ],
    assumptions: [
      {
        assumption: 'Feature Interactions Captured by Base Estimator',
        whyItMatters: 'Filter methods evaluate features in isolation and miss multi-way non-linear feature interactions (e.g. XOR logic).',
        howToVerify: 'Use tree-based wrappers (RFE, Boruta) to capture feature synergies.',
      },
      {
        assumption: 'Cross-Validation Inside Wrapper Loop',
        whyItMatters: 'Selecting features on the entire dataset before cross-validation causes massive data leakage and optimistic test scores.',
        howToVerify: 'Always wrap feature selection inside a Pipeline or use RFECV.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Filtering features using Pearson correlation on non-linear relationships.',
        solution: 'Pearson correlation only measures linear relationships. Use Mutual Information to detect non-linear dependencies.',
      },
      {
        mistake: 'Performing feature selection before splitting train and test sets.',
        solution: 'This is the classic Data Leakage trap. Feature selection must occur strictly inside cross-validation training folds.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Biomedical & Genomics', application: 'Biomarker Discovery in Microarrays', benefit: 'Boruta reduces 20,000 gene expression features down to 25 confirmed therapeutic cancer biomarkers.' },
      { industry: 'Cybersecurity', application: 'Network Packet Intrusion Classification', benefit: 'RFECV prunes 120 network telemetry metrics to the 12 most informative attributes for line-rate router filtering.' },
      { industry: 'Financial Trading', application: 'Alpha Factor Selection', benefit: 'Filters out spurious backtested technical indicators that fail against randomized shadow market series.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-8-1-1',
        question: 'What is the key difference between the Minimal-Optimal feature selection problem and the All-Relevant feature selection problem?',
        hint: 'Does the model seek the smallest set of features or all informative features?',
        answer: 'Minimal-Optimal selection (e.g. LASSO, RFE) finds the smallest compact subset of features that maximizes predictive accuracy, discarding redundant features even if they are informative. All-Relevant selection (e.g. Boruta) finds every single feature that carries genuine predictive signal, which is crucial for scientific discovery and understanding root causes.',
      },
      {
        id: 'pq-8-1-2',
        question: 'Why does Mutual Information detect non-linear relationships that Pearson correlation misses completely?',
        hint: 'Consider the relationship y = x^2 with x centered around zero.',
        answer: 'Pearson correlation measures only linear covariance; for y = x^2, the linear correlation is exactly 0. Mutual Information measures entropy reduction I(X; Y) = H(Y) - H(Y|X), which is non-parametric and strictly positive for any deterministic relationship regardless of functional form.',
      },
      {
        id: 'pq-8-1-3',
        question: 'How does Boruta prevent false positives from noisy random variables?',
        hint: 'What is the role of shadow features?',
        answer: 'By creating shuffled shadow features, Boruta establishes an empirical benchmark for the maximum importance that a variable with zero true predictive power can achieve due to accidental random correlation. Real features must statistically outperform this maximum shadow benchmark across multiple trials to be confirmed.',
      },
    ],
    quiz: [
      {
        id: 'q-8-1-1',
        question: 'Which category of feature selection evaluates features independently of any machine learning model using statistical tests like ANOVA or Mutual Information?',
        options: [
          'Filter Methods',
          'Wrapper Methods',
          'Embedded Methods',
          'Neural Network Dropout',
        ],
        correctIndex: 0,
        explanation: 'Filter methods rank features based solely on statistical properties (e.g. correlation, chi-squared, mutual information) before model training begins.',
      },
      {
        id: 'q-8-1-2',
        question: 'In the Boruta algorithm, how are "shadow features" created?',
        options: [
          'By multiplying features by -1.',
          'By duplicating the feature columns and randomly permuting the values in each column independently to destroy their association with the target.',
          'By adding Gaussian noise with mean 0.',
          'By applying PCA to the dataset.',
        ],
        correctIndex: 1,
        explanation: 'Boruta creates shadow features by randomly shuffling the rows of each feature independently, preserving marginal feature distributions while completely destroying target correlation.',
      },
      {
        id: 'q-8-1-3',
        question: 'Why does Lasso (L1) regression set coefficients to exactly zero, whereas Ridge (L2) only shrinks them toward zero?',
        options: [
          'Lasso uses gradient descent, while Ridge uses normal equations.',
          'The L1 constraint region is a diamond with sharp corners situated on the coordinate axes where the loss contours frequently make contact first.',
          'Ridge regression is non-convex.',
          'Lasso can only be used on binary data.',
        ],
        correctIndex: 1,
        explanation: 'The geometric corners of the L1 diamond ball lie directly on the axes (w_j = 0). The elliptical loss contours touch these axis corners first, setting weights to exactly zero.',
      },
    ],
    independentExercise: {
      title: 'Compare Filter vs Wrapper Feature Selection in Scikit-Learn',
      problem: 'Generate a synthetic dataset with 20 features where only 5 are informative. Evaluate 5-fold cross-validation accuracy using `SelectKBest(score_func=mutual_info_classif, k=5)` vs `RFE(estimator=RandomForestClassifier(), n_features_to_select=5)`.',
      hints: ['from sklearn.datasets import make_classification', 'from sklearn.feature_selection import SelectKBest, RFE', 'Compare cross_val_score for both approaches'],
      starterCode: `from sklearn.datasets import make_classification
from sklearn.feature_selection import SelectKBest, mutual_info_classif, RFE
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline

X, y = make_classification(n_samples=500, n_features=20, n_informative=5, random_state=42)

# TODO: Compare SelectKBest pipeline vs RFE pipeline
`,
      solution: `from sklearn.datasets import make_classification
from sklearn.feature_selection import SelectKBest, mutual_info_classif, RFE
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline
import numpy as np

X, y = make_classification(n_samples=500, n_features=20, n_informative=5, random_state=42)

rf = RandomForestClassifier(n_estimators=50, random_state=42)

# 1. Filter Pipeline (SelectKBest)
pipe_filter = Pipeline([
    ('select', SelectKBest(score_func=mutual_info_classif, k=5)),
    ('clf', rf)
])

# 2. Wrapper Pipeline (RFE)
pipe_wrapper = Pipeline([
    ('select', RFE(estimator=rf, n_features_to_select=5)),
    ('clf', rf)
])

cv_filter = cross_val_score(pipe_filter, X, y, cv=5)
cv_wrapper = cross_val_score(pipe_wrapper, X, y, cv=5)

print(f"Filter (Mutual Info) 5-Fold Accuracy:  {np.mean(cv_filter):.4f} (+/- {np.std(cv_filter):.4f})")
print(f"Wrapper (RFE) 5-Fold Accuracy:         {np.mean(cv_wrapper):.4f} (+/- {np.std(cv_wrapper):.4f})")
`,
    },
    summary: {
      keyTakeaways: [
        'Filter methods rank features quickly using non-parametric statistics (Mutual Information) in O(N * p) time.',
        'Wrapper methods (RFE) optimize feature subsets directly for a specific model family by iteratively pruning weak attributes.',
        'Boruta solves the All-Relevant feature problem by comparing feature Z-scores against permuted shadow features using binomial hypothesis tests.',
      ],
      nextLessonId: 'explainable-ai-shap-lime',
      nextLessonTitle: 'Explainable AI (XAI): LIME Local Surrogates & SHAP Interactions',
      nextLessonModuleId: 'module-8',
    },
  },

  'explainable-ai-shap-lime': {
    id: 'explainable-ai-shap-lime',
    moduleId: 'module-8',
    title: 'Explainable AI (XAI): LIME Local Surrogates & SHAP Interactions',
    subtitle: 'Local Surrogate Approximations, Perturbation Kernels & Higher-Order SHAP Interactions',
    order: 2,
    readTimeMinutes: 26,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Understand the trade-off between model capacity and intrinsic interpretability.',
      'Derive LIME (Local Interpretable Model-agnostic Explanations) local surrogate optimization.',
      'Explain how LIME uses exponential distance kernels to enforce local fidelity.',
      'Derive SHAP interaction values Phi_ij to decompose pairwise feature synergies.',
    ],
    prerequisites: ['feature-importance-shap', 'Linear regression', 'Kernel methods'],
    previousLesson: {
      id: 'advanced-feature-selection',
      title: 'Advanced Feature Selection: Filter, Wrapper, Embedded & Boruta',
      moduleId: 'module-8',
    },
    analogy: {
      title: 'The Expert Defense Attorney and the Complex Legal Code',
      text: 'A tax code contains 50,000 pages of intricate, non-linear tax laws (a complex black-box model). A citizen is audited and fined $10,000. When the citizen asks why, the attorney does not attempt to explain all 50,000 pages of global tax law. Instead, the attorney zooms in exclusively on that specific citizen’s situation: "For someone with your exact income bracket and business deduction in New York, the local rule is simple: Deducting home office equipment exceeded the local limit by $2,000."',
      metaphor: 'LIME fits a simple interpretable linear model locally around an individual prediction to explain why the black box made that specific decision.',
    },
    problemSolved: {
      title: 'Explaining Black-Box Predictions Without Sacrificing Accuracy',
      description: 'High-performing models (Gradient Boosted Trees, Deep Neural Networks) are opaque black boxes. In regulated domains (finance, healthcare, legal), decisions cannot be deployed without human-interpretable justifications. LIME and SHAP provide post-hoc explanations for any machine learning model.',
      keyPoints: [
        'Model-agnostic: Explains any machine learning model without requiring access to internal architecture.',
        'Local fidelity: Accurately reflects how small perturbations around a specific sample alter the prediction.',
        'SHAP interaction values separate pure main effects from pairwise feature synergy.',
      ],
    },
    intuition: {
      overview: 'While a black-box decision boundary may be globally complex and highly non-linear, if you zoom in sufficiently close to a single data point x, the boundary looks approximately linear. LIME perturbs x, evaluates the black box on those perturbations, weights them by distance, and fits a simple sparse linear regression.',
      steps: [
        {
          step: 1,
          title: 'Select Instance to Explain',
          description: 'Choose a specific observation x whose prediction f(x) requires an explanation.',
        },
        {
          step: 2,
          title: 'Generate Perturbed Neighborhood',
          description: 'Sample points z\' randomly in the vicinity of x by adding Gaussian noise or toggling categorical features.',
        },
        {
          step: 3,
          title: 'Assign Exponential Proximity Weights',
          description: 'Weight each perturbed sample z by its distance to x: pi_x(z) = exp(-D(x, z)^2 / sigma^2).',
        },
        {
          step: 4,
          title: 'Fit Weighted Ridge / Lasso Surrogate',
          description: 'Train an interpretable linear model g(z) = w_0 + sum w_i z_i on the weighted perturbations to approximate f(z).',
        },
      ],
    },
    mathematics: {
      overview: 'Ribeiro, Singh, and Guestrin (2016) formulated LIME as an explicit regularized empirical risk minimization problem over interpretable surrogate models.',
      foundations: [
        {
          name: 'LIME Optimization Objective',
          latex: '\\xi(x) = \\arg\\min_{g \\in G} \\mathcal{L}(f, g, \\pi_x) + \\Omega(g)',
          explanation: 'where f is the black-box model, g is the interpretable surrogate (e.g. sparse linear model), pi_x(z) is the local exponential kernel, and Omega(g) penalizes model complexity (e.g. number of non-zero features).',
        },
        {
          name: 'Exponential Proximity Kernel',
          latex: '\\pi_x(z) = \\exp\\left( - \\frac{D(x, z)^2}{\\sigma^2} \\right)',
          explanation: 'where D(x, z) is the distance between original instance x and perturbation z, and sigma is the kernel bandwidth.',
        },
        {
          name: 'Weighted Squared Loss in LIME',
          latex: '\\mathcal{L}(f, g, \\pi_x) = \\sum_{z, z\' \\in \\mathcal{Z}} \\pi_x(z) \\left( f(z) - g(z\') \\right)^2',
          explanation: 'Measures how faithfully the simple surrogate g mimics the complex model f within the local neighborhood.',
        },
        {
          name: 'SHAP Interaction Values (Lundberg et al., 2020)',
          latex: '\\Phi_{ij}(x) = \\sum_{S \\subseteq F \\setminus \\{i, j\\}} \\frac{|S|!(|F| - |S| - 2)!}{2(|F| - 1)!} \\left[ f(S \\cup \\{i, j\\}) - f(S \\cup \\{i\\}) - f(S \\cup \\{j\\}) + f(S) \\right]',
          explanation: 'Splits the Shapley value into pure main effects Phi_ii and pairwise non-linear interaction effects Phi_ij such that phi_i = Phi_ii + sum_{j != i} Phi_ij.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Weighted Least Squares Normal Equation in LIME',
      objective: 'Solve for the optimal linear surrogate coefficients w* in closed form under distance weights W = diag(pi_x(z)).',
      steps: [
        {
          step: 1,
          label: 'Formulate the weighted matrix loss',
          latex: '\\mathcal{L}(w) = (y - Z w)^T W (y - Z w)',
          explanation: 'where y = f(Z) are black-box predictions on perturbations Z, and W is the diagonal matrix of proximity weights pi_x(z).',
        },
        {
          step: 2,
          label: 'Expand the quadratic matrix product',
          latex: '\\mathcal{L}(w) = y^T W y - 2 w^T Z^T W y + w^T Z^T W Z w',
          explanation: 'Using the symmetry of diagonal weight matrix W.',
        },
        {
          step: 3,
          label: 'Differentiate with respect to parameter vector w',
          latex: '\\frac{\\partial \\mathcal{L}}{\\partial w} = -2 Z^T W y + 2 Z^T W Z w = 0',
          explanation: 'Setting gradient to zero for convex quadratic minimization.',
        },
        {
          step: 4,
          label: 'Solve for the optimal local surrogate weights w*',
          latex: 'Z^T W Z w^* = Z^T W y \\implies w^* = (Z^T W Z)^{-1} Z^T W y',
          explanation: 'This is the exact Weighted Ordinary Least Squares solution. The coefficients w* provide the local feature importance explanations.',
        },
      ],
    },
    variables: [
      { symbol: 'f(x)', name: 'Black-Box Model', description: 'Complex machine learning model being explained', dimensions: 'Function mapping R^d -> R' },
      { symbol: 'g(z)', name: 'Interpretable Surrogate Model', description: 'Simple sparse linear model explaining local behavior', dimensions: 'Function mapping R^d -> R' },
      { symbol: '\\pi_x(z)', name: 'Proximity Weight', description: 'Exponential similarity between perturbation z and instance x', dimensions: 'Scalar in (0, 1]' },
      { symbol: '\\Phi_{ij}', name: 'SHAP Interaction Value', description: 'Synergistic interaction effect between feature i and feature j on prediction f(x)', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Compute proximity weights pi_x(z) for 3 perturbations around point x = 5.0 with kernel bandwidth sigma = 2.0.',
      dataset: [
        { perturbation: 'z1', val: 5.2, dist_sq: 0.04 },
        { perturbation: 'z2', val: 6.5, dist_sq: 2.25 },
        { perturbation: 'z3', val: 10.0, dist_sq: 25.00 },
      ],
      calculations: [
        {
          step: 'Compute proximity weight for z1 (dist^2 = 0.04)',
          math: '\\pi_x(z_1) = \\exp(-0.04 / 2^2) = \\exp(-0.01) \\approx 0.9900',
          result: 'Weight z1 = 0.990 (Near-perfect weight: highly trusted)',
        },
        {
          step: 'Compute proximity weight for z2 (dist^2 = 2.25)',
          math: '\\pi_x(z_2) = \\exp(-2.25 / 4.0) = \\exp(-0.5625) \\approx 0.5698',
          result: 'Weight z2 = 0.570 (Moderate weight)',
        },
        {
          step: 'Compute proximity weight for z3 (dist^2 = 25.0)',
          math: '\\pi_x(z_3) = \\exp(-25.0 / 4.0) = \\exp(-6.25) \\approx 0.0019',
          result: 'Weight z3 = 0.002 (Virtually zero influence: distant outlier)',
        },
      ],
      finalConclusion: 'The exponential kernel ensures the linear surrogate fits only the immediate local neighborhood around x, ignoring distant regions.',
    },
    visualExplanation: {
      title: 'LIME Local Linear Surrogates vs Complex Non-Linear Boundary',
      description: 'The visual diagram shows a winding, non-linear decision boundary dividing red and blue classes. A bold black cross marks instance x. Dozens of perturbed samples surround x, with dot sizes indicating proximity weight pi_x(z). A bold dashed straight line shows the local linear surrogate g fitted strictly to the highest-weighted local points.',
      features: [
        'Global Boundary: Highly non-linear, complex multi-modal decision surface.',
        'Local Surrounding: A smooth tangent hyperplane fitted to nearby perturbations.',
        'Feature Slopes: Positive slope indicates feature pushes toward positive classification.',
      ],
    },
    scratchCode: {
      title: 'LIME 1D Local Surrogate from Scratch in NumPy',
      code: `import numpy as np

def explain_instance_lime(model_predict_fn, x0, n_samples=500, sigma=1.0):
    """
    Explain 1D black-box prediction at x0 using LIME Weighted Linear Regression.
    """
    # 1. Generate perturbations around x0
    perturbations = x0 + np.random.normal(loc=0.0, scale=sigma, size=(n_samples, 1))

    # 2. Get black-box predictions on perturbations
    y_preds = model_predict_fn(perturbations)

    # 3. Compute exponential distance weights: pi(z) = exp(-dist^2 / sigma^2)
    dists_sq = (perturbations - x0) ** 2
    weights = np.exp(-dists_sq / (sigma ** 2)).ravel()

    # 4. Fit Weighted Ordinary Least Squares: w = (Z^T W Z)^-1 Z^T W y
    # Add intercept column
    Z = np.hstack([np.ones_like(perturbations), perturbations])
    W = np.diag(weights)

    # Solve normal equations
    w_star = np.linalg.solve(Z.T @ W @ Z, Z.T @ W @ y_preds)
    intercept, slope = w_star[0], w_star[1]
    return slope, intercept
`,
      explanation: 'Samples random perturbations around x0, weights them by exponential proximity, and solves weighted normal equations to extract the local slope (feature attribution).',
    },
    sklearnCode: {
      title: 'Using LIME and SHAP in Python',
      code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42).fit(X_train, y_train)

# 1. LIME Tabular Explainer
# import lime.lime_tabular
# explainer = lime.lime_tabular.LimeTabularExplainer(
#     X_train, feature_names=cancer.feature_names, class_names=['Malignant', 'Benign'], mode='classification'
# )
# exp = explainer.explain_instance(X_test[0], model.predict_proba, num_features=5)
# exp.show_in_notebook()

# 2. TreeSHAP Interaction Values
# import shap
# tree_explainer = shap.TreeExplainer(model)
# interaction_values = tree_explainer.shap_interaction_values(X_test[:5])
`,
      explanation: 'Illustrates setup of LimeTabularExplainer and TreeSHAP interaction value computation for tabular models.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate LIME Local Linear Approximation on a Non-Linear Function
def black_box(x):
    # Highly non-linear sinusoidal function
    return np.sin(x) + 0.1 * x**2

x0 = 1.0  # Point to explain: true analytical derivative at x=1 is cos(1) + 0.2(1) = 0.5403 + 0.2 = 0.7403
np.random.seed(42)

n_samples = 1000
sigma = 0.2
perturbations = x0 + np.random.normal(0, sigma, size=(n_samples, 1))
y_vals = black_box(perturbations)

# Compute LIME exponential weights
weights = np.exp(-((perturbations - x0)**2) / (sigma**2)).ravel()
Z = np.hstack([np.ones_like(perturbations), perturbations])
W = np.diag(weights)

# Weighted Least Squares
w = np.linalg.solve(Z.T @ W @ Z, Z.T @ W @ y_vals)
intercept, local_slope = w[0, 0], w[1, 0]

true_derivative = np.cos(x0) + 0.2 * x0

print(f"Point Explained x0:            {x0:.2f}")
print(f"True Analytical Derivative:     {true_derivative:.4f}")
print(f"LIME Local Surrogate Slope:    {local_slope:.4f}")
print(f"Absolute Approximation Error:  {abs(local_slope - true_derivative):.4f}")
print("LIME faithfully discovered the local tangent slope of the black box!")
`,
      expectedOutput: `Point Explained x0:            1.00
True Analytical Derivative:     0.7403
LIME Local Surrogate Slope:    0.7397
Absolute Approximation Error:  0.0006
LIME faithfully discovered the local tangent slope of the black box!`,
    },
    lineByLineExplanation: [
      {
        lines: '4-6',
        codeSnippet: 'def black_box(x):\n    return np.sin(x) + 0.1 * x**2',
        explanation: 'Defines a non-linear black box whose true derivative at x=1.0 is cos(1) + 0.2 = 0.7403.',
      },
      {
        lines: '17-21',
        codeSnippet: 'w = np.linalg.solve(Z.T @ W @ Z, Z.T @ W @ y_vals)\nlocal_slope = w[1, 0]',
        explanation: 'Solves the LIME weighted linear regression, estimating the local slope as 0.7397 (accurate to within 0.0006).',
      },
    ],
    hyperparameters: [
      {
        name: 'kernel_width (sigma in LIME)',
        defaultVal: '0.75 * sqrt(n_features)',
        range: '0.1 to 5.0',
        effect: 'Defines the neighborhood size. Smaller values make explanations more locally accurate but more noisy; larger values smooth explanations over wider regions.',
        recommendation: 'Tweak kernel_width to ensure perturbations stay within realistic local vicinity.',
      },
      {
        name: 'num_features (LIME)',
        defaultVal: '10',
        range: '3 to 20',
        effect: 'Number of top features to include in the linear surrogate model (Lasso sparsity).',
        recommendation: 'Use 5-7 features for human stakeholder and regulatory presentations.',
      },
    ],
    assumptions: [
      {
        assumption: 'Local Linearity of Decision Boundary',
        whyItMatters: 'LIME assumes that in a small enough neighborhood around x, the decision surface is approximately planar and can be modeled by a linear surrogate.',
        howToVerify: 'Check surrogate R^2 score (local fidelity metric).',
      },
      {
        assumption: 'Realistic Perturbation Distribution',
        whyItMatters: 'Adding independent Gaussian noise to correlated features can generate unnatural out-of-distribution synthetic points (e.g. Pregnant=True, Gender=Male).',
        howToVerify: 'Use kernel density estimators or empirical copulas to sample perturbations.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming LIME explanations are globally valid across the whole dataset.',
        solution: 'LIME explanations are strictly local. A feature with a positive slope at point A might have a negative slope at point B.',
      },
      {
        mistake: 'Instability: Running LIME multiple times on the same instance yields different feature weights.',
        solution: 'Because LIME uses random perturbation sampling, small sample sizes produce variance. Increase n_samples to 5,000+ for stable explanations.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Healthcare & Clinical Decision Support', application: 'ICU Mortality Risk Factor Explanations', benefit: 'Explains to attending physicians why an emergency patient has an elevated septic shock risk score.' },
      { industry: 'Banking & Mortgage Lending', application: 'Adverse Action Regulatory Notices', benefit: 'Generates specific plain-language justifications for denied mortgage applications to comply with ECOA regulations.' },
      { industry: 'Human Resources', application: 'Auditing Automated Resume Screening', benefit: 'Inspects local feature weights to verify hiring models are not relying on protected demographic proxies.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-8-2-1',
        question: 'What is the primary difference between LIME and SHAP?',
        hint: 'Local surrogate modeling vs cooperative game-theoretic axioms.',
        answer: 'LIME trains an empirical local linear surrogate model on distance-weighted perturbations. It has no theoretical fairness guarantees and can produce inconsistent results due to random sampling. SHAP is grounded in cooperative game theory (Shapley values) and guarantees mathematical properties (Efficiency, Symmetry, Additivity).',
      },
      {
        id: 'pq-8-2-2',
        question: 'What are SHAP interaction values Phi_ij, and what do they capture?',
        hint: 'How does feature i’s effect depend on the presence of feature j?',
        answer: 'SHAP interaction values decompose the total attribution into main effects (Phi_ii) and pairwise non-linear synergy effects (Phi_ij). If Phi_ij is positive, observing feature j enhances the positive impact of feature i beyond what either feature would contribute in isolation.',
      },
      {
        id: 'pq-8-2-3',
        question: 'What does the proximity weight pi_x(z) = exp(-D(x, z)^2 / sigma^2) do in LIME?',
        hint: 'What happens to the weight as distance D(x, z) increases?',
        answer: 'It assigns high weights (near 1.0) to perturbations close to the target instance x, and exponentially decays weights toward 0 for distant perturbations. This forces the linear surrogate model to focus its fidelity exclusively on the local neighborhood around x.',
      },
    ],
    quiz: [
      {
        id: 'q-8-2-1',
        question: 'What type of model is used as the local surrogate g in standard LIME explanations for tabular data?',
        options: [
          'A deep Convolutional Neural Network',
          'A simple sparse linear model (e.g. Ridge or Lasso regression)',
          'A 500-tree Random Forest',
          'A Gaussian Mixture Model',
        ],
        correctIndex: 1,
        explanation: 'LIME uses simple, interpretable linear models with a small number of features so human stakeholders can inspect the exact signed coefficients.',
      },
      {
        id: 'q-8-2-2',
        question: 'What is a major limitation of LIME that practitioners must mitigate?',
        options: [
          'It only works for linear regression models.',
          'Explanation instability: random perturbation sampling can produce slightly different explanation weights across repeated runs on the same instance.',
          'It requires labels during inference.',
          'It cannot handle numerical features.',
        ],
        correctIndex: 1,
        explanation: 'Because LIME generates random perturbations dynamically, different seeds or small sample sizes can yield varying surrogate slopes.',
      },
      {
        id: 'q-8-2-3',
        question: 'In SHAP interaction values, what is the mathematical relationship between the standard Shapley value phi_i and the interaction matrix Phi?',
        options: [
          'phi_i is the determinant of Phi.',
          'phi_i = sum_j Phi_ij (the sum of row i across all features j).',
          'phi_i is independent of Phi.',
          'phi_i = Phi_ii / 2.',
        ],
        correctIndex: 1,
        explanation: 'By the additivity axiom, the total Shapley attribution phi_i equals the diagonal main effect Phi_ii plus the sum of all pairwise interactions with other features: phi_i = sum_j Phi_ij.',
      },
    ],
    independentExercise: {
      title: 'Verify LIME Local Tangent Approximation on a Quadratic Curve',
      problem: 'Write a script that explains the function f(x) = x^2 at point x0 = 3.0 using LIME Weighted Least Squares with 2,000 perturbations. Verify that the local slope closely approximates the true derivative f’(3) = 6.0.',
      hints: ['True derivative of x^2 at x=3 is 2*x = 6.0', 'Sample perturbations with sigma=0.1', 'Solve w = (Z^T W Z)^-1 Z^T W y'],
      starterCode: `import numpy as np

def f(x):
    return x ** 2

x0 = 3.0

# TODO: Generate perturbations, compute weights, solve WLS, and compare slope to 6.0
`,
      solution: `import numpy as np

def f(x):
    return x ** 2

x0 = 3.0
np.random.seed(42)

n_samples = 2000
sigma = 0.1
perturbations = x0 + np.random.normal(0, sigma, size=(n_samples, 1))
y = f(perturbations)

# Weights
weights = np.exp(-((perturbations - x0) ** 2) / (sigma ** 2)).ravel()
Z = np.hstack([np.ones_like(perturbations), perturbations])
W = np.diag(weights)

w_star = np.linalg.solve(Z.T @ W @ Z, Z.T @ W @ y)
slope = w_star[1, 0]

print(f"True Derivative at x0=3.0: 6.0000")
print(f"LIME Estimated Local Slope: {slope:.4f}")
print(f"Approximation Error:        {abs(slope - 6.0):.6f}")
`,
    },
    summary: {
      keyTakeaways: [
        'LIME explains black-box models locally by training a sparse interpretable linear surrogate on distance-weighted perturbations.',
        'The exponential proximity kernel guarantees local fidelity without needing global model simplification.',
        'SHAP interaction values decompose feature attributions into pure main effects and pairwise non-linear synergies.',
      ],
      nextLessonId: 'cost-sensitive-learning',
      nextLessonTitle: 'Cost-Sensitive Learning & Asymmetric Error Optimization',
      nextLessonModuleId: 'module-8',
    },
  },

  'cost-sensitive-learning': {
    id: 'cost-sensitive-learning',
    moduleId: 'module-8',
    title: 'Cost-Sensitive Learning & Asymmetric Error Optimization',
    subtitle: 'Business Cost Matrices, Bayes Decision Thresholds & Cost-Proportionate Weighting',
    order: 3,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Formulate machine learning evaluation under asymmetric business cost matrices.',
      'Derive the optimal Bayes decision threshold tau* from costs C_FP and C_FN.',
      'Implement cost-proportionate sample re-weighting and loss modifications.',
      'Optimize classification pipelines for total expected business financial profit rather than raw accuracy.',
    ],
    prerequisites: ['module-5 Model Evaluation', 'Probability theory', 'Binary classification'],
    previousLesson: {
      id: 'explainable-ai-shap-lime',
      title: 'Explainable AI (XAI): LIME Local Surrogates & SHAP Interactions',
      moduleId: 'module-8',
    },
    analogy: {
      title: 'Airport Security Screening vs Spam Email Filtering',
      text: 'In spam email filtering, a False Positive (marking an urgent email from your boss as spam) is catastrophic, while a False Negative (a junk pill ad in your inbox) is a minor annoyance. In airport baggage screening, the costs are reversed: a False Positive (inspecting a harmless bag) costs $20 in security agent time, but a False Negative (missing a weapon on an aircraft) is an unspeakable disaster costing hundreds of lives. Using a default 0.5 threshold assumes these two errors have equal costs.',
      metaphor: 'Cost-sensitive learning shifts the decision threshold to account for asymmetric real-world financial and safety penalties.',
    },
    problemSolved: {
      title: 'Why Standard 0.5 Thresholds Bankrupt Businesses',
      description: 'Standard classification models minimize raw 0-1 loss, treating False Positives and False Negatives as equally bad. In credit fraud, cancer diagnosis, churn, and equipment failure, one error type is 50x to 1,000x more expensive than the other.',
      keyPoints: [
        'Aligns machine learning predictions directly with real dollar profit and loss.',
        'Derives closed-form optimal probability threshold tau* = C_FP / (C_FP + C_FN).',
        'Eliminates the need to retrain models when business fee structures change.',
      ],
    },
    intuition: {
      overview: 'Instead of predicting class 1 whenever P(y=1 | x) >= 0.5, we compute the expected financial cost of choosing class 1 versus choosing class 0, and select the action that minimizes expected cost.',
      steps: [
        {
          step: 1,
          title: 'Define Cost Matrix C',
          description: 'Establish the cost of each confusion matrix cell: C(Actual, Predicted). Typically, C(0, 0) = 0 and C(1, 1) = 0.',
        },
        {
          step: 2,
          title: 'Calculate Expected Risk R(c | x)',
          description: 'For an instance with predicted probability p = P(y=1 | x), compute expected cost of predicting positive vs negative.',
        },
        {
          step: 3,
          title: 'Apply Bayes Minimum Risk Decision Rule',
          description: 'Predict positive if and only if p >= tau*, where tau* = C_FP / (C_FP + C_FN).',
        },
      ],
    },
    mathematics: {
      overview: 'Bayesian Decision Theory proves that minimizing expected loss under an asymmetric cost matrix leads to an analytical probability threshold shift.',
      foundations: [
        {
          name: 'The Cost Matrix C',
          latex: 'C = \\begin{bmatrix} C_{00} & C_{01} \\\\ C_{10} & C_{11} \\end{bmatrix} = \\begin{bmatrix} C_{\\text{TN}} & C_{\\text{FP}} \\\\ C_{\\text{FN}} & C_{\\text{TP}} \\end{bmatrix}',
          explanation: 'where C_FP is the cost of a False Positive (predicting 1 when true is 0) and C_FN is the cost of a False Negative (predicting 0 when true is 1).',
        },
        {
          name: 'Conditional Expected Risk of Decisions',
          latex: 'R(0 \\mid x) = p C_{\\text{FN}} + (1-p) C_{\\text{TN}}, \\quad R(1 \\mid x) = p C_{\\text{TP}} + (1-p) C_{\\text{FP}}',
          explanation: 'where p = P(y=1 | x) is the calibrated posterior probability.',
        },
        {
          name: 'Optimal Bayes Decision Threshold',
          latex: '\\tau^* = \\frac{C_{\\text{FP}} - C_{\\text{TN}}}{(C_{\\text{FP}} - C_{\\text{TN}}) + (C_{\\text{FN}} - C_{\\text{TP}})}',
          explanation: 'Assuming C_TN = C_TP = 0, this simplifies to the canonical threshold formula tau* = C_FP / (C_FP + C_FN).',
        },
        {
          name: 'Cost-Proportionate Sample Weighting',
          latex: 'w_i = \\begin{cases} C_{\\text{FN}} & \\text{if } y_i = 1 \\\\ C_{\\text{FP}} & \\text{if } y_i = 0 \\end{cases}',
          explanation: 'Weighting training samples proportionally to their error costs forces any standard learning algorithm to become cost-sensitive.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Optimal Bayes Decision Threshold tau*',
      objective: 'Prove that predicting positive when p >= C_FP / (C_FP + C_FN) minimizes total expected cost.',
      steps: [
        {
          step: 1,
          label: 'Set up the decision inequality',
          latex: '\\text{Predict Class 1 if and only if } R(1 \\mid x) < R(0 \\mid x)',
          explanation: 'We choose class 1 whenever its expected cost is strictly lower than predicting class 0.',
        },
        {
          step: 2,
          label: 'Substitute conditional expected risks (assuming C_00 = C_11 = 0)',
          latex: 'p C_{11} + (1 - p) C_{\\text{FP}} < p C_{\\text{FN}} + (1 - p) C_{00} \\implies (1 - p) C_{\\text{FP}} < p C_{\\text{FN}}',
          explanation: 'Expected False Positive cost must be less than expected False Negative cost.',
        },
        {
          step: 3,
          label: 'Expand and rearrange terms for p',
          latex: 'C_{\\text{FP}} - p C_{\\text{FP}} < p C_{\\text{FN}} \\implies C_{\\text{FP}} < p(C_{\\text{FP}} + C_{\\text{FN}})',
          explanation: 'Grouping all terms involving probability p on the right-hand side.',
        },
        {
          step: 4,
          label: 'Solve for p to obtain the optimal threshold tau*',
          latex: 'p > \\frac{C_{\\text{FP}}}{C_{\\text{FP}} + C_{\\text{FN}}} \\implies \\tau^* = \\frac{C_{\\text{FP}}}{C_{\\text{FP}} + C_{\\text{FN}}}',
          explanation: 'This proves that the optimal threshold depends entirely on the cost ratio, not raw class frequencies.',
        },
      ],
    },
    variables: [
      { symbol: 'C_{\\text{FP}}', name: 'Cost of False Positive', description: 'Financial or operational penalty incurred by falsely predicting positive', dimensions: 'Scalar >= 0 ($ or penalty)' },
      { symbol: 'C_{\\text{FN}}', name: 'Cost of False Negative', description: 'Financial or catastrophic penalty incurred by missing a true positive', dimensions: 'Scalar >= 0 ($ or penalty)' },
      { symbol: '\\tau^*', name: 'Optimal Decision Threshold', description: 'Cutoff probability above which positive class is predicted', dimensions: 'Probability in (0, 1)' },
      { symbol: 'R(c \\mid x)', name: 'Expected Risk', description: 'Expected financial loss of making prediction c for instance x', dimensions: 'Scalar >= 0' },
    ],
    numericalExample: {
      scenario: 'Credit Card Fraud Detection: C_FP = $10 (cost to send SMS alert), C_FN = $490 (average fraudulent charge amount).',
      dataset: [
        { error_type: 'False Positive', cost: 10 },
        { error_type: 'False Negative', cost: 490 },
      ],
      calculations: [
        {
          step: 'Compute optimal Bayes threshold tau*',
          math: '\\tau^* = \\frac{C_{\\text{FP}}}{C_{\\text{FP}} + C_{\\text{FN}}} = \\frac{10}{10 + 490} = \\frac{10}{500}',
          result: 'tau* = 0.02 (2.0% probability!)',
        },
        {
          step: 'Evaluate a transaction with fraud probability p = 0.05 (5%)',
          math: '\\text{Under default } \\tau = 0.50: \\quad p < 0.50 \\implies \\text{Predicted Normal (0)}',
          result: 'Expected cost = 0.05 * 490 = $24.50 loss',
        },
        {
          step: 'Evaluate under optimal threshold tau* = 0.02',
          math: '\\text{Under optimal } \\tau^* = 0.02: \\quad p > 0.02 \\implies \\text{Predicted Fraud (1)}',
          result: 'Expected cost = 0.95 * 10 = $9.50 loss',
        },
        {
          step: 'Calculate savings per flagged transaction',
          math: '\\text{Savings} = \\$24.50 - \\$9.50',
          result: '$15.00 saved per transaction (61.2% cost reduction!)',
        },
      ],
      finalConclusion: 'By lowering the threshold from 0.50 to 0.02, the bank slashes expected financial loss by over 61%.',
    },
    visualExplanation: {
      title: 'Cost-Curve vs Decision Threshold Tuning',
      description: 'The visual diagram shows total business financial cost plotted against the probability threshold tau from 0.0 to 1.0. A high threshold causes runaway False Negative costs (red curve). A very low threshold causes excessive False Positive customer friction costs (blue curve). The total cost curve forms a sharp U-shape whose global minimum sits precisely at tau*.',
      features: [
        'Red Curve (FN Cost): Drops steeply as threshold decreases (catching more fraud).',
        'Blue Curve (FP Cost): Rises as threshold decreases (more false alarms).',
        'Green Star: Global minimum of total cost curve at tau* = 0.02.',
      ],
    },
    scratchCode: {
      title: 'Optimal Cost-Sensitive Threshold Finder in NumPy',
      code: `import numpy as np

def find_optimal_threshold(y_true, y_probs, c_fp=10.0, c_fn=500.0):
    """
    Find empirical cost-minimizing threshold across all candidate thresholds.
    """
    thresholds = np.linspace(0.01, 0.99, 100)
    costs = []

    for t in thresholds:
        preds = (y_probs >= t).astype(int)
        # Confusion matrix elements
        fp = np.sum((y_true == 0) & (preds == 1))
        fn = np.sum((y_true == 1) & (preds == 0))
        total_cost = fp * c_fp + fn * c_fn
        costs.append(total_cost)

    best_idx = np.argmin(costs)
    theoretical_tau = c_fp / (c_fp + c_fn)
    return thresholds[best_idx], costs[best_idx], theoretical_tau
`,
      explanation: 'Simulates candidate probability thresholds, computes total financial costs from FP and FN counts, and returns the empirical and theoretical cost-minimizing thresholds.',
    },
    sklearnCode: {
      title: 'Cost-Sensitive Learning via sample_weight and class_weight',
      code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
import numpy as np

X, y = make_classification(n_samples=1000, weights=[0.95, 0.05], random_state=42)

# Asymmetric costs: C_FP = 10, C_FN = 200
# Technique 1: Cost-proportionate class weights during training
class_weights = {0: 10.0, 1: 200.0}
rf = RandomForestClassifier(class_weight=class_weights, random_state=42)
rf.fit(X, y)

# Technique 2: Threshold shifting on predicted probabilities
probs = rf.predict_proba(X)[:, 1]
tau_star = 10.0 / (10.0 + 200.0) # 0.0476
cost_optimal_preds = (probs >= tau_star).astype(int)
print(f"Optimal Bayes Threshold tau*: {tau_star:.4f}")
print(f"Transactions Flagged for Review: {np.sum(cost_optimal_preds)}")
`,
      explanation: 'Demonstrates both training-time class weighting and inference-time probability threshold shifting.',
    },
    runnableCode: {
      code: `import numpy as np

# Verify Bayes Optimal Threshold tau* = C_FP / (C_FP + C_FN)
C_FP = 20.0     # $20 false alarm inspection cost
C_FN = 1000.0   # $1000 missed equipment failure cost

tau_star = C_FP / (C_FP + C_FN)
print(f"Cost of False Positive (C_FP): \${C_FP}")
print(f"Cost of False Negative (C_FN): \${C_FN}")
print(f"Theoretical Optimal Threshold tau*: {tau_star:.4f} ({tau_star * 100:.2f}%)\\n")

# Verify expected risk inequality R(1|x) < R(0|x) across test probabilities
test_probs = [0.01, 0.019, 0.020, 0.05, 0.10, 0.50]
print(f"{'Prob p':<8} | {'Risk Predict 0':<16} | {'Risk Predict 1':<16} | {'Optimal Action':<20}")
print("-" * 65)

for p in test_probs:
    # R(0|x) = p * C_FN
    # R(1|x) = (1 - p) * C_FP
    r0 = p * C_FN
    r1 = (1.0 - p) * C_FP
    action = "Predict Positive (1)" if r1 < r0 else "Predict Negative (0)"
    print(f"{p:<8.3f} | \${r0:<15.2f} | \${r1:<15.2f} | {action:<20}")
`,
      expectedOutput: `Cost of False Positive (C_FP): $20.0
Cost of False Negative (C_FN): $1000.0
Theoretical Optimal Threshold tau*: 0.0196 (1.96%)

Prob p   | Risk Predict 0   | Risk Predict 1   | Optimal Action      
-----------------------------------------------------------------
0.010    | $10.00           | $19.80           | Predict Negative (0)
0.019    | $19.00           | $19.62           | Predict Negative (0)
0.020    | $20.00           | $19.60           | Predict Positive (1)
0.050    | $50.00           | $19.00           | Predict Positive (1)
0.100    | $100.00          | $18.00           | Predict Positive (1)
0.500    | $500.00          | $10.00           | Predict Positive (1)`,
    },
    lineByLineExplanation: [
      {
        lines: '5-7',
        codeSnippet: 'tau_star = C_FP / (C_FP + C_FN)',
        explanation: 'Computes the exact Bayes optimal decision boundary tau* = 20 / (20 + 1000) = 0.0196.',
      },
      {
        lines: '17-21',
        codeSnippet: 'r0 = p * C_FN\nr1 = (1.0 - p) * C_FP\naction = "Predict Positive (1)" if r1 < r0 else ...',
        explanation: 'Demonstrates that as soon as predicted probability crosses 1.96% (e.g. p = 0.02), expected risk of predicting positive ($19.60) becomes lower than predicting negative ($20.00).',
      },
    ],
    hyperparameters: [
      {
        name: 'class_weight',
        defaultVal: 'None',
        range: "dict {0: w0, 1: w1} or 'balanced'",
        effect: 'Scales the loss contribution of each class during gradient updates. Forces the model to penalize errors on high-cost classes.',
        recommendation: 'Set weights proportional to business costs: {0: C_FP, 1: C_FN}.',
      },
    ],
    assumptions: [
      {
        assumption: 'Accurate and Calibrated Probabilities',
        whyItMatters: 'Threshold shifting tau* = C_FP / (C_FP + C_FN) strictly requires that predicted probabilities p are well-calibrated (e.g. p=0.02 means exactly 2% of instances are positive).',
        howToVerify: 'Inspect calibration curves (reliability diagrams) and compute the Brier score.',
      },
      {
        assumption: 'Constant or Independent Error Costs',
        whyItMatters: 'If cost varies per transaction (e.g. fraud cost depends on dollar amount), use transaction-specific expected loss R(x) = p * amount_i rather than a single fixed threshold.',
        howToVerify: 'Verify whether financial penalty is fixed or transaction-dependent.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using the default 0.5 threshold for highly imbalanced, cost-sensitive problems.',
        solution: 'Always compute the Bayes optimal threshold tau* based on business cost matrices.',
      },
      {
        mistake: 'Applying threshold shifting on uncalibrated models (e.g. raw SVM decision function or uncalibrated Naive Bayes).',
        solution: 'Calibrate probabilities using Platt Scaling or Isotonic Regression before applying threshold tuning.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Healthcare', application: 'Malignant Tumor Biopsy Screening', benefit: 'Shifts threshold to tau=0.01 to avoid fatal missed cancer diagnoses while accepting moderate benign biopsy rates.' },
      { industry: 'Aerospace & Aviation', application: 'Jet Engine Pre-Flight Maintenance Alerts', benefit: 'Sets ultra-low threshold to detect turbine blade micro-cracks before in-flight engine failure.' },
      { industry: 'Consumer Banking', application: 'Mortgage Default Risk Pricing', benefit: 'Optimizes loan approval cutoffs based on interest margin profit vs loan default write-off severity.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-8-3-1',
        question: 'Why does a model with 99% accuracy often generate massive financial losses in credit fraud detection?',
        hint: 'Consider the class imbalance and the cost of false negatives.',
        answer: 'If 99% of transactions are legitimate and 1% are fraud, a dummy model that predicts "Normal" for everything achieves 99% accuracy. However, it misses 100% of fraud transactions, incurring millions of dollars in unintercepted False Negative theft losses.',
      },
      {
        id: 'pq-8-3-2',
        question: 'What is the optimal Bayes decision threshold if C_FP = $50 and C_FN = $950?',
        hint: 'Evaluate tau* = C_FP / (C_FP + C_FN).',
        answer: 'tau* = 50 / (50 + 950) = 50 / 1000 = 0.05 (5.0%). Any transaction with probability >= 5% should be flagged for review.',
      },
      {
        id: 'pq-8-3-3',
        question: 'How does cost-proportionate sample re-weighting compare to threshold shifting?',
        hint: 'Training time modification vs inference time modification.',
        answer: 'Sample re-weighting modifies training loss (e.g. weighting positive samples by C_FN and negative samples by C_FP), requiring model retraining. Threshold shifting keeps the existing calibrated model and simply changes the cutoff tau* during inference, allowing instantaneous adaptation to changing business costs.',
      },
    ],
    quiz: [
      {
        id: 'q-8-3-1',
        question: 'What is the optimal Bayes probability threshold tau* when False Positives cost $100 and False Negatives cost $100?',
        options: [
          'tau* = 0.10',
          'tau* = 0.50',
          'tau* = 0.90',
          'tau* = 0.01',
        ],
        correctIndex: 1,
        explanation: 'tau* = 100 / (100 + 100) = 0.50. The standard 0.5 threshold is optimal ONLY when error costs are perfectly symmetric.',
      },
      {
        id: 'q-8-3-2',
        question: 'In a medical diagnostic system where missing an illness (FN) costs $10,000 and an unnecessary test (FP) costs $100, what happens to the optimal decision threshold tau*?',
        options: [
          'It shifts upward toward 0.99.',
          'It shifts downward toward 0.01 (0.99%), flagging patients even with low predicted risk.',
          'It remains exactly 0.50.',
          'It becomes negative.',
        ],
        correctIndex: 1,
        explanation: 'tau* = 100 / (100 + 10000) ≈ 0.0099 (0.99%). The threshold drops dramatically to catch virtually all potential illnesses.',
      },
      {
        id: 'q-8-3-3',
        question: 'What prerequisite is strictly required for threshold tuning tau* = C_FP / (C_FP + C_FN) to function accurately?',
        options: [
          'The dataset must have at least 1,000,000 samples.',
          'The predicted probabilities must be well-calibrated (reflect true posterior likelihoods).',
          'The model must be a Decision Tree.',
          'Features must be standardized.',
        ],
        correctIndex: 1,
        explanation: 'If probabilities are distorted or uncalibrated, applying a theoretical probability threshold will yield incorrect classification rates.',
      },
    ],
    independentExercise: {
      title: 'Compare Financial Losses: Default 0.5 vs Cost-Optimal Threshold',
      problem: 'Simulate 1,000 calibrated predictions where 50 instances are fraud. Set C_FP = $25, C_FN = $750. Compute the total financial cost at default threshold tau = 0.5 vs optimal threshold tau* = 25 / (25 + 750) = 0.0323.',
      hints: ['Evaluate total_cost = fp * 25 + fn * 750', 'Compute percentage savings'],
      starterCode: `import numpy as np

np.random.seed(42)
y_true = np.array([0]*950 + [1]*50)
# Simulated calibrated probabilities
y_probs = np.random.beta(0.5, 5, size=1000)
y_probs[y_true == 1] = np.random.beta(2, 2, size=50) # fraud has higher probs

C_FP, C_FN = 25.0, 750.0

# TODO: Compare total cost at tau=0.50 vs tau=tau*
`,
      solution: `import numpy as np

np.random.seed(42)
y_true = np.array([0]*950 + [1]*50)
y_probs = np.random.beta(0.5, 5, size=1000)
y_probs[y_true == 1] = np.random.beta(2, 2, size=50)

C_FP, C_FN = 25.0, 750.0
tau_star = C_FP / (C_FP + C_FN)

def get_cost(t):
    preds = (y_probs >= t).astype(int)
    fp = np.sum((y_true == 0) & (preds == 1))
    fn = np.sum((y_true == 1) & (preds == 0))
    return fp * C_FP + fn * C_FN

cost_default = get_cost(0.50)
cost_optimal = get_cost(tau_star)

print(f"Cost at default tau=0.50:  \${cost_default:,.2f}")
print(f"Cost at optimal tau={tau_star:.4f}: \${cost_optimal:,.2f}")
print(f"Total Business Savings:    \${cost_default - cost_optimal:,.2f} ({(cost_default - cost_optimal)/cost_default*100:.1f}% reduction!)")
`,
    },
    summary: {
      keyTakeaways: [
        'Real-world business and medical problems have heavily asymmetric error costs that make the default 0.5 threshold suboptimal.',
        'The optimal Bayes decision threshold tau* = C_FP / (C_FP + C_FN) directly minimizes total financial expected loss.',
        'Threshold tuning operates at inference time, enabling instant adaptation to changing business fee structures without retraining.',
      ],
      nextLessonId: 'fairness-bias-ethics',
      nextLessonTitle: 'Algorithmic Fairness, Bias & Ethical Machine Learning',
      nextLessonModuleId: 'module-8',
    },
  },

  'fairness-bias-ethics': {
    id: 'fairness-bias-ethics',
    moduleId: 'module-8',
    title: 'Algorithmic Fairness, Bias & Ethical Machine Learning',
    subtitle: 'Demographic Parity, Equalized Odds & The Mathematical Impossibility of Fairness',
    order: 4,
    readTimeMinutes: 25,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand how historical bias and proxy variables infiltrate machine learning systems.',
      'Define and evaluate Demographic Parity (Statistical Parity) and the EEOC 80% Four-Fifths rule.',
      'Derive Equalized Odds and Equal Opportunity (Hardt et al., 2016).',
      'Explain Kleinberg’s Impossibility Theorem of Fairness.',
    ],
    prerequisites: ['cost-sensitive-learning', 'module-5 Model Evaluation', 'Probability theory'],
    previousLesson: {
      id: 'cost-sensitive-learning',
      title: 'Cost-Sensitive Learning & Asymmetric Error Optimization',
      moduleId: 'module-8',
    },
    analogy: {
      title: 'The Standardized College Admissions Exam',
      text: 'Suppose two high schools take a college admissions test. School A is well-funded with private tutors; School B has outdated textbooks and overcrowded classrooms. If the college enforces Demographic Parity, it admits the exact same percentage of applicants from both schools regardless of test scores. If it enforces Equal Opportunity, it guarantees that equally qualified students (those who would succeed in college) have the same acceptance rate regardless of which school they attended. But if the baseline success rates between schools differ, you cannot mathematically satisfy both definitions at the same time.',
      metaphor: 'Algorithmic fairness formalizes ethical values into mathematical constraints, revealing inherent trade-offs between competing definitions of equity.',
    },
    problemSolved: {
      title: 'Preventing Automated Systems from Perpetuating Systemic Bias',
      description: 'Machine learning models trained on historical data naturally learn and amplify human societal biases. In lending, hiring, criminal sentencing, and facial recognition, unconstrained models can discriminate against protected demographic groups (race, gender, age).',
      keyPoints: [
        'Exposes proxy variables: simply removing protected attributes (e.g. race) fails because zip code and education correlate strongly with them.',
        'Formalizes group fairness criteria: Demographic Parity, Equalized Odds, Predictive Parity.',
        'Proves Kleinberg’s theorem: competing fairness criteria are mutually incompatible when base rates differ.',
      ],
    },
    intuition: {
      overview: 'Fairness metrics evaluate whether model predictions Y_hat are independent of a protected sensitive attribute A (e.g. gender or race), conditioned on true outcome Y.',
      steps: [
        {
          step: 1,
          title: 'Identify Protected Attribute A',
          description: 'Define sensitive demographic attribute A in {0, 1} (e.g. minority group vs majority group).',
        },
        {
          step: 2,
          title: 'Measure Demographic Parity',
          description: 'Check if positive selection rates are equal across groups: P(Y_hat = 1 | A = 0) = P(Y_hat = 1 | A = 1).',
        },
        {
          step: 3,
          title: 'Measure Equal Opportunity (TPR Parity)',
          description: 'Check if True Positive Rates are equal across groups among qualified candidates: P(Y_hat = 1 | A = 0, Y = 1) = P(Y_hat = 1 | A = 1, Y = 1).',
        },
        {
          step: 4,
          title: 'Apply Mitigation',
          description: 'Mitigate bias pre-processing (re-weighing), in-processing (adversarial debiasing), or post-processing (group-specific thresholding).',
        },
      ],
    },
    mathematics: {
      overview: 'Algorithmic fairness is mathematically formulated as conditional independence statements between predictions Y_hat, true labels Y, and sensitive attributes A.',
      foundations: [
        {
          name: 'Demographic Parity (Statistical Parity)',
          latex: 'P(\\hat{Y} = 1 \\mid A = 0) = P(\\hat{Y} = 1 \\mid A = 1)',
          explanation: 'The probability of receiving a positive decision is identical across demographic groups, regardless of true label distributions.',
        },
        {
          name: 'Disparate Impact Ratio (EEOC 80% Rule)',
          latex: '\\text{DI} = \\frac{P(\\hat{Y} = 1 \\mid A = 0)}{P(\\hat{Y} = 1 \\mid A = 1)} \\ge 0.80',
          explanation: 'US Equal Employment Opportunity Commission standard: if selection rate for a protected group is less than 80% of the highest group, disparate impact is present.',
        },
        {
          name: 'Equalized Odds (Hardt, Price & Srebro, 2016)',
          latex: 'P(\\hat{Y} = 1 \\mid A = 0, Y = y) = P(\\hat{Y} = 1 \\mid A = 1, Y = y) \\quad \\forall y \\in \\{0, 1\\}',
          explanation: 'Requires both True Positive Rate (TPR) and False Positive Rate (FPR) to be equal across demographic groups.',
        },
        {
          name: 'Equal Opportunity (TPR Parity)',
          latex: 'P(\\hat{Y} = 1 \\mid A = 0, Y = 1) = P(\\hat{Y} = 1 \\mid A = 1, Y = 1)',
          explanation: 'Relaxation of Equalized Odds focusing only on the advantaged outcome (Y = 1): qualified individuals have equal chances of approval.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Kleinberg’s Impossibility Theorem of Fairness',
      objective: 'Prove that Calibration Within Groups, Equal False Positive Rates, and Equal False Negative Rates cannot be satisfied simultaneously unless base rates are identical.',
      steps: [
        {
          step: 1,
          label: 'Define group base rates',
          latex: 'p_0 = P(Y = 1 \\mid A = 0), \\quad p_1 = P(Y = 1 \\mid A = 1), \\quad \\text{with } p_0 \\neq p_1',
          explanation: 'Assume the underlying base rates differ between groups due to historical systemic factors.',
        },
        {
          step: 2,
          label: 'Assume Calibration Within Groups (Predictive Parity)',
          latex: 'P(Y = 1 \\mid \\hat{Y} = 1, A = 0) = P(Y = 1 \\mid \\hat{Y} = 1, A = 1) = c',
          explanation: 'A score of 1 means the exact same probability of true success regardless of group.',
        },
        {
          step: 3,
          label: 'Express base rate in terms of error rates and selection rate',
          latex: 'P(Y = 1) = \\text{TPR} \\cdot P(\\hat{Y} = 1) + (1 - \\text{TNR}) \\cdot P(\\hat{Y} = 0)',
          explanation: 'Using the law of total probability on the confusion matrix.',
        },
        {
          step: 4,
          label: 'Enforce equal error rates (Equalized Odds: TPR_0 = TPR_1, FPR_0 = FPR_1)',
          latex: 'p_0 = \\text{TPR} \\cdot s_0 + \\text{FPR} \\cdot (1 - s_0), \\quad p_1 = \\text{TPR} \\cdot s_1 + \\text{FPR} \\cdot (1 - s_1)',
          explanation: 'where s_0 and s_1 are the selection rates P(Y_hat = 1 | A).',
        },
        {
          step: 5,
          label: 'Reach algebraic contradiction',
          latex: 'p_0 - p_1 = (\\text{TPR} - \\text{FPR})(s_0 - s_1)',
          explanation: 'If calibration holds, s_0 and s_1 are locked. But if p_0 != p_1, error rates TPR and FPR CANNOT be equal unless the classifier has perfect 100% accuracy (TPR=1, FPR=0). Thus, you cannot satisfy all three fairness definitions simultaneously.',
        },
      ],
    },
    variables: [
      { symbol: 'A', name: 'Sensitive (Protected) Attribute', description: 'Demographic characteristic protected by law (e.g. gender, race, age)', dimensions: 'Binary in {0, 1}' },
      { symbol: 'Y', name: 'True Label', description: 'Actual ground truth target outcome', dimensions: 'Binary in {0, 1}' },
      { symbol: '\\hat{Y}', name: 'Model Prediction', description: 'Binary decision made by the model', dimensions: 'Binary in {0, 1}' },
      { symbol: '\\text{DI}', name: 'Disparate Impact Ratio', description: 'Ratio of positive selection rates between unprivileged and privileged groups', dimensions: 'Scalar >= 0' },
    ],
    numericalExample: {
      scenario: 'Loan Approval Audit: Evaluate Demographic Parity and Disparate Impact for Group A=0 (Unprivileged) vs Group A=1 (Privileged).',
      dataset: [
        { group: 'Unprivileged (A=0)', total_applicants: 200, approved: 80, selection_rate: 0.40 },
        { group: 'Privileged (A=1)', total_applicants: 500, approved: 350, selection_rate: 0.70 },
      ],
      calculations: [
        {
          step: 'Compute Selection Rate for Unprivileged Group A=0',
          math: 'P(\\hat{Y}=1 \\mid A=0) = \\frac{80}{200} = 0.40 \\quad (40\\%)',
          result: 'SR_0 = 0.40',
        },
        {
          step: 'Compute Selection Rate for Privileged Group A=1',
          math: 'P(\\hat{Y}=1 \\mid A=1) = \\frac{350}{500} = 0.70 \\quad (70\\%)',
          result: 'SR_1 = 0.70',
        },
        {
          step: 'Compute Disparate Impact Ratio',
          math: '\\text{DI} = \\frac{SR_0}{SR_1} = \\frac{0.40}{0.70} = 0.5714',
          result: 'DI = 57.1% (Substantially below the 80% legal threshold!)',
        },
        {
          step: 'Evaluate Demographic Parity Difference',
          math: '\\Delta = |0.40 - 0.70| = 0.30',
          result: '30% Demographic Parity Gap (Violates Demographic Parity)',
        },
      ],
      finalConclusion: 'The loan model fails the EEOC 80% rule (57.1% < 80%), indicating substantial adverse disparate impact.',
    },
    visualExplanation: {
      title: 'Fairness Confusion Matrix Disparities',
      description: 'The visual diagram places two confusion matrices side by side: one for Group 0 (Unprivileged) and one for Group 1 (Privileged). Green highlights show the True Positive Rate (Opportunity) while red highlights show False Positive Rate (Fallout). Group-specific threshold shifting moves the decision line independently for each group to equalize the green bars.',
      features: [
        'Group 0 Confusion Matrix: Lower approval volume, higher False Rejection rate.',
        'Group 1 Confusion Matrix: Higher approval volume, lower False Rejection rate.',
        'Post-Processing Calibration: Group-specific thresholds (tau_0 != tau_1) equalize TPR.',
      ],
    },
    scratchCode: {
      title: 'Fairness Metrics Evaluator from Scratch in Python',
      code: `import numpy as np

def evaluate_fairness_metrics(y_true, y_pred, sensitive_attr):
    """
    Compute Demographic Parity, Disparate Impact, and Equal Opportunity.
    sensitive_attr: binary array where 0 = unprivileged, 1 = privileged.
    """
    mask_0 = (sensitive_attr == 0)
    mask_1 = (sensitive_attr == 1)

    # 1. Selection Rates (Demographic Parity)
    sr_0 = np.mean(y_pred[mask_0] == 1)
    sr_1 = np.mean(y_pred[mask_1] == 1)
    disparate_impact = sr_0 / sr_1 if sr_1 > 0 else 0.0
    stat_parity_diff = abs(sr_0 - sr_1)

    # 2. Equal Opportunity (True Positive Rate Parity)
    tpr_0 = np.sum((y_true[mask_0] == 1) & (y_pred[mask_0] == 1)) / np.sum(y_true[mask_0] == 1)
    tpr_1 = np.sum((y_true[mask_1] == 1) & (y_pred[mask_1] == 1)) / np.sum(y_true[mask_1] == 1)
    equal_opp_diff = abs(tpr_0 - tpr_1)

    return {
        'selection_rate_unprivileged': round(sr_0, 4),
        'selection_rate_privileged': round(sr_1, 4),
        'disparate_impact_ratio': round(disparate_impact, 4),
        'passes_80_pct_rule': disparate_impact >= 0.80,
        'demographic_parity_gap': round(stat_parity_diff, 4),
        'equal_opportunity_gap': round(equal_opp_diff, 4)
    }
`,
      explanation: 'Computes selection rates, disparate impact ratio against the 80% rule, demographic parity gap, and equal opportunity TPR differences.',
    },
    sklearnCode: {
      title: 'Auditing and Mitigating Bias in Python',
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
import numpy as np

# Post-processing mitigation: Group-specific threshold tuning (Hardt et al.)
def apply_group_thresholds(y_probs, sensitive_attr, tau_0, tau_1):
    preds = np.zeros_like(y_probs, dtype=int)
    # Apply tau_0 to unprivileged group
    preds[sensitive_attr == 0] = (y_probs[sensitive_attr == 0] >= tau_0).astype(int)
    # Apply tau_1 to privileged group
    preds[sensitive_attr == 1] = (y_probs[sensitive_attr == 1] >= tau_1).astype(int)
    return preds
`,
      explanation: 'Implements post-processing threshold adjustment to equalize True Positive Rates across demographic groups.',
    },
    runnableCode: {
      code: `import numpy as np

# Audit a biased model on synthetic loan approvals
np.random.seed(42)
N = 1000

# 50% Group 0 (Unprivileged), 50% Group 1 (Privileged)
sensitive_attr = np.random.binomial(1, 0.5, size=N)

# Qualified status (true label Y): equal 60% qualification in both groups
y_true = np.random.binomial(1, 0.6, size=N)

# Biased model predictions: approves Group 1 at 75%, approves Group 0 at 45%
y_pred = np.zeros(N, dtype=int)
for i in range(N):
    if sensitive_attr[i] == 1:
        y_pred[i] = np.random.binomial(1, 0.75 if y_true[i] == 1 else 0.20)
    else:
        y_pred[i] = np.random.binomial(1, 0.45 if y_true[i] == 1 else 0.10)

# Evaluate metrics
sr_0 = np.mean(y_pred[sensitive_attr == 0])
sr_1 = np.mean(y_pred[sensitive_attr == 1])
di_ratio = sr_0 / sr_1

tpr_0 = np.sum((y_true[sensitive_attr == 0] == 1) & (y_pred[sensitive_attr == 0] == 1)) / np.sum(y_true[sensitive_attr == 0] == 1)
tpr_1 = np.sum((y_true[sensitive_attr == 1] == 1) & (y_pred[sensitive_attr == 1] == 1)) / np.sum(y_true[sensitive_attr == 1] == 1)

print(f"Group 0 (Unprivileged) Approval Rate: {sr_0 * 100:.1f}%")
print(f"Group 1 (Privileged)   Approval Rate: {sr_1 * 100:.1f}%")
print(f"Disparate Impact Ratio:               {di_ratio:.4f} (Violates 80% rule: {di_ratio < 0.80})")
print(f"Group 0 True Positive Rate (TPR):     {tpr_0 * 100:.1f}%")
print(f"Group 1 True Positive Rate (TPR):     {tpr_1 * 100:.1f}%")
print(f"Equal Opportunity Gap:                {abs(tpr_1 - tpr_0) * 100:.1f}%")
`,
      expectedOutput: `Group 0 (Unprivileged) Approval Rate: 30.5%
Group 1 (Privileged)   Approval Rate: 52.8%
Disparate Impact Ratio:               0.5772 (Violates 80% rule: True)
Group 0 True Positive Rate (TPR):     44.2%
Group 1 True Positive Rate (TPR):     74.7%
Equal Opportunity Gap:                30.5%`,
    },
    lineByLineExplanation: [
      {
        lines: '19-21',
        codeSnippet: 'sr_0 = np.mean(y_pred[sensitive_attr == 0])\nsr_1 = np.mean(y_pred[sensitive_attr == 1])\ndi_ratio = sr_0 / sr_1',
        explanation: 'Calculates the selection rate for each group and computes the disparate impact ratio (0.5772).',
      },
      {
        lines: '23-28',
        codeSnippet: 'tpr_0 = np.sum(...) / np.sum(...)\nprint(...)',
        explanation: 'Evaluates the Equal Opportunity gap, showing that qualified members in Group 1 have a 74.7% approval chance vs only 44.2% in Group 0.',
      },
    ],
    hyperparameters: [
      {
        name: 'threshold_tuning_strategy',
        defaultVal: "'single_global'",
        range: "['single_global', 'group_specific']",
        effect: 'Group-specific thresholds (tau_0, tau_1) allow equalizing TPR or FPR across groups post-hoc without retraining.',
        recommendation: 'Use group-specific thresholding to achieve Equal Opportunity when legally permissible.',
      },
    ],
    assumptions: [
      {
        assumption: 'Fairness by Blindness Is Ineffective',
        whyItMatters: 'Removing protected attribute A from training features does NOT ensure fairness because other features (zip code, school, surname) serve as proxies.',
        howToVerify: 'Audit predictions on held-out sensitive demographic attributes.',
      },
      {
        assumption: 'Inherent Trade-offs Between Accuracy and Fairness',
        whyItMatters: 'Enforcing mathematical parity constraints on an unconstrained risk model typically reduces overall global accuracy slightly.',
        howToVerify: 'Plot the Pareto frontier between accuracy and fairness metrics.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming that "Fairness by Disregard" (dropping the race/gender column) eliminates bias.',
        solution: 'Modern models easily reconstruct protected attributes from correlated features. You must explicitly audit predictions with fairness metrics.',
      },
      {
        mistake: 'Promising to satisfy both Demographic Parity and Equalized Odds simultaneously.',
        solution: 'Kleinberg’s Impossibility Theorem proves that when base rates differ, satisfying both is mathematically impossible. Pick the single criterion aligned with legal/ethical objectives.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Mortgage Lending & Credit Scoring', application: 'Fair Lending Compliance (CFPB)', benefit: 'Audits loan underwriting models to guarantee compliance with the Equal Credit Opportunity Act (ECOA).' },
      { industry: 'Criminal Justice', application: 'Recidivism Risk Scoring (COMPAS Audit)', benefit: 'Audits bail and sentencing recommendation algorithms for False Positive Rate disparities across racial demographics.' },
      { industry: 'Talent Acquisition & Hiring', application: 'Automated Resume Parsing', benefit: 'Ensures AI screening tools satisfy the EEOC 80% rule for gender and ethnic minority candidate pools.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-8-4-1',
        question: 'What is "Fairness by Disregard" (Fairness through Unawareness), and why does it fail?',
        hint: 'What happens when features like zip code and university correlate with race?',
        answer: 'Fairness through Unawareness simply drops the protected attribute (e.g. race or gender) from the feature set. It fails because remaining features (such as postal code, browsing history, high school, or club memberships) act as strong proxy variables, allowing the model to implicitly reconstruct the protected attribute and replicate the bias.',
      },
      {
        id: 'pq-8-4-2',
        question: 'What is the EEOC 80% (Four-Fifths) rule in employment discrimination law?',
        hint: 'Evaluate the ratio of selection rates.',
        answer: 'The US Equal Employment Opportunity Commission 80% rule states that a selection rate for any race, sex, or ethnic group which is less than four-fifths (80%) of the rate for the group with the highest selection rate is regarded as prima facie evidence of adverse impact (disparate impact).',
      },
      {
        id: 'pq-8-4-3',
        question: 'What does Kleinberg’s Impossibility Theorem of Fairness state?',
        hint: 'Can Calibration, Equal FPR, and Equal FNR all hold at once?',
        answer: 'It proves mathematically that three desirable fairness criteria—1) Calibration within groups (Predictive Parity), 2) Equal False Positive Rates, and 3) Equal False Negative Rates (Equalized Odds)—are mutually incompatible and cannot all be satisfied simultaneously, unless the classifier achieves 100% perfect accuracy or the base rates of the groups are identical.',
      },
    ],
    quiz: [
      {
        id: 'q-8-4-1',
        question: 'Which fairness metric requires that the probability of positive selection be identical across demographic groups, regardless of true target distributions?',
        options: [
          'Demographic Parity (Statistical Parity)',
          'Equalized Odds',
          'Calibration Within Groups',
          'Mean Squared Error',
        ],
        correctIndex: 0,
        explanation: 'Demographic Parity requires P(Y_hat = 1 | A = 0) = P(Y_hat = 1 | A = 1), meaning both groups receive positive outcomes at identical rates.',
      },
      {
        id: 'q-8-4-2',
        question: 'If Group A has a hiring selection rate of 60%, what is the minimum selection rate Group B must achieve to satisfy the EEOC 80% Four-Fifths rule?',
        options: [
          '30%',
          '48% (0.80 * 60%)',
          '60%',
          '80%',
        ],
        correctIndex: 1,
        explanation: 'Under the Four-Fifths rule, the selection rate must be at least 80% of the highest group: 0.80 * 0.60 = 0.48 (48%).',
      },
      {
        id: 'q-8-4-3',
        question: 'What is the Equal Opportunity criterion (Hardt et al., 2016)?',
        options: [
          'Everyone receives the exact same salary.',
          'True Positive Rates (TPR) are equal across groups for individuals who actually qualify (Y = 1).',
          'Accuracy must be 100%.',
          'Models must not use decision trees.',
        ],
        correctIndex: 1,
        explanation: 'Equal Opportunity requires P(Y_hat = 1 | A = 0, Y = 1) = P(Y_hat = 1 | A = 1, Y = 1), guaranteeing that qualified candidates have equal chances regardless of protected attribute.',
      },
    ],
    independentExercise: {
      title: 'Mitigate Equal Opportunity Gap via Group-Specific Thresholds',
      problem: 'Write a Python script that takes predicted probabilities and adjusts the decision threshold for Group 0 from 0.50 down to a custom threshold tau_0 that equalizes its True Positive Rate (TPR) with Group 1.',
      hints: ['Iterate through candidate tau_0 in np.linspace(0.1, 0.5, 50)', 'Find tau_0 where abs(tpr_0 - tpr_1) is minimized'],
      starterCode: `import numpy as np

# Synthetic probabilities for qualified candidates (Y=1)
probs_g0 = np.random.beta(2, 3, size=200) # G0 scores are compressed lower
probs_g1 = np.random.beta(4, 2, size=200) # G1 scores are higher

# At default tau=0.5:
tpr_g1 = np.mean(probs_g1 >= 0.5)
print(f"Group 1 TPR at tau=0.5: {tpr_g1:.4f}")

# TODO: Find tau_0 for Group 0 that matches Group 1 TPR
`,
      solution: `import numpy as np

np.random.seed(42)
probs_g0 = np.random.beta(2, 3, size=200)
probs_g1 = np.random.beta(4, 2, size=200)

tpr_g1 = np.mean(probs_g1 >= 0.5)

# Search for tau_0 that achieves tpr_g1
thresholds = np.linspace(0.1, 0.6, 100)
best_tau_0 = None
min_gap = float('inf')

for t in thresholds:
    tpr_0 = np.mean(probs_g0 >= t)
    gap = abs(tpr_0 - tpr_g1)
    if gap < min_gap:
        min_gap = gap
        best_tau_0 = t

print(f"Group 1 TPR at tau=0.500:  {tpr_g1:.4f}")
print(f"Optimal tau_0 for Group 0:  {best_tau_0:.4f}")
print(f"Group 0 TPR at tau_0:       {np.mean(probs_g0 >= best_tau_0):.4f}")
print(f"Mitigated Equal Opportunity Gap: {abs(np.mean(probs_g0 >= best_tau_0) - tpr_g1):.4f}")
`,
    },
    summary: {
      keyTakeaways: [
        'Algorithmic bias occurs naturally when models train on historically biased data; removing protected variables fails due to proxy correlations.',
        'Demographic Parity equalizes acceptance rates; Equal Opportunity equalizes True Positive Rates among qualified individuals.',
        'Kleinberg’s Impossibility Theorem proves that when base rates differ, competing fairness definitions cannot be satisfied simultaneously.',
      ],
      nextLessonId: 'data-and-concept-drift',
      nextLessonTitle: 'Data Drift, Concept Drift & Model Monitoring',
      nextLessonModuleId: 'module-8',
    },
  },

  'data-and-concept-drift': {
    id: 'data-and-concept-drift',
    moduleId: 'module-8',
    title: 'Data Drift, Concept Drift & Model Monitoring',
    subtitle: 'Covariate Shift, Concept Drift, Kolmogorov-Smirnov Tests & Population Stability Index',
    order: 5,
    readTimeMinutes: 25,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Deconstruct the taxonomy of distribution shift: Covariate Shift, Concept Drift, and Prior Probability Shift.',
      'Apply the two-sample Kolmogorov-Smirnov (KS) statistical hypothesis test to detect numerical data drift.',
      'Calculate the Population Stability Index (PSI) and interpret standard production thresholds (< 0.1, 0.1-0.25, > 0.25).',
      'Design an automated production monitoring and retraining architecture.',
    ],
    prerequisites: ['module-5 Model Evaluation', 'Hypothesis testing', 'Probability distributions'],
    previousLesson: {
      id: 'fairness-bias-ethics',
      title: 'Algorithmic Fairness, Bias & Ethical Machine Learning',
      moduleId: 'module-8',
    },
    analogy: {
      title: 'The Outdated Weather Forecaster',
      text: 'Imagine a weather forecasting model trained exclusively on autumn data (September to November in London). In December, temperatures plummet and snow arrives. The model experiences Covariate Shift: the input feature distributions P(X) have changed radically. Furthermore, suppose global warming permanently shifts jet stream patterns: the relationship between barometric pressure and rainfall P(Y | X) has changed. That is Concept Drift. The model’s past accuracy is completely useless unless drift is actively monitored and detected.',
      metaphor: 'Data drift is when the input features change; concept drift is when the relationship between features and labels changes.',
    },
    problemSolved: {
      title: 'Preventing Silent Model Decay in Production',
      description: 'Machine learning models operate on the foundational assumption that production data is Independent and Identically Distributed (I.I.D.) relative to training data. In reality, consumer preferences evolve, inflation changes prices, sensor hardware degrades, and competitor actions shift market dynamics.',
      keyPoints: [
        'Detects silent performance decay before catastrophic business revenue loss occurs.',
        'Differentiates Covariate Shift P(X) from Concept Drift P(Y | X).',
        'Implements automated statistical drift alarms using KS-tests and Population Stability Index (PSI).',
      ],
    },
    intuition: {
      overview: 'Joint data distribution decomposes via Bayes rule: P(X, Y) = P(X) * P(Y | X). Any shift in P(X, Y) must stem from changes in input features P(X), conditional relationship P(Y | X), or label priors P(Y).',
      steps: [
        {
          step: 1,
          title: 'Establish Reference Baseline',
          description: 'Store the training or validation dataset distributions as the golden baseline reference.',
        },
        {
          step: 2,
          title: 'Ingest Current Production Window',
          description: 'Collect incoming production inferences over a sliding window (e.g. daily or weekly batch).',
        },
        {
          step: 3,
          title: 'Statistical Hypothesis Testing',
          description: 'Run two-sample tests (KS-test for continuous features, Chi-Square for categorical) and calculate PSI.',
        },
        {
          step: 4,
          title: 'Trigger Automated Remediation',
          description: 'If PSI > 0.25, trigger automated alerts and initiate pipeline retraining on fresh data.',
        },
      ],
    },
    mathematics: {
      overview: 'Drift detection relies on non-parametric two-sample distance metrics and information-theoretic divergence.',
      foundations: [
        {
          name: 'The Taxonomy of Distribution Shift',
          latex: 'P(X, Y) = P(X) P(Y \\mid X) = P(Y) P(X \\mid Y)',
          explanation: 'Covariate Shift: P(X) changes while P(Y|X) is constant. Concept Drift: P(Y|X) changes while P(X) may be constant. Prior Shift: P(Y) changes.',
        },
        {
          name: 'Kolmogorov-Smirnov (KS) Two-Sample Test Statistic',
          latex: 'D = \\sup_x |F_{\\text{ref}}(x) - F_{\\text{curr}}(x)|',
          explanation: 'Maximum vertical distance between the empirical cumulative distribution functions (ECDF) of the reference and current datasets.',
        },
        {
          name: 'Population Stability Index (PSI)',
          latex: '\\text{PSI} = \\sum_{b=1}^B (A_b - E_b) \\ln \\left( \\frac{A_b}{E_b} \\right)',
          explanation: 'Symmetric Kullback-Leibler divergence between Actual current proportion A_b and Expected baseline proportion E_b across B bins.',
        },
        {
          name: 'Standard PSI Production Rule-of-Thumb Thresholds',
          latex: '\\text{PSI} < 0.10 \\implies \\text{No Shift}; \\quad 0.10 \\le \\text{PSI} \\le 0.25 \\implies \\text{Moderate Drift}; \\quad \\text{PSI} > 0.25 \\implies \\text{Significant Drift (Retrain)}',
          explanation: 'Universal financial banking and regulatory industry standard for model health monitoring.',
        },
      ],
    },
    derivation: {
      title: 'Derivation and Symmetry Proof of Population Stability Index (PSI)',
      objective: 'Prove that PSI is non-negative and equals the sum of forward and reverse KL divergences: KL(A || E) + KL(E || A).',
      steps: [
        {
          step: 1,
          label: 'Recall the discrete Kullback-Leibler divergence',
          latex: 'D_{\\text{KL}}(A \\parallel E) = \\sum_{b=1}^B A_b \\ln\\left(\\frac{A_b}{E_b}\\right), \\quad D_{\\text{KL}}(E \\parallel A) = \\sum_{b=1}^B E_b \\ln\\left(\\frac{E_b}{A_b}\\right)',
          explanation: 'Standard relative entropy between probability vectors A and E.',
        },
        {
          step: 2,
          label: 'Invert the logarithm in the reverse KL term',
          latex: 'D_{\\text{KL}}(E \\parallel A) = \\sum_{b=1}^B E_b \\left( -\\ln\\left(\\frac{A_b}{E_b}\\right) \\right) = - \\sum_{b=1}^B E_b \\ln\\left(\\frac{A_b}{E_b}\\right)',
          explanation: 'Using the logarithmic identity ln(1/x) = -ln(x).',
        },
        {
          step: 3,
          label: 'Sum the two directed KL divergences',
          latex: 'D_{\\text{KL}}(A \\parallel E) + D_{\\text{KL}}(E \\parallel A) = \\sum_{b=1}^B A_b \\ln\\left(\\frac{A_b}{E_b}\\right) - \\sum_{b=1}^B E_b \\ln\\left(\\frac{A_b}{E_b}\\right)',
          explanation: 'Combining both directional divergences into a single summation.',
        },
        {
          step: 4,
          label: 'Factor out the common logarithmic term',
          latex: '\\sum_{b=1}^B (A_b - E_b) \\ln\\left(\\frac{A_b}{E_b}\\right) = \\text{PSI}',
          explanation: 'This proves that PSI is exactly the symmetric Jeffrey’s divergence between distributions A and E, guaranteeing PSI >= 0 with equality if and only if A = E.',
        },
      ],
    },
    variables: [
      { symbol: 'F_{\\text{ref}}(x)', name: 'Reference Empirical CDF', description: 'Empirical cumulative distribution function of training baseline', dimensions: 'Function mapping R -> [0, 1]' },
      { symbol: 'F_{\\text{curr}}(x)', name: 'Current Empirical CDF', description: 'Empirical cumulative distribution function of recent production inference window', dimensions: 'Function mapping R -> [0, 1]' },
      { symbol: 'E_b', name: 'Expected Baseline Proportion', description: 'Fraction of baseline reference samples falling into bin b', dimensions: 'Probability in (0, 1)' },
      { symbol: 'A_b', name: 'Actual Current Proportion', description: 'Fraction of current production samples falling into bin b', dimensions: 'Probability in (0, 1)' },
      { symbol: '\\text{PSI}', name: 'Population Stability Index', description: 'Metric quantifying shift between baseline and current distributions', dimensions: 'Scalar >= 0' },
    ],
    numericalExample: {
      scenario: 'Compute the Population Stability Index (PSI) across B=3 bins between baseline Expected E and current Actual A.',
      dataset: [
        { bin: 'Bin 1 (Low)', expected_E: 0.20, actual_A: 0.30 },
        { bin: 'Bin 2 (Med)', expected_E: 0.50, actual_A: 0.40 },
        { bin: 'Bin 3 (High)', expected_E: 0.30, actual_A: 0.30 },
      ],
      calculations: [
        {
          step: 'Compute PSI contribution for Bin 1',
          math: '(A_1 - E_1) \\ln(A_1 / E_1) = (0.30 - 0.20) \\ln(0.30 / 0.20) = 0.10 \\times \\ln(1.50) = 0.10 \\times 0.4055',
          result: 'PSI_1 = 0.0405',
        },
        {
          step: 'Compute PSI contribution for Bin 2',
          math: '(A_2 - E_2) \\ln(A_2 / E_2) = (0.40 - 0.50) \\ln(0.40 / 0.50) = -0.10 \\times \\ln(0.80) = -0.10 \\times (-0.2231)',
          result: 'PSI_2 = 0.0223',
        },
        {
          step: 'Compute PSI contribution for Bin 3',
          math: '(A_3 - E_3) \\ln(A_3 / E_3) = (0.30 - 0.30) \\ln(0.30 / 0.30) = 0.0 \\times 0.0',
          result: 'PSI_3 = 0.0000',
        },
        {
          step: 'Sum contributions to find total PSI',
          math: '\\text{PSI} = 0.0405 + 0.0223 + 0.0000',
          result: 'PSI = 0.0628',
        },
      ],
      finalConclusion: 'Total PSI is 0.0628 (< 0.10), indicating stable data with no significant drift.',
    },
    visualExplanation: {
      title: 'Covariate Shift vs Concept Drift Distributions',
      description: 'The interactive visualizer graphs two side-by-side distribution panels. Panel 1 (Covariate Shift) shows the input feature bell curve X shifting to the right while the decision boundary remains static. Panel 2 (Concept Drift) shows the input distribution X remaining completely unchanged while the true classification decision line rotates 45 degrees, rendering the model inaccurate.',
      features: [
        'Covariate Shift: P(X) moves; P(Y|X) fixed. Detected by monitoring feature distributions.',
        'Concept Drift: P(X) static; P(Y|X) changes. Detected by tracking ground truth error rates.',
        'Prior Shift: P(Y) shifts (e.g. holiday season fraud spikes from 1% to 5%).',
      ],
    },
    scratchCode: {
      title: 'Population Stability Index (PSI) from Scratch in NumPy',
      code: `import numpy as np

def calculate_psi(reference, current, num_bins=10, epsilon=1e-4):
    """
    Calculate Population Stability Index (PSI) between reference and current data.
    """
    # 1. Determine quantile bin edges from reference baseline
    quantiles = np.linspace(0, 100, num_bins + 1)
    bin_edges = np.percentile(reference, quantiles)
    bin_edges[0] -= 1e-5
    bin_edges[-1] += 1e-5

    # 2. Count samples per bin
    ref_counts, _ = np.histogram(reference, bins=bin_edges)
    curr_counts, _ = np.histogram(current, bins=bin_edges)

    # 3. Calculate fractions with epsilon smoothing to prevent div by zero
    E = (ref_counts + epsilon) / (len(reference) + num_bins * epsilon)
    A = (curr_counts + epsilon) / (len(current) + num_bins * epsilon)

    # 4. Compute PSI = sum (A - E) * ln(A / E)
    psi_value = np.sum((A - E) * np.log(A / E))
    return psi_value
`,
      explanation: 'Calculates reference quantile bin edges, computes relative frequency histograms for baseline and current datasets with Laplace smoothing, and evaluates the symmetric divergence.',
    },
    sklearnCode: {
      title: 'Two-Sample Kolmogorov-Smirnov Test with SciPy',
      code: `from scipy.stats import ks_2samp
import numpy as np

# Baseline reference distribution (e.g. Training data)
reference_data = np.random.normal(loc=100, scale=15, size=1000)

# Scenario A: Stable production batch (no drift)
current_stable = np.random.normal(loc=100.5, scale=15, size=500)
ks_stat, p_val_stable = ks_2samp(reference_data, current_stable)
print(f"Stable Batch  -> KS Stat: {ks_stat:.4f}, p-value: {p_val_stable:.4f} (No drift detected)")

# Scenario B: Shifted production batch (Covariate shift)
current_drifted = np.random.normal(loc=105, scale=18, size=500)
ks_stat_drift, p_val_drift = ks_2samp(reference_data, current_drifted)
print(f"Drifted Batch -> KS Stat: {ks_stat_drift:.4f}, p-value: {p_val_drift:.4e} (SEVERE DRIFT DETECTED!)")
`,
      explanation: 'Applies scipy.stats.ks_2samp to evaluate whether current production data originates from the same continuous distribution as training data.',
    },
    runnableCode: {
      code: `import numpy as np

# Verify Numerical PSI Calculation
E = np.array([0.20, 0.50, 0.30])
A = np.array([0.30, 0.40, 0.30])

psi_components = (A - E) * np.log(A / E)
total_psi = np.sum(psi_components)

print("Bin 1 PSI Component: ", round(psi_components[0], 4))
print("Bin 2 PSI Component: ", round(psi_components[1], 4))
print("Bin 3 PSI Component: ", round(psi_components[2], 4))
print("Total PSI:           ", round(total_psi, 4))

if total_psi < 0.10:
    action = "Green: Stable. No action required."
elif total_psi <= 0.25:
    action = "Yellow: Moderate drift. Queue pipeline for review."
else:
    action = "Red: Significant drift! Trigger automated retraining."

print("Monitoring Alert Status:", action)
`,
      expectedOutput: `Bin 1 PSI Component:  0.0405
Bin 2 PSI Component:  0.0223
Bin 3 PSI Component:  0.0
Total PSI:            0.0628
Monitoring Alert Status: Green: Stable. No action required.`,
    },
    lineByLineExplanation: [
      {
        lines: '4-8',
        codeSnippet: 'psi_components = (A - E) * np.log(A / E)\ntotal_psi = np.sum(psi_components)',
        explanation: 'Implements the Population Stability Index formula across 3 discrete histogram bins.',
      },
      {
        lines: '15-22',
        codeSnippet: 'if total_psi < 0.10: ...\nprint(...)',
        explanation: 'Applies industry standard monitoring thresholds, determining that PSI = 0.0628 is green (stable).',
      },
    ],
    hyperparameters: [
      {
        name: 'num_bins (in PSI)',
        defaultVal: '10',
        range: '5 to 20',
        effect: 'Number of quantile partitions used to discretize continuous feature distributions.',
        recommendation: 'Use 10 decile bins (10% of reference data per bin) for standard production monitoring.',
      },
      {
        name: 'alpha (KS Test significance)',
        defaultVal: '0.05',
        range: '0.01 to 0.10',
        effect: 'Significance threshold for rejecting the null hypothesis of identical distributions.',
        recommendation: 'Use alpha = 0.01 with Bonferroni correction when monitoring hundreds of features simultaneously.',
      },
    ],
    assumptions: [
      {
        assumption: 'Sufficient Sample Size in Monitoring Window',
        whyItMatters: 'Evaluating drift on a small batch of 20 inferences causes massive sampling noise and false positive alerts.',
        howToVerify: 'Ensure current monitoring window contains at least 500-1,000 observations.',
      },
      {
        assumption: 'Continuous Features for KS-Test',
        whyItMatters: 'The two-sample KS test assumes continuous cumulative distributions. On discrete or categorical features, use the Chi-Square goodness-of-fit test.',
        howToVerify: 'Verify feature data types before applying KS-test.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Retraining models immediately upon detecting minor data drift without verifying accuracy.',
        solution: 'If covariate shift occurs in an irrelevant feature, model accuracy may be completely unaffected. Verify whether concept drift P(Y|X) has occurred before retraining.',
      },
      {
        mistake: 'Failing to apply multiple testing correction (e.g. Bonferroni) when monitoring 100+ features with KS-tests.',
        solution: 'At alpha = 0.05, monitoring 100 features produces 5 false alarms every day by pure chance. Correct thresholds with Bonferroni alpha / p.',
      },
    ],
    realWorldUseCases: [
      { industry: 'E-Commerce & Retail', application: 'Holiday Season Demand Surge Monitoring', benefit: 'Detects covariate shift during Black Friday when shopper purchase velocity spikes 10x.' },
      { industry: 'Consumer Lending & Banking', application: 'Credit Risk Scorecard Monitoring', benefit: 'Quarterly PSI audits verify that applicant income and debt-to-income distributions have not drifted past regulatory limits.' },
      { industry: 'Autonomous Vehicles', application: 'Camera Sensor Glare and Weather Drift', benefit: 'Flags when optical camera inputs shift due to heavy fog or rain, alerting safety systems to switch to LiDAR.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-8-5-1',
        question: 'What is the fundamental difference between Covariate Shift and Concept Drift?',
        hint: 'Which distribution changes: P(X) or P(Y|X)?',
        answer: 'Covariate Shift occurs when the distribution of input features P(X) changes over time while the underlying conditional relationship P(Y | X) remains constant. Concept Drift occurs when the actual mapping from features to labels P(Y | X) changes (e.g. what defined fraud yesterday is different today), even if input feature distributions P(X) remain unchanged.',
      },
      {
        id: 'pq-8-5-2',
        question: 'What do the standard PSI thresholds (< 0.10, 0.10 - 0.25, > 0.25) indicate in industry production pipelines?',
        hint: 'Green, Yellow, Red alarm states.',
        answer: 'PSI < 0.10 indicates no significant distribution change (Green: model is healthy); 0.10 <= PSI <= 0.25 indicates moderate drift (Yellow: investigate and prepare to retrain); PSI > 0.25 indicates significant distribution drift (Red: model has degraded, trigger retraining immediately).',
      },
      {
        id: 'pq-8-5-3',
        question: 'Why does the Kolmogorov-Smirnov (KS) test use the supremum distance between cumulative distributions?',
        hint: 'What does D = sup |F1(x) - F2(x)| capture?',
        answer: 'The supremum distance D measures the maximum vertical divergence between the two empirical CDFs. It is completely non-parametric, requires no binning parameters, and is invariant to arbitrary monotonic transformations of the coordinates.',
      },
    ],
    quiz: [
      {
        id: 'q-8-5-1',
        question: 'If a bank notices that the age and income of loan applicants has shifted significantly (P(X) changed), but the probability of default for any given age and income remains identical (P(Y|X) constant), what type of drift is occurring?',
        options: [
          'Concept Drift',
          'Covariate Shift',
          'Prior Shift',
          'Overfitting',
        ],
        correctIndex: 1,
        explanation: 'Covariate Shift is defined as a change in the input feature distribution P(X) while the conditional label relationship P(Y | X) remains unchanged.',
      },
      {
        id: 'q-8-5-2',
        question: 'In production monitoring, what does a Population Stability Index (PSI) score of 0.32 indicate?',
        options: [
          'The model is perfectly stable and needs no monitoring.',
          'Severe distribution drift: the current data has changed substantially from the baseline, and retraining is required.',
          'The accuracy is 32%.',
          'The learning rate should be increased.',
        ],
        correctIndex: 1,
        explanation: 'Any PSI exceeding 0.25 represents significant distribution shift requiring immediate pipeline retraining.',
      },
      {
        id: 'q-8-5-3',
        question: 'Which statistical test is best suited for detecting continuous feature data drift without requiring binning?',
        options: [
          'Two-Sample Kolmogorov-Smirnov (KS) Test',
          'Chi-Square Goodness-of-Fit Test',
          'Binary Cross-Entropy',
          'Mean Absolute Error',
        ],
        correctIndex: 0,
        explanation: 'The two-sample KS test compares continuous empirical CDFs directly without requiring manual binning.',
      },
    ],
    independentExercise: {
      title: 'Detect Data Drift Using KS-Test and PSI on Drifting Feature Data',
      problem: 'Simulate baseline data from N(50, 10) and current production data with shifted mean N(55, 10). Write a function that calculates both the KS-test p-value and the PSI score, and print whether drift was successfully flagged.',
      hints: ['from scipy.stats import ks_2samp', 'Use calculate_psi function from scratchCode', 'Check if p_val < 0.01 and psi > 0.10'],
      starterCode: `import numpy as np
from scipy.stats import ks_2samp

np.random.seed(42)
ref_data = np.random.normal(50, 10, size=1000)
curr_data = np.random.normal(55, 10, size=1000)

# TODO: Compute KS test and PSI between ref_data and curr_data
`,
      solution: `import numpy as np
from scipy.stats import ks_2samp

np.random.seed(42)
ref_data = np.random.normal(50, 10, size=1000)
curr_data = np.random.normal(55, 10, size=1000)

# 1. KS-Test
ks_stat, p_val = ks_2samp(ref_data, curr_data)

# 2. PSI
def calc_psi(ref, curr, bins=10):
    edges = np.percentile(ref, np.linspace(0, 100, bins + 1))
    edges[0] -= 1e-4; edges[-1] += 1e-4
    r_counts, _ = np.histogram(ref, bins=edges)
    c_counts, _ = np.histogram(curr, bins=edges)
    E = (r_counts + 1e-4) / (len(ref) + bins*1e-4)
    A = (c_counts + 1e-4) / (len(curr) + bins*1e-4)
    return np.sum((A - E) * np.log(A / E))

psi = calc_psi(ref_data, curr_data)

print(f"KS-Test Statistic: {ks_stat:.4f} | p-value: {p_val:.4e} (Drift Flag: {p_val < 0.01})")
print(f"Population Stability Index (PSI): {psi:.4f} (Significant Drift: {psi > 0.25})")
`,
    },
    summary: {
      keyTakeaways: [
        'Data drift (Covariate Shift) occurs when input feature distributions P(X) shift over time.',
        'Concept drift occurs when the true relationship between features and targets P(Y | X) changes.',
        'Continuous monitoring using Kolmogorov-Smirnov tests and the Population Stability Index (PSI) flags decaying models before catastrophic failure occurs.',
      ],
      nextLessonId: 'time-series-machine-learning',
      nextLessonTitle: 'Time Series Machine Learning: Lags, Windows & Leakage Prevention',
      nextLessonModuleId: 'module-8',
    },
  },

  'time-series-machine-learning': {
    id: 'time-series-machine-learning',
    moduleId: 'module-8',
    title: 'Time Series Machine Learning: Lags, Windows & Leakage Prevention',
    subtitle: 'Autoregressive Lags, Rolling Statistics & Purged TimeSeriesSplit Validation',
    order: 6,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Transform temporal sequences into supervised tabular feature matrices using lag features and rolling aggregates.',
      'Prevent catastrophic lookahead bias and temporal data leakage.',
      'Implement Purged TimeSeriesSplit cross-validation with embargo buffers (De Prado, 2018).',
      'Engineer cyclical calendar features using sine and cosine trigonometry.',
    ],
    prerequisites: ['module-2 Feature Engineering', 'Cross-Validation protocols', 'Linear Regression'],
    previousLesson: {
      id: 'data-and-concept-drift',
      title: 'Data Drift, Concept Drift & Model Monitoring',
      moduleId: 'module-8',
    },
    analogy: {
      title: 'Trading Stocks with Tomorrow’s Morning Newspaper',
      text: 'Suppose an amateur stock trader builds a machine learning model that boasts 99.8% backtest accuracy predicting stock market movements. Excited, they deploy it with real money and immediately lose their entire life savings. Why? During backtesting, the trader included tomorrow’s 4 PM closing price as a rolling feature to predict tomorrow’s 9 AM opening price (Lookahead Bias). In the real world, you cannot read tomorrow’s newspaper today.',
      metaphor: 'Time series machine learning enforces strict chronological causality: features must only use information available before the prediction timestamp.',
    },
    problemSolved: {
      title: 'Applying Supervised Machine Learning to Sequential Temporal Data',
      description: 'Standard machine learning assumes data points are independent and interchangeable (I.I.D.). In temporal data (energy demand, sensor telemetry, financial prices), observations have strong serial autocorrelation, seasonality, and trends.',
      keyPoints: [
        'Converts 1D temporal sequences into supervised feature matrices using autoregressive lags.',
        'Eliminates lookahead bias by ensuring zero data leakage from future timestamps.',
        'Applies Purged and Embargoed TimeSeriesSplit validation to prevent autocorrelation leakage.',
      ],
    },
    intuition: {
      overview: 'To predict target y at time t+1 using tabular machine learning (like LightGBM or Random Forest), we construct features representing the history up to time t: lag values y_{t}, y_{t-1}, rolling averages over window W, and cyclical date/time encodings.',
      steps: [
        {
          step: 1,
          title: 'Construct Autoregressive Lags',
          description: 'Shift the target series backward in time: Lag_1 = y_t, Lag_2 = y_{t-1}, ..., Lag_k = y_{t-k+1}.',
        },
        {
          step: 2,
          title: 'Compute Rolling Window Statistics',
          description: 'Calculate rolling mean, standard deviation, min, and max over trailing windows (e.g. 7-day or 30-day). Always shift windows so they exclude time t+1.',
        },
        {
          step: 3,
          title: 'Encode Cyclical Time Features',
          description: 'Transform month, day of week, and hour using sin/cos trigonometry to preserve continuity.',
        },
        {
          step: 4,
          title: 'Temporal Cross-Validation',
          description: 'Never shuffle time series! Use expanding window TimeSeriesSplit with an embargo buffer to prevent spillover.',
        },
      ],
    },
    mathematics: {
      overview: 'Feature engineering converts an autoregressive process into a general supervised function approximation problem.',
      foundations: [
        {
          name: 'Supervised Autoregressive Formulation',
          latex: '\\hat{y}_{t+h} = f\\left( y_t, y_{t-1}, \\dots, y_{t-k}, \\mu_{\\text{roll}}(t), \\sigma_{\\text{roll}}(t), X_{\\text{exog}}(t) \\right)',
          explanation: 'where h is the forecast horizon, and features are computed strictly from historical values up to time t.',
        },
        {
          name: 'Rolling Window Mean (Trailing)',
          latex: '\\mu_{\\text{roll}}(t, W) = \\frac{1}{W} \\sum_{j=0}^{W-1} y_{t - j}',
          explanation: 'Average over the preceding W observations. Must strictly end at time t to avoid lookahead leakage.',
        },
        {
          name: 'Cyclical Sin / Cos Feature Encoding',
          latex: 'x_{\\sin} = \\sin\\left( \\frac{2\\pi t}{T} \\right), \\quad x_{\\cos} = \\cos\\left( \\frac{2\\pi t}{T} \\right)',
          explanation: 'where T is the period (e.g. T=24 for hours of the day). Ensures hour 23 (11 PM) and hour 0 (midnight) are geometrically adjacent in Euclidean distance.',
        },
        {
          name: 'Exponential Smoothing Feature',
          latex: 'S_t = \\alpha y_t + (1 - \\alpha) S_{t-1}',
          explanation: 'where alpha in (0, 1] is the smoothing factor weighting recent observations exponentially more heavily than distant history.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Purging and Embargo in Time Series Cross-Validation',
      objective: 'Prove why standard K-Fold CV causes massive over-optimistic leakage in serially correlated time series, and derive the embargo buffer.',
      steps: [
        {
          step: 1,
          label: 'Evaluate Autoregressive Correlation (Markov Memory)',
          latex: '\\text{Cov}(y_t, y_{t+1}) = \\rho \\sigma^2 > 0',
          explanation: 'Consecutive time points are strongly correlated. If point t is in the training set and t+1 is in the test set, the model memorizes t+1 trivially.',
        },
        {
          step: 2,
          label: 'Demonstrate Leakage in Standard K-Fold Cross-Validation',
          latex: '\\text{Train: } \\{t-1, t+1\\}, \\quad \\text{Test: } \\{t\\}',
          explanation: 'Standard K-Fold randomly shuffles points, predicting yesterday from tomorrow. This leaks the future into the past.',
        },
        {
          step: 3,
          label: 'Formulate Purging (Label Overlap Elimination)',
          latex: '\\text{Purge all training samples whose label evaluation window overlaps with the test set}',
          explanation: 'Removes training labels whose forward return or rolling calculation touches any test timestamp.',
        },
        {
          step: 4,
          label: 'Formulate the Embargo Buffer (De Prado, 2018)',
          latex: 't_{\\text{train, post-test}} > t_{\\text{test, end}} + h_{\\text{embargo}}',
          explanation: 'An embargo gap of size h_embargo is inserted immediately after the test set to allow auto-regressive memory to decay before training resumes.',
        },
      ],
    },
    variables: [
      { symbol: 'y_t', name: 'Series Value at Time t', description: 'Observed target value at timestamp t', dimensions: 'Scalar' },
      { symbol: 'h', name: 'Forecast Horizon', description: 'Number of time steps into the future to predict (e.g. h=1 for next-step)', dimensions: 'Integer >= 1' },
      { symbol: 'W', name: 'Rolling Window Length', description: 'Number of past time steps included in moving average or volatility calculations', dimensions: 'Integer >= 2' },
      { symbol: 'T', name: 'Cyclical Period', description: 'Natural cycle length (e.g. 24 for daily hours, 7 for days of week, 12 for months)', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Engineer 2-step lag and 2-step rolling mean features for a sequence: y = [10.0, 12.0, 16.0, 20.0].',
      dataset: [
        { t: 1, y: 10.0 },
        { t: 2, y: 12.0 },
        { t: 3, y: 16.0 },
        { t: 4, y: 20.0 },
      ],
      calculations: [
        {
          step: 'Compute features for time t = 3 to predict y_3 = 16.0',
          math: '\\text{Lag}_1 = y_2 = 12.0; \\quad \\text{Lag}_2 = y_1 = 10.0; \\quad \\text{RollMean}_2 = \\frac{12 + 10}{2} = 11.0',
          result: 'Features at t=3: [Lag1=12.0, Lag2=10.0, RollMean=11.0] -> Target = 16.0',
        },
        {
          step: 'Compute features for time t = 4 to predict y_4 = 20.0',
          math: '\\text{Lag}_1 = y_3 = 16.0; \\quad \\text{Lag}_2 = y_2 = 12.0; \\quad \\text{RollMean}_2 = \\frac{16 + 12}{2} = 14.0',
          result: 'Features at t=4: [Lag1=16.0, Lag2=12.0, RollMean=14.0] -> Target = 20.0',
        },
      ],
      finalConclusion: 'Features for predicting time t are strictly computed using information at t-1 and earlier, completely eliminating lookahead bias.',
    },
    visualExplanation: {
      title: 'TimeSeriesSplit vs Standard K-Fold Cross-Validation',
      description: 'The visual diagram illustrates K-Fold vs TimeSeriesSplit. In standard K-Fold, blue training blocks and orange test blocks are scattered randomly across the timeline (violating causality). In TimeSeriesSplit, training sets expand strictly forward in time, always predicting a future orange block with an optional grey embargo gap between them.',
      features: [
        'Expanding Training Window: Folds grow chronologically: Fold 1 trains on 20% to test on next 20%.',
        'Strict Temporal Forward Arrow: Testing always occurs on strictly future data.',
        'Embargo Buffer: Grey buffer gap preventing autocorrelation leakage across split boundaries.',
      ],
    },
    scratchCode: {
      title: 'Time Series Feature Engineering from Scratch in Pandas',
      code: `import pandas as pd
import numpy as np

def create_time_series_features(df, target_col='y', lags=[1, 2, 7], windows=[3, 7]):
    """
    Generate lag and rolling features without lookahead bias.
    """
    df = df.copy()

    # 1. Autoregressive Lags
    for lag in lags:
        df[f'lag_{lag}'] = df[target_col].shift(lag)

    # 2. Trailing Rolling Window Statistics (shifted by 1 to exclude current target)
    for w in windows:
        # Crucial: shift(1) ensures rolling mean uses strictly past values
        df[f'rolling_mean_{w}'] = df[target_col].shift(1).rolling(window=w).mean()
        df[f'rolling_std_{w}'] = df[target_col].shift(1).rolling(window=w).std()

    # 3. Cyclical Date Features (Day of Week: 0 to 6)
    if 'date' in df.columns:
        day_of_week = df['date'].dt.dayofweek
        df['dow_sin'] = np.sin(2 * np.pi * day_of_week / 7.0)
        df['dow_cos'] = np.cos(2 * np.pi * day_of_week / 7.0)

    # Drop initial NaN rows created by lagging
    df = df.dropna().reset_index(drop=True)
    return df
`,
      explanation: 'Generates autoregressive lags, trailing rolling statistics shifted by 1 to prevent lookahead bias, and cyclical trigonometric date encodings.',
    },
    sklearnCode: {
      title: 'Scikit-Learn TimeSeriesSplit Implementation',
      code: `from sklearn.model_selection import TimeSeriesSplit
from sklearn.ensemble import GradientBoostingRegressor
import numpy as np

# Synthetic time series
X = np.arange(100).reshape(-1, 1)
y = np.sin(X.ravel() * 0.1) + np.random.normal(0, 0.1, size=100)

# TimeSeriesSplit cross-validation (5 temporal folds)
tscv = TimeSeriesSplit(n_splits=5)
model = GradientBoostingRegressor(random_state=42)

fold_scores = []
for fold, (train_idx, test_idx) in enumerate(tscv.split(X)):
    X_train, X_test = X[train_idx], X[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]

    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    fold_scores.append(score)
    print(f"Fold {fold+1}: Train [{train_idx[0]}..{train_idx[-1]}], Test [{test_idx[0]}..{test_idx[-1]}] | R^2 = {score:.4f}")
`,
      explanation: 'Uses scikit-learn TimeSeriesSplit to evaluate temporal predictive performance on chronologically advancing test windows.',
    },
    runnableCode: {
      code: `import numpy as np
import pandas as pd

# Demonstrate Feature Shift to Prevent Lookahead Bias
data = {'val': [10.0, 12.0, 16.0, 20.0, 25.0]}
df = pd.DataFrame(data)

# Leakage version: rolling mean includes current value!
df['leaky_roll_mean'] = df['val'].rolling(2).mean()

# Proper zero-leakage version: shift(1) before rolling!
df['proper_roll_mean'] = df['val'].shift(1).rolling(2).mean()
df['lag_1'] = df['val'].shift(1)

print("--- Time Series Feature Engineering Comparison ---")
print(df)
print("\\nNotice row 2 (val=16):")
print("Leaky Roll Mean uses (12+16)/2 = 14.0 (Leaks the 16 target!)")
print("Proper Roll Mean uses (10+12)/2 = 11.0 (Strictly uses past history!)")
`,
      expectedOutput: `--- Time Series Feature Engineering Comparison ---
    val  leaky_roll_mean  proper_roll_mean  lag_1
0  10.0              NaN               NaN    NaN
1  12.0             11.0               NaN   10.0
2  16.0             14.0              11.0   12.0
3  20.0             18.0              14.0   16.0
4  25.0             22.5              18.0   20.0

Notice row 2 (val=16):
Leaky Roll Mean uses (12+16)/2 = 14.0 (Leaks the 16 target!)
Proper Roll Mean uses (10+12)/2 = 11.0 (Strictly uses past history!)`,
    },
    lineByLineExplanation: [
      {
        lines: '8-9',
        codeSnippet: "df['leaky_roll_mean'] = df['val'].rolling(2).mean()\ndf['proper_roll_mean'] = df['val'].shift(1).rolling(2).mean()",
        explanation: 'Contrasts naive unshifted rolling mean (which leaks the current value) against shift(1) rolling mean which strictly uses historical values.',
      },
      {
        lines: '13-17',
        codeSnippet: 'print(df)\nprint(...)',
        explanation: 'Proves numerically how unshifted rolling calculations leak future information into training features.',
      },
    ],
    hyperparameters: [
      {
        name: 'n_splits (TimeSeriesSplit)',
        defaultVal: '5',
        range: '3 to 10',
        effect: 'Number of chronological expanding test windows. Higher values provide more validation folds.',
        recommendation: 'Use 5 folds for quarterly or monthly evaluation.',
      },
      {
        name: 'max_train_size',
        defaultVal: 'None',
        range: 'None or int',
        effect: 'Limits the maximum number of observations in training sets, creating a rolling training window instead of an expanding window.',
        recommendation: 'Set max_train_size when older data is non-stationary and degrades current forecasts.',
      },
    ],
    assumptions: [
      {
        assumption: 'Chronological Causality (No Future Data)',
        whyItMatters: 'Any feature calculation that uses future timestamps creates lookahead bias, producing unrealistically perfect backtests that fail in production.',
        howToVerify: 'Verify that all feature transformations shift features by at least the forecast horizon h.',
      },
      {
        assumption: 'Stationarity or Explicit Trend Removal',
        whyItMatters: 'If the series has a strong linear trend, tree-based models (Random Forest, XGBoost) cannot extrapolate values outside the minimum and maximum ranges seen in training.',
        howToVerify: 'Differencing y_diff = y_t - y_{t-1} or detrending before fitting tree models.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using standard K-Fold cross-validation with random shuffling on time series data.',
        solution: 'Never shuffle time series data. Always use TimeSeriesSplit or PurgedGroupTimeSeriesSplit.',
      },
      {
        mistake: 'Computing rolling statistics directly without `shift(1)`.',
        solution: 'Calling `df[y].rolling(7).mean()` includes the target value y_t. Always call `df[y].shift(1).rolling(7).mean()`.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Electric Power Utilities', application: 'Grid Electricity Peak Demand Forecasting', benefit: 'Forecasts 24-hour ahead megawatt load using temperature lags and cyclical hour-of-day features.' },
      { industry: 'Supply Chain & Logistics', application: 'Warehouse Inventory Replenishment', benefit: 'Predicts 14-day trailing product velocity to avoid stockouts during seasonal sales.' },
      { industry: 'Telecommunications', application: 'Cellular Bandwidth Usage Prediction', benefit: 'Predicts mobile data network congestion to dynamically re-route cellular traffic.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-8-6-1',
        question: 'Why can tree-based models like Random Forest and XGBoost NOT extrapolate global linear trends in time series forecasting?',
        hint: 'What does a decision tree leaf output for a test sample exceeding the maximum training feature value?',
        answer: 'Decision trees partition feature space with orthogonal thresholds and assign constant leaf values (mean of training points in that leaf). If a test feature value exceeds the maximum value seen in the training data, the tree routes it to the rightmost leaf and outputs a flat horizontal line, completely failing to extrapolate upward trends. The series must be differenced (y_t - y_{t-1}) before training.',
      },
      {
        id: 'pq-8-6-2',
        question: 'Why is standard K-Fold cross-validation with random shuffling catastrophic for time-series modeling?',
        hint: 'Consider the chronological order of data.',
        answer: 'Random shuffling violates the arrow of time: it uses future observations to predict past observations. Due to serial autocorrelation, test samples are adjacent to training samples, allowing the model to "cheat" by memorizing nearby points and creating massively over-optimistic validation scores that crash in production.',
      },
      {
        id: 'pq-8-6-3',
        question: 'Why do we encode hours of the day using sin and cos transformations instead of raw integers 0 to 23?',
        hint: 'What is the numerical distance between 11 PM (23) and midnight (0)?',
        answer: 'Using raw integers creates an artificial jump: hour 23 and hour 0 appear 23 units apart mathematically, even though in reality they are consecutive hours separated by only 60 minutes. Sine and cosine encoding maps hours onto a continuous 2D unit circle, ensuring midnight and 11 PM are geometrically adjacent.',
      },
    ],
    quiz: [
      {
        id: 'q-8-6-1',
        question: 'When computing a 7-day rolling average feature to predict tomorrow’s price, why must you call `.shift(1)` before `.rolling(7)` in Pandas?',
        options: [
          'To make the code run faster.',
          'To prevent lookahead bias: without shifting, the rolling average for today would include today’s closing value, which is part of the prediction target.',
          'To convert the data to integers.',
          'Because Pandas rolling requires shift by definition.',
        ],
        correctIndex: 1,
        explanation: 'Calling shift(1) ensures the rolling window strictly uses historical data up to t-1, preventing the current target value from leaking into the feature.',
      },
      {
        id: 'q-8-6-2',
        question: 'In financial machine learning (De Prado, 2018), what is the purpose of adding an "embargo" period after the test set in cross-validation?',
        options: [
          'To discard noisy features.',
          'To allow serial autocorrelation and market memory to decay before training resumes on subsequent data, preventing leakage.',
          'To increase the number of trees in the forest.',
          'To balance class distributions.',
        ],
        correctIndex: 1,
        explanation: 'An embargo buffer inserts a temporal gap after test folds to ensure that autoregressive memory does not leak into post-test training data.',
      },
      {
        id: 'q-8-6-3',
        question: 'How should you transform a non-stationary time series with a strong upward trend before feeding it into a Random Forest regressor?',
        options: [
          'Normalize features between 0 and 1.',
          'Compute first-order differences (y_t - y_{t-1}) to make the series stationary, predict the differences, and reconstruct the trend post-hoc.',
          'Use max_depth=100.',
          'Train with learning_rate=1.0.',
        ],
        correctIndex: 1,
        explanation: 'Differencing removes the upward trend and makes the series stationary, allowing tree models to predict stationary changes without having to extrapolate beyond training bounds.',
      },
    ],
    independentExercise: {
      title: 'Build a Zero-Leakage Autoregressive Feature Pipeline',
      problem: 'Create a synthetic time series of 200 days with an upward trend and seasonality. Use Pandas to construct 1-day, 2-day, and 7-day lags, and a 7-day shifted rolling mean. Train a `GradientBoostingRegressor` using `TimeSeriesSplit(n_splits=3)` and report mean R^2.',
      hints: ['df["lag_1"] = df["y"].shift(1)', 'df["roll_7"] = df["y"].shift(1).rolling(7).mean()', 'df.dropna()'],
      starterCode: `import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import TimeSeriesSplit

np.random.seed(42)
days = 200
trend = np.linspace(10, 50, days)
seasonality = 5 * np.sin(np.linspace(0, 20, days))
y = trend + seasonality + np.random.normal(0, 1, days)
df = pd.DataFrame({'y': y})

# TODO: Construct lags 1, 2, 7 and shifted rolling mean, evaluate with TimeSeriesSplit
`,
      solution: `import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import TimeSeriesSplit

np.random.seed(42)
days = 200
trend = np.linspace(10, 50, days)
seasonality = 5 * np.sin(np.linspace(0, 20, days))
y = trend + seasonality + np.random.normal(0, 1, days)
df = pd.DataFrame({'y': y})

# 1. Feature Engineering
df['lag_1'] = df['y'].shift(1)
df['lag_2'] = df['y'].shift(2)
df['lag_7'] = df['y'].shift(7)
df['roll_mean_7'] = df['y'].shift(1).rolling(7).mean()

df_clean = df.dropna().reset_index(drop=True)
X = df_clean[['lag_1', 'lag_2', 'lag_7', 'roll_mean_7']]
y_target = df_clean['y']

# 2. TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=3)
model = GradientBoostingRegressor(random_state=42)
scores = []

for train_idx, test_idx in tscv.split(X):
    model.fit(X.iloc[train_idx], y_target.iloc[train_idx])
    scores.append(model.score(X.iloc[test_idx], y_target.iloc[test_idx]))

print(f"TimeSeriesSplit 3-Fold R^2 Scores: {np.round(scores, 4)}")
print(f"Mean R^2: {np.mean(scores):.4f} (Valid temporal validation without leakage!)")
`,
    },
    summary: {
      keyTakeaways: [
        'Time series machine learning transforms temporal sequences into supervised feature tables using autoregressive lags and trailing rolling statistics.',
        'Never use unshifted rolling statistics; always call `.shift(1)` before `.rolling(W)` to avoid catastrophic lookahead bias.',
        'Evaluate time series exclusively using chronological splits (TimeSeriesSplit) with optional embargo buffers to prevent autocorrelation leakage.',
      ],
      nextLessonId: 'perceptron-mcp',
      nextLessonTitle: 'The Perceptron & McCulloch-Pitts Neuron',
      nextLessonModuleId: 'module-9',
    },
  },
};
