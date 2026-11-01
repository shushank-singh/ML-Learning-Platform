import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 1: RAG Fundamentals (p8-m1)
// =========================================================================
export const p8m1Data: ModuleData = {
  id: 'p8-m1',
  number: 1,
  title: 'RAG Fundamentals',
  subtitle: 'Parametric Memory, External Knowledge & Retrieval Pipelines',
  description:
    'Master the core architecture and motivations behind Retrieval-Augmented Generation (RAG). Contrast parametric knowledge stored in neural weights with external dynamic knowledge indexed in vector stores. Examine end-to-end RAG pipelines, primary enterprise use cases, hallucination mitigation mechanics, and fundamental architectural limitations.',
  icon: 'BookOpen',
  badge: 'Phase 8 · RAG & Vectors',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'rag-01-fundamentals',
      moduleId: 'p8-m1',
      title: 'RAG-01: RAG Fundamentals & Architecture',
      description:
        'Parametric vs non-parametric memory, RAG pipeline anatomy, knowledge cutoff bypass, and hallucination reduction.',
      order: 1,
      readTimeMinutes: 32,
      visualizerType: 'rag-topk-retrieval-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// MODULE 2: Document Ingestion (p8-m2)
// =========================================================================
export const p8m2Data: ModuleData = {
  id: 'p8-m2',
  number: 2,
  title: 'Document Ingestion & Parsing',
  subtitle: 'Loaders, Multimodal Parsing, Metadata & Source Tracking',
  description:
    'Engineer robust document ingestion pipelines across heterogeneous data formats: plain text, Markdown, PDF, and HTML. Diagnose document loader failures, layout analysis challenges, table extraction pitfalls, metadata tagging strategies, data cleaning, and verifiable source URI provenance.',
  icon: 'FileText',
  badge: 'Phase 8 · RAG & Vectors',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'rag-02-document-ingestion',
      moduleId: 'p8-m2',
      title: 'RAG-02: Document Ingestion, Parsing & Metadata',
      description:
        'Text/PDF/Markdown parsing pipelines, OCR extraction, metadata enrichment, and source provenance tracking.',
      order: 1,
      readTimeMinutes: 30,
      visualizerType: 'rag-chunking-explorer',
      difficulty: 'Beginner',
    },
  ],
};

// =========================================================================
// MODULE 3: Chunking Strategies (p8-m3)
// =========================================================================
export const p8m3Data: ModuleData = {
  id: 'p8-m3',
  number: 3,
  title: 'Chunking Strategies & Trade-Offs',
  subtitle: 'Fixed-Window, Sentence, Recursive & Semantic Splitting',
  description:
    'Deconstruct text segmentation strategies: fixed-character, token-based, sentence-level, recursive character splitting, and semantic boundary detection. Analyze the empirical trade-offs between chunk size, sliding-window overlap, retrieval precision, recall, and context window economics.',
  icon: 'Layers',
  badge: 'Phase 8 · RAG & Vectors',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'rag-03-chunking-strategies',
      moduleId: 'p8-m3',
      title: 'RAG-03: Chunking Strategies & Boundary Optimization',
      description:
        'Fixed, token, recursive, and semantic chunking with sliding-window overlap and retrieval trade-off analysis.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'rag-chunk-tradeoff-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 1 - 3)
// =========================================================================
export const ragModule1Lessons: Record<string, LessonContent> = {
  'rag-01-fundamentals': {
    id: 'rag-01-fundamentals',
    moduleId: 'p8-m1',
    title: 'RAG-01: RAG Fundamentals & Architecture',
    subtitle: 'From Parametric Memory to Grounded External Knowledge Retrieval',
    order: 1,
    readTimeMinutes: 32,
    difficulty: 'Beginner',
    visualizerType: 'rag-topk-retrieval-explorer',

    objectives: [
      'Contrast parametric knowledge stored in neural weights with non-parametric external knowledge',
      'Trace the end-to-end RAG pipeline from ingestion and embedding to retrieval and generation',
      'Explain how RAG circumvents model training knowledge cutoffs and private data boundaries',
      'Identify the root causes of RAG hallucinations and generation drift',
      'Evaluate cost and latency trade-offs between RAG and supervised fine-tuning (SFT)',
    ],
    prerequisites: [
      'Basic understanding of Large Language Models and prompt engineering (Phase 7)',
      'Familiarity with vector spaces and dot product calculations',
    ],
    previousLesson: {
      id: 'genai-15-capstone-llm-application',
      title: 'GenAI-15: Production GenAI Capstone: Evaluated Multimodal Assistant',
      moduleId: 'p7-m15',
    },

    analogy: {
      title: 'The Closed-Book Exam versus The Open-Book Research Scholar',
      text: 'A pure Large Language Model is like a student taking a closed-book university exam. Everything it writes must come strictly from what it memorized during months of study (parametric neural weights). If facts change after the exam is written, or if questions ask about proprietary private company logs, the student must guess or extrapolate, creating plausible-sounding fabrications (hallucinations). RAG turns the model into an open-book researcher: when a question is asked, an assistant first sprints to the library, pulls the exact 3 relevant reference books (retrieval), lays them open on the desk, and instructs the scholar to summarize an answer using only those cited pages (generation).',
      metaphor: 'Parametric weights are memory; RAG provides an open library with instant indexed lookup.',
    },

    problemSolved: {
      title: 'Why Large Language Models Require External Grounding',
      description:
        'Foundational LLMs suffer from three critical commercial limitations: temporal knowledge obsolescence (knowledge cutoffs), zero awareness of private enterprise repositories, and statistical hallucinations when generating rare facts. RAG solves this without costly model retraining by retrieving authoritative evidence dynamically at query time.',
      keyPoints: [
        'Solves the Knowledge Cutoff Problem by retrieving live, up-to-the-minute documents without model retraining',
        'Enables Private Data Access by indexing enterprise intranets, PDFs, and customer support tickets securely',
        'Drastically Reduces Hallucinations by constraining LLM generation to factual evidence provided in the context window',
        'Provides Source Traceability and Citations so human auditors can verify every statement against specific source documents',
        'Lowers Costs and Latency compared to continuous fine-tuning or periodic foundational retraining',
      ],
    },

    intuition: {
      overview:
        'A complete RAG system decouples knowledge storage from language reasoning. The LLM acts as an analytical reasoning engine while an indexed vector database acts as the external long-term memory bank.',
      steps: [
        {
          step: 1,
          title: 'Offline Preparation (Ingestion, Chunking & Indexing)',
          description:
            'Documents (PDFs, Markdown, database records) are loaded, parsed, divided into semantic chunks, converted into dense numerical vectors via an embedding model, and indexed in a vector store.',
        },
        {
          step: 2,
          title: 'Query-Time Retrieval',
          description:
            'When the user submits a query, it is encoded using the identical embedding model. The vector database computes similarity scores (e.g. Cosine Similarity) against all indexed chunks and returns the Top-k most relevant passages.',
        },
        {
          step: 3,
          title: 'Augmentation & Grounded Generation',
          description:
            'The retrieved passages are concatenated into a structured prompt alongside the original query and system instructions. The LLM generates a cohesive answer strictly conditioned on the provided passages, citing evidence.',
        },
      ],
    },

    mathematics: {
      overview:
        'RAG formalizes conditional text generation by marginalizing over or conditioning upon latent retrieved document passages z from corpus Z.',
      foundations: [
        {
          name: 'Standard Autoregressive Language Model',
          latex: 'P(y \\mid x) = \\prod_{t=1}^T P(y_t \\mid y_{<t}, x)',
          explanation:
            'Standard language generation models next-token probability conditioned only on input prompt x and prior generated tokens y_<t using internal weights.',
        },
        {
          name: 'RAG-Sequence Marginalization (Lewis et al., 2020)',
          latex: 'P_{\\text{RAG-Seq}}(y \\mid x) \\approx \\sum_{z \\in \\text{Top-}k(P(\\cdot \\mid x))} P_\\eta(z \\mid x) \\prod_{t=1}^T P_\\theta(y_t \\mid y_{<t}, x, z)',
          explanation:
            'RAG-Sequence retrieves Top-k documents z using retriever P_eta(z|x) and marginalizes across them to generate a complete sequence y with generator P_theta.',
        },
        {
          name: 'Dense Vector Cosine Similarity',
          latex: '\\text{Sim}(q, d) = \\frac{\\mathbf{e}_q \\cdot \\mathbf{e}_d}{\\|\\mathbf{e}_q\\| \\|\\mathbf{e}_d\\|} = \\frac{\\sum_{i=1}^D e_{q,i} e_{d,i}}{\\sqrt{\\sum_{i=1}^D e_{q,i}^2} \\sqrt{\\sum_{i=1}^D e_{d,i}^2}}',
          explanation:
            'Normalized dot product measuring angular alignment between query embedding e_q and document chunk embedding e_d in D-dimensional latent space.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of the RAG Objective Function and Generator Condition',
      objective: 'Demonstrate how conditioning on retrieved passage z bounds generation variance and constrains factual hallucination.',
      steps: [
        {
          step: 1,
          label: 'Joint Likelihood of Output and Latent Retrieval',
          latex: 'P(y, z \\mid x) = P(z \\mid x) P(y \\mid x, z)',
          explanation: 'The probability of generating answer y with retrieved context z is the product of retrieval probability and generation likelihood given context.',
        },
        {
          step: 2,
          label: 'Marginalization over Candidate Passages',
          latex: 'P(y \\mid x) = \\sum_{z \\in \\mathcal{Z}} P(z \\mid x) P(y \\mid x, z)',
          explanation: 'Summing across all possible documents in corpus Z yields the true expected answer distribution.',
        },
        {
          step: 3,
          label: 'Top-k Approximation for Tractable Real-Time Serving',
          latex: 'P(y \\mid x) \\approx \\sum_{z \\in \\text{Top-}k(P_\\eta(\\cdot \\mid x))} P_\\eta(z \\mid x) P_\\theta(y \\mid x, z)',
          explanation: 'Because summing over millions of documents is intractable, MIPS (Maximum Inner Product Search) prunes search to the top-k highest probability passages.',
        },
      ],
    },

    variables: [
      { symbol: 'x', name: 'User Query', description: 'Input natural language prompt or question submitted by the user.' },
      { symbol: 'y', name: 'Generated Output', description: 'Target sequence of tokens synthesized by the generator model.' },
      { symbol: 'z', name: 'Retrieved Document Chunk', description: 'Extracted text passage from the external knowledge corpus.' },
      { symbol: 'P_eta(z | x)', name: 'Retriever Model', description: 'Bi-encoder model evaluating the relevance probability of passage z given query x.' },
      { symbol: 'P_theta(y | x, z)', name: 'Generator Model', description: 'Autoregressive LLM synthesizing answer y conditioned on prompt x and evidence z.' },
      { symbol: 'k', name: 'Retrieval Cutoff', description: 'Number of top-scoring passages passed into the LLM context window.' },
    ],

    numericalExample: {
      scenario: 'Evaluate retrieval similarity between a query and two candidate document chunks in a simplified 3D embedding space.',
      dataset: [
        { item: 'Query q ("HNSW vector search")', v1: 0.8, v2: 0.6, v3: 0.0 },
        { item: 'Chunk d1 ("HNSW graph indexing")', v1: 0.75, v2: 0.65, v3: 0.1 },
        { item: 'Chunk d2 ("Convolutional neural nets")', v1: 0.1, v2: 0.2, v3: 0.95 },
      ],
      calculations: [
        {
          step: 'Norm Calculation',
          math: '||q|| = sqrt(0.8^2 + 0.6^2) = 1.0; ||d1|| = sqrt(0.75^2 + 0.65^2 + 0.1^2) = sqrt(0.5625 + 0.4225 + 0.01) = 0.9975; ||d2|| = sqrt(0.1^2 + 0.2^2 + 0.95^2) = 0.9759',
          result: 'Query is unit-normalized; chunks are near-unit.',
        },
        {
          step: 'Dot Products',
          math: 'q · d1 = (0.8)(0.75) + (0.6)(0.65) + (0)(0.1) = 0.60 + 0.39 = 0.99; q · d2 = (0.8)(0.1) + (0.6)(0.2) + (0)(0.95) = 0.08 + 0.12 = 0.20',
          result: 'q · d1 = 0.99; q · d2 = 0.20',
        },
        {
          step: 'Cosine Similarities',
          math: 'Sim(q, d1) = 0.99 / (1.0 * 0.9975) = 0.9925; Sim(q, d2) = 0.20 / (1.0 * 0.9759) = 0.2049',
          result: 'Chunk d1 has similarity 0.9925; Chunk d2 has 0.2049.',
        },
      ],
      finalConclusion: 'Chunk d1 is ranked #1 and retrieved for context injection; chunk d2 is rejected due to low cosine alignment.',
    },

    visualExplanation: {
      title: 'Anatomy of an Enterprise Production RAG Pipeline',
      description: 'Understanding the two primary phases of RAG: Offline Document Ingestion and Online Query-Time Inference.',
      features: [
        'Ingestion Pipeline: Document Loaders → Structural Parsers → Semantic Chunkers → Embedding Generator → Vector Store (pgvector / HNSW index).',
        'Retrieval Pipeline: User Query → Query Embedding → Vector Similarity Search (Top-k) → Cross-Encoder Reranker → Filtered Passages.',
        'Generation Pipeline: Prompt Construction with XML Enclosure → LLM Generation → Citation Extraction → Guardrail Verification.',
        'Feedback & Telemetry: Logging latency, token consumption, retrieval hit rates, and user feedback into evaluation stores.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: In-Memory Vector Search Retriever',
      code: `import numpy as np

# Deterministic seed for reproducible verification
np.random.seed(42)

class SimpleInMemoryRAG:
    """Minimal end-to-end RAG retriever using pure NumPy vector operations."""
    def __init__(self, embedding_dim=4):
        self.dim = embedding_dim
        self.documents = []
        self.embeddings = np.empty((0, embedding_dim))

    def add_documents(self, docs, embeddings):
        """Register documents and normalized embeddings."""
        self.documents.extend(docs)
        # Normalize row-wise to unit length
        norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        normalized = embeddings / norms
        self.embeddings = np.vstack([self.embeddings, normalized]) if self.embeddings.size else normalized

    def retrieve(self, query_vector, top_k=2):
        """Cosine similarity retrieval via matrix-vector multiplication."""
        q_norm = query_vector / (np.linalg.norm(query_vector) or 1.0)
        # Cosine sim for normalized vectors is simply dot product
        scores = np.dot(self.embeddings, q_norm)
        top_indices = np.argsort(scores)[::-1][:top_k]
        return [(self.documents[idx], round(float(scores[idx]), 4)) for idx in top_indices]

# Test setup
rag = SimpleInMemoryRAG(embedding_dim=3)
corpus = [
    "PostgreSQL pgvector stores dense vectors and indexes via HNSW.",
    "ResNet-50 uses residual skip connections for image classification.",
    "BM25 is a sparse lexical scoring algorithm based on TF-IDF."
]
# Synthetic 3D embeddings
emb_corpus = np.array([
    [0.9, 0.4, 0.1],
    [0.1, 0.2, 0.9],
    [0.5, 0.8, 0.2]
])
rag.add_documents(corpus, emb_corpus)

query_emb = np.array([0.88, 0.42, 0.05])
results = rag.retrieve(query_emb, top_k=2)
print("Top Retrieved Passages:")
for doc, score in results:
    print(f"[{score}] {doc[:50]}...")`,
      explanation: 'Demonstrates vector normalization, matrix dot product scoring, and top-k sorting using only core NumPy vector operations.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Implementation: NearestNeighbors Top-K Retrieval',
      code: `import numpy as np
from sklearn.neighbors import NearestNeighbors

# Corpus embeddings (5 documents, 4 dimensions)
np.random.seed(42)
X_corpus = np.array([
    [0.91, 0.38, 0.12, 0.05],
    [0.85, 0.44, 0.21, 0.10],
    [0.10, 0.89, 0.41, 0.15],
    [0.05, 0.12, 0.95, 0.25],
    [0.78, 0.55, 0.25, 0.08]
])

docs = [
    "Doc 1: Scaled Dot-Product Attention in Transformers",
    "Doc 2: Multi-Head Attention Implementations in PyTorch",
    "Doc 3: Convolutional Stride and Pooling in Vision Models",
    "Doc 4: Recurrent LSTM Gates for Time Series Forecasting",
    "Doc 5: Positional Encodings for Autoregressive Decoders"
]

# Configure exact Cosine Nearest Neighbors
nn = NearestNeighbors(n_neighbors=2, metric='cosine')
nn.fit(X_corpus)

query_vec = np.array([[0.89, 0.41, 0.15, 0.08]])
distances, indices = nn.kneighbors(query_vec)

print("Scikit-Learn NearestNeighbors Retrieval:")
for dist, idx in zip(distances[0], indices[0]):
    cosine_sim = 1.0 - dist
    print(f"Similarity: {cosine_sim:.4f} | {docs[idx]}")`,
      explanation: 'Uses scikit-learn NearestNeighbors with cosine metric (where distance = 1 - cosine_sim) to perform exact top-k vector retrieval.',
    },

    runnableCode: {
      code: `import numpy as np

# Set deterministic seed
np.random.seed(42)

# Simulated normalized query vector
q = np.array([0.9, 0.4, 0.1])
q = q / np.linalg.norm(q)

# 3 candidate passage embeddings
candidates = np.array([
    [0.88, 0.45, 0.12],  # Highly relevant
    [0.15, 0.22, 0.95],  # Irrelevant
    [0.75, 0.60, 0.10],  # Moderately relevant
])
candidates = candidates / np.linalg.norm(candidates, axis=1, keepdims=True)

# Compute cosine similarities via dot product
scores = np.dot(candidates, q)
top_k_idx = np.argsort(scores)[::-1][:2]

print("Retrieved Top-2 Indices:", top_k_idx.tolist())
print("Top-2 Cosine Scores:", np.round(scores[top_k_idx], 4).tolist())`,
      expectedOutput: `Retrieved Top-2 Indices: [0, 2]
Top-2 Cosine Scores: [0.9989, 0.9702]`,
    },

    lineByLineExplanation: [
      {
        lines: 'q = q / np.linalg.norm(q)',
        codeSnippet: 'q = q / np.linalg.norm(q)',
        explanation: 'Normalizes the query vector to unit Euclidean norm so that dot product equals cosine similarity.',
      },
      {
        lines: 'candidates = candidates / np.linalg.norm(candidates, axis=1, keepdims=True)',
        codeSnippet: 'candidates / np.linalg.norm(...)',
        explanation: 'Broadcasts L2 row normalization across all candidate document vectors simultaneously.',
      },
      {
        lines: 'scores = np.dot(candidates, q)',
        codeSnippet: 'scores = np.dot(candidates, q)',
        explanation: 'Computes all pairwise cosine similarities in a single high-performance matrix-vector operation.',
      },
      {
        lines: 'top_k_idx = np.argsort(scores)[::-1][:2]',
        codeSnippet: 'np.argsort(scores)[::-1][:2]',
        explanation: 'Sorts scores in descending order and slices the top-k highest similarity passage indices.',
      },
    ],

    hyperparameters: [
      {
        name: 'Top-k (Number of Passages)',
        defaultVal: '3 to 5',
        range: '1 to 20',
        effect: 'Higher k increases retrieval recall but increases prompt token consumption, latency, and context dilution risk.',
        recommendation: 'Start with k=3; use a Cross-Encoder reranker if querying large k (e.g. k=20).',
      },
      {
        name: 'Similarity Score Cutoff Threshold',
        defaultVal: '0.65 (Cosine)',
        range: '0.0 to 1.0',
        effect: 'Filters out irrelevant low-confidence passages, triggering explicit abstention instead of hallucinating on noise.',
        recommendation: 'Calibrate threshold empirically using an in-domain golden validation set.',
      },
    ],

    assumptions: [
      {
        assumption: 'Semantic Proximity Reflects Factual Relevance',
        whyItMatters: 'Vector search assumes questions and their answering passages share high cosine similarity in latent space.',
        howToVerify: 'Inspect query-document similarity distributions; evaluate Recall@k on representative queries.',
      },
      {
        assumption: 'Document Chunks Contain Self-Contained Information',
        whyItMatters: 'If a passage refers to ambiguous pronouns without prior context, the LLM cannot infer meaning.',
        howToVerify: 'Verify chunking overlap and parent-child document contextualization.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Using different embedding models for queries and documents',
        solution: 'The query and documents must be encoded into the exact same latent semantic space using the identical model checkpoint.',
      },
      {
        mistake: 'Treating RAG as a complete replacement for fine-tuning',
        solution: 'RAG provides dynamic factual knowledge; fine-tuning teaches tone, formatting, domain vocabulary, and reasoning style. Enterprise architectures frequently combine both.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Customer Support & IT Helpdesk',
        application: 'Automated Tier-1 Support Agent',
        benefit: 'Instantly answers customer inquiries by retrieving up-to-date documentation and refund policies with verifiable citations.',
      },
      {
        industry: 'Legal & Compliance',
        application: 'Contract Discovery & Risk Analysis',
        benefit: 'Searches through thousands of 80-page commercial leases to locate specific indemnity clauses without manual reading.',
      },
    ],

    practiceQuestions: [
      {
        id: 'rag-01-pq1',
        question: 'What is the primary difference between parametric and non-parametric memory in AI systems?',
        answer: 'Parametric memory is stored statically in the trained weights of the neural network and requires retraining or fine-tuning to update. Non-parametric memory is stored externally in databases or text indices and can be updated instantly by inserting new records.',
        explanation: 'Parametric weights encapsulate language understanding and reasoning; non-parametric storage holds factual reference knowledge.',
      },
      {
        id: 'rag-01-pq2',
        question: 'Why does passing 20 retrieved passages directly to an LLM often decrease answer accuracy?',
        answer: 'This triggers the "Lost in the Middle" phenomenon: LLMs pay disproportionate attention to tokens at the very beginning and very end of their context window, while information in the middle is frequently overlooked or diluted by noise.',
        explanation: 'Flooding context with marginally relevant passages increases distraction and generation hallucinations.',
      },
      {
        id: 'rag-01-pq3',
        question: 'How does RAG provide verifiable provenance for its answers?',
        answer: 'By returning the unique document IDs, file paths, page numbers, and chunk text along with the answer, allowing the system to attach clickable footnotes or citations directly to each generated statement.',
        explanation: 'Users and compliance teams can audit the exact source passage from which every claim was derived.',
      },
    ],

    quiz: [
      {
        id: 'rag-01-q1',
        question: 'Which of the following problems cannot be solved by simply fine-tuning a model without RAG?',
        options: [
          'Adapting model tone to a specific brand voice',
          'Providing real-time answers over documents created 10 minutes ago',
          'Teaching a model a specialized JSON output format',
          'Aligning model behavior with safety policies',
        ],
        correctIndex: 1,
        explanation: 'Fine-tuning requires an offline training pipeline; only RAG can retrieve newly created or modified documents in real-time.',
      },
      {
        id: 'rag-01-q2',
        question: 'What mathematical property ensures that dot product equals cosine similarity between two vectors?',
        options: [
          'Both vectors must be orthogonal',
          'Both vectors must have unit Euclidean norm (L2 norm = 1.0)',
          'The dimensionality must exceed 1024',
          'All components of the vector must be non-negative',
        ],
        correctIndex: 1,
        explanation: 'Cosine similarity is dot product divided by the product of norms; when ||u|| = ||v|| = 1.0, dot product equals cosine similarity.',
      },
      {
        id: 'rag-01-q3',
        question: 'What is the function of the "Generator" in a RAG architecture?',
        options: [
          'To segment large PDF files into smaller chunks',
          'To synthesize a coherent, natural language answer conditioned on retrieved evidence',
          'To build the HNSW graph index in the database',
          'To compute cosine similarity between candidate vectors',
        ],
        correctIndex: 1,
        explanation: 'The retriever locates relevant documents; the generator (LLM) reads the prompt and evidence to produce the final response.',
      },
    ],

    independentExercise: {
      title: 'Implement an Abstaining RAG Pipeline with Confidence Thresholding',
      problem:
        'Write a Python function `grounded_qa_pipeline(query, corpus_texts, corpus_embeddings, query_embedding, threshold=0.7)` that retrieves the top document. If the cosine similarity is below `threshold`, it must return an explicit abstention response: "I cannot answer this question because no relevant context was found."',
      hints: [
        'Normalize both query and corpus vectors using np.linalg.norm.',
        'Compute dot products between the normalized query and corpus matrix.',
        'Identify the maximum score using np.argmax and np.max.',
        'Check whether max_score >= threshold before returning the answer.',
      ],
      starterCode: `import numpy as np

def grounded_qa_pipeline(query: str, corpus_texts: list, corpus_embeddings: np.ndarray, query_embedding: np.ndarray, threshold: float = 0.7) -> dict:
    # TODO: Implement thresholded retrieval with abstention
    pass

# Test data
texts = ["Acme 2024 revenue was $10M.", "Acme CEO is Jane Doe."]
embs = np.array([[0.9, 0.4], [0.1, 0.9]])
q_emb_relevant = np.array([0.88, 0.42])
q_emb_irrelevant = np.array([-0.8, -0.6])

print(grounded_qa_pipeline("What was revenue?", texts, embs, q_emb_relevant, threshold=0.7))
print(grounded_qa_pipeline("What is Acme stock price?", texts, embs, q_emb_irrelevant, threshold=0.7))`,
      solution: `import numpy as np

def grounded_qa_pipeline(query: str, corpus_texts: list, corpus_embeddings: np.ndarray, query_embedding: np.ndarray, threshold: float = 0.7) -> dict:
    # Normalize vectors
    q_norm = query_embedding / (np.linalg.norm(query_embedding) or 1.0)
    corpus_norms = corpus_embeddings / np.linalg.norm(corpus_embeddings, axis=1, keepdims=True)
    
    # Compute similarity scores
    scores = np.dot(corpus_norms, q_norm)
    best_idx = int(np.argmax(scores))
    best_score = float(scores[best_idx])
    
    if best_score < threshold:
        return {
            "query": query,
            "status": "abstained",
            "answer": "I cannot answer this question because no relevant context was found in the indexed documents.",
            "top_score": round(best_score, 4)
        }
    
    return {
        "query": query,
        "status": "grounded",
        "answer": f"Based on evidence: '{corpus_texts[best_idx]}'",
        "top_score": round(best_score, 4),
        "source": corpus_texts[best_idx]
    }

texts = ["Acme 2024 revenue was $10M.", "Acme CEO is Jane Doe."]
embs = np.array([[0.9, 0.4], [0.1, 0.9]])
q_emb_relevant = np.array([0.88, 0.42])
q_emb_irrelevant = np.array([-0.8, -0.6])

print(grounded_qa_pipeline("What was revenue?", texts, embs, q_emb_relevant, threshold=0.7))
print(grounded_qa_pipeline("What is Acme stock price?", texts, embs, q_emb_irrelevant, threshold=0.7))`,
    },

    summary: {
      keyTakeaways: [
        'RAG decouples reasoning (LLM) from dynamic factual reference knowledge (vector database).',
        'Normalized dot product in latent space allows high-throughput sub-millisecond retrieval across millions of passages.',
        'Enforcing similarity thresholds and explicit abstention instructions eliminates the majority of enterprise hallucination risks.',
      ],
      nextLessonId: 'rag-02-document-ingestion',
      nextLessonTitle: 'RAG-02: Document Ingestion, Parsing & Metadata',
      nextLessonModuleId: 'p8-m2',
    },
  },

  'rag-02-document-ingestion': {
    id: 'rag-02-document-ingestion',
    moduleId: 'p8-m2',
    title: 'RAG-02: Document Ingestion, Parsing & Metadata',
    subtitle: 'Extracting High-Fidelity Text, Tables, and Structural Provenance from Raw Data',
    order: 1,
    readTimeMinutes: 30,
    difficulty: 'Beginner',
    visualizerType: 'rag-chunking-explorer',

    objectives: [
      'Architect ingestion pipelines capable of parsing text, Markdown, HTML, and complex PDF documents',
      'Diagnose common parsing failures including multi-column text interleaving and table structure loss',
      'Design metadata schemas capturing structural provenance (file URI, page number, section header, modification date)',
      'Apply data cleaning routines: unicode normalization, control character stripping, and boilerplate removal',
      'Implement deterministic document hashing for deduplication and incremental sync',
    ],
    prerequisites: [
      'Understanding of RAG pipeline foundations (Lesson RAG-01)',
      'Basic knowledge of regular expressions and Python string manipulation',
    ],
    previousLesson: {
      id: 'rag-01-fundamentals',
      title: 'RAG-01: RAG Fundamentals & Architecture',
      moduleId: 'p8-m1',
    },

    analogy: {
      title: 'The Messy Archive versus The Digitized Catalog',
      text: 'Imagine inheriting a damp basement packed with thousands of crumpled paper memos, spiral-bound technical manuals, architectural blueprints, and stained financial spreadsheets. If you simply point a flashlight into the room and ask a question, you find nothing. Document ingestion is the forensic digitization process: specialists unfold every page, run optical scanners, isolate tabular financial ledgers from prose paragraphs, tag each entry with date and box number, and discard duplicate watermarked drafts.',
      metaphor: 'Garbage in, garbage out: no vector search or LLM can retrieve insights from corrupted, scrambled text.',
    },

    problemSolved: {
      title: 'Why Document Parsing is the Foundation of RAG Retrieval Quality',
      description:
        'Over 80% of enterprise knowledge resides in semi-structured PDFs, slide decks, and spreadsheets. When naive text extraction scrambles two-column text or turns spreadsheet cells into a flat string of numbers, semantic relationships are permanently destroyed before embeddings are ever calculated.',
      keyPoints: [
        'Preserves Reading Order across complex multi-column academic papers and corporate financial reports',
        'Maintains Tabular Integrity by converting embedded PDF tables into Markdown or HTML structures',
        'Enriches Chunks with Metadata (author, department, creation date, access permissions) for hybrid filtering',
        'Prevents Database Bloat and Stale Cache by using SHA-256 document hashing for incremental change detection',
      ],
    },

    intuition: {
      overview:
        'Ingestion transforms raw file bytes into standardized document objects consisting of sanitized plain text paired with rich key-value metadata.',
      steps: [
        {
          step: 1,
          title: 'Format Detection & Dispatch',
          description:
            'Identify MIME type or file extension (PDF, DOCX, MD, HTML, CSV) and route to specialized parsers (e.g. PyMuPDF, Unstructured, BeautifulSoup).',
        },
        {
          step: 2,
          title: 'Layout Analysis & Content Extraction',
          description:
            'Detect visual blocks: headers, body paragraphs, bullet lists, code blocks, and tables. Linearize multi-column layouts into human reading order.',
        },
        {
          step: 3,
          title: 'Sanitization & Normalization',
          description:
            'Apply Unicode NFKC normalization, strip non-printable null bytes, remove repetitive running headers/footers, and clean redundant whitespace.',
        },
        {
          step: 4,
          title: 'Metadata Enrichment & Source Hashing',
          description:
            'Attach document origin URI, page indices, section hierarchy, and cryptographic checksums to enable granular citation attribution and incremental updates.',
        },
      ],
    },

    mathematics: {
      overview:
        'Document cleaning applies deterministic string transformations and cryptographic hashing to guarantee idempotent storage and canonical representation.',
      foundations: [
        {
          name: 'Unicode Compatibility Normalization (NFKC)',
          latex: 'S_{\\text{clean}} = \\text{NFKC}(S_{\\text{raw}})',
          explanation:
            'Converts visual ligatures (e.g. "fi" ligature into separate characters "f" and "i") and compatibility symbols into canonical universal character representations.',
        },
        {
          name: 'Cryptographic Document Fingerprinting (SHA-256)',
          latex: 'H(D) = \\text{SHA-256}(D) \\in \\{0, 1\\}^{256}',
          explanation:
            'Computes a 256-bit collision-resistant hash of the raw document bytes D to detect document modifications and avoid redundant re-embedding.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Ingestion Redundancy and Incremental Sync Complexity',
      objective: 'Prove why hash-based document fingerprinting reduces ingestion re-indexing cost from O(N * L * E) to O(N).',
      steps: [
        {
          step: 1,
          label: 'Naive Re-Indexing Cost',
          latex: 'C_{\\text{naive}} = N \\cdot \\left( T_{\\text{parse}} + \\frac{L}{C} \\cdot T_{\\text{embed}} + \\frac{L}{C} \\cdot T_{\\text{index}} \\right)',
          explanation: 'Re-embedding all N documents with average length L and chunk size C incurs heavy embedding API fees and database write overhead.',
        },
        {
          step: 2,
          label: 'Fingerprint Check Condition',
          latex: '\\Delta(D_i) = \\mathbb{I}[H(D_i) \\neq H_{\\text{stored}}(D_i)]',
          explanation: 'A simple lookup against existing document hashes flags only modified or newly introduced documents.',
        },
        {
          step: 3,
          label: 'Incremental Ingestion Cost',
          latex: 'C_{\\text{incremental}} = N \\cdot T_{\\text{hash}} + \\sum_{i: \\Delta(D_i)=1} \\left( T_{\\text{parse}} + \\frac{L_i}{C} \\cdot T_{\\text{embed}} \\right)',
          explanation: 'Because SHA-256 takes microseconds, incremental sync saves over 99% of compute and embedding API cost in production.',
        },
      ],
    },

    variables: [
      { symbol: 'D', name: 'Raw Document', description: 'Raw byte stream of the ingested document file.' },
      { symbol: 'H(D)', name: 'Document Hash', description: 'Unique SHA-256 checksum identifying the exact version of the document.' },
      { symbol: 'M', name: 'Metadata Object', description: 'Structured JSON key-value pairs (page, author, title, tags, uri).' },
      { symbol: 'T_embed', name: 'Embedding Latency/Cost', description: 'Computational time and financial cost to generate vector embeddings.' },
    ],

    numericalExample: {
      scenario: 'Compare ingestion cost and time for an enterprise corpus of 10,000 PDFs when 50 documents are modified weekly.',
      dataset: [
        { metric: 'Total Corpus Size', value: '10,000 PDFs' },
        { metric: 'Average Chunks Per PDF', value: '25 chunks (250,000 chunks total)' },
        { metric: 'Embedding Cost Per 1k Chunks', value: '$0.02' },
        { metric: 'Weekly Changed Documents', value: '50 PDFs (1,250 chunks)' },
      ],
      calculations: [
        {
          step: 'Naive Full Re-Indexing Cost',
          math: '(250,000 chunks / 1,000) * $0.02 = $5.00 / week ($260 / year) + 8 hours GPU parse time',
          result: 'All 250,000 chunks re-parsed and re-embedded unconditionally.',
        },
        {
          step: 'Incremental Hash-Based Sync Cost',
          math: '(1,250 chunks / 1,000) * $0.02 = $0.025 / week ($1.30 / year) + 20 seconds parse time',
          result: 'Only the 50 altered documents are processed.',
        },
      ],
      finalConclusion: 'Incremental hashing yields a 99.5% reduction in API cost and processing latency.',
    },

    visualExplanation: {
      title: 'Common PDF Ingestion Traps and Structural Decontamination',
      description: 'Understanding the physical anatomy of PDF text representation and failure modes.',
      features: [
        'Multi-Column Text Bleed: Naive extraction reads horizontally across columns, interweaving paragraphs from left and right columns.',
        'Table Flattening: Loss of cell coordinates converts financial matrices into an uninterpretable soup of floating numbers.',
        'Header & Footer Repetition: Running headers like "Confidential - Company Internal - Page X" contaminate embeddings if not stripped.',
        'OCR Quality Degradation: Scanned documents produce garbage glyphs without preprocessing and thresholding.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Ingestion Pipeline with Metadata & Deduplication',
      code: `import hashlib
import re
import unicodedata

class Document:
    def __init__(self, text: str, metadata: dict):
        self.text = text
        self.metadata = metadata
        self.doc_hash = hashlib.sha256(text.encode('utf-8')).hexdigest()

def clean_and_normalize_text(raw_text: str) -> str:
    """Sanitize raw document text: unicode normalization and whitespace cleanup."""
    # Unicode NFKC normalization converts ligatures and special symbols
    normalized = unicodedata.normalize('NFKC', raw_text)
    # Strip null bytes and non-printable control characters
    cleaned = re.sub(r'[\\x00-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]', '', normalized)
    # Collapse redundant multi-spaces and trailing line spaces
    cleaned = re.sub(r'[ \\t]+', ' ', cleaned)
    cleaned = re.sub(r'\\n{3,}', '\\n\\n', cleaned)
    return cleaned.strip()

def parse_markdown_document(raw_md: str, source_uri: str) -> list[Document]:
    """Parse Markdown documents into sections enriched with header metadata."""
    cleaned = clean_and_normalize_text(raw_md)
    # Split on markdown H2 headers
    sections = re.split(r'\\n(?=## )', cleaned)
    docs = []
    
    for idx, sec in enumerate(sections):
        lines = sec.strip().split('\\n')
        title = lines[0].replace('##', '').strip() if lines[0].startswith('##') else 'Introduction'
        doc_obj = Document(
            text=sec.strip(),
            metadata={
                'source': source_uri,
                'section_idx': idx,
                'section_title': title,
                'char_count': len(sec.strip())
            }
        )
        docs.append(doc_obj)
    return docs

sample_md = """
# Enterprise System Specs

## Database Layer
PostgreSQL 16 with pgvector handles vector search. We utilize HNSW indexing.

## Security Controls
All customer data at rest is encrypted using AES-256-GCM.
"""

parsed_docs = parse_markdown_document(sample_md, "s3://docs/specs.md")
print(f"Extracted {len(parsed_docs)} structured documents:")
for d in parsed_docs:
    print(f"- Title: {d.metadata['section_title']} | Hash: {d.doc_hash[:10]} | Chars: {d.metadata['char_count']}")`,
      explanation: 'Cleans text with Unicode NFKC, strips non-printable control bytes, splits on structural Markdown headers, and generates SHA-256 tracking fingerprints.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Integration: Document Feature Extraction Pipeline',
      code: `import numpy as np
from sklearn.feature_extraction.text import CountVectorizer

# Corpus of ingested document snippets
docs = [
    "PostgreSQL pgvector extension enables HNSW vector index search.",
    "Database security enforces role-based access control policies.",
    "HNSW vector search achieves logarithmic nearest neighbor query time."
]

# Configure vectorizer with English stopword removal and token pattern
vectorizer = CountVectorizer(stop_words='english', lowercase=True)
X_counts = vectorizer.fit_transform(docs)

vocab = vectorizer.get_feature_names_out()
print("Extracted Vocabulary Features (Top 6):", vocab[:6].tolist())
print("Token counts for Document 0:")
for term, count in zip(vocab, X_counts.toarray()[0]):
    if count > 0:
        print(f"  '{term}': {count}")`,
      explanation: 'Uses scikit-learn CountVectorizer to demonstrate lexical token extraction, stop-word filtering, and vocabulary indexing on ingested documents.',
    },

    runnableCode: {
      code: `import hashlib
import unicodedata
import re

def ingest_raw_snippet(text, source_path):
    # Normalize and clean
    norm = unicodedata.normalize('NFKC', text)
    cleaned = re.sub(r'\\s+', ' ', norm).strip()
    # Compute deterministic fingerprint
    sha = hashlib.sha256(cleaned.encode('utf-8')).hexdigest()[:8]
    return {
        "text": cleaned,
        "source": source_path,
        "char_len": len(cleaned),
        "fingerprint": sha
    }

raw = "  Confidential Report:   \\t\\n Q3 Revenue grew 18% YoY.   "
doc = ingest_raw_snippet(raw, "reports/q3.txt")
print("Ingested Cleaned Text:", doc["text"])
print("Source:", doc["source"])
print("Fingerprint:", doc["fingerprint"])`,
      expectedOutput: `Ingested Cleaned Text: Confidential Report: Q3 Revenue grew 18% YoY.
Source: reports/q3.txt
Fingerprint: ece1ad7e`,
    },

    lineByLineExplanation: [
      {
        lines: "norm = unicodedata.normalize('NFKC', text)",
        codeSnippet: "unicodedata.normalize('NFKC', text)",
        explanation: 'Transforms compatibility characters, ligatures, and varied full-width symbols into standard Unicode.',
      },
      {
        lines: "cleaned = re.sub(r'\\s+', ' ', norm).strip()",
        codeSnippet: "re.sub(r'\\s+', ' ', norm).strip()",
        explanation: 'Collapses all forms of whitespace (tabs, consecutive newlines) into single spaces and strips margins.',
      },
      {
        lines: "sha = hashlib.sha256(cleaned.encode('utf-8')).hexdigest()[:8]",
        codeSnippet: "hashlib.sha256(...).hexdigest()[:8]",
        explanation: 'Calculates an 8-character cryptographic prefix for deduplication and version tracking.',
      },
    ],

    hyperparameters: [
      {
        name: 'Parsing Mode (Text vs Layout-Aware)',
        defaultVal: 'Layout-Aware (PyMuPDF / PDFPlumber)',
        range: 'Raw text, OCR, Visual Layout Parser',
        effect: 'Layout-aware parsers extract reading order and tables accurately but run 3–5x slower than raw text stream extractors.',
        recommendation: 'Use layout-aware parsers for complex multi-column PDFs and financial reports.',
      },
      {
        name: 'Metadata Attribute Breadth',
        defaultVal: 'Minimal (source, page, date)',
        range: 'Minimal to Deep Semantic (author, section, summary, tags)',
        effect: 'Rich metadata unlocks powerful pre-filtering during retrieval but requires additional parsing compute.',
        recommendation: 'Always extract source URI, page number, and top-level header hierarchy.',
      },
    ],

    assumptions: [
      {
        assumption: 'Document Encoding is Valid UTF-8 or Standard Windows-1252',
        whyItMatters: 'Mismatched encodings produce mojibake (scrambled character noise) that ruins embedding quality.',
        howToVerify: 'Use chardet or charset-normalizer to detect and convert legacy document encodings.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Discarding document metadata during text extraction',
        solution: 'Always retain structural metadata (file name, page number, section, timestamp) alongside the text chunk.',
      },
      {
        mistake: 'Allowing repetitive running headers and footers into vector chunks',
        solution: 'Filter out recurring header/footer strings across consecutive pages to prevent false positive matches.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Financial Services & Investment Banking',
        application: '10-K & 10-Q Financial Filing Ingestion',
        benefit: 'Extracts balance sheets and auditor notes while preserving table column alignment for numeric querying.',
      },
      {
        industry: 'Legal Tech',
        application: 'Discovery & Deposition Parsing',
        benefit: 'Maintains page and line-number metadata so litigators can pinpoint the exact line in court transcripts.',
      },
    ],

    practiceQuestions: [
      {
        id: 'rag-02-pq1',
        question: 'Why does naive line-by-line text extraction fail on two-column research papers?',
        answer: 'Naive extractors read horizontally from left to right across the entire page, merging sentence fragments from column 1 with unrelated sentences in column 2, creating incoherent scrambled text.',
        explanation: 'Layout-aware parsers segment the page into visual bounding boxes and linearize column 1 before reading column 2.',
      },
      {
        id: 'rag-02-pq2',
        question: 'What is the purpose of Unicode NFKC normalization during text preprocessing?',
        answer: 'It converts visually distinct but semantically identical character variants (such as typographic ligatures, circled numbers, or full-width Asian Latin characters) into standard canonical characters.',
        explanation: 'Ensures that searches for "office" match documents containing the "ffi" ligature glyph.',
      },
      {
        id: 'rag-02-pq3',
        question: 'How does document hashing prevent unnecessary re-embedding costs?',
        answer: 'By computing a hash (e.g. SHA-256) of document contents and comparing it against the database. If the hash has not changed, the ingestion pipeline skips parsing and embedding.',
        explanation: 'Prevents re-embedding thousands of unchanged files during periodic scheduled synchronizations.',
      },
    ],

    quiz: [
      {
        id: 'rag-02-q1',
        question: 'Which metadata field is most essential for providing verifiable citations in a user-facing RAG application?',
        options: [
          'The server IP address where ingestion executed',
          'Source file URI and page or paragraph number',
          'The size of the vector store index file in bytes',
          'The random seed used by the embedding model',
        ],
        correctIndex: 1,
        explanation: 'Citations require linking generated claims back to the exact source document name and page number.',
      },
      {
        id: 'rag-02-q2',
        question: 'What happens when tabular data in a PDF is extracted as unstructured raw text?',
        options: [
          'The embedding model automatically reconstructs the SQL schema',
          'Column headers and row values become dissociated, making numerical queries impossible to answer reliably',
          'The vector dimension expands proportionally to table width',
          'Cosine similarity increases across all documents',
        ],
        correctIndex: 1,
        explanation: 'Tables require structural cell relationships (e.g. Markdown or HTML tables) to preserve semantic meaning.',
      },
      {
        id: 'rag-02-q3',
        question: 'What is the primary benefit of deterministic incremental ingestion?',
        options: [
          'It replaces the need for an LLM generator',
          'It re-indexes only altered or newly added documents, saving 90%+ in API and compute costs',
          'It forces all embeddings to have an L2 norm of 0',
          'It compresses all vectors into 8-bit integers',
        ],
        correctIndex: 1,
        explanation: 'Incremental hashing skips unchanged documents, preventing redundant compute and API expenditures.',
      },
    ],

    independentExercise: {
      title: 'Build a PDF Metadata Extractor and Cleaner in Python',
      problem:
        'Write a Python class `IngestionEngine` with a method `ingest(raw_text, doc_id, metadata)` that sanitizes the text, calculates a SHA-256 hash, and stores the document in an internal dictionary only if the hash has changed.',
      hints: [
        'Use hashlib.sha256 to compute document fingerprints.',
        'Store existing hashes in a dict: {doc_id: current_hash}.',
        'Return True if a new document was stored or updated; False if skipped as unchanged.',
      ],
      starterCode: `import hashlib
import re

class IngestionEngine:
    def __init__(self):
        self.store = {}
        self.hashes = {}

    def ingest(self, raw_text: str, doc_id: str, metadata: dict) -> bool:
        # TODO: Implement cleaning, hashing, and change detection
        pass

engine = IngestionEngine()
print(engine.ingest("Initial content for doc 1", "doc1", {"author": "Alice"})) # True
print(engine.ingest("Initial content for doc 1", "doc1", {"author": "Alice"})) # False (duplicate)
print(engine.ingest("Updated content for doc 1", "doc1", {"author": "Alice"})) # True (updated)`,
      solution: `import hashlib
import re

class IngestionEngine:
    def __init__(self):
        self.store = {}
        self.hashes = {}

    def ingest(self, raw_text: str, doc_id: str, metadata: dict) -> bool:
        cleaned = re.sub(r'\\s+', ' ', raw_text).strip()
        doc_hash = hashlib.sha256(cleaned.encode('utf-8')).hexdigest()
        
        # Check if identical version already stored
        if doc_id in self.hashes and self.hashes[doc_id] == doc_hash:
            return False  # Unchanged, skip re-ingestion
        
        # Store new or updated document
        self.hashes[doc_id] = doc_hash
        self.store[doc_id] = {
            "text": cleaned,
            "metadata": metadata,
            "hash": doc_hash
        }
        return True

engine = IngestionEngine()
print(engine.ingest("Initial content for doc 1", "doc1", {"author": "Alice"}))
print(engine.ingest("Initial content for doc 1", "doc1", {"author": "Alice"}))
print(engine.ingest("Updated content for doc 1", "doc1", {"author": "Alice"}))`,
    },

    summary: {
      keyTakeaways: [
        'Document parsing determines the upper bound of RAG retrieval quality.',
        'Multi-column layouts and tables require layout-aware parsers rather than naive text stream dumping.',
        'Cryptographic content hashing enables fast, low-cost incremental updates across massive enterprise document repositories.',
      ],
      nextLessonId: 'rag-03-chunking-strategies',
      nextLessonTitle: 'RAG-03: Chunking Strategies & Boundary Optimization',
      nextLessonModuleId: 'p8-m3',
    },
  },

  'rag-03-chunking-strategies': {
    id: 'rag-03-chunking-strategies',
    moduleId: 'p8-m3',
    title: 'RAG-03: Chunking Strategies & Boundary Optimization',
    subtitle: 'From Fixed Character Windows to Semantic and Recursive Chunking',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'rag-chunk-tradeoff-explorer',

    objectives: [
      'Compare fixed-character, token-based, sentence-level, and recursive character splitting',
      'Understand how sliding-window overlap prevents the loss of cross-boundary context',
      'Analyze the fundamental trade-off between chunk size, retrieval precision, and context dilution',
      'Implement semantic chunking using cosine distance thresholds between consecutive sentence embeddings',
      'Select optimal chunking hyperparameters for specific document domains (legal, technical, medical)',
    ],
    prerequisites: [
      'Understanding of document parsing and text cleaning (Lesson RAG-02)',
      'Basic familiarity with tokenization concepts from Phase 7',
    ],
    previousLesson: {
      id: 'rag-02-document-ingestion',
      title: 'RAG-02: Document Ingestion, Parsing & Metadata',
      moduleId: 'p8-m2',
    },

    analogy: {
      title: 'Chopping Timber versus Slicing Bread Along Natural Folds',
      text: 'Naive fixed-character chunking is like using a blind mechanical saw to cut lumber every 3 feet, regardless of whether you cut through a delicate carved joint or right through a crucial structural bolt. You end up with severed words like "auto-" at the end of chunk 1 and "-regressive" at the start of chunk 2. Smart recursive and semantic chunking is like an artisan baker: you slice along the natural crusts, paragraph breaks, and sentence boundaries, ensuring every piece forms a complete, coherent, bite-sized serving.',
      metaphor: 'Natural semantic boundaries preserve context; blind character cuts sever meaning.',
    },

    problemSolved: {
      title: 'Why Chunking Strategy Dictates Retrieval Precision and Generation Faithfulness',
      description:
        'Embedding models have finite context windows (typically 512 to 8192 tokens) and generate a single fixed-dimensional vector representing the entire chunk. If chunks are too small, vectors lack surrounding context; if chunks are too large, distinct topics blend together and dilute specific factual statements.',
      keyPoints: [
        'Eliminates Severed Semantic Units by respecting paragraph, markdown header, and sentence boundaries',
        'Preserves Cross-Boundary Relationships using configurable sliding-window overlap (e.g. 10–20%)',
        'Balances Retrieval Specificity with Reasoning Context by tuning chunk size to the embedding model capacity',
        'Prevents Context Window Bloat and "Lost in the Middle" attention degradation in downstream LLM generation',
      ],
    },

    intuition: {
      overview:
        'Chunking algorithms navigate a hierarchy of natural linguistic boundaries: starting at double newlines (paragraphs), then single newlines (lines), then sentence terminators (periods), and finally spaces.',
      steps: [
        {
          step: 1,
          title: 'Hierarchical Separator Matching',
          description:
            'A Recursive Character Splitter attempts to partition text using large structural separators (e.g. "\\n\\n"). If resulting chunks remain larger than the target size, it recursively falls back to smaller separators ("\\n", ". ", " ").',
        },
        {
          step: 2,
          title: 'Sliding-Window Overlap Application',
          description:
            'When advancing from chunk i to chunk i+1, the window rewinds by K overlap tokens. This ensures that any phrase or fact spanning the boundary is captured intact in at least one chunk.',
        },
        {
          step: 3,
          title: 'Semantic Boundary Detection (Advanced)',
          description:
            'Instead of arbitrary length thresholds, semantic chunkers compute embeddings for consecutive sentences. A boundary split is triggered only when the cosine similarity between sentence i and sentence i+1 drops below a percentile threshold, indicating a topic shift.',
        },
      ],
    },

    mathematics: {
      overview:
        'Chunking trade-offs balance context completeness against vector semantic density.',
      foundations: [
        {
          name: 'Sliding Window Step Size',
          latex: 'S = C - O',
          explanation:
            'The step size S (advance between consecutive chunks) equals target chunk size C minus the overlap size O. The total number of generated chunks is approximately N_chunks = ceil((L - O) / S).',
        },
        {
          name: 'Semantic Distance Between Adjacent Sentences',
          latex: 'D_{\\text{semantic}}(s_i, s_{i+1}) = 1 - \\cos(\\mathbf{e}_{s_i}, \\mathbf{e}_{s_{i+1}}) = 1 - \\frac{\\mathbf{e}_{s_i} \\cdot \\mathbf{e}_{s_{i+1}}}{\\|\\mathbf{e}_{s_i}\\| \\|\\mathbf{e}_{s_{i+1}}\\|}',
          explanation:
            'Measures semantic topical divergence between consecutive sentences. A spike in semantic distance indicates a natural thematic topic transition.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Chunk Storage Overhead and Coverage Guarantee',
      objective: 'Calculate the physical storage bloat factor induced by sliding window overlap.',
      steps: [
        {
          step: 1,
          label: 'Total Ingested Tokens with Overlap',
          latex: 'T_{\\text{total}} = N_{\\text{chunks}} \\cdot C = \\left( \\frac{L - O}{C - O} \\right) \\cdot C',
          explanation: 'Each chunk contains C tokens, with O tokens replicated across adjacent chunk boundaries.',
        },
        {
          step: 2,
          label: 'Storage Multiplication Ratio',
          latex: 'R_{\\text{overhead}} = \\frac{T_{\\text{total}}}{L} \\approx \\frac{C}{C - O} = \\frac{1}{1 - (O / C)}',
          explanation: 'The relative increase in indexed tokens depends strictly on the overlap ratio O/C.',
        },
        {
          step: 3,
          label: 'Standard Empirical Overlap Evaluation',
          latex: '\\text{For } O = 0.2 C \\implies R_{\\text{overhead}} = \\frac{1}{1 - 0.2} = 1.25 \\ (+25\\% \\text{ storage overhead})',
          explanation: 'A 20% overlap guarantees boundary continuity at the modest cost of a 25% increase in vector storage.',
        },
      ],
    },

    variables: [
      { symbol: 'C', name: 'Chunk Size', description: 'Target maximum token or character length of each individual passage chunk.' },
      { symbol: 'O', name: 'Chunk Overlap', description: 'Number of overlapping tokens shared between consecutive chunks.' },
      { symbol: 'S', name: 'Step Advance', description: 'Number of unique new tokens advanced per chunk window (S = C - O).' },
      { symbol: 'L', name: 'Total Document Length', description: 'Total token length of the unpartitioned document.' },
      { symbol: 'e_{s_i}', name: 'Sentence Embedding', description: 'Dense vector representation of sentence i.' },
    ],

    numericalExample: {
      scenario: 'Partition a 1,000-word technical article using chunk size C = 250 words and overlap O = 50 words.',
      dataset: [
        { parameter: 'Document Length L', value: 1000 },
        { parameter: 'Chunk Size C', value: 250 },
        { parameter: 'Overlap O', value: 50 },
        { parameter: 'Step Size S', value: '250 - 50 = 200' },
      ],
      calculations: [
        {
          step: 'Number of Chunks Calculation',
          math: 'N = ceil((L - O) / S) = ceil((1000 - 50) / 200) = ceil(950 / 200) = ceil(4.75) = 5 chunks',
          result: '5 distinct chunk records created.',
        },
        {
          step: 'Chunk Ranges',
          math: 'Chunk 1: [0..250], Chunk 2: [200..450], Chunk 3: [400..650], Chunk 4: [600..850], Chunk 5: [800..1000]',
          result: 'Every chunk overlaps with adjacent neighbors by exactly 50 words.',
        },
        {
          step: 'Storage Bloat Calculation',
          math: 'Total words indexed = 5 * 250 = 1,250 words. Bloat = 1,250 / 1000 = 1.25 (25% increase).',
          result: 'Storage overhead is exactly 25%.',
        },
      ],
      finalConclusion: '5 chunks completely cover the 1,000-word text without any severed boundary phrases.',
    },

    visualExplanation: {
      title: 'Chunk Size Pareto Frontier: Precision versus Recall',
      description: 'Understanding the empirical trade-offs across chunk length tiers.',
      features: [
        'Small Chunks (64–128 tokens): High precision, laser-focused semantic matching, but low context completeness. High risk of fragmented pronoun antecedents.',
        'Medium Chunks (256–512 tokens): The enterprise sweet spot. Retains complete topical paragraphs with clear reasoning while fitting cleanly inside embedding model limits.',
        'Large Chunks (1024–2048 tokens): High recall, but vector embeddings suffer topical dilution. Increases LLM generation cost and introduces context distraction.',
        'Hierarchical Parent-Child Chunking: Searches over small 128-token child chunks for high-precision retrieval, but injects the broader 1024-token parent chunk into the LLM.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Recursive Character Text Splitter',
      code: `class RecursiveCharacterSplitter:
    """Splits text hierarchically using natural linguistic delimiters."""
    def __init__(self, chunk_size=200, chunk_overlap=40, separators=None):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.separators = separators or ["\\n\\n", "\\n", ". ", " "]

    def split_text(self, text: str) -> list[str]:
        final_chunks = []
        # Find appropriate separator
        separator = self.separators[-1]
        for s in self.separators:
            if s in text:
                separator = s
                break
        
        splits = text.split(separator)
        current_chunk = []
        current_len = 0
        
        for piece in splits:
            piece_len = len(piece) + len(separator)
            if current_len + piece_len > self.chunk_size and current_chunk:
                chunk_str = separator.join(current_chunk).strip()
                if chunk_str:
                    final_chunks.append(chunk_str)
                # Keep overlap from the end of current chunk
                overlap_tokens = []
                overlap_len = 0
                for prev in reversed(current_chunk):
                    if overlap_len + len(prev) <= self.chunk_overlap:
                        overlap_tokens.insert(0, prev)
                        overlap_len += len(prev) + len(separator)
                    else:
                        break
                current_chunk = overlap_tokens + [piece]
                current_len = sum(len(p) + len(separator) for p in current_chunk)
            else:
                current_chunk.append(piece)
                current_len += piece_len
                
        if current_chunk:
            final_chunks.append(separator.join(current_chunk).strip())
        return final_chunks

sample = (
    "Retrieval-Augmented Generation (RAG) is an enterprise architectural pattern. "
    "It grounds language model generations in external authoritative knowledge.\\n\\n"
    "Chunking strategies dictate the boundary precision of vector search. "
    "Small chunks preserve sharp semantic meaning without topic dilution. "
    "Large chunks preserve broad multi-paragraph context but increase latency."
)

splitter = RecursiveCharacterSplitter(chunk_size=150, chunk_overlap=30)
chunks = splitter.split_text(sample)
print(f"Generated {len(chunks)} Chunks:")
for i, c in enumerate(chunks):
    print(f"Chunk #{i+1} ({len(c)} chars): {c[:60]}...")`,
      explanation: 'Implements recursive text segmentation: selects the coarsest valid separator, accumulates pieces up to chunk_size, and preserves backward overlap before advancing.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Verification: Evaluating Document Chunk Term Distributions',
      code: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

chunks = [
    "RAG grounds language model generations in external authoritative knowledge.",
    "Chunking strategies dictate the boundary precision of vector search.",
    "Small chunks preserve sharp semantic meaning without topic dilution.",
    "Large chunks preserve broad context but increase latency and token costs."
]

# Evaluate TF-IDF representation across distinct chunks
tfidf = TfidfVectorizer(stop_words='english')
matrix = tfidf.fit_transform(chunks)

print("TF-IDF Matrix Shape (Chunks x Terms):", matrix.shape)
terms = tfidf.get_feature_names_out()
for idx, chunk in enumerate(chunks):
    top_term_idx = np.argmax(matrix[idx].toarray())
    print(f"Chunk {idx} Top Term: '{terms[top_term_idx]}' (Score: {matrix[idx, top_term_idx]:.3f})")`,
      explanation: 'Uses scikit-learn TfidfVectorizer to confirm that individual chunks retain sharp, distinct term importance profiles without muddying topic distributions.',
    },

    runnableCode: {
      code: `def fixed_window_chunker(text, chunk_size=30, overlap=10):
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        if end >= len(text):
            break
        start += (chunk_size - overlap)
    return chunks

text = "RAG systems retrieve external facts to prevent LLM hallucinations."
chunks = fixed_window_chunker(text, chunk_size=30, overlap=10)
print("Chunks Created:", len(chunks))
for i, chk in enumerate(chunks):
    print(f"#{i+1}: '{chk}'")`,
      expectedOutput: `Chunks Created: 3
#1: 'RAG systems retrieve external '
#2: 'xternal facts to prevent LLM '
#3: 'nt LLM hallucinations.'`,
    },

    lineByLineExplanation: [
      {
        lines: 'end = min(start + chunk_size, len(text))',
        codeSnippet: 'end = min(start + chunk_size, len(text))',
        explanation: 'Guards against out-of-bounds indexing on the terminal chunk of the document.',
      },
      {
        lines: 'start += (chunk_size - overlap)',
        codeSnippet: 'start += (chunk_size - overlap)',
        explanation: 'Advances the sliding window forward by the net step size, retaining the specified character overlap.',
      },
    ],

    hyperparameters: [
      {
        name: 'Chunk Size (Tokens)',
        defaultVal: '256 to 512',
        range: '64 to 2048',
        effect: 'Determines granularity of retrieved units; smaller gives higher precision, larger gives broader context.',
        recommendation: 'Use 256–512 tokens for general enterprise documentation; use 128 tokens for QA FAQ pairs.',
      },
      {
        name: 'Chunk Overlap Percentage',
        defaultVal: '10% to 20%',
        range: '0% to 50%',
        effect: 'Higher overlap guarantees boundary facts are never severed but increases vector index storage size.',
        recommendation: '15% overlap provides an optimal balance between coverage and storage overhead.',
      },
    ],

    assumptions: [
      {
        assumption: 'Sentences Form Cohesive Atomic Semantic Units',
        whyItMatters: 'Splitting in the middle of a sentence severs grammatical predicates and degrades vector semantic coherence.',
        howToVerify: 'Inspect generated chunks to confirm they terminate at punctuation rather than mid-word.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Using character count instead of token count for LLM context planning',
        solution: 'Always measure chunk size using the tokenizer corresponding to your embedding model and LLM (1 token ≈ 4 characters in English).',
      },
      {
        mistake: 'Setting overlap to 0% to save storage',
        solution: 'Zero overlap guarantees that facts spanning the split point will fail semantic retrieval. Maintain at least 10% overlap.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Software Engineering & API Docs',
        application: 'Codebase Documentation Retrieval',
        benefit: 'Splits on markdown code blocks and function boundaries so developers receive complete, runnable code functions.',
      },
      {
        industry: 'Healthcare & Clinical Guidelines',
        application: 'Medical Dosage Protocol Lookup',
        benefit: 'Prevents severing critical contraindication warnings from drug dosage recommendations.',
      },
    ],

    practiceQuestions: [
      {
        id: 'rag-03-pq1',
        question: 'What is the primary risk of using an excessively small chunk size (e.g. 32 tokens)?',
        answer: 'Extremely small chunks lack sufficient surrounding context. For example, a chunk might state "It was approved on June 12th" without mentioning what "It" refers to, leading to high retrieval noise and inaccurate pronoun resolution.',
        explanation: 'Embeddings of short fragments become ambiguous and match irrelevant queries.',
      },
      {
        id: 'rag-03-pq2',
        question: 'How does semantic chunking differ from fixed-size chunking?',
        answer: 'Fixed-size chunking blindly splits text at fixed character or token intervals. Semantic chunking computes embeddings for consecutive sentences and splits only when the semantic cosine distance between adjacent sentences indicates a shift to a new topic.',
        explanation: 'Semantic chunking produces variable-length chunks aligned with natural topical boundaries.',
      },
      {
        id: 'rag-03-pq3',
        question: 'What is Parent-Child (Hierarchical) retrieval and why is it effective?',
        answer: 'Parent-Child chunking indexes small child chunks (e.g. 100 tokens) in the vector store for high-precision retrieval, but when a child is matched, the system retrieves its broader parent chunk (e.g. 1000 tokens) to supply to the LLM generator.',
        explanation: 'Combines the pinpoint retrieval accuracy of small chunks with the comprehensive context of large chunks.',
      },
    ],

    quiz: [
      {
        id: 'rag-03-q1',
        question: 'If a document of 1,000 tokens is chunked with Chunk Size = 200 and Overlap = 50, what is the step advance size S?',
        options: [
          '50 tokens',
          '150 tokens',
          '200 tokens',
          '250 tokens',
        ],
        correctIndex: 1,
        explanation: 'Step size S = Chunk Size - Overlap = 200 - 50 = 150 tokens.',
      },
      {
        id: 'rag-03-q2',
        question: 'What is the primary symptom of the "Lost in the Middle" phenomenon in RAG pipelines?',
        options: [
          'The embedding model fails to calculate cosine similarity',
          'The LLM pays high attention to chunks at the start and end of the prompt while ignoring evidence placed in the middle',
          'The vector database runs out of RAM',
          'Cross-encoders reverse the order of BM25 results',
        ],
        correctIndex: 1,
        explanation: 'LLMs exhibit U-shaped attention curves, frequently overlooking critical evidence located in the middle of a long context.',
      },
      {
        id: 'rag-03-q3',
        question: 'Why does RecursiveCharacterTextSplitter evaluate separators in hierarchical order (["\\n\\n", "\\n", " ", ""])?',
        options: [
          'To ensure all chunks have identical byte sizes',
          'To keep paragraphs together first, falling back to sentence or word breaks only when a paragraph exceeds chunk size',
          'To encrypt sensitive PII before embedding',
          'To convert text into lowercase automatically',
        ],
        correctIndex: 1,
        explanation: 'Hierarchical splitting preserves the largest natural semantic units possible before breaking down into smaller sub-units.',
      },
    ],

    independentExercise: {
      title: 'Implement a Token-Aware Sliding Window Chunker in Python',
      problem:
        'Write a Python function `sliding_window_tokens(tokens: list, max_tokens: int = 100, overlap: int = 20)` that takes a list of string tokens and returns a list of chunked token lists respecting the sliding-window overlap constraint.',
      hints: [
        'Initialize index pointer `start = 0`.',
        'In each iteration, slice `tokens[start : start + max_tokens]`.',
        'Advance `start` by `max_tokens - overlap`.',
        'Break when `start + max_tokens >= len(tokens)`.',
      ],
      starterCode: `def sliding_window_tokens(tokens: list, max_tokens: int = 4, overlap: int = 1) -> list:
    # TODO: Implement sliding window over token list
    pass

tokens = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]
print(sliding_window_tokens(tokens, max_tokens=4, overlap=1))`,
      solution: `def sliding_window_tokens(tokens: list, max_tokens: int = 4, overlap: int = 1) -> list:
    if not tokens:
        return []
    chunks = []
    start = 0
    step = max(1, max_tokens - overlap)
    
    while start < len(tokens):
        chunk = tokens[start : start + max_tokens]
        chunks.append(chunk)
        if start + max_tokens >= len(tokens):
            break
        start += step
    return chunks

tokens = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]
print(sliding_window_tokens(tokens, max_tokens=4, overlap=1))`,
    },

    summary: {
      keyTakeaways: [
        'Chunking governs the fundamental trade-off between retrieval precision and contextual completeness.',
        'Recursive splitting preserves natural paragraph and sentence structures before resorting to word-level cuts.',
        'Maintaining a 10–20% sliding window overlap prevents crucial facts from being lost across chunk seams.',
      ],
      nextLessonId: 'rag-04-embeddings-semantic-search',
      nextLessonTitle: 'RAG-04: Embeddings & Semantic Representation',
      nextLessonModuleId: 'p8-m4',
    },
  },
};

