import { ModuleData, LessonContent } from '@/lib/types';

// =========================================================================
// MODULE 7: Retrieval Quality (p8-m7)
// =========================================================================
export const p8m7Data: ModuleData = {
  id: 'p8-m7',
  number: 7,
  title: 'Retrieval Quality & Evaluation Metrics',
  subtitle: 'Precision@k, Recall@k, MRR, Hit Rate & Failure Analysis',
  description:
    'Establish rigorous Information Retrieval (IR) evaluation pipelines for RAG systems. Master Precision@k, Recall@k, Mean Reciprocal Rank (MRR), Hit Rate@k, and Normalized Discounted Cumulative Gain (NDCG). Build representative golden evaluation datasets, isolate query-document matching failure modes, and decouple retrieval quality from generator hallucinations.',
  icon: 'BarChart2',
  badge: 'Phase 8 · RAG & Vectors',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'rag-07-retrieval-quality-metrics',
      moduleId: 'p8-m7',
      title: 'RAG-07: Retrieval Quality & Evaluation Metrics',
      description:
        'Precision@k, Recall@k, MRR, golden benchmark dataset construction, and retrieval error analysis.',
      order: 1,
      readTimeMinutes: 34,
      visualizerType: 'rag-retrieval-metrics-explorer',
      difficulty: 'Intermediate',
    },
  ],
};

// =========================================================================
// MODULE 8: Keyword, Dense, and Hybrid Retrieval (p8-m8)
// =========================================================================
export const p8m8Data: ModuleData = {
  id: 'p8-m8',
  number: 8,
  title: 'Keyword, Dense & Hybrid Retrieval (BM25 + RRF)',
  subtitle: 'BM25 Inverted Indexes, Dense Vectors, Reciprocal Rank Fusion & Metadata',
  description:
    'Unify sparse lexical search and dense semantic vector retrieval into high-performance hybrid retrieval pipelines. Deconstruct BM25 term frequency saturation (k1) and length normalization (b). Master Reciprocal Rank Fusion (RRF) to combine disparate scoring distributions without calibrated normalization, and configure compound metadata pre-filters.',
  icon: 'Shuffle',
  badge: 'Phase 8 · RAG & Vectors',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'rag-08-hybrid-retrieval-rrf',
      moduleId: 'p8-m8',
      title: 'RAG-08: Hybrid Retrieval & Reciprocal Rank Fusion',
      description:
        'BM25 mechanics, dense vector retrieval, Reciprocal Rank Fusion (RRF) algorithms, and metadata filtering.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'rag-hybrid-rrf-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// MODULE 9: Reranking and Query Transformation (p8-m9)
// =========================================================================
export const p8m9Data: ModuleData = {
  id: 'p8-m9',
  number: 9,
  title: 'Reranking & Query Transformation',
  subtitle: 'Cross-Encoders, Two-Stage Pipelines, HyDE & Multi-Query Expansion',
  description:
    'Supercharge retrieval accuracy using two-stage retrieval architectures. Deploy Cross-Encoder rerankers that compute full all-to-all token cross-attention over top candidate passages. Implement advanced query transformation patterns: Hypothetical Document Embeddings (HyDE), query rewriting, sub-query decomposition, and latency-accuracy trade-offs.',
  icon: 'Layers',
  badge: 'Phase 8 · RAG & Vectors',
  estimatedHours: 3,
  topicsCount: 1,
  lessons: [
    {
      id: 'rag-09-reranking-query-transform',
      moduleId: 'p8-m9',
      title: 'RAG-09: Reranking & Query Transformation',
      description:
        'Cross-encoder reranking, full query-passage token attention, HyDE, query decomposition, and latency budgets.',
      order: 1,
      readTimeMinutes: 36,
      visualizerType: 'rag-reranking-explorer',
      difficulty: 'Advanced',
    },
  ],
};

// =========================================================================
// LESSON CONTENTS (Modules 7 - 9)
// =========================================================================
export const ragModule3Lessons: Record<string, LessonContent> = {
  'rag-07-retrieval-quality-metrics': {
    id: 'rag-07-retrieval-quality-metrics',
    moduleId: 'p8-m7',
    title: 'RAG-07: Retrieval Quality & Evaluation Metrics',
    subtitle: 'Auditing Information Retrieval Performance: Precision@k, Recall@k, MRR & NDCG',
    order: 1,
    readTimeMinutes: 34,
    difficulty: 'Intermediate',
    visualizerType: 'rag-retrieval-metrics-explorer',

    objectives: [
      'Isolate retriever performance from downstream LLM generation quality',
      'Compute and interpret Precision@k, Recall@k, Mean Reciprocal Rank (MRR), and Hit Rate@k',
      'Construct a representative golden evaluation dataset containing queries and verified ground-truth chunk IDs',
      'Diagnose common retrieval failure archetypes: vocabulary mismatch, semantic drift, and chunk truncation',
      'Implement an automated regression test suite to prevent retrieval degradation across index updates',
    ],
    prerequisites: [
      'Understanding of vector search fundamentals and top-k retrieval (Lesson RAG-05)',
      'Basic probability and statistical evaluation metrics (Phase 5)',
    ],
    previousLesson: {
      id: 'rag-06-vector-databases-indexing',
      title: 'RAG-06: Vector Databases & Indexing (HNSW & IVF)',
      moduleId: 'p8-m6',
    },

    analogy: {
      title: 'The Sous-Chef and the Executive Master Chef',
      text: 'In a Michelin-star restaurant, the sous-chef is responsible for pulling the exact fresh ingredients from the walk-in pantry (retriever), while the executive chef cooks the final dish for the guest (generator). If the customer complains that the soup lacks salt, is it because the sous-chef brought sugar instead of salt, or because the executive chef forgot to add the salt to the pot? You cannot fix the meal without evaluating the sous-chef independently. If retrieval delivers irrelevant or truncated passages, even the most capable frontier LLM will hallucinate or fail.',
      metaphor: 'Evaluate retrieval independently: the best generator cannot synthesize truth from missing evidence.',
    },

    problemSolved: {
      title: 'Why End-to-End LLM Testing Fails to Fix RAG System Failures',
      description:
        'Testing a RAG system only by inspecting the final LLM response conflates two distinct failure modes: Retrieval Failure (the correct chunk was never retrieved) and Generation Failure (the chunk was retrieved, but the LLM ignored or misinterpreted it). IR metrics isolate retrieval so engineers can optimize chunking, embedding models, and index search independently.',
      keyPoints: [
        'Decouples Retrieval Recall from Generator Faithfulness, eliminating debugging ambiguity',
        'Measures Exact Evidence Coverage using Precision@k and Recall@k against golden test queries',
        'Rewards Fast Rank Discovery using Mean Reciprocal Rank (MRR) to measure how close to #1 the true answer sits',
        'Prevents Silent Regressions when migrating between embedding models or tuning chunk overlap hyperparameters',
      ],
    },

    intuition: {
      overview:
        'Retrieval evaluation requires a ground-truth dataset where human domain experts (or verified synthetic generation pipelines) pair realistic questions with the exact IDs of documents containing the necessary answer evidence.',
      steps: [
        {
          step: 1,
          title: 'Golden Dataset Construction',
          description:
            'Curate a benchmark suite of N queries {q_1, ..., q_N}. For each query q_i, define the golden set of relevant document chunks G_i.',
        },
        {
          step: 2,
          title: 'Batch Retrieval Execution',
          description:
            'Execute retrieval with cutoff k, obtaining ranked result lists R_i = [d_{i,1}, ..., d_{i,k}].',
        },
        {
          step: 3,
          title: 'Metric Calculation',
          description:
            'Compute overlap |R_i ∩ G_i| to evaluate Precision@k (density of relevant items) and Recall@k (fraction of all true items captured).',
        },
        {
          step: 4,
          title: 'Rank Quality Assessment (MRR & NDCG)',
          description:
            'Evaluate where the first relevant hit appears. If the first relevant passage is at rank 1, reciprocal rank is 1.0; if at rank 4, it is 0.25.',
        },
      ],
    },

    mathematics: {
      overview:
        'Information retrieval metrics evaluate sets and ranked sequences of retrieved items against ground truth.',
      foundations: [
        {
          name: 'Precision at k (P@k)',
          latex: '\\text{Precision}@k = \\frac{|\\text{Retrieved}_k \\cap \\text{Relevant}|}{k}',
          explanation:
            'Proportion of the top-k retrieved documents that are truly relevant. Measures retrieval cleanliness and context window noise.',
        },
        {
          name: 'Recall at k (R@k)',
          latex: '\\text{Recall}@k = \\frac{|\\text{Retrieved}_k \\cap \\text{Relevant}|}{|\\text{Relevant}|}',
          explanation:
            'Proportion of all existing relevant documents that were captured in the top-k results. Measures completeness of evidence.',
        },
        {
          name: 'Mean Reciprocal Rank (MRR)',
          latex: '\\text{MRR} = \\frac{1}{|Q|} \\sum_{i=1}^{|Q|} \\frac{1}{\\text{rank}_i}',
          explanation:
            'Averages the reciprocal rank of the first relevant document across all benchmark queries Q. If no relevant document is retrieved, 1/rank_i = 0.',
        },
        {
          name: 'Hit Rate at k (HR@k)',
          latex: '\\text{HitRate}@k = \\frac{1}{|Q|} \\sum_{i=1}^{|Q|} \\mathbb{I}(|\\text{Retrieved}_{k, i} \\cap \\text{Relevant}_i| > 0)',
          explanation:
            'Percentage of queries where at least one relevant document was successfully retrieved in the top-k results.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of the Precision-Recall Trade-off with Respect to Retrieval Cutoff k',
      objective: 'Prove that as retrieval depth k increases, Recall@k monotonically non-decreases while Precision@k generally decays.',
      steps: [
        {
          step: 1,
          label: 'Recall Monotonicity',
          latex: '\\text{Retrieved}_k \\subseteq \\text{Retrieved}_{k+1} \\implies |\\text{Retrieved}_k \\cap \\mathcal{G}| \\le |\\text{Retrieved}_{k+1} \\cap \\mathcal{G}|',
          explanation: 'Expanding the search depth to k+1 can only add newly discovered relevant items, never remove previously found items.',
        },
        {
          step: 2,
          label: 'Recall Lower Bound Invariant',
          latex: '\\text{Recall}@(k+1) \\ge \\text{Recall}@k',
          explanation: 'Recall is mathematically guaranteed to be a monotonically non-decreasing function of k.',
        },
        {
          step: 3,
          label: 'Precision Denominator Growth',
          latex: '\\text{Precision}@k = \\frac{H_k}{k} \\quad \\text{where } H_k \\le |\\mathcal{G}|',
          explanation: 'Because the total number of relevant documents |G| is finite, once all relevant documents are found (H_k = |G|), adding further documents to k strictly dilutes precision: P@(k+m) = |G| / (k + m) < P@k.',
        },
      ],
    },

    variables: [
      { symbol: 'k', name: 'Retrieval Cutoff', description: 'Number of top-ranked items evaluated.' },
      { symbol: 'Q', name: 'Evaluation Benchmark Set', description: 'Set of test queries used to compute aggregate metrics.' },
      { symbol: 'G_i', name: 'Golden Relevant Documents', description: 'Verified ground-truth document IDs for query i.' },
      { symbol: 'R_{i, k}', name: 'Retrieved Top-K Documents', description: 'List of k document IDs returned by the retriever for query i.' },
      { symbol: 'rank_i', name: 'First Hit Rank', description: 'Position (1-indexed) of the first relevant document in R_{i, k}.' },
    ],

    numericalExample: {
      scenario: 'Evaluate a retriever on 2 queries at cutoff k=3 against a golden corpus where each query has 2 relevant documents.',
      dataset: [
        { query: 'Q1', golden: 'd1, d2', retrieved: 'd1, d4, d2' },
        { query: 'Q2', golden: 'd5, d6', retrieved: 'd7, d8, d5' },
      ],
      calculations: [
        {
          step: 'Query 1 Evaluation (Golden: d1, d2 | Top-3: d1, d4, d2)',
          math: 'Hits in top-3 = {d1, d2} (2 hits). P@3 = 2/3 = 0.667. R@3 = 2/2 = 1.000. 1st hit is d1 at rank 1 -> RR = 1/1 = 1.000.',
          result: 'P@3 = 66.7%, R@3 = 100%, RR = 1.0',
        },
        {
          step: 'Query 2 Evaluation (Golden: d5, d6 | Top-3: d7, d8, d5)',
          math: 'Hits in top-3 = {d5} (1 hit). P@3 = 1/3 = 0.333. R@3 = 1/2 = 0.500. 1st hit is d5 at rank 3 -> RR = 1/3 = 0.333.',
          result: 'P@3 = 33.3%, R@3 = 50%, RR = 0.333',
        },
        {
          step: 'Aggregate Benchmark Metrics (N=2)',
          math: 'Mean P@3 = (0.667 + 0.333)/2 = 0.500. Mean R@3 = (1.000 + 0.500)/2 = 0.750. MRR = (1.000 + 0.333)/2 = 0.667. Hit Rate = (1 + 1)/2 = 1.000 (100%).',
          result: 'Mean P@3 = 50%, Mean R@3 = 75%, MRR = 0.667, Hit Rate = 100%.',
        },
      ],
      finalConclusion: 'The retriever successfully found at least 1 relevant passage for all queries (100% Hit Rate) with an average MRR of 0.667.',
    },

    visualExplanation: {
      title: 'Retrieval Failure Mode Archetypes',
      description: 'Isolating the 4 primary root causes of retrieval breakdown in enterprise RAG.',
      features: [
        'Vocabulary Mismatch (Lexical Gap): User queries for "ZeroDivisionError" but document discusses "dividing by zero". Dense embeddings mitigate this, but exact code symbols can fail.',
        'Semantic Drift (Topical Confusion): Query matches the broad topic (e.g. "Python garbage collection") but misses the specific sub-mechanic (e.g. "breaking circular references").',
        'Chunk Seam Truncation: The crucial fact spans across the boundary of two adjacent chunks, so neither chunk alone contains sufficient semantic mass to pass threshold.',
        'Negative Distractor Domination: High-frequency marketing fluff or common boilerplate outscores technical documentation passages in cosine similarity.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Complete IR Evaluation Suite',
      code: `import numpy as np

def evaluate_retrieval(benchmark_cases: list, k: int = 3) -> dict:
    """Computes Precision@k, Recall@k, MRR, and HitRate@k across benchmark queries."""
    total_p = 0.0
    total_r = 0.0
    total_rr = 0.0
    total_hits = 0

    N = len(benchmark_cases)
    for case in benchmark_cases:
        golden = set(case['golden_ids'])
        retrieved_k = case['retrieved_ids'][:k]
        
        # Calculate intersection
        hits = [doc_id for doc_id in retrieved_k if doc_id in golden]
        num_hits = len(hits)
        
        # Metrics per query
        precision = num_hits / k
        recall = num_hits / len(golden) if golden else 0.0
        
        # First relevant hit rank
        rr = 0.0
        for rank_idx, doc_id in enumerate(retrieved_k):
            if doc_id in golden:
                rr = 1.0 / (rank_idx + 1)
                break
                
        hit_flag = 1 if num_hits > 0 else 0
        
        total_p += precision
        total_r += recall
        total_rr += rr
        total_hits += hit_flag

    return {
        "k": k,
        "mean_precision_at_k": round(total_p / N, 4),
        "mean_recall_at_k": round(total_r / N, 4),
        "mrr": round(total_rr / N, 4),
        "hit_rate_at_k": round(total_hits / N, 4)
    }

# Test benchmark dataset: 3 queries
dataset = [
    {"query": "Self-attention formula", "golden_ids": ["doc1", "doc2"], "retrieved_ids": ["doc1", "doc3", "doc2", "doc4"]},
    {"query": "HNSW graph search", "golden_ids": ["doc5"], "retrieved_ids": ["doc6", "doc5", "doc7", "doc8"]},
    {"query": "Prompt injection defense", "golden_ids": ["doc9", "doc10"], "retrieved_ids": ["doc11", "doc12", "doc13", "doc14"]}
]

metrics = evaluate_retrieval(dataset, k=3)
print(f"Retrieval Benchmark Metrics at k={metrics['k']}:")
print(f"  Precision@{metrics['k']}: {metrics['mean_precision_at_k'] * 100:.1f}%")
print(f"  Recall@{metrics['k']}:    {metrics['mean_recall_at_k'] * 100:.1f}%")
print(f"  MRR:           {metrics['mrr']:.4f}")
print(f"  Hit Rate:      {metrics['hit_rate_at_k'] * 100:.1f}%")`,
      explanation: 'Evaluates Precision@k, Recall@k, Reciprocal Rank, and Hit Rate per query and computes corpus-level macro averages.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Verification: Top-K Accuracy & Ranking Metrics',
      code: `import numpy as np
from sklearn.metrics import top_k_accuracy_score

# Multi-class classification evaluation simulating 4 queries across 5 candidate classes
# Golden target indices:
y_true = np.array([0, 2, 4, 1])

# Simulated model similarity logits for 5 candidate documents:
y_score = np.array([
    [0.9, 0.4, 0.2, 0.1, 0.0],  # Q0: Top candidate is class 0 (Hit@1)
    [0.3, 0.8, 0.6, 0.1, 0.2],  # Q1: True is 2; top is 1, second is 2 (Hit@2)
    [0.1, 0.2, 0.3, 0.4, 0.7],  # Q2: True is 4; top is 4 (Hit@1)
    [0.6, 0.2, 0.1, 0.5, 0.3]   # Q3: True is 1; top is 0, rank 3 (Hit@3)
])

# Compute Top-k Hit Rate using scikit-learn
acc_top1 = top_k_accuracy_score(y_true, y_score, k=1)
acc_top2 = top_k_accuracy_score(y_true, y_score, k=2)

print("Scikit-Learn Top-K Accuracy Simulation:")
print(f"  Top-1 Hit Rate: {acc_top1 * 100:.1f}%")
print(f"  Top-2 Hit Rate: {acc_top2 * 100:.1f}%")`,
      explanation: 'Uses scikit-learn top_k_accuracy_score to demonstrate ranking hit-rate verification across candidate similarity distributions.',
    },

    runnableCode: {
      code: `golden = ["doc_A", "doc_B"]
retrieved = ["doc_C", "doc_A", "doc_D"]
k = 3

# Compute hits
hits = [d for d in retrieved[:k] if d in golden]
p_at_k = len(hits) / k
r_at_k = len(hits) / len(golden)

# Reciprocal rank
rr = 0.0
for rank, d in enumerate(retrieved[:k], start=1):
    if d in golden:
        rr = 1.0 / rank
        break

print(f"Precision@{k}: {round(p_at_k, 3)}")
print(f"Recall@{k}: {round(r_at_k, 3)}")
print(f"Reciprocal Rank: {round(rr, 3)}")`,
      expectedOutput: `Precision@3: 0.333
Recall@3: 0.5
Reciprocal Rank: 0.5`,
    },

    lineByLineExplanation: [
      {
        lines: 'hits = [d for d in retrieved[:k] if d in golden]',
        codeSnippet: '[d for d in retrieved[:k] if d in golden]',
        explanation: 'Computes the intersection of retrieved elements in the top-k window with the golden document set.',
      },
      {
        lines: 'p_at_k = len(hits) / k',
        codeSnippet: 'p_at_k = len(hits) / k',
        explanation: 'Divides the count of true relevant documents by k to determine retrieval precision.',
      },
      {
        lines: 'rr = 1.0 / rank',
        codeSnippet: 'rr = 1.0 / rank',
        explanation: 'Records the reciprocal rank (1 / position) of the earliest relevant passage found.',
      },
    ],

    hyperparameters: [
      {
        name: 'Evaluation Cutoff (k)',
        defaultVal: 'k=3 and k=5',
        range: '1 to 20',
        effect: 'Higher k raises Recall toward 1.0 while lowering Precision; matches the context window budget allocated in production.',
        recommendation: 'Evaluate at k=1, k=3, and k=10 to observe the full Recall curve.',
      },
      {
        name: 'Benchmark Golden Dataset Size',
        defaultVal: '50 to 200 curated queries',
        range: '30 to 1000+',
        effect: 'A larger query suite ensures statistical significance and covers edge cases across diverse document categories.',
        recommendation: 'Maintain at least 100 golden queries representing real production user intent distributions.',
      },
    ],

    assumptions: [
      {
        assumption: 'Golden Relevance Labels are Exhaustive for Evaluated Chunks',
        whyItMatters: 'If an unflagged chunk actually contains a valid answer, it is unfairly penalized as a false positive, depressing Precision.',
        howToVerify: 'Audit retrieved false positives manually to confirm they are truly irrelevant.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Evaluating RAG only by human inspection of generated text',
        solution: 'Always evaluate retrieval metrics (Recall@k, MRR) independently from LLM answer generation to identify where failures originate.',
      },
      {
        mistake: 'Using synthetic test queries that copy verbatim phrases from the documents',
        solution: 'Synthetic questions that copy sentences create unrealistically inflated retrieval metrics. Ensure queries use natural human paraphrasing.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Enterprise Knowledge Management',
        application: 'Continuous CI/CD Retrieval Regression Testing',
        benefit: 'Runs automated IR benchmarks on every pull request to ensure re-indexing does not degrade query hit rates.',
      },
      {
        industry: 'Regulatory & Compliance Search',
        application: 'Audit Trail Completeness',
        benefit: 'Guarantees 100% Recall@5 on critical compliance policies so auditors never miss legal risk documents.',
      },
    ],

    practiceQuestions: [
      {
        id: 'rag-07-pq1',
        question: 'What is the relationship between Precision@k and Recall@k as k increases from 1 to 20?',
        answer: 'Recall@k monotonically non-decreases (it stays the same or goes up) because examining more documents can only capture more relevant evidence. Precision@k generally decreases because after the few true relevant documents are found, additional retrieved slots are filled with irrelevant noise.',
        explanation: 'Reflects the fundamental Information Retrieval trade-off.',
      },
      {
        id: 'rag-07-pq2',
        question: 'Why is Mean Reciprocal Rank (MRR) particularly useful for conversational question-answering systems?',
        answer: 'Users typically look at the very top answer. MRR heavily rewards systems that place the correct document at rank 1 (score 1.0) compared to rank 2 (0.50) or rank 5 (0.20), closely aligning metric scores with user satisfaction.',
        explanation: 'Reciprocal scoring penalizes systems that bury relevant answers deep in the context list.',
      },
      {
        id: 'rag-07-pq3',
        question: 'How do you diagnose whether a RAG failure was caused by the retriever or the generator?',
        answer: 'Check the retrieved passages. If the passages do not contain the answer, it is a Retrieval Failure (fix chunking, embeddings, or search). If the passages clearly contain the answer but the LLM output is wrong, it is a Generation Failure (fix system prompt, instruction constraints, or model choice).',
        explanation: 'Decoupled evaluation isolates the root cause immediately.',
      },
    ],

    quiz: [
      {
        id: 'rag-07-q1',
        question: 'For a query with 2 relevant documents in the database, the retriever returns: [Irrelevant, Relevant, Irrelevant]. What is Precision@3 and Recall@3?',
        options: [
          'Precision@3 = 0.333, Recall@3 = 0.500',
          'Precision@3 = 0.667, Recall@3 = 1.000',
          'Precision@3 = 0.500, Recall@3 = 0.333',
          'Precision@3 = 1.000, Recall@3 = 0.500',
        ],
        correctIndex: 0,
        explanation: '1 out of 3 retrieved is relevant -> P@3 = 1/3 = 0.333. 1 out of 2 total relevant is captured -> R@3 = 1/2 = 0.500.',
      },
      {
        id: 'rag-07-q2',
        question: 'If the first relevant document for a query appears at Rank 4, what is the Reciprocal Rank (RR)?',
        options: [
          '0.40',
          '0.25 (1/4)',
          '0.75',
          '4.00',
        ],
        correctIndex: 1,
        explanation: 'Reciprocal rank is 1 / rank = 1 / 4 = 0.25.',
      },
      {
        id: 'rag-07-q3',
        question: 'What is the primary indicator of a "Vocabulary Mismatch" retrieval failure?',
        options: [
          'The embedding model crashes due to out-of-memory error',
          'The document contains the exact answer, but uses different terminology or synonyms not captured by sparse keyword search',
          'The LLM responds in a foreign language',
          'The vector dimension exceeds 4096',
        ],
        correctIndex: 1,
        explanation: 'Vocabulary mismatch occurs when users and authors use different terms for the same concept.',
      },
    ],

    independentExercise: {
      title: 'Build a Complete Retrieval Benchmark Evaluator in Python',
      problem:
        'Write a Python function `benchmark_retriever(test_cases, retriever_fn, k=3)` that takes a list of dicts `[{"query": str, "expected_doc_ids": list}]`, executes `retriever_fn(query, k)` to get retrieved IDs, and returns a dictionary with `mrr` and `hit_rate`.',
      hints: [
        'Iterate through test cases and call retriever_fn.',
        'Find the 1-based index of the first expected doc in the retrieved list.',
        'Accumulate reciprocal ranks and hit indicators.',
      ],
      starterCode: `def benchmark_retriever(test_cases: list, retriever_fn, k: int = 3) -> dict:
    # TODO: Implement retrieval benchmark evaluation
    pass

# Mock retriever function for testing
def mock_retriever(query, k):
    if "python" in query.lower():
        return ["doc_py_1", "doc_other", "doc_py_2"][:k]
    return ["doc_other_1", "doc_other_2"][:k]

tests = [
    {"query": "Python memory management", "expected_doc_ids": ["doc_py_1"]},
    {"query": "Java garbage collection", "expected_doc_ids": ["doc_java_1"]}
]
print(benchmark_retriever(tests, mock_retriever, k=3))`,
      solution: `def benchmark_retriever(test_cases: list, retriever_fn, k: int = 3) -> dict:
    total_rr = 0.0
    total_hits = 0
    N = len(test_cases)
    
    for case in test_cases:
        expected = set(case["expected_doc_ids"])
        retrieved = retriever_fn(case["query"], k)
        
        # Check first hit
        rr = 0.0
        hit = 0
        for rank, doc_id in enumerate(retrieved, start=1):
            if doc_id in expected:
                rr = 1.0 / rank
                hit = 1
                break
                
        total_rr += rr
        total_hits += hit
        
    return {
        "benchmark_queries": N,
        "k": k,
        "mrr": round(total_rr / max(N, 1), 4),
        "hit_rate": round(total_hits / max(N, 1), 4)
    }

def mock_retriever(query, k):
    if "python" in query.lower():
        return ["doc_py_1", "doc_other", "doc_py_2"][:k]
    return ["doc_other_1", "doc_other_2"][:k]

tests = [
    {"query": "Python memory management", "expected_doc_ids": ["doc_py_1"]},
    {"query": "Java garbage collection", "expected_doc_ids": ["doc_java_1"]}
]
print(benchmark_retriever(tests, mock_retriever, k=3))`,
    },

    summary: {
      keyTakeaways: [
        'Retrieval quality must be benchmarked independently from LLM answer generation.',
        'Precision@k evaluates context cleanliness; Recall@k evaluates evidence completeness.',
        'MRR provides a single summary score rewarding systems that discover answers at high ranks.',
      ],
      nextLessonId: 'rag-08-hybrid-retrieval-rrf',
      nextLessonTitle: 'RAG-08: Hybrid Retrieval & Reciprocal Rank Fusion',
      nextLessonModuleId: 'p8-m8',
    },
  },

  'rag-08-hybrid-retrieval-rrf': {
    id: 'rag-08-hybrid-retrieval-rrf',
    moduleId: 'p8-m8',
    title: 'RAG-08: Hybrid Retrieval & Reciprocal Rank Fusion',
    subtitle: 'Combining Sparse BM25 and Dense Vector Retrieval via Reciprocal Rank Fusion',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Advanced',
    visualizerType: 'rag-hybrid-rrf-explorer',

    objectives: [
      'Deconstruct the BM25 probabilistic relevance framework (TF saturation k1 and length normalization b)',
      'Analyze why sparse lexical search and dense semantic vector retrieval possess complementary failure modes',
      'Implement Reciprocal Rank Fusion (RRF) to merge disparate ranking lists without raw score calibration',
      'Configure weighted hybrid scoring to balance lexical precision against semantic recall',
      'Implement compound metadata filtering in hybrid search engines',
    ],
    prerequisites: [
      'Understanding of TF-IDF and BM25 fundamentals',
      'Dense vector search mechanics (Lessons RAG-04 & RAG-05)',
    ],
    previousLesson: {
      id: 'rag-07-retrieval-quality-metrics',
      title: 'RAG-07: Retrieval Quality & Evaluation Metrics',
      moduleId: 'p8-m7',
    },

    analogy: {
      title: 'The Police Detective and the Profiling Psychologist',
      text: 'Solving a high-stakes crime requires two different investigators. The forensic detective searches for exact physical fingerprints, specific license plate numbers, and exact serial codes (BM25 sparse lexical search). The criminal profiler analyzes psychological behavior, motive, and conceptual patterns (dense vector search). If you rely only on the profiler, you might arrest someone who matches the psychological profile but was across the country; if you rely only on the detective, you fail whenever the suspect wore gloves. Hybrid retrieval pairs both experts, using Reciprocal Rank Fusion as the district attorney who requires consensus from both before issuing a warrant.',
      metaphor: 'BM25 finds exact needles; dense embeddings find conceptual haystacks. Hybrid search unites both.',
    },

    problemSolved: {
      title: 'Why Neither Dense Vectors Nor BM25 Alone Suffices for Enterprise Search',
      description:
        'Dense embedding models frequently fail on domain-specific acronyms, product serial numbers, exact function names (e.g. `sklearn.preprocessing.Normalizer`), and rare error codes where exact token matching is mandatory. Conversely, BM25 fails completely on conversational paraphrasing, conceptual synonyms, and multilingual queries. Hybrid retrieval eliminates both blind spots.',
      keyPoints: [
        'Solves Exact Keyword Failures in dense models for part numbers, code functions, and legal citations',
        'Solves Synonym & Paraphrase Blindness in BM25 for conceptual, abstract, or conversational questions',
        'Eliminates Score Scale Incompatibilities using Reciprocal Rank Fusion (RRF) rather than fragile min-max normalization',
        'Consistently Outperforms Pure Dense or Pure Sparse Retrieval across standard BEIR benchmarks by 5–15%',
      ],
    },

    intuition: {
      overview:
        'A hybrid retriever executes two independent search pipelines in parallel over the same corpus: a BM25 sparse inverted index search and an ANN dense vector search. The two ranked candidate lists are then unified using Reciprocal Rank Fusion.',
      steps: [
        {
          step: 1,
          title: 'Parallel Query Execution',
          description:
            'The input query is sent concurrently to an inverted index (e.g. Elasticsearch/PostgreSQL tsvector) to produce top-50 BM25 ranks, and to a vector index (e.g. HNSW) to produce top-50 Dense ranks.',
        },
        {
          step: 2,
          title: 'Rank Extraction',
          description:
            'Instead of using raw scores (which have incompatible scales), the algorithm extracts the ordinal rank position of each document in each list: r_bm25(d) and r_dense(d).',
        },
        {
          step: 3,
          title: 'Reciprocal Rank Fusion Calculation',
          description:
            'For each document d appearing in either list, calculate RRF(d) = 1/(k + r_bm25(d)) + 1/(k + r_dense(d)).',
        },
        {
          step: 4,
          title: 'Consensus Re-Ordering',
          description:
            'Documents that performed well in both lists receive a massive boost, while documents strong in only one list remain protected from total elimination.',
        },
      ],
    },

    mathematics: {
      overview:
        'Hybrid search combines the BM25 probabilistic model with rank-based fusion algebra.',
      foundations: [
        {
          name: 'The Okapi BM25 Scoring Formula',
          latex: '\\text{BM25}(D, Q) = \\sum_{q \\in Q} \\text{IDF}(q) \\cdot \\frac{f(q, D) \\cdot (k_1 + 1)}{f(q, D) + k_1 \\cdot \\left( 1 - b + b \\cdot \\frac{|D|}{\\text{avgdl}} \\right)}',
          explanation:
            'Computes lexical relevance. f(q, D) is term frequency in document D; |D|/avgdl normalizes for document length; k1 bounds term frequency saturation; b tunes length penalty.',
        },
        {
          name: 'BM25 Inverse Document Frequency (Robertson-Spärck Jones)',
          latex: '\\text{IDF}(q) = \\ln \\left( \\frac{N - n(q) + 0.5}{n(q) + 0.5} + 1 \\right)',
          explanation:
            'Penalizes common words appearing in many documents n(q) across the total corpus of N documents.',
        },
        {
          name: 'Reciprocal Rank Fusion (RRF)',
          latex: '\\text{RRF}(d) = \\sum_{m \\in M} \\frac{w_m}{k + r_m(d)}',
          explanation:
            'Fuses rankings across search systems m in M (e.g. BM25 and Dense). r_m(d) is the 1-based rank of document d in system m; k is a smoothing constant (standard k=60); w_m is an optional weighting factor.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of RRF Outlier Robustness compared to Linear Score Combination',
      objective: 'Prove why RRF prevents unbounded score dominance from uncalibrated retrieval pipelines.',
      steps: [
        {
          step: 1,
          label: 'Linear Score Normalization Fragility',
          latex: 'S_{\\text{linear}}(d) = \\alpha S_{\\text{dense}}(d) + (1 - \\alpha) S_{\\text{bm25}}(d)',
          explanation: 'Dense cosine similarity is bounded in [-1, 1], but BM25 scores are unbounded positive floats in [0, infinity). A document with high term repetition can produce a BM25 score of 80, completely overwhelming dense cosine signals.',
        },
        {
          step: 2,
          label: 'RRF Uniform Bounding',
          latex: '\\frac{1}{k + r_m(d)} \\in \\left( 0, \\frac{1}{k + 1} \\right] \\quad \\text{for any rank } r_m(d) \\ge 1',
          explanation: 'Regardless of raw score magnitudes, rank 1 always produces exactly 1/(k+1). For standard k=60, rank 1 contributes 1/61 ≈ 0.01639.',
        },
        {
          step: 3,
          label: 'Consensus Amplification',
          latex: '\\text{RRF}_{\\text{dual}}(\\text{rank 2 in both}) = \\frac{1}{62} + \\frac{1}{62} = 0.03226 > \\text{RRF}(\\text{rank 1 in one only}) = \\frac{1}{61} = 0.01639',
          explanation: 'A document ranked #2 in both sparse and dense retrieval earns nearly double the score of a document ranked #1 in only one list, enforcing robust multi-modal consensus.',
        },
      ],
    },

    variables: [
      { symbol: 'k_1', name: 'BM25 TF Saturation', description: 'Calibrates how quickly repeated term occurrences reach saturation (typically 1.2 to 2.0).' },
      { symbol: 'b', name: 'BM25 Length Normalization', description: 'Toggles document length penalty from 0.0 (no penalty) to 1.0 (full penalty, default 0.75).' },
      { symbol: 'k', name: 'RRF Smoothing Constant', description: 'Mitigates the impact of high ranks (industry standard default k=60).' },
      { symbol: 'r_m(d)', name: 'Rank Position', description: '1-based ordinal ranking of document d in retrieval system m.' },
      { symbol: 'w_m', name: 'Pipeline Weight', description: 'Weight assigned to retrieval method m (sum of weights = 1.0).' },
    ],

    numericalExample: {
      scenario: 'Fuse BM25 and Dense vector rankings for 3 documents using standard RRF (k=60, equal weights w=1.0).',
      dataset: [
        { doc: 'Doc A', bm25Rank: 1, denseRank: 10, desc: 'Exact keyword hit, moderate semantic match' },
        { doc: 'Doc B', bm25Rank: 4, denseRank: 3, desc: 'Good keyword hit, strong semantic match' },
        { doc: 'Doc C', bm25Rank: 25, denseRank: 1, desc: 'Weak keyword hit, top semantic match' },
      ],
      calculations: [
        {
          step: 'Doc A RRF Calculation (BM25: 1, Dense: 10)',
          math: 'RRF(A) = 1/(60 + 1) + 1/(60 + 10) = 1/61 + 1/70 = 0.016393 + 0.014286 = 0.030679',
          result: 'RRF(A) = 0.03068',
        },
        {
          step: 'Doc B RRF Calculation (BM25: 4, Dense: 3)',
          math: 'RRF(B) = 1/(60 + 4) + 1/(60 + 3) = 1/64 + 1/63 = 0.015625 + 0.015873 = 0.031498',
          result: 'RRF(B) = 0.03150',
        },
        {
          step: 'Doc C RRF Calculation (BM25: 25, Dense: 1)',
          math: 'RRF(C) = 1/(60 + 25) + 1/(60 + 1) = 1/85 + 1/61 = 0.011765 + 0.016393 = 0.028158',
          result: 'RRF(C) = 0.02816',
        },
      ],
      finalConclusion: 'Final Fused Ranking: #1 Doc B (0.03150) -> #2 Doc A (0.03068) -> #3 Doc C (0.02816). Doc B wins due to strong consensus across both pipelines.',
    },

    visualExplanation: {
      title: 'Reciprocal Rank Fusion Decision Topology',
      description: 'Understanding how RRF merges sparse and dense candidate streams.',
      features: [
        'BM25 Strengths: Exceptional for exact code identifiers (e.g. `torch.nn.MultiheadAttention`), product model SKUs, acronyms, and rare proper nouns.',
        'Dense Embedding Strengths: Exceptional for paraphrasing, conceptual descriptions, and exploratory questions.',
        'RRF Consensus Dynamics: Documents appearing in the top-10 of both pipelines jump to the top of the fused list, outranking single-pipeline outliers.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Complete BM25 & Hybrid RRF Pipeline',
      code: `import math
from collections import Counter, defaultdict

class SimpleBM25:
    """Minimal Okapi BM25 inverted index implementation."""
    def __init__(self, corpus: list[str], k1=1.2, b=0.75):
        self.k1 = k1
        self.b = b
        self.corpus = corpus
        self.doc_lens = [len(doc.lower().split()) for doc in corpus]
        self.avgdl = sum(self.doc_lens) / max(len(corpus), 1)
        self.doc_freqs = defaultdict(int)
        self.term_freqs = []
        
        # Build inverted frequencies
        for doc in corpus:
            tf = Counter(doc.lower().split())
            self.term_freqs.append(tf)
            for term in tf:
                self.doc_freqs[term] += 1

    def score(self, query: str) -> list[float]:
        q_terms = query.lower().split()
        scores = []
        N = len(self.corpus)
        for idx, tf in enumerate(self.term_freqs):
            score = 0.0
            doc_len = self.doc_lens[idx]
            for term in q_terms:
                if term not in tf:
                    continue
                # Robertson-Sparck Jones IDF
                df = self.doc_freqs[term]
                idf = math.log((N - df + 0.5) / (df + 0.5) + 1.0)
                freq = tf[term]
                denom = freq + self.k1 * (1 - self.b + self.b * (doc_len / self.avgdl))
                score += idf * (freq * (self.k1 + 1)) / denom
            scores.append(score)
        return scores

def reciprocal_rank_fusion(bm25_ranks: list, dense_ranks: list, k: int = 60) -> list:
    """Fuses sparse and dense rankings using Reciprocal Rank Fusion."""
    rrf_scores = defaultdict(float)
    
    # Process BM25 ranks
    for rank, doc_id in enumerate(bm25_ranks, start=1):
        rrf_scores[doc_id] += 1.0 / (k + rank)
        
    # Process Dense ranks
    for rank, doc_id in enumerate(dense_ranks, start=1):
        rrf_scores[doc_id] += 1.0 / (k + rank)
        
    sorted_items = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
    return [(doc_id, round(score, 5)) for doc_id, score in sorted_items]

# Test setup
bm25_list = ["docA", "docB", "docC", "docD"]
dense_list = ["docB", "docE", "docA", "docF"]

fused = reciprocal_rank_fusion(bm25_list, dense_list, k=60)
print("RRF Fused Consensus Ranking:")
for rank, (doc, score) in enumerate(fused, start=1):
    print(f"  #{rank}: {doc} (Score: {score})")`,
      explanation: 'Implements pure Okapi BM25 scoring with IDF calculation alongside Reciprocal Rank Fusion of distinct rank lists.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Verification: TfidfVectorizer vs BM25 Term Weighting',
      code: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

docs = [
    "PostgreSQL pgvector extension indexes dense vector embeddings.",
    "BM25 inverted indexes evaluate sparse lexical term frequencies.",
    "Reciprocal Rank Fusion unifies sparse and dense candidate ranks."
]

vectorizer = TfidfVectorizer(norm='l2', smooth_idf=True)
X_tfidf = vectorizer.fit_transform(docs)

query = "dense vector indexes"
q_vec = vectorizer.transform([query])

cosine_scores = (X_tfidf * q_vec.T).toarray().flatten()
ranked_indices = np.argsort(cosine_scores)[::-1]

print("TF-IDF Sparse Retrieval Ranking:")
for idx in ranked_indices:
    print(f"  Doc {idx} Score: {cosine_scores[idx]:.4f} | {docs[idx][:50]}...")`,
      explanation: 'Uses scikit-learn TfidfVectorizer to demonstrate sparse matrix-vector dot product scoring.',
    },

    runnableCode: {
      code: `def rrf_score(bm25_rank, dense_rank, k=60):
    score = (1.0 / (k + bm25_rank)) + (1.0 / (k + dense_rank))
    return round(score, 5)

# Doc 1: Ranked #1 in BM25, #5 in Dense
s1 = rrf_score(1, 5, k=60)
# Doc 2: Ranked #2 in BM25, #2 in Dense
s2 = rrf_score(2, 2, k=60)

print("Doc 1 RRF Score (Rank 1 & 5):", s1)
print("Doc 2 RRF Score (Rank 2 & 2):", s2)
print("Winner:", "Doc 2 (Consensus)" if s2 > s1 else "Doc 1")`,
      expectedOutput: `Doc 1 RRF Score (Rank 1 & 5): 0.03178
Doc 2 RRF Score (Rank 2 & 2): 0.03226
Winner: Doc 2 (Consensus)`,
    },

    lineByLineExplanation: [
      {
        lines: 'score = (1.0 / (k + bm25_rank)) + (1.0 / (k + dense_rank))',
        codeSnippet: '(1.0 / (k + bm25_rank)) + (1.0 / (k + dense_rank))',
        explanation: 'Evaluates the harmonic reciprocal rank contribution from each retrieval modality with smoothing factor k.',
      },
      {
        lines: 'print("Winner:", "Doc 2 (Consensus)" if s2 > s1 else "Doc 1")',
        codeSnippet: '"Doc 2 (Consensus)" if s2 > s1 else "Doc 1"',
        explanation: 'Demonstrates how consistent moderate placement across both pipelines outscores a single-pipeline first place.',
      },
    ],

    hyperparameters: [
      {
        name: 'RRF Constant (k)',
        defaultVal: '60',
        range: '10 to 100',
        effect: 'Controls the slope of rank penalty; smaller k gives huge advantage to top-3 ranks, larger k flattens rank differences.',
        recommendation: 'Use k=60 as established by Cormack et al. (2009); works robustly across almost all corpora.',
      },
      {
        name: 'Pipeline Weight Alpha (w_dense / w_bm25)',
        defaultVal: '0.5 / 0.5 (Equal)',
        range: '0.0 to 1.0',
        effect: 'Shifts emphasis toward semantic meaning (high alpha) or exact keyword matching (low alpha).',
        recommendation: 'Use equal weights (0.5) by default; increase BM25 weight for code or part-number catalogs.',
      },
    ],

    assumptions: [
      {
        assumption: 'Rankings from Sparse and Dense Pipelines are Independent',
        whyItMatters: 'RRF derives its power from combining uncorrelated error distributions; correlated errors reduce hybrid lift.',
        howToVerify: 'Verify Kendall-tau rank correlation between BM25 and dense outputs (typically 0.2 to 0.4).',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Directly adding raw BM25 scores to raw Cosine scores',
        solution: 'Never sum raw scores directly: BM25 is unbounded [0, inf) while Cosine is [-1, 1]. Use RRF or calibrated min-max scaling.',
      },
      {
        mistake: 'Failing to tokenize queries identically between BM25 and embedding models',
        solution: 'Ensure text preprocessing (e.g. lowercase, punctuation handling) preserves intended terms for both pipelines.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'E-Commerce Marketplace Search',
        application: 'Catalog Product Discovery',
        benefit: 'Handles exact brand SKU queries (e.g. "Sony WH-1000XM5") via BM25 and conceptual queries (e.g. "noise cancelling travel headphones") via dense embeddings.',
      },
      {
        industry: 'Healthcare Records & Clinical Trials',
        application: 'Medical Term Search',
        benefit: 'Combines exact drug trade name matching with disease symptom vector clustering.',
      },
    ],

    practiceQuestions: [
      {
        id: 'rag-08-pq1',
        question: 'Why does adding raw BM25 scores and raw cosine similarity scores directly together cause failure?',
        answer: 'Because BM25 scores are unbounded positive numbers (often ranging from 0 to 50+ depending on term frequency and corpus size), whereas cosine similarity is strictly bounded in [-1.0, 1.0]. Directly adding them causes the BM25 score to completely dwarf and nullify the embedding score.',
        explanation: 'Reciprocal Rank Fusion bypasses this scale incompatibility by operating purely on ordinal ranks.',
      },
      {
        id: 'rag-08-pq2',
        question: 'What is the role of parameter k1 in the Okapi BM25 formula?',
        answer: 'k1 controls term frequency saturation. As a term appears more frequently in a document, BM25 increases its score up to an asymptote governed by k1. A lower k1 causes term frequency to saturate faster, preventing keyword-stuffing documents from dominating search.',
        explanation: 'Standard k1 is set between 1.2 and 2.0.',
      },
      {
        id: 'rag-08-pq3',
        question: 'Under what query conditions does BM25 consistently outperform dense vector embeddings?',
        answer: 'When queries contain rare out-of-vocabulary terms, specific product serial codes, exact programming language functions (e.g. `pd.DataFrame.merge`), or alphanumeric part numbers where semantic embeddings produce blurry coordinates.',
        explanation: 'Sparse inverted indexes match exact character tokens directly without loss of precision.',
      },
    ],

    quiz: [
      {
        id: 'rag-08-q1',
        question: 'In Reciprocal Rank Fusion (RRF), what is the formula to compute the score of document d with smoothing constant k across rank lists r_m?',
        options: [
          'RRF(d) = sum(r_m(d) * k)',
          'RRF(d) = sum(1 / (k + r_m(d)))',
          'RRF(d) = product(r_m(d)) / k',
          'RRF(d) = sum(log(k + r_m(d)))',
        ],
        correctIndex: 1,
        explanation: 'Standard RRF sums 1 / (k + r_m(d)) across all retrieval systems.',
      },
      {
        id: 'rag-08-q2',
        question: 'What is the standard industry default value for the RRF smoothing constant k?',
        options: [
          'k = 1',
          'k = 60',
          'k = 1000',
          'k = 0',
        ],
        correctIndex: 1,
        explanation: 'Cormack et al. established k = 60 as the empirical sweet spot across broad text benchmarks.',
      },
      {
        id: 'rag-08-q3',
        question: 'How does BM25 handle document length normalization via parameter b?',
        options: [
          'It converts all documents to 512 tokens',
          'It penalizes long documents when b > 0, scaling with |D| / avgdl so that longer documents do not win matches purely by containing more words',
          'It deletes all words longer than 10 characters',
          'It divides all scores by the number of vowels in the text',
        ],
        correctIndex: 1,
        explanation: 'Parameter b controls length penalty: b=1.0 applies full document length normalization.',
      },
    ],

    independentExercise: {
      title: 'Implement Weighted Reciprocal Rank Fusion in Python',
      problem:
        'Write a Python function `weighted_rrf(list_a, list_b, weight_a=0.7, weight_b=0.3, k=60)` that merges two ranked lists of document strings using custom pipeline weights and returns the sorted consensus results.',
      hints: [
        'Iterate through list_a with rank `r`: add `weight_a / (k + r)` to score.',
        'Iterate through list_b with rank `r`: add `weight_b / (k + r)` to score.',
        'Sort accumulated scores in descending order.',
      ],
      starterCode: `def weighted_rrf(list_a: list, list_b: list, weight_a: float = 0.7, weight_b: float = 0.3, k: int = 60) -> list:
    # TODO: Implement weighted RRF fusion
    pass

sparse = ["doc1", "doc2", "doc3"]
dense = ["doc2", "doc4", "doc1"]
print(weighted_rrf(sparse, dense, weight_a=0.7, weight_b=0.3))`,
      solution: `from collections import defaultdict

def weighted_rrf(list_a: list, list_b: list, weight_a: float = 0.7, weight_b: float = 0.3, k: int = 60) -> list:
    scores = defaultdict(float)
    
    for rank, doc in enumerate(list_a, start=1):
        scores[doc] += weight_a / (k + rank)
        
    for rank, doc in enumerate(list_b, start=1):
        scores[doc] += weight_b / (k + rank)
        
    sorted_docs = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [{"doc": doc, "score": round(score, 5)} for doc, score in sorted_docs]

sparse = ["doc1", "doc2", "doc3"]
dense = ["doc2", "doc4", "doc1"]
print(weighted_rrf(sparse, dense, weight_a=0.7, weight_b=0.3))`,
    },

    summary: {
      keyTakeaways: [
        'Sparse BM25 and dense embeddings have complementary strengths: lexical precision versus semantic recall.',
        'Reciprocal Rank Fusion unifies ranking distributions without uncalibrated score normalization.',
        'Hybrid retrieval provides a significant, consistent 5–15% lift in retrieval recall across enterprise corpora.',
      ],
      nextLessonId: 'rag-09-reranking-query-transform',
      nextLessonTitle: 'RAG-09: Reranking & Query Transformation',
      nextLessonModuleId: 'p8-m9',
    },
  },

  'rag-09-reranking-query-transform': {
    id: 'rag-09-reranking-query-transform',
    moduleId: 'p8-m9',
    title: 'RAG-09: Reranking & Query Transformation',
    subtitle: 'Cross-Encoders, Two-Stage Pipelines, HyDE & Multi-Query Expansion',
    order: 1,
    readTimeMinutes: 36,
    difficulty: 'Advanced',
    visualizerType: 'rag-reranking-explorer',

    objectives: [
      'Contrast Bi-Encoder candidate retrieval with Cross-Encoder full-attention reranking',
      'Architect two-stage retrieval pipelines: Fast Bi-Encoder (Top-50) -> Deep Cross-Encoder (Top-3)',
      'Analyze the quadratic attention complexity O((L_q + L_d)^2) of cross-encoders and latency budgeting',
      'Implement query rewriting and Hypothetical Document Embeddings (HyDE) to bridge question-answer distribution gaps',
      'Deploy sub-query decomposition to resolve complex multi-hop user inquiries',
    ],
    prerequisites: [
      'Understanding of Bi-Encoders and cross-attention in Transformers (Phase 6 & Lesson RAG-04)',
      'Hybrid retrieval foundations (Lesson RAG-08)',
    ],
    previousLesson: {
      id: 'rag-08-hybrid-retrieval-rrf',
      title: 'RAG-08: Hybrid Retrieval & Reciprocal Rank Fusion',
      moduleId: 'p8-m8',
    },

    analogy: {
      title: 'The Resume Screening Funnel and the In-Depth Interview',
      text: 'Imagine a top tech company receiving 10,000 job applications for one engineering role. An automated resume parser (Bi-Encoder) quickly filters 10,000 resumes down to the top 20 candidates in seconds by checking keywords and skills. But you would never hire someone based solely on a resume scan. The company then invites the top 20 candidates for a 2-hour technical whiteboard interview (Cross-Encoder reranker). In the interview, every interviewer statement directly interacts with every candidate answer. It takes far more time, but produces 10x higher selection precision.',
      metaphor: 'Bi-encoders filter candidate volume; cross-encoders interview the finalists.',
    },

    problemSolved: {
      title: 'Why Bi-Encoders Miss Subtle Semantic Nuances',
      description:
        'Bi-encoders compress an entire document chunk into a single vector independently of the query. Consequently, subtle syntactic nuances, negations ("not approved" vs "approved"), and multi-word token dependencies are frequently lost. Cross-encoders evaluate full query-passage token-to-token cross-attention, resolving ambiguities with state-of-the-art precision.',
      keyPoints: [
        'Enables Token-Level Cross-Attention where every query word attends directly to every passage word',
        'Reverses Misleading Bi-Encoder Rankings where high lexical overlap masked a mismatch in semantic condition',
        'Bridges Question-Answer Asymmetry using Hypothetical Document Embeddings (HyDE) to search doc-to-doc instead of query-to-doc',
        'Decomposes Complex Multi-Part Questions into targeted sub-queries for parallel retrieval',
      ],
    },

    intuition: {
      overview:
        'Two-stage retrieval combines the speed of bi-encoders with the precision of cross-encoders, providing high recall and high precision within an enterprise latency budget.',
      steps: [
        {
          step: 1,
          title: 'Query Transformation & Expansion (Optional)',
          description:
            'Generate a hypothetical answer using an LLM (HyDE) or decompose a compound question into 3 focused sub-queries.',
        },
        {
          step: 2,
          title: 'Stage 1: Fast Candidate Retrieval (Bi-Encoder / Hybrid)',
          description:
            'Search millions of indexed vectors via HNSW or BM25 to retrieve the top 50–100 candidate passages in under 10ms.',
        },
        {
          step: 3,
          title: 'Stage 2: Cross-Encoder Reranking',
          description:
            'Concatenate query and candidate into `[CLS] query [SEP] passage [SEP]` and feed into a cross-encoder model (e.g. BGE-reranker, Cohere Rerank). Compute precise relevance logits.',
        },
        {
          step: 4,
          title: 'Top-k Slicing for Context Injection',
          description:
            'Select the top 3–5 highest-scoring reranked passages to assemble into the final grounded LLM generation prompt.',
        },
      ],
    },

    mathematics: {
      overview:
        'Mathematical comparison of Bi-Encoder dot product versus Cross-Encoder joint attention.',
      foundations: [
        {
          name: 'Bi-Encoder Scoring (Independent Projections)',
          latex: 'S_{\\text{Bi}}(q, d) = f_\\theta(q) \\cdot g_\\phi(d) \\in \\mathbb{R}',
          explanation:
            'Query q and document d are encoded into fixed vectors independently. Complexity is O(1) dot product at query time.',
        },
        {
          name: 'Cross-Encoder Scoring (Joint Self-Attention)',
          latex: 'S_{\\text{Cross}}(q, d) = \\sigma\\left( \\mathbf{W} \\cdot \\text{Transformer}([q; d])_{[\\text{CLS}]} \\right)',
          explanation:
            'Tokens of q and d interact across all self-attention layers. Complexity is O((L_q + L_d)^2) quadratic in token length.',
        },
        {
          name: 'Hypothetical Document Embeddings (HyDE)',
          latex: 'd_{\\text{hypo}} \\sim P_{\\text{LLM}}(\\cdot \\mid q) \\implies \\mathbf{e}_{\\text{search}} = \\text{Embed}(d_{\\text{hypo}})',
          explanation:
            'Generates a fictitious synthetic answer d_hypo to query q. The embedding of d_hypo lives in document manifold space, improving cosine alignment.',
        },
      ],
    },

    derivation: {
      title: 'Derivation of Computational Complexity Trade-Off: Bi-Encoder vs Cross-Encoder',
      objective: 'Demonstrate why Cross-Encoders cannot be used directly across millions of corpus documents.',
      steps: [
        {
          step: 1,
          label: 'Bi-Encoder Candidate Search Complexity',
          latex: 'T_{\\text{Bi}} = T_{\\text{embed}}(q) + O(K_{\\text{hops}} \\cdot D) \\approx 5\\text{ms} + 2\\text{ms} = 7\\text{ms}',
          explanation: 'Only the query is embedded online. All N document embeddings are pre-computed offline.',
        },
        {
          step: 2,
          label: 'Cross-Encoder Full Search Complexity across N Documents',
          latex: 'T_{\\text{Cross-all}} = N \\cdot O\\left( L_{\\text{layers}} \\cdot (L_q + L_d)^2 \\cdot D \\right)',
          explanation: 'For N = 1,000,000 documents, evaluating full joint attention requires over 100 million Transformer forward passes (taking hours per query!).',
        },
        {
          step: 3,
          label: 'Two-Stage Compromise Complexity',
          latex: 'T_{\\text{Two-Stage}} = T_{\\text{Bi}}(\\text{Top-}50) + 50 \\cdot T_{\\text{Cross}} \\approx 7\\text{ms} + 50 \\cdot 0.8\\text{ms} \\approx 47\\text{ms}',
          explanation: 'Restricting cross-encoding to the top-50 candidates delivers 99% of full cross-encoder accuracy while maintaining an interactive 50ms query latency.',
        },
      ],
    },

    variables: [
      { symbol: 'q', name: 'User Query', description: 'Input search query string of length L_q.' },
      { symbol: 'd', name: 'Document Chunk', description: 'Candidate passage text of length L_d.' },
      { symbol: 'd_{hypo}', name: 'Hypothetical Document', description: 'Synthetic zero-shot answer generated by LLM prior to search.' },
      { symbol: 'S_{Cross}', name: 'Reranker Relevance Score', description: 'Calibrated scalar probability that passage d answers query q.' },
    ],

    numericalExample: {
      scenario: 'Trace a two-stage retrieval pipeline ranking 4 candidate passages for query "How does Python handle cyclic references?".',
      dataset: [
        { id: 'p1', title: 'Python Reference Counting', biScore: 0.86, crossScore: 0.72 },
        { id: 'p2', title: 'CPython Generational Garbage Collection', biScore: 0.79, crossScore: 0.95 },
        { id: 'p3', title: 'Memory Leak Profiling Tools', biScore: 0.75, crossScore: 0.65 },
        { id: 'p4', title: 'JVM Stop-The-World GC Cycles', biScore: 0.74, crossScore: 0.15 },
      ],
      calculations: [
        {
          step: 'Stage 1: Bi-Encoder Ordering (Top-k = 4)',
          math: 'Ranking by Bi-Score: #1 p1 (0.86) -> #2 p2 (0.79) -> #3 p3 (0.75) -> #4 p4 (0.74)',
          result: 'Bi-encoder places generic reference counting at #1.',
        },
        {
          step: 'Stage 2: Cross-Encoder Reranking',
          math: 'Ranking by Cross-Score: #1 p2 (0.95) -> #2 p1 (0.72) -> #3 p3 (0.65) -> #4 p4 (0.15)',
          result: 'Cross-encoder flips ranking: p2 moves from #2 to #1; p4 is crushed from 0.74 to 0.15.',
        },
      ],
      finalConclusion: 'Cross-encoder accurately detects that p2 directly addresses cyclic reference collection, elevating it to rank #1.',
    },

    visualExplanation: {
      title: 'Two-Stage Retrieval Funnel Topology',
      description: 'Understanding the operational flow from millions of documents to the final LLM prompt context.',
      features: [
        'Stage 1 (Bi-Encoder / Hybrid): 1,000,000 indexed documents → Fast ANN Vector Search → Top 50 candidate passages (~10ms).',
        'Stage 2 (Cross-Encoder Reranker): 50 candidate passages → Joint Query-Doc Token Attention → Top 3 verified passages (~40ms).',
        'Query Transformation (HyDE): For abstract questions, LLM drafts a synthetic paragraph. Embedding the hallucinated paragraph often yields a higher cosine match than the short question itself.',
      ],
    },

    scratchCode: {
      title: 'Python from Scratch: Two-Stage Retrieval with Reranker Simulator',
      code: `import numpy as np

# Deterministic seed for reproducible verification
np.random.seed(42)

class TwoStageRetriever:
    """Two-Stage pipeline: Fast Bi-Encoder candidate filtering + Cross-Encoder reranking."""
    def __init__(self, corpus: list[dict]):
        self.corpus = corpus

    def stage1_biencoder_search(self, query: str, top_candidates: int = 4):
        """Simulate fast bi-encoder candidate retrieval."""
        results = []
        q_words = set(query.lower().split())
        for doc in self.corpus:
            doc_words = set(doc['text'].lower().split())
            overlap = len(q_words & doc_words)
            # Bi-encoder proxy score: broad keyword overlap
            bi_score = round(0.5 + 0.1 * overlap, 3)
            results.append({**doc, 'bi_score': bi_score})
        results.sort(key=lambda x: x['bi_score'], reverse=True)
        return results[:top_candidates]

    def stage2_cross_encoder_rerank(self, query: str, candidates: list[dict], top_k: int = 2):
        """Simulate deep cross-encoder token-level attention reranking."""
        reranked = []
        for cand in candidates:
            # Cross-encoder evaluates fine-grained semantic match
            score = cand['ground_truth_relevance']
            reranked.append({**cand, 'cross_score': score})
        reranked.sort(key=lambda x: x['cross_score'], reverse=True)
        return reranked[:top_k]

# Candidate documents
docs = [
    {"id": "doc1", "text": "Python reference counting handles object deallocation.", "ground_truth_relevance": 0.70},
    {"id": "doc2", "text": "CPython generational collector detects and breaks cyclic references.", "ground_truth_relevance": 0.96},
    {"id": "doc3", "text": "Java garbage collection uses eden and survivor spaces.", "ground_truth_relevance": 0.10},
    {"id": "doc4", "text": "Memory leak debugging in production services.", "ground_truth_relevance": 0.60}
]

pipeline = TwoStageRetriever(docs)
stage1 = pipeline.stage1_biencoder_search("Python cyclic references", top_candidates=4)
print("Stage 1 Bi-Encoder Rankings:")
for c in stage1:
    print(f"  [{c['bi_score']}] {c['id']}: {c['text'][:50]}...")

stage2 = pipeline.stage2_cross_encoder_rerank("Python cyclic references", stage1, top_k=2)
print("\\nStage 2 Cross-Encoder Reranked Top-2:")
for c in stage2:
    print(f"  [Cross-Score: {c['cross_score']}] {c['id']}: {c['text'][:50]}...")`,
      explanation: 'Simulates the two-stage pipeline: Stage 1 retrieves top candidates via fast search; Stage 2 reranks using deep relevance scoring.',
    },

    sklearnCode: {
      title: 'Scikit-Learn Verification: Query Expansion via Latent Semantic Analysis',
      code: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD

corpus = [
    "PostgreSQL pgvector extension enables HNSW graph search.",
    "Hierarchical navigable small world graphs provide fast vector retrieval.",
    "BM25 inverted indexes evaluate sparse lexical matches.",
    "Two-stage retrieval pairs bi-encoders with cross-encoder rerankers."
]

tfidf = TfidfVectorizer(stop_words='english')
X = tfidf.fit_transform(corpus)

# LSA Query Expansion: project into 2 latent semantic topics
svd = TruncatedSVD(n_components=2, random_state=42)
X_lsa = svd.fit_transform(X)

print("LSA Transformed Corpus (2 Latent Concepts):")
print(np.round(X_lsa, 3))`,
      explanation: 'Uses scikit-learn TruncatedSVD on TF-IDF features to demonstrate latent semantic concept projection.',
    },

    runnableCode: {
      code: `candidates = [
    {"id": "c1", "bi_score": 0.88, "cross_score": 0.71},
    {"id": "c2", "bi_score": 0.81, "cross_score": 0.94},
]

# Sort by cross-score
reranked = sorted(candidates, key=lambda x: x["cross_score"], reverse=True)
print("Top Candidate After Reranking:", reranked[0]["id"])
print("Reranked Score:", reranked[0]["cross_score"])`,
      expectedOutput: `Top Candidate After Reranking: c2
Reranked Score: 0.94`,
    },

    lineByLineExplanation: [
      {
        lines: 'reranked = sorted(candidates, key=lambda x: x["cross_score"], reverse=True)',
        codeSnippet: 'sorted(candidates, key=lambda x: x["cross_score"], reverse=True)',
        explanation: 'Re-sorts candidate passages based on deep Cross-Encoder relevance scores.',
      },
    ],

    hyperparameters: [
      {
        name: 'Stage 1 Candidate Pool Size (Top-k)',
        defaultVal: '30 to 50',
        range: '10 to 100',
        effect: 'Higher pool size increases recall ceiling but adds ~0.8ms of GPU inference per candidate in Stage 2.',
        recommendation: '50 candidates provides optimal recall without exceeding a 50ms latency budget.',
      },
      {
        name: 'Cross-Encoder Context Length',
        defaultVal: '512 tokens',
        range: '256 to 4096',
        effect: 'Limits total joint query + passage length evaluated by cross-attention.',
        recommendation: 'Use 512 tokens for standard passage chunks; truncate longer documents to prevent OOM.',
      },
    ],

    assumptions: [
      {
        assumption: 'The True Answering Passage is Present in the Stage 1 Candidate Pool',
        whyItMatters: 'If Stage 1 misses the true document, no reranker in the world can rank it.',
        howToVerify: 'Verify that Recall@50 in Stage 1 exceeds 95%.',
      },
    ],

    commonMistakes: [
      {
        mistake: 'Passing hundreds of passages to a cross-encoder synchronously on CPU',
        solution: 'Cross-encoders have quadratic complexity O(L^2). Keep candidate pools under 50 or execute on GPU/batch endpoints.',
      },
      {
        mistake: 'Using HyDE without validating LLM generation speed',
        solution: 'HyDE adds an entire LLM inference generation step (~500ms) before search begins. Use HyDE selectively for ambiguous queries.',
      },
    ],

    realWorldUseCases: [
      {
        industry: 'Enterprise Legal Tech',
        application: 'Statute and Contract Reranking',
        benefit: 'Cross-encoders identify subtle jurisdictional exceptions and condition clauses that bi-encoders overlook.',
      },
      {
        industry: 'Healthcare Clinical Diagnosis',
        application: 'Medical Case Precedent Search',
        benefit: 'Reranks patient history matches to ensure critical rare symptom combinations are elevated to top clinical context.',
      },
    ],

    practiceQuestions: [
      {
        id: 'rag-09-pq1',
        question: 'Why can a Bi-Encoder not perform cross-attention between query and passage tokens?',
        answer: 'A Bi-Encoder encodes the query and the document chunk independently in separate forward passes to produce two isolated vectors. Because they are processed separately, query tokens cannot attend to passage tokens across Transformer attention heads.',
        explanation: 'Independent encoding enables offline pre-indexing but sacrifices token-level cross-attention.',
      },
      {
        id: 'rag-09-pq2',
        question: 'What is Hypothetical Document Embeddings (HyDE) and how does it improve retrieval?',
        answer: 'HyDE prompts an LLM to generate a hypothetical, synthetic answer to the user query before searching. Even if the hypothetical answer contains factual errors, its embedding lives in the document manifold space and shares document-style vocabulary, improving semantic alignment with true answering documents.',
        explanation: 'Converts asymmetric query-to-doc search into symmetric doc-to-doc search.',
      },
      {
        id: 'rag-09-pq3',
        question: 'What is sub-query decomposition and when should it be applied?',
        answer: 'Sub-query decomposition takes a complex multi-part question (e.g. "Compare the revenue growth of Acme Corp in 2023 with its cloud infrastructure spending in 2024") and splits it into independent sub-queries. Each sub-query is retrieved separately, and the results are merged into the final context.',
        explanation: 'Prevents single-vector retrieval from missing multi-hop facts.',
      },
    ],

    quiz: [
      {
        id: 'rag-09-q1',
        question: 'What is the primary architectural difference between a Bi-Encoder and a Cross-Encoder?',
        options: [
          'Bi-encoders only work on English text',
          'Bi-encoders encode query and document separately into fixed vectors; Cross-encoders feed query and document together into joint self-attention',
          'Cross-encoders cannot be run on GPUs',
          'Bi-encoders require SQLite while cross-encoders require PostgreSQL',
        ],
        correctIndex: 1,
        explanation: 'Cross-encoders evaluate joint self-attention across both query and document tokens simultaneously.',
      },
      {
        id: 'rag-09-q2',
        question: 'Why are Cross-Encoders not used to search directly across millions of documents in a database?',
        options: [
          'They produce random numbers for large datasets',
          'They have quadratic computational complexity O((L_q + L_d)^2) and cannot be pre-indexed as static vectors',
          'They only support 8-bit quantization',
          'They cannot compute cosine distance',
        ],
        correctIndex: 1,
        explanation: 'Because every pair requires a live forward pass, searching 1M documents would take minutes to hours per query.',
      },
      {
        id: 'rag-09-q3',
        question: 'In a production two-stage retrieval pipeline, what is the typical candidate count retrieved by Stage 1 for reranking in Stage 2?',
        options: [
          '1 to 2 candidates',
          '30 to 100 candidates',
          '10,000 to 50,000 candidates',
          'All documents in the database',
        ],
        correctIndex: 1,
        explanation: '30 to 100 candidates captures >95% of relevant documents while keeping reranker inference under 50ms.',
      },
    ],

    independentExercise: {
      title: 'Build a Query Rewriter and Decomposer in Python',
      problem:
        'Write a Python function `decompose_query(compound_query: str) -> list[str]` that detects coordinating conjunctions like "and compare with", "versus", or "alongside" and splits compound questions into clean, focused sub-queries.',
      hints: [
        'Use regular expressions or string splitting on connectors like "versus", " vs ", " and compare with ".',
        'Clean whitespace from resulting sub-queries.',
        'If no connector is found, return `[compound_query]`.',
      ],
      starterCode: `import re

def decompose_query(query: str) -> list[str]:
    # TODO: Implement query decomposition
    pass

print(decompose_query("Evaluate Acme 2023 revenue and compare with Beta Corp 2023 revenue"))
print(decompose_query("Postgres HNSW versus IVFFlat indexing"))
print(decompose_query("How does self-attention work?"))`,
      solution: `import re

def decompose_query(query: str) -> list[str]:
    pattern = r'\\s+(?:and compare with|versus|vs\\.?|along with)\\s+'
    splits = re.split(pattern, query, flags=re.IGNORECASE)
    cleaned = [s.strip() for s in splits if s.strip()]
    return cleaned if cleaned else [query.strip()]

print(decompose_query("Evaluate Acme 2023 revenue and compare with Beta Corp 2023 revenue"))
print(decompose_query("Postgres HNSW versus IVFFlat indexing"))
print(decompose_query("How does self-attention work?"))`,
    },

    summary: {
      keyTakeaways: [
        'Two-stage retrieval pairs fast Bi-Encoder candidate filtering with deep Cross-Encoder token reranking.',
        'Cross-encoders eliminate subtle semantic inversions and false positive matches.',
        'Query transformation techniques like HyDE and sub-query decomposition bridge lexical and structural intent gaps.',
      ],
      nextLessonId: 'rag-10-grounded-context-assembly',
      nextLessonTitle: 'RAG-10: Constructing Grounded Context & Token Budgets',
      nextLessonModuleId: 'p8-m10',
    },
  },
};
