import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule5Data: DSAModuleData = {
  "id": "dsa-module-5",
  "number": 5,
  "title": "Stacks and Queues",
  "subtitle": "LIFO/FIFO Structures, Monotonic Patterns & Expression Parsing",
  "description": "Master two of the most versatile abstract data types. Build stacks and queues from scratch, learn monotonic stack and queue patterns for next-greater-element problems, implement the min-stack, and parse arithmetic expressions using postfix notation.",
  "icon": "Layers",
  "badge": "Stacks & Queues",
  "estimatedHours": 6,
  "topicsCount": 8,
  "lessons": [
    {
      "id": "dsa-stack-operations",
      "moduleId": "dsa-module-5",
      "title": "Stack: Operations and Applications",
      "description": "Push, pop, peek, isEmpty — implementing stacks with arrays and linked lists, undo/redo uses.",
      "order": 1,
      "readTimeMinutes": 18,
      "visualizerType": "stack-queue",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-queue-operations",
      "moduleId": "dsa-module-5",
      "title": "Queue and Circular Queue",
      "description": "Enqueue/dequeue, circular buffer implementation, and queue with two stacks.",
      "order": 2,
      "readTimeMinutes": 20,
      "visualizerType": "stack-queue",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-deque",
      "moduleId": "dsa-module-5",
      "title": "Deque — Double-Ended Queue",
      "description": "Insert and remove from both ends in O(1), sliding window maximum, and Python collections.deque.",
      "order": 3,
      "readTimeMinutes": 22,
      "visualizerType": "stack-queue",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-monotonic-stack",
      "moduleId": "dsa-module-5",
      "title": "Monotonic Stack and Queue",
      "description": "Maintaining a monotonically increasing/decreasing stack for efficient range queries.",
      "order": 4,
      "readTimeMinutes": 28,
      "visualizerType": "stack-queue",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-balanced-parentheses",
      "moduleId": "dsa-module-5",
      "title": "Balanced Parentheses",
      "description": "Using a stack to validate bracket sequences and find the minimum additions to make balanced.",
      "order": 5,
      "readTimeMinutes": 18,
      "visualizerType": "stack-queue",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-next-greater-element",
      "moduleId": "dsa-module-5",
      "title": "Next Greater Element",
      "description": "O(n) solution using monotonic stack to find the next larger value for each array element.",
      "order": 6,
      "readTimeMinutes": 22,
      "visualizerType": "stack-queue",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-min-stack",
      "moduleId": "dsa-module-5",
      "title": "Min Stack Design",
      "description": "Supporting O(1) push, pop, and getMin simultaneously using an auxiliary stack of minimums.",
      "order": 7,
      "readTimeMinutes": 20,
      "visualizerType": "stack-queue",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-expression-parsing",
      "moduleId": "dsa-module-5",
      "title": "Infix, Postfix, and Prefix Expressions",
      "description": "Converting infix to postfix with the Shunting Yard algorithm and evaluating postfix with a stack.",
      "order": 8,
      "readTimeMinutes": 30,
      "visualizerType": "stack-queue",
      "difficulty": "Advanced"
    }
  ]
};

export const dsaModule5Lessons: Record<string, DSALessonContent> = {
  "dsa-stack-operations": {
    "id": "dsa-stack-operations",
    "moduleId": "dsa-module-5",
    "title": "Stack: Operations, Implementations, and Applications",
    "subtitle": "Last-In, First-Out (LIFO) Mechanics, In-Memory Models, and Classic Stack Patterns",
    "order": 1,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "stack-queue",
    "objectives": [
      "Understand the LIFO (Last-In, First-Out) discipline and why it models nested state.",
      "Implement a stack using both dynamic arrays (amortized O(1)) and singly linked lists (strict O(1)).",
      "Analyze the time and space complexity of push, pop, peek, and is_empty.",
      "Apply stacks to solve bracket matching, expression evaluation, and browser navigation.",
      "Recognize when an array implementation risks memory fragmentation vs reallocation overhead."
    ],
    "prerequisites": [
      "Basic array indexing and append/pop operations",
      "Understanding of linked list nodes"
    ],
    "analogy": {
      "title": "The Spring-Loaded Cafeteria Tray Dispenser",
      "text": "Think of a spring-loaded tray dispenser at a university cafeteria. When the dishwasher brings a freshly cleaned tray, they push it onto the top of the stack. The weight pushes the earlier trays downward into the cylindrical dispenser. When a hungry student approaches, they can only ever take the very top tray — the last one that was added. The very first tray placed at the bottom of the dispenser will remain there until every single tray placed above it has been removed.",
      "metaphor": "A stack enforces Last-In, First-Out (LIFO) access: all insertions (push) and deletions (pop) occur exclusively at one end called the Top."
    },
    "problemSolved": {
      "title": "Managing Nested Contexts and Reversal Operations",
      "description": "Many computational workflows are strictly nested: function calls returning in reverse order of invocation, undo/redo buffers reversing recent keystrokes, and syntax parsers matching closing brackets to the most recently opened bracket. A stack provides the optimal O(1) container for LIFO operations.",
      "keyPoints": [
        "Strict O(1) time for all primary operations: push, pop, peek",
        "Natural data structure for backtracking and graph DFS",
        "Directly reflects compiler call frames and expression evaluation"
      ]
    },
    "intuition": {
      "overview": "By restricting access strictly to the top element, stacks eliminate the need for index shifting, providing predictable, constant-time operations.",
      "steps": [
        {
          "step": 1,
          "title": "Push Operation",
          "description": "Place the new element onto the top of the container and increment the top pointer/size."
        },
        {
          "step": 2,
          "title": "Pop Operation",
          "description": "Retrieve the value at top, remove it from the container, and decrement top pointer/size."
        },
        {
          "step": 3,
          "title": "Peek / Top Operation",
          "description": "Inspect the top value without removing it."
        },
        {
          "step": 4,
          "title": "Underflow and Overflow Guards",
          "description": "Popping an empty stack causes stack underflow. In bounded array implementations, exceeding maximum capacity causes stack overflow."
        }
      ]
    },
    "formalDefinition": {
      "text": "A stack is an abstract data type that serves as a collection of elements with two principal operations: push, which adds an element to the collection, and pop, which removes the most recently added element that was not yet removed.",
      "latex": "S = \\langle e_1, e_2, \\dots, e_k \\rangle, \\quad \\text{push}(S, x) = \\langle e_1, \\dots, e_k, x \\rangle, \\quad \\text{pop}(S) = (e_k, \\langle e_1, \\dots, e_{k-1} \\rangle)"
    },
    "complexity": {
      "overview": "Every core stack operation executes in constant O(1) time.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Push, pop, and peek inspect or modify only the top reference."
        },
        {
          "case": "Average",
          "time": "O(1)",
          "space": "O(n)",
          "explanation": "Amortized O(1) for dynamic array appends, strict O(1) for linked list stack."
        },
        {
          "case": "Worst",
          "time": "O(1) amortized",
          "space": "O(n) storage for n items",
          "explanation": "Only array reallocation on capacity breach costs O(n), amortizing to O(1) over n operations."
        }
      ],
      "spaceNote": "Storing n elements requires O(n) memory. Linked list implementations have higher per-node pointer overhead (8 bytes per pointer in 64-bit systems)."
    },
    "workedExample": {
      "title": "Evaluating Operations on an Empty Stack",
      "input": "Operations: push(10), push(20), peek(), pop(), is_empty()",
      "steps": [
        {
          "step": 1,
          "action": "push(10)",
          "state": "Stack: [10] (top: 10)",
          "explanation": "Pushes 10 to top."
        },
        {
          "step": 2,
          "action": "push(20)",
          "state": "Stack: [10, 20] (top: 20)",
          "explanation": "Pushes 20 onto top of 10."
        },
        {
          "step": 3,
          "action": "peek()",
          "state": "Stack: [10, 20] (returns 20)",
          "explanation": "Returns 20 without altering stack."
        },
        {
          "step": 4,
          "action": "pop()",
          "state": "Stack: [10] (returns 20)",
          "explanation": "Removes and returns top element 20."
        },
        {
          "step": 5,
          "action": "is_empty()",
          "state": "Stack: [10] (returns False)",
          "explanation": "Stack has 1 element, returns False."
        }
      ],
      "finalOutput": "Final top: 10"
    },
    "visualExplanation": {
      "title": "Interactive Stack Container Visualizer",
      "description": "The visualizer illustrates items stacked vertically inside a bounded column with top indicator.",
      "features": [
        "Push animation slides elements in from the top with O(1) pointer update.",
        "Pop animation lifts the top element out and reveals the new top.",
        "Color changes signal overflow and underflow conditions."
      ]
    },
    "pseudocode": {
      "title": "Array-Based Stack ADT",
      "code": "class Stack:\n    constructor():\n        items = []\n        \n    function push(val):\n        items.append(val)\n        \n    function pop():\n        if is_empty():\n            raise UnderflowError\n        return items.pop()\n        \n    function peek():\n        if is_empty():\n            raise UnderflowError\n        return items[items.length - 1]\n        \n    function is_empty():\n        return items.length == 0"
    },
    "pythonCode": {
      "title": "Clean Python Stack Implementations",
      "code": "class ArrayStack:\n    \"\"\"Stack implemented using Python's built-in dynamic list.\"\"\"\n    def __init__(self):\n        self._items = []\n\n    def push(self, val):\n        self._items.append(val)\n\n    def pop(self):\n        if not self._items:\n            raise IndexError(\"pop from empty stack\")\n        return self._items.pop()\n\n    def peek(self):\n        if not self._items:\n            raise IndexError(\"peek from empty stack\")\n        return self._items[-1]\n\n    def is_empty(self):\n        return len(self._items) == 0\n\n    def __len__(self):\n        return len(self._items)",
      "explanation": "Python lists provide amortized O(1) append() and O(1) pop(), making them ideal for standard stack workloads without external libraries."
    },
    "runnableCode": {
      "code": "stack = []\n\n# Push elements (LIFO)\nstack.append(\"Page A\")\nstack.append(\"Page B\")\nstack.append(\"Page C\")\n\nprint(\"Current history top:\", stack[-1])\n\n# User clicks 'Back' button\nprint(\"Navigating back from:\", stack.pop())\nprint(\"Now on page:\", stack[-1])\nprint(\"Remaining history depth:\", len(stack))",
      "expectedOutput": "Current history top: Page C\nNavigating back from: Page C\nNow on page: Page B\nRemaining history depth: 2"
    },
    "lineByLineExplanation": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "self._items = []",
        "codeSnippet": "self._items = []",
        "explanation": "Initializes an empty list to store stack elements contiguously."
      },
      {
        "line": "5-6",
        "lines": "5-6",
        "code": "self._items.append(val)",
        "codeSnippet": "self._items.append(val)",
        "explanation": "Appends to the right end in amortized O(1) time without moving existing elements."
      },
      {
        "line": "8-11",
        "lines": "8-11",
        "code": "return self._items.pop()",
        "codeSnippet": "return self._items.pop()",
        "explanation": "Removes the last item in O(1) time. Raises IndexError if stack is empty."
      }
    ],
    "edgeCases": [
      {
        "case": "Popping from empty stack",
        "handling": "Check is_empty() first or catch IndexError / underflow exception.",
        "example": "ArrayStack().pop() raises IndexError."
      },
      {
        "case": "Peeking an empty stack",
        "handling": "Return None or raise custom EmptyStackError depending on API contract.",
        "example": "ArrayStack().peek() raises IndexError."
      },
      {
        "case": "Memory retention on pop",
        "handling": "In languages with manual memory (C++), deleted items must be deallocated; in Python, removing reference allows GC to reclaim.",
        "example": "Large objects popped from stack are garbage collected when references hit 0."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using list.pop(0) instead of list.pop()",
        "solution": "pop(0) removes from the front and is O(n). Always use pop() which removes from the end in O(1)."
      },
      {
        "mistake": "Not validating empty state before calling pop()",
        "solution": "Always guard pops with \"if stack:\" or \"if not stack.is_empty():\"."
      }
    ],
    "applications": [
      {
        "industry": "Web Browsers",
        "application": "Back/Forward Page Navigation",
        "benefit": "Two stacks (back_stack and forward_stack) manage browsing history with O(1) transitions."
      },
      {
        "industry": "IDEs and Text Editors",
        "application": "Undo/Redo Command Pattern",
        "benefit": "Pushing executed commands onto undo stack; popping to revert changes."
      },
      {
        "industry": "Compilers",
        "application": "Syntax Bracket Validation & Call Stacks",
        "benefit": "Verifying matching opening and closing delimiter pairs in source code."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-stack-q1",
        "question": "Why is list.pop() O(1) in Python, but list.pop(0) is O(n)?",
        "hint": "Think about how elements are positioned in contiguous memory.",
        "answer": "list.pop() removes the final element at index n-1, requiring no memory shifts. list.pop(0) removes the first element, requiring all remaining n-1 elements to be shifted left by 1 position in memory."
      },
      {
        "id": "dsa-stack-q2",
        "question": "How can you implement a queue using two stacks with amortized O(1) operations?",
        "hint": "Use one stack for enqueuing and one stack for dequeuing.",
        "answer": "Stack 1 accepts push operations (inbox). When a dequeue is requested, if Stack 2 (outbox) is empty, pop all elements from Stack 1 and push them into Stack 2 (reversing order). Then pop from Stack 2. Each element is moved between stacks at most once, yielding amortized O(1) per operation."
      },
      {
        "id": "dsa-stack-q3",
        "question": "How does a MinStack achieve O(1) getMin() alongside O(1) push and pop?",
        "hint": "Can you use an auxiliary stack of minimums?",
        "answer": "Maintain an auxiliary stack min_stack alongside the main stack. When pushing x, push min(x, min_stack[-1]) onto min_stack. When popping, pop from both stacks simultaneously. min_stack[-1] always stores the minimum element of the current stack state in O(1) time."
      }
    ],
    "quiz": [
      {
        "id": "dsa-stack-quiz-1",
        "question": "What principle dictates the ordering of removals in a stack data structure?",
        "options": [
          "FIFO (First-In, First-Out)",
          "LIFO (Last-In, First-Out)",
          "Priority ordering based on value",
          "Random order"
        ],
        "correctIndex": 1,
        "explanation": "Stacks strictly follow LIFO (Last-In, First-Out): the most recently inserted item is the first one removed."
      },
      {
        "id": "dsa-stack-quiz-2",
        "question": "What is the time complexity of the peek() operation on a stack of size n?",
        "options": [
          "O(n)",
          "O(log n)",
          "O(1)",
          "O(n²)"
        ],
        "correctIndex": 2,
        "explanation": "peek() inspects the top element at index -1 without modifying or shifting elements, executing in strict O(1) time."
      },
      {
        "id": "dsa-stack-quiz-3",
        "question": "Which of the following problems is canonical for stack resolution?",
        "options": [
          "Finding shortest path in weighted graph",
          "Sorting an array with Quick Sort",
          "Validating balanced parentheses in a code file",
          "Finding lowest common ancestor in BST"
        ],
        "correctIndex": 2,
        "explanation": "Validating balanced brackets requires matching the most recent opening bracket with incoming closing brackets, which is a classic LIFO stack problem."
      }
    ],
    "codingChallenge": {
      "title": "Valid Parentheses (LeetCode 20)",
      "problem": "Given a string \"s\" containing just the characters \"(\", \")\", \"{\", \"}\", \"[\" and \"]\", determine if the input string is valid. A string is valid if open brackets are closed by the same type of brackets and in the correct order.",
      "hints": [
        "Use a dictionary mapping each closing bracket to its corresponding opening bracket: {\")\": \"(\", \"}\": \"{\", \"]\": \"[\"}.",
        "When you encounter an opening bracket, push it onto the stack.",
        "When you encounter a closing bracket, pop from the stack and check if it matches the expected opening bracket.",
        "At the end of iteration, the stack must be empty for the string to be valid."
      ],
      "starterCode": "def is_valid_parentheses(s: str) -> bool:\n    stack = []\n    # Your code here using stack\n    return True\n\n# Test cases:\nprint(is_valid_parentheses(\"()[]{}\"))  # Expected: True\nprint(is_valid_parentheses(\"(]\"))      # Expected: False\nprint(is_valid_parentheses(\"([)]\"))    # Expected: False",
      "solution": "def is_valid_parentheses(s: str) -> bool:\n    stack = []\n    mapping = {\")\": \"(\", \"}\": \"{\", \"]\": \"[\"}\n    \n    for char in s:\n        if char in mapping:\n            # It's a closing bracket: check if top of stack matches\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            # It's an opening bracket: push onto stack\n            stack.append(char)\n            \n    # Valid only if all opening brackets have been matched\n    return len(stack) == 0\n\n# Test cases:\nprint(is_valid_parentheses(\"()[]{}\"))  # True\nprint(is_valid_parentheses(\"(]\"))      # False\nprint(is_valid_parentheses(\"([)]\"))    # False\nprint(is_valid_parentheses(\"{[]}\"))    # True"
    },
    "summary": {
      "keyTakeaways": [
        "A Stack is a LIFO (Last-In, First-Out) data structure with O(1) push, pop, and peek.",
        "Python lists provide built-in O(1) stack operations via append() and pop().",
        "Never use pop(0) for a stack: it incurs O(n) element shifting overhead.",
        "Parentheses validation and nested expression parsing naturally map to stacks."
      ],
      "nextLessonId": "dsa-queue-operations",
      "nextLessonTitle": "Queue and Circular Queue",
      "nextLessonModuleId": "dsa-module-5"
    },
    "lineByLine": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "self._items = []",
        "codeSnippet": "self._items = []",
        "explanation": "Initializes an empty list to store stack elements contiguously."
      },
      {
        "line": "5-6",
        "lines": "5-6",
        "code": "self._items.append(val)",
        "codeSnippet": "self._items.append(val)",
        "explanation": "Appends to the right end in amortized O(1) time without moving existing elements."
      },
      {
        "line": "8-11",
        "lines": "8-11",
        "code": "return self._items.pop()",
        "codeSnippet": "return self._items.pop()",
        "explanation": "Removes the last item in O(1) time. Raises IndexError if stack is empty."
      }
    ]
  },
  "dsa-queue-operations": {
    "id": "dsa-queue-operations",
    "moduleId": "dsa-module-5",
    "title": "Queue and Circular Queue",
    "subtitle": "First-In First-Out Architecture & Ring Buffers with Modular Arithmetic",
    "order": 2,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "stack-queue",
    "objectives": [
      "Understand FIFO (First-In, First-Out) queuing mechanics.",
      "Implement enqueue and dequeue operations in O(1) time.",
      "Overcome array-shifting bottlenecks using fixed-capacity circular ring buffers.",
      "Apply modular arithmetic ((tail + 1) % capacity) for pointer wrap-around."
    ],
    "prerequisites": [
      "Arrays and Dynamic Arrays",
      "Modulo Arithmetic"
    ],
    "analogy": {
      "title": "The Supermarket Checkout Line & Carousel",
      "text": "At a supermarket checkout, the first customer to join the line is the first served (FIFO). A circular queue is like a rotating luggage carousel at an airport: when luggage reaches the end of the belt, it loops back to the start, maximizing physical space without wasting capacity.",
      "metaphor": "Circular queues wrap pointers using modular arithmetic, avoiding shifting elements on dequeue."
    },
    "problemSolved": {
      "title": "Eliminating O(n) Shifting Overhead in Linear Arrays",
      "description": "Removing an element from the front of a regular array requires shifting all subsequent elements left by 1, taking O(n) time. A circular queue maintains front and rear indices, enabling both enqueue and dequeue in strictly O(1) time without element relocations.",
      "keyPoints": [
        "FIFO guarantees fairness in task and packet scheduling.",
        "Circular arrays reuse freed front slots without memory allocation overhead.",
        "Fundamental for OS scheduling, asynchronous message buffers, and BFS traversals."
      ]
    },
    "intuition": {
      "overview": "Maintain two pointers `front` and `rear` along with `size` and `capacity`. Enqueue places item at `rear` and advances `rear = (rear + 1) % capacity`. Dequeue reads item at `front` and advances `front = (front + 1) % capacity`.",
      "steps": [
        {
          "step": 1,
          "title": "Enqueue Operation",
          "description": "Check if size == capacity. If not, array[rear] = val, rear = (rear + 1) % capacity, size++."
        },
        {
          "step": 2,
          "title": "Dequeue Operation",
          "description": "Check if size == 0. If not, val = array[front], front = (front + 1) % capacity, size--."
        },
        {
          "step": 3,
          "title": "Wrap-Around Check",
          "description": "Modular division ensures indices smoothly recycle back to index 0 when reaching capacity."
        }
      ]
    },
    "formalDefinition": {
      "text": "A Queue Q is an algebraic structure supporting operations Enqueue(Q, x) and Dequeue(Q) such that Dequeue returns the least-recently inserted element not yet removed. In a circular array buffer of size C, position index i maps to (i + 1) mod C.",
      "latex": "\\text{rear}_{t+1} = (\\text{rear}_t + 1) \\pmod C, \\quad \\text{front}_{t+1} = (\\text{front}_t + 1) \\pmod C"
    },
    "complexity": {
      "overview": "All primary operations (enqueue, dequeue, front, isEmpty) run in O(1) deterministic time.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Instant pointer arithmetic and direct array index write."
        },
        {
          "case": "Average",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "No element shifts required."
        },
        {
          "case": "Worst",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Consistent bounded execution steps."
        }
      ],
      "spaceNote": "O(k) auxiliary memory for a queue with fixed maximum capacity k."
    },
    "workedExample": {
      "title": "Circular Queue of Capacity 3",
      "input": "Operations: enqueue(10), enqueue(20), dequeue(), enqueue(30), enqueue(40)",
      "steps": [
        {
          "step": 1,
          "action": "enqueue(10)",
          "state": "arr=[10, _, _], front=0, rear=1, size=1",
          "explanation": "Store 10 at index 0. Advance rear to 1."
        },
        {
          "step": 2,
          "action": "enqueue(20)",
          "state": "arr=[10, 20, _], front=0, rear=2, size=2",
          "explanation": "Store 20 at index 1. Advance rear to 2."
        },
        {
          "step": 3,
          "action": "dequeue() -> 10",
          "state": "arr=[_, 20, _], front=1, rear=2, size=1",
          "explanation": "Read arr[0]=10. Advance front to (0+1)%3 = 1."
        },
        {
          "step": 4,
          "action": "enqueue(30)",
          "state": "arr=[_, 20, 30], front=1, rear=0, size=2",
          "explanation": "Store 30 at index 2. rear wraps to (2+1)%3 = 0."
        },
        {
          "step": 5,
          "action": "enqueue(40)",
          "state": "arr=[40, 20, 30], front=1, rear=1, size=3",
          "explanation": "Store 40 at index 0 (recycled slot!). rear wraps to 1."
        }
      ],
      "finalOutput": "Queue contains [20, 30, 40] with front at 1 and rear at 1 (full)."
    },
    "visualExplanation": {
      "title": "Ring Buffer Architecture",
      "description": "Visualizing a fixed-size buffer as a circle where front chases rear or rear loops past front seamlessly.",
      "features": [
        "Front pointer indicates current head of queue.",
        "Rear pointer marks next available open slot.",
        "Size counter disambiguates full buffer from empty buffer."
      ]
    },
    "pseudocode": {
      "title": "Circular Queue Implementation",
      "code": "class CircularQueue:\n    def __init__(k):\n        queue = array of size k\n        front = 0\n        rear = 0\n        size = 0\n        capacity = k\n\n    def enqueue(value):\n        if size == capacity: return False\n        queue[rear] = value\n        rear = (rear + 1) % capacity\n        size += 1\n        return True\n\n    def dequeue():\n        if size == 0: return False\n        front = (front + 1) % capacity\n        size -= 1\n        return True"
    },
    "pythonCode": {
      "title": "Python Circular Queue Class",
      "code": "class CircularQueue:\n    def __init__(self, k: int):\n        self.capacity = k\n        self.queue = [0] * k\n        self.front = 0\n        self.rear = 0\n        self.size = 0\n\n    def enqueue(self, val: int) -> bool:\n        if self.is_full():\n            return False\n        self.queue[self.rear] = val\n        self.rear = (self.rear + 1) % self.capacity\n        self.size += 1\n        return True\n\n    def dequeue(self) -> bool:\n        if self.is_empty():\n            return False\n        self.front = (self.front + 1) % self.capacity\n        self.size -= 1\n        return True\n\n    def get_front(self) -> int:\n        return -1 if self.is_empty() else self.queue[self.front]\n\n    def get_rear(self) -> int:\n        if self.is_empty():\n            return -1\n        last_idx = (self.rear - 1 + self.capacity) % self.capacity\n        return self.queue[last_idx]\n\n    def is_empty(self) -> bool:\n        return self.size == 0\n\n    def is_full(self) -> bool:\n        return self.size == self.capacity",
      "explanation": "Maintains fixed capacity array with modulo updates on pointers."
    },
    "runnableCode": {
      "code": "q = CircularQueue(3)\nprint(q.enqueue(10)) # True\nprint(q.enqueue(20)) # True\nprint(q.dequeue())    # True\nprint(q.enqueue(30)) # True\nprint(q.enqueue(40)) # True\nprint(q.is_full())   # True\nprint(q.get_front()) # 20\nprint(q.get_rear())  # 40",
      "expectedOutput": "True\nTrue\nTrue\nTrue\nTrue\nTrue\n20\n40"
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "self.queue = [0] * k",
        "codeSnippet": "self.queue = [0] * k",
        "explanation": "Pre-allocate static memory to avoid dynamic resizing reallocation penalties."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "self.rear = (self.rear + 1) % self.capacity",
        "codeSnippet": "self.rear = (self.rear + 1) % self.capacity",
        "explanation": "Modular increment wraps rear pointer back to index 0 after capacity - 1."
      },
      {
        "line": 20,
        "lines": "20",
        "code": "self.front = (self.front + 1) % self.capacity",
        "codeSnippet": "self.front = (self.front + 1) % self.capacity",
        "explanation": "Modular increment advances front pointer efficiently in O(1)."
      }
    ],
    "edgeCases": [
      {
        "case": "Enqueue when full",
        "handling": "Guard with is_full() check and return False without overwriting valid data.",
        "example": "Cap=3, enqueue 4th item."
      },
      {
        "case": "Dequeue when empty",
        "handling": "Guard with is_empty() check and return False.",
        "example": "Empty queue dequeue."
      },
      {
        "case": "Single element queue",
        "handling": "front and rear advance correctly and size drops to 0.",
        "example": "Enqueue 1, Dequeue 1."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using list.pop(0) in Python",
        "solution": "list.pop(0) causes O(n) element shifts; use collections.deque or circular queue for O(1).",
        "codeExample": "from collections import deque\nq = deque()"
      },
      {
        "mistake": "Incorrect rear index calculation in get_rear()",
        "solution": "Since rear points to the next write slot, read at (rear - 1 + capacity) % capacity.",
        "codeExample": "idx = (self.rear - 1 + self.capacity) % self.capacity"
      }
    ],
    "applications": [
      {
        "industry": "Operating Systems",
        "application": "Process and thread scheduling queues (round-robin)",
        "benefit": "O(1) fair dispatching without latency spikes."
      },
      {
        "industry": "Networking",
        "application": "Network router incoming packet buffering",
        "benefit": "Prevents dropped packets while handling bursts."
      },
      {
        "industry": "Hardware",
        "application": "Keyboard buffer / serial I/O hardware queues",
        "benefit": "Fixed circular buffer safely records user keystrokes."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-cq-1",
        "question": "Why does circular queue utilize modular arithmetic instead of resetting front to 0?",
        "hint": "Consider the cost of shifting elements left.",
        "answer": "Modular arithmetic allows front and rear to wrap around continuously in O(1) without requiring expensive O(n) shifts of remaining elements."
      },
      {
        "id": "pq-cq-2",
        "question": "How can you distinguish an empty circular queue from a full circular queue without a size variable?",
        "hint": "Think about leaving one empty slot or using boolean flags.",
        "answer": "Either reserve one unused slot (full when (rear + 1) % cap == front) or maintain an explicit boolean flag / size counter."
      },
      {
        "id": "pq-cq-3",
        "question": "What is the time complexity of reversing a queue using only standard queue operations?",
        "hint": "Use an auxiliary stack.",
        "answer": "O(n) time and O(n) space by dequeuing all elements onto a stack and then popping them back into the queue."
      }
    ],
    "quiz": [
      {
        "id": "q-cq-1",
        "question": "What is the time complexity of dequeue in a static circular queue?",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(k)"
        ],
        "correctIndex": 0,
        "explanation": "Circular queue dequeue only updates the front pointer using modular arithmetic, taking O(1) deterministic time."
      },
      {
        "id": "q-cq-2",
        "question": "If capacity=5, front=4, and we dequeue, what is the new front index?",
        "options": [
          "0",
          "5",
          "3",
          "-1"
        ],
        "correctIndex": 0,
        "explanation": "(4 + 1) % 5 = 0, wrapping around to the start of the buffer."
      },
      {
        "id": "q-cq-3",
        "question": "Why is list.pop(0) inefficient for implementing a queue in Python?",
        "options": [
          "It requires O(n) time to shift all subsequent elements to the left",
          "It creates memory leaks",
          "Python lists do not allow pop(0)",
          "It only works with numbers"
        ],
        "correctIndex": 0,
        "explanation": "Python lists are dynamic arrays; removing index 0 requires shifting all subsequent n-1 elements left."
      }
    ],
    "codingChallenge": {
      "title": "Implement Queue using Stacks",
      "problem": "Implement a FIFO queue using only two LIFO stacks. Implement push, pop, peek, and empty operations.",
      "hints": [
        "Use one stack for input (push) and another stack for output (pop/peek).",
        "Transfer elements from in_stack to out_stack only when out_stack is empty."
      ],
      "starterCode": "class MyQueue:\n    def __init__(self):\n        self.in_stk = []\n        self.out_stk = []\n\n    def push(self, x: int) -> None:\n        # TODO: Implement push\n        pass\n\n    def pop(self) -> int:\n        # TODO: Implement pop\n        pass\n\n    def peek(self) -> int:\n        # TODO: Implement peek\n        pass\n\n    def empty(self) -> bool:\n        # TODO: Implement empty\n        pass",
      "solution": "class MyQueue:\n    def __init__(self):\n        self.in_stk = []\n        self.out_stk = []\n\n    def push(self, x: int) -> None:\n        self.in_stk.append(x)\n\n    def _shift(self) -> None:\n        if not self.out_stk:\n            while self.in_stk:\n                self.out_stk.append(self.in_stk.pop())\n\n    def pop(self) -> int:\n        self._shift()\n        return self.out_stk.pop()\n\n    def peek(self) -> int:\n        self._shift()\n        return self.out_stk[-1]\n\n    def empty(self) -> bool:\n        return not self.in_stk and not self.out_stk"
    },
    "summary": {
      "keyTakeaways": [
        "Queues provide strict FIFO ordering.",
        "Circular queues achieve O(1) enqueue and dequeue in fixed memory using modulo arithmetic.",
        "In Python, collections.deque is the standard doubly-linked list queue implementation."
      ],
      "nextLessonId": "dsa-deque",
      "nextLessonTitle": "Deque — Double-Ended Queue",
      "nextLessonModuleId": "dsa-module-5"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "self.queue = [0] * k",
        "codeSnippet": "self.queue = [0] * k",
        "explanation": "Pre-allocate static memory to avoid dynamic resizing reallocation penalties."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "self.rear = (self.rear + 1) % self.capacity",
        "codeSnippet": "self.rear = (self.rear + 1) % self.capacity",
        "explanation": "Modular increment wraps rear pointer back to index 0 after capacity - 1."
      },
      {
        "line": 20,
        "lines": "20",
        "code": "self.front = (self.front + 1) % self.capacity",
        "codeSnippet": "self.front = (self.front + 1) % self.capacity",
        "explanation": "Modular increment advances front pointer efficiently in O(1)."
      }
    ]
  },
  "dsa-deque": {
    "id": "dsa-deque",
    "moduleId": "dsa-module-5",
    "title": "Deque — Double-Ended Queue",
    "subtitle": "Bi-Directional Insertion and Deletion in Constant Time",
    "order": 3,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "stack-queue",
    "objectives": [
      "Master double-ended queues supporting push/pop from both ends in O(1).",
      "Compare doubly linked list vs circular array implementations of deques.",
      "Understand why deques generalize both stacks and queues.",
      "Utilize deques in sliding window algorithms and palindrome validation."
    ],
    "prerequisites": [
      "Stack: Operations and Applications",
      "Queue and Circular Queue"
    ],
    "analogy": {
      "title": "The Two-Ended Train Car",
      "text": "A passenger train car with open doors at both ends allows passengers to board or disembark from either the front or the back independently. Depending on how passengers enter and exit, it functions as a stack, a queue, or both simultaneously.",
      "metaphor": "A deque provides push_front, push_back, pop_front, and pop_back all in O(1) time."
    },
    "problemSolved": {
      "title": "Unified High-Performance Queue and Stack Abstraction",
      "description": "Many algorithmic problems require additions and removals at opposite ends dynamically (such as maintaining a monotonic sliding window). A deque satisfies both FIFO and LIFO patterns without compromises.",
      "keyPoints": [
        "O(1) operations at both boundaries.",
        "Serves as the internal engine for sliding window minimum/maximum.",
        "Supports efficient work-stealing scheduling algorithms."
      ]
    },
    "intuition": {
      "overview": "Maintain links or pointers to both ends. Push front shifts front backwards or links before head; push back appends after tail.",
      "steps": [
        {
          "step": 1,
          "title": "Push Front/Back",
          "description": "Insert directly adjacent to current front/back pointer in O(1)."
        },
        {
          "step": 2,
          "title": "Pop Front/Back",
          "description": "Extract node at requested end and update boundary pointer in O(1)."
        }
      ]
    },
    "formalDefinition": {
      "text": "A Deque D is an abstract sequence type supporting append_left(x), append_right(x), pop_left(), and pop_right(), all having amortized or worst-case O(1) operational complexity.",
      "latex": "\\mathcal{O}(\\text{push\\_front}) = \\mathcal{O}(\\text{push\\_back}) = \\mathcal{O}(\\text{pop\\_front}) = \\mathcal{O}(\\text{pop\\_back}) = O(1)"
    },
    "complexity": {
      "overview": "All end mutations take O(1) time. Random access is O(1) in circular buffer or O(n) in linked list.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Boundary manipulation."
        },
        {
          "case": "Average",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Consistent constant time."
        },
        {
          "case": "Worst",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Deterministic O(1) end access."
        }
      ],
      "spaceNote": "O(n) linear space to store n elements."
    },
    "workedExample": {
      "title": "Palindrome Checking with Deque",
      "input": "\"racecar\"",
      "steps": [
        {
          "step": 1,
          "action": "Pop front and pop back",
          "state": "front=\"r\", back=\"r\"",
          "explanation": "\"r\" == \"r\", match! Remaining: \"aceca\""
        },
        {
          "step": 2,
          "action": "Pop front and pop back",
          "state": "front=\"a\", back=\"a\"",
          "explanation": "\"a\" == \"a\", match! Remaining: \"cec\""
        },
        {
          "step": 3,
          "action": "Pop front and pop back",
          "state": "front=\"c\", back=\"c\"",
          "explanation": "\"c\" == \"c\", match! Remaining: \"e\""
        },
        {
          "step": 4,
          "action": "Single element left",
          "state": "length <= 1",
          "explanation": "Valid palindrome confirmed."
        }
      ],
      "finalOutput": "True (racecar is a valid palindrome)"
    },
    "visualExplanation": {
      "title": "Double-Ended Operations",
      "description": "Visualizing both ends open for insertion and deletion.",
      "features": [
        "Left pointer manages popleft/appendleft",
        "Right pointer manages pop/append"
      ]
    },
    "pseudocode": {
      "title": "Palindrome Check using Deque",
      "code": "function isPalindrome(text):\n    dq = new Deque()\n    for char in text:\n        dq.append_right(char)\n    while dq.size > 1:\n        if dq.pop_left() != dq.pop_right():\n            return False\n    return True"
    },
    "pythonCode": {
      "title": "Python collections.deque Usage",
      "code": "from collections import deque\n\ndef check_palindrome(s: str) -> bool:\n    dq = deque(s.lower())\n    while len(dq) > 1:\n        if dq.popleft() != dq.pop():\n            return False\n    return True",
      "explanation": "Python collections.deque uses a doubly linked list of memory blocks."
    },
    "runnableCode": {
      "code": "from collections import deque\ndq = deque([1, 2, 3])\ndq.appendleft(0)\ndq.append(4)\nprint(list(dq))\nprint(dq.popleft())\nprint(dq.pop())\nprint(list(dq))",
      "expectedOutput": "[0, 1, 2, 3, 4]\n0\n4\n[1, 2, 3]"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "dq.appendleft(0)",
        "codeSnippet": "dq.appendleft(0)",
        "explanation": "Inserts 0 at the front of the deque in O(1) time."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "dq.popleft()",
        "codeSnippet": "dq.popleft()",
        "explanation": "Removes and returns the frontmost item in O(1) time."
      }
    ],
    "edgeCases": [
      {
        "case": "Empty deque pop",
        "handling": "Raises IndexError in Python; check len(dq) > 0 first.",
        "example": "deque().pop()"
      },
      {
        "case": "Single character string in palindrome check",
        "handling": "Loop terminates immediately, returns True.",
        "example": "\"a\""
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using list instead of deque for frequent pop(0)",
        "solution": "Always use collections.deque when prepending or popping left.",
        "codeExample": "from collections import deque\nq = deque()"
      }
    ],
    "applications": [
      {
        "industry": "Compilers",
        "application": "Syntax token streaming and lookahead buffering",
        "benefit": "O(1) pushback and pop."
      },
      {
        "industry": "Distributed Computing",
        "application": "Work-stealing thread pools",
        "benefit": "Worker threads push/pop from their own end; idle workers steal from the other end."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-dq-1",
        "question": "How does collections.deque achieve O(1) indexed operations compared to a raw doubly linked list?",
        "hint": "Blocks of arrays.",
        "answer": "Python deque uses a doubly linked list of fixed-size blocks (usually 64 elements each), combining array locality with O(1) end manipulation."
      }
    ],
    "quiz": [
      {
        "id": "q-dq-1",
        "question": "What is the time complexity of appendleft and popleft on collections.deque?",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(k)"
        ],
        "correctIndex": 0,
        "explanation": "collections.deque provides O(1) push and pop from both ends."
      }
    ],
    "codingChallenge": {
      "title": "Sliding Window Maximum (Intro)",
      "problem": "Given an array and window size k, return the maximum element in each sliding window.",
      "hints": [
        "Store indices in a deque.",
        "Maintain elements in decreasing order in the deque."
      ],
      "starterCode": "from collections import deque\n\ndef max_sliding_window(nums, k):\n    # TODO: Implement using deque\n    pass",
      "solution": "from collections import deque\n\ndef max_sliding_window(nums, k):\n    dq = deque()\n    res = []\n    for i, num in enumerate(nums):\n        while dq and dq[0] < i - k + 1:\n            dq.popleft()\n        while dq and nums[dq[-1]] < num:\n            dq.pop()\n        dq.append(i)\n        if i >= k - 1:\n            res.append(nums[dq[0]])\n    return res"
    },
    "summary": {
      "keyTakeaways": [
        "Deques support O(1) mutations at both ends.",
        "Essential for sliding window optimization."
      ],
      "nextLessonId": "dsa-monotonic-stack",
      "nextLessonTitle": "Monotonic Stack and Queue",
      "nextLessonModuleId": "dsa-module-5"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "dq.appendleft(0)",
        "codeSnippet": "dq.appendleft(0)",
        "explanation": "Inserts 0 at the front of the deque in O(1) time."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "dq.popleft()",
        "codeSnippet": "dq.popleft()",
        "explanation": "Removes and returns the frontmost item in O(1) time."
      }
    ]
  },
  "dsa-monotonic-stack": {
    "id": "dsa-monotonic-stack",
    "moduleId": "dsa-module-5",
    "title": "Monotonic Stack and Queue",
    "subtitle": "Maintaining Sorted Invariants to Solve Nearest Greater/Smaller Problems in O(n)",
    "order": 4,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "stack-queue",
    "objectives": [
      "Define strictly increasing and non-decreasing monotonic stack invariants.",
      "Solve \"Next Greater Element\" and \"Previous Smaller Element\" in linear O(n) time.",
      "Understand why amortized time per element is O(1) despite nested loops.",
      "Apply monotonic stacks to Trapping Rain Water and Largest Rectangle in Histogram."
    ],
    "prerequisites": [
      "Stack: Operations and Applications"
    ],
    "analogy": {
      "title": "Line of Sight Across Skyscrapers",
      "text": "Imagine standing on a skyscraper and looking horizontally. A taller building ahead completely obscures any shorter buildings behind it. A monotonic decreasing stack preserves this line-of-sight: any new taller building \"pops\" and replaces all shorter preceding buildings.",
      "metaphor": "Elements that can never again be the nearest boundary are evicted permanently."
    },
    "problemSolved": {
      "title": "Reducing O(n^2) Quadratic Scans to O(n) Single Passes",
      "description": "Finding the next greater or previous smaller element for all items naively requires scanning remaining elements for each index, costing O(n^2). A monotonic stack processes every item exactly once on push and once on pop, achieving O(n) overall time.",
      "keyPoints": [
        "Each element enters and leaves the stack at most once.",
        "Eliminates redundant comparisons by pruning non-optimal candidates.",
        "Solves stock span, histogram rectangles, and water trapping effortlessly."
      ]
    },
    "intuition": {
      "overview": "Before pushing element x, pop all elements from the stack that violate the monotonic invariant (e.g. elements <= x). The remaining top of the stack is the immediate previous greater element.",
      "steps": [
        {
          "step": 1,
          "title": "Invariant Check",
          "description": "While stack is non-empty and stack.top <= current_val: stack.pop()."
        },
        {
          "step": 2,
          "title": "Extract Answer",
          "description": "If stack is not empty, stack.top is the nearest greater element. Else, no greater element exists (-1)."
        },
        {
          "step": 3,
          "title": "Push Current",
          "description": "Push current element (or index) onto stack to act as a potential boundary for future items."
        }
      ]
    },
    "formalDefinition": {
      "text": "A monotonic stack S maintains a sequence of elements (s_1, s_2, ..., s_k) such that s_i < s_{i+1} (monotonically increasing) or s_i > s_{i+1} (monotonically decreasing) for all 1 <= i < k.",
      "latex": "\\forall i \\in [1, k-1], \\quad s_i > s_{i+1} \\quad (\\text{Decreasing Monotonic Stack})"
    },
    "complexity": {
      "overview": "Time complexity is strictly O(n) amortized across the entire array.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Sorted input array."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Each element pushed once and popped at most once: 2n operations total."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Reverse sorted array."
        }
      ],
      "spaceNote": "O(n) auxiliary memory to store elements or indices on the stack."
    },
    "workedExample": {
      "title": "Next Greater Element for [2, 1, 2, 4, 3]",
      "input": "arr = [2, 1, 2, 4, 3]",
      "steps": [
        {
          "step": 1,
          "action": "Process 3 (from right)",
          "state": "stack=[3], ans[4]=-1",
          "explanation": "Empty stack -> -1. Push 3."
        },
        {
          "step": 2,
          "action": "Process 4",
          "state": "pop 3; stack=[4], ans[3]=-1",
          "explanation": "3 <= 4, pop 3. Stack empty -> -1. Push 4."
        },
        {
          "step": 3,
          "action": "Process 2",
          "state": "stack=[4, 2], ans[2]=4",
          "explanation": "Top is 4 > 2. ans=4. Push 2."
        },
        {
          "step": 4,
          "action": "Process 1",
          "state": "stack=[4, 2, 1], ans[1]=2",
          "explanation": "Top is 2 > 1. ans=2. Push 1."
        },
        {
          "step": 5,
          "action": "Process 2",
          "state": "pop 1; stack=[4, 2], ans[0]=4",
          "explanation": "Pop 1 (<= 2). Top is 4 > 2. ans=4. Push 2."
        }
      ],
      "finalOutput": "ans = [4, 2, 4, -1, -1]"
    },
    "visualExplanation": {
      "title": "Monotonic Pruning",
      "description": "Visualizing obsolete elements being popped off as a new dominant height enters the scan.",
      "features": [
        "Stack maintains decreasing staircase of values",
        "Elements popped are never needed again"
      ]
    },
    "pseudocode": {
      "title": "Next Greater Element Algorithm",
      "code": "function nextGreaterElements(nums):\n    n = length(nums)\n    result = array of size n filled with -1\n    stack = empty stack (stores indices)\n    \n    for i from 0 to n - 1:\n        while stack is not empty and nums[stack.top()] < nums[i]:\n            idx = stack.pop()\n            result[idx] = nums[i]\n        stack.push(i)\n        \n    return result"
    },
    "pythonCode": {
      "title": "Next Greater Element Implementation",
      "code": "def next_greater_elements(nums: list[int]) -> list[int]:\n    n = len(nums)\n    res = [-1] * n\n    stack = [] # stores indices\n    \n    for i in range(n):\n        while stack and nums[stack[-1]] < nums[i]:\n            prev_idx = stack.pop()\n            res[prev_idx] = nums[i]\n        stack.append(i)\n        \n    return res",
      "explanation": "Iterates through array, popping elements whose next greater is nums[i]."
    },
    "runnableCode": {
      "code": "nums = [2, 1, 2, 4, 3]\nprint(next_greater_elements(nums))",
      "expectedOutput": "[4, 2, 4, -1, -1]"
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "while stack and nums[stack[-1]] < nums[i]:",
        "codeSnippet": "while stack and nums[stack[-1]] < nums[i]:",
        "explanation": "Checks monotonic invariant. While top is smaller than incoming num, current num is its next greater."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "prev_idx = stack.pop()",
        "codeSnippet": "prev_idx = stack.pop()",
        "explanation": "Resolve the answer for prev_idx."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "stack.append(i)",
        "codeSnippet": "stack.append(i)",
        "explanation": "Push current index onto stack to find its next greater in future iterations."
      }
    ],
    "edgeCases": [
      {
        "case": "All strictly decreasing elements",
        "handling": "No elements pop during scan; all end up with -1.",
        "example": "[5, 4, 3, 2, 1]"
      },
      {
        "case": "All identical elements",
        "handling": "Strict inequality < ensures duplicates stay on stack until greater appears.",
        "example": "[2, 2, 2]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Storing values instead of indices",
        "solution": "Store indices on stack so you can write answers directly to res[idx] and calculate distances/widths.",
        "codeExample": "stack.append(i) # good"
      }
    ],
    "applications": [
      {
        "industry": "Finance",
        "application": "Daily stock temperature span analysis",
        "benefit": "Computes consecutive days with lower prices in O(n)."
      },
      {
        "industry": "Computer Graphics",
        "application": "Skyline computation and occlusion culling",
        "benefit": "Discards hidden surfaces in linear passes."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-ms-1",
        "question": "Why is the total time O(n) even though there is a while loop inside a for loop?",
        "hint": "Count the total number of push and pop operations.",
        "answer": "Each of the n elements is pushed to the stack exactly once, and can be popped at most once. Hence total stack operations <= 2n, making it O(n) overall."
      }
    ],
    "quiz": [
      {
        "id": "q-ms-1",
        "question": "What invariant does a monotonic increasing stack maintain?",
        "options": [
          "Elements from bottom to top are strictly or non-decreasingly increasing",
          "Elements from bottom to top are decreasing",
          "Stack size is always increasing",
          "Pushes always succeed"
        ],
        "correctIndex": 0,
        "explanation": "A monotonic increasing stack preserves elements in sorted ascending order from bottom to top."
      }
    ],
    "codingChallenge": {
      "title": "Daily Temperatures",
      "problem": "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If no future day is warmer, answer[i] = 0.",
      "hints": [
        "Use a monotonic decreasing stack storing day indices.",
        "When a warmer day arrives, the distance is current_day - previous_day."
      ],
      "starterCode": "def daily_temperatures(temperatures: list[int]) -> list[int]:\n    # TODO: Implement using monotonic stack\n    pass",
      "solution": "def daily_temperatures(temperatures: list[int]) -> list[int]:\n    n = len(temperatures)\n    ans = [0] * n\n    stack = []\n    for i, t in enumerate(temperatures):\n        while stack and temperatures[stack[-1]] < t:\n            prev = stack.pop()\n            ans[prev] = i - prev\n        stack.append(i)\n    return ans"
    },
    "summary": {
      "keyTakeaways": [
        "Monotonic stacks solve nearest greater/smaller problems in O(n).",
        "Always consider storing indices on stack to measure span distances."
      ],
      "nextLessonId": "dsa-balanced-parentheses",
      "nextLessonTitle": "Balanced Parentheses",
      "nextLessonModuleId": "dsa-module-5"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "while stack and nums[stack[-1]] < nums[i]:",
        "codeSnippet": "while stack and nums[stack[-1]] < nums[i]:",
        "explanation": "Checks monotonic invariant. While top is smaller than incoming num, current num is its next greater."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "prev_idx = stack.pop()",
        "codeSnippet": "prev_idx = stack.pop()",
        "explanation": "Resolve the answer for prev_idx."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "stack.append(i)",
        "codeSnippet": "stack.append(i)",
        "explanation": "Push current index onto stack to find its next greater in future iterations."
      }
    ]
  },
  "dsa-balanced-parentheses": {
    "id": "dsa-balanced-parentheses",
    "moduleId": "dsa-module-5",
    "title": "Balanced Parentheses",
    "subtitle": "Grammar Parsing, Matching Brackets, and Nesting Invariants",
    "order": 5,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "stack-queue",
    "objectives": [
      "Validate nested bracket expressions (), {}, [] using LIFO semantics.",
      "Map opening brackets to corresponding closing brackets via hash tables.",
      "Detect unbalanced sequences: premature closing, mismatched types, and trailing opens.",
      "Analyze space and time complexity for syntax validation."
    ],
    "prerequisites": [
      "Stack: Operations and Applications"
    ],
    "analogy": {
      "title": "Russian Nesting Matryoshka Dolls",
      "text": "Every outer nesting doll opened must be the last one closed. If you open a large doll, then a medium doll, you must close the medium doll first before you can close the large doll. Any attempt to close out of order breaks the shell.",
      "metaphor": "The most recently opened bracket must be the first one closed."
    },
    "problemSolved": {
      "title": "Validating Hierarchical Syntax in Compilers and Parsers",
      "description": "Code syntax in every programming language requires matching delimiters. A stack validates that every closing delimiter matches the type of the most recently unmatched opening delimiter in O(n) time and O(n) space.",
      "keyPoints": [
        "Core component of IDE syntax highlighters and linters.",
        "Immediate O(1) mismatch failure detection.",
        "Handles arbitrary nesting depths cleanly."
      ]
    },
    "intuition": {
      "overview": "Iterate through string. When seeing an open bracket, push onto stack. When seeing a closing bracket, pop top of stack and check if it matches. At end, stack must be empty.",
      "steps": [
        {
          "step": 1,
          "title": "Push Openings",
          "description": "When character is (, {, or [, push it."
        },
        {
          "step": 2,
          "title": "Match Closings",
          "description": "When character is ), }, or ], stack must not be empty and popped element must match."
        },
        {
          "step": 3,
          "title": "Final Empty Check",
          "description": "Return True if stack is completely empty at the end."
        }
      ]
    },
    "formalDefinition": {
      "text": "A string of brackets w over alphabet \\Sigma = \\{(,),\\{,\\},[,[\\]\\} is balanced if w = \\epsilon (empty string), or w = (u), w = \\{u\\}, w = [u], or w = uv where u, v are balanced.",
      "latex": "S \\to \\epsilon \\mid (S) \\mid \\{S\\} \\mid [S] \\mid SS"
    },
    "complexity": {
      "overview": "Time: O(n) single pass over string of length n. Space: O(n) worst-case stack depth.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Starts with closing bracket: fails immediately."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Linear traversal of string."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "All opening brackets followed by matching closings."
        }
      ],
      "spaceNote": "O(n) memory when all characters are opening brackets."
    },
    "workedExample": {
      "title": "Validating \"{[()]}\"",
      "input": "s = \"{[()]}\"",
      "steps": [
        {
          "step": 1,
          "action": "Read \"{\"",
          "state": "stack=[\"{\"]",
          "explanation": "Opening bracket, push."
        },
        {
          "step": 2,
          "action": "Read \"[\"",
          "state": "stack=[\"{\", \"[\"]",
          "explanation": "Opening bracket, push."
        },
        {
          "step": 3,
          "action": "Read \"(\"",
          "state": "stack=[\"{\", \"[\", \"(\"]",
          "explanation": "Opening bracket, push."
        },
        {
          "step": 4,
          "action": "Read \")\"",
          "state": "stack=[\"{\", \"[\"]",
          "explanation": "Matches popped \"(\". Valid."
        },
        {
          "step": 5,
          "action": "Read \"]\"",
          "state": "stack=[\"{\"]",
          "explanation": "Matches popped \"[\". Valid."
        },
        {
          "step": 6,
          "action": "Read \"}\"",
          "state": "stack=[]",
          "explanation": "Matches popped \"{\". Valid."
        }
      ],
      "finalOutput": "True (Stack is empty, string is balanced)"
    },
    "visualExplanation": {
      "title": "LIFO Bracket Matching",
      "description": "Visualizing stack growth on openings and contraction on valid closing matches.",
      "features": [
        "Stack grows deeper as nesting increases",
        "Mismatched pop causes immediate invalidation"
      ]
    },
    "pseudocode": {
      "title": "Balanced Parentheses Algorithm",
      "code": "function isValid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            stack.push(char)\n    return len(stack) == 0"
    },
    "pythonCode": {
      "title": "Python Valid Parentheses",
      "code": "def is_valid_parentheses(s: str) -> bool:\n    stack = []\n    bracket_map = {')': '(', '}': '{', ']': '['}\n    \n    for char in s:\n        if char in bracket_map:\n            top = stack.pop() if stack else '#'\n            if bracket_map[char] != top:\n                return False\n        else:\n            stack.append(char)\n            \n    return not stack",
      "explanation": "Uses a dictionary mapping closing brackets to openings."
    },
    "runnableCode": {
      "code": "print(is_valid_parentheses(\"{[()]}\")) # True\nprint(is_valid_parentheses(\"([)]\"))   # False\nprint(is_valid_parentheses(\"((\"))     # False",
      "expectedOutput": "True\nFalse\nFalse"
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "top = stack.pop() if stack else \"#\"",
        "codeSnippet": "top = stack.pop() if stack else \"#\"",
        "explanation": "Safely extracts top character or sentinel \"#\" if stack is empty."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "if bracket_map[char] != top: return False",
        "codeSnippet": "if bracket_map[char] != top: return False",
        "explanation": "Fails immediately if closing bracket does not match last opening bracket."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "return not stack",
        "codeSnippet": "return not stack",
        "explanation": "Verifies no leftover unclosed opening brackets remain."
      }
    ],
    "edgeCases": [
      {
        "case": "Empty string",
        "handling": "Returns True vacuously.",
        "example": "\"\""
      },
      {
        "case": "Starts with closing bracket",
        "handling": "Stack is empty, top is \"#\", returns False.",
        "example": "\")(\""
      },
      {
        "case": "Odd string length",
        "handling": "Can return False immediately if length is odd.",
        "example": "\"(((\""
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to check if stack is empty at the end",
        "solution": "Check return not stack; otherwise \"(((\" would wrongly return True.",
        "codeExample": "return len(stack) == 0"
      }
    ],
    "applications": [
      {
        "industry": "Software Development",
        "application": "Code editors and JSON/XML validators",
        "benefit": "Highlights unmatched brackets in real time."
      },
      {
        "industry": "Database Engineering",
        "application": "SQL query parser subquery matching",
        "benefit": "Ensures correct parenthesization of nested joins and clauses."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-bp-1",
        "question": "Can balanced parentheses with only one type of bracket \"()\" be solved in O(1) space?",
        "hint": "Count open brackets.",
        "answer": "Yes! Maintain an integer counter incremented on \"(\" and decremented on \")\". If counter < 0, invalid. Valid if counter == 0 at the end."
      }
    ],
    "quiz": [
      {
        "id": "q-bp-1",
        "question": "What does it mean if the stack is non-empty after checking all characters?",
        "options": [
          "There are unclosed opening brackets",
          "The string is valid",
          "There were too many closing brackets",
          "An invalid character was found"
        ],
        "correctIndex": 0,
        "explanation": "Unmatched opening brackets remain in the stack, meaning the expression was not properly closed."
      }
    ],
    "codingChallenge": {
      "title": "Minimum Add to Make Parentheses Valid",
      "problem": "Given a parentheses string s containing only \"(\" and \")\", return the minimum number of parentheses we must add to make the resulting string valid.",
      "hints": [
        "Count unmatched open brackets and unmatched closing brackets."
      ],
      "starterCode": "def min_add_to_make_valid(s: str) -> int:\n    # TODO: Calculate minimum additions needed\n    pass",
      "solution": "def min_add_to_make_valid(s: str) -> int:\n    open_count = 0\n    additions = 0\n    for ch in s:\n        if ch == '(':\n            open_count += 1\n        else:\n            if open_count > 0:\n                open_count -= 1\n            else:\n                additions += 1\n    return additions + open_count"
    },
    "summary": {
      "keyTakeaways": [
        "Stacks naturally enforce hierarchical matching invariants.",
        "Hash table mapping simplifies multi-delimiter handling."
      ],
      "nextLessonId": "dsa-next-greater-element",
      "nextLessonTitle": "Next Greater Element",
      "nextLessonModuleId": "dsa-module-5"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "top = stack.pop() if stack else \"#\"",
        "codeSnippet": "top = stack.pop() if stack else \"#\"",
        "explanation": "Safely extracts top character or sentinel \"#\" if stack is empty."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "if bracket_map[char] != top: return False",
        "codeSnippet": "if bracket_map[char] != top: return False",
        "explanation": "Fails immediately if closing bracket does not match last opening bracket."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "return not stack",
        "codeSnippet": "return not stack",
        "explanation": "Verifies no leftover unclosed opening brackets remain."
      }
    ]
  },
  "dsa-next-greater-element": {
    "id": "dsa-next-greater-element",
    "moduleId": "dsa-module-5",
    "title": "Next Greater Element",
    "subtitle": "Mastering Circular and Distance Variations with Stacks",
    "order": 6,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "stack-queue",
    "objectives": [
      "Generalize monotonic stack patterns to circular arrays using 2n virtual iterations.",
      "Map answers between subsets and parent arrays using hash tables.",
      "Understand distance-based queries (Next Greater Element Distance).",
      "Write clean, production-ready stack algorithms for array variations."
    ],
    "prerequisites": [
      "Monotonic Stack and Queue"
    ],
    "analogy": {
      "title": "The Circular Clock Face",
      "text": "On a 12-hour clock, 11 o'clock looks forward and finds 12 o'clock, but 12 o'clock looks forward and wraps around to 1 o'clock. By running a race twice around the clock (2n steps), every position gets a fair chance to find a greater element wrapping around.",
      "metaphor": "Simulate a circular array by looping up to 2n - 1 using index modulo n."
    },
    "problemSolved": {
      "title": "Finding Next Greater Elements with Circular Wrap-Around",
      "description": "In circular arrays, the next greater element for the last item might be at the start of the array. Duplicating the traversal (2n iterations) with index % n allows seamless circular lookahead in O(n) time.",
      "keyPoints": [
        "Avoids actually doubling the array memory.",
        "Operates in O(n) time and O(n) space.",
        "Common question in technical coding interviews."
      ]
    },
    "intuition": {
      "overview": "Loop i from 2n - 1 down to 0. Access array element at i % n. Maintain monotonic decreasing stack. If i < n, stack top is the circular next greater element.",
      "steps": [
        {
          "step": 1,
          "title": "Virtual Double Loop",
          "description": "Iterate i from 2n-1 down to 0."
        },
        {
          "step": 2,
          "title": "Stack Pruning",
          "description": "Pop elements from stack that are <= nums[i % n]."
        },
        {
          "step": 3,
          "title": "Record Result",
          "description": "When i < n, record stack.top() as the answer for index i."
        }
      ]
    },
    "formalDefinition": {
      "text": "For a circular array A of length n, the circular next greater element of A[i] is A[j] where j = (i + k) mod n for minimal k > 0 such that A[j] > A[i].",
      "latex": "\\text{NGE}(i) = A[j] \\quad \\text{where } j = (i + k) \\pmod n, \\, k = \\min \\{m > 0 : A[(i + m) \\pmod n] > A[i]\\}"
    },
    "complexity": {
      "overview": "Time: O(n) because 2n iterations process elements into stack. Space: O(n).",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Linear time scan."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Total pops <= 2n."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Monotonically decreasing array."
        }
      ],
      "spaceNote": "O(n) auxiliary stack and output array."
    },
    "workedExample": {
      "title": "Next Greater Element II on [1, 2, 1]",
      "input": "nums = [1, 2, 1]",
      "steps": [
        {
          "step": 1,
          "action": "Virtual pass i=5 to 3",
          "state": "Pushes elements to prep stack for wrap-around.",
          "explanation": "Stack populated with candidates from second half."
        },
        {
          "step": 2,
          "action": "i=2 (val=1)",
          "state": "Top of stack is 2 > 1 -> ans[2]=2",
          "explanation": "Wrap-around element 2 is greater than 1."
        },
        {
          "step": 3,
          "action": "i=1 (val=2)",
          "state": "Stack elements <= 2 popped -> ans[1]=-1",
          "explanation": "2 is the maximum element in array, no greater element exists."
        },
        {
          "step": 4,
          "action": "i=0 (val=1)",
          "state": "Top of stack is 2 -> ans[0]=2",
          "explanation": "Next greater is 2."
        }
      ],
      "finalOutput": "ans = [2, -1, 2]"
    },
    "visualExplanation": {
      "title": "Circular Monotonic Stack",
      "description": "Scanning 2n elements with modulo arithmetic to effortlessly look over the array edge.",
      "features": [
        "Double-pass ensures first element can serve as next greater for last element",
        "O(1) memory overhead beyond stack"
      ]
    },
    "pseudocode": {
      "title": "Circular Next Greater Element",
      "code": "function nextGreaterElementsII(nums):\n    n = length(nums)\n    res = array of size n with -1\n    stack = []\n    for i from 2*n - 1 down to 0:\n        val = nums[i % n]\n        while stack and stack.top() <= val:\n            stack.pop()\n        if i < n:\n            if stack: res[i] = stack.top()\n        stack.push(val)\n    return res"
    },
    "pythonCode": {
      "title": "Python Circular Next Greater",
      "code": "def next_greater_elements_circular(nums: list[int]) -> list[int]:\n    n = len(nums)\n    res = [-1] * n\n    stack = []\n    \n    for i in range(2 * n - 1, -1, -1):\n        num = nums[i % n]\n        while stack and stack[-1] <= num:\n            stack.pop()\n        if i < n and stack:\n            res[i] = stack[-1]\n        stack.append(num)\n        \n    return res",
      "explanation": "Uses 2n-1 down to 0 reverse traversal with modulo indexing."
    },
    "runnableCode": {
      "code": "print(next_greater_elements_circular([1, 2, 1]))\nprint(next_greater_elements_circular([3, 8, 4, 1, 2]))",
      "expectedOutput": "[2, -1, 2]\n[8, -1, 8, 2, 3]"
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "for i in range(2 * n - 1, -1, -1):",
        "codeSnippet": "for i in range(2 * n - 1, -1, -1):",
        "explanation": "Runs 2n iterations to simulate circular traversal without physical memory allocation."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "num = nums[i % n]",
        "codeSnippet": "num = nums[i % n]",
        "explanation": "Maps virtual index back to physical array."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "if i < n and stack: res[i] = stack[-1]",
        "codeSnippet": "if i < n and stack: res[i] = stack[-1]",
        "explanation": "Only records answer during the first real traversal pass (i < n)."
      }
    ],
    "edgeCases": [
      {
        "case": "Array with single element",
        "handling": "Returns [-1] as no strictly greater element can exist.",
        "example": "[1]"
      },
      {
        "case": "All identical values",
        "handling": "Returns [-1, ..., -1] since equality is not strictly greater.",
        "example": "[4, 4, 4]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Duplicating the list physically nums + nums",
        "solution": "nums + nums takes O(n) extra space; use index modulo (i % n) instead.",
        "codeExample": "val = nums[i % n]"
      }
    ],
    "applications": [
      {
        "industry": "Sensor Networks",
        "application": "Circular ring buffer peak detection",
        "benefit": "Finds next high-voltage peak seamlessly across buffer boundary."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-nge-1",
        "question": "How would you find the Previous Greater Element instead of Next Greater?",
        "hint": "Traverse left-to-right (0 to n-1).",
        "answer": "Traverse from 0 to n-1 maintaining a decreasing stack; before pushing nums[i], pop all <= nums[i]; top is previous greater."
      }
    ],
    "quiz": [
      {
        "id": "q-nge-1",
        "question": "Why is 2n iterations sufficient to resolve circular next greater elements?",
        "options": [
          "The furthest possible lookahead in a circular array is n-1 elements away",
          "2n matches the maximum integer size",
          "Stacks require power of 2 iterations",
          "It avoids memory fragmentation"
        ],
        "correctIndex": 0,
        "explanation": "In a circular array of size n, checking up to n-1 positions forward covers every element in the array."
      }
    ],
    "codingChallenge": {
      "title": "Next Greater Element I (Subset Mapping)",
      "problem": "Given nums1 as a subset of nums2, find next greater element for each item in nums1 within nums2.",
      "hints": [
        "Run monotonic stack on nums2 and store results in a hash map.",
        "Then query map for each element in nums1."
      ],
      "starterCode": "def next_greater_element(nums1: list[int], nums2: list[int]) -> list[int]:\n    # TODO: Implement mapping\n    pass",
      "solution": "def next_greater_element(nums1: list[int], nums2: list[int]) -> list[int]:\n    mapping = {}\n    stack = []\n    for num in nums2:\n        while stack and stack[-1] < num:\n            mapping[stack.pop()] = num\n        stack.append(num)\n    return [mapping.get(x, -1) for x in nums1]"
    },
    "summary": {
      "keyTakeaways": [
        "Virtual 2n loop solves circular array queries cleanly in O(n).",
        "Hash maps bridge monotonic stack results across subset queries."
      ],
      "nextLessonId": "dsa-min-stack",
      "nextLessonTitle": "Min Stack Design",
      "nextLessonModuleId": "dsa-module-5"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "for i in range(2 * n - 1, -1, -1):",
        "codeSnippet": "for i in range(2 * n - 1, -1, -1):",
        "explanation": "Runs 2n iterations to simulate circular traversal without physical memory allocation."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "num = nums[i % n]",
        "codeSnippet": "num = nums[i % n]",
        "explanation": "Maps virtual index back to physical array."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "if i < n and stack: res[i] = stack[-1]",
        "codeSnippet": "if i < n and stack: res[i] = stack[-1]",
        "explanation": "Only records answer during the first real traversal pass (i < n)."
      }
    ]
  },
  "dsa-min-stack": {
    "id": "dsa-min-stack",
    "moduleId": "dsa-module-5",
    "title": "Min Stack Design",
    "subtitle": "Retrieving Minimum Element in O(1) Time Using Auxiliary Invariants",
    "order": 7,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "stack-queue",
    "objectives": [
      "Design a stack supporting push, pop, top, and getMin in strictly O(1) time.",
      "Implement dual-stack architecture (primary stack + min-tracking stack).",
      "Explore space-optimized single-stack mathematical encoding (2*val - minVal).",
      "Identify trade-offs between memory footprint and arithmetic overflow safety."
    ],
    "prerequisites": [
      "Stack: Operations and Applications"
    ],
    "analogy": {
      "title": "The Dual Notebook System",
      "text": "A clerk keeps a ledger of stock prices. In a second pocket notebook, the clerk writes down the all-time lowest price seen so far. Every time a new price is recorded, the pocket notebook records min(new_price, current_lowest). When a page in the ledger is torn out, the corresponding pocket notebook entry is also torn out.",
      "metaphor": "Synchronized auxiliary stack tracks running minimum at every stack depth."
    },
    "problemSolved": {
      "title": "Instant O(1) Minimum Queries on Dynamic LIFO Data",
      "description": "Scanning a stack to find its minimum takes O(n) time. By recording the running minimum alongside each push, getMin() returns in strictly O(1) deterministic time.",
      "keyPoints": [
        "Zero search latency: getMin() is O(1).",
        "Preserves normal stack LIFO behavior without penalty.",
        "Core interview system design primitive."
      ]
    },
    "intuition": {
      "overview": "Maintain two stacks: `main_stack` stores values, `min_stack` stores running minimums. On push(val), push min(val, min_stack.top) to min_stack. On pop, pop both.",
      "steps": [
        {
          "step": 1,
          "title": "Push Logic",
          "description": "Push val to main. Push min(val, min_stack[-1]) to min_stack."
        },
        {
          "step": 2,
          "title": "Pop Logic",
          "description": "Pop simultaneously from both main and min_stack."
        },
        {
          "step": 3,
          "title": "GetMin Logic",
          "description": "Return min_stack[-1] in O(1)."
        }
      ]
    },
    "formalDefinition": {
      "text": "A MinStack maintains a state S = ((v_1, m_1), (v_2, m_2), ..., (v_k, m_k)) where m_i = \\min_{1 \\le j \\le i} v_j. Therefore, m_k = \\min(S) in O(1).",
      "latex": "m_k = \\min(v_k, m_{k-1}) \\implies \\text{getMin}() = m_k \\in O(1)"
    },
    "complexity": {
      "overview": "All methods (push, pop, top, getMin) execute in O(1) time.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Direct pointer / array index read."
        },
        {
          "case": "Average",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Deterministic single-step execution."
        },
        {
          "case": "Worst",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Zero loops or dynamic reallocations."
        }
      ],
      "spaceNote": "O(n) auxiliary space to store minimum history."
    },
    "workedExample": {
      "title": "MinStack Operation Trace",
      "input": "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",
      "steps": [
        {
          "step": 1,
          "action": "push(-2)",
          "state": "main=[-2], min=[-2]",
          "explanation": "First element is current minimum."
        },
        {
          "step": 2,
          "action": "push(0)",
          "state": "main=[-2, 0], min=[-2, -2]",
          "explanation": "min(0, -2) = -2."
        },
        {
          "step": 3,
          "action": "push(-3)",
          "state": "main=[-2, 0, -3], min=[-2, -2, -3]",
          "explanation": "min(-3, -2) = -3."
        },
        {
          "step": 4,
          "action": "getMin()",
          "state": "returns -3",
          "explanation": "Top of min stack is -3."
        },
        {
          "step": 5,
          "action": "pop()",
          "state": "main=[-2, 0], min=[-2, -2]",
          "explanation": "Pops -3 from both stacks. Min reverts to -2."
        },
        {
          "step": 6,
          "action": "top()",
          "state": "returns 0",
          "explanation": "Top of main stack is 0."
        },
        {
          "step": 7,
          "action": "getMin()",
          "state": "returns -2",
          "explanation": "Top of min stack is -2."
        }
      ],
      "finalOutput": "getMin returns -3 then -2 after popping -3."
    },
    "visualExplanation": {
      "title": "Dual-Stack Alignment",
      "description": "Visualizing min_stack shadowing main_stack at every level.",
      "features": [
        "Min stack mirrors main stack height",
        "Each level preserves historical minimum"
      ]
    },
    "pseudocode": {
      "title": "MinStack Implementation",
      "code": "class MinStack:\n    def __init__():\n        main_stack = []\n        min_stack = []\n\n    def push(val):\n        main_stack.push(val)\n        if not min_stack or val <= min_stack.top():\n            min_stack.push(val)\n        else:\n            min_stack.push(min_stack.top())\n\n    def pop():\n        main_stack.pop()\n        min_stack.pop()\n\n    def top(): return main_stack.top()\n    def getMin(): return min_stack.top()"
    },
    "pythonCode": {
      "title": "Python MinStack Class",
      "code": "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        if not self.min_stack or val <= self.min_stack[-1]:\n            self.min_stack.append(val)\n        else:\n            self.min_stack.append(self.min_stack[-1])\n\n    def pop(self) -> None:\n        self.stack.pop()\n        self.min_stack.pop()\n\n    def top(self) -> int:\n        return self.stack[-1]\n\n    def get_min(self) -> int:\n        return self.min_stack[-1]",
      "explanation": "Pairs every main stack push with corresponding running minimum in min_stack."
    },
    "runnableCode": {
      "code": "ms = MinStack()\nms.push(-2)\nms.push(0)\nms.push(-3)\nprint(ms.get_min()) # -3\nms.pop()\nprint(ms.top())     # 0\nprint(ms.get_min()) # -2",
      "expectedOutput": "-3\n0\n-2"
    },
    "lineByLineExplanation": [
      {
        "line": 8,
        "lines": "8",
        "code": "if not self.min_stack or val <= self.min_stack[-1]:",
        "codeSnippet": "if not self.min_stack or val <= self.min_stack[-1]:",
        "explanation": "Pushes current val if smaller than or equal to current minimum."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "self.min_stack.append(self.min_stack[-1])",
        "codeSnippet": "self.min_stack.append(self.min_stack[-1])",
        "explanation": "Duplicates current minimum to ensure stacks stay at identical heights."
      }
    ],
    "edgeCases": [
      {
        "case": "Popping minimum element",
        "handling": "min_stack pops simultaneously, restoring previous minimum.",
        "example": "Push -3 then pop."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Only pushing to min_stack when val < current_min (using strict <)",
        "solution": "Must use <= to handle duplicate minimums; otherwise popping duplicate removes the only min entry.",
        "codeExample": "if val <= self.min_stack[-1]: # use <="
      }
    ],
    "applications": [
      {
        "industry": "Data Analytics",
        "application": "Streaming metric telemetry tracking all-time lowest ping/latency",
        "benefit": "Instant O(1) lowest ping inspection."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-ms-1",
        "question": "How can you implement MinStack with only a single stack and O(1) auxiliary space?",
        "hint": "Store 2*val - minVal when pushing a new minimum.",
        "answer": "Store encoded values: when pushing a new minimum, push 2*x - min_val and set min_val = x. When popping negative diff, previous min is reconstructed as 2*min_val - popped."
      }
    ],
    "quiz": [
      {
        "id": "q-ms-1",
        "question": "What is the time complexity of getMin() in MinStack?",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(k)"
        ],
        "correctIndex": 0,
        "explanation": "Retrieving the top element of min_stack takes O(1) constant time."
      }
    ],
    "codingChallenge": {
      "title": "Max Stack Design",
      "problem": "Design a MaxStack supporting push, pop, top, and peekMax in O(1) time.",
      "hints": [
        "Mirror the MinStack pattern using running maximums."
      ],
      "starterCode": "class MaxStack:\n    def __init__(self):\n        # TODO: Initialize stacks\n        pass\n\n    def push(self, x: int) -> None:\n        pass\n\n    def pop(self) -> int:\n        pass\n\n    def top(self) -> int:\n        pass\n\n    def peek_max(self) -> int:\n        pass",
      "solution": "class MaxStack:\n    def __init__(self):\n        self.stack = []\n        self.max_stack = []\n\n    def push(self, x: int) -> None:\n        self.stack.append(x)\n        if not self.max_stack or x >= self.max_stack[-1]:\n            self.max_stack.append(x)\n        else:\n            self.max_stack.append(self.max_stack[-1])\n\n    def pop(self) -> int:\n        self.max_stack.pop()\n        return self.stack.pop()\n\n    def top(self) -> int:\n        return self.stack[-1]\n\n    def peek_max(self) -> int:\n        return self.max_stack[-1]"
    },
    "summary": {
      "keyTakeaways": [
        "Dual stacks provide O(1) min/max tracking at the cost of 2x memory.",
        "Preserves exact LIFO order and historical minimums."
      ],
      "nextLessonId": "dsa-expression-parsing",
      "nextLessonTitle": "Infix, Postfix, and Prefix Expressions",
      "nextLessonModuleId": "dsa-module-5"
    },
    "lineByLine": [
      {
        "line": 8,
        "lines": "8",
        "code": "if not self.min_stack or val <= self.min_stack[-1]:",
        "codeSnippet": "if not self.min_stack or val <= self.min_stack[-1]:",
        "explanation": "Pushes current val if smaller than or equal to current minimum."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "self.min_stack.append(self.min_stack[-1])",
        "codeSnippet": "self.min_stack.append(self.min_stack[-1])",
        "explanation": "Duplicates current minimum to ensure stacks stay at identical heights."
      }
    ]
  },
  "dsa-expression-parsing": {
    "id": "dsa-expression-parsing",
    "moduleId": "dsa-module-5",
    "title": "Infix, Postfix, and Prefix Expressions",
    "subtitle": "Shunting-Yard Algorithm and Reverse Polish Notation Evaluation",
    "order": 8,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "stack-queue",
    "objectives": [
      "Differentiate between Infix (human), Postfix (RPN), and Prefix (Polish) notations.",
      "Evaluate Reverse Polish Notation expressions using operand stacks in O(n).",
      "Implement Dijkstra's Shunting-Yard algorithm for Infix to Postfix conversion.",
      "Handle operator precedence (*, / over +, -) and parentheses associativity correctly."
    ],
    "prerequisites": [
      "Stack: Operations and Applications"
    ],
    "analogy": {
      "title": "The Calculator Tape Machine",
      "text": "Old HP engineering calculators used Reverse Polish Notation (RPN): to compute (3 + 4) * 2, you enter \"3 ENTER 4 + 2 *\". There are no parentheses because the order of operations is unambiguous. An internal stack holds numbers until an operation consumes them.",
      "metaphor": "Postfix notation eliminates parentheses by placing operators immediately after their operands."
    },
    "problemSolved": {
      "title": "Unambiguous Mathematical Computation Without Ambiguity",
      "description": "Human infix notation \"3 + 4 * 2\" requires complex precedence rules and parentheses. Postfix notation \"3 4 2 * +\" can be evaluated in a single sequential pass using a single stack without backtracking.",
      "keyPoints": [
        "Eliminates parentheses completely.",
        "Powers compiler arithmetic code generation and scientific calculators.",
        "O(n) evaluation with zero ambiguity."
      ]
    },
    "intuition": {
      "overview": "To evaluate postfix: scan tokens. If number, push to stack. If operator, pop two operands (b, then a), compute a OP b, and push result back to stack.",
      "steps": [
        {
          "step": 1,
          "title": "Operand Push",
          "description": "Push incoming numbers directly onto evaluation stack."
        },
        {
          "step": 2,
          "title": "Operator Pop & Apply",
          "description": "Pop right operand b, then left operand a. Compute a OP b. Push result."
        },
        {
          "step": 3,
          "title": "Final Stack Value",
          "description": "At the end of expression, the single value remaining on the stack is the total result."
        }
      ]
    },
    "formalDefinition": {
      "text": "In Postfix (RPN), an operator is placed immediately after its operands: binary operation \\circ(a, b) is written \"a b \\circ\". In Shunting-Yard conversion, an operator stack reorders operators based on precedence \\text{prec}(\\circ_1) \\ge \\text{prec}(\\circ_2).",
      "latex": "a + b \\cdot c \\xrightarrow{\\text{Shunting-Yard}} a \\, b \\, c \\cdot +"
    },
    "complexity": {
      "overview": "Evaluation: O(n) time, O(n) space. Conversion: O(n) time, O(n) space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Single linear pass over tokens."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Tokens pushed and popped at most once."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Nested expression with deep operator stack."
        }
      ],
      "spaceNote": "O(n) memory for operand and operator stacks."
    },
    "workedExample": {
      "title": "Evaluating [\"2\", \"1\", \"+\", \"3\", \"*\"]",
      "input": "tokens = [\"2\", \"1\", \"+\", \"3\", \"*\"]",
      "steps": [
        {
          "step": 1,
          "action": "Push \"2\"",
          "state": "stack=[2]",
          "explanation": "Number 2 pushed."
        },
        {
          "step": 2,
          "action": "Push \"1\"",
          "state": "stack=[2, 1]",
          "explanation": "Number 1 pushed."
        },
        {
          "step": 3,
          "action": "Apply \"+\"",
          "state": "pop 1, pop 2 -> 2+1=3 -> stack=[3]",
          "explanation": "Add top two operands, push 3."
        },
        {
          "step": 4,
          "action": "Push \"3\"",
          "state": "stack=[3, 3]",
          "explanation": "Number 3 pushed."
        },
        {
          "step": 5,
          "action": "Apply \"*\"",
          "state": "pop 3, pop 3 -> 3*3=9 -> stack=[9]",
          "explanation": "Multiply top two operands, push 9."
        }
      ],
      "finalOutput": "Result: 9"
    },
    "visualExplanation": {
      "title": "RPN Evaluation Mechanism",
      "description": "Visualizing operands accumulating on stack until an operator collapses them into a single result.",
      "features": [
        "Operands wait in LIFO order",
        "Binary operators consume top 2 elements"
      ]
    },
    "pseudocode": {
      "title": "RPN Evaluation",
      "code": "function evalRPN(tokens):\n    stack = []\n    for token in tokens:\n        if token is operator (+, -, *, /):\n            b = stack.pop()\n            a = stack.pop()\n            result = apply(operator, a, b)\n            stack.push(result)\n        else:\n            stack.push(integer(token))\n    return stack.pop()"
    },
    "pythonCode": {
      "title": "Python RPN Evaluator",
      "code": "def eval_rpn(tokens: list[str]) -> int:\n    stack = []\n    ops = {\n        '+': lambda a, b: a + b,\n        '-': lambda a, b: a - b,\n        '*': lambda a, b: a * b,\n        '/': lambda a, b: int(a / b)  # truncates toward zero\n    }\n    \n    for token in tokens:\n        if token in ops:\n            b = stack.pop()\n            a = stack.pop()\n            stack.append(ops[token](a, b))\n        else:\n            stack.append(int(token))\n            \n    return stack[0]",
      "explanation": "Applies lambdas to popped operands; handles Python integer division toward zero."
    },
    "runnableCode": {
      "code": "print(eval_rpn([\"2\", \"1\", \"+\", \"3\", \"*\"])) # (2+1)*3 = 9\nprint(eval_rpn([\"4\", \"13\", \"5\", \"/\", \"+\"])) # 4 + (13/5) = 6",
      "expectedOutput": "9\n6"
    },
    "lineByLineExplanation": [
      {
        "line": 7,
        "lines": "7",
        "code": "'/': lambda a, b: int(a / b)",
        "codeSnippet": "'/': lambda a, b: int(a / b)",
        "explanation": "Truncates toward zero as required by standard programming language evaluation."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "b = stack.pop(); a = stack.pop()",
        "codeSnippet": "b = stack.pop(); a = stack.pop()",
        "explanation": "First popped is right operand b; second popped is left operand a. Order matters for subtraction and division!"
      }
    ],
    "edgeCases": [
      {
        "case": "Single token",
        "handling": "Directly converts string to integer and returns it.",
        "example": "[\"42\"] -> 42"
      },
      {
        "case": "Division truncation",
        "handling": "int(a / b) rounds towards zero, unlike floor division //.",
        "example": "6 / -132 -> 0"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Reversing operand order on subtraction / division (b - a instead of a - b)",
        "solution": "First popped is the right-hand operand; second popped is the left-hand operand.",
        "codeExample": "b = stack.pop()\na = stack.pop()\nres = a - b"
      }
    ],
    "applications": [
      {
        "industry": "Compilers",
        "application": "Abstract Syntax Tree (AST) evaluation & bytecode generation",
        "benefit": "Direct mapping to JVM/Python virtual machine bytecode."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-ep-1",
        "question": "Convert infix expression (A + B) * (C - D) to postfix.",
        "hint": "Evaluate parentheses first.",
        "answer": "A B + C D - *"
      }
    ],
    "quiz": [
      {
        "id": "q-ep-1",
        "question": "Why does RPN not require parentheses?",
        "options": [
          "The order of operators unambiguously defines the evaluation sequence",
          "Computers cannot read parentheses",
          "Parentheses are converted to numbers",
          "Only additions can be done in RPN"
        ],
        "correctIndex": 0,
        "explanation": "In RPN, operators immediately follow their operands, making precedence rules and parentheses completely unnecessary."
      }
    ],
    "codingChallenge": {
      "title": "Basic Calculator (Addition and Subtraction with Parentheses)",
      "problem": "Implement a basic calculator to evaluate a simple expression string containing digits, \"+\", \"-\", \"(\", and \")\".",
      "hints": [
        "Track current sign and running result.",
        "When seeing \"(\", push current result and sign onto stack."
      ],
      "starterCode": "def calculate(s: str) -> int:\n    # TODO: Implement basic calculator\n    pass",
      "solution": "def calculate(s: str) -> int:\n    stack = []\n    res = 0\n    num = 0\n    sign = 1\n    for ch in s:\n        if ch.isdigit():\n            num = num * 10 + int(ch)\n        elif ch in '+-':\n            res += sign * num\n            num = 0\n            sign = 1 if ch == '+' else -1\n        elif ch == '(':\n            stack.append(res)\n            stack.append(sign)\n            res = 0\n            sign = 1\n        elif ch == ')':\n            res += sign * num\n            num = 0\n            res *= stack.pop() # sign\n            res += stack.pop() # previous res\n    return res + sign * num"
    },
    "summary": {
      "keyTakeaways": [
        "Postfix evaluation is cleanly solved with a single operand stack.",
        "First popped element is always the right operand."
      ],
      "nextLessonId": "dsa-recursion-trees-calls",
      "nextLessonTitle": "Recursion Trees and Call Stacks",
      "nextLessonModuleId": "dsa-module-6"
    },
    "lineByLine": [
      {
        "line": 7,
        "lines": "7",
        "code": "'/': lambda a, b: int(a / b)",
        "codeSnippet": "'/': lambda a, b: int(a / b)",
        "explanation": "Truncates toward zero as required by standard programming language evaluation."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "b = stack.pop(); a = stack.pop()",
        "codeSnippet": "b = stack.pop(); a = stack.pop()",
        "explanation": "First popped is right operand b; second popped is left operand a. Order matters for subtraction and division!"
      }
    ]
  }
};
