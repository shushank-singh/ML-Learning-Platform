import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 10: Feed-Forward Blocks (FFN / MLP) (p6-m10)
// =========================================================================
export const p6m10Data: ModuleData = {
  id: 'p6-m10',
  number: 10,
  title: 'Feed-Forward Blocks (FFN / MLP)',
  subtitle: 'Position-Wise Token Processing, Expansion-Contraction & SwiGLU',
  description:
    'Explore the computational engine where factual knowledge and relational reasoning are stored in Transformers. Understand position-wise two-layer expansion-contraction MLPs (d_model -> 4*d_model -> d_model), why Attention mixes across space while FFN processes features independently, and modern gated activations: ReLU, GELU, and SwiGLU.',
  icon: 'Cpu',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-10-feed-forward-networks',
      moduleId: 'p6-m10',
      title: 'TF-10: Feed-Forward Blocks (FFN / MLP)',
      description:
        'Position-wise feed-forward networks, expansion-contraction mechanics, key-value memory interpretation, and modern SwiGLU gated activations.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 11: Encoder-Only, Decoder-Only & Encoder-Decoder (p6-m11)
// =========================================================================
export const p6m11Data: ModuleData = {
  id: 'p6-m11',
  number: 11,
  title: 'Encoder-Only, Decoder-Only & Encoder-Decoder',
  subtitle: 'The Architectural Taxonomy: BERT vs GPT vs T5 & Cross-Attention',
  description:
    'Deconstruct the three canonical Transformer architectural branches. Contrast bidirectional Encoder-Only models (BERT/RoBERTa for embeddings and classification), causal Decoder-Only models (GPT/LLaMA for text generation), and Encoder-Decoder models (T5/BART for translation). Master cross-attention mechanics where decoders query encoder representations.',
  icon: 'Layers',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-11-encoder-decoder-architectures',
      moduleId: 'p6-m11',
      title: 'TF-11: Encoder-Only, Decoder-Only & Encoder-Decoder',
      description:
        'Architectural taxonomy, BERT vs GPT vs T5 trade-offs, Cross-Attention mechanics, and choosing the right backbone for every NLP task.',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 12: Autoregressive Generation & KV Caching (p6-m12)
// =========================================================================
export const p6m12Data: ModuleData = {
  id: 'p6-m12',
  number: 12,
  title: 'Autoregressive Generation & KV Caching',
  subtitle: 'Next-Token Decoding Loops, O(1) Inference & Memory Management',
  description:
    'Master the inference mechanics of autoregressive foundation models. Trace the next-token prediction loop from prompt tokens to logits and sampling. Discover why naive generation suffers from disastrous O(N^2) redundant recomputation, and how Key-Value (KV) Caching reduces per-step complexity to O(1). Calculate KV cache VRAM budgets and explore PagedAttention.',
  icon: 'FastForward',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-12-autoregressive-generation-kv-cache',
      moduleId: 'p6-m12',
      title: 'TF-12: Autoregressive Generation & KV Caching',
      description:
        'Next-token prediction loop, greedy vs sampling decoding, naive generation quadratic slowdown, KV Caching implementation, and VRAM budgeting.',
      order: 1,
      readTimeMinutes: 32,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS
// =========================================================================
export const tfModule4Lessons: Record<string, LessonContent> = {
  'tf-10-feed-forward-networks': {
    id: 'tf-10-feed-forward-networks',
    moduleId: 'p6-m10',
    title: 'TF-10: Feed-Forward Blocks (FFN / MLP)',
    subtitle: 'Position-Wise Feature Processing & Factual Knowledge Storage',
    order: 1,
    readTimeMinutes: 28,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand the complementary roles of Self-Attention (token communication) and FFN (token computation/knowledge retrieval)',
      'Explain the expansion-contraction architecture: projecting d_model up to 4*d_model and back down to d_model',
      'Analyze the "FFN as Key-Value Memory" interpretation where layer 1 acts as keys and layer 2 delivers factual values',
      'Derive and implement modern SwiGLU (Swish Gated Linear Unit) activation used in LLaMA, PaLM, and Mistral',
    ],
    prerequisites: ['TF-08: Multi-Head Attention (MHA)', 'TF-09: Residual Connections & Layer Normalization'],
    previousLesson: {
      id: 'tf-09-residual-layer-norm',
      title: 'TF-09: Residual Connections & Layer Normalization',
      moduleId: 'p6-m9',
    },
    analogy: {
      title: 'Group Brainstorming vs Individual Deep Thinking',
      text: 'In an effective team meeting, work alternates between two distinct phases. Phase 1 is Group Brainstorming (Self-Attention): everyone talks to each other across the conference table, exchanging ideas and gathering context from colleagues. But you cannot stay in group conversation forever; at some point, you must sit at your own desk in silence (Feed-Forward Network) to open your personal encyclopedia, process what you just heard, retrieve facts from memory, and synthesize your thoughts. In Transformers, Self-Attention is the group discussion where tokens talk across sequence positions. The FFN is the private desk where each token processes its gathered information in complete isolation without talking to other tokens.',
      metaphor: 'Attention mixes information between different tokens; the Feed-Forward Network processes features inside each token.',
    },
    problemSolved: {
      title: 'Pure Linear Attention Cannot Store Deep Factual Memories',
      description:
        'Self-attention layers compute weighted averages of existing Value vectors; they cannot synthesize new non-linear feature combinations or store massive encyclopedic associations on their own.',
      keyPoints: [
        'Separation of Concerns: Self-attention handles spatial routing; FFN handles non-linear computation and memory storage.',
        'Parameter Dominance: In standard Transformers, ~66% of all model parameters reside in the FFN layers!',
        'Key-Value Memory: Research (Geva et al.) proves that FFN first layers act as keys recognizing concepts, while second layers act as values storing facts.',
      ],
    },
    intuition: {
      overview:
        'The Feed-Forward Network is applied to each token position separately and identically (Position-Wise). It consists of two linear transformations with a non-linear activation in between.',
      steps: [
        { step: 1, title: 'Dimension Expansion', description: 'Project token vector from d_model up to intermediate dimension d_ff (typically 4 * d_model).' },
        { step: 2, title: 'Non-Linear Gating', description: 'Apply non-linear activation (GELU, ReLU, or SwiGLU gating) to create sparse feature combinations.' },
        { step: 3, title: 'Dimension Contraction', description: 'Project back down from d_ff to d_model so the output can be added via residual connection.' },
        { step: 4, title: 'Zero Spatial Leakage', description: 'Token at position 3 has zero influence on the FFN calculation of token at position 4.' },
      ],
    },
    mathematics: {
      overview: 'Formulations for Standard FFN and Modern SwiGLU FFN.',
      foundations: [
        {
          name: 'Standard Two-Layer Transformer FFN (Vaswani 2017)',
          latex: '\\text{FFN}(x) = \\max(0, x W_1 + b_1) W_2 + b_2 \\quad \\text{where } W_1 \\in \\mathbb{R}^{d \\times 4d}, \\; W_2 \\in \\mathbb{R}^{4d \\times d}',
          explanation: 'Expands to 4x dimension with ReLU (or GELU), then contracts back to d_model.',
        },
        {
          name: 'Swish / SiLU Activation',
          latex: '\\text{SiLU}(x) = x \\cdot \\sigma(x) = \\frac{x}{1 + e^{-x}}',
          explanation: 'Smooth, non-monotonic activation function that outperforms ReLU by allowing small negative gradients.',
        },
        {
          name: 'Modern SwiGLU Gated FFN (LLaMA & Mistral)',
          latex: '\\text{SwiGLU}(x) = \\left( \\text{SiLU}(x W_{\\text{gate}}) \\odot (x W_{\\text{up}}) \\right) W_{\\text{down}}',
          explanation: 'Gated linear unit where one projection acts as a multiplicative dynamic gate controlling information flow.',
        },
      ],
    },
    derivation: {
      title: 'Parameter Count Comparison: Standard FFN vs SwiGLU FFN',
      objective: 'Calculate the total parameters in standard FFN vs SwiGLU and explain intermediate dimension tuning.',
      steps: [
        {
          step: 1,
          label: 'Standard FFN Parameter Count',
          latex: '\\text{Params}_{\\text{std}} = 2 \\times (d_{\\text{model}} \\times 4 d_{\\text{model}}) = 8 d_{\\text{model}}^2',
          explanation: 'W_1 has 4*d^2 weights and W_2 has 4*d^2 weights, totaling 8*d^2.',
        },
        {
          step: 2,
          label: 'SwiGLU Three-Matrix Architecture',
          latex: '\\text{Params}_{\\text{SwiGLU}} = 3 \\times (d_{\\text{model}} \\times d_{\\text{ff}})',
          explanation: 'SwiGLU requires 3 weight matrices: W_gate, W_up, and W_down.',
        },
        {
          step: 3,
          label: 'Equalizing Parameter Budget',
          latex: '3 d_{\\text{model}} d_{\\text{ff}} = 8 d_{\\text{model}}^2 \\implies d_{\\text{ff}} = \\frac{8}{3} d_{\\text{model}} \\approx 2.67 d_{\\text{model}}',
          explanation: 'To match standard FFN compute, Shazeer sets d_ff to (2/3) * 4 * d_model = (8/3) * d_model.',
        },
        {
          step: 4,
          label: 'Rounding to Hardware-Friendly Multiples',
          latex: 'd_{\\text{ff}} = 256 \\times \\left\\lfloor \\frac{2 \\times 4 d_{\\text{model}} / 3 + 255}{256} \\right\\rfloor',
          explanation: 'In LLaMA, d_ff is rounded to the nearest multiple of 256 for GPU tensor core efficiency (e.g. 11,008 for 7B).',
        },
      ],
    },
    variables: [
      { symbol: 'd_model', name: 'Model Hidden Size', description: 'Token vector dimension (e.g. 4096 in LLaMA-7B)', dimensions: 'Scalar integer' },
      { symbol: 'd_ff', name: 'Intermediate FFN Dimension', description: 'Expanded hidden layer dimension (typically 4 * d_model or 8/3 * d_model in SwiGLU)', dimensions: 'Scalar integer' },
      { symbol: 'W_gate, W_up', name: 'Ascending Projection Matrices', description: 'Linearly expand input into gating and feature representations', dimensions: '(d_model, d_ff)' },
      { symbol: 'W_down', name: 'Descending Projection Matrix', description: 'Projects gated features back to model dimension', dimensions: '(d_ff, d_model)' },
    ],
    numericalExample: {
      scenario: 'Computing SwiGLU on a 1D vector x = [1.0, 0.5] with d_model = 2 and d_ff = 2.',
      dataset: [
        { matrix: 'W_gate', col0: '[1, 0]', col1: '[0, 2]' },
        { matrix: 'W_up', col0: '[2, 1]', col1: '[1, 2]' },
        { matrix: 'W_down', col0: '[1, 0]', col1: '[0, 1]' },
      ],
      calculations: [
        { step: 'Gate linear projection', math: '[1*1 + 0.5*0, 1*0 + 0.5*2]', result: '[1.0, 1.0]' },
        { step: 'SiLU on gate: z / (1 + e^-z)', math: '[1.0 / (1 + 0.368), 1.0 / (1 + 0.368)]', result: '[0.731, 0.731]' },
        { step: 'Up linear projection', math: '[1*2 + 0.5*1, 1*1 + 0.5*2]', result: '[2.5, 2.0]' },
        { step: 'Element-wise gating: SiLU(gate) * up', math: '[0.731 * 2.5, 0.731 * 2.0]', result: '[1.828, 1.462]' },
        { step: 'Down projection: gated @ W_down', math: '[1.828*1 + 1.462*0, 1.828*0 + 1.462*1]', result: '[1.828, 1.462]' },
      ],
      finalConclusion: 'The dynamic multiplicative gate scaled down the up-projection activations based on non-linear feature relevance.',
    },
    visualExplanation: {
      title: 'Position-Wise FFN Architecture',
      description: 'Unlike attention which mixes horizontally across sequence length, FFN processes vertically inside each token.',
      features: [
        'Tokens are processed in parallel completely independently of one another.',
        'Dimension balloons up by 4x to create high-capacity non-linear feature combinations.',
        'Dimension contracts back to d_model to merge seamlessly into the residual stream.',
      ],
    },
    scratchCode: {
      title: 'SwiGLU and Standard GELU FFN in Pure NumPy',
      code: `import numpy as np

def silu(x):
    return x / (1.0 + np.exp(-x))

def gelu(x):
    return 0.5 * x * (1.0 + np.tanh(np.sqrt(2.0 / np.pi) * (x + 0.044715 * np.power(x, 3))))

class SwiGLUNumPy:
    def __init__(self, d_model, d_ff):
        np.random.seed(42)
        self.W_gate = np.random.randn(d_model, d_ff) * 0.1
        self.W_up = np.random.randn(d_model, d_ff) * 0.1
        self.W_down = np.random.randn(d_ff, d_model) * 0.1

    def forward(self, x):
        # x shape: (Batch, SeqLen, d_model)
        gate = silu(x @ self.W_gate)
        up = x @ self.W_up
        # Element-wise multiplicative gating
        return (gate * up) @ self.W_down

x = np.random.randn(1, 4, 8)
swiglu = SwiGLUNumPy(d_model=8, d_ff=16)
out = swiglu.forward(x)

print("Input shape:  ", x.shape)
print("Output shape: ", out.shape)
print("First token output (first 4 dims):", np.round(out[0, 0, :4], 3))`,
      explanation: 'SwiGLU uses multiplicative gating `gate * up` which allows the network to suppress or enhance specific channels dynamically.',
    },
    sklearnCode: {
      title: 'PyTorch SwiGLU Feed-Forward Block (LLaMA Style)',
      code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class LLaMASwiGLU(nn.Module):
    def __init__(self, d_model: int, d_ff: int):
        super().__init__()
        self.w_gate = nn.Linear(d_model, d_ff, bias=False)
        self.w_up = nn.Linear(d_model, d_ff, bias=False)
        self.w_down = nn.Linear(d_ff, d_model, bias=False)

    def forward(self, x):
        # SwiGLU: (SiLU(x @ W_gate) * (x @ W_up)) @ W_down
        return self.w_down(F.silu(self.w_gate(x)) * self.w_up(x))

# Test in PyTorch
d_model = 64
d_ff = int(2 * 4 * d_model / 3)  # LLaMA scaling
ffn = LLaMASwiGLU(d_model, d_ff)

x = torch.randn(2, 10, d_model)
out = ffn(x)
print("PyTorch SwiGLU output shape:", out.shape)`,
      explanation: 'Omitting bias terms (`bias=False`) and using `F.silu` matches the exact implementation in open foundation models.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate SwiGLU calculation directly in browser Pyodide
def silu(x):
    return x / (1.0 + np.exp(-x))

def swiglu(x, W_gate, W_up, W_down):
    gate = silu(x @ W_gate)
    up = x @ W_up
    return (gate * up) @ W_down

np.random.seed(42)
d_model, d_ff = 4, 8
x = np.array([[1.0, 0.5, -1.0, 0.0]])
W_gate = np.random.randn(d_model, d_ff) * 0.1
W_up = np.random.randn(d_model, d_ff) * 0.1
W_down = np.random.randn(d_ff, d_model) * 0.1

out = swiglu(x, W_gate, W_up, W_down)
print("SwiGLU output shape:", out.shape)
print("SwiGLU output values:", np.round(out, 4))`,
      expectedOutput: `SwiGLU output shape: (1, 4)
SwiGLU output values: [[-0.0006 -0.0001  0.0001  0.0031]]`,
    },
    lineByLineExplanation: [
      { lines: 'gate = silu(x @ W_gate)', codeSnippet: 'gate = silu(x @ W_gate)', explanation: 'Applies SiLU (Swish) non-linearity to the gate projection.' },
      { lines: 'up = x @ W_up', codeSnippet: 'up = x @ W_up', explanation: 'Computes parallel un-activated linear projection.' },
      { lines: '(gate * up) @ W_down', codeSnippet: 'return (gate * up) @ W_down', explanation: 'Multiplies gate element-wise with up-projection, then projects back down to d_model.' },
    ],
    hyperparameters: [
      { name: 'd_ff', defaultVal: '4 * d_model (Standard) / 2.67 * d_model (SwiGLU)', range: '2 * d_model to 8 * d_model', effect: 'Dimensionality of hidden expansion layer', recommendation: 'For SwiGLU, set d_ff = round_to_multiple(8/3 * d_model, 256).' },
      { name: 'activation', defaultVal: 'SwiGLU / GELU', range: 'ReLU, GELU, SwiGLU', effect: 'Non-linear gating function', recommendation: 'SwiGLU consistently outperforms GELU by ~0.5 perplexity points across benchmark evaluations.' },
    ],
    assumptions: [
      { assumption: 'Position Independence', whyItMatters: 'FFN applies the identical weight matrix to every token without inspecting neighboring tokens.', howToVerify: 'Verify that FFN matrix multiplication has zero interaction along the sequence dimension (dim 1).' },
    ],
    commonMistakes: [
      { mistake: 'Thinking Attention stores all model knowledge', solution: 'Self-attention only routes tokens. Research shows factual associations ("Eiffel Tower" -> "Paris") are stored primarily in FFN weights.', howToFix: 'Do not reduce FFN parameter count drastically relative to attention.' },
      { mistake: 'Forgetting that SwiGLU requires three weight matrices', solution: 'Standard FFN has 2 matrices (up and down); SwiGLU has 3 matrices (gate, up, and down).', howToFix: 'Ensure parameter budget accounts for 3 matrices by adjusting d_ff.' },
    ],
    realWorldUseCases: [
      { industry: 'Model Editing & Knowledge Locating', application: 'ROME (Rank-One Model Editing) & MEMIT', benefit: 'Directly editing key-value weights in mid-level FFN layers updates factual beliefs (e.g. updating the current CEO of a company) without retraining.' },
      { industry: 'Mixture of Experts (MoE)', application: 'Mixtral 8x7B, Grok-1, DeepSeek-V2', benefit: 'Replaces the dense FFN with multiple sparse expert FFNs, activating only 2 out of 8 experts per token to cut inference compute by 4x.' },
    ],
    practiceQuestions: [
      { id: 'tf10-p1', question: 'What is the primary difference in role between Self-Attention and the Feed-Forward Block?', answer: 'Self-attention allows tokens to communicate and aggregate context across time (horizontal mixing). The Feed-Forward Block processes features inside each token independently and retrieves stored factual knowledge (vertical processing).', explanation: 'Attention is communication; FFN is computation and memory.' },
      { id: 'tf10-p2', question: 'Why does SwiGLU set d_ff to approximately 8/3 * d_model instead of 4 * d_model?', answer: 'Because SwiGLU uses 3 projection matrices (W_gate, W_up, W_down) instead of 2. Setting d_ff to 8/3 * d_model keeps total parameters and FLOPs equal to standard FFN (3 * 8/3 = 8 = 2 * 4).', explanation: 'This ensures a fair apples-to-apples comparison with standard 2-layer FFNs.' },
      { id: 'tf10-p3', question: 'How is a Mixture of Experts (MoE) architecture created from a standard Transformer block?', answer: 'By replacing the single dense FFN with multiple parallel FFN "experts" and using a router network to send each token to the top-K experts (e.g. top-2 of 8).', explanation: 'Self-attention remains shared across all tokens, while the FFN is sparsified.' },
    ],
    quiz: [
      {
        id: 'tf10-q1',
        question: 'Approximately what percentage of total parameters in a standard Transformer reside inside the FFN layers?',
        options: ['10%', '33%', '66%', '95%'],
        correctIndex: 2,
        explanation: 'In a standard Transformer block, attention has 4 * d^2 weights (Q, K, V, O) while FFN has 8 * d^2 weights (W_1, W_2), so FFN accounts for ~66.7% of layer weights.',
      },
      {
        id: 'tf10-q2',
        question: 'Does the Feed-Forward Network mix information between different tokens across sequence positions?',
        options: [
          'Yes, through matrix multiplication',
          'No, it operates position-wise (identically and independently on each individual token)',
          'Yes, if sequence length is less than 512',
          'Only when causal masking is disabled',
        ],
        correctIndex: 1,
        explanation: 'The FFN is strictly position-wise: each token is transformed through the exact same MLP weights without looking at other tokens.',
      },
      {
        id: 'tf10-q3',
        question: 'Which modern gated activation function is used in LLaMA, PaLM, and Mistral?',
        options: ['Sigmoid', 'SwiGLU', 'LeakyReLU', 'Hardtanh'],
        correctIndex: 1,
        explanation: 'SwiGLU (Swish Gated Linear Unit, Shazeer 2020) provides superior gradient flow and empirical performance across modern LLM benchmarks.',
      },
    ],
    independentExercise: {
      title: 'Implement SwiGLU Layer with Parameter Validation',
      problem:
        'Write a Python class `SwiGLUBlock(d_model)` that computes `d_ff = int(2 * 4 * d_model / 3)` and implements forward pass `(silu(x @ W_gate) * (x @ W_up)) @ W_down` in NumPy.',
      hints: [
        'Calculate d_ff = int(8 * d_model / 3).',
        'Initialize W_gate, W_up of shape (d_model, d_ff) and W_down of shape (d_ff, d_model).',
        'Define silu(z) = z / (1 + np.exp(-z)).',
      ],
      starterCode: `import numpy as np

class SwiGLUBlock:
    def __init__(self, d_model):
        # TODO: compute d_ff and initialize 3 weight matrices
        pass

    def forward(self, x):
        # TODO: implement SwiGLU forward pass
        pass

layer = SwiGLUBlock(d_model=12)
x = np.ones((1, 2, 12))
out = layer.forward(x)
print("Output shape (must be 1, 2, 12):", out.shape)`,
      solution: `import numpy as np

class SwiGLUBlock:
    def __init__(self, d_model):
        np.random.seed(42)
        self.d_model = d_model
        self.d_ff = int(8 * d_model / 3)
        self.W_gate = np.random.randn(d_model, self.d_ff) * 0.1
        self.W_up = np.random.randn(d_model, self.d_ff) * 0.1
        self.W_down = np.random.randn(self.d_ff, d_model) * 0.1

    def forward(self, x):
        gate = x @ self.W_gate
        silu_gate = gate / (1.0 + np.exp(-gate))
        up = x @ self.W_up
        return (silu_gate * up) @ self.W_down

layer = SwiGLUBlock(d_model=12)
x = np.ones((1, 2, 12))
out = layer.forward(x)
print("Output shape (must be 1, 2, 12):", out.shape)`,
    },
    summary: {
      keyTakeaways: [
        'Attention routes tokens across time; FFN processes and remembers features inside each token.',
        'The FFN accounts for approximately two-thirds of all parameters in a standard Transformer block.',
        'SwiGLU introduces dynamic multiplicative gating, delivering superior empirical scaling in modern LLMs.',
        'The FFN is position-wise: identical weights apply to each token independently without spatial leakage.',
      ],
      nextLessonId: 'tf-11-encoder-decoder-architectures',
      nextLessonTitle: 'TF-11: Encoder-Only, Decoder-Only & Encoder-Decoder',
      nextLessonModuleId: 'p6-m11',
    },
  },

  'tf-11-encoder-decoder-architectures': {
    id: 'tf-11-encoder-decoder-architectures',
    moduleId: 'p6-m11',
    title: 'TF-11: Encoder-Only, Decoder-Only & Encoder-Decoder',
    subtitle: 'The Architectural Taxonomy: BERT vs GPT vs T5 & Cross-Attention Mechanics',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Compare the three canonical Transformer architectural branches: Encoder-Only, Decoder-Only, and Encoder-Decoder',
      'Explain the pretraining objectives and ideal application niches for BERT, GPT, and T5',
      'Master Cross-Attention mechanics where Decoder Queries attend to Encoder Keys and Values',
      'Understand why Decoder-Only architectures have become the dominant paradigm for frontier Large Language Models',
    ],
    prerequisites: ['TF-07: Attention Masks (Causal & Padding Masks)', 'TF-10: Feed-Forward Blocks (FFN / MLP)'],
    previousLesson: {
      id: 'tf-10-feed-forward-networks',
      title: 'TF-10: Feed-Forward Blocks (FFN / MLP)',
      moduleId: 'p6-m10',
    },
    analogy: {
      title: 'The Detective, The Storyteller, and The Diplomatic Translator',
      text: 'Think of the three Transformer families as three distinct professionals. 1. The Detective (Encoder-Only like BERT): inspects an entire crime scene with bidirectional vision. The detective reads clues backwards and forwards to classify whether a document is fraudulent or extract entities. 2. The Storyteller (Decoder-Only like GPT): sits at a typewriter and generates a novel word-by-word into the future. The storyteller can look back at past chapters, but cannot peek into future chapters that haven\'t been written yet. 3. The Diplomatic Translator (Encoder-Decoder like T5): reads an entire foreign speech thoroughly with bidirectional understanding (Encoder), and then sits down to draft the English translation word-by-word using cross-attention (Decoder) to consult the original transcript.',
      metaphor: 'Encoders understand and classify; Decoders generate text; Encoder-Decoders transform one sequence into another.',
    },
    problemSolved: {
      title: 'Choosing the Right Architecture for Diverse Machine Learning Tasks',
      description:
        'Different NLP tasks require fundamentally different information access patterns. Using an autoregressive decoder for sentiment analysis is inefficient, while using an encoder for text generation is impossible without slow non-autoregressive heuristics.',
      keyPoints: [
        'Encoder-Only: Full bidirectional attention. Perfect for classification, NER, semantic search embeddings, and code analysis.',
        'Decoder-Only: Causal masked attention. The undisputed champion for autoregressive generation, reasoning, and few-shot in-context learning.',
        'Encoder-Decoder: Decoupled input and output lengths. Ideal for translation, text-to-speech, and abstractive summarization.',
      ],
    },
    intuition: {
      overview:
        'The original 2017 Transformer was an Encoder-Decoder model. Modern architectures selectively discard either the decoder or the encoder depending on their operational goal.',
      steps: [
        { step: 1, title: 'Encoder-Only (BERT)', description: 'Stack of bidirectional self-attention blocks. Pretrained on Masked Language Modeling (MLM: predicting filled [MASK] tokens).' },
        { step: 2, title: 'Decoder-Only (GPT)', description: 'Stack of causal masked self-attention blocks. Pretrained on Next-Token Prediction (Causal Language Modeling / CLM).' },
        { step: 3, title: 'Encoder-Decoder (T5)', description: 'Encoder processes source text bidirectionally. Decoder uses Cross-Attention to query encoder features while generating output causally.' },
        { step: 4, title: 'Cross-Attention Bridge', description: 'Queries Q come from the Decoder; Keys K and Values V come from the final layer of the Encoder.' },
      ],
    },
    mathematics: {
      overview: 'Formulations for Self-Attention vs Cross-Attention.',
      foundations: [
        {
          name: 'Encoder / Decoder Self-Attention',
          latex: 'Q = X W_Q, \\quad K = X W_K, \\quad V = X W_V \\quad (X \\text{ from same layer})',
          explanation: 'All three projections derive from the exact same sequence X.',
        },
        {
          name: 'Decoder Cross-Attention (Encoder-Decoder Attention)',
          latex: 'Q = H_{\\text{dec}} W_Q, \\quad K = H_{\\text{enc}} W_K, \\quad V = H_{\\text{enc}} W_V',
          explanation: 'Queries come from the decoder sequence H_dec in R^{T_y x d}; Keys and Values come from encoder H_enc in R^{T_x x d}.',
        },
        {
          name: 'Cross-Attention Dimension Shape',
          latex: 'A_{\\text{cross}} = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) \\in \\mathbb{R}^{T_y \\times T_x}',
          explanation: 'Maps each generated output token t_y across all input source tokens t_x, bridging different sequence lengths.',
        },
      ],
    },
    derivation: {
      title: 'Why Has Decoder-Only Become the Dominant Paradigm?',
      objective: 'Analyze the architectural reasons why Decoder-Only models (GPT, LLaMA) outgrew Encoder-Decoder models (T5).',
      steps: [
        {
          step: 1,
          label: 'Unified Next-Token Objective',
          latex: '\\mathcal{L}_{\\text{CLM}} = -\\sum_{t=1}^T \\log P(x_t \\mid x_{<t})',
          explanation: 'Any task (classification, summarization, math, coding) can be framed as prompt completion.',
        },
        {
          step: 2,
          label: 'Zero Architectural Waste',
          latex: '\\text{Weights}_{\\text{Decoder-Only}} = N_{\\text{layers}} \\times \\text{DecoderLayer}',
          explanation: 'In Encoder-Decoder models, half the parameters sit idle if the prompt is short or output is long.',
        },
        {
          step: 3,
          label: 'KV Cache Efficiency in Inference',
          latex: '\\text{KV Cache Reuse}',
          explanation: 'Decoder-only models can append new conversation turns directly onto existing KV caches without re-encoding prompts.',
        },
        {
          step: 4,
          label: 'Scaling Laws Empirical Proof',
          latex: '\\text{Perplexity} \\propto C^{-\\alpha}',
          explanation: 'Decoder-only models demonstrate the most predictable scaling curves across compute budgets.',
        },
      ],
    },
    variables: [
      { symbol: 'T_x', name: 'Encoder Sequence Length', description: 'Number of tokens in source input document (e.g. 500 words)', dimensions: 'Scalar integer' },
      { symbol: 'T_y', name: 'Decoder Sequence Length', description: 'Number of tokens in target generated output (e.g. 50 words)', dimensions: 'Scalar integer' },
      { symbol: 'H_{\\text{enc}}', name: 'Encoder Output Representations', description: 'Contextualized vectors from top encoder layer', dimensions: '(Batch, T_x, d_model)' },
      { symbol: 'H_{\\text{dec}}', name: 'Decoder State', description: 'Intermediate representation inside decoder layer', dimensions: '(Batch, T_y, d_model)' },
    ],
    numericalExample: {
      scenario: 'Tracing Cross-Attention shapes for English-to-French translation: English prompt has 4 tokens, French output has 3 tokens, d_k = 2.',
      dataset: [
        { tensor: 'Decoder Q', shape: '(1, 3, 2)', description: '3 French output tokens asking questions' },
        { tensor: 'Encoder K', shape: '(1, 4, 2)', description: '4 English input tokens offering answers' },
        { tensor: 'Encoder V', shape: '(1, 4, 2)', description: '4 English input tokens delivering semantic content' },
      ],
      calculations: [
        { step: 'Q @ K.T score matrix shape', math: '(1, 3, 2) @ (1, 2, 4)', result: '(1, 3, 4)' },
        { step: 'Softmax over English tokens', math: 'Row-wise softmax along axis=-1', result: '3x4 attention matrix (each row sums to 1.0)' },
        { step: 'Multiply by V', math: '(1, 3, 4) @ (1, 4, 2)', result: '(1, 3, 2) (Updated French token representations)' },
      ],
      finalConclusion: 'Cross-attention seamlessly maps 3 target tokens across 4 source tokens without requiring equal lengths.',
    },
    visualExplanation: {
      title: 'Architectural Comparison Diagram',
      description: 'The three Transformer families organize information flow across two fundamental dimensions: directionality and task scope.',
      features: [
        'Encoder-Only: Symmetrical bidirectional attention. Every token sees every other token.',
        'Decoder-Only: Lower-triangular causal attention. Tokens can only see past tokens.',
        'Encoder-Decoder: Dual-stack architecture. Bidirectional encoder feeds causal decoder via cross-attention.',
      ],
    },
    scratchCode: {
      title: 'Cross-Attention Implementation from Scratch in Pure NumPy',
      code: `import numpy as np

def cross_attention(decoder_x, encoder_mem, W_q, W_k, W_v):
    # decoder_x: (Batch, Ty, d_model) - target tokens
    # encoder_mem: (Batch, Tx, d_model) - source tokens
    d_k = W_q.shape[-1]
    
    # 1. Queries from Decoder, Keys & Values from Encoder
    Q = decoder_x @ W_q    # (Batch, Ty, d_k)
    K = encoder_mem @ W_k  # (Batch, Tx, d_k)
    V = encoder_mem @ W_v  # (Batch, Tx, d_v)
    
    # 2. Pairwise Cross-Affinity: (Batch, Ty, Tx)
    scores = (Q @ np.swapaxes(K, -2, -1)) / np.sqrt(d_k)
    exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
    
    # 3. Context output: (Batch, Ty, d_v)
    return weights @ V, weights

np.random.seed(42)
B, Ty, Tx, d_model = 1, 3, 5, 8
d_k = 4

decoder_tokens = np.random.randn(B, Ty, d_model)
encoder_tokens = np.random.randn(B, Tx, d_model)

W_q = np.random.randn(d_model, d_k) * 0.1
W_k = np.random.randn(d_model, d_k) * 0.1
W_v = np.random.randn(d_model, d_k) * 0.1

out, weights = cross_attention(decoder_tokens, encoder_tokens, W_q, W_k, W_v)

print("Cross-Attention weights shape: ", weights.shape, "-> (Batch, Target_Len, Source_Len)")
print("Each French word attends across all 5 English words (row sums = 1.0):")
print(np.round(np.sum(weights, axis=-1), 4))
print("Output context shape:          ", out.shape)`,
      explanation: 'Notice how the attention matrix has shape `(Ty, Tx)`: each target token (row) distributes 100% of its attention across all source tokens (columns).',
    },
    sklearnCode: {
      title: 'PyTorch Full Transformer (nn.Transformer vs Decoder-Only)',
      code: `import torch
import torch.nn as nn

# 1. Classical Encoder-Decoder (Vaswani 2017)
encoder_decoder = nn.Transformer(
    d_model=64, nhead=4, num_encoder_layers=3, num_decoder_layers=3, batch_first=True
)

src = torch.randn(2, 10, 64)  # English: 10 tokens
tgt = torch.randn(2, 6, 64)   # French: 6 tokens
out_enc_dec = encoder_decoder(src, tgt)
print("Encoder-Decoder output shape:", out_enc_dec.shape)

# 2. Modern Decoder-Only (LLaMA / GPT style)
decoder_layer = nn.TransformerDecoderLayer(d_model=64, nhead=4, batch_first=True)
# Without encoder memory, it runs purely causal self-attention
x = torch.randn(2, 16, 64)
# Passing empty/dummy memory enables standalone decoder autoregression
print("Decoder-Only dominates modern LLMs due to architectural simplicity and scaling efficiency.")`,
      explanation: 'Modern frontier models (GPT-4, Claude, Gemini, LLaMA) are exclusively Decoder-Only because unified next-token prediction generalizes to all language tasks.',
    },
    runnableCode: {
      code: `import numpy as np

# Verify cross-attention matrix shape and row normalization in browser Pyodide
Ty = 3  # Target length
Tx = 4  # Source length
d_k = 2

np.random.seed(42)
Q = np.random.randn(Ty, d_k)
K = np.random.randn(Tx, d_k)

scores = (Q @ K.T) / np.sqrt(d_k)
exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)

print("Cross-Attention Weight Matrix (Target x Source = 3x4):")
print(np.round(weights, 3))
print("Row Sums (must be 1.0 for each target token):", np.round(np.sum(weights, axis=-1), 4))`,
      expectedOutput: `Cross-Attention Weight Matrix (Target x Source = 3x4):
[[0.323 0.161 0.428 0.088]
 [0.193 0.211 0.332 0.264]
 [0.274 0.123 0.474 0.129]]
Row Sums (must be 1.0 for each target token): [1. 1. 1.]`,
    },
    lineByLineExplanation: [
      { lines: 'scores = (Q @ K.T) / np.sqrt(d_k)', codeSnippet: 'scores = (Q @ K.T) / np.sqrt(d_k)', explanation: 'Multiplies (3, 2) Decoder Queries by (2, 4) Encoder Keys to produce (3, 4) cross-affinities.' },
      { lines: 'weights = exp_s / np.sum(...)', codeSnippet: 'weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)', explanation: 'Normalizes each row across all source tokens so each target word assigns a total of 100% attention.' },
    ],
    hyperparameters: [
      { name: 'architecture_family', defaultVal: 'Decoder-Only', range: 'Encoder-Only, Decoder-Only, Encoder-Decoder', effect: 'Macro architecture type', recommendation: 'Choose Encoder-Only for text classification and embedding search; choose Decoder-Only for generative agents and conversational AI.' },
    ],
    assumptions: [
      { assumption: 'Cross-Attention Needs No Causal Masking across Source', whyItMatters: 'The entire source sentence (e.g. English) is fully available and can be read bidirectionally by the decoder.', howToVerify: 'Cross-attention scores do NOT use a lower-triangular mask; causal masks apply ONLY to decoder self-attention.' },
    ],
    commonMistakes: [
      { mistake: 'Applying causal masking to Cross-Attention', solution: 'Cross-attention attends to the complete source document; masking it causally artificially blinds the decoder to later source words.', howToFix: 'Apply causal masks only to decoder self-attention; cross-attention uses only padding masks.' },
      { mistake: 'Using Decoder-Only models for sentence embedding search without prompt tuning', solution: 'Decoders attend causally, so the first token cannot see subsequent tokens. Mean-pooling decoder states often underperforms bidirectional encoders.', howToFix: 'Use dedicated embedding models (e.g. BGE, E5, or modern decoder embeddings with bidirectional flags).' },
    ],
    realWorldUseCases: [
      { industry: 'Semantic Search & RAG Embeddings', application: 'BERT, RoBERTa, and BGE embedding models', benefit: 'Encoder-only bidirectional attention produces optimal dense sentence vectors for vector search.' },
      { industry: 'Autonomous AI Agents & Chatbots', application: 'GPT-4o, Claude 3.5 Sonnet, LLaMA 3', benefit: 'Decoder-only models excel at multi-step reasoning, tool use, and interactive conversation.' },
    ],
    practiceQuestions: [
      { id: 'tf11-p1', question: 'In an Encoder-Decoder model, where do the Queries, Keys, and Values in the Cross-Attention layer come from?', answer: 'Queries come from the previous Decoder layer; Keys and Values come from the output of the Encoder.', explanation: 'The decoder asks "What English words correspond to what I am currently translating?" using the encoder\'s keys and values.' },
      { id: 'tf11-p2', question: 'Why is BERT called an "Encoder-Only" model?', answer: 'Because it only contains bidirectional self-attention blocks and produces representation vectors; it lacks a causal decoder to generate new text tokens step-by-step.', explanation: 'BERT was trained on Masked Language Modeling (MLM) and Next Sentence Prediction (NSP).' },
      { id: 'tf11-p3', question: 'Why did Decoder-Only architectures triumph over Encoder-Decoder models for general AI foundation models?', answer: 'Unified next-token prediction frames all NLP tasks as text completion, eliminates architectural asymmetry, and allows KV-caching across multi-turn prompts without re-encoding.', explanation: 'Scaling laws showed that decoder-only models scale most efficiently with compute.' },
    ],
    quiz: [
      {
        id: 'tf11-q1',
        question: 'Which architecture family does BERT belong to?',
        options: ['Decoder-Only', 'Encoder-Only', 'Encoder-Decoder', 'Recurrent-Convolutional'],
        correctIndex: 1,
        explanation: 'BERT is an Encoder-Only architecture featuring full bidirectional self-attention.',
      },
      {
        id: 'tf11-q2',
        question: 'In Cross-Attention, what are the dimensions of the attention weight matrix if the decoder has 5 tokens and the encoder has 20 tokens?',
        options: ['(5, 5)', '(20, 20)', '(5, 20)', '(20, 5)'],
        correctIndex: 2,
        explanation: 'Each of the 5 decoder query tokens computes attention across all 20 encoder key tokens, producing a (5, 20) matrix.',
      },
      {
        id: 'tf11-q3',
        question: 'Which architecture family powers modern foundation LLMs like GPT-4, LLaMA 3, and Mistral?',
        options: ['Encoder-Only', 'Decoder-Only', 'Encoder-Decoder', 'Hopfield Networks'],
        correctIndex: 1,
        explanation: 'Virtually all leading generative LLMs are Decoder-Only models trained autoregressively on next-token prediction.',
      },
    ],
    independentExercise: {
      title: 'Classify NLP Tasks to Optimal Architecture',
      problem:
        'Write a Python function `select_optimal_architecture(task_name)` that returns the recommended architecture family ("Encoder-Only", "Decoder-Only", or "Encoder-Decoder") for tasks like "sentiment_classification", "chat_completion", "machine_translation", and "semantic_search".',
      hints: [
        'Classification & Semantic Search -> "Encoder-Only".',
        'Chat & Code Generation -> "Decoder-Only".',
        'Machine Translation & Audio-to-Text -> "Encoder-Decoder" (or "Decoder-Only").',
      ],
      starterCode: `def select_optimal_architecture(task_name):
    # TODO: return recommended architecture family
    pass

print("Sentiment:", select_optimal_architecture("sentiment_classification"))
print("Chat:     ", select_optimal_architecture("chat_completion"))`,
      solution: `def select_optimal_architecture(task_name):
    task = task_name.lower()
    if any(k in task for k in ["classification", "ner", "embedding", "search"]):
        return "Encoder-Only (e.g. BERT/BGE)"
    elif any(k in task for k in ["chat", "generation", "coding", "agent"]):
        return "Decoder-Only (e.g. GPT/LLaMA)"
    elif any(k in task for k in ["translation", "speech_to_text", "summarization"]):
        return "Encoder-Decoder (e.g. T5/Whisper) or Decoder-Only"
    return "Decoder-Only"

print("Sentiment:", select_optimal_architecture("sentiment_classification"))
print("Chat:     ", select_optimal_architecture("chat_completion"))`,
    },
    summary: {
      keyTakeaways: [
        'Encoder-Only models (BERT) use bidirectional attention for classification and embeddings.',
        'Decoder-Only models (GPT/LLaMA) use causal attention for autoregressive text generation.',
        'Encoder-Decoder models (T5/Whisper) use cross-attention to translate from source to target sequences.',
        'In Cross-Attention, Queries come from the Decoder while Keys and Values come from the Encoder.',
      ],
      nextLessonId: 'tf-12-autoregressive-generation-kv-cache',
      nextLessonTitle: 'TF-12: Autoregressive Generation & KV Caching',
      nextLessonModuleId: 'p6-m12',
    },
  },

  'tf-12-autoregressive-generation-kv-cache': {
    id: 'tf-12-autoregressive-generation-kv-cache',
    moduleId: 'p6-m12',
    title: 'TF-12: Autoregressive Generation & KV Caching',
    subtitle: 'From Prompt Tokens to Autoregressive Decoding & O(1) Inference Mechanics',
    order: 1,
    readTimeMinutes: 32,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Trace the complete autoregressive next-token generation loop from prompt to sampling to output',
      'Explain why naive text generation scales with disastrous O(N^2) compute complexity over long sequences',
      'Derive the Key-Value (KV) Caching algorithm that reduces incremental per-token step time to O(1)',
      'Calculate precise GPU VRAM memory requirements for KV caching across sequence lengths, batch sizes, and model depths',
    ],
    prerequisites: ['TF-07: Attention Masks (Causal & Padding Masks)', 'TF-08: Multi-Head Attention (MHA)'],
    previousLesson: {
      id: 'tf-11-encoder-decoder-architectures',
      title: 'TF-11: Encoder-Only, Decoder-Only & Encoder-Decoder',
      moduleId: 'p6-m11',
    },
    analogy: {
      title: 'Re-Reading the Entire Book Before Writing Each New Sentence',
      text: 'Suppose an author is writing a 500-page fantasy novel word-by-word. In naive generation without KV caching, before typing word 1,001, the author re-reads all 1,000 previous words from page 1, re-computing all their grammatical roles and relationships from scratch! When typing word 1,002, the author re-reads all 1,001 words again. By page 500, typing a single new word requires hours of re-reading previous pages (O(N^2) quadratic slowdown). KV Caching is the author\'s organized notebook. Once word 500 is read, its Key and Value tags are jotted down into index cards on the desk. When word 1,001 arrives, the author only reads word 1,001 (a single 1-token Query), quickly checks the existing index cards on the desk, writes the new word, and files its card in O(1) step time.',
      metaphor: 'Without KV cache, generation recomputes the entire past on every single token; KV cache stores past Keys and Values so each step takes O(1) time.',
    },
    problemSolved: {
      title: 'The Quadratic Generation Bottleneck in LLM Inference',
      description:
        'During training, the whole sequence is known and processed in one shot. But during generation, tokens are emitted one at a time. If the entire sequence [x_1, ..., x_t] is passed into the model at every step t, the model re-projects x_1 through W_K and W_V thousands of times unnecessarily, causing latency to degrade quadratically.',
      keyPoints: [
        'Naive Generation: Step 1 computes 1 token, Step 2 computes 2 tokens, Step N computes N tokens. Total compute = O(N^2).',
        'Invariance of the Past: In causal models, the Key and Value vectors for past tokens NEVER change when new tokens are generated.',
        'KV Cache Solution: Save past K and V tensors in GPU memory. At step t, project ONLY the new token x_t (length 1), concatenate with cached K and V, and compute attention.',
      ],
    },
    intuition: {
      overview:
        'KV Caching trades GPU VRAM memory for inference speed. By caching past Key and Value matrices in GPU RAM, per-token decoding latency drops from O(N) to O(1) independent of sequence length.',
      steps: [
        { step: 1, title: 'Prefill Phase (Prompt Ingestion)', description: 'Feed entire prompt [x_1, ..., x_P] into model. Compute initial next token and cache all Keys and Values for prompt tokens.' },
        { step: 2, title: 'Decode Step (Single Token)', description: 'Receive newly generated token x_t. Linear projection computes only Q_t in R^{1 x d_k}, K_t, and V_t.' },
        { step: 3, title: 'Cache Append', description: 'Append K_t to Cached_K, and V_t to Cached_V: cached length grows from t-1 to t.' },
        { step: 4, title: 'O(1) Attention Step', description: 'Query Q_t (shape 1 x d_k) computes dot products against Cached_K (shape t x d_k), producing 1 x t attention weights, and extracts context from Cached_V.' },
      ],
    },
    mathematics: {
      overview: 'Formulation of KV Caching and Memory Calculation.',
      foundations: [
        {
          name: 'Incremental Attention with KV Cache',
          latex: 'A_t = \\text{softmax}\\left( \\frac{Q_t \\cdot [K_{\\text{past}}, K_t]^T}{\\sqrt{d_k}} \\right) \\in \\mathbb{R}^{1 \\times t}',
          explanation: 'Only a single Query vector Q_t is computed, attending across concatenated cached Keys.',
        },
        {
          name: 'Updated Context Vector',
          latex: '\\text{Context}_t = A_t \\cdot [V_{\\text{past}}, V_t] \\in \\mathbb{R}^{1 \\times d_v}',
          explanation: 'Produces updated representation for the single current token in constant O(1) FLOPs relative to past layers.',
        },
        {
          name: 'KV Cache Memory Footprint Formula (Bytes)',
          latex: '\\text{RAM}_{\\text{KV}} = 2 \\times 2 \\times B \\times L \\times H_{\\text{kv}} \\times d_k \\times T \\quad \\text{bytes (FP16)}',
          explanation: 'First factor of 2 is for both K and V; second factor of 2 is bytes per number (FP16/BF16); B is batch size, L is layers, T is context length.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of LLaMA-7B KV Cache VRAM Consumption',
      objective: 'Calculate the exact memory consumed by the KV Cache for a single user at 4,096 context length in LLaMA-7B.',
      steps: [
        {
          step: 1,
          label: 'Model Architecture Parameters',
          latex: 'B = 1, \\quad L = 32 \\text{ layers}, \\quad H_{\\text{kv}} = 32 \\text{ heads}, \\quad d_k = 128, \\quad T = 4096',
          explanation: 'Standard LLaMA-1/2 7B specifications with 16-bit precision (2 bytes per float).',
        },
        {
          step: 2,
          label: 'Elements per Token across all Layers',
          latex: '\\text{Elements/Token} = 2 \\times L \\times H_{\\text{kv}} \\times d_k = 2 \\times 32 \\times 32 \\times 128 = 262,144 \\text{ numbers}',
          explanation: 'Every single token requires storing 262,144 floating-point numbers across 32 layers.',
        },
        {
          step: 3,
          label: 'Total Bytes for 4,096 Tokens',
          latex: '\\text{Total Bytes} = 262,144 \\times 4096 \\times 2 \\text{ bytes} = 2,147,483,648 \\text{ bytes} = 2.0 \\text{ GB}',
          explanation: 'For just ONE user at 4k context, the KV cache consumes 2.0 GB of GPU RAM!',
        },
        {
          step: 4,
          label: 'The Multi-User Concurrency Consequence',
          latex: '\\text{For 32 concurrent users}: 32 \\times 2.0 \\text{ GB} = 64 \\text{ GB VRAM}',
          explanation: 'Proves why KV Cache memory, NOT parameter compute, is the primary scaling bottleneck in LLM serving!',
        },
      ],
    },
    variables: [
      { symbol: 'B', name: 'Batch Size', description: 'Number of concurrent user requests being generated', dimensions: 'Scalar integer' },
      { symbol: 'L', name: 'Number of Layers', description: 'Transformer layer depth (e.g. 32 in 7B, 80 in 70B)', dimensions: 'Scalar integer' },
      { symbol: 'H_{kv}', name: 'Key-Value Head Count', description: 'Number of KV heads (equal to query heads in MHA; smaller in GQA)', dimensions: 'Scalar integer' },
      { symbol: 'T', name: 'Sequence Length', description: 'Accumulated context length (prompt + generated tokens)', dimensions: 'Scalar integer' },
    ],
    numericalExample: {
      scenario: 'Comparing FLOPs for generating token 100 with vs without KV Cache in a model with d_model = 64.',
      dataset: [
        { method: 'Naive Generation', tokensProjected: 100, dotProductAffinities: '100 x 100 = 10,000' },
        { method: 'KV Cache Generation', tokensProjected: 1, dotProductAffinities: '1 x 100 = 100' },
      ],
      calculations: [
        { step: 'Naive Projection FLOPS', math: '100 tokens * 3 * (64 * 64)', result: '1,228,800 operations' },
        { step: 'KV Cache Projection FLOPS', math: '1 token * 3 * (64 * 64)', result: '12,288 operations' },
        { step: 'Compute Reduction Factor', math: '1,228,800 / 12,288', result: '100x speedup for this step alone!' },
      ],
      finalConclusion: 'KV Caching reduces projection compute by 100x at step 100, maintaining instantaneous interactive response times.',
    },
    visualExplanation: {
      title: 'Prefill Phase vs Decode Phase Workflow',
      description: 'LLM inference consists of two fundamentally distinct operational regimes.',
      features: [
        'Prefill Phase: Compute-bound. Processes entire user prompt in parallel, filling the KV cache at maximum GPU FLOPs.',
        'Decode Phase: Memory-bandwidth bound. Emits one token at a time, reading the cached KV tensors from VRAM for each step.',
        'PagedAttention: Modern inference engines (vLLM) allocate KV cache in virtual memory pages to eliminate fragmentation.',
      ],
    },
    scratchCode: {
      title: 'Simulating KV Cache Autoregressive Generation in Pure NumPy',
      code: `import numpy as np

class SimulatedKVCacheAttention:
    def __init__(self, d_model):
        np.random.seed(42)
        self.d_model = d_model
        self.W_q = np.random.randn(d_model, d_model) * 0.1
        self.W_k = np.random.randn(d_model, d_model) * 0.1
        self.W_v = np.random.randn(d_model, d_model) * 0.1
        
        # KV Cache stores past K and V tensors
        self.cached_k = None
        self.cached_v = None

    def reset_cache(self):
        self.cached_k = None
        self.cached_v = None

    def step(self, new_token_x):
        # new_token_x shape: (1, d_model) - ONLY 1 TOKEN!
        q = new_token_x @ self.W_q  # (1, d_model)
        k = new_token_x @ self.W_k  # (1, d_model)
        v = new_token_x @ self.W_v  # (1, d_model)
        
        # Append new K and V to cache
        if self.cached_k is None:
            self.cached_k = k
            self.cached_v = v
        else:
            self.cached_k = np.vstack([self.cached_k, k])
            self.cached_v = np.vstack([self.cached_v, v])
            
        # Attention: 1 Query against all cached Keys!
        # q shape: (1, d), cached_k.T shape: (d, T_current)
        scores = (q @ self.cached_k.T) / np.sqrt(self.d_model)
        exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
        weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
        
        # Output: (1, d_model)
        out = weights @ self.cached_v
        return out, weights

layer = SimulatedKVCacheAttention(d_model=4)
# Simulate generating 4 tokens step-by-step
for step in range(4):
    token_input = np.random.randn(1, 4)
    out, weights = layer.step(token_input)
    print(f"Step {step+1}: Cached Length = {layer.cached_k.shape[0]} | Attention Weights = {np.round(weights[0], 3)}")`,
      explanation: 'Notice how at every step, the new token computes only 1 Query vector and attends across the steadily expanding cached Keys.',
    },
    sklearnCode: {
      title: 'HuggingFace Generation Loop with Past Key Values (use_cache=True)',
      code: `# pip install transformers torch
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Standard generation in HuggingFace uses KV Caching by default!
# tokenizer = AutoTokenizer.from_pretrained("gpt2")
# model = AutoModelForCausalLM.from_pretrained("gpt2")

# Manual generation loop demonstrating past_key_values:
def generate_demo(model, input_ids, max_new_tokens=5):
    past_key_values = None
    generated = input_ids
    
    for _ in range(max_new_tokens):
        # If cache exists, pass ONLY the last generated token!
        if past_key_values is not None:
            model_inputs = generated[:, -1:]
        else:
            model_inputs = generated  # Prefill phase
            
        outputs = model(model_inputs, past_key_values=past_key_values, use_cache=True)
        logits = outputs.logits[:, -1, :]
        next_token = torch.argmax(logits, dim=-1, keepdim=True)
        
        generated = torch.cat([generated, next_token], dim=-1)
        past_key_values = outputs.past_key_values  # Retain updated cache
        
    return generated

print("HuggingFace use_cache=True accelerates generation by 10x to 50x by retaining past_key_values.")`,
      explanation: 'Passing `past_key_values` ensures the GPU processes only 1 new token tensor per generation step rather than re-evaluating the full sequence.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate KV Cache VRAM calculation in browser Pyodide
def compute_kv_cache_mb(batch_size, seq_len, layers, kv_heads, d_k, bytes_per_elem=2):
    # 2 tensors (K and V) * layers * batch * seq_len * heads * d_k
    total_elements = 2 * layers * batch_size * seq_len * kv_heads * d_k
    return (total_elements * bytes_per_elem) / (1024 * 1024)

# LLaMA-7B: 32 layers, 32 KV heads, d_k = 128
llama_7b_mb = compute_kv_cache_mb(batch_size=1, seq_len=2048, layers=32, kv_heads=32, d_k=128)
# Mistral-7B (GQA): 32 layers, 8 KV heads (4x fewer!), d_k = 128
mistral_7b_mb = compute_kv_cache_mb(batch_size=1, seq_len=2048, layers=32, kv_heads=8, d_k=128)

print("LLaMA-7B (Standard MHA, 2048 tokens):", round(llama_7b_mb, 1), "MB")
print("Mistral-7B (Grouped-Query, 2048 tokens):", round(mistral_7b_mb, 1), "MB")
print("Memory Reduction Factor:              ", round(llama_7b_mb / mistral_7b_mb, 1), "x")`,
      expectedOutput: `LLaMA-7B (Standard MHA, 2048 tokens): 1024.0 MB
Mistral-7B (Grouped-Query, 2048 tokens): 256.0 MB
Memory Reduction Factor:               4.0 x`,
    },
    lineByLineExplanation: [
      { lines: 'total_elements = 2 * layers * ...', codeSnippet: 'total_elements = 2 * layers * batch_size * seq_len * kv_heads * d_k', explanation: 'Calculates total float elements stored for both Keys and Values across all layers.' },
      { lines: 'llama_7b_mb = ...', codeSnippet: 'llama_7b_mb = compute_kv_cache_mb(...)', explanation: 'Demonstrates that a single user consumes 1.0 GB of VRAM at 2k context under standard MHA.' },
      { lines: 'mistral_7b_mb = ...', codeSnippet: 'mistral_7b_mb = compute_kv_cache_mb(...)', explanation: 'Demonstrates that GQA slashes cache VRAM from 1024 MB down to 256 MB (4x reduction).' },
    ],
    hyperparameters: [
      { name: 'use_cache', defaultVal: 'True', range: 'True / False', effect: 'Enables KV caching during autoregressive inference', recommendation: 'Always set use_cache=True during generation. Setting False causes 50x slower decoding.' },
      { name: 'kv_quantization', defaultVal: 'FP16', range: 'FP16, INT8, FP8, INT4', effect: 'Precision used to store cached Keys and Values in VRAM', recommendation: 'FP8 and INT4 KV cache quantization cuts VRAM in half with near-zero perplexity loss.' },
    ],
    assumptions: [
      { assumption: 'Past Keys and Values Do Not Change', whyItMatters: 'If past representations shifted dynamically with future tokens, cached tensors would become invalid.', howToVerify: 'Causal masking strictly prevents future tokens from altering past token hidden states.' },
    ],
    commonMistakes: [
      { mistake: 'Passing the full accumulated sequence into model on every generation step', solution: 'Passing input_ids of shape (1, t) rather than (1, 1) when cache is active causes redundant recomputation and breaks cache indexing.', howToFix: 'When past_key_values is populated, pass only model_inputs = generated[:, -1:].' },
      { mistake: 'Forgetting to clear KV Cache between independent chat sessions', solution: 'Failing to reset cache causes state leakage where previous user conversations bleed into the next query.', howToFix: 'Call model.reset_cache() or instantiate new cache object on new session.' },
    ],
    realWorldUseCases: [
      { industry: 'Enterprise LLM Inference Engines', application: 'vLLM, TensorRT-LLM, TGI (Text Generation Inference)', benefit: 'PagedAttention manages KV cache memory in non-contiguous virtual pages, achieving 2x-4x higher server throughput.' },
      { industry: 'Edge AI Assistants', application: 'Local Ollama & llama.cpp running on laptops', benefit: 'Quantized INT4 KV cache enables running 8B parameter models with 16k context inside 8 GB unified RAM.' },
    ],
    practiceQuestions: [
      { id: 'tf12-p1', question: 'What is the theoretical time complexity of generating N tokens without KV cache vs with KV cache?', answer: 'Without KV cache, generation is O(N^2) in total compute because each step recomputes all past tokens. With KV cache, each incremental step takes O(1) projection time, making total generation O(N).', explanation: 'Sum of 1 + 2 + ... + N = O(N^2); with cache, N steps of 1 token = O(N).' },
      { id: 'tf12-p2', question: 'Why is LLM generation during the decode phase memory-bandwidth bound rather than compute bound?', answer: 'Because for every single newly generated token, the GPU must stream gigabytes of cached Key and Value weights from High Bandwidth Memory (HBM) into on-chip SRAM just to perform a tiny number of arithmetic dot products.', explanation: 'Arithmetic intensity (FLOPs / byte) is very low during single-token generation.' },
      { id: 'tf12-p3', question: 'What is PagedAttention and what problem does it solve in production serving?', answer: 'PagedAttention (Kwon et al., vLLM) allocates KV cache in fixed-size virtual memory blocks (pages) similar to OS virtual memory, eliminating memory fragmentation and memory pre-allocation waste.', explanation: 'It increases GPU memory utilization from ~20% to ~96%, allowing 2x-4x larger batch sizes.' },
    ],
    quiz: [
      {
        id: 'tf12-q1',
        question: 'Why can the Key and Value vectors of past tokens be cached safely without becoming outdated?',
        options: [
          'Because the weights are frozen',
          'Because causal masking ensures past tokens cannot be influenced by future tokens, so their K and V representations remain strictly invariant',
          'Because text never changes',
          'Because the GPU disables gradients',
        ],
        correctIndex: 1,
        explanation: 'In causal models, h_t depends only on tokens <= t. Emitting token t+1 does not change any previous hidden states.',
      },
      {
        id: 'tf12-q2',
        question: 'During the decode step with active KV cache, what is the shape of the newly computed Query tensor?',
        options: ['(Batch, SequenceLength, d_k)', '(Batch, 1, d_k)', '(Batch, d_k, d_k)', '(1, SequenceLength)'],
        correctIndex: 1,
        explanation: 'Only the single newly generated token is passed into the projection layer, producing Q of shape (Batch, 1, d_k).',
      },
      {
        id: 'tf12-q3',
        question: 'For LLaMA-7B at 2,048 context length, approximately how much VRAM does the KV cache consume for a single user request in FP16?',
        options: ['10 MB', '100 MB', '1,024 MB (1.0 GB)', '16 GB'],
        correctIndex: 2,
        explanation: '2 * 32 layers * 1 batch * 2048 tokens * 32 heads * 128 dim * 2 bytes = 1,073,741,824 bytes = 1.0 GB.',
      },
    ],
    independentExercise: {
      title: 'Calculate Maximum Concurrent Users on a 24GB GPU',
      problem:
        'Write a Python function `max_concurrent_users(gpu_vram_gb, model_weights_gb, kv_cache_per_user_gb)` that computes how many concurrent users an inference server can host before running out of GPU VRAM.',
      hints: [
        'Available VRAM for caching = gpu_vram_gb - model_weights_gb.',
        'Divide available VRAM by kv_cache_per_user_gb.',
        'Use int() or math.floor() to return integer user count.',
      ],
      starterCode: `def max_concurrent_users(gpu_vram_gb, model_weights_gb, kv_cache_per_user_gb):
    # TODO: compute max concurrent users
    pass

# RTX 4090 (24GB) hosting 7B model (14GB weights) with 2GB KV cache per user
print("Max concurrent users:", max_concurrent_users(24.0, 14.0, 2.0))`,
      solution: `def max_concurrent_users(gpu_vram_gb, model_weights_gb, kv_cache_per_user_gb):
    available_vram = gpu_vram_gb - model_weights_gb
    if available_vram <= 0:
        return 0
    return int(available_vram // kv_cache_per_user_gb)

# RTX 4090 (24GB) hosting 7B model (14GB weights) with 2GB KV cache per user
print("Max concurrent users:", max_concurrent_users(24.0, 14.0, 2.0))`,
    },
    summary: {
      keyTakeaways: [
        'Autoregressive generation emits one token at a time; naive generation scales with O(N^2) compute.',
        'KV Caching stores past Key and Value representations in GPU memory, reducing per-token step time to O(1).',
        'KV cache memory footprint is often the primary bottleneck limiting concurrent user throughput in production.',
        'Modern architectures use Grouped-Query Attention (GQA) and PagedAttention to minimize cache VRAM overhead.',
      ],
      nextLessonId: 'tf-13-pytorch-transformer-block',
      nextLessonTitle: 'TF-13: Implement a Small Transformer in PyTorch',
      nextLessonModuleId: 'p6-m13',
    },
  },
};

