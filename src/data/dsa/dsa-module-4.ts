import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule4Data: DSAModuleData = {
  "id": "dsa-module-4",
  "number": 4,
  "title": "Linked Lists",
  "subtitle": "Pointer Manipulation, Classic Patterns & Cycle Detection",
  "description": "Understand the linked node model and master pointer manipulation. Implement singly, doubly, and circular linked lists. Learn the fast-slow pointer technique, Floyd cycle detection, list reversal, merging, and finding list intersections.",
  "icon": "Link",
  "badge": "Linked Lists",
  "estimatedHours": 7,
  "topicsCount": 9,
  "lessons": [
    {
      "id": "dsa-ll-singly",
      "moduleId": "dsa-module-4",
      "title": "Singly Linked Lists",
      "description": "Node structure, head pointer, traversal, length, and basic operations from scratch.",
      "order": 1,
      "readTimeMinutes": 20,
      "visualizerType": "linked-list",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-ll-doubly",
      "moduleId": "dsa-module-4",
      "title": "Doubly Linked Lists",
      "description": "Bidirectional pointers, prev/next links, and O(1) deletion with node reference.",
      "order": 2,
      "readTimeMinutes": 20,
      "visualizerType": "linked-list",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-ll-circular",
      "moduleId": "dsa-module-4",
      "title": "Circular Linked Lists",
      "description": "Connecting tail to head, circular traversal, and Josephus problem applications.",
      "order": 3,
      "readTimeMinutes": 18,
      "visualizerType": "linked-list",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-ll-insert-delete",
      "moduleId": "dsa-module-4",
      "title": "Insertion and Deletion",
      "description": "Inserting at head/tail/position and deleting by value or position with pointer rewiring.",
      "order": 4,
      "readTimeMinutes": 22,
      "visualizerType": "linked-list",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-ll-reversal",
      "moduleId": "dsa-module-4",
      "title": "Linked List Reversal",
      "description": "Iterative three-pointer reversal, recursive reversal, and reversing sublists.",
      "order": 5,
      "readTimeMinutes": 25,
      "visualizerType": "linked-list",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-ll-fast-slow",
      "moduleId": "dsa-module-4",
      "title": "Fast and Slow Pointer Technique",
      "description": "Using two pointers at different speeds to find midpoints, kth-from-end, and more.",
      "order": 6,
      "readTimeMinutes": 22,
      "visualizerType": "linked-list",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-ll-cycle-detection",
      "moduleId": "dsa-module-4",
      "title": "Floyd's Cycle Detection Algorithm",
      "description": "Mathematical proof of Floyd's tortoise-and-hare algorithm and finding the cycle start node.",
      "order": 7,
      "readTimeMinutes": 28,
      "visualizerType": "linked-list",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-ll-merge-sorted",
      "moduleId": "dsa-module-4",
      "title": "Merging Sorted Linked Lists",
      "description": "Merging two and k sorted linked lists using dummy head technique and priority queue.",
      "order": 8,
      "readTimeMinutes": 25,
      "visualizerType": "linked-list",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-ll-middle-intersection",
      "moduleId": "dsa-module-4",
      "title": "Finding Middle and List Intersection",
      "description": "Middle node with slow/fast pointers and intersection of two linked lists by length equalization.",
      "order": 9,
      "readTimeMinutes": 22,
      "visualizerType": "linked-list",
      "difficulty": "Intermediate"
    }
  ]
};

export const dsaModule4Lessons: Record<string, DSALessonContent> = {
  "dsa-ll-reversal": {
    "id": "dsa-ll-reversal",
    "moduleId": "dsa-module-4",
    "title": "Linked List Reversal",
    "subtitle": "Mastering In-Place Three-Pointer Pointer Manipulation in O(n) Time and O(1) Space",
    "order": 5,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "linked-list",
    "objectives": [
      "Master the standard iterative 3-pointer pattern: prev, curr, and next_node.",
      "Understand how pointer overwrites cause irreversible memory loss if next is not cached.",
      "Implement in-place reversal with strict O(1) auxiliary space without creating new nodes.",
      "Implement recursive reversal by reversing the tail and rewiring back links.",
      "Adapt full reversal to reverse bounded sublists [left, right] within a list."
    ],
    "prerequisites": [
      "Singly linked list node representation: Node(val, next)",
      "Basic pointer manipulation and while loop traversal"
    ],
    "analogy": {
      "title": "The Line of People with Blind Hands",
      "text": "Picture a conga line where each person places their hands firmly on the shoulders of the person ahead of them. Person 1 holds Person 2, Person 2 holds Person 3, and Person 3 holds Person 4. To reverse the direction of the line so that Person 4 is the new leader, each person must turn around and place their hands on the person behind them. However, if Person 2 simply lets go of Person 3 before finding Person 1, the entire rest of the line is permanently severed and lost into the fog! Therefore, before letting go of Person 3, Person 2 must remember where Person 3 is, grab Person 1, and only then shift focus.",
      "metaphor": "Reversing a linked list is directional link inversion: at every step, cache the forward node before reversing the current link backward."
    },
    "problemSolved": {
      "title": "In-Place Sequence Inversion Without Memory Duplication",
      "description": "Reversing an array is easy with two pointers swapping values. But in a singly linked list, nodes do not support backwards indexing. Naively copying values into a new array wastes O(n) auxiliary memory. Pointer reversal inverts every arrow in-place in a single linear pass.",
      "keyPoints": [
        "Zero extra allocations: modifies existing .next pointers in memory",
        "Operates in optimal O(n) time and O(1) space",
        "Foundational building block for Palindrome Linked List checks and LRU caches"
      ]
    },
    "intuition": {
      "overview": "We maintain three sliding pointers: prev (starts at None), curr (starts at head), and next_node (caches the forward reference).",
      "steps": [
        {
          "step": 1,
          "title": "Cache the Forward Link",
          "description": "Save next_node = curr.next before mutating anything, preventing loss of the remaining list."
        },
        {
          "step": 2,
          "title": "Reverse the Current Link",
          "description": "Point curr.next = prev, flipping the arrow backward."
        },
        {
          "step": 3,
          "title": "Advance prev Pointer",
          "description": "Move prev = curr to become the new reversed prefix head."
        },
        {
          "step": 4,
          "title": "Advance curr Pointer",
          "description": "Move curr = next_node to step forward to the unreversed remainder."
        }
      ]
    },
    "formalDefinition": {
      "text": "Given the head of a singly linked list L = (v_1 -> v_2 -> ... -> v_n -> null), reverse the links such that L_rev = (v_n -> v_{n-1} -> ... -> v_1 -> null) and return the new head v_n.",
      "latex": "L_{rev} = \\text{invert}(L) \\quad \\text{where } \\forall i \\in [1, n-1], \\; v_{i+1}.\\text{next} = v_i"
    },
    "complexity": {
      "overview": "Iterative reversal visits every node exactly once and performs a constant number of pointer updates per node.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "When the list is empty (head is None) or contains only 1 node."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Visits each of the n nodes in a single forward pass."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "For any list of n nodes, exactly n iterations are executed."
        }
      ],
      "spaceNote": "Iterative reversal uses strictly O(1) memory. Recursive reversal uses O(n) call stack frames."
    },
    "workedExample": {
      "title": "Reversing 1 -> 2 -> 3 -> null",
      "input": "head = [1 -> 2 -> 3 -> null]",
      "steps": [
        {
          "step": 1,
          "action": "Initialize",
          "state": "prev = null, curr = 1",
          "explanation": "Set up initial pointer state."
        },
        {
          "step": 2,
          "action": "Reverse Node 1",
          "state": "next = 2; 1.next = null; prev = 1; curr = 2",
          "explanation": "Node 1 points to null (becomes new tail). prev advances to 1."
        },
        {
          "step": 3,
          "action": "Reverse Node 2",
          "state": "next = 3; 2.next = 1; prev = 2; curr = 3",
          "explanation": "Node 2 points backward to 1. prev advances to 2."
        },
        {
          "step": 4,
          "action": "Reverse Node 3",
          "state": "next = null; 3.next = 2; prev = 3; curr = null",
          "explanation": "Node 3 points backward to 2. prev advances to 3. curr reaches null."
        }
      ],
      "finalOutput": "prev = [3 -> 2 -> 1 -> null]"
    },
    "visualExplanation": {
      "title": "Pointer Inversion Step-by-Step",
      "description": "The interactive visualizer displays the node chain, highlighting curr, prev, and next pointers during each transition.",
      "features": [
        "Green highlight indicates the active node being rewired.",
        "Arrow reversal highlights pointer direction inversion in real-time.",
        "Final state highlights the new head pointer returning to the caller."
      ]
    },
    "pseudocode": {
      "title": "Iterative In-Place Reversal",
      "code": "function reverse_list(head):\n    prev = null\n    curr = head\n    while curr is not null:\n        next_node = curr.next    // 1. Cache forward pointer\n        curr.next = prev         // 2. Reverse arrow\n        prev = curr              // 3. Move prev forward\n        curr = next_node         // 4. Move curr forward\n    return prev                  // prev is new head"
    },
    "pythonCode": {
      "title": "Iterative and Recursive Reversal in Python",
      "code": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_iterative(head: ListNode) -> ListNode:\n    prev = None\n    curr = head\n    while curr:\n        next_temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_temp\n    return prev\n\ndef reverse_recursive(head: ListNode) -> ListNode:\n    if not head or not head.next:\n        return head\n    new_head = reverse_recursive(head.next)\n    head.next.next = head\n    head.next = None\n    return new_head",
      "explanation": "Notice how the recursive version rewires head.next.next = head on the unwinding phase, then severs head.next = None."
    },
    "runnableCode": {
      "code": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef to_list(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\n# Build list: 1 -> 2 -> 3 -> 4\nhead = ListNode(1, ListNode(2, ListNode(3, ListNode(4))))\nprint(\"Original:\", to_list(head))\n\n# Reverse in-place\nprev = None\ncurr = head\nwhile curr:\n    nxt = curr.next\n    curr.next = prev\n    prev = curr\n    curr = nxt\n\nprint(\"Reversed:\", to_list(prev))",
      "expectedOutput": "Original: [1, 2, 3, 4]\nReversed: [4, 3, 2, 1]"
    },
    "lineByLineExplanation": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "prev = None; curr = head",
        "codeSnippet": "prev = None; curr = head",
        "explanation": "Initializes prev to None (the tail of the reversed list will point to None) and curr to the first node."
      },
      {
        "line": "4-5",
        "lines": "4-5",
        "code": "next_temp = curr.next; curr.next = prev",
        "codeSnippet": "next_temp = curr.next; curr.next = prev",
        "explanation": "Saves reference to next node to prevent losing the chain, then points the current node backward to prev."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "prev = curr; curr = next_temp",
        "codeSnippet": "prev = curr; curr = next_temp",
        "explanation": "Shifts both pointers one step to the right for the next iteration."
      }
    ],
    "edgeCases": [
      {
        "case": "Empty list (head is None)",
        "handling": "The while loop condition (curr is None) immediately fails, correctly returning prev (None).",
        "example": "reverse_list(None) -> None"
      },
      {
        "case": "Single-node list",
        "handling": "Loop runs once: 1.next becomes None, prev becomes 1, returns 1 without modification.",
        "example": "reverse_list(Node(1)) -> Node(1)"
      },
      {
        "case": "Two-node list",
        "handling": "Loop runs twice: properly inverts 1 -> 2 into 2 -> 1.",
        "example": "reverse_list(1 -> 2) -> 2 -> 1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Overwriting curr.next before saving next_temp",
        "solution": "Always write \"next_temp = curr.next\" BEFORE \"curr.next = prev\". Otherwise you lose access to the rest of the list.",
        "codeExample": "curr.next = prev # BUG: next nodes are permanently lost!"
      },
      {
        "mistake": "Returning curr instead of prev at the end",
        "solution": "When the while loop terminates, curr is None. The new head of the reversed list is held by prev."
      }
    ],
    "applications": [
      {
        "industry": "Undo/Redo Systems",
        "application": "History Journal Reversal",
        "benefit": "Inverting action logs and rollback transactions in databases."
      },
      {
        "industry": "Data Structures",
        "application": "Palindrome Verification",
        "benefit": "Reversing the second half of a linked list to compare values with the first half in O(n) time and O(1) space."
      },
      {
        "industry": "Memory Management",
        "application": "Free-List Reorganization",
        "benefit": "Rearranging allocator free memory block chains for cache locality."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-ll-rev-q1",
        "question": "Why does iterative reversal use O(1) space while recursive reversal uses O(n) space?",
        "hint": "Consider the memory used by function stack frames.",
        "answer": "Iterative reversal uses only 3 pointer variables (prev, curr, next_temp) regardless of list size. Recursive reversal places each function call frame onto the call stack, consuming O(n) memory frames before unwinding."
      },
      {
        "id": "dsa-ll-rev-q2",
        "question": "What pointer holds the new head when iterative reversal completes?",
        "hint": "Check what curr and prev point to when the while loop terminates.",
        "answer": "\"prev\" holds the new head. When the while loop finishes, curr has reached None (one past the end of the original list), so prev points to the final valid node, which is the new head."
      },
      {
        "id": "dsa-ll-rev-q3",
        "question": "How can linked list reversal be used to check if a linked list is a palindrome in O(1) auxiliary space?",
        "hint": "Use fast and slow pointers first to find the middle.",
        "answer": "Use fast/slow pointers to find the middle node, reverse the second half of the list in-place, compare nodes from head and the reversed second half node-by-node, and optionally reverse the second half back to restore original state."
      }
    ],
    "quiz": [
      {
        "id": "dsa-ll-rev-quiz-1",
        "question": "What is the correct order of pointer updates inside the iterative reversal loop?",
        "options": [
          "curr.next = prev; next = curr.next; prev = curr; curr = next;",
          "next = curr.next; curr.next = prev; prev = curr; curr = next;",
          "prev = curr; curr = curr.next; curr.next = prev;",
          "next = curr.next; prev = curr; curr.next = prev; curr = next;"
        ],
        "correctIndex": 1,
        "explanation": "You must first save next = curr.next, rewire curr.next = prev, slide prev forward to curr, and slide curr forward to next."
      },
      {
        "id": "dsa-ll-rev-quiz-2",
        "question": "What is returned by reversing a single-node list [1 -> null]?",
        "options": [
          "null",
          "[1 -> null]",
          "Throws AttributeError",
          "[1 -> 1 -> null]"
        ],
        "correctIndex": 1,
        "explanation": "For a single node, the loop runs once: 1.next becomes null, prev becomes 1, and prev is returned, yielding [1 -> null]."
      },
      {
        "id": "dsa-ll-rev-quiz-3",
        "question": "What is the time and space complexity of in-place iterative reversal of a linked list of length n?",
        "options": [
          "Time: O(n log n), Space: O(1)",
          "Time: O(n), Space: O(n)",
          "Time: O(n), Space: O(1)",
          "Time: O(1), Space: O(1)"
        ],
        "correctIndex": 2,
        "explanation": "Iterative reversal touches each node once (O(n) time) and only uses 3 pointer references without additional memory allocation (O(1) space)."
      }
    ],
    "codingChallenge": {
      "title": "Reverse Linked List Between Left and Right",
      "problem": "Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list. Positions are 1-indexed.",
      "hints": [
        "Use a dummy node before head so that reversing from position 1 does not require special-case handling.",
        "Advance a pointer prev to position left - 1.",
        "Use the link-relinking trick: repeatedly move curr.next to become prev.next."
      ],
      "starterCode": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_between(head, left, right):\n    # Your code here\n    return head",
      "solution": "def reverse_between(head, left, right):\n    if not head or left == right:\n        return head\n    \n    dummy = ListNode(0, head)\n    prev = dummy\n    \n    # 1. Advance prev to node before position 'left'\n    for _ in range(left - 1):\n        prev = prev.next\n        \n    curr = prev.next\n    # 2. Reverse sublist by repeatedly moving curr.next to front of sublist\n    for _ in range(right - left):\n        temp = curr.next\n        curr.next = temp.next\n        temp.next = prev.next\n        prev.next = temp\n        \n    return dummy.next"
    },
    "summary": {
      "keyTakeaways": [
        "In-place reversal operates in O(n) time and O(1) space.",
        "Always cache curr.next before modifying curr.next to avoid dropping references.",
        "When loop terminates, prev holds the new head pointer.",
        "Dummy node pattern simplifies edge cases when modifying the head node."
      ],
      "nextLessonId": "dsa-ll-fast-slow",
      "nextLessonTitle": "Fast and Slow Pointer Technique",
      "nextLessonModuleId": "dsa-module-4"
    },
    "lineByLine": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "prev = None; curr = head",
        "codeSnippet": "prev = None; curr = head",
        "explanation": "Initializes prev to None (the tail of the reversed list will point to None) and curr to the first node."
      },
      {
        "line": "4-5",
        "lines": "4-5",
        "code": "next_temp = curr.next; curr.next = prev",
        "codeSnippet": "next_temp = curr.next; curr.next = prev",
        "explanation": "Saves reference to next node to prevent losing the chain, then points the current node backward to prev."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "prev = curr; curr = next_temp",
        "codeSnippet": "prev = curr; curr = next_temp",
        "explanation": "Shifts both pointers one step to the right for the next iteration."
      }
    ]
  },
  "dsa-ll-singly": {
    "id": "dsa-ll-singly",
    "moduleId": "dsa-module-4",
    "title": "Singly Linked Lists",
    "subtitle": "Node Structure, Heap References, Sequential Traversal & Basic Operations",
    "order": 1,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "linked-list",
    "objectives": [
      "Define the fundamental ListNode memory model (value payload + next pointer).",
      "Contrast linked node heap allocation with contiguous array buffers.",
      "Traverse a singly linked list iteratively and calculate its length in O(n) time.",
      "Implement insertion and deletion at the head in strict O(1) time."
    ],
    "prerequisites": [
      "Array Operations and Memory Layout",
      "Object-oriented class references and pointers"
    ],
    "analogy": {
      "title": "The Scavenger Hunt Clue Trail",
      "text": "A scavenger hunt doesn’t give you a master list of all 10 prize coordinates at once. Instead, Clue #1 is at the fountain; when you reach the fountain, inside the envelope is the location of Clue #2 (the library). When you reach the library, inside is the location of Clue #3 (the clock tower). You cannot jump directly to Clue #7 without visiting Clues 1 through 6 first because each clue only knows the address of the very next clue.",
      "metaphor": "A singly linked list is a chain of pointer clues where each node references solely its direct successor."
    },
    "problemSolved": {
      "title": "Dynamic Non-Contiguous Memory Allocation",
      "description": "Arrays require a contiguous chunk of memory; allocating a huge array fails if memory is fragmented into smaller pockets. Linked lists allow elements to reside at arbitrary, non-contiguous heap addresses, growing and shrinking dynamically with zero memory reallocation or copying.",
      "keyPoints": [
        "Eliminates array capacity limits and geometric resizing copies",
        "Instantaneous O(1) insertion and deletion at the head pointer",
        "Sacrifices O(1) random access: must traverse nodes sequentially in O(n)"
      ]
    },
    "intuition": {
      "overview": "Each node is an independent heap object holding `val` and `next`. The list is accessed via a single `head` pointer pointing to the first node.",
      "steps": [
        {
          "step": 1,
          "title": "Node Definition",
          "description": "class ListNode: def __init__(self, val=0, next=None): self.val = val; self.next = next"
        },
        {
          "step": 2,
          "title": "Traversal Loop",
          "description": "curr = head; while curr: process(curr.val); curr = curr.next"
        },
        {
          "step": 3,
          "title": "Termination",
          "description": "Stops when curr is None (the tail node points to None)."
        }
      ]
    },
    "formalDefinition": {
      "text": "A Singly Linked List L is a linear collection of data elements called nodes. Each node N_i consists of a datum v_i and a successor reference next: N_i -> N_{i+1}, terminating at N_{k-1}.next = NULL.",
      "latex": "L = \\langle N_0, N_1, \\dots, N_{k-1} \\rangle, \\quad N_i.\\text{next} = N_{i+1}, \\quad N_{k-1}.\\text{next} = \\emptyset"
    },
    "complexity": {
      "overview": "Prepend (Insert Head): O(1). Delete Head: O(1). Append (with tail): O(1). Access by index: O(n). Search: O(n).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Head insertion or head deletion."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Accessing or searching for element at index n/2."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Accessing the last node or searching for absent value."
        }
      ],
      "spaceNote": "Each node carries extra memory overhead for the next pointer reference (8 bytes on 64-bit architecture)."
    },
    "workedExample": {
      "title": "Prepending 5 to Linked List [10 -> 20 -> 30]",
      "input": "Head -> [10] -> [20] -> [30] -> None. Prepend val = 5.",
      "steps": [
        {
          "step": 1,
          "action": "Create New Node",
          "state": "new_node = ListNode(5)",
          "explanation": "Allocates new node with next = None."
        },
        {
          "step": 2,
          "action": "Rewire Pointer",
          "state": "new_node.next = head",
          "explanation": "new_node now points to [10]."
        },
        {
          "step": 3,
          "action": "Update Head",
          "state": "head = new_node",
          "explanation": "Head now points to [5]."
        }
      ],
      "finalOutput": "Head -> [5] -> [10] -> [20] -> [30] -> None in O(1) time."
    },
    "visualExplanation": {
      "title": "Heap Node Boxes and Arrows",
      "description": "Rectangular boxes scattered across heap memory. Arrows represent memory pointers. Traversal moves the curr cursor box by box along the arrows until hitting the null terminator.",
      "features": [
        "Head pointer anchor",
        "Pointer dereference hops",
        "Null terminator sentinel"
      ]
    },
    "pseudocode": {
      "title": "Singly Linked List Class",
      "code": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef print_list(head):\n    curr = head\n    while curr is not None:\n        print(curr.val)\n        curr = curr.next"
    },
    "pythonCode": {
      "title": "Singly Linked List Implementation in Python",
      "code": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass SinglyLinkedList:\n    def __init__(self):\n        self.head = None\n\n    def prepend(self, val):\n        new_node = ListNode(val, self.head)\n        self.head = new_node\n\n    def append(self, val):\n        new_node = ListNode(val)\n        if not self.head:\n            self.head = new_node\n            return\n        curr = self.head\n        while curr.next:\n            curr = curr.next\n        curr.next = new_node\n\n    def to_list(self):\n        res = []\n        curr = self.head\n        while curr:\n            res.append(curr.val)\n            curr = curr.next\n        return res\n\nsll = SinglyLinkedList()\nsll.append(10)\nsll.append(20)\nsll.prepend(5)\nprint(\"Linked list elements:\", sll.to_list()) # [5, 10, 20]",
      "explanation": "Demonstrates ListNode creation, O(1) prepend, and O(n) traversal."
    },
    "runnableCode": {
      "code": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\n# Build 1 -> 2 -> 3\nhead = Node(1, Node(2, Node(3)))\n\ndef get_length(node):\n    count = 0\n    while node:\n        count += 1\n        node = node.next\n    return count\n\nprint(\"Length of list 1->2->3:\", get_length(head))",
      "expectedOutput": "Length of list 1->2->3: 3"
    },
    "lineByLineExplanation": [
      {
        "line": "7-12",
        "lines": "7-12",
        "code": "def get_length(node):\n    count = 0\n    while node:\n        count += 1\n        node = node.next",
        "codeSnippet": "def get_length(node):\n    count = 0\n    while node:\n        count += 1\n        node = node.next",
        "explanation": "Counts nodes iteratively by following next pointers until None."
      }
    ],
    "edgeCases": [
      {
        "case": "Empty list (head is None)",
        "handling": "Loops do not execute; return 0 or None immediately.",
        "example": "head = None"
      },
      {
        "case": "Single node list",
        "handling": "Traverses exactly 1 step; node.next is None.",
        "example": "head = Node(42)"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Losing the head pointer reference.",
        "solution": "Always use a temporary cursor variable `curr = head` to traverse; never do `head = head.next` unless deliberately deleting the head."
      },
      {
        "mistake": "Dereferencing None.next.",
        "solution": "Always verify `while curr is not None:` before accessing `curr.next`."
      }
    ],
    "applications": [
      {
        "industry": "Operating Systems",
        "application": "Free Memory Block Lists",
        "benefit": "Allocators track unallocated heap segments in linked lists of variable block sizes."
      },
      {
        "industry": "Data Structures",
        "application": "Hash Table Separate Chaining",
        "benefit": "Each bucket in a hash table chains colliding elements in a singly linked list."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-4-1-q1",
        "question": "What is the time complexity to insert an element at the beginning versus the end of a singly linked list without a tail pointer?",
        "hint": "Do you need to traverse the list?",
        "answer": "Beginning: O(1) by updating head. End: O(n) because you must traverse from head to the final node to update tail.next."
      },
      {
        "id": "dsa-4-1-q2",
        "question": "Why does an array use less memory than a linked list with the same number of integers?",
        "hint": "Consider pointer storage overhead.",
        "answer": "An array stores only the raw integer bytes contiguously. A linked list stores the integer PLUS an 8-byte pointer address in every single node."
      },
      {
        "id": "dsa-4-1-q3",
        "question": "What happens if you execute `head = head.next` when head is not None?",
        "hint": "What happens to the first node in memory?",
        "answer": "The first node is detached from the list. In Python, its reference count drops to zero and it is reclaimed by the garbage collector (O(1) head deletion)."
      }
    ],
    "quiz": [
      {
        "id": "dsa-4-1-quiz-1",
        "question": "What is the time complexity to access the element at index k in a singly linked list?",
        "options": [
          "O(k)",
          "O(1)",
          "O(log k)",
          "O(n^2)"
        ],
        "correctIndex": 0,
        "explanation": "Linked lists do not support random arithmetic indexing; you must traverse k pointers from the head, taking O(k) steps."
      },
      {
        "id": "dsa-4-1-quiz-2",
        "question": "What is the primary advantage of a linked list over a dynamic array?",
        "options": [
          "O(1) worst-case insertion at the head without memory reallocations or element shifts",
          "Faster random access",
          "Lower memory usage",
          "Better CPU cache locality"
        ],
        "correctIndex": 0,
        "explanation": "Linked lists can insert a node at the head in constant O(1) time by rewiring two pointers, requiring zero shifting or capacity doubling."
      },
      {
        "id": "dsa-4-1-quiz-3",
        "question": "In a singly linked list, what does the `next` pointer of the final tail node point to?",
        "options": [
          "None (or NULL)",
          "The head node",
          "Itself",
          "Zero"
        ],
        "correctIndex": 0,
        "explanation": "In a standard singly linked list, the final node terminates with next = None, signaling the end of the sequence."
      }
    ],
    "codingChallenge": {
      "title": "Delete Node in a Linked List (Given Only That Node)",
      "problem": "Write a function to delete a node in a singly-linked list. You will not be given access to the head of the list, only to the node to be deleted directly. It is guaranteed that the node to be deleted is not a tail node.",
      "hints": [
        "Since you cannot access the previous node to rewire its pointer, copy the next node value into the current node.",
        "Then delete the next node by setting `node.next = node.next.next`."
      ],
      "starterCode": "class ListNode:\n    def __init__(self, x):\n        self.val = x\n        self.next = None\n\ndef delete_node(node):\n    # Overwrite current node value with next node value, then bypass next node!\n    node.val = node.next.val\n    node.next = node.next.next\n\n# Build: 4 -> 5 -> 1 -> 9, delete node 5\nhead = ListNode(4)\nnode5 = ListNode(5)\nhead.next = node5\nnode1 = ListNode(1)\nnode5.next = node1\nnode1.next = ListNode(9)\n\ndelete_node(node5)\n\n# Verify: 4 -> 1 -> 9\nres = []\ncurr = head\nwhile curr:\n    res.append(curr.val)\n    curr = curr.next\nprint(\"Result after deleting 5:\", res) # Expected: [4, 1, 9]",
      "solution": "def delete_node(node):\n    node.val = node.next.val\n    node.next = node.next.next"
    },
    "summary": {
      "keyTakeaways": [
        "Singly linked lists store elements as independent heap nodes connected by pointers.",
        "Head operations (insert/delete) are strictly O(1).",
        "Element retrieval is O(n) sequential traversal.",
        "Extra memory overhead exists for pointer storage in every node."
      ],
      "nextLessonId": "dsa-ll-doubly",
      "nextLessonTitle": "Doubly Linked Lists",
      "nextLessonModuleId": "dsa-module-4"
    },
    "lineByLine": [
      {
        "line": "7-12",
        "lines": "7-12",
        "code": "def get_length(node):\n    count = 0\n    while node:\n        count += 1\n        node = node.next",
        "codeSnippet": "def get_length(node):\n    count = 0\n    while node:\n        count += 1\n        node = node.next",
        "explanation": "Counts nodes iteratively by following next pointers until None."
      }
    ]
  },
  "dsa-ll-doubly": {
    "id": "dsa-ll-doubly",
    "moduleId": "dsa-module-4",
    "title": "Doubly Linked Lists",
    "subtitle": "Bidirectional Pointers, Prev/Next Invariants & O(1) Arbitrary Deletion",
    "order": 2,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "linked-list",
    "objectives": [
      "Define the DoublyLinkedList node structure with `prev` and `next` pointers.",
      "Execute bidirectional traversals (forward from head, backward from tail).",
      "Perform O(1) node deletion given a direct reference to that node.",
      "Implement Sentinel (Dummy Head & Tail) nodes to eliminate null boundary checks."
    ],
    "prerequisites": [
      "Singly Linked Lists",
      "Pointer rewiring mechanics"
    ],
    "analogy": {
      "title": "The Two-Way Subway Track",
      "text": "A one-way subway tunnel only lets trains move forward; if a train wants to back up by one station, it must loop all the way through the city to return. A two-way subway track has rails in both directions. Any train at Station #5 can step forward to Station #6 or step backward to Station #4 in 1 second. Each station maintains physical track switches pointing both upstream and downstream.",
      "metaphor": "Doubly linked lists store pointers in both directions, enabling O(1) backward and forward stepping."
    },
    "problemSolved": {
      "title": "Enabling O(1) Arbitrary Deletion and LRU Caches",
      "description": "In a singly linked list, deleting a given node requires finding its previous predecessor node in O(n) time. In a doubly linked list, the node already knows its predecessor via `node.prev`, allowing instant O(1) removal. This is the cornerstone of LRU Caches.",
      "keyPoints": [
        "O(1) deletion of any node given its reference pointer",
        "Bidirectional iteration from both head and tail",
        "Sentinel nodes (dummy head and tail) completely eliminate boundary edge cases"
      ]
    },
    "intuition": {
      "overview": "To delete node X: set `X.prev.next = X.next` and `X.next.prev = X.prev`. Node X is instantly unlinked from the chain.",
      "steps": [
        {
          "step": 1,
          "title": "Left Bridge",
          "description": "node.prev.next = node.next."
        },
        {
          "step": 2,
          "title": "Right Bridge",
          "description": "node.next.prev = node.prev."
        },
        {
          "step": 3,
          "title": "Node Isolation",
          "description": "node.prev = node.next = None."
        }
      ]
    },
    "formalDefinition": {
      "text": "A Doubly Linked List node N contains value v, a forward pointer next, and a backward pointer prev such that N.next.prev = N and N.prev.next = N for all internal nodes.",
      "latex": "N_i.\\text{next}.\\text{prev} = N_i \\quad \\land \\quad N_i.\\text{prev}.\\text{next} = N_i"
    },
    "complexity": {
      "overview": "Insert/Delete at Head or Tail: O(1). Delete given node reference: O(1). Access by index: O(n).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Insertion or deletion at head, tail, or known node pointer."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Search by value requires linear traversal."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Traversing full length."
        }
      ],
      "spaceNote": "Requires 2 pointer addresses per node (16 bytes on 64-bit platforms), doubling pointer overhead."
    },
    "workedExample": {
      "title": "Removing Node [B] from [A <-> B <-> C]",
      "input": "Chain: A <-> B <-> C. Target: Delete B.",
      "steps": [
        {
          "step": 1,
          "action": "Rewire A.next",
          "state": "A.next = B.next (C)",
          "explanation": "A now points forward directly to C."
        },
        {
          "step": 2,
          "action": "Rewire C.prev",
          "state": "C.prev = B.prev (A)",
          "explanation": "C now points backward directly to A."
        },
        {
          "step": 3,
          "action": "Clean B",
          "state": "B.next = B.prev = None",
          "explanation": "B is detached."
        }
      ],
      "finalOutput": "Chain transformed to [A <-> C] in O(1) operations."
    },
    "visualExplanation": {
      "title": "Double-Arrow Bridges",
      "description": "Each node has a rightward green arrow (next) and a leftward blue arrow (prev). Deletion bypasses the middle node by connecting the green arrow from the left neighbor directly to the right neighbor, and the blue arrow from the right neighbor directly to the left neighbor.",
      "features": [
        "Reciprocal pointer pairs",
        "Sentinel dummy head & tail",
        "O(1) detachment"
      ]
    },
    "pseudocode": {
      "title": "Doubly Linked List Deletion",
      "code": "def remove_node(node):\n    prev_node = node.prev\n    next_node = node.next\n    prev_node.next = next_node\n    next_node.prev = prev_node\n    node.prev = None\n    node.next = None"
    },
    "pythonCode": {
      "title": "Doubly Linked List with Sentinels in Python",
      "code": "class DNode:\n    def __init__(self, val=0, prev=None, next=None):\n        self.val = val\n        self.prev = prev\n        self.next = next\n\nclass DoublyLinkedList:\n    def __init__(self):\n        # Dummy head and tail eliminate None checks\n        self.head = DNode()\n        self.tail = DNode()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    def add_first(self, val):\n        new_node = DNode(val, self.head, self.head.next)\n        self.head.next.prev = new_node\n        self.head.next = new_node\n        return new_node\n\n    def remove(self, node):\n        node.prev.next = node.next\n        node.next.prev = node.prev\n\n    def to_list(self):\n        res = []\n        curr = self.head.next\n        while curr != self.tail:\n            res.append(curr.val)\n            curr = curr.next\n        return res\n\ndll = DoublyLinkedList()\nn1 = dll.add_first(10)\nn2 = dll.add_first(20)\ndll.add_first(30) # List is [30, 20, 10]\nprint(\"Before removal:\", dll.to_list())\ndll.remove(n2) # Remove 20 in O(1)\nprint(\"After removing 20:\", dll.to_list())",
      "explanation": "Uses sentinel nodes to perform O(1) insertions and deletions with zero null pointer checks."
    },
    "runnableCode": {
      "code": "class DNode:\n    def __init__(self, val):\n        self.val = val\n        self.prev = None\n        self.next = None\n\na, b, c = DNode(\"A\"), DNode(\"B\"), DNode(\"C\")\na.next = b; b.prev = a\nb.next = c; c.prev = b\n\n# Delete b in O(1)\nb.prev.next = b.next\nb.next.prev = b.prev\n\n# Print forward from a\nres = []\ncurr = a\nwhile curr:\n    res.append(curr.val)\n    curr = curr.next\nprint(\"Result after removing B in O(1):\", \" <-> \".join(res))",
      "expectedOutput": "Result after removing B in O(1): A <-> C"
    },
    "lineByLineExplanation": [
      {
        "line": "11-12",
        "lines": "11-12",
        "code": "b.prev.next = b.next\nb.next.prev = b.prev",
        "codeSnippet": "b.prev.next = b.next\nb.next.prev = b.prev",
        "explanation": "Bypasses node b from both directions in exactly 2 pointer assignments."
      }
    ],
    "edgeCases": [
      {
        "case": "Deleting Head or Tail without Sentinels",
        "handling": "Requires special-case updating of head or tail references.",
        "example": "node == head"
      },
      {
        "case": "List with 0 or 1 elements",
        "handling": "Handled automatically when dummy sentinels are used.",
        "example": "head.next == tail"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to update both `next` and `prev` pointers.",
        "solution": "Must always update the pair: left.next = right AND right.prev = left."
      },
      {
        "mistake": "Losing pointer reference order during insertion.",
        "solution": "Always set the new node pointers first before re-wiring existing neighboring pointers."
      }
    ],
    "applications": [
      {
        "industry": "Caching Systems",
        "application": "LRU (Least Recently Used) Cache",
        "benefit": "Combines Hash Map with Doubly Linked List to achieve O(1) get and O(1) put with least-recently-used eviction."
      },
      {
        "industry": "Web Browsers",
        "application": "History Back / Forward Navigation",
        "benefit": "Traverses visited web pages bidirectionally in O(1) time."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-4-2-q1",
        "question": "Why does an LRU Cache use a Doubly Linked List instead of a Singly Linked List?",
        "hint": "When a key is accessed, it must be moved to the front.",
        "answer": "Moving an accessed node to the front requires removing it from its current position in O(1) time. A doubly linked list allows O(1) detachment because it has direct access to node.prev."
      },
      {
        "id": "dsa-4-2-q2",
        "question": "What is the purpose of Sentinel (Dummy) nodes in a Doubly Linked List?",
        "hint": "Do you ever have to check `if head is None`?",
        "answer": "Sentinel nodes (dummy head and dummy tail) eliminate all edge cases for empty lists, single-element lists, and boundary insertions, allowing identical pointer rewiring code for all operations."
      },
      {
        "id": "dsa-4-2-q3",
        "question": "How can you optimize index access in a doubly linked list if the list tracks its size n?",
        "hint": "Should you start from head or tail?",
        "answer": "If index < n/2, traverse forward from head; if index >= n/2, traverse backward from tail. This cuts average search traversal steps in half to n/4."
      }
    ],
    "quiz": [
      {
        "id": "dsa-4-2-quiz-1",
        "question": "What is the time complexity to delete a node in a doubly linked list given a direct reference to that node?",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(n^2)"
        ],
        "correctIndex": 0,
        "explanation": "Because the node has direct access to node.prev and node.next, it can rewire both adjacent pointers in constant O(1) time without searching."
      },
      {
        "id": "dsa-4-2-quiz-2",
        "question": "How many pointer references are stored in each node of a doubly linked list?",
        "options": [
          "2 (prev and next)",
          "1 (next only)",
          "4",
          "Depends on list size"
        ],
        "correctIndex": 0,
        "explanation": "Each node stores two pointers: one forward to the next node and one backward to the previous node."
      },
      {
        "id": "dsa-4-2-quiz-3",
        "question": "Which popular data structure directly pairs a Hash Map with a Doubly Linked List?",
        "options": [
          "LRU Cache",
          "Binary Search Tree",
          "Trie",
          "Heap"
        ],
        "correctIndex": 0,
        "explanation": "An LRU Cache uses a Hash Map for O(1) key lookups and a Doubly Linked List for O(1) eviction and reordering of nodes."
      }
    ],
    "codingChallenge": {
      "title": "LRU Cache Design",
      "problem": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) both executing in O(1) average time complexity.",
      "hints": [
        "Maintain a dictionary mapping key -> DNode.",
        "Maintain a Doubly Linked List with dummy head and tail where head.next is most recently used and tail.prev is least recently used.",
        "On get or put of existing key, detach node and move to head. On capacity overflow, evict tail.prev."
      ],
      "starterCode": "class DNode:\n    def __init__(self, key=0, val=0):\n        self.key = key\n        self.val = val\n        self.prev = None\n        self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.map = {}\n        self.head = DNode()\n        self.tail = DNode()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    def _remove(self, node):\n        node.prev.next = node.next\n        node.next.prev = node.prev\n\n    def _add_front(self, node):\n        node.next = self.head.next\n        node.prev = self.head\n        self.head.next.prev = node\n        self.head.next = node\n\n    def get(self, key: int) -> int:\n        if key in self.map:\n            node = self.map[key]\n            self._remove(node)\n            self._add_front(node)\n            return node.val\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.map:\n            self._remove(self.map[key])\n        node = DNode(key, value)\n        self.map[key] = node\n        self._add_front(node)\n        if len(self.map) > self.cap:\n            lru = self.tail.prev\n            self._remove(lru)\n            del self.map[lru.key]\n\nlru = LRUCache(2)\nlru.put(1, 1)\nlru.put(2, 2)\nprint(\"Get 1:\", lru.get(1)) # returns 1\nlru.put(3, 3)               # evicts key 2\nprint(\"Get 2:\", lru.get(2)) # returns -1 (not found)",
      "solution": "class DNode:\n    def __init__(self, key=0, val=0):\n        self.key = key\n        self.val = val\n        self.prev = None\n        self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.map = {}\n        self.head = DNode()\n        self.tail = DNode()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    def _remove(self, node):\n        node.prev.next = node.next\n        node.next.prev = node.prev\n\n    def _add_front(self, node):\n        node.next = self.head.next\n        node.prev = self.head\n        self.head.next.prev = node\n        self.head.next = node\n\n    def get(self, key: int) -> int:\n        if key in self.map:\n            node = self.map[key]\n            self._remove(node)\n            self._add_front(node)\n            return node.val\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.map:\n            self._remove(self.map[key])\n        node = DNode(key, value)\n        self.map[key] = node\n        self._add_front(node)\n        if len(self.map) > self.cap:\n            lru = self.tail.prev\n            self._remove(lru)\n            del self.map[lru.key]"
    },
    "summary": {
      "keyTakeaways": [
        "Doubly linked lists store both `prev` and `next` pointers.",
        "Enables O(1) deletion of any node given its reference.",
        "Dummy sentinels simplify pointer logic and prevent null pointer errors.",
        "The combination of a hash map and a doubly linked list powers the LRU cache."
      ],
      "nextLessonId": "dsa-ll-circular",
      "nextLessonTitle": "Circular Linked Lists",
      "nextLessonModuleId": "dsa-module-4"
    },
    "lineByLine": [
      {
        "line": "11-12",
        "lines": "11-12",
        "code": "b.prev.next = b.next\nb.next.prev = b.prev",
        "codeSnippet": "b.prev.next = b.next\nb.next.prev = b.prev",
        "explanation": "Bypasses node b from both directions in exactly 2 pointer assignments."
      }
    ]
  },
  "dsa-ll-circular": {
    "id": "dsa-ll-circular",
    "moduleId": "dsa-module-4",
    "title": "Circular Linked Lists",
    "subtitle": "Ring Topologies, Tail-to-Head Wraparound & The Josephus Problem",
    "order": 3,
    "readTimeMinutes": 18,
    "difficulty": "Intermediate",
    "visualizerType": "linked-list",
    "objectives": [
      "Define the circular linked list invariant (tail.next == head).",
      "Traverse circular lists safely avoiding infinite loops using do-while semantics.",
      "Implement O(1) head and tail insertions using only a `tail` pointer.",
      "Model and solve the classic Josephus elimination problem in O(n * k) and O(n) time."
    ],
    "prerequisites": [
      "Singly Linked Lists",
      "Loop termination conditions"
    ],
    "analogy": {
      "title": "The Board Game Monopoly Track",
      "text": "A Monopoly board has 40 squares arranged in a continuous loop: Go, Mediterranean Ave... Boardwalk, and back to Go. There is no dead-end \"null\" square where a player falls off the edge of the world. Once a token passes Boardwalk, its next step automatically wraps back around to Go. Players cycle around the same continuous ring indefinitely.",
      "metaphor": "A circular linked list wraps its tail pointer back to the head, creating an endless ring topology."
    },
    "problemSolved": {
      "title": "Managing Cyclical and Continuous Resource Allocation",
      "description": "Many computing problems are naturally cyclical: round-robin OS CPU process scheduling, multiplayer board game turns, and ring buffers. A circular linked list models these structures with zero index boundary arithmetic or array shifts.",
      "keyPoints": [
        "Tail points directly back to head: tail.next = head",
        "Maintaining a single `tail` pointer gives O(1) access to BOTH tail and head (tail.next)",
        "Provides natural model for round-robin time slicing"
      ]
    },
    "intuition": {
      "overview": "If you maintain a `tail` pointer in a circular list, the head is instantly accessible via `tail.next`. This gives O(1) insert at both head and tail using only ONE pointer variable.",
      "steps": [
        {
          "step": 1,
          "title": "Insert at Head",
          "description": "new_node.next = tail.next; tail.next = new_node."
        },
        {
          "step": 2,
          "title": "Insert at Tail",
          "description": "new_node.next = tail.next; tail.next = new_node; tail = new_node."
        },
        {
          "step": 3,
          "title": "Traversal Guard",
          "description": "Record start = curr; do { curr = curr.next } while (curr != start)."
        }
      ]
    },
    "formalDefinition": {
      "text": "A Circular Singly Linked List C is a sequence of nodes where N_{k-1}.next = N_0. Traversal termination requires checking curr.next == head rather than curr == NULL.",
      "latex": "\\forall i \\in [0, k-1], \\quad N_i.\\text{next} = N_{(i+1) \\bmod k}"
    },
    "complexity": {
      "overview": "Insert Head/Tail (with tail pointer): O(1). Delete Head: O(1). Traversal: O(n).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Head or tail insertion via tail reference."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Full circuit cycle traversal."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Deleting node at arbitrary middle position."
        }
      ],
      "spaceNote": "No null pointer is wasted at the tail; memory is strictly identical to singly linked list."
    },
    "workedExample": {
      "title": "Solving Josephus Problem: n = 5 people, eliminate every k = 2nd person",
      "input": "Ring: [1 -> 2 -> 3 -> 4 -> 5 -> back to 1], k = 2",
      "steps": [
        {
          "step": 1,
          "action": "Step 1",
          "state": "Count 2: eliminate 2",
          "explanation": "Ring becomes: 1 -> 3 -> 4 -> 5 -> 1."
        },
        {
          "step": 2,
          "action": "Step 2",
          "state": "Count 2 from 3: eliminate 4",
          "explanation": "Ring becomes: 1 -> 3 -> 5 -> 1."
        },
        {
          "step": 3,
          "action": "Step 3",
          "state": "Count 2 from 5: eliminate 1",
          "explanation": "Ring becomes: 3 -> 5 -> 3."
        },
        {
          "step": 4,
          "action": "Step 4",
          "state": "Count 2 from 3: eliminate 5",
          "explanation": "Only person 3 remains alive."
        }
      ],
      "finalOutput": "Survivor is person 3."
    },
    "visualExplanation": {
      "title": "The Closed Ring Topology",
      "description": "Nodes arranged in a circle with curved arrows flowing clockwise. The tail node’s outgoing arrow curves back to the head node, forming a seamless ring.",
      "features": [
        "No null pointers",
        "Curved tail-to-head loop",
        "Single tail reference anchor"
      ]
    },
    "pseudocode": {
      "title": "Circular List Traversal",
      "code": "def traverse_circular(tail):\n    if not tail: return\n    curr = tail.next # head\n    while True:\n        visit(curr.val)\n        curr = curr.next\n        if curr == tail.next:\n            break"
    },
    "pythonCode": {
      "title": "Circular Linked List and Josephus Simulator in Python",
      "code": "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\ndef josephus_circle(n, k):\n    # Build circular list 1..n\n    head = Node(1)\n    prev = head\n    for i in range(2, n + 1):\n        curr = Node(i)\n        prev.next = curr\n        prev = curr\n    prev.next = head # Close the circle!\n\n    # Eliminate every k-th person\n    curr = head\n    while curr.next != curr:\n        # Step k - 2 times to reach predecessor of person to eliminate\n        for _ in range(k - 2):\n            curr = curr.next\n        # Eliminate curr.next\n        curr.next = curr.next.next\n        curr = curr.next\n\n    return curr.val\n\nprint(\"Survivor for n=5, k=2:\", josephus_circle(5, 2)) # Expected: 3\nprint(\"Survivor for n=7, k=3:\", josephus_circle(7, 3)) # Expected: 4",
      "explanation": "Simulates the physical elimination process on a real circular linked list."
    },
    "runnableCode": {
      "code": "class CircularList:\n    def __init__(self):\n        self.tail = None\n\n    def add_end(self, val):\n        from types import SimpleNamespace\n        node = SimpleNamespace(val=val, next=None)\n        if not self.tail:\n            node.next = node\n            self.tail = node\n        else:\n            node.next = self.tail.next\n            self.tail.next = node\n            self.tail = node\n\n    def print_circuit(self):\n        if not self.tail: return []\n        res = []\n        curr = self.tail.next\n        while True:\n            res.append(curr.val)\n            curr = curr.next\n            if curr == self.tail.next: break\n        return res\n\ncl = CircularList()\nfor x in [10, 20, 30]: cl.add_end(x)\nprint(\"Circular list:\", cl.print_circuit())",
      "expectedOutput": "Circular list: [10, 20, 30]"
    },
    "lineByLineExplanation": [
      {
        "line": "9-10",
        "lines": "9-10",
        "code": "if not self.tail:\n    node.next = node\n    self.tail = node",
        "codeSnippet": "if not self.tail:\n    node.next = node\n    self.tail = node",
        "explanation": "First node points to itself, establishing a 1-node circular ring."
      },
      {
        "line": "12-14",
        "lines": "12-14",
        "code": "node.next = self.tail.next\nself.tail.next = node\nself.tail = node",
        "codeSnippet": "node.next = self.tail.next\nself.tail.next = node\nself.tail = node",
        "explanation": "Inserts at end in O(1) by updating tail and rewiring circle."
      }
    ],
    "edgeCases": [
      {
        "case": "Infinite loop during traversal",
        "handling": "Always use start pointer sentinel to break when curr == start.",
        "example": "curr == head"
      },
      {
        "case": "Single node circular list",
        "handling": "node.next points to itself.",
        "example": "node.next == node"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `while curr is not None:` in a circular list.",
        "solution": "This creates an infinite loop because next is never None. Stop when `curr == start`."
      },
      {
        "mistake": "Losing access to head when updating tail.",
        "solution": "Always set `new_node.next = tail.next` before overwriting `tail.next`."
      }
    ],
    "applications": [
      {
        "industry": "Operating Systems",
        "application": "Round-Robin CPU Scheduler",
        "benefit": "Cycles through active processes in a circular queue, giving each thread equal CPU quantum slices."
      },
      {
        "industry": "Media Players",
        "application": "Repeat Playlist Mode",
        "benefit": "When the final song finishes, the player automatically restarts from track #1."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-4-3-q1",
        "question": "How can you insert at the beginning of a circular linked list in O(1) time if you only store a pointer to `tail`?",
        "hint": "Where is the head relative to tail?",
        "answer": "head is `tail.next`. Set `new_node.next = tail.next` and `tail.next = new_node`. Do NOT advance tail. The new node becomes the new head in O(1)."
      },
      {
        "id": "dsa-4-3-q2",
        "question": "How can you detect if a singly linked list is circular versus linear?",
        "hint": "Check the tail node.",
        "answer": "Traverse the list. If you encounter None, it is linear. If you encounter the head node again, it is circular. Alternatively use Floyd’s Cycle Detection."
      },
      {
        "id": "dsa-4-3-q3",
        "question": "What is the recurrence relation for the Josephus problem J(n, k)?",
        "hint": "Dynamic programming formulation.",
        "answer": "J(1, k) = 0 (0-indexed); J(n, k) = (J(n - 1, k) + k) mod n. This solves Josephus in O(n) time and O(1) space without simulating the list."
      }
    ],
    "quiz": [
      {
        "id": "dsa-4-3-quiz-1",
        "question": "What is the terminating condition when traversing a circular linked list starting from `head`?",
        "options": [
          "When curr.next == head (or curr returns to head)",
          "When curr is None",
          "When curr.val == 0",
          "When curr.prev is None"
        ],
        "correctIndex": 0,
        "explanation": "Because a circular linked list never contains a None pointer, the loop terminates when the cursor wraps all the way around to the starting node."
      },
      {
        "id": "dsa-4-3-quiz-2",
        "question": "Why is storing a `tail` pointer more powerful than storing a `head` pointer in a circular linked list?",
        "options": [
          "Because `tail.next` is the head, providing O(1) access to BOTH ends of the list",
          "Because tail uses less memory",
          "Because head pointers cannot store data",
          "Because tail is always even"
        ],
        "correctIndex": 0,
        "explanation": "Storing `tail` gives instant O(1) access to the tail, and `tail.next` gives instant O(1) access to the head, enabling O(1) prepends and appends."
      },
      {
        "id": "dsa-4-3-quiz-3",
        "question": "Which scheduling algorithm is most naturally implemented using a circular linked list?",
        "options": [
          "Round-Robin Scheduling",
          "First-Come First-Served",
          "Shortest Job First",
          "Priority Preemptive"
        ],
        "correctIndex": 0,
        "explanation": "Round-robin process schedulers allocate fixed time quanta cyclically among ready processes, which directly maps to circular list rotation."
      }
    ],
    "codingChallenge": {
      "title": "Split a Circular Linked List into Two Halves",
      "problem": "Given a circular linked list of length n, split it into two circular linked lists of sizes ceil(n/2) and floor(n/2). Return the heads of the two resulting circular lists.",
      "hints": [
        "Use slow and fast pointers to locate the midpoint node `slow`.",
        "Set `head2 = slow.next`.",
        "Rewire `slow.next = head1` and `fast.next = head2` to close both individual rings."
      ],
      "starterCode": "class Node:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef split_circular_list(head):\n    if not head or head.next == head:\n        return head, None\n\n    slow = head\n    fast = head\n    # Tortoise and Hare to find middle\n    while fast.next != head and fast.next.next != head:\n        slow = slow.next\n        fast = fast.next.next\n\n    # For even elements, advance fast to tail\n    if fast.next.next == head:\n        fast = fast.next\n\n    head1 = head\n    head2 = slow.next\n\n    # Close second circle\n    fast.next = head2\n    # Close first circle\n    slow.next = head1\n\n    return head1, head2",
      "solution": "def split_circular_list(head):\n    if not head or head.next == head:\n        return head, None\n    slow = head\n    fast = head\n    while fast.next != head and fast.next.next != head:\n        slow = slow.next\n        fast = fast.next.next\n    if fast.next.next == head:\n        fast = fast.next\n    head1 = head\n    head2 = slow.next\n    fast.next = head2\n    slow.next = head1\n    return head1, head2"
    },
    "summary": {
      "keyTakeaways": [
        "Circular linked lists connect tail.next back to head, forming a continuous ring.",
        "Maintaining a `tail` pointer enables O(1) insertion at both ends.",
        "Termination conditions must check for return to the start node, not None.",
        "Directly models round-robin CPU scheduling and the Josephus problem."
      ],
      "nextLessonId": "dsa-ll-insert-delete",
      "nextLessonTitle": "Insertion and Deletion",
      "nextLessonModuleId": "dsa-module-4"
    },
    "lineByLine": [
      {
        "line": "9-10",
        "lines": "9-10",
        "code": "if not self.tail:\n    node.next = node\n    self.tail = node",
        "codeSnippet": "if not self.tail:\n    node.next = node\n    self.tail = node",
        "explanation": "First node points to itself, establishing a 1-node circular ring."
      },
      {
        "line": "12-14",
        "lines": "12-14",
        "code": "node.next = self.tail.next\nself.tail.next = node\nself.tail = node",
        "codeSnippet": "node.next = self.tail.next\nself.tail.next = node\nself.tail = node",
        "explanation": "Inserts at end in O(1) by updating tail and rewiring circle."
      }
    ]
  },
  "dsa-ll-insert-delete": {
    "id": "dsa-ll-insert-delete",
    "moduleId": "dsa-module-4",
    "title": "Insertion and Deletion in Linked Lists",
    "subtitle": "Pointer Rewiring Patterns, Dummy Head Idioms & Memory Safety",
    "order": 4,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "linked-list",
    "objectives": [
      "Master the Dummy Head (Sentinel) technique to unify head and interior deletions.",
      "Insert a node at an arbitrary 0-indexed position k in O(k) time.",
      "Delete a node by value or by position safely without orphan memory leaks.",
      "Analyze pointer assignment order to prevent accidental list severance."
    ],
    "prerequisites": [
      "Singly Linked Lists",
      "Doubly Linked Lists"
    ],
    "analogy": {
      "title": "Coupling and Uncoupling Freight Train Cars",
      "text": "To attach a refrigerated car between Car 3 and Car 4 of a moving train: First, you hook the front coupling of the refrigerated car onto Car 3. Only after that connection is secured do you hook the rear coupling onto Car 4. If you disconnect Car 3 from Car 4 before the new car is coupled, the entire rear half of the train rolls away disconnected into the wilderness.",
      "metaphor": "Always connect the new node’s outgoing link before breaking existing chain links."
    },
    "problemSolved": {
      "title": "Eliminating Edge-Case Spaghetti Code in Pointer Manipulation",
      "description": "Without a dummy head sentinel, inserting or deleting the first element requires separate `if head == target:` branches, polluting code with repetitive special cases. A dummy head unifies all operations into a single clean loop.",
      "keyPoints": [
        "Dummy head `dummy.next = head` turns head modifications into standard interior modifications",
        "Strict pointer rewiring order: `new_node.next = prev.next; prev.next = new_node`",
        "Garbage collection automatically reclaims unreferenced detached subgraphs"
      ]
    },
    "intuition": {
      "overview": "To insert after node `prev`: connect `new_node.next = prev.next`, then connect `prev.next = new_node`. To delete after node `prev`: `prev.next = prev.next.next`.",
      "steps": [
        {
          "step": 1,
          "title": "Create Dummy Anchor",
          "description": "dummy = ListNode(0, head)."
        },
        {
          "step": 2,
          "title": "Advance to Predecessor",
          "description": "Walk `prev` pointer to the node immediately before target position."
        },
        {
          "step": 3,
          "title": "Perform Rewiring",
          "description": "Reassign pointers in safe sequence."
        },
        {
          "step": 4,
          "title": "Return New Head",
          "description": "Return `dummy.next`."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let L be a linked list. Insertion of node N at position k requires locating predecessor P = L[k-1] and updating: N.next = P.next followed by P.next = N. Deletion of L[k] requires P.next = P.next.next.",
      "latex": "N.\\text{next} \\leftarrow P.\\text{next}, \\quad P.\\text{next} \\leftarrow N"
    },
    "complexity": {
      "overview": "Insert/Delete at head: O(1). Insert/Delete at position k: O(k) time, O(1) space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Operating at position 0."
        },
        {
          "case": "Average",
          "time": "O(k)",
          "space": "O(1)",
          "explanation": "Stepping k nodes forward."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Inserting at the very end of list of size n."
        }
      ],
      "spaceNote": "In-place pointer rewiring uses O(1) auxiliary space."
    },
    "workedExample": {
      "title": "Removing all occurrences of 2 from [1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6], val = 6",
      "input": "Head -> 1 -> 2 -> 6 -> 3 -> 6, val = 6",
      "steps": [
        {
          "step": 1,
          "action": "Dummy Setup",
          "state": "dummy.next = head (0 -> 1 -> 2 -> 6 -> 3 -> 6)",
          "explanation": "Sentinel node handles potential head deletion."
        },
        {
          "step": 2,
          "action": "Traverse to node 2",
          "state": "curr = node 2, curr.next.val == 6",
          "explanation": "Bypass node 6: curr.next = curr.next.next (node 3)."
        },
        {
          "step": 3,
          "action": "Traverse to node 3",
          "state": "curr = node 3, curr.next.val == 6",
          "explanation": "Bypass second node 6: curr.next = None."
        }
      ],
      "finalOutput": "List cleaned to [1 -> 2 -> 3] in O(n) single pass."
    },
    "visualExplanation": {
      "title": "The Sentinel Bypass Bridge",
      "description": "Dummy node sits before index 0. The cursor stops at `prev`. The `next` pointer leaps over the victim node directly to `victim.next`. The victim node is isolated and reaped by garbage collection.",
      "features": [
        "Dummy sentinel anchor",
        "Predecessor stopping invariant",
        "Leapfrog link bypass"
      ]
    },
    "pseudocode": {
      "title": "Remove Elements by Value",
      "code": "def remove_elements(head, val):\n    dummy = ListNode(0, head)\n    curr = dummy\n    while curr.next:\n        if curr.next.val == val:\n            curr.next = curr.next.next\n        else:\n            curr = curr.next\n    return dummy.next"
    },
    "pythonCode": {
      "title": "Complete Insert and Delete Operations in Python",
      "code": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef insert_at_index(head, index, val):\n    dummy = ListNode(0, head)\n    prev = dummy\n    for _ in range(index):\n        if not prev: return head\n        prev = prev.next\n\n    new_node = ListNode(val, prev.next)\n    prev.next = new_node\n    return dummy.next\n\ndef remove_by_value(head, target):\n    dummy = ListNode(0, head)\n    prev = dummy\n    while prev.next:\n        if prev.next.val == target:\n            prev.next = prev.next.next\n        else:\n            prev = prev.next\n    return dummy.next\n\n# Build: 1 -> 2 -> 3\nhead = ListNode(1, ListNode(2, ListNode(3)))\nhead = insert_at_index(head, 1, 99) # 1 -> 99 -> 2 -> 3\nhead = remove_by_value(head, 2)      # 1 -> 99 -> 3\n\nres = []\ncurr = head\nwhile curr:\n    res.append(curr.val)\n    curr = curr.next\nprint(\"Result:\", res) # Expected: [1, 99, 3]",
      "explanation": "Demonstrates dummy node pattern for both position-based insertion and value-based deletion."
    },
    "runnableCode": {
      "code": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef remove_nth_from_end(head, n):\n    dummy = Node(0, head)\n    fast = slow = dummy\n    # Move fast n + 1 steps ahead\n    for _ in range(n + 1):\n        fast = fast.next\n    # Move both until fast hits None\n    while fast:\n        slow = slow.next\n        fast = fast.next\n    # Delete target\n    slow.next = slow.next.next\n    return dummy.next\n\nhead = Node(1, Node(2, Node(3, Node(4, Node(5)))))\nhead = remove_nth_from_end(head, 2) # Removes 4\nres = []\nwhile head:\n    res.append(head.val)\n    head = head.next\nprint(\"After removing 2nd from end:\", res)",
      "expectedOutput": "After removing 2nd from end: [1, 2, 3, 5]"
    },
    "lineByLineExplanation": [
      {
        "line": "7-10",
        "lines": "7-10",
        "code": "for _ in range(n + 1):\n    fast = fast.next",
        "codeSnippet": "for _ in range(n + 1):\n    fast = fast.next",
        "explanation": "Creates a gap of n nodes between fast and slow pointers."
      },
      {
        "line": "12-14",
        "lines": "12-14",
        "code": "while fast:\n    slow = slow.next\n    fast = fast.next",
        "codeSnippet": "while fast:\n    slow = slow.next\n    fast = fast.next",
        "explanation": "When fast reaches end, slow is positioned exactly before target node."
      },
      {
        "line": "16",
        "lines": "16",
        "code": "slow.next = slow.next.next",
        "codeSnippet": "slow.next = slow.next.next",
        "explanation": "Bypasses and deletes the target node in O(1)."
      }
    ],
    "edgeCases": [
      {
        "case": "Deleting head element",
        "handling": "Dummy node handles head deletion identically to interior deletion.",
        "example": "head.val == target"
      },
      {
        "case": "Index k greater than list length",
        "handling": "Check `if not prev: return head` to avoid null dereferences.",
        "example": "insert at index 10 on length 3"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Reversing pointer order during insertion: `prev.next = new_node` first.",
        "solution": "Setting `prev.next = new_node` first severs access to the remainder of the list. Always connect `new_node.next = prev.next` first!"
      },
      {
        "mistake": "Advancing pointer after a deletion.",
        "solution": "After `curr.next = curr.next.next`, do NOT advance `curr` because the newly exposed `curr.next` must be inspected next!"
      }
    ],
    "applications": [
      {
        "industry": "Compilers & Interpreters",
        "application": "Symbol Table Scope Chaining",
        "benefit": "Pushes and pops identifier bindings in nested lexical scopes in O(1) time."
      },
      {
        "industry": "Game Engines",
        "application": "Entity-Component System (ECS)",
        "benefit": "Spawns and destroys game entities in linked scene graphs without array reallocations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-4-4-q1",
        "question": "Why does the dummy head technique simplify linked list deletion code?",
        "hint": "What happens if the head node itself needs to be deleted?",
        "answer": "Without a dummy node, deleting the head requires updating the `head` variable. With a dummy node, the actual head is just `dummy.next`, making head deletion identical to deleting any middle node."
      },
      {
        "id": "dsa-4-4-q2",
        "question": "What is the correct sequence of assignments to insert node N between nodes A and B?",
        "hint": "Which connection must be established first?",
        "answer": "1. N.next = A.next (points N to B). 2. A.next = N (points A to N). Reversing this order overwrites A.next, permanently losing node B."
      },
      {
        "id": "dsa-4-4-q3",
        "question": "How can you delete the N-th node from the end of a list in a single pass?",
        "hint": "Use two pointers separated by N steps.",
        "answer": "Maintain two pointers `fast` and `slow` separated by N steps. Advance both until `fast` reaches the end; `slow` will point directly before the target node to delete."
      }
    ],
    "quiz": [
      {
        "id": "dsa-4-4-quiz-1",
        "question": "What happens if you execute `prev.next = new_node` BEFORE `new_node.next = prev.next`?",
        "options": [
          "You permanently lose access to all remaining nodes after prev in memory",
          "The list reverses",
          "A circular list is created",
          "The code runs normally"
        ],
        "correctIndex": 0,
        "explanation": "Overwriting `prev.next` destroys the only reference to the subsequent chain of nodes before the new node is connected to them, causing a memory severance."
      },
      {
        "id": "dsa-4-4-quiz-2",
        "question": "What is the primary role of a Dummy (Sentinel) node during linked list mutations?",
        "options": [
          "To eliminate special-case code when modifying or deleting the head node",
          "To count the total number of nodes",
          "To speed up CPU clock cycles",
          "To reverse the list"
        ],
        "correctIndex": 0,
        "explanation": "Placing a dummy node before head ensures every real node in the list (including the head) has a valid predecessor node, unifying deletion logic."
      },
      {
        "id": "dsa-4-4-quiz-3",
        "question": "When deleting consecutive nodes matching a target value, why should `curr = curr.next` NOT be called in the deletion branch?",
        "options": [
          "Because the newly linked next node has not yet been inspected for the target value",
          "Because curr becomes None",
          "Because it causes a compiler error",
          "Because the list length doubles"
        ],
        "correctIndex": 0,
        "explanation": "If `curr.next` was bypassed, the new `curr.next` might also hold the target value; advancing `curr` would skip inspecting it."
      }
    ],
    "codingChallenge": {
      "title": "Remove Duplicates from Sorted List",
      "problem": "Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well in O(n) time.",
      "hints": [
        "Since the list is already sorted, duplicate values must be adjacent.",
        "If curr.val == curr.next.val, bypass curr.next by setting curr.next = curr.next.next without advancing curr.",
        "Only advance curr when adjacent values are distinct."
      ],
      "starterCode": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef delete_duplicates(head):\n    curr = head\n    while curr and curr.next:\n        if curr.val == curr.next.val:\n            curr.next = curr.next.next # Skip duplicate!\n        else:\n            curr = curr.next\n    return head\n\n# Test on 1 -> 1 -> 2 -> 3 -> 3\nhead = ListNode(1, ListNode(1, ListNode(2, ListNode(3, ListNode(3)))))\nhead = delete_duplicates(head)\nres = []\nwhile head:\n    res.append(head.val)\n    head = head.next\nprint(\"Deduplicated list:\", res) # Expected: [1, 2, 3]",
      "solution": "def delete_duplicates(head):\n    curr = head\n    while curr and curr.next:\n        if curr.val == curr.next.val:\n            curr.next = curr.next.next\n        else:\n            curr = curr.next\n    return head"
    },
    "summary": {
      "keyTakeaways": [
        "Always connect the new node’s outgoing link before breaking existing pointers.",
        "Dummy head sentinels eliminate special cases for head modifications.",
        "Deleting given a predecessor is O(1): `prev.next = prev.next.next`.",
        "Do not advance the cursor when an element has just been deleted."
      ],
      "nextLessonId": "dsa-ll-reversal",
      "nextLessonTitle": "Linked List Reversal",
      "nextLessonModuleId": "dsa-module-4"
    },
    "lineByLine": [
      {
        "line": "7-10",
        "lines": "7-10",
        "code": "for _ in range(n + 1):\n    fast = fast.next",
        "codeSnippet": "for _ in range(n + 1):\n    fast = fast.next",
        "explanation": "Creates a gap of n nodes between fast and slow pointers."
      },
      {
        "line": "12-14",
        "lines": "12-14",
        "code": "while fast:\n    slow = slow.next\n    fast = fast.next",
        "codeSnippet": "while fast:\n    slow = slow.next\n    fast = fast.next",
        "explanation": "When fast reaches end, slow is positioned exactly before target node."
      },
      {
        "line": "16",
        "lines": "16",
        "code": "slow.next = slow.next.next",
        "codeSnippet": "slow.next = slow.next.next",
        "explanation": "Bypasses and deletes the target node in O(1)."
      }
    ]
  },
  "dsa-ll-fast-slow": {
    "id": "dsa-ll-fast-slow",
    "moduleId": "dsa-module-4",
    "title": "Fast and Slow Pointer Technique",
    "subtitle": "The Tortoise and Hare Paradigm for Midpoints, Cycles & Kth Elements",
    "order": 6,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "linked-list",
    "objectives": [
      "Master the 2x velocity differential (fast moves 2 steps, slow moves 1 step).",
      "Find the exact midpoint of a linked list in a single pass without counting length.",
      "Retrieve the k-th node from the end using a fixed-gap pointer pair.",
      "Differentiate between even and odd length midpoint termination conditions."
    ],
    "prerequisites": [
      "Singly Linked Lists",
      "Two Pointer Technique"
    ],
    "analogy": {
      "title": "The Circular Track Race",
      "text": "A tortoise runs at 1 meter per second, and a hare runs at 2 meters per second around an athletic track. When the hare reaches the finish line (100% of the race), the tortoise is guaranteed to be standing at exactly the 50% midpoint mark. If the track is an endless closed loop, the faster hare will eventually lap the slower tortoise from behind, proving the presence of a circle.",
      "metaphor": "Moving fast at 2x and slow at 1x guarantees slow lands at midpoint when fast hits the finish line."
    },
    "problemSolved": {
      "title": "Finding Midpoint and Relative Offsets in a Single Pass",
      "description": "Finding the middle of a linked list naively requires two passes: first pass to count total length n, second pass to walk n/2 steps. Fast and slow pointers find the exact middle node in a single traversal pass of O(n) time and O(1) space.",
      "keyPoints": [
        "Eliminates two-pass counting traversals",
        "Requires strictly O(1) auxiliary memory",
        "Crucial sub-routine in Merge Sort on Linked Lists and Palindrome List validation"
      ]
    },
    "intuition": {
      "overview": "Initialize slow = head, fast = head. While fast and fast.next exist, slow = slow.next, fast = fast.next.next. When fast reaches end, slow is at the middle.",
      "steps": [
        {
          "step": 1,
          "title": "Initialize at Head",
          "description": "slow = head, fast = head."
        },
        {
          "step": 2,
          "title": "Step Differential",
          "description": "In each loop iteration: slow advances 1 step; fast advances 2 steps."
        },
        {
          "step": 3,
          "title": "Termination Check",
          "description": "For odd length, fast.next is None. For even length, fast is None. Slow is at middle."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let list L have length n. In step t, slow is at index t and fast is at index 2t. When fast reaches n-1 (odd n) or n (even n), t = \\lfloor n/2 \\rfloor, placing slow precisely at the midpoint.",
      "latex": "\\text{Pos}(\\text{fast}) = 2 \\cdot \\text{Pos}(\\text{slow}) \\implies \\text{When } \\text{fast} \\ge n-1, \\, \\text{slow} = \\lfloor n / 2 \\rfloor"
    },
    "complexity": {
      "overview": "Time: O(n) single pass (n/2 loop iterations). Space: O(1) using two pointer variables.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "List of length 1 or 2."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Traverses n/2 steps."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Full single pass."
        }
      ],
      "spaceNote": "Operates in-place with zero memory allocation."
    },
    "workedExample": {
      "title": "Finding Middle of [1 -> 2 -> 3 -> 4 -> 5]",
      "input": "Head -> 1 -> 2 -> 3 -> 4 -> 5 -> None",
      "steps": [
        {
          "step": 1,
          "action": "Initial State",
          "state": "slow = 1, fast = 1",
          "explanation": "Both start at head."
        },
        {
          "step": 2,
          "action": "Iteration 1",
          "state": "slow = 2, fast = 3",
          "explanation": "slow moves 1 step; fast moves 2 steps."
        },
        {
          "step": 3,
          "action": "Iteration 2",
          "state": "slow = 3, fast = 5",
          "explanation": "slow moves to 3; fast moves to 5."
        },
        {
          "step": 4,
          "action": "Loop Termination",
          "state": "fast.next is None!",
          "explanation": "Loop exits because fast cannot take 2 more steps. Slow is at node 3."
        }
      ],
      "finalOutput": "Midpoint is node 3 in exactly 2 iterations."
    },
    "visualExplanation": {
      "title": "The Dual-Speed Cursor Animation",
      "description": "Tortoise cursor moves one node forward while Hare cursor hops two nodes forward. When Hare touches the right wall, Tortoise sits at the exact geometric center.",
      "features": [
        "1x velocity tortoise cursor",
        "2x velocity hare cursor",
        "Even vs odd midpoint landing"
      ]
    },
    "pseudocode": {
      "title": "Middle of Linked List",
      "code": "def find_middle(head):\n    slow = head\n    fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow"
    },
    "pythonCode": {
      "title": "Middle of Linked List and Palindrome Validation in Python",
      "code": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef is_palindrome_list(head):\n    if not head or not head.next:\n        return True\n\n    # Step 1: Find midpoint using fast/slow\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n\n    # Step 2: Reverse second half\n    prev = None\n    curr = slow\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n\n    # Step 3: Compare first and second half\n    first, second = head, prev\n    while second:\n        if first.val != second.val:\n            return False\n        first = first.next\n        second = second.next\n    return True\n\n# Test: 1 -> 2 -> 2 -> 1\np_head = ListNode(1, ListNode(2, ListNode(2, ListNode(1))))\nprint(\"Is 1->2->2->1 palindrome:\", is_palindrome_list(p_head)) # Expected: True",
      "explanation": "Combines fast/slow midpoint finding with in-place list reversal to validate palindrome in O(n) time and O(1) space."
    },
    "runnableCode": {
      "code": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef get_kth_from_end(head, k):\n    fast = slow = head\n    for _ in range(k):\n        if not fast: return None\n        fast = fast.next\n    while fast:\n        slow = slow.next\n        fast = fast.next\n    return slow.val\n\n# 1 -> 2 -> 3 -> 4 -> 5\nlst = Node(1, Node(2, Node(3, Node(4, Node(5)))))\nprint(\"2nd from end (expected 4):\", get_kth_from_end(lst, 2))",
      "expectedOutput": "2nd from end (expected 4): 4"
    },
    "lineByLineExplanation": [
      {
        "line": "7-9",
        "lines": "7-9",
        "code": "for _ in range(k): fast = fast.next",
        "codeSnippet": "for _ in range(k): fast = fast.next",
        "explanation": "Creates a fixed lead of k nodes between fast and slow."
      },
      {
        "line": "10-12",
        "lines": "10-12",
        "code": "while fast: slow = slow.next; fast = fast.next",
        "codeSnippet": "while fast: slow = slow.next; fast = fast.next",
        "explanation": "Maintains the k-node gap until fast falls off the end; slow is at kth-from-end."
      }
    ],
    "edgeCases": [
      {
        "case": "List with even number of nodes (e.g. 4 nodes)",
        "handling": "Returns second middle node (index 2) with `while fast and fast.next:`.",
        "example": "[1, 2, 3, 4] -> returns 3"
      },
      {
        "case": "Single node list",
        "handling": "Loop does not run, returns head directly.",
        "example": "[1] -> returns 1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Writing `while fast.next and fast:`",
        "solution": "Must check `fast` first! If `fast` is None, accessing `fast.next` raises AttributeError."
      },
      {
        "mistake": "Forgetting that k can be greater than list length in kth-from-end.",
        "solution": "Check `if not fast: return None` inside the initial lead loop."
      }
    ],
    "applications": [
      {
        "industry": "Data Pipelines",
        "application": "Streaming Window Median",
        "benefit": "Maintains running median pointer across linked stream elements without re-indexing."
      },
      {
        "industry": "Algorithm Engineering",
        "application": "Merge Sort on Linked Lists",
        "benefit": "Splits linked lists into two equal halves at midpoint in O(n) time before merging."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-4-6-q1",
        "question": "How can you adjust fast/slow pointers so that on an even-length list, it returns the FIRST middle node instead of the second?",
        "hint": "Where should fast start?",
        "answer": "Initialize `fast = head.next` instead of `fast = head`. For [1, 2, 3, 4], slow will stop at node 2 instead of node 3."
      },
      {
        "id": "dsa-4-6-q2",
        "question": "Why does finding the middle of a linked list with fast and slow pointers use less operations than counting length first?",
        "hint": "How many total node accesses occur?",
        "answer": "Both take O(n) time, but counting length requires n reads in pass 1 plus n/2 reads in pass 2 (total 1.5n operations). Fast/slow takes n reads total in a single pass."
      },
      {
        "id": "dsa-4-6-q3",
        "question": "Can fast and slow pointers be used to detect a cycle?",
        "hint": "What happens when fast laps slow?",
        "answer": "Yes, this is Floyd’s Cycle Detection algorithm. If a cycle exists, fast will eventually equal slow inside the loop."
      }
    ],
    "quiz": [
      {
        "id": "dsa-4-6-quiz-1",
        "question": "What is the correct loop condition for finding the second middle node of a linked list?",
        "options": [
          "while fast and fast.next:",
          "while slow != fast:",
          "while fast.next is not None:",
          "while slow is not None:"
        ],
        "correctIndex": 0,
        "explanation": "Checking `while fast and fast.next:` ensures `fast` can safely take 2 steps forward without triggering a null dereference."
      },
      {
        "id": "dsa-4-6-quiz-2",
        "question": "In an even-length list [10, 20, 30, 40], what does `while fast and fast.next:` return?",
        "options": [
          "30 (second middle)",
          "20 (first middle)",
          "40 (tail)",
          "10 (head)"
        ],
        "correctIndex": 0,
        "explanation": "When fast starts at head, on [10, 20, 30, 40] it steps: iter 1 (slow=20, fast=30), iter 2 (slow=30, fast=None), exiting with slow at 30."
      },
      {
        "id": "dsa-4-6-quiz-3",
        "question": "To find the k-th node from the end of a linked list, how many steps ahead should the fast pointer be initialized?",
        "options": [
          "k steps",
          "2k steps",
          "k / 2 steps",
          "1 step"
        ],
        "correctIndex": 0,
        "explanation": "Advancing fast by k steps creates a distance gap of k nodes; when fast reaches the end, slow will be k nodes behind."
      }
    ],
    "codingChallenge": {
      "title": "Middle of the Linked List",
      "problem": "Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.",
      "hints": [
        "Initialize slow and fast at head.",
        "Advance slow by 1 step, fast by 2 steps.",
        "Return slow when loop terminates."
      ],
      "starterCode": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef middle_node(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow\n\n# Test on 1 -> 2 -> 3 -> 4 -> 5 -> 6\nhead = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5, ListNode(6))))))\nmid = middle_node(head)\nprint(\"Middle node val (expected 4):\", mid.val)",
      "solution": "def middle_node(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow"
    },
    "summary": {
      "keyTakeaways": [
        "Fast (2x) and slow (1x) pointers locate the midpoint in a single O(n) pass.",
        "Condition `while fast and fast.next:` avoids null pointer exceptions.",
        "Fixed-lead pointers find the k-th node from the end in one pass.",
        "Foundation for linked list Merge Sort and Palindrome List testing."
      ],
      "nextLessonId": "dsa-ll-cycle-detection",
      "nextLessonTitle": "Floyd's Cycle Detection Algorithm",
      "nextLessonModuleId": "dsa-module-4"
    },
    "lineByLine": [
      {
        "line": "7-9",
        "lines": "7-9",
        "code": "for _ in range(k): fast = fast.next",
        "codeSnippet": "for _ in range(k): fast = fast.next",
        "explanation": "Creates a fixed lead of k nodes between fast and slow."
      },
      {
        "line": "10-12",
        "lines": "10-12",
        "code": "while fast: slow = slow.next; fast = fast.next",
        "codeSnippet": "while fast: slow = slow.next; fast = fast.next",
        "explanation": "Maintains the k-node gap until fast falls off the end; slow is at kth-from-end."
      }
    ]
  },
  "dsa-ll-cycle-detection": {
    "id": "dsa-ll-cycle-detection",
    "moduleId": "dsa-module-4",
    "title": "Floyd's Cycle Detection Algorithm",
    "subtitle": "The Tortoise and Hare Cycle Proof, Entry Node Derivation & In-Place Resolution",
    "order": 7,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "linked-list",
    "objectives": [
      "Understand why naive cycle detection with a hash set uses O(n) memory.",
      "Prove why fast and slow pointers must collide if a cycle exists (Floyd’s algorithm).",
      "Derive the mathematical proof that distance from head to cycle entry equals distance from collision to cycle entry.",
      "Find the cycle start node and break the cycle in O(n) time and O(1) space."
    ],
    "prerequisites": [
      "Fast and Slow Pointer Technique",
      "Modular arithmetic and algebraic proofs"
    ],
    "analogy": {
      "title": "The Closed Running Track Lapping",
      "text": "If two runners run on an open straight highway, the faster runner will pull ahead and the distance between them will grow forever; they will never meet again. But if the road merges into a closed 400-meter circular track, the distance between them decreases by 1 meter every second modulo 400. Inevitably, the faster runner will lap the slower runner from behind, and they will bump into each other. Bumping into each other is physical proof that the track contains a loop.",
      "metaphor": "If fast and slow pointers ever point to the exact same memory address, a cycle exists."
    },
    "problemSolved": {
      "title": "Detecting Memory Corruption and Infinite Loops in O(1) Space",
      "description": "Accidental circular references in linked lists or graphs cause infinite loops and memory leaks. Detecting cycles with a visited hash set requires O(n) auxiliary memory. Floyd’s Tortoise and Hare algorithm detects cycles and locates their exact entry node in O(n) time and strictly O(1) auxiliary space.",
      "keyPoints": [
        "Detects cycle presence in O(n) time and O(1) space",
        "Locates the exact entry node of the cycle",
        "Mathematical proof: 2(L + x) = L + kC + x implies L = kC - x"
      ]
    },
    "intuition": {
      "overview": "Phase 1: Detect collision. Move slow by 1, fast by 2. If they meet at node C, a cycle exists. Phase 2: Find entry. Reset slow to head, leave fast at C. Advance both by 1 step. They will collide at the exact cycle entry node!",
      "steps": [
        {
          "step": 1,
          "title": "Collision Phase",
          "description": "slow advances 1, fast advances 2 until slow == fast (cycle) or fast is None (no cycle)."
        },
        {
          "step": 2,
          "title": "Reset Pointer",
          "description": "Reset slow = head; leave fast at meeting point."
        },
        {
          "step": 3,
          "title": "Synchronous March",
          "description": "Move both slow and fast 1 step at a time. The node where they meet is the cycle start."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let L be the distance from head to cycle entry. Let C be cycle length. Let x be distance from entry to collision point. Slow traveled L + x. Fast traveled 2(L + x). Since fast traveled k extra cycles: 2(L + x) = L + x + kC => L = kC - x = (k - 1)C + (C - x). Hence, advancing one pointer from head (distance L) and one pointer from collision point (distance C - x) causes them to meet at the cycle entry.",
      "latex": "2(L + x) = L + kC + x \\implies L = kC - x \\implies L \\equiv C - x \\pmod C"
    },
    "complexity": {
      "overview": "Time: O(n) where n is total nodes. Space: O(1) auxiliary space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "No cycle, fast hits None after 1-2 steps."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Detects collision within 2 cycles."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Traverses full length and cycle."
        }
      ],
      "spaceNote": "Operates entirely with pointer references without allocating any collections."
    },
    "workedExample": {
      "title": "Finding Cycle Entry in [3 -> 2 -> 0 -> -4 -> points back to 2]",
      "input": "Head at 3. Cycle entry is node 2. Cycle: 2 -> 0 -> -4 -> 2.",
      "steps": [
        {
          "step": 1,
          "action": "Detect Cycle",
          "state": "slow moves 1, fast moves 2",
          "explanation": "They collide at node -4."
        },
        {
          "step": 2,
          "action": "Reset Slow",
          "state": "slow = head (node 3), fast = node -4",
          "explanation": "slow is placed at head; fast remains at collision point."
        },
        {
          "step": 3,
          "action": "Step Together",
          "state": "slow steps to node 2; fast steps to node 2",
          "explanation": "Both advance 1 step: slow is at node 2, fast is at node 2. Match!"
        }
      ],
      "finalOutput": "Cycle entry correctly located at node with value 2 in O(n) time."
    },
    "visualExplanation": {
      "title": "The Lasso Geometry Proof",
      "description": "Visualizing the list as a lasso: a straight stem of length L leading into a loop of circumference C. The distance L from the head to the loop entry equals the remaining distance from the collision point around to the loop entry.",
      "features": [
        "Straight stem length L",
        "Circular loop circumference C",
        "Collision meeting point",
        "Equidistant convergence"
      ]
    },
    "pseudocode": {
      "title": "Floyd's Cycle Algorithm",
      "code": "def detect_cycle_entry(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            break\n    else:\n        return None # No cycle\n\n    slow = head\n    while slow != fast:\n        slow = slow.next\n        fast = fast.next\n    return slow # Cycle entry node"
    },
    "pythonCode": {
      "title": "Floyd Cycle Detection and Cycle Start in Python",
      "code": "class ListNode:\n    def __init__(self, x):\n        self.val = x\n        self.next = None\n\ndef detect_cycle(head):\n    if not head or not head.next:\n        return None\n\n    slow = fast = head\n    # Phase 1: Detect if a cycle exists\n    has_cycle = False\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            has_cycle = True\n            break\n\n    if not has_cycle:\n        return None\n\n    # Phase 2: Find cycle entry node\n    slow = head\n    while slow != fast:\n        slow = slow.next\n        fast = fast.next\n\n    return slow\n\n# Build: 3 -> 2 -> 0 -> -4 -> loop to 2\nnode0 = ListNode(3)\nnode1 = ListNode(2)\nnode2 = ListNode(0)\nnode3 = ListNode(-4)\nnode0.next = node1\nnode1.next = node2\nnode2.next = node3\nnode3.next = node1 # Cycle back to 2!\n\nentry = detect_cycle(node0)\nprint(\"Cycle entry node value:\", entry.val if entry else \"No cycle\") # Expected: 2",
      "explanation": "Implements both Phase 1 (collision) and Phase 2 (entry node resolution) in O(n) time and O(1) space."
    },
    "runnableCode": {
      "code": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\n# Create cycle: 1 -> 2 -> 3 -> 4 -> 2\nn4 = Node(4)\nn3 = Node(3, n4)\nn2 = Node(2, n3)\nn1 = Node(1, n2)\nn4.next = n2 # Cycle to 2\n\ndef has_cycle(head):\n    s = f = head\n    while f and f.next:\n        s = s.next\n        f = f.next.next\n        if s == f: return True\n    return False\n\nprint(\"Has cycle:\", has_cycle(n1))",
      "expectedOutput": "Has cycle: True"
    },
    "lineByLineExplanation": [
      {
        "line": "14-18",
        "lines": "14-18",
        "code": "while f and f.next:\n    s = s.next\n    f = f.next.next\n    if s == f: return True",
        "codeSnippet": "while f and f.next:\n    s = s.next\n    f = f.next.next\n    if s == f: return True",
        "explanation": "Tortoise and hare race: fast moves twice as fast; collision proves cycle."
      }
    ],
    "edgeCases": [
      {
        "case": "No cycle present",
        "handling": "fast reaches None; loop exits and returns None or False.",
        "example": "1 -> 2 -> 3 -> None"
      },
      {
        "case": "Cycle is self-loop (node.next == node)",
        "handling": "Collision happens on first step; entry is the node itself.",
        "example": "1 -> 1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Resetting fast to head instead of slow in Phase 2.",
        "solution": "Either pointer can be reset to head as long as the other stays at the collision point, but moving slow to head is standard."
      },
      {
        "mistake": "Moving fast at 2 steps in Phase 2.",
        "solution": "In Phase 2, BOTH pointers must move at exactly 1 step per iteration!"
      }
    ],
    "applications": [
      {
        "industry": "Cryptography",
        "application": "Pollard's Rho Integer Factorization",
        "benefit": "Finds prime factors by detecting cycles in pseudo-random polynomial sequences x_{i+1} = (x_i^2 + 1) mod N."
      },
      {
        "industry": "Programming Language Runtimes",
        "application": "Circular Reference Garbage Collection",
        "benefit": "Detects uncollectable cyclic reference graphs in Python/V8 heap engines."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-4-7-q1",
        "question": "Why does fast moving at 2x guarantee a collision with slow inside the cycle instead of skipping over it?",
        "hint": "What is the relative speed?",
        "answer": "The relative speed between fast and slow is 2 - 1 = 1 node per step. The distance between them decreases by exactly 1 in each iteration modulo C, making it mathematically impossible to skip over slow."
      },
      {
        "id": "dsa-4-7-q2",
        "question": "How can you calculate the length of the cycle once a collision is detected?",
        "hint": "Freeze one pointer and advance the other.",
        "answer": "Keep slow fixed at the collision point and advance fast one step at a time, counting steps until fast == slow again. The step count is the exact cycle length C."
      },
      {
        "id": "dsa-4-7-q3",
        "question": "How can you break (remove) the cycle in O(1) space?",
        "hint": "Find the predecessor of the cycle entry.",
        "answer": "Find the cycle entry node. Traverse the cycle to find the node whose `next` points to the entry node, and set its `next = None`."
      }
    ],
    "quiz": [
      {
        "id": "dsa-4-7-quiz-1",
        "question": "What is the auxiliary space complexity of Floyd's Cycle Detection algorithm?",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(C)"
        ],
        "correctIndex": 0,
        "explanation": "Floyd's algorithm uses only two pointer variables (slow and fast), requiring strictly O(1) auxiliary memory."
      },
      {
        "id": "dsa-4-7-quiz-2",
        "question": "In Phase 2 of Floyd algorithm (finding the cycle entry node), how many steps do slow and fast take per iteration?",
        "options": [
          "Both move 1 step at a time",
          "Slow moves 1 step, fast moves 2 steps",
          "Slow moves 2 steps, fast moves 1 step",
          "Fast jumps directly to the entry"
        ],
        "correctIndex": 0,
        "explanation": "In Phase 2, both pointers move at the same speed of 1 step per iteration until they meet at the cycle entry node."
      },
      {
        "id": "dsa-4-7-quiz-3",
        "question": "What is the relative speed between the fast (2 steps) and slow (1 step) pointer inside the cycle?",
        "options": [
          "1 step per iteration",
          "2 steps per iteration",
          "0.5 steps per iteration",
          "3 steps per iteration"
        ],
        "correctIndex": 0,
        "explanation": "Because fast gains exactly 1 step on slow per iteration (2 - 1 = 1), the distance between them shrinks by 1 each step, guaranteeing they meet without hopping over each other."
      }
    ],
    "codingChallenge": {
      "title": "Linked List Cycle II (Find Entry Node)",
      "problem": "Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return None. Do not modify the linked list. Solve with O(1) memory.",
      "hints": [
        "Phase 1: Run while fast and fast.next until slow == fast. If no collision, return None.",
        "Phase 2: Reset slow = head. Move both slow and fast 1 step at a time.",
        "Return the node where they meet."
      ],
      "starterCode": "class ListNode:\n    def __init__(self, x):\n        self.val = x\n        self.next = None\n\ndef detect_cycle_entry(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            break\n    else:\n        return None\n\n    slow = head\n    while slow != fast:\n        slow = slow.next\n        fast = fast.next\n    return slow",
      "solution": "def detect_cycle_entry(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            break\n    else:\n        return None\n\n    slow = head\n    while slow != fast:\n        slow = slow.next\n        fast = fast.next\n    return slow"
    },
    "summary": {
      "keyTakeaways": [
        "Floyd's algorithm detects cycles in O(n) time and O(1) space.",
        "Relative velocity of 1 step prevents fast from jumping over slow.",
        "Distance from head to entry equals distance from collision to entry (L = kC - x).",
        "Phase 2 moves both pointers at 1 step to converge at the cycle entrance."
      ],
      "nextLessonId": "dsa-ll-merge-sorted",
      "nextLessonTitle": "Merging Sorted Linked Lists",
      "nextLessonModuleId": "dsa-module-4"
    },
    "lineByLine": [
      {
        "line": "14-18",
        "lines": "14-18",
        "code": "while f and f.next:\n    s = s.next\n    f = f.next.next\n    if s == f: return True",
        "codeSnippet": "while f and f.next:\n    s = s.next\n    f = f.next.next\n    if s == f: return True",
        "explanation": "Tortoise and hare race: fast moves twice as fast; collision proves cycle."
      }
    ]
  },
  "dsa-ll-merge-sorted": {
    "id": "dsa-ll-merge-sorted",
    "moduleId": "dsa-module-4",
    "title": "Merging Sorted Linked Lists",
    "subtitle": "Pointer Splicing, Dummy Head Idioms & Divide-and-Conquer Merge of K Lists",
    "order": 8,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "linked-list",
    "objectives": [
      "Merge two sorted linked lists in-place in O(n + m) time and O(1) space.",
      "Use a dummy head node to eliminate special cases when choosing the first node.",
      "Extend merging to K sorted linked lists using a Min-Heap / Priority Queue in O(N log k).",
      "Implement Divide and Conquer pair-merging for K lists with zero heap overhead."
    ],
    "prerequisites": [
      "Singly Linked Lists",
      "Insertion and Deletion in Linked Lists"
    ],
    "analogy": {
      "title": "The Zipper Teeth Interlocking",
      "text": "A jacket zipper has two rows of teeth: the left track and the right track. As you pull the zipper slider upward, it compares the height of the next tooth on the left versus the right. It snaps the lower tooth into the central seam first, then the next lowest, alternating smoothly until both tracks are seamlessly intertwined into one unified sorted chain.",
      "metaphor": "Merging sorted lists splices existing node pointers into a single chain like interlocking zipper teeth."
    },
    "problemSolved": {
      "title": "Combining Pre-Sorted Sequences with Zero Copying",
      "description": "Merging two arrays of size n and m requires allocating a new array of size n + m and copying elements. In linked lists, merging requires zero element allocations; we simply splice the existing pointers, producing a merged list in O(n + m) time and O(1) auxiliary space.",
      "keyPoints": [
        "In-place pointer splicing: zero new node allocations",
        "Dummy head `dummy = ListNode()` provides a clean anchor for the output list",
        "Merges K sorted lists in O(N log k) time using a min-heap or divide-and-conquer"
      ]
    },
    "intuition": {
      "overview": "Maintain a pointer `tail` at the end of the merged list. Compare `l1.val` and `l2.val`. Connect `tail.next` to the smaller node and advance that list. Append any remaining nodes at the end.",
      "steps": [
        {
          "step": 1,
          "title": "Create Dummy Anchor",
          "description": "dummy = ListNode(0); tail = dummy."
        },
        {
          "step": 2,
          "title": "Compare and Splice",
          "description": "while l1 and l2: if l1.val <= l2.val: tail.next = l1; l1 = l1.next else: tail.next = l2; l2 = l2.next; tail = tail.next."
        },
        {
          "step": 3,
          "title": "Attach Remainder",
          "description": "tail.next = l1 or l2."
        },
        {
          "step": 4,
          "title": "Return Result",
          "description": "return dummy.next."
        }
      ]
    },
    "formalDefinition": {
      "text": "Given two sorted linked lists L1 and L2 of lengths n and m, the merge function produces a single sorted linked list L containing all n + m nodes such that L[i] <= L[i+1]. Total comparisons <= n + m - 1.",
      "latex": "\\text{Time} = \\mathcal{O}(n + m), \\quad \\text{Auxiliary Space} = \\mathcal{O}(1)"
    },
    "complexity": {
      "overview": "Two lists: O(n + m) time, O(1) space. K lists: O(N log k) time where N is total nodes across all k lists.",
      "cases": [
        {
          "case": "Best",
          "time": "O(min(n, m))",
          "space": "O(1)",
          "explanation": "All elements in one list are smaller than the first element of the other list."
        },
        {
          "case": "Average",
          "time": "O(n + m)",
          "space": "O(1)",
          "explanation": "Alternating interweaves across both lists."
        },
        {
          "case": "Worst",
          "time": "O(n + m)",
          "space": "O(1)",
          "explanation": "Exhausts n + m - 1 comparisons."
        }
      ],
      "spaceNote": "In-place pointer splicing uses strictly O(1) extra memory."
    },
    "workedExample": {
      "title": "Merging L1 = [1 -> 2 -> 4] and L2 = [1 -> 3 -> 4]",
      "input": "L1: 1 -> 2 -> 4, L2: 1 -> 3 -> 4",
      "steps": [
        {
          "step": 1,
          "action": "Compare 1 and 1",
          "state": "tail.next = L1 (1)",
          "explanation": "L1 advances to 2, tail advances to 1."
        },
        {
          "step": 2,
          "action": "Compare 2 and 1",
          "state": "tail.next = L2 (1)",
          "explanation": "L2 advances to 3, tail advances to 1."
        },
        {
          "step": 3,
          "action": "Compare 2 and 3",
          "state": "tail.next = L1 (2)",
          "explanation": "L1 advances to 4, tail advances to 2."
        },
        {
          "step": 4,
          "action": "Compare 4 and 3",
          "state": "tail.next = L2 (3)",
          "explanation": "L2 advances to 4, tail advances to 3."
        },
        {
          "step": 5,
          "action": "Compare 4 and 4",
          "state": "tail.next = L1 (4)",
          "explanation": "L1 is exhausted. Attach remainder L2 (4)."
        }
      ],
      "finalOutput": "Merged list: [1 -> 1 -> 2 -> 3 -> 4 -> 4]"
    },
    "visualExplanation": {
      "title": "Zipper Splicing Animation",
      "description": "Two parallel chains with a tail pointer swinging back and forth, repointing its `next` pointer to whichever chain head has the smaller number, until one chain is empty.",
      "features": [
        "Dummy head anchor",
        "Alternating pointer splicing",
        "O(1) final remainder link"
      ]
    },
    "pseudocode": {
      "title": "Merge Two Sorted Lists",
      "code": "def merge_two_lists(l1, l2):\n    dummy = ListNode(0)\n    tail = dummy\n    while l1 and l2:\n        if l1.val <= l2.val:\n            tail.next = l1\n            l1 = l1.next\n        else:\n            tail.next = l2\n            l2 = l2.next\n        tail = tail.next\n    tail.next = l1 if l1 else l2\n    return dummy.next"
    },
    "pythonCode": {
      "title": "Merge Two Sorted Lists and Merge K Sorted Lists in Python",
      "code": "import heapq\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef merge_two_lists(l1, l2):\n    dummy = ListNode(0)\n    tail = dummy\n    while l1 and l2:\n        if l1.val <= l2.val:\n            tail.next = l1\n            l1 = l1.next\n        else:\n            tail.next = l2\n            l2 = l2.next\n        tail = tail.next\n    tail.next = l1 or l2\n    return dummy.next\n\n# Merge K Sorted Lists using Min-Heap\ndef merge_k_lists(lists):\n    dummy = ListNode(0)\n    tail = dummy\n    heap = [] # (val, id, node)\n\n    for i, node in enumerate(lists):\n        if node:\n            heapq.heappush(heap, (node.val, i, node))\n\n    while heap:\n        val, i, node = heapq.heappop(heap)\n        tail.next = node\n        tail = tail.next\n        if node.next:\n            heapq.heappush(heap, (node.next.val, i, node.next))\n\n    return dummy.next\n\n# Test\nl1 = ListNode(1, ListNode(2, ListNode(4)))\nl2 = ListNode(1, ListNode(3, ListNode(4)))\nmerged = merge_two_lists(l1, l2)\nres = []\nwhile merged:\n    res.append(merged.val)\n    merged = merged.next\nprint(\"Merged 2 lists:\", res) # [1, 1, 2, 3, 4, 4]",
      "explanation": "Demonstrates both two-list merging and K-way merge using a min-heap priority queue."
    },
    "runnableCode": {
      "code": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\ndef merge(l1, l2):\n    dummy = Node(0)\n    tail = dummy\n    while l1 and l2:\n        if l1.val <= l2.val:\n            tail.next = l1\n            l1 = l1.next\n        else:\n            tail.next = l2\n            l2 = l2.next\n        tail = tail.next\n    tail.next = l1 or l2\n    return dummy.next\n\na = Node(5, Node(10, Node(15)))\nb = Node(2, Node(3, Node(20)))\nres = merge(a, b)\nout = []\nwhile res:\n    out.append(res.val)\n    res = res.next\nprint(\"Merged:\", out)",
      "expectedOutput": "Merged: [2, 3, 5, 10, 15, 20]"
    },
    "lineByLineExplanation": [
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "dummy = Node(0)\ntail = dummy",
        "codeSnippet": "dummy = Node(0)\ntail = dummy",
        "explanation": "Creates dummy head sentinel to anchor the head of the merged chain."
      },
      {
        "line": "8-15",
        "lines": "8-15",
        "code": "while l1 and l2:\n    if l1.val <= l2.val:\n        tail.next = l1; l1 = l1.next\n    else:\n        tail.next = l2; l2 = l2.next\n    tail = tail.next",
        "codeSnippet": "while l1 and l2:\n    if l1.val <= l2.val:\n        tail.next = l1; l1 = l1.next\n    else:\n        tail.next = l2; l2 = l2.next\n    tail = tail.next",
        "explanation": "Picks smaller node, splices it onto tail, and advances the chosen list pointer."
      },
      {
        "line": "16",
        "lines": "16",
        "code": "tail.next = l1 or l2",
        "codeSnippet": "tail.next = l1 or l2",
        "explanation": "Attaches whichever remaining list still has nodes in a single O(1) pointer link."
      }
    ],
    "edgeCases": [
      {
        "case": "One list is empty",
        "handling": "Loop does not execute; `tail.next = l1 or l2` returns the non-empty list directly.",
        "example": "l1 = None, l2 = Node(1)"
      },
      {
        "case": "Both lists empty",
        "handling": "Returns None.",
        "example": "l1 = None, l2 = None"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Creating brand-new `ListNode` objects inside the loop.",
        "solution": "Do not allocate new nodes! Splice the existing nodes by reassigning `tail.next` to preserve O(1) space."
      },
      {
        "mistake": "Looping through the remainder of the non-empty list.",
        "solution": "In linked lists, you don’t need a loop to copy the rest; simply set `tail.next = remaining` in a single assignment."
      }
    ],
    "applications": [
      {
        "industry": "Database Storage Engines",
        "application": "LSM-Tree Compaction (RocksDB / Cassandra)",
        "benefit": "Merges sorted SSTables on disk into a unified sorted file via multi-way merge."
      },
      {
        "industry": "Data Analytics",
        "application": "External Merge Sort",
        "benefit": "Sorts terabytes of data larger than RAM by merging sorted chunk files."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-4-8-q1",
        "question": "What is the advantage of linked list merge over array merge?",
        "hint": "Consider memory allocation.",
        "answer": "Array merge requires allocating a new array of size n + m and copying elements. Linked list merge rewires existing pointers in-place with O(1) extra space."
      },
      {
        "id": "dsa-4-8-q2",
        "question": "What is the time complexity of merging K sorted lists of total N elements using divide and conquer?",
        "hint": "How many levels of pairwise merging occur?",
        "answer": "log2(k) levels of merging. Each level processes all N elements in O(N) time. Total complexity is O(N log k)."
      },
      {
        "id": "dsa-4-8-q3",
        "question": "Why does heapq in Python require `(node.val, i, node)` instead of `(node.val, node)`?",
        "hint": "What happens when node.val is equal for two nodes?",
        "answer": "If two nodes have the same value, Python attempts to compare the second tuple element. Since `ListNode` does not define `<` comparison, it raises TypeError. Adding unique integer `i` breaks ties."
      }
    ],
    "quiz": [
      {
        "id": "dsa-4-8-quiz-1",
        "question": "What is the time complexity of merging two sorted linked lists of lengths n and m?",
        "options": [
          "O(n + m)",
          "O(n * m)",
          "O(n log m)",
          "O(1)"
        ],
        "correctIndex": 0,
        "explanation": "In the worst case, every element from both lists is examined once, requiring at most n + m - 1 comparisons."
      },
      {
        "id": "dsa-4-8-quiz-2",
        "question": "How do you attach the remaining nodes when one list is exhausted in linked list merge?",
        "options": [
          "tail.next = l1 or l2 (single O(1) pointer assignment)",
          "Iterate through the remaining list with a while loop",
          "Sort the tail",
          "Delete the remaining nodes"
        ],
        "correctIndex": 0,
        "explanation": "Because linked list nodes are already connected in sorted order, assigning `tail.next` to the remaining list links all remaining elements in a single O(1) operation."
      },
      {
        "id": "dsa-4-8-quiz-3",
        "question": "What is the optimal time complexity to merge K sorted linked lists containing N total nodes?",
        "options": [
          "O(N log k)",
          "O(N * k)",
          "O(N^2)",
          "O(k log N)"
        ],
        "correctIndex": 0,
        "explanation": "Using either a min-heap of size k or divide-and-conquer pairwise merging, K sorted lists are merged in optimal O(N log k) time."
      }
    ],
    "codingChallenge": {
      "title": "Sort List (Merge Sort on Linked List)",
      "problem": "Given the head of a linked list, return the list after sorting it in ascending order. Solve in O(n log n) time and O(log n) stack space using Merge Sort.",
      "hints": [
        "Base case: if head is None or head.next is None, list is already sorted.",
        "Use slow and fast pointers to split into two halves, disconnecting with prev.next = None.",
        "Recursively sort each half and merge using the standard merge subroutine."
      ],
      "starterCode": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef sort_list(head):\n    if not head or not head.next:\n        return head\n\n    # 1. Split list in half using fast/slow\n    prev = None\n    slow = fast = head\n    while fast and fast.next:\n        prev = slow\n        slow = slow.next\n        fast = fast.next.next\n\n    prev.next = None # Disconnect left half from right half!\n\n    # 2. Recursively sort both halves\n    left = sort_list(head)\n    right = sort_list(slow)\n\n    # 3. Merge two sorted halves\n    dummy = ListNode(0)\n    tail = dummy\n    while left and right:\n        if left.val <= right.val:\n            tail.next = left\n            left = left.next\n        else:\n            tail.next = right\n            right = right.next\n        tail = tail.next\n    tail.next = left or right\n    return dummy.next\n\n# Test: 4 -> 2 -> 1 -> 3\nhead = ListNode(4, ListNode(2, ListNode(1, ListNode(3))))\nsorted_head = sort_list(head)\nres = []\nwhile sorted_head:\n    res.append(sorted_head.val)\n    sorted_head = sorted_head.next\nprint(\"Sorted list:\", res) # Expected: [1, 2, 3, 4]",
      "solution": "def sort_list(head):\n    if not head or not head.next:\n        return head\n    prev = None\n    slow = fast = head\n    while fast and fast.next:\n        prev = slow\n        slow = slow.next\n        fast = fast.next.next\n    prev.next = None\n    left = sort_list(head)\n    right = sort_list(slow)\n    dummy = ListNode(0)\n    tail = dummy\n    while left and right:\n        if left.val <= right.val:\n            tail.next = left\n            left = left.next\n        else:\n            tail.next = right\n            right = right.next\n        tail = tail.next\n    tail.next = left or right\n    return dummy.next"
    },
    "summary": {
      "keyTakeaways": [
        "Linked list merge splices existing pointers in-place with O(1) auxiliary space.",
        "Dummy head eliminates special cases when choosing the first merged node.",
        "Remaining elements attach in a single O(1) link `tail.next = l1 or l2`.",
        "Powers O(n log n) Merge Sort on linked lists."
      ],
      "nextLessonId": "dsa-ll-middle-intersection",
      "nextLessonTitle": "Finding Middle and List Intersection",
      "nextLessonModuleId": "dsa-module-4"
    },
    "lineByLine": [
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "dummy = Node(0)\ntail = dummy",
        "codeSnippet": "dummy = Node(0)\ntail = dummy",
        "explanation": "Creates dummy head sentinel to anchor the head of the merged chain."
      },
      {
        "line": "8-15",
        "lines": "8-15",
        "code": "while l1 and l2:\n    if l1.val <= l2.val:\n        tail.next = l1; l1 = l1.next\n    else:\n        tail.next = l2; l2 = l2.next\n    tail = tail.next",
        "codeSnippet": "while l1 and l2:\n    if l1.val <= l2.val:\n        tail.next = l1; l1 = l1.next\n    else:\n        tail.next = l2; l2 = l2.next\n    tail = tail.next",
        "explanation": "Picks smaller node, splices it onto tail, and advances the chosen list pointer."
      },
      {
        "line": "16",
        "lines": "16",
        "code": "tail.next = l1 or l2",
        "codeSnippet": "tail.next = l1 or l2",
        "explanation": "Attaches whichever remaining list still has nodes in a single O(1) pointer link."
      }
    ]
  },
  "dsa-ll-middle-intersection": {
    "id": "dsa-ll-middle-intersection",
    "moduleId": "dsa-module-4",
    "title": "Finding Middle and List Intersection",
    "subtitle": "Pointer Equalization, Y-Shaped Convergence & O(1) Space Intersection Search",
    "order": 9,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "linked-list",
    "objectives": [
      "Understand why linked list intersection is a structural node identity test, not a value match.",
      "Implement the Length Equalization approach (advance longer list by |lenA - lenB|).",
      "Implement the Two-Pointer Traversal Switch technique (pA = pA.next if pA else headB).",
      "Prove why switching lists guarantees collision at the intersection node in at most lenA + lenB steps."
    ],
    "prerequisites": [
      "Singly Linked Lists",
      "Fast and Slow Pointer Technique"
    ],
    "analogy": {
      "title": "The Y-Shaped River Confluence",
      "text": "Two independent mountain streams (Stream A, 15 miles long; Stream B, 10 miles long) flow down separate ravines until they merge at Confluence Point into a single wide river. If two kayakers start at the same time, the kayaker on Stream B will pass the confluence 5 miles before the kayaker on Stream A. But if Kayaker A gives Kayaker B a 5-mile head start, they will paddle into the confluence at the exact same second.",
      "metaphor": "Equalizing the path lengths allows two pointers to step in lockstep and meet at the intersection node."
    },
    "problemSolved": {
      "title": "Detecting Memory Merges without Hash Sets",
      "description": "Finding the intersection of two linked lists naively using a hash set of visited node addresses takes O(m) extra memory. The pointer redirection technique finds the exact intersection node in O(n + m) time and strictly O(1) auxiliary space.",
      "keyPoints": [
        "Tests node reference equality (pA == pB), not value equality",
        "Requires zero extra memory: strictly O(1) auxiliary space",
        "Elegant path switching guarantees both pointers travel exactly lenA + lenB steps"
      ]
    },
    "intuition": {
      "overview": "Pointer A starts at headA; Pointer B starts at headB. When pointer A reaches the end of list A, redirect it to headB. When pointer B reaches the end of list B, redirect it to headA. Both pointers will travel length A + length B, aligning perfectly at the intersection node.",
      "steps": [
        {
          "step": 1,
          "title": "Initialize Pointers",
          "description": "pA = headA, pB = headB."
        },
        {
          "step": 2,
          "title": "Traverse and Switch",
          "description": "pA = pA.next if pA else headB; pB = pB.next if pB else headA."
        },
        {
          "step": 3,
          "title": "Collision or Null",
          "description": "If lists intersect, pA == pB at intersection node. If no intersection, pA == pB == None."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let list A have non-shared length a and shared length c. Let list B have non-shared length b and shared length c. Pointer A travels a + c + b steps. Pointer B travels b + c + a steps. Since a + c + b = b + c + a, both pointers arrive at the intersection node after exactly the same number of steps.",
      "latex": "a + c + b = b + c + a \\implies \\text{Pointers align at intersection in } \\le a + b + c \\text{ steps}"
    },
    "complexity": {
      "overview": "Time: O(n + m) where n and m are list lengths. Space: O(1) auxiliary space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Lists intersect at the very first head node."
        },
        {
          "case": "Average",
          "time": "O(n + m)",
          "space": "O(1)",
          "explanation": "Switches lists once and collides at intersection."
        },
        {
          "case": "Worst",
          "time": "O(n + m)",
          "space": "O(1)",
          "explanation": "No intersection; both reach None after traveling lenA + lenB."
        }
      ],
      "spaceNote": "Operates in-place with two pointer variables."
    },
    "workedExample": {
      "title": "Finding Intersection of List A: [4 -> 1 -> 8 -> 4 -> 5] and List B: [5 -> 6 -> 1 -> 8 -> 4 -> 5]",
      "input": "Shared tail starting at node with value 8.",
      "steps": [
        {
          "step": 1,
          "action": "Step 1-5",
          "state": "pA finishes List A (len 5)",
          "explanation": "pA is redirected to headB (node 5)."
        },
        {
          "step": 2,
          "action": "Step 6",
          "state": "pB finishes List B (len 6)",
          "explanation": "pB is redirected to headA (node 4)."
        },
        {
          "step": 3,
          "action": "Step 8",
          "state": "Both arrive at node 8 simultaneously!",
          "explanation": "pA traveled 5 + 3 = 8 steps. pB traveled 6 + 2 = 8 steps. pA == pB == node 8."
        }
      ],
      "finalOutput": "Intersection identified at node 8 in O(1) space."
    },
    "visualExplanation": {
      "title": "The Two-Track Equalization Diagram",
      "description": "Path A + Path B equals Path B + Path A. Splicing the tracks conceptually into two parallel lanes of identical total length ensures the two runner pins hit the merge joint at the same time.",
      "features": [
        "Y-shaped merge junction",
        "Path concatenation visualization",
        "Equalized travel distance"
      ]
    },
    "pseudocode": {
      "title": "Intersection of Two Linked Lists",
      "code": "def get_intersection_node(headA, headB):\n    if not headA or not headB: return None\n    pA = headA\n    pB = headB\n    while pA != pB:\n        pA = pA.next if pA else headB\n        pB = pB.next if pB else headA\n    return pA # Either intersection node or None"
    },
    "pythonCode": {
      "title": "Intersection of Two Linked Lists in Python",
      "code": "class ListNode:\n    def __init__(self, x):\n        self.val = x\n        self.next = None\n\ndef get_intersection_node(headA, headB):\n    if not headA or not headB:\n        return None\n\n    pA, pB = headA, headB\n    while pA != pB:\n        # Move to next node or switch to opposite head\n        pA = pA.next if pA else headB\n        pB = pB.next if pB else headA\n\n    return pA\n\n# Build shared tail: 8 -> 4 -> 5\ncommon = ListNode(8)\ncommon.next = ListNode(4)\ncommon.next.next = ListNode(5)\n\n# List A: 4 -> 1 -> common\nheadA = ListNode(4)\nheadA.next = ListNode(1)\nheadA.next.next = common\n\n# List B: 5 -> 6 -> 1 -> common\nheadB = ListNode(5)\nheadB.next = ListNode(6)\nheadB.next.next = ListNode(1)\nheadB.next.next.next = common\n\nintersect = get_intersection_node(headA, headB)\nprint(\"Intersection node value:\", intersect.val if intersect else \"None\") # Expected: 8",
      "explanation": "Uses the two-pointer path switching technique to find intersection in O(1) space."
    },
    "runnableCode": {
      "code": "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\nshared = Node(99)\nlist1 = Node(1, Node(2, shared))\nlist2 = Node(10, shared)\n\n# Length difference approach\ndef get_len(n):\n    c = 0\n    while n: c += 1; n = n.next\n    return c\n\nlen1, len2 = get_len(list1), get_len(list2)\np1, p2 = list1, list2\nif len1 > len2:\n    for _ in range(len1 - len2): p1 = p1.next\nelse:\n    for _ in range(len2 - len1): p2 = p2.next\n\nwhile p1 != p2:\n    p1 = p1.next\n    p2 = p2.next\n\nprint(\"Intersection node value:\", p1.val if p1 else \"None\")",
      "expectedOutput": "Intersection node value: 99"
    },
    "lineByLineExplanation": [
      {
        "line": "17-20",
        "lines": "17-20",
        "code": "if len1 > len2:\n    for _ in range(len1 - len2): p1 = p1.next",
        "codeSnippet": "if len1 > len2:\n    for _ in range(len1 - len2): p1 = p1.next",
        "explanation": "Advances the pointer of the longer list by the difference in lengths."
      },
      {
        "line": "22-24",
        "lines": "22-24",
        "code": "while p1 != p2:\n    p1 = p1.next\n    p2 = p2.next",
        "codeSnippet": "while p1 != p2:\n    p1 = p1.next\n    p2 = p2.next",
        "explanation": "Marches both pointers in lockstep until they collide at the shared node."
      }
    ],
    "edgeCases": [
      {
        "case": "Lists do not intersect",
        "handling": "Both pointers reach None simultaneously and exit returning None.",
        "example": "Two parallel separate lists"
      },
      {
        "case": "Lists of equal length",
        "handling": "Pointers meet on first pass without switching heads.",
        "example": "lenA == lenB"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Comparing `node.val` instead of `node`.",
        "solution": "Two separate nodes can have the same value (e.g. both contain 1). Intersection requires testing memory reference identity `pA == pB`."
      },
      {
        "mistake": "Switching when `pA.next` is None instead of `pA` is None.",
        "solution": "Switching on `pA is None` ensures both pointers can reach None simultaneously when no intersection exists, preventing infinite loops."
      }
    ],
    "applications": [
      {
        "industry": "Git Version Control",
        "application": "Merge Base Detection",
        "benefit": "Finds the common ancestor commit where two Git branches diverged in linear time."
      },
      {
        "industry": "Memory Profilers",
        "application": "Shared Heap Object Detection",
        "benefit": "Identifies shared data references between independent execution threads."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-4-9-q1",
        "question": "Why does comparing values `pA.val == pB.val` fail for finding linked list intersection?",
        "hint": "Can different nodes have the same value?",
        "answer": "Two completely distinct lists can contain identical numbers (e.g. [1, 2] and [1, 2]). Intersection means two lists share the exact same physical node in memory (same memory address)."
      },
      {
        "id": "dsa-4-9-q2",
        "question": "What happens in the two-pointer switch method if the two lists do not intersect at all?",
        "hint": "How many total steps do both take?",
        "answer": "Both pointers will traverse lenA + lenB steps and become None at the exact same time. The loop exits because pA == pB (both are None), correctly returning None."
      },
      {
        "id": "dsa-4-9-q3",
        "question": "What is the maximum number of steps taken by the pointer switch method?",
        "hint": "Sum of lengths.",
        "answer": "At most lenA + lenB steps."
      }
    ],
    "quiz": [
      {
        "id": "dsa-4-9-quiz-1",
        "question": "What is the auxiliary space complexity of finding the intersection node of two linked lists using pointer switching?",
        "options": [
          "O(1)",
          "O(n + m)",
          "O(n)",
          "O(log(n + m))"
        ],
        "correctIndex": 0,
        "explanation": "The pointer switching technique only tracks two pointer variables (pA and pB), using strictly O(1) auxiliary space."
      },
      {
        "id": "dsa-4-9-quiz-2",
        "question": "If two linked lists have lengths a + c and b + c (where c is shared length), how many steps does each pointer travel before colliding in the pointer-switch algorithm?",
        "options": [
          "a + b + c",
          "a + b + 2c",
          "c",
          "(a + b) / 2"
        ],
        "correctIndex": 0,
        "explanation": "Pointer A travels (a + c) + b steps; Pointer B travels (b + c) + a steps. Both equal a + b + c steps."
      },
      {
        "id": "dsa-4-9-quiz-3",
        "question": "Why MUST you test pointer equality `pA == pB` rather than value equality `pA.val == pB.val`?",
        "options": [
          "Because two different nodes in separate lists can coincidentally hold the same data value",
          "Because Python does not allow reading values",
          "Because values change during traversal",
          "Because values are hashed"
        ],
        "correctIndex": 0,
        "explanation": "Intersection is defined by identity in memory (same node address). Two independent nodes can easily store identical numerical values without intersecting."
      }
    ],
    "codingChallenge": {
      "title": "Intersection of Two Linked Lists",
      "problem": "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return None.",
      "hints": [
        "Initialize pA = headA and pB = headB.",
        "When pA reaches None, redirect to headB. When pB reaches None, redirect to headA.",
        "Return pA when pA == pB."
      ],
      "starterCode": "class ListNode:\n    def __init__(self, x):\n        self.val = x\n        self.next = None\n\ndef get_intersection_node(headA, headB):\n    pA, pB = headA, headB\n    while pA != pB:\n        pA = pA.next if pA else headB\n        pB = pB.next if pB else headA\n    return pA",
      "solution": "def get_intersection_node(headA, headB):\n    pA, pB = headA, headB\n    while pA != pB:\n        pA = pA.next if pA else headB\n        pB = pB.next if pB else headA\n    return pA"
    },
    "summary": {
      "keyTakeaways": [
        "Linked list intersection is determined by pointer memory identity, not node values.",
        "Path switching equalizes distance to lenA + lenB in O(1) space.",
        "Length difference advance is an alternate O(1) space method.",
        "If lists do not intersect, both pointers terminate at None simultaneously."
      ],
      "nextLessonId": "dsa-stack-operations",
      "nextLessonTitle": "Stack Operations",
      "nextLessonModuleId": "dsa-module-5"
    },
    "lineByLine": [
      {
        "line": "17-20",
        "lines": "17-20",
        "code": "if len1 > len2:\n    for _ in range(len1 - len2): p1 = p1.next",
        "codeSnippet": "if len1 > len2:\n    for _ in range(len1 - len2): p1 = p1.next",
        "explanation": "Advances the pointer of the longer list by the difference in lengths."
      },
      {
        "line": "22-24",
        "lines": "22-24",
        "code": "while p1 != p2:\n    p1 = p1.next\n    p2 = p2.next",
        "codeSnippet": "while p1 != p2:\n    p1 = p1.next\n    p2 = p2.next",
        "explanation": "Marches both pointers in lockstep until they collide at the shared node."
      }
    ]
  }
};
