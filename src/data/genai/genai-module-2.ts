import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 4: Embeddings and Representations (p7-m4)
// =========================================================================
export const p7m4Data: ModuleData = {
  id: 'p7-m4',
  number: 4,
  title: 'Embeddings and Representations',
  subtitle: 'Dense Latent Geometries, Cosine Metrics & Representation Anisotropy',
  description:
    'Investigate the continuous geometric representations that power modern foundation models. Contrast static lookup token embeddings with deep contextual hidden representations. Examine high-dimensional vector spaces, dot product attention alignments, cosine similarity metrics, and critical mathematical limitations including vector norm neglect, hubness phenomena, and representation collapse in narrow anisotropic cones.',
  icon: 'Compass',
  badge: 'Phase 7 · GenAI & LLMs',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'genai-04-embeddings-representations',
      moduleId: 'p7-m4',
      title: 'GenAI-04: Embeddings and Representations',
      description:
        'Contextual embedding spaces, vector arithmetic, cosine geometry, representation collapse, and high-dimensional hubness.',
      order: 1,
      readTimeMinutes: 32,
      visualizerType: 'embedding-similarity-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 5: Pretraining (p7-m5)
// =========================================================================
export const p7m5Data: ModuleData = {
  id: 'p7-m5',
  number: 5,
  title: 'Pretraining',
  subtitle: 'Web-Scale Corpora, Causal Next-Token Loss & Scaling Laws',
  description:
    'Deconstruct the self-supervised pretraining crucible where foundation models spend 99% of their compute budget. Analyze data curation pipelines (Common Crawl, FineWeb, MinHash deduplication, quality filtering). Derive the causal language-modeling cross-entropy objective and Perplexity metric. Examine test set contamination audits, Chinchilla compute-optimal scaling laws (6ND FLOPs), and multi-million dollar cluster economics.',
  icon: 'Activity',
  badge: 'Phase 7 · GenAI & LLMs',
  estimatedHours: 4,
  topicsCount: 1,
  lessons: [
    {
      id: 'genai-05-pretraining-dynamics',
      moduleId: 'p7-m5',
      title: 'GenAI-05: Pretraining Dynamics',
      description:
        'Data filtering pipelines, cross-entropy next-token loss, perplexity evaluation, Chinchilla scaling laws, and compute FLOPs accounting.',
      order: 1,
      readTimeMinutes: 38,
      visualizerType: 'perplexity-loss-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 6: Inference and Decoding (p7-m6)
// =========================================================================
export const p7m6Data: ModuleData = {
  id: 'p7-m6',
  number: 6,
  title: 'Inference and Decoding',
  subtitle: 'Softmax Scaling, Nucleus Sampling & Repetition Safeguards',
  description:
    'Master the algorithmic mechanics of transforming model output logits into coherent conversational text. Contrast greedy search with stochastic sampling. Explore the mathematical formulation of Temperature scaling, Top-K truncation, and Top-P (Nucleus) cumulative mass selection. Examine pseudorandom seed reproducibility, frequency and presence repetition penalties, and deterministic stopping criteria.',
  icon: 'Flame',
  badge: 'Phase 7 · GenAI & LLMs',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'genai-06-inference-and-decoding',
      moduleId: 'p7-m6',
      title: 'GenAI-06: Inference and Decoding',
      description:
        'Logits transformations, Temperature flattening, Top-K vs Top-P nucleus sampling, repetition penalties, and seed control.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'temperature-sampling-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS
// =========================================================================
export const genaiModule2Lessons: Record<string, LessonContent> = {
  'genai-04-embeddings-representations': {
    id: 'genai-04-embeddings-representations',
    moduleId: 'p7-m4',
    title: 'GenAI-04: Embeddings and Representations',
    subtitle: 'From Static Word Vectors to Dynamic Contextual Representation Manifolds',
    order: 1,
    readTimeMinutes: 32,
    difficulty: 'Intermediate',
    visualizerType: 'embedding-similarity-explorer',

    objectives: [
      'Contrast static input token embeddings (Word2Vec / lookup tables) with dynamic contextual representations output by Transformer layers',
      'Calculate Dot Product, Euclidean Distance, and Cosine Similarity across dense high-dimensional vectors',
      'Analyze the geometric phenomenon of Representation Anisotropy (the "narrow cone" problem in deep LLM layers)',
      'Explain the "Hubness Problem" in high-dimensional vector spaces and its impact on nearest-neighbor semantic search',
      'Evaluate why Cosine Similarity neglects vector norms and when dot product or Mahalanobis distance is mathematically superior',
    ],
    prerequisites: [
      'TF-03: Token Embeddings & Latent Space',
      'Basic linear algebra (dot products, vector norms, orthogonal projections)',
    ],
    previousLesson: {
      id: 'genai-03-tokenization-in-llms',
      title: 'GenAI-03: Tokenization in Large Language Models',
      moduleId: 'p7-m3',
    },

    analogy: {
      title: 'The Static Dictionary versus The Living Mind',
      text: 'A static token embedding is like a printed dictionary: looking up the word "bank" gives a single fixed definition regardless of the sentence. A contextual embedding is like an active human brain: when reading "river bank", the neural activations for "bank" light up with concepts of water, mud, and geography; when reading "investment bank", the exact same token triggers financial concepts of capital, interest, and ledgers.',
      metaphor: 'Contextual embeddings dynamically morph their coordinates based on surrounding attention context.',
    },

    problemSolved: {
      title: 'Why Static Embeddings Fail at Language Modeling',
      description:
        'Human language is deeply polysemous: words change meaning entirely based on surrounding syntax and domain. Deep Transformer layers solve this by passing token embeddings through dozens of multi-head self-attention layers, allowing each token representation to absorb semantic information from every other word in the sequence.',
      keyPoints: [
        'Disambiguates polysemous words through contextual self-attention mixing',
        'Maps words, sentences, and documents into continuous geometric manifolds where linear relationships encode semantic relationships',
        'Serves as the universal semantic currency for downstream vector search, reranking, and classification',
      ],
    },

    intuition: {
      overview:
        'An embedding vector is an array of floating-point numbers (e.g. 4096 dimensions in Llama 3) where each dimension represents an abstract, learned semantic latent feature.',
      steps: [
        {
          step: 1,
          title: 'Input Lookup to Latent Space',
          description:
            'A discrete token ID is mapped to an initial continuous vector via lookup table W_embed in R^(V x d). At this stage, representations are static and context-free.',
        },
        {
          step: 2,
          title: 'Contextual Enrichment via Attention',
          description:
            'Across successive transformer blocks, query-key attention updates each token vector by weighted sums of neighboring value vectors.',
        },
        {
          step: 3,
          title: 'Geometric Clustering in Latent Space',
          description:
            'Semantically related concepts cluster together in high-dimensional space, allowing distance metrics to quantify conceptual similarity.',
        },
      ],
    },

    mathematics: {
      overview:
        'Quantifying similarity between embedding vectors relies on inner products and normalized angular distance.',
      foundations: [
        {
          name: 'Cosine Similarity',
          latex: '\\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2} = \\frac{\\sum_{i=1}^d u_i v_i}{\\sqrt{\\sum_{i=1}^d u_i^2} \\sqrt{\\sum_{i=1}^d v_i^2}}',
          explanation:
            'Measures the cosine of the angle between two vectors, ranging from -1 (opposite) to +1 (identical direction), invariant to vector magnitude.',
        },
        {
          name: 'Euclidean L2 Distance Relation to Cosine Similarity',
          latex: '\\|\\mathbf{u} - \\mathbf{v}\\|_2^2 = \\|\\mathbf{u}\\|_2^2 + \\|\\mathbf{v}\\|_2^2 - 2 (\\mathbf{u} \\cdot \\mathbf{v}) = 2 - 2 \\cos(\\theta) \\quad (\\text{when } \\|\\mathbf{u}\\| = \\|\\mathbf{v}\\| = 1)',
          explanation:
            'For unit-normalized vectors, minimizing Euclidean distance is strictly equivalent to maximizing cosine similarity.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Representation Anisotropy in Deep LLMs',
      objective: 'Demonstrate mathematically why embeddings in deep models collapse into a narrow directional cone.',
      steps: [
        {
          step: 1,
          label: 'Definition of Representation Anisotropy',
          latex: '\\mathbb{E}_{\\mathbf{u}, \\mathbf{v}} [\\cos(\\mathbf{u}, \\mathbf{v})] \\gg 0 \\quad (\\text{e.g. } \\approx 0.85)',
          explanation: 'In an isotropic space, random vectors are nearly orthogonal (mean cosine ~ 0). In deep LLMs, all token vectors point into a narrow, skewed cone with high positive baseline similarity.',
        },
        {
          step: 2,
          label: 'Root Cause: Word Frequency Bias in Unembedding',
          latex: 'h_t = W_{\\text{embed}} x_t + \\sum_l \\Delta h^{(l)}',
          explanation: 'Because token frequencies follow Zipfs law, gradients during pretraining push representations in the direction of dominant, high-frequency word vectors.',
        },
        {
          step: 3,
          label: 'Mitigation via Mean Centering / Whitening',
          latex: '\\tilde{\\mathbf{u}} = \\mathbf{u} - \\boldsymbol{\\mu}, \\quad \\boldsymbol{\\mu} = \\frac{1}{N} \\sum_{i=1}^N \\mathbf{u}_i',
          explanation: 'Subtracting the global mean vector restores directional variance across the full coordinate sphere.',
        },
      ],
    },

    variables: [
      { symbol: '\\mathbf{u}, \\mathbf{v}', name: 'Embedding Vectors', description: 'Dense feature vectors living in R^d.' },
      { symbol: 'd', name: 'Embedding Dimensionality', description: 'Number of latent dimensions (e.g. 1536 in text-embedding-3, 4096 in Llama-3-8B).' },
      { symbol: '\\|\\mathbf{u}\\|_2', name: 'L2 Norm / Magnitude', description: 'Euclidean length of the embedding vector in latent space.' },
      { symbol: '\\theta', name: 'Subtended Angle', description: 'Angular divergence between two semantic trajectories.' },
    ],

    numericalExample: {
      scenario: 'Compute the Dot Product, Norms, and Cosine Similarity between a query vector and two candidate document vectors in R^3.',
      dataset: [
        { item: 'Query q', v1: 1.0, v2: 2.0, v3: 0.0 },
        { item: 'Doc A', v1: 2.0, v2: 4.0, v3: 0.0 },
        { item: 'Doc B', v1: 0.0, v2: 0.0, v3: 5.0 },
      ],
      calculations: [
        {
          step: 'Query & Candidate Norms',
          math: '||q|| = sqrt(1^2 + 2^2) = sqrt(5) = 2.236; ||DocA|| = sqrt(2^2 + 4^2) = sqrt(20) = 4.472; ||DocB|| = 5.0',
          result: 'q has norm 2.236, DocA has norm 4.472, DocB has norm 5.0',
        },
        {
          step: 'Dot Products and Cosine Similarities',
          math: 'q * DocA = 1*2 + 2*4 + 0 = 10; cos(q, DocA) = 10 / (2.236 * 4.472) = 10 / 10 = 1.0; q * DocB = 0; cos(q, DocB) = 0.0',
          result: 'Doc A has perfect cosine similarity 1.0 (identical direction despite 2x magnitude); Doc B is orthogonal (0.0).',
        },
      ],
      finalConclusion: 'Cosine similarity identifies Doc A as a perfect match because direction encodes topic, while magnitude is ignored.',
    },

    visualExplanation: {
      title: 'Vector Arithmetic & Semantic Geometry',
      description: 'How linear algebra in high-dimensional embedding spaces captures analogical reasoning.',
      features: [
        'King - Man + Woman = Queen: Famous vector arithmetic demonstrates that gender is encoded as a consistent directional offset.',
        'Anisotropic Cone: Notice how un-normalized embeddings often cluster within a narrow quadrant; cosine normalization projects them onto the unit hypersphere.',
        'The Hubness Problem: In high dimensions (d > 1000), certain popular vectors become nearest neighbors to vast numbers of unrelated queries.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Vector Similarities & Anisotropy Centering',
      code: `import numpy as np

# Set deterministic seed
np.random.seed(42)

def cosine_similarity(u, v):
    """Compute exact cosine similarity between two 1D numpy vectors."""
    dot = np.dot(u, v)
    norm_u = np.linalg.norm(u)
    norm_v = np.linalg.norm(v)
    if norm_u == 0 or norm_v == 0:
        return 0.0
    return dot / (norm_u * norm_v)

# Simulate 3 concept embeddings in R^4
v_king = np.array([0.8, 0.4, 0.1, 0.3])
v_man = np.array([0.7, 0.1, 0.1, 0.3])
v_woman = np.array([0.2, 0.1, 0.8, 0.3])
v_queen_target = v_king - v_man + v_woman

print("v_king norm:", np.round(np.linalg.norm(v_king), 3))
print("Cosine(king, man):", np.round(cosine_similarity(v_king, v_man), 3))
print("Analogy Vector (Queen):", np.round(v_queen_target, 3))`,
      explanation: 'Computes dot products, norms, and vector arithmetic directly using native NumPy arrays.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Integration: Pairwise Cosine Distance & Normalization',
      code: `import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import normalize

# 3 documents embedded in R^3
embeddings = np.array([
    [1.0, 2.0, 0.0],  # Doc 1
    [2.0, 4.0, 0.0],  # Doc 2 (same direction as Doc 1)
    [0.0, 1.0, 3.0],  # Doc 3
])

# Normalize to unit hypersphere
unit_embeddings = normalize(embeddings, norm='l2')

# Compute full 3x3 pairwise cosine similarity matrix
sim_matrix = cosine_similarity(unit_embeddings)
print("Pairwise Cosine Similarity Matrix:\\n", np.round(sim_matrix, 3))`,
      explanation: 'Uses scikit-learn normalize and cosine_similarity to produce a dense pairwise similarity matrix.',
    },

    runnableCode: {
      code: `import numpy as np

# Compute cosine similarity between two deterministic vectors
u = np.array([1.0, 2.0, 3.0])
v = np.array([2.0, 4.0, 5.0])

dot = np.dot(u, v)
norm_u = np.linalg.norm(u)
norm_v = np.linalg.norm(v)
cosine_sim = dot / (norm_u * norm_v)

print(f"Dot Product: {dot:.1f}")
print(f"Norm U: {norm_u:.3f}, Norm V: {norm_v:.3f}")
print(f"Cosine Similarity: {cosine_sim:.4f}")`,
      expectedOutput: 'Dot Product: 25.0\nNorm U: 3.742, Norm V: 6.708\nCosine Similarity: 0.9960',
    },

    lineByLineExplanation: [
      {
        lines: 'dot = np.dot(u, v)',
        codeSnippet: 'np.dot(u, v)',
        explanation: 'Computes sum of element-wise products: 1*2 + 2*4 + 3*5 = 2 + 8 + 15 = 25.0.',
      },
      {
        lines: 'norm_u = np.linalg.norm(u)',
        codeSnippet: 'np.linalg.norm(u)',
        explanation: 'Computes Euclidean L2 norm: sqrt(1^2 + 2^2 + 3^2) = sqrt(14) = 3.742.',
      },
      {
        lines: 'cosine_sim = dot / (norm_u * norm_v)',
        codeSnippet: 'dot / (norm_u * norm_v)',
        explanation: 'Scales inner product by inverse product of norms to isolate purely angular similarity.',
      },
    ],

    hyperparameters: [
      {
        name: 'Embedding Dimension d',
        defaultVal: '1536 / 4096',
        range: '256 to 8192',
        effect: 'Higher dimensions capture finer semantic nuances but increase storage, index memory, and search latency.',
        recommendation: 'Use Matryoshka representation learning if downstream vector storage is constrained.',
      },
    ],

    assumptions: [
      {
        assumption: 'Angular Semantic Hypothesis',
        whyItMatters: 'Assumes semantic relatedness is proportional to the cosine of the angle between vectors, regardless of document length.',
        howToVerify: 'Verify whether short queries correlate with long documents using normalized vs unnormalized metrics.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming high cosine similarity implies factual correctness',
        solution: 'Cosine similarity measures topical and semantic proximity; two sentences asserting opposite factual claims (e.g. "Paris is in France" vs "Paris is in Germany") often have cosine similarity > 0.9.',
      },
      {
        mistake: 'Failing to unit-normalize embeddings before indexing in vector databases',
        solution: 'If vectors are pre-normalized to ||v|| = 1, vector search engines can replace expensive square roots with blazing-fast dot products.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Enterprise Knowledge Management',
        application: 'Semantic Search & RAG Retrieval',
        benefit: 'Enables users to retrieve documents using conceptual keywords rather than brittle exact keyword matches.',
      },
      {
        industry: 'Cybersecurity',
        application: 'Threat Log Anomaly Clustering',
        benefit: 'Detects novel attack vectors by identifying command executions that fall outside normal semantic clusters.',
      },
    ],

    practiceQuestions: [
      {
        id: 'genai-04-pq1',
        question: 'What is Representation Anisotropy in language models?',
        answer: 'Representation Anisotropy is the phenomenon where learned token embeddings cluster within a narrow directional cone in latent space rather than being uniformly distributed, causing even unrelated tokens to have high positive cosine similarity.',
        explanation: 'This occurs due to frequency bias and gradient accumulation during autoregressive pretraining.',
      },
      {
        id: 'genai-04-pq2',
        question: 'What is the Hubness Problem in high-dimensional vector search?',
        answer: 'In high-dimensional spaces (e.g. d > 500), certain vectors ("hubs") mathematically become nearest neighbors to an unusually large fraction of arbitrary query points, skewing retrieval rankings.',
        explanation: 'Hubness arises from high dimensionality and anisotropic distance distributions.',
      },
      {
        id: 'genai-04-pq3',
        question: 'Why do two vectors with identical direction have a cosine similarity of 1.0 even if one vector has 10x the length of the other?',
        answer: 'Because cosine similarity divides the dot product by the product of both vectors\' Euclidean norms: (u * 10u) / (||u|| * 10||u||) = 10 ||u||^2 / (10 ||u||^2) = 1.0. Vector length cancels out completely.',
        explanation: 'Cosine similarity measures only directional alignment, completely ignoring magnitude.',
      },
    ],

    quiz: [
      {
        id: 'genai-04-q1',
        question: 'If two embedding vectors u and v are orthogonal (at 90 degrees to each other), what is their cosine similarity?',
        options: ['0.0', '1.0', '-1.0', '0.5'],
        correctIndex: 0,
        explanation: 'The cosine of 90 degrees is 0; orthogonal vectors have a dot product and cosine similarity of exactly 0.0.',
      },
      {
        id: 'genai-04-q2',
        question: 'When vectors are pre-normalized to have an L2 norm of 1.0, what does Cosine Similarity equal?',
        options: [
          'The simple Dot Product u * v',
          'The Euclidean distance ||u - v||',
          'The Manhattan L1 distance',
          'The Softmax of the vectors',
        ],
        correctIndex: 0,
        explanation: 'When ||u|| = 1 and ||v|| = 1, cos(theta) = (u * v) / (1 * 1) = u * v.',
      },
      {
        id: 'genai-04-q3',
        question: 'Why can two sentences with opposite factual meanings (e.g. "Vaccines are safe" vs "Vaccines are dangerous") have high cosine similarity?',
        options: [
          'Because they share nearly identical vocabulary, syntax, and semantic topical context',
          'Because cosine similarity has a software bug in PyTorch',
          'Because the embedding model was not trained with cross-entropy',
          'Because embedding dimensions must always be odd numbers',
        ],
        correctIndex: 0,
        explanation: 'Embeddings map overall topical context; both sentences discuss vaccines, medicine, and safety, placing them in close semantic proximity.',
      },
    ],

    independentExercise: {
      title: 'Implement an Anisotropy-Corrected Cosine Similarity Function',
      problem:
        'Write a Python function debiased_cosine_similarity(u, v, mean_vector) that first centers both vectors by subtracting mean_vector, and then computes cosine similarity.',
      hints: [
        'Subtract mean_vector from u to get u_centered.',
        'Subtract mean_vector from v to get v_centered.',
        'Compute dot product divided by the product of their L2 norms.',
      ],
      starterCode: `import numpy as np

def debiased_cosine_similarity(u: np.ndarray, v: np.ndarray, mean_vector: np.ndarray) -> float:
    # TODO: Implement mean centering before cosine similarity
    pass

mean_bias = np.array([0.5, 0.5, 0.5])
vec_a = np.array([0.6, 0.7, 0.5])
vec_b = np.array([0.4, 0.3, 0.5])
print("Debiased Similarity:", debiased_cosine_similarity(vec_a, vec_b, mean_bias))`,
      solution: `import numpy as np

def debiased_cosine_similarity(u: np.ndarray, v: np.ndarray, mean_vector: np.ndarray) -> float:
    u_c = u - mean_vector
    v_c = v - mean_vector
    norm_u = np.linalg.norm(u_c)
    norm_v = np.linalg.norm(v_c)
    if norm_u == 0 or norm_v == 0:
        return 0.0
    return float(np.dot(u_c, v_c) / (norm_u * norm_v))

mean_bias = np.array([0.5, 0.5, 0.5])
vec_a = np.array([0.6, 0.7, 0.5])
vec_b = np.array([0.4, 0.3, 0.5])
print("Debiased Similarity:", round(debiased_cosine_similarity(vec_a, vec_b, mean_bias), 4))`,
    },

    summary: {
      keyTakeaways: [
        'Static embeddings provide context-free dictionary lookups; contextual representations dynamically reflect surrounding syntax and meaning.',
        'Cosine similarity measures pure angular alignment and ignores vector magnitude, making it essential to understand when magnitude carries semantic weight.',
        'Deep LLMs suffer from representation anisotropy and hubness, which can be mitigated via mean-centering and contrastive normalization.',
      ],
      nextLessonId: 'genai-05-pretraining-dynamics',
      nextLessonTitle: 'GenAI-05: Pretraining Dynamics',
      nextLessonModuleId: 'p7-m5',
    },
  },

  'genai-05-pretraining-dynamics': {
    id: 'genai-05-pretraining-dynamics',
    moduleId: 'p7-m5',
    title: 'GenAI-05: Pretraining Dynamics',
    subtitle: 'Web-Scale Curation, Cross-Entropy Objectives, Perplexity & Chinchilla Scaling',
    order: 1,
    readTimeMinutes: 38,
    difficulty: 'Advanced',
    visualizerType: 'perplexity-loss-explorer',

    objectives: [
      'Deconstruct the web-scale pretraining pipeline: Common Crawl, deduplication (MinHash), classifier filtering, and synthetic generation',
      'Formulate the Causal Language Modeling objective and calculate token Cross-Entropy loss and Perplexity',
      'Audit training corpora for benchmark contamination and evaluate decontamination protocols',
      'Apply Chinchilla Scaling Laws (Hoffmann et al.) to compute optimal parameter-to-token allocations',
      'Calculate total training FLOPs using the 6ND formula and estimate GPU cluster hardware requirements',
    ],
    prerequisites: [
      'GenAI-02: How LLMs Work',
      'TF-07: Attention Masks (Causal & Padding Masks)',
    ],
    previousLesson: {
      id: 'genai-04-embeddings-representations',
      title: 'GenAI-04: Embeddings and Representations',
      moduleId: 'p7-m4',
    },

    analogy: {
      title: 'Reading the Great Alexandria Library with a Blank Brain',
      text: 'Pretraining is like taking a newborn super-genius and having them read 15 trillion words of human literature, code, scientific papers, and forums over three months. At the start, the genius can only babble random characters. But by predicting every single upcoming word and being gently corrected millions of times per second across 16,000 GPUs, they gradually internalize grammar, logic, world geography, physics, and computer science.',
      metaphor: 'Pretraining builds the foundational world model; post-training (fine-tuning) merely teaches the model how to converse politely.',
    },

    problemSolved: {
      title: 'The Unsupervised Pretraining Revolution',
      description:
        'Before modern pretraining, machine learning was starved of labeled data. Pretraining solved this by turning all raw text into self-supervised training pairs: the previous tokens w_<t are the input features, and the next token w_t is the ground-truth target label. This converts trillions of words on the open web into infinite supervision.',
      keyPoints: [
        'Converts infinite unlabeled text into self-supervised supervision at zero labeling cost',
        'Builds rich, transferable world knowledge and generalizable latent reasoning representations',
        'Establishes predictable scaling laws where loss decreases monotonically as a power law of compute',
      ],
    },

    intuition: {
      overview:
        'Pretraining a modern foundation model involves three core pillars: High-Quality Data Curation, Massive GPU Distributed Training, and Loss Minimization.',
      steps: [
        {
          step: 1,
          title: 'Corpus Cleansing and Deduplication',
          description:
            'Raw web dumps (e.g. Common Crawl) are 90% spam, machine translations, and duplicate pages. Pipelines use MinHash LSH deduplication, language identification, and fastText heuristic quality filters.',
        },
        {
          step: 2,
          title: 'Parallel Causal Next-Token Prediction',
          description:
            'Batches of 4 million tokens are passed across thousands of GPUs. Causal attention masks ensure token t can only attend to tokens <= t.',
        },
        {
          step: 3,
          title: 'Perplexity Monitoring & Annealing',
          description:
            'Training progress is tracked via Cross-Entropy loss and Perplexity. A learning rate cosine schedule with warmup and final decay anneals weights.',
        },
      ],
    },

    mathematics: {
      overview:
        'The mathematics of pretraining spans information-theoretic loss functions and empirical scaling power laws.',
      foundations: [
        {
          name: 'Causal Cross-Entropy Loss & Perplexity',
          latex: '\\mathcal{L}_{\\text{CE}} = -\\frac{1}{N} \\sum_{t=1}^N \\ln P_\\theta(w_t \\mid w_{<t}), \\quad \\text{PPL} = \\exp(\\mathcal{L}_{\\text{CE}})',
          explanation:
            'The mean negative log-likelihood of ground truth tokens across the dataset. Perplexity is the exponentiated loss, representing the effective branching factor.',
        },
        {
          name: 'Chinchilla Compute-Optimal Scaling Law (Hoffmann et al.)',
          latex: 'C \\approx 6 N D, \\quad N_{\\text{optimal}} \\propto C^{0.5}, \\quad D_{\\text{optimal}} \\propto C^{0.5} \\implies D \\approx 20 \\cdot N',
          explanation:
            'For compute-optimal training, dataset tokens D and model parameters N should scale in equal proportion: approximately 20 tokens per model parameter.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of the 6ND Training FLOPs Approximation',
      objective: 'Prove why training a Transformer for one epoch takes approximately 6ND floating point operations.',
      steps: [
        {
          step: 1,
          label: 'Forward Pass FLOPs per Parameter',
          latex: '\\text{FLOPs}_{\\text{forward}} = 2 \\cdot N \\text{ per token}',
          explanation: 'Each parameter participates in 1 multiply-accumulate operation (1 multiply + 1 addition = 2 FLOPs) per token.',
        },
        {
          step: 2,
          label: 'Backward Pass FLOPs per Parameter',
          latex: '\\text{FLOPs}_{\\text{backward}} = 2 \\times \\text{FLOPs}_{\\text{forward}} = 4 \\cdot N \\text{ per token}',
          explanation: 'The backward pass requires computing gradients with respect to activations (2N) AND gradients with respect to parameter weights (2N), totaling 4N FLOPs.',
        },
        {
          step: 3,
          label: 'Total Training Compute',
          latex: 'C_{\\text{train}} = (2N + 4N) \\cdot D = 6ND \\text{ FLOPs}',
          explanation: 'Combining forward and backward passes across D total training tokens yields the universal 6ND training FLOPs formula.',
        },
      ],
    },

    variables: [
      { symbol: 'N', name: 'Model Parameter Count', description: 'Total non-embedding trainable weights in the Transformer.' },
      { symbol: 'D', name: 'Dataset Size in Tokens', description: 'Total number of tokens ingested during pretraining (e.g. 15 Trillion in Llama 3).' },
      { symbol: 'C', name: 'Compute Budget (FLOPs)', description: 'Total floating-point operations executed (e.g. 3.8 x 10^25 FLOPs).' },
      { symbol: '\\text{PPL}', name: 'Perplexity', description: 'Uncertainty metric equal to exp(Cross-Entropy Loss).' },
    ],

    numericalExample: {
      scenario: 'Compute optimal training tokens D and training duration for an 8-Billion parameter model on a cluster of 1,024 H100 GPUs (each achieving 300 TFLOPs sustained at FP16).',
      dataset: [
        { param: 'Model Size N', val: 8e9 },
        { param: 'Tokens D (Chinchilla)', val: 160e9 },
        { param: 'Tokens D (Llama 3 Over-trained)', val: 1.5e13 },
      ],
      calculations: [
        {
          step: 'Chinchilla Optimal Tokens Calculation',
          math: 'D_optimal = 20 * N = 20 * 8,000,000,000 = 160 Billion tokens',
          result: 'Chinchilla minimum is 160B tokens; however, modern inference serving benefits from over-training on 15T tokens.',
        },
        {
          step: 'Compute FLOPs for 15T Tokens',
          math: 'Compute = 6 * N * D = 6 * (8 * 10^9) * (15 * 10^12) = 7.2 * 10^23 FLOPs',
          result: 'Total FLOPs required = 7.2 x 10^23 FLOPs.',
        },
        {
          step: 'Cluster Training Time on 1,024 H100s',
          math: 'Cluster Throughput = 1024 * (300 * 10^12) = 3.072 * 10^17 FLOPs/sec; Seconds = 7.2e23 / 3.072e17 = 2,343,750 s = 27.1 days',
          result: 'Takes approximately 27 days of continuous training across 1,024 H100 GPUs.',
        },
      ],
      finalConclusion: 'Pretraining an 8B model on 15T tokens requires ~27 days on 1,024 H100 GPUs at an estimated hardware cost of ~$1.5M USD.',
    },

    visualExplanation: {
      title: 'Loss Landscape & Chinchilla Scaling Frontier',
      description: 'How cross-entropy loss predictably falls as compute and data scale exponentially.',
      features: [
        'Smooth Power Law Curves: Pretraining loss follows L(C) = (C_c / C)^alpha. Loss never plateaus abruptly; it obeys strict power laws.',
        'Over-training for Inference: While Chinchilla prescribes 20 tokens/param for training efficiency, models are trained on 100x more tokens so the resulting checkpoint is smaller and cheaper to serve.',
        'Data Contamination Audits: 8-gram and 13-gram overlap filters prevent benchmark questions (GSM8K, MMLU) from leaking into pretraining datasets.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Causal Cross-Entropy Loss & Perplexity Engine',
      code: `import numpy as np

np.random.seed(42)

def compute_causal_cross_entropy(logits, target_ids):
    """
    Compute exact Causal Cross-Entropy loss and Perplexity.
    logits: (seq_len, vocab_size)
    target_ids: (seq_len,)
    """
    seq_len, vocab_size = logits.shape
    # Softmax with numerical stability
    max_logits = np.max(logits, axis=-1, keepdims=True)
    exps = np.exp(logits - max_logits)
    probs = exps / np.sum(exps, axis=-1, keepdims=True)

    # Extract target token probabilities P(target_t | context)
    target_probs = probs[np.arange(seq_len), target_ids]
    # Negative log-likelihood (nats)
    nll = -np.log(np.maximum(target_probs, 1e-12))
    mean_loss = float(np.mean(nll))
    ppl = float(np.exp(mean_loss))

    return mean_loss, ppl, target_probs

# Simulate 4 tokens over vocab of size 6
mock_logits = np.array([
    [2.1, 0.5, 0.1, 4.2, 0.3, 0.8], # target: 3
    [0.2, 3.8, 1.1, 0.5, 0.4, 0.2], # target: 1
    [1.5, 0.4, 3.9, 0.2, 0.1, 0.5], # target: 2
    [0.1, 0.2, 0.3, 0.4, 4.1, 0.5], # target: 4
])
targets = np.array([3, 1, 2, 4])

loss, ppl, probs = compute_causal_cross_entropy(mock_logits, targets)
print(f"Mean Cross-Entropy Loss: {loss:.4f} nats")
print(f"Perplexity (PPL): {ppl:.2f}")
print("Target token probabilities:", np.round(probs, 3))`,
      explanation: 'Computes exact token-level negative log-likelihood and exponentiates to calculate Perplexity.',
    },

    sklearnCode: {
      title: 'PyTorch CrossEntropyLoss Implementation for Causal Language Models',
      code: `# Standard PyTorch Causal Language Model loss computation
import torch
import torch.nn as nn

# logits: (batch_size, seq_len, vocab_size)
# targets: (batch_size, seq_len)
criterion = nn.CrossEntropyLoss(ignore_index=-100) # ignore padding

def compute_loss(logits, targets):
    # Shift so that tokens < t predict token t
    shift_logits = logits[..., :-1, :].contiguous()
    shift_labels = targets[..., 1:].contiguous()
    
    # Flatten across batch and sequence dimensions
    loss = criterion(
        shift_logits.view(-1, shift_logits.size(-1)),
        shift_labels.view(-1)
    )
    perplexity = torch.exp(loss)
    return loss.item(), perplexity.item()`,
      explanation: 'Shows standard causal shift: shift_logits[:, :-1] aligns with shift_labels[:, 1:].',
    },

    runnableCode: {
      code: `import numpy as np

# Deterministic Perplexity calculation
target_probs = np.array([0.85, 0.70, 0.90, 0.65]) # High confidence model
nll = -np.log(target_probs)
mean_ce = np.mean(nll)
ppl = np.exp(mean_ce)

print(f"Mean Cross-Entropy Loss: {mean_ce:.4f}")
print(f"Perplexity: {ppl:.2f}")`,
      expectedOutput: 'Mean Cross-Entropy Loss: 0.2642\nPerplexity: 1.30',
    },

    lineByLineExplanation: [
      {
        lines: 'target_probs = np.array([0.85, 0.70, 0.90, 0.65])',
        codeSnippet: 'target_probs = np.array(...)',
        explanation: 'Probabilities assigned by the model to the actual ground-truth next tokens.',
      },
      {
        lines: 'nll = -np.log(target_probs)',
        codeSnippet: 'nll = -np.log(target_probs)',
        explanation: 'Negative natural logarithm computes surprisal for each individual token.',
      },
      {
        lines: 'ppl = np.exp(mean_ce)',
        codeSnippet: 'ppl = np.exp(mean_ce)',
        explanation: 'Exponentiating the cross-entropy yields perplexity: 1.30 effective choices per token.',
      },
    ],

    hyperparameters: [
      {
        name: 'Learning Rate Schedule',
        defaultVal: 'Cosine Decay with Warmup (Peak 3e-4)',
        range: '1e-5 to 1e-3',
        effect: 'Warmup stabilizes early gradient variance; cosine decay anneals parameters into smooth loss minima.',
        recommendation: 'Decay to 10% of peak learning rate over training horizon.',
      },
    ],

    assumptions: [
      {
        assumption: 'Chinchilla Power Law Transferability',
        whyItMatters: 'Assumes scaling exponents hold predictably across compute budgets ranging over 6 orders of magnitude.',
        howToVerify: 'Run small-scale training runs (10M to 500M params) and verify linear log-log scaling fits.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Failing to deduplicate training corpora before pretraining',
        solution: 'Duplicate web pages artificially inflate memorization rates and cause models to recite repetitive text verbatim.',
      },
      {
        mistake: 'Confusing Chinchilla compute-optimal training with serving-optimal training',
        solution: 'Chinchilla optimizes for minimal compute to reach a target loss during training; in production, training smaller models on far more data (over-training) lowers ongoing inference costs.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Cloud Infrastructure & AI Labs',
        application: 'Cluster Sizing & Budgeting',
        benefit: 'The 6ND formula allows engineering managers to accurately budget GPU cluster leases down to the megawatt-hour.',
      },
      {
        industry: 'Domain-Specific LLM Development',
        application: 'Continual Pretraining on Medical / Legal Corpora',
        benefit: 'Injects specialized domain vocabulary and reasoning patterns into open foundation models before instruction tuning.',
      },
    ],

    practiceQuestions: [
      {
        id: 'genai-05-pq1',
        question: 'What is the Chinchilla scaling rule of thumb for optimal parameter and token allocation?',
        answer: 'The Chinchilla scaling law (Hoffmann et al.) established that parameters and tokens should scale in roughly equal proportion, with approximately 20 training tokens per model parameter (D ≈ 20N).',
        explanation: 'Before Chinchilla, models like GPT-3 (175B on 300B tokens) were severely under-trained relative to their parameter size.',
      },
      {
        id: 'genai-05-pq2',
        question: 'What does a Perplexity of 8.0 on a test set mean intuitively?',
        answer: 'It means that across the test set, the model is on average as uncertain at each token prediction step as if it were choosing uniformly among 8 equally likely candidate words.',
        explanation: 'Lower perplexity signifies higher predictive confidence and superior language modeling accuracy.',
      },
      {
        id: 'genai-05-pq3',
        question: 'Why is benchmark decontamination mandatory before publishing LLM pretraining results?',
        answer: 'Because web scraping inevitably ingests evaluation benchmarks (e.g. GSM8K, HumanEval, MMLU questions posted online). If not cleansed via n-gram overlap filtering, the model simply memorizes the answers, artificially inflating reported scores.',
        explanation: 'Contamination turns true generalization benchmarks into trivial training set memorization.',
      },
    ],

    quiz: [
      {
        id: 'genai-05-q1',
        question: 'According to the universal training compute formula, how many FLOPs are required to train a model with N parameters on D tokens for 1 epoch?',
        options: ['6 * N * D', '2 * N * D', '12 * N * D', 'N^2 * D'],
        correctIndex: 0,
        explanation: 'Forward pass requires 2N FLOPs/token and backward pass requires 4N FLOPs/token, totaling 6ND FLOPs.',
      },
      {
        id: 'genai-05-q2',
        question: 'What mathematical relation connects Cross-Entropy loss (L) to Perplexity (PPL)?',
        options: [
          'PPL = exp(L)',
          'PPL = log(L)',
          'PPL = 1 / L',
          'PPL = L^2',
        ],
        correctIndex: 0,
        explanation: 'Perplexity is defined as the exponential of the cross-entropy loss: PPL = exp(L_CE).',
      },
      {
        id: 'genai-05-q3',
        question: 'Why did Meta train Llama 3 (8B) on 15 Trillion tokens instead of the Chinchilla-optimal 160 Billion tokens?',
        options: [
          'To optimize for inference serving efficiency: smaller models are drastically cheaper to host and run',
          'Because the team miscalculated the Chinchilla formula',
          'Because 8B models cannot train on fewer than 1 Trillion tokens',
          'To prevent the model from learning English grammar',
        ],
        correctIndex: 0,
        explanation: 'While training on 15T tokens takes more pretraining compute, the resulting 8B checkpoint fits on consumer GPUs and serves millions of queries at minimal cost.',
      },
    ],

    independentExercise: {
      title: 'Calculate Pretraining Compute & Cluster Duration in Python',
      problem:
        'Write a Python function calculate_training_days(params_billions: float, tokens_trillions: float, num_gpus: int, sustained_tflops_per_gpu: float = 300.0) that calculates total training FLOPs, total cluster throughput, and days required to train.',
      hints: [
        'Total FLOPs = 6 * (params_billions * 1e9) * (tokens_trillions * 1e12).',
        'Total cluster FLOPs/sec = num_gpus * (sustained_tflops_per_gpu * 1e12).',
        'Days = (Total FLOPs / Cluster FLOPs per second) / 86400.',
      ],
      starterCode: `def calculate_training_days(
    params_billions: float = 8.0,
    tokens_trillions: float = 15.0,
    num_gpus: int = 1024,
    sustained_tflops_per_gpu: float = 300.0
) -> dict:
    # TODO: Calculate total FLOPs and training duration in days
    pass

print(calculate_training_days())`,
      solution: `def calculate_training_days(
    params_billions: float = 8.0,
    tokens_trillions: float = 15.0,
    num_gpus: int = 1024,
    sustained_tflops_per_gpu: float = 300.0
) -> dict:
    total_flops = 6 * (params_billions * 1e9) * (tokens_trillions * 1e12)
    cluster_flops_per_sec = num_gpus * (sustained_tflops_per_gpu * 1e12)
    total_seconds = total_flops / cluster_flops_per_sec
    total_days = total_seconds / 86400.0

    return {
        "total_flops": f"{total_flops:.2e}",
        "total_days": round(total_days, 1)
    }

print(calculate_training_days())`,
    },

    summary: {
      keyTakeaways: [
        'Pretraining converts web-scale text into self-supervised next-token training signals, building the model\'s core reasoning and world knowledge.',
        'Cross-Entropy loss and Perplexity mathematically quantify model surprise; pretraining loss follows smooth power-law scaling across compute budgets.',
        'Modern models frequently "over-train" well past Chinchilla compute-optimal thresholds to minimize downstream inference serving costs.',
      ],
      nextLessonId: 'genai-06-inference-and-decoding',
      nextLessonTitle: 'GenAI-06: Inference and Decoding',
      nextLessonModuleId: 'p7-m6',
    },
  },

  'genai-06-inference-and-decoding': {
    id: 'genai-06-inference-and-decoding',
    moduleId: 'p7-m6',
    title: 'GenAI-06: Inference and Decoding',
    subtitle: 'Temperature Dynamics, Top-K, Nucleus Sampling & Repetition Safeguards',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'temperature-sampling-explorer',

    objectives: [
      'Master the conversion of raw unnormalized logits into calibrated token probabilities via Temperature-scaled Softmax',
      'Contrast Greedy Decoding (Argmax) with Beam Search and Stochastic Sampling algorithms',
      'Formulate and tune Top-K truncation and Top-P (Nucleus) cumulative mass sampling',
      'Implement frequency penalties, presence penalties, and repetition safeguards to eliminate degenerate loops',
      'Configure deterministic stopping criteria (EOS token, maximum tokens, stop strings)',
    ],
    prerequisites: [
      'GenAI-02: How LLMs Work',
      'Basic probability (probability density functions, cumulative mass)',
    ],
    previousLesson: {
      id: 'genai-05-pretraining-dynamics',
      title: 'GenAI-05: Pretraining Dynamics',
      moduleId: 'p7-m5',
    },

    analogy: {
      title: 'The Steering Wheel, Accelerator, and Governor of an LLM',
      text: 'Logits are raw horsepower produced by the engine. Decoding parameters are the vehicle controls: Temperature is the accelerator (low temperature keeps the car strictly on the designated lane; high temperature lets it drift creatively onto scenic backroads). Top-K and Top-P are safety governors that install guardrails, forbidding the car from steering off a cliff into nonsensical vocabulary tails.',
      metaphor: 'Decoding strategies control how stochastic entropy is injected into the generative trajectory.',
    },

    problemSolved: {
      title: 'Why Greedy Decoding Fails at Coherent Text Generation',
      description:
        'Always choosing the highest probability word (Greedy decoding) often causes models to fall into repetitive loops ("the model is a model of the model...") or produce bland, uninspired prose. Conversely, unrestricted sampling picks low-probability tokens that derail coherence. Controlled sampling (Temperature + Top-P) balances creativity and factuality.',
      keyPoints: [
        'Eliminates pathological repetition loops caused by deterministic greedy traps',
        'Truncates the long, noisy tail of 100,000+ low-probability vocabulary tokens',
        'Enables reproducible generation via explicit pseudorandom seed pinning',
      ],
    },

    intuition: {
      overview:
        'Decoding transforms a vector of 128,000 logits z in R^V into a single discrete token ID through a 4-stage pipeline: Temperature Scaling -> Tail Truncation -> Softmax Renormalization -> Stochastic Sampling.',
      steps: [
        {
          step: 1,
          title: 'Temperature Scaling',
          description:
            'Each logit z_i is divided by scalar T. T < 1.0 sharpens the distribution; T > 1.0 flattens it toward uniform randomness.',
        },
        {
          step: 2,
          title: 'Tail Truncation (Top-K & Top-P)',
          description:
            'Low-probability tokens are pruned: Top-K retains only the top K tokens; Top-P retains the minimal set whose cumulative probability mass exceeds P.',
        },
        {
          step: 3,
          title: 'Softmax Renormalization & Draw',
          description:
            'The surviving tokens are renormalized to sum to 1.0. A uniform random variable r in [0, 1) selects the next token.',
        },
      ],
    },

    mathematics: {
      overview:
        'The mathematical pipeline combines temperature division, subset masking, and cumulative distribution thresholds.',
      foundations: [
        {
          name: 'Temperature-Scaled Softmax',
          latex: 'P(w_i \\mid z, T) = \\frac{\\exp(z_i / T)}{\\sum_{j=1}^V \\exp(z_j / T)}',
          explanation:
            'When T approaches 0, P(w_argmax) approaches 1.0 (Greedy). When T approaches infinity, P(w_i) approaches 1/V (Uniform random noise).',
        },
        {
          name: 'Top-P (Nucleus) Truncation Threshold',
          latex: 'V^{(p)} = \\text{smallest set such that } \\sum_{w_i \\in V^{(p)}} P(w_i) \\ge p',
          explanation:
            'Dynamically adapts the number of candidate tokens based on model confidence. When confident, V^(p) may have only 1 token; when uncertain, V^(p) expands to dozens.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Frequency and Presence Penalty Logit Modification',
      objective: 'Formulate how presence and frequency penalties modify logits to suppress token repetition.',
      steps: [
        {
          step: 1,
          label: 'Token Occurrence Counting',
          latex: 'c_i = \\text{count of times token } i \\text{ has appeared in generated text}',
          explanation: 'Maintain a running histogram of token counts emitted during the current generation session.',
        },
        {
          step: 2,
          label: 'Presence Penalty Application',
          latex: 'z_i^{\\prime} = z_i - \\alpha_{\\text{presence}} \\cdot \\mathbb{I}(c_i > 0)',
          explanation: 'Applies a one-time fixed penalty if the token has appeared at least once, penalizing mentioning the same topic repeatedly.',
        },
        {
          step: 3,
          label: 'Frequency Penalty Application',
          latex: 'z_i^{\\text{final}} = z_i - \\alpha_{\\text{presence}} \\cdot \\mathbb{I}(c_i > 0) - \\alpha_{\\text{frequency}} \\cdot c_i',
          explanation: 'Applies an additive penalty proportional to the exact number of times the token has already appeared, strongly discouraging verbatim repetition.',
        },
      ],
    },

    variables: [
      { symbol: 'z_i', name: 'Raw Logit', description: 'Unnormalized scalar output for token i from the unembedding head.' },
      { symbol: 'T', name: 'Temperature', description: 'Positive scaling factor controlling entropy of Softmax distribution.' },
      { symbol: 'K', name: 'Top-K Threshold', description: 'Maximum number of highest-probability tokens retained in candidate pool.' },
      { symbol: 'p', name: 'Top-P (Nucleus) Mass', description: 'Cumulative probability mass threshold (typically 0.85 to 0.95).' },
      { symbol: '\\alpha_{\\text{freq}}, \\alpha_{\\text{pres}}', name: 'Repetition Penalties', description: 'Coefficients penalizing previously generated tokens.' },
    ],

    numericalExample: {
      scenario: 'Filter 5 candidate logits with Top-K = 3, Top-P = 0.80, and Temperature = 1.0.',
      dataset: [
        { token: 'code', logit: 5.0, exp: 148.4 },
        { token: 'python', logit: 4.0, exp: 54.6 },
        { token: 'script', logit: 3.5, exp: 33.1 },
        { token: 'banana', logit: 1.0, exp: 2.7 },
        { token: 'moon', logit: 0.0, exp: 1.0 },
      ],
      calculations: [
        {
          step: 'Softmax Probabilities and Cumulative Mass',
          math: 'Sum of exps = 148.4 + 54.6 + 33.1 + 2.7 + 1.0 = 239.8; P(code) = 61.9%, P(python) = 22.8%, P(script) = 13.8%, P(banana) = 1.1%, P(moon) = 0.4%',
          result: 'Cumulative mass: code (61.9%), python (84.7%), script (98.5%), ...',
        },
        {
          step: 'Apply Top-P = 0.80 Cutoff',
          math: 'code (61.9%) is < 0.80; adding python reaches 84.7% >= 0.80. Truncate all subsequent tokens!',
          result: 'Only {"code", "python"} are retained in the Nucleus set V^(0.80).',
        },
        {
          step: 'Renormalize Retained Tokens',
          math: 'P_renorm(code) = 61.9 / (61.9 + 22.8) = 73.1%; P_renorm(python) = 22.8 / (61.9 + 22.8) = 26.9%',
          result: 'Renormalized distribution: code (73.1%), python (26.9%).',
        },
      ],
      finalConclusion: 'Tokens "script", "banana", and "moon" are completely zeroed out, preventing low-probability hallucinations.',
    },

    visualExplanation: {
      title: 'Decoding Landscape: Greedy vs Stochastic vs Nucleus',
      description: 'How truncation parameters shape the probability tail.',
      features: [
        'Greedy (Argmax): Deterministic, picks highest probability token. Ideal for coding, mathematical proofs, and structured JSON.',
        'Top-K Filtering: Hard threshold on token rank. Simple, but insensitive to distribution sharpness.',
        'Top-P (Nucleus): Dynamic threshold based on cumulative mass. Truncates heavily when model is certain; widens when model is uncertain.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Complete Decoding Engine (Temp + Top-K + Top-P + Repetition Penalty)',
      code: `import numpy as np

np.random.seed(42)

def sample_token(
    logits: np.ndarray,
    temperature: float = 0.7,
    top_k: int = 5,
    top_p: float = 0.9,
    generated_counts: dict = None,
    freq_penalty: float = 0.2
) -> int:
    logits = logits.copy()
    
    # 1. Apply Frequency Penalty
    if generated_counts:
        for token_id, count in generated_counts.items():
            if count > 0 and token_id < len(logits):
                logits[token_id] -= freq_penalty * count

    # 2. Temperature scaling
    T = max(0.01, temperature)
    scaled_logits = logits / T

    # 3. Softmax
    exps = np.exp(scaled_logits - np.max(scaled_logits))
    probs = exps / np.sum(exps)

    # 4. Sort descending
    sorted_indices = np.argsort(probs)[::-1]
    sorted_probs = probs[sorted_indices]

    # 5. Top-K Masking
    if top_k > 0 and top_k < len(sorted_probs):
        sorted_probs[top_k:] = 0.0

    # 6. Top-P (Nucleus) Masking
    cumulative_probs = np.cumsum(sorted_probs)
    # Zero out tokens where previous cumulative mass exceeded top_p
    cutoff_mask = cumulative_probs > top_p
    # Keep at least the first token past top_p
    cutoff_mask[1:] = cutoff_mask[:-1]
    cutoff_mask[0] = False
    sorted_probs[cutoff_mask] = 0.0

    # 7. Renormalize
    sum_probs = np.sum(sorted_probs)
    if sum_probs > 0:
        sorted_probs /= sum_probs
    else:
        return int(sorted_indices[0])

    # Sample from surviving distribution
    sampled_idx = np.random.choice(len(sorted_probs), p=sorted_probs)
    return int(sorted_indices[sampled_idx])

mock_logits = np.array([4.5, 3.8, 3.2, 1.0, 0.5, -1.0])
chosen_token = sample_token(mock_logits, temperature=0.7, top_k=3, top_p=0.85)
print(f"Sampled Token Index: {chosen_token}")`,
      explanation: 'Fully functional sampling pipeline incorporating frequency penalties, temperature, top-k, and nucleus filtering.',
    },

    sklearnCode: {
      title: 'HuggingFace Transformers GenerationConfig Parameters',
      code: `# Standard generation configuration in HuggingFace Transformers
# from transformers import GenerationConfig

# config = GenerationConfig(
#     max_new_tokens=256,
#     do_sample=True,
#     temperature=0.7,
#     top_k=50,
#     top_p=0.9,
#     repetition_penalty=1.15,
#     pad_token_id=0,
#     eos_token_id=2
# )
# output = model.generate(input_ids, generation_config=config)`,
      explanation: 'Demonstrates configuring HuggingFace GenerationConfig for production inference serving.',
    },

    runnableCode: {
      code: `import numpy as np

# Deterministic Temperature comparison on 3 tokens
np.random.seed(42)
raw_logits = np.array([3.0, 2.0, 1.0])

for T in [0.2, 1.0, 2.0]:
    scaled = raw_logits / T
    exps = np.exp(scaled - np.max(scaled))
    p = exps / np.sum(exps)
    print(f"T={T:.1f} -> Probabilities: {np.round(p * 100, 1)}%")`,
      expectedOutput: 'T=0.2 -> Probabilities: [99.3  0.7  0. ]%\nT=1.0 -> Probabilities: [66.5 24.5  9. ]%\nT=2.0 -> Probabilities: [50.6 30.7 18.6]%',
    },

    lineByLineExplanation: [
      {
        lines: 'scaled = raw_logits / T',
        codeSnippet: 'raw_logits / T',
        explanation: 'At T=0.2, gaps are multiplied by 5; at T=2.0, gaps are halved.',
      },
      {
        lines: 'exps = np.exp(scaled - np.max(scaled))',
        codeSnippet: 'np.exp(...)',
        explanation: 'Stabilized exponential transformation mapping scaled logits to non-negative values.',
      },
      {
        lines: 'p = exps / np.sum(exps)',
        codeSnippet: 'p = exps / np.sum(exps)',
        explanation: 'Normalizes vector so all probabilities sum to exactly 1.0 (100%).',
      },
    ],

    hyperparameters: [
      {
        name: 'Temperature T',
        defaultVal: '0.7',
        range: '0.0 to 2.0',
        effect: 'T=0.0 (greedy) for math and code; T=0.7 for general chat; T=1.2+ for creative writing.',
        recommendation: 'Use T=0.0 when benchmarking or generating code to avoid stochastic errors.',
      },
    ],

    assumptions: [
      {
        assumption: 'Softmax Calibration',
        whyItMatters: 'Assumes the model\'s output logits accurately reflect true empirical uncertainty.',
        howToVerify: 'Compute expected calibration error (ECE) across question-answering datasets.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Setting Temperature = 0.0 while enabling do_sample = True',
        solution: 'Temperature of 0 causes division by zero. Most frameworks interpret T=0 as pure greedy search (argmax) without random sampling.',
      },
      {
        mistake: 'Excessive repetition penalty creating grammatical distortions',
        solution: 'Setting repetition_penalty > 1.5 penalizes essential words like "the", "is", and "of", degrading sentence syntax.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Software Development',
        application: 'Deterministic Code Synthesis',
        benefit: 'Setting T=0 (greedy) ensures reproducible, syntactically correct code implementations.',
      },
      {
        industry: 'Interactive Gaming & Storytelling',
        application: 'Dynamic NPC Dialogue',
        benefit: 'T=0.9 with Top-P=0.95 generates diverse, flavorful character responses without repeating catchphrases.',
      },
    ],

    practiceQuestions: [
      {
        id: 'genai-06-pq1',
        question: 'Why does Top-P (Nucleus) sampling outperform fixed Top-K sampling across diverse text genres?',
        answer: 'Top-K retains a static number of tokens (e.g. 50) regardless of model confidence. If the model is 99% confident, Top-K still samples among 50 words, allowing bad tokens. Top-P dynamically contracts to 1 token when confident and expands when ambiguous.',
        explanation: 'Top-P adjusts candidate pool size dynamically to match the entropy of the current step.',
      },
      {
        id: 'genai-06-pq2',
        question: 'What is the mathematical effect of setting Temperature to a very large number (e.g. T = 100)?',
        answer: 'As T approaches infinity, all scaled logits z_i / T approach 0. Softmax(0) = exp(0) / sum(exp(0)) = 1 / V, turning generation into completely uniform random noise (maximum entropy).',
        explanation: 'The model loses all conditioning on the prompt and emits random vocabulary babble.',
      },
      {
        id: 'genai-06-pq3',
        question: 'How do Presence and Frequency penalties differ in their mathematical formulation?',
        answer: 'Presence penalty subtracts a constant alpha_pres from a token\'s logit if it has appeared at least once (binary indicator I(c_i > 0)). Frequency penalty subtracts alpha_freq * c_i, scaling linearly with the exact count of prior occurrences.',
        explanation: 'Presence encourages introducing new topics; frequency prevents stuttering on the same words.',
      },
    ],

    quiz: [
      {
        id: 'genai-06-q1',
        question: 'For a code generation task where exact deterministic accuracy is required, which decoding setting is recommended?',
        options: [
          'Greedy Decoding (Temperature = 0.0)',
          'High Temperature (T = 1.8) with Top-K = 100',
          'Uniform random sampling without Top-P',
          'Beam search with temperature 2.5',
        ],
        correctIndex: 0,
        explanation: 'Temperature 0 (Greedy search) picks the highest probability token deterministically, ideal for syntax and math.',
      },
      {
        id: 'genai-06-q2',
        question: 'In Top-P sampling with P = 0.90, which tokens are retained for sampling?',
        options: [
          'The smallest subset of top tokens whose cumulative probability reaches at least 90%',
          'The top 90 tokens by integer ID',
          'All tokens whose individual probability is greater than 90%',
          'Only tokens that appear in 90% of web pages',
        ],
        correctIndex: 0,
        explanation: 'Top-P (Nucleus) takes the smallest set of most probable tokens whose cumulative mass sums to >= P.',
      },
      {
        id: 'genai-06-q3',
        question: 'What happens if the generation loop does not include a stop string or EOS token check?',
        options: [
          'The model continues generating until it hits the max_tokens limit or context window capacity',
          'The GPU immediately crashes with an out-of-memory error',
          'The temperature automatically resets to 0',
          'All prior tokens are permanently erased from VRAM',
        ],
        correctIndex: 0,
        explanation: 'Autoregressive generation runs indefinitely until either a stop condition (EOS token, stop string) or max_tokens is reached.',
      },
    ],

    independentExercise: {
      title: 'Implement Top-P (Nucleus) Truncation in Pure Python',
      problem:
        'Write a Python function top_p_filter(probs: np.ndarray, p: float = 0.90) that takes a 1D probability distribution, zeroes out all tokens outside the nucleus, and returns the renormalized distribution.',
      hints: [
        'Sort probabilities descending and compute cumulative sum.',
        'Find indices where cumulative sum exceeds p (shifted by 1 to include the threshold token).',
        'Zero out excluded indices and divide by sum of remaining probabilities.',
      ],
      starterCode: `import numpy as np

def top_p_filter(probs: np.ndarray, p: float = 0.90) -> np.ndarray:
    # TODO: Implement Nucleus filtering and renormalization
    pass

test_probs = np.array([0.50, 0.30, 0.12, 0.05, 0.03])
filtered = top_p_filter(test_probs, p=0.85)
print("Filtered Probs:", np.round(filtered, 3))`,
      solution: `import numpy as np

def top_p_filter(probs: np.ndarray, p: float = 0.90) -> np.ndarray:
    sorted_indices = np.argsort(probs)[::-1]
    sorted_probs = probs[sorted_indices]
    cum_probs = np.cumsum(sorted_probs)

    # Mask tokens past threshold
    cutoff = cum_probs > p
    cutoff[1:] = cutoff[:-1]
    cutoff[0] = False

    sorted_probs[cutoff] = 0.0
    sum_p = np.sum(sorted_probs)
    if sum_p > 0:
        sorted_probs /= sum_p

    # Restore original ordering
    out = np.zeros_like(probs)
    out[sorted_indices] = sorted_probs
    return out

test_probs = np.array([0.50, 0.30, 0.12, 0.05, 0.03])
filtered = top_p_filter(test_probs, p=0.85)
print("Filtered Probs:", np.round(filtered, 3))`,
    },

    summary: {
      keyTakeaways: [
        'Decoding converts continuous output logits into discrete natural language tokens through temperature scaling and truncation.',
        'Top-P (Nucleus) sampling dynamically adjusts candidate pool size to the entropy of the current prediction, preventing both bland repetition and wild hallucinations.',
        'Frequency and presence penalties modify logits to discourage degenerate repetition loops without corrupting basic syntax.',
      ],
      nextLessonId: 'genai-07-prompt-engineering',
      nextLessonTitle: 'GenAI-07: Prompt Engineering',
      nextLessonModuleId: 'p7-m7',
    },
  },
};
