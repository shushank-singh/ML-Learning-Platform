import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 7: Attention Masks (Causal & Padding Masks) (p6-m7)
// =========================================================================
export const p6m7Data: ModuleData = {
  id: 'p6-m7',
  number: 7,
  title: 'Attention Masks (Causal & Padding Masks)',
  subtitle: 'Preserving Temporal Causality & Handling Variable-Length Batches',
  description:
    'Master the masking mechanics that prevent information leakage in Transformer models. Explore lower-triangular causal masks (triu mask with -inf) for autoregressive text generation in GPT models, key-padding masks for batch rectangulation, and cross-attention masks in encoder-decoder systems.',
  icon: 'ShieldCheck',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-07-attention-masks-causal',
      moduleId: 'p6-m7',
      title: 'TF-07: Attention Masks (Causal & Padding Masks)',
      description:
        'Causal autoregressive masks, lower-triangular matrices, -inf addition before softmax, key-padding masks, and preventing future token peeking.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'causal-mask-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 8: Multi-Head Attention (MHA) (p6-m8)
// =========================================================================
export const p6m8Data: ModuleData = {
  id: 'p6-m8',
  number: 8,
  title: 'Multi-Head Attention (MHA)',
  subtitle: 'Parallel Representation Subspaces, GQA & Output Projection',
  description:
    'Understand why a single attention head is insufficient for complex language understanding. Learn how Multi-Head Attention splits d_model into h parallel heads of dimension d_k, enabling simultaneous specialization in syntax, coreference, and locality. Explore head concatenation, linear projection W_O, and modern variants (MQA and GQA).',
  icon: 'GitFork',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-08-multi-head-attention',
      moduleId: 'p6-m8',
      title: 'TF-08: Multi-Head Attention (MHA)',
      description:
        'Parallel attention heads, head projections, output projection W_O, Multi-Query Attention (MQA), and Grouped-Query Attention (GQA).',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'multi-head-attention-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 9: Residual Connections & Layer Normalization (p6-m9)
// =========================================================================
export const p6m9Data: ModuleData = {
  id: 'p6-m9',
  number: 9,
  title: 'Residual Connections & Layer Normalization',
  subtitle: 'Pre-LN vs Post-LN Stability, Gradient Highways & RMSNorm',
  description:
    'Examine the architectural stability mechanisms enabling Transformers to scale to hundreds of layers. Master residual skip connections (x + Sublayer(x)), Layer Normalization vs Batch Normalization, the critical Pre-LN vs Post-LN architectural debate, and modern zero-mean RMSNorm used in LLaMA.',
  icon: 'Layers',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-09-residual-layer-norm',
      moduleId: 'p6-m9',
      title: 'TF-09: Residual Connections & Layer Normalization',
      description:
        'Residual gradient highways, LayerNorm formulation, Pre-LN vs Post-LN stability, warmup dynamics, and RMSNorm implementation.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS
// =========================================================================
export const tfModule3Lessons: Record<string, LessonContent> = {
  'tf-07-attention-masks-causal': {
    id: 'tf-07-attention-masks-causal',
    moduleId: 'p6-m7',
    title: 'TF-07: Attention Masks (Causal & Padding Masks)',
    subtitle: 'Enforcing the Arrow of Time and Handling Rectangular Batches',
    order: 1,
    readTimeMinutes: 28,
    difficulty: 'Intermediate',
    visualizerType: 'causal-mask-explorer',
    objectives: [
      'Explain why autoregressive language models (GPT) strictly require lower-triangular causal attention masking',
      'Understand why mask values are set to -inf prior to Softmax rather than 0 after Softmax',
      'Implement padding masks to prevent meaningless <pad> tokens from absorbing attention weights in batched training',
      'Use the interactive Causal Mask Explorer to compare bidirectional encoder attention with causal decoder attention',
    ],
    prerequisites: ['TF-06: Scaled Dot-Product Self-Attention'],
    previousLesson: {
      id: 'tf-06-scaled-dot-product-attention',
      title: 'TF-06: Scaled Dot-Product Self-Attention',
      moduleId: 'p6-m6',
    },
    analogy: {
      title: 'The Closed Door at an Exam vs Open Book Study',
      text: 'In an open-book group study session (Bidirectional Attention like BERT), you are allowed to look at the entire sentence at once, back and forth, because the entire text is already written. But during an exam where questions are asked one-by-one (Autoregressive Generation like GPT), you must predict the next answer without looking at tomorrow\'s newspaper! If the model predicting word 4 ("dog") could peek ahead at word 5 ("barks"), it would cheat by simply copying the future word rather than learning linguistic structure. A causal mask is a one-way blindfold: token 4 can look back at tokens 1, 2, 3, and 4, but token 5, 6, and 7 are hidden behind opaque -inf walls.',
      metaphor: 'A causal mask enforces the arrow of time: you can remember the past and present, but you cannot remember the future.',
    },
    problemSolved: {
      title: 'Information Leakage During Parallel Training',
      description:
        'During training of autoregressive models, we want to feed all N tokens into the GPU simultaneously to parallelize training (Teacher Forcing). However, without masking, token t would attend to token t+1, making next-token prediction trivial and training useless.',
      keyPoints: [
        'Teacher Forcing: Parallel training feeds the entire target sequence at once.',
        'The Leakage Trap: Without a causal mask, token t looks ahead at token t+1.',
        'Solution: Set S_{ij} = -inf for all j > i before Softmax, ensuring exp(-inf) = 0.00%.',
      ],
    },
    intuition: {
      overview:
        'Attention masks modify the raw logit scores S = QK^T / sqrt(d_k) before the Softmax function is applied. By injecting -inf into illegal positions, Softmax evaluates those probabilities to absolute zero.',
      steps: [
        { step: 1, title: 'Raw Affinity Matrix', description: 'Compute S = QK^T / sqrt(d_k) of shape (N, N).' },
        { step: 2, title: 'Causal Mask Creation', description: 'Generate upper-triangular boolean mask M where M_{ij} = -inf for j > i, and 0 for j <= i.' },
        { step: 3, title: 'Mask Addition', description: 'Compute S_masked = S + M. Legal logits remain unchanged; illegal future logits become -inf.' },
        { step: 4, title: 'Softmax Evaluation', description: 'Because e^{-inf} = 0, all future tokens receive exactly 0% attention probability.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical formulation of masked scaled dot-product attention.',
      foundations: [
        {
          name: 'Masked Attention Equation',
          latex: '\\text{Attention}(Q, K, V, M) = \\text{softmax}\\left( \\frac{QK^T}{\\sqrt{d_k}} + M \\right) V',
          explanation: 'Additive mask matrix M in R^{N x N} injects -inf into forbidden token positions.',
        },
        {
          name: 'Causal Lower-Triangular Mask Definition',
          latex: 'M_{ij} = \\begin{cases} 0 & \\text{if } j \\le i \\\\ -\\infty & \\text{if } j > i \\end{cases}',
          explanation: 'Restricts row i to only attend to columns j <= i (past and current tokens).',
        },
        {
          name: 'Softmax with -Infinity Limit',
          latex: '\\lim_{z_j \\to -\\infty} \\frac{e^{z_j}}{\\sum_k e^{z_k}} = \\frac{0}{\\sum_{k \\le i} e^{z_k}} = 0',
          explanation: 'Guarantees zero probability weight and zero gradient contribution for masked positions.',
        },
      ],
    },
    derivation: {
      title: 'Why Add -Infinity Before Softmax Instead of Zeroing After Softmax?',
      objective: 'Prove why masking must happen in logit space rather than probability space.',
      steps: [
        {
          step: 1,
          label: 'Flaw of Post-Softmax Zeroing',
          latex: 'A_{\\text{zeroed}} = A \\odot \\text{Mask}_{0/1} \\implies \\sum_j A_{\\text{zeroed}}[i, j] < 1.0',
          explanation: 'Zeroing probabilities after Softmax violates the law of probability: rows no longer sum to 1.0!',
        },
        {
          step: 2,
          label: 'Renormalization Complexity',
          latex: 'A_{\\text{renorm}} = \\frac{A_{\\text{zeroed}}}{\\sum A_{\\text{zeroed}}}',
          explanation: 'Renormalizing introduces extra division operations and numerical instability if all values were small.',
        },
        {
          step: 3,
          label: 'Elegance of Pre-Softmax -Infinity',
          latex: '\\text{softmax}(S + M)[i, :] = \\frac{[e^{S_{i, 1}}, \\dots, e^{S_{i, i}}, 0, \\dots, 0]}{\\sum_{j \\le i} e^{S_{i, j}}}',
          explanation: 'Adding -inf natively redistributes 100% of the probability mass strictly among valid tokens in one operation.',
        },
      ],
    },
    variables: [
      { symbol: 'M', name: 'Mask Matrix', description: 'Additive mask containing 0 for allowed positions and -inf for blocked positions', dimensions: '(N, N)' },
      { symbol: 'i', name: 'Query Token Index', description: 'The token currently generating or attending (row in attention matrix)', dimensions: 'Scalar integer' },
      { symbol: 'j', name: 'Key Token Index', description: 'The candidate token being attended to (column in attention matrix)', dimensions: 'Scalar integer' },
    ],
    numericalExample: {
      scenario: 'Applying causal mask to 3 tokens with raw scores S = [[2, 1, 3], [1, 4, 2], [3, 1, 5]].',
      dataset: [
        { row: 0, rawScores: '[2, 1, 3]', mask: '[0, -inf, -inf]', maskedScores: '[2, -inf, -inf]' },
        { row: 1, rawScores: '[1, 4, 2]', mask: '[0, 0, -inf]', maskedScores: '[1, 4, -inf]' },
        { row: 2, rawScores: '[3, 1, 5]', mask: '[0, 0, 0]', maskedScores: '[3, 1, 5]' },
      ],
      calculations: [
        { step: 'Row 0 Softmax', math: 'exp([2, -inf, -inf]) = [7.39, 0, 0] / 7.39', result: '[1.0, 0.0, 0.0] (Attends 100% to Token 0)' },
        { step: 'Row 1 Softmax', math: 'exp([1, 4, -inf]) = [2.72, 54.6, 0] / 57.32', result: '[0.05, 0.95, 0.0] (Attends to Tokens 0 & 1 only)' },
        { step: 'Row 2 Softmax', math: 'exp([3, 1, 5]) = [20.09, 2.72, 148.4] / 171.2', result: '[0.12, 0.02, 0.86] (Can attend to all 3)' },
      ],
      finalConclusion: 'Row 0 is 100% self-focused; Row 1 attends only to past tokens; future tokens receive strictly 0.0% attention.',
    },
    visualExplanation: {
      title: 'Interactive Causal vs Bidirectional Comparison',
      description: 'The Causal Mask Explorer above allows you to toggle between bidirectional (BERT) and causal (GPT) modes.',
      features: [
        'Notice how the upper triangle turns into red -∞ blocks in Causal mode.',
        'Observe how the Softmax probability heatmap strictly zeroes out all future tokens.',
        'Click on any token row to see its exact allowed attention distribution.',
      ],
    },
    scratchCode: {
      title: 'Causal Mask and Padding Mask in Pure NumPy',
      code: `import numpy as np

def create_causal_mask(seq_len):
    # np.tril creates lower-triangular matrix with 1s on and below diagonal
    mask = np.tril(np.ones((seq_len, seq_len)))
    # Replace 0 with -1e9 (-inf) and 1 with 0.0
    return np.where(mask == 1, 0.0, -1e9)

def masked_attention(Q, K, V, mask):
    d_k = Q.shape[-1]
    scores = (Q @ K.T) / np.sqrt(d_k)
    # Add mask directly to logits
    scores = scores + mask
    # Softmax
    exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
    return weights @ V, weights

np.random.seed(42)
N, d_k = 3, 4
Q = np.random.randn(N, d_k)
K = np.random.randn(N, d_k)
V = np.random.randn(N, d_k)

mask = create_causal_mask(N)
out, weights = masked_attention(Q, K, V, mask)

print("Causal Attention Weights (Upper triangle must be exactly 0.0):\\n")
print(np.round(weights, 4))
print("\\nRow sums (must equal 1.0):", np.sum(weights, axis=-1))`,
      explanation: 'Notice how the upper triangle contains 0.0000 while each row sums perfectly to 1.0000.',
    },
    sklearnCode: {
      title: 'PyTorch Causal Masking (torch.nn.Transformer.generate_square_subsequent_mask)',
      code: `import torch
import torch.nn.functional as F

seq_len = 4
# 1. Standard PyTorch causal mask generator
mask = torch.triu(torch.full((seq_len, seq_len), float('-inf')), diagonal=1)
print("PyTorch Causal Mask (4x4):\\n", mask)

# 2. Applying in scaled_dot_product_attention (PyTorch 2.0+)
B, H, d_k = 1, 2, 8
q = torch.randn(B, H, seq_len, d_k)
k = torch.randn(B, H, seq_len, d_k)
v = torch.randn(B, H, seq_len, d_k)

# Setting is_causal=True automatically enables hardware-accelerated FlashAttention causal kernel!
out = F.scaled_dot_product_attention(q, k, v, is_causal=True)
print("\\nCausal attention output shape:", out.shape)`,
      explanation: 'In PyTorch 2.0+, passing `is_causal=True` instructs the GPU kernel to skip calculating the upper triangle entirely, saving 50% of memory bandwidth and FLOPs.',
    },
    runnableCode: {
      code: `import numpy as np

# Test causal mask generation directly in browser Pyodide
N = 3
np.random.seed(42)
scores = np.random.randn(N, N)
mask = np.tril(np.ones((N, N)))

# Mask future positions with -1e9
masked_scores = np.where(mask == 1, scores, -1e9)
exp_s = np.exp(masked_scores - np.max(masked_scores, axis=-1, keepdims=True))
weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)

print("Causal Attention Weights (3x3):")
print(np.round(weights, 3))
print("Row sums:", np.round(np.sum(weights, axis=-1), 4))`,
      expectedOutput: `Causal Attention Weights (3x3):
[[1.    0.    0.   ]
 [0.853 0.147 0.   ]
 [0.636 0.282 0.082]]
Row sums: [1. 1. 1.]`,
    },
    lineByLineExplanation: [
      { lines: 'mask = np.tril(np.ones((N, N)))', codeSnippet: 'mask = np.tril(np.ones((N, N)))', explanation: 'Creates a lower-triangular binary matrix with 1s on and below the diagonal.' },
      { lines: 'masked_scores = np.where(...)', codeSnippet: 'masked_scores = np.where(mask == 1, scores, -1e9)', explanation: 'Replaces future token scores with -1e9 (numerical approximation of -inf).' },
      { lines: 'weights = exp_s / np.sum(...)', codeSnippet: 'weights = exp_s / np.sum(...)', explanation: 'Softmax evaluates exp(-1e9) to 0.0, zeroing future weights while preserving sum=1.0.' },
    ],
    hyperparameters: [
      { name: 'mask_value', defaultVal: '-inf / -1e9', range: '-1e4 to -inf', effect: 'Numerical value substituted for masked positions', recommendation: 'In FP32 use float("-inf"); in FP16 use -65504 to prevent NaN overflows.' },
      { name: 'is_causal', defaultVal: 'True for Decoders, False for Encoders', range: 'True / False', effect: 'Enables autoregressive lower-triangular masking', recommendation: 'Always set is_causal=True when training or serving autoregressive text generators (GPT, LLaMA).' },
    ],
    assumptions: [
      { assumption: 'Diagonal is Always Unmasked', whyItMatters: 'Every token must always be permitted to attend to itself.', howToVerify: 'Verify that M[i, i] == 0 for all i (diagonal elements are never -inf).' },
    ],
    commonMistakes: [
      { mistake: 'Using -1e9 in Float16 / Half Precision', solution: 'In FP16, minimum valid finite float is -65504. -1e9 underflows to -Infinity or causes NaNs in FP16 math.', howToFix: 'In PyTorch FP16, use torch.finfo(dtype).min or float("-inf").' },
      { mistake: 'Forgetting to mask <pad> tokens in batched training', solution: 'Without a padding mask, short sentences attend to useless padding tokens, corrupting representations.', howToFix: 'Pass key_padding_mask to attention layer to mask out pad token column positions.' },
    ],
    realWorldUseCases: [
      { industry: 'Generative AI', application: 'Autoregressive language models (GPT-4, Claude, LLaMA, DeepSeek)', benefit: 'Enables parallel training across entire documents while maintaining strict autoregressive generation semantics.' },
      { industry: 'Time-Series Forecasting', application: 'Financial market prediction and weather modeling', benefit: 'Ensures future stock prices or weather measurements cannot leak into historical training features.' },
    ],
    practiceQuestions: [
      { id: 'tf07-p1', question: 'Why does an Encoder (like BERT) NOT use a causal mask?', answer: 'BERT is designed for understanding and representation extraction, where bidirectional context (reading both left and right of a word) provides richer semantic representations.', explanation: 'Encoders are non-autoregressive and process the entire sequence symmetrically.' },
      { id: 'tf07-p2', question: 'In a causal attention matrix of size 10x10, how many elements are unmasked (allowed)?', answer: 'The sum of 1 + 2 + ... + 10 = 10 * 11 / 2 = 55 elements.', explanation: 'The lower triangle (including diagonal) contains N*(N+1)/2 valid elements.' },
      { id: 'tf07-p3', question: 'What is the purpose of a Key-Padding Mask?', answer: 'To ensure that <pad> tokens in shorter batch sequences receive 0% attention from other tokens and do not influence context calculations.', explanation: 'Key-padding mask sets columns corresponding to <pad> tokens to -inf.' },
    ],
    quiz: [
      {
        id: 'tf07-q1',
        question: 'Which architectural component relies on a lower-triangular causal attention mask?',
        options: ['BERT Encoder', 'GPT Decoder', 'ResNet CNN backbone', 'K-Means clustering'],
        correctIndex: 1,
        explanation: 'Decoder-only models like GPT require causal masks so tokens cannot peek into the future during autoregressive generation.',
      },
      {
        id: 'tf07-q2',
        question: 'Why is -infinity added to logits before Softmax rather than setting probabilities to 0 after Softmax?',
        options: [
          'Because computers cannot divide by zero',
          'Because exp(-infinity) = 0 natively redistributes 100% of the probability mass strictly among valid tokens without violating probability axioms',
          'Because -infinity runs faster on CPUs',
          'To invert the attention matrix',
        ],
        correctIndex: 1,
        explanation: 'Softmax over S + M automatically normalizes valid tokens to sum to 1.0 without post-hoc normalization.',
      },
      {
        id: 'tf07-q3',
        question: 'In PyTorch 2.0+, what performance benefit does setting `is_causal=True` in `F.scaled_dot_product_attention` provide?',
        options: [
          'It reduces model parameters by half',
          'It instructs FlashAttention to skip computing the upper-triangular 50% of the matrix, cutting memory and compute by ~2x',
          'It eliminates the need for token embeddings',
          'It converts text into integers',
        ],
        correctIndex: 1,
        explanation: 'FlashAttention exploits the triangular sparsity directly in GPU SRAM, skipping 50% of unnecessary tile multiplications.',
      },
    ],
    independentExercise: {
      title: 'Implement Combined Causal and Key-Padding Mask',
      problem:
        'Write a Python function `create_combined_mask(padding_mask)` that takes a 1D binary array `padding_mask` of length N (where 1 = valid token, 0 = <pad> token) and returns an (N, N) combined mask that enforces BOTH causal masking AND blocks attention to <pad> tokens.',
      hints: [
        'Start with a causal mask: M = np.where(np.tril(np.ones((N, N))) == 1, 0.0, -1e9).',
        'Identify pad token columns: where padding_mask == 0.',
        'Set those entire columns in M to -1e9.',
      ],
      starterCode: `import numpy as np

def create_combined_mask(padding_mask):
    N = len(padding_mask)
    # TODO: generate combined causal and padding mask
    pass

# Sequence with 3 real tokens and 1 pad token
pad_mask = np.array([1, 1, 1, 0])
M = create_combined_mask(pad_mask)
print("Combined Mask (4x4):\\n", M)`,
      solution: `import numpy as np

def create_combined_mask(padding_mask):
    N = len(padding_mask)
    # Causal lower-triangular mask
    causal = np.where(np.tril(np.ones((N, N))) == 1, 0.0, -1e9)
    # Broadcast padding mask across rows (shape: 1, N)
    pad_blocked = (padding_mask[np.newaxis, :] == 0)
    # Combined mask
    combined = np.where(pad_blocked, -1e9, causal)
    return combined

pad_mask = np.array([1, 1, 1, 0])
M = create_combined_mask(pad_mask)
print("Combined Mask (4x4):\\n", M)`,
    },
    summary: {
      keyTakeaways: [
        'Causal masking is essential for autoregressive training, allowing whole sequences to train in parallel without cheating.',
        'Adding -inf before Softmax guarantees zero probability and zero gradient for future tokens while preserving row sum = 1.0.',
        'Key-padding masks block attention to artificial <pad> tokens in batched tensors.',
        'FlashAttention with is_causal=True skips 50% of memory compute by ignoring the upper triangle on chip.',
      ],
      nextLessonId: 'tf-08-multi-head-attention',
      nextLessonTitle: 'TF-08: Multi-Head Attention (MHA)',
      nextLessonModuleId: 'p6-m8',
    },
  },

  'tf-08-multi-head-attention': {
    id: 'tf-08-multi-head-attention',
    moduleId: 'p6-m8',
    title: 'TF-08: Multi-Head Attention (MHA)',
    subtitle: 'Parallel Representation Subspaces, GQA & Output Projection',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Advanced',
    visualizerType: 'multi-head-attention-explorer',
    objectives: [
      'Explain why a single attention head averages out diverse linguistic relationships',
      'Derive the Multi-Head Attention formulation: Concat(head_1, ..., head_h) W_O',
      'Trace tensor dimensions across head splitting, scaled dot-product attention, and concatenation',
      'Compare standard MHA, Multi-Query Attention (MQA), and Grouped-Query Attention (GQA) used in modern LLMs',
    ],
    prerequisites: ['TF-06: Scaled Dot-Product Self-Attention', 'TF-07: Attention Masks (Causal & Padding Masks)'],
    previousLesson: {
      id: 'tf-07-attention-masks-causal',
      title: 'TF-07: Attention Masks (Causal & Padding Masks)',
      moduleId: 'p6-m7',
    },
    analogy: {
      title: 'A Panel of Specialized Experts vs A Single Generalist',
      text: 'Suppose you are analyzing the sentence: "The bank denied the loan because it was insolvent." A single attention head must do everything with one set of weights. It has to decide: should "it" attend to "bank" (subject), "loan" (object), or "insolvent" (adjective)? Averaging these forces a blurry compromise. Multi-Head Attention is like hiring a panel of 8 specialized investigators sitting at the table. Investigator 1 (Syntax Specialist) tracks who did what to whom. Investigator 2 (Pronoun Specialist) links "it" directly to "bank". Investigator 3 (Adjective Specialist) links "bank" to "insolvent". Investigator 4 (Locality Specialist) monitors adjacent words. After all 8 investigators finish, the Chief Editor (output projection matrix W_O) synthesizes all 8 reports into one unified insight.',
      metaphor: 'A single head blurs diverse relationships; multi-head attention allows simultaneous specialization in syntax, coreference, and semantics.',
    },
    problemSolved: {
      title: 'The Averaging Bottleneck of Single-Head Attention',
      description:
        'A single attention head produces a single convex combination (weighted average) of Value vectors. This prevents the model from simultaneously attending to information from different representation subspaces at different positions.',
      keyPoints: [
        'Subspace Division: Instead of one massive d_model attention pool, MHA splits d_model into h parallel heads with d_k = d_model / h.',
        'Identical Compute Cost: Running h heads of dimension d_k costs the exact same FLOPs as running 1 head of dimension d_model.',
        'Rich Synthesis: Output projection matrix W_O learns how to linearly combine features discovered across all h heads.',
      ],
    },
    intuition: {
      overview:
        'Multi-Head Attention projects Queries, Keys, and Values h times with different learned linear projections into d_k dimensions, runs scaled dot-product attention in parallel across all h heads, concatenates the resulting outputs, and projects them once through W_O.',
      steps: [
        { step: 1, title: 'Multi-Subspace Projection', description: 'Linearly project input X into h Query, Key, and Value sets: Q_i, K_i, V_i for i in 1..h.' },
        { step: 2, title: 'Parallel Attention', description: 'Compute head_i = Attention(Q_i, K_i, V_i) in parallel across all heads.' },
        { step: 3, title: 'Concatenation', description: 'Concatenate head outputs along feature dimension: Concat(head_1, ..., head_h) in R^{N x (h * d_v)} = R^{N x d_model}.' },
        { step: 4, title: 'Output Linear Mixing', description: 'Multiply concatenated tensor by W_O in R^{d_model x d_model} to synthesize head findings.' },
      ],
    },
    mathematics: {
      overview: 'The canonical Multi-Head Attention equations.',
      foundations: [
        {
          name: 'Multi-Head Attention Master Formulation',
          latex: '\\text{MHA}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W_O',
          explanation: 'Concatenates outputs of all h heads and applies final linear transformation W_O.',
        },
        {
          name: 'Individual Head Definition',
          latex: '\\text{head}_i = \\text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)',
          explanation: 'Each head uses its own learned projection matrices W_i^Q, W_i^K in R^{d_model x d_k} and W_i^V in R^{d_model x d_v}.',
        },
        {
          name: 'Dimension Relationship',
          latex: 'd_k = d_v = \\frac{d_{\\text{model}}}{h}',
          explanation: 'Total parameter count and computational complexity remain identical to single-head attention with d_model.',
        },
      ],
    },
    derivation: {
      title: 'FLOP Equivalence Between Multi-Head and Single-Head Attention',
      objective: 'Prove that running h heads of dimension d_k costs the same compute as 1 head of dimension d_model.',
      steps: [
        {
          step: 1,
          label: 'Single Head QK^T Cost',
          latex: '\\text{FLOPs}_{\\text{single}} = 2 \\cdot N^2 \\cdot d_{\\text{model}}',
          explanation: 'Multiplying Q (N, d_model) by K^T (d_model, N) requires 2 * N^2 * d_model operations.',
        },
        {
          step: 2,
          label: 'Per-Head Cost in MHA',
          latex: '\\text{FLOPs}_{\\text{head}_i} = 2 \\cdot N^2 \\cdot d_k = 2 \\cdot N^2 \\cdot \\left(\\frac{d_{\\text{model}}}{h}\\right)',
          explanation: 'Each head operates on smaller vectors of dimension d_k = d_model / h.',
        },
        {
          step: 3,
          label: 'Sum Across All h Heads',
          latex: '\\text{FLOPs}_{\\text{all heads}} = h \\times \\left[ 2 \\cdot N^2 \\cdot \\left(\\frac{d_{\\text{model}}}{h}\\right) \\right] = 2 \\cdot N^2 \\cdot d_{\\text{model}}',
          explanation: 'The h factor cancels out perfectly in the numerator and denominator.',
        },
        {
          step: 4,
          label: 'Conclusion',
          latex: '\\text{FLOPs}_{\\text{MHA}} = \\text{FLOPs}_{\\text{single}}',
          explanation: 'Multi-Head Attention adds immense representational power without increasing total theoretical compute!',
        },
      ],
    },
    variables: [
      { symbol: 'h', name: 'Number of Attention Heads', description: 'Parallel subspaces (e.g., 8 in original Transformer, 32 in LLaMA-7B, 128 in LLaMA-70B)', dimensions: 'Scalar integer' },
      { symbol: 'd_k', name: 'Head Dimension', description: 'Dimension of each head (d_model / h, typically 64 or 128)', dimensions: 'Scalar integer' },
      { symbol: 'W_O', name: 'Output Projection Matrix', description: 'Learned linear matrix blending all heads back into d_model', dimensions: '(h * d_v, d_model)' },
    ],
    numericalExample: {
      scenario: 'Tracing MHA tensor shapes for Batch=2, SeqLen=16, d_model=64, and h=4 heads.',
      dataset: [
        { stage: 'Input Tensor X', shape: '(2, 16, 64)', description: 'Batch of 2 sequences, 16 tokens, 64 dims' },
        { stage: 'Projected Q, K, V', shape: '(2, 16, 64)', description: 'After fused linear layer' },
        { stage: 'Reshaped for Heads', shape: '(2, 4, 16, 16)', description: '(Batch, Heads=4, SeqLen=16, d_k=16)' },
        { stage: 'Attention Weights A', shape: '(2, 4, 16, 16)', description: 'Pairwise affinities per head' },
        { stage: 'Concat Heads Output', shape: '(2, 16, 64)', description: 'Transposed and flattened back to d_model' },
        { stage: 'After Output Linear W_O', shape: '(2, 16, 64)', description: 'Final MHA output tensor' },
      ],
      calculations: [
        { step: 'Head Dimension d_k', math: 'd_model / h = 64 / 4', result: '16 dimensions per head' },
        { step: 'Concatenated Width', math: 'h * d_v = 4 * 16', result: '64 dimensions' },
        { step: 'Output Projection Parameters', math: '64 * 64', result: '4,096 weights in W_O' },
      ],
      finalConclusion: 'Input shape (2, 16, 64) matches output shape (2, 16, 64) exactly, allowing seamless residual addition x + MHA(x).',
    },
    visualExplanation: {
      title: 'Interactive Multi-Head Attention Subspaces',
      description: 'The Multi-Head Attention Explorer above shows 4 heads analyzing "The animal did not cross the street because it was too tired".',
      features: [
        'Head 1 specializes in coreference: resolving the pronoun "it" back to "animal".',
        'Head 2 specializes in syntax: linking the verb "cross" with its subject "animal".',
        'Head 3 specializes in local transitions: tracking consecutive tokens like "did not".',
        'Click between heads to observe how each head focuses on completely distinct linguistic structures.',
      ],
    },
    scratchCode: {
      title: 'Multi-Head Attention from Scratch in Pure NumPy',
      code: `import numpy as np

class MultiHeadAttentionNumPy:
    def __init__(self, d_model, n_head):
        np.random.seed(42)
        self.d_model = d_model
        self.n_head = n_head
        self.d_k = d_model // n_head
        
        # Projections
        self.W_q = np.random.randn(d_model, d_model) * 0.1
        self.W_k = np.random.randn(d_model, d_model) * 0.1
        self.W_v = np.random.randn(d_model, d_model) * 0.1
        self.W_o = np.random.randn(d_model, d_model) * 0.1

    def forward(self, X):
        B, T, C = X.shape
        
        # 1. Linear projections: (B, T, d_model)
        Q = X @ self.W_q
        K = X @ self.W_k
        V = X @ self.W_v
        
        # 2. Reshape into (B, n_head, T, d_k)
        Q = Q.reshape(B, T, self.n_head, self.d_k).transpose(0, 2, 1, 3)
        K = K.reshape(B, T, self.n_head, self.d_k).transpose(0, 2, 1, 3)
        V = V.reshape(B, T, self.n_head, self.d_k).transpose(0, 2, 1, 3)
        
        # 3. Scaled dot-product attention per head
        scores = (Q @ K.transpose(0, 1, 3, 2)) / np.sqrt(self.d_k)
        exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
        A = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
        head_out = A @ V  # (B, n_head, T, d_k)
        
        # 4. Concat heads: (B, T, d_model)
        concat = head_out.transpose(0, 2, 1, 3).reshape(B, T, self.d_model)
        
        # 5. Output projection W_o
        return concat @ self.W_o, A

mha = MultiHeadAttentionNumPy(d_model=16, n_head=2)
x = np.random.randn(1, 4, 16)
out, attn = mha.forward(x)

print("Input shape:       ", x.shape)
print("Output shape:      ", out.shape)
print("Attention weights: ", attn.shape, "-> (Batch, Heads, T, T)")`,
      explanation: 'Transposing axes to `(Batch, n_head, SeqLen, d_k)` allows all heads across all batches to be computed in a single vectorized GEMM matrix multiplication.',
    },
    sklearnCode: {
      title: 'Multi-Head Attention in PyTorch with Grouped-Query Attention (GQA)',
      code: `import torch
import torch.nn as nn

# Standard PyTorch nn.MultiheadAttention
mha = nn.MultiheadAttention(embed_dim=64, num_heads=4, batch_first=True)
x = torch.randn(2, 8, 64)
out, weights = mha(x, x, x)
print("Standard MHA output shape:", out.shape)

# Modern LLM Evolution: Grouped-Query Attention (GQA) used in LLaMA 3 and Mistral
# GQA uses 8 Query heads but only 2 Key/Value head groups, reducing KV Cache RAM by 4x during generation!
class SimpleGQA(nn.Module):
    def __init__(self, d_model=64, n_q_heads=8, n_kv_heads=2):
        super().__init__()
        self.d_k = d_model // n_q_heads
        self.n_q_heads = n_q_heads
        self.n_kv_heads = n_kv_heads
        self.q_proj = nn.Linear(d_model, n_q_heads * self.d_k)
        self.k_proj = nn.Linear(d_model, n_kv_heads * self.d_k)
        self.v_proj = nn.Linear(d_model, n_kv_heads * self.d_k)
        self.out_proj = nn.Linear(d_model, d_model)

    def forward(self, x):
        B, T, _ = x.shape
        q = self.q_proj(x).view(B, T, self.n_q_heads, self.d_k)
        k = self.k_proj(x).view(B, T, self.n_kv_heads, self.d_k)
        v = self.v_proj(x).view(B, T, self.n_kv_heads, self.d_k)
        return q.shape, k.shape

gqa = SimpleGQA()
q_sh, k_sh = gqa(x)
print("GQA Query shape:", q_sh, "| GQA Key shape (4x smaller KV cache):", k_sh)`,
      explanation: 'Grouped-Query Attention (GQA) shares each Key/Value head across multiple Query heads, slashing inference memory without losing accuracy.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate head reshaping and concatenation in browser Pyodide
B, T, d_model, n_head = 1, 3, 4, 2
d_k = d_model // n_head

np.random.seed(42)
X = np.random.randn(B, T, d_model)

# Reshape into multiple heads
X_heads = X.reshape(B, T, n_head, d_k).transpose(0, 2, 1, 3)
print("Original X shape:       ", X.shape)
print("Reshaped to Heads shape:", X_heads.shape, "-> (B, n_head, T, d_k)")

# Reconstruct via concatenation
X_recon = X_heads.transpose(0, 2, 1, 3).reshape(B, T, d_model)
print("Reconstructed shape:    ", X_recon.shape)
print("Lossless reconstruction?", np.allclose(X, X_recon))`,
      expectedOutput: `Original X shape:        (1, 3, 4)
Reshaped to Heads shape: (1, 2, 3, 2) -> (B, n_head, T, d_k)
Reconstructed shape:     (1, 3, 4)
Lossless reconstruction? True`,
    },
    lineByLineExplanation: [
      { lines: 'X_heads = X.reshape(...).transpose(...)', codeSnippet: 'X_heads = X.reshape(B, T, n_head, d_k).transpose(0, 2, 1, 3)', explanation: 'Splits feature dimension into (n_head, d_k) and moves head axis before sequence length.' },
      { lines: 'X_recon = ...', codeSnippet: 'X_recon = X_heads.transpose(0, 2, 1, 3).reshape(B, T, d_model)', explanation: 'Transposes axes back and flattens heads together into d_model.' },
      { lines: 'np.allclose(X, X_recon)', codeSnippet: 'np.allclose(X, X_recon)', explanation: 'Proves the tensor reshape and concatenation is a 100% lossless spatial permutation.' },
    ],
    hyperparameters: [
      { name: 'num_heads (h)', defaultVal: '8 / 32', range: '1 to 128', effect: 'Number of parallel attention subspaces', recommendation: 'Always ensure d_model is evenly divisible by h.' },
      { name: 'kv_heads (for GQA)', defaultVal: '8 in LLaMA 3 70B', range: '1 to num_heads', effect: 'Number of shared Key/Value heads in Grouped-Query Attention', recommendation: 'Setting kv_heads = num_heads / 4 or num_heads / 8 reduces KV cache RAM by 4x-8x during generation.' },
    ],
    assumptions: [
      { assumption: 'Heads Learn Orthogonal Functions', whyItMatters: 'If all heads learn the same representation, multi-head attention degenerates into a single head.', howToVerify: 'Random initialization and dropout encourage heads to diversify during training.' },
    ],
    commonMistakes: [
      { mistake: 'Reshaping without Transposing (0, 2, 1, 3)', solution: 'Simply calling reshape(B, n_head, T, d_k) corrupts token boundaries by interleaving different tokens together.', howToFix: 'Always reshape(B, T, n_head, d_k) first, then transpose(0, 2, 1, 3).' },
      { mistake: 'Forgetting the final output projection W_O', solution: 'Concatenation alone leaves heads isolated; W_O is required to mix information across all heads.', howToFix: 'Always multiply the concatenated heads by W_O.' },
    ],
    realWorldUseCases: [
      { industry: 'High-Throughput LLM Serving', application: 'vLLM and TensorRT-LLM deploying Mistral and LLaMA 3', benefit: 'Grouped-Query Attention enables serving 4x larger concurrent user batch sizes on the same GPU VRAM.' },
      { industry: 'Document QA & Legal AI', application: 'Contract analysis systems', benefit: 'Separate heads track clause references, defined terms, dollar amounts, and date constraints simultaneously.' },
    ],
    practiceQuestions: [
      { id: 'tf08-p1', question: 'If d_model = 512 and h = 8 heads, what is the dimension d_k of each head?', answer: 'd_k = 512 / 8 = 64.', explanation: 'The model dimension is divided equally across the 8 heads.' },
      { id: 'tf08-p2', question: 'What is Grouped-Query Attention (GQA) and why is it used in LLaMA 3?', answer: 'GQA uses multiple Query heads (e.g. 32) but groups them to share a smaller number of Key/Value heads (e.g. 8). It dramatically reduces the KV Cache memory footprint during autoregressive decoding while maintaining model accuracy.', explanation: 'Standard MHA requires caching separate Keys and Values for every head, which consumes gigabytes of VRAM.' },
      { id: 'tf08-p3', question: 'What is the role of the output projection matrix W_O?', answer: 'It linearly projects the concatenated outputs of all h heads (shape N x d_model) back into the d_model space, enabling information learned across different heads to interact and mix.', explanation: 'Without W_O, features discovered in Head 1 would never interact with features from Head 2.' },
    ],
    quiz: [
      {
        id: 'tf08-q1',
        question: 'How does the theoretical computational complexity (FLOPs) of Multi-Head Attention compare to Single-Head Attention of dimension d_model?',
        options: [
          'MHA is h times more expensive',
          'MHA has the exact same FLOP complexity because each head operates on d_model / h dimensions',
          'MHA is h times cheaper',
          'MHA requires quadratic layers',
        ],
        correctIndex: 1,
        explanation: 'Because each of the h heads operates on d_k = d_model / h, the factor of h cancels out: h * (N^2 * d_model / h) = N^2 * d_model.',
      },
      {
        id: 'tf08-q2',
        question: 'Which modern attention variant shares a single Key and Value head across ALL Query heads?',
        options: ['Grouped-Query Attention (GQA)', 'Multi-Query Attention (MQA)', 'Multi-Head Attention (MHA)', 'Rotary Attention'],
        correctIndex: 1,
        explanation: 'Multi-Query Attention (MQA, Shazeer 2019) uses only 1 Key head and 1 Value head for all Query heads, maximizing memory bandwidth savings.',
      },
      {
        id: 'tf08-q3',
        question: 'What is the shape of the output projection matrix W_O?',
        options: ['(d_k, d_model)', '(d_model, d_model)', '(h, h)', '(SequenceLength, d_model)'],
        correctIndex: 1,
        explanation: 'W_O projects the concatenated head vector of length h * d_v = d_model back into d_model space, so its shape is (d_model, d_model).',
      },
    ],
    independentExercise: {
      title: 'Calculate KV Cache Memory Reduction in GQA',
      problem:
        'Write a function `calculate_kv_cache_size(seq_len, d_model, n_q_heads, n_kv_heads, num_layers)` that computes the KV cache memory size in Megabytes (MB) for FP16 precision (2 bytes per number) for standard MHA (n_kv_heads = n_q_heads) vs GQA (n_kv_heads < n_q_heads).',
      hints: [
        'KV cache stores 2 tensors (Keys and Values) per layer: shape (seq_len, n_kv_heads * d_k).',
        'Head dimension d_k = d_model / n_q_heads.',
        'Total values = 2 * num_layers * seq_len * n_kv_heads * d_k.',
        'Multiply by 2 bytes for FP16, then divide by (1024 * 1024) for MB.',
      ],
      starterCode: `def calculate_kv_cache_size(seq_len, d_model, n_q_heads, n_kv_heads, num_layers):
    # TODO: compute KV cache size in MB
    pass

# Compare LLaMA-style 4k context: 32 Q heads vs 8 KV heads (GQA)
mha_mb = calculate_kv_cache_size(4096, 4096, 32, 32, 32)
gqa_mb = calculate_kv_cache_size(4096, 4096, 32, 8, 32)
print(f"Standard MHA KV Cache: {mha_mb:.1f} MB")
print(f"GQA (8 KV heads):     {gqa_mb:.1f} MB")`,
      solution: `def calculate_kv_cache_size(seq_len, d_model, n_q_heads, n_kv_heads, num_layers):
    d_k = d_model // n_q_heads
    # 2 tensors (K and V) * num_layers * seq_len * n_kv_heads * d_k
    total_elements = 2 * num_layers * seq_len * (n_kv_heads * d_k)
    total_bytes = total_elements * 2  # FP16 = 2 bytes
    return total_bytes / (1024 * 1024)

mha_mb = calculate_kv_cache_size(4096, 4096, 32, 32, 32)
gqa_mb = calculate_kv_cache_size(4096, 4096, 32, 8, 32)
print(f"Standard MHA KV Cache: {mha_mb:.1f} MB")
print(f"GQA (8 KV heads):     {gqa_mb:.1f} MB")`,
    },
    summary: {
      keyTakeaways: [
        'Multi-Head Attention splits d_model into h parallel heads of dimension d_k = d_model / h.',
        'Each head specializes in distinct syntactic, semantic, or positional relationships.',
        'Theoretical compute cost is identical to single-head attention because d_k * h = d_model.',
        'Modern architectures adopt Grouped-Query Attention (GQA) to cut KV cache memory by 4x to 8x during generation.',
      ],
      nextLessonId: 'tf-09-residual-layer-norm',
      nextLessonTitle: 'TF-09: Residual Connections & Layer Normalization',
      nextLessonModuleId: 'p6-m9',
    },
  },

  'tf-09-residual-layer-norm': {
    id: 'tf-09-residual-layer-norm',
    moduleId: 'p6-m9',
    title: 'TF-09: Residual Connections & Layer Normalization',
    subtitle: 'Gradient Highways, Pre-LN vs Post-LN Stability, and RMSNorm',
    order: 1,
    readTimeMinutes: 28,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Explain how residual skip connections create direct gradient highways that eliminate vanishing gradients',
      'Compare Layer Normalization with Batch Normalization and understand why BatchNorm fails on variable-length text',
      'Analyze the critical Pre-LN vs Post-LN architectural debate: why Post-LN requires warmups while Pre-LN trains stably',
      'Derive and implement modern RMSNorm (Root Mean Square Normalization) used in LLaMA, Mistral, and Gemma',
    ],
    prerequisites: ['TF-08: Multi-Head Attention (MHA)'],
    previousLesson: {
      id: 'tf-08-multi-head-attention',
      title: 'TF-08: Multi-Head Attention (MHA)',
      moduleId: 'p6-m8',
    },
    analogy: {
      title: 'The Express Interstate Highway vs Stop-and-Go City Streets',
      text: 'Imagine driving across a continent through 100 cities. In a plain network without residual connections, you are forced to exit into every single city center, navigate traffic lights, traffic jams, and roundabouts (matrix multiplications and non-linearities). After 100 cities, your car is exhausted and delayed (vanishing/exploding gradients). A residual connection is an elevated 8-lane Interstate Express Highway running straight over the entire country with exit ramps into each city: x + Sublayer(x). If a city has useful information, you take a quick exit ramp, collect the package, and merge right back onto the interstate. Gradients flowing backwards can cruise at 100 km/h straight down the uninterrupted highway from layer 100 to layer 1 without hitting any red lights!',
      metaphor: 'Residual connections provide uninterrupted gradient highways; LayerNorm keeps the road smooth and preventing signal turbulence.',
    },
    problemSolved: {
      title: 'Deep Gradient Degeneracy in 100+ Layer Networks',
      description:
        'As Transformers scale from 12 layers (BERT-base) to 80+ layers (LLaMA-70B), repeated matrix multiplications and activations cause activations and gradients to either collapse to zero or explode to infinity.',
      keyPoints: [
        'Gradient Highway: Residual addition x + f(x) ensures d(Loss)/dx = d(Loss)/dy * (1 + df/dx). The "+ 1" term prevents gradient death.',
        'BatchNorm Failure in NLP: Batch sizes vary, sentence lengths differ, and padding creates distribution skew. LayerNorm normalizes across features of a single token independently of batch.',
        'Pre-LN Stability: Placing LayerNorm on the input path of each sublayer prevents gradients from vanishing, eliminating delicate warmup schedules.',
      ],
    },
    intuition: {
      overview:
        'Every Transformer sublayer (both Multi-Head Attention and Feed-Forward Network) wraps its computation inside a residual addition and a layer normalization step.',
      steps: [
        { step: 1, title: 'Identity Passthrough', description: 'Input x is preserved as an unmodified baseline.' },
        { step: 2, title: 'Sublayer Transformation', description: 'Compute delta transformation f(x) (either Attention or MLP).' },
        { step: 3, title: 'Residual Merge', description: 'Add transformation back to baseline: y = x + f(x).' },
        { step: 4, title: 'Feature Normalization', description: 'Normalize activations to have mean 0 and variance 1 across the d_model feature dimension.' },
      ],
    },
    mathematics: {
      overview: 'Formulations for Residual Connections, LayerNorm, and RMSNorm.',
      foundations: [
        {
          name: 'Residual Connection Formulation',
          latex: 'y = x + \\text{Sublayer}(x)',
          explanation: 'Guarantees that sublayers learn incremental residual modifications rather than having to reconstruct the full identity mapping.',
        },
        {
          name: 'Standard Layer Normalization',
          latex: '\\text{LN}(x) = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\odot \\gamma + \\beta \\quad \\text{where } \\mu = \\frac{1}{d}\\sum_{i=1}^d x_i, \\; \\sigma^2 = \\frac{1}{d}\\sum_{i=1}^d (x_i - \\mu)^2',
          explanation: 'Normalizes features across the d_model channels of each individual token with learnable scale gamma and bias beta.',
        },
        {
          name: 'Modern RMSNorm (Root Mean Square Normalization)',
          latex: '\\text{RMSNorm}(x) = \\frac{x}{\\text{RMS}(x)} \\odot \\gamma \\quad \\text{where } \\text{RMS}(x) = \\sqrt{\\frac{1}{d} \\sum_{i=1}^d x_i^2 + \\epsilon}',
          explanation: 'Omits mean centering (mu = 0), reducing compute by ~7% while delivering identical training stability in LLaMA.',
        },
      ],
    },
    derivation: {
      title: 'Pre-LN vs Post-LN Gradient Dynamics Derivation',
      objective: 'Prove why Pre-LN enables stable training without delicate learning rate warmups.',
      steps: [
        {
          step: 1,
          label: 'Post-LN Architecture (Original 2017 Vaswani)',
          latex: 'x_{l+1} = \\text{LN}(x_l + f_l(x_l))',
          explanation: 'Normalization is applied AFTER the residual addition.',
        },
        {
          step: 2,
          label: 'Post-LN Gradient Explosion at Initialization',
          latex: '\\frac{\\partial x_L}{\\partial x_l} \\approx \\prod_{k=l}^{L-1} \\frac{1}{\\sqrt{\\sigma_k^2 + \\epsilon}} \\cdot \\left( I + \\frac{\\partial f_k}{\\partial x_k} \\right)',
          explanation: 'Because LayerNorm is in the direct gradient path, gradients through early layers decay exponentially with depth unless a long learning rate warmup is used.',
        },
        {
          step: 3,
          label: 'Pre-LN Architecture (Modern Standard)',
          latex: 'x_{l+1} = x_l + f_l(\\text{LN}(x_l))',
          explanation: 'Normalization is applied to the branch input BEFORE the sublayer; the residual highway remains unnormalized.',
        },
        {
          step: 4,
          label: 'Pre-LN Clean Gradient Path',
          latex: 'x_L = x_0 + \\sum_{l=0}^{L-1} f_l(\\text{LN}(x_l)) \\implies \\frac{\\partial x_L}{\\partial x_0} = I + \\sum_{l=0}^{L-1} \\frac{\\partial f_l}{\\partial x_0}',
          explanation: 'The identity matrix I guarantees a direct, unattenuated path from output directly to input, ensuring instant stability.',
        },
      ],
    },
    variables: [
      { symbol: 'x', name: 'Input Tensor', description: 'Token representations before sublayer transformation', dimensions: '(Batch, SeqLen, d_model)' },
      { symbol: '\\mu, \\sigma^2', name: 'Mean and Variance', description: 'Calculated along the last dimension (d_model) independently for each token', dimensions: '(Batch, SeqLen, 1)' },
      { symbol: '\\gamma, \\beta', name: 'Gain and Bias Parameters', description: 'Learnable affine transformation vectors', dimensions: '(d_model,)' },
      { symbol: '\\epsilon', name: 'Epsilon', description: 'Small constant (e.g. 1e-5 or 1e-6) preventing division by zero', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Applying RMSNorm to a single token vector x = [1.0, 2.0, 3.0] with d = 3, gamma = [1, 1, 1], epsilon = 0.',
      dataset: [
        { dim: 'x_1', val: 1.0, square: 1.0 },
        { dim: 'x_2', val: 2.0, square: 4.0 },
        { dim: 'x_3', val: 3.0, square: 9.0 },
      ],
      calculations: [
        { step: 'Mean of squares', math: '(1.0 + 4.0 + 9.0) / 3 = 14 / 3', result: '4.667' },
        { step: 'Root Mean Square (RMS)', math: 'sqrt(4.667)', result: '2.160' },
        { step: 'Normalize x / RMS', math: '[1.0/2.160, 2.0/2.160, 3.0/2.160]', result: '[0.463, 0.926, 1.389]' },
        { step: 'Verify normalized mean square', math: '(0.463^2 + 0.926^2 + 1.389^2) / 3 = (0.214 + 0.857 + 1.929) / 3', result: '1.000' },
      ],
      finalConclusion: 'RMSNorm scales the vector so its root-mean-square magnitude is exactly 1.0 without having to calculate mean or subtract offsets.',
    },
    visualExplanation: {
      title: 'Pre-LN Gradient Highway Architecture',
      description: 'Pre-LN keeps the central residual trunk completely unencumbered by normalization operations.',
      features: [
        'The main residual backbone acts as an express bus running from input to output.',
        'Sublayers (Attention and MLP) branch off as side roads, normalize their inputs, compute features, and merge back.',
        'Gradients backpropagate down the uninterrupted backbone with zero risk of vanishing.',
      ],
    },
    scratchCode: {
      title: 'LayerNorm and RMSNorm from Scratch in Pure NumPy',
      code: `import numpy as np

class LayerNormNumPy:
    def __init__(self, d_model, eps=1e-5):
        self.gamma = np.ones(d_model)
        self.beta = np.zeros(d_model)
        self.eps = eps

    def forward(self, x):
        # Compute mean and variance along feature axis (d_model)
        mean = np.mean(x, axis=-1, keepdims=True)
        var = np.var(x, axis=-1, keepdims=True)
        # Normalize
        x_norm = (x - mean) / np.sqrt(var + self.eps)
        # Scale and shift
        return x_norm * self.gamma + self.beta

class RMSNormNumPy:
    def __init__(self, d_model, eps=1e-6):
        self.gamma = np.ones(d_model)
        self.eps = eps

    def forward(self, x):
        # Root Mean Square without mean centering
        rms = np.sqrt(np.mean(x**2, axis=-1, keepdims=True) + self.eps)
        return (x / rms) * self.gamma

x = np.array([[1.0, 2.0, 3.0], [4.0, 0.0, -4.0]])
ln = LayerNormNumPy(d_model=3)
rms = RMSNormNumPy(d_model=3)

print("LayerNorm Output:\\n", np.round(ln.forward(x), 3))
print("\\nRMSNorm Output:\\n", np.round(rms.forward(x), 3))`,
      explanation: 'Notice how RMSNorm produces normalized vectors with identical scale without computing or subtracting means.',
    },
    sklearnCode: {
      title: 'Pre-LN Transformer Block in PyTorch with RMSNorm',
      code: `import torch
import torch.nn as nn

# Modern LLaMA-style RMSNorm implementation in PyTorch
class RMSNorm(nn.Module):
    def __init__(self, dim: int, eps: float = 1e-6):
        super().__init__()
        self.eps = eps
        self.weight = nn.Parameter(torch.ones(dim))

    def forward(self, x):
        return x * torch.rsqrt(x.pow(2).mean(-1, keepdim=True) + self.eps) * self.weight

# Modern Pre-LN Residual Transformer Block
class PreLNTransformerBlock(nn.Module):
    def __init__(self, d_model=64, n_head=4):
        super().__init__()
        self.norm1 = RMSNorm(d_model)
        self.attn = nn.MultiheadAttention(d_model, n_head, batch_first=True)
        self.norm2 = RMSNorm(d_model)
        self.mlp = nn.Sequential(
            nn.Linear(d_model, 4 * d_model),
            nn.GELU(),
            nn.Linear(4 * d_model, d_model)
        )

    def forward(self, x):
        # Pre-LN: Norm on the branch, identity addition on the trunk
        x = x + self.attn(self.norm1(x), self.norm1(x), self.norm1(x))[0]
        x = x + self.mlp(self.norm2(x))
        return x

block = PreLNTransformerBlock(d_model=64, n_head=4)
x = torch.randn(2, 8, 64)
out = block(x)
print("Pre-LN Block input shape: ", x.shape)
print("Pre-LN Block output shape:", out.shape)`,
      explanation: 'Pre-LN structure `x = x + sublayer(norm(x))` is the undisputed standard in modern LLMs (GPT-3, LLaMA, PaLM, Mistral).',
    },
    runnableCode: {
      code: `import numpy as np

# Test RMSNorm calculation directly in browser Pyodide
x = np.array([[1.0, 2.0, 3.0], [4.0, 0.0, -4.0]])
rms = np.sqrt(np.mean(x**2, axis=-1, keepdims=True) + 1e-6)
norm_x = x / rms

print("RMSNorm Normalized x:")
print(np.round(norm_x, 3))
print("Mean square check (must be ~1.0):", np.round(np.mean(norm_x**2, axis=-1), 3))`,
      expectedOutput: `RMSNorm Normalized x:
[[ 0.463  0.926  1.389]
 [ 1.225  0.    -1.225]]
Mean square check (must be ~1.0): [1. 1.]`,
    },
    lineByLineExplanation: [
      { lines: 'rms = np.sqrt(np.mean(x**2...))', codeSnippet: 'rms = np.sqrt(np.mean(x**2, axis=-1, keepdims=True) + 1e-6)', explanation: 'Calculates the root mean square along the feature dimension.' },
      { lines: 'norm_x = x / rms', codeSnippet: 'norm_x = x / rms', explanation: 'Scales each token vector by its RMS magnitude.' },
      { lines: 'np.mean(norm_x**2...)', codeSnippet: 'np.mean(norm_x**2, axis=-1)', explanation: 'Verifies that every row now has exact mean square equal to 1.0.' },
    ],
    hyperparameters: [
      { name: 'norm_position', defaultVal: 'Pre-LN', range: 'Pre-LN / Post-LN', effect: 'Placement of normalization layer', recommendation: 'Always use Pre-LN. Post-LN requires painful warmup tuning and diverges at depths > 24 layers.' },
      { name: 'norm_type', defaultVal: 'RMSNorm', range: 'LayerNorm / RMSNorm', effect: 'Normalization equation type', recommendation: 'RMSNorm is faster, simpler, and matches LayerNorm accuracy.' },
      { name: 'epsilon', defaultVal: '1e-5 to 1e-6', range: '1e-5 to 1e-12', effect: 'Numerical stability constant in denominator', recommendation: 'Use 1e-5 for FP16/BF16 training to prevent zero division.' },
    ],
    assumptions: [
      { assumption: 'Feature Dimension Normalization', whyItMatters: 'Normalizing across features ensures independence from batch size and sequence length.', howToVerify: 'Verify that normalization computes mean/RMS across axis=-1 (d_model), NOT axis=0 (batch).' },
    ],
    commonMistakes: [
      { mistake: 'Using Batch Normalization in Transformers', solution: 'BatchNorm computes statistics across the batch dimension. In NLP, sentences have variable padding and batches vary in size, causing severe training instability.', howToFix: 'Always use LayerNorm or RMSNorm for sequence modeling.' },
      { mistake: 'Using Post-LN without learning rate warmup', solution: 'Post-LN without warmup immediately causes gradient explosion or divergence on step 1.', howToFix: 'Adopt Pre-LN: x = x + sublayer(norm(x)).' },
    ],
    realWorldUseCases: [
      { industry: 'Ultra-Deep LLM Scaling', application: 'LLaMA 3 (70B & 405B parameters, 126 layers)', benefit: 'Pre-LN and RMSNorm allow training over 15 trillion tokens across 16,000 GPUs without loss spikes.' },
      { industry: 'Edge AI & Mobile Inference', application: 'Apple Ferret and Google Gemma on smartphones', benefit: 'RMSNorm eliminates mean subtraction instructions, accelerating NPU and mobile GPU inference.' },
    ],
    practiceQuestions: [
      { id: 'tf09-p1', question: 'Why does BatchNorm fail on natural language sequences, whereas LayerNorm succeeds?', answer: 'BatchNorm normalizes across batch items, which fails because sentences have variable lengths and padding masks skew batch statistics. LayerNorm normalizes across the feature dimension of a single token independently of batch size or length.', explanation: 'LayerNorm operates identically during training and single-token inference.' },
      { id: 'tf09-p2', question: 'What is the structural difference between Pre-LN and Post-LN?', answer: 'Post-LN computes x_{l+1} = LN(x_l + Sublayer(x_l)). Pre-LN computes x_{l+1} = x_l + Sublayer(LN(x_l)).', explanation: 'Pre-LN preserves an uninterrupted identity trunk x_0 + sum(f_i), making gradient propagation stable.' },
      { id: 'tf09-p3', question: 'How does RMSNorm differ mathematically from LayerNorm?', answer: 'RMSNorm scales activations by the root mean square without subtracting the mean, omitting the beta bias parameter.', explanation: 'Zhang & Sennrich (2019) proved that scaling variance alone accounts for 99% of LayerNorm benefits.' },
    ],
    quiz: [
      {
        id: 'tf09-q1',
        question: 'Why do residual connections prevent vanishing gradients in deep networks?',
        options: [
          'They invert the loss function',
          'The derivative d(x + f(x))/dx = 1 + f\'(x), ensuring gradients can flow through the "+ 1" identity term directly',
          'They double the learning rate',
          'They eliminate the need for backpropagation',
        ],
        correctIndex: 1,
        explanation: 'The identity addition creates a constant gradient highway of magnitude 1, preventing the gradient from decaying exponentially.',
      },
      {
        id: 'tf09-q2',
        question: 'Why has modern LLM architecture universally shifted from Post-LN to Pre-LN?',
        options: [
          'Pre-LN has fewer parameters',
          'Pre-LN allows stable training without delicate learning rate warmup schedules and scales reliably to 100+ layers',
          'Pre-LN eliminates the need for attention',
          'Post-LN does not work on GPUs',
        ],
        correctIndex: 1,
        explanation: 'Post-LN suffers from vanishing gradients at early layers during initialization, requiring delicate warmups. Pre-LN trains stably out of the box.',
      },
      {
        id: 'tf09-q3',
        question: 'What computational simplification does RMSNorm introduce over standard LayerNorm?',
        options: [
          'It replaces floating point math with integer math',
          'It omits mean calculation and mean centering, computing only the root mean square of activations',
          'It removes the embedding layer',
          'It runs on CPUs only',
        ],
        correctIndex: 1,
        explanation: 'RMSNorm divides by sqrt(mean(x^2)), skipping mean subtraction and saving memory passes.',
      },
    ],
    independentExercise: {
      title: 'Implement Pre-LN Residual Transformer Block',
      problem:
        'Write a Python function `pre_ln_forward(x, sublayer_fn, norm_fn)` in pure NumPy that implements the Pre-LN residual pattern: `x + sublayer_fn(norm_fn(x))`.',
      hints: [
        'Apply norm_fn to x first.',
        'Pass the normalized result to sublayer_fn.',
        'Add the output back to the original unmodified x.',
      ],
      starterCode: `import numpy as np

def pre_ln_forward(x, sublayer_fn, norm_fn):
    # TODO: implement Pre-LN residual pattern
    pass

# Test with dummy functions
norm = lambda z: z / (np.linalg.norm(z, axis=-1, keepdims=True) + 1e-6)
sublayer = lambda z: z * 2.0
x = np.array([[1.0, 2.0], [3.0, 4.0]])
print("Pre-LN Output:\\n", pre_ln_forward(x, sublayer, norm))`,
      solution: `import numpy as np

def pre_ln_forward(x, sublayer_fn, norm_fn):
    # Pre-LN: normalize branch input, add to identity trunk
    branch = sublayer_fn(norm_fn(x))
    return x + branch

norm = lambda z: z / (np.linalg.norm(z, axis=-1, keepdims=True) + 1e-6)
sublayer = lambda z: z * 2.0
x = np.array([[1.0, 2.0], [3.0, 4.0]])
print("Pre-LN Output:\\n", pre_ln_forward(x, sublayer, norm))`,
    },
    summary: {
      keyTakeaways: [
        'Residual connections provide an uninterrupted gradient highway, enabling scaling to 100+ layers.',
        'LayerNorm normalizes across feature channels for each token, making it invariant to batch size.',
        'Pre-LN architecture is the modern standard, ensuring stable training without delicate warmup tuning.',
        'RMSNorm eliminates mean calculation, speeding up inference by ~7% while maintaining identical stability.',
      ],
      nextLessonId: 'tf-10-feed-forward-networks',
      nextLessonTitle: 'TF-10: Feed-Forward Blocks (FFN / MLP)',
      nextLessonModuleId: 'p6-m10',
    },
  },
};

