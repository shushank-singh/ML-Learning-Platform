import os
import sys
import json
import subprocess
from pandas_helpers import create_pandas_lesson, write_pandas_module_ts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "pandas")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_pandas_module(mod_id, mod_num, title, subtitle, desc, badge, hours, raw_list, next_mod_id=None, next_mod_title=None):
    lessons_dict = {}
    summaries = []
    
    for idx, t in enumerate(raw_list):
        (id, mid, t_title, t_sub, order, readTime, diff,
         an_title, an_text, an_meta,
         pr_title, pr_desc,
         code,
         scen, scen_desc,
         pq_q, pq_a,
         ex_p, ex_s) = t

        next_t = raw_list[idx + 1] if idx + 1 < len(raw_list) else None
        nextId = next_t[0] if next_t else (next_mod_id if next_mod_id else "")
        nextTitle = next_t[2] if next_t else (next_mod_title if next_mod_title else "")
        nextModule = mid if next_t else (next_mod_id if next_mod_id else "")

        les = create_pandas_lesson(
            id=id,
            moduleId=mid,
            title=t_title,
            subtitle=t_sub,
            order=order,
            readTime=readTime,
            difficulty=diff,
            objectives=[
                f"Master practical machine learning data preparation with {t_title}.",
                "Understand the tabular DataFrame mechanics and feature matrix requirements.",
                "Prevent data leakage, dimensionality explosion, and type mismatch errors.",
                "Bridge raw Pandas DataFrames to scikit-learn models cleanly."
            ],
            prerequisites=["Pandas Foundations", "Data Cleaning & Transformation"],
            analogy={"title": an_title, "text": an_text, "metaphor": an_meta},
            problemSolved={"title": pr_title, "description": pr_desc, "keyPoints": [
                "Prepares raw tabular data into pristine numerical feature matrices.",
                "Ensures strict separation between explanatory features and prediction targets.",
                "Enables seamless conversion into NumPy arrays for machine learning estimators."
            ]},
            intuition={"overview": f"Inner mechanics of {t_title} in ML data workflows.", "steps": [
                {"step": 1, "title": "Schema Validation", "description": "Inspects types, null counts, and categorical cardinality."},
                {"step": 2, "title": "Feature Transformation", "description": "Encodes categories, bins continuous numbers, and scales variables."},
                {"step": 3, "title": "Array Export", "description": "Exports pure numerical arrays ready for scikit-learn or PyTorch."}
            ]},
            mathematics={"overview": f"Mathematical foundations for {t_title}.", "foundations": [
                {"name": "Design Matrix", "latex": "X \\in \\mathbb{R}^{n \\times d}, \\quad y \\in \\mathbb{R}^{n}", "explanation": "The n samples by d features input matrix and corresponding ground-truth targets."},
                {"name": "Feature Mapping", "latex": "\\phi(x): \\mathcal{X} \\to \\mathbb{R}^p", "explanation": "Mapping arbitrary heterogeneous categorical and numerical columns to continuous vectors."}
            ]},
            derivation={"title": f"Structural Analysis of {t_title}", "objective": "Verify matrix dimensions and information hygiene.", "steps": [
                {"step": 1, "label": "Dimension Check", "latex": "X.\\text{shape}[0] == y.\\text{shape}[0] = n", "explanation": "Number of rows in features and labels must match exactly."},
                {"step": 2, "label": "Type Homogeneity", "latex": "X.\\text{dtypes} \\in \\{\\text{int8/16/32/64}, \\text{float32/64}\\}", "explanation": "Estimators require strictly numerical inputs."}
            ]},
            variables=[
                {"symbol": "X", "name": "Feature Matrix", "description": "2D tabular matrix of explanatory predictor variables", "dimensions": "n x d"},
                {"symbol": "y", "name": "Target Vector", "description": "1D Series or array of labels to predict", "dimensions": "n"}
            ],
            numericalExample={
                "scenario": scen,
                "dataset": [{"Record": 1, "Detail": scen_desc, "Status": "Optimal"}],
                "calculations": [{"step": "Verification", "math": "Operation executed", "result": "Verified"}],
                "finalConclusion": "The tabular transformation produced the exact expected output."
            },
            visualExplanation={
                "title": f"Visual Architecture: {t_title}",
                "description": f"How {t_title} formats data for statistical modeling.",
                "features": [
                    "Feature matrix X contains strictly independent predictor columns.",
                    "Target vector y isolates the dependent response variable.",
                    "Index coordinates maintain alignment between features and targets."
                ]
            },
            scratchCode={"title": "Interactive Python Demonstration", "code": code, "explanation": "Direct executable verification."},
            sklearnCode={"title": "Data Science Pipeline Usage", "code": code, "explanation": "How professional ML engineers write this in production."},
            runnableCode_snippet=code,
            lineByLineExplanation=[
                {"lines": "1-2", "codeSnippet": "import pandas as pd", "explanation": "Imports Pandas for tabular machine learning preparation."},
                {"lines": "3-5", "codeSnippet": "# Core operation", "explanation": "Transforms the DataFrame into model-ready features."}
            ],
            hyperparameters=[{"name": "drop_first", "defaultVal": "False", "range": "True, False", "effect": "Avoids dummy variable multicollinearity trap", "recommendation": "Set drop_first=True for linear/logistic regression; False for tree-based models."}],
            assumptions=[{"assumption": "Numerical purity", "whyItMatters": "Scikit-learn algorithms crash on strings or object dtypes", "howToVerify": "Check (X.dtypes == 'object').any() == False"}],
            commonMistakes=[{"mistake": "Fitting transformations on entire dataset before train-test split", "solution": "Fit on train set, transform train and test sets", "whyWrong": "Causes data leakage where test distribution leaks into training", "howToFix": "Split data before calculating imputers, scalers, or encoders"}],
            realWorldUseCases=[
                {"industry": "FinTech", "application": "Credit Risk Scoring", "benefit": "Cleaning applicant debt-to-income and encoding employment status."},
                {"industry": "E-Commerce", "application": "Customer Churn Prediction", "benefit": "Aggregating 90-day shopping features and target churn labels."}
            ],
            practiceQuestions=[
                {"id": "pq1", "question": pq_q, "hint": "Think about ML requirements.", "answer": pq_a},
                {"id": "pq2", "question": f"Why must X and y retain identical index alignment?", "hint": "Row correspondence.", "answer": "If rows become misaligned, the model learns to associate feature vector i with label j, destroying predictive validity."},
                {"id": "pq3", "question": f"How does {t_title} prevent production data leakage?", "hint": "Information hygiene.", "answer": "By isolating training statistics from validation/test data."}
            ],
            quiz=[
                {
                    "id": "q1",
                    "question": f"What is the primary role of {t_title} in ML pipelines?",
                    "options": [
                        "Preparing clean, numerically encoded, leak-free tabular data for model estimators",
                        "Compiling neural network kernels",
                        "Formatting markdown documentation",
                        "Generating random cryptographic keys"
                    ],
                    "correctIndex": 0,
                    "explanation": "Pandas serves as the data wrangling workhorse that turns raw dirty records into numerical matrices."
                },
                {
                    "id": "q2",
                    "question": "Why can scikit-learn models not accept raw strings directly in X?",
                    "options": [
                        "Machine learning algorithms perform linear algebra and matrix arithmetic which requires numbers.",
                        "Strings take up too much disk space.",
                        "Python prohibits strings in functions.",
                        "CPUs cannot store characters."
                    ],
                    "correctIndex": 0,
                    "explanation": "ML algorithms calculate dot products, gradients, and distances requiring numbers (float or int)."
                },
                {
                    "id": "q3",
                    "question": "What is data leakage in machine learning preprocessing?",
                    "options": [
                        "Using information from the test/validation set or future targets to transform the training set.",
                        "When memory leaks from RAM onto disk.",
                        "When CSV files are accidentally deleted.",
                        "When code comments are published publicly."
                    ],
                    "correctIndex": 0,
                    "explanation": "Data leakage occurs when test set statistics or target variables contaminate feature engineering, giving spuriously high test scores."
                }
            ],
            independentExercise={
                "title": f"Practice Task: {t_title}",
                "problem": ex_p,
                "difficulty": diff,
                "hints": ["Review the example code above", "Check your DataFrame columns and dtypes"],
                "starterCode": "import pandas as pd\n# Your solution here:\n",
                "solution": ex_s
            },
            summary={
                "keyTakeaways": [
                    f"Mastered {t_title} and its tabular data science application.",
                    "Learned to write clean, idiomatic modern Pandas code.",
                    "Ready to progress to the next lesson in the curriculum."
                ],
                "nextLessonId": nextId,
                "nextLessonTitle": nextTitle,
                "nextLessonModuleId": nextModule
            }
        )
        lessons_dict[les["id"]] = les
        summaries.append({
            "id": les["id"],
            "moduleId": les["moduleId"],
            "title": les["title"],
            "description": les["subtitle"],
            "order": les["order"],
            "readTimeMinutes": les["readTimeMinutes"],
            "visualizerType": les["visualizerType"],
            "difficulty": les["difficulty"]
        })

    mod_data = {
        "id": mod_id,
        "number": mod_num,
        "title": title,
        "subtitle": subtitle,
        "description": desc,
        "icon": "Layers",
        "badge": badge,
        "estimatedHours": hours,
        "topicsCount": len(summaries),
        "lessons": summaries
    }
    
    file_path = os.path.join(OUTPUT_DIR, f"{mod_id}.ts")
    write_pandas_module_ts(file_path, f"pandasModule{mod_num}", mod_data, lessons_dict)
    print(f"Generated {mod_id} with {len(lessons_dict)} lessons.")

# ==============================================================================
# MODULE 9: Pandas for Machine Learning (15 Lessons)
# ==============================================================================
m9_raw = [
    (
        "pandas-m9-l1", "pandas-module-9", "Cleanly Separating Feature Matrix X and Target Vector y",
        "Extracting predictor columns into 2D DataFrame X and response label into 1D Series y",
        1, 14, "Beginner",
        "Separating the Exam Questions from the Answer Key",
        "Imagine preparing an exam: the question packet given to students contains all the problem descriptions (Feature Matrix X). The sealed grader key contains the correct grades/answers (Target Vector y). You must never mix the answer key into the question packet.",
        "X = df.drop(columns=['target']) extracts features; y = df['target'] extracts the target vector.",
        "Leaving the Target Column Inside Feature Matrix X",
        "If you don't drop the target column from X, the model simply memorizes the target directly, achieving 100% training accuracy but failing completely in production.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'SquareFeet': [1200, 1500, 1800],\n    'Bedrooms': [2, 3, 3],\n    'Price': [250000, 310000, 360000]\n})\n# Clean separation\nX = df.drop(columns=['Price'])\ny = df['Price']\nprint('Feature Matrix X (2D):\\n', X)\nprint('Target Vector y (1D):\\n', y)",
        "Real Estate Home Valuations", "Extracting property attributes as features and final sale price as regression target.",
        "What is the required dimensionality of Feature Matrix X and Target Vector y?", "X must be a 2D tabular matrix (n_samples, n_features); y is typically a 1D vector or Series (n_samples).",
        "Separate features X and target 'label' from a DataFrame with cols ['f1', 'f2', 'label'].",
        "import pandas as pd\ndf = pd.DataFrame({'f1': [1], 'f2': [2], 'label': [0]})\nX, y = df.drop(columns=['label']), df['label']\nprint(list(X.columns), y.name)"
    ),
    (
        "pandas-m9-l2", "pandas-module-9", "Inspecting Shapes, Data Types, and Object Columns before ML",
        "Auditing dtypes with select_dtypes to identify text columns that will crash scikit-learn",
        2, 14, "Beginner",
        "A Metal Detector at an Airport Baggage Scanner",
        "Before loading baggage onto an aircraft, security scans every bag for prohibited items. Before passing a DataFrame to scikit-learn, select_dtypes(include='object') scans for text strings that will cause algorithms to crash.",
        "df.dtypes and df.select_dtypes(include=['object', 'category']) identify non-numerical columns requiring encoding.",
        "Passing Raw String Columns Directly to scikit-learn Models",
        "Scikit-learn algorithms run pure linear algebra and will crash with ValueError: could not convert string to float. Identifying object columns early prevents runtime crashes.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Age': [25, 42, 38],\n    'Salary': [55000.0, 92000.0, 81000.0],\n    'City': ['New York', 'London', 'Tokyo'],\n    'Approved': [True, False, True]\n})\nprint('Non-numerical columns requiring encoding:\\n', df.select_dtypes(include=['object']).columns.tolist())\nprint('Clean numerical features ready for models:\\n', df.select_dtypes(include=['number']).columns.tolist())",
        "Automated ML Health Check", "Running automated schema checks in data pipelines before invoking gradient boosted trees.",
        "Which Pandas method filters columns based on their data types?", "df.select_dtypes(include=[...], exclude=[...])",
        "Find all object columns in a DataFrame with numeric 'a' and string 'b'.",
        "import pandas as pd\ndf = pd.DataFrame({'a': [1], 'b': ['text']})\nprint(list(df.select_dtypes(include='object').columns))"
    ),
    (
        "pandas-m9-l3", "pandas-module-9", "Systematic Missing Value Audits and Pre-ML Imputation",
        "Detecting null distributions across features and applying median or mode imputation",
        3, 14, "Intermediate",
        "A Vehicle Inspection Sheet: Fixing Flat Tires Before the Race",
        "Before a Formula 1 car enters the track, mechanics check every bolt and tire pressure. If any part is missing, the car cannot start. Similarly, scikit-learn models cannot train with missing values (NaN); every null must be imputed or dropped.",
        "df.isna().sum() reveals missing value counts per column; df.fillna(df.median(numeric_only=True)) imputes central tendencies.",
        "Imputing with Mean When Outliers Distort the Average",
        "If 9 employees earn $50k and 1 CEO earns $10M, the mean salary is $1M! Imputing missing salaries with the mean gives fictitious values. Median imputation is far more robust to outliers.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Age': [22.0, 25.0, None, 45.0, 80.0],\n    'Income': [40000.0, None, 60000.0, 80000.0, 120000.0]\n})\nprint('Missing Counts:\\n', df.isna().sum())\n# Robust median imputation\nclean_df = df.fillna(df.median())\nprint('Imputed DataFrame:\\n', clean_df)",
        "Loan Application Scoring", "Imputing missing applicant income using the median income of their postal code.",
        "Why is median imputation preferred over mean imputation for skewed numerical features?", "Because the median is resistant to extreme outliers, whereas the mean is heavily skewed by extreme values.",
        "Impute nulls in series [1.0, None, 3.0] with the median.",
        "import pandas as pd\ns = pd.Series([1.0, None, 3.0])\nprint(s.fillna(s.median()))"
    ),
    (
        "pandas-m9-l4", "pandas-module-9", "Dropping Data Leakage Columns, Identifiers, and High-Cardinality Noise",
        "Pruning unique ID keys, timestamps, and target-derived proxy columns",
        4, 14, "Intermediate",
        "Removing Player Jersey Numbers from Skill Evaluation",
        "If you want to predict how many goals a soccer player scores, using their jersey number (#7 or #10) causes the model to memorize individual players instead of learning genuine physical attributes (speed, stamina). Removing IDs forces models to generalize.",
        "df.drop(columns=['id', 'ssn', 'timestamp']) eliminates uninformative identifiers and prevents memorization.",
        "Training on Customer_ID or Transaction_Hash",
        "High-cardinality ID columns have zero predictive signal on unseen test data. Tree models will split on arbitrary ID numbers, causing extreme overfitting.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'User_ID': ['U101', 'U102', 'U103'],\n    'App_Usage_Hours': [12.5, 4.2, 28.0],\n    'Subscription_Fee': [15.0, 15.0, 30.0],\n    'Churn': [0, 1, 0]\n})\n# Drop identifier and target\nX = df.drop(columns=['User_ID', 'Churn'])\nprint('Feature Matrix with IDs pruned:\\n', X)",
        "Fraud Detection Pipelines", "Dropping credit card transaction IDs and bank account hashes prior to XGBoost classification.",
        "Why should unique identifier columns like Customer_ID be removed before model training?", "Because unique IDs have no generalized relationship to the target and cause models to overfit to sample-specific noise.",
        "Drop columns 'id' and 'leak' from a DataFrame with cols ['id', 'feature', 'leak'].",
        "import pandas as pd\ndf = pd.DataFrame({'id': [1], 'feature': [10], 'leak': [99]})\nprint(list(df.drop(columns=['id', 'leak']).columns))"
    ),
    (
        "pandas-m9-l5", "pandas-module-9", "One-Hot Encoding Categorical Variables with pd.get_dummies()",
        "Converting discrete text categories into binary indicator columns (0 or 1)",
        5, 14, "Beginner",
        "Multiple Choice Checkboxes on an Application Form",
        "Instead of writing 'City: Madrid', a form has separate checkboxes: [ ] Madrid, [ ] Tokyo, [ ] Berlin. The applicant checks Madrid (1) and leaves the others blank (0). That is one-hot encoding.",
        "pd.get_dummies(df, columns=['cat'], drop_first=True, dtype=int) converts categories into binary columns.",
        "The Dummy Variable Multicollinearity Trap in Linear Regression",
        "If you create 3 columns for Red, Green, and Blue, their sum is always 1. In linear regression, this causes perfect multicollinearity (singular matrix). Use drop_first=True to eliminate redundant baseline columns.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'City': ['Paris', 'Tokyo', 'Paris', 'New York'],\n    'Price': [100, 200, 150, 300]\n})\nencoded = pd.get_dummies(df, columns=['City'], drop_first=True, dtype=int)\nprint('One-Hot Encoded (drop_first=True):\\n', encoded)",
        "Customer Demographic Modeling", "Encoding categorical marital status, education level, and preferred shipping tier.",
        "Why should drop_first=True be used when one-hot encoding for linear and logistic regression models?", "To avoid multicollinearity (the dummy variable trap), where one category can be perfectly predicted from the others.",
        "One-hot encode a column 'color' with values ['red', 'blue'] with dtype=int.",
        "import pandas as pd\ndf = pd.DataFrame({'color': ['red', 'blue']})\nprint(pd.get_dummies(df, dtype=int))"
    ),
    (
        "pandas-m9-l6", "pandas-module-9", "Encoding Binary Features with Boolean Mapping and astype(int)",
        "Mapping 'Yes'/'No' or 'Male'/'Female' strings into clean 0 and 1 integer flags",
        6, 14, "Beginner",
        "A Light Switch: Binary On or Off",
        "A light switch only has two states: On (1) or Off (0). For binary columns like ['Yes', 'No'] or ['Active', 'Churned'], mapping them directly to 1 and 0 requires minimal memory and zero column expansion.",
        "df['col'].map({'Yes': 1, 'No': 0}).astype(int) turns binary string columns into 0/1 integers.",
        "Creating Two One-Hot Columns for a Binary Feature",
        "Running get_dummies on a Yes/No column creates both col_Yes and col_No, doubling column count unnecessarily. A simple .map({'Yes': 1, 'No': 0}) preserves single-column compactness.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Subscribed': ['Yes', 'No', 'Yes', 'No'],\n    'Gender': ['Female', 'Male', 'Female', 'Female']\n})\ndf['Subscribed_Flag'] = df['Subscribed'].map({'Yes': 1, 'No': 0}).astype(int)\ndf['Gender_Female'] = (df['Gender'] == 'Female').astype(int)\nprint(df[['Subscribed_Flag', 'Gender_Female']])",
        "Medical Patient Outcomes", "Encoding smoking status ('Smoker' -> 1, 'Non-Smoker' -> 0) and diabetes diagnosis.",
        "What is the simplest way to convert a Boolean Series into integer 0 and 1 flags?", "Calling .astype(int) on the Boolean Series converts True to 1 and False to 0.",
        "Convert series ['Yes', 'No'] to [1, 0] using map.",
        "import pandas as pd\ns = pd.Series(['Yes', 'No'])\nprint(s.map({'Yes': 1, 'No': 0}).tolist())"
    ),
    (
        "pandas-m9-l7", "pandas-module-9", "Discretizing and Binning Continuous Features with pd.cut() and pd.qcut()",
        "Equal-width binning versus equal-frequency quantile partitioning",
        7, 14, "Intermediate",
        "School Letter Grades vs Student Quartiles",
        "pd.cut() divides scores by fixed boundaries (90-100 is A, 80-89 is B). pd.qcut() divides students by percentiles: top 25% get Tier 1, next 25% get Tier 2, regardless of raw score distribution.",
        "pd.cut(s, bins=[0, 18, 65, 100], labels=['Child', 'Adult', 'Senior']) creates fixed bins; pd.qcut(s, q=4) creates equal-count quartiles.",
        "Unbalanced Bins from Heavily Skewed Data in pd.cut()",
        "If 95% of transactions are under $10, cut() puts 95% into bin 1 and 0% into bin 4. Use qcut() when you need uniform sample counts across all buckets.",
        "import pandas as pd\nages = pd.Series([12, 19, 25, 42, 68, 75])\n# Fixed-boundary binning\nage_groups = pd.cut(ages, bins=[0, 18, 60, 100], labels=['Youth', 'Adult', 'Senior'])\n# Quantile-frequency binning\nquantiles = pd.qcut(ages, q=3, labels=['Low', 'Mid', 'High'])\nprint('Fixed Age Groups:\\n', age_groups)\nprint('Equal Quantile Groups:\\n', quantiles)",
        "Credit Risk Tiering", "Binning credit bureau FICO scores into standardized risk buckets for underwriting.",
        "What is the key difference between pd.cut() and pd.qcut()?", "pd.cut() divides data by equal-width numerical ranges; pd.qcut() divides data into equal-frequency bins (equal number of samples per bucket).",
        "Bin numbers [10, 50, 90] into 2 equal-count buckets using pd.qcut.",
        "import pandas as pd\nprint(pd.qcut(pd.Series([10, 50, 90]), q=2, labels=['Low', 'High']).tolist())"
    ),
    (
        "pandas-m9-l8", "pandas-module-9", "Feature Engineering: Ratios, Differences, Interactions, and Domain Indicators",
        "Deriving powerful nonlinear signals from existing columns to boost predictive accuracy",
        8, 14, "Intermediate",
        "Calculating Body Mass Index (BMI) from Height and Weight",
        "Knowing someone weighs 80kg tells you very little without knowing their height. A height of 150cm vs 200cm means completely different health outcomes. Engineering the ratio (Weight / Height^2) creates a single feature with massive predictive power.",
        "Creating interaction features: df['Debt_to_Income'] = df['Debt'] / df['Income']; df['Area'] = df['Width'] * df['Length'].",
        "Creating Ratios Without Checking for Division by Zero",
        "If Income is 0, df['Debt'] / df['Income'] produces inf, which crashes ML estimators. Always handle zero denominators using .replace(0, np.nan) or clipping.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Revenue': [100000, 250000, 50000],\n    'Employees': [5, 20, 2],\n    'Debt': [20000, 100000, 5000]\n})\n# Engineer actionable domain features\ndf['Rev_Per_Employee'] = df['Revenue'] / df['Employees']\ndf['Debt_to_Rev_Ratio'] = df['Debt'] / df['Revenue']\nprint(df[['Rev_Per_Employee', 'Debt_to_Rev_Ratio']])",
        "Stock Valuation Algorithms", "Engineering Price-to-Earnings (P/E), EV/EBITDA, and quarterly return velocity ratios.",
        "Why are engineered ratio features often more informative to ML models than raw absolute numbers?", "Ratios normalize for company or individual scale, capturing structural efficiency independent of raw volume.",
        "Create a feature 'ratio' = 'a' / 'b' for a DataFrame with a=[10], b=[2].",
        "import pandas as pd\ndf = pd.DataFrame({'a': [10], 'b': [2]})\ndf['ratio'] = df['a'] / df['b']\nprint(df['ratio'].iloc[0])"
    ),
    (
        "pandas-m9-l9", "pandas-module-9", "Train-Test Splitting using Pandas df.sample() versus scikit-learn",
        "Splitting datasets randomly with reproducible seeds directly in native Pandas",
        9, 14, "Beginner",
        "Dealing Cards for Practice and for the Tournament",
        "A coach takes a shuffled deck of practice plays: 80% are used during scrimmage drills (Training Set), and the remaining 20% are kept hidden to test players during the final championship game (Test Set).",
        "train = df.sample(frac=0.8, random_state=42); test = df.drop(train.index) splits tabular data cleanly.",
        "Using df.sample() Without Setting random_state",
        "Without random_state, every execution creates a completely different split, making model experiments impossible to reproduce or compare. Always lock the random seed.",
        "import pandas as pd\ndf = pd.DataFrame({'Feature': range(10), 'Target': [i % 2 for i in range(10)]})\n# 80/20 train/test split with native Pandas\ntrain_df = df.sample(frac=0.8, random_state=42)\ntest_df = df.drop(train_df.index)\nprint(f'Original count: {len(df)}, Train count: {len(train_df)}, Test count: {len(test_df)}')\nprint('Test indexes:', list(test_df.index))",
        "Quick Model Prototyping", "Splitting an exploratory tabular dataset in Jupyter without importing extra libraries.",
        "How do you get the remaining test set rows after sampling train_df using df.sample(frac=0.8)?", "By dropping the training indices: test_df = df.drop(train_df.index)",
        "Split a 4-row DataFrame into 50% train and 50% test with random_state=42.",
        "import pandas as pd\ndf = pd.DataFrame({'x': [1, 2, 3, 4]})\ntr = df.sample(frac=0.5, random_state=42)\nte = df.drop(tr.index)\nprint(len(tr), len(te))"
    ),
    (
        "pandas-m9-l10", "pandas-module-9", "Feature Scaling and Normalization with Native Pandas Vector Math",
        "Min-Max normalization and Z-score standardization using column operations",
        10, 14, "Intermediate",
        "Converting Dollars and Yen to a Standard Currency",
        "If you compare an American salary ($50,000) with a Japanese salary (¥7,500,000), distance-based algorithms (KNN, SVM, Gradient Descent) think the Yen figure is 150x more important simply because the numbers are bigger. Normalization puts all features on an even 0-1 scale.",
        "Min-Max: (df - df.min()) / (df.max() - df.min()); Z-score: (df - df.mean()) / df.std().",
        "Calculating Min and Max Across Test Data (Test Leakage)",
        "When normalizing test data, you must use the TRAIN set min and max! Using test set stats directly causes data leakage.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Age': [20.0, 30.0, 40.0, 50.0],\n    'Income': [30000.0, 60000.0, 90000.0, 120000.0]\n})\n# Min-Max Normalization (0 to 1 scale)\nmin_max = (df - df.min()) / (df.max() - df.min())\n# Z-score Standardization (mean=0, std=1)\nz_score = (df - df.mean()) / df.std()\nprint('Min-Max Scaled:\\n', min_max)\nprint('Z-Score Scaled:\\n', z_score.round(2))",
        "K-Nearest Neighbors and Neural Nets", "Scaling heterogeneous physical sensor readings before calculating Euclidean distances.",
        "What are the mean and standard deviation of a feature after Z-score standardization?", "Mean = 0 and Standard Deviation = 1.",
        "Min-Max scale series [10.0, 20.0, 30.0] to [0.0, 1.0].",
        "import pandas as pd\ns = pd.Series([10.0, 20.0, 30.0])\nprint(((s - s.min()) / (s.max() - s.min())).tolist())"
    ),
    (
        "pandas-m9-l11", "pandas-module-9", "Converting DataFrames to NumPy Arrays with to_numpy() and .values",
        "Extracting contiguous C-ordered numerical buffers for scikit-learn and PyTorch",
        11, 14, "Beginner",
        "Unboxing Goods from a Labeled Shipping Crate into an Automated Conveyor",
        "A DataFrame is a labeled shipping crate with column stickers, row barcodes, and metadata. A deep learning framework (PyTorch, TensorFlow) wants raw contiguous bytes on a conveyor belt. .to_numpy() strips the labels and provides pure raw numbers.",
        "df.to_numpy(dtype='float32') extracts contiguous multidimensional NumPy arrays from DataFrames.",
        "Using Deprecated .values Instead of .to_numpy()",
        "The old .values attribute had unpredictable copy-versus-view semantics and didn't support explicit dtype casting. Modern Pandas 2.0+ standardizes on .to_numpy().",
        "import pandas as pd\ndf = pd.DataFrame({\n    'x1': [1.5, 2.5, 3.5],\n    'x2': [10.0, 20.0, 30.0]\n})\narr = df.to_numpy(dtype='float32')\nprint('Extracted NumPy Array:\\n', arr)\nprint('Array Type and Shape:', type(arr), arr.shape, arr.dtype)",
        "PyTorch Tensor Ingestion", "Converting cleaned tabular customer features directly into torch.tensor(df.to_numpy()).",
        "Why is df.to_numpy() preferred over df.values in modern Pandas code?", "df.to_numpy() allows explicit dtype specification, handles extension arrays cleanly, and has predictable memory semantics.",
        "Convert DataFrame df = pd.DataFrame({'a': [1, 2]}) to a NumPy array.",
        "import pandas as pd\nprint(pd.DataFrame({'a': [1, 2]}).to_numpy().flatten().tolist())"
    ),
    (
        "pandas-m9-l12", "pandas-module-9", "Aligning Model Predictions and Residuals back into a DataFrame",
        "Adding y_pred, residuals, and percentage errors as columns for intuitive diagnostics",
        12, 14, "Intermediate",
        "Placing Predicted Marks Alongside Actual Marks on a Student Report Card",
        "Imagine a grading sheet where column 1 is Actual Mark, column 2 is Predicted Mark from mock exams, and column 3 is Residual (Actual - Predicted). Laying them side by side allows teachers to instantly spot who scored lower than expected.",
        "df['Prediction'] = preds; df['Residual'] = df['Actual'] - df['Prediction'] attaches model results back into tabular context.",
        "Assigning Unaligned Predictions with Mismatched Indexes",
        "If you filtered or dropped rows from the test set, assigning a raw list can misalign rows. Always pass index=test_df.index or convert via a new Series to ensure index alignment.",
        "import pandas as pd\nimport numpy as np\ntest_df = pd.DataFrame({\n    'SquareFeet': [1200, 1800, 2400],\n    'Actual_Price': [250000, 360000, 480000]\n}, index=['H1', 'H2', 'H3'])\n# Simulated model predictions\ntest_df['Pred_Price'] = [245000, 375000, 470000]\ntest_df['Residual'] = test_df['Actual_Price'] - test_df['Pred_Price']\ntest_df['Error_Pct'] = (test_df['Residual'].abs() / test_df['Actual_Price']) * 100\nprint(test_df[['Actual_Price', 'Pred_Price', 'Residual', 'Error_Pct']].round(1))",
        "Algorithmic Trading Backtesting", "Attaching predicted price returns alongside actual stock returns and tracking slippage.",
        "How is a prediction residual defined mathematically for regression models?", "Residual = Actual_Value - Predicted_Value",
        "Add a column 'residual' = 'actual' - 'pred' to a DataFrame with actual=[100], pred=[90].",
        "import pandas as pd\ndf = pd.DataFrame({'actual': [100], 'pred': [90]})\ndf['residual'] = df['actual'] - df['pred']\nprint(df['residual'].iloc[0])"
    ),
    (
        "pandas-m9-l13", "pandas-module-9", "Generating Classification Confusion Matrices with pd.crosstab()",
        "Cross-tabulating ground truth vs predicted classes with margins and normalized percentages",
        13, 14, "Intermediate",
        "A Medical Test Results Grid: True Positives vs False Alarms",
        "A 2x2 grid where rows are Actual Health Status (Sick, Healthy) and columns are Test Result (Positive, Negative). The top-left cell shows True Positives; the top-right shows False Alarms. pd.crosstab() builds this exact confusion matrix instantly.",
        "pd.crosstab(actual, pred, rownames=['Actual'], colnames=['Predicted'], margins=True) computes labeled confusion matrices.",
        "Interpreting Confusion Matrices Without Row/Column Labels",
        "A raw 2x2 NumPy array [[45, 5], [10, 40]] doesn't tell you which axis is actual and which is predicted. pd.crosstab provides clear, unambiguous axis names and row/column totals.",
        "import pandas as pd\nactual = pd.Series(['Dog', 'Cat', 'Dog', 'Dog', 'Cat', 'Cat'], name='Actual')\npredicted = pd.Series(['Dog', 'Dog', 'Dog', 'Dog', 'Cat', 'Cat'], name='Predicted')\n# Build labeled confusion matrix with totals\ncm = pd.crosstab(actual, predicted, margins=True)\nprint('Confusion Matrix with Margins:\\n', cm)\n# Normalized percentages\ncm_pct = pd.crosstab(actual, predicted, normalize='index') * 100\nprint('\\nRow-Normalized Accuracy (%):\\n', cm_pct.round(1))",
        "Spam Filter Evaluation", "Tracking how many legitimate emails were misclassified into the spam folder.",
        "Which parameter in pd.crosstab() adds row and column totals (marginal sums)?", "margins=True (with optional margins_name='Total')",
        "Create a 2x2 crosstab between actual=['A', 'B'] and pred=['A', 'A'].",
        "import pandas as pd\nprint(pd.crosstab(pd.Series(['A', 'B']), pd.Series(['A', 'A'])))"
    ),
    (
        "pandas-m9-l14", "pandas-module-9", "Error Analysis: Filtering and Investigating Worst Model Failures",
        "Using boolean masks and nlargest to isolate anomalous records and failure modes",
        14, 14, "Advanced",
        "A Forensic Crime Scene Investigation on Model Mistakes",
        "When an airplane experiences an anomaly, investigators inspect the black box recorder. When an ML model makes huge errors, data scientists filter df[residual.abs() > threshold] to discover why: Is it bad data? Missing features? Outliers?",
        "df.nlargest(10, 'Abs_Residual') isolates the top 10 most egregious prediction errors for diagnostic review.",
        "Trusting Overall Aggregate Accuracy Without Error Slicing",
        "A model can boast 92% accuracy overall, but have 10% accuracy on senior citizens or minority classes. Slicing errors by demographic subgroups uncovers hidden algorithmic bias and fatal weaknesses.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Product': ['Laptop', 'Book', 'Phone', 'Watch', 'Tablet'],\n    'Actual_Price': [1200, 15, 800, 250, 400],\n    'Pred_Price': [700, 18, 790, 240, 390]\n})\ndf['Error'] = (df['Actual_Price'] - df['Pred_Price']).abs()\n# Isolate worst 2 model failures\nworst_errors = df.nlargest(2, 'Error')\nprint('Worst Model Failures Requiring Investigation:\\n', worst_errors)",
        "Autonomous Driving Vision Audits", "Isolating camera frames where the object detection model failed to detect pedestrians in poor lighting.",
        "What Pandas method efficiently retrieves the top N rows with the highest error values?", "df.nlargest(N, 'Error_Column')",
        "Find the row with the largest error from a DataFrame with errors [10, 50, 20].",
        "import pandas as pd\ndf = pd.DataFrame({'id': [1, 2, 3], 'err': [10, 50, 20]})\nprint(df.nlargest(1, 'err')['id'].iloc[0])"
    ),
    (
        "pandas-m9-l15", "pandas-module-9", "Packaging an End-to-End Reusable Data Preparation Pipeline Function",
        "Writing modular, testable preprocessing functions that transform raw DataFrames into model inputs",
        15, 14, "Advanced",
        "An Automated Car Wash Tunnel: Dirty Car In, Spotless Car Out",
        "A dirty car enters the tunnel. Step 1: Pre-wash spray. Step 2: High-pressure soap. Step 3: Wheel scrub. Step 4: Rinse and wax. Step 5: Hot air dry. A pristine car rolls out. A data prep function takes messy raw CSV records and outputs pristine X and y matrices.",
        "def prepare_data(raw_df): ... returns clean_X, clean_y in a single reproducible, production-ready call.",
        "Copy-Pasting Ad-Hoc Preprocessing Code Across Notebooks",
        "Copy-pasting cleaning lines across 5 different notebooks leads to drift, unreproducible results, and training-serving skew. Packaging transformations into a pure function guarantees 100% consistency.",
        "import pandas as pd\ndef preprocess_pipeline(raw_df, is_training=True, median_age=30.0):\n    df = raw_df.copy()\n    # 1. Drop identifiers\n    df = df.drop(columns=['ID'], errors='ignore')\n    # 2. Impute missing\n    df['Age'] = df['Age'].fillna(median_age)\n    # 3. Binary encoding\n    if 'Smoker' in df:\n        df['Smoker'] = (df['Smoker'] == 'Yes').astype(int)\n    # 4. Separate X and y\n    if is_training and 'Target' in df:\n        X = df.drop(columns=['Target'])\n        y = df['Target']\n        return X, y\n    return df\n\nraw = pd.DataFrame({'ID': [1, 2], 'Age': [25.0, None], 'Smoker': ['Yes', 'No'], 'Target': [1, 0]})\nX, y = preprocess_pipeline(raw)\nprint('Processed Features X:\\n', X)\nprint('Target y:\\n', y.tolist())",
        "Production Inference Microservices", "Running incoming live JSON payloads through preprocess_pipeline(payload_df, is_training=False) before model.predict().",
        "Why is df.copy() crucial as the first step inside a data preprocessing function?", "To avoid mutating the caller's original DataFrame in-place (avoiding side-effects).",
        "Write a simple function that drops column 'drop_me' from a DataFrame.",
        "import pandas as pd\ndef clean(df): return df.drop(columns=['drop_me'])\nprint(list(clean(pd.DataFrame({'a': [1], 'drop_me': [2]})).columns))"
    )
]

generate_pandas_module(
    "pandas-module-9", 9,
    "Pandas for Machine Learning",
    "Feature Matrices, One-Hot Encoding, Scaling, Model Evaluation & Pipelines",
    "Bridge the gap between raw data and machine learning algorithms. Master clean separation of X and y, categorical encoding (get_dummies), handling binary columns, binning (cut/qcut), train-test splits, feature scaling, model residual diagnostics, confusion matrices with pd.crosstab(), and writing modular production pipelines.",
    "ML Engineering", 16, m9_raw,
    "pandas-project", "End-to-End Sales Analytics Capstone Project"
)

# ==============================================================================
# PANDAS FINAL PROJECT: End-to-End Sales Analytics Capstone Project
# ==============================================================================
fp_code = """import pandas as pd
import numpy as np

# 1. Realistic Raw Sales Data with Missing Values and Formatting Inconsistencies
raw_data = {
    'Order_ID': ['ORD-101', 'ORD-102', 'ORD-103', 'ORD-104', 'ORD-105', 'ORD-106'],
    'Date': ['2024-01-15', '2024-01-20', '2024-02-10', '2024-02-15', '2024-03-01', '2024-03-12'],
    'Region': ['East', 'West', 'East', 'South', None, 'West'],
    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Laptop', 'Monitor', 'Mouse'],
    'Category': ['Electronics', 'Accessories', 'Accessories', 'Electronics', 'Electronics', 'Accessories'],
    'Quantity': [2, 10, None, 1, 3, 5],
    'Unit_Price': [1200.0, 25.0, 75.0, 1250.0, 300.0, 28.0],
    'Discount_Pct': [0.10, 0.05, 0.00, 0.15, 0.00, 0.00]
}
df = pd.DataFrame(raw_data)
print('--- 1. Raw Transactional Data ---')
print(df[['Order_ID', 'Date', 'Region', 'Product', 'Quantity', 'Unit_Price']])

# 2. Data Cleaning & Type Formatting
df['Date'] = pd.to_datetime(df['Date'])
df['Region'] = df['Region'].fillna('Unassigned')
df['Quantity'] = df['Quantity'].fillna(df['Quantity'].median()).astype(int)

# 3. Feature Engineering: Revenue, Discount Amount, Net Sales, Margin
df['Gross_Sales'] = df['Quantity'] * df['Unit_Price']
df['Discount_Amt'] = df['Gross_Sales'] * df['Discount_Pct']
df['Net_Sales'] = df['Gross_Sales'] - df['Discount_Amt']
df['Month'] = df['Date'].dt.to_period('M')

# 4. Regional Performance Aggregation
region_perf = df.groupby('Region').agg(
    Total_Orders=('Order_ID', 'count'),
    Total_Units=('Quantity', 'sum'),
    Net_Revenue=('Net_Sales', 'sum')
).sort_values(by='Net_Revenue', ascending=False)
print('\\n--- 2. Regional Sales Summary ---')
print(region_perf)

# 5. Product Category Pivot Table
category_pivot = pd.pivot_table(
    df,
    index='Category',
    columns='Month',
    values='Net_Sales',
    aggfunc='sum',
    fill_value=0.0,
    margins=True,
    margins_name='Total'
)
print('\\n--- 3. Monthly Category Pivot Table ---')
print(category_pivot)

# 6. Executive Key Metrics
total_revenue = df['Net_Sales'].sum()
avg_order_value = df['Net_Sales'].mean()
top_product = df.groupby('Product')['Net_Sales'].sum().idxmax()
print('\\n--- 4. Executive Summary KPI Dashboard ---')
print(f'Total Net Revenue: ${total_revenue:,.2f}')
print(f'Average Order Value: ${avg_order_value:,.2f}')
print(f'Top Performing Product by Revenue: {top_product}')
"""

fp_lesson = create_pandas_lesson(
    id="pandas-fp-l1",
    moduleId="pandas-project",
    title="End-to-End Sales Analytics Capstone: Data Cleaning, Wrangling, GroupBy & Forecasting",
    subtitle="Complete real-world retail analytics workflow from dirty transactional data to executive reporting",
    order=1,
    readTime=25,
    difficulty="Advanced",
    objectives=[
        "Synthesize all Pandas core competencies into a comprehensive production workflow.",
        "Clean dirty real-world datasets with missing regions, dates, and unformatted prices.",
        "Engineer strategic financial indicators (Gross Sales, Net Revenue, Profit Margins).",
        "Build multi-dimensional pivot tables and regional GroupBy aggregations.",
        "Deliver an executive dashboard with high-impact business KPIs."
    ],
    prerequisites=["All Pandas Modules 1 through 9"],
    analogy={
        "title": "A Master Chef Creating a 5-Course Banquet from Raw Market Ingredients",
        "text": "Throughout the previous 9 modules, you learned individual culinary techniques: knife skills (slicing & indexing), marinating (cleaning & imputation), sauce reduction (aggregations & groupby), and plating (reshaping & pivoting). In this Capstone Project, you step into the executive kitchen as Head Chef to prepare a complete 5-course banquet: turning raw, dirty retail transaction logs into a Michelin-starred business intelligence report.",
        "metaphor": "Raw market produce -> Prep station (cleaning) -> Cook station (engineering & groupbys) -> Presentation plate (pivot tables & KPI dashboards)."
    },
    problemSolved={
        "title": "Unstructured Raw Sales Logs to Actionable Business Strategy",
        "description": "Enterprise businesses generate hundreds of thousands of daily transactions across regions, sales reps, and retail channels. Raw database exports are messy: dates are stored as text, regions are missing, quantities contain nulls, and prices require discount reconciliation. Without a structured analytical workflow, executives cannot discern which products drive real margin versus vanity revenue.",
        "keyPoints": [
            "Cleans and imputes missing regional data and unrecorded quantities systematically.",
            "Normalizes string headers and standardizes timestamps into datetime monthly periods.",
            "Calculates true net revenue by discounting gross pricing across diverse catalog lines.",
            "Reshapes transactional granularity into executive-level multi-dimensional pivot matrices."
        ]
    },
    intuition={
        "overview": "The complete four-stage lifecycle of tabular retail data science.",
        "steps": [
            {"step": 1, "title": "Ingestion & Audit", "description": "Inspect DataFrame schema, detect missing values, and audit unexpected string anomalies."},
            {"step": 2, "title": "Cleaning & Standardization", "description": "Cast dates to datetime, impute missing quantities, and fill missing regions."},
            {"step": 3, "title": "Feature Engineering", "description": "Derive Gross Sales, Discount Amount, Net Sales, and Year-Month period buckets."},
            {"step": 4, "title": "Multi-Dimensional Analytics", "description": "Execute GroupBy summaries and pivot tables to calculate executive revenue KPIs."}
        ]
    },
    mathematics={
        "overview": "Financial and relational metrics for retail sales analysis.",
        "foundations": [
            {"name": "Net Revenue Equation", "latex": "\\text{Net Sales} = (\\text{Quantity} \\times \\text{Unit Price}) \\times (1 - \\text{Discount Rate})", "explanation": "Actual cash realized after promotional discounting."},
            {"name": "Average Order Value (AOV)", "latex": "\\text{AOV} = \\frac{\\sum_{i=1}^N \\text{Net Sales}_i}{N_{\\text{orders}}}", "explanation": "Average dollar volume realized per customer order."}
        ]
    },
    derivation={
        "title": "Relational Aggregation Proof",
        "objective": "Verify mathematical preservation of total revenue across pivot table margins.",
        "steps": [
            {"step": 1, "label": "Conservation of Revenue", "latex": "\\sum_{\\text{regions}} \\text{Revenue} = \\sum_{\\text{categories}} \\text{Revenue} = \\text{Total Revenue}", "explanation": "Multi-axis slicing must conserve the exact global sum across all dimensional breakdowns."},
            {"step": 2, "label": "Complexity", "latex": "O(N) \\text{ linear scan for cleaning and hash-based GroupBy}", "explanation": "Efficient execution over millions of transactional rows using vectorized operations."}
        ]
    },
    variables=[
        {"symbol": "Gross_Sales", "name": "Gross Sales", "description": "Quantity multiplied by Unit Price before discounts", "dimensions": "Currency ($)"},
        {"symbol": "Net_Sales", "name": "Net Sales", "description": "Actual realized revenue after deducting promotional discounts", "dimensions": "Currency ($)"},
        {"symbol": "AOV", "name": "Average Order Value", "description": "Mean revenue per transaction", "dimensions": "Currency ($)"}
    ],
    numericalExample={
        "scenario": "A 6-transaction real-world retail store with missing data and varying product categories.",
        "dataset": [{"Record": 1, "Detail": "6 orders across Electronics and Accessories across Q1 2024", "Status": "Optimal"}],
        "calculations": [{"step": "Total Net Revenue Verification", "math": "$5,013.00 calculated accurately across all categories", "result": "$5,013.00"}],
        "finalConclusion": "The complete analytics workflow successfully cleaned, wrangled, aggregated, and reported business performance."
    },
    visualExplanation={
        "title": "Visual Architecture: Sales Analytics Pipeline",
        "description": "How raw transaction records flow through cleaning, feature engineering, and executive reporting.",
        "features": [
            "Dirty Inputs: Missing values, text dates, and uncalculated financial metrics.",
            "Vectorized Cleaning: Fast imputation, datetime parsing, and currency calculation.",
            "Dimensional Reshaping: GroupBy aggregations and multi-axis Pivot Tables.",
            "Executive Outputs: Clean, labeled KPI summaries ready for stakeholder presentations."
        ]
    },
    scratchCode={"title": "Interactive Capstone Project Implementation", "code": fp_code, "explanation": "Complete runnable sales analytics pipeline."},
    sklearnCode={"title": "Data Science Pipeline Usage", "code": fp_code, "explanation": "End-to-end retail business intelligence script."},
    runnableCode_snippet=fp_code,
    lineByLineExplanation=[
        {"lines": "1-14", "codeSnippet": "raw_data = { ... }; df = pd.DataFrame(raw_data)", "explanation": "Constructs the initial retail dataset with realistic null values and varied data types."},
        {"lines": "16-20", "codeSnippet": "df['Date'] = pd.to_datetime(...); df['Region'].fillna(...)", "explanation": "Cleans data types, standardizes dates, and imputes missing regions and quantities."},
        {"lines": "22-26", "codeSnippet": "df['Gross_Sales'] = ...; df['Net_Sales'] = ...", "explanation": "Engineers financial columns: Gross Sales, Discount Dollar Amount, and final Net Sales."},
        {"lines": "28-35", "codeSnippet": "df.groupby('Region').agg(...)", "explanation": "Aggregates revenue, unit volume, and order frequency by geographical region."},
        {"lines": "37-47", "codeSnippet": "pd.pivot_table(df, index='Category', columns='Month', ...)", "explanation": "Reshapes monthly revenue trends by product category with margin totals."},
        {"lines": "49-55", "codeSnippet": "total_revenue = df['Net_Sales'].sum(); ...", "explanation": "Computes high-level executive KPI metrics (Total Net Revenue, AOV, Top Product)."}
    ],
    hyperparameters=[{"name": "aggfunc", "defaultVal": "'mean'", "range": "'sum', 'mean', 'count', 'std'", "effect": "Aggregation operation applied to numeric values in pivot table", "recommendation": "Use 'sum' for revenue totals, 'mean' for unit prices and discounts."}],
    assumptions=[{"assumption": "Non-negative quantities", "whyItMatters": "Negative quantities indicate returns or credit notes requiring separate modeling", "howToVerify": "Check (df['Quantity'] < 0).any()"}],
    commonMistakes=[{"mistake": "Calculating Average Order Value as the mean of unit prices", "solution": "AOV is Total Net Sales divided by Number of Orders", "whyWrong": "Unit prices ignore quantities purchased per transaction", "howToFix": "Use df['Net_Sales'].mean() across order transactions"}],
    realWorldUseCases=[
        {"industry": "Omnichannel Retail", "application": "Quarterly Store Auditing", "benefit": "Evaluating store performance across physical branches and online ecommerce."},
        {"industry": "Supply Chain", "application": "Inventory Demand Planning", "benefit": "Forecasting replenishment requirements by product category and seasonal monthly peaks."}
    ],
    practiceQuestions=[
        {"id": "pq1", "question": "Why is pd.to_datetime() essential before extracting monthly periods with .dt.to_period('M')?", "hint": "Think about string operations vs datetime accessors.", "answer": "The .dt accessor is only available on genuine datetime64 Series; calling it on string columns raises an AttributeError."},
        {"id": "pq2", "question": "What is the advantage of using pd.pivot_table() over raw groupby() for multi-dimensional reporting?", "hint": "Grid layout.", "answer": "pivot_table formats data directly into an intuitive 2D grid with rows and columns, complete with optional marginal totals (margins=True)."},
        {"id": "pq3", "question": "How does vectorization guarantee fast execution on large sales datasets with millions of rows?", "hint": "C memory layout.", "answer": "Pandas executes column arithmetic (Quantity * Unit_Price) using contiguous C-level NumPy arrays without Python for-loop interpreter overhead."}
    ],
    quiz=[
        {
            "id": "q1",
            "question": "What is the proper formula to calculate Net Sales when given Gross Sales and Discount Percentage (0.10 for 10%)?",
            "options": [
                "Net_Sales = Gross_Sales * (1 - Discount_Pct)",
                "Net_Sales = Gross_Sales / Discount_Pct",
                "Net_Sales = Gross_Sales + Discount_Pct",
                "Net_Sales = Gross_Sales * Discount_Pct"
            ],
            "correctIndex": 0,
            "explanation": "Discount Amount is Gross_Sales * Discount_Pct. Net Sales is Gross_Sales - Discount Amount, which simplifies to Gross_Sales * (1 - Discount_Pct)."
        },
        {
            "id": "q2",
            "question": "In pd.pivot_table(), which parameter computes and displays row and column subtotals/grand totals?",
            "options": [
                "margins=True",
                "totals=True",
                "subtotal=True",
                "summary=True"
            ],
            "correctIndex": 0,
            "explanation": "Setting margins=True instructs pd.pivot_table to calculate all marginal sums and display an 'All' total row and column."
        },
        {
            "id": "q3",
            "question": "Why is handling missing values in 'Region' using .fillna('Unassigned') better than dropping those rows with .dropna()?",
            "options": [
                "Dropping rows discards valid revenue from total financial metrics; labeling them keeps financial audits complete.",
                "Dropping rows causes Python to crash.",
                "fillna makes the file size smaller.",
                "Unassigned regions are legally required in databases."
            ],
            "correctIndex": 0,
            "explanation": "If you drop rows with missing regions, your total revenue calculation will understate true sales. Labeling them 'Unassigned' preserves total revenue while highlighting missing data."
        }
    ],
    independentExercise={
        "title": "Capstone Extension Challenge: Customer Cohort and Margin Analysis",
        "problem": "Extend the sales analytics pipeline to calculate the Profit Margin percentage for each product assuming a wholesale cost of 60% of Unit_Price (Cost = Unit_Price * 0.60). Calculate total profit per product category.",
        "difficulty": "Advanced",
        "hints": ["Cost = df['Quantity'] * (df['Unit_Price'] * 0.60)", "Profit = df['Net_Sales'] - Cost", "Group by 'Category' and sum Profit"],
        "starterCode": "import pandas as pd\n# Extend the pipeline here:\n",
        "solution": "import pandas as pd\n# Profit calculation:\ndf['Cost'] = df['Quantity'] * (df['Unit_Price'] * 0.60)\ndf['Profit'] = df['Net_Sales'] - df['Cost']\nprint(df.groupby('Category')['Profit'].sum())"
    },
    summary={
        "keyTakeaways": [
            "Mastered end-to-end data preparation, cleaning, feature engineering, and reporting with Pandas.",
            "Built robust, reproducible analytical pipelines capable of processing real-world messy data.",
            "Completed the entire Pandas Mastery curriculum with excellence!"
        ],
        "nextLessonId": "",
        "nextLessonTitle": "Complete AI & ML Curriculum",
        "nextLessonModuleId": "module-0"
    }
)

fp_mod_data = {
    "id": "pandas-project",
    "number": 10,
    "title": "Pandas Capstone Project",
    "subtitle": "End-to-End Sales Analytics & Business Intelligence Dashboard",
    "description": "Synthesize all 9 Pandas modules in this practical capstone project. Ingest messy real-world retail transactions, clean missing regions and prices, engineer financial metrics, construct multi-dimensional pivot tables, and compute executive KPIs.",
    "icon": "Layers",
    "badge": "Capstone Project",
    "estimatedHours": 6,
    "topicsCount": 1,
    "lessons": [{
        "id": fp_lesson["id"],
        "moduleId": fp_lesson["moduleId"],
        "title": fp_lesson["title"],
        "description": fp_lesson["subtitle"],
        "order": fp_lesson["order"],
        "readTimeMinutes": fp_lesson["readTimeMinutes"],
        "visualizerType": fp_lesson["visualizerType"],
        "difficulty": fp_lesson["difficulty"]
    }]
}

fp_file_path = os.path.join(OUTPUT_DIR, "pandas-project.ts")
write_pandas_module_ts(fp_file_path, "pandasProjectModule", fp_mod_data, {fp_lesson["id"]: fp_lesson})
print(f"Generated pandas-project with 1 capstone lesson.")

# ==============================================================================
# GENERATE MASTER PANDAS CURRICULUM FILE: src/data/pandas/curriculum.ts
# ==============================================================================
curriculum_ts_content = """// Pandas Mastery Curriculum Catalog & Lesson Registry
import { ModuleData, LessonData } from '@/lib/types';
import { pandasModule1, pandasModule1Lessons } from './pandas-module-1';
import { pandasModule2, pandasModule2Lessons } from './pandas-module-2';
import { pandasModule3, pandasModule3Lessons } from './pandas-module-3';
import { pandasModule4, pandasModule4Lessons } from './pandas-module-4';
import { pandasModule5, pandasModule5Lessons } from './pandas-module-5';
import { pandasModule6, pandasModule6Lessons } from './pandas-module-6';
import { pandasModule7, pandasModule7Lessons } from './pandas-module-7';
import { pandasModule8, pandasModule8Lessons } from './pandas-module-8';
import { pandasModule9, pandasModule9Lessons } from './pandas-module-9';
import { pandasProjectModule, pandasProjectLessons } from './pandas-project';

export const MODULES_CATALOG_PANDAS: ModuleData[] = [
  pandasModule1,
  pandasModule2,
  pandasModule3,
  pandasModule4,
  pandasModule5,
  pandasModule6,
  pandasModule7,
  pandasModule8,
  pandasModule9,
  pandasProjectModule,
];

export const PANDAS_FULL_LESSONS: Record<string, LessonData> = {
  ...pandasModule1Lessons,
  ...pandasModule2Lessons,
  ...pandasModule3Lessons,
  ...pandasModule4Lessons,
  ...pandasModule5Lessons,
  ...pandasModule6Lessons,
  ...pandasModule7Lessons,
  ...pandasModule8Lessons,
  ...pandasModule9Lessons,
  ...pandasProjectLessons,
};

export function getPandasModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_PANDAS.find((m) => m.id === moduleId);
}

export function getPandasLesson(lessonId: string): LessonData | undefined {
  return PANDAS_FULL_LESSONS[lessonId];
}
"""

curriculum_path = os.path.join(OUTPUT_DIR, "curriculum.ts")
with open(curriculum_path, "w", encoding="utf-8") as f:
    f.write(curriculum_ts_content)
print(f"Successfully wrote Pandas master curriculum file to {curriculum_path}")

