import { ModuleData, LessonContent } from '@/lib/types';

export const dlModule1Data: ModuleData = {
  id: 'dl-module-1',
  number: 1,
  title: 'Deep Learning Foundations & Signal Propagation',
  subtitle: 'From Biological Neurons to Non-Linear Multi-Layer Perceptrons',
  description:
    'Establish the bedrock of deep learning: transition from classical ML to representation learning, artificial neuron mechanics (weights, inputs, bias), the complete family of activation functions, loss landscapes, and vectorized forward propagation.',
  icon: 'Cpu',
  badge: 'Phase 3 · Deep Learning',
  estimatedHours: 12,
  topicsCount: 5,
  lessons: [
    {
      id: 'dl-01-intro',
      moduleId: 'dl-module-1',
      title: 'DL-01: Introduction to Deep Learning',
      description: 'AI vs ML vs Deep Learning, representation learning, universal approximation, and when neural networks outperform classical tabular algorithms.',
      order: 1,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'dl-02-neuron-fundamentals',
      moduleId: 'dl-module-1',
      title: 'DL-02: Neural Network Fundamentals',
      description: 'Single neuron anatomy: weighted sum z = ∑wᵢxᵢ + b, bias geometric intuition, multi-input dot products, and complete hand calculation.',
      order: 2,
      readTimeMinutes: 26,
      visualizerType: 'neuron-calculator',
      difficulty: 'Beginner',
    },
    {
      id: 'dl-03-activations',
      moduleId: 'dl-module-1',
      title: 'DL-03: Activation Functions',
      description: 'Step, Sigmoid, Tanh, ReLU, Leaky ReLU, GELU, and Softmax. Saturation dynamics, dying ReLUs, gradient flow, and output ranges.',
      order: 3,
      readTimeMinutes: 28,
      visualizerType: 'activation-explorer',
      difficulty: 'Beginner',
    },
    {
      id: 'dl-04-loss-functions',
      moduleId: 'dl-module-1',
      title: 'DL-04: Loss Functions for Deep Learning',
      description: 'MSE, MAE, Binary Cross-Entropy, Categorical Cross-Entropy, and Focal Loss. Log-likelihood maximization and penalty curves.',
      order: 4,
      readTimeMinutes: 26,
      visualizerType: 'loss-explorer',
      difficulty: 'Intermediate',
    },
    {
      id: 'dl-05-forward-propagation',
      moduleId: 'dl-module-1',
      title: 'DL-05: Forward Propagation',
      description: 'Vectorized layer-by-layer computation: input tensors, weight matrices W⁽ˡ⁾, bias vectors b⁽ˡ⁾, activation caches, and end-to-end forward pass.',
      order: 5,
      readTimeMinutes: 30,
      visualizerType: 'forward-prop-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

export const dlModule1Lessons: Record<string, LessonContent> = {
  'dl-01-intro': {
    id: 'dl-01-intro',
    moduleId: 'dl-module-1',
    title: 'DL-01: Introduction to Deep Learning',
    subtitle: 'From Feature Engineering to Hierarchical Representation Learning',
    order: 1,
    readTimeMinutes: 24,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Articulate the precise boundary separating AI, Machine Learning, and Deep Learning',
      'Explain representation learning and why deep networks bypass manual hand-crafted feature extraction',
      'Identify the exact threshold where Deep Learning surpasses classical algorithms (e.g. data scale vs performance)',
      'Know when Deep Learning is overkill and classical models (XGBoost, Logistic Regression) should be chosen instead',
    ],
    prerequisites: ['Python syntax', 'Basic linear algebra vectors', 'Supervised learning concepts'],
    analogy: {
      title: 'The Master Artisan vs The Autonomous Assembly Line',
      text: 'In traditional machine learning, a human expert acts like a master artisan inspecting raw materials: you manually craft features like edge detectors, text frequencies, or ratio columns before feeding them to an algorithm. In Deep Learning, the network acts like an autonomous factory: raw signals (pixels, audio waveforms, token IDs) enter the first layer, which automatically discovers simple edges; subsequent layers assemble edges into textures, shapes, and complex semantic objects without human intervention.',
      metaphor: 'Classical ML is hand-carving gears; Deep Learning is training a system to invent and machine its own gears layer by layer.',
    },
    problemSolved: {
      title: 'Why Classical ML Hits a Performance Ceiling',
      description: 'For decades, computer vision and natural language processing were bottlenecked by feature engineering: human engineers spent years designing SIFT, HOG, and n-gram extractors. Deep Learning solves the feature representation bottleneck by learning representations directly from raw perceptual data.',
      keyPoints: [
        'End-to-End Learning: Directly maps raw inputs X to targets Y without intermediary manual feature extractors.',
        'Hierarchical Feature Abstraction: Early layers learn low-level primitives (edges, phonemes); deep layers learn abstract semantics (faces, sentiment).',
        'Scalability with Big Data: Performance of classical algorithms plateaus quickly; deep neural networks scale monotonically as compute and dataset size increase.',
      ],
    },
    intuition: {
      overview: 'Deep learning succeeds because real-world data possesses compositional hierarchy. A sentence is made of words, words of morphemes, morphemes of characters. An image is made of objects, objects of parts, parts of edges. Deep neural networks mirror this exact natural compositional hierarchy.',
      steps: [
        { step: 1, title: 'Raw Ingestion', description: 'Tensors representing raw signals enter layer 0 with no feature engineering applied.' },
        { step: 2, title: 'Low-Level Synthesis', description: 'Layer 1 computes localized linear combinations and non-linearities, capturing gradients and edges.' },
        { step: 3, title: 'Part Assembly', description: 'Intermediate layers combine low-level primitives into motifs, textures, and structural contours.' },
        { step: 4, title: 'High-Level Semantics', description: 'Final hidden layers represent abstract entities (e.g. "dog", "fraudulent transaction", "positive review").' },
      ],
    },
    mathematics: {
      overview: 'A deep neural network is mathematically a composite function: f(x) = fₗ(fₗ₋₁( ... f₁(x; W₁) ... ; Wₗ₋₁); Wₗ). Each layer applies an affine linear transformation followed by a point-wise non-linear mapping.',
      foundations: [
        {
          name: 'Layer Composition',
          latex: 'h^{(l)} = \\sigma\\left( W^{(l)} h^{(l-1)} + b^{(l)} \\right)',
          explanation: 'h⁽ˡ⁾ is the hidden activation vector of layer l, W⁽ˡ⁾ is the weight matrix, b⁽ˡ⁾ is the bias vector, and σ is the non-linear activation function.',
        },
        {
          name: 'Universal Approximation Theorem',
          latex: '\\forall \\epsilon > 0, \\exists f_{NN}: \\sup_{x \\in K} |f(x) - f_{NN}(x)| < \\epsilon',
          explanation: 'A feedforward neural network with a single hidden layer and non-linear activation can approximate any continuous function on a compact domain K to arbitrary precision ε.',
        },
      ],
    },
    derivation: {
      title: 'Why Non-Linearity Is Mathematically Essential',
      objective: 'Prove that a multi-layer network with purely linear activations collapses into a trivial single-layer linear model.',
      steps: [
        {
          step: 1,
          label: 'Two-Layer Linear Network',
          latex: 'h^{(1)} = W^{(1)} x + b^{(1)}, \\quad \\hat{y} = W^{(2)} h^{(1)} + b^{(2)}',
          explanation: 'Consider two consecutive layers without any activation function σ(z).',
        },
        {
          step: 2,
          label: 'Direct Substitution',
          latex: '\\hat{y} = W^{(2)} (W^{(1)} x + b^{(1)}) + b^{(2)} = (W^{(2)} W^{(1)}) x + (W^{(2)} b^{(1)} + b^{(2)})',
          explanation: 'Substitute hidden representation h⁽¹⁾ into the output equation.',
        },
        {
          step: 3,
          label: 'Matrix Collapse to Single Linear Transformation',
          latex: 'W_{eff} = W^{(2)} W^{(1)}, \\quad b_{eff} = W^{(2)} b^{(1)} + b^{(2)} \\implies \\hat{y} = W_{eff} x + b_{eff}',
          explanation: 'Because matrix multiplication is associative and closed, 100 linear layers collapse into a single affine transformation. Non-linear activations are required to bend and warp feature space.',
        },
      ],
    },
    variables: [
      { symbol: 'x', name: 'Input Tensor', description: 'Raw input feature vector or multidimensional array', dimensions: '(N, D)' },
      { symbol: 'W', name: 'Weight Matrix', description: 'Trainable parameters scaling signal strength between layers', dimensions: '(D_out, D_in)' },
      { symbol: 'b', name: 'Bias Vector', description: 'Trainable offset shifting the activation threshold', dimensions: '(D_out,)' },
      { symbol: 'h', name: 'Hidden Activations', description: 'Intermediate internal representations of the network', dimensions: '(N, D_hidden)' },
    ],
    numericalExample: {
      scenario: 'Comparing parameter efficiency: Linear collapse vs non-linear transformation on a 2-feature input.',
      dataset: [
        { feature1: 2.0, feature2: -1.0, trueLabel: 1 },
      ],
      calculations: [
        { step: 'Layer 1 Linear Sum', math: 'z1 = [0.5, -0.2] · [2.0, -1.0] + 0.1 = 1.0 + 0.2 + 0.1', result: '1.30' },
        { step: 'Layer 1 ReLU Activation', math: 'h1 = max(0, 1.30)', result: '1.30' },
        { step: 'Layer 2 Output', math: 'y_hat = sigmoid(1.5 · 1.30 - 0.5) = sigmoid(1.45) = 1 / (1 + e^-1.45)', result: '0.8099' },
      ],
      finalConclusion: 'The network outputs an 81.0% confidence for the positive class by projecting inputs into an expressive feature space.',
    },
    visualExplanation: {
      title: 'The AI Spectrum: AI vs ML vs Deep Learning',
      description: 'Deep Learning is a specialized subset of Machine Learning characterized by layered representation learning, which itself is a subset of Artificial Intelligence.',
      features: [
        'Artificial Intelligence: Broad umbrella of machines mimicking human decision-making and logic.',
        'Machine Learning: Systems that learn predictive statistical models from data rather than hardcoded heuristics.',
        'Deep Learning: Multi-layered artificial neural networks extracting hierarchical representations directly from raw perceptual signals.',
      ],
    },
    scratchCode: {
      title: 'Demonstrating Linear Collapse vs Non-Linearity in Pure NumPy',
      code: `import numpy as np

# 1. Define synthetic batch of 3 samples with 2 features
X = np.array([[1.5, -0.5],
              [0.2,  1.8],
              [-1.0, 0.4]])

# 2. Random layer weights
W1 = np.array([[0.8, -0.5, 0.3],
               [-0.2, 0.9, -0.7]]) # 2x3
b1 = np.array([0.1, -0.2, 0.05])

W2 = np.array([[1.2],
               [-0.8],
               [0.5]]) # 3x1
b2 = np.array([0.15])

# Pure Linear (Collapses into 1 layer)
h_linear = X @ W1 + b1
y_linear = h_linear @ W2 + b2

# Equivalent Single Layer W_eff and b_eff
W_eff = W1 @ W2
b_eff = b1 @ W2 + b2
y_collapsed = X @ W_eff + b_eff

# Non-linear Network with ReLU
h_relu = np.maximum(0, X @ W1 + b1)
y_nonlinear = 1 / (1 + np.exp(-(h_relu @ W2 + b2)))

print("Linear output matches collapsed equivalent:", np.allclose(y_linear, y_collapsed))
print("Non-linear output probabilities:\\n", y_nonlinear)`,
      explanation: 'Verifies mathematically that without non-linear activation functions, deep networks mathematically collapse into a single matrix multiplication.',
    },
    sklearnCode: {
      title: 'Multi-Layer Perceptron (MLPClassifier) in Scikit-Learn',
      code: `from sklearn.neural_network import MLPClassifier
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

# Generate non-linearly separable two-moon synthetic dataset
X, y = make_moons(n_samples=500, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a 2-hidden layer neural network
mlp = MLPClassifier(hidden_layer_sizes=(16, 8), activation='relu',
                    max_iter=500, random_state=42)
mlp.fit(X_train, y_train)

acc = mlp.score(X_test, y_test)
print(f"MLP Test Accuracy on non-linear data: {acc:.4f}")`,
      explanation: 'Scikit-Learn MLPClassifier provides an accessible baseline for training small feedforward neural networks on tabular datasets.',
    },
    runnableCode: {
      code: `import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-np.clip(z, -15, 15)))

# Forward pass of a 2-layer network on 1 sample
x = np.array([0.8, -0.4])
W1 = np.array([[0.5, -0.6], [0.8, 0.3]]) # (2, 2)
b1 = np.array([0.1, -0.1])
W2 = np.array([1.2, -0.9])
b2 = 0.2

# Layer 1
z1 = x @ W1 + b1
a1 = np.maximum(0, z1) # ReLU

# Layer 2 (Output)
z2 = a1 @ W2 + b2
y_prob = sigmoid(z2)

print(f"Input: {x}")
print(f"Hidden pre-activation z1: {np.round(z1, 3)}")
print(f"Hidden activation a1 (ReLU): {np.round(a1, 3)}")
print(f"Output probability: {y_prob:.4f}")`,
      expectedOutput: 'Input: [ 0.8 -0.4]\nHidden pre-activation z1: [ 0.18 -0.6 ]\nHidden activation a1 (ReLU): [0.18 0.  ]\nOutput probability: 0.6025',
    },
    lineByLineExplanation: [
      { lines: '1-4', codeSnippet: 'def sigmoid(z): ... np.clip(z, -15, 15)', explanation: 'Numerically stable sigmoid preventing overflow errors in exp(-z).' },
      { lines: '6-9', codeSnippet: 'x = ... W1 = ... b1 = ...', explanation: 'Defines input vector and first layer weight matrix and bias vector.' },
      { lines: '12-13', codeSnippet: 'z1 = x @ W1 + b1; a1 = np.maximum(0, z1)', explanation: 'Calculates the linear combination and applies point-wise ReLU non-linearity.' },
      { lines: '16-17', codeSnippet: 'z2 = a1 @ W2 + b2; y_prob = sigmoid(z2)', explanation: 'Computes scalar output pre-activation and squashes with Sigmoid for binary probability.' },
    ],
    hyperparameters: [
      { name: 'hidden_layer_sizes', defaultVal: '(100,)', range: '(16,) to (1024, 512, 256)', effect: 'Controls representational capacity and depth of feature hierarchy', recommendation: 'Start small (e.g. 64, 32) and scale depth as dataset complexity dictates.' },
      { name: 'activation', defaultVal: 'relu', range: 'relu, tanh, logistic, gelu', effect: 'Determines gradient propagation dynamics and non-linear boundary shape', recommendation: 'Use ReLU or GELU for hidden layers; never use sigmoid in deep hidden layers.' },
    ],
    assumptions: [
      { assumption: 'Adequate Data Volume', whyItMatters: 'Deep networks possess millions of parameters and severely overfit small datasets without sufficient training samples or transfer learning.', howToVerify: 'Verify learning curves; if validation loss diverges from training loss early, data is insufficient or regularization is needed.' },
      { assumption: 'Non-Linear Manifold', whyItMatters: 'If true relationship is purely linear, logistic regression or ridge regression will outperform neural networks with faster training and full interpretability.', howToVerify: 'Benchmark a linear baseline first; if linear model achieves 95% metric, deep learning may be unnecessary overhead.' },
    ],
    commonMistakes: [
      { mistake: 'Using Deep Learning when XGBoost is better suited for tabular data', whyWrong: 'Tree ensembles (XGBoost, LightGBM) routinely outperform neural networks on tabular datasets with mixed numerical/categorical features and require 100x less tuning.', howToFix: 'Always establish an XGBoost baseline on tabular data before deploying a deep neural network.', solution: 'Use DL primarily for perceptual data (images, text, audio, graph structures).' },
      { mistake: 'Forgetting non-linear activation functions between layers', whyWrong: 'Without non-linearities, the multi-layer network mathematically collapses into a single linear regression model.', howToFix: 'Ensure every hidden linear transformation is wrapped in an activation like ReLU, GELU, or LeakyReLU.', solution: 'nn.Sequential(nn.Linear(...), nn.ReLU(), nn.Linear(...))' },
    ],
    realWorldUseCases: [
      { industry: 'Autonomous Vehicles', application: 'Perception and Path Planning', benefit: 'Deep convolutional and transformer networks process raw camera streams and LiDAR point clouds in real time.' },
      { industry: 'Healthcare', application: 'Radiology and Medical Imaging', benefit: 'Detects microscopic lesions and anomalies in MRI/CT scans with superhuman sensitivity.' },
      { industry: 'Customer Support', application: 'Conversational LLMs and Assistants', benefit: 'End-to-end understanding of user intent and multi-turn automated resolution.' },
    ],
    practiceQuestions: [
      { id: 'dl-q1', question: 'What mathematically happens to a 50-layer neural network if all activation functions are identity (linear)?', hint: 'Recall matrix multiplication associativity.', answer: 'The entire network collapses into a single linear transformation: W_eff = W50 · W49 ... W1.', explanation: 'Linear functions closed under composition cannot learn non-linear boundaries no matter how deep the network is.' },
      { id: 'dl-q2', question: 'Why does Deep Learning outperform classical ML when dataset size scales to millions of samples?', hint: 'Consider model capacity and representation learning limits.', answer: 'Deep networks have high representational capacity and automatically extract complex features that keep improving with more data, whereas hand-crafted features plateau.', explanation: 'Andrew Ng demonstrated that classical ML algorithms plateau at small-to-medium data sizes, whereas deep architectures scale continuously.' },
    ],
    quiz: [
      {
        id: 'dl01-qz1',
        question: 'Which of the following best defines Representation Learning in Deep Learning?',
        options: [
          'Manually selecting the top 10 features using statistical hypothesis testing',
          'The autonomous extraction of hierarchical feature representations directly from raw data',
          'Encoding text using one-hot categorical vectors only',
          'Translating Python code into C++ binaries for acceleration',
        ],
        correctIndex: 1,
        explanation: 'Representation learning refers to the system automatically discovering the representations needed for feature detection from raw data.',
      },
      {
        id: 'dl01-qz2',
        question: 'Under what condition should you prefer XGBoost or LightGBM over a Deep Neural Network?',
        options: [
          'When processing raw unstructured audio files',
          'When working on tabular datasets with structured relational columns and limited training samples',
          'When building a state-of-the-art vision model',
          'When translating language from English to French',
        ],
        correctIndex: 1,
        explanation: 'Tree-based ensembles consistently outperform neural networks on tabular datasets with less hyperparameter tuning and no data normalization requirements.',
      },
      {
        id: 'dl01-qz3',
        question: 'What is the primary implication of the Universal Approximation Theorem?',
        options: [
          'Neural networks can achieve 100% test accuracy on any dataset without overfitting',
          'A feedforward network with one non-linear hidden layer can approximate any continuous function to arbitrary precision',
          'Linear models are sufficient to solve all computer vision problems',
          'Deep networks do not require gradient descent optimization',
        ],
        correctIndex: 1,
        explanation: 'The theorem proves that neural networks are theoretically capable of representing any continuous mathematical relationship given sufficient hidden units.',
      },
    ],
    independentExercise: {
      id: 'dl01-ex',
      title: 'Verify Linear Collapse vs ReLU Activation',
      problem: 'Write a Python function `verify_collapse(W1, W2)` that calculates the effective single matrix W_eff = W1 @ W2, and verifies that for any input x, (x @ W1) @ W2 equals x @ W_eff.',
      hints: ['Use np.dot or the @ matrix multiplication operator.', 'Use np.allclose to handle floating-point precision comparisons.'],
      starterCode: `import numpy as np

def verify_collapse(W1, W2, x):
    # Calculate sequential linear pass
    # Calculate collapsed pass with W_eff = W1 @ W2
    # Return whether both results match
    pass

W1 = np.random.randn(4, 8)
W2 = np.random.randn(8, 2)
x = np.random.randn(3, 4)
`,
      solution: `import numpy as np

def verify_collapse(W1, W2, x):
    # Two-layer sequential linear pass
    y_seq = (x @ W1) @ W2
    # Collapsed single-layer pass
    W_eff = W1 @ W2
    y_collapsed = x @ W_eff
    return np.allclose(y_seq, y_collapsed)

W1 = np.random.randn(4, 8)
W2 = np.random.randn(8, 2)
x = np.random.randn(3, 4)
print("Matches collapsed:", verify_collapse(W1, W2, x))`,
    },
    summary: {
      keyTakeaways: [
        'Deep Learning eliminates manual feature engineering by learning hierarchical representations from raw signals.',
        'Non-linear activation functions are mathematically mandatory to prevent multi-layer networks from collapsing into single linear models.',
        'Choose Deep Learning for high-dimensional unstructured data (vision, language, audio); choose XGBoost/LightGBM for tabular business data.',
      ],
      nextLessonId: 'dl-02-neuron-fundamentals',
      nextLessonTitle: 'DL-02: Neural Network Fundamentals',
      nextLessonModuleId: 'dl-module-1',
    },
  },

  'dl-02-neuron-fundamentals': {
    id: 'dl-02-neuron-fundamentals',
    moduleId: 'dl-module-1',
    title: 'DL-02: Neural Network Fundamentals',
    subtitle: 'The Anatomy of an Artificial Neuron: Inputs, Weights, Bias & Activation',
    order: 2,
    readTimeMinutes: 26,
    difficulty: 'Beginner',
    visualizerType: 'neuron-calculator',
    objectives: [
      'Deconstruct an artificial neuron into its core mathematical components: inputs, weights, bias, summation, and activation',
      'Understand the geometric role of the bias term b as a decision boundary offset',
      'Solve a complete numerical forward pass through a single neuron by hand step by step',
      'Use the interactive Neuron Calculator to explore how changing inputs, weights, and bias affects output activation',
    ],
    prerequisites: ['DL-01: Introduction to Deep Learning', 'Vector dot products'],
    analogy: {
      title: 'The Loan Approval Committee Officer',
      text: 'Imagine a single credit officer deciding whether to approve a loan. She looks at three pieces of evidence: credit score (x₁), annual income (x₂), and debt ratio (x₃). But she weighs them differently: credit score is weighted heavily positive (w₁ = +0.8), debt ratio is weighted negatively (w₂ = -1.2), and income is moderately positive (w₃ = +0.5). Finally, bank policy has an institutional threshold or leniency (bias b = -0.5). She computes the overall case score z = ∑wᵢxᵢ + b. If the score is high, she stamps "Approved" with high probability via an activation function.',
      metaphor: 'Weights are the importance of evidence; bias is the baseline predisposition; activation is the final decision.',
    },
    problemSolved: {
      title: 'How to Quantify Evidence and Make Continuous Decisions',
      description: 'Single-variable threshold models cannot weigh contradictory evidence (e.g. high income but also high debt). The artificial neuron linearly combines multiple evidence signals and maps them smoothly onto a standardized range.',
      keyPoints: [
        'Weighted Summation: Measures alignment between the learned parameter pattern w and the incoming feature vector x.',
        'Bias Term: Decouples the decision boundary from passing strictly through the origin (0, 0).',
        'Non-Linear Squashing: Maps arbitrary unbounded real values z ∈ (-∞, ∞) into bounded decision probabilities a ∈ (0, 1).',
      ],
    },
    intuition: {
      overview: 'Every neuron performs two distinct operations: an affine linear projection z = w · x + b, followed by a non-linear activation a = σ(z).',
      steps: [
        { step: 1, title: 'Multiplication', description: 'Each input feature xᵢ is scaled by its corresponding connection weight wᵢ.' },
        { step: 2, title: 'Accumulation', description: 'All weighted signals are summed together: ∑ wᵢxᵢ.' },
        { step: 3, title: 'Bias Offset', description: 'The bias term b is added, shifting the threshold left or right along the axis.' },
        { step: 4, title: 'Activation', description: 'The scalar pre-activation z passes through non-linear function σ(z) to produce final activation a.' },
      ],
    },
    mathematics: {
      overview: 'The forward calculation of a single neuron with n inputs is formulated as a vector dot product plus scalar bias.',
      foundations: [
        {
          name: 'Linear Combination (Pre-activation)',
          latex: 'z = \\mathbf{w}^T \\mathbf{x} + b = \\sum_{i=1}^{n} w_i x_i + b',
          explanation: 'w is the (n x 1) weight vector, x is the (n x 1) input vector, and b is the scalar bias term.',
        },
        {
          name: 'Activated Output',
          latex: 'a = \\sigma(z) = \\sigma\\left(\\sum_{i=1}^{n} w_i x_i + b\\right)',
          explanation: 'σ represents the non-linear activation function mapping z onto a bounded activation value.',
        },
      ],
    },
    derivation: {
      title: 'Geometric Meaning of the Bias Term',
      objective: 'Prove why an artificial neuron without bias is constrained to pass through the origin.',
      steps: [
        {
          step: 1,
          label: 'Decision Boundary Definition',
          latex: 'z = w_1 x_1 + w_2 x_2 + b = 0',
          explanation: 'The decision boundary represents the hyperplane in feature space where the neuron is completely neutral (e.g. σ(0) = 0.5).',
        },
        {
          step: 2,
          label: 'Slope-Intercept Equation',
          latex: 'x_2 = -\\frac{w_1}{w_2} x_1 - \\frac{b}{w_2}',
          explanation: 'Rearranging into slope-intercept form shows the vertical intercept is directly governed by -b / w₂.',
        },
        {
          step: 3,
          label: 'Setting b = 0',
          latex: 'b = 0 \\implies x_2 = -\\frac{w_1}{w_2} x_1 \\implies (0, 0) \\text{ is always on boundary}',
          explanation: 'Without bias (b = 0), the boundary is forced to pass through the origin (0, 0), severely crippling the model if the true separation boundary lies elsewhere.',
        },
      ],
    },
    variables: [
      { symbol: 'x_i', name: 'Input Feature', description: 'Numerical input value from data or previous layer neuron', dimensions: 'Scalar' },
      { symbol: 'w_i', name: 'Synaptic Weight', description: 'Trainable scalar multiplier representing connection strength', dimensions: 'Scalar' },
      { symbol: 'b', name: 'Neuron Bias', description: 'Trainable threshold parameter shifting activation', dimensions: 'Scalar' },
      { symbol: 'z', name: 'Pre-Activation', description: 'Linear sum before activation function is applied', dimensions: 'Scalar' },
      { symbol: 'a', name: 'Post-Activation', description: 'Final output value transmitted to next layer', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Hand calculation of a neuron with 3 inputs and Sigmoid activation.',
      dataset: [
        { feature: 'x1 (Income)', value: 1.5, weight: 0.8 },
        { feature: 'x2 (Debt)', value: -0.5, weight: -1.2 },
        { feature: 'x3 (Credit)', value: 2.0, weight: 0.5 },
      ],
      calculations: [
        { step: 'Weight products', math: '(1.5)(0.8) + (-0.5)(-1.2) + (2.0)(0.5) = 1.2 + 0.6 + 1.0', result: '2.80' },
        { step: 'Add bias (b = -0.3)', math: 'z = 2.80 + (-0.3)', result: '2.50' },
        { step: 'Sigmoid activation', math: 'a = 1 / (1 + e^-2.50) = 1 / (1 + 0.08208)', result: '0.9241' },
      ],
      finalConclusion: 'The neuron outputs a = 0.9241 (92.4% confidence) indicating strong positive activation.',
    },
    visualExplanation: {
      title: 'Interactive Neuron Calculator',
      description: 'The interactive diagram above renders input nodes, connection line thickness proportional to weight magnitude, summation node z, and activation output a.',
      features: [
        'Blue edges indicate positive excitatory weights; red edges indicate negative inhibitory weights.',
        'Edge line thickness scales directly with absolute weight magnitude |w|.',
        'Summation node displays linear aggregate z; output node displays activated output a.',
      ],
    },
    scratchCode: {
      title: 'NumPy Vectorized Neuron Implementation',
      code: `import numpy as np

class ArtificialNeuron:
    def __init__(self, n_inputs, activation='sigmoid'):
        # Initialize weights and bias
        self.w = np.random.randn(n_inputs) * 0.1
        self.b = 0.0
        self.activation = activation
        
    def forward(self, x):
        # Linear combination: z = w · x + b
        self.z = np.dot(x, self.w) + self.b
        
        # Apply activation function
        if self.activation == 'sigmoid':
            self.a = 1.0 / (1.0 + np.exp(-np.clip(self.z, -15, 15)))
        elif self.activation == 'relu':
            self.a = np.maximum(0, self.z)
        elif self.activation == 'tanh':
            self.a = np.tanh(self.z)
        return self.a

neuron = ArtificialNeuron(n_inputs=3, activation='sigmoid')
neuron.w = np.array([0.8, -1.2, 0.5])
neuron.b = -0.3
x_sample = np.array([1.5, -0.5, 2.0])

output = neuron.forward(x_sample)
print(f"Pre-activation z: {neuron.z:.4f}")
print(f"Neuron Output a: {output:.4f}")`,
      explanation: 'Constructs an explicit ArtificialNeuron class showcasing dot-product aggregation and activation clipping for numerical safety.',
    },
    sklearnCode: {
      title: 'Single Neuron Perceptron in Scikit-Learn',
      code: `from sklearn.linear_model import Perceptron
import numpy as np

# Synthetic binary classification data
X = np.array([[1.0, 1.0], [2.0, 1.5], [-1.0, -1.0], [-2.0, -0.5]])
y = np.array([1, 1, 0, 0])

# Train single-layer perceptron
clf = Perceptron(tol=1e-3, random_state=42)
clf.fit(X, y)

print("Learned Weights (w):", clf.coef_)
print("Learned Bias (b):", clf.intercept_)
print("Predictions:", clf.predict(X))`,
      explanation: 'Scikit-Learn Perceptron implements Frank Rosenblatt’s historical single-neuron learning rule with linear threshold activation.',
    },
    runnableCode: {
      code: `import numpy as np

# Vectorized batch of 4 samples through a single neuron with 3 features
X_batch = np.array([
    [1.0, 2.0, 0.5],
    [0.0, -1.0, 2.0],
    [-2.0, 0.5, -1.0],
    [3.0, 1.0, -0.5]
]) # shape (4, 3)

weights = np.array([0.5, -0.8, 1.2]) # shape (3,)
bias = 0.25

# Matrix-vector product + broadcasted scalar bias
z_batch = X_batch @ weights + bias
a_batch = 1.0 / (1.0 + np.exp(-z_batch)) # Sigmoid

for i, (z, a) in enumerate(zip(z_batch, a_batch)):
    print(f"Sample {i+1}: z = {z:6.2f} -> a = {a:.4f}")`,
      expectedOutput: 'Sample 1: z =  -0.25 -> a = 0.4378\nSample 2: z =   3.45 -> a = 0.9692\nSample 3: z =  -2.35 -> a = 0.0871\nSample 4: z =   0.35 -> a = 0.5866',
    },
    lineByLineExplanation: [
      { lines: '2-8', codeSnippet: 'X_batch = np.array([...])', explanation: 'Creates a mini-batch matrix with 4 samples (rows) and 3 feature dimensions (columns).' },
      { lines: '10-11', codeSnippet: 'weights = ... bias = ...', explanation: 'Defines the single neuron parameter vector w and scalar bias b.' },
      { lines: '14', codeSnippet: 'z_batch = X_batch @ weights + bias', explanation: 'Computes all 4 linear combinations in a single SIMD-accelerated matrix-vector multiplication.' },
      { lines: '15', codeSnippet: 'a_batch = 1.0 / (1.0 + np.exp(-z_batch))', explanation: 'Broadcasting applies the non-linear sigmoid element-wise across the entire batch vector.' },
    ],
    hyperparameters: [
      { name: 'weight_initialization', defaultVal: 'standard normal', range: 'Normal(0, 0.01), Xavier, He', effect: 'Governs starting magnitude of weights and prevents initial saturation', recommendation: 'Never initialize weights to all zeros; use small random numbers.' },
      { name: 'bias_initialization', defaultVal: '0.0', range: '0.0 or 0.01', effect: 'Sets initial threshold offset', recommendation: 'Initializing bias to 0.0 is standard practice in almost all architectures.' },
    ],
    assumptions: [
      { assumption: 'Feature Scale Consistency', whyItMatters: 'If feature x₁ is in [0, 100000] and x₂ is in [0, 1], w₁ will be destabilized by gradient magnitudes.', howToVerify: 'Always normalize features (StandardScaler or MinMaxScaler) before feeding into neural network layers.' },
      { assumption: 'Independent Synaptic Inputs', whyItMatters: 'Highly collinear features cause unstable weight attribution, where infinite combinations of w₁ and w₂ yield identical z.', howToVerify: 'Inspect correlation matrices or use L2 regularization (weight decay).' },
    ],
    commonMistakes: [
      { mistake: 'Initializing all weights to 0.0', whyWrong: 'Symmetry problem: all neurons in a layer compute identical outputs and receive identical gradients, preventing feature specialization.', howToFix: 'Initialize weights with small random variance (e.g. He or Xavier initialization).', solution: 'W = np.random.randn(fan_in, fan_out) * np.sqrt(2.0 / fan_in)' },
      { mistake: 'Omitting the bias term', whyWrong: 'Forces the hyperplane decision boundary to pass directly through the origin (0, 0, ...), causing underfitting on off-center data.', howToFix: 'Always include bias in linear layer formulations: z = Wx + b.', solution: 'nn.Linear(in_features, out_features, bias=True)' },
    ],
    realWorldUseCases: [
      { industry: 'Ad Tech & Click-Through Rate', application: 'Logistic Regression Baseline', benefit: 'Single-neuron logistic units process billions of sparse ad impression features per second with microsecond latency.' },
      { industry: 'Finance', application: 'Loan Default Prediction', benefit: 'Calibrated Sigmoid output yields interpretable default probabilities suitable for regulatory credit audits.' },
      { industry: 'Sensor IoT', application: 'Embedded Anomaly Trigger', benefit: 'Ultra-low-power microcontrollers run single-neuron inference using integer arithmetic in microjoules of energy.' },
    ],
    practiceQuestions: [
      { id: 'dl02-q1', question: 'If a neuron has inputs [2, -1], weights [0.5, 2.0], bias 1.0, and ReLU activation, what is the output?', hint: 'Calculate z = (2)(0.5) + (-1)(2.0) + 1.0, then ReLU(z).', answer: 'a = 0.0. z = 1.0 - 2.0 + 1.0 = 0.0, and ReLU(0) = 0.', explanation: 'z is exactly zero, so ReLU outputs 0.' },
      { id: 'dl02-q2', question: 'Why does adding a bias term allow the neuron to represent functions that a weight-only neuron cannot?', hint: 'Think about where the decision boundary sits in coordinate space.', answer: 'Bias translates the decision hyperplane away from the origin without altering its orientation.', explanation: 'Weights rotate the boundary; bias shifts it in space.' },
    ],
    quiz: [
      {
        id: 'dl02-qz1',
        question: 'What is the mathematical equation for the linear pre-activation z of an artificial neuron?',
        options: [
          'z = σ(w · x)',
          'z = w · x + b',
          'z = (w + x) · b',
          'z = 1 / (1 + e^(-wx))',
        ],
        correctIndex: 1,
        explanation: 'The pre-activation z is the linear dot product of the weight vector and input vector plus the bias scalar: z = w · x + b.',
      },
      {
        id: 'dl02-qz2',
        question: 'If all weights in a layer are initialized to exactly zero, what happens during backpropagation?',
        options: [
          'The network trains twice as fast due to zero initialization',
          'Symmetry problem: all neurons calculate identical outputs and receive identical gradients, failing to learn distinct features',
          'The learning rate automatically increases to compensate',
          'The loss becomes negative immediately',
        ],
        correctIndex: 1,
        explanation: 'Zero initialization prevents symmetry breaking; every hidden neuron learns the exact same feature.',
      },
      {
        id: 'dl02-qz3',
        question: 'What is the output range of a neuron using the standard Sigmoid activation function?',
        options: [
          '[-1, 1]',
          '[0, ∞)',
          '(0, 1)',
          '(-∞, ∞)',
        ],
        correctIndex: 2,
        explanation: 'Sigmoid squashes any real number z into the open interval (0, 1), representing a valid probability distribution.',
      },
    ],
    independentExercise: {
      id: 'dl02-ex',
      title: 'Build a Single Neuron Forward Pass Function',
      problem: 'Write a Python function `neuron_forward(X, w, b, activation="sigmoid")` that computes the vectorized forward pass for a matrix of samples X (shape N x D), returning the vector of activations (shape N).',
      hints: ['Use X @ w to compute the dot product for all samples at once.', 'Add scalar b which NumPy broadcasts across all rows.'],
      starterCode: `import numpy as np

def neuron_forward(X, w, b, activation="sigmoid"):
    # Compute z for all samples
    # Apply selected activation ("sigmoid", "relu", "tanh")
    # Return output array
    pass

X = np.array([[1.0, 2.0], [-1.0, 1.0], [0.5, -0.5]])
w = np.array([0.4, -0.6])
b = 0.1
`,
      solution: `import numpy as np

def neuron_forward(X, w, b, activation="sigmoid"):
    z = X @ w + b
    if activation == "sigmoid":
        return 1.0 / (1.0 + np.exp(-np.clip(z, -15, 15)))
    elif activation == "relu":
        return np.maximum(0, z)
    elif activation == "tanh":
        return np.tanh(z)
    raise ValueError(f"Unknown activation: {activation}")

X = np.array([[1.0, 2.0], [-1.0, 1.0], [0.5, -0.5]])
w = np.array([0.4, -0.6])
b = 0.1
print("Activations:", neuron_forward(X, w, b, "sigmoid"))`,
    },
    summary: {
      keyTakeaways: [
        'An artificial neuron performs linear dot product aggregation z = w · x + b followed by non-linear activation a = σ(z).',
        'Weights rotate the orientation of the separating hyperplane; bias translates the boundary off the origin.',
        'Always break symmetry by initializing weights with small random distributions rather than zeros.',
      ],
      nextLessonId: 'dl-03-activations',
      nextLessonTitle: 'DL-03: Activation Functions',
      nextLessonModuleId: 'dl-module-1',
    },
  },

  'dl-03-activations': {
    id: 'dl-03-activations',
    moduleId: 'dl-module-1',
    title: 'DL-03: Activation Functions',
    subtitle: 'Step, Sigmoid, Tanh, ReLU, Leaky ReLU & GELU: Derivations & Dynamics',
    order: 3,
    readTimeMinutes: 28,
    difficulty: 'Beginner',
    visualizerType: 'activation-explorer',
    objectives: [
      'Compare mathematical formulas, ranges, and analytical derivatives for the 6 canonical activation functions',
      'Diagnose the Vanishing Gradient problem caused by Sigmoid and Tanh saturation',
      'Understand the Dying ReLU phenomenon and why Leaky ReLU, ELU, and GELU prevent dead neurons',
      'Select the optimal activation function for hidden layers vs output layers based on task requirements',
    ],
    prerequisites: ['DL-02: Neural Network Fundamentals', 'Calculus derivatives'],
    analogy: {
      title: 'The Volume Dial vs The Smart Gate',
      text: 'Think of activation functions as volume controllers on an audio mixing console. A simple step function is an on/off toggle switch: either mute or blaring noise, with no in-between. Sigmoid is an old analogue volume knob: smooth in the middle, but jammed at the extreme ends where turning the knob further changes virtually nothing (saturation). ReLU is a one-way security turnstile: completely blocks reverse movement (negative signals become 0), but lets forward movement pass through completely unattenuated.',
      metaphor: 'Activation functions are dynamic electrical valves that regulate both signal flow forward and learning gradients backward.',
    },
    problemSolved: {
      title: 'Overcoming the Vanishing Gradient & Saturation Bottlenecks',
      description: 'In the early 1990s, deep networks could not train beyond 3-4 layers because Sigmoid activations saturated: their maximum derivative is 0.25. When backpropagating through 5 layers, gradients shrank by 0.25⁵ ≈ 0.00097, stalling learning. Modern activations (ReLU, GELU) solved this mathematical bottleneck.',
      keyPoints: [
        'Non-Saturating Gradient: ReLU has derivative 1.0 for all positive inputs, allowing gradients to flow back through hundreds of layers without decay.',
        'Zero-Centered Outputs: Tanh improves on Sigmoid because its mean output is closer to zero, eliminating zigzag gradient updates.',
        'Smooth Probabilistic Gating: Modern GELU combines non-linearity with stochastic dropout intuition, adopted in Transformer models.',
      ],
    },
    intuition: {
      overview: 'Each activation function balances two competing properties: non-linear expressiveness (the ability to bend decision boundaries) and gradient conductivity (the ability to let backpropagation error signals flow unhindered).',
      steps: [
        { step: 1, title: 'Forward Mapping', description: 'Calculates the output amplitude for a given linear sum z.' },
        { step: 2, title: 'Derivative Calculation', description: 'Determines the local multiplier f\'(z) applied to incoming gradients during backpropagation.' },
        { step: 3, title: 'Gradient Flow Check', description: 'If f\'(z) ≈ 0, the neuron is in a saturated "dead zone" and cannot learn from errors.' },
        { step: 4, title: 'Layer Selection', description: 'Hidden layers prioritize non-saturating gradients (ReLU/GELU); output layers prioritize task semantics (Softmax for multi-class, Sigmoid for binary).' },
      ],
    },
    mathematics: {
      overview: 'Here are the exact analytical functions and their first-order derivatives utilized in automatic differentiation engines.',
      foundations: [
        {
          name: 'Sigmoid & Derivative',
          latex: '\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\sigma\'(z) = \\sigma(z)(1 - \\sigma(z)) \\le 0.25',
          explanation: 'Derivative reaches its absolute peak of 0.25 at z = 0, and rapidly vanishes towards 0 when |z| > 3.',
        },
        {
          name: 'Tanh & Derivative',
          latex: '\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}, \\quad \\tanh\'(z) = 1 - \\tanh^2(z) \\le 1.0',
          explanation: 'Zero-centered with range (-1, 1). Maximum gradient of 1.0 at z = 0, but still suffers from saturation for large |z|.',
        },
        {
          name: 'Rectified Linear Unit (ReLU)',
          latex: '\\text{ReLU}(z) = \\max(0, z), \\quad \\text{ReLU}\'(z) = \\begin{cases} 1 & z > 0 \\\\ 0 & z < 0 \\end{cases}',
          explanation: 'Derivative is constant 1.0 for positive inputs, eliminating vanishing gradients in active neurons.',
        },
        {
          name: 'Gaussian Error Linear Unit (GELU)',
          latex: '\\text{GELU}(z) = z \\cdot \\Phi(z) = z \\cdot P(X \\le z), \\quad X \\sim \\mathcal{N}(0, 1)',
          explanation: 'Smooth non-monotonic activation weighting inputs by their normal cumulative probability.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Sigmoid Derivative Shortcut',
      objective: 'Prove that the derivative of Sigmoid can be computed directly from its output: σ\'(z) = σ(z)(1 - σ(z)).',
      steps: [
        {
          step: 1,
          label: 'Express as Negative Exponent Power',
          latex: '\\sigma(z) = (1 + e^{-z})^{-1}',
          explanation: 'Rewrite fraction as power of -1 for standard power rule calculus.',
        },
        {
          step: 2,
          label: 'Apply Chain Rule',
          latex: '\\frac{d}{dz} \\sigma(z) = -1 (1 + e^{-z})^{-2} \\cdot \\frac{d}{dz}(1 + e^{-z}) = -(1 + e^{-z})^{-2} (-e^{-z}) = \\frac{e^{-z}}{(1 + e^{-z})^2}',
          explanation: 'Differentiate outer power function and multiply by internal derivative of e^-z.',
        },
        {
          step: 3,
          label: 'Algebraic Factorization',
          latex: '\\frac{e^{-z}}{(1 + e^{-z})^2} = \\frac{1}{1 + e^{-z}} \\cdot \\frac{e^{-z}}{1 + e^{-z}} = \\frac{1}{1 + e^{-z}} \\left(1 - \\frac{1}{1 + e^{-z}}\\right) = \\sigma(z)(1 - \\sigma(z))',
          explanation: 'The result depends only on σ(z), allowing frameworks to cache the forward activation and compute backward gradients in 1 operation without recalculating e^-z.',
        },
      ],
    },
    variables: [
      { symbol: 'z', name: 'Neuron Pre-Activation', description: 'Input value to the activation function', dimensions: 'Scalar or Tensor' },
      { symbol: 'f(z)', name: 'Activation Output', description: 'Squashed non-linear activation', dimensions: 'Scalar or Tensor' },
      { symbol: "f'(z)", name: 'First Derivative', description: 'Gradient multiplier during backpropagation', dimensions: 'Scalar or Tensor' },
      { symbol: 'α', name: 'Leak Coefficient', description: 'Small positive multiplier for negative inputs in Leaky ReLU', dimensions: 'Scalar (typically 0.01)' },
    ],
    numericalExample: {
      scenario: 'Gradient flow comparison through 4 identical saturated neurons using Sigmoid vs ReLU.',
      dataset: [
        { layer: 'Layer 1', z: 3.0 },
        { layer: 'Layer 2', z: 3.0 },
        { layer: 'Layer 3', z: 3.0 },
        { layer: 'Layer 4', z: 3.0 },
      ],
      calculations: [
        { step: 'Sigmoid Output at z=3.0', math: 'sigma(3.0) = 1 / (1 + e^-3.0) = 1 / (1 + 0.0498)', result: '0.9526' },
        { step: 'Sigmoid Local Gradient', math: 'sigma\'(3.0) = 0.9526 * (1 - 0.9526)', result: '0.0451' },
        { step: '4-Layer Sigmoid Chain', math: '0.0451 * 0.0451 * 0.0451 * 0.0451 = 0.0451^4', result: '0.0000041' },
        { step: '4-Layer ReLU Chain', math: '1.0 * 1.0 * 1.0 * 1.0 = 1.0^4', result: '1.0000' },
      ],
      finalConclusion: 'The Sigmoid gradient shrank by a factor of 240,000x across 4 layers, extinguishing the learning signal, while the ReLU gradient remained at 100% full strength.',
    },
    visualExplanation: {
      title: 'Interactive Activation Function & Gradient Explorer',
      description: 'The visualizer above plots both the activation function curve f(z) and its analytical derivative f\'(z) across the input range [-5, 5].',
      features: [
        'Toggle "Show Derivative f\'(z)" to inspect the gradient landscape.',
        'Observe how Sigmoid\'s derivative peaks at only 0.25 and drops to zero at the tails.',
        'Notice that ReLU derivative is exactly 1.0 for all z > 0, explaining why it trains deep networks reliably.',
      ],
    },
    scratchCode: {
      title: 'NumPy Activation Functions & Analytical Derivatives',
      code: `import numpy as np

def sigmoid(z):
    s = 1.0 / (1.0 + np.exp(-np.clip(z, -15, 15)))
    return s, s * (1.0 - s)

def tanh(z):
    t = np.tanh(z)
    return t, 1.0 - t**2

def relu(z):
    return np.maximum(0, z), np.where(z > 0, 1.0, 0.0)

def leaky_relu(z, alpha=0.01):
    return np.where(z > 0, z, alpha * z), np.where(z > 0, 1.0, alpha)

def gelu(z):
    # Gaussian Error Linear Unit approximation
    cdf = 0.5 * (1.0 + np.tanh(np.sqrt(2 / np.pi) * (z + 0.044715 * z**3)))
    return z * cdf

test_points = np.array([-3.0, -1.0, 0.0, 1.0, 3.0])
print("Inputs:        ", test_points)
print("ReLU Output:   ", relu(test_points)[0])
print("ReLU Gradient: ", relu(test_points)[1])
print("Sigmoid Grad:  ", np.round(sigmoid(test_points)[1], 4))`,
      explanation: 'Implements both forward activations and corresponding backward derivatives used in custom backprop engines.',
    },
    sklearnCode: {
      title: 'PyTorch nn.Module with Different Activation Functions',
      code: `import torch
import torch.nn as nn

class ActivationComparisonNet(nn.Module):
    def __init__(self, act_name='relu'):
        super().__init__()
        # Select modern activation module
        if act_name == 'relu':
            self.act = nn.ReLU()
        elif act_name == 'gelu':
            self.act = nn.GELU()
        elif act_name == 'leaky_relu':
            self.act = nn.LeakyReLU(negative_slope=0.01)
        else:
            self.act = nn.Tanh()
            
        self.fc1 = nn.Linear(10, 32)
        self.fc2 = nn.Linear(32, 1)

    def forward(self, x):
        h = self.act(self.fc1(x))
        out = self.fc2(h)
        return out

model = ActivationComparisonNet('gelu')
x = torch.randn(4, 10)
print("Model output shape:", model(x).shape)`,
      explanation: 'PyTorch provides modular activation layers that integrate natively with autograd graph construction.',
    },
    runnableCode: {
      code: `import numpy as np

# Comparing derivative magnitude across activations
z = np.linspace(-3, 3, 5)

sig_val = 1 / (1 + np.exp(-z))
sig_deriv = sig_val * (1 - sig_val)

tanh_val = np.tanh(z)
tanh_deriv = 1 - tanh_val**2

relu_deriv = (z > 0).astype(float)

print("z values:      ", np.round(z, 2))
print("Sigmoid Deriv: ", np.round(sig_deriv, 3))
print("Tanh Deriv:    ", np.round(tanh_deriv, 3))
print("ReLU Deriv:    ", np.round(relu_deriv, 3))`,
      expectedOutput: 'z values:       [-3.  -1.5  0.   1.5  3. ]\nSigmoid Deriv:  [0.045 0.149 0.25  0.149 0.045]\nTanh Deriv:     [0.01   0.183 1.    0.183 0.01 ]\nReLU Deriv:     [0. 0. 0. 1. 1.]',
    },
    lineByLineExplanation: [
      { lines: '2', codeSnippet: 'z = np.linspace(-3, 3, 5)', explanation: 'Creates 5 evenly spaced evaluation points from negative to positive.' },
      { lines: '4-5', codeSnippet: 'sig_val = ... sig_deriv = sig_val * (1 - sig_val)', explanation: 'Computes Sigmoid and its analytical derivative.' },
      { lines: '7-8', codeSnippet: 'tanh_val = ... tanh_deriv = 1 - tanh_val**2', explanation: 'Computes hyperbolic tangent and analytical derivative.' },
      { lines: '10', codeSnippet: 'relu_deriv = (z > 0).astype(float)', explanation: 'Computes step gradient for ReLU.' },
    ],
    hyperparameters: [
      { name: 'leaky_relu_alpha', defaultVal: '0.01', range: '0.01 to 0.2', effect: 'Controls slope for negative inputs to prevent dead neurons', recommendation: '0.01 is standard; 0.2 is used in LeakyReLU for GAN discriminators.' },
      { name: 'gelu_approximate', defaultVal: 'tanh', range: 'none, tanh', effect: 'Selects exact erf computation vs fast tanh polynomial approximation', recommendation: 'tanh approximation is faster with negligible error in training.' },
    ],
    assumptions: [
      { assumption: 'Differentiability Almost Everywhere', whyItMatters: 'ReLU has a non-differentiable corner at z = 0. In practice, subgradient calculus chooses gradient 0 or 1 at z = 0, which does not impede convergence.', howToVerify: 'Automatic differentiation engines handle subgradients automatically.' },
      { assumption: 'Non-Saturation in Working Range', whyItMatters: 'If inputs to Sigmoid/Tanh are too large, initial gradients become 0 and the model never starts learning.', howToVerify: 'Verify layer activation histograms during early epochs.' },
    ],
    commonMistakes: [
      { mistake: 'Using Sigmoid in deep hidden layers', whyWrong: 'Causes catastrophic vanishing gradients beyond 2-3 layers.', howToFix: 'Use ReLU, LeakyReLU, or GELU for hidden layers; restrict Sigmoid exclusively to binary classification output layers.', solution: 'nn.Sequential(nn.Linear(d, d), nn.ReLU())' },
      { mistake: 'Suffering from Dying ReLU with high learning rates', whyWrong: 'A large gradient update can knock a neuron into permanently negative territory where its derivative is always 0.', howToFix: 'Lower learning rate, use He initialization, or switch to LeakyReLU/GELU.', solution: 'nn.GELU()' },
    ],
    realWorldUseCases: [
      { industry: 'Natural Language Processing', application: 'Transformers & Large Language Models', benefit: 'GELU is the standard activation in GPT-4, LLaMA, and BERT, providing smooth non-linear decision boundaries.' },
      { industry: 'Edge Computing & Mobile Vision', application: 'MobileNet Image Classification', benefit: 'ReLU6 (ReLU capped at 6.0) prevents numeric overflow on fixed-point 8-bit quantized mobile chips.' },
      { industry: 'Binary Risk Scoring', application: 'Credit Card Fraud Classification', benefit: 'Sigmoid output layer produces calibrated probability estimates between 0.0 and 1.0.' },
    ],
    practiceQuestions: [
      { id: 'dl03-q1', question: 'What is the maximum possible gradient of the Sigmoid activation function and at what value of z does it occur?', hint: 'Examine σ(z)(1 - σ(z)).', answer: 'Maximum gradient is 0.25, occurring at z = 0.', explanation: 'At z = 0, σ(0) = 0.5, so 0.5 * (1 - 0.5) = 0.25.' },
      { id: 'dl03-q2', question: 'Why does Leaky ReLU solve the "Dying ReLU" problem?', hint: 'Consider the derivative when z < 0.', answer: 'Because for z < 0, the derivative is α (e.g. 0.01) rather than 0, allowing gradients to update weights even when inactive.', explanation: 'A non-zero gradient ensures the neuron can eventually recover if evidence shifts.' },
    ],
    quiz: [
      {
        id: 'dl03-qz1',
        question: 'Why did the introduction of ReLU revolutionize deep learning in 2012?',
        options: [
          'It eliminated floating point arithmetic entirely',
          'Its constant gradient of 1.0 for positive inputs solved the vanishing gradient problem for deep architectures',
          'It bounded activations strictly between -1 and 1',
          'It guaranteed 100% convex optimization landscapes',
        ],
        correctIndex: 1,
        explanation: 'ReLU does not saturate on positive values, allowing error gradients to propagate back through deep architectures without exponential decay.',
      },
      {
        id: 'dl03-qz2',
        question: 'Which activation function is most widely used in modern Transformer models like GPT-4 and BERT?',
        options: [
          'Sigmoid',
          'Standard Step Function',
          'GELU (Gaussian Error Linear Unit)',
          'Hard Tanh',
        ],
        correctIndex: 2,
        explanation: 'GELU smooths the abrupt cutoff of ReLU using a probabilistic Gaussian gating mechanism, providing superior empirical results in large language models.',
      },
      {
        id: 'dl03-qz3',
        question: 'What occurs during the "Dying ReLU" failure mode?',
        options: [
          'Weights become infinite due to division by zero',
          'Neurons receive inputs z < 0, output 0, receive gradient 0, and permanently cease learning',
          'The activation function oscillates between 1 and -1',
          'The GPU runs out of video memory',
        ],
        correctIndex: 1,
        explanation: 'When a neuron’s weights move such that its input is always negative, its output is 0 and its gradient is 0, so backprop never updates its weights again.',
      },
    ],
    independentExercise: {
      id: 'dl03-ex',
      title: 'Implement GELU with NumPy',
      problem: 'Implement the tanh approximation of GELU: GELU(x) = 0.5 * x * (1 + tanh(sqrt(2/pi) * (x + 0.044715 * x^3))). Verify that for x=0 it outputs 0.0 and for large positive x it approaches x.',
      hints: ['Use np.sqrt(2 / np.pi) and np.tanh.', 'Test with array [-2.0, 0.0, 2.0].'],
      starterCode: `import numpy as np

def gelu_approx(x):
    # Implement formula
    pass

x_test = np.array([-2.0, -1.0, 0.0, 1.0, 2.0])
`,
      solution: `import numpy as np

def gelu_approx(x):
    k = np.sqrt(2.0 / np.pi)
    inner = k * (x + 0.044715 * np.power(x, 3))
    return 0.5 * x * (1.0 + np.tanh(inner))

x_test = np.array([-2.0, -1.0, 0.0, 1.0, 2.0])
print("GELU:", np.round(gelu_approx(x_test), 4))`,
    },
    summary: {
      keyTakeaways: [
        'Hidden layers should default to ReLU or GELU to avoid vanishing gradients.',
        'Never use Sigmoid in deep hidden layers; reserve it for binary output layers.',
        'Use LeakyReLU or GELU if neurons are dying during high-learning-rate training.',
      ],
      nextLessonId: 'dl-04-loss-functions',
      nextLessonTitle: 'DL-04: Loss Functions for Deep Learning',
      nextLessonModuleId: 'dl-module-1',
    },
  },

  'dl-04-loss-functions': {
    id: 'dl-04-loss-functions',
    moduleId: 'dl-module-1',
    title: 'DL-04: Loss Functions for Deep Learning',
    subtitle: 'Cross-Entropy, Mean Squared Error & Focal Loss: Mechanics and Gradient Dynamics',
    order: 4,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'loss-explorer',
    objectives: [
      'Contrast regression loss functions (MSE, MAE, Huber) with classification loss functions (BCE, CCE, Focal Loss)',
      'Derive why minimizing Cross-Entropy is mathematically equivalent to Maximum Likelihood Estimation (MLE)',
      'Inspect the elegant Softmax + Cross-Entropy gradient cancellation (y_hat - y)',
      'Understand how Focal Loss prevents easy negative examples from overwhelming object detection models',
    ],
    prerequisites: ['DL-03: Activation Functions', 'Logarithms and probability distributions'],
    analogy: {
      title: 'The Graded Exam vs The Penalized Bluff',
      text: 'Mean Squared Error is like grading a math test on how many centimeters off your pencil drawing was: small misses get light penalties, but doubling the distance quadruples the penalty. Binary Cross-Entropy is like penalizing a poker player who bluffs with absolute certainty: if you state with 99.9% confidence that an event will occur, and it does not, Cross-Entropy assigns an astronomical, near-infinite penalty (-log(0.001) ≈ 6.9). It relentlessly forces the model to be honest about its uncertainty.',
      metaphor: 'The loss function is the teacher that scores mistakes; its gradient is the explicit directional instruction for how the student must adjust their thinking.',
    },
    problemSolved: {
      title: 'Why Mean Squared Error Fails on Classification Tasks',
      description: 'Using MSE with Sigmoid outputs leads to slow training because when a model is confidently wrong (e.g. target y=1, pred y_hat=0.01), Sigmoid derivative is near zero, causing gradients to vanish. Cross-Entropy completely eliminates this flaw by cancelling the Sigmoid denominator.',
      keyPoints: [
        'Steep Penalties for Confident Errors: -log(y_hat) tends to infinity as y_hat approaches 0 for a positive sample.',
        'Linear Error Signal: Combining Cross-Entropy with Sigmoid or Softmax yields gradient (y_hat - y), which is large when the prediction is wrong and zero when correct.',
        'Convexity in Logit Space: Cross-Entropy produces a convex optimization objective with respect to pre-activations z.',
      ],
    },
    intuition: {
      overview: 'The loss function quantifies the discrepancy between model predictions y_hat and ground truth targets y into a single scalar value L that can be minimized via gradient descent.',
      steps: [
        { step: 1, title: 'Prediction Evaluation', description: 'Model emits continuous predictions y_hat (probabilities for classification or real numbers for regression).' },
        { step: 2, title: 'Error Computation', description: 'Loss function scores the prediction against ground-truth label y.' },
        { step: 3, title: 'Gradient Derivation', description: 'Analytical derivative ∂L/∂y_hat indicates both magnitude and direction to change predictions.' },
        { step: 4, title: 'Backpropagation Injection', description: 'The scalar loss gradient initiates the backward chain-rule pass across all model parameters.' },
      ],
    },
    mathematics: {
      overview: 'The standard loss functions used across production deep learning systems.',
      foundations: [
        {
          name: 'Mean Squared Error (MSE)',
          latex: 'L_{MSE}(y, \\hat{y}) = \\frac{1}{2} (y - \\hat{y})^2, \\quad \\frac{\\partial L}{\\partial \\hat{y}} = \\hat{y} - y',
          explanation: 'Standard objective for regression tasks where residual errors are assumed Gaussian distributed.',
        },
        {
          name: 'Binary Cross-Entropy (BCE)',
          latex: 'L_{BCE}(y, \\hat{y}) = -\\left[ y \\log(\\hat{y}) + (1-y) \\log(1 - \\hat{y}) \\right]',
          explanation: 'Measures negative log-likelihood of Bernoulli distribution for binary classification.',
        },
        {
          name: 'Categorical Cross-Entropy (CCE)',
          latex: 'L_{CCE}(\\mathbf{y}, \\mathbf{\\hat{y}}) = -\\sum_{c=1}^{C} y_c \\log(\\hat{y}_c)',
          explanation: 'Objective for multi-class classification where y is one-hot and y_hat is Softmax output.',
        },
        {
          name: 'Focal Loss',
          latex: 'L_{FL} = -\\alpha_t (1 - p_t)^\\gamma \\log(p_t)',
          explanation: 'Introduced in RetinaNet: modulates loss with focusing parameter γ to suppress gradients from easy background samples.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Cross-Entropy + Softmax Gradient Cancellation',
      objective: 'Prove that ∂L / ∂z_i = y_hat_i - y_i for categorical cross-entropy with Softmax activations.',
      steps: [
        {
          step: 1,
          label: 'Softmax and Loss Definitions',
          latex: '\\hat{y}_i = \\frac{e^{z_i}}{\\sum_k e^{z_k}}, \\quad L = -\\sum_k y_k \\log(\\hat{y}_k)',
          explanation: 'State the Softmax probability equation and categorical cross-entropy formula.',
        },
        {
          step: 2,
          label: 'Softmax Jacobian Derivative',
          latex: '\\frac{\\partial \\hat{y}_k}{\\partial z_i} = \\begin{cases} \\hat{y}_i (1 - \\hat{y}_i) & k = i \\\\ -\\hat{y}_k \\hat{y}_i & k \\neq i \\end{cases}',
          explanation: 'Differentiating Softmax with respect to logits z_i yields a diagonal component and off-diagonal component.',
        },
        {
          step: 3,
          label: 'Chain Rule Substitution',
          latex: '\\frac{\\partial L}{\\partial z_i} = \\sum_k \\frac{\\partial L}{\\partial \\hat{y}_k} \\frac{\\partial \\hat{y}_k}{\\partial z_i} = -\\frac{y_i}{\\hat{y}_i} \\hat{y}_i(1 - \\hat{y}_i) - \\sum_{k \\neq i} \\frac{y_k}{\\hat{y}_k} (-\\hat{y}_k \\hat{y}_i)',
          explanation: 'Substitute loss derivatives ∂L/∂y_hat_k = -y_k / y_hat_k into the multivariate chain rule.',
        },
        {
          step: 4,
          label: 'Simplification to Residual Difference',
          latex: '\\frac{\\partial L}{\\partial z_i} = -y_i (1 - \\hat{y}_i) + \\sum_{k \\neq i} y_k \\hat{y}_i = -y_i + y_i \\hat{y}_i + \\hat{y}_i \\sum_{k \\neq i} y_k = -y_i + \\hat{y}_i \\sum_{all\\,k} y_k = \\hat{y}_i - y_i',
          explanation: 'Because one-hot labels sum to 1 (∑ y_k = 1), all intermediate non-linearities collapse into the clean residual difference (y_hat_i - y_i).',
        },
      ],
    },
    variables: [
      { symbol: 'y', name: 'Ground Truth Label', description: 'Actual target value or one-hot encoded vector', dimensions: 'Scalar or (C,)' },
      { symbol: '\\hat{y}', name: 'Model Prediction', description: 'Continuous prediction or estimated probability', dimensions: 'Scalar or (C,)' },
      { symbol: 'z', name: 'Pre-Activation Logit', description: 'Raw unnormalized output prior to Softmax/Sigmoid', dimensions: 'Scalar or (C,)' },
      { symbol: 'γ', name: 'Focal Parameter', description: 'Focusing exponent dampening contribution of easy negatives', dimensions: 'Scalar (typically 2.0)' },
    ],
    numericalExample: {
      scenario: 'Calculating Binary Cross-Entropy when prediction is accurate vs wildly inaccurate.',
      dataset: [
        { case: 'Good Prediction', target: 1, prediction: 0.95 },
        { case: 'Confident Blunder', target: 1, prediction: 0.05 },
      ],
      calculations: [
        { step: 'Loss for Good Prediction', math: '-log(0.95) = -(-0.0513)', result: '0.0513' },
        { step: 'Loss for Confident Blunder', math: '-log(0.05) = -(-2.9957)', result: '2.9957' },
        { step: 'Penalty Ratio', math: '2.9957 / 0.0513', result: '58.4x higher loss' },
      ],
      finalConclusion: 'Cross-Entropy penalizes the confident blunder 58x more severely, ensuring strong gradient updates when the model is catastrophically mistaken.',
    },
    visualExplanation: {
      title: 'Interactive Loss Function Explorer',
      description: 'The visualizer above demonstrates how loss functions penalize discrepancies between target y and predicted output y_hat.',
      features: [
        'Toggle between Binary Cross-Entropy (BCE), Mean Squared Error (MSE), and Huber loss.',
        'Drag the prediction slider towards 0 or 1 to see the asymmetric exponential spike in BCE loss.',
        'Observe the live analytical gradient ∂L/∂y_hat driving backpropagation.',
      ],
    },
    scratchCode: {
      title: 'NumPy Stable Cross-Entropy and MSE Losses',
      code: `import numpy as np

def binary_cross_entropy(y_true, y_pred, eps=1e-15):
    # Clip predictions to prevent log(0) numerical instability
    y_pred = np.clip(y_pred, eps, 1 - eps)
    loss = -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))
    grad = (y_pred - y_true) / (y_pred * (1 - y_pred) + eps)
    return loss, grad

def categorical_cross_entropy(y_true, y_pred, eps=1e-15):
    y_pred = np.clip(y_pred, eps, 1 - eps)
    loss = -np.sum(y_true * np.log(y_pred)) / y_true.shape[0]
    return loss

y_true = np.array([1, 0, 1, 1])
y_pred = np.array([0.9, 0.1, 0.8, 0.3]) # Last sample is inaccurate

loss, _ = binary_cross_entropy(y_true, y_pred)
print(f"Batch Binary Cross-Entropy Loss: {loss:.4f}")`,
      explanation: 'Applies numerical epsilon clipping to guard against undefined log(0) values.',
    },
    sklearnCode: {
      title: 'PyTorch Loss Functions (nn.BCEWithLogitsLoss, nn.CrossEntropyLoss)',
      code: `import torch
import torch.nn as nn

# Binary Classification: nn.BCEWithLogitsLoss combines Sigmoid + BCE for numeric stability
bce_loss_fn = nn.BCEWithLogitsLoss()
logits = torch.tensor([2.5, -1.8, 0.4], requires_grad=True)
targets = torch.tensor([1.0, 0.0, 1.0])

loss_bce = bce_loss_fn(logits, targets)
loss_bce.backward()
print("BCE Loss:", loss_bce.item())
print("Logit Gradients:", logits.grad)

# Multi-Class: nn.CrossEntropyLoss combines LogSoftmax + NLLLoss
cce_loss_fn = nn.CrossEntropyLoss()
class_logits = torch.tensor([[1.2, 0.3, -0.5]], requires_grad=True) # shape (1, 3)
class_target = torch.tensor([0]) # Class 0 is correct

loss_cce = cce_loss_fn(class_logits, class_target)
print("Categorical Cross-Entropy Loss:", loss_cce.item())`,
      explanation: 'In PyTorch, always use BCEWithLogitsLoss and CrossEntropyLoss rather than passing explicit Sigmoid/Softmax outputs to avoid log-sum-exp numerical underflow.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate how MSE produces smaller gradients than BCE for wrong predictions
y_true = 1.0
predictions = np.array([0.99, 0.90, 0.50, 0.10, 0.01])

bce_losses = -np.log(predictions)
bce_grads = predictions - y_true # Assuming Sigmoid logit gradient

mse_losses = 0.5 * (predictions - y_true)**2
# MSE with sigmoid: (y_hat - y) * y_hat * (1 - y_hat)
mse_logit_grads = (predictions - y_true) * predictions * (1 - predictions)

print(f"{'Pred':>6} | {'BCE Loss':>8} | {'BCE Grad':>8} | {'MSE Loss':>8} | {'MSE Grad':>8}")
print("-" * 50)
for p, bl, bg, ml, mg in zip(predictions, bce_losses, bce_grads, mse_losses, mse_logit_grads):
    print(f"{p:6.2f} | {bl:8.4f} | {bg:8.4f} | {ml:8.4f} | {mg:8.4f}")`,
      expectedOutput: '  Pred | BCE Loss | BCE Grad | MSE Loss | MSE Grad\n--------------------------------------------------\n  0.99 |   0.0101 |  -0.0100 |   0.0001 |  -0.0001\n  0.90 |   0.1054 |  -0.1000 |   0.0050 |  -0.0090\n  0.50 |   0.6931 |  -0.5000 |   0.1250 |  -0.1250\n  0.10 |   2.3026 |  -0.9000 |   0.4050 |  -0.0810\n  0.01 |   4.6052 |  -0.9900 |   0.4901 |  -0.0098',
    },
    lineByLineExplanation: [
      { lines: '3-4', codeSnippet: 'y_true = 1.0; predictions = np.array(...)', explanation: 'Evaluates predictions ranging from almost perfect (0.99) to catastrophically wrong (0.01).' },
      { lines: '6-7', codeSnippet: 'bce_losses = ...; bce_grads = ...', explanation: 'Computes Cross-Entropy loss and logit gradient (y_hat - y).' },
      { lines: '9-11', codeSnippet: 'mse_logit_grads = (predictions - y_true) * predictions * (1 - predictions)', explanation: 'Shows that MSE logit gradient collapses to -0.0098 when prediction is 0.01 due to Sigmoid derivative!' },
    ],
    hyperparameters: [
      { name: 'focal_gamma', defaultVal: '2.0', range: '0.5 to 5.0', effect: 'Controls the down-weighting rate of well-classified easy samples', recommendation: '2.0 is the gold standard for dense object detection (RetinaNet).' },
      { name: 'label_smoothing', defaultVal: '0.0', range: '0.0 to 0.1', effect: 'Replaces hard 0/1 labels with soft targets (e.g. 0.9/0.05) to prevent overconfident predictions', recommendation: 'Use 0.1 in Transformer training to improve regularization.' },
    ],
    assumptions: [
      { assumption: 'Mutual Exclusivity in CCE', whyItMatters: 'Categorical Cross-Entropy assumes exactly one class is correct per sample. If an image can contain both a cat and a dog, BCE must be used independently per class.', howToVerify: 'Verify whether the task is multi-class (1 label) or multi-label (multiple simultaneous labels).' },
      { assumption: 'Sufficient Sample Support per Class', whyItMatters: 'Severe class imbalance causes Cross-Entropy to optimize exclusively for the majority class.', howToVerify: 'Inspect class distributions; use class-weighted cross-entropy or Focal Loss if imbalance exceeds 10:1.' },
    ],
    commonMistakes: [
      { mistake: 'Passing raw probabilities into nn.CrossEntropyLoss in PyTorch', whyWrong: 'PyTorch nn.CrossEntropyLoss expects raw unnormalized logits z. Applying Softmax first causes double-softmax distortion and incorrect gradients.', howToFix: 'Remove the final Softmax layer from your model definition when using nn.CrossEntropyLoss.', solution: 'loss = nn.CrossEntropyLoss()(logits, targets)' },
      { mistake: 'Using MSE for classification tasks', whyWrong: 'MSE combined with Sigmoid causes gradient starvation on confident mistakes due to derivative saturation.', howToFix: 'Always use Cross-Entropy for classification tasks.', solution: 'Use BCEWithLogitsLoss for binary; CrossEntropyLoss for multi-class.' },
    ],
    realWorldUseCases: [
      { industry: 'Autonomous Driving & Object Detection', application: 'RetinaNet Focal Loss', benefit: 'Dampens 100,000 background sky/road bounding boxes so the model concentrates on rare pedestrian boxes.' },
      { industry: 'Search Engines', application: 'Ranking Loss (Cross-Entropy Pairwise)', benefit: 'Optimizes relevance ranking of retrieved documents by penalizing top-ranked irrelevant links.' },
      { industry: 'Financial Trading', application: 'Asset Price Regression with Huber Loss', benefit: 'Huber loss transitions from quadratic for small price fluctuations to linear for market shocks, ignoring outliers.' },
    ],
    practiceQuestions: [
      { id: 'dl04-q1', question: 'Why does Cross-Entropy provide a better gradient than MSE when a model makes a confident wrong prediction?', hint: 'Look at the derivative calculation: does it include σ\'(z)?', answer: 'The denominator of Cross-Entropy cancels out the Sigmoid derivative σ(z)(1 - σ(z)), leaving a clean gradient (y_hat - y) that remains large even when σ(z) saturates.', explanation: 'This prevents gradient starvation on egregious errors.' },
      { id: 'dl04-q2', question: 'When would you select Huber loss over standard Mean Squared Error (MSE)?', hint: 'Think about extreme data outliers.', answer: 'When the dataset contains extreme outliers that would distort MSE due to quadratic squaring.', explanation: 'Huber loss behaves linearly for errors exceeding threshold δ, resisting outlier skew.' },
    ],
    quiz: [
      {
        id: 'dl04-qz1',
        question: 'What is the gradient of Categorical Cross-Entropy with respect to the input logits z_i when using Softmax?',
        options: [
          'y_hat_i · (1 - y_hat_i)',
          'y_hat_i - y_i',
          '(y_hat_i - y_i)²',
          '-log(y_hat_i)',
        ],
        correctIndex: 1,
        explanation: 'Due to mathematical cancellation, the derivative of Softmax + Cross-Entropy with respect to logit z_i simplifies directly to the prediction error: y_hat_i - y_i.',
      },
      {
        id: 'dl04-qz2',
        question: 'Why should you use nn.BCEWithLogitsLoss instead of nn.BCELoss in PyTorch?',
        options: [
          'It runs on CPU only',
          'It combines Sigmoid and BCE into a single layer using the log-sum-exp trick for superior numerical stability',
          'It requires 4x more memory',
          'It requires labels to be strings',
        ],
        correctIndex: 1,
        explanation: 'Combining Sigmoid and log into a unified mathematical expression avoids numerical precision underflow when probabilities approach 0 or 1.',
      },
      {
        id: 'dl04-qz3',
        question: 'What specific problem does Focal Loss solve in computer vision?',
        options: [
          'It compresses high-resolution images to fit in RAM',
          'It addresses extreme class imbalance by dynamically down-weighting the loss contribution of easy, well-classified background samples',
          'It replaces convolutional layers with attention',
          'It converts RGB images into grayscale',
        ],
        correctIndex: 1,
        explanation: 'Focal loss adds a factor (1 - p_t)^γ that suppresses the gradient from easy background examples, allowing the network to focus on hard foreground objects.',
      },
    ],
    independentExercise: {
      id: 'dl04-ex',
      title: 'Implement Numerically Stable Softmax & Cross-Entropy',
      problem: 'Write a Python function `softmax_cross_entropy(logits, target_class_idx)` that subtracts the max logit for stability, computes Softmax, and returns both the scalar loss and the gradient vector with respect to logits.',
      hints: ['Subtract np.max(logits) before computing np.exp to prevent overflow.', 'The gradient is simply softmax_probs with 1.0 subtracted from target_class_idx.'],
      starterCode: `import numpy as np

def softmax_cross_entropy(logits, target_idx):
    # Stabilized Softmax
    # Cross-entropy loss = -log(prob[target_idx])
    # Gradient = probs; probs[target_idx] -= 1.0
    pass

logits = np.array([2.0, 1.0, 0.1])
target = 0
`,
      solution: `import numpy as np

def softmax_cross_entropy(logits, target_idx):
    shifted = logits - np.max(logits)
    exp_scores = np.exp(shifted)
    probs = exp_scores / np.sum(exp_scores)
    
    loss = -np.log(probs[target_idx] + 1e-15)
    grad = probs.copy()
    grad[target_idx] -= 1.0
    return loss, grad

logits = np.array([2.0, 1.0, 0.1])
target = 0
loss, grad = softmax_cross_entropy(logits, target)
print(f"Loss: {loss:.4f}")
print("Gradients with respect to logits:", np.round(grad, 4))`,
    },
    summary: {
      keyTakeaways: [
        'Use Cross-Entropy for classification and MSE/Huber for regression.',
        'In PyTorch, always use BCEWithLogitsLoss or CrossEntropyLoss to benefit from log-sum-exp numerical stabilization.',
        'The gradient of Cross-Entropy with respect to pre-activations z is the intuitive residual difference (y_hat - y).',
      ],
      nextLessonId: 'dl-05-forward-propagation',
      nextLessonTitle: 'DL-05: Forward Propagation',
      nextLessonModuleId: 'dl-module-1',
    },
  },

  'dl-05-forward-propagation': {
    id: 'dl-05-forward-propagation',
    moduleId: 'dl-module-1',
    title: 'DL-05: Forward Propagation',
    subtitle: 'Vectorized Matrix Operations, Activation Caching & Layered Inference',
    order: 5,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'forward-prop-explorer',
    objectives: [
      'Master the vectorized matrix formulation of forward propagation for arbitrary batch sizes: Z⁽ˡ⁾ = A⁽ˡ⁻¹⁾ W⁽ˡ⁾ + b⁽ˡ⁾',
      'Trace tensor dimensions through deep architectures without dimension mismatch errors',
      'Implement an activation caching system storing intermediate values needed for backpropagation',
      'Use the interactive Forward Propagation Explorer to observe signal propagation through hidden layers',
    ],
    prerequisites: ['DL-02: Neural Network Fundamentals', 'Matrix multiplication dimensions'],
    analogy: {
      title: 'The Manufacturing Quality Relay',
      text: 'Think of forward propagation as a multi-stage manufacturing assembly line. Raw materials (input tensor X) enter workstation 1. The technicians at stage 1 stamp and mold the material according to their current tooling specs (weight matrix W⁽¹⁾ and bias b⁽¹⁾) and apply a protective coating (activation function). The molded intermediate parts (activations A⁽¹⁾) are handed off to workstation 2. Crucially, a digital camera snapshots the parts at every station (activation cache): because if a defect is found at final inspection, the engineers need those exact intermediate snapshots to calibrate each workstation\'s tools during backpropagation.',
      metaphor: 'Forward propagation is the production pass creating predictions; caching intermediate states is saving the blueprints needed for diagnostic updates.',
    },
    problemSolved: {
      title: 'Eliminating For-Loops with High-Performance Batch Vectorization',
      description: 'Calculating a neural network sample by sample in Python for-loops is orders of magnitude too slow. Matrix forward propagation bundles an entire batch of hundreds of samples into a single BLAS GEMM (General Matrix Multiply) call executed in parallel on GPU tensor cores.',
      keyPoints: [
        'Massive Parallelism: Processes N samples simultaneously via matrix multiplication.',
        'Dimension Tracking: Rigorous matrix shapes (N, d_in) x (d_in, d_out) ensure seamless layer composability.',
        'Forward Caching: Stores linear pre-activations Z⁽ˡ⁾ and activations A⁽ˡ⁾ in memory for instant reuse during the backward pass.',
      ],
    },
    intuition: {
      overview: 'Forward propagation evaluates the neural network function from left to right: inputs are sequentially transformed through weight matrices and non-linearities until output predictions emerge.',
      steps: [
        { step: 1, title: 'Input Ingestion', description: 'Batch matrix A⁽⁰⁾ = X of shape (N, d_in) is loaded into memory.' },
        { step: 2, title: 'Layer Computation', description: 'For each layer l = 1 ... L, compute Z⁽ˡ⁾ = A⁽ˡ⁻¹⁾ W⁽ˡ⁾ + b⁽ˡ⁾.' },
        { step: 3, title: 'Non-Linear Activation', description: 'Apply activation function A⁽ˡ⁾ = σ(Z⁽ˡ⁾).' },
        { step: 4, title: 'Cache Storage', description: 'Store tuple (A⁽ˡ⁻¹⁾, W⁽ˡ⁾, b⁽ˡ⁾, Z⁽ˡ⁾) in memory for backpropagation.' },
        { step: 5, title: 'Prediction Emit', description: 'Output layer A⁽ᴸ⁾ yields model predictions Y_hat.' },
      ],
    },
    mathematics: {
      overview: 'Vectorized mathematical equations for mini-batch forward propagation across L layers.',
      foundations: [
        {
          name: 'Vectorized Linear Combination',
          latex: 'Z^{(l)} = A^{(l-1)} W^{(l)} + \\mathbf{1} {b^{(l)}}^T',
          explanation: 'A⁽ˡ⁻¹⁾ is (N, d_prev), W⁽ˡ⁾ is (d_prev, d_curr), b⁽ˡ⁾ is (d_curr,), and Z⁽ˡ⁾ is (N, d_curr).',
        },
        {
          name: 'Vectorized Activation',
          latex: 'A^{(l)} = \\sigma^{(l)}\\left( Z^{(l)} \\right)',
          explanation: 'Activation function σ⁽ˡ⁾ is applied element-wise across the matrix Z⁽ˡ⁾.',
        },
      ],
    },
    derivation: {
      title: 'Tensor Dimensionality Invariant Rule',
      objective: 'Prove the matrix dimension compatibility rule for consecutive neural network layers.',
      steps: [
        {
          step: 1,
          label: 'Input Matrix Dimensions',
          latex: 'X \\in \\mathbb{R}^{N \\times d_0}, \\quad A^{(0)} = X',
          explanation: 'N is the batch size, d₀ is the number of input features.',
        },
        {
          step: 2,
          label: 'Weight Matrix Dimensional Rule',
          latex: 'W^{(1)} \\in \\mathbb{R}^{d_0 \\times d_1} \\implies Z^{(1)} = A^{(0)} W^{(1)} \\in \\mathbb{R}^{N \\times d_1}',
          explanation: 'Inner dimension d₀ must match exactly for matrix multiplication to be defined.',
        },
        {
          step: 3,
          label: 'General Recursive Induction',
          latex: 'A^{(l-1)} \\in \\mathbb{R}^{N \\times d_{l-1}}, \\, W^{(l)} \\in \\mathbb{R}^{d_{l-1} \\times d_l} \\implies A^{(l)} \\in \\mathbb{R}^{N \\times d_l}',
          explanation: 'Batch size N is invariant and preserved across every hidden layer; only feature width transforms from d_{l-1} to d_l.',
        },
      ],
    },
    variables: [
      { symbol: 'N', name: 'Batch Size', description: 'Number of training samples processed concurrently', dimensions: 'Scalar integer' },
      { symbol: 'A^{(l)}', name: 'Activation Matrix', description: 'Post-activation representations at layer l', dimensions: '(N, d_l)' },
      { symbol: 'W^{(l)}', name: 'Weight Tensor', description: 'Learnable projection parameters at layer l', dimensions: '(d_{l-1}, d_l)' },
      { symbol: 'b^{(l)}', name: 'Bias Tensor', description: 'Learnable bias offsets broadcast across batch', dimensions: '(d_l,)' },
      { symbol: 'Z^{(l)}', name: 'Linear Pre-activation', description: 'Raw matrix products before activation function', dimensions: '(N, d_l)' },
    ],
    numericalExample: {
      scenario: 'Complete numerical forward pass for 1 sample through a 2-hidden layer network.',
      dataset: [
        { layer: 'Input x', dims: '(1, 2)', values: '[1.0, -2.0]' },
        { layer: 'Layer 1 Weights W1', dims: '(2, 2)', values: '[[0.5, -0.5], [1.0, 0.5]]' },
        { layer: 'Layer 1 Bias b1', dims: '(2,)', values: '[0.1, 0.2]' },
        { layer: 'Layer 2 Weights W2', dims: '(2, 1)', values: '[[1.5], [-1.0]]' },
        { layer: 'Layer 2 Bias b2', dims: '(1,)', values: '[-0.5]' },
      ],
      calculations: [
        { step: 'Layer 1 Z1', math: '[1.0, -2.0] @ [[0.5, -0.5], [1.0, 0.5]] + [0.1, 0.2] = [-1.5, -1.5] + [0.1, 0.2]', result: '[-1.4, -1.3]' },
        { step: 'Layer 1 ReLU Activation A1', math: 'max(0, [-1.4, -1.3])', result: '[0.0, 0.0]' },
        { step: 'Layer 2 Z2', math: '[0.0, 0.0] @ [[1.5], [-1.0]] + [-0.5]', result: '-0.50' },
        { step: 'Output Sigmoid Activation A2', math: '1 / (1 + e^-(-0.5)) = 1 / (1 + 1.6487)', result: '0.3775' },
      ],
      finalConclusion: 'Both Layer 1 neurons died (output 0.0 due to negative pre-activation), propagating an output probability of 0.3775 solely determined by Layer 2 bias.',
    },
    visualExplanation: {
      title: 'Interactive Forward Propagation Explorer',
      description: 'The interactive visualizer above traces signals flowing through input, hidden, and output layers.',
      features: [
        'Inspect individual nodes to observe their exact linear sum z and non-linear activation a.',
        'Adjust feature sliders x₁ and x₂ to observe how signals dynamically travel across layers in real time.',
        'Switch hidden activation between ReLU, Sigmoid, and Tanh to witness differences in hidden representation saturation.',
      ],
    },
    scratchCode: {
      title: 'Full Multi-Layer Forward Propagation with Activation Caching in NumPy',
      code: `import numpy as np

class DeepNeuralNetwork:
    def __init__(self, layer_dims):
        # layer_dims: e.g. [4, 8, 4, 1]
        self.params = {}
        self.L = len(layer_dims) - 1
        
        # He initialization for ReLU hidden layers
        for l in range(1, self.L + 1):
            self.params[f'W{l}'] = np.random.randn(layer_dims[l-1], layer_dims[l]) * np.sqrt(2.0 / layer_dims[l-1])
            self.params[f'b{l}'] = np.zeros((1, layer_dims[l]))
            
    def forward(self, X):
        caches = []
        A = X
        
        # Hidden layers with ReLU
        for l in range(1, self.L):
            A_prev = A
            W = self.params[f'W{l}']
            b = self.params[f'b{l}']
            Z = A_prev @ W + b
            A = np.maximum(0, Z) # ReLU
            caches.append((A_prev, W, b, Z))
            
        # Final output layer with Sigmoid for binary probability
        W_out = self.params[f'W{self.L}']
        b_out = self.params[f'b{self.L}']
        Z_out = A @ W_out + b_out
        A_out = 1.0 / (1.0 + np.exp(-np.clip(Z_out, -15, 15)))
        caches.append((A, W_out, b_out, Z_out))
        
        return A_out, caches

# Test with batch of 3 samples, 4 features each
net = DeepNeuralNetwork([4, 8, 4, 1])
X_batch = np.random.randn(3, 4)
output_probs, caches = net.forward(X_batch)

print("Batch Output Shape:", output_probs.shape)
print("Cached Layers Count:", len(caches))
print("Predictions:\\n", np.round(output_probs, 4))`,
      explanation: 'Demonstrates real-world forward propagation caching intermediate tuples needed for backpropagation.',
    },
    sklearnCode: {
      title: 'PyTorch Sequential Forward Pass',
      code: `import torch
import torch.nn as nn

# Explicit 3-layer neural network
model = nn.Sequential(
    nn.Linear(4, 8),
    nn.ReLU(),
    nn.Linear(8, 4),
    nn.ReLU(),
    nn.Linear(4, 1),
    nn.Sigmoid()
)

# Batch of 3 samples
x = torch.randn(3, 4)
output = model(x)
print("PyTorch Output Shape:", output.shape)
print("Forward Pass Tensor:\\n", output)`,
      explanation: 'PyTorch nn.Sequential automatically manages forward propagation and activation hooks under the hood.',
    },
    runnableCode: {
      code: `import numpy as np

# Quick test of matrix dimensions across 3 layers
batch_size = 5
d_in = 3
d_h1 = 4
d_h2 = 2
d_out = 1

X = np.random.randn(batch_size, d_in)
W1 = np.random.randn(d_in, d_h1)
b1 = np.random.randn(1, d_h1)

W2 = np.random.randn(d_h1, d_h2)
b2 = np.random.randn(1, d_h2)

W3 = np.random.randn(d_h2, d_out)
b3 = np.random.randn(1, d_out)

# Forward pass
Z1 = X @ W1 + b1
A1 = np.maximum(0, Z1)

Z2 = A1 @ W2 + b2
A2 = np.maximum(0, Z2)

Z3 = A2 @ W3 + b3
A3 = 1 / (1 + np.exp(-Z3))

print(f"X shape:  {X.shape}")
print(f"A1 shape: {A1.shape}")
print(f"A2 shape: {A2.shape}")
print(f"A3 shape: {A3.shape} (Matches batch_size x d_out)")`,
      expectedOutput: 'X shape:  (5, 3)\nA1 shape: (5, 4)\nA2 shape: (5, 2)\nA3 shape: (5, 1) (Matches batch_size x d_out)',
    },
    lineByLineExplanation: [
      { lines: '2-7', codeSnippet: 'batch_size = 5 ... d_out = 1', explanation: 'Defines dimension constants: 5 samples, passing through 3 -> 4 -> 2 -> 1 layer transitions.' },
      { lines: '19-20', codeSnippet: 'Z1 = X @ W1 + b1; A1 = np.maximum(0, Z1)', explanation: 'Layer 1 forward transformation: shape (5, 3) @ (3, 4) -> (5, 4).' },
      { lines: '22-23', codeSnippet: 'Z2 = A1 @ W2 + b2; A2 = np.maximum(0, Z2)', explanation: 'Layer 2 forward transformation: shape (5, 4) @ (4, 2) -> (5, 2).' },
      { lines: '25-26', codeSnippet: 'Z3 = A2 @ W3 + b3; A3 = 1 / (1 + np.exp(-Z3))', explanation: 'Output transformation: shape (5, 2) @ (2, 1) -> (5, 1).' },
    ],
    hyperparameters: [
      { name: 'batch_size', defaultVal: '32', range: '16 to 512', effect: 'Number of samples processed in parallel during each forward pass', recommendation: '32 or 64 balances GPU memory efficiency and gradient variance.' },
      { name: 'layer_widths', defaultVal: '[128, 64]', range: '[32] to [4096, 2048]', effect: 'Determines the dimensionality of latent feature spaces', recommendation: 'Funnel architecture (progressively reducing width towards output) is standard.' },
    ],
    assumptions: [
      { assumption: 'Matrix Inner Dimension Compatibility', whyItMatters: 'If W⁽ˡ⁾ has d_in != d_out of A⁽ˡ⁻¹⁾, matrix multiplication immediately crashes with a shape mismatch error.', howToVerify: 'Always assert A.shape[1] == W.shape[0] before executing forward multiplications.' },
      { assumption: 'Sufficient GPU VRAM for Activation Caches', whyItMatters: 'Large batch sizes in deep networks consume massive VRAM because intermediate activations A⁽ˡ⁾ for all layers must be kept in memory for backpropagation.', howToVerify: 'Monitor VRAM during training; use gradient checkpointing if memory runs out.' },
    ],
    commonMistakes: [
      { mistake: 'Transposing weight matrices incorrectly during forward pass', whyWrong: 'Using W @ X instead of X @ W causes dimension mismatch when processing batch tensors.', howToFix: 'Adopt the consistent convention: X has shape (N, d_in) and W has shape (d_in, d_out) so X @ W yields (N, d_out).', solution: 'Z = X @ W + b' },
      { mistake: 'Discarding intermediate activations before backpropagation', whyWrong: 'Without cached A⁽ˡ⁻¹⁾ and Z⁽ˡ⁾, computing weight gradients ∂L/∂W during backprop is mathematically impossible without re-running forward passes.', howToFix: 'Always cache (A_prev, W, b, Z) during forward evaluation.', solution: 'caches.append((A_prev, W, b, Z))' },
    ],
    realWorldUseCases: [
      { industry: 'Autonomous Robotics', application: 'Real-Time Inference Engines', benefit: 'Compiled TensorRT / ONNX models execute forward passes in sub-millisecond cycles with zero backward graph overhead.' },
      { industry: 'Speech Recognition', application: 'Audio Spectrogram Inference', benefit: 'Processes streaming audio chunks through forward convolution blocks in real time.' },
      { industry: 'Financial Risk Management', application: 'Credit Risk Scoring Service', benefit: 'Executes forward propagation on millions of consumer credit profiles overnight in microservices.' },
    ],
    practiceQuestions: [
      { id: 'dl05-q1', question: 'If an input tensor X has shape (64, 128) and layer 1 has weight matrix W1 of shape (128, 256), what is the shape of Z1?', hint: 'Recall matrix multiplication (N, K) @ (K, M) -> (N, M).', answer: 'Shape of Z1 is (64, 256).', explanation: 'The inner dimension 128 contracts, leaving batch size 64 and output feature width 256.' },
      { id: 'dl05-q2', question: 'Why must intermediate activations be cached during forward propagation if we are training the model?', hint: 'What does the weight gradient ∂L/∂W depend on during backpropagation?', answer: 'The gradient of the loss with respect to weights W⁽ˡ⁾ is given by (A⁽ˡ⁻¹⁾)ᵀ · δ⁽ˡ⁾, which requires the previous layer’s activation matrix A⁽ˡ⁻¹⁾.', explanation: 'Without the cached activation, the weight gradient cannot be computed.' },
    ],
    quiz: [
      {
        id: 'dl05-qz1',
        question: 'What is the shape of the output matrix when batch matrix A (shape 32 x 64) multiplies weight matrix W (shape 64 x 16)?',
        options: [
          '64 x 64',
          '32 x 16',
          '16 x 32',
          '32 x 64',
        ],
        correctIndex: 1,
        explanation: 'Matrix multiplication of (32, 64) with (64, 16) yields an output matrix of shape (32, 16).',
      },
      {
        id: 'dl05-qz2',
        question: 'Why do deep learning frameworks store an "activation cache" during the forward pass?',
        options: [
          'To save battery life on the computer',
          'To provide the intermediate activation values required by the chain rule during the backward pass',
          'To export the model to PDF format',
          'To verify that the dataset contains no negative values',
        ],
        correctIndex: 1,
        explanation: 'Backpropagation requires the exact forward activations A⁽ˡ⁻¹⁾ and pre-activations Z⁽ˡ⁾ to calculate analytical parameter gradients.',
      },
      {
        id: 'dl05-qz3',
        question: 'What does batch vectorization achieve compared to looping over individual training samples?',
        options: [
          'It reduces the number of epochs required to 1',
          'It runs parallel matrix operations on hardware accelerators (SIMD/GPUs), increasing throughput by orders of magnitude',
          'It eliminates the need for activation functions',
          'It guarantees zero training loss',
        ],
        correctIndex: 1,
        explanation: 'Batch vectorization utilizes modern CPU/GPU matrix multiplication units (GEMM) to process entire batches in parallel.',
      },
    ],
    independentExercise: {
      id: 'dl05-ex',
      title: 'Trace Multi-Layer Tensor Shapes',
      problem: 'Write a Python function `check_layer_shapes(batch_size, layer_dims)` that prints the exact shape of X, W1, b1, Z1, W2, b2, Z2, etc., and returns True if all dimensions align.',
      hints: ['For layer l, W[l] shape is (dims[l-1], dims[l]) and b[l] shape is (1, dims[l]).'],
      starterCode: `def check_layer_shapes(batch_size, layer_dims):
    # Iterate through layer transitions and print shapes
    pass

check_layer_shapes(32, [784, 256, 128, 10])
`,
      solution: `def check_layer_shapes(batch_size, layer_dims):
    print(f"Input X shape: ({batch_size}, {layer_dims[0]})")
    for l in range(1, len(layer_dims)):
        w_shape = (layer_dims[l-1], layer_dims[l])
        b_shape = (1, layer_dims[l])
        z_shape = (batch_size, layer_dims[l])
        print(f"Layer {l}: W={w_shape}, b={b_shape} -> Output={z_shape}")
    return True

check_layer_shapes(32, [784, 256, 128, 10])`,
    },
    summary: {
      keyTakeaways: [
        'Vectorized forward propagation calculates Z⁽ˡ⁾ = A⁽ˡ⁻¹⁾ W⁽ˡ⁾ + b⁽ˡ⁾ and A⁽ˡ⁾ = σ(Z⁽ˡ⁾) across the entire batch simultaneously.',
        'Batch size N remains invariant across all layers, while feature dimensions transform according to weight matrix dimensions.',
        'Always cache forward activations A and pre-activations Z to enable backpropagation.',
      ],
      nextLessonId: 'dl-06-calculus-gradients',
      nextLessonTitle: 'DL-06: Calculus for Neural Networks',
      nextLessonModuleId: 'dl-module-2',
    },
  },
};

