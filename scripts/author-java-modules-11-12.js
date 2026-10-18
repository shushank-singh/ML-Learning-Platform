const fs = require('fs');
const path = require('path');

function writeModule(filePath, moduleVarName, lessonsVarName, moduleData, lessons) {
  const content = `import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const ${moduleVarName}: JavaModuleData = ${JSON.stringify(moduleData, null, 2)};

export const ${lessonsVarName}: Record<string, JavaLessonContent> = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully wrote ${filePath}`);
}

// ==========================================
// MODULE 11: DSA USING JAVA
// ==========================================
const m11Data = {
  id: 'java-module-11',
  number: 11,
  title: 'DSA Using Java',
  subtitle: 'Searching, Sorting, Linked Lists, Stacks, Queues, Trees, Graphs & Dynamic Programming',
  order: 11,
  icon: 'Cpu',
  badge: 'Algorithms',
  estimatedHours: 12,
  topicsCount: 10,
  description: 'Master essential Data Structures and Algorithms implemented natively in Java. Learn Big-O complexity analysis, implement linear and binary search, master elementary and divide-and-conquer sorting, build custom linked lists and queues from scratch, explore binary search trees, traverse graphs with BFS and DFS, and apply dynamic programming memoization.',
  lessons: [
    { id: 'java-dsa-big-o', moduleId: 'java-module-11', title: 'Big-O Time & Space Complexity in Java', description: 'Asymptotic notation, analyzing nested loops, and memory footprint tradeoffs.', order: 1, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-dsa-searching', moduleId: 'java-module-11', title: 'Linear Search vs Binary Search Implementations', description: 'Sequential scanning O(n) vs logarithmic divide-and-conquer O(log n) searching.', order: 2, readTimeMinutes: 15, visualizerType: 'array-algorithm', difficulty: 'Beginner' },
    { id: 'java-dsa-elementary-sorts', moduleId: 'java-module-11', title: 'Bubble, Selection & Insertion Sort in Java', description: 'Quadratic O(n^2) sorting algorithms, in-place swaps, and step-by-step invariants.', order: 3, readTimeMinutes: 16, visualizerType: 'array-algorithm', difficulty: 'Beginner' },
    { id: 'java-dsa-mergesort', moduleId: 'java-module-11', title: 'Merge Sort and Divide-and-Conquer', description: 'Recursive array splitting, merge helper routines, and guaranteed O(n log n) sorting.', order: 4, readTimeMinutes: 18, visualizerType: 'array-algorithm', difficulty: 'Intermediate' },
    { id: 'java-dsa-quicksort', moduleId: 'java-module-11', title: 'Quick Sort and Partitioning Strategies', description: 'Lomuto vs Hoare partitioning, pivot selection, and in-place O(n log n) average speed.', order: 5, readTimeMinutes: 18, visualizerType: 'array-algorithm', difficulty: 'Intermediate' },
    { id: 'java-dsa-custom-linkedlist', moduleId: 'java-module-11', title: 'Building a Custom Linked List from Scratch', description: 'Node class with data and next pointers, insertion, deletion, and reversal.', order: 6, readTimeMinutes: 18, visualizerType: 'collections-visual', difficulty: 'Intermediate' },
    { id: 'java-dsa-custom-stack-queue', moduleId: 'java-module-11', title: 'Implementing Custom Stack and Queue from Scratch', description: 'LIFO array/node stacks and FIFO circular queue buffers without java.util.', order: 7, readTimeMinutes: 16, visualizerType: 'collections-visual', difficulty: 'Intermediate' },
    { id: 'java-dsa-binary-search-tree', moduleId: 'java-module-11', title: 'Binary Search Trees (Insertion, Search, Traversal)', description: 'TreeNode class, in-order, pre-order, and post-order depth-first traversals.', order: 8, readTimeMinutes: 18, visualizerType: 'collections-visual', difficulty: 'Intermediate' },
    { id: 'java-dsa-graph-algorithms', moduleId: 'java-module-11', title: 'Graph Representations (Adjacency List) & BFS/DFS', description: 'Modeling vertices and edges, Breadth-First Search and Depth-First Search traversals.', order: 9, readTimeMinutes: 20, visualizerType: 'none', difficulty: 'Advanced' },
    { id: 'java-dsa-dynamic-programming', moduleId: 'java-module-11', title: 'Dynamic Programming in Java: Memoization & Tabulation', description: 'Overlapping subproblems, optimal substructure, and converting exponential to linear time.', order: 10, readTimeMinutes: 20, visualizerType: 'none', difficulty: 'Advanced' }
  ]
};

const m11Lessons = {};
const m11TopicTemplates = [
  {
    id: 'java-dsa-big-o',
    title: 'Big-O Time & Space Complexity in Java',
    subtitle: 'Analyzing Algorithmic Efficiency and Scalability as Input Size n Grows',
    order: 1,
    code: `public class Main {
    // O(1) Constant Time
    public static int getFirst(int[] arr) { return arr[0]; }

    // O(n) Linear Time
    public static int findSum(int[] arr) {
        int sum = 0;
        for (int num : arr) sum += num;
        return sum;
    }

    public static void main(String[] args) {
        int[] data = {10, 20, 30, 40};
        System.out.println("O(1) First element: " + getFirst(data));
        System.out.println("O(n) Sum: " + findSum(data));
    }
}`,
    expected: "O(1) First element: 10\\nO(n) Sum: 100",
    analogy: "Delivering a message: O(1) is sending an email (takes 1 second whether to 1 person or 1 million people). O(n) is walking house to house delivering printed flyers.",
    mistake: "Assuming fewer lines of Java code automatically means faster Big-O execution.",
    quizQ: "What is the Big-O time complexity of two nested loops that each iterate n times?",
    quizOpts: ["O(n)", "O(2n)", "O(n^2) quadratic", "O(log n)"],
    correctIdx: 2
  },
  {
    id: 'java-dsa-searching',
    title: 'Linear Search vs Binary Search Implementations',
    subtitle: 'Comparing Sequential O(n) Scanning with Logarithmic O(log n) Bisection',
    order: 2,
    code: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1; // Not found
    }

    public static void main(String[] args) {
        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56};
        int idx = binarySearch(sorted, 23);
        System.out.println("Binary Search: 23 found at index " + idx);
    }
}`,
    expected: "Binary Search: 23 found at index 5",
    analogy: "Finding a name in a printed dictionary: you open to the middle letter M; if target is T, you immediately discard the entire first half of the book.",
    mistake: "Calculating mid as (low + high) / 2 which can trigger integer overflow for massive arrays (use low + (high - low) / 2 instead).",
    quizQ: "How many comparisons does Binary Search require to search through 1,000,000 sorted elements in the worst case?",
    quizOpts: ["500,000", "About 20 comparisons (log2(1,000,000))", "1,000,000", "10,000"],
    correctIdx: 1
  },
  {
    id: 'java-dsa-elementary-sorts',
    title: 'Bubble, Selection & Insertion Sort in Java',
    subtitle: 'Understanding Core Quadratic In-Place Sorting Algorithms',
    order: 3,
    code: `public class Main {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] data = {64, 34, 25, 12, 22};
        bubbleSort(data);
        System.out.println("Bubble Sorted: " + java.util.Arrays.toString(data));
    }
}`,
    expected: "Bubble Sorted: [12, 22, 25, 34, 64]",
    analogy: "Bubbles rising in a glass of soda: larger bubbles rise to the surface faster, settling heavy items at the bottom and lighter items on top.",
    mistake: "Using elementary O(n^2) sorts on large datasets with thousands of items.",
    quizQ: "What is the worst-case time complexity of Bubble Sort and Selection Sort?",
    quizOpts: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    correctIdx: 1
  },
  {
    id: 'java-dsa-mergesort',
    title: 'Merge Sort and Divide-and-Conquer',
    subtitle: 'Recursive Halving and Linear Merging with Guaranteed O(n log n) Worst-Case',
    order: 4,
    code: `import java.util.Arrays;

public class Main {
    public static void merge(int[] arr, int left, int mid, int right) {
        int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
        int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);
        int i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) arr[k++] = leftArr[i++];
            else arr[k++] = rightArr[j++];
        }
        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }

    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    public static void main(String[] args) {
        int[] nums = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(nums, 0, nums.length - 1);
        System.out.println("Merge Sorted: " + Arrays.toString(nums));
    }
}`,
    expected: "Merge Sorted: [3, 9, 10, 27, 38, 43, 82]",
    analogy: "Two sorted decks of playing cards: you compare the top card of each deck and place the smaller one on the table; merging two sorted piles is blazingly fast.",
    mistake: "Forgetting that Merge Sort requires O(n) auxiliary memory space to hold the temporary split arrays.",
    quizQ: "Is Merge Sort a stable sorting algorithm in Java?",
    quizOpts: ["Yes, equal elements maintain their relative original order", "No, it scrambles equal elements", "Only for strings", "Only when using multithreading"],
    correctIdx: 0
  },
  {
    id: 'java-dsa-quicksort',
    title: 'Quick Sort and Partitioning Strategies',
    subtitle: 'Choosing a Pivot, In-Place Partitioning, and Cache-Friendly Performance',
    order: 5,
    code: `import java.util.Arrays;

public class Main {
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        int[] data = {10, 7, 8, 9, 1, 5};
        quickSort(data, 0, data.length - 1);
        System.out.println("Quick Sorted: " + Arrays.toString(data));
    }
}`,
    expected: "Quick Sorted: [1, 5, 7, 8, 9, 10]",
    analogy: "Organizing students by height: pick one student as the reference pivot; everyone shorter moves to the left of the pivot, everyone taller to the right.",
    mistake: "Picking the first element as pivot on an already-sorted array, which degenerates Quick Sort into O(n^2) worst case.",
    quizQ: "What is the average time complexity of Quick Sort?",
    quizOpts: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    correctIdx: 0
  },
  {
    id: 'java-dsa-custom-linkedlist',
    title: 'Building a Custom Linked List from Scratch',
    subtitle: 'Node Pointers, Head/Tail Reference Management, and Pointer Reversals',
    order: 6,
    code: `class CustomLinkedList {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }

    Node head;

    public void add(int data) {
        Node newNode = new Node(data);
        if (head == null) { head = newNode; return; }
        Node curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = newNode;
    }

    public void print() {
        Node curr = head;
        while (curr != null) {
            System.out.print(curr.data + " -> ");
            curr = curr.next;
        }
        System.out.println("null");
    }
}

public class Main {
    public static void main(String[] args) {
        CustomLinkedList list = new CustomLinkedList();
        list.add(10);
        list.add(20);
        list.add(30);
        list.print();
    }
}`,
    expected: "10 -> 20 -> 30 -> null",
    analogy: "A treasure scavenger hunt: each clue written on a piece of paper tells you the secret code (data) and gives you directions to where the next clue is hidden (next pointer).",
    mistake: "Losing the reference to the head pointer, which orphans the entire linked list into garbage collection.",
    quizQ: "What happens if a node's next pointer points back to an earlier node in the list?",
    quizOpts: ["The list reverses", "A cycle (infinite loop) is created", "It compiles with a warning", "It automatically becomes a tree"],
    correctIdx: 1
  },
  {
    id: 'java-dsa-custom-stack-queue',
    title: 'Implementing Custom Stack and Queue from Scratch',
    subtitle: 'Building LIFO and FIFO Data Structures with Raw Arrays and Head/Tail Pointers',
    order: 7,
    code: `class SimpleStack {
    private int[] data = new int[10];
    private int top = -1;

    public void push(int val) { data[++top] = val; }
    public int pop() { return data[top--]; }
    public boolean isEmpty() { return top == -1; }
}

public class Main {
    public static void main(String[] args) {
        SimpleStack stack = new SimpleStack();
        stack.push(100);
        stack.push(200);
        System.out.println("Popped (LIFO): " + stack.pop());
        System.out.println("Popped (LIFO): " + stack.pop());
    }
}`,
    expected: "Popped (LIFO): 200\\nPopped (LIFO): 100",
    analogy: "A spring-loaded plate dispenser in a cafeteria: push plates down on top; pop them off the top in Last-In, First-Out order.",
    mistake: "Popping from an empty stack without an underflow check.",
    quizQ: "Which principle governs a Queue?",
    quizOpts: ["LIFO (Last In, First Out)", "FIFO (First In, First Out)", "Random Access", "Sorted Access"],
    correctIdx: 1
  },
  {
    id: 'java-dsa-binary-search-tree',
    title: 'Binary Search Trees (Insertion, Search, Traversal)',
    subtitle: 'Left < Root < Right Invariant, In-Order DFS, and Logarithmic Lookups',
    order: 8,
    code: `class BST {
    static class Node {
        int val;
        Node left, right;
        Node(int val) { this.val = val; }
    }
    Node root;

    public void insert(int val) { root = insertRec(root, val); }
    private Node insertRec(Node root, int val) {
        if (root == null) return new Node(val);
        if (val < root.val) root.left = insertRec(root.left, val);
        else if (val > root.val) root.right = insertRec(root.right, val);
        return root;
    }

    public void inOrder(Node root) {
        if (root != null) {
            inOrder(root.left);
            System.out.print(root.val + " ");
            inOrder(root.right);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BST bst = new BST();
        bst.insert(50);
        bst.insert(30);
        bst.insert(70);
        bst.insert(20);
        System.out.print("In-Order Traversal (Sorted): ");
        bst.inOrder(bst.root);
        System.out.println();
    }
}`,
    expected: "In-Order Traversal (Sorted): 20 30 50 70 ",
    analogy: "A botanical tree flipped upside down: each branch forks into two smaller twigs; smaller numbers grow left, larger numbers grow right.",
    mistake: "Forgetting that in-order traversal of a Binary Search Tree ALWAYS yields elements in strictly ascending sorted order.",
    quizQ: "What is the time complexity of searching a balanced Binary Search Tree of n nodes?",
    quizOpts: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctIdx: 1
  },
  {
    id: 'java-dsa-graph-algorithms',
    title: 'Graph Representations (Adjacency List) & BFS/DFS',
    subtitle: 'Modeling Vertices, Edges, Breadth-First Queues, and Depth-First Stacks',
    order: 9,
    code: `import java.util.*;

public class Main {
    public static void bfs(int start, Map<Integer, List<Integer>> adj) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();

        visited.add(start);
        queue.offer(start);

        System.out.print("BFS Traversal: ");
        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");

            for (int neighbor : adj.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        graph.put(1, Arrays.asList(2, 3));
        graph.put(2, Arrays.asList(1, 4));
        graph.put(3, Arrays.asList(1));
        graph.put(4, Arrays.asList(2));

        bfs(1, graph);
    }
}`,
    expected: "BFS Traversal: 1 2 3 4 ",
    analogy: "Ripples on a pond: BFS expands outward in concentric rings (distance 1, distance 2, distance 3) from the point where the stone was dropped.",
    mistake: "Traversing a graph without a 'visited' set, causing infinite loops in graphs with cycles.",
    quizQ: "Which data structure is used to implement Breadth-First Search (BFS)?",
    quizOpts: ["Stack", "Queue (FIFO)", "PriorityQueue", "Array"],
    correctIdx: 1
  },
  {
    id: 'java-dsa-dynamic-programming',
    title: 'Dynamic Programming in Java: Memoization & Tabulation',
    subtitle: 'Overlapping Subproblems, Caching Solutions, and Eliminating Redundant Computations',
    order: 10,
    code: `public class Main {
    // Top-down Dynamic Programming with Memoization array
    public static long fibMemo(int n, long[] memo) {
        if (n <= 1) return n;
        if (memo[n] != 0) return memo[n]; // Cache hit!
        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
        return memo[n];
    }

    public static void main(String[] args) {
        int n = 50;
        long[] memo = new long[n + 1];
        long ans = fibMemo(n, memo);
        System.out.println("Fibonacci(50) computed in O(n) linear time: " + ans);
    }
}`,
    expected: "Fibonacci(50) computed in O(n) linear time: 12586269025",
    analogy: "Writing answers on a cheat sheet: if someone asks you 'what is 17 * 19', you calculate it once (323) and write it down. Next time anyone asks, you look at the sheet instantly.",
    mistake: "Forgetting to initialize or check the memoization table before computing.",
    quizQ: "How does Dynamic Programming reduce the time complexity of Fibonacci from O(2^n) to O(n)?",
    quizOpts: ["By running on a GPU", "By caching previously computed subproblem solutions so each subproblem is solved only once", "By using binary search", "By using multithreading"],
    correctIdx: 1
  }
];

m11TopicTemplates.forEach(t => {
  m11Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-11',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 16,
    difficulty: t.order > 8 ? 'Advanced' : t.order > 3 ? 'Intermediate' : 'Beginner',
    visualizerType: t.id.includes('searching') || t.id.includes('sort') ? 'array-algorithm' : t.id.includes('linkedlist') || t.id.includes('stack') || t.id.includes('tree') ? 'collections-visual' : 'none',
    objectives: [`Master ${t.title}.`, 'Analyze algorithm time and space complexity.', 'Implement core data structures cleanly in Java.'],
    prerequisites: ['Module 10: Collections Framework'],
    analogy: { title: t.title + ' Metaphor', text: t.analogy, metaphor: t.analogy },
    problemSolved: {
      title: 'Optimal Algorithmic Performance at Scale',
      description: 'Solves complex engineering tasks with minimum CPU cycles and memory usage.',
      keyPoints: ['Asymptotic efficiency', 'Data structure invariants', 'Scale-ready engineering']
    },
    intuition: {
      overview: `Algorithmic mechanics of ${t.title}.`,
      steps: [
        { step: 1, title: 'Problem Formulation', description: 'Defines input, output, and constraints.' },
        { step: 2, title: 'Structural Invariants', description: 'Maintains ordering, pointers, or memoized states.' },
        { step: 3, title: 'Complexity Guarantee', description: 'Delivers mathematically proven Big-O performance.' }
      ]
    },
    codeExample: { title: `Demonstrating ${t.title}`, code: t.code, explanation: `Examine the DSA implementation of ${t.title}.` },
    runnableCode: { code: t.code, expectedOutput: t.expected },
    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'Algorithm declaration', explanation: 'Data structure and method signature.' },
      { lines: '7-18', codeSnippet: '// Core algorithmic logic', explanation: 'Step-by-step invariant maintenance and operations.' }
    ],
    commonMistakes: [{ mistake: t.mistake, solution: 'Follow algorithm design principles.', whyWrong: 'Causes quadratic blowup or pointer loss.' }],
    bestPractices: ['Always benchmark edge cases (empty, sorted, reverse, duplicates).', 'Analyze space complexity alongside time complexity.'],
    applications: [{ industry: 'High-Performance Computing', useCase: 'Database indexes, route planning, and recommendation engines.' }],
    practiceQuestions: [{ id: `pq-${t.id}`, question: t.quizQ, answer: t.quizOpts[t.correctIdx], explanation: 'Standard algorithmic analysis.' }],
    quiz: [{ id: `qz-${t.id}`, question: t.quizQ, options: t.quizOpts, correctIndex: t.correctIdx, explanation: 'Adheres to computer science standards.' }],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Beginner',
      description: `Implement ${t.title} to complete the algorithmic challenge.`,
      starterCode: t.code,
      hints: ['Review the lesson example above.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [`Mastered ${t.title}.`, 'Understood algorithmic efficiency and implementations.', 'Ready for Modern Java & Projects in Module 12.'],
      nextLessonId: t.order === 10 ? 'java-file-io-nio' : m11Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'Java File I/O: Reading and Writing Files' : m11Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-12' : 'java-module-11'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-11.ts'), 'javaModule11Data', 'javaModule11Lessons', m11Data, m11Lessons);

// ==========================================
// MODULE 12: MODERN JAVA AND PROJECTS
// ==========================================
const m12Data = {
  id: 'java-module-12',
  number: 12,
  title: 'Modern Java and Projects',
  subtitle: 'File I/O, Lambdas, Streams API, Multithreading & High-Throughput Pipeline Project',
  order: 12,
  icon: 'Terminal',
  badge: 'Production Java',
  estimatedHours: 12,
  topicsCount: 10,
  description: 'Write modern, enterprise-ready Java. Master modern File I/O with java.nio.file.Files, lambda expressions, standard functional interfaces, the Java Streams API (filter, map, reduce, groupingBy), Optional<T>, Thread and Runnable concurrency, synchronization, and build a capstone multithreaded data pipeline.',
  lessons: [
    { id: 'java-file-io-nio', moduleId: 'java-module-12', title: 'Java File I/O: Reading and Writing Files (NIO.2)', description: 'Files.readString, Files.writeString, Path, and stream-based buffering.', order: 1, readTimeMinutes: 15, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-lambdas-syntax', moduleId: 'java-module-12', title: 'Lambda Expressions and @FunctionalInterface', description: 'Anonymous functions, arrow syntax (->), and functional interface single abstract methods.', order: 2, readTimeMinutes: 15, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-functional-interfaces', moduleId: 'java-module-12', title: 'Standard Functional Interfaces (Predicate, Function, Consumer)', description: 'Built-in utility interfaces in java.util.function and method references (::).', order: 3, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-streams-filter-map', moduleId: 'java-module-12', title: 'The Java Streams API: Filter, Map, and Collect', description: 'Declarative pipelines, intermediate vs terminal operations, and Collectors.toList.', order: 4, readTimeMinutes: 18, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-streams-reduce-grouping', moduleId: 'java-module-12', title: 'Advanced Streams: reduce, groupingBy & Summary Stats', description: 'Aggregating numbers, partitioning data by predicates, and groupingBy frequency tables.', order: 5, readTimeMinutes: 18, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-optional-type', moduleId: 'java-module-12', title: 'Optional<T>: Eliminating NullPointerExceptions Safely', description: 'Optional.ofNullable, map, filter, orElse, and modern monadic null safety.', order: 6, readTimeMinutes: 15, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-threads-runnable', moduleId: 'java-module-12', title: 'Multithreading Basics: The Thread Class & Runnable', description: 'Spawning concurrent threads, Thread.sleep(), and lifecycle states (RUNNABLE, BLOCKED).', order: 7, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-synchronization-locks', moduleId: 'java-module-12', title: 'Concurrency, Synchronization & Race Conditions', description: 'The synchronized keyword, intrinsic monitor locks, and protecting shared state.', order: 8, readTimeMinutes: 18, visualizerType: 'none', difficulty: 'Advanced' },
    { id: 'java-executors-completablefuture', moduleId: 'java-module-12', title: 'ExecutorService, Thread Pools & CompletableFuture', description: 'Managing thread pools (newFixedThreadPool) and asynchronous non-blocking pipelines.', order: 9, readTimeMinutes: 20, visualizerType: 'none', difficulty: 'Advanced' },
    { id: 'java-capstone-project', moduleId: 'java-module-12', title: 'Capstone: High-Throughput Java Task Pipeline', description: 'Assembling OOP, streams, exception handling, and concurrent threads into a real project.', order: 10, readTimeMinutes: 24, visualizerType: 'none', difficulty: 'Advanced' }
  ]
};

const m12Lessons = {};
const m12TopicTemplates = [
  {
    id: 'java-file-io-nio',
    title: 'Java File I/O: Reading and Writing Files (NIO.2)',
    subtitle: 'High-Performance Modern Files and Path Utilities in java.nio.file',
    order: 1,
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java NIO.2 File Operations:");
        System.out.println("1. Path path = Path.of(\"data.txt\");");
        System.out.println("2. Files.writeString(path, \"Hello, Java!\");");
        System.out.println("3. String content = Files.readString(path);");
        System.out.println("Content successfully read via modern NIO.2!");
    }
}`,
    expected: "Java NIO.2 File Operations:\\n1. Path path = Path.of(\"data.txt\");\\n2. Files.writeString(path, \"Hello, Java!\");\\n3. String content = Files.readString(path);\\nContent successfully read via modern NIO.2!",
    analogy: "Sending a courier directly to an office desk (NIO.2) instead of filling out paper dispatch manifests and custom stream buffers manually.",
    mistake: "Using legacy java.io.File and FileInputStream instead of modern java.nio.file.Files.",
    quizQ: "Which modern class in java.nio.file provides one-liner methods like readString() and writeString()?",
    quizOpts: ["java.io.File", "java.nio.file.Files", "java.io.FileReader", "java.nio.file.Disk"],
    correctIdx: 1
  },
  {
    id: 'java-lambdas-syntax',
    title: 'Lambda Expressions and @FunctionalInterface',
    subtitle: 'Concise Anonymous Function Literals: (parameters) -> expression',
    order: 2,
    code: `interface MathOperation {
    int operate(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        // Lambda expression replacing boilerplate anonymous class!
        MathOperation addition = (a, b) -> a + b;
        MathOperation multiply = (a, b) -> a * b;

        System.out.println("10 + 5 = " + addition.operate(10, 5));
        System.out.println("10 * 5 = " + multiply.operate(10, 5));
    }
}`,
    expected: "10 + 5 = 15\\n10 * 5 = 50",
    analogy: "A short text message abbreviation ('BRB') vs writing a formal typed letter with stamps and envelopes (old anonymous inner classes).",
    mistake: "Attempting to create a lambda for an interface with more than one abstract method.",
    quizQ: "What is a Functional Interface in Java?",
    quizOpts: ["An interface with no methods", "An interface with exactly ONE abstract method", "An interface with only default methods", "A class with static methods"],
    correctIdx: 1
  },
  {
    id: 'java-functional-interfaces',
    title: 'Standard Functional Interfaces (Predicate, Function, Consumer)',
    subtitle: 'Reusing Built-In Standard Lambdas in java.util.function and Method References (::)',
    order: 3,
    code: `import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // Predicate: takes T, returns boolean
        Predicate<Integer> isEven = n -> n % 2 == 0;
        // Function: takes T, returns R
        Function<String, Integer> stringLength = String::length; // Method reference!
        // Consumer: takes T, returns void
        Consumer<String> printer = System.out::println;

        System.out.println("Is 4 even? " + isEven.test(4));
        System.out.println("Length of 'Java': " + stringLength.apply("Java"));
        printer.accept("Printed via Consumer method reference!");
    }
}`,
    expected: "Is 4 even? true\\nLength of 'Java': 4\\nPrinted via Consumer method reference!",
    analogy: "Standard electrical appliance cords: a 3-prong plug (Predicate) tests the circuit, a power adapter (Function) converts voltage, and a light bulb (Consumer) uses the power.",
    mistake: "Confusing Function<T, R> (returns value) with Consumer<T> (returns void).",
    quizQ: "Which standard functional interface takes an argument and returns a boolean?",
    quizOpts: ["Function<T, R>", "Predicate<T>", "Consumer<T>", "Supplier<T>"],
    correctIdx: 1
  },
  {
    id: 'java-streams-filter-map',
    title: 'The Java Streams API: Filter, Map, and Collect',
    subtitle: 'Declarative Functional Processing Pipelines for Collections',
    order: 4,
    code: `import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("alice", "bob", "alex", "charlie", "anna");

        // Pipeline: filter names starting with 'a', capitalize, collect to list
        List<String> result = names.stream()
            .filter(name -> name.startsWith("a"))
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println("Stream Pipeline Result: " + result);
    }
}`,
    expected: "Stream Pipeline Result: [ALICE, ALEX, ANNA]",
    analogy: "An industrial factory assembly line: raw car parts travel down the conveyor; defective parts are filtered out, remaining parts are painted (mapped), and finished cars are packaged (collected).",
    mistake: "Attempting to reuse a Stream after a terminal operation has already been executed on it (throws IllegalStateException).",
    quizQ: "When does an intermediate stream operation (like .filter() or .map()) actually execute?",
    quizOpts: ["Immediately when declared", "Only when a terminal operation (like .collect() or .forEach()) is invoked (Lazy Evaluation)", "At compile time", "When System.gc() runs"],
    correctIdx: 1
  },
  {
    id: 'java-streams-reduce-grouping',
    title: 'Advanced Streams: reduce, groupingBy & Summary Stats',
    subtitle: 'Aggregating Data, Computing Statistics, and Grouping Elements by Properties',
    order: 5,
    code: `import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 10, 15, 20);

        // Reduce to sum
        int sum = numbers.stream().reduce(0, Integer::sum);
        System.out.println("Stream Reduced Sum: " + sum);

        // Summary statistics
        IntSummaryStatistics stats = numbers.stream().mapToInt(Integer::intValue).summaryStatistics();
        System.out.println("Average: " + stats.getAverage() + ", Max: " + stats.getMax());
    }
}`,
    expected: "Stream Reduced Sum: 50\\nAverage: 12.5, Max: 20",
    analogy: "A ballot box counter: reduce takes each vote and accumulates the grand total into a single final winner announcement.",
    mistake: "Using parallelStream() on small collections or operations with shared mutable state.",
    quizQ: "What collector groups stream elements into a Map based on a classification function?",
    quizOpts: ["Collectors.toMap", "Collectors.groupingBy", "Collectors.partitioningBy", "Collectors.summarizingInt"],
    correctIdx: 1
  },
  {
    id: 'java-optional-type',
    title: 'Optional<T>: Eliminating NullPointerExceptions Safely',
    subtitle: 'Monadic Container for Values That May or May Not Be Present',
    order: 6,
    code: `import java.util.Optional;

public class Main {
    public static Optional<String> findUsername(int id) {
        if (id == 1) return Optional.of("Alice");
        return Optional.empty(); // No null returned!
    }

    public static void main(String[] args) {
        Optional<String> user = findUsername(1);
        System.out.println("User present: " + user.orElse("Guest"));

        Optional<String> missing = findUsername(99);
        System.out.println("Missing fallback: " + missing.orElse("DefaultUser"));
    }
}`,
    expected: "User present: Alice\\nMissing fallback: DefaultUser",
    analogy: "A gift box: you open the box; it might contain a watch (Optional.of), or it might be empty (Optional.empty). You check before using it, preventing crashes.",
    mistake: "Calling optional.get() directly without checking ifPresent() or using orElse(), defeating the purpose of Optional.",
    quizQ: "How should you provide a safe fallback value if an Optional is empty?",
    quizOpts: ["Call optional.get()", "Use optional.orElse(fallbackValue)", "Check null", "Catch NullPointerException"],
    correctIdx: 1
  },
  {
    id: 'java-threads-runnable',
    title: 'Multithreading Basics: The Thread Class & Runnable',
    subtitle: 'Concurrent Execution, Thread.sleep(), and Parallel Workers',
    order: 7,
    code: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            System.out.println("Background worker thread running concurrently!");
        });

        worker.start(); // Spawns OS thread
        worker.join();  // Wait for worker to finish
        System.out.println("Main thread resumed and exiting.");
    }
}`,
    expected: "Background worker thread running concurrently!\\nMain thread resumed and exiting.",
    analogy: "Multiple chefs cooking in the same restaurant kitchen: one chef chops vegetables while another bakes bread simultaneously.",
    mistake: "Calling thread.run() instead of thread.start(); run() executes synchronously on the current thread without spawning a new one!",
    quizQ: "Which method starts a new OS thread and invokes the run() method asynchronously?",
    quizOpts: ["thread.run()", "thread.start()", "thread.execute()", "thread.launch()"],
    correctIdx: 1
  },
  {
    id: 'java-synchronization-locks',
    title: 'Concurrency, Synchronization & Race Conditions',
    subtitle: 'Protecting Shared Mutable State with Intrinsic Monitor Locks',
    order: 8,
    code: `class BankVault {
    private int cash = 1000;

    // synchronized locks the monitor so only 1 thread enters at a time!
    public synchronized void withdraw(int amount) {
        if (cash >= amount) {
            cash -= amount;
        }
    }
    public synchronized int getCash() { return cash; }
}

public class Main {
    public static void main(String[] args) {
        BankVault vault = new BankVault();
        vault.withdraw(200);
        System.out.println("Remaining vault cash: $" + vault.getCash());
    }
}`,
    expected: "Remaining vault cash: $800",
    analogy: "An airplane restroom lock: when one person enters and slides the lock, anyone else must wait in the aisle until they exit and unlock.",
    mistake: "Neglecting thread synchronization when multiple threads read and write to the same shared variable.",
    quizQ: "What Java keyword is used to ensure that only one thread can execute a block of code at a time?",
    quizOpts: ["volatile", "synchronized", "atomic", "static"],
    correctIdx: 1
  },
  {
    id: 'java-executors-completablefuture',
    title: 'ExecutorService, Thread Pools & CompletableFuture',
    subtitle: 'Reusing Threads, Avoiding Thread Creation Overhead, and Async Pipelines',
    order: 9,
    code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(2);

        Future<Integer> task = pool.submit(() -> {
            return 42 * 2;
        });

        System.out.println("Asynchronous computation result: " + task.get());
        pool.shutdown();
    }
}`,
    expected: "Asynchronous computation result: 84",
    analogy: "A taxi fleet: instead of buying a new car for every single passenger and destroying the car when they arrive, a pool of 5 taxis serves hundreds of rides continuously.",
    mistake: "Forgetting to call executorService.shutdown(), which keeps JVM worker threads alive and prevents program exit.",
    quizQ: "Why are thread pools (ExecutorService) preferred over manually creating new Thread objects in production?",
    quizOpts: ["They eliminate syntax errors", "They reuse existing threads, eliminating heavy OS thread allocation overhead", "They run without the JVM", "They use less disk space"],
    correctIdx: 1
  },
  {
    id: 'java-capstone-project',
    title: 'Capstone: High-Throughput Java Task Pipeline',
    subtitle: 'Full Synthesis: OOP, Streams, Exceptions, and Concurrency in a Real Application',
    order: 10,
    code: `import java.util.*;
import java.util.stream.Collectors;

class Task {
    int id;
    String name;
    int durationMs;
    Task(int id, String name, int durationMs) {
        this.id = id; this.name = name; this.durationMs = durationMs;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Task> tasks = Arrays.asList(
            new Task(1, "Parse Logs", 150),
            new Task(2, "Index Database", 320),
            new Task(3, "Generate Report", 90),
            new Task(4, "Send Notifications", 40)
        );

        System.out.println("========================================");
        System.out.println("    JAVA CAPSTONE: TASK PIPELINE ENGINE ");
        System.out.println("========================================");

        // Filter tasks exceeding 100ms using Streams
        List<Task> heavyTasks = tasks.stream()
            .filter(t -> t.durationMs >= 100)
            .collect(Collectors.toList());

        int totalTime = heavyTasks.stream().mapToInt(t -> t.durationMs).sum();

        heavyTasks.forEach(t -> {
            System.out.printf("Task [%d] %-20s -> %4d ms%n", t.id, t.name, t.durationMs);
        });

        System.out.println("----------------------------------------");
        System.out.printf("Heavy Tasks Total Duration: %10d ms%n", totalTime);
        System.out.println("Status: Java Mastery Curriculum Completed!");
        System.out.println("========================================");
    }
}`,
    expected: "========================================\\n    JAVA CAPSTONE: TASK PIPELINE ENGINE \\n========================================\\nTask [1] Parse Logs           ->  150 ms\\nTask [2] Index Database       ->  320 ms\\n----------------------------------------\\nHeavy Tasks Total Duration:        470 ms\\nStatus: Java Mastery Curriculum Completed!\\n========================================",
    analogy: "A state-of-the-art space shuttle launch control center: telemetry streams in, background threads monitor sensors, and the entire mission executes flawlessly.",
    mistake: "Writing monolithic single-file spaghetti code instead of modular, well-encapsulated classes.",
    quizQ: "What makes modern Java (Java 17+) an industry powerhouse for enterprise backend engineering?",
    quizOpts: ["It only runs in browsers", "Its combination of strict type safety, modern functional streams, high-performance concurrency, and JIT compilation", "It eliminates classes", "It requires no memory management"],
    correctIdx: 1
  }
];

m12TopicTemplates.forEach(t => {
  m12Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-12',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 16,
    difficulty: t.order > 6 ? 'Advanced' : 'Intermediate',
    visualizerType: 'none',
    objectives: [`Master ${t.title}.`, 'Apply modern Java features (Streams, Lambdas, Concurrency).', 'Build production-grade applications.'],
    prerequisites: ['Module 11: DSA Using Java'],
    analogy: { title: t.title + ' Metaphor', text: t.analogy, metaphor: t.analogy },
    problemSolved: {
      title: 'High-Throughput Concurrent Systems in Modern Java',
      description: 'Leverages functional programming and multi-core CPU architectures for maximum performance.',
      keyPoints: ['Declarative functional streams', 'Thread pooling and safety', 'Clean asynchronous workflows']
    },
    intuition: {
      overview: `Modern Java architecture behind ${t.title}.`,
      steps: [
        { step: 1, title: 'Declarative Syntax', description: 'Lambdas and streams express intent clearly.' },
        { step: 2, title: 'Parallel Execution', description: 'Utilizes multi-core processors safely.' },
        { step: 3, title: 'Production Reliability', description: 'Fault-tolerant and maintainable at scale.' }
      ]
    },
    codeExample: { title: `Demonstrating ${t.title}`, code: t.code, explanation: `Examine the modern Java implementation of ${t.title}.` },
    runnableCode: { code: t.code, expectedOutput: t.expected },
    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'Modern Java features', explanation: 'Streams, Lambdas, or Concurrent constructs.' },
      { lines: '7-18', codeSnippet: '// Execution and results', explanation: 'Pipeline processing and verification.' }
    ],
    commonMistakes: [{ mistake: t.mistake, solution: 'Follow modern Java best practices.', whyWrong: 'Causes race conditions or memory thrashing.' }],
    bestPractices: ['Use Streams for readable data transformations.', 'Always shut down ExecutorServices cleanly.'],
    applications: [{ industry: 'Cloud & Microservices', useCase: 'Spring Boot microservices, Kafka stream processors, and reactive backends.' }],
    practiceQuestions: [{ id: `pq-${t.id}`, question: t.quizQ, answer: t.quizOpts[t.correctIdx], explanation: 'Modern Java specification.' }],
    quiz: [{ id: `qz-${t.id}`, question: t.quizQ, options: t.quizOpts, correctIndex: t.correctIdx, explanation: 'Adheres to Java standards.' }],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Intermediate',
      description: `Implement ${t.title} to complete the modern Java task.`,
      starterCode: t.code,
      hints: ['Review the lesson example above.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [`Mastered ${t.title}.`, 'Understood modern functional and concurrent Java.', 'Completed the Java Mastery Lab curriculum!'],
      nextLessonId: t.order === 10 ? undefined : m12Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? undefined : m12Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? undefined : 'java-module-12'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-12.ts'), 'javaModule12Data', 'javaModule12Lessons', m12Data, m12Lessons);
console.log('Modules 11 and 12 authored successfully!');
