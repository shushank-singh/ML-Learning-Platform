export type InterviewDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type InterviewDifficultyFilter = InterviewDifficulty | 'Mixed';
export type InterviewTrackId =
  | 'ml-engineer'
  | 'genai-rag'
  | 'dsa-round'
  | 'python-backend'
  | 'mixed';

export interface InterviewMCQ {
  id: string;
  topic: string;
  difficulty: InterviewDifficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source?: 'curated' | 'revision' | 'procedural' | 'ai';
}

export interface InterviewCodingChallenge {
  id: string;
  title: string;
  difficulty: InterviewDifficulty;
  trackId?: Exclude<InterviewTrackId, 'mixed'>;
  prompt: string;
  starterCode: string;
  testHarness: string;
  testCount: number;
  sampleSolution: string;
  source?: 'curated' | 'ai';
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
  codingChallenges?: InterviewCodingChallenge[];
  roundDifficulty?: InterviewDifficultyFilter;
  sourceBreakdown?: {
    ai: number;
    procedural: number;
    bank: number;
  };
}

export const TRACK_METADATA: Record<
  InterviewTrackId,
  {
    title: string;
    roleBadge: string;
    description: string;
    accentColor: string;
  }
> = {
  'ml-engineer': {
    title: 'Machine Learning Engineer Round',
    roleBadge: 'Core ML + Math + NumPy',
    description:
      'bias-variance diagnostics, evaluation metrics, regularization, optimization, and live NumPy vectorization.',
    accentColor: 'from-indigo-600 to-violet-600',
  },
  'genai-rag': {
    title: 'GenAI, LLM & RAG Systems Round',
    roleBadge: 'Transformers + RAG + Agents',
    description:
      'Production LLM engineering: attention scaling, KV cache memory, LoRA rank trade-offs, chunking, and Hybrid RRF.',
    accentColor: 'from-teal-600 to-emerald-600',
  },
  'dsa-round': {
    title: 'DSA & Algorithmic Coding Round',
    roleBadge: 'Algorithms + Complexity',
    description:
      'Big-O bounds, graph shortest paths, dynamic programming, sliding windows, and live Python coding challenges.',
    accentColor: 'from-violet-600 to-fuchsia-600',
  },
  'python-backend': {
    title: 'Python Internals & Backend Round',
    roleBadge: 'CPython + Data Structures',
    description:
      'Mutable default traps, GIL behavior, generators, hashing, slicing semantics, and clean Python problem solving.',
    accentColor: 'from-emerald-600 to-cyan-600',
  },
  mixed: {
    title: 'Full-Stack AI & Engineering Loop',
    roleBadge: 'ML + GenAI + DSA + Python',
    description:
      'Comprehensive FAANG-style technical loop drawing across Machine Learning, GenAI/RAG, Algorithms, and Python internals.',
    accentColor: 'from-amber-500 to-rose-600',
  },
};

export const CODING_CHALLENGES_BANK: Array<
  InterviewCodingChallenge & { trackId: Exclude<InterviewTrackId, 'mixed'> }
> = [
  // ================= ML ENGINEER =================
  {
    id: 'ml-code-mse',
    trackId: 'ml-engineer',
    difficulty: 'Beginner',
    title: 'Compute Root Mean Squared Error (RMSE)',
    prompt:
      'Write `compute_rmse(y_true, y_pred)` in NumPy returning the Root Mean Squared Error `sqrt(mean((y_true - y_pred)^2))` as a Python `float`.',
    starterCode: `import numpy as np

def compute_rmse(y_true, y_pred):
    y_true = np.asarray(y_true, dtype=float)
    y_pred = np.asarray(y_pred, dtype=float)
    # TODO: return RMSE as float
    pass
`,
    testHarness: `
assert abs(compute_rmse([3, -0.5, 2, 7], [2.5, 0.0, 2, 8]) - 0.6123724356957945) < 1e-6, "Test 1 failed"
assert compute_rmse([1, 2, 3], [1, 2, 3]) == 0.0, "Test 2 failed: zero error"
assert abs(compute_rmse([0, 0], [3, 4]) - np.sqrt(12.5)) < 1e-6, "Test 3 failed"
print("ALL_TESTS_PASSED:3/3")
`,
    testCount: 3,
    sampleSolution: `import numpy as np

def compute_rmse(y_true, y_pred):
    y_true = np.asarray(y_true, dtype=float)
    y_pred = np.asarray(y_pred, dtype=float)
    return float(np.sqrt(np.mean((y_true - y_pred) ** 2)))
`,
  },
  {
    id: 'ml-code-cosine',
    trackId: 'ml-engineer',
    difficulty: 'Intermediate',
    title: 'Implement Cosine Similarity in NumPy',
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
  {
    id: 'ml-code-softmax',
    trackId: 'ml-engineer',
    difficulty: 'Advanced',
    title: 'Numerically Stable Softmax',
    prompt:
      'Implement `stable_softmax(logits)` using NumPy with the max-subtraction trick so large logits (like `[1000, 1001, 999]`) do not overflow to `NaN`. Return a Python list or 1D NumPy array summing to `1.0`.',
    starterCode: `import numpy as np

def stable_softmax(logits):
    x = np.asarray(logits, dtype=float)
    # TODO: subtract max(x) before exponentiating
    pass
`,
    testHarness: `
p1 = np.asarray(stable_softmax([1000.0, 1001.0, 999.0]))
assert not np.isnan(p1).any(), "Test 1 failed: overflow produced NaN"
assert abs(p1.sum() - 1.0) < 1e-6, "Test 2 failed: probabilities must sum to 1"
assert p1[1] > p1[0] > p1[2], "Test 3 failed: ordering incorrect"
p2 = np.asarray(stable_softmax([2.0, 2.0]))
assert abs(p2[0] - 0.5) < 1e-6 and abs(p2[1] - 0.5) < 1e-6, "Test 4 failed: equal logits"
print("ALL_TESTS_PASSED:4/4")
`,
    testCount: 4,
    sampleSolution: `import numpy as np

def stable_softmax(logits):
    x = np.asarray(logits, dtype=float)
    shifted = x - np.max(x)
    exps = np.exp(shifted)
    return exps / np.sum(exps)
`,
  },
  {
    id: 'ml-code-f1',
    trackId: 'ml-engineer',
    difficulty: 'Beginner',
    title: 'Binary F1 Score From Predictions',
    prompt:
      'Write `binary_f1(y_true, y_pred)` computing the binary F1 score (`2 * precision * recall / (precision + recall)`) for labels `0` and `1`. Return `0.0` if `2*TP + FP + FN == 0`.',
    starterCode: `def binary_f1(y_true, y_pred):
    # Compute TP, FP, FN and return F1 score as float
    pass
`,
    testHarness: `
assert abs(binary_f1([1, 0, 1, 1], [1, 1, 1, 0]) - (2/3)) < 1e-6, "Test 1 failed"
assert binary_f1([0, 0], [0, 0]) == 0.0, "Test 2 failed: zero positives"
assert binary_f1([1, 1], [1, 1]) == 1.0, "Test 3 failed: perfect predictions"
print("ALL_TESTS_PASSED:3/3")
`,
    testCount: 3,
    sampleSolution: `def binary_f1(y_true, y_pred):
    tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 1)
    fp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 1)
    fn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 0)
    denom = 2 * tp + fp + fn
    return 0.0 if denom == 0 else (2.0 * tp) / denom
`,
  },

  // ================= GENAI / RAG =================
  {
    id: 'rag-code-chunker',
    trackId: 'genai-rag',
    difficulty: 'Beginner',
    title: 'Sliding-Window Text Chunker',
    prompt:
      'Write `chunk_words(text, chunk_size, overlap)` that splits whitespace-delimited words into chunks of at most `chunk_size` words, advancing by `chunk_size - overlap` words each step (`overlap < chunk_size`). Join each chunk with `" "`.',
    starterCode: `def chunk_words(text, chunk_size, overlap):
    # Split text into words and return list of chunk strings
    pass
`,
    testHarness: `
chunks = chunk_words("a b c d e f", chunk_size=3, overlap=1)
assert chunks == ["a b c", "c d e", "e f"], f"Test 1 failed: {chunks}"
assert chunk_words("", chunk_size=3, overlap=1) == [], "Test 2 failed: empty string"
assert chunk_words("hello world", chunk_size=5, overlap=1) == ["hello world"], "Test 3 failed: single short chunk"
print("ALL_TESTS_PASSED:3/3")
`,
    testCount: 3,
    sampleSolution: `def chunk_words(text, chunk_size, overlap):
    words = text.split()
    if not words:
        return []
    step = chunk_size - overlap
    chunks = []
    for i in range(0, len(words), step):
        part = words[i : i + chunk_size]
        chunks.append(" ".join(part))
        if i + chunk_size >= len(words):
            break
    return chunks
`,
  },
  {
    id: 'rag-code-rrf',
    trackId: 'genai-rag',
    difficulty: 'Intermediate',
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
  {
    id: 'rag-code-attention',
    trackId: 'genai-rag',
    difficulty: 'Advanced',
    title: 'Scaled Dot-Product Attention (Single Head)',
    prompt:
      'Implement `scaled_dot_attention(Q, K, V)` in NumPy for 2D arrays `Q (T_q, d_k)`, `K (T_k, d_k)`, `V (T_k, d_v)`. Compute `softmax((Q @ K.T) / sqrt(d_k)) @ V` with numerically stable row-wise softmax.',
    starterCode: `import numpy as np

def scaled_dot_attention(Q, K, V):
    Q = np.asarray(Q, dtype=float)
    K = np.asarray(K, dtype=float)
    V = np.asarray(V, dtype=float)
    # TODO: return attended output matrix of shape (T_q, d_v)
    pass
`,
    testHarness: `
Q = [[1.0, 0.0], [0.0, 1.0]]
K = [[1.0, 0.0], [0.0, 1.0]]
V = [[10.0, 0.0], [0.0, 20.0]]
out = np.asarray(scaled_dot_attention(Q, K, V))
assert out.shape == (2, 2), f"Test 1 failed: shape {out.shape}"
assert out[0, 0] > out[0, 1] and out[1, 1] > out[1, 0], "Test 2 failed: attention weights incorrect"
assert abs(out[0].sum() - (out[0, 0] + out[0, 1])) < 1e-6, "Test 3 failed"
print("ALL_TESTS_PASSED:3/3")
`,
    testCount: 3,
    sampleSolution: `import numpy as np

def scaled_dot_attention(Q, K, V):
    Q = np.asarray(Q, dtype=float)
    K = np.asarray(K, dtype=float)
    V = np.asarray(V, dtype=float)
    d_k = Q.shape[-1]
    scores = (Q @ K.T) / np.sqrt(d_k)
    scores = scores - np.max(scores, axis=-1, keepdims=True)
    weights = np.exp(scores)
    weights = weights / np.sum(weights, axis=-1, keepdims=True)
    return weights @ V
`,
  },

  // ================= DSA ROUND =================
  {
    id: 'dsa-code-twosum',
    trackId: 'dsa-round',
    difficulty: 'Beginner',
    title: 'Two Sum in O(N) Time',
    prompt:
      'Implement `two_sum(nums, target)` returning a 2-element list `[i, j]` (`i < j`) of indices such that `nums[i] + nums[j] == target`. Return `[]` if no pair exists.',
    starterCode: `def two_sum(nums, target):
    # Use a hash map for O(N) lookup
    pass
`,
    testHarness: `
assert two_sum([2, 7, 11, 15], 9) == [0, 1], "Test 1 failed"
assert two_sum([3, 2, 4], 6) == [1, 2], "Test 2 failed"
assert two_sum([3, 3], 6) == [0, 1], "Test 3 failed: duplicate values"
assert two_sum([1, 2, 3], 10) == [], "Test 4 failed: no solution"
print("ALL_TESTS_PASSED:4/4")
`,
    testCount: 4,
    sampleSolution: `def two_sum(nums, target):
    seen = {}
    for i, val in enumerate(nums):
        need = target - val
        if need in seen:
            return [seen[need], i]
        seen[val] = i
    return []
`,
  },
  {
    id: 'dsa-code-maxsub',
    trackId: 'dsa-round',
    difficulty: 'Intermediate',
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
  {
    id: 'dsa-code-intervals',
    trackId: 'dsa-round',
    difficulty: 'Advanced',
    title: 'Merge Overlapping Intervals',
    prompt:
      'Implement `merge_intervals(intervals)` taking a list of `[start, end]` pairs (unsorted) and returning merged disjoint intervals sorted by start time.',
    starterCode: `def merge_intervals(intervals):
    # Sort by start and merge overlapping [s, e] ranges
    pass
`,
    testHarness: `
assert merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]]) == [[1, 6], [8, 10], [15, 18]], "Test 1 failed"
assert merge_intervals([[1, 4], [4, 5]]) == [[1, 5]], "Test 2 failed: touching edges"
assert merge_intervals([[6, 8], [1, 9], [2, 4]]) == [[1, 9]], "Test 3 failed: nested"
assert merge_intervals([]) == [], "Test 4 failed: empty"
print("ALL_TESTS_PASSED:4/4")
`,
    testCount: 4,
    sampleSolution: `def merge_intervals(intervals):
    if not intervals:
        return []
    ordered = sorted(intervals, key=lambda x: x[0])
    merged = [list(ordered[0])]
    for start, end in ordered[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
`,
  },

  // ================= PYTHON BACKEND =================
  {
    id: 'py-code-wordfreq',
    trackId: 'python-backend',
    difficulty: 'Beginner',
    title: 'Top-K Word Frequencies',
    prompt:
      'Write `top_k_words(text, k)` returning the `k` most frequent lowercase words from whitespace-separated `text`, breaking frequency ties alphabetically.',
    starterCode: `def top_k_words(text, k):
    # Count case-insensitive word frequencies and return top k words
    pass
`,
    testHarness: `
assert top_k_words("ai ml AI python ml ai", 2) == ["ai", "ml"], "Test 1 failed"
assert top_k_words("cat dog bird", 2) == ["bird", "cat"], "Test 2 failed: alphabetical tie-break"
assert top_k_words("", 3) == [], "Test 3 failed: empty text"
print("ALL_TESTS_PASSED:3/3")
`,
    testCount: 3,
    sampleSolution: `from collections import Counter

def top_k_words(text, k):
    words = text.lower().split()
    if not words or k <= 0:
        return []
    counts = Counter(words)
    return [w for w, _ in sorted(counts.items(), key=lambda x: (-x[1], x[0]))[:k]]
`,
  },
  {
    id: 'py-code-dedupe',
    trackId: 'python-backend',
    difficulty: 'Intermediate',
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
  {
    id: 'py-code-lru',
    trackId: 'python-backend',
    difficulty: 'Advanced',
    title: 'Implement an O(1) LRU Cache Class',
    prompt:
      'Implement `LRUCache(capacity)` with `get(key)` (returns value or `-1`, marking key as recently used) and `put(key, value)` (inserts/updates and evicts least recently used key when over capacity).',
    starterCode: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        pass

    def put(self, key: int, value: int) -> None:
        pass
`,
    testHarness: `
cache = LRUCache(2)
cache.put(1, 10)
cache.put(2, 20)
assert cache.get(1) == 10, "Test 1 failed"
cache.put(3, 30)  # evicts key 2
assert cache.get(2) == -1, "Test 2 failed: LRU key 2 should be evicted"
cache.put(1, 100)  # updates key 1
cache.put(4, 40)  # evicts key 3
assert cache.get(3) == -1 and cache.get(1) == 100 and cache.get(4) == 40, "Test 3 failed"
print("ALL_TESTS_PASSED:3/3")
`,
    testCount: 3,
    sampleSolution: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.od = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.od:
            return -1
        self.od.move_to_end(key)
        return self.od[key]

    def put(self, key: int, value: int) -> None:
        if key in self.od:
            self.od.move_to_end(key)
        self.od[key] = value
        if len(self.od) > self.cap:
            self.od.popitem(last=False)
`,
  },
];

export const MOCK_INTERVIEW_TRACKS: MockInterviewTrack[] = [
  {
    id: 'ml-engineer',
    ...TRACK_METADATA['ml-engineer'],
    durationMinutes: 20,
    mcqs: [
      {
        id: 'ml-i-1',
        topic: 'Regularization & Optimization',
        difficulty: 'Beginner',
        source: 'curated',
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
        difficulty: 'Intermediate',
        source: 'curated',
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
        difficulty: 'Intermediate',
        source: 'curated',
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
        difficulty: 'Advanced',
        source: 'curated',
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
    codingChallenge: CODING_CHALLENGES_BANK.find((c) => c.id === 'ml-code-cosine')!,
  },
  {
    id: 'genai-rag',
    ...TRACK_METADATA['genai-rag'],
    durationMinutes: 20,
    mcqs: [
      {
        id: 'genai-i-1',
        topic: 'Self-Attention Scaling',
        difficulty: 'Intermediate',
        source: 'curated',
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
        difficulty: 'Intermediate',
        source: 'curated',
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
        difficulty: 'Beginner',
        source: 'curated',
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
        difficulty: 'Advanced',
        source: 'curated',
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
    codingChallenge: CODING_CHALLENGES_BANK.find((c) => c.id === 'rag-code-rrf')!,
  },
  {
    id: 'dsa-round',
    ...TRACK_METADATA['dsa-round'],
    durationMinutes: 25,
    mcqs: [
      {
        id: 'dsa-i-1',
        topic: 'Graph Algorithms',
        difficulty: 'Intermediate',
        source: 'curated',
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
        difficulty: 'Advanced',
        source: 'curated',
        question: 'What is the tightest worst-case time complexity to build a binary heap from an unsorted array of N elements using bottom-up heapify?',
        options: ['O(N log N)', 'O(N)', 'O(log N)', 'O(N²)'],
        correctIndex: 1,
        explanation:
          'Bottom-up Floyd’s heap construction takes O(N) time because most nodes are near the leaves and sift down only a few levels.',
      },
      {
        id: 'dsa-i-3',
        topic: 'Dynamic Programming',
        difficulty: 'Advanced',
        source: 'curated',
        question: 'In 0/1 Knapsack with N items and capacity W, space optimization reduces the DP table from O(NW) down to:',
        options: ['O(N)', 'O(W) by iterating capacity backwards', 'O(1)', 'O(N log W)'],
        correctIndex: 1,
        explanation:
          'Using a 1D array of size W+1 and iterating capacity w from W down to weight[i] prevents reusing the same item multiple times.',
      },
      {
        id: 'dsa-i-4',
        topic: 'Trees & Traversal',
        difficulty: 'Beginner',
        source: 'curated',
        question: 'Which traversal of a Binary Search Tree yields keys in non-decreasing sorted order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order BFS'],
        correctIndex: 1,
        explanation:
          'In-order traversal visits Left subtree → Root → Right subtree, producing elements in ascending sorted order for any valid BST.',
      },
    ],
    codingChallenge: CODING_CHALLENGES_BANK.find((c) => c.id === 'dsa-code-maxsub')!,
  },
  {
    id: 'python-backend',
    ...TRACK_METADATA['python-backend'],
    durationMinutes: 20,
    mcqs: [
      {
        id: 'py-i-1',
        topic: 'Mutable Defaults Trap',
        difficulty: 'Beginner',
        source: 'curated',
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
        difficulty: 'Intermediate',
        source: 'curated',
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
        difficulty: 'Advanced',
        source: 'curated',
        question: 'For CPU-bound pure Python numerical loops, which standard library module bypasses the Global Interpreter Lock (GIL)?',
        options: ['threading', 'multiprocessing', 'asyncio', 'contextlib'],
        correctIndex: 1,
        explanation:
          '`multiprocessing` spawns separate OS processes with independent Python interpreters and GILs, achieving true multi-core CPU parallelism.',
      },
      {
        id: 'py-i-4',
        topic: 'Hashability',
        difficulty: 'Beginner',
        source: 'curated',
        question: 'Which of the following Python objects CANNOT be used as a `dict` key?',
        options: ['(1, "a")', 'frozenset({1, 2})', '[1, 2]', '"feature_x"'],
        correctIndex: 2,
        explanation:
          'Lists are mutable and unhashable (`__hash__ = None`), so they raise `TypeError: unhashable type: \'list\'` when used as dict keys.',
      },
    ],
    codingChallenge: CODING_CHALLENGES_BANK.find((c) => c.id === 'py-code-dedupe')!,
  },
];

// =========================================================================
// Procedural Infinite Question Generator
// Produces unique, parameterized interview questions on demand across tracks
// =========================================================================

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildShuffledQuestion(
  id: string,
  topic: string,
  difficulty: InterviewDifficulty,
  question: string,
  correctAnswer: string,
  wrongAnswers: string[],
  explanation: string
): InterviewMCQ {
  const uniqueWrong: string[] = [];
  for (const w of wrongAnswers) {
    if (w !== correctAnswer && !uniqueWrong.includes(w)) {
      uniqueWrong.push(w);
    }
  }
  while (uniqueWrong.length < 3) {
    uniqueWrong.push(`None of the above (${uniqueWrong.length + 1})`);
  }
  const pool = [correctAnswer, ...uniqueWrong.slice(0, 3)];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return {
    id,
    topic,
    difficulty,
    question,
    options: pool,
    correctIndex: pool.indexOf(correctAnswer),
    explanation,
    source: 'procedural',
  };
}

type ProceduralTemplate = {
  key: string;
  tracks: Array<Exclude<InterviewTrackId, 'mixed'>>;
  difficulties: InterviewDifficulty[];
  build: (id: string, difficulty: InterviewDifficulty) => InterviewMCQ;
};

const PROCEDURAL_TEMPLATES: ProceduralTemplate[] = [
  {
    key: 'dot-product',
    tracks: ['ml-engineer', 'genai-rag'],
    difficulties: ['Beginner', 'Intermediate'],
    build: (id, difficulty) => {
      const a1 = randInt(-4, 6);
      const a2 = randInt(-3, 5);
      const a3 = randInt(1, 5);
      const b1 = randInt(1, 5);
      const b2 = randInt(-4, 4);
      const b3 = randInt(-3, 5);
      const dot = a1 * b1 + a2 * b2 + a3 * b3;
      return buildShuffledQuestion(
        id,
        'Vector Math & Similarity',
        difficulty,
        `Given embedding vectors a = [${a1}, ${a2}, ${a3}] and b = [${b1}, ${b2}, ${b3}], what is their dot product (a · b)?`,
        `${dot}`,
        [`${dot + a1}`, `${dot - 2 * a2 + 3}`, `${a1 + b1 + a2 + b2 + a3 + b3}`],
        `Dot product sums element-wise products: (${a1}×${b1}) + (${a2}×${b2}) + (${a3}×${b3}) = ${a1 * b1} + ${a2 * b2} + ${a3 * b3} = ${dot}.`
      );
    },
  },
  {
    key: 'f1-confusion',
    tracks: ['ml-engineer'],
    difficulties: ['Beginner', 'Intermediate'],
    build: (id, difficulty) => {
      const k = randInt(2, 8);
      const tp = 3 * k;
      const fp = 1 * k;
      const fn = 2 * k;
      // Precision = 3/4 = 0.75, Recall = 3/5 = 0.60, F1 = 2*tp/(2*tp+fp+fn) = 6k / 9k = 2/3 ≈ 0.67
      const factor = randInt(1, 3);
      const adjTp = tp * factor;
      const adjFp = randInt(1, 3) * k;
      const adjFn = randInt(1, 3) * k;
      const prec = adjTp / (adjTp + adjFp);
      const rec = adjTp / (adjTp + adjFn);
      const f1 = ((2 * prec * rec) / (prec + rec)).toFixed(2);
      const f1Num = Number(f1);
      return buildShuffledQuestion(
        id,
        'Classification Metrics',
        difficulty,
        `A binary classifier evaluates a validation split and logs TP = ${adjTp}, FP = ${adjFp}, FN = ${adjFn}. What is its F1 score (rounded to 2 decimals)?`,
        f1,
        [
          (Math.min(0.99, prec)).toFixed(2),
          (Math.max(0.05, Math.abs(f1Num - 0.14))).toFixed(2),
          (Math.min(0.98, f1Num + 0.15)).toFixed(2),
        ],
        `Precision = TP/(TP+FP) = ${adjTp}/${adjTp + adjFp} = ${prec.toFixed(3)}, Recall = TP/(TP+FN) = ${adjTp}/${adjTp + adjFn} = ${rec.toFixed(3)}, so F1 = 2PR/(P+R) = ${f1}.`
      );
    },
  },
  {
    key: 'l2-penalty',
    tracks: ['ml-engineer'],
    difficulties: ['Intermediate', 'Advanced'],
    build: (id, difficulty) => {
      const w1 = randInt(1, 4);
      const w2 = randInt(-4, -1);
      const baseLoss = randInt(2, 9);
      const lam = [0.1, 0.5, 1.0, 2.0][randInt(0, 3)];
      const sqSum = w1 * w1 + w2 * w2;
      const total = (baseLoss + lam * sqSum).toFixed(1);
      const totalWrong1 = (baseLoss + lam * (Math.abs(w1) + Math.abs(w2))).toFixed(1);
      const totalWrong2 = (baseLoss + sqSum).toFixed(1);
      const totalWrong3 = Math.max(0.1, baseLoss - lam * sqSum).toFixed(1);
      return buildShuffledQuestion(
        id,
        'Ridge (L2) Regularization',
        difficulty,
        `For Ridge objective L = MSE + λ·Σw², suppose base MSE = ${baseLoss}, weights w = [${w1}, ${w2}], and penalty λ = ${lam}. What is the total regularized loss L?`,
        total,
        [totalWrong1, totalWrong2, totalWrong3],
        `Σw² = ${w1}² + (${w2})² = ${sqSum}. Regularized loss = ${baseLoss} + ${lam} × ${sqSum} = ${total}.`
      );
    },
  },
  {
    key: 'cnn-output-dim',
    tracks: ['ml-engineer'],
    difficulties: ['Advanced'],
    build: (id, difficulty) => {
      const S = [1, 2][randInt(0, 1)];
      const K = [3, 5][randInt(0, 1)];
      const P = [0, 1, 2][randInt(0, 2)];
      const outWanted = randInt(8, 24);
      const H = (outWanted - 1) * S - 2 * P + K;
      return buildShuffledQuestion(
        id,
        'Deep Learning Architecture Math',
        difficulty,
        `A 2D Convolution receives a square ${H}×${H} feature map with kernel size K = ${K}, padding P = ${P}, and stride S = ${S}. What is the spatial output width/height?`,
        `${outWanted}×${outWanted}`,
        [`${outWanted + 1}×${outWanted + 1}`, `${Math.max(2, outWanted - 2)}×${Math.max(2, outWanted - 2)}`, `${H - K}×${H - K}`],
        `Conv2D spatial formula: floor((H - K + 2P) / S) + 1 = (${H} - ${K} + ${2 * P}) / ${S} + 1 = ${outWanted}.`
      );
    },
  },
  {
    key: 'rag-chunk-count',
    tracks: ['genai-rag'],
    difficulties: ['Beginner', 'Intermediate'],
    build: (id, difficulty) => {
      const chunk = [200, 300, 400, 500][randInt(0, 3)];
      const overlap = [50, 100][randInt(0, 1)];
      const step = chunk - overlap;
      const chunksN = randInt(4, 9);
      const docTokens = chunk + (chunksN - 1) * step - randInt(0, Math.floor(step / 2));
      return buildShuffledQuestion(
        id,
        'RAG Chunking Mathematics',
        difficulty,
        `A document contains ${docTokens} tokens. You split it using fixed window size ${chunk} tokens with ${overlap} tokens of overlap (sliding step ${step}). How many chunks are produced?`,
        `${chunksN}`,
        [`${Math.max(1, chunksN - 1)}`, `${chunksN + 2}`, `${Math.ceil(docTokens / chunk)}`],
        `First chunk covers tokens 1..${chunk}; each additional step advances by ${step}. ceil((${docTokens} - ${chunk}) / ${step}) + 1 = ${chunksN} chunks.`
      );
    },
  },
  {
    key: 'lora-params',
    tracks: ['genai-rag'],
    difficulties: ['Intermediate', 'Advanced'],
    build: (id, difficulty) => {
      const d = [1024, 2048, 4096][randInt(0, 2)];
      const r = [4, 8, 16][randInt(0, 2)];
      const layers = [16, 24, 32][randInt(0, 2)];
      // Adapter on Q & V (2 matrices per layer), each matrix has 2*d*r trainable params
      const total = layers * 2 * (2 * d * r);
      const formatM = (n: number) =>
        n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M` : `${Math.round(n / 1000)}K`;
      const ans = formatM(total);
      return buildShuffledQuestion(
        id,
        'LoRA Parameter Budgeting',
        difficulty,
        `You attach LoRA adapters of rank r = ${r} to BOTH Q and V projection matrices (size ${d}×${d}) across ${layers} Transformer layers. Approximately how many trainable LoRA parameters are added?`,
        ans,
        [formatM(total / 2), formatM(total * 2), formatM(layers * 2 * d * d)],
        `Each ${d}×${d} matrix gets A(${r}×${d}) + B(${d}×${r}) = 2·d·r = ${(2 * d * r).toLocaleString()} params. Across 2 projections × ${layers} layers = ${total.toLocaleString()} (${ans}).`
      );
    },
  },
  {
    key: 'kv-cache-mem',
    tracks: ['genai-rag'],
    difficulties: ['Advanced'],
    build: (id, difficulty) => {
      const layers = [16, 32][randInt(0, 1)];
      const dModel = [2048, 4096][randInt(0, 1)];
      const seqLen = [1024, 2048, 4096][randInt(0, 2)];
      // FP16 = 2 bytes; 2 (K and V) * layers * dModel * seqLen * 2 bytes
      const totalBytes = 2 * layers * dModel * seqLen * 2;
      const mb = Math.round(totalBytes / (1024 * 1024));
      return buildShuffledQuestion(
        id,
        'LLM Inference Memory',
        difficulty,
        `Compute the FP16 (2 bytes/value) KV-cache memory for 1 request with context length ${seqLen}, ${layers} layers, and hidden size d_model = ${dModel} (MHA, no GQA).`,
        `${mb} MB`,
        [`${Math.round(mb / 2)} MB`, `${mb * 2} MB`, `${Math.round(mb / 4)} MB`],
        `KV cache stores 2 tensors (K & V) × ${layers} layers × ${seqLen} tokens × ${dModel} dims × 2 bytes = ${mb} MB per sequence.`
      );
    },
  },
  {
    key: 'bsearch-bound',
    tracks: ['dsa-round'],
    difficulties: ['Beginner', 'Intermediate'],
    build: (id, difficulty) => {
      const pow = randInt(12, 22);
      const n = Math.pow(2, pow);
      const formattedN = n.toLocaleString('en-US');
      return buildShuffledQuestion(
        id,
        'Binary Search Bounds',
        difficulty,
        `A sorted dataset has N = ${formattedN} (${`2^${pow}`}) records. What is the maximum number of midpoint comparisons binary search performs before confirming an element is absent?`,
        `${pow + 1} comparisons`,
        [`${Math.floor(pow / 2)} comparisons`, `${pow * 2} comparisons`, `${Math.round(Math.sqrt(n))} comparisons`],
        `Halving ${n} (${`2^${pow}`}) takes at most log₂(N) + 1 = ${pow + 1} steps.`
      );
    },
  },
  {
    key: 'complexity-recurrence',
    tracks: ['dsa-round'],
    difficulties: ['Intermediate', 'Advanced'],
    build: (id, difficulty) => {
      const cases = [
        {
          desc: 'outer loop runs i from 1 to N multiplying i by 2 each step (`i *= 2`), inner loop runs `j` from `0` to `N`',
          ans: 'O(N log N)',
          wrong: ['O(N²)', 'O(log N)', 'O(N)'],
          why: 'Outer loop executes log₂(N) times and inner loop performs N work each iteration → O(N log N).',
        },
        {
          desc: 'recursive function `f(n)` performs O(1) work and calls `f(n - 1)` TWICE',
          ans: 'O(2^N)',
          wrong: ['O(N log N)', 'O(N²)', 'O(log N)'],
          why: 'Branching factor 2 with depth N forms a binary recursion tree with ~2^N nodes.',
        },
        {
          desc: 'two pointers `left` starts at 0, `right` starts at N-1, moving inward monotonically inside one `while left < right` loop',
          ans: 'O(N)',
          wrong: ['O(N²)', 'O(N log N)', 'O(log N)'],
          why: 'Each iteration moves `left` right or `right` left by at least 1, capping total steps at N.',
        },
      ];
      const pick = cases[randInt(0, cases.length - 1)];
      return buildShuffledQuestion(
        id,
        'Time Complexity Analysis',
        difficulty,
        `An algorithm has the following structure: ${pick.desc}. What is its tightest worst-case time complexity?`,
        pick.ans,
        pick.wrong,
        pick.why
      );
    },
  },
  {
    key: 'python-slice-step',
    tracks: ['python-backend'],
    difficulties: ['Beginner', 'Intermediate'],
    build: (id, difficulty) => {
      const base = randInt(1, 3);
      const arr = Array.from({ length: 7 }, (_, i) => base + i * 2);
      const variants = [
        { expr: 'arr[1:5:2]', val: JSON.stringify(arr.filter((_, idx) => idx >= 1 && idx < 5 && (idx - 1) % 2 === 0)) },
        { expr: 'arr[::-2]', val: JSON.stringify([...arr].reverse().filter((_, idx) => idx % 2 === 0)) },
        { expr: 'arr[-4:-1]', val: JSON.stringify(arr.slice(arr.length - 4, arr.length - 1)) },
      ];
      const v = variants[randInt(0, variants.length - 1)];
      return buildShuffledQuestion(
        id,
        'Python Slicing Semantics',
        difficulty,
        `Given \`arr = ${JSON.stringify(arr)}\` in Python, what does \`${v.expr}\` evaluate to?`,
        v.val,
        [
          JSON.stringify(arr.slice(0, 3)),
          JSON.stringify([...arr].reverse().slice(0, 3)),
          JSON.stringify(arr.slice(2, 5)),
        ],
        `Python slicing \`[start:stop:step]\` is half-open on \`stop\`; evaluating \`${v.expr}\` on ${JSON.stringify(arr)} yields ${v.val}.`
      );
    },
  },
  {
    key: 'python-dict-alias',
    tracks: ['python-backend'],
    difficulties: ['Intermediate', 'Advanced'],
    build: (id, difficulty) => {
      const initA = randInt(2, 8);
      const addV = randInt(5, 12);
      const aPlus = initA + addV;
      return buildShuffledQuestion(
        id,
        'Object References & Aliasing',
        difficulty,
        `What is printed by:\n\`x = {"k": [${initA}]}; y = x.copy(); y["k"].append(${addV}); print(len(x["k"]), x["k"][-1])\``,
        `2 ${addV}`,
        [`1 ${initA}`, `2 ${aPlus}`, `1 ${addV}`],
        `\`dict.copy()\` creates a SHALLOW copy, so \`x["k"]\` and \`y["k"]\` still point to the exact same inner list object. Appending ${addV} mutates both, giving length 2 with last item ${addV}.`
      );
    },
  },
];

export function generateProceduralMCQs(
  trackId: InterviewTrackId,
  difficulty: InterviewDifficultyFilter,
  count: number
): InterviewMCQ[] {
  if (count <= 0) return [];
  const matchingTemplates = PROCEDURAL_TEMPLATES.filter((t) => {
    const trackOk = trackId === 'mixed' || t.tracks.includes(trackId as Exclude<InterviewTrackId, 'mixed'>);
    const diffOk =
      difficulty === 'Mixed' || t.difficulties.includes(difficulty as InterviewDifficulty);
    return trackOk && diffOk;
  });

  const fallbackTemplates =
    matchingTemplates.length > 0
      ? matchingTemplates
      : PROCEDURAL_TEMPLATES.filter(
          (t) => trackId === 'mixed' || t.tracks.includes(trackId as Exclude<InterviewTrackId, 'mixed'>)
        );

  const pool = fallbackTemplates.length > 0 ? fallbackTemplates : PROCEDURAL_TEMPLATES;
  const nonce = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const results: InterviewMCQ[] = [];

  for (let i = 0; i < count; i++) {
    const tpl = pool[i % pool.length];
    const diff: InterviewDifficulty =
      difficulty === 'Mixed'
        ? tpl.difficulties[i % tpl.difficulties.length]
        : difficulty;
    results.push(tpl.build(`proc-${tpl.key}-${nonce}-${i}`, diff));
  }

  return results;
}
