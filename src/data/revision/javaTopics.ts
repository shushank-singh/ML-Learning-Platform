import { RevisionTopic } from './types';

export const JAVA_REVISION_TOPICS: RevisionTopic[] = [
  {
    id: 'java-jvm-architecture',
    subject: 'java',
    category: 'JVM, JRE and JDK',
    title: 'JVM Architecture: Subsystems & Memory Layout',
    subtitle: 'ClassLoader, Runtime Data Areas, and JIT Compiler Engine',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['JVM', 'ClassLoader', 'JIT Compiler', 'Garbage Collector', 'Metaspace'],
    quickRecall: {
      oneLiner:
        'The JVM is an abstract computing machine that loads `.class` bytecode via ClassLoaders, manages memory in Runtime Data Areas, and executes code via the JIT compiler.',
      whenToUse:
        'Tuning production server performance (-Xms, -Xmx, Metaspace), diagnosing OutOfMemoryErrors, or optimizing GC pauses.',
      whyItMatters:
        'Write Once, Run Anywhere (WORA): The JVM abstracts OS and hardware details, enabling identical bytecode to run on Linux, Windows, or macOS.',
      keyPoints: [
        'ClassLoader Subsystem: Loading (Bootstrap, Extension/Platform, Application), Linking (Verification, Preparation, Resolution), Initialization.',
        'Runtime Data Areas: Shared across threads (Heap, Method Area/Metaspace); Thread-private (JVM Stack, Native Stack, PC Register).',
        'Execution Engine: Interpreter (line-by-line bytecode execution) + JIT Compiler (compiles frequently called hotspot loops to native machine code) + Garbage Collector.',
        'Metaspace (Java 8+): Replaced PermGen; allocated in native off-heap memory and auto-resizes.',
      ],
      formulaOrSyntax: {
        label: 'JVM Memory Flags',
        codeOrLatex: 'java -Xms2g -Xmx4g -XX:MaxMetaspaceSize=512m -XX:+UseG1GC MyApp',
        isLatex: false,
        language: 'bash',
      },
      complexity: {
        time: 'JIT Compilation: Fast near-C native execution for hot code paths',
        space: 'Heap bounds governed by -Xmx; thread stack by -Xss (default 1MB)',
      },
      commonMistakeOrTrap: {
        mistake: 'Confusing JDK (Development Kit), JRE (Runtime Environment), and JVM (Virtual Machine).',
        fix: 'JDK = JRE + Development Tools (javac, debugger); JRE = JVM + Core Java Class Libraries; JVM executes bytecode.',
        interviewTrap:
          'Question: "Where are static variables stored in Java 8+?" Answer: They are stored in the Java Heap inside the `Class` object, NOT in Metaspace (which stores class metadata and bytecode).',
      },
      examCheatsheet: [
        'Thread-Private: PC Register, JVM Stack, Native Method Stack',
        'Thread-Shared: Heap (Objects), Metaspace (Class Bytecode)',
        'JIT (Just-In-Time) compiles hot bytecode into native CPU assembly',
      ],
    },
    visual: {
      type: 'architecture',
      title: 'JVM Architectural Subsystem & Memory Block Diagram',
      caption:
        'ClassLoader loads `.class` bytecode into Metaspace; threads allocate Stack frames; all objects live on the Garbage-Collected Heap.',
      visualKey: 'java-jvm-architecture-viz',
      details: {
        steps: [
          { label: '1. ClassLoader', desc: 'Loads, verifies bytecodes, initializes static fields' },
          { label: '2. Runtime Areas', desc: 'Metaspace (classes), Heap (objects), Stacks (local variables)' },
          { label: '3. Execution Engine', desc: 'Interpreter + JIT compiler + Garbage Collector' },
        ],
      },
    },
    animation: {
      type: 'jvm-bytecode-jit-interactive',
      title: 'Interpreter to JIT Tiered Compilation Simulator',
      description:
        'Increase method invocation count from 1 to 10,000 to watch the Execution Engine trigger C1 and C2 JIT optimization.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Method Invocations (Hotspot Counter)',
        min: 100,
        max: 10000,
        step: 500,
        defaultVal: 1000,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following JVM memory regions is shared across ALL concurrent threads?',
        options: ['Program Counter (PC) Register', 'JVM Stack', 'Java Heap', 'Native Method Stack'],
        correctIndex: 2,
        explanation: 'The Java Heap is shared across all application threads for object allocations; stacks and PC registers are private per thread.',
      },
      {
        id: 'q2',
        question: 'What is the role of the JIT (Just-In-Time) compiler in the JVM Execution Engine?',
        options: [
          'It formats Java source code style',
          'It compiles frequently executed bytecode paths ("hotspots") directly into native machine code instructions for speed',
          'It checks SQL syntax in queries',
          'It deletes unused imports',
        ],
        correctIndex: 1,
        explanation: 'JIT identifies heavily executed code paths and compiles them into optimized native CPU machine instructions.',
      },
      {
        id: 'q3',
        question: 'What happens in Java 8 regarding PermGen (Permanent Generation)?',
        options: [
          'PermGen size was doubled',
          'PermGen was completely removed and replaced by native memory Metaspace',
          'PermGen was merged into the CPU cache',
          'PermGen is now stored in MySQL',
        ],
        correctIndex: 1,
        explanation: 'Java 8 eliminated PermGen and introduced Metaspace, which lives in native operating system memory and resizes automatically.',
      },
    ],
  },
  {
    id: 'java-stack-vs-heap',
    subject: 'java',
    category: 'Classes and Objects',
    title: 'Stack vs. Heap Memory & Object References',
    subtitle: 'Thread Frames, Reference Variables, and Garbage Collection Reachability',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Stack', 'Heap', 'Pass by Value', 'Garbage Collection', 'Escape Analysis'],
    quickRecall: {
      oneLiner:
        'Stack memory stores short-lived thread method call frames and primitive values; Heap memory stores all dynamically allocated objects and arrays.',
      whenToUse:
        'Understanding parameter passing ("pass-by-value" of reference handles) and analyzing Memory Leaks or `StackOverflowError`.',
      whyItMatters:
        'Java is STRICTLY pass-by-value; passing an object copies the reference pointer value, NOT the object payload itself.',
      keyPoints: [
        'Stack Memory: Fast, LIFO structure, managed automatically with method entry/exit; throws `StackOverflowError` if frames exceed capacity.',
        'Heap Memory: Managed by Garbage Collector; throws `OutOfMemoryError: Java heap space` when full.',
        'Escape Analysis: JIT compiler can allocate objects directly on the stack if they never escape the declaring method scope!',
        'Reassigning a method parameter pointer `obj = new Object()` has ZERO effect on the original caller\'s variable.',
      ],
      formulaOrSyntax: {
        label: 'Pointer Variable Allocation',
        codeOrLatex: 'public void example() {\n    int x = 10;                // Primitive on STACK\n    Person p = new Person();   // Reference on STACK -> Object on HEAP\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Stack allocation/deallocation: O(1) pointer adjustment',
        space: 'Heap GC overhead depends on collector (G1, ZGC)',
      },
      commonMistakeOrTrap: {
        mistake: 'Believing Java is "pass-by-reference" for objects.',
        fix: 'Java is ALWAYS pass-by-value. For objects, the value being passed is the memory address reference handle.',
        interviewTrap:
          'Question: "If method `swap(Person a, Person b)` swaps variables `Person temp = a; a = b; b = temp;`, does caller see them swapped?" Answer: NO! Only the local stack copies of the reference pointers were swapped; caller\'s pointers remain unchanged.',
      },
      examCheatsheet: [
        'Stack: Local primitive variables + reference pointers (1MB per thread)',
        'Heap: All class instances and array data',
        'Java is 100% pass-by-value (copies bits of primitive or pointer)',
      ],
    },
    visual: {
      type: 'memory-layout',
      title: 'Stack Frame Local Variables Pointing to Heap Instances',
      caption:
        'Stack frames push/pop with method calls. Reference `p` holds the 64-bit heap address 0x4A20 pointing to `new Person()`.',
      visualKey: 'java-stack-heap-viz',
      details: {
        comparison: {
          headers: ['Feature', 'Stack Memory', 'Heap Memory'],
          rows: [
            ['Allocation Scope', 'Per Thread (Private)', 'Global (Shared by all threads)'],
            ['Contents', 'Local primitives & object references', 'All Objects, Arrays, and Instance fields'],
            ['Lifecycle', 'Automatic on method return (LIFO)', 'Garbage Collector reachability analysis'],
            ['Overflow Error', 'java.lang.StackOverflowError', 'java.lang.OutOfMemoryError: Java heap space'],
          ],
        },
      },
    },
    animation: {
      type: 'stack-heap-lifecycle-interactive',
      title: 'Call Stack Frame Push & Pop Animator',
      description:
        'Step through nested method invocations to watch stack frames push, allocate heap objects, and pop frames on return.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Method Execution Step',
        min: 1,
        max: 4,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Where is an instance variable of primitive type `int age` stored in Java?',
        options: [
          'Always on the Stack',
          'On the Heap as part of the enclosing object payload',
          'In Metaspace',
          'In CPU register L1',
        ],
        correctIndex: 1,
        explanation: 'Local variables inside methods live on the stack; instance fields of an object live on the heap inside that object’s memory block.',
      },
      {
        id: 'q2',
        question: 'What happens when deep recursion without a base case occurs in Java?',
        options: [
          'OutOfMemoryError: Java heap space',
          'StackOverflowError',
          'NullPointerException',
          'The JVM freezes indefinitely',
        ],
        correctIndex: 1,
        explanation: 'Each recursive call pushes a new stack frame; exhausting the thread stack size (-Xss) triggers a `StackOverflowError`.',
      },
      {
        id: 'q3',
        question: 'Why does passing an object reference into a method allow you to modify its fields (e.g. `p.setName("Alice")`), but not reassign the caller\'s object (`p = new Person()`)?',
        options: [
          'Because the object reference address is passed by value (copied); modifying via the copied handle mutates the shared heap object, but reassigning the copy only alters the local stack variable',
          'Because Java objects are read-only',
          'Because garbage collection runs immediately',
          'Because compilers forbid assignments',
        ],
        correctIndex: 0,
        explanation: 'Java copies the address pointer; dereferencing it accesses the shared heap object, but overwriting the local variable has no effect on the caller’s pointer.',
      },
    ],
  },
  {
    id: 'java-string-pool',
    subject: 'java',
    category: 'Strings and StringBuilder',
    title: '`String` Pool vs. `StringBuilder` vs. `StringBuffer`',
    subtitle: 'Immutability, Constant Pool Interning, and Mutable Buffers',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['String Pool', 'StringBuilder', 'StringBuffer', 'Immutability', 'intern()'],
    quickRecall: {
      oneLiner:
        '`String` is immutable and cached in the String Constant Pool; `StringBuilder` is a fast mutable char buffer (not thread-safe); `StringBuffer` is synchronized (thread-safe).',
      whenToUse:
        'Use `String` for immutable constants/keys; use `StringBuilder` inside loops for concatenations; use `StringBuffer` only for legacy multithreaded code.',
      whyItMatters:
        'Doing `str += "a"` inside a loop of 10,000 iterations creates 10,000 intermediate string objects on the Heap (O(N²) time)! `StringBuilder.append()` is O(N).',
      keyPoints: [
        'String Pool: Specialized storage area in Java Heap for deduplicating string literals.',
        '`String s1 = "abc"; String s2 = "abc";` → `s1 == s2` is TRUE (same pooled instance).',
        '`String s3 = new String("abc");` forces a brand new object on the regular heap → `s1 == s3` is FALSE.',
        '`s3.intern()` returns the canonical instance from the pool.',
        'Why String is immutable in Java: Security (network/file paths), Caching hashCodes (for HashMap keys), Thread safety.',
      ],
      formulaOrSyntax: {
        label: 'String Creation Differences',
        codeOrLatex: 'String s1 = "Java";               // In String Pool\nString s2 = new String("Java");   // On regular Heap\ns1 == s2;                         // false\ns1.equals(s2);                    // true\ns1 == s2.intern();                // true',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'String concat in loop: O(N²) | StringBuilder.append: Amortized O(1)',
        space: 'Compact Strings (Java 9+) uses byte[] with LATIN1/UTF16 coder flag',
      },
      commonMistakeOrTrap: {
        mistake: 'Using `==` instead of `.equals()` to compare string contents.',
        fix: '`==` compares memory addresses (identity); `.equals()` compares character sequences (equality).',
        interviewTrap:
          'Question: "How many objects are created by `String s = new String(\"hello\");`?" Answer: Either 1 or 2! One object is guaranteed on the Heap (`new String()`), and one literal in the String Pool if "hello" did not already exist.',
      },
      examCheatsheet: [
        '`String`: Immutable, Thread-safe, HashCode cached',
        '`StringBuilder`: Mutable, Fastest, Not thread-safe',
        '`StringBuffer`: Mutable, Thread-safe (synchronized methods), Slower',
        '`s.intern()` places string into pool and returns canonical reference',
      ],
    },
    visual: {
      type: 'memory-layout',
      title: 'String Constant Pool vs. Standard Heap Allocations',
      caption:
        'Literals "Java" share the single canonical entry in String Pool. `new String("Java")` allocates an isolated heap wrapper.',
      visualKey: 'java-string-pool-viz',
      details: {
        comparison: {
          headers: ['Class', 'Mutability', 'Thread Safe?', 'Performance Speed', 'Common Use Case'],
          rows: [
            ['String', 'Immutable', 'Yes (Inherently)', 'Slow for repeated loops', 'Constants, Map keys, entity fields'],
            ['StringBuilder', 'Mutable (char[] / byte[])', 'No (Fast unsynchronized)', 'Fastest (Amortized O(1))', 'Loops, query building, formatting'],
            ['StringBuffer', 'Mutable', 'Yes (synchronized)', 'Slower due to lock overhead', 'Legacy concurrent code'],
          ],
        },
      },
    },
    animation: {
      type: 'string-pool-intern-interactive',
      title: 'String Pool Memory Map Interactive',
      description:
        'Click between Literal Declaration, `new String()`, and `.intern()` to watch pointer connections route to Pool vs Heap.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Allocation Code',
        options: ['String a = "test"', 'String b = new String("test")', 'String c = b.intern()'],
        defaultVal: 'String a = "test"',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the output of `String a = "cat"; String b = "cat"; System.out.println(a == b);`?',
        options: ['false', 'true', 'Compilation Error', 'NullPointerException'],
        correctIndex: 1,
        explanation: 'Both literal references point to the exact same canonical string instance in the String Constant Pool.',
      },
      {
        id: 'q2',
        question: 'Why should you use `StringBuilder` instead of `+` concatenation inside a loop of 5,000 iterations?',
        options: [
          'Because `+` throws an exception in loops',
          'Because `+` creates a new String and copies the buffer on each step, leading to O(N²) time and massive GC garbage',
          'Because `StringBuilder` automatically sorts the letters',
          'Because `StringBuilder` writes directly to disk',
        ],
        correctIndex: 1,
        explanation: 'Repeated string concatenation creates thousands of throwaway intermediate string objects, degrading performance quadratically.',
      },
      {
        id: 'q3',
        question: 'Where is the String Constant Pool located in modern Java (Java 7+)?',
        options: ['In PermGen off-heap', 'In the Main Java Heap', 'In CPU L2 cache', 'On the local thread stack'],
        correctIndex: 1,
        explanation: 'Since Java 7, the String Constant Pool was moved directly into the main Java Heap and is subject to standard Garbage Collection.',
      },
    ],
  },
  {
    id: 'java-equals-hashcode',
    subject: 'java',
    category: 'Classes and Objects',
    title: '`==` vs. `.equals()` & `hashCode()` Contract',
    subtitle: 'Identity, Value Equivalence, and Hash Bucket Uniformity',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['equals', 'hashCode', 'HashMap', 'Contract', 'Object Class'],
    quickRecall: {
      oneLiner:
        '`==` compares memory references; `.equals()` compares logical values; the `equals-hashCode` contract requires that equal objects must have identical hash codes.',
      whenToUse:
        'Whenever creating custom entity or domain classes that will be stored in `HashMap`, `HashSet`, or `HashTable`.',
      whyItMatters:
        'Violating the contract causes objects to disappear inside `HashMap` or `HashSet` lookups even when present!',
      keyPoints: [
        'Contract Rule 1: If `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` MUST be true.',
        'Contract Rule 2: If `a.hashCode() == b.hashCode()`, `a.equals(b)` is NOT necessarily true (hash collision).',
        'Default `Object` implementation: `equals()` checks reference identity `this == obj`; `hashCode()` returns memory-derived integer.',
        'Must override both: Overriding `equals()` without `hashCode()` breaks all Hash-based collections.',
      ],
      formulaOrSyntax: {
        label: 'Idiomatic hashCode & equals Pattern',
        codeOrLatex: '@Override\npublic boolean equals(Object o) {\n    if (this == o) return true;\n    if (!(o instanceof Person)) return false;\n    Person p = (Person) o;\n    return id == p.id && Objects.equals(name, p.name);\n}\n@Override\npublic int hashCode() { return Objects.hash(id, name); }',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'equals(): O(fields) comparison | hashCode(): O(fields) hash compute',
        space: 'O(1)',
      },
      commonMistakeOrTrap: {
        mistake: 'Using mutable fields in `hashCode()` and mutating the object after inserting it as a `HashMap` key.',
        fix: 'If fields change, the hashcode changes, and `map.get(key)` calculates a different bucket, making the entry permanently lost!',
        interviewTrap:
          'Question: "Can `hashCode()` return a negative integer in Java?" Answer: Yes! The return type is signed 32-bit `int` (-2³¹ to 2³¹-1). That is why HashMap uses `(h & 0x7FFFFFFF) % length` or `(n - 1) & (h ^ (h >>> 16))`.',
      },
      examCheatsheet: [
        'If `equals()` is true, `hashCode()` MUST be equal',
        'If `hashCode()` is equal, `equals()` can be true or false (collision)',
        'Always use immutable fields for HashMap keys',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'HashMap Bucket Routing: HashCode → Bucket Index → Equals Check',
      caption:
        'Step 1: Compute `hashCode()` to find bucket. Step 2: Traverse linked list / tree calling `.equals()` to identify the exact key.',
      visualKey: 'java-equals-hashcode-viz',
      details: {
        steps: [
          { label: 'Step 1: Hash Calculation', desc: 'h = key.hashCode() ^ (h >>> 16) [Spread high bits]' },
          { label: 'Step 2: Bucket Index', desc: 'index = (n - 1) & h [Fast bitwise modulo]' },
          { label: 'Step 3: Equals Match', desc: 'Scan bucket nodes comparing key.equals(targetKey)' },
        ],
      },
    },
    animation: {
      type: 'hashcode-lookup-interactive',
      title: 'HashMap Key Lookup Step-by-Step Tracer',
      description:
        'Watch a query for key "Alice" compute hashcode 42, jump to Bucket 2, and compare `.equals()` along the node chain.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Lookup Key Scenario',
        options: ['Key Exists (Match found)', 'Hash Collision (Traverses 2 nodes)', 'Key Not Found'],
        defaultVal: 'Key Exists (Match found)',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'If two objects `x` and `y` are equal according to `x.equals(y)`, what MUST be true?',
        options: [
          'They must be the exact same memory address (x == y)',
          'x.hashCode() must equal y.hashCode()',
          'Their class names must be less than 8 characters',
          'They must be declared final',
        ],
        correctIndex: 1,
        explanation: 'The Java equals-hashCode contract dictates that equal objects must produce identical hash codes.',
      },
      {
        id: 'q2',
        question: 'What happens if you override `equals()` in a class but forget to override `hashCode()`?',
        options: [
          'The Java compiler throws a compilation error',
          'The class cannot be instantiated',
          'Instances will fail to be retrieved from HashMaps and HashSets because two logically equal objects will hash to different buckets',
          'The garbage collector crashes',
        ],
        correctIndex: 2,
        explanation: 'Inheriting the default `Object.hashCode()` produces different hashes for separate instances, scattering equal objects across different buckets.',
      },
      {
        id: 'q3',
        question: 'Why should custom objects used as HashMap keys be immutable?',
        options: [
          'Because Java does not allow mutable objects',
          'If a key\'s fields change after insertion, its hashCode changes, making it impossible to find in its original bucket',
          'Immutable objects take 0 bytes of RAM',
          'To prevent garbage collection',
        ],
        correctIndex: 1,
        explanation: 'Mutating key fields alters its hashcode, stranding the entry in a bucket that no longer corresponds to the updated hash.',
      },
    ],
  },
  {
    id: 'java-inheritance-polymorphism',
    subject: 'java',
    category: 'Inheritance and Polymorphism',
    title: 'Inheritance, Overriding & Dynamic Binding',
    subtitle: 'Compile-Time Overloading vs. Runtime Virtual Method Dispatch',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Inheritance', 'Polymorphism', 'Overriding', 'Dynamic Dispatch', 'vtable'],
    quickRecall: {
      oneLiner:
        'Method Overloading is resolved at compile time based on parameter types; Method Overriding is resolved at runtime via dynamic dispatch (vtable) based on the actual object instance.',
      whenToUse:
        'Building extensible object-oriented architectures where subclasses customize base behaviors.',
      whyItMatters:
        'Enables polymorphic code: `Animal a = new Dog(); a.makeSound();` executes `Dog.makeSound()` dynamically.',
      keyPoints: [
        'Method Overloading: Same method name, different parameter signature in the same class (Static Polymorphism).',
        'Method Overriding: Subclass replaces inherited method with identical signature and return type (Dynamic Polymorphism).',
        'Rules for `@Override`: Return type can be covariant (subtype); access modifier cannot be more restrictive; cannot throw broader checked exceptions.',
        '`static`, `private`, and `final` methods cannot be overridden (they use static binding).',
      ],
      formulaOrSyntax: {
        label: 'Dynamic Dispatch Syntax',
        codeOrLatex: 'Animal a = new Dog(); // Parent reference -> Child instance\na.sound();            // Executes Dog.sound() via vtable lookup at runtime',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Virtual dispatch: O(1) single-pointer offset in vtable',
        space: '1 vtable per class stored in Metaspace',
      },
      commonMistakeOrTrap: {
        mistake: 'Attempting to override a `static` method.',
        fix: 'Static methods belong to the class, not instances; declaring the same static method in a subclass is Method Hiding, not overriding.',
        interviewTrap:
          'Question: "Can fields (variables) be overridden in Java?" Answer: NO! Fields cannot be polymorphic. If a subclass declares a field with the same name, it shadows/hides the parent field; reference type dictates which field is accessed!',
      },
      examCheatsheet: [
        'Overloading = Compile-time (Static binding), signature must differ',
        'Overriding = Runtime (Dynamic binding via vtable), signature must match',
        'Variables (fields) and static methods CANNOT be overridden (they shadow)',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Virtual Method Table (vtable) Resolution Mechanism',
      caption:
        'Variable of type `Animal` holding instance of `Dog`. JVM inspects the object header to query the `Dog vtable` pointer table.',
      visualKey: 'java-polymorphism-viz',
      details: {
        comparison: {
          headers: ['Feature', 'Method Overloading', 'Method Overriding'],
          rows: [
            ['Resolution Time', 'Compile-time (Static)', 'Runtime (Dynamic vtable dispatch)'],
            ['Location', 'Same class or inherited', 'Subclass extending superclass'],
            ['Signature', 'MUST be different (param types/count)', 'MUST be identical'],
            ['Private/Final methods', 'Can be overloaded', 'CANNOT be overridden'],
          ],
        },
      },
    },
    animation: {
      type: 'vtable-dispatch-interactive',
      title: 'Runtime Virtual Method Dispatch Simulator',
      description:
        'Toggle between `new Dog()` and `new Cat()` to see how the runtime vtable redirects the `makeSound()` call.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Instantiated Child Class',
        options: ['new Dog() -> Woof', 'new Cat() -> Meow', 'new Bird() -> Chirp'],
        defaultVal: 'new Dog() -> Woof',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Given `Parent p = new Child(); System.out.println(p.x);` where both classes have `int x`, which field is printed?',
        options: [
          'Child.x',
          'Parent.x because fields in Java are not polymorphic and are resolved by reference type',
          'Throws a NoSuchFieldError',
          'Prints 0',
        ],
        correctIndex: 1,
        explanation: 'Fields in Java do not participate in dynamic dispatch; they are shadowed, and the compiler binds to the reference type (Parent).',
      },
      {
        id: 'q2',
        question: 'Which modifier prevents a method from being overridden by any subclass?',
        options: ['static', 'abstract', 'final', 'volatile'],
        correctIndex: 2,
        explanation: 'Marking a method `final` tells the JVM that the method implementation cannot be overridden by subclasses.',
      },
      {
        id: 'q3',
        question: 'What is a covariant return type in method overriding?',
        options: [
          'A return type that must be void',
          'An overriding method in a subclass returning a subtype of the return type declared in the superclass method',
          'A method returning multiple values',
          'A method returning a generic array',
        ],
        correctIndex: 1,
        explanation: 'Since Java 5, an overriding method can narrow the return type to a more specific subclass of the original return type.',
      },
    ],
  },
  {
    id: 'java-interfaces-abstract',
    subject: 'java',
    category: 'Interfaces and Abstract Classes',
    title: 'Interfaces vs. Abstract Classes',
    subtitle: 'Contract Specifications, Multiple Inheritance, and Default Methods',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Interfaces', 'Abstract Classes', 'Default Methods', 'Multiple Inheritance'],
    quickRecall: {
      oneLiner:
        'An abstract class defines an "IS-A" hierarchy with state (instance variables) and constructors; an interface defines a "CAN-DO" capability contract with multiple implementation support.',
      whenToUse:
        'Use abstract classes for code sharing across closely related classes; use interfaces to define public APIs and peripheral capabilities across unrelated classes.',
      whyItMatters:
        'Java supports multiple interface inheritance (`implements A, B, C`), but only single class inheritance (`extends Parent`).',
      keyPoints: [
        'State: Abstract classes can have instance variables and state; interfaces can only have `public static final` constants.',
        'Constructors: Abstract classes have constructors (invoked via `super()`); interfaces CANNOT have constructors.',
        'Java 8+ Interfaces: Can contain `default` methods (with implementations) and `static` utility methods.',
        'Java 9+ Interfaces: Can contain `private` helper methods for sharing code between default methods.',
      ],
      formulaOrSyntax: {
        label: 'Interface with Default Method',
        codeOrLatex: 'public interface Flyable {\n    void fly(); // Abstract method\n    default void glide() { System.out.println("Gliding..."); }\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Interface method dispatch: Itable lookup O(1) to O(k)',
        space: 'Interface metadata in Metaspace',
      },
      commonMistakeOrTrap: {
        mistake: 'Assuming `default` methods in interfaces make abstract classes obsolete.',
        fix: 'Interfaces still cannot hold mutable instance state or define constructors; abstract classes remain essential for shared state.',
        interviewTrap:
          'Question: "What happens if a class implements two interfaces that declare identical default methods?" Answer: The Diamond Problem! The compiler forces the implementing class to explicitly override the conflicting method and specify `InterfaceA.super.method()`.',
      },
      examCheatsheet: [
        'Single class inheritance (`extends`), Multiple interface implementation (`implements`)',
        'Abstract class: Can have instance fields, constructors, any access modifiers',
        'Interface: Only `public static final` fields, no constructors, methods public by default',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'Architectural Comparison: Abstract Class vs. Interface',
      caption:
        'Contrast of inheritance mechanics, state persistence, constructor support, and method types.',
      visualKey: 'java-interface-matrix',
      details: {
        comparison: {
          headers: ['Feature', 'Abstract Class', 'Interface (Java 8+)'],
          rows: [
            ['Relationship', 'IS-A (Strong conceptual coupling)', 'CAN-DO (Behavioral contract)'],
            ['Multiple Inheritance', 'No (Single inheritance only)', 'Yes (Can implement multiple interfaces)'],
            ['State (Instance fields)', 'Yes (Private, protected, public)', 'No (Only `public static final` constants)'],
            ['Constructors', 'Yes (Called via `super()`)', 'No (Cannot have constructors)'],
            ['Method Implementations', 'Can implement any methods', 'Only `default`, `static`, and `private` methods'],
          ],
        },
      },
    },
    animation: {
      type: 'interface-diamond-interactive',
      title: 'Diamond Problem Resolution Simulator',
      description:
        'Watch two interfaces with colliding `default void log()` methods require an explicit resolution override in the implementing class.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Resolution Strategy',
        options: ['Call InterfaceA.super.log()', 'Call InterfaceB.super.log()', 'Provide Custom Child Override'],
        defaultVal: 'Call InterfaceA.super.log()',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Can an interface in modern Java have non-abstract methods with a body?',
        options: [
          'No, interfaces can only have abstract method signatures',
          'Yes, using `default`, `static`, or `private` keywords',
          'Only if the class extends Object directly',
          'Only in Android Java',
        ],
        correctIndex: 1,
        explanation: 'Since Java 8 (`default`, `static`) and Java 9 (`private`), interfaces can define concrete method implementations.',
      },
      {
        id: 'q2',
        question: 'Which of the following can an abstract class have that an interface CANNOT have?',
        options: ['A public method', 'A constructor and non-static instance variables', 'A static constant', 'A main method'],
        correctIndex: 1,
        explanation: 'Interfaces cannot have constructors or mutable instance variables; all fields in interfaces are implicitly public static final.',
      },
      {
        id: 'q3',
        question: 'How many classes can a Java class extend simultaneously?',
        options: ['Exactly 1', 'Up to 3', 'Unlimited', 'Depends on available RAM'],
        correctIndex: 0,
        explanation: 'Java enforces single class inheritance to eliminate the complexity of multi-base class memory layouts and diamond problems.',
      },
    ],
  },
  {
    id: 'java-hashmap-internals',
    subject: 'java',
    category: 'ArrayList, HashMap, HashSet and Queue',
    title: 'HashMap Internals: Bucketing & Treeification',
    subtitle: 'Node Arrays, Hash Bit Shifting, and Red-Black Trees',
    difficulty: 'Advanced',
    isInterviewFavorite: true,
    readTimeSeconds: 55,
    tags: ['HashMap', 'Buckets', 'Red-Black Tree', 'Treeify', 'Load Factor'],
    quickRecall: {
      oneLiner:
        'HashMap is an array of buckets (`Node<K,V>[] table`) using hash perturbation and bitwise masking; collision chains treeify into Red-Black Trees when length exceeds 8.',
      whenToUse:
        'High-performance key-value lookups, caching, and indexed storage with average O(1) performance.',
      whyItMatters:
        'Prior to Java 8, hash collisions caused severe O(N) DoS vulnerability; Java 8+ treeification guarantees worst-case O(log N) operations.',
      keyPoints: [
        'Default capacity: 16 buckets; Default load factor: 0.75 (resizes when size reaches 12 elements).',
        'Hash perturbation: `(h = key.hashCode()) ^ (h >>> 16)` spreads high bits into low bits to reduce collisions.',
        'Bucket index calculation: `index = (capacity - 1) & hash` (capacity is always a power of 2 for fast bitwise AND).',
        'Treeification: When a bucket chain length reaches TREEIFY_THRESHOLD (8) AND table capacity ≥ 64, linked list converts into a Red-Black Tree.',
      ],
      formulaOrSyntax: {
        label: 'Bucket Index Calculation',
        codeOrLatex: '\\text{index} = (\\text{table.length} - 1) \\;\\&\\; (h \\oplus (h \\gg 16))',
        isLatex: true,
      },
      complexity: {
        time: 'Get/Put: Average O(1) | Worst case O(\\log N) [Red-Black Tree]',
        space: 'O(N) memory + table array overhead',
      },
      commonMistakeOrTrap: {
        mistake: 'Using `HashMap` across multiple threads without synchronization.',
        fix: 'HashMap is NOT thread-safe. Concurrent modifications can corrupt node links. Use `ConcurrentHashMap` for multithreaded systems.',
        interviewTrap:
          'Question: "Why is the HashMap capacity always a power of 2?" Answer: Because `(length - 1) & hash` is mathematically identical to `hash % length` ONLY when length is a power of 2, allowing ultra-fast bitwise masking.',
      },
      examCheatsheet: [
        'Treeify threshold = 8 (converts linked list to Red-Black Tree)',
        'Untreeify threshold = 6 (converts tree back to linked list during shrink)',
        'Capacity always power of 2 (16, 32, 64...) for `(n-1) & hash` bitwise index',
        'Load factor 0.75 balances time vs. memory overhead',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'HashMap Memory Structure: Array of Buckets to Red-Black Tree',
      caption:
        'Buckets 0 to N-1 contain singly-linked lists of `Node<K, V>`. Bucket 5 exceeds 8 items and transforms into a balanced Red-Black Tree.',
      visualKey: 'java-hashmap-internals-viz',
      details: {
        comparison: {
          headers: ['Metric', 'LinkedList Bin (< 8 nodes)', 'TreeNode Bin (≥ 8 nodes)'],
          rows: [
            ['Data Structure', 'Singly Linked List (`Node<K,V>`)', 'Balanced Red-Black Tree (`TreeNode<K,V>`)'],
            ['Search Runtime', 'O(k) where k < 8', 'O(log k) guaranteed worst-case'],
            ['Memory Footprint', 'Small (2 pointers: key, value, next)', 'Large (~2x list node size: parent, left, right, color)'],
          ],
        },
      },
    },
    animation: {
      type: 'hashmap-treeify-interactive',
      title: 'Bucket Chain Collision & Treeification Simulator',
      description:
        'Insert colliding keys into Bucket 3 one-by-one from 1 to 9 to watch the linked list snap into a balanced Red-Black Tree.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Colliding Nodes in Bucket',
        min: 1,
        max: 9,
        step: 1,
        defaultVal: 7,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Under what condition does a HashMap bucket list convert into a balanced Red-Black Tree in Java 8+?',
        options: [
          'When the JVM runs out of memory',
          'When the bucket chain reaches 8 elements AND the total table capacity is at least 64',
          'Whenever any collision occurs',
          'Only when all keys are Strings',
        ],
        correctIndex: 1,
        explanation: 'Java requires both bucket length ≥ 8 and total table capacity ≥ 64; if capacity < 64, it resizes the table instead of treeifying.',
      },
      {
        id: 'q2',
        question: 'Why does HashMap require its capacity to always be a power of 2 (e.g. 16, 32, 64)?',
        options: [
          'To enable fast bitwise AND `(capacity - 1) & hash` instead of slow integer division modulo `%`',
          'Because CPU transistors are binary',
          'It is required by the Collections interface',
          'To ensure all hashcodes are positive',
        ],
        correctIndex: 0,
        explanation: 'Bitwise `(n - 1) & hash` operates in a single CPU cycle and accurately mimics modulo arithmetic when n is a power of 2.',
      },
      {
        id: 'q3',
        question: 'What is the worst-case time complexity of `map.get(key)` in Java 8+?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 1,
        explanation: 'Because heavily colliding buckets convert into balanced Red-Black Trees, worst-case search complexity is bounded at O(log N).',
      },
    ],
  },
  {
    id: 'java-checked-unchecked-exceptions',
    subject: 'java',
    category: 'Exception Handling',
    title: 'Exception Hierarchy: Checked vs. Unchecked',
    subtitle: 'Compile-Time Enforcement vs. Runtime Programming Errors',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Exceptions', 'Checked Exceptions', 'RuntimeException', 'Error', 'Throws'],
    quickRecall: {
      oneLiner:
        'Checked exceptions (subclasses of `Exception` except `RuntimeException`) are verified at compile time; Unchecked exceptions (`RuntimeException`) represent programmer errors.',
      whenToUse:
        'Use checked exceptions for recoverable external conditions (e.g. `FileNotFoundException`); use unchecked for invalid arguments or state bugs (`NullPointerException`).',
      whyItMatters:
        'Checked exceptions force callers to explicitly handle with `try-catch` or declare in the method signature with `throws`.',
      keyPoints: [
        '`Throwable` is the root class; splits into `Error` (serious system failure: `OutOfMemoryError`) and `Exception`.',
        'Checked: Inherits from `Exception`; compiler mandates handling (`IOException`, `SQLException`).',
        'Unchecked: Inherits from `RuntimeException`; compiler does NOT mandate handling (`NullPointerException`, `IndexOutOfBoundsException`).',
        'Try-with-resources: Automatically closes resources implementing `AutoCloseable` at the end of the block.',
      ],
      formulaOrSyntax: {
        label: 'Try-With-Resources Pattern',
        codeOrLatex: '// AutoCloseable resource automatically closed!\ntry (BufferedReader br = new BufferedReader(new FileReader(path))) {\n    return br.readLine();\n} catch (IOException e) {\n    logger.error("Failed to read", e);\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Exception throw: Expensive stack trace fill `fillInStackTrace()`',
        space: 'O(depth) for stack trace frames array',
      },
      commonMistakeOrTrap: {
        mistake: 'Catching `Throwable` or swallowing exceptions silently with an empty `catch` block.',
        fix: 'Swallowing exceptions hides critical bugs; always log or wrap in a domain-specific `RuntimeException`.',
        interviewTrap:
          'Question: "Can `Error` be caught with a `try-catch` block?" Answer: Yes, because `Error` extends `Throwable`. However, you should NEVER catch `Error` (like `OutOfMemoryError` or `StackOverflowError`) because the JVM state is irrecoverably compromised.',
      },
      examCheatsheet: [
        'Checked = Subclasses of `Exception` (NOT RuntimeException), checked at compile time',
        'Unchecked = `RuntimeException` & its subclasses, not checked at compile time',
        '`Error` = Serious hardware/JVM failures, should not be caught',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Java `Throwable` Inheritance Hierarchy Tree',
      caption:
        'Clear separation between compile-time enforced Checked Exceptions vs. Runtime Exceptions vs. JVM Errors.',
      visualKey: 'java-exception-hierarchy-viz',
      details: {
        steps: [
          { label: 'Throwable', desc: 'Root ancestor class of all errors and exceptions in Java' },
          { label: 'Error', desc: 'System-level unrecoverable failures (OutOfMemoryError, StackOverflowError)' },
          { label: 'Checked Exception', desc: 'Recoverable conditions (IOException, SQLException) enforced by compiler' },
          { label: 'RuntimeException', desc: 'Unchecked programming bugs (NullPointerException, IllegalArgumentException)' },
        ],
      },
    },
    animation: {
      type: 'try-with-resources-interactive',
      title: 'Try-With-Resources Auto-Close Order Tracer',
      description:
        'Watch multiple nested streams close in reverse order of declaration even when an exception is thrown in the middle.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Execution Condition',
        options: ['Normal Stream Flow', 'IOException during readLine()'],
        defaultVal: 'Normal Stream Flow',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following is an Unchecked Exception in Java?',
        options: ['IOException', 'SQLException', 'NullPointerException', 'ClassNotFoundException'],
        correctIndex: 2,
        explanation: '`NullPointerException` extends `RuntimeException`, making it an unchecked exception that the compiler does not force you to declare.',
      },
      {
        id: 'q2',
        question: 'What interface must an object implement to be used in a `try-with-resources` statement?',
        options: ['java.io.Serializable', 'java.lang.AutoCloseable', 'java.lang.Cloneable', 'java.lang.Runnable'],
        correctIndex: 1,
        explanation: 'Any resource implementing `AutoCloseable` or `Closeable` can be managed automatically by try-with-resources.',
      },
      {
        id: 'q3',
        question: 'Why is creating and throwing exceptions in Java computationally expensive for hot loops?',
        options: [
          'Because it restarts the JVM',
          'Because the JVM must traverse the call stack to populate the stack trace array (`fillInStackTrace()`)',
          'Because it forces a hard disk sync',
          'Because it invokes garbage collection on all threads',
        ],
        correctIndex: 1,
        explanation: 'Generating the execution stack trace requires walking through every native and bytecode frame, incurring non-trivial CPU overhead.',
      },
    ],
  },
  {
    id: 'java-arraylist-vs-linkedlist',
    subject: 'java',
    category: 'Collections Framework',
    title: 'ArrayList vs. LinkedList Performance Traps',
    subtitle: 'Contiguous CPU Cache Lines vs. Dispersed Heap Node Pointers',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['ArrayList', 'LinkedList', 'CPU Cache', 'Memory Locality', 'Collections'],
    quickRecall: {
      oneLiner:
        '`ArrayList` is backed by a contiguous array with O(1) random access and excellent CPU cache locality; `LinkedList` is a doubly linked list with O(1) pointer updates but poor spatial locality.',
      whenToUse:
        'Almost ALWAYS use `ArrayList` (99.9% of production cases); rarely use `LinkedList` except when implementing FIFO Queues/Deques (and even then, `ArrayDeque` is faster!).',
      whyItMatters:
        'Even for inserting elements in the middle, `ArrayList` frequently beats `LinkedList` in real-world benchmarks because scanning to index i in LinkedList incurs sequential CPU cache misses!',
      keyPoints: [
        'ArrayList Growth: Resizes by 50% (`newCapacity = oldCapacity + (oldCapacity >> 1)`) via `Arrays.copyOf()`.',
        'Memory Footprint: `ArrayList` uses contiguous 8-byte pointer slots; `LinkedList` wraps every element in a 24-byte `Node` object (item, next, prev).',
        'Spatial Locality: Hardware CPU caches pre-fetch contiguous array blocks; linked list pointer chasing thrashes L1/L2 cache lines.',
        'Deque Alternative: Use `ArrayDeque` instead of `LinkedList` for stacks and queues; it is faster and uses less memory.',
      ],
      formulaOrSyntax: {
        label: 'ArrayList Growth Formula',
        codeOrLatex: '\\text{newCapacity} = \\text{oldCapacity} + (\\text{oldCapacity} \\gg 1) \\quad (1.5\\times)',
        isLatex: true,
      },
      complexity: {
        time: 'Random Access: ArrayList O(1) vs LinkedList O(N) | Add to End: Amortized O(1) both',
        space: 'LinkedList has ~3x memory overhead per element due to Node wrappers',
      },
      commonMistakeOrTrap: {
        mistake: 'Choosing `LinkedList` simply because textbook theory says "insertions are O(1)".',
        fix: 'Insertion in `LinkedList` is O(1) ONLY after you already hold the iterator pointer; reaching index k requires an O(k) linear scan!',
        interviewTrap:
          'Question: "Why is `ArrayDeque` superior to `LinkedList` for Queue implementations?" Answer: `ArrayDeque` uses a circular array buffer that avoids allocating node objects, producing zero garbage collection pressure and optimal CPU cache hits.',
      },
      examCheatsheet: [
        'ArrayList: O(1) get(i), Amortized O(1) add(), contiguous memory',
        'LinkedList: O(N) get(i), O(1) node pointer insert, scattered heap memory',
        'ArrayList grows by 1.5x when full',
        'ArrayDeque beats LinkedList for Stacks and Queues',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'Memory Layout & Performance Traps: Array vs. Linked Nodes',
      caption:
        'ArrayList elements sit adjacent in RAM for hardware cache prefetching; LinkedList nodes sit scattered across arbitrary heap locations.',
      visualKey: 'java-arraylist-linkedlist-viz',
      details: {
        comparison: {
          headers: ['Operation', 'ArrayList', 'LinkedList', 'Why ArrayList Wins'],
          rows: [
            ['get(i) by index', 'O(1) direct address arithmetic', 'O(N) traverse node pointers', 'Instant memory index offset'],
            ['add(element) at end', 'Amortized O(1)', 'O(1)', 'No object allocation per insert'],
            ['insert(0, element) at start', 'O(N) shifts array memory', 'O(1) pointer updates', 'LinkedList wins ONLY at index 0'],
            ['CPU Cache Locality', 'Exceptional (sequential cache line prefetch)', 'Poor (Cache miss on every node hop)', 'CPUs love contiguous memory'],
          ],
        },
      },
    },
    animation: {
      type: 'cache-line-traversal-interactive',
      title: 'CPU Cache Line Prefetch Animator',
      description:
        'Observe how modern CPUs prefetch sequential array elements into L1 cache in a single burst compared to erratic pointer chasing.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Collection to Benchmark',
        options: ['ArrayList (Contiguous Memory)', 'LinkedList (Scattered Heap Nodes)'],
        defaultVal: 'ArrayList (Contiguous Memory)',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'By what factor does a standard Java `ArrayList` expand when its internal array capacity is exceeded?',
        options: ['1.5x (oldCapacity + oldCapacity >> 1)', '2.0x (Double)', '10 elements fixed', '3.0x'],
        correctIndex: 0,
        explanation: 'Java ArrayList resizes by 50% (1.5x) to maintain amortized O(1) append efficiency without excessive memory waste.',
      },
      {
        id: 'q2',
        question: 'Why does accessing an element by index `list.get(5000)` take much longer in `LinkedList` than `ArrayList`?',
        options: [
          'Because LinkedList encrypts indexes',
          'Because LinkedList must iterate through 5000 node pointers sequentially from head or tail, taking O(N) time',
          'Because ArrayList is compiled in C',
          'Because LinkedList runs on a background thread',
        ],
        correctIndex: 1,
        explanation: 'LinkedList does not have indexed memory; finding element 5000 requires walking 5000 `node.next` pointers.',
      },
      {
        id: 'q3',
        question: 'What is the recommended replacement for `LinkedList` when implementing a FIFO Queue or LIFO Stack in modern Java?',
        options: ['Vector', 'ArrayDeque', 'Hashtable', 'TreeSet'],
        correctIndex: 1,
        explanation: '`ArrayDeque` is backed by a circular array buffer; it outperforms `LinkedList` in both memory overhead and execution speed.',
      },
    ],
  },
];
