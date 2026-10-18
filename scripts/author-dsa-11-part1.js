const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m11 = getExistingDSALessons(11);
const m11Lessons = { ...m11.lessons };

m11Lessons['dsa-greedy-strategy'] = {
  id: 'dsa-greedy-strategy',
  moduleId: 'dsa-module-11',
  title: 'Greedy Strategy and Correctness Intuition',
  subtitle: 'Locally Optimal Choices, Greedy Choice Property, and Exchange Arguments',
  order: 1,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Define the Greedy Paradigm: making locally optimal choices at every step.',
    'Differentiate between problems where greedy succeeds vs where it fails.',
    'Prove greedy correctness using Exchange Arguments and Stays Ahead techniques.',
    'Analyze Optimal Substructure in greedy algorithms.'
  ],
  prerequisites: ['Time Complexity and Big-O', 'Sorting Algorithms: Quick Sort'],
  analogy: {
    title: 'The Greedy Cashier Making Change',
    text: 'When a US cashier needs to give 41 cents in change, they instinctively pick the largest possible coin first: a 25-cent quarter (leaving 16c), then a 10-cent dime (leaving 6c), then a 5-cent nickel (leaving 1c), and finally a 1-cent penny. In US currency, this locally optimal coin choice always yields the globally minimal number of coins.',
    metaphor: 'Greedy algorithms make the best immediate decision without backtracking or second-guessing.'
  },
  problemSolved: {
    title: 'Achieving O(n) or O(n log n) Speed Without Dynamic Programming Overhead',
    description: 'Dynamic programming checks all subproblems, which can take O(n²) or O(n³). When a problem exhibits the Greedy Choice Property, making a single local decision eliminates subproblem branching, running orders of magnitude faster.',
    keyPoints: [
      'Zero backtracking: never reconsiders previous choices.',
      'Requires mathematical proof (exchange argument or stays ahead).',
      'Fails when local choices trap the algorithm in dead-end local optima.'
    ]
  },
  intuition: {
    overview: 'Sort items by a greedy metric (ratio, end time, value). Select items one by one if they satisfy constraints, immediately committing to each choice.',
    steps: [
      { step: 1, title: 'Establish Metric', description: 'Define greedy sorting criterion (e.g. earliest deadline).' },
      { step: 2, title: 'Iterate & Commit', description: 'Process items in order; accept if feasible, reject if conflicting.' },
      { step: 3, title: 'No Backtracking', description: 'Move forward permanently to next item.' }
    ]
  },
  formalDefinition: {
    text: 'A problem exhibits the Greedy Choice Property if a globally optimal solution can be reached by assembling locally optimal choices. In an Exchange Argument, we assume an optimal solution OPT differs from greedy solution GREEDY, and show that replacing an element of OPT with one from GREEDY yields a solution that is at least as good.',
    latex: '\\text{cost}(\\text{OPT} \\setminus \\{x\\} \\cup \\{g\\}) \\le \\text{cost}(\\text{OPT}) \\implies \\text{Greedy is optimal}'
  },
  complexity: {
    overview: 'Typically dominated by sorting: O(n log n) time and O(1) extra space.',
    cases: [
      { case: 'Best', time: 'O(n log n)', space: 'O(1)', explanation: 'Sorting step dominates.' },
      { case: 'Average', time: 'O(n log n)', space: 'O(1)', explanation: 'Standard greedy execution.' },
      { case: 'Worst', time: 'O(n log n)', space: 'O(1)', explanation: 'Single pass over sorted input.' }
    ],
    spaceNote: 'O(1) auxiliary memory beyond sorting.'
  },
  workedExample: {
    title: 'Making 41 Cents Change in Standard US Coins [25, 10, 5, 1]',
    input: 'Amount = 41',
    steps: [
      { step: 1, action: 'Pick 25c', state: '41 - 25 = 16c left', explanation: 'Largest coin <= 41 is 25.' },
      { step: 2, action: 'Pick 10c', state: '16 - 10 = 6c left', explanation: 'Largest coin <= 16 is 10.' },
      { step: 3, action: 'Pick 5c', state: '6 - 5 = 1c left', explanation: 'Largest coin <= 6 is 5.' },
      { step: 4, action: 'Pick 1c', state: '1 - 1 = 0c left', explanation: 'Largest coin <= 1 is 1.' }
    ],
    finalOutput: 'Coins used: [25, 10, 5, 1] (Total: 4 coins)'
  },
  visualExplanation: {
    title: 'Greedy vs Global Optimum Landscape',
    description: 'Visualizing a hill-climber ascending the immediate steepest slope vs the true global mountain peak.',
    features: ['Greedy path highlighted in bold green', 'Warning callout where greedy falls into local traps on non-canonical currencies']
  },
  pseudocode: {
    title: 'Greedy Coin Change (Canonical)',
    code: `function greedyCoinChange(coins, amount):
    sort(coins in descending order)
    result = []
    for c in coins:
        while amount >= c:
            amount -= c
            result.append(c)
    return result if amount == 0 else -1`
  },
  pythonCode: {
    title: 'Python Greedy Coin Change',
    code: `def greedy_coin_change(coins: list[int], amount: int) -> list[int]:
    # Works for canonical coin systems (US, Euro)
    coins.sort(reverse=True)
    res = []
    for c in coins:
        while amount >= c:
            amount -= c
            res.append(c)
    return res if amount == 0 else []`,
    explanation: 'Greedily subtracts the largest coin denomination possible.'
  },
  runnableCode: {
    code: `print(greedy_coin_change([1, 5, 10, 25], 41))`,
    expectedOutput: `[25, 10, 5, 1]`
  },
  lineByLineExplanation: [
    { line: 3, code: 'coins.sort(reverse=True)', explanation: 'Orders denominations from largest to smallest to ensure greedy selection.' },
    { line: 6, code: 'while amount >= c: amount -= c; res.append(c)', explanation: 'Repeatedly chooses the locally maximal denomination.' }
  ],
  edgeCases: [
    { case: 'Non-canonical coin systems (e.g. coins [1, 3, 4], amount 6)', handling: 'Greedy chooses 4, 1, 1 (3 coins); true optimal is 3, 3 (2 coins)! Requires Dynamic Programming.', example: 'coins=[1, 3, 4], amount=6' }
  ],
  commonMistakes: [
    { mistake: 'Assuming greedy works for all optimization problems', solution: 'Always check if an exchange argument holds; if counterexamples exist, switch to Dynamic Programming.', codeExample: '# Greedy fails on Coin Change [1, 3, 4] for 6' }
  ],
  applications: [
    { industry: 'Data Compression', application: 'Huffman Coding Tree generation', benefit: 'Greedily pairs lowest frequencies to generate optimal prefix codes.' }
  ],
  practiceQuestions: [
    { id: 'pq-gs-1', question: 'What are the two key ingredients required for a greedy algorithm to be provably optimal?', hint: 'Greedy choice and substructure.', answer: '1. Greedy Choice Property (locally optimal choices yield global optimum), and 2. Optimal Substructure (optimal solution contains optimal solutions to subproblems).' }
  ],
  quiz: [
    { id: 'q-gs-1', question: 'When does a greedy algorithm fail to find the globally optimal solution?', options: ['When locally optimal choices lead to suboptimal future choices without backtracking', 'When inputs are integers', 'When sorting is impossible', 'When memory is limited'], correctIndex: 0, explanation: 'Greedy algorithms do not explore alternate branches; if an early choice precludes the true global optimum, greedy gets stuck.' }
  ],
  codingChallenge: {
    title: 'Assign Cookies',
    problem: 'Each child i has a greed factor g[i], and each cookie j has a size s[j]. If s[j] >= g[i], child i is satisfied. Maximize the number of satisfied children.',
    hints: ['Sort both greed factors and cookie sizes; satisfy children with the smallest possible sufficient cookie.'],
    starterCode: `def find_content_children(g: list[int], s: list[int]) -> int:
    # TODO: Greedily satisfy children
    pass`,
    solution: `def find_content_children(g: list[int], s: list[int]) -> int:
    g.sort()
    s.sort()
    child_i = 0
    cookie_j = 0
    while child_i < len(g) and cookie_j < len(s):
        if s[cookie_j] >= g[child_i]:
            child_i += 1
        cookie_j += 1
    return child_i`
  },
  summary: {
    keyTakeaways: ['Greedy algorithms make locally optimal decisions at every step.', 'Always verify correctness using exchange arguments before deploying greedy.'],
    nextLessonId: 'dsa-greedy-activity-selection',
    nextLessonTitle: 'Activity Selection and Interval Problems',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-greedy-activity-selection'] = {
  id: 'dsa-greedy-activity-selection',
  moduleId: 'dsa-module-11',
  title: 'Activity Selection and Interval Problems',
  subtitle: 'Interval Scheduling, Earliest Finish Time Heuristic, and Non-Overlapping Subsets',
  order: 2,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Maximize the number of mutually compatible intervals.',
    'Prove why sorting by Earliest Finish Time (end time) is provably optimal.',
    'Disprove intuitive but flawed heuristics: shortest duration and earliest start time.',
    'Master interval variations: Merge Intervals, Insert Interval, and Non-overlapping Intervals.'
  ],
  prerequisites: ['Greedy Strategy and Correctness Intuition'],
  analogy: {
    title: 'Booking a Single Movie Theater Screen',
    text: 'A movie theater has only one screen and 10 film requests with different start and end times. To show the maximum number of movies in a day, which movie should you pick first? The movie that FINISHES EARLIEST! Ending as early as possible leaves the maximum possible free time remaining for the rest of the day.',
    metaphor: 'Picking the earliest end time leaves maximum room for future non-conflicting activities.'
  },
  problemSolved: {
    title: 'Optimal Resource Utilization Without Conflict',
    description: 'Scheduling meetings in conference rooms, aircraft on runways, or CPU burst jobs requires selecting the largest possible set of non-overlapping time windows.',
    keyPoints: [
      'Earliest finish time is mathematically optimal.',
      'Executes in O(n log n) sorting time + O(n) scan.',
      'Core interview pattern for all interval-based challenges.'
    ]
  },
  intuition: {
    overview: 'Sort all intervals by end time. Pick the first interval. For each subsequent interval, if its start time >= end time of last selected interval, select it and update last end time.',
    steps: [
      { step: 1, title: 'Sort by End Time', description: 'intervals.sort(key=lambda x: x[1])' },
      { step: 2, title: 'Initialize Benchmark', description: 'count = 1; last_end = intervals[0][1]' },
      { step: 3, title: 'Filter Non-Overlapping', description: 'For [s, e] in intervals[1:]: if s >= last_end: count++; last_end = e.' }
    ]
  },
  formalDefinition: {
    text: 'Given n activities S = \\{[s_i, f_i)\\}. Activity Selection finds a subset A \\subseteq S of pairwise disjoint intervals of maximal cardinality |A|. Greedily selecting i = \\arg\\min_{j \\in S_{\\text{compatible}}} f_j is optimal.',
    latex: '\\max |A| \\quad \\text{s.t.} \\quad \\forall i, j \\in A \\, (i \\neq j), \\; [s_i, f_i) \\cap [s_j, f_j) = \\emptyset'
  },
  complexity: {
    overview: 'Time: O(n log n) sorting. Space: O(1) in-place.',
    cases: [
      { case: 'Best', time: 'O(n log n)', space: 'O(1)', explanation: 'Sorting dominates.' },
      { case: 'Average', time: 'O(n log n)', space: 'O(1)', explanation: 'Single linear scan after sort.' },
      { case: 'Worst', time: 'O(n log n)', space: 'O(1)', explanation: 'All intervals overlap.' }
    ],
    spaceNote: 'O(1) memory beyond sorting.'
  },
  workedExample: {
    title: 'Scheduling Intervals: [1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11]',
    input: '8 intervals',
    steps: [
      { step: 1, action: 'Sort by end time', state: '[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11]', explanation: 'First is [1, 4].' },
      { step: 2, action: 'Pick [1, 4]', state: 'last_end = 4, count = 1', explanation: 'First selected.' },
      { step: 3, action: 'Skip [3, 5], [0, 6]', state: 'Start 3 < 4, Start 0 < 4 (conflict)', explanation: 'Overlaps skipped.' },
      { step: 4, action: 'Pick [5, 7]', state: 'Start 5 >= 4 -> Selected! last_end = 7, count = 2', explanation: 'Second selected.' },
      { step: 5, action: 'Skip [3, 9], [5, 9], [6, 10]', state: 'Starts < 7 (conflict)', explanation: 'Overlaps skipped.' },
      { step: 6, action: 'Pick [8, 11]', state: 'Start 8 >= 7 -> Selected! last_end = 11, count = 3', explanation: 'Third selected.' }
    ],
    finalOutput: 'Max compatible activities = 3: {[1, 4], [5, 7], [8, 11]}'
  },
  visualExplanation: {
    title: 'Timeline Horizon Scanning',
    description: 'Visualizing timeline bars: green intervals selected, red overlapping bars discarded.',
    features: ['Earliest ending green bar frees up timeline', 'Red conflicting intervals pruned']
  },
  pseudocode: {
    title: 'Activity Selection Algorithm',
    code: `function activitySelection(intervals):
    sort(intervals by end_time)
    count = 1
    last_end = intervals[0].end
    for i from 1 to length(intervals) - 1:
        if intervals[i].start >= last_end:
            count += 1
            last_end = intervals[i].end
    return count`
  },
  pythonCode: {
    title: 'Python Non-Overlapping Intervals',
    code: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    if not intervals: return 0
    # Sort by end time
    intervals.sort(key=lambda x: x[1])
    
    count_kept = 1
    last_end = intervals[0][1]
    
    for start, end in intervals[1:]:
        if start >= last_end:
            count_kept += 1
            last_end = end
            
    # Number of intervals to remove = total - kept
    return len(intervals) - count_kept`,
    explanation: 'Finds maximal compatible intervals; subtracts from total to find minimal removals.'
  },
  runnableCode: {
    code: `intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
print(erase_overlap_intervals(intervals)) # Remove 1 interval [1, 3]`,
    expectedOutput: `1`
  },
  lineByLineExplanation: [
    { line: 4, code: 'intervals.sort(key=lambda x: x[1])', explanation: 'Sorting by END time (index 1) is the critical greedy choice that guarantees optimality.' },
    { line: 10, code: 'if start >= last_end:', explanation: 'Checks compatibility: next activity starts at or after previous activity concludes.' }
  ],
  edgeCases: [
    { case: 'All intervals share identical start and end times', handling: 'Selects 1 interval, discards all others.', example: '[[1, 2], [1, 2], [1, 2]] -> remove 2' }
  ],
  commonMistakes: [
    { mistake: 'Sorting by START time instead of END time', solution: 'Sorting by start time fails (e.g. [0, 100] starts earliest but blocks all other activities); always sort by end time.', codeExample: 'intervals.sort(key=lambda x: x[1]) # sort by end time!' }
  ],
  applications: [
    { industry: 'Cloud Computing', application: 'Virtual machine instance scheduling on physical server hosts', benefit: 'Maximizes VM throughput across calendar slots.' }
  ],
  practiceQuestions: [
    { id: 'pq-as-1', question: 'How is the Meeting Rooms II problem (finding minimum conference rooms needed) different from Activity Selection?', hint: 'Track concurrent active meetings.', answer: 'Activity Selection selects non-overlapping intervals on 1 screen. Meeting Rooms II finds the maximum number of concurrent overlapping intervals at any point in time (using min-heap or two-pointer start/end arrays).' }
  ],
  quiz: [
    { id: 'q-as-1', question: 'What greedy sorting criterion provably maximizes the number of non-overlapping intervals?', options: ['Earliest finish time (end time)', 'Earliest start time', 'Shortest duration', 'Smallest start + end sum'], correctIndex: 0, explanation: 'Ending as early as possible leaves the maximum remaining time available for subsequent non-conflicting activities.' }
  ],
  codingChallenge: {
    title: 'Merge Intervals',
    problem: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    hints: ['Sort by start time; merge with previous interval if current.start <= prev.end.'],
    starterCode: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    # TODO: Merge overlapping intervals
    pass`,
    solution: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged`
  },
  summary: {
    keyTakeaways: ['Sort by earliest finish time to maximize compatible activities.', 'Merge intervals sorts by start time to chain overlapping bounds.'],
    nextLessonId: 'dsa-greedy-fractional-knapsack',
    nextLessonTitle: 'Fractional Knapsack',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-greedy-fractional-knapsack'] = {
  id: 'dsa-greedy-fractional-knapsack',
  moduleId: 'dsa-module-11',
  title: 'Fractional Knapsack',
  subtitle: 'Value-to-Weight Ratio Greedy Choice vs 0/1 Discrete Indivisibility',
  order: 3,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Solve the Fractional Knapsack problem where items can be subdivided continuously.',
    'Formulate the value-to-weight density ratio: ratio = value / weight.',
    'Understand why greedy works for Fractional Knapsack but fails for 0/1 Knapsack.',
    'Implement the O(n log n) greedy density sorting algorithm.'
  ],
  prerequisites: ['Greedy Strategy and Correctness Intuition'],
  analogy: {
    title: 'Filling a Jar with Gold Dust vs Gold Bars',
    text: 'A thief in a vault has a backpack that can carry 10 kg. If the vault contains sacks of gold dust, silver dust, and copper dust, the thief fills their bag with 100% gold dust by taking scoops. But if the vault contains solid indivisible gold bars of 12 kg, they cannot take any part of it.',
    metaphor: 'Continuous items can be taken fractionally, guaranteeing optimal value density packing.'
  },
  problemSolved: {
    title: 'Optimal Resource Allocation with Continuous Divisibility',
    description: 'When goods can be fractionalized (liquids, grain, data bandwidth allocation), greedy sorting by value density (value per unit weight) delivers the mathematically maximum possible total value in O(n log n) time.',
    keyPoints: [
      'Items can be fractionally divided.',
      'Greedy choice: highest value-to-weight ratio first.',
      'Fails on discrete 0/1 Knapsack (which requires DP).'
    ]
  },
  intuition: {
    overview: 'Calculate density = value / weight for each item. Sort descending by density. Take whole items while capacity allows. When the next item exceeds remaining capacity, take fraction = remaining / weight and finish.',
    steps: [
      { step: 1, title: 'Compute Density', description: 'density = value / weight for each item.' },
      { step: 2, title: 'Sort Descending', description: 'items.sort(key=lambda x: x.val / x.wt, reverse=True)' },
      { step: 3, title: 'Pack Greedy', description: 'Take min(capacity, item.weight), add fraction of value, subtract weight.' }
    ]
  },
  formalDefinition: {
    text: 'Maximize \\sum_{i=1}^n x_i v_i subject to \\sum_{i=1}^n x_i w_i \\le W and 0 \\le x_i \\le 1. Sorted order v_1/w_1 \\ge v_2/w_2 \\ge ... \\ge v_n/w_n guarantees optimality of greedy prefix filling.',
    latex: '\\max \\sum_{i=1}^n x_i v_i \\quad \\text{s.t.} \\quad \\sum_{i=1}^n x_i w_i \\le W, \\quad x_i \\in [0, 1]'
  },
  complexity: {
    overview: 'Time: O(n log n) sorting. Space: O(1) in-place.',
    cases: [
      { case: 'Best', time: 'O(n log n)', space: 'O(1)', explanation: 'Sorting by ratio.' },
      { case: 'Average', time: 'O(n log n)', space: 'O(1)', explanation: 'Linear packing scan.' },
      { case: 'Worst', time: 'O(n log n)', space: 'O(1)', explanation: 'All items evaluated.' }
    ],
    spaceNote: 'O(1) auxiliary memory.'
  },
  workedExample: {
    title: 'Capacity W = 50, Items: (val=60, wt=10), (val=100, wt=20), (val=120, wt=30)',
    input: 'W = 50',
    steps: [
      { step: 1, action: 'Compute Densities', state: 'Item 1: 60/10=6.0; Item 2: 100/20=5.0; Item 3: 120/30=4.0', explanation: 'Order: 1, 2, 3.' },
      { step: 2, action: 'Take 100% Item 1', state: 'take 10 kg -> W_left = 40, val = 60', explanation: 'Full item packed.' },
      { step: 3, action: 'Take 100% Item 2', state: 'take 20 kg -> W_left = 20, val = 60 + 100 = 160', explanation: 'Full item packed.' },
      { step: 4, action: 'Take fraction of Item 3', state: 'Only 20 kg left of 30 kg -> take 20/30 (66.7%) -> val += (20/30)*120 = 80', explanation: 'Bag full at 50 kg.' }
    ],
    finalOutput: 'Max Value = 160 + 80 = 240.0'
  },
  visualExplanation: {
    title: 'Density Beaker Filling',
    description: 'Visualizing pouring densest liquid first, topping off the beaker with fraction of 3rd liquid.',
    features: ['Bars colored by value-to-weight ratio', 'Top partial slice fills remaining container capacity']
  },
  pseudocode: {
    title: 'Fractional Knapsack Algorithm',
    code: `function fractionalKnapsack(W, items):
    sort(items descending by val / wt)
    total_val = 0.0
    for item in items:
        if W >= item.wt:
            W -= item.wt
            total_val += item.val
        else:
            total_val += item.val * (W / item.wt)
            break
    return total_val`
  },
  pythonCode: {
    title: 'Python Fractional Knapsack Implementation',
    code: `def fractional_knapsack(capacity: float, values: list[float], weights: list[float]) -> float:
    # Pair items and sort by value-to-weight ratio descending
    items = sorted(zip(values, weights), key=lambda x: x[0] / x[1], reverse=True)
    total_value = 0.0
    rem_capacity = capacity

    for val, wt in items:
        if rem_capacity >= wt:
            rem_capacity -= wt
            total_value += val
        else:
            total_value += val * (rem_capacity / wt)
            break # Knapsack is completely full

    return total_value`,
    explanation: 'Sorts items by value density and fills knapsack, taking a fractional slice of the last item.'
  },
  runnableCode: {
    code: `values = [60, 100, 120]
weights = [10, 20, 30]
print(fractional_knapsack(50, values, weights))`,
    expectedOutput: `240.0`
  },
  lineByLineExplanation: [
    { line: 3, code: 'key=lambda x: x[0] / x[1], reverse=True', explanation: 'Sorts items descending by value density (val / wt).' },
    { line: 11, code: 'total_value += val * (rem_capacity / wt)', explanation: 'Takes the precise fractional proportion required to fill remaining capacity to 100%.' }
  ],
  edgeCases: [
    { case: 'Total weights <= capacity', handling: 'Takes all items in full, returns sum(values).', example: 'capacity=100, total_wt=50' }
  ],
  commonMistakes: [
    { mistake: 'Attempting to use Fractional Knapsack greedy strategy for 0/1 Knapsack', solution: '0/1 items cannot be split; taking the highest ratio item can leave empty space that wastes value. Use DP for 0/1 Knapsack.', codeExample: '# 0/1 Knapsack requires DP, not Greedy!' }
  ],
  applications: [
    { industry: 'Telecommunications', application: 'Bandwidth allocation across competing streaming video packets', benefit: 'Maximizes transmitted video fidelity under packet payload limits.' }
  ],
  practiceQuestions: [
    { id: 'pq-fk-1', question: 'Can Fractional Knapsack be solved in O(n) average time without full sorting?', hint: 'Recall Quickselect.', answer: 'Yes! Using Quickselect on value-to-weight ratios, we can partition items into those that definitely fit, find the threshold item, and pack in O(n) expected time.' }
  ],
  quiz: [
    { id: 'q-fk-1', question: 'Why does greedy work for Fractional Knapsack but fail for 0/1 Knapsack?', options: ['Because fractional divisibility allows filling 100% of the knapsack capacity without leaving wasted empty space', 'Because 0/1 Knapsack has no numbers', 'Because fractional knapsack uses floats', 'Because sorting is impossible in 0/1 knapsack'], correctIndex: 0, explanation: 'In fractional knapsack, we can take an exact fraction to top off the capacity, guaranteeing every unit of weight has the highest possible value density.' }
  ],
  codingChallenge: {
    title: 'Maximum Units on a Truck',
    problem: 'You are given a 2D array boxTypes where boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi] and truckSize. Return the maximum total number of units that can be put on the truck.',
    hints: ['Sort by units per box descending; fill truck greedily.'],
    starterCode: `def maximum_units(boxTypes: list[list[int]], truckSize: int) -> int:
    # TODO: Maximize units on truck
    pass`,
    solution: `def maximum_units(boxTypes: list[list[int]], truckSize: int) -> int:
    boxTypes.sort(key=lambda x: x[1], reverse=True)
    total_units = 0
    for boxes, units in boxTypes:
        take = min(truckSize, boxes)
        total_units += take * units
        truckSize -= take
        if truckSize == 0:
            break
    return total_units`
  },
  summary: {
    keyTakeaways: ['Fractional knapsack sorts by value density (val / wt) in O(n log n).', 'Continuous divisibility guarantees greedy optimality.'],
    nextLessonId: 'dsa-dp-fundamentals',
    nextLessonTitle: 'Dynamic Programming Fundamentals',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-dp-fundamentals'] = {
  id: 'dsa-dp-fundamentals',
  moduleId: 'dsa-module-11',
  title: 'Dynamic Programming Fundamentals',
  subtitle: 'Optimal Substructure, Overlapping Subproblems, and the Principle of Optimality',
  order: 4,
  readTimeMinutes: 24,
  difficulty: 'Beginner',
  visualizerType: 'dp-table',
  objectives: [
    'Define the two core requirements of Dynamic Programming: Overlapping Subproblems and Optimal Substructure.',
    'Contrast Divide-and-Conquer (independent subproblems) with DP (shared overlapping subproblems).',
    'Formulate the Bellman Principle of Optimality.',
    'Follow the 4-step DP framework: State definition, Recurrence relation, Base cases, and Answer extraction.'
  ],
  prerequisites: ['DSA Foundations: Recursion', 'Recursion Trees and Call Stacks'],
  analogy: {
    title: 'Writing Down the Answer on a Piece of Paper',
    text: 'A teacher writes "1 + 1 + 1 + 1 + 1" on the board and asks a student for the sum: "5!". The teacher then writes another "1 +" in front and asks: "What is the answer now?" The student immediately answers "6!" without recounting the first five ones because they REMEMBERED the previous answer.',
    metaphor: 'Dynamic Programming remembers previous subproblem solutions so they never need to be recomputed.'
  },
  problemSolved: {
    title: 'Taming Combinatorial Explosion from O(2^n) to Polynomial O(n²)',
    description: 'Naive recursive branching recalculates the same subproblems exponentially many times (e.g. fib(5) calculates fib(2) three times). DP caches subproblem answers, transforming exponential runtimes into linear or quadratic time.',
    keyPoints: [
      'Caches overlapping subproblems to eliminate redundant computation.',
      'Reduces exponential O(2^n) algorithms to polynomial O(n) or O(n²).',
      'Underpins modern bioinformatics sequence alignment and reinforcement learning.'
    ]
  },
  intuition: {
    overview: 'Break problem into smaller subproblems. Define a state array/table dp[i]. Identify the recurrence transition linking dp[i] to earlier subproblems dp[i-1], dp[i-2]. Compute base cases and fill.',
    steps: [
      { step: 1, title: 'State Definition', description: 'What does dp[i] represent in plain English?' },
      { step: 2, title: 'Transition Formula', description: 'How does dp[i] relate to previous states?' },
      { step: 3, title: 'Base Cases & Order', description: 'What are the trivial starting values and safe filling direction?' }
    ]
  },
  formalDefinition: {
    text: 'Richard Bellman\'s Principle of Optimality: An optimal policy has the property that whatever the initial state and initial decision are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision.',
    latex: 'V(s) = \\max_{a} \\big( R(s, a) + \\gamma \\sum_{s\'} P(s\' \\mid s, a) V(s\') \\big)'
  },
  complexity: {
    overview: 'Time: O(number of subproblems * transition time per state). Space: O(number of states).',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(n)', explanation: 'Linear 1D DP with O(1) transition (e.g. Fibonacci).' },
      { case: 'Average', time: 'O(n²)', space: 'O(n²)', explanation: '2D DP (e.g. Longest Common Subsequence).' },
      { case: 'Worst', time: 'O(n³)', space: 'O(n²)', explanation: 'Interval DP (e.g. Matrix Chain Multiplication).' }
    ],
    spaceNote: 'Can often be optimized (e.g. space rolling from O(n) to O(1)).'
  },
  workedExample: {
    title: 'Fibonacci Overlapping Subproblems in Recursive Tree',
    input: 'fib(5) = fib(4) + fib(3)',
    steps: [
      { step: 1, action: 'Expand fib(5)', state: 'Needs fib(4) and fib(3)', explanation: 'Root splits.' },
      { step: 2, action: 'Expand fib(4)', state: 'Needs fib(3) and fib(2)', explanation: 'Notice: fib(3) is needed BOTH by fib(5) AND fib(4)!' },
      { step: 3, action: 'Naive tree', state: 'Calculates fib(3) twice, fib(2) three times, fib(1) five times', explanation: 'Total 15 function calls for n=5 (exponential O(2^n)).' },
      { step: 4, action: 'DP memoization', state: 'Computes each state {0, 1, 2, 3, 4, 5} exactly ONCE', explanation: 'Total 6 operations (linear O(n)).' }
    ],
    finalOutput: 'Exponential O(1.618^n) reduced to linear O(n).'
  },
  visualExplanation: {
    title: 'DAG of Subproblem Dependencies',
    description: 'Visualizing recursion tree collapsing into a directed acyclic graph (DAG) where nodes share cached outputs.',
    features: ['Duplicate tree branches merged into single DAG nodes', 'Arrows indicate evaluation dependency flow']
  },
  pseudocode: {
    title: 'DP 4-Step Framework',
    code: `// 1. State: dp[i] = answer for subproblem of size i
// 2. Base case: dp[0] = base0, dp[1] = base1
// 3. Transition: dp[i] = f(dp[i-1], dp[i-2], ...)
// 4. Return: dp[n]`
  },
  pythonCode: {
    title: 'Python Naive vs Memoized vs Tabulated Fibonacci',
    code: `def fib_memo(n: int, memo: dict = None) -> int:
    if memo is None: memo = {}
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

def fib_tabulation(n: int) -> int:
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
    explanation: 'Contrasts top-down memoization with bottom-up iterative tabulation.'
  },
  runnableCode: {
    code: `print(fib_memo(10))
print(fib_tabulation(10))`,
    expectedOutput: `55\n55`
  },
  lineByLineExplanation: [
    { line: 3, code: 'if n in memo: return memo[n]', explanation: 'Instant O(1) cache lookup: skips recomputing entire recursive subtrees.' },
    { line: 5, code: 'memo[n] = ...', explanation: 'Stores calculated result in memo before returning.' }
  ],
  edgeCases: [
    { case: 'Base cases n=0, n=1', handling: 'Handled explicitly before loop or recursion begins.', example: 'n = 0' }
  ],
  commonMistakes: [
    { mistake: 'Attempting DP when subproblems are not overlapping (e.g. Merge Sort)', solution: 'Merge Sort subproblems are completely independent partitions; DP is only needed when subproblems overlap and repeat.', codeExample: '# Merge Sort is Divide-and-Conquer, not DP' }
  ],
  applications: [
    { industry: 'Bioinformatics', application: 'DNA/RNA sequence alignment (Needleman-Wunsch)', benefit: 'Finds optimal genetic mutation alignments across millions of base pairs.' }
  ],
  practiceQuestions: [
    { id: 'pq-dpf-1', question: 'What is the difference between Divide-and-Conquer and Dynamic Programming?', hint: 'Consider subproblem overlap.', answer: 'Divide-and-Conquer divides problems into INDEPENDENT subproblems (no overlap, e.g. Merge Sort). DP solves subproblems that OVERLAP and share identical subproblems.' }
  ],
  quiz: [
    { id: 'q-dpf-1', question: 'Which two properties are essential for a problem to be solved using Dynamic Programming?', options: ['Optimal Substructure and Overlapping Subproblems', 'Greedy Choice and Binary Search', 'Sorting and Pointers', 'Graph representation and Trees'], correctIndex: 0, explanation: 'DP requires that the optimal solution is built from optimal subproblems, and that those subproblems repeat multiple times.' }
  ],
  codingChallenge: {
    title: 'Climbing Stairs',
    problem: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    hints: ['ways(n) = ways(n-1) + ways(n-2); identical to Fibonacci.'],
    starterCode: `def climb_stairs(n: int) -> int:
    # TODO: Find number of ways to climb stairs
    pass`,
    solution: `def climb_stairs(n: int) -> int:
    if n <= 2: return n
    prev2 = 1
    prev1 = 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1`
  },
  summary: {
    keyTakeaways: ['DP requires Optimal Substructure and Overlapping Subproblems.', 'Formulate state, transition recurrence, base cases, and filling order.'],
    nextLessonId: 'dsa-dp-memoization-tabulation',
    nextLessonTitle: 'Memoization vs Tabulation',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-dp-memoization-tabulation'] = {
  id: 'dsa-dp-memoization-tabulation',
  moduleId: 'dsa-module-11',
  title: 'Memoization vs Tabulation',
  subtitle: 'Top-Down Recursive Caching vs Bottom-Up Iterative State Filling',
  order: 5,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'dp-table',
  objectives: [
    'Contrast Top-Down Memoization (recursive, demand-driven) with Bottom-Up Tabulation (iterative, dependency-driven).',
    'Evaluate stack overflow risks in deep recursion.',
    'Execute State Space Reduction: compressing O(n) or O(n²) memory to O(1) or O(n).',
    'Implement Python @functools.lru_cache for automated memoization.'
  ],
  prerequisites: ['Dynamic Programming Fundamentals'],
  analogy: {
    title: 'On-Demand Homework Answers vs Filling Out the Workbook in Order',
    text: 'A student can solve a math workbook in two ways: (1) Flip to problem #50. Realize it needs problem #48, so solve #48, which needs #46, only solving what is strictly demanded (Top-Down Memoization); or (2) Start on page 1, solve #1, #2, #3 sequentially in a tidy table until reaching #50 (Bottom-Up Tabulation).',
    metaphor: 'Memoization solves subproblems on-demand; Tabulation computes all states systematically from the ground up.'
  },
  problemSolved: {
    title: 'Architecting High-Performance, Memory-Efficient DP Solutions',
    description: 'Top-down memoization is natural to write but incurs recursion stack overhead. Bottom-up tabulation avoids recursion completely and enables rolling memory optimizations, often cutting space complexity by a full order of magnitude.',
    keyPoints: [
      'Top-Down: Solves only needed subproblems; risk of stack overflow.',
      'Bottom-Up: No recursion overhead; easy to optimize memory.',
      'Space rolling reduces 2D tables O(m*n) to 1D vectors O(n).'
    ]
  },
  intuition: {
    overview: 'In tabulation, order states by dependency (e.g. smaller indices first). If state dp[i] only depends on dp[i-1] and dp[i-2], you only need 2 variables, dropping memory from O(n) to O(1).',
    steps: [
      { step: 1, title: 'Dependency Analysis', description: 'Inspect transition: does dp[i][j] only need previous row dp[i-1]?' },
      { step: 2, title: 'Allocate Minimal State', description: 'Allocate 1D array instead of full 2D table.' },
      { step: 3, title: 'In-Place Update', description: 'Iterate backwards or use two rows (prev and curr).' }
    ]
  },
  formalDefinition: {
    text: 'Memoization evaluates the subproblem DAG top-down via DFS with memo lookup in O(1). Tabulation evaluates the subproblem DAG in topological sort order bottom-up, eliminating call stack frames.',
    latex: '\\text{Space}(\\text{Tabulation Rolling}) = \\mathcal{O}(\\text{max dependency reach}) \\ll \\mathcal{O}(|V_{\\text{DAG}}|)'
  },
  complexity: {
    overview: 'Both have identical asymptotic time complexity. Tabulation often enables superior space optimizations.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(1)', explanation: 'Tabulation with space rolling.' },
      { case: 'Average', time: 'O(n)', space: 'O(n)', explanation: 'Standard 1D memoization or table.' },
      { case: 'Worst', time: 'O(n²)', space: 'O(n²)', explanation: 'Full 2D grid DP.' }
    ],
    spaceNote: 'Rolling array compresses space by eliminating historical rows.'
  },
  workedExample: {
    title: 'Space Rolling on Fibonacci',
    input: 'n = 5',
    steps: [
      { step: 1, action: 'Full Table', state: 'dp = [0, 1, 1, 2, 3, 5] -> O(n) memory', explanation: 'Stores all 6 elements.' },
      { step: 2, action: 'Rolling Variables', state: 'prev2=0, prev1=1', explanation: 'Only 2 integers needed.' },
      { step: 3, action: 'Slide forward', state: 'curr = 0+1=1 -> prev2=1, prev1=1', explanation: 'Constant O(1) space.' }
    ],
    finalOutput: 'Memory reduced from O(n) to O(1).'
  },
  visualExplanation: {
    title: 'Table Filling Order vs Recursive Stack',
    description: 'Visualizing grid cells filling left-to-right row-by-row vs recursion call stack push/pops.',
    features: ['Tabulation fills clean green matrix', 'Only current and previous row retained in memory']
  },
  pseudocode: {
    title: 'Space-Optimized Tabulation Pattern',
    code: `function solveTabulation(n):
    prev2 = base0
    prev1 = base1
    for i from 2 to n:
        curr = transition(prev1, prev2)
        prev2 = prev1
        prev1 = curr
    return prev1`
  },
  pythonCode: {
    title: 'Python Memoization vs Space-Optimized Tabulation',
    code: `from functools import lru_cache

# Top-Down with automated decorator
@lru_cache(maxsize=None)
def fib_top_down(n: int) -> int:
    if n <= 1:
        return n
    return fib_top_down(n - 1) + fib_top_down(n - 2)

# Bottom-Up with O(1) space
def fib_bottom_up_o1(n: int) -> int:
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
    explanation: 'Demonstrates Python lru_cache for rapid prototyping vs O(1) space rolling.'
  },
  runnableCode: {
    code: `print(fib_top_down(10))
print(fib_bottom_up_o1(10))`,
    expectedOutput: `55\n55`
  },
  lineByLineExplanation: [
    { line: 4, code: '@lru_cache(maxsize=None)', explanation: 'Python built-in memoizer: caches arguments and return values in an internal C-level hash map.' },
    { line: 15, code: 'a, b = b, a + b', explanation: 'Simultaneous tuple assignment rolls memory forward in O(1) space without temporary variables.' }
  ],
  edgeCases: [
    { case: 'Large n (e.g. n=50,000)', handling: 'Top-down raises RecursionError: maximum recursion depth exceeded. Bottom-up executes in milliseconds.', example: 'n = 50000' }
  ],
  commonMistakes: [
    { mistake: 'Retaining an entire N x M matrix when each row only depends on the previous row', solution: 'Keep only two rows (or one row iterating backwards) to drop space from O(N*M) to O(M).', codeExample: 'prev_row = [0] * M; curr_row = [0] * M' }
  ],
  applications: [
    { industry: 'High-Frequency Trading', application: 'Order book execution algorithms', benefit: 'Zero recursion overhead and tight CPU cache footprint.' }
  ],
  practiceQuestions: [
    { id: 'pq-mt-1', question: 'When is Top-Down Memoization strictly faster than Bottom-Up Tabulation?', hint: 'Consider sparse state spaces.', answer: 'When only a small fraction of the total possible states in the DP table are ever reachable, memoization computes only the visited states, while tabulation blindly computes all of them.' }
  ],
  quiz: [
    { id: 'q-mt-1', question: 'What is the primary risk of using Top-Down Memoization on deep inputs in Python?', options: ['RecursionError: maximum recursion depth exceeded', 'Memory leaks', 'Syntax error', 'Infinite CPU lockup'], correctIndex: 0, explanation: 'CPython has a default call stack limit (usually 1,000 frames); deep recursion exceeds this limit unless increased.' }
  ],
  codingChallenge: {
    title: 'House Robber (O(1) Space Tabulation)',
    problem: 'You are planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected; robbing two adjacent houses will alert the police. Determine the maximum amount of money you can rob tonight without alerting the police.',
    hints: ['dp[i] = max(dp[i-1], dp[i-2] + nums[i]); optimize with two variables rob1 and rob2.'],
    starterCode: `def rob(nums: list[int]) -> int:
    # TODO: Optimize to O(1) space
    pass`,
    solution: `def rob(nums: list[int]) -> int:
    rob1 = 0
    rob2 = 0
    for num in nums:
        new_rob = max(rob2, rob1 + num)
        rob1 = rob2
        rob2 = new_rob
    return rob2`
  },
  summary: {
    keyTakeaways: ['Memoization is demand-driven and recursive; Tabulation is dependency-driven and iterative.', 'Space rolling compresses table memory by retaining only immediately required prior states.'],
    nextLessonId: 'dsa-dp-fibonacci',
    nextLessonTitle: 'Fibonacci and Climbing Stairs',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-dp-fibonacci'] = {
  id: 'dsa-dp-fibonacci',
  moduleId: 'dsa-module-11',
  title: 'Fibonacci and Climbing Stairs',
  subtitle: 'Linear 1D Transitions, State Machines, and Matrix Exponentiation in O(log n)',
  order: 6,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'dp-table',
  objectives: [
    'Model sequential step transitions using 1D state recurrences.',
    'Solve Climbing Stairs, House Robber, and Decode Ways using the same underlying family.',
    'Execute space optimization reducing 1D arrays to 2 scalar variables in O(1) memory.',
    'Understand Matrix Exponentiation to compute the nth Fibonacci number in O(log n) time.'
  ],
  prerequisites: ['Dynamic Programming Fundamentals'],
  analogy: {
    title: 'Hopping Along Stepping Stones Across a River',
    text: 'To cross a stream, you stand on stepping stone i. You can reach stone i either by making a single 1-step hop from stone i-1, or a long 2-step jump from stone i-2. The total number of distinct routes to stone i is simply the sum of all routes to stone i-1 plus all routes to stone i-2.',
    metaphor: 'Every state is fed by the sum of its immediate predecessor states.'
  },
  problemSolved: {
    title: 'Solving Linear Recurrences in Constant Auxiliary Memory',
    description: 'Many fundamental algorithmic problems follow linear lookback recurrences. Recognizing this family allows solving a wide variety of LeetCode problems in strictly O(n) time and O(1) space.',
    keyPoints: [
      'Recurrence: dp[i] = dp[i-1] + dp[i-2].',
      'Requires only 2 variables for O(1) memory.',
      'Matrix exponentiation achieves O(log n) time for giant n (n = 10^18).'
    ]
  },
  intuition: {
    overview: 'To reach step n, your final jump was either from step n-1 (1 step) or step n-2 (2 steps). Thus, total ways to reach step n is ways(n-1) + ways(n-2).',
    steps: [
      { step: 1, title: 'Identify Base Cases', description: 'ways(1) = 1, ways(2) = 2.' },
      { step: 2, title: 'Transition', description: 'ways(i) = ways(i-1) + ways(i-2).' },
      { step: 3, title: 'Space Optimization', description: 'Maintain prev1 and prev2; advance both in loop.' }
    ]
  },
  formalDefinition: {
    text: 'The Fibonacci sequence F_n satisfies F_0 = 0, F_1 = 1, and F_n = F_{n-1} + F_{n-2} for n \\ge 2. In matrix form, [[F_{n+1}, F_n], [F_n, F_{n-1}]] = [[1, 1], [1, 0]]^n.',
    latex: '\\begin{pmatrix} F_{n+1} & F_n \\\\ F_n & F_{n-1} \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}^n \\implies \\mathcal{O}(\\log n) \\text{ via binary exponentiation}'
  },
  complexity: {
    overview: 'Standard DP: O(n) time, O(1) space. Matrix Exponentiation: O(log n) time.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Base cases n <= 2.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Linear loop.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Single pass of n iterations.' }
    ],
    spaceNote: 'Strictly O(1) scalar memory.'
  },
  workedExample: {
    title: 'Climbing Stairs for n = 4',
    input: 'n = 4 steps',
    steps: [
      { step: 1, action: 'Step 1', state: '1 way: [1]', explanation: 'Base case.' },
      { step: 2, action: 'Step 2', state: '2 ways: [1, 1], [2]', explanation: 'Base case.' },
      { step: 3, action: 'Step 3', state: 'ways(2) + ways(1) = 2 + 1 = 3 ways: [1,1,1], [1,2], [2,1]', explanation: 'Computed from 1 and 2.' },
      { step: 4, action: 'Step 4', state: 'ways(3) + ways(2) = 3 + 2 = 5 ways', explanation: 'Computed from 2 and 3.' }
    ],
    finalOutput: '5 distinct ways'
  },
  visualExplanation: {
    title: 'Binary Tree Branching vs Sliding Window Addition',
    description: 'Visualizing exponential decision tree collapsing into a 2-element sliding addition bar.',
    features: ['Sliding 2-element window advances across array', 'Each new cell is sum of previous two cells']
  },
  pseudocode: {
    title: 'Climbing Stairs O(1) Space',
    code: `function climbStairs(n):
    if n <= 2: return n
    first = 1
    second = 2
    for i from 3 to n:
        third = first + second
        first = second
        second = third
    return second`
  },
  pythonCode: {
    title: 'Python Fibonacci and Matrix Exponentiation',
    code: `def climb_stairs(n: int) -> int:
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

def fib_log_n(n: int) -> int:
    # O(log n) via 2x2 matrix multiplication
    def multiply(A, B):
        return [
            [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],
            [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]
        ]

    def power(M, p):
        res = [[1, 0], [0, 1]] # Identity matrix
        base = M
        while p > 0:
            if p % 2 == 1:
                res = multiply(res, base)
            base = multiply(base, base)
            p //= 2
        return res

    if n == 0: return 0
    T = [[1, 1], [1, 0]]
    result_matrix = power(T, n - 1)
    return result_matrix[0][0]`,
    explanation: 'Linear O(1) space climbing stairs and O(log n) matrix exponentiation for large Fibonacci numbers.'
  },
  runnableCode: {
    code: `print(climb_stairs(4)) # 5
print(fib_log_n(10))   # 55
print(fib_log_n(20))   # 6765`,
    expectedOutput: `5\n55\n6765`
  },
  lineByLineExplanation: [
    { line: 5, code: 'a, b = b, a + b', explanation: 'Advances sliding window state in a single Python instruction.' },
    { line: 20, code: 'base = multiply(base, base)', explanation: 'Binary exponentiation squares the matrix at each step, halving power p in O(log n) time.' }
  ],
  edgeCases: [
    { case: 'n = 1', handling: 'Guarded by if n <= 2, returns 1 immediately.', example: 'n = 1' }
  ],
  commonMistakes: [
    { mistake: 'Allocating an array of size n + 1 when only 2 numbers are ever referenced', solution: 'Use two variables a, b to save memory and avoid allocation overhead.', codeExample: 'a, b = 1, 2' }
  ],
  applications: [
    { industry: 'Game Theory', application: 'Tiling problems and step sequence counting', benefit: 'Instantly computes path combinations for grid steps.' }
  ],
  practiceQuestions: [
    { id: 'pq-fs-1', question: 'How does the problem change if you can take 1, 2, or 3 steps at a time (Tribonacci)?', hint: 'Look back 3 steps.', answer: 'The recurrence becomes dp[i] = dp[i-1] + dp[i-2] + dp[i-3], requiring 3 rolling variables.' }
  ],
  quiz: [
    { id: 'q-fs-1', question: 'What is the time complexity to compute the nth Fibonacci number using Matrix Exponentiation?', options: ['O(log n)', 'O(n)', 'O(1)', 'O(n²)'], correctIndex: 0, explanation: 'Binary exponentiation doubles the power of the matrix in each step, taking O(log n) 2x2 matrix multiplications.' }
  ],
  codingChallenge: {
    title: 'Min Cost Climbing Stairs',
    problem: 'You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can climb either 1 or 2 steps. You can start from index 0 or 1. Return the minimum cost to reach the top of the floor.',
    hints: ['dp[i] = cost[i] + min(dp[i+1], dp[i+2]) iterating backwards.'],
    starterCode: `def min_cost_climbing_stairs(cost: list[int]) -> int:
    # TODO: Find minimum cost to climb stairs
    pass`,
    solution: `def min_cost_climbing_stairs(cost: list[int]) -> int:
    c1, c2 = 0, 0
    for c in reversed(cost):
        curr = c + min(c1, c2)
        c2 = c1
        c1 = curr
    return min(c1, c2)`
  },
  summary: {
    keyTakeaways: ['Climbing stairs maps directly to Fibonacci linear recurrence.', 'Can be solved in O(n) time with O(1) space or O(log n) time via matrix exponentiation.'],
    nextLessonId: 'dsa-dp-coin-change',
    nextLessonTitle: 'Coin Change Problem',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-dp-coin-change'] = {
  id: 'dsa-dp-coin-change',
  moduleId: 'dsa-module-11',
  title: 'Coin Change Problem',
  subtitle: 'Unbounded Knapsack Pattern, Minimum Coins, and Number of Ways',
  order: 7,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'dp-table',
  objectives: [
    'Solve Coin Change I (fewest coins to make amount) in O(amount * n) time.',
    'Solve Coin Change II (number of combinations to make amount).',
    'Differentiate combinations vs permutations loop ordering (coins outer vs amount outer).',
    'Initialize DP tables with sentinel infinity vs 0.'
  ],
  prerequisites: ['Dynamic Programming Fundamentals', 'Greedy Strategy and Correctness Intuition'],
  analogy: {
    title: 'The Unforgiving Vending Machine',
    text: 'A vending machine only accepts strange token denominations: 2-dollar and 5-dollar tokens. To pay an exact 7-dollar bill, you cannot use greedy 5-dollar choice twice. The machine computes the minimum tokens needed by checking every possible coin transition.',
    metaphor: 'dp[amount] explores transitions across all available coin denominations.'
  },
  problemSolved: {
    title: 'Optimal Change Making for Arbitrary Denominations',
    description: 'Greedy change-making fails on non-canonical currency systems. Dynamic programming guarantees the exact minimal coin count in O(amount * len(coins)) time.',
    keyPoints: [
      'Unbounded knapsack: each coin denomination can be reused infinitely.',
      'Fewest coins: dp[i] = min(dp[i], 1 + dp[i - coin]).',
      'Number of combinations: outer loop over coins prevents duplicate permutations.'
    ]
  },
  intuition: {
    overview: 'Let dp[a] be the minimum coins to make amount a. dp[0] = 0, all others inf. For amount a from 1 to target: for coin in coins: if a >= coin: dp[a] = min(dp[a], 1 + dp[a - coin]).',
    steps: [
      { step: 1, title: 'Initialize Table', description: 'dp = [inf] * (amount + 1); dp[0] = 0.' },
      { step: 2, title: 'Iterate Amounts', description: 'For a in 1..amount: try each coin c.' },
      { step: 3, title: 'Transition', description: 'If a - c >= 0: dp[a] = min(dp[a], 1 + dp[a - c]).' }
    ]
  },
  formalDefinition: {
    text: 'Let C = \\{c_1, c_2, ..., c_k\\}. Recurrence for minimum coins: dp[a] = 1 + \\min_{c \\in C, c \\le a} dp[a - c], with base case dp[0] = 0 and dp[a < 0] = \\infty.',
    latex: 'dp[a] = \\begin{cases} 0 & \\text{if } a = 0 \\\\ 1 + \\min_{c \\in C : c \\le a} dp[a - c] & \\text{if } a > 0 \\end{cases}'
  },
  complexity: {
    overview: 'Time: O(amount * len(coins)). Space: O(amount).',
    cases: [
      { case: 'Best', time: 'O(amount * n)', space: 'O(amount)', explanation: 'Pseudopolynomial in amount.' },
      { case: 'Average', time: 'O(amount * n)', space: 'O(amount)', explanation: 'Fills 1D array of size amount + 1.' },
      { case: 'Worst', time: 'O(amount * n)', space: 'O(amount)', explanation: 'Unbounded coin reuse.' }
    ],
    spaceNote: 'O(amount) 1D table.'
  },
  workedExample: {
    title: 'Fewest Coins for Amount = 11 with Coins [1, 2, 5]',
    input: 'coins = [1, 2, 5], amount = 11',
    steps: [
      { step: 1, action: 'dp[0] = 0', state: 'Base case', explanation: '0 coins for 0 amount.' },
      { step: 2, action: 'Compute dp[1..5]', state: 'dp[1]=1, dp[2]=1, dp[3]=2, dp[4]=2, dp[5]=1', explanation: 'Uses 5 directly.' },
      { step: 3, action: 'Compute dp[10]', state: '1 + dp[5] = 1 + 1 = 2 (two 5s)', explanation: '5 + 5.' },
      { step: 4, action: 'Compute dp[11]', state: '1 + dp[10] = 1 + 2 = 3 (coins 5, 5, 1)', explanation: 'Minimum coins = 3.' }
    ],
    finalOutput: '3 coins (5 + 5 + 1)'
  },
  visualExplanation: {
    title: 'DP Table Unbounded Transitions',
    description: 'Visualizing 1D array where each cell looks back by coin steps to find the smallest previous value.',
    features: ['Lookback arrows to i - 1, i - 2, and i - 5', 'Cell adopts min value + 1']
  },
  pseudocode: {
    title: 'Coin Change Minimum Coins',
    code: `function coinChange(coins, amount):
    dp = array of size amount + 1 filled with infinity
    dp[0] = 0
    for a from 1 to amount:
        for c in coins:
            if a >= c and dp[a - c] != infinity:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != infinity else -1`
  },
  pythonCode: {
    title: 'Python Coin Change I and II',
    code: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for a in range(1, amount + 1):
        for c in coins:
            if a >= c:
                dp[a] = min(dp[a], 1 + dp[a - c])
                
    return dp[amount] if dp[amount] != float('inf') else -1

def change_combinations(amount: int, coins: list[int]) -> int:
    # Coin Change II: Number of combinations
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    # Outer loop over coins prevents duplicate permutations
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
            
    return dp[amount]`,
    explanation: 'Coin Change I finds min coins; Coin Change II counts distinct combinations.'
  },
  runnableCode: {
    code: `print(coin_change([1, 2, 5], 11))       # 3
print(change_combinations(5, [1, 2, 5])) # 4 combinations: [5], [2,2,1], [2,1,1,1], [1,1,1,1,1]`,
    expectedOutput: `3\n4`
  },
  lineByLineExplanation: [
    { line: 8, code: 'dp[a] = min(dp[a], 1 + dp[a - c])', explanation: 'Takes 1 coin of denomination c and looks up best answer for remaining amount a - c.' },
    { line: 18, code: 'for c in coins: for a in range(c, amount + 1):', explanation: 'In Coin Change II, coins MUST be the outer loop to count combinations; amount outer loop would count permutations.' }
  ],
  edgeCases: [
    { case: 'amount = 0', handling: 'Returns 0 coins immediately.', example: 'amount = 0 -> 0' },
    { case: 'Impossible to make amount', handling: 'dp[amount] remains float("inf"); returns -1.', example: 'coins=[2], amount=3 -> -1' }
  ],
  commonMistakes: [
    { mistake: 'Swapping loop order in Coin Change II (amount outer, coins inner)', solution: 'Amounts outer loop counts permutations (where [1, 2] and [2, 1] are counted twice); coins outer loop counts unique combinations.', codeExample: 'for c in coins: # for combinations' }
  ],
  applications: [
    { industry: 'Finance & Banking', application: 'Cash register inventory optimization and ATM dispenser calibration', benefit: 'Dispenses minimum physical notes to customers.' }
  ],
  practiceQuestions: [
    { id: 'pq-cc-1', question: 'Why is Coin Change classified as pseudopolynomial time rather than polynomial time?', hint: 'Consider the size of the input in binary.', answer: 'The runtime O(amount * n) depends on the numerical value of "amount", not its bit-length log2(amount). When measured in input bit size B, amount = 2^B, making it exponential in input length.' }
  ],
  quiz: [
    { id: 'q-cc-1', question: 'In Coin Change II (number of ways), why must the `coins` loop be the OUTER loop?', options: ['To enforce non-decreasing order of coins and count combinations instead of permutations', 'To avoid index errors', 'Because Python lists iterate faster', 'To save memory'], correctIndex: 0, explanation: 'Looping over coins externally considers each denomination once in order, preventing arrangements like (1, 2) and (2, 1) from being counted as distinct.' }
  ],
  codingChallenge: {
    title: 'Perfect Squares',
    problem: 'Given an integer n, return the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) that sum to n.',
    hints: ['Model as Coin Change where available coins are all square numbers <= n.'],
    starterCode: `def num_squares(n: int) -> int:
    # TODO: Find least number of perfect squares
    pass`,
    solution: `def num_squares(n: int) -> int:
    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    squares = [i * i for i in range(1, int(n**0.5) + 1)]
    for i in range(1, n + 1):
        for sq in squares:
            if i < sq: break
            dp[i] = min(dp[i], 1 + dp[i - sq])
    return dp[n]`
  },
  summary: {
    keyTakeaways: ['Coin Change I finds minimum coins in O(amount * n).', 'Coin Change II loops over coins externally to count combinations without permutations.'],
    nextLessonId: 'dsa-dp-knapsack-01',
    nextLessonTitle: '0/1 Knapsack Problem',
    nextLessonModuleId: 'dsa-module-11'
  }
};

const dsa11Part1Path = path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-11.ts');
writeModuleFile(dsa11Part1Path, m11.data, m11Lessons);
console.log('Module 11 Part 1 authored: ' + Object.keys(m11Lessons).length);
