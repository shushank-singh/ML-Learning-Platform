import { LessonContent, ModuleData } from '@/lib/types';

export const module0Data: ModuleData = {
  id: 'module-0',
  number: 0,
  title: 'Machine Learning Foundations',
  subtitle: 'Taxonomy, Workflows, Datasets & Problem Formulation',
  description: 'Master the fundamental paradigms of artificial intelligence, learn the distinction between supervised, unsupervised, and reinforcement learning, understand parameters vs hyperparameters, and implement rigorous train-val-test splitting.',
  icon: 'Compass',
  badge: 'Foundations',
  estimatedHours: 8,
  topicsCount: 7,
  lessons: [
    {
      id: 'ai-ml-dl-foundations',
      moduleId: 'module-0',
      title: 'What is AI, ML, and Deep Learning?',
      description: 'The Russian-doll hierarchy, symbolic rules vs inductive learning from data.',
      order: 1,
      readTimeMinutes: 18,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'ml-types-paradigms',
      moduleId: 'module-0',
      title: 'Paradigms of Machine Learning',
      description: 'Supervised, unsupervised, semi-supervised, and reinforcement learning.',
      order: 2,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'regression-vs-classification',
      moduleId: 'module-0',
      title: 'Regression vs Classification Tasks',
      description: 'Continuous real-valued outputs versus discrete decision boundaries.',
      order: 3,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'features-parameters-hyperparameters',
      moduleId: 'module-0',
      title: 'Features, Labels, Parameters & Hyperparameters',
      description: 'The critical distinction between internal learned state and external configuration knobs.',
      order: 4,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'train-val-test-splits',
      moduleId: 'module-0',
      title: 'Training, Validation, and Test Splits',
      description: 'Preventing data snooping, stratification, and unbiased generalization estimation.',
      order: 5,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'batch-vs-online-learning',
      moduleId: 'module-0',
      title: 'Batch vs Online Learning',
      description: 'Offline full-dataset optimization versus real-time streaming mini-batch updates.',
      order: 6,
      readTimeMinutes: 18,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'ml-workflow-problem-formulation',
      moduleId: 'module-0',
      title: 'End-to-End ML Workflow & Problem Formulation',
      description: 'From translating vague business questions into quantifiable loss objectives to post-launch monitoring.',
      order: 7,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

export const module0Lessons: Record<string, LessonContent> = {
  'ai-ml-dl-foundations': {
    id: 'ai-ml-dl-foundations',
    moduleId: 'module-0',
    title: 'What is AI, ML, and Deep Learning?',
    subtitle: 'From Handcrafted Symbolic Rules to Inductive Learning from Experience',
    order: 1,
    readTimeMinutes: 18,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Understand the concentric Russian-doll hierarchy: AI ⊃ ML ⊃ Deep Learning.',
      'Differentiate classical rule-based programming (expert systems) from inductive statistical learning.',
      'Identify when machine learning is appropriate versus when deterministic rules are superior.',
    ],
    prerequisites: ['Basic Python programming syntax', 'Fundamental high school algebra'],
    analogy: {
      title: 'The Master Chef vs The Learning Apprentice',
      text: 'In traditional programming, a master chef writes a rigid 500-step recipe: "If onion is golden, add 5g salt." If an exotic vegetable arrives, the program crashes because no explicit rule exists. In Machine Learning, the chef gives an apprentice 10,000 photos and taste ratings of dishes. The apprentice tastes, makes mistakes, adjusts seasonings iteratively, and develops an intuitive culinary palate that generalizes to dishes never seen before.',
      metaphor: 'Classical Software = Rules + Data → Answers. Machine Learning = Data + Answers → Rules.',
    },
    problemSolved: {
      title: 'The Limits of Handcrafted Human Logic',
      description: 'Humans struggle to write explicit if-else rules for complex perception tasks like recognizing a handwritten digit "8" or translating natural language nuances.',
      keyPoints: [
        'High-dimensional sensory data (pixels, audio waveforms) defies rigid programmatic logic.',
        'Machine learning algorithms learn functional mappings f: X → y directly from empirical observations.',
        'Deep learning removes manual feature engineering by learning hierarchical representations across multi-layer neural networks.',
      ],
    },
    intuition: {
      overview: 'Machine learning shifts programming from deduction (applying known rules to facts) to induction (discovering general laws from specific samples).',
      steps: [
        { step: 1, title: 'Observe Data (X)', description: 'Collect pairs of inputs and corresponding real-world outcomes.' },
        { step: 2, title: 'Optimize Objective J(θ)', description: 'Adjust internal mathematical parameters to minimize the gap between guesses and ground truth.' },
        { step: 3, title: 'Generalize to Unseen Data', description: 'Deploy the learned mathematical function to predict outcomes on novel inputs.' },
      ],
    },
    mathematics: {
      overview: 'Formally, machine learning seeks an unknown target function f*: X → Y by choosing a hypothesis f_θ from a hypothesis class H.',
      foundations: [
        {
          name: 'The Learning Function Mapping',
          latex: 'f_{\\theta}: \\mathcal{X} \\to \\mathcal{Y}, \\quad \\hat{y} = f_{\\theta}(\\mathbf{x})',
          explanation: 'Parameter vector θ indexes a specific candidate function within the model hypothesis space.',
        },
        {
          name: 'Empirical Risk Minimization (ERM)',
          latex: '\\theta^* = \\arg\\min_{\\theta} \\frac{1}{N} \\sum_{i=1}^{N} \\mathcal{L}(f_{\\theta}(\\mathbf{x}_i), y_i)',
          explanation: 'The optimal parameter configuration minimizes the empirical average loss across the N training instances.',
        },
      ],
    },
    derivation: {
      title: 'The Inductive Learning Paradigm',
      objective: 'Formulate the mathematical difference between classical programming and machine learning.',
      steps: [
        {
          step: 1,
          label: 'Classical Deterministic Computing',
          latex: 'y = \\text{Program}(x)',
          explanation: 'Human engineers author the Program logic. The computer applies it deterministically to input x to produce output y.',
        },
        {
          step: 2,
          label: 'Statistical Machine Learning',
          latex: '\\text{Model} = \\text{Optimizer}(\\mathcal{D}_{train}), \\quad \\text{where } \\mathcal{D}_{train} = \\{(x_i, y_i)\\}_{i=1}^N',
          explanation: 'The computer ingests training tuples (x, y) and discovers the parametric Program / Model that best approximates the relationship.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathcal{X}', name: 'Input Space', description: 'Domain of all possible feature vectors (e.g. ℝᵈ).' },
      { symbol: '\\mathcal{Y}', name: 'Target Label Space', description: 'Range of possible ground-truth outcomes (e.g. {0, 1} or ℝ).' },
      { symbol: '\\theta', name: 'Model Parameters', description: 'Internal numbers adjusted during learning (weights and biases).' },
      { symbol: '\\mathcal{L}', name: 'Loss Function', description: 'Penalty quantification of prediction error on a single instance.' },
    ],
    numericalExample: {
      scenario: 'Compare a rule-based threshold vs a simple linear model f_θ(x) = θ · x for predicting house price based on area.',
      dataset: [
        { area_sqft: 1000, true_price_k: 200 },
        { area_sqft: 2000, true_price_k: 400 },
        { area_sqft: 3000, true_price_k: 600 },
      ],
      calculations: [
        { step: 'Estimate Learned Parameter θ', math: '\\theta^* = \\frac{200}{1000} = 0.2', result: 'θ = 0.2k $/sqft' },
        { step: 'Predict on Unseen Home (2500 sqft)', math: '\\hat{y} = 0.2 \\times 2500 = 500', result: 'Predicted Price: $500k' },
      ],
      finalConclusion: 'The learned rule f(x) = 0.2x seamlessly predicts for any square footage without manual if-else branches.',
    },
    visualExplanation: {
      title: 'The AI / ML / DL Hierarchy',
      description: 'Artificial Intelligence encompasses all machines mimicking human cognition. Machine Learning is the statistical subset learning from data. Deep Learning is the subfield utilizing deep multi-layer neural networks.',
      features: ['Concentric domains', 'Symbolic reasoning vs Statistical induction', 'Feature engineering vs Feature learning'],
    },
    scratchCode: {
      title: 'Python Demonstration: Rules vs Machine Learning',
      explanation: 'Comparing hardcoded boolean rules with an elementary parameter-learning loop.',
      code: `import numpy as np

# Data: Hours studied vs Exam Score
hours = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
scores = np.array([22.0, 41.0, 63.0, 79.0, 98.0])

# 1. Classical rule attempt: Fragile and fails on new edge cases
def rule_based_predict(h):
    if h == 1.0: return 20.0
    elif h == 2.0: return 40.0
    return 50.0 # Blind guess for 3.5 hours!

# 2. Machine Learning attempt: Learn weight w minimizing MSE
# y ≈ w * h  -> w = sum(h*y) / sum(h^2)
w_learned = np.sum(hours * scores) / np.sum(hours ** 2)

print(f"Learned parameter w: {w_learned:.2f} points/hour")
print(f"Prediction for 3.5 hours: {w_learned * 3.5:.1f} points")
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn Linear Estimator',
      explanation: 'How modern ML libraries abstract the fit-predict cycle.',
      code: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1.0], [2.0], [3.0], [4.0], [5.0]])
y = np.array([22.0, 41.0, 63.0, 79.0, 98.0])

model = LinearRegression(fit_intercept=False)
model.fit(X, y)

print(f"Model Learned Coefficient: {model.coef_[0]:.2f}")
print(f"Prediction for 3.5 hrs: {model.predict([[3.5]])[0]:.1f}")
`,
    },
    runnableCode: {
      code: `import numpy as np

# Quick benchmark: Empirical loss computation
y_true = np.array([100, 200, 300])
y_guess_rule = np.array([120, 180, 290])
y_learned = np.array([102, 198, 301])

mse_rule = np.mean((y_true - y_guess_rule) ** 2)
mse_learned = np.mean((y_true - y_learned) ** 2)

print(f"Rule-Based Error (MSE): {mse_rule:.1f}")
print(f"Learned Model Error (MSE): {mse_learned:.1f}")
`,
      expectedOutput: `Rule-Based Error (MSE): 300.0\nLearned Model Error (MSE): 3.0`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-6', codeSnippet: 'y_true = np.array(...)', explanation: 'Defines target ground-truth outcomes.' },
      { lines: 'Lines 8-9', codeSnippet: 'mse = np.mean((y_true - y_pred)**2)', explanation: 'Computes Mean Squared Error, quantifying the average quadratic deviation.' },
    ],
    hyperparameters: [
      { name: 'hypothesis_class', defaultVal: 'Linear', range: 'Linear, Tree, Neural Net', effect: 'Controls the expressive capacity of the model.', recommendation: 'Start with simple linear models before deep networks.' },
    ],
    assumptions: [
      { assumption: 'Stationarity of Data Generating Distribution', whyItMatters: 'Rules learned from past data only hold if future data follows the same underlying physics or patterns.', howToVerify: 'Monitor feature drift and population stability index (PSI).' },
    ],
    commonMistakes: [
      { mistake: 'Applying machine learning when deterministic rules are 100% known', solution: 'If a regulatory tax formula is strictly known by law, use classical software code, not an approximate statistical model!' },
    ],
    realWorldUseCases: [
      { industry: 'Autonomous Vehicles', application: 'Pedestrian Detection', benefit: 'Processes raw video streams in milliseconds where rule-based pixel heuristics fail.' },
      { industry: 'Finance', application: 'Credit Card Fraud Detection', benefit: 'Detects evolving adversarial patterns across millions of daily transactions.' },
    ],
    practiceQuestions: [
      { id: 'm0-q1', question: 'Why is it impossible to write an explicit rule-based program for cat vs dog classification using pixel intensities?', hint: 'Consider lighting, angles, fur patterns, and poses.', answer: 'Pixels vary infinitely with background lighting, camera angles, breed textures, and occlusions. The combinatorial explosion of if-else checks is impossible for human programmers to specify.' },
    ],
    quiz: [
      {
        id: 'quiz-m0-1',
        question: 'Which statement accurately describes the fundamental difference between classical programming and machine learning?',
        options: [
          'Classical programming uses Python, while machine learning only uses C++.',
          'Classical programming takes rules and data to generate answers; machine learning takes data and answers to discover rules.',
          'Classical programming is always faster to run than any machine learning model.',
          'Machine learning eliminates the need for any data preprocessing.',
        ],
        correctIndex: 1,
        explanation: 'In classical computing, engineers write explicit logic rules. In machine learning, algorithms infer the mathematical relationship directly from input-output examples.',
      },
    ],
    independentExercise: {
      title: 'Evaluate Linear vs Quadratic Fit',
      problem: 'Write a function evaluate_fits(x, y) that fits both a degree 1 and degree 2 polynomial to the inputs and returns the Mean Squared Error of both.',
      hints: ['Use np.polyfit(x, y, deg) to get coefficients', 'Use np.polyval(coeffs, x) to compute predictions'],
      starterCode: `import numpy as np

def evaluate_fits(x, y):
    # TODO: fit degree 1 and degree 2 polynomials and compute MSE
    return {"mse_deg1": 0.0, "mse_deg2": 0.0}

x = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
y = x ** 2 + 2.0
print(evaluate_fits(x, y))
`,
      solution: `import numpy as np

def evaluate_fits(x, y):
    p1 = np.polyfit(x, y, 1)
    p2 = np.polyfit(x, y, 2)
    pred1 = np.polyval(p1, x)
    pred2 = np.polyval(p2, x)
    return {
        "mse_deg1": float(np.mean((y - pred1) ** 2)),
        "mse_deg2": float(np.mean((y - pred2) ** 2))
    }

x = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
y = x ** 2 + 2.0
print(evaluate_fits(x, y))
`,
    },
    summary: {
      keyTakeaways: [
        'AI is the broad vision; ML is the data-driven statistical engine; Deep Learning is representation learning via deep neural nets.',
        'Machine learning replaces hand-engineered rules with automated loss-minimization algorithms.',
        'Use ML when patterns exist in data, deterministic equations are unknown, and historical examples are abundant.',
      ],
      nextLessonId: 'ml-types-paradigms',
      nextLessonTitle: 'Paradigms of Machine Learning: Supervised, Unsupervised & Reinforcement Learning',
      nextLessonModuleId: 'module-0',
    },
  },

  'ml-types-paradigms': {
    id: 'ml-types-paradigms',
    moduleId: 'module-0',
    title: 'Paradigms of Machine Learning',
    subtitle: 'Supervised, Unsupervised, Semi-Supervised, and Reinforcement Learning',
    order: 2,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Compare supervised learning with labeled data to unsupervised pattern discovery.',
      'Understand how semi-supervised learning leverages cheap unlabeled data with small labeled sets.',
      'Grasp the agent-environment-reward loop of Reinforcement Learning.',
    ],
    prerequisites: ['ai-ml-dl-foundations'],
    analogy: {
      title: 'The Classroom, The Archeologist, and The Video Game Player',
      text: 'Supervised learning is a student studying with flashcards containing both questions and answer keys on the back. Unsupervised learning is an archeologist discovering ancient pottery shards with no translation manual, grouping them by clay color and texture alone. Reinforcement learning is a teenager playing Super Mario for the first time: nobody tells them which button to press, but when Mario falls down a pit they receive negative reward (-100), and when Mario collects a coin they receive positive reward (+10). Through millions of trial-and-error attempts, the player masters the game.',
      metaphor: 'Supervised = Teacher feedback. Unsupervised = Self-discovery of structure. Reinforcement = Learning from rewards and penalties.',
    },
    problemSolved: {
      title: 'Matching Problem Contexts to Learning Feedback Signals',
      description: 'Different business problems provide different feedback structures. You cannot train a supervised classifier without ground-truth labels, and you cannot run policy gradients without an interactive environment.',
      keyPoints: [
        'Supervised: (x_i, y_i) pairs available. Goal: predict y for new x.',
        'Unsupervised: Only x_i available. Goal: discover clusters, density, or low-dimensional manifolds.',
        'Semi-Supervised: Small labeled subset + massive unlabeled pool.',
        'Reinforcement Learning: Agent takes actions in dynamic environment to maximize cumulative discounted return.',
      ],
    },
    intuition: {
      overview: 'The learning paradigm is governed entirely by the feedback signal available during optimization.',
      steps: [
        { step: 1, title: 'Identify Feedback Mechanism', description: 'Do you have labeled ground truth, raw unlabeled features, or reward signals?' },
        { step: 2, title: 'Formulate Objective', description: 'Supervised minimizes prediction error; Unsupervised minimizes compression/cluster reconstruction loss; RL maximizes expected return.' },
        { step: 3, title: 'Deploy Appropriate Estimator', description: 'Choose between regressors, classifiers, clustering algorithms, or policy networks.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical definitions of the four primary learning objectives.',
      foundations: [
        {
          name: 'Supervised Empirical Risk',
          latex: '\\min_{\\theta} \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}(f_\\theta(\\mathbf{x}_i), y_i)',
          explanation: 'Explicit loss penalizing difference between predicted output and teacher label y.',
        },
        {
          name: 'Unsupervised Reconstruction / Density Objective',
          latex: '\\min_{\\theta} \\frac{1}{N} \\sum_{i=1}^N \\|\\mathbf{x}_i - g_\\theta(h_\\theta(\\mathbf{x}_i))\\|^2 \\quad \\text{or} \\quad \\max_{\\theta} \\sum_{i=1}^N \\log p_\\theta(\\mathbf{x}_i)',
          explanation: 'Optimizes information preservation or likelihood without any external label y.',
        },
        {
          name: 'Reinforcement Learning Value Objective',
          latex: 'J(\\pi_\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta} \\left[ \\sum_{t=0}^T \\gamma^t r(s_t, a_t) \\right]',
          explanation: 'Maximizes the expected discounted sum of rewards over trajectory tau under policy pi.',
        },
      ],
    },
    derivation: {
      title: 'The Spectrum of Label Supervision',
      objective: 'Formulate the information available in datasets across paradigms.',
      steps: [
        {
          step: 1,
          label: 'Supervised Dataset',
          latex: '\\mathcal{D}_{sup} = \\{(\\mathbf{x}_1, y_1), (\\mathbf{x}_2, y_2), \\dots, (\\mathbf{x}_N, y_N)\\}',
          explanation: 'Full supervision with complete label coverage.',
        },
        {
          step: 2,
          label: 'Semi-Supervised Dataset',
          latex: '\\mathcal{D}_{semi} = \\mathcal{D}_L \\cup \\mathcal{D}_U = \\{(\\mathbf{x}_i, y_i)\\}_{i=1}^L \\cup \\{\\mathbf{x}_j\\}_{j=1}^U, \\quad U \\gg L',
          explanation: 'Leverages manifold consistency of abundant unlabeled data to constrain boundary placement.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathbf{x}_i', name: 'Input Feature Vector', description: 'Observed attributes of the i-th instance.' },
      { symbol: 'y_i', name: 'Teacher Target Label', description: 'Target ground truth (absent in unsupervised learning).' },
      { symbol: 'r(s, a)', name: 'Reward Function', description: 'Scalar scalar evaluation from environment following action a in state s.' },
      { symbol: '\\gamma', name: 'Discount Factor', description: 'Trades immediate rewards against long-term future gains (γ ∈ [0, 1]).' },
    ],
    numericalExample: {
      scenario: 'Classify 4 business use cases into their respective machine learning paradigms.',
      dataset: [
        { task: 'Spam Email Detection', feedback: 'User marked 5,000 emails as Spam/Inbox', paradigm: 'Supervised Learning' },
        { task: 'Customer Segmentation', feedback: 'Purchase logs of 200,000 users with no predefined groups', paradigm: 'Unsupervised Learning' },
        { task: 'Medical Diagnostic Imaging', feedback: '100 biopsy-confirmed scans + 50,000 unverified X-rays', paradigm: 'Semi-Supervised Learning' },
        { task: 'Robot Arm Inverted Pendulum', feedback: 'Sensors measure angle; +1 reward each second it stays upright', paradigm: 'Reinforcement Learning' },
      ],
      calculations: [
        { step: 'Validate Label Presence', math: '\\text{Labels Available} \\implies \\text{Supervised}', result: 'Spam = Supervised' },
        { step: 'Validate Absence of Labels', math: '\\text{Only Features } X \\implies \\text{Clustering / Unsupervised}', result: 'Segmentation = Unsupervised' },
      ],
      finalConclusion: 'Correctly identifying the paradigm prevents costly mistakes, such as trying to train supervised models when labels do not exist.',
    },
    visualExplanation: {
      title: 'Taxonomy of Machine Learning',
      description: 'Supervised encompasses Regression and Classification. Unsupervised encompasses Clustering, Dimensionality Reduction, and Anomaly Detection. RL encompasses Policy Search and Q-Learning.',
      features: ['Label guidance', 'Exploration vs Exploitation', 'Structure discovery'],
    },
    scratchCode: {
      title: 'Python Example: Supervised vs Unsupervised Demonstration',
      explanation: 'Training a supervised nearest centroid classifier vs an unsupervised k-means clusterer on the same features.',
      code: `import numpy as np

# Synthetic features
X = np.array([[1.0, 1.2], [1.5, 1.8], [5.0, 5.2], [5.5, 4.8]])
y_labels = np.array([0, 0, 1, 1]) # Ground truth teacher labels

# 1. Supervised: Compute true class means using provided labels
mean_c0 = X[y_labels == 0].mean(axis=0)
mean_c1 = X[y_labels == 1].mean(axis=0)
print(f"Supervised Class Centroids: C0={mean_c0}, C1={mean_c1}")

# 2. Unsupervised: Discover 2 centroids WITHOUT ever seeing y_labels
# Initialize 2 centroids randomly
c_unsub = np.array([[1.0, 1.0], [5.0, 5.0]])
print(f"Unsupervised Seed Centroids: {c_unsub}")
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn Paradigm Comparison',
      explanation: 'Notice how supervised models take (X, y) while unsupervised models only take (X).',
      code: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
import numpy as np

X = np.array([[1, 2], [2, 1], [8, 9], [9, 8]])
y = np.array([0, 0, 1, 1])

# Supervised: fit(X, y) requires labels
supervised_model = KNeighborsClassifier(n_neighbors=1)
supervised_model.fit(X, y)

# Unsupervised: fit(X) discovers structure without y!
unsupervised_model = KMeans(n_clusters=2, random_state=42, n_init='auto')
unsupervised_model.fit(X)

print("Supervised prediction for [1.5, 1.5]:", supervised_model.predict([[1.5, 1.5]]))
print("Unsupervised cluster for [1.5, 1.5]:", unsupervised_model.predict([[1.5, 1.5]]))
`,
    },
    runnableCode: {
      code: `import numpy as np

# Verify that unsupervised clustering labels are arbitrary permutation
labels_true = np.array([0, 0, 1, 1])
cluster_ids = np.array([1, 1, 0, 0]) # Same grouping, inverted IDs!

from sklearn.metrics import adjusted_rand_score
ari = adjusted_rand_score(labels_true, cluster_ids)
print(f"Adjusted Rand Index (1.0 = Perfect clustering): {ari:.1f}")
`,
      expectedOutput: `Adjusted Rand Index (1.0 = Perfect clustering): 1.0`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-5', codeSnippet: 'labels_true vs cluster_ids', explanation: 'Unsupervised clustering discovers groupings; the assigned integer IDs (0 vs 1) are arbitrary.' },
      { lines: 'Lines 7-9', codeSnippet: 'adjusted_rand_score(...)', explanation: 'Measures clustering agreement invariant to label permutations.' },
    ],
    hyperparameters: [
      { name: 'n_clusters', defaultVal: '8', range: '2 to 100', effect: 'Specifies the number of groupings to discover in unsupervised clustering.', recommendation: 'Use elbow method or silhouette scores to select K.' },
    ],
    assumptions: [
      { assumption: 'Sufficient Data Representation', whyItMatters: 'Unsupervised models cannot distinguish signal from noise without sufficient density.', howToVerify: 'Inspect Hopkins statistic for clustering tendency.' },
    ],
    commonMistakes: [
      { mistake: 'Treating customer segmentation as a supervised problem when no historical labels exist', solution: 'Use unsupervised clustering (K-Means, DBSCAN) or customer RFM segmentation.' },
    ],
    realWorldUseCases: [
      { industry: 'Cybersecurity', application: 'Zero-Day Attack Detection', benefit: 'Unsupervised anomaly detection flags abnormal network packets never seen in training.' },
      { industry: 'Robotics', application: 'Quadruped Locomotion', benefit: 'Reinforcement learning trains walking policies across millions of simulated terrain physics steps.' },
    ],
    practiceQuestions: [
      { id: 'm0-q2', question: 'In what scenario would an organization prefer semi-supervised learning over pure supervised learning?', hint: 'Consider the cost of human expert data labeling.', answer: 'When collecting raw data is cheap (e.g. 1,000,000 satellite images), but expert labeling is expensive (requiring trained geologists). Semi-supervised models leverage the vast unlabeled pool to boost accuracy with minimal labeled data.' },
    ],
    quiz: [
      {
        id: 'quiz-m0-2',
        question: 'Which machine learning paradigm uses an agent that learns through trial-and-error by receiving scalar rewards from an environment?',
        options: [
          'Supervised Learning',
          'Unsupervised Clustering',
          'Reinforcement Learning',
          'Active Self-Supervised Learning',
        ],
        correctIndex: 2,
        explanation: 'Reinforcement Learning is defined by an agent interacting with an environment, selecting actions, observing state transitions, and optimizing cumulative reward.',
      },
    ],
    independentExercise: {
      title: 'Classify Machine Learning Scenarios',
      problem: 'Write a Python function identify_paradigm(has_labels, has_environment_rewards, labeled_ratio) that returns "supervised", "unsupervised", "semi-supervised", or "reinforcement".',
      hints: ['Check rewards first for RL', 'Check labeled_ratio for semi-supervised vs supervised'],
      starterCode: `def identify_paradigm(has_labels, has_environment_rewards, labeled_ratio=1.0):
    # TODO: return the paradigm string
    return "unknown"

print(identify_paradigm(True, False, 1.0))
print(identify_paradigm(False, True, 0.0))
print(identify_paradigm(False, False, 0.0))
print(identify_paradigm(True, False, 0.05))
`,
      solution: `def identify_paradigm(has_labels, has_environment_rewards, labeled_ratio=1.0):
    if has_environment_rewards:
        return "reinforcement"
    if not has_labels or labeled_ratio == 0.0:
        return "unsupervised"
    if labeled_ratio < 0.20:
        return "semi-supervised"
    return "supervised"

print(identify_paradigm(True, False, 1.0))
print(identify_paradigm(False, True, 0.0))
print(identify_paradigm(False, False, 0.0))
print(identify_paradigm(True, False, 0.05))
`,
    },
    summary: {
      keyTakeaways: [
        'Supervised learning maps features to labeled targets.',
        'Unsupervised learning extracts latent structures, patterns, and low-dimensional manifolds from unlabeled data.',
        'Reinforcement learning trains autonomous agents to maximize cumulative rewards in dynamic environments.',
      ],
      nextLessonId: 'regression-vs-classification',
      nextLessonTitle: 'Regression vs Classification Tasks',
      nextLessonModuleId: 'module-0',
    },
  },

  'regression-vs-classification': {
    id: 'regression-vs-classification',
    moduleId: 'module-0',
    title: 'Regression vs Classification Tasks',
    subtitle: 'Continuous Real-Valued Outputs versus Discrete Categorical Decision Boundaries',
    order: 3,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Contrast regression (predicting continuous quantities) with classification (assigning discrete categories).',
      'Understand the mathematical loss functions appropriate for each (MSE vs Cross-Entropy).',
      'Recognize thresholding: how predicted continuous probabilities convert into discrete class labels.',
    ],
    prerequisites: ['ml-types-paradigms'],
    analogy: {
      title: 'The Thermometer vs The Fever Gavel',
      text: 'Regression is like a clinical digital thermometer: it reports a continuous temperature like 98.6°F, 101.4°F, or 103.2°F. Classification is the doctor making a categorical diagnosis: "Does this patient have a fever? YES or NO." The doctor takes the continuous regression number, applies a clinical threshold (e.g., 100.4°F), and assigns the binary label.',
      metaphor: 'Regression answers "How much?" or "How many?". Classification answers "Which bucket?" or "Is it A or B?".',
    },
    problemSolved: {
      title: 'Selecting the Appropriate Mathematical Output Space',
      description: 'Treating a continuous value as a class label leads to combinatorial explosion; conversely, treating categorical classes as real numbers imposes artificial ordering (e.g. Cat=1, Dog=2, Bird=3 implies Bird is the average of Cat and Dog).',
      keyPoints: [
        'Regression targets reside in ℝ (or ℝ⁺): prices, temperatures, stock returns, travel times.',
        'Classification targets reside in discrete sets: binary {0, 1} or multiclass {1, 2, ..., C}.',
        'Loss functions must reflect the topology: squared Euclidean distance for ℝ; log-loss/cross-entropy for probabilities.',
      ],
    },
    intuition: {
      overview: 'In regression, error is a distance metric (e.g. $10 off is better than $50 off). In classification, errors represent category confusion (False Positive vs False Negative).',
      steps: [
        { step: 1, title: 'Analyze Target Variable y', description: 'Is y a continuous measurement, or a discrete label/state?' },
        { step: 2, title: 'Select Output Activation', description: 'Identity activation for linear regression; Sigmoid/Softmax for classification.' },
        { step: 3, title: 'Select Metric', description: 'RMSE/MAE for regression; Accuracy/F1/ROC-AUC for classification.' },
      ],
    },
    mathematics: {
      overview: 'Comparison of the target domains and canonical loss functions.',
      foundations: [
        {
          name: 'Regression Target Domain & Loss (MSE)',
          latex: 'y \\in \\mathbb{R}, \\quad \\mathcal{L}_{MSE}(y, \\hat{y}) = (y - \\hat{y})^2',
          explanation: 'Measures continuous distance. Penalizes large numerical discrepancies quadratically.',
        },
        {
          name: 'Classification Target Domain & Loss (Binary Cross-Entropy)',
          latex: 'y \\in \\{0, 1\\}, \\quad \\mathcal{L}_{BCE}(y, p) = -\\left[ y \\log(p) + (1 - y) \\log(1 - p) \\right]',
          explanation: 'Measures divergence between Bernoulli distributions where p = P(Y=1|x).',
        },
      ],
    },
    derivation: {
      title: 'Converting Probabilistic Regression to Classification',
      objective: 'Show how logistic regression bridges continuous probability to categorical decisions.',
      steps: [
        {
          step: 1,
          label: 'Continuous Probability Prediction',
          latex: 'p = P(Y = 1 \\mid \\mathbf{x}) = \\sigma(\\mathbf{w}^T \\mathbf{x}) = \\frac{1}{1 + e^{-\\mathbf{w}^T \\mathbf{x}}} \\in (0, 1)',
          explanation: 'The internal regression model predicts a continuous probability p.',
        },
        {
          step: 2,
          label: 'Decision Thresholding',
          latex: '\\hat{y} = \\mathbb{I}(p \\ge \\tau) = \\begin{cases} 1 & \\text{if } p \\ge \\tau \\\\ 0 & \\text{if } p < \\tau \\end{cases}',
          explanation: 'Applying decision threshold τ (default 0.50) yields the discrete categorical classification output.',
        },
      ],
    },
    variables: [
      { symbol: 'y', name: 'Ground Truth Response', description: 'Continuous in ℝ for regression; discrete in {0, 1} or {1..C} for classification.' },
      { symbol: '\\hat{y}', name: 'Model Prediction', description: 'Forecasted real number or predicted category.' },
      { symbol: '\\tau', name: 'Classification Threshold', description: 'Probability cutoff for assigning positive class.' },
    ],
    numericalExample: {
      scenario: 'Given student exam percentage y, evaluate regression error (MAE) vs classification accuracy with threshold 50%.',
      dataset: [
        { student: 1, true_score: 45, pred_score: 48, true_pass: 0, pred_pass: 0 },
        { student: 2, true_score: 75, pred_score: 65, true_pass: 1, pred_pass: 1 },
        { student: 3, true_score: 80, pred_score: 82, true_pass: 1, pred_pass: 1 },
      ],
      calculations: [
        { step: 'Regression MAE', math: '\\frac{|45-48| + |75-65| + |80-82|}{3} = \\frac{3 + 10 + 2}{3} = 5.0', result: 'MAE = 5.0% marks' },
        { step: 'Classification Accuracy', math: '\\frac{1 + 1 + 1}{3} = 1.0', result: 'Accuracy = 100%' },
      ],
      finalConclusion: 'Even though regression predictions had an average error of 5 marks, classification accuracy is 100% because no student crossed the pass/fail boundary mistakenly.',
    },
    visualExplanation: {
      title: 'Regression Line vs Decision Boundary',
      description: 'Regression fits a line/plane passing through points to minimize vertical distance. Classification positions a boundary separating different colored clusters.',
      features: ['Continuous surface vs separating hyperplane', 'Metric divergence', 'Thresholding mechanics'],
    },
    scratchCode: {
      title: 'Python Demonstration: Regression vs Classification Evaluation',
      explanation: 'Evaluating the same synthetic continuous predictions under both paradigms.',
      code: `import numpy as np

# Ground truth and model predictions
y_true_numeric = np.array([42.0, 58.0, 85.0, 31.0, 72.0])
y_pred_numeric = np.array([45.0, 54.0, 90.0, 35.0, 68.0])

# 1. Regression Metrics: Mean Squared Error
mse = np.mean((y_true_numeric - y_pred_numeric) ** 2)
rmse = np.sqrt(mse)
print(f"Regression RMSE: {rmse:.2f} units")

# 2. Convert to binary classification (Threshold >= 50: Pass=1, Fail=0)
y_true_class = (y_true_numeric >= 50).astype(int)
y_pred_class = (y_pred_numeric >= 50).astype(int)

accuracy = np.mean(y_true_class == y_pred_class) * 100
print(f"Classification Accuracy: {accuracy:.1f}%")
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn Regression vs Classifier Comparison',
      explanation: 'Contrasting Ridge regressor vs LogisticRegression classifier.',
      code: `from sklearn.linear_model import Ridge, LogisticRegression
import numpy as np

X = np.array([[1], [2], [3], [4], [5]])
y_cont = np.array([1.2, 2.3, 3.1, 4.2, 5.0]) # Continuous
y_cat = np.array([0, 0, 0, 1, 1])            # Discrete categories

reg = Ridge().fit(X, y_cont)
clf = LogisticRegression().fit(X, y_cat)

print("Regression prediction for X=3.5:", reg.predict([[3.5]])[0])
print("Classification prediction for X=3.5:", clf.predict([[3.5]])[0])
print("Classification probabilities for X=3.5:", clf.predict_proba([[3.5]])[0])
`,
    },
    runnableCode: {
      code: `import numpy as np
# Quick check of target types
y1 = np.array([12.5, 99.4, 33.1])
y2 = np.array([0, 1, 0])

is_regression = np.issubdtype(y1.dtype, np.floating)
is_binary = len(np.unique(y2)) == 2

print(f"y1 is regression: {is_regression}")
print(f"y2 is binary classification: {is_binary}")
`,
      expectedOutput: `y1 is regression: True\ny2 is binary classification: True`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 2-3', codeSnippet: 'y1 floating vs y2 integer', explanation: 'Floating-point targets signify continuous regression; discrete integer sets signify categorical classification.' },
    ],
    hyperparameters: [
      { name: 'loss_type', defaultVal: 'squared_error', range: 'squared_error, absolute_error, log_loss', effect: 'Determines the penalization geometry.', recommendation: 'Always pair continuous targets with regression losses and categorical targets with cross-entropy.' },
    ],
    assumptions: [
      { assumption: 'Ordered Metric Space for Regression', whyItMatters: 'Regression assumes numerical distances have physical meaning (30°C is 10° warmer than 20°C). Never run regression directly on nominal IDs (e.g. zip codes).', howToVerify: 'Check data types and measurement scales.' },
    ],
    commonMistakes: [
      { mistake: 'Label encoding multi-class nominal categories as 1, 2, 3 and feeding them into linear regression', solution: 'Use One-Hot Encoding for nominal variables and use cross-entropy classification models.' },
    ],
    realWorldUseCases: [
      { industry: 'Supply Chain', application: 'Inventory Demand Forecasting', benefit: 'Regression predicts exact unit counts to manufacture next month.' },
      { industry: 'Healthcare', application: 'Sepsis Alert Monitoring', benefit: 'Classification alerts ICU staff immediately if a patient transitions into critical septic risk.' },
    ],
    practiceQuestions: [
      { id: 'm0-q3', question: 'Can an algorithm predict a continuous value and still be used for classification?', hint: 'Think about probabilities.', answer: 'Yes! Logistic regression and neural networks predict a continuous probability p ∈ [0, 1]. Applying a decision threshold converts that continuous output into a discrete classification decision.' },
    ],
    quiz: [
      {
        id: 'quiz-m0-3',
        question: 'Which of the following problems should be framed as a Regression task rather than Classification?',
        options: [
          'Predicting whether an incoming email is Spam or Ham.',
          'Predicting the duration in minutes for an Uber ride from airport to downtown.',
          'Predicting which genre a movie belongs to from its synopsis.',
          'Detecting whether a credit card transaction is fraudulent.',
        ],
        correctIndex: 1,
        explanation: 'Ride duration is a continuous real-valued quantity measured in minutes, making it a canonical regression problem. All other options are discrete classification categories.',
      },
    ],
    independentExercise: {
      title: 'Determine Problem Type from Target Array',
      problem: 'Write a function classify_task_type(y) that inspects a numpy array y and returns "binary_classification", "multiclass_classification", or "regression".',
      hints: ['Check unique values count', 'Check if dtype is float and unique count > 10'],
      starterCode: `import numpy as np

def classify_task_type(y):
    # TODO: return 'binary_classification', 'multiclass_classification', or 'regression'
    return "unknown"

print(classify_task_type(np.array([0, 1, 1, 0])))
print(classify_task_type(np.array([1, 2, 3, 2, 1])))
print(classify_task_type(np.array([12.3, 45.6, 78.9, 10.1, 23.4])))
`,
      solution: `import numpy as np

def classify_task_type(y):
    uniques = np.unique(y)
    if len(uniques) == 2:
        return "binary_classification"
    if np.issubdtype(y.dtype, np.floating) and len(uniques) > 5:
        return "regression"
    return "multiclass_classification"

print(classify_task_type(np.array([0, 1, 1, 0])))
print(classify_task_type(np.array([1, 2, 3, 2, 1])))
print(classify_task_type(np.array([12.3, 45.6, 78.9, 10.1, 23.4])))
`,
    },
    summary: {
      keyTakeaways: [
        'Regression predicts continuous quantities; Classification predicts discrete class memberships.',
        'Regression models minimize distance losses (MSE, MAE); Classification models minimize probability divergences (Cross-Entropy).',
        'Continuous probabilities from classifiers are converted to categorical labels via decision thresholds.',
      ],
      nextLessonId: 'features-parameters-hyperparameters',
      nextLessonTitle: 'Features, Labels, Parameters & Hyperparameters',
      nextLessonModuleId: 'module-0',
    },
  },

  'features-parameters-hyperparameters': {
    id: 'features-parameters-hyperparameters',
    moduleId: 'module-0',
    title: 'Features, Labels, Parameters & Hyperparameters',
    subtitle: 'The Internal Learned State of Models versus External Configuration Knobs',
    order: 4,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Define features (inputs) and labels (ground-truth outputs).',
      'Distinguish parameters (learned during optimization) from hyperparameters (configured by the engineer before training).',
      'Understand how hyperparameter choices govern model capacity and generalization.',
    ],
    prerequisites: ['regression-vs-classification'],
    analogy: {
      title: 'The Car Engine vs The Factory Specifications',
      text: 'Features are the fuel, air intake, and driver pedal position entering the car. The label is the resulting vehicle speed. The parameters are the internal piston positions, throttle valve angles, and gear teeth that adjust dynamically as the car drives. The hyperparameters are the decisions made by the automotive engineer in the factory before the car ever touches the road: engine displacement, turbocharger boost ratio, and gear ratios.',
      metaphor: 'Parameters = Learned by the algorithm from data. Hyperparameters = Chosen by the engineer to guide learning.',
    },
    problemSolved: {
      title: 'Preventing Optimization Ambiguity',
      description: 'You cannot optimize a model without knowing which numbers are internal learned variables and which are fixed architectural constraints.',
      keyPoints: [
        'Features (X): Observable measurements representing instances.',
        'Labels (y): The target outcome to forecast.',
        'Parameters (θ): Weights and biases updated via gradient descent or closed-form equations.',
        'Hyperparameters (λ, α, k): Learning rates, tree depths, and regularization constants set before training.',
      ],
    },
    intuition: {
      overview: 'Parameters live in the model; hyperparameters govern how parameters are learned.',
      steps: [
        { step: 1, title: 'Extract Features X', description: 'Assemble tabular columns, token vectors, or normalized sensor readings.' },
        { step: 2, title: 'Choose Hyperparameters', description: 'Select tree depth = 5, learning rate = 0.01, L2 penalty = 1.0.' },
        { step: 3, title: 'Fit Parameters', description: 'Run training loop. The algorithm discovers optimal weights w and bias b.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical differentiation between parameter optimization and hyperparameter tuning.',
      foundations: [
        {
          name: 'Inner Loop: Parameter Optimization',
          latex: '\\mathbf{\\theta}^*(\\lambda) = \\arg\\min_{\\mathbf{\\theta}} \\mathcal{L}_{train}(\\mathbf{\\theta}; \\lambda, \\mathcal{D}_{train})',
          explanation: 'Finds optimal internal parameters θ given fixed hyperparameters λ on the training split.',
        },
        {
          name: 'Outer Loop: Hyperparameter Selection',
          latex: '\\lambda^* = \\arg\\min_{\\lambda} \\mathcal{L}_{val}(\\mathbf{\\theta}^*(\\lambda); \\mathcal{D}_{val})',
          explanation: 'Evaluates candidate hyperparameters λ on a separate validation split to maximize generalization.',
        },
      ],
    },
    derivation: {
      title: 'Bilevel Optimization of Machine Learning',
      objective: 'Demonstrate why hyperparameters cannot be trained on the training set.',
      steps: [
        {
          step: 1,
          label: 'The Trivial Memorization Trap',
          latex: '\\min_{K} \\mathcal{L}_{train}(K\\text{-NN}) \\implies K^* = 1',
          explanation: 'On training data, K=1 achieves 0 error by memorizing each point, but fails catastrophically on test data.',
        },
        {
          step: 2,
          label: 'Validation Split Independence',
          latex: '\\mathcal{D}_{train} \\cap \\mathcal{D}_{val} = \\emptyset',
          explanation: 'Hyperparameters must be evaluated on unseen validation samples to prevent trivial overfitting.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathbf{w}, b', name: 'Parameters (Weights & Bias)', description: 'Learned internal state adjusted by the algorithm.' },
      { symbol: '\\alpha', name: 'Learning Rate', description: 'Hyperparameter controlling optimization step size.' },
      { symbol: '\\lambda', name: 'Regularization Penalty', description: 'Hyperparameter controlling penalty on model complexity.' },
      { symbol: 'K', name: 'Neighborhood Size', description: 'Hyperparameter in KNN.' },
    ],
    numericalExample: {
      scenario: 'Identify the parameters vs hyperparameters for a Linear Regression model with L2 regularization.',
      dataset: [
        { component: 'Slope w₁ = 2.45', type: 'Parameter', reason: 'Calculated via Normal Equation from data' },
        { component: 'Intercept b = 12.1', type: 'Parameter', reason: 'Calculated via Normal Equation from data' },
        { component: 'Alpha λ = 0.5', type: 'Hyperparameter', reason: 'Set by engineer before running fit()' },
        { component: 'fit_intercept = True', type: 'Hyperparameter', reason: 'Configuration flag passed to constructor' },
      ],
      calculations: [
        { step: 'Count Learned Parameters', math: 'd + 1 = 1 + 1 = 2', result: '2 Parameters (w₁, b)' },
        { step: 'Count Hyperparameters', math: '1 \\text{ (alpha)} + 1 \\text{ (fit\\_intercept)} = 2', result: '2 Hyperparameters' },
      ],
      finalConclusion: 'Parameters are stored in model.coef_ and model.intercept_ AFTER fitting; hyperparameters are passed during initialization.',
    },
    visualExplanation: {
      title: 'Parameters vs Hyperparameters Grid',
      description: 'Parameters change at every step of gradient descent. Hyperparameters remain fixed throughout the training epoch run.',
      features: ['Learned vs Hand-tuned', 'Model attributes vs Constructor arguments', 'Inner loop vs Outer loop'],
    },
    scratchCode: {
      title: 'Python Example: Distinguishing Parameters from Hyperparameters',
      explanation: 'A simple Python class demonstrating where hyperparameters live vs where parameters are stored.',
      code: `class SimpleModel:
    def __init__(self, learning_rate=0.01, max_depth=3):
        # HYPERPARAMETERS: Set before training begins!
        self.learning_rate = learning_rate
        self.max_depth = max_depth
        # PARAMETERS: None until we fit data!
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        # Training discovers the PARAMETERS:
        self.weights = np.mean(X, axis=0) * self.learning_rate
        self.bias = float(np.mean(y))
        print("Model trained. Parameters learned!")

import numpy as np
m = SimpleModel(learning_rate=0.05, max_depth=5)
print(f"Hyperparameters: lr={m.learning_rate}, depth={m.max_depth}")
print(f"Parameters before fit: {m.weights}")

m.fit(np.array([[1, 2], [3, 4]]), np.array([10, 20]))
print(f"Parameters after fit: weights={m.weights}, bias={m.bias}")
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn Inspection of Parameters vs Hyperparameters',
      explanation: 'Inspecting get_params() for hyperparameters and trailing underscore attributes for learned parameters.',
      code: `from sklearn.linear_model import Ridge
import numpy as np

# Instantiate with HYPERPARAMETERS
model = Ridge(alpha=2.5, fit_intercept=True)
print("Hyperparameters (before fit):", model.get_params()['alpha'])

# Fit data
X = np.array([[1.0], [2.0], [3.0]])
y = np.array([2.0, 4.0, 6.1])
model.fit(X, y)

# Inspect learned PARAMETERS (indicated by trailing underscore _)
print("Learned Parameter coef_:", model.coef_)
print("Learned Parameter intercept_:", model.intercept_)
`,
    },
    runnableCode: {
      code: `from sklearn.tree import DecisionTreeClassifier
# Notice hyperparameters in constructor
clf = DecisionTreeClassifier(max_depth=4, criterion='gini')
print("Model initialized with hyperparameters:")
print(f"max_depth = {clf.max_depth}, criterion = {clf.criterion}")
print("Has it learned parameters yet?", hasattr(clf, "tree_"))
`,
      expectedOutput: `Model initialized with hyperparameters:\nmax_depth = 4, criterion = gini\nHas it learned parameters yet? False`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 2-3', codeSnippet: 'DecisionTreeClassifier(max_depth=4)', explanation: 'Passes hyperparameters to constructor before seeing any data.' },
      { lines: 'Line 6', codeSnippet: 'hasattr(clf, "tree_")', explanation: 'Learned parameters only exist after fit() is executed.' },
    ],
    hyperparameters: [
      { name: 'max_depth', defaultVal: 'None', range: '1 to 50', effect: 'Restricts maximum depth of tree splits to control overfitting.', recommendation: 'Tune between 3 and 10 on tabular data.' },
    ],
    assumptions: [
      { assumption: 'Hyperparameter Invariance Across Folds', whyItMatters: 'If hyperparameters change arbitrarily between cross-validation folds, performance estimates become invalid.', howToVerify: 'Keep validation protocol strictly structured.' },
    ],
    commonMistakes: [
      { mistake: 'Tuning hyperparameters on the test set', solution: 'Always tune hyperparameters on a validation split or cross-validation; the test set must be touched only ONCE for final unbiased evaluation!' },
    ],
    realWorldUseCases: [
      { industry: 'AutoML', application: 'Bayesian Optimization Services', benefit: 'Automates searching high-dimensional hyperparameter spaces to discover optimal neural architectures.' },
      { industry: 'Ad Tech', application: 'CTR Prediction', benefit: 'Calibrates L2 regularization hyperparameters across millions of sparse advertising features.' },
    ],
    practiceQuestions: [
      { id: 'm0-q4', question: 'How can you tell in Scikit-Learn whether an attribute is a learned parameter or a hyperparameter?', hint: 'Look at the naming convention.', answer: 'In Scikit-Learn, learned parameters are populated during fit() and end with a trailing underscore (e.g., coef_, intercept_, feature_importances_). Hyperparameters are arguments to __init__() with no trailing underscore.' },
    ],
    quiz: [
      {
        id: 'quiz-m0-4',
        question: 'Which of the following is a learned PARAMETER rather than a hyperparameter?',
        options: [
          'The learning rate α in Gradient Descent.',
          'The number of trees n_estimators in Random Forest.',
          'The weight vector w in Logistic Regression.',
          'The number of clusters K in K-Means.',
        ],
        correctIndex: 2,
        explanation: 'The weight vector w is learned directly from data by the optimization algorithm. Learning rate, tree count, and cluster count K are hyperparameters chosen by the engineer.',
      },
    ],
    independentExercise: {
      title: 'Filter Learned Attributes from Estimator',
      problem: 'Write a Python function get_learned_parameters(estimator) that inspects an object and returns a dictionary of all attributes ending with an underscore (excluding double underscores).',
      hints: ['Use dir(estimator)', 'Check attr.endswith("_") and not attr.startswith("__")'],
      starterCode: `from sklearn.linear_model import LinearRegression
import numpy as np

def get_learned_parameters(estimator):
    # TODO: return dict of {attr: getattr(estimator, attr)} for learned params
    return {}

lr = LinearRegression()
lr.fit(np.array([[1], [2], [3]]), np.array([2, 4, 6]))
print(get_learned_parameters(lr).keys())
`,
      solution: `from sklearn.linear_model import LinearRegression
import numpy as np

def get_learned_parameters(estimator):
    return {
        attr: getattr(estimator, attr)
        for attr in dir(estimator)
        if attr.endswith('_') and not attr.startswith('__')
    }

lr = LinearRegression()
lr.fit(np.array([[1], [2], [3]]), np.array([2, 4, 6]))
print(sorted(get_learned_parameters(lr).keys()))
`,
    },
    summary: {
      keyTakeaways: [
        'Features are the input variables X; labels are the target responses y.',
        'Parameters are the internal mathematical state (weights, biases) learned automatically during training.',
        'Hyperparameters are external configuration knobs (learning rate, depth, regularization) set by the practitioner to govern learning.',
      ],
      nextLessonId: 'train-val-test-splits',
      nextLessonTitle: 'Training, Validation, and Test Splits',
      nextLessonModuleId: 'module-0',
    },
  },

  'train-val-test-splits': {
    id: 'train-val-test-splits',
    moduleId: 'module-0',
    title: 'Training, Validation, and Test Splits',
    subtitle: 'Preventing Data Snooping, Leakage, and Achieving Unbiased Generalization',
    order: 5,
    readTimeMinutes: 24,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Understand the three distinct roles: Training (fitting parameters), Validation (tuning hyperparameters), Test (final unbiased audit).',
      'Learn why evaluating on training data gives a dangerously deceptive illusion of competence.',
      'Master stratified splitting for imbalanced classification tasks.',
    ],
    prerequisites: ['features-parameters-hyperparameters'],
    analogy: {
      title: 'The Practice Homework, The Mock Exam, and The Final Board Exam',
      text: 'The Training set is your daily homework with full answer keys: you practice repeatedly until you master the problems. The Validation set is a practice mock exam administered by your tutor: you do not see the answers beforehand, but you use your mock score to decide which subjects need more revision (hyperparameter tuning). The Test set is the sealed national board exam administered by an independent proctor: you get one single attempt, and it proves whether you truly understand the subject or merely memorized your practice homework.',
      metaphor: 'Train = Practice. Validation = Course correction. Test = Final audit.',
    },
    problemSolved: {
      title: 'Preventing the Fatal Flaw of Data Snooping',
      description: 'A model with millions of parameters can easily memorize any training dataset verbatim. Without an independent test set, you have zero evidence that the model will work in production.',
      keyPoints: [
        'Training error monotonically decreases with model capacity, masking severe overfitting.',
        'Validation sets enable objective hyperparameter selection without contaminating the test set.',
        'Test sets provide an unbiased estimate of generalization error on future production data.',
      ],
    },
    intuition: {
      overview: 'Data splits simulate the future. By locking away test data until the very end, we verify whether the model learned general laws or trivial noise.',
      steps: [
        { step: 1, title: 'Initial Split', description: 'Carve out 15-20% test data immediately and lock it in a vault.' },
        { step: 2, title: 'Train/Val Split or K-Fold', description: 'Split remaining 80% into training (60-70%) and validation (10-20%) sets.' },
        { step: 3, title: 'Final Evaluation', description: 'Evaluate the winning pipeline once on the untouched test set.' },
      ],
    },
    mathematics: {
      overview: 'Statistical foundation of empirical risk vs true risk.',
      foundations: [
        {
          name: 'True Generalization Risk',
          latex: 'R_{true}(f) = \\mathbb{E}_{(\\mathbf{x}, y) \\sim \\mathcal{P}} [\\mathcal{L}(f(\\mathbf{x}), y)]',
          explanation: 'The expected loss over the true, unobserved joint probability distribution P(X, Y).',
        },
        {
          name: 'Unbiased Test Risk Estimator',
          latex: '\\hat{R}_{test}(f) = \\frac{1}{N_{test}} \\sum_{i=1}^{N_{test}} \\mathcal{L}(f(\\mathbf{x}_i^{test}), y_i^{test})',
          explanation: 'By the Law of Large Numbers, test risk converges to true risk as N_test grows, provided test samples are strictly independent.',
        },
      ],
    },
    derivation: {
      title: 'Why Training Error is Optimistically Biased',
      objective: 'Prove mathematically why training error is always lower than true error.',
      steps: [
        {
          step: 1,
          label: 'Parameter Selection Bias',
          latex: '\\mathbf{\\theta}^* = \\arg\\min_\\theta \\frac{1}{N_{train}} \\sum_{i=1}^{N_{train}} \\mathcal{L}(f_\\theta(\\mathbf{x}_i), y_i)',
          explanation: 'Because θ* was chosen specifically to minimize this exact sample average, it exploits chance sample idiosyncrasies.',
        },
        {
          step: 2,
          label: 'The Optimism Inequality',
          latex: '\\mathbb{E}[\\hat{R}_{train}(f_{\\mathbf{\\theta}^*})] < \\mathbb{E}[R_{true}(f_{\\mathbf{\\theta}^*})]',
          explanation: 'Training loss is fundamentally a downward-biased (overly optimistic) estimator of generalization error.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathcal{D}_{train}', name: 'Training Split', description: 'Subset used to compute gradients and fit parameters (typically 60-80%).' },
      { symbol: '\\mathcal{D}_{val}', name: 'Validation Split', description: 'Subset used to tune hyperparameters and early stopping (typically 10-20%).' },
      { symbol: '\\mathcal{D}_{test}', name: 'Test Split', description: 'Isolated subset touched once for final unbiased reporting (typically 10-20%).' },
    ],
    numericalExample: {
      scenario: 'Split a dataset of 1,000 patient records with 10% disease incidence into 70/15/15 stratified partitions.',
      dataset: [
        { partition: 'Full Dataset', total: 1000, disease_positive: 100, disease_negative: 900 },
        { partition: 'Train (70%)', total: 700, disease_positive: 70, disease_negative: 630 },
        { partition: 'Validation (15%)', total: 150, disease_positive: 15, disease_negative: 135 },
        { partition: 'Test (15%)', total: 150, disease_positive: 15, disease_negative: 135 },
      ],
      calculations: [
        { step: 'Check Stratified Ratio', math: '\\frac{70}{700} = \\frac{15}{150} = \\frac{15}{150} = 10.0\\%', result: 'Perfect 10% balance preserved across all splits' },
      ],
      finalConclusion: 'Stratification guarantees that rare disease samples are distributed proportionally, preventing an empty positive class in validation or test.',
    },
    visualExplanation: {
      title: 'Partitioning Schemes: Standard vs Stratified vs Time-Series',
      description: 'Random splitting works for i.i.d. data. Stratified splitting preserves class balance. Time-series splitting enforces temporal ordering (no training on the future).',
      features: ['70/15/15 ratio', 'Stratification by class', 'Temporal forward chaining'],
    },
    scratchCode: {
      title: 'Python Implementation of Train-Val-Test Split from Scratch',
      explanation: 'Using numpy indexing and random permutation to partition datasets cleanly.',
      code: `import numpy as np

def train_val_test_split_scratch(X, y, train_ratio=0.7, val_ratio=0.15, seed=42):
    np.random.seed(seed)
    N = len(X)
    indices = np.random.permutation(N)

    train_end = int(train_ratio * N)
    val_end = int((train_ratio + val_ratio) * N)

    train_idx = indices[:train_end]
    val_idx = indices[train_end:val_end]
    test_idx = indices[val_end:]

    return (X[train_idx], y[train_idx]), (X[val_idx], y[val_idx]), (X[test_idx], y[test_idx])

# Test on 100 instances
X_dummy = np.arange(200).reshape(100, 2)
y_dummy = np.arange(100)

(X_tr, y_tr), (X_va, y_va), (X_te, y_te) = train_val_test_split_scratch(X_dummy, y_dummy)
print(f"Sizes -> Train: {len(X_tr)}, Val: {len(X_va)}, Test: {len(X_te)}")
`,
    },
    sklearnCode: {
      title: 'Production Scikit-Learn Stratified Split',
      explanation: 'Using train_test_split twice with stratify argument for robust partitions.',
      code: `from sklearn.model_selection import train_test_split
import numpy as np

# 1000 samples with 5% minority fraud class
X = np.random.randn(1000, 4)
y = np.random.choice([0, 1], size=1000, p=[0.95, 0.05])

# Step 1: Carve out 15% test set with stratification
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y, test_size=0.15, random_state=42, stratify=y
)

# Step 2: Split remaining 85% into train (70% overall) and val (15% overall)
# 15 / 85 ≈ 0.1765
X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=0.1765, random_state=42, stratify=y_temp
)

print(f"Train size: {len(X_train)} (Positive: {np.sum(y_train)})")
print(f"Val size:   {len(X_val)} (Positive: {np.sum(y_val)})")
print(f"Test size:  {len(X_test)} (Positive: {np.sum(y_test)})")
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.model_selection import train_test_split

X = np.arange(10).reshape(-1, 1)
y = np.array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42, stratify=y)
print("Train labels:", y_train)
print("Test labels:", y_test)
`,
      expectedOutput: `Train labels: [1 0 1 0 0 1]\nTest labels: [0 1 0 1]`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-5', codeSnippet: 'train_test_split(..., stratify=y)', explanation: 'Enforces that both train and test partitions receive exactly 50% class 0 and 50% class 1.' },
    ],
    hyperparameters: [
      { name: 'test_size', defaultVal: '0.2', range: '0.1 to 0.3', effect: 'Balance between training data quantity and statistical power of test evaluation.', recommendation: 'Use 0.15 to 0.20 for datasets under 100k; use smaller fractions (e.g. 0.05) for multimillion-row datasets.' },
    ],
    assumptions: [
      { assumption: 'Independent and Identically Distributed (i.i.d.) Samples', whyItMatters: 'If samples are correlated in time (e.g. stock prices), random splitting leaks future information. Use TimeSeriesSplit instead!', howToVerify: 'Verify temporal and grouping structure.' },
    ],
    commonMistakes: [
      { mistake: 'Fitting a StandardScaler on the entire dataset BEFORE splitting into train and test', solution: 'This causes subtle data leakage! Always split FIRST, call scaler.fit_transform(X_train), and then scaler.transform(X_test).' },
    ],
    realWorldUseCases: [
      { industry: 'Biotechnology', application: 'Genomic Drug Discovery', benefit: 'Group-based splitting ensures no patient appears in both train and test, preventing deceptive memorization of patient genetic markers.' },
      { industry: 'Retail Banking', application: 'Loan Default Prediction', benefit: 'Out-of-time test splitting validates that models trained on 2023 loans generalize during 2024 macroeconomic interest rate shifts.' },
    ],
    practiceQuestions: [
      { id: 'm0-q5', question: 'Why is standard random train_test_split invalid for predicting stock prices?', hint: 'Can tomorrow affect yesterday?', answer: 'Financial data is temporally dependent. Random splitting allows the model to train on Wednesday data to predict Tuesday prices, leaking future information. Time-series cross-validation must strictly respect temporal causality.' },
    ],
    quiz: [
      {
        id: 'quiz-m0-5',
        question: 'What is the primary role of the VALIDATION set in machine learning workflows?',
        options: [
          'To compute gradients and update weight parameters.',
          'To compare candidate models and select optimal hyperparameters without contaminating the test set.',
          'To demonstrate final production accuracy to business stakeholders.',
          'To clean missing values from raw datasets.',
        ],
        correctIndex: 1,
        explanation: 'The validation set serves as an objective benchmark for hyperparameter tuning and model selection. The test set remains untouched for the final audit.',
      },
    ],
    independentExercise: {
      title: 'Verify Stratification Consistency',
      problem: 'Write a function check_stratification(y_full, y_train, y_test, tolerance=0.02) that returns True if the positive class ratio in train and test splits matches the full dataset within the given tolerance.',
      hints: ['mean(y == 1) gives positive ratio', 'abs(ratio_train - ratio_full) < tolerance'],
      starterCode: `import numpy as np

def check_stratification(y_full, y_train, y_test, tolerance=0.02):
    # TODO: verify class balance ratios match
    return False

y_full = np.array([1]*100 + [0]*900)
y_train = np.array([1]*70 + [0]*630)
y_test = np.array([1]*30 + [0]*270)
print("Is stratified:", check_stratification(y_full, y_train, y_test))
`,
      solution: `import numpy as np

def check_stratification(y_full, y_train, y_test, tolerance=0.02):
    r_full = np.mean(y_full == 1)
    r_train = np.mean(y_train == 1)
    r_test = np.mean(y_test == 1)
    return bool(abs(r_train - r_full) <= tolerance and abs(r_test - r_full) <= tolerance)

y_full = np.array([1]*100 + [0]*900)
y_train = np.array([1]*70 + [0]*630)
y_test = np.array([1]*30 + [0]*270)
print("Is stratified:", check_stratification(y_full, y_train, y_test))
`,
    },
    summary: {
      keyTakeaways: [
        'Training data fits parameters; validation data selects hyperparameters; test data audits true generalization.',
        'Never evaluate models solely on training data: training loss is fundamentally downward-biased.',
        'Use stratified splitting for imbalanced classes and temporal splitting for time-series data.',
      ],
      nextLessonId: 'batch-vs-online-learning',
      nextLessonTitle: 'Batch vs Online Learning',
      nextLessonModuleId: 'module-0',
    },
  },

  'batch-vs-online-learning': {
    id: 'batch-vs-online-learning',
    moduleId: 'module-0',
    title: 'Batch vs Online Learning',
    subtitle: 'Full-Dataset Offline Optimization versus Incremental Streaming Updates',
    order: 6,
    readTimeMinutes: 18,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Compare batch (offline) learning with online (streaming/incremental) learning.',
      'Understand the trade-offs: computational cost, memory footprints, and responsiveness to concept drift.',
      'Implement incremental partial_fit algorithms in Python and Scikit-learn.',
    ],
    prerequisites: ['train-val-test-splits'],
    analogy: {
      title: 'The Annual Printed Encyclopedia vs The Live Twitter Feed',
      text: 'Batch learning is like publishing a heavy 30-volume encyclopedia: you gather all human knowledge from the past decade, spend 6 months formatting it, print it, and bind it. It is comprehensive, but the moment it hits bookshelves it is outdated. Online learning is like monitoring a live news feed: as each new event occurs, the reporter posts a brief update, adjusting their ongoing understanding in real-time without reprinting the entire history of the world.',
      metaphor: 'Batch = Re-train on everything from scratch. Online = Continuous incremental updates on live streams.',
    },
    problemSolved: {
      title: 'Overcoming Massive Data & Rapid Concept Drift',
      description: 'When datasets exceed server RAM (e.g. 50 terabytes of search logs) or when consumer behavior shifts hourly, re-running batch algorithms from scratch is computationally impossible.',
      keyPoints: [
        'Batch learning requires loading the entire dataset into memory (or disk partitions) and takes hours/days to re-train.',
        'Online learning updates parameters θ on individual incoming samples or mini-batches using SGD in milliseconds.',
        'Out-of-core learning enables processing billion-row datasets on modest hardware.',
      ],
    },
    intuition: {
      overview: 'Instead of computing the exact gradient across all N samples, online learning takes a noisy, fast gradient step on the newest instance.',
      steps: [
        { step: 1, title: 'Stream Arrival', description: 'A new observation (x_t, y_t) arrives from production stream.' },
        { step: 2, title: 'Compute Instant Loss & Gradient', description: 'Evaluate loss L(f(x_t), y_t) and compute gradient g_t = ∇_θ L.' },
        { step: 3, title: 'Incremental Parameter Update', description: 'Update θ := θ - α g_t and discard or archive the raw sample.' },
      ],
    },
    mathematics: {
      overview: 'Comparison of batch empirical risk vs stochastic online updates.',
      foundations: [
        {
          name: 'Batch Gradient Descent (Full Dataset)',
          latex: '\\mathbf{\\theta}^{(k+1)} = \\mathbf{\\theta}^{(k)} - \\alpha \\cdot \\frac{1}{N} \\sum_{i=1}^{N} \\nabla_\\mathbf{\\theta} \\mathcal{L}(f_\\mathbf{\\theta}(\\mathbf{x}_i), y_i)',
          explanation: 'Requires sweeping through all N data points before making a single parameter update.',
        },
        {
          name: 'Online Stochastic Gradient Descent (Streaming Instance)',
          latex: '\\mathbf{\\theta}^{(t+1)} = \\mathbf{\\theta}^{(t)} - \\alpha_t \\nabla_\\mathbf{\\theta} \\mathcal{L}(f_\\mathbf{\\theta}(\\mathbf{x}_t), y_t)',
          explanation: 'Updates parameters immediately upon the arrival of instance t in O(d) time.',
        },
      ],
    },
    derivation: {
      title: 'Robbins-Monro Conditions for Online Convergence',
      objective: 'Determine learning rate schedules that guarantee online convergence to the minimum.',
      steps: [
        {
          step: 1,
          label: 'Sufficient Step Energy',
          latex: '\\sum_{t=1}^{\\infty} \\alpha_t = \\infty',
          explanation: 'The learning rate cannot decay too fast, otherwise the model gets stuck before reaching the optimum.',
        },
        {
          step: 2,
          label: 'Noise Cancellation Property',
          latex: '\\sum_{t=1}^{\\infty} \\alpha_t^2 < \\infty',
          explanation: 'The squared sum must be finite, ensuring variance from individual noisy samples eventually vanishes.',
        },
      ],
    },
    variables: [
      { symbol: 't', name: 'Time Step / Stream Index', description: 'Current sequential position in the data stream.' },
      { symbol: '\\alpha_t', name: 'Time-Decaying Learning Rate', description: 'Step size scheduled to satisfy Robbins-Monro convergence.' },
      { symbol: 'N', name: 'Total Dataset Size', description: 'Finite in batch systems; unbounded in online streams.' },
    ],
    numericalExample: {
      scenario: 'Update an online streaming mean estimator x̄_t after observing a new data point x_3 = 10 (given x̄_2 = 4).',
      dataset: [
        { step: 1, observation: 2, mean: 2.0 },
        { step: 2, observation: 6, mean: 4.0 },
        { step: 3, observation: 10, mean: 6.0 },
      ],
      calculations: [
        { step: 'Online Recursive Mean Formula', math: '\\bar{x}_t = \\bar{x}_{t-1} + \\frac{1}{t}(x_t - \\bar{x}_{t-1})', result: 'Formula' },
        { step: 'Compute x̄_3 without historical data', math: '4.0 + \\frac{1}{3}(10 - 4.0) = 4.0 + \\frac{6}{3} = 6.0', result: 'New Mean = 6.0' },
      ],
      finalConclusion: 'The online algorithm updated the exact mean without storing or re-reading historical values 2 and 6.',
    },
    visualExplanation: {
      title: 'Batch Optimization vs Streaming Updates',
      description: 'Batch optimization takes smooth, steady steps toward the minimum. Online learning takes noisy, erratic zig-zag steps that arrive at the same destination with 100x less memory.',
      features: ['Full epoch vs single sample', 'Memory complexity O(N) vs O(1)', 'Adaptability to concept drift'],
    },
    scratchCode: {
      title: 'Python Implementation of an Online Linear Regressor from Scratch',
      explanation: 'Incrementally updating weight w on a live generator stream without storing history.',
      code: `import numpy as np

class OnlineLinearRegressor:
    def __init__(self, lr=0.01):
        self.w = 0.0
        self.b = 0.0
        self.lr = lr

    def update(self, x, y):
        # 1. Predict
        pred = self.w * x + self.b
        # 2. Error
        err = pred - y
        # 3. Incremental gradient update
        self.w -= self.lr * (err * x)
        self.b -= self.lr * err

# Simulate an infinite stream of data: y = 2.5 * x + 1.0
online_model = OnlineLinearRegressor(lr=0.02)
for i in range(1, 301):
    x_val = np.random.uniform(0, 5)
    y_val = 2.5 * x_val + 1.0 + np.random.normal(0, 0.1)
    online_model.update(x_val, y_val)

print(f"Online Learned Weight: {online_model.w:.3f} (True: 2.5)")
print(f"Online Learned Bias:   {online_model.b:.3f} (True: 1.0)")
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn Incremental Learning via partial_fit',
      explanation: 'Using SGDClassifier for streaming, out-of-core classification.',
      code: `from sklearn.linear_model import SGDClassifier
import numpy as np

# Instantiate model with log_loss (logistic regression)
clf = SGDClassifier(loss='log_loss', learning_rate='optimal', random_state=42)

# Stream mini-batches
classes = np.array([0, 1])

# Batch 1
X_b1 = np.array([[1.0, 2.0], [2.0, 1.0]])
y_b1 = np.array([0, 0])
clf.partial_fit(X_b1, y_b1, classes=classes)

# Batch 2
X_b2 = np.array([[5.0, 6.0], [6.0, 5.0]])
y_b2 = np.array([1, 1])
clf.partial_fit(X_b2, y_b2)

print("Predictions after streaming 2 mini-batches:")
print(clf.predict([[1.5, 1.5], [5.5, 5.5]]))
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.linear_model import SGDRegressor

reg = SGDRegressor(max_iter=1, tol=None, warm_start=True)
# Simulate 3 streaming samples
for i in range(3):
    X_stream = np.array([[float(i)]])
    y_stream = np.array([float(2 * i)])
    reg.partial_fit(X_stream, y_stream)

print("Streaming regressor weights fitted successfully.")
`,
      expectedOutput: `Streaming regressor weights fitted successfully.`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-8', codeSnippet: 'reg.partial_fit(X_stream, y_stream)', explanation: 'Executes a single SGD step on the streaming sample without requiring previous training history.' },
    ],
    hyperparameters: [
      { name: 'learning_rate', defaultVal: 'optimal', range: 'constant, optimal, adaptive', effect: 'Controls the step size decay schedule across stream iterations.', recommendation: 'Use adaptive or optimal to satisfy Robbins-Monro convergence.' },
    ],
    assumptions: [
      { assumption: 'Bounded Gradients', whyItMatters: 'Extreme outliers in an online stream can instantly corrupt parameters. Gradient clipping or robust losses are mandatory.', howToVerify: 'Inspect incoming feature ranges.' },
    ],
    commonMistakes: [
      { mistake: 'Forgetting to pass classes= parameter on the first call to partial_fit in Scikit-Learn', solution: 'Because the model does not see the full dataset at once, you must explicitly declare all possible class labels on the first partial_fit() invocation.' },
    ],
    realWorldUseCases: [
      { industry: 'Ad Tech', application: 'Real-Time Click-Through Rate Bidding', benefit: 'Updates ad ranking parameters on millions of auction impressions per second.' },
      { industry: 'High-Frequency Trading', application: 'Order Book Price Slippage', benefit: 'Adapts execution models continuously as market liquidity fluctuations occur.' },
    ],
    practiceQuestions: [
      { id: 'm0-q6', question: 'What is "Catastrophic Forgetting" in online learning, and how is it mitigated?', hint: 'What happens if data distribution completely changes?', answer: 'Catastrophic forgetting occurs when an online model abruptly overwrites previously learned patterns upon encountering new data distributions. It is mitigated by experience replay buffers and elastic weight consolidation.' },
    ],
    quiz: [
      {
        id: 'quiz-m0-6',
        question: 'Which Scikit-Learn method enables incremental, streaming training on mini-batches without loading the full dataset into memory?',
        options: [
          'model.fit()',
          'model.partial_fit()',
          'model.predict_proba()',
          'model.transform()',
        ],
        correctIndex: 1,
        explanation: 'partial_fit() performs an incremental update on a batch of samples, preserving the current model weights and enabling out-of-core learning.',
      },
    ],
    independentExercise: {
      title: 'Implement Streaming Exponential Moving Average',
      problem: 'Write a class ExponentialMovingAverage(alpha=0.1) with an update(x) method that computes the recursive exponentially weighted average: S_t = α · x_t + (1 - α) · S_{t-1}.',
      hints: ['If S is None, initialize S = x_t', 'Otherwise apply the convex combination'],
      starterCode: `class ExponentialMovingAverage:
    def __init__(self, alpha=0.1):
        self.alpha = alpha
        self.val = None

    def update(self, x):
        # TODO: update self.val
        return self.val

ema = ExponentialMovingAverage(alpha=0.5)
for x in [10.0, 20.0, 30.0]:
    print(ema.update(x))
`,
      solution: `class ExponentialMovingAverage:
    def __init__(self, alpha=0.1):
        self.alpha = alpha
        self.val = None

    def update(self, x):
        if self.val is None:
            self.val = float(x)
        else:
            self.val = self.alpha * float(x) + (1.0 - self.alpha) * self.val
        return round(self.val, 3)

ema = ExponentialMovingAverage(alpha=0.5)
for x in [10.0, 20.0, 30.0]:
    print(ema.update(x))
`,
    },
    summary: {
      keyTakeaways: [
        'Batch learning trains on the static full dataset; Online learning processes streaming instances sequentially.',
        'Online learning uses minimal memory O(d) and adapts to real-time concept drift.',
        'In Scikit-Learn, use SGDClassifier and SGDRegressor with partial_fit() for out-of-core streaming pipelines.',
      ],
      nextLessonId: 'ml-workflow-problem-formulation',
      nextLessonTitle: 'End-to-End ML Workflow & Problem Formulation',
      nextLessonModuleId: 'module-0',
    },
  },

  'ml-workflow-problem-formulation': {
    id: 'ml-workflow-problem-formulation',
    moduleId: 'module-0',
    title: 'End-to-End ML Workflow & Problem Formulation',
    subtitle: 'From Translating Business Questions to Objective Losses and Production Monitoring',
    order: 7,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Master the standard 7-stage machine learning lifecycle.',
      'Translate qualitative business pain points into mathematically well-posed loss objectives.',
      'Establish robust baseline benchmarks before deploying complex architectures.',
    ],
    prerequisites: ['batch-vs-online-learning'],
    analogy: {
      title: 'Architecting a Skyscraper vs Stacking Bricks',
      text: 'Novice engineers think machine learning is just calling model.fit()—like stacking bricks on a sidewalk. Senior engineers know that 85% of the effort is soil testing (data inspection and cleaning), foundation laying (problem formulation, metric selection, and leak-free splitting), plumbing and electrical design (pipelines and latency budgets), and structural maintenance (drift monitoring and automated retraining). Fitting the algorithm is just the final roof placement.',
      metaphor: 'A sophisticated neural network trained on a flawed problem formulation produces high-confidence catastrophe.',
    },
    problemSolved: {
      title: 'Bridging Business Objectives and Statistical Optimization',
      description: 'Executives do not care about minimizing log-loss; they care about customer churn, loan loss, and fraud prevention. Successful ML engineers translate ROI requirements into loss metrics.',
      keyPoints: [
        'Phase 1: Problem Formulation & Metric Alignment.',
        'Phase 2: Data Sourcing, Ingestion & EDA.',
        'Phase 3: Preprocessing & Leakage Prevention.',
        'Phase 4: Heuristic Baseline (Dummy / Simple Rule).',
        'Phase 5: Model Selection, Cross-Validation & Hyperparameter Tuning.',
        'Phase 6: Error Analysis & Fairness Checks.',
        'Phase 7: Packaging, Deployment & Continuous Monitoring.',
      ],
    },
    intuition: {
      overview: 'Never build complex models before establishing a dead-simple baseline heuristic (e.g. predicting the majority class or rolling mean).',
      steps: [
        { step: 1, title: 'Formulate Business Question', description: 'Define what to predict, when it must be predicted, and what actions will be taken.' },
        { step: 2, title: 'Build Minimal Baseline', description: 'A 5-line rule or dummy model provides the floor that machine learning must exceed.' },
        { step: 3, title: 'Iterate with Rigor', description: 'Feature engineer domain signals, tune models, and verify error distributions.' },
      ],
    },
    mathematics: {
      overview: 'Translating business profit/cost matrices into machine learning loss thresholds.',
      foundations: [
        {
          name: 'Expected Business Profit Objective',
          latex: '\\max_\\tau \\mathbb{E}[\\text{Profit}(\\tau)] = N \\cdot \\left[ p_1 \\cdot \\text{TPR}(\\tau) \\cdot V_{TP} - p_0 \\cdot \\text{FPR}(\\tau) \\cdot C_{FP} \\right]',
          explanation: 'Maximizes net financial return by weighting True Positive value V_TP against False Positive operational cost C_FP.',
        },
      ],
    },
    derivation: {
      title: 'The Minimum Viable Baseline Benchmark',
      objective: 'Formulate the mathematical floor for classification and regression.',
      steps: [
        {
          step: 1,
          label: 'Majority Class Baseline (Zero-Rule Classifier)',
          latex: '\\hat{y}_{base} = \\arg\\max_c \\sum_{i=1}^N \\mathbb{I}(y_i = c)',
          explanation: 'Always predicting the most frequent class gives baseline accuracy (e.g. 95% on 5% fraud).',
        },
        {
          step: 2,
          label: 'Mean Target Baseline (Zero-Rule Regressor)',
          latex: '\\hat{y}_{base} = \\bar{y} = \\frac{1}{N} \\sum_{i=1}^N y_i \\implies R^2_{base} = 0.0',
          explanation: 'Always predicting sample mean ȳ gives R² = 0.0. Any ML model with R² ≤ 0 is worse than useless.',
        },
      ],
    },
    variables: [
      { symbol: 'V_{TP}', name: 'Value of True Positive', description: 'Dollar revenue or loss saved by correctly identifying target instance.' },
      { symbol: 'C_{FP}', name: 'Cost of False Alarm', description: 'Customer friction or operational expense of an incorrect alert.' },
      { symbol: '\\bar{y}', name: 'Sample Mean Baseline', description: 'Zero-variance default baseline prediction.' },
    ],
    numericalExample: {
      scenario: 'Calculate expected profit for an AI fraud detector across 10,000 transactions (1% fraud rate). Catching fraud saves $500; false alarms cost $10 investigation fee. Model has TPR=80%, FPR=2%.',
      dataset: [
        { total_transactions: 10000, true_frauds: 100, legitimate: 9900 },
        { caught_frauds_tp: 80, missed_frauds_fn: 20, false_alarms_fp: 198 },
      ],
      calculations: [
        { step: 'Gross Savings from Caught Fraud', math: '80 \\times \\$500 = \\$40,000', result: '+$40,000' },
        { step: 'Operational Cost of False Alarms', math: '198 \\times \\$10 = \\$1,980', result: '-$1,980' },
        { step: 'Net Business ROI', math: '\\$40,000 - \\$1,980 = \\$38,020', result: 'Net Profit: +$38,020' },
      ],
      finalConclusion: 'The machine learning system delivers an annual ROI of over $38k compared to an unguided heuristic baseline.',
    },
    visualExplanation: {
      title: 'The Machine Learning Lifecycle Flywheel',
      description: 'Continuous feedback loop: Data Ingestion → Preprocessing → Model Training → Evaluation → Deployment → Telemetry & Monitoring → Data Ingestion.',
      features: ['Continuous retraining loop', 'Data drift feedback', 'Operational telemetry'],
    },
    scratchCode: {
      title: 'Python Example: Establishing Dummy Baseline Estimators',
      explanation: 'Building simple baseline benchmarks before fitting complex models.',
      code: `import numpy as np

# Synthetic imbalanced problem (90% negative, 10% positive)
y_true = np.array([0]*90 + [1]*10)

# Dummy baseline: Always predict majority class 0
y_dummy_pred = np.zeros(100)
baseline_acc = np.mean(y_true == y_dummy_pred) * 100

print(f"Dummy Baseline Accuracy: {baseline_acc:.1f}%")
print("Notice: A fancy neural net with 89% accuracy is actually WORSE than this 1-line baseline!")
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn DummyClassifier and DummyRegressor',
      explanation: 'Official baseline benchmark estimators in Scikit-Learn.',
      code: `from sklearn.dummy import DummyClassifier, DummyRegressor
import numpy as np

X = np.random.randn(100, 3)
y = np.array([0]*90 + [1]*10)

# Always predicts majority class
dummy = DummyClassifier(strategy='most_frequent')
dummy.fit(X, y)

print("Baseline accuracy score:", dummy.score(X, y))
print("Any valid ML model must significantly beat this benchmark!")
`,
    },
    runnableCode: {
      code: `from sklearn.dummy import DummyRegressor
import numpy as np

X = np.array([[1], [2], [3], [4]])
y = np.array([10.0, 20.0, 30.0, 40.0])

dummy_reg = DummyRegressor(strategy='mean')
dummy_reg.fit(X, y)
print(f"Dummy predicted mean: {dummy_reg.predict([[100]])[0]:.1f}")
print(f"Baseline R^2 score: {dummy_reg.score(X, y):.1f}")
`,
      expectedOutput: `Dummy predicted mean: 25.0\nBaseline R^2 score: 0.0`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 7-8', codeSnippet: 'DummyRegressor(strategy="mean")', explanation: 'Generates predictions equal to the sample mean of training targets.' },
      { lines: 'Line 10', codeSnippet: 'dummy_reg.score(X, y)', explanation: 'R² of predicting the mean is mathematically 0.0 by definition.' },
    ],
    hyperparameters: [
      { name: 'strategy', defaultVal: 'most_frequent', range: 'most_frequent, stratified, uniform', effect: 'Governs baseline heuristic logic.', recommendation: 'Always evaluate against most_frequent for imbalanced classification and mean for regression.' },
    ],
    assumptions: [
      { assumption: 'Actionable Prediction Output', whyItMatters: 'If business stakeholders have no operational process to act upon predictions, model deployment is useless.', howToVerify: 'Align with operational domain teams before training.' },
    ],
    commonMistakes: [
      { mistake: 'Celebrating 98% accuracy on a dataset with 99% majority class without checking a baseline', solution: 'Always measure performance relative to DummyClassifier(strategy="most_frequent")!' },
    ],
    realWorldUseCases: [
      { industry: 'Insurance', application: 'Underwriting Claims Loss Modeling', benefit: 'Ensures machine learning premiums beat historical actuarial tables by quantifiable statistical margins.' },
      { industry: 'Aerospace', application: 'Jet Engine Predictive Maintenance', benefit: 'Structures telemetry streaming into an alert workflow giving engineers 72 hours warning before turbine degradation.' },
    ],
    practiceQuestions: [
      { id: 'm0-q7', question: 'Why must a baseline model be built before training advanced models like XGBoost or Neural Networks?', hint: 'How do you know if complexity is justified?', answer: 'A baseline establishes the minimum threshold of performance. If a 1-line heuristic achieves 92% accuracy, an XGBoost model achieving 92.5% may not justify the computational overhead, engineering maintenance, and latency costs.' },
    ],
    quiz: [
      {
        id: 'quiz-m0-7',
        question: 'What is the R² score of a baseline regression model that always predicts the sample mean ȳ for every observation?',
        options: [
          '1.00',
          '0.50',
          '0.00',
          '-1.00',
        ],
        correctIndex: 2,
        explanation: 'By mathematical definition, R² = 1 - (SS_res / SS_tot). When predicting ȳ, SS_res = SS_tot, so R² = 1 - 1 = 0.0.',
      },
    ],
    independentExercise: {
      title: 'Calculate Business ROI of ML Model vs Baseline',
      problem: 'Write a function compute_model_roi(n_instances, positive_ratio, tpr, fpr, value_tp, cost_fp) that calculates net dollar profit.',
      hints: ['tp = n_instances * positive_ratio * tpr', 'fp = n_instances * (1 - positive_ratio) * fpr', 'profit = tp * value_tp - fp * cost_fp'],
      starterCode: `def compute_model_roi(n_instances, positive_ratio, tpr, fpr, value_tp, cost_fp):
    # TODO: return net profit
    return 0.0

print(compute_model_roi(10000, 0.02, 0.85, 0.03, 250.0, 15.0))
`,
      solution: `def compute_model_roi(n_instances, positive_ratio, tpr, fpr, value_tp, cost_fp):
    n_pos = n_instances * positive_ratio
    n_neg = n_instances * (1.0 - positive_ratio)
    tp = n_pos * tpr
    fp = n_neg * fpr
    return round(tp * value_tp - fp * cost_fp, 2)

print(compute_model_roi(10000, 0.02, 0.85, 0.03, 250.0, 15.0))
`,
    },
    summary: {
      keyTakeaways: [
        'A successful ML project begins with translating business ROI into statistical loss objectives.',
        'Always establish a zero-rule baseline (DummyClassifier, DummyRegressor) before engineering complex models.',
        'The lifecycle continues post-launch: monitor telemetry, data drift, and model performance degradation continuously.',
      ],
      nextLessonId: 'scalars-vectors-matrices-tensors',
      nextLessonTitle: 'Scalars, Vectors, Matrices, and Tensors',
      nextLessonModuleId: 'module-1',
    },
  },
};
