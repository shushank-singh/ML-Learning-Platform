// Auto-generated lightweight curriculum track metadata
// Allows dashboard and homepage to render track metrics without importing heavy lesson bodies

export interface TrackMetadataEntry {
  modulesCount: number;
  lessonIds: readonly string[];
}

export interface LessonResumeLookup {
  title: string;
  moduleId: string;
  trackId: string;
  trackTitle: string;
  route: string;
}

export const TRACK_METADATA = {
  "mlCore": {
    "modulesCount": 12,
    "lessonIds": [
      "ai-ml-dl-foundations",
      "ml-types-paradigms",
      "regression-vs-classification",
      "features-parameters-hyperparameters",
      "train-val-test-splits",
      "batch-vs-online-learning",
      "ml-workflow-problem-formulation",
      "scalars-vectors-matrices-tensors",
      "vector-operations-dot-products",
      "matrix-inverse-rank-determinants",
      "eigenvalues-eigenvectors",
      "singular-value-decomposition",
      "derivatives-chain-rule",
      "gradients-jacobian-hessian",
      "gradient-descent-optimization",
      "convexity-optimization",
      "probability-bayes-theorem",
      "probability-distributions",
      "expectation-variance-covariance",
      "sampling-central-limit-theorem",
      "mle-map-estimation",
      "entropy-cross-entropy-kl-divergence",
      "eda-inspection",
      "missing-values-duplicates",
      "outlier-detection-treatment",
      "categorical-encoding",
      "feature-scaling-normalization",
      "train-val-test-splitting",
      "data-leakage-prevention",
      "feature-selection-extraction",
      "polynomial-features",
      "datetime-text-features",
      "imbalanced-datasets-smote",
      "columntransformer-pipelines",
      "cross-validation-foundations",
      "linear-regression",
      "multiple-linear-regression",
      "regression-metrics",
      "residual-analysis-assumptions",
      "multicollinearity-vif",
      "polynomial-regression",
      "ridge-regression",
      "lasso-regression",
      "elastic-net",
      "bias-variance-tradeoff",
      "logistic-regression",
      "log-loss-cross-entropy",
      "multiclass-softmax",
      "k-nearest-neighbors",
      "decision-trees",
      "gini-entropy-information-gain",
      "naive-bayes",
      "support-vector-machines",
      "svm-kernel-trick",
      "probability-calibration",
      "confusion-matrix-metrics",
      "f1-score-fbeta",
      "roc-auc-curve",
      "precision-recall-curve",
      "hyperparameter-tuning",
      "learning-validation-curves",
      "threshold-tuning-cost-matrix",
      "ensemble-foundations",
      "bagging-bootstrap-aggregating",
      "random-forests",
      "boosting-fundamentals",
      "adaboost",
      "gradient-boosting",
      "xgboost-lightgbm-catboost",
      "voting-stacking-blending",
      "feature-importance-shap",
      "clustering-foundations",
      "k-means-clustering",
      "choosing-k-clustering-metrics",
      "hierarchical-clustering",
      "dbscan-clustering",
      "gaussian-mixture-models",
      "pca-principal-component-analysis",
      "tsne-umap",
      "anomaly-detection",
      "advanced-feature-selection",
      "explainable-ai-shap-lime",
      "cost-sensitive-learning",
      "fairness-bias-ethics",
      "data-and-concept-drift",
      "time-series-machine-learning",
      "perceptron-mcp",
      "multilayer-perceptron-ann",
      "activation-functions",
      "backpropagation-derivation",
      "neural-loss-functions",
      "optimization-algorithms",
      "regularization-in-deep-learning",
      "vanishing-exploding-gradients",
      "pytorch-fundamentals",
      "pytorch-training-loop",
      "model-serialization-serving",
      "production-fastapi-service",
      "docker-containerization-ml",
      "model-versioning-mlflow",
      "monitoring-data-drift-evidently",
      "cicd-for-machine-learning",
      "project-house-price-prediction",
      "project-customer-churn",
      "project-credit-risk",
      "project-customer-sentiment",
      "project-prediction-api"
    ]
  },
  "deepLearning": {
    "modulesCount": 6,
    "lessonIds": [
      "dl-01-intro",
      "dl-02-neuron-fundamentals",
      "dl-03-activations",
      "dl-04-loss-functions",
      "dl-05-forward-propagation",
      "dl-06-calculus-gradients",
      "dl-07-backpropagation",
      "dl-08-optimizers",
      "dl-09-training-loop",
      "dl-10-regularization",
      "dl-11-initialization-normalization",
      "dl-12-hyperparameter-tuning",
      "dl-13-pytorch-fundamentals",
      "dl-14-neural-net-from-scratch",
      "dl-15-first-dl-project",
      "dl-16-convolutional-neural-networks",
      "dl-17-transfer-learning",
      "dl-18-sequence-learning",
      "dl-19-attention-fundamentals",
      "dl-20-deep-learning-evaluation",
      "dl-21-deployment",
      "dl-22-deep-learning-capstone"
    ]
  },
  "transformers": {
    "modulesCount": 15,
    "lessonIds": [
      "tf-01-why-transformers",
      "tf-02-tokenization-and-token-ids",
      "tf-03-embeddings-latent-space",
      "tf-04-positional-encoding",
      "tf-05-query-key-value",
      "tf-06-scaled-dot-product-attention",
      "tf-07-attention-masks-causal",
      "tf-08-multi-head-attention",
      "tf-09-residual-layer-norm",
      "tf-10-feed-forward-networks",
      "tf-11-encoder-decoder-architectures",
      "tf-12-autoregressive-generation-kv-cache",
      "tf-13-pytorch-transformer-block",
      "tf-14-attention-weights-limitations",
      "tf-15-transformer-mini-project"
    ]
  },
  "genai": {
    "modulesCount": 15,
    "lessonIds": [
      "genai-01-foundations",
      "genai-02-how-llms-work",
      "genai-03-tokenization-in-llms",
      "genai-04-embeddings-representations",
      "genai-05-pretraining-dynamics",
      "genai-06-inference-and-decoding",
      "genai-07-prompt-engineering",
      "genai-08-context-windows-memory",
      "genai-09-supervised-fine-tuning",
      "genai-10-peft-lora-qlora",
      "genai-11-quantization-optimization",
      "genai-12-open-vs-hosted-models",
      "genai-13-llm-evaluation",
      "genai-14-safety-and-reliability",
      "genai-15-llm-capstone"
    ]
  },
  "rag": {
    "modulesCount": 15,
    "lessonIds": [
      "rag-01-fundamentals",
      "rag-02-document-ingestion",
      "rag-03-chunking-strategies",
      "rag-04-embeddings-semantic-search",
      "rag-05-vector-search-fundamentals",
      "rag-06-vector-databases-indexing",
      "rag-07-retrieval-quality-metrics",
      "rag-08-hybrid-retrieval-rrf",
      "rag-09-reranking-query-transform",
      "rag-10-grounded-context-assembly",
      "rag-11-rag-generation-groundedness",
      "rag-12-advanced-rag-patterns",
      "rag-13-rag-evaluation-ragas",
      "rag-14-rag-security-production",
      "rag-15-production-rag-capstone"
    ]
  },
  "agents": {
    "modulesCount": 15,
    "lessonIds": [
      "agent-01-fundamentals",
      "agent-02-architecture",
      "agent-03-tool-calling",
      "agent-04-state-memory",
      "agent-05-planning",
      "agent-06-orchestration",
      "agent-07-rag-agents",
      "agent-08-multi-agent",
      "agent-09-human-in-the-loop",
      "agent-10-evaluation",
      "agent-11-safety-security",
      "agent-12-observability",
      "agent-13-advanced-patterns",
      "agent-14-production-agent",
      "agent-15-capstone"
    ]
  },
  "mlops": {
    "modulesCount": 15,
    "lessonIds": [
      "mlops-01-fundamentals",
      "mlops-02-experiment-tracking",
      "mlops-03-data-model-versioning",
      "mlops-04-pipelines-automation",
      "mlops-05-packaging-environments",
      "mlops-06-serving-apis",
      "mlops-07-cicd-ml",
      "mlops-08-registry-releases",
      "mlops-09-monitoring-drift",
      "mlops-10-llmops-fundamentals",
      "mlops-11-llm-eval-testing",
      "mlops-12-observability-tracing",
      "mlops-13-cost-reliability-performance",
      "mlops-14-governance-security",
      "mlops-15-production-capstone"
    ]
  },
  "deployment": {
    "modulesCount": 15,
    "lessonIds": [
      "deploy-01-fundamentals",
      "deploy-02-linux-servers",
      "deploy-03-networking-http-dns",
      "deploy-04-docker-ai",
      "deploy-05-production-apis",
      "deploy-06-cloud-computing",
      "deploy-07-deploying-ai-apps",
      "deploy-08-storage-artifacts",
      "deploy-09-scaling-load-balancing",
      "deploy-10-background-async-jobs",
      "deploy-11-gpu-dl-serving",
      "deploy-12-production-llm-serving",
      "deploy-13-security-reliability",
      "deploy-14-observability-costs",
      "deploy-15-capstone-deployment"
    ]
  },
  "numpy": {
    "modulesCount": 7,
    "lessonIds": [
      "numpy-m1-l1",
      "numpy-m1-l2",
      "numpy-m1-l3",
      "numpy-m1-l4",
      "numpy-m1-l5",
      "numpy-m1-l6",
      "numpy-m1-l7",
      "numpy-m1-l8",
      "numpy-m1-l9",
      "numpy-m1-l10",
      "numpy-m1-l11",
      "numpy-m1-l12",
      "numpy-m2-l1",
      "numpy-m2-l2",
      "numpy-m2-l3",
      "numpy-m2-l4",
      "numpy-m2-l5",
      "numpy-m2-l6",
      "numpy-m2-l7",
      "numpy-m2-l8",
      "numpy-m2-l9",
      "numpy-m2-l10",
      "numpy-m2-l11",
      "numpy-m2-l12",
      "numpy-m3-l1",
      "numpy-m3-l2",
      "numpy-m3-l3",
      "numpy-m3-l4",
      "numpy-m3-l5",
      "numpy-m3-l6",
      "numpy-m3-l7",
      "numpy-m3-l8",
      "numpy-m3-l9",
      "numpy-m3-l10",
      "numpy-m3-l11",
      "numpy-m3-l12",
      "numpy-m3-l13",
      "numpy-m4-l1",
      "numpy-m4-l2",
      "numpy-m4-l3",
      "numpy-m4-l4",
      "numpy-m4-l5",
      "numpy-m4-l6",
      "numpy-m4-l7",
      "numpy-m4-l8",
      "numpy-m4-l9",
      "numpy-m4-l10",
      "numpy-m4-l11",
      "numpy-m5-l1",
      "numpy-m5-l2",
      "numpy-m5-l3",
      "numpy-m5-l4",
      "numpy-m5-l5",
      "numpy-m5-l6",
      "numpy-m5-l7",
      "numpy-m5-l8",
      "numpy-m5-l9",
      "numpy-m5-l10",
      "numpy-m5-l11",
      "numpy-m5-l12",
      "numpy-m6-l1",
      "numpy-m6-l2",
      "numpy-m6-l3",
      "numpy-m6-l4",
      "numpy-m6-l5",
      "numpy-m6-l6",
      "numpy-m6-l7",
      "numpy-m6-l8",
      "numpy-m6-l9",
      "numpy-m6-l10",
      "numpy-fp-student-analytics"
    ]
  },
  "pandas": {
    "modulesCount": 10,
    "lessonIds": [
      "pandas-m1-l1",
      "pandas-m1-l2",
      "pandas-m1-l3",
      "pandas-m1-l4",
      "pandas-m1-l5",
      "pandas-m1-l6",
      "pandas-m1-l7",
      "pandas-m1-l8",
      "pandas-m1-l9",
      "pandas-m1-l10",
      "pandas-m1-l11",
      "pandas-m1-l12",
      "pandas-m2-l1",
      "pandas-m2-l2",
      "pandas-m2-l3",
      "pandas-m2-l4",
      "pandas-m2-l5",
      "pandas-m2-l6",
      "pandas-m2-l7",
      "pandas-m2-l8",
      "pandas-m2-l9",
      "pandas-m2-l10",
      "pandas-m2-l11",
      "pandas-m2-l12",
      "pandas-m2-l13",
      "pandas-m2-l14",
      "pandas-m2-l15",
      "pandas-m3-l1",
      "pandas-m3-l2",
      "pandas-m3-l3",
      "pandas-m3-l4",
      "pandas-m3-l5",
      "pandas-m3-l6",
      "pandas-m3-l7",
      "pandas-m3-l8",
      "pandas-m3-l9",
      "pandas-m3-l10",
      "pandas-m3-l11",
      "pandas-m3-l12",
      "pandas-m3-l13",
      "pandas-m3-l14",
      "pandas-m4-l1",
      "pandas-m4-l2",
      "pandas-m4-l3",
      "pandas-m4-l4",
      "pandas-m4-l5",
      "pandas-m4-l6",
      "pandas-m4-l7",
      "pandas-m4-l8",
      "pandas-m4-l9",
      "pandas-m4-l10",
      "pandas-m4-l11",
      "pandas-m5-l1",
      "pandas-m5-l2",
      "pandas-m5-l3",
      "pandas-m5-l4",
      "pandas-m5-l5",
      "pandas-m5-l6",
      "pandas-m5-l7",
      "pandas-m5-l8",
      "pandas-m5-l9",
      "pandas-m5-l10",
      "pandas-m5-l11",
      "pandas-m5-l12",
      "pandas-m6-l1",
      "pandas-m6-l2",
      "pandas-m6-l3",
      "pandas-m6-l4",
      "pandas-m6-l5",
      "pandas-m6-l6",
      "pandas-m6-l7",
      "pandas-m6-l8",
      "pandas-m6-l9",
      "pandas-m6-l10",
      "pandas-m6-l11",
      "pandas-m6-l12",
      "pandas-m6-l13",
      "pandas-m7-l1",
      "pandas-m7-l2",
      "pandas-m7-l3",
      "pandas-m7-l4",
      "pandas-m7-l5",
      "pandas-m7-l6",
      "pandas-m7-l7",
      "pandas-m7-l8",
      "pandas-m7-l9",
      "pandas-m7-l10",
      "pandas-m7-l11",
      "pandas-m7-l12",
      "pandas-m7-l13",
      "pandas-m7-l14",
      "pandas-m7-l15",
      "pandas-m8-l1",
      "pandas-m8-l2",
      "pandas-m8-l3",
      "pandas-m8-l4",
      "pandas-m8-l5",
      "pandas-m8-l6",
      "pandas-m8-l7",
      "pandas-m8-l8",
      "pandas-m8-l9",
      "pandas-m8-l10",
      "pandas-m8-l11",
      "pandas-m8-l12",
      "pandas-m8-l13",
      "pandas-m9-l1",
      "pandas-m9-l2",
      "pandas-m9-l3",
      "pandas-m9-l4",
      "pandas-m9-l5",
      "pandas-m9-l6",
      "pandas-m9-l7",
      "pandas-m9-l8",
      "pandas-m9-l9",
      "pandas-m9-l10",
      "pandas-m9-l11",
      "pandas-m9-l12",
      "pandas-m9-l13",
      "pandas-m9-l14",
      "pandas-m9-l15",
      "pandas-fp-l1"
    ]
  },
  "dsa": {
    "modulesCount": 12,
    "lessonIds": [
      "dsa-foundations-what-is-dsa",
      "dsa-foundations-time-complexity",
      "dsa-foundations-big-o",
      "dsa-foundations-cases",
      "dsa-foundations-recursion",
      "dsa-foundations-recurrence",
      "dsa-arrays-operations",
      "dsa-arrays-prefix-sums",
      "dsa-arrays-two-pointers",
      "dsa-arrays-sliding-window",
      "dsa-arrays-kadane",
      "dsa-arrays-binary-search",
      "dsa-arrays-binary-search-variations",
      "dsa-arrays-rotated",
      "dsa-arrays-matrix",
      "dsa-strings-operations",
      "dsa-strings-frequency",
      "dsa-strings-hash-tables",
      "dsa-strings-hash-maps-sets",
      "dsa-strings-anagram-palindrome",
      "dsa-strings-matching",
      "dsa-strings-kmp",
      "dsa-strings-trie",
      "dsa-ll-singly",
      "dsa-ll-doubly",
      "dsa-ll-circular",
      "dsa-ll-insert-delete",
      "dsa-ll-reversal",
      "dsa-ll-fast-slow",
      "dsa-ll-cycle-detection",
      "dsa-ll-merge-sorted",
      "dsa-ll-middle-intersection",
      "dsa-stack-operations",
      "dsa-queue-operations",
      "dsa-deque",
      "dsa-monotonic-stack",
      "dsa-balanced-parentheses",
      "dsa-next-greater-element",
      "dsa-min-stack",
      "dsa-expression-parsing",
      "dsa-recursion-trees-calls",
      "dsa-recursion-subsets",
      "dsa-recursion-permutations",
      "dsa-backtracking-n-queens",
      "dsa-backtracking-sudoku",
      "dsa-backtracking-maze",
      "dsa-backtracking-pruning",
      "dsa-sort-basic",
      "dsa-sort-merge",
      "dsa-sort-quick",
      "dsa-sort-heap",
      "dsa-sort-counting-radix",
      "dsa-sort-stability",
      "dsa-sort-tradeoffs",
      "dsa-tree-terminology",
      "dsa-tree-binary-traversal",
      "dsa-tree-level-order",
      "dsa-tree-bst-intro",
      "dsa-tree-bst-operations",
      "dsa-tree-height-diameter",
      "dsa-tree-lca",
      "dsa-tree-avl",
      "dsa-tree-segment",
      "dsa-tree-fenwick",
      "dsa-heap-introduction",
      "dsa-heap-heapify",
      "dsa-heap-operations",
      "dsa-heap-sort",
      "dsa-heap-top-k",
      "dsa-heap-k-way-merge",
      "dsa-heap-applications",
      "dsa-graph-representation",
      "dsa-graph-bfs",
      "dsa-graph-dfs",
      "dsa-graph-connected-components",
      "dsa-graph-cycle-detection",
      "dsa-graph-bipartite",
      "dsa-graph-topological-sort",
      "dsa-graph-dijkstra",
      "dsa-graph-bellman-ford",
      "dsa-graph-floyd-warshall",
      "dsa-graph-mst",
      "dsa-graph-dsu",
      "dsa-graph-bridges",
      "dsa-greedy-strategy",
      "dsa-greedy-activity-selection",
      "dsa-greedy-fractional-knapsack",
      "dsa-dp-fundamentals",
      "dsa-dp-memoization-tabulation",
      "dsa-dp-fibonacci",
      "dsa-dp-coin-change",
      "dsa-dp-knapsack-01",
      "dsa-dp-lcs",
      "dsa-dp-lis",
      "dsa-dp-edit-distance",
      "dsa-dp-grid",
      "dsa-dp-partition",
      "dsa-dp-bitmask",
      "dsa-advanced-bit-manipulation",
      "dsa-advanced-binary-search-answer",
      "dsa-advanced-meet-in-middle",
      "dsa-advanced-sweep-line",
      "dsa-advanced-coordinate-compression",
      "dsa-advanced-trie-applications",
      "dsa-advanced-complexity-overview",
      "dsa-advanced-interview-patterns"
    ]
  },
  "python": {
    "modulesCount": 12,
    "lessonIds": [
      "py-fundamentals-execution-model",
      "py-fundamentals-variables",
      "py-fundamentals-type-conversion",
      "py-fundamentals-operators",
      "py-fundamentals-input-output",
      "py-fundamentals-comments",
      "py-fundamentals-debugging",
      "py-fundamentals-numbers-strings",
      "py-control-boolean-logic",
      "py-control-conditionals",
      "py-control-for-loops",
      "py-control-while-loops",
      "py-control-break-continue",
      "py-control-nested-loops",
      "py-control-pattern-printing",
      "py-ds-strings-methods",
      "py-ds-lists",
      "py-ds-tuples",
      "py-ds-sets",
      "py-ds-dictionaries",
      "py-ds-slicing",
      "py-ds-mutability",
      "py-ds-copying",
      "py-ds-nested",
      "py-func-defining",
      "py-func-parameters",
      "py-func-default-args",
      "py-func-args-kwargs",
      "py-func-scope",
      "py-func-lambda",
      "py-func-recursion",
      "py-func-higher-order",
      "py-func-closures",
      "py-func-decorators",
      "py-comp-list",
      "py-comp-dict-set",
      "py-comp-generators",
      "py-comp-iterables",
      "py-comp-yield",
      "py-comp-builtins",
      "py-oop-classes-objects",
      "py-oop-constructor",
      "py-oop-attributes",
      "py-oop-methods",
      "py-oop-encapsulation",
      "py-oop-inheritance",
      "py-oop-polymorphism",
      "py-oop-abstraction",
      "py-oop-composition",
      "py-oop-mro",
      "py-oop-special-methods",
      "py-exceptions-handling",
      "py-exceptions-custom",
      "py-files-reading-writing",
      "py-files-context-managers",
      "py-modules-imports",
      "py-modules-venv",
      "py-modules-env-vars",
      "py-modules-logging",
      "py-advanced-copying",
      "py-advanced-decorators-depth",
      "py-advanced-iterators-depth",
      "py-advanced-type-hints",
      "py-advanced-dataclasses",
      "py-advanced-abc",
      "py-advanced-functional",
      "py-advanced-regex",
      "py-advanced-collections",
      "py-advanced-profiling",
      "py-internals-identity",
      "py-internals-mutable-immutable",
      "py-internals-data-model",
      "py-internals-hashability",
      "py-internals-equality-identity",
      "py-internals-legb",
      "py-internals-gc",
      "py-internals-cpython",
      "py-internals-gil",
      "py-internals-concurrency",
      "py-practical-json-csv",
      "py-practical-http",
      "py-practical-sqlite",
      "py-practical-pytest",
      "py-practical-debugging",
      "py-practical-clean-code",
      "py-practical-git",
      "py-practical-packaging",
      "py-ds-numpy",
      "py-ds-pandas",
      "py-ds-matplotlib",
      "py-ds-data-cleaning",
      "py-ds-sklearn",
      "py-ds-pipelines",
      "py-project-calculator",
      "py-project-expense-tracker",
      "py-project-file-organizer",
      "py-project-contact-manager",
      "py-project-library-oop",
      "py-project-fastapi",
      "py-project-data-analysis",
      "py-project-ml-api"
    ]
  },
  "java": {
    "modulesCount": 12,
    "lessonIds": [
      "java-intro-history",
      "java-jdk-jre-jvm",
      "java-jvm-architecture",
      "java-program-structure",
      "java-compilation-execution",
      "java-comments-style",
      "java-console-output",
      "java-scanner-input",
      "java-syntax-vs-runtime-errors",
      "java-cli-project",
      "java-variables-declaration",
      "java-primitive-integers",
      "java-floating-point",
      "java-char-boolean",
      "java-strings-immutability",
      "java-constants-final",
      "java-type-casting",
      "java-arithmetic-operators",
      "java-relational-logical",
      "java-bitwise-operators",
      "java-if-else-branching",
      "java-ternary-operator",
      "java-switch-statement",
      "java-while-loop",
      "java-do-while-loop",
      "java-for-loop",
      "java-enhanced-for",
      "java-nested-loops",
      "java-break-continue",
      "java-loops-practice",
      "java-arrays-1d",
      "java-array-traversal",
      "java-arrays-utility",
      "java-2d-matrices",
      "java-jagged-arrays",
      "java-string-methods",
      "java-string-equality",
      "java-stringbuilder",
      "java-regex-patterns",
      "java-string-algorithms",
      "java-methods-structure",
      "java-pass-by-value",
      "java-method-overloading",
      "java-varargs",
      "java-static-methods",
      "java-call-stack-frames",
      "java-recursion-fundamentals",
      "java-factorial-recursion",
      "java-fibonacci-recursion",
      "java-recursion-vs-iteration",
      "java-oop-paradigms",
      "java-classes-and-objects",
      "java-instance-variables",
      "java-constructors",
      "java-this-keyword",
      "java-encapsulation-getters",
      "java-access-modifiers",
      "java-static-fields-blocks",
      "java-object-lifecycle",
      "java-oop-bank-project",
      "java-inheritance-extends",
      "java-super-keyword",
      "java-method-overriding",
      "java-polymorphism-dispatch",
      "java-object-methods",
      "java-abstract-classes",
      "java-interfaces",
      "java-default-methods",
      "java-composition-over-inheritance",
      "java-final-immutable",
      "java-packages-structure",
      "java-imports-static",
      "java-package-access",
      "java-enums",
      "java-nested-classes",
      "java-anonymous-classes",
      "java-generics-intro",
      "java-generic-classes-methods",
      "java-bounded-generics",
      "java-generics-wildcards",
      "java-exception-hierarchy",
      "java-checked-vs-unchecked",
      "java-try-catch-blocks",
      "java-finally-block",
      "java-try-with-resources",
      "java-throw-throws",
      "java-custom-exceptions",
      "java-exception-chaining",
      "java-exception-best-practices",
      "java-debugging-stack-traces",
      "java-collections-overview",
      "java-arraylist-deep-dive",
      "java-linkedlist-operations",
      "java-hashset-uniqueness",
      "java-treeset-ordering",
      "java-hashmap-deep-dive",
      "java-treemap-linkedhashmap",
      "java-queue-deque",
      "java-priority-queue",
      "java-iterators-failfast",
      "java-dsa-big-o",
      "java-dsa-searching",
      "java-dsa-elementary-sorts",
      "java-dsa-mergesort",
      "java-dsa-quicksort",
      "java-dsa-custom-linkedlist",
      "java-dsa-custom-stack-queue",
      "java-dsa-binary-search-tree",
      "java-dsa-graph-algorithms",
      "java-dsa-dynamic-programming",
      "java-file-io-nio",
      "java-lambdas-syntax",
      "java-functional-interfaces",
      "java-streams-filter-map",
      "java-streams-reduce-grouping",
      "java-optional-type",
      "java-threads-runnable",
      "java-synchronization-locks",
      "java-executors-completablefuture",
      "java-capstone-project"
    ]
  },
  "allML": {
    "modulesCount": 131,
    "lessonIds": [
      "p0-ai-ml-hierarchy",
      "p0-platform-mastery",
      "p0-python-diagnostic",
      "p0-numpy-pandas-diagnostic",
      "p0-math-diagnostic",
      "p0-prerequisite-recommendations",
      "ai-ml-dl-foundations",
      "ml-types-paradigms",
      "regression-vs-classification",
      "features-parameters-hyperparameters",
      "train-val-test-splits",
      "batch-vs-online-learning",
      "ml-workflow-problem-formulation",
      "scalars-vectors-matrices-tensors",
      "vector-operations-dot-products",
      "matrix-inverse-rank-determinants",
      "eigenvalues-eigenvectors",
      "singular-value-decomposition",
      "derivatives-chain-rule",
      "gradients-jacobian-hessian",
      "gradient-descent-optimization",
      "convexity-optimization",
      "probability-bayes-theorem",
      "probability-distributions",
      "expectation-variance-covariance",
      "sampling-central-limit-theorem",
      "mle-map-estimation",
      "entropy-cross-entropy-kl-divergence",
      "eda-inspection",
      "missing-values-duplicates",
      "outlier-detection-treatment",
      "categorical-encoding",
      "feature-scaling-normalization",
      "train-val-test-splitting",
      "data-leakage-prevention",
      "feature-selection-extraction",
      "polynomial-features",
      "datetime-text-features",
      "imbalanced-datasets-smote",
      "columntransformer-pipelines",
      "cross-validation-foundations",
      "linear-regression",
      "multiple-linear-regression",
      "regression-metrics",
      "residual-analysis-assumptions",
      "multicollinearity-vif",
      "polynomial-regression",
      "ridge-regression",
      "lasso-regression",
      "elastic-net",
      "bias-variance-tradeoff",
      "logistic-regression",
      "log-loss-cross-entropy",
      "multiclass-softmax",
      "k-nearest-neighbors",
      "decision-trees",
      "gini-entropy-information-gain",
      "naive-bayes",
      "support-vector-machines",
      "svm-kernel-trick",
      "probability-calibration",
      "confusion-matrix-metrics",
      "f1-score-fbeta",
      "roc-auc-curve",
      "precision-recall-curve",
      "hyperparameter-tuning",
      "learning-validation-curves",
      "threshold-tuning-cost-matrix",
      "ensemble-foundations",
      "bagging-bootstrap-aggregating",
      "random-forests",
      "boosting-fundamentals",
      "adaboost",
      "gradient-boosting",
      "xgboost-lightgbm-catboost",
      "voting-stacking-blending",
      "feature-importance-shap",
      "clustering-foundations",
      "k-means-clustering",
      "choosing-k-clustering-metrics",
      "hierarchical-clustering",
      "dbscan-clustering",
      "gaussian-mixture-models",
      "pca-principal-component-analysis",
      "tsne-umap",
      "anomaly-detection",
      "advanced-feature-selection",
      "explainable-ai-shap-lime",
      "cost-sensitive-learning",
      "fairness-bias-ethics",
      "data-and-concept-drift",
      "time-series-machine-learning",
      "perceptron-mcp",
      "multilayer-perceptron-ann",
      "activation-functions",
      "backpropagation-derivation",
      "neural-loss-functions",
      "optimization-algorithms",
      "regularization-in-deep-learning",
      "vanishing-exploding-gradients",
      "pytorch-fundamentals",
      "pytorch-training-loop",
      "model-serialization-serving",
      "production-fastapi-service",
      "docker-containerization-ml",
      "model-versioning-mlflow",
      "monitoring-data-drift-evidently",
      "cicd-for-machine-learning",
      "project-house-price-prediction",
      "project-customer-churn",
      "project-credit-risk",
      "project-customer-sentiment",
      "project-prediction-api",
      "dl-01-intro",
      "dl-02-neuron-fundamentals",
      "dl-03-activations",
      "dl-04-loss-functions",
      "dl-05-forward-propagation",
      "dl-06-calculus-gradients",
      "dl-07-backpropagation",
      "dl-08-optimizers",
      "dl-09-training-loop",
      "dl-10-regularization",
      "dl-11-initialization-normalization",
      "dl-12-hyperparameter-tuning",
      "dl-13-pytorch-fundamentals",
      "dl-14-neural-net-from-scratch",
      "dl-15-first-dl-project",
      "dl-16-convolutional-neural-networks",
      "dl-17-transfer-learning",
      "dl-18-sequence-learning",
      "dl-19-attention-fundamentals",
      "dl-20-deep-learning-evaluation",
      "dl-21-deployment",
      "dl-22-deep-learning-capstone",
      "tf-01-why-transformers",
      "tf-02-tokenization-and-token-ids",
      "tf-03-embeddings-latent-space",
      "tf-04-positional-encoding",
      "tf-05-query-key-value",
      "tf-06-scaled-dot-product-attention",
      "tf-07-attention-masks-causal",
      "tf-08-multi-head-attention",
      "tf-09-residual-layer-norm",
      "tf-10-feed-forward-networks",
      "tf-11-encoder-decoder-architectures",
      "tf-12-autoregressive-generation-kv-cache",
      "tf-13-pytorch-transformer-block",
      "tf-14-attention-weights-limitations",
      "tf-15-transformer-mini-project",
      "genai-01-foundations",
      "genai-02-how-llms-work",
      "genai-03-tokenization-in-llms",
      "genai-04-embeddings-representations",
      "genai-05-pretraining-dynamics",
      "genai-06-inference-and-decoding",
      "genai-07-prompt-engineering",
      "genai-08-context-windows-memory",
      "genai-09-supervised-fine-tuning",
      "genai-10-peft-lora-qlora",
      "genai-11-quantization-optimization",
      "genai-12-open-vs-hosted-models",
      "genai-13-llm-evaluation",
      "genai-14-safety-and-reliability",
      "genai-15-llm-capstone",
      "rag-01-fundamentals",
      "rag-02-document-ingestion",
      "rag-03-chunking-strategies",
      "rag-04-embeddings-semantic-search",
      "rag-05-vector-search-fundamentals",
      "rag-06-vector-databases-indexing",
      "rag-07-retrieval-quality-metrics",
      "rag-08-hybrid-retrieval-rrf",
      "rag-09-reranking-query-transform",
      "rag-10-grounded-context-assembly",
      "rag-11-rag-generation-groundedness",
      "rag-12-advanced-rag-patterns",
      "rag-13-rag-evaluation-ragas",
      "rag-14-rag-security-production",
      "rag-15-production-rag-capstone",
      "agent-01-fundamentals",
      "agent-02-architecture",
      "agent-03-tool-calling",
      "agent-04-state-memory",
      "agent-05-planning",
      "agent-06-orchestration",
      "agent-07-rag-agents",
      "agent-08-multi-agent",
      "agent-09-human-in-the-loop",
      "agent-10-evaluation",
      "agent-11-safety-security",
      "agent-12-observability",
      "agent-13-advanced-patterns",
      "agent-14-production-agent",
      "agent-15-capstone",
      "mlops-01-fundamentals",
      "mlops-02-experiment-tracking",
      "mlops-03-data-model-versioning",
      "mlops-04-pipelines-automation",
      "mlops-05-packaging-environments",
      "mlops-06-serving-apis",
      "mlops-07-cicd-ml",
      "mlops-08-registry-releases",
      "mlops-09-monitoring-drift",
      "mlops-10-llmops-fundamentals",
      "mlops-11-llm-eval-testing",
      "mlops-12-observability-tracing",
      "mlops-13-cost-reliability-performance",
      "mlops-14-governance-security",
      "mlops-15-production-capstone",
      "deploy-01-fundamentals",
      "deploy-02-linux-servers",
      "deploy-03-networking-http-dns",
      "deploy-04-docker-ai",
      "deploy-05-production-apis",
      "deploy-06-cloud-computing",
      "deploy-07-deploying-ai-apps",
      "deploy-08-storage-artifacts",
      "deploy-09-scaling-load-balancing",
      "deploy-10-background-async-jobs",
      "deploy-11-gpu-dl-serving",
      "deploy-12-production-llm-serving",
      "deploy-13-security-reliability",
      "deploy-14-observability-costs",
      "deploy-15-capstone-deployment",
      "numpy-m1-l1",
      "numpy-m1-l2",
      "numpy-m1-l3",
      "numpy-m1-l4",
      "numpy-m1-l5",
      "numpy-m1-l6",
      "numpy-m1-l7",
      "numpy-m1-l8",
      "numpy-m1-l9",
      "numpy-m1-l10",
      "numpy-m1-l11",
      "numpy-m1-l12",
      "numpy-m2-l1",
      "numpy-m2-l2",
      "numpy-m2-l3",
      "numpy-m2-l4",
      "numpy-m2-l5",
      "numpy-m2-l6",
      "numpy-m2-l7",
      "numpy-m2-l8",
      "numpy-m2-l9",
      "numpy-m2-l10",
      "numpy-m2-l11",
      "numpy-m2-l12",
      "numpy-m3-l1",
      "numpy-m3-l2",
      "numpy-m3-l3",
      "numpy-m3-l4",
      "numpy-m3-l5",
      "numpy-m3-l6",
      "numpy-m3-l7",
      "numpy-m3-l8",
      "numpy-m3-l9",
      "numpy-m3-l10",
      "numpy-m3-l11",
      "numpy-m3-l12",
      "numpy-m3-l13",
      "numpy-m4-l1",
      "numpy-m4-l2",
      "numpy-m4-l3",
      "numpy-m4-l4",
      "numpy-m4-l5",
      "numpy-m4-l6",
      "numpy-m4-l7",
      "numpy-m4-l8",
      "numpy-m4-l9",
      "numpy-m4-l10",
      "numpy-m4-l11",
      "numpy-m5-l1",
      "numpy-m5-l2",
      "numpy-m5-l3",
      "numpy-m5-l4",
      "numpy-m5-l5",
      "numpy-m5-l6",
      "numpy-m5-l7",
      "numpy-m5-l8",
      "numpy-m5-l9",
      "numpy-m5-l10",
      "numpy-m5-l11",
      "numpy-m5-l12",
      "numpy-m6-l1",
      "numpy-m6-l2",
      "numpy-m6-l3",
      "numpy-m6-l4",
      "numpy-m6-l5",
      "numpy-m6-l6",
      "numpy-m6-l7",
      "numpy-m6-l8",
      "numpy-m6-l9",
      "numpy-m6-l10",
      "numpy-fp-student-analytics",
      "pandas-m1-l1",
      "pandas-m1-l2",
      "pandas-m1-l3",
      "pandas-m1-l4",
      "pandas-m1-l5",
      "pandas-m1-l6",
      "pandas-m1-l7",
      "pandas-m1-l8",
      "pandas-m1-l9",
      "pandas-m1-l10",
      "pandas-m1-l11",
      "pandas-m1-l12",
      "pandas-m2-l1",
      "pandas-m2-l2",
      "pandas-m2-l3",
      "pandas-m2-l4",
      "pandas-m2-l5",
      "pandas-m2-l6",
      "pandas-m2-l7",
      "pandas-m2-l8",
      "pandas-m2-l9",
      "pandas-m2-l10",
      "pandas-m2-l11",
      "pandas-m2-l12",
      "pandas-m2-l13",
      "pandas-m2-l14",
      "pandas-m2-l15",
      "pandas-m3-l1",
      "pandas-m3-l2",
      "pandas-m3-l3",
      "pandas-m3-l4",
      "pandas-m3-l5",
      "pandas-m3-l6",
      "pandas-m3-l7",
      "pandas-m3-l8",
      "pandas-m3-l9",
      "pandas-m3-l10",
      "pandas-m3-l11",
      "pandas-m3-l12",
      "pandas-m3-l13",
      "pandas-m3-l14",
      "pandas-m4-l1",
      "pandas-m4-l2",
      "pandas-m4-l3",
      "pandas-m4-l4",
      "pandas-m4-l5",
      "pandas-m4-l6",
      "pandas-m4-l7",
      "pandas-m4-l8",
      "pandas-m4-l9",
      "pandas-m4-l10",
      "pandas-m4-l11",
      "pandas-m5-l1",
      "pandas-m5-l2",
      "pandas-m5-l3",
      "pandas-m5-l4",
      "pandas-m5-l5",
      "pandas-m5-l6",
      "pandas-m5-l7",
      "pandas-m5-l8",
      "pandas-m5-l9",
      "pandas-m5-l10",
      "pandas-m5-l11",
      "pandas-m5-l12",
      "pandas-m6-l1",
      "pandas-m6-l2",
      "pandas-m6-l3",
      "pandas-m6-l4",
      "pandas-m6-l5",
      "pandas-m6-l6",
      "pandas-m6-l7",
      "pandas-m6-l8",
      "pandas-m6-l9",
      "pandas-m6-l10",
      "pandas-m6-l11",
      "pandas-m6-l12",
      "pandas-m6-l13",
      "pandas-m7-l1",
      "pandas-m7-l2",
      "pandas-m7-l3",
      "pandas-m7-l4",
      "pandas-m7-l5",
      "pandas-m7-l6",
      "pandas-m7-l7",
      "pandas-m7-l8",
      "pandas-m7-l9",
      "pandas-m7-l10",
      "pandas-m7-l11",
      "pandas-m7-l12",
      "pandas-m7-l13",
      "pandas-m7-l14",
      "pandas-m7-l15",
      "pandas-m8-l1",
      "pandas-m8-l2",
      "pandas-m8-l3",
      "pandas-m8-l4",
      "pandas-m8-l5",
      "pandas-m8-l6",
      "pandas-m8-l7",
      "pandas-m8-l8",
      "pandas-m8-l9",
      "pandas-m8-l10",
      "pandas-m8-l11",
      "pandas-m8-l12",
      "pandas-m8-l13",
      "pandas-m9-l1",
      "pandas-m9-l2",
      "pandas-m9-l3",
      "pandas-m9-l4",
      "pandas-m9-l5",
      "pandas-m9-l6",
      "pandas-m9-l7",
      "pandas-m9-l8",
      "pandas-m9-l9",
      "pandas-m9-l10",
      "pandas-m9-l11",
      "pandas-m9-l12",
      "pandas-m9-l13",
      "pandas-m9-l14",
      "pandas-m9-l15",
      "pandas-fp-l1"
    ],
    "totalHours": 778
  },
  "dsaTotalHours": 101,
  "pyTotalHours": 99,
  "javaTotalHours": 118,
  "lessonLookup": {
    "p0-ai-ml-hierarchy": {
      "title": "Taxonomy of AI: Symbolic Rules to Generative Models",
      "moduleId": "phase-0-mod-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/phase-0-mod-1/p0-ai-ml-hierarchy"
    },
    "p0-platform-mastery": {
      "title": "Platform Mastery: Visualizers, Code Lab & In-Browser Execution",
      "moduleId": "phase-0-mod-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/phase-0-mod-2/p0-platform-mastery"
    },
    "p0-python-diagnostic": {
      "title": "Python Fluency Diagnostic: Data Structures, OOP & Idiomatic Coding",
      "moduleId": "phase-0-mod-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/phase-0-mod-3/p0-python-diagnostic"
    },
    "p0-numpy-pandas-diagnostic": {
      "title": "NumPy & Pandas Diagnostic: Broadcasting, Indexing & Data Wrangling",
      "moduleId": "phase-0-mod-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/phase-0-mod-4/p0-numpy-pandas-diagnostic"
    },
    "p0-math-diagnostic": {
      "title": "Mathematics Diagnostic: Linear Algebra, Calculus & Probability",
      "moduleId": "phase-0-mod-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/phase-0-mod-5/p0-math-diagnostic"
    },
    "p0-prerequisite-recommendations": {
      "title": "Your Personalized AI & ML Study Pathway",
      "moduleId": "phase-0-mod-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/phase-0-mod-6/p0-prerequisite-recommendations"
    },
    "ai-ml-dl-foundations": {
      "title": "What is AI, ML, and Deep Learning?",
      "moduleId": "module-0",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-0/ai-ml-dl-foundations"
    },
    "ml-types-paradigms": {
      "title": "Paradigms of Machine Learning",
      "moduleId": "module-0",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-0/ml-types-paradigms"
    },
    "regression-vs-classification": {
      "title": "Regression vs Classification Tasks",
      "moduleId": "module-0",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-0/regression-vs-classification"
    },
    "features-parameters-hyperparameters": {
      "title": "Features, Labels, Parameters & Hyperparameters",
      "moduleId": "module-0",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-0/features-parameters-hyperparameters"
    },
    "train-val-test-splits": {
      "title": "Training, Validation, and Test Splits",
      "moduleId": "module-0",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-0/train-val-test-splits"
    },
    "batch-vs-online-learning": {
      "title": "Batch vs Online Learning",
      "moduleId": "module-0",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-0/batch-vs-online-learning"
    },
    "ml-workflow-problem-formulation": {
      "title": "End-to-End ML Workflow & Problem Formulation",
      "moduleId": "module-0",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-0/ml-workflow-problem-formulation"
    },
    "scalars-vectors-matrices-tensors": {
      "title": "Scalars, Vectors, Matrices, and Tensors",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/scalars-vectors-matrices-tensors"
    },
    "vector-operations-dot-products": {
      "title": "Vector Operations, Dot Products & Projections",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/vector-operations-dot-products"
    },
    "matrix-inverse-rank-determinants": {
      "title": "Matrix Inverses, Rank, and Determinants",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/matrix-inverse-rank-determinants"
    },
    "eigenvalues-eigenvectors": {
      "title": "Eigenvalues and Eigenvectors",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/eigenvalues-eigenvectors"
    },
    "singular-value-decomposition": {
      "title": "Singular Value Decomposition (SVD)",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/singular-value-decomposition"
    },
    "derivatives-chain-rule": {
      "title": "Derivatives and the Multivariable Chain Rule",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/derivatives-chain-rule"
    },
    "gradients-jacobian-hessian": {
      "title": "Gradients, Jacobians, and Hessian Matrices",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/gradients-jacobian-hessian"
    },
    "gradient-descent-optimization": {
      "title": "Gradient Descent & First-Order Optimization",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/gradient-descent-optimization"
    },
    "convexity-optimization": {
      "title": "Convexity and Optimization Theory",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/convexity-optimization"
    },
    "probability-bayes-theorem": {
      "title": "Probability Rules & Bayes Theorem",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/probability-bayes-theorem"
    },
    "probability-distributions": {
      "title": "Discrete and Continuous Probability Distributions",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/probability-distributions"
    },
    "expectation-variance-covariance": {
      "title": "Expectation, Variance, and Covariance Matrices",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/expectation-variance-covariance"
    },
    "sampling-central-limit-theorem": {
      "title": "Sampling and the Central Limit Theorem",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/sampling-central-limit-theorem"
    },
    "mle-map-estimation": {
      "title": "Maximum Likelihood (MLE) & MAP Estimation",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/mle-map-estimation"
    },
    "entropy-cross-entropy-kl-divergence": {
      "title": "Entropy, Cross-Entropy, and KL Divergence",
      "moduleId": "module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-1/entropy-cross-entropy-kl-divergence"
    },
    "eda-inspection": {
      "title": "Exploratory Data Analysis & Statistical Inspection",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/eda-inspection"
    },
    "missing-values-duplicates": {
      "title": "Missing Data Mechanisms & Imputation Strategies",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/missing-values-duplicates"
    },
    "outlier-detection-treatment": {
      "title": "Outlier Detection & Treatment Techniques",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/outlier-detection-treatment"
    },
    "categorical-encoding": {
      "title": "Categorical Feature Encoding",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/categorical-encoding"
    },
    "feature-scaling-normalization": {
      "title": "Feature Scaling & Normalization",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/feature-scaling-normalization"
    },
    "train-val-test-splitting": {
      "title": "Train, Validation & Test Splitting Strategies",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/train-val-test-splitting"
    },
    "data-leakage-prevention": {
      "title": "Data Leakage: Types, Detection & Prevention",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/data-leakage-prevention"
    },
    "feature-selection-extraction": {
      "title": "Feature Selection & Extraction Methods",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/feature-selection-extraction"
    },
    "polynomial-features": {
      "title": "Polynomial Features & Interaction Terms",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/polynomial-features"
    },
    "datetime-text-features": {
      "title": "Date/Time and Basic Text Feature Engineering",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/datetime-text-features"
    },
    "imbalanced-datasets-smote": {
      "title": "Imbalanced Datasets & SMOTE Resampling",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/imbalanced-datasets-smote"
    },
    "columntransformer-pipelines": {
      "title": "Scikit-Learn Pipelines & ColumnTransformer",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/columntransformer-pipelines"
    },
    "cross-validation-foundations": {
      "title": "Cross-Validation Protocols & Generalization Variance",
      "moduleId": "module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-2/cross-validation-foundations"
    },
    "linear-regression": {
      "title": "Simple & Multiple Linear Regression: Ordinary Least Squares (OLS)",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/linear-regression"
    },
    "multiple-linear-regression": {
      "title": "Multiple Linear Regression & Hyperplane Geometry",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/multiple-linear-regression"
    },
    "regression-metrics": {
      "title": "Regression Evaluation Metrics: MSE, MAE, RMSE & R²",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/regression-metrics"
    },
    "residual-analysis-assumptions": {
      "title": "Residual Diagnostics & Gauss-Markov Assumptions",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/residual-analysis-assumptions"
    },
    "multicollinearity-vif": {
      "title": "Multicollinearity & Variance Inflation Factor (VIF)",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/multicollinearity-vif"
    },
    "polynomial-regression": {
      "title": "Polynomial Regression & Non-Linear Fits",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/polynomial-regression"
    },
    "ridge-regression": {
      "title": "Ridge Regression & L2 Regularization",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/ridge-regression"
    },
    "lasso-regression": {
      "title": "Lasso Regression & L1 Regularization",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/lasso-regression"
    },
    "elastic-net": {
      "title": "Elastic Net Regression",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/elastic-net"
    },
    "bias-variance-tradeoff": {
      "title": "The Bias-Variance Tradeoff & Generalization Error",
      "moduleId": "module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-3/bias-variance-tradeoff"
    },
    "logistic-regression": {
      "title": "Logistic Regression & Maximum Likelihood Estimation",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/logistic-regression"
    },
    "log-loss-cross-entropy": {
      "title": "Binary Cross-Entropy & Log Loss Optimization",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/log-loss-cross-entropy"
    },
    "multiclass-softmax": {
      "title": "Multiclass Classification & Softmax Regression",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/multiclass-softmax"
    },
    "k-nearest-neighbors": {
      "title": "K-Nearest Neighbors (KNN)",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/k-nearest-neighbors"
    },
    "decision-trees": {
      "title": "Decision Trees & The CART Algorithm",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/decision-trees"
    },
    "gini-entropy-information-gain": {
      "title": "Gini Impurity, Entropy & Information Gain",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/gini-entropy-information-gain"
    },
    "naive-bayes": {
      "title": "Naive Bayes Classifiers",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/naive-bayes"
    },
    "support-vector-machines": {
      "title": "Support Vector Machines (SVM) & Maximum Margin",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/support-vector-machines"
    },
    "svm-kernel-trick": {
      "title": "The Kernel Trick & Non-Linear SVMs",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/svm-kernel-trick"
    },
    "probability-calibration": {
      "title": "Probability Calibration & Reliability Diagrams",
      "moduleId": "module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-4/probability-calibration"
    },
    "confusion-matrix-metrics": {
      "title": "Confusion Matrix, Precision, Recall & Specificity",
      "moduleId": "module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-5/confusion-matrix-metrics"
    },
    "f1-score-fbeta": {
      "title": "F1-Score, F-Beta & The Harmonic Mean",
      "moduleId": "module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-5/f1-score-fbeta"
    },
    "roc-auc-curve": {
      "title": "Receiver Operating Characteristic (ROC) & AUC",
      "moduleId": "module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-5/roc-auc-curve"
    },
    "precision-recall-curve": {
      "title": "Precision-Recall Curves & Average Precision",
      "moduleId": "module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-5/precision-recall-curve"
    },
    "hyperparameter-tuning": {
      "title": "Hyperparameter Tuning: Grid, Random & Bayesian Optimization",
      "moduleId": "module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-5/hyperparameter-tuning"
    },
    "learning-validation-curves": {
      "title": "Learning & Validation Curves Diagnostic Protocols",
      "moduleId": "module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-5/learning-validation-curves"
    },
    "threshold-tuning-cost-matrix": {
      "title": "Classification Threshold Tuning & Cost Matrix Optimization",
      "moduleId": "module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-5/threshold-tuning-cost-matrix"
    },
    "ensemble-foundations": {
      "title": "Ensemble Foundations & Wisdom of Crowds",
      "moduleId": "module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-6/ensemble-foundations"
    },
    "bagging-bootstrap-aggregating": {
      "title": "Bagging & Out-of-Bag (OOB) Evaluation",
      "moduleId": "module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-6/bagging-bootstrap-aggregating"
    },
    "random-forests": {
      "title": "Random Forests & Tree Decorrelation",
      "moduleId": "module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-6/random-forests"
    },
    "boosting-fundamentals": {
      "title": "Boosting Fundamentals & Sequential Learning",
      "moduleId": "module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-6/boosting-fundamentals"
    },
    "adaboost": {
      "title": "AdaBoost: Adaptive Boosting & Exponential Loss",
      "moduleId": "module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-6/adaboost"
    },
    "gradient-boosting": {
      "title": "Gradient Boosted Decision Trees (GBDT)",
      "moduleId": "module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-6/gradient-boosting"
    },
    "xgboost-lightgbm-catboost": {
      "title": "Modern Gradient Boosters: XGBoost, LightGBM & CatBoost",
      "moduleId": "module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-6/xgboost-lightgbm-catboost"
    },
    "voting-stacking-blending": {
      "title": "Voting, Stacking & Blending Architectures",
      "moduleId": "module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-6/voting-stacking-blending"
    },
    "feature-importance-shap": {
      "title": "Feature Importance & TreeSHAP Interpretability",
      "moduleId": "module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-6/feature-importance-shap"
    },
    "clustering-foundations": {
      "title": "Clustering Foundations & Partitioning Principles",
      "moduleId": "module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-7/clustering-foundations"
    },
    "k-means-clustering": {
      "title": "K-Means Clustering & K-Means++ Seeding",
      "moduleId": "module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-7/k-means-clustering"
    },
    "choosing-k-clustering-metrics": {
      "title": "Choosing K & Cluster Validation Metrics",
      "moduleId": "module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-7/choosing-k-clustering-metrics"
    },
    "hierarchical-clustering": {
      "title": "Hierarchical Agglomerative Clustering & Linkage",
      "moduleId": "module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-7/hierarchical-clustering"
    },
    "dbscan-clustering": {
      "title": "DBSCAN: Density-Based Spatial Clustering",
      "moduleId": "module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-7/dbscan-clustering"
    },
    "gaussian-mixture-models": {
      "title": "Gaussian Mixture Models & Expectation-Maximization",
      "moduleId": "module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-7/gaussian-mixture-models"
    },
    "pca-principal-component-analysis": {
      "title": "Principal Component Analysis (PCA)",
      "moduleId": "module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-7/pca-principal-component-analysis"
    },
    "tsne-umap": {
      "title": "Non-Linear Manifold Learning: t-SNE & UMAP",
      "moduleId": "module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-7/tsne-umap"
    },
    "anomaly-detection": {
      "title": "Anomaly Detection: Isolation Forest & LOF",
      "moduleId": "module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-7/anomaly-detection"
    },
    "advanced-feature-selection": {
      "title": "Advanced Feature Selection: Filter, Wrapper, Embedded & Boruta",
      "moduleId": "module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-8/advanced-feature-selection"
    },
    "explainable-ai-shap-lime": {
      "title": "Explainable AI (XAI): LIME Local Surrogates & SHAP Interactions",
      "moduleId": "module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-8/explainable-ai-shap-lime"
    },
    "cost-sensitive-learning": {
      "title": "Cost-Sensitive Learning & Asymmetric Error Optimization",
      "moduleId": "module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-8/cost-sensitive-learning"
    },
    "fairness-bias-ethics": {
      "title": "Algorithmic Fairness, Bias & Ethical Machine Learning",
      "moduleId": "module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-8/fairness-bias-ethics"
    },
    "data-and-concept-drift": {
      "title": "Data Drift, Concept Drift & Model Monitoring",
      "moduleId": "module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-8/data-and-concept-drift"
    },
    "time-series-machine-learning": {
      "title": "Time Series Machine Learning: Lags, Windows & Leakage Prevention",
      "moduleId": "module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-8/time-series-machine-learning"
    },
    "perceptron-mcp": {
      "title": "The Perceptron & McCulloch-Pitts Neuron",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/perceptron-mcp"
    },
    "multilayer-perceptron-ann": {
      "title": "Multi-Layer Perceptrons & Universal Approximation",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/multilayer-perceptron-ann"
    },
    "activation-functions": {
      "title": "Activation Functions: Sigmoid, Tanh, ReLU & GELU",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/activation-functions"
    },
    "backpropagation-derivation": {
      "title": "Backpropagation: Complete Vector & Matrix Derivation",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/backpropagation-derivation"
    },
    "neural-loss-functions": {
      "title": "Loss Functions for Deep Learning: Cross-Entropy & Focal Loss",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/neural-loss-functions"
    },
    "optimization-algorithms": {
      "title": "Deep Learning Optimizers: SGD, Momentum, RMSprop & Adam",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/optimization-algorithms"
    },
    "regularization-in-deep-learning": {
      "title": "Regularization: Dropout, Weight Decay & Normalization",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/regularization-in-deep-learning"
    },
    "vanishing-exploding-gradients": {
      "title": "Vanishing & Exploding Gradients & Initialization",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/vanishing-exploding-gradients"
    },
    "pytorch-fundamentals": {
      "title": "PyTorch Fundamentals: Tensors, Autograd & Graphs",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/pytorch-fundamentals"
    },
    "pytorch-training-loop": {
      "title": "Building End-to-End Neural Networks in PyTorch",
      "moduleId": "module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-9/pytorch-training-loop"
    },
    "model-serialization-serving": {
      "title": "Model Serialization: Pickle, Joblib & ONNX",
      "moduleId": "module-10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-10/model-serialization-serving"
    },
    "production-fastapi-service": {
      "title": "Production ML APIs with FastAPI & Pydantic",
      "moduleId": "module-10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-10/production-fastapi-service"
    },
    "docker-containerization-ml": {
      "title": "Docker Containerization for ML Deployments",
      "moduleId": "module-10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-10/docker-containerization-ml"
    },
    "model-versioning-mlflow": {
      "title": "Experiment Tracking & Model Registries with MLflow",
      "moduleId": "module-10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-10/model-versioning-mlflow"
    },
    "monitoring-data-drift-evidently": {
      "title": "Production Monitoring: Data Drift & Concept Drift",
      "moduleId": "module-10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-10/monitoring-data-drift-evidently"
    },
    "cicd-for-machine-learning": {
      "title": "CI/CD Pipelines & Continuous Training for ML",
      "moduleId": "module-10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-10/cicd-for-machine-learning"
    },
    "project-house-price-prediction": {
      "title": "Capstone 1: Ames Real Estate Valuation System",
      "moduleId": "module-11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-11/project-house-price-prediction"
    },
    "project-customer-churn": {
      "title": "Capstone 2: Telecom Customer Churn & Retention Analytics",
      "moduleId": "module-11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-11/project-customer-churn"
    },
    "project-credit-risk": {
      "title": "Capstone 3: Financial Loan Default & Credit Risk Scoring",
      "moduleId": "module-11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-11/project-credit-risk"
    },
    "project-customer-sentiment": {
      "title": "Capstone 4: E-Commerce Review NLP Sentiment Classifier",
      "moduleId": "module-11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-11/project-customer-sentiment"
    },
    "project-prediction-api": {
      "title": "Capstone 5: Production Prediction API & Monitoring Service",
      "moduleId": "module-11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/module-11/project-prediction-api"
    },
    "dl-01-intro": {
      "title": "DL-01: Introduction to Deep Learning",
      "moduleId": "dl-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-1/dl-01-intro"
    },
    "dl-02-neuron-fundamentals": {
      "title": "DL-02: Neural Network Fundamentals",
      "moduleId": "dl-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-1/dl-02-neuron-fundamentals"
    },
    "dl-03-activations": {
      "title": "DL-03: Activation Functions",
      "moduleId": "dl-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-1/dl-03-activations"
    },
    "dl-04-loss-functions": {
      "title": "DL-04: Loss Functions for Deep Learning",
      "moduleId": "dl-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-1/dl-04-loss-functions"
    },
    "dl-05-forward-propagation": {
      "title": "DL-05: Forward Propagation",
      "moduleId": "dl-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-1/dl-05-forward-propagation"
    },
    "dl-06-calculus-gradients": {
      "title": "DL-06: Calculus for Neural Networks",
      "moduleId": "dl-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-2/dl-06-calculus-gradients"
    },
    "dl-07-backpropagation": {
      "title": "DL-07: Backpropagation: Complete Vector & Matrix Derivation",
      "moduleId": "dl-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-2/dl-07-backpropagation"
    },
    "dl-08-optimizers": {
      "title": "DL-08: Gradient Descent and Optimizers",
      "moduleId": "dl-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-2/dl-08-optimizers"
    },
    "dl-09-training-loop": {
      "title": "DL-09: Training a Neural Network",
      "moduleId": "dl-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-2/dl-09-training-loop"
    },
    "dl-10-regularization": {
      "title": "DL-10: Overfitting and Regularization",
      "moduleId": "dl-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-3/dl-10-regularization"
    },
    "dl-11-initialization-normalization": {
      "title": "DL-11: Weight Initialization & Normalization",
      "moduleId": "dl-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-3/dl-11-initialization-normalization"
    },
    "dl-12-hyperparameter-tuning": {
      "title": "DL-12: Hyperparameter Tuning & Experimentation",
      "moduleId": "dl-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-3/dl-12-hyperparameter-tuning"
    },
    "dl-13-pytorch-fundamentals": {
      "title": "DL-13: PyTorch Fundamentals",
      "moduleId": "dl-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-4/dl-13-pytorch-fundamentals"
    },
    "dl-14-neural-net-from-scratch": {
      "title": "DL-14: Build a Neural Network from Scratch",
      "moduleId": "dl-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-4/dl-14-neural-net-from-scratch"
    },
    "dl-15-first-dl-project": {
      "title": "DL-15: First Practical Deep Learning Project",
      "moduleId": "dl-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-4/dl-15-first-dl-project"
    },
    "dl-16-convolutional-neural-networks": {
      "title": "DL-16: Convolutional Neural Networks",
      "moduleId": "dl-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-5/dl-16-convolutional-neural-networks"
    },
    "dl-17-transfer-learning": {
      "title": "DL-17: Transfer Learning & Fine-Tuning",
      "moduleId": "dl-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-5/dl-17-transfer-learning"
    },
    "dl-18-sequence-learning": {
      "title": "DL-18: Sequence Learning: RNNs, LSTMs & GRUs",
      "moduleId": "dl-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-5/dl-18-sequence-learning"
    },
    "dl-19-attention-fundamentals": {
      "title": "DL-19: Attention Fundamentals",
      "moduleId": "dl-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-5/dl-19-attention-fundamentals"
    },
    "dl-20-deep-learning-evaluation": {
      "title": "DL-20: Deep Learning Evaluation & Diagnostics",
      "moduleId": "dl-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-6/dl-20-deep-learning-evaluation"
    },
    "dl-21-deployment": {
      "title": "DL-21: Deep Learning Deployment & Serving",
      "moduleId": "dl-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-6/dl-21-deployment"
    },
    "dl-22-deep-learning-capstone": {
      "title": "DL-22: Deep Learning Capstone Project",
      "moduleId": "dl-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/dl-module-6/dl-22-deep-learning-capstone"
    },
    "tf-01-why-transformers": {
      "title": "TF-01: Why Transformers Were Introduced",
      "moduleId": "p6-m1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m1/tf-01-why-transformers"
    },
    "tf-02-tokenization-and-token-ids": {
      "title": "TF-02: Tokenization & Token IDs",
      "moduleId": "p6-m2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m2/tf-02-tokenization-and-token-ids"
    },
    "tf-03-embeddings-latent-space": {
      "title": "TF-03: Token Embeddings & Latent Space",
      "moduleId": "p6-m3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m3/tf-03-embeddings-latent-space"
    },
    "tf-04-positional-encoding": {
      "title": "TF-04: Positional Information & Positional Encoding",
      "moduleId": "p6-m4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m4/tf-04-positional-encoding"
    },
    "tf-05-query-key-value": {
      "title": "TF-05: Query, Key, and Value Vectors",
      "moduleId": "p6-m5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m5/tf-05-query-key-value"
    },
    "tf-06-scaled-dot-product-attention": {
      "title": "TF-06: Scaled Dot-Product Self-Attention",
      "moduleId": "p6-m6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m6/tf-06-scaled-dot-product-attention"
    },
    "tf-07-attention-masks-causal": {
      "title": "TF-07: Attention Masks (Causal & Padding Masks)",
      "moduleId": "p6-m7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m7/tf-07-attention-masks-causal"
    },
    "tf-08-multi-head-attention": {
      "title": "TF-08: Multi-Head Attention (MHA)",
      "moduleId": "p6-m8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m8/tf-08-multi-head-attention"
    },
    "tf-09-residual-layer-norm": {
      "title": "TF-09: Residual Connections & Layer Normalization",
      "moduleId": "p6-m9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m9/tf-09-residual-layer-norm"
    },
    "tf-10-feed-forward-networks": {
      "title": "TF-10: Feed-Forward Blocks (FFN / MLP)",
      "moduleId": "p6-m10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m10/tf-10-feed-forward-networks"
    },
    "tf-11-encoder-decoder-architectures": {
      "title": "TF-11: Encoder-Only, Decoder-Only & Encoder-Decoder",
      "moduleId": "p6-m11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m11/tf-11-encoder-decoder-architectures"
    },
    "tf-12-autoregressive-generation-kv-cache": {
      "title": "TF-12: Autoregressive Generation & KV Caching",
      "moduleId": "p6-m12",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m12/tf-12-autoregressive-generation-kv-cache"
    },
    "tf-13-pytorch-transformer-block": {
      "title": "TF-13: Implement a Small Transformer in PyTorch",
      "moduleId": "p6-m13",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m13/tf-13-pytorch-transformer-block"
    },
    "tf-14-attention-weights-limitations": {
      "title": "TF-14: Inspect Attention Weights & Limitations",
      "moduleId": "p6-m14",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m14/tf-14-attention-weights-limitations"
    },
    "tf-15-transformer-mini-project": {
      "title": "TF-15: Transformer Mini-Project: Character-Level Generator",
      "moduleId": "p6-m15",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p6-m15/tf-15-transformer-mini-project"
    },
    "genai-01-foundations": {
      "title": "GenAI-01: Generative AI Foundations",
      "moduleId": "p7-m1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m1/genai-01-foundations"
    },
    "genai-02-how-llms-work": {
      "title": "GenAI-02: How LLMs Work",
      "moduleId": "p7-m2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m2/genai-02-how-llms-work"
    },
    "genai-03-tokenization-in-llms": {
      "title": "GenAI-03: Tokenization in Large Language Models",
      "moduleId": "p7-m3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m3/genai-03-tokenization-in-llms"
    },
    "genai-04-embeddings-representations": {
      "title": "GenAI-04: Embeddings and Representations",
      "moduleId": "p7-m4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m4/genai-04-embeddings-representations"
    },
    "genai-05-pretraining-dynamics": {
      "title": "GenAI-05: Pretraining Dynamics",
      "moduleId": "p7-m5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m5/genai-05-pretraining-dynamics"
    },
    "genai-06-inference-and-decoding": {
      "title": "GenAI-06: Inference and Decoding",
      "moduleId": "p7-m6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m6/genai-06-inference-and-decoding"
    },
    "genai-07-prompt-engineering": {
      "title": "GenAI-07: Prompt Engineering",
      "moduleId": "p7-m7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m7/genai-07-prompt-engineering"
    },
    "genai-08-context-windows-memory": {
      "title": "GenAI-08: Context Windows and Memory",
      "moduleId": "p7-m8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m8/genai-08-context-windows-memory"
    },
    "genai-09-supervised-fine-tuning": {
      "title": "GenAI-09: Supervised Fine-Tuning",
      "moduleId": "p7-m9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m9/genai-09-supervised-fine-tuning"
    },
    "genai-10-peft-lora-qlora": {
      "title": "GenAI-10: Parameter-Efficient Fine-Tuning: LoRA & QLoRA",
      "moduleId": "p7-m10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m10/genai-10-peft-lora-qlora"
    },
    "genai-11-quantization-optimization": {
      "title": "GenAI-11: Quantization and Model Optimization",
      "moduleId": "p7-m11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m11/genai-11-quantization-optimization"
    },
    "genai-12-open-vs-hosted-models": {
      "title": "GenAI-12: Open and Hosted Language Models",
      "moduleId": "p7-m12",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m12/genai-12-open-vs-hosted-models"
    },
    "genai-13-llm-evaluation": {
      "title": "GenAI-13: LLM Evaluation",
      "moduleId": "p7-m13",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m13/genai-13-llm-evaluation"
    },
    "genai-14-safety-and-reliability": {
      "title": "GenAI-14: LLM Safety and Reliability",
      "moduleId": "p7-m14",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m14/genai-14-safety-and-reliability"
    },
    "genai-15-llm-capstone": {
      "title": "GenAI-15: LLM Capstone: Educational LLM Application",
      "moduleId": "p7-m15",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p7-m15/genai-15-llm-capstone"
    },
    "rag-01-fundamentals": {
      "title": "RAG-01: RAG Fundamentals & Architecture",
      "moduleId": "p8-m1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m1/rag-01-fundamentals"
    },
    "rag-02-document-ingestion": {
      "title": "RAG-02: Document Ingestion, Parsing & Metadata",
      "moduleId": "p8-m2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m2/rag-02-document-ingestion"
    },
    "rag-03-chunking-strategies": {
      "title": "RAG-03: Chunking Strategies & Boundary Optimization",
      "moduleId": "p8-m3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m3/rag-03-chunking-strategies"
    },
    "rag-04-embeddings-semantic-search": {
      "title": "RAG-04: Embeddings & Semantic Representation",
      "moduleId": "p8-m4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m4/rag-04-embeddings-semantic-search"
    },
    "rag-05-vector-search-fundamentals": {
      "title": "RAG-05: Vector Search Fundamentals & Distance Metrics",
      "moduleId": "p8-m5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m5/rag-05-vector-search-fundamentals"
    },
    "rag-06-vector-databases-indexing": {
      "title": "RAG-06: Vector Databases & Indexing (HNSW & IVF)",
      "moduleId": "p8-m6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m6/rag-06-vector-databases-indexing"
    },
    "rag-07-retrieval-quality-metrics": {
      "title": "RAG-07: Retrieval Quality & Evaluation Metrics",
      "moduleId": "p8-m7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m7/rag-07-retrieval-quality-metrics"
    },
    "rag-08-hybrid-retrieval-rrf": {
      "title": "RAG-08: Hybrid Retrieval & Reciprocal Rank Fusion",
      "moduleId": "p8-m8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m8/rag-08-hybrid-retrieval-rrf"
    },
    "rag-09-reranking-query-transform": {
      "title": "RAG-09: Reranking & Query Transformation",
      "moduleId": "p8-m9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m9/rag-09-reranking-query-transform"
    },
    "rag-10-grounded-context-assembly": {
      "title": "RAG-10: Constructing Grounded Context & Token Budgets",
      "moduleId": "p8-m10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m10/rag-10-grounded-context-assembly"
    },
    "rag-11-rag-generation-groundedness": {
      "title": "RAG-11: RAG Generation & Grounded Prompting",
      "moduleId": "p8-m11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m11/rag-11-rag-generation-groundedness"
    },
    "rag-12-advanced-rag-patterns": {
      "title": "RAG-12: Advanced RAG Patterns & Corrective Loops",
      "moduleId": "p8-m12",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m12/rag-12-advanced-rag-patterns"
    },
    "rag-13-rag-evaluation-ragas": {
      "title": "RAG-13: End-to-End RAG Evaluation (RAGAS & TruLens)",
      "moduleId": "p8-m13",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m13/rag-13-rag-evaluation-ragas"
    },
    "rag-14-rag-security-production": {
      "title": "RAG-14: RAG Security & Production Engineering",
      "moduleId": "p8-m14",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m14/rag-14-rag-security-production"
    },
    "rag-15-production-rag-capstone": {
      "title": "RAG-15: Production RAG Capstone: Grounded Q&A Engine",
      "moduleId": "p8-m15",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p8-m15/rag-15-production-rag-capstone"
    },
    "agent-01-fundamentals": {
      "title": "Agent-01: Agentic Systems Fundamentals",
      "moduleId": "p9-m1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m1/agent-01-fundamentals"
    },
    "agent-02-architecture": {
      "title": "Agent-02: Core Architecture & Control Loops",
      "moduleId": "p9-m2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m2/agent-02-architecture"
    },
    "agent-03-tool-calling": {
      "title": "Agent-03: Tool Calling, Function Schemas & Error Handling",
      "moduleId": "p9-m3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m3/agent-03-tool-calling"
    },
    "agent-04-state-memory": {
      "title": "Agent-04: Working State, Memory Tiers & Compaction",
      "moduleId": "p9-m4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m4/agent-04-state-memory"
    },
    "agent-05-planning": {
      "title": "Agent-05: Task Decomposition, DAG Planning & Dynamic Replanning",
      "moduleId": "p9-m5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m5/agent-05-planning"
    },
    "agent-06-orchestration": {
      "title": "Agent-06: Workflow Orchestration, State Machines & Idempotent Retries",
      "moduleId": "p9-m6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m6/agent-06-orchestration"
    },
    "agent-07-rag-agents": {
      "title": "Agent-07: Retrieval-Augmented Agents & Tool-Based Search",
      "moduleId": "p9-m7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m7/agent-07-rag-agents"
    },
    "agent-08-multi-agent": {
      "title": "Agent-08: Multi-Agent Teams, Handoffs & Context Isolation",
      "moduleId": "p9-m8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m8/agent-08-multi-agent"
    },
    "agent-09-human-in-the-loop": {
      "title": "Agent-09: Human-in-the-Loop Safeguards & Approval Gates",
      "moduleId": "p9-m9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m9/agent-09-human-in-the-loop"
    },
    "agent-10-evaluation": {
      "title": "Agent-10: Agent Evaluation, Benchmarks & Trajectory Metrics",
      "moduleId": "p9-m10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m10/agent-10-evaluation"
    },
    "agent-11-safety-security": {
      "title": "Agent-11: Safety, Indirect Prompt Injection & Sandboxed Execution",
      "moduleId": "p9-m11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m11/agent-11-safety-security"
    },
    "agent-12-observability": {
      "title": "Agent-12: Observability, Trace Spans & Circuit Breakers",
      "moduleId": "p9-m12",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m12/agent-12-observability"
    },
    "agent-13-advanced-patterns": {
      "title": "Agent-13: Advanced Agent Patterns: Reflection, Routers & Event Loops",
      "moduleId": "p9-m13",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m13/agent-13-advanced-patterns"
    },
    "agent-14-production-agent": {
      "title": "Agent-14: Production Engineering, Session Isolation & Graceful Degradation",
      "moduleId": "p9-m14",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m14/agent-14-production-agent"
    },
    "agent-15-capstone": {
      "title": "Agent-15: Capstone: Production Task Assistant with HITL & Traces",
      "moduleId": "p9-m15",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p9-m15/agent-15-capstone"
    },
    "mlops-01-fundamentals": {
      "title": "MLOps-01: MLOps Fundamentals & Lifecycle",
      "moduleId": "p10-m1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m1/mlops-01-fundamentals"
    },
    "mlops-02-experiment-tracking": {
      "title": "MLOps-02: Experiment Tracking & Run Attribution",
      "moduleId": "p10-m2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m2/mlops-02-experiment-tracking"
    },
    "mlops-03-data-model-versioning": {
      "title": "MLOps-03: Data & Model Versioning (DVC & Git)",
      "moduleId": "p10-m3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m3/mlops-03-data-model-versioning"
    },
    "mlops-04-pipelines-automation": {
      "title": "MLOps-04: ML Pipelines & DAG Automation",
      "moduleId": "p10-m4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m4/mlops-04-pipelines-automation"
    },
    "mlops-05-packaging-environments": {
      "title": "MLOps-05: Model Packaging & Docker Environments",
      "moduleId": "p10-m5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m5/mlops-05-packaging-environments"
    },
    "mlops-06-serving-apis": {
      "title": "MLOps-06: Model Serving & REST APIs with FastAPI",
      "moduleId": "p10-m6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m6/mlops-06-serving-apis"
    },
    "mlops-07-cicd-ml": {
      "title": "MLOps-07: CI/CD for Machine Learning & Quality Gates",
      "moduleId": "p10-m7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m7/mlops-07-cicd-ml"
    },
    "mlops-08-registry-releases": {
      "title": "MLOps-08: Model Registry, Promotion & Release Strategies",
      "moduleId": "p10-m8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m8/mlops-08-registry-releases"
    },
    "mlops-09-monitoring-drift": {
      "title": "MLOps-09: Production Monitoring, Data Drift & Concept Drift",
      "moduleId": "p10-m9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m9/mlops-09-monitoring-drift"
    },
    "mlops-10-llmops-fundamentals": {
      "title": "LLMOps-10: LLMOps Fundamentals & Prompt Versioning",
      "moduleId": "p10-m10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m10/mlops-10-llmops-fundamentals"
    },
    "mlops-11-llm-eval-testing": {
      "title": "LLMOps-11: LLM Evaluation Harnesses & LLM-as-a-Judge",
      "moduleId": "p10-m11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m11/mlops-11-llm-eval-testing"
    },
    "mlops-12-observability-tracing": {
      "title": "LLMOps-12: LLM Observability, Traces & PII Sanitization",
      "moduleId": "p10-m12",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m12/mlops-12-observability-tracing"
    },
    "mlops-13-cost-reliability-performance": {
      "title": "LLMOps-13: LLM Cost Optimization, Reliability & Rate Limits",
      "moduleId": "p10-m13",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m13/mlops-13-cost-reliability-performance"
    },
    "mlops-14-governance-security": {
      "title": "LLMOps-14: Production AI Governance, Security & Guardrails",
      "moduleId": "p10-m14",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m14/mlops-14-governance-security"
    },
    "mlops-15-production-capstone": {
      "title": "MLOps-15: Production Capstone: Hybrid ML + LLM System",
      "moduleId": "p10-m15",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p10-m15/mlops-15-production-capstone"
    },
    "deploy-01-fundamentals": {
      "title": "Deploy-01: AI Deployment Fundamentals & Architecture",
      "moduleId": "p11-m1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m1/deploy-01-fundamentals"
    },
    "deploy-02-linux-servers": {
      "title": "Deploy-02: Linux and Server Fundamentals for AI Systems",
      "moduleId": "p11-m2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m2/deploy-02-linux-servers"
    },
    "deploy-03-networking-http-dns": {
      "title": "Deploy-03: Networking, HTTP, DNS & Reverse Proxies",
      "moduleId": "p11-m3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m3/deploy-03-networking-http-dns"
    },
    "deploy-04-docker-ai": {
      "title": "Deploy-04: Docker & Containerization for AI Systems",
      "moduleId": "p11-m4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m4/deploy-04-docker-ai"
    },
    "deploy-05-production-apis": {
      "title": "Deploy-05: Production API Engineering with FastAPI",
      "moduleId": "p11-m5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m5/deploy-05-production-apis"
    },
    "deploy-06-cloud-computing": {
      "title": "Deploy-06: Cloud Computing Fundamentals for AI Systems",
      "moduleId": "p11-m6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m6/deploy-06-cloud-computing"
    },
    "deploy-07-deploying-ai-apps": {
      "title": "Deploy-07: Deploying AI Applications (Frontend, Backend & Models)",
      "moduleId": "p11-m7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m7/deploy-07-deploying-ai-apps"
    },
    "deploy-08-storage-artifacts": {
      "title": "Deploy-08: Cloud Storage & Model Artifact Management",
      "moduleId": "p11-m8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m8/deploy-08-storage-artifacts"
    },
    "deploy-09-scaling-load-balancing": {
      "title": "Deploy-09: Scaling & Load Balancing AI Inference Services",
      "moduleId": "p11-m9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m9/deploy-09-scaling-load-balancing"
    },
    "deploy-10-background-async-jobs": {
      "title": "Deploy-10: Background Jobs & Asynchronous Inference",
      "moduleId": "p11-m10",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m10/deploy-10-background-async-jobs"
    },
    "deploy-11-gpu-dl-serving": {
      "title": "Deploy-11: GPU Acceleration & Deep Learning Serving",
      "moduleId": "p11-m11",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m11/deploy-11-gpu-dl-serving"
    },
    "deploy-12-production-llm-serving": {
      "title": "Deploy-12: Production LLM Serving & Streaming Architectures",
      "moduleId": "p11-m12",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m12/deploy-12-production-llm-serving"
    },
    "deploy-13-security-reliability": {
      "title": "Deploy-13: Production AI Security, Privacy & Reliability",
      "moduleId": "p11-m13",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m13/deploy-13-security-reliability"
    },
    "deploy-14-observability-costs": {
      "title": "Deploy-14: Production Observability & Cloud Cost Optimization",
      "moduleId": "p11-m14",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m14/deploy-14-observability-costs"
    },
    "deploy-15-capstone-deployment": {
      "title": "Deploy-15: Capstone — Deploy a Production AI Platform",
      "moduleId": "p11-m15",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/p11-m15/deploy-15-capstone-deployment"
    },
    "numpy-m1-l1": {
      "title": "What NumPy Is & Why It Matters in Data Science",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l1"
    },
    "numpy-m1-l2": {
      "title": "Python Lists vs NumPy Arrays (Performance, Memory & Homogeneity)",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l2"
    },
    "numpy-m1-l3": {
      "title": "Installing, Importing & Environment Setup",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l3"
    },
    "numpy-m1-l4": {
      "title": "Creating Arrays with np.array() & Nested Sequences",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l4"
    },
    "numpy-m1-l5": {
      "title": "Creating Arrays with zeros(), ones(), and full()",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l5"
    },
    "numpy-m1-l6": {
      "title": "Step-based Sequences with arange() and linspace()",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l6"
    },
    "numpy-m1-l7": {
      "title": "Creating Identity and Diagonal Arrays (eye, identity, diag)",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l7"
    },
    "numpy-m1-l8": {
      "title": "Understanding 1D, 2D, and Multidimensional Arrays",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l8"
    },
    "numpy-m1-l9": {
      "title": "Array Attributes: shape, ndim, size, and dtype",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l9"
    },
    "numpy-m1-l10": {
      "title": "Safe Type Conversion with astype()",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l10"
    },
    "numpy-m1-l11": {
      "title": "Integer, Floating-Point, and Boolean Arrays",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l11"
    },
    "numpy-m1-l12": {
      "title": "Memory Layout, Contiguity & Buffer Foundations",
      "moduleId": "numpy-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-1/numpy-m1-l12"
    },
    "numpy-m2-l1": {
      "title": "Accessing Elements in One-Dimensional Arrays",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l1"
    },
    "numpy-m2-l2": {
      "title": "Indexing Two-Dimensional Arrays",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l2"
    },
    "numpy-m2-l3": {
      "title": "Slicing Arrays with [start:stop:step] Across Dimensions",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l3"
    },
    "numpy-m2-l4": {
      "title": "Negative Indexing & Reversing Array Dimensions",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l4"
    },
    "numpy-m2-l5": {
      "title": "Boolean Indexing & Conditional Filtering",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l5"
    },
    "numpy-m2-l6": {
      "title": "Fancy Indexing with Integer Arrays & Index Lists",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l6"
    },
    "numpy-m2-l7": {
      "title": "Reshaping Arrays with reshape() and Auto-Dimension -1",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l7"
    },
    "numpy-m2-l8": {
      "title": "Flattening Dimensions: flatten() vs ravel() In-Depth",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l8"
    },
    "numpy-m2-l9": {
      "title": "Transposing Matrices with .T and np.transpose()",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l9"
    },
    "numpy-m2-l10": {
      "title": "Adding & Removing Dimensions (newaxis, expand_dims, squeeze)",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l10"
    },
    "numpy-m2-l11": {
      "title": "Understanding Views versus Copies in NumPy",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l11"
    },
    "numpy-m2-l12": {
      "title": "Combining Indexing, Slicing & Filtering in Real Pipelines",
      "moduleId": "numpy-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-2/numpy-m2-l12"
    },
    "numpy-m3-l1": {
      "title": "Arithmetic Operations on Arrays",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l1"
    },
    "numpy-m3-l2": {
      "title": "Element-Wise Calculations Across Arrays",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l2"
    },
    "numpy-m3-l3": {
      "title": "Comparison Operators (>, <, ==, !=, >=, <=)",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l3"
    },
    "numpy-m3-l4": {
      "title": "Logical Operations (logical_and, logical_or, logical_not)",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l4"
    },
    "numpy-m3-l5": {
      "title": "Universal Functions (sqrt, exp, log, abs)",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l5"
    },
    "numpy-m3-l6": {
      "title": "Broadcasting Rules and Dimension Alignment",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l6"
    },
    "numpy-m3-l7": {
      "title": "Aggregation Functions (sum, prod, cumsum, cumprod)",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l7"
    },
    "numpy-m3-l8": {
      "title": "Understanding Axis 0 versus Axis 1 Across Matrices",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l8"
    },
    "numpy-m3-l9": {
      "title": "Sorting Arrays (sort, argsort, lexsort)",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l9"
    },
    "numpy-m3-l10": {
      "title": "Finding Unique Values & Counts with unique()",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l10"
    },
    "numpy-m3-l11": {
      "title": "Counting Occurrences & Histogram Binning (bincount)",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l11"
    },
    "numpy-m3-l12": {
      "title": "Searching Arrays (where, nonzero, argmax, argmin)",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l12"
    },
    "numpy-m3-l13": {
      "title": "Boolean Masks and Advanced Conditional Filtering",
      "moduleId": "numpy-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-3/numpy-m3-l13"
    },
    "numpy-m4-l1": {
      "title": "Sum, Mean, Median, Minimum, and Maximum",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l1"
    },
    "numpy-m4-l2": {
      "title": "Variance and Standard Deviation",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l2"
    },
    "numpy-m4-l3": {
      "title": "Percentiles, Quantiles, and Interquartile Range (IQR)",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l3"
    },
    "numpy-m4-l4": {
      "title": "Vector Dot Products and Geometric Projections",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l4"
    },
    "numpy-m4-l5": {
      "title": "Matrix Multiplication with np.matmul() and the @ Operator",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l5"
    },
    "numpy-m4-l6": {
      "title": "Basic Linear Algebra (np.linalg.inv, det, solve)",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l6"
    },
    "numpy-m4-l7": {
      "title": "Random Number Generation with np.random.default_rng()",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l7"
    },
    "numpy-m4-l8": {
      "title": "Reproducible Random Numbers & Seed Management",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l8"
    },
    "numpy-m4-l9": {
      "title": "Random Sampling and Probability Distributions",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l9"
    },
    "numpy-m4-l10": {
      "title": "Covariance and Correlation Analysis",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l10"
    },
    "numpy-m4-l11": {
      "title": "Handling Missing and NaN Values with NumPy Functions",
      "moduleId": "numpy-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-4/numpy-m4-l11"
    },
    "numpy-m5-l1": {
      "title": "Principles of Vectorization in Numerical Computing",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l1"
    },
    "numpy-m5-l2": {
      "title": "Python Loops vs Vectorized Calculations",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l2"
    },
    "numpy-m5-l3": {
      "title": "Broadcasting Rules in Practical Examples",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l3"
    },
    "numpy-m5-l4": {
      "title": "Conditional Selection with np.where()",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l4"
    },
    "numpy-m5-l5": {
      "title": "Multi-Condition Selection with np.select()",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l5"
    },
    "numpy-m5-l6": {
      "title": "Combining Arrays with np.concatenate()",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l6"
    },
    "numpy-m5-l7": {
      "title": "Concatenation and Stacking (vstack, hstack, column_stack)",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l7"
    },
    "numpy-m5-l8": {
      "title": "Splitting Arrays (split, hsplit, vsplit)",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l8"
    },
    "numpy-m5-l9": {
      "title": "Sorting and Filtering Efficiently (partition, argpartition)",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l9"
    },
    "numpy-m5-l10": {
      "title": "Views, Copies, and Memory Allocation Considerations",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l10"
    },
    "numpy-m5-l11": {
      "title": "Performance Benchmarking with Timing Methods",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l11"
    },
    "numpy-m5-l12": {
      "title": "Common NumPy Errors and Debugging Techniques",
      "moduleId": "numpy-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-5/numpy-m5-l12"
    },
    "numpy-m6-l1": {
      "title": "Loading and Saving Numerical Data",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l1"
    },
    "numpy-m6-l2": {
      "title": "Working with CSV Data using genfromtxt()",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l2"
    },
    "numpy-m6-l3": {
      "title": "Generating Synthetic Datasets for ML Experiments",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l3"
    },
    "numpy-m6-l4": {
      "title": "Feature Normalization (Min-Max Scaling) from Scratch",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l4"
    },
    "numpy-m6-l5": {
      "title": "Feature Standardization (Z-Score) & Training-Set Parameter Fitting",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l5"
    },
    "numpy-m6-l6": {
      "title": "Calculating Distances Between Observations (Euclidean, Manhattan)",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l6"
    },
    "numpy-m6-l7": {
      "title": "Feature Transformations (Polynomials, Log Scales)",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l7"
    },
    "numpy-m6-l8": {
      "title": "Preparing Numerical Feature Arrays (X) and Targets (y) for ML",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l8"
    },
    "numpy-m6-l9": {
      "title": "Understanding the Relationship Between NumPy and Pandas",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l9"
    },
    "numpy-m6-l10": {
      "title": "Common NumPy Operations Used Inside Scikit-Learn",
      "moduleId": "numpy-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-module-6/numpy-m6-l10"
    },
    "numpy-fp-student-analytics": {
      "title": "Capstone Project: Student Performance Analytics with NumPy",
      "moduleId": "numpy-final-project",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/numpy-final-project/numpy-fp-student-analytics"
    },
    "pandas-m1-l1": {
      "title": "What Pandas Is & Why It Is Useful",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l1"
    },
    "pandas-m1-l2": {
      "title": "Series versus DataFrame Fundamentals",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l2"
    },
    "pandas-m1-l3": {
      "title": "Creating Series from Lists, Dictionaries, and Scalars",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l3"
    },
    "pandas-m1-l4": {
      "title": "Creating DataFrames from Dictionaries, Records, and Arrays",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l4"
    },
    "pandas-m1-l5": {
      "title": "Reading CSV Files with read_csv() & Critical Parameters",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l5"
    },
    "pandas-m1-l6": {
      "title": "Reading Excel Spreadsheets with read_excel()",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l6"
    },
    "pandas-m1-l7": {
      "title": "Understanding Indexes, Columns, and Underlying Values",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l7"
    },
    "pandas-m1-l8": {
      "title": "Understanding Data Types in Pandas",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l8"
    },
    "pandas-m1-l9": {
      "title": "Inspecting Data with head(), tail(), and sample()",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l9"
    },
    "pandas-m1-l10": {
      "title": "Structural and Statistical Summaries: info() and describe()",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l10"
    },
    "pandas-m1-l11": {
      "title": "Schema Attributes: shape, columns, and dtypes",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l11"
    },
    "pandas-m1-l12": {
      "title": "Building a Complete First-Look Dataset Inspection Workflow",
      "moduleId": "pandas-module-1",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-1/pandas-m1-l12"
    },
    "pandas-m2-l1": {
      "title": "Selecting a Single Column (Bracket vs Dot Notation)",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l1"
    },
    "pandas-m2-l2": {
      "title": "Selecting Multiple Columns with Column Lists",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l2"
    },
    "pandas-m2-l3": {
      "title": "Selecting Rows by Integer Offset & Slicing",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l3"
    },
    "pandas-m2-l4": {
      "title": "Label-Based Indexing with loc[]",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l4"
    },
    "pandas-m2-l5": {
      "title": "Position-Based Indexing with iloc[]",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l5"
    },
    "pandas-m2-l6": {
      "title": "Direct Comparison: loc[] versus iloc[] Rules and Traps",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l6"
    },
    "pandas-m2-l7": {
      "title": "Boolean Filtering on DataFrames",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l7"
    },
    "pandas-m2-l8": {
      "title": "Combining Multiple Conditions with & (AND) and | (OR)",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l8"
    },
    "pandas-m2-l9": {
      "title": "Membership Filtering with isin()",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l9"
    },
    "pandas-m2-l10": {
      "title": "Range Filtering with between()",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l10"
    },
    "pandas-m2-l11": {
      "title": "Clean Querying with query()",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l11"
    },
    "pandas-m2-l12": {
      "title": "Conditional Replacement with where() and mask()",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l12"
    },
    "pandas-m2-l13": {
      "title": "Sorting Values with sort_values()",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l13"
    },
    "pandas-m2-l14": {
      "title": "Sorting Indexes, Setting and Resetting Indexes",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l14"
    },
    "pandas-m2-l15": {
      "title": "Adding, Renaming, and Removing Columns (drop, rename, assign)",
      "moduleId": "pandas-module-2",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-2/pandas-m2-l15"
    },
    "pandas-m3-l1": {
      "title": "Recognizing Missing Data: None, np.nan, and pd.NA",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l1"
    },
    "pandas-m3-l2": {
      "title": "Detecting Missing Values with isna(), notna(), and isna().sum()",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l2"
    },
    "pandas-m3-l3": {
      "title": "Dropping Missing Values with dropna()",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l3"
    },
    "pandas-m3-l4": {
      "title": "Filling Missing Values with fillna()",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l4"
    },
    "pandas-m3-l5": {
      "title": "Mean, Median, Mode, and Constant Imputation",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l5"
    },
    "pandas-m3-l6": {
      "title": "Why Blindly Filling with Zero is Flawed",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l6"
    },
    "pandas-m3-l7": {
      "title": "Removing Duplicate Rows with duplicated() and drop_duplicates()",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l7"
    },
    "pandas-m3-l8": {
      "title": "Understanding Incorrect Data Types and Diagnostic Checks",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l8"
    },
    "pandas-m3-l9": {
      "title": "Converting Data Types with astype() and to_numeric()",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l9"
    },
    "pandas-m3-l10": {
      "title": "Cleaning Text Values with String Methods (.str)",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l10"
    },
    "pandas-m3-l11": {
      "title": "Handling Inconsistent Category Labels",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l11"
    },
    "pandas-m3-l12": {
      "title": "Identifying Outliers with IQR and Z-Score Rules",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l12"
    },
    "pandas-m3-l13": {
      "title": "Handling Invalid Numerical Values with clip()",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l13"
    },
    "pandas-m3-l14": {
      "title": "Parsing Dates with to_datetime() & Data Quality Checklists",
      "moduleId": "pandas-module-3",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-3/pandas-m3-l14"
    },
    "pandas-m4-l1": {
      "title": "Element-Wise Transformations: apply(), map(), and replace()",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l1"
    },
    "pandas-m4-l2": {
      "title": "Vectorized String Operations Using .str Accessor",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l2"
    },
    "pandas-m4-l3": {
      "title": "Date and Time Operations Using .dt Accessor",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l3"
    },
    "pandas-m4-l4": {
      "title": "Creating Conditional Columns with np.select() and np.where()",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l4"
    },
    "pandas-m4-l5": {
      "title": "Binning and Discretization with cut() (Equal Width)",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l5"
    },
    "pandas-m4-l6": {
      "title": "Quantile-Based Binning with qcut() (Equal Frequency)",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l6"
    },
    "pandas-m4-l7": {
      "title": "Memory Optimization with Categorical Data Types",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l7"
    },
    "pandas-m4-l8": {
      "title": "One-Hot Encoding Categorical Variables with get_dummies()",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l8"
    },
    "pandas-m4-l9": {
      "title": "Normalization and Standardization in Pandas",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l9"
    },
    "pandas-m4-l10": {
      "title": "High-Performance Transformation: Vectorization vs apply()",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l10"
    },
    "pandas-m4-l11": {
      "title": "Creating Useful Features from Existing Columns",
      "moduleId": "pandas-module-4",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-4/pandas-m4-l11"
    },
    "pandas-m5-l1": {
      "title": "The Split-Apply-Combine Paradigm Explained",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l1"
    },
    "pandas-m5-l2": {
      "title": "Grouping by a Single Column",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l2"
    },
    "pandas-m5-l3": {
      "title": "Grouping by Multiple Columns",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l3"
    },
    "pandas-m5-l4": {
      "title": "Standard Aggregation Functions: sum, mean, median, count, size, min, max",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l4"
    },
    "pandas-m5-l5": {
      "title": "Using agg() with Multiple Functions and Column Maps",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l5"
    },
    "pandas-m5-l6": {
      "title": "Named Aggregation for Clean Output Column Naming",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l6"
    },
    "pandas-m5-l7": {
      "title": "Broadcasting Group Calculations with transform()",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l7"
    },
    "pandas-m5-l8": {
      "title": "Direct Comparison: transform() versus agg()",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l8"
    },
    "pandas-m5-l9": {
      "title": "Filtering Groups by Aggregate Criteria with filter()",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l9"
    },
    "pandas-m5-l10": {
      "title": "Sorting and Ranking Within Groups",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l10"
    },
    "pandas-m5-l11": {
      "title": "Creating Multi-Dimensional Pivot Tables with pivot_table()",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l11"
    },
    "pandas-m5-l12": {
      "title": "Frequency Contingency Tables with crosstab()",
      "moduleId": "pandas-module-5",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-5/pandas-m5-l12"
    },
    "pandas-m6-l1": {
      "title": "Understanding Relational Dataset Relationships",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l1"
    },
    "pandas-m6-l2": {
      "title": "Vertical & Horizontal Concatenation with pd.concat()",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l2"
    },
    "pandas-m6-l3": {
      "title": "Relational Merging with pd.merge() Fundamentals",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l3"
    },
    "pandas-m6-l4": {
      "title": "Inner Joins: Intersection of Keys Across Tables",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l4"
    },
    "pandas-m6-l5": {
      "title": "Left Joins: Preserving Primary Records with Optional Lookups",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l5"
    },
    "pandas-m6-l6": {
      "title": "Right Joins: Preserving Right-Side Reference Records",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l6"
    },
    "pandas-m6-l7": {
      "title": "Outer Joins: Full Set Union with Missing Value Fills",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l7"
    },
    "pandas-m6-l8": {
      "title": "Specifying Join Keys: on, left_on, right_on, and Index Joins",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l8"
    },
    "pandas-m6-l9": {
      "title": "The Duplicate Key Trap: Diagnosing Accidental Row Explosions",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l9"
    },
    "pandas-m6-l10": {
      "title": "Validating Merge Cardinality with the validate Parameter",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l10"
    },
    "pandas-m6-l11": {
      "title": "Managing Overlapping Column Names with suffixes",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l11"
    },
    "pandas-m6-l12": {
      "title": "Index-Based Joining with DataFrame.join() vs merge()",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l12"
    },
    "pandas-m6-l13": {
      "title": "Joining on Time-Based and Non-Exact Keys with merge_asof()",
      "moduleId": "pandas-module-6",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-6/pandas-m6-l13"
    },
    "pandas-m7-l1": {
      "title": "Wide-Format versus Long-Format Data (Tidy Data)",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l1"
    },
    "pandas-m7-l2": {
      "title": "Melting Wide Data into Long Format with pd.melt()",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l2"
    },
    "pandas-m7-l3": {
      "title": "Reshaping Data with pivot()",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l3"
    },
    "pandas-m7-l4": {
      "title": "Multi-Metric Pivoting with pivot_table()",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l4"
    },
    "pandas-m7-l5": {
      "title": "Hierarchical Reshaping with stack() and unstack()",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l5"
    },
    "pandas-m7-l6": {
      "title": "MultiIndex Fundamentals: Indexing and Slicing Across Levels",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l6"
    },
    "pandas-m7-l7": {
      "title": "Exploding List-Like Columns with explode()",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l7"
    },
    "pandas-m7-l8": {
      "title": "Calculating Ranks with rank()",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l8"
    },
    "pandas-m7-l9": {
      "title": "Cumulative Sums, Products, and Extremes: cumsum, cumprod, cummax",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l9"
    },
    "pandas-m7-l10": {
      "title": "Cumulative Percentages and Pareto Analysis (80/20 Rule)",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l10"
    },
    "pandas-m7-l11": {
      "title": "Percentage Change with pct_change()",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l11"
    },
    "pandas-m7-l12": {
      "title": "Rolling Window Statistics with rolling() (Moving Averages, Volatility)",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l12"
    },
    "pandas-m7-l13": {
      "title": "Expanding Window Calculations with expanding()",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l13"
    },
    "pandas-m7-l14": {
      "title": "Time-Series Resampling with resample() (Downsampling & Upsampling)",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l14"
    },
    "pandas-m7-l15": {
      "title": "Working with Dates and Time Zones (tz_localize, tz_convert)",
      "moduleId": "pandas-module-7",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-7/pandas-m7-l15"
    },
    "pandas-m8-l1": {
      "title": "Vectorized Operations versus Python Loops in Pandas",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l1"
    },
    "pandas-m8-l2": {
      "title": "Avoiding Unnecessary apply() and iterrows() Traps",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l2"
    },
    "pandas-m8-l3": {
      "title": "Efficient Filtering and Index Selection Techniques",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l3"
    },
    "pandas-m8-l4": {
      "title": "Choosing Appropriate Data Types & Downcasting Integers/Floats",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l4"
    },
    "pandas-m8-l5": {
      "title": "Profiling Memory Footprint with df.info(memory_usage='deep')",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l5"
    },
    "pandas-m8-l6": {
      "title": "Copying versus Views in Pandas Memory Mechanics",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l6"
    },
    "pandas-m8-l7": {
      "title": "Avoiding Chained Assignment and the SettingWithCopyWarning",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l7"
    },
    "pandas-m8-l8": {
      "title": "Understanding and Preventing SettingWithCopyWarning in Practice",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l8"
    },
    "pandas-m8-l9": {
      "title": "Fluent Data Transformation with Method Chaining (assign, pipe)",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l9"
    },
    "pandas-m8-l10": {
      "title": "Reproducible Data Analysis and Environment Discipline",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l10"
    },
    "pandas-m8-l11": {
      "title": "Efficient CSV Reading with usecols, dtype, and parse_dates",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l11"
    },
    "pandas-m8-l12": {
      "title": "Reading Large Files in Chunks with chunksize",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l12"
    },
    "pandas-m8-l13": {
      "title": "Common Pandas Errors and Systematic Debugging Strategies",
      "moduleId": "pandas-module-8",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-8/pandas-m8-l13"
    },
    "pandas-m9-l1": {
      "title": "Cleanly Separating Feature Matrix X and Target Vector y",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l1"
    },
    "pandas-m9-l2": {
      "title": "Inspecting Shapes, Data Types, and Object Columns before ML",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l2"
    },
    "pandas-m9-l3": {
      "title": "Systematic Missing Value Audits and Pre-ML Imputation",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l3"
    },
    "pandas-m9-l4": {
      "title": "Dropping Data Leakage Columns, Identifiers, and High-Cardinality Noise",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l4"
    },
    "pandas-m9-l5": {
      "title": "One-Hot Encoding Categorical Variables with pd.get_dummies()",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l5"
    },
    "pandas-m9-l6": {
      "title": "Encoding Binary Features with Boolean Mapping and astype(int)",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l6"
    },
    "pandas-m9-l7": {
      "title": "Discretizing and Binning Continuous Features with pd.cut() and pd.qcut()",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l7"
    },
    "pandas-m9-l8": {
      "title": "Feature Engineering: Ratios, Differences, Interactions, and Domain Indicators",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l8"
    },
    "pandas-m9-l9": {
      "title": "Train-Test Splitting using Pandas df.sample() versus scikit-learn",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l9"
    },
    "pandas-m9-l10": {
      "title": "Feature Scaling and Normalization with Native Pandas Vector Math",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l10"
    },
    "pandas-m9-l11": {
      "title": "Converting DataFrames to NumPy Arrays with to_numpy() and .values",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l11"
    },
    "pandas-m9-l12": {
      "title": "Aligning Model Predictions and Residuals back into a DataFrame",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l12"
    },
    "pandas-m9-l13": {
      "title": "Generating Classification Confusion Matrices with pd.crosstab()",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l13"
    },
    "pandas-m9-l14": {
      "title": "Error Analysis: Filtering and Investigating Worst Model Failures",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l14"
    },
    "pandas-m9-l15": {
      "title": "Packaging an End-to-End Reusable Data Preparation Pipeline Function",
      "moduleId": "pandas-module-9",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-module-9/pandas-m9-l15"
    },
    "pandas-fp-l1": {
      "title": "End-to-End Sales Analytics Capstone: Data Cleaning, Wrangling, GroupBy & Forecasting",
      "moduleId": "pandas-project",
      "trackId": "ml",
      "trackTitle": "Complete AI & ML",
      "route": "/curriculum/pandas-project/pandas-fp-l1"
    },
    "dsa-foundations-what-is-dsa": {
      "title": "What Are Data Structures and Algorithms?",
      "moduleId": "dsa-module-1",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-1/dsa-foundations-what-is-dsa"
    },
    "dsa-foundations-time-complexity": {
      "title": "Time Complexity Analysis",
      "moduleId": "dsa-module-1",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-1/dsa-foundations-time-complexity"
    },
    "dsa-foundations-big-o": {
      "title": "Big O, Big Omega, and Big Theta Notation",
      "moduleId": "dsa-module-1",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-1/dsa-foundations-big-o"
    },
    "dsa-foundations-cases": {
      "title": "Best, Average, and Worst Case Analysis",
      "moduleId": "dsa-module-1",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-1/dsa-foundations-cases"
    },
    "dsa-foundations-recursion": {
      "title": "Recursion Fundamentals",
      "moduleId": "dsa-module-1",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-1/dsa-foundations-recursion"
    },
    "dsa-foundations-recurrence": {
      "title": "Recurrence Relations and Master Theorem",
      "moduleId": "dsa-module-1",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-1/dsa-foundations-recurrence"
    },
    "dsa-arrays-operations": {
      "title": "Array Operations and Memory Layout",
      "moduleId": "dsa-module-2",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-2/dsa-arrays-operations"
    },
    "dsa-arrays-prefix-sums": {
      "title": "Prefix Sums and Difference Arrays",
      "moduleId": "dsa-module-2",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-2/dsa-arrays-prefix-sums"
    },
    "dsa-arrays-two-pointers": {
      "title": "Two Pointer Technique",
      "moduleId": "dsa-module-2",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-2/dsa-arrays-two-pointers"
    },
    "dsa-arrays-sliding-window": {
      "title": "Sliding Window",
      "moduleId": "dsa-module-2",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-2/dsa-arrays-sliding-window"
    },
    "dsa-arrays-kadane": {
      "title": "Kadane's Algorithm — Maximum Subarray",
      "moduleId": "dsa-module-2",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-2/dsa-arrays-kadane"
    },
    "dsa-arrays-binary-search": {
      "title": "Binary Search",
      "moduleId": "dsa-module-2",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-2/dsa-arrays-binary-search"
    },
    "dsa-arrays-binary-search-variations": {
      "title": "Binary Search Variations",
      "moduleId": "dsa-module-2",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-2/dsa-arrays-binary-search-variations"
    },
    "dsa-arrays-rotated": {
      "title": "Search in Rotated Sorted Arrays",
      "moduleId": "dsa-module-2",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-2/dsa-arrays-rotated"
    },
    "dsa-arrays-matrix": {
      "title": "Matrix Traversal and Algorithms",
      "moduleId": "dsa-module-2",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-2/dsa-arrays-matrix"
    },
    "dsa-strings-operations": {
      "title": "String Representation and Operations",
      "moduleId": "dsa-module-3",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-3/dsa-strings-operations"
    },
    "dsa-strings-frequency": {
      "title": "Frequency Counting Techniques",
      "moduleId": "dsa-module-3",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-3/dsa-strings-frequency"
    },
    "dsa-strings-hash-tables": {
      "title": "Hash Tables and Collision Resolution",
      "moduleId": "dsa-module-3",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-3/dsa-strings-hash-tables"
    },
    "dsa-strings-hash-maps-sets": {
      "title": "Hash Maps and Hash Sets",
      "moduleId": "dsa-module-3",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-3/dsa-strings-hash-maps-sets"
    },
    "dsa-strings-anagram-palindrome": {
      "title": "Anagram and Palindrome Algorithms",
      "moduleId": "dsa-module-3",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-3/dsa-strings-anagram-palindrome"
    },
    "dsa-strings-matching": {
      "title": "String Matching — Naive and Boyer-Moore",
      "moduleId": "dsa-module-3",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-3/dsa-strings-matching"
    },
    "dsa-strings-kmp": {
      "title": "KMP and Rabin-Karp Algorithms",
      "moduleId": "dsa-module-3",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-3/dsa-strings-kmp"
    },
    "dsa-strings-trie": {
      "title": "Trie Data Structure",
      "moduleId": "dsa-module-3",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-3/dsa-strings-trie"
    },
    "dsa-ll-singly": {
      "title": "Singly Linked Lists",
      "moduleId": "dsa-module-4",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-4/dsa-ll-singly"
    },
    "dsa-ll-doubly": {
      "title": "Doubly Linked Lists",
      "moduleId": "dsa-module-4",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-4/dsa-ll-doubly"
    },
    "dsa-ll-circular": {
      "title": "Circular Linked Lists",
      "moduleId": "dsa-module-4",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-4/dsa-ll-circular"
    },
    "dsa-ll-insert-delete": {
      "title": "Insertion and Deletion",
      "moduleId": "dsa-module-4",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-4/dsa-ll-insert-delete"
    },
    "dsa-ll-reversal": {
      "title": "Linked List Reversal",
      "moduleId": "dsa-module-4",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-4/dsa-ll-reversal"
    },
    "dsa-ll-fast-slow": {
      "title": "Fast and Slow Pointer Technique",
      "moduleId": "dsa-module-4",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-4/dsa-ll-fast-slow"
    },
    "dsa-ll-cycle-detection": {
      "title": "Floyd's Cycle Detection Algorithm",
      "moduleId": "dsa-module-4",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-4/dsa-ll-cycle-detection"
    },
    "dsa-ll-merge-sorted": {
      "title": "Merging Sorted Linked Lists",
      "moduleId": "dsa-module-4",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-4/dsa-ll-merge-sorted"
    },
    "dsa-ll-middle-intersection": {
      "title": "Finding Middle and List Intersection",
      "moduleId": "dsa-module-4",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-4/dsa-ll-middle-intersection"
    },
    "dsa-stack-operations": {
      "title": "Stack: Operations and Applications",
      "moduleId": "dsa-module-5",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-5/dsa-stack-operations"
    },
    "dsa-queue-operations": {
      "title": "Queue and Circular Queue",
      "moduleId": "dsa-module-5",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-5/dsa-queue-operations"
    },
    "dsa-deque": {
      "title": "Deque — Double-Ended Queue",
      "moduleId": "dsa-module-5",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-5/dsa-deque"
    },
    "dsa-monotonic-stack": {
      "title": "Monotonic Stack and Queue",
      "moduleId": "dsa-module-5",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-5/dsa-monotonic-stack"
    },
    "dsa-balanced-parentheses": {
      "title": "Balanced Parentheses",
      "moduleId": "dsa-module-5",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-5/dsa-balanced-parentheses"
    },
    "dsa-next-greater-element": {
      "title": "Next Greater Element",
      "moduleId": "dsa-module-5",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-5/dsa-next-greater-element"
    },
    "dsa-min-stack": {
      "title": "Min Stack Design",
      "moduleId": "dsa-module-5",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-5/dsa-min-stack"
    },
    "dsa-expression-parsing": {
      "title": "Infix, Postfix, and Prefix Expressions",
      "moduleId": "dsa-module-5",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-5/dsa-expression-parsing"
    },
    "dsa-recursion-trees-calls": {
      "title": "Recursion Trees and Call Stacks",
      "moduleId": "dsa-module-6",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-6/dsa-recursion-trees-calls"
    },
    "dsa-recursion-subsets": {
      "title": "Subsets and Subsequences",
      "moduleId": "dsa-module-6",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-6/dsa-recursion-subsets"
    },
    "dsa-recursion-permutations": {
      "title": "Permutations and Combinations",
      "moduleId": "dsa-module-6",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-6/dsa-recursion-permutations"
    },
    "dsa-backtracking-n-queens": {
      "title": "N-Queens Problem",
      "moduleId": "dsa-module-6",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-6/dsa-backtracking-n-queens"
    },
    "dsa-backtracking-sudoku": {
      "title": "Sudoku Solver",
      "moduleId": "dsa-module-6",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-6/dsa-backtracking-sudoku"
    },
    "dsa-backtracking-maze": {
      "title": "Maze and Path Problems",
      "moduleId": "dsa-module-6",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-6/dsa-backtracking-maze"
    },
    "dsa-backtracking-pruning": {
      "title": "Pruning and Backtracking Optimization",
      "moduleId": "dsa-module-6",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-6/dsa-backtracking-pruning"
    },
    "dsa-sort-basic": {
      "title": "Bubble, Selection, and Insertion Sort",
      "moduleId": "dsa-module-7",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-7/dsa-sort-basic"
    },
    "dsa-sort-merge": {
      "title": "Merge Sort",
      "moduleId": "dsa-module-7",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-7/dsa-sort-merge"
    },
    "dsa-sort-quick": {
      "title": "Quick Sort",
      "moduleId": "dsa-module-7",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-7/dsa-sort-quick"
    },
    "dsa-sort-heap": {
      "title": "Heap Sort",
      "moduleId": "dsa-module-7",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-7/dsa-sort-heap"
    },
    "dsa-sort-counting-radix": {
      "title": "Counting Sort and Radix Sort",
      "moduleId": "dsa-module-7",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-7/dsa-sort-counting-radix"
    },
    "dsa-sort-stability": {
      "title": "Sorting Stability and In-Place Sorting",
      "moduleId": "dsa-module-7",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-7/dsa-sort-stability"
    },
    "dsa-sort-tradeoffs": {
      "title": "Sorting Algorithm Trade-offs and Choosing the Right Sort",
      "moduleId": "dsa-module-7",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-7/dsa-sort-tradeoffs"
    },
    "dsa-tree-terminology": {
      "title": "Tree Terminology and Representation",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-terminology"
    },
    "dsa-tree-binary-traversal": {
      "title": "Binary Tree Traversals: Pre, In, Post",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-binary-traversal"
    },
    "dsa-tree-level-order": {
      "title": "Level-Order Traversal and BFS on Trees",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-level-order"
    },
    "dsa-tree-bst-intro": {
      "title": "Binary Search Trees: Introduction",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-bst-intro"
    },
    "dsa-tree-bst-operations": {
      "title": "BST: Insertion, Search, and Deletion",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-bst-operations"
    },
    "dsa-tree-height-diameter": {
      "title": "Tree Height, Depth, and Diameter",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-height-diameter"
    },
    "dsa-tree-lca": {
      "title": "Lowest Common Ancestor",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-lca"
    },
    "dsa-tree-avl": {
      "title": "AVL Trees and Rotations",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-avl"
    },
    "dsa-tree-segment": {
      "title": "Segment Trees",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-segment"
    },
    "dsa-tree-fenwick": {
      "title": "Fenwick Tree (Binary Indexed Tree)",
      "moduleId": "dsa-module-8",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-8/dsa-tree-fenwick"
    },
    "dsa-heap-introduction": {
      "title": "Min Heap and Max Heap",
      "moduleId": "dsa-module-9",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-9/dsa-heap-introduction"
    },
    "dsa-heap-heapify": {
      "title": "Heapify: Building a Heap in O(n)",
      "moduleId": "dsa-module-9",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-9/dsa-heap-heapify"
    },
    "dsa-heap-operations": {
      "title": "Heap Insertion and Extraction",
      "moduleId": "dsa-module-9",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-9/dsa-heap-operations"
    },
    "dsa-heap-sort": {
      "title": "Heap Sort Algorithm",
      "moduleId": "dsa-module-9",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-9/dsa-heap-sort"
    },
    "dsa-heap-top-k": {
      "title": "Top-K Problems",
      "moduleId": "dsa-module-9",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-9/dsa-heap-top-k"
    },
    "dsa-heap-k-way-merge": {
      "title": "K-Way Merge Using Heaps",
      "moduleId": "dsa-module-9",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-9/dsa-heap-k-way-merge"
    },
    "dsa-heap-applications": {
      "title": "Priority Queue Applications",
      "moduleId": "dsa-module-9",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-9/dsa-heap-applications"
    },
    "dsa-graph-representation": {
      "title": "Graph Representation: Adjacency List and Matrix",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-representation"
    },
    "dsa-graph-bfs": {
      "title": "Breadth-First Search (BFS)",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-bfs"
    },
    "dsa-graph-dfs": {
      "title": "Depth-First Search (DFS)",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-dfs"
    },
    "dsa-graph-connected-components": {
      "title": "Connected Components",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-connected-components"
    },
    "dsa-graph-cycle-detection": {
      "title": "Cycle Detection in Graphs",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-cycle-detection"
    },
    "dsa-graph-bipartite": {
      "title": "Bipartite Graphs",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-bipartite"
    },
    "dsa-graph-topological-sort": {
      "title": "Topological Sorting",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-topological-sort"
    },
    "dsa-graph-dijkstra": {
      "title": "Dijkstra's Shortest Path Algorithm",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-dijkstra"
    },
    "dsa-graph-bellman-ford": {
      "title": "Bellman-Ford Algorithm",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-bellman-ford"
    },
    "dsa-graph-floyd-warshall": {
      "title": "Floyd-Warshall: All-Pairs Shortest Path",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-floyd-warshall"
    },
    "dsa-graph-mst": {
      "title": "Minimum Spanning Trees: Prim and Kruskal",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-mst"
    },
    "dsa-graph-dsu": {
      "title": "Disjoint Set Union (Union-Find)",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-dsu"
    },
    "dsa-graph-bridges": {
      "title": "Bridges and Articulation Points",
      "moduleId": "dsa-module-10",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-10/dsa-graph-bridges"
    },
    "dsa-greedy-strategy": {
      "title": "Greedy Strategy and Correctness Intuition",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-greedy-strategy"
    },
    "dsa-greedy-activity-selection": {
      "title": "Activity Selection and Interval Problems",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-greedy-activity-selection"
    },
    "dsa-greedy-fractional-knapsack": {
      "title": "Fractional Knapsack",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-greedy-fractional-knapsack"
    },
    "dsa-dp-fundamentals": {
      "title": "Dynamic Programming Fundamentals",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-fundamentals"
    },
    "dsa-dp-memoization-tabulation": {
      "title": "Memoization vs Tabulation",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-memoization-tabulation"
    },
    "dsa-dp-fibonacci": {
      "title": "Fibonacci and Climbing Stairs",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-fibonacci"
    },
    "dsa-dp-coin-change": {
      "title": "Coin Change Problem",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-coin-change"
    },
    "dsa-dp-knapsack-01": {
      "title": "0/1 Knapsack Problem",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-knapsack-01"
    },
    "dsa-dp-lcs": {
      "title": "Longest Common Subsequence",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-lcs"
    },
    "dsa-dp-lis": {
      "title": "Longest Increasing Subsequence",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-lis"
    },
    "dsa-dp-edit-distance": {
      "title": "Edit Distance (Levenshtein Distance)",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-edit-distance"
    },
    "dsa-dp-grid": {
      "title": "Grid DP Problems",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-grid"
    },
    "dsa-dp-partition": {
      "title": "Partition and Subset Sum Problems",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-partition"
    },
    "dsa-dp-bitmask": {
      "title": "Bitmask DP Introduction",
      "moduleId": "dsa-module-11",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-11/dsa-dp-bitmask"
    },
    "dsa-advanced-bit-manipulation": {
      "title": "Bit Manipulation",
      "moduleId": "dsa-module-12",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-12/dsa-advanced-bit-manipulation"
    },
    "dsa-advanced-binary-search-answer": {
      "title": "Binary Search on Answer",
      "moduleId": "dsa-module-12",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-12/dsa-advanced-binary-search-answer"
    },
    "dsa-advanced-meet-in-middle": {
      "title": "Meet in the Middle",
      "moduleId": "dsa-module-12",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-12/dsa-advanced-meet-in-middle"
    },
    "dsa-advanced-sweep-line": {
      "title": "Sweep-Line Algorithms",
      "moduleId": "dsa-module-12",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-12/dsa-advanced-sweep-line"
    },
    "dsa-advanced-coordinate-compression": {
      "title": "Coordinate Compression",
      "moduleId": "dsa-module-12",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-12/dsa-advanced-coordinate-compression"
    },
    "dsa-advanced-trie-applications": {
      "title": "Advanced Trie Applications",
      "moduleId": "dsa-module-12",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-12/dsa-advanced-trie-applications"
    },
    "dsa-advanced-complexity-overview": {
      "title": "Computational Complexity Overview",
      "moduleId": "dsa-module-12",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-12/dsa-advanced-complexity-overview"
    },
    "dsa-advanced-interview-patterns": {
      "title": "Interview Patterns and Problem-Solving Strategy",
      "moduleId": "dsa-module-12",
      "trackId": "dsa",
      "trackTitle": "Data Structures & Algorithms",
      "route": "/dsa/dsa-module-12/dsa-advanced-interview-patterns"
    },
    "py-fundamentals-execution-model": {
      "title": "Python Execution Model",
      "moduleId": "python-module-1",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-1/py-fundamentals-execution-model"
    },
    "py-fundamentals-variables": {
      "title": "Variables, Naming, and Primitive Types",
      "moduleId": "python-module-1",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-1/py-fundamentals-variables"
    },
    "py-fundamentals-type-conversion": {
      "title": "Type Conversion and Casting",
      "moduleId": "python-module-1",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-1/py-fundamentals-type-conversion"
    },
    "py-fundamentals-operators": {
      "title": "Operators: Arithmetic, Comparison, and Logical",
      "moduleId": "python-module-1",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-1/py-fundamentals-operators"
    },
    "py-fundamentals-input-output": {
      "title": "Input and Output",
      "moduleId": "python-module-1",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-1/py-fundamentals-input-output"
    },
    "py-fundamentals-comments": {
      "title": "Comments and Documentation",
      "moduleId": "python-module-1",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-1/py-fundamentals-comments"
    },
    "py-fundamentals-debugging": {
      "title": "Basic Debugging Techniques",
      "moduleId": "python-module-1",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-1/py-fundamentals-debugging"
    },
    "py-fundamentals-numbers-strings": {
      "title": "Numbers and Strings in Depth",
      "moduleId": "python-module-1",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-1/py-fundamentals-numbers-strings"
    },
    "py-control-boolean-logic": {
      "title": "Boolean Logic and Truthiness",
      "moduleId": "python-module-2",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-2/py-control-boolean-logic"
    },
    "py-control-conditionals": {
      "title": "if, elif, and else",
      "moduleId": "python-module-2",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-2/py-control-conditionals"
    },
    "py-control-for-loops": {
      "title": "for Loops and range()",
      "moduleId": "python-module-2",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-2/py-control-for-loops"
    },
    "py-control-while-loops": {
      "title": "while Loops",
      "moduleId": "python-module-2",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-2/py-control-while-loops"
    },
    "py-control-break-continue": {
      "title": "break, continue, and pass",
      "moduleId": "python-module-2",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-2/py-control-break-continue"
    },
    "py-control-nested-loops": {
      "title": "Nested Loops",
      "moduleId": "python-module-2",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-2/py-control-nested-loops"
    },
    "py-control-pattern-printing": {
      "title": "Pattern Printing Problems",
      "moduleId": "python-module-2",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-2/py-control-pattern-printing"
    },
    "py-ds-strings-methods": {
      "title": "Strings and String Methods",
      "moduleId": "python-module-3",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-3/py-ds-strings-methods"
    },
    "py-ds-lists": {
      "title": "Lists: Creation, Indexing, and Operations",
      "moduleId": "python-module-3",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-3/py-ds-lists"
    },
    "py-ds-tuples": {
      "title": "Tuples and Immutability",
      "moduleId": "python-module-3",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-3/py-ds-tuples"
    },
    "py-ds-sets": {
      "title": "Sets and Set Operations",
      "moduleId": "python-module-3",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-3/py-ds-sets"
    },
    "py-ds-dictionaries": {
      "title": "Dictionaries: Key-Value Storage",
      "moduleId": "python-module-3",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-3/py-ds-dictionaries"
    },
    "py-ds-slicing": {
      "title": "Slicing and Unpacking",
      "moduleId": "python-module-3",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-3/py-ds-slicing"
    },
    "py-ds-mutability": {
      "title": "Mutability and Immutability",
      "moduleId": "python-module-3",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-3/py-ds-mutability"
    },
    "py-ds-copying": {
      "title": "Copying and References",
      "moduleId": "python-module-3",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-3/py-ds-copying"
    },
    "py-ds-nested": {
      "title": "Nested Data Structures",
      "moduleId": "python-module-3",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-3/py-ds-nested"
    },
    "py-func-defining": {
      "title": "Defining and Calling Functions",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-defining"
    },
    "py-func-parameters": {
      "title": "Parameters and Return Values",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-parameters"
    },
    "py-func-default-args": {
      "title": "Default and Keyword Arguments",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-default-args"
    },
    "py-func-args-kwargs": {
      "title": "*args and **kwargs",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-args-kwargs"
    },
    "py-func-scope": {
      "title": "Scope and Namespaces (LEGB Rule)",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-scope"
    },
    "py-func-lambda": {
      "title": "Lambda Functions",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-lambda"
    },
    "py-func-recursion": {
      "title": "Recursion in Python",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-recursion"
    },
    "py-func-higher-order": {
      "title": "Higher-Order Functions: map, filter, reduce",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-higher-order"
    },
    "py-func-closures": {
      "title": "Closures",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-closures"
    },
    "py-func-decorators": {
      "title": "Decorators Introduction",
      "moduleId": "python-module-4",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-4/py-func-decorators"
    },
    "py-comp-list": {
      "title": "List Comprehensions",
      "moduleId": "python-module-5",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-5/py-comp-list"
    },
    "py-comp-dict-set": {
      "title": "Dictionary and Set Comprehensions",
      "moduleId": "python-module-5",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-5/py-comp-dict-set"
    },
    "py-comp-generators": {
      "title": "Generator Expressions",
      "moduleId": "python-module-5",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-5/py-comp-generators"
    },
    "py-comp-iterables": {
      "title": "Iterables and Iterators Protocol",
      "moduleId": "python-module-5",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-5/py-comp-iterables"
    },
    "py-comp-yield": {
      "title": "yield and Generator Functions",
      "moduleId": "python-module-5",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-5/py-comp-yield"
    },
    "py-comp-builtins": {
      "title": "enumerate, zip, sorted, and map",
      "moduleId": "python-module-5",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-5/py-comp-builtins"
    },
    "py-oop-classes-objects": {
      "title": "Classes and Objects",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-classes-objects"
    },
    "py-oop-constructor": {
      "title": "Constructors and self",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-constructor"
    },
    "py-oop-attributes": {
      "title": "Instance vs Class Attributes",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-attributes"
    },
    "py-oop-methods": {
      "title": "Instance, Class, and Static Methods",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-methods"
    },
    "py-oop-encapsulation": {
      "title": "Encapsulation and Access Control",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-encapsulation"
    },
    "py-oop-inheritance": {
      "title": "Inheritance",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-inheritance"
    },
    "py-oop-polymorphism": {
      "title": "Polymorphism and Method Overriding",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-polymorphism"
    },
    "py-oop-abstraction": {
      "title": "Abstract Classes and Abstraction",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-abstraction"
    },
    "py-oop-composition": {
      "title": "Composition vs Inheritance",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-composition"
    },
    "py-oop-mro": {
      "title": "Method Resolution Order (MRO)",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-mro"
    },
    "py-oop-special-methods": {
      "title": "Special Methods and Operator Overloading",
      "moduleId": "python-module-6",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-6/py-oop-special-methods"
    },
    "py-exceptions-handling": {
      "title": "Exception Handling: try, except, finally",
      "moduleId": "python-module-7",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-7/py-exceptions-handling"
    },
    "py-exceptions-custom": {
      "title": "Creating Custom Exceptions",
      "moduleId": "python-module-7",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-7/py-exceptions-custom"
    },
    "py-files-reading-writing": {
      "title": "File Reading and Writing",
      "moduleId": "python-module-7",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-7/py-files-reading-writing"
    },
    "py-files-context-managers": {
      "title": "Context Managers (with statement)",
      "moduleId": "python-module-7",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-7/py-files-context-managers"
    },
    "py-modules-imports": {
      "title": "Imports and Packages",
      "moduleId": "python-module-7",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-7/py-modules-imports"
    },
    "py-modules-venv": {
      "title": "Virtual Environments and pip",
      "moduleId": "python-module-7",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-7/py-modules-venv"
    },
    "py-modules-env-vars": {
      "title": "Environment Variables and Configuration",
      "moduleId": "python-module-7",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-7/py-modules-env-vars"
    },
    "py-modules-logging": {
      "title": "Logging and Debugging",
      "moduleId": "python-module-7",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-7/py-modules-logging"
    },
    "py-advanced-copying": {
      "title": "Shallow and Deep Copying",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-copying"
    },
    "py-advanced-decorators-depth": {
      "title": "Decorators in Depth",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-decorators-depth"
    },
    "py-advanced-iterators-depth": {
      "title": "Iterators and Generators in Depth",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-iterators-depth"
    },
    "py-advanced-type-hints": {
      "title": "Type Hints and Annotations",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-type-hints"
    },
    "py-advanced-dataclasses": {
      "title": "Dataclasses",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-dataclasses"
    },
    "py-advanced-abc": {
      "title": "Abstract Base Classes",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-abc"
    },
    "py-advanced-functional": {
      "title": "Functional Programming Concepts",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-functional"
    },
    "py-advanced-regex": {
      "title": "Regular Expressions",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-regex"
    },
    "py-advanced-collections": {
      "title": "collections and itertools",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-collections"
    },
    "py-advanced-profiling": {
      "title": "Time and Memory Profiling",
      "moduleId": "python-module-8",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-8/py-advanced-profiling"
    },
    "py-internals-identity": {
      "title": "Object Identity and References",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-identity"
    },
    "py-internals-mutable-immutable": {
      "title": "Mutable vs Immutable Objects Internals",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-mutable-immutable"
    },
    "py-internals-data-model": {
      "title": "Python's Data Model",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-data-model"
    },
    "py-internals-hashability": {
      "title": "Hashability and __hash__",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-hashability"
    },
    "py-internals-equality-identity": {
      "title": "Equality vs Identity",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-equality-identity"
    },
    "py-internals-legb": {
      "title": "LEGB Scope Resolution in Depth",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-legb"
    },
    "py-internals-gc": {
      "title": "Garbage Collection",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-gc"
    },
    "py-internals-cpython": {
      "title": "CPython and Bytecode",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-cpython"
    },
    "py-internals-gil": {
      "title": "The GIL",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-gil"
    },
    "py-internals-concurrency": {
      "title": "Threads, Processes, and Async I/O",
      "moduleId": "python-module-9",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-9/py-internals-concurrency"
    },
    "py-practical-json-csv": {
      "title": "JSON and CSV Processing",
      "moduleId": "python-module-10",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-10/py-practical-json-csv"
    },
    "py-practical-http": {
      "title": "HTTP and REST APIs with requests",
      "moduleId": "python-module-10",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-10/py-practical-http"
    },
    "py-practical-sqlite": {
      "title": "SQLite and Database Connectivity",
      "moduleId": "python-module-10",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-10/py-practical-sqlite"
    },
    "py-practical-pytest": {
      "title": "Testing with pytest",
      "moduleId": "python-module-10",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-10/py-practical-pytest"
    },
    "py-practical-debugging": {
      "title": "Advanced Debugging Techniques",
      "moduleId": "python-module-10",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-10/py-practical-debugging"
    },
    "py-practical-clean-code": {
      "title": "Clean Code and Project Structure",
      "moduleId": "python-module-10",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-10/py-practical-clean-code"
    },
    "py-practical-git": {
      "title": "Git Fundamentals for Python Projects",
      "moduleId": "python-module-10",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-10/py-practical-git"
    },
    "py-practical-packaging": {
      "title": "Packaging and Distribution",
      "moduleId": "python-module-10",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-10/py-practical-packaging"
    },
    "py-ds-numpy": {
      "title": "NumPy Fundamentals and Vectorization",
      "moduleId": "python-module-11",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-11/py-ds-numpy"
    },
    "py-ds-pandas": {
      "title": "Pandas Data Manipulation",
      "moduleId": "python-module-11",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-11/py-ds-pandas"
    },
    "py-ds-matplotlib": {
      "title": "Data Visualization with Matplotlib",
      "moduleId": "python-module-11",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-11/py-ds-matplotlib"
    },
    "py-ds-data-cleaning": {
      "title": "Data Cleaning and Exploratory Analysis",
      "moduleId": "python-module-11",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-11/py-ds-data-cleaning"
    },
    "py-ds-sklearn": {
      "title": "Scikit-learn Integration",
      "moduleId": "python-module-11",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-11/py-ds-sklearn"
    },
    "py-ds-pipelines": {
      "title": "Reusable Data-Processing Pipelines",
      "moduleId": "python-module-11",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-11/py-ds-pipelines"
    },
    "py-project-calculator": {
      "title": "CLI Calculator Project",
      "moduleId": "python-module-12",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-12/py-project-calculator"
    },
    "py-project-expense-tracker": {
      "title": "Expense Tracker",
      "moduleId": "python-module-12",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-12/py-project-expense-tracker"
    },
    "py-project-file-organizer": {
      "title": "File Organizer",
      "moduleId": "python-module-12",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-12/py-project-file-organizer"
    },
    "py-project-contact-manager": {
      "title": "Contact Management System",
      "moduleId": "python-module-12",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-12/py-project-contact-manager"
    },
    "py-project-library-oop": {
      "title": "OOP Library Management System",
      "moduleId": "python-module-12",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-12/py-project-library-oop"
    },
    "py-project-fastapi": {
      "title": "REST API with FastAPI",
      "moduleId": "python-module-12",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-12/py-project-fastapi"
    },
    "py-project-data-analysis": {
      "title": "Data Analysis Project",
      "moduleId": "python-module-12",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-12/py-project-data-analysis"
    },
    "py-project-ml-api": {
      "title": "ML Prediction API",
      "moduleId": "python-module-12",
      "trackId": "python",
      "trackTitle": "Python Mastery",
      "route": "/python/python-module-12/py-project-ml-api"
    },
    "java-intro-history": {
      "title": "Java Introduction & The WORA Philosophy",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-intro-history"
    },
    "java-jdk-jre-jvm": {
      "title": "JDK vs JRE vs JVM Demystified",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-jdk-jre-jvm"
    },
    "java-jvm-architecture": {
      "title": "JVM Internal Architecture & Execution Pipeline",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-jvm-architecture"
    },
    "java-program-structure": {
      "title": "Anatomy of a Java Program: Class, main, and System.out",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-program-structure"
    },
    "java-compilation-execution": {
      "title": "Compiling & Running via CLI (javac and java)",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-compilation-execution"
    },
    "java-comments-style": {
      "title": "Comments, Whitespace & Clean Java Style Conventions",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-comments-style"
    },
    "java-console-output": {
      "title": "Console Output Formatting: print vs println vs printf",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-console-output"
    },
    "java-scanner-input": {
      "title": "Reading Interactive User Input with Scanner",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-scanner-input"
    },
    "java-syntax-vs-runtime-errors": {
      "title": "Compiler Syntax Errors vs Runtime Exceptions",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-syntax-vs-runtime-errors"
    },
    "java-cli-project": {
      "title": "Project: Building a Robust CLI Utility Application",
      "moduleId": "java-module-1",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-1/java-cli-project"
    },
    "java-variables-declaration": {
      "title": "Variables and Static Typing in Java",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-variables-declaration"
    },
    "java-primitive-integers": {
      "title": "Primitive Integral Types (byte, short, int, long)",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-primitive-integers"
    },
    "java-floating-point": {
      "title": "Floating-Point Types (float, double, and IEEE 754)",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-floating-point"
    },
    "java-char-boolean": {
      "title": "Character and Boolean Types (char and boolean)",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-char-boolean"
    },
    "java-strings-immutability": {
      "title": "Strings in Java: The String Constant Pool",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-strings-immutability"
    },
    "java-constants-final": {
      "title": "Constants with the final Keyword",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-constants-final"
    },
    "java-type-casting": {
      "title": "Type Casting: Widening vs Narrowing",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-type-casting"
    },
    "java-arithmetic-operators": {
      "title": "Arithmetic and Assignment Operators",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-arithmetic-operators"
    },
    "java-relational-logical": {
      "title": "Relational & Logical Operators (Short-Circuit)",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-relational-logical"
    },
    "java-bitwise-operators": {
      "title": "Bitwise and Bit-Shift Operations in Java",
      "moduleId": "java-module-2",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-2/java-bitwise-operators"
    },
    "java-if-else-branching": {
      "title": "If, Else-If, and Else Conditional Branching",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-if-else-branching"
    },
    "java-ternary-operator": {
      "title": "The Ternary Operator (? :) in Java",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-ternary-operator"
    },
    "java-switch-statement": {
      "title": "Switch Statements & Modern Switch Expressions",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-switch-statement"
    },
    "java-while-loop": {
      "title": "The While Loop (Pre-Condition Loops)",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-while-loop"
    },
    "java-do-while-loop": {
      "title": "The Do-While Loop (Post-Condition Loops)",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-do-while-loop"
    },
    "java-for-loop": {
      "title": "The Classic Counting For Loop",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-for-loop"
    },
    "java-enhanced-for": {
      "title": "The Enhanced For Loop (For-Each Traversal)",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-enhanced-for"
    },
    "java-nested-loops": {
      "title": "Nested Loops and Multi-Dimensional Coordinates",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-nested-loops"
    },
    "java-break-continue": {
      "title": "Loop Control: break, continue, and Labeled Statements",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-break-continue"
    },
    "java-loops-practice": {
      "title": "Practical Problem Solving: FizzBuzz, Primes & Palindromes",
      "moduleId": "java-module-3",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-3/java-loops-practice"
    },
    "java-arrays-1d": {
      "title": "Single-Dimensional Arrays in Java",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-arrays-1d"
    },
    "java-array-traversal": {
      "title": "Array Traversals and In-Place Reversals",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-array-traversal"
    },
    "java-arrays-utility": {
      "title": "The java.util.Arrays Utility Class",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-arrays-utility"
    },
    "java-2d-matrices": {
      "title": "Multidimensional Arrays (2D Matrices & Grids)",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-2d-matrices"
    },
    "java-jagged-arrays": {
      "title": "Jagged (Ragged) Arrays in Java",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-jagged-arrays"
    },
    "java-string-methods": {
      "title": "String Class Internals & Essential Methods",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-string-methods"
    },
    "java-string-equality": {
      "title": "String Equality: == vs .equals() vs compareTo()",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-string-equality"
    },
    "java-stringbuilder": {
      "title": "StringBuilder vs StringBuffer vs String",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-stringbuilder"
    },
    "java-regex-patterns": {
      "title": "Regular Expressions & Pattern Matching",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-regex-patterns"
    },
    "java-string-algorithms": {
      "title": "Practical String Algorithms: Palindromes & Anagrams",
      "moduleId": "java-module-4",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-4/java-string-algorithms"
    },
    "java-methods-structure": {
      "title": "Methods in Java: Structure, Signature & Return Types",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-methods-structure"
    },
    "java-pass-by-value": {
      "title": "Pass-by-Value Semantics: Primitives vs References",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-pass-by-value"
    },
    "java-method-overloading": {
      "title": "Method Overloading (Compile-Time Polymorphism)",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-method-overloading"
    },
    "java-varargs": {
      "title": "Variable-Length Arguments (Varargs ...)",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-varargs"
    },
    "java-static-methods": {
      "title": "Static Utility Methods vs Instance Methods",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-static-methods"
    },
    "java-call-stack-frames": {
      "title": "Understanding the JVM Call Stack & Stack Frames",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-call-stack-frames"
    },
    "java-recursion-fundamentals": {
      "title": "Introduction to Recursion: Base Case vs Recursive Call",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-recursion-fundamentals"
    },
    "java-factorial-recursion": {
      "title": "Call Stack Analysis of Factorials and Countdown",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-factorial-recursion"
    },
    "java-fibonacci-recursion": {
      "title": "Branching Recursion: Fibonacci & Call Trees",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-fibonacci-recursion"
    },
    "java-recursion-vs-iteration": {
      "title": "Recursion vs Iteration: Tradeoffs & StackOverflow Prevention",
      "moduleId": "java-module-5",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-5/java-recursion-vs-iteration"
    },
    "java-oop-paradigms": {
      "title": "OOP Paradigms: Why Object-Oriented Programming Matters",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-oop-paradigms"
    },
    "java-classes-and-objects": {
      "title": "Classes as Blueprints and Objects on the Heap",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-classes-and-objects"
    },
    "java-instance-variables": {
      "title": "Instance Variables & Field Initialization",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-instance-variables"
    },
    "java-constructors": {
      "title": "Constructors in Java: Default, No-Arg, and Parameterized",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-constructors"
    },
    "java-this-keyword": {
      "title": "The this Keyword & Constructor Chaining this()",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-this-keyword"
    },
    "java-encapsulation-getters": {
      "title": "Encapsulation: Data Hiding, Getters & Setters",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-encapsulation-getters"
    },
    "java-access-modifiers": {
      "title": "Access Modifiers: public, private, protected & package-private",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-access-modifiers"
    },
    "java-static-fields-blocks": {
      "title": "Static Variables & Static Initialization Blocks",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-static-fields-blocks"
    },
    "java-object-lifecycle": {
      "title": "Object Lifecycle, References & Garbage Collection",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-object-lifecycle"
    },
    "java-oop-bank-project": {
      "title": "Project: Encapsulated Bank Account & ATM Engine",
      "moduleId": "java-module-6",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-6/java-oop-bank-project"
    },
    "java-inheritance-extends": {
      "title": "Inheritance with the extends Keyword (IS-A)",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-inheritance-extends"
    },
    "java-super-keyword": {
      "title": "The super Keyword: Superclass Constructors & Methods",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-super-keyword"
    },
    "java-method-overriding": {
      "title": "Method Overriding and the @Override Annotation",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-method-overriding"
    },
    "java-polymorphism-dispatch": {
      "title": "Runtime Polymorphism & Dynamic Method Dispatch",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-polymorphism-dispatch"
    },
    "java-object-methods": {
      "title": "The Root java.lang.Object Class (toString, equals, hashCode)",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-object-methods"
    },
    "java-abstract-classes": {
      "title": "Abstract Classes and Abstract Methods",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-abstract-classes"
    },
    "java-interfaces": {
      "title": "Interfaces in Java: Strict Behavioral Contracts",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-interfaces"
    },
    "java-default-methods": {
      "title": "Default and Static Methods in Interfaces (Java 8+)",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-default-methods"
    },
    "java-composition-over-inheritance": {
      "title": "Composition vs Inheritance (HAS-A vs IS-A)",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-composition-over-inheritance"
    },
    "java-final-immutable": {
      "title": "Final Classes, Final Methods & Immutable Design",
      "moduleId": "java-module-7",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-7/java-final-immutable"
    },
    "java-packages-structure": {
      "title": "Java Packages and Directory Structure",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-packages-structure"
    },
    "java-imports-static": {
      "title": "The import Statement and Static Imports",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-imports-static"
    },
    "java-package-access": {
      "title": "Access Modifiers Across Packages",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-package-access"
    },
    "java-enums": {
      "title": "Enumerations (enum) with Fields & Methods",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-enums"
    },
    "java-nested-classes": {
      "title": "Nested Classes: Static Nested vs Inner Classes",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-nested-classes"
    },
    "java-anonymous-classes": {
      "title": "Anonymous Inner Classes & Local Classes",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-anonymous-classes"
    },
    "java-generics-intro": {
      "title": "Introduction to Java Generics: Type Safety",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-generics-intro"
    },
    "java-generic-classes-methods": {
      "title": "Generic Classes & Generic Methods (<T>, <K, V>)",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-generic-classes-methods"
    },
    "java-bounded-generics": {
      "title": "Bounded Type Parameters (<T extends Comparable>)",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-bounded-generics"
    },
    "java-generics-wildcards": {
      "title": "Wildcards in Generics: ?, ? extends, and PECS",
      "moduleId": "java-module-8",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-8/java-generics-wildcards"
    },
    "java-exception-hierarchy": {
      "title": "The Java Exception Hierarchy (Throwable)",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-exception-hierarchy"
    },
    "java-checked-vs-unchecked": {
      "title": "Checked Exceptions vs Unchecked Exceptions",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-checked-vs-unchecked"
    },
    "java-try-catch-blocks": {
      "title": "The try-catch Mechanism & Multi-Catch",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-try-catch-blocks"
    },
    "java-finally-block": {
      "title": "The finally Block & Guaranteed Cleanup",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-finally-block"
    },
    "java-try-with-resources": {
      "title": "Try-with-Resources & AutoCloseable (Java 7+)",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-try-with-resources"
    },
    "java-throw-throws": {
      "title": "The throw and throws Keywords",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-throw-throws"
    },
    "java-custom-exceptions": {
      "title": "Creating Domain-Specific Custom Exceptions",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-custom-exceptions"
    },
    "java-exception-chaining": {
      "title": "Exception Chaining & Preserving Stack Traces",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-exception-chaining"
    },
    "java-exception-best-practices": {
      "title": "Best Practices: Avoiding Anti-Patterns",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-exception-best-practices"
    },
    "java-debugging-stack-traces": {
      "title": "Debugging Techniques & Stack Trace Forensics",
      "moduleId": "java-module-9",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-9/java-debugging-stack-traces"
    },
    "java-collections-overview": {
      "title": "The Java Collections Hierarchy Overview",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-collections-overview"
    },
    "java-arraylist-deep-dive": {
      "title": "ArrayList: Dynamic Resizing Internals & Complexity",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-arraylist-deep-dive"
    },
    "java-linkedlist-operations": {
      "title": "LinkedList: Doubly-Linked Nodes as List & Deque",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-linkedlist-operations"
    },
    "java-hashset-uniqueness": {
      "title": "HashSet & LinkedHashSet: Set Uniqueness",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-hashset-uniqueness"
    },
    "java-treeset-ordering": {
      "title": "TreeSet: Red-Black Tree Balanced Ordering",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-treeset-ordering"
    },
    "java-hashmap-deep-dive": {
      "title": "HashMap Deep Dive: Hashing, Buckets & Collisions",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-hashmap-deep-dive"
    },
    "java-treemap-linkedhashmap": {
      "title": "TreeMap & LinkedHashMap: Sorting & Insertion Order",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-treemap-linkedhashmap"
    },
    "java-queue-deque": {
      "title": "Queue & Deque Interfaces: ArrayDeque in Practice",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-queue-deque"
    },
    "java-priority-queue": {
      "title": "PriorityQueue: Min-Heaps and Max-Heaps in Java",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-priority-queue"
    },
    "java-iterators-failfast": {
      "title": "Iterators, ListIterator & ConcurrentModificationException",
      "moduleId": "java-module-10",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-10/java-iterators-failfast"
    },
    "java-dsa-big-o": {
      "title": "Big-O Time & Space Complexity in Java",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-big-o"
    },
    "java-dsa-searching": {
      "title": "Linear Search vs Binary Search Implementations",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-searching"
    },
    "java-dsa-elementary-sorts": {
      "title": "Bubble, Selection & Insertion Sort in Java",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-elementary-sorts"
    },
    "java-dsa-mergesort": {
      "title": "Merge Sort and Divide-and-Conquer",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-mergesort"
    },
    "java-dsa-quicksort": {
      "title": "Quick Sort and Partitioning Strategies",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-quicksort"
    },
    "java-dsa-custom-linkedlist": {
      "title": "Building a Custom Linked List from Scratch",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-custom-linkedlist"
    },
    "java-dsa-custom-stack-queue": {
      "title": "Implementing Custom Stack and Queue from Scratch",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-custom-stack-queue"
    },
    "java-dsa-binary-search-tree": {
      "title": "Binary Search Trees (Insertion, Search, Traversal)",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-binary-search-tree"
    },
    "java-dsa-graph-algorithms": {
      "title": "Graph Representations (Adjacency List) & BFS/DFS",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-graph-algorithms"
    },
    "java-dsa-dynamic-programming": {
      "title": "Dynamic Programming in Java: Memoization & Tabulation",
      "moduleId": "java-module-11",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-11/java-dsa-dynamic-programming"
    },
    "java-file-io-nio": {
      "title": "Java File I/O: Reading and Writing Files (NIO.2)",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-file-io-nio"
    },
    "java-lambdas-syntax": {
      "title": "Lambda Expressions and @FunctionalInterface",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-lambdas-syntax"
    },
    "java-functional-interfaces": {
      "title": "Standard Functional Interfaces (Predicate, Function, Consumer)",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-functional-interfaces"
    },
    "java-streams-filter-map": {
      "title": "The Java Streams API: Filter, Map, and Collect",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-streams-filter-map"
    },
    "java-streams-reduce-grouping": {
      "title": "Advanced Streams: reduce, groupingBy & Summary Stats",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-streams-reduce-grouping"
    },
    "java-optional-type": {
      "title": "Optional<T>: Eliminating NullPointerExceptions Safely",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-optional-type"
    },
    "java-threads-runnable": {
      "title": "Multithreading Basics: The Thread Class & Runnable",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-threads-runnable"
    },
    "java-synchronization-locks": {
      "title": "Concurrency, Synchronization & Race Conditions",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-synchronization-locks"
    },
    "java-executors-completablefuture": {
      "title": "ExecutorService, Thread Pools & CompletableFuture",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-executors-completablefuture"
    },
    "java-capstone-project": {
      "title": "Capstone: High-Throughput Java Task Pipeline",
      "moduleId": "java-module-12",
      "trackId": "java",
      "trackTitle": "Java Mastery",
      "route": "/java/java-module-12/java-capstone-project"
    }
  }
} as const;
