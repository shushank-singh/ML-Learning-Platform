const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m4 = getExistingDSALessons(4);
const m4Lessons = { ...m4.lessons };

// 1. Singly Linked Lists
m4Lessons['dsa-ll-singly'] = {
  id: 'dsa-ll-singly',
  moduleId: 'dsa-module-4',
  title: 'Singly Linked Lists',
  subtitle: 'Node Structure, Heap References, Sequential Traversal & Basic Operations',
  order: 1,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'linked-list',
  objectives: [
    'Define the fundamental ListNode memory model (value payload + next pointer).',
    'Contrast linked node heap allocation with contiguous array buffers.',
    'Traverse a singly linked list iteratively and calculate its length in O(n) time.',
    'Implement insertion and deletion at the head in strict O(1) time.'
  ],
  prerequisites: [
    'Array Operations and Memory Layout',
    'Object-oriented class references and pointers'
  ],
  analogy: {
    title: 'The Scavenger Hunt Clue Trail',
    text: 'A scavenger hunt doesn’t give you a master list of all 10 prize coordinates at once. Instead, Clue #1 is at the fountain; when you reach the fountain, inside the envelope is the location of Clue #2 (the library). When you reach the library, inside is the location of Clue #3 (the clock tower). You cannot jump directly to Clue #7 without visiting Clues 1 through 6 first because each clue only knows the address of the very next clue.',
    metaphor: 'A singly linked list is a chain of pointer clues where each node references solely its direct successor.'
  },
  problemSolved: {
    title: 'Dynamic Non-Contiguous Memory Allocation',
    description: 'Arrays require a contiguous chunk of memory; allocating a huge array fails if memory is fragmented into smaller pockets. Linked lists allow elements to reside at arbitrary, non-contiguous heap addresses, growing and shrinking dynamically with zero memory reallocation or copying.',
    keyPoints: [
      'Eliminates array capacity limits and geometric resizing copies',
      'Instantaneous O(1) insertion and deletion at the head pointer',
      'Sacrifices O(1) random access: must traverse nodes sequentially in O(n)'
    ]
  },
  intuition: {
    overview: 'Each node is an independent heap object holding `val` and `next`. The list is accessed via a single `head` pointer pointing to the first node.',
    steps: [
      { step: 1, title: 'Node Definition', description: 'class ListNode: def __init__(self, val=0, next=None): self.val = val; self.next = next' },
      { step: 2, title: 'Traversal Loop', description: 'curr = head; while curr: process(curr.val); curr = curr.next' },
      { step: 3, title: 'Termination', description: 'Stops when curr is None (the tail node points to None).' }
    ]
  },
  formalDefinition: {
    text: 'A Singly Linked List L is a linear collection of data elements called nodes. Each node N_i consists of a datum v_i and a successor reference next: N_i -> N_{i+1}, terminating at N_{k-1}.next = NULL.',
    latex: 'L = \\langle N_0, N_1, \\dots, N_{k-1} \\rangle, \\quad N_i.\\text{next} = N_{i+1}, \\quad N_{k-1}.\\text{next} = \\emptyset'
  },
  complexity: {
    overview: 'Prepend (Insert Head): O(1). Delete Head: O(1). Append (with tail): O(1). Access by index: O(n). Search: O(n).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Head insertion or head deletion.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Accessing or searching for element at index n/2.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Accessing the last node or searching for absent value.' }
    ],
    spaceNote: 'Each node carries extra memory overhead for the next pointer reference (8 bytes on 64-bit architecture).'
  },
  workedExample: {
    title: 'Prepending 5 to Linked List [10 -> 20 -> 30]',
    input: 'Head -> [10] -> [20] -> [30] -> None. Prepend val = 5.',
    steps: [
      { step: 1, action: 'Create New Node', state: 'new_node = ListNode(5)', explanation: 'Allocates new node with next = None.' },
      { step: 2, action: 'Rewire Pointer', state: 'new_node.next = head', explanation: 'new_node now points to [10].' },
      { step: 3, action: 'Update Head', state: 'head = new_node', explanation: 'Head now points to [5].' }
    ],
    finalOutput: 'Head -> [5] -> [10] -> [20] -> [30] -> None in O(1) time.'
  },
  visualExplanation: {
    title: 'Heap Node Boxes and Arrows',
    description: 'Rectangular boxes scattered across heap memory. Arrows represent memory pointers. Traversal moves the curr cursor box by box along the arrows until hitting the null terminator.',
    features: ['Head pointer anchor', 'Pointer dereference hops', 'Null terminator sentinel']
  },
  pseudocode: {
    title: 'Singly Linked List Class',
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def print_list(head):
    curr = head
    while curr is not None:
        print(curr.val)
        curr = curr.next`
  },
  pythonCode: {
    title: 'Singly Linked List Implementation in Python',
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def prepend(self, val):
        new_node = ListNode(val, self.head)
        self.head = new_node

    def append(self, val):
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node

    def to_list(self):
        res = []
        curr = self.head
        while curr:
            res.append(curr.val)
            curr = curr.next
        return res

sll = SinglyLinkedList()
sll.append(10)
sll.append(20)
sll.prepend(5)
print("Linked list elements:", sll.to_list()) # [5, 10, 20]`,
    explanation: 'Demonstrates ListNode creation, O(1) prepend, and O(n) traversal.'
  },
  runnableCode: {
    code: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# Build 1 -> 2 -> 3
head = Node(1, Node(2, Node(3)))

def get_length(node):
    count = 0
    while node:
        count += 1
        node = node.next
    return count

print("Length of list 1->2->3:", get_length(head))`,
    expectedOutput: 'Length of list 1->2->3: 3'
  },
  lineByLineExplanation: [
    { lines: '7-12', codeSnippet: 'def get_length(node):\n    count = 0\n    while node:\n        count += 1\n        node = node.next', explanation: 'Counts nodes iteratively by following next pointers until None.' }
  ],
  edgeCases: [
    { case: 'Empty list (head is None)', handling: 'Loops do not execute; return 0 or None immediately.', example: 'head = None' },
    { case: 'Single node list', handling: 'Traverses exactly 1 step; node.next is None.', example: 'head = Node(42)' }
  ],
  commonMistakes: [
    { mistake: 'Losing the head pointer reference.', solution: 'Always use a temporary cursor variable `curr = head` to traverse; never do `head = head.next` unless deliberately deleting the head.' },
    { mistake: 'Dereferencing None.next.', solution: 'Always verify `while curr is not None:` before accessing `curr.next`.' }
  ],
  applications: [
    { industry: 'Operating Systems', application: 'Free Memory Block Lists', benefit: 'Allocators track unallocated heap segments in linked lists of variable block sizes.' },
    { industry: 'Data Structures', application: 'Hash Table Separate Chaining', benefit: 'Each bucket in a hash table chains colliding elements in a singly linked list.' }
  ],
  practiceQuestions: [
    { id: 'dsa-4-1-q1', question: 'What is the time complexity to insert an element at the beginning versus the end of a singly linked list without a tail pointer?', hint: 'Do you need to traverse the list?', answer: 'Beginning: O(1) by updating head. End: O(n) because you must traverse from head to the final node to update tail.next.' },
    { id: 'dsa-4-1-q2', question: 'Why does an array use less memory than a linked list with the same number of integers?', hint: 'Consider pointer storage overhead.', answer: 'An array stores only the raw integer bytes contiguously. A linked list stores the integer PLUS an 8-byte pointer address in every single node.' },
    { id: 'dsa-4-1-q3', question: 'What happens if you execute `head = head.next` when head is not None?', hint: 'What happens to the first node in memory?', answer: 'The first node is detached from the list. In Python, its reference count drops to zero and it is reclaimed by the garbage collector (O(1) head deletion).' }
  ],
  quiz: [
    {
      id: 'dsa-4-1-quiz-1',
      question: 'What is the time complexity to access the element at index k in a singly linked list?',
      options: ['O(k)', 'O(1)', 'O(log k)', 'O(n^2)'],
      correctIndex: 0,
      explanation: 'Linked lists do not support random arithmetic indexing; you must traverse k pointers from the head, taking O(k) steps.'
    },
    {
      id: 'dsa-4-1-quiz-2',
      question: 'What is the primary advantage of a linked list over a dynamic array?',
      options: [
        'O(1) worst-case insertion at the head without memory reallocations or element shifts',
        'Faster random access',
        'Lower memory usage',
        'Better CPU cache locality'
      ],
      correctIndex: 0,
      explanation: 'Linked lists can insert a node at the head in constant O(1) time by rewiring two pointers, requiring zero shifting or capacity doubling.'
    },
    {
      id: 'dsa-4-1-quiz-3',
      question: 'In a singly linked list, what does the `next` pointer of the final tail node point to?',
      options: ['None (or NULL)', 'The head node', 'Itself', 'Zero'],
      correctIndex: 0,
      explanation: 'In a standard singly linked list, the final node terminates with next = None, signaling the end of the sequence.'
    }
  ],
  codingChallenge: {
    title: 'Delete Node in a Linked List (Given Only That Node)',
    problem: 'Write a function to delete a node in a singly-linked list. You will not be given access to the head of the list, only to the node to be deleted directly. It is guaranteed that the node to be deleted is not a tail node.',
    starterCode: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def delete_node(node):
    # Overwrite current node value with next node value, then bypass next node!
    node.val = node.next.val
    node.next = node.next.next

# Build: 4 -> 5 -> 1 -> 9, delete node 5
head = ListNode(4)
node5 = ListNode(5)
head.next = node5
node1 = ListNode(1)
node5.next = node1
node1.next = ListNode(9)

delete_node(node5)

# Verify: 4 -> 1 -> 9
res = []
curr = head
while curr:
    res.append(curr.val)
    curr = curr.next
print("Result after deleting 5:", res) # Expected: [4, 1, 9]`,
    solution: `def delete_node(node):
    node.val = node.next.val
    node.next = node.next.next`,
    hints: [
      'Since you cannot access the previous node to rewire its pointer, copy the next node value into the current node.',
      'Then delete the next node by setting `node.next = node.next.next`.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Singly linked lists store elements as independent heap nodes connected by pointers.',
      'Head operations (insert/delete) are strictly O(1).',
      'Element retrieval is O(n) sequential traversal.',
      'Extra memory overhead exists for pointer storage in every node.'
    ],
    nextLessonId: 'dsa-ll-doubly',
    nextLessonTitle: 'Doubly Linked Lists',
    nextLessonModuleId: 'dsa-module-4'
  }
};

// 2. Doubly Linked Lists
m4Lessons['dsa-ll-doubly'] = {
  id: 'dsa-ll-doubly',
  moduleId: 'dsa-module-4',
  title: 'Doubly Linked Lists',
  subtitle: 'Bidirectional Pointers, Prev/Next Invariants & O(1) Arbitrary Deletion',
  order: 2,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'linked-list',
  objectives: [
    'Define the DoublyLinkedList node structure with `prev` and `next` pointers.',
    'Execute bidirectional traversals (forward from head, backward from tail).',
    'Perform O(1) node deletion given a direct reference to that node.',
    'Implement Sentinel (Dummy Head & Tail) nodes to eliminate null boundary checks.'
  ],
  prerequisites: [
    'Singly Linked Lists',
    'Pointer rewiring mechanics'
  ],
  analogy: {
    title: 'The Two-Way Subway Track',
    text: 'A one-way subway tunnel only lets trains move forward; if a train wants to back up by one station, it must loop all the way through the city to return. A two-way subway track has rails in both directions. Any train at Station #5 can step forward to Station #6 or step backward to Station #4 in 1 second. Each station maintains physical track switches pointing both upstream and downstream.',
    metaphor: 'Doubly linked lists store pointers in both directions, enabling O(1) backward and forward stepping.'
  },
  problemSolved: {
    title: 'Enabling O(1) Arbitrary Deletion and LRU Caches',
    description: 'In a singly linked list, deleting a given node requires finding its previous predecessor node in O(n) time. In a doubly linked list, the node already knows its predecessor via `node.prev`, allowing instant O(1) removal. This is the cornerstone of LRU Caches.',
    keyPoints: [
      'O(1) deletion of any node given its reference pointer',
      'Bidirectional iteration from both head and tail',
      'Sentinel nodes (dummy head and tail) completely eliminate boundary edge cases'
    ]
  },
  intuition: {
    overview: 'To delete node X: set `X.prev.next = X.next` and `X.next.prev = X.prev`. Node X is instantly unlinked from the chain.',
    steps: [
      { step: 1, title: 'Left Bridge', description: 'node.prev.next = node.next.' },
      { step: 2, title: 'Right Bridge', description: 'node.next.prev = node.prev.' },
      { step: 3, title: 'Node Isolation', description: 'node.prev = node.next = None.' }
    ]
  },
  formalDefinition: {
    text: 'A Doubly Linked List node N contains value v, a forward pointer next, and a backward pointer prev such that N.next.prev = N and N.prev.next = N for all internal nodes.',
    latex: 'N_i.\\text{next}.\\text{prev} = N_i \\quad \\land \\quad N_i.\\text{prev}.\\text{next} = N_i'
  },
  complexity: {
    overview: 'Insert/Delete at Head or Tail: O(1). Delete given node reference: O(1). Access by index: O(n).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Insertion or deletion at head, tail, or known node pointer.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Search by value requires linear traversal.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Traversing full length.' }
    ],
    spaceNote: 'Requires 2 pointer addresses per node (16 bytes on 64-bit platforms), doubling pointer overhead.'
  },
  workedExample: {
    title: 'Removing Node [B] from [A <-> B <-> C]',
    input: 'Chain: A <-> B <-> C. Target: Delete B.',
    steps: [
      { step: 1, action: 'Rewire A.next', state: 'A.next = B.next (C)', explanation: 'A now points forward directly to C.' },
      { step: 2, action: 'Rewire C.prev', state: 'C.prev = B.prev (A)', explanation: 'C now points backward directly to A.' },
      { step: 3, action: 'Clean B', state: 'B.next = B.prev = None', explanation: 'B is detached.' }
    ],
    finalOutput: 'Chain transformed to [A <-> C] in O(1) operations.'
  },
  visualExplanation: {
    title: 'Double-Arrow Bridges',
    description: 'Each node has a rightward green arrow (next) and a leftward blue arrow (prev). Deletion bypasses the middle node by connecting the green arrow from the left neighbor directly to the right neighbor, and the blue arrow from the right neighbor directly to the left neighbor.',
    features: ['Reciprocal pointer pairs', 'Sentinel dummy head & tail', 'O(1) detachment']
  },
  pseudocode: {
    title: 'Doubly Linked List Deletion',
    code: `def remove_node(node):
    prev_node = node.prev
    next_node = node.next
    prev_node.next = next_node
    next_node.prev = prev_node
    node.prev = None
    node.next = None`
  },
  pythonCode: {
    title: 'Doubly Linked List with Sentinels in Python',
    code: `class DNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class DoublyLinkedList:
    def __init__(self):
        # Dummy head and tail eliminate None checks
        self.head = DNode()
        self.tail = DNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def add_first(self, val):
        new_node = DNode(val, self.head, self.head.next)
        self.head.next.prev = new_node
        self.head.next = new_node
        return new_node

    def remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def to_list(self):
        res = []
        curr = self.head.next
        while curr != self.tail:
            res.append(curr.val)
            curr = curr.next
        return res

dll = DoublyLinkedList()
n1 = dll.add_first(10)
n2 = dll.add_first(20)
dll.add_first(30) # List is [30, 20, 10]
print("Before removal:", dll.to_list())
dll.remove(n2) # Remove 20 in O(1)
print("After removing 20:", dll.to_list())`,
    explanation: 'Uses sentinel nodes to perform O(1) insertions and deletions with zero null pointer checks.'
  },
  runnableCode: {
    code: `class DNode:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None

a, b, c = DNode("A"), DNode("B"), DNode("C")
a.next = b; b.prev = a
b.next = c; c.prev = b

# Delete b in O(1)
b.prev.next = b.next
b.next.prev = b.prev

# Print forward from a
res = []
curr = a
while curr:
    res.append(curr.val)
    curr = curr.next
print("Result after removing B in O(1):", " <-> ".join(res))`,
    expectedOutput: 'Result after removing B in O(1): A <-> C'
  },
  lineByLineExplanation: [
    { lines: '11-12', codeSnippet: 'b.prev.next = b.next\nb.next.prev = b.prev', explanation: 'Bypasses node b from both directions in exactly 2 pointer assignments.' }
  ],
  edgeCases: [
    { case: 'Deleting Head or Tail without Sentinels', handling: 'Requires special-case updating of head or tail references.', example: 'node == head' },
    { case: 'List with 0 or 1 elements', handling: 'Handled automatically when dummy sentinels are used.', example: 'head.next == tail' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting to update both `next` and `prev` pointers.', solution: 'Must always update the pair: left.next = right AND right.prev = left.' },
    { mistake: 'Losing pointer reference order during insertion.', solution: 'Always set the new node pointers first before re-wiring existing neighboring pointers.' }
  ],
  applications: [
    { industry: 'Caching Systems', application: 'LRU (Least Recently Used) Cache', benefit: 'Combines Hash Map with Doubly Linked List to achieve O(1) get and O(1) put with least-recently-used eviction.' },
    { industry: 'Web Browsers', application: 'History Back / Forward Navigation', benefit: 'Traverses visited web pages bidirectionally in O(1) time.' }
  ],
  practiceQuestions: [
    { id: 'dsa-4-2-q1', question: 'Why does an LRU Cache use a Doubly Linked List instead of a Singly Linked List?', hint: 'When a key is accessed, it must be moved to the front.', answer: 'Moving an accessed node to the front requires removing it from its current position in O(1) time. A doubly linked list allows O(1) detachment because it has direct access to node.prev.' },
    { id: 'dsa-4-2-q2', question: 'What is the purpose of Sentinel (Dummy) nodes in a Doubly Linked List?', hint: 'Do you ever have to check `if head is None`?', answer: 'Sentinel nodes (dummy head and dummy tail) eliminate all edge cases for empty lists, single-element lists, and boundary insertions, allowing identical pointer rewiring code for all operations.' },
    { id: 'dsa-4-2-q3', question: 'How can you optimize index access in a doubly linked list if the list tracks its size n?', hint: 'Should you start from head or tail?', answer: 'If index < n/2, traverse forward from head; if index >= n/2, traverse backward from tail. This cuts average search traversal steps in half to n/4.' }
  ],
  quiz: [
    {
      id: 'dsa-4-2-quiz-1',
      question: 'What is the time complexity to delete a node in a doubly linked list given a direct reference to that node?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
      correctIndex: 0,
      explanation: 'Because the node has direct access to node.prev and node.next, it can rewire both adjacent pointers in constant O(1) time without searching.'
    },
    {
      id: 'dsa-4-2-quiz-2',
      question: 'How many pointer references are stored in each node of a doubly linked list?',
      options: ['2 (prev and next)', '1 (next only)', '4', 'Depends on list size'],
      correctIndex: 0,
      explanation: 'Each node stores two pointers: one forward to the next node and one backward to the previous node.'
    },
    {
      id: 'dsa-4-2-quiz-3',
      question: 'Which popular data structure directly pairs a Hash Map with a Doubly Linked List?',
      options: ['LRU Cache', 'Binary Search Tree', 'Trie', 'Heap'],
      correctIndex: 0,
      explanation: 'An LRU Cache uses a Hash Map for O(1) key lookups and a Doubly Linked List for O(1) eviction and reordering of nodes.'
    }
  ],
  codingChallenge: {
    title: 'LRU Cache Design',
    problem: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) both executing in O(1) average time complexity.',
    starterCode: `class DNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.map = {}
        self.head = DNode()
        self.tail = DNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.map:
            node = self.map[key]
            self._remove(node)
            self._add_front(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            self._remove(self.map[key])
        node = DNode(key, value)
        self.map[key] = node
        self._add_front(node)
        if len(self.map) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.map[lru.key]

lru = LRUCache(2)
lru.put(1, 1)
lru.put(2, 2)
print("Get 1:", lru.get(1)) # returns 1
lru.put(3, 3)               # evicts key 2
print("Get 2:", lru.get(2)) # returns -1 (not found)`,
    solution: `class DNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.map = {}
        self.head = DNode()
        self.tail = DNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.map:
            node = self.map[key]
            self._remove(node)
            self._add_front(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            self._remove(self.map[key])
        node = DNode(key, value)
        self.map[key] = node
        self._add_front(node)
        if len(self.map) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.map[lru.key]`,
    hints: [
      'Maintain a dictionary mapping key -> DNode.',
      'Maintain a Doubly Linked List with dummy head and tail where head.next is most recently used and tail.prev is least recently used.',
      'On get or put of existing key, detach node and move to head. On capacity overflow, evict tail.prev.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Doubly linked lists store both `prev` and `next` pointers.',
      'Enables O(1) deletion of any node given its reference.',
      'Dummy sentinels simplify pointer logic and prevent null pointer errors.',
      'The combination of a hash map and a doubly linked list powers the LRU cache.'
    ],
    nextLessonId: 'dsa-ll-circular',
    nextLessonTitle: 'Circular Linked Lists',
    nextLessonModuleId: 'dsa-module-4'
  }
};

// 3. Circular Linked Lists
m4Lessons['dsa-ll-circular'] = {
  id: 'dsa-ll-circular',
  moduleId: 'dsa-module-4',
  title: 'Circular Linked Lists',
  subtitle: 'Ring Topologies, Tail-to-Head Wraparound & The Josephus Problem',
  order: 3,
  readTimeMinutes: 18,
  difficulty: 'Intermediate',
  visualizerType: 'linked-list',
  objectives: [
    'Define the circular linked list invariant (tail.next == head).',
    'Traverse circular lists safely avoiding infinite loops using do-while semantics.',
    'Implement O(1) head and tail insertions using only a `tail` pointer.',
    'Model and solve the classic Josephus elimination problem in O(n * k) and O(n) time.'
  ],
  prerequisites: [
    'Singly Linked Lists',
    'Loop termination conditions'
  ],
  analogy: {
    title: 'The Board Game Monopoly Track',
    text: 'A Monopoly board has 40 squares arranged in a continuous loop: Go, Mediterranean Ave... Boardwalk, and back to Go. There is no dead-end "null" square where a player falls off the edge of the world. Once a token passes Boardwalk, its next step automatically wraps back around to Go. Players cycle around the same continuous ring indefinitely.',
    metaphor: 'A circular linked list wraps its tail pointer back to the head, creating an endless ring topology.'
  },
  problemSolved: {
    title: 'Managing Cyclical and Continuous Resource Allocation',
    description: 'Many computing problems are naturally cyclical: round-robin OS CPU process scheduling, multiplayer board game turns, and ring buffers. A circular linked list models these structures with zero index boundary arithmetic or array shifts.',
    keyPoints: [
      'Tail points directly back to head: tail.next = head',
      'Maintaining a single `tail` pointer gives O(1) access to BOTH tail and head (tail.next)',
      'Provides natural model for round-robin time slicing'
    ]
  },
  intuition: {
    overview: 'If you maintain a `tail` pointer in a circular list, the head is instantly accessible via `tail.next`. This gives O(1) insert at both head and tail using only ONE pointer variable.',
    steps: [
      { step: 1, title: 'Insert at Head', description: 'new_node.next = tail.next; tail.next = new_node.' },
      { step: 2, title: 'Insert at Tail', description: 'new_node.next = tail.next; tail.next = new_node; tail = new_node.' },
      { step: 3, title: 'Traversal Guard', description: 'Record start = curr; do { curr = curr.next } while (curr != start).' }
    ]
  },
  formalDefinition: {
    text: 'A Circular Singly Linked List C is a sequence of nodes where N_{k-1}.next = N_0. Traversal termination requires checking curr.next == head rather than curr == NULL.',
    latex: '\\forall i \\in [0, k-1], \\quad N_i.\\text{next} = N_{(i+1) \\bmod k}'
  },
  complexity: {
    overview: 'Insert Head/Tail (with tail pointer): O(1). Delete Head: O(1). Traversal: O(n).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Head or tail insertion via tail reference.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Full circuit cycle traversal.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Deleting node at arbitrary middle position.' }
    ],
    spaceNote: 'No null pointer is wasted at the tail; memory is strictly identical to singly linked list.'
  },
  workedExample: {
    title: 'Solving Josephus Problem: n = 5 people, eliminate every k = 2nd person',
    input: 'Ring: [1 -> 2 -> 3 -> 4 -> 5 -> back to 1], k = 2',
    steps: [
      { step: 1, action: 'Step 1', state: 'Count 2: eliminate 2', explanation: 'Ring becomes: 1 -> 3 -> 4 -> 5 -> 1.' },
      { step: 2, action: 'Step 2', state: 'Count 2 from 3: eliminate 4', explanation: 'Ring becomes: 1 -> 3 -> 5 -> 1.' },
      { step: 3, action: 'Step 3', state: 'Count 2 from 5: eliminate 1', explanation: 'Ring becomes: 3 -> 5 -> 3.' },
      { step: 4, action: 'Step 4', state: 'Count 2 from 3: eliminate 5', explanation: 'Only person 3 remains alive.' }
    ],
    finalOutput: 'Survivor is person 3.'
  },
  visualExplanation: {
    title: 'The Closed Ring Topology',
    description: 'Nodes arranged in a circle with curved arrows flowing clockwise. The tail node’s outgoing arrow curves back to the head node, forming a seamless ring.',
    features: ['No null pointers', 'Curved tail-to-head loop', 'Single tail reference anchor']
  },
  pseudocode: {
    title: 'Circular List Traversal',
    code: `def traverse_circular(tail):
    if not tail: return
    curr = tail.next # head
    while True:
        visit(curr.val)
        curr = curr.next
        if curr == tail.next:
            break`
  },
  pythonCode: {
    title: 'Circular Linked List and Josephus Simulator in Python',
    code: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

def josephus_circle(n, k):
    # Build circular list 1..n
    head = Node(1)
    prev = head
    for i in range(2, n + 1):
        curr = Node(i)
        prev.next = curr
        prev = curr
    prev.next = head # Close the circle!

    # Eliminate every k-th person
    curr = head
    while curr.next != curr:
        # Step k - 2 times to reach predecessor of person to eliminate
        for _ in range(k - 2):
            curr = curr.next
        # Eliminate curr.next
        curr.next = curr.next.next
        curr = curr.next

    return curr.val

print("Survivor for n=5, k=2:", josephus_circle(5, 2)) # Expected: 3
print("Survivor for n=7, k=3:", josephus_circle(7, 3)) # Expected: 4`,
    explanation: 'Simulates the physical elimination process on a real circular linked list.'
  },
  runnableCode: {
    code: `class CircularList:
    def __init__(self):
        self.tail = None

    def add_end(self, val):
        from types import SimpleNamespace
        node = SimpleNamespace(val=val, next=None)
        if not self.tail:
            node.next = node
            self.tail = node
        else:
            node.next = self.tail.next
            self.tail.next = node
            self.tail = node

    def print_circuit(self):
        if not self.tail: return []
        res = []
        curr = self.tail.next
        while True:
            res.append(curr.val)
            curr = curr.next
            if curr == self.tail.next: break
        return res

cl = CircularList()
for x in [10, 20, 30]: cl.add_end(x)
print("Circular list:", cl.print_circuit())`,
    expectedOutput: 'Circular list: [10, 20, 30]'
  },
  lineByLineExplanation: [
    { lines: '9-10', codeSnippet: 'if not self.tail:\n    node.next = node\n    self.tail = node', explanation: 'First node points to itself, establishing a 1-node circular ring.' },
    { lines: '12-14', codeSnippet: 'node.next = self.tail.next\nself.tail.next = node\nself.tail = node', explanation: 'Inserts at end in O(1) by updating tail and rewiring circle.' }
  ],
  edgeCases: [
    { case: 'Infinite loop during traversal', handling: 'Always use start pointer sentinel to break when curr == start.', example: 'curr == head' },
    { case: 'Single node circular list', handling: 'node.next points to itself.', example: 'node.next == node' }
  ],
  commonMistakes: [
    { mistake: 'Using `while curr is not None:` in a circular list.', solution: 'This creates an infinite loop because next is never None. Stop when `curr == start`.' },
    { mistake: 'Losing access to head when updating tail.', solution: 'Always set `new_node.next = tail.next` before overwriting `tail.next`.' }
  ],
  applications: [
    { industry: 'Operating Systems', application: 'Round-Robin CPU Scheduler', benefit: 'Cycles through active processes in a circular queue, giving each thread equal CPU quantum slices.' },
    { industry: 'Media Players', application: 'Repeat Playlist Mode', benefit: 'When the final song finishes, the player automatically restarts from track #1.' }
  ],
  practiceQuestions: [
    { id: 'dsa-4-3-q1', question: 'How can you insert at the beginning of a circular linked list in O(1) time if you only store a pointer to `tail`?', hint: 'Where is the head relative to tail?', answer: 'head is `tail.next`. Set `new_node.next = tail.next` and `tail.next = new_node`. Do NOT advance tail. The new node becomes the new head in O(1).' },
    { id: 'dsa-4-3-q2', question: 'How can you detect if a singly linked list is circular versus linear?', hint: 'Check the tail node.', answer: 'Traverse the list. If you encounter None, it is linear. If you encounter the head node again, it is circular. Alternatively use Floyd’s Cycle Detection.' },
    { id: 'dsa-4-3-q3', question: 'What is the recurrence relation for the Josephus problem J(n, k)?', hint: 'Dynamic programming formulation.', answer: 'J(1, k) = 0 (0-indexed); J(n, k) = (J(n - 1, k) + k) mod n. This solves Josephus in O(n) time and O(1) space without simulating the list.' }
  ],
  quiz: [
    {
      id: 'dsa-4-3-quiz-1',
      question: 'What is the terminating condition when traversing a circular linked list starting from `head`?',
      options: [
        'When curr.next == head (or curr returns to head)',
        'When curr is None',
        'When curr.val == 0',
        'When curr.prev is None'
      ],
      correctIndex: 0,
      explanation: 'Because a circular linked list never contains a None pointer, the loop terminates when the cursor wraps all the way around to the starting node.'
    },
    {
      id: 'dsa-4-3-quiz-2',
      question: 'Why is storing a `tail` pointer more powerful than storing a `head` pointer in a circular linked list?',
      options: [
        'Because `tail.next` is the head, providing O(1) access to BOTH ends of the list',
        'Because tail uses less memory',
        'Because head pointers cannot store data',
        'Because tail is always even'
      ],
      correctIndex: 0,
      explanation: 'Storing `tail` gives instant O(1) access to the tail, and `tail.next` gives instant O(1) access to the head, enabling O(1) prepends and appends.'
    },
    {
      id: 'dsa-4-3-quiz-3',
      question: 'Which scheduling algorithm is most naturally implemented using a circular linked list?',
      options: ['Round-Robin Scheduling', 'First-Come First-Served', 'Shortest Job First', 'Priority Preemptive'],
      correctIndex: 0,
      explanation: 'Round-robin process schedulers allocate fixed time quanta cyclically among ready processes, which directly maps to circular list rotation.'
    }
  ],
  codingChallenge: {
    title: 'Split a Circular Linked List into Two Halves',
    problem: 'Given a circular linked list of length n, split it into two circular linked lists of sizes ceil(n/2) and floor(n/2). Return the heads of the two resulting circular lists.',
    starterCode: `class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def split_circular_list(head):
    if not head or head.next == head:
        return head, None

    slow = head
    fast = head
    # Tortoise and Hare to find middle
    while fast.next != head and fast.next.next != head:
        slow = slow.next
        fast = fast.next.next

    # For even elements, advance fast to tail
    if fast.next.next == head:
        fast = fast.next

    head1 = head
    head2 = slow.next

    # Close second circle
    fast.next = head2
    # Close first circle
    slow.next = head1

    return head1, head2`,
    solution: `def split_circular_list(head):
    if not head or head.next == head:
        return head, None
    slow = head
    fast = head
    while fast.next != head and fast.next.next != head:
        slow = slow.next
        fast = fast.next.next
    if fast.next.next == head:
        fast = fast.next
    head1 = head
    head2 = slow.next
    fast.next = head2
    slow.next = head1
    return head1, head2`,
    hints: [
      'Use slow and fast pointers to locate the midpoint node `slow`.',
      'Set `head2 = slow.next`.',
      'Rewire `slow.next = head1` and `fast.next = head2` to close both individual rings.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Circular linked lists connect tail.next back to head, forming a continuous ring.',
      'Maintaining a `tail` pointer enables O(1) insertion at both ends.',
      'Termination conditions must check for return to the start node, not None.',
      'Directly models round-robin CPU scheduling and the Josephus problem.'
    ],
    nextLessonId: 'dsa-ll-insert-delete',
    nextLessonTitle: 'Insertion and Deletion',
    nextLessonModuleId: 'dsa-module-4'
  }
};

// 4. Insertion and Deletion in Linked Lists
m4Lessons['dsa-ll-insert-delete'] = {
  id: 'dsa-ll-insert-delete',
  moduleId: 'dsa-module-4',
  title: 'Insertion and Deletion in Linked Lists',
  subtitle: 'Pointer Rewiring Patterns, Dummy Head Idioms & Memory Safety',
  order: 4,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'linked-list',
  objectives: [
    'Master the Dummy Head (Sentinel) technique to unify head and interior deletions.',
    'Insert a node at an arbitrary 0-indexed position k in O(k) time.',
    'Delete a node by value or by position safely without orphan memory leaks.',
    'Analyze pointer assignment order to prevent accidental list severance.'
  ],
  prerequisites: [
    'Singly Linked Lists',
    'Doubly Linked Lists'
  ],
  analogy: {
    title: 'Coupling and Uncoupling Freight Train Cars',
    text: 'To attach a refrigerated car between Car 3 and Car 4 of a moving train: First, you hook the front coupling of the refrigerated car onto Car 3. Only after that connection is secured do you hook the rear coupling onto Car 4. If you disconnect Car 3 from Car 4 before the new car is coupled, the entire rear half of the train rolls away disconnected into the wilderness.',
    metaphor: 'Always connect the new node’s outgoing link before breaking existing chain links.'
  },
  problemSolved: {
    title: 'Eliminating Edge-Case Spaghetti Code in Pointer Manipulation',
    description: 'Without a dummy head sentinel, inserting or deleting the first element requires separate `if head == target:` branches, polluting code with repetitive special cases. A dummy head unifies all operations into a single clean loop.',
    keyPoints: [
      'Dummy head `dummy.next = head` turns head modifications into standard interior modifications',
      'Strict pointer rewiring order: `new_node.next = prev.next; prev.next = new_node`',
      'Garbage collection automatically reclaims unreferenced detached subgraphs'
    ]
  },
  intuition: {
    overview: 'To insert after node `prev`: connect `new_node.next = prev.next`, then connect `prev.next = new_node`. To delete after node `prev`: `prev.next = prev.next.next`.',
    steps: [
      { step: 1, title: 'Create Dummy Anchor', description: 'dummy = ListNode(0, head).' },
      { step: 2, title: 'Advance to Predecessor', description: 'Walk `prev` pointer to the node immediately before target position.' },
      { step: 3, title: 'Perform Rewiring', description: 'Reassign pointers in safe sequence.' },
      { step: 4, title: 'Return New Head', description: 'Return `dummy.next`.' }
    ]
  },
  formalDefinition: {
    text: 'Let L be a linked list. Insertion of node N at position k requires locating predecessor P = L[k-1] and updating: N.next = P.next followed by P.next = N. Deletion of L[k] requires P.next = P.next.next.',
    latex: 'N.\\text{next} \\leftarrow P.\\text{next}, \\quad P.\\text{next} \\leftarrow N'
  },
  complexity: {
    overview: 'Insert/Delete at head: O(1). Insert/Delete at position k: O(k) time, O(1) space.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Operating at position 0.' },
      { case: 'Average', time: 'O(k)', space: 'O(1)', explanation: 'Stepping k nodes forward.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Inserting at the very end of list of size n.' }
    ],
    spaceNote: 'In-place pointer rewiring uses O(1) auxiliary space.'
  },
  workedExample: {
    title: 'Removing all occurrences of 2 from [1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6], val = 6',
    input: 'Head -> 1 -> 2 -> 6 -> 3 -> 6, val = 6',
    steps: [
      { step: 1, action: 'Dummy Setup', state: 'dummy.next = head (0 -> 1 -> 2 -> 6 -> 3 -> 6)', explanation: 'Sentinel node handles potential head deletion.' },
      { step: 2, action: 'Traverse to node 2', state: 'curr = node 2, curr.next.val == 6', explanation: 'Bypass node 6: curr.next = curr.next.next (node 3).' },
      { step: 3, action: 'Traverse to node 3', state: 'curr = node 3, curr.next.val == 6', explanation: 'Bypass second node 6: curr.next = None.' }
    ],
    finalOutput: 'List cleaned to [1 -> 2 -> 3] in O(n) single pass.'
  },
  visualExplanation: {
    title: 'The Sentinel Bypass Bridge',
    description: 'Dummy node sits before index 0. The cursor stops at `prev`. The `next` pointer leaps over the victim node directly to `victim.next`. The victim node is isolated and reaped by garbage collection.',
    features: ['Dummy sentinel anchor', 'Predecessor stopping invariant', 'Leapfrog link bypass']
  },
  pseudocode: {
    title: 'Remove Elements by Value',
    code: `def remove_elements(head, val):
    dummy = ListNode(0, head)
    curr = dummy
    while curr.next:
        if curr.next.val == val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    return dummy.next`
  },
  pythonCode: {
    title: 'Complete Insert and Delete Operations in Python',
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def insert_at_index(head, index, val):
    dummy = ListNode(0, head)
    prev = dummy
    for _ in range(index):
        if not prev: return head
        prev = prev.next

    new_node = ListNode(val, prev.next)
    prev.next = new_node
    return dummy.next

def remove_by_value(head, target):
    dummy = ListNode(0, head)
    prev = dummy
    while prev.next:
        if prev.next.val == target:
            prev.next = prev.next.next
        else:
            prev = prev.next
    return dummy.next

# Build: 1 -> 2 -> 3
head = ListNode(1, ListNode(2, ListNode(3)))
head = insert_at_index(head, 1, 99) # 1 -> 99 -> 2 -> 3
head = remove_by_value(head, 2)      # 1 -> 99 -> 3

res = []
curr = head
while curr:
    res.append(curr.val)
    curr = curr.next
print("Result:", res) # Expected: [1, 99, 3]`,
    explanation: 'Demonstrates dummy node pattern for both position-based insertion and value-based deletion.'
  },
  runnableCode: {
    code: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def remove_nth_from_end(head, n):
    dummy = Node(0, head)
    fast = slow = dummy
    # Move fast n + 1 steps ahead
    for _ in range(n + 1):
        fast = fast.next
    # Move both until fast hits None
    while fast:
        slow = slow.next
        fast = fast.next
    # Delete target
    slow.next = slow.next.next
    return dummy.next

head = Node(1, Node(2, Node(3, Node(4, Node(5)))))
head = remove_nth_from_end(head, 2) # Removes 4
res = []
while head:
    res.append(head.val)
    head = head.next
print("After removing 2nd from end:", res)`,
    expectedOutput: 'After removing 2nd from end: [1, 2, 3, 5]'
  },
  lineByLineExplanation: [
    { lines: '7-10', codeSnippet: 'for _ in range(n + 1):\n    fast = fast.next', explanation: 'Creates a gap of n nodes between fast and slow pointers.' },
    { lines: '12-14', codeSnippet: 'while fast:\n    slow = slow.next\n    fast = fast.next', explanation: 'When fast reaches end, slow is positioned exactly before target node.' },
    { lines: '16', codeSnippet: 'slow.next = slow.next.next', explanation: 'Bypasses and deletes the target node in O(1).' }
  ],
  edgeCases: [
    { case: 'Deleting head element', handling: 'Dummy node handles head deletion identically to interior deletion.', example: 'head.val == target' },
    { case: 'Index k greater than list length', handling: 'Check `if not prev: return head` to avoid null dereferences.', example: 'insert at index 10 on length 3' }
  ],
  commonMistakes: [
    { mistake: 'Reversing pointer order during insertion: `prev.next = new_node` first.', solution: 'Setting `prev.next = new_node` first severs access to the remainder of the list. Always connect `new_node.next = prev.next` first!' },
    { mistake: 'Advancing pointer after a deletion.', solution: 'After `curr.next = curr.next.next`, do NOT advance `curr` because the newly exposed `curr.next` must be inspected next!' }
  ],
  applications: [
    { industry: 'Compilers & Interpreters', application: 'Symbol Table Scope Chaining', benefit: 'Pushes and pops identifier bindings in nested lexical scopes in O(1) time.' },
    { industry: 'Game Engines', application: 'Entity-Component System (ECS)', benefit: 'Spawns and destroys game entities in linked scene graphs without array reallocations.' }
  ],
  practiceQuestions: [
    { id: 'dsa-4-4-q1', question: 'Why does the dummy head technique simplify linked list deletion code?', hint: 'What happens if the head node itself needs to be deleted?', answer: 'Without a dummy node, deleting the head requires updating the `head` variable. With a dummy node, the actual head is just `dummy.next`, making head deletion identical to deleting any middle node.' },
    { id: 'dsa-4-4-q2', question: 'What is the correct sequence of assignments to insert node N between nodes A and B?', hint: 'Which connection must be established first?', answer: '1. N.next = A.next (points N to B). 2. A.next = N (points A to N). Reversing this order overwrites A.next, permanently losing node B.' },
    { id: 'dsa-4-4-q3', question: 'How can you delete the N-th node from the end of a list in a single pass?', hint: 'Use two pointers separated by N steps.', answer: 'Maintain two pointers `fast` and `slow` separated by N steps. Advance both until `fast` reaches the end; `slow` will point directly before the target node to delete.' }
  ],
  quiz: [
    {
      id: 'dsa-4-4-quiz-1',
      question: 'What happens if you execute `prev.next = new_node` BEFORE `new_node.next = prev.next`?',
      options: [
        'You permanently lose access to all remaining nodes after prev in memory',
        'The list reverses',
        'A circular list is created',
        'The code runs normally'
      ],
      correctIndex: 0,
      explanation: 'Overwriting `prev.next` destroys the only reference to the subsequent chain of nodes before the new node is connected to them, causing a memory severance.'
    },
    {
      id: 'dsa-4-4-quiz-2',
      question: 'What is the primary role of a Dummy (Sentinel) node during linked list mutations?',
      options: [
        'To eliminate special-case code when modifying or deleting the head node',
        'To count the total number of nodes',
        'To speed up CPU clock cycles',
        'To reverse the list'
      ],
      correctIndex: 0,
      explanation: 'Placing a dummy node before head ensures every real node in the list (including the head) has a valid predecessor node, unifying deletion logic.'
    },
    {
      id: 'dsa-4-4-quiz-3',
      question: 'When deleting consecutive nodes matching a target value, why should `curr = curr.next` NOT be called in the deletion branch?',
      options: [
        'Because the newly linked next node has not yet been inspected for the target value',
        'Because curr becomes None',
        'Because it causes a compiler error',
        'Because the list length doubles'
      ],
      correctIndex: 0,
      explanation: 'If `curr.next` was bypassed, the new `curr.next` might also hold the target value; advancing `curr` would skip inspecting it.'
    }
  ],
  codingChallenge: {
    title: 'Remove Duplicates from Sorted List',
    problem: 'Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well in O(n) time.',
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def delete_duplicates(head):
    curr = head
    while curr and curr.next:
        if curr.val == curr.next.val:
            curr.next = curr.next.next # Skip duplicate!
        else:
            curr = curr.next
    return head

# Test on 1 -> 1 -> 2 -> 3 -> 3
head = ListNode(1, ListNode(1, ListNode(2, ListNode(3, ListNode(3)))))
head = delete_duplicates(head)
res = []
while head:
    res.append(head.val)
    head = head.next
print("Deduplicated list:", res) # Expected: [1, 2, 3]`,
    solution: `def delete_duplicates(head):
    curr = head
    while curr and curr.next:
        if curr.val == curr.next.val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    return head`,
    hints: [
      'Since the list is already sorted, duplicate values must be adjacent.',
      'If curr.val == curr.next.val, bypass curr.next by setting curr.next = curr.next.next without advancing curr.',
      'Only advance curr when adjacent values are distinct.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Always connect the new node’s outgoing link before breaking existing pointers.',
      'Dummy head sentinels eliminate special cases for head modifications.',
      'Deleting given a predecessor is O(1): `prev.next = prev.next.next`.',
      'Do not advance the cursor when an element has just been deleted.'
    ],
    nextLessonId: 'dsa-ll-reversal',
    nextLessonTitle: 'Linked List Reversal',
    nextLessonModuleId: 'dsa-module-4'
  }
};

// Write out Module 4 partially updated
writeModuleFile(path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-4.ts'), m4.data, m4Lessons);
console.log('Updated Module 4 through Lesson 4. Current count:', Object.keys(m4Lessons).length);
