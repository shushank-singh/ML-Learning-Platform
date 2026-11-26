export interface InterviewMCQ {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InterviewCodingChallenge {
  id: string;
  title: string;
  prompt: string;
  starterCode: string;
  testHarness: string;
  testCount: number;
  sampleSolution: string;
}

export interface MockInterviewTrack {
  id: string;
  title: string;
  roleBadge: string;
  durationMinutes: number;
  description: string;
  accentColor: string;
  mcqs: InterviewMCQ[];
  codingChallenge: InterviewCodingChallenge;
}

export const MOCK_INTERVIEW_TRACKS: MockInterviewTrack[] = [
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer Round',
    roleBadge: 'Core ML + Math + NumPy',
    durationMinutes: 20,
    description:
      'Simulates a technical ML screening: bias-variance diagnostics, regularization, ROC-AUC, and a live NumPy vectorization challenge.',
    accentColor: 'from-indigo-600 to-violet-600',
    mcqs: [
      {
        id: 'ml-i-1',
        topic: 'Regularization & Optimization',
        question:
          'You observe 99% training accuracy and 64% validation accuracy on a tabular classifier. Which change directly reduces variance?',
        options: [
          'Increase polynomial feature degree from 2 to 6',
          'Increase L2 penalty λ and collect more training samples',
          'Remove dropout and train for 500 more epochs',
          'Decrease regularization strength to zero',
        ],
        correctIndex: 1,
        explanation:
          'A large train-val gap indicates high variance (overfitting). Stronger regularization (higher λ) constrains model capacity and more data stabilizes parameter estimates.',
      },
      {
        id: 'ml-i-2',
        topic: 'Imbalanced Classification',
        question:
          'For a fraud detection dataset with 0.2% positive labels, why is PR-AUC preferred over accuracy?',
        options: [
          'A trivial all-negative classifier achieves 99.8% accuracy while catching 0% of fraud.',
          'Accuracy cannot be computed for binary targets.',
          'PR-AUC ignores precision and only tracks true negatives.',
          'Accuracy requires normally distributed features.',
        ],
        correctIndex: 0,
        explanation:
          'With severe class imbalance, accuracy is dominated by true negatives. Precision-Recall AUC directly evaluates minority-class detection quality.',
      },
      {
        id: 'ml-i-3',
        topic: 'Data Leakage',
        question:
          'Which preprocessing step causes subtle data leakage if performed before cross-validation splitting?',
        options: [
          'Dropping duplicate exact rows inside the training split',
          'Fitting StandardScaler on the entire dataset before K-Fold split',
          'Casting float64 columns to float32',
          'Renaming DataFrame column headers',
        ],
        correctIndex: 1,
        explanation:
          'Fitting a scaler on the full dataset leaks validation mean and variance into training folds. Fit scalers strictly inside each training fold or Pipeline.',
      },
      {
        id: 'ml-i-4',
        topic: 'Gradient Boosting',
        question:
          'In Gradient Boosted Decision Trees (XGBoost/LightGBM), each new tree is trained to predict:',
        options: [
          'Random bootstrap copies of the original target labels independently',
          'The negative gradient (pseudo-residuals) of the loss function from previous trees',
          'Only misclassified outliers with uniform weights',
          'Principal components of the feature matrix',
        ],
        correctIndex: 1,
        explanation:
          'Gradient boosting performs functional gradient descent by sequentially fitting trees to the negative gradient of the loss with respect to current predictions.',
      },
    ],
    codingChallenge: {
      id: 'ml-code-cosine',
      title: 'Implement Batch Cosine Similarity in NumPy',
      prompt:
        'Write `cosine_similarity(a, b)` using NumPy that takes two 1D arrays `a` and `b` and returns their cosine similarity `(a · b) / (||a|| * ||b||)` as a float (return `0.0` if either norm is 0).',
      starterCode: `import numpy as np

def cosine_similarity(a, b):
    a = np.asarray(a, dtype=float)
    b = np.asarray(b, dtype=float)
    # TODO: compute dot product and norms safely
    pass
`,
      testHarness: `
assert abs(cosine_similarity([1, 0, 0], [1, 0, 0]) - 1.0) < 1e-6, "Test 1 failed: identical unit vectors"
assert abs(cosine_similarity([1, 0], [0, 1]) - 0.0) < 1e-6, "Test 2 failed: orthogonal vectors"
assert abs(cosine_similarity([1, 2, 3], [-1, -2, -3]) + 1.0) < 1e-6, "Test 3 failed: opposite vectors"
assert cosine_similarity([0, 0, 0], [1, 2, 3]) == 0.0, "Test 4 failed: zero-norm guard"
print("ALL_TESTS_PASSED:4/4")
`,
      testCount: 4,
      sampleSolution: `import numpy as np

def cosine_similarity(a, b):
    a = np.asarray(a, dtype=float)
    b = np.asarray(b, dtype=float)
    denom = np.linalg.norm(a) * np.linalg.norm(b)
    if denom == 0.0:
        return 0.0
    return float(np.dot(a, b) / denom)
`,
    },
  },
  {
    id: 'genai-rag',
    title: 'GenAI, LLM & RAG Systems Round',
    roleBadge: 'Transformers + RAG + Agents',
    durationMinutes: 20,
    description:
      'Tests production LLM engineering: scaled dot-product attention, KV caching, LoRA rank trade-offs, and Hybrid RRF retrieval.',
    accentColor: 'from-teal-600 to-emerald-600',
    mcqs: [
      {
        id: 'genai-i-1',
        topic: 'Self-Attention Scaling',
        question: 'Why does Transformer attention divide QKᵀ by √d_k before applying softmax?',
        options: [
          'To halve GPU VRAM usage during inference',
          'To prevent large dot-product magnitudes from pushing softmax into tiny-gradient saturation regions',
          'To enforce causal autoregressive masking automatically',
          'To convert token IDs into positional sinusoids',
        ],
        correctIndex: 1,
        explanation:
          'When d_k is large, dot products grow in variance (~d_k), causing softmax to saturate with near-zero gradients. Dividing by √d_k restores unit variance.',
      },
      {
        id: 'genai-i-2',
        topic: 'LoRA Fine-Tuning',
        question: 'In LoRA (Low-Rank Adaptation), a frozen weight matrix W ∈ ℝ^(d×k) is updated using:',
        options: [
          'Full backpropagation through all d×k parameters',
          'W + BA where B ∈ ℝ^(d×r) and A ∈ ℝ^(r×k) with r ≪ min(d, k)',
          'Quantizing weights to 1-bit integers during training',
          'Replacing the FFN layer with a BM25 index',
        ],
        correctIndex: 1,
        explanation:
          'LoRA freezes pretrained weights W and optimizes low-rank adapters B and A, slashing trainable parameters and optimizer memory.',
      },
      {
        id: 'genai-i-3',
        topic: 'RAG Hybrid Retrieval',
        question: 'Why combine sparse BM25 with dense vector retrieval using Reciprocal Rank Fusion (RRF)?',
        options: [
          'BM25 catches exact IDs/acronyms/keywords while dense embeddings capture semantic synonyms, and RRF merges incompatible score scales cleanly.',
          'RRF requires training a cross-encoder on every query.',
          'BM25 eliminates the need to chunk documents.',
          'Dense embeddings cannot work on English text.',
        ],
        correctIndex: 0,
        explanation:
          'BM25 and cosine similarity have incompatible score distributions. RRF fuses rankings via 1 / (k + rank) without fragile score normalization.',
      },
      {
        id: 'genai-i-4',
        topic: 'KV Cache & Inference',
        question: 'During autoregressive LLM decoding, the KV cache primarily optimizes:',
        options: [
          'Avoiding recomputation of Key and Value projections for all previously generated tokens at every step',
          'Reducing model disk checkpoint size',
          'Increasing temperature sampling randomness',
          'Eliminating tokenizer vocabulary size',
        ],
        correctIndex: 0,
        explanation:
          'Caching prior K and V tensors reduces per-token decoding attention work from O(T²) recomputation to O(T) incremental lookup.',
      },
    ],
    codingChallenge: {
      id: 'rag-code-rrf',
      title: 'Implement Reciprocal Rank Fusion (RRF)',
      prompt:
        'Write `rrf_fuse(rankings, k=60)` that takes a list of ranked document-ID lists (e.g. `[["d1", "d2"], ["d2", "d3"]]`) and returns document IDs sorted descending by total `1 / (k + rank)` where `rank` is 1-indexed.',
      starterCode: `def rrf_fuse(rankings, k=60):
    # rankings: list of lists of doc_ids (most relevant first, 1-indexed rank)
    # Return list of doc_ids sorted by descending RRF score
    pass
`,
      testHarness: `
res = rrf_fuse([["d1", "d2", "d3"], ["d2", "d1", "d4"]], k=60)
assert res[0] in ("d1", "d2") and set(res[:2]) == {"d1", "d2"}, f"Test 1 failed: {res}"
res2 = rrf_fuse([["a", "b"], ["c", "a"], ["a", "d"]], k=60)
assert res2[0] == "a", f"Test 2 failed: expected 'a' first, got {res2}"
assert rrf_fuse([], k=60) == [], "Test 3 failed: empty input"
print("ALL_TESTS_PASSED:3/3")
`,
      testCount: 3,
      sampleSolution: `def rrf_fuse(rankings, k=60):
    scores = {}
    for ranked_list in rankings:
        for idx, doc_id in enumerate(ranked_list, start=1):
            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + idx)
    return [doc for doc, _ in sorted(scores.items(), key=lambda x: (-x[1], x[0]))]
`,
    },
  },
  {
    id: 'dsa-round',
    title: 'DSA & Algorithmic Coding Round',
    roleBadge: 'Algorithms + Complexity',
    durationMinutes: 25,
    description:
      'Interview-grade problem solving: Big-O bounds, graph shortest paths, DP recurrence, and a live O(N) Python coding challenge.',
    accentColor: 'from-violet-600 to-fuchsia-600',
    mcqs: [
      {
        id: 'dsa-i-1',
        topic: 'Graph Algorithms',
        question: 'Which shortest-path algorithm fails when edges have negative weights?',
        options: [
          'Bellman-Ford Algorithm',
          'Dijkstra’s Algorithm with a Min-Heap',
          'Floyd-Warshall (without negative cycles)',
          'Topological relaxation on a DAG',
        ],
        correctIndex: 1,
        explanation:
          'Dijkstra greedily finalizes the closest unvisited node assuming future edges cannot decrease distance, which breaks with negative edge weights.',
      },
      {
        id: 'dsa-i-2',
        topic: 'Heap Construction',
        question: 'What is the tightest worst-case time complexity to build a binary heap from an unsorted array of N elements using bottom-up heapify?',
        options: ['O(N log N)', 'O(N)', 'O(log N)', 'O(N²)'],
        correctIndex: 1,
        explanation:
          'Bottom-up Floyd’s heap construction takes O(N) time because most nodes are near the leaves and sift down only a few levels.',
      },
      {
        id: 'dsa-i-3',
        topic: 'Dynamic Programming',
        question: 'In 0/1 Knapsack with N items and capacity W, space optimization reduces the DP table from O(NW) down to:',
        options: ['O(N)', 'O(W) by iterating capacity backwards', 'O(1)', 'O(N log W)'],
        correctIndex: 1,
        explanation:
          'Using a 1D array of size W+1 and iterating capacity w from W down to weight[i] prevents reusing the same item multiple times.',
      },
      {
        id: 'dsa-i-4',
        topic: 'Trees & Traversal',
        question: 'Which traversal of a Binary Search Tree yields keys in non-decreasing sorted order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order BFS'],
        correctIndex: 1,
        explanation:
          'In-order traversal visits Left subtree → Root → Right subtree, producing elements in ascending sorted order for any valid BST.',
      },
    ],
    codingChallenge: {
      id: 'dsa-code-maxsub',
      title: 'Maximum Subarray Sum (Kadane’s Algorithm)',
      prompt:
        'Implement `max_subarray(nums)` in O(N) time and O(1) space returning the largest contiguous subarray sum for a non-empty integer list (handles all-negative lists too).',
      starterCode: `def max_subarray(nums):
    # Return the maximum sum of any contiguous non-empty subarray
    pass
`,
      testHarness: `
assert max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6, "Test 1 failed"
assert max_subarray([1]) == 1, "Test 2 failed"
assert max_subarray([-5, -2, -9]) == -2, "Test 3 failed: all negative"
assert max_subarray([5, 4, -1, 7, 8]) == 23, "Test 4 failed"
print("ALL_TESTS_PASSED:4/4")
`,
      testCount: 4,
      sampleSolution: `def max_subarray(nums):
    best = cur = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best
`,
    },
  },
  {
    id: 'python-backend',
    title: 'Python Internals & Backend Round',
    roleBadge: 'CPython + Data Structures',
    durationMinutes: 20,
    description:
      'Evaluates Python fluency: mutable default arguments, GIL behavior, generators, hashing, and clean data transformation.',
    accentColor: 'from-emerald-600 to-cyan-600',
    mcqs: [
      {
        id: 'py-i-1',
        topic: 'Mutable Defaults Trap',
        question: 'Why is `def add_item(x, items=[]):` considered a bug in Python?',
        options: [
          'Lists cannot be passed as keyword arguments.',
          'Default argument objects are evaluated once at function definition time and shared across calls.',
          'Python raises a SyntaxError on empty list defaults.',
          'It triggers O(N²) garbage collection.',
        ],
        correctIndex: 1,
        explanation:
          'Default values are bound once when `def` executes. Use `items=None` and initialize `items = []` inside the function body.',
      },
      {
        id: 'py-i-2',
        topic: 'Generators & Memory',
        question: 'How does `(x * x for x in range(10**7))` differ from `[x * x for x in range(10**7)]`?',
        options: [
          'The generator expression yields values lazily in O(1) memory instead of materializing 10M integers.',
          'The list comprehension is strictly slower to index.',
          'Generators run in parallel across multiple CPU cores automatically.',
          'There is no difference in memory allocation.',
        ],
        correctIndex: 0,
        explanation:
          'Generator expressions compute one item on demand via `__next__()`, avoiding allocating the entire sequence in RAM.',
      },
      {
        id: 'py-i-3',
        topic: 'CPython Concurrency',
        question: 'For CPU-bound pure Python numerical loops, which standard library module bypasses the Global Interpreter Lock (GIL)?',
        options: ['threading', 'multiprocessing', 'asyncio', 'contextlib'],
        correctIndex: 1,
        explanation:
          '`multiprocessing` spawns separate OS processes with independent Python interpreters and GILs, achieving true multi-core CPU parallelism.',
      },
      {
        id: 'py-i-4',
        topic: 'Hashability',
        question: 'Which of the following Python objects CANNOT be used as a `dict` key?',
        options: [
          '(1, "a")',
          'frozenset({1, 2})',
          '[1, 2]',
          '"feature_x"',
        ],
        correctIndex: 2,
        explanation:
          'Lists are mutable and unhashable (`__hash__ = None`), so they raise `TypeError: unhashable type: \'list\'` when used as dict keys.',
      },
    ],
    codingChallenge: {
      id: 'py-code-lru',
      title: 'Order-Preserving Deduplication',
      prompt:
        'Implement `dedupe_preserve_order(items)` in O(N) time that removes duplicate elements while preserving their first-seen order.',
      starterCode: `def dedupe_preserve_order(items):
    # Return a new list without duplicates, keeping original first-appearance order
    pass
`,
      testHarness: `
assert dedupe_preserve_order([3, 1, 2, 1, 3, 4]) == [3, 1, 2, 4], "Test 1 failed"
assert dedupe_preserve_order([]) == [], "Test 2 failed"
assert dedupe_preserve_order(["ml", "ai", "ml", "rag"]) == ["ml", "ai", "rag"], "Test 3 failed"
print("ALL_TESTS_PASSED:3/3")
`,
      testCount: 3,
      sampleSolution: `def dedupe_preserve_order(items):
    seen = set()
    out = []
    for item in items:
        if item not in seen:
            seen.add(item)
            out.append(item)
    return out
`,
    },
  },
];
