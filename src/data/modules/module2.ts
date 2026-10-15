import { LessonContent, ModuleData } from '@/lib/types';

export const module2Data: ModuleData = {
  id: 'module-2',
  number: 2,
  title: 'Data Preprocessing and Feature Engineering',
  subtitle: 'Cleaning, Encoders, Scalers, Pipelines & Leakage Prevention',
  description: 'Master data cleaning, missing value mechanisms (MCAR, MAR, MNAR), outlier treatment, categorical encodings, scaling techniques, leakage prevention, imbalanced sampling (SMOTE), and Scikit-learn ColumnTransformer pipelines.',
  icon: 'Layers',
  badge: 'Data Prep',
  estimatedHours: 14,
  topicsCount: 13,
  lessons: [
    {
      id: 'eda-inspection',
      moduleId: 'module-2',
      title: 'Exploratory Data Analysis & Statistical Inspection',
      description: 'Summary statistics, skewness, kurtosis, correlation heatmaps, pairplots, and identifying data quirks.',
      order: 1,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'missing-values-duplicates',
      moduleId: 'module-2',
      title: 'Missing Data Mechanisms & Imputation Strategies',
      description: 'MCAR, MAR, MNAR mechanisms, mean/median/mode, KNNImputer, IterativeImputer (MICE), and duplicate resolution.',
      order: 2,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'outlier-detection-treatment',
      moduleId: 'module-2',
      title: 'Outlier Detection & Treatment Techniques',
      description: 'Tukey IQR fences, Z-scores, Modified Z-scores (MAD), Isolation Forest, and Winsorization vs Trimming.',
      order: 3,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'categorical-encoding',
      moduleId: 'module-2',
      title: 'Categorical Feature Encoding',
      description: 'Nominal vs ordinal variables, One-Hot Encoding, dummy variable trap, frequency encoding, and Target Encoding with smoothing.',
      order: 4,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'feature-scaling-normalization',
      moduleId: 'module-2',
      title: 'Feature Scaling & Normalization',
      description: 'StandardScaler, MinMaxScaler, RobustScaler, Normalizer, and why scale matters for gradient and distance algorithms.',
      order: 5,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'train-val-test-splitting',
      moduleId: 'module-2',
      title: 'Train, Validation & Test Splitting Strategies',
      description: 'Stratified splits, TimeSeriesSplit, GroupKFold, preventing data snooping, and unbiased evaluation protocols.',
      order: 6,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'data-leakage-prevention',
      moduleId: 'module-2',
      title: 'Data Leakage: Types, Detection & Prevention',
      description: 'Target leakage, train-test contamination, temporal lookahead bias, and fitting scalers strictly on training folds.',
      order: 7,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'feature-selection-extraction',
      moduleId: 'module-2',
      title: 'Feature Selection & Extraction Methods',
      description: 'Filter methods (VarianceThreshold, ANOVA F-test, Mutual Information), Wrapper methods (RFE), and Embedded Lasso selection.',
      order: 8,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'polynomial-features',
      moduleId: 'module-2',
      title: 'Polynomial Features & Interaction Terms',
      description: 'Expanding linear models to capture non-linearities, cross-feature interaction terms, and managing combinatorial explosion.',
      order: 9,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'datetime-text-features',
      moduleId: 'module-2',
      title: 'Date/Time and Basic Text Feature Engineering',
      description: 'Cyclical sin/cos encodings for periodic temporal features, Bag-of-Words, and TF-IDF calculation.',
      order: 10,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'imbalanced-datasets-smote',
      moduleId: 'module-2',
      title: 'Imbalanced Datasets & SMOTE Resampling',
      description: 'The accuracy paradox, Random Undersampling/Oversampling, SMOTE synthetic interpolation, and class weight adjustments.',
      order: 11,
      readTimeMinutes: 24,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'columntransformer-pipelines',
      moduleId: 'module-2',
      title: 'Scikit-Learn Pipelines & ColumnTransformer',
      description: 'Composing heterogeneous preprocessing pipelines for mixed numeric/categorical tables into unified production transformers.',
      order: 12,
      readTimeMinutes: 26,
      visualizerType: 'none',
      difficulty: 'Intermediate',
    },
    {
      id: 'cross-validation-foundations',
      moduleId: 'module-2',
      title: 'Cross-Validation Protocols & Generalization Variance',
      description: 'K-Fold, Repeated Stratified K-Fold, Leave-One-Out (LOOCV), and measuring generalization uncertainty.',
      order: 13,
      readTimeMinutes: 22,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
  ],
};

export const module2Lessons: Record<string, LessonContent> = {
  'eda-inspection': {
    id: 'eda-inspection',
    moduleId: 'module-2',
    title: 'Exploratory Data Analysis & Statistical Inspection',
    subtitle: 'Summary Statistics, Skewness, Kurtosis, Correlation Heatmaps & Visual Diagnosis',
    order: 1,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Compute and interpret the four statistical moments: mean, variance, skewness, and kurtosis.',
      'Identify multimodal distributions, data entry errors, and structural zero values.',
      'Construct and analyze correlation heatmaps to diagnose multicollinearity.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'expectation-variance-covariance'],
    analogy: {
      title: 'The Medical Triage Examination',
      text: 'Before a surgeon performs a complicated operation, they never rush in blindly. They conduct blood tests, take vital signs (pulse, blood pressure, temperature), inspect X-rays, and review patient history. Exploratory Data Analysis (EDA) is the medical triage of machine learning: you inspect data health, discover anomalies, spot corrupt entries, and understand patient anatomy before writing a single line of model code.',
      metaphor: 'EDA is the diagnostic health checkup every dataset must pass before modeling.',
    },
    problemSolved: {
      title: 'Preventing the "Garbage In, Garbage Out" Trap',
      description: 'Feeding unexamined raw datasets into machine learning algorithms leads to silent model failure, erroneous predictions, and catastrophic production outages caused by unrecognized data corruptions.',
      keyPoints: [
        'Reveals silent bugs such as placeholder values (-999, 9999) masquerading as valid numbers.',
        'Detects severe target skewness that requires log transformations.',
        'Exposes redundant features that cause mathematical singularity in regression solvers.',
      ],
    },
    intuition: {
      overview: 'EDA combines numerical summaries with visual graphics to discover patterns, test hypotheses, and verify assumptions about the underlying data generating process.',
      steps: [
        { step: 1, title: 'Shape & Types Audit', description: 'Inspect row counts, column counts, missing value tallies, and memory footprint.' },
        { step: 2, title: 'Univariate Distribution Analysis', description: 'Analyze each feature independently: histograms, boxplots, skewness, and percentiles.' },
        { step: 3, title: 'Bivariate & Multivariate Relationships', description: 'Examine scatter plots, correlation matrices, and cross-tabulations between features and target.' },
      ],
    },
    mathematics: {
      overview: 'Descriptive statistics use standardized moments to quantify central tendency, dispersion, asymmetry, and tail weight.',
      foundations: [
        {
          name: 'Sample Skewness (Fisher-Pearson)',
          latex: 'g_1 = \\frac{\\frac{1}{N} \\sum_{i=1}^N (x_i - \\bar{x})^3}{\\left( \\frac{1}{N} \\sum_{i=1}^N (x_i - \\bar{x})^2 \\right)^{3/2}}',
          explanation: 'Measures distributional asymmetry. g_1 > 0 indicates right-skewed tail; g_1 < 0 indicates left-skewed tail; g_1 = 0 is symmetric.',
        },
        {
          name: 'Excess Kurtosis',
          latex: 'g_2 = \\frac{\\frac{1}{N} \\sum_{i=1}^N (x_i - \\bar{x})^4}{\\left( \\frac{1}{N} \\sum_{i=1}^N (x_i - \\bar{x})^2 \\right)^2} - 3',
          explanation: 'Measures tail heaviness relative to normal distribution. g_2 > 0 (leptokurtic) indicates fat tails and high outlier frequency.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Standardized 3rd Central Moment (Skewness)',
      objective: 'Demonstrate why skewness is scale-invariant and sensitive to directional outliers.',
      steps: [
        {
          step: 1,
          label: 'Third Central Moment Definition',
          latex: '\\mu_3 = \\mathbb{E}[(X - \\mu)^3]',
          explanation: 'Cubing preserves the sign of deviations (x - mu). Negative deviations remain negative; positive deviations remain positive.',
        },
        {
          step: 2,
          label: 'Scale Normalization',
          latex: '\\gamma_1 = \\frac{\\mu_3}{\\sigma^3} = \\mathbb{E}\\left[ \\left( \\frac{X - \\mu}{\\sigma} \\right)^3 \\right]',
          explanation: 'Dividing by sigma^3 cancels the units of measurement, producing a dimensionless index.',
        },
        {
          step: 3,
          label: 'Interpretation of the Sum',
          latex: '\\text{If outliers } x_i \\gg \\mu \\implies (x_i - \\mu)^3 \\gg 0 \\implies g_1 > 0',
          explanation: 'A few extreme positive values dominate the sum, indicating a long right tail (e.g. income or house prices).',
        },
      ],
    },
    variables: [
      { symbol: 'g_1', name: 'Sample Skewness', description: 'Dimensionless measure of asymmetry.', dimensions: 'Scalar' },
      { symbol: 'g_2', name: 'Excess Kurtosis', description: 'Tails thickness relative to normal distribution (0 for Gaussian).', dimensions: 'Scalar' },
      { symbol: '\\bar{x}', name: 'Sample Mean', description: 'Arithmetic average of observations.', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Given sample data X = [2, 3, 3, 4, 18]. Calculate the mean, median, sample variance, and examine skewness caused by the outlier 18.',
      dataset: [{ x1: 2, x2: 3, x3: 3, x4: 4, x5: 18 }],
      calculations: [
        { step: 'Sample Mean', math: '(2 + 3 + 3 + 4 + 18) / 5 = 30 / 5', result: '6.00' },
        { step: 'Sample Median', math: 'Middle value of sorted array [2, 3, 3, 4, 18]', result: '3.00' },
        { step: 'Deviations (x - mean)', math: '[-4, -3, -3, -2, 12]', result: 'sum = 0' },
        { step: 'Squared Deviations for Variance', math: '((-4)^2 + (-3)^2 + (-3)^2 + (-2)^2 + 12^2) / 4 = (16+9+9+4+144)/4 = 182 / 4', result: '45.50' },
        { step: 'Cubed Deviations for Skewness', math: '((-4)^3 + (-3)^3 + (-3)^3 + (-2)^3 + 12^3) = (-64 - 27 - 27 - 8 + 1728)', result: '1602.00 (>0)' },
      ],
      finalConclusion: 'Mean (6.0) is double the median (3.0) and sum of cubed deviations is large and positive (+1602), indicating severe positive (right) skewness due to the value 18.',
    },
    visualExplanation: {
      title: 'Skewness and the Relative Positions of Mean, Median, and Mode',
      description: 'In a right-skewed distribution, the long right tail pulls the Mean far to the right, while the Median stays robust in the middle, and the Mode remains at the peak: Mode < Median < Mean.',
      features: ['Symmetric: Mean = Median = Mode', 'Right Skewed: Mean > Median > Mode', 'Left Skewed: Mean < Median < Mode'],
    },
    scratchCode: {
      title: 'Automated EDA Health Summary in Pure Python',
      explanation: 'Generate statistical profile including missingness, unique counts, skewness, and outlier flags.',
      code: `import numpy as np

def eda_summary(data: np.ndarray, feature_names: list):
    summary = []
    for col_idx, name in enumerate(feature_names):
        col = data[:, col_idx]
        mean_val = np.mean(col)
        median_val = np.median(col)
        std_val = np.std(col, ddof=1)
        
        # Calculate skewness
        m3 = np.mean((col - mean_val) ** 3)
        skewness = m3 / (np.std(col) ** 3) if std_val > 0 else 0.0
        
        summary.append({
            'feature': name,
            'mean': round(float(mean_val), 2),
            'median': round(float(median_val), 2),
            'std': round(float(std_val), 2),
            'skewness': round(float(skewness), 2),
            'skew_flag': 'High Right Skew' if skewness > 1.0 else ('High Left Skew' if skewness < -1.0 else 'Symmetric')
        })
    return summary

X = np.array([[2.0, 100.0], [3.0, 102.0], [3.0, 99.0], [4.0, 101.0], [18.0, 98.0]])
print(eda_summary(X, ['income_k', 'temperature']))
`,
    },
    sklearnCode: {
      title: 'Pandas & SciPy Statistical Profiling',
      explanation: 'Standard professional workflow using pandas describe and scipy.stats skew.',
      code: `import pandas as pd
from scipy import stats

df = pd.DataFrame({
    'house_price': [150000, 180000, 165000, 190000, 1200000],
    'bedrooms': [2, 3, 3, 4, 6]
})

print("Descriptive Statistics:\n", df.describe().T[['mean', '50%', 'std', 'min', 'max']])
print("\nSkewness:")
print(df.apply(stats.skew))
`,
    },
    runnableCode: {
      code: `import numpy as np

data = np.array([2.0, 3.0, 3.0, 4.0, 18.0])
mean = np.mean(data)
median = np.median(data)
m3 = np.mean((data - mean)**3)
skew = m3 / (np.std(data)**3)

print(f"Data: {data}")
print(f"Mean: {mean:.2f}")
print(f"Median: {median:.2f}")
print(f"Skewness: {skew:.2f} (Strong positive skew)")
`,
      expectedOutput: `Data: [ 2.  3.  3.  4. 18.]\nMean: 6.00\nMedian: 3.00\nSkewness: 1.48 (Strong positive skew)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 3', codeSnippet: 'data = np.array([2.0, 3.0, 3.0, 4.0, 18.0])', explanation: 'Creates 1D array containing a right-tail outlier (18.0).' },
      { lines: 'Lines 4-5', codeSnippet: 'mean = np.mean(data); median = np.median(data)', explanation: 'Calculates parametric mean and non-parametric median.' },
      { lines: 'Lines 6-7', codeSnippet: 'skew = m3 / (np.std(data)**3)', explanation: 'Computes normalized third central moment to quantify tail asymmetry.' },
    ],
    hyperparameters: [
      { name: 'skew_threshold', defaultVal: '1.0', range: '[0.5, 2.0]', effect: 'Threshold for applying log1p or Box-Cox transformations.', recommendation: 'Features with |skewness| > 1.0 benefit significantly from log1p transformation.' },
    ],
    assumptions: [
      { assumption: 'Sufficient Sample Size for Higher Moments', whyItMatters: 'Sample skewness and kurtosis have high sample variance on small datasets (n < 30).', howToVerify: 'Verify n >= 50 before making conclusions based on kurtosis.' },
    ],
    commonMistakes: [
      { mistake: 'Relying exclusively on the mean without checking the median or histogram', solution: 'The mean is completely unrobust to extreme outliers. Always compare mean with median to detect skew.' },
    ],
    realWorldUseCases: [
      { industry: 'Real Estate & Mortgage Banking', application: 'Home Price Valuation', benefit: 'EDA identifies luxury mansion outliers that would distort linear mortgage valuation models, prompting log1p price modeling.' },
    ],
    practiceQuestions: [
      { id: 'pq-eda-1', question: 'If a feature has Mean = 120, Median = 45, and Mode = 30, what can you infer about the shape of its distribution?', hint: 'Recall how extreme values pull the mean.', answer: 'The distribution is heavily right-skewed (positively skewed). Extreme large values pull the mean far above the median and mode.' },
    ],
    quiz: [
      {
        id: 'quiz-eda-1',
        question: 'Which statistical metric is the MOST robust against extreme outliers?',
        options: ['Mean', 'Median', 'Standard Deviation', 'Variance'],
        correctIndex: 1,
        explanation: 'The median depends only on rank order, requiring more than 50% of data points to be corrupted before it breaks down (50% breakdown point).' },
    ],
    independentExercise: {
      title: 'Detect Features Requiring Log Transformation',
      problem: 'Write a function find_skewed_features(df, threshold=1.0) that takes a Pandas DataFrame and returns a list of column names with absolute skewness exceeding the threshold.',
      hints: ['Use df.skew()', 'Filter columns using abs(skew_series) > threshold'],
      starterCode: `import pandas as pd
import numpy as np

def find_skewed_features(df: pd.DataFrame, threshold: float = 1.0) -> list:
    # TODO: return list of column names with |skew| > threshold
    return []

df_test = pd.DataFrame({
    'normal_col': np.random.normal(0, 1, 100),
    'skewed_col': np.random.exponential(scale=2.0, size=100)
})
print("Skewed columns:", find_skewed_features(df_test))
`,
      solution: `import pandas as pd
import numpy as np

def find_skewed_features(df: pd.DataFrame, threshold: float = 1.0) -> list:
    skews = df.skew(numeric_only=True)
    return skews[skews.abs() > threshold].index.tolist()

np.random.seed(42)
df_test = pd.DataFrame({
    'normal_col': np.random.normal(0, 1, 100),
    'skewed_col': np.random.exponential(scale=2.0, size=100)
})
print("Skewed columns:", find_skewed_features(df_test))
`,
    },
    summary: {
      keyTakeaways: [
        'EDA is the vital diagnostic inspection phase that prevents downstream modeling failures.',
        'Skewness measures tail asymmetry; kurtosis measures tail heaviness and outlier frequency.',
        'Comparing Mean and Median provides an instant test for outlier contamination.',
      ],
      nextLessonId: 'missing-values-duplicates',
      nextLessonTitle: 'Missing Data Mechanisms & Imputation Strategies',
      nextLessonModuleId: 'module-2',
    },
  },

  'missing-values-duplicates': {
    id: 'missing-values-duplicates',
    moduleId: 'module-2',
    title: 'Missing Data Mechanisms & Imputation Strategies',
    subtitle: 'MCAR, MAR, MNAR, KNNImputer, Iterative MICE & Deduplication Protocols',
    order: 2,
    readTimeMinutes: 22,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Classify missingness mechanisms: Missing Completely at Random (MCAR), Missing at Random (MAR), and Missing Not at Random (MNAR).',
      'Compare univariate imputation (mean, median, mode) with multivariate imputation (KNNImputer, MICE).',
      'Add binary missingness indicator flags to preserve missingness signal for predictive modeling.',
    ],
    prerequisites: ['eda-inspection', 'probability-distributions'],
    analogy: {
      title: 'The Missing Survey Answers',
      text: 'Imagine a customer satisfaction survey. 1) MCAR: A gust of wind blows away page 3 of random surveys (missingness is totally independent of any data). 2) MAR: Younger customers under 25 rarely fill out their home address, but if you control for age, missingness is random. 3) MNAR: Wealthy customers with incomes over $200,000 deliberately leave the "Annual Income" question blank because they value privacy. If you simply replace blank incomes with the average income ($50,000), you severely bias your model!',
      metaphor: 'The reason WHY data is missing dictates HOW you can legally fill it.',
    },
    problemSolved: {
      title: 'Handling Real-World Incomplete Observations Safely',
      description: 'Most classical ML algorithms (LinearRegression, LogisticRegression, SVM) immediately throw errors when encountering NaN values. Deleting all incomplete rows discards valuable training data; naive imputation introduces severe bias.',
      keyPoints: [
        'Diagnoses the statistical validity of row dropping vs imputation.',
        'Preserves predictive signals via missingness indicator columns.',
        'Uses multivariate correlations via KNN and MICE to impute plausible realistic values.',
      ],
    },
    intuition: {
      overview: 'Missing data handling depends on the mechanism. Under MCAR, dropping rows only reduces sample size. Under MAR or MNAR, dropping rows distorts population distributions.',
      steps: [
        { step: 1, title: 'Mechanism Audit', description: 'Analyze missingness correlations: does feature A go missing whenever feature B has a certain value?' },
        { step: 2, title: 'Missing Indicator Flag', description: 'Create a binary column is_missing_A = 1 if missing, else 0 to preserve information.' },
        { step: 3, title: 'Choose Imputation Model', description: 'Use median for skewed numerical data; use KNN or MICE for correlated tabular features.' },
      ],
    },
    mathematics: {
      overview: 'Rubin\'s missing data taxonomy defines the probability of missingness conditioned on observed and unobserved data.',
      foundations: [
        {
          name: 'Missing Completely at Random (MCAR)',
          latex: 'P(M | Y_{\\text{obs}}, Y_{\\text{mis}}) = P(M)',
          explanation: 'Missingness M is entirely independent of both observed data Y_obs and missing values Y_mis.',
        },
        {
          name: 'Missing at Random (MAR)',
          latex: 'P(M | Y_{\\text{obs}}, Y_{\\text{mis}}) = P(M | Y_{\\text{obs}})',
          explanation: 'Missingness depends on observed features (e.g. age), but not on the unobserved value itself.',
        },
        {
          name: 'Missing Not at Random (MNAR)',
          latex: 'P(M | Y_{\\text{obs}}, Y_{\\text{mis}}) \\neq P(M | Y_{\\text{obs}})',
          explanation: 'Missingness depends directly on the unobserved value itself (e.g. high earners omitting income).',
        },
      ],
    },
    derivation: {
      title: 'Iterative Imputer (MICE: Multivariate Imputation by Chained Equations)',
      objective: 'Formulate round-robin chained regression imputation for multivariate missing tables.',
      steps: [
        {
          step: 1,
          label: 'Initial Mean Imputation',
          latex: 'X^{(0)}_j = \\text{mean}(X_j) \\quad \\forall j \\in \\{1, \\dots, d\\}',
          explanation: 'Temporarily fill all missing values with feature column means.',
        },
        {
          step: 2,
          label: 'Isolate Feature j and Fit Regressor',
          latex: 'X_j^{\\text{obs}} \\sim f(X_{-j}^{\\text{current}})',
          explanation: 'Set feature j back to missing. Train a regressor predicting observed entries of X_j from all other features X_{-j}.',
        },
        {
          step: 3,
          label: 'Predict and Iterate',
          latex: 'X_j^{\\text{new, mis}} = \\hat{f}(X_{-j}^{\\text{mis}})',
          explanation: 'Update missing entries with predictions. Cycle through all features j = 1 to d for T iterations until convergence.',
        },
      ],
    },
    variables: [
      { symbol: 'M', name: 'Missingness Indicator Matrix', description: 'Binary matrix where M_ij = 1 if entry (i, j) is missing, else 0.', dimensions: 'N × d' },
      { symbol: 'Y_{\\text{obs}}', name: 'Observed Feature Values', description: 'Data entries present in the dataset.', dimensions: 'Subset of X' },
      { symbol: 'Y_{\\text{mis}}', name: 'Missing Feature Values', description: 'Unobserved true values we seek to estimate.', dimensions: 'Subset of X' },
    ],
    numericalExample: {
      scenario: 'Impute missing value for sample 3 on Feature 2 using KNNImputer (K=2) with Euclidean distance on standardized Feature 1.',
      dataset: [
        { sample: 1, f1: 10.0, f2: 100.0 },
        { sample: 2, f1: 12.0, f2: 110.0 },
        { sample: 3, f1: 11.0, f2: 'NaN' },
        { sample: 4, f1: 50.0, f2: 500.0 }
      ],
      calculations: [
        { step: 'Distance from Sample 3 to Sample 1', math: '|11.0 - 10.0| = 1.0', result: 'd(3, 1) = 1.0' },
        { step: 'Distance from Sample 3 to Sample 2', math: '|11.0 - 12.0| = 1.0', result: 'd(3, 2) = 1.0' },
        { step: 'Distance from Sample 3 to Sample 4', math: '|11.0 - 50.0| = 39.0', result: 'd(3, 4) = 39.0' },
        { step: 'Identify K=2 Nearest Neighbors', math: 'Samples 1 and 2 are closest (distance 1.0 vs 39.0)', result: 'Neighbors = {1, 2}' },
        { step: 'Average Neighbor F2 Values', math: '(100.0 + 110.0) / 2 = 210.0 / 2', result: '105.00' },
      ],
      finalConclusion: 'The KNN imputed value for sample 3 is 105.0, which naturally aligns with the local cluster instead of the global mean (236.7).',
    },
    visualExplanation: {
      title: 'Univariate Mean vs Multivariate KNN Imputation',
      description: 'Mean imputation creates an unnatural vertical spike of points directly at the mean, artificially reducing variance and destroying natural correlations. KNN imputation places points along the existing diagonal trend line.',
      features: ['Mean Imputation: Collapses feature variance', 'KNN Imputation: Preserves multidimensional covariance structure'],
    },
    scratchCode: {
      title: 'Median Imputation with Missingness Indicator Flag in Pure Python',
      explanation: 'Production pattern of adding a binary flag before imputing median.',
      code: `import numpy as np

def impute_with_indicator(arr: np.ndarray):
    """Replaces NaNs with median and appends a binary indicator column."""
    nan_mask = np.isnan(arr)
    # Compute median of valid entries
    median_val = np.nanmedian(arr)
    
    imputed_col = np.where(nan_mask, median_val, arr)
    indicator_col = nan_mask.astype(float)
    
    return np.column_stack([imputed_col, indicator_col])

data_col = np.array([25.0, 30.0, np.nan, 45.0, np.nan])
result = impute_with_indicator(data_col)
print("Original with NaNs:", data_col)
print("Result [Imputed_Val, Missing_Indicator]:\n", result)
`,
    },
    sklearnCode: {
      title: 'KNNImputer & SimpleImputer in Scikit-Learn',
      explanation: 'Applying scikit-learn imputers with add_indicator=True.',
      code: `import numpy as np
from sklearn.impute import SimpleImputer, KNNImputer

X = np.array([
    [10.0, 100.0],
    [12.0, 110.0],
    [11.0, np.nan],
    [50.0, 500.0]
])

# KNN Imputation
knn = KNNImputer(n_neighbors=2)
X_imputed = knn.fit_transform(X)

print("KNN Imputed Matrix:\n", X_imputed)
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.impute import KNNImputer

X = np.array([
    [10.0, 100.0],
    [12.0, 110.0],
    [11.0, np.nan],
    [50.0, 500.0]
])

knn = KNNImputer(n_neighbors=2)
imputed = knn.fit_transform(X)

print("Original array with NaN at row 2, col 1:")
print(X)
print("\nImputed array via KNN (n_neighbors=2):")
print(imputed)
`,
      expectedOutput: `Original array with NaN at row 2, col 1:\n[[ 10. 100.]\n [ 12. 110.]\n [ 11.  nan]\n [ 50. 500.]]\n\nImputed array via KNN (n_neighbors=2):\n[[ 10. 100.]\n [ 12. 110.]\n [ 11. 105.]\n [ 50. 500.]]`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-9', codeSnippet: 'X = np.array([[10, 100], [12, 110], [11, nan], [50, 500]])', explanation: 'Creates 2D matrix with missing value at index [2, 1].' },
      { lines: 'Line 11', codeSnippet: 'knn = KNNImputer(n_neighbors=2)', explanation: 'Configures KNN imputer to use 2 nearest neighbors based on observed dimensions.' },
      { lines: 'Line 12', codeSnippet: 'imputed = knn.fit_transform(X)', explanation: 'Fits and replaces NaN with mean of neighbors (100+110)/2 = 105.0.' },
    ],
    hyperparameters: [
      { name: 'n_neighbors', defaultVal: '5', range: '[2, 20]', effect: 'Number of nearby observations used to calculate imputed values.', recommendation: 'Use n_neighbors=5 for balanced variance/bias.' },
      { name: 'add_indicator', defaultVal: 'False', range: '[True, False]', effect: 'Generates extra binary columns tracking which values were originally missing.', recommendation: 'Always set add_indicator=True for tabular features under MAR/MNAR.' },
    ],
    assumptions: [
      { assumption: 'Ignorable Missingness for Imputation (MCAR / MAR)', whyItMatters: 'If data is MNAR, standard imputation introduces systematic bias that must be addressed via specialized models (e.g. Heckman selection model).', howToVerify: 'Analyze whether missingness correlates with other features or target.' },
    ],
    commonMistakes: [
      { mistake: 'Fitting imputers on the entire dataset before train/test splitting (Data Leakage)', solution: 'Always fit imputers strictly on X_train, then call transform(X_test) with learned parameters!' },
    ],
    realWorldUseCases: [
      { industry: 'Healthcare & Clinical Diagnostics', application: 'Patient EHR Vitals Imputation', benefit: 'Patients do not take all lab tests every visit. MICE imputation estimates missing lab biomarkers based on age, blood pressure, and diagnoses.' },
    ],
    practiceQuestions: [
      { id: 'pq-imp-1', question: 'Why is mean imputation generally discouraged for skewed numerical features?', hint: 'Recall how extreme values influence the mean vs median.', answer: 'Mean imputation is severely distorted by outliers, pulling imputed values away from the central cluster. Furthermore, substituting a single constant collapses feature variance and underestimates standard errors.' },
    ],
    quiz: [
      {
        id: 'quiz-imp-1',
        question: 'What is the key difference between MCAR (Missing Completely at Random) and MAR (Missing at Random)?',
        options: [
          'Under MCAR, missingness is completely independent of all variables; under MAR, missingness depends systematically on observed features.',
          'MCAR data cannot be imputed; MAR data can only be dropped.',
          'MCAR means more than 50% is missing; MAR means less than 5% is missing.',
          'There is no difference; they are interchangeable terms.',
        ],
        correctIndex: 0,
        explanation: 'MCAR means probability of missingness is purely random. MAR means missingness relates to observed variables (e.g. men are less likely to disclose weight), but is random after controlling for those variables.',
      },
    ],
    independentExercise: {
      title: 'Implement Duplicate Record Resolver',
      problem: 'Write a function deduplicate_features(df, subset_cols=None) that removes exact duplicates, reporting the count of dropped rows and returning the cleaned DataFrame.',
      hints: ['Use df.duplicated(subset=subset_cols)', 'df.drop_duplicates(subset=subset_cols)'],
      starterCode: `import pandas as pd

def deduplicate_dataset(df: pd.DataFrame, subset_cols=None):
    # TODO: remove duplicates and return (cleaned_df, num_dropped)
    return df, 0

df = pd.DataFrame({'id': [1, 2, 2, 3], 'val': ['a', 'b', 'b', 'c']})
cleaned, dropped = deduplicate_dataset(df, subset_cols=['id', 'val'])
print(f"Dropped {dropped} duplicates. Clean rows: {len(cleaned)}")
`,
      solution: `import pandas as pd

def deduplicate_dataset(df: pd.DataFrame, subset_cols=None):
    initial_len = len(df)
    cleaned_df = df.drop_duplicates(subset=subset_cols).copy()
    num_dropped = initial_len - len(cleaned_df)
    return cleaned_df, num_dropped

df = pd.DataFrame({'id': [1, 2, 2, 3], 'val': ['a', 'b', 'b', 'c']})
cleaned, dropped = deduplicate_dataset(df, subset_cols=['id', 'val'])
print(f"Dropped {dropped} duplicates. Clean rows: {len(cleaned)}")
`,
    },
    summary: {
      keyTakeaways: [
        'Missingness mechanisms dictate whether dropping rows introduces fatal sampling bias (MCAR vs MAR/MNAR).',
        'Adding binary missingness indicators preserves predictive information about why data was omitted.',
        'Multivariate imputers (KNN, MICE) preserve multi-feature correlations better than simple mean substitution.',
      ],
      nextLessonId: 'outlier-detection-treatment',
      nextLessonTitle: 'Outlier Detection & Treatment Techniques',
      nextLessonModuleId: 'module-2',
    },
  },

  'outlier-detection-treatment': {
    id: 'outlier-detection-treatment',
    moduleId: 'module-2',
    title: 'Outlier Detection & Treatment Techniques',
    subtitle: 'Tukey IQR Fences, Z-Scores, Modified Z-Scores (MAD), Isolation Forests & Winsorization',
    order: 3,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Detect univariate outliers using Tukey IQR fences: [Q1 - 1.5*IQR, Q3 + 1.5*IQR].',
      'Compute Modified Z-scores based on Median Absolute Deviation (MAD) for non-Gaussian data.',
      'Apply multivariate Isolation Forests to isolate anomalies in high-dimensional space.',
      'Compare outlier treatments: trimming (dropping) versus Winsorization (clamping).',
    ],
    prerequisites: ['eda-inspection', 'scalars-vectors-matrices-tensors'],
    analogy: {
      title: 'The Typo at the Hospital Scales',
      text: 'A nurse records newborn baby weights in kilograms: 3.2, 3.8, 3.5, 3.4, and 350.0! The 350.0 kg baby is obviously a data entry typo (an illegitimate outlier: someone forgot the decimal point). But in a credit card fraud dataset, a $50,000 transaction at 3:00 AM in Tokyo is an authentic legitimate outlier—the exact signal we are trying to detect! Outlier treatment requires distinguishing between corrupt measurement noise and rare critical events.',
      metaphor: 'Outliers can be corrupt noise to remove or precious rare anomalies to preserve.',
    },
    problemSolved: {
      title: 'Protecting Models from Extreme Value Distortion',
      description: 'Ordinary Least Squares, Neural Networks, and K-Means squared loss penalties square residuals (e^2). A single extreme outlier 100 units away incurs an error penalty of 10,000, skewing the entire model toward that single outlier.',
      keyPoints: [
        'Identifies corrupt data points before they distort model parameters.',
        'Prevents variance inflation that widens confidence intervals.',
        'Winsorization clamps extreme tails without losing sample row observations.',
      ],
    },
    intuition: {
      overview: 'Univariate methods inspect individual feature percentiles; multivariate methods isolate points that are anomalous in joint combinations (e.g. 12-year-old person with 30 years of job experience).',
      steps: [
        { step: 1, title: 'Tukey IQR Rule', description: 'Compute IQR = Q3 - Q1. Flag any point outside [Q1 - 1.5*IQR, Q3 + 1.5*IQR].' },
        { step: 2, title: 'Robust Z-Score (MAD)', description: 'Replace mean with median and standard deviation with Median Absolute Deviation.' },
        { step: 3, title: 'Isolation Forest', description: 'Randomly partition features; anomalies isolate in far fewer splits than normal dense points.' },
      ],
    },
    mathematics: {
      overview: 'Formulations of robust statistical outlier fences and dispersion metrics.',
      foundations: [
        {
          name: 'Tukey Interquartile Range (IQR) Fences',
          latex: '\\text{IQR} = Q_3 - Q_1, \\quad \\text{Lower Fence} = Q_1 - 1.5 \\cdot \\text{IQR}, \\quad \\text{Upper Fence} = Q_3 + 1.5 \\cdot \\text{IQR}',
          explanation: 'Standard boxplot definition identifying points outside the 1.5 * IQR whiskers.',
        },
        {
          name: 'Modified Z-score using MAD',
          latex: 'M_i = \\frac{0.6745 (x_i - \\tilde{x})}{\\text{MAD}} \\quad \\text{where } \\text{MAD} = \\text{median}(|x_i - \\tilde{x}|)',
          explanation: 'Standardizes using median x_tilde and MAD. 0.6745 normalizes MAD to match standard deviation under Gaussian distributions.',
        },
        {
          name: 'Winsorization (Percentile Clamping)',
          latex: 'x_i^{\\text{win}} = \\min(\\max(x_i, P_{\\alpha}), P_{1 - \\alpha})',
          explanation: 'Caps extreme values at specified percentiles (e.g. 1st and 99th percentiles).',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the 1.5 Multiplier in Tukey\'s Fences',
      objective: 'Explain why John Tukey chose 1.5 * IQR for normal distributions.',
      steps: [
        {
          step: 1,
          label: 'Gaussian Quartiles',
          latex: 'Q_1 = \\mu - 0.6745 \\sigma, \\quad Q_3 = \\mu + 0.6745 \\sigma \\implies \\text{IQR} = 1.349 \\sigma',
          explanation: 'For a normal distribution N(mu, sigma^2), 50% of mass lies within +/- 0.6745 sigma.',
        },
        {
          step: 2,
          label: 'Evaluate Upper Fence with k = 1.5',
          latex: 'Q_3 + 1.5 \\cdot \\text{IQR} = (\\mu + 0.6745\\sigma) + 1.5(1.349\\sigma) = \\mu + 2.698 \\sigma \\approx \\mu + 2.7 \\sigma',
          explanation: 'Points beyond 2.7 sigma represent approximately 0.7% of a normal population (rare extremes).',
        },
        {
          step: 3,
          label: 'Extreme Outliers (k = 3.0)',
          latex: 'Q_3 + 3.0 \\cdot \\text{IQR} = \\mu + 4.72 \\sigma',
          explanation: 'k = 3.0 sets fences beyond 4.7 sigma, flagging only the top 0.0002% most extreme deviations.',
        },
      ],
    },
    variables: [
      { symbol: 'Q_1, Q_3', name: 'First and Third Quartiles', description: '25th and 75th percentiles of the feature.', dimensions: 'Scalar' },
      { symbol: '\\text{MAD}', name: 'Median Absolute Deviation', description: 'Robust measure of statistical dispersion.', dimensions: 'Scalar ≥ 0' },
      { symbol: 'M_i', name: 'Modified Z-score', description: 'Outlier metric; values with |M_i| > 3.5 are flagged as outliers.', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'Given dataset X = [10, 12, 14, 15, 16, 18, 19, 100]. Calculate Q1, Q3, IQR, and determine if 100 is an outlier using Tukey fences.',
      dataset: [{ values: '10, 12, 14, 15, 16, 18, 19, 100' }],
      calculations: [
        { step: 'Order Statistics & Median', math: '8 samples. Median = (15 + 16)/2 = 15.5', result: 'Median = 15.5' },
        { step: 'Lower Half & Q1', math: 'Lower half: [10, 12, 14, 15] -> Q1 = (12 + 14)/2', result: 'Q1 = 13.00' },
        { step: 'Upper Half & Q3', math: 'Upper half: [16, 18, 19, 100] -> Q3 = (18 + 19)/2', result: 'Q3 = 18.50' },
        { step: 'Compute IQR', math: 'Q3 - Q1 = 18.5 - 13.0', result: 'IQR = 5.50' },
        { step: 'Upper Fence Calculation', math: 'Q3 + 1.5 \\cdot \\text{IQR} = 18.5 + 1.5(5.5) = 18.5 + 8.25', result: 'Upper Fence = 26.75' },
        { step: 'Outlier Test for 100', math: '100 > 26.75', result: '100 is a confirmed outlier' },
      ],
      finalConclusion: 'Since 100 exceeds the upper fence of 26.75, Tukey\'s rule flags it as a severe outlier.',
    },
    visualExplanation: {
      title: 'Boxplot Anatomy: Whiskers and Outlier Points',
      description: 'The central box spans from Q1 to Q3 (the IQR). Whiskers extend to the farthest non-outlier data points within 1.5 * IQR. Any data point beyond the whiskers is plotted as an individual outlier marker.',
      features: ['Box: Interquartile Range (50% of data)', 'Line inside box: Median', 'Points beyond whiskers: Outliers'],
    },
    scratchCode: {
      title: 'Tukey IQR Outlier Detector & Winsorizer in Pure Python',
      explanation: 'Calculate fences and clamp extreme values without dropping rows.',
      code: `import numpy as np

def winsorize_iqr(arr: np.ndarray, k: float = 1.5):
    """Clamps values outside [Q1 - k*IQR, Q3 + k*IQR]."""
    q1 = np.percentile(arr, 25)
    q3 = np.percentile(arr, 75)
    iqr = q3 - q1
    
    lower_fence = q1 - k * iqr
    upper_fence = q3 + k * iqr
    
    outliers = arr[(arr < lower_fence) | (arr > upper_fence)]
    clamped = np.clip(arr, lower_fence, upper_fence)
    
    return {
        'lower_fence': round(float(lower_fence), 2),
        'upper_fence': round(float(upper_fence), 2),
        'outliers_found': outliers.tolist(),
        'clamped_data': np.round(clamped, 2).tolist()
    }

data = np.array([10.0, 12.0, 14.0, 15.0, 16.0, 18.0, 19.0, 100.0])
print("Outlier results:", winsorize_iqr(data))
`,
    },
    sklearnCode: {
      title: 'Multivariate Isolation Forest with Scikit-Learn',
      explanation: 'Unsupervised tree-based outlier detection for multi-dimensional datasets.',
      code: `import numpy as np
from sklearn.ensemble import IsolationForest

# 2D data: 5 normal points and 1 clear outlier
X = np.array([
    [1.0, 1.0], [1.1, 0.9], [0.9, 1.2], [1.0, 0.8], [1.2, 1.1],
    [10.0, 10.0] # Anomaly
])

iso = IsolationForest(contamination=0.15, random_state=42)
preds = iso.fit_predict(X) # 1 for inlier, -1 for outlier

print("Predictions (1=Inlier, -1=Outlier):", preds)
print("Anomaly scores:", np.round(iso.decision_function(X), 4))
`,
    },
    runnableCode: {
      code: `import numpy as np

data = np.array([10.0, 12.0, 14.0, 15.0, 16.0, 18.0, 19.0, 100.0])
q1, q3 = np.percentile(data, [25, 75])
iqr = q3 - q1
lower = q1 - 1.5 * iqr
upper = q3 + 1.5 * iqr

outliers = data[(data < lower) | (data > upper)]
print(f"Data: {data}")
print(f"Q1: {q1:.1f}, Q3: {q3:.1f}, IQR: {iqr:.1f}")
print(f"Fences: [{lower:.2f}, {upper:.2f}]")
print(f"Outliers detected: {outliers}")
`,
      expectedOutput: `Data: [ 10.  12.  14.  15.  16.  18.  19. 100.]\nQ1: 13.5, Q3: 18.2, IQR: 4.8\nFences: [6.38, 25.38]\nOutliers detected: [100.]`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'q1, q3 = np.percentile(data, [25, 75])', explanation: 'Computes first and third quartiles using linear interpolation.' },
      { lines: 'Lines 5-7', codeSnippet: 'iqr = q3 - q1; upper = q3 + 1.5 * iqr', explanation: 'Establishes Tukey fences.' },
      { lines: 'Line 9', codeSnippet: 'outliers = data[(data < lower) | (data > upper)]', explanation: 'Filters data array for values falling outside the valid range.' },
    ],
    hyperparameters: [
      { name: 'contamination', defaultVal: '0.1', range: '(0.0, 0.5]', effect: 'Expected proportion of outliers in dataset for IsolationForest.', recommendation: 'Set to domain-expected anomaly rate (e.g. 0.01 for fraud).' },
    ],
    assumptions: [
      { assumption: 'Symmetry for Z-Scores', whyItMatters: 'Standard Z-score assumes Gaussian normality; on skewed data, it falsely flags non-outlier tail samples.', howToVerify: 'Use Modified Z-scores (MAD) or IQR for skewed data.' },
    ],
    commonMistakes: [
      { mistake: 'Blindly deleting all detected outliers without domain investigation', solution: 'Outliers can be high-value anomalies (fraud, rare equipment failure). Deleting them erases the signal you want to predict!' },
    ],
    realWorldUseCases: [
      { industry: 'Financial Services & Payments', application: 'Credit Card Fraud Detection', benefit: 'Isolation Forests detect unusual transaction velocity and spending amounts in milliseconds before authorization.' },
    ],
    practiceQuestions: [
      { id: 'pq-out-1', question: 'What is the advantage of Winsorization over simple trimming (dropping rows)?', hint: 'Think about sample size and row retention.', answer: 'Winsorization retains all training observations and associated feature information, capping only extreme values to prevent parameter distortion, whereas trimming deletes entire rows and shrinks the dataset.' },
    ],
    quiz: [
      {
        id: 'quiz-out-1',
        question: 'Under Tukey\'s rule, what is the upper fence for a distribution with Q1 = 20 and Q3 = 40?',
        options: ['50', '60', '70', '80'],
        correctIndex: 2,
        explanation: 'IQR = Q3 - Q1 = 40 - 20 = 20. Upper fence = Q3 + 1.5 * IQR = 40 + 1.5(20) = 40 + 30 = 70.',
      },
    ],
    independentExercise: {
      title: 'Implement Modified Z-Score with MAD',
      problem: 'Write a function modified_z_score(arr) that computes M_i = 0.6745 * (x_i - median) / MAD. Return a boolean mask where |M_i| > 3.5.',
      hints: ['median = np.median(arr)', 'mad = np.median(np.abs(arr - median))', 'M = 0.6745 * (arr - median) / mad'],
      starterCode: `import numpy as np

def detect_outliers_mad(arr: np.ndarray, threshold: float = 3.5) -> np.ndarray:
    # TODO: return boolean array (True for outlier)
    return np.zeros(len(arr), dtype=bool)

x = np.array([2.0, 2.1, 2.0, 1.9, 2.2, 50.0])
print("Outlier mask:", detect_outliers_mad(x))
`,
      solution: `import numpy as np

def detect_outliers_mad(arr: np.ndarray, threshold: float = 3.5) -> np.ndarray:
    med = np.median(arr)
    mad = np.median(np.abs(arr - med))
    if mad == 0:
        return np.zeros(len(arr), dtype=bool)
    mod_z = 0.6745 * np.abs(arr - med) / mad
    return mod_z > threshold

x = np.array([2.0, 2.1, 2.0, 1.9, 2.2, 50.0])
print("Outlier mask:", detect_outliers_mad(x))
`,
    },
    summary: {
      keyTakeaways: [
        'Tukey IQR fences provide a non-parametric outlier boundary: [Q1 - 1.5*IQR, Q3 + 1.5*IQR].',
        'Modified Z-scores use the median and MAD, making them resistant to extreme skew.',
        'Winsorization clamps extreme values to percentiles without discarding training samples.',
      ],
      nextLessonId: 'categorical-encoding',
      nextLessonTitle: 'Categorical Feature Encoding',
      nextLessonModuleId: 'module-2',
    },
  },

  'categorical-encoding': {
    id: 'categorical-encoding',
    moduleId: 'module-2',
    title: 'Categorical Feature Encoding',
    subtitle: 'Nominal vs Ordinal, One-Hot Encoding, Dummy Variable Trap & Target Encoding with Smoothing',
    order: 4,
    readTimeMinutes: 24,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Differentiate nominal categorical variables from ordered ordinal variables.',
      'Implement One-Hot Encoding and explain how dropping one level prevents the dummy variable trap in linear models.',
      'Implement Target Encoding with additive smoothing to handle high-cardinality features without dimensionality explosion.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'matrix-inverse-rank-determinants'],
    analogy: {
      title: 'The T-Shirt Sizes vs The Fruit Basket',
      text: 'T-shirt sizes [Small, Medium, Large, XL] have a clear natural order: Small < Medium < Large. We can encode them as integers [1, 2, 3, 4] because the mathematical ordering reflects reality (Ordinal Encoding). But fruit types [Apple, Banana, Orange] have no natural order: Apple is not "less than" Orange! If you encode Apple=1, Banana=2, Orange=3, a linear model thinks Orange is 3 times Apple, or that Banana is the arithmetic average of Apple and Orange! For nominal categories, we must create separate binary indicator switches (One-Hot Encoding).',
      metaphor: 'Ordinal encodings preserve rankings; One-Hot encodings create independent coordinate axes.',
    },
    problemSolved: {
      title: 'Converting Discrete Text Labels into Numerical Geometry',
      description: 'Machine learning algorithms execute arithmetic on real numbers. Categorical features like zip codes, colors, device types, and departments must be mapped to numeric matrices without introducing artificial order.',
      keyPoints: [
        'Prevents erroneous ordinal assumptions on unordered nominal classes.',
        'Eliminates perfect multicollinearity via the drop_first dummy variable trap fix.',
        'Compresses high-cardinality features (thousands of zip codes) via smoothed Target Encoding.',
      ],
    },
    intuition: {
      overview: 'One-hot encoding maps K categories into a K-dimensional basis where all categories are equidistant: distance between any two distinct classes is exactly sqrt(2).',
      steps: [
        { step: 1, title: 'Ordinal Mapping', description: 'For ordered levels, map to integers preserving hierarchy: e.g. Low=1, Med=2, High=3.' },
        { step: 2, title: 'One-Hot Encoding', description: 'For nominal levels, create K binary columns. Set column k to 1 and all others to 0.' },
        { step: 3, title: 'Target Encoding', description: 'Replace each category with the average target value for that category, smoothed by global prior.' },
      ],
    },
    mathematics: {
      overview: 'Mathematical formulations of binary indicators and empirical Bayes smoothed target encoding.',
      foundations: [
        {
          name: 'One-Hot Indicator Vector',
          latex: '\\mathbf{x}_{i} = [\\mathbb{I}(c_i = 1), \\mathbb{I}(c_i = 2), \\dots, \\mathbb{I}(c_i = K)]^T',
          explanation: 'Standard basis vector e_k with 1 at category index k and 0 elsewhere.',
        },
        {
          name: 'The Dummy Variable Trap (Collinearity)',
          latex: '\\sum_{k=1}^{K} D_k = \\mathbf{1} = \\mathbf{x}_0 \\implies (X^T X) \\text{ is non-invertible}',
          explanation: 'The sum of all K dummy columns equals the intercept column of 1s, causing exact singularity unless one dummy is dropped (K - 1 columns).',
        },
        {
          name: 'Target Encoding with Additive Smoothing',
          latex: 'S_k = \\frac{n_k \\bar{y}_k + m \\bar{y}_{\\text{global}}}{n_k + m}',
          explanation: 'Blends category target mean y_k with global target mean y_global using smoothing weight m. Prevents overfitting on rare categories.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of the Dummy Variable Trap Multicollinearity',
      objective: 'Show why retaining all K one-hot columns makes the regression design matrix singular.',
      steps: [
        {
          step: 1,
          label: 'Design Matrix with Intercept and All Dummies',
          latex: 'X = [\\mathbf{1} \\quad D_1 \\quad D_2 \\quad \\dots \\quad D_K]',
          explanation: 'Consider a dataset with an intercept column and K dummy columns.',
        },
        {
          step: 2,
          label: 'Construct Linear Combination',
          latex: '\\mathbf{1} - \\sum_{k=1}^{K} D_k = \\mathbf{1} - \\mathbf{1} = \\mathbf{0}',
          explanation: 'Every row has exactly one dummy active, so the sum across dummies always equals 1.',
        },
        {
          step: 3,
          label: 'Linear Dependence Proof',
          latex: '\\exists \\mathbf{c} \\neq \\mathbf{0} \\text{ such that } X \\mathbf{c} = \\mathbf{0} \\implies \\text{rank}(X) < K + 1',
          explanation: 'Columns are linearly dependent, so det(X^T X) = 0. Ordinary Least Squares fails unless we drop one column (K - 1 dummies).',
        },
      ],
    },
    variables: [
      { symbol: 'K', name: 'Cardinality', description: 'Number of distinct categories in the feature.', dimensions: 'Integer ≥ 2' },
      { symbol: 'n_k', name: 'Category Sample Count', description: 'Number of observations belonging to category k.', dimensions: 'Integer ≥ 1' },
      { symbol: 'm', name: 'Smoothing Weight', description: 'Smoothing pseudo-count parameter balancing local and global target mean.', dimensions: 'Scalar > 0' },
    ],
    numericalExample: {
      scenario: 'Compute smoothed target encoding for zip code "90210" with n_k = 4 houses, local mean price y_k = $800k, global mean price y_global = $400k, and smoothing weight m = 10.',
      dataset: [{ zip: '90210', n: 4, local_mean: 800000, global_mean: 400000, m: 10 }],
      calculations: [
        { step: 'Local Contribution', math: 'n_k \\cdot \\bar{y}_k = 4 \\cdot 800,000', result: '3,200,000' },
        { step: 'Global Prior Contribution', math: 'm \\cdot \\bar{y}_{\\text{global}} = 10 \\cdot 400,000', result: '4,000,000' },
        { step: 'Denominator (n_k + m)', math: '4 + 10', result: '14' },
        { step: 'Smoothed Encoding', math: '(3,200,000 + 4,000,000) / 14 = 7,200,000 / 14', result: '514,285.71' },
      ],
      finalConclusion: 'Because sample size is small (n=4), the smoothed estimate shrinks from $800k down to $514.3k toward the global mean, preventing severe overfitting.',
    },
    visualExplanation: {
      title: 'One-Hot Equidistant Geometry vs Ordinal Distortion',
      description: 'One-hot encoding places categories at vertices of a simplex where all pairs are at Euclidean distance sqrt(2). Ordinal encoding forces categories onto a 1D line where distance between Category 1 and 3 is double the distance between 1 and 2.',
      features: ['One-Hot: Perfectly symmetric geometry', 'Ordinal: Imposes strict linear distances', 'Target: Maps categories to 1D target expectations'],
    },
    scratchCode: {
      title: 'Smoothed Target Encoder in Pure Python',
      explanation: 'Calculate category target means blended with global prior to prevent overfitting.',
      code: `import numpy as np

def target_encode(categories: list, targets: list, m: float = 10.0):
    """Computes empirical Bayes smoothed target encoding."""
    categories = np.array(categories)
    targets = np.array(targets, dtype=float)
    global_mean = float(np.mean(targets))
    
    encoding_map = {}
    unique_cats = np.unique(categories)
    
    for cat in unique_cats:
        cat_targets = targets[categories == cat]
        n_k = len(cat_targets)
        y_bar_k = np.mean(cat_targets)
        # Smoothing formula
        smoothed = (n_k * y_bar_k + m * global_mean) / (n_k + m)
        encoding_map[cat] = round(float(smoothed), 2)
        
    encoded_vals = [encoding_map[c] for c in categories]
    return encoding_map, encoded_vals

cats = ['Paris', 'Paris', 'Tokyo', 'Tokyo', 'Tokyo', 'London']
y = [10.0, 12.0, 5.0, 6.0, 4.0, 20.0]
mapping, encoded = target_encode(cats, y, m=2.0)
print("Target Encoding Map:", mapping)
print("Encoded array:", encoded)
`,
    },
    sklearnCode: {
      title: 'OneHotEncoder with drop="first" in Scikit-Learn',
      explanation: 'Scikit-learn OneHotEncoder with handle_unknown handling and dummy avoidance.',
      code: `import pandas as pd
from sklearn.preprocessing import OneHotEncoder

df = pd.DataFrame({'color': ['Red', 'Blue', 'Green', 'Red']})

# drop='first' avoids dummy variable trap
ohe = OneHotEncoder(drop='first', sparse_output=False)
encoded = ohe.fit_transform(df[['color']])

print("Categories:", ohe.categories_[0])
print("Encoded matrix (columns: Blue, Green):\n", encoded)
`,
    },
    runnableCode: {
      code: `import pandas as pd
from sklearn.preprocessing import OneHotEncoder

df = pd.DataFrame({'city': ['London', 'Paris', 'Tokyo', 'London']})

ohe = OneHotEncoder(drop='first', sparse_output=False)
result = ohe.fit_transform(df[['city']])

print("Original column:\n", df['city'].values)
print("\nOne-Hot Encoded (drop='first'):")
print(result)
print("Transformed Feature Names:", ohe.get_feature_names_out(['city']))
`,
      expectedOutput: `Original column:\n ['London' 'Paris' 'Tokyo' 'London']\n\nOne-Hot Encoded (drop='first'):\n[[0. 0.]\n [1. 0.]\n [0. 1.]\n [0. 0.]]\nTransformed Feature Names: ['city_Paris' 'city_Tokyo']`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'df = pd.DataFrame({\'city\': [\'London\', \'Paris\', \'Tokyo\', \'London\']})', explanation: 'Creates categorical column with 3 unique city values.' },
      { lines: 'Line 6', codeSnippet: 'ohe = OneHotEncoder(drop=\'first\', sparse_output=False)', explanation: 'Configures encoder to drop first category (London) to eliminate collinearity.' },
      { lines: 'Line 7', codeSnippet: 'result = ohe.fit_transform(df[[\'city\']])', explanation: 'Transforms 3 categories into 2 binary indicator columns.' },
    ],
    hyperparameters: [
      { name: 'drop', defaultVal: 'None', range: '[None, "first", "if_binary"]', effect: 'Drops one category to prevent dummy variable trap.', recommendation: 'Use drop="first" for unregularized linear models; keep all dummies (drop=None) for tree models and L2 regularized models.' },
      { name: 'handle_unknown', defaultVal: '"error"', range: '["error", "ignore"]', effect: 'Behavior when encountering unseen categories during inference.', recommendation: 'Set handle_unknown="ignore" in production pipelines to prevent crashes on new categories.' },
    ],
    assumptions: [
      { assumption: 'Nominal Independence for One-Hot', whyItMatters: 'One-hot encoding assumes all category pairs are equally dissimilar.', howToVerify: 'Verify that categories lack a natural quantitative progression.' },
    ],
    commonMistakes: [
      { mistake: 'Using LabelEncoder on input features instead of targets', solution: 'LabelEncoder is intended strictly for 1D target labels y. Use OrdinalEncoder or OneHotEncoder for input features X.' },
    ],
    realWorldUseCases: [
      { industry: 'E-Commerce & Retail', application: 'Product Category Encoding', benefit: 'Smoothed Target Encoding maps 10,000 Amazon product categories into a single informative 1D feature without creating 10,000 sparse columns.' },
    ],
    practiceQuestions: [
      { id: 'pq-cat-1', question: 'What is the danger of using standard Target Encoding without smoothing or out-of-fold cross-validation?', hint: 'Consider a category with only 1 sample.', answer: 'It causes severe target leakage and overfitting: if a category appears only once with target y=1, the model simply memorizes that this category equals 1.0, memorizing the training target rather than general patterns.' },
    ],
    quiz: [
      {
        id: 'quiz-cat-1',
        question: 'If a nominal categorical feature has 5 distinct levels, how many binary columns must be kept to avoid the dummy variable trap in unregularized linear regression?',
        options: ['1', '4', '5', '10'],
        correctIndex: 1,
        explanation: 'To avoid the dummy variable trap in the presence of an intercept, you must keep K - 1 dummy columns: 5 - 1 = 4 columns.',
      },
    ],
    independentExercise: {
      title: 'Implement Out-of-Fold Target Encoder',
      problem: 'Write a function out_of_fold_target_encode(df, cat_col, target_col, n_splits=3) that uses KFold to calculate target encodings for each fold strictly using training folds, preventing leakage.',
      hints: ['Use KFold(n_splits=n_splits)', 'For each val fold, compute map on train fold and map to val fold'],
      starterCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import KFold

def oof_target_encode(df: pd.DataFrame, cat_col: str, target_col: str, n_splits: int = 3):
    encoded_vals = np.zeros(len(df))
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)
    # TODO: compute out-of-fold encodings
    return encoded_vals

df_sample = pd.DataFrame({'cat': ['A', 'A', 'B', 'B', 'A', 'B'], 'target': [1, 0, 1, 1, 1, 0]})
print("OOF Encodings:", oof_target_encode(df_sample, 'cat', 'target'))
`,
      solution: `import pandas as pd
import numpy as np
from sklearn.model_selection import KFold

def oof_target_encode(df: pd.DataFrame, cat_col: str, target_col: str, n_splits: int = 3):
    encoded_vals = np.zeros(len(df))
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)
    
    for train_idx, val_idx in kf.split(df):
        train_df = df.iloc[train_idx]
        val_df = df.iloc[val_idx]
        
        cat_means = train_df.groupby(cat_col)[target_col].mean()
        global_mean = train_df[target_col].mean()
        
        encoded_vals[val_idx] = val_df[cat_col].map(cat_means).fillna(global_mean).values
        
    return np.round(encoded_vals, 2)

df_sample = pd.DataFrame({'cat': ['A', 'A', 'B', 'B', 'A', 'B'], 'target': [1, 0, 1, 1, 1, 0]})
print("OOF Encodings:", oof_target_encode(df_sample, 'cat', 'target'))
`,
    },
    summary: {
      keyTakeaways: [
        'Ordinal encoding applies only to naturally ordered levels; nominal categories require One-Hot or Target Encoding.',
        'Dropping one dummy column (K - 1) prevents the dummy variable trap and matrix singularity in linear models.',
        'Target encoding with smoothing handles high-cardinality features efficiently while protecting against overfitting.',
      ],
      nextLessonId: 'feature-scaling-normalization',
      nextLessonTitle: 'Feature Scaling & Normalization',
      nextLessonModuleId: 'module-2',
    },
  },

  'feature-scaling-normalization': {
    id: 'feature-scaling-normalization',
    moduleId: 'module-2',
    title: 'Feature Scaling & Normalization',
    subtitle: 'StandardScaler, MinMaxScaler, RobustScaler, Normalizer & Algorithm Sensitivity',
    order: 5,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Compare StandardScaler (Z-score), MinMaxScaler ([0, 1]), RobustScaler (IQR), and Normalizer (L2 norm).',
      'Explain why distance-based algorithms (KNN, SVM, K-Means) and gradient descent require feature scaling.',
      'Explain why tree-based models (Decision Trees, Random Forests, XGBoost) are completely scale-invariant.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'gradient-descent-optimization'],
    analogy: {
      title: 'The Salary in Yen vs The Age in Years',
      text: 'Suppose you measure customer age in years (range 20 to 60, spread = 40) and annual income in Japanese Yen (range 3,000,000 to 10,000,000, spread = 7,000,000). If you calculate Euclidean distance between two customers without scaling, the income difference completely dwarfs the age difference by a factor of 175,000! The algorithm will treat age as non-existent noise simply because of the arbitrary unit of measurement.',
      metaphor: 'Feature scaling puts all features onto an equal athletic playing field so units do not dictate importance.',
    },
    problemSolved: {
      title: 'Eliminating Arbitrary Unit Bias in Geometry and Optimization',
      description: 'Features measured in different units (grams vs kilograms, seconds vs years) distort distance calculations, cause gradient descent to oscillate eccentrically, and penalize weights disproportionately in L2 regularization.',
      keyPoints: [
        'Transforms elongated elliptical loss surfaces into circular isotropic bowls.',
        'Prevents dominant large-magnitude features from hijacking distance metrics in KNN and K-Means.',
        'Ensures regularization penalties (lambda * w^2) penalize all features fairly.',
      ],
    },
    intuition: {
      overview: 'Scaling transforms feature coordinates so that each dimension contributes proportionally to geometric distances and gradient updates.',
      steps: [
        { step: 1, title: 'StandardScaler (Z-Score)', description: 'Subtract mean and divide by standard deviation: results in mean=0, std=1.' },
        { step: 2, title: 'MinMaxScaler', description: 'Rescales strictly into [0, 1] bounds using min and max values.' },
        { step: 3, title: 'RobustScaler', description: 'Subtracts median and divides by IQR: robust against extreme outlier contamination.' },
        { step: 4, title: 'Normalizer', description: 'Scales each sample row independently to unit L2 norm: ||x||_2 = 1.0.' },
      ],
    },
    mathematics: {
      overview: 'Analytical transformation equations for foundational scaling methods.',
      foundations: [
        {
          name: 'StandardScaler (Z-Score Standardization)',
          latex: 'z = \\frac{x - \\mu}{\\sigma} \\quad \\implies \\quad \\mathbb{E}[z] = 0, \\; \\text{Var}(z) = 1',
          explanation: 'Preserves zero values only if mean is zero. Suitable for PCA and gradient-based models.',
        },
        {
          name: 'MinMaxScaler (Feature Range Scaling)',
          latex: 'x_{\\text{scaled}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}} \\cdot (\\text{max} - \\text{min}) + \\text{min}',
          explanation: 'Compresses data into bounded range [0, 1]. Highly sensitive to outliers.',
        },
        {
          name: 'RobustScaler (Median / IQR)',
          latex: 'x_{\\text{robust}} = \\frac{x - \\text{median}(x)}{\\text{IQR}(x)} = \\frac{x - Q_2}{Q_3 - Q_1}',
          explanation: 'Centers at median and scales by IQR. Not influenced by extreme outliers.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Loss Contour Transformation under Feature Scaling',
      objective: 'Show how scaling transforms an elongated elliptical loss contour into a symmetric circle.',
      steps: [
        {
          step: 1,
          label: 'Unscaled Quadratic Loss Contour',
          latex: 'L(w_1, w_2) = \\frac{1}{2} (s_1 w_1^2 + s_2 w_2^2) \\quad \\text{with } s_1 \\gg s_2',
          explanation: 'The condition number kappa = s1 / s2 is large, producing an elongated narrow canyon.',
        },
        {
          step: 2,
          label: 'Gradient Component Ratio',
          latex: '\\nabla L = [s_1 w_1, \\; s_2 w_2]^T',
          explanation: 'The gradient along w_1 is s1/s2 times steeper than w_2, causing zig-zag oscillations perpendicular to optimal path.',
        },
        {
          step: 3,
          label: 'Standardize Features to Equal Variance',
          latex: '\\tilde{x}_1 = x_1 / \\sqrt{s_1}, \\quad \\tilde{x}_2 = x_2 / \\sqrt{s_2} \\implies L(\\tilde{w}) = \\frac{1}{2} (\\tilde{w}_1^2 + \\tilde{w}_2^2)',
          explanation: 'The condition number becomes kappa = 1.0 (a perfect circle), enabling gradient descent to point directly at the minimum in one step.',
        },
      ],
    },
    variables: [
      { symbol: '\\mu, \\sigma', name: 'Mean and Standard Deviation', description: 'Moments computed along column feature axes.', dimensions: 'Scalar' },
      { symbol: 'x_{\\min}, x_{\\max}', name: 'Feature Extrema', description: 'Minimum and maximum values across training samples.', dimensions: 'Scalar' },
      { symbol: '\\text{IQR}', name: 'Interquartile Range', description: 'Difference between 75th and 25th percentiles.', dimensions: 'Scalar > 0' },
    ],
    numericalExample: {
      scenario: 'Given feature values X = [10, 20, 30, 40, 50]. Compute StandardScaler, MinMaxScaler, and RobustScaler transformations for value x = 40.',
      dataset: [{ values: '10, 20, 30, 40, 50', target_x: 40 }],
      calculations: [
        { step: 'Basic Statistics', math: '\\mu = 30.0, \\; \\sigma = \\sqrt{200} \\approx 14.142, \\; \\min = 10, \\; \\max = 50, \\; \\text{med} = 30, \\; \\text{IQR} = 40 - 20 = 20', result: 'mu=30, sigma=14.14, min=10, max=50, IQR=20' },
        { step: 'StandardScaler for x=40', math: 'z = (40 - 30) / 14.142 = 10 / 14.142', result: '+0.7071' },
        { step: 'MinMaxScaler for x=40', math: '(40 - 10) / (50 - 10) = 30 / 40', result: '0.7500' },
        { step: 'RobustScaler for x=40', math: '(40 - 30) / 20 = 10 / 20', result: '0.5000' },
      ],
      finalConclusion: 'x = 40 is mapped to z = +0.71 std devs under StandardScaler, 0.75 under MinMaxScaler, and 0.50 under RobustScaler.',
    },
    visualExplanation: {
      title: 'Loss Surfaces: Unscaled Ellipse vs Scaled Circle',
      description: 'Without scaling, gradient descent bounces back and forth across a steep narrow ravine. After standardization, the contours become concentric circles, and the negative gradient vector points directly at the global minimum.',
      features: ['Unscaled: Oscillating zig-zag path', 'Scaled: Direct linear path to minimum', 'Condition number shrinks to 1.0'],
    },
    scratchCode: {
      title: 'StandardScaler and MinMaxScaler in Pure NumPy',
      explanation: 'From-scratch implementations maintaining fit parameters for test inference.',
      code: `import numpy as np

class CustomStandardScaler:
    def fit(self, X: np.ndarray):
        self.mean_ = np.mean(X, axis=0)
        self.std_ = np.std(X, axis=0)
        # Avoid division by zero
        self.std_ = np.where(self.std_ == 0, 1.0, self.std_)
        return self
        
    def transform(self, X: np.ndarray) -> np.ndarray:
        return (X - self.mean_) / self.std_
        
    def fit_transform(self, X: np.ndarray) -> np.ndarray:
        return self.fit(X).transform(X)

X_train = np.array([[10.0], [20.0], [30.0], [40.0], [50.0]])
scaler = CustomStandardScaler()
scaled_train = scaler.fit_transform(X_train)
print("Mean:", scaler.mean_, "Std:", np.round(scaler.std_, 2))
print("Scaled train:\n", np.round(scaled_train, 3))
`,
    },
    sklearnCode: {
      title: 'Scikit-Learn Scalers Comparison',
      explanation: 'Applying StandardScaler, MinMaxScaler, and RobustScaler in scikit-learn.',
      code: `import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

X = np.array([[10.0], [20.0], [30.0], [40.0], [50.0], [1000.0]]) # With outlier 1000

print("StandardScaler:\n", np.round(StandardScaler().fit_transform(X), 2).flatten())
print("MinMaxScaler:\n", np.round(MinMaxScaler().fit_transform(X), 2).flatten())
print("RobustScaler:\n", np.round(RobustScaler().fit_transform(X), 2).flatten())
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

X = np.array([[10.0], [20.0], [30.0], [40.0], [50.0]])

std_s = StandardScaler().fit_transform(X)
minmax_s = MinMaxScaler().fit_transform(X)
robust_s = RobustScaler().fit_transform(X)

print("Original:   ", X.flatten())
print("Standard:   ", np.round(std_s.flatten(), 2))
print("MinMax:     ", np.round(minmax_s.flatten(), 2))
print("Robust:     ", np.round(robust_s.flatten(), 2))
`,
      expectedOutput: `Original:    [10. 20. 30. 40. 50.]\nStandard:    [-1.41 -0.71  0.    0.71  1.41]\nMinMax:      [0.   0.25 0.5  0.75 1.  ]\nRobust:      [-1.  -0.5  0.   0.5  1. ]`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'X = np.array([[10.0], [20.0], [30.0], [40.0], [50.0]])', explanation: 'Creates 5 evenly spaced samples of a 1D feature.' },
      { lines: 'Lines 6-8', codeSnippet: 'std_s = StandardScaler().fit_transform(X)', explanation: 'Transforms data using three distinct scaling methodologies.' },
      { lines: 'Lines 10-13', codeSnippet: 'print(...)', explanation: 'Demonstrates resulting distributions: standard has mean 0 and std 1; MinMax spans [0, 1].' },
    ],
    hyperparameters: [
      { name: 'feature_range', defaultVal: '(0, 1)', range: 'Tuple (min, max)', effect: 'Desired range of transformed data for MinMaxScaler.', recommendation: 'Use (0, 1) for neural networks with Sigmoid/ReLU activations; use (-1, 1) for Tanh.' },
    ],
    assumptions: [
      { assumption: 'Stationary Distribution Parameters', whyItMatters: 'Using training mean and std assumes future test data follows approximately the same distribution.', howToVerify: 'Monitor population stability index (PSI) between train and production feature distributions.' },
    ],
    commonMistakes: [
      { mistake: 'Scaling categorical binary dummy columns (0/1)', solution: 'Do NOT standardize one-hot binary columns! Standardizing them destroys their natural 0/1 indicator interpretability and density.' },
    ],
    realWorldUseCases: [
      { industry: 'Computer Vision & Deep Learning', application: 'Image Pixel Normalization', benefit: 'Dividing 8-bit image pixels [0, 255] by 255.0 rescales them to [0, 1], stabilizing gradient flow in convolutional neural networks.' },
    ],
    practiceQuestions: [
      { id: 'pq-scale-1', question: 'Why are Decision Trees and Random Forests completely unaffected by monotonic feature scaling?', hint: 'Consider how tree split rules work.', answer: 'Decision trees evaluate split criteria of the form "feature_j <= threshold". A monotonic scaling function preserves the exact rank order of all samples. The tree simply rescales its numerical split threshold, producing the identical split and identical predictions.' },
    ],
    quiz: [
      {
        id: 'quiz-scale-1',
        question: 'Which of the following algorithms is COMPLETELY scale-invariant and does NOT require feature scaling?',
        options: ['K-Nearest Neighbors (KNN)', 'Principal Component Analysis (PCA)', 'Random Forest Classifier', 'Support Vector Machines (SVM)'],
        correctIndex: 2,
        explanation: 'Random Forests use axis-aligned decision tree splits that depend only on ordering, making them completely immune to monotonic feature scaling.',
      },
    ],
    independentExercise: {
      title: 'Demonstrate Scale Sensitivity in KNN',
      problem: 'Write a script comparing the accuracy of KNeighborsClassifier on synthetic data with unscaled vs scaled features.',
      hints: ['Create dataset where feature 1 is scaled by 10,000', 'Evaluate KNN accuracy before and after StandardScaler'],
      starterCode: `import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler

X = np.array([[1.0, 100000.0], [1.2, 105000.0], [2.0, 10000.0], [2.1, 12000.0]])
y = np.array([0, 0, 1, 1])

# TODO: fit KNN on X and on StandardScaler().fit_transform(X)
print("Compare predictions!")
`,
      solution: `import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler

X = np.array([[1.0, 100000.0], [1.2, 105000.0], [2.0, 10000.0], [2.1, 12000.0]])
y = np.array([0, 0, 1, 1])

knn_unscaled = KNeighborsClassifier(n_neighbors=1).fit(X, y)
knn_scaled = KNeighborsClassifier(n_neighbors=1).fit(StandardScaler().fit_transform(X), y)

test = np.array([[1.1, 50000.0]])
print("Unscaled prediction:", knn_unscaled.predict(test))
print("Scaled prediction:  ", knn_scaled.predict(StandardScaler().fit(X).transform(test)))
`,
    },
    summary: {
      keyTakeaways: [
        'StandardScaler centers at 0 and rescales to unit variance; MinMaxScaler bounds strictly in [0, 1].',
        'RobustScaler uses the median and IQR, preventing extreme outliers from compressing normal data.',
        'Distance-based and gradient-based algorithms require scaling; tree-based models are scale-invariant.',
      ],
      nextLessonId: 'train-val-test-splitting',
      nextLessonTitle: 'Train, Validation & Test Splitting Strategies',
      nextLessonModuleId: 'module-2',
    },
  },

  'train-val-test-splitting': {
    id: 'train-val-test-splitting',
    moduleId: 'module-2',
    title: 'Train, Validation & Test Splitting Strategies',
    subtitle: 'Stratified Splits, TimeSeriesSplit, GroupKFold & Empirical Risk Protocols',
    order: 6,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Define the distinct roles of training set, validation set, and final test set.',
      'Implement stratified splitting to preserve minority class ratios in classification.',
      'Apply TimeSeriesSplit for temporal data and GroupKFold for grouped patient or customer entities.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'probability-distributions'],
    analogy: {
      title: 'The High School Final Exam Vault',
      text: 'Think of studying for high school physics. 1) Training Set: The textbook homework problems with answers in the back (the student practices and learns parameters). 2) Validation Set: The weekly classroom mock quizzes (the teacher tunes study schedules and hyperparameters). 3) Test Set: The state board final exam locked in a steel vault that NOBODY is allowed to see until graduation day. If the student peeks at the final exam to adjust their study notes, their grade is invalid (data snooping bias)!',
      metaphor: 'Train learns weights; Validation tunes hyperparameters; Test evaluates final unbiased generalization.',
    },
    problemSolved: {
      title: 'Preventing Data Snooping and Overfitting to Evaluation Data',
      description: 'Evaluating an algorithm on the data it trained on yields wildly optimistic, fraudulent accuracy scores (memorization). We need strict separation protocols to estimate true generalization error on unseen reality.',
      keyPoints: [
        'Guarantees unbiased estimates of true out-of-sample risk.',
        'Prevents temporal lookahead bias in financial and forecasting models.',
        'Prevents entity leakage across multiple records from the same user or patient.',
      ],
    },
    intuition: {
      overview: 'Data splitting mimics deployment reality: evaluate how well the model predicts future unseen observations.',
      steps: [
        { step: 1, title: 'Standard i.i.d. Split', description: 'Random 70% train / 15% validation / 15% test split for independent tabular data.' },
        { step: 2, title: 'Stratified Split', description: 'Forces identical class label proportions across train, val, and test splits for imbalanced classes.' },
        { step: 3, title: 'GroupKFold', description: 'Ensures that all observations from a specific subject or patient stay within the SAME fold.' },
        { step: 4, title: 'TimeSeriesSplit', description: 'Enforces expanding historical windows where the future is NEVER used to predict the past.' },
      ],
    },
    mathematics: {
      overview: 'Statistical learning theory establishes that empirical test risk converges to true risk bounded by sample size.',
      foundations: [
        {
          name: 'Empirical Risk on Test Set',
          latex: 'R_{\\text{test}}(f) = \\frac{1}{N_{\\text{test}}} \\sum_{i \\in \\mathcal{D}_{\\text{test}}} \\mathcal{L}(f(\\mathbf{x}_i), y_i)',
          explanation: 'Unbiased estimator of true expected risk R(f) = E_{(x, y)} [L(f(x), y)].',
        },
        {
          name: 'Generalization Bound (Hoeffding)',
          latex: 'P(|R_{\\text{test}}(f) - R(f)| > \\epsilon) \\le 2 \\exp(-2 N_{\\text{test}} \\epsilon^2)',
          explanation: 'The probability of test evaluation error exceeding epsilon decays exponentially with test set size.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Stratified Class Proportions',
      objective: 'Show how stratified sampling prevents class collapse in rare event modeling.',
      steps: [
        {
          step: 1,
          label: 'Class Ratio Definition',
          latex: 'p_k = \\frac{N_k}{N} \\quad \\text{where } N_k = \\sum_{i=1}^N \\mathbb{I}(y_i = k)',
          explanation: 'Define empirical class proportion in the total dataset.',
        },
        {
          step: 2,
          label: 'Stratified Subsample Allocation',
          latex: 'N_{k, \\text{train}} = \\lfloor p_k \\cdot N_{\\text{train}} \\rceil, \\quad N_{k, \\text{test}} = \\lfloor p_k \\cdot N_{\\text{test}} \\rceil',
          explanation: 'Allocate exact fractional sample counts to each partition independently.',
        },
        {
          step: 3,
          label: 'Variance Reduction in Test Estimates',
          latex: '\\text{Var}_{\\text{stratified}}(\\hat{p}_k) = 0 \\quad \\text{vs} \\quad \\text{Var}_{\\text{random}}(\\hat{p}_k) = \\frac{p_k (1 - p_k)}{N_{\\text{test}}}',
          explanation: 'Stratification eliminates binomial sampling variance in class proportions across folds.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathcal{D}_{\\text{train}}', name: 'Training Set', description: 'Data used to optimize internal model parameters (weights).', dimensions: '70-80% of data' },
      { symbol: '\\mathcal{D}_{\\text{val}}', name: 'Validation Set', description: 'Data used to select models and tune hyperparameters.', dimensions: '10-15% of data' },
      { symbol: '\\mathcal{D}_{\\text{test}}', name: 'Test Set', description: 'Held-out data evaluated only once for final benchmark reporting.', dimensions: '10-20% of data' },
    ],
    numericalExample: {
      scenario: 'Given an imbalanced fraud dataset of 1,000 samples with 50 fraud cases (5%) and 950 legitimate cases (95%). Perform an 80/20 stratified split.',
      dataset: [{ total: 1000, fraud: 50, legitimate: 950 }],
      calculations: [
        { step: 'Training Size (80%)', math: '0.80 \\cdot 1,000', result: '800 samples' },
        { step: 'Test Size (20%)', math: '0.20 \\cdot 1,000', result: '200 samples' },
        { step: 'Training Fraud Count (5%)', math: '0.05 \\cdot 800', result: '40 fraud samples' },
        { step: 'Training Legitimate Count (95%)', math: '0.95 \\cdot 800', result: '760 legitimate samples' },
        { step: 'Test Fraud Count (5%)', math: '0.05 \\cdot 200', result: '10 fraud samples' },
        { step: 'Test Legitimate Count (95%)', math: '0.95 \\cdot 200', result: '190 legitimate samples' },
      ],
      finalConclusion: 'Stratified sampling guarantees that both training (40/800 = 5%) and test (10/200 = 5%) maintain the exact 5% fraud base rate.',
    },
    visualExplanation: {
      title: 'TimeSeriesSplit vs Random Split',
      description: 'Random splitting on temporal data leaks future information into past predictions (cheating with a crystal ball). TimeSeriesSplit uses an expanding historical window: Train on Fold 1 -> Test on Fold 2; Train on Folds 1+2 -> Test on Fold 3.',
      features: ['Random Split: Temporal Leakage (Catastrophic)', 'TimeSeriesSplit: Strictly forward-chaining evaluation'],
    },
    scratchCode: {
      title: 'Stratified Train-Test Split in Pure Python',
      explanation: 'Partition indices per class to guarantee exact target representation.',
      code: `import numpy as np

def stratified_train_test_split(X: np.ndarray, y: np.ndarray, test_size: float = 0.2, random_state: int = 42):
    np.random.seed(random_state)
    train_indices = []
    test_indices = []
    
    unique_classes = np.unique(y)
    for c in unique_classes:
        class_idx = np.where(y == c)[0]
        np.random.shuffle(class_idx)
        
        n_test = int(np.round(len(class_idx) * test_size))
        test_indices.extend(class_idx[:n_test])
        train_indices.extend(class_idx[n_test:])
        
    return X[train_indices], X[test_indices], y[train_indices], y[test_indices]

X = np.arange(20).reshape(-1, 1)
y = np.array([0]*16 + [1]*4) # 20% minority class 1
X_tr, X_te, y_tr, y_te = stratified_train_test_split(X, y, test_size=0.25)

print(f"Train Class 1 proportion: {np.mean(y_tr == 1) * 100:.1f}%")
print(f"Test Class 1 proportion:  {np.mean(y_te == 1) * 100:.1f}%")
`,
    },
    sklearnCode: {
      title: 'Advanced Splitting with Scikit-Learn',
      explanation: 'Demonstrating StratifiedKFold, TimeSeriesSplit, and GroupKFold.',
      code: `import numpy as np
from sklearn.model_selection import StratifiedKFold, TimeSeriesSplit, GroupKFold

X = np.random.randn(6, 2)
y = np.array([0, 0, 0, 1, 1, 1])
groups = np.array([1, 1, 2, 2, 3, 3]) # Patients 1, 2, 3

# GroupKFold: ensures same patient never appears in both train and test
gkf = GroupKFold(n_splits=3)
for fold, (train_idx, test_idx) in enumerate(gkf.split(X, y, groups)):
    print(f"Fold {fold}: Train Patients {groups[train_idx]}, Test Patients {groups[test_idx]}")
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.model_selection import train_test_split

X = np.arange(20).reshape(-1, 1)
y = np.array([0]*16 + [1]*4) # 20% class 1

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)

print(f"Total samples: {len(y)}, Class 1 count: {np.sum(y == 1)}")
print(f"Train count:   {len(y_tr)}, Class 1: {np.sum(y_tr == 1)} ({np.mean(y_tr)*100:.1f}%)")
print(f"Test count:    {len(y_te)}, Class 1: {np.sum(y_te == 1)} ({np.mean(y_te)*100:.1f}%)")
`,
      expectedOutput: `Total samples: 20, Class 1 count: 4\nTrain count:   15, Class 1: 3 (20.0%)\nTest count:    5, Class 1: 1 (20.0%)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 5', codeSnippet: 'y = np.array([0]*16 + [1]*4)', explanation: 'Creates imbalanced binary target with 4 positive samples.' },
      { lines: 'Line 7', codeSnippet: 'stratify=y', explanation: 'Directs scikit-learn to preserve exact 20% positive ratio in both partitions.' },
      { lines: 'Lines 9-11', codeSnippet: 'print(...)', explanation: 'Demonstrates exact 20.0% positive class preservation.' },
    ],
    hyperparameters: [
      { name: 'test_size', defaultVal: '0.2', range: '[0.1, 0.3]', effect: 'Fraction of total dataset allocated to testing.', recommendation: 'Use 0.2 (20%) for datasets with 1k - 100k samples; 0.05 (5%) is sufficient for millions of samples.' },
    ],
    assumptions: [
      { assumption: 'Independent and Identically Distributed (i.i.d.)', whyItMatters: 'Random splitting assumes samples are independent; if grouped or temporal, random splitting leaks data and invalidates test scores.', howToVerify: 'Verify absence of temporal ordering or repeated subject identifiers.' },
    ],
    commonMistakes: [
      { mistake: 'Using standard random train_test_split on financial stock prices or time series', solution: 'Random split leaks tomorrow\'s stock prices into yesterday\'s training data. Always use TimeSeriesSplit!' },
    ],
    realWorldUseCases: [
      { industry: 'Medical Imaging Diagnostics', application: 'Chest X-Ray Pneumonia Detection', benefit: 'GroupKFold groups X-rays by patient ID so images from the same patient never appear in both training and test sets.' },
    ],
    practiceQuestions: [
      { id: 'pq-split-1', question: 'Why is GroupKFold critical when a single patient has multiple medical scan images in the dataset?', hint: 'What happens if patient A has 5 scans and appears in both train and test?', answer: 'Without GroupKFold, the model learns the patient\'s unique anatomical quirks (memorization) rather than disease pathology, achieving artificially high test scores that collapse on new patients.' },
    ],
    quiz: [
      {
        id: 'quiz-split-1',
        question: 'When building a machine learning model to predict next week\'s retail sales, which splitting strategy MUST be used?',
        options: [
          'Random train_test_split',
          'StratifiedKFold',
          'TimeSeriesSplit (forward-chaining temporal split)',
          'Leave-One-Out Cross-Validation',
        ],
        correctIndex: 2,
        explanation: 'Time series forecasting requires chronological forward-chaining splits (TimeSeriesSplit) to prevent lookahead bias and simulate real future forecasting.',
      },
    ],
    independentExercise: {
      title: 'Implement 3-Way Train / Validation / Test Split',
      problem: 'Write a function train_val_test_split(X, y, train_ratio=0.7, val_ratio=0.15, test_ratio=0.15) that returns 6 arrays maintaining stratification.',
      hints: ['First split off test set: test_size = test_ratio', 'Second split remaining data into train and val'],
      starterCode: `import numpy as np
from sklearn.model_selection import train_test_split

def train_val_test_split(X, y, train_r=0.7, val_r=0.15, test_r=0.15, random_state=42):
    # TODO: return X_train, X_val, X_test, y_train, y_val, y_test
    return X, X, X, y, y, y

X = np.arange(100).reshape(-1, 1)
y = np.array([0]*80 + [1]*20)
X_tr, X_v, X_te, y_tr, y_v, y_te = train_val_test_split(X, y)
print(f"Sizes: Train={len(y_tr)}, Val={len(y_v)}, Test={len(y_te)}")
`,
      solution: `import numpy as np
from sklearn.model_selection import train_test_split

def train_val_test_split(X, y, train_r=0.7, val_r=0.15, test_r=0.15, random_state=42):
    # Step 1: Split off test set
    X_temp, X_test, y_temp, y_test = train_test_split(
        X, y, test_size=test_r, stratify=y, random_state=random_state
    )
    # Step 2: Split remaining temp data into train and val
    val_rel_size = val_r / (train_r + val_r)
    X_train, X_val, y_train, y_val = train_test_split(
        X_temp, y_temp, test_size=val_rel_size, stratify=y_temp, random_state=random_state
    )
    return X_train, X_val, X_test, y_train, y_val, y_test

X = np.arange(100).reshape(-1, 1)
y = np.array([0]*80 + [1]*20)
X_tr, X_v, X_te, y_tr, y_v, y_te = train_val_test_split(X, y)
print(f"Sizes: Train={len(y_tr)}, Val={len(y_v)}, Test={len(y_te)}")
print(f"Minority counts: Train={sum(y_tr)}, Val={sum(y_v)}, Test={sum(y_te)}")
`,
    },
    summary: {
      keyTakeaways: [
        'Training sets fit parameters; validation sets tune hyperparameters; test sets provide the final unbiased score.',
        'Stratified splits preserve class ratios across partitions, preventing minority class starvation.',
        'Temporal data requires TimeSeriesSplit; grouped patient/user data requires GroupKFold to prevent leakage.',
      ],
      nextLessonId: 'data-leakage-prevention',
      nextLessonTitle: 'Data Leakage: Types, Detection & Prevention',
      nextLessonModuleId: 'module-2',
    },
  },

  'data-leakage-prevention': {
    id: 'data-leakage-prevention',
    moduleId: 'module-2',
    title: 'Data Leakage: Types, Detection & Prevention',
    subtitle: 'Target Leakage, Preprocessing Contamination & Temporal Lookahead Bias',
    order: 7,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Define target leakage and recognize subtle reverse-causal features.',
      'Explain how fitting scalers, encoders, or imputers before train/test splitting contaminates test data.',
      'Construct leak-free Scikit-learn Pipeline workflows that isolate all transformations inside cross-validation folds.',
    ],
    prerequisites: ['train-val-test-splitting', 'feature-scaling-normalization'],
    analogy: {
      title: 'The Exam Answer Key Taped Under the Desk',
      text: 'A student takes a test and scores 99.8%. The teacher is thrilled until they discover the student had the answer key taped under their desk during the exam! That is data leakage: information from the future target variable or the test set sneaks into the model during training. The model looks like a super-genius in cross-validation, but the moment it is deployed to production without the answer key, its accuracy crashes to zero.',
      metaphor: 'Data leakage is an accidental answer key: phenomenal in testing, catastrophic in production.',
    },
    problemSolved: {
      title: 'Preventing False-Hope Machine Learning Deployments',
      description: 'Data leakage is the #1 silent killer in production ML. It produces deceptively perfect validation metrics that evaporate entirely when the model encounters real unseen customers.',
      keyPoints: [
        'Identifies features that are created AFTER the target event occurs (e.g. "Hospital Discharge Date" predicting "Pneumonia Diagnosis").',
        'Prevents test set statistics from bleeding into training fold scalers.',
        'Enforces strict pipeline encapsulation.',
      ],
    },
    intuition: {
      overview: 'Every data transformation (imputation, scaling, encoding, feature selection) must learn its parameters STRICTLY on the training partition and only apply those fixed parameters to validation/test partitions.',
      steps: [
        { step: 1, title: 'Target Leakage Check', description: 'Ask: "Will this feature be physically available at the exact millisecond when inference is requested in production?"' },
        { step: 2, title: 'Preprocessing Isolation', description: 'Never call fit_transform() on the entire dataset. Always call fit() strictly on X_train.' },
        { step: 3, title: 'Pipeline Architecture', description: 'Wrap preprocessing and estimators inside a Pipeline to ensure cross-validation folds remain strictly isolated.' },
      ],
    },
    mathematics: {
      overview: 'Data leakage violates the empirical risk minimization assumption that test data is strictly out-of-sample.',
      foundations: [
        {
          name: 'The Leakage Condition',
          latex: 'P(\\mathcal{D}_{\\text{test}} | \\mathcal{T}(\\mathcal{D}_{\\text{train}})) \\neq P(\\mathcal{D}_{\\text{test}}) \\implies \\mathbb{E}[\\hat{R}_{\\text{test}}] < R(f)',
          explanation: 'When transformation T uses test data, test risk systematically underestimates true generalization risk.',
        },
        {
          name: 'Valid Estimator Pipeline Form',
          latex: '\\hat{y} = f\\left( T_{\\text{train}}(x_{\\text{test}}) ; \\theta_{\\text{train}} \\right)',
          explanation: 'Transformation T_train uses parameters (mean, min, max, categories) derived solely from training folds.',
        },
      ],
    },
    derivation: {
      title: 'Mathematical Proof of Variance Underestimation via Global Scaling',
      objective: 'Demonstrate how computing global mean on X = [X_train, X_test] introduces cross-sample correlation.',
      steps: [
        {
          step: 1,
          label: 'Global Mean Formula',
          latex: '\\mu_{\\text{global}} = \\frac{N_{\\text{tr}} \\mu_{\\text{tr}} + N_{\\text{te}} \\mu_{\\text{te}}}{N_{\\text{tr}} + N_{\\text{te}}}',
          explanation: 'Global mean is an explicit weighted average containing test data.',
        },
        {
          step: 2,
          label: 'Scaled Training Feature Expression',
          latex: '\\tilde{x}_{i, \\text{tr}} = x_{i, \\text{tr}} - \\mu_{\\text{global}} = x_{i, \\text{tr}} - \\frac{N_{\\text{tr}} \\mu_{\\text{tr}} + N_{\\text{te}} \\mu_{\\text{te}}}{N}',
          explanation: 'Every training sample now mathematically contains a fraction of the test set mean mu_te.',
        },
        {
          step: 3,
          label: 'Non-Zero Covariance with Test Set',
          latex: '\\text{Cov}(\\tilde{x}_{i, \\text{tr}}, \\; x_{j, \\text{te}}) = -\\frac{N_{\\text{te}}}{N} \\text{Var}(x_{\\text{te}}) \\neq 0',
          explanation: 'Training samples and test samples are no longer independent, violating i.i.d. assumptions.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathcal{T}', name: 'Preprocessing Transformation', description: 'Function mapping raw inputs to standardized features.', dimensions: 'R^d -> R^k' },
      { symbol: '\\theta_{\\text{train}}', name: 'Transformation Parameters', description: 'Means, standard deviations, and encoder mappings learned strictly on train set.', dimensions: 'Parameter set' },
    ],
    numericalExample: {
      scenario: 'Demonstrate leakage with a 2-sample training set [10, 20] and a 2-sample test set [50, 60]. Compare leaked global mean with correct train-only mean.',
      dataset: [{ train: '10, 20', test: '50, 60' }],
      calculations: [
        { step: 'Correct Train-Only Mean', math: '\\mu_{\\text{tr}} = (10 + 20) / 2', result: '15.00' },
        { step: 'Leaked Global Mean', math: '\\mu_{\\text{global}} = (10 + 20 + 50 + 60) / 4 = 140 / 4', result: '35.00' },
        { step: 'Correct Scaled Train Sample 1', math: '10 - \\mu_{\\text{tr}} = 10 - 15', result: '-5.00' },
        { step: 'Leaked Scaled Train Sample 1', math: '10 - \\mu_{\\text{global}} = 10 - 35', result: '-25.00' },
      ],
      finalConclusion: 'The leaked scaled value (-25) is shifted five times further because test data (50, 60) pulled the mean upward, contaminating the training coordinates.',
    },
    visualExplanation: {
      title: 'Leakage Architecture: Wrong vs Right Pipeline',
      description: 'WRONG: Raw Data -> Impute/Scale All Data -> Split Train/Test. (Test statistics leak into training!). RIGHT: Raw Data -> Split Train/Test -> Fit Scaler on Train Only -> Transform Test with Train Scaler.',
      features: ['Wrong: Shared global statistics (leakage)', 'Right: Hermetically sealed training boundary'],
    },
    scratchCode: {
      title: 'Simulating Leakage vs Valid Cross-Validation in Python',
      explanation: 'Demonstrate how feature selection before CV creates falsely inflated accuracy on random noise.',
      code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.model_selection import cross_val_score

# Pure random noise with NO real relationship to y
np.random.seed(42)
X = np.random.randn(100, 1000) # 1000 noise features
y = np.random.binomial(1, 0.5, 100) # Random coin flip targets

# WRONG: Feature selection BEFORE cross-validation (LEAKAGE)
selector = SelectKBest(f_classif, k=10)
X_leaked = selector.fit_transform(X, y)
leaked_score = np.mean(cross_val_score(LogisticRegression(), X_leaked, y, cv=5))

print(f"Leaked CV Score on Pure Noise: {leaked_score * 100:.1f}% (Fraudulent accuracy!)")
print("Expected true score is 50.0% (random chance).")
`,
    },
    sklearnCode: {
      title: 'Hermetically Sealed Pipeline to Prevent Leakage',
      explanation: 'Using scikit-learn make_pipeline ensures feature selection happens strictly inside each CV fold.',
      code: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

np.random.seed(42)
X = np.random.randn(100, 1000)
y = np.random.binomial(1, 0.5, 100)

# CORRECT: Wrap selector and model inside a Pipeline
pipeline = make_pipeline(SelectKBest(f_classif, k=10), LogisticRegression())
honest_score = np.mean(cross_val_score(pipeline, X, y, cv=5))

print(f"Honest Pipeline CV Score: {honest_score * 100:.1f}% (Correctly reflects random chance ~50%)")
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

np.random.seed(42)
X_noise = np.random.randn(100, 500)
y_random = np.random.binomial(1, 0.5, 100)

# 1. Leaked
X_leaked = SelectKBest(f_classif, k=5).fit_transform(X_noise, y_random)
leaked_acc = np.mean(cross_val_score(LogisticRegression(), X_leaked, y_random, cv=3))

# 2. Honest Pipeline
pipe = make_pipeline(SelectKBest(f_classif, k=5), LogisticRegression())
honest_acc = np.mean(cross_val_score(pipe, X_noise, y_random, cv=3))

print(f"Leaked Score on Noise: {leaked_acc*100:.1f}% (Illusion of predictive power)")
print(f"Honest Pipeline Score: {honest_acc*100:.1f}% (Reality: random guessing)")
`,
      expectedOutput: `Leaked Score on Noise: 75.0% (Illusion of predictive power)\nHonest Pipeline Score: 48.0% (Reality: random guessing)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 8', codeSnippet: 'X_noise = np.random.randn(100, 500); y_random = ...', explanation: 'Creates 100% pure random Gaussian noise with zero predictive signal.' },
      { lines: 'Line 12', codeSnippet: 'SelectKBest(...).fit_transform(X_noise, y_random)', explanation: 'Selects the top 5 noise features that happen by chance to correlate with y across the entire dataset.' },
      { lines: 'Line 16', codeSnippet: 'pipe = make_pipeline(SelectKBest(...), LogisticRegression())', explanation: 'Ensures feature selection is re-run strictly on training folds inside cross-validation, revealing true ~50% random chance.' },
    ],
    hyperparameters: [
      { name: 'pipeline_wrapper', defaultVal: 'Pipeline', range: '["Pipeline", "make_pipeline"]', effect: 'Wraps preprocessors and estimators into an atomic unit.', recommendation: 'Always wrap multi-stage transformations in Pipeline before passing to cross_val_score.' },
    ],
    assumptions: [
      { assumption: 'Strict Temporal Causality', whyItMatters: 'Predictor features must chronologically precede the target event in the real-world operational workflow.', howToVerify: 'Audit data dictionary timestamps for each feature relative to target creation time.' },
    ],
    commonMistakes: [
      { mistake: 'Performing feature selection or SMOTE before cross-validation splitting', solution: 'Never run SMOTE or SelectKBest on the whole dataset! Put them inside imblearn or scikit-learn Pipelines.' },
    ],
    realWorldUseCases: [
      { industry: 'Hospital Care & Patient Readmission', application: 'Preventing Clinical Target Leakage', benefit: 'Excluding "Follow-up Appointment Scheduled" from the feature set, because that appointment is scheduled only after a doctor has already decided to readmit the patient.' },
    ],
    practiceQuestions: [
      { id: 'pq-leak-1', question: 'A student achieves 99.9% validation accuracy predicting credit card churn using the feature "Account Closing Date". Why is this target leakage?', hint: 'When does the account closing date become known in real life?', answer: 'The "Account Closing Date" only exists AFTER a customer has already churned. At prediction time on active customers who might churn next month, this feature does not exist. It is a direct proxy for the target event.' },
    ],
    quiz: [
      {
        id: 'quiz-leak-1',
        question: 'Which of the following practices is guaranteed to prevent preprocessing data leakage during cross-validation?',
        options: [
          'Normalizing the whole dataset before splitting so all folds have identical scale.',
          'Using a Scikit-learn Pipeline so that all transformations fit strictly on training folds.',
          'Selecting top features on the entire dataset to reduce computation time.',
          'Imputing missing values using the global median of all rows.',
        ],
        correctIndex: 1,
        explanation: 'Wrapping scalers, imputers, and estimators in a Pipeline ensures that fit() is executed strictly on the training fold during each cross-validation iteration, preventing test leakage.',
      },
    ],
    independentExercise: {
      title: 'Build a Leak-Free Pipeline with StandardScaler and Ridge',
      problem: 'Write a function evaluate_leak_free_pipeline(X, y) that creates a pipeline with StandardScaler and Ridge regression and evaluates it using 5-fold cross-validation.',
      hints: ['from sklearn.pipeline import make_pipeline', 'Use cross_val_score with scoring="r2"'],
      starterCode: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

def evaluate_leak_free(X: np.ndarray, y: np.ndarray) -> float:
    # TODO: return mean 5-fold CV R^2 score
    return 0.0

X = np.random.randn(50, 4)
y = X @ np.array([2, -1, 3, 0.5]) + np.random.randn(50) * 0.1
print("Mean R^2 score:", evaluate_leak_free(X, y))
`,
      solution: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

def evaluate_leak_free(X: np.ndarray, y: np.ndarray) -> float:
    pipe = make_pipeline(StandardScaler(), Ridge(alpha=1.0))
    scores = cross_val_score(pipe, X, y, cv=5, scoring='r2')
    return round(float(np.mean(scores)), 4)

X = np.random.randn(50, 4)
y = X @ np.array([2, -1, 3, 0.5]) + np.random.randn(50) * 0.1
print("Mean R^2 score:", evaluate_leak_free(X, y))
`,
    },
    summary: {
      keyTakeaways: [
        'Data leakage produces falsely inflated validation metrics that collapse in production.',
        'Target leakage occurs when future or reverse-causal information is included as a feature.',
        'Always encapsulate all preprocessing inside Scikit-learn Pipelines to guarantee fold isolation.',
      ],
      nextLessonId: 'feature-selection-extraction',
      nextLessonTitle: 'Feature Selection & Extraction Methods',
      nextLessonModuleId: 'module-2',
    },
  },

  'feature-selection-extraction': {
    id: 'feature-selection-extraction',
    moduleId: 'module-2',
    title: 'Feature Selection & Extraction Methods',
    subtitle: 'Filter Methods, Wrapper RFE, Embedded Lasso & Mutual Information',
    order: 8,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Categorize feature selection methods: Filter (fast, univariate), Wrapper (greedy search), and Embedded (model-integrated).',
      'Compute Mutual Information and explain how it captures nonlinear relationships where Pearson correlation fails.',
      'Implement Recursive Feature Elimination (RFE) and L1 Lasso sparsity feature selection.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'entropy-cross-entropy-kl-divergence'],
    analogy: {
      title: 'Packing a Backpack for Mount Everest',
      text: 'You are packing for an arduous mountain trek. You can only carry 15 kg. 1) Filter Method: You weigh each item individually and toss out anything useless like a heavy bowling ball (fast, evaluates items in isolation). 2) Wrapper Method: You try packing different combinations of tent, stove, and boots, testing how comfortable the pack feels on your back (accurate, but exhausting to test all combinations). 3) Embedded Method: You buy a specialized lightweight jacket with built-in compass and pockets (the jacket optimizes its own components automatically during design).',
      metaphor: 'Feature selection discards redundant noise to improve speed, interpretability, and generalization.',
    },
    problemSolved: {
      title: 'Combating the Curse of Dimensionality and Overfitting',
      description: 'Collecting hundreds of features increases model complexity, slows training, and causes models to memorize noise. Feature selection isolates the most informative subset of predictors.',
      keyPoints: [
        'Removes zero-variance and redundant collinear features.',
        'Accelerates model inference latency in production microservices.',
        'Improves model interpretability for business stakeholders and regulators.',
      ],
    },
    intuition: {
      overview: 'Filter methods rank features by statistical scores; Wrapper methods test subsets using model performance; Embedded methods perform selection during regularized training.',
      steps: [
        { step: 1, title: 'Variance Threshold', description: 'Drop constant or quasi-constant features with variance near 0.' },
        { step: 2, title: 'Univariate Statistical Tests', description: 'Score features against target using ANOVA F-value or Mutual Information.' },
        { step: 3, title: 'Recursive Elimination (RFE)', description: 'Iteratively train model, prune lowest-weight feature, and repeat until target count is reached.' },
      ],
    },
    mathematics: {
      overview: 'Information-theoretic and statistical metrics evaluate dependency between features and targets.',
      foundations: [
        {
          name: 'Mutual Information for Feature Selection',
          latex: 'I(X_j; Y) = \\iint p(x_j, y) \\log \\left( \\frac{p(x_j, y)}{p(x_j) p(y)} \\right) dx_j dy = H(Y) - H(Y | X_j)',
          explanation: 'Measures reduction in target uncertainty given feature X_j. Captures any nonlinear relationship; 0 iff X_j and Y are independent.',
        },
        {
          name: 'ANOVA F-Score for Classification',
          latex: 'F = \\frac{\\text{Between-Group Variance}}{\\text{Within-Group Variance}} = \\frac{\\text{MSB}}{\\text{MSW}}',
          explanation: 'Tests whether feature means differ significantly across class target labels.',
        },
      ],
    },
    derivation: {
      title: 'Equivalence of Mutual Information to Zero for Independent Variables',
      objective: 'Prove that I(X; Y) = 0 if and only if X and Y are statistically independent.',
      steps: [
        {
          step: 1,
          label: 'Definition of Statistical Independence',
          latex: 'p(x, y) = p(x) p(y) \\quad \\forall x, y',
          explanation: 'Independence means joint density factorizes into marginal product.',
        },
        {
          step: 2,
          label: 'Substitute into Mutual Information Formula',
          latex: 'I(X; Y) = \\iint p(x, y) \\log \\left( \\frac{p(x) p(y)}{p(x) p(y)} \\right) dx dy',
          explanation: 'Ratio inside log becomes exactly 1.',
        },
        {
          step: 3,
          label: 'Evaluate the Logarithm of 1',
          latex: '\\log(1) = 0 \\implies I(X; Y) = \\iint p(x, y) \\cdot 0 \\; dx dy = 0',
          explanation: 'Proves Mutual Information is strictly 0 for independent features, making it a robust filter criterion.',
        },
      ],
    },
    variables: [
      { symbol: 'I(X_j; Y)', name: 'Mutual Information', description: 'Non-negative dependency metric in nats or bits.', dimensions: 'Scalar ≥ 0' },
      { symbol: 'F', name: 'ANOVA F-statistic', description: 'Ratio of explained variance to unexplained variance.', dimensions: 'Scalar ≥ 0' },
      { symbol: 'k', name: 'Number of Features Kept', description: 'Target dimensionality after selection.', dimensions: 'Integer 1 <= k <= d' },
    ],
    numericalExample: {
      scenario: 'Evaluate Mutual Information vs Pearson correlation for non-linear quadratic relationship: X = [-2, -1, 0, 1, 2] and Y = X^2 = [4, 1, 0, 1, 4].',
      dataset: [{ x: -2, y: 4 }, { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 }],
      calculations: [
        { step: 'Means of X and Y', math: '\\mu_X = 0.0, \\; \\mu_Y = (4+1+0+1+4)/5 = 10/5 = 2.0', result: 'mu_X = 0, mu_Y = 2' },
        { step: 'Covariance Cov(X, Y)', math: '((-2)(2) + (-1)(-1) + (0)(-2) + (1)(-1) + (2)(2)) / 5 = (-4 + 1 + 0 - 1 + 4) / 5 = 0.0', result: 'Cov(X, Y) = 0.0' },
        { step: 'Pearson Correlation r', math: 'r = 0.0 / (\\sigma_X \\sigma_Y)', result: 'r = 0.00 (Fails completely!)' },
        { step: 'Conditional Uncertainty H(Y|X)', math: 'Knowing X determines Y with 100% certainty: H(Y|X) = 0', result: 'H(Y|X) = 0' },
        { step: 'Mutual Information I(X; Y)', math: 'I(X; Y) = H(Y) - H(Y|X) = H(Y) - 0 = H(Y) > 0', result: 'High (> 0)' },
      ],
      finalConclusion: 'Pearson correlation reports r = 0.0 (completely missing the relationship), while Mutual Information correctly detects the perfect deterministic relationship.',
    },
    visualExplanation: {
      title: 'Linear Correlation vs Mutual Information on Non-Linear Patterns',
      description: 'Pearson correlation only detects straight lines. For circles, sinusoids, and U-shaped parabolas, correlation is 0. Mutual Information accurately detects all nonlinear associations.',
      features: ['Pearson r: Only straight diagonal lines', 'Mutual Information: Detects parabolas, circles, and clusters'],
    },
    scratchCode: {
      title: 'VarianceThreshold Filter in Pure NumPy',
      explanation: 'Filter out constant and low-variance features automatically.',
      code: `import numpy as np

def variance_threshold_filter(X: np.ndarray, threshold: float = 0.01):
    """Drops features with variance below threshold."""
    variances = np.var(X, axis=0)
    retained_mask = variances > threshold
    return X[:, retained_mask], retained_mask, np.round(variances, 4)

# 4 features: col 0 is constant, col 1 is low variance, cols 2-3 are informative
X_sample = np.array([
    [1.0, 0.01, 15.0, 200.0],
    [1.0, 0.02, 25.0, 500.0],
    [1.0, 0.01, 35.0, 100.0],
    [1.0, 0.01, 45.0, 400.0]
])

X_filtered, mask, vars = variance_threshold_filter(X_sample, threshold=0.001)
print("Variances:", vars)
print("Retained mask:", mask)
print("Filtered shape:", X_filtered.shape)
`,
    },
    sklearnCode: {
      title: 'SelectKBest & RFE in Scikit-Learn',
      explanation: 'Combining mutual_info_classif and Recursive Feature Elimination.',
      code: `import numpy as np
from sklearn.feature_selection import SelectKBest, mutual_info_classif, RFE
from sklearn.linear_model import LogisticRegression

X = np.random.randn(50, 6)
y = np.array([0]*25 + [1]*25)

# 1. Filter: Mutual Information
selector = SelectKBest(mutual_info_classif, k=3)
X_mi = selector.fit_transform(X, y)

# 2. Wrapper: Recursive Feature Elimination
rfe = RFE(estimator=LogisticRegression(), n_features_to_select=3)
X_rfe = rfe.fit_transform(X, y)

print("MI Selected Feature Mask: ", selector.get_support())
print("RFE Selected Feature Mask:", rfe.support_)
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.feature_selection import mutual_info_regression

# U-shaped relationship: y = x^2
x = np.linspace(-3, 3, 100).reshape(-1, 1)
y = (x.flatten() ** 2)

corr = np.corrcoef(x.flatten(), y)[0, 1]
mi = mutual_info_regression(x, y, random_state=42)[0]

print(f"Nonlinear Data: y = x^2")
print(f"Pearson Correlation r: {corr:.4f} (Blind to parabola!)")
print(f"Mutual Information:   {mi:.4f} (Strongly detects relationship)")
`,
      expectedOutput: `Nonlinear Data: y = x^2\nPearson Correlation r: -0.0000 (Blind to parabola!)\nMutual Information:   0.8872 (Strongly detects relationship)`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'x = np.linspace(-3, 3, 100); y = x**2', explanation: 'Generates a symmetric parabolic dataset where linear correlation is mathematically zero.' },
      { lines: 'Line 7', codeSnippet: 'corr = np.corrcoef(x.flatten(), y)[0, 1]', explanation: 'Computes Pearson r, yielding 0.0000.' },
      { lines: 'Line 8', codeSnippet: 'mi = mutual_info_regression(...)', explanation: 'Computes non-parametric k-nearest neighbors mutual information, correctly detecting strong dependency.' },
    ],
    hyperparameters: [
      { name: 'n_features_to_select', defaultVal: '10', range: '[1, total_features]', effect: 'Number of features retained by RFE.', recommendation: 'Use RFECV to select the optimal number of features via cross-validation automatically.' },
    ],
    assumptions: [
      { assumption: 'Feature Subset Stability', whyItMatters: 'Wrapper methods can overfit on small sample sizes by memorizing random subsets that perform well on one specific split.', howToVerify: 'Verify feature selection stability across multiple random bootstrap resamples.' },
    ],
    commonMistakes: [
      { mistake: 'Discarding features purely because Pearson correlation with the target is low', solution: 'A feature might have zero linear correlation on its own, but powerful predictive interactions when combined with another feature (e.g. XOR logic).' },
    ],
    realWorldUseCases: [
      { industry: 'Genomics & Bioinformatics', application: 'Gene Expression Microarrays', benefit: 'Microarrays have 20,000 gene features for only 100 patients. Feature selection reduces genes to the top 50 biomarkers responsible for disease prognosis.' },
    ],
    practiceQuestions: [
      { id: 'pq-fs-1', question: 'What is the main computational disadvantage of Wrapper methods like RFE compared to Filter methods?', hint: 'How many times must a model be trained in RFE?', answer: 'Wrapper methods require training the machine learning model hundreds or thousands of times across nested subset candidates, making them computationally prohibitive for large datasets or slow models like Deep Neural Networks.' },
    ],
    quiz: [
      {
        id: 'quiz-fs-1',
        question: 'Which feature selection method evaluates individual features using statistical dependency metrics WITHOUT training any machine learning model?',
        options: ['Wrapper methods (e.g. RFE)', 'Filter methods (e.g. Mutual Information, ANOVA)', 'Embedded methods (e.g. Lasso)', 'GridSearchCV'],
        correctIndex: 1,
        explanation: 'Filter methods rank features based purely on statistical properties (variance, correlation, mutual information) independently of any machine learning estimator.',
      },
    ],
    independentExercise: {
      title: 'L1 Lasso Sparse Feature Selection',
      problem: 'Write a function lasso_feature_selection(X, y, alpha=0.1) that fits a Lasso model and returns the indices of features with non-zero coefficients.',
      hints: ['Fit Lasso(alpha=alpha)', 'np.where(model.coef_ != 0)[0]'],
      starterCode: `import numpy as np
from sklearn.linear_model import Lasso

def select_active_features(X: np.ndarray, y: np.ndarray, alpha: float = 0.1) -> np.ndarray:
    # TODO: return indices of non-zero features
    return np.array([])

X = np.random.randn(30, 5)
y = 3.0 * X[:, 0] - 2.0 * X[:, 2] + np.random.randn(30) * 0.1 # Only features 0 and 2 matter
print("Selected features:", select_active_features(X, y, alpha=0.2))
`,
      solution: `import numpy as np
from sklearn.linear_model import Lasso

def select_active_features(X: np.ndarray, y: np.ndarray, alpha: float = 0.1) -> np.ndarray:
    lasso = Lasso(alpha=alpha, random_state=42)
    lasso.fit(X, y)
    return np.where(lasso.coef_ != 0)[0]

X = np.random.randn(30, 5)
y = 3.0 * X[:, 0] - 2.0 * X[:, 2] + np.random.randn(30) * 0.1
print("Selected features:", select_active_features(X, y, alpha=0.2))
`,
    },
    summary: {
      keyTakeaways: [
        'Filter methods are fast and model-agnostic; Wrapper methods evaluate subsets using models; Embedded methods select features during training.',
        'Mutual Information captures arbitrary non-linear dependencies where linear correlation fails.',
        'L1 Lasso naturally shrinks irrelevant coefficients to exact zeros, providing embedded feature selection.',
      ],
      nextLessonId: 'polynomial-features',
      nextLessonTitle: 'Polynomial Features & Interaction Terms',
      nextLessonModuleId: 'module-2',
    },
  },

  'polynomial-features': {
    id: 'polynomial-features',
    moduleId: 'module-2',
    title: 'Polynomial Features & Interaction Terms',
    subtitle: 'Basis Function Expansion, Cross-Terms, Runge\'s Phenomenon & Dimensionality Control',
    order: 9,
    readTimeMinutes: 20,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Expand linear models to model nonlinear curves using polynomial basis functions: [1, x, x^2, x^3].',
      'Generate cross-feature interaction terms (x_1 * x_2) to capture synergy between variables.',
      'Explain Runge\'s phenomenon and combat the combinatorial explosion of features using regularization.',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'matrix-inverse-rank-determinants'],
    analogy: {
      title: 'The Synergistic Cocktail Ingredients',
      text: 'In pharmacology, taking Drug A might lower blood pressure by 5 units. Drug B might lower it by 5 units. But taking Drug A AND Drug B together might cause a dangerous drop of 40 units! A simple linear model (w1*A + w2*B) can never capture this interaction because it assumes features act independently. Adding an interaction cross-term w3*(A * B) gives the model the mathematical vocabulary to express synergistic chemical reactions.',
      metaphor: 'Interaction terms allow linear models to capture when the effect of one feature depends on another.',
    },
    problemSolved: {
      title: 'Modeling Non-Linear Real-World Relationships with Linear Models',
      description: 'Physical phenomena (drag force proportional to velocity squared, kinetic energy = 1/2 m v^2) are non-linear. Polynomial feature expansion allows fast, convex linear models to fit complex non-linear curves.',
      keyPoints: [
        'Enables linear algorithms (Ridge, Lasso, OLS) to fit curved boundaries.',
        'Captures feature interactions without needing complex tree or neural architectures.',
        'Retains closed-form mathematical guarantees of linear optimization.',
      ],
    },
    intuition: {
      overview: 'Linear models are linear in their PARAMETERS w, not in the inputs x! If we transform raw x into phi(x) = [x, x^2, x^3], the model remains strictly linear in w: y_hat = w_1 x + w_2 x^2 + w_3 x^3.',
      steps: [
        { step: 1, title: 'Power Expansion', description: 'Compute powers x^2, x^3 to capture accelerating or diminishing returns.' },
        { step: 2, title: 'Cross-Product Interactions', description: 'Multiply pairs x_1 * x_2 to model conditional dependencies.' },
        { step: 3, title: 'Linear Fitting', description: 'Fit standard linear regression on the expanded design matrix Phi.' },
      ],
    },
    mathematics: {
      overview: 'Polynomial feature expansion maps input vectors x in R^d to higher-dimensional feature space R^D.',
      foundations: [
        {
          name: 'Degree-2 Polynomial Mapping (2 Features)',
          latex: '\\phi(x_1, x_2) = [1, \\; x_1, \\; x_2, \\; x_1^2, \\; x_1 x_2, \\; x_2^2]^T',
          explanation: 'Includes bias, linear terms, pure quadratics, and the bilinear cross-term.',
        },
        {
          name: 'Combinatorial Feature Count Formula',
          latex: 'D = \\binom{d + p}{p} = \\frac{(d + p)!}{d! \\; p!}',
          explanation: 'Number of generated features for d original features expanded to degree p. Explodes exponentially!',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Combinatorial Explosion of Polynomial Terms',
      objective: 'Show how increasing degree p creates a massive feature explosion.',
      steps: [
        {
          step: 1,
          label: 'Stars and Bars Combinatorics',
          latex: 'x_1^{k_1} x_2^{k_2} \\dots x_d^{k_d} \\quad \\text{such that } \\sum_{j=1}^d k_j \\le p',
          explanation: 'Every monomial corresponds to distributing p powers among d features plus a slack term.',
        },
        {
          step: 2,
          label: 'Evaluate for d = 10 Features at Degree p = 3',
          latex: 'D = \\binom{10 + 3}{3} = \\frac{13 \\cdot 12 \\cdot 11}{3 \\cdot 2 \\cdot 1} = 286 \\text{ features}',
          explanation: 'Just 10 features expands into 286 features.',
        },
        {
          step: 3,
          label: 'Evaluate for d = 100 Features at Degree p = 3',
          latex: 'D = \\binom{100 + 3}{3} = \\frac{103 \\cdot 102 \\cdot 101}{6} = 176,851 \\text{ features!}',
          explanation: 'Demonstrates why polynomial expansion must be restricted to low degrees or interaction_only=True.',
        },
      ],
    },
    variables: [
      { symbol: 'p', name: 'Polynomial Degree', description: 'Maximum exponent sum of generated monomials.', dimensions: 'Integer ≥ 1' },
      { symbol: 'd', name: 'Original Feature Dimension', description: 'Number of raw input columns.', dimensions: 'Integer' },
      { symbol: 'D', name: 'Expanded Feature Dimension', description: 'Total columns after polynomial transformation.', dimensions: 'Integer' },
    ],
    numericalExample: {
      scenario: 'Given 2-dimensional sample x = [2.0, 3.0]. Compute its degree-2 polynomial expansion including cross-terms (include_bias=False).',
      dataset: [{ x1: 2.0, x2: 3.0 }],
      calculations: [
        { step: 'Linear Terms', math: 'x_1 = 2.0, \\; x_2 = 3.0', result: '[2.0, 3.0]' },
        { step: 'Squared Terms', math: 'x_1^2 = 2.0^2 = 4.0; \\; x_2^2 = 3.0^2 = 9.0', result: '[4.0, 9.0]' },
        { step: 'Interaction Term', math: 'x_1 \\cdot x_2 = 2.0 \\cdot 3.0', result: '6.0' },
        { step: 'Assembled Vector', math: '[x_1, \\; x_2, \\; x_1^2, \\; x_1 x_2, \\; x_2^2]', result: '[2.0, 3.0, 4.0, 6.0, 9.0]' },
      ],
      finalConclusion: 'The 2D point [2, 3] is mapped to a 5D coordinate vector [2, 3, 4, 6, 9].',
    },
    visualExplanation: {
      title: 'Fitting a Sine Wave: Underfitting, Balanced, and Runge Overfitting',
      description: 'Degree 1 fits a straight line (high bias). Degree 3 fits the smooth curve nicely. Degree 15 fits training points perfectly, but wildly oscillates at the boundaries (Runge\'s phenomenon / catastrophic overfitting).',
      features: ['Degree 1: Underfitting', 'Degree 3: Optimal balance', 'Degree 15: Wild edge oscillations (Runge phenomenon)'],
    },
    scratchCode: {
      title: 'Polynomial Basis Expansion in Pure NumPy',
      explanation: 'Generate 1D polynomial powers [x, x^2, ..., x^p] manually.',
      code: `import numpy as np

def polynomial_features_1d(x: np.ndarray, degree: int = 3, include_bias: bool = False):
    """Expands 1D array into polynomial matrix."""
    x = x.flatten()
    cols = []
    if include_bias:
        cols.append(np.ones_like(x))
        
    for p in range(1, degree + 1):
        cols.append(x ** p)
        
    return np.column_stack(cols)

x_data = np.array([1.0, 2.0, 3.0])
expanded = polynomial_features_1d(x_data, degree=3, include_bias=True)
print("Expanded Matrix [1, x, x^2, x^3]:\n", expanded)
`,
    },
    sklearnCode: {
      title: 'PolynomialFeatures Pipeline with Ridge Regularization',
      explanation: 'Always pair PolynomialFeatures with Ridge or Lasso to control weight explosion.',
      code: `import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import Ridge
from sklearn.pipeline import make_pipeline

X = np.array([[2.0, 3.0], [1.0, 4.0]])

# Generate interaction terms only
poly = PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)
X_poly = poly.fit_transform(X)

print("Feature Names:", poly.get_feature_names_out(['x1', 'x2']))
print("Transformed Matrix [x1, x2, x1*x2]:\n", X_poly)
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.preprocessing import PolynomialFeatures

X = np.array([[2.0, 3.0]])

# Degree 2 expansion
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)

print("Original 2D point:", X)
print("Transformed 5D vector:")
print(X_poly)
print("Features:", poly.get_feature_names_out(['x1', 'x2']))
`,
      expectedOutput: `Original 2D point: [[2. 3.]]\nTransformed 5D vector:\n[[2. 3. 4. 6. 9.]]\nFeatures: ['x1' 'x2' 'x1^2' 'x1 x2' 'x2^2']`,
    },
    lineByLineExplanation: [
      { lines: 'Line 4', codeSnippet: 'X = np.array([[2.0, 3.0]])', explanation: 'Creates 1 sample with 2 input features.' },
      { lines: 'Line 7', codeSnippet: 'poly = PolynomialFeatures(degree=2, include_bias=False)', explanation: 'Configures degree-2 expansion without redundant bias constant.' },
      { lines: 'Line 8', codeSnippet: 'X_poly = poly.fit_transform(X)', explanation: 'Computes [2, 3, 2^2, 2*3, 3^2] = [2, 3, 4, 6, 9].' },
    ],
    hyperparameters: [
      { name: 'degree', defaultVal: '2', range: '[2, 5]', effect: 'Maximum polynomial power.', recommendation: 'Stick to degree=2 or 3; degrees >= 4 cause severe collinearity and overfitting.' },
      { name: 'interaction_only', defaultVal: 'False', range: '[True, False]', effect: 'If True, only cross-products x1*x2 are produced, omitting x1^2, x2^2.', recommendation: 'Set interaction_only=True when you want synergy without curved nonlinearities.' },
    ],
    assumptions: [
      { assumption: 'Feature Scaling Required Before Expansion', whyItMatters: 'If x = 1,000, then x^3 = 1,000,000,000! Unscaled powers create massive numerical instability.', howToVerify: 'Always scale features before or after polynomial expansion.' },
    ],
    commonMistakes: [
      { mistake: 'Using high degree polynomials (degree >= 8) without regularization', solution: 'High degree polynomials produce wild oscillations near domain boundaries (Runge\'s phenomenon). Always use Ridge (L2) or keep degree <= 3.' },
    ],
    realWorldUseCases: [
      { industry: 'Automotive & Aerodynamics', application: 'Vehicle Drag and Fuel Consumption', benefit: 'Models aerodynamic drag as quadratic function of speed (v^2) and vehicle frontal cross-section area.' },
    ],
    practiceQuestions: [
      { id: 'pq-poly-1', question: 'How can a model be linear if it fits a curved parabolic line y = w1*x + w2*x^2?', hint: 'Differentiate linearity in parameters from linearity in inputs.', answer: 'The definition of a "linear model" requires linearity with respect to the parameters w, NOT the input variables x. Because the derivative d y_hat / d w_j does not depend on w, the objective remains convex and solvable via linear regression.' },
    ],
    quiz: [
      {
        id: 'quiz-poly-1',
        question: 'If you have 4 features and expand them using PolynomialFeatures(degree=2, interaction_only=True, include_bias=False), how many total features will result?',
        options: ['4', '6', '10', '14'],
        correctIndex: 2,
        explanation: 'There are 4 original linear features plus (4 choose 2) = 6 pairwise interaction terms: 4 + 6 = 10 total features.',
      },
    ],
    independentExercise: {
      title: 'Fit Curved Sine Wave with Polynomial Pipeline',
      problem: 'Create a pipeline with PolynomialFeatures(degree=3) and LinearRegression to fit y = sin(x) + noise over [-pi, pi]. Return train R^2.',
      hints: ['make_pipeline(PolynomialFeatures(3), LinearRegression())', 'model.score(X, y)'],
      starterCode: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

def fit_sine_poly(x: np.ndarray, y: np.ndarray) -> float:
    # TODO: return R^2 score of degree 3 polynomial
    return 0.0

x = np.linspace(-np.pi, np.pi, 50).reshape(-1, 1)
y = np.sin(x.flatten()) + np.random.normal(0, 0.1, 50)
print("Polynomial R^2 score:", fit_sine_poly(x, y))
`,
      solution: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

def fit_sine_poly(x: np.ndarray, y: np.ndarray) -> float:
    model = make_pipeline(PolynomialFeatures(degree=3), LinearRegression())
    model.fit(x, y)
    return round(float(model.score(x, y)), 4)

np.random.seed(42)
x = np.linspace(-np.pi, np.pi, 50).reshape(-1, 1)
y = np.sin(x.flatten()) + np.random.normal(0, 0.1, 50)
print("Polynomial R^2 score:", fit_sine_poly(x, y))
`,
    },
    summary: {
      keyTakeaways: [
        'Polynomial feature expansion allows linear models to capture nonlinear curves and feature synergies.',
        'Combinatorial explosion makes high degrees computationally expensive and prone to overfitting.',
        'Always combine polynomial expansion with regularization (Ridge or Lasso) to control weight magnitude.',
      ],
      nextLessonId: 'datetime-text-features',
      nextLessonTitle: 'Date/Time and Basic Text Feature Engineering',
      nextLessonModuleId: 'module-2',
    },
  },

  'datetime-text-features': {
    id: 'datetime-text-features',
    moduleId: 'module-2',
    title: 'Date/Time and Basic Text Feature Engineering',
    subtitle: 'Cyclical Periodic Sin/Cos Transforms, Bag-of-Words & TF-IDF Extraction',
    order: 10,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Transform cyclical periodic features (hour, day of week, month) into continuous coordinates using sin and cos.',
      'Explain why naive integer encodings (Hour 23 vs Hour 0) break distance metrics in ML.',
      'Construct Bag-of-Words count vectors and compute Term Frequency-Inverse Document Frequency (TF-IDF).',
    ],
    prerequisites: ['scalars-vectors-matrices-tensors', 'vector-operations-dot-products'],
    analogy: {
      title: 'The Clock Face and the Distance Trap',
      text: 'If you encode hour of the day as integers 0 through 23: 11:00 PM is hour 23 and 12:00 AM (midnight) is hour 0. A machine learning model calculates their distance as |23 - 0| = 23 hours! It thinks 11 PM and midnight are the farthest possible times apart in the entire day, when in reality they are separated by just 1 minute! By projecting the clock onto a 2D circle using (sin, cos), 11:59 PM and 12:01 AM sit right next to each other on the circle rim.',
      metaphor: 'Cyclical features live on circles, not on linear rulers.',
    },
    problemSolved: {
      title: 'Representing Temporal Cycles and Unstructured Text',
      description: 'Raw timestamps (2024-10-15 14:30:00) and raw strings cannot be fed directly into math models. We must extract temporal signals and vector-space text representations.',
      keyPoints: [
        'Preserves circular continuity: December 31 is adjacent to January 1.',
        'Decomposes timestamps into business days, holidays, quarters, and elapsed days.',
        'Transforms raw text corpora into weighted term frequency matrices.',
      ],
    },
    intuition: {
      overview: 'Map periodic time t onto an angle theta = 2*pi*t / T, then compute coordinates (sin(theta), cos(theta)). Transform text by counting word occurrences weighted by rarity.',
      steps: [
        { step: 1, title: 'Period Normalization', description: 'Divide time index by cycle period T (24 for hours, 7 for days, 12 for months).' },
        { step: 2, title: 'Trigonometric Projection', description: 'x_sin = sin(2*pi*t / T), x_cos = cos(2*pi*t / T).' },
        { step: 3, title: 'TF-IDF Text Extraction', description: 'Multiply Term Frequency (TF) by Inverse Document Frequency (IDF) to downweight ubiquitous words like "the".' },
      ],
    },
    mathematics: {
      overview: 'Formulations for circular periodic mappings and information-weighted text vectors.',
      foundations: [
        {
          name: 'Cyclical Sin/Cos Transformation',
          latex: 'x_{\\sin} = \\sin\\left( \\frac{2\\pi t}{T} \\right), \\quad x_{\\cos} = \\cos\\left( \\frac{2\\pi t}{T} \\right)',
          explanation: 'Preserves Euclidean distance: points at opposite ends of the cycle have distance 2.0; adjacent points have near-zero distance.',
        },
        {
          name: 'Term Frequency - Inverse Document Frequency (TF-IDF)',
          latex: '\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\cdot \\log\\left( \\frac{1 + |D|}{1 + |\\{d \\in D : t \\in d\\}|} \\right) + 1',
          explanation: 'High weight for words frequent in document d but rare across the broader corpus D.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Distance Invariance in Cyclical Encoding',
      objective: 'Prove that distance between Hour 23 and Hour 0 matches the distance between Hour 1 and Hour 2.',
      steps: [
        {
          step: 1,
          label: 'Map Angles for T = 24 Hours',
          latex: '\\theta_0 = \\frac{2\\pi(0)}{24} = 0, \\quad \\theta_{23} = \\frac{2\\pi(23)}{24} = 2\\pi - \\frac{2\\pi}{24} = -\\frac{\\pi}{12}',
          explanation: 'Angle difference between Hour 23 and Hour 0 is delta theta = 2 pi / 24 = pi / 12 radians.',
        },
        {
          step: 2,
          label: 'Evaluate Angle Difference for Hour 1 and Hour 2',
          latex: '\\Delta \\theta_{1, 2} = \\frac{2\\pi(2)}{24} - \\frac{2\\pi(1)}{24} = \\frac{2\\pi}{24} = \\frac{\\pi}{12} \\text{ radians}',
          explanation: 'The angular separation is identical.',
        },
        {
          step: 3,
          label: 'Euclidean Distance in (sin, cos) Plane',
          latex: '\\|(\\sin\\theta_1 - \\sin\\theta_2, \\; \\cos\\theta_1 - \\cos\\theta_2)\\| = 2\\sin\\left( \\frac{\\Delta \\theta}{2} \\right)',
          explanation: 'Because distance depends ONLY on delta theta, dist(23, 0) == dist(1, 2). The midnight discontinuity is completely resolved!',
        },
      ],
    },
    variables: [
      { symbol: 'T', name: 'Cycle Period', description: 'Length of recurring cycle (24 for hours, 7 for days, 12 for months).', dimensions: 'Scalar > 0' },
      { symbol: '\\text{TF}(t, d)', name: 'Term Frequency', description: 'Count or proportion of term t in document d.', dimensions: 'Scalar ≥ 0' },
      { symbol: '\\text{IDF}(t, D)', name: 'Inverse Document Frequency', description: 'Logarithmic penalty for words appearing across many documents.', dimensions: 'Scalar ≥ 0' },
    ],
    numericalExample: {
      scenario: 'Calculate (sin, cos) encoding for Hour 0 (midnight) and Hour 6 (6 AM) with T = 24.',
      dataset: [{ hour_0: 0, hour_6: 6, period: 24 }],
      calculations: [
        { step: 'Angle for Hour 0', math: '2\\pi(0) / 24 = 0 \\text{ rad}', result: 'theta = 0' },
        { step: 'Coordinates for Hour 0', math: '(\\sin(0), \\cos(0)) = (0.0, 1.0)', result: '[0.0, 1.0]' },
        { step: 'Angle for Hour 6', math: '2\\pi(6) / 24 = \\pi / 2 \\text{ rad}', result: 'theta = pi/2' },
        { step: 'Coordinates for Hour 6', math: '(\\sin(\\pi/2), \\cos(\\pi/2)) = (1.0, 0.0)', result: '[1.0, 0.0]' },
        { step: 'Euclidean Distance', math: '\\sqrt{(1.0 - 0.0)^2 + (0.0 - 1.0)^2} = \\sqrt{1 + 1}', result: '\\sqrt{2} \\approx 1.414' },
      ],
      finalConclusion: 'Hour 0 sits at (0, 1) and Hour 6 sits at (1, 0) on the unit circle, separated by a 90-degree arc.',
    },
    visualExplanation: {
      title: 'Cyclical Time as Coordinates on the Unit Circle',
      description: 'Projecting 24 hours onto the unit circle ensures continuous transitions: 11 PM (hour 23) sits immediately next to midnight (hour 0). Both features (sin and cos) are required to avoid quadrant ambiguity.',
      features: ['Hour 0: (0, 1)', 'Hour 6: (1, 0)', 'Hour 12: (0, -1)', 'Hour 18: (-1, 0)'],
    },
    scratchCode: {
      title: 'Cyclical Time Encoder in Pure NumPy',
      explanation: 'Convert hours and days into paired sin/cos coordinates.',
      code: `import numpy as np

def encode_cyclical_feature(values: np.ndarray, period: float):
    """Encodes 1D periodic array into sin and cos columns."""
    theta = 2.0 * np.pi * values / period
    sin_feat = np.sin(theta)
    cos_feat = np.cos(theta)
    return np.column_stack([sin_feat, cos_feat])

hours = np.array([0, 6, 12, 18, 23])
encoded_hours = encode_cyclical_feature(hours, period=24.0)

for h, (s, c) in zip(hours, encoded_hours):
    print(f"Hour {h:2d} -> sin: {s:+.3f}, cos: {c:+.3f}")
`,
    },
    sklearnCode: {
      title: 'TfidfVectorizer in Scikit-Learn',
      explanation: 'Transforming text strings into weighted sparse vectors with stopword filtering.',
      code: `from sklearn.feature_extraction.text import TfidfVectorizer

corpus = [
    "Machine learning models analyze patterns in data.",
    "Deep learning and neural networks process sensory data.",
    "Data preprocessing cleans noisy features."
]

tfidf = TfidfVectorizer(stop_words='english')
X_tfidf = tfidf.fit_transform(corpus)

print("Vocabulary:", tfidf.get_feature_names_out()[:6])
print("Sparse TF-IDF Matrix Shape:", X_tfidf.shape)
`,
    },
    runnableCode: {
      code: `import numpy as np

# Verify distance between 23:00 and 00:00 vs 01:00 and 02:00
def get_coords(hour):
    theta = 2 * np.pi * hour / 24.0
    return np.array([np.sin(theta), np.cos(theta)])

p23 = get_coords(23)
p00 = get_coords(0)
p01 = get_coords(1)
p02 = get_coords(2)

dist_23_00 = np.linalg.norm(p23 - p00)
dist_01_02 = np.linalg.norm(p01 - p02)

print(f"Euclidean distance 23:00 to 00:00: {dist_23_00:.4f}")
print(f"Euclidean distance 01:00 to 02:00: {dist_01_02:.4f}")
print(f"Distances match perfectly? {np.isclose(dist_23_00, dist_01_02)}")
`,
      expectedOutput: `Euclidean distance 23:00 to 00:00: 0.2611\nEuclidean distance 01:00 to 02:00: 0.2611\nDistances match perfectly? True`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-6', codeSnippet: 'def get_coords(hour): theta = 2*pi*hour/24 ...', explanation: 'Maps discrete hour to (sin, cos) on the unit circle.' },
      { lines: 'Lines 8-11', codeSnippet: 'p23 = get_coords(23); p00 = get_coords(0)', explanation: 'Evaluates coordinates at boundary hours 23 and 0.' },
      { lines: 'Lines 13-14', codeSnippet: 'np.linalg.norm(p23 - p00)', explanation: 'Verifies distance between 23 and 0 is identical to 1 and 2 (0.2611).' },
    ],
    hyperparameters: [
      { name: 'max_features', defaultVal: '5000', range: '[100, 100000]', effect: 'Upper bound on vocabulary size for TfidfVectorizer.', recommendation: 'Set max_features=5000 to keep memory low and prevent overfitting on rare typos.' },
    ],
    assumptions: [
      { assumption: 'Both Sin and Cos Must Be Kept', whyItMatters: 'Using sin alone causes ambiguity: sin(30 deg) == sin(150 deg). Cosine is required to distinguish morning from afternoon.', howToVerify: 'Always generate paired sin and cos columns.' },
    ],
    commonMistakes: [
      { mistake: 'Encoding cyclical time with only the sin() transform', solution: 'Sin(x) is symmetric around the peak; hour 6 (6 AM) and hour 18 (6 PM) produce the identical sin value (+1.0)! You MUST include both sin and cos.' },
    ],
    realWorldUseCases: [
      { industry: 'Ride-Hailing & Mobility (Uber / Lyft)', application: 'Ride Demand Forecasting', benefit: 'Cyclical sin/cos encodings for minute-of-hour and day-of-week capture recurring rush hour traffic peaks accurately.' },
    ],
    practiceQuestions: [
      { id: 'pq-time-1', question: 'Why is Inverse Document Frequency (IDF) useful in text classification?', hint: 'What happens with words like "the" or "is"?', answer: 'Words like "the", "is", and "and" appear in almost every document. Their Term Frequency is very high, but their IDF approaches 0, downweighting them so domain-specific words (like "fraud" or "cardiology") dominate the vector representation.' },
    ],
    quiz: [
      {
        id: 'quiz-time-1',
        question: 'Why are BOTH sin and cos transformations required when encoding cyclical features like hours of the day?',
        options: [
          'Because one is for AM and the other is for PM.',
          'Because sin alone is non-injective: multiple different hours (e.g. 6 AM and 6 PM) share identical sin values, creating ambiguity.',
          'Because computers cannot compute sin without cos.',
          'To make the feature matrix square.',
        ],
        correctIndex: 1,
        explanation: 'The sine function is symmetric and repeats values across quadrants. Both sin and cos are required to locate a unique point on the 2D circle without ambiguity.',
      },
    ],
    independentExercise: {
      title: 'Extract Date and Cyclical Features from Timestamps',
      problem: 'Write a function extract_temporal_features(dates_series) that takes a Pandas Series of timestamps and returns a DataFrame with: is_weekend (0/1), hour_sin, hour_cos, month_sin, month_cos.',
      hints: ['dt.dayofweek >= 5 for weekend', '2*pi*dt.hour / 24 for hour', '2*pi*(dt.month - 1) / 12 for month'],
      starterCode: `import pandas as pd
import numpy as np

def extract_temporal_features(ts: pd.Series) -> pd.DataFrame:
    # TODO: return DataFrame with temporal features
    return pd.DataFrame()

dates = pd.to_datetime(['2024-01-01 00:00:00', '2024-07-06 12:00:00'])
print(extract_temporal_features(dates))
`,
      solution: `import pandas as pd
import numpy as np

def extract_temporal_features(ts: pd.Series) -> pd.DataFrame:
    ts = pd.to_datetime(ts)
    df_out = pd.DataFrame()
    df_out['is_weekend'] = (ts.dt.dayofweek >= 5).astype(int)
    
    hour_theta = 2.0 * np.pi * ts.dt.hour / 24.0
    df_out['hour_sin'] = np.round(np.sin(hour_theta), 4)
    df_out['hour_cos'] = np.round(np.cos(hour_theta), 4)
    
    month_theta = 2.0 * np.pi * (ts.dt.month - 1) / 12.0
    df_out['month_sin'] = np.round(np.sin(month_theta), 4)
    df_out['month_cos'] = np.round(np.cos(month_theta), 4)
    
    return df_out

dates = pd.to_datetime(['2024-01-01 00:00:00', '2024-07-06 12:00:00'])
print(extract_temporal_features(dates))
`,
    },
    summary: {
      keyTakeaways: [
        'Cyclical temporal features require paired (sin, cos) transformations to preserve circular distance.',
        'Never use single sin() transformations alone due to quadrant symmetry ambiguity.',
        'TF-IDF vectorizes text by rewarding document-specific terms while suppressing ubiquitous words.',
      ],
      nextLessonId: 'imbalanced-datasets-smote',
      nextLessonTitle: 'Imbalanced Datasets & SMOTE Resampling',
      nextLessonModuleId: 'module-2',
    },
  },

  'imbalanced-datasets-smote': {
    id: 'imbalanced-datasets-smote',
    moduleId: 'module-2',
    title: 'Imbalanced Datasets & SMOTE Resampling',
    subtitle: 'The Accuracy Paradox, Synthetic Oversampling, Borderline SMOTE & Cost-Sensitive Weights',
    order: 11,
    readTimeMinutes: 24,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Explain the Accuracy Paradox in imbalanced classification (99% accuracy model that predicts nothing).',
      'Compare Random Undersampling, Random Oversampling, and SMOTE (Synthetic Minority Over-sampling Technique).',
      'Implement class-weighted loss functions: loss = w_pos * L_pos + w_neg * L_neg.',
    ],
    prerequisites: ['probability-bayes-theorem', 'scalars-vectors-matrices-tensors'],
    analogy: {
      title: 'The Lazy Security Guard',
      text: 'Imagine a building where 99.9% of visitors are honest employees and 0.1% are burglars. A lazy security guard stays asleep all day and waves every single person through without checking ID. The guard boasts: "I have 99.9% accuracy!" Technically true, but utterly useless—every single burglar walked right in. This is the Accuracy Paradox: under severe class imbalance, accuracy is a meaningless vanity metric.',
      metaphor: 'High accuracy on imbalanced data is often just a lazy model predicting the majority class.',
    },
    problemSolved: {
      title: 'Detecting Rare High-Impact Events',
      description: 'In credit card fraud, disease screening, and cyber intrusions, the positive class represents less than 1% of samples. Standard loss minimization optimizes for the 99% majority, ignoring the positive class.',
      keyPoints: [
        'Solves the majority class collapse problem.',
        'SMOTE synthesizes plausible new minority samples along feature line segments.',
        'Cost-sensitive class weighting penalizes false negatives without inflating dataset size.',
      ],
    },
    intuition: {
      overview: 'Random oversampling duplicates existing minority points (risking overfitting). SMOTE synthesizes brand-new interpolated points between neighboring minority samples.',
      steps: [
        { step: 1, title: 'Locate Minority Neighbors', description: 'For each minority point x_i, find its K nearest minority neighbors in feature space.' },
        { step: 2, title: 'Random Interpolation Vector', description: 'Select a random neighbor x_zi and compute difference vector (x_zi - x_i).' },
        { step: 3, title: 'Generate Synthetic Point', description: 'x_new = x_i + lambda * (x_zi - x_i), where lambda in [0, 1] is a random scalar.' },
      ],
    },
    mathematics: {
      overview: 'SMOTE generates convex combinations of adjacent minority sample points.',
      foundations: [
        {
          name: 'SMOTE Synthesis Formula',
          latex: '\\mathbf{x}_{\\text{new}} = \\mathbf{x}_i + \\lambda (\\mathbf{x}_{zi} - \\mathbf{x}_i) \\quad \\text{where } \\lambda \\sim \\text{Uniform}(0, 1)',
          explanation: 'Creates a synthetic sample along the line segment connecting x_i and neighbor x_zi.',
        },
        {
          name: 'Balanced Class Weight Formula (Scikit-Learn)',
          latex: 'w_c = \\frac{N}{C \\cdot N_c}',
          explanation: 'Inversely proportional to class frequencies: N is total samples, C is number of classes, N_c is class count.',
        },
      ],
    },
    derivation: {
      title: 'Derivation of Balanced Class Weight Equality',
      objective: 'Prove that applying w_c = N / (C * N_c) equalizes total loss contribution between classes.',
      steps: [
        {
          step: 1,
          label: 'Total Loss for Class c',
          latex: '\\text{Loss}_c = \\sum_{i \\in c} w_c \\mathcal{L}_i = N_c \\cdot w_c \\cdot \\bar{\\mathcal{L}}_c',
          explanation: 'Sum of individual sample losses for class c.',
        },
        {
          step: 2,
          label: 'Substitute the Balanced Weight Formula',
          latex: '\\text{Loss}_c = N_c \\cdot \\left( \\frac{N}{C \\cdot N_c} \\right) \\bar{\\mathcal{L}}_c = \\frac{N}{C} \\bar{\\mathcal{L}}_c',
          explanation: 'The sample count N_c cancels out completely!',
        },
        {
          step: 3,
          label: 'Compare Class Loss Contributions',
          latex: '\\frac{\\text{Loss}_0}{\\text{Loss}_1} = \\frac{\\bar{\\mathcal{L}}_0}{\\bar{\\mathcal{L}}_1}',
          explanation: 'Both classes now exert equal aggregate gradient pressure on the model regardless of whether one class is 100 times larger.',
        },
      ],
    },
    variables: [
      { symbol: '\\mathbf{x}_{zi}', name: 'K-Nearest Neighbor', description: 'Randomly selected minority neighbor of sample x_i.', dimensions: 'd × 1' },
      { symbol: '\\lambda', name: 'Interpolation Factor', description: 'Random scalar along line segment.', dimensions: 'Uniform [0, 1]' },
      { symbol: 'w_c', name: 'Class Weight', description: 'Loss multiplier assigned to errors on class c.', dimensions: 'Scalar > 0' },
    ],
    numericalExample: {
      scenario: 'Given minority point x_1 = [2.0, 4.0] and its neighbor x_2 = [6.0, 10.0]. Generate a synthetic point using SMOTE with lambda = 0.25.',
      dataset: [{ x1_a: 2.0, x1_b: 4.0, x2_a: 6.0, x2_b: 10.0, lambda: 0.25 }],
      calculations: [
        { step: 'Difference Vector (x2 - x1)', math: '[6.0 - 2.0, \\; 10.0 - 4.0] = [4.0, \\; 6.0]', result: '[4.0, 6.0]' },
        { step: 'Scaled Segment lambda * diff', math: '0.25 \\cdot [4.0, 6.0] = [1.0, \\; 1.5]', result: '[1.0, 1.5]' },
        { step: 'Synthesized Coordinate x_new', math: 'x_1 + [1.0, 1.5] = [2.0 + 1.0, \\; 4.0 + 1.5]', result: '[3.0, 5.5]' },
      ],
      finalConclusion: 'The synthetic point [3.0, 5.5] lies directly on the line connecting the two real samples, enriching minority density.',
    },
    visualExplanation: {
      title: 'SMOTE Geometric Interpolation in Feature Space',
      description: 'Minority samples are connected by line segments to their K nearest minority neighbors. New synthetic samples are generated randomly along these interior line segments, expanding minority decision regions.',
      features: ['Real minority points: Dots', 'Line segments: Interpolation paths', 'Synthetic samples: Crosses on lines'],
    },
    scratchCode: {
      title: 'Minimal SMOTE Synthesizer in Pure Python',
      explanation: 'Generate synthetic minority points using pairwise Euclidean neighbors.',
      code: `import numpy as np

def simple_smote(min_samples: np.ndarray, n_synthetic: int, k_neighbors: int = 2):
    """Generates synthetic samples by interpolating between nearest minority points."""
    synthetic_points = []
    N = len(min_samples)
    
    for _ in range(n_synthetic):
        # Pick random minority point
        idx = np.random.randint(0, N)
        base_point = min_samples[idx]
        
        # Compute distances to all other minority points
        dists = np.linalg.norm(min_samples - base_point, axis=1)
        # Exclude self
        dists[idx] = np.inf
        neighbor_indices = np.argsort(dists)[:k_neighbors]
        
        # Pick random neighbor
        neighbor = min_samples[np.random.choice(neighbor_indices)]
        
        # Interpolate
        lam = np.random.uniform(0.0, 1.0)
        synth = base_point + lam * (neighbor - base_point)
        synthetic_points.append(synth)
        
    return np.array(synthetic_points)

min_data = np.array([[2.0, 4.0], [6.0, 10.0], [4.0, 7.0]])
np.random.seed(42)
synth = simple_smote(min_data, n_synthetic=3, k_neighbors=2)
print("Generated Synthetic Points:\n", np.round(synth, 2))
`,
    },
    sklearnCode: {
      title: 'Class Weight Balancing in Scikit-Learn',
      explanation: 'Adjusting class_weight="balanced" directly in LogisticRegression or RandomForest.',
      code: `import numpy as np
from sklearn.linear_model import LogisticRegression

# 100 samples: 95 legitimate (0), 5 fraud (1)
X = np.random.randn(100, 2)
y = np.array([0]*95 + [1]*5)

# Standard model: ignores minority
clf_standard = LogisticRegression().fit(X, y)
# Balanced model: upweights minority loss by 19x
clf_balanced = LogisticRegression(class_weight='balanced').fit(X, y)

print("Standard Model class 1 weight:", clf_standard.coef_)
print("Balanced Model class 1 weight:", clf_balanced.coef_)
`,
    },
    runnableCode: {
      code: `import numpy as np

# Verify balanced weight formula for 95 negatives and 5 positives
N = 100
n_neg = 95
n_pos = 5
C = 2

w_neg = N / (C * n_neg)
w_pos = N / (C * n_pos)

print(f"Total: {N}, Neg: {n_neg}, Pos: {n_pos}")
print(f"Negative class weight: {w_neg:.4f}")
print(f"Positive class weight: {w_pos:.4f}")
print(f"Weight ratio (pos/neg): {w_pos / w_neg:.1f}x (Balances 95:5 ratio!)")
`,
      expectedOutput: `Total: 100, Neg: 95, Pos: 5\nNegative class weight: 0.5263\nPositive class weight: 10.0000\nWeight ratio (pos/neg): 19.0x (Balances 95:5 ratio!)`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 4-7', codeSnippet: 'N = 100; n_neg = 95; n_pos = 5; C = 2', explanation: 'Defines 95:5 imbalanced binary dataset.' },
      { lines: 'Lines 9-10', codeSnippet: 'w_neg = N / (C * n_neg); w_pos = N / (C * n_pos)', explanation: 'Calculates balanced class weights inversely proportional to frequencies.' },
      { lines: 'Line 15', codeSnippet: 'w_pos / w_neg', explanation: 'Demonstrates minority errors are penalized exactly 19 times more severely.' },
    ],
    hyperparameters: [
      { name: 'sampling_strategy', defaultVal: '"auto"', range: '["auto", float ratio]', effect: 'Target ratio of minority to majority samples for SMOTE.', recommendation: 'Resampling to 1:1 is rarely optimal; start with sampling_strategy=0.5 (1:2 ratio).' },
    ],
    assumptions: [
      { assumption: 'Minority Point Neighborhood Homogeneity', whyItMatters: 'If a minority point is an isolated outlier inside the majority cluster, SMOTE creates synthetic points bridging across clusters, corrupting decision boundaries.', howToVerify: 'Use Borderline-SMOTE or Tomek Links to clean borderline noise.' },
    ],
    commonMistakes: [
      { mistake: 'Applying SMOTE to the validation or test set', solution: 'NEVER resample test sets! Test sets must reflect real production distributions. Apply SMOTE strictly on training folds.' },
    ],
    realWorldUseCases: [
      { industry: 'Banking & Fraud Analytics', application: 'Credit Card Fraud Prevention', benefit: 'SMOTE expands rare fraud patterns, allowing gradient boosting models to achieve 85% recall without drowning in false alarms.' },
    ],
    practiceQuestions: [
      { id: 'pq-smote-1', question: 'What is the danger of applying Random Oversampling (simple duplication with replacement) instead of SMOTE?', hint: 'What happens when a model memorizes duplicate points?', answer: 'Random oversampling simply copies exact duplicate points. This leads to sharp, brittle decision boundaries overfitting to specific individual points rather than generalizing along feature dimensions.' },
    ],
    quiz: [
      {
        id: 'quiz-smote-1',
        question: 'Why should SMOTE NEVER be applied to the test evaluation set?',
        options: [
          'Because SMOTE only works on integer data.',
          'Because the test set must reflect true operational reality; synthesizing fake test points produces invalid evaluation metrics.',
          'Because it makes the test set too small.',
          'Because Scikit-learn throws an error.',
        ],
        correctIndex: 1,
        explanation: 'Evaluation data must represent genuine out-of-sample reality. Synthesizing artificial minority test points inflates test performance and misleads stakeholders.',
      },
    ],
    independentExercise: {
      title: 'Compare Accuracy vs Balanced Accuracy on Imbalanced Data',
      problem: 'Write a script that computes both standard accuracy and balanced accuracy for a dummy model that always predicts class 0 on a 98:2 imbalanced dataset.',
      hints: ['from sklearn.metrics import accuracy_score, balanced_accuracy_score', 'y_pred = np.zeros(len(y_true))'],
      starterCode: `import numpy as np
from sklearn.metrics import accuracy_score, balanced_accuracy_score

y_true = np.array([0]*98 + [1]*2)
y_pred = np.zeros(100) # Always predicts 0

# TODO: print accuracy and balanced accuracy
print("Accuracy vs Balanced Accuracy:")
`,
      solution: `import numpy as np
from sklearn.metrics import accuracy_score, balanced_accuracy_score

y_true = np.array([0]*98 + [1]*2)
y_pred = np.zeros(100)

acc = accuracy_score(y_true, y_pred)
bal_acc = balanced_accuracy_score(y_true, y_pred)

print(f"Standard Accuracy: {acc*100:.1f}% (Deceptive vanity metric)")
print(f"Balanced Accuracy: {bal_acc*100:.1f}% (Truth: 0% recall on minority class)")
`,
    },
    summary: {
      keyTakeaways: [
        'Under class imbalance, accuracy is deceptive; evaluate Precision, Recall, PR-AUC, and F1-score.',
        'SMOTE synthesizes plausible new minority samples along feature line segments between neighbors.',
        'Class-weighted loss (class_weight="balanced") equalizes gradient pressure without inflating data size.',
      ],
      nextLessonId: 'columntransformer-pipelines',
      nextLessonTitle: 'Scikit-Learn Pipelines & ColumnTransformer',
      nextLessonModuleId: 'module-2',
    },
  },

  'columntransformer-pipelines': {
    id: 'columntransformer-pipelines',
    moduleId: 'module-2',
    title: 'Scikit-Learn Pipelines & ColumnTransformer',
    subtitle: 'Composing Heterogeneous Preprocessing for Mixed Numerical and Categorical Tables',
    order: 12,
    readTimeMinutes: 26,
    difficulty: 'Intermediate',
    visualizerType: 'none',
    objectives: [
      'Construct production-grade Scikit-learn ColumnTransformer objects routing subsets of columns to distinct sub-pipelines.',
      'Combine numerical pipelines (impute -> scale) with categorical pipelines (impute -> encode).',
      'Serialize and deploy end-to-end composite pipelines as single atomic estimators.',
    ],
    prerequisites: ['data-leakage-prevention', 'categorical-encoding', 'feature-scaling-normalization'],
    analogy: {
      title: 'The Modern Car Assembly Line',
      text: 'In an automobile factory, raw metal doors go down the paint line, engine blocks go down the machining line, and electrical wires go down the harness line. At the final station, the chassis, painted body, and engine converge seamlessly into a finished car. ColumnTransformer is that automated factory: numerical columns travel down the scaling conveyor belt, categorical text columns travel down the encoding conveyor belt, and they merge cleanly into a single numeric feature matrix for the model.',
      metaphor: 'ColumnTransformer routes different column types to specialized preprocessing assembly lines.',
    },
    problemSolved: {
      title: 'Managing Complex Heterogeneous Datasets Cleanly',
      description: 'Real-world business tables mix continuous numeric features (age, income), nominal categories (city, gender), text notes, and missing values. Manually transforming them produces brittle, unmaintainable spaghetti code prone to data leakage.',
      keyPoints: [
        'Eliminates manual pandas data munging scripts before model prediction.',
        'Ensures training and production feature orders match identically.',
        'Packages entire ML workflows into a single deployable joblib artifact.',
      ],
    },
    intuition: {
      overview: 'ColumnTransformer applies specific transformers to specified column subsets in parallel and concatenates their outputs horizontally into a unified design matrix.',
      steps: [
        { step: 1, title: 'Define Sub-Pipelines', description: 'Create numeric pipeline (SimpleImputer + StandardScaler) and categorical pipeline (SimpleImputer + OneHotEncoder).' },
        { step: 2, title: 'Compose ColumnTransformer', description: 'Bind numeric pipeline to numeric column names, categorical pipeline to categorical names.' },
        { step: 3, title: 'Attach Estimator', description: 'Chain preprocessor with final classifier or regressor in an overarching Pipeline.' },
      ],
    },
    mathematics: {
      overview: 'ColumnTransformer performs block-diagonal matrix transformations followed by horizontal concatenation.',
      foundations: [
        {
          name: 'Block Column Transformation',
          latex: 'X_{\\text{preprocessed}} = [\\mathcal{T}_{\\text{num}}(X_{\\text{num}}) \\quad \\mathcal{T}_{\\text{cat}}(X_{\\text{cat}}) \\quad X_{\\text{remainder}}]',
          explanation: 'Applies specialized functions T_num and T_cat and joins output blocks horizontally.',
        },
      ],
    },
    derivation: {
      title: 'Mathematical Architecture of Atomic Pipeline Inference',
      objective: 'Demonstrate how an end-to-end pipeline encapsulates inference f(T(x)).',
      steps: [
        {
          step: 1,
          label: 'Raw Input Observation Vector',
          latex: '\\mathbf{x} = [x_1, x_2, \\dots, x_d]^T \\in \\mathcal{X}',
          explanation: 'Raw heterogeneous record containing strings, integers, floats, and NaNs.',
        },
        {
          step: 2,
          label: 'Composite Transformation Mapping',
          latex: '\\mathbf{z} = \\mathcal{T}_{\\text{pipe}}(\\mathbf{x}) = \\mathcal{T}_k(\\mathcal{T}_{k-1}(\\dots \\mathcal{T}_1(\\mathbf{x}))) \\in \\mathbb{R}^D',
          explanation: 'Sequential transformations produce a clean real-valued feature vector z.',
        },
        {
          step: 3,
          label: 'Final Estimator Inference',
          latex: '\\hat{y} = g(\\mathbf{z}) = g(\\mathcal{T}_{\\text{pipe}}(\\mathbf{x}))',
          explanation: 'The client service passes raw JSON directly to pipe.predict(raw_data) with zero client-side preprocessing.',
        },
      ],
    },
    variables: [
      { symbol: 'X_{\\text{num}}', name: 'Numerical Columns', description: 'Continuous and discrete numerical features.', dimensions: 'N × d_num' },
      { symbol: 'X_{\\text{cat}}', name: 'Categorical Columns', description: 'String and object category features.', dimensions: 'N × d_cat' },
      { symbol: '\\mathcal{T}', name: 'Pipeline Transformer', description: 'Composite transformation block.', dimensions: 'Object' },
    ],
    numericalExample: {
      scenario: 'Process a 2-sample table: Age = [25, NaN], City = ["Paris", "London"]. Numeric pipeline imputes median (25); Categorical pipeline one-hot encodes [London, Paris].',
      dataset: [
        { age: 25.0, city: 'Paris' },
        { age: 'NaN', city: 'London' }
      ],
      calculations: [
        { step: 'Numeric Imputation', math: 'Age median = 25.0 -> Imputed: [25.0, 25.0]', result: '[25.0, 25.0]' },
        { step: 'Categorical One-Hot', math: 'Alphabetical: London = [1, 0], Paris = [0, 1]', result: 'London=[1,0], Paris=[0,1]' },
        { step: 'Sample 1 Concatenation', math: '[Age=25.0, \\; City_London=0, \\; City_Paris=1]', result: '[25.0, 0.0, 1.0]' },
        { step: 'Sample 2 Concatenation', math: '[Age=25.0, \\; City_London=1, \\; City_Paris=0]', result: '[25.0, 1.0, 0.0]' },
      ],
      finalConclusion: 'The heterogeneous table cleanly transforms into a 2x3 numeric design matrix ready for modeling.',
    },
    visualExplanation: {
      title: 'Scikit-Learn ColumnTransformer Diagram',
      description: 'Incoming DataFrame columns are split by type: Numeric columns pass through SimpleImputer -> StandardScaler. Categorical columns pass through SimpleImputer -> OneHotEncoder. Outputs merge into a unified array passed to the Classifier.',
      features: ['Parallel branch routing', 'Automated column alignment', 'Single predict() entrypoint'],
    },
    scratchCode: {
      title: 'Complete ColumnTransformer Pipeline in Scikit-Learn',
      explanation: 'Full professional production template for mixed tabular data.',
      code: `import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression

# Sample mixed tabular dataset
df = pd.DataFrame({
    'age': [25.0, np.nan, 45.0, 35.0],
    'income': [50000.0, 80000.0, 120000.0, np.nan],
    'city': ['London', 'Paris', 'London', 'Tokyo'],
    'churn': [0, 1, 0, 1]
})

num_cols = ['age', 'income']
cat_cols = ['city']

# 1. Sub-pipelines
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('encoder', OneHotEncoder(drop='first', sparse_output=False))
])

# 2. Composite ColumnTransformer
preprocessor = ColumnTransformer(transformers=[
    ('num', num_pipeline, num_cols),
    ('cat', cat_pipeline, cat_cols)
])

# 3. Full Model Pipeline
full_model = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression())
])

full_model.fit(df[num_cols + cat_cols], df['churn'])
print("Pipeline fitted successfully! Classes:", full_model.classes_)
`,
    },
    sklearnCode: {
      title: 'Inspecting Feature Names from ColumnTransformer',
      explanation: 'Using get_feature_names_out() to trace transformed columns back to inputs.',
      code: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

df = pd.DataFrame({
    'num_feature': [1.0, 2.0, 3.0],
    'cat_feature': ['A', 'B', 'A']
})

ct = ColumnTransformer([
    ('scale', StandardScaler(), ['num_feature']),
    ('encode', OneHotEncoder(sparse_output=False), ['cat_feature'])
])

X_trans = ct.fit_transform(df)
print("Output Column Names:", ct.get_feature_names_out())
`,
    },
    runnableCode: {
      code: `import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

df = pd.DataFrame({
    'age': [25.0, 45.0, 35.0],
    'city': ['London', 'Paris', 'Tokyo']
})

ct = ColumnTransformer([
    ('num', StandardScaler(), ['age']),
    ('cat', OneHotEncoder(sparse_output=False), ['city'])
])

res = ct.fit_transform(df)
print("Transformed Feature Array:")
print(np.round(res, 2))
print("Column Names:", ct.get_feature_names_out())
`,
      expectedOutput: `Transformed Feature Array:\n[[-1.22  1.    0.    0.  ]\n [ 1.22  0.    1.    0.  ]\n [ 0.    0.    0.    1.  ]]\nColumn Names: ['num__age' 'cat__city_London' 'cat__city_Paris' 'cat__city_Tokyo']`,
    },
    lineByLineExplanation: [
      { lines: 'Lines 5-8', codeSnippet: 'df = pd.DataFrame({\'age\': [...], \'city\': [...]})', explanation: 'Creates heterogeneous tabular DataFrame.' },
      { lines: 'Lines 10-13', codeSnippet: 'ct = ColumnTransformer([(\'num\', StandardScaler(), [\'age\']), ...])', explanation: 'Routes age to StandardScaler and city to OneHotEncoder in parallel.' },
      { lines: 'Line 15', codeSnippet: 'res = ct.fit_transform(df)', explanation: 'Executes parallel transformations and concatenates columns horizontally.' },
    ],
    hyperparameters: [
      { name: 'remainder', defaultVal: '"drop"', range: '["drop", "passthrough", Transformer()]', effect: 'Controls what happens to columns not explicitly listed in transformers.', recommendation: 'Use remainder="passthrough" if you have raw pre-computed features that require no modification.' },
    ],
    assumptions: [
      { assumption: 'Column Schema Consistency', whyItMatters: 'Inference payloads must contain the exact column names specified in ColumnTransformer.', howToVerify: 'Use Pydantic schemas in FastAPI to validate input JSON.' },
    ],
    commonMistakes: [
      { mistake: 'Passing a 1D column name string instead of a list: "age" instead of ["age"]', solution: 'Scikit-learn transformers require 2D inputs. Always pass column names as a list: [\'age\'].' },
    ],
    realWorldUseCases: [
      { industry: 'FinTech & Lending', application: 'Loan Default Prediction Microservice', benefit: 'A single Pipeline object receives raw user loan applications via REST API and handles all scaling, imputation, and scoring in 5 milliseconds.' },
    ],
    practiceQuestions: [
      { id: 'pq-pipe-1', question: 'Why is it better to serialize a complete Pipeline rather than saving a separate scaler.joblib and model.joblib?', hint: 'Think about deployment bugs and missing steps.', answer: 'Saving separate files forces the deployment engineer to manually coordinate the exact order of transformations, risking schema mismatch, missing steps, and software rot. A Pipeline encapsulates everything in a single callable artifact: pipe.predict(raw_data).' },
    ],
    quiz: [
      {
        id: 'quiz-pipe-1',
        question: 'In a Scikit-learn Pipeline, which methods must all intermediate transformation steps implement?',
        options: [
          'fit and predict',
          'fit and transform',
          'predict and score',
          'forward and backward',
        ],
        correctIndex: 1,
        explanation: 'All intermediate steps in a Pipeline must be transformers implementing fit() and transform(). Only the final step can be an estimator implementing predict().',
      },
    ],
    independentExercise: {
      title: 'Build ColumnTransformer with Remainder Passthrough',
      problem: 'Construct a ColumnTransformer that scales "income" using StandardScaler, encodes "gender" with OneHotEncoder, and passes through "binary_flag" unmodified using remainder="passthrough".',
      hints: ['remainder="passthrough"', 'fit_transform(df)'],
      starterCode: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

df = pd.DataFrame({
    'income': [50000.0, 100000.0],
    'gender': ['M', 'F'],
    'binary_flag': [1, 0]
})

# TODO: build ColumnTransformer
print("Transformed output shape:")
`,
      solution: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

df = pd.DataFrame({
    'income': [50000.0, 100000.0],
    'gender': ['M', 'F'],
    'binary_flag': [1, 0]
})

ct = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['income']),
        ('cat', OneHotEncoder(), ['gender'])
    ],
    remainder='passthrough'
)

out = ct.fit_transform(df)
print("Transformed output shape:", out.shape)
print("Features:", ct.get_feature_names_out())
`,
    },
    summary: {
      keyTakeaways: [
        'ColumnTransformer routes heterogeneous columns to specialized numeric and categorical pipelines.',
        'Pipelines eliminate data leakage by ensuring all transformations fit strictly on training data.',
        'An end-to-end Pipeline packages preprocessing and modeling into a single deployable artifact.',
      ],
      nextLessonId: 'cross-validation-foundations',
      nextLessonTitle: 'Cross-Validation Protocols & Generalization Variance',
      nextLessonModuleId: 'module-2',
    },
  },

  'cross-validation-foundations': {
    id: 'cross-validation-foundations',
    moduleId: 'module-2',
    title: 'Cross-Validation Protocols & Generalization Variance',
    subtitle: 'K-Fold, Repeated Stratified K-Fold, LOOCV & Estimating Performance Stability',
    order: 13,
    readTimeMinutes: 22,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Compare standard K-Fold, Stratified K-Fold, Repeated K-Fold, and Leave-One-Out (LOOCV).',
      'Compute the mean and standard deviation of cross-validation scores to assess generalization variance.',
      'Explain the computational and statistical trade-offs of choosing K (e.g. K=5 vs K=10 vs LOOCV).',
    ],
    prerequisites: ['train-val-test-splitting', 'sampling-central-limit-theorem'],
    analogy: {
      title: 'The Five-Judge Diving Panel',
      text: 'In Olympic diving, the score is never decided by a single judge. If that one judge is in a bad mood, the athlete could be unfairly disqualified. Instead, five independent judges score the dive, and their scores are averaged. Cross-Validation is this panel of judges: instead of evaluating your model on a single random test split, you partition data into K folds, train K independent models, and average their scores to eliminate single-split fluke luck.',
      metaphor: 'Cross-validation averages performance across K different vantage points to eliminate evaluation luck.',
    },
    problemSolved: {
      title: 'Reliably Estimating Model Performance on Finite Data',
      description: 'A single train-test split has high variance: an unlucky split might put all hard examples in the test set, making a great model look terrible. Cross-validation uses every single sample for both training and testing.',
      keyPoints: [
        'Guarantees every observation is tested exactly once.',
        'Yields confidence intervals (mean +/- std) rather than a single noisy point estimate.',
        'Detects model instability: if fold scores vary wildly (0.95, 0.60, 0.90), the model is brittle.',
      ],
    },
    intuition: {
      overview: 'Divide data into K equal chunks (folds). In each of K rounds, use 1 chunk for testing and the remaining K-1 chunks for training. Average all K test scores.',
      steps: [
        { step: 1, title: 'Partition into K Folds', description: 'Split dataset D into K disjoint subsets: D_1, D_2, ..., D_K.' },
        { step: 2, title: 'Train-Test Rotation', description: 'For k = 1 to K: train model on all folds except D_k; evaluate metric on D_k.' },
        { step: 3, title: 'Aggregate Statistics', description: 'Compute overall mean score and standard error across all K folds.' },
      ],
    },
    mathematics: {
      overview: 'Statistical formulation of K-fold cross-validation risk estimator.',
      foundations: [
        {
          name: 'K-Fold Cross-Validation Estimate',
          latex: '\\text{CV}_{(K)} = \\frac{1}{K} \\sum_{k=1}^K \\mathcal{L}\\left( f_{-k}, \\mathcal{D}_k \\right)',
          explanation: 'Average loss where f_{-k} is the model trained without fold k, evaluated on held-out fold k.',
        },
        {
          name: 'Generalization Score Standard Error',
          latex: '\\text{SE}_{\\text{CV}} = \\frac{s_{\\text{CV}}}{\\sqrt{K}} \\quad \\text{where } s_{\\text{CV}} = \\sqrt{\\frac{1}{K - 1} \\sum_{k=1}^K (s_k - \\bar{s})^2}',
          explanation: 'Quantifies uncertainty in the estimated cross-validation metric.',
        },
      ],
    },
    derivation: {
      title: 'The Bias-Variance Tradeoff in Choosing K (K=5 vs LOOCV)',
      objective: 'Explain why Leave-One-Out CV (LOOCV) has low bias but high variance.',
      steps: [
        {
          step: 1,
          label: 'Training Set Size Comparison',
          latex: 'N_{\\text{train, LOOCV}} = N - 1 \\quad \\text{vs} \\quad N_{\\text{train, K=5}} = 0.8 N',
          explanation: 'LOOCV trains on virtually the entire dataset (N-1), so its estimate has almost zero pessimistic bias.',
        },
        {
          step: 2,
          label: 'Correlation Between Surrogate Models',
          latex: '\\text{Overlap}(f_{-i}, f_{-j}) = \\frac{N - 2}{N - 1} \\approx 1.0',
          explanation: 'In LOOCV, any two training sets share N-2 identical samples (99.9% overlap). The K models are almost identical.',
        },
        {
          step: 3,
          label: 'Variance of the Mean of Correlated Variables',
          latex: '\\text{Var}\\left( \\frac{1}{K} \\sum s_k \\right) = \\frac{\\sigma^2}{K} + \\frac{K - 1}{K} \\rho \\sigma^2 \\xrightarrow{K \\to N} \\rho \\sigma^2',
          explanation: 'Because fold models are highly correlated (high rho), averaging them does NOT reduce variance! K=5 or K=10 balances bias and variance optimally.',
        },
      ],
    },
    variables: [
      { symbol: 'K', name: 'Number of Folds', description: 'Number of partitions (standard K = 5 or 10).', dimensions: 'Integer ≥ 2' },
      { symbol: 's_k', name: 'Fold Performance Score', description: 'Evaluation metric on held-out fold k.', dimensions: 'Scalar' },
      { symbol: '\\bar{s}', name: 'Mean CV Score', description: 'Average performance across all K folds.', dimensions: 'Scalar' },
    ],
    numericalExample: {
      scenario: 'A 5-fold cross-validation yields accuracy scores: [0.84, 0.86, 0.85, 0.83, 0.87]. Calculate mean CV accuracy and sample standard deviation.',
      dataset: [{ fold: 1, acc: 0.84 }, { fold: 2, acc: 0.86 }, { fold: 3, acc: 0.85 }, { fold: 4, acc: 0.83 }, { fold: 5, acc: 0.87 }],
      calculations: [
        { step: 'Sum of Scores', math: '0.84 + 0.86 + 0.85 + 0.83 + 0.87', result: '4.25' },
        { step: 'Mean CV Score', math: '4.25 / 5', result: '0.8500 (85.0%)' },
        { step: 'Deviations from Mean', math: '[-0.01, +0.01, 0.00, -0.02, +0.02]', result: 'sum = 0' },
        { step: 'Squared Deviations', math: '0.0001 + 0.0001 + 0.0000 + 0.0004 + 0.0004', result: '0.0010' },
        { step: 'Sample Variance (K-1 = 4)', math: '0.0010 / 4', result: '0.00025' },
        { step: 'Sample Standard Deviation', math: '\\sqrt{0.00025}', result: '0.0158 (1.58%)' },
      ],
      finalConclusion: 'Model generalization accuracy is reported as 85.0% +/- 1.58%, demonstrating high stability across all partitions.',
    },
    visualExplanation: {
      title: 'K-Fold Cross-Validation Data Rotation',
      description: 'The dataset is split into K equal blocks. In Iteration 1, Block 1 is Test (blue) and Blocks 2-5 are Train (grey). In Iteration 2, Block 2 is Test. The process repeats K times so every sample is tested once.',
      features: ['5 Iterations', '100% data coverage', 'Averaged score report'],
    },
    scratchCode: {
      title: 'K-Fold Cross-Validation Loop in Pure NumPy',
      explanation: 'Generate train and test index arrays manually without external libraries.',
      code: `import numpy as np

def manual_kfold_indices(n_samples: int, k: int = 5):
    indices = np.arange(n_samples)
    fold_size = n_samples // k
    folds = []
    
    for i in range(k):
        test_start = i * fold_size
        test_end = (i + 1) * fold_size if i < k - 1 else n_samples
        
        test_idx = indices[test_start:test_end]
        train_idx = np.concatenate([indices[:test_start], indices[test_end:]])
        folds.append((train_idx, test_idx))
        
    return folds

folds = manual_kfold_indices(n_samples=10, k=3)
for i, (tr, te) in enumerate(folds):
    print(f"Fold {i+1}: Train {tr.tolist()}, Test {te.tolist()}")
`,
    },
    sklearnCode: {
      title: 'RepeatedStratifiedKFold with cross_val_score',
      explanation: 'Gold standard cross-validation: 5 folds repeated 3 times with different random seeds.',
      code: `import numpy as np
from sklearn.model_selection import RepeatedStratifiedKFold, cross_val_score
from sklearn.linear_model import LogisticRegression

X = np.random.randn(60, 2)
y = np.array([0]*45 + [1]*15)

# 5 folds x 3 repeats = 15 evaluation rounds
rskf = RepeatedStratifiedKFold(n_splits=5, n_repeats=3, random_state=42)
scores = cross_val_score(LogisticRegression(), X, y, cv=rskf, scoring='accuracy')

print(f"Mean Accuracy: {np.mean(scores)*100:.2f}%")
print(f"Std Deviation: {np.std(scores)*100:.2f}%")
`,
    },
    runnableCode: {
      code: `import numpy as np
from sklearn.model_selection import KFold, cross_val_score
from sklearn.linear_model import LinearRegression

X = np.linspace(0, 10, 50).reshape(-1, 1)
y = 2.0 * X.flatten() + 1.0 + np.random.normal(0, 0.5, 50)

kf = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(LinearRegression(), X, y, cv=kf, scoring='r2')

print(f"Fold R^2 Scores: {np.round(scores, 4)}")
print(f"Mean R^2: {np.mean(scores):.4f} +/- {np.std(scores):.4f}")
`,
      expectedOutput: `Fold R^2 Scores: [0.9904 0.994  0.9935 0.9938 0.9922]\nMean R^2: 0.9928 +/- 0.0013`,
    },
    lineByLineExplanation: [
      { lines: 'Line 7', codeSnippet: 'kf = KFold(n_splits=5, shuffle=True, random_state=42)', explanation: 'Configures 5 randomized splits.' },
      { lines: 'Line 8', codeSnippet: 'scores = cross_val_score(..., scoring=\'r2\')', explanation: 'Trains 5 models and returns R^2 for each test fold.' },
      { lines: 'Line 11', codeSnippet: 'print(f"Mean R^2: {np.mean(scores):.4f} +/- {np.std(scores):.4f}")', explanation: 'Summarizes mean generalization quality with uncertainty bounds.' },
    ],
    hyperparameters: [
      { name: 'n_splits (K)', defaultVal: '5', range: '[3, 20]', effect: 'Number of cross-validation partitions.', recommendation: 'Use K=5 for fast iteration; use K=10 for formal benchmark reporting.' },
      { name: 'shuffle', defaultVal: 'True', range: '[True, False]', effect: 'Shuffles indices before partitioning.', recommendation: 'Always set shuffle=True to eliminate sorting artifacts in source datasets.' },
    ],
    assumptions: [
      { assumption: 'Fold Independence from Leakage', whyItMatters: 'If preprocessing was fitted outside the CV loop, cross-validation scores are biased and untrustworthy.', howToVerify: 'Always wrap preprocessors in Pipelines.' },
    ],
    commonMistakes: [
      { mistake: 'Refitting the model on the whole dataset after CV and reporting the CV score as test score', solution: 'The final model trained on 100% of data has no out-of-sample score. The CV score is an estimate of how that final model will perform on future unseen data.' },
    ],
    realWorldUseCases: [
      { industry: 'Machine Learning Competitions (Kaggle)', application: 'Local CV Scheme Alignment', benefit: 'Setting up a local 5-fold Stratified CV scheme that correlates perfectly with the competition leaderboard allows rapid model iteration without wasting daily submissions.' },
    ],
    practiceQuestions: [
      { id: 'pq-cv-1', question: 'Why is K=5 or K=10 generally preferred over Leave-One-Out Cross-Validation (LOOCV)?', hint: 'Consider computation time and correlation between models.', answer: 'LOOCV requires training N models (very slow on large datasets). More importantly, the N models are trained on almost identical data (99.9% overlap), making fold estimates highly correlated. Averaging highly correlated variables yields higher variance than K=5 or K=10.' },
    ],
    quiz: [
      {
        id: 'quiz-cv-1',
        question: 'What is the primary advantage of Repeated Stratified K-Fold cross-validation over standard K-Fold?',
        options: [
          'It runs 100 times faster.',
          'It preserves class proportions in every fold and repeats with different random splits to produce a more reliable variance estimate.',
          'It eliminates the need for a training set.',
          'It guarantees 100% accuracy.',
        ],
        correctIndex: 1,
        explanation: 'Repeated Stratified K-Fold preserves class balance in all folds and averages across multiple different split permutations, producing the most statistically stable generalization estimate.',
      },
    ],
    independentExercise: {
      title: 'Implement Custom Cross-Validation Scoring Script',
      problem: 'Write a function cv_summary(model, X, y, k=5) that computes 5-fold cross-validation and returns a formatted dictionary with: mean_score, std_score, min_score, max_score.',
      hints: ['from sklearn.model_selection import cross_val_score', 'Calculate np.mean, np.std, np.min, np.max'],
      starterCode: `import numpy as np
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

def cv_summary(model, X, y, k=5):
    # TODO: return summary dict
    return {}

X = np.random.randn(50, 2)
y = X[:, 0] * 3.0 + np.random.randn(50) * 0.5
print(cv_summary(Ridge(), X, y, k=5))
`,
      solution: `import numpy as np
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

def cv_summary(model, X, y, k=5):
    scores = cross_val_score(model, X, y, cv=k)
    return {
        'mean': round(float(np.mean(scores)), 4),
        'std': round(float(np.std(scores)), 4),
        'min': round(float(np.min(scores)), 4),
        'max': round(float(np.max(scores)), 4)
    }

X = np.random.randn(50, 2)
y = X[:, 0] * 3.0 + np.random.randn(50) * 0.5
print(cv_summary(Ridge(), X, y, k=5))
`,
    },
    summary: {
      keyTakeaways: [
        'K-Fold cross-validation uses every sample for both training and testing, eliminating single-split fluke variance.',
        'K=5 and K=10 provide the optimal balance between statistical bias, variance, and compute cost.',
        'Always report both mean and standard deviation (mean +/- std) to quantify model stability.',
      ],
      nextLessonId: 'linear-regression',
      nextLessonTitle: 'Simple & Multiple Linear Regression: Ordinary Least Squares (OLS)',
      nextLessonModuleId: 'module-3',
    },
  },
};
