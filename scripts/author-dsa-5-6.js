const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

// --- Module 5: Stacks and Queues ---
const m5 = getExistingDSALessons(5);
const m5Lessons = { ...m5.lessons };

m5Lessons['dsa-queue-operations'] = {
  id: 'dsa-queue-operations',
  moduleId: 'dsa-module-5',
  title: 'Queue and Circular Queue',
  subtitle: 'First-In First-Out Architecture & Ring Buffers with Modular Arithmetic',
  order: 2,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'stack-queue',
  objectives: [
    'Understand FIFO (First-In, First-Out) queuing mechanics.',
    'Implement enqueue and dequeue operations in O(1) time.',
    'Overcome array-shifting bottlenecks using fixed-capacity circular ring buffers.',
    'Apply modular arithmetic ((tail + 1) % capacity) for pointer wrap-around.'
  ],
  prerequisites: ['Arrays and Dynamic Arrays', 'Modulo Arithmetic'],
  analogy: {
    title: 'The Supermarket Checkout Line & Carousel',
    text: 'At a supermarket checkout, the first customer to join the line is the first served (FIFO). A circular queue is like a rotating luggage carousel at an airport: when luggage reaches the end of the belt, it loops back to the start, maximizing physical space without wasting capacity.',
    metaphor: 'Circular queues wrap pointers using modular arithmetic, avoiding shifting elements on dequeue.'
  },
  problemSolved: {
    title: 'Eliminating O(n) Shifting Overhead in Linear Arrays',
    description: 'Removing an element from the front of a regular array requires shifting all subsequent elements left by 1, taking O(n) time. A circular queue maintains front and rear indices, enabling both enqueue and dequeue in strictly O(1) time without element relocations.',
    keyPoints: [
      'FIFO guarantees fairness in task and packet scheduling.',
      'Circular arrays reuse freed front slots without memory allocation overhead.',
      'Fundamental for OS scheduling, asynchronous message buffers, and BFS traversals.'
    ]
  },
  intuition: {
    overview: 'Maintain two pointers `front` and `rear` along with `size` and `capacity`. Enqueue places item at `rear` and advances `rear = (rear + 1) % capacity`. Dequeue reads item at `front` and advances `front = (front + 1) % capacity`.',
    steps: [
      { step: 1, title: 'Enqueue Operation', description: 'Check if size == capacity. If not, array[rear] = val, rear = (rear + 1) % capacity, size++.' },
      { step: 2, title: 'Dequeue Operation', description: 'Check if size == 0. If not, val = array[front], front = (front + 1) % capacity, size--.' },
      { step: 3, title: 'Wrap-Around Check', description: 'Modular division ensures indices smoothly recycle back to index 0 when reaching capacity.' }
    ]
  },
  formalDefinition: {
    text: 'A Queue Q is an algebraic structure supporting operations Enqueue(Q, x) and Dequeue(Q) such that Dequeue returns the least-recently inserted element not yet removed. In a circular array buffer of size C, position index i maps to (i + 1) mod C.',
    latex: '\\text{rear}_{t+1} = (\\text{rear}_t + 1) \\pmod C, \\quad \\text{front}_{t+1} = (\\text{front}_t + 1) \\pmod C'
  },
  complexity: {
    overview: 'All primary operations (enqueue, dequeue, front, isEmpty) run in O(1) deterministic time.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Instant pointer arithmetic and direct array index write.' },
      { case: 'Average', time: 'O(1)', space: 'O(1)', explanation: 'No element shifts required.' },
      { case: 'Worst', time: 'O(1)', space: 'O(1)', explanation: 'Consistent bounded execution steps.' }
    ],
    spaceNote: 'O(k) auxiliary memory for a queue with fixed maximum capacity k.'
  },
  workedExample: {
    title: 'Circular Queue of Capacity 3',
    input: 'Operations: enqueue(10), enqueue(20), dequeue(), enqueue(30), enqueue(40)',
    steps: [
      { step: 1, action: 'enqueue(10)', state: 'arr=[10, _, _], front=0, rear=1, size=1', explanation: 'Store 10 at index 0. Advance rear to 1.' },
      { step: 2, action: 'enqueue(20)', state: 'arr=[10, 20, _], front=0, rear=2, size=2', explanation: 'Store 20 at index 1. Advance rear to 2.' },
      { step: 3, action: 'dequeue() -> 10', state: 'arr=[_, 20, _], front=1, rear=2, size=1', explanation: 'Read arr[0]=10. Advance front to (0+1)%3 = 1.' },
      { step: 4, action: 'enqueue(30)', state: 'arr=[_, 20, 30], front=1, rear=0, size=2', explanation: 'Store 30 at index 2. rear wraps to (2+1)%3 = 0.' },
      { step: 5, action: 'enqueue(40)', state: 'arr=[40, 20, 30], front=1, rear=1, size=3', explanation: 'Store 40 at index 0 (recycled slot!). rear wraps to 1.' }
    ],
    finalOutput: 'Queue contains [20, 30, 40] with front at 1 and rear at 1 (full).'
  },
  visualExplanation: {
    title: 'Ring Buffer Architecture',
    description: 'Visualizing a fixed-size buffer as a circle where front chases rear or rear loops past front seamlessly.',
    features: [
      'Front pointer indicates current head of queue.',
      'Rear pointer marks next available open slot.',
      'Size counter disambiguates full buffer from empty buffer.'
    ]
  },
  pseudocode: {
    title: 'Circular Queue Implementation',
    code: `class CircularQueue:
    def __init__(k):
        queue = array of size k
        front = 0
        rear = 0
        size = 0
        capacity = k

    def enqueue(value):
        if size == capacity: return False
        queue[rear] = value
        rear = (rear + 1) % capacity
        size += 1
        return True

    def dequeue():
        if size == 0: return False
        front = (front + 1) % capacity
        size -= 1
        return True`
  },
  pythonCode: {
    title: 'Python Circular Queue Class',
    code: `class CircularQueue:
    def __init__(self, k: int):
        self.capacity = k
        self.queue = [0] * k
        self.front = 0
        self.rear = 0
        self.size = 0

    def enqueue(self, val: int) -> bool:
        if self.is_full():
            return False
        self.queue[self.rear] = val
        self.rear = (self.rear + 1) % self.capacity
        self.size += 1
        return True

    def dequeue(self) -> bool:
        if self.is_empty():
            return False
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return True

    def get_front(self) -> int:
        return -1 if self.is_empty() else self.queue[self.front]

    def get_rear(self) -> int:
        if self.is_empty():
            return -1
        last_idx = (self.rear - 1 + self.capacity) % self.capacity
        return self.queue[last_idx]

    def is_empty(self) -> bool:
        return self.size == 0

    def is_full(self) -> bool:
        return self.size == self.capacity`,
    explanation: 'Maintains fixed capacity array with modulo updates on pointers.'
  },
  runnableCode: {
    code: `q = CircularQueue(3)
print(q.enqueue(10)) # True
print(q.enqueue(20)) # True
print(q.dequeue())    # True
print(q.enqueue(30)) # True
print(q.enqueue(40)) # True
print(q.is_full())   # True
print(q.get_front()) # 20
print(q.get_rear())  # 40`,
    expectedOutput: `True\nTrue\nTrue\nTrue\nTrue\nTrue\n20\n40`
  },
  lineByLineExplanation: [
    { line: 5, code: 'self.queue = [0] * k', explanation: 'Pre-allocate static memory to avoid dynamic resizing reallocation penalties.' },
    { line: 13, code: 'self.rear = (self.rear + 1) % self.capacity', explanation: 'Modular increment wraps rear pointer back to index 0 after capacity - 1.' },
    { line: 20, code: 'self.front = (self.front + 1) % self.capacity', explanation: 'Modular increment advances front pointer efficiently in O(1).' }
  ],
  edgeCases: [
    { case: 'Enqueue when full', handling: 'Guard with is_full() check and return False without overwriting valid data.', example: 'Cap=3, enqueue 4th item.' },
    { case: 'Dequeue when empty', handling: 'Guard with is_empty() check and return False.', example: 'Empty queue dequeue.' },
    { case: 'Single element queue', handling: 'front and rear advance correctly and size drops to 0.', example: 'Enqueue 1, Dequeue 1.' }
  ],
  commonMistakes: [
    { mistake: 'Using list.pop(0) in Python', solution: 'list.pop(0) causes O(n) element shifts; use collections.deque or circular queue for O(1).', codeExample: 'from collections import deque\nq = deque()' },
    { mistake: 'Incorrect rear index calculation in get_rear()', solution: 'Since rear points to the next write slot, read at (rear - 1 + capacity) % capacity.', codeExample: 'idx = (self.rear - 1 + self.capacity) % self.capacity' }
  ],
  applications: [
    { industry: 'Operating Systems', application: 'Process and thread scheduling queues (round-robin)', benefit: 'O(1) fair dispatching without latency spikes.' },
    { industry: 'Networking', application: 'Network router incoming packet buffering', benefit: 'Prevents dropped packets while handling bursts.' },
    { industry: 'Hardware', application: 'Keyboard buffer / serial I/O hardware queues', benefit: 'Fixed circular buffer safely records user keystrokes.' }
  ],
  practiceQuestions: [
    { id: 'pq-cq-1', question: 'Why does circular queue utilize modular arithmetic instead of resetting front to 0?', hint: 'Consider the cost of shifting elements left.', answer: 'Modular arithmetic allows front and rear to wrap around continuously in O(1) without requiring expensive O(n) shifts of remaining elements.' },
    { id: 'pq-cq-2', question: 'How can you distinguish an empty circular queue from a full circular queue without a size variable?', hint: 'Think about leaving one empty slot or using boolean flags.', answer: 'Either reserve one unused slot (full when (rear + 1) % cap == front) or maintain an explicit boolean flag / size counter.' },
    { id: 'pq-cq-3', question: 'What is the time complexity of reversing a queue using only standard queue operations?', hint: 'Use an auxiliary stack.', answer: 'O(n) time and O(n) space by dequeuing all elements onto a stack and then popping them back into the queue.' }
  ],
  quiz: [
    { id: 'q-cq-1', question: 'What is the time complexity of dequeue in a static circular queue?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(k)'], correctIndex: 0, explanation: 'Circular queue dequeue only updates the front pointer using modular arithmetic, taking O(1) deterministic time.' },
    { id: 'q-cq-2', question: 'If capacity=5, front=4, and we dequeue, what is the new front index?', options: ['0', '5', '3', '-1'], correctIndex: 0, explanation: '(4 + 1) % 5 = 0, wrapping around to the start of the buffer.' },
    { id: 'q-cq-3', question: 'Why is list.pop(0) inefficient for implementing a queue in Python?', options: ['It requires O(n) time to shift all subsequent elements to the left', 'It creates memory leaks', 'Python lists do not allow pop(0)', 'It only works with numbers'], correctIndex: 0, explanation: 'Python lists are dynamic arrays; removing index 0 requires shifting all subsequent n-1 elements left.' }
  ],
  codingChallenge: {
    title: 'Implement Queue using Stacks',
    problem: 'Implement a FIFO queue using only two LIFO stacks. Implement push, pop, peek, and empty operations.',
    hints: ['Use one stack for input (push) and another stack for output (pop/peek).', 'Transfer elements from in_stack to out_stack only when out_stack is empty.'],
    starterCode: `class MyQueue:
    def __init__(self):
        self.in_stk = []
        self.out_stk = []

    def push(self, x: int) -> None:
        # TODO: Implement push
        pass

    def pop(self) -> int:
        # TODO: Implement pop
        pass

    def peek(self) -> int:
        # TODO: Implement peek
        pass

    def empty(self) -> bool:
        # TODO: Implement empty
        pass`,
    solution: `class MyQueue:
    def __init__(self):
        self.in_stk = []
        self.out_stk = []

    def push(self, x: int) -> None:
        self.in_stk.append(x)

    def _shift(self) -> None:
        if not self.out_stk:
            while self.in_stk:
                self.out_stk.append(self.in_stk.pop())

    def pop(self) -> int:
        self._shift()
        return self.out_stk.pop()

    def peek(self) -> int:
        self._shift()
        return self.out_stk[-1]

    def empty(self) -> bool:
        return not self.in_stk and not self.out_stk`
  },
  summary: {
    keyTakeaways: [
      'Queues provide strict FIFO ordering.',
      'Circular queues achieve O(1) enqueue and dequeue in fixed memory using modulo arithmetic.',
      'In Python, collections.deque is the standard doubly-linked list queue implementation.'
    ],
    nextLessonId: 'dsa-deque',
    nextLessonTitle: 'Deque — Double-Ended Queue',
    nextLessonModuleId: 'dsa-module-5'
  }
};

m5Lessons['dsa-deque'] = {
  id: 'dsa-deque',
  moduleId: 'dsa-module-5',
  title: 'Deque — Double-Ended Queue',
  subtitle: 'Bi-Directional Insertion and Deletion in Constant Time',
  order: 3,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'stack-queue',
  objectives: [
    'Master double-ended queues supporting push/pop from both ends in O(1).',
    'Compare doubly linked list vs circular array implementations of deques.',
    'Understand why deques generalize both stacks and queues.',
    'Utilize deques in sliding window algorithms and palindrome validation.'
  ],
  prerequisites: ['Stack: Operations and Applications', 'Queue and Circular Queue'],
  analogy: {
    title: 'The Two-Ended Train Car',
    text: 'A passenger train car with open doors at both ends allows passengers to board or disembark from either the front or the back independently. Depending on how passengers enter and exit, it functions as a stack, a queue, or both simultaneously.',
    metaphor: 'A deque provides push_front, push_back, pop_front, and pop_back all in O(1) time.'
  },
  problemSolved: {
    title: 'Unified High-Performance Queue and Stack Abstraction',
    description: 'Many algorithmic problems require additions and removals at opposite ends dynamically (such as maintaining a monotonic sliding window). A deque satisfies both FIFO and LIFO patterns without compromises.',
    keyPoints: [
      'O(1) operations at both boundaries.',
      'Serves as the internal engine for sliding window minimum/maximum.',
      'Supports efficient work-stealing scheduling algorithms.'
    ]
  },
  intuition: {
    overview: 'Maintain links or pointers to both ends. Push front shifts front backwards or links before head; push back appends after tail.',
    steps: [
      { step: 1, title: 'Push Front/Back', description: 'Insert directly adjacent to current front/back pointer in O(1).' },
      { step: 2, title: 'Pop Front/Back', description: 'Extract node at requested end and update boundary pointer in O(1).' }
    ]
  },
  formalDefinition: {
    text: 'A Deque D is an abstract sequence type supporting append_left(x), append_right(x), pop_left(), and pop_right(), all having amortized or worst-case O(1) operational complexity.',
    latex: '\\mathcal{O}(\\text{push\\_front}) = \\mathcal{O}(\\text{push\\_back}) = \\mathcal{O}(\\text{pop\\_front}) = \\mathcal{O}(\\text{pop\\_back}) = O(1)'
  },
  complexity: {
    overview: 'All end mutations take O(1) time. Random access is O(1) in circular buffer or O(n) in linked list.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Boundary manipulation.' },
      { case: 'Average', time: 'O(1)', space: 'O(1)', explanation: 'Consistent constant time.' },
      { case: 'Worst', time: 'O(1)', space: 'O(1)', explanation: 'Deterministic O(1) end access.' }
    ],
    spaceNote: 'O(n) linear space to store n elements.'
  },
  workedExample: {
    title: 'Palindrome Checking with Deque',
    input: '"racecar"',
    steps: [
      { step: 1, action: 'Pop front and pop back', state: 'front="r", back="r"', explanation: '"r" == "r", match! Remaining: "aceca"' },
      { step: 2, action: 'Pop front and pop back', state: 'front="a", back="a"', explanation: '"a" == "a", match! Remaining: "cec"' },
      { step: 3, action: 'Pop front and pop back', state: 'front="c", back="c"', explanation: '"c" == "c", match! Remaining: "e"' },
      { step: 4, action: 'Single element left', state: 'length <= 1', explanation: 'Valid palindrome confirmed.' }
    ],
    finalOutput: 'True (racecar is a valid palindrome)'
  },
  visualExplanation: {
    title: 'Double-Ended Operations',
    description: 'Visualizing both ends open for insertion and deletion.',
    features: ['Left pointer manages popleft/appendleft', 'Right pointer manages pop/append']
  },
  pseudocode: {
    title: 'Palindrome Check using Deque',
    code: `function isPalindrome(text):
    dq = new Deque()
    for char in text:
        dq.append_right(char)
    while dq.size > 1:
        if dq.pop_left() != dq.pop_right():
            return False
    return True`
  },
  pythonCode: {
    title: 'Python collections.deque Usage',
    code: `from collections import deque

def check_palindrome(s: str) -> bool:
    dq = deque(s.lower())
    while len(dq) > 1:
        if dq.popleft() != dq.pop():
            return False
    return True`,
    explanation: 'Python collections.deque uses a doubly linked list of memory blocks.'
  },
  runnableCode: {
    code: `from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)
dq.append(4)
print(list(dq))
print(dq.popleft())
print(dq.pop())
print(list(dq))`,
    expectedOutput: `[0, 1, 2, 3, 4]\n0\n4\n[1, 2, 3]`
  },
  lineByLineExplanation: [
    { line: 3, code: 'dq.appendleft(0)', explanation: 'Inserts 0 at the front of the deque in O(1) time.' },
    { line: 6, code: 'dq.popleft()', explanation: 'Removes and returns the frontmost item in O(1) time.' }
  ],
  edgeCases: [
    { case: 'Empty deque pop', handling: 'Raises IndexError in Python; check len(dq) > 0 first.', example: 'deque().pop()' },
    { case: 'Single character string in palindrome check', handling: 'Loop terminates immediately, returns True.', example: '"a"' }
  ],
  commonMistakes: [
    { mistake: 'Using list instead of deque for frequent pop(0)', solution: 'Always use collections.deque when prepending or popping left.', codeExample: 'from collections import deque\nq = deque()' }
  ],
  applications: [
    { industry: 'Compilers', application: 'Syntax token streaming and lookahead buffering', benefit: 'O(1) pushback and pop.' },
    { industry: 'Distributed Computing', application: 'Work-stealing thread pools', benefit: 'Worker threads push/pop from their own end; idle workers steal from the other end.' }
  ],
  practiceQuestions: [
    { id: 'pq-dq-1', question: 'How does collections.deque achieve O(1) indexed operations compared to a raw doubly linked list?', hint: 'Blocks of arrays.', answer: 'Python deque uses a doubly linked list of fixed-size blocks (usually 64 elements each), combining array locality with O(1) end manipulation.' }
  ],
  quiz: [
    { id: 'q-dq-1', question: 'What is the time complexity of appendleft and popleft on collections.deque?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(k)'], correctIndex: 0, explanation: 'collections.deque provides O(1) push and pop from both ends.' }
  ],
  codingChallenge: {
    title: 'Sliding Window Maximum (Intro)',
    problem: 'Given an array and window size k, return the maximum element in each sliding window.',
    hints: ['Store indices in a deque.', 'Maintain elements in decreasing order in the deque.'],
    starterCode: `from collections import deque

def max_sliding_window(nums, k):
    # TODO: Implement using deque
    pass`,
    solution: `from collections import deque

def max_sliding_window(nums, k):
    dq = deque()
    res = []
    for i, num in enumerate(nums):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res`
  },
  summary: {
    keyTakeaways: ['Deques support O(1) mutations at both ends.', 'Essential for sliding window optimization.'],
    nextLessonId: 'dsa-monotonic-stack',
    nextLessonTitle: 'Monotonic Stack and Queue',
    nextLessonModuleId: 'dsa-module-5'
  }
};

m5Lessons['dsa-monotonic-stack'] = {
  id: 'dsa-monotonic-stack',
  moduleId: 'dsa-module-5',
  title: 'Monotonic Stack and Queue',
  subtitle: 'Maintaining Sorted Invariants to Solve Nearest Greater/Smaller Problems in O(n)',
  order: 4,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'stack-queue',
  objectives: [
    'Define strictly increasing and non-decreasing monotonic stack invariants.',
    'Solve "Next Greater Element" and "Previous Smaller Element" in linear O(n) time.',
    'Understand why amortized time per element is O(1) despite nested loops.',
    'Apply monotonic stacks to Trapping Rain Water and Largest Rectangle in Histogram.'
  ],
  prerequisites: ['Stack: Operations and Applications'],
  analogy: {
    title: 'Line of Sight Across Skyscrapers',
    text: 'Imagine standing on a skyscraper and looking horizontally. A taller building ahead completely obscures any shorter buildings behind it. A monotonic decreasing stack preserves this line-of-sight: any new taller building "pops" and replaces all shorter preceding buildings.',
    metaphor: 'Elements that can never again be the nearest boundary are evicted permanently.'
  },
  problemSolved: {
    title: 'Reducing O(n^2) Quadratic Scans to O(n) Single Passes',
    description: 'Finding the next greater or previous smaller element for all items naively requires scanning remaining elements for each index, costing O(n^2). A monotonic stack processes every item exactly once on push and once on pop, achieving O(n) overall time.',
    keyPoints: [
      'Each element enters and leaves the stack at most once.',
      'Eliminates redundant comparisons by pruning non-optimal candidates.',
      'Solves stock span, histogram rectangles, and water trapping effortlessly.'
    ]
  },
  intuition: {
    overview: 'Before pushing element x, pop all elements from the stack that violate the monotonic invariant (e.g. elements <= x). The remaining top of the stack is the immediate previous greater element.',
    steps: [
      { step: 1, title: 'Invariant Check', description: 'While stack is non-empty and stack.top <= current_val: stack.pop().' },
      { step: 2, title: 'Extract Answer', description: 'If stack is not empty, stack.top is the nearest greater element. Else, no greater element exists (-1).' },
      { step: 3, title: 'Push Current', description: 'Push current element (or index) onto stack to act as a potential boundary for future items.' }
    ]
  },
  formalDefinition: {
    text: 'A monotonic stack S maintains a sequence of elements (s_1, s_2, ..., s_k) such that s_i < s_{i+1} (monotonically increasing) or s_i > s_{i+1} (monotonically decreasing) for all 1 <= i < k.',
    latex: '\\forall i \\in [1, k-1], \\quad s_i > s_{i+1} \\quad (\\text{Decreasing Monotonic Stack})'
  },
  complexity: {
    overview: 'Time complexity is strictly O(n) amortized across the entire array.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(n)', explanation: 'Sorted input array.' },
      { case: 'Average', time: 'O(n)', space: 'O(n)', explanation: 'Each element pushed once and popped at most once: 2n operations total.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Reverse sorted array.' }
    ],
    spaceNote: 'O(n) auxiliary memory to store elements or indices on the stack.'
  },
  workedExample: {
    title: 'Next Greater Element for [2, 1, 2, 4, 3]',
    input: 'arr = [2, 1, 2, 4, 3]',
    steps: [
      { step: 1, action: 'Process 3 (from right)', state: 'stack=[3], ans[4]=-1', explanation: 'Empty stack -> -1. Push 3.' },
      { step: 2, action: 'Process 4', state: 'pop 3; stack=[4], ans[3]=-1', explanation: '3 <= 4, pop 3. Stack empty -> -1. Push 4.' },
      { step: 3, action: 'Process 2', state: 'stack=[4, 2], ans[2]=4', explanation: 'Top is 4 > 2. ans=4. Push 2.' },
      { step: 4, action: 'Process 1', state: 'stack=[4, 2, 1], ans[1]=2', explanation: 'Top is 2 > 1. ans=2. Push 1.' },
      { step: 5, action: 'Process 2', state: 'pop 1; stack=[4, 2], ans[0]=4', explanation: 'Pop 1 (<= 2). Top is 4 > 2. ans=4. Push 2.' }
    ],
    finalOutput: 'ans = [4, 2, 4, -1, -1]'
  },
  visualExplanation: {
    title: 'Monotonic Pruning',
    description: 'Visualizing obsolete elements being popped off as a new dominant height enters the scan.',
    features: ['Stack maintains decreasing staircase of values', 'Elements popped are never needed again']
  },
  pseudocode: {
    title: 'Next Greater Element Algorithm',
    code: `function nextGreaterElements(nums):
    n = length(nums)
    result = array of size n filled with -1
    stack = empty stack (stores indices)
    
    for i from 0 to n - 1:
        while stack is not empty and nums[stack.top()] < nums[i]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.push(i)
        
    return result`
  },
  pythonCode: {
    title: 'Next Greater Element Implementation',
    code: `def next_greater_elements(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [-1] * n
    stack = [] # stores indices
    
    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            prev_idx = stack.pop()
            res[prev_idx] = nums[i]
        stack.append(i)
        
    return res`,
    explanation: 'Iterates through array, popping elements whose next greater is nums[i].'
  },
  runnableCode: {
    code: `nums = [2, 1, 2, 4, 3]
print(next_greater_elements(nums))`,
    expectedOutput: `[4, 2, 4, -1, -1]`
  },
  lineByLineExplanation: [
    { line: 6, code: 'while stack and nums[stack[-1]] < nums[i]:', explanation: 'Checks monotonic invariant. While top is smaller than incoming num, current num is its next greater.' },
    { line: 7, code: 'prev_idx = stack.pop()', explanation: 'Resolve the answer for prev_idx.' },
    { line: 9, code: 'stack.append(i)', explanation: 'Push current index onto stack to find its next greater in future iterations.' }
  ],
  edgeCases: [
    { case: 'All strictly decreasing elements', handling: 'No elements pop during scan; all end up with -1.', example: '[5, 4, 3, 2, 1]' },
    { case: 'All identical elements', handling: 'Strict inequality < ensures duplicates stay on stack until greater appears.', example: '[2, 2, 2]' }
  ],
  commonMistakes: [
    { mistake: 'Storing values instead of indices', solution: 'Store indices on stack so you can write answers directly to res[idx] and calculate distances/widths.', codeExample: 'stack.append(i) # good' }
  ],
  applications: [
    { industry: 'Finance', application: 'Daily stock temperature span analysis', benefit: 'Computes consecutive days with lower prices in O(n).' },
    { industry: 'Computer Graphics', application: 'Skyline computation and occlusion culling', benefit: 'Discards hidden surfaces in linear passes.' }
  ],
  practiceQuestions: [
    { id: 'pq-ms-1', question: 'Why is the total time O(n) even though there is a while loop inside a for loop?', hint: 'Count the total number of push and pop operations.', answer: 'Each of the n elements is pushed to the stack exactly once, and can be popped at most once. Hence total stack operations <= 2n, making it O(n) overall.' }
  ],
  quiz: [
    { id: 'q-ms-1', question: 'What invariant does a monotonic increasing stack maintain?', options: ['Elements from bottom to top are strictly or non-decreasingly increasing', 'Elements from bottom to top are decreasing', 'Stack size is always increasing', 'Pushes always succeed'], correctIndex: 0, explanation: 'A monotonic increasing stack preserves elements in sorted ascending order from bottom to top.' }
  ],
  codingChallenge: {
    title: 'Daily Temperatures',
    problem: 'Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If no future day is warmer, answer[i] = 0.',
    hints: ['Use a monotonic decreasing stack storing day indices.', 'When a warmer day arrives, the distance is current_day - previous_day.'],
    starterCode: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    # TODO: Implement using monotonic stack
    pass`,
    solution: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    ans = [0] * n
    stack = []
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            prev = stack.pop()
            ans[prev] = i - prev
        stack.append(i)
    return ans`
  },
  summary: {
    keyTakeaways: ['Monotonic stacks solve nearest greater/smaller problems in O(n).', 'Always consider storing indices on stack to measure span distances.'],
    nextLessonId: 'dsa-balanced-parentheses',
    nextLessonTitle: 'Balanced Parentheses',
    nextLessonModuleId: 'dsa-module-5'
  }
};

m5Lessons['dsa-balanced-parentheses'] = {
  id: 'dsa-balanced-parentheses',
  moduleId: 'dsa-module-5',
  title: 'Balanced Parentheses',
  subtitle: 'Grammar Parsing, Matching Brackets, and Nesting Invariants',
  order: 5,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'stack-queue',
  objectives: [
    'Validate nested bracket expressions (), {}, [] using LIFO semantics.',
    'Map opening brackets to corresponding closing brackets via hash tables.',
    'Detect unbalanced sequences: premature closing, mismatched types, and trailing opens.',
    'Analyze space and time complexity for syntax validation.'
  ],
  prerequisites: ['Stack: Operations and Applications'],
  analogy: {
    title: 'Russian Nesting Matryoshka Dolls',
    text: 'Every outer nesting doll opened must be the last one closed. If you open a large doll, then a medium doll, you must close the medium doll first before you can close the large doll. Any attempt to close out of order breaks the shell.',
    metaphor: 'The most recently opened bracket must be the first one closed.'
  },
  problemSolved: {
    title: 'Validating Hierarchical Syntax in Compilers and Parsers',
    description: 'Code syntax in every programming language requires matching delimiters. A stack validates that every closing delimiter matches the type of the most recently unmatched opening delimiter in O(n) time and O(n) space.',
    keyPoints: [
      'Core component of IDE syntax highlighters and linters.',
      'Immediate O(1) mismatch failure detection.',
      'Handles arbitrary nesting depths cleanly.'
    ]
  },
  intuition: {
    overview: 'Iterate through string. When seeing an open bracket, push onto stack. When seeing a closing bracket, pop top of stack and check if it matches. At end, stack must be empty.',
    steps: [
      { step: 1, title: 'Push Openings', description: 'When character is (, {, or [, push it.' },
      { step: 2, title: 'Match Closings', description: 'When character is ), }, or ], stack must not be empty and popped element must match.' },
      { step: 3, title: 'Final Empty Check', description: 'Return True if stack is completely empty at the end.' }
    ]
  },
  formalDefinition: {
    text: 'A string of brackets w over alphabet \\Sigma = \\{(,),\\{,\\},[,[\\]\\} is balanced if w = \\epsilon (empty string), or w = (u), w = \\{u\\}, w = [u], or w = uv where u, v are balanced.',
    latex: 'S \\to \\epsilon \\mid (S) \\mid \\{S\\} \\mid [S] \\mid SS'
  },
  complexity: {
    overview: 'Time: O(n) single pass over string of length n. Space: O(n) worst-case stack depth.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Starts with closing bracket: fails immediately.' },
      { case: 'Average', time: 'O(n)', space: 'O(n)', explanation: 'Linear traversal of string.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'All opening brackets followed by matching closings.' }
    ],
    spaceNote: 'O(n) memory when all characters are opening brackets.'
  },
  workedExample: {
    title: 'Validating "{[()]}"',
    input: 's = "{[()]}"',
    steps: [
      { step: 1, action: 'Read "{"', state: 'stack=["{"]', explanation: 'Opening bracket, push.' },
      { step: 2, action: 'Read "["', state: 'stack=["{", "["]', explanation: 'Opening bracket, push.' },
      { step: 3, action: 'Read "("', state: 'stack=["{", "[", "("]', explanation: 'Opening bracket, push.' },
      { step: 4, action: 'Read ")"', state: 'stack=["{", "["]', explanation: 'Matches popped "(". Valid.' },
      { step: 5, action: 'Read "]"', state: 'stack=["{"]', explanation: 'Matches popped "[". Valid.' },
      { step: 6, action: 'Read "}"', state: 'stack=[]', explanation: 'Matches popped "{". Valid.' }
    ],
    finalOutput: 'True (Stack is empty, string is balanced)'
  },
  visualExplanation: {
    title: 'LIFO Bracket Matching',
    description: 'Visualizing stack growth on openings and contraction on valid closing matches.',
    features: ['Stack grows deeper as nesting increases', 'Mismatched pop causes immediate invalidation']
  },
  pseudocode: {
    title: 'Balanced Parentheses Algorithm',
    code: `function isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.push(char)
    return len(stack) == 0`
  },
  pythonCode: {
    title: 'Python Valid Parentheses',
    code: `def is_valid_parentheses(s: str) -> bool:
    stack = []
    bracket_map = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in bracket_map:
            top = stack.pop() if stack else '#'
            if bracket_map[char] != top:
                return False
        else:
            stack.append(char)
            
    return not stack`,
    explanation: 'Uses a dictionary mapping closing brackets to openings.'
  },
  runnableCode: {
    code: `print(is_valid_parentheses("{[()]}")) # True
print(is_valid_parentheses("([)]"))   # False
print(is_valid_parentheses("(("))     # False`,
    expectedOutput: `True\nFalse\nFalse`
  },
  lineByLineExplanation: [
    { line: 6, code: 'top = stack.pop() if stack else "#"', explanation: 'Safely extracts top character or sentinel "#" if stack is empty.' },
    { line: 7, code: 'if bracket_map[char] != top: return False', explanation: 'Fails immediately if closing bracket does not match last opening bracket.' },
    { line: 11, code: 'return not stack', explanation: 'Verifies no leftover unclosed opening brackets remain.' }
  ],
  edgeCases: [
    { case: 'Empty string', handling: 'Returns True vacuously.', example: '""' },
    { case: 'Starts with closing bracket', handling: 'Stack is empty, top is "#", returns False.', example: '")("' },
    { case: 'Odd string length', handling: 'Can return False immediately if length is odd.', example: '"((("' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting to check if stack is empty at the end', solution: 'Check return not stack; otherwise "(((" would wrongly return True.', codeExample: 'return len(stack) == 0' }
  ],
  applications: [
    { industry: 'Software Development', application: 'Code editors and JSON/XML validators', benefit: 'Highlights unmatched brackets in real time.' },
    { industry: 'Database Engineering', application: 'SQL query parser subquery matching', benefit: 'Ensures correct parenthesization of nested joins and clauses.' }
  ],
  practiceQuestions: [
    { id: 'pq-bp-1', question: 'Can balanced parentheses with only one type of bracket "()" be solved in O(1) space?', hint: 'Count open brackets.', answer: 'Yes! Maintain an integer counter incremented on "(" and decremented on ")". If counter < 0, invalid. Valid if counter == 0 at the end.' }
  ],
  quiz: [
    { id: 'q-bp-1', question: 'What does it mean if the stack is non-empty after checking all characters?', options: ['There are unclosed opening brackets', 'The string is valid', 'There were too many closing brackets', 'An invalid character was found'], correctIndex: 0, explanation: 'Unmatched opening brackets remain in the stack, meaning the expression was not properly closed.' }
  ],
  codingChallenge: {
    title: 'Minimum Add to Make Parentheses Valid',
    problem: 'Given a parentheses string s containing only "(" and ")", return the minimum number of parentheses we must add to make the resulting string valid.',
    hints: ['Count unmatched open brackets and unmatched closing brackets.'],
    starterCode: `def min_add_to_make_valid(s: str) -> int:
    # TODO: Calculate minimum additions needed
    pass`,
    solution: `def min_add_to_make_valid(s: str) -> int:
    open_count = 0
    additions = 0
    for ch in s:
        if ch == '(':
            open_count += 1
        else:
            if open_count > 0:
                open_count -= 1
            else:
                additions += 1
    return additions + open_count`
  },
  summary: {
    keyTakeaways: ['Stacks naturally enforce hierarchical matching invariants.', 'Hash table mapping simplifies multi-delimiter handling.'],
    nextLessonId: 'dsa-next-greater-element',
    nextLessonTitle: 'Next Greater Element',
    nextLessonModuleId: 'dsa-module-5'
  }
};

m5Lessons['dsa-next-greater-element'] = {
  id: 'dsa-next-greater-element',
  moduleId: 'dsa-module-5',
  title: 'Next Greater Element',
  subtitle: 'Mastering Circular and Distance Variations with Stacks',
  order: 6,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'stack-queue',
  objectives: [
    'Generalize monotonic stack patterns to circular arrays using 2n virtual iterations.',
    'Map answers between subsets and parent arrays using hash tables.',
    'Understand distance-based queries (Next Greater Element Distance).',
    'Write clean, production-ready stack algorithms for array variations.'
  ],
  prerequisites: ['Monotonic Stack and Queue'],
  analogy: {
    title: 'The Circular Clock Face',
    text: 'On a 12-hour clock, 11 o\'clock looks forward and finds 12 o\'clock, but 12 o\'clock looks forward and wraps around to 1 o\'clock. By running a race twice around the clock (2n steps), every position gets a fair chance to find a greater element wrapping around.',
    metaphor: 'Simulate a circular array by looping up to 2n - 1 using index modulo n.'
  },
  problemSolved: {
    title: 'Finding Next Greater Elements with Circular Wrap-Around',
    description: 'In circular arrays, the next greater element for the last item might be at the start of the array. Duplicating the traversal (2n iterations) with index % n allows seamless circular lookahead in O(n) time.',
    keyPoints: [
      'Avoids actually doubling the array memory.',
      'Operates in O(n) time and O(n) space.',
      'Common question in technical coding interviews.'
    ]
  },
  intuition: {
    overview: 'Loop i from 2n - 1 down to 0. Access array element at i % n. Maintain monotonic decreasing stack. If i < n, stack top is the circular next greater element.',
    steps: [
      { step: 1, title: 'Virtual Double Loop', description: 'Iterate i from 2n-1 down to 0.' },
      { step: 2, title: 'Stack Pruning', description: 'Pop elements from stack that are <= nums[i % n].' },
      { step: 3, title: 'Record Result', description: 'When i < n, record stack.top() as the answer for index i.' }
    ]
  },
  formalDefinition: {
    text: 'For a circular array A of length n, the circular next greater element of A[i] is A[j] where j = (i + k) mod n for minimal k > 0 such that A[j] > A[i].',
    latex: '\\text{NGE}(i) = A[j] \\quad \\text{where } j = (i + k) \\pmod n, \\, k = \\min \\{m > 0 : A[(i + m) \\pmod n] > A[i]\\}'
  },
  complexity: {
    overview: 'Time: O(n) because 2n iterations process elements into stack. Space: O(n).',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(n)', explanation: 'Linear time scan.' },
      { case: 'Average', time: 'O(n)', space: 'O(n)', explanation: 'Total pops <= 2n.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Monotonically decreasing array.' }
    ],
    spaceNote: 'O(n) auxiliary stack and output array.'
  },
  workedExample: {
    title: 'Next Greater Element II on [1, 2, 1]',
    input: 'nums = [1, 2, 1]',
    steps: [
      { step: 1, action: 'Virtual pass i=5 to 3', state: 'Pushes elements to prep stack for wrap-around.', explanation: 'Stack populated with candidates from second half.' },
      { step: 2, action: 'i=2 (val=1)', state: 'Top of stack is 2 > 1 -> ans[2]=2', explanation: 'Wrap-around element 2 is greater than 1.' },
      { step: 3, action: 'i=1 (val=2)', state: 'Stack elements <= 2 popped -> ans[1]=-1', explanation: '2 is the maximum element in array, no greater element exists.' },
      { step: 4, action: 'i=0 (val=1)', state: 'Top of stack is 2 -> ans[0]=2', explanation: 'Next greater is 2.' }
    ],
    finalOutput: 'ans = [2, -1, 2]'
  },
  visualExplanation: {
    title: 'Circular Monotonic Stack',
    description: 'Scanning 2n elements with modulo arithmetic to effortlessly look over the array edge.',
    features: ['Double-pass ensures first element can serve as next greater for last element', 'O(1) memory overhead beyond stack']
  },
  pseudocode: {
    title: 'Circular Next Greater Element',
    code: `function nextGreaterElementsII(nums):
    n = length(nums)
    res = array of size n with -1
    stack = []
    for i from 2*n - 1 down to 0:
        val = nums[i % n]
        while stack and stack.top() <= val:
            stack.pop()
        if i < n:
            if stack: res[i] = stack.top()
        stack.push(val)
    return res`
  },
  pythonCode: {
    title: 'Python Circular Next Greater',
    code: `def next_greater_elements_circular(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [-1] * n
    stack = []
    
    for i in range(2 * n - 1, -1, -1):
        num = nums[i % n]
        while stack and stack[-1] <= num:
            stack.pop()
        if i < n and stack:
            res[i] = stack[-1]
        stack.append(num)
        
    return res`,
    explanation: 'Uses 2n-1 down to 0 reverse traversal with modulo indexing.'
  },
  runnableCode: {
    code: `print(next_greater_elements_circular([1, 2, 1]))
print(next_greater_elements_circular([3, 8, 4, 1, 2]))`,
    expectedOutput: `[2, -1, 2]\n[8, -1, 8, 2, 3]`
  },
  lineByLineExplanation: [
    { line: 6, code: 'for i in range(2 * n - 1, -1, -1):', explanation: 'Runs 2n iterations to simulate circular traversal without physical memory allocation.' },
    { line: 7, code: 'num = nums[i % n]', explanation: 'Maps virtual index back to physical array.' },
    { line: 10, code: 'if i < n and stack: res[i] = stack[-1]', explanation: 'Only records answer during the first real traversal pass (i < n).' }
  ],
  edgeCases: [
    { case: 'Array with single element', handling: 'Returns [-1] as no strictly greater element can exist.', example: '[1]' },
    { case: 'All identical values', handling: 'Returns [-1, ..., -1] since equality is not strictly greater.', example: '[4, 4, 4]' }
  ],
  commonMistakes: [
    { mistake: 'Duplicating the list physically nums + nums', solution: 'nums + nums takes O(n) extra space; use index modulo (i % n) instead.', codeExample: 'val = nums[i % n]' }
  ],
  applications: [
    { industry: 'Sensor Networks', application: 'Circular ring buffer peak detection', benefit: 'Finds next high-voltage peak seamlessly across buffer boundary.' }
  ],
  practiceQuestions: [
    { id: 'pq-nge-1', question: 'How would you find the Previous Greater Element instead of Next Greater?', hint: 'Traverse left-to-right (0 to n-1).', answer: 'Traverse from 0 to n-1 maintaining a decreasing stack; before pushing nums[i], pop all <= nums[i]; top is previous greater.' }
  ],
  quiz: [
    { id: 'q-nge-1', question: 'Why is 2n iterations sufficient to resolve circular next greater elements?', options: ['The furthest possible lookahead in a circular array is n-1 elements away', '2n matches the maximum integer size', 'Stacks require power of 2 iterations', 'It avoids memory fragmentation'], correctIndex: 0, explanation: 'In a circular array of size n, checking up to n-1 positions forward covers every element in the array.' }
  ],
  codingChallenge: {
    title: 'Next Greater Element I (Subset Mapping)',
    problem: 'Given nums1 as a subset of nums2, find next greater element for each item in nums1 within nums2.',
    hints: ['Run monotonic stack on nums2 and store results in a hash map.', 'Then query map for each element in nums1.'],
    starterCode: `def next_greater_element(nums1: list[int], nums2: list[int]) -> list[int]:
    # TODO: Implement mapping
    pass`,
    solution: `def next_greater_element(nums1: list[int], nums2: list[int]) -> list[int]:
    mapping = {}
    stack = []
    for num in nums2:
        while stack and stack[-1] < num:
            mapping[stack.pop()] = num
        stack.append(num)
    return [mapping.get(x, -1) for x in nums1]`
  },
  summary: {
    keyTakeaways: ['Virtual 2n loop solves circular array queries cleanly in O(n).', 'Hash maps bridge monotonic stack results across subset queries.'],
    nextLessonId: 'dsa-min-stack',
    nextLessonTitle: 'Min Stack Design',
    nextLessonModuleId: 'dsa-module-5'
  }
};

m5Lessons['dsa-min-stack'] = {
  id: 'dsa-min-stack',
  moduleId: 'dsa-module-5',
  title: 'Min Stack Design',
  subtitle: 'Retrieving Minimum Element in O(1) Time Using Auxiliary Invariants',
  order: 7,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'stack-queue',
  objectives: [
    'Design a stack supporting push, pop, top, and getMin in strictly O(1) time.',
    'Implement dual-stack architecture (primary stack + min-tracking stack).',
    'Explore space-optimized single-stack mathematical encoding (2*val - minVal).',
    'Identify trade-offs between memory footprint and arithmetic overflow safety.'
  ],
  prerequisites: ['Stack: Operations and Applications'],
  analogy: {
    title: 'The Dual Notebook System',
    text: 'A clerk keeps a ledger of stock prices. In a second pocket notebook, the clerk writes down the all-time lowest price seen so far. Every time a new price is recorded, the pocket notebook records min(new_price, current_lowest). When a page in the ledger is torn out, the corresponding pocket notebook entry is also torn out.',
    metaphor: 'Synchronized auxiliary stack tracks running minimum at every stack depth.'
  },
  problemSolved: {
    title: 'Instant O(1) Minimum Queries on Dynamic LIFO Data',
    description: 'Scanning a stack to find its minimum takes O(n) time. By recording the running minimum alongside each push, getMin() returns in strictly O(1) deterministic time.',
    keyPoints: [
      'Zero search latency: getMin() is O(1).',
      'Preserves normal stack LIFO behavior without penalty.',
      'Core interview system design primitive.'
    ]
  },
  intuition: {
    overview: 'Maintain two stacks: `main_stack` stores values, `min_stack` stores running minimums. On push(val), push min(val, min_stack.top) to min_stack. On pop, pop both.',
    steps: [
      { step: 1, title: 'Push Logic', description: 'Push val to main. Push min(val, min_stack[-1]) to min_stack.' },
      { step: 2, title: 'Pop Logic', description: 'Pop simultaneously from both main and min_stack.' },
      { step: 3, title: 'GetMin Logic', description: 'Return min_stack[-1] in O(1).' }
    ]
  },
  formalDefinition: {
    text: 'A MinStack maintains a state S = ((v_1, m_1), (v_2, m_2), ..., (v_k, m_k)) where m_i = \\min_{1 \\le j \\le i} v_j. Therefore, m_k = \\min(S) in O(1).',
    latex: 'm_k = \\min(v_k, m_{k-1}) \\implies \\text{getMin}() = m_k \\in O(1)'
  },
  complexity: {
    overview: 'All methods (push, pop, top, getMin) execute in O(1) time.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Direct pointer / array index read.' },
      { case: 'Average', time: 'O(1)', space: 'O(1)', explanation: 'Deterministic single-step execution.' },
      { case: 'Worst', time: 'O(1)', space: 'O(1)', explanation: 'Zero loops or dynamic reallocations.' }
    ],
    spaceNote: 'O(n) auxiliary space to store minimum history.'
  },
  workedExample: {
    title: 'MinStack Operation Trace',
    input: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()',
    steps: [
      { step: 1, action: 'push(-2)', state: 'main=[-2], min=[-2]', explanation: 'First element is current minimum.' },
      { step: 2, action: 'push(0)', state: 'main=[-2, 0], min=[-2, -2]', explanation: 'min(0, -2) = -2.' },
      { step: 3, action: 'push(-3)', state: 'main=[-2, 0, -3], min=[-2, -2, -3]', explanation: 'min(-3, -2) = -3.' },
      { step: 4, action: 'getMin()', state: 'returns -3', explanation: 'Top of min stack is -3.' },
      { step: 5, action: 'pop()', state: 'main=[-2, 0], min=[-2, -2]', explanation: 'Pops -3 from both stacks. Min reverts to -2.' },
      { step: 6, action: 'top()', state: 'returns 0', explanation: 'Top of main stack is 0.' },
      { step: 7, action: 'getMin()', state: 'returns -2', explanation: 'Top of min stack is -2.' }
    ],
    finalOutput: 'getMin returns -3 then -2 after popping -3.'
  },
  visualExplanation: {
    title: 'Dual-Stack Alignment',
    description: 'Visualizing min_stack shadowing main_stack at every level.',
    features: ['Min stack mirrors main stack height', 'Each level preserves historical minimum']
  },
  pseudocode: {
    title: 'MinStack Implementation',
    code: `class MinStack:
    def __init__():
        main_stack = []
        min_stack = []

    def push(val):
        main_stack.push(val)
        if not min_stack or val <= min_stack.top():
            min_stack.push(val)
        else:
            min_stack.push(min_stack.top())

    def pop():
        main_stack.pop()
        min_stack.pop()

    def top(): return main_stack.top()
    def getMin(): return min_stack.top()`
  },
  pythonCode: {
    title: 'Python MinStack Class',
    code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def get_min(self) -> int:
        return self.min_stack[-1]`,
    explanation: 'Pairs every main stack push with corresponding running minimum in min_stack.'
  },
  runnableCode: {
    code: `ms = MinStack()
ms.push(-2)
ms.push(0)
ms.push(-3)
print(ms.get_min()) # -3
ms.pop()
print(ms.top())     # 0
print(ms.get_min()) # -2`,
    expectedOutput: `-3\n0\n-2`
  },
  lineByLineExplanation: [
    { line: 8, code: 'if not self.min_stack or val <= self.min_stack[-1]:', explanation: 'Pushes current val if smaller than or equal to current minimum.' },
    { line: 11, code: 'self.min_stack.append(self.min_stack[-1])', explanation: 'Duplicates current minimum to ensure stacks stay at identical heights.' }
  ],
  edgeCases: [
    { case: 'Popping minimum element', handling: 'min_stack pops simultaneously, restoring previous minimum.', example: 'Push -3 then pop.' }
  ],
  commonMistakes: [
    { mistake: 'Only pushing to min_stack when val < current_min (using strict <)', solution: 'Must use <= to handle duplicate minimums; otherwise popping duplicate removes the only min entry.', codeExample: 'if val <= self.min_stack[-1]: # use <=' }
  ],
  applications: [
    { industry: 'Data Analytics', application: 'Streaming metric telemetry tracking all-time lowest ping/latency', benefit: 'Instant O(1) lowest ping inspection.' }
  ],
  practiceQuestions: [
    { id: 'pq-ms-1', question: 'How can you implement MinStack with only a single stack and O(1) auxiliary space?', hint: 'Store 2*val - minVal when pushing a new minimum.', answer: 'Store encoded values: when pushing a new minimum, push 2*x - min_val and set min_val = x. When popping negative diff, previous min is reconstructed as 2*min_val - popped.' }
  ],
  quiz: [
    { id: 'q-ms-1', question: 'What is the time complexity of getMin() in MinStack?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(k)'], correctIndex: 0, explanation: 'Retrieving the top element of min_stack takes O(1) constant time.' }
  ],
  codingChallenge: {
    title: 'Max Stack Design',
    problem: 'Design a MaxStack supporting push, pop, top, and peekMax in O(1) time.',
    hints: ['Mirror the MinStack pattern using running maximums.'],
    starterCode: `class MaxStack:
    def __init__(self):
        # TODO: Initialize stacks
        pass

    def push(self, x: int) -> None:
        pass

    def pop(self) -> int:
        pass

    def top(self) -> int:
        pass

    def peek_max(self) -> int:
        pass`,
    solution: `class MaxStack:
    def __init__(self):
        self.stack = []
        self.max_stack = []

    def push(self, x: int) -> None:
        self.stack.append(x)
        if not self.max_stack or x >= self.max_stack[-1]:
            self.max_stack.append(x)
        else:
            self.max_stack.append(self.max_stack[-1])

    def pop(self) -> int:
        self.max_stack.pop()
        return self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def peek_max(self) -> int:
        return self.max_stack[-1]`
  },
  summary: {
    keyTakeaways: ['Dual stacks provide O(1) min/max tracking at the cost of 2x memory.', 'Preserves exact LIFO order and historical minimums.'],
    nextLessonId: 'dsa-expression-parsing',
    nextLessonTitle: 'Infix, Postfix, and Prefix Expressions',
    nextLessonModuleId: 'dsa-module-5'
  }
};

m5Lessons['dsa-expression-parsing'] = {
  id: 'dsa-expression-parsing',
  moduleId: 'dsa-module-5',
  title: 'Infix, Postfix, and Prefix Expressions',
  subtitle: 'Shunting-Yard Algorithm and Reverse Polish Notation Evaluation',
  order: 8,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'stack-queue',
  objectives: [
    'Differentiate between Infix (human), Postfix (RPN), and Prefix (Polish) notations.',
    'Evaluate Reverse Polish Notation expressions using operand stacks in O(n).',
    'Implement Dijkstra\'s Shunting-Yard algorithm for Infix to Postfix conversion.',
    'Handle operator precedence (*, / over +, -) and parentheses associativity correctly.'
  ],
  prerequisites: ['Stack: Operations and Applications'],
  analogy: {
    title: 'The Calculator Tape Machine',
    text: 'Old HP engineering calculators used Reverse Polish Notation (RPN): to compute (3 + 4) * 2, you enter "3 ENTER 4 + 2 *". There are no parentheses because the order of operations is unambiguous. An internal stack holds numbers until an operation consumes them.',
    metaphor: 'Postfix notation eliminates parentheses by placing operators immediately after their operands.'
  },
  problemSolved: {
    title: 'Unambiguous Mathematical Computation Without Ambiguity',
    description: 'Human infix notation "3 + 4 * 2" requires complex precedence rules and parentheses. Postfix notation "3 4 2 * +" can be evaluated in a single sequential pass using a single stack without backtracking.',
    keyPoints: [
      'Eliminates parentheses completely.',
      'Powers compiler arithmetic code generation and scientific calculators.',
      'O(n) evaluation with zero ambiguity.'
    ]
  },
  intuition: {
    overview: 'To evaluate postfix: scan tokens. If number, push to stack. If operator, pop two operands (b, then a), compute a OP b, and push result back to stack.',
    steps: [
      { step: 1, title: 'Operand Push', description: 'Push incoming numbers directly onto evaluation stack.' },
      { step: 2, title: 'Operator Pop & Apply', description: 'Pop right operand b, then left operand a. Compute a OP b. Push result.' },
      { step: 3, title: 'Final Stack Value', description: 'At the end of expression, the single value remaining on the stack is the total result.' }
    ]
  },
  formalDefinition: {
    text: 'In Postfix (RPN), an operator is placed immediately after its operands: binary operation \\circ(a, b) is written "a b \\circ". In Shunting-Yard conversion, an operator stack reorders operators based on precedence \\text{prec}(\\circ_1) \\ge \\text{prec}(\\circ_2).',
    latex: 'a + b \\cdot c \\xrightarrow{\\text{Shunting-Yard}} a \\, b \\, c \\cdot +'
  },
  complexity: {
    overview: 'Evaluation: O(n) time, O(n) space. Conversion: O(n) time, O(n) space.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(n)', explanation: 'Single linear pass over tokens.' },
      { case: 'Average', time: 'O(n)', space: 'O(n)', explanation: 'Tokens pushed and popped at most once.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Nested expression with deep operator stack.' }
    ],
    spaceNote: 'O(n) memory for operand and operator stacks.'
  },
  workedExample: {
    title: 'Evaluating ["2", "1", "+", "3", "*"]',
    input: 'tokens = ["2", "1", "+", "3", "*"]',
    steps: [
      { step: 1, action: 'Push "2"', state: 'stack=[2]', explanation: 'Number 2 pushed.' },
      { step: 2, action: 'Push "1"', state: 'stack=[2, 1]', explanation: 'Number 1 pushed.' },
      { step: 3, action: 'Apply "+"', state: 'pop 1, pop 2 -> 2+1=3 -> stack=[3]', explanation: 'Add top two operands, push 3.' },
      { step: 4, action: 'Push "3"', state: 'stack=[3, 3]', explanation: 'Number 3 pushed.' },
      { step: 5, action: 'Apply "*"', state: 'pop 3, pop 3 -> 3*3=9 -> stack=[9]', explanation: 'Multiply top two operands, push 9.' }
    ],
    finalOutput: 'Result: 9'
  },
  visualExplanation: {
    title: 'RPN Evaluation Mechanism',
    description: 'Visualizing operands accumulating on stack until an operator collapses them into a single result.',
    features: ['Operands wait in LIFO order', 'Binary operators consume top 2 elements']
  },
  pseudocode: {
    title: 'RPN Evaluation',
    code: `function evalRPN(tokens):
    stack = []
    for token in tokens:
        if token is operator (+, -, *, /):
            b = stack.pop()
            a = stack.pop()
            result = apply(operator, a, b)
            stack.push(result)
        else:
            stack.push(integer(token))
    return stack.pop()`
  },
  pythonCode: {
    title: 'Python RPN Evaluator',
    code: `def eval_rpn(tokens: list[str]) -> int:
    stack = []
    ops = {
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: int(a / b)  # truncates toward zero
    }
    
    for token in tokens:
        if token in ops:
            b = stack.pop()
            a = stack.pop()
            stack.append(ops[token](a, b))
        else:
            stack.append(int(token))
            
    return stack[0]`,
    explanation: 'Applies lambdas to popped operands; handles Python integer division toward zero.'
  },
  runnableCode: {
    code: `print(eval_rpn(["2", "1", "+", "3", "*"])) # (2+1)*3 = 9
print(eval_rpn(["4", "13", "5", "/", "+"])) # 4 + (13/5) = 6`,
    expectedOutput: `9\n6`
  },
  lineByLineExplanation: [
    { line: 7, code: "'/': lambda a, b: int(a / b)", explanation: 'Truncates toward zero as required by standard programming language evaluation.' },
    { line: 12, code: 'b = stack.pop(); a = stack.pop()', explanation: 'First popped is right operand b; second popped is left operand a. Order matters for subtraction and division!' }
  ],
  edgeCases: [
    { case: 'Single token', handling: 'Directly converts string to integer and returns it.', example: '["42"] -> 42' },
    { case: 'Division truncation', handling: 'int(a / b) rounds towards zero, unlike floor division //.', example: '6 / -132 -> 0' }
  ],
  commonMistakes: [
    { mistake: 'Reversing operand order on subtraction / division (b - a instead of a - b)', solution: 'First popped is the right-hand operand; second popped is the left-hand operand.', codeExample: 'b = stack.pop()\na = stack.pop()\nres = a - b' }
  ],
  applications: [
    { industry: 'Compilers', application: 'Abstract Syntax Tree (AST) evaluation & bytecode generation', benefit: 'Direct mapping to JVM/Python virtual machine bytecode.' }
  ],
  practiceQuestions: [
    { id: 'pq-ep-1', question: 'Convert infix expression (A + B) * (C - D) to postfix.', hint: 'Evaluate parentheses first.', answer: 'A B + C D - *' }
  ],
  quiz: [
    { id: 'q-ep-1', question: 'Why does RPN not require parentheses?', options: ['The order of operators unambiguously defines the evaluation sequence', 'Computers cannot read parentheses', 'Parentheses are converted to numbers', 'Only additions can be done in RPN'], correctIndex: 0, explanation: 'In RPN, operators immediately follow their operands, making precedence rules and parentheses completely unnecessary.' }
  ],
  codingChallenge: {
    title: 'Basic Calculator (Addition and Subtraction with Parentheses)',
    problem: 'Implement a basic calculator to evaluate a simple expression string containing digits, "+", "-", "(", and ")".',
    hints: ['Track current sign and running result.', 'When seeing "(", push current result and sign onto stack.'],
    starterCode: `def calculate(s: str) -> int:
    # TODO: Implement basic calculator
    pass`,
    solution: `def calculate(s: str) -> int:
    stack = []
    res = 0
    num = 0
    sign = 1
    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        elif ch in '+-':
            res += sign * num
            num = 0
            sign = 1 if ch == '+' else -1
        elif ch == '(':
            stack.append(res)
            stack.append(sign)
            res = 0
            sign = 1
        elif ch == ')':
            res += sign * num
            num = 0
            res *= stack.pop() # sign
            res += stack.pop() # previous res
    return res + sign * num`
  },
  summary: {
    keyTakeaways: ['Postfix evaluation is cleanly solved with a single operand stack.', 'First popped element is always the right operand.'],
    nextLessonId: 'dsa-recursion-trees-calls',
    nextLessonTitle: 'Recursion Trees and Call Stacks',
    nextLessonModuleId: 'dsa-module-6'
  }
};

const dsa5Path = path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-5.ts');
writeModuleFile(dsa5Path, m5.data, m5Lessons);
console.log('Module 5 completed! Authored: ' + Object.keys(m5Lessons).length);

// --- Module 6: Recursion and Backtracking ---
const m6 = getExistingDSALessons(6);
const m6Lessons = { ...m6.lessons };

m6Lessons['dsa-recursion-trees-calls'] = {
  id: 'dsa-recursion-trees-calls',
  moduleId: 'dsa-module-6',
  title: 'Recursion Trees and Call Stacks',
  subtitle: 'Visualizing Call Frames, Activation Records, and Branching Topologies',
  order: 1,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'recursion-tree',
  objectives: [
    'Deconstruct how operating systems manage activation frames on the call stack.',
    'Formulate recursion trees to model recursive branching and subproblem relationships.',
    'Derive space complexity by measuring the maximum depth of the call stack.',
    'Prevent stack overflow errors by guaranteeing base cases and progress steps.'
  ],
  prerequisites: ['DSA Foundations: Recursion and Recurrence Relations'],
  analogy: {
    title: 'The Detective Delegating Clues',
    text: 'A master detective investigating a case sends junior detectives to investigate smaller sub-leads. Each junior detective waits for their subordinates to report back before assembling the final report for the master detective. The office whiteboard showing who reports to whom is the recursion tree; the stack of active case files on the desk is the call stack.',
    metaphor: 'The recursion tree represents all subproblems; the call stack holds the active path from root to leaf.'
  },
  problemSolved: {
    title: 'Predicting Recursive Memory Consumption and Time Complexity',
    description: 'Recursion can seem mysterious without an explicit mental model. Recursion trees visualize total operations by summing node costs at each level, while the call stack explains memory usage as the tree height.',
    keyPoints: [
      'Call stack depth = maximum recursion tree height.',
      'Space complexity is determined by max depth O(h), not total nodes O(N).',
      'Essential for analyzing divide-and-conquer and backtracking algorithms.'
    ]
  },
  intuition: {
    overview: 'Every function call creates an activation frame containing parameters, local variables, and the return address. When a function calls itself, a new frame is pushed. When it returns, its frame is popped.',
    steps: [
      { step: 1, title: 'Call Frame Push', description: 'Invoke func(n-1): OS allocates frame on call stack.' },
      { step: 2, title: 'Base Case Return', description: 'When base case is reached, frame evaluates and returns value without further calls.' },
      { step: 3, title: 'Unwinding the Stack', description: 'Parent frame receives child return value, computes its own result, and pops.' }
    ]
  },
  formalDefinition: {
    text: 'A recursion tree T = (V, E) for recursive recurrence T(n) = a T(n/b) + f(n) is a tree where the root has cost f(n), has a children each of size n/b, with total work W = \\sum_{i=0}^{\\log_b n} a^i f(n/b^i).',
    latex: '\\text{Max Stack Depth} = h = \\mathcal{O}(\\log_b n) \\implies \\text{Auxiliary Space} = \\mathcal{O}(h)'
  },
  complexity: {
    overview: 'Fibonacci recursion: Time O(2^n), Space O(n) call stack depth.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(n)', explanation: 'Linear single-branch recursion (factorial).' },
      { case: 'Average', time: 'O(2^n)', space: 'O(n)', explanation: 'Binary recursion without memoization.' },
      { case: 'Worst', time: 'O(2^n)', space: 'O(n)', explanation: 'Full binary recursion tree of depth n.' }
    ],
    spaceNote: 'Maximum call stack depth determines space complexity.'
  },
  workedExample: {
    title: 'Call Stack Trace for Factorial(3)',
    input: 'fact(3)',
    steps: [
      { step: 1, action: 'fact(3) invoked', state: 'Call Stack: [fact(3)]', explanation: 'Needs fact(2).' },
      { step: 2, action: 'fact(2) invoked', state: 'Call Stack: [fact(3), fact(2)]', explanation: 'Needs fact(1).' },
      { step: 3, action: 'fact(1) invoked', state: 'Call Stack: [fact(3), fact(2), fact(1)]', explanation: 'Base case! Returns 1.' },
      { step: 4, action: 'fact(2) returns 2 * 1 = 2', state: 'Call Stack: [fact(3)]', explanation: 'fact(1) popped.' },
      { step: 5, action: 'fact(3) returns 3 * 2 = 6', state: 'Call Stack: []', explanation: 'fact(2) popped, final answer 6 returned.' }
    ],
    finalOutput: 'Output: 6'
  },
  visualExplanation: {
    title: 'Call Stack vs Recursion Tree',
    description: 'Tree shows all calls ever made; stack shows active path from root to current node.',
    features: ['Tree width reflects branching factor', 'Tree height reflects stack depth limit']
  },
  pseudocode: {
    title: 'Recursive Tree Traversal',
    code: `function fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`
  },
  pythonCode: {
    title: 'Traced Recursion Example',
    code: `def fib_traced(n: int, depth: int = 0) -> int:
    indent = "  " * depth
    print(f"{indent}fib({n}) called")
    if n <= 1:
        print(f"{indent}fib({n}) returns {n}")
        return n
    res = fib_traced(n - 1, depth + 1) + fib_traced(n - 2, depth + 1)
    print(f"{indent}fib({n}) returns {res}")
    return res`,
    explanation: 'Prints indentation matching call stack depth to visualize the call tree.'
  },
  runnableCode: {
    code: `fib_traced(3)`,
    expectedOutput: `fib(3) called\n  fib(2) called\n    fib(1) called\n    fib(1) returns 1\n    fib(0) called\n    fib(0) returns 0\n  fib(2) returns 1\n  fib(1) called\n  fib(1) returns 1\nfib(3) returns 2`
  },
  lineByLineExplanation: [
    { line: 4, code: 'if n <= 1: return n', explanation: 'Base case: terminates recursion, preventing infinite call stack expansion.' },
    { line: 7, code: 'res = fib(n - 1) + fib(n - 2)', explanation: 'Binary branching: creates two child subproblems at each internal node.' }
  ],
  edgeCases: [
    { case: 'Missing base case', handling: 'Raises RecursionError: maximum recursion depth exceeded in Python.', example: 'def f(x): return f(x-1)' }
  ],
  commonMistakes: [
    { mistake: 'Assuming space complexity is proportional to number of nodes in tree', solution: 'Only one branch is active at any time; maximum stack memory is proportional to the tree height.', codeExample: '# Tree nodes: 2^n, but Stack space: O(n)' }
  ],
  applications: [
    { industry: 'Software Engineering', application: 'Deep file system directory traversal', benefit: 'Recursive tree navigation.' }
  ],
  practiceQuestions: [
    { id: 'pq-rt-1', question: 'What is the default recursion depth limit in CPython?', hint: 'Check sys.getrecursionlimit().', answer: 'Typically 1,000 call frames.' }
  ],
  quiz: [
    { id: 'q-rt-1', question: 'What determines the maximum auxiliary space used by a recursive algorithm?', options: ['The maximum height of the recursion tree', 'The total number of nodes in the recursion tree', 'The number of base cases', 'The CPU cache size'], correctIndex: 0, explanation: 'The call stack holds frames along the path from the root to the currently active leaf, which equals the tree height.' }
  ],
  codingChallenge: {
    title: 'Calculate Recursion Tree Maximum Depth',
    problem: 'Write a recursive function that returns the height of the call tree for computing the nth power of x using divide-and-conquer (x^(n/2))^2.',
    hints: ['Divide n by 2 at each recursive step.'],
    starterCode: `def my_pow(x: float, n: int) -> float:
    # TODO: Implement O(log n) recursive power
    pass`,
    solution: `def my_pow(x: float, n: int) -> float:
    if n < 0:
        x = 1 / x
        n = -n
    def helper(base, exp):
        if exp == 0:
            return 1.0
        half = helper(base, exp // 2)
        if exp % 2 == 0:
            return half * half
        return half * half * base
    return helper(x, n)`
  },
  summary: {
    keyTakeaways: ['Recursion trees map subproblem topology; call stacks record active branch path.', 'Space complexity = O(maximum tree depth).'],
    nextLessonId: 'dsa-recursion-subsets',
    nextLessonTitle: 'Subsets and Subsequences',
    nextLessonModuleId: 'dsa-module-6'
  }
};

m6Lessons['dsa-recursion-subsets'] = {
  id: 'dsa-recursion-subsets',
  moduleId: 'dsa-module-6',
  title: 'Subsets and Subsequences',
  subtitle: 'The Include/Exclude Backtracking Paradigm and Power Sets',
  order: 2,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'recursion-tree',
  objectives: [
    'Generate the power set of n elements containing 2^n subsets.',
    'Implement the fundamental include/exclude binary decision tree.',
    'Distinguish between contiguous subarrays, subsequences, and subsets.',
    'Avoid duplicate subsets using sorting and frequency skipping.'
  ],
  prerequisites: ['Recursion Trees and Call Stacks'],
  analogy: {
    title: 'Packing a Backpack for a Hike',
    text: 'You have a list of n items. For each item (flashlight, water bottle, compass), you make a binary choice: either pack it into your backpack or leave it behind. After making n choices, your backpack contains one valid subset.',
    metaphor: 'Each item generates 2 branches: include or exclude.'
  },
  problemSolved: {
    title: 'Generating Combinatorial Power Sets Systematically',
    description: 'Subsets form the foundation of combinatorial search. The include/exclude recursive paradigm visits all 2^n possible combinations systematically without omitting any valid states.',
    keyPoints: [
      'Generates exactly 2^n subsets.',
      'Backtracking template: choose -> explore -> unchoose.',
      'Forms base structure for 0/1 Knapsack search.'
    ]
  },
  intuition: {
    overview: 'At index i, make two recursive calls: one including nums[i] in the current subset, and one excluding it. When index reaches n, add a copy of the current subset to results.',
    steps: [
      { step: 1, title: 'Base Case Check', description: 'If index == len(nums), append copy of current path to result list.' },
      { step: 2, title: 'Include Branch', description: 'path.append(nums[i]); backtrack(i + 1, path); path.pop().' },
      { step: 3, title: 'Exclude Branch', description: 'backtrack(i + 1, path).' }
    ]
  },
  formalDefinition: {
    text: 'The power set \\mathcal{P}(S) of a set S with |S| = n has cardinality |\\mathcal{P}(S)| = 2^n. Every subset corresponds to an n-bit binary string indicating inclusion or exclusion.',
    latex: '|\\mathcal{P}(S)| = \\sum_{k=0}^n \\binom{n}{k} = 2^n'
  },
  complexity: {
    overview: 'Time: O(n \\cdot 2^n) because there are 2^n subsets and copying each takes O(n). Space: O(n) stack depth.',
    cases: [
      { case: 'Best', time: 'O(n 2^n)', space: 'O(n)', explanation: 'Always generates 2^n subsets.' },
      { case: 'Average', time: 'O(n 2^n)', space: 'O(n)', explanation: 'Complete binary tree of height n.' },
      { case: 'Worst', time: 'O(n 2^n)', space: 'O(n)', explanation: 'Exhaustive combinatorial exploration.' }
    ],
    spaceNote: 'O(n) auxiliary call stack space (excluding output array).'
  },
  workedExample: {
    title: 'Subsets of [1, 2]',
    input: 'nums = [1, 2]',
    steps: [
      { step: 1, action: 'Root (i=0, path=[])', state: 'Branch: include 1 or exclude 1', explanation: 'Decision for element 1.' },
      { step: 2, action: 'Include 1 (path=[1])', state: 'Branch: include 2 or exclude 2', explanation: 'Decision for element 2.' },
      { step: 3, action: 'Include 2', state: 'path=[1, 2] -> append to output', explanation: 'Leaf reached.' },
      { step: 4, action: 'Exclude 2', state: 'path=[1] -> append to output', explanation: 'Leaf reached.' },
      { step: 5, action: 'Backtrack to root, exclude 1', state: 'path=[]', explanation: 'Explore exclude branch for 1.' },
      { step: 6, action: 'Include 2 / Exclude 2', state: 'Yields [2] and []', explanation: 'Leaves reached.' }
    ],
    finalOutput: '[[], [1], [2], [1, 2]]'
  },
  visualExplanation: {
    title: 'Binary Decision Tree',
    description: 'A complete binary tree of depth n with 2^n leaves representing all subsets.',
    features: ['Left branch: Include element', 'Right branch: Exclude element']
  },
  pseudocode: {
    title: 'Power Set Backtracking',
    code: `function subsets(nums):
    result = []
    function backtrack(start, path):
        result.append(copy(path))
        for i from start to len(nums) - 1:
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop() # backtrack
    backtrack(0, [])
    return result`
  },
  pythonCode: {
    title: 'Python Subsets Implementation',
    code: `def generate_subsets(nums: list[int]) -> list[list[int]]:
    res = []
    
    def backtrack(start: int, path: list[int]):
        res.append(list(path)) # append copy
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop() # undo choice
            
    backtrack(0, [])
    return res`,
    explanation: 'Appends copy of path at each node and explores subsequent elements.'
  },
  runnableCode: {
    code: `print(generate_subsets([1, 2, 3]))`,
    expectedOutput: `[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]`
  },
  lineByLineExplanation: [
    { line: 5, code: 'res.append(list(path))', explanation: 'Must create a shallow copy list(path); appending path directly would append a reference mutated by subsequent pops.' },
    { line: 8, code: 'path.pop()', explanation: 'Backtracking step: removes the chosen element before the next loop iteration.' }
  ],
  edgeCases: [
    { case: 'Empty input array []', handling: 'Returns [[]] (the empty set is a valid subset).', example: 'nums = []' }
  ],
  commonMistakes: [
    { mistake: 'Appending path instead of list(path)', solution: 'Always append a copy; otherwise all entries in res will end up empty [] after unwinding.', codeExample: 'res.append(path[:]) # correct' }
  ],
  applications: [
    { industry: 'Machine Learning', application: 'Feature subset selection (wrapper methods)', benefit: 'Evaluates model accuracy across all candidate feature subsets.' }
  ],
  practiceQuestions: [
    { id: 'pq-ss-1', question: 'How do you handle duplicates in nums to avoid duplicate subsets (Subsets II)?', hint: 'Sort nums first.', answer: 'Sort nums. In loop: if i > start and nums[i] == nums[i-1]: continue to skip duplicate branches.' }
  ],
  quiz: [
    { id: 'q-ss-1', question: 'How many subsets does a set of 5 elements have?', options: ['32', '25', '10', '64'], correctIndex: 0, explanation: '2^5 = 32 subsets.' }
  ],
  codingChallenge: {
    title: 'Subsets II (With Duplicates)',
    problem: 'Given an integer array nums that may contain duplicates, return all possible subsets without duplicates.',
    hints: ['Sort the array first.', 'Skip duplicates when i > start and nums[i] == nums[i-1].'],
    starterCode: `def subsets_with_dup(nums: list[int]) -> list[list[int]]:
    # TODO: Implement duplicate-free subsets
    pass`,
    solution: `def subsets_with_dup(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    def backtrack(start, path):
        res.append(list(path))
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return res`
  },
  summary: {
    keyTakeaways: ['Subsets are built using the choose-explore-unchoose backtracking pattern.', 'Sorting allows O(1) duplicate branch pruning.'],
    nextLessonId: 'dsa-recursion-permutations',
    nextLessonTitle: 'Permutations and Combinations',
    nextLessonModuleId: 'dsa-module-6'
  }
};

m6Lessons['dsa-recursion-permutations'] = {
  id: 'dsa-recursion-permutations',
  moduleId: 'dsa-module-6',
  title: 'Permutations and Combinations',
  subtitle: 'Factorial Search Spaces, Visited Tracking, and Swapping Techniques',
  order: 3,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'recursion-tree',
  objectives: [
    'Generate all n! permutations using recursive backtracking.',
    'Track chosen elements using boolean visited arrays or in-place swapping.',
    'Differentiate permutations (order matters) from combinations (order irrelevant).',
    'Calculate time complexity of factorial search trees.'
  ],
  prerequisites: ['Subsets and Subsequences'],
  analogy: {
    title: 'Arranging Books on a Shelf',
    text: 'You have 3 distinct books. For the first spot, you have 3 choices. For the second spot, you have 2 remaining choices. For the final spot, you have 1 choice. Total distinct arrangements: 3 * 2 * 1 = 6.',
    metaphor: 'Order matters: [1, 2] and [2, 1] are distinct permutations.'
  },
  problemSolved: {
    title: 'Systematic Ordering and Exhaustive Arrangement Exploration',
    description: 'Permutations arise in routing problems (Traveling Salesperson), cryptographic cracking, and scheduling. Backtracking explores all n! arrangements without duplicate visits.',
    keyPoints: [
      'Generates exactly n! distinct permutations.',
      'In-place swapping avoids auxiliary visited array memory.',
      'Foundation for constraint satisfaction problems.'
    ]
  },
  intuition: {
    overview: 'At depth d, choose an unused element to place at position d. Mark it used, recurse to d+1, and unmark it upon return.',
    steps: [
      { step: 1, title: 'Leaf Detection', description: 'If len(path) == len(nums), add copy of path to output.' },
      { step: 2, title: 'Explore Unused Elements', description: 'Iterate over all elements. If element is not visited, mark visited, append to path, recurse, and unmark.' }
    ]
  },
  formalDefinition: {
    text: 'The number of permutations of n distinct elements is n! = \\prod_{i=1}^n i. For combinations of n choose k, the count is C(n, k) = \\frac{n!}{k!(n-k)!}.',
    latex: 'P(n, n) = n!, \\quad C(n, k) = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}'
  },
  complexity: {
    overview: 'Time: O(n \\cdot n!) because there are n! permutations and building each takes O(n). Space: O(n) stack.',
    cases: [
      { case: 'Best', time: 'O(n n!)', space: 'O(n)', explanation: 'Exhaustive generation.' },
      { case: 'Average', time: 'O(n n!)', space: 'O(n)', explanation: 'Branching factor n, n-1, ..., 1.' },
      { case: 'Worst', time: 'O(n n!)', space: 'O(n)', explanation: 'Full factorial exploration.' }
    ],
    spaceNote: 'O(n) auxiliary memory for call stack and visited array.'
  },
  workedExample: {
    title: 'Permutations of [1, 2, 3]',
    input: 'nums = [1, 2, 3]',
    steps: [
      { step: 1, action: 'First element = 1', state: 'path=[1]', explanation: 'Remaining: {2, 3}.' },
      { step: 2, action: 'Second element = 2', state: 'path=[1, 2]', explanation: 'Remaining: {3}.' },
      { step: 3, action: 'Third element = 3', state: 'path=[1, 2, 3] -> added', explanation: 'Full permutation created.' },
      { step: 4, action: 'Backtrack and pick 3', state: 'path=[1, 3, 2] -> added', explanation: 'Second permutation with 1 first.' }
    ],
    finalOutput: '[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]'
  },
  visualExplanation: {
    title: 'Factorial Tree Branching',
    description: 'Tree with root having n branches, each child having n-1 branches, tapering to 1 leaf.',
    features: ['Level 0: n choices', 'Level 1: n-1 choices', 'Leaves: n! total outcomes']
  },
  pseudocode: {
    title: 'Permutations Backtracking',
    code: `function permute(nums):
    result = []
    used = boolean array of size len(nums)
    function backtrack(path):
        if len(path) == len(nums):
            result.append(copy(path))
            return
        for i from 0 to len(nums) - 1:
            if not used[i]:
                used[i] = True
                path.append(nums[i])
                backtrack(path)
                path.pop()
                used[i] = False
    backtrack([])
    return result`
  },
  pythonCode: {
    title: 'Python Permutations Implementation',
    code: `def permute(nums: list[int]) -> list[list[int]]:
    res = []
    used = [False] * len(nums)
    
    def backtrack(path: list[int]):
        if len(path) == len(nums):
            res.append(list(path))
            return
        for i in range(len(nums)):
            if not used[i]:
                used[i] = True
                path.append(nums[i])
                backtrack(path)
                path.pop()
                used[i] = False
                
    backtrack([])
    return res`,
    explanation: 'Uses boolean used array to prevent reusing elements in the same permutation.'
  },
  runnableCode: {
    code: `print(permute([1, 2, 3]))`,
    expectedOutput: `[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]`
  },
  lineByLineExplanation: [
    { line: 10, code: 'if not used[i]:', explanation: 'Checks if candidate element has already been placed in the current permutation path.' },
    { line: 14, code: 'used[i] = False', explanation: 'Backtracks visited flag so element can be chosen at a different position in future branches.' }
  ],
  edgeCases: [
    { case: 'Single element [1]', handling: 'Returns [[1]].', example: 'nums = [1]' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting to reset used[i] = False', solution: 'Always restore visited state in the backtrack step.', codeExample: 'used[i] = False' }
  ],
  applications: [
    { industry: 'Logistics', application: 'Route planning and vehicle fleet dispatching', benefit: 'Exhaustive search on small route segments.' }
  ],
  practiceQuestions: [
    { id: 'pq-perm-1', question: 'How can you generate permutations in O(1) extra space without a used array?', hint: 'Swap elements in place.', answer: 'Use in-place swapping: for i in range(start, n): swap(nums[start], nums[i]); backtrack(start+1); swap back.' }
  ],
  quiz: [
    { id: 'q-perm-1', question: 'How many permutations exist for an array of 4 unique elements?', options: ['24', '16', '12', '4'], correctIndex: 0, explanation: '4! = 4 * 3 * 2 * 1 = 24 permutations.' }
  ],
  codingChallenge: {
    title: 'Combinations (n choose k)',
    problem: 'Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].',
    hints: ['Only choose numbers greater than the previous choice to enforce combination ordering.'],
    starterCode: `def combine(n: int, k: int) -> list[list[int]]:
    # TODO: Implement combinations
    pass`,
    solution: `def combine(n: int, k: int) -> list[list[int]]:
    res = []
    def backtrack(start, path):
        if len(path) == k:
            res.append(list(path))
            return
        for i in range(start, n + 1):
            path.append(i)
            backtrack(i + 1, path)
            path.pop()
    backtrack(1, [])
    return res`
  },
  summary: {
    keyTakeaways: ['Permutations explore n! orderings using visited tracking.', 'Combinations enforce ascending choice indices to prevent duplicate orderings.'],
    nextLessonId: 'dsa-backtracking-sudoku',
    nextLessonTitle: 'Sudoku Solver',
    nextLessonModuleId: 'dsa-module-6'
  }
};

m6Lessons['dsa-backtracking-sudoku'] = {
  id: 'dsa-backtracking-sudoku',
  moduleId: 'dsa-module-6',
  title: 'Sudoku Solver',
  subtitle: 'Exact Cover, Constraint Propagation, and 2D Board Backtracking',
  order: 5,
  readTimeMinutes: 24,
  difficulty: 'Advanced',
  visualizerType: 'recursion-tree',
  objectives: [
    'Model Sudoku as a constraint satisfaction problem (CSP).',
    'Implement isValid() row, column, and 3x3 box collision checks in O(1).',
    'Write a recursive backtracking solver that mutates the board in place.',
    'Optimize search order by targeting cells with the fewest candidate digits.'
  ],
  prerequisites: ['N-Queens Problem', 'Permutations and Combinations'],
  analogy: {
    title: 'Filling Out an Unforgiving Crossword in Pencil',
    text: 'When solving a difficult puzzle, you write a number in pencil. If that choice leads to a contradiction three rows down where no valid digit can fit, you erase your pencil mark (backtrack) and try the next candidate digit.',
    metaphor: 'Place candidate digit -> if board solvable return True -> else undo and try next.'
  },
  problemSolved: {
    title: 'Solving Complex Constraint Satisfaction Problems',
    description: 'A 9x9 Sudoku board has up to 9^81 possible grid states. Backtracking prunes invalid branches immediately, reducing the search space to a tiny fraction of states solvable in milliseconds.',
    keyPoints: [
      'In-place 2D grid mutation.',
      'Immediate contradiction pruning via isValid().',
      'Early termination as soon as a single valid solution is found.'
    ]
  },
  intuition: {
    overview: 'Find next empty cell \'.\'. Try digits \'1\' through \'9\'. If placing digit is valid, recurse. If recursive call succeeds, return True. If no digit works, reset cell to \'.\' and return False.',
    steps: [
      { step: 1, title: 'Find Empty Cell', description: 'Scan board for next cell with value \'.\'.' },
      { step: 2, title: 'Try Valid Digits', description: 'For digit from 1 to 9: if valid in row, col, and 3x3 box, place digit.' },
      { step: 3, title: 'Recurse & Backtrack', description: 'If solve() returns True, done! Else, board[r][c] = \'.\' and continue loop.' }
    ]
  },
  formalDefinition: {
    text: 'Sudoku is an exact cover problem over universe U of 324 constraints: 81 cell constraints, 81 row-number constraints, 81 col-number constraints, and 81 box-number constraints.',
    latex: '\\forall r, c \\in [0, 8], \\quad B[r][c] \\in \\{1..9\\} \\land \\text{unique in } \\text{Row}(r), \\text{Col}(c), \\text{Box}(\\lfloor r/3 \\rfloor, \\lfloor c/3 \\rfloor)'
  },
  complexity: {
    overview: 'Time: O(9^m) worst-case where m is the number of empty cells; practically solves in <10ms with pruning. Space: O(81) = O(1) stack depth.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Board already filled or near-complete.' },
      { case: 'Average', time: 'O(9^m)', space: 'O(1)', explanation: 'Heavy pruning eliminates >99.9% of paths.' },
      { case: 'Worst', time: 'O(9^81)', space: 'O(1)', explanation: 'Theoretical upper bound without heuristics.' }
    ],
    spaceNote: 'O(81) maximum call stack depth on a 9x9 board.'
  },
  workedExample: {
    title: 'Placing a Digit in Cell (0, 2)',
    input: 'Empty cell at (0, 2)',
    steps: [
      { step: 1, action: 'Check digit "1"', state: 'Row 0 already has "1"', explanation: 'Invalid! Try next.' },
      { step: 2, action: 'Check digit "2"', state: 'Column 2 already has "2"', explanation: 'Invalid! Try next.' },
      { step: 3, action: 'Check digit "3"', state: 'Row, col, and 3x3 box free of "3"', explanation: 'Valid! Place "3" and recurse.' }
    ],
    finalOutput: 'Board state successfully progresses.'
  },
  visualExplanation: {
    title: '3x3 Box Sub-Grid Indexing',
    description: 'Mapping cell (r, c) to box index: box_row = 3 * (r // 3), box_col = 3 * (c // 3).',
    features: ['Checks all 9 cells in the sub-box in O(1)', 'Checks full row and column in O(1)']
  },
  pseudocode: {
    title: 'Sudoku Solver Algorithm',
    code: `function solveSudoku(board):
    for r from 0 to 8:
        for c from 0 to 8:
            if board[r][c] == '.':
                for digit in '1'..'9':
                    if isValid(board, r, c, digit):
                        board[r][c] = digit
                        if solveSudoku(board): return True
                        board[r][c] = '.' # backtrack
                return False
    return True`
  },
  pythonCode: {
    title: 'Python Sudoku Solver',
    code: `def solve_sudoku(board: list[list[str]]) -> bool:
    def is_valid(r: int, c: int, ch: str) -> bool:
        for i in range(9):
            if board[r][i] == ch: return False
            if board[i][c] == ch: return False
            if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch: return False
        return True

    for r in range(9):
        for c in range(9):
            if board[r][c] == '.':
                for num in map(str, range(1, 10)):
                    if is_valid(r, c, num):
                        board[r][c] = num
                        if solve_sudoku(board):
                            return True
                        board[r][c] = '.'
                return False
    return True`,
    explanation: 'Recursive backtracking checking row, column, and 3x3 box invariants.'
  },
  runnableCode: {
    code: `board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
solve_sudoku(board)
print("".join(board[0]))`,
    expectedOutput: `534678912`
  },
  lineByLineExplanation: [
    { line: 6, code: 'if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch: return False', explanation: 'Checks the 9 cells of the enclosing 3x3 sub-grid in a single loop.' },
    { line: 17, code: 'board[r][c] = "."', explanation: 'Backtracking undo step: clears cell so other combinations can be tried.' }
  ],
  edgeCases: [
    { case: 'Unsolvable board configuration', handling: 'Returns False without corrupting initial entries.', example: 'Two identical numbers in same row.' }
  ],
  commonMistakes: [
    { mistake: 'Incorrect 3x3 box origin calculation', solution: 'Origin is 3 * (r // 3) and 3 * (c // 3).', codeExample: 'start_row = (r // 3) * 3' }
  ],
  applications: [
    { industry: 'Operations Research', application: 'Timetabling and university exam scheduling', benefit: 'Solves hard constraint matching without conflicts.' }
  ],
  practiceQuestions: [
    { id: 'pq-sudoku-1', question: 'How can you speed up Sudoku solving using constraint propagation?', hint: 'Look at Naked Singles and Dancing Links (Algorithm X).', answer: 'Use Donald Knuth\'s Dancing Links (DLX) algorithm or maintain bitmasks for rows, columns, and boxes.' }
  ],
  quiz: [
    { id: 'q-sudoku-1', question: 'How many total constraints are there in a standard 9x9 Sudoku grid?', options: ['324', '81', '729', '243'], correctIndex: 0, explanation: '4 types of constraints * 81 = 324 exact cover constraints.' }
  ],
  codingChallenge: {
    title: 'Valid Sudoku (Board Validator)',
    problem: 'Determine if a 9x9 Sudoku board is valid according to Sudoku rules. Only filled cells need validation.',
    hints: ['Use sets to track seen numbers for each row, column, and box.'],
    starterCode: `def is_valid_sudoku(board: list[list[str]]) -> bool:
    # TODO: Validate board
    pass`,
    solution: `def is_valid_sudoku(board: list[list[str]]) -> bool:
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == '.': continue
            b = (r // 3) * 3 + (c // 3)
            if val in rows[r] or val in cols[c] or val in boxes[b]:
                return False
            rows[r].add(val)
            cols[c].add(val)
            boxes[b].add(val)
    return True`
  },
  summary: {
    keyTakeaways: ['Sudoku illustrates 2D board backtracking with multi-constraint validation.', 'Return boolean to stop searching upon first valid completion.'],
    nextLessonId: 'dsa-backtracking-maze',
    nextLessonTitle: 'Maze and Path Problems',
    nextLessonModuleId: 'dsa-module-6'
  }
};

m6Lessons['dsa-backtracking-maze'] = {
  id: 'dsa-backtracking-maze',
  moduleId: 'dsa-module-6',
  title: 'Maze and Path Problems',
  subtitle: 'Grid Exploration, Cycle Avoidance, and Path Finding Backtracking',
  order: 6,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'graph',
  objectives: [
    'Navigate 2D grid mazes using directional vectors (dx, dy).',
    'Prevent infinite cycles by temporarily marking visited cells.',
    'Differentiate between finding ANY path vs ALL paths vs SHORTEST path.',
    'Implement the Rat in a Maze and Word Search algorithms.'
  ],
  prerequisites: ['Sudoku Solver', 'Recursion Trees and Call Stacks'],
  analogy: {
    title: 'Leaving Breadcrumbs in the Labyrinth',
    text: 'Theseus enters the labyrinth with a ball of thread. As he steps into each corridor, he unrolls thread to mark where he has been so he never loops in circles. When he hits a dead end, he winds the thread back up (backtracks) until he reaches an unexplored hallway.',
    metaphor: 'Mark visited on entry -> explore neighbors -> unmark on exit.'
  },
  problemSolved: {
    title: 'Exhaustive Path Exploration in Spatial Networks',
    description: 'Path problems require finding sequences of valid grid moves. Backtracking unmarks cells upon retreat, allowing the same cell to be part of alternative paths in different branches.',
    keyPoints: [
      'Direction vectors simplify 4-way or 8-way movement.',
      'In-place grid marking avoids visited set allocations.',
      'Powers robotics path planning and game board search.'
    ]
  },
  intuition: {
    overview: 'From cell (r, c), check if out of bounds or obstacle. If target reached, record path. Otherwise mark cell as visited, recurse into 4 neighbors (up, down, left, right), and unmark visited.',
    steps: [
      { step: 1, title: 'Boundary Check', description: 'If r < 0 or r >= R or c < 0 or c >= C or grid[r][c] == 0: return.' },
      { step: 2, title: 'Mark Visited', description: 'grid[r][c] = -1 (or add to visited set).' },
      { step: 3, title: 'Explore 4 Directions', description: 'Try (r+1,c), (r-1,c), (r,c+1), (r,c-1).' },
      { step: 4, title: 'Unmark Backtrack', description: 'grid[r][c] = 1 (restore original state).' }
    ]
  },
  formalDefinition: {
    text: 'Given grid G \\in \\{0, 1\\}^{R \\times C}, find a simple path P = (v_1, v_2, ..., v_k) from start s to target t such that G[v_i] = 1 and ||v_{i+1} - v_i||_1 = 1.',
    latex: '\\Delta = \\{(0, 1), (0, -1), (1, 0), (-1, 0)\\} \\implies (r\', c\') = (r + dr, c + dc)'
  },
  complexity: {
    overview: 'Time: O(4^(R*C)) worst case without pruning. Space: O(R*C) call stack depth.',
    cases: [
      { case: 'Best', time: 'O(R + C)', space: 'O(R + C)', explanation: 'Direct open path to exit.' },
      { case: 'Average', time: 'O(3^k)', space: 'O(k)', explanation: 'Pruning walls reduces effective branching factor to <= 3.' },
      { case: 'Worst', time: 'O(4^(R*C))', space: 'O(R*C)', explanation: 'All paths exploration in empty grid.' }
    ],
    spaceNote: 'O(R*C) maximum recursion call stack depth.'
  },
  workedExample: {
    title: 'Word Search for "ABCCED" in 3x4 Grid',
    input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]',
    steps: [
      { step: 1, action: 'Match "A" at (0, 0)', state: 'Mark (0,0) as "#"', explanation: 'Look for "B" in neighbors.' },
      { step: 2, action: 'Match "B" at (0, 1)', state: 'Mark (0,1) as "#"', explanation: 'Look for "C" in neighbors.' },
      { step: 3, action: 'Match "C" at (0, 2)', state: 'Mark (0,2) as "#"', explanation: 'Look for second "C" in neighbors.' },
      { step: 4, action: 'Match "C" at (1, 2)', state: 'Mark (1,2) as "#"', explanation: 'Look for "E" in neighbors.' },
      { step: 5, action: 'Match "E" at (2, 2)', state: 'Mark (2,2) as "#"', explanation: 'Look for "D" in neighbors.' },
      { step: 6, action: 'Match "D" at (2, 1)', state: 'Word completed!', explanation: 'All characters matched successfully.' }
    ],
    finalOutput: 'True'
  },
  visualExplanation: {
    title: '4-Way Directional Search',
    description: 'Visualizing branching out into North, South, East, West with breadcrumb unmarking.',
    features: ['Cell marked to prevent immediate backward reflection', 'State restored when branch fails']
  },
  pseudocode: {
    title: 'Word Search Backtracking',
    code: `function exist(board, word):
    def dfs(r, c, k):
        if k == len(word): return True
        if r < 0 or r >= R or c < 0 or c >= C or board[r][c] != word[k]:
            return False
        temp = board[r][c]
        board[r][c] = '#' # mark visited
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            if dfs(r + dr, c + dc, k + 1): return True
        board[r][c] = temp # restore
        return False`
  },
  pythonCode: {
    title: 'Python Word Search Implementation',
    code: `def word_search(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])
    
    def dfs(r: int, c: int, idx: int) -> bool:
        if idx == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[idx]:
            return False
            
        temp = board[r][c]
        board[r][c] = '#'
        
        for dr, dc in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            if dfs(r + dr, c + dc, idx + 1):
                return True
                
        board[r][c] = temp
        return False

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
    explanation: 'Uses in-place marker "#" to avoid allocating a visited set.'
  },
  runnableCode: {
    code: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
print(word_search(board, "ABCCED")) # True
print(word_search(board, "SEE"))    # True
print(word_search(board, "ABCB"))   # False`,
    expectedOutput: `True\nTrue\nFalse`
  },
  lineByLineExplanation: [
    { line: 10, code: 'board[r][c] = "#"', explanation: 'Temporarily mutates board cell to "#" to mark it as visited for the current path.' },
    { line: 16, code: 'board[r][c] = temp', explanation: 'Restores the original character before returning, enabling other search paths to reuse the cell.' }
  ],
  edgeCases: [
    { case: 'Single cell board matching 1-char word', handling: 'dfs returns True at idx == len(word).', example: '[["A"]], "A"' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting to restore cell state before returning False', solution: 'Always reset board[r][c] = temp; otherwise subsequent starting cells see damaged grids.', codeExample: 'board[r][c] = temp' }
  ],
  applications: [
    { industry: 'Game Development', application: 'Boggle word game solvers', benefit: 'Finds all dictionary words on grid in milliseconds.' }
  ],
  practiceQuestions: [
    { id: 'pq-maze-1', question: 'Why is BFS preferred over DFS/Backtracking when finding the SHORTEST path in an unweighted maze?', hint: 'Consider level-order expansion.', answer: 'BFS expands radially in concentric rings, guaranteeing that the first time the exit is reached, it is via the minimum number of steps.' }
  ],
  quiz: [
    { id: 'q-maze-1', question: 'What is the purpose of unmarking a cell (board[r][c] = temp) when backtracking in Word Search?', options: ['To allow other search paths starting from different cells or routes to use this letter', 'To free memory in Python', 'To reset the screen display', 'To delete the word'], correctIndex: 0, explanation: 'A cell is only forbidden within the current active path; other paths must be allowed to utilize it.' }
  ],
  codingChallenge: {
    title: 'Rat in a Maze Problem',
    problem: 'Find all possible paths that a rat can take to reach destination (n-1, n-1) from (0, 0) in an n x n binary maze. Return sorted paths of "D", "L", "R", "U".',
    hints: ['Sort directions lexicographically: "D", "L", "R", "U".'],
    starterCode: `def find_path(maze: list[list[int]], n: int) -> list[str]:
    # TODO: Implement rat in maze
    pass`,
    solution: `def find_path(maze: list[list[int]], n: int) -> list[str]:
    if maze[0][0] == 0 or maze[n - 1][n - 1] == 0:
        return []
    res = []
    moves = [('D', 1, 0), ('L', 0, -1), ('R', 0, 1), ('U', -1, 0)]
    def dfs(r, c, path):
        if r == n - 1 and c == n - 1:
            res.append(path)
            return
        maze[r][c] = 0 # mark visited
        for direction, dr, dc in moves:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and maze[nr][nc] == 1:
                dfs(nr, nc, path + direction)
        maze[r][c] = 1 # unmark
    dfs(0, 0, "")
    return res`
  },
  summary: {
    keyTakeaways: ['Directional arrays (dr, dc) streamline multi-direction grid traversals.', 'In-place marking saves memory but strictly requires restoration on backtrack.'],
    nextLessonId: 'dsa-backtracking-pruning',
    nextLessonTitle: 'Pruning and Backtracking Optimization',
    nextLessonModuleId: 'dsa-module-6'
  }
};

m6Lessons['dsa-backtracking-pruning'] = {
  id: 'dsa-backtracking-pruning',
  moduleId: 'dsa-module-6',
  title: 'Pruning and Backtracking Optimization',
  subtitle: 'Branch-and-Bound, Symmetry Breaking, and Search Space Reduction',
  order: 7,
  readTimeMinutes: 24,
  difficulty: 'Advanced',
  visualizerType: 'recursion-tree',
  objectives: [
    'Define pruning and state bounding conditions that terminate dead-end branches.',
    'Apply symmetry breaking to eliminate redundant isomorphic subtrees.',
    'Implement Combination Sum with sorting-based early exit pruning.',
    'Analyze exponential search reduction achieved by branch-and-bound techniques.'
  ],
  prerequisites: ['Permutations and Combinations', 'N-Queens Problem'],
  analogy: {
    title: 'Pruning Dead Branches from an Apple Tree',
    text: 'A gardener cuts off dying or diseased branches from an apple tree so the tree does not waste water and nutrients nourishing branches that will never bear fruit. In algorithm design, pruning cuts off recursive subtrees that can mathematically never yield a valid solution.',
    metaphor: 'Detecting failure early prevents exploring millions of useless descendants.'
  },
  problemSolved: {
    title: 'Transforming Infeasible Exponential Search into Practical Execution',
    description: 'Without pruning, backtracking visits O(k^n) states. Pruning conditions (like current_sum > target) prune entire subtrees immediately at the root, reducing runtimes from hours to milliseconds.',
    keyPoints: [
      'Early loop break condition reduces branching factor.',
      'Symmetry breaking eliminates identical mirror states.',
      'Essential for real-world combinatorial optimization.'
    ]
  },
  intuition: {
    overview: 'Before descending into a recursive call, evaluate whether the branch could possibly succeed. If remaining resources or candidate values cannot reach the goal, skip the branch immediately.',
    steps: [
      { step: 1, title: 'Sort Candidates', description: 'Sorting allows stopping the loop as soon as candidates[i] > remaining_target.' },
      { step: 2, title: 'Bounding Check', description: 'If current_sum + remaining_min > target, break early.' },
      { step: 3, title: 'Symmetry Breaking', description: 'Enforce ascending order to avoid exploring duplicate combinations like (2, 3) and (3, 2).' }
    ]
  },
  formalDefinition: {
    text: 'In branch-and-bound, a bounding function B(x) provides a lower bound on cost or an upper bound on feasibility. If B(x) violates the threshold constraint, the entire subtree rooted at x is pruned.',
    latex: '\\text{If } \\text{cost}(x) + h(x) > \\text{best\\_cost}, \\quad \\text{prune}(x)'
  },
  complexity: {
    overview: 'Worst-case remains exponential O(2^n), but effective pruned search tree size is drastically smaller.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Root pruned immediately by bound check.' },
      { case: 'Average', time: 'O(k^d) \\ll O(2^n)', space: 'O(d)', explanation: 'Prunes vast majority of invalid branches.' },
      { case: 'Worst', time: 'O(2^n)', space: 'O(n)', explanation: 'All branches satisfy bounding constraint.' }
    ],
    spaceNote: 'O(target) call stack depth.'
  },
  workedExample: {
    title: 'Combination Sum for candidates=[2, 3, 6, 7], target=7',
    input: 'candidates=[2, 3, 6, 7], target=7',
    steps: [
      { step: 1, action: 'Sort candidates', state: '[2, 3, 6, 7]', explanation: 'Enables early break.' },
      { step: 2, action: 'Try 2 -> Try 2 -> Try 2', state: 'Sum=6, target left=1', explanation: 'Next candidate is 2 > 1. Break! Prunes 3, 6, 7 instantly.' },
      { step: 3, action: 'Backtrack: [2, 2, 3]', state: 'Sum=7 -> Solution [2, 2, 3] found!', explanation: 'Matches target.' },
      { step: 4, action: 'Try 7', state: 'Sum=7 -> Solution [7] found!', explanation: 'Matches target.' }
    ],
    finalOutput: '[[2, 2, 3], [7]]'
  },
  visualExplanation: {
    title: 'Pruned Subtree Visualization',
    description: 'Visualizing branches severed at depth 2 rather than expanding 5 more levels deep.',
    features: ['Red X marks early loop break', 'Saves exponential number of descendant evaluations']
  },
  pseudocode: {
    title: 'Pruned Combination Sum',
    code: `function combinationSum(candidates, target):
    sort(candidates)
    result = []
    function backtrack(start, remain, path):
        if remain == 0:
            result.append(copy(path))
            return
        for i from start to len(candidates) - 1:
            if candidates[i] > remain:
                break # PRUNING: All subsequent elements are also too large!
            path.append(candidates[i])
            backtrack(i, remain - candidates[i], path)
            path.pop()
    backtrack(0, target, [])
    return result`
  },
  pythonCode: {
    title: 'Python Pruned Combination Sum',
    code: `def combination_sum_pruned(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort() # Critical for pruning
    res = []
    
    def backtrack(start: int, remain: int, path: list[int]):
        if remain == 0:
            res.append(list(path))
            return
        for i in range(start, len(candidates)):
            num = candidates[i]
            if num > remain:
                break # Prune all remaining elements!
            path.append(num)
            backtrack(i, remain - num, path)
            path.pop()
            
    backtrack(0, target, [])
    return res`,
    explanation: 'Sorting enables breaking the loop as soon as num > remain, pruning the rest of the array.'
  },
  runnableCode: {
    code: `print(combination_sum_pruned([2, 3, 6, 7], 7))
print(combination_sum_pruned([2, 3, 5], 8))`,
    expectedOutput: `[[2, 2, 3], [7]]\n[[2, 2, 2, 2], [2, 3, 3], [3, 5]]`
  },
  lineByLineExplanation: [
    { line: 2, code: 'candidates.sort()', explanation: 'Pre-sorting ensures elements are in strictly non-decreasing order.' },
    { line: 11, code: 'if num > remain: break', explanation: 'Key pruning step: because candidates are sorted, if current number exceeds remain, every subsequent number will too.' }
  ],
  edgeCases: [
    { case: 'All candidates exceed target', handling: 'First candidate triggers break, returns empty list [].', example: 'candidates=[10, 20], target=5' }
  ],
  commonMistakes: [
    { mistake: 'Using continue instead of break when candidates are sorted', solution: 'break stops checking all larger remaining elements; continue would unnecessarily check them.', codeExample: 'if num > remain: break # not continue' }
  ],
  applications: [
    { industry: 'Artificial Intelligence', application: 'Alpha-Beta pruning in chess and game engines', benefit: 'Prunes millions of suboptimal game board branches.' }
  ],
  practiceQuestions: [
    { id: 'pq-prune-1', question: 'What is symmetry breaking in the N-Queens problem?', hint: 'Reflecting the board across vertical axis.', answer: 'Only placing the queen in the first row on the left half of the board (c < N/2), then mirroring the found solutions across the vertical axis to cut work in half.' }
  ],
  quiz: [
    { id: 'q-prune-1', question: 'Why does sorting candidates enable breaking the loop instead of continuing?', options: ['Because subsequent candidates will be >= current candidate, so they will also exceed the remaining target', 'Sorting speeds up array indexing', 'Python requires sorted arrays for loops', 'It prevents stack overflow'], correctIndex: 0, explanation: 'In a sorted array, if candidates[i] > remain, all elements candidates[j] for j > i must also exceed remain.' }
  ],
  codingChallenge: {
    title: 'Palindrome Partitioning with Pruning',
    problem: 'Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitionings.',
    hints: ['Only recurse if the candidate prefix s[start:i+1] is a palindrome.'],
    starterCode: `def partition_palindromes(s: str) -> list[list[str]]:
    # TODO: Implement palindrome partitioning
    pass`,
    solution: `def partition_palindromes(s: str) -> list[list[str]]:
    res = []
    def is_palindrome(sub):
        return sub == sub[::-1]
    def backtrack(start, path):
        if start == len(s):
            res.append(list(path))
            return
        for end in range(start + 1, len(s) + 1):
            sub = s[start:end]
            if is_palindrome(sub): # Pruning: only explore palindromic substrings
                path.append(sub)
                backtrack(end, path)
                path.pop()
    backtrack(0, [])
    return res`
  },
  summary: {
    keyTakeaways: ['Pruning cuts branches that cannot mathematically reach a valid solution.', 'Sorting enables powerful early-break conditions.'],
    nextLessonId: 'dsa-sort-basic',
    nextLessonTitle: 'Bubble, Selection, and Insertion Sort',
    nextLessonModuleId: 'dsa-module-7'
  }
};

const dsa6Path = path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-6.ts');
writeModuleFile(dsa6Path, m6.data, m6Lessons);
console.log('Module 6 completed! Authored: ' + Object.keys(m6Lessons).length);
