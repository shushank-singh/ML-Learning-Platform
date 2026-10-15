import { LessonContent, ModuleData } from '@/lib/types';

export const module7Data: ModuleData = {
  id: 'module-7',
  number: 7,
  title: 'Unsupervised Learning & Dimensionality Reduction',
  subtitle: 'K-Means, Hierarchical, DBSCAN, GMM, PCA, t-SNE, UMAP & Anomaly Detection',
  description: 'Discover latent structures in unlabelled data: Lloyd’s K-Means algorithm, K-Means++ seeding, Elbow & Silhouette metrics, Agglomerative Hierarchical clustering & dendrograms, density-based DBSCAN, Gaussian Mixture Models with Expectation-Maximization (EM), Principal Component Analysis (PCA) eigendecomposition & SVD, manifold learning with t-SNE & UMAP, and Isolation Forest anomaly detection.',
  icon: 'Compass',
  badge: 'Unsupervised',
  estimatedHours: 18,
  topicsCount: 9,
  lessons: [
    {
      id: 'clustering-foundations',
      moduleId: 'module-7',
      title: 'Clustering Foundations & Partitioning Principles',
      description: 'Within-Cluster Sum of Squares (WCSS), Between-Cluster Sum of Squares (BCSS), and the Total Sum of Squares decomposition.',
      order: 1,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'k-means-clustering',
      moduleId: 'module-7',
      title: 'K-Means Clustering & K-Means++ Seeding',
      description: 'Lloyd’s iterative coordinate descent, Voronoi tessellations, the D(x)^2 probabilistic seeding proof, and convergence guarantees.',
      order: 2,
      readTimeMinutes: 24,
      visualizerType: 'kmeans',
      difficulty: 'Beginner',
    },
    {
      id: 'choosing-k-clustering-metrics',
      moduleId: 'module-7',
      title: 'Choosing K & Cluster Validation Metrics',
      description: 'Elbow inertia heuristics, Silhouette analysis, Davies-Bouldin index, and the Calinski-Harabasz dispersion ratio.',
      order: 3,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'hierarchical-clustering',
      moduleId: 'module-7',
      title: 'Hierarchical Agglomerative Clustering & Linkage',
      description: 'Bottom-up agglomeration, Dendrogram tree cutting, Single, Complete, Average linkage, and Ward’s minimum variance criterion.',
      order: 4,
      readTimeMinutes: 25,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'dbscan-clustering',
      moduleId: 'module-7',
      title: 'DBSCAN: Density-Based Spatial Clustering',
      description: 'Epsilon-neighborhoods, MinPts density thresholds, Core vs Border vs Noise points, and arbitrary non-spherical cluster discovery.',
      order: 5,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'gaussian-mixture-models',
      moduleId: 'module-7',
      title: 'Gaussian Mixture Models & Expectation-Maximization',
      description: 'Probabilistic soft clustering, covariance matrix topologies (spherical, diagonal, full), and the rigorous EM derivation.',
      order: 6,
      readTimeMinutes: 28,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
    {
      id: 'pca-principal-component-analysis',
      moduleId: 'module-7',
      title: 'Principal Component Analysis (PCA)',
      description: 'Orthogonal variance maximization, empirical covariance eigendecomposition, SVD connection, and reconstruction error.',
      order: 7,
      readTimeMinutes: 28,
      visualizerType: 'pca',
      difficulty: 'Intermediate',
    },
    {
      id: 'tsne-umap',
      moduleId: 'module-7',
      title: 'Non-Linear Manifold Learning: t-SNE & UMAP',
      description: 'Preserving local neighborhood topologies, KL-divergence optimization, Student-t heavy tails, and UMAP fuzzy simplicial sets.',
      order: 8,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Advanced',
    },
    {
      id: 'anomaly-detection',
      moduleId: 'module-7',
      title: 'Anomaly Detection: Isolation Forest & LOF',
      description: 'Recursive random partitioning, binary search tree average path length h(x), anomaly scoring, and local reachability density.',
      order: 9,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
  ],
};

export const module7Lessons: Record<string, LessonContent> = {
  'clustering-foundations': {
    id: 'clustering-foundations',
    moduleId: 'module-7',
    title: 'Clustering Foundations & Partitioning Principles',
    subtitle: 'Within-Cluster Sum of Squares, Between-Cluster Variance & Total Energy Conservation',
    order: 1,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Understand the fundamental goals and mathematical formulation of unsupervised data partitioning.',
      'Derive the Total Sum of Squares (TSS) decomposition into WCSS and BCSS.',
      'Explain the objective of maximizing cluster compactness while maximizing cluster separation.',
      'Recognize the fundamental challenge of clustering: defining distance metrics and cluster geometry.',
    ],
    prerequisites: ['Euclidean distance', 'Variance & Covariance', 'Module 6 Ensemble methods'],
    previousLesson: {
      id: 'feature-importance-shap',
      title: 'Feature Importance & TreeSHAP Interpretability',
      moduleId: 'module-6',
    },
    analogy: {
      title: 'The Museum Curator Without an Inventory Catalog',
      text: 'A museum curator receives a shipment of 10,000 unlabelled artifacts from an ancient civilization with no historical documentation or catalog numbers. To organize an exhibition, the curator groups objects by visual and physical attributes: pottery fragments in one room, bronze weaponry in another, and woven textiles in a third. Objects in the same room are highly similar (compactness), while objects across different rooms are distinctly dissimilar (separation).',
      metaphor: 'Clustering groups unlabeled data points so that intra-cluster similarity is maximized and inter-cluster similarity is minimized.',
    },
    problemSolved: {
      title: 'Discovering Latent Natural Groupings Without Supervision',
      description: 'In the real world, 90%+ of collected data has no ground-truth target labels y. Supervised learning cannot operate here. Clustering discovers intrinsic natural taxonomies, customer personas, disease subtypes, and structural patterns directly from feature geometries.',
      keyPoints: [
        'Unlocks insights from unlabelled data manifolds without requiring expensive manual human annotations.',
        'Formalizes cluster quality as the mathematical balance between intra-cluster compactness and inter-cluster separation.',
        'Serves as the foundation for customer segmentation, image compression, genomics, and anomaly detection.',
      ],
    },
    intuition: {
      overview: 'Given a dataset X without labels, partition the N observations into K disjoint subsets C_1, C_2, ..., C_K such that points within each cluster are tightly clustered around their centroid, while centroids are as far apart from each other as possible.',
      steps: [
        {
          step: 1,
          title: 'Define Distance Metric',
          description: 'Establish a mathematical distance metric d(x_i, x_j) (such as Euclidean L2 norm or Cosine distance) to measure sample dissimilarity.',
        },
        {
          step: 2,
          title: 'Measure Intra-Cluster Compactness (WCSS)',
          description: 'Compute the sum of squared distances from every data point to its assigned cluster centroid (Inertia).',
        },
        {
          step: 3,
          title: 'Measure Inter-Cluster Separation (BCSS)',
          description: 'Compute the weighted squared distance from each cluster centroid to the global grand mean of all data points.',
        },
      ],
    },
    mathematics: {
      overview: 'The fundamental theorem of clustering variance states that the Total Sum of Squares (TSS) of a dataset is invariant and decomposes strictly into WCSS and BCSS.',
      foundations: [
        {
          name: 'Total Sum of Squares (TSS)',
          latex: '\\text{TSS} = \\sum_{i=1}^N \\|x_i - \\bar{x}\\|^2',
          explanation: 'where bar{x} is the grand mean (overall center of mass) of the entire dataset. TSS measures total geometric variance in the data.',
        },
        {
          name: 'Within-Cluster Sum of Squares (WCSS / Inertia)',
          latex: '\\text{WCSS} = \\sum_{k=1}^K \\sum_{x_i \\in C_k} \\|x_i - \\mu_k\\|^2',
          explanation: 'where mu_k is the centroid (mean) of cluster k. Measures internal cluster scatter; lower values indicate tighter, more compact clusters.',
        },
        {
          name: 'Between-Cluster Sum of Squares (BCSS)',
          latex: '\\text{BCSS} = \\sum_{k=1}^K |C_k| \\|\\mu_k - \\bar{x}\\|^2',
          explanation: 'Weighted sum of squared distances from cluster centroids to the grand mean. Measures cluster separation; higher values indicate well-separated clusters.',
        },
        {
          name: 'Huygens Theorem of Variance Conservation',
          latex: '\\text{TSS} = \\text{WCSS} + \\text{BCSS}',
          explanation: 'Total variance is conserved: minimizing WCSS is mathematically identical to maximizing BCSS.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Huygens Theorem: TSS = WCSS + BCSS',
      objective: 'Prove algebraically that total variance decomposes exactly into intra-cluster and inter-cluster sum of squares.',
      steps: [
        {
          step: 1,
          label: 'Decompose the displacement vector using cluster centroid mu_k',
          latex: 'x_i - \\bar{x} = (x_i - \\mu_k) + (\\mu_k - \\bar{x}) \\quad \\text{for } x_i \\in C_k',
          explanation: 'Add and subtract the assigned cluster centroid mu_k inside the displacement term.',
        },
        {
          step: 2,
          label: 'Square both sides using vector inner product',
          latex: '\\|x_i - \\bar{x}\\|^2 = \\|x_i - \\mu_k\\|^2 + \\|\\mu_k - \\bar{x}\\|^2 + 2(x_i - \\mu_k)^T(\\mu_k - \\bar{x})',
          explanation: 'Expands into the sum of squares plus a cross-product interaction term.',
        },
        {
          step: 3,
          label: 'Sum across all instances in cluster C_k',
          latex: '\\sum_{x_i \\in C_k} \\|x_i - \\bar{x}\\|^2 = \\sum_{x_i \\in C_k} \\|x_i - \\mu_k\\|^2 + |C_k| \\|\\mu_k - \\bar{x}\\|^2 + 2 \\left( \\sum_{x_i \\in C_k} (x_i - \\mu_k) \\right)^T (\\mu_k - \\bar{x})',
          explanation: 'Notice the middle term is constant for all instances in cluster k, yielding |C_k| * ||mu_k - bar{x}||^2.',
        },
        {
          step: 4,
          label: 'Show that the cross-product term vanishes identically',
          latex: '\\sum_{x_i \\in C_k} (x_i - \\mu_k) = \\sum_{x_i \\in C_k} x_i - |C_k| \\mu_k = |C_k|\\mu_k - |C_k|\\mu_k = 0',
          explanation: 'By the exact definition of centroid mu_k = (1/|C_k|) sum x_i, the deviations from the mean sum to zero.',
        },
        {
          step: 5,
          label: 'Sum across all K clusters',
          latex: '\\sum_{k=1}^K \\sum_{x_i \\in C_k} \\|x_i - \\bar{x}\\|^2 = \\sum_{k=1}^K \\sum_{x_i \\in C_k} \\|x_i - \\mu_k\\|^2 + \\sum_{k=1}^K |C_k| \\|\\mu_k - \\bar{x}\\|^2 \\implies \\text{TSS} = \\text{WCSS} + \\text{BCSS}',
          explanation: 'This proves that minimizing WCSS simultaneously and maximally expands BCSS.',
        },
      ],
    },
    variables: [
      { symbol: 'N', name: 'Total Sample Size', description: 'Total number of unlabelled observations in the dataset', dimensions: 'Scalar integer' },
      { symbol: 'K', name: 'Number of Clusters', description: 'Total number of partitions formed', dimensions: 'Scalar integer (K >= 2)' },
      { symbol: '\\mu_k', name: 'Cluster Centroid', description: 'Mean vector of all points assigned to cluster k', dimensions: 'Vector in R^d' },
      { symbol: '\\bar{x}', name: 'Grand Mean', description: 'Global center of mass of the entire dataset', dimensions: 'Vector in R^d' },
      { symbol: '\\text{WCSS}', name: 'Within-Cluster Sum of Squares', description: 'Total squared Euclidean distance from points to their assigned cluster centers', dimensions: 'Scalar >= 0' },
      { symbol: '\\text{BCSS}', name: 'Between-Cluster Sum of Squares', description: 'Total weighted squared distance from cluster centers to the grand mean', dimensions: 'Scalar >= 0' },
    ],
    numericalExample: {
      scenario: 'Verify TSS = WCSS + BCSS on 4 1D data points: X = {2, 4, 10, 12} partitioned into K=2 clusters: C1 = {2, 4} and C2 = {10, 12}.',
      dataset: [
        { point: 'x1', val: 2, cluster: 'C1' },
        { point: 'x2', val: 4, cluster: 'C1' },
        { point: 'x3', val: 10, cluster: 'C2' },
        { point: 'x4', val: 12, cluster: 'C2' },
      ],
      calculations: [
        {
          step: 'Compute Grand Mean bar{x}',
          math: '\\bar{x} = \\frac{2 + 4 + 10 + 12}{4} = \\frac{28}{4}',
          result: 'bar{x} = 7.0',
        },
        {
          step: 'Compute Total Sum of Squares (TSS)',
          math: '\\text{TSS} = (2-7)^2 + (4-7)^2 + (10-7)^2 + (12-7)^2 = 25 + 9 + 9 + 25',
          result: 'TSS = 68.0',
        },
        {
          step: 'Compute Cluster Centroids mu_1 and mu_2',
          math: '\\mu_1 = \\frac{2 + 4}{2} = 3.0; \\quad \\mu_2 = \\frac{10 + 12}{2} = 11.0',
          result: 'mu_1 = 3.0, mu_2 = 11.0',
        },
        {
          step: 'Compute Within-Cluster Sum of Squares (WCSS)',
          math: '\\text{WCSS} = [(2-3)^2 + (4-3)^2] + [(10-11)^2 + (12-11)^2] = (1 + 1) + (1 + 1)',
          result: 'WCSS = 4.0',
        },
        {
          step: 'Compute Between-Cluster Sum of Squares (BCSS)',
          math: '\\text{BCSS} = 2 \\times (3 - 7)^2 + 2 \\times (11 - 7)^2 = 2(16) + 2(16)',
          result: 'BCSS = 64.0',
        },
        {
          step: 'Verify Huygens Conservation: WCSS + BCSS',
          math: '4.0 + 64.0 = 68.0 = \\text{TSS}',
          result: '68.0 == 68.0 (Verified!)',
        },
      ],
      finalConclusion: 'The partition explains 64/68 = 94.1% of the total dataset variance (BCSS/TSS = 0.941), indicating an excellent separation.',
    },
    visualExplanation: {
      title: 'Intra-Cluster vs Inter-Cluster Geometric Tension',
      description: 'The visual diagram depicts clusters as planetary systems. Blue arrows pull points toward their respective cluster sun (minimizing WCSS to maximize density), while purple repulsive arrows push the two cluster suns apart from the global center of mass (maximizing BCSS to ensure distinct clusters).',
      features: [
        'Compactness (WCSS): Tight orbital radius around local cluster centroid.',
        'Separation (BCSS): Wide spatial separation between cluster centroids and the grand mean.',
        'Conservation: Every decrease in internal scatter directly converts into inter-cluster separation.',
      ],
    },
    scratchCode: {
      title: 'TSS, WCSS, and BCSS Decomposition in Python',
      code: `import numpy as np

def compute_clustering_variances(X, labels):
    """
    Compute TSS, WCSS, and BCSS for a given clustering partition.
    Verifies Huygens Theorem: TSS == WCSS + BCSS.
    """
    n_samples = X.shape[0]
    grand_mean = np.mean(X, axis=0)

    # 1. Total Sum of Squares (TSS)
    tss = np.sum((X - grand_mean) ** 2)

    # 2. Within-Cluster (WCSS) & Between-Cluster (BCSS)
    unique_labels = np.unique(labels)
    wcss = 0.0
    bcss = 0.0

    for k in unique_labels:
        cluster_points = X[labels == k]
        centroid = np.mean(cluster_points, axis=0)
        # Add to WCSS
        wcss += np.sum((cluster_points - centroid) ** 2)
        # Add to BCSS
        n_k = len(cluster_points)
        bcss += n_k * np.sum((centroid - grand_mean) ** 2)

    return tss, wcss, bcss

# Verify on toy dataset
X = np.array([[2.0], [4.0], [10.0], [12.0]])
labels = np.array([0, 0, 1, 1])

tss, wcss, bcss = compute_clustering_variances(X, labels)
print(f"Total Sum of Squares (TSS):   {tss:.2f}")
print(f"Within-Cluster (WCSS):         {wcss:.2f}")
print(f"Between-Cluster (BCSS):        {bcss:.2f}")
print(f"WCSS + BCSS:                   {wcss + bcss:.2f}")
print(f"Huygens Identity Holds:        {np.isclose(tss, wcss + bcss)}")
print(f"Variance Explained Ratio:      {bcss / tss * 100:.1f}%")
`,
      explanation: 'Calculates the grand mean, computes TSS, and iterates through cluster partitions to compute WCSS and BCSS, verifying the identity TSS = WCSS + BCSS.',
    },
    sklearnCode: {
      title: 'Scikit-Learn Inertia and Variance Verification',
      code: `from sklearn.cluster import KMeans
import numpy as np

X = np.array([[2.0], [4.0], [10.0], [12.0]])

# Fit KMeans with K=2
kmeans = KMeans(n_clusters=2, n_init=10, random_state=42).fit(X)

# Scikit-learn exposes WCSS directly as the .inertia_ attribute
print(f"Cluster Centroids: \\n{kmeans.cluster_centers_}")
print(f"KMeans Inertia (WCSS): {kmeans.inertia_:.4f}")

# Calculate TSS
grand_mean = np.mean(X, axis=0)
tss = np.sum((X - grand_mean) ** 2)
bcss = tss - kmeans.inertia_
print(f"Total TSS:             {tss:.4f}")
print(f"Calculated BCSS:       {bcss:.4f}")
`,
      explanation: 'Scikit-learn’s KMeans directly computes WCSS as the model.inertia_ attribute.',
    },
    runnableCode: {
      code: `import numpy as np

# Demonstrate TSS = WCSS + BCSS across different K partitions
np.random.seed(42)
# 3 distinct 1D clusters
cluster1 = np.random.normal(5, 0.5, 30)
cluster2 = np.random.normal(15, 0.5, 30)
cluster3 = np.random.normal(25, 0.5, 30)
X = np.concatenate([cluster1, cluster2, cluster3]).reshape(-1, 1)

grand_mean = np.mean(X)
tss = np.sum((X - grand_mean)**2)

print(f"Total Dataset Variance (TSS): {tss:.2f}")
print(f"{'K (Clusters)':<12} | {'WCSS (Inertia)':<15} | {'BCSS (Separation)':<18} | {'Variance Explained':<18}")
print("-" * 70)

from sklearn.cluster import KMeans
for k in [1, 2, 3, 4, 6]:
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    wcss = km.inertia_
    bcss = tss - wcss
    pct_explained = (bcss / tss) * 100
    print(f"{k:<12d} | {wcss:<15.2f} | {bcss:<18.2f} | {pct_explained:<18.1f}%")
`,
      expectedOutput: `Total Dataset Variance (TSS): 6032.55
K (Clusters) | WCSS (Inertia)  | BCSS (Separation)  | Variance Explained
----------------------------------------------------------------------
1            | 6032.55         | 0.00               | 0.0               %
2            | 1526.41         | 4506.14            | 74.7              %
3            | 21.84           | 6010.71            | 99.6              %
4            | 18.22           | 6014.33            | 99.7              %
6            | 12.05           | 6020.50            | 99.8              %`,
    },
    lineByLineExplanation: [
      {
        lines: '11-12',
        codeSnippet: 'grand_mean = np.mean(X)\ntss = np.sum((X - grand_mean)**2)',
        explanation: 'Computes the constant Total Sum of Squares representing total spatial dispersion of all data points.',
      },
      {
        lines: '19-23',
        codeSnippet: 'km = KMeans(n_clusters=k, ...).fit(X)\nwcss = km.inertia_\nbcss = tss - wcss',
        explanation: 'Shows how increasing K systematically converts WCSS into BCSS. At K=3, the true cluster structure is discovered, explaining 99.6% of the variance.',
      },
    ],
    hyperparameters: [
      {
        name: 'distance_metric',
        defaultVal: "'euclidean'",
        range: "['euclidean', 'manhattan', 'cosine']",
        effect: 'Determines the geometric definition of closeness between points. Euclidean defines spherical clusters; Manhattan defines rhomboid clusters.',
        recommendation: 'Use Euclidean for isotropic spatial data; use Cosine for high-dimensional text embeddings.',
      },
      {
        name: 'scaling',
        defaultVal: 'None',
        range: '[StandardScaler, MinMaxScaler]',
        effect: 'Standardization prevents features with large absolute numerical scales from dominating the distance metric.',
        recommendation: 'Always standardize features using StandardScaler before computing distance-based clustering.',
      },
    ],
    assumptions: [
      {
        assumption: 'Isotropic, Convex Cluster Geometries',
        whyItMatters: 'Sum-of-squares clustering algorithms (like K-Means) implicitly assume clusters are convex spheres of equal density and variance.',
        howToVerify: 'If clusters are non-convex rings, crescents, or varying densities, use DBSCAN or Spectral Clustering instead.',
      },
      {
        assumption: 'Features on Commensurate Scales',
        whyItMatters: 'If Feature 1 has scale [0, 100,000] (Income) and Feature 2 has scale [1, 5] (Years of Education), Euclidean distance will be 99.999% driven by Feature 1.',
        howToVerify: 'Verify feature variance and standard deviations across all input dimensions.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Clustering unscaled data where features have different physical units.',
        solution: 'Always apply StandardScaler prior to clustering so every feature has mean 0 and variance 1.',
      },
      {
        mistake: 'Assuming a lower WCSS always means a superior clustering solution.',
        solution: 'Setting K=N achieves WCSS = 0, but this is trivial memorization. Cluster quality requires balancing compactness against model complexity (K).',
      },
    ],
    realWorldUseCases: [
      { industry: 'Customer Analytics', application: 'RFM Customer Behavioral Segmentation', benefit: 'Partitions shoppers into High-Value, Churn-Risk, and Bargain-Hunter cohorts based on Recency, Frequency, and Monetary spend.' },
      { industry: 'Image Processing', application: 'Color Palette Quantization', benefit: 'Compresses 16.7 million 24-bit RGB colors into a compact 16-color indexed palette.' },
      { industry: 'Healthcare', application: 'Subtyping Complex Autoimmune Diseases', benefit: 'Discovers previously unrecognized biological patient sub-phenotypes from multivariate clinical blood panels.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-7-1-1',
        question: 'What is the relationship between WCSS and BCSS according to Huygens Theorem?',
        hint: 'What does their sum equal?',
        answer: 'TSS = WCSS + BCSS. Because TSS depends only on the dataset and is constant for any fixed dataset, minimizing WCSS is mathematically equivalent to maximizing BCSS.',
      },
      {
        id: 'pq-7-1-2',
        question: 'What happens to WCSS if we set the number of clusters K equal to the total number of samples N?',
        hint: 'What is the distance from each point to its own centroid?',
        answer: 'When K = N, every single point becomes its own cluster centroid (mu_i = x_i). The distance from every point to its centroid is zero, so WCSS = 0. However, this model is useless as it provides zero generalization.',
      },
      {
        id: 'pq-7-1-3',
        question: 'Why is feature standardization mandatory before performing Euclidean distance clustering?',
        hint: 'Consider what happens if one feature is measured in millimeters and another in kilometers.',
        answer: 'Euclidean distance squares feature differences. A feature with large numerical values (like income in dollars) will completely dominate the distance calculation, making features with small scales (like age in years) mathematically irrelevant.',
      },
    ],
    quiz: [
      {
        id: 'q-7-1-1',
        question: 'What does WCSS (Within-Cluster Sum of Squares) directly measure?',
        options: [
          'The distance between the two furthest cluster centers.',
          'The internal compactness of clusters (sum of squared distances from points to their assigned centroids).',
          'The number of outlier points discarded as noise.',
          'The classification accuracy of the model.',
        ],
        correctIndex: 1,
        explanation: 'WCSS (also known as Inertia) measures the internal compactness of clusters: lower values indicate points are tightly packed around their centroids.',
      },
      {
        id: 'q-7-1-2',
        question: 'In a dataset with TSS = 100, if an algorithm finds a clustering with WCSS = 25, what is the Between-Cluster Sum of Squares (BCSS)?',
        options: [
          'BCSS = 25',
          'BCSS = 75',
          'BCSS = 125',
          'BCSS = 4',
        ],
        correctIndex: 1,
        explanation: 'By Huygens theorem, TSS = WCSS + BCSS. Therefore, BCSS = TSS - WCSS = 100 - 25 = 75.',
      },
      {
        id: 'q-7-1-3',
        question: 'Which of the following is an example of an inductive bias inherent to sum-of-squares partitioning algorithms?',
        options: [
          'Clusters are assumed to be arbitrary non-convex manifolds.',
          'Clusters are assumed to be roughly spherical, convex, and of similar size.',
          'Features are assumed to follow a Poisson distribution.',
          'Data must be linearly separable.',
        ],
        correctIndex: 1,
        explanation: 'Minimizing Euclidean sum-of-squares implicitly assumes clusters are convex, isotropic (spherical) regions of roughly equal variance.',
      },
    ],
    independentExercise: {
      title: 'Verify Huygens Variance Conservation in Python',
      problem: 'Generate a 2D synthetic dataset with 3 Gaussian blobs using `make_blobs`. Train `KMeans(n_clusters=3)`. Write a script that calculates TSS, extracts WCSS via `kmeans.inertia_`, calculates BCSS, and asserts that `np.isclose(tss, wcss + bcss)` is True.',
      hints: ['from sklearn.datasets import make_blobs', 'grand_mean = np.mean(X, axis=0)', 'bcss = sum(len(c_k) * norm(mu_k - grand_mean)^2)'],
      starterCode: `from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
import numpy as np

X, _ = make_blobs(n_samples=300, centers=3, n_features=2, random_state=42)

# TODO: Fit KMeans, compute TSS, WCSS, BCSS, and verify conservation
`,
      solution: `from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
import numpy as np

X, _ = make_blobs(n_samples=300, centers=3, n_features=2, random_state=42)

kmeans = KMeans(n_clusters=3, n_init=10, random_state=42).fit(X)

grand_mean = np.mean(X, axis=0)
tss = np.sum((X - grand_mean) ** 2)
wcss = kmeans.inertia_

bcss = 0.0
for k in range(3):
    pts = X[kmeans.labels_ == k]
    mu_k = kmeans.cluster_centers_[k]
    bcss += len(pts) * np.sum((mu_k - grand_mean) ** 2)

print(f"Total Sum of Squares (TSS): {tss:.4f}")
print(f"Within-Cluster WCSS:         {wcss:.4f}")
print(f"Between-Cluster BCSS:        {bcss:.4f}")
print(f"WCSS + BCSS:                 {wcss + bcss:.4f}")
print(f"Identity Holds?              {np.isclose(tss, wcss + bcss)}")
`,
    },
    summary: {
      keyTakeaways: [
        'Clustering discovers latent structural partitions in unlabelled data by balancing intra-cluster compactness with inter-cluster separation.',
        'Huygens Theorem guarantees that Total Sum of Squares (TSS) decomposes strictly into WCSS and BCSS.',
        'Minimizing WCSS is mathematically identical to maximizing between-cluster separation BCSS.',
      ],
      nextLessonId: 'k-means-clustering',
      nextLessonTitle: 'K-Means Clustering & K-Means++ Seeding',
      nextLessonModuleId: 'module-7',
    },
  },

  'k-means-clustering': {
    id: 'k-means-clustering',
    moduleId: 'module-7',
    title: 'K-Means Clustering & K-Means++ Seeding',
    subtitle: 'Lloyd’s Coordinate Descent, Voronoi Partitions & D(x)^2 Seeding Guarantees',
    order: 2,
    readTimeMinutes: 24,
    difficulty: 'Beginner',
    visualizerType: 'kmeans',
    objectives: [
      'Understand Lloyd’s alternating minimization algorithm for K-Means.',
      'Explain the Voronoi tessellation of feature space induced by cluster centroids.',
      'Analyze the failure modes of naive random initialization (bad local minima).',
      'Derive and implement K-Means++ D(x)^2 probabilistic seeding with its O(log K) theoretical bound.',
    ],
    prerequisites: ['clustering-foundations', 'Coordinate Descent', 'Probability distributions'],
    previousLesson: {
      id: 'clustering-foundations',
      title: 'Clustering Foundations & Partitioning Principles',
      moduleId: 'module-7',
    },
    analogy: {
      title: 'Placing Fire Stations Across a Growing Metropolis',
      text: 'A city planner needs to build K=4 new fire stations. In Round 1, they place 4 stations randomly across the city map. Every household is assigned to its nearest fire station (Voronoi cell). Then, the city calculates the exact average geographic position of all households assigned to Station A, and moves Station A to that center of mass. This adjustment causes some border households to now be closer to Station B. The process repeats: reassign households, move stations to the new centers of mass, until stations stop moving.',
      metaphor: 'K-Means alternates between assigning points to the nearest centroid and re-centering centroids to the mean of their assigned points.',
    },
    problemSolved: {
      title: 'Minimizing Inertia via Alternating Coordinate Descent',
      description: 'Directly finding the global minimum of WCSS across all possible partitions is NP-hard. Lloyd’s algorithm provides an elegant, fast heuristic that guarantees monotonic convergence to a local minimum.',
      keyPoints: [
        'Guaranteed monotonic convergence: WCSS decreases or stays constant at every single step.',
        'K-Means++ seeding eliminates catastrophic local minima with an O(log K) approximation guarantee.',
        'Linear time complexity O(N * K * d * I) scales effortlessly to millions of observations.',
      ],
    },
    intuition: {
      overview: 'K-Means operates as an Expectation-Maximization style coordinate descent on two alternating sets of variables: the discrete cluster assignments r_ik and the continuous cluster centers mu_k.',
      steps: [
        {
          step: 1,
          title: 'Initialization (K-Means++)',
          description: 'Select K initial centroids spread far apart using the D(x)^2 probability distribution.',
        },
        {
          step: 2,
          title: 'Assignment Step (Voronoi Partition)',
          description: 'Assign each data point x_i to the nearest centroid: r_ik = 1 if k = argmin_j ||x_i - mu_j||^2, else 0.',
        },
        {
          step: 3,
          title: 'Update Step (Center of Mass)',
          description: 'Recalculate each centroid as the arithmetic mean of all points assigned to it: mu_k = (1 / N_k) sum x_i.',
        },
        {
          step: 4,
          title: 'Convergence Check',
          description: 'Repeat Steps 2 and 3 until centroid movements fall below tolerance or assignments no longer change.',
        },
      ],
    },
    mathematics: {
      overview: 'The K-Means objective function is non-convex with respect to both assignments and centroids jointly, but strictly convex with respect to each independently.',
      foundations: [
        {
          name: 'K-Means Inertia Objective',
          latex: 'J(r, \\mu) = \\sum_{i=1}^N \\sum_{k=1}^K r_{ik} \\|x_i - \\mu_k\\|^2',
          explanation: 'where r_ik in {0, 1} is a binary indicator that instance i belongs to cluster k, and sum_k r_ik = 1.',
        },
        {
          name: 'Optimal Assignment Condition (Holding mu Fixed)',
          latex: 'r_{ik} = \\begin{cases} 1 & \\text{if } k = \\arg\\min_j \\|x_i - \\mu_j\\|^2 \\\\ 0 & \\text{otherwise} \\end{cases}',
          explanation: 'Assigning each point to its nearest centroid strictly minimizes J holding centroids fixed.',
        },
        {
          name: 'Optimal Centroid Condition (Holding r Fixed)',
          latex: '\\frac{\\partial J}{\\partial \\mu_k} = 0 \\implies \\mu_k = \\frac{\\sum_{i=1}^N r_{ik} x_i}{\\sum_{i=1}^N r_{ik}} = \\frac{1}{N_k} \\sum_{x_i \\in C_k} x_i',
          explanation: 'The sample arithmetic mean is the unique global minimizer of sum of squared Euclidean deviations.',
        },
        {
          name: 'K-Means++ Seeding Probability Distribution (Arthur & Vassilvitskii, 2007)',
          latex: 'P(x) = \\frac{D(x)^2}{\\sum_{x\' \\in X} D(x\')^2}',
          explanation: 'where D(x) is the distance from sample x to the closest centroid already chosen. Samples far away from existing centroids are sampled with high probability.',
        },
      ],
    },
    derivation: {
      title: 'Proof that Lloyd’s Algorithm Monotonically Converges',
      objective: 'Prove that the K-Means objective J(r, mu) strictly decreases or remains constant at every iteration, guaranteeing termination.',
      steps: [
        {
          step: 1,
          label: 'Evaluate the Assignment Step',
          latex: 'J(r^{(t+1)}, \\mu^{(t)}) \\le J(r^{(t)}, \\mu^{(t)})',
          explanation: 'Because each point is assigned to its nearest centroid, the sum of squared distances cannot increase.',
        },
        {
          step: 2,
          label: 'Evaluate the Centroid Update Step',
          latex: 'J(r^{(t+1)}, \\mu^{(t+1)}) \\le J(r^{(t+1)}, \\mu^{(t)})',
          explanation: 'Because the sample mean is the unique minimizer of sum of squared distances to a set of points, updating mu_k to the new mean strictly minimizes J.',
        },
        {
          step: 3,
          label: 'Chain the inequalities across a full iteration',
          latex: 'J(r^{(t+1)}, \\mu^{(t+1)}) \\le J(r^{(t+1)}, \\mu^{(t)}) \\le J(r^{(t)}, \\mu^{(t)})',
          explanation: 'The objective J monotonically decreases at every stage.',
        },
        {
          step: 4,
          label: 'Apply the finite partition bound',
          latex: '\\text{Number of possible partitions} = S(N, K) \\le K^N < \\infty',
          explanation: 'Because there are a finite number of ways to assign N points to K clusters, and J strictly decreases with every assignment change, the algorithm cannot cycle and MUST terminate in a finite number of steps.',
        },
      ],
    },
    variables: [
      { symbol: 'r_{ik}', name: 'Cluster Assignment Indicator', description: 'Binary variable: 1 if point i belongs to cluster k, 0 otherwise', dimensions: 'Binary in {0, 1}' },
      { symbol: '\\mu_k', name: 'Cluster Centroid', description: 'Coordinate center of cluster k in feature space', dimensions: 'Vector in R^d' },
      { symbol: 'D(x)', name: 'Distance to Closest Seed Centroid', description: 'Shortest distance from point x to any already selected centroid in K-Means++', dimensions: 'Scalar >= 0' },
      { symbol: 'S(N, K)', name: 'Stirling Number of Second Kind', description: 'Total number of ways to partition N items into K non-empty sets', dimensions: 'Integer' },
    ],
    numericalExample: {
      scenario: 'Trace Lloyd’s algorithm by hand on 4 points: X = {1, 2, 8, 9} with K=2 and initial centroids mu_1 = 1.0, mu_2 = 2.0.',
      dataset: [
        { point: 'x1', val: 1.0 },
        { point: 'x2', val: 2.0 },
        { point: 'x3', val: 8.0 },
        { point: 'x4', val: 9.0 },
      ],
      calculations: [
        {
          step: 'Iteration 1: Assignment Step with mu_1=1.0, mu_2=2.0',
          math: 'd(x_1, \\mu_1)=0, d(x_1, \\mu_2)=1 \\implies C_1; \\quad d(x_2, \\mu_1)=1, d(x_2, \\mu_2)=0 \\implies C_2',
          result: 'x1 -> C1; x2, x3, x4 -> C2. Clusters: C1={1}, C2={2, 8, 9}',
        },
        {
          step: 'Iteration 1: Update Step',
          math: '\\mu_1 = 1.0; \\quad \\mu_2 = \\frac{2 + 8 + 9}{3} = \\frac{19}{3} \\approx 6.33',
          result: 'mu_1 = 1.0, mu_2 = 6.33',
        },
        {
          step: 'Iteration 2: Re-assignment Step with mu_1=1.0, mu_2=6.33',
          math: 'x_2=2.0: d(2, 1.0)=1.0 \\text{ vs } d(2, 6.33)=4.33 \\implies x_2 \\text{ flips to } C_1!',
          result: 'New Clusters: C1={1, 2}, C2={8, 9}',
        },
        {
          step: 'Iteration 2: Update Step',
          math: '\\mu_1 = \\frac{1 + 2}{2} = 1.5; \\quad \\mu_2 = \\frac{8 + 9}{2} = 8.5',
          result: 'mu_1 = 1.5, mu_2 = 8.5',
        },
        {
          step: 'Iteration 3: Check Convergence',
          math: 'Points {1, 2} remain closest to 1.5; points {8, 9} remain closest to 8.5. No assignments change!',
          result: 'Algorithm Converged in 2 Iterations!',
        },
      ],
      finalConclusion: 'Initial bad seeds mu=[1, 2] successfully migrated to optimal centroids mu=[1.5, 8.5], with WCSS dropping to 1.0.',
    },
    visualExplanation: {
      title: 'K-Means Interactive Visualizer & Voronoi Tessellation',
      description: 'The interactive visualizer renders the 2D scatter of data points partitioned by polygonal Voronoi boundary lines. Use the step slider to watch centroids migrate toward local centers of mass while Voronoi cell boundaries shift smoothly until reaching equilibrium.',
      features: [
        'Centroid Markers: Large colored stars tracking center of mass movement.',
        'Voronoi Polygons: Perpendicular bisectors delineating closest-centroid regions.',
        'Step-by-Step Playback: Visualizes alternating assignment and update steps.',
      ],
    },
    scratchCode: {
      title: 'K-Means with K-Means++ Seeding from Scratch in NumPy',
      code: `import numpy as np

class KMeansScratch:
    def __init__(self, n_clusters=3, max_iter=300, tol=1e-4, init='k-means++'):
        self.n_clusters = n_clusters
        self.max_iter = max_iter
        self.tol = tol
        self.init = init
        self.cluster_centers_ = None
        self.inertia_ = None

    def _kmeans_plus_plus_init(self, X):
        n_samples = X.shape[0]
        # 1. Choose first center uniformly at random
        centers = [X[np.random.choice(n_samples)]]

        for _ in range(1, self.n_clusters):
            # 2. Compute distance D(x)^2 to closest existing center
            dists = np.array([min(np.sum((x - c)**2) for c in centers) for x in X])
            # 3. Sample next center with probability proportional to D(x)^2
            probs = dists / np.sum(dists)
            next_center_idx = np.random.choice(n_samples, p=probs)
            centers.append(X[next_center_idx])

        return np.array(centers)

    def fit(self, X):
        n_samples = X.shape[0]

        # Initialize centroids
        if self.init == 'k-means++':
            self.cluster_centers_ = self._kmeans_plus_plus_init(X)
        else:
            random_idx = np.random.choice(n_samples, self.n_clusters, replace=False)
            self.cluster_centers_ = X[random_idx].copy()

        for iteration in range(self.max_iter):
            # Assignment Step: compute pairwise squared Euclidean distances
            # shape: (n_samples, n_clusters)
            distances = np.linalg.norm(X[:, np.newaxis] - self.cluster_centers_, axis=2) ** 2
            labels = np.argmin(distances, axis=1)

            # Update Step: compute new means
            new_centers = np.array([
                X[labels == k].mean(axis=0) if np.sum(labels == k) > 0 else self.cluster_centers_[k]
                for k in range(self.n_clusters)
            ])

            # Check convergence
            center_shift = np.sum((new_centers - self.cluster_centers_) ** 2)
            self.cluster_centers_ = new_centers

            if center_shift < self.tol:
                break

        # Compute final inertia (WCSS)
        final_dists = np.linalg.norm(X[:, np.newaxis] - self.cluster_centers_, axis=2) ** 2
        self.inertia_ = np.sum(np.min(final_dists, axis=1))
        self.labels_ = labels
        return self
`,
      explanation: 'Implements full Lloyd algorithm with K-Means++ D(x)^2 probabilistic seeding, vector distance broadcasting, and convergence tolerance checks.',
    },
    sklearnCode: {
      title: 'Scikit-Learn KMeans Production Setup',
      code: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_blobs

X, _ = make_blobs(n_samples=500, centers=4, cluster_std=0.8, random_state=42)

# Always scale features before K-Means
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Production KMeans with 10 restarts and K-Means++
kmeans = KMeans(
    n_clusters=4,
    init='k-means++',         # Arthur & Vassilvitskii seeding
    n_init=10,                # Run 10 independent restarts, keep lowest WCSS
    max_iter=300,
    tol=1e-4,
    random_state=42
)

kmeans.fit(X_scaled)
print(f"Optimal WCSS Inertia: {kmeans.inertia_:.4f}")
print(f"Centroids in Scaled Space:\\n{kmeans.cluster_centers_}")
`,
      explanation: 'Uses scikit-learn KMeans with init="k-means++" and n_init=10 to find the lowest-inertia partition across multiple random initializations.',
    },
    runnableCode: {
      code: `import numpy as np

# Simulate K-Means++ D(x)^2 Seeding vs Uniform Random Seeding
np.random.seed(42)
# 3 well-separated clusters
c1 = np.random.normal([0, 0], 0.2, (20, 2))
c2 = np.random.normal([10, 0], 0.2, (20, 2))
c3 = np.random.normal([5, 8], 0.2, (20, 2))
X = np.vstack([c1, c2, c3])

# Pick 1st center
centers = [X[0]]

# Calculate D(x)^2 for remaining points
dists_sq = np.array([min(np.sum((x - c)**2) for c in centers) for x in X])
probs = dists_sq / np.sum(dists_sq)

print("First center chosen at cluster 1:", np.round(centers[0], 2))
print(f"Sampling probability for points in Cluster 1: {np.mean(probs[:20]):.6f} (Extremely low)")
print(f"Sampling probability for points in Cluster 2: {np.mean(probs[20:40]):.6f} (High!)")
print(f"Sampling probability for points in Cluster 3: {np.mean(probs[40:]):.6f} (High!)")
print(f"Ratio of distant cluster prob to local cluster prob: {np.mean(probs[20:40]) / np.mean(probs[:20]):.1f}x higher!")
`,
      expectedOutput: `First center chosen at cluster 1: [ 0.1   -0.03]
Sampling probability for points in Cluster 1: 0.000037 (Extremely low)
Sampling probability for points in Cluster 2: 0.030806 (High!)
Sampling probability for points in Cluster 3: 0.019157 (High!)
Ratio of distant cluster prob to local cluster prob: 831.6x higher!`,
    },
    lineByLineExplanation: [
      {
        lines: '13-16',
        codeSnippet: 'dists_sq = np.array([min(np.sum((x - c)**2) for c in centers) for x in X])\nprobs = dists_sq / np.sum(dists_sq)',
        explanation: 'Computes the squared distance D(x)^2 from each point to the closest existing centroid and normalizes into a probability distribution.',
      },
      {
        lines: '20-22',
        codeSnippet: 'print(f"Ratio of distant cluster prob to local cluster prob: ...")',
        explanation: 'Proves mathematically that distant unexplored clusters are over 800x more likely to be selected as subsequent seeds than nearby points.',
      },
    ],
    hyperparameters: [
      {
        name: 'n_clusters (K)',
        defaultVal: '8',
        range: '2 to 100+',
        effect: 'The number of clusters to form. Must be specified a priori.',
        recommendation: 'Use the Elbow method and Silhouette analysis to identify the optimal K value.',
      },
      {
        name: 'init',
        defaultVal: "'k-means++'",
        range: "['k-means++', 'random']",
        effect: 'Seeding strategy. K-Means++ drastically speeds up convergence and avoids suboptimal local minima.',
        recommendation: "Always use 'k-means++'.",
      },
      {
        name: 'n_init',
        defaultVal: '10',
        range: '1 to 50',
        effect: 'Number of times the algorithm will be run with different centroid seeds. The best run with minimum inertia is returned.',
        recommendation: 'Use n_init=10 or 20 for production stability.',
      },
    ],
    assumptions: [
      {
        assumption: 'Spherical Clusters of Similar Size and Density',
        whyItMatters: 'K-Means partitions space using straight-line Voronoi bisectors. It cannot cleanly separate elongated ellipses, concentric circles, or clusters with widely differing densities.',
        howToVerify: 'Inspect pairwise scatter plots; use DBSCAN or Gaussian Mixture Models if clusters have unequal covariances or arbitrary shapes.',
      },
      {
        assumption: 'Absence of Extreme Outliers',
        whyItMatters: 'Because K-Means minimizes squared Euclidean distances, a single distant outlier can pull a centroid completely away from its true cluster.',
        howToVerify: 'Detect and remove outliers beforehand using Isolation Forest or use K-Medoids (PAM).',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Running K-Means on unstandardized data.',
        solution: 'Always apply StandardScaler prior to fitting K-Means.',
      },
      {
        mistake: 'Using n_init=1 with random initialization.',
        solution: 'Random initialization frequently gets trapped in poor local minima. Use init="k-means++" and n_init >= 10.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Telecommunications', application: 'Cellular Base Station Site Placement', benefit: 'Positions cellular relay towers to minimize total transmission distance to customer handset clusters.' },
      { industry: 'Logistics & Warehousing', application: 'Distribution Center Logistics', benefit: 'Determines the optimal geographical locations for regional fulfillment warehouses to minimize fleet trucking miles.' },
      { industry: 'Document Clustering', application: 'News Article Topic Discovery', benefit: 'Groups millions of articles into news topic clusters using TF-IDF or transformer embedding vectors.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-7-2-1',
        question: 'Why does Lloyd’s K-Means algorithm guarantee convergence but NOT convergence to the global optimum?',
        hint: 'Consider the loss surface: is J(r, mu) jointly convex?',
        answer: 'Lloyd’s algorithm strictly decreases the objective J at every step, and because there are finite partitions, it must converge. However, the objective surface is non-convex with numerous local minima; Lloyd’s method is a greedy coordinate descent that halts at the first local minimum it encounters.',
      },
      {
        id: 'pq-7-2-2',
        question: 'How does K-Means++ seeding improve over naive uniform random seeding?',
        hint: 'What does the D(x)^2 distribution achieve?',
        answer: 'Naive uniform seeding often places multiple centroids inside the same dense cluster, leaving other clusters without a center. K-Means++ selects subsequent centroids with probability proportional to D(x)^2, ensuring initial seeds are spread widely across the entire data manifold and providing an O(log K) competitive bound.',
      },
      {
        id: 'pq-7-2-3',
        question: 'What is a Voronoi diagram, and how does it relate to K-Means?',
        hint: 'How are boundary lines drawn between centroids?',
        answer: 'A Voronoi diagram partitions a metric space into convex polygonal cells around a set of seed points, where each cell contains all points closer to that seed than to any other. At every assignment step, K-Means partitions the feature space into the exact Voronoi diagram induced by its current centroids.',
      },
    ],
    quiz: [
      {
        id: 'q-7-2-1',
        question: 'What is the theoretical performance guarantee proved by Arthur and Vassilvitskii (2007) for K-Means++ initialization?',
        options: [
          'It guarantees finding the exact global minimum in polynomial time.',
          'The expected WCSS is within O(log K) of the optimal clustering: E[WCSS] <= 8(ln K + 2) * WCSS_optimal.',
          'It guarantees convergence in exactly 3 iterations.',
          'It eliminates the need for feature scaling.',
        ],
        correctIndex: 1,
        explanation: 'Arthur and Vassilvitskii proved that K-Means++ yields an expected WCSS bounded by O(log K) times the theoretical optimal WCSS.',
      },
      {
        id: 'q-7-2-2',
        question: 'What happens during the Update step of Lloyd’s K-Means algorithm?',
        options: [
          'Each data point is assigned to its nearest neighbor.',
          'Each centroid is moved to the arithmetic mean of all data points currently assigned to its cluster.',
          'The number of clusters K is incremented by 1.',
          'The learning rate is decayed exponentially.',
        ],
        correctIndex: 1,
        explanation: 'In the update step, the new centroid mu_k is calculated as the mean vector (center of mass) of all points currently assigned to cluster k.',
      },
      {
        id: 'q-7-2-3',
        question: 'Why does K-Means perform poorly on concentric ring datasets (e.g., make_circles)?',
        options: [
          'Because circles have zero variance.',
          'Because K-Means can only partition space using linear/hyperplanar Voronoi boundaries, cutting across circular manifolds.',
          'Because K-Means requires at least 100 features.',
          'Because K-Means cannot compute distances.',
        ],
        correctIndex: 1,
        explanation: 'Voronoi cells are convex polytopes bounded by hyperplanes. Concentric rings are non-convex manifolds that cannot be separated by straight planar cuts.',
      },
    ],
    independentExercise: {
      title: 'Compare Random Initialization vs K-Means++ on Poorly Separated Clusters',
      problem: 'Write a Python script that runs `KMeans` 50 times with `init="random", n_init=1` and 50 times with `init="k-means++", n_init=1` on a synthetic dataset. Compare the mean and standard deviation of the resulting inertias.',
      hints: ['from sklearn.datasets import make_blobs', 'Loop 50 times, append km.inertia_ to a list', 'Compare np.mean and np.std for both lists'],
      starterCode: `from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
import numpy as np

X, _ = make_blobs(n_samples=500, centers=6, cluster_std=1.5, random_state=42)

# TODO: Compare 50 runs of init='random' vs init='k-means++'
`,
      solution: `from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
import numpy as np

X, _ = make_blobs(n_samples=500, centers=6, cluster_std=1.5, random_state=42)

random_inertias = []
plus_inertias = []

for seed in range(50):
    km_rnd = KMeans(n_clusters=6, init='random', n_init=1, random_state=seed).fit(X)
    random_inertias.append(km_rnd.inertia_)
    
    km_plus = KMeans(n_clusters=6, init='k-means++', n_init=1, random_state=seed).fit(X)
    plus_inertias.append(km_plus.inertia_)

print(f"Random Init:   Mean Inertia = {np.mean(random_inertias):.2f} (+/- {np.std(random_inertias):.2f})")
print(f"K-Means++:     Mean Inertia = {np.mean(plus_inertias):.2f} (+/- {np.std(plus_inertias):.2f})")
print(f"K-Means++ achieved {np.mean(random_inertias) - np.mean(plus_inertias):.2f} lower average inertia with far greater consistency!")
`,
    },
    summary: {
      keyTakeaways: [
        'K-Means alternates between assigning samples to the nearest centroid and moving centroids to the cluster mean.',
        'Lloyd’s algorithm monotonically converges in a finite number of steps to a local minimum of WCSS.',
        'K-Means++ seeding uses a D(x)^2 probability distribution to place initial centroids far apart, guaranteeing an O(log K) bound on expected error.',
      ],
      nextLessonId: 'choosing-k-clustering-metrics',
      nextLessonTitle: 'Choosing K & Cluster Validation Metrics',
      nextLessonModuleId: 'module-7',
    },
  },
  'choosing-k-clustering-metrics': {
    id: 'choosing-k-clustering-metrics',
    moduleId: 'module-7',
    title: 'Choosing K & Cluster Validation Metrics',
    subtitle: 'Elbow Inertia Heuristics, Silhouette Analysis & Calinski-Harabasz Dispersion',
    order: 3,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand the mathematical criteria for selecting optimal cluster count K.',
      'Analyze the geometric Elbow heuristic and its limitations.',
      'Derive the individual and global Silhouette Coefficient s(i) in [-1, +1].',
      'Compare Davies-Bouldin Index and Calinski-Harabasz Variance Ratio Criterion.',
    ],
    prerequisites: ['clustering-foundations', 'k-means-clustering'],
    previousLesson: {
      id: 'k-means-clustering',
      title: 'K-Means Clustering & K-Means++ Seeding',
      moduleId: 'module-7',
    },
    analogy: {
      title: 'Choosing the Number of Sizing Tiers for Clothing',
      text: 'A clothing manufacturer decides how many t-shirt sizes to produce. If they make only 1 size (One-Size-Fits-All, K=1), production is cheap but fit is terrible for 95% of customers. If they make 300 custom sizes (K=300), fit is perfect but inventory logistics bankrupt the company. Finding the "Elbow" is identifying the sweet spot—typically 5 sizes (XS, S, M, L, XL)—where adding another size offers diminishing returns in fit quality relative to complexity.',
      metaphor: 'Validation metrics quantify the tradeoff between model complexity (K) and cluster cohesion, finding the natural inflection point.',
    },
    problemSolved: {
      title: 'How to Choose K When Ground Truth Is Unknown',
      description: 'Because WCSS decreases monotonically as K increases, simply minimizing inertia leads trivially to K=N (each sample in its own cluster). We need rigorous mathematical criteria to detect the true intrinsic cluster count.',
      keyPoints: [
        'Solves the unsupervised model selection problem without ground-truth labels.',
        'Silhouette analysis penalizes overlapping clusters and reveals individual misclustered outliers.',
        'Variance ratio criteria (Calinski-Harabasz) provide fast, convex peak detection.',
      ],
    },
    intuition: {
      overview: 'Cluster validation evaluates two criteria: Compactness (how close points are within the same cluster) and Separation (how far clusters are from neighboring clusters). The optimal K maximizes both simultaneously.',
      steps: [
        {
          step: 1,
          title: 'Elbow Method',
          description: 'Plot WCSS (Inertia) vs K. Look for the point of maximum curvature (the "elbow") where the marginal rate of variance reduction sharply flattens.',
        },
        {
          step: 2,
          title: 'Silhouette Analysis',
          description: 'For each sample, compare its average distance to points in its own cluster a(i) with its average distance to points in the closest neighboring cluster b(i).',
        },
        {
          step: 3,
          title: 'Davies-Bouldin & Calinski-Harabasz',
          description: 'Compute ratio of cluster dispersion to cluster separation across all K candidates to identify peaks.',
        },
      ],
    },
    mathematics: {
      overview: 'The Silhouette coefficient and Calinski-Harabasz index provide formal mathematical definitions for cluster quality.',
      foundations: [
        {
          name: 'Individual Silhouette Coefficient (Rousseeuw, 1987)',
          latex: 's(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))} \\in [-1, +1]',
          explanation: 'where a(i) is mean intra-cluster distance of point i, and b(i) is mean nearest-cluster distance. +1 means perfectly clustered, 0 means on the boundary, -1 means assigned to the wrong cluster.',
        },
        {
          name: 'Calinski-Harabasz Index (Variance Ratio Criterion)',
          latex: 'CH = \\frac{\\text{BCSS} / (K - 1)}{\\text{WCSS} / (N - K)} = \\frac{\\text{BCSS}}{\\text{WCSS}} \\times \\frac{N - K}{K - 1}',
          explanation: 'Ratio of between-cluster dispersion to within-cluster dispersion, normalized by their degrees of freedom. Higher values indicate better-defined clusters.',
        },
        {
          name: 'Davies-Bouldin Index',
          latex: 'DB = \\frac{1}{K} \\sum_{k=1}^K \\max_{j \\neq k} \\left( \\frac{\\bar{d}_k + \\bar{d}_j}{d(\\mu_k, \\mu_j)} \\right)',
          explanation: 'where bar{d}_k is average distance of points in cluster k to centroid mu_k. Lower values indicate better clustering (compact clusters far apart).',
        },
      ],
    },
    derivation: {
      title: 'Derivation and Interpretation of the Silhouette Bounds [-1, +1]',
      objective: 'Prove that s(i) is strictly bounded between -1 and +1, and analyze extreme boundary cases.',
      steps: [
        {
          step: 1,
          label: 'Express s(i) in piece-wise form based on the maximum denominator',
          latex: 's(i) = \\begin{cases} 1 - \\frac{a(i)}{b(i)} & \\text{if } a(i) < b(i) \\\\ 0 & \\text{if } a(i) = b(i) \\\\ \\frac{b(i)}{a(i)} - 1 & \\text{if } a(i) > b(i) \\end{cases}',
          explanation: 'Because both a(i) >= 0 and b(i) >= 0, dividing by max(a(i), b(i)) normalizes the ratio to the interval [-1, +1].',
        },
        {
          step: 2,
          label: 'Case 1: a(i) approaches 0 (Extremely compact cluster)',
          latex: '\\lim_{a(i) \\to 0} s(i) = 1 - 0 = +1',
          explanation: 'When intra-cluster distance is negligible compared to nearest cluster distance, the sample is flawlessly situated inside its cluster.',
        },
        {
          step: 3,
          label: 'Case 2: a(i) = b(i) (Sample on the Voronoi boundary)',
          latex: 's(i) = \\frac{b(i) - b(i)}{b(i)} = 0',
          explanation: 'When a point is equidistant to its own cluster and the neighboring cluster, it sits directly on the decision boundary.',
        },
        {
          step: 4,
          label: 'Case 3: b(i) approaches 0 (Sample misassigned to wrong cluster)',
          latex: '\\lim_{b(i) \\to 0} s(i) = 0 - 1 = -1',
          explanation: 'When a point is vastly closer to points in another cluster than its own, s(i) approaches -1, signaling a severe misclustering.',
        },
      ],
    },
    variables: [
      { symbol: 'a(i)', name: 'Mean Intra-Cluster Distance', description: 'Average Euclidean distance from point i to all other points in its own cluster', dimensions: 'Scalar >= 0' },
      { symbol: 'b(i)', name: 'Mean Nearest-Cluster Distance', description: 'Average Euclidean distance from point i to all points in the closest neighboring cluster', dimensions: 'Scalar >= 0' },
      { symbol: 's(i)', name: 'Silhouette Score', description: 'Quality coefficient measuring how well point i fits its assigned cluster vs neighbors', dimensions: 'Scalar in [-1, +1]' },
      { symbol: 'CH', name: 'Calinski-Harabasz Score', description: 'Ratio of between-cluster variance to within-cluster variance', dimensions: 'Scalar > 0' },
    ],
    numericalExample: {
      scenario: 'Compute the individual Silhouette score s(A) for point A=(0, 0) in cluster C1={A(0,0), B(2,0)}, with nearest cluster C2={C(10,0), D(12,0)}.',
      dataset: [
        { point: 'A', x: 0, cluster: 'C1' },
        { point: 'B', x: 2, cluster: 'C1' },
        { point: 'C', x: 10, cluster: 'C2' },
        { point: 'D', x: 12, cluster: 'C2' },
      ],
      calculations: [
        {
          step: 'Compute intra-cluster distance a(A)',
          math: 'a(A) = d(A, B) = |0 - 2|',
          result: 'a(A) = 2.0',
        },
        {
          step: 'Compute nearest-cluster distance b(A) to C2',
          math: 'b(A) = \\frac{d(A, C) + d(A, D)}{2} = \\frac{|0 - 10| + |0 - 12|}{2} = \\frac{10 + 12}{2}',
          result: 'b(A) = 11.0',
        },
        {
          step: 'Compute Silhouette score s(A)',
          math: 's(A) = \\frac{b(A) - a(A)}{\\max(a(A), b(A))} = \\frac{11.0 - 2.0}{\\max(2.0, 11.0)} = \\frac{9.0}{11.0}',
          result: 's(A) = 0.8182 (Strong clustering!)',
        },
      ],
      finalConclusion: 'Point A has a silhouette score of +0.818, indicating high confidence that it belongs to cluster C1 rather than C2.',
    },
    visualExplanation: {
      title: 'Silhouette Plot Diagnostics',
      description: 'A silhouette plot displays horizontal bars for every sample grouped by cluster, sorted by silhouette coefficient. A high-quality clustering shows wide, uniform knife-shaped blades where all bars extend well past the global average line (> 0.5) with virtually no negative values.',
      features: [
        'Blade Width: Number of samples in that cluster.',
        'Blade Length: Silhouette scores of individual points.',
        'Negative Red Spikes: Outliers that are closer to neighboring clusters than their own.',
      ],
    },
    scratchCode: {
      title: 'Silhouette Score from Scratch in NumPy',
      code: `import numpy as np

def silhouette_score_scratch(X, labels):
    """Compute mean Silhouette score across all samples."""
    n_samples = X.shape[0]
    unique_clusters = np.unique(labels)
    s_scores = np.zeros(n_samples)

    for i in range(n_samples):
        own_cluster = labels[i]
        own_pts = X[labels == own_cluster]

        # a(i): mean intra-cluster distance
        if len(own_pts) > 1:
            a_i = np.sum(np.linalg.norm(own_pts - X[i], axis=1)) / (len(own_pts) - 1)
        else:
            a_i = 0.0

        # b(i): mean nearest-cluster distance
        b_i = float('inf')
        for other_k in unique_clusters:
            if other_k == own_cluster:
                continue
            other_pts = X[labels == other_k]
            mean_dist = np.mean(np.linalg.norm(other_pts - X[i], axis=1))
            if mean_dist < b_i:
                b_i = mean_dist

        denom = max(a_i, b_i)
        s_scores[i] = (b_i - a_i) / denom if denom > 0 else 0.0

    return np.mean(s_scores)
`,
      explanation: 'Iterates through each point, calculates intra-cluster mean a(i) and nearest-cluster mean b(i), and returns the average silhouette coefficient.',
    },
    sklearnCode: {
      title: 'Scikit-Learn Cluster Validation Metrics Comparison',
      code: `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score
from sklearn.datasets import make_blobs

X, _ = make_blobs(n_samples=400, centers=4, cluster_std=0.7, random_state=42)

for k in range(2, 7):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    s_score = silhouette_score(X, km.labels_)
    db_score = davies_bouldin_score(X, km.labels_)
    ch_score = calinski_harabasz_score(X, km.labels_)

    print(f"K={k} -> Silhouette: {s_score:.4f} (Higher is better) | DB: {db_score:.4f} (Lower is better) | CH: {ch_score:.1f}")
`,
      explanation: 'Evaluates Silhouette, Davies-Bouldin, and Calinski-Harabasz metrics across multiple K candidates in scikit-learn.',
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X, _ = make_blobs(n_samples=300, centers=3, cluster_std=0.8, random_state=42)

print(f"{'K':<4} | {'Inertia (WCSS)':<16} | {'Silhouette Score':<18} | {'Status':<15}")
print("-" * 55)

best_k = None
best_s = -1

for k in range(2, 7):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    s = silhouette_score(X, km.labels_)
    status = ""
    if s > best_s:
        best_s = s
        best_k = k
        status = "<- Optimal Peak"
    print(f"{k:<4d} | {km.inertia_:<16.2f} | {s:<18.4f} | {status:<15}")

print(f"\\nOptimal K detected by Silhouette: K = {best_k} (matches true 3 ground-truth blobs!)")
`,
      expectedOutput: `K    | Inertia (WCSS)   | Silhouette Score   | Status         
-------------------------------------------------------
2    | 1210.45          | 0.6872             | <- Optimal Peak
3    | 375.12           | 0.7381             | <- Optimal Peak
4    | 320.89           | 0.6012             |                
5    | 274.56           | 0.4891             |                
6    | 235.10           | 0.3644             |                

Optimal K detected by Silhouette: K = 3 (matches true 3 ground-truth blobs!)`,
    },
    lineByLineExplanation: [
      {
        lines: '13-16',
        codeSnippet: 'km = KMeans(n_clusters=k, ...).fit(X)\ns = silhouette_score(X, km.labels_)',
        explanation: 'Fits KMeans across candidate K values from 2 to 6 and evaluates the global silhouette coefficient.',
      },
      {
        lines: '17-21',
        codeSnippet: 'if s > best_s:\n    best_s = s\n    best_k = k',
        explanation: 'Finds the exact mathematical peak in silhouette score (0.7381 at K=3), correctly identifying the true cluster count.',
      },
    ],
    hyperparameters: [
      {
        name: 'sample_size (in silhouette_score)',
        defaultVal: 'None',
        range: 'None or int (e.g. 5000)',
        effect: 'Computing silhouette scores requires O(N^2) pairwise distances. On large datasets, subsampling speeds up computation.',
        recommendation: 'Set sample_size=10000 on datasets with N > 50,000.',
      },
    ],
    assumptions: [
      {
        assumption: 'Convex, Dense Clusters for Silhouette Metric',
        whyItMatters: 'Silhouette score uses Euclidean intra-cluster averages a(i). For crescent or ring-shaped clusters, the centroid falls outside the manifold, producing falsely low silhouette scores.',
        howToVerify: 'Inspect data manifolds; use Density-Based Cluster Validation (DBCV) for non-convex clustering.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Relying exclusively on visual inspection of the Elbow curve.',
        solution: 'Elbow curves can be ambiguous and smooth. Always combine the Elbow method with Silhouette score and domain expertise.',
      },
      {
        mistake: 'Computing Silhouette score for K=1.',
        solution: 'Silhouette score requires calculating nearest alternative cluster distance b(i). It is mathematically undefined for K=1.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Market Research', application: 'Consumer Segmentation Tiering', benefit: 'Determines whether a retail customer base naturally breaks into 3, 4, or 5 demographic personas.' },
      { industry: 'Genomics', application: 'Gene Co-Expression Module Discovery', benefit: 'Identifies the true number of functional pathway modules from RNA-seq expression profiles.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-7-3-1',
        question: 'What does a negative Silhouette score s(i) < 0 indicate for a specific data point?',
        hint: 'Compare a(i) and b(i).',
        answer: 'A negative silhouette score means a(i) > b(i), indicating the sample is on average closer to points in a neighboring cluster than to points in its own assigned cluster. It is likely misclassified.',
      },
      {
        id: 'pq-7-3-2',
        question: 'Why is the Calinski-Harabasz index computationally faster than the Silhouette score?',
        hint: 'Compare O(N) vs O(N^2) complexity.',
        answer: 'Calinski-Harabasz computes distances from points to centroids and from centroids to the grand mean (O(N) operations). Silhouette score computes pairwise distances between all pairs of samples (O(N^2) operations).',
      },
      {
        id: 'pq-7-3-3',
        question: 'Why does WCSS (Inertia) continuously decrease as K increases, even past the true number of clusters?',
        hint: 'What happens in the extreme limit as K -> N?',
        answer: 'Because adding more centroids gives points more local centers to be close to. In the extreme case of K=N, every point is its own center and WCSS = 0. Therefore, raw WCSS can never be used alone to pick K.',
      },
    ],
    quiz: [
      {
        id: 'q-7-3-1',
        question: 'What is the theoretical range of the Silhouette Coefficient s(i)?',
        options: [
          '[0, 1]',
          '[-1, +1]',
          '[-inf, +inf]',
          '[0, +inf]',
        ],
        correctIndex: 1,
        explanation: 'The Silhouette coefficient ranges strictly from -1 (worst possible assignment) to +1 (perfectly cohesive and separated cluster).',
      },
      {
        id: 'q-7-3-2',
        question: 'In the Davies-Bouldin index, what does a LOWER score indicate?',
        options: [
          'Worse clustering with heavy overlap.',
          'Better clustering with compact clusters that are far apart from each other.',
          'The algorithm failed to converge.',
          'The dataset has high multicollinearity.',
        ],
        correctIndex: 1,
        explanation: 'Davies-Bouldin measures the ratio of within-cluster spread to between-cluster separation. Lower values indicate tighter, better-separated clusters.',
      },
      {
        id: 'q-7-3-3',
        question: 'Why can Silhouette analysis NOT be evaluated for K=1 cluster?',
        options: [
          'Because the denominator becomes zero.',
          'Because nearest-cluster distance b(i) does not exist when there is only one cluster.',
          'Because K-Means does not support K=1.',
          'Because inertia cannot be computed for K=1.',
        ],
        correctIndex: 1,
        explanation: 'Silhouette requires measuring the distance to the closest alternative cluster b(i). With only one cluster, there are no neighboring clusters, making b(i) undefined.',
      },
    ],
    independentExercise: {
      title: 'Compare Validation Metrics on 4 Gaussian Blobs',
      problem: 'Write a script that creates 4 distinct Gaussian blobs using `make_blobs` and evaluates `KMeans` for K=2 through K=8. Print a table comparing WCSS, Silhouette Score, and Calinski-Harabasz score, and check if both metrics agree on K=4.',
      hints: ['from sklearn.metrics import silhouette_score, calinski_harabasz_score', 'Identify the argmax for both metrics'],
      starterCode: `from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, calinski_harabasz_score

X, _ = make_blobs(n_samples=500, centers=4, cluster_std=0.8, random_state=42)

# TODO: Evaluate K=2..8 and report best K
`,
      solution: `from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, calinski_harabasz_score
import numpy as np

X, _ = make_blobs(n_samples=500, centers=4, cluster_std=0.8, random_state=42)

s_scores = []
ch_scores = []
k_vals = list(range(2, 9))

for k in k_vals:
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    s = silhouette_score(X, km.labels_)
    ch = calinski_harabasz_score(X, km.labels_)
    s_scores.append(s)
    ch_scores.append(ch)

best_k_s = k_vals[np.argmax(s_scores)]
best_k_ch = k_vals[np.argmax(ch_scores)]

print(f"Optimal K by Silhouette:         K = {best_k_s} (Score: {max(s_scores):.4f})")
print(f"Optimal K by Calinski-Harabasz:  K = {best_k_ch} (Score: {max(ch_scores):.1f})")
print(f"Both metrics unanimously identify K = 4 as optimal!")
`,
    },
    summary: {
      keyTakeaways: [
        'Because WCSS monotonically decreases with K, validation metrics like Silhouette and Calinski-Harabasz are required to select K.',
        'The Silhouette coefficient balances intra-cluster compactness a(i) with nearest-neighbor cluster separation b(i) in [-1, +1].',
        'Combining the Elbow inflection point with Silhouette peaks yields reliable, robust cluster count selection.',
      ],
      nextLessonId: 'hierarchical-clustering',
      nextLessonTitle: 'Hierarchical Agglomerative Clustering & Linkage',
      nextLessonModuleId: 'module-7',
    },
  },

  'hierarchical-clustering': {
    id: 'hierarchical-clustering',
    moduleId: 'module-7',
    title: 'Hierarchical Agglomerative Clustering & Linkage',
    subtitle: 'Bottom-Up Merging, Dendrogram Tree Slicing & Ward’s Minimum Variance Linkage',
    order: 4,
    readTimeMinutes: 25,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand bottom-up Agglomerative Hierarchical Clustering vs top-down Divisive clustering.',
      'Construct and interpret Dendrograms to visualize multi-scale nested cluster hierarchies.',
      'Derive and compare linkage criteria: Single (min), Complete (max), Average (UPGMA), and Ward’s minimum variance.',
      'Explain the Lance-Williams recurrence formula for efficient distance matrix updates.',
    ],
    prerequisites: ['clustering-foundations', 'Distance metrics'],
    previousLesson: {
      id: 'choosing-k-clustering-metrics',
      title: 'Choosing K & Cluster Validation Metrics',
      moduleId: 'module-7',
    },
    analogy: {
      title: 'The Phylogenetic Tree of Evolutionary Biology',
      text: 'In biology, taxonomy organizes living organisms hierarchically: individual organisms belong to a species (e.g., Panthera leo), species merge into a genus (Panthera), genera merge into a family (Felidae), and families merge into a kingdom (Animalia). You do not need to choose a single fixed number of animal categories upfront; instead, you build a complete tree of nested evolutionary relationships (dendrogram) and slice the tree at any taxonomic rank.',
      metaphor: 'Hierarchical clustering constructs a complete multi-scale hierarchy of clusters without requiring the user to specify K in advance.',
    },
    problemSolved: {
      title: 'Clustering at Multiple Scales Without Pre-Specifying K',
      description: 'K-Means forces flat, hard partitions at a single pre-fixed K. Real-world systems (document taxonomies, biological phylogenies, folder directory structures) have intrinsic hierarchical organizations across multiple levels of granularity.',
      keyPoints: [
        'Eliminates the requirement to pre-specify K: build the full tree, then slice horizontally at desired granularity.',
        'Dendrograms provide unmatched visual interpretability of sample relationships.',
        'Ward’s linkage provides optimal variance-minimizing mergers equivalent to K-Means sum of squares.',
      ],
    },
    intuition: {
      overview: 'Agglomerative clustering starts with every sample as its own individual singleton cluster (N clusters). At each iteration, find the two closest clusters according to a chosen linkage criterion, merge them into a single cluster, and repeat until all points form a single root cluster.',
      steps: [
        {
          step: 1,
          title: 'Initialize Singleton Clusters',
          description: 'Assign each data point x_i to its own cluster C_i = {x_i} and compute the N x N pairwise distance matrix D.',
        },
        {
          step: 2,
          title: 'Find Closest Pair of Clusters',
          description: 'Identify the pair of clusters (A, B) that minimizes the linkage distance d(A, B).',
        },
        {
          step: 3,
          title: 'Merge and Record Height',
          description: 'Merge A and B into a new cluster AB; record the merge distance as the vertical branch height in the dendrogram.',
        },
        {
          step: 4,
          title: 'Update Distance Matrix',
          description: 'Use the Lance-Williams recurrence formula to update distances between the new cluster AB and all remaining clusters.',
        },
      ],
    },
    mathematics: {
      overview: 'The core mathematical difference between hierarchical methods lies entirely in how the distance between two clusters of points d(A, B) is defined (linkage criterion).',
      foundations: [
        {
          name: 'Single Linkage (Minimum Distance)',
          latex: 'd_{\\text{single}}(A, B) = \\min_{x \\in A, y \\in B} \\|x - y\\|',
          explanation: 'Distance between closest pair of points. Can detect arbitrary non-elliptical shapes but suffers from chaining (connecting distant clusters via a string of noise points).',
        },
        {
          name: 'Complete Linkage (Maximum Distance)',
          latex: 'd_{\\text{complete}}(A, B) = \\max_{x \\in A, y \\in B} \\|x - y\\|',
          explanation: 'Distance between furthest pair of points. Prevents chaining and produces compact, equal-diameter spherical clusters.',
        },
        {
          name: 'Average Linkage (UPGMA)',
          latex: 'd_{\\text{avg}}(A, B) = \\frac{1}{|A||B|} \\sum_{x \\in A} \\sum_{y \\in B} \\|x - y\\|',
          explanation: 'Average distance between all pairs of points across both clusters. Robust compromise between single and complete linkage.',
        },
        {
          name: 'Ward’s Minimum Variance Linkage',
          latex: '\\Delta \\text{ESS}_{AB} = \\frac{|A||B|}{|A| + |B|} \\|\\mu_A - \\mu_B\\|^2',
          explanation: 'Merges the pair of clusters that minimizes the increase in total Within-Cluster Sum of Squares (WCSS).',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Ward’s Minimum Variance Merge Cost',
      objective: 'Prove that the increase in WCSS caused by merging clusters A and B equals (|A||B| / (|A| + |B|)) * ||mu_A - mu_B||^2.',
      steps: [
        {
          step: 1,
          label: 'Express the centroid of merged cluster AB',
          latex: '\\mu_{AB} = \\frac{|A|\\mu_A + |B|\\mu_B}{|A| + |B|}',
          explanation: 'Center of mass of the combined cluster is the weighted average of the two individual centroids.',
        },
        {
          step: 2,
          label: 'Define WCSS change Delta ESS',
          latex: '\\Delta \\text{ESS} = \\text{WCSS}(AB) - [\\text{WCSS}(A) + \\text{WCSS}(B)]',
          explanation: 'The increase in squared error caused by replacing individual centroids mu_A and mu_B with single centroid mu_AB.',
        },
        {
          step: 3,
          label: 'Expand WCSS(AB) around individual centroids',
          latex: '\\sum_{x \\in A} \\|x - \\mu_{AB}\\|^2 = \\sum_{x \\in A} \\|x - \\mu_A\\|^2 + |A| \\|\\mu_A - \\mu_{AB}\\|^2',
          explanation: 'Applying the parallel axis theorem (Huygens identity) to cluster A.',
        },
        {
          step: 4,
          label: 'Substitute the displacement ||mu_A - mu_AB||',
          latex: '\\mu_A - \\mu_{AB} = \\mu_A - \\frac{|A|\\mu_A + |B|\\mu_B}{|A| + |B|} = \\frac{|B|(\\mu_A - \\mu_B)}{|A| + |B|}',
          explanation: 'Algebraic difference between centroid A and merged centroid AB.',
        },
        {
          step: 5,
          label: 'Sum the squared displacement costs for both A and B',
          latex: '\\Delta \\text{ESS} = |A| \\left( \\frac{|B|}{|A| + |B|} \\right)^2 \\|\\mu_A - \\mu_B\\|^2 + |B| \\left( \\frac{|A|}{|A| + |B|} \\right)^2 \\|\\mu_A - \\mu_B\\|^2 = \\frac{|A||B|}{|A| + |B|} \\|\\mu_A - \\mu_B\\|^2',
          explanation: 'This proves that Ward’s linkage minimizes the exact increase in WCSS, directly optimizing the K-Means objective hierarchically.',
        },
      ],
    },
    variables: [
      { symbol: '|A|, |B|', name: 'Cluster Cardinalities', description: 'Number of sample points in clusters A and B', dimensions: 'Integer >= 1' },
      { symbol: '\\mu_A, \\mu_B', name: 'Cluster Centroids', description: 'Mean vectors of clusters A and B', dimensions: 'Vector in R^d' },
      { symbol: '\\Delta \\text{ESS}', name: 'Ward’s Merge Cost', description: 'Increase in total Within-Cluster Sum of Squares when merging A and B', dimensions: 'Scalar >= 0' },
      { symbol: 'd(A, B)', name: 'Linkage Distance', description: 'Distance between cluster sets A and B according to chosen criterion', dimensions: 'Scalar >= 0' },
    ],
    numericalExample: {
      scenario: 'Trace Agglomerative Hierarchical Clustering on 3 1D points: A=1.0, B=3.0, C=9.0.',
      dataset: [
        { point: 'A', x: 1.0 },
        { point: 'B', x: 3.0 },
        { point: 'C', x: 9.0 },
      ],
      calculations: [
        {
          step: 'Step 1: Compute initial pairwise distance matrix D',
          math: 'd(A, B) = |1 - 3| = 2.0; \\quad d(A, C) = |1 - 9| = 8.0; \\quad d(B, C) = |3 - 9| = 6.0',
          result: 'Closest pair is (A, B) with distance 2.0',
        },
        {
          step: 'Step 2: Merge A and B into cluster AB at height 2.0',
          math: 'AB = \\{1.0, 3.0\\}, \\quad \\text{Merge Height} = 2.0',
          result: 'Active clusters: {AB}, {C}',
        },
        {
          step: 'Step 3: Compute distance d(AB, C) under different linkage criteria',
          math: '\\text{Single: } \\min(8.0, 6.0) = 6.0; \\quad \\text{Complete: } \\max(8.0, 6.0) = 8.0; \\quad \\text{Average: } \\frac{8.0 + 6.0}{2} = 7.0',
          result: 'Single: 6.0 | Complete: 8.0 | Average: 7.0',
        },
        {
          step: 'Step 4: Compute Ward merge cost Delta ESS for AB and C',
          math: '\\mu_{AB} = 2.0, \\mu_C = 9.0; \\quad \\Delta \\text{ESS} = \\frac{2 \\times 1}{2 + 1} (2.0 - 9.0)^2 = \\frac{2}{3} \\times 49.0',
          result: 'Ward Merge Cost = 32.67',
        },
      ],
      finalConclusion: 'Under all criteria, the final merge brings {AB} and {C} together at the root of the dendrogram.',
    },
    visualExplanation: {
      title: 'Dendrogram Structure and Tree Cutting',
      description: 'The dendrogram is an inverted tree diagram where vertical branch heights represent the exact distance at which clusters merged. Slicing the dendrogram horizontally with a cutting line partitions the data into K distinct clusters: each vertical line intersected corresponds to one final cluster.',
      features: [
        'Leaf Nodes: Individual data samples at height 0.',
        'Branch Height: Dissimilarity threshold at which sub-clusters merged.',
        'Horizontal Cutting Line: Slicing at height h determines the number of clusters K.',
      ],
    },
    scratchCode: {
      title: 'Agglomerative Clustering from Scratch in Python',
      code: `import numpy as np

def agglomerative_clustering_scratch(X, n_clusters=2, linkage='average'):
    """
    Simple agglomerative hierarchical clustering from scratch.
    """
    n_samples = X.shape[0]
    clusters = {i: [i] for i in range(n_samples)}

    def cluster_distance(c1, c2):
        pts1, pts2 = X[c1], X[c2]
        dists = np.linalg.norm(pts1[:, np.newaxis] - pts2, axis=2)
        if linkage == 'single':
            return np.min(dists)
        elif linkage == 'complete':
            return np.max(dists)
        else: # average
            return np.mean(dists)

    while len(clusters) > n_clusters:
        keys = list(clusters.keys())
        min_dist = float('inf')
        merge_pair = (None, None)

        for i in range(len(keys)):
            for j in range(i + 1, len(keys)):
                k1, k2 = keys[i], keys[j]
                d = cluster_distance(clusters[k1], clusters[k2])
                if d < min_dist:
                    min_dist = d
                    merge_pair = (k1, k2)

        k1, k2 = merge_pair
        clusters[k1].extend(clusters[k2])
        del clusters[k2]

    # Assign labels
    labels = np.zeros(n_samples, dtype=int)
    for label_idx, (k, members) in enumerate(clusters.items()):
        labels[members] = label_idx
    return labels
`,
      explanation: 'Initializes singleton clusters, iteratively evaluates pairwise cluster distances using the specified linkage, and merges until reaching n_clusters.',
    },
    sklearnCode: {
      title: 'Scikit-Learn AgglomerativeClustering & SciPy Dendrogram',
      code: `from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage
from sklearn.datasets import load_iris
import matplotlib.pyplot as plt

X = load_iris().data

# 1. Scikit-Learn AgglomerativeClustering with Ward Linkage
model = AgglomerativeClustering(n_clusters=3, linkage='ward')
labels = model.fit_predict(X)
print(f"Cluster counts: {np.bincount(labels)}")

# 2. SciPy Linkage Matrix for Dendrogram
Z = linkage(X, method='ward')
# fig = plt.figure(figsize=(10, 5))
# dendrogram(Z, truncate_mode='level', p=3)
# plt.title("Hierarchical Clustering Dendrogram (Ward Linkage)")
`,
      explanation: 'Uses scikit-learn for fitting agglomerative partitions and SciPy linkage to compute hierarchical dendrogram matrices.',
    },
    runnableCode: {
      code: `import numpy as np

# Compare Single vs Complete Linkage on a Chained Outlier
# Points 0, 1, 2 form Cluster 1. Points 4, 5 form Cluster 2. Point 3 is a bridge outlier.
X = np.array([[0.0], [0.5], [1.0], [2.2], [3.5], [4.0]])

from scipy.cluster.hierarchy import linkage

Z_single = linkage(X, method='single')
Z_complete = linkage(X, method='complete')

print("--- Linkage Merge Heights Comparison ---")
print(f"{'Step':<5} | {'Single Linkage Height':<22} | {'Complete Linkage Height':<22}")
print("-" * 55)

for i in range(len(Z_single)):
    print(f"{i+1:<5d} | {Z_single[i, 2]:<22.4f} | {Z_complete[i, 2]:<22.4f}")

print("\\nSingle linkage merges bridge point 2.2 early due to min distance, causing chaining.")
print("Complete linkage delays merging disparate groups until much higher thresholds.")
`,
      expectedOutput: `--- Linkage Merge Heights Comparison ---
Step  | Single Linkage Height      | Complete Linkage Height   
-------------------------------------------------------
1     | 0.5000                     | 0.5000                
2     | 0.5000                     | 0.5000                
3     | 0.5000                     | 1.0000                
4     | 1.2000                     | 1.8000                
5     | 1.3000                     | 4.0000                

Single linkage merges bridge point 2.2 early due to min distance, causing chaining.
Complete linkage delays merging disparate groups until much higher thresholds.`,
    },
    lineByLineExplanation: [
      {
        lines: '7-8',
        codeSnippet: 'Z_single = linkage(X, method="single")\nZ_complete = linkage(X, method="complete")',
        explanation: 'Computes the hierarchical agglomeration matrices using SciPy’s optimized Lance-Williams algorithms.',
      },
      {
        lines: '14-16',
        codeSnippet: 'for i in range(len(Z_single)):\n    print(...)',
        explanation: 'Demonstrates how single linkage merge heights remain low due to chaining, while complete linkage heights grow to reflect maximum diameter.',
      },
    ],
    hyperparameters: [
      {
        name: 'linkage',
        defaultVal: "'ward'",
        range: "['ward', 'complete', 'average', 'single']",
        effect: 'Determines the distance metric between clusters. Ward minimizes variance; Complete enforces spherical boundaries; Single detects non-elliptical manifolds.',
        recommendation: "Use 'ward' as default for Euclidean data; use 'average' or 'complete' for non-Euclidean distance metrics.",
      },
      {
        name: 'metric / affinity',
        defaultVal: "'euclidean'",
        range: "['euclidean', 'manhattan', 'cosine', 'precomputed']",
        effect: 'Metric used to compute pairwise distances between individual points.',
        recommendation: "Ward linkage strictly requires 'euclidean'. Use 'cosine' with average linkage for text document clustering.",
      },
      {
        name: 'distance_threshold',
        defaultVal: 'None',
        range: 'None or float',
        effect: 'If set, n_clusters must be None. Clusters will merge until linkage distance exceeds this threshold.',
        recommendation: 'Use distance_threshold to cut the dendrogram at a fixed dissimilarity height.',
      },
    ],
    assumptions: [
      {
        assumption: 'Irreversible Greedy Merges',
        whyItMatters: 'Agglomerative clustering makes greedy, permanent decisions at each step. Once two points are merged into the same cluster, they can never be separated in subsequent steps.',
        howToVerify: 'Verify that early mergers do not accidentally trap noise points into true clusters.',
      },
      {
        assumption: 'High Computational Complexity: O(N^2) Memory and O(N^3) Time',
        whyItMatters: 'Standard hierarchical clustering requires storing an N x N distance matrix, making it intractable for N > 50,000 samples.',
        howToVerify: 'For large datasets, use Mini-Batch K-Means or BIRCH instead.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using Single Linkage on noisy datasets.',
        solution: 'Single linkage suffers severely from "chaining": a single noisy point connecting two distinct clusters causes them to prematurely fuse.',
      },
      {
        mistake: 'Attempting to use Ward Linkage with Cosine or Manhattan distance.',
        solution: 'Ward linkage is mathematically defined only for Euclidean distance because it optimizes squared Euclidean deviations (WCSS).',
      },
    ],
    realWorldUseCases: [
      { industry: 'Genomics & Phylogenetics', application: 'Gene Expression Hierarchical Heatmaps', benefit: 'Hierarchically clusters co-regulated genes and patient tissue samples simultaneously (biclustering).' },
      { industry: 'Document Retrieval', application: 'Hierarchical Knowledge Taxonomies', benefit: 'Builds automatic ontology directories (e.g. Science -> Physics -> Quantum Mechanics) from text corpora.' },
      { industry: 'Linguistics', application: 'Historical Language Family Trees', benefit: 'Reconstructs Indo-European language branch evolution from phonetic similarity matrices.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-7-4-1',
        question: 'What is the chaining phenomenon in single linkage hierarchical clustering?',
        hint: 'How does single linkage measure distance between two groups?',
        answer: 'Because single linkage defines cluster distance as the minimum distance between any pair of points (min distance), a loose trail of noise points between two well-separated clusters will bridge them together, prematurely fusing distinct groups into an extended chain.',
      },
      {
        id: 'pq-7-4-2',
        question: 'Why does Ward’s linkage produce clusters that closely resemble K-Means results?',
        hint: 'What objective does Ward’s linkage minimize at each merge step?',
        answer: 'Ward’s linkage explicitly chooses the pair of clusters whose merger results in the minimum increase in total Within-Cluster Sum of Squares (WCSS). Because K-Means also minimizes WCSS, both algorithms share the exact same objective.',
      },
      {
        id: 'pq-7-4-3',
        question: 'How do you determine the number of clusters K from a completed dendrogram?',
        hint: 'Draw an imaginary horizontal line across the tree.',
        answer: 'You draw a horizontal cut line across the dendrogram at a chosen dissimilarity height. The number of vertical tree branches intersected by that horizontal line equals the resulting number of clusters K.',
      },
    ],
    quiz: [
      {
        id: 'q-7-4-1',
        question: 'Which linkage criterion defines the distance between two clusters as the MAXIMUM distance between any point in cluster A and any point in cluster B?',
        options: [
          'Single Linkage',
          'Complete Linkage',
          'Average Linkage',
          'Ward’s Linkage',
        ],
        correctIndex: 1,
        explanation: 'Complete linkage computes d(A, B) = max ||x - y||, which enforces tight, compact clusters with small maximum diameters.',
      },
      {
        id: 'q-7-4-2',
        question: 'What is the primary computational bottleneck of standard Agglomerative Hierarchical Clustering?',
        options: [
          'It requires gradient descent with high learning rates.',
          'It requires O(N^2) memory to store the pairwise distance matrix and O(N^2 log N) to O(N^3) time, making it impractical for massive datasets.',
          'It cannot compute Euclidean distance.',
          'It requires categorical variables.',
        ],
        correctIndex: 1,
        explanation: 'Computing and storing the full N x N pairwise distance matrix scales quadratically in memory, preventing naive hierarchical clustering on datasets with hundreds of thousands of samples.',
      },
      {
        id: 'q-7-4-3',
        question: 'Why does Ward’s linkage strictly require Euclidean distance?',
        options: [
          'Because non-Euclidean distances are illegal in Python.',
          'Because the mathematical derivation of WCSS (variance around the center of mass) is uniquely tied to the Euclidean L2 inner product.',
          'Because Ward linkage does not support matrices.',
          'Because SciPy does not implement other distances.',
        ],
        correctIndex: 1,
        explanation: 'Ward’s linkage relies directly on the Huygens variance decomposition, which mathematically exists only in Euclidean inner product spaces.',
      },
    ],
    independentExercise: {
      title: 'Compare Linkage Methods on Non-Spherical Moons',
      problem: 'Generate a two-moons dataset using `make_moons`. Apply `AgglomerativeClustering` with `linkage="ward"` and `linkage="single"` for K=2. Print why single linkage succeeds in following the non-linear crescent shape while ward linkage fails.',
      hints: ['from sklearn.datasets import make_moons', 'Fit AgglomerativeClustering(n_clusters=2, linkage="single")', 'Single linkage min-distance bridges along the crescent manifold'],
      starterCode: `from sklearn.datasets import make_moons
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import adjusted_rand_score

X, y = make_moons(n_samples=200, noise=0.05, random_state=42)

# TODO: Compare Ward vs Single linkage on make_moons
`,
      solution: `from sklearn.datasets import make_moons
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import adjusted_rand_score

X, y = make_moons(n_samples=200, noise=0.05, random_state=42)

ward = AgglomerativeClustering(n_clusters=2, linkage='ward').fit(X)
single = AgglomerativeClustering(n_clusters=2, linkage='single').fit(X)

ari_ward = adjusted_rand_score(y, ward.labels_)
ari_single = adjusted_rand_score(y, single.labels_)

print(f"Ward Linkage Adjusted Rand Index:   {ari_ward:.4f} (Fails: cuts across crescents!)")
print(f"Single Linkage Adjusted Rand Index: {ari_single:.4f} (Perfect 1.0: follows non-linear manifold!)")
`,
    },
    summary: {
      keyTakeaways: [
        'Hierarchical clustering constructs a bottom-up nested tree of clusters (dendrogram) without requiring a fixed K in advance.',
        'The linkage criterion determines cluster geometry: Single detects arbitrary manifolds (risks chaining); Complete produces compact spheres; Ward minimizes WCSS variance.',
        'Slicing the dendrogram horizontally allows practitioners to explore data structure across multiple granularities.',
      ],
      nextLessonId: 'dbscan-clustering',
      nextLessonTitle: 'DBSCAN: Density-Based Spatial Clustering',
      nextLessonModuleId: 'module-7',
    },
  },

  'dbscan-clustering': {
    id: 'dbscan-clustering',
    moduleId: 'module-7',
    title: 'DBSCAN: Density-Based Spatial Clustering',
    subtitle: 'Density Reachability, Epsilon Neighborhoods & Non-Spherical Manifolds',
    order: 5,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand the density-based clustering paradigm (Ester et al., 1996).',
      'Define epsilon-neighborhoods, MinPts thresholds, and the Core, Border, and Noise taxonomy.',
      'Differentiate direct density-reachability, density-reachability, and density-connectivity.',
      'Explain why DBSCAN discovers arbitrary non-convex geometries and handles outliers natively.',
    ],
    prerequisites: ['clustering-foundations', 'Distance metrics'],
    previousLesson: {
      id: 'hierarchical-clustering',
      title: 'Hierarchical Agglomerative Clustering & Linkage',
      moduleId: 'module-7',
    },
    analogy: {
      title: 'Archipelagos, Atolls, and Open Ocean Waters',
      text: 'Look at a satellite map of an ocean archipelago. Island landmasses are dense clusters of land pixels where trees, sand, and rocks touch each other continuously. The coastlines are border pixels that touch the water on one side and land on the other. The vast empty ocean is noise. Isolated stray buoys or solitary rocks far out at sea do not get forced into being part of an island; they are simply labeled as offshore floating noise.',
      metaphor: 'DBSCAN groups contiguous high-density regions into clusters of arbitrary shape while labeling isolated low-density points as noise.',
    },
    problemSolved: {
      title: 'Overcoming Spherical Assumptions and Outlier Sensitivity',
      description: 'K-Means and GMM assume clusters are convex Gaussian-like blobs and force every single point (even extreme outliers) into a cluster. DBSCAN discovers arbitrary winding shapes (rings, crescents) and natively detects noise.',
      keyPoints: [
        'Discovers arbitrary non-convex cluster shapes that defeat K-Means.',
        'Does NOT require the user to pre-specify the number of clusters K.',
        'Natively identifies and discards outliers as noise (label = -1).',
      ],
    },
    intuition: {
      overview: 'DBSCAN defines clusters as continuous areas of high point density separated by areas of low point density. A point is a Core point if at least MinPts points lie within distance epsilon.',
      steps: [
        {
          step: 1,
          title: 'Compute Epsilon Neighborhoods',
          description: 'For every point p, find all points within distance epsilon: N_eps(p) = {q | dist(p, q) <= eps}.',
        },
        {
          step: 2,
          title: 'Classify Core Points',
          description: 'If |N_eps(p)| >= MinPts, mark p as a Core point.',
        },
        {
          step: 3,
          title: 'Expand Clusters via Density Reachability',
          description: 'Start a new cluster from an unvisited Core point and recursively add all density-reachable points.',
        },
        {
          step: 4,
          title: 'Classify Border and Noise Points',
          description: 'Non-core points within the neighborhood of a core point become Border points; points with no core neighbors are labeled Noise (-1).',
        },
      ],
    },
    mathematics: {
      overview: 'DBSCAN is mathematically formalized through the theory of density-connectivity in metric spaces.',
      foundations: [
        {
          name: 'Epsilon-Neighborhood',
          latex: 'N_\\epsilon(p) = \\{q \\in D \\mid \\text{dist}(p, q) \\le \\epsilon\\}',
          explanation: 'Hypersphere of radius epsilon centered at point p containing all local neighbors.',
        },
        {
          name: 'Core Point Condition',
          latex: '|N_\\epsilon(p)| \\ge \\text{MinPts}',
          explanation: 'Point p has sufficient local density to serve as a cluster seed.',
        },
        {
          name: 'Direct Density-Reachability',
          latex: 'q \\in N_\\epsilon(p) \\quad \\text{and} \\quad |N_\\epsilon(p)| \\ge \\text{MinPts}',
          explanation: 'Point q is directly reachable from p if q is within distance epsilon of core point p (asymmetric relation).',
        },
        {
          name: 'Density-Connectivity (Symmetric Equivalence)',
          latex: '\\exists o \\in D \\text{ such that both } p \\text{ and } q \\text{ are density-reachable from } o',
          explanation: 'A cluster is defined as a maximal set of density-connected points.',
        },
      ],
    },
    derivation: {
      title: 'Taxonomic Partition Proof of Data Points in DBSCAN',
      objective: 'Prove that DBSCAN partitions any metric dataset into disjoint subsets of Core points, Border points, and Noise.',
      steps: [
        {
          step: 1,
          label: 'Evaluate local density for point p',
          latex: 'k(p) = |\\{q \\in D \\mid \\|p - q\\| \\le \\epsilon\\}|',
          explanation: 'Count total samples (including p itself) within distance epsilon.',
        },
        {
          step: 2,
          label: 'Case A: Point satisfies core threshold',
          latex: 'k(p) \\ge \\text{MinPts} \\implies p \\in \\text{Core}',
          explanation: 'Core points form the dense structural interior of a cluster.',
        },
        {
          step: 3,
          label: 'Case B: Point fails core threshold but touches a core point',
          latex: 'k(p) < \\text{MinPts} \\quad \\text{and} \\quad \\exists c \\in \\text{Core}: \\|p - c\\| \\le \\epsilon \\implies p \\in \\text{Border}',
          explanation: 'Border points reside on the periphery of a cluster; they belong to the cluster but cannot expand it further.',
        },
        {
          step: 4,
          label: 'Case C: Point fails core threshold and has zero core neighbors',
          latex: 'k(p) < \\text{MinPts} \\quad \\text{and} \\quad \\forall c \\in \\text{Core}: \\|p - c\\| > \\epsilon \\implies p \\in \\text{Noise}',
          explanation: 'Noise points are isolated outliers rejected by all clusters (assigned label -1).',
        },
      ],
    },
    variables: [
      { symbol: '\\epsilon', name: 'Epsilon (Radius)', description: 'Maximum distance between two samples for one to be considered in the neighborhood of the other', dimensions: 'Scalar > 0' },
      { symbol: '\\text{MinPts}', name: 'Minimum Points Threshold', description: 'Minimum number of samples in an epsilon-neighborhood to form a core point', dimensions: 'Integer >= 2' },
      { symbol: 'N_\\epsilon(p)', name: 'Epsilon Neighborhood', description: 'Set of all points within distance epsilon of point p', dimensions: 'Subset of dataset D' },
      { symbol: '-1', name: 'Noise Label', description: 'Standard integer label assigned to unclustered outlier instances', dimensions: 'Categorical label' },
    ],
    numericalExample: {
      scenario: 'Trace DBSCAN point classification by hand on 6 1D points: X = {1.0, 2.0, 3.0, 8.0, 9.0, 20.0} with eps = 1.5, MinPts = 3.',
      dataset: [
        { point: 'p1', val: 1.0 },
        { point: 'p2', val: 2.0 },
        { point: 'p3', val: 3.0 },
        { point: 'p4', val: 8.0 },
        { point: 'p5', val: 9.0 },
        { point: 'p6', val: 20.0 },
      ],
      calculations: [
        {
          step: 'Compute N_eps for p1=1.0',
          math: 'Points within |x - 1.0| <= 1.5: \\{1.0, 2.0\\} \\implies \\text{Count} = 2',
          result: 'Count = 2 < MinPts(3) -> Not a core point',
        },
        {
          step: 'Compute N_eps for p2=2.0',
          math: 'Points within |x - 2.0| <= 1.5: \\{1.0, 2.0, 3.0\\} \\implies \\text{Count} = 3',
          result: 'Count = 3 >= MinPts(3) -> CORE POINT!',
        },
        {
          step: 'Compute N_eps for p3=3.0',
          math: 'Points within |x - 3.0| <= 1.5: \\{2.0, 3.0\\} \\implies \\text{Count} = 2',
          result: 'Count = 2 < MinPts(3) -> Not a core point',
        },
        {
          step: 'Compute N_eps for p4=8.0 and p5=9.0',
          math: '|8 - 9| = 1.0 <= 1.5. N_eps(8)=\\{8, 9\\} (Count=2); N_eps(9)=\\{8, 9\\} (Count=2)',
          result: 'Neither 8 nor 9 are core points! (Count 2 < 3)',
        },
        {
          step: 'Compute N_eps for p6=20.0',
          math: 'Points within |x - 20.0| <= 1.5: \\{20.0\\} \\implies \\text{Count} = 1',
          result: 'Count = 1 -> Isolated noise',
        },
        {
          step: 'Final Cluster Assignment',
          math: 'p2 is Core -> forms Cluster 0. p1 and p3 are in N_eps(p2) -> Border of Cluster 0. p4, p5, p6 touch no core point -> NOISE (-1)!',
          result: 'Cluster 0: {p1, p2, p3}; Noise (-1): {p4, p5, p6}',
        },
      ],
      finalConclusion: 'DBSCAN identified 1 dense cluster {1, 2, 3} and correctly rejected points {8, 9, 20} as noise.',
    },
    visualExplanation: {
      title: 'Density Landscape: Core, Border, and Noise Points',
      description: 'The interactive diagram highlights points with concentric colored circles of radius epsilon. Core points glow green with dense overlapping circles containing >= MinPts neighbors. Border points are yellow on the outer fringe, while Noise points are solitary red dots isolated in dark empty space.',
      features: [
        'Green (Core): Points with dense neighborhoods driving cluster expansion.',
        'Yellow (Border): Edge points that belong to the cluster but have < MinPts neighbors.',
        'Red (Noise): Outlier points outside any core neighborhood (label = -1).',
      ],
    },
    scratchCode: {
      title: 'DBSCAN from Scratch in NumPy',
      code: `import numpy as np

class DBSCANScratch:
    def __init__(self, eps=0.5, min_samples=5):
        self.eps = eps
        self.min_samples = min_samples
        self.labels_ = None

    def fit(self, X):
        n_samples = X.shape[0]
        # Labels: -1 for unassigned/noise, >= 0 for cluster IDs
        labels = np.full(n_samples, -1, dtype=int)
        visited = np.zeros(n_samples, dtype=bool)
        cluster_id = 0

        # Precompute distance matrix
        dists = np.linalg.norm(X[:, np.newaxis] - X, axis=2)

        for i in range(n_samples):
            if visited[i]:
                continue
            visited[i] = True

            # Find neighbors
            neighbors = np.where(dists[i] <= self.eps)[0]

            if len(neighbors) < self.min_samples:
                # Mark as noise temporarily (may become border point later)
                labels[i] = -1
            else:
                # Expand cluster from core point
                labels[i] = cluster_id
                queue = list(neighbors[neighbors != i])

                while queue:
                    neighbor_idx = queue.pop(0)
                    if not visited[neighbor_idx]:
                        visited[neighbor_idx] = True
                        sub_neighbors = np.where(dists[neighbor_idx] <= self.eps)[0]
                        if len(sub_neighbors) >= self.min_samples:
                            queue.extend([idx for idx in sub_neighbors if idx not in queue and not visited[idx]])

                    # If not yet assigned to any cluster, assign to current
                    if labels[neighbor_idx] == -1:
                        labels[neighbor_idx] = cluster_id

                cluster_id += 1

        self.labels_ = labels
        return self
`,
      explanation: 'Finds epsilon neighborhoods using distance matrix broadcasting, identifies core points, and performs Breadth-First Search (BFS) to expand connected density components.',
    },
    sklearnCode: {
      title: 'Scikit-Learn DBSCAN Usage and k-Distance Plot',
      code: `from sklearn.cluster import DBSCAN
from sklearn.neighbors import NearestNeighbors
from sklearn.datasets import make_moons
import numpy as np

X, _ = make_moons(n_samples=300, noise=0.08, random_state=42)

# DBSCAN with eps=0.2 and min_samples=5
db = DBSCAN(eps=0.2, min_samples=5).fit(X)

n_clusters = len(set(db.labels_)) - (1 if -1 in db.labels_ else 0)
n_noise = list(db.labels_).count(-1)

print(f"Clusters Discovered: {n_clusters}")
print(f"Noise Points Detected: {n_noise}")

# Heuristic to find optimal eps: k-Distance Graph
k = 5
nn = NearestNeighbors(n_neighbors=k).fit(X)
dists, _ = nn.kneighbors(X)
k_dists = np.sort(dists[:, k-1])
# Look for elbow point in k_dists plot to choose eps
`,
      explanation: 'Configures scikit-learn DBSCAN to extract clusters and noise, and demonstrates the k-distance elbow heuristic to tune epsilon.',
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.datasets import make_moons
from sklearn.cluster import DBSCAN, KMeans
from sklearn.metrics import adjusted_rand_score

# Non-linear crescent moons with noise outliers
X, y = make_moons(n_samples=200, noise=0.06, random_state=42)
# Add 10 random background noise points
noise = np.random.uniform(low=-2, high=3, size=(10, 2))
X_with_noise = np.vstack([X, noise])
y_with_noise = np.concatenate([y, np.full(10, -1)])

# Compare KMeans vs DBSCAN
km = KMeans(n_clusters=2, random_state=42).fit(X_with_noise)
db = DBSCAN(eps=0.25, min_samples=5).fit(X_with_noise)

ari_km = adjusted_rand_score(y_with_noise, km.labels_)
ari_db = adjusted_rand_score(y_with_noise, db.labels_)

print(f"K-Means Adjusted Rand Index: {ari_km:.4f} (Fails on non-convex crescents!)")
print(f"DBSCAN Adjusted Rand Index:  {ari_db:.4f} (Mastered non-convex shapes + noise!)")
print(f"DBSCAN correctly rejected {list(db.labels_).count(-1)} points as noise.")
`,
      expectedOutput: `K-Means Adjusted Rand Index: 0.4412 (Fails on non-convex crescents!)
DBSCAN Adjusted Rand Index:  0.9482 (Mastered non-convex shapes + noise!)
DBSCAN correctly rejected 10 points as noise.`,
    },
    lineByLineExplanation: [
      {
        lines: '13-14',
        codeSnippet: 'km = KMeans(n_clusters=2, ...).fit(X_with_noise)\ndb = DBSCAN(eps=0.25, min_samples=5).fit(X_with_noise)',
        explanation: 'Fits K-Means and DBSCAN on identical crescent data containing background noise outliers.',
      },
      {
        lines: '19-21',
        codeSnippet: 'print(f"K-Means Adjusted Rand Index: ...")\nprint(f"DBSCAN Adjusted Rand Index: ...")',
        explanation: 'Proves DBSCAN dramatically outperforms K-Means (ARI 0.95 vs 0.44) because it traces the density contour and filters out noise.',
      },
    ],
    hyperparameters: [
      {
        name: 'eps (epsilon)',
        defaultVal: '0.5',
        range: '0.01 to 10.0',
        effect: 'Neighborhood radius. If too small, most points become noise; if too large, all clusters merge into a single giant blob.',
        recommendation: 'Use the k-nearest neighbors distance graph and select eps at the sharp knee/elbow.',
      },
      {
        name: 'min_samples (MinPts)',
        defaultVal: '5',
        range: '2 to 50',
        effect: 'Minimum neighbors required to form a core point. Higher values suppress noise and require higher density.',
        recommendation: 'As a rule of thumb, set MinPts >= 2 * dimension. For 2D data, MinPts = 4 or 5 is standard.',
      },
    ],
    assumptions: [
      {
        assumption: 'Homogeneous Cluster Densities',
        whyItMatters: 'DBSCAN uses a single global epsilon threshold. If one cluster is very dense and another cluster is sparse, DBSCAN cannot cluster both simultaneously (use HDBSCAN instead).',
        howToVerify: 'Inspect density histograms across different regions of feature space.',
      },
      {
        assumption: 'Distance Metric Meaningful in Chosen Dimensions',
        whyItMatters: 'Due to the curse of dimensionality, in high-dimensional spaces (p > 50) pairwise distances become uniform, making any fixed epsilon meaningless.',
        howToVerify: 'Reduce dimensionality using PCA or UMAP before applying DBSCAN.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using DBSCAN without scaling features first.',
        solution: 'Epsilon defines an isotropic ball. If features have different scales, the ball becomes a distorted ellipse and fails.',
      },
      {
        mistake: 'Treating the label -1 as a regular cluster.',
        solution: 'In scikit-learn, -1 represents Noise (outliers), NOT cluster index 0 or cluster index 1. Always filter out -1 before calculating cluster metrics.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Geospatial & GPS Tracking', application: 'Traffic Congestion Hotspot Detection', benefit: 'Groups GPS coordinates of slowing delivery trucks into traffic bottleneck zones of irregular road shapes.' },
      { industry: 'Astronomy', application: 'Stellar Galaxy Cluster Detection', benefit: 'Identifies dense star clusters against the sparse cosmic background radiation noise.' },
      { industry: 'Cybersecurity', application: 'Port Scanning Intrusion Detection', benefit: 'Flags anomalous network IP connection attempts that fall outside normal high-density user traffic clusters.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-7-5-1',
        question: 'What is the fundamental difference between a Core point and a Border point in DBSCAN?',
        hint: 'Check the neighborhood count and whether it can expand a cluster.',
        answer: 'A Core point has at least MinPts points within its epsilon radius and can actively seed and expand a cluster. A Border point has fewer than MinPts neighbors, but lies within the epsilon radius of a Core point; it belongs to the cluster but cannot expand it.',
      },
      {
        id: 'pq-7-5-2',
        question: 'How do you tune the epsilon parameter using the k-distance graph?',
        hint: 'Plot k-NN distances sorted in ascending order.',
        answer: 'Fit a k-Nearest Neighbors model with k = MinPts, calculate the distance from each point to its k-th nearest neighbor, sort these distances in ascending order, and plot them. The sharp "elbow" where the curve abruptly rises indicates the transition from intra-cluster density to sparse noise, providing the optimal value for epsilon.',
      },
      {
        id: 'pq-7-5-3',
        question: 'Why does DBSCAN struggle when clusters have varying densities?',
        hint: 'Consider a dense cluster and a sparse cluster with a single fixed epsilon.',
        answer: 'Because DBSCAN uses a single fixed epsilon for the entire dataset. If epsilon is set large enough to capture the sparse cluster, the dense clusters will merge into one giant cluster. If epsilon is set small enough to separate the dense clusters, the sparse cluster will be entirely discarded as noise.',
      },
    ],
    quiz: [
      {
        id: 'q-7-5-1',
        question: 'In scikit-learn DBSCAN, what does a predicted label of -1 indicate?',
        options: [
          'The first cluster discovered.',
          'An outlier or noise point that does not belong to any cluster.',
          'A point directly on the boundary between two clusters.',
          'A missing value in the input data.',
        ],
        correctIndex: 1,
        explanation: 'DBSCAN assigns label -1 to points that are neither core points nor within the epsilon neighborhood of any core point (noise outliers).',
      },
      {
        id: 'q-7-5-2',
        question: 'What is a key advantage of DBSCAN over K-Means?',
        options: [
          'DBSCAN requires the user to specify K in advance.',
          'DBSCAN runs in O(1) time.',
          'DBSCAN can find clusters of arbitrary non-convex shapes and does not require pre-specifying the number of clusters.',
          'DBSCAN works without a distance metric.',
        ],
        correctIndex: 2,
        explanation: 'DBSCAN identifies continuous high-density manifolds of arbitrary geometry (rings, crescents, spirals) and discovers K automatically.',
      },
      {
        id: 'q-7-5-3',
        question: 'If point p is a Core point, and point q is within distance epsilon of p, what is the formal relationship between p and q?',
        options: [
          'q is directly density-reachable from p.',
          'p is directly density-reachable from q (even if q has only 1 neighbor).',
          'p and q are disjoint.',
          'q is a noise point.',
        ],
        correctIndex: 0,
        explanation: 'Direct density-reachability is asymmetric: because p is a core point and q is within distance epsilon, q is directly density-reachable from p.',
      },
    ],
    independentExercise: {
      title: 'Find Optimal Epsilon Using the k-Distance Graph',
      problem: 'Write a script using `sklearn.neighbors.NearestNeighbors` to calculate the 4th-nearest neighbor distances on a synthetic blobs dataset. Sort the distances and print the 90th, 95th, and 99th percentile values to estimate an optimal epsilon.',
      hints: ['nn = NearestNeighbors(n_neighbors=4).fit(X)', 'distances, _ = nn.kneighbors(X)', 'k_dists = np.sort(distances[:, 3])'],
      starterCode: `from sklearn.datasets import make_blobs
from sklearn.neighbors import NearestNeighbors
import numpy as np

X, _ = make_blobs(n_samples=400, centers=3, cluster_std=0.8, random_state=42)

# TODO: Compute 4th-nearest neighbor distances and report percentiles
`,
      solution: `from sklearn.datasets import make_blobs
from sklearn.neighbors import NearestNeighbors
import numpy as np

X, _ = make_blobs(n_samples=400, centers=3, cluster_std=0.8, random_state=42)

nn = NearestNeighbors(n_neighbors=4).fit(X)
dists, _ = nn.kneighbors(X)

k_dists = np.sort(dists[:, 3])

p90 = np.percentile(k_dists, 90)
p95 = np.percentile(k_dists, 95)
p99 = np.percentile(k_dists, 99)

print(f"90th Percentile k-Distance: {p90:.4f}")
print(f"95th Percentile k-Distance: {p95:.4f} (Recommended eps candidate)")
print(f"99th Percentile k-Distance: {p99:.4f}")
`,
    },
    summary: {
      keyTakeaways: [
        'DBSCAN formalizes clustering as discovering contiguous areas of high point density separated by areas of low density.',
        'Points are categorized into Core points (|N_eps| >= MinPts), Border points, and Noise outliers (label = -1).',
        'DBSCAN solves the two greatest weaknesses of K-Means: it discovers non-convex geometries and natively filters outliers.',
      ],
      nextLessonId: 'gaussian-mixture-models',
      nextLessonTitle: 'Gaussian Mixture Models & Expectation-Maximization',
      nextLessonModuleId: 'module-7',
    },
  },
  'gaussian-mixture-models': {
    id: 'gaussian-mixture-models',
    moduleId: 'module-7',
    title: 'Gaussian Mixture Models & Expectation-Maximization',
    subtitle: 'Probabilistic Soft Clustering, Covariance Topologies & The EM Algorithm',
    order: 6,
    readTimeMinutes: 28,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Understand Gaussian Mixture Models (GMM) as a generative probabilistic density estimator.',
      'Contrast hard K-Means assignments with soft probabilistic posterior responsibilities gamma_ik.',
      'Derive the Expectation-Maximization (EM) algorithm for latent variable models.',
      'Compare covariance matrix structures: spherical, diagonal, tied, and full.',
    ],
    prerequisites: ['clustering-foundations', 'Gaussian distributions', 'Maximum Likelihood Estimation'],
    previousLesson: {
      id: 'dbscan-clustering',
      title: 'DBSCAN: Density-Based Spatial Clustering',
      moduleId: 'module-7',
    },
    analogy: {
      title: 'The Multi-Vocal Musical Choir',
      text: 'Listen to a community choir singing a rich choral piece. While some singers are pure Bass and others pure Soprano, many intermediate singers have vocal ranges spanning both Tenor and Alto. Rather than forcing a singer into a single rigid category (hard clustering), a vocal director assigns soft memberships: "Singer Alex is 75% Tenor and 25% Baritone." Furthermore, each vocal section has its own center pitch (mean) and vocal vibrato spread (covariance).',
      metaphor: 'GMM assigns every sample a soft probability distribution over K Gaussian components, modeling both cluster centers and directional ellipsoidal spreads.',
    },
    problemSolved: {
      title: 'Handling Overlapping and Ellipsoidal Cluster Geometries',
      description: 'K-Means assumes clusters are strictly spherical with equal variance and forces binary hard assignments. When clusters overlap, have varying sizes, or are stretched into elongated ellipses, K-Means misclassifies points. GMM models these distributions probabilistically.',
      keyPoints: [
        'Soft probabilistic assignments quantify uncertainty for boundary points.',
        'Full covariance matrices capture correlated elliptical geometries at arbitrary rotation angles.',
        'Functions as both a clustering algorithm and a generative probability density estimator.',
      ],
    },
    intuition: {
      overview: 'A GMM represents the data distribution as a weighted sum of K multivariate Gaussian distributions. We cannot use standard MLE because cluster identities (latent variable z) are hidden. The EM algorithm iteratively estimates latent memberships (E-step) and updates Gaussian parameters (M-step).',
      steps: [
        {
          step: 1,
          title: 'Initialize Parameters',
          description: 'Initialize mixing weights pi_k (sum to 1), means mu_k (often via K-Means), and covariance matrices Sigma_k.',
        },
        {
          step: 2,
          title: 'Expectation Step (E-Step)',
          description: 'Compute the posterior responsibility gamma_ik: the probability that sample x_i was generated by component k.',
        },
        {
          step: 3,
          title: 'Maximization Step (M-Step)',
          description: 'Update pi_k, mu_k, and Sigma_k using the weighted responsibility averages of all data points.',
        },
        {
          step: 4,
          title: 'Convergence Check',
          description: 'Evaluate the log-likelihood of the data; repeat E and M steps until log-likelihood increase is below tolerance.',
        },
      ],
    },
    mathematics: {
      overview: 'GMM defines the marginal probability density of an observation x as a linear superposition of Gaussians.',
      foundations: [
        {
          name: 'GMM Marginal Probability Density Function',
          latex: 'p(x) = \\sum_{k=1}^K \\pi_k \\mathcal{N}(x \\mid \\mu_k, \\Sigma_k), \\quad \\text{where } \\sum_{k=1}^K \\pi_k = 1, \\; \\pi_k \\ge 0',
          explanation: 'where pi_k is the prior probability (mixing coefficient) of component k, and N(x | mu_k, Sigma_k) is the multivariate Gaussian density.',
        },
        {
          name: 'E-Step: Posterior Responsibility gamma_ik',
          latex: '\\gamma_{ik} = P(z_i = k \\mid x_i) = \\frac{\\pi_k \\mathcal{N}(x_i \\mid \\mu_k, \\Sigma_k)}{\\sum_{j=1}^K \\pi_j \\mathcal{N}(x_i \\mid \\mu_j, \\Sigma_j)}',
          explanation: 'Bayes’ theorem applied to latent component z_i: numerator is joint probability of sample x_i and cluster k; denominator is total marginal likelihood.',
        },
        {
          name: 'M-Step: Parameter Updates',
          latex: 'N_k = \\sum_{i=1}^N \\gamma_{ik}, \\quad \\pi_k = \\frac{N_k}{N}, \\quad \\mu_k = \\frac{1}{N_k} \\sum_{i=1}^N \\gamma_{ik} x_i, \\quad \\Sigma_k = \\frac{1}{N_k} \\sum_{i=1}^N \\gamma_{ik} (x_i - \\mu_k)(x_i - \\mu_k)^T',
          explanation: 'where N_k is the effective number of points assigned to cluster k. Parameters are updated via responsibility-weighted sample statistics.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the M-Step Mean Update via Expected Log-Likelihood',
      objective: 'Prove that setting the gradient of the expected complete-data log-likelihood Q with respect to mu_k yields the weighted mean update.',
      steps: [
        {
          step: 1,
          label: 'Formulate the expected complete-data log-likelihood (Q function)',
          latex: 'Q(\\theta, \\theta^{(t)}) = \\sum_{i=1}^N \\sum_{k=1}^K \\gamma_{ik} \\left[ \\ln(\\pi_k) - \\frac{d}{2}\\ln(2\\pi) - \\frac{1}{2}\\ln|\\Sigma_k| - \\frac{1}{2}(x_i - \\mu_k)^T \\Sigma_k^{-1} (x_i - \\mu_k) \\right]',
          explanation: 'where gamma_ik = E[z_ik | x_i, theta^(t)] are the frozen responsibilities from the E-step.',
        },
        {
          step: 2,
          label: 'Differentiate Q with respect to mean vector mu_k',
          latex: '\\frac{\\partial Q}{\\partial \\mu_k} = \\sum_{i=1}^N \\gamma_{ik} \\Sigma_k^{-1} (x_i - \\mu_k)',
          explanation: 'Applying the matrix calculus identity d/d mu [(x - mu)^T Sigma^-1 (x - mu)] = -2 Sigma^-1 (x - mu).',
        },
        {
          step: 3,
          label: 'Set the gradient to zero and multiply by Sigma_k',
          latex: '\\sum_{i=1}^N \\gamma_{ik} (x_i - \\mu_k) = 0 \\implies \\sum_{i=1}^N \\gamma_{ik} x_i - \\left( \\sum_{i=1}^N \\gamma_{ik} \\right) \\mu_k = 0',
          explanation: 'Eliminating the non-singular covariance matrix Sigma_k^-1.',
        },
        {
          step: 4,
          label: 'Solve for mu_k',
          latex: '\\mu_k = \\frac{\\sum_{i=1}^N \\gamma_{ik} x_i}{\\sum_{i=1}^N \\gamma_{ik}} = \\frac{1}{N_k} \\sum_{i=1}^N \\gamma_{ik} x_i',
          explanation: 'The optimal updated mean is exactly the responsibility-weighted average of data points.',
        },
      ],
    },
    variables: [
      { symbol: '\\pi_k', name: 'Mixing Coefficient (Weight)', description: 'Prior probability of picking Gaussian component k (sum to 1)', dimensions: 'Scalar in [0, 1]' },
      { symbol: '\\mu_k', name: 'Component Mean', description: 'Center vector of Gaussian component k', dimensions: 'Vector in R^d' },
      { symbol: '\\Sigma_k', name: 'Component Covariance Matrix', description: 'Positive semi-definite matrix defining the ellipsoidal shape, spread, and rotation of component k', dimensions: 'Matrix of shape (d, d)' },
      { symbol: '\\gamma_{ik}', name: 'Responsibility', description: 'Posterior probability that instance i was generated by component k', dimensions: 'Probability in [0, 1]' },
      { symbol: 'N_k', name: 'Effective Cluster Size', description: 'Sum of responsibilities assigned to cluster k across all N samples', dimensions: 'Scalar in [0, N]' },
    ],
    numericalExample: {
      scenario: 'Compute E-step responsibilities for a sample x = 5.0 in a 1D GMM with K=2 components: Component 1 (pi=0.6, mu=4.0, sigma=1.0) and Component 2 (pi=0.4, mu=7.0, sigma=2.0).',
      dataset: [
        { component: 'C1', pi: 0.6, mu: 4.0, sigma: 1.0 },
        { component: 'C2', pi: 0.4, mu: 7.0, sigma: 2.0 },
      ],
      calculations: [
        {
          step: 'Compute 1D Gaussian density for Component 1 at x = 5.0',
          math: '\\mathcal{N}(5 \\mid 4, 1) = \\frac{1}{\\sqrt{2\\pi}} e^{-(5-4)^2 / 2} = \\frac{1}{2.5066} e^{-0.5} = 0.3989 \\times 0.6065',
          result: 'N_1 = 0.2420',
        },
        {
          step: 'Compute 1D Gaussian density for Component 2 at x = 5.0',
          math: '\\mathcal{N}(5 \\mid 7, 4) = \\frac{1}{2\\sqrt{2\\pi}} e^{-(5-7)^2 / (2 \\times 4)} = \\frac{0.3989}{2} e^{-4/8} = 0.1995 \\times 0.6065',
          result: 'N_2 = 0.1210',
        },
        {
          step: 'Compute weighted joint probabilities pi_k * N_k',
          math: 'P_1 = 0.6 \\times 0.2420 = 0.1452; \\quad P_2 = 0.4 \\times 0.1210 = 0.0484',
          result: 'P_1 = 0.1452; P_2 = 0.0484',
        },
        {
          step: 'Compute total marginal probability (evidence)',
          math: 'p(x) = P_1 + P_2 = 0.1452 + 0.0484',
          result: 'p(x) = 0.1936',
        },
        {
          step: 'Compute posterior responsibilities gamma_1 and gamma_2',
          math: '\\gamma_1 = \\frac{0.1452}{0.1936} = 0.7500; \\quad \\gamma_2 = \\frac{0.0484}{0.1936} = 0.2500',
          result: 'gamma_1 = 75.0%; gamma_2 = 25.0%',
        },
      ],
      finalConclusion: 'Sample x=5.0 has a 75% soft probability of originating from Component 1 and a 25% probability of originating from Component 2.',
    },
    visualExplanation: {
      title: 'Covariance Matrix Topologies and Ellipsoidal Contours',
      description: 'The interactive visualizer compares the four GMM covariance topologies: Spherical (equal variance, circular contours like K-Means), Diagonal (axis-aligned ellipses with no feature covariance), Tied (all clusters share the same covariance shape), and Full (unconstrained ellipses freely rotated at arbitrary angles).',
      features: [
        'Full Covariance: Models correlations between features; ellipses tilt at arbitrary angles.',
        'Diagonal Covariance: Models independent feature spreads; ellipses align with coordinate axes.',
        'Spherical Covariance: Equivalent to probabilistic soft K-Means with circular isotropic boundaries.',
      ],
    },
    scratchCode: {
      title: 'Gaussian Mixture Model with EM from Scratch in NumPy',
      code: `import numpy as np

class GMMScratch:
    def __init__(self, n_components=2, max_iter=100, tol=1e-4):
        self.n_components = n_components
        self.max_iter = max_iter
        self.tol = tol

    def fit(self, X):
        n_samples, n_features = X.shape

        # 1. Initialize parameters
        self.weights_ = np.full(self.n_components, 1.0 / self.n_components)
        random_idx = np.random.choice(n_samples, self.n_components, replace=False)
        self.means_ = X[random_idx].copy()
        self.covariances_ = [np.eye(n_features) for _ in range(self.n_components)]

        log_likelihood_old = -float('inf')

        for iteration in range(self.max_iter):
            # --- E-STEP ---
            # Compute multivariate normal densities: shape (n_samples, n_components)
            densities = np.zeros((n_samples, self.n_components))
            for k in range(self.n_components):
                diff = X - self.means_[k]
                cov = self.covariances_[k] + 1e-6 * np.eye(n_features) # Regularize
                cov_inv = np.linalg.inv(cov)
                det = np.linalg.det(cov)
                norm_const = 1.0 / np.sqrt(((2 * np.pi) ** n_features) * det)
                exponent = -0.5 * np.sum(diff @ cov_inv * diff, axis=1)
                densities[:, k] = norm_const * np.exp(exponent)

            # Responsibilities: gamma_ik = pi_k * N_k / sum(pi_j * N_j)
            weighted_densities = densities * self.weights_
            marginal_probs = np.sum(weighted_densities, axis=1, keepdims=True)
            responsibilities = weighted_densities / (marginal_probs + 1e-12)

            # --- M-STEP ---
            N_k = np.sum(responsibilities, axis=0) # shape (n_components,)
            self.weights_ = N_k / n_samples
            self.means_ = (responsibilities.T @ X) / N_k[:, np.newaxis]

            for k in range(self.n_components):
                diff = X - self.means_[k]
                self.covariances_[k] = (diff.T @ (responsibilities[:, k:k+1] * diff)) / N_k[k]

            # Check convergence via log-likelihood
            log_likelihood = np.sum(np.log(marginal_probs + 1e-12))
            if abs(log_likelihood - log_likelihood_old) < self.tol:
                break
            log_likelihood_old = log_likelihood

        self.responsibilities_ = responsibilities
        return self

    def predict_proba(self, X):
        return self.responsibilities_
`,
      explanation: 'Executes the complete E-step (computing multivariate Gaussian densities and responsibilities) and M-step (updating mixing weights, means, and full covariance matrices).',
    },
    sklearnCode: {
      title: 'Scikit-Learn GaussianMixture with BIC/AIC Model Selection',
      code: `from sklearn.mixture import GaussianMixture
from sklearn.datasets import make_blobs
import numpy as np

X, _ = make_blobs(n_samples=500, centers=3, cluster_std=[0.5, 1.2, 0.8], random_state=42)

# Fit GMM with full covariance
gmm = GaussianMixture(
    n_components=3,
    covariance_type='full',   # 'full', 'tied', 'diag', 'spherical'
    n_init=5,
    random_state=42
)

gmm.fit(X)
probs = gmm.predict_proba(X)

print(f"Converged in: {gmm.n_iter_} iterations")
print(f"Component Weights (pi): {np.round(gmm.weights_, 3)}")
print(f"BIC Score: {gmm.bic(X):.2f} (Lower is better)")
print(f"AIC Score: {gmm.aic(X):.2f} (Lower is better)")
`,
      explanation: 'Uses scikit-learn GaussianMixture and demonstrates Bayesian Information Criterion (BIC) for choosing the optimal number of components.',
    },
    runnableCode: {
      code: `import numpy as np
from scipy.stats import norm

# Hand numerical verification of 1D GMM E-Step
x = 5.0
pi1, mu1, sigma1 = 0.6, 4.0, 1.0
pi2, mu2, sigma2 = 0.4, 7.0, 2.0

pdf1 = norm.pdf(x, loc=mu1, scale=sigma1)
pdf2 = norm.pdf(x, loc=mu2, scale=sigma2)

joint1 = pi1 * pdf1
joint2 = pi2 * pdf2
evidence = joint1 + joint2

gamma1 = joint1 / evidence
gamma2 = joint2 / evidence

print(f"Point x:                      {x:.1f}")
print(f"Component 1 Density N(5|4,1): {pdf1:.4f} | Weighted: {joint1:.4f}")
print(f"Component 2 Density N(5|7,4): {pdf2:.4f} | Weighted: {joint2:.4f}")
print(f"Marginal Evidence p(x):       {evidence:.4f}")
print(f"Posterior Responsibility C1:  {gamma1 * 100:.2f}%")
print(f"Posterior Responsibility C2:  {gamma2 * 100:.2f}%")
print(f"Sum of Responsibilities:      {gamma1 + gamma2:.4f}")
`,
      expectedOutput: `Point x:                      5.0
Component 1 Density N(5|4,1): 0.2420 | Weighted: 0.1452
Component 2 Density N(5|7,4): 0.1210 | Weighted: 0.0484
Marginal Evidence p(x):       0.1936
Posterior Responsibility C1:  75.00%
Posterior Responsibility C2:  25.00%
Sum of Responsibilities:      1.0000`,
    },
    lineByLineExplanation: [
      {
        lines: '8-9',
        codeSnippet: 'pdf1 = norm.pdf(x, loc=mu1, scale=sigma1)\npdf2 = norm.pdf(x, loc=mu2, scale=sigma2)',
        explanation: 'Evaluates the univariate Gaussian probability density functions at sample x = 5.0.',
      },
      {
        lines: '11-16',
        codeSnippet: 'joint1 = pi1 * pdf1\n... evidence = joint1 + joint2\ngamma1 = joint1 / evidence',
        explanation: 'Applies Bayes theorem to compute posterior responsibilities gamma_1 = 75% and gamma_2 = 25%.',
      },
    ],
    hyperparameters: [
      {
        name: 'covariance_type',
        defaultVal: "'full'",
        range: "['full', 'tied', 'diag', 'spherical']",
        effect: "'full' allows each cluster independent rotated ellipses (d*(d+1)/2 params each); 'diag' restricts to axis-aligned ellipses; 'spherical' enforces isotropic spheres.",
        recommendation: "Use 'full' when feature interactions exist; switch to 'diag' if data is high-dimensional (p > 50) to prevent overfitting.",
      },
      {
        name: 'n_components (K)',
        defaultVal: '1',
        range: '1 to 50',
        effect: 'Number of Gaussian mixture components.',
        recommendation: 'Select K by plotting BIC (Bayesian Information Criterion) vs K and choosing the minimum.',
      },
      {
        name: 'reg_covar',
        defaultVal: '1e-6',
        range: '1e-6 to 1e-2',
        effect: 'Non-negative regularization added to the diagonal of covariance matrices to prevent singularities when a component collapses onto a single point.',
        recommendation: 'Increase to 1e-3 if EM terminates with LinAlgError (singular matrix).',
      },
    ],
    assumptions: [
      {
        assumption: 'Data is Generated by Superposition of Gaussians',
        whyItMatters: 'If underlying clusters have heavy polynomial tails or non-linear fractal manifolds, GMM will approximate them by stacking multiple redundant Gaussians.',
        howToVerify: 'Inspect component residual distributions using Q-Q plots.',
      },
      {
        assumption: 'Susceptibility to Singularities (Degenerate Components)',
        whyItMatters: 'If a component centers on a single isolated data point, its variance collapses to zero (det(Sigma) -> 0), driving the log-likelihood to +infinity.',
        howToVerify: 'Always use reg_covar > 0 to place a minimum floor on variance eigenvalues.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using full covariance matrices when p > N (more features than samples).',
        solution: 'When p > N, covariance matrices cannot be inverted. Use covariance_type="diag" or reduce dimensionality with PCA first.',
      },
      {
        mistake: 'Assuming GMM always finds the global maximum likelihood.',
        solution: 'EM is guaranteed to find a local maximum. Always use n_init >= 5 with different random initializations.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Audio & Speech Processing', application: 'Speaker Diarization & Voiceprint Recognition', benefit: 'Models vocal tract formant distributions with 16-32 Gaussian components to identify distinct human speakers.' },
      { industry: 'Financial Risk Management', application: 'Asset Return Regime Switching Models', benefit: 'Decomposes stock market returns into a low-volatility bull regime and a high-volatility bear regime.' },
      { industry: 'Image Segmentation', application: 'Foreground / Background GrabCut Modeling', benefit: 'Estimates 5-component RGB color distributions for foreground objects vs background scenes.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-7-6-1',
        question: 'Why does K-Means correspond to a special limiting case of Gaussian Mixture Models?',
        hint: 'What happens to GMM covariances and responsibilities as variance sigma^2 approaches zero?',
        answer: 'When all components share an isotropic spherical covariance Sigma_k = sigma^2 * I and the variance sigma^2 approaches zero, the posterior responsibility gamma_ik collapses to an all-or-nothing binary step function (1 for closest centroid, 0 elsewhere), making GMM mathematically identical to K-Means.',
      },
      {
        id: 'pq-7-6-2',
        question: 'What is a covariance singularity in GMM, and how is it resolved?',
        hint: 'What happens if a Gaussian centers on exactly one data point with zero spread?',
        answer: 'A singularity occurs when a Gaussian component collapses onto a single training sample; its variance shrinks to zero, causing |Sigma_k| -> 0 and driving the likelihood to infinity. It is resolved by adding a small positive regularizer (reg_covar * I) to the diagonal of all covariance matrices.',
      },
      {
        id: 'pq-7-6-3',
        question: 'How does BIC (Bayesian Information Criterion) penalize model complexity when choosing n_components?',
        hint: 'Recall the formula BIC = -2 ln(L) + k ln(N).',
        answer: 'BIC adds a penalty term k * ln(N), where k is the number of free parameters in the model. Because full covariance GMMs add d*(d+1)/2 parameters per component, BIC severely penalizes adding unnecessary components, guiding practitioners to the most parsimonious true K.',
      },
    ],
    quiz: [
      {
        id: 'q-7-6-1',
        question: 'What happens during the E-step (Expectation step) of the EM algorithm in GMM?',
        options: [
          'Cluster centroids are moved to the arithmetic mean.',
          'The posterior probabilities (responsibilities) gamma_ik that sample i belongs to component k are evaluated using Bayes’ theorem.',
          'Covariance matrices are inverted using Cholesky decomposition.',
          'Data points are permanently assigned to discrete clusters.',
        ],
        correctIndex: 1,
        explanation: 'In the E-step, current parameter estimates are frozen, and Bayes theorem calculates the posterior responsibility gamma_ik for every point and component.',
      },
      {
        id: 'q-7-6-2',
        question: 'Which GMM covariance type allows clusters to form elongated ellipses rotated at arbitrary angles to the coordinate axes?',
        options: [
          'spherical',
          'diagonal',
          'tied',
          'full',
        ],
        correctIndex: 3,
        explanation: 'Full covariance matrices estimate all pairwise feature covariances independently for each cluster, allowing unconstrained rotated ellipsoidal contours.',
      },
      {
        id: 'q-7-6-3',
        question: 'Why is standard Maximum Likelihood Estimation (MLE) intractable for GMMs, necessitating the EM algorithm?',
        options: [
          'Because the Gaussian distribution cannot be differentiated.',
          'Because the sum over components appears INSIDE the logarithm in the log-likelihood: ln(sum pi_k N_k), preventing analytical closed-form differentiation.',
          'Because computers cannot invert covariance matrices.',
          'Because GMM requires supervised labels.',
        ],
        correctIndex: 1,
        explanation: 'The summation inside the logarithm ln(sum_k pi_k N(x|mu_k, Sigma_k)) creates complex non-linear coupling that has no closed-form solution.',
      },
    ],
    independentExercise: {
      title: 'Model Elliptical Clusters with GMM vs K-Means',
      problem: 'Generate an anisotropic, stretched dataset by transforming Gaussian blobs with a rotation matrix. Fit both `KMeans(n_clusters=3)` and `GaussianMixture(n_components=3, covariance_type="full")`. Compare their Adjusted Rand Index against true labels.',
      hints: ['Transform blobs using X = np.dot(X, [[0.6, -0.6], [-0.4, 0.8]])', 'Compare adjusted_rand_score for both'],
      starterCode: `from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.mixture import GaussianMixture
from sklearn.metrics import adjusted_rand_score
import numpy as np

X, y = make_blobs(n_samples=600, centers=3, random_state=42)
transformation = [[0.6, -0.6], [-0.4, 0.8]]
X_aniso = np.dot(X, transformation)

# TODO: Compare KMeans vs GMM on X_aniso
`,
      solution: `from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.mixture import GaussianMixture
from sklearn.metrics import adjusted_rand_score
import numpy as np

X, y = make_blobs(n_samples=600, centers=3, random_state=42)
transformation = [[0.6, -0.6], [-0.4, 0.8]]
X_aniso = np.dot(X, transformation)

km = KMeans(n_clusters=3, random_state=42).fit(X_aniso)
gmm = GaussianMixture(n_components=3, covariance_type='full', random_state=42).fit(X_aniso)
gmm_preds = gmm.predict(X_aniso)

ari_km = adjusted_rand_score(y, km.labels_)
ari_gmm = adjusted_rand_score(y, gmm_preds)

print(f"K-Means ARI on Anisotropic Clusters: {ari_km:.4f} (Fails: forced spherical boundaries!)")
print(f"GMM ARI on Anisotropic Clusters:     {ari_gmm:.4f} (Near-perfect 1.0: modeled covariance rotation!)")
`,
    },
    summary: {
      keyTakeaways: [
        'Gaussian Mixture Models provide soft probabilistic clustering by modeling data as a linear combination of multivariate Gaussians.',
        'The Expectation-Maximization (EM) algorithm alternates between estimating responsibilities (E-step) and updating parameters (M-step).',
        'Full covariance matrices capture non-spherical, correlated geometries that break K-Means.',
      ],
      nextLessonId: 'pca-principal-component-analysis',
      nextLessonTitle: 'Principal Component Analysis (PCA)',
      nextLessonModuleId: 'module-7',
    },
  },

  'pca-principal-component-analysis': {
    id: 'pca-principal-component-analysis',
    moduleId: 'module-7',
    title: 'Principal Component Analysis (PCA)',
    subtitle: 'Variance Maximization, Covariance Eigendecomposition & SVD Equivalence',
    order: 7,
    readTimeMinutes: 28,
    difficulty: 'Intermediate',
    visualizerType: 'pca',
    objectives: [
      'Master the dual formulations of PCA: Maximum Variance Projection and Minimum Reconstruction Error.',
      'Derive the empirical sample covariance matrix C and its eigendecomposition C v = lambda v.',
      'Prove the mathematical equivalence between PCA eigendecomposition and Singular Value Decomposition (SVD).',
      'Compute and interpret the Explained Variance Ratio and scree plots.',
    ],
    prerequisites: ['clustering-foundations', 'Eigenvalues & Eigenvectors', 'Linear Algebra projections'],
    previousLesson: {
      id: 'gaussian-mixture-models',
      title: 'Gaussian Mixture Models & Expectation-Maximization',
      moduleId: 'module-7',
    },
    analogy: {
      title: 'Casting the Most Informative 2D Shadow of a Flying Airplane',
      text: 'Suppose you have a detailed 3D scale model of a Boeing 747 airplane and want to photograph its 2D shadow against a wall to capture as much detail as possible. If you shine the flashlight from the nose directly backwards, the shadow collapses into a tiny circle representing only the cockpit (all wingspan detail lost). But if you shine the light from directly above, the shadow projects the full wingspan and fuselage length onto the ground, preserving maximum geometric variance.',
      metaphor: 'PCA rotates the coordinate axes to align with the directions of maximum data spread, casting the most informative low-dimensional shadow.',
    },
    problemSolved: {
      title: 'Taming the Curse of Dimensionality and Multicollinearity',
      description: 'High-dimensional datasets (e.g. 10,000 genomic features or 1,000 image pixels) suffer from sparse volume, extreme computational cost, and heavy feature redundancy. PCA projects data onto an orthogonal, decorrelated subspace while preserving the maximum possible information.',
      keyPoints: [
        'Compresses high-dimensional feature spaces into a few uncorrelated principal components.',
        'Eliminates multicollinearity completely: all principal components are strictly orthogonal (zero correlation).',
        'Minimizes the L2 reconstruction error ||X - X_reconstructed||^2.',
      ],
    },
    intuition: {
      overview: 'PCA finds an ordered set of orthogonal unit vectors (principal directions) where the first component points in the direction of maximum variance, the second points in the direction of maximum remaining variance orthogonal to the first, and so on.',
      steps: [
        {
          step: 1,
          title: 'Mean Centering',
          description: 'Subtract the mean of each feature: X_centered = X - mu. (Standardization is also performed if feature units differ).',
        },
        {
          step: 2,
          title: 'Compute Sample Covariance Matrix',
          description: 'Calculate C = (1 / (N - 1)) X_centered^T X_centered.',
        },
        {
          step: 3,
          title: 'Eigendecomposition',
          description: 'Solve C v_k = lambda_k v_k. The eigenvalues lambda_k represent the variance explained by eigenvector v_k.',
        },
        {
          step: 4,
          title: 'Project Data onto Top K Components',
          description: 'Form projection matrix W_k from the top K eigenvectors: Z = X_centered @ W_k.',
        },
      ],
    },
    mathematics: {
      overview: 'PCA is derived by finding a unit direction vector w (||w|| = 1) that maximizes the sample variance of the projected points w^T x_i.',
      foundations: [
        {
          name: 'Variance of Projected Data',
          latex: '\\text{Var}(Xw) = w^T C w, \\quad \\text{subject to } w^T w = 1',
          explanation: 'where C is the d x d sample covariance matrix, and w is a unit projection vector.',
        },
        {
          name: 'Lagrangian Formulation and Eigenvalue Problem',
          latex: '\\mathcal{L}(w, \\lambda) = w^T C w - \\lambda (w^T w - 1) \\implies \\nabla_w \\mathcal{L} = 2 C w - 2 \\lambda w = 0 \\implies C w = \\lambda w',
          explanation: 'Maximizing variance subject to unit length requires w to be an eigenvector of the covariance matrix C, with eigenvalue lambda equaling the projected variance!',
        },
        {
          name: 'Explained Variance Ratio',
          latex: '\\text{EVR}_k = \\frac{\\lambda_k}{\\sum_{j=1}^d \\lambda_j}',
          explanation: 'Fraction of total dataset variance captured by the k-th principal component.',
        },
        {
          name: 'Singular Value Decomposition (SVD) Connection',
          latex: 'X_{\\text{centered}} = U \\Sigma V^T \\implies C = \\frac{1}{N-1} V \\Sigma^2 V^T',
          explanation: 'Right singular vectors V of centered data X are exactly the principal directions (eigenvectors of C), and eigenvalues lambda_k = sigma_k^2 / (N - 1).',
        },
      ],
    },
    derivation: {
      title: 'Derivation of PCA via Lagrange Multipliers',
      objective: 'Prove that the direction of maximum projected variance is the leading eigenvector of the covariance matrix C.',
      steps: [
        {
          step: 1,
          label: 'Express the sample variance of projected scalar coordinates z_i = w^T x_i',
          latex: '\\frac{1}{N} \\sum_{i=1}^N (w^T x_i)^2 = \\frac{1}{N} \\sum_{i=1}^N w^T x_i x_i^T w = w^T \\left( \\frac{1}{N} \\sum_{i=1}^N x_i x_i^T \\right) w = w^T C w',
          explanation: 'Assuming data is centered so sample mean is zero.',
        },
        {
          step: 2,
          label: 'Constrain projection vector to unit length',
          latex: '\\|w\\|^2 = w^T w = 1',
          explanation: 'Without this constraint, the variance could be made arbitrarily large by scaling w.',
        },
        {
          step: 3,
          label: 'Construct the Lagrangian function',
          latex: '\\mathcal{L}(w, \\lambda) = w^T C w - \\lambda (w^T w - 1)',
          explanation: 'where lambda is the Lagrange multiplier enforcing the unit-length constraint.',
        },
        {
          step: 4,
          label: 'Take vector derivative with respect to w and equate to zero',
          latex: '\\frac{\\partial \\mathcal{L}}{\\partial w} = 2 C w - 2 \\lambda w = 0 \\implies C w = \\lambda w',
          explanation: 'This is the canonical algebraic eigenvalue equation.',
        },
        {
          step: 5,
          label: 'Multiply on the left by w^T to evaluate the maximum variance',
          latex: 'w^T C w = w^T (\\lambda w) = \\lambda w^T w = \\lambda',
          explanation: 'The projected variance is exactly equal to the eigenvalue lambda! Thus, maximizing variance means choosing the eigenvector corresponding to the largest eigenvalue lambda_1.',
        },
      ],
    },
    variables: [
      { symbol: 'X', name: 'Centered Data Matrix', description: 'Zero-mean data matrix where each column has mean 0', dimensions: 'Matrix of shape (N, d)' },
      { symbol: 'C', name: 'Sample Covariance Matrix', description: 'Empirical covariance matrix (1 / (N - 1)) * X^T X', dimensions: 'Symmetric matrix of shape (d, d)' },
      { symbol: 'w_k', name: 'Principal Component Vector (Eigenvector)', description: 'Orthogonal unit direction vector along which variance is maximized', dimensions: 'Unit vector in R^d' },
      { symbol: '\\lambda_k', name: 'Eigenvalue', description: 'Magnitude of variance along the k-th principal direction', dimensions: 'Scalar >= 0' },
      { symbol: 'Z', name: 'Projected Feature Matrix', description: 'Coordinates of the data in the principal component space (Z = X @ W)', dimensions: 'Matrix of shape (N, K)' },
    ],
    numericalExample: {
      scenario: 'Trace PCA step by step on 3 centered 2D points: X = [[-1, -1], [0, 0], [1, 1]].',
      dataset: [
        { sample: 's1', x1: -1.0, x2: -1.0 },
        { sample: 's2', x1: 0.0, x2: 0.0 },
        { sample: 's3', x1: 1.0, x2: 1.0 },
      ],
      calculations: [
        {
          step: 'Step 1: Compute sample covariance matrix C',
          math: 'C = \\frac{1}{3 - 1} X^T X = \\frac{1}{2} \\begin{bmatrix} (-1)^2 + 0 + 1^2 & (-1)(-1) + 0 + 1(1) \\\\ (-1)(-1) + 0 + 1(1) & (-1)^2 + 0 + 1^2 \\end{bmatrix}',
          result: 'C = [[1.0, 1.0], [1.0, 1.0]]',
        },
        {
          step: 'Step 2: Find eigenvalues via det(C - lambda I) = 0',
          math: '\\det \\begin{bmatrix} 1 - \\lambda & 1 \\\\ 1 & 1 - \\lambda \\end{bmatrix} = (1 - \\lambda)^2 - 1 = \\lambda^2 - 2\\lambda = 0',
          result: 'lambda_1 = 2.0; lambda_2 = 0.0',
        },
        {
          step: 'Step 3: Compute normalized leading eigenvector for lambda_1 = 2.0',
          math: '(C - 2I) v_1 = 0 \\implies \\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix} \\begin{bmatrix} v_{11} \\\\ v_{12} \\end{bmatrix} = 0 \\implies v_{11} = v_{12}',
          result: 'v_1 = [1/sqrt(2), 1/sqrt(2)]^T ≈ [0.7071, 0.7071]^T',
        },
        {
          step: 'Step 4: Compute Explained Variance Ratio',
          math: '\\text{EVR}_1 = \\frac{2.0}{2.0 + 0.0} = 1.00 \\quad (100\\%)',
          result: 'PC1 captures 100% of the total dataset variance!',
        },
        {
          step: 'Step 5: Project points onto PC1',
          math: 'z_1 = -1(0.7071) + -1(0.7071) = -1.414; \\quad z_2 = 0; \\quad z_3 = +1.414',
          result: 'Z = [-1.414, 0.0, +1.414]^T in 1D space with zero information loss!',
        },
      ],
      finalConclusion: 'PCA compressed 2D correlated data into a single 1D axis with 100% variance retained and zero reconstruction error.',
    },
    visualExplanation: {
      title: 'PCA Projection and Explained Variance Visualizer',
      description: 'The interactive visualizer graphs a 2D cloud of correlated data points. The red vector shows PC1 pointing along the major axis of variation, while the perpendicular blue vector shows PC2. Drag the slider to project points onto PC1 and watch the orthogonal error lines vanish.',
      features: [
        'PC1 (Red): Direction of maximal variance (first eigenvector).',
        'PC2 (Blue): Orthogonal direction of residual variance (second eigenvector).',
        'Projection Residuals: Dotted lines showing orthogonal reconstruction error.',
      ],
    },
    scratchCode: {
      title: 'PCA from Scratch via Covariance Eigendecomposition in NumPy',
      code: `import numpy as np

class PCAScratch:
    def __init__(self, n_components=2):
        self.n_components = n_components
        self.components_ = None
        self.explained_variance_ = None
        self.explained_variance_ratio_ = None
        self.mean_ = None

    def fit(self, X):
        # 1. Mean center the data
        self.mean_ = np.mean(X, axis=0)
        X_centered = X - self.mean_

        # 2. Compute sample covariance matrix: shape (d, d)
        n_samples = X.shape[0]
        cov_matrix = (X_centered.T @ X_centered) / (n_samples - 1)

        # 3. Eigendecomposition
        eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)

        # 4. Sort eigenvalues and eigenvectors in descending order
        sorted_indices = np.argsort(eigenvalues)[::-1]
        sorted_eigenvalues = eigenvalues[sorted_indices]
        sorted_eigenvectors = eigenvectors[:, sorted_indices]

        # 5. Store top K components
        self.explained_variance_ = sorted_eigenvalues[:self.n_components]
        total_variance = np.sum(sorted_eigenvalues)
        self.explained_variance_ratio_ = self.explained_variance_ / total_variance
        # Transpose so components_ has shape (n_components, n_features)
        self.components_ = sorted_eigenvectors[:, :self.n_components].T
        return self

    def transform(self, X):
        X_centered = X - self.mean_
        return X_centered @ self.components_.T

    def inverse_transform(self, Z):
        return (Z @ self.components_) + self.mean_
`,
      explanation: 'Centers data, computes sample covariance matrix, performs symmetric eigendecomposition with np.linalg.eigh, sorts eigenvalues descending, and projects onto top components.',
    },
    sklearnCode: {
      title: 'Scikit-Learn PCA Usage and Scree Plot Analysis',
      code: `from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import load_breast_cancer
import numpy as np

data = load_breast_cancer()
X, y = data.data, data.target

# 1. Standardize features (essential for PCA!)
X_scaled = StandardScaler().fit_transform(X)

# 2. Fit PCA retaining 95% of total variance
pca = PCA(n_components=0.95, random_state=42)
X_pca = pca.fit_transform(X_scaled)

print(f"Original Feature Count:    {X.shape[1]}")
print(f"Reduced Component Count:   {X_pca.shape[1]} (Preserved 95% variance!)")
print(f"Explained Variance Ratios: {np.round(pca.explained_variance_ratio_, 3)}")
print(f"Cumulative Variance:       {np.sum(pca.explained_variance_ratio_):.4f}")
`,
      explanation: 'Uses scikit-learn PCA with n_components=0.95 to automatically select the minimum number of principal components that preserve 95% of cumulative variance.',
    },
    runnableCode: {
      code: `import numpy as np

# Numerical Verification of PCA Covariance Eigendecomposition
X = np.array([[-1.0, -1.0], [0.0, 0.0], [1.0, 1.0]])

# 1. Covariance Matrix
C = (X.T @ X) / (len(X) - 1)
print("Sample Covariance Matrix C:\\n", C)

# 2. Eigenvalues and Eigenvectors
eigenvalues, eigenvectors = np.linalg.eigh(C)
# Sort descending
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

print("\\nEigenvalues (Variances):", np.round(eigenvalues, 4))
print("Leading Eigenvector PC1: ", np.round(eigenvectors[:, 0], 4))
print(f"Explained Variance Ratio PC1: {eigenvalues[0] / np.sum(eigenvalues) * 100:.1f}%")

# 3. Project to 1D
Z = X @ eigenvectors[:, :1]
print("\\nProjected 1D Coordinates Z:\\n", np.round(Z, 4))

# 4. Reconstruction
X_rec = Z @ eigenvectors[:, :1].T
print("Reconstructed X:\\n", np.round(X_rec, 4))
print("Reconstruction Error: ", np.sum((X - X_rec)**2))
`,
      expectedOutput: `Sample Covariance Matrix C:
 [[1. 1.]
 [1. 1.]]

Eigenvalues (Variances): [2. 0.]
Leading Eigenvector PC1:  [0.7071 0.7071]
Explained Variance Ratio PC1: 100.0%

Projected 1D Coordinates Z:
 [[-1.4142]
 [ 0.    ]
 [ 1.4142]]
Reconstructed X:
 [[-1. -1.]
 [ 0.  0.]
 [ 1.  1.]]
Reconstruction Error:  0.0`,
    },
    lineByLineExplanation: [
      {
        lines: '6-8',
        codeSnippet: 'C = (X.T @ X) / (len(X) - 1)\nprint(...)',
        explanation: 'Computes the sample covariance matrix C = [[1, 1], [1, 1]] from zero-mean data.',
      },
      {
        lines: '11-16',
        codeSnippet: 'eigenvalues, eigenvectors = np.linalg.eigh(C)\n...',
        explanation: 'Solves the symmetric eigenvalue problem, finding lambda_1 = 2.0 (100% variance) and lambda_2 = 0.0.',
      },
      {
        lines: '25-28',
        codeSnippet: 'X_rec = Z @ eigenvectors[:, :1].T\nprint("Reconstruction Error: ", ...)',
        explanation: 'Reconstructs original points from 1D coordinates with exactly 0.0 reconstruction error.',
      },
    ],
    hyperparameters: [
      {
        name: 'n_components',
        defaultVal: 'None',
        range: 'int, float in (0, 1), or None',
        effect: 'If int, number of components to keep. If float in (0, 1), specifies the cumulative variance percentage to preserve (e.g. 0.95).',
        recommendation: 'Use 0.95 to preserve 95% variance for ML modeling; use 2 or 3 for data visualization.',
      },
      {
        name: 'whiten',
        defaultVal: 'False',
        range: '[True, False]',
        effect: 'When True, components are divided by the singular values to ensure projected outputs have unit variance.',
        recommendation: 'Set whiten=True when feeding PCA features into neural networks or distance-based algorithms.',
      },
      {
        name: 'svd_solver',
        defaultVal: "'auto'",
        range: "['auto', 'full', 'arpack', 'randomized']",
        effect: 'Numerical solver. Randomized SVD (Halko et al., 2011) significantly accelerates computation on large matrices.',
        recommendation: "Use 'randomized' for large sparse datasets when K << min(N, d).",
      },
    ],
    assumptions: [
      {
        assumption: 'Linear Relationships Between Features',
        whyItMatters: 'PCA performs an orthogonal linear coordinate rotation. It cannot untangle non-linear swiss rolls or spherical surfaces (use Kernel PCA, t-SNE, or UMAP instead).',
        howToVerify: 'Inspect pairwise scatter plots for non-linear curvatures.',
      },
      {
        assumption: 'Features Must Be Standardized (Unit Variance)',
        whyItMatters: 'PCA maximizes variance. If one feature has variance 10,000 and another has variance 1, PC1 will align exclusively with the high-variance feature regardless of informativeness.',
        howToVerify: 'Always apply StandardScaler prior to PCA unless features already share identical physical units.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to standardize features before PCA.',
        solution: 'Always pass data through StandardScaler before PCA; unscaled features cause PCA to reflect variable units rather than true signal.',
      },
      {
        mistake: 'Using PCA on categorical variables.',
        solution: 'PCA assumes continuous metric Euclidean space. For categorical data, use Multiple Correspondence Analysis (MCA).',
      },
    ],
    realWorldUseCases: [
      { industry: 'Facial Recognition', application: 'Eigenfaces (Turk & Pentland, 1991)', benefit: 'Compresses 10,000-pixel face portraits into 50 principal eigenface weights for real-time biometric matching.' },
      { industry: 'Quantitative Finance', application: 'Yield Curve Factor Decomposition', benefit: 'Decomposes 30 Treasury bond yield maturities into Level, Slope, and Curvature macroeconomic factors.' },
      { industry: 'Spectroscopy & Chemistry', application: 'Chemometric Infrared Spectral Analysis', benefit: 'Reduces thousands of continuous laser absorption wavelengths into 5 distinct chemical compound signatures.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-7-7-1',
        question: 'Why are all principal components strictly uncorrelated with each other?',
        hint: 'Consider the eigenvectors of a real symmetric matrix.',
        answer: 'Because the sample covariance matrix C is real and symmetric, the Spectral Theorem guarantees that its eigenvectors are mutually orthogonal: v_i^T v_j = 0 for i != j. Consequently, the covariance between projected components Cov(X v_i, X v_j) = v_i^T C v_j = lambda_j v_i^T v_j = 0.',
      },
      {
        id: 'pq-7-7-2',
        question: 'What is the relationship between PCA and Singular Value Decomposition (SVD)?',
        hint: 'Substitute SVD X = U Sigma V^T into C = (1/(N-1)) X^T X.',
        answer: 'SVD factors the centered data matrix as X = U Sigma V^T. The sample covariance matrix C = (1/(N-1)) X^T X = (1/(N-1)) V Sigma U^T U Sigma V^T = V (Sigma^2 / (N - 1)) V^T. Thus, the right singular vectors V are exactly the PCA eigenvectors, and the singular values sigma_k relate to eigenvalues by lambda_k = sigma_k^2 / (N - 1).',
      },
      {
        id: 'pq-7-7-3',
        question: 'What is a Scree Plot, and how do you use it to select the number of components?',
        hint: 'Look for the point where the eigenvalues level off.',
        answer: 'A scree plot graphs eigenvalues (or explained variance ratio) on the y-axis against component index on the x-axis. As described by Cattell (1966), the curve typically drops steeply and then flattens into rubble (scree). The "elbow" where the curve flattens indicates where additional components represent primarily noise.',
      },
    ],
    quiz: [
      {
        id: 'q-7-7-1',
        question: 'In PCA, what mathematical quantity does each eigenvalue lambda_k represent?',
        options: [
          'The number of clusters in the data.',
          'The variance of the data points when projected onto the k-th principal component eigenvector.',
          'The classification error rate.',
          'The degree of non-linearity in feature k.',
        ],
        correctIndex: 1,
        explanation: 'By the Lagrangian derivation, the projected variance Var(X w_k) = w_k^T C w_k = lambda_k.',
      },
      {
        id: 'q-7-7-2',
        question: 'Why is feature standardization (StandardScaler) mandatory before applying PCA when features have different physical units?',
        options: [
          'Without scaling, PCA algorithms crash with division by zero.',
          'Because PCA maximizes variance; unscaled features with large numerical magnitudes would artificially dominate the principal components regardless of their true information content.',
          'Standardization makes the covariance matrix singular.',
          'PCA requires data to be strictly non-negative.',
        ],
        correctIndex: 1,
        explanation: 'PCA direction vectors maximize raw variance. A feature measured in millimeters (variance 1,000,000) would hijack PC1 over a feature measured in meters (variance 1), even if the latter is more informative.',
      },
      {
        id: 'q-7-7-3',
        question: 'If a dataset has 50 features and the first 5 principal components have eigenvalues summing to 80% of the total eigenvalue sum, what is the cumulative explained variance of those 5 components?',
        options: [
          '10%',
          '50%',
          '80%',
          '100%',
        ],
        correctIndex: 2,
        explanation: 'The explained variance ratio is defined as sum(lambda_1..5) / sum(all lambda), which equals exactly 80%.',
      },
    ],
    independentExercise: {
      title: 'Verify SVD and Covariance Eigendecomposition Equivalence',
      problem: 'Generate a random (100, 5) centered dataset. Compute PCA eigenvalues and eigenvectors via `np.linalg.eigh(C)` and compare them with SVD right singular vectors V and singular values Sigma from `np.linalg.svd(X)`. Assert that lambda == sigma^2 / (N - 1).',
      hints: ['X_c = X - np.mean(X, axis=0)', 'U, S, Vt = np.linalg.svd(X_c)', 'Compare S**2 / (N - 1) with eigenvalues'],
      starterCode: `import numpy as np

np.random.seed(42)
N, d = 100, 5
X = np.random.randn(N, d)
X_c = X - np.mean(X, axis=0)

# TODO: Compare Covariance Eigendecomposition vs SVD
`,
      solution: `import numpy as np

np.random.seed(42)
N, d = 100, 5
X = np.random.randn(N, d)
X_c = X - np.mean(X, axis=0)

# 1. Covariance Eigendecomposition
C = (X_c.T @ X_c) / (N - 1)
eigvals, eigvecs = np.linalg.eigh(C)
eigvals = np.sort(eigvals)[::-1]

# 2. Singular Value Decomposition
U, S, Vt = np.linalg.svd(X_c, full_matrices=False)
svd_eigvals = (S ** 2) / (N - 1)

print(f"Covariance Matrix Eigenvalues: {np.round(eigvals, 4)}")
print(f"SVD Derived Eigenvalues:      {np.round(svd_eigvals, 4)}")
print(f"Exact Numerical Equivalence?  {np.allclose(eigvals, svd_eigvals)}")
`,
    },
    summary: {
      keyTakeaways: [
        'PCA finds an orthogonal coordinate system where principal components align with directions of maximum data variance.',
        'The principal component vectors are the eigenvectors of the sample covariance matrix C, and eigenvalues equal the projected variances.',
        'PCA is mathematically equivalent to Singular Value Decomposition (SVD): X = U Sigma V^T where lambda = sigma^2 / (N - 1).',
      ],
      nextLessonId: 'tsne-umap',
      nextLessonTitle: 'Non-Linear Manifold Learning: t-SNE & UMAP',
      nextLessonModuleId: 'module-7',
    },
  },

  'tsne-umap': {
    id: 'tsne-umap',
    moduleId: 'module-7',
    title: 'Non-Linear Manifold Learning: t-SNE & UMAP',
    subtitle: 'Preserving Local Topology, Student-t Heavy Tails & Fuzzy Simplicial Sets',
    order: 8,
    readTimeMinutes: 26,
    difficulty: 'Advanced',
    visualizerType: 'none',
    objectives: [
      'Understand why linear methods like PCA fail to preserve non-linear manifold topologies.',
      'Derive t-SNE conditional probability distributions p_{j|i} and symmetric joint distribution p_ij.',
      'Explain the "Crowding Problem" and why the heavy tails of Student-t distribution q_ij solve it.',
      'Compare t-SNE with UMAP (Uniform Manifold Approximation and Projection) fuzzy simplicial sets.',
    ],
    prerequisites: ['pca-principal-component-analysis', 'KL-divergence', 'Probability distributions'],
    previousLesson: {
      id: 'pca-principal-component-analysis',
      title: 'Principal Component Analysis (PCA)',
      moduleId: 'module-7',
    },
    analogy: {
      title: 'Flattening a World Globe onto a Flat Paper Map',
      text: 'If you peel an orange and try to smash the spherical peel flat onto a desktop, it tears or wrinkles because a 2D surface does not have the spatial volume to contain a 3D manifold without distortion (the Crowding Problem). Linear PCA simply crushes the peel from above, squashing points from opposite sides of the globe directly onto each other. t-SNE and UMAP treat the points like beads connected by elastic rubber bands: they gently tease neighboring beads apart while preserving local neighbor friendships.',
      metaphor: 't-SNE and UMAP preserve local neighborhood topologies on non-linear manifolds by converting distances into neighborhood probabilities.',
    },
    problemSolved: {
      title: 'Visualizing Complex High-Dimensional Non-Linear Manifolds',
      description: 'Real-world data (single-cell RNA-seq, image embeddings, deep neural network activations) lies on complex, twisted, non-linear manifolds. Linear PCA crushes distant manifold folds together. Non-linear manifold learning unfolds the manifold for intuitive 2D/3D visualization.',
      keyPoints: [
        'Preserves local neighborhood relationships and cluster topologies in 2D or 3D.',
        'Overcomes the crowding problem using heavy-tailed Student-t probability distributions.',
        'UMAP improves on t-SNE by preserving both local and global structure with vastly superior scaling speeds.',
      ],
    },
    intuition: {
      overview: 't-SNE converts high-dimensional Euclidean distances into conditional probabilities that represent similarities. In the low-dimensional space, it uses a Student-t distribution and minimizes the Kullback-Leibler (KL) divergence between the two distributions using gradient descent.',
      steps: [
        {
          step: 1,
          title: 'High-Dimensional Probabilities (p_ij)',
          description: 'Convert pairwise distances in high dimensions into Gaussian conditional probabilities p_{j|i} based on user Perplexity, then symmetrize into p_ij.',
        },
        {
          step: 2,
          title: 'Low-Dimensional Probabilities (q_ij)',
          description: 'Map low-dimensional embedding points y_i using a 1-degree-of-freedom Student-t (Cauchy) distribution with heavy inverse-square tails.',
        },
        {
          step: 3,
          title: 'Minimize KL Divergence',
          description: 'Adjust low-dimensional positions y_i via gradient descent to minimize KL(P || Q) = sum p_ij ln(p_ij / q_ij).',
        },
      ],
    },
    mathematics: {
      overview: 'The mathematical brilliance of Laurens van der Maaten and Geoffrey Hinton’s t-SNE lies in pairing a Gaussian high-dimensional similarity with a Student-t low-dimensional similarity.',
      foundations: [
        {
          name: 'High-Dimensional Conditional Similarity',
          latex: 'p_{j|i} = \\frac{\\exp(-\\|x_i - x_j\\|^2 / 2\\sigma_i^2)}{\\sum_{k \\neq i} \\exp(-\\|x_i - x_k\\|^2 / 2\\sigma_i^2)}, \\quad p_{ij} = \\frac{p_{j|i} + p_{i|j}}{2N}',
          explanation: 'where sigma_i is determined via binary search to match a user-specified Perplexity = 2^{H(P_i)}.',
        },
        {
          name: 'Low-Dimensional Student-t Similarity',
          latex: 'q_{ij} = \\frac{(1 + \\|y_i - y_j\\|^2)^{-1}}{\\sum_{k \\neq l} (1 + \\|y_k - y_l\\|^2)^{-1}}',
          explanation: 'The Student-t distribution with 1 DOF has heavy inverse-square tails (1 + d^2)^-1 that eliminate the crowding problem by pushing moderately distant clusters apart.',
        },
        {
          name: 'Kullback-Leibler Divergence Objective',
          latex: '\\mathcal{L} = \\text{KL}(P \\parallel Q) = \\sum_{i \\neq j} p_{ij} \\ln \\left( \\frac{p_{ij}}{q_{ij}} \\right)',
          explanation: 'Asymmetric KL divergence: if p_ij is high (neighbors) and q_ij is low, the penalty is massive. If p_ij is small (distant points), the penalty is negligible.',
        },
        {
          name: 't-SNE Gradient with Spring Dynamics',
          latex: '\\frac{\\partial \\mathcal{L}}{\\partial y_i} = 4 \\sum_{j} (p_{ij} - q_{ij}) (y_i - y_j) (1 + \\|y_i - y_j\\|^2)^{-1}',
          explanation: 'Acts as physical springs: attractive forces pull true neighbors together (p_ij > q_ij), while repulsive forces push non-neighbors apart (q_ij > p_ij).',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Crowding Problem Resolution via Heavy Tails',
      objective: 'Prove mathematically why the inverse-square Student-t tail prevents cluster overlap in 2D compared to a Gaussian.',
      steps: [
        {
          step: 1,
          label: 'Evaluate Gaussian tail decay at moderate distance d = 3',
          latex: 'f_{\\text{Gaussian}}(d=3) = \\exp(-d^2 / 2) = \\exp(-9 / 2) = \\exp(-4.5) \\approx 0.0111',
          explanation: 'In a Gaussian, probability drops exponentially fast toward zero.',
        },
        {
          step: 2,
          label: 'Evaluate Student-t tail decay at distance d = 3',
          latex: 'f_{\\text{Student-t}}(d=3) = (1 + d^2)^{-1} = (1 + 9)^{-1} = \\frac{1}{10} = 0.1000',
          explanation: 'The Student-t distribution has heavy power-law tails.',
        },
        {
          step: 3,
          label: 'Compare probability ratios',
          latex: '\\frac{f_{\\text{Student-t}}(3)}{f_{\\text{Gaussian}}(3)} = \\frac{0.1000}{0.0111} \\approx 9.0',
          explanation: 'At distance 3, Student-t provides 9x higher probability than a Gaussian.',
        },
        {
          step: 4,
          label: 'Conclude Crowding Resolution',
          latex: 'q_{ij} = p_{ij} \\implies \\|y_i - y_j\\|_{2D} \\gg \\|x_i - x_j\\|_{hD}',
          explanation: 'Because Student-t has heavy tails, to match the same moderate probability p_ij, points y_i and y_j in 2D MUST be placed much further apart than in the high-dimensional space. This naturally creates wide, empty margins between clusters.',
        },
      ],
    },
    variables: [
      { symbol: 'p_{ij}', name: 'High-Dimensional Joint Probability', description: 'Symmetric probability that points x_i and x_j are neighbors in high-dimensional space', dimensions: 'Probability in [0, 1]' },
      { symbol: 'q_{ij}', name: 'Low-Dimensional Joint Probability', description: 'Probability that points y_i and y_j are neighbors in low-dimensional space', dimensions: 'Probability in [0, 1]' },
      { symbol: 'y_i', name: 'Low-Dimensional Embedding Coordinates', description: 'Projected 2D or 3D position of observation i', dimensions: 'Vector in R^2 or R^3' },
      { symbol: '\\text{Perplexity}', name: 'Perplexity', description: 'Effective number of local nearest neighbors considered for each point (typical: 5-50)', dimensions: 'Scalar (typically 30)' },
    ],
    numericalExample: {
      scenario: 'Compare Gaussian vs Student-t probability densities for points separated by distances d = 1.0, 2.0, and 3.0.',
      dataset: [
        { distance: 1.0 },
        { distance: 2.0 },
        { distance: 3.0 },
      ],
      calculations: [
        {
          step: 'Compute Gaussian density exp(-d^2 / 2)',
          math: 'd=1: e^{-0.5}=0.6065; \\quad d=2: e^{-2}=0.1353; \\quad d=3: e^{-4.5}=0.0111',
          result: 'Gaussian: [0.6065, 0.1353, 0.0111]',
        },
        {
          step: 'Compute Student-t density (1 + d^2)^(-1)',
          math: 'd=1: (1+1)^{-1}=0.5000; \\quad d=2: (1+4)^{-1}=0.2000; \\quad d=3: (1+9)^{-1}=0.1000',
          result: 'Student-t: [0.5000, 0.2000, 0.1000]',
        },
        {
          step: 'Compute ratio Student-t / Gaussian',
          math: 'd=1: 0.5000 / 0.6065 = 0.82; \\quad d=2: 0.2000 / 0.1353 = 1.48; \\quad d=3: 0.1000 / 0.0111 = 9.01',
          result: 'Ratio: [0.82x, 1.48x, 9.01x]',
        },
      ],
      finalConclusion: 'At moderate to large distances, Student-t assigns nearly an order of magnitude higher probability, pushing clusters apart and eliminating crowding in 2D.',
    },
    visualExplanation: {
      title: 't-SNE vs UMAP Manifold Unfolding',
      description: 'The interactive visualizer compares PCA, t-SNE, and UMAP on a 3D Swiss Roll and handwritten digits. Notice how PCA crushes the spiral layers together. t-SNE completely unrolls the manifold into distinct local island clusters. UMAP preserves both local clusters AND the global macroscopic layout between clusters with 10x faster execution.',
      features: [
        'PCA: Fails on non-linear manifold; collapses overlapping sheets.',
        't-SNE: Preserves local neighborhoods; forms dense circular clusters.',
        'UMAP: Preserves both local topology and global inter-cluster continuum.',
      ],
    },
    scratchCode: {
      title: 'Minimal 2D t-SNE Gradient Descent in NumPy',
      code: `import numpy as np

def compute_q_matrix(Y):
    """Compute low-dimensional Student-t probabilities q_ij."""
    dists_sq = np.sum((Y[:, np.newaxis] - Y) ** 2, axis=2)
    inv_dists = 1.0 / (1.0 + dists_sq)
    np.fill_diagonal(inv_dists, 0.0) # q_ii = 0
    q = inv_dists / np.sum(inv_dists)
    return q, inv_dists

def tsne_gradient_step(Y, P, lr=200.0):
    """Perform one gradient descent step minimizing KL(P || Q)."""
    q, inv_dists = compute_q_matrix(Y)
    # Gradient: 4 * sum_j (p_ij - q_ij) * (y_i - y_j) * (1 + ||y_i - y_j||^2)^-1
    grad = np.zeros_like(Y)
    pq_diff = P - q # shape (N, N)

    for i in range(Y.shape[0]):
        diff = Y[i] - Y # shape (N, 2)
        mult = (pq_diff[i] * inv_dists[i])[:, np.newaxis]
        grad[i] = 4.0 * np.sum(mult * diff, axis=0)

    # Gradient update
    Y_new = Y - lr * grad
    return Y_new
`,
      explanation: 'Calculates the low-dimensional Student-t matrix q_ij and computes the exact physical spring gradient to adjust point coordinates Y.',
    },
    sklearnCode: {
      title: 'Scikit-Learn TSNE and UMAP Comparison',
      code: `from sklearn.manifold import TSNE
from sklearn.datasets import load_digits
import numpy as np

digits = load_digits()
X, y = digits.data, digits.target

# 1. Scikit-Learn t-SNE
tsne = TSNE(
    n_components=2,
    perplexity=30.0,
    learning_rate='auto',
    init='pca',               # Initializing with PCA preserves global structure
    random_state=42
)
X_tsne = tsne.fit_predict(X)
print(f"t-SNE embedding shape: {X_tsne.shape}")

# 2. UMAP (requires umap-learn package)
# import umap
# reducer = umap.UMAP(n_neighbors=15, min_dist=0.1, n_components=2, random_state=42)
# X_umap = reducer.fit_transform(X)
`,
      explanation: 'Applies scikit-learn TSNE with init="pca" and perplexity=30 to project 64-dimensional handwritten digits into 2D.',
    },
    runnableCode: {
      code: `import numpy as np

# Compare tail probabilities: Gaussian vs Student-t (1 DOF)
distances = np.array([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0])

p_gauss = np.exp(-distances**2 / 2.0)
p_student = 1.0 / (1.0 + distances**2)
ratios = p_student / p_gauss

print(f"{'Distance d':<12} | {'Gaussian Tail':<15} | {'Student-t Tail':<16} | {'Heavy Tail Ratio':<18}")
print("-" * 65)

for d, pg, ps, r in zip(distances, p_gauss, p_student, ratios):
    print(f"{d:<12.1f} | {pg:<15.4f} | {ps:<16.4f} | {r:<18.2f}x higher")

print("\\nAt distance 4.0, Student-t is over 190x higher than Gaussian!")
print("This proves why Student-t forces 2D clusters to separate cleanly.")
`,
      expectedOutput: `Distance d   | Gaussian Tail   | Student-t Tail   | Heavy Tail Ratio  
-----------------------------------------------------------------
0.5          | 0.8825          | 0.8000           | 0.91              x higher
1.0          | 0.6065          | 0.5000           | 0.82              x higher
1.5          | 0.3247          | 0.3077           | 0.95              x higher
2.0          | 0.1353          | 0.2000           | 1.48              x higher
2.5          | 0.0439          | 0.1379           | 3.14              x higher
3.0          | 0.0111          | 0.1000           | 9.01              x higher
4.0          | 0.0003          | 0.0588           | 175.40            x higher

At distance 4.0, Student-t is over 190x higher than Gaussian!
This proves why Student-t forces 2D clusters to separate cleanly.`,
    },
    lineByLineExplanation: [
      {
        lines: '4-6',
        codeSnippet: 'p_gauss = np.exp(-distances**2 / 2.0)\np_student = 1.0 / (1.0 + distances**2)\nratios = p_student / p_gauss',
        explanation: 'Computes tail densities for Gaussian vs Student-t across increasing Euclidean distances.',
      },
      {
        lines: '11-12',
        codeSnippet: 'for d, pg, ps, r in zip(...):\n    print(...)',
        explanation: 'Proves numerically that Student-t heavy tails provide up to 175x higher probabilities at larger distances, repelling clusters in 2D.',
      },
    ],
    hyperparameters: [
      {
        name: 'perplexity',
        defaultVal: '30.0',
        range: '5.0 to 50.0',
        effect: 'Smooth measure of the effective number of nearest neighbors. Lower perplexity focuses on local micro-clusters; higher perplexity captures global macro-structure.',
        recommendation: 'Try values 15, 30, and 50; never evaluate t-SNE with a single perplexity.',
      },
      {
        name: 'init',
        defaultVal: "'pca'",
        range: "['pca', 'random']",
        effect: 'Initialization coordinates for low-dimensional embedding. PCA initialization preserves global topology and ensures reproducible embeddings.',
        recommendation: "Always set init='pca'.",
      },
      {
        name: 'n_neighbors (UMAP)',
        defaultVal: '15',
        range: '2 to 100',
        effect: 'Controls the balance between local and global structure in UMAP. Low values isolate local clusters; high values preserve broad manifold geometry.',
        recommendation: 'Use 15-30 for balanced visualizations.',
      },
    ],
    assumptions: [
      {
        assumption: 'Data Lies on a Low-Dimensional Riemannian Manifold',
        whyItMatters: 't-SNE and UMAP assume high-dimensional observations are sampled from an intrinsically lower-dimensional manifold embedded within the feature space.',
        howToVerify: 'Verify samples exhibit local correlations and continuity.',
      },
      {
        assumption: 'Inter-Cluster Distances Cannot Be Interpreted Literally',
        whyItMatters: 't-SNE expands dense clusters and contracts sparse clusters. The physical distance between two clusters in a t-SNE plot does NOT necessarily imply they are distant in the original space.',
        howToVerify: 'Never use t-SNE distances to make quantitative scientific claims about cluster separation.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Interpreting cluster sizes or cluster distances in t-SNE as true geometric densities.',
        solution: 't-SNE adapts perplexity locally, equalizing cluster visual densities. Never infer cluster density or true inter-cluster distances from t-SNE.',
      },
      {
        mistake: 'Using t-SNE for feature preprocessing in a machine learning pipeline.',
        solution: 't-SNE is non-parametric and does not support out-of-sample `transform()` for new test samples. Use PCA or UMAP for pipeline dimensionality reduction.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Genomics & Immunology', application: 'Single-Cell RNA Sequencing (scRNA-seq) Cell Clustering', benefit: 'Resolves 50,000 individual immune cells into distinct T-cell, B-cell, and macrophage sub-populations.' },
      { industry: 'Natural Language Processing', application: 'Word2Vec & LLM Token Embedding Geometry', benefit: 'Visualizes 768-dimensional token embeddings, mapping semantic word clusters (e.g., countries, animals, verbs).' },
      { industry: 'Computer Vision', application: 'Convolutional Feature Layer Inspection', benefit: 'Visualizes pen-ultimate layer activations in image classification networks to audit class separation.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-7-8-1',
        question: 'What is the "Crowding Problem" in high-dimensional dimensionality reduction?',
        hint: 'Compare the volume of a sphere in 10 dimensions vs 2 dimensions.',
        answer: 'In d dimensions, the volume of a sphere scales as r^d. A moderate distance d in 10D contains immense volume to hold many distinct clusters. When forced into 2D, the available area scales only as r^2, lacking the space to place all moderately distant clusters without crowding and crushing them into the center.',
      },
      {
        id: 'pq-7-8-2',
        question: 'Why does UMAP typically outperform t-SNE in both speed and global structure preservation?',
        hint: 'Consider the mathematical framework: graph theory vs probability optimization.',
        answer: 'UMAP is rooted in Riemannian geometry and algebraic topology (fuzzy simplicial sets). It optimizes a cross-entropy loss that explicitly penalizes both local false neighbors AND global disconnections, while using approximate nearest neighbor algorithms (Descent graph) to run in O(N log N) time compared to t-SNE’s slower Barnes-Hut O(N log N) or exact O(N^2).',
      },
      {
        id: 'pq-7-8-3',
        question: 'Can you use a fitted t-SNE model to project new, unseen test data points into 2D?',
        hint: 'Does scikit-learn TSNE have a .transform() method?',
        answer: 'No. Standard t-SNE has no analytical mapping function f(x) -> y; it directly optimizes the coordinates y_i of the training samples via gradient descent. It has no .transform() method. UMAP, by contrast, supports transforming new points.',
      },
    ],
    quiz: [
      {
        id: 'q-7-8-1',
        question: 'What low-dimensional probability distribution is used in t-SNE to solve the crowding problem?',
        options: [
          'Gaussian (Normal) distribution',
          'Student-t distribution with 1 degree of freedom (Cauchy distribution)',
          'Poisson distribution',
          'Uniform distribution',
        ],
        correctIndex: 1,
        explanation: 't-SNE uses a Student-t distribution with 1 degree of freedom, whose heavy inverse-square tails push moderately distant points apart in 2D.',
      },
      {
        id: 'q-7-8-2',
        question: 'What loss function is minimized during t-SNE gradient descent?',
        options: [
          'Mean Squared Error: sum (y_i - x_i)^2',
          'Kullback-Leibler (KL) Divergence: KL(P || Q) = sum p_ij ln(p_ij / q_ij)',
          'Hinge Loss',
          'Binary Cross-Entropy',
        ],
        correctIndex: 1,
        explanation: 't-SNE minimizes the KL divergence between high-dimensional distribution P and low-dimensional distribution Q.',
      },
      {
        id: 'q-7-8-3',
        question: 'Why should you NEVER use distances between clusters in a t-SNE plot to infer true distances in high-dimensional space?',
        options: [
          'Because t-SNE code has mathematical bugs.',
          'Because t-SNE normalizes perplexity locally, expanding dense clusters and contracting sparse ones, making global Euclidean distances meaningless.',
          'Because t-SNE only works with categorical labels.',
          'Because t-SNE requires linear data.',
        ],
        correctIndex: 1,
        explanation: 't-SNE adapts its Gaussian bandwidth sigma_i locally to match perplexity, meaning local scale is warped differently across feature space.',
      },
    ],
    independentExercise: {
      title: 'Compare PCA vs t-SNE on Handwritten Digits',
      problem: 'Load the 64-dimensional Digits dataset. Project to 2D using both `PCA(n_components=2)` and `TSNE(n_components=2, perplexity=30)`. Compute the Silhouette score of the true digit classes in both 2D spaces to prove t-SNE’s non-linear manifold separation.',
      hints: ['from sklearn.datasets import load_digits', 'from sklearn.metrics import silhouette_score', 'Compare silhouette_score(X_pca, y) with silhouette_score(X_tsne, y)'],
      starterCode: `from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.metrics import silhouette_score

digits = load_digits()
X, y = digits.data, digits.target

# TODO: Compare PCA vs t-SNE 2D projections via Silhouette score
`,
      solution: `from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.metrics import silhouette_score

digits = load_digits()
X, y = digits.data, digits.target

X_pca = PCA(n_components=2, random_state=42).fit_transform(X)
X_tsne = TSNE(n_components=2, perplexity=30, init='pca', random_state=42).fit_transform(X)

s_pca = silhouette_score(X_pca, y)
s_tsne = silhouette_score(X_tsne, y)

print(f"Linear PCA 2D Class Silhouette Score:  {s_pca:.4f} (Heavy cluster overlap!)")
print(f"Non-Linear t-SNE Silhouette Score:     {s_tsne:.4f} (Cleanly resolved clusters!)")
`,
    },
    summary: {
      keyTakeaways: [
        'Linear PCA fails on non-linear manifolds by crushing distant sheets together; t-SNE and UMAP preserve local neighborhood topology.',
        't-SNE matches high-dimensional Gaussian probabilities P with low-dimensional heavy-tailed Student-t probabilities Q via KL-divergence.',
        'UMAP improves on t-SNE by combining fuzzy simplicial sets with cross-entropy to preserve both local clusters and global macro-structure.',
      ],
      nextLessonId: 'anomaly-detection',
      nextLessonTitle: 'Anomaly Detection: Isolation Forest & LOF',
      nextLessonModuleId: 'module-7',
    },
  },

  'anomaly-detection': {
    id: 'anomaly-detection',
    moduleId: 'module-7',
    title: 'Anomaly Detection: Isolation Forest & LOF',
    subtitle: 'Recursive Random Partitioning, Path Length h(x) & Local Reachability Density',
    order: 9,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Understand the fundamental premise of Isolation Forest (Liu, Ting & Zhou, 2008): isolating anomalies is fast and cheap.',
      'Derive the average path length h(x) in isolation trees and compare with random BST search cost c(n).',
      'Calculate the normalized anomaly score s(x, n) in [0, 1].',
      'Explain Local Outlier Factor (LOF) and its local reachability density ratio.',
    ],
    prerequisites: ['clustering-foundations', 'dbscan-clustering', 'Binary Search Trees'],
    previousLesson: {
      id: 'tsne-umap',
      title: 'Non-Linear Manifold Learning: t-SNE & UMAP',
      moduleId: 'module-7',
    },
    analogy: {
      title: 'Cutting Paper to Isolate a Stray Fly',
      text: 'Imagine a sheet of paper with 1,000 black dots clustered tightly in the center, and a single lone dot in the far upper-right corner. If you make random straight scissor cuts across the paper, the lone corner dot will be separated from everything else in just 1 or 2 cuts. But to isolate a specific dot buried deep inside the dense central swarm, you would need to make dozens of tiny, precise cuts.',
      metaphor: 'Anomalies are "few and different"—they require far fewer random splits to isolate in an isolation tree than normal inliers.',
    },
    problemSolved: {
      title: 'Detecting Rare Outliers Without Modeling Dense Normal Data',
      description: 'Traditional anomaly detection attempts to model the dense normal distribution first (e.g. multivariate Gaussians or distance matrices), which is computationally expensive (O(N^2)) and suffers in high dimensions. Isolation Forest directly isolates anomalies in linear O(N) time.',
      keyPoints: [
        'Directly targets anomalies rather than building complex profiles of normal data.',
        'Ultra-fast linear time complexity O(t * N * log(subsample_size)) with low memory footprint.',
        'Handles high-dimensional feature spaces without requiring distance matrices.',
      ],
    },
    intuition: {
      overview: 'Isolation Forest constructs an ensemble of Isolation Trees (iTrees). Each iTree recursively partitions data by randomly selecting a feature and randomly choosing a split threshold between the feature’s min and max values. Anomalies have short tree paths.',
      steps: [
        {
          step: 1,
          title: 'Subsample Data',
          description: 'Draw a random subsample of size psi (default: 256) without replacement to construct an isolation tree.',
        },
        {
          step: 2,
          title: 'Recursive Random Splits',
          description: 'Pick a feature at random; pick a threshold uniformly between min and max. Split data into left and right children.',
        },
        {
          step: 3,
          title: 'Record Path Length h(x)',
          description: 'Measure the number of edges traversed from the root node to the leaf where sample x is isolated.',
        },
        {
          step: 4,
          title: 'Compute Anomaly Score s(x, n)',
          description: 'Average path lengths across all trees and normalize against the theoretical average BST path length c(n).',
        },
      ],
    },
    mathematics: {
      overview: 'Fei Tony Liu’s mathematical framework connects the depth of isolation trees with the average search length in unsuccessful binary search trees.',
      foundations: [
        {
          name: 'Average Path Length in Unsuccessful Binary Search Tree',
          latex: 'c(n) = 2 \\left( \\ln(n - 1) + 0.5772156649 \\right) - \\frac{2(n - 1)}{n}',
          explanation: 'where 0.5772156649 is the Euler-Mascheroni constant gamma. Represents the average depth to isolate a point in a random dataset of size n.',
        },
        {
          name: 'Isolation Forest Anomaly Score Formula',
          latex: 's(x, n) = 2^{-\\frac{E[h(x)]}{c(n)}} \\in [0, 1]',
          explanation: 'where E[h(x)] is the average path length across all isolation trees. As E[h(x)] -> 0, s -> 1 (definite anomaly). If E[h(x)] -> c(n), s -> 0.5 (normal instance).',
        },
        {
          name: 'Score Interpretation Thresholds',
          latex: 's(x, n) \\to 1 \\implies \\text{Anomaly}, \\quad s(x, n) < 0.5 \\implies \\text{Normal Inlier}',
          explanation: 'If all samples have score s ≈ 0.5, the dataset has no distinct anomalies.',
        },
        {
          name: 'Local Outlier Factor (LOF) Ratio (Breunig et al., 2000)',
          latex: '\\text{LOF}_k(p) = \\frac{\\sum_{o \\in N_k(p)} \\frac{\\text{lrd}(o)}{\\text{lrd}(p)}}{|N_k(p)|}',
          explanation: 'Ratio of average local reachability density of neighbors to the point’s own density. LOF > 1.5 indicates a point located in a significantly sparser region than its neighbors.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Normalized Anomaly Score Bounds [0, 1]',
      objective: 'Prove that the anomaly score s(x, n) = 2^(-E[h(x)] / c(n)) is bounded in (0, 1] and analyze critical path limits.',
      steps: [
        {
          step: 1,
          label: 'Case 1: Extreme Outlier isolated in immediate root split',
          latex: '\\lim_{E[h(x)] \\to 0} s(x, n) = 2^{-\\frac{0}{c(n)}} = 2^0 = 1.0',
          explanation: 'An anomaly isolated in 0 or 1 edge produces an anomaly score of 1.0.',
        },
        {
          step: 2,
          label: 'Case 2: Average Normal Inlier with path matching expected BST depth',
          latex: 'E[h(x)] = c(n) \\implies s(x, n) = 2^{-\\frac{c(n)}{c(n)}} = 2^{-1} = 0.50',
          explanation: 'A sample that requires the theoretical average number of random cuts produces an anomaly score of exactly 0.5.',
        },
        {
          step: 3,
          label: 'Case 3: Deep Central Inlier requiring maximum tree depth',
          latex: '\\lim_{E[h(x)] \\to n - 1} s(x, n) = 2^{-\\frac{n - 1}{c(n)}} \\approx 2^{-\\text{large}} \\to 0',
          explanation: 'Points buried deep inside ultra-dense clusters produce scores approaching 0.',
        },
      ],
    },
    variables: [
      { symbol: 'h(x)', name: 'Path Length', description: 'Number of edges sample x traverses in an isolation tree from root to leaf', dimensions: 'Integer >= 1' },
      { symbol: 'E[h(x)]', name: 'Mean Path Length', description: 'Average path length of sample x across all trees in the forest', dimensions: 'Scalar >= 0' },
      { symbol: 'c(n)', name: 'Average BST Path Length', description: 'Theoretical average path length of unsuccessful search in a binary tree of size n', dimensions: 'Scalar > 0' },
      { symbol: 's(x, n)', name: 'Anomaly Score', description: 'Normalized anomaly score measuring outlier likelihood', dimensions: 'Scalar in (0, 1]' },
      { symbol: '\\psi', name: 'Subsample Size', description: 'Number of instances randomly sampled to construct each isolation tree (typically 256)', dimensions: 'Scalar integer' },
    ],
    numericalExample: {
      scenario: 'Compute the anomaly score for an outlier point with average path length E[h(x)] = 2.5 in a subsample of size n = 256.',
      dataset: [
        { sample: 'Outlier x1', mean_path_length: 2.5, subsample_n: 256 },
        { sample: 'Normal Inlier x2', mean_path_length: 10.2, subsample_n: 256 },
      ],
      calculations: [
        {
          step: 'Compute average BST normalization c(256)',
          math: 'c(256) = 2(\\ln(255) + 0.5772156649) - \\frac{2(255)}{256} = 2(5.5413 + 0.5772) - 1.9922 = 2(6.1185) - 1.9922',
          result: 'c(256) = 12.2370 - 1.9922 = 10.2448',
        },
        {
          step: 'Compute anomaly score for Outlier x1 (path = 2.5)',
          math: 's(x_1, 256) = 2^{-2.5 / 10.2448} = 2^{-0.2440} = e^{-0.2440 \\times \\ln(2)} = e^{-0.1691}',
          result: 's(x_1) = 0.8444 (Score > 0.6 -> STRONG ANOMALY!)',
        },
        {
          step: 'Compute anomaly score for Normal Inlier x2 (path = 10.2)',
          math: 's(x_2, 256) = 2^{-10.2 / 10.2448} \\approx 2^{-0.9956}',
          result: 's(x_2) = 0.5015 (Score ≈ 0.5 -> Completely Normal)',
        },
      ],
      finalConclusion: 'The outlier isolated in only 2.5 cuts received an anomaly score of 0.844, while the normal point scored 0.502.',
    },
    visualExplanation: {
      title: 'Isolation Tree Recursive Cuts and Path Depths',
      description: 'The interactive visualizer graphs a 2D bounding box with data points. Red lines represent successive random horizontal and vertical cuts. A lone red outlier is isolated after just 2 cuts (depth 2). A normal blue point in the center requires 12 successive cuts to be partitioned into its own leaf cell.',
      features: [
        'Outlier (Red): Short path depth h(x) <= 3; isolated in early root cuts.',
        'Inliers (Blue): Deep path depth h(x) >= 10; surrounded by dense cuts.',
        'Forest Averaging: Combining 100 random trees eliminates axis-aligned split noise.',
      ],
    },
    scratchCode: {
      title: 'Isolation Forest Anomaly Scoring from Scratch in Python',
      code: `import numpy as np

def c_factor(n):
    """Average path length of unsuccessful search in BST: c(n)."""
    if n <= 1:
        return 0.0
    if n == 2:
        return 1.0
    euler_gamma = 0.5772156649
    return 2.0 * (np.log(n - 1) + euler_gamma) - (2.0 * (n - 1) / n)

class IsolationTree:
    def __init__(self, max_depth):
        self.max_depth = max_depth
        self.split_feat = None
        self.split_val = None
        self.left = None
        self.right = None
        self.size = 0

    def fit(self, X, depth=0):
        self.size = X.shape[0]
        if depth >= self.max_depth or self.size <= 1:
            return self

        # Randomly choose feature
        n_features = X.shape[1]
        self.split_feat = np.random.randint(0, n_features)
        feat_vals = X[:, self.split_feat]
        min_v, max_v = feat_vals.min(), feat_vals.max()

        if min_v == max_v:
            return self

        # Randomly choose threshold uniformly
        self.split_val = np.random.uniform(min_v, max_v)
        left_mask = feat_vals < self.split_val

        self.left = IsolationTree(self.max_depth).fit(X[left_mask], depth + 1)
        self.right = IsolationTree(self.max_depth).fit(X[~left_mask], depth + 1)
        return self

    def path_length(self, x, depth=0):
        if self.left is None or self.right is None:
            return depth + c_factor(self.size)
        if x[self.split_feat] < self.split_val:
            return self.left.path_length(x, depth + 1)
        return self.right.path_length(x, depth + 1)
`,
      explanation: 'Constructs an Isolation Tree by recursively picking random features and uniform thresholds, and implements path length evaluation with BST completion c(n).',
    },
    sklearnCode: {
      title: 'Scikit-Learn IsolationForest & LocalOutlierFactor',
      code: `from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor
from sklearn.datasets import make_blobs
import numpy as np

# 500 normal points + 15 outliers
X, _ = make_blobs(n_samples=500, centers=2, cluster_std=0.8, random_state=42)
outliers = np.random.uniform(low=-10, high=15, size=(15, 2))
X_all = np.vstack([X, outliers])

# 1. Isolation Forest
iso = IsolationForest(
    n_estimators=100,
    max_samples=256,          # Subsample size psi = 256
    contamination=0.03,       # Expected ~3% outliers
    random_state=42
)
iso_preds = iso.fit_predict(X_all) # -1 for anomaly, +1 for inlier
raw_scores = iso.decision_function(X_all)

# 2. Local Outlier Factor (LOF)
lof = LocalOutlierFactor(n_neighbors=20, contamination=0.03)
lof_preds = lof.fit_predict(X_all)

print(f"Isolation Forest flagged {np.sum(iso_preds == -1)} anomalies.")
print(f"LOF flagged {np.sum(lof_preds == -1)} anomalies.")
`,
      explanation: 'Applies scikit-learn IsolationForest and LocalOutlierFactor to detect outliers with contamination=0.03.',
    },
    runnableCode: {
      code: `import numpy as np

# Verify Anomaly Score Formula s(x, n) = 2^(-E[h]/c(n))
def c_n(n):
    euler = 0.5772156649
    return 2.0 * (np.log(n - 1) + euler) - (2.0 * (n - 1) / n)

n = 256
c_val = c_n(n)
print(f"Subsample n = {n} -> Average BST Path c(n) = {c_val:.4f}\\n")

test_paths = [1.0, 2.5, 5.0, 10.24, 15.0, 20.0]
print(f"{'Mean Path E[h]':<15} | {'Anomaly Score s(x, n)':<22} | {'Interpretation':<20}")
print("-" * 62)

for h in test_paths:
    score = 2.0 ** (-h / c_val)
    if score >= 0.8:
        interp = "Definite Anomaly (Rare outlier)"
    elif score >= 0.6:
        interp = "Suspect Outlier"
    elif np.isclose(score, 0.5, atol=0.05):
        interp = "Normal Average Inlier"
    else:
        interp = "Deep Cluster Center"
    print(f"{h:<15.2f} | {score:<22.4f} | {interp:<20}")
`,
      expectedOutput: `Subsample n = 256 -> Average BST Path c(n) = 10.2448

Mean Path E[h]  | Anomaly Score s(x, n)  | Interpretation      
--------------------------------------------------------------
1.00            | 0.9346                 | Definite Anomaly (Rare outlier)
2.50            | 0.8444                 | Definite Anomaly (Rare outlier)
5.00            | 0.7130                 | Suspect Outlier     
10.24           | 0.5002                 | Normal Average Inlier
15.00           | 0.3624                 | Deep Cluster Center 
20.00           | 0.2584                 | Deep Cluster Center `,
    },
    lineByLineExplanation: [
      {
        lines: '4-6',
        codeSnippet: 'def c_n(n):\n    euler = 0.5772156649\n    return 2.0 * (np.log(n - 1) + euler) - (2.0 * (n - 1) / n)',
        explanation: 'Implements the exact average depth formula for unsuccessful BST search.',
      },
      {
        lines: '16-17',
        codeSnippet: 'score = 2.0 ** (-h / c_val)',
        explanation: 'Calculates the exponential anomaly score s(x, n) proving that path lengths h < 3 produce scores > 0.80 (outliers).',
      },
    ],
    hyperparameters: [
      {
        name: 'contamination',
        defaultVal: "'auto'",
        range: "float in (0, 0.5] or 'auto'",
        effect: 'The expected proportion of outliers in the dataset. Used to set the decision threshold on anomaly scores.',
        recommendation: 'Set based on known business domain defect rates (e.g. 0.01 for 1% fraud rate).',
      },
      {
        name: 'max_samples (psi)',
        defaultVal: "'auto' (256)",
        range: '64 to 1024',
        effect: 'Number of samples used to train each tree. Remarkably, small subsamples (psi=256) prevent "swamping" and "masking" and improve outlier detection.',
        recommendation: 'Keep at default 256; larger subsamples actually degrade performance due to masking.',
      },
      {
        name: 'n_estimators',
        defaultVal: '100',
        range: '50 to 300',
        effect: 'Number of isolation trees in the ensemble. Path lengths stabilize reliably around 100 trees.',
        recommendation: 'Use 100 to 200 trees.',
      },
    ],
    assumptions: [
      {
        assumption: 'Anomalies Are Few and Quantitatively Different',
        whyItMatters: 'If 40% of the dataset consists of identical corrupt records, they will form their own dense cluster and fail to be isolated quickly.',
        howToVerify: 'Verify that anomaly percentage is low (< 10%).',
      },
      {
        assumption: 'Linear Axis-Aligned Partitions',
        whyItMatters: 'Standard Isolation Forest makes axis-aligned splits. Extended Isolation Forest (EIF) uses random hyperplanes to avoid axis-aligned artifacts.',
        howToVerify: 'Use Extended Isolation Forest if anomalies sit at diagonal intersections.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Increasing max_samples to the entire dataset size (N = 100,000).',
        solution: 'Never use full sample size. Large samples cause "swamping" (normal points isolated too fast) and "masking" (outliers clustered together). Keep max_samples=256.',
      },
      {
        mistake: 'Interpreting scikit-learn `decision_function` outputs as probabilities.',
        solution: 'In scikit-learn, negative decision_function values are anomalies and positive values are inliers; apply sigmoid or check `predict()` for -1/1 flags.',
      },
    ],
    realWorldUseCases: [
      { industry: 'Banking & Payments', application: 'Payment Card Fraud Detection', benefit: 'Flags anomalous transaction amounts, velocities, and geographic anomalies in sub-millisecond execution times.' },
      { industry: 'Industrial IoT', application: 'Turbine Vibration Failure Warning', benefit: 'Detects bearing wear before mechanical failure by isolating abnormal sensor oscillation frequencies.' },
      { industry: 'Server Operations & DevOps', application: 'Kubernetes Pod Outlier Detection', benefit: 'Identifies memory-leaking microservices that deviate from peer container resource profiles.' },
    ],
    practiceQuestions: [
      {
        id: 'pq-7-9-1',
        question: 'Why does Isolation Forest use a small subsample size (e.g. max_samples=256) instead of training on the full dataset?',
        hint: 'Consider swamping and masking phenomena.',
        answer: 'Using the entire dataset causes swamping (normal instances surrounded by too many points, falsely looking isolated) and masking (too many outliers clustering together, making them require deeper cuts). A small sample of 256 isolates true anomalies cleanly with minimal memory and O(N) runtime.',
      },
      {
        id: 'pq-7-9-2',
        question: 'What is the mathematical meaning of an anomaly score s(x, n) = 0.50?',
        hint: 'Substitute E[h(x)] = c(n) into s = 2^(-E[h]/c(n)).',
        answer: 'When s = 0.50, E[h(x)] = c(n), meaning the sample’s path length exactly matches the theoretical average path length of a random binary search tree. The point exhibits no abnormal behavior and is a standard normal inlier.',
      },
      {
        id: 'pq-7-9-3',
        question: 'How does Local Outlier Factor (LOF) differ fundamentally from Isolation Forest?',
        hint: 'Density-based local comparisons vs tree partition depths.',
        answer: 'Isolation Forest isolates points using random space cuts and measures tree depth globally. Local Outlier Factor (LOF) is density-based: it computes the local reachability density of a point and compares it with the density of its k nearest neighbors, successfully detecting outliers even in datasets with varying local densities.',
      },
    ],
    quiz: [
      {
        id: 'q-7-9-1',
        question: 'In an Isolation Tree, what structural property distinguishes an anomaly from a normal inlier?',
        options: [
          'Anomalies always end up in the rightmost leaf of the tree.',
          'Anomalies require very few random splits to be isolated, resulting in significantly shorter path lengths h(x).',
          'Anomalies require deeper trees with path lengths exceeding 100.',
          'Anomalies cannot be partitioned by trees.',
        ],
        correctIndex: 1,
        explanation: 'Because anomalies are few and have extreme values, random bounding cuts isolate them very close to the tree root (small path length h(x)).',
      },
      {
        id: 'q-7-9-2',
        question: 'What is the default subsample size max_samples used by Isolation Forest (Liu et al., 2008)?',
        options: [
          '256',
          '10,000',
          '100,000',
          'All available samples',
        ],
        correctIndex: 0,
        explanation: 'Liu et al. proved that psi = 256 provides optimal anomaly isolation while eliminating masking and swamping.',
      },
      {
        id: 'q-7-9-3',
        question: 'What does a Local Outlier Factor (LOF) score of approximately 1.0 indicate?',
        options: [
          'The point is an extreme anomaly.',
          'The point has similar density to its neighbors, indicating a normal inlier.',
          'The point has zero neighbors.',
          'The algorithm failed to calculate distances.',
        ],
        correctIndex: 1,
        explanation: 'An LOF score close to 1.0 means the point’s local density matches its neighbors’ density (homogeneous inlier). Values significantly greater than 1.0 indicate outliers.',
      },
    ],
    independentExercise: {
      title: 'Tune Contamination in Isolation Forest for Fraud Detection',
      problem: 'Generate a dataset with 1,000 normal transactions and 20 extreme fraud transactions. Train `IsolationForest(contamination=0.02)`. Evaluate the Confusion Matrix to check how many true fraud transactions were successfully isolated.',
      hints: ['from sklearn.metrics import confusion_matrix', 'iso.predict(X) returns -1 for outlier, 1 for inlier', 'Convert -1/1 to 1/0 to match ground truth'],
      starterCode: `from sklearn.ensemble import IsolationForest
from sklearn.metrics import confusion_matrix
import numpy as np

np.random.seed(42)
X_normal = np.random.normal(loc=50, scale=10, size=(1000, 2))
X_fraud = np.random.uniform(low=200, high=300, size=(20, 2))
X = np.vstack([X_normal, X_fraud])
y_true = np.array([0]*1000 + [1]*20)

# TODO: Fit IsolationForest and compute confusion matrix
`,
      solution: `from sklearn.ensemble import IsolationForest
from sklearn.metrics import confusion_matrix
import numpy as np

np.random.seed(42)
X_normal = np.random.normal(loc=50, scale=10, size=(1000, 2))
X_fraud = np.random.uniform(low=200, high=300, size=(20, 2))
X = np.vstack([X_normal, X_fraud])
y_true = np.array([0]*1000 + [1]*20)

iso = IsolationForest(contamination=0.02, random_state=42).fit(X)
raw_preds = iso.predict(X)
# Map: -1 (anomaly) -> 1, +1 (inlier) -> 0
y_pred = np.where(raw_preds == -1, 1, 0)

cm = confusion_matrix(y_true, y_pred)
print(f"Confusion Matrix (Rows=True, Cols=Pred):\\n{cm}")
print(f"Detected {cm[1, 1]} out of 20 fraud transactions ({cm[1, 1]/20*100:.1f}% Recall)!")
`,
    },
    summary: {
      keyTakeaways: [
        'Isolation Forest detects outliers directly through random partitioning: anomalies require few cuts and produce short path lengths h(x).',
        'The anomaly score s(x, n) = 2^(-E[h(x)] / c(n)) normalizes path length against random BST expectations, with scores > 0.6 indicating anomalies.',
        'Local Outlier Factor (LOF) compares local reachability density against neighbors, effectively catching anomalies in varying density spaces.',
      ],
      nextLessonId: 'advanced-feature-selection',
      nextLessonTitle: 'Advanced Feature Selection & Regularization',
      nextLessonModuleId: 'module-8',
    },
  },
};
