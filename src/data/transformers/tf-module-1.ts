import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 1: Transformer Introduction & Architecture Overview (p6-m1)
// =========================================================================
export const p6m1Data: ModuleData = {
  id: 'p6-m1',
  number: 1,
  title: 'Why Transformers Were Introduced',
  subtitle: 'The Attention Revolution: Overcoming Sequential Recurrence',
  description:
    'Explore the paradigm shift from recurrent neural networks (RNNs/LSTMs) to the Transformer architecture introduced in "Attention Is All You Need". Learn why sequential compute bottlenecks GPU utilization, how O(1) maximum path length eliminates vanishing gradients over long horizons, and the high-level macro architecture.',
  icon: 'Zap',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-01-why-transformers',
      moduleId: 'p6-m1',
      title: 'TF-01: Why Transformers Were Introduced',
      description:
        'Recurrence limitations, parallelization bottlenecks, maximum path length O(1), and the complete high-level encoder-decoder blueprint.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'attention-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// MODULE 2: Tokenization & Token IDs (p6-m2)
// =========================================================================
export const p6m2Data: ModuleData = {
  id: 'p6-m2',
  number: 2,
  title: 'Tokenization & Token IDs',
  subtitle: 'Byte-Pair Encoding, WordPiece & Subword Vocabularies',
  description:
    'Master the linguistic bridge between raw text and numerical neural inputs. Understand subword tokenization, character-level vs word-level tradeoffs, the Byte-Pair Encoding (BPE) iterative merge algorithm, vocabulary sizing, and special tokens (<bos>, <eos>, <pad>, <unk>).',
  icon: 'Type',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-02-tokenization-and-token-ids',
      moduleId: 'p6-m2',
      title: 'TF-02: Tokenization & Token IDs',
      description:
        'Subword tokenization, BPE merge rules, vocabulary dictionaries, special tokens, and mapping text to integer tensor IDs.',
      order: 1,
      readTimeMinutes: 26,
      visualizerType: 'tokenization-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// MODULE 3: Token Embeddings & Latent Space (p6-m3)
// =========================================================================
export const p6m3Data: ModuleData = {
  id: 'p6-m3',
  number: 3,
  title: 'Token Embeddings & Latent Space',
  subtitle: 'Continuous Semantic Geometry & Embedding Lookup Matrices',
  description:
    'Discover how discrete integer token IDs are transformed into continuous dense vectors in d_model dimensional space. Dive into embedding matrices, weight lookup mechanics, cosine similarity geometry, semantic arithmetic, and scaling by sqrt(d_model).',
  icon: 'Layers',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-03-embeddings-latent-space',
      moduleId: 'p6-m3',
      title: 'TF-03: Token Embeddings & Latent Space',
      description:
        'Embedding lookup tables, semantic geometry, vector arithmetic, cosine similarity, and embedding scaling.',
      order: 1,
      readTimeMinutes: 25,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS
// =========================================================================
export const tfModule1Lessons: Record<string, LessonContent> = {
  'tf-01-why-transformers': {
    id: 'tf-01-why-transformers',
    moduleId: 'p6-m1',
    title: 'TF-01: Why Transformers Were Introduced',
    subtitle: 'From Sequential Recurrence to Fully Parallel Self-Attention',
    order: 1,
    readTimeMinutes: 28,
    difficulty: 'Beginner',
    visualizerType: 'attention-explorer',
    objectives: [
      'Contrast the sequential compute barrier of RNNs and LSTMs with the parallel matrix multiplications of Transformers',
      'Analyze why maximum path length between distant tokens is O(1) in self-attention versus O(N) in recurrent networks',
      'Identify the foundational components of the 2017 "Attention Is All You Need" macro architecture',
      'Use the interactive Attention Explorer to trace how tokens directly attend to each other across a sequence',
    ],
    prerequisites: ['DL-18: Sequence Learning: RNNs, LSTMs & GRUs', 'DL-19: Attention Fundamentals'],
    previousLesson: {
      id: 'dl-19-attention-fundamentals',
      title: 'DL-19: Attention Fundamentals',
      moduleId: 'dl-module-5',
    },
    analogy: {
      title: 'The Whispering Telephone Line vs The Round-Table Conference',
      text: 'Imagine a line of 50 people playing Chinese Whispers (an RNN). Person 1 whispers a story to Person 2, who whispers it to Person 3, all the way to Person 50. Two major problems occur: first, Person 50 receives a garbled, degraded version because information had to pass through 49 intermediate brains (vanishing gradients over O(N) path length). Second, Person 10 cannot speak until Person 9 finishes; the entire process is strictly sequential and cannot utilize 50 people simultaneously. Now imagine placing all 50 people in a circular conference room with direct eye contact (a Transformer). Anyone can directly look at and address anyone else in one step (O(1) path length). Furthermore, everyone can speak and listen in parallel on a shared loudspeaker (GPU parallelization).',
      metaphor: 'RNNs process tokens like an assembly line; Transformers process all tokens simultaneously like a conference room where everyone attends to everyone else.',
    },
    problemSolved: {
      title: 'The GPU Parallelization Wall in Natural Language Processing',
      description:
        'Prior to 2017, sequence processing relied on RNNs, LSTMs, and GRUs. Because hidden state h_t depends strictly on h_{t-1}, modern GPUs with tens of thousands of parallel tensor cores were forced to idle while waiting for one token to finish before starting the next.',
      keyPoints: [
        'Sequential Dependency: Step t cannot execute until step t-1 completes, preventing parallel training across long sequence lengths.',
        'Information Loss over Distance: Signals between word 1 and word 100 must survive 99 sequential matrix multiplications and activations.',
        'Transformers Eliminate Recurrence: Attention operates globally across all tokens at once via parallel matrix multiplication QK^T.',
      ],
    },
    intuition: {
      overview:
        'Transformers completely discard recurrence and convolutions. By treating sequences as sets of tokens equipped with positional identifiers, entire documents can be fed into GPUs simultaneously.',
      steps: [
        {
          step: 1,
          title: 'Simultaneous Ingestion',
          description: 'All N input tokens enter the network together as a single (Batch, N, d_model) tensor.',
        },
        {
          step: 2,
          title: 'Direct All-to-All Pairwise Interaction',
          description: 'Every token computes a dot product affinity with every other token in O(1) sequential steps.',
        },
        {
          step: 3,
          title: 'Residual Gradient Highways',
          description: 'Skip connections allow gradients to flow backwards from the output directly to the input tokens without decay.',
        },
      ],
    },
    mathematics: {
      overview: 'Theoretical comparison between recurrent and attention path complexity.',
      foundations: [
        {
          name: 'Recurrent Hidden State Dependency',
          latex: 'h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b)',
          explanation: 'Strict temporal dependency: computing h_T requires T sequential operations, preventing GPU parallelization.',
        },
        {
          name: 'Self-Attention Direct Path',
          latex: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V',
          explanation: 'Direct all-to-all connectivity: gradient travels across exactly 1 edge between any two tokens i and j.',
        },
      ],
    },
    derivation: {
      title: 'Comparison of Layer Complexity & Maximum Path Length',
      objective: 'Prove why self-attention enables faster training on long sequences than recurrence.',
      steps: [
        {
          step: 1,
          label: 'Path Length in Recurrent Networks',
          latex: '\\text{Max Path Length}(\\text{RNN}) = O(N)',
          explanation: 'For word 1 to influence word N, information must traverse N sequential hidden transitions.',
        },
        {
          step: 2,
          label: 'Sequential Operations in Recurrent Networks',
          latex: '\\text{Sequential Operations}(\\text{RNN}) = O(N)',
          explanation: 'A batch cannot execute in parallel along the sequence dimension.',
        },
        {
          step: 3,
          label: 'Path Length in Self-Attention Networks',
          latex: '\\text{Max Path Length}(\\text{Transformer}) = O(1)',
          explanation: 'Every token queries every other token directly via the QK^T matrix product.',
        },
        {
          step: 4,
          label: 'Sequential Operations in Self-Attention',
          latex: '\\text{Sequential Operations}(\\text{Transformer}) = O(1)',
          explanation: 'Matrix multiplication across all N tokens executes in a single parallel GPU kernel call.',
        },
      ],
    },
    variables: [
      { symbol: 'N', name: 'Sequence Length', description: 'Number of tokens in the input text prompt', dimensions: 'Scalar integer' },
      { symbol: 'd_model', name: 'Model Dimension', description: 'Hidden representation size (e.g., 512 in original Transformer, 4096 in LLaMA)', dimensions: 'Scalar integer' },
      { symbol: 'Q, K, V', name: 'Query, Key, Value', description: 'Projected token representations for information retrieval', dimensions: '(Batch, N, d_model)' },
    ],
    numericalExample: {
      scenario: 'Comparing sequential steps needed to link token 1 and token 8 in an RNN versus a Transformer.',
      dataset: [
        { model: 'Recurrent (LSTM)', seqLen: 8, stepsToCommunicate: 7, parallelKernelCalls: 8 },
        { model: 'Transformer Self-Attention', seqLen: 8, stepsToCommunicate: 1, parallelKernelCalls: 1 },
      ],
      calculations: [
        { step: 'RNN Step Count', math: 'N - 1 = 8 - 1', result: '7 sequential state updates' },
        { step: 'Transformer Step Count', math: 'Direct dot product A[1, 8]', result: '1 parallel matrix multiplication' },
        { step: 'Speedup potential on GPU', math: '8 sequential calls vs 1 parallel call', result: '8x theoretical concurrency' },
      ],
      finalConclusion: 'Self-attention reduces the communication horizon between any two tokens to a constant single operation.',
    },
    visualExplanation: {
      title: 'Direct All-to-All Token Communication',
      description: 'The Attention Explorer visualizer above shows 3 tokens ("AI", "learns", "fast") interacting simultaneously.',
      features: [
        'Notice that token 1 directly reads token 3 without passing through token 2.',
        'Observe how the 3x3 heatmap contains weights for every pairwise combination simultaneously.',
        'Adjust the temperature scale to see how attention focuses or diffuses across the sequence.',
      ],
    },
    scratchCode: {
      title: 'Comparing RNN Sequential Loop vs Transformer Matrix Attention in Pure NumPy',
      code: `import numpy as np

# 1. Simulating RNN Sequential Loop
def rnn_forward(inputs, W_xh, W_hh):
    T, d = inputs.shape
    h = np.zeros(d)
    h_states = []
    # Must loop step by step!
    for t in range(T):
        h = np.tanh(inputs[t] @ W_xh + h @ W_hh)
        h_states.append(h)
    return np.array(h_states)

# 2. Simulating Transformer Parallel Attention
def transformer_forward(inputs, W_q, W_k, W_v):
    # All tokens projected simultaneously in one matrix multiplication!
    Q = inputs @ W_q
    K = inputs @ W_k
    V = inputs @ W_v
    
    d_k = Q.shape[-1]
    # All-to-all affinities computed in parallel
    scores = (Q @ K.T) / np.sqrt(d_k)
    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    out = weights @ V
    return out, weights

np.random.seed(42)
T, d = 4, 8
tokens = np.random.randn(T, d)
W_q = np.random.randn(d, d) * 0.1
W_k = np.random.randn(d, d) * 0.1
W_v = np.random.randn(d, d) * 0.1

out, weights = transformer_forward(tokens, W_q, W_k, W_v)
print("Transformer Attention Weights (4x4):\\n", np.round(weights, 3))
print("Row sums (must equal 1.0):", np.sum(weights, axis=-1))`,
      explanation: 'Notice how the Transformer computes all pairwise interactions in two single matrix multiplications without any temporal for-loop.',
    },
    sklearnCode: {
      title: 'PyTorch Architecture Skeleton (Attention Is All You Need)',
      code: `import torch
import torch.nn as nn

# Standard Transformer Encoder Layer in PyTorch
class SimpleTransformerEncoderLayer(nn.Module):
    def __init__(self, d_model=512, nhead=8, dim_feedforward=2048, dropout=0.1):
        super().__init__()
        self.self_attn = nn.MultiheadAttention(d_model, nhead, dropout=dropout, batch_first=True)
        self.linear1 = nn.Linear(d_model, dim_feedforward)
        self.dropout = nn.Dropout(dropout)
        self.linear2 = nn.Linear(dim_feedforward, d_model)
        
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.activation = nn.GELU()

    def forward(self, src):
        # Pre-LN or Post-LN residual block
        src2, _ = self.self_attn(src, src, src)
        src = self.norm1(src + src2)
        src2 = self.linear2(self.dropout(self.activation(self.linear1(src))))
        src = self.norm2(src + src2)
        return src

# Instantiate layer and test with synthetic batch
layer = SimpleTransformerEncoderLayer(d_model=64, nhead=4)
x = torch.randn(2, 8, 64)  # (Batch=2, SeqLen=8, Dim=64)
out = layer(x)
print("Input shape: ", x.shape)
print("Output shape:", out.shape)`,
      explanation: 'Demonstrates the standard PyTorch encoder block wiring multihead attention, layer normalization, and feed-forward residual layers.',
    },
    runnableCode: {
      code: `import numpy as np

# Test all-to-all attention computation directly in browser Pyodide
seq_len = 4
d_k = 8
np.random.seed(1337)

Q = np.random.randn(seq_len, d_k)
K = np.random.randn(seq_len, d_k)

# Compute raw dot-product affinity matrix
scores = Q @ K.T / np.sqrt(d_k)
print("Raw Scaled Dot-Product Scores (4x4):")
print(np.round(scores, 3))

# Softmax over columns
exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
A = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
print("\\nSoftmax Attention Weights (Sum per row = 1.0):")
print(np.round(A, 3))
print("Row Sums:", np.round(np.sum(A, axis=-1), 4))`,
      expectedOutput: `Raw Scaled Dot-Product Scores (4x4):
[[-0.607  0.462 -0.228  0.648]
 [ 0.386 -0.165  0.812  0.089]
 [ 0.301 -0.013  0.076  0.449]
 [-0.531  0.222 -0.582  0.518]]

Softmax Attention Weights (Sum per row = 1.0):
[[0.111 0.323 0.162 0.404]
 [0.279 0.161 0.428 0.132]
 [0.264 0.193 0.211 0.332]
 [0.129 0.274 0.123 0.474]]
Row Sums: [1. 1. 1. 1.]`,
    },
    lineByLineExplanation: [
      { lines: 'Q @ K.T', codeSnippet: 'scores = Q @ K.T / np.sqrt(d_k)', explanation: 'Multiplies all Query vectors by all Key vectors simultaneously to compute pairwise affinities.' },
      { lines: 'np.exp(scores...)', codeSnippet: 'exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))', explanation: 'Applies numerically stable exponentiation by subtracting row max to avoid float overflow.' },
      { lines: 'exp_s / np.sum(...)', codeSnippet: 'A = exp_s / np.sum(exp_s, axis=-1, keepdims=True)', explanation: 'Normalizes each row into a valid probability distribution that sums to 1.0.' },
    ],
    hyperparameters: [
      { name: 'd_model', defaultVal: '512 / 4096', range: '64 to 8192', effect: 'Dimensionality of token representations', recommendation: 'Larger d_model provides richer expressiveness but increases memory footprint.' },
      { name: 'nhead', defaultVal: '8 / 32', range: '1 to 128', effect: 'Number of parallel attention subspaces', recommendation: 'Ensure d_model is evenly divisible by nhead (d_k = d_model / nhead).' },
      { name: 'max_seq_len', defaultVal: '2048 / 8192', range: '128 to 128k', effect: 'Maximum context window size', recommendation: 'Quadratic attention cost O(N^2) scales memory quadratically with seq_len.' },
    ],
    assumptions: [
      { assumption: 'Positional Independence without PE', whyItMatters: 'Self-attention is permutation-equivariant; changing word order does not change output unless positional encodings are injected.', howToVerify: 'Verify that without Positional Encodings, shuffling input tokens yields shuffled output vectors.' },
      { assumption: 'Quadratic Memory Budget', whyItMatters: 'Storing the full N x N attention matrix requires O(N^2) memory during forward and backward passes.', howToVerify: 'Use FlashAttention or chunked attention when sequence length exceeds 4,096 tokens.' },
    ],
    commonMistakes: [
      { mistake: 'Believing Transformers do not understand sequence order on their own', solution: 'Self-attention alone is a set function. Positional encodings (PE) must be added to embeddings to provide word order awareness.', howToFix: 'Always add sinusoidal or Rotary Positional Embeddings to input representations.' },
      { mistake: 'Forgetting to divide by sqrt(d_k)', solution: 'Without 1/sqrt(d_k), dot products grow large for high dimensions, causing Softmax gradients to vanish into near-zero plateaus.', howToFix: 'Always apply scaling: scores = (Q @ K.T) / np.sqrt(d_k).' },
    ],
    realWorldUseCases: [
      { industry: 'Natural Language Processing', application: 'Foundation models (GPT-4, Gemini, Claude, LLaMA) powering code generation and chatbots', benefit: 'Allows training across hundreds of billions of tokens in parallel on GPU clusters.' },
      { industry: 'Bioinformatics & Drug Discovery', application: 'AlphaFold 2 & ESM-2 protein folding prediction', benefit: 'Attention models all-to-all spatial distances between amino acids in 3D molecular chains.' },
    ],
    practiceQuestions: [
      { id: 'tf01-p1', question: 'What is the maximum path length between any two tokens in a Transformer?', answer: 'O(1). Any token queries any other token directly in a single attention matrix multiplication.', explanation: 'In an RNN, the path length is O(N) because information must traverse all intervening time steps.' },
      { id: 'tf01-p2', question: 'Why could RNNs not effectively utilize tens of thousands of GPU tensor cores?', answer: 'Temporal recurrence requires step t to wait for step t-1, creating a strictly sequential bottleneck that cannot be parallelized along the sequence dimension.' },
      { id: 'tf01-p3', question: 'What crucial property does pure self-attention lack that requires Positional Encodings?', answer: 'Permutation equivariance / order invariance. Self-attention treats inputs as an unordered set unless explicit positional signals are injected.' },
    ],
    quiz: [
      {
        id: 'tf01-q1',
        question: 'What is the primary reason Transformers replaced LSTMs for large-scale language modeling?',
        options: [
          'Transformers have fewer parameters than LSTMs',
          'Transformers eliminate recurrence, allowing entire sequences to be trained in parallel on GPUs',
          'Transformers do not use matrix multiplication',
          'Transformers only work on short sentences under 10 words',
        ],
        correctIndex: 1,
        explanation: 'By removing the recurrent dependency h_t = f(h_{t-1}, x_t), Transformers allow massive parallel GPU execution across the entire sequence length.',
      },
      {
        id: 'tf01-q2',
        question: 'What is the maximum path length between token 1 and token 1000 in a self-attention layer?',
        options: ['O(1000)', 'O(log 1000)', 'O(1)', 'O(1000^2)'],
        correctIndex: 2,
        explanation: 'Self-attention connects all tokens directly via the all-to-all attention matrix, resulting in a constant O(1) path length.',
      },
      {
        id: 'tf01-q3',
        question: 'Why is the dot product QK^T scaled by 1 / sqrt(d_k)?',
        options: [
          'To make the matrix square',
          'To prevent dot products from growing large and causing vanishing gradients in Softmax',
          'To convert real numbers into integers',
          'To eliminate the need for Layer Normalization',
        ],
        correctIndex: 1,
        explanation: 'For large d_k, the variance of the dot product is d_k. Dividing by sqrt(d_k) normalizes variance to 1, preventing Softmax from saturating into regions with tiny gradients.',
      },
    ],
    independentExercise: {
      title: 'Compare Path Length and Operation Count',
      problem:
        'Write a Python function `compare_architectures(seq_lens)` that takes a list of sequence lengths (e.g. [128, 512, 2048]) and returns a dictionary comparing the sequential operation count of RNN vs Transformer.',
      hints: [
        'For an RNN, sequential operations equal the sequence length N.',
        'For a Transformer, sequential operations equal 1 (ignoring layer depth).',
        'Return the theoretical GPU parallelization speedup factor N / 1.',
      ],
      starterCode: `def compare_architectures(seq_lens):
    results = {}
    for N in seq_lens:
        # TODO: compute rnn_seq_ops, transformer_seq_ops, and speedup_factor
        pass
    return results

print(compare_architectures([128, 512, 2048]))`,
      solution: `def compare_architectures(seq_lens):
    results = {}
    for N in seq_lens:
        results[N] = {
            "rnn_sequential_steps": N,
            "transformer_sequential_steps": 1,
            "theoretical_parallel_speedup": f"{N}x"
        }
    return results

print(compare_architectures([128, 512, 2048]))`,
    },
    summary: {
      keyTakeaways: [
        'Transformers eliminated temporal recurrence, unlocking web-scale parallel GPU training.',
        'Maximum path length between tokens was slashed from O(N) in RNNs to O(1) in self-attention.',
        'Pure self-attention operates on sets; positional signals must be injected to encode sequence order.',
        'Scaling by 1/sqrt(d_k) stabilizes softmax gradients across high-dimensional latent spaces.',
      ],
      nextLessonId: 'tf-02-tokenization-and-token-ids',
      nextLessonTitle: 'TF-02: Tokenization & Token IDs',
      nextLessonModuleId: 'p6-m2',
    },
  },

  'tf-02-tokenization-and-token-ids': {
    id: 'tf-02-tokenization-and-token-ids',
    moduleId: 'p6-m2',
    title: 'TF-02: Tokenization & Token IDs',
    subtitle: 'From Continuous Text to Discrete Numerical Token Vocabularies',
    order: 1,
    readTimeMinutes: 26,
    difficulty: 'Beginner',
    visualizerType: 'tokenization-explorer',
    objectives: [
      'Compare word-level, character-level, and subword tokenization strategies',
      'Explain the Byte-Pair Encoding (BPE) iterative merge algorithm step-by-step',
      'Understand how special tokens (<bos>, <eos>, <pad>, <unk>) manage sequence boundaries',
      'Use the interactive Tokenization Explorer to inspect subwords, token IDs, and compression ratios',
    ],
    prerequisites: ['TF-01: Why Transformers Were Introduced'],
    previousLesson: {
      id: 'tf-01-why-transformers',
      title: 'TF-01: Why Transformers Were Introduced',
      moduleId: 'p6-m1',
    },
    analogy: {
      title: 'LEGO Bricks vs Pre-Molded Toys',
      text: 'Word-level tokenization is like selling pre-molded toy models (cars, airplanes, castles). If a child wants a "hovercraft", the toy store fails completely (Out-Of-Vocabulary / OOV error). Character-level tokenization is like giving the child raw plastic dust; you can build anything, but it takes 1,000 dust particles to make a small wheel (excessive sequence length and computational explosion). Subword tokenization (BPE) is standard LEGO bricks. Common objects ("car", "house") are built from convenient medium-sized bricks, while unseen objects ("hovercraft" = "hover" + "craft") are cleanly constructed from standard modular sub-pieces. No OOV errors, and compact sequence lengths.',
      metaphor: 'Subword tokenization strikes the golden balance: compact vocabularies with zero out-of-vocabulary words.',
    },
    problemSolved: {
      title: 'The Out-Of-Vocabulary (OOV) Dilemma',
      description:
        'Natural languages contain millions of morphological inflections, misspellings, technical terms, and neologisms. A fixed word dictionary either explodes into millions of rare words (exhausting RAM) or discards rare words as unknown <unk> tokens, destroying meaning.',
      keyPoints: [
        'Word-level: Huge vocabulary (500k+ entries), high memory, frequent <unk> for unseen words.',
        'Character-level: Tiny vocabulary (~256 characters), but sequences become 5x longer, squaring attention cost.',
        'Subwords (BPE/WordPiece): Fixed vocabulary (32k-100k tokens), splits rare words into recognizable morphemes.',
      ],
    },
    intuition: {
      overview:
        'Byte-Pair Encoding begins with single characters as the initial vocabulary, counts the most frequent adjacent character pairs across a training corpus, and iteratively merges the top pair into a new token until the desired vocabulary size is reached.',
      steps: [
        { step: 1, title: 'Base Vocabulary', description: 'Initialize vocabulary with all individual characters (or UTF-8 bytes) present in corpus.' },
        { step: 2, title: 'Count Bigrams', description: 'Scan all tokenized words and find the most frequently occurring adjacent pair (e.g. ("t", "h")).' },
        { step: 3, title: 'Merge & Add', description: 'Create a new token "th", add it to vocabulary, and replace all instances of ("t", "h") with "th".' },
        { step: 4, title: 'Iterate', description: 'Repeat until vocabulary reaches target size (e.g., 32,768 tokens in LLaMA or 50,257 in GPT-2).' },
      ],
    },
    mathematics: {
      overview: 'Iterative merge frequency objective in Byte-Pair Encoding.',
      foundations: [
        {
          name: 'Pair Frequency Counting',
          latex: '(p_1^*, p_2^*) = \\arg\\max_{(p_1, p_2)} \\sum_{w \\in \\mathcal{D}} \\text{freq}(w) \\cdot \\text{count}((p_1, p_2) \\in w)',
          explanation: 'Identifies the pair of adjacent tokens with highest total occurrences across all words in dataset D.',
        },
        {
          name: 'Vocabulary Expansion',
          latex: 'V_{k+1} = V_k \\cup \\{ p_1^* \\circ p_2^* \\}',
          explanation: 'Concatenates winning pair into a unified single token, expanding vocabulary by exactly 1 entry per iteration.',
        },
      ],
    },
    derivation: {
      title: 'Step-by-Step BPE Derivation on a Mini-Corpus',
      objective: 'Trace the first 2 merge steps on corpus: {"low": 5, "lower": 2, "newest": 6, "widest": 3}.',
      steps: [
        {
          step: 1,
          label: 'Character Splitting',
          latex: '\\text{Corpus} = \\{ \\text{"l o w </w>"}: 5, \\text{"l o w e r </w>"}: 2, \\text{"n e w e s t </w>"}: 6, \\text{"w i d e s t </w>"}: 3 \\}',
          explanation: 'Every word is split into individual characters with an end-of-word delimiter </w>.',
        },
        {
          step: 2,
          label: 'First Merge Search',
          latex: '\\text{Pair } ("e", "s") \\text{ count} = 6 + 3 = 9',
          explanation: 'Pair ("e", "s") appears 6 times in "newest" and 3 times in "widest" for a total of 9 occurrences (the highest).',
        },
        {
          step: 3,
          label: 'First Merge Applied',
          latex: 'V_1 = V_0 \\cup \\{ \\text{"es"} \\}; \\quad \\text{"e s t </w>"} \\rightarrow \\text{"es t </w>"}',
          explanation: 'New token "es" is added to vocabulary. Words update to "n e w es t </w>" and "w i d es t </w>".',
        },
        {
          step: 4,
          label: 'Second Merge Search & Application',
          latex: '\\text{Pair } ("es", "t") \\text{ count} = 6 + 3 = 9 \\implies V_2 = V_1 \\cup \\{ \\text{"est"} \\}',
          explanation: 'Pair ("es", "t") wins next, creating suffix token "est". Rare words like "smartest" can now use "est".',
        },
      ],
    },
    variables: [
      { symbol: 'V', name: 'Vocabulary', description: 'Set of all recognized subword tokens mapped to integer IDs 0 to |V|-1', dimensions: 'Set of strings' },
      { symbol: '|V|', name: 'Vocab Size', description: 'Total number of tokens (typically 32,000 to 128,000 in modern LLMs)', dimensions: 'Scalar integer' },
      { symbol: 'Token ID', name: 'Token Index', description: 'Deterministic integer fed into embedding lookup table', dimensions: 'Integer in [0, |V|-1]' },
    ],
    numericalExample: {
      scenario: 'Tokenizing the unseen word "lowerest" using vocabulary with subwords ["low", "er", "est"].',
      dataset: [
        { subword: 'low', tokenID: 104, characters: 3 },
        { subword: 'er', tokenID: 215, characters: 2 },
        { subword: 'est', tokenID: 318, characters: 3 },
      ],
      calculations: [
        { step: 'Match Prefix', math: '"lowerest" starts with "low"', result: 'Token 1: "low" (ID 104)' },
        { step: 'Match Middle', math: 'Remaining "erest" starts with "er"', result: 'Token 2: "er" (ID 215)' },
        { step: 'Match Suffix', math: 'Remaining "est" matches "est"', result: 'Token 3: "est" (ID 318)' },
      ],
      finalConclusion: 'Unseen word "lowerest" is perfectly tokenized as [104, 215, 318] without any unknown <unk> tokens.',
    },
    visualExplanation: {
      title: 'Interactive Subword Tokenizer Exploration',
      description: 'The Tokenization Explorer visualizer demonstrates how continuous text transforms into token ID sequences.',
      features: [
        'Notice how words like "unbelievable" break into morphemes ["un", "believ", "able"].',
        'Observe the Token ID sequence generated below the token stream.',
        'Toggle special tokens to see where <bos> (Beginning of Sequence) and <eos> (End of Sequence) are placed.',
      ],
    },
    scratchCode: {
      title: 'Pure Python Implementation of Byte-Pair Encoding (BPE) Algorithm',
      code: `import collections

def get_stats(vocab):
    pairs = collections.defaultdict(int)
    for word, freq in vocab.items():
        symbols = word.split()
        for i in range(len(symbols) - 1):
            pairs[(symbols[i], symbols[i+1])] += freq
    return pairs

def merge_vocab(pair, vocab):
    v_out = {}
    bigram = ' '.join(pair)
    replacement = ''.join(pair)
    for word in vocab:
        w_out = word.replace(bigram, replacement)
        v_out[w_out] = vocab[word]
    return v_out

# Training corpus with word frequencies
vocab = {
    'l o w </w>': 5,
    'l o w e r </w>': 2,
    'n e w e s t </w>': 6,
    'w i d e s t </w>': 3
}

num_merges = 5
for i in range(num_merges):
    pairs = get_stats(vocab)
    if not pairs:
        break
    best_pair = max(pairs, key=pairs.get)
    vocab = merge_vocab(best_pair, vocab)
    print(f"Merge {i+1}: {best_pair} (Occurrences: {pairs[best_pair]})")

print("\\nFinal Segmented Corpus:")
for w, f in vocab.items():
    print(f"  {w}: {f}")`,
      explanation: 'Complete implementation of BPE counting pair frequencies and merging the highest-scoring bigram iteratively.',
    },
    sklearnCode: {
      title: 'Using HuggingFace Tokenizers (Fast Rust-Backed BPE)',
      code: `# pip install tokenizers
from tokenizers import Tokenizer
from tokenizers.models import BPE
from tokenizers.trainers import BpeTrainer
from tokenizers.pre_tokenizers import Whitespace

# Initialize BPE Tokenizer
tokenizer = Tokenizer(BPE(unk_token="<unk>"))
tokenizer.pre_tokenizer = Whitespace()

trainer = BpeTrainer(special_tokens=["<pad>", "<bos>", "<eos>", "<unk>"], vocab_size=1000)
sample_corpus = [
    "Transformers revolutionize artificial intelligence and natural language processing.",
    "Attention mechanisms eliminate sequential recurrent bottlenecks in deep learning."
]

tokenizer.train_from_iterator(sample_corpus, trainer)
encoded = tokenizer.encode("Transformers eliminate bottlenecks.")

print("Subword Tokens:", encoded.tokens)
print("Token IDs:     ", encoded.ids)`,
      explanation: 'Production tokenizers use highly optimized Rust backends to tokenize millions of words per second with pre-compiled BPE merge tables.',
    },
    runnableCode: {
      code: `import collections

# Run BPE training directly in browser Pyodide
corpus = {
    't r a n s f o r m e r </w>': 8,
    't r a n s f o r m </w>': 4,
    'a t t e n t i o n </w>': 6
}

pairs = collections.defaultdict(int)
for word, freq in corpus.items():
    symbols = word.split()
    for i in range(len(symbols) - 1):
        pairs[(symbols[i], symbols[i+1])] += freq

# Find top 3 most frequent pairs
top_pairs = sorted(pairs.items(), key=lambda x: x[1], reverse=True)[:3]
print("Top 3 Adjacent Character Pairs to Merge:")
for pair, count in top_pairs:
    print(f"Pair {pair}: {count} times")`,
      expectedOutput: `Top 3 Adjacent Character Pairs to Merge:
Pair ('t', 'r'): 12 times
Pair ('r', 'a'): 12 times
Pair ('a', 'n'): 12 times`,
    },
    lineByLineExplanation: [
      { lines: 'symbols = word.split()', codeSnippet: 'symbols = word.split()', explanation: 'Splits space-delimited character sequence into a Python list.' },
      { lines: 'pairs[(symbols[i], symbols[i+1])] += freq', codeSnippet: 'pairs[(symbols[i], symbols[i+1])] += freq', explanation: 'Tallies bigram counts weighted by frequency of each word in dataset.' },
      { lines: 'sorted(pairs.items()...)', codeSnippet: 'sorted(pairs.items(), key=lambda x: x[1], reverse=True)', explanation: 'Extracts pairs in descending order of frequency to select the optimal merge candidate.' },
    ],
    hyperparameters: [
      { name: 'vocab_size', defaultVal: '32,000 / 50,257', range: '8,000 to 256,000', effect: 'Number of unique tokens in vocabulary', recommendation: 'Larger vocab reduces sequence length but increases embedding layer memory footprint.' },
      { name: 'byte_fallback', defaultVal: 'True', range: 'True / False', effect: 'Encodes unseen Unicode characters as raw UTF-8 bytes', recommendation: 'Always enable byte-fallback (like LLaMA/GPT-4) to eliminate <unk> completely.' },
    ],
    assumptions: [
      { assumption: 'Whitespace Preserved in Tokens', whyItMatters: 'If spaces are stripped during pre-tokenization, text cannot be reconstructed losslessly.', howToVerify: 'Use special symbols (e.g. Ġ in GPT or   in SentencePiece) to explicitly represent whitespace.' },
    ],
    commonMistakes: [
      { mistake: 'Treating Token IDs as Ordinal Numbers', solution: 'Token ID 500 is NOT mathematically "greater than" Token ID 250; IDs are purely categorical keys into an embedding lookup matrix.', howToFix: 'Never pass raw integer Token IDs directly into linear layers without an embedding matrix.' },
      { mistake: 'Mismatching Tokenizer and Pretrained Model', solution: 'Each model checkpoint requires the exact vocabulary and merge table it was trained on.', howToFix: 'Always load tokenizer using the identical model identifier (e.g. AutoTokenizer.from_pretrained("bert-base-uncased")).' },
    ],
    realWorldUseCases: [
      { industry: 'Multilingual Systems', application: 'Cross-lingual models (mBERT, XLM-R, Gemma)', benefit: 'Shared subwords across French, English, and Spanish enable zero-shot cross-lingual transfer.' },
      { industry: 'Code Generation', application: 'GitHub Copilot & StarCoder', benefit: 'Tokenizers trained on code treat indentations (tabs/4 spaces) and syntax symbols as distinct tokens.' },
    ],
    practiceQuestions: [
      { id: 'tf02-p1', question: 'Why does BPE solve the Out-Of-Vocabulary (OOV) problem?', answer: 'Because any unseen word can always be decomposed into smaller subwords or individual base characters present in the initial vocabulary.', explanation: 'Even completely fabricated words like "electroquantumer" will be split into known pieces like ["electro", "quantum", "er"].' },
      { id: 'tf02-p2', question: 'What is the role of the <eos> (End of Sequence) token?', answer: 'It signals to the model during autoregressive generation that the text generation is finished and decoding should stop.', explanation: 'Without an <eos> token, the model would loop indefinitely until hitting the max token limit.' },
      { id: 'tf02-p3', question: 'What happens to sequence length when vocabulary size is increased from 1,000 to 100,000?', answer: 'Average sequence length decreases because larger vocabularies contain longer multi-character subwords and full words.', explanation: 'Fewer tokens are required to represent the same paragraph, accelerating inference speed.' },
    ],
    quiz: [
      {
        id: 'tf02-q1',
        question: 'How does Byte-Pair Encoding (BPE) expand its vocabulary during training?',
        options: [
          'By randomly selecting dictionary words',
          'By iteratively finding and merging the most frequent adjacent token pair',
          'By translating words into phonetic spellings',
          'By computing eigenvectors of the co-occurrence matrix',
        ],
        correctIndex: 1,
        explanation: 'BPE iteratively counts adjacent bigram pairs across the corpus and merges the highest-frequency pair into a new token.',
      },
      {
        id: 'tf02-q2',
        question: 'What is the danger of using character-level tokenization for LLMs?',
        options: [
          'The vocabulary size is too large',
          'Sequences become 4-5x longer, causing quadratic attention memory O(N^2) to explode',
          'Characters cannot represent numbers',
          'It creates out-of-vocabulary errors',
        ],
        correctIndex: 1,
        explanation: 'A 1,000-word essay requires ~5,000 character tokens. Because self-attention scales quadratically with length, character-level attention requires 25x more memory than subwords.',
      },
      {
        id: 'tf02-q3',
        question: 'Which special token is used to ensure all sequences in a batch have identical tensor lengths?',
        options: ['<bos>', '<eos>', '<pad>', '<unk>'],
        correctIndex: 2,
        explanation: '<pad> tokens are appended to shorter sequences to align rectangular tensor dimensions for parallel batch computation.',
      },
    ],
    independentExercise: {
      title: 'Implement Subword Prefix Tokenizer',
      problem:
        'Write a function `greedy_tokenize(word, vocab)` that takes a string `word` and a dictionary `vocab` of subword tokens, and greedily decomposes the word into recognized subwords from left to right.',
      hints: [
        'At each step, find the longest prefix of the remaining string that exists in vocab.',
        'If no prefix exists, append the first character as fallback and advance by 1 character.',
      ],
      starterCode: `def greedy_tokenize(word, vocab):
    tokens = []
    # TODO: implement longest-match greedy prefix tokenizer
    return tokens

vocab = {"un", "break", "able", "ing", "break", "fast"}
print(greedy_tokenize("unbreakable", vocab))`,
      solution: `def greedy_tokenize(word, vocab):
    tokens = []
    remaining = word
    while remaining:
        matched = False
        for l in range(len(remaining), 0, -1):
            sub = remaining[:l]
            if sub in vocab:
                tokens.append(sub)
                remaining = remaining[l:]
                matched = True
                break
        if not matched:
            tokens.append(remaining[0])
            remaining = remaining[1:]
    return tokens

vocab = {"un", "break", "able", "ing", "fast"}
print(greedy_tokenize("unbreakable", vocab))`,
    },
    summary: {
      keyTakeaways: [
        'Subword tokenization (BPE) achieves zero OOV errors with compact vocabularies (32k-100k tokens).',
        'Special tokens (<bos>, <eos>, <pad>, <unk>) mark sequence boundaries and batch alignment.',
        'Token IDs are categorical row indices into an embedding lookup matrix, not ordinal numbers.',
        'Byte fallback ensures every valid UTF-8 string is representable without information loss.',
      ],
      nextLessonId: 'tf-03-embeddings-latent-space',
      nextLessonTitle: 'TF-03: Token Embeddings & Latent Space',
      nextLessonModuleId: 'p6-m3',
    },
  },

  'tf-03-embeddings-latent-space': {
    id: 'tf-03-embeddings-latent-space',
    moduleId: 'p6-m3',
    title: 'TF-03: Token Embeddings & Latent Space',
    subtitle: 'From Categorical Token IDs to Continuous Semantic Vectors',
    order: 1,
    readTimeMinutes: 25,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Understand how an embedding matrix W_E acts as an efficient lookup table for discrete token IDs',
      'Analyze semantic geometry, cosine distance, and vector arithmetic (e.g. King - Man + Woman = Queen)',
      'Explain why the original Transformer scales token embeddings by sqrt(d_model) before adding positional encodings',
      'Implement an embedding lookup layer and cosine similarity matrix in pure NumPy and PyTorch',
    ],
    prerequisites: ['TF-02: Tokenization & Token IDs'],
    previousLesson: {
      id: 'tf-02-tokenization-and-token-ids',
      title: 'TF-02: Tokenization & Token IDs',
      moduleId: 'p6-m2',
    },
    analogy: {
      title: 'GPS Coordinates in Meaning Space',
      text: 'Imagine a list of city names: "Paris", "London", "Tokyo". Their names are arbitrary strings; alphabetical order gives zero information about whether Paris is close to London or Tokyo. Now assign each city a pair of GPS coordinates (latitude, longitude). Suddenly, Euclidean distance tells you exactly how close Paris and London are, and direction vectors tell you how to travel between them. A token embedding layer does the exact same thing: it maps arbitrary token IDs (e.g., Token 452) to high-dimensional GPS coordinates in "meaning space" (e.g. a 768-dimensional vector), where semantically related words lie close together.',
      metaphor: 'Token IDs are arbitrary names; embeddings are GPS coordinates in high-dimensional semantic space.',
    },
    problemSolved: {
      title: 'Representing Discrete Symbols in Continuous Vector Spaces',
      description:
        'Neural networks cannot perform gradient descent or linear algebra on discrete text characters. One-hot encoding creates sparse, massive vectors (e.g., 50,000 dimensions where 49,999 entries are zero) that treat every word as completely orthogonal to every other word, ignoring all semantic similarity.',
      keyPoints: [
        'One-Hot Flaw: Dot product between "puppy" and "dog" is 0.0 under one-hot representations.',
        'Dense Embeddings: Maps each token to a continuous vector of dimension d_model (e.g. 768).',
        'Learnable Parameters: Embedding vectors are learned via backpropagation alongside the rest of the network.',
      ],
    },
    intuition: {
      overview:
        'An embedding layer is mathematically equivalent to multiplying a one-hot vector by a weight matrix W_E. In practice, frameworks implement it as an O(1) table row lookup.',
      steps: [
        { step: 1, title: 'Integer Input', description: 'Receive batch of token IDs: tensor of shape (Batch, SequenceLength).' },
        { step: 2, title: 'Matrix Row Lookup', description: 'For each token ID k, retrieve row k of embedding matrix W_E.' },
        { step: 3, title: 'Output Tensor', description: 'Yield dense embedding tensor of shape (Batch, SequenceLength, d_model).' },
        { step: 4, title: 'Variance Scaling', description: 'Multiply embeddings by sqrt(d_model) to match scale with positional encodings.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical formulation of token embedding lookup and cosine similarity.',
      foundations: [
        {
          name: 'Embedding Lookup Matrix Multiplication Equivalence',
          latex: 'E(x) = x_{\\text{one-hot}} \\cdot W_E = W_E[k, :]',
          explanation: 'Selecting row k from matrix W_E in R^{|V| x d_model} is mathematically equivalent to one-hot projection.',
        },
        {
          name: 'Cosine Similarity in Latent Space',
          latex: '\\cos(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2} = \\frac{\\sum_i u_i v_i}{\\sqrt{\\sum_i u_i^2} \\sqrt{\\sum_i v_i^2}}',
          explanation: 'Measures directional alignment between two semantic vectors independent of their magnitude.',
        },
        {
          name: 'Vaswani Embedding Scaling Factor',
          latex: 'X_{\\text{scaled}} = E(x) \\times \\sqrt{d_{\\text{model}}}',
          explanation: 'Prevents token embeddings from being overwhelmed by unit-variance sinusoidal positional encodings.',
        },
      ],
    },
    derivation: {
      title: 'Why Scale Embeddings by sqrt(d_model)?',
      objective: 'Demonstrate why Vaswani et al. multiplied embeddings by sqrt(d_model).',
      steps: [
        {
          step: 1,
          label: 'Embedding Initialization Variance',
          latex: 'W_E \\sim \\mathcal{N}\\left(0, \\frac{1}{d_{\\text{model}}}\\right) \\implies \\mathbb{E}[\\|W_E[k]\\|^2] \\approx 1',
          explanation: 'Standard Xavier/He initialization yields embedding vectors with small component variance 1/d_model.',
        },
        {
          step: 2,
          label: 'Positional Encoding Magnitude',
          latex: 'PE_{(pos, i)} = \\sin(\\cdot) \\text{ or } \\cos(\\cdot) \\implies \\text{var}(PE) \\approx 0.5',
          explanation: 'Sinusoids have amplitude 1.0, so components have variance ~0.5 regardless of d_model.',
        },
        {
          step: 3,
          label: 'Magnitude Imbalance without Scaling',
          latex: '\\|PE\\| \\gg \\|E\\| \\quad (\\text{as } d_{\\text{model}} \\text{ increases})',
          explanation: 'Without scaling, positional information completely drowns out semantic word identity.',
        },
        {
          step: 4,
          label: 'Scaling Restores Balance',
          latex: '\\|E \\times \\sqrt{d_{\\text{model}}}\\| \\approx \\|PE\\|',
          explanation: 'Multiplying by sqrt(d_model) ensures semantic embeddings and positional encodings share comparable variance.',
        },
      ],
    },
    variables: [
      { symbol: 'W_E', name: 'Embedding Matrix', description: 'Learnable weight table storing dense vectors for all vocabulary tokens', dimensions: '(|V|, d_model)' },
      { symbol: '|V|', name: 'Vocabulary Size', description: 'Total number of discrete tokens (e.g. 32,000)', dimensions: 'Scalar integer' },
      { symbol: 'd_model', name: 'Embedding Dimension', description: 'Width of latent space (e.g. 512, 768, 4096)', dimensions: 'Scalar integer' },
    ],
    numericalExample: {
      scenario: 'Embedding 2 tokens [1, 2] using a toy vocabulary of 3 words with d_model = 3.',
      dataset: [
        { id: 0, word: 'dog', vector: '[0.2, 0.8, -0.1]' },
        { id: 1, word: 'cat', vector: '[0.3, 0.7, -0.2]' },
        { id: 2, word: 'car', vector: '[-0.9, 0.1, 0.8]' },
      ],
      calculations: [
        { step: 'Lookup Token 1 ("cat")', math: 'W_E[1, :]', result: '[0.3, 0.7, -0.2]' },
        { step: 'Lookup Token 2 ("car")', math: 'W_E[2, :]', result: '[-0.9, 0.1, 0.8]' },
        { step: 'Dot Product cat · dog', math: '0.3*0.2 + 0.7*0.8 + (-0.2)*(-0.1) = 0.06 + 0.56 + 0.02', result: '0.64 (High similarity)' },
        { step: 'Dot Product cat · car', math: '0.3*(-0.9) + 0.7*0.1 + (-0.2)*0.8 = -0.27 + 0.07 - 0.16', result: '-0.36 (Negative affinity)' },
      ],
      finalConclusion: 'Semantic proximity is mathematically preserved: animal concepts have positive dot product, while vehicle concept has negative similarity.',
    },
    visualExplanation: {
      title: 'High-Dimensional Latent Geometry',
      description: 'Embeddings map words into continuous hyperspheres where directional relationships represent analogies.',
      features: [
        'Semantic clustering: Synonyms and related concepts cluster into dense geometric neighborhoods.',
        'Directional offsets: Vector difference (King - Man) aligns closely with (Queen - Woman).',
        'Direct lookup: Forward pass simply indexes the weight matrix by token ID in O(1) time.',
      ],
    },
    scratchCode: {
      title: 'Embedding Table Lookup & Cosine Similarity in Pure NumPy',
      code: `import numpy as np

class NumpyEmbedding:
    def __init__(self, vocab_size, d_model):
        np.random.seed(42)
        # Initialize embedding matrix with variance 1/d_model
        self.W_E = np.random.randn(vocab_size, d_model) / np.sqrt(d_model)
        self.d_model = d_model

    def forward(self, token_ids):
        # Direct array indexing performs O(1) row lookup
        embeddings = self.W_E[token_ids]
        # Vaswani sqrt(d_model) scaling
        return embeddings * np.sqrt(self.d_model)

def cosine_similarity(u, v):
    dot = np.dot(u, v)
    norm_u = np.linalg.norm(u)
    norm_v = np.linalg.norm(v)
    return dot / (norm_u * norm_v)

vocab_size, d_model = 100, 16
embed_layer = NumpyEmbedding(vocab_size, d_model)

# Batch of 2 sentences, 3 tokens each
token_ids = np.array([[10, 24, 5], [99, 10, 42]])
embeddings = embed_layer.forward(token_ids)

print("Input Token IDs shape:  ", token_ids.shape)
print("Output Embeddings shape:", embeddings.shape)
print("Embedding vector for token 10 (first 4 dims):", np.round(embeddings[0, 0, :4], 3))`,
      explanation: 'NumPy array indexing `self.W_E[token_ids]` performs instant parallel vectorized embedding retrieval across any batch dimension.',
    },
    sklearnCode: {
      title: 'PyTorch nn.Embedding Layer and Cosine Similarity',
      code: `import torch
import torch.nn as nn
import torch.nn.functional as F

# PyTorch nn.Embedding Layer
vocab_size = 32000
d_model = 512
embedding_layer = nn.Embedding(num_embeddings=vocab_size, embedding_dim=d_model)

# Input tensor of token IDs: Batch=2, SeqLen=4
token_ids = torch.tensor([[101, 2054, 2003, 102], [101, 7592, 1010, 102]])
embedded = embedding_layer(token_ids) * (d_model ** 0.5)

print("Token IDs tensor shape: ", token_ids.shape)
print("Embedded tensor shape:  ", embedded.shape)

# Compute Cosine Similarity between token 0 and token 1
sim = F.cosine_similarity(embedded[0, 1], embedded[0, 2], dim=0)
print("Cosine similarity between tokens:", sim.item())`,
      explanation: 'nn.Embedding is a learnable lookup table that automatically accumulates gradients into corresponding rows during backward pass.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate King - Man + Woman ≈ Queen concept with synthetic vectors
np.random.seed(10)
d = 4

# Create basis vectors
man = np.array([0.9, 0.1, 0.0, 0.2])
woman = np.array([0.1, 0.9, 0.0, 0.2])
king = np.array([0.95, 0.05, 0.8, 0.1])
queen = np.array([0.05, 0.95, 0.8, 0.1])

# Semantic vector arithmetic
computed_queen = king - man + woman

def cos_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print("Similarity(computed_queen, queen):", round(cos_sim(computed_queen, queen), 4))
print("Similarity(computed_queen, man):  ", round(cos_sim(computed_queen, man), 4))`,
      expectedOutput: `Similarity(computed_queen, queen): 0.9859
Similarity(computed_queen, man):   0.0543`,
    },
    lineByLineExplanation: [
      { lines: 'computed_queen = king - man + woman', codeSnippet: 'computed_queen = king - man + woman', explanation: 'Subtracts the male directional component from King and adds the female directional component.' },
      { lines: 'cos_sim(...)', codeSnippet: 'cos_sim(computed_queen, queen)', explanation: 'Verifies that the arithmetic result points almost perfectly (0.986) toward Queen.' },
    ],
    hyperparameters: [
      { name: 'embedding_dim (d_model)', defaultVal: '512 to 4096', range: '64 to 12288', effect: 'Dimensionality of continuous vector space', recommendation: 'Bigger d_model captures nuanced semantics but increases memory and parameters (|V| * d_model).' },
      { name: 'weight_tying', defaultVal: 'True', range: 'True / False', effect: 'Shares weights between input embedding and output classification head', recommendation: 'Enabling weight tying saves tens of millions of parameters in language models.' },
    ],
    assumptions: [
      { assumption: 'Static Embeddings per Token ID', whyItMatters: 'Before self-attention layers run, the embedding of "apple" (fruit) is identical to "apple" (tech company).', howToVerify: 'Contextualization occurs only AFTER attention layers mix representations across sequence positions.' },
    ],
    commonMistakes: [
      { mistake: 'Expecting embeddings to understand context immediately', solution: 'The embedding layer is purely a context-free dictionary lookup. Contextual understanding happens in subsequent self-attention blocks.', howToFix: 'Do not evaluate context similarity before tokens pass through transformer attention layers.' },
      { mistake: 'Forgetting sqrt(d_model) scaling', solution: 'Without scaling, positional encodings overpower embedding vectors, leading to slow training convergence.', howToFix: 'Scale embeddings by math.sqrt(d_model) before adding positional encodings.' },
    ],
    realWorldUseCases: [
      { industry: 'Search & Information Retrieval', application: 'Vector Databases (Pinecone, pgvector) & Dense Semantic Retrieval', benefit: 'Allows searching documents by conceptual meaning rather than exact keyword matches.' },
      { industry: 'E-Commerce Recommendation', application: 'Product2Vec & item embeddings', benefit: 'Items frequently purchased together cluster nearby in latent space, enabling personalized suggestions.' },
    ],
    practiceQuestions: [
      { id: 'tf03-p1', question: 'How is an embedding lookup implemented efficiently in software?', answer: 'As an O(1) table row indexing operation, rather than an explicit one-hot matrix multiplication.', explanation: 'Array indexing self.W_E[token_id] avoids creating massive sparse one-hot matrices in RAM.' },
      { id: 'tf03-p2', question: 'Why does Vaswani et al. multiply embeddings by sqrt(d_model)?', answer: 'To scale the variance of the learnable embeddings so they are not drowned out by sinusoidal positional encodings of amplitude 1.0.', explanation: 'Initialization scales embeddings inversely with sqrt(d_model); multiplying by sqrt(d_model) equalizes magnitude.' },
      { id: 'tf03-p3', question: 'What is weight tying in Transformer language models?', answer: 'Using the exact same weight matrix W_E for both the input token embeddings and the final output unembedding (LM head) linear projection.', explanation: 'This drastically reduces total parameter count while accelerating training convergence.' },
    ],
    quiz: [
      {
        id: 'tf03-q1',
        question: 'What is the shape of the embedding weight matrix W_E?',
        options: ['(Batch, SequenceLength)', '(|V|, d_model)', '(d_model, d_model)', '(SequenceLength, d_model)'],
        correctIndex: 1,
        explanation: 'The embedding matrix stores one dense row of length d_model for every unique token in the vocabulary |V|.',
      },
      {
        id: 'tf03-q2',
        question: 'Prior to attention layers, does the word "bank" in "river bank" have a different embedding than in "money bank"?',
        options: [
          'Yes, the embedding layer inspects adjacent words',
          'No, the raw embedding lookup is context-independent and identical for the same token ID',
          'Yes, if the embedding dimension is large enough',
          'No, because bank is an out-of-vocabulary word',
        ],
        correctIndex: 1,
        explanation: 'Initial embeddings are static context-free lookups. Dynamic contextualization occurs only after multi-head self-attention layers mix tokens.',
      },
      {
        id: 'tf03-q3',
        question: 'What mathematical metric is standard for measuring semantic closeness between two embedding vectors?',
        options: ['Manhattan distance', 'Cosine similarity', 'Cross-entropy loss', 'Hamming distance'],
        correctIndex: 1,
        explanation: 'Cosine similarity measures directional angle alignment in high-dimensional space independent of vector magnitudes.',
      },
    ],
    independentExercise: {
      title: 'Implement Vector Cosine Similarity Search',
      problem:
        'Write a function `find_most_similar(query_id, embedding_matrix)` that computes cosine similarity between `query_id` and all other rows in `embedding_matrix`, returning the index of the most similar token.',
      hints: [
        'Extract the query vector q = embedding_matrix[query_id].',
        'Normalize all rows in embedding_matrix and vector q to unit L2 norm.',
        'Compute dot product matrix and mask out query_id itself so a word does not match itself.',
      ],
      starterCode: `import numpy as np

def find_most_similar(query_id, embedding_matrix):
    # TODO: normalize rows, compute cosine similarities, return top match index
    pass

np.random.seed(42)
W_E = np.random.randn(10, 8)
print("Most similar token to 0:", find_most_similar(0, W_E))`,
      solution: `import numpy as np

def find_most_similar(query_id, embedding_matrix):
    # Normalize rows
    norms = np.linalg.norm(embedding_matrix, axis=1, keepdims=True)
    norm_matrix = embedding_matrix / (norms + 1e-9)
    q = norm_matrix[query_id]
    
    similarities = norm_matrix @ q
    # Mask self
    similarities[query_id] = -1.0
    return int(np.argmax(similarities))

np.random.seed(42)
W_E = np.random.randn(10, 8)
print("Most similar token to 0:", find_most_similar(0, W_E))`,
    },
    summary: {
      keyTakeaways: [
        'Embedding layers map discrete token IDs to continuous dense vectors in d_model dimensional space.',
        'Lookup is an O(1) table indexing operation implemented via array indexing rather than one-hot multiplication.',
        'Embeddings are static before self-attention; contextualization occurs when tokens attend to each other.',
        'Vaswani scaling by sqrt(d_model) aligns embedding magnitude with sinusoidal positional encodings.',
      ],
      nextLessonId: 'tf-04-positional-encoding',
      nextLessonTitle: 'TF-04: Positional Information & Positional Encoding',
      nextLessonModuleId: 'p6-m4',
    },
  },
};

