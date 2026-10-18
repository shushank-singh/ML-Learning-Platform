const path = require('path');
const { getExistingPyLessons } = require('./extract-landmarks');
const { writePythonModuleFile } = require('./writer');

// ==========================================
// Python Module 11: Python for Data Science
// ==========================================
const m11 = getExistingPyLessons(11);
const m11Lessons = { ...m11.lessons };

m11Lessons['py-ds-pandas'] = {
  id: 'py-ds-pandas',
  moduleId: 'python-module-11',
  title: 'Pandas Data Manipulation',
  subtitle: 'Series, DataFrame, iloc vs loc, GroupBy, Merging, and Handling Missing Values',
  order: 2,
  readTimeMinutes: 35,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Master core Pandas 2D tabular structures: Series (1D labelled) and DataFrame (2D labelled).',
    'Distinguish integer-position indexing (`iloc`) from label-based indexing (`loc`).',
    'Filter, slice, and query rows using boolean masks and `.query()`.',
    'Perform split-apply-combine aggregations with `.groupby()` and table reshaping with `.merge()`, `.pivot_table()`.'
  ],
  prerequisites: ['Python dictionaries, lists, and NumPy basics.'],
  analogy: {
    title: 'The Supercharged Relational Spreadsheet',
    text: 'A Python list-of-dicts is like paper index cards in a shoebox. A Pandas DataFrame is a financial spreadsheet with millions of rows running on a supercomputer: every column has a strict C-type, every row has a fast index, and with one command (`df.groupby("region")["revenue"].sum()`), it aggregates millions of transactions in milliseconds.',
    metaphor: 'Pandas brings SQL-like relational power and Excel-like tabular indexing into pure Python.'
  },
  problemSolved: {
    title: 'High-Performance Tabular Wrangling and Cleaning',
    description: 'Raw real-world data contains nulls, misaligned timestamps, and categorical text across heterogeneous columns. Pandas provides vectorized data manipulation and relational algebra without manual for-loops.',
    keyPoints: [
      '`df.loc[row_label, col_label]` is label-based indexing (inclusive of end bounds).',
      '`df.iloc[row_idx, col_idx]` is 0-based integer position indexing (half-open, exclusive of stop).',
      'Missing values are represented as `np.nan` or `pd.NA`, detected with `.isna()`, and filled with `.fillna()` or dropped with `.dropna()`.',
      'Split-Apply-Combine with `.groupby()` aggregates data by groups in parallel.'
    ]
  },
  intuition: {
    overview: 'A DataFrame is essentially an ordered collection of NumPy arrays aligned by a shared Index object. Vectorized column operations execute in contiguous C memory buffers.',
    steps: [
      { step: 1, title: 'Alignment', description: 'Operations align automatically on row and column index labels.' },
      { step: 2, title: 'Vectorized Transform', description: 'Applies SIMD-accelerated array transformations column-wise.' },
      { step: 3, title: 'Aggregation', description: 'Reduces grouped partitions into summary metrics.' }
    ]
  },
  codeExample: {
    title: 'Pandas DataFrame Wrangling and GroupBy Aggregations',
    code: `import pandas as pd
import numpy as np

# Creating DataFrame from dict
data = {
    "department": ["Eng", "Eng", "HR", "Sales", "Sales"],
    "employee": ["Alice", "Bob", "Charlie", "Diana", "Eve"],
    "salary": [120_000, 110_000, 85_000, 95_000, np.nan],
    "years": [5, 3, 4, 2, 1]
}
df = pd.DataFrame(data)

# Handling missing values
df["salary"] = df["salary"].fillna(df["salary"].median())

# Label-based vs Position-based indexing
first_emp_salary = df.loc[0, "salary"]     # loc by labels
first_cell = df.iloc[0, 0]                 # iloc by integer positions

# GroupBy split-apply-combine
dept_stats = df.groupby("department")["salary"].agg(["mean", "count"]).round(2)
print("Department Salary Stats:\\n", dept_stats)`,
    explanation: 'Demonstrates creating DataFrames, filling missing values, using loc and iloc, and computing groupby aggregations.'
  },
  runnableCode: {
    code: `# Simulating core Pandas DataFrame mechanics in pure Python
class MiniDataFrame:
    def __init__(self, data):
        self.data = data
        self.columns = list(data.keys())

    def filter_by(self, column, threshold):
        indices = [i for i, val in enumerate(self.data[column]) if val > threshold]
        return {col: [self.data[col][i] for i in indices] for col in self.columns}

df = MiniDataFrame({"name": ["Alice", "Bob", "Charlie"], "score": [92, 78, 88]})
filtered = df.filter_by("score", 80)
print("Students with score > 80:", filtered["name"])`,
    expectedOutput: `Students with score > 80: ['Alice', 'Charlie']`
  },
  lineByLine: [
    { line: 7, code: '        indices = [i for i, val in enumerate(self.data[column]) if val > threshold]', explanation: 'Vectorized boolean mask indexing simulation.' },
    { line: 8, code: '        return {col: [self.data[col][i] for i in indices] ...}', explanation: 'Filters all columns by matching row indices.' }
  ],
  commonMistakes: [
    {
      mistake: 'Iterating over DataFrame rows with a Python for loop: `for idx, row in df.iterrows():`.',
      whyWrong: 'Extremely slow: destroys vectorization, creating a new Series object for every single row.',
      howToFix: 'Use vectorized operations: `df["total"] = df["price"] * df["qty"]` or `.apply()` as a last resort.'
    },
    {
      mistake: 'Triggering SettingWithCopyWarning by chaining brackets: `df[df["A"] > 5]["B"] = 10`.',
      whyWrong: 'Unclear whether modifying a view or a copy; modification may silently fail to update original DataFrame.',
      howToFix: 'Always use `.loc`: `df.loc[df["A"] > 5, "B"] = 10`.'
    }
  ],
  realWorldApplications: [
    { title: 'Financial Portfolio Analysis', description: 'Merging stock ticker pricing history with company fundamentals and calculating rolling returns.' },
    { title: 'Customer Churn Modeling', description: 'Feature engineering aggregated transaction frequencies, recency, and monetary values.' }
  ],
  practiceQuestions: [
    { question: 'What is the primary difference between `df.loc` and `df.iloc`?', hint: 'Labels vs integer positions.', answer: '`df.loc` selects rows and columns by index labels (names); `df.iloc` selects strictly by integer position (0, 1, 2...).' },
    { question: 'Why should you avoid using `for row in df.iterrows():` for calculations?', hint: 'Vectorization vs iteration.', answer: 'Because row iteration converts each row into a Python Series object, running hundreds of times slower than vectorized column operations.' },
    { question: 'What method drops rows containing any missing (NaN) values in a DataFrame?', hint: 'Method name.', answer: '`df.dropna()`.' }
  ],
  quiz: [
    {
      question: 'Which method computes summary statistics (mean, std, min, max, quartiles) for all numeric columns in a DataFrame?',
      options: ['df.summary()', 'df.describe()', 'df.stats()', 'df.info()'],
      correctAnswer: 1,
      explanation: '`df.describe()` generates descriptive summary statistics for numeric columns.'
    },
    {
      question: 'What is the recommended way to avoid SettingWithCopyWarning when updating a filtered subset?',
      options: ['Use df.copy() only', 'Use df.loc[condition, column] = value', 'Disable warnings globally', 'Use df.iloc'],
      correctAnswer: 1,
      explanation: 'Using `df.loc[condition, column] = value` ensures direct assignment to the target memory.'
    },
    {
      question: 'In `df.loc["a":"c"]`, are the end boundary elements inclusive or exclusive?',
      options: ['Exclusive (standard Python slicing)', 'Inclusive of "c"', 'It raises an error', 'Random'],
      correctAnswer: 1,
      explanation: 'Unlike standard Python integer slicing, `df.loc` label slicing is INCLUSIVE of the stop boundary.'
    }
  ],
  codingChallenge: {
    title: 'Calculate Column Mean with Fallback',
    difficulty: 'Intermediate',
    description: 'Write a function `clean_and_mean(records: list[dict], target_col: str, fill_value: float) -> float` that takes a list of row dictionaries (where `target_col` might be missing or `None`), replaces missing values with `fill_value`, and returns the average rounded to 2 decimal places. Return `0.0` if records is empty.',
    starterCode: `def clean_and_mean(records: list[dict], target_col: str, fill_value: float) -> float:
    # Write your solution here
    pass`,
    hints: [
      'If not records: return 0.0.',
      'Extract values: val = r.get(target_col); if val is None: val = fill_value.',
      'Compute sum(vals) / len(vals) and round to 2.'
    ],
    solution: `def clean_and_mean(records: list[dict], target_col: str, fill_value: float) -> float:
    if not records:
        return 0.0
    values = [float(r.get(target_col) if r.get(target_col) is not None else fill_value) for r in records]
    return round(sum(values) / len(values), 2)`,
    testCases: [
      { input: '[{"val": 10}, {"val": None}, {"val": 20}], "val", 0.0', expectedOutput: '10.0' }
    ]
  }
};

m11Lessons['py-ds-matplotlib'] = {
  id: 'py-ds-matplotlib',
  moduleId: 'python-module-11',
  title: 'Data Visualization with Matplotlib',
  subtitle: 'Figure and Axes Object-Oriented API, Subplots, Styling, and Exporting',
  order: 3,
  readTimeMinutes: 28,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Master the Object-Oriented Matplotlib API (`fig, ax = plt.subplots()`).',
    'Understand the hierarchy: Figure -> Axes -> Axis -> Ticks, Spines, and Labels.',
    'Plot core visualization types: line plots, bar charts, scatter plots, and histograms.',
    'Customize titles, legends, grid lines, color palettes, and export high-DPI figures (`fig.savefig`).'
  ],
  prerequisites: ['Python basics and NumPy arrays.'],
  analogy: {
    title: 'The Artist\'s Canvas and Gallery Frames',
    text: 'A `Figure` is the physical blank wooden canvas frame hung on an art gallery wall. An `Axes` (with an "e", plural of axis) is an individual painting panel mounted onto that canvas. A single canvas can hold one large painting (`plt.subplots(1, 1)`), or a 2x2 collage of four separate paintings (`plt.subplots(2, 2)`). You paint data points onto the Axes panel, not onto the gallery floor.',
    metaphor: 'Figure is the window/page; Axes is the plotting area where data is drawn.'
  },
  problemSolved: {
    title: 'Communicating Data Insights Visually and Spotting Hidden Trends',
    description: 'Raw numbers in a table obscure trends, outliers, clusters, and distributions. Anscombe\'s Quartet proved that datasets with identical means and variances look completely different when plotted. Matplotlib turns data into visual graphics.',
    keyPoints: [
      'Always prefer the Object-Oriented interface (`fig, ax = plt.subplots()`) over the stateful MATLAB-style `plt.plot()` interface.',
      '`ax.plot()` for continuous lines, `ax.scatter()` for point relationships, `ax.bar()` for categories, `ax.hist()` for distributions.',
      '`fig.tight_layout()` adjusts spacing to prevent labels from overlapping axes.',
      '`fig.savefig("chart.png", dpi=300, bbox_inches="tight")` exports crisp publication-ready images.'
    ]
  },
  intuition: {
    overview: 'Matplotlib builds a visual scene graph of Artists (lines, patches, text) attached to an Axes container, which is rendered by a raster (PNG) or vector (SVG/PDF) backend.',
    steps: [
      { step: 1, title: 'Create Canvas', description: 'fig, ax = plt.subplots() initializes figure and plotting axes.' },
      { step: 2, title: 'Draw Data', description: 'Calls ax.plot(x, y), ax.scatter(), or ax.hist() to add artist objects.' },
      { step: 3, title: 'Label & Save', description: 'Configures ax.set_title(), ax.set_xlabel(), and exports via fig.savefig().' }
    ]
  },
  codeExample: {
    title: 'Clean Object-Oriented Multi-Panel Visualization',
    code: `import matplotlib.pyplot as plt
import numpy as np

# Generate sample synthetic data
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# Object-Oriented 1x2 Subplot Grid
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4), dpi=100)

# Left Panel: Sine wave
ax1.plot(x, y1, color="#2563eb", linewidth=2, label="sin(x)")
ax1.set_title("Sine Wave Harmonic")
ax1.set_xlabel("Time (radians)")
ax1.set_ylabel("Amplitude")
ax1.grid(True, linestyle="--", alpha=0.6)
ax1.legend()

# Right Panel: Cosine wave
ax2.plot(x, y2, color="#dc2626", linewidth=2, linestyle="--", label="cos(x)")
ax2.set_title("Cosine Wave Phase")
ax2.set_xlabel("Time (radians)")
ax2.grid(True, linestyle="--", alpha=0.6)
ax2.legend()

fig.tight_layout()
# fig.savefig("harmonics.png", dpi=300, bbox_inches="tight")
print("Figure rendered with 2 axes panels!")`,
    explanation: 'Demonstrates creating a 1x2 grid of subplots using the Object-Oriented API, styling lines, adding labels, and configuring grids.'
  },
  runnableCode: {
    code: `# Inspecting Matplotlib components without GUI display
class MockAxes:
    def __init__(self):
        self.elements = []
        self.labels = {}
        
    def plot(self, x, y, label=None):
        self.elements.append({"type": "line", "points": len(x), "label": label})
        
    def set_title(self, title):
        self.labels["title"] = title

ax = MockAxes()
ax.plot([1, 2, 3], [10, 20, 30], label="growth")
ax.set_title("Quarterly Growth")

print("Plot elements:", ax.elements)
print("Axes title:", ax.labels["title"])`,
    expectedOutput: `Plot elements: [{'type': 'line', 'points': 3, 'label': 'growth'}]
Axes title: Quarterly Growth`
  },
  lineByLine: [
    { line: 7, code: '    def plot(self, x, y, label=None):', explanation: 'Adds line artist to axes.' },
    { line: 15, code: 'ax.set_title("Quarterly Growth")', explanation: 'Sets title metadata on axes container.' }
  ],
  commonMistakes: [
    {
      mistake: 'Mixing the stateful `plt.plot()` syntax with the object-oriented `ax.plot()` syntax in the same script.',
      whyWrong: 'Leads to confusing bugs where settings are applied to the wrong active subplot.',
      howToFix: 'Standardize on the OO interface: `fig, ax = plt.subplots(); ax.plot()`.'
    },
    {
      mistake: 'Forgetting `bbox_inches="tight"` when calling `fig.savefig()`.',
      whyWrong: 'Axis tick labels and legends near image borders are often cropped off.',
      howToFix: 'Always include `fig.savefig("plot.png", bbox_inches="tight")`.'
    }
  ],
  realWorldApplications: [
    { title: 'Machine Learning Training Loss Curves', description: 'Plotting epoch-by-epoch training vs validation loss to diagnose overfitting.' },
    { title: 'Scientific Publishing', description: 'Generating PDF and EPS vector figures for academic journals.' }
  ],
  practiceQuestions: [
    { question: 'What is the difference between a `Figure` and an `Axes` in Matplotlib?', hint: 'Canvas vs plot panel.', answer: '`Figure` is the top-level window/canvas; `Axes` is the actual plotting area with axes, ticks, and data artists.' },
    { question: 'What standard method creates both a Figure and one or more Axes in a single call?', hint: 'Subplots function.', answer: '`plt.subplots(nrows, ncols)`.' },
    { question: 'What parameter in `fig.savefig()` prevents axis labels from being clipped at the image edges?', hint: 'Bounding box setting.', answer: '`bbox_inches="tight"`.' }
  ],
  quiz: [
    {
      question: 'Which method creates a scatter plot on an Axes object?',
      options: ['ax.dots()', 'ax.points()', 'ax.scatter()', 'ax.plot_scatter()'],
      correctAnswer: 2,
      explanation: '`ax.scatter(x, y)` draws scatter plot markers.'
    },
    {
      question: 'How do you display a legend for labeled lines on an Axes?',
      options: ['ax.show_legend()', 'ax.legend()', 'fig.legend_display()', 'plt.enable_legend()'],
      correctAnswer: 1,
      explanation: '`ax.legend()` renders the legend using the `label` attributes of plotted artists.'
    },
    {
      question: 'What is Anscombe\'s Quartet famous for demonstrating?',
      options: ['How to sort arrays in O(N)', 'Why data visualization is critical because datasets with identical summary statistics can look wildly different', 'How to compute matrix inverses', 'A musical algorithm'],
      correctAnswer: 1,
      explanation: 'Anscombe\'s quartet comprises four datasets with identical statistical properties (mean, variance, correlation) that exhibit distinct shapes when plotted.'
    }
  ],
  codingChallenge: {
    title: 'Calculate Histogram Bins and Counts',
    difficulty: 'Intermediate',
    description: 'Write a function `compute_histogram_bins(values: list[float], num_bins: int) -> tuple[list[float], list[int]]` that calculates equal-width bin edges from min(values) to max(values), and counts how many values fall into each bin `[bin_left, bin_right)` (with the last bin inclusive of max). If values is empty, return `([], [])`.',
    starterCode: `def compute_histogram_bins(values: list[float], num_bins: int) -> tuple[list[float], list[int]]:
    # Write your solution here
    pass`,
    hints: [
      'If not values: return [], [].',
      'min_val = min(values); max_val = max(values); width = (max_val - min_val) / num_bins.',
      'Construct bin edges: [min_val + i * width for i in range(num_bins + 1)].',
      'Tally counts in each interval.'
    ],
    solution: `def compute_histogram_bins(values: list[float], num_bins: int) -> tuple[list[float], list[int]]:
    if not values or num_bins <= 0:
        return [], []
    min_v, max_v = float(min(values)), float(max(values))
    if min_v == max_v:
        return [min_v, max_v], [len(values)]
    width = (max_v - min_v) / num_bins
    edges = [round(min_v + i * width, 4) for i in range(num_bins + 1)]
    counts = [0] * num_bins
    for v in values:
        idx = int((v - min_v) / width)
        if idx >= num_bins:
            idx = num_bins - 1
        counts[idx] += 1
    return edges, counts`,
    testCases: [
      { input: '[1.0, 2.0, 3.0, 4.0], 2', expectedOutput: '([1.0, 2.5, 4.0], [2, 2])' }
    ]
  }
};

m11Lessons['py-ds-data-cleaning'] = {
  id: 'py-ds-data-cleaning',
  moduleId: 'python-module-11',
  title: 'Data Cleaning and Exploratory Analysis',
  subtitle: 'Missing Data Imputation, IQR Outlier Detection, Feature Scaling, and Correlation',
  order: 4,
  readTimeMinutes: 30,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Execute systematic Exploratory Data Analysis (EDA): inspect shapes, dtypes, null distributions.',
    'Apply principled missing value imputation: mean, median, mode, or domain indicators.',
    'Detect and treat anomalies using the Interquartile Range (IQR) and Z-score methods.',
    'Compute correlation matrices (`df.corr()`) and identify multicollinearity.'
  ],
  prerequisites: ['Pandas, NumPy, and basic statistics.'],
  analogy: {
    title: 'The Raw Ore Smelter and Refinement Refinery',
    text: 'Raw data extracted from databases is not shiny 24-karat gold; it is rocky ore loaded with dirt (missing values), sulfur contaminations (outlier glitches like negative ages), and uneven moisture content (different units and scales). Data cleaning is the smelting refinery: you blast away impurities and refine the metals so the downstream manufacturing line (Machine Learning models) doesn\'t jam and break.',
    metaphor: 'Garbage in, garbage out: clean data is the foundation of accurate models.'
  },
  problemSolved: {
    title: 'Preparing Real-World Messy Data for Machine Learning',
    description: 'Machine learning algorithms crash when given null values and produce distorted predictions when contaminated by extreme data-entry typos. Rigorous EDA and cleaning guarantees model validity.',
    keyPoints: [
      'Median imputation is robust against outliers; mean imputation is sensitive to extreme values.',
      'IQR rule: outliers lie outside `[Q1 - 1.5 * IQR, Q3 + 1.5 * IQR]`.',
      'Pearson correlation measures linear relationships (-1.0 to +1.0).',
      'Never impute test set data using test set statistics (data leakage); fit on train, apply to test.'
    ]
  },
  intuition: {
    overview: 'Cleaning normalizes raw records into stationary, consistent distributions without leaking future information.',
    steps: [
      { step: 1, title: 'Audit Nulls', description: 'Quantify missingness percentage per column with df.isna().mean().' },
      { step: 2, title: 'Outlier Truncation', description: 'Clamp or filter extreme values using IQR thresholds.' },
      { step: 3, title: 'Feature Scaling', description: 'Standardize features to zero mean and unit variance.' }
    ]
  },
  codeExample: {
    title: 'Systematic EDA and IQR Outlier Removal Pipeline',
    code: `import numpy as np

def detect_outliers_iqr(data: list[float]) -> tuple[float, float, list[float]]:
    """Detect outliers using Interquartile Range (IQR) rule."""
    q25, q75 = np.percentile(data, [25, 75])
    iqr = q75 - q25
    lower_bound = q25 - (1.5 * iqr)
    upper_bound = q75 + (1.5 * iqr)
    
    outliers = [x for x in data if x < lower_bound or x > upper_bound]
    clean_data = [x for x in data if lower_bound <= x <= upper_bound]
    return lower_bound, upper_bound, clean_data

# Simulated dataset with extreme entry errors
ages = [22, 25, 29, 31, 35, 38, 42, 45, 180, -5] # 180 and -5 are outliers!
low, high, cleaned = detect_outliers_iqr(ages)
print(f"Valid age range: [{low:.1f}, {high:.1f}]")
print(f"Cleaned count: {len(cleaned)} / {len(ages)}")`,
    explanation: 'Demonstrates computing percentiles, IQR, outlier thresholds, and filtering corrupted values.'
  },
  runnableCode: {
    code: `import numpy as np

# Z-score outlier detection: |z| > 3
vals = [10, 11, 12, 10, 11, 100, 12, 11]
mean = np.mean(vals)
std = np.std(vals)
z_scores = [(x - mean) / std for x in vals]

outliers = [vals[i] for i, z in enumerate(z_scores) if abs(z) > 2.0]
print("Detected outliers with |z| > 2:", outliers)`,
    expectedOutput: `Detected outliers with |z| > 2: [100]`
  },
  lineByLine: [
    { line: 5, code: 'mean = np.mean(vals); std = np.std(vals)', explanation: 'Calculates mean and standard deviation.' },
    { line: 6, code: 'z_scores = [(x - mean) / std for x in vals]', explanation: 'Computes standard score (number of std devs from mean).' },
    { line: 8, code: 'outliers = [vals[i] for i, z in enumerate(z_scores) ...]', explanation: 'Identifies values exceeding 2 standard deviations.' }
  ],
  commonMistakes: [
    {
      mistake: 'Imputing missing values using the mean of columns with heavy skew or extreme outliers.',
      whyWrong: 'A single billionaire in an income dataset shifts the mean by millions, imputing unrealistic values for missing citizens.',
      howToFix: 'Use the median, which is resistant to extreme outliers.'
    },
    {
      mistake: 'Calculating imputation statistics on the entire dataset BEFORE train/test split.',
      whyWrong: 'Data Leakage: test set information leaks into training data, producing overly optimistic validation scores.',
      howToFix: 'Always split into train and test sets FIRST, compute statistics on train only, and apply to both.'
    }
  ],
  realWorldApplications: [
    { title: 'Credit Risk Scoring', description: 'Cleaning credit bureau histories, imputing missing employment durations, and capping debt-to-income outliers.' },
    { title: 'IoT Sensor Streams', description: 'Filtering sensor dropouts (zeros or nulls) from factory temperature sensors.' }
  ],
  practiceQuestions: [
    { question: 'What is the formula for the Interquartile Range (IQR)?', hint: 'Third and first quartiles.', answer: '`IQR = Q3 - Q1` (the 75th percentile minus the 25th percentile).' },
    { question: 'Why is the median preferred over the mean for imputing skewed distributions?', hint: 'Robustness.', answer: 'The median is a robust statistic resistant to extreme outliers, whereas the mean is easily distorted by a single extreme value.' },
    { question: 'What is "data leakage" in the context of preprocessing and normalization?', hint: 'Train vs test boundary.', answer: 'When information from the test or validation set is inadvertently used to train or normalize the model (e.g. scaling using whole-dataset statistics).' }
  ],
  quiz: [
    {
      question: 'Under the standard Tukey IQR rule, what threshold defines an upper outlier?',
      options: ['Q3 + 1.0 * IQR', 'Q3 + 1.5 * IQR', 'Mean + 2 * std', 'Median + IQR'],
      correctAnswer: 1,
      explanation: 'Values above `Q3 + 1.5 * IQR` are classified as outliers.'
    },
    {
      question: 'What does a Pearson correlation coefficient of -0.92 indicate?',
      options: ['No relationship', 'Strong negative linear relationship', 'Weak positive relationship', 'Zero variance'],
      correctAnswer: 1,
      explanation: 'Values close to -1.0 indicate a strong negative linear correlation.'
    },
    {
      question: 'Which Pandas method identifies the count of null values per column in a DataFrame?',
      options: ['df.isnull().sum()', 'df.count_nulls()', 'df.empty_cells()', 'df.check_na()'],
      correctAnswer: 0,
      explanation: '`df.isnull().sum()` (or `df.isna().sum()`) tallies missing values per column.'
    }
  ],
  codingChallenge: {
    title: 'Standardize Features to Z-Score',
    difficulty: 'Intermediate',
    description: 'Write a function `standardize(features: list[float]) -> list[float]` that standardizes a list of floats to zero mean and unit variance: `(x - mean) / std`. If std is 0 (all values identical) or list has < 2 items, return a list of `0.0` with the same length. Round results to 4 decimal places.',
    starterCode: `def standardize(features: list[float]) -> list[float]:
    # Write your solution here
    pass`,
    hints: [
      'mean = sum(features) / len(features).',
      'variance = sum((x - mean)**2 for x in features) / len(features).',
      'std = variance ** 0.5.',
      'If std == 0: return [0.0] * len(features).'
    ],
    solution: `def standardize(features: list[float]) -> list[float]:
    if len(features) < 2:
        return [0.0] * len(features)
    mean = sum(features) / len(features)
    var = sum((x - mean) ** 2 for x in features) / len(features)
    std = var ** 0.5
    if std == 0:
        return [0.0] * len(features)
    return [round((x - mean) / std, 4) for x in features]`,
    testCases: [
      { input: '[10.0, 20.0, 30.0]', expectedOutput: '[-1.2247, 0.0, 1.2247]' },
      { input: '[5.0, 5.0]', expectedOutput: '[0.0, 0.0]' }
    ]
  }
};

m11Lessons['py-ds-sklearn'] = {
  id: 'py-ds-sklearn',
  moduleId: 'python-module-11',
  title: 'Scikit-learn Integration',
  subtitle: 'The Unified Estimator API: fit, transform, predict, train_test_split, and Metrics',
  order: 5,
  readTimeMinutes: 28,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Master the unified Scikit-learn Estimator API: `fit()`, `transform()`, and `predict()`.',
    'Split datasets into training and evaluation sets using `train_test_split()` with stratification.',
    'Train regression and classification estimators (LinearRegression, DecisionTreeClassifier).',
    'Evaluate models using appropriate metrics: Accuracy, Precision, Recall, F1-Score, and Mean Squared Error.'
  ],
  prerequisites: ['Python OOP, NumPy vectorization, and data cleaning.'],
  analogy: {
    title: 'The Standardized Universal Diagnostic Tool',
    text: 'Before Scikit-learn, every machine learning algorithm had a completely different API: one library used `.train_model()`, another used `.learn()`, a third used `.run()`. Scikit-learn is the standard power outlet of data science: whether you plug in a Linear Regression toaster, a Random Forest vacuum cleaner, or a Support Vector Machine television, every single device has the exact same three-prong plug (`.fit()`, `.predict()`).',
    metaphor: 'The unified Estimator API makes all machine learning algorithms interchangeable.'
  },
  problemSolved: {
    title: 'Interchangeable Machine Learning Workflows Without Rewriting Code',
    description: 'Swapping a linear model for an advanced gradient-boosted tree in Scikit-learn requires changing a single import line. The Estimator contract guarantees consistent training, prediction, and evaluation workflows.',
    keyPoints: [
      'Estimators implement `fit(X, y)` to learn parameters from training data.',
      'Transformers implement `transform(X)` (and `fit_transform(X)`) to preprocess feature matrices.',
      'Predictors implement `predict(X)` to generate predictions on unseen data.',
      'Features `X` must be a 2D array-like `(n_samples, n_features)`; targets `y` are typically a 1D array `(n_samples,)`.'
    ]
  },
  intuition: {
    overview: 'Scikit-learn stores learned model parameters with a trailing underscore (e.g. `model.coef_`, `model.intercept_`) to distinguish them from hyperparameters passed to `__init__`.',
    steps: [
      { step: 1, title: 'Instantiate', description: 'Model is configured with hyperparameters: model = LogisticRegression(C=1.0).' },
      { step: 2, title: 'Fit', description: 'model.fit(X_train, y_train) optimizes internal weights on training data.' },
      { step: 3, title: 'Predict & Evaluate', description: 'predictions = model.predict(X_test); evaluate with accuracy_score(y_test, predictions).' }
    ]
  },
  codeExample: {
    title: 'Complete Train-Test-Predict Workflow with Scikit-learn',
    code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

# Synthetic classification dataset (100 samples, 2 features)
np.random.seed(42)
X = np.random.randn(100, 2)
# Class 1 if sum > 0 else 0
y = (X[:, 0] + X[:, 1] > 0).astype(int)

# 1. Stratified train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

# 2. Instantiate and fit estimator
model = LogisticRegression()
model.fit(X_train, y_train)

# 3. Predict on unseen test data
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Test Accuracy: {acc * 100:.1f}%")
print("Learned coefficients (coef_):", model.coef_)`,
    explanation: 'Demonstrates a complete Scikit-learn workflow from train_test_split to model.fit, model.predict, and evaluation metrics.'
  },
  runnableCode: {
    code: `# Simulating Scikit-learn Estimator API contract in pure Python
class SimpleLinearRegressor:
    def __init__(self):
        self.slope_ = None
        self.intercept_ = None

    def fit(self, X, y):
        # Closed form 1D linear regression
        x_vals = [row[0] for row in X]
        x_mean = sum(x_vals) / len(x_vals)
        y_mean = sum(y) / len(y)
        self.slope_ = sum((x - x_mean) * (y[i] - y_mean) for i, x in enumerate(x_vals)) / sum((x - x_mean)**2 for x in x_vals)
        self.intercept_ = y_mean - (self.slope_ * x_mean)
        return self

    def predict(self, X):
        return [round(self.slope_ * row[0] + self.intercept_, 2) for row in X]

reg = SimpleLinearRegressor()
reg.fit([[1], [2], [3]], [2, 4, 6])
print("Predicted values for [[4], [5]]:", reg.predict([[4], [5]]))`,
    expectedOutput: `Predicted values for [[4], [5]]: [8.0, 10.0]`
  },
  lineByLine: [
    { line: 7, code: '    def fit(self, X, y):', explanation: 'Learns parameters, storing in trailing underscore attributes slope_ and intercept_.' },
    { line: 15, code: '    def predict(self, X):', explanation: 'Generates predictions on new feature samples.' }
  ],
  commonMistakes: [
    {
      mistake: 'Calling `.fit_transform()` on the test dataset: `X_test_scaled = scaler.fit_transform(X_test)`.',
      whyWrong: 'Data Leakage: fits scaler parameters to the test distribution instead of applying the learned training distribution.',
      howToFix: 'Call `scaler.fit_transform(X_train)` on train data, but ONLY `scaler.transform(X_test)` on test data.'
    },
    {
      mistake: 'Passing a 1D array to an estimator expecting a 2D feature matrix: `model.fit([1, 2, 3], y)`.',
      whyWrong: 'Raises `ValueError: Expected 2D array, got 1D array instead`.',
      howToFix: 'Reshape into 2D: `X.reshape(-1, 1)`.'
    }
  ],
  realWorldApplications: [
    { title: 'Credit Card Fraud Classification', description: 'Training Random Forest and XGBoost classifiers to flag anomalous transactions.' },
    { title: 'Customer Lifetime Value Regression', description: 'Predicting future customer spend based on engagement metrics.' }
  ],
  practiceQuestions: [
    { question: 'What naming convention distinguishes learned parameters from user hyperparameters in Scikit-learn?', hint: 'Underscore placement.', answer: 'Learned parameters end with a trailing underscore (e.g. `model.coef_`, `model.intercept_`).' },
    { question: 'What is the difference between `transform()` and `fit_transform()`?', hint: 'Learning vs applying.', answer: '`fit_transform()` learns parameters and transforms data in one pass (used on training data); `transform()` applies previously learned parameters without retraining (used on test data).' },
    { question: 'What does the `stratify=y` parameter do in `train_test_split`?', hint: 'Class balance.', answer: 'It ensures that the proportion of target classes in the train and test sets is identical to the original dataset.' }
  ],
  quiz: [
    {
      question: 'Which method is used to train an estimator on feature matrix X and labels y?',
      options: ['estimator.train(X, y)', 'estimator.fit(X, y)', 'estimator.learn(X, y)', 'estimator.execute(X, y)'],
      correctAnswer: 1,
      explanation: 'All Scikit-learn estimators implement `fit(X, y)` to train.'
    },
    {
      question: 'Why should you NOT call `fit` or `fit_transform` on your test set?',
      options: ['It runs out of memory', 'It causes data leakage by allowing test set distributions to influence model parameters', 'The test set must be immutable', 'It raises a SyntaxError'],
      correctAnswer: 1,
      explanation: 'Fitting on the test set leaks evaluation distribution into preprocessing, invalidating test results.'
    },
    {
      question: 'What shape must feature matrix X have when passed to Scikit-learn estimators?',
      options: ['1D array of shape (n_samples,)', '2D array of shape (n_samples, n_features)', '3D tensor', 'Scalar'],
      correctAnswer: 1,
      explanation: 'Scikit-learn expects feature matrices to be 2D arrays: `(n_samples, n_features)`.'
    }
  ],
  codingChallenge: {
    title: 'Compute Binary Classification Metrics',
    difficulty: 'Intermediate',
    description: 'Write a function `evaluate_binary_model(y_true: list[int], y_pred: list[int]) -> dict[str, float]` that calculates and returns `{"accuracy": acc, "precision": prec, "recall": rec}` rounded to 4 decimal places. If denominator for precision or recall is 0, set that metric to 0.0.',
    starterCode: `def evaluate_binary_model(y_true: list[int], y_pred: list[int]) -> dict[str, float]:
    # Write your solution here
    pass`,
    hints: [
      'Count TP (y_true=1 and y_pred=1), FP (y_true=0 and y_pred=1), FN (y_true=1 and y_pred=0).',
      'Accuracy = (correct) / len(y_true).',
      'Precision = TP / (TP + FP) if (TP + FP) > 0 else 0.0.',
      'Recall = TP / (TP + FN) if (TP + FN) > 0 else 0.0.'
    ],
    solution: `def evaluate_binary_model(y_true: list[int], y_pred: list[int]) -> dict[str, float]:
    if not y_true:
        return {"accuracy": 0.0, "precision": 0.0, "recall": 0.0}
    tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 1)
    fp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 1)
    fn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 0)
    correct = sum(1 for yt, yp in zip(y_true, y_pred) if yt == yp)
    
    acc = round(correct / len(y_true), 4)
    prec = round(tp / (tp + fp), 4) if (tp + fp) > 0 else 0.0
    rec = round(tp / (tp + fn), 4) if (tp + fn) > 0 else 0.0
    return {"accuracy": acc, "precision": prec, "recall": rec}`,
    testCases: [
      { input: '[1, 1, 0, 0], [1, 0, 0, 1]', expectedOutput: '{"accuracy": 0.5, "precision": 0.5, "recall": 0.5}' }
    ]
  }
};

m11Lessons['py-ds-pipelines'] = {
  id: 'py-ds-pipelines',
  moduleId: 'python-module-11',
  title: 'Reusable Data-Processing Pipelines',
  subtitle: 'sklearn.pipeline.Pipeline, ColumnTransformer, and Custom Transformers',
  order: 6,
  readTimeMinutes: 28,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Chain preprocessing and modeling into a single reproducible atomic estimator using `sklearn.pipeline.Pipeline`.',
    'Apply different transformations to different columns using `ColumnTransformer` (e.g. OneHotEncoder on categoricals, StandardScaler on numerics).',
    'Build custom transformers by subclassing `BaseEstimator` and `TransformerMixin`.',
    'Eliminate data leakage permanently in cross-validation and production inference.'
  ],
  prerequisites: ['Scikit-learn estimator API, preprocessing, and OOP.'],
  analogy: {
    title: 'The Automated Industrial Car Wash Tunnel',
    text: 'Manual preprocessing is washing a car by hand: you manually soap the wheels, spray the hood, and polish the glass. If you forget step 3 or use dirty soapy water on the clean test car (data leakage), the finish is ruined. A `Pipeline` is an automated car wash tunnel: you drive the raw car in one end, the conveyor belt pulls it through soaping, washing, drying, and waxing in locked lockstep, and a pristine showroom vehicle rolls out the other end.',
    metaphor: 'Pipelines bundle data transformation steps and final estimators into a single deployable object.'
  },
  problemSolved: {
    title: 'Eliminating Data Leakage and Deployment Discrepancies',
    description: 'When preprocessing steps are written as loose scripts, deploying to production requires duplicating all imputation, encoding, and scaling logic. A Pipeline bundles all transformations with the model into a single serialized file.',
    keyPoints: [
      'A `Pipeline` consists of a list of `(name, transformer)` tuples ending in a final estimator.',
      'Calling `pipeline.fit(X_train, y_train)` fits all transformers and the final model sequentially.',
      'Calling `pipeline.predict(X_test)` automatically routes raw test features through all learned transformers before predicting.',
      '`ColumnTransformer` allows applying specific transformers to selected column subsets.'
    ]
  },
  intuition: {
    overview: 'The Pipeline coordinates the flow of data: the output of step N is passed as the input `X` to step N+1.',
    steps: [
      { step: 1, title: 'Assemble', description: 'Pipeline([("scaler", StandardScaler()), ("clf", LogisticRegression())]).' },
      { step: 2, title: 'Fit Pipeline', description: 'Transformers call fit_transform(); final estimator calls fit().' },
      { step: 3, title: 'Inference', description: 'Raw incoming data is transformed through the fitted pipeline and predicted in one line.' }
    ]
  },
  codeExample: {
    title: 'End-to-End Pipeline with ColumnTransformer and Custom Transformer',
    code: `from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
import pandas as pd

# Custom transformer: log transform selected numeric features
class LogTransformer(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self  # No parameters to learn

    def transform(self, X):
        import numpy as np
        return np.log1p(np.maximum(0, X))

# ColumnTransformer routing numeric vs categorical columns
preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), ["age", "fare"]),
        ("cat", OneHotEncoder(handle_unknown="ignore"), ["embarked"])
    ]
)

# Atomic End-to-End Pipeline
full_pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", LogisticRegression())
])

print("Pipeline configured with steps:", [step[0] for step in full_pipeline.steps])`,
    explanation: 'Demonstrates implementing a custom transformer with BaseEstimator and TransformerMixin, ColumnTransformer, and a complete Pipeline.'
  },
  runnableCode: {
    code: `# Simulating Pipeline execution contract in pure Python
class MiniPipeline:
    def __init__(self, steps):
        self.steps = steps

    def fit_transform(self, data):
        current = data
        for name, transformer in self.steps:
            current = transformer.fit_transform(current)
        return current

class AddOffset:
    def __init__(self, offset): self.offset = offset
    def fit_transform(self, data): return [x + self.offset for x in data]

class MultiplyScale:
    def __init__(self, scale): self.scale = scale
    def fit_transform(self, data): return [x * self.scale for x in data]

pipe = MiniPipeline([("offset", AddOffset(10)), ("scale", MultiplyScale(2))])
result = pipe.fit_transform([1, 2, 3])
print("Transformed data (x+10)*2:", result)`,
    expectedOutput: `Transformed data (x+10)*2: [22, 24, 26]`
  },
  lineByLine: [
    { line: 7, code: '        for name, transformer in self.steps:', explanation: 'Sequentially feeds output of previous step to next transformer.' },
    { line: 20, code: 'result = pipe.fit_transform([1, 2, 3])', explanation: 'Evaluates pipeline sequentially.' }
  ],
  commonMistakes: [
    {
      mistake: 'Putting an estimator in the middle of a `Pipeline`.',
      whyWrong: 'All intermediate steps in a Pipeline must be Transformers implementing `fit` and `transform`. Only the final step can be a pure estimator.',
      howToFix: 'Ensure all intermediate steps implement `transform()`.'
    },
    {
      mistake: 'Performing cross-validation on pre-scaled data rather than passing the Pipeline into `cross_val_score()`.',
      whyWrong: 'Leaks validation fold data into scaling parameters on every fold.',
      howToFix: 'Pass the entire `Pipeline` object into `cross_val_score(pipeline, X, y)`.'
    }
  ],
  realWorldApplications: [
    { title: 'Model Deployment (Joblib / BentoML)', description: 'Serializing a single `pipeline.joblib` file that handles raw JSON payloads directly in production.' },
    { title: 'Kaggle Competition Pipelines', description: 'Ensuring zero data leakage across 5-fold cross-validation.' }
  ],
  practiceQuestions: [
    { question: 'What two methods must a custom Scikit-learn transformer implement?', hint: 'Transformer contract.', answer: '`fit(X, y=None)` and `transform(X)`.' },
    { question: 'What is the purpose of `ColumnTransformer` in Scikit-learn?', hint: 'Heterogeneous columns.', answer: 'It applies different preprocessing transformers to specific subsets of columns (e.g. scaling numeric columns while one-hot encoding categorical columns).' },
    { question: 'Why does passing a `Pipeline` to `cross_val_score()` prevent data leakage?', hint: 'Per-fold fitting.', answer: 'Because the pipeline refits all preprocessing steps on each training fold independently, without seeing the validation fold.' }
  ],
  quiz: [
    {
      question: 'Which mixin in `sklearn.base` provides the `fit_transform()` method automatically when you implement `fit()` and `transform()`?',
      options: ['ClassifierMixin', 'TransformerMixin', 'RegressorMixin', 'PipelineMixin'],
      correctAnswer: 1,
      explanation: '`TransformerMixin` provides `fit_transform()` by calling `fit()` followed by `transform()`.'
    },
    {
      question: 'What requirement must all intermediate steps (except the last) in a `Pipeline` satisfy?',
      options: ['They must be classifiers', 'They must be transformers implementing both fit and transform', 'They must be neural networks', 'They must be written in C'],
      correctAnswer: 1,
      explanation: 'Every intermediate step in a Pipeline must implement both `fit` and `transform`.'
    },
    {
      question: 'How do you serialize an entire Scikit-learn Pipeline to disk for production deployment?',
      options: ['json.dump(pipeline)', 'joblib.dump(pipeline, "model.joblib")', 'pickle.json()', 'sql.save(pipeline)'],
      correctAnswer: 1,
      explanation: '`joblib.dump(pipeline, "model.joblib")` is the standard tool for serializing Scikit-learn pipelines with NumPy arrays.'
    }
  ],
  codingChallenge: {
    title: 'Custom Feature Binarizer Transformer',
    difficulty: 'Advanced',
    description: 'Write a class `ThresholdBinarizer` that implements the Scikit-learn transformer protocol: `fit(self, X, y=None)` (returns `self`) and `transform(self, X: list[list[float]]) -> list[list[int]]` which converts each number to `1` if `>= threshold`, else `0`. Accepts `threshold: float = 0.0` in `__init__`.',
    starterCode: `class ThresholdBinarizer:
    # Write your solution here
    pass`,
    hints: [
      'In __init__: self.threshold = float(threshold).',
      'In fit(self, X, y=None): return self.',
      'In transform(self, X): return [[1 if val >= self.threshold else 0 for val in row] for row in X].'
    ],
    solution: `class ThresholdBinarizer:
    def __init__(self, threshold: float = 0.0):
        self.threshold = float(threshold)
        
    def fit(self, X, y=None):
        return self
        
    def transform(self, X: list[list[float]]) -> list[list[int]]:
        return [[1 if val >= self.threshold else 0 for val in row] for row in X]
        
    def fit_transform(self, X, y=None):
        return self.fit(X, y).transform(X)`,
    testCases: [
      { input: 't = ThresholdBinarizer(5.0); t.fit_transform([[2.0, 5.0], [8.0, 1.0]])', expectedOutput: '[[0, 1], [1, 0]]' }
    ]
  }
};

const py11Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-11.ts');
writePythonModuleFile(py11Path, m11.data, m11Lessons);
console.log('Python Module 11 completed! Authored:', Object.keys(m11Lessons).length);

// ==========================================
// Python Module 12: Python Projects
// ==========================================
const m12 = getExistingPyLessons(12);
const m12Lessons = { ...m12.lessons };

m12Lessons['py-project-expense-tracker'] = {
  id: 'py-project-expense-tracker',
  moduleId: 'python-module-12',
  title: 'Project 2: Personal Expense Tracker',
  subtitle: 'CSV Persistence, Category Aggregation, Date Filtering & Budget Alerts',
  order: 2,
  readTimeMinutes: 50,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Design an end-to-end expense logging system with persistent CSV storage.',
    'Implement CRUD operations: add expense, list expenses, filter by date range, and calculate category totals.',
    'Compute budget warnings when category spending exceeds user-defined thresholds.',
    'Write clean, modular code separating storage I/O from financial reporting logic.'
  ],
  prerequisites: ['Python file I/O, datetime parsing, dictionaries, and functions.'],
  analogy: {
    title: 'The Digital Financial Ledger and Auditor',
    text: 'A personal expense tracker is an automated bookkeeper. Each transaction receipt is logged onto a chronological ledger with an amount, timestamp, and category. At month-end, the auditor aggregates expenses by category (Groceries, Rent, Utilities) and sounds an alarm if the dining budget is exceeded.',
    metaphor: 'Expense tracking demonstrates data persistence, validation, and aggregations.'
  },
  problemSolved: {
    title: 'Financial Budget Tracking and Categorical Auditing',
    description: 'Manual spreadsheets are cumbersome and prone to formula errors. A custom CLI expense tracker provides rapid keyboard logging and automated budget analysis.',
    keyPoints: [
      'Store records as CSV rows: date, category, amount, description.',
      'Use ISO 8601 string formatting (YYYY-MM-DD) for sorting and date comparisons.',
      'Separate the CLI menu from the ExpenseTracker core engine for testability.'
    ]
  },
  intuition: {
    overview: 'The tracker coordinates memory dictionaries with on-disk CSV files, maintaining consistency across app restarts.',
    steps: [
      { step: 1, title: 'Input & Validate', description: 'Ensure amount is positive and category is valid.' },
      { step: 2, title: 'Persist', description: 'Append transaction row to CSV with ISO timestamp.' },
      { step: 3, title: 'Summarize', description: 'Aggregate spending by category and compare against budget limits.' }
    ]
  },
  codeExample: {
    title: 'Expense Tracker Engine Architecture',
    code: `import csv
from datetime import datetime
from collections import defaultdict

class ExpenseTracker:
    def __init__(self):
        self.expenses = []

    def add_expense(self, amount: float, category: str, description: str, date_str: str | None = None):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        date = date_str or datetime.now().strftime("%Y-%m-%d")
        record = {
            "date": date,
            "category": category.strip().title(),
            "amount": round(float(amount), 2),
            "description": description.strip()
        }
        self.expenses.append(record)
        return record

    def total_by_category(self) -> dict[str, float]:
        totals = defaultdict(float)
        for e in self.expenses:
            totals[e["category"]] += e["amount"]
        return dict(totals)

tracker = ExpenseTracker()
tracker.add_expense(45.50, "Groceries", "Supermarket")
tracker.add_expense(12.00, "Dining", "Coffee")
tracker.add_expense(80.00, "Groceries", "Farmers Market")
print("Category Totals:", tracker.total_by_category())`,
    explanation: 'Demonstrates adding expenses with validation and computing categorical summaries with defaultdict.'
  },
  runnableCode: {
    code: `expenses = [
    {"category": "Food", "amount": 25.0},
    {"category": "Transport", "amount": 15.0},
    {"category": "Food", "amount": 35.0}
]

total_spend = sum(e["amount"] for e in expenses)
food_spend = sum(e["amount"] for e in expenses if e["category"] == "Food")

print(f"Total Spend: \${total_spend:.2f}")
print(f"Food Spend: \${food_spend:.2f}")`,
    expectedOutput: `Total Spend: $75.00
Food Spend: $60.00`
  },
  lineByLine: [
    { line: 7, code: 'total_spend = sum(e["amount"] for e in expenses)', explanation: 'Aggregates all expense amounts.' },
    { line: 8, code: 'food_spend = sum(...)', explanation: 'Filters and aggregates food expenses specifically.' }
  ],
  commonMistakes: [
    {
      mistake: 'Storing floating-point currency without rounding or using Decimal for precision.',
      whyWrong: 'Binary float representation errors can accumulate fractions of a cent (e.g. 19.99 + 0.01 = 20.000000000000004).',
      howToFix: 'Round to 2 decimal places: `round(val, 2)` or use the `decimal.Decimal` module.'
    },
    {
      mistake: 'Using localized date formats like MM/DD/YYYY.',
      whyWrong: 'Ambiguous internationally (03/04 could mean March 4 or April 3) and cannot be sorted alphabetically.',
      howToFix: 'Always use standard ISO 8601 date strings: `YYYY-MM-DD`.'
    }
  ],
  realWorldApplications: [
    { title: 'Personal Finance Software', description: 'Core engine behind apps like Mint, YNAB, and Quicken.' },
    { title: 'Corporate Expense Reports', description: 'Submitting and categorizing employee travel and meal reimbursement claims.' }
  ],
  practiceQuestions: [
    { question: 'Why is ISO 8601 format (YYYY-MM-DD) ideal for storing dates in text files?', hint: 'Sorting and portability.', answer: 'It is unambiguous internationally and lexicographical alphabetical sorting matches chronological order.' },
    { question: 'What container from `collections` is ideal for summing category expenses?', hint: 'Default numeric map.', answer: '`collections.defaultdict(float)`.' },
    { question: 'How can you prevent negative expense entries?', hint: 'Input validation.', answer: 'By validating `if amount <= 0: raise ValueError(...)` in the recording method.' }
  ],
  quiz: [
    {
      question: 'Which method on an open CSV file object writes a single row of values?',
      options: ['writer.write_line()', 'writer.writerow()', 'writer.append_row()', 'writer.insert()'],
      correctAnswer: 1,
      explanation: '`writer.writerow(row_data)` writes a single row to a CSV stream.'
    },
    {
      question: 'What is the advantage of separating the storage layer from the reporting engine in this project?',
      options: ['It runs on multiple CPUs', 'It allows unit testing the reporting logic in memory without creating real files on disk', 'It disables Python\'s GIL', 'It compiles to C'],
      correctAnswer: 1,
      explanation: 'Decoupling storage from business logic makes unit testing fast and eliminates disk side effects during tests.'
    },
    {
      question: 'How do you check if spending exceeds an allocated budget of \$100 for "Dining"?',
      options: ['if total_by_category().get("Dining", 0.0) > 100.0:', 'if "Dining" in budget:', 'if sum(Dining) > 100:', 'if Dining == 100:'],
      correctAnswer: 0,
      explanation: 'Safely lookup category total with fallback 0.0 and compare to the threshold.'
    }
  ],
  codingChallenge: {
    title: 'Expense Category Aggregator',
    difficulty: 'Intermediate',
    description: 'Write a function `summarize_expenses(records: list[dict]) -> tuple[float, dict[str, float]]` where each record is `{"category": str, "amount": float}`. Return a tuple `(total_spend, category_breakdown)` where `total_spend` is the sum of all expenses rounded to 2 decimal places, and `category_breakdown` maps lowercase category names to their rounded sum.',
    starterCode: `def summarize_expenses(records: list[dict]) -> tuple[float, dict[str, float]]:
    # Write your solution here
    pass`,
    hints: [
      'Initialize totals = defaultdict(float).',
      'For r in records: cat = r["category"].lower(); totals[cat] += r["amount"].',
      'Compute overall total and round values to 2.'
    ],
    solution: `from collections import defaultdict

def summarize_expenses(records: list[dict]) -> tuple[float, dict[str, float]]:
    cat_totals = defaultdict(float)
    total = 0.0
    for r in records:
        cat = r["category"].strip().lower()
        amt = float(r["amount"])
        cat_totals[cat] += amt
        total += amt
    breakdown = {k: round(v, 2) for k, v in cat_totals.items()}
    return round(total, 2), breakdown`,
    testCases: [
      { input: '[{"category": "Food", "amount": 10.50}, {"category": "food", "amount": 5.25}, {"category": "Rent", "amount": 100.0}]', expectedOutput: '(115.75, {"food": 15.75, "rent": 100.0})' }
    ]
  }
};

m12Lessons['py-project-file-organizer'] = {
  id: 'py-project-file-organizer',
  moduleId: 'python-module-12',
  title: 'Project 3: Automated File Organizer',
  subtitle: 'Filesystem Automation, pathlib.Path, shutil Operations, and Dry-Run Logging',
  order: 3,
  readTimeMinutes: 40,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Automate filesystem maintenance using `pathlib.Path` and `shutil`.',
    'Sort messy download directories into organized subfolders by extension (Images, Docs, Audio, Code).',
    'Implement safe name collision avoidance (renaming `file_1.png` if `file.png` exists).',
    'Provide a `--dry-run` safety flag that previews planned moves without executing them.'
  ],
  prerequisites: ['Python pathlib, functions, dictionaries, and file system basics.'],
  analogy: {
    title: 'The Automated Warehouse Parcel Sorter',
    text: 'A messy Downloads directory is a shipping dock piled with unboxed crates. An automated file organizer is an optical scanner on a conveyor belt: it inspects the barcode tag (file extension like `.jpg` or `.pdf`), determines the destination warehouse aisle (Images or Documents), checks if the shelf is full, and moves the crate smoothly into place.',
    metaphor: 'Filesystem automation scans directories, maps extensions to categories, and routes files.'
  },
  problemSolved: {
    title: 'Eliminating Manual File Triage and Folder Clutter',
    description: 'Downloads folders accumulate hundreds of disorganized files. Automating triage saves hours and ensures important documents are archived in designated directories.',
    keyPoints: [
      '`Path.iterdir()` scans directory contents.',
      '`Path.suffix.lower()` extracts the file extension.',
      '`shutil.move(src, dst)` relocates files across folders and filesystems.',
      'Always support a `--dry-run` simulation mode to prevent accidental data loss.'
    ]
  },
  intuition: {
    overview: 'The organizer uses a category mapping dictionary. For each file, it looks up its extension, generates a collision-free target path, and moves the file.',
    steps: [
      { step: 1, title: 'Scan Directory', description: 'Iterate through target path, filtering out directories and hidden files.' },
      { step: 2, title: 'Determine Category', description: 'Look up suffix in extension map (e.g. .pdf -> "Documents").' },
      { step: 3, title: 'Safe Move', description: 'Ensure destination directory exists and move file with unique name.' }
    ]
  },
  codeExample: {
    title: 'Core File Organizer Architecture with Collision Resolution',
    code: `from pathlib import Path

CATEGORY_MAP = {
    "Images": {".jpg", ".jpeg", ".png", ".gif", ".svg"},
    "Documents": {".pdf", ".docx", ".txt", ".xlsx", ".csv"},
    "Archives": {".zip", ".tar", ".gz", ".7z"},
    "Audio": {".mp3", ".wav", ".flac"}
}

def get_destination_folder(file_path: Path) -> str:
    ext = file_path.suffix.lower()
    for category, extensions in CATEGORY_MAP.items():
        if ext in extensions:
            return category
    return "Miscellaneous"

def get_unique_path(dest_dir: Path, filename: str) -> Path:
    """Resolve filename collisions: file.txt -> file_1.txt."""
    candidate = dest_dir / filename
    if not candidate.exists():
        return candidate
        
    stem = Path(filename).stem
    suffix = Path(filename).suffix
    counter = 1
    while candidate.exists():
        candidate = dest_dir / f"{stem}_{counter}{suffix}"
        counter += 1
    return candidate

print("Sample routing for invoice.pdf ->", get_destination_folder(Path("invoice.pdf")))
print("Sample routing for photo.PNG ->", get_destination_folder(Path("photo.PNG")))`,
    explanation: 'Demonstrates extension categorization and resolving name collisions with sequential numbering.'
  },
  runnableCode: {
    code: `# Simulating file organization plan
files = ["report.pdf", "photo.jpg", "music.mp3", "data.csv", "unknown.xyz"]

plan = []
for f in files:
    ext = "." + f.split(".")[-1]
    folder = "Docs" if ext in (".pdf", ".csv") else ("Media" if ext in (".jpg", ".mp3") else "Other")
    plan.append(f"{f} -> {folder}/{f}")

for step in plan:
    print("Planned move:", step)`,
    expectedOutput: `Planned move: report.pdf -> Docs/report.pdf
Planned move: photo.jpg -> Media/photo.jpg
Planned move: music.mp3 -> Media/music.mp3
Planned move: data.csv -> Docs/data.csv
Planned move: unknown.xyz -> Other/unknown.xyz`
  },
  lineByLine: [
    { line: 6, code: '    folder = "Docs" if ext in ...', explanation: 'Classifies file extension into folder name.' },
    { line: 7, code: '    plan.append(f"{f} -> {folder}/{f}")', explanation: 'Records planned destination path for dry-run verification.' }
  ],
  commonMistakes: [
    {
      mistake: 'Moving subdirectories into themselves: sorting a folder that already contains destination folders.',
      whyWrong: 'Can cause infinite recursive nesting or permission errors.',
      howToFix: 'Filter out directories before moving: `if not file_path.is_file(): continue`.'
    },
    {
      mistake: 'Overwriting existing destination files with identical names.',
      whyWrong: 'Silently destroys data when downloading multiple files with default names like `image.png`.',
      howToFix: 'Implement collision resolution checking `dest.exists()` before moving.'
    }
  ],
  realWorldApplications: [
    { title: 'Automated Media Archiving', description: 'Organizing SD card photography imports by year, month, and camera model.' },
    { title: 'Server Log Rotation', description: 'Archiving daily compressed log files into dated folder archives.' }
  ],
  practiceQuestions: [
    { question: 'What method on a `pathlib.Path` object returns the file extension including the leading dot?', hint: 'Property on Path.', answer: '`file_path.suffix` (e.g. `".png"`).' },
    { question: 'What standard library module provides high-level file moving and copying functions like `shutil.move()`?', hint: 'Module name.', answer: 'The `shutil` module.' },
    { question: 'What is a "dry-run" mode in filesystem automation scripts?', hint: 'Simulation flag.', answer: 'A mode that previews and prints planned file actions without modifying any actual files on disk.' }
  ],
  quiz: [
    {
      question: 'Which method creates a directory and all necessary parent directories in pathlib without raising an error if it already exists?',
      options: ['Path.mkdir(parents=True, exist_ok=True)', 'Path.create_all()', 'os.mkdir()', 'shutil.make_dir()'],
      correctAnswer: 0,
      explanation: '`Path.mkdir(parents=True, exist_ok=True)` creates full directory paths safely.'
    },
    {
      question: 'How do you check if a Path object represents a file rather than a directory?',
      options: ['path.is_file()', 'path.type == "file"', 'path.has_extension()', 'isinstance(path, File)'],
      correctAnswer: 0,
      explanation: '`path.is_file()` returns True if the path exists and points to a regular file.'
    },
    {
      question: 'Why should extensions be compared using `.lower()`?',
      options: ['To compile faster', 'Because Windows and cameras often produce uppercase extensions like `.JPG` or `.PNG`', 'Linux requires lowercase', 'PEP 8 requirement'],
      correctAnswer: 1,
      explanation: 'Case normalization ensures `.JPG`, `.Jpg`, and `.jpg` match the same image category.'
    }
  ],
  codingChallenge: {
    title: 'Generate Non-Conflicting Filename',
    difficulty: 'Intermediate',
    description: 'Write a function `generate_unique_name(existing_names: set[str], target_name: str) -> str` that checks if `target_name` exists in `existing_names`. If absent, return `target_name`. If present, append `_1`, `_2`, etc. before the extension until a unique name is found (e.g. "doc.pdf" -> "doc_1.pdf").',
    starterCode: `def generate_unique_name(existing_names: set[str], target_name: str) -> str:
    # Write your solution here
    pass`,
    hints: [
      'If target_name not in existing_names: return target_name.',
      'Split name into stem and suffix using rsplit(".", 1).',
      'Loop counter starting at 1: candidate = f"{stem}_{counter}.{suffix}".'
    ],
    solution: `def generate_unique_name(existing_names: set[str], target_name: str) -> str:
    if target_name not in existing_names:
        return target_name
    if "." in target_name:
        stem, ext = target_name.rsplit(".", 1)
        suffix = f".{ext}"
    else:
        stem, suffix = target_name, ""
        
    counter = 1
    while f"{stem}_{counter}{suffix}" in existing_names:
        counter += 1
    return f"{stem}_{counter}{suffix}"`,
    testCases: [
      { input: '{"file.txt", "file_1.txt"}, "file.txt"', expectedOutput: '"file_2.txt"' },
      { input: '{"photo.jpg"}, "image.jpg"', expectedOutput: '"image.jpg"' }
    ]
  }
};

m12Lessons['py-project-contact-manager'] = {
  id: 'py-project-contact-manager',
  moduleId: 'python-module-12',
  title: 'Project 4: Contact Management System',
  subtitle: 'CRUD Architecture, JSON Persistence, Fuzzy Search, and CLI Menus',
  order: 4,
  readTimeMinutes: 50,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Build a full-featured CRUD (Create, Read, Update, Delete) address book.',
    'Persist contact records reliably to atomic JSON storage files.',
    'Implement multi-field search (matching name, email, or phone substring).',
    'Design an interactive CLI terminal menu loop with input validation.'
  ],
  prerequisites: ['Python dictionaries, functions, loops, and JSON module.'],
  analogy: {
    title: 'The Digital Rolodex',
    text: 'A physical Rolodex is a rotating wheel of index cards. You flip through cards, erase old phone numbers, write new addresses, and throw away outdated contacts. A digital contact manager automates this: it searches all cards instantly by typing two letters, checks email formats, and saves everything to disk so you never lose a phone number.',
    metaphor: 'A contact manager exercises complete CRUD operations with persistent JSON data.'
  },
  problemSolved: {
    title: 'Managing Relational Records with Structured Validation',
    description: 'Handling contact records requires ensuring unique identifiers, validating email and phone numbers, and saving updates without corrupting existing records.',
    keyPoints: [
      'Use a dictionary keyed by contact ID for fast O(1) lookups and updates.',
      'JSON persistence serializes the dictionary to disk on mutations.',
      'Search filters records by checking if query substring exists in name, email, or phone.'
    ]
  },
  intuition: {
    overview: 'The manager separates user interface commands from data store operations, validating fields before mutating state.',
    steps: [
      { step: 1, title: 'Load Storage', description: 'On startup, load contacts.json if present; initialize empty dict if absent.' },
      { step: 2, title: 'Execute CRUD', description: 'Perform requested operation (create, read, update, delete) on internal dictionary.' },
      { step: 3, title: 'Sync to Disk', description: 'Write updated dictionary to contacts.json atomically.' }
    ]
  },
  codeExample: {
    title: 'ContactManager Core Class Implementation',
    code: `class ContactManager:
    def __init__(self):
        self.contacts = {}
        self._next_id = 1

    def add_contact(self, name: str, email: str, phone: str) -> dict:
        cid = str(self._next_id)
        self._next_id += 1
        contact = {
            "id": cid,
            "name": name.strip(),
            "email": email.strip().lower(),
            "phone": phone.strip()
        }
        self.contacts[cid] = contact
        return contact

    def search(self, query: str) -> list[dict]:
        q = query.strip().lower()
        return [
            c for c in self.contacts.values()
            if q in c["name"].lower() or q in c["email"] or q in c["phone"]
        ]

    def delete_contact(self, contact_id: str) -> bool:
        if contact_id in self.contacts:
            del self.contacts[contact_id]
            return True
        return False

cm = ContactManager()
cm.add_contact("Alice Johnson", "alice@corp.com", "555-0100")
cm.add_contact("Bob Smith", "bob@gmail.com", "555-0199")
print("Search 'alice':", cm.search("alice"))
print("Search '555':", len(cm.search("555")))`,
    explanation: 'Demonstrates implementing contact creation, substring search across multiple fields, and deletion.'
  },
  runnableCode: {
    code: `contacts = {
    "1": {"name": "Charlie", "email": "charlie@test.org"},
    "2": {"name": "David", "email": "david@test.org"}
}

# Update contact record
if "1" in contacts:
    contacts["1"]["email"] = "charlie_new@test.org"

print("Updated contact 1:", contacts["1"])`,
    expectedOutput: `Updated contact 1: {'name': 'Charlie', 'email': 'charlie_new@test.org'}`
  },
  lineByLine: [
    { line: 7, code: 'contacts["1"]["email"] = "charlie_new@test.org"', explanation: 'Updates record attribute in-place by ID.' },
    { line: 9, code: 'print("Updated contact 1:", contacts["1"])', explanation: 'Outputs updated record.' }
  ],
  commonMistakes: [
    {
      mistake: 'Storing contacts as a flat list: `[{"name": "Alice"}, ...]`.',
      whyWrong: 'Searching or updating by ID requires an O(N) linear search through the entire list.',
      howToFix: 'Store contacts in a dictionary keyed by ID: `{id: contact_dict}` for O(1) direct access.'
    },
    {
      mistake: 'Writing to disk directly without handling write interruptions.',
      whyWrong: 'A crash during write leaves a half-written corrupted JSON file.',
      howToFix: 'Write to a temporary file first, then use atomic rename: `temp_file.replace(target_file)`.'
    }
  ],
  realWorldApplications: [
    { title: 'Customer Relationship Management (CRM)', description: 'Tracking client contact info, deal stages, and interaction logs.' },
    { title: 'Email Marketing Subscribers', description: 'Managing newsletter subscribers and unsubscription lists.' }
  ],
  practiceQuestions: [
    { question: 'What does CRUD stand for in software engineering?', hint: 'Four fundamental operations.', answer: 'Create, Read, Update, Delete.' },
    { question: 'Why is indexing records by a unique ID preferable to indexing by contact name?', hint: 'Uniqueness and mutation.', answer: 'Names are not guaranteed to be unique (two contacts can be named "John Smith") and names can change, whereas IDs remain fixed.' },
    { question: 'How do you perform case-insensitive substring searching in Python?', hint: 'String lower method.', answer: 'By lowercasing both the search query and the target field: `query.lower() in field.lower()`.' }
  ],
  quiz: [
    {
      question: 'Which data structure offers O(1) average lookup time when querying a contact by ID?',
      options: ['list', 'tuple', 'dict', 'deque'],
      correctAnswer: 2,
      explanation: 'Dictionaries provide O(1) average key lookup by hash.'
    },
    {
      question: 'Why should atomic rename (`temp_file.replace(final_file)`) be used when saving data?',
      options: ['It runs in a separate thread', 'It guarantees that an unexpected crash mid-write does not leave a corrupted file', 'It compresses the JSON', 'It encrypts the text'],
      correctAnswer: 1,
      explanation: 'Operating system atomic renames guarantee the file is either fully updated or left in its previous valid state.'
    },
    {
      question: 'What method safely deletes a key from a dictionary without raising KeyError if missing?',
      options: ['dict.remove(k)', 'del dict[k]', 'dict.pop(k, None)', 'dict.discard(k)'],
      correctAnswer: 2,
      explanation: '`dict.pop(k, None)` removes the key if present and returns None if missing without error.'
    }
  ],
  codingChallenge: {
    title: 'Filter Contacts by Multi-Field Search',
    difficulty: 'Intermediate',
    description: 'Write a function `search_contacts(contacts: list[dict], query: str) -> list[dict]` that takes a list of contact dictionaries (each containing `"name"`, `"email"`, `"phone"`) and returns all contacts where `query` is a case-insensitive substring of `name`, `email`, OR `phone`.',
    starterCode: `def search_contacts(contacts: list[dict], query: str) -> list[dict]:
    # Write your solution here
    pass`,
    hints: [
      'Clean query: q = query.strip().lower().',
      'Check q in c.get("name", "").lower() or q in c.get("email", "").lower() or q in c.get("phone", "").',
      'Return matching contacts list.'
    ],
    solution: `def search_contacts(contacts: list[dict], query: str) -> list[dict]:
    q = query.strip().lower()
    if not q:
        return list(contacts)
    return [
        c for c in contacts
        if q in c.get("name", "").lower() or q in c.get("email", "").lower() or q in c.get("phone", "").lower()
    ]`,
    testCases: [
      { input: '[{"name": "Alice Smith", "email": "alice@corp.com", "phone": "123"}, {"name": "Bob", "email": "bob@corp.com", "phone": "456"}], "smith"', expectedOutput: '[{"name": "Alice Smith", "email": "alice@corp.com", "phone": "123"}]' }
    ]
  }
};

m12Lessons['py-project-library-oop'] = {
  id: 'py-project-library-oop',
  moduleId: 'python-module-12',
  title: 'Project 5: OOP Library Management System',
  subtitle: 'Full OOP Architecture: Book, Member, Library, Borrowing Transactions, and Due Dates',
  order: 5,
  readTimeMinutes: 60,
  difficulty: 'Intermediate',
  visualizerType: 'oop-diagram',
  objectives: [
    'Design an end-to-end Object-Oriented system modeling a public lending library.',
    'Model domain entities with proper encapsulation: `Book`, `Member`, `LoanTransaction`, and `Library`.',
    'Implement business rules: maximum borrowing limits, checkout verification, overdue fines.',
    'Apply composition and encapsulation to avoid leaky internal state.'
  ],
  prerequisites: ['Python OOP, classes, inheritance, encapsulation, and special methods.'],
  analogy: {
    title: 'The Municipal Public Library System',
    text: 'A library system is a coordinated dance of four entities: Books (catalog items with ISBN, title, availability status), Members (patrons with borrowing limits and active loans), Loan Transactions (contracts recording checkout date and due date), and the Library (the central mediator enforcing borrowing rules).',
    metaphor: 'Library systems demonstrate comprehensive object-oriented domain modeling and composition.'
  },
  problemSolved: {
    title: 'Complex State Management and Domain Invariant Enforcement',
    description: 'Managing borrowing workflows without OOP leads to fragile dictionaries where books are marked borrowed without recording who borrowed them. Encapsulation guarantees valid state transitions.',
    keyPoints: [
      '`Book` tracks availability status and copies.',
      '`Member` tracks currently borrowed books and loan quotas.',
      '`Library` acts as the service coordinator mediating checkout and return operations.',
      'Enforce invariants: a book cannot be checked out if `available_copies == 0`.'
    ]
  },
  intuition: {
    overview: 'The Library class encapsulates the collections of Books and Members, exposing high-level transaction methods that enforce business rules.',
    steps: [
      { step: 1, title: 'Verify Eligibility', description: 'Check that member is active, has not exceeded borrow limit, and book has available copies.' },
      { step: 2, title: 'Execute Checkout', description: 'Decrement book copies, add book to member loans, record transaction.' },
      { step: 3, title: 'Execute Return', description: 'Increment book copies, remove from member loans, calculate any overdue fees.' }
    ]
  },
  codeExample: {
    title: 'Complete Library OOP Implementation',
    code: `class Book:
    def __init__(self, isbn: str, title: str, author: str, total_copies: int = 1):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.total_copies = total_copies
        self.available_copies = total_copies

    def borrow_copy(self) -> bool:
        if self.available_copies > 0:
            self.available_copies -= 1
            return True
        return False

    def return_copy(self):
        if self.available_copies < self.total_copies:
            self.available_copies += 1

class Member:
    def __init__(self, member_id: str, name: str, max_loans: int = 3):
        self.member_id = member_id
        self.name = name
        self.max_loans = max_loans
        self.borrowed_isbns = set()

    def can_borrow(self) -> bool:
        return len(self.borrowed_isbns) < self.max_loans

class Library:
    def __init__(self):
        self.books = {}
        self.members = {}

    def add_book(self, book: Book):
        self.books[book.isbn] = book

    def register_member(self, member: Member):
        self.members[member.member_id] = member

    def checkout_book(self, member_id: str, isbn: str) -> bool:
        member = self.members.get(member_id)
        book = self.books.get(isbn)
        if not member or not book:
            return False
        if not member.can_borrow():
            return False
        if book.borrow_copy():
            member.borrowed_isbns.add(isbn)
            return True
        return False

lib = Library()
b1 = Book("978-01", "Fluent Python", "Luciano Ramalho", total_copies=1)
m1 = Member("M01", "Alice")
lib.add_book(b1)
lib.register_member(m1)

print("Checkout successful?", lib.checkout_book("M01", "978-01"))
print("Available copies remaining:", b1.available_copies)`,
    explanation: 'Demonstrates a complete OOP system with Book, Member, and Library classes coordinating checkout business rules.'
  },
  runnableCode: {
    code: `class Item:
    def __init__(self, name, stock):
        self.name = name
        self.stock = stock

    def take(self):
        if self.stock > 0:
            self.stock -= 1
            return True
        return False

book = Item("Python Handbook", 1)
print("First borrow:", book.take())
print("Second borrow (out of stock):", book.take())`,
    expectedOutput: `First borrow: True
Second borrow (out of stock): False`
  },
  lineByLine: [
    { line: 6, code: '    def take(self):', explanation: 'Enforces availability invariant before decrementing stock.' },
    { line: 12, code: 'print("First borrow:", book.take())', explanation: 'Successfully borrows only available copy.' },
    { line: 13, code: 'print("Second borrow:", book.take())', explanation: 'Fails safely when stock is 0.' }
  ],
  commonMistakes: [
    {
      mistake: 'Directly modifying `book.available_copies -= 1` from the outside without checking if copies > 0.',
      whyWrong: 'Breaks encapsulation and leads to negative available copies (-1 copies available!).',
      howToFix: 'Encapsulate mutations inside a method `borrow_copy()` that validates availability.'
    },
    {
      mistake: 'Allowing members to borrow more than their loan limit.',
      whyWrong: 'Violates core library business rules.',
      howToFix: 'Check `member.can_borrow()` before initiating checkout.'
    }
  ],
  realWorldApplications: [
    { title: 'Inventory Reservation Systems', description: 'Reserving hotel rooms, airline seats, or rental cars with concurrency checks.' },
    { title: 'Digital Asset Licensing', description: 'Managing multi-seat software licenses in enterprise IT systems.' }
  ],
  practiceQuestions: [
    { question: 'What is the primary role of the `Library` class in this architecture?', hint: 'Design pattern.', answer: 'It acts as the service facade/mediator that coordinates transactions between Book and Member instances while enforcing business rules.' },
    { question: 'Why is `borrowed_isbns` modeled as a set instead of a list?', hint: 'Uniqueness and lookup.', answer: 'Sets prevent duplicate ISBN entries and provide O(1) membership checks and deletions.' },
    { question: 'What design principle suggests hiding `available_copies` behind `borrow_copy()`?', hint: 'OOP pillar.', answer: 'Encapsulation.' }
  ],
  quiz: [
    {
      question: 'In object-oriented design, what relationship exists between `Library` and `Book`?',
      options: ['Library IS-A Book (Inheritance)', 'Library HAS-A Book (Composition / Aggregation)', 'Book IS-A Library', 'No relationship'],
      correctAnswer: 1,
      explanation: 'A Library "has" books; this is a composition/aggregation relationship.'
    },
    {
      question: 'What should `checkout_book` return if a member has reached their borrowing limit?',
      options: ['True', 'False (or raise a custom exception)', 'None', 'Delete the member'],
      correctAnswer: 1,
      explanation: 'It must fail safely, returning False or raising an exception to reject the checkout.'
    },
    {
      question: 'Why should `Book` track both `total_copies` and `available_copies`?',
      options: ['To calculate lost books and ensure returns do not exceed total stock', 'To speed up bytecode', 'For database compatibility only', 'PEP 8 requirement'],
      correctAnswer: 0,
      explanation: 'Tracking both ensures returned copies never exceed total catalog ownership and allows tracking utilization.'
    }
  ],
  codingChallenge: {
    title: 'Calculate Overdue Late Fee',
    difficulty: 'Intermediate',
    description: 'Write a function `calculate_fine(days_overdue: int, daily_rate: float, max_fine: float) -> float` that computes the late fee: `min(days_overdue * daily_rate, max_fine)`. If `days_overdue <= 0`, return `0.0`. Round result to 2 decimal places.',
    starterCode: `def calculate_fine(days_overdue: int, daily_rate: float, max_fine: float) -> float:
    # Write your solution here
    pass`,
    hints: [
      'If days_overdue <= 0: return 0.0.',
      'fine = min(days_overdue * daily_rate, max_fine).',
      'Return round(fine, 2).'
    ],
    solution: `def calculate_fine(days_overdue: int, daily_rate: float, max_fine: float) -> float:
    if days_overdue <= 0:
        return 0.0
    fine = min(float(days_overdue) * daily_rate, max_fine)
    return round(fine, 2)`,
    testCases: [
      { input: '5, 0.50, 10.0', expectedOutput: '2.5' },
      { input: '30, 1.00, 15.0', expectedOutput: '15.0' },
      { input: '-2, 0.50, 10.0', expectedOutput: '0.0' }
    ]
  }
};

m12Lessons['py-project-fastapi'] = {
  id: 'py-project-fastapi',
  moduleId: 'python-module-12',
  title: 'Project 6: REST API with FastAPI',
  subtitle: 'FastAPI Router, Pydantic Request Validation, Async Handlers, and OpenAPI Documentation',
  order: 6,
  readTimeMinutes: 70,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Build high-performance web microservices using the modern `FastAPI` framework.',
    'Define strict request/response data contracts using `pydantic.BaseModel`.',
    'Implement asynchronous path operation decorators (`@app.get`, `@app.post`, `@app.delete`).',
    'Leverage automated interactive Swagger / OpenAPI documentation (`/docs`).'
  ],
  prerequisites: ['Python type hints, HTTP REST basics, and async/await syntax.'],
  analogy: {
    title: 'The High-Speed Drive-Through with Automated Intercom and Menu',
    text: 'A traditional legacy web framework is an old diner where a waiter writes orders on paper, often misinterpreting "no cheese" or illegible handwriting. FastAPI is an automated digital drive-through: the customer speaks into the intercom (HTTP request), Pydantic digital sensors verify the exact coupon code and format before the kitchen even starts cooking (type validation), and the digital board instantly displays the automated nutritional menu (`/docs`).',
    metaphor: 'FastAPI combines type-hint validation with asynchronous high-throughput request handling.'
  },
  problemSolved: {
    title: 'Eliminating Manual Request Validation Boilerplate in Web APIs',
    description: 'In legacy frameworks, developers write dozens of lines validating JSON fields, parsing strings to ints, and writing OpenAPI documentation manually. FastAPI automates validation, serialization, and API documentation directly from standard Python type hints.',
    keyPoints: [
      'Pydantic `BaseModel` defines schema shapes with automatic type validation.',
      'Path parameters (`/items/{id}`) and query parameters (`?skip=0&limit=10`) are type-checked automatically.',
      'Returning Pydantic models automatically serializes them to JSON and filters response fields via `response_model`.',
      'FastAPI generates interactive OpenAPI Swagger UI docs at `/docs` out of the box.'
    ]
  },
  intuition: {
    overview: 'FastAPI inspects function signature type annotations at startup, generates OpenAPI JSON schemas, and wires Starlette ASGI routing to Pydantic validators.',
    steps: [
      { step: 1, title: 'Route Match', description: 'Starlette router matches incoming HTTP path and method.' },
      { step: 2, title: 'Validation', description: 'Pydantic validates request body against BaseModel schema (returns 422 on failure).' },
      { step: 3, title: 'Async Execution', description: 'Async endpoint executes on event loop and returns serialized response.' }
    ]
  },
  codeExample: {
    title: 'Complete FastAPI CRUD Microservice Architecture',
    code: `from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional

# Pydantic Schemas
class ItemCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=50)
    price: float = Field(..., gt=0.0)
    in_stock: bool = True

class ItemResponse(ItemCreate):
    id: int

app = FastAPI(title="Item Store API", version="1.0.0")

# In-memory database
items_db = {}
next_id = 1

@app.post("/items", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
async def create_item(payload: ItemCreate):
    global next_id
    item_id = next_id
    next_id += 1
    record = ItemResponse(id=item_id, **payload.dict())
    items_db[item_id] = record
    return record

@app.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return items_db[item_id]`,
    explanation: 'Demonstrates FastAPI route handlers, Pydantic BaseModel validation with Field, status codes, and HTTPException.'
  },
  runnableCode: {
    code: `# Simulating Pydantic and FastAPI endpoint mechanics in pure Python
class MockPydanticModel:
    def __init__(self, **kwargs):
        if "price" in kwargs and kwargs["price"] <= 0:
            raise ValueError("Price must be positive")
        self.__dict__.update(kwargs)

def mock_endpoint(data):
    try:
        validated = MockPydanticModel(**data)
        return {"status": 201, "body": validated.__dict__}
    except ValueError as e:
        return {"status": 422, "detail": str(e)}

print("Valid request:", mock_endpoint({"title": "Book", "price": 19.99}))
print("Invalid request:", mock_endpoint({"title": "Book", "price": -5.0}))`,
    expectedOutput: `Valid request: {'status': 201, 'body': {'title': 'Book', 'price': 19.99}}
Invalid request: {'status': 422, 'detail': 'Price must be positive'}`
  },
  lineByLine: [
    { line: 4, code: '        if "price" in kwargs and kwargs["price"] <= 0:', explanation: 'Simulates Pydantic Field validation.' },
    { line: 12, code: '        return {"status": 422, "detail": str(e)}', explanation: 'Returns HTTP 422 Unprocessable Entity on validation failure.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using blocking I/O calls (like `time.sleep()` or synchronous database drivers) inside `async def` FastAPI routes.',
      whyWrong: 'Blocks the entire asyncio event loop, causing all concurrent API requests to stall.',
      howToFix: 'Use `await asyncio.sleep()`, asynchronous database drivers (like `asyncpg` or `tortoise-orm`), or define the route with regular `def` (FastAPI automatically runs regular `def` routes in a thread pool!).'
    },
    {
      mistake: 'Returning database models directly without a `response_model` schema.',
      whyWrong: 'Risks leaking internal database fields (like password hashes or internal IDs) in the API response.',
      howToFix: 'Always specify `response_model=PublicResponseSchema` to filter response fields.'
    }
  ],
  realWorldApplications: [
    { title: 'Machine Learning Model Serving', description: 'Deploying PyTorch and Scikit-learn inference endpoints behind high-throughput FastAPI routers.' },
    { title: 'Fintech Banking APIs', description: 'Strictly validating transactions and money movements using Pydantic contracts.' }
  ],
  practiceQuestions: [
    { question: 'What underlying ASGI framework does FastAPI build upon for routing and HTTP handling?', hint: 'Star-themed framework.', answer: '`Starlette`.' },
    { question: 'What HTTP status code does FastAPI return automatically when a request fails Pydantic schema validation?', hint: '4xx status code.', answer: '`422 Unprocessable Entity`.' },
    { question: 'At what URL endpoint does FastAPI serve interactive Swagger documentation by default?', hint: 'Standard docs route.', answer: '`/docs` (and ReDoc at `/redoc`).' }
  ],
  quiz: [
    {
      question: 'Which library does FastAPI use for data validation and schema definition?',
      options: ['marshmallow', 'pydantic', 'cerberus', 'schema'],
      correctAnswer: 1,
      explanation: 'FastAPI is built deeply upon `pydantic` for data validation.'
    },
    {
      question: 'What happens if you define a FastAPI path operation with normal `def` instead of `async def`?',
      options: ['It raises a SyntaxError', 'FastAPI runs it in an external thread pool, preventing it from blocking the event loop', 'It runs synchronously blocking the server', 'It is disabled'],
      correctAnswer: 1,
      explanation: 'FastAPI automatically offloads standard `def` routes to a threadpool (`anyio.to_thread`), making blocking code safe.'
    },
    {
      question: 'How do you raise an HTTP error with status code and detail message in FastAPI?',
      options: ['raise HTTPException(status_code=404, detail="Not Found")', 'raise ValueError(404)', 'return 404', 'abort(404)'],
      correctAnswer: 0,
      explanation: 'FastAPI uses `raise HTTPException(status_code=..., detail=...)`.'
    }
  ],
  codingChallenge: {
    title: 'Validate Item Payload Schema',
    difficulty: 'Intermediate',
    description: 'Write a validation function `validate_product_payload(payload: dict) -> tuple[bool, str]` that validates an incoming dictionary: `"title"` must be a non-empty string, `"price"` must be a float or int > 0, and `"stock"` must be an int >= 0. Return `(True, "OK")` if valid, or `(False, "error_reason")` on failure.',
    starterCode: `def validate_product_payload(payload: dict) -> tuple[bool, str]:
    # Write your solution here
    pass`,
    hints: [
      'Check if not isinstance(payload.get("title"), str) or not payload["title"].strip(): return False, "Invalid title".',
      'Check if not isinstance(payload.get("price"), (int, float)) or payload["price"] <= 0: return False, "Invalid price".',
      'Check stock >= 0.'
    ],
    solution: `def validate_product_payload(payload: dict) -> tuple[bool, str]:
    title = payload.get("title")
    if not isinstance(title, str) or not title.strip():
        return False, "Invalid title"
    price = payload.get("price")
    if not isinstance(price, (int, float)) or price <= 0:
        return False, "Invalid price"
    stock = payload.get("stock")
    if not isinstance(stock, int) or stock < 0:
        return False, "Invalid stock"
    return True, "OK"`,
    testCases: [
      { input: '{"title": "Keyboard", "price": 49.99, "stock": 10}', expectedOutput: '(True, "OK")' },
      { input: '{"title": "", "price": 10.0, "stock": 5}', expectedOutput: '(False, "Invalid title")' }
    ]
  }
};

m12Lessons['py-project-data-analysis'] = {
  id: 'py-project-data-analysis',
  moduleId: 'python-module-12',
  title: 'Project 7: End-to-End Data Analysis Case Study',
  subtitle: 'Dataset Ingestion, Cleaning, Correlation Analysis, Hypothesis Testing, and Executive Insights',
  order: 7,
  readTimeMinutes: 60,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Execute a complete data analysis lifecycle from raw CSV ingestion to executive business insights.',
    'Handle dirty data: missing values, erroneous dates, duplicate records, and extreme outliers.',
    'Conduct feature engineering: derive new ratios, categorize continuous variables, and aggregate rolling metrics.',
    'Synthesize quantitative findings into actionable conclusions.'
  ],
  prerequisites: ['Pandas, NumPy, Matplotlib, and data cleaning basics.'],
  analogy: {
    title: 'The Crime Scene Detective and Forensic Scientist',
    text: 'Raw data is an unorganized crime scene with muddy footprints, fingerprint smudges, and scattered witnesses. An exploratory data analyst is the lead detective: you preserve the evidence, catalog every artifact, clean away the soot, verify witness timelines against security footage (data validation), test hypotheses ("Did the suspect enter through the window?"), and present an airtight forensic report to the jury.',
    metaphor: 'Data analysis transforms scattered empirical observations into verifiable business truths.'
  },
  problemSolved: {
    title: 'Translating Raw Organizational Records into Strategic Decisions',
    description: 'Companies store petabytes of user clicks and transactional records. Without structured data analysis, executive teams make multi-million dollar decisions based on intuition. Data analysis provides empirical evidence.',
    keyPoints: [
      'Phase 1: Ingestion & Integrity Audit (shape, columns, nulls, duplicates).',
      'Phase 2: Cleaning & Imputation (standardizing values, handling missing fields).',
      'Phase 3: Exploratory Visualization (distributions, correlations, scatter plots).',
      'Phase 4: Synthesis & Recommendation (actionable insights backed by metrics).'
    ]
  },
  intuition: {
    overview: 'A disciplined analytical workflow proceeds from univariate inspections (single variable distributions) to bivariate relationships (correlations) to multivariate models.',
    steps: [
      { step: 1, title: 'Inspect', description: 'Check df.info(), df.describe(), df.isnull().sum().' },
      { step: 2, title: 'Transform', description: 'Clean anomalies and create derived features.' },
      { step: 3, title: 'Analyze', description: 'Compute group metrics, correlations, and visualize trends.' }
    ]
  },
  codeExample: {
    title: 'Complete Analytical Case Study Pipeline',
    code: `import pandas as pd
import numpy as np

# 1. Ingest raw e-commerce transaction dataset
raw_data = {
    "order_id": [101, 102, 103, 104, 105, 106],
    "customer_segment": ["Consumer", "Corporate", "Consumer", "Consumer", "Corporate", "Home Office"],
    "sales": [250.0, 1200.0, 45.0, 310.0, np.nan, 890.0],
    "discount": [0.0, 0.15, 0.0, 0.05, 0.10, 0.20],
    "returned": ["No", "No", "Yes", "No", "No", "No"]
}
df = pd.DataFrame(raw_data)

# 2. Cleaning: Impute missing sales with segment median
df["sales"] = df.groupby("customer_segment")["sales"].transform(
    lambda grp: grp.fillna(grp.median())
)

# 3. Feature Engineering: Net revenue after discount
df["net_revenue"] = df["sales"] * (1 - df["discount"])

# 4. Segment Performance Analysis
segment_report = df.groupby("customer_segment").agg(
    total_orders=("order_id", "count"),
    total_revenue=("net_revenue", "sum"),
    avg_ticket=("net_revenue", "mean")
).round(2)

print("Executive Segment Performance Report:\\n", segment_report)`,
    explanation: 'Demonstrates handling missing values by group median, feature engineering net revenue, and generating executive aggregations.'
  },
  runnableCode: {
    code: `# Calculating conversion rate and ROI metrics
traffic_data = [
    {"source": "Google", "clicks": 1000, "conversions": 35},
    {"source": "Facebook", "clicks": 2500, "conversions": 40},
    {"source": "Email", "clicks": 500, "conversions": 60}
]

for ch in traffic_data:
    cr = (ch["conversions"] / ch["clicks"]) * 100
    print(f"{ch['source']:<10}: {cr:.2f}% conversion rate")`,
    expectedOutput: `Google    : 3.50% conversion rate
Facebook  : 1.60% conversion rate
Email     : 12.00% conversion rate`
  },
  lineByLine: [
    { line: 8, code: '    cr = (ch["conversions"] / ch["clicks"]) * 100', explanation: 'Calculates key performance indicator (Conversion Rate).' },
    { line: 9, code: '    print(...)', explanation: 'Outputs formatted marketing channel comparison.' }
  ],
  commonMistakes: [
    {
      mistake: 'Confusing correlation with causation: asserting that feature A causes feature B because `r = 0.85`.',
      whyWrong: 'A third confounding variable (lurking variable) often drives both (e.g. ice cream sales and shark attacks both correlate with summer temperature).',
      howToFix: 'Carefully describe findings as associations or correlations, not causal mechanisms, unless supported by controlled experiments (A/B testing).'
    },
    {
      mistake: 'Discarding all rows with any missing values via `df.dropna()` without checking loss percentage.',
      whyWrong: 'Can discard 80% of data if missing values are scattered across different columns.',
      howToFix: 'Audit missingness percentage per feature and use targeted imputation.'
    }
  ],
  realWorldApplications: [
    { title: 'Executive KPI Dashboards', description: 'Delivering weekly operational metrics on customer acquisition cost and churn to executive leadership.' },
    { title: 'Healthcare Patient Outcomes', description: 'Analyzing clinical trial efficacy and identifying adverse drug interaction correlations.' }
  ],
  practiceQuestions: [
    { question: 'What is the primary difference between univariate and bivariate analysis?', hint: 'Number of variables.', answer: 'Univariate analysis inspects the distribution of a single variable (e.g. histogram of age); bivariate analysis explores the relationship between two variables (e.g. scatter plot of age vs income).' },
    { question: 'Why is feature engineering considered one of the highest-leverage steps in data analysis?', hint: 'Domain context.', answer: 'Because creating domain-relevant metrics (e.g. debt-to-income ratio) exposes critical patterns that raw raw variables hide.' },
    { question: 'What is a confounding variable?', hint: 'Hidden third factor.', answer: 'An extraneous variable that correlates with both the independent and dependent variables, creating a spurious correlation.' }
  ],
  quiz: [
    {
      question: 'Which metric best describes the central tendency of an income distribution heavily skewed by extreme multi-millionaires?',
      options: ['Mean', 'Median', 'Mode', 'Variance'],
      correctAnswer: 1,
      explanation: 'The median represents the 50th percentile and is unaffected by extreme high outliers.'
    },
    {
      question: 'What is the danger of evaluating marketing campaigns solely on raw conversion counts rather than conversion rate?',
      options: ['It ignores the volume of traffic/spend invested into each channel', 'It causes divide by zero', 'It violates PEP 8', 'It runs slower'],
      correctAnswer: 0,
      explanation: 'Channels with massive traffic may produce high raw conversions while having terrible conversion rates and high customer acquisition costs.'
    },
    {
      question: 'Which Pandas method is best for creating categorical bucket bins from continuous values (e.g. ages into "Child", "Adult", "Senior")?',
      options: ['pd.cut()', 'pd.bin()', 'pd.bucket()', 'pd.split()'],
      correctAnswer: 0,
      explanation: '`pd.cut()` segments continuous values into discrete interval bins.'
    }
  ],
  codingChallenge: {
    title: 'Calculate Retention and Churn Rate',
    difficulty: 'Intermediate',
    description: 'Write a function `calculate_retention_metrics(start_users: int, end_users: int, new_users: int) -> dict[str, float]` that calculates retention rate `(end_users - new_users) / start_users` and churn rate `1.0 - retention_rate`. Return `{"retention_rate": ret, "churn_rate": churn}` rounded to 4 decimal places. If start_users <= 0, return `{"retention_rate": 0.0, "churn_rate": 0.0}`.',
    starterCode: `def calculate_retention_metrics(start_users: int, end_users: int, new_users: int) -> dict[str, float]:
    # Write your solution here
    pass`,
    hints: [
      'If start_users <= 0: return 0.0, 0.0.',
      'ret = (end_users - new_users) / start_users.',
      'churn = 1.0 - ret.',
      'Round both to 4 decimal places.'
    ],
    solution: `def calculate_retention_metrics(start_users: int, end_users: int, new_users: int) -> dict[str, float]:
    if start_users <= 0:
        return {"retention_rate": 0.0, "churn_rate": 0.0}
    retained = end_users - new_users
    ret = max(0.0, min(1.0, retained / start_users))
    churn = round(1.0 - ret, 4)
    return {"retention_rate": round(ret, 4), "churn_rate": churn}`,
    testCases: [
      { input: '1000, 950, 100', expectedOutput: '{"retention_rate": 0.85, "churn_rate": 0.15}' }
    ]
  }
};

m12Lessons['py-project-ml-api'] = {
  id: 'py-project-ml-api',
  moduleId: 'python-module-12',
  title: 'Project 8: ML Model Prediction API Service',
  subtitle: 'Model Serialization with Joblib, FastAPI Inference Endpoint, and Production Monitoring',
  order: 8,
  readTimeMinutes: 70,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Train a Scikit-learn predictive model and serialize it safely using `joblib`.',
    'Build a production-grade FastAPI inference microservice to serve live predictions.',
    'Define strict input validation schemas for feature payloads using Pydantic.',
    'Implement health check endpoints (`/health`), latency tracking, and structured prediction logging.'
  ],
  prerequisites: ['FastAPI, Pydantic, Scikit-learn pipelines, and HTTP REST APIs.'],
  analogy: {
    title: 'The AI Radiologist and The Hospital Triage Intercom',
    text: 'Training a machine learning model in a Jupyter Notebook is like a brilliant medical researcher discovering a cancer detection formula on laboratory chalkboard slides. The ML Prediction API is turning that formula into an automated clinic terminal: hospital doctors upload patient scan parameters (Pydantic schema), the computerized terminal evaluates the model in 15 milliseconds, returns a probability score, and logs the diagnosis to hospital records.',
    metaphor: 'The prediction API bridges offline data science models to live production applications.'
  },
  problemSolved: {
    title: 'Deploying Machine Learning Models Beyond Jupyter Notebooks',
    description: 'Over 80% of machine learning models built in notebooks never reach production. Packaging the model into a serialized container with an asynchronous API makes predictions consumable by web apps, mobile clients, and backend microservices.',
    keyPoints: [
      '`joblib.dump(model, "model.joblib")` compresses NumPy and Scikit-learn models efficiently.',
      'Load the model ONCE during application startup (FastAPI lifespan context), never on every request.',
      'Validate feature names, types, and value bounds using Pydantic before passing to `model.predict()`.',
      'Return probability distributions (`predict_proba`) alongside discrete class labels.'
    ]
  },
  intuition: {
    overview: 'The service maintains a pre-warmed model instance in memory. When a POST request arrives, it validates features, converts to a NumPy 2D array, runs inference, and returns JSON.',
    steps: [
      { step: 1, title: 'Startup Lifespan', description: 'Load serialized model.joblib into memory once on server boot.' },
      { step: 2, title: 'Request Ingestion', description: 'Pydantic validates input JSON feature types and bounds.' },
      { step: 3, title: 'Inference & Response', description: 'Execute model.predict() and return structured prediction response.' }
    ]
  },
  codeExample: {
    title: 'Production ML Prediction API Architecture with Lifespan Loading',
    code: `import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from contextlib import asynccontextmanager
import numpy as np

# Pydantic schema for prediction request
class HouseFeatures(BaseModel):
    bedrooms: int = Field(..., ge=1, le=10, description="Number of bedrooms")
    bathrooms: float = Field(..., gt=0.0, le=8.0)
    sqft: float = Field(..., gt=200.0, le=20_000.0)
    zipcode: str = Field(..., regex=r"^\\d{5}\$")

class PredictionResponse(BaseModel):
    estimated_price: float
    confidence_interval: tuple[float, float]

# Global model container
ml_models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on server boot
    # ml_models["house_pricer"] = joblib.load("model.joblib")
    # Using mock model for demonstration
    class MockModel:
        def predict(self, X): return np.array([row[2] * 250.0 for row in X])
    ml_models["house_pricer"] = MockModel()
    yield
    # Cleanup on shutdown
    ml_models.clear()

app = FastAPI(title="Real Estate Valuation API", lifespan=lifespan)

@app.post("/predict", response_model=PredictionResponse)
async def predict_price(payload: HouseFeatures):
    model = ml_models.get("house_pricer")
    if not model:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Format features into 2D array
    features = np.array([[payload.bedrooms, payload.bathrooms, payload.sqft]])
    prediction = float(model.predict(features)[0])
    
    return PredictionResponse(
        estimated_price=round(prediction, 2),
        confidence_interval=(round(prediction * 0.95, 2), round(prediction * 1.05, 2))
    )`,
    explanation: 'Demonstrates modern FastAPI lifespan model pre-loading, Pydantic feature validation with Field, and returning structured predictions.'
  },
  runnableCode: {
    code: `# Simulated ML inference pipeline
class MockClassifier:
    def predict_proba(self, X):
        # Returns [prob_class_0, prob_class_1]
        score = sum(X[0])
        p1 = 1 / (1 + 2.718 ** (-score)) # Sigmoid
        return [[1 - p1, p1]]

model = MockClassifier()
features = [[0.5, 1.2, -0.3]]
probs = model.predict_proba(features)[0]

print(f"Inference Probabilities: Class 0 = {probs[0]:.2%}, Class 1 = {probs[1]:.2%}")
predicted_class = 1 if probs[1] >= 0.5 else 0
print(f"Predicted Class: {predicted_class}")`,
    expectedOutput: `Inference Probabilities: Class 0 = 20.18%, Class 1 = 79.82%
Predicted Class: 1`
  },
  lineByLine: [
    { line: 6, code: '        p1 = 1 / (1 + 2.718 ** (-score))', explanation: 'Computes sigmoid activation function for probability score.' },
    { line: 13, code: 'predicted_class = 1 if probs[1] >= 0.5 else 0', explanation: 'Applies 0.5 decision threshold for binary classification.' }
  ],
  commonMistakes: [
    {
      mistake: 'Loading the model from disk on every single incoming API request: `joblib.load()` inside the route function.',
      whyWrong: 'Reading multi-hundred-megabyte files from disk on every HTTP request drops throughput to 2 requests per second and spikes CPU/disk I/O.',
      howToFix: 'Load the model ONCE into memory at server startup using FastAPI `lifespan` or module global state.'
    },
    {
      mistake: 'Passing raw user dictionary directly to `model.predict()` without feature order guarantee.',
      whyWrong: 'Dictionary key ordering can mismatch the exact column order expected by Scikit-learn, causing silent bogus predictions.',
      howToFix: 'Construct the 2D feature matrix explicitly: `[[payload.f1, payload.f2, payload.f3]]`.'
    }
  ],
  realWorldApplications: [
    { title: 'Credit Card Fraud Scoring', description: 'Scoring live transactions in < 20 milliseconds during checkout processing.' },
    { title: 'Recommendation Engines', description: 'Serving personalized product recommendations to mobile and e-commerce apps.' }
  ],
  practiceQuestions: [
    { question: 'Why is `joblib` preferred over `pickle` for serializing Scikit-learn models?', hint: 'NumPy array optimization.', answer: '`joblib` contains specialized optimizations for serializing large NumPy array buffers efficiently with fast disk I/O and compression.' },
    { question: 'When should a machine learning model be loaded into memory in an API service?', hint: 'Startup vs per-request.', answer: 'Once at server startup (e.g. in FastAPI lifespan handler), keeping the model pre-warmed in RAM.' },
    { question: 'Why should a prediction API return `predict_proba` probabilities instead of only raw class labels?', hint: 'Confidence and decision thresholds.', answer: 'Probabilities communicate model confidence and allow client applications to adjust decision thresholds (e.g. flagging fraud at 70% probability).' }
  ],
  quiz: [
    {
      question: 'Which tool is the industry standard for serializing Python models with NumPy arrays?',
      options: ['json', 'joblib', 'csv', 'yaml'],
      correctAnswer: 1,
      explanation: '`joblib` is optimized for large numeric arrays in Scikit-learn models.'
    },
    {
      question: 'What is the primary risk of not validating feature bounds in an ML API?',
      options: ['The computer catches fire', 'Out-of-distribution values (like negative age or sqft=1,000,000) produce wild, garbage predictions', 'FastAPI crashes with SyntaxError', 'The model weights are erased'],
      correctAnswer: 1,
      explanation: 'Models fail unpredictably when fed out-of-distribution feature values that violate physical invariants.'
    },
    {
      question: 'In FastAPI, what feature allows executing code on startup (like loading models) and shutdown?',
      options: ['app.on_boot', 'The lifespan context manager parameter on FastAPI', 'sys.startup()', 'threading.Thread'],
      correctAnswer: 1,
      explanation: 'The `lifespan` context manager handles startup pre-warming and graceful shutdown cleanup.'
    }
  ],
  codingChallenge: {
    title: 'Format Prediction Payload with Threshold',
    difficulty: 'Advanced',
    description: 'Write a function `format_prediction_response(probability: float, threshold: float = 0.5) -> dict` that takes a probability score `[0.0, 1.0]` and returns `{"prediction": 1 if probability >= threshold else 0, "probability": round(probability, 4), "confidence": "high" if abs(probability - 0.5) >= 0.3 else "moderate"}`.',
    starterCode: `def format_prediction_response(probability: float, threshold: float = 0.5) -> dict:
    # Write your solution here
    pass`,
    hints: [
      'pred = 1 if probability >= threshold else 0.',
      'confidence = "high" if abs(probability - 0.5) >= 0.3 else "moderate".',
      'Return dict.'
    ],
    solution: `def format_prediction_response(probability: float, threshold: float = 0.5) -> dict:
    prob = round(float(probability), 4)
    pred = 1 if prob >= threshold else 0
    confidence = "high" if abs(prob - 0.5) >= 0.3 else "moderate"
    return {
        "prediction": pred,
        "probability": prob,
        "confidence": confidence
    }`,
    testCases: [
      { input: '0.85, 0.5', expectedOutput: '{"prediction": 1, "probability": 0.85, "confidence": "high"}' },
      { input: '0.45, 0.5', expectedOutput: '{"prediction": 0, "probability": 0.45, "confidence": "moderate"}' }
    ]
  }
};

const py12Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-12.ts');
writePythonModuleFile(py12Path, m12.data, m12Lessons);
console.log('Python Module 12 completed! Authored:', Object.keys(m12Lessons).length);
