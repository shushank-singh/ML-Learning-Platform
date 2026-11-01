import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 4: Embeddings (p8-m4)
// =========================================================================
export const p8m4Data: ModuleData = {
  id: 'p8-m4',
  number: 4,
  title: 'Embeddings & Semantic Representation',
  subtitle: 'Bi-Encoders, Dimensionality, Normalization & Multilingual Spaces',
  description:
    'Deconstruct how neural embedding models project natural language text into dense semantic vector representations. Master pooling strategies (mean vs CLS), vector dimensionality trade-offs, Matryoshka Representation Learning (MRL), unit normalization, the anisotropic cone problem, MTEB benchmarks, and cross-lingual vector alignment.',
  icon: 'Compass',
  badge: 'Phase 8 · RAG & Vectors',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'rag-04-embeddings-semantic-search',
      moduleId: 'p8-m4',
      title: 'RAG-04: Embeddings & Semantic Representation',
      description:
        'Bi-encoder architectures, pooling mechanics, vector dimensions, Matryoshka compression, and MTEB benchmark selection.',
      order: 1,
      readTimeMinutes: 32,
      visualizerType: 'embedding-similarity-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 5: Vector Search Fundamentals (p8-m5)
// =========================================================================
export const p8m5Data: ModuleData = {
  id: 'p8-m5',
  number: 5,
  title: 'Vector Search Fundamentals',
  subtitle: 'Metric Geometry, Nearest Neighbors & Top-K Retrieval',
  description:
    'Explore the geometric foundations of high-dimensional vector search. Compare distance and similarity metrics: Cosine Similarity, Dot Product, Euclidean (L2) Distance, and Manhattan (L1) Distance. Analyze Top-k retrieval mechanics, priority queue heaps, similarity confidence thresholds, and out-of-distribution failure modes.',
  icon: 'Target',
  badge: 'Phase 8 · RAG & Vectors',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'rag-05-vector-search-fundamentals',
      moduleId: 'p8-m5',
      title: 'RAG-05: Vector Search Fundamentals & Distance Metrics',
      description:
        'Cosine vs Dot vs Euclidean metrics, Top-k priority queues, similarity thresholds, and high-dimensional nearest neighbors.',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'rag-topk-retrieval-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 6: Vector Databases and Indexes (p8-m6)
// =========================================================================
export const p8m6Data: ModuleData = {
  id: 'p8-m6',
  number: 6,
  title: 'Vector Databases & Indexes (HNSW & IVF)',
  subtitle: 'Exact vs Approximate Nearest Neighbors, Graph Indices & pgvector',
  description:
    'Engineer production vector databases: schema design, metadata pre-filtering versus post-filtering, and index architectures. Contrast exact k-NN brute-force search against Approximate Nearest Neighbor (ANN) algorithms: Hierarchical Navigable Small World (HNSW) graphs and Inverted File (IVF) indexes. Benchmark recall, latency, memory, and local offline deployment.',
  icon: 'Database',
  badge: 'Phase 8 · RAG & Vectors',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'rag-06-vector-databases-indexing',
      moduleId: 'p8-m6',
      title: 'RAG-06: Vector Databases & Indexing (HNSW & IVF)',
      description:
        'HNSW graph traversal, IVF Voronoi partitions, pgvector implementation, and the recall-latency-memory trade-off.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'rag-vector-space-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 4 - 6)
// =========================================================================
export const ragModule2Lessons: Record<string, LessonContent> = {
  'rag-04-embeddings-semantic-search': {
    id: 'rag-04-embeddings-semantic-search',
    moduleId: 'p8-m4',
    title: 'RAG-04: Embeddings & Semantic Representation',
    subtitle: 'From Transformer Token Hidden States to Dense Continuous Vector Manifolds',
    order: 1,
    readTimeMinutes: 32,
    difficulty: 'Intermediate',
    visualizerType: 'embedding-similarity-explorer',

    objectives: [
      'Deconstruct the Bi-Encoder architecture and pooling layers (Mean Pooling vs [CLS] token)',
      'Analyze the geometric impact of vector dimensions (384, 768, 1536) on semantic resolution and storage',
      'Explain Matryoshka Representation Learning (MRL) for elastic embedding dimension truncation',
      'Diagnose the embedding anisotropy ("narrow cone") problem and how unit normalization alleviates it',
      'Evaluate embedding models using the Massive Text Embedding Benchmark (MTEB) across retrieval tasks',
    ],
    prerequisites: [
      'Understanding of Transformer encoder blocks and self-attention (Phase 6)',
      'Vector algebra and dot products (Phase 0 & Lesson RAG-01)',
    ],
    previousLesson: {
      id: 'rag-03-chunking-strategies',
      title: 'RAG-03: Chunking Strategies & Boundary Optimization',
      moduleId: 'p8-m3',
    },

    analogy: {
      title: 'The Cartographer’s Map of Human Concepts',
      text: 'In ancient cartography, words were listed alphabetically in a flat dictionary: "apple", "apricot", "application". In an alphabetical list, "apple" and "application" are adjacent neighbors purely by spelling, while "apple" and "pear" are separated by hundreds of pages. An embedding model is a celestial cartographer: it plots every sentence onto a 1536-dimensional hyper-globe where coordinates represent pure meaning. "Apple" and "pear" sit side-by-side in the fruit valley, while "application" is located thousands of miles away on the software continent, regardless of spelling.',
      metaphor: 'Embeddings translate symbolic words into geometric coordinates where semantic distance mirrors conceptual relatedness.',
    },

    problemSolved: {
      title: 'Overcoming the Keyword Vocabulary Mismatch Barrier',
      description:
        'Traditional lexical search (like exact string matching or SQL LIKE) fails completely when users query with synonyms or paraphrases (e.g. searching "heart attack" fails to find documents discussing "myocardial infarction"). Dense embeddings capture conceptual meaning in continuous latent space, bridging lexical gaps automatically.',
      keyPoints: [
        'Bridges Synonym and Paraphrase Gaps without requiring exhaustive manual synonym dictionaries',
        'Enables Cross-Lingual Semantic Search by projecting multilingual texts (English, French, Hindi) into a shared conceptual manifold',
        'Compresses Variable-Length Text Sequences into fixed-size dense vectors suitable for sub-millisecond similarity indexing',
        'Facilitates Multi-Modal Unification where images and descriptive text share identical coordinate spaces (e.g. CLIP)',
      ],
    },

    intuition: {
      overview:
        'A sentence embedding model maps an input sequence of tokens into a single dense vector of floating-point numbers through transformer layers followed by a pooling reduction.',
      steps: [
        {
          step: 1,
          title: 'Subword Tokenization & Contextual Attention',
          description:
            'The input chunk is tokenized and processed through multiple bidirectional Transformer encoder layers, producing contextual token representations h_1, h_2, ..., h_L in R^D.',
        },
        {
          step: 2,
          title: 'Pooling Reduction',
          description:
            'A pooling operation compresses the sequence of L token vectors into a single sentence vector v in R^D. Mean pooling computes the attention-mask-weighted average across all tokens; CLS pooling uses the first token representation.',
        },
        {
          step: 3,
          title: 'L2 Unit Normalization',
          description:
            'The pooled vector is normalized by dividing by its Euclidean norm, projecting the vector onto the unit hypersphere where ||v|| = 1.0.',
        },
      ],
    },

    mathematics: {
      overview:
        'Sentence embeddings are produced via contextual pooling and normalized to unit hyperspherical coordinates.',
      foundations: [
        {
          name: 'Attention-Weighted Mean Pooling',
          latex: '\\mathbf{v} = \\frac{\\sum_{i=1}^L m_i \\mathbf{h}_i}{\\sum_{i=1}^L m_i}',
          explanation:
            'Averages all active token hidden states h_i where m_i in {0, 1} is the attention mask, ignoring padding tokens.',
        },
        {
          name: 'L2 Normalization onto Unit Hypersphere',
          latex: '\\mathbf{e} = \\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|_2} = \\frac{\\mathbf{v}}{\\sqrt{\\sum_{j=1}^D v_j^2}}',
          explanation:
            'Projects the vector e onto the surface of a D-dimensional unit hypersphere S^(D-1), ensuring ||e||_2 = 1.0.',
        },
        {
          name: 'Matryoshka Representation Loss (MRL)',
          latex: '\\mathcal{L}_{\\text{MRL}} = \\sum_{d \\in \\mathcal{D}_{\\text{dims}}} \\lambda_d \\mathcal{L}_{\\text{contrastive}}(\\mathbf{e}_{1:d}^{(q)}, \\mathbf{e}_{1:d}^{(p)})',
          explanation:
            'Trains early sub-vectors (e.g. first 256 or 512 dimensions) to retain high retrieval performance, enabling 70%+ storage reduction with minimal accuracy degradation.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Dot Product Equivalence to Cosine Similarity for L2 Normalized Vectors',
      objective: 'Prove that calculating cosine similarity over normalized vectors reduces to an unnormalized dot product.',
      steps: [
        {
          step: 1,
          label: 'Definition of Cosine Similarity',
          latex: '\\cos(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2} = \\frac{\\sum_{i=1}^D u_i v_i}{\\sqrt{\\sum_{i=1}^D u_i^2} \\sqrt{\\sum_{i=1}^D v_i^2}}',
          explanation: 'Standard cosine similarity requires computing two square roots and one dot product.',
        },
        {
          step: 2,
          label: 'Substitution of Unit Norms',
          latex: '\\|\\mathbf{u}\\|_2 = 1.0 \\quad \\text{and} \\quad \\|\\mathbf{v}\\|_2 = 1.0',
          explanation: 'If all vectors are normalized upon ingestion into the vector database, their norms equal 1.',
        },
        {
          step: 3,
          label: 'Final Direct Equivalence',
          latex: '\\cos(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{1.0 \\cdot 1.0} = \\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^D u_i v_i',
          explanation: 'Nearest neighbor index engines can evaluate dot products directly via SIMD matrix multiplication without expensive runtime square root computations.',
        },
      ],
    },

    variables: [
      { symbol: 'h_i', name: 'Token Hidden State', description: 'Contextual representation of token i from the final Transformer encoder layer.', dimensions: 'R^D' },
      { symbol: 'm_i', name: 'Attention Mask', description: 'Binary indicator (1 for real token, 0 for padding token).' },
      { symbol: 'v', name: 'Pooled Vector', description: 'Raw unnormalized sentence vector obtained after pooling.', dimensions: 'R^D' },
      { symbol: 'e', name: 'Unit Normalized Embedding', description: 'Final L2-normalized vector stored in the vector database.', dimensions: 'R^D' },
      { symbol: 'D', name: 'Embedding Dimension', description: 'Number of floating-point features in the embedding vector (e.g. 384, 768, 1536).' },
    ],

    numericalExample: {
      scenario: 'Compute mean pooling and unit normalization for a 2-token sequence in a 3D hidden space.',
      dataset: [
        { token: 'Token 1 ("heart")', h1: 1.0, h2: 2.0, h3: -1.0, mask: 1 },
        { token: 'Token 2 ("attack")', h1: 3.0, h2: 0.0, h3: 1.0, mask: 1 },
        { token: 'Token 3 ([PAD])', h1: 0.0, h2: 0.0, h3: 0.0, mask: 0 },
      ],
      calculations: [
        {
          step: 'Mean Pooling (Masked Sum / Count)',
          math: 'v1 = (1.0 + 3.0)/2 = 2.0; v2 = (2.0 + 0.0)/2 = 1.0; v3 = (-1.0 + 1.0)/2 = 0.0',
          result: 'v = [2.0, 1.0, 0.0]',
        },
        {
          step: 'L2 Norm Calculation',
          math: '||v|| = sqrt(2.0^2 + 1.0^2 + 0.0^2) = sqrt(4 + 1 + 0) = sqrt(5) ≈ 2.2361',
          result: 'Norm is 2.2361',
        },
        {
          step: 'Unit Normalization',
          math: 'e = [2.0 / 2.2361, 1.0 / 2.2361, 0.0 / 2.2361] = [0.8944, 0.4472, 0.0000]',
          result: 'e = [0.8944, 0.4472, 0.0000]',
        },
        {
          step: 'Verification of Unit Length',
          math: '0.8944^2 + 0.4472^2 + 0^2 = 0.8000 + 0.2000 = 1.0000',
          result: 'Vector is strictly unit length.',
        },
      ],
      finalConclusion: 'The sequence is successfully compressed into a normalized 3D embedding e.',
    },

    visualExplanation: {
      title: 'The Embedding Geometry: Anisotropic Cones and Normalization',
      description: 'Understanding why un-normalized raw Transformer representations cluster in narrow anisotropic cones.',
      features: [
        'Anisotropic Cone Effect: Untrained language models tend to project all sentences into a narrow cone in vector space, causing all pairwise cosine similarities to hover between 0.75 and 0.99.',
        'Contrastive Fine-Tuning: Contrastive learning (e.g. InfoNCE loss on query-positive-negative triplets) forces representations to span the entire hypersphere uniformly.',
        'Matryoshka Truncation: Modern models (OpenAI text-embedding-3, BGE-M3) are trained so that truncating the vector from 1536 dims to 512 dims retains >98% of retrieval accuracy while slashing memory by 66%.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Mean Pooling, Normalization & Matryoshka Truncation',
      code: `import numpy as np

# Deterministic seed for reproducible verification
np.random.seed(42)

def mean_pooling(token_embeddings: np.ndarray, attention_mask: np.ndarray) -> np.ndarray:
    """Compute attention-mask-weighted mean pooling across token sequences."""
    # Expand mask from (batch, seq_len) to (batch, seq_len, 1)
    mask_expanded = np.expand_dims(attention_mask, axis=-1)
    # Sum embeddings where mask == 1
    sum_embeddings = np.sum(token_embeddings * mask_expanded, axis=1)
    # Sum mask counts
    sum_mask = np.clip(mask_expanded.sum(axis=1), a_min=1e-9, a_max=None)
    return sum_embeddings / sum_mask

def l2_normalize(vectors: np.ndarray) -> np.ndarray:
    """Project vectors onto the unit hypersphere."""
    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    return vectors / norms

def matryoshka_truncate(embedding: np.ndarray, target_dim: int) -> np.ndarray:
    """Truncate embedding to target_dim and re-normalize."""
    truncated = embedding[:, :target_dim]
    return l2_normalize(truncated)

# Simulated batch of 2 sentences, 4 tokens each, 6-dimensional embedding
token_states = np.array([
    [[1.0, 2.0, 0.5, 0.1, 0.3, 0.8],
     [2.0, 1.0, 0.2, 0.4, 0.1, 0.6],
     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],  # PAD
     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]], # PAD
    [[0.1, 0.5, 1.8, 1.2, 0.9, 0.4],
     [0.3, 0.7, 1.5, 0.9, 1.1, 0.5],
     [0.2, 0.6, 1.4, 1.0, 1.0, 0.3],
     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]]  # PAD
])
masks = np.array([
    [1, 1, 0, 0],
    [1, 1, 1, 0]
])

pooled = mean_pooling(token_states, masks)
normalized = l2_normalize(pooled)
truncated = matryoshka_truncate(normalized, target_dim=3)

print("Full 6D Normalized Vector 0:", np.round(normalized[0], 3))
print("Truncated 3D Re-normalized Vector 0:", np.round(truncated[0], 3))
print("Unit Length Check (Truncated):", round(float(np.linalg.norm(truncated[0])), 4))`,
      explanation: 'Applies token masking, mean pooling, row-wise L2 normalization, and Matryoshka dimension truncation.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Verification: Normalizer Transformer & Cosine Similarity',
      code: `import numpy as np
from sklearn.preprocessing import Normalizer
from sklearn.metrics.pairwise import cosine_similarity

# Raw pooled embeddings for 3 sentences
raw_embeddings = np.array([
    [2.5, 1.2, 0.8, -0.4],  # "PostgreSQL vector database"
    [2.3, 1.5, 0.9, -0.2],  # "Relational database with pgvector"
    [0.1, -1.8, 2.4, 3.1]   # "Deep convolutional image filters"
])

# Apply scikit-learn L2 Normalizer
normalizer = Normalizer(norm='l2')
norm_embeddings = normalizer.fit_transform(raw_embeddings)

# Compute full pairwise similarity matrix
sim_matrix = cosine_similarity(norm_embeddings)
print("Pairwise Cosine Similarity Matrix:")
print(np.round(sim_matrix, 3))
print(f"Similarity between Doc 0 and Doc 1: {sim_matrix[0, 1]:.3f} (High Semantic Overlap)")
print(f"Similarity between Doc 0 and Doc 2: {sim_matrix[0, 2]:.3f} (Different Domain)")`,
      explanation: 'Uses scikit-learn Normalizer to project sentence vectors onto the unit sphere and computes pairwise cosine similarity.',
    },

    runnableCode: {
      code: `import numpy as np

# Deterministic vectors representing 3 text statements
np.random.seed(42)
v_doc1 = np.array([0.9, 0.3, 0.1, 0.0])
v_doc2 = np.array([0.85, 0.35, 0.05, 0.1])
v_query = np.array([0.88, 0.32, 0.08, 0.02])

# L2 unit normalization
norm_doc1 = v_doc1 / np.linalg.norm(v_doc1)
norm_doc2 = v_doc2 / np.linalg.norm(v_doc2)
norm_q = v_query / np.linalg.norm(v_query)

# Dot products
sim1 = float(np.dot(norm_doc1, norm_q))
sim2 = float(np.dot(norm_doc2, norm_q))

print("Cosine Sim (Query, Doc1):", round(sim1, 4))
print("Cosine Sim (Query, Doc2):", round(sim2, 4))
print("Ranked Top Match:", "Doc1" if sim1 > sim2 else "Doc2")`,
      expectedOutput: `Cosine Sim (Query, Doc1): 0.9998
Cosine Sim (Query, Doc2): 0.9934
Ranked Top Match: Doc1`,
    },

    lineByLineExplanation: [
      {
        lines: 'norm_doc1 = v_doc1 / np.linalg.norm(v_doc1)',
        codeSnippet: 'v_doc1 / np.linalg.norm(v_doc1)',
        explanation: 'Divides the vector by its Euclidean length to constrain its norm to exactly 1.0.',
      },
      {
        lines: 'sim1 = float(np.dot(norm_doc1, norm_q))',
        codeSnippet: 'float(np.dot(norm_doc1, norm_q))',
        explanation: 'Evaluates the dot product; because both vectors are unit normalized, this is mathematically identical to cosine similarity.',
      },
    ],

    hyperparameters: [
      {
        name: 'Embedding Dimensionality',
        defaultVal: '768 to 1536',
        range: '256 to 3072',
        effect: 'Higher dimensions capture finer nuances but increase RAM requirements and vector distance calculation latency linearly.',
        recommendation: '768 dimensions (e.g. BGE-base or text-embedding-3-small) is the enterprise standard for latency/quality balance.',
      },
      {
        name: 'Pooling Strategy',
        defaultVal: 'Mean Pooling',
        range: 'Mean Pooling, [CLS] Pooling, Last Token Pooling',
        effect: 'Mean pooling distributes attention across all tokens; [CLS] pooling relies solely on the classification token.',
        recommendation: 'Always match the pooling strategy specified in the embedding model card.',
      },
    ],

    assumptions: [
      {
        assumption: 'Cosine Distance Reflects Semantic Relevance',
        whyItMatters: 'If queries and answers occupy different manifold regions due to differing lengths or tones, cosine similarity fails.',
        howToVerify: 'Use instruction prefixes (e.g. "Represent this sentence for searching relevant passages:") as required by asymmetric bi-encoders.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Failing to apply the attention mask during mean pooling',
        solution: 'If padding tokens (zeros) are included in the average, longer sequences are artificially pulled toward zero and similarity drops.',
      },
      {
        mistake: 'Forgetting to re-normalize vectors after Matryoshka dimension truncation',
        solution: 'Truncating dimensions shortens the vector length; always re-run L2 normalization after slicing.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Global E-Commerce',
        application: 'Multilingual Product Search',
        benefit: 'Enables shoppers in Tokyo searching in Japanese to retrieve relevant catalog items authored in English.',
      },
      {
        industry: 'Enterprise Legal Search',
        application: 'Cross-Jurisdictional Case Law Mapping',
        benefit: 'Maps statutory terminology across federal and state court filings with high semantic precision.',
      },
    ],

    practiceQuestions: [
      {
        id: 'rag-04-pq1',
        question: 'Why is attention-mask-weighted mean pooling superior to unweighted mean pooling?',
        answer: 'Unweighted mean pooling averages all tokens including trailing [PAD] padding tokens. Because padding states have non-zero activations, this artificially distorts the semantic vector and reduces similarity for shorter sequences.',
        explanation: 'The attention mask zeroes out padding tokens before summation and divides only by the true token count.',
      },
      {
        id: 'rag-04-pq2',
        question: 'What is Matryoshka Representation Learning (MRL) and what problem does it solve?',
        answer: 'MRL trains embeddings such that the earliest D dimensions (e.g. first 256 of 1536) form a valid, highly accurate representation. This allows engineers to truncate vectors to 256 dimensions to save 83% of vector database RAM with less than 2% drop in retrieval accuracy.',
        explanation: 'Allows dynamic trade-offs between memory cost and retrieval precision without training separate models.',
      },
      {
        id: 'rag-04-pq3',
        question: 'What is an asymmetric bi-encoder and why do models like BGE or E5 require instruction prefixes?',
        answer: 'Queries are short questions (e.g. "What is HNSW?") while passages are long paragraphs (e.g. "Hierarchical Navigable Small World graphs are..."). Asymmetric models use instruction prefixes on the query to map short questions into the same semantic region as descriptive answers.',
        explanation: 'Without the prefix, questions and answers may cluster separately in vector space.',
      },
    ],

    quiz: [
      {
        id: 'rag-04-q1',
        question: 'What is the Massive Text Embedding Benchmark (MTEB)?',
        options: [
          'A hardware benchmark measuring GPU floating point operations',
          'A comprehensive multi-task leaderboard evaluating embedding models across Retrieval, Clustering, Classification, and Reranking',
          'A Python script that splits text into fixed character chunks',
          'A PostgreSQL extension for inverted file indexing',
        ],
        correctIndex: 1,
        explanation: 'MTEB is the industry-standard benchmark for comparing open-source and proprietary embedding models across dozens of datasets.',
      },
      {
        id: 'rag-04-q2',
        question: 'If two vectors u and v are both unit normalized (||u|| = 1.0, ||v|| = 1.0), how is their Cosine Similarity computed?',
        options: [
          'u · v (simple dot product)',
          'u · v / (||u|| + ||v||)',
          'sqrt(u · v)',
          '1 - (u · v)^2',
        ],
        correctIndex: 0,
        explanation: 'Cosine similarity is (u · v) / (||u|| * ||v||); when norms are 1.0, it equals u · v.',
      },
      {
        id: 'rag-04-q3',
        question: 'What causes the "anisotropic cone" phenomenon in raw language model representations?',
        options: [
          'Embedding vectors having too few dimensions',
          'High-frequency tokens dominating the shared singular value spectrum, compressing all sentence vectors into a narrow directional cone',
          'Corrupted UTF-8 character encoding during ingestion',
          'Using Euclidean distance instead of Manhattan distance',
        ],
        correctIndex: 1,
        explanation: 'Token representations in untrained or uncalibrated models share common direction components, compressing cosine similarities into a high narrow band.',
      },
    ],

    independentExercise: {
      title: 'Implement Matryoshka Dimension Slicing and Recall Evaluation',
      problem:
        'Write a Python function `evaluate_matryoshka_retention(full_embeddings, query_vec, truncate_dim=2)` that computes the top match using the full vectors, then truncates both to `truncate_dim`, re-normalizes them, and checks whether the top-1 ranked document remains identical.',
      hints: [
        'Compute full dot products between normalized full embeddings and full query.',
        'Slice array to `[:, :truncate_dim]` and re-normalize.',
        'Compare `np.argmax` between full and truncated similarities.',
      ],
      starterCode: `import numpy as np

def evaluate_matryoshka_retention(corpus: np.ndarray, query: np.ndarray, truncate_dim: int = 2) -> dict:
    # TODO: Implement full vs truncated retrieval comparison
    pass

# 4D synthetic corpus and query
corpus = np.array([
    [0.9, 0.4, 0.1, 0.05],
    [0.1, 0.2, 0.9, 0.35],
    [0.85, 0.45, 0.2, 0.1]
])
query = np.array([0.88, 0.42, 0.15, 0.08])
print(evaluate_matryoshka_retention(corpus, query, truncate_dim=2))`,
      solution: `import numpy as np

def evaluate_matryoshka_retention(corpus: np.ndarray, query: np.ndarray, truncate_dim: int = 2) -> dict:
    # Normalize full
    q_norm = query / np.linalg.norm(query)
    c_norm = corpus / np.linalg.norm(corpus, axis=1, keepdims=True)
    full_scores = np.dot(c_norm, q_norm)
    full_top = int(np.argmax(full_scores))
    
    # Truncate and re-normalize
    q_trunc = query[:truncate_dim]
    q_trunc_norm = q_trunc / np.linalg.norm(q_trunc)
    c_trunc = corpus[:, :truncate_dim]
    c_trunc_norm = c_trunc / np.linalg.norm(c_trunc, axis=1, keepdims=True)
    trunc_scores = np.dot(c_trunc_norm, q_trunc_norm)
    trunc_top = int(np.argmax(trunc_scores))
    
    return {
        "full_top_idx": full_top,
        "trunc_top_idx": trunc_top,
        "is_preserved": full_top == trunc_top,
        "full_scores": np.round(full_scores, 4).tolist(),
        "trunc_scores": np.round(trunc_scores, 4).tolist()
    }

corpus = np.array([
    [0.9, 0.4, 0.1, 0.05],
    [0.1, 0.2, 0.9, 0.35],
    [0.85, 0.45, 0.2, 0.1]
])
query = np.array([0.88, 0.42, 0.15, 0.08])
print(evaluate_matryoshka_retention(corpus, query, truncate_dim=2))`,
    },

    summary: {
      keyTakeaways: [
        'Bi-encoders produce fixed-size dense representations via attention-masked pooling.',
        'Unit normalization projects vectors onto the unit hypersphere, making dot products mathematically equivalent to cosine similarity.',
        'Matryoshka representation learning allows slicing vector dimensions to achieve 60–80% memory savings with negligible quality loss.',
      ],
      nextLessonId: 'rag-05-vector-search-fundamentals',
      nextLessonTitle: 'RAG-05: Vector Search Fundamentals & Distance Metrics',
      nextLessonModuleId: 'p8-m5',
    },
  },

  'rag-05-vector-search-fundamentals': {
    id: 'rag-05-vector-search-fundamentals',
    moduleId: 'p8-m5',
    title: 'RAG-05: Vector Search Fundamentals & Distance Metrics',
    subtitle: 'High-Dimensional Geometry, Metric Spaces, Top-K Retrieval & Confidence Cutoffs',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Intermediate',
    visualizerType: 'rag-topk-retrieval-explorer',

    objectives: [
      'Compare Cosine Similarity, Dot Product, Euclidean (L2) Distance, and Manhattan (L1) Distance',
      'Explain the geometric Curse of Dimensionality and its impact on nearest-neighbor distance concentration',
      'Implement Top-k retrieval using min-heaps (priority queues) with O(N log k) time complexity',
      'Design dynamic similarity thresholds to trigger explicit abstention and prevent out-of-distribution hallucinations',
      'Analyze failure modes where high cosine similarity does not correspond to factual relevance',
    ],
    prerequisites: [
      'Understanding of embedding representations and vector normalization (Lesson RAG-04)',
      'Basic data structure fluency (binary heaps / priority queues)',
    ],
    previousLesson: {
      id: 'rag-04-embeddings-semantic-search',
      title: 'RAG-04: Embeddings & Semantic Representation',
      moduleId: 'p8-m4',
    },

    analogy: {
      title: 'The Multi-Dimensional Radar and Sonar Ping',
      text: 'In air traffic control, radar tracks planes using 3 coordinates: longitude, latitude, and altitude. When a collision alarm sounds, the computer calculates the Euclidean straight-line distance to find the nearest aircraft. In vector search, our radar has 1536 dimensions. Each dimension tracks a subtle semantic property (e.g. formality, tense, domain, sentiment). When a user query arrives, the search engine sends a sonar ping into the 1536-dimensional ocean, finding the k closest document submarines residing in the query’s acoustic cone.',
      metaphor: 'Vector search is spatial proximity navigation in a hyper-dimensional geometric space.',
    },

    problemSolved: {
      title: 'Why Metric Selection and Thresholding Dictate Retrieval Precision',
      description:
        'Selecting the wrong distance metric (e.g. running unnormalized dot products when documents have unequal lengths) causes long documents to monopolize search results purely due to vector magnitude. Furthermore, without calibrated similarity thresholds, vector search will always return k documents, even if every document in the database is completely irrelevant.',
      keyPoints: [
        'Normalizes Magnitude Variations by using Cosine Similarity to focus exclusively on angular semantic alignment',
        'Accelerates Retrieval from O(N log N) to O(N log k) using bounded min-heap priority queues',
        'Implements Guardrail Confidence Thresholds that reject low-scoring noise and trigger explicit model abstention',
        'Mitigates the Curse of Dimensionality where distance ratios between nearest and furthest points converge to 1',
      ],
    },

    intuition: {
      overview:
        'Vector search converts the qualitative question "Which documents answer this query?" into the quantitative geometric problem "Which indexed vectors minimize distance or maximize inner product with query vector q?"',
      steps: [
        {
          step: 1,
          title: 'Query Projection & Normalization',
          description:
            'The incoming query string is embedded into vector q in R^D and normalized to ||q|| = 1.0.',
        },
        {
          step: 2,
          title: 'Pairwise Distance / Similarity Evaluation',
          description:
            'The distance function d(q, x_i) is evaluated across indexed vectors x_i in the candidate corpus.',
        },
        {
          step: 3,
          title: 'Top-k Bounded Min-Heap Selection',
          description:
            'A min-heap of size k tracks the top-k highest similarity candidates. If candidate x_i scores higher than the heap root, the root is popped and x_i is inserted.',
        },
        {
          step: 4,
          title: 'Cutoff Threshold Filtering',
          description:
            'Any candidate failing to satisfy the minimum similarity threshold (e.g. score < 0.65) is pruned before reaching the LLM context window.',
        },
      ],
    },

    mathematics: {
      overview:
        'Distance and similarity metrics define the topological properties of the vector retrieval space.',
      foundations: [
        {
          name: 'Euclidean (L2) Distance',
          latex: 'D_{\\text{L2}}(\\mathbf{u}, \\mathbf{v}) = \\|\\mathbf{u} - \\mathbf{v}\\|_2 = \\sqrt{\\sum_{i=1}^D (u_i - v_i)^2}',
          explanation:
            'Standard straight-line distance in Euclidean space. Highly sensitive to vector magnitude.',
        },
        {
          name: 'Inner Product / Dot Product',
          latex: '\\langle \\mathbf{u}, \\mathbf{v} \\rangle = \\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^D u_i v_i',
          explanation:
            'Combines both angular alignment and vector lengths. If vectors are unit normalized, inner product is identical to cosine similarity.',
        },
        {
          name: 'Relation between Cosine Distance and L2 Distance for Unit Vectors',
          latex: '\\|\\mathbf{u} - \\mathbf{v}\\|_2^2 = \\|\\mathbf{u}\\|_2^2 + \\|\\mathbf{v}\\|_2^2 - 2(\\mathbf{u} \\cdot \\mathbf{v}) = 2 - 2\\cos(\\mathbf{u}, \\mathbf{v})',
          explanation:
            'Proves that for unit-normalized vectors, minimizing Euclidean distance is mathematically identical to maximizing Cosine Similarity.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of the Equivalence between Euclidean Distance and Cosine Similarity for Unit Vectors',
      objective: 'Demonstrate that any vector index optimized for Euclidean distance can index unit-normalized cosine vectors directly.',
      steps: [
        {
          step: 1,
          label: 'Expansion of Squared Euclidean Distance',
          latex: '\\|\\mathbf{u} - \\mathbf{v}\\|_2^2 = \\sum_{i=1}^D (u_i - v_i)^2 = \\sum_{i=1}^D u_i^2 + \\sum_{i=1}^D v_i^2 - 2\\sum_{i=1}^D u_i v_i',
          explanation: 'Expand the binomial square for each dimension.',
        },
        {
          step: 2,
          label: 'Application of Unit Norm Constraints',
          latex: '\\sum_{i=1}^D u_i^2 = \\|\\mathbf{u}\\|_2^2 = 1.0 \\quad \\text{and} \\quad \\sum_{i=1}^D v_i^2 = \\|\\mathbf{v}\\|_2^2 = 1.0',
          explanation: 'Because vectors are on the unit sphere, both sum of squares terms reduce to 1.0.',
        },
        {
          step: 3,
          label: 'Direct Relationship',
          latex: '\\|\\mathbf{u} - \\mathbf{v}\\|_2^2 = 1 + 1 - 2(\\mathbf{u} \\cdot \\mathbf{v}) = 2(1 - \\cos(\\mathbf{u}, \\mathbf{v}))',
          explanation: 'Minimizing Euclidean distance ||u - v|| directly maximizes cosine similarity u · v.',
        },
      ],
    },

    variables: [
      { symbol: 'u, v', name: 'Vector Coordinates', description: 'Dense points in D-dimensional real vector space R^D.' },
      { symbol: 'D_L2', name: 'Euclidean Distance', description: 'Geometric distance between two vectors (range [0, infinity)).' },
      { symbol: 'cos(u, v)', name: 'Cosine Similarity', description: 'Angular similarity between two vectors (range [-1.0, 1.0]).' },
      { symbol: 'k', name: 'Top-K Depth', description: 'Number of nearest neighbors to retrieve.' },
      { symbol: 'tau', name: 'Similarity Threshold', description: 'Cutoff score below which retrieved candidates are discarded.' },
    ],

    numericalExample: {
      scenario: 'Given query q and 3 candidate vectors, rank them using Cosine Similarity and evaluate against threshold tau = 0.70.',
      dataset: [
        { id: 'q', v1: 1.0, v2: 0.0, desc: 'Query vector' },
        { id: 'd1', v1: 0.95, v2: 0.31, desc: 'Candidate 1' },
        { id: 'd2', v1: 0.60, v2: 0.80, desc: 'Candidate 2' },
        { id: 'd3', v1: -0.80, v2: 0.60, desc: 'Candidate 3' },
      ],
      calculations: [
        {
          step: 'Check Vector Norms',
          math: '||q|| = 1.0; ||d1|| = sqrt(0.95^2 + 0.31^2) = sqrt(0.9025 + 0.0961) = 0.9993 ≈ 1.0; ||d2|| = sqrt(0.36 + 0.64) = 1.0; ||d3|| = sqrt(0.64 + 0.36) = 1.0',
          result: 'All candidate vectors are unit length.',
        },
        {
          step: 'Compute Dot Products (Cosine Similarities)',
          math: 'Sim(q, d1) = 1.0 * 0.95 + 0.0 * 0.31 = 0.95; Sim(q, d2) = 1.0 * 0.60 + 0.0 * 0.80 = 0.60; Sim(q, d3) = 1.0 * (-0.80) + 0.0 * 0.60 = -0.80',
          result: 'Scores: d1 = 0.95, d2 = 0.60, d3 = -0.80',
        },
        {
          step: 'Apply Threshold tau = 0.70 for Top-2',
          math: 'd1 (0.95 >= 0.70) -> ACCEPTED. d2 (0.60 < 0.70) -> REJECTED. d3 (-0.80 < 0.70) -> REJECTED.',
          result: 'Only d1 is accepted; d2 and d3 are filtered out.',
        },
      ],
      finalConclusion: 'Even though k=2 was requested, only 1 candidate met the quality threshold. The system passes d1 to context and refrains from hallucinating on d2.',
    },

    visualExplanation: {
      title: 'Top-K Retrieval with Min-Heap Priority Queues',
      description: 'Understanding how large vector engines retrieve top-k elements in O(N log k) without sorting all N items.',
      features: [
        'Full Sort Inefficiency: Sorting all N documents takes O(N log N). For 10 million documents, N log N requires ~230 million operations.',
        'Bounded Min-Heap: Maintain a heap of size k. For each new score, if score > heap.root, replace root and heapify down in O(log k). Total time is O(N log k).',
        'Score Threshold Pruning: Discard elements immediately if score < tau before even touching the heap.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Top-K Vector Retrieval with Min-Heap Priority Queue',
      code: `import heapq
import numpy as np

# Deterministic seed for reproducible verification
np.random.seed(42)

class VectorRetriever:
    """Exact Top-k Vector Retriever using bounded min-heaps."""
    def __init__(self, corpus_texts: list, corpus_vectors: np.ndarray):
        self.corpus_texts = corpus_texts
        # Normalize corpus to unit length
        norms = np.linalg.norm(corpus_vectors, axis=1, keepdims=True)
        self.vectors = corpus_vectors / norms

    def search(self, query_vec: np.ndarray, top_k: int = 2, threshold: float = 0.5):
        q_norm = query_vec / np.linalg.norm(query_vec)
        # Compute dot products
        scores = np.dot(self.vectors, q_norm)
        
        # Min-heap of tuple: (score, doc_index)
        heap = []
        for idx, score in enumerate(scores):
            if score < threshold:
                continue
            if len(heap) < top_k:
                heapq.heappush(heap, (score, idx))
            elif score > heap[0][0]:
                heapq.heapreplace(heap, (score, idx))
                
        # Sort in descending order
        results = sorted(heap, key=lambda x: x[0], reverse=True)
        return [(self.corpus_texts[idx], round(float(score), 4)) for score, idx in results]

docs = [
    "PostgreSQL pgvector extension implements HNSW vector graph search.",
    "B-Tree indexes are optimized for one-dimensional scalar inequality queries.",
    "Convolutional layers perform spatial feature extraction in image classification.",
    "Hierarchical Navigable Small World graphs provide sub-linear vector search."
]

# 4D synthetic vectors
embeddings = np.array([
    [0.91, 0.38, 0.12, 0.05],
    [0.55, 0.78, 0.20, 0.10],
    [0.10, 0.15, 0.95, 0.25],
    [0.89, 0.42, 0.10, 0.08]
])

retriever = VectorRetriever(docs, embeddings)
query = np.array([0.90, 0.40, 0.10, 0.05])
matches = retriever.search(query, top_k=2, threshold=0.80)

print(f"Retrieved {len(matches)} matches above threshold:")
for text, score in matches:
    print(f"  [Score: {score}] {text[:55]}...")`,
      explanation: 'Uses heapq with bounded size k to efficiently track the top-k highest scoring elements while filtering by minimum similarity threshold.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Verification: NearestNeighbors Distance Evaluation',
      code: `import numpy as np
from sklearn.neighbors import NearestNeighbors

# Synthetic normalized vectors (3 documents, 3 dimensions)
X = np.array([
    [1.0, 0.0, 0.0],
    [0.7071, 0.7071, 0.0],
    [0.0, 1.0, 0.0]
])

# Query vector
q = np.array([[1.0, 0.0, 0.0]])

# Fit NearestNeighbors with Cosine Metric
nn = NearestNeighbors(n_neighbors=3, metric='cosine')
nn.fit(X)

distances, indices = nn.kneighbors(q)

print("Scikit-Learn NearestNeighbors Cosine Results:")
for dist, idx in zip(distances[0], indices[0]):
    sim = 1.0 - dist
    print(f"Index {idx} | Cosine Distance: {dist:.4f} | Cosine Sim: {sim:.4f}")`,
      explanation: 'Verifies the direct relationship where cosine similarity = 1.0 - cosine_distance in scikit-learn NearestNeighbors.',
    },

    runnableCode: {
      code: `import numpy as np

# Set deterministic seed
np.random.seed(42)

# Query and 3 candidate vectors
q = np.array([1.0, 0.0, 0.0])
candidates = np.array([
    [0.96, 0.28, 0.0],   # Close
    [0.71, 0.71, 0.0],   # Moderate
    [-0.50, 0.86, 0.0]   # Far
])

# Compute cosine similarities
scores = np.dot(candidates, q)
threshold = 0.80

# Filter by threshold and take top-k
valid_indices = [i for i, s in enumerate(scores) if s >= threshold]
sorted_valid = sorted(valid_indices, key=lambda i: scores[i], reverse=True)

print("Candidates Meeting Threshold (>= 0.80):", sorted_valid)
print("Accepted Score:", round(float(scores[sorted_valid[0]]), 4))`,
      expectedOutput: `Candidates Meeting Threshold (>= 0.80): [0]
Accepted Score: 0.96`,
    },

    lineByLineExplanation: [
      {
        lines: 'scores = np.dot(candidates, q)',
        codeSnippet: 'scores = np.dot(candidates, q)',
        explanation: 'Computes dot products against query vector q across all candidates in parallel.',
      },
      {
        lines: 'valid_indices = [i for i, s in enumerate(scores) if s >= threshold]',
        codeSnippet: '[i for i, s in enumerate(scores) if s >= threshold]',
        explanation: 'Filters out low-similarity candidates that fall below the minimum confidence threshold.',
      },
    ],

    hyperparameters: [
      {
        name: 'Top-k Retrieval Cutoff',
        defaultVal: '3 to 5',
        range: '1 to 50',
        effect: 'Limits the number of candidate documents returned to downstream prompt assembly.',
        recommendation: 'Use k=3 for single-hop factual QA; use k=8 to 15 when using a Cross-Encoder reranker.',
      },
      {
        name: 'Similarity Score Cutoff (tau)',
        defaultVal: '0.65 to 0.75',
        range: '0.0 to 1.0',
        effect: 'Discards irrelevant low-confidence matches before they can trigger model hallucinations.',
        recommendation: 'Tune empirically using out-of-domain benchmark questions to ensure 100% abstention on nonsense.',
      },
    ],

    assumptions: [
      {
        assumption: 'All Vectors are Normalized to Unit L2 Norm',
        whyItMatters: 'If vectors are unnormalized, raw dot product favors long documents with large norm rather than true semantic alignment.',
        howToVerify: 'Verify np.allclose(np.linalg.norm(vectors, axis=1), 1.0).',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Returning Top-k unconditionally without a similarity threshold',
        solution: 'If a user asks about "the recipe for chocolate cookies" in an enterprise codebase vector store, the engine will still return the top-3 closest code snippets unless a threshold blocks them.',
      },
      {
        mistake: 'Using Euclidean distance on unnormalized vectors for text retrieval',
        solution: 'Always normalize text vectors or use cosine metric to prevent document length from biasing retrieval.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Customer Support Helpdesk',
        application: 'Intelligent Query Routing',
        benefit: 'Routes user tickets to specialized support teams based on cosine similarity to historical ticket clusters.',
      },
      {
        industry: 'Cybersecurity & Threat Detection',
        application: 'Anomaly Log Detection',
        benefit: 'Detects novel malware attack signatures that exhibit low similarity to known benign system logs.',
      },
    ],

    practiceQuestions: [
      {
        id: 'rag-05-pq1',
        question: 'What is the algorithmic time complexity of retrieving Top-k elements from N vectors using a bounded min-heap versus full array sorting?',
        answer: 'Full sorting takes O(N log N) time. Using a bounded min-heap of size k takes O(N log k) time. When k << N (e.g. k=5, N=1,000,000), min-heap retrieval is significantly faster and uses O(k) auxiliary memory.',
        explanation: 'The min-heap only needs to maintain the k best elements seen so far.',
      },
      {
        id: 'rag-05-pq2',
        question: 'Why does Euclidean distance equal 2 * (1 - Cosine Similarity) for unit-normalized vectors?',
        answer: 'Because ||u - v||^2 = ||u||^2 + ||v||^2 - 2(u · v). When ||u|| = 1 and ||v|| = 1, this simplifies to 1 + 1 - 2(u · v) = 2(1 - cos(u, v)).',
        explanation: 'Minimizing Euclidean distance is strictly equivalent to maximizing cosine similarity.',
      },
      {
        id: 'rag-05-pq3',
        question: 'What is the "Curse of Dimensionality" in high-dimensional nearest neighbor search?',
        answer: 'As dimensionality D grows into the hundreds or thousands, the ratio of distance between the nearest neighbor and the furthest point approaches 1.0 ((d_max - d_min) / d_min -> 0), meaning all points appear almost equidistant in ambient Euclidean space.',
        explanation: 'Requires learned continuous manifolds and approximate graph indexing (HNSW) to navigate effectively.',
      },
    ],

    quiz: [
      {
        id: 'rag-05-q1',
        question: 'What happens if a user submits a query that has zero relevance to the indexed document corpus, and no similarity threshold is set?',
        options: [
          'The vector database throws a syntax error',
          'The retriever returns the k least-irrelevant documents, likely inducing the LLM to hallucinate',
          'The LLM automatically turns off generation',
          'The query vector norm becomes zero',
        ],
        correctIndex: 1,
        explanation: 'Without a score threshold, top-k retrieval always returns k candidates regardless of how low their scores are.',
      },
      {
        id: 'rag-05-q2',
        question: 'Which distance metric is scale-invariant and bounded between -1.0 and 1.0?',
        options: [
          'Euclidean (L2) distance',
          'Cosine similarity',
          'Manhattan (L1) distance',
          'Mahalanobis distance',
        ],
        correctIndex: 1,
        explanation: 'Cosine similarity measures only angular direction, normalizing away vector lengths into [-1.0, 1.0].',
      },
      {
        id: 'rag-05-q3',
        question: 'What data structure is optimal for finding Top-k elements in a stream of N scores without storing all N items?',
        options: [
          'A FIFO Queue of size N',
          'A Bounded Min-Heap of size k',
          'A Binary Search Tree with N nodes',
          'A Hash Map with N keys',
        ],
        correctIndex: 1,
        explanation: 'A bounded min-heap of size k retains the top-k highest scores with O(log k) insertion complexity.',
      },
    ],

    independentExercise: {
      title: 'Build a Vector Search Engine with Similarity Thresholding in Python',
      problem:
        'Write a Python class `VectorIndex` with method `query(q_vec, k=3, min_similarity=0.7)` that returns a list of dictionaries `[{"id": doc_id, "score": sim}]` sorted in descending order, containing only documents with similarity >= `min_similarity`.',
      hints: [
        'Normalize both the corpus vectors and the query vector.',
        'Compute dot products.',
        'Filter by `min_similarity` before slicing top-k.',
      ],
      starterCode: `import numpy as np

class VectorIndex:
    def __init__(self, doc_ids: list, vectors: np.ndarray):
        # TODO: Store normalized vectors and IDs
        pass

    def query(self, q_vec: np.ndarray, k: int = 3, min_similarity: float = 0.7) -> list:
        # TODO: Implement thresholded top-k query
        pass

ids = ["docA", "docB", "docC"]
vecs = np.array([[1.0, 0.0], [0.8, 0.6], [0.0, 1.0]])
index = VectorIndex(ids, vecs)
print(index.query(np.array([1.0, 0.0]), k=2, min_similarity=0.75))`,
      solution: `import numpy as np

class VectorIndex:
    def __init__(self, doc_ids: list, vectors: np.ndarray):
        self.doc_ids = doc_ids
        norms = np.linalg.norm(vectors, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        self.vectors = vectors / norms

    def query(self, q_vec: np.ndarray, k: int = 3, min_similarity: float = 0.7) -> list:
        q_norm = q_vec / (np.linalg.norm(q_vec) or 1.0)
        scores = np.dot(self.vectors, q_norm)
        
        # Filter and sort
        results = []
        for doc_id, score in zip(self.doc_ids, scores):
            if score >= min_similarity:
                results.append({"id": doc_id, "score": round(float(score), 4)})
                
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:k]

ids = ["docA", "docB", "docC"]
vecs = np.array([[1.0, 0.0], [0.8, 0.6], [0.0, 1.0]])
index = VectorIndex(ids, vecs)
print(index.query(np.array([1.0, 0.0]), k=2, min_similarity=0.75))`,
    },

    summary: {
      keyTakeaways: [
        'Cosine similarity measures pure angular orientation, eliminating document length bias.',
        'For unit-normalized vectors, Euclidean distance minimization is mathematically equivalent to cosine similarity maximization.',
        'Similarity score cutoffs prevent out-of-distribution hallucinations by rejecting irrelevant noise.',
      ],
      nextLessonId: 'rag-06-vector-databases-indexing',
      nextLessonTitle: 'RAG-06: Vector Databases & Indexing (HNSW & IVF)',
      nextLessonModuleId: 'p8-m6',
    },
  },

  'rag-06-vector-databases-indexing': {
    id: 'rag-06-vector-databases-indexing',
    moduleId: 'p8-m6',
    title: 'RAG-06: Vector Databases & Indexing (HNSW & IVF)',
    subtitle: 'Hierarchical Navigable Small World Graphs, Inverted Files, and PostgreSQL pgvector',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Advanced',
    visualizerType: 'rag-vector-space-explorer',

    objectives: [
      'Contrast exact k-NN brute-force search against Approximate Nearest Neighbor (ANN) indexing',
      'Explain the multi-layer skip-list graph mechanics of Hierarchical Navigable Small World (HNSW) indexes',
      'Understand Inverted File Flat (IVFFlat) Voronoi cell partitioning and centroid clustering',
      'Analyze the fundamental trade-off triangle: Retrieval Recall vs Query Latency vs Index Build Time and RAM',
      'Implement metadata filtering: Pre-filtering vs Post-filtering vs Single-Stage Hybrid Indexing in pgvector',
    ],
    prerequisites: [
      'Understanding of vector search fundamentals and distance metrics (Lesson RAG-05)',
      'Basic familiarity with graph data structures and skip lists',
    ],
    previousLesson: {
      id: 'rag-05-vector-search-fundamentals',
      title: 'RAG-05: Vector Search Fundamentals & Distance Metrics',
      moduleId: 'p8-m5',
    },

    analogy: {
      title: 'The Interstate Highway System versus The Neighborhood Grid',
      text: 'Imagine driving from Los Angeles to a specific house address in Boston. A naive exact brute-force search is like walking down every single residential sidewalk in America until you bump into the target house—it is 100% accurate, but it takes months. An HNSW index is the interstate highway network: at top Layer 2 (high speed, few exits), you fly across continents in giant leaps. Once you approach Massachusetts, you drop down to Layer 1 (state routes) to narrow in on Boston, and finally drop to Layer 0 (the neighborhood street grid) to make the final turn into the exact driveway in seconds.',
      metaphor: 'HNSW uses hierarchical multi-scale graph layers to achieve logarithmic O(log N) search across millions of vectors.',
    },

    problemSolved: {
      title: 'Why Approximate Nearest Neighbors (ANN) is Essential for Production Scale',
      description:
        'Exact brute-force k-NN search evaluates distance against every single document in the database (O(N) time complexity). When scaling to 10 million vectors, a single query requires 10 million vector dot products—taking 500+ milliseconds and melting server CPU. ANN algorithms like HNSW trade away an imperceptible 1% of recall to achieve 100x to 1000x faster sub-millisecond query latencies.',
      keyPoints: [
        'Reduces Query Complexity from linear O(N) to logarithmic O(log N) using small-world graph navigation',
        'Enables Sub-5 Millisecond Queries across multimillion-vector enterprise document catalogs',
        'Supports Combined SQL & Vector Filtering using extensions like PostgreSQL pgvector with unified ACID transactions',
        'Exposes Tuneable Trade-Off Knobs (M, efConstruction, efSearch) to balance RAM usage against retrieval accuracy',
      ],
    },

    intuition: {
      overview:
        'Modern vector databases organize high-dimensional vectors into navigable geometric indexes, primarily HNSW (graph-based) and IVF (clustering-based).',
      steps: [
        {
          step: 1,
          title: 'HNSW Multi-Layer Graph Construction',
          description:
            'Vectors are inserted into a multi-layered proximity graph. Higher layers contain sparse long-range highways; Layer 0 contains dense local clusters. Links are constrained by parameter M.',
        },
        {
          step: 2,
          title: 'Top-Down Greedy Beam Traversal',
          description:
            'Search begins at a fixed entry point in the topmost sparse layer. The algorithm greedily jumps to the neighbor closest to query q until reaching a local minimum, then drops down to the next denser layer.',
        },
        {
          step: 3,
          title: 'Layer 0 Beam Search Expansion',
          description:
            'In Layer 0, the search explores a priority queue of size efSearch to discover the top-k nearest neighbors.',
        },
        {
          step: 4,
          title: 'IVFFlat Alternative (Clustering)',
          description:
            'IVFFlat partitions the space into K Voronoi cells using k-means clustering. At query time, only the nprobe closest centroids are scanned, bypassing the remaining (K - nprobe) cells.',
        },
      ],
    },

    mathematics: {
      overview:
        'HNSW graph layer distribution is modeled probabilistically using an exponentially decaying scale factor.',
      foundations: [
        {
          name: 'HNSW Node Layer Probability Assignment',
          latex: 'l = \\lfloor -\\ln(\\text{unif}(0, 1)) \\cdot m_L \\rfloor \\quad \\text{where} \\quad m_L = \\frac{1}{\\ln(M)}',
          explanation:
            'Assigns each inserted vector to maximum layer l using an exponential decay distribution. Most nodes reside only in Layer 0; exponentially fewer reach higher highway layers.',
        },
        {
          name: 'IVFFlat Voronoi Partition Assignment',
          latex: 'C^*(x) = \\arg\\min_{j \\in \\{1, \\dots, N_{\\text{list}}\\}} \\|x - \\mathbf{c}_j\\|_2',
          explanation:
            'Inverted File indexing maps vector x to its closest centroid c_j, placing it into inverted list C_j for fast pruned retrieval.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of HNSW Logarithmic Search Time Complexity',
      objective: 'Prove that multi-layer graph navigation achieves expected O(log N) traversal time.',
      steps: [
        {
          step: 1,
          label: 'Layer Density Ratio',
          latex: '\\frac{N_{l+1}}{N_l} = e^{-1/m_L} = \\frac{1}{M}',
          explanation: 'The number of nodes decreases exponentially with each higher layer by a factor of 1/M.',
        },
        {
          step: 2,
          label: 'Total Layers in Graph',
          latex: 'L_{\\text{max}} \\approx \\log_M(N) = \\frac{\\ln(N)}{\\ln(M)}',
          explanation: 'The height of the HNSW graph scales logarithmically with the total corpus size N.',
        },
        {
          step: 3,
          label: 'Greedy Routing Steps per Layer',
          latex: 'T_{\\text{layer}} = O(1) \\implies T_{\\text{total}} = \\sum_{l=0}^{L_{\\text{max}}} O(1) = O(L_{\\text{max}}) = O(\\log N)',
          explanation: 'Greedy routing takes constant steps per layer, resulting in total query time scaling as O(log N).',
        },
      ],
    },

    variables: [
      { symbol: 'M', name: 'Max Outgoing Edges', description: 'Maximum number of bidirectional connections per node in HNSW graph (typically 16–64).' },
      { symbol: 'efConstruction', name: 'Build Beam Size', description: 'Size of dynamic candidate list evaluated during index construction (typically 100–400).' },
      { symbol: 'efSearch', name: 'Query Beam Size', description: 'Size of dynamic candidate list evaluated during query time (typically 32–128).' },
      { symbol: 'nlist', name: 'IVF Centroid Count', description: 'Number of Voronoi cluster centroids partitioned during IVF k-means training.' },
      { symbol: 'nprobe', name: 'IVF Probed Clusters', description: 'Number of nearest centroids scanned during query time (typically 5–20).' },
    ],

    numericalExample: {
      scenario: 'Compare query operations and memory consumption for 1,000,000 vectors (1536-dim) between Exact k-NN, IVFFlat, and HNSW.',
      dataset: [
        { parameter: 'Total Vectors N', value: '1,000,000' },
        { parameter: 'Dimensions D', value: 1536 },
        { parameter: 'Raw Vector Size', value: '1M * 1536 * 4 bytes = 6.14 GB' },
      ],
      calculations: [
        {
          step: 'Exact Brute-Force Operations',
          math: '1,000,000 vector dot products per query = 1,000,000 * 1536 = 1.536 Billion FLOPS (Latency: ~120ms)',
          result: 'Exact recall (100%), but unacceptable latency and server load.',
        },
        {
          step: 'IVFFlat (nlist=1000, nprobe=10)',
          math: 'Scan 1000 centroids + (10/1000) * 1M vectors = 1000 + 10,000 = 11,000 dot products (Latency: ~3ms)',
          result: '98.9% compute reduction; ~92–95% recall; zero extra memory over raw vectors.',
        },
        {
          step: 'HNSW (M=32, efSearch=64)',
          math: 'Logarithmic graph hops: ~1,500 distance calculations (Latency: ~1.2ms)',
          result: '99.8% compute reduction; ~99% recall; requires +1.5 GB extra RAM for graph edges.',
        },
      ],
      finalConclusion: 'HNSW provides the lowest latency and highest recall at the expense of higher RAM usage.',
    },

    visualExplanation: {
      title: 'HNSW Graph Traversal Architecture',
      description: 'Understanding multi-scale small-world navigation across sparse highway layers down to dense local neighborhoods.',
      features: [
        'Layer 2 (Highway): Sparse long-range connections. Quickly navigates across global semantic clusters.',
        'Layer 1 (Regional): Intermediate density. Narrows in on the sub-topic cluster.',
        'Layer 0 (Local Neighborhood): Dense graph containing all N vectors. Beam search finds the true nearest neighbors.',
        'PostgreSQL pgvector: Implements both HNSW and IVFFlat inside relational tables, allowing queries like: SELECT * FROM docs WHERE user_id = 42 ORDER BY embedding <=> $1 LIMIT 5.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Local Offline IVFFlat Vector Index Simulator',
      code: `import numpy as np

# Deterministic seed for reproducible verification
np.random.seed(42)

class ToyIVFFlatIndex:
    """Minimal Inverted File Index with K-means Voronoi partitioning."""
    def __init__(self, n_clusters=3):
        self.k = n_clusters
        self.centroids = None
        self.inverted_lists = {i: [] for i in range(n_clusters)}
        self.doc_texts = {}

    def fit_and_index(self, texts: list, vectors: np.ndarray):
        # Normalize
        norms = np.linalg.norm(vectors, axis=1, keepdims=True)
        norm_vecs = vectors / norms
        
        # Simple k-means initialization
        self.centroids = norm_vecs[:self.k].copy()
        
        # Assign vectors to closest centroid
        for idx, vec in enumerate(norm_vecs):
            dists = np.linalg.norm(self.centroids - vec, axis=1)
            best_cluster = int(np.argmin(dists))
            self.inverted_lists[best_cluster].append((idx, vec))
            self.doc_texts[idx] = texts[idx]

    def search(self, query_vec: np.ndarray, nprobe=2, top_k=2):
        q_norm = query_vec / np.linalg.norm(query_vec)
        # Find closest centroids
        centroid_dists = np.linalg.norm(self.centroids - q_norm, axis=1)
        probed_clusters = np.argsort(centroid_dists)[:nprobe]
        
        # Scan only candidates in probed clusters
        candidates = []
        for c in probed_clusters:
            for doc_idx, doc_vec in self.inverted_lists[c]:
                sim = float(np.dot(doc_vec, q_norm))
                candidates.append((self.doc_texts[doc_idx], sim))
                
        candidates.sort(key=lambda x: x[1], reverse=True)
        return candidates[:top_k]

corpus = [
    "Postgres pgvector extension indexes dense vectors.",
    "HNSW small world graphs provide fast logarithmic search.",
    "B-Tree relational indexes manage primary keys and scalar data.",
    "Convolutional vision models process pixel tensors."
]
embeddings = np.array([
    [0.9, 0.4, 0.1],
    [0.85, 0.45, 0.1],
    [0.5, 0.8, 0.2],
    [0.1, 0.2, 0.9]
])

ivf = ToyIVFFlatIndex(n_clusters=2)
ivf.fit_and_index(corpus, embeddings)
query = np.array([0.88, 0.42, 0.05])
results = ivf.search(query, nprobe=1, top_k=2)

print("IVF Scanned Top Results:")
for text, sim in results:
    print(f"[{sim:.4f}] {text}")`,
      explanation: 'Demonstrates Voronoi centroid clustering and inverted list scanning: queries evaluate distance only against probed clusters, skipping unprobed candidate lists.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Verification: Exact vs Approximate k-NN Benchmarking',
      code: `import numpy as np
from sklearn.neighbors import NearestNeighbors

np.random.seed(42)
N, D = 1000, 16
X = np.random.randn(N, D)
X = X / np.linalg.norm(X, axis=1, keepdims=True)

# Exact Nearest Neighbors
exact_nn = NearestNeighbors(n_neighbors=5, algorithm='brute', metric='cosine')
exact_nn.fit(X)

query = np.random.randn(1, D)
query = query / np.linalg.norm(query)

exact_dist, exact_idx = exact_nn.kneighbors(query)
print("Exact Brute-Force Nearest Neighbor Indices:", exact_idx[0].tolist())
print("Exact Distances:", np.round(exact_dist[0], 4).tolist())`,
      explanation: 'Uses scikit-learn NearestNeighbors to establish exact ground-truth nearest neighbors for recall validation.',
    },

    runnableCode: {
      code: `import numpy as np

# Simulate Voronoi centroids (2 clusters) and 4 candidate vectors
centroids = np.array([[1.0, 0.0], [0.0, 1.0]])
docs = [
    (0, np.array([0.98, 0.20])), # Cluster 0
    (0, np.array([0.92, 0.38])), # Cluster 0
    (1, np.array([0.15, 0.98])), # Cluster 1
    (1, np.array([0.05, 0.99])), # Cluster 1
]

query = np.array([0.95, 0.31])
# Step 1: Probe closest centroid
dists = np.linalg.norm(centroids - query, axis=1)
probed_cluster = int(np.argmin(dists))

# Step 2: Search only inside probed cluster
cluster_candidates = [doc for c, doc in docs if c == probed_cluster]
scores = [np.dot(doc, query) for doc in cluster_candidates]

print("Probed Cluster Centroid:", probed_cluster)
print("Candidates Scanned:", len(cluster_candidates), "of", len(docs))
print("Best Match Score:", round(float(max(scores)), 4))`,
      expectedOutput: `Probed Cluster Centroid: 0
Candidates Scanned: 2 of 4
Best Match Score: 0.9918`,
    },

    lineByLineExplanation: [
      {
        lines: 'dists = np.linalg.norm(centroids - query, axis=1)',
        codeSnippet: 'np.linalg.norm(centroids - query, axis=1)',
        explanation: 'Evaluates distance from the query to all cluster centroids to identify which partition to visit.',
      },
      {
        lines: 'cluster_candidates = [doc for c, doc in docs if c == probed_cluster]',
        codeSnippet: '[doc for c, doc in docs if c == probed_cluster]',
        explanation: 'Prunes search space by retrieving only vectors assigned to the chosen Voronoi partition.',
      },
    ],

    hyperparameters: [
      {
        name: 'HNSW M (Max Edges per Node)',
        defaultVal: '16 to 32',
        range: '8 to 64',
        effect: 'Higher M increases recall and graph connectivity but increases RAM consumption and index build time.',
        recommendation: 'Use M=16 for low-memory constraints; use M=32 to 64 for mission-critical search accuracy.',
      },
      {
        name: 'HNSW efSearch (Query Beam Size)',
        defaultVal: '64',
        range: '16 to 512',
        effect: 'Higher efSearch increases search recall at the expense of slightly higher query latency.',
        recommendation: 'Tune efSearch dynamically per query based on user SLA requirements.',
      },
    ],

    assumptions: [
      {
        assumption: 'Graph Navigability (No Disconnected Subgraphs)',
        whyItMatters: 'If graph partitions become disconnected, search can become trapped in local minima and miss true nearest neighbors.',
        howToVerify: 'Verify index recall against exact brute-force search on a representative sample.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Using IVFFlat without re-training centroids when document distribution shifts',
        solution: 'If the data distribution changes significantly, retrain IVF centroids to prevent partition skew.',
      },
      {
        mistake: 'Post-filtering vectors after Top-k retrieval on highly selective metadata',
        solution: 'If you retrieve top-10 vectors and then filter WHERE tenant_id = 999, you may end up with zero matches. Use single-stage hybrid indexing or pre-filtering instead.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Enterprise SaaS Platforms',
        application: 'Multi-Tenant Document Search in PostgreSQL',
        benefit: 'Combines pgvector HNSW indexes with tenant_id filters to serve private enterprise search with zero data leakage.',
      },
      {
        industry: 'E-Commerce Recommendations',
        application: 'Real-Time Vector Candidate Generation',
        benefit: 'Retrieves top-50 candidate product vectors in under 2 milliseconds across a 50-million SKU catalog.',
      },
    ],

    practiceQuestions: [
      {
        id: 'rag-06-pq1',
        question: 'What is the primary difference in trade-offs between HNSW and IVFFlat index types?',
        answer: 'HNSW provides superior query latency and higher recall (>98%) but requires substantial additional RAM (1.5x to 2x vector size) to store graph edges. IVFFlat requires zero additional memory overhead beyond vector storage but has lower recall and requires periodic centroid training.',
        explanation: 'Choose HNSW for latency-sensitive search; choose IVFFlat when RAM is tightly constrained.',
      },
      {
        id: 'rag-06-pq2',
        question: 'Why does naive post-filtering fail when querying highly restrictive metadata tags?',
        answer: 'If you retrieve the top 5 vectors from the entire database and then filter by a rare metadata tag (e.g. department = "Biochemistry" representing 0.1% of data), all 5 retrieved vectors will likely belong to other departments and be discarded, leaving 0 results.',
        explanation: 'Pre-filtering or integrated single-stage filtering in pgvector solves this by evaluating metadata constraints during traversal.',
      },
      {
        id: 'rag-06-pq3',
        question: 'What role does the efSearch parameter play in HNSW graph querying?',
        answer: 'efSearch controls the size of the dynamic priority queue candidate list maintained during Layer 0 graph traversal. A larger efSearch explores more neighboring nodes, increasing recall toward 100% at the cost of slightly higher query time.',
        explanation: 'Allows tuning accuracy vs speed at query time without rebuilding the index.',
      },
    ],

    quiz: [
      {
        id: 'rag-06-q1',
        question: 'In PostgreSQL with the pgvector extension, which SQL operator represents Cosine Distance?',
        options: [
          '<-> (Euclidean L2 Distance)',
          '<=> (Cosine Distance)',
          '<#> (Negative Inner Product)',
          '<+> (Manhattan L1 Distance)',
        ],
        correctIndex: 1,
        explanation: 'In pgvector, <=> computes cosine distance (1 - cosine similarity), <-> computes L2 distance, and <#> computes negative inner product.',
      },
      {
        id: 'rag-06-q2',
        question: 'How does an HNSW graph avoid getting trapped in local minima during nearest neighbor search?',
        options: [
          'By erasing all vectors after every query',
          'By using long-range highway links in upper layers to jump across local cluster boundaries before descending',
          'By computing exact brute-force dot products across all nodes',
          'By converting all numbers to 8-bit integers',
        ],
        correctIndex: 1,
        explanation: 'Hierarchical layers provide skip-list long-range connections that bypass local clusters.',
      },
      {
        id: 'rag-06-q3',
        question: 'What is the primary operational drawback of exact brute-force k-NN search at enterprise scale?',
        options: [
          'It cannot compute dot products accurately',
          'It scales linearly O(N), causing queries across millions of documents to take hundreds of milliseconds',
          'It requires 100x more RAM than HNSW',
          'It only works on English documents',
        ],
        correctIndex: 1,
        explanation: 'Linear O(N) scaling forces full scans across millions of records, violating real-time interactive query SLAs.',
      },
    ],

    independentExercise: {
      title: 'Benchmark Exact k-NN vs Pruned Index Search in Python',
      problem:
        'Write a Python benchmark function `benchmark_pruning(corpus_vectors, query_vec, prune_fraction=0.1)` that compares the execution speed of full brute-force dot product versus scanning only a 10% subset of vectors.',
      hints: [
        'Use `time.perf_counter()` to measure execution time.',
        'Evaluate full dot product across all N vectors.',
        'Evaluate dot product across `N * prune_fraction` vectors.',
        'Compute the speedup factor.',
      ],
      starterCode: `import time
import numpy as np

def benchmark_pruning(N=100000, D=128, prune_fraction=0.1) -> dict:
    # TODO: Implement timing benchmark
    pass

print(benchmark_pruning(N=50000, D=64, prune_fraction=0.1))`,
      solution: `import time
import numpy as np

def benchmark_pruning(N=100000, D=128, prune_fraction=0.1) -> dict:
    np.random.seed(42)
    corpus = np.random.randn(N, D).astype(np.float32)
    query = np.random.randn(D).astype(np.float32)
    
    # Full scan
    t0 = time.perf_counter()
    scores_full = np.dot(corpus, query)
    top_full = np.argsort(scores_full)[::-1][:5]
    t_full = time.perf_counter() - t0
    
    # Pruned scan (subset)
    subset_size = int(N * prune_fraction)
    corpus_sub = corpus[:subset_size]
    t1 = time.perf_counter()
    scores_sub = np.dot(corpus_sub, query)
    top_sub = np.argsort(scores_sub)[::-1][:5]
    t_sub = time.perf_counter() - t1
    
    return {
        "N": N,
        "D": D,
        "full_scan_ms": round(t_full * 1000, 2),
        "pruned_scan_ms": round(t_sub * 1000, 2),
        "speedup_factor": round(t_full / max(t_sub, 1e-9), 1)
    }

print(benchmark_pruning(N=50000, D=64, prune_fraction=0.1))`,
    },

    summary: {
      keyTakeaways: [
        'Approximate Nearest Neighbor (ANN) indexing replaces O(N) linear scans with O(log N) search.',
        'HNSW uses hierarchical multi-layer skip graphs to deliver sub-millisecond retrieval with >98% recall.',
        'PostgreSQL with pgvector provides production ACID compliance and unified metadata filtering alongside vector indexing.',
      ],
      nextLessonId: 'rag-07-retrieval-quality-metrics',
      nextLessonTitle: 'RAG-07: Retrieval Quality & Evaluation Metrics',
      nextLessonModuleId: 'p8-m7',
    },
  },
};
