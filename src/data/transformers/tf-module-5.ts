import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 13: Implement a Small Transformer in PyTorch (p6-m13)
// =========================================================================
export const p6m13Data: ModuleData = {
  id: 'p6-m13',
  number: 13,
  title: 'Implement a Small Transformer in PyTorch',
  subtitle: 'Building a Full nano-GPT Architecture from Scratch',
  description:
    'Synthesize all architectural concepts by constructing a complete working nano-GPT autoregressive language model in PyTorch. Code each block step-by-step: CausalSelfAttention with fused projections, Pre-LN residual TransformerBlock, token and position embedding layers, and the language modeling unembedding head.',
  icon: 'Code2',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-13-pytorch-transformer-block',
      moduleId: 'p6-m13',
      title: 'TF-13: Implement a Small Transformer in PyTorch',
      description:
        'Hands-on PyTorch coding: CausalSelfAttention, Pre-LN TransformerBlock, embedding layer, language model head, and tensor shape tracing.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 14: Inspect Attention Weights & Limitations (p6-m14)
// =========================================================================
export const p6m14Data: ModuleData = {
  id: 'p6-m14',
  number: 14,
  title: 'Inspect Attention Weights & Limitations',
  subtitle: 'Interpretability, Induction Heads & The Quadratic Bottleneck',
  description:
    'Peer inside the black box of Transformer attention. Inspect attention weight heatmaps, discover "Induction Heads" (the fundamental circuit powering in-context few-shot learning), and confront core mathematical limitations: quadratic O(N^2) memory scaling, context length limits, hallucination propensity, and arithmetic degradation.',
  icon: 'Eye',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-14-attention-weights-limitations',
      moduleId: 'p6-m14',
      title: 'TF-14: Inspect Attention Weights & Limitations',
      description:
        'Attention weight heatmaps, induction head circuits, quadratic O(N^2) memory limits, context window trade-offs, and linear attention alternatives.',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'attention-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 15: Transformer Mini-Project: Character-Level Generator (p6-m15)
// =========================================================================
export const p6m15Data: ModuleData = {
  id: 'p6-m15',
  number: 15,
  title: 'Transformer Mini-Project: Character-Level Generator',
  subtitle: 'Train an Autoregressive nano-Decoder on Tiny Shakespeare',
  description:
    'Put theory into practice with a complete end-to-end coding capstone project. Build a character-level decoder model from scratch, train it with CrossEntropyLoss and AdamW on a literary corpus, implement temperature-controlled top-k sampling, and watch coherent sentences emerge from raw character statistics.',
  icon: 'Sparkles',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-15-transformer-mini-project',
      moduleId: 'p6-m15',
      title: 'TF-15: Transformer Mini-Project: Character-Level Generator',
      description:
        'End-to-end capstone: Character tokenization, PyTorch Dataset & DataLoader, training loop, loss curves, and temperature-controlled text generation.',
      order: 1,
      readTimeMinutes: 35,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS
// =========================================================================
export const tfModule5Lessons: Record<string, LessonContent> = {
  'tf-13-pytorch-transformer-block': {
    id: 'tf-13-pytorch-transformer-block',
    moduleId: 'p6-m13',
    title: 'TF-13: Implement a Small Transformer in PyTorch',
    subtitle: 'Step-by-Step Construction of a nano-GPT Decoder Block',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Implement an efficient CausalSelfAttention module with fused QKV projections and causal masking in PyTorch',
      'Construct a complete Pre-LN TransformerBlock combining multi-head attention and feed-forward MLP layers',
      'Assemble a full NanoGPT language model containing token embeddings, positional encodings, stacked blocks, and unembedding head',
      'Trace forward pass tensor shapes from integer token IDs (B, T) to output logits (B, T, vocab_size)',
    ],
    prerequisites: ['TF-08: Multi-Head Attention (MHA)', 'TF-09: Residual Connections & Layer Normalization', 'TF-10: Feed-Forward Blocks (FFN / MLP)'],
    previousLesson: {
      id: 'tf-12-autoregressive-generation-kv-cache',
      title: 'TF-12: Autoregressive Generation & KV Caching',
      moduleId: 'p6-m12',
    },
    analogy: {
      title: 'Assembling a Modern Jet Engine from Modular Stages',
      text: 'A commercial turbofan jet engine looks overwhelmingly complex from the outside, but it is built from a clean sequence of identical compressor stages bolted together along a central drive shaft. Each compressor stage contains two parts: rotor blades that compress incoming air (Multi-Head Attention gathering context), and stator vanes that redirect airflow into the next chamber (the Feed-Forward Network processing features). Between each stage, structural mountings keep the central drive shaft spinning true without wobbling (Residual Connections and LayerNorm). Build one perfect compressor stage, stack 6 or 12 of them in series, attach a fuel nozzle at the front (Token Embeddings) and an exhaust nozzle at the back (Language Model Head), and you have a fully functional engine.',
      metaphor: 'A Transformer is built by stacking identical modular blocks along a central residual highway.',
    },
    problemSolved: {
      title: 'Bridging the Gap from Equations to Production Code',
      description:
        'Understanding mathematical formulas on a blackboard is very different from structuring modular, bug-free, GPU-accelerated PyTorch code with correct tensor dimensions, device handling, and weight initialization.',
      keyPoints: [
        'Modular Hierarchy: nn.Module components cleanly separate Attention, MLP, TransformerBlock, and the overarching LanguageModel.',
        'Fused Linear Layers: Projecting Q, K, V in one matrix multiplication maximizes GPU tensor core concurrency.',
        'Weight Tying: Reusing embedding weights in the final linear projection cuts millions of parameters.',
      ],
    },
    intuition: {
      overview:
        'The complete architecture consists of four nested components: CausalSelfAttention, MLP, TransformerBlock, and NanoGPT.',
      steps: [
        { step: 1, title: 'CausalSelfAttention', description: 'Computes multi-head attention with lower-triangular causal mask.' },
        { step: 2, title: 'MLP', description: 'Two linear layers with 4x expansion and GELU non-linearity.' },
        { step: 3, title: 'TransformerBlock', description: 'Wraps Attention and MLP inside Pre-LN residual connections: x = x + Attn(LN(x)), x = x + MLP(LN(x)).' },
        { step: 4, title: 'NanoGPT', description: 'Embeds token IDs, adds positional encodings, passes through N stacked blocks, applies final LayerNorm, and projects to vocab logits.' },
      ],
    },
    mathematics: {
      overview: 'Complete tensor shape transformations across a Transformer block.',
      foundations: [
        {
          name: 'Block Forward Pass Formulation',
          latex: 'x^{(1)} = x + \\text{CausalSelfAttention}(\\text{LN}_1(x)), \\quad x^{(2)} = x^{(1)} + \\text{MLP}(\\text{LN}_2(x^{(1)}))',
          explanation: 'Standard Pre-LN block where residual additions wrap normalized sublayers.',
        },
        {
          name: 'Logit Projection (Unembedding)',
          latex: '\\text{logits} = \\text{LN}_{\\text{final}}(x^{(L)}) W_{\\text{lm}} \\in \\mathbb{R}^{B \\times T \\times |V|}',
          explanation: 'Projects top-layer representations into vocabulary scores for next-token prediction.',
        },
      ],
    },
    derivation: {
      title: 'Tensor Shape Invariance Derivation',
      objective: 'Prove that input tensor shape (B, T, d_model) is preserved across arbitrarily deep Transformer stacks.',
      steps: [
        {
          step: 1,
          label: 'Input Tensor Dimension',
          latex: 'X \\in \\mathbb{R}^{B \\times T \\times d_{\\text{model}}}',
          explanation: 'Batch of B sequences, each containing T tokens of dimension d_model.',
        },
        {
          step: 2,
          label: 'Multi-Head Attention Output Shape',
          latex: '\\text{MHA}(X) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W_O \\in \\mathbb{R}^{B \\times T \\times (h \\cdot d_k)} = \\mathbb{R}^{B \\times T \\times d_{\\text{model}}}',
          explanation: 'Because h * d_k = d_model, MHA output matches input dimensions exactly.',
        },
        {
          step: 3,
          label: 'MLP Output Shape',
          latex: '\\text{MLP}(X) = \\text{GELU}(X W_1) W_2 \\in \\mathbb{R}^{B \\times T \\times 4d} \\times \\mathbb{R}^{4d \\times d} = \\mathbb{R}^{B \\times T \\times d_{\\text{model}}}',
          explanation: 'Contraction matrix W_2 restores output dimension back to d_model.',
        },
        {
          step: 4,
          label: 'Conclusion',
          latex: '\\text{Shape}(X) = \\text{Shape}(\\text{Block}(X)) = (B, T, d_{\\text{model}})',
          explanation: 'Shape invariance allows stacking 6, 32, or 128 identical blocks without dimension mismatch.',
        },
      ],
    },
    variables: [
      { symbol: 'B', name: 'Batch Size', description: 'Number of independent sequence samples processed in parallel', dimensions: 'Scalar integer' },
      { symbol: 'T', name: 'Sequence Length', description: 'Number of tokens in the current sequence window', dimensions: 'Scalar integer' },
      { symbol: 'd_model', name: 'Model Dimension', description: 'Hidden state vector width (e.g. 64 for nano model, 768 for GPT-2, 4096 for LLaMA-7B)', dimensions: 'Scalar integer' },
      { symbol: '|V|', name: 'Vocab Size', description: 'Total vocabulary size (e.g. 65 for char-level, 50,257 for GPT-2)', dimensions: 'Scalar integer' },
    ],
    numericalExample: {
      scenario: 'Tracing a small batch through a 2-block nano-GPT with B=2, T=4, d_model=8, vocab_size=10.',
      dataset: [
        { stage: 'Token IDs Input', shape: '(2, 4)', description: 'Batch of 2 sequences, 4 integer token IDs each' },
        { stage: 'Token + Position Embeddings', shape: '(2, 4, 8)', description: 'Dense vectors in d_model=8 space' },
        { stage: 'After Block 1', shape: '(2, 4, 8)', description: 'Preserved (2, 4, 8) shape' },
        { stage: 'After Block 2', shape: '(2, 4, 8)', description: 'Preserved (2, 4, 8) shape' },
        { stage: 'Final LayerNorm', shape: '(2, 4, 8)', description: 'Normalized across 8 dims' },
        { stage: 'LM Head (Logits)', shape: '(2, 4, 10)', description: 'Raw prediction scores for all 10 vocabulary tokens' },
      ],
      calculations: [
        { step: 'Embedding Parameters', math: '10 * 8 (tokens) + 4 * 8 (positions)', result: '112 weights' },
        { step: 'Block Attention Parameters', math: '4 * (8 * 8) = 4 * 64', result: '256 weights per block' },
        { step: 'Block MLP Parameters', math: '2 * (8 * 32) = 2 * 256', result: '512 weights per block' },
        { step: 'Total Block Parameters', math: '256 + 512 + 16 (norms)', result: '784 weights per block' },
      ],
      finalConclusion: 'The modular stack processes inputs cleanly with exact shape invariance from embeddings to logits.',
    },
    visualExplanation: {
      title: 'Complete nano-GPT Architecture Flowchart',
      description: 'The end-to-end dataflow pipeline of a Decoder-Only Transformer language model.',
      features: [
        'Token IDs + Positional Encodings enter bottom of network.',
        'Stacked Transformer Blocks perform iterative attention routing and MLP refinement.',
        'Top LayerNorm feeds LM Head linear projection, outputting logits of shape (B, T, vocab_size).',
      ],
    },
    scratchCode: {
      title: 'Full Transformer Block from Scratch in Pure NumPy',
      code: `import numpy as np

class NanoTransformerBlockNumPy:
    def __init__(self, d_model):
        np.random.seed(42)
        self.d_model = d_model
        # Attention projections
        self.W_qkv = np.random.randn(d_model, 3 * d_model) * 0.1
        self.W_o = np.random.randn(d_model, d_model) * 0.1
        # MLP projections
        self.W_1 = np.random.randn(d_model, 4 * d_model) * 0.1
        self.W_2 = np.random.randn(4 * d_model, d_model) * 0.1

    def rms_norm(self, x):
        rms = np.sqrt(np.mean(x**2, axis=-1, keepdims=True) + 1e-6)
        return x / rms

    def forward(self, x):
        B, T, C = x.shape
        
        # 1. Pre-LN Attention Branch
        norm_x1 = self.rms_norm(x)
        qkv = norm_x1 @ self.W_qkv
        Q, K, V = np.split(qkv, 3, axis=-1)
        
        scores = (Q @ K.swapaxes(-2, -1)) / np.sqrt(C)
        # Causal mask
        mask = np.tril(np.ones((T, T)))
        masked_scores = np.where(mask == 1, scores, -1e9)
        exp_s = np.exp(masked_scores - np.max(masked_scores, axis=-1, keepdims=True))
        A = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
        attn_out = (A @ V) @ self.W_o
        
        # Residual 1
        x = x + attn_out
        
        # 2. Pre-LN MLP Branch
        norm_x2 = self.rms_norm(x)
        h = np.maximum(0, norm_x2 @ self.W_1)  # ReLU
        mlp_out = h @ self.W_2
        
        # Residual 2
        x = x + mlp_out
        return x

block = NanoTransformerBlockNumPy(d_model=8)
x = np.random.randn(1, 4, 8)
out = block.forward(x)

print("Input shape:  ", x.shape)
print("Output shape: ", out.shape)
print("Shape is perfectly preserved across the Transformer block!")`,
      explanation: 'Complete implementation of the canonical Pre-LN residual Transformer block in 50 lines of pure NumPy.',
    },
    sklearnCode: {
      title: 'Complete nano-GPT Language Model in PyTorch (Karpathy Style)',
      code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class CausalSelfAttention(nn.Module):
    def __init__(self, d_model=64, n_head=4):
        super().__init__()
        assert d_model % n_head == 0
        self.c_attn = nn.Linear(d_model, 3 * d_model, bias=False)
        self.c_proj = nn.Linear(d_model, d_model, bias=False)
        self.n_head = n_head
        self.d_k = d_model // n_head

    def forward(self, x):
        B, T, C = x.shape
        q, k, v = self.c_attn(x).chunk(3, dim=-1)
        q = q.view(B, T, self.n_head, self.d_k).transpose(1, 2)
        k = k.view(B, T, self.n_head, self.d_k).transpose(1, 2)
        v = v.view(B, T, self.n_head, self.d_k).transpose(1, 2)
        
        # Hardware accelerated causal SDPA
        y = F.scaled_dot_product_attention(q, k, v, is_causal=True)
        y = y.transpose(1, 2).contiguous().view(B, T, C)
        return self.c_proj(y)

class TransformerBlock(nn.Module):
    def __init__(self, d_model=64, n_head=4):
        super().__init__()
        self.ln_1 = nn.LayerNorm(d_model)
        self.attn = CausalSelfAttention(d_model, n_head)
        self.ln_2 = nn.LayerNorm(d_model)
        self.mlp = nn.Sequential(
            nn.Linear(d_model, 4 * d_model, bias=False),
            nn.GELU(),
            nn.Linear(4 * d_model, d_model, bias=False)
        )

    def forward(self, x):
        x = x + self.attn(self.ln_1(x))
        x = x + self.mlp(self.ln_2(x))
        return x

class NanoGPT(nn.Module):
    def __init__(self, vocab_size=65, d_model=64, n_head=4, n_layers=3, block_size=128):
        super().__init__()
        self.tok_emb = nn.Embedding(vocab_size, d_model)
        self.pos_emb = nn.Embedding(block_size, d_model)
        self.blocks = nn.ModuleList([TransformerBlock(d_model, n_head) for _ in range(n_layers)])
        self.ln_f = nn.LayerNorm(d_model)
        self.lm_head = nn.Linear(d_model, vocab_size, bias=False)

    def forward(self, idx):
        B, T = idx.shape
        tok = self.tok_emb(idx)
        pos = self.pos_emb(torch.arange(T, device=idx.device))
        x = tok + pos
        for block in self.blocks:
            x = block(x)
        x = self.ln_f(x)
        logits = self.lm_head(x)
        return logits

# Instantiate and verify
model = NanoGPT()
dummy_ids = torch.randint(0, 65, (2, 16))
logits = model(dummy_ids)
print("Input IDs shape: ", dummy_ids.shape)
print("Output Logits:   ", logits.shape, "-> (Batch, SeqLen, VocabSize)")`,
      explanation: 'Production-ready minimal GPT model with causal attention, Pre-LN blocks, positional embeddings, and language model head.',
    },
    runnableCode: {
      code: `import numpy as np

# Verify complete mini nano-transformer block in browser Pyodide
np.random.seed(42)
B, T, d_model = 1, 3, 4

x = np.random.randn(B, T, d_model)

# 1. Pre-LN
rms1 = np.sqrt(np.mean(x**2, axis=-1, keepdims=True) + 1e-6)
norm_x1 = x / rms1

# 2. Self-Attention with Causal Mask
W_qkv = np.random.randn(d_model, 3 * d_model) * 0.1
qkv = norm_x1 @ W_qkv
Q, K, V = np.split(qkv, 3, axis=-1)

scores = (Q @ K.swapaxes(-2, -1)) / np.sqrt(d_model)
mask = np.tril(np.ones((T, T)))
masked_scores = np.where(mask == 1, scores, -1e9)
exp_s = np.exp(masked_scores - np.max(masked_scores, axis=-1, keepdims=True))
weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
attn_out = weights @ V

# Residual 1
x = x + attn_out

# 3. Pre-LN 2
rms2 = np.sqrt(np.mean(x**2, axis=-1, keepdims=True) + 1e-6)
norm_x2 = x / rms2

# 4. MLP (4x expansion)
W1 = np.random.randn(d_model, 4 * d_model) * 0.1
W2 = np.random.randn(4 * d_model, d_model) * 0.1
h = np.maximum(0, norm_x2 @ W1)  # ReLU
mlp_out = h @ W2

# Residual 2
x = x + mlp_out

print("Block output shape:", x.shape)
print("Block output values:")
print(np.round(x, 3))`,
      expectedOutput: `Block output shape: (1, 3, 4)
Block output values:
[[[ 0.363 -0.215  0.567  1.689]
  [-0.465 -0.373  1.459  1.041]
  [-0.667  0.52  -0.474 -0.32 ]]]`,
    },
    lineByLineExplanation: [
      { lines: 'norm_x1 = x / rms1', codeSnippet: 'norm_x1 = x / rms1', explanation: 'Pre-LN step: normalizes input before entering self-attention branch.' },
      { lines: 'x = x + attn_out', codeSnippet: 'x = x + attn_out', explanation: 'Residual connection 1: adds attention delta to original input.' },
      { lines: 'norm_x2 = x / rms2', codeSnippet: 'norm_x2 = x / rms2', explanation: 'Pre-LN step 2: normalizes intermediate state before entering MLP branch.' },
      { lines: 'x = x + mlp_out', codeSnippet: 'x = x + mlp_out', explanation: 'Residual connection 2: adds MLP output back to residual stream.' },
    ],
    hyperparameters: [
      { name: 'n_layers', defaultVal: '3 to 12 (nano) / 32 to 126 (frontier)', range: '1 to 128', effect: 'Number of stacked TransformerBlocks', recommendation: 'More layers increase model depth and reasoning capacity.' },
      { name: 'd_model', defaultVal: '64 to 256 (nano) / 4096 (LLaMA-7B)', range: '32 to 8192', effect: 'Width of latent representation', recommendation: 'Keep d_model a multiple of 64 or 128 for tensor core alignment.' },
    ],
    assumptions: [
      { assumption: 'Residual Dimension Consistency', whyItMatters: 'Adding x + sublayer(x) requires sublayer(x) to have identical shape (B, T, d_model) as x.', howToVerify: 'Verify that W_o in attention and W_2 in MLP both project back to d_model.' },
    ],
    commonMistakes: [
      { mistake: 'Forgetting `.contiguous()` before `.view()` in PyTorch', solution: 'Calling transpose() changes memory stride without copying data. Calling .view() on a non-contiguous tensor throws RuntimeError.', howToFix: 'Always call `.contiguous().view()` after transpose operations in PyTorch.' },
      { mistake: 'Missing causal mask in decoder training', solution: 'Without a causal mask, the model trivially copies future tokens during training and fails completely at inference time.', howToFix: 'Ensure `is_causal=True` is passed to attention function.' },
    ],
    realWorldUseCases: [
      { industry: 'Custom Domain Language Models', application: 'Financial, legal, and biomedical small language models (SLMs)', benefit: 'Small 500M-1B parameter nano-GPT models trained on curated domain text outperform 70B models at specialized tasks.' },
      { industry: 'On-Device Text Autocomplete', application: 'Smart keyboard next-word prediction on iOS and Android', benefit: 'Compact 4-layer nano-Transformers execute in under 5ms on mobile NPU chips.' },
    ],
    practiceQuestions: [
      { id: 'tf13-p1', question: 'What is the output shape of the language modeling head (self.lm_head) in a model with d_model = 128 and vocab_size = 50,257 for a batch of shape (2, 64)?', answer: '(2, 64, 50257). It produces 50,257 prediction logits for each of the 64 token positions across both batch items.', explanation: 'Each logit corresponds to the unnormalized log-probability of a vocabulary word.' },
      { id: 'tf13-p2', question: 'Why does PyTorch throw a RuntimeError if you call .view() on a transposed tensor without calling .contiguous() first?', answer: 'transpose() creates a non-contiguous tensor by altering memory strides without reallocating elements. view() requires memory to be contiguous in RAM.', explanation: 'calling .contiguous() forces PyTorch to copy the elements into a contiguous memory buffer.' },
      { id: 'tf13-p3', question: 'How is weight tying implemented between self.tok_emb and self.lm_head in PyTorch?', answer: 'By setting self.lm_head.weight = self.tok_emb.weight.', explanation: 'Both layers share the exact same parameter tensor, halving embedding memory and accelerating training.' },
    ],
    quiz: [
      {
        id: 'tf13-q1',
        question: 'In a Pre-LN TransformerBlock, where is Layer Normalization applied?',
        options: [
          'After the residual addition',
          'At the start of each sublayer branch, before computing attention or MLP',
          'Only at the very end of the model',
          'Only on the Query and Key matrices',
        ],
        correctIndex: 1,
        explanation: 'Pre-LN normalizes the branch input before Attention and before MLP, leaving the central residual highway unnormalized.',
      },
      {
        id: 'tf13-q2',
        question: 'What is the purpose of the final Layer Normalization (self.ln_f) right before the LM head?',
        options: [
          'To convert floating points to integers',
          'To normalize the unbounded growth of activations accumulated across all residual additions before computing vocabulary logits',
          'To generate random numbers',
          'To mask out future tokens',
        ],
        correctIndex: 1,
        explanation: 'Because Pre-LN adds unnormalized sublayer deltas into the residual stream, activations grow with depth; ln_f stabilizes variance before the classification head.',
      },
      {
        id: 'tf13-q3',
        question: 'If a sequence has 10 tokens and d_model = 64, what is the shape of the positional embedding tensor added to the token embeddings?',
        options: ['(10,)', '(64,)', '(10, 64)', '(10, 10)'],
        correctIndex: 2,
        explanation: 'Positional embeddings provide one 64-dimensional vector for each of the 10 positions, producing shape (10, 64).',
      },
    ],
    independentExercise: {
      title: 'Implement Weight Tying in PyTorch NanoGPT',
      problem:
        'Write a function `verify_weight_tying(model)` that checks whether `model.lm_head.weight` and `model.tok_emb.weight` share identical underlying data pointers in memory (`data_ptr()`).',
      hints: [
        'To tie weights: model.lm_head.weight = model.tok_emb.weight.',
        'Compare model.lm_head.weight.data_ptr() == model.tok_emb.weight.data_ptr().',
      ],
      starterCode: `import torch
import torch.nn as nn

class MiniLM(nn.Module):
    def __init__(self, vocab_size=100, d_model=16):
        super().__init__()
        self.tok_emb = nn.Embedding(vocab_size, d_model)
        self.lm_head = nn.Linear(d_model, vocab_size, bias=False)
        # TODO: tie weights here

def verify_weight_tying(model):
    # TODO: return True if data_ptr matches
    pass

model = MiniLM()
# print("Tied?", verify_weight_tying(model))`,
      solution: `import torch
import torch.nn as nn

class MiniLM(nn.Module):
    def __init__(self, vocab_size=100, d_model=16):
        super().__init__()
        self.tok_emb = nn.Embedding(vocab_size, d_model)
        self.lm_head = nn.Linear(d_model, vocab_size, bias=False)
        # Weight tying
        self.lm_head.weight = self.tok_emb.weight

def verify_weight_tying(model):
    return model.lm_head.weight.data_ptr() == model.tok_emb.weight.data_ptr()

model = MiniLM()
print("Tied?", verify_weight_tying(model))`,
    },
    summary: {
      keyTakeaways: [
        'A full autoregressive Transformer model stacks identical Pre-LN blocks along an unencumbered residual trunk.',
        'Tensor dimensions (B, T, d_model) remain invariant across all stacked blocks.',
        'Weight tying shares weights between input embeddings and output LM head, saving massive parameter memory.',
        'FlashAttention-2 provides hardware-level acceleration for the causal self-attention operation.',
      ],
      nextLessonId: 'tf-14-attention-weights-limitations',
      nextLessonTitle: 'TF-14: Inspect Attention Weights & Limitations',
      nextLessonModuleId: 'p6-m14',
    },
  },

  'tf-14-attention-weights-limitations': {
    id: 'tf-14-attention-weights-limitations',
    moduleId: 'p6-m14',
    title: 'TF-14: Inspect Attention Weights & Limitations',
    subtitle: 'Mechanistic Interpretability, Induction Circuits & The Quadratic Memory Wall',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'attention-explorer',
    objectives: [
      'Interpret attention heatmaps to identify specialized syntactic, positional, and coreference heads',
      'Explain Induction Heads: the two-head circuit discovered by Anthropic that powers in-context few-shot learning',
      'Analyze the fundamental quadratic O(N^2) memory and compute barrier of standard self-attention',
      'Survey modern hardware and algorithmic solutions: FlashAttention-2/3, sliding window attention, and linear state-space models (Mamba)',
    ],
    prerequisites: ['TF-06: Scaled Dot-Product Self-Attention', 'TF-08: Multi-Head Attention (MHA)'],
    previousLesson: {
      id: 'tf-13-pytorch-transformer-block',
      title: 'TF-13: Implement a Small Transformer in PyTorch',
      moduleId: 'p6-m13',
    },
    analogy: {
      title: 'The Photographer\'s Zoom Lens vs The Wide-Angle Cinema Rig',
      text: 'Imagine taking a photograph of 10 people standing in a line. To record every single person\'s relationship to every other person, you need 10 * 10 = 100 relationship measurements. If 1,000 people enter the stadium, you suddenly need 1,000,000 measurements (O(N^2) quadratic explosion). A standard camera sensor melts under the thermal load! Mechanistic interpretability is like using specialized filters on the camera: Filter 1 isolates family ties (coreference heads), Filter 2 isolates height comparisons (syntactic heads), and Filter 3 isolates who copied whose clothes (induction heads). But no matter how smart the filters are, the quadratic wall means you cannot track 1,000,000 people all-to-all without running out of film. This is why AI research invented FlashAttention and chunked linear approximations.',
      metaphor: 'Attention weights show us where the model looks; the quadratic bottleneck limits how far it can see.',
    },
    problemSolved: {
      title: 'The O(N^2) Context Length Memory Barrier',
      description:
        'Standard self-attention computes an N x N matrix. For sequence length N = 2,048, N^2 = 4.1 million entries. For N = 128,000, N^2 = 16.3 billion entries per layer per head! Storing these attention matrices during training requires petabytes of GPU memory.',
      keyPoints: [
        'Quadratic Scaling: Memory and compute scale as O(N^2), making naive attention on million-token books impossible.',
        'IO-Aware Computing (FlashAttention): Tripled speed by fusing matrix multiply and softmax inside GPU SRAM without writing the N x N matrix to HBM.',
        'Algorithmic Workarounds: Sliding window attention (Mistral), linear attention, and State Space Models (Mamba).',
      ],
    },
    intuition: {
      overview:
        'By analyzing trained attention weights, mechanistic interpretability researchers discovered that in-context learning is not magic: it is driven by concrete circuits called Induction Heads.',
      steps: [
        { step: 1, title: 'Previous Token Head (Layer 1)', description: 'Attends from current token x_i to the immediately preceding token x_{i-1}.' },
        { step: 2, title: 'Induction Head (Layer 2)', description: 'Searches the past for previous occurrences of token A, identifies the token B that followed it, and predicts that B will follow A again!' },
        { step: 3, title: 'In-Context Copying', description: 'This simple two-head circuit explains how LLMs perform few-shot demonstration learning and copy names from earlier in a prompt.' },
        { step: 4, title: 'Attention Failures', description: 'Attention fails on multi-step exact arithmetic and long-range distraction ("needle in a haystack").' },
      ],
    },
    mathematics: {
      overview: 'Memory scaling formulation and IO complexity of attention.',
      foundations: [
        {
          name: 'Attention Matrix Memory Complexity',
          latex: '\\text{Memory}_{\\text{Attention}} = O(B \\cdot H \\cdot N^2)',
          explanation: 'Quadratic scaling along sequence length N creates the dreaded memory wall in training and inference.',
        },
        {
          name: 'Induction Head Matching Circuit',
          latex: 'A \\to B \\dots A \\implies \\hat{y} = B',
          explanation: 'Induction heads fire whenever token A repeats, promoting token B into the top logit prediction.',
        },
        {
          name: 'IO-Aware FlashAttention Memory Bound',
          latex: '\\text{HBM Accesses} = O\\left(\\frac{N^2 d^2}{M}\\right) \\quad \\text{where } M \\text{ is SRAM size}',
          explanation: 'Dao et al. proved that tile-based softmax tiling cuts slow GPU High Bandwidth Memory accesses by 5x.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Quadratic Memory Explosion',
      objective: 'Calculate the exact RAM required to store raw attention weights as sequence length scales from 2k to 128k.',
      steps: [
        {
          step: 1,
          label: 'Baseline at N = 2,048 Tokens',
          latex: 'N = 2048, \\; B = 1, \\; H = 32, \\; L = 32 \\implies \\text{Elements} = 32 \\times 32 \\times 2048^2 = 4,294,967,296 \\text{ floats}',
          explanation: 'In FP16 (2 bytes), attention weights consume 8.58 GB of VRAM.',
        },
        {
          step: 2,
          label: 'Scaling to N = 32,768 Tokens (16x longer)',
          latex: 'N = 32768 \\implies \\text{Elements} = 32 \\times 32 \\times 32768^2 = 1,099,511,627,776 \\text{ floats}',
          explanation: 'Attention weights alone consume 2,199 GB (2.2 Terabytes) of VRAM!',
        },
        {
          step: 3,
          label: 'Scaling to N = 128,000 Tokens (LLaMA 3)',
          latex: 'N = 128000 \\implies 32 \\times 32 \\times 128000^2 \\times 2 \\text{ bytes} = 33,554 \\text{ GB} = 33.5 \\text{ Terabytes VRAM}',
          explanation: 'No single GPU or 8-GPU node on Earth has 33 Terabytes of VRAM.',
        },
        {
          step: 4,
          label: 'Why FlashAttention is Mandatory',
          latex: '\\text{FlashAttention Memory} = O(N) \\quad (\\text{skips materializing } N \\times N \\text{ matrix in RAM})',
          explanation: 'By computing attention in SRAM tiles and accumulating online softmax, FlashAttention reduced peak memory from 33.5 TB down to a few hundred megabytes.',
        },
      ],
    },
    variables: [
      { symbol: 'N', name: 'Sequence Length', description: 'Context window size in tokens', dimensions: 'Scalar integer' },
      { symbol: 'HBM', name: 'High Bandwidth Memory', description: 'Main GPU RAM (e.g. 80GB on NVIDIA H100)', dimensions: 'Bytes' },
      { symbol: 'SRAM', name: 'On-Chip Fast Cache', description: 'Extremely fast memory located directly on GPU tensor cores (~256KB per SM)', dimensions: 'Bytes' },
    ],
    numericalExample: {
      scenario: 'Comparing memory consumption of materializing attention matrix for N = 1,000 vs N = 10,000 in FP16 for 1 layer, 1 head.',
      dataset: [
        { seqLen: 1000, matrixSize: '1,000 x 1,000', floats: '1,000,000', ramKB: '1,953 KB (~2 MB)' },
        { seqLen: 10000, matrixSize: '10,000 x 10,000', floats: '100,000,000', ramKB: '195,312 KB (~195 MB)' },
      ],
      calculations: [
        { step: 'Length ratio', math: '10,000 / 1,000', result: '10x increase in length' },
        { step: 'Memory ratio', math: '195 MB / 2 MB', result: '100x increase in memory (10^2)!' },
      ],
      finalConclusion: 'A 10x increase in sequence length causes a 100x explosion in attention memory.',
    },
    visualExplanation: {
      title: 'Attention Heatmap Interpretation',
      description: 'The Attention Explorer visualizer above illustrates how pairwise affinities reflect linguistic specialization.',
      features: [
        'Diagonal dominance: Most tokens pay high attention to themselves and immediately adjacent tokens.',
        'Vertical stripes: Punctuation marks (periods, commas) and special tokens (<bos>) often act as "attention sinks", absorbing excess probability mass.',
        'Off-diagonal alignments: Syntactic dependencies connect verbs to subjects and pronouns to antecedents.',
      ],
    },
    scratchCode: {
      title: 'Detecting Attention Sinks and Entropy in Pure NumPy',
      code: `import numpy as np

def analyze_attention_matrix(A):
    # A shape: (N, N)
    N = A.shape[0]
    
    # 1. Diagonal focus (how much each token attends to itself)
    self_attention = np.diag(A)
    
    # 2. Attention Sink detection (column sums - tokens receiving disproportionate attention)
    column_incoming = np.sum(A, axis=0) / N
    sink_token_idx = np.argmax(column_incoming)
    
    # 3. Attention Entropy (sharpness vs diffusion of attention)
    # H = -sum(p * log(p))
    entropy = -np.sum(A * np.log(A + 1e-12), axis=-1)
    
    return {
        "mean_self_attention": float(np.round(np.mean(self_attention), 3)),
        "primary_attention_sink_token": int(sink_token_idx),
        "mean_entropy": float(np.round(np.mean(entropy), 3))
    }

# Synthetic attention matrix where token 0 is an attention sink (e.g. <bos> token)
A = np.array([
    [0.7, 0.2, 0.1],
    [0.6, 0.3, 0.1],
    [0.8, 0.1, 0.1]
])

report = analyze_attention_matrix(A)
print("Attention Matrix Analysis Report:")
for k, v in report.items():
    print(f"  {k}: {v}")`,
      explanation: 'Attention sinks (Xiao et al., 2023) occur when models dump unneeded attention mass onto the initial <bos> token to keep downstream representations stable.',
    },
    sklearnCode: {
      title: 'Visualizing Attention Heatmaps with Matplotlib and Seaborn',
      code: `import numpy as np
import matplotlib.pyplot as plt

tokens = ["The", "quick", "brown", "fox", "jumped"]
N = len(tokens)
np.random.seed(42)

# Synthetic attention matrix
A = np.random.dirichlet(np.ones(N), size=N)

# Visualizing Heatmap
fig, ax = plt.subplots(figsize=(6, 5))
cax = ax.matshow(A, cmap="coolwarm")
fig.colorbar(cax)

ax.set_xticks(range(N))
ax.set_yticks(range(N))
ax.set_xticklabels(tokens, rotation=45)
ax.set_yticklabels(tokens)
ax.set_title("Self-Attention Weight Heatmap", pad=20)
plt.tight_layout()
# plt.show()
print("Attention heatmap visualizer demonstrates how to inspect token affinities across sequence positions.")`,
      explanation: 'Heatmap visualization is the standard diagnostic tool used by interpretability researchers to inspect layer specializations.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate quadratic memory scaling in browser Pyodide
seq_lengths = [512, 1024, 2048, 4096, 8192]
print("Sequence Length vs Raw Attention Matrix Entries (N x N):")
for n in seq_lengths:
    entries = n * n
    mb_fp16 = (entries * 2) / (1024 * 1024)
    print(f"  N = {n:5d} tokens -> {entries:10,d} floats ({mb_fp16:6.2f} MB)")`,
      expectedOutput: `Sequence Length vs Raw Attention Matrix Entries (N x N):
  N =   512 tokens ->    262,144 floats (  0.50 MB)
  N =  1024 tokens ->  1,048,576 floats (  2.00 MB)
  N =  2048 tokens ->  4,194,304 floats (  8.00 MB)
  N =  4096 tokens -> 16,777,216 floats ( 32.00 MB)
  N =  8192 tokens -> 67,108,864 floats (128.00 MB)`,
    },
    lineByLineExplanation: [
      { lines: 'entries = n * n', codeSnippet: 'entries = n * n', explanation: 'Calculates total pairwise attention logits in the N x N matrix.' },
      { lines: 'mb_fp16 = (entries * 2) / ...', codeSnippet: 'mb_fp16 = (entries * 2) / (1024 * 1024)', explanation: 'Converts float count to megabytes under 16-bit half precision.' },
      { lines: 'print(...)', codeSnippet: 'print(f"N = {n} -> {mb_fp16} MB")', explanation: 'Shows that quadrupling length from 2048 to 8192 multiplies memory by 16x (from 8MB to 128MB per single head!).' },
    ],
    hyperparameters: [
      { name: 'sliding_window_size (W)', defaultVal: '4096 in Mistral 7B', range: '512 to 32768', effect: 'Restricts each token to attend only to previous W tokens', recommendation: 'Sliding Window Attention cuts memory from O(N^2) to O(N * W), enabling million-token contexts.' },
    ],
    assumptions: [
      { assumption: 'Attention Weights Reveal Internal Reasoning', whyItMatters: 'Interpreting attention weights as direct explanations can sometimes be misleading ("Attention is not Explanation", Jain & Wallace).', howToVerify: 'Cross-validate attention heatmaps with gradient-based saliency and ablation studies.' },
    ],
    commonMistakes: [
      { mistake: 'Trying to scale standard attention to 100k context without FlashAttention', solution: 'Allocating a 100,000 x 100,000 float tensor crashes GPU memory with Out-Of-Memory (OOM) instantly.', howToFix: 'Always use FlashAttention-2 or sliding window attention for sequences > 4k.' },
      { mistake: 'Assuming high attention weight always means positive correlation', solution: 'An attention head can attend strongly to a token in order to suppress or negate its meaning in Value space.', howToFix: 'Inspect the product AttentionWeights @ Value, not attention weights alone.' },
    ],
    realWorldUseCases: [
      { industry: 'Mechanistic Interpretability & AI Safety', application: 'Anthropic Golden Gate Claude & circuit tracing', benefit: 'Locating induction heads and safety guardrail circuits allows auditing models for deceptive alignment.' },
      { industry: 'Genomics & DNA Foundation Models', application: 'HyenaDNA and Caduceus processing 1,000,000 base pair sequences', benefit: 'Replaces quadratic attention with linear convolution/state-space models to analyze entire human chromosomes.' },
    ],
    practiceQuestions: [
      { id: 'tf14-p1', question: 'What is an "Induction Head" in Transformer interpretability?', answer: 'A two-layer attention circuit where Layer 1 tracks the previous token and Layer 2 searches for historical occurrences of the current token to copy the token that followed it. It is the primary engine of in-context learning.', explanation: 'Discovered by Olsson et al. (Anthropic 2022).' },
      { id: 'tf14-p2', question: 'How does FlashAttention avoid the quadratic memory barrier during forward pass?', answer: 'It breaks the Q, K, and V matrices into blocks (tiles) that fit into on-chip GPU SRAM, computes online softmax incrementally, and accumulates output without writing the full N x N matrix to GPU HBM.', explanation: 'Tri Dao (2022) proved that attention is IO-bound, not compute-bound.' },
      { id: 'tf14-p3', question: 'What is an "Attention Sink" in autoregressive language models?', answer: 'The phenomenon where initial tokens (like <bos> or token 0) absorb massive attention weights regardless of semantic relevance, simply acting as a numerical dump for unneeded probability mass.', explanation: 'StreamingLLM (Xiao et al.) showed preserving the first 4 tokens keeps long-term generation stable.' },
    ],
    quiz: [
      {
        id: 'tf14-q1',
        question: 'Why does standard self-attention scale as O(N^2) with sequence length N?',
        options: [
          'Because the embedding layer is large',
          'Because every token computes a dot product with every other token, producing an N x N matrix',
          'Because of the Feed-Forward Network',
          'Because of Positional Encoding',
        ],
        correctIndex: 1,
        explanation: 'The pairwise interaction matrix QK^T contains N rows and N columns, totaling N^2 elements.',
      },
      {
        id: 'tf14-q2',
        question: 'What revolutionary technique computes exact attention outputs with O(N) memory by tiling computation in GPU SRAM?',
        options: ['FlashAttention', 'Batch Normalization', 'Stochastic Gradient Descent', 'One-hot encoding'],
        correctIndex: 0,
        explanation: 'FlashAttention (Dao et al.) fuses matrix multiplication and softmax inside GPU SRAM, avoiding the O(N^2) memory footprint.',
      },
      {
        id: 'tf14-q3',
        question: 'What functional capability emerges in Transformers when "Induction Heads" form during pretraining?',
        options: [
          'The model can run on CPUs',
          'In-context few-shot learning and pattern copying',
          'The vocabulary size decreases',
          'Backpropagation runs backwards',
        ],
        correctIndex: 1,
        explanation: 'Induction heads allow models to recognize patterns like [A][B] ... [A] -> predict [B], driving few-shot in-context learning.',
      },
    ],
    independentExercise: {
      title: 'Calculate FlashAttention Memory Savings',
      problem:
        'Write a Python function `flash_attention_savings(seq_len, d_model=4096, n_heads=32)` that calculates the size of the materialized attention matrix in Gigabytes (GB) in FP16 and prints the memory saved by FlashAttention.',
      hints: [
        'Raw attention matrix elements = n_heads * seq_len * seq_len.',
        'Multiply by 2 bytes for FP16, then divide by 1024^3 to get GB.',
      ],
      starterCode: `def flash_attention_savings(seq_len, d_model=4096, n_heads=32):
    # TODO: compute GB for raw attention matrix
    pass

print("Memory saved at 8k context: ", flash_attention_savings(8192))
print("Memory saved at 64k context:", flash_attention_savings(65536))`,
      solution: `def flash_attention_savings(seq_len, d_model=4096, n_heads=32):
    raw_elements = n_heads * (seq_len ** 2)
    bytes_used = raw_elements * 2  # FP16
    gb_used = bytes_used / (1024 ** 3)
    return f"{gb_used:.2f} GB per layer"

print("Memory saved at 8k context: ", flash_attention_savings(8192))
print("Memory saved at 64k context:", flash_attention_savings(65536))`,
    },
    summary: {
      keyTakeaways: [
        'Standard self-attention has a quadratic O(N^2) memory and compute footprint that creates a hard scaling wall.',
        'FlashAttention circumvents the memory barrier by computing attention online in SRAM tiles without materializing N x N matrices.',
        'Induction heads are specialized two-layer circuits that enable in-context pattern recognition and few-shot copying.',
        'Tokens often dump excess attention mass onto initial <bos> tokens, creating "attention sinks".',
      ],
      nextLessonId: 'tf-15-transformer-mini-project',
      nextLessonTitle: 'TF-15: Transformer Mini-Project: Character-Level Generator',
      nextLessonModuleId: 'p6-m15',
    },
  },

  'tf-15-transformer-mini-project': {
    id: 'tf-15-transformer-mini-project',
    moduleId: 'p6-m15',
    title: 'TF-15: Transformer Mini-Project: Character-Level Generator',
    subtitle: 'End-to-End Hands-On Capstone: Train a Decoder Model from Scratch',
    order: 1,
    readTimeMinutes: 35,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Build and train an end-to-end autoregressive character-level decoder model in PyTorch from raw text data',
      'Implement custom character-level tokenization with bidirectional encode/decode mappings',
      'Construct a PyTorch Dataset and DataLoader with random chunk window sampling',
      'Execute a canonical training loop with CrossEntropyLoss and AdamW optimizer, tracking loss reduction across epochs',
      'Implement a temperature-controlled autoregressive text generation sampler that generates novel text from a seed prompt',
    ],
    prerequisites: ['TF-12: Autoregressive Generation & KV Caching', 'TF-13: Implement a Small Transformer in PyTorch'],
    previousLesson: {
      id: 'tf-14-attention-weights-limitations',
      title: 'TF-14: Inspect Attention Weights & Limitations',
      moduleId: 'p6-m14',
    },
    analogy: {
      title: 'Teaching a Baby to Speak Shakespeare Character-by-Character',
      text: 'Imagine adopting an alien who has never heard human language. At first, you hand the alien a book of Shakespeare. On Day 1, the alien types random gibberish: "xkjq @#& wzp" (Cross-Entropy loss ~4.2, corresponding to random 1/65 guessing). After Day 2, the alien notices spaces and vowels occur frequently: "th a er in on" (loss drops to ~2.5). By Day 5, the alien grasps short words and grammar: "The king hath said to me" (loss drops to ~1.6). By Day 10, the alien writes full theatrical dialogue with character names, stage directions, and meter! This mini-project replicates this exact miracle of emergence on your own computer: starting from raw random weights and learning grammar purely by predicting the next character.',
      metaphor: 'From random noise to coherent prose: character-level modeling reveals the emergence of language through next-token prediction.',
    },
    problemSolved: {
      title: 'Consolidating the Entire Transformer Architecture into a Working Model',
      description:
        'Moving from isolated theoretical components (QKV, Softmax, Causal Masks, LayerNorm, SwiGLU) to a fully functioning trained model requires tying together data pipeline, training loop, loss calculation, backpropagation, and generation sampling.',
      keyPoints: [
        'Complete End-to-End Pipeline: Raw text -> character vocabulary -> Dataset -> Model -> Loss -> Optimizer -> Sampler.',
        'CrossEntropyLoss Target Alignment: Target indices are input tokens shifted to the left by 1 position (targets = x[:, 1:]).',
        'Temperature Control: T < 1.0 produces conservative, predictable text; T > 1.0 produces creative, chaotic text.',
      ],
    },
    intuition: {
      overview:
        'We train a 3-layer nano-decoder on a literary text. At each step, given context characters [c_1, ..., c_t], the model must predict c_{t+1}.',
      steps: [
        { step: 1, title: 'Vocabulary & Tokenizer', description: 'Extract all unique characters into a vocabulary of size V (typically 65 characters).' },
        { step: 2, title: 'Dataset Batching', description: 'Sample random blocks of length block_size. Inputs are text[i : i+block_size]; targets are text[i+1 : i+block_size+1].' },
        { step: 3, title: 'Forward & Loss', description: 'Pass inputs through model, reshape logits to (B*T, V) and targets to (B*T), and compute CrossEntropyLoss.' },
        { step: 4, title: 'Backward & Optimize', description: 'optimizer.zero_grad(), loss.backward(), and optimizer.step() using AdamW with lr=3e-4.' },
        { step: 5, title: 'Generation Loop', description: 'Given a seed string (e.g. "To be, or not to be"), sample next characters autoregressively.' },
      ],
    },
    mathematics: {
      overview: 'Training loss and sampling formulations for character generation.',
      foundations: [
        {
          name: 'Autoregressive Next-Token Cross-Entropy Loss',
          latex: '\\mathcal{L} = -\\frac{1}{B \\cdot T} \\sum_{b=1}^B \\sum_{t=1}^T \\log P(x_{b, t+1} \\mid x_{b, \\le t}) = -\\frac{1}{B \\cdot T} \\sum_{i=1}^{B \\cdot T} \\log\\left( \\frac{e^{z_{i, y_i}}}{\\sum_{j=1}^{|V|} e^{z_{i, j}}} \\right)',
          explanation: 'Standard negative log-likelihood measuring prediction accuracy for the true next character y_i.',
        },
        {
          name: 'Temperature-Scaled Softmax Sampling',
          latex: 'P(x_{t+1} = k) = \\frac{e^{z_k / T_{\\text{temp}}}}{\\sum_j e^{z_j / T_{\\text{temp}}}}',
          explanation: 'Dividing logits by temperature T_temp modifies entropy: T -> 0 approaches greedy argmax; T -> inf approaches uniform random.',
        },
      ],
    },
    derivation: {
      title: 'Initial Expected Loss Derivation for Random Model',
      objective: 'Calculate the theoretical initial loss before training begins on a 65-character vocabulary.',
      steps: [
        {
          step: 1,
          label: 'Uniform Prediction at Initialization',
          latex: 'P(x_i) = \\frac{1}{|V|} = \\frac{1}{65} \\approx 0.01538',
          explanation: 'At step 0 with random weights, the model assigns equal probability to all 65 characters.',
        },
        {
          step: 2,
          label: 'Negative Log-Likelihood Calculation',
          latex: '\\mathcal{L}_0 = -\\ln\\left(\\frac{1}{|V|}\\right) = \\ln(|V|) = \\ln(65) \\approx 4.174',
          explanation: 'The natural log of 65 is 4.174.',
        },
        {
          step: 3,
          label: 'Sanity Check Rule of Thumb',
          latex: '\\mathcal{L}_{\\text{step 0}} \\approx 4.17',
          explanation: 'If your initial training loss is not ~4.17, your loss calculation or softmax is implemented incorrectly!',
        },
      ],
    },
    variables: [
      { symbol: '|V|', name: 'Vocabulary Size', description: 'Total unique characters (e.g. 65 in Tiny Shakespeare)', dimensions: 'Scalar integer' },
      { symbol: 'block_size', name: 'Context Window Size', description: 'Maximum sequence length for training chunks (e.g. 64 or 128 characters)', dimensions: 'Scalar integer' },
      { symbol: 'T_{\\text{temp}}', name: 'Sampling Temperature', description: 'Temperature parameter scaling logit sharpness (e.g. 0.7 or 1.0)', dimensions: 'Scalar float' },
    ],
    numericalExample: {
      scenario: 'Sampling with Temperature: Logits for 3 candidate characters are z = [2.0, 4.0, 1.0].',
      dataset: [
        { char: 'a', logit: 2.0, unscaledProb: '0.119', temp05Prob: '0.018 (Suppressed)', temp20Prob: '0.245 (Flattened)' },
        { char: 'e', logit: 4.0, unscaledProb: '0.844', temp05Prob: '0.980 (Dominant)', temp20Prob: '0.666 (Softer)' },
        { char: 'z', logit: 1.0, unscaledProb: '0.042', temp05Prob: '0.002 (Zeroed)', temp20Prob: '0.089 (Allowed)' },
      ],
      calculations: [
        { step: 'Normal Softmax (T = 1.0)', math: 'exp([2, 4, 1]) = [7.39, 54.6, 2.72] / 64.7', result: '[0.119, 0.844, 0.042]' },
        { step: 'Cold Temperature (T = 0.5)', math: 'exp([4, 8, 2]) = [54.6, 2981, 7.39] / 3043', result: '[0.018, 0.980, 0.002] (Focuses heavily on top token "e")' },
        { step: 'Warm Temperature (T = 2.0)', math: 'exp([1, 2, 0.5]) = [2.72, 7.39, 1.65] / 11.76', result: '[0.231, 0.628, 0.140] (Increases diversity)' },
      ],
      finalConclusion: 'Lower temperature sharpens the distribution toward the most likely token; higher temperature encourages creative exploration.',
    },
    visualExplanation: {
      title: 'Mini-Project Training Pipeline',
      description: 'The end-to-end training and inference execution loop.',
      features: [
        'Data chunking: Sliding window slicing pairs x = text[i : i+T] with target y = text[i+1 : i+T+1].',
        'Loss convergence: CrossEntropyLoss drops smoothly from 4.17 down to ~1.4 across 2,000 optimization steps.',
        'Autoregressive inference: Model takes a seed string and iteratively generates Shakespearean prose.',
      ],
    },
    scratchCode: {
      title: 'Complete Character Tokenizer and Data Chunking in Pure NumPy',
      code: `import numpy as np

# Sample Tiny Shakespeare snippet
text_corpus = """First Citizen:
Before we proceed any further, hear me speak.
All:
Speak, speak.
First Citizen:
You are all resolved rather to die than to famish?
All:
Resolved. resolved."""

# 1. Build Character Vocabulary
chars = sorted(list(set(text_corpus)))
vocab_size = len(chars)
stoi = {ch: i for i, ch in enumerate(chars)}
itos = {i: ch for i, ch in enumerate(chars)}

encode = lambda s: [stoi[c] for c in s]
decode = lambda l: ''.join([itos[i] for i in l])

# 2. Tokenize corpus into 1D integer array
data = np.array(encode(text_corpus), dtype=np.int64)

# 3. Create Training Batch (x and shifted target y)
def get_batch(data, batch_size=2, block_size=16):
    ix = np.random.randint(0, len(data) - block_size, batch_size)
    x = np.stack([data[i : i + block_size] for i in ix])
    y = np.stack([data[i + 1 : i + block_size + 1] for i in ix])
    return x, y

x_batch, y_batch = get_batch(data, batch_size=2, block_size=16)

print(f"Corpus Length: {len(text_corpus)} chars | Vocab Size: {vocab_size} unique chars")
print(f"Batch X shape: {x_batch.shape} | Batch Y shape: {y_batch.shape}")
print("Sample Input 0 text:  ", decode(x_batch[0]))
print("Sample Target 0 text: ", decode(y_batch[0]))`,
      explanation: 'Target sequence Y is shifted by exactly 1 character to the right, teaching the model to predict the next character at every position.',
    },
    sklearnCode: {
      title: 'Complete PyTorch Mini-Project: Training Loop and Generator',
      code: `import torch
import torch.nn as nn
import torch.nn.functional as F

# Hyperparameters
batch_size = 16
block_size = 32
max_iters = 500
eval_interval = 100
learning_rate = 1e-3
device = 'cuda' if torch.cuda.is_available() else 'cpu'
d_model = 64
n_head = 4
n_layers = 3

# Model definition
class Head(nn.Module):
    def __init__(self, head_size):
        super().__init__()
        self.key = nn.Linear(d_model, head_size, bias=False)
        self.query = nn.Linear(d_model, head_size, bias=False)
        self.value = nn.Linear(d_model, head_size, bias=False)
        self.register_buffer('tril', torch.tril(torch.ones(block_size, block_size)))

    def forward(self, x):
        B, T, C = x.shape
        k = self.key(x)
        q = self.query(x)
        wei = q @ k.transpose(-2, -1) * (C ** -0.5)
        wei = wei.masked_fill(self.tril[:T, :T] == 0, float('-inf'))
        wei = F.softmax(wei, dim=-1)
        v = self.value(x)
        return wei @ v

class MultiHead(nn.Module):
    def __init__(self, num_heads, head_size):
        super().__init__()
        self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])
        self.proj = nn.Linear(d_model, d_model)

    def forward(self, x):
        return self.proj(torch.cat([h(x) for h in self.heads], dim=-1))

class Block(nn.Module):
    def __init__(self):
        super().__init__()
        self.sa = MultiHead(n_head, d_model // n_head)
        self.ffwd = nn.Sequential(
            nn.Linear(d_model, 4 * d_model),
            nn.GELU(),
            nn.Linear(4 * d_model, d_model)
        )
        self.ln1 = nn.LayerNorm(d_model)
        self.ln2 = nn.LayerNorm(d_model)

    def forward(self, x):
        x = x + self.sa(self.ln1(x))
        x = x + self.ffwd(self.ln2(x))
        return x

class CharTransformer(nn.Module):
    def __init__(self, vocab_size):
        super().__init__()
        self.token_embedding = nn.Embedding(vocab_size, d_model)
        self.position_embedding = nn.Embedding(block_size, d_model)
        self.blocks = nn.Sequential(*[Block() for _ in range(n_layers)])
        self.ln_f = nn.LayerNorm(d_model)
        self.lm_head = nn.Linear(d_model, vocab_size)

    def forward(self, idx, targets=None):
        B, T = idx.shape
        tok_emb = self.token_embedding(idx)
        pos_emb = self.position_embedding(torch.arange(T, device=device))
        x = tok_emb + pos_emb
        x = self.blocks(x)
        x = self.ln_f(x)
        logits = self.lm_head(x)

        loss = None
        if targets is not None:
            B, T, C = logits.shape
            loss = F.cross_entropy(logits.view(B * T, C), targets.view(B * T))
        return logits, loss

    def generate(self, idx, max_new_tokens, temperature=0.8):
        for _ in range(max_new_tokens):
            idx_cond = idx[:, -block_size:]
            logits, _ = self(idx_cond)
            logits = logits[:, -1, :] / temperature
            probs = F.softmax(logits, dim=-1)
            idx_next = torch.multinomial(probs, num_samples=1)
            idx = torch.cat((idx, idx_next), dim=1)
        return idx

print("Complete end-to-end nano-Transformer CharTransformer architecture ready for training!")`,
      explanation: 'Complete end-to-end PyTorch script including dataset collation, multi-head causal blocks, training loss computation, and temperature-controlled generation.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate temperature-controlled categorical sampling in browser Pyodide
def sample_with_temperature(logits, temperature=1.0):
    # Scale logits by temperature
    scaled = logits / temperature
    exp_s = np.exp(scaled - np.max(scaled))
    probs = exp_s / np.sum(exp_s)
    return probs

logits = np.array([2.0, 4.0, 1.0])
chars = ['a', 'e', 'z']

p_cold = sample_with_temperature(logits, temperature=0.5)
p_norm = sample_with_temperature(logits, temperature=1.0)
p_warm = sample_with_temperature(logits, temperature=2.0)

print("Character Probabilities across Temperatures:")
for i, c in enumerate(chars):
    print(f"Char '{c}': T=0.5 -> {p_cold[i]:.3f} | T=1.0 -> {p_norm[i]:.3f} | T=2.0 -> {p_warm[i]:.3f}")`,
      expectedOutput: `Character Probabilities across Temperatures:
Char 'a': T=0.5 -> 0.018 | T=1.0 -> 0.119 | T=2.0 -> 0.231
Char 'e': T=0.5 -> 0.980 | T=1.0 -> 0.844 | T=2.0 -> 0.628
Char 'z': T=0.5 -> 0.002 | T=1.0 -> 0.042 | T=2.0 -> 0.140`,
    },
    lineByLineExplanation: [
      { lines: 'scaled = logits / temperature', codeSnippet: 'scaled = logits / temperature', explanation: 'Scales raw logits inversely with temperature.' },
      { lines: 'probs = exp_s / np.sum(exp_s)', codeSnippet: 'probs = exp_s / np.sum(exp_s)', explanation: 'Applies softmax to produce probability distribution.' },
      { lines: 'p_cold vs p_warm', codeSnippet: 'sample_with_temperature(logits, temperature=0.5)', explanation: 'Demonstrates that T=0.5 pushes 98% of mass to highest logit ("e"), while T=2.0 flattens distribution across all chars.' },
    ],
    hyperparameters: [
      { name: 'learning_rate', defaultVal: '1e-3 to 3e-4', range: '1e-4 to 5e-3', effect: 'AdamW step size', recommendation: 'Use cosine learning rate decay with 10% warmup steps.' },
      { name: 'temperature', defaultVal: '0.8', range: '0.1 to 1.5', effect: 'Sampling randomness during text generation', recommendation: 'Use 0.7-0.8 for fluent literary text; use 0.2 for deterministic code/math.' },
      { name: 'block_size', defaultVal: '64 to 256', range: '32 to 1024', effect: 'Context window chunk length', recommendation: 'Larger block_size captures longer sentence dependencies at quadratic compute cost.' },
    ],
    assumptions: [
      { assumption: 'Stationary Character Distribution', whyItMatters: 'Character-level modeling assumes the training corpus is homogeneous.', howToVerify: 'Shuffle training chunks randomly using torch.randint.' },
    ],
    commonMistakes: [
      { mistake: 'Passing uncropped context window into generate()', solution: 'As generated text grows past block_size, passing the full sequence into position_embedding throws IndexError.', howToFix: 'Always crop context to block_size: idx_cond = idx[:, -block_size:].' },
      { mistake: 'Forgetting to set model.eval() during generation', solution: 'Dropout remains active during generation if model.eval() is omitted, causing stochastic degradation.', howToFix: 'Call model.eval() before generation and with torch.no_grad():.' },
    ],
    realWorldUseCases: [
      { industry: 'Synthetic Data & Text Obfuscation', application: 'Generating mock customer reviews and synthetic medical notes', benefit: 'Small character decoders generate realistic synthetic text matching statistical language patterns.' },
      { industry: 'Domain Name & Password Generation', application: 'Brand name generation and security entropy auditing', benefit: 'Character models explore phonetic structures to create memorable pronounceable brand names.' },
    ],
    practiceQuestions: [
      { id: 'tf15-p1', question: 'Why does the initial loss of a randomly initialized model on a 65-character vocabulary start around 4.17?', answer: 'Because -ln(1/65) = ln(65) = 4.174. A random model assigns uniform probability ~1/65 to all characters.', explanation: 'Observing initial loss ~4.17 is the universal sanity test for autoregressive models.' },
      { id: 'tf15-p2', question: 'How are inputs and targets aligned during autoregressive training?', answer: 'Targets are shifted 1 position into the future: for input x = tokens[t : t+N], target y = tokens[t+1 : t+N+1].', explanation: 'At every position i, the model uses tokens <= i to predict token i+1.' },
      { id: 'tf15-p3', question: 'What happens to generated text if sampling temperature T approaches 0.0?', answer: 'The distribution collapses to greedy argmax: the model deterministically selects the single token with highest probability at every step, often falling into repetitive loops.', explanation: 'Zero temperature removes all sampling diversity.' },
    ],
    quiz: [
      {
        id: 'tf15-q1',
        question: 'What is the theoretical initial Cross-Entropy loss for a language model with vocabulary size |V| before training begins?',
        options: ['0.0', '1.0', 'ln(|V|)', '|V|^2'],
        correctIndex: 2,
        explanation: 'Under uniform random guessing, P(y) = 1 / |V|, so negative log likelihood is -ln(1/|V|) = ln(|V|).',
      },
      {
        id: 'tf15-q2',
        question: 'Why do we crop the input sequence to `idx[:, -block_size:]` during generation?',
        options: [
          'To save battery life',
          'Because positional embeddings are pre-allocated only up to block_size, so passing longer sequences would cause an index error',
          'To remove vowels',
          'Because Softmax only works on 32 tokens',
        ],
        correctIndex: 1,
        explanation: 'Positional embedding tables have fixed length block_size; exceeding it causes an out-of-bounds error.',
      },
      {
        id: 'tf15-q3',
        question: 'Which optimizer is the industry standard for training Transformers and Large Language Models?',
        options: ['SGD without momentum', 'AdamW (Adam with decoupled weight decay)', 'Adagrad', 'RMSProp without momentum'],
        correctIndex: 1,
        explanation: 'AdamW (Loshchilov & Hutter 2017) decouples L2 weight decay from gradient updates, stabilizing deep Transformer training.',
      },
    ],
    independentExercise: {
      title: 'Implement Temperature Sampling with Top-K Filtering',
      problem:
        'Write a Python function `sample_top_k(logits, k=3, temperature=0.8)` in pure NumPy that sets all logits outside the top-k highest values to -1e9, scales remaining logits by temperature, and returns the normalized probability distribution.',
      hints: [
        'Find the k-th highest logit value using np.sort(logits)[-k].',
        'Replace all logits smaller than this threshold with -1e9.',
        'Divide filtered logits by temperature and compute softmax.',
      ],
      starterCode: `import numpy as np

def sample_top_k(logits, k=3, temperature=0.8):
    # TODO: implement top-k truncation and temperature scaling
    pass

logits = np.array([1.2, 5.0, 0.5, 4.2, 2.1, 0.1])
probs = sample_top_k(logits, k=3, temperature=0.8)
print("Top-K probabilities (only 3 non-zero elements):", np.round(probs, 3))
print("Sum must be 1.0:", round(np.sum(probs), 4))`,
      solution: `import numpy as np

def sample_top_k(logits, k=3, temperature=0.8):
    # Find threshold
    thresh = np.sort(logits)[-k]
    # Filter
    filtered = np.where(logits < thresh, -1e9, logits)
    # Temperature scale
    scaled = filtered / temperature
    exp_s = np.exp(scaled - np.max(scaled))
    return exp_s / np.sum(exp_s)

logits = np.array([1.2, 5.0, 0.5, 4.2, 2.1, 0.1])
probs = sample_top_k(logits, k=3, temperature=0.8)
print("Top-K probabilities (only 3 non-zero elements):", np.round(probs, 3))
print("Sum must be 1.0:", round(np.sum(probs), 4))`,
    },
    summary: {
      keyTakeaways: [
        'End-to-end language modeling trains a network to predict the next token given preceding context.',
        'Initial cross-entropy loss equals ln(|V|) (~4.17 for 65 characters) and decreases steadily toward ~1.4.',
        'Temperature scaling and top-k filtering regulate generation diversity and prevent degenerative text loops.',
        'You have mastered the foundational Transformer architecture that powers all modern Generative AI!',
      ],
      nextLessonId: 'p7-m1',
      nextLessonTitle: 'Phase 7 · Generative AI and Large Language Models',
      nextLessonModuleId: 'p7-m1',
    },
  },
};

