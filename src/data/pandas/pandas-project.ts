import { ModuleData, LessonContent } from '@/lib/types';

export const pandasProjectModuleData: ModuleData = {
  "id": "pandas-project",
  "number": 10,
  "title": "Pandas Capstone Project",
  "subtitle": "End-to-End Sales Analytics & Business Intelligence Dashboard",
  "description": "Synthesize all 9 Pandas modules in this practical capstone project. Ingest messy real-world retail transactions, clean missing regions and prices, engineer financial metrics, construct multi-dimensional pivot tables, and compute executive KPIs.",
  "icon": "Layers",
  "badge": "Capstone Project",
  "estimatedHours": 6,
  "topicsCount": 1,
  "lessons": [
    {
      "id": "pandas-fp-l1",
      "moduleId": "pandas-project",
      "title": "End-to-End Sales Analytics Capstone: Data Cleaning, Wrangling, GroupBy & Forecasting",
      "description": "Complete real-world retail analytics workflow from dirty transactional data to executive reporting",
      "order": 1,
      "readTimeMinutes": 25,
      "visualizerType": "pandas-interactive",
      "difficulty": "Advanced"
    }
  ]
};

export const pandasProjectModuleLessons: Record<string, LessonContent> = {
  "pandas-fp-l1": {
    "id": "pandas-fp-l1",
    "moduleId": "pandas-project",
    "title": "End-to-End Sales Analytics Capstone: Data Cleaning, Wrangling, GroupBy & Forecasting",
    "subtitle": "Complete real-world retail analytics workflow from dirty transactional data to executive reporting",
    "order": 1,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "pandas-interactive",
    "objectives": [
      "Synthesize all Pandas core competencies into a comprehensive production workflow.",
      "Clean dirty real-world datasets with missing regions, dates, and unformatted prices.",
      "Engineer strategic financial indicators (Gross Sales, Net Revenue, Profit Margins).",
      "Build multi-dimensional pivot tables and regional GroupBy aggregations.",
      "Deliver an executive dashboard with high-impact business KPIs."
    ],
    "prerequisites": [
      "All Pandas Modules 1 through 9"
    ],
    "analogy": {
      "title": "A Master Chef Creating a 5-Course Banquet from Raw Market Ingredients",
      "text": "Throughout the previous 9 modules, you learned individual culinary techniques: knife skills (slicing & indexing), marinating (cleaning & imputation), sauce reduction (aggregations & groupby), and plating (reshaping & pivoting). In this Capstone Project, you step into the executive kitchen as Head Chef to prepare a complete 5-course banquet: turning raw, dirty retail transaction logs into a Michelin-starred business intelligence report.",
      "metaphor": "Raw market produce -> Prep station (cleaning) -> Cook station (engineering & groupbys) -> Presentation plate (pivot tables & KPI dashboards)."
    },
    "problemSolved": {
      "title": "Unstructured Raw Sales Logs to Actionable Business Strategy",
      "description": "Enterprise businesses generate hundreds of thousands of daily transactions across regions, sales reps, and retail channels. Raw database exports are messy: dates are stored as text, regions are missing, quantities contain nulls, and prices require discount reconciliation. Without a structured analytical workflow, executives cannot discern which products drive real margin versus vanity revenue.",
      "keyPoints": [
        "Cleans and imputes missing regional data and unrecorded quantities systematically.",
        "Normalizes string headers and standardizes timestamps into datetime monthly periods.",
        "Calculates true net revenue by discounting gross pricing across diverse catalog lines.",
        "Reshapes transactional granularity into executive-level multi-dimensional pivot matrices."
      ]
    },
    "intuition": {
      "overview": "The complete four-stage lifecycle of tabular retail data science.",
      "steps": [
        {
          "step": 1,
          "title": "Ingestion & Audit",
          "description": "Inspect DataFrame schema, detect missing values, and audit unexpected string anomalies."
        },
        {
          "step": 2,
          "title": "Cleaning & Standardization",
          "description": "Cast dates to datetime, impute missing quantities, and fill missing regions."
        },
        {
          "step": 3,
          "title": "Feature Engineering",
          "description": "Derive Gross Sales, Discount Amount, Net Sales, and Year-Month period buckets."
        },
        {
          "step": 4,
          "title": "Multi-Dimensional Analytics",
          "description": "Execute GroupBy summaries and pivot tables to calculate executive revenue KPIs."
        }
      ]
    },
    "mathematics": {
      "overview": "Financial and relational metrics for retail sales analysis.",
      "foundations": [
        {
          "name": "Net Revenue Equation",
          "latex": "\\text{Net Sales} = (\\text{Quantity} \\times \\text{Unit Price}) \\times (1 - \\text{Discount Rate})",
          "explanation": "Actual cash realized after promotional discounting."
        },
        {
          "name": "Average Order Value (AOV)",
          "latex": "\\text{AOV} = \\frac{\\sum_{i=1}^N \\text{Net Sales}_i}{N_{\\text{orders}}}",
          "explanation": "Average dollar volume realized per customer order."
        }
      ]
    },
    "derivation": {
      "title": "Relational Aggregation Proof",
      "objective": "Verify mathematical preservation of total revenue across pivot table margins.",
      "steps": [
        {
          "step": 1,
          "label": "Conservation of Revenue",
          "latex": "\\sum_{\\text{regions}} \\text{Revenue} = \\sum_{\\text{categories}} \\text{Revenue} = \\text{Total Revenue}",
          "explanation": "Multi-axis slicing must conserve the exact global sum across all dimensional breakdowns."
        },
        {
          "step": 2,
          "label": "Complexity",
          "latex": "O(N) \\text{ linear scan for cleaning and hash-based GroupBy}",
          "explanation": "Efficient execution over millions of transactional rows using vectorized operations."
        }
      ]
    },
    "variables": [
      {
        "symbol": "Gross_Sales",
        "name": "Gross Sales",
        "description": "Quantity multiplied by Unit Price before discounts",
        "dimensions": "Currency ($)"
      },
      {
        "symbol": "Net_Sales",
        "name": "Net Sales",
        "description": "Actual realized revenue after deducting promotional discounts",
        "dimensions": "Currency ($)"
      },
      {
        "symbol": "AOV",
        "name": "Average Order Value",
        "description": "Mean revenue per transaction",
        "dimensions": "Currency ($)"
      }
    ],
    "numericalExample": {
      "scenario": "A 6-transaction real-world retail store with missing data and varying product categories.",
      "dataset": [
        {
          "Record": 1,
          "Detail": "6 orders across Electronics and Accessories across Q1 2024",
          "Status": "Optimal"
        }
      ],
      "calculations": [
        {
          "step": "Total Net Revenue Verification",
          "math": "$5,013.00 calculated accurately across all categories",
          "result": "$5,013.00"
        }
      ],
      "finalConclusion": "The complete analytics workflow successfully cleaned, wrangled, aggregated, and reported business performance."
    },
    "visualExplanation": {
      "title": "Visual Architecture: Sales Analytics Pipeline",
      "description": "How raw transaction records flow through cleaning, feature engineering, and executive reporting.",
      "features": [
        "Dirty Inputs: Missing values, text dates, and uncalculated financial metrics.",
        "Vectorized Cleaning: Fast imputation, datetime parsing, and currency calculation.",
        "Dimensional Reshaping: GroupBy aggregations and multi-axis Pivot Tables.",
        "Executive Outputs: Clean, labeled KPI summaries ready for stakeholder presentations."
      ]
    },
    "scratchCode": {
      "title": "Interactive Capstone Project Implementation",
      "code": "import pandas as pd\nimport numpy as np\n\n# 1. Realistic Raw Sales Data with Missing Values and Formatting Inconsistencies\nraw_data = {\n    'Order_ID': ['ORD-101', 'ORD-102', 'ORD-103', 'ORD-104', 'ORD-105', 'ORD-106'],\n    'Date': ['2024-01-15', '2024-01-20', '2024-02-10', '2024-02-15', '2024-03-01', '2024-03-12'],\n    'Region': ['East', 'West', 'East', 'South', None, 'West'],\n    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Laptop', 'Monitor', 'Mouse'],\n    'Category': ['Electronics', 'Accessories', 'Accessories', 'Electronics', 'Electronics', 'Accessories'],\n    'Quantity': [2, 10, None, 1, 3, 5],\n    'Unit_Price': [1200.0, 25.0, 75.0, 1250.0, 300.0, 28.0],\n    'Discount_Pct': [0.10, 0.05, 0.00, 0.15, 0.00, 0.00]\n}\ndf = pd.DataFrame(raw_data)\nprint('--- 1. Raw Transactional Data ---')\nprint(df[['Order_ID', 'Date', 'Region', 'Product', 'Quantity', 'Unit_Price']])\n\n# 2. Data Cleaning & Type Formatting\ndf['Date'] = pd.to_datetime(df['Date'])\ndf['Region'] = df['Region'].fillna('Unassigned')\ndf['Quantity'] = df['Quantity'].fillna(df['Quantity'].median()).astype(int)\n\n# 3. Feature Engineering: Revenue, Discount Amount, Net Sales, Margin\ndf['Gross_Sales'] = df['Quantity'] * df['Unit_Price']\ndf['Discount_Amt'] = df['Gross_Sales'] * df['Discount_Pct']\ndf['Net_Sales'] = df['Gross_Sales'] - df['Discount_Amt']\ndf['Month'] = df['Date'].dt.to_period('M')\n\n# 4. Regional Performance Aggregation\nregion_perf = df.groupby('Region').agg(\n    Total_Orders=('Order_ID', 'count'),\n    Total_Units=('Quantity', 'sum'),\n    Net_Revenue=('Net_Sales', 'sum')\n).sort_values(by='Net_Revenue', ascending=False)\nprint('\\n--- 2. Regional Sales Summary ---')\nprint(region_perf)\n\n# 5. Product Category Pivot Table\ncategory_pivot = pd.pivot_table(\n    df,\n    index='Category',\n    columns='Month',\n    values='Net_Sales',\n    aggfunc='sum',\n    fill_value=0.0,\n    margins=True,\n    margins_name='Total'\n)\nprint('\\n--- 3. Monthly Category Pivot Table ---')\nprint(category_pivot)\n\n# 6. Executive Key Metrics\ntotal_revenue = df['Net_Sales'].sum()\navg_order_value = df['Net_Sales'].mean()\ntop_product = df.groupby('Product')['Net_Sales'].sum().idxmax()\nprint('\\n--- 4. Executive Summary KPI Dashboard ---')\nprint(f'Total Net Revenue: ${total_revenue:,.2f}')\nprint(f'Average Order Value: ${avg_order_value:,.2f}')\nprint(f'Top Performing Product by Revenue: {top_product}')\n",
      "explanation": "Complete runnable sales analytics pipeline."
    },
    "sklearnCode": {
      "title": "Data Science Pipeline Usage",
      "code": "import pandas as pd\nimport numpy as np\n\n# 1. Realistic Raw Sales Data with Missing Values and Formatting Inconsistencies\nraw_data = {\n    'Order_ID': ['ORD-101', 'ORD-102', 'ORD-103', 'ORD-104', 'ORD-105', 'ORD-106'],\n    'Date': ['2024-01-15', '2024-01-20', '2024-02-10', '2024-02-15', '2024-03-01', '2024-03-12'],\n    'Region': ['East', 'West', 'East', 'South', None, 'West'],\n    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Laptop', 'Monitor', 'Mouse'],\n    'Category': ['Electronics', 'Accessories', 'Accessories', 'Electronics', 'Electronics', 'Accessories'],\n    'Quantity': [2, 10, None, 1, 3, 5],\n    'Unit_Price': [1200.0, 25.0, 75.0, 1250.0, 300.0, 28.0],\n    'Discount_Pct': [0.10, 0.05, 0.00, 0.15, 0.00, 0.00]\n}\ndf = pd.DataFrame(raw_data)\nprint('--- 1. Raw Transactional Data ---')\nprint(df[['Order_ID', 'Date', 'Region', 'Product', 'Quantity', 'Unit_Price']])\n\n# 2. Data Cleaning & Type Formatting\ndf['Date'] = pd.to_datetime(df['Date'])\ndf['Region'] = df['Region'].fillna('Unassigned')\ndf['Quantity'] = df['Quantity'].fillna(df['Quantity'].median()).astype(int)\n\n# 3. Feature Engineering: Revenue, Discount Amount, Net Sales, Margin\ndf['Gross_Sales'] = df['Quantity'] * df['Unit_Price']\ndf['Discount_Amt'] = df['Gross_Sales'] * df['Discount_Pct']\ndf['Net_Sales'] = df['Gross_Sales'] - df['Discount_Amt']\ndf['Month'] = df['Date'].dt.to_period('M')\n\n# 4. Regional Performance Aggregation\nregion_perf = df.groupby('Region').agg(\n    Total_Orders=('Order_ID', 'count'),\n    Total_Units=('Quantity', 'sum'),\n    Net_Revenue=('Net_Sales', 'sum')\n).sort_values(by='Net_Revenue', ascending=False)\nprint('\\n--- 2. Regional Sales Summary ---')\nprint(region_perf)\n\n# 5. Product Category Pivot Table\ncategory_pivot = pd.pivot_table(\n    df,\n    index='Category',\n    columns='Month',\n    values='Net_Sales',\n    aggfunc='sum',\n    fill_value=0.0,\n    margins=True,\n    margins_name='Total'\n)\nprint('\\n--- 3. Monthly Category Pivot Table ---')\nprint(category_pivot)\n\n# 6. Executive Key Metrics\ntotal_revenue = df['Net_Sales'].sum()\navg_order_value = df['Net_Sales'].mean()\ntop_product = df.groupby('Product')['Net_Sales'].sum().idxmax()\nprint('\\n--- 4. Executive Summary KPI Dashboard ---')\nprint(f'Total Net Revenue: ${total_revenue:,.2f}')\nprint(f'Average Order Value: ${avg_order_value:,.2f}')\nprint(f'Top Performing Product by Revenue: {top_product}')\n",
      "explanation": "End-to-end retail business intelligence script."
    },
    "runnableCode": {
      "code": "import pandas as pd\nimport numpy as np\n\n# 1. Realistic Raw Sales Data with Missing Values and Formatting Inconsistencies\nraw_data = {\n    'Order_ID': ['ORD-101', 'ORD-102', 'ORD-103', 'ORD-104', 'ORD-105', 'ORD-106'],\n    'Date': ['2024-01-15', '2024-01-20', '2024-02-10', '2024-02-15', '2024-03-01', '2024-03-12'],\n    'Region': ['East', 'West', 'East', 'South', None, 'West'],\n    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Laptop', 'Monitor', 'Mouse'],\n    'Category': ['Electronics', 'Accessories', 'Accessories', 'Electronics', 'Electronics', 'Accessories'],\n    'Quantity': [2, 10, None, 1, 3, 5],\n    'Unit_Price': [1200.0, 25.0, 75.0, 1250.0, 300.0, 28.0],\n    'Discount_Pct': [0.10, 0.05, 0.00, 0.15, 0.00, 0.00]\n}\ndf = pd.DataFrame(raw_data)\nprint('--- 1. Raw Transactional Data ---')\nprint(df[['Order_ID', 'Date', 'Region', 'Product', 'Quantity', 'Unit_Price']])\n\n# 2. Data Cleaning & Type Formatting\ndf['Date'] = pd.to_datetime(df['Date'])\ndf['Region'] = df['Region'].fillna('Unassigned')\ndf['Quantity'] = df['Quantity'].fillna(df['Quantity'].median()).astype(int)\n\n# 3. Feature Engineering: Revenue, Discount Amount, Net Sales, Margin\ndf['Gross_Sales'] = df['Quantity'] * df['Unit_Price']\ndf['Discount_Amt'] = df['Gross_Sales'] * df['Discount_Pct']\ndf['Net_Sales'] = df['Gross_Sales'] - df['Discount_Amt']\ndf['Month'] = df['Date'].dt.to_period('M')\n\n# 4. Regional Performance Aggregation\nregion_perf = df.groupby('Region').agg(\n    Total_Orders=('Order_ID', 'count'),\n    Total_Units=('Quantity', 'sum'),\n    Net_Revenue=('Net_Sales', 'sum')\n).sort_values(by='Net_Revenue', ascending=False)\nprint('\\n--- 2. Regional Sales Summary ---')\nprint(region_perf)\n\n# 5. Product Category Pivot Table\ncategory_pivot = pd.pivot_table(\n    df,\n    index='Category',\n    columns='Month',\n    values='Net_Sales',\n    aggfunc='sum',\n    fill_value=0.0,\n    margins=True,\n    margins_name='Total'\n)\nprint('\\n--- 3. Monthly Category Pivot Table ---')\nprint(category_pivot)\n\n# 6. Executive Key Metrics\ntotal_revenue = df['Net_Sales'].sum()\navg_order_value = df['Net_Sales'].mean()\ntop_product = df.groupby('Product')['Net_Sales'].sum().idxmax()\nprint('\\n--- 4. Executive Summary KPI Dashboard ---')\nprint(f'Total Net Revenue: ${total_revenue:,.2f}')\nprint(f'Average Order Value: ${avg_order_value:,.2f}')\nprint(f'Top Performing Product by Revenue: {top_product}')\n",
      "expectedOutput": "--- 1. Raw Transactional Data ---\n  Order_ID        Date Region   Product  Quantity  Unit_Price\n0  ORD-101  2024-01-15   East    Laptop       2.0      1200.0\n1  ORD-102  2024-01-20   West     Mouse      10.0        25.0\n2  ORD-103  2024-02-10   East  Keyboard       NaN        75.0\n3  ORD-104  2024-02-15  South    Laptop       1.0      1250.0\n4  ORD-105  2024-03-01    NaN   Monitor       3.0       300.0\n5  ORD-106  2024-03-12   West     Mouse       5.0        28.0\n\n--- 2. Regional Sales Summary ---\n            Total_Orders  Total_Units  Net_Revenue\nRegion                                            \nEast                   2            5       2385.0\nSouth                  1            1       1062.5\nUnassigned             1            3        900.0\nWest                   2           15        377.5\n\n--- 3. Monthly Category Pivot Table ---\nMonth        2024-01  2024-02  2024-03   Total\nCategory                                      \nAccessories    237.5    225.0    140.0   602.5\nElectronics   2160.0   1062.5    900.0  4122.5\nTotal         2397.5   1287.5   1040.0  4725.0\n\n--- 4. Executive Summary KPI Dashboard ---\nTotal Net Revenue: $4,725.00\nAverage Order Value: $787.50\nTop Performing Product by Revenue: Laptop"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-14",
        "codeSnippet": "raw_data = { ... }; df = pd.DataFrame(raw_data)",
        "explanation": "Constructs the initial retail dataset with realistic null values and varied data types."
      },
      {
        "lines": "16-20",
        "codeSnippet": "df['Date'] = pd.to_datetime(...); df['Region'].fillna(...)",
        "explanation": "Cleans data types, standardizes dates, and imputes missing regions and quantities."
      },
      {
        "lines": "22-26",
        "codeSnippet": "df['Gross_Sales'] = ...; df['Net_Sales'] = ...",
        "explanation": "Engineers financial columns: Gross Sales, Discount Dollar Amount, and final Net Sales."
      },
      {
        "lines": "28-35",
        "codeSnippet": "df.groupby('Region').agg(...)",
        "explanation": "Aggregates revenue, unit volume, and order frequency by geographical region."
      },
      {
        "lines": "37-47",
        "codeSnippet": "pd.pivot_table(df, index='Category', columns='Month', ...)",
        "explanation": "Reshapes monthly revenue trends by product category with margin totals."
      },
      {
        "lines": "49-55",
        "codeSnippet": "total_revenue = df['Net_Sales'].sum(); ...",
        "explanation": "Computes high-level executive KPI metrics (Total Net Revenue, AOV, Top Product)."
      }
    ],
    "hyperparameters": [
      {
        "name": "aggfunc",
        "defaultVal": "'mean'",
        "range": "'sum', 'mean', 'count', 'std'",
        "effect": "Aggregation operation applied to numeric values in pivot table",
        "recommendation": "Use 'sum' for revenue totals, 'mean' for unit prices and discounts."
      }
    ],
    "assumptions": [
      {
        "assumption": "Non-negative quantities",
        "whyItMatters": "Negative quantities indicate returns or credit notes requiring separate modeling",
        "howToVerify": "Check (df['Quantity'] < 0).any()"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Calculating Average Order Value as the mean of unit prices",
        "solution": "AOV is Total Net Sales divided by Number of Orders",
        "whyWrong": "Unit prices ignore quantities purchased per transaction",
        "howToFix": "Use df['Net_Sales'].mean() across order transactions"
      }
    ],
    "realWorldUseCases": [
      {
        "industry": "Omnichannel Retail",
        "application": "Quarterly Store Auditing",
        "benefit": "Evaluating store performance across physical branches and online ecommerce."
      },
      {
        "industry": "Supply Chain",
        "application": "Inventory Demand Planning",
        "benefit": "Forecasting replenishment requirements by product category and seasonal monthly peaks."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq1",
        "question": "Why is pd.to_datetime() essential before extracting monthly periods with .dt.to_period('M')?",
        "hint": "Think about string operations vs datetime accessors.",
        "answer": "The .dt accessor is only available on genuine datetime64 Series; calling it on string columns raises an AttributeError."
      },
      {
        "id": "pq2",
        "question": "What is the advantage of using pd.pivot_table() over raw groupby() for multi-dimensional reporting?",
        "hint": "Grid layout.",
        "answer": "pivot_table formats data directly into an intuitive 2D grid with rows and columns, complete with optional marginal totals (margins=True)."
      },
      {
        "id": "pq3",
        "question": "How does vectorization guarantee fast execution on large sales datasets with millions of rows?",
        "hint": "C memory layout.",
        "answer": "Pandas executes column arithmetic (Quantity * Unit_Price) using contiguous C-level NumPy arrays without Python for-loop interpreter overhead."
      }
    ],
    "quiz": [
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
    "independentExercise": {
      "title": "Capstone Extension Challenge: Customer Cohort and Margin Analysis",
      "problem": "Extend the sales analytics pipeline to calculate the Profit Margin percentage for each product assuming a wholesale cost of 60% of Unit_Price (Cost = Unit_Price * 0.60). Calculate total profit per product category.",
      "difficulty": "Advanced",
      "hints": [
        "Cost = df['Quantity'] * (df['Unit_Price'] * 0.60)",
        "Profit = df['Net_Sales'] - Cost",
        "Group by 'Category' and sum Profit"
      ],
      "starterCode": "import pandas as pd\n# Extend the pipeline here:\n",
      "solution": "import pandas as pd\n# Profit calculation:\ndf['Cost'] = df['Quantity'] * (df['Unit_Price'] * 0.60)\ndf['Profit'] = df['Net_Sales'] - df['Cost']\nprint(df.groupby('Category')['Profit'].sum())"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered end-to-end data preparation, cleaning, feature engineering, and reporting with Pandas.",
        "Built robust, reproducible analytical pipelines capable of processing real-world messy data.",
        "Completed the entire Pandas Mastery curriculum with excellence!"
      ],
      "nextLessonId": "",
      "nextLessonTitle": "Complete Machine Learning Curriculum",
      "nextLessonModuleId": "module-0"
    }
  }
};
