import os
import sys
import json
import subprocess
from pandas_helpers import create_pandas_lesson, write_pandas_module_ts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "pandas")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Helper function to generate a complete module
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
                f"Master practical usage of {t_title}.",
                "Understand the tabular DataFrame mechanics and memory considerations.",
                "Avoid common subtle bugs, chained assignment traps, and missing value pitfalls.",
                "Apply the technique to realistic data wrangling and analytics workflows."
            ],
            prerequisites=["Python fundamentals", "NumPy array basics"],
            analogy={"title": an_title, "text": an_text, "metaphor": an_meta},
            problemSolved={"title": pr_title, "description": pr_desc, "keyPoints": [
                "Transforms raw unstructured data into clean, labeled rectangular tables.",
                "Enables expressive column-oriented queries and aggregations.",
                "Bridges raw file ingestion to downstream machine learning algorithms."
            ]},
            intuition={"overview": f"Inner mechanics of {t_title} in Pandas.", "steps": [
                {"step": 1, "title": "Data Inspection", "description": "Pandas inspects Series/DataFrame schema and column dtypes."},
                {"step": 2, "title": "Alignment & Indexing", "description": "Aligns data points using explicit row indexes and column labels."},
                {"step": 3, "title": "Optimized Execution", "description": "Runs vectorized operations over underlying NumPy blocks."}
            ]},
            mathematics={"overview": f"Relational and tabular foundations for {t_title}.", "foundations": [
                {"name": "Relational Relation", "latex": "R \\subseteq D_1 \\times D_2 \\times \\dots \\times D_m", "explanation": "A DataFrame represents an ordered set of tuples over attribute domains."},
                {"name": "Index Mapping", "latex": "\\text{Locate}(r, c) \\mapsto \\text{Block}[\\text{col}][\\text{row}]", "explanation": "Mapping labeled coordinates to underlying columnar memory blocks."}
            ]},
            derivation={"title": f"Structural Analysis of {t_title}", "objective": "Verify the computational complexity and memory safety.", "steps": [
                {"step": 1, "label": "Columnar Structure", "latex": "\\text{DataFrame} = \\{C_1, C_2, \\dots, C_m\\} \\text{ with index } I", "explanation": "Each column is a contiguous typed Series."},
                {"step": 2, "label": "Complexity", "latex": "O(1) \\text{ column lookup, } O(N) \\text{ vectorized row operations}", "explanation": "Column access is instantaneous; row transformations scale linearly."}
            ]},
            variables=[
                {"symbol": "N", "name": "Row Count", "description": "Total records/samples in table", "dimensions": "Scalar"},
                {"symbol": "M", "name": "Column Count", "description": "Total features/attributes in table", "dimensions": "Scalar"}
            ],
            numericalExample={
                "scenario": scen,
                "dataset": [{"Record": 1, "Detail": scen_desc, "Status": "Optimal"}],
                "calculations": [{"step": "Verification", "math": "Operation executed", "result": "Verified"}],
                "finalConclusion": "The tabular transformation produced the exact expected output."
            },
            visualExplanation={
                "title": f"Visual Architecture: {t_title}",
                "description": f"How {t_title} organizes and transforms DataFrame memory.",
                "features": [
                    "Index labels provide stable row identity.",
                    "Column headers provide semantic feature names.",
                    "Underlying data blocks are stored as contiguous typed NumPy arrays."
                ]
            },
            scratchCode={"title": "Interactive Python Demonstration", "code": code, "explanation": "Direct executable verification."},
            sklearnCode={"title": "Data Science Pipeline Usage", "code": code, "explanation": "How professional data scientists use this method."},
            runnableCode_snippet=code,
            lineByLineExplanation=[
                {"lines": "1-2", "codeSnippet": "import pandas as pd", "explanation": "Loads the Pandas library with the universal 'pd' alias."},
                {"lines": "3-5", "codeSnippet": "# Core operation", "explanation": "Executes the operation and inspects the DataFrame output."}
            ],
            hyperparameters=[{"name": "inplace", "defaultVal": "False", "range": "True, False", "effect": "Whether to mutate existing object or return new DataFrame", "recommendation": "Always keep inplace=False and reassign (df = df.operation()) for method chaining."}],
            assumptions=[{"assumption": "Tabular alignment", "whyItMatters": "Rows must match index length", "howToVerify": "Check df.shape and df.info()"}],
            commonMistakes=[{"mistake": "Using deprecated APIs", "solution": "Use modern recommended Pandas syntax", "whyWrong": "Deprecated methods emit warnings or fail in Pandas 2.0+", "howToFix": "Avoid .ix, .append, and inplace=True"}],
            realWorldUseCases=[
                {"industry": "E-Commerce", "application": "Customer Transactions", "benefit": "Cleaning and aggregating millions of checkout carts."},
                {"industry": "Finance", "application": "Financial Statements", "benefit": "Tabular ledger reconciliation and balance tracking."}
            ],
            practiceQuestions=[
                {"id": "pq1", "question": pq_q, "hint": "Think about DataFrame rows and columns.", "answer": pq_a},
                {"id": "pq2", "question": f"Is {t_title} optimized for large tabular datasets?", "hint": "Does it use vectorized C backends?", "answer": "Yes, Pandas delegates numerical column operations directly to compiled NumPy buffers."},
                {"id": "pq3", "question": f"How does {t_title} prevent bugs in production pipelines?", "hint": "Think about labeled column access.", "answer": "It accesses features by explicit column name rather than brittle numerical column offsets."}
            ],
            quiz=[
                {
                    "id": "q1",
                    "question": f"What is the core data structure manipulated in {t_title}?",
                    "options": [
                        "DataFrame (2D labeled tabular matrix) or Series (1D labeled column)",
                        "A plain Python text file",
                        "An unindexed byte buffer",
                        "A singly linked list"
                    ],
                    "correctIndex": 0,
                    "explanation": "Pandas is built around the 2D DataFrame and 1D Series, combining labeled metadata with high-performance array buffers."
                },
                {
                    "id": "q2",
                    "question": "What is the universal alias used when importing Pandas?",
                    "options": ["pd", "pan", "pds", "pandas_lib"],
                    "correctIndex": 0,
                    "explanation": "'import pandas as pd' is the universal standard across the Python data science community."
                },
                {
                    "id": "q3",
                    "question": "Why is method chaining (e.g. df.dropna().sort_values()) preferred over inplace=True?",
                    "options": [
                        "It makes data pipelines readable, testable, and avoids subtle copy bugs.",
                        "It runs 1000x faster.",
                        "It disables Python garbage collection.",
                        "It turns all numbers into text."
                    ],
                    "correctIndex": 0,
                    "explanation": "Method chaining allows fluent functional data pipelines while avoiding the known bugs of inplace mutations."
                }
            ],
            independentExercise={
                "title": f"Practice Task: {t_title}",
                "problem": ex_p,
                "difficulty": diff,
                "hints": ["Review the example code above", "Check your DataFrame columns"],
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

print("Pandas module generator helper initialized.")

# ==============================================================================
# MODULE 1: Pandas Foundations (12 Lessons)
# ==============================================================================
m1_raw = [
    (
        "pandas-m1-l1", "pandas-module-1", "What Pandas Is & Why It Is Useful",
        "The premier tabular data manipulation library for Python data science and machine learning",
        1, 12, "Beginner",
        "A Supercharged Digital Spreadsheet Engine",
        "Think of an Excel spreadsheet with millions of rows, formulas, and filters. If Excel crashes when handling large datasets, Pandas is the industrial Python supercomputer that opens, cleans, transforms, and analyzes that spreadsheet programmatically in seconds.",
        "Pandas brings relational, Excel-like labeled tables into high-performance Python.",
        "Handling Heterogeneous Tabular Data in Pure Python",
        "Pure Python lists of dictionaries or tuples are slow, verbose to query, and consume huge memory. Pandas provides high-speed columnar storage where each column has its own optimized data type.",
        "import pandas as pd\nimport numpy as np\ndata = {\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Age': [25, 30, 35],\n    'City': ['New York', 'London', 'Tokyo']\n}\ndf = pd.DataFrame(data)\nprint('First Pandas DataFrame:\\n', df)\nprint('Shape:', df.shape)\nprint('Columns:', list(df.columns))",
        "Employee Directory Ledger", "Storing employee name, age, and office location in a structured table.",
        "Why is Pandas preferred over raw NumPy arrays for real-world business datasets?", "Real business data contains mixed types (strings, dates, floats) and requires column names, which pure homogeneous NumPy matrices cannot handle cleanly.",
        "Create a small DataFrame with 2 columns: 'Product' and 'Price'.",
        "import pandas as pd\ndf = pd.DataFrame({'Product': ['Laptop', 'Mouse'], 'Price': [1200, 25]})\nprint(df)"
    ),
    (
        "pandas-m1-l2", "pandas-module-1", "Series versus DataFrame Fundamentals",
        "Distinguishing 1D labeled column vectors from 2D labeled multi-column tables",
        2, 12, "Beginner",
        "A Single Column in a Ledger vs The Entire Accounting Book",
        "A Series is a single column of numbers with row labels (like a column of student exam marks). A DataFrame is the entire gradebook with multiple columns (Student ID, Name, Math Mark, English Mark, Attendance).",
        "A Series is a 1D labeled array; a DataFrame is a 2D labeled table made of multiple Series sharing the same index.",
        "Dimensional Confusion Between 1D Series and 2D Tables",
        "Selecting one column (df['Age']) gives a 1D Series, while selecting multiple columns (df[['Age']]) gives a 2D DataFrame. Confusing the two causes shape and method mismatch errors.",
        "import pandas as pd\ns = pd.Series([85, 90, 78], name='Scores', index=['Student A', 'Student B', 'Student C'])\ndf = pd.DataFrame({'Scores': [85, 90, 78], 'Passed': [True, True, True]})\nprint('1D Series:\\n', s)\nprint('Type of s:', type(s))\nprint('2D DataFrame:\\n', df)\nprint('Type of df:', type(df))",
        "Student Report Card Column", "A Series of test scores with student names as index labels.",
        "What data structure is returned when you extract a single column from a DataFrame using df['Col']?", "It returns a pandas.Series.",
        "Create a Series of 3 fruit names indexed by 'a', 'b', 'c'.",
        "import pandas as pd\ns = pd.Series(['Apple', 'Banana', 'Cherry'], index=['a', 'b', 'c'])\nprint(s)"
    ),
    (
        "pandas-m1-l3", "pandas-module-1", "Creating Series from Lists, Dictionaries, and Scalars",
        "Instantiating Series with custom index labels and data type specifications",
        3, 12, "Beginner",
        "A Phone Contact List with Names and Numbers",
        "In your phone, each phone number is associated with a contact name (index label). You don't have to look up contacts by memory slot 0, 1, 2; you look up 'Mom' or 'Pizza'. A Series with custom index labels works like a contact directory.",
        "pd.Series(data, index=labels) binds values to custom index keys.",
        "Preserving Dictionary Keys as Row Index Labels",
        "When passing a Python dictionary to pd.Series, the dictionary keys automatically become the index labels, preserving natural domain identifiers.",
        "import pandas as pd\n# From dictionary\ncapital_pops = {'Tokyo': 37.4, 'Delhi': 30.2, 'Shanghai': 27.0}\ns_dict = pd.Series(capital_pops, name='Population_Millions')\n# From scalar\ns_scalar = pd.Series(100, index=['Q1', 'Q2', 'Q3', 'Q4'])\nprint('Series from dict:\\n', s_dict)\nprint('Series from scalar:\\n', s_scalar)",
        "City Population Lookup", "Mapping capital city names to populations in millions.",
        "What happens when you create a Series from a scalar value like pd.Series(5, index=['a', 'b', 'c'])?", "The scalar value 5 is repeated across all specified index labels.",
        "Create a Series from a dictionary mapping subjects to exam marks: {'Math': 90, 'Science': 85}.",
        "import pandas as pd\ns = pd.Series({'Math': 90, 'Science': 85})\nprint(s)"
    ),
    (
        "pandas-m1-l4", "pandas-module-1", "Creating DataFrames from Dictionaries, Records, and Arrays",
        "Constructing 2D tables from lists of dicts, 2D NumPy arrays, and column maps",
        4, 14, "Beginner",
        "Assembling a Company Employee Roster",
        "You can build an employee roster by columns (list of names, list of departments) or by row records (Employee 1's profile, Employee 2's profile). Pandas easily converts both row-wise and column-wise data into rectangular DataFrames.",
        "Construct DataFrames using dict of lists (column-wise) or list of dicts (row-wise records).",
        "Converting API JSON Payloads into Tabular Data",
        "Web APIs return data as lists of JSON records. Passing a list of dictionaries directly into pd.DataFrame() parses nested web data into clean tables instantly.",
        "import pandas as pd\nimport numpy as np\n# 1. From list of dicts (row-oriented / JSON records)\nrecords = [\n    {'id': 101, 'name': 'Laptop', 'price': 999.0},\n    {'id': 102, 'name': 'Mouse', 'price': 25.0}\n]\ndf_records = pd.DataFrame(records)\n# 2. From 2D NumPy array with custom columns\narr = np.array([[1, 2], [3, 4]])\ndf_arr = pd.DataFrame(arr, columns=['Feature_A', 'Feature_B'])\nprint('From records:\\n', df_records)\nprint('From NumPy array:\\n', df_arr)",
        "Parsing REST API Product Catalog", "Converting JSON response payload into a tabular DataFrame for analysis.",
        "When creating a DataFrame from a 2D NumPy array, what default column names does Pandas assign if omitted?", "It assigns integer numbers 0, 1, 2, ... as column names.",
        "Create a DataFrame from a list of 2 dictionary records: [{'name': 'A', 'val': 10}, {'name': 'B', 'val': 20}].",
        "import pandas as pd\nprint(pd.DataFrame([{'name': 'A', 'val': 10}, {'name': 'B', 'val': 20}]))"
    ),
    (
        "pandas-m1-l5", "pandas-module-1", "Reading CSV Files with read_csv() & Critical Parameters",
        "Ingesting comma-separated data with delimiter, parse_dates, usecols, and na_values",
        5, 14, "Beginner",
        "Scanning Paper Invoice Receipts into a Digital Accounting System",
        "When scanning thousands of receipts, you need to tell the scanner which columns to keep, how dates are formatted, and what marks a blank entry. pd.read_csv() configures these parameters for seamless ingestion.",
        "read_csv() is the workhorse function for loading tabular text data into memory.",
        "Memory Exhaustion on Large CSV Files",
        "Loading unneeded columns wastes gigabytes of RAM. Using the 'usecols' parameter loads only the specific features required, cutting memory consumption by up to 80%.",
        "import pandas as pd\nimport io\ncsv_text = '''Order_ID,Date,Product,Price\n1001,2024-01-15,Keyboard,45.00\n1002,2024-01-16,Monitor,250.00'''\n# Load specific columns and parse dates\ndf = pd.read_csv(\n    io.StringIO(csv_text),\n    usecols=['Order_ID', 'Date', 'Price'],\n    parse_dates=['Date']\n)\nprint(df)\nprint('Date column dtype:', df['Date'].dtype)",
        "E-Commerce Transaction Ingestion", "Parsing monthly order logs while converting transaction timestamps to datetime objects.",
        "Which parameter in pd.read_csv() specifies which columns to load?", "The 'usecols' parameter (accepts a list of column names or integer indices).",
        "Load a simulated CSV string 'a,b\\n1,2\\n3,4' into a DataFrame.",
        "import pandas as pd, io\nprint(pd.read_csv(io.StringIO('a,b\\n1,2\\n3,4')))"
    ),
    (
        "pandas-m1-l6", "pandas-module-1", "Reading Excel Spreadsheets with read_excel()",
        "Loading multi-sheet workbooks, specifying sheet_name, and header rows",
        6, 12, "Beginner",
        "Opening a Multi-Tab Financial Binder",
        "A corporate financial model has separate workbook tabs for 'Q1 Sales', 'Expenses', and 'Headcount'. pd.read_excel(file, sheet_name='Q1 Sales') navigates directly to the target worksheet.",
        "read_excel() reads Excel .xlsx files and parses individual or all worksheet tabs.",
        "Silent Ingestion of Wrong Sheet Tabs",
        "By default, pd.read_excel() loads only the very first worksheet (index 0). If your data is on the 'Data' tab, you must explicitly pass sheet_name='Data'.",
        "import pandas as pd\n# Demonstration of read_excel signature and parameters\nprint('Pandas read_excel supports: sheet_name, header, skiprows, usecols')\nprint('Default sheet_name is 0 (first sheet)')",
        "Corporate Financial Audit", "Loading the 'Balance Sheet' tab from an annual corporate Excel workbook.",
        "What happens if you pass sheet_name=None to pd.read_excel()?", "It reads ALL worksheets in the workbook and returns a Python dictionary of DataFrames keyed by sheet name.",
        "Print the type of pd.read_excel function to confirm it is imported.",
        "import pandas as pd\nprint(callable(pd.read_excel))"
    ),
    (
        "pandas-m1-l7", "pandas-module-1", "Understanding Indexes, Columns, and Underlying Values",
        "The three-tier architecture of a DataFrame: index labels, column headers, and ndarray blocks",
        7, 14, "Beginner",
        "A City Grid with Street Names and House Numbers",
        "In Manhattan, avenues run vertically (columns) and streets run horizontally (index rows). The building at 5th Ave and 42nd St holds the actual value. A DataFrame is a coordinate grid where the index names rows and the columns name features.",
        "A DataFrame consists of: (1) df.index (row labels), (2) df.columns (feature labels), and (3) df.to_numpy() (raw values).",
        "Losing Meaningful Row Identity by Leaving Default RangeIndex",
        "Using 0, 1, 2 as the index for time-series or patient data makes lookups clumsy. Setting the index to Date or Patient_ID enables instant label-based querying.",
        "import pandas as pd\ndf = pd.DataFrame(\n    [[85, 90], [78, 88]],\n    index=['Student_1', 'Student_2'],\n    columns=['Math', 'Physics']\n)\nprint('DataFrame:\\n', df)\nprint('Row Index:', df.index)\nprint('Columns:', df.columns)\nprint('Underlying NumPy values:\\n', df.to_numpy())",
        "Medical Patient Vitals Matrix", "Indexing patient records by unique Medical Record Number (MRN).",
        "What attribute returns the column names of a DataFrame as an Index object?", "df.columns.",
        "Create a DataFrame with index=['a', 'b'] and columns=['X', 'Y'] and print df.index.",
        "import pandas as pd\ndf = pd.DataFrame([[1, 2], [3, 4]], index=['a', 'b'], columns=['X', 'Y'])\nprint(df.index)"
    ),
    (
        "pandas-m1-l8", "pandas-module-1", "Understanding Data Types in Pandas",
        "Mastering int64, float64, object, bool, category, and datetime64[ns]",
        8, 14, "Intermediate",
        "Different Compartments in a Hardware Toolbox",
        "A mechanic doesn't throw heavy iron wrenches into the tiny plastic screw bin. Each drawer has an exact specification. Pandas assigns specific dtypes (integers, floats, dates, categories) to optimize memory and operations.",
        "Each column in a DataFrame possesses a strict, uniform data type stored in contiguous memory.",
        "The Dreaded 'object' Dtype Memory Overhead",
        "If a numerical column contains a single string or space (' '), Pandas demotes the entire column to 'object' dtype (Python pointers), slowing down math by 20x. Checking dtypes catches this early.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'ID': [1, 2, 3],\n    'Score': [85.5, 92.0, 78.4],\n    'Passed': [True, True, False],\n    'Name': ['Alice', 'Bob', 'Charlie']\n})\nprint(df.dtypes)",
        "Customer Demographic Auditing", "Ensuring Zip_Code is stored as a string and Annual_Income as float64.",
        "What does an 'object' dtype typically represent in Pandas?", "It typically represents text strings or mixed Python objects stored as pointers.",
        "Create a DataFrame with an integer column and a float column, and print df.dtypes.",
        "import pandas as pd\ndf = pd.DataFrame({'a': [1, 2], 'b': [1.5, 2.5]})\nprint(df.dtypes)"
    ),
    (
        "pandas-m1-l9", "pandas-module-1", "Inspecting Data with head(), tail(), and sample()",
        "Quickly previewing top rows, trailing entries, and unbiased random samples",
        9, 12, "Beginner",
        "Sampling Food from a Buffet",
        "You don't eat every dish at a 50-dish buffet before deciding what you like. You sample small spoonfuls. head() tastes the first 5 dishes, tail() checks the desserts at the end, and sample() picks 3 random dishes.",
        "head(n) previews first n rows; tail(n) previews last n rows; sample(n) draws an unbiased random sample.",
        "Biased First-Look Data Ingestion",
        "Looking only at head() can hide errors at the end of a file (like corrupted footer rows or NaN blocks). Always inspect head(), tail(), and sample() together.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'ID': range(1, 11),\n    'Val': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]\n})\nprint('Head (first 3):\\n', df.head(3))\nprint('Tail (last 2):\\n', df.tail(2))\nprint('Random Sample (2 rows):\\n', df.sample(2, random_state=42))",
        "First-Look Dataset Validation", "Confirming CSV columns aligned correctly without opening a 5GB file in a text editor.",
        "What is the default number of rows returned by df.head() if n is omitted?", "5 rows.",
        "Display the first 2 rows of a DataFrame with 5 numbers using head(2).",
        "import pandas as pd\ndf = pd.DataFrame({'nums': [10, 20, 30, 40, 50]})\nprint(df.head(2))"
    ),
    (
        "pandas-m1-l10", "pandas-module-1", "Structural and Statistical Summaries: info() and describe()",
        "Auditing non-null counts, memory footprint, percentiles, and numerical distributions",
        10, 14, "Beginner",
        "A Medical Checkup and Vital Signs Report",
        "A doctor checks your heart rate, blood pressure, and height (describe). Then they inspect your medical chart to confirm all test results came back and nothing is missing (info). info() audits missing data; describe() summarizes distributions.",
        "df.info() shows memory usage and non-null counts; df.describe() computes percentiles, mean, and std.",
        "Missing Data Hidden Behind Large Datasets",
        "Looking at a 100,000-row table, you can't tell if column 'Income' has 20,000 blanks. df.info() displays non-null counts per column instantly.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Age': [22, 28, 35, 42, 50],\n    'Salary': [45000, 52000, 68000, 85000, 110000]\n})\nprint('Statistical summary (describe):\\n', df.describe().round(1))\nprint('Shape summary:', df.shape)",
        "Initial Exploratory Data Analysis (EDA)", "Generating the standard 5-number statistical summary for ML feature datasets.",
        "Does df.describe() include string/object columns by default?", "By default, describe() only analyzes numeric columns. Pass include='all' to describe categorical columns as well.",
        "Run describe() on a DataFrame with prices [10, 20, 30] and print the mean.",
        "import pandas as pd\ndf = pd.DataFrame({'price': [10, 20, 30]})\nprint(round(df.describe().loc['mean', 'price'], 1))"
    ),
    (
        "pandas-m1-l11", "pandas-module-1", "Schema Attributes: shape, columns, and dtypes",
        "Programmatically inspecting matrix dimensions, feature lists, and memory footprints",
        11, 12, "Beginner",
        "The Specifications Plate on Industrial Machinery",
        "A bulldozer has a metal specifications plate stating: Weight = 12 tons, Width = 3.2m, Fuel = Diesel. A DataFrame has .shape (rows, cols), .columns (feature names), and .dtypes (data formats).",
        "Attributes allow automated code to validate table geometry and schemas programmatically.",
        "Hardcoding Column Indices in Data Pipelines",
        "Referencing column 4 assuming it will always be 'Age' crashes when upstream systems add a new column. Using df.columns programmatically safeguards pipelines.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'User_ID': [101, 102],\n    'Signup_Date': ['2024-01-01', '2024-01-02'],\n    'Active': [True, False]\n})\nprint('Shape (rows, cols):', df.shape)\nprint('Columns list:', list(df.columns))\nprint('Data types per column:\\n', df.dtypes)\nprint('Total elements (size):', df.size)",
        "Automated Data Pipeline Validation", "Validating that incoming daily batch files match the expected 15-column schema before processing.",
        "What does df.shape return?", "A tuple: (number_of_rows, number_of_columns).",
        "Create a DataFrame of 3 rows and 2 columns and print its shape.",
        "import pandas as pd\ndf = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})\nprint(df.shape)"
    ),
    (
        "pandas-m1-l12", "pandas-module-1", "Building a Complete First-Look Dataset Inspection Workflow",
        "A standardized professional checklist for auditing any new tabular dataset",
        12, 14, "Intermediate",
        "A Pre-Flight Safety Checklist for Pilots",
        "Before an airplane takes off, the pilot checks fuel, flaps, rudder, and instruments systematically. Before training any machine learning model, a data scientist checks shape, head, missing values, dtypes, and duplicates.",
        "A systematic first-look workflow uncovers data corruption before downstream modeling begins.",
        "Training Models on Corrupted Raw Data",
        "Rushing directly to model.fit() without auditing raw data leads to silent garbage predictions. Standard first-look inspection catches schema drifts and missing data.",
        "import pandas as pd\n# Standardized first-look audit pipeline\ndf = pd.DataFrame({\n    'CustomerID': [1, 2, 3, 4],\n    'Age': [25, 30, None, 45],\n    'Spend': [100.5, 250.0, 75.2, 500.0]\n})\nprint('--- FIRST-LOOK AUDIT ---')\nprint(f'1. Geometry: {df.shape[0]} rows x {df.shape[1]} columns')\nprint('2. Missing value counts per column:\\n', df.isna().sum())\nprint('3. Duplicate rows count:', df.duplicated().sum())\nprint('4. Numerical summary:\\n', df.describe().round(1))",
        "Standard Machine Learning Ingestion Audit", "Running a standardized sanity check script on every newly downloaded Kaggle or client dataset.",
        "What are the 4 key steps of a professional first-look data inspection?", "1. Check shape, 2. Inspect head/tail, 3. Audit missing values with isna().sum(), 4. Check dtypes and duplicate rows.",
        "Write code to print the count of missing values in each column of a DataFrame.",
        "import pandas as pd\ndf = pd.DataFrame({'a': [1, None], 'b': [2, 3]})\nprint(df.isna().sum())"
    )
]

generate_pandas_module(
    "pandas-module-1", 1,
    "Pandas Foundations",
    "Series, DataFrames, Data Ingestion, Inspection & Architectural Mechanics",
    "Master the core tabular engine of modern Python data science. Learn Series and DataFrames, CSV and Excel ingestion, data types, and systematic first-look inspection workflows.",
    "Pandas Foundations", 12, m1_raw,
    "pandas-m2-l1", "Selecting a Single Column in Pandas"
)

# ==============================================================================
# MODULE 2: Selection, Filtering, and Indexing (15 Lessons)
# ==============================================================================
m2_raw = [
    (
        "pandas-m2-l1", "pandas-module-2", "Selecting a Single Column (Bracket vs Dot Notation)",
        "Extracting 1D Series using df['col'] versus df.col syntax and column naming traps",
        1, 12, "Beginner",
        "Picking a Specific Folder from a Filing Cabinet",
        "A filing cabinet has folders labeled 'Salaries', 'Names', and 'Dates'. You can point to the folder by name in brackets: cabinet['Salaries']. If a folder has a space in its name ('Annual Salaries'), dot notation (cabinet.Annual Salaries) breaks.",
        "Bracket notation df['col'] is robust and supports spaces and special characters; dot notation df.col is for quick interactive typing.",
        "The Dot-Notation Collision Bug",
        "If a column is named 'count', 'min', 'max', or 'shape', writing df.count calls the built-in DataFrame method instead of retrieving the column data! Bracket notation df['count'] is 100% collision-free.",
        "import pandas as pd\ndf = pd.DataFrame({'User Name': ['Alice', 'Bob'], 'Age': [25, 30]})\n# Bracket notation handles spaces\nnames = df['User Name']\n# Dot notation on valid names\nages = df.Age\nprint('Names (Series):\\n', names)\nprint('Ages (Series):\\n', ages)",
        "Extracting Feature Columns", "Extracting target prediction labels y = df['Target_Label'] for model training.",
        "Why is df['col'] safer than df.col in production code?", "df['col'] handles column names containing spaces, numbers, or names matching built-in DataFrame method names (e.g. 'count', 'mean').",
        "Select the 'Price' column from a DataFrame with columns ['Product', 'Price'].",
        "import pandas as pd\ndf = pd.DataFrame({'Product': ['A', 'B'], 'Price': [10, 20]})\nprint(df['Price'])"
    ),
    (
        "pandas-m2-l2", "pandas-module-2", "Selecting Multiple Columns with Column Lists",
        "Extracting tabular sub-matrices by passing lists of column labels: df[['col1', 'col2']]",
        2, 12, "Beginner",
        "Ordering a Custom Meal at a Restaurant",
        "Instead of ordering everything on the menu, you tell the waiter: 'I only want [Appetizer, Dessert]'. Passing a list of column names [['Math', 'Physics']] creates a focused 2D sub-table.",
        "Double brackets df[['col1', 'col2']] always return a 2D DataFrame, even if you only select one column: df[['col1']].",
        "Single vs Double Bracket Syntax Confusion",
        "Writing df['col1', 'col2'] throws a KeyError because Pandas looks for a single column with a tuple name. You must wrap them in a list: df[['col1', 'col2']].",
        "import pandas as pd\ndf = pd.DataFrame({\n    'ID': [1, 2, 3],\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Score': [85, 92, 78],\n    'City': ['NY', 'LDN', 'TKO']\n})\nsub = df[['Name', 'Score']]\nprint('Subset DataFrame:\\n', sub)\nprint('Shape of subset:', sub.shape)",
        "Extracting Feature Matrices X for ML", "Selecting the 5 numeric features from a 50-column dataset to pass into model training.",
        "What is the difference between df['Age'] and df[['Age']]?", "df['Age'] returns a 1D Series; df[['Age']] returns a 2D DataFrame with 1 column.",
        "Extract 'A' and 'B' columns from a DataFrame with columns ['A', 'B', 'C'].",
        "import pandas as pd\ndf = pd.DataFrame({'A': [1], 'B': [2], 'C': [3]})\nprint(df[['A', 'B']])"
    ),
    (
        "pandas-m2-l3", "pandas-module-2", "Selecting Rows by Integer Offset & Slicing",
        "Extracting row slices using bracket intervals: df[start:stop]",
        3, 12, "Beginner",
        "Flipping to a Specific Chapter in a Textbook",
        "If you want to read pages 10 to 20 of a book, you open directly to page 10 and stop before page 20. Slicing with df[0:3] selects rows 0, 1, and 2.",
        "Row slicing in brackets df[start:stop] slices along the row axis using standard Python slice semantics.",
        "Bracket Ambiguity Between Columns and Rows",
        "df['Age'] selects a column, but df[0:3] slices rows. To eliminate this ambiguity, production code uses df.iloc[0:3] for explicit integer row slicing.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Student': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],\n    'Grade': [88, 92, 75, 84, 91]\n})\nprint('First 3 rows (df[0:3]):\\n', df[0:3])\nprint('Every 2nd row (df[::2]):\\n', df[::2])",
        "Pagination in Web APIs", "Extracting page 2 of search results: df[10:20].",
        "Is the stop index inclusive or exclusive in df[0:3]?", "Exclusive (rows 0, 1, and 2 are returned).",
        "Slice the first 2 rows of a DataFrame using bracket slicing.",
        "import pandas as pd\ndf = pd.DataFrame({'x': [10, 20, 30]})\nprint(df[0:2])"
    ),
    (
        "pandas-m2-l4", "pandas-module-2", "Label-Based Indexing with loc[]",
        "Selecting rows and columns by their explicit human-readable labels",
        4, 14, "Beginner",
        "Looking Up an Address by Street Name and House Number",
        "You tell a taxi driver: 'Take me to Elm Street, House #42'. loc[] navigates by explicit string or date labels on rows and columns.",
        "df.loc[row_label, col_label] extracts entries by label. Note: loc label slicing is INCLUSIVE of both start and stop!",
        "The 'loc' Inclusive Slicing Trap",
        "Unlike Python lists and iloc (which exclude stop), loc['A':'C'] INCLUDES 'C' because with string labels, there is no natural 'next' item to serve as an exclusive boundary.",
        "import pandas as pd\ndf = pd.DataFrame(\n    [[85, 90], [92, 88], [78, 82]],\n    index=['Alice', 'Bob', 'Charlie'],\n    columns=['Math', 'Physics']\n)\n# loc extracts by label\nprint('Bob scores:\\n', df.loc['Bob'])\nprint('Alice Math score:', df.loc['Alice', 'Math'])\nprint('Slice Alice through Bob (both included!):\\n', df.loc['Alice':'Bob'])",
        "Financial Balance Sheet Lookup", "Retrieving 'Q4 2023' revenue by exact quarter string label.",
        "Is the stop label included in df.loc['A':'C']?", "Yes, loc label slices are inclusive of both endpoints.",
        "Use loc to extract row 'R1' and column 'C2' from a labeled DataFrame.",
        "import pandas as pd\ndf = pd.DataFrame([[1, 2], [3, 4]], index=['R1', 'R2'], columns=['C1', 'C2'])\nprint(df.loc['R1', 'C2'])"
    ),
    (
        "pandas-m2-l5", "pandas-module-2", "Position-Based Indexing with iloc[]",
        "Selecting rows and columns by zero-based integer positional coordinates",
        5, 14, "Beginner",
        "Navigating by Row and Column Coordinates in a Matrix",
        "You tell a warehouse robot: 'Go to Aisle 0, Shelf 2'. It doesn't care what brand of cereal is on the shelf; it navigates strictly by physical integer coordinates. iloc[] operates on integer offsets 0, 1, 2, ...",
        "df.iloc[row_idx, col_idx] selects entries by 0-based integer position.",
        "Mixing Label and Position Lookups",
        "Passing a column name to iloc like df.iloc[0, 'Age'] raises a TypeError: 'cannot do positional indexing on Index with these indexers of type str'. Use iloc for integers only.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'A': [10, 20, 30],\n    'B': [40, 50, 60],\n    'C': [70, 80, 90]\n}, index=['X', 'Y', 'Z'])\nprint('First row (iloc[0]):\\n', df.iloc[0])\nprint('Cell at row 1, col 2 (iloc[1, 2]):', df.iloc[1, 2])\nprint('First 2 rows, first 2 cols (iloc[0:2, 0:2]):\\n', df.iloc[0:2, 0:2])",
        "Train-Test Data Splitting by Row Count", "Splitting the first 80% of rows by integer offset: df.iloc[:split_idx].",
        "What type of arguments does iloc accept?", "Only integers, integer lists, or integer slices [start:stop:step].",
        "Extract the element at the top-left corner (row 0, col 0) using iloc.",
        "import pandas as pd\ndf = pd.DataFrame([[100, 200], [300, 400]])\nprint(df.iloc[0, 0])"
    ),
    (
        "pandas-m2-l6", "pandas-module-2", "Direct Comparison: loc[] versus iloc[] Rules and Traps",
        "A definitive side-by-side comparison of label vs position indexers",
        6, 14, "Intermediate",
        "Street Name vs GPS Coordinates",
        "loc is like giving a destination address ('Broadway & 42nd St'); iloc is like giving exact GPS latitude and longitude numbers (40.756, -73.986). Both reach the exact same destination through different coordinate systems.",
        "loc uses names/labels and includes the stop boundary; iloc uses integer positions and excludes the stop boundary.",
        "The Integer Index Trap with loc",
        "If a DataFrame has an index of integers [101, 102, 103], df.loc[0] FAILS with KeyError because 0 is not a label in the index! df.iloc[0] succeeds because 0 is the first physical row.",
        "import pandas as pd\ndf = pd.DataFrame({'Val': [10, 20, 30]}, index=[100, 200, 300])\nprint('iloc[0] retrieves first physical row:', df.iloc[0]['Val'])\nprint('loc[100] retrieves row with label 100:', df.loc[100]['Val'])\nprint('iloc[0:2] excludes index 2 (2 rows):', len(df.iloc[0:2]))\nprint('loc[100:200] includes label 200 (2 rows):', len(df.loc[100:200]))",
        "Robust Pipeline Architecture", "Using iloc for numeric batch processing and loc for human-readable business rules.",
        "Does df.iloc[0:2] return 2 rows or 3 rows?", "2 rows (index 0 and index 1; stop is exclusive).",
        "Create a DataFrame with index ['a', 'b', 'c'] and retrieve the first row using both loc and iloc.",
        "import pandas as pd\ndf = pd.DataFrame({'x': [1, 2, 3]}, index=['a', 'b', 'c'])\nprint(df.loc['a', 'x'] == df.iloc[0, 'x'] if False else (df.loc['a', 'x'], df.iloc[0, 0]))"
    ),
    (
        "pandas-m2-l7", "pandas-module-2", "Boolean Filtering on DataFrames",
        "Subsetting rows matching logical predicates and vectorized conditions",
        7, 12, "Beginner",
        "A Security Gate with Badge Scanning",
        "When employees badge in at an office turnstile, the gate opens only for badges marked 'Active' (True). df[df['Status'] == 'Active'] lets matching rows pass through to the filtered dataset.",
        "Boolean filtering evaluates a condition across rows, returning a subset where the condition is True.",
        "Assigning Filtered Rows Without .copy() (SettingWithCopyWarning)",
        "Modifying a filtered subset like sub = df[df['Age'] > 30]; sub['Bonus'] = 100 throws SettingWithCopyWarning. Use sub = df[df['Age'] > 30].copy() if you intend to modify the slice.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie', 'David'],\n    'Age': [25, 35, 45, 28],\n    'Salary': [60000, 85000, 110000, 62000]\n})\nhigh_earners = df[df['Salary'] >= 80000]\nprint('High Earners (Salary >= 80k):\\n', high_earners)",
        "Customer Churn Identification", "Selecting customers whose last login was more than 90 days ago.",
        "What data structure is produced by df['Salary'] >= 80000?", "A boolean Series of the same length as df.",
        "Filter a DataFrame to keep only rows where 'Score' is greater than 50.",
        "import pandas as pd\ndf = pd.DataFrame({'Score': [40, 60, 80]})\nprint(df[df['Score'] > 50])"
    ),
    (
        "pandas-m2-l8", "pandas-module-2", "Combining Multiple Conditions with & (AND) and | (OR)",
        "Complex filtering using bitwise logic, parentheses, and inversion (~)",
        8, 14, "Intermediate",
        "A Loan Approval Filter with Multi-Factor Checks",
        "To qualify for a mortgage, an applicant must have: (Credit Score > 700) AND (Annual Income > $60,000). If either check fails, the application is rejected. In Pandas, combine criteria with & (AND) and wrap each in parentheses.",
        "Combine conditions using & (element-wise AND), | (OR), and ~ (NOT). Parentheses around each clause are mandatory.",
        "The Missing Parentheses Syntax Error Trap",
        "Writing df[df['A'] > 5 & df['B'] < 10] raises a TypeError or ValueError because & has higher operator precedence than >. You must write df[(df['A'] > 5) & (df['B'] < 10)].",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie', 'David'],\n    'Dept': ['HR', 'IT', 'IT', 'Sales'],\n    'Experience': [5, 2, 8, 4]\n})\n# Senior IT staff: Dept == 'IT' AND Experience >= 5\nsenior_it = df[(df['Dept'] == 'IT') & (df['Experience'] >= 5)]\nprint('Senior IT Staff:\\n', senior_it)",
        "Compliance & Security Audit Filtering", "Selecting high-privilege accounts without two-factor authentication enabled.",
        "Why must each condition be wrapped in parentheses like (df['A'] > 1) & (df['B'] > 2)?", "Because bitwise & has higher operator precedence than comparison operators (> or ==).",
        "Filter a DataFrame for rows where 'x' > 0 OR 'y' < 5.",
        "import pandas as pd\ndf = pd.DataFrame({'x': [-1, 2], 'y': [4, 6]})\nprint(df[(df['x'] > 0) | (df['y'] < 5)])"
    ),
    (
        "pandas-m2-l9", "pandas-module-2", "Membership Filtering with isin()",
        "Filtering rows by membership in a list or set of target category values",
        9, 12, "Beginner",
        "A Guest List at a VIP Event Entrance",
        "A security guard has a clipboard listing VIP guests: ['Alice', 'Eve', 'Grace']. When attendees arrive, the guard checks if their name is on the list (isin). It replaces 10 clumsy 'OR' clauses with one clean list lookup.",
        "isin(values) returns a boolean mask indicating whether each element is contained in the specified values.",
        "Chaining Endless 'or' Clauses",
        "Writing df[(df['State'] == 'NY') | (df['State'] == 'CA') | (df['State'] == 'TX')] is verbose and messy. df['State'].isin(['NY', 'CA', 'TX']) is clean and fast.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Employee': ['Alice', 'Bob', 'Charlie', 'David'],\n    'City': ['London', 'Paris', 'Berlin', 'Madrid']\n})\ntarget_cities = ['London', 'Berlin']\nfiltered = df[df['City'].isin(target_cities)]\nprint('Employees in target cities:\\n', filtered)",
        "Regional Sales Filtering", "Filtering global transactions to keep only EMEA region countries: df['Country'].isin(emea_countries).",
        "How do you invert an isin() filter to select rows NOT in the list?", "Prefix the mask with the tilde operator: df[~df['City'].isin(target_cities)].",
        "Filter a DataFrame to keep only rows where 'Category' is in ['A', 'B'].",
        "import pandas as pd\ndf = pd.DataFrame({'Category': ['A', 'B', 'C', 'A']})\nprint(df[df['Category'].isin(['A', 'B'])])"
    ),
    (
        "pandas-m2-l10", "pandas-module-2", "Range Filtering with between()",
        "Selecting numerical rows within inclusive or exclusive closed intervals [left, right]",
        10, 12, "Beginner",
        "A Height Requirement for an Amusement Park Rollercoaster",
        "A rollercoaster allows riders who are between 120cm and 190cm tall. Rather than checking (height >= 120) & (height <= 190), df['Height'].between(120, 190) tests the interval directly.",
        "between(left, right) returns a boolean mask for values inside the closed interval [left, right].",
        "Boundary Inclusion Ambiguity (inclusive='both', 'neither')",
        "By default, between() includes both endpoints (inclusive='both'). If you want strict inequalities, pass inclusive='neither'.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Product': ['Item A', 'Item B', 'Item C', 'Item D'],\n    'Price': [25.0, 50.0, 75.0, 150.0]\n})\nmid_range = df[df['Price'].between(40.0, 80.0)]\nprint('Products priced between $40 and $80:\\n', mid_range)",
        "Customer Demographic Age Brackets", "Targeting millennial customers aged between 28 and 42 for a promotional campaign.",
        "What is the default boundary behavior of Series.between() in modern Pandas?", "inclusive='both' (both left and right bounds are included).",
        "Filter numbers in [10, 25, 50, 75, 100] that fall between 20 and 80.",
        "import pandas as pd\ndf = pd.DataFrame({'x': [10, 25, 50, 75, 100]})\nprint(df[df['x'].between(20, 80)])"
    ),
    (
        "pandas-m2-l11", "pandas-module-2", "Clean Querying with query()",
        "Expressive string-based SQL-like condition expressions for readable data filtering",
        11, 14, "Intermediate",
        "Ordering from a Database with a Natural SQL Sentence",
        "Instead of typing complex bracket and boolean syntax, you type a clean sentence: 'Age > 30 and Department == \"IT\"'. The query() method parses plain-text queries, making data analysis scripts read like English.",
        "df.query('expression') evaluates string expressions using numexpr for fast, readable filtering.",
        "Referencing Python Variables Inside query() Strings",
        "If you want to filter against a Python variable min_score, you must prefix it with an '@' symbol inside the query string: df.query('Score >= @min_score').",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie', 'David'],\n    'Age': [25, 35, 45, 28],\n    'Salary': [60000, 85000, 110000, 70000]\n})\nmin_sal = 75000\n# Clean string query referencing variable with @\nresult = df.query('Age > 30 and Salary >= @min_sal')\nprint('Query result:\\n', result)",
        "Interactive Analytics Dashboards", "Filtering records based on user-typed query strings in business intelligence portals.",
        "How do you reference an in-scope Python variable inside a df.query() expression?", "Prefix the variable name with an '@' symbol (e.g. '@target_var').",
        "Use df.query() to filter rows where 'Score' > 80.",
        "import pandas as pd\ndf = pd.DataFrame({'Score': [70, 85, 95]})\nprint(df.query('Score > 80'))"
    ),
    (
        "pandas-m2-l12", "pandas-module-2", "Conditional Replacement with where() and mask()",
        "Replacing non-matching or matching values while preserving DataFrame shape",
        12, 14, "Intermediate",
        "A Censorship Marker on a Sensitive Document",
        "A legal clerk redacts sensitive names by blacking them out with a marker while leaving the rest of the text intact. df.where(cond, other) keeps values where condition is True and replaces others with a substitute value.",
        "where() replaces values where the condition is False; mask() replaces values where the condition is True.",
        "The Inverted Logic Between where() and mask()",
        "Remember: where() keeps matching values (replaces False); mask() masks matching values (replaces True).",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Scores': [45, 88, 32, 95, 78]\n})\n# Replace failing scores (< 50) with 50 (floor cap)\nadjusted = df['Scores'].where(df['Scores'] >= 50, other=50)\nprint('Original:\\n', df['Scores'])\nprint('Adjusted with where() (capped at 50):\\n', adjusted)",
        "Outlier Capping and Data Masking", "Capping extreme sensor values or replacing confidential customer IDs with 'ANONYMOUS'.",
        "What does Series.where(condition, other=0) replace?", "It replaces elements where the condition is FALSE with the value 0.",
        "Use where() to replace negative values in [-5, 10, -2] with 0.",
        "import pandas as pd\ns = pd.Series([-5, 10, -2])\nprint(s.where(s >= 0, 0))"
    ),
    (
        "pandas-m2-l13", "pandas-module-2", "Sorting Values with sort_values()",
        "Ordering rows by single or multiple columns in ascending or descending direction",
        13, 12, "Beginner",
        "Arranging Student Exam Papers in Order of Merit",
        "A teacher sorts exam papers from highest score to lowest (descending). If two students tie with 90 marks, the teacher sorts them by last name alphabetically. sort_values(['Score', 'Name'], ascending=[False, True]) handles multi-level sorting.",
        "sort_values(by=cols, ascending=bool_list) orders DataFrame rows by specified columns.",
        "Sorting Without Saving the Result",
        "Calling df.sort_values('Price') returns a sorted DataFrame but leaves the original df unchanged. You must reassign: df = df.sort_values('Price').",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Student': ['Bob', 'Alice', 'David', 'Charlie'],\n    'Score': [85, 92, 85, 78]\n})\n# Sort by Score descending, then Student ascending\nsorted_df = df.sort_values(by=['Score', 'Student'], ascending=[False, True])\nprint('Sorted DataFrame:\\n', sorted_df)",
        "E-Commerce Product Search Ranking", "Sorting products by 'Rating' descending and 'Price' ascending.",
        "How do you sort a DataFrame in descending order by column 'Sales'?", "df.sort_values(by='Sales', ascending=False).",
        "Sort a DataFrame by 'Age' from youngest to oldest.",
        "import pandas as pd\ndf = pd.DataFrame({'Age': [40, 20, 30]})\nprint(df.sort_values(by='Age'))"
    ),
    (
        "pandas-m2-l14", "pandas-module-2", "Sorting Indexes, Setting and Resetting Indexes",
        "Promoting columns to indexes (set_index) and restoring sequential integers (reset_index)",
        14, 14, "Beginner",
        "Filing Records by Customer ID vs Sequential Numbering",
        "You can organize files by sequential arrival number (0, 1, 2) or re-index them by Customer ID (C-101, C-102). set_index() promotes a column into the index; reset_index() demotes it back to a standard column.",
        "set_index(col) assigns a column as row index; reset_index() restores default 0-based integer numbering.",
        "Losing Index Data on reset_index() When drop=True",
        "Calling df.reset_index(drop=True) permanently discards the old index instead of saving it as a regular column. Omit drop=True if you want to keep the column.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Emp_ID': [101, 102, 103],\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Salary': [70000, 80000, 90000]\n})\n# Set Emp_ID as row index\ndf_indexed = df.set_index('Emp_ID')\nprint('Indexed by Emp_ID:\\n', df_indexed)\n# Reset back\nprint('Reset back to RangeIndex:\\n', df_indexed.reset_index())",
        "Time-Series Date Indexing", "Setting the 'Timestamp' column as the DataFrame index to enable rolling window calculations.",
        "What does df.reset_index(drop=True) do?", "It resets the row index to 0, 1, 2, ... and drops the existing index without turning it into a column.",
        "Set column 'id' as the index of a DataFrame with columns ['id', 'val'].",
        "import pandas as pd\ndf = pd.DataFrame({'id': ['a', 'b'], 'val': [1, 2]})\nprint(df.set_index('id'))"
    ),
    (
        "pandas-m2-l15", "pandas-module-2", "Adding, Renaming, and Removing Columns (drop, rename, assign)",
        "Modifying DataFrame schemas, renaming feature headers, and cleaning column lists",
        15, 14, "Beginner",
        "Updating Column Headings on a Company Report",
        "A department changes its name from 'Personnel' to 'Human Resources'. You use rename() to fix the column header. If an obsolete column ('Fax Number') is no longer needed, you use drop() to discard it.",
        "rename(columns={old: new}) updates headers; drop(columns=[cols]) removes unwanted features.",
        "Forgetting axis=1 When Dropping Columns",
        "Writing df.drop(['ColA']) looks for a ROW named 'ColA' by default (axis=0) and crashes with KeyError. Always write df.drop(columns=['ColA']) or pass axis=1.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'old_name': ['Alice', 'Bob'],\n    'salary_usd': [5000, 6000],\n    'temp_col': [0, 0]\n})\n# 1. Rename column\ndf = df.rename(columns={'old_name': 'Employee_Name'})\n# 2. Add derived column\ndf['salary_annual'] = df['salary_usd'] * 12\n# 3. Drop temporary column\ndf = df.drop(columns=['temp_col'])\nprint('Modified DataFrame:\\n', df)",
        "Feature Engineering and Cleaning", "Creating 'Total_Revenue' = 'Units' * 'Price' and dropping intermediate temporary tracking columns.",
        "Which parameter in df.drop() ensures you drop a column rather than a row?", "columns=['col_name'] or passing axis=1.",
        "Rename column 'a' to 'alpha' in a DataFrame using df.rename.",
        "import pandas as pd\ndf = pd.DataFrame({'a': [1, 2]})\nprint(df.rename(columns={'a': 'alpha'}))"
    )
]

generate_pandas_module(
    "pandas-module-2", 2,
    "Selection, Filtering, and Indexing",
    "loc, iloc, Boolean Masks, Querying & Schema Modification",
    "Master data subsetting. Learn single and multi-column selection, loc vs iloc, boolean queries, range filters, sorting, index manipulation, and column renaming.",
    "Selection & Indexing", 14, m2_raw,
    "pandas-m3-l1", "Recognizing Missing Data in Pandas"
)

# ==============================================================================
# MODULE 3: Data Cleaning (14 Lessons)
# ==============================================================================
m3_raw = [
    (
        "pandas-m3-l1", "pandas-module-3", "Recognizing Missing Data: None, np.nan, and pd.NA",
        "Understanding null representations, float promotion, and modern nullable types",
        1, 14, "Intermediate",
        "A Blank Field on a Paper Application Form",
        "When an applicant leaves the 'Phone Number' line blank on a paper form, it doesn't mean their phone number is 0; it means the information is missing. In Pandas, missing data is represented by np.nan (float), None (object), or pd.NA (modern nullable type).",
        "Missing values represent unobserved or unknown information, distinctly different from zero or empty strings.",
        "Automatic Float Promotion of Integer Columns",
        "Historically, inserting np.nan into an integer column forced the entire column to become float64 because standard NumPy integers cannot represent NaN. Pandas modern nullable 'Int64' (capital I) preserves integers alongside pd.NA.",
        "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({\n    'Standard_Float_NaN': [1, 2, np.nan],\n    'Modern_Nullable_Int': pd.Series([1, 2, pd.NA], dtype='Int64')\n})\nprint(df)\nprint(df.dtypes)",
        "Customer Registration Form Auditing", "Recognizing optional fields that were left unpopulated by users.",
        "How does modern Pandas allow integers and missing values in the same column without float promotion?", "By using the nullable 'Int64' extension dtype (with capital 'I').",
        "Create a Series containing [10, np.nan, 30] and check its data type.",
        "import pandas as pd, numpy as np\ns = pd.Series([10, np.nan, 30])\nprint(s.dtype)"
    ),
    (
        "pandas-m3-l2", "pandas-module-3", "Detecting Missing Values with isna(), notna(), and isna().sum()",
        "Auditing missing value counts and null percentage distributions across columns",
        2, 12, "Beginner",
        "A Quality Control Inspector on a Manufacturing Line",
        "A quality control inspector counts how many bottles in a crate of 100 are missing bottle caps. isna().sum() counts how many rows in each column contain missing values.",
        "isna() produces a boolean mask of nulls; isna().sum() counts total nulls per feature.",
        "Evaluating 'val == np.nan' Instead of isna()",
        "By IEEE standard, np.nan == np.nan evaluates to False! Checking 'if x == np.nan' will NEVER detect missing values. Always use pd.isna(x) or df.isna().",
        "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', None, 'David'],\n    'Age': [25, np.nan, 35, 40],\n    'Salary': [50000, 60000, 75000, np.nan]\n})\nprint('Missing values count per column:\\n', df.isna().sum())\nprint('Total missing values in table:', df.isna().sum().sum())",
        "Data Quality Dashboard", "Reporting missing feature rates to stakeholders before building ML models.",
        "Why can you not check for missing values using 'df['col'] == np.nan'?", "By definition, NaN does not equal anything, including itself. You must use df['col'].isna().",
        "Count the missing values in a Series containing [1, None, 3, None].",
        "import pandas as pd\ns = pd.Series([1, None, 3, None])\nprint(s.isna().sum())"
    ),
    (
        "pandas-m3-l3", "pandas-module-3", "Dropping Missing Values with dropna()",
        "Removing incomplete rows or columns with how, thresh, and subset parameters",
        3, 14, "Beginner",
        "Discarding Incomplete Exam Answer Sheets",
        "If a student handed in an exam sheet with their name missing, the teacher must discard it (dropna). You can discard rows missing any value, rows missing all values, or rows missing critical required columns.",
        "dropna() removes rows or columns containing missing values based on threshold rules.",
        "Accidental Deletion of Most Data with Blind dropna()",
        "Calling df.dropna() blindly deletes every row that has even a single missing cell across all 100 columns, potentially wiping out 80% of your dataset. Always specify subset=['Critical_Col'].",
        "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({\n    'User': ['Alice', 'Bob', 'Charlie', 'David'],\n    'Email': ['a@x.com', None, 'c@x.com', 'd@x.com'],\n    'Phone': [123, None, None, 789]\n})\nprint('Drop rows missing ANY value:\\n', df.dropna())\nprint('Drop rows missing Email only:\\n', df.dropna(subset=['Email']))",
        "Cleaning Customer Email Lists", "Dropping subscriber records that lack an email address before sending a newsletter.",
        "What parameter in dropna() restricts missing-value checks to specific columns?", "The 'subset' parameter: df.dropna(subset=['ColA', 'ColB']).",
        "Drop rows where column 'A' has missing values from a DataFrame.",
        "import pandas as pd\ndf = pd.DataFrame({'A': [1, None, 3], 'B': [4, 5, 6]})\nprint(df.dropna(subset=['A']))"
    ),
    (
        "pandas-m3-l4", "pandas-module-3", "Filling Missing Values with fillna()",
        "Imputing nulls with constants, forward fill (ffill), and backward fill (bfill)",
        4, 14, "Beginner",
        "Carrying Forward Yesterday's Stock Price During Market Holidays",
        "If the stock exchange was closed on Sunday, Sunday's closing price is carried forward from Friday's last known price (forward fill). If a missing customer country is unstated, you fill it with 'Unknown'.",
        "fillna() replaces missing values with constant values or propagated neighboring observations.",
        "Using Deprecated method='ffill' in Modern Pandas",
        "In Pandas 2.0+, fillna(method='ffill') is deprecated. Use df.ffill() or df.bfill() directly.",
        "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({\n    'Date': pd.date_range('2024-01-01', periods=4),\n    'Price': [100.0, np.nan, np.nan, 105.0],\n    'Status': ['Pending', None, 'Complete', None]\n})\n# Modern ffill() and constant replacement\nprint('Forward-filled prices:\\n', df['Price'].ffill())\nprint('Constant filled status:\\n', df['Status'].fillna('Unknown'))",
        "Time-Series Gap Filling", "Forward-filling sensor readings when an IoT device drops communication momentarily.",
        "What modern method replaces df.fillna(method='ffill') in Pandas 2.0+?", "df.ffill().",
        "Fill missing values in [1, None, None, 4] using forward fill.",
        "import pandas as pd\ns = pd.Series([1, None, None, 4])\nprint(s.ffill())"
    ),
    (
        "pandas-m3-l5", "pandas-module-3", "Mean, Median, Mode, and Constant Imputation",
        "Choosing statistical replacement strategies based on distribution skewness and cardinality",
        5, 14, "Intermediate",
        "Estimating the Cost of an Item from Similar Purchases",
        "If an invoice is missing the price of a standard office chair, the accountant fills in the median price of all other chairs purchased that month ($150). Imputation uses central tendency to fill gaps logically.",
        "Impute skewed numerical data with median, symmetric data with mean, and categorical features with mode.",
        "Data Leakage from Imputing Before Train-Test Split",
        "CRITICAL ML RULE: You must compute the mean or median on the TRAINING SET only, and use that training value to fill test set missing values. Computing mean on the entire dataset leaks test distribution.",
        "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({\n    'Age': [20.0, 22.0, 25.0, 90.0, np.nan],\n    'City': ['NY', 'London', 'London', np.nan, 'Tokyo']\n})\nage_median = df['Age'].median()\ncity_mode = df['City'].mode()[0]\nprint('Imputed Age (median):\\n', df['Age'].fillna(age_median))\nprint('Imputed City (mode):\\n', df['City'].fillna(city_mode))",
        "Pre-Processing Survey Data", "Imputing missing respondent ages with median age before training demographic classifiers.",
        "Why is median imputation preferred over mean imputation for skewed features like income?", "Because the median is unaffected by extreme high-income outliers.",
        "Impute missing values in Series [10.0, 20.0, np.nan] with the mean.",
        "import pandas as pd, numpy as np\ns = pd.Series([10.0, 20.0, np.nan])\nprint(s.fillna(s.mean()))"
    ),
    (
        "pandas-m3-l6", "pandas-module-3", "Why Blindly Filling with Zero is Flawed",
        "Understanding how zero imputation distorts variances, distributions, and machine learning models",
        6, 14, "Intermediate",
        "Recording Body Temperature as 0 Degrees for a Missing Patient Reading",
        "If a nurse forgets to record a patient's temperature, filling it with 0 degrees means the patient is cryogenically frozen! In financial data, a missing 'Salary' filled with $0 turns a normal worker into an unpaid laborer, completely distorting regression lines.",
        "Zero is a real physical quantity; filling nulls with zero distorts distributions and correlations.",
        "Treating Zero as a Generic 'Not Available' Code",
        "Filling missing values with 0 creates false multimodal spikes at zero, ruining standard deviation and biasing linear model weights. Always choose meaningful domain-based imputation or indicator flags.",
        "import pandas as pd\nimport numpy as np\ntemps = pd.Series([36.5, 37.0, 36.8, np.nan, 37.2])\nzero_filled = temps.fillna(0)\nmedian_filled = temps.fillna(temps.median())\nprint('Original mean (skipping NaN):', temps.mean())\nprint('Mean with zero fill (severely distorted!):', zero_filled.mean())\nprint('Mean with median fill (preserved):', median_filled.mean())",
        "Clinical Healthcare Records", "Distinguishing between a lab test result of 0 (e.g. viral count undetected) vs test never performed (missing).",
        "Why is filling missing patient blood pressure with zero dangerous in machine learning?", "Because a blood pressure of zero indicates clinical death, creating extreme artificial outliers that bias model predictions.",
        "Demonstrate how filling [100.0, np.nan] with zero halves the mean.",
        "import pandas as pd, numpy as np\ns = pd.Series([100.0, np.nan])\nprint('Mean when filled with 0:', s.fillna(0).mean())"
    ),
    (
        "pandas-m3-l7", "pandas-module-3", "Removing Duplicate Rows with duplicated() and drop_duplicates()",
        "Auditing duplicate records, choosing keep='first' vs keep='last', and primary key de-duplication",
        7, 14, "Beginner",
        "Accidental Double Clicks on an Online Order Form",
        "A customer clicks 'Place Order' twice in 1 second, creating two identical transaction records in the database. drop_duplicates() identifies identical rows and keeps only the original.",
        "duplicated() identifies duplicate rows; drop_duplicates() purges duplicate records from tables.",
        "De-duplicating Without Specifying Subset Columns",
        "If a customer places two real orders with different Order_IDs but identical Name and Address, drop_duplicates() without subset leaves both. Specify subset=['CustomerID', 'Product'] to catch business duplicates.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Order_ID': [101, 102, 103, 104],\n    'Customer': ['Alice', 'Bob', 'Alice', 'David'],\n    'Product': ['Book', 'Pen', 'Book', 'Bag']\n})\n# Deduplicate based on Customer and Product\nclean_orders = df.drop_duplicates(subset=['Customer', 'Product'], keep='first')\nprint('Cleaned unique orders:\\n', clean_orders)",
        "CRM Customer Database De-duplication", "Merging multiple lead lists and removing duplicate customer email addresses.",
        "What does keep='last' do in drop_duplicates()?", "It keeps the last occurrence of duplicate rows and discards all earlier ones.",
        "Remove duplicates from a DataFrame with duplicated values [1, 2, 2, 3].",
        "import pandas as pd\ndf = pd.DataFrame({'x': [1, 2, 2, 3]})\nprint(df.drop_duplicates())"
    ),
    (
        "pandas-m3-l8", "pandas-module-3", "Understanding Incorrect Data Types and Diagnostic Checks",
        "Detecting hidden strings, trailing spaces, and currency symbols polluting numeric columns",
        8, 14, "Intermediate",
        "A Coin Counter Jammed by a Metal Washer",
        "A bank coin sorter counts 10,000 dimes until someone inserts a steel washer. The machine jams. If a column of 100,000 numbers contains a single text entry like 'N/A' or '$50', Pandas treats the entire column as text (object).",
        "Non-numeric characters in numeric columns force 'object' dtype, disabling mathematical functions.",
        "Attempting Math on Object Dtypes",
        "If 'Salary' is object dtype, df['Salary'].sum() concatenates strings ('5000060000') instead of computing numerical totals! Auditing dtypes prevents this catastrophe.",
        "import pandas as pd\ndf = pd.DataFrame({\n    'Price': ['$100', '$250', '$80'],\n    'Quantity': ['5', '10', '2']\n})\nprint('Raw dtypes before cleaning:\\n', df.dtypes)\n# Clean symbols and convert\ndf['Price'] = df['Price'].str.replace('$', '').astype(float)\ndf['Quantity'] = df['Quantity'].astype(int)\nprint('Cleaned dtypes:\\n', df.dtypes)\nprint('Total revenue:', (df['Price'] * df['Quantity']).sum())",
        "Scraped E-Commerce Web Data Cleaning", "Stripping currency symbols ('$', 'EUR') and commas from price strings before analytics.",
        "What happens if you try to compute df['Price'].mean() when Price has 'object' dtype with '$' signs?", "It raises a TypeError because Python cannot divide text strings by integer lengths.",
        "Clean the string '$50' to float 50.0.",
        "import pandas as pd\ns = pd.Series(['$50'])\nprint(float(s.str.replace('$', '')[0]))"
    ),
    (
        "pandas-m3-l9", "pandas-module-3", "Converting Data Types with astype() and to_numeric()",
        "Safe type casting, handling coercion errors (errors='coerce'), and memory downcasting",
        9, 14, "Intermediate",
        "A Sturdy Funnel with an Automatic Trash Filter",
        "astype() is a rigid funnel: if a square block hits it, it cracks and throws an error. pd.to_numeric(errors='coerce') is a smart funnel: if an invalid text string hits it, it turns it into NaN safely without crashing your script.",
        "pd.to_numeric(series, errors='coerce') converts dirty text numbers into floats, turning unparseable junk into NaN.",
        "astype() Crashing on Dirty Data",
        "Calling df['Age'].astype(int) on data containing 'Unknown' or empty spaces crashes with ValueError. pd.to_numeric with errors='coerce' cleans it safely.",
        "import pandas as pd\ndirty_scores = pd.Series(['85', '92', 'Absent', '78', 'MISSING'])\n# Coerce dirty strings to NaN safely\nclean_scores = pd.to_numeric(dirty_scores, errors='coerce')\nprint('Original dirty scores:\\n', dirty_scores)\nprint('Cleaned with pd.to_numeric(errors=\"coerce\"):\\n', clean_scores)",
        "Survey Free-Text Processing", "Converting survey open text fields like '25 years old' into numeric values.",
        "What does errors='coerce' do in pd.to_numeric()?", "It replaces any invalid or unparseable text string with NaN instead of raising an exception.",
        "Convert Series ['1', '2', 'bad'] into numeric with invalid entries coerced to NaN.",
        "import pandas as pd\nprint(pd.to_numeric(pd.Series(['1', '2', 'bad']), errors='coerce'))"
    ),
    (
        "pandas-m3-l10", "pandas-module-3", "Cleaning Text Values with String Methods (.str)",
        "Stripping whitespace, normalizing case, replacing patterns, and regex cleaning",
        10, 14, "Beginner",
        "A Haircut and Grooming for Messy Customer Entries",
        "Customers type their names into web forms with messy formatting: '  alice  ', 'ALICE', 'Alice '. To match them, you trim the leading/trailing spaces (strip) and convert to lowercase (lower).",
        "The .str accessor provides vectorized string methods (strip, lower, replace, contains) on text columns.",
        "Comparing Strings Without Stripping Whitespace",
        "Checking if state == 'NY' fails for ' NY ' because invisible whitespace differences make equality False. Always call .str.strip() on text inputs.",
        "import pandas as pd\nnames = pd.Series(['  Alice  ', 'BOB', 'charlie ', ' david'])\nclean_names = names.str.strip().str.capitalize()\nprint('Original messy names:\\n', names)\nprint('Cleaned standard names:\\n', clean_names)",
        "CRM Customer Contact Cleaning", "Standardizing user email addresses to lowercase and stripping accidental spacebar entries.",
        "Which Pandas string method removes leading and trailing spaces from text?", ".str.strip().",
        "Standardize Series ['  apple  ', 'PEAR '] using strip and lower.",
        "import pandas as pd\ns = pd.Series(['  apple  ', 'PEAR '])\nprint(s.str.strip().str.lower())"
    ),
    (
        "pandas-m3-l11", "pandas-module-3", "Handling Inconsistent Category Labels",
        "Standardizing categorical representations ('M', 'Male', 'male') using map() and replace()",
        11, 14, "Intermediate",
        "Translating Different Dialects into a Common Standard",
        "In a hospital survey, five doctors write patient gender differently: 'M', 'Male', 'm', 'MALE', 'Man'. They all mean the exact same category. You use replace() or map() to standardize them into one clean label: 'Male'.",
        "replace(dict) maps fragmented, inconsistent category variants into standard business labels.",
        "Fragmented Categories Splitting Machine Learning Trees",
        "If 'New York' is split into 'NY', 'N.Y.', and 'New York', Decision Trees and One-Hot Encoding treat them as 3 completely separate states, dividing sample size and ruining accuracy.",
        "import pandas as pd\ngender_series = pd.Series(['Male', 'm', 'MALE', 'Female', 'F', 'female'])\nmapping = {\n    'Male': 'Male', 'm': 'Male', 'MALE': 'Male',\n    'Female': 'Female', 'F': 'Female', 'female': 'Female'\n}\nstandardized = gender_series.replace(mapping)\nprint('Original fragmented labels:\\n', gender_series.value_counts())\nprint('Standardized clean labels:\\n', standardized.value_counts())",
        "Loan Application Form Normalization", "Standardizing marital status entries ('Married', 'M', 'Single', 'S') into standard codes.",
        "What method replaces multiple inconsistent labels using a dictionary map?", "Series.replace(dictionary_of_mappings).",
        "Standardize ['Y', 'yes', 'N'] to ['Yes', 'Yes', 'No'] using replace.",
        "import pandas as pd\ns = pd.Series(['Y', 'yes', 'N'])\nprint(s.replace({'Y': 'Yes', 'yes': 'Yes', 'N': 'No'}))"
    ),
    (
        "pandas-m3-l12", "pandas-module-3", "Identifying Outliers with IQR and Z-Score Rules",
        "Detecting extreme anomalies using statistical thresholds and distribution bounds",
        12, 14, "Intermediate",
        "A Metal Detector at a Coin Mint Filtering Foreign Objects",
        "A coin mint weighs every dime. If a coin weighs 10x more than normal, an alarm sounds. Outlier detection uses statistical thresholds (IQR or Z-Score) to catch corrupt entries like a human typing '1000' instead of '100'.",
        "Outlier rules: (1) Tukey IQR: < Q1 - 1.5*IQR or > Q3 + 1.5*IQR; (2) Z-Score: |z| > 3.",
        "Trashing Legitimate High-Value Data Points",
        "Not all outliers are errors; a billionaire customer is a real customer. Always distinguish data entry typos (Age = 999) from genuine extreme values before deleting.",
        "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({'House_Price': [250, 275, 300, 310, 290, 280, 2500]})\nq25 = df['House_Price'].quantile(0.25)\nq75 = df['House_Price'].quantile(0.75)\niqr = q75 - q25\nupper_fence = q75 + 1.5 * iqr\noutliers = df[df['House_Price'] > upper_fence]\nprint('Upper outlier boundary ($k):', upper_fence)\nprint('Detected luxury outlier property ($2.5M):\\n', outliers)",
        "Credit Card Fraud Detection", "Flagging transaction amounts that are 4 standard deviations above a user's normal spending baseline.",
        "What is the standard multiplier used in Tukey's IQR outlier rule?", "1.5 times the IQR (or 3.0 for extreme outliers).",
        "Find outliers in Series [10, 12, 11, 13, 100] using an upper threshold of 50.",
        "import pandas as pd\ns = pd.Series([10, 12, 11, 13, 100])\nprint(s[s > 50])"
    ),
    (
        "pandas-m3-l13", "pandas-module-3", "Handling Invalid Numerical Values with clip()",
        "Bounding numerical extremes and enforcing valid domain ranges without deleting rows",
        13, 12, "Beginner",
        "A Volume Knob on an Audio Speaker",
        "An amplifier volume knob has a physical ceiling: it cannot go past 10 or below 0. If an audio signal spikes to 15, the limiter caps it at 10 to protect the speaker. clip(lower=0, upper=10) bounds numerical extremes.",
        "clip(lower, upper) truncates extreme values to defined thresholds without dropping records.",
        "Dropping Valuable Rows When Only One Feature is Extreme",
        "Deleting an entire customer record because their reported age was 115 wastes the other 20 valid features in that row. Capping age with clip(upper=100) preserves the sample.",
        "import pandas as pd\nscores = pd.Series([-5, 45, 88, 105, 92])\n# Exam scores must be between 0 and 100\nclipped_scores = scores.clip(lower=0, upper=100)\nprint('Original scores (with invalid -5 and 105):\\n', scores.values)\nprint('Clipped scores within valid domain [0, 100]:\\n', clipped_scores.values)",
        "Sensor Measurement Range Enforcement", "Restricting humidity sensor telemetry strictly between 0% and 100%.",
        "Does Series.clip() modify values that already fall inside the bounds?", "No, values between lower and upper are left completely unchanged.",
        "Clip an array of values [-10, 5, 20] to the range [0, 10].",
        "import pandas as pd\ns = pd.Series([-10, 5, 20])\nprint(s.clip(0, 10))"
    ),
    (
        "pandas-m3-l14", "pandas-module-3", "Parsing Dates with to_datetime() & Data Quality Checklists",
        "Converting heterogeneous timestamp strings, handling time zones, and quality assurance audits",
        14, 14, "Intermediate",
        "A Universal Time Converter for Global Flight Logs",
        "Flights take off in Tokyo and land in London across different time formats ('15-Jan-2024', '2024/01/15 14:30'). pd.to_datetime() standardizes diverse text formats into uniform timestamp objects.",
        "pd.to_datetime() parses diverse date strings into standardized datetime64[ns] objects.",
        "American vs International Date Ambiguity (01/02/2024)",
        "Does 01/02/2024 mean January 2nd (US) or February 1st (International)? Pass dayfirst=True when parsing European data to prevent disastrous 1-month date shifts.",
        "import pandas as pd\ndate_strings = pd.Series(['2024-01-15', '2024/02/20', 'invalid_date'])\nclean_dates = pd.to_datetime(date_strings, errors='coerce')\nprint('Parsed datetime objects:\\n', clean_dates)\nprint('Extracted day names:\\n', clean_dates.dt.day_name())",
        "Subscription Churn & Tenure Analytics", "Calculating customer account age in days: (pd.Timestamp.now() - df['Signup_Date']).dt.days.",
        "Which parameter in pd.to_datetime() handles European date formats like '15/01/2024'?", "dayfirst=True.",
        "Convert string '2024-05-10' to a pandas datetime object.",
        "import pandas as pd\nprint(pd.to_datetime('2024-05-10'))"
    )
]

generate_pandas_module(
    "pandas-module-3", 3,
    "Data Cleaning",
    "Missing Values, Type Conversion, Outliers, Text Cleansing & Quality Auditing",
    "Transform messy, corrupt data into pristine analytical quality. Master missing value imputation, duplicate removal, safe type coercion, text standardization, and outlier bounds.",
    "Data Cleaning", 14, m3_raw,
    "pandas-m4-l1", "Element-Wise Transformations with apply(), map(), and replace()"
)

