import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule6Data: DSAModuleData = {
  "id": "dsa-module-6",
  "number": 6,
  "title": "Recursion and Backtracking",
  "subtitle": "State-Space Search, Pruning & Combinatorial Problems",
  "description": "Go beyond simple recursion into full state-space exploration. Implement subsets, permutations, and combinations generators. Solve classic constraint-satisfaction problems including N-Queens and Sudoku, and learn pruning strategies that make backtracking efficient.",
  "icon": "GitBranch",
  "badge": "Recursion",
  "estimatedHours": 8,
  "topicsCount": 7,
  "lessons": [
    {
      "id": "dsa-recursion-trees-calls",
      "moduleId": "dsa-module-6",
      "title": "Recursion Trees and Call Stacks",
      "description": "Visualizing recursive calls as trees, understanding stack frames, and tail recursion.",
      "order": 1,
      "readTimeMinutes": 22,
      "visualizerType": "recursion-tree",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-recursion-subsets",
      "moduleId": "dsa-module-6",
      "title": "Subsets and Subsequences",
      "description": "Generating all 2^n subsets using bit manipulation and recursive include/exclude pattern.",
      "order": 2,
      "readTimeMinutes": 25,
      "visualizerType": "recursion-tree",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-recursion-permutations",
      "moduleId": "dsa-module-6",
      "title": "Permutations and Combinations",
      "description": "Generating all n! permutations and C(n,k) combinations using swap-based and slot-filling recursion.",
      "order": 3,
      "readTimeMinutes": 28,
      "visualizerType": "recursion-tree",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-backtracking-n-queens",
      "moduleId": "dsa-module-6",
      "title": "N-Queens Problem",
      "description": "Placing N queens on an NxN board with no conflicts using column/diagonal constraint tracking.",
      "order": 4,
      "readTimeMinutes": 30,
      "visualizerType": "recursion-tree",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-backtracking-sudoku",
      "moduleId": "dsa-module-6",
      "title": "Sudoku Solver",
      "description": "Constraint-propagation backtracking to solve 9x9 Sudoku with row/column/box validity checks.",
      "order": 5,
      "readTimeMinutes": 32,
      "visualizerType": "recursion-tree",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-backtracking-maze",
      "moduleId": "dsa-module-6",
      "title": "Maze and Path Problems",
      "description": "Finding all paths and the shortest path in a grid maze using DFS backtracking.",
      "order": 6,
      "readTimeMinutes": 25,
      "visualizerType": "graph",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-backtracking-pruning",
      "moduleId": "dsa-module-6",
      "title": "Pruning and Backtracking Optimization",
      "description": "Branch-and-bound, constraint propagation, and ordering heuristics to minimize search space.",
      "order": 7,
      "readTimeMinutes": 28,
      "visualizerType": "recursion-tree",
      "difficulty": "Advanced"
    }
  ]
};

export const dsaModule6Lessons: Record<string, DSALessonContent> = {
  "dsa-backtracking-n-queens": {
    "id": "dsa-backtracking-n-queens",
    "moduleId": "dsa-module-6",
    "title": "The N-Queens Problem: Constraint Propagation and State-Space Pruning",
    "subtitle": "Backtracking Search, Diagonal Invariants, and Safe Placement Pruning",
    "order": 4,
    "readTimeMinutes": 30,
    "difficulty": "Advanced",
    "visualizerType": "recursion-tree",
    "objectives": [
      "Understand backtracking as Depth-First Search over a state-space decision tree.",
      "Formulate the N-Queens problem: place N queens on an N×N board such that no two attack each other.",
      "Master the mathematical diagonal indexing trick: positive diagonals (r + c) and negative diagonals (r - c).",
      "Track constraints in O(1) time using hash sets for columns and diagonals.",
      "Differentiate brute-force combinatorial explosion from efficient pruned branch search."
    ],
    "prerequisites": [
      "Recursion fundamentals and base case design",
      "2D matrices and row/column coordinate systems",
      "Sets for constant-time constraint checks"
    ],
    "analogy": {
      "title": "Navigating a Labyrinth with String and Chalk",
      "text": "Imagine exploring an ancient underground maze with branching corridors. At every crossroads, you make a tentative choice and mark the tunnel with chalk while unspooling a line of string behind you. As you walk down a tunnel, if you hit a dead end, you do not panic: you reel in your string, backtrack step-by-step to the previous intersection, erase your chalk mark, and try the next alternate tunnel. Backtracking systematically explores possibilities, immediately abandoning (pruning) paths that violate rules, and undoing state to try alternate candidates.",
      "metaphor": "Backtracking is trial-and-error state exploration: make a choice, recurse, and if it leads to failure, undo the choice (backtrack) and try the next candidate."
    },
    "problemSolved": {
      "title": "Pruning Unviable Search Spaces in Constraint Satisfaction",
      "description": "An N×N chessboard has N² cells. Choosing N cells out of N² leads to (N² choose N) configurations — for N = 8, that is over 4.4 billion possibilities! By enforcing one queen per row and pruning attacking columns and diagonals immediately, backtracking reduces the search space down to just 2,057 candidate nodes, solving the problem in milliseconds.",
      "keyPoints": [
        "Enforces 1 queen per row, reducing dimension from N² to N decision stages",
        "O(1) diagonal and column constraint checks prune entire invalid subtrees early",
        "Canonical template for Sudoku, Subset Sum, Graph Coloring, and TSP branch-and-bound"
      ]
    },
    "intuition": {
      "overview": "Place queens row-by-row from row 0 to N-1. For row r, try placing a queen in column c. If (r, c) is under attack from any existing queen, skip it. If safe, place queen, update constraint sets, recurse on row r + 1, and backtrack afterward.",
      "steps": [
        {
          "step": 1,
          "title": "Row-by-Row Progression",
          "description": "Place exactly one queen per row. When we successfully reach row N, all N queens are placed safely, giving a valid solution."
        },
        {
          "step": 2,
          "title": "Column Constraint",
          "description": "Track occupied columns in a set: cols.add(c)."
        },
        {
          "step": 3,
          "title": "Positive Diagonal (/) Constraint",
          "description": "All cells along a bottom-left to top-right diagonal share the same sum: r + c = constant."
        },
        {
          "step": 4,
          "title": "Negative Diagonal (\\) Constraint",
          "description": "All cells along a top-left to bottom-right diagonal share the same difference: r - c = constant."
        },
        {
          "step": 5,
          "title": "Backtracking Cleanup",
          "description": "After the recursive call returns, remove c from cols, (r+c) from pos_diag, and (r-c) from neg_diag so other paths can explore."
        }
      ]
    },
    "formalDefinition": {
      "text": "Place N queens on an N×N board such that for all distinct queen pairs (r_1, c_1) and (r_2, c_2): r_1 != r_2, c_1 != c_2, and |r_1 - r_2| != |c_1 - c_2|.",
      "latex": "c_1 \\neq c_2 \\quad \\land \\quad r_1 + c_1 \\neq r_2 + c_2 \\quad \\land \\quad r_1 - c_1 \\neq r_2 - c_2"
    },
    "complexity": {
      "overview": "In row 0 there are N choices, row 1 at most N-2 choices, row 2 at most N-4 choices, giving an upper bound of O(N!). Space is O(N) for board and constraint sets.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1) for N=1",
          "space": "O(N)",
          "explanation": "N=1 has 1 solution instantly; N=2 and N=3 have 0 solutions."
        },
        {
          "case": "Average",
          "time": "O(N!)",
          "space": "O(N)",
          "explanation": "Aggressive pruning avoids exploring vast majority of non-viable branches."
        },
        {
          "case": "Worst",
          "time": "O(N!)",
          "space": "O(N)",
          "explanation": "Explores all valid permutations of row-column placements."
        }
      ],
      "spaceNote": "Auxiliary memory is O(N) for recursion call stack depth and constraint sets (cols, pos_diag, neg_diag)."
    },
    "workedExample": {
      "title": "Solving 4-Queens Problem",
      "input": "N = 4",
      "steps": [
        {
          "step": 1,
          "action": "Row 0",
          "state": "Place Q at (0, 0)",
          "explanation": "Col 0, pos_diag 0, neg_diag 0 occupied."
        },
        {
          "step": 2,
          "action": "Row 1",
          "state": "Cols 0, 1 blocked. Try (1, 2) -> pos_diag 3, neg_diag -1",
          "explanation": "Q placed at (1, 2)."
        },
        {
          "step": 3,
          "action": "Row 2",
          "state": "All columns 0, 1, 2, 3 under attack! DEAD END.",
          "explanation": "Backtrack to Row 1. Try next column in Row 1: (1, 3)."
        },
        {
          "step": 4,
          "action": "Continue Backtracking",
          "state": "Row 0 moves to (0, 1). Row 1 takes (1, 3). Row 2 takes (2, 0). Row 3 takes (3, 2).",
          "explanation": "All 4 queens placed with zero conflicts! Solution found."
        }
      ],
      "finalOutput": "Solution 1: [\".Q..\", \"...Q\", \"Q...\", \"..Q.\"]"
    },
    "visualExplanation": {
      "title": "State-Space Recursion Tree with Pruned Dead-Ends",
      "description": "The visualizer renders the recursion tree: green branches lead to valid board configurations, while red pruned leaves illustrate attacks detected early.",
      "features": [
        "Dynamic chessboard showing placed queens and red attack projection lines.",
        "Call stack tree displaying current decision path [r0_c1 -> r1_c3 -> ...].",
        "Backtracking step animations demonstrating choice undoing."
      ]
    },
    "pseudocode": {
      "title": "Backtracking N-Queens with O(1) Constraint Sets",
      "code": "function solveNQueens(N):\n    cols = set(), pos_diag = set(), neg_diag = set()\n    board = array of '.' of size N x N\n    results = []\n\n    function backtrack(r):\n        if r == N:\n            results.append(copy_board(board))\n            return\n            \n        for c from 0 to N-1:\n            if c in cols or (r+c) in pos_diag or (r-c) in neg_diag:\n                continue // Prune branch!\n                \n            // 1. Choose\n            cols.add(c); pos_diag.add(r+c); neg_diag.add(r-c)\n            board[r][c] = 'Q'\n            \n            // 2. Recurse\n            backtrack(r + 1)\n            \n            // 3. Backtrack (Undo)\n            cols.remove(c); pos_diag.remove(r+c); neg_diag.remove(r-c)\n            board[r][c] = '.'\n\n    backtrack(0)\n    return results"
    },
    "pythonCode": {
      "title": "Complete N-Queens Solver in Python",
      "code": "def solve_n_queens(n: int) -> list[list[str]]:\n    \"\"\"Returns all distinct board configurations for N-Queens in O(N!) time.\"\"\"\n    cols = set()\n    pos_diag = set()  # (r + c)\n    neg_diag = set()  # (r - c)\n\n    board = [[\".\"] * n for _ in range(n)]\n    solutions = []\n\n    def backtrack(r: int):\n        if r == n:\n            solutions.append([\"\".join(row) for row in board])\n            return\n\n        for c in range(n):\n            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:\n                continue  # Under attack, prune!\n\n            # Place queen\n            cols.add(c)\n            pos_diag.add(r + c)\n            neg_diag.add(r - c)\n            board[r][c] = \"Q\"\n\n            # Recurse next row\n            backtrack(r + 1)\n\n            # Backtrack state\n            cols.remove(c)\n            pos_diag.remove(r + c)\n            neg_diag.remove(r - c)\n            board[r][c] = \".\"\n\n    backtrack(0)\n    return solutions",
      "explanation": "Using sets for cols, pos_diag, and neg_diag allows testing if a cell is under attack in O(1) time without scanning the board matrix."
    },
    "runnableCode": {
      "code": "def total_n_queens(n):\n    cols, pos_diag, neg_diag = set(), set(), set()\n    count = 0\n    \n    def backtrack(r):\n        nonlocal count\n        if r == n:\n            count += 1\n            return\n        for c in range(n):\n            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:\n                continue\n            cols.add(c); pos_diag.add(r + c); neg_diag.add(r - c)\n            backtrack(r + 1)\n            cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c)\n            \n    backtrack(0)\n    return count\n\nfor n in range(1, 9):\n    print(f\"N = {n}: {total_n_queens(n)} distinct valid solutions\")",
      "expectedOutput": "N = 1: 1 distinct valid solutions\nN = 2: 0 distinct valid solutions\nN = 3: 0 distinct valid solutions\nN = 4: 2 distinct valid solutions\nN = 5: 10 distinct valid solutions\nN = 6: 4 distinct valid solutions\nN = 7: 40 distinct valid solutions\nN = 8: 92 distinct valid solutions"
    },
    "lineByLineExplanation": [
      {
        "line": "1-4",
        "lines": "1-4",
        "code": "cols = set(); pos_diag = set(); neg_diag = set()",
        "codeSnippet": "cols = set(); pos_diag = set(); neg_diag = set()",
        "explanation": "Three hash sets providing O(1) constraint checking for vertical columns and both diagonal orientations."
      },
      {
        "line": "9-12",
        "lines": "9-12",
        "code": "if c in cols or (r + c) in pos_diag or (r - c) in neg_diag: continue",
        "codeSnippet": "if c in cols or (r + c) in pos_diag or (r - c) in neg_diag: continue",
        "explanation": "The pruning check: if the queen would conflict on column or diagonal, the branch is abandoned immediately."
      },
      {
        "line": "20-24",
        "lines": "20-24",
        "code": "cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c); board[r][c] = \".\"",
        "codeSnippet": "cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c); board[r][c] = \".\"",
        "explanation": "The backtracking step: cleans up the sets and board so sibling branches can evaluate column c independently."
      }
    ],
    "edgeCases": [
      {
        "case": "N = 1",
        "handling": "Trivially 1 solution: [[\"Q\"]].",
        "example": "total_n_queens(1) -> 1"
      },
      {
        "case": "N = 2 and N = 3",
        "handling": "Mathematically impossible to place queens without conflict; returns 0 solutions.",
        "example": "total_n_queens(2) -> 0; total_n_queens(3) -> 0"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to undo set additions on backtrack",
        "solution": "If you add to cols before recursion, you MUST remove from cols immediately after recursion returns; otherwise, subsequent columns are falsely considered blocked."
      },
      {
        "mistake": "Scanning the entire board to check diagonal safety",
        "solution": "Scanning the board takes O(N) time per check. Using sets for (r + c) and (r - c) takes O(1) time."
      }
    ],
    "applications": [
      {
        "industry": "VLSI Circuit Design",
        "application": "FPGA Chip Routing",
        "benefit": "Placing logic units and bus routes such that no two signal traces cross or create capacitive interference."
      },
      {
        "industry": "Logistics",
        "application": "Vehicle Scheduling with Conflict Constraints",
        "benefit": "Assigning delivery routes to fleet vehicles without spatial overlapping or driver overtime."
      },
      {
        "industry": "Game Engines",
        "application": "Sudoku & Nonogram Solvers",
        "benefit": "Constraint propagation engines solve combinatorial puzzle grids via backtracking search."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-nq-q1",
        "question": "Why does the positive diagonal have the mathematical invariant r + c = constant?",
        "hint": "Look at the coordinates when you move down-left: row increases by 1, column decreases by 1.",
        "answer": "When moving down-left along a positive diagonal (/), row increases by +1 and col decreases by -1. The sum r + c remains unchanged: (r + 1) + (c - 1) = r + c. Therefore, every cell on that diagonal has the identical sum value."
      },
      {
        "id": "dsa-nq-q2",
        "question": "Why do we not need a row constraint set for N-Queens?",
        "hint": "How is the backtracking recursion parameterized?",
        "answer": "Because the recursive function advances row-by-row (backtrack(r + 1)), placing at most ONE queen in each row by design. Two queens can never be placed in the same row, making an explicit row constraint set redundant."
      },
      {
        "id": "dsa-nq-q3",
        "question": "How many total solutions exist for the classic 8-Queens problem?",
        "hint": "Famous chess puzzle number.",
        "answer": "There are exactly 92 distinct solutions for the 8-Queens problem (or 12 fundamental solutions when accounting for rotational and reflective symmetries)."
      }
    ],
    "quiz": [
      {
        "id": "dsa-nq-quiz-1",
        "question": "What is the time complexity of the N-Queens backtracking algorithm?",
        "options": [
          "O(N)",
          "O(N²)",
          "O(N!)",
          "O(2^N)"
        ],
        "correctIndex": 2,
        "explanation": "At each row r, the number of available columns shrinks, resulting in at most N * (N - 2) * (N - 4) ... = O(N!) upper bound."
      },
      {
        "id": "dsa-nq-quiz-2",
        "question": "What invariant identifies all cells along a top-left to bottom-right diagonal (\\)?",
        "options": [
          "r + c is constant",
          "r - c is constant",
          "r * c is constant",
          "r == c"
        ],
        "correctIndex": 1,
        "explanation": "Moving down-right increments both row and column by +1, keeping (r - c) constant."
      },
      {
        "id": "dsa-nq-quiz-3",
        "question": "For which of the following values of N does the N-Queens problem have ZERO solutions?",
        "options": [
          "N = 1",
          "N = 2",
          "N = 4",
          "N = 5"
        ],
        "correctIndex": 1,
        "explanation": "For N = 2 and N = 3, no safe placement of queens is possible on the board."
      }
    ],
    "codingChallenge": {
      "title": "N-Queens II - Count Distinct Solutions (LeetCode 52)",
      "problem": "Given an integer n, return the number of distinct solutions to the n-queens puzzle.",
      "hints": [
        "Use sets for cols, pos_diag (r + c), and neg_diag (r - c).",
        "Use a nonlocal count variable incremented whenever r == n.",
        "Remember to remove items from the sets upon backtracking."
      ],
      "starterCode": "def total_n_queens(n: int) -> int:\n    # Your backtracking code here\n    return 0\n\n# Test cases:\nprint(total_n_queens(4))  # Expected: 2\nprint(total_n_queens(1))  # Expected: 1\nprint(total_n_queens(8))  # Expected: 92",
      "solution": "def total_n_queens(n: int) -> int:\n    cols = set()\n    pos_diag = set()\n    neg_diag = set()\n    count = 0\n    \n    def backtrack(r):\n        nonlocal count\n        if r == n:\n            count += 1\n            return\n            \n        for c in range(n):\n            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:\n                continue\n                \n            cols.add(c)\n            pos_diag.add(r + c)\n            neg_diag.add(r - c)\n            \n            backtrack(r + 1)\n            \n            cols.remove(c)\n            pos_diag.remove(r + c)\n            neg_diag.remove(r - c)\n            \n    backtrack(0)\n    return count\n\n# Test cases:\nprint(total_n_queens(4))  # 2\nprint(total_n_queens(1))  # 1\nprint(total_n_queens(8))  # 92"
    },
    "summary": {
      "keyTakeaways": [
        "Backtracking explores state-space trees and prunes dead ends early.",
        "Diagonal math (r + c) and (r - c) enables O(1) attack detection.",
        "Placing one queen per row eliminates 2D coordinate search overhead.",
        "Always clean up state (undo choice) upon returning from recursive calls."
      ],
      "nextLessonId": "dsa-backtracking-sudoku",
      "nextLessonTitle": "Sudoku Solver",
      "nextLessonModuleId": "dsa-module-6"
    },
    "lineByLine": [
      {
        "line": "1-4",
        "lines": "1-4",
        "code": "cols = set(); pos_diag = set(); neg_diag = set()",
        "codeSnippet": "cols = set(); pos_diag = set(); neg_diag = set()",
        "explanation": "Three hash sets providing O(1) constraint checking for vertical columns and both diagonal orientations."
      },
      {
        "line": "9-12",
        "lines": "9-12",
        "code": "if c in cols or (r + c) in pos_diag or (r - c) in neg_diag: continue",
        "codeSnippet": "if c in cols or (r + c) in pos_diag or (r - c) in neg_diag: continue",
        "explanation": "The pruning check: if the queen would conflict on column or diagonal, the branch is abandoned immediately."
      },
      {
        "line": "20-24",
        "lines": "20-24",
        "code": "cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c); board[r][c] = \".\"",
        "codeSnippet": "cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c); board[r][c] = \".\"",
        "explanation": "The backtracking step: cleans up the sets and board so sibling branches can evaluate column c independently."
      }
    ]
  },
  "dsa-recursion-trees-calls": {
    "id": "dsa-recursion-trees-calls",
    "moduleId": "dsa-module-6",
    "title": "Recursion Trees and Call Stacks",
    "subtitle": "Visualizing Call Frames, Activation Records, and Branching Topologies",
    "order": 1,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "recursion-tree",
    "objectives": [
      "Deconstruct how operating systems manage activation frames on the call stack.",
      "Formulate recursion trees to model recursive branching and subproblem relationships.",
      "Derive space complexity by measuring the maximum depth of the call stack.",
      "Prevent stack overflow errors by guaranteeing base cases and progress steps."
    ],
    "prerequisites": [
      "DSA Foundations: Recursion and Recurrence Relations"
    ],
    "analogy": {
      "title": "The Detective Delegating Clues",
      "text": "A master detective investigating a case sends junior detectives to investigate smaller sub-leads. Each junior detective waits for their subordinates to report back before assembling the final report for the master detective. The office whiteboard showing who reports to whom is the recursion tree; the stack of active case files on the desk is the call stack.",
      "metaphor": "The recursion tree represents all subproblems; the call stack holds the active path from root to leaf."
    },
    "problemSolved": {
      "title": "Predicting Recursive Memory Consumption and Time Complexity",
      "description": "Recursion can seem mysterious without an explicit mental model. Recursion trees visualize total operations by summing node costs at each level, while the call stack explains memory usage as the tree height.",
      "keyPoints": [
        "Call stack depth = maximum recursion tree height.",
        "Space complexity is determined by max depth O(h), not total nodes O(N).",
        "Essential for analyzing divide-and-conquer and backtracking algorithms."
      ]
    },
    "intuition": {
      "overview": "Every function call creates an activation frame containing parameters, local variables, and the return address. When a function calls itself, a new frame is pushed. When it returns, its frame is popped.",
      "steps": [
        {
          "step": 1,
          "title": "Call Frame Push",
          "description": "Invoke func(n-1): OS allocates frame on call stack."
        },
        {
          "step": 2,
          "title": "Base Case Return",
          "description": "When base case is reached, frame evaluates and returns value without further calls."
        },
        {
          "step": 3,
          "title": "Unwinding the Stack",
          "description": "Parent frame receives child return value, computes its own result, and pops."
        }
      ]
    },
    "formalDefinition": {
      "text": "A recursion tree T = (V, E) for recursive recurrence T(n) = a T(n/b) + f(n) is a tree where the root has cost f(n), has a children each of size n/b, with total work W = \\sum_{i=0}^{\\log_b n} a^i f(n/b^i).",
      "latex": "\\text{Max Stack Depth} = h = \\mathcal{O}(\\log_b n) \\implies \\text{Auxiliary Space} = \\mathcal{O}(h)"
    },
    "complexity": {
      "overview": "Fibonacci recursion: Time O(2^n), Space O(n) call stack depth.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Linear single-branch recursion (factorial)."
        },
        {
          "case": "Average",
          "time": "O(2^n)",
          "space": "O(n)",
          "explanation": "Binary recursion without memoization."
        },
        {
          "case": "Worst",
          "time": "O(2^n)",
          "space": "O(n)",
          "explanation": "Full binary recursion tree of depth n."
        }
      ],
      "spaceNote": "Maximum call stack depth determines space complexity."
    },
    "workedExample": {
      "title": "Call Stack Trace for Factorial(3)",
      "input": "fact(3)",
      "steps": [
        {
          "step": 1,
          "action": "fact(3) invoked",
          "state": "Call Stack: [fact(3)]",
          "explanation": "Needs fact(2)."
        },
        {
          "step": 2,
          "action": "fact(2) invoked",
          "state": "Call Stack: [fact(3), fact(2)]",
          "explanation": "Needs fact(1)."
        },
        {
          "step": 3,
          "action": "fact(1) invoked",
          "state": "Call Stack: [fact(3), fact(2), fact(1)]",
          "explanation": "Base case! Returns 1."
        },
        {
          "step": 4,
          "action": "fact(2) returns 2 * 1 = 2",
          "state": "Call Stack: [fact(3)]",
          "explanation": "fact(1) popped."
        },
        {
          "step": 5,
          "action": "fact(3) returns 3 * 2 = 6",
          "state": "Call Stack: []",
          "explanation": "fact(2) popped, final answer 6 returned."
        }
      ],
      "finalOutput": "Output: 6"
    },
    "visualExplanation": {
      "title": "Call Stack vs Recursion Tree",
      "description": "Tree shows all calls ever made; stack shows active path from root to current node.",
      "features": [
        "Tree width reflects branching factor",
        "Tree height reflects stack depth limit"
      ]
    },
    "pseudocode": {
      "title": "Recursive Tree Traversal",
      "code": "function fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)"
    },
    "pythonCode": {
      "title": "Traced Recursion Example",
      "code": "def fib_traced(n: int, depth: int = 0) -> int:\n    indent = \"  \" * depth\n    print(f\"{indent}fib({n}) called\")\n    if n <= 1:\n        print(f\"{indent}fib({n}) returns {n}\")\n        return n\n    res = fib_traced(n - 1, depth + 1) + fib_traced(n - 2, depth + 1)\n    print(f\"{indent}fib({n}) returns {res}\")\n    return res",
      "explanation": "Prints indentation matching call stack depth to visualize the call tree."
    },
    "runnableCode": {
      "code": "fib_traced(3)",
      "expectedOutput": "fib(3) called\n  fib(2) called\n    fib(1) called\n    fib(1) returns 1\n    fib(0) called\n    fib(0) returns 0\n  fib(2) returns 1\n  fib(1) called\n  fib(1) returns 1\nfib(3) returns 2"
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "if n <= 1: return n",
        "codeSnippet": "if n <= 1: return n",
        "explanation": "Base case: terminates recursion, preventing infinite call stack expansion."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "res = fib(n - 1) + fib(n - 2)",
        "codeSnippet": "res = fib(n - 1) + fib(n - 2)",
        "explanation": "Binary branching: creates two child subproblems at each internal node."
      }
    ],
    "edgeCases": [
      {
        "case": "Missing base case",
        "handling": "Raises RecursionError: maximum recursion depth exceeded in Python.",
        "example": "def f(x): return f(x-1)"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming space complexity is proportional to number of nodes in tree",
        "solution": "Only one branch is active at any time; maximum stack memory is proportional to the tree height.",
        "codeExample": "# Tree nodes: 2^n, but Stack space: O(n)"
      }
    ],
    "applications": [
      {
        "industry": "Software Engineering",
        "application": "Deep file system directory traversal",
        "benefit": "Recursive tree navigation."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-rt-1",
        "question": "What is the default recursion depth limit in CPython?",
        "hint": "Check sys.getrecursionlimit().",
        "answer": "Typically 1,000 call frames."
      }
    ],
    "quiz": [
      {
        "id": "q-rt-1",
        "question": "What determines the maximum auxiliary space used by a recursive algorithm?",
        "options": [
          "The maximum height of the recursion tree",
          "The total number of nodes in the recursion tree",
          "The number of base cases",
          "The CPU cache size"
        ],
        "correctIndex": 0,
        "explanation": "The call stack holds frames along the path from the root to the currently active leaf, which equals the tree height."
      }
    ],
    "codingChallenge": {
      "title": "Calculate Recursion Tree Maximum Depth",
      "problem": "Write a recursive function that returns the height of the call tree for computing the nth power of x using divide-and-conquer (x^(n/2))^2.",
      "hints": [
        "Divide n by 2 at each recursive step."
      ],
      "starterCode": "def my_pow(x: float, n: int) -> float:\n    # TODO: Implement O(log n) recursive power\n    pass",
      "solution": "def my_pow(x: float, n: int) -> float:\n    if n < 0:\n        x = 1 / x\n        n = -n\n    def helper(base, exp):\n        if exp == 0:\n            return 1.0\n        half = helper(base, exp // 2)\n        if exp % 2 == 0:\n            return half * half\n        return half * half * base\n    return helper(x, n)"
    },
    "summary": {
      "keyTakeaways": [
        "Recursion trees map subproblem topology; call stacks record active branch path.",
        "Space complexity = O(maximum tree depth)."
      ],
      "nextLessonId": "dsa-recursion-subsets",
      "nextLessonTitle": "Subsets and Subsequences",
      "nextLessonModuleId": "dsa-module-6"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "if n <= 1: return n",
        "codeSnippet": "if n <= 1: return n",
        "explanation": "Base case: terminates recursion, preventing infinite call stack expansion."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "res = fib(n - 1) + fib(n - 2)",
        "codeSnippet": "res = fib(n - 1) + fib(n - 2)",
        "explanation": "Binary branching: creates two child subproblems at each internal node."
      }
    ]
  },
  "dsa-recursion-subsets": {
    "id": "dsa-recursion-subsets",
    "moduleId": "dsa-module-6",
    "title": "Subsets and Subsequences",
    "subtitle": "The Include/Exclude Backtracking Paradigm and Power Sets",
    "order": 2,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "recursion-tree",
    "objectives": [
      "Generate the power set of n elements containing 2^n subsets.",
      "Implement the fundamental include/exclude binary decision tree.",
      "Distinguish between contiguous subarrays, subsequences, and subsets.",
      "Avoid duplicate subsets using sorting and frequency skipping."
    ],
    "prerequisites": [
      "Recursion Trees and Call Stacks"
    ],
    "analogy": {
      "title": "Packing a Backpack for a Hike",
      "text": "You have a list of n items. For each item (flashlight, water bottle, compass), you make a binary choice: either pack it into your backpack or leave it behind. After making n choices, your backpack contains one valid subset.",
      "metaphor": "Each item generates 2 branches: include or exclude."
    },
    "problemSolved": {
      "title": "Generating Combinatorial Power Sets Systematically",
      "description": "Subsets form the foundation of combinatorial search. The include/exclude recursive paradigm visits all 2^n possible combinations systematically without omitting any valid states.",
      "keyPoints": [
        "Generates exactly 2^n subsets.",
        "Backtracking template: choose -> explore -> unchoose.",
        "Forms base structure for 0/1 Knapsack search."
      ]
    },
    "intuition": {
      "overview": "At index i, make two recursive calls: one including nums[i] in the current subset, and one excluding it. When index reaches n, add a copy of the current subset to results.",
      "steps": [
        {
          "step": 1,
          "title": "Base Case Check",
          "description": "If index == len(nums), append copy of current path to result list."
        },
        {
          "step": 2,
          "title": "Include Branch",
          "description": "path.append(nums[i]); backtrack(i + 1, path); path.pop()."
        },
        {
          "step": 3,
          "title": "Exclude Branch",
          "description": "backtrack(i + 1, path)."
        }
      ]
    },
    "formalDefinition": {
      "text": "The power set \\mathcal{P}(S) of a set S with |S| = n has cardinality |\\mathcal{P}(S)| = 2^n. Every subset corresponds to an n-bit binary string indicating inclusion or exclusion.",
      "latex": "|\\mathcal{P}(S)| = \\sum_{k=0}^n \\binom{n}{k} = 2^n"
    },
    "complexity": {
      "overview": "Time: O(n \\cdot 2^n) because there are 2^n subsets and copying each takes O(n). Space: O(n) stack depth.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n 2^n)",
          "space": "O(n)",
          "explanation": "Always generates 2^n subsets."
        },
        {
          "case": "Average",
          "time": "O(n 2^n)",
          "space": "O(n)",
          "explanation": "Complete binary tree of height n."
        },
        {
          "case": "Worst",
          "time": "O(n 2^n)",
          "space": "O(n)",
          "explanation": "Exhaustive combinatorial exploration."
        }
      ],
      "spaceNote": "O(n) auxiliary call stack space (excluding output array)."
    },
    "workedExample": {
      "title": "Subsets of [1, 2]",
      "input": "nums = [1, 2]",
      "steps": [
        {
          "step": 1,
          "action": "Root (i=0, path=[])",
          "state": "Branch: include 1 or exclude 1",
          "explanation": "Decision for element 1."
        },
        {
          "step": 2,
          "action": "Include 1 (path=[1])",
          "state": "Branch: include 2 or exclude 2",
          "explanation": "Decision for element 2."
        },
        {
          "step": 3,
          "action": "Include 2",
          "state": "path=[1, 2] -> append to output",
          "explanation": "Leaf reached."
        },
        {
          "step": 4,
          "action": "Exclude 2",
          "state": "path=[1] -> append to output",
          "explanation": "Leaf reached."
        },
        {
          "step": 5,
          "action": "Backtrack to root, exclude 1",
          "state": "path=[]",
          "explanation": "Explore exclude branch for 1."
        },
        {
          "step": 6,
          "action": "Include 2 / Exclude 2",
          "state": "Yields [2] and []",
          "explanation": "Leaves reached."
        }
      ],
      "finalOutput": "[[], [1], [2], [1, 2]]"
    },
    "visualExplanation": {
      "title": "Binary Decision Tree",
      "description": "A complete binary tree of depth n with 2^n leaves representing all subsets.",
      "features": [
        "Left branch: Include element",
        "Right branch: Exclude element"
      ]
    },
    "pseudocode": {
      "title": "Power Set Backtracking",
      "code": "function subsets(nums):\n    result = []\n    function backtrack(start, path):\n        result.append(copy(path))\n        for i from start to len(nums) - 1:\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop() # backtrack\n    backtrack(0, [])\n    return result"
    },
    "pythonCode": {
      "title": "Python Subsets Implementation",
      "code": "def generate_subsets(nums: list[int]) -> list[list[int]]:\n    res = []\n    \n    def backtrack(start: int, path: list[int]):\n        res.append(list(path)) # append copy\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop() # undo choice\n            \n    backtrack(0, [])\n    return res",
      "explanation": "Appends copy of path at each node and explores subsequent elements."
    },
    "runnableCode": {
      "code": "print(generate_subsets([1, 2, 3]))",
      "expectedOutput": "[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]"
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "res.append(list(path))",
        "codeSnippet": "res.append(list(path))",
        "explanation": "Must create a shallow copy list(path); appending path directly would append a reference mutated by subsequent pops."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "path.pop()",
        "codeSnippet": "path.pop()",
        "explanation": "Backtracking step: removes the chosen element before the next loop iteration."
      }
    ],
    "edgeCases": [
      {
        "case": "Empty input array []",
        "handling": "Returns [[]] (the empty set is a valid subset).",
        "example": "nums = []"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Appending path instead of list(path)",
        "solution": "Always append a copy; otherwise all entries in res will end up empty [] after unwinding.",
        "codeExample": "res.append(path[:]) # correct"
      }
    ],
    "applications": [
      {
        "industry": "Machine Learning",
        "application": "Feature subset selection (wrapper methods)",
        "benefit": "Evaluates model accuracy across all candidate feature subsets."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-ss-1",
        "question": "How do you handle duplicates in nums to avoid duplicate subsets (Subsets II)?",
        "hint": "Sort nums first.",
        "answer": "Sort nums. In loop: if i > start and nums[i] == nums[i-1]: continue to skip duplicate branches."
      }
    ],
    "quiz": [
      {
        "id": "q-ss-1",
        "question": "How many subsets does a set of 5 elements have?",
        "options": [
          "32",
          "25",
          "10",
          "64"
        ],
        "correctIndex": 0,
        "explanation": "2^5 = 32 subsets."
      }
    ],
    "codingChallenge": {
      "title": "Subsets II (With Duplicates)",
      "problem": "Given an integer array nums that may contain duplicates, return all possible subsets without duplicates.",
      "hints": [
        "Sort the array first.",
        "Skip duplicates when i > start and nums[i] == nums[i-1]."
      ],
      "starterCode": "def subsets_with_dup(nums: list[int]) -> list[list[int]]:\n    # TODO: Implement duplicate-free subsets\n    pass",
      "solution": "def subsets_with_dup(nums: list[int]) -> list[list[int]]:\n    nums.sort()\n    res = []\n    def backtrack(start, path):\n        res.append(list(path))\n        for i in range(start, len(nums)):\n            if i > start and nums[i] == nums[i - 1]:\n                continue\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return res"
    },
    "summary": {
      "keyTakeaways": [
        "Subsets are built using the choose-explore-unchoose backtracking pattern.",
        "Sorting allows O(1) duplicate branch pruning."
      ],
      "nextLessonId": "dsa-recursion-permutations",
      "nextLessonTitle": "Permutations and Combinations",
      "nextLessonModuleId": "dsa-module-6"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "res.append(list(path))",
        "codeSnippet": "res.append(list(path))",
        "explanation": "Must create a shallow copy list(path); appending path directly would append a reference mutated by subsequent pops."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "path.pop()",
        "codeSnippet": "path.pop()",
        "explanation": "Backtracking step: removes the chosen element before the next loop iteration."
      }
    ]
  },
  "dsa-recursion-permutations": {
    "id": "dsa-recursion-permutations",
    "moduleId": "dsa-module-6",
    "title": "Permutations and Combinations",
    "subtitle": "Factorial Search Spaces, Visited Tracking, and Swapping Techniques",
    "order": 3,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "recursion-tree",
    "objectives": [
      "Generate all n! permutations using recursive backtracking.",
      "Track chosen elements using boolean visited arrays or in-place swapping.",
      "Differentiate permutations (order matters) from combinations (order irrelevant).",
      "Calculate time complexity of factorial search trees."
    ],
    "prerequisites": [
      "Subsets and Subsequences"
    ],
    "analogy": {
      "title": "Arranging Books on a Shelf",
      "text": "You have 3 distinct books. For the first spot, you have 3 choices. For the second spot, you have 2 remaining choices. For the final spot, you have 1 choice. Total distinct arrangements: 3 * 2 * 1 = 6.",
      "metaphor": "Order matters: [1, 2] and [2, 1] are distinct permutations."
    },
    "problemSolved": {
      "title": "Systematic Ordering and Exhaustive Arrangement Exploration",
      "description": "Permutations arise in routing problems (Traveling Salesperson), cryptographic cracking, and scheduling. Backtracking explores all n! arrangements without duplicate visits.",
      "keyPoints": [
        "Generates exactly n! distinct permutations.",
        "In-place swapping avoids auxiliary visited array memory.",
        "Foundation for constraint satisfaction problems."
      ]
    },
    "intuition": {
      "overview": "At depth d, choose an unused element to place at position d. Mark it used, recurse to d+1, and unmark it upon return.",
      "steps": [
        {
          "step": 1,
          "title": "Leaf Detection",
          "description": "If len(path) == len(nums), add copy of path to output."
        },
        {
          "step": 2,
          "title": "Explore Unused Elements",
          "description": "Iterate over all elements. If element is not visited, mark visited, append to path, recurse, and unmark."
        }
      ]
    },
    "formalDefinition": {
      "text": "The number of permutations of n distinct elements is n! = \\prod_{i=1}^n i. For combinations of n choose k, the count is C(n, k) = \\frac{n!}{k!(n-k)!}.",
      "latex": "P(n, n) = n!, \\quad C(n, k) = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
    },
    "complexity": {
      "overview": "Time: O(n \\cdot n!) because there are n! permutations and building each takes O(n). Space: O(n) stack.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n n!)",
          "space": "O(n)",
          "explanation": "Exhaustive generation."
        },
        {
          "case": "Average",
          "time": "O(n n!)",
          "space": "O(n)",
          "explanation": "Branching factor n, n-1, ..., 1."
        },
        {
          "case": "Worst",
          "time": "O(n n!)",
          "space": "O(n)",
          "explanation": "Full factorial exploration."
        }
      ],
      "spaceNote": "O(n) auxiliary memory for call stack and visited array."
    },
    "workedExample": {
      "title": "Permutations of [1, 2, 3]",
      "input": "nums = [1, 2, 3]",
      "steps": [
        {
          "step": 1,
          "action": "First element = 1",
          "state": "path=[1]",
          "explanation": "Remaining: {2, 3}."
        },
        {
          "step": 2,
          "action": "Second element = 2",
          "state": "path=[1, 2]",
          "explanation": "Remaining: {3}."
        },
        {
          "step": 3,
          "action": "Third element = 3",
          "state": "path=[1, 2, 3] -> added",
          "explanation": "Full permutation created."
        },
        {
          "step": 4,
          "action": "Backtrack and pick 3",
          "state": "path=[1, 3, 2] -> added",
          "explanation": "Second permutation with 1 first."
        }
      ],
      "finalOutput": "[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]"
    },
    "visualExplanation": {
      "title": "Factorial Tree Branching",
      "description": "Tree with root having n branches, each child having n-1 branches, tapering to 1 leaf.",
      "features": [
        "Level 0: n choices",
        "Level 1: n-1 choices",
        "Leaves: n! total outcomes"
      ]
    },
    "pseudocode": {
      "title": "Permutations Backtracking",
      "code": "function permute(nums):\n    result = []\n    used = boolean array of size len(nums)\n    function backtrack(path):\n        if len(path) == len(nums):\n            result.append(copy(path))\n            return\n        for i from 0 to len(nums) - 1:\n            if not used[i]:\n                used[i] = True\n                path.append(nums[i])\n                backtrack(path)\n                path.pop()\n                used[i] = False\n    backtrack([])\n    return result"
    },
    "pythonCode": {
      "title": "Python Permutations Implementation",
      "code": "def permute(nums: list[int]) -> list[list[int]]:\n    res = []\n    used = [False] * len(nums)\n    \n    def backtrack(path: list[int]):\n        if len(path) == len(nums):\n            res.append(list(path))\n            return\n        for i in range(len(nums)):\n            if not used[i]:\n                used[i] = True\n                path.append(nums[i])\n                backtrack(path)\n                path.pop()\n                used[i] = False\n                \n    backtrack([])\n    return res",
      "explanation": "Uses boolean used array to prevent reusing elements in the same permutation."
    },
    "runnableCode": {
      "code": "print(permute([1, 2, 3]))",
      "expectedOutput": "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]"
    },
    "lineByLineExplanation": [
      {
        "line": 10,
        "lines": "10",
        "code": "if not used[i]:",
        "codeSnippet": "if not used[i]:",
        "explanation": "Checks if candidate element has already been placed in the current permutation path."
      },
      {
        "line": 14,
        "lines": "14",
        "code": "used[i] = False",
        "codeSnippet": "used[i] = False",
        "explanation": "Backtracks visited flag so element can be chosen at a different position in future branches."
      }
    ],
    "edgeCases": [
      {
        "case": "Single element [1]",
        "handling": "Returns [[1]].",
        "example": "nums = [1]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to reset used[i] = False",
        "solution": "Always restore visited state in the backtrack step.",
        "codeExample": "used[i] = False"
      }
    ],
    "applications": [
      {
        "industry": "Logistics",
        "application": "Route planning and vehicle fleet dispatching",
        "benefit": "Exhaustive search on small route segments."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-perm-1",
        "question": "How can you generate permutations in O(1) extra space without a used array?",
        "hint": "Swap elements in place.",
        "answer": "Use in-place swapping: for i in range(start, n): swap(nums[start], nums[i]); backtrack(start+1); swap back."
      }
    ],
    "quiz": [
      {
        "id": "q-perm-1",
        "question": "How many permutations exist for an array of 4 unique elements?",
        "options": [
          "24",
          "16",
          "12",
          "4"
        ],
        "correctIndex": 0,
        "explanation": "4! = 4 * 3 * 2 * 1 = 24 permutations."
      }
    ],
    "codingChallenge": {
      "title": "Combinations (n choose k)",
      "problem": "Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].",
      "hints": [
        "Only choose numbers greater than the previous choice to enforce combination ordering."
      ],
      "starterCode": "def combine(n: int, k: int) -> list[list[int]]:\n    # TODO: Implement combinations\n    pass",
      "solution": "def combine(n: int, k: int) -> list[list[int]]:\n    res = []\n    def backtrack(start, path):\n        if len(path) == k:\n            res.append(list(path))\n            return\n        for i in range(start, n + 1):\n            path.append(i)\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(1, [])\n    return res"
    },
    "summary": {
      "keyTakeaways": [
        "Permutations explore n! orderings using visited tracking.",
        "Combinations enforce ascending choice indices to prevent duplicate orderings."
      ],
      "nextLessonId": "dsa-backtracking-sudoku",
      "nextLessonTitle": "Sudoku Solver",
      "nextLessonModuleId": "dsa-module-6"
    },
    "lineByLine": [
      {
        "line": 10,
        "lines": "10",
        "code": "if not used[i]:",
        "codeSnippet": "if not used[i]:",
        "explanation": "Checks if candidate element has already been placed in the current permutation path."
      },
      {
        "line": 14,
        "lines": "14",
        "code": "used[i] = False",
        "codeSnippet": "used[i] = False",
        "explanation": "Backtracks visited flag so element can be chosen at a different position in future branches."
      }
    ]
  },
  "dsa-backtracking-sudoku": {
    "id": "dsa-backtracking-sudoku",
    "moduleId": "dsa-module-6",
    "title": "Sudoku Solver",
    "subtitle": "Exact Cover, Constraint Propagation, and 2D Board Backtracking",
    "order": 5,
    "readTimeMinutes": 24,
    "difficulty": "Advanced",
    "visualizerType": "recursion-tree",
    "objectives": [
      "Model Sudoku as a constraint satisfaction problem (CSP).",
      "Implement isValid() row, column, and 3x3 box collision checks in O(1).",
      "Write a recursive backtracking solver that mutates the board in place.",
      "Optimize search order by targeting cells with the fewest candidate digits."
    ],
    "prerequisites": [
      "N-Queens Problem",
      "Permutations and Combinations"
    ],
    "analogy": {
      "title": "Filling Out an Unforgiving Crossword in Pencil",
      "text": "When solving a difficult puzzle, you write a number in pencil. If that choice leads to a contradiction three rows down where no valid digit can fit, you erase your pencil mark (backtrack) and try the next candidate digit.",
      "metaphor": "Place candidate digit -> if board solvable return True -> else undo and try next."
    },
    "problemSolved": {
      "title": "Solving Complex Constraint Satisfaction Problems",
      "description": "A 9x9 Sudoku board has up to 9^81 possible grid states. Backtracking prunes invalid branches immediately, reducing the search space to a tiny fraction of states solvable in milliseconds.",
      "keyPoints": [
        "In-place 2D grid mutation.",
        "Immediate contradiction pruning via isValid().",
        "Early termination as soon as a single valid solution is found."
      ]
    },
    "intuition": {
      "overview": "Find next empty cell '.'. Try digits '1' through '9'. If placing digit is valid, recurse. If recursive call succeeds, return True. If no digit works, reset cell to '.' and return False.",
      "steps": [
        {
          "step": 1,
          "title": "Find Empty Cell",
          "description": "Scan board for next cell with value '.'."
        },
        {
          "step": 2,
          "title": "Try Valid Digits",
          "description": "For digit from 1 to 9: if valid in row, col, and 3x3 box, place digit."
        },
        {
          "step": 3,
          "title": "Recurse & Backtrack",
          "description": "If solve() returns True, done! Else, board[r][c] = '.' and continue loop."
        }
      ]
    },
    "formalDefinition": {
      "text": "Sudoku is an exact cover problem over universe U of 324 constraints: 81 cell constraints, 81 row-number constraints, 81 col-number constraints, and 81 box-number constraints.",
      "latex": "\\forall r, c \\in [0, 8], \\quad B[r][c] \\in \\{1..9\\} \\land \\text{unique in } \\text{Row}(r), \\text{Col}(c), \\text{Box}(\\lfloor r/3 \\rfloor, \\lfloor c/3 \\rfloor)"
    },
    "complexity": {
      "overview": "Time: O(9^m) worst-case where m is the number of empty cells; practically solves in <10ms with pruning. Space: O(81) = O(1) stack depth.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Board already filled or near-complete."
        },
        {
          "case": "Average",
          "time": "O(9^m)",
          "space": "O(1)",
          "explanation": "Heavy pruning eliminates >99.9% of paths."
        },
        {
          "case": "Worst",
          "time": "O(9^81)",
          "space": "O(1)",
          "explanation": "Theoretical upper bound without heuristics."
        }
      ],
      "spaceNote": "O(81) maximum call stack depth on a 9x9 board."
    },
    "workedExample": {
      "title": "Placing a Digit in Cell (0, 2)",
      "input": "Empty cell at (0, 2)",
      "steps": [
        {
          "step": 1,
          "action": "Check digit \"1\"",
          "state": "Row 0 already has \"1\"",
          "explanation": "Invalid! Try next."
        },
        {
          "step": 2,
          "action": "Check digit \"2\"",
          "state": "Column 2 already has \"2\"",
          "explanation": "Invalid! Try next."
        },
        {
          "step": 3,
          "action": "Check digit \"3\"",
          "state": "Row, col, and 3x3 box free of \"3\"",
          "explanation": "Valid! Place \"3\" and recurse."
        }
      ],
      "finalOutput": "Board state successfully progresses."
    },
    "visualExplanation": {
      "title": "3x3 Box Sub-Grid Indexing",
      "description": "Mapping cell (r, c) to box index: box_row = 3 * (r // 3), box_col = 3 * (c // 3).",
      "features": [
        "Checks all 9 cells in the sub-box in O(1)",
        "Checks full row and column in O(1)"
      ]
    },
    "pseudocode": {
      "title": "Sudoku Solver Algorithm",
      "code": "function solveSudoku(board):\n    for r from 0 to 8:\n        for c from 0 to 8:\n            if board[r][c] == '.':\n                for digit in '1'..'9':\n                    if isValid(board, r, c, digit):\n                        board[r][c] = digit\n                        if solveSudoku(board): return True\n                        board[r][c] = '.' # backtrack\n                return False\n    return True"
    },
    "pythonCode": {
      "title": "Python Sudoku Solver",
      "code": "def solve_sudoku(board: list[list[str]]) -> bool:\n    def is_valid(r: int, c: int, ch: str) -> bool:\n        for i in range(9):\n            if board[r][i] == ch: return False\n            if board[i][c] == ch: return False\n            if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch: return False\n        return True\n\n    for r in range(9):\n        for c in range(9):\n            if board[r][c] == '.':\n                for num in map(str, range(1, 10)):\n                    if is_valid(r, c, num):\n                        board[r][c] = num\n                        if solve_sudoku(board):\n                            return True\n                        board[r][c] = '.'\n                return False\n    return True",
      "explanation": "Recursive backtracking checking row, column, and 3x3 box invariants."
    },
    "runnableCode": {
      "code": "board = [\n  [\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],\n  [\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],\n  [\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],\n  [\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],\n  [\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],\n  [\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],\n  [\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],\n  [\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],\n  [\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]\n]\nsolve_sudoku(board)\nprint(\"\".join(board[0]))",
      "expectedOutput": "534678912"
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch: return False",
        "codeSnippet": "if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch: return False",
        "explanation": "Checks the 9 cells of the enclosing 3x3 sub-grid in a single loop."
      },
      {
        "line": 17,
        "lines": "17",
        "code": "board[r][c] = \".\"",
        "codeSnippet": "board[r][c] = \".\"",
        "explanation": "Backtracking undo step: clears cell so other combinations can be tried."
      }
    ],
    "edgeCases": [
      {
        "case": "Unsolvable board configuration",
        "handling": "Returns False without corrupting initial entries.",
        "example": "Two identical numbers in same row."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Incorrect 3x3 box origin calculation",
        "solution": "Origin is 3 * (r // 3) and 3 * (c // 3).",
        "codeExample": "start_row = (r // 3) * 3"
      }
    ],
    "applications": [
      {
        "industry": "Operations Research",
        "application": "Timetabling and university exam scheduling",
        "benefit": "Solves hard constraint matching without conflicts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-sudoku-1",
        "question": "How can you speed up Sudoku solving using constraint propagation?",
        "hint": "Look at Naked Singles and Dancing Links (Algorithm X).",
        "answer": "Use Donald Knuth's Dancing Links (DLX) algorithm or maintain bitmasks for rows, columns, and boxes."
      }
    ],
    "quiz": [
      {
        "id": "q-sudoku-1",
        "question": "How many total constraints are there in a standard 9x9 Sudoku grid?",
        "options": [
          "324",
          "81",
          "729",
          "243"
        ],
        "correctIndex": 0,
        "explanation": "4 types of constraints * 81 = 324 exact cover constraints."
      }
    ],
    "codingChallenge": {
      "title": "Valid Sudoku (Board Validator)",
      "problem": "Determine if a 9x9 Sudoku board is valid according to Sudoku rules. Only filled cells need validation.",
      "hints": [
        "Use sets to track seen numbers for each row, column, and box."
      ],
      "starterCode": "def is_valid_sudoku(board: list[list[str]]) -> bool:\n    # TODO: Validate board\n    pass",
      "solution": "def is_valid_sudoku(board: list[list[str]]) -> bool:\n    rows = [set() for _ in range(9)]\n    cols = [set() for _ in range(9)]\n    boxes = [set() for _ in range(9)]\n    for r in range(9):\n        for c in range(9):\n            val = board[r][c]\n            if val == '.': continue\n            b = (r // 3) * 3 + (c // 3)\n            if val in rows[r] or val in cols[c] or val in boxes[b]:\n                return False\n            rows[r].add(val)\n            cols[c].add(val)\n            boxes[b].add(val)\n    return True"
    },
    "summary": {
      "keyTakeaways": [
        "Sudoku illustrates 2D board backtracking with multi-constraint validation.",
        "Return boolean to stop searching upon first valid completion."
      ],
      "nextLessonId": "dsa-backtracking-maze",
      "nextLessonTitle": "Maze and Path Problems",
      "nextLessonModuleId": "dsa-module-6"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch: return False",
        "codeSnippet": "if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch: return False",
        "explanation": "Checks the 9 cells of the enclosing 3x3 sub-grid in a single loop."
      },
      {
        "line": 17,
        "lines": "17",
        "code": "board[r][c] = \".\"",
        "codeSnippet": "board[r][c] = \".\"",
        "explanation": "Backtracking undo step: clears cell so other combinations can be tried."
      }
    ]
  },
  "dsa-backtracking-maze": {
    "id": "dsa-backtracking-maze",
    "moduleId": "dsa-module-6",
    "title": "Maze and Path Problems",
    "subtitle": "Grid Exploration, Cycle Avoidance, and Path Finding Backtracking",
    "order": 6,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "graph",
    "objectives": [
      "Navigate 2D grid mazes using directional vectors (dx, dy).",
      "Prevent infinite cycles by temporarily marking visited cells.",
      "Differentiate between finding ANY path vs ALL paths vs SHORTEST path.",
      "Implement the Rat in a Maze and Word Search algorithms."
    ],
    "prerequisites": [
      "Sudoku Solver",
      "Recursion Trees and Call Stacks"
    ],
    "analogy": {
      "title": "Leaving Breadcrumbs in the Labyrinth",
      "text": "Theseus enters the labyrinth with a ball of thread. As he steps into each corridor, he unrolls thread to mark where he has been so he never loops in circles. When he hits a dead end, he winds the thread back up (backtracks) until he reaches an unexplored hallway.",
      "metaphor": "Mark visited on entry -> explore neighbors -> unmark on exit."
    },
    "problemSolved": {
      "title": "Exhaustive Path Exploration in Spatial Networks",
      "description": "Path problems require finding sequences of valid grid moves. Backtracking unmarks cells upon retreat, allowing the same cell to be part of alternative paths in different branches.",
      "keyPoints": [
        "Direction vectors simplify 4-way or 8-way movement.",
        "In-place grid marking avoids visited set allocations.",
        "Powers robotics path planning and game board search."
      ]
    },
    "intuition": {
      "overview": "From cell (r, c), check if out of bounds or obstacle. If target reached, record path. Otherwise mark cell as visited, recurse into 4 neighbors (up, down, left, right), and unmark visited.",
      "steps": [
        {
          "step": 1,
          "title": "Boundary Check",
          "description": "If r < 0 or r >= R or c < 0 or c >= C or grid[r][c] == 0: return."
        },
        {
          "step": 2,
          "title": "Mark Visited",
          "description": "grid[r][c] = -1 (or add to visited set)."
        },
        {
          "step": 3,
          "title": "Explore 4 Directions",
          "description": "Try (r+1,c), (r-1,c), (r,c+1), (r,c-1)."
        },
        {
          "step": 4,
          "title": "Unmark Backtrack",
          "description": "grid[r][c] = 1 (restore original state)."
        }
      ]
    },
    "formalDefinition": {
      "text": "Given grid G \\in \\{0, 1\\}^{R \\times C}, find a simple path P = (v_1, v_2, ..., v_k) from start s to target t such that G[v_i] = 1 and ||v_{i+1} - v_i||_1 = 1.",
      "latex": "\\Delta = \\{(0, 1), (0, -1), (1, 0), (-1, 0)\\} \\implies (r', c') = (r + dr, c + dc)"
    },
    "complexity": {
      "overview": "Time: O(4^(R*C)) worst case without pruning. Space: O(R*C) call stack depth.",
      "cases": [
        {
          "case": "Best",
          "time": "O(R + C)",
          "space": "O(R + C)",
          "explanation": "Direct open path to exit."
        },
        {
          "case": "Average",
          "time": "O(3^k)",
          "space": "O(k)",
          "explanation": "Pruning walls reduces effective branching factor to <= 3."
        },
        {
          "case": "Worst",
          "time": "O(4^(R*C))",
          "space": "O(R*C)",
          "explanation": "All paths exploration in empty grid."
        }
      ],
      "spaceNote": "O(R*C) maximum recursion call stack depth."
    },
    "workedExample": {
      "title": "Word Search for \"ABCCED\" in 3x4 Grid",
      "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]",
      "steps": [
        {
          "step": 1,
          "action": "Match \"A\" at (0, 0)",
          "state": "Mark (0,0) as \"#\"",
          "explanation": "Look for \"B\" in neighbors."
        },
        {
          "step": 2,
          "action": "Match \"B\" at (0, 1)",
          "state": "Mark (0,1) as \"#\"",
          "explanation": "Look for \"C\" in neighbors."
        },
        {
          "step": 3,
          "action": "Match \"C\" at (0, 2)",
          "state": "Mark (0,2) as \"#\"",
          "explanation": "Look for second \"C\" in neighbors."
        },
        {
          "step": 4,
          "action": "Match \"C\" at (1, 2)",
          "state": "Mark (1,2) as \"#\"",
          "explanation": "Look for \"E\" in neighbors."
        },
        {
          "step": 5,
          "action": "Match \"E\" at (2, 2)",
          "state": "Mark (2,2) as \"#\"",
          "explanation": "Look for \"D\" in neighbors."
        },
        {
          "step": 6,
          "action": "Match \"D\" at (2, 1)",
          "state": "Word completed!",
          "explanation": "All characters matched successfully."
        }
      ],
      "finalOutput": "True"
    },
    "visualExplanation": {
      "title": "4-Way Directional Search",
      "description": "Visualizing branching out into North, South, East, West with breadcrumb unmarking.",
      "features": [
        "Cell marked to prevent immediate backward reflection",
        "State restored when branch fails"
      ]
    },
    "pseudocode": {
      "title": "Word Search Backtracking",
      "code": "function exist(board, word):\n    def dfs(r, c, k):\n        if k == len(word): return True\n        if r < 0 or r >= R or c < 0 or c >= C or board[r][c] != word[k]:\n            return False\n        temp = board[r][c]\n        board[r][c] = '#' # mark visited\n        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:\n            if dfs(r + dr, c + dc, k + 1): return True\n        board[r][c] = temp # restore\n        return False"
    },
    "pythonCode": {
      "title": "Python Word Search Implementation",
      "code": "def word_search(board: list[list[str]], word: str) -> bool:\n    rows, cols = len(board), len(board[0])\n    \n    def dfs(r: int, c: int, idx: int) -> bool:\n        if idx == len(word):\n            return True\n        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[idx]:\n            return False\n            \n        temp = board[r][c]\n        board[r][c] = '#'\n        \n        for dr, dc in ((0, 1), (0, -1), (1, 0), (-1, 0)):\n            if dfs(r + dr, c + dc, idx + 1):\n                return True\n                \n        board[r][c] = temp\n        return False\n\n    for r in range(rows):\n        for c in range(cols):\n            if dfs(r, c, 0):\n                return True\n    return False",
      "explanation": "Uses in-place marker \"#\" to avoid allocating a visited set."
    },
    "runnableCode": {
      "code": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nprint(word_search(board, \"ABCCED\")) # True\nprint(word_search(board, \"SEE\"))    # True\nprint(word_search(board, \"ABCB\"))   # False",
      "expectedOutput": "True\nTrue\nFalse"
    },
    "lineByLineExplanation": [
      {
        "line": 10,
        "lines": "10",
        "code": "board[r][c] = \"#\"",
        "codeSnippet": "board[r][c] = \"#\"",
        "explanation": "Temporarily mutates board cell to \"#\" to mark it as visited for the current path."
      },
      {
        "line": 16,
        "lines": "16",
        "code": "board[r][c] = temp",
        "codeSnippet": "board[r][c] = temp",
        "explanation": "Restores the original character before returning, enabling other search paths to reuse the cell."
      }
    ],
    "edgeCases": [
      {
        "case": "Single cell board matching 1-char word",
        "handling": "dfs returns True at idx == len(word).",
        "example": "[[\"A\"]], \"A\""
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to restore cell state before returning False",
        "solution": "Always reset board[r][c] = temp; otherwise subsequent starting cells see damaged grids.",
        "codeExample": "board[r][c] = temp"
      }
    ],
    "applications": [
      {
        "industry": "Game Development",
        "application": "Boggle word game solvers",
        "benefit": "Finds all dictionary words on grid in milliseconds."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-maze-1",
        "question": "Why is BFS preferred over DFS/Backtracking when finding the SHORTEST path in an unweighted maze?",
        "hint": "Consider level-order expansion.",
        "answer": "BFS expands radially in concentric rings, guaranteeing that the first time the exit is reached, it is via the minimum number of steps."
      }
    ],
    "quiz": [
      {
        "id": "q-maze-1",
        "question": "What is the purpose of unmarking a cell (board[r][c] = temp) when backtracking in Word Search?",
        "options": [
          "To allow other search paths starting from different cells or routes to use this letter",
          "To free memory in Python",
          "To reset the screen display",
          "To delete the word"
        ],
        "correctIndex": 0,
        "explanation": "A cell is only forbidden within the current active path; other paths must be allowed to utilize it."
      }
    ],
    "codingChallenge": {
      "title": "Rat in a Maze Problem",
      "problem": "Find all possible paths that a rat can take to reach destination (n-1, n-1) from (0, 0) in an n x n binary maze. Return sorted paths of \"D\", \"L\", \"R\", \"U\".",
      "hints": [
        "Sort directions lexicographically: \"D\", \"L\", \"R\", \"U\"."
      ],
      "starterCode": "def find_path(maze: list[list[int]], n: int) -> list[str]:\n    # TODO: Implement rat in maze\n    pass",
      "solution": "def find_path(maze: list[list[int]], n: int) -> list[str]:\n    if maze[0][0] == 0 or maze[n - 1][n - 1] == 0:\n        return []\n    res = []\n    moves = [('D', 1, 0), ('L', 0, -1), ('R', 0, 1), ('U', -1, 0)]\n    def dfs(r, c, path):\n        if r == n - 1 and c == n - 1:\n            res.append(path)\n            return\n        maze[r][c] = 0 # mark visited\n        for direction, dr, dc in moves:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and maze[nr][nc] == 1:\n                dfs(nr, nc, path + direction)\n        maze[r][c] = 1 # unmark\n    dfs(0, 0, \"\")\n    return res"
    },
    "summary": {
      "keyTakeaways": [
        "Directional arrays (dr, dc) streamline multi-direction grid traversals.",
        "In-place marking saves memory but strictly requires restoration on backtrack."
      ],
      "nextLessonId": "dsa-backtracking-pruning",
      "nextLessonTitle": "Pruning and Backtracking Optimization",
      "nextLessonModuleId": "dsa-module-6"
    },
    "lineByLine": [
      {
        "line": 10,
        "lines": "10",
        "code": "board[r][c] = \"#\"",
        "codeSnippet": "board[r][c] = \"#\"",
        "explanation": "Temporarily mutates board cell to \"#\" to mark it as visited for the current path."
      },
      {
        "line": 16,
        "lines": "16",
        "code": "board[r][c] = temp",
        "codeSnippet": "board[r][c] = temp",
        "explanation": "Restores the original character before returning, enabling other search paths to reuse the cell."
      }
    ]
  },
  "dsa-backtracking-pruning": {
    "id": "dsa-backtracking-pruning",
    "moduleId": "dsa-module-6",
    "title": "Pruning and Backtracking Optimization",
    "subtitle": "Branch-and-Bound, Symmetry Breaking, and Search Space Reduction",
    "order": 7,
    "readTimeMinutes": 24,
    "difficulty": "Advanced",
    "visualizerType": "recursion-tree",
    "objectives": [
      "Define pruning and state bounding conditions that terminate dead-end branches.",
      "Apply symmetry breaking to eliminate redundant isomorphic subtrees.",
      "Implement Combination Sum with sorting-based early exit pruning.",
      "Analyze exponential search reduction achieved by branch-and-bound techniques."
    ],
    "prerequisites": [
      "Permutations and Combinations",
      "N-Queens Problem"
    ],
    "analogy": {
      "title": "Pruning Dead Branches from an Apple Tree",
      "text": "A gardener cuts off dying or diseased branches from an apple tree so the tree does not waste water and nutrients nourishing branches that will never bear fruit. In algorithm design, pruning cuts off recursive subtrees that can mathematically never yield a valid solution.",
      "metaphor": "Detecting failure early prevents exploring millions of useless descendants."
    },
    "problemSolved": {
      "title": "Transforming Infeasible Exponential Search into Practical Execution",
      "description": "Without pruning, backtracking visits O(k^n) states. Pruning conditions (like current_sum > target) prune entire subtrees immediately at the root, reducing runtimes from hours to milliseconds.",
      "keyPoints": [
        "Early loop break condition reduces branching factor.",
        "Symmetry breaking eliminates identical mirror states.",
        "Essential for real-world combinatorial optimization."
      ]
    },
    "intuition": {
      "overview": "Before descending into a recursive call, evaluate whether the branch could possibly succeed. If remaining resources or candidate values cannot reach the goal, skip the branch immediately.",
      "steps": [
        {
          "step": 1,
          "title": "Sort Candidates",
          "description": "Sorting allows stopping the loop as soon as candidates[i] > remaining_target."
        },
        {
          "step": 2,
          "title": "Bounding Check",
          "description": "If current_sum + remaining_min > target, break early."
        },
        {
          "step": 3,
          "title": "Symmetry Breaking",
          "description": "Enforce ascending order to avoid exploring duplicate combinations like (2, 3) and (3, 2)."
        }
      ]
    },
    "formalDefinition": {
      "text": "In branch-and-bound, a bounding function B(x) provides a lower bound on cost or an upper bound on feasibility. If B(x) violates the threshold constraint, the entire subtree rooted at x is pruned.",
      "latex": "\\text{If } \\text{cost}(x) + h(x) > \\text{best\\_cost}, \\quad \\text{prune}(x)"
    },
    "complexity": {
      "overview": "Worst-case remains exponential O(2^n), but effective pruned search tree size is drastically smaller.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Root pruned immediately by bound check."
        },
        {
          "case": "Average",
          "time": "O(k^d) \\ll O(2^n)",
          "space": "O(d)",
          "explanation": "Prunes vast majority of invalid branches."
        },
        {
          "case": "Worst",
          "time": "O(2^n)",
          "space": "O(n)",
          "explanation": "All branches satisfy bounding constraint."
        }
      ],
      "spaceNote": "O(target) call stack depth."
    },
    "workedExample": {
      "title": "Combination Sum for candidates=[2, 3, 6, 7], target=7",
      "input": "candidates=[2, 3, 6, 7], target=7",
      "steps": [
        {
          "step": 1,
          "action": "Sort candidates",
          "state": "[2, 3, 6, 7]",
          "explanation": "Enables early break."
        },
        {
          "step": 2,
          "action": "Try 2 -> Try 2 -> Try 2",
          "state": "Sum=6, target left=1",
          "explanation": "Next candidate is 2 > 1. Break! Prunes 3, 6, 7 instantly."
        },
        {
          "step": 3,
          "action": "Backtrack: [2, 2, 3]",
          "state": "Sum=7 -> Solution [2, 2, 3] found!",
          "explanation": "Matches target."
        },
        {
          "step": 4,
          "action": "Try 7",
          "state": "Sum=7 -> Solution [7] found!",
          "explanation": "Matches target."
        }
      ],
      "finalOutput": "[[2, 2, 3], [7]]"
    },
    "visualExplanation": {
      "title": "Pruned Subtree Visualization",
      "description": "Visualizing branches severed at depth 2 rather than expanding 5 more levels deep.",
      "features": [
        "Red X marks early loop break",
        "Saves exponential number of descendant evaluations"
      ]
    },
    "pseudocode": {
      "title": "Pruned Combination Sum",
      "code": "function combinationSum(candidates, target):\n    sort(candidates)\n    result = []\n    function backtrack(start, remain, path):\n        if remain == 0:\n            result.append(copy(path))\n            return\n        for i from start to len(candidates) - 1:\n            if candidates[i] > remain:\n                break # PRUNING: All subsequent elements are also too large!\n            path.append(candidates[i])\n            backtrack(i, remain - candidates[i], path)\n            path.pop()\n    backtrack(0, target, [])\n    return result"
    },
    "pythonCode": {
      "title": "Python Pruned Combination Sum",
      "code": "def combination_sum_pruned(candidates: list[int], target: int) -> list[list[int]]:\n    candidates.sort() # Critical for pruning\n    res = []\n    \n    def backtrack(start: int, remain: int, path: list[int]):\n        if remain == 0:\n            res.append(list(path))\n            return\n        for i in range(start, len(candidates)):\n            num = candidates[i]\n            if num > remain:\n                break # Prune all remaining elements!\n            path.append(num)\n            backtrack(i, remain - num, path)\n            path.pop()\n            \n    backtrack(0, target, [])\n    return res",
      "explanation": "Sorting enables breaking the loop as soon as num > remain, pruning the rest of the array."
    },
    "runnableCode": {
      "code": "print(combination_sum_pruned([2, 3, 6, 7], 7))\nprint(combination_sum_pruned([2, 3, 5], 8))",
      "expectedOutput": "[[2, 2, 3], [7]]\n[[2, 2, 2, 2], [2, 3, 3], [3, 5]]"
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "candidates.sort()",
        "codeSnippet": "candidates.sort()",
        "explanation": "Pre-sorting ensures elements are in strictly non-decreasing order."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "if num > remain: break",
        "codeSnippet": "if num > remain: break",
        "explanation": "Key pruning step: because candidates are sorted, if current number exceeds remain, every subsequent number will too."
      }
    ],
    "edgeCases": [
      {
        "case": "All candidates exceed target",
        "handling": "First candidate triggers break, returns empty list [].",
        "example": "candidates=[10, 20], target=5"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using continue instead of break when candidates are sorted",
        "solution": "break stops checking all larger remaining elements; continue would unnecessarily check them.",
        "codeExample": "if num > remain: break # not continue"
      }
    ],
    "applications": [
      {
        "industry": "Artificial Intelligence",
        "application": "Alpha-Beta pruning in chess and game engines",
        "benefit": "Prunes millions of suboptimal game board branches."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-prune-1",
        "question": "What is symmetry breaking in the N-Queens problem?",
        "hint": "Reflecting the board across vertical axis.",
        "answer": "Only placing the queen in the first row on the left half of the board (c < N/2), then mirroring the found solutions across the vertical axis to cut work in half."
      }
    ],
    "quiz": [
      {
        "id": "q-prune-1",
        "question": "Why does sorting candidates enable breaking the loop instead of continuing?",
        "options": [
          "Because subsequent candidates will be >= current candidate, so they will also exceed the remaining target",
          "Sorting speeds up array indexing",
          "Python requires sorted arrays for loops",
          "It prevents stack overflow"
        ],
        "correctIndex": 0,
        "explanation": "In a sorted array, if candidates[i] > remain, all elements candidates[j] for j > i must also exceed remain."
      }
    ],
    "codingChallenge": {
      "title": "Palindrome Partitioning with Pruning",
      "problem": "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitionings.",
      "hints": [
        "Only recurse if the candidate prefix s[start:i+1] is a palindrome."
      ],
      "starterCode": "def partition_palindromes(s: str) -> list[list[str]]:\n    # TODO: Implement palindrome partitioning\n    pass",
      "solution": "def partition_palindromes(s: str) -> list[list[str]]:\n    res = []\n    def is_palindrome(sub):\n        return sub == sub[::-1]\n    def backtrack(start, path):\n        if start == len(s):\n            res.append(list(path))\n            return\n        for end in range(start + 1, len(s) + 1):\n            sub = s[start:end]\n            if is_palindrome(sub): # Pruning: only explore palindromic substrings\n                path.append(sub)\n                backtrack(end, path)\n                path.pop()\n    backtrack(0, [])\n    return res"
    },
    "summary": {
      "keyTakeaways": [
        "Pruning cuts branches that cannot mathematically reach a valid solution.",
        "Sorting enables powerful early-break conditions."
      ],
      "nextLessonId": "dsa-sort-basic",
      "nextLessonTitle": "Bubble, Selection, and Insertion Sort",
      "nextLessonModuleId": "dsa-module-7"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "candidates.sort()",
        "codeSnippet": "candidates.sort()",
        "explanation": "Pre-sorting ensures elements are in strictly non-decreasing order."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "if num > remain: break",
        "codeSnippet": "if num > remain: break",
        "explanation": "Key pruning step: because candidates are sorted, if current number exceeds remain, every subsequent number will too."
      }
    ]
  }
};
