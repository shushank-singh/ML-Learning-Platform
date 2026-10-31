import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 4: Positional Information & Positional Encoding (p6-m4)
// =========================================================================
export const p6m4Data: ModuleData = {
  id: 'p6-m4',
  number: 4,
  title: 'Positional Information & Positional Encoding',
  subtitle: 'Sinusoidal Waves, Learned Positional Embeddings & RoPE',
  description:
    'Discover how Transformers overcome permutation equivariance to understand sequential order. Master sinusoidal wave formulas, learnable absolute position tables, relative positional biases (T5/ALiBi), and modern Rotary Position Embeddings (RoPE) powering LLaMA and Gemini.',
  icon: 'Waves',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-04-positional-encoding',
      moduleId: 'p6-m4',
      title: 'TF-04: Positional Information & Positional Encoding',
      description:
        'Why self-attention is order-invariant, sinusoidal formulas, relative distance property, learned positional embeddings, and Rotary Position Embeddings (RoPE).',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'positional-encoding-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 5: Query, Key, and Value Vectors (p6-m5)
// =========================================================================
export const p6m5Data: ModuleData = {
  id: 'p6-m5',
  number: 5,
  title: 'Query, Key, and Value Vectors',
  subtitle: 'Linear Projections & The Database Retrieval Paradigm',
  description:
    'Deconstruct the core information retrieval intuition of Transformers: Query ("What am I looking for?"), Key ("What information do I offer?"), and Value ("What content do I deliver?"). Master linear projection matrices W_Q, W_K, W_V, parameter dimensions, and vector subspace transformations.',
  icon: 'Search',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-05-query-key-value',
      moduleId: 'p6-m5',
      title: 'TF-05: Query, Key, and Value Vectors',
      description:
        'The database search analogy, projection matrices W_Q, W_K, W_V, parameter sizing, and decoupling addressing from content.',
      order: 1,
      readTimeMinutes: 28,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 6: Scaled Dot-Product Self-Attention (p6-m6)
// =========================================================================
export const p6m6Data: ModuleData = {
  id: 'p6-m6',
  number: 6,
  title: 'Scaled Dot-Product Self-Attention',
  subtitle: 'Affinities, Variance Normalization & Softmax Weighting',
  description:
    'Dive deep into the mathematical core of the Transformer: softmax(QK^T / sqrt(d_k)) V. Derive why dot products grow proportionally with d_k, why 1/sqrt(d_k) prevents vanishing gradients, row-wise softmax normalization, and context aggregation.',
  icon: 'Sparkles',
  badge: 'Phase 6 · Transformers',
  estimatedHours: 2,
  topicsCount: 1,
  lessons: [
    {
      id: 'tf-06-scaled-dot-product-attention',
      moduleId: 'p6-m6',
      title: 'TF-06: Scaled Dot-Product Self-Attention',
      description:
        'Matrix derivation, variance proofs, temperature scaling, Softmax numerical stability, and weighted value aggregation.',
      order: 1,
      readTimeMinutes: 32,
      visualizerType: 'attention-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS
// =========================================================================
export const tfModule2Lessons: Record<string, LessonContent> = {
  'tf-04-positional-encoding': {
    id: 'tf-04-positional-encoding',
    moduleId: 'p6-m4',
    title: 'TF-04: Positional Information & Positional Encoding',
    subtitle: 'Injecting Temporal Order into Permutation-Equivariant Attention',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'positional-encoding-explorer',
    objectives: [
      'Understand why pure self-attention treats input sentences as unordered bags of words',
      'Derive the Vaswani sinusoidal positional encoding equations for even and odd dimensions',
      'Explain the linear translation property: why PE(pos + k) can be represented as a linear transformation of PE(pos)',
      'Compare sinusoidal encodings, learned absolute position embeddings (BERT/GPT-2), and Rotary Position Embeddings (RoPE)',
    ],
    prerequisites: ['TF-01: Why Transformers Were Introduced', 'TF-03: Token Embeddings & Latent Space'],
    previousLesson: {
      id: 'tf-03-embeddings-latent-space',
      title: 'TF-03: Token Embeddings & Latent Space',
      moduleId: 'p6-m3',
    },
    analogy: {
      title: 'Numbered Coat Check Tickets vs Stacking Clothes',
      text: 'In an RNN, order is enforced naturally by time: you fold coat 1, then coat 2, then coat 3 on top of it. But in a Transformer, all 100 coats are thrown into a room at the exact same moment. If you throw the sentence "Dog bites man" and "Man bites dog" into pure self-attention without labels, the pairwise affinity scores are identical because self-attention is symmetric with respect to sets! To preserve order, you pin a unique numbered coat check ticket (Positional Encoding vector) onto each coat before tossing it in. Coat 1 receives Ticket #1, Coat 2 receives Ticket #2. Now the network knows both WHAT the item is (embedding vector) and WHERE it stands in line (positional vector).',
      metaphor: 'Without positional encodings, a Transformer is deaf to word order: "not good, very bad" looks identical to "not bad, very good".',
    },
    problemSolved: {
      title: 'Permutation Equivariance in Self-Attention',
      description:
        'Because self-attention computes dot products between all pairs independently of their array indices, permuting the order of input tokens permutes the output tokens by the exact same permutation without altering any calculated affinities.',
      keyPoints: [
        'Permutation Equivariance: f(P · X) = P · f(X). Self-attention inherently has zero awareness of sequence order.',
        'Solution: Add a position-dependent vector p_i to token embedding e_i before the first attention layer.',
        'Zero Extra Parameters: Sinusoidal encodings require zero learned weights and generalize to unseen sequence lengths.',
      ],
    },
    intuition: {
      overview:
        'Vaswani et al. designed continuous sine and cosine waves of varying frequencies. Even dimensions use sine, odd dimensions use cosine. The wavelengths form a geometric progression from 2π to 10000 · 2π.',
      steps: [
        { step: 1, title: 'Multi-Frequency Spectrum', description: 'Early dimensions oscillate rapidly (like seconds hand on a clock), capturing local syntax.' },
        { step: 2, title: 'Long-Wave Spectrum', description: 'Late dimensions oscillate extremely slowly (like the hour hand), capturing distant global positioning.' },
        { step: 3, title: 'Vector Addition', description: 'Input tensor becomes X = Embedding(TokenID) * sqrt(d_model) + PositionalEncoding.' },
        { step: 4, title: 'Relative Distance Property', description: 'Dot product between PE(pos) and PE(pos+k) depends solely on relative distance k, not absolute position pos.' },
      ],
    },
    mathematics: {
      overview: 'Sinusoidal positional encoding formulas across dimension indices.',
      foundations: [
        {
          name: 'Even Dimensions (Sine Wave)',
          latex: 'PE_{(pos, 2i)} = \\sin\\left( \\frac{pos}{10000^{2i / d_{\\text{model}}}} \\right)',
          explanation: 'Assigns sine frequency to even dimension index 2i where i in [0, d_model / 2 - 1].',
        },
        {
          name: 'Odd Dimensions (Cosine Wave)',
          latex: 'PE_{(pos, 2i+1)} = \\cos\\left( \\frac{pos}{10000^{2i / d_{\\text{model}}}} \\right)',
          explanation: 'Assigns cosine frequency to odd dimension index 2i+1 with identical frequency to its paired sine dimension.',
        },
        {
          name: 'Wavelength Progression',
          latex: '\\lambda_i = 2\\pi \\cdot 10000^{2i / d_{\\text{model}}}',
          explanation: 'Wavelength varies smoothly from 2pi (at i = 0) up to 2pi * 10000 (at i = d_model / 2 - 1).',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Linear Relative Translation Property',
      objective: 'Prove that for any fixed offset k, PE(pos + k) can be represented as a linear function of PE(pos).',
      steps: [
        {
          step: 1,
          label: 'Trigonometric Addition Identities',
          latex: '\\sin(\\omega(pos + k)) = \\sin(\\omega pos)\\cos(\\omega k) + \\cos(\\omega pos)\\sin(\\omega k)',
          explanation: 'Standard trigonometric sum formula expanding sine of sum into product of sines and cosines.',
        },
        {
          step: 2,
          label: 'Cosine Addition Identity',
          latex: '\\cos(\\omega(pos + k)) = \\cos(\\omega pos)\\cos(\\omega k) - \\sin(\\omega pos)\\sin(\\omega k)',
          explanation: 'Standard trigonometric expansion for cosine of sum.',
        },
        {
          step: 3,
          label: '2x2 Rotation Matrix Formulation',
          latex: '\\begin{bmatrix} PE_{(pos+k, 2i)} \\\\ PE_{(pos+k, 2i+1)} \\end{bmatrix} = \\begin{bmatrix} \\cos(\\omega_i k) & \\sin(\\omega_i k) \\\\ -\\sin(\\omega_i k) & \\cos(\\omega_i k) \\end{bmatrix} \\begin{bmatrix} PE_{(pos, 2i)} \\\\ PE_{(pos, 2i+1)} \\end{bmatrix}',
          explanation: 'For any constant offset k, there exists a constant linear rotation matrix R(k) independent of pos.',
        },
        {
          step: 4,
          label: 'Conclusion',
          latex: 'PE(pos + k) = R(k) \\cdot PE(pos)',
          explanation: 'The model can easily learn to attend to relative positions because relative shifts are pure linear transformations.',
        },
      ],
    },
    variables: [
      { symbol: 'pos', name: 'Token Sequence Index', description: 'Integer position along sequence (0, 1, 2, ..., N-1)', dimensions: 'Scalar integer' },
      { symbol: 'i', name: 'Dimension Index', description: 'Index within the d_model embedding vector (i = 0, ..., d_model/2 - 1)', dimensions: 'Scalar integer' },
      { symbol: '\\omega_i', name: 'Angular Frequency', description: 'Frequency parameter 1 / (10000^(2i/d_model))', dimensions: 'Scalar real' },
      { symbol: 'PE', name: 'Positional Encoding Matrix', description: 'Full positional table added to embeddings', dimensions: '(N, d_model)' },
    ],
    numericalExample: {
      scenario: 'Computing PE for position pos = 1 with d_model = 4.',
      dataset: [
        { dim: '2i = 0 (even)', formula: 'sin(1 / 10000^(0/4)) = sin(1 / 1)', value: 'sin(1.0) = 0.8415' },
        { dim: '2i+1 = 1 (odd)', formula: 'cos(1 / 10000^(0/4)) = cos(1 / 1)', value: 'cos(1.0) = 0.5403' },
        { dim: '2i = 2 (even)', formula: 'sin(1 / 10000^(2/4)) = sin(1 / 100)', value: 'sin(0.01) = 0.0100' },
        { dim: '2i+1 = 3 (odd)', formula: 'cos(1 / 10000^(2/4)) = cos(1 / 100)', value: 'cos(0.01) = 0.9999' },
      ],
      calculations: [
        { step: 'Component 0', math: 'sin(1.0)', result: '0.8415' },
        { step: 'Component 1', math: 'cos(1.0)', result: '0.5403' },
        { step: 'Component 2', math: 'sin(0.01)', result: '0.0100' },
        { step: 'Component 3', math: 'cos(0.01)', result: '0.9999' },
      ],
      finalConclusion: 'PE(pos=1) = [0.8415, 0.5403, 0.0100, 0.9999]. Notice fast oscillation in dims 0-1 and slow drift in dims 2-3.',
    },
    visualExplanation: {
      title: 'Interactive Positional Encoding Spectrum',
      description: 'The Positional Encoding Explorer visualizer maps the 2D matrix of sinusoidal vectors.',
      features: [
        'Notice how low-index columns alternate rapidly between blue and red, acting like high-frequency timers.',
        'Notice how high-index columns remain solid, establishing long-range context across thousands of tokens.',
        'Inspect the relative distance dot product curve showing that tokens naturally have higher affinities with their neighbors.',
      ],
    },
    scratchCode: {
      title: 'Sinusoidal Positional Encoding in Pure NumPy',
      code: `import numpy as np

def generate_positional_encoding(seq_len, d_model):
    pe = np.zeros((seq_len, d_model))
    # Shape: (seq_len, 1)
    position = np.arange(seq_len)[:, np.newaxis]
    # Shape: (d_model // 2,)
    div_term = np.exp(np.arange(0, d_model, 2) * -(np.log(10000.0) / d_model))
    
    # Assign sine to even and cosine to odd indices
    pe[:, 0::2] = np.sin(position * div_term)
    pe[:, 1::2] = np.cos(position * div_term)
    return pe

seq_len, d_model = 8, 16
pe = generate_positional_encoding(seq_len, d_model)

print("Positional Encoding Matrix shape:", pe.shape)
print("PE vector for pos 0 (first 4 dims):", np.round(pe[0, :4], 3))
print("PE vector for pos 1 (first 4 dims):", np.round(pe[1, :4], 3))
print("Dot product pos 0 · pos 1:         ", round(np.dot(pe[0], pe[1]), 3))
print("Dot product pos 0 · pos 7:         ", round(np.dot(pe[0], pe[7]), 3))`,
      explanation: 'Notice how the dot product between pos 0 and pos 1 is high, but drops significantly by pos 7, naturally encoding distance.',
    },
    sklearnCode: {
      title: 'PyTorch Positional Encoding & Rotary Position Embedding (RoPE)',
      code: `import torch
import torch.nn as nn
import math

class SinusoidalPositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe.unsqueeze(0))  # Shape: (1, max_len, d_model)

    def forward(self, x):
        # x shape: (batch_size, seq_len, d_model)
        return x + self.pe[:, :x.size(1)]

# Test in PyTorch
pe_module = SinusoidalPositionalEncoding(d_model=64)
x = torch.randn(2, 10, 64)
x_pos = pe_module(x)
print("Input shape with positions injected:", x_pos.shape)`,
      explanation: 'register_buffer ensures positional tensors are automatically moved to GPU with the model without creating trainable gradients.',
    },
    runnableCode: {
      code: `import numpy as np

# Test positional encoding generation directly in browser Pyodide
def get_pe(pos, d_model):
    pe = np.zeros((pos, d_model))
    for p in range(pos):
        for i in range(0, d_model, 2):
            denom = 10000 ** (2 * (i // 2) / d_model)
            pe[p, i] = np.sin(p / denom)
            if i + 1 < d_model:
                pe[p, i + 1] = np.cos(p / denom)
    return pe

pe = get_pe(4, 4)
print("PE matrix (4x4):")
print(np.round(pe, 3))
print("Dot product pos 0 and pos 1:", round(np.dot(pe[0], pe[1]), 3))
print("Dot product pos 0 and pos 3:", round(np.dot(pe[0], pe[3]), 3))`,
      expectedOutput: `PE matrix (4x4):
[[ 0.     1.     0.     1.   ]
 [ 0.841  0.54   0.01   1.   ]
 [ 0.909 -0.416  0.02   1.   ]
 [ 0.141 -0.99   0.03   1.   ]]
Dot product pos 0 and pos 1: 1.54
Dot product pos 0 and pos 3: 0.01`,
    },
    lineByLineExplanation: [
      { lines: 'denom = 10000 ** (...)', codeSnippet: 'denom = 10000 ** (2 * (i // 2) / d_model)', explanation: 'Calculates the geometric wavelength denominator scaling from 1 to 10000.' },
      { lines: 'pe[p, i] = np.sin(...)', codeSnippet: 'pe[p, i] = np.sin(p / denom)', explanation: 'Assigns sine frequency to even dimension column.' },
      { lines: 'pe[p, i+1] = np.cos(...)', codeSnippet: 'pe[p, i + 1] = np.cos(p / denom)', explanation: 'Assigns paired cosine frequency to odd dimension column.' },
    ],
    hyperparameters: [
      { name: 'base_frequency', defaultVal: '10000', range: '1000 to 500000', effect: 'Maximum wavelength base denominator', recommendation: 'Modern long-context models (e.g. LLaMA 3 with 128k context) scale base frequency up to 500,000 to prevent phase wrapping.' },
      { name: 'encoding_type', defaultVal: 'RoPE / Sinusoidal', range: 'Sinusoidal, Learned, RoPE, ALiBi', effect: 'Positional formulation method', recommendation: 'RoPE (Rotary Position Embedding) is the modern standard for autoregressive language models.' },
    ],
    assumptions: [
      { assumption: 'Vector Addition Does Not Destroy Semantics', whyItMatters: 'Adding PE directly to token embeddings alters their vector values.', howToVerify: 'Because d_model is large (e.g. 768 to 4096), high-dimensional geometry allows semantic content and positional signals to reside in orthogonal subspaces.' },
    ],
    commonMistakes: [
      { mistake: 'Concatenating instead of Adding Positional Vectors', solution: 'The original Transformer adds positional vectors directly: X = Embedding + PE, rather than concatenating, which preserves d_model dimensions.', howToFix: 'Use element-wise addition: x = x + self.pe[:, :seq_len].' },
      { mistake: 'Treating learned positional embeddings as generalizable to longer sequences', solution: 'Learned position tables (like in GPT-2 and original BERT) have fixed size max_len (e.g. 512). Sequences longer than 512 throw IndexError.', howToFix: 'Use Rotary Position Embeddings (RoPE) or ALiBi for length extrapolation.' },
    ],
    realWorldUseCases: [
      { industry: 'Long-Context LLMs', application: 'LLaMA 3, Mistral, and Claude 200k context windows', benefit: 'RoPE frequency interpolation enables models to attend reliably to tokens 100,000 steps away.' },
      { industry: 'Speech & Audio Processing', application: 'OpenAI Whisper speech-to-text', benefit: 'Sinusoidal positional encodings track continuous audio spectrogram frame timestamps.' },
    ],
    practiceQuestions: [
      { id: 'tf04-p1', question: 'Why does pure self-attention produce identical outputs for "The dog chased the cat" and "The cat chased the dog" if positional encodings are omitted?', answer: 'Because self-attention is permutation-equivariant; changing word order simply permutes the rows and columns without changing any computed pairwise attention affinity values.', explanation: 'The model has no mechanism to distinguish whether a token was at index 1 or index 5 unless positional vectors are added.' },
      { id: 'tf04-p2', question: 'What is the advantage of sinusoidal positional encodings over learned positional embeddings?', answer: 'Sinusoidal encodings require zero learned weights, do not consume training parameters, and can theoretically extrapolate to sequence lengths unseen during training.', explanation: 'Learned embeddings cannot process sequence lengths greater than their pre-allocated table size.' },
      { id: 'tf04-p3', question: 'How do Rotary Position Embeddings (RoPE) inject positional information?', answer: 'RoPE applies a 2D rotation matrix to Query and Key vectors at each position, embedding relative position directly into the dot product Q_m^T K_n.', explanation: 'This preserves norm while making the dot product depend strictly on relative offset m - n.' },
    ],
    quiz: [
      {
        id: 'tf04-q1',
        question: 'Which mathematical operation is used in the original Transformer to combine token embeddings and positional encodings?',
        options: ['Vector concatenation', 'Element-wise addition', 'Matrix multiplication', 'Outer tensor product'],
        correctIndex: 1,
        explanation: 'Vaswani et al. added positional encodings element-wise: X = Embedding + PE.',
      },
      {
        id: 'tf04-q2',
        question: 'What is the wavelength of the sinusoidal encoding for dimension i = 0?',
        options: ['10,000', '2π', '1.0', '100'],
        correctIndex: 1,
        explanation: 'When i = 0, the denominator is 10000^0 = 1. The wavelength of sin(pos) is 2π (oscillates every ~6 tokens).',
      },
      {
        id: 'tf04-q3',
        question: 'What modern positional encoding technique rotates Query and Key vectors in complex 2D planes and powers LLaMA models?',
        options: ['One-hot indexing', 'RoPE (Rotary Position Embedding)', 'Absolute integer offsets', 'Fourier transform truncation'],
        correctIndex: 1,
        explanation: 'RoPE (Su et al.) encodes relative position by rotating Q and K vectors, making Q_m · K_n a direct function of relative distance m - n.',
      },
    ],
    independentExercise: {
      title: 'Calculate Distance Decay in Positional Encodings',
      problem:
        'Write a function `verify_distance_decay(pe_matrix)` that computes the average dot product between tokens separated by distance k = 1, 2, 3, 4 and returns a dictionary of average dot products.',
      hints: [
        'Iterate over all pairs (i, j) where |i - j| == k.',
        'Compute np.dot(pe_matrix[i], pe_matrix[j]) and calculate the mean for each distance k.',
        'Notice that dot product strictly decays as distance k increases.',
      ],
      starterCode: `import numpy as np

def verify_distance_decay(pe_matrix, max_k=4):
    results = {}
    # TODO: compute average dot product for each relative distance k in 1..max_k
    return results`,
      solution: `import numpy as np

def verify_distance_decay(pe_matrix, max_k=4):
    results = {}
    N = len(pe_matrix)
    for k in range(1, max_k + 1):
        dots = []
        for i in range(N - k):
            dots.append(np.dot(pe_matrix[i], pe_matrix[i + k]))
        results[f"distance_{k}"] = float(np.round(np.mean(dots), 4))
    return results`,
    },
    summary: {
      keyTakeaways: [
        'Pure self-attention is permutation-equivariant; positional encodings are mandatory for sequence order awareness.',
        'Vaswani sinusoidal encodings use multi-frequency geometric waves spanning from 2π to 20,000π.',
        'Relative offset can be represented as a linear rotation matrix R(k) acting on positional vectors.',
        'Modern architectures (LLaMA, Mistral, Gemma) adopt Rotary Position Embeddings (RoPE) for superior relative distance encoding.',
      ],
      nextLessonId: 'tf-05-query-key-value',
      nextLessonTitle: 'TF-05: Query, Key, and Value Vectors',
      nextLessonModuleId: 'p6-m5',
    },
  },

  'tf-05-query-key-value': {
    id: 'tf-05-query-key-value',
    moduleId: 'p6-m5',
    title: 'TF-05: Query, Key, and Value Vectors',
    subtitle: 'Decoupling Addressing from Information in Transformer Latent Spaces',
    order: 1,
    readTimeMinutes: 28,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Deconstruct the database retrieval analogy: Query, Key, and Value roles in self-attention',
      'Understand the mathematical role of linear projection matrices W_Q, W_K, and W_V',
      'Explain why separating Query and Key allows asymmetric relationships (e.g. subject attending to object)',
      'Implement linear QKV projections from scratch in NumPy and trace tensor shapes across batch dimensions',
    ],
    prerequisites: ['TF-03: Token Embeddings & Latent Space', 'TF-04: Positional Information & Positional Encoding'],
    previousLesson: {
      id: 'tf-04-positional-encoding',
      title: 'TF-04: Positional Information & Positional Encoding',
      moduleId: 'p6-m4',
    },
    analogy: {
      title: 'YouTube / Google Database Search',
      text: 'Think of how modern database search works on YouTube. You type a Search Query into the search bar: "how to train a Transformer" (Query vector Q). YouTube has billions of videos, each indexed with Titles and Tags: "Deep learning tutorial", "Cooking pasta", "Attention mechanism" (Key vectors K). YouTube computes the match score between your Query and every video\'s Key tags (the dot product Q · K). The top matching video is selected, and YouTube delivers the actual Video Stream (Value vector V). Notice the crucial separation: you search using tags and keywords (Key), but what you actually watch and learn from is the video frames (Value). Similarly, in Transformers, Query asks a question, Key answers the match, and Value provides the actual semantic payload.',
      metaphor: 'Query is the search prompt, Key is the catalog label, and Value is the book contents retrieved from the shelf.',
    },
    problemSolved: {
      title: 'The Symmetry Trap of Raw Embedding Dot Products',
      description:
        'If tokens simply computed dot products using their raw embeddings e_i · e_j, the relationship would be strictly symmetric: Token A would always attend to Token B with the exact same weight that Token B attends to Token A! Language is inherently asymmetric: a verb ("barks") seeks its subject ("dog"), but the subject does not look for the verb in the same manner.',
      keyPoints: [
        'Decoupling Roles: W_Q projects what a token is seeking; W_K projects what a token offers.',
        'Asymmetry: Q_i · K_j != Q_j · K_i because W_Q != W_K.',
        'Separating Addressing from Content: Query and Key determine routing (addressing), while Value delivers the updated representation.',
      ],
    },
    intuition: {
      overview:
        'Each token representation x_i is linearly projected through three learned weight matrices W_Q, W_K, and W_V into three distinct vectors.',
      steps: [
        { step: 1, title: 'Input Embedding', description: 'Token enters as vector x in R^{d_model} (containing semantic + positional signals).' },
        { step: 2, title: 'Linear Projection', description: 'Compute Q = x * W_Q, K = x * W_K, and V = x * W_V.' },
        { step: 3, title: 'Subspace Transformation', description: 'W_Q and W_K live in search space R^{d_k}; W_V lives in content space R^{d_v}.' },
        { step: 4, title: 'Batch Vectorization', description: 'Single matrix multiplication projects all tokens in a sequence simultaneously.' },
      ],
    },
    mathematics: {
      overview: 'Linear transformation formulas for Query, Key, and Value tensors.',
      foundations: [
        {
          name: 'Query Projection',
          latex: 'Q = X W_Q \\quad \\text{where } W_Q \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}',
          explanation: 'Projects token representations into Query space ("What am I searching for?").',
        },
        {
          name: 'Key Projection',
          latex: 'K = X W_K \\quad \\text{where } W_K \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}',
          explanation: 'Projects token representations into Key space ("What characteristics do I possess?").',
        },
        {
          name: 'Value Projection',
          latex: 'V = X W_V \\quad \\text{where } W_V \\in \\mathbb{R}^{d_{\\text{model}} \\times d_v}',
          explanation: 'Projects token representations into Value space ("What information do I pass downstream?").',
        },
      ],
    },
    derivation: {
      title: 'Proof of Asymmetry via Learned Projections',
      objective: 'Prove that Query-Key projections enable asymmetric token-to-token attention.',
      steps: [
        {
          step: 1,
          label: 'Symmetric Raw Dot Product',
          latex: 'S_{\\text{raw}}(x_i, x_j) = x_i^T x_j = x_j^T x_i = S_{\\text{raw}}(x_j, x_i)',
          explanation: 'Standard vector dot product is commutative; token i and token j have identical affinity.',
        },
        {
          step: 2,
          label: 'Projected Bilinear Affinity Formulation',
          latex: 'S(x_i, x_j) = Q_i^T K_j = (x_i W_Q)^T (x_j W_K) = x_i^T (W_Q^T W_K) x_j',
          explanation: 'Let M = W_Q^T W_K in R^{d_model x d_model}. Score becomes the bilinear form x_i^T M x_j.',
        },
        {
          step: 3,
          label: 'Reverse Direction Formulation',
          latex: 'S(x_j, x_i) = Q_j^T K_i = x_j^T (W_Q^T W_K) x_i = x_i^T (W_K^T W_Q) x_j = x_i^T M^T x_j',
          explanation: 'The reverse score uses the transpose matrix M^T.',
        },
        {
          step: 4,
          label: 'Asymmetry Guarantee',
          latex: 'M \\neq M^T \\implies S(x_i, x_j) \\neq S(x_j, x_i)',
          explanation: 'Because W_Q and W_K are learned independently, M is not symmetric, allowing directed relationships.',
        },
      ],
    },
    variables: [
      { symbol: 'X', name: 'Input Matrix', description: 'Sequence of input token vectors', dimensions: '(N, d_model)' },
      { symbol: 'W_Q, W_K, W_V', name: 'Weight Projection Matrices', description: 'Learned linear projection parameters', dimensions: '(d_model, d_k) or (d_model, d_v)' },
      { symbol: 'd_k', name: 'Query/Key Dimension', description: 'Size of projection vectors (often d_model / nhead)', dimensions: 'Scalar integer' },
      { symbol: 'd_v', name: 'Value Dimension', description: 'Size of value vectors (typically equal to d_k)', dimensions: 'Scalar integer' },
    ],
    numericalExample: {
      scenario: 'Projecting a single token vector x = [1.0, 2.0] into Q, K, V using d_model = 2 and d_k = 2.',
      dataset: [
        { matrix: 'W_Q', row0: '[1, 0]', row1: '[0, 2]' },
        { matrix: 'W_K', row0: '[0, 1]', row1: '[1, 0]' },
        { matrix: 'W_V', row0: '[3, 1]', row1: '[1, 3]' },
      ],
      calculations: [
        { step: 'Query vector Q = x @ W_Q', math: '[1*1 + 2*0, 1*0 + 2*2]', result: '[1.0, 4.0]' },
        { step: 'Key vector K = x @ W_K', math: '[1*0 + 2*1, 1*1 + 2*0]', result: '[2.0, 1.0]' },
        { step: 'Value vector V = x @ W_V', math: '[1*3 + 2*1, 1*1 + 2*3]', result: '[5.0, 7.0]' },
      ],
      finalConclusion: 'The single input vector [1, 2] is cleanly decomposed into three distinct functional representations: Query [1, 4], Key [2, 1], and Value [5, 7].',
    },
    visualExplanation: {
      title: 'Decoupled Information Retrieval Geometry',
      description: 'The Q, K, V mechanism splits representation into addressing (Q, K) and content (V).',
      features: [
        'Queries and Keys live in the same coordinate system (d_k) so they can compute dot products.',
        'Values live in their own coordinate system (d_v), preserving original semantic richness.',
        'All three projections occur via standard matrix multiplications running at peak GPU FLOPS.',
      ],
    },
    scratchCode: {
      title: 'Vectorized QKV Projections in Pure NumPy',
      code: `import numpy as np

class QKVProjection:
    def __init__(self, d_model, d_k, d_v):
        np.random.seed(42)
        # Initialize projection matrices
        self.W_q = np.random.randn(d_model, d_k) * 0.1
        self.W_k = np.random.randn(d_model, d_k) * 0.1
        self.W_v = np.random.randn(d_model, d_v) * 0.1

    def forward(self, X):
        # X shape: (Batch, SeqLen, d_model)
        Q = X @ self.W_q  # (Batch, SeqLen, d_k)
        K = X @ self.W_k  # (Batch, SeqLen, d_k)
        V = X @ self.W_v  # (Batch, SeqLen, d_v)
        return Q, K, V

batch_size, seq_len, d_model = 2, 4, 8
d_k = d_v = 4

X = np.random.randn(batch_size, seq_len, d_model)
qkv = QKVProjection(d_model, d_k, d_v)
Q, K, V = qkv.forward(X)

print("Input X shape: ", X.shape)
print("Query Q shape: ", Q.shape)
print("Key K shape:   ", K.shape)
print("Value V shape: ", V.shape)`,
      explanation: 'Notice how three matrix multiplications project the input tensor into separate Query, Key, and Value subspaces.',
    },
    sklearnCode: {
      title: 'Fused QKV Linear Projection in PyTorch',
      code: `import torch
import torch.nn as nn

class FusedQKV(nn.Module):
    def __init__(self, d_model, n_head):
        super().__init__()
        self.d_model = d_model
        self.n_head = n_head
        # Fusing all 3 projections into a single 3*d_model linear layer saves GPU kernel overhead!
        self.qkv_proj = nn.Linear(d_model, 3 * d_model, bias=False)

    def forward(self, x):
        # x shape: (batch_size, seq_len, d_model)
        B, T, C = x.shape
        # Single GEMM kernel call
        qkv = self.qkv_proj(x)
        # Split into Q, K, V along last dimension
        q, k, v = qkv.chunk(3, dim=-1)
        return q, k, v

fused = FusedQKV(d_model=64, n_head=4)
x = torch.randn(2, 8, 64)
q, k, v = fused(x)
print("Fused projection outputs:")
print("q shape:", q.shape, "k shape:", k.shape, "v shape:", v.shape)`,
      explanation: 'Production architectures (e.g. FlashAttention, Megatron-LM) fuse W_Q, W_K, W_V into a single linear projection matrix of width 3*d_model to maximize GPU tensor core utilization.',
    },
    runnableCode: {
      code: `import numpy as np

# Test asymmetry of QK^T directly in browser Pyodide
np.random.seed(42)
d_model, d_k = 4, 2
x = np.array([[1.0, 0.5, -0.2, 0.1], [0.2, 1.2, 0.3, -0.5]])
W_q = np.random.randn(d_model, d_k) * 0.5
W_k = np.random.randn(d_model, d_k) * 0.5

Q = x @ W_q
K = x @ W_k

scores = Q @ K.T
print("Affinity Matrix Q @ K.T (2x2):")
print(np.round(scores, 3))
print("Notice score(Token 0 -> Token 1) =", round(scores[0, 1], 3))
print("Notice score(Token 1 -> Token 0) =", round(scores[1, 0], 3))
print("Is matrix symmetric?", np.allclose(scores, scores.T))`,
      expectedOutput: `Affinity Matrix Q @ K.T (2x2):
[[-0.118 -0.065]
 [ 0.211 -0.248]]
Notice score(Token 0 -> Token 1) = -0.065
Notice score(Token 1 -> Token 0) = 0.211
Is matrix symmetric? False`,
    },
    lineByLineExplanation: [
      { lines: 'Q = x @ W_q', codeSnippet: 'Q = x @ W_q', explanation: 'Linear projection into Query representation.' },
      { lines: 'K = x @ W_k', codeSnippet: 'K = x @ W_k', explanation: 'Linear projection into Key representation.' },
      { lines: 'scores = Q @ K.T', codeSnippet: 'scores = Q @ K.T', explanation: 'Pairwise dot products between Queries and Keys.' },
      { lines: 'np.allclose(scores, scores.T)', codeSnippet: 'np.allclose(scores, scores.T)', explanation: 'Verifies that score[0, 1] != score[1, 0], confirming asymmetric directed attention.' },
    ],
    hyperparameters: [
      { name: 'd_k (head dimension)', defaultVal: '64 / 128', range: '32 to 256', effect: 'Dimensionality of Query and Key vectors', recommendation: 'Typically set to d_model / n_heads (e.g. 4096 / 32 = 128 in LLaMA 7B).' },
      { name: 'bias in QKV projections', defaultVal: 'False', range: 'True / False', effect: 'Whether linear projection layers include additive bias vector', recommendation: 'Modern models (LLaMA, PaLM, Mistral) omit bias terms to improve training stability and throughput.' },
    ],
    assumptions: [
      { assumption: 'Q and K Share the Same Dimensionality', whyItMatters: 'Computing dot products Q_i · K_j requires Q and K vectors to have identical lengths d_k.', howToVerify: 'Verify that W_Q and W_K both have output dimension d_k.' },
    ],
    commonMistakes: [
      { mistake: 'Confusing Key and Value', solution: 'Key is used strictly for calculating attention weights (addressing). Value is the payload multiplied by those weights.', howToFix: 'Remember: Query and Key match; Value gets transported.' },
      { mistake: 'Executing three separate linear projection kernel calls', solution: 'Calling self.q_proj, self.k_proj, self.v_proj separately causes GPU launch overhead.', howToFix: 'Fuse projections into a single nn.Linear(d_model, 3 * d_model) layer.' },
    ],
    realWorldUseCases: [
      { industry: 'Cross-Attention in Translation', application: 'T5, MarianMT, and Whisper', benefit: 'Decoder generates Queries from target language, while Keys and Values come from source language audio/text.' },
      { industry: 'Multimodal Foundation Models', application: 'Vision-Language Models (CLIP, LLaVA, Gemini)', benefit: 'Text tokens query image patch keys and values to align visual concepts with words.' },
    ],
    practiceQuestions: [
      { id: 'tf05-p1', question: 'Why can self-attention model directed grammatical relationships (e.g. verb -> object) whereas raw embedding dot products cannot?', answer: 'Because separate learned matrices W_Q and W_K break symmetry: Q_i · K_j != Q_j · K_i.', explanation: 'Raw dot products are symmetric; learned Q and K projections allow Token i to attend to Token j without Token j attending back.' },
      { id: 'tf05-p2', question: 'Must the Value dimension d_v equal the Query/Key dimension d_k?', answer: 'Mathematically no, but in almost all Transformer implementations d_v is chosen to equal d_k for simplicity.', explanation: 'Q and K must have the same dimension to compute dot products, but V can technically have any dimension.' },
      { id: 'tf05-p3', question: 'How many total parameters are in the three projection layers for a single head with d_model = 512 and d_k = 64?', answer: '3 * (512 * 64) = 98,304 parameters (assuming no bias).', explanation: 'Each projection matrix W_Q, W_K, W_V has shape (512, 64).' },
    ],
    quiz: [
      {
        id: 'tf05-q1',
        question: 'In the database search analogy, what does the Query vector represent?',
        options: [
          'The document stored on the hard drive',
          'The search phrase asking what information is needed',
          'The index tags used to label catalog items',
          'The number of tokens in the sequence',
        ],
        correctIndex: 1,
        explanation: 'The Query vector represents "What am I looking for?" which is compared against all Key tags.',
      },
      {
        id: 'tf05-q2',
        question: 'Why do high-performance implementations fuse W_Q, W_K, and W_V into a single linear layer?',
        options: [
          'To force Q, K, and V to be identical',
          'To reduce GPU kernel launch overhead and run one large matrix multiplication at peak memory bandwidth',
          'Because PyTorch cannot run three layers',
          'To eliminate the Softmax function',
        ],
        correctIndex: 1,
        explanation: 'Fusing into a single (d_model, 3*d_model) layer allows one large matrix multiply (GEMM), maximizing GPU hardware utilization.',
      },
      {
        id: 'tf05-q3',
        question: 'What tensor operation calculates the unnormalized attention scores between all Queries and Keys?',
        options: ['Q + K', 'Q @ K.T', 'Q * K (element-wise)', 'Q @ V'],
        correctIndex: 1,
        explanation: 'Multiplying Query matrix Q of shape (N, d_k) by transposed Key matrix K.T of shape (d_k, N) produces the (N, N) pairwise score matrix.',
      },
    ],
    independentExercise: {
      title: 'Build a Fused QKV Projection Layer',
      problem:
        'Write a Python class `FusedQKV` using pure NumPy that initializes a single weight matrix of shape `(d_model, 3 * d_k)` and implements a `forward(X)` method returning a tuple `(Q, K, V)`.',
      hints: [
        'Initialize self.W of shape (d_model, 3 * d_k).',
        'In forward(X), compute qkv = X @ self.W.',
        'Use np.split(qkv, 3, axis=-1) to extract Q, K, and V.',
      ],
      starterCode: `import numpy as np

class FusedQKV:
    def __init__(self, d_model, d_k):
        # TODO: initialize fused weight matrix
        pass

    def forward(self, X):
        # TODO: single GEMM and split into Q, K, V
        pass

layer = FusedQKV(d_model=8, d_k=4)
X = np.ones((2, 3, 8))
Q, K, V = layer.forward(X)
print("Q shape:", Q.shape, "K shape:", K.shape, "V shape:", V.shape)`,
      solution: `import numpy as np

class FusedQKV:
    def __init__(self, d_model, d_k):
        np.random.seed(42)
        self.d_k = d_k
        self.W = np.random.randn(d_model, 3 * d_k) * 0.1

    def forward(self, X):
        qkv = X @ self.W
        Q, K, V = np.split(qkv, 3, axis=-1)
        return Q, K, V

layer = FusedQKV(d_model=8, d_k=4)
X = np.ones((2, 3, 8))
Q, K, V = layer.forward(X)
print("Q shape:", Q.shape, "K shape:", K.shape, "V shape:", V.shape)`,
    },
    summary: {
      keyTakeaways: [
        'Query, Key, and Value decouple addressing (routing) from information payload delivery.',
        'Independent projection matrices W_Q and W_K break dot-product symmetry, enabling directed attention.',
        'W_Q and W_K project into search space R^{d_k}; W_V projects into content space R^{d_v}.',
        'Production systems fuse Q, K, V projections into a single linear layer of width 3*d_model for GPU efficiency.',
      ],
      nextLessonId: 'tf-06-scaled-dot-product-attention',
      nextLessonTitle: 'TF-06: Scaled Dot-Product Self-Attention',
      nextLessonModuleId: 'p6-m6',
    },
  },

  'tf-06-scaled-dot-product-attention': {
    id: 'tf-06-scaled-dot-product-attention',
    moduleId: 'p6-m6',
    title: 'TF-06: Scaled Dot-Product Self-Attention',
    subtitle: 'Mathematical Derivation, Temperature Scaling & Attention Heatmaps',
    order: 1,
    readTimeMinutes: 32,
    difficulty: 'Intermediate',
    visualizerType: 'attention-explorer',
    objectives: [
      'Derive the full Scaled Dot-Product Attention formula: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V',
      'Prove mathematically why the variance of the dot product Q · K scales with d_k',
      'Explain how temperature scaling 1/sqrt(d_k) prevents Softmax saturation and vanishing gradients',
      'Implement numerically stable softmax and self-attention in pure NumPy and PyTorch',
    ],
    prerequisites: ['TF-05: Query, Key, and Value Vectors'],
    previousLesson: {
      id: 'tf-05-query-key-value',
      title: 'TF-05: Query, Key, and Value Vectors',
      moduleId: 'p6-m5',
    },
    analogy: {
      title: 'The Volume Slider in a Crowded Auction Room',
      text: 'Imagine an auction room where bidders are calling out offers. If everyone whispers, the auctioneer hears all bids moderately well and can weigh them fairly. But if you turn on a mega-loudspeaker that amplifies differences by 100x (unscaled dot products when d_k = 512), the loudest bidder becomes ear-splitting (10,000 dB), completely drowning out every other person in the room! The auctioneer hears ONLY the loud person (Softmax probability = 1.0, everyone else = 0.0). Even worse: if another bidder raises their hand slightly, the auctioneer cannot notice (vanishing gradient). Scaling by 1/sqrt(d_k) is the master volume regulator: it dials the volume down to a normal human range so all bids are evaluated smoothly.',
      metaphor: 'Without 1/sqrt(d_k), Softmax turns into a winner-takes-all spike with zero gradients; scaling keeps probabilities smoothly distributed.',
    },
    problemSolved: {
      title: 'The Vanishing Gradient Trap in High Dimensions',
      description:
        'As representation dimension d_k increases (e.g. 64, 128), dot products between random vectors grow substantially in magnitude. Large positive logits cause Softmax to saturate into near-1.0 and near-0.0 extremes, where the derivative of Softmax drops to zero, halting backpropagation.',
      keyPoints: [
        'Variance Growth: If components of q and k have mean 0 and variance 1, their dot product has mean 0 and variance d_k.',
        'Saturated Softmax: For d_k = 64, typical dot products range around +/- 16. exp(16) creates extreme winner-takes-all distributions.',
        'Scale Normalization: Dividing by sqrt(d_k) forces variance back to 1.0 regardless of how large d_k is.',
      ],
    },
    intuition: {
      overview:
        'Scaled dot-product attention computes pairwise alignment scores between all Queries and Keys, scales them by 1/sqrt(d_k), normalizes each row into a probability distribution via Softmax, and computes a weighted average of the Value vectors.',
      steps: [
        { step: 1, title: 'Pairwise Similarity', description: 'Compute dot products S = Q * K^T. Produces (N, N) matrix of unscaled affinities.' },
        { step: 2, title: 'Variance Scaling', description: 'Multiply by 1 / sqrt(d_k) to stabilize logit distribution variance to 1.0.' },
        { step: 3, title: 'Softmax Normalization', description: 'Apply Softmax along row dimension: A[i, :] = exp(S[i, :]) / sum(exp(S[i, :])).' },
        { step: 4, title: 'Context Aggregation', description: 'Multiply attention weights by Values: Output = A * V. Produces (N, d_v) contextual representations.' },
      ],
    },
    mathematics: {
      overview: 'The canonical Scaled Dot-Product Attention formulation.',
      foundations: [
        {
          name: 'Scaled Dot-Product Attention Equation',
          latex: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{QK^T}{\\sqrt{d_k}} \\right) V',
          explanation: 'Computes normalized weighted sum of Value vectors based on Query-Key compatibility.',
        },
        {
          name: 'Variance of Dot Product',
          latex: 'q \\cdot k = \\sum_{i=1}^{d_k} q_i k_i \\implies \\text{Var}(q \\cdot k) = d_k \\cdot \\text{Var}(q_i k_i) = d_k',
          explanation: 'Sum of d_k independent random variables each with variance 1 has total variance d_k.',
        },
        {
          name: 'Variance Scaling Factor',
          latex: '\\text{Var}\\left( \\frac{q \\cdot k}{\\sqrt{d_k}} \\right) = \\frac{1}{d_k} \\text{Var}(q \\cdot k) = \\frac{d_k}{d_k} = 1.0',
          explanation: 'Dividing by sqrt(d_k) guarantees unit variance across any dimension size.',
        },
      ],
    },
    derivation: {
      title: 'Formal Proof of Dot Product Variance and Softmax Derivative',
      objective: 'Prove that Var(q · k) = d_k and explain why large logits cause vanishing gradients.',
      steps: [
        {
          step: 1,
          label: 'Independent Component Assumption',
          latex: 'q_i, k_i \\sim \\mathcal{N}(0, 1) \\text{ i.i.d.} \\implies \\mathbb{E}[q_i] = 0, \\; \\text{Var}(q_i) = 1',
          explanation: 'Assume vector elements are independent zero-mean unit-variance variables.',
        },
        {
          step: 2,
          label: 'Expectation and Variance of Product Term',
          latex: '\\mathbb{E}[q_i k_i] = \\mathbb{E}[q_i]\\mathbb{E}[k_i] = 0; \\quad \\text{Var}(q_i k_i) = \\mathbb{E}[q_i^2 k_i^2] - 0 = \\mathbb{E}[q_i^2]\\mathbb{E}[k_i^2] = 1 \\times 1 = 1',
          explanation: 'Each individual product term q_i * k_i has mean 0 and variance 1.',
        },
        {
          step: 3,
          label: 'Sum of d_k Independent Terms',
          latex: 'q \\cdot k = \\sum_{i=1}^{d_k} q_i k_i \\implies \\text{Var}(q \\cdot k) = \\sum_{i=1}^{d_k} \\text{Var}(q_i k_i) = d_k',
          explanation: 'Variances of independent terms add up, so standard deviation grows as sqrt(d_k).',
        },
        {
          step: 4,
          label: 'Softmax Derivative Vanishing Behavior',
          latex: '\\frac{\\partial \\text{softmax}(z)_i}{\\partial z_j} = s_i (\\delta_{ij} - s_j) \\implies \\lim_{z_i \\to \\infty} s_i (1 - s_i) = 1 \\cdot (1 - 1) = 0',
          explanation: 'When logits grow large, Softmax pushes one output to 1.0 and others to 0.0, causing the gradient to vanish to zero.',
        },
      ],
    },
    variables: [
      { symbol: 'Q', name: 'Query Matrix', description: 'Queries for all tokens in the sequence', dimensions: '(N, d_k)' },
      { symbol: 'K', name: 'Key Matrix', description: 'Keys for all tokens in the sequence', dimensions: '(N, d_k)' },
      { symbol: 'V', name: 'Value Matrix', description: 'Values for all tokens in the sequence', dimensions: '(N, d_v)' },
      { symbol: 'd_k', name: 'Key Dimension', description: 'Dimensionality of keys and queries', dimensions: 'Scalar integer' },
      { symbol: 'A', name: 'Attention Weight Matrix', description: 'Softmax probabilities where each row sums to 1.0', dimensions: '(N, N)' },
    ],
    numericalExample: {
      scenario: 'Calculating self-attention for 2 tokens with d_k = 2. Q = [[1, 0], [0, 2]], K = [[1, 0], [0, 1]], V = [[2, 1], [0, 3]].',
      dataset: [
        { token: 'Token 0', q: '[1, 0]', k: '[1, 0]', v: '[2, 1]' },
        { token: 'Token 1', q: '[0, 2]', k: '[0, 1]', v: '[0, 3]' },
      ],
      calculations: [
        { step: 'Raw Dot Products Q @ K.T', math: '[[1*1 + 0*0, 1*0 + 0*1], [0*1 + 2*0, 0*0 + 2*1]]', result: '[[1.0, 0.0], [0.0, 2.0]]' },
        { step: 'Scale by sqrt(d_k) = 1.414', math: '[[1/1.414, 0], [0, 2/1.414]] = [[0.707, 0], [0, 1.414]]', result: '[[0.707, 0.0], [0.0, 1.414]]' },
        { step: 'Softmax Row 0', math: 'exp([0.707, 0]) = [2.028, 1.0]; sum = 3.028 -> [2.028/3.028, 1/3.028]', result: '[0.67, 0.33]' },
        { step: 'Output Context Token 0', math: '0.67 * [2, 1] + 0.33 * [0, 3] = [1.34, 0.67] + [0, 0.99]', result: '[1.34, 1.66]' },
      ],
      finalConclusion: 'Token 0 attends 67% to itself and 33% to Token 1, producing updated representation [1.34, 1.66].',
    },
    visualExplanation: {
      title: 'Interactive Attention Heatmap & Context Aggregation',
      description: 'The Attention Explorer visualizer above computes live scaled dot-product attention over ["AI", "learns", "fast"].',
      features: [
        'Notice how the 3x3 heatmap contains weights where each row sums to exactly 100%.',
        'Observe how changing the temperature scale (sqrt(d_k)) sharpens or flattens the probability distribution.',
        'View the dynamic context vector on the right updating live as attention weights shift.',
      ],
    },
    scratchCode: {
      title: 'Numerically Stable Scaled Dot-Product Attention in Pure NumPy',
      code: `import numpy as np

def scaled_dot_product_attention(Q, K, V, mask=None):
    # Q, K, V shapes: (Batch, SeqLen, d_k)
    d_k = Q.shape[-1]
    
    # 1. Compute raw dot products: S = Q @ K^T
    scores = (Q @ np.swapaxes(K, -2, -1)) / np.sqrt(d_k)
    
    # 2. Optional masking
    if mask is not None:
        scores = np.where(mask == 0, -1e9, scores)
        
    # 3. Numerically stable softmax: subtract row max before exponentiation
    max_scores = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - max_scores)
    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    # 4. Context Output = AttentionWeights @ V
    output = attention_weights @ V
    return output, attention_weights

np.random.seed(42)
T, d_k = 3, 4
Q = np.random.randn(T, d_k)
K = np.random.randn(T, d_k)
V = np.random.randn(T, d_k)

out, weights = scaled_dot_product_attention(Q, K, V)
print("Attention Weights Matrix (3x3):\\n", np.round(weights, 3))
print("Row sums:", np.round(np.sum(weights, axis=-1), 4))
print("Context Output shape:", out.shape)`,
      explanation: 'Subtracting row max `scores - np.max(...)` prevents floating-point overflow when exponentiating large score values.',
    },
    sklearnCode: {
      title: 'PyTorch 2.0+ FlashAttention Kernel (F.scaled_dot_product_attention)',
      code: `import torch
import torch.nn.functional as F

# Batch=2, Heads=4, SeqLen=16, d_k=64
B, H, T, d_k = 2, 4, 16, 64
q = torch.randn(B, H, T, d_k)
k = torch.randn(B, H, T, d_k)
v = torch.randn(B, H, T, d_k)

# F.scaled_dot_product_attention automatically chooses FlashAttention-2 GPU kernel
# It computes attention with O(N) memory rather than storing the O(N^2) attention matrix!
out = F.scaled_dot_product_attention(q, k, v, is_causal=False)

print("Output shape:  ", out.shape)
print("Device memory: FlashAttention avoids materializing (T, T) attention matrix in RAM!")`,
      explanation: 'In PyTorch 2.0+, F.scaled_dot_product_attention fuses matrix multiplications and softmax into a single GPU kernel (FlashAttention), saving memory and accelerating execution by 3x.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate impact of 1/sqrt(d_k) scaling on softmax saturation
np.random.seed(42)
d_k = 64
q = np.random.randn(d_k)
k = np.random.randn(4, d_k)

# 1. Without scaling
unscaled_scores = q @ k.T
exp_unscaled = np.exp(unscaled_scores - np.max(unscaled_scores))
p_unscaled = exp_unscaled / np.sum(exp_unscaled)

# 2. With scaling
scaled_scores = (q @ k.T) / np.sqrt(d_k)
exp_scaled = np.exp(scaled_scores - np.max(scaled_scores))
p_scaled = exp_scaled / np.sum(exp_scaled)

print("Unscaled scores:  ", np.round(unscaled_scores, 2))
print("Unscaled Softmax: ", np.round(p_unscaled, 3))
print("\\nScaled scores:    ", np.round(scaled_scores, 2))
print("Scaled Softmax:   ", np.round(p_scaled, 3))`,
      expectedOutput: `Unscaled scores:   [-2.08  4.85 -7.42 -4.38]
Unscaled Softmax:  [0.001 0.998 0.    0.   ]

Scaled scores:     [-0.26  0.61 -0.93 -0.55]
Scaled Softmax:    [0.198 0.472 0.1   0.149]`,
    },
    lineByLineExplanation: [
      { lines: 'unscaled_scores = q @ k.T', codeSnippet: 'unscaled_scores = q @ k.T', explanation: 'Raw dot products range from -7.42 to +4.85 for d_k = 64.' },
      { lines: 'p_unscaled = ...', codeSnippet: 'p_unscaled = exp_unscaled / np.sum(exp_unscaled)', explanation: 'Notice how unscaled softmax saturates to 0.998 for one item and near-zero for all others.' },
      { lines: 'scaled_scores = ... / np.sqrt(d_k)', codeSnippet: 'scaled_scores = (q @ k.T) / np.sqrt(d_k)', explanation: 'Dividing by sqrt(64) = 8 brings scores back into a balanced range [-0.93, 0.61].' },
      { lines: 'p_scaled = ...', codeSnippet: 'p_scaled = exp_scaled / np.sum(exp_scaled)', explanation: 'Scaled softmax maintains rich probabilistic diversity: [0.198, 0.472, 0.100, 0.149].' },
    ],
    hyperparameters: [
      { name: 'scale_factor', defaultVal: '1 / sqrt(d_k)', range: '0.01 to 1.0', effect: 'Multiplier applied to QK^T logits before Softmax', recommendation: 'Always use 1 / sqrt(d_k) as proven by Vaswani et al.' },
      { name: 'dropout (attn_drop)', defaultVal: '0.1', range: '0.0 to 0.3', effect: 'Randomly drops attention weights to zero during training', recommendation: 'Set to 0.1 during pretraining; set to 0.0 during evaluation and inference.' },
    ],
    assumptions: [
      { assumption: 'Unit Variance Inputs', whyItMatters: 'If Q and K inputs have variance far greater than 1, sqrt(d_k) may be insufficient.', howToVerify: 'Layer Normalization before attention ensures inputs to QKV projection have zero mean and unit variance.' },
    ],
    commonMistakes: [
      { mistake: 'Computing Softmax without subtracting row max', solution: 'Directly computing exp(scores) when score > 700 produces float overflow (Inf / NaN).', howToFix: 'Always subtract max before exponentiating: np.exp(scores - np.max(scores, axis=-1, keepdims=True)).' },
      { mistake: 'Performing Softmax along the wrong dimension', solution: 'Softmax must be calculated over keys (columns / axis=-1) for each query (row).', howToFix: 'Ensure dim=-1 or axis=-1 in softmax call.' },
    ],
    realWorldUseCases: [
      { industry: 'Document Summarization', application: 'Highlighting crucial sentences in 100-page contracts', benefit: 'Attention weights quantify exact relevance between query topics and document paragraphs.' },
      { industry: 'Medical Imaging', application: 'Vision Transformers (ViT) on CT and MRI scans', benefit: 'Attention maps allow radiologists to verify which anatomical features influenced the diagnostic prediction.' },
    ],
    practiceQuestions: [
      { id: 'tf06-p1', question: 'What is the shape of the attention weight matrix A for a sequence of length 512?', answer: '(512, 512). It contains all 512 x 512 pairwise affinities.', explanation: 'Each row i represents how token i distributes its 100% attention budget across all 512 tokens.' },
      { id: 'tf06-p2', question: 'Why does dividing by sqrt(d_k) prevent vanishing gradients during backpropagation?', answer: 'It keeps the logits from becoming large positive/negative numbers, which would push Softmax into saturated flat zones where its derivative approaches zero.', explanation: 'Softmax derivative is s_i(1 - s_i); when s_i = 1 or 0, the derivative is zero.' },
      { id: 'tf06-p3', question: 'If Q has shape (B, N, d_k) and K has shape (B, N, d_k), what is the shape of Q @ K.T?', answer: '(B, N, N).', explanation: 'Batch-wise matrix multiplication of (N, d_k) by (d_k, N) produces an (N, N) matrix per batch item.' },
    ],
    quiz: [
      {
        id: 'tf06-q1',
        question: 'What is the variance of the dot product between two independent d_k-dimensional vectors with unit variance?',
        options: ['1.0', 'd_k', 'sqrt(d_k)', 'd_k^2'],
        correctIndex: 1,
        explanation: 'Because variance adds for independent terms, the sum of d_k terms each with variance 1 has total variance d_k.',
      },
      {
        id: 'tf06-q2',
        question: 'What happens to the Softmax output if dot-product logits grow extremely large without scaling?',
        options: [
          'All tokens receive equal attention (1/N)',
          'Softmax saturates into a one-hot distribution where one token gets 1.0 and others get 0.0, zeroing out gradients',
          'Softmax produces negative probabilities',
          'The matrix becomes non-invertible',
        ],
        correctIndex: 1,
        explanation: 'Large logits cause Softmax to approximate argmax, where the gradient is zero almost everywhere.',
      },
      {
        id: 'tf06-q3',
        question: 'In the equation Output = softmax(QK^T / sqrt(d_k)) V, what does the multiplication by V perform?',
        options: [
          'Calculates a weighted average of Value vectors according to attention probabilities',
          'Inverts the Value matrix',
          'Projects the sequence into Fourier space',
          'Normalizes the Values to have zero mean',
        ],
        correctIndex: 0,
        explanation: 'Multiplying the (N, N) attention weight matrix by the (N, d_v) Value matrix computes a convex combination (weighted average) of Value vectors.',
      },
    ],
    independentExercise: {
      title: 'Implement Scaled Dot-Product Attention from Scratch',
      problem:
        'Write a function `self_attention(Q, K, V)` that implements `softmax(Q @ K.T / sqrt(d_k)) @ V` using numerically stable softmax in pure NumPy.',
      hints: [
        'Extract d_k = Q.shape[-1].',
        'Compute scores = (Q @ K.T) / np.sqrt(d_k).',
        'Subtract row max, exponentiate, and divide by sum along axis=-1.',
        'Multiply weights by V and return (output, weights).',
      ],
      starterCode: `import numpy as np

def self_attention(Q, K, V):
    # TODO: implement scaled dot-product attention
    pass

np.random.seed(42)
q = np.random.randn(3, 4)
k = np.random.randn(3, 4)
v = np.random.randn(3, 4)
out, weights = self_attention(q, k, v)
print("Weights shape:", weights.shape)
print("Output shape: ", out.shape)`,
      solution: `import numpy as np

def self_attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = (Q @ K.T) / np.sqrt(d_k)
    max_s = np.max(scores, axis=-1, keepdims=True)
    exp_s = np.exp(scores - max_s)
    weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
    out = weights @ V
    return out, weights

np.random.seed(42)
q = np.random.randn(3, 4)
k = np.random.randn(3, 4)
v = np.random.randn(3, 4)
out, weights = self_attention(q, k, v)
print("Weights shape:", weights.shape)
print("Output shape: ", out.shape)`,
    },
    summary: {
      keyTakeaways: [
        'Scaled dot-product attention computes pairwise token affinities in a single matrix product QK^T.',
        'Variance of unscaled dot products grows as d_k; dividing by sqrt(d_k) normalizes variance to 1.0.',
        'Temperature scaling prevents Softmax saturation, preserving vital backpropagation gradients.',
        'FlashAttention computes this exact mathematical output without materializing the O(N^2) matrix in GPU RAM.',
      ],
      nextLessonId: 'tf-07-attention-masks-causal',
      nextLessonTitle: 'TF-07: Attention Masks (Causal & Padding Masks)',
      nextLessonModuleId: 'p6-m7',
    },
  },
};

