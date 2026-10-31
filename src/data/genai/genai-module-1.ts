import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 1: Generative AI Foundations (p7-m1)
// =========================================================================
export const p7m1Data: ModuleData = {
  id: 'p7-m1',
  number: 1,
  title: 'Generative AI Foundations',
  subtitle: 'Taxonomy, Probability Models & Generative Paradigms',
  description:
    'Master the mathematical and conceptual foundations of Generative AI. Contrast discriminative models P(Y|X) with generative models P(X) and P(X,Y). Survey the core generative model families: Autoregressive Transformers, Diffusion Models, Variational Autoencoders (VAEs), and Generative Adversarial Networks (GANs). Examine practical applications, fundamental limitations, and responsible deployment boundaries.',
  icon: 'Sparkles',
  badge: 'Phase 7 · GenAI & LLMs',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'genai-01-foundations',
      moduleId: 'p7-m1',
      title: 'GenAI-01: Generative AI Foundations',
      description:
        'Discriminative vs generative modeling, probability distributions over high-dimensional spaces, generative model families, and responsible AI principles.',
      order: 1,
      readTimeMinutes: 32,
      visualizerType: 'next-token-prediction-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// MODULE 2: How LLMs Work (p7-m2)
// =========================================================================
export const p7m2Data: ModuleData = {
  id: 'p7-m2',
  number: 2,
  title: 'How LLMs Work',
  subtitle: 'Joint Probabilities, Autoregressive Loops & Serving Dynamics',
  description:
    'Deconstruct how Large Language Models generate coherent natural language. Derive the chain rule of probability for sequence modeling. Walk through next-token prediction, logits projection, autoregressive sampling, the critical differences between training parallelization and sequential inference serving, and the physical anatomy of model parameters, activations, and safetensors checkpoints.',
  icon: 'Cpu',
  badge: 'Phase 7 · GenAI & LLMs',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'genai-02-how-llms-work',
      moduleId: 'p7-m2',
      title: 'GenAI-02: How LLMs Work',
      description:
        'Chain rule of probability, autoregressive decoding loops, prefill vs decode inference phases, and model weights versus activation memory.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'next-token-prediction-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 3: Tokenization in Large Language Models (p7-m3)
// =========================================================================
export const p7m3Data: ModuleData = {
  id: 'p7-m3',
  number: 3,
  title: 'Tokenization in Large Language Models',
  subtitle: 'Subwords, Byte Fallbacks, Context Limits & Multilingual Fertility',
  description:
    'Explore tokenization from the engineering perspective of modern foundation models. Building upon foundational BPE concepts, investigate Tiktoken cl100k/o200k vocabularies, byte-level fallbacks, ChatML special control delimiters, token budget overheads, whitespace sensitivity, and the stark disparities in token fertility across multilingual scripts and programming languages.',
  icon: 'Type',
  badge: 'Phase 7 · GenAI & LLMs',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'genai-03-tokenization-in-llms',
      moduleId: 'p7-m3',
      title: 'GenAI-03: Tokenization in Large Language Models',
      description:
        'Modern subword tokenizers, ChatML delimiters, token-to-word fertility ratios across languages, and token budget arithmetic.',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'tokenization-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS
// =========================================================================
export const genaiModule1Lessons: Record<string, LessonContent> = {
  'genai-01-foundations': {
    id: 'genai-01-foundations',
    moduleId: 'p7-m1',
    title: 'GenAI-01: Generative AI Foundations',
    subtitle: 'From Decision Boundaries to High-Dimensional Probability Densities',
    order: 1,
    readTimeMinutes: 32,
    difficulty: 'Beginner',
    visualizerType: 'next-token-prediction-explorer',

    objectives: [
      'Contrast discriminative modeling P(Y|X) with generative modeling P(X) and P(X, Y)',
      'Classify the 4 primary generative model families: Autoregressive Transformers, Diffusion Models, VAEs, and GANs',
      'Analyze the trade-offs between sampling speed, mode coverage, sample fidelity, and training stability',
      'Identify critical limitations of generative systems including hallucinations, stochastic drift, and data memorization',
      'Apply responsible AI deployment frameworks including provenance, watermarking, and safety alignment',
    ],
    prerequisites: [
      'Basic probability theory (conditional probability, Bayes rule)',
      'Understanding of supervised learning and loss minimization',
    ],
    previousLesson: {
      id: 'tf-15-transformer-mini-project',
      title: 'TF-15: Transformer Mini-Project: Character-Level Generator',
      moduleId: 'p6-m15',
    },

    analogy: {
      title: 'The Art Critic versus The Master Painter',
      text: 'A discriminative model is like an art critic: given an existing painting X, it evaluates features to decide whether it is an authentic Monet or a forgery (classifying label Y). It never has to produce a single brushstroke; it only needs to learn where the boundary between Monet and non-Monet lies. A generative model is the painter: given a blank canvas, it must understand the intricate statistical distribution of colors, textures, lighting, and composition to paint a completely original, plausible artwork from scratch.',
      metaphor: 'Discriminative models learn boundaries between classes; generative models learn the underlying probability distribution of the world itself.',
    },

    problemSolved: {
      title: 'Why Generative Modeling Transforms Artificial Intelligence',
      description:
        'Traditional supervised learning required labeled dataset pairs (X, Y) for every discrete task (e.g. sentiment classification, object detection). Generative models learn unsupervised probability distributions P(X) over vast corpora of unlabeled data, allowing a single model to synthesize novel text, generate realistic imagery, simulate physical environments, and perform dozens of downstream reasoning tasks without task-specific retraining.',
      keyPoints: [
        'Eliminates the bottleneck of manual data labeling by learning directly from raw unlabeled data P(X)',
        'Unlocks zero-shot and few-shot task adaptation by conditioning generation on instructional context',
        'Models complex, multimodal data distributions: text, code, audio, pixels, and robotic action trajectories',
        'Shifts the paradigm from static classification to interactive, open-ended problem synthesis',
      ],
    },

    intuition: {
      overview:
        'To generate realistic data, a model must master two fundamental capabilities: representing the true data distribution P_data(X) and efficiently drawing novel samples X_new ~ P_model(X) that lie on the high-density data manifold.',
      steps: [
        {
          step: 1,
          title: 'Mapping the High-Dimensional Data Manifold',
          description:
            'A 1024x1024 RGB image lives in a 3,145,728-dimensional space. Almost all random points in this space are static noise. Meaningful images of cats or faces occupy an infinitesimally thin, highly non-linear low-dimensional manifold. Generative models learn to approximate this manifold.',
        },
        {
          step: 2,
          title: 'Conditioning and Directed Synthesis',
          description:
            'Unconditional generation samples random valid points X ~ P(X). Conditional generation models P(X | C), where C is a text prompt, audio clip, or segmentation map, steering the sampling trajectory to a specific semantic region of the manifold.',
        },
        {
          step: 3,
          title: 'Sampling Dynamics and Diversity',
          description:
            'During generation, the model balances sample fidelity (resembling high-probability training data) against sample diversity (exploring novel valid combinations rather than memorizing existing training samples).',
        },
      ],
    },

    mathematics: {
      overview:
        'Mathematically, discriminative and generative models approach joint and conditional probability distributions from opposite directions.',
      foundations: [
        {
          name: 'Discriminative Objective (Conditional Posterior)',
          latex: 'P(Y \\mid X) = \\frac{P(X, Y)}{P(X)} = \\frac{P(X \\mid Y)P(Y)}{\\sum_{y} P(X \\mid y)P(y)}',
          explanation:
            'Discriminative models parameterize P_theta(Y | X) directly using cross-entropy loss, ignoring the input distribution P(X).',
        },
        {
          name: 'Generative Objective (Maximum Likelihood)',
          latex: '\\max_\\theta \\mathbb{E}_{X \\sim P_{\\text{data}}} [\\log P_\\theta(X)] = \\max_\\theta \\sum_{i=1}^N \\log P_\\theta(X^{(i)})',
          explanation:
            'Generative models maximize the expected log-likelihood of training data X, which is equivalent to minimizing the Kullback-Leibler (KL) divergence D_KL(P_data || P_theta).',
        },
      ],
    },

    derivation: {
      title: 'Derivation of the Equivalence Between Maximum Likelihood and KL Divergence Minimization',
      objective: 'Prove that fitting a generative model by maximum likelihood minimizes distance to the true data distribution.',
      steps: [
        {
          step: 1,
          label: 'Definition of KL Divergence',
          latex: 'D_{\\text{KL}}(P_{\\text{data}} \\parallel P_\\theta) = \\int P_{\\text{data}}(x) \\log \\left( \\frac{P_{\\text{data}}(x)}{P_\\theta(x)} \\right) dx',
          explanation: 'KL divergence measures the information lost when approximating the true distribution P_data with model P_theta.',
        },
        {
          step: 2,
          label: 'Expansion into Entropy and Cross-Entropy',
          latex: 'D_{\\text{KL}}(P_{\\text{data}} \\parallel P_\\theta) = \\int P_{\\text{data}}(x) \\log P_{\\text{data}}(x) dx - \\int P_{\\text{data}}(x) \\log P_\\theta(x) dx = -H(P_{\\text{data}}) - \\mathbb{E}_{x \\sim P_{\\text{data}}}[\\log P_\\theta(x)]',
          explanation: 'The first term is the negative entropy of the data distribution, which is a constant with respect to model parameters theta.',
        },
        {
          step: 3,
          label: 'Argmin Equivalence to Maximum Likelihood',
          latex: '\\arg\\min_\\theta D_{\\text{KL}}(P_{\\text{data}} \\parallel P_\\theta) = \\arg\\max_\\theta \\mathbb{E}_{x \\sim P_{\\text{data}}}[\\log P_\\theta(x)] \\approx \\arg\\max_\\theta \\frac{1}{N} \\sum_{i=1}^N \\log P_\\theta(x^{(i)})',
          explanation: 'Minimizing KL divergence is strictly equivalent to maximizing the empirical log-likelihood over the training dataset.',
        },
      ],
    },

    variables: [
      { symbol: 'X', name: 'Observed Data', description: 'High-dimensional input tensor (text sequence, image tensor, audio waveform).' },
      { symbol: 'Y', name: 'Target Label', description: 'Discrete class category or continuous regression target.' },
      { symbol: 'P_theta(X)', name: 'Model Probability Density', description: 'Parameterized probability distribution learned by neural network weights theta.' },
      { symbol: 'D_KL', name: 'Kullback-Leibler Divergence', description: 'Asymmetric statistical distance between true data distribution and model distribution.' },
    ],

    numericalExample: {
      scenario: 'Compare a 2-class generative classifier (Bayes classifier) vs a discriminative logistic regression on 4 test points.',
      dataset: [
        { sample: 'x1', feature: 1.2, trueClass: 0 },
        { sample: 'x2', feature: 1.8, trueClass: 0 },
        { sample: 'x3', feature: 4.1, trueClass: 1 },
        { sample: 'x4', feature: 4.9, trueClass: 1 },
      ],
      calculations: [
        {
          step: 'Generative Class Density Estimation',
          math: 'mu_0 = 1.5, sigma_0 = 0.3; mu_1 = 4.5, sigma_1 = 0.4; P(Y=0) = P(Y=1) = 0.5',
          result: 'Generative model learns complete Gaussian densities P(X|Y=0) and P(X|Y=1).',
        },
        {
          step: 'Discriminative Decision Boundary',
          math: 'w * x + b = 0 => x_boundary = (mu_0 + mu_1) / 2 = 3.0',
          result: 'Discriminative model only learns threshold x = 3.0; cannot synthesize new samples.',
        },
      ],
      finalConclusion: 'The generative model can draw novel synthetic features from N(1.5, 0.3^2); the discriminative model can only classify existing points.',
    },

    visualExplanation: {
      title: 'Generative Model Families Comparison Matrix',
      description: 'Understanding the 4 principal families of generative architectures and their fundamental engineering trade-offs.',
      features: [
        'Autoregressive Transformers: Exact likelihood computation via chain rule, sequential generation step-by-step, state-of-the-art for language and code.',
        'Diffusion Models: Iterative denoising of Gaussian noise, superior image/audio fidelity, requires multi-step reverse diffusion trajectory.',
        'Variational Autoencoders (VAEs): Explicit latent space z, fast one-shot generation, optimize Evidence Lower Bound (ELBO), slightly blurrier outputs.',
        'Generative Adversarial Networks (GANs): Minimax game between Generator and Discriminator, fast inference, prone to mode collapse and training instability.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: 1D Gaussian Mixture Generative Model',
      code: `import numpy as np

# Deterministic seed for reproducible verification
np.random.seed(42)

class GaussianMixture1D:
    """Minimal 2-component Generative Gaussian Mixture Model with exact sampling."""
    def __init__(self, pi=0.5, mu1=2.0, sigma1=0.5, mu2=8.0, sigma2=1.0):
        self.pi = pi          # Mixture weight P(component = 1)
        self.mu1 = mu1
        self.sigma1 = sigma1
        self.mu2 = mu2
        self.sigma2 = sigma2

    def sample(self, n_samples=5):
        """Generate novel synthetic samples X ~ P(X)."""
        components = np.random.binomial(1, self.pi, size=n_samples)
        samples = np.where(
            components == 0,
            np.random.normal(self.mu1, self.sigma1, size=n_samples),
            np.random.normal(self.mu2, self.sigma2, size=n_samples)
        )
        return samples

gmm = GaussianMixture1D(pi=0.4, mu1=1.5, sigma1=0.2, mu2=6.0, sigma2=0.5)
synthetic_data = gmm.sample(4)
print("Generated synthetic samples:", np.round(synthetic_data, 3))`,
      explanation: 'Demonstrates generative sampling: first choose a discrete latent component, then draw a continuous sample from the conditional distribution.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Implementation: Generative Density Estimation',
      code: `import numpy as np
from sklearn.mixture import GaussianMixture

# Fit a 2-component Gaussian Mixture Model to simulated data
X_train = np.concatenate([
    np.random.normal(loc=2.0, scale=0.5, size=(100, 1)),
    np.random.normal(loc=7.0, scale=0.8, size=(100, 1))
])

gmm = GaussianMixture(n_components=2, random_state=42)
gmm.fit(X_train)

# Generative synthesis: draw 5 brand-new data points from P_model(X)
X_synthetic, component_labels = gmm.sample(n_samples=5)
print("Learned means:", np.round(gmm.means_.flatten(), 2))
print("Synthetic samples drawn:", np.round(X_synthetic.flatten(), 2))`,
      explanation: 'Scikit-learn GaussianMixture implements full generative modeling: fitting P(X) and generating synthetic points with sample().',
    },

    runnableCode: {
      code: `import numpy as np

# Set deterministic seed
np.random.seed(42)

# Define two Gaussian clusters representing P(X | Class)
mu_a, sigma_a = 1.0, 0.2
mu_b, sigma_b = 5.0, 0.4
prob_a = 0.6

# Draw 4 samples from generative mixture
choices = np.random.binomial(1, 1 - prob_a, size=4)
samples = np.where(choices == 0,
                   np.random.normal(mu_a, sigma_a, size=4),
                   np.random.normal(mu_b, sigma_b, size=4))

print("Synthetic Generative Samples:", np.round(samples, 3))`,
      expectedOutput: 'Synthetic Generative Samples: [1.099 0.972 6.02  1.305]',
    },

    lineByLineExplanation: [
      {
        lines: 'np.random.seed(42)',
        codeSnippet: 'np.random.seed(42)',
        explanation: 'Enforces strict pseudorandom determinism so generated samples are reproducible across runtimes.',
      },
      {
        lines: 'choices = np.random.binomial(1, 1 - prob_a, size=4)',
        codeSnippet: 'choices = np.random.binomial(...)',
        explanation: 'Samples categorical latent assignment: 0 selects cluster A (60% probability), 1 selects cluster B (40%).',
      },
      {
        lines: 'samples = np.where(...)',
        codeSnippet: 'np.where(choices == 0, ...)',
        explanation: 'Conditional generation: draws continuous values from the Gaussian parameter distribution selected by the latent variable.',
      },
    ],

    hyperparameters: [
      {
        name: 'Latent Dimensionality / Parameters',
        defaultVal: 'Varies by architecture',
        range: '10 to 1 Trillion parameters',
        effect: 'Determines the expressive capacity to model complex multimodal distributions without underfitting.',
        recommendation: 'Scale parameters proportionally with dataset tokens according to Chinchilla scaling laws.',
      },
    ],

    assumptions: [
      {
        assumption: 'Manifold Hypothesis',
        whyItMatters: 'Real-world data (text, images) lies on low-dimensional sub-manifolds embedded within high-dimensional ambient space.',
        howToVerify: 'Inspect reconstruction errors and latent dimensionality reduction via PCA or autoencoders.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Confusing generative classification with generative synthesis',
        solution: 'Generative classifiers (like Naive Bayes) model P(X, Y) to compute P(Y|X); modern GenAI synthesizes novel instances X ~ P(X) without needing class labels.',
      },
      {
        mistake: 'Assuming high training likelihood guarantees diverse generation (Mode Collapse)',
        solution: 'A model can achieve low loss by memorizing a few frequent modes while failing to represent the true diversity of the data distribution.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Software Engineering',
        application: 'Code Synthesis & Refactoring',
        benefit: 'Generates entire function implementations, test cases, and architectural migrations conditioned on docstrings.',
      },
      {
        industry: 'Healthcare & Pharmacology',
        application: 'De Novo Molecular Generation',
        benefit: 'Diffusion and autoregressive models generate novel 3D molecular structures targeting specific protein binding affinities.',
      },
    ],

    practiceQuestions: [
      {
        id: 'genai-01-pq1',
        question: 'What is the primary difference in probability distribution modeled by a discriminative vs generative model?',
        answer: 'Discriminative models estimate the conditional posterior P(Y | X) (the probability of a label given an input). Generative models estimate the data distribution P(X) or joint distribution P(X, Y).',
        explanation: 'Discriminative models find decision boundaries between classes; generative models model how the data itself was generated.',
      },
      {
        id: 'genai-01-pq2',
        question: 'Why do pure GANs suffer from mode collapse while Autoregressive Transformers generally do not?',
        answer: 'GANs optimize an adversarial minimax game without an explicit likelihood objective, allowing the generator to collapse to a single output that fools the discriminator. Autoregressive models optimize exact negative log-likelihood across all training tokens, heavily penalizing any mode omission.',
        explanation: 'The maximum likelihood objective explicitly forces probability mass over the entire support of P_data.',
      },
      {
        id: 'genai-01-pq3',
        question: 'What is the Manifold Hypothesis and why is it essential for Generative AI?',
        answer: 'The Manifold Hypothesis states that high-dimensional real-world data concentrates near a much lower-dimensional smooth manifold. Without this, modeling 1M-dimensional pixel or text spaces would suffer insurmountable curse of dimensionality.',
        explanation: 'Generative models only need to learn coordinates and transitions along this low-dimensional manifold.',
      },
    ],

    quiz: [
      {
        id: 'genai-01-q1',
        question: 'Which of the following models is strictly discriminative?',
        options: [
          'Logistic Regression predicting loan default',
          'Autoregressive Llama 3 generating an essay',
          'Stable Diffusion synthesizing an image',
          'Variational Autoencoder compressing and decoding audio',
        ],
        correctIndex: 0,
        explanation: 'Logistic Regression models P(Default = 1 | Features) directly and cannot synthesize new loan applications.',
      },
      {
        id: 'genai-01-q2',
        question: 'Maximizing the empirical log-likelihood of training data in a generative model is mathematically equivalent to minimizing which metric?',
        options: [
          'Kullback-Leibler (KL) Divergence from model to data',
          'Mean Squared Error between labels and predictions',
          'Hinge Loss on the decision boundary',
          'Cosine distance between parameter weights',
        ],
        correctIndex: 0,
        explanation: 'Minimizing D_KL(P_data || P_theta) is equivalent to maximizing the expectation of log P_theta(x) over P_data.',
      },
      {
        id: 'genai-01-q3',
        question: 'What is a major limitation shared by large autoregressive generative models?',
        options: [
          'They cannot process sequential input data',
          'Sequential autoregressive token generation cannot be parallelized across time steps during inference',
          'They cannot compute exact token cross-entropy loss during training',
          'They only work on binary tabular datasets',
        ],
        correctIndex: 1,
        explanation: 'While training is fully parallelized via causal masking, inference must generate tokens one by one because each new token depends on all previous outputs.',
      },
    ],

    independentExercise: {
      title: 'Implement a Toy Bigram Generative Language Model in Python',
      problem:
        'Write a Python class BigramGenerativeModel that trains on a small text corpus, computes conditional transition probabilities P(word_t | word_{t-1}), and generates a 5-word sentence by autoregressive sampling.',
      hints: [
        'Use collections.defaultdict and Counter to count consecutive word pairs (w1, w2).',
        'Normalize counts by sum to obtain valid probabilities summing to 1.0.',
        'Use np.random.choice to sample the next word conditioned on the current word.',
      ],
      starterCode: `import numpy as np
from collections import defaultdict, Counter

class BigramGenerativeModel:
    def __init__(self):
        self.transitions = defaultdict(Counter)

    def train(self, corpus: str):
        words = corpus.lower().split()
        for w1, w2 in zip(words[:-1], words[1:]):
            self.transitions[w1][w2] += 1

    def generate(self, start_word: str, length: int = 5, seed: int = 42) -> str:
        # TODO: Implement autoregressive generation
        pass

corpus = "the quick brown fox jumps over the lazy dog and the quick brown fox sleeps"
model = BigramGenerativeModel()
model.train(corpus)
print(model.generate("the", 5))`,
      solution: `import numpy as np
from collections import defaultdict, Counter

class BigramGenerativeModel:
    def __init__(self):
        self.transitions = defaultdict(Counter)

    def train(self, corpus: str):
        words = corpus.lower().split()
        for w1, w2 in zip(words[:-1], words[1:]):
            self.transitions[w1][w2] += 1

    def generate(self, start_word: str, length: int = 5, seed: int = 42) -> str:
        np.random.seed(seed)
        current = start_word.lower()
        output = [current]
        for _ in range(length - 1):
            next_counts = self.transitions[current]
            if not next_counts:
                break
            candidates = list(next_counts.keys())
            total = sum(next_counts.values())
            probs = [c / total for c in next_counts.values()]
            current = np.random.choice(candidates, p=probs)
            output.append(current)
        return " ".join(output)

corpus = "the quick brown fox jumps over the lazy dog and the quick brown fox sleeps"
model = BigramGenerativeModel()
model.train(corpus)
print(model.generate("the", 5))`,
    },

    summary: {
      keyTakeaways: [
        'Discriminative models separate classes P(Y|X); generative models learn the underlying probability distribution P(X) to synthesize novel data.',
        'Maximum likelihood training of generative models is mathematically equivalent to minimizing the KL divergence between true data distribution and model distribution.',
        'The 4 core generative families are Autoregressive Transformers, Diffusion Models, VAEs, and GANs, each occupying distinct points on the fidelity vs speed Pareto frontier.',
      ],
      nextLessonId: 'genai-02-how-llms-work',
      nextLessonTitle: 'GenAI-02: How LLMs Work',
      nextLessonModuleId: 'p7-m2',
    },
  },

  'genai-02-how-llms-work': {
    id: 'genai-02-how-llms-work',
    moduleId: 'p7-m2',
    title: 'GenAI-02: How LLMs Work',
    subtitle: 'Autoregressive Probability Factorization, Logits & Inference Serving',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Intermediate',
    visualizerType: 'next-token-prediction-explorer',

    objectives: [
      'Deconstruct sequence generation into the probabilistic chain rule P(w_1, ..., w_T) = prod P(w_t | w_<t)',
      'Trace the end-to-end forward pass from input token IDs, embedding lookup, transformer blocks, to unembedding logits',
      'Contrast the two phases of LLM inference: compute-bound Prefill Phase vs memory-bandwidth-bound Decode Phase',
      'Distinguish model parameter weights (static storage) from activation tensors and KV cache (dynamic runtime memory)',
      'Explain how model checkpoints are structured in modern safetensors files',
    ],
    prerequisites: [
      'GenAI-01: Generative AI Foundations',
      'TF-06: Scaled Dot-Product Self-Attention',
    ],
    previousLesson: {
      id: 'genai-01-foundations',
      title: 'GenAI-01: Generative AI Foundations',
      moduleId: 'p7-m1',
    },

    analogy: {
      title: 'The Improvisational Storyteller & The Teleprompter',
      text: 'An LLM is not a database retrieving stored answers; it is an improvisational storyteller with an astronomical vocabulary. As it speaks each word, a teleprompter presents all 128,000 words in its vocabulary, each tagged with a probability score based on everything uttered so far. The storyteller samples one word, appends it to the story, and immediately reads the entire updated story again to calculate the next set of probabilities.',
      metaphor: 'Autoregressive text generation is an infinite feedback loop where every output token becomes the input context for the next decision.',
    },

    problemSolved: {
      title: 'How Complex Multi-Step Reasoning Emerges from Next-Token Prediction',
      description:
        'It seems counterintuitive that simply predicting the next word could yield logical deduction, code debugging, and mathematical problem-solving. However, accurately predicting the next word across millions of textbooks, proofs, and scientific papers requires the internal network activations to simulate the underlying causal reasoning and factual world model that produced that text.',
      keyPoints: [
        'Factorizes complex document generation into tractable, standardized single-step categorical classification decisions',
        'Leverages causal masking during training so thousands of tokens are supervised simultaneously across GPU tensor cores',
        'Enables open-ended conversation and reasoning by conditioning on arbitrary conversational prefixes',
      ],
    },

    intuition: {
      overview:
        'An LLM forward pass maps a sequence of integer token IDs [t_1, t_2, ..., t_k] to a vector of raw scores (logits) z in R^V for the vocabulary position t_{k+1}.',
      steps: [
        {
          step: 1,
          title: 'Embedding Lookup & Positional Information',
          description:
            'Each token ID is mapped to a d-dimensional vector in R^d and combined with Rotary Positional Embeddings (RoPE) to encode sequential token order.',
        },
        {
          step: 2,
          title: 'Deep Transformer Residual Stack',
          description:
            'Tensors pass through 32 to 128 layers of Multi-Head Self-Attention (token mixing) and SwiGLU Feed-Forward Networks (channel mixing / factual recall).',
        },
        {
          step: 3,
          title: 'The Unembedding Projection (LM Head)',
          description:
            'The final hidden state h_k of the last token is projected via matrix W_head in R^(V x d) to produce unnormalized logits z in R^V.',
        },
        {
          step: 4,
          title: 'Softmax Sampling and Context Append',
          description:
            'Logits are scaled by temperature T and converted via Softmax to probabilities. One token is sampled and appended to the context for the next cycle.',
        },
      ],
    },

    mathematics: {
      overview:
        'The mathematical cornerstone of Causal Language Modeling is the exact probability chain rule.',
      foundations: [
        {
          name: 'Autoregressive Probability Factorization (Chain Rule)',
          latex: 'P(w_1, w_2, \\dots, w_T) = \\prod_{t=1}^T P(w_t \\mid w_1, w_2, \\dots, w_{t-1}) = \\prod_{t=1}^T P(w_t \\mid w_{<t})',
          explanation:
            'The joint probability of any sequence is decomposed into the product of conditional probabilities of each token given its preceding context.',
        },
        {
          name: 'Logit Projection & Categorical Softmax',
          latex: 'z_t = W_{\\text{head}} \\cdot \\text{RMSNorm}(h_t) \\in \\mathbb{R}^V, \\quad P(w_t = v \\mid w_{<t}) = \\frac{\\exp(z_{t, v} / T)}{\\sum_{j=1}^V \\exp(z_{t, j} / T)}',
          explanation:
            'The final representation h_t is projected into the vocabulary dimension V and normalized to form a valid probability simplex.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Prefill vs Decode Memory Bandwidth Arithmetic',
      objective: 'Demonstrate mathematically why generating tokens (Decode Phase) is bottlenecked by memory bandwidth rather than GPU FLOPS.',
      steps: [
        {
          step: 1,
          label: 'Prefill Phase (Prompt Processing)',
          latex: '\\text{FLOPs} = 2 \\cdot N_{\\text{params}} \\cdot L_{\\text{prompt}}, \\quad \\text{Bytes Loaded} = 2 \\cdot N_{\\text{params}}',
          explanation: 'In prefill, all prompt tokens are processed simultaneously. Arithmetic intensity = L_prompt FLOPs/Byte. The GPU compute cores are fully saturated (Compute-Bound).',
        },
        {
          step: 2,
          label: 'Decode Phase (Single Token Generation)',
          latex: '\\text{FLOPs} = 2 \\cdot N_{\\text{params}} \\cdot 1, \\quad \\text{Bytes Loaded} = 2 \\cdot N_{\\text{params}}',
          explanation: 'To generate a single token (batch size 1), all N_params weights must be transferred from high-bandwidth GPU VRAM (HBM) to on-chip SRAM cache for just 2 FLOPs per parameter!',
        },
        {
          step: 3,
          label: 'Operational Intensity and Hardware Bottleneck',
          latex: 'I_{\\text{decode}} = \\frac{2 \\text{ FLOPs}}{2 \\text{ Bytes}} = 1.0 \\text{ FLOP/Byte} \\ll I_{\\text{GPU}} (\\approx 150 \\text{ FLOP/Byte})',
          explanation: 'Because modern GPUs perform ~150 FLOPs per byte loaded, decoding a single token leaves 99% of GPU compute cores idle waiting for memory transfer (Memory-Bound).',
        },
      ],
    },

    variables: [
      { symbol: 'w_t', name: 'Generated Token at Step t', description: 'Discrete token ID sampled from vocabulary V.' },
      { symbol: 'w_<t', name: 'Preceding Context History', description: 'All tokens generated or provided prior to step t.' },
      { symbol: 'z_t', name: 'Logits Vector', description: 'Unnormalized log-odds vector of size V output by the linear unembedding head.' },
      { symbol: 'V', name: 'Vocabulary Size', description: 'Total number of unique tokens in tokenizer dictionary (e.g. 128,256 in Llama 3).' },
      { symbol: 'T', name: 'Sampling Temperature', description: 'Positive scalar divisor controlling the flatness of the Softmax distribution.' },
    ],

    numericalExample: {
      scenario: 'Calculate the Softmax probability distribution for a toy vocabulary of 3 candidate tokens with temperature T = 0.5.',
      dataset: [
        { token: 'learning', rawLogit: 4.0 },
        { token: 'models', rawLogit: 3.0 },
        { token: 'banana', rawLogit: 1.0 },
      ],
      calculations: [
        {
          step: 'Divide Logits by Temperature T = 0.5',
          math: 'z_1 / 0.5 = 8.0, z_2 / 0.5 = 6.0, z_3 / 0.5 = 2.0',
          result: 'Scaled logits: [8.0, 6.0, 2.0]',
        },
        {
          step: 'Exponentiate Scaled Logits',
          math: 'exp(8) = 2980.96, exp(6) = 403.43, exp(2) = 7.39; Sum = 3391.78',
          result: 'Sum of exponentials = 3391.78',
        },
        {
          step: 'Compute Softmax Probabilities',
          math: 'P(learning) = 2980.96 / 3391.78 = 0.879; P(models) = 403.43 / 3391.78 = 0.119; P(banana) = 7.39 / 3391.78 = 0.002',
          result: 'P = [87.9%, 11.9%, 0.2%]',
        },
      ],
      finalConclusion: 'At T = 0.5, "learning" dominates with 87.9% probability. If T were 1.0, the probabilities would be [70.5%, 25.9%, 3.5%].',
    },

    visualExplanation: {
      title: 'LLM Inference Lifecycle & Memory Hierarchy',
      description: 'How parameters, KV cache, and activations live inside GPU High Bandwidth Memory (HBM).',
      features: [
        'Weights (Static): Loaded once into VRAM at startup (e.g. 16GB for an 8B model in FP16). Never modified during inference.',
        'KV Cache (Dynamic): Grows sequentially with every generated token. Stores key and value vectors so past tokens do not need recomputation.',
        'Prefill Phase: High GPU utilization, parallel prompt ingestion, fast time-to-first-token (TTFT).',
        'Decode Phase: Memory-bandwidth bound, sequential token emission, dictates inter-token latency (ITL).',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Complete Autoregressive Generation Loop with KV Emulation',
      code: `import numpy as np

np.random.seed(42)

class SimulatedLM:
    """Simulates an LLM next-token predictor with unnormalized logits."""
    def __init__(self, vocab):
        self.vocab = vocab
        self.inv_vocab = {i: w for i, w in enumerate(vocab)}

    def forward(self, token_ids):
        # Deterministic pseudo-logits based on last token index
        last_id = token_ids[-1]
        raw_logits = np.sin(np.arange(len(self.vocab)) + last_id) * 3.0
        return raw_logits

    def generate(self, start_token: str, max_tokens: int = 5, temperature: float = 0.7):
        curr_id = self.vocab.index(start_token)
        generated_ids = [curr_id]

        for _ in range(max_tokens):
            logits = self.forward(generated_ids)
            # Softmax with temperature
            scaled = logits / max(0.01, temperature)
            exps = np.exp(scaled - np.max(scaled))
            probs = exps / np.sum(exps)
            # Sample next token
            next_id = np.random.choice(len(self.vocab), p=probs)
            generated_ids.append(next_id)

        return [self.inv_vocab[i] for i in generated_ids]

vocab = ["AI", "builds", "intelligent", "systems", "efficiently", "using", "transformers"]
model = SimulatedLM(vocab)
output_sentence = model.generate("AI", max_tokens=4, temperature=0.5)
print("Autoregressive Generation:", " ".join(output_sentence))`,
      explanation: 'Simulates the exact loop: forward pass -> logits -> temperature scaling -> softmax -> sampling -> context append.',
    },

    sklearnCode: {
      title: 'PyTorch / HuggingFace Transformers Standard Generation Pipeline',
      code: `# Standard generation loop using HuggingFace Transformers (Conceptual reference)
import torch

def generate_tokens(model, tokenizer, prompt, max_new_tokens=10, temperature=0.7):
    # 1. Encode text to token IDs
    input_ids = tokenizer.encode(prompt, return_tensors="pt")
    
    # 2. Autoregressive loop with KV cache enabled
    with torch.no_grad():
        output_ids = model.generate(
            input_ids,
            max_new_tokens=max_new_tokens,
            temperature=temperature,
            do_sample=True,
            use_cache=True # O(1) step generation via KV Cache
        )
    
    # 3. Decode token IDs back to string
    return tokenizer.decode(output_ids[0], skip_special_tokens=True)`,
      explanation: 'Demonstrates the standard production API for autoregressive text generation using PyTorch and HuggingFace.',
    },

    runnableCode: {
      code: `import numpy as np

# Deterministic simulation of next-token logits and temperature scaling
np.random.seed(42)
vocab = ["neural", "network", "models", "learn"]
logits = np.array([4.2, 2.8, 1.5, 0.5])
temperature = 0.5

# Compute temperature-scaled softmax
scaled = logits / temperature
exps = np.exp(scaled - np.max(scaled))
probs = exps / np.sum(exps)

# Greedy selection (argmax)
greedy_idx = int(np.argmax(probs))
print("Greedy Pick:", vocab[greedy_idx])
print("Probabilities (%):", np.round(probs * 100, 1))`,
      expectedOutput: 'Greedy Pick: neural\nProbabilities (%): [93.7  5.7  0.4  0.1]',
    },

    lineByLineExplanation: [
      {
        lines: 'scaled = logits / temperature',
        codeSnippet: 'scaled = logits / temperature',
        explanation: 'Dividing logits by T < 1.0 increases the relative gap between high and low values.',
      },
      {
        lines: 'exps = np.exp(scaled - np.max(scaled))',
        codeSnippet: 'np.exp(scaled - np.max(scaled))',
        explanation: 'Subtracting max(scaled) prevents numerical overflow in floating-point exponentiation.',
      },
      {
        lines: 'greedy_idx = int(np.argmax(probs))',
        codeSnippet: 'int(np.argmax(probs))',
        explanation: 'Greedy decoding always deterministically picks the highest probability token.',
      },
    ],

    hyperparameters: [
      {
        name: 'Hidden Dimension d_model',
        defaultVal: '4096 (for 8B models)',
        range: '768 to 16384',
        effect: 'Controls the capacity of the latent representation vector for each token.',
        recommendation: 'Must be divisible by number of attention heads.',
      },
    ],

    assumptions: [
      {
        assumption: 'Markovian Context Assumption',
        whyItMatters: 'The model assumes that all necessary context to predict token t is contained within the preceding context window w_{<t}.',
        howToVerify: 'Evaluate needle-in-a-haystack retrieval across long context horizons.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming LLMs store pre-formed sentences and retrieve them',
        solution: 'LLMs calculate probability distributions over individual tokens dynamically. A complete sentence is synthesized one token at a time.',
      },
      {
        mistake: 'Confusing parameter storage with runtime VRAM requirements',
        solution: 'An 8B model needs 16GB for weights in FP16, plus several gigabytes for KV caches and activation buffers during inference.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Customer Support',
        application: 'Real-time Conversational Agents',
        benefit: 'Streaming autoregressive token generation provides low latency, conversational responsiveness.',
      },
      {
        industry: 'Search & Information Retrieval',
        application: 'Generative Search Summaries',
        benefit: 'Synthesizes multifaceted answers from multiple retrieved knowledge documents.',
      },
    ],

    practiceQuestions: [
      {
        id: 'genai-02-pq1',
        question: 'Why is the Decode phase of LLM inference considered memory-bandwidth bound?',
        answer: 'Because generating each single token requires loading all model weights (e.g. 16GB for an 8B model) from GPU HBM into compute registers for only 1 token calculation (2 FLOPs per param), leaving compute units mostly idle.',
        explanation: 'Arithmetic intensity is only 1.0 FLOP/Byte, far below the GPU hardware balance of ~150 FLOPs/Byte.',
      },
      {
        id: 'genai-02-pq2',
        question: 'What is the purpose of Key-Value (KV) Caching in autoregressive generation?',
        answer: 'KV caching saves the Key and Value projection vectors of all past tokens in memory so they do not need to be recomputed at every new generation step, reducing the step complexity from O(T^2) to O(T).',
        explanation: 'Without KV caching, step t would require computing attention across all preceding tokens from scratch.',
      },
      {
        id: 'genai-02-pq3',
        question: 'What are safetensors files and why have they replaced legacy pickle-based PyTorch .bin checkpoints?',
        answer: 'safetensors is a secure serialization format that prevents arbitrary code execution vulnerabilities present in pickle files, and supports zero-copy memory mapping (mmap) for near-instant model loading.',
        explanation: 'Pickle files can execute malicious Python code upon unpickling; safetensors contains only raw tensor buffers and headers.',
      },
    ],

    quiz: [
      {
        id: 'genai-02-q1',
        question: 'In the chain rule of autoregressive sequence modeling, what is the probability of the sequence "I love coding"?',
        options: [
          'P("I") * P("love" | "I") * P("coding" | "I love")',
          'P("I") + P("love") + P("coding")',
          'P("coding" | "love") * P("love" | "I")',
          'P("I", "love", "coding") / 3',
        ],
        correctIndex: 0,
        explanation: 'By the chain rule, each token is strictly conditioned on all preceding tokens in the sequence.',
      },
      {
        id: 'genai-02-q2',
        question: 'What happens to the Softmax output distribution when Temperature T approaches 0?',
        options: [
          'It becomes a uniform random distribution across all tokens',
          'It collapses into a one-hot distribution concentrated on the argmax token (Greedy)',
          'All probabilities become zero',
          'The model refuses to generate any tokens',
        ],
        correctIndex: 1,
        explanation: 'As T approaches 0, the largest logit exponent approaches infinity relative to other logits, capturing 100% of probability mass.',
      },
      {
        id: 'genai-02-q3',
        question: 'Which phase of LLM inference achieves high GPU tensor core compute utilization?',
        options: [
          'The Prefill Phase (processing the prompt)',
          'The Decode Phase (generating tokens 1-by-1)',
          'The Disk Loading Phase',
          'The Tokenizer Detokenization Phase',
        ],
        correctIndex: 0,
        explanation: 'In the prefill phase, all prompt tokens are processed concurrently via parallel matrix multiplications, maximizing tensor core arithmetic saturation.',
      },
    ],

    independentExercise: {
      title: 'Calculate KV Cache Memory Footprint for an LLM Serving Endpoint',
      problem:
        'Write a Python function calculate_kv_cache_gb(n_layers, n_heads, d_head, max_seq_len, batch_size, bytes_per_elem) that returns the total KV cache memory required in Gigabytes.',
      hints: [
        'Each token stores 1 Key vector and 1 Value vector: total 2 vectors per layer.',
        'Total elements per layer = 2 * n_heads * d_head * max_seq_len * batch_size.',
        'Multiply across n_layers and bytes_per_elem (2 for FP16), then divide by (1024**3) for GB.',
      ],
      starterCode: `def calculate_kv_cache_gb(
    n_layers: int = 32,
    n_heads: int = 32,
    d_head: int = 128,
    max_seq_len: int = 8192,
    batch_size: int = 4,
    bytes_per_elem: int = 2 # FP16
) -> float:
    # TODO: Calculate and return KV Cache memory in GB
    pass

# For Llama-3-8B with 8K context and batch size 4
print("KV Cache Size:", calculate_kv_cache_gb(), "GB")`,
      solution: `def calculate_kv_cache_gb(
    n_layers: int = 32,
    n_heads: int = 32,
    d_head: int = 128,
    max_seq_len: int = 8192,
    batch_size: int = 4,
    bytes_per_elem: int = 2 # FP16
) -> float:
    # 2 for Key and Value
    total_bytes = 2 * n_layers * n_heads * d_head * max_seq_len * batch_size * bytes_per_elem
    total_gb = total_bytes / (1024 ** 3)
    return round(total_gb, 3)

# For Llama-3-8B with 8K context and batch size 4
print("KV Cache Size:", calculate_kv_cache_gb(), "GB")`,
    },

    summary: {
      keyTakeaways: [
        'LLMs decompose complex reasoning into sequential next-token categorical classifications using the probabilistic chain rule.',
        'Inference consists of two distinct regimes: compute-bound Prefill (processing prompt) and memory-bandwidth-bound Decode (generating tokens).',
        'KV Caching is vital for O(1) step latency, but scales linearly with context length and batch size, demanding careful VRAM management.',
      ],
      nextLessonId: 'genai-03-tokenization-in-llms',
      nextLessonTitle: 'GenAI-03: Tokenization in Large Language Models',
      nextLessonModuleId: 'p7-m3',
    },
  },

  'genai-03-tokenization-in-llms': {
    id: 'genai-03-tokenization-in-llms',
    moduleId: 'p7-m3',
    title: 'GenAI-03: Tokenization in Large Language Models',
    subtitle: 'Byte-Level BPE, Special Control Tokens, Fertility & Code Tokenization',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Beginner',
    visualizerType: 'tokenization-explorer',

    objectives: [
      'Bridge foundational Transformer tokenization (TF-02) to modern LLM production tokenizers (Tiktoken, SentencePiece)',
      'Analyze the Byte-Level BPE fallback mechanism that guarantees zero out-of-vocabulary (<unk>) failures',
      'Understand special control tokens and conversation template formats (<|begin_of_text|>, <|im_start|>, <|im_end|>)',
      'Evaluate token fertility disparities across languages, non-Latin scripts, mathematics, and whitespace-sensitive code',
      'Compute accurate token budgets and cost estimations using tokenizer encoding counters',
    ],
    prerequisites: [
      'TF-02: Tokenization & Token IDs',
      'GenAI-02: How LLMs Work',
    ],
    previousLesson: {
      id: 'tf-02-tokenization-and-token-ids',
      title: 'TF-02: Tokenization & Token IDs',
      moduleId: 'p6-m2',
    },

    analogy: {
      title: 'The Currency Exchange of Natural Language',
      text: 'Tokens are the currency units of Large Language Models. Just as 1 US Dollar has different purchasing power and exchange rates across international currencies, 1 word does not equal 1 token. In English, 1,000 words typically cost about 1,300 tokens. But in Arabic, Hindi, or Python code with deep indentation, 1,000 words can exchange for 3,000 to 5,000 tokens—imposing higher latency, higher API cost, and consuming context window budgets 3x faster.',
      metaphor: 'Tokenization is the discrete boundary layer between continuous human language and numerical tensor computation.',
    },

    problemSolved: {
      title: 'Why Foundation Models Switched to Byte-Level BPE',
      description:
        'Early NLP tokenizers treated unknown words as the dreaded <unk> token, destroying information whenever a rare surname, code variable, or emoji appeared. Modern foundation models use Byte-Pair Encoding over UTF-8 bytes (BBPE), ensuring that even completely unprecedented characters can always be represented as a sequence of raw UTF-8 byte tokens.',
      keyPoints: [
        'Guarantees 100% vocabulary coverage with zero <unk> tokens across any Unicode text or binary data',
        'Enforces structured multi-turn conversation formatting through cryptographically guarded special delimiters',
        'Compresses repetitive whitespace and indentation in source code to preserve context window length',
      ],
    },

    intuition: {
      overview:
        'Modern tokenizers operate in 4 distinct stages: Normalization, Pre-Tokenization (regex splitting), BPE Merge Application, and Special Token Injection.',
      steps: [
        {
          step: 1,
          title: 'Regex Pre-Tokenization',
          description:
            'Rather than splitting only on whitespace, modern regexes (like GPT-4’s cl100k pattern) prevent merges across punctuation boundaries, numbers, and letter-to-digit transitions.',
        },
        {
          step: 2,
          title: 'Byte-Level Subword Encoding',
          description:
            'Frequent character combinations ("ing", "tion", "def", "import") are mapped to single tokens, while rare words are broken into 2-3 byte subwords.',
        },
        {
          step: 3,
          title: 'Special Delimiter Enforcement',
          description:
            'Special tokens like <|im_start|>system are injected to delineate system instructions, user prompts, and assistant replies without ambiguity.',
        },
      ],
    },

    mathematics: {
      overview:
        'Token fertility and compression ratios determine the efficiency of vocabulary design.',
      foundations: [
        {
          name: 'Token Fertility Ratio',
          latex: '\\text{Fertility}(L) = \\frac{\\text{Total Tokens}(S_L)}{\\text{Total Words}(S_L)}',
          explanation:
            'Measures how many tokens are required to represent an average word in language L. English typically has fertility 1.3, while Hindi or Japanese can exceed 3.0 in English-centric vocabularies.',
        },
        {
          name: 'Bytes-per-Token Compression Metric',
          latex: '\\text{Compression} = \\frac{\\text{Total Raw UTF-8 Bytes}}{\\text{Total Generated Tokens}}',
          explanation:
            'A larger vocabulary (e.g. 128K in Llama 3 vs 32K in Llama 2) increases bytes-per-token compression, effectively expanding usable context by ~15-20%.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Vocabulary Size Trade-off in the Unembedding Head',
      objective: 'Demonstrate mathematically why vocabulary size cannot be expanded indefinitely.',
      steps: [
        {
          step: 1,
          label: 'Parameter Footprint of Embedding & LM Head',
          latex: 'N_{\\text{vocab\\_params}} = 2 \\cdot V \\cdot d_{\\text{model}}',
          explanation: 'The input embedding table and output unembedding head both scale directly with vocabulary size V.',
        },
        {
          step: 2,
          label: 'Numerical Evaluation for 32K vs 128K Vocab',
          latex: '\\text{For } d=4096: \\quad V=32\\text{K} \\implies 268\\text{M params}; \\quad V=128\\text{K} \\implies 1.07\\text{B params}',
          explanation: 'Increasing vocabulary from 32K to 128K allocates an additional 800M parameters purely to lookup tables before considering hidden layers.',
        },
        {
          step: 3,
          label: 'Compute Cost of Final Softmax',
          latex: '\\text{FLOPs}_{\\text{softmax}} = 3 \\cdot V \\text{ per token}',
          explanation: 'At inference time, computing Softmax over V=128K requires 384K operations per step, setting an engineering limit on vocabulary expansion.',
        },
      ],
    },

    variables: [
      { symbol: 'V', name: 'Vocabulary Size', description: 'Total number of discrete token IDs recognized by the model.' },
      { symbol: 'd_{\\text{model}}', name: 'Hidden Vector Dimension', description: 'Dimensionality of token embedding vectors.' },
      { symbol: '<|im_start|>', name: 'ChatML Start Delimiter', description: 'Special token signaling the beginning of a conversational role turn.' },
      { symbol: '<|im_end|>', name: 'ChatML End Delimiter', description: 'Special token signaling the completion of a conversational turn.' },
    ],

    numericalExample: {
      scenario: 'Calculate the token count and API cost disparity between English and Swahili translations of the same 100-word paragraph.',
      dataset: [
        { language: 'English', words: 100, fertility: 1.25, costPerMillion: 0.50 },
        { language: 'Swahili', words: 100, fertility: 3.40, costPerMillion: 0.50 },
      ],
      calculations: [
        {
          step: 'Token Count Calculation',
          math: 'English: 100 * 1.25 = 125 tokens; Swahili: 100 * 3.40 = 340 tokens',
          result: 'Swahili requires 2.72x more tokens for the exact same semantic content.',
        },
        {
          step: 'API Cost Ratio & Context Consumption',
          math: 'Cost_Swahili / Cost_English = 340 / 125 = 2.72',
          result: 'Swahili is 2.72x more expensive and fills the context window 2.72x faster.',
        },
      ],
      finalConclusion: 'Tokenizer vocabulary allocation has direct financial, latency, and fairness consequences for multilingual users.',
    },

    visualExplanation: {
      title: 'ChatML Conversation Template & Special Token Boundaries',
      description: 'How modern models structure multi-turn dialogue to prevent prompt injection and instruction confusion.',
      features: [
        '<|im_start|>system\\nYou are a helpful AI assistant.<|im_end|>: Explicitly bounds system instructions with reserved non-printable tokens.',
        '<|im_start|>user\\nExplain recursion.<|im_end|>: Isolates untrusted user input from system authority.',
        '<|im_start|>assistant\\n: Cues the autoregressive generation loop to begin emitting response tokens.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Byte-Level UTF-8 Tokenizer with Special Tokens',
      code: `class SimpleByteTokenizer:
    """Byte-level tokenizer that guarantees zero OOV tokens."""
    def __init__(self):
        # 256 basic byte tokens + special tokens
        self.special_tokens = {
            "<|im_start|>": 256,
            "<|im_end|>": 257,
            "<|pad|>": 258,
        }
        self.inv_specials = {v: k for k, v in self.special_tokens.items()}

    def encode(self, text: str):
        tokens = []
        # Simple special token parsing
        for token_str, token_id in self.special_tokens.items():
            if token_str in text:
                parts = text.split(token_str)
                for i, part in enumerate(parts):
                    if part:
                        tokens.extend(list(part.encode('utf-8')))
                    if i < len(parts) - 1:
                        tokens.append(token_id)
                return tokens
        return list(text.encode('utf-8'))

    def decode(self, tokens):
        byte_stream = bytearray()
        result = []
        for t in tokens:
            if t in self.inv_specials:
                if byte_stream:
                    result.append(byte_stream.decode('utf-8', errors='replace'))
                    byte_stream = bytearray()
                result.append(self.inv_specials[t])
            else:
                byte_stream.append(t)
        if byte_stream:
            result.append(byte_stream.decode('utf-8', errors='replace'))
        return "".join(result)

tok = SimpleByteTokenizer()
encoded = tok.encode("<|im_start|>user Hello world! <|im_end|>")
print("Encoded IDs:", encoded[:6], "... Total tokens:", len(encoded))
print("Decoded string:", tok.decode(encoded))`,
      explanation: 'Illustrates how byte fallbacks convert any character into 1 to 4 raw byte tokens, while special tokens occupy integer IDs above 255.',
    },

    sklearnCode: {
      title: 'HuggingFace Tokenizers Integration & Chat Template Formatting',
      code: `# Real-world usage with AutoTokenizer (Conceptual production reference)
# from transformers import AutoTokenizer

# tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B-Instruct")
# messages = [
#     {"role": "system", "content": "You are a concise tutor."},
#     {"role": "user", "content": "What is BPE tokenization?"}
# ]
# Formats into exact ChatML/Llama-3 special token syntax
# formatted_prompt = tokenizer.apply_chat_template(messages, tokenize=False)
# print(formatted_prompt)`,
      explanation: 'Demonstrates apply_chat_template, which automates injecting model-specific delimiters like <|start_header_id|> and <|eot_id|>.',
    },

    runnableCode: {
      code: `import json

# Token fertility demonstration across different linguistic character types
def compute_fertility(text: str, vocab_sample: dict) -> int:
    # Approximate subword splitting based on sample vocabulary
    words = text.split()
    tokens = []
    for w in words:
        if w in vocab_sample:
            tokens.append(vocab_sample[w])
        else:
            # Subword character breakdown
            tokens.extend([vocab_sample.get(c, 999) for c in w])
    return len(tokens)

vocab = {"Hello": 1, "world": 2, "def": 3, "return": 4, " ": 5}
sample_code = "def hello_world(): return"
word_count = len(sample_code.split())
token_count = compute_fertility(sample_code, vocab)

print(f"Words: {word_count}, Tokens: {token_count}, Ratio: {token_count/word_count:.2f}")`,
      expectedOutput: 'Words: 3, Tokens: 16, Ratio: 5.33',
    },

    lineByLineExplanation: [
      {
        lines: 'vocab = {"Hello": 1, "world": 2, ...}',
        codeSnippet: 'vocab = {"Hello": 1, ...}',
        explanation: 'Tokens that exist as complete subwords are mapped to single integers.',
      },
      {
        lines: 'tokens.extend([vocab_sample.get(c, 999) for c in w])',
        codeSnippet: 'tokens.extend(...)',
        explanation: 'Unknown or complex words fragment into individual character/byte tokens, multiplying fertility.',
      },
      {
        lines: 'Ratio: {token_count/word_count:.2f}',
        codeSnippet: 'token_count/word_count',
        explanation: 'Demonstrates how punctuation and code symbols inflate token-to-word ratios.',
      },
    ],

    hyperparameters: [
      {
        name: 'Vocabulary Size V',
        defaultVal: '128,256 (Llama 3)',
        range: '32,000 to 256,000',
        effect: 'Higher vocabulary improves compression and multilingual fertility but increases parameter memory.',
        recommendation: 'Modern models converge on 100K-150K subwords.',
      },
    ],

    assumptions: [
      {
        assumption: 'Lossless Round-Trip Invertibility',
        whyItMatters: 'decode(encode(text)) must identically match the original text string without missing spaces or dropped characters.',
        howToVerify: 'Run automated round-trip property tests across massive multi-language corpora.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming 1 token equals 1 word or 1 character',
        solution: 'In English, 1 token is roughly 0.75 words (or ~4 characters). In non-Latin languages, 1 word can be 3 to 6 tokens.',
      },
      {
        mistake: 'Failing to sanitize special control tokens in user inputs',
        solution: 'If a user inputs raw strings like "<|im_end|>", a tokenizer must escape them as ordinary text rather than treating them as control delimiters.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'FinTech & Global Enterprise',
        application: 'Multilingual API Budgeting',
        benefit: 'Auditing token fertility prevents 3x billing overruns when localizing products in Asian and African markets.',
      },
      {
        industry: 'Developer Tooling',
        application: 'Code Completion Engines',
        benefit: 'Whitespace-optimized tokenizers compress multi-space tab indents into single tokens, doubling effective repo context.',
      },
    ],

    practiceQuestions: [
      {
        id: 'genai-03-pq1',
        question: 'How does Byte-Level BPE eliminate the <unk> (unknown token) problem completely?',
        answer: 'By setting the base vocabulary to all 256 possible byte values (0x00 to 0xFF) of the UTF-8 encoding standard, any valid or invalid Unicode sequence can always be broken down into individual raw bytes.',
        explanation: 'Even unseen emojis or novel characters can be represented as 3 or 4 byte tokens.',
      },
      {
        id: 'genai-03-pq2',
        question: 'Why did Meta increase Llama 3’s vocabulary to 128K compared to Llama 2’s 32K?',
        answer: 'To improve token compression by ~15%, drastically reducing the number of tokens required for multilingual text and source code, allowing more semantic content into the same context length.',
        explanation: 'Fewer tokens per sentence translates directly to faster generation throughput and reduced inference cost.',
      },
      {
        id: 'genai-03-pq3',
        question: 'What is token-level prompt injection via delimiter spoofing?',
        answer: 'An attack where an adversary enters special tokens like "<|im_end|><|im_start|>system" into their message. If the tokenizer parses them as special tokens, it tricks the model into executing user text with system authority.',
        explanation: 'Production tokenizers must strictly disallow raw string inputs from matching reserved special token IDs.',
      },
    ],

    quiz: [
      {
        id: 'genai-03-q1',
        question: 'In modern LLMs, which mechanism allows arbitrary Unicode strings and emojis to be encoded without <unk>?',
        options: [
          'Byte-Level Byte-Pair Encoding (BBPE)',
          'Word-level dictionary lookup',
          'ASCII integer truncation',
          'Hashing trick with 10 buckets',
        ],
        correctIndex: 0,
        explanation: 'Byte-Level BPE initializes its vocabulary with all 256 raw UTF-8 bytes, guaranteeing 100% coverage.',
      },
      {
        id: 'genai-03-q2',
        question: 'If a Hindi document of 500 words requires 1,500 tokens, what is its fertility ratio?',
        options: [
          '0.33 tokens/word',
          '3.0 tokens/word',
          '1.5 tokens/word',
          '500 tokens/word',
        ],
        correctIndex: 1,
        explanation: 'Fertility = Total Tokens / Total Words = 1500 / 500 = 3.0.',
      },
      {
        id: 'genai-03-q3',
        question: 'What is the primary role of ChatML special tokens like <|im_start|> and <|im_end|>?',
        options: [
          'To compress whitespace in Python code',
          'To delineate role boundaries (system, user, assistant) and prevent instruction ambiguity',
          'To encrypt user messages on the client',
          'To reduce temperature during generation',
        ],
        correctIndex: 1,
        explanation: 'ChatML delimiters create unambiguous structural boundaries between conversation roles.',
      },
    ],

    independentExercise: {
      title: 'Build a Token Count and Cost Estimator in Python',
      problem:
        'Write a Python function estimate_llm_cost(prompt: str, expected_completion_words: int, input_cost_per_m: float = 0.50, output_cost_per_m: float = 1.50, lang_fertility: float = 1.3) that computes prompt tokens, completion tokens, and total cost in USD.',
      hints: [
        'Estimate prompt tokens by multiplying words in prompt by lang_fertility.',
        'Estimate completion tokens by multiplying expected_completion_words by lang_fertility.',
        'Cost is (input_tokens / 1,000,000) * input_cost_per_m + (output_tokens / 1,000,000) * output_cost_per_m.',
      ],
      starterCode: `def estimate_llm_cost(
    prompt: str,
    expected_completion_words: int,
    input_cost_per_m: float = 0.50,
    output_cost_per_m: float = 1.50,
    lang_fertility: float = 1.3
) -> dict:
    # TODO: Calculate tokens and total USD cost
    pass

prompt_text = "Summarize the primary architectural trade-offs of generative language models."
print(estimate_llm_cost(prompt_text, expected_completion_words=200))`,
      solution: `def estimate_llm_cost(
    prompt: str,
    expected_completion_words: int,
    input_cost_per_m: float = 0.50,
    output_cost_per_m: float = 1.50,
    lang_fertility: float = 1.3
) -> dict:
    prompt_words = len(prompt.split())
    prompt_tokens = int(prompt_words * lang_fertility)
    completion_tokens = int(expected_completion_words * lang_fertility)

    in_cost = (prompt_tokens / 1_000_000) * input_cost_per_m
    out_cost = (completion_tokens / 1_000_000) * output_cost_per_m
    total_cost = in_cost + out_cost

    return {
        "prompt_tokens": prompt_tokens,
        "completion_tokens": completion_tokens,
        "total_tokens": prompt_tokens + completion_tokens,
        "total_cost_usd": round(total_cost, 6)
    }

prompt_text = "Summarize the primary architectural trade-offs of generative language models."
print(estimate_llm_cost(prompt_text, expected_completion_words=200))`,
    },

    summary: {
      keyTakeaways: [
        'Modern LLM tokenizers utilize Byte-Level BPE (BBPE) to guarantee zero out-of-vocabulary failures across any arbitrary Unicode string.',
        'Token fertility disparities significantly inflate API pricing and context window consumption for non-Latin languages and code.',
        'Special control delimiters (ChatML) are essential architectural barriers that insulate system authority from user-supplied inputs.',
      ],
      nextLessonId: 'genai-04-embeddings-representations',
      nextLessonTitle: 'GenAI-04: Embeddings and Representations',
      nextLessonModuleId: 'p7-m4',
    },
  },
};

