import { LessonContent, ModuleData } from '@/lib/types';

// =========================================================================
// MODULE 0.1: How AI, ML, Deep Learning & Generative AI Relate
// =========================================================================
export const phase0Mod1Data: ModuleData = {
  id: 'phase-0-mod-1',
  number: 0.1,
  title: 'How AI, ML, Deep Learning & Generative AI Relate',
  subtitle: 'Taxonomy of Modern AI: Classical Logic, Statistical Learning, Neural Networks & Foundation Models',
  description:
    'Deconstruct the landscape of artificial intelligence. Master the Russian-doll hierarchy separating symbolic systems, statistical machine learning, deep neural representations, and modern generative foundation models.',
  icon: 'Compass',
  badge: 'Phase 0 · Diagnostic',
  estimatedHours: 1,
  topicsCount: 1,
  lessons: [
    {
      id: 'p0-ai-ml-hierarchy',
      moduleId: 'phase-0-mod-1',
      title: 'Taxonomy of AI: Symbolic Rules to Generative Models',
      description:
        'Explore the hierarchy of modern artificial intelligence, determine when to use heuristic rules versus statistical learning, and contrast deep learning with foundation models.',
      order: 1,
      readTimeMinutes: 25,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
  ],
};

export const p0Mod1Lessons: Record<string, LessonContent> = {
  'p0-ai-ml-hierarchy': {
    id: 'p0-ai-ml-hierarchy',
    moduleId: 'phase-0-mod-1',
    title: 'Taxonomy of AI: Symbolic Rules to Generative Models',
    subtitle: 'Disentangling Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI',
    order: 1,
    readTimeMinutes: 25,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Differentiate between Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI using the Russian-doll Venn hierarchy.',
      'Identify the boundary where classical rule-based heuristics fail and data-driven statistical learning becomes mandatory.',
      'Understand how deep learning bypasses manual feature engineering through hierarchical representation learning.',
      'Analyze the engineering trade-offs between heuristic code, scikit-learn statistical models, deep neural networks, and generative API endpoints.',
    ],
    prerequisites: ['Curiosity to understand modern artificial intelligence architectures.'],
    analogy: {
      title: 'The Master Chef Hierarchy',
      text: 'Think of building an intelligent kitchen assistant across four generations of technology. In Generation 1 (Symbolic AI), you program rigid if-else rules: "If water temperature exceeds 100°C, turn off flame; if soup is salty, add 1 cup of water." It cannot adapt to baking or seasoning nuance. In Generation 2 (Machine Learning), you feed the system 10,000 soup recipes with human taste ratings; it mathematically fits regression coefficients to find the optimal ratio of salt, acidity, and umami. In Generation 3 (Deep Learning), the system consumes raw audio recordings of sizzling pots and multispectral thermal camera pixels, discovering internal sensory features without human recipes. In Generation 4 (Generative AI), the model has absorbed millions of culinary texts and culinary chemistry treatises, drafting entirely novel fusion menus, answering conversational queries, and troubleshooting recipes on the fly.',
      metaphor: 'Symbolic AI is a rigid cookbook; Machine Learning is statistical recipe optimization; Deep Learning is training a sensory palate from raw experience; Generative AI is an inventive master chef synthesizing cuisine from world literature.',
    },
    problemSolved: {
      title: 'Eliminating the "AI" Monolith Confusion',
      description:
        'Industry discussions often conflate AI, ML, Deep Learning, and GenAI as interchangeable buzzwords. This conceptual vagueness leads engineering teams to over-engineer simple tabular classification tasks with costly 70B parameter LLMs or misapply classical linear models to high-dimensional unstructured vision and speech problems.',
      keyPoints: [
        'Artificial Intelligence is the broad umbrella of machines executing tasks that would require human cognitive synthesis.',
        'Machine Learning is the subfield where systems induce mapping rules from empirical data rather than executing pre-scripted logic.',
        'Deep Learning replaces hand-crafted manual feature extraction with multi-layer differentiable neural representations.',
        'Generative AI specializes in synthesizing new token sequences (text, images, audio, code) conditioned on learned probability distributions.',
      ],
    },
    intuition: {
      overview:
        'Modern AI operates as concentric subsets. Every Generative AI model is a Deep Learning architecture; every Deep Learning model is an instance of Machine Learning; and all Machine Learning is part of Artificial Intelligence.',
      steps: [
        {
          step: 1,
          title: 'Classical Artificial Intelligence (1950s - Present)',
          description:
            'Focuses on symbolic reasoning, search algorithms (A*, minimax in chess), knowledge graphs, and expert decision trees. Logic is explicitly defined by human domain engineers.',
        },
        {
          step: 2,
          title: 'Statistical Machine Learning (1990s - Present)',
          description:
            'Shifts from manual rules to optimization objectives. Given input features X and ground-truth labels y, an algorithm minimizes an empirical risk loss function J(theta) to compute optimal weights.',
        },
        {
          step: 3,
          title: 'Deep Learning & Neural Networks (2010s - Present)',
          description:
            'Stacks successive non-linear matrix operations (layers) to learn hierarchical feature representations directly from high-dimensional unstructured arrays (pixels, audio spectrograms).',
        },
        {
          step: 4,
          title: 'Generative AI & Foundation Models (2020s - Present)',
          description:
            'Pretrained self-supervised transformer architectures trained over internet-scale corpora to model conditional probability distributions P(token_t | token_<t), enabling zero-shot instruction following.',
        },
      ],
    },
    mathematics: {
      overview:
        'Mathematically, the transition from classical ML to Deep Learning and Generative AI reflects how the hypothesis space and feature representation mapping are parameterized.',
      foundations: [
        {
          name: 'Classical Supervised Learning Function Approximation',
          latex: 'y = f(x; \\theta) = \\sigma(\\mathbf{w}^T \\phi(\\mathbf{x}) + b)',
          explanation:
            'In classical ML, the input vector x is manually transformed by a fixed human-designed feature extractor phi(x), and the model learns only the linear parameter weights w.',
        },
        {
          name: 'Deep Hierarchical Representation Mapping',
          latex: '\\mathbf{h}^{(l)} = g^{(l)}\\left(\\mathbf{W}^{(l)} \\mathbf{h}^{(l-1)} + \\mathbf{b}^{(l)}\\right), \\quad l = 1, \\dots, L',
          explanation:
            'In deep learning, intermediate feature representations h^(l) are learned end-to-end via gradient backpropagation through L stacked non-linear matrix affine transformations.',
        },
        {
          name: 'Autoregressive Generative Likelihood Factorization',
          latex: 'P(\\mathbf{x}_{1:T}) = \\prod_{t=1}^T P(x_t \\mid x_1, x_2, \\dots, x_{t-1}; \\Theta)',
          explanation:
            'Generative autoregressive language models factorize the joint probability of a sequence x into conditional token distributions parameterized by transformer weights Theta.',
        },
      ],
    },
    derivation: {
      title: 'Comparing the Optimization Objectives Across Paradigms',
      objective:
        'Derive the transition from supervised risk minimization to self-supervised generative pretraining.',
      steps: [
        {
          step: 1,
          label: 'Classical Supervised Loss (Empirical Risk Minimization)',
          latex: '\\min_\\theta \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}\\left(f(\\mathbf{x}^{(i)}; \\theta), y^{(i)}\\right) + \\lambda \\Omega(\\theta)',
          explanation:
            'Requires human-labeled ground truth targets y^(i) for every observation. Regularization Omega(theta) constrains model complexity.',
        },
        {
          step: 2,
          label: 'Deep Representation Learning with Backpropagation',
          latex: '\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}^{(l)}} = \\boldsymbol{\\delta}^{(l)} \\cdot \\left(\\mathbf{h}^{(l-1)}\\right)^T, \\quad \\boldsymbol{\\delta}^{(l)} = \\left((\\mathbf{W}^{(l+1)})^T \\boldsymbol{\\delta}^{(l+1)}\\right) \\odot g\'(\\mathbf{z}^{(l)})',
          explanation:
            'The chain rule of calculus propagates prediction error backward through all layer weights without manual feature engineering.',
        },
        {
          step: 3,
          label: 'Generative Self-Supervised Cross-Entropy (Autoregressive Next-Token)',
          latex: '\\mathcal{L}_{\\text{GenAI}}(\\Theta) = - \\sum_{t=1}^T \\log P(x_t \\mid x_{<t}; \\Theta)',
          explanation:
            'No manual labeling is required. The sequence itself provides the supervision: the past tokens x_<t serve as inputs, and the next token x_t serves as the target label.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathbf{x}', name: 'Input Feature Vector', description: 'Raw observation or tabular features', dimensions: '(D, 1)' },
      { symbol: '\\phi(\\mathbf{x})', name: 'Manual Feature Map', description: 'Engineered polynomial, interaction, or binned features', dimensions: '(M, 1)' },
      { symbol: '\\mathbf{W}^{(l)}', name: 'Layer Weight Matrix', description: 'Learnable linear projection weights at layer l', dimensions: '(d_l, d_{l-1})' },
      { symbol: 'P(x_t \\mid x_{<t})', name: 'Conditional Probability', description: 'Softmax output probability over vocabulary tokens', dimensions: 'Scalar in [0, 1]' },
    ],
    numericalExample: {
      scenario: 'Classifying email spam across the three paradigms: Rule-based, Classical ML, and Generative AI.',
      dataset: [
        { paradigm: 'Symbolic Rules', input: 'Keyword "FREE"', processing: 'if "FREE" in text and links > 3', output: 'Spam (Binary: 1)' },
        { paradigm: 'Classical Logistic Regression', input: 'Term Frequency Vector x', processing: 'P = sigmoid(0.85*x_free + 0.65*x_deal - 1.2)', output: 'P(Spam) = 0.91' },
        { paradigm: 'Generative Foundation Model', input: 'Full raw email string', processing: 'Autoregressive reasoning prompt', output: '"Phishing attempt impersonating bank HR"' },
      ],
      calculations: [
        {
          step: 'Compute Logistic Regression Log-Odds',
          math: 'z = w_1 \\cdot x_1 + w_2 \\cdot x_2 + b = (0.85)(1) + (0.65)(1) - 1.20 = 0.30',
          result: 'z = 0.30',
        },
        {
          step: 'Evaluate Sigmoid Probability',
          math: '\\sigma(0.30) = \\frac{1}{1 + e^{-0.30}} = \\frac{1}{1 + 0.7408} = 0.574',
          result: '57.4% Spam Probability',
        },
      ],
      finalConclusion:
        'Heuristic rules are brittle to typos ("FR33"); classical ML evaluates weighted statistical co-occurrences; Generative AI analyzes contextual intent and adversarial spoofing.',
    },
    visualExplanation: {
      title: 'The AI Taxonomy Venn Diagram & Decision Flow',
      description:
        'Visualizing the four concentric rings of artificial intelligence and the practical engineering decision tree for model selection.',
      features: [
        'Outer Ring: Artificial Intelligence — Heuristic systems, symbolic search, constraint satisfaction, and expert rule engines.',
        'Second Ring: Machine Learning — Supervised regression, classification, random forests, SVMs, and unsupervised clustering.',
        'Third Ring: Deep Learning — Convolutional networks (CNNs), recurrent nets (RNN/LSTM), and transformer encoder-decoders.',
        'Core Ring: Generative AI — Large language models (LLMs), diffusion image generators, and autoregressive multi-modal foundation models.',
      ],
    },
    scratchCode: {
      title: 'Python Paradigm Comparator: Rule vs ML vs Deep Model Logic',
      code: `import numpy as np

# 1. Paradigm 1: Symbolic / Rule-Based System
def rule_based_spam_filter(email_text: str, link_count: int) -> str:
    spam_triggers = ["winner", "free cash", "wire transfer", "urgent action"]
    text_lower = email_text.lower()
    for trigger in spam_triggers:
        if trigger in text_lower and link_count >= 2:
            return "SPAM (Matched rule: trigger keyword + multiple links)"
    return "HAM (No rule violated)"

# 2. Paradigm 2: Classical Machine Learning (Logistic Regression scoring)
def statistical_ml_predict(features: np.ndarray, weights: np.ndarray, bias: float) -> float:
    # Logistic link function: sigma(w^T x + b)
    log_odds = np.dot(features, weights) + bias
    prob = 1.0 / (1.0 + np.exp(-log_odds))
    return float(prob)

# 3. Paradigm 3: Deep Representation (2-Layer Neural Forward Pass)
def deep_neural_representation(x: np.ndarray, W1: np.ndarray, b1: np.ndarray, W2: np.ndarray, b2: np.ndarray):
    # Layer 1: Dense + ReLU activation (feature extraction)
    z1 = np.dot(W1, x) + b1
    h1 = np.maximum(0, z1)
    # Layer 2: Output projection
    z2 = np.dot(W2, h1) + b2
    prob = 1.0 / (1.0 + np.exp(-z2))
    return prob

print("Paradigm Comparison Execution:")
print("Rule:", rule_based_spam_filter("Urgent action: claim your free cash now!", link_count=3))

sample_features = np.array([2.5, 1.2, 0.4])  # e.g., TF-IDF word frequencies
sample_weights = np.array([0.7, 0.9, -0.3])
prob_ml = statistical_ml_predict(sample_features, sample_weights, bias=-0.5)
print(f"Classical ML Probability: {prob_ml:.4f}")
`,
      explanation:
        'Contrasts hand-written procedural rules with statistical dot-product scoring and multi-layer neural feature propagation.',
    },
    sklearnCode: {
      title: 'Practical Scikit-Learn Model Paradigm Selection',
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# Demonstrating classical tabular ML setup
corpus = [
    "Wire transfer required urgently for account verification",
    "Team sprint planning agenda for Thursday afternoon",
    "Free lottery cash prize winner claim details inside",
    "Quarterly revenue projections and financial report"
]
labels = np.array([1, 0, 1, 0])  # 1 = Spam, 0 = Ham

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(corpus)

clf = LogisticRegression()
clf.fit(X, labels)

test_email = ["Urgent wire transfer cash claim"]
X_test = vectorizer.transform(test_email)
pred_prob = clf.predict_proba(X_test)[0][1]

print(f"Scikit-Learn Classical ML Prediction: {pred_prob:.4f}")
`,
      explanation:
        'Scikit-learn handles classical statistical machine learning using explicit feature extraction (TF-IDF) and linear loss optimization.',
    },
    runnableCode: {
      code: `def decide_ai_paradigm(task_type: str, dataset_size: int, structured_data: bool):
    """
    Engineering Decision Matrix: When to choose Rules, ML, Deep Learning, or GenAI.
    """
    if task_type == "deterministic_rules" or dataset_size < 50:
        return "PARADIGM: Symbolic Rules / Heuristics (Deterministic business logic)"
    elif structured_data and dataset_size >= 100:
        return "PARADIGM: Classical Machine Learning (XGBoost / Logistic Regression / Random Forest)"
    elif not structured_data and dataset_size > 10000:
        return "PARADIGM: Deep Learning (Custom PyTorch CNN / Transformer from scratch)"
    else:
        return "PARADIGM: Generative AI & Foundation Models (Zero-shot / Few-shot prompt engineering or fine-tuning)"

print("Test Case 1 (Credit score tabular decision):", decide_ai_paradigm("classification", 50000, True))
print("Test Case 2 (Medical image segmentation):", decide_ai_paradigm("vision", 25000, False))
print("Test Case 3 (Customer support chat answering):", decide_ai_paradigm("dialogue", 200, False))
`,
      expectedOutput: `Test Case 1 (Credit score tabular decision): PARADIGM: Classical Machine Learning (XGBoost / Logistic Regression / Random Forest)
Test Case 2 (Medical image segmentation): PARADIGM: Deep Learning (Custom PyTorch CNN / Transformer from scratch)
Test Case 3 (Customer support chat answering): PARADIGM: Generative AI & Foundation Models (Zero-shot / Few-shot prompt engineering or fine-tuning)`,
    },
    lineByLineExplanation: [
      {
        lines: '1-6',
        codeSnippet: 'def decide_ai_paradigm(task_type: str, dataset_size: int, structured_data: bool):',
        explanation: 'Defines diagnostic logic mapping project requirements to the mathematically appropriate AI subsystem.',
      },
      {
        lines: '7-9',
        codeSnippet: 'if task_type == "deterministic_rules" or dataset_size < 50: return "Symbolic Rules"',
        explanation: 'Avoids complex statistical models when sample size is insufficient or rules are strictly statutory.',
      },
      {
        lines: '10-12',
        codeSnippet: 'elif structured_data and dataset_size >= 100: return "Classical ML"',
        explanation: 'Tabular data with clear tabular columns is almost always best solved with XGBoost or Random Forests rather than heavy neural nets.',
      },
      {
        lines: '13-16',
        codeSnippet: 'else: return "Generative AI & Foundation Models"',
        explanation: 'Complex linguistic and creative tasks with unstructured tokens leverage pretrained foundation model weights.',
      },
    ],
    hyperparameters: [
      {
        name: 'Model Complexity Budget',
        defaultVal: 'Classical ML',
        range: 'Rule -> Classical ML -> Deep Neural Net -> 70B LLM',
        effect: 'Higher complexity increases latency, training compute, and VRAM memory footprint.',
        recommendation: 'Always establish a linear or boosted tree baseline before deploying deep or generative models.',
      },
    ],
    assumptions: [
      {
        assumption: 'Data Distribution Consistency (IID)',
        whyItMatters: 'Machine Learning algorithms assume training data samples are independently and identically distributed.',
        howToVerify: 'Perform Population Stability Index (PSI) and Kolmogorov-Smirnov distribution checks between train and test splits.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using an LLM for structured tabular numerical prediction',
        solution: 'Use Gradient Boosted Decision Trees (XGBoost / LightGBM) or Logistic Regression for tabular spreadsheets.',
        whyWrong: 'LLMs are token autoregressive sequence models and suffer from numerical hallucination and massive inference latency on tabular rows.',
        howToFix: 'Convert the CSV into numerical NumPy/Pandas matrices and train a scikit-learn or XGBoost pipeline.',
      },
      {
        mistake: 'Assuming Deep Learning always beats Classical ML',
        solution: 'Deep learning requires tens of thousands of samples to avoid severe overfitting on low-dimensional data.',
        whyWrong: 'Without vast data or pretraining, deep neural nets with millions of parameters memorize noise.',
        howToFix: 'Benchmark Random Forest or Ridge regression before attempting a multi-layer neural network.',
      },
    ],
    realWorldUseCases: [
      {
        industry: 'FinTech & Banking',
        application: 'Fraud Detection & Loan Underwriting',
        benefit: 'Combines deterministic regulatory compliance rules with classical ML credit scoring and GenAI summary reports.',
      },
      {
        industry: 'Healthcare & Diagnostics',
        application: 'Medical Imaging & Clinical Documentation',
        benefit: 'Deep CNNs detect radiological anomalies in X-rays while GenAI draft discharge summaries for clinical review.',
      },
    ],
    practiceQuestions: [
      {
        id: 'p0-q1',
        question: 'Which statement accurately describes the hierarchical relationship between AI, ML, DL, and GenAI?',
        hint: 'Think of concentric Russian nesting dolls.',
        answer: 'Generative AI is a subset of Deep Learning, which is a subset of Machine Learning, which is a subset of AI.',
        explanation:
          'All Generative AI models (e.g. GPT-4, Stable Diffusion) are deep neural networks. All deep learning is machine learning based on data optimization, and machine learning is a branch of artificial intelligence.',
      },
      {
        id: 'p0-q2',
        question: 'When should an engineer prefer classical Machine Learning (e.g., XGBoost) over a large generative foundation model?',
        hint: 'Consider tabular business records with 20 numerical columns.',
        answer: 'When analyzing structured tabular datasets with fixed schemas, numerical metrics, and strict millisecond latency requirements.',
        explanation:
          'Tabular features are natively handled by decision trees with minimal compute, zero token costs, and high explainability.',
      },
    ],
    quiz: [
      {
        id: 'p0-quiz-1',
        question: 'What fundamentally distinguishes Machine Learning from classical Rule-Based Artificial Intelligence?',
        options: [
          'Machine Learning models execute faster on CPU than if-else statements.',
          'Machine Learning induces decision boundaries and weights from data via optimization, whereas rule-based systems execute pre-written human logic.',
          'Machine Learning requires cloud GPU servers, while classical AI runs only on local hardware.',
          'Machine Learning only works with natural language text, while classical AI works with numbers.',
        ],
        correctIndex: 1,
        explanation:
          'The defining hallmark of ML is that parameters are learned automatically by minimizing an objective function over empirical training data.',
      },
      {
        id: 'p0-quiz-2',
        question: 'Why did Deep Learning largely replace classical ML in computer vision and speech recognition?',
        options: [
          'Because deep learning eliminated the need for manual feature engineering by learning hierarchical representations directly from raw pixels and signals.',
          'Because classical ML algorithms cannot compute derivatives.',
          'Because deep neural networks never overfit regardless of dataset size.',
          'Because image pixels are strictly tabular categorical features.',
        ],
        correctIndex: 0,
        explanation:
          'Before deep learning, vision engineers spent months designing manual SIFT and HOG feature extractors. Deep neural networks learn edge, texture, and object detectors end-to-end.',
      },
      {
        id: 'p0-quiz-3',
        question: 'What is the primary training objective of modern autoregressive Generative AI language models?',
        options: [
          'Inverting large covariance matrices using Singular Value Decomposition.',
          'Minimizing cross-entropy loss by predicting the next token in a sequence given the previous context tokens.',
          'Maximizing the margin hyperplane separating two discrete binary classes.',
          'Clustering unstructured documents into K distinct geometric centroids.',
        ],
        correctIndex: 1,
        explanation:
          'Autoregressive foundation models maximize the log-likelihood of real token sequences by repeatedly predicting token x_t conditioned on context x_<t.',
      },
    ],
    independentExercise: {
      title: 'Design an AI Paradigm Selection Architecture',
      problem:
        'Write a Python function `recommend_architecture(problem_spec)` that takes a dictionary containing `{"data_type": str, "sample_count": int, "interpretability_required": bool}` and returns the optimal paradigm with a concrete technical justification.',
      hints: [
        'If interpretability_required is True and data_type is "tabular", recommend Linear/Logistic Regression or Decision Trees.',
        'If data_type is "image" or "audio" and sample_count > 5000, recommend Deep Learning (PyTorch CNN/ResNet).',
        'If data_type is "free_text_reasoning", recommend Generative AI / LLM APIs.',
      ],
      starterCode: `def recommend_architecture(problem_spec: dict) -> dict:
    # TODO: Implement architectural decision logic
    pass

# Test input
spec = {"data_type": "tabular", "sample_count": 25000, "interpretability_required": True}
print(recommend_architecture(spec))
`,
      solution: `def recommend_architecture(problem_spec: dict) -> dict:
    data_type = problem_spec.get("data_type", "tabular")
    samples = problem_spec.get("sample_count", 0)
    interpretability = problem_spec.get("interpretability_required", False)

    if interpretability and data_type == "tabular":
        return {
            "paradigm": "Classical Statistical Machine Learning",
            "recommended_model": "Logistic Regression or Shallow Decision Tree",
            "justification": "Provides direct feature coefficients and odds ratios mandated by compliance."
        }
    elif data_type == "tabular":
        return {
            "paradigm": "Classical Ensembles (ML)",
            "recommended_model": "XGBoost / LightGBM",
            "justification": "State-of-the-art accuracy on tabular rows without neural training overhead."
        }
    elif data_type in ["image", "video", "audio"]:
        return {
            "paradigm": "Deep Learning",
            "recommended_model": "PyTorch Convolutional or Vision Transformer Network",
            "justification": "Learns hierarchical spatial representations directly from raw multi-channel tensors."
        }
    else:
        return {
            "paradigm": "Generative AI & Foundation Models",
            "recommended_model": "Pretrained LLM with RAG",
            "justification": "Handles open-ended token reasoning and natural language synthesis."
        }
`,
    },
    summary: {
      keyTakeaways: [
        'AI is the broad science of simulating intelligence; ML is data-driven optimization; DL is multi-layer representation learning; GenAI is autoregressive token synthesis.',
        'Never deploy a deep neural network or LLM when a classical scikit-learn model solves the business problem with lower latency and zero hallucination.',
        'Deep learning thrives on high-dimensional unstructured data (vision, audio); classical ML dominates structured tabular business tables.',
        'Generative models learn conditional token distributions P(x_t | x_<t) at internet scale, unlocking zero-shot linguistic reasoning.',
      ],
      nextLessonId: 'p0-platform-mastery',
      nextLessonTitle: 'Module 0.2: How to Use This Learning Platform',
      nextLessonModuleId: 'phase-0-mod-2',
    },
  },
};

// =========================================================================
// MODULE 0.2: How to Use This Learning Platform
// =========================================================================
export const phase0Mod2Data: ModuleData = {
  id: 'phase-0-mod-2',
  number: 0.2,
  title: 'How to Use This Learning Platform',
  subtitle: 'Mastering Interactive Visualizers, In-Browser Pyodide Execution & Pedagogical Workflows',
  description:
    'Maximize your learning velocity on the Complete AI & ML Academy platform. Learn to manipulate interactive visualizer parameters, execute real Python code inside your browser via WebAssembly Pyodide, utilize AI Tutor guidance, and track roadmap progress.',
  icon: 'Sparkles',
  badge: 'Phase 0 · Orientation',
  estimatedHours: 1,
  topicsCount: 1,
  lessons: [
    {
      id: 'p0-platform-mastery',
      moduleId: 'phase-0-mod-2',
      title: 'Platform Mastery: Visualizers, Code Lab & In-Browser Execution',
      description:
        'Step-by-step orientation on using interactive visualizer sliders, WebAssembly Python execution, checkpoint quizzes, and personalized AI tutoring.',
      order: 1,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
  ],
};

export const p0Mod2Lessons: Record<string, LessonContent> = {
  'p0-platform-mastery': {
    id: 'p0-platform-mastery',
    moduleId: 'phase-0-mod-2',
    title: 'Platform Mastery: Visualizers, Code Lab & In-Browser Execution',
    subtitle: 'Navigating Interactive Tools, Zero-Install Pyodide Runtimes & Milestone Tracking',
    order: 1,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Navigate the 20-section textbook layout efficiently to balance intuition, derivations, code, and active recall.',
      'Control interactive parameter visualizers to build geometric intuition before writing code.',
      'Execute and debug Python code locally in-browser with zero installation using WebAssembly Pyodide.',
      'Leverage checkpoint quizzes, self-assessment checklists, and the contextual AI Tutor for rapid concept reinforcement.',
    ],
    prerequisites: ['Phase 0.1: Taxonomy of AI, ML, Deep Learning & Generative AI.'],
    previousLesson: {
      id: 'p0-ai-ml-hierarchy',
      title: 'Module 0.1: Taxonomy of AI',
      moduleId: 'phase-0-mod-1',
    },
    analogy: {
      title: 'The Flight Simulator for Machine Learning',
      text: 'Imagine learning to pilot an aircraft. Reading aerodynamic formulas in a static manual gives you equations, but sitting inside a six-axis flight simulator lets you adjust the throttle, feel turbulence, pull out of a stall, and observe the instrument cluster in real time. The Complete AI & ML Academy is your machine learning flight simulator: instead of passively memorizing formulas like gradient descent or attention projections, you slide the learning rate dial, watch cost trajectories diverge or converge on the live 3D surface, test code hypotheses in the local sandbox, and verify your mental models through immediate active recall checkpoints.',
      metaphor: 'Passive textbook reading is like looking at a blueprint of an engine; this platform is like operating an interactive cutaway engine with live instrumentation and wrench access.',
    },
    problemSolved: {
      title: 'Overcoming the "Tutorial Hell" Passive Learning Gap',
      description:
        'Most programming tutorials produce an illusion of competence: learners watch videos or read pre-baked code snippets without actively manipulating parameters or deriving foundations. When tasked with real-world problems, they struggle to debug diverging losses or choose correct hyperparameters.',
      keyPoints: [
        'Active manipulation of visual parameters builds geometric intuition that formulas alone cannot convey.',
        'Local in-browser code execution eliminates environment configuration friction while providing real error tracebacks.',
        '20 structured pedagogical sections per topic ensure comprehensive coverage: from real-world analogies to mathematical derivations, code from scratch, and interview cheat sheets.',
        'Zero setup required: all progress, bookmarks, and code modifications persist directly in your browser storage.',
      ],
    },
    intuition: {
      overview:
        'Every lesson across the 12 platform phases adheres to a consistent 20-part textbook anatomy engineered for deep long-term conceptual retention.',
      steps: [
        {
          step: 1,
          title: 'Sections A - C: Intuitive Foundation & Analogy',
          description:
            'Start with accessible conceptual framing: real-world analogies, problem justification, and plain-English mechanics.',
        },
        {
          step: 2,
          title: 'Sections D - E: Interactive Visualizers & Animations',
          description:
            'Interact with dynamic SVG visualizers, adjusting hyperparameters (learning rates, cluster counts, thresholds) to observe instant graphical feedback.',
        },
        {
          step: 3,
          title: 'Sections F - G: Mathematical Rigor & Derivation Steps',
          description:
            'Inspect step-by-step mathematical proofs with every variable formally defined, followed by a hand-calculated numerical example.',
        },
        {
          step: 4,
          title: 'Sections H - L: Python Implementation & Code Lab',
          description:
            'Study pure NumPy implementations from scratch alongside industrial Scikit-Learn/PyTorch equivalents with line-by-line commentary.',
        },
        {
          step: 5,
          title: 'Sections M - P: Active Practice, Quizzes & 60-Second Cheat Sheets',
          description:
            'Test your mastery with interactive MCQs, self-assessment checklists, and interview-ready summary revision notes.',
        },
      ],
    },
    mathematics: {
      overview:
        'Platform visualizers compute closed-form analytics or iterative gradient steps in real time directly within your browser thread.',
      foundations: [
        {
          name: 'Real-Time Loss Calculation in Visualizers',
          latex: 'J(\\mathbf{w}, b) = \\frac{1}{2m} \\sum_{i=1}^m \\left( (\\mathbf{w}^T \\mathbf{x}^{(i)} + b) - y^{(i)} \\right)^2',
          explanation:
            'As you drag the regression slope or intercept sliders in Section D visualizers, the Mean Squared Error surface recalculates at 60 frames per second.',
        },
        {
          name: 'Learning Rate Step Updates',
          latex: '\\theta_{t+1} = \\theta_t - \\alpha \\nabla J(\\theta_t)',
          explanation:
            'Dynamic trajectory animations illustrate how small alpha values produce slow monotonic descent while oversized alpha values cause oscillatory divergence.',
        },
      ],
    },
    derivation: {
      title: 'How WebAssembly Pyodide Executes Code in Your Browser',
      objective: 'Understand the in-browser execution architecture ensuring safety and zero-setup accessibility.',
      steps: [
        {
          step: 1,
          label: 'Browser WebAssembly Sandbox Initialization',
          latex: '\\text{Pyodide} \\xrightarrow{\\text{fetch}} \\text{CPython Core Compiled to } \\texttt{.wasm}',
          explanation:
            'Your browser loads the official CPython 3.11 interpreter compiled into WebAssembly bytecode, executing entirely inside an isolated memory sandbox.',
        },
        {
          step: 2,
          label: 'Preloaded Scientific Stack',
          latex: '\\text{Packages} = \\{\\texttt{numpy}, \\texttt{scipy}, \\texttt{pandas}, \\texttt{scikit-learn}\\}',
          explanation:
            'Native C extension packages are compiled with Emscripten, allowing vector operations and matrix math to execute near native C speed.',
        },
        {
          step: 3,
          label: 'Standard Output & Error Capture',
          latex: '\\texttt{sys.stdout} \\longrightarrow \\text{React State Buffer} \\longrightarrow \\text{UI Console}',
          explanation:
            'Python print statements and exception tracebacks are redirected directly into the CodeRunner console panel in real time.',
        },
      ],
    },
    variables: [
      { symbol: '\\alpha', name: 'Learning Rate', description: 'Step size multiplier for iterative gradient updates', dimensions: 'Scalar > 0' },
      { symbol: 'm', name: 'Sample Size', description: 'Number of training points rendered in interactive canvas', dimensions: 'Integer >= 1' },
    ],
    numericalExample: {
      scenario: 'Running a self-diagnostic Python script in the platform CodeRunner.',
      dataset: [
        { test: 'Array Creation', code: 'np.array([1, 2, 3])', status: 'PASS' },
        { test: 'Matrix Multiplication', code: 'np.dot(A, B)', status: 'PASS' },
        { test: 'Vectorized Mean', code: 'np.mean(arr)', status: 'PASS' },
      ],
      calculations: [
        {
          step: 'Compute Sample Mean',
          math: '\\mu = \\frac{1 + 2 + 3}{3} = 2.0',
          result: '2.0',
        },
      ],
      finalConclusion:
        'In-browser Pyodide confirms local NumPy execution is functioning properly with zero local installations needed.',
    },
    visualExplanation: {
      title: 'Platform Interface Navigation Architecture',
      description:
        'A functional breakdown of the Complete AI & ML Academy navigation system, visualizer controls, and learning tools.',
      features: [
        'Top Header: Quick links to Curriculum, DSA Lab, Python Lab, Java Lab, Revision Notes, and AI Tutor.',
        'Left Sidebar (or Quick Nav): One-click jump to any of the 20 textbook sections (A to M).',
        'Interactive Canvas: Sliders, draggable data points, step-by-step playback controls, and reset buttons.',
        'CodeRunner Console: Syntax-highlighted Monaco editor with Run, Reset, and Solution Reveal triggers.',
      ],
    },
    scratchCode: {
      title: 'Platform Verification Script (Runs via in-browser Pyodide)',
      code: `import sys
import numpy as np

def verify_platform_runtime():
    print(f"Python Version: {sys.version.split()[0]}")
    print(f"NumPy Version: {np.__version__}")
    
    # Verify linear algebra matrix operations
    A = np.array([[2, 1], [1, 3]])
    b = np.array([4, 5])
    x = np.linalg.solve(A, b)
    
    print(f"Matrix System Ax = b solved: x = {x}")
    print("✓ Platform Pyodide runtime is 100% operational!")
    return True

verify_platform_runtime()
`,
      explanation:
        'Executes in your browser via Pyodide to verify matrix computation support and standard output capture.',
    },
    sklearnCode: {
      title: 'Scikit-Learn Verification inside the Platform',
      code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Quick verification of scikit-learn inside browser
X = np.array([[1], [2], [3], [4]])
y = np.array([2.1, 3.9, 6.2, 8.1])

reg = LinearRegression().fit(X, y)
print(f"Fitted Slope: {reg.coef_[0]:.3f}, Intercept: {reg.intercept_:.3f}")
print("✓ Scikit-Learn bindings operational.")
`,
      explanation:
        'Demonstrates how scikit-learn models run natively inside the browser environment.',
    },
    runnableCode: {
      code: `def get_recommended_study_routine():
    return {
        "Step 1": "Read Section A-C for intuitive grasp and analogy.",
        "Step 2": "Interact with Section D visualizer for 5 minutes.",
        "Step 3": "Work through Section F math and derivation.",
        "Step 4": "Run and modify Python code in Section H.",
        "Step 5": "Complete Section L quiz to lock in memory."
    }

routine = get_recommended_study_routine()
for k, v in routine.items():
    print(f"{k}: {v}")
`,
      expectedOutput: `Step 1: Read Section A-C for intuitive grasp and analogy.
Step 2: Interact with Section D visualizer for 5 minutes.
Step 3: Work through Section F math and derivation.
Step 4: Run and modify Python code in Section H.
Step 5: Complete Section L quiz to lock in memory.`,
    },
    lineByLineExplanation: [
      {
        lines: '1-7',
        codeSnippet: 'def get_recommended_study_routine():',
        explanation: 'Encapsulates the five-step evidence-based study routine for technical retention.',
      },
      {
        lines: '8-10',
        codeSnippet: 'for k, v in routine.items(): print(f"{k}: {v}")',
        explanation: 'Iterates and prints the study blueprint.',
      },
    ],
    hyperparameters: [
      {
        name: 'Visualizer FPS Target',
        defaultVal: '60 FPS',
        range: '30 - 60 FPS',
        effect: 'Smoothness of animated parameter sliders.',
        recommendation: 'Rendered with hardware-accelerated CSS and SVG canvas transforms.',
      },
    ],
    assumptions: [
      {
        assumption: 'Modern Browser WebAssembly Support',
        whyItMatters: 'Pyodide requires WebAssembly (Wasm) support to execute Python code client-side.',
        howToVerify: 'Supported in all modern versions of Chrome, Firefox, Edge, and Safari.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Skipping the interactive visualizer and jumping straight to code',
        solution: 'Spend at least 3-5 minutes testing edge cases in the visualizer before inspecting code.',
        whyWrong: 'Code syntax without geometric intuition makes debugging mathematical failures much harder.',
        howToFix: 'Ask yourself: "What happens to the decision boundary if I add 5 outliers?" then test it on the canvas.',
      },
      {
        mistake: 'Viewing quiz questions without writing answers down',
        solution: 'Commit to an answer in your mind before clicking to check the explanation.',
        whyWrong: 'Immediate clicking triggers recognition bias rather than active retrieval practice.',
        howToFix: 'Pause, formulate your reasoning, and only then reveal the explanation.',
      },
    ],
    realWorldUseCases: [
      {
        industry: 'Self-Paced Machine Learning Engineering',
        application: 'Transitioning from Software Engineering to AI',
        benefit: 'Provides an end-to-end curriculum from linear algebra to distributed GPU serving in one coherent platform.',
      },
    ],
    practiceQuestions: [
      {
        id: 'p0-plat-q1',
        question: 'Where does the Python code in the interactive CodeRunner execute?',
        hint: 'Think about whether your code sends data to a remote server or runs locally.',
        answer: 'Directly inside your browser via WebAssembly (Pyodide), requiring zero remote server round-trips.',
        explanation:
          'Pyodide compiles the CPython runtime into WebAssembly, running securely in your local browser sandbox.',
      },
    ],
    quiz: [
      {
        id: 'p0-plat-quiz-1',
        question: 'What is the primary benefit of the 20-section textbook layout across every lesson?',
        options: [
          'It forces every lesson to look identical regardless of topic.',
          'It provides a structured, predictable multi-sensory progression from intuition and visuals to mathematical proofs, runnable code, and interview revision.',
          'It allows skipping mathematics completely.',
          'It reduces browser memory consumption.',
        ],
        correctIndex: 1,
        explanation:
          'Predictable pedagogical structure ensures you never encounter unexplained code without prior geometric intuition and mathematical derivation.',
      },
      {
        id: 'p0-plat-quiz-2',
        question: 'How is your learning progress (completed lessons, bookmarks, notes) stored on the platform?',
        options: [
          'Stored only in a temporary cookie that expires after 10 minutes.',
          'Automatically persisted in your local browser storage, with optional Supabase cloud synchronization when signed in.',
          'Written to a mandatory remote database that requires paid registration.',
          'Lost whenever the browser tab is refreshed.',
        ],
        correctIndex: 1,
        explanation:
          'The platform is built with a resilient offline-first local storage architecture that automatically syncs with Supabase when authenticated.',
      },
    ],
    independentExercise: {
      title: 'Run Your First Interactive Code Validation',
      problem:
        'Write a Python function `check_readiness(hours_per_week)` that returns the estimated weeks to complete the 12-phase curriculum assuming ~120 total study hours.',
      hints: ['weeks = 120 / hours_per_week'],
      starterCode: `def check_readiness(hours_per_week: float) -> str:
    # TODO: Calculate timeline
    pass

print(check_readiness(10))
`,
      solution: `def check_readiness(hours_per_week: float) -> str:
    total_hours = 120
    if hours_per_week <= 0:
        return "Please enter a positive weekly commitment."
    weeks = total_hours / hours_per_week
    return f"At {hours_per_week} hrs/week, you will complete the full 12-Phase curriculum in ~{weeks:.1f} weeks (~{weeks/4:.1f} months)."
`,
    },
    summary: {
      keyTakeaways: [
        'The platform combines 4 pillars: theoretical intuition, rigorous math, interactive visualizers, and runnable code.',
        'Code runs locally in your browser via WebAssembly Pyodide with zero installation or cloud latency.',
        'Progress, notes, and bookmarks automatically persist locally without mandatory account sign-up.',
        'Follow the 5-step study routine: Intuition -> Visualizer -> Mathematics -> Code -> Active Recall Quiz.',
      ],
      nextLessonId: 'p0-python-diagnostic',
      nextLessonTitle: 'Module 0.3: Python Prerequisite Assessment',
      nextLessonModuleId: 'phase-0-mod-3',
    },
  },
};

// =========================================================================
// MODULE 0.3: Python Prerequisite Assessment
// =========================================================================
export const phase0Mod3Data: ModuleData = {
  id: 'phase-0-mod-3',
  number: 0.3,
  title: 'Python Prerequisite Assessment',
  subtitle: 'Diagnostic Assessment of Control Flow, Data Structures, OOP & Functional Idioms',
  description:
    'Evaluate your Python fluency before diving into machine learning algorithms. Test your mastery of list comprehensions, dictionary indexing, functions, object-oriented programming, and error handling.',
  icon: 'Terminal',
  badge: 'Phase 0 · Diagnostic',
  estimatedHours: 1,
  topicsCount: 1,
  lessons: [
    {
      id: 'p0-python-diagnostic',
      moduleId: 'phase-0-mod-3',
      title: 'Python Fluency Diagnostic: Data Structures, OOP & Idiomatic Coding',
      description:
        'Comprehensive diagnostic assessment testing list comprehensions, dictionary manipulation, closures, generator expressions, and classes needed for ML.',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
  ],
};

export const p0Mod3Lessons: Record<string, LessonContent> = {
  'p0-python-diagnostic': {
    id: 'p0-python-diagnostic',
    moduleId: 'phase-0-mod-3',
    title: 'Python Fluency Diagnostic: Data Structures, OOP & Idiomatic Coding',
    subtitle: 'Diagnostic Assessment of Essential Python Constructs for Data Science and Machine Learning',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Assess proficiency in core Python data structures: lists, sets, tuples, and dictionary hashing.',
      'Evaluate fluency with list/dictionary comprehensions and generator expressions for memory efficiency.',
      'Verify understanding of function parameter packing (*args, **kwargs), closures, and lambda expressions.',
      'Test object-oriented class design including dunder methods (__init__, __call__, __len__) essential for PyTorch modules.',
    ],
    prerequisites: ['Basic familiarization with Python syntax.'],
    previousLesson: {
      id: 'p0-platform-mastery',
      title: 'Module 0.2: How to Use This Learning Platform',
      moduleId: 'phase-0-mod-2',
    },
    analogy: {
      title: 'The Carpenter’s Tool Inspection',
      text: 'Before an artisan carpenter attempts to build a fine oak cabinet with dovetail joints and complex inlays, they do not start by cutting raw timber. First, they inspect their chisels for razor sharpness, check their squaring rulers for true 90-degree alignment, and ensure their saws are properly set. Python is the primary chisel and workbench of machine learning. If your understanding of list aliasing, dictionary lookups, or object references is blunt, you will spend hours debugging obscure Python syntax errors rather than focusing on mathematical gradients and loss landscapes.',
      metaphor: 'Python fluency is your sharp chisel; attempting machine learning without solid Python fundamentals is like carving hardwoods with a dull butter knife.',
    },
    problemSolved: {
      title: 'Diagnosing Hidden Python Gaps Before Algorithm Implementation',
      description:
        'Learners frequently confuse mathematical difficulties with Python language quirks (such as mutable default arguments, deep vs shallow copies, or generator exhaustion). This diagnostic pinpoints exactly where Python fluency needs reinforcement.',
      keyPoints: [
        'Distinguishing mutable types (lists, dicts, sets) from immutable types (tuples, strings, ints, floats).',
        'Understanding how list comprehensions provide vectorized syntax and C-level iteration performance.',
        'Using generator expressions to process streaming datasets without crashing RAM memory.',
        'Writing clean, modular object-oriented classes that mirror the design of scikit-learn estimators and PyTorch neural network modules.',
      ],
    },
    intuition: {
      overview:
        'Machine learning in Python relies on four core pillars: efficient data structure manipulation, functional transformations, object-oriented estimator interfaces, and vectorized idioms.',
      steps: [
        {
          step: 1,
          title: 'Data Structures & Time Complexity',
          description:
            'Lists provide O(1) indexed lookup and O(1) amortized append, but O(N) linear search. Dictionaries and sets use hash tables for average O(1) key lookups.',
        },
        {
          step: 2,
          title: 'Comprehensions & Functional Mapping',
          description:
            'List comprehensions [f(x) for x in seq if cond] provide clean, expressive data transformations executed directly in C bytecode.',
        },
        {
          step: 3,
          title: 'Functions as First-Class Citizens',
          description:
            'Functions can be passed as arguments (custom loss functions, evaluation callables) and return closures that encapsulate state.',
        },
        {
          step: 4,
          title: 'Object-Oriented Estimator Pattern',
          description:
            'The standard ML architecture revolves around classes exposing .fit(X, y) and .predict(X) methods with encapsulated learned state.',
        },
      ],
    },
    mathematics: {
      overview:
        'Computational time and space complexities dictate which Python constructs can scale to hundreds of thousands of data points.',
      foundations: [
        {
          name: 'Hash Table Lookup Complexity (Dictionaries & Sets)',
          latex: 'T_{\\text{lookup}} = \\mathcal{O}(1) \\quad \\text{average}, \\quad \\mathcal{O}(N) \\quad \\text{worst-case collision}',
          explanation:
            'Using a dictionary for label encoding or feature mapping provides constant-time key retrieval regardless of dataset size.',
        },
        {
          name: 'List Membership Search Complexity',
          latex: 'T_{\\text{contains}} = \\mathcal{O}(N)',
          explanation:
            'Checking "if item in my_list" requires scanning every element sequentially, causing catastrophic O(N^2) slowdowns in data loops.',
        },
      ],
    },
    derivation: {
      title: 'Memory Footprint: Generator vs Full List Allocation',
      objective: 'Analyze why generator expressions prevent out-of-memory (OOM) errors in large datasets.',
      steps: [
        {
          step: 1,
          label: 'Eager List Materialization',
          latex: '\\text{Memory}(\\text{List of } N \\text{ items}) = \\mathcal{O}(N) \\times \\text{sizeof(PyObject*)}',
          explanation:
            'Generating 10,000,000 float samples into a list allocates hundreds of megabytes of contiguous memory pointers upfront.',
        },
        {
          step: 2,
          label: 'Lazy Generator Stream Evaluation',
          latex: '\\text{Memory}(\\text{Generator Iterator}) = \\mathcal{O}(1)',
          explanation:
            'A generator yields one item at a time via the iterator protocol (__next__), maintaining a constant memory footprint of a few bytes regardless of N.',
        },
      ],
    },
    variables: [
      { symbol: 'N', name: 'Number of Samples', description: 'Total row count in dataset', dimensions: 'Integer >= 1' },
      { symbol: 'D', name: 'Feature Dimension', description: 'Number of input columns or attributes', dimensions: 'Integer >= 1' },
    ],
    numericalExample: {
      scenario: 'Benchmarking list search vs set lookup for 100,000 categorical feature tokens.',
      dataset: [
        { structure: 'List (Unordered)', operations: '100,000 string checks', time: '~12.4 seconds', complexity: 'O(N * M)' },
        { structure: 'Set (Hash Table)', operations: '100,000 hash checks', time: '~0.008 seconds', complexity: 'O(M)' },
      ],
      calculations: [
        {
          step: 'Compute Speedup Factor',
          math: '\\text{Speedup} = \\frac{12.4}{0.008} = 1,550\\times',
          result: '1,550x Faster',
        },
      ],
      finalConclusion:
        'Choosing the mathematically correct Python data structure delivers over 1,500x acceleration before writing a single line of ML code.',
    },
    visualExplanation: {
      title: 'Python Memory Model: References, Mutability & Class Anatomy',
      description:
        'Visualizing variable reference binding, mutable modification in-place, and standard scikit-learn estimator class structure.',
      features: [
        'Variable Binding: In Python, variables are names bound to memory objects, not memory slots containing values.',
        'List In-Place Mutation: Modifying a list passed into a function alters the caller’s original object unless copied.',
        'Estimator Lifecycle: Class instantiation __init__() sets hyperparameters; .fit() computes and saves learned attributes with trailing underscores (e.g. self.weights_).',
      ],
    },
    scratchCode: {
      title: 'Diagnostic Code: Testing Core Python Proficiency',
      code: `# Diagnostic 1: List Comprehension with Conditional Filtering
data = [12, -4, 0, 45, -19, 88, 102, -3]
positive_squares = [x**2 for x in data if x > 0]
print("1. Positive squares:", positive_squares)

# Diagnostic 2: Dictionary Comprehension & Frequency Mapping
labels = ["cat", "dog", "cat", "bird", "dog", "dog", "cat"]
freq_map = {item: labels.count(item) for item in set(labels)}
print("2. Label frequency map:", freq_map)

# Diagnostic 3: Generator Expression (Lazy Batching)
def batch_generator(dataset, batch_size=2):
    for i in range(0, len(dataset), batch_size):
        yield dataset[i:i + batch_size]

batches = list(batch_generator([10, 20, 30, 40, 50, 60], batch_size=2))
print("3. Mini-batches:", batches)
`,
      explanation:
        'Verifies list filtering, set deduplication, dictionary comprehension, and generator yielding.',
    },
    sklearnCode: {
      title: 'Building a Scikit-Learn Compatible Custom Estimator',
      code: `import numpy as np

class CustomMeanClassifier:
    """
    A custom classifier following the standard Scikit-Learn Estimator API.
    """
    def __init__(self, threshold: float = 0.5):
        self.threshold = threshold
        self.mean_ = None  # Learned state stored with trailing underscore
        
    def fit(self, X: np.ndarray, y: np.ndarray):
        # Learn empirical mean of positive class
        self.mean_ = float(np.mean(X[y == 1]))
        return self
        
    def predict(self, X: np.ndarray) -> np.ndarray:
        if self.mean_ is None:
            raise ValueError("Estimator not fitted yet! Call .fit() first.")
        return (X.flatten() > (self.mean_ * self.threshold)).astype(int)

# Quick verification
X_train = np.array([[1.0], [2.0], [5.0], [6.0]])
y_train = np.array([0, 0, 1, 1])

clf = CustomMeanClassifier(threshold=0.6)
clf.fit(X_train, y_train)
preds = clf.predict(np.array([[1.5], [4.5]]))
print("Fitted Model Predictions:", preds)
`,
      explanation:
        'Demonstrates how classes encapsulate parameters, fit data, and enforce input validation.',
    },
    runnableCode: {
      code: `def python_diagnostic_test():
    score = 0
    total = 3
    
    # Test 1: Comprehensions
    squares = [x*x for x in range(5) if x % 2 == 1]
    if squares == [1, 9]:
        score += 1
        
    # Test 2: Dict aggregation
    d = {'a': 10, 'b': 20}
    val = d.get('c', 0)
    if val == 0:
        score += 1
        
    # Test 3: Mutable default argument trap
    def append_item(val, target=None):
        if target is None:
            target = []
        target.append(val)
        return target
        
    t1 = append_item(1)
    t2 = append_item(2)
    if t1 == [1] and t2 == [2]:
        score += 1
        
    print(f"Diagnostic Test Score: {score}/{total} ({(score/total)*100:.0f}%)")
    if score == total:
        print("✓ Python fundamentals verified: Ready for Phase 1 Machine Learning!")
    else:
        print("Recommendation: Review the Python Mastery Lab module on functions & mutability.")

python_diagnostic_test()
`,
      expectedOutput: `Diagnostic Test Score: 3/3 (100%)
✓ Python fundamentals verified: Ready for Phase 1 Machine Learning!`,
    },
    lineByLineExplanation: [
      {
        lines: '1-4',
        codeSnippet: 'def python_diagnostic_test(): score = 0',
        explanation: 'Initializes the automated self-diagnostic scoring routine.',
      },
      {
        lines: '5-9',
        codeSnippet: 'squares = [x*x for x in range(5) if x % 2 == 1]',
        explanation: 'Evaluates odd numbers (1, 3) squared -> [1, 9].',
      },
      {
        lines: '14-22',
        codeSnippet: 'def append_item(val, target=None): if target is None: target = []',
        explanation: 'Demonstrates proper pattern to avoid Python mutable default argument memory bugs (def f(x, target=[]))',
      },
    ],
    hyperparameters: [
      {
        name: 'Batch Size',
        defaultVal: '32',
        range: '16 - 512',
        effect: 'Determines the slice size emitted by the data batch generator.',
        recommendation: 'Use powers of 2 for optimal GPU memory alignment.',
      },
    ],
    assumptions: [
      {
        assumption: 'Python 3.8+ Runtime',
        whyItMatters: 'Modern code leverages f-strings, type annotations, and walrus operators.',
        howToVerify: 'Verify python --version in your local terminal.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using mutable default arguments like def append_to(item, my_list=[]):',
        solution: 'Use def append_to(item, my_list=None): if my_list is None: my_list = []',
        whyWrong: 'In Python, default arguments are evaluated once at function definition time, sharing the same list across all function calls.',
        howToFix: 'Always use None as default sentinel for mutable containers.',
      },
      {
        mistake: 'Modifying a list while iterating over it',
        solution: 'Iterate over a copy using list[:] or create a new filtered list comprehension.',
        whyWrong: 'Removing elements shifts internal array indices, skipping subsequent elements unexpectedly.',
        howToFix: 'Use [item for item in items if keep(item)].',
      },
    ],
    realWorldUseCases: [
      {
        industry: 'Data Pipeline Engineering',
        application: 'ETL Batch Processing',
        benefit: 'Generator pipelines process multi-gigabyte log files without exhausting server RAM memory.',
      },
    ],
    practiceQuestions: [
      {
        id: 'p0-py-q1',
        question: 'What happens when two variables refer to the same list: a = [1, 2]; b = a; b.append(3)?',
        hint: 'Are lists in Python passed by value or by object reference?',
        answer: 'Both a and b will equal [1, 2, 3] because both variables point to the exact same list object in heap memory.',
        explanation:
          'Assignment in Python binds a reference. To create an independent copy, use b = a.copy() or b = list(a).',
      },
    ],
    quiz: [
      {
        id: 'p0-py-quiz-1',
        question: 'Which of the following is the most efficient way to look up whether a user ID exists in a collection of 500,000 users?',
        options: [
          'Store IDs in a sorted Python list and use: if user_id in user_list:',
          'Store IDs in a Python set and use: if user_id in user_set:',
          'Store IDs in a tuple and iterate through with a for loop.',
          'Append all IDs to a string and use string regex matching.',
        ],
        correctIndex: 1,
        explanation:
          'Python sets use underlying hash tables providing average O(1) constant-time membership lookups, whereas lists and tuples require O(N) sequential scans.',
      },
      {
        id: 'p0-py-quiz-2',
        question: 'What is the key advantage of a generator function using yield over a function that returns a complete list?',
        options: [
          'Generators execute multithreaded on all CPU cores automatically.',
          'Generators produce lazy stream evaluation, requiring O(1) memory regardless of how many millions of items are generated.',
          'Generators can only work with floating point numbers.',
          'Generators do not require the Python interpreter.',
        ],
        correctIndex: 1,
        explanation:
          'Generators yield elements on demand and do not materialize the entire collection in memory at once.',
      },
    ],
    independentExercise: {
      title: 'Implement a Dataset Shuffler & Batcher',
      problem:
        'Write a Python generator function `stream_batches(features, labels, batch_size=32)` that yields tuples of (feature_batch, label_batch).',
      hints: ['Use range(0, len(features), batch_size) to slice both lists consistently.'],
      starterCode: `def stream_batches(features: list, labels: list, batch_size: int = 32):
    # TODO: Implement batch generator
    pass

X = list(range(100))
y = [x % 2 for x in X]
for bx, by in stream_batches(X, y, batch_size=40):
    print("Batch size:", len(bx), "First element:", bx[0])
`,
      solution: `def stream_batches(features: list, labels: list, batch_size: int = 32):
    if len(features) != len(labels):
        raise ValueError("Features and labels must have identical length.")
    for i in range(0, len(features), batch_size):
        yield features[i:i + batch_size], labels[i:i + batch_size]
`,
    },
    summary: {
      keyTakeaways: [
        'Use sets or dictionaries when O(1) lookup speed is required; use lists for ordered sequential indexing.',
        'Beware of mutable default argument traps (target=None instead of target=[]).',
        'Generators yield streaming data one element at a time, protecting memory on large datasets.',
        'Scikit-learn and PyTorch architectures leverage object-oriented classes with clear encapsulation of learned state.',
      ],
      nextLessonId: 'p0-numpy-pandas-diagnostic',
      nextLessonTitle: 'Module 0.4: NumPy, Pandas & Data Handling Assessment',
      nextLessonModuleId: 'phase-0-mod-4',
    },
  },
};

