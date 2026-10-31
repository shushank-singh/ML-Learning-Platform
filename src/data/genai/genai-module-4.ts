import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 10: Parameter-Efficient Fine-Tuning: LoRA & QLoRA (p7-m10)
// =========================================================================
export const p7m10Data: ModuleData = {
  id: 'p7-m10',
  number: 10,
  title: 'Parameter-Efficient Fine-Tuning: LoRA & QLoRA',
  subtitle: 'Low-Rank Factorization, NF4 Quantization & Consumer GPU Tuning',
  description:
    'Master Parameter-Efficient Fine-Tuning (PEFT) without full-model weight updates. Derive Low-Rank Adaptation (LoRA) mathematics W = W_0 + (alpha/r)(B * A). Contrast adapter matrices with full fine-tuning memory footprints. Explore QLoRA: 4-bit NormalFloat (NF4), double quantization, and paged optimizers that enable fine-tuning 70B models on single 48GB GPUs. Clearly distinguish conceptual browser simulations from real hardware GPU runtimes.',
  icon: 'Zap',
  badge: 'Phase 7 · GenAI & LLMs',
  estimatedHours: 4,
  topicsCount: 1,
  lessons: [
    {
      id: 'genai-10-peft-lora-qlora',
      moduleId: 'p7-m10',
      title: 'GenAI-10: Parameter-Efficient Fine-Tuning: LoRA & QLoRA',
      description:
        'LoRA matrix decomposition, rank selection r and scaling alpha, QLoRA NF4 quantization, and zero-inference-overhead weight merging.',
      order: 1,
      readTimeMinutes: 38,
      visualizerType: 'lora-rank-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 11: Quantization and Model Optimization (p7-m11)
// =========================================================================
export const p7m11Data: ModuleData = {
  id: 'p7-m11',
  number: 11,
  title: 'Quantization and Model Optimization',
  subtitle: 'FP16, INT8, AWQ, GGUF, PagedAttention & High-Throughput Serving',
  description:
    'Optimize LLMs for production deployment and high-throughput inference serving. Trace the numerical hierarchy from FP32 down to FP16, BF16, INT8 (SmoothQuant), and 4-bit AWQ/GGUF. Calculate exact VRAM sizing formulas for weights, KV caches, and runtime activations. Analyze inference serving innovations: continuous dynamic batching, PagedAttention in vLLM, Time-to-First-Token (TTFT), and Inter-Token Latency (ITL).',
  icon: 'Gauge',
  badge: 'Phase 7 · GenAI & LLMs',
  estimatedHours: 4,
  topicsCount: 1,
  lessons: [
    {
      id: 'genai-11-quantization-optimization',
      moduleId: 'p7-m11',
      title: 'GenAI-11: Quantization and Model Optimization',
      description:
        'Numerical precision formats, 4-bit AWQ and GGUF quantization, PagedAttention serving mechanics, and VRAM capacity formulas.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'quantization-size-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 12: Open and Hosted Language Models (p7-m12)
// =========================================================================
export const p7m12Data: ModuleData = {
  id: 'p7-m12',
  number: 12,
  title: 'Open and Hosted Language Models',
  subtitle: 'Model Families, Open Weights vs Proprietary APIs & Secure Key Architecture',
  description:
    'Evaluate the state of open-weights versus commercial closed models across Llama 3, Mistral, Gemma, DeepSeek, Claude, and Gemini. Analyze licensing terms (Apache 2.0 vs Llama Community License vs commercial API restrictions). Compare local inference engines (Ollama, llama.cpp, vLLM) against hosted cloud endpoints (Google AI Studio, Groq, Together). Master secure API key architecture to eliminate secret leakage and avoid unexpected cloud billing traps.',
  icon: 'Server',
  badge: 'Phase 7 · GenAI & LLMs',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'genai-12-open-vs-hosted-models',
      moduleId: 'p7-m12',
      title: 'GenAI-12: Open and Hosted Language Models',
      description:
        'Open-weights taxonomy, licensing considerations, local Ollama serving, hardware sizing matrices, and secure API key management.',
      order: 1,
      readTimeMinutes: 32,
      visualizerType: 'quantization-size-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS
// =========================================================================
export const genaiModule4Lessons: Record<string, LessonContent> = {
  'genai-10-peft-lora-qlora': {
    id: 'genai-10-peft-lora-qlora',
    moduleId: 'p7-m10',
    title: 'GenAI-10: Parameter-Efficient Fine-Tuning: LoRA & QLoRA',
    subtitle: 'Low-Rank Matrix Decomposition, NF4 Quantization & Swappable Adapters',
    order: 1,
    readTimeMinutes: 38,
    difficulty: 'Advanced',
    visualizerType: 'lora-rank-explorer',

    objectives: [
      'Derive the Low-Rank Adaptation (LoRA) matrix factorization Delta W = (alpha / r) * B * A',
      'Explain why weight updates during fine-tuning have low intrinsic rank according to empirical SVD analyses',
      'Contrast full fine-tuning VRAM requirements (AdamW optimizer states) with LoRA adapter memory savings (>99% parameter freeze)',
      'Analyze the 3 core innovations of QLoRA: 4-bit NormalFloat (NF4), Double Quantization, and Paged Optimizers',
      'Demonstrate how LoRA adapter weights fold seamlessly into base models with zero inference latency penalty',
    ],
    prerequisites: [
      'GenAI-09: Supervised Fine-Tuning',
      'Linear algebra (matrix rank, matrix products, singular value decomposition)',
    ],
    previousLesson: {
      id: 'genai-09-supervised-fine-tuning',
      title: 'GenAI-09: Supervised Fine-Tuning',
      moduleId: 'p7-m9',
    },

    analogy: {
      title: 'Transparent Overlays on an Encyclopedia',
      text: 'Full fine-tuning is like erasing and reprinting all 30 volumes of an encyclopedia whenever you want to update medical terminology—requiring enormous printing factories (16 enterprise GPUs). LoRA is like leaving the encyclopedia completely untouched on the shelf (frozen weights) and slipping a thin transparent plastic sheet (adapter) over specific pages with specialized notes. The original text shines through; only the modifications are stored on the 10MB transparent sheet.',
      metaphor: 'LoRA freezes the 16GB foundation model and trains a 20MB swappable adapter.',
    },

    problemSolved: {
      title: 'Overcoming the GPU Memory Wall in Enterprise Fine-Tuning',
      description:
        'In full fine-tuning, training an 8B parameter model in 16-bit requires over 64GB of VRAM because the AdamW optimizer maintains 8 bytes per parameter for momentum and variance buffers, plus 2 bytes for gradients. LoRA freezes all 8 billion base parameters and trains only a low-rank adapter (e.g. 16M parameters), dropping optimizer memory from 48GB down to 250MB and allowing fine-tuning on consumer 16GB or 24GB GPUs.',
      keyPoints: [
        'Reduces trainable parameter count by 99% while achieving 98%+ of full fine-tuning performance',
        'Enables a single hosted base model in VRAM to serve hundreds of distinct client tasks by swapping tiny adapter files',
        'Zero deployment latency overhead: adapter weights merge into the base matrix via simple addition prior to deployment',
      ],
    },

    intuition: {
      overview:
        'A large weight matrix W_0 in R^(d x k) changes by Delta W during fine-tuning. LoRA decomposes Delta W into the product of two small matrices: B in R^(d x r) and A in R^(r x k), where rank r << min(d, k).',
      steps: [
        {
          step: 1,
          title: 'Low Intrinsic Rank Hypothesis',
          description:
            'Aghajanyan et al. (2020) demonstrated that the weight updates Delta W during task adaptation lie in a subspace of extremely low intrinsic rank (r = 4 or r = 8 is often sufficient).',
        },
        {
          step: 2,
          title: 'Asymmetric Initialization',
          description:
            'Matrix A is initialized with Gaussian random noise N(0, sigma^2); Matrix B is initialized to exact zeroes. At step 0, Delta W = B * A = 0, so model behavior starts identically to the base pretrained model.',
        },
        {
          step: 3,
          title: 'Scaling Factor (alpha / r)',
          description:
            'The adapter update is scaled by a constant factor alpha / r. Setting alpha = 2r provides stable gradient magnitudes when experimenting with different rank values.',
        },
      ],
    },

    mathematics: {
      overview:
        'The mathematical formulation modifies the linear forward pass without altering base weights.',
      foundations: [
        {
          name: 'LoRA Forward Pass Formulation',
          latex: 'h = W_0 x + \\Delta W x = W_0 x + \\frac{\\alpha}{r} (B \\cdot A) x, \\quad B \\in \\mathbb{R}^{d \\times r}, \\; A \\in \\mathbb{R}^{r \\times k}',
          explanation:
            'Input vector x is multiplied by frozen base matrix W_0 and simultaneously passed through down-projection A and up-projection B.',
        },
        {
          name: 'Weight Merging for Zero-Latency Serving',
          latex: 'W_{\\text{deployed}} = W_0 + \\frac{\\alpha}{r} (B \\cdot A) \\in \\mathbb{R}^{d \\times k}',
          explanation:
            'After training, the product B * A is multiplied by alpha/r and added directly into W_0. The adapter disappears, resulting in standard single-matrix inference.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Parameter Reduction Ratio for LoRA Adaptation',
      objective: 'Calculate the exact parameter reduction ratio when applying LoRA of rank r to a square d x d linear projection.',
      steps: [
        {
          step: 1,
          label: 'Base Weight Parameter Count',
          latex: 'N_{\\text{base}} = d \\cdot d = d^2',
          explanation: 'For hidden dimension d=4096, base matrix has 4096 x 4096 = 16,777,216 parameters.',
        },
        {
          step: 2,
          label: 'LoRA Adapter Parameter Count',
          latex: 'N_{\\text{LoRA}} = (d \\cdot r) + (r \\cdot d) = 2 \\cdot d \\cdot r',
          explanation: 'Matrix B has d x r parameters; Matrix A has r x d parameters. For d=4096 and r=8: 2 * 4096 * 8 = 65,536 parameters.',
        },
        {
          step: 3,
          label: 'Parameter Ratio Calculation',
          latex: '\\text{Ratio} = \\frac{2 \\cdot d \\cdot r}{d^2} = \\frac{2r}{d} = \\frac{2(8)}{4096} = \\frac{16}{4096} = 0.0039 \\implies 99.61\\% \\text{ reduction}',
          explanation: 'LoRA requires training only 0.39% of the base matrix parameters—a 256x reduction in trainable weights!',
        },
      ],
    },

    variables: [
      { symbol: 'W_0', name: 'Pretrained Base Weight Matrix', description: 'Frozen neural network layer weights in R^(d x k).' },
      { symbol: 'B', name: 'LoRA Up-Projection Matrix', description: 'Trainable matrix in R^(d x r), initialized to zero.' },
      { symbol: 'A', name: 'LoRA Down-Projection Matrix', description: 'Trainable matrix in R^(r x k), initialized with Gaussian noise.' },
      { symbol: 'r', name: 'Adapter Rank', description: 'Inner rank bottleneck (typically 4, 8, 16, 32, or 64).' },
      { symbol: '\\alpha', name: 'Scaling Factor', description: 'Constant scaling multiplier for adapter updates (typically 16 or 32).' },
    ],

    numericalExample: {
      scenario: 'Compare training memory footprint between Full Fine-Tuning and LoRA (r=8) on an 8-Billion parameter model (32 layers, d=4096).',
      dataset: [
        { method: 'Full Fine-Tuning (FP16)', trainableParams: '8,000,000,000', optBytesPerParam: 16 },
        { method: 'LoRA on Q & V (r=8)', trainableParams: '16,777,216', optBytesPerParam: 16 },
      ],
      calculations: [
        {
          step: 'Optimizer Memory for Full Fine-Tuning (AdamW)',
          math: 'Opt Memory = 8,000,000,000 * 16 bytes = 128,000,000,000 bytes = 119.2 GB VRAM',
          result: 'Requires multiple 80GB datacenter GPUs purely to hold optimizer states.',
        },
        {
          step: 'Optimizer Memory for LoRA (r=8 on Q & V)',
          math: 'Opt Memory = 16,777,216 * 16 bytes = 268,435,456 bytes = 0.25 GB VRAM (250 MB)',
          result: 'Optimizer memory drops from 119 GB to just 250 MB!',
        },
      ],
      finalConclusion: 'LoRA reduces optimizer VRAM overhead by 99.8%, allowing fine-tuning on a single 16GB or 24GB consumer GPU.',
    },

    visualExplanation: {
      title: 'LoRA Decomposition & QLoRA Quantization Pipeline',
      description: 'How weights flow during Parameter-Efficient Fine-Tuning.',
      features: [
        'Parallel Forward Branch: The frozen base matrix W_0 and the LoRA branch (B * A) compute simultaneously and add together: h = W_0 x + Delta W x.',
        'QLoRA (NF4): The base model W_0 is quantized to 4-bit NormalFloat (NF4). It is dequantized to FP16 on the fly only for matrix multiplication, saving 75% VRAM.',
        'Paged Optimizers: QLoRA pages optimizer states to CPU RAM automatically if a sudden context spike threatens a GPU Out-of-Memory (OOM) error.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Complete Functional LoRA Layer with Weight Merge',
      code: `import numpy as np

# Deterministic seed for reproducible verification
np.random.seed(42)

class LoRALinear:
    """Linear layer augmented with Low-Rank Adaptation (LoRA)."""
    def __init__(self, in_features: int, out_features: int, r: int = 4, alpha: float = 8.0):
        self.in_features = in_features
        self.out_features = out_features
        self.r = r
        self.scaling = alpha / r

        # Frozen base weight matrix W0
        self.W0 = np.random.randn(out_features, in_features) * 0.1

        # Trainable LoRA adapter matrices
        # A: Gaussian initialization; B: Zero initialization
        self.A = np.random.randn(r, in_features) * (1.0 / np.sqrt(r))
        self.B = np.zeros((out_features, r))

    def forward(self, x: np.ndarray) -> np.ndarray:
        """Forward pass: h = x @ W0.T + (alpha/r) * (x @ A.T) @ B.T"""
        base_out = np.dot(x, self.W0.T)
        lora_out = np.dot(np.dot(x, self.A.T), self.B.T) * self.scaling
        return base_out + lora_out

    def merge_weights(self) -> np.ndarray:
        """Permanently fold LoRA weights into base matrix for zero-latency deployment."""
        delta_W = (self.scaling * np.dot(self.B, self.A))
        merged_W = self.W0 + delta_W
        return merged_W

# Demonstrate on d=4, r=2
layer = LoRALinear(in_features=4, out_features=4, r=2, alpha=4.0)
sample_x = np.array([[1.0, 2.0, 3.0, 4.0]])
h_init = layer.forward(sample_x)
print("Initial forward output (Delta W is 0):", np.round(h_init, 3))

# Simulate training by updating adapter B
layer.B += 0.05
h_adapted = layer.forward(sample_x)
print("Adapted forward output:", np.round(h_adapted, 3))

# Merge weights
W_deploy = layer.merge_weights()
h_merged = np.dot(sample_x, W_deploy.T)
print("Merged weight forward output (exact match):", np.round(h_merged, 3))`,
      explanation: 'Simulates the complete lifecycle: zero-initialized forward pass, adapter parameter update, and permanent weight merging.',
    },

    sklearnCode: {
      title: 'HuggingFace PEFT Library Standard LoRA Configuration',
      code: `# Standard configuration using the HuggingFace PEFT library
# from peft import LoraConfig, get_peft_model, TaskType

# lora_config = LoraConfig(
#     task_type=TaskType.CAUSAL_LM,
#     r=16,
#     lora_alpha=32,
#     lora_dropout=0.05,
#     target_modules=["q_proj", "v_proj", "k_proj", "o_proj"]
# )
# peft_model = get_peft_model(base_model, lora_config)
# peft_model.print_trainable_parameters()
# Output: trainable params: 13,631,488 || all params: 8,043,892,736 || trainable%: 0.169%`,
      explanation: 'Demonstrates configuring HuggingFace PEFT LoraConfig targeting attention projection matrices.',
    },

    runnableCode: {
      code: `import numpy as np

# Deterministic verification of LoRA forward pass and weight merging
np.random.seed(42)
d = 4
r = 2
alpha = 4.0
scaling = alpha / r

x = np.array([1.0, 1.0, 1.0, 1.0])
W0 = np.ones((d, d)) * 0.5
A = np.ones((r, d)) * 0.2
B = np.ones((d, r)) * 0.3

# Forward through separate branches
h_base = np.dot(W0, x)
h_lora = scaling * np.dot(B, np.dot(A, x))
h_total = h_base + h_lora

# Forward through merged weight
W_merged = W0 + scaling * np.dot(B, A)
h_merged = np.dot(W_merged, x)

print("Separate Branch Output:", h_total)
print("Merged Weight Output:  ", h_merged)
print("Are outputs numerically identical?", np.allclose(h_total, h_merged))`,
      expectedOutput: 'Separate Branch Output: [2.96 2.96 2.96 2.96]\nMerged Weight Output:   [2.96 2.96 2.96 2.96]\nAre outputs numerically identical? True',
    },

    lineByLineExplanation: [
      {
        lines: 'h_base = np.dot(W0, x)',
        codeSnippet: 'np.dot(W0, x)',
        explanation: 'Computes forward pass through frozen base matrix W0.',
      },
      {
        lines: 'h_lora = scaling * np.dot(B, np.dot(A, x))',
        codeSnippet: 'scaling * np.dot(B, np.dot(A, x))',
        explanation: 'Computes low-rank projection: x is down-projected to rank r via A, then up-projected to dimension d via B.',
      },
      {
        lines: 'W_merged = W0 + scaling * np.dot(B, A)',
        codeSnippet: 'W0 + scaling * np.dot(B, A)',
        explanation: 'Mathematically folds the adapter matrix Delta W directly into W0 for zero-overhead inference.',
      },
    ],

    hyperparameters: [
      {
        name: 'Adapter Rank r',
        defaultVal: '8 or 16',
        range: '1 to 64',
        effect: 'Higher rank increases capacity for complex domain knowledge, but increases VRAM and adapter file size.',
        recommendation: 'Start with r=8 for format adaptation; use r=32 or 64 for complex coding/math domains.',
      },
    ],

    assumptions: [
      {
        assumption: 'Low Intrinsic Dimension of Task Adaptation',
        whyItMatters: 'Assumes the manifold of solutions for downstream task adaptation lies within a low-dimensional linear subspace.',
        howToVerify: 'Inspect singular value spectra of full fine-tuning weight deltas Delta W.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Deploying LoRA with separate runtime branches in latency-sensitive serving',
        solution: 'Always call model.merge_and_unload() prior to production export to combine Delta W directly into the base weights.',
      },
      {
        mistake: 'Setting LoRA alpha to an arbitrary number when tuning rank r',
        solution: 'Keep the ratio alpha / r constant (e.g. alpha = 2r) so the learning rate has consistent scaling across different ranks.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Multi-Tenant SaaS AI Platforms',
        application: 'Per-Customer Customization',
        benefit: 'A single 8B base model in GPU VRAM serves 500 enterprise clients, loading customer-specific 20MB LoRA adapters dynamically.',
      },
      {
        industry: 'Edge Computing & Robotics',
        application: 'On-Device Robot Fine-Tuning',
        benefit: 'QLoRA enables robots to fine-tune specialized motor manipulation skills directly on embedded Jetson Orin hardware.',
      },
    ],

    practiceQuestions: [
      {
        id: 'genai-10-pq1',
        question: 'Why is Matrix B in LoRA initialized to exact zeroes while Matrix A is initialized with Gaussian noise?',
        answer: 'Because Delta W = (alpha/r) * (B * A). If B is all zeroes, then Delta W = 0 at the start of training. This guarantees that before gradient updates begin, the model\'s behavior and outputs are 100% identical to the original pretrained foundation model.',
        explanation: 'If both were initialized with random values, the model would start with scrambled outputs.',
      },
      {
        id: 'genai-10-pq2',
        question: 'What are the three core innovations introduced in QLoRA (Dettmers et al., 2023)?',
        answer: '1) 4-bit NormalFloat (NF4) data type designed specifically for normally distributed neural weights; 2) Double Quantization (quantizing the quantization constants themselves, saving 0.37 bits/param); and 3) Paged Optimizers using CUDA Unified Memory to prevent GPU out-of-memory crashes.',
        explanation: 'These innovations allow fine-tuning a 70B model on a single 48GB GPU or an 8B model on a consumer 12GB GPU.',
      },
      {
        id: 'genai-10-pq3',
        question: 'Does running a model with an active LoRA adapter increase inference latency?',
        answer: 'If kept as separate branches during inference, it adds a tiny overhead (one extra matrix product). However, for production deployment, the adapter can be permanently merged into the base weights: W_deploy = W_0 + (alpha/r)(B * A). Once merged, inference latency is 100% identical to the base model with zero overhead.',
        explanation: 'Linear algebra guarantees that W_deploy is a single matrix of identical dimension.',
      },
    ],

    quiz: [
      {
        id: 'genai-10-q1',
        question: 'If a square weight matrix has dimension d = 4096 and LoRA rank r = 8 is applied, how many trainable parameters are in the adapter?',
        options: ['65,536', '16,777,216', '32,768', '4,096'],
        correctIndex: 0,
        explanation: 'Params = (d * r) + (r * d) = 2 * 4096 * 8 = 65,536 parameters (compared to 16.7M in the base matrix).',
      },
      {
        id: 'genai-10-q2',
        question: 'Which quantization format was custom-engineered by QLoRA for normally distributed neural network weights?',
        options: [
          '4-bit NormalFloat (NF4)',
          'INT8 signed integer',
          'Standard FP16',
          'ASCII integer binary',
        ],
        correctIndex: 0,
        explanation: 'NF4 distributes quantization bin boundaries according to the quantiles of a standard normal distribution N(0, 1).',
      },
      {
        id: 'genai-10-q3',
        question: 'What happens to the base model weights W_0 during LoRA training?',
        options: [
          'They remain completely frozen and are never updated by gradients',
          'They are deleted to save memory',
          'They are updated with an extra large learning rate',
          'They are re-initialized with random Gaussian noise',
        ],
        correctIndex: 0,
        explanation: 'LoRA freezes 100% of the base weights W_0; gradient updates only flow into adapter matrices A and B.',
      },
    ],

    independentExercise: {
      title: 'Calculate LoRA Parameter Count and Memory Savings in Python',
      problem:
        'Write a Python function lora_savings_audit(hidden_dim: int, rank: int, num_layers: int, target_matrices: int = 4) that calculates total base parameters, total LoRA parameters, and percentage parameter reduction.',
      hints: [
        'Base params per matrix = hidden_dim * hidden_dim.',
        'LoRA params per matrix = 2 * hidden_dim * rank.',
        'Total params = params_per_matrix * target_matrices * num_layers.',
      ],
      starterCode: `def lora_savings_audit(
    hidden_dim: int = 4096,
    rank: int = 8,
    num_layers: int = 32,
    target_matrices: int = 4 # Q, K, V, O
) -> dict:
    # TODO: Calculate base vs LoRA parameter totals and savings percentage
    pass

print(lora_savings_audit())`,
      solution: `def lora_savings_audit(
    hidden_dim: int = 4096,
    rank: int = 8,
    num_layers: int = 32,
    target_matrices: int = 4
) -> dict:
    base_per_matrix = hidden_dim * hidden_dim
    lora_per_matrix = 2 * hidden_dim * rank
    total_matrices = target_matrices * num_layers

    total_base = base_per_matrix * total_matrices
    total_lora = lora_per_matrix * total_matrices
    savings_pct = (1.0 - (total_lora / total_base)) * 100.0

    return {
        "total_base_params": f"{total_base:,}",
        "total_lora_params": f"{total_lora:,}",
        "parameter_savings_pct": round(savings_pct, 3)
    }

print(lora_savings_audit())`,
    },

    summary: {
      keyTakeaways: [
        'LoRA factorizes weight updates Delta W = (alpha/r)(B * A) into low-rank matrices, freezing base weights and reducing trainable parameters by >99%.',
        'QLoRA combines NF4 quantization, double quantization, and paged optimizers to enable fine-tuning 70B models on accessible GPU hardware.',
        'Prior to production deployment, LoRA adapter weights can be permanently merged into the base matrix with zero inference latency penalty.',
      ],
      nextLessonId: 'genai-11-quantization-optimization',
      nextLessonTitle: 'GenAI-11: Quantization and Model Optimization',
      nextLessonModuleId: 'p7-m11',
    },
  },

  'genai-11-quantization-optimization': {
    id: 'genai-11-quantization-optimization',
    moduleId: 'p7-m11',
    title: 'GenAI-11: Quantization and Model Optimization',
    subtitle: 'Numerical Formats, 4-Bit AWQ, GGUF & High-Throughput vLLM PagedAttention',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Advanced',
    visualizerType: 'quantization-size-explorer',

    objectives: [
      'Trace the floating-point hierarchy from FP32 (4 bytes), FP16 / BF16 (2 bytes), to integer INT8 and INT4',
      'Calculate complete VRAM sizing equations: Weights + KV Cache + CUDA Overhead + Activation Memory',
      'Compare modern Post-Training Quantization (PTQ) schemes: AWQ (Activation-aware Weight Quantization), GPTQ, and GGUF (llama.cpp)',
      'Analyze high-throughput inference serving architectures: Continuous Batching and PagedAttention (vLLM)',
      'Measure end-to-end inference performance metrics: Time-to-First-Token (TTFT), Inter-Token Latency (ITL), and Tokens-per-Second (TPS)',
    ],
    prerequisites: [
      'GenAI-02: How LLMs Work',
      'GenAI-10: Parameter-Efficient Fine-Tuning: LoRA & QLoRA',
    ],
    previousLesson: {
      id: 'genai-10-peft-lora-qlora',
      title: 'GenAI-10: Parameter-Efficient Fine-Tuning: LoRA & QLoRA',
      moduleId: 'p7-m10',
    },

    analogy: {
      title: 'High-Resolution Audio versus Compact MP3',
      text: 'FP32 single precision is like uncompressed 192kHz studio master audio: mathematically immaculate, but consuming gigabytes of storage and overwhelming bandwidth. Quantizing down to INT8 or 4-bit AWQ is like converting to an optimized 320kbps MP3: it discards imperceptible numerical fluctuations while preserving the essential harmonics. The resulting model is 75% smaller and loads 4x faster, while the human ear (or benchmark score) cannot distinguish any loss in fluency.',
      metaphor: 'Quantization trades unneeded floating-point bit precision for massive memory compression and throughput.',
    },

    problemSolved: {
      title: 'Making Foundation Models Economical to Serve at Scale',
      description:
        'Serving an unquantized 70B parameter model in FP16 requires 140GB of VRAM just to load weights—demanding two 80GB A100 GPUs costing over $4/hour. 4-bit quantization compresses the model to ~38GB, allowing it to fit comfortably on a single budget 48GB GPU or unified-memory workstation, cutting hosting infrastructure costs by 70%.',
      keyPoints: [
        'Reduces model weight memory footprint by 50% (INT8) to 75% (INT4) with minimal perplexity degradation',
        'Overcomes the memory-bandwidth bottleneck during decoding by loading smaller weight tensors per step',
        'PagedAttention eliminates GPU memory fragmentation, increasing concurrent serving batch capacity by 2-4x',
      ],
    },

    intuition: {
      overview:
        'Quantization maps continuous 16-bit floating-point weights into low-bit discrete integer buckets through scaling factors and zero points.',
      steps: [
        {
          step: 1,
          title: 'Uniform Affine Quantization',
          description:
            'Continuous range [min_W, max_W] is divided into 2^b discrete bins (e.g. 16 bins for 4-bit). Each weight is rounded to the nearest integer index.',
        },
        {
          step: 2,
          title: 'The Outlier Activation Problem',
          description:
            'Dettmers et al. discovered that 0.1% of hidden state activations across Transformer layers have massive magnitudes (100x larger than average). Naive quantization destroys these outliers, causing perplexity to explode.',
        },
        {
          step: 3,
          title: 'Activation-Aware Weight Quantization (AWQ)',
          description:
            'AWQ identifies that not all weights are equally important: weights that interact with outlier activation channels are protected in higher precision or scaled, preserving accuracy at pure 4-bit speed.',
        },
      ],
    },

    mathematics: {
      overview:
        'Affine quantization defines an invertible transformation between continuous floats and discrete integers.',
      foundations: [
        {
          name: 'Uniform Quantization Equation',
          latex: 'q = \\text{clip}\\left(\\left\\lfloor \\frac{w}{S} \\right\\rceil + Z, \\; 0, \\; 2^b - 1\\right), \\quad S = \\frac{w_{\\text{max}} - w_{\\text{min}}}{2^b - 1}',
          explanation:
            'S is the scale factor and Z is the integer zero-point. The real weight w is dequantized via w_approx = S * (q - Z).',
        },
        {
          name: 'Total Serving VRAM Formula',
          latex: '\\text{VRAM}_{\\text{serving}} = \\left(N \\cdot \\frac{b}{8}\\right) + \\text{KV}_{\\text{cache}}(B, L) + \\text{Act}_{\\text{overhead}} + \\text{CUDA}_{\\text{context}}',
          explanation:
            'Total GPU memory required equals weight size (N * b / 8 bytes) plus dynamic KV cache buffer for batch B and length L plus runtime overhead.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Memory-Bandwidth Speedup from 4-Bit Quantization',
      objective: 'Calculate the theoretical speedup in decode token generation when quantizing weights from 16-bit to 4-bit.',
      steps: [
        {
          step: 1,
          label: 'Memory Transfer per Token (Decode Phase)',
          latex: '\\text{Bytes}_{\\text{FP16}} = N \\times 2 \\text{ bytes}, \\quad \\text{Bytes}_{\\text{INT4}} = N \\times 0.5 \\text{ bytes}',
          explanation: 'Because decode phase is memory-bandwidth bound, time per token is dominated by transferring weights from VRAM to compute cores.',
        },
        {
          step: 2,
          label: 'Theoretical Latency Ratio',
          latex: '\\text{Speedup} = \\frac{\\text{Time}_{\\text{FP16}}}{\\text{Time}_{\\text{INT4}}} \\approx \\frac{\\text{Bytes}_{\\text{FP16}} / \\text{BW}}{\\text{Bytes}_{\\text{INT4}} / \\text{BW}} = \\frac{2.0}{0.5} = 4.0\\times',
          explanation: 'Reading 4x fewer bytes per step provides up to a 4x improvement in raw token emission throughput.',
        },
        {
          step: 3,
          label: 'Real-World Kernel Dequantization Overhead',
          latex: '\\text{Speedup}_{\\text{actual}} \\approx 2.5\\times \\text{ to } 3.2\\times',
          explanation: 'Dequantizing 4-bit integers back to 16-bit registers on-chip consumes minor compute cycles, yielding ~3x net speedup in practice.',
        },
      ],
    },

    variables: [
      { symbol: 'w', name: 'Original Floating-Point Weight', description: 'Raw continuous parameter in FP16 or BF16 format.' },
      { symbol: 'q', name: 'Quantized Discrete Integer', description: 'b-bit integer representation (e.g. 0 to 15 for 4-bit).' },
      { symbol: 'S', name: 'Quantization Scale Factor', description: 'Floating-point multiplier mapping integers back to continuous scale.' },
      { symbol: 'b', name: 'Bit Width', description: 'Number of bits allocated per parameter (e.g. 16, 8, or 4).' },
    ],

    numericalExample: {
      scenario: 'Quantize a single floating-point weight w = 1.35 into 4-bit unsigned integer (b=4, 0 to 15) with range [-2.0, 2.0].',
      dataset: [
        { w_min: -2.0, w_max: 2.0, bitWidth: 4, bins: 15 },
      ],
      calculations: [
        {
          step: 'Scale Factor and Zero-Point Calculation',
          math: 'S = (2.0 - (-2.0)) / (15) = 4.0 / 15 = 0.2667; Zero Point Z = round(- (-2.0) / 0.2667) = round(7.5) = 8',
          result: 'S = 0.2667, Z = 8',
        },
        {
          step: 'Quantize Weight w = 1.35',
          math: 'q = round(1.35 / 0.2667) + 8 = round(5.06) + 8 = 5 + 8 = 13',
          result: 'Quantized integer index q = 13',
        },
        {
          step: 'Dequantize to Reconstruct Real Weight',
          math: 'w_approx = S * (q - Z) = 0.2667 * (13 - 8) = 0.2667 * 5 = 1.3333',
          result: 'w_approx = 1.3333; Quantization error = |1.35 - 1.3333| = 0.0167',
        },
      ],
      finalConclusion: 'The continuous float 1.35 is stored in just 4 bits (integer 13) with an error of only 1.2%.',
    },

    visualExplanation: {
      title: 'vLLM PagedAttention & Continuous Batching',
      description: 'How modern inference servers eliminate memory waste and maximize concurrent query throughput.',
      features: [
        'PagedAttention: Inspired by OS virtual memory paging, stores non-contiguous KV caches in fixed-size blocks (e.g. 16 tokens), cutting memory waste from 70% to under 4%.',
        'Continuous Batching (Iteration-Level): Rather than waiting for an entire batch to finish, new requests enter immediately as soon as any earlier request completes its EOS token.',
        'GGUF Format (llama.cpp): Unified binary format containing model metadata and quantized tensors optimized for CPU and Apple Silicon unified memory.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: 8-Bit Symmetric Quantization and Dequantization Engine',
      code: `import numpy as np

np.random.seed(42)

def quantize_int8_symmetric(weights: np.ndarray):
    """Symmetric INT8 quantization mapping floats to [-127, 127]."""
    # 1. Find absolute maximum value
    max_val = np.max(np.abs(weights))
    scale = max_val / 127.0

    # 2. Quantize: divide by scale, round, clip
    quantized = np.clip(np.round(weights / scale), -127, 127).astype(np.int8)
    return quantized, scale

def dequantize_int8(quantized: np.ndarray, scale: float) -> np.ndarray:
    """Dequantize INT8 back to float32."""
    return (quantized.astype(np.float32) * scale)

# Simulate small weight matrix
W_orig = np.array([[-1.85, 0.42, 1.95], [0.12, -0.95, 0.04]], dtype=np.float32)
W_int8, scale = quantize_int8_symmetric(W_orig)
W_reconstructed = dequantize_int8(W_int8, scale)

print("Original Weights (FP32, 24 bytes):\\n", np.round(W_orig, 3))
print("Quantized INT8 (6 bytes):\\n", W_int8)
print("Dequantized Reconstruction:\\n", np.round(W_reconstructed, 3))
print("Max Absolute Error:", np.round(np.max(np.abs(W_orig - W_reconstructed)), 4))`,
      explanation: 'Demonstrates exact symmetric INT8 quantization: maps continuous weights into 1-byte signed integers and reconstructs them with minimal loss.',
    },

    sklearnCode: {
      title: 'BitsAndBytes 4-bit Quantization Configuration (HuggingFace)',
      code: `# Standard 4-bit NF4 loading with HuggingFace BitsAndBytes (Conceptual reference)
# from transformers import AutoModelForCausalLM, BitsAndBytesConfig
# import torch

# bnb_config = BitsAndBytesConfig(
#     load_in_4bit=True,
#     bnb_4bit_quant_type="nf4",
#     bnb_4bit_compute_dtype=torch.bfloat16,
#     bnb_4bit_use_double_quant=True
# )
# model = AutoModelForCausalLM.from_pretrained(
#     "meta-llama/Meta-Llama-3-8B",
#     quantization_config=bnb_config,
#     device_map="auto"
# )
# print("Loaded 8B model into ~5.5 GB VRAM!")`,
      explanation: 'Shows production 4-bit quantization configuration loading an 8B model onto a consumer GPU.',
    },

    runnableCode: {
      code: `import numpy as np

# Deterministic VRAM sizing calculation for an 8B model
params = 8.0e9

# Weight memory across precision tiers
fp16_gb = (params * 2.0) / (1024**3)
int8_gb = (params * 1.0) / (1024**3)
int4_gb = (params * 0.5) / (1024**3)

print(f"FP16 Weights: {fp16_gb:.2f} GB")
print(f"INT8 Weights: {int8_gb:.2f} GB")
print(f"INT4 Weights: {int4_gb:.2f} GB (75% reduction!)")`,
      expectedOutput: 'FP16 Weights: 14.90 GB\nINT8 Weights: 7.45 GB\nINT4 Weights: 3.73 GB (75% reduction!)',
    },

    lineByLineExplanation: [
      {
        lines: 'fp16_gb = (params * 2.0) / (1024**3)',
        codeSnippet: 'fp16_gb = (params * 2.0) / (1024**3)',
        explanation: 'At 16 bits (2 bytes per parameter), 8B weights occupy 14.90 GB.',
      },
      {
        lines: 'int8_gb = (params * 1.0) / (1024**3)',
        codeSnippet: 'int8_gb = (params * 1.0) / (1024**3)',
        explanation: 'At 8 bits (1 byte per parameter), weights occupy 7.45 GB.',
      },
      {
        lines: 'int4_gb = (params * 0.5) / (1024**3)',
        codeSnippet: 'int4_gb = (params * 0.5) / (1024**3)',
        explanation: 'At 4 bits (0.5 bytes per parameter), weights occupy just 3.73 GB, fitting comfortably in low-cost memory.',
      },
    ],

    hyperparameters: [
      {
        name: 'Quantization Group Size',
        defaultVal: '128',
        range: '32 to 256',
        effect: 'Smaller group size maintains separate scale factors per 32 or 64 weights, improving accuracy at slight metadata storage cost.',
        recommendation: 'Use group_size=128 for AWQ/GPTQ as the standard sweet spot.',
      },
    ],

    assumptions: [
      {
        assumption: 'Quantization Noise Resilience',
        whyItMatters: 'Assumes neural representations are sufficiently over-parameterized to tolerate small perturbations in weight values.',
        howToVerify: 'Benchmark perplexity on Wikitext-2 before and after quantization (target delta < 0.15).',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming a 16GB GPU can serve a 15GB FP16 model',
        solution: 'Weights take 15GB, leaving only 1GB for the KV cache and CUDA runtime. The moment a user submits a long prompt, the GPU crashes with Out-Of-Memory (OOM).',
      },
      {
        mistake: 'Using naive round-to-nearest INT4 without activation protection (AWQ)',
        solution: 'Naive 4-bit clipping destroys critical outlier activations, resulting in catastrophic model degeneration.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Mobile & On-Device Applications',
        application: 'Local Smartphone Assistant',
        benefit: '4-bit GGUF quantization allows a 3B model to run locally on an iPhone or Android device at 25 tokens/second with zero cloud latency.',
      },
      {
        industry: 'High-Volume Enterprise SaaS',
        application: 'High-Throughput Chat Serving',
        benefit: 'vLLM PagedAttention combined with AWQ serves 50 concurrent user streams from a single GPU.',
      },
    ],

    practiceQuestions: [
      {
        id: 'genai-11-pq1',
        question: 'Why does vLLM\'s PagedAttention innovation radically increase serving throughput compared to naive HuggingFace serving?',
        answer: 'Naive serving pre-allocates contiguous VRAM chunks for the maximum possible sequence length (e.g. 8K tokens) for every user request, wasting 60-80% of VRAM due to internal and external fragmentation. PagedAttention allocates KV cache in dynamic non-contiguous 16-token pages, eliminating memory waste and enabling 2-4x larger concurrent batch sizes.',
        explanation: 'More requests batched concurrently translates directly to higher token throughput per GPU.',
      },
      {
        id: 'genai-11-pq2',
        question: 'What is the fundamental difference between Weight-Only Quantization (AWQ/GPTQ) and Weight-and-Activation Quantization (SmoothQuant)?',
        answer: 'Weight-only quantization compresses weights to 4-bit in storage, dequantizing them to 16-bit on the fly during matrix multiplication. Weight-and-activation quantization quantizes both weights and input activations to INT8, utilizing integer INT8 tensor cores for faster arithmetic.',
        explanation: 'Weight-only solves the memory bandwidth bottleneck; weight-and-activation also accelerates compute.',
      },
      {
        id: 'genai-11-pq3',
        question: 'What is the GGUF file format and why is it dominant for local LLM inference?',
        answer: 'GGUF (successor to GGML) is a binary container format created by Georgi Gerganov for llama.cpp. It stores all model hyperparameters, tokenizer vocabulary, and quantized integer tensors in a single file designed for fast mmap loading and execution across mixed CPU, GPU, and Apple Silicon unified memory.',
        explanation: 'GGUF allows local inference without installing heavy Python/PyTorch dependencies.',
      },
    ],

    quiz: [
      {
        id: 'genai-11-q1',
        question: 'How many bytes per parameter are required by an unquantized FP16 model?',
        options: ['2 bytes', '4 bytes', '1 byte', '0.5 bytes'],
        correctIndex: 0,
        explanation: 'FP16 (Half Precision) uses 16 bits = 2 bytes per parameter.',
      },
      {
        id: 'genai-11-q2',
        question: 'Why does naive 4-bit quantization cause severe degradation in Large Language Models?',
        options: [
          'It destroys critical outlier activations that carry disproportionate semantic information',
          '4-bit integers are not supported by Python',
          'Tokenizers cannot read 4-bit numbers',
          'Softmax requires exactly 64 bits to run',
        ],
        correctIndex: 0,
        explanation: 'Outlier activations in deep Transformer layers must be protected via activation-aware algorithms like AWQ.',
      },
      {
        id: 'genai-11-q3',
        question: 'Which inference metric measures the latency between when a user submits a prompt and when the first token appears?',
        options: [
          'Time-to-First-Token (TTFT)',
          'Inter-Token Latency (ITL)',
          'Tokens per Second (TPS)',
          'Perplexity (PPL)',
        ],
        correctIndex: 0,
        explanation: 'TTFT measures the duration of the prefill phase until the initial response token is emitted.',
      },
    ],

    independentExercise: {
      title: 'Calculate Production VRAM Budget for an LLM Serving Cluster',
      problem:
        'Write a Python function calculate_vram_requirement(params_b: float, bit_width: int, batch_size: int, seq_len: int, layers: int = 32, hidden_dim: int = 4096) that computes exact weight memory, KV cache memory, overhead, and total required VRAM in GB.',
      hints: [
        'Weights GB = (params_b * 1e9 * (bit_width / 8)) / (1024**3).',
        'KV Cache GB = (2 * layers * hidden_dim * seq_len * batch_size * 2) / (1024**3).',
        'Add 1.5 GB fixed CUDA overhead + 8% of weights for activations.',
      ],
      starterCode: `def calculate_vram_requirement(
    params_b: float = 8.0,
    bit_width: int = 4,
    batch_size: int = 4,
    seq_len: int = 4096,
    layers: int = 32,
    hidden_dim: int = 4096
) -> dict:
    # TODO: Calculate and return VRAM breakdown in GB
    pass

print(calculate_vram_requirement())`,
      solution: `def calculate_vram_requirement(
    params_b: float = 8.0,
    bit_width: int = 4,
    batch_size: int = 4,
    seq_len: int = 4096,
    layers: int = 32,
    hidden_dim: int = 4096
) -> dict:
    weights_gb = (params_b * 1e9 * (bit_width / 8.0)) / (1024 ** 3)
    # 2 for K and V, 2 bytes for FP16 cache
    kv_bytes = 2 * layers * hidden_dim * seq_len * batch_size * 2
    kv_cache_gb = kv_bytes / (1024 ** 3)
    overhead_gb = 1.5 + (weights_gb * 0.08)
    total_gb = weights_gb + kv_cache_gb + overhead_gb

    return {
        "weights_gb": round(weights_gb, 2),
        "kv_cache_gb": round(kv_cache_gb, 2),
        "overhead_gb": round(overhead_gb, 2),
        "total_required_vram_gb": round(total_gb, 2)
    }

print(calculate_vram_requirement())`,
    },

    summary: {
      keyTakeaways: [
        'Quantization maps continuous float weights into low-bit integers (INT8, 4-bit AWQ), slashing weight memory by up to 75% with negligible perplexity degradation.',
        'Total serving VRAM must account for model weights, dynamic KV caches, runtime activations, and CUDA context overhead.',
        'PagedAttention in vLLM and continuous batching eliminate GPU memory fragmentation, dramatically boosting concurrent enterprise query throughput.',
      ],
      nextLessonId: 'genai-12-open-vs-hosted-models',
      nextLessonTitle: 'GenAI-12: Open and Hosted Language Models',
      nextLessonModuleId: 'p7-m12',
    },
  },

  'genai-12-open-vs-hosted-models': {
    id: 'genai-12-open-vs-hosted-models',
    moduleId: 'p7-m12',
    title: 'GenAI-12: Open and Hosted Language Models',
    subtitle: 'Model Cards, Commercial Licensing, Local Ollama Serving & Safe API Architecture',
    order: 1,
    readTimeMinutes: 32,
    difficulty: 'Beginner',
    visualizerType: 'quantization-size-explorer',

    objectives: [
      'Compare major foundation model families: Meta Llama, Mistral AI, Google Gemma, DeepSeek, Anthropic Claude, and OpenAI GPT',
      'Decode model cards and intellectual property licensing (Apache 2.0 vs Llama Community License vs proprietary API terms of service)',
      'Evaluate the economic and operational trade-offs of Local Inference (Ollama, llama.cpp, vLLM) vs Hosted Cloud APIs',
      'Calculate precise hardware and VRAM requirements for running 7B, 14B, and 70B models locally on consumer devices',
      'Implement enterprise-grade secure API key architecture: backend proxies, environment variables, rate limiting, and zero-paid cost controls',
    ],
    prerequisites: [
      'GenAI-11: Quantization and Model Optimization',
    ],
    previousLesson: {
      id: 'genai-11-quantization-optimization',
      title: 'GenAI-11: Quantization and Model Optimization',
      moduleId: 'p7-m11',
    },

    analogy: {
      title: 'Renting a Cloud Server versus Owning a Private Generator',
      text: 'Using a hosted LLM API (like Google Gemini or OpenAI) is like drawing electricity from the municipal power grid: you flip a switch, get unlimited wattage, and pay only for the exact kilowatt-hours consumed; however, if the grid goes down, your data travels over public lines, or the provider raises prices, you have no recourse. Running an open-weights model locally (via Ollama) is like owning a diesel generator in your backyard: you pay upfront for the hardware, but your electricity is 100% private, runs completely offline, has zero ongoing per-token fees, and can never be censored or turned off by a third party.',
      metaphor: 'Open weights offer data sovereignty and predictable fixed costs; hosted APIs provide zero-setup frontier intelligence.',
    },

    problemSolved: {
      title: 'Navigating Privacy, Compliance, and Cost in Production AI Architecture',
      description:
        'Organizations face strict data privacy laws (HIPAA, GDPR) forbidding sending sensitive user data to external cloud APIs. Furthermore, high-volume production applications can incur astronomical per-token API bills. Open-weights models allow companies to deploy state-of-the-art models within their own private cloud or on-premise hardware with complete compliance and zero data leakage.',
      keyPoints: [
        'Guarantees 100% data sovereignty and regulatory compliance for medical, legal, and financial data',
        'Replaces variable per-token API billing with predictable fixed hardware infrastructure costs',
        'Shields applications from breaking upstream API deprecations, sudden price hikes, or vendor lock-in',
      ],
    },

    intuition: {
      overview:
        'The modern foundation model ecosystem spans a spectrum from fully open-source code and weights to proprietary closed-source APIs.',
      steps: [
        {
          step: 1,
          title: 'Open Weights vs Open Source',
          description:
            'A model with released weights (like Llama 3) is "open-weights", not true open-source: the full pretraining dataset, pipeline code, and training compute logs are often kept proprietary.',
        },
        {
          step: 2,
          title: 'Licensing Guardrails',
          description:
            'Apache 2.0 (e.g. Mistral v0.1, Gemma open subsets) permits unrestricted commercial use. The Llama Community License allows commercial use but requires special permission if monthly active users exceed 700 million.',
        },
        {
          step: 3,
          title: 'Zero-Cost & Free-Tier Development Paths',
          description:
            'Developers do NOT need paid API subscriptions to master GenAI. Google AI Studio provides generous free-tier Gemini API access, and local runtimes like Ollama run 3B and 8B models completely free on consumer laptops.',
        },
      ],
    },

    mathematics: {
      overview:
        'Cost break-even analysis determines when self-hosting becomes cheaper than hosted APIs.',
      foundations: [
        {
          name: 'Hosted API Monthly Cost Model',
          latex: '\\text{Cost}_{\\text{API}} = \\left(\\frac{T_{\\text{in}}}{10^6} \\times P_{\\text{in}}\\right) + \\left(\\frac{T_{\\text{out}}}{10^6} \\times P_{\\text{out}}\\right)',
          explanation:
            'Hosted providers charge directly for input tokens (e.g. $0.50/M) and output tokens (e.g. $1.50/M). Cost scales strictly with usage volume.',
        },
        {
          name: 'Self-Hosted Hardware Break-Even Threshold',
          latex: 'Q_{\\text{break-even}} = \\frac{\\text{Cost}_{\\text{Hardware}} + \\text{Cost}_{\\text{Power/Ops}}}{\\text{Cost per Query}_{\\text{API}}}',
          explanation:
            'Identifies the exact monthly query volume where purchasing or leasing dedicated GPU hardware becomes more cost-effective than paying per API token.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Hardware VRAM Thresholds for Local Inference',
      objective: 'Calculate the minimum GPU VRAM required to host 8B and 70B models at 4-bit precision with 4K context.',
      steps: [
        {
          step: 1,
          label: '4-bit Weight Size Calculation',
          latex: 'M_{\\text{weights}} = N \\times 0.55 \\text{ bytes (including metadata)}',
          explanation: 'For an 8B model: 8e9 * 0.55 = 4.4 GB. For a 70B model: 70e9 * 0.55 = 38.5 GB.',
        },
        {
          step: 2,
          label: 'KV Cache Buffer at 4K Context',
          latex: 'M_{\\text{KV}} = 2 \\times \\text{layers} \\times \\text{heads} \\times d_{\\text{head}} \\times 4096 \\times 2 \\text{ bytes}',
          explanation: 'For 8B model (32 layers, hidden 4096): ~1.0 GB. For 70B model (80 layers, hidden 8192): ~5.2 GB.',
        },
        {
          step: 3,
          label: 'Hardware Recommendation Sizing',
          latex: '\\text{Total}_{8\\text{B}} \\approx 4.4 + 1.0 + 1.2 = 6.6 \\text{ GB} \\implies \\text{RTX 3060 (12GB) / Apple M1 (16GB)}',
          explanation: 'An 8B 4-bit model runs effortlessly on consumer laptops. A 70B model requires 46GB VRAM, fitting on an RTX 3090/4090 pair or a 64GB Mac Studio.',
        },
      ],
    },

    variables: [
      { symbol: 'T_{\\text{in}}, T_{\\text{out}}', name: 'Monthly Token Consumption', description: 'Volume of input and output tokens processed by application.' },
      { symbol: 'P_{\\text{in}}, P_{\\text{out}}', name: 'API Pricing Rates ($/Million Tokens)', description: 'Contracted per-token pricing schedule.' },
      { symbol: 'N', name: 'Model Parameter Size', description: 'Parameter scale of the open-weights model (e.g. 8B, 70B).' },
    ],

    numericalExample: {
      scenario: 'Compare monthly cost for an enterprise handling 50 million queries/month (average 500 input tokens, 200 output tokens) using a Hosted Frontier API ($2.50/M in, $10.00/M out) vs a Dedicated 4x H100 GPU Instance ($8,000/month cloud lease).',
      dataset: [
        { queries: 50e6, inputTokens: 500, outputTokens: 200 },
        { hostedInRate: 2.50, hostedOutRate: 10.00, dedicatedLease: 8000 },
      ],
      calculations: [
        {
          step: 'Hosted API Monthly Cost',
          math: 'Total In Tokens = 50M * 500 = 25B tokens -> 25,000 * $2.50 = $62,500; Total Out Tokens = 50M * 200 = 10B tokens -> 10,000 * $10.00 = $100,000',
          result: 'Total Hosted API Cost = $62,500 + $100,000 = $162,500 / month.',
        },
        {
          step: 'Self-Hosted Dedicated GPU Cost',
          math: 'Dedicated Cloud GPU Cluster = $8,000 / month flat rate',
          result: 'Self-hosted cost = $8,000 / month.',
        },
      ],
      finalConclusion: 'At high scale (50M queries/month), self-hosting open-weight models saves over $154,000 per month (95% cost reduction)!',
    },

    visualExplanation: {
      title: 'Architectural Hierarchy: Closed APIs vs Open Weights vs Local Runtime',
      description: 'Understanding the spectrum of model control, data privacy, and hosting architectures.',
      features: [
        'Proprietary Frontier APIs (Gemini, Claude, GPT-4o): Zero ops, highest reasoning capabilities, per-token billing, data leaves enterprise perimeter.',
        'Self-Hosted Open Weights (vLLM on AWS / GCP): Complete data privacy, customizable weights/LoRAs, predictable GPU lease costs, requires MLOps team.',
        'Local Edge Runtimes (Ollama, llama.cpp): 100% offline, zero cloud dependencies, runs on Mac/Linux/Windows laptops, zero per-token cost.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Secure Backend Proxy with API Key Masking',
      code: `import os

class SecureAPIProxy:
    """Demonstrates safe backend proxy architecture: client never sees the API key."""
    def __init__(self):
        # Read from environment variable; NEVER hardcode secrets in source code!
        self._api_key = os.environ.get("SECURE_AI_API_KEY", "mock-sandbox-key-never-commit")

    def forward_request(self, user_prompt: str, user_auth_token: str) -> dict:
        # 1. Verify user identity on backend
        if not user_auth_token.startswith("valid_session_"):
            return {"error": "Unauthorized user request", "status": 401}

        # 2. Inject secret server-side
        # headers = {"Authorization": f"Bearer {self._api_key}"}
        # In real code: response = requests.post(PROVIDER_URL, headers=headers, json=payload)
        
        masked_key = self._api_key[:4] + "..." + self._api_key[-4:]
        return {
            "status": 200,
            "response": f"Processed query safely: '{user_prompt}'",
            "audit_log": f"Authenticated via server secret [{masked_key}]"
        }

proxy = SecureAPIProxy()
result = proxy.forward_request("Explain transformer self-attention", "valid_session_user_123")
print("Proxy Response:", result["response"])
print("Audit Log:    ", result["audit_log"])`,
      explanation: 'Illustrates the universal security rule: API keys live exclusively on backend servers and are injected into outgoing requests, never exposed to client browsers.',
    },

    sklearnCode: {
      title: 'Local Ollama Python Integration (Zero-Cost / Offline Serving)',
      code: `# Interacting with local Ollama runtime over standard HTTP REST (Conceptual reference)
import json
import urllib.request

def query_local_ollama(prompt: str, model: str = "llama3:8b") -> str:
    url = "http://localhost:11434/api/generate"
    payload = json.dumps({"model": model, "prompt": prompt, "stream": False}).encode("utf-8")
    
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            return result.get("response", "")
    except Exception as e:
        return f"Ollama not running locally: {e}"`,
      explanation: 'Demonstrates querying a local Ollama server running entirely on device hardware with zero external cloud dependencies.',
    },

    runnableCode: {
      code: `import json

# Safe environment variable configuration checker simulation
mock_env = {
    "GEMINI_API_KEY": "AIzaSyD-SafePlaceholderKeyForSandboxVerification",
    "NEXT_PUBLIC_SAFE_FLAG": "true"
}

def check_secret_leakage(env_dict: dict) -> list:
    warnings = []
    for k, v in env_dict.items():
        if k.startswith("NEXT_PUBLIC_") and ("KEY" in k or "SECRET" in k):
            warnings.append(f"CRITICAL: Secret '{k}' exposed with NEXT_PUBLIC_ prefix!")
    return warnings

leakage_report = check_secret_leakage(mock_env)
print("Security Audit Warnings:", leakage_report)
print("Is Environment Safe?", len(leakage_report) == 0)`,
      expectedOutput: 'Security Audit Warnings: []\nIs Environment Safe? True',
    },

    lineByLineExplanation: [
      {
        lines: 'if k.startswith("NEXT_PUBLIC_") and ("KEY" in k or "SECRET" in k):',
        codeSnippet: 'if k.startswith("NEXT_PUBLIC_")...',
        explanation: 'In Next.js, any variable prefixed with NEXT_PUBLIC_ is bundled into client JavaScript sent to every browser.',
      },
      {
        lines: 'warnings.append(...)',
        codeSnippet: 'warnings.append(...)',
        explanation: 'Flags dangerous leaks where private API credentials would be inspectable via browser developer tools.',
      },
      {
        lines: 'print("Is Environment Safe?", ...)',
        codeSnippet: 'print(...)',
        explanation: 'Confirms that secrets are kept safely server-side.',
      },
    ],

    hyperparameters: [
      {
        name: 'Context Length (Local Runner)',
        defaultVal: '4096 tokens',
        range: '2048 to 32768 tokens',
        effect: 'Higher context lengths on local hardware consume substantial RAM/VRAM for KV caches.',
        recommendation: 'Keep local context window around 4K-8K on laptops to prevent system memory swapping.',
      },
    ],

    assumptions: [
      {
        assumption: 'Data Privacy Boundary',
        whyItMatters: 'Assumes proprietary closed APIs maintain privacy policies that do not train on user prompt completions.',
        howToVerify: 'Verify Zero Data Retention (ZDR) agreements and HIPAA Business Associate Agreements (BAA) with vendors.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Committing .env files with live API keys to public GitHub repositories',
        solution: 'Always add .env and .env.local to .gitignore; use automated git pre-commit secret scanners.',
      },
      {
        mistake: 'Prefixing secret API keys with NEXT_PUBLIC_ in Next.js',
        solution: 'Never use NEXT_PUBLIC_ for API keys. Access keys exclusively inside server routes (app/api/...) or Server Components.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Defense & National Security',
        application: 'Air-Gapped Document Intelligence',
        benefit: 'Runs open-weight models inside secure, physically isolated SCIF facilities with zero external internet connectivity.',
      },
      {
        industry: 'Healthcare & Clinical Trials',
        application: 'Patient Record De-Identification',
        benefit: 'Executes HIPAA-compliant medical record redactions locally without transmitting patient health data outside hospital firewalls.',
      },
    ],

    practiceQuestions: [
      {
        id: 'genai-12-pq1',
        question: 'What is the critical distinction between an "Open-Weights" model (like Llama 3) and a true "Open-Source" software project?',
        answer: 'Open-weights models release the neural network parameter tensors for public use and fine-tuning, but typically withhold the proprietary pretraining datasets, data curation filtering code, and full training cluster logs necessary to reproduce the pretraining run from scratch.',
        explanation: 'True open-source requires releasing complete source code and reproducible training recipes.',
      },
      {
        id: 'genai-12-pq2',
        question: 'Why should API keys never be accessed directly from client-side React components in Next.js?',
        answer: 'Because code executed in the browser is completely public; any user can open Chrome Developer Tools, inspect network headers or compiled JavaScript bundles, and extract the secret key, leading to account theft and catastrophic billing abuse.',
        explanation: 'API keys must always remain on a protected backend server route that validates user sessions before proxying requests.',
      },
      {
        id: 'genai-12-pq3',
        question: 'What hardware configuration is required to run a 70B parameter model locally at 4-bit precision?',
        answer: 'A 70B model at 4-bit precision requires ~38.5GB for weights plus ~6GB for KV caches and overhead, totaling ~45-48GB VRAM. This can be served locally on two 24GB GPUs (e.g. 2x RTX 3090/4090 with NVLink/PCIe) or an Apple Mac Studio with 64GB or 128GB Unified Memory.',
        explanation: 'Unified memory on Apple Silicon allows the GPU to access the entire system RAM pool.',
      },
    ],

    quiz: [
      {
        id: 'genai-12-q1',
        question: 'Which of the following is a completely offline, local open-source LLM runtime?',
        options: ['Ollama (llama.cpp)', 'OpenAI GPT-4o API', 'Anthropic Claude API', 'Google Vertex AI Cloud'],
        correctIndex: 0,
        explanation: 'Ollama is a local engine based on llama.cpp that runs open-weights models completely offline on your computer.',
      },
      {
        id: 'genai-12-q2',
        question: 'In Next.js, what happens if you name an environment variable NEXT_PUBLIC_GEMINI_API_KEY?',
        options: [
          'The key is bundled into client-side JavaScript and exposed publicly to anyone visiting your website',
          'The key is encrypted with AES-256',
          'Next.js deletes the variable automatically',
          'The model refuses to generate responses',
        ],
        correctIndex: 0,
        explanation: 'The NEXT_PUBLIC_ prefix instructs Next.js to inject the value into the public browser JavaScript bundle.',
      },
      {
        id: 'genai-12-q3',
        question: 'Which model family is developed by Mistral AI under Apache 2.0 and open-weights licenses?',
        options: ['Mistral & Mixtral', 'Llama 3', 'Claude 3.5', 'GPT-4'],
        correctIndex: 0,
        explanation: 'Mistral AI developed Mistral 7B and Mixtral 8x7B (MoE) with permissive open licenses.',
      },
    ],

    independentExercise: {
      title: 'Build a Secure Local vs Cloud Cost Decision Calculator in Python',
      problem:
        'Write a Python function hosting_cost_decision(monthly_queries: int, avg_input_tokens: int, avg_output_tokens: int, api_input_cost_m: float, api_output_cost_m: float, gpu_server_monthly_cost: float) that compares hosted API cost against self-hosting and returns the more economical choice.',
      hints: [
        'Total input tokens = monthly_queries * avg_input_tokens.',
        'Total output tokens = monthly_queries * avg_output_tokens.',
        'API cost = (total_in / 1e6) * api_input_cost_m + (total_out / 1e6) * api_output_cost_m.',
        'Compare API cost against gpu_server_monthly_cost.',
      ],
      starterCode: `def hosting_cost_decision(
    monthly_queries: int = 1_000_000,
    avg_input_tokens: int = 400,
    avg_output_tokens: int = 150,
    api_input_cost_m: float = 0.50,
    api_output_cost_m: float = 1.50,
    gpu_server_monthly_cost: float = 600.0
) -> dict:
    # TODO: Calculate costs and recommend architecture
    pass

print(hosting_cost_decision(monthly_queries=500_000))` ,
      solution: `def hosting_cost_decision(
    monthly_queries: int = 1_000_000,
    avg_input_tokens: int = 400,
    avg_output_tokens: int = 150,
    api_input_cost_m: float = 0.50,
    api_output_cost_m: float = 1.50,
    gpu_server_monthly_cost: float = 600.0
) -> dict:
    total_in = monthly_queries * avg_input_tokens
    total_out = monthly_queries * avg_output_tokens

    api_cost = (total_in / 1e6) * api_input_cost_m + (total_out / 1e6) * api_output_cost_m
    savings = abs(api_cost - gpu_server_monthly_cost)
    recommendation = "Self-Hosted GPU" if gpu_server_monthly_cost < api_cost else "Hosted Cloud API"

    return {
        "monthly_api_cost_usd": round(api_cost, 2),
        "monthly_gpu_cost_usd": round(gpu_server_monthly_cost, 2),
        "recommended_path": recommendation,
        "monthly_savings_usd": round(savings, 2)
    }

print(hosting_cost_decision(monthly_queries=500_000))`,
    },

    summary: {
      keyTakeaways: [
        'Open-weights models (Llama 3, Mistral) grant data sovereignty and offline capability; hosted APIs provide zero-infrastructure frontier intelligence.',
        'Running 4-bit 8B models locally requires only ~7GB VRAM, fitting easily on modern consumer laptops and workstations.',
        'API keys must NEVER be exposed to client-side code: always route external LLM requests through secure backend proxies with rate limiting.',
      ],
      nextLessonId: 'genai-13-llm-evaluation',
      nextLessonTitle: 'GenAI-13: LLM Evaluation',
      nextLessonModuleId: 'p7-m13',
    },
  },
};

