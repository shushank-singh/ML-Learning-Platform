import { RevisionTopic } from './types';

export const JAVA_REVISION_TOPICS: RevisionTopic[] = [
  {
    id: 'java-jvm-architecture',
    subject: 'java',
    category: 'JVM, JRE and JDK',
    title: 'JVM, JRE & JDK Architecture',
    subtitle: 'Write Once, Run Anywhere: Bytecode Execution Pipeline',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['JVM', 'JRE', 'JDK', 'ClassLoader', 'JIT', 'Garbage Collection'],
    quickRecall: {
      oneLiner:
        'The JDK develops, JRE runs, and JVM executes compiled platform-independent bytecode (.class) via ClassLoader, Memory Areas, and the Execution Engine.',
      simpleAnalogy:
        'Sheet music and Orchestra analogy: Java source code (.java) is written in English. The compiler (`javac`) translates it into standardized sheet music (bytecode .class). The JVM is an orchestra: regardless of whether the concert hall is in Windows, Mac, or Linux, any local orchestra can read the sheet music and play the exact same symphony.',
      whenToUse:
        'Fundamental architectural knowledge required for performance tuning, memory leak troubleshooting, and system design interviews.',
      whyItMatters:
        'Enables Java\'s core promise: "Write Once, Run Anywhere" (WORA) across different operating systems and CPU architectures.',
      keyPoints: [
        'JDK (Java Development Kit): JRE + Development Tools (javac compiler, jar packager, jdb debugger).',
        'JRE (Java Runtime Environment): JVM + Core Class Libraries (rt.jar / java.base) required to execute Java apps.',
        'ClassLoader Subsystem: 1) Loading (Bootstrap, Extension/Platform, Application), 2) Linking (Verify, Prepare, Resolve), 3) Initialization.',
        'Runtime Data Areas: Method Area (Metaspace), Heap (shared), Stack (thread-private), PC Registers, Native Method Stack.',
        'Execution Engine: Interpreter (reads line-by-line) + JIT Compiler (compiles hot code loops into native assembly) + Garbage Collector.',
      ],
      formulaOrSyntax: {
        label: 'Java Compilation Pipeline',
        codeOrLatex: 'Source Code (.java) -> javac -> Bytecode (.class) -> JVM (JIT/Interpreter) -> Machine Code (OS/CPU)',
        isLatex: false,
        language: 'bash',
      },
      complexity: {
        time: 'JIT compilation introduces warmup latency, but achieves near-native C++ runtime speed for hot code',
        space: 'JVM memory: Heap (Xms, Xmx) + Metaspace + Thread Stacks (Xss, default 1MB per thread)',
      },
      commonMistakeOrTrap: {
        mistake: 'Assuming the JVM is platform-independent.',
        fix: 'Java bytecode (.class) is platform-independent; the JVM executable itself is strictly platform-DEPENDENT (you download a specific JVM binary for Windows x64 vs Linux ARM).',
        interviewTrap:
          'Question: "Where are static variables and class metadata stored in Java 8+?" Answer: In Metaspace! Prior to Java 8, they were stored in PermGen (Permanent Generation), which caused frequent `java.lang.OutOfMemoryError: PermGen space`. Metaspace uses native off-heap memory that grows dynamically.',
      },
      examCheatsheet: [
        'JDK = JRE + Tools; JRE = JVM + Libraries',
        'JIT (Just-In-Time) compiles hot bytecode into native CPU instructions',
        'Java 8 replaced PermGen with native Metaspace',
        'Heap and Metaspace are shared by all threads; Stack and PC Registers are private per thread',
      ],
    },
    visual: {
      type: 'architecture',
      title: 'JVM Architectural Runtime Layout',
      caption:
        'ClassLoader loads bytecode into Runtime Data Areas. Execution Engine interprets and JIT-compiles into machine code.',
      visualKey: 'java-jvm-architecture-viz',
      details: {
        comparison: {
          headers: ['Component', 'Shared Across Threads?', 'Stores What?', 'Key Tuning Flag'],
          rows: [
            ['Heap Memory', 'Yes (Shared by all threads)', 'All object instances and array allocations', '-Xms (initial), -Xmx (max)'],
            ['Method Area / Metaspace', 'Yes (Shared by all threads)', 'Class metadata, bytecode, static fields, method definitions', '-XX:MaxMetaspaceSize'],
            ['JVM Stack', 'No (Private per thread)', 'Stack frames with local primitives, method calls, and object references', '-Xss (thread stack size)'],
            ['PC Register', 'No (Private per thread)', 'Address of current JVM instruction being executed', 'Managed by CPU'],
          ],
        },
      },
    },
    animation: {
      type: 'java-jvm-interactive',
      title: 'ClassLoader to JIT Execution Flow',
      description:
        'Step through source code compilation, bytecode classloading, memory allocation, and JIT native execution.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Inspecting JVM Memory Programmatically in Java',
      language: 'java',
      code: `public class JvmMemoryCheck {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        long mb = 1024 * 1024;

        long maxMemory = runtime.maxMemory() / mb;
        long totalMemory = runtime.totalMemory() / mb;
        long freeMemory = runtime.freeMemory() / mb;

        System.out.println("Max Heap (-Xmx):   " + maxMemory + " MB");
        System.out.println("Allocated Heap:    " + totalMemory + " MB");
        System.out.println("Available Free:    " + freeMemory + " MB");
    }
}`,
      input: 'Run `java JvmMemoryCheck` on JVM',
      output: 'Max Heap (-Xmx): 4096 MB | Allocated Heap: 256 MB | Available Free: 250 MB',
      explanation:
        'The Runtime class queries JVM heap parameters configured by -Xmx and tracks real-time memory allocation.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following components of the JVM is shared among all concurrent threads?',
        options: ['Program Counter (PC) Register', 'Java Thread Stack', 'Heap Memory', 'Native Method Stack'],
        correctIndex: 2,
        explanation: 'Heap memory and Metaspace are shared globally across all threads; Stacks and PC Registers are strictly isolated per thread.',
      },
      {
        id: 'q2',
        question: 'What is the role of the JIT (Just-In-Time) compiler in the JVM?',
        options: [
          'It compiles .java files into .class files at compile-time',
          'It compiles frequently executed ("hot") bytecode sequences directly into native CPU machine code at runtime',
          'It allocates memory for objects',
          'It executes garbage collection',
        ],
        correctIndex: 1,
        explanation: 'JIT identifies hot code loops and translates them directly into machine code for native execution performance.',
      },
      {
        id: 'q3',
        question: 'What replaced the PermGen (Permanent Generation) in Java 8?',
        options: ['Eden Space', 'Survivor Space', 'Metaspace (using native memory)', 'Thread Stack'],
        correctIndex: 2,
        explanation: 'Java 8 removed PermGen and introduced Metaspace, which allocates class metadata in native off-heap memory.',
      },
    ],
  },
  {
    id: 'java-stack-vs-heap',
    subject: 'java',
    category: 'Java Basics and Data Types',
    title: 'Stack vs. Heap Memory Layout',
    subtitle: 'Thread Stacks, Object Allocation & Memory Errors',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Stack', 'Heap', 'References', 'StackOverflowError', 'OutOfMemoryError'],
    quickRecall: {
      oneLiner:
        'Stack stores thread-private primitive local variables and object reference addresses; Heap stores all object instances and class data.',
      simpleAnalogy:
        'Desk vs Warehouse analogy: The Stack is your personal office desk: very fast, tidy, holds short-term notes and reference slips. The Heap is the massive shared warehouse downstairs where the actual bulky furniture (objects) is kept. The note on your desk simply holds the warehouse aisle address.',
      whenToUse:
        'Diagnosing memory leaks, optimizing GC pauses, and understanding why variables pass by value.',
      whyItMatters:
        'Stack memory is allocated and freed automatically when methods enter and exit (LIFO); Heap memory requires Garbage Collection.',
      keyPoints: [
        'Stack: Fast, LIFO (Last-In, First-Out), stores primitive values (int, boolean) and reference pointers to heap objects.',
        'Heap: Shared across threads, holds all `new Object()` instances. Managed by the Garbage Collector.',
        'StackOverflowError: Caused by deep recursion filling the thread stack beyond `-Xss` limit.',
        'OutOfMemoryError (OOM: Java heap space): Caused by allocating objects faster than GC can collect, exceeding `-Xmx`.',
      ],
      formulaOrSyntax: {
        label: 'Memory Allocation Statement',
        codeOrLatex: 'User user = new User("Alice");\n// "user" reference variable resides on Stack (8 bytes)\n// new User(...) instance allocated on Heap',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Stack allocation/deallocation: O(1) pointer adjustment | Heap allocation: O(1) bump-the-pointer or TLAB',
        space: 'Stack default: 1MB per thread (-Xss1m) | Heap default: 1/4 of physical RAM (-Xmx)',
      },
      commonMistakeOrTrap: {
        mistake: 'Believing that Java passes objects "by reference".',
        fix: 'Java is STRICTLY PASS-BY-VALUE ALWAYS! For objects, the value passed is the COPY of the reference address pointing to the heap.',
        interviewTrap:
          'Question: "Can an object ever be allocated on the Stack instead of the Heap in Java?" Answer: Yes! Via JVM Escape Analysis: if the JIT compiler proves an object does not escape the calling method, it can perform Scalar Replacement and allocate its fields directly on the stack!',
      },
      examCheatsheet: [
        'Local primitives live on the Stack; object instances live on the Heap',
        'StackOverflowError: excessive recursion (stack frame overflow)',
        'OutOfMemoryError: heap exhaustion (objects cannot be collected)',
        'Java is 100% pass-by-value always',
      ],
    },
    visual: {
      type: 'memory-layout',
      title: 'Thread Stack Frames Pointing into Heap Space',
      caption:
        'Method frames on Stack contain local primitives and reference variables pointing to allocated objects in the Heap.',
      visualKey: 'java-stack-heap-viz',
      details: {
        comparison: {
          headers: ['Feature', 'Stack Memory', 'Heap Memory'],
          rows: [
            ['Stored Data', 'Local primitives and object references', 'All object instances and arrays'],
            ['Access Speed', 'Extremely fast (LIFO top-of-stack)', 'Slower (cache misses, GC overhead)'],
            ['Thread Safety', 'Inherently thread-safe (thread-isolated)', 'Not thread-safe (shared by all threads)'],
            ['Failure Exception', '`StackOverflowError`', '`OutOfMemoryError: Java heap space`'],
          ],
        },
      },
    },
    animation: {
      type: 'java-stack-heap-interactive',
      title: 'Method Invocation Stack Frame & Heap Allocation',
      description:
        'Step through method frames pushing onto the Stack and allocating objects on the Heap.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Stack vs Heap Demonstration in Java',
      language: 'java',
      code: `public class MemoryDemo {
    public static void main(String[] args) {
        int primitiveAge = 25;              // Stack: primitive int value 25
        String heapName = new String("Bob"); // Stack: ref pointer -> Heap: "Bob"

        modify(primitiveAge, heapName);
        System.out.println("Age after call:  " + primitiveAge); // 25 (unchanged!)
        System.out.println("Name after call: " + heapName);     // Bob
    }

    static void modify(int age, String name) {
        age = 30; // Modifies local stack copy only!
    }
}`,
      input: 'main() calls modify(primitiveAge, heapName)',
      output: 'Age after call: 25 | Name after call: Bob',
      explanation:
        'Primitive `age` is copied by value onto the stack frame of `modify()`; changing it leaves the caller stack unaffected.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What exception is thrown when infinite recursion occurs without a base case in Java?',
        options: ['NullPointerException', 'StackOverflowError', 'OutOfMemoryError', 'IllegalArgumentException'],
        correctIndex: 1,
        explanation: 'Each recursive call pushes a new stack frame; unbounded recursion exhausts the thread\'s allocated stack memory (-Xss).',
      },
      {
        id: 'q2',
        question: 'Where are instance variables of an object stored in memory?',
        options: ['On the thread stack', 'Inside the Heap as part of the object instance', 'In the Metaspace', 'In CPU registers'],
        correctIndex: 1,
        explanation: 'Fields of an object are embedded inside the object itself, residing on the Heap regardless of whether they are primitives or references.',
      },
      {
        id: 'q3',
        question: 'Is Java pass-by-reference or pass-by-value?',
        options: [
          'Pass-by-reference for objects, pass-by-value for primitives',
          'Strictly pass-by-value always (copies the reference pointer value for objects)',
          'Pass-by-reference always',
          'Configurable via JVM flags',
        ],
        correctIndex: 1,
        explanation: 'Java is strictly pass-by-value; when passing an object, a copy of the reference pointer address is passed by value.',
      },
    ],
  },
  {
    id: 'java-string-pool',
    subject: 'java',
    category: 'Strings and StringBuilder',
    title: 'String Pool, Immutability & StringBuilder',
    subtitle: 'String Interning, Heap Memory Optimization and Thread Safety',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['String Pool', 'Immutability', 'intern()', 'StringBuilder', 'StringBuffer'],
    quickRecall: {
      oneLiner:
        'Strings in Java are immutable; string literals are cached in the String Constant Pool in Heap memory to save RAM and enable fast pointer comparisons.',
      simpleAnalogy:
        'Public library book analogy: When multiple students want to read "Hamlet", the school library doesn\'t print 500 copies (waste of paper). It keeps one copy in the reference room and hands everyone the same catalog reference (String Pool caching). Because nobody is allowed to write in the book (immutability), everyone reads safely.',
      whenToUse:
        'Use `String` for immutable constants; use `StringBuilder` for heavy string concatenation in single threads; use `StringBuffer` for thread-safe concatenation.',
      whyItMatters:
        'Concatenating strings inside a loop with `+` creates O(N²) garbage objects; `StringBuilder.append()` operates in amortized O(1).',
      keyPoints: [
        'String Pool: A specialized hashtable in Heap memory storing unique string literals: `String s1 = "abc"`.',
        '`new String("abc")`: Forces allocation of a brand new object on the heap outside the pool.',
        '`s.intern()`: Manually puts or retrieves the string from the String Constant Pool.',
        '`==` vs `.equals()`: `==` compares reference addresses; `.equals()` compares character values.',
        'Why immutable? Security (passwords/network URLs), Caching (hashcode cached), and Thread-Safety.',
      ],
      formulaOrSyntax: {
        label: 'String Pool Reference Syntax',
        codeOrLatex: 'String s1 = "hello";\nString s2 = "hello"; // Reuses pooled instance\ns1 == s2; // true (Identical heap pointer address!)\n\nString s3 = new String("hello");\ns1 == s3; // false (Different heap address!)',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'String concat with + in loop: O(N²) | StringBuilder append: O(1) amortized',
        space: 'String pool deduplicates duplicate strings across the entire JVM',
      },
      commonMistakeOrTrap: {
        mistake: 'Using `+` inside a `for` loop to concatenate strings.',
        fix: 'Each `+` iteration allocates a new `StringBuilder` and a new `String` object, filling the heap with garbage; initialize one `StringBuilder` outside the loop.',
        interviewTrap:
          'Question: "How many objects does `String s = new String(\\"xyz\\");` create?" Answer: Two! One string literal in the String Constant Pool (if not already present), and one new String object on the heap.',
      },
      examCheatsheet: [
        'String literals share memory in the String Pool',
        '`new String()` creates an independent heap object outside the pool',
        '`StringBuilder` is fast but not thread-safe; `StringBuffer` is synchronized and thread-safe',
        'String caches its `hashCode()` after first computation',
      ],
    },
    visual: {
      type: 'memory-layout',
      title: 'String Constant Pool vs Heap Allocation',
      caption:
        'Literals "cat" point to the single shared pool entry. `new String("cat")` creates a separate heap instance.',
      visualKey: 'java-string-pool-viz',
      details: {
        comparison: {
          headers: ['Construct', 'Mutability', 'Thread-Safe?', 'Performance in Loops'],
          rows: [
            ['`String`', 'Immutable', 'Yes (Inherently thread-safe)', 'Terrible O(N²) if concatenated with + in loops'],
            ['`StringBuilder`', 'Mutable', 'No (Single-thread only)', 'Optimal amortized O(1) appends'],
            ['`StringBuffer`', 'Mutable', 'Yes (All methods synchronized)', 'Good, but thread synchronization overhead'],
          ],
        },
      },
    },
    animation: {
      type: 'java-string-pool-interactive',
      title: 'String Pool Dedup & intern() Simulator',
      description:
        'Step through literal assignment, new String() allocation, and .intern() pointer redirection.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'String Pool & StringBuilder in Java',
      language: 'java',
      code: `public class StringPoolDemo {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");

        System.out.println("s1 == s2 (Pooled):  " + (s1 == s2));      // true
        System.out.println("s1 == s3 (Heap):    " + (s1 == s3));      // false
        System.out.println("s1.equals(s3):      " + s1.equals(s3));   // true
        System.out.println("s1 == s3.intern():  " + (s1 == s3.intern())); // true

        // Efficient concatenation
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 3; i++) sb.append("A");
        System.out.println("StringBuilder:      " + sb.toString());
    }
}`,
      input: 'Run string pool comparison checks',
      output: 's1 == s2: true | s1 == s3: false | s1.equals(s3): true | s1 == s3.intern(): true',
      explanation:
        'Literals s1 and s2 share the exact same pool address. Calling .intern() returns the pooled reference.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the output of `String a = "test"; String b = new String("test"); System.out.println(a == b);`?',
        options: ['true', 'false', 'Compilation error', 'NullPointerException'],
        correctIndex: 1,
        explanation: '`==` compares memory addresses; `a` points to the String Pool, while `b` points to an independent heap object.',
      },
      {
        id: 'q2',
        question: 'Why should `StringBuilder` be preferred over `String` concatenation (+) inside a loop of 10,000 iterations?',
        options: [
          'Because String cannot store 10,000 characters',
          'Because String concatenation creates a new String object on every iteration, causing O(N²) time and massive GC pressure',
          'Because StringBuilder is thread-safe',
          'Because javac disables + operators in loops',
        ],
        correctIndex: 1,
        explanation: 'String immutability forces each `+` step to copy the entire preceding string into a new buffer, yielding quadratic O(N²) time.',
      },
      {
        id: 'q3',
        question: 'What does the `.intern()` method do on a String object?',
        options: [
          'Deletes the string from memory',
          'Returns the canonical representation from the String Constant Pool, adding it if not present',
          'Converts the string to lowercase',
          'Encrypts the string bytes',
        ],
        correctIndex: 1,
        explanation: '`intern()` checks the String Constant Pool: if the string exists, it returns that pooled reference; otherwise, it adds it to the pool.',
      },
    ],
  },
  {
    id: 'java-equals-hashcode',
    subject: 'java',
    category: 'Classes and Objects',
    title: '`equals()` and `hashCode()` Contract',
    subtitle: 'Object Identity, Hashing Algorithms & Bucket Lookup',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['equals', 'hashCode', 'HashMap', 'HashSet', 'Contract'],
    quickRecall: {
      oneLiner:
        'If two objects are equal according to `equals()`, they MUST produce the exact same `hashCode()`; otherwise HashMap lookups fail completely.',
      simpleAnalogy:
        'Coat check ticket analogy: When checking your coat, the clerk hands you a bucket number ticket (`hashCode`). When you return to claim it, the clerk goes straight to that bucket and verifies your name tag (`equals`). If two coats have identical names but different tickets, the clerk looks in the wrong bucket and never finds your coat!',
      whenToUse:
        'Whenever creating custom domain objects that will be stored in `HashSet`, `HashMap` keys, or compared for logical equivalence.',
      whyItMatters:
        'Violating this contract leads to phantom objects in HashMaps where `map.get(key)` returns `null` even though the key exists!',
      keyPoints: [
        'Contract Rule 1: If `a.equals(b)` is true, `a.hashCode() == b.hashCode()` MUST be true.',
        'Contract Rule 2: If `a.hashCode() == b.hashCode()`, `a.equals(b)` is NOT necessarily true (hash collision).',
        'Default `Object` implementation: `equals()` compares reference memory addresses (`==`); `hashCode()` returns memory-derived integer.',
        'Always override both together: Overriding `equals()` without `hashCode()` breaks all hashing collections.',
      ],
      formulaOrSyntax: {
        label: 'Idiomatic equals & hashCode Implementation',
        codeOrLatex: '@Override\npublic boolean equals(Object o) {\n    if (this == o) return true;\n    if (!(o instanceof Person)) return false;\n    Person person = (Person) o;\n    return id == person.id && Objects.equals(name, person.name);\n}\n@Override\npublic int hashCode() {\n    return Objects.hash(id, name);\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: '`hashCode()`: O(1) | `equals()`: O(1) field comparison',
        space: 'O(1) memory',
      },
      commonMistakeOrTrap: {
        mistake: 'Using mutable fields in `hashCode()` and mutating the object after inserting it as a HashMap key.',
        fix: 'Mutating the object changes its `hashCode()`, so `map.get(key)` searches the NEW bucket instead of the original bucket, losing the key forever! Always use immutable fields for keys.',
        interviewTrap:
          'Question: "Can `hashCode()` return a negative number?" Answer: Yes! In Java, `int` is signed 32-bit (-2^31 to 2^31 - 1). That is why HashMap uses bitwise masking: `(n - 1) & hash` or `Math.abs()` to map to array indices.',
      },
      examCheatsheet: [
        'Equal objects MUST produce equal hash codes',
        'Unequal objects CAN produce equal hash codes (Collision)',
        'Never mutate an object after using it as a HashMap key',
        'Use `Objects.equals()` and `Objects.hash()` for null-safe implementations',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'HashMap Bucket Routing via hashCode() then equals()',
      caption:
        'Step 1: hashCode() finds the array bucket. Step 2: equals() traverses linked nodes in that bucket to find the exact key.',
      visualKey: 'java-equals-hashcode-viz',
      details: {
        comparison: {
          headers: ['Scenario', 'a.equals(b)', 'a.hashCode() == b.hashCode()', 'Allowed by Contract?'],
          rows: [
            ['Identical Keys', 'True', 'True', 'Mandatory (Rule 1)'],
            ['Hash Collision', 'False', 'True', 'Allowed (Normal collision)'],
            ['Broken Contract', 'True', 'False', 'STRICTLY FORBIDDEN (Breaks HashMaps)'],
          ],
        },
      },
    },
    animation: {
      type: 'java-equals-hashcode-interactive',
      title: 'HashMap Bucket Lookup & Collision Tracer',
      description:
        'Step through hash code computation, bucket index routing, and equals node comparison.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'The Broken equals/hashCode Contract Bug in Java',
      language: 'java',
      code: `import java.util.*;

class User {
    int id;
    User(int id) { this.id = id; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        return this.id == ((User) o).id;
    }
    // OMITTED hashCode() -> CRITICAL BUG!
}

public class ContractDemo {
    public static void main(String[] args) {
        Map<User, String> map = new HashMap<>();
        map.put(new User(1), "Alice");

        // get() produces a different default hashCode, searches WRONG bucket!
        System.out.println("Result: " + map.get(new User(1))); // prints: null!
    }
}`,
      input: 'map.get(new User(1)) without overriding hashCode()',
      output: 'Result: null (Key lost due to broken contract!)',
      explanation:
        'Even though .equals() returns true, the two User instances have different default hashCodes and look in different buckets, returning null.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'If `a.equals(b)` is true, what MUST be true about their hash codes according to the Java contract?',
        options: [
          '`a.hashCode() == b.hashCode()` MUST be true',
          '`a.hashCode() != b.hashCode()`',
          '`hashCode()` cannot be zero',
          'Nothing, they are completely independent',
        ],
        correctIndex: 0,
        explanation: 'The contract dictates that equal objects must always produce identical hash codes.',
      },
      {
        id: 'q2',
        question: 'What happens if you insert an object into a `HashSet`, and then mutate a field that affects its `hashCode()`?',
        options: [
          'The HashSet automatically updates the bucket index',
          'The object is lost inside the set; `set.contains(obj)` will return false',
          'A ConcurrentModificationException is thrown immediately',
          'The object is deleted from the set',
        ],
        correctIndex: 1,
        explanation: 'Changing the hash code causes lookups to search a different bucket than where the object was originally stored, losing it.',
      },
      {
        id: 'q3',
        question: 'Can two unequal objects (`a.equals(b) == false`) have the exact same `hashCode()`?',
        options: [
          'No, hash codes must be globally unique',
          'Yes, this is known as a hash collision and is handled by chaining or trees',
          'Only if both objects are null',
          'Only in 32-bit JVMs',
        ],
        correctIndex: 1,
        explanation: 'Because there are 2^32 possible integer hash codes, infinite possible objects must inevitably collide.',
      },
    ],
  },
  {
    id: 'java-inheritance-polymorphism',
    subject: 'java',
    category: 'Inheritance and Polymorphism',
    title: 'Inheritance & Runtime Polymorphism',
    subtitle: 'Dynamic Method Dispatch, vtables, and the `super` Keyword',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Inheritance', 'Polymorphism', 'Dynamic Dispatch', 'Override', 'vtable'],
    quickRecall: {
      oneLiner:
        'Inheritance shares code via `extends`; Runtime Polymorphism allows a parent reference to invoke an overridden child method resolved dynamically at runtime.',
      simpleAnalogy:
        'Universal remote control analogy: A universal remote has a button labeled "Power" (the parent interface `Device`). Whether you point it at a Sony TV, a Bose speaker, or a ceiling fan (child instances), each device executes its own customized power-on sequence.',
      whenToUse:
        'Designing extensible class hierarchies, plugin frameworks, and decoupled enterprise service architectures.',
      whyItMatters:
        'Enables the Open-Closed Principle: systems can be extended with new subclasses without modifying existing caller code.',
      keyPoints: [
        'Dynamic Method Dispatch: JVM looks up the actual runtime object type in the virtual method table (vtable) to execute the overridden method.',
        'Compile-time polymorphism: Method Overloading (same name, different parameter signatures).',
        'Runtime polymorphism: Method Overriding (same name, identical signature, subclass replaces parent implementation).',
        '`super`: Refers to parent class members and invokes parent constructors: `super(args)`.',
        'Rules: Static, private, and final methods CANNOT be overridden (static methods are hidden, not overridden).',
      ],
      formulaOrSyntax: {
        label: 'Polymorphic Reference Syntax',
        codeOrLatex: 'Animal a = new Dog(); // Parent reference pointing to child object\na.makeSound(); // Executes Dog\'s overridden method at runtime!',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Virtual method call: O(1) vtable offset lookup',
        space: '1 vtable pointer per class in Metaspace',
      },
      commonMistakeOrTrap: {
        mistake: 'Trying to achieve polymorphism with instance variables: `Parent p = new Child(); System.out.println(p.x)`.',
        fix: 'Variables in Java do NOT participate in polymorphism! Field access is resolved at compile-time based on the REFERENCE type, not the runtime object type.',
        interviewTrap:
          'Question: "Can you override a static method in Java?" Answer: No! Static methods belong to the class, not the instance. Declaring a static method in a subclass with the same signature is Method Hiding, not overriding.',
      },
      examCheatsheet: [
        'Methods are resolved at RUNTIME (Dynamic Dispatch)',
        'Fields and static methods are resolved at COMPILE-TIME (Reference type)',
        '`@Override` annotation catches spelling/signature mistakes at compile-time',
        'Java supports single class inheritance, but multiple interface implementation',
      ],
    },
    visual: {
      type: 'architecture',
      title: 'Virtual Method Table (vtable) Dynamic Dispatch',
      caption:
        'Parent reference points to Child in heap. JVM inspects child vtable slot at runtime to invoke Child.makeSound().',
      visualKey: 'java-polymorphism-viz',
      details: {
        comparison: {
          headers: ['Property', 'Method Overloading', 'Method Overriding'],
          rows: [
            ['Polymorphism Type', 'Compile-time (Static)', 'Runtime (Dynamic)'],
            ['Location', 'Within the same class', 'Across Parent-Child inheritance hierarchy'],
            ['Signature', 'Different parameters required', 'Identical name, parameters, and compatible return type'],
            ['Private/Static allowed?', 'Yes', 'No (Cannot override private/static/final)'],
          ],
        },
      },
    },
    animation: {
      type: 'java-polymorphism-interactive',
      title: 'Dynamic Method Dispatch vtable Tracer',
      description:
        'Step through Animal reference dispatching to Dog overridden method via runtime vtable lookup.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Polymorphic Method Dispatch in Java',
      language: 'java',
      code: `class Animal {
    void makeSound() { System.out.println("Generic animal sound"); }
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Bark! Bark!"); }
}

class Cat extends Animal {
    @Override
    void makeSound() { System.out.println("Meow!"); }
}

public class PolyDemo {
    public static void main(String[] args) {
        // Parent references holding different child instances
        Animal myPet = new Dog();
        myPet.makeSound(); // Output: Bark! Bark!

        myPet = new Cat();
        myPet.makeSound(); // Output: Meow!
    }
}`,
      input: 'myPet.makeSound() called on Dog, then Cat',
      output: 'Bark! Bark! -> Meow!',
      explanation:
        'Even though `myPet` is declared as type `Animal`, the JVM resolves the actual runtime object and calls the overridden child method.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Given `Animal a = new Dog();`, how does the JVM decide which `makeSound()` method to execute at runtime?',
        options: [
          'It always runs the Animal method because the reference is Animal',
          'It inspects the actual object type in Heap memory (Dog) using the virtual method table (vtable)',
          'It asks the compiler to guess',
          'It runs both methods sequentially',
        ],
        correctIndex: 1,
        explanation: 'Dynamic Method Dispatch inspects the runtime object\'s vtable pointer to invoke the child\'s overridden implementation.',
      },
      {
        id: 'q2',
        question: 'What happens if a subclass defines a static method with the exact same name and signature as a static method in its superclass?',
        options: [
          'It overrides the superclass method',
          'It hides the superclass method (Method Hiding); polymorphism does not apply',
          'A compilation error is raised',
          'The subclass will not compile',
        ],
        correctIndex: 1,
        explanation: 'Static methods belong to class definitions, not instances; they are hidden, never dynamically dispatched.',
      },
      {
        id: 'q3',
        question: 'Do instance variables (fields) participate in runtime polymorphism in Java?',
        options: [
          'Yes, child field values always override parent fields',
          'No, fields are bound at compile-time based on the reference type',
          'Only if marked public',
          'Only in abstract classes',
        ],
        correctIndex: 1,
        explanation: 'Field access is determined statically at compile time by the declared type of the reference variable.',
      },
    ],
  },
  {
    id: 'java-interfaces-abstract',
    subject: 'java',
    category: 'Interfaces and Abstract Classes',
    title: 'Interfaces vs. Abstract Classes',
    subtitle: 'Contract Design, Multiple Inheritance & Default Methods',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Interface', 'Abstract Class', 'Default Methods', 'Multiple Inheritance'],
    quickRecall: {
      oneLiner:
        'An Abstract Class defines identity and shared state ("is-a"); an Interface defines a capability contract ("can-do") with multiple inheritance support.',
      simpleAnalogy:
        'Identity vs Capability analogy: An abstract class is like your family DNA: you can only have one biological father (`extends Human`), and you inherit real physical traits. An interface is like a certification: you can have multiple certifications (`implements Driver, Swimmer, Musician`) specifying what skills you can perform.',
      whenToUse:
        'Use Abstract Class for closely related classes sharing state/code; use Interface for polymorphic contracts implemented by unrelated classes.',
      whyItMatters:
        'Java supports implementing multiple interfaces, but permits extending only one class to avoid the "Diamond of Death".',
      keyPoints: [
        'Abstract Class: Can have state (instance variables), constructors, and protected/private methods. Single inheritance (`extends`).',
        'Interface: Variables are strictly `public static final` constants. Multiple implementation (`implements A, B, C`).',
        'Default Methods (Java 8+): Interfaces can provide default implementations using the `default` keyword to maintain backward compatibility.',
        'Functional Interface: Interface with exactly 1 abstract method (e.g. `Runnable`, `Comparator`), eligible for lambda expressions.',
      ],
      formulaOrSyntax: {
        label: 'Interface with Default Method',
        codeOrLatex: 'public interface Flyable {\n    void fly(); // Abstract\n    default void glide() {\n        System.out.println("Gliding smoothly...");\n    }\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Interface method dispatch: O(1) itable lookup (slightly slower than vtable, optimized by HotSpot inline caching)',
        space: 'Zero instance state in interfaces',
      },
      commonMistakeOrTrap: {
        mistake: 'Trying to instantiate an abstract class or interface directly with `new MyInterface()`.',
        fix: 'Abstract types cannot be instantiated directly; you must instantiate a concrete subclass or provide an anonymous class / lambda.',
        interviewTrap:
          'Question: "If class C implements interfaces A and B, and both define the exact same default method `void show()`, what happens?" Answer: Compilation error (Diamond Problem)! The compiler forces class C to explicitly override `show()` and resolve ambiguity: `A.super.show();`.',
      },
      examCheatsheet: [
        'Class: single inheritance; Interface: multiple implementation',
        'Interface fields are always `public static final`',
        'Abstract classes can have constructors; interfaces cannot',
        'Java 8 added `default` and `static` methods; Java 9 added `private` methods to interfaces',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'Interface vs. Abstract Class Feature Matrix',
      caption:
        'Detailed comparison of inheritance, state, constructors, access modifiers, and default methods.',
      visualKey: 'java-interfaces-abstract-viz',
      details: {
        comparison: {
          headers: ['Feature', 'Interface', 'Abstract Class'],
          rows: [
            ['Inheritance', 'Multiple (`implements A, B`)', 'Single (`extends Base`)'],
            ['Instance State', 'None (only public static final constants)', 'Full instance variables supported'],
            ['Constructors', 'No constructors allowed', 'Can define constructors called via super()'],
            ['Method Modifiers', 'Default public (private helper in Java 9+)', 'public, protected, package-private, private'],
            ['Relationship Type', '"Can-do" capability contract', '"Is-a" core identity hierarchy'],
          ],
        },
      },
    },
    animation: {
      type: 'java-interface-default-interactive',
      title: 'Multiple Interface Diamond Conflict Resolver',
      description:
        'Step through multiple interface inheritance resolving duplicate default methods with A.super.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Interface vs Abstract Class in Java',
      language: 'java',
      code: `abstract class Vehicle {
    protected int speed; // State
    Vehicle(int speed) { this.speed = speed; } // Constructor
    abstract void drive();
}

interface Electric {
    void chargeBattery();
    default void ecoMode() {
        System.out.println("Eco-mode active: saving power");
    }
}

// Extends one abstract class AND implements interface
class Tesla extends Vehicle implements Electric {
    Tesla() { super(100); }

    @Override void drive() { System.out.println("Driving at " + speed + " mph"); }
    @Override public void chargeBattery() { System.out.println("Supercharging 250kW"); }
}

public class Main {
    public static void main(String[] args) {
        Tesla t = new Tesla();
        t.drive();
        t.ecoMode();
    }
}`,
      input: 'Instantiate Tesla and call drive() + ecoMode()',
      output: 'Driving at 100 mph | Eco-mode active: saving power',
      explanation:
        'Tesla inherits speed state and constructor from Vehicle, while fulfilling the Electric contract and default method.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Can an interface in Java 8+ have concrete method bodies?',
        options: [
          'No, all interface methods must remain abstract',
          'Yes, by using the `default` or `static` keyword',
          'Only if the class has no variables',
          'Only in private packages',
        ],
        correctIndex: 1,
        explanation: 'Java 8 introduced `default` and `static` methods to allow adding new methods to interfaces without breaking existing implementations.',
      },
      {
        id: 'q2',
        question: 'Why can an abstract class have a constructor if it cannot be instantiated with `new`?',
        options: [
          'It is a bug in the language specification',
          'To initialize state fields of the abstract class when invoked by subclass constructors via `super()`',
          'To allow reflection instantiation',
          'Constructors in abstract classes are ignored',
        ],
        correctIndex: 1,
        explanation: 'Subclasses call `super(...)` during their instantiation to initialize inherited fields in the abstract superclass.',
      },
      {
        id: 'q3',
        question: 'What access modifier is automatically applied to variables declared in an interface?',
        options: ['private final', 'protected static', 'public static final', 'package-private'],
        correctIndex: 2,
        explanation: 'All variables declared inside an interface are implicitly `public static final` constants.',
      },
    ],
  },
  {
    id: 'java-hashmap-internals',
    subject: 'java',
    category: 'ArrayList, HashMap, HashSet and Queue',
    title: 'HashMap Internals & Treeify Threshold',
    subtitle: 'Hash Buckets, Bitwise Masking, LinkedLists and Red-Black Trees',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['HashMap', 'Treeify', 'Red-Black Tree', 'Hash Buckets', 'Load Factor'],
    quickRecall: {
      oneLiner:
        'HashMap is an array of buckets (`Node<K,V>[]`) indexed by `(n - 1) & hash`; collisions chain via LinkedList until length ≥ 8, where it treeifies into a Red-Black tree.',
      simpleAnalogy:
        'Library filing cabinet analogy: You have a cabinet with 16 drawers (bucket capacity). When filing a folder, you calculate which drawer it belongs in using its title code. If 8 folders end up in the exact same drawer (collision), finding things gets slow. So the cabinet converts that crowded drawer into an organized index tree (Red-Black tree) so lookups remain super fast O(log N).',
      whenToUse:
        'Key-value mappings requiring fast O(1) lookups, insertions, and deletions where keys are unique.',
      whyItMatters:
        'The single most asked Java collections interview question globally; tests understanding of hashing, bitwise math, and data structure transitions.',
      keyPoints: [
        'Initial Capacity: 16 (always a power of 2 to enable fast bitwise index calculation: `index = (n - 1) & hash`).',
        'Load Factor: 0.75 (resizes / rehashes when size exceeds `16 * 0.75 = 12` elements, doubling table size to 32).',
        'Hash Spreading: `hash = (h = key.hashCode()) ^ (h >>> 16)` shifts high bits into low bits to prevent collision clustering.',
        'Treeify Threshold (Java 8+): When a bucket chain length reaches 8 AND total capacity ≥ 64, the linked list converts to a Red-Black Tree, improving worst-case lookup from O(N) to O(log N).',
        'Untreeify Threshold: When bucket elements drop to 6 during resizing, it converts back to a linked list.',
      ],
      formulaOrSyntax: {
        label: 'Bucket Index Calculation',
        codeOrLatex: 'hash = key.hashCode() ^ (hash >>> 16);\nindex = (table.length - 1) & hash; // Fast bitwise equivalent to hash % n',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Get / Put: O(1) average | Worst-case: O(log N) after Java 8 treeify (was O(N) in Java 7)',
        space: 'O(N) entries + bucket array overhead',
      },
      commonMistakeOrTrap: {
        mistake: 'Using HashMap in a concurrent multi-threaded environment.',
        fix: 'HashMap is NOT thread-safe! Concurrent puts during rehashing in Java 7 could cause circular linked lists and infinite loops (100% CPU lockup); use `ConcurrentHashMap` instead.',
        interviewTrap:
          'Question: "Why is HashMap capacity always a power of 2?" Answer: Because when n is a power of 2, `(n - 1) & hash` is mathematically identical to `hash % n`, but bitwise AND (`&`) is orders of magnitude faster on CPU hardware than integer modulo division (`%`)!',
      },
      examCheatsheet: [
        'Default capacity = 16, Default load factor = 0.75',
        'Treeify: threshold = 8 (list -> Red-Black Tree)',
        'Untreeify: threshold = 6 (tree -> list)',
        'Not thread-safe: use `ConcurrentHashMap` in concurrent environments',
      ],
    },
    visual: {
      type: 'architecture',
      title: 'HashMap Array Table with Linked List and Treeified Buckets',
      caption:
        'Bucket array holding single nodes, linked list chains, and treeified Red-Black tree nodes (threshold >= 8).',
      visualKey: 'java-hashmap-internals-viz',
      details: {
        comparison: {
          headers: ['Metric / Feature', 'Java 7 HashMap', 'Java 8+ HashMap'],
          rows: [
            ['Collision Resolution', 'LinkedList only (Separate Chaining)', 'LinkedList converts to Red-Black Tree when chain >= 8'],
            ['Worst-Case Lookup Time', 'O(N) linear time', 'O(log N) logarithmic time'],
            ['Insertion Order in Bucket', 'Head insertion (caused race loop bug)', 'Tail insertion (maintains order, prevents loops)'],
            ['Bucket Index Formula', '`(n - 1) & hash`', '`(n - 1) & hash` with improved XOR bit spread'],
          ],
        },
      },
    },
    animation: {
      type: 'java-hashmap-interactive',
      title: 'HashMap Bucket Routing & Treeify Animator',
      description:
        'Step through key hashing, bucket index calculation, collision chaining, and treeify threshold.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'HashMap Operations & Key Collision in Java',
      language: 'java',
      code: `import java.util.HashMap;

public class HashMapDemo {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();

        // 1. put() computes hash and places entry in bucket
        map.put("Alice", 95);
        map.put("Bob", 80);
        map.put("Charlie", 88);

        // 2. get() calculates (n-1)&hash and traverses bucket
        System.out.println("Alice's Score: " + map.get("Alice")); // 95
        System.out.println("Contains Bob?  " + map.containsKey("Bob")); // true

        // 3. getOrDefault() avoids null pointer checks
        int score = map.getOrDefault("Unknown", 0);
        System.out.println("Default Score: " + score); // 0
    }
}`,
      input: 'Put 3 entries and query Alice and Unknown',
      output: 'Alice\'s Score: 95 | Contains Bob? true | Default Score: 0',
      explanation:
        'Lookups execute in O(1) average time by routing directly to the computed bucket index.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What happens in Java 8+ when a single HashMap bucket reaches 8 elements (and table capacity >= 64)?',
        options: [
          'The oldest element is dropped',
          'The bucket linked list converts into a balanced Red-Black Tree, improving lookup from O(N) to O(log N)',
          'An OutOfMemoryError is thrown',
          'The key is rejected',
        ],
        correctIndex: 1,
        explanation: 'Java 8 treeifies chains of length 8 to guard against denial-of-service hash collision attacks.',
      },
      {
        id: 'q2',
        question: 'Why is the capacity of a HashMap always maintained as a power of 2 (16, 32, 64...)?',
        options: [
          'It allows computing bucket index using fast bitwise `(n - 1) & hash` instead of slow modulo `%`',
          'Java arrays can only have power-of-2 sizes',
          'It reduces memory usage by 50%',
          'It is required by the garbage collector',
        ],
        correctIndex: 0,
        explanation: 'When n is a power of 2, (n - 1) is a mask of all 1s, making `(n - 1) & hash` equivalent to `hash % n` at CPU hardware speed.',
      },
      {
        id: 'q3',
        question: 'Is HashMap safe to use across multiple threads without synchronization?',
        options: [
          'Yes, HashMap is fully thread-safe',
          'No, use `ConcurrentHashMap` for concurrent multi-threaded read/write access',
          'Only in Java 17+',
          'Yes, because it uses Red-Black trees',
        ],
        correctIndex: 1,
        explanation: 'HashMap operations are not synchronized; concurrent mutations can corrupt the bucket table. Use `ConcurrentHashMap`.',
      },
    ],
  },
  {
    id: 'java-checked-unchecked-exceptions',
    subject: 'java',
    category: 'Exception Handling',
    title: 'Checked vs. Unchecked Exceptions',
    subtitle: 'Throwable Hierarchy, RuntimeException & Compilation Enforcement',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Exceptions', 'Checked', 'Unchecked', 'RuntimeException', 'Error'],
    quickRecall: {
      oneLiner:
        'Checked exceptions (subclasses of `Exception` excluding `RuntimeException`) are verified at compile-time and MUST be handled; Unchecked exceptions (`RuntimeException`) happen at runtime from programmatic bugs.',
      simpleAnalogy:
        'Weather forecast vs Tripping analogy: A Checked Exception is a forecast of rain (`IOException`): you can foresee it before leaving the house, so the compiler forces you to take an umbrella (`try-catch`). An Unchecked Exception is tripping on a flat floor (`NullPointerException`): it happens unexpectedly at runtime due to a walking mistake.',
      whenToUse:
        'Throw checked exceptions for recoverable external conditions (missing file, bad network); throw unchecked exceptions for programmer API misuse (null argument, invalid index).',
      whyItMatters:
        'Failure to catch or declare a checked exception results in immediate javac compilation failure.',
      keyPoints: [
        'Throwable hierarchy: `Throwable` -> `Error` (unrecoverable system failure: OutOfMemoryError) and `Exception`.',
        'Checked Exception: Subclass of `Exception` that does NOT inherit from `RuntimeException` (e.g. `IOException`, `SQLException`, `ClassNotFoundException`). Must be caught (`try-catch`) or declared (`throws`).',
        'Unchecked Exception: Subclass of `RuntimeException` (e.g. `NullPointerException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException`). Not enforced by compiler.',
        '`try-with-resources`: Automatically closes resources implementing `AutoCloseable`, eliminating manual `finally` blocks.',
      ],
      formulaOrSyntax: {
        label: 'Checked vs Unchecked Declaration',
        codeOrLatex: '// Checked: Must declare "throws IOException"\npublic void readFile() throws IOException { ... }\n\n// Unchecked: No "throws" required\npublic void divide(int a, int b) { if (b == 0) throw new IllegalArgumentException(); }',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Constructing an exception captures the thread stack trace O(call stack depth)',
        space: 'O(stack depth) for StackTraceElement array',
      },
      commonMistakeOrTrap: {
        mistake: 'Catching `Exception` or `Throwable` and doing nothing: `catch (Exception e) {}` (Silent Failure).',
        fix: 'Never swallow exceptions silently! Always log the error or re-throw it wrapped in a custom runtime exception.',
        interviewTrap:
          'Question: "Does `Error` belong to checked or unchecked exceptions?" Answer: Unchecked! Both `Error` and `RuntimeException` are unchecked because errors represent fatal system conditions (OutOfMemoryError) that standard code cannot recover from.',
      },
      examCheatsheet: [
        'Checked: verified by compiler (IOException, SQLException)',
        'Unchecked: subclasses of RuntimeException (NPE, IllegalArgumentException)',
        'Error: unrecoverable JVM conditions (OutOfMemoryError, StackOverflowError)',
        '`try-with-resources` auto-closes anything implementing `AutoCloseable`',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Java Throwable Class Inheritance Hierarchy',
      caption:
        'Throwable branches into Error (unchecked) and Exception. Exception splits into Checked and RuntimeException (unchecked).',
      visualKey: 'java-exceptions-hierarchy-viz',
      details: {
        comparison: {
          headers: ['Property', 'Checked Exception', 'Unchecked Exception (`RuntimeException`)', '`Error`'],
          rows: [
            ['Enforced by Compiler?', 'Yes (Must catch or throws)', 'No (Optional)', 'No (Never catch Error)'],
            ['Root Superclass', '`java.lang.Exception`', '`java.lang.RuntimeException`', '`java.lang.Error`'],
            ['Typical Cause', 'External environment failure (file, db)', 'Programmer coding logic error (null, index)', 'JVM system failure (OOM, Stack)'],
            ['Recovery Expectation', 'Recoverable condition', 'Fix the underlying bug', 'Unrecoverable; JVM will terminate'],
          ],
        },
      },
    },
    animation: {
      type: 'java-exceptions-interactive',
      title: 'Exception Throw & Catch Stack Unwinding Animator',
      description:
        'Step through method call stack unwinding until a matching try-catch handler is reached.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Try-With-Resources & Exception Handling in Java',
      language: 'java',
      code: `import java.io.*;

public class ExceptionDemo {
    // 1. Checked exception MUST be declared with throws
    public static void readData(String path) throws IOException {
        // try-with-resources automatically closes FileReader
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            System.out.println(br.readLine());
        }
    }

    public static void main(String[] args) {
        try {
            readData("missing_file.txt");
        } catch (IOException e) {
            System.out.println("Caught checked exception: " + e.getMessage());
        }

        // Unchecked exception (Runtime)
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Caught unchecked exception: " + e.getMessage());
        }
    }
}`,
      input: 'Attempt to read non-existent file and divide by zero',
      output: 'Caught checked exception: missing_file.txt | Caught unchecked exception: / by zero',
      explanation:
        'Try-with-resources guarantees file handle cleanup, while checked and unchecked errors are caught cleanly.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following is a checked exception in Java?',
        options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'IOException', 'IllegalArgumentException'],
        correctIndex: 2,
        explanation: '`IOException` directly subclasses `Exception` without inheriting from `RuntimeException`, making it a checked exception.',
      },
      {
        id: 'q2',
        question: 'What interface must an object implement to be eligible for automatic closing in `try-with-resources`?',
        options: ['Serializable', 'AutoCloseable', 'Cloneable', 'Runnable'],
        correctIndex: 1,
        explanation: '`try-with-resources` requires classes to implement `AutoCloseable` (or its child `Closeable`), which defines `close()`.',
      },
      {
        id: 'q3',
        question: 'Why does the Java compiler NOT force developers to catch `NullPointerException`?',
        options: [
          'Because it is an Error',
          'Because it extends `RuntimeException`, which represents programmatic flaws that could occur almost anywhere',
          'Because Java 8 eliminated null',
          'Because it is caught by the JVM automatically',
        ],
        correctIndex: 1,
        explanation: 'Forcing developers to declare or catch RuntimeExceptions everywhere would clutter code with millions of useless try-catch blocks.',
      },
    ],
  },
  {
    id: 'java-arraylist-vs-linkedlist',
    subject: 'java',
    category: 'ArrayList, HashMap, HashSet and Queue',
    title: 'ArrayList vs. LinkedList',
    subtitle: 'Contiguous Dynamic Arrays vs. Doubly Linked Nodes',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['ArrayList', 'LinkedList', 'CPU Cache', 'Locality', 'Big-O'],
    quickRecall: {
      oneLiner:
        'ArrayList uses a contiguous dynamic array offering O(1) random access and excellent CPU cache locality; LinkedList uses doubly-linked nodes with O(1) head/tail modification but poor cache locality.',
      simpleAnalogy:
        'Train cars vs Treasure hunt analogy: An ArrayList is like a modern passenger train with numbered seats in a straight hallway: you can instantly walk directly to seat #50. A LinkedList is like a treasure hunt clue game: to find clue #50, you must first visit clue #1, read its pointer to clue #2, and follow all 49 pointers one by one.',
      whenToUse:
        'Use `ArrayList` for 99% of list use-cases; use `LinkedList` (or `ArrayDeque`) only when heavy queue/deque FIFO operations at head/tail dominate.',
      whyItMatters:
        'Even though LinkedList has theoretical O(1) node insertion, ArrayList is almost always faster in practice due to modern CPU L1/L2 cache prefetching.',
      keyPoints: [
        'ArrayList: Backed by `Object[] elementData`. Default capacity = 10. Grows by 50% (`newCapacity = oldCapacity + (oldCapacity >> 1)`) via `Arrays.copyOf`.',
        'ArrayList Random Access: O(1) via `get(i)` using instant memory offset `baseAddress + (i * 8)`.',
        'LinkedList: Doubly linked list (`Node` with `item`, `prev`, `next`). Implements both `List` and `Deque`.',
        'Memory Overhead: LinkedList consumes ~24 bytes of pointer overhead per element on 64-bit JVMs.',
      ],
      formulaOrSyntax: {
        label: 'ArrayList Growth Formula',
        codeOrLatex: 'int newCapacity = oldCapacity + (oldCapacity >> 1); // 1.5x expansion (10 -> 15 -> 22 -> 33)',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'ArrayList get(i): O(1) | LinkedList get(i): O(N) | ArrayList add(end): O(1) amortized',
        space: 'ArrayList: minor unused capacity | LinkedList: massive 24-byte pointer overhead per node',
      },
      commonMistakeOrTrap: {
        mistake: 'Choosing `LinkedList` because "inserting elements is faster O(1)".',
        fix: 'Inserting at an arbitrary index `add(index, val)` in LinkedList requires O(N) pointer traversal to find the node first, making it slower than ArrayList!',
        interviewTrap:
          'Question: "What should you use instead of LinkedList for a high-performance Queue or Stack?" Answer: `ArrayDeque`! It is backed by a circular array, is cache-friendly, does not allocate node objects, and beats LinkedList in almost every benchmark.',
      },
      examCheatsheet: [
        'ArrayList is backed by dynamic array; LinkedList by doubly-linked nodes',
        'ArrayList random access is O(1); LinkedList is O(N)',
        'ArrayList grows by 50% when full (1.5x)',
        'For Queue/Stack operations, prefer `ArrayDeque` over `LinkedList`',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'Memory Layout & Big-O Comparison',
      caption:
        'ArrayList stores contiguous pointers in a single array. LinkedList scatters nodes across heap connected by prev/next pointers.',
      visualKey: 'java-arraylist-linkedlist-viz',
      details: {
        comparison: {
          headers: ['Operation', 'ArrayList', 'LinkedList', 'Winner'],
          rows: [
            ['`get(i)` Random Access', 'O(1) Instant memory index', 'O(N) Must traverse pointers', 'ArrayList (Massive win)'],
            ['`add(e)` at end', 'O(1) Amortized (1.5x resize)', 'O(1) Node append', 'Tie'],
            ['`add(0, e)` at beginning', 'O(N) Shifts all elements', 'O(1) Adjusts head pointer', 'LinkedList'],
            ['Memory per element', '4-8 bytes pointer slot', '~24 bytes (Node + prev + next)', 'ArrayList (3x less memory)'],
            ['CPU Cache Locality', 'Excellent (prefetcher loads row)', 'Poor (scattered heap addresses)', 'ArrayList'],
          ],
        },
      },
    },
    animation: {
      type: 'java-arraylist-interactive',
      title: 'Array Expansion vs Node Linking Simulator',
      description:
        'Step through ArrayList 1.5x resizing vs LinkedList node creation and pointer adjustment.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'ArrayList vs LinkedList Operations in Java',
      language: 'java',
      code: `import java.util.*;

public class ListDemo {
    public static void main(String[] args) {
        List<String> arrayList = new ArrayList<>(Arrays.asList("A", "B", "C"));
        List<String> linkedList = new LinkedList<>(Arrays.asList("A", "B", "C"));

        // 1. O(1) Random Access on ArrayList
        System.out.println("ArrayList get(1):   " + arrayList.get(1)); // 'B'

        // 2. LinkedList head insertion
        linkedList.add(0, "FIRST");
        System.out.println("LinkedList head:    " + linkedList.get(0)); // 'FIRST'

        // 3. Recommended Queue alternative: ArrayDeque
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(10);
        stack.push(20);
        System.out.println("ArrayDeque pop:     " + stack.pop()); // 20
    }
}`,
      input: 'Run random access and insertion tests',
      output: 'ArrayList get(1): B | LinkedList head: FIRST | ArrayDeque pop: 20',
      explanation:
        'ArrayList provides instant random access, while ArrayDeque provides optimal queue/stack performance.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the time complexity of `get(int index)` in an `ArrayList`?',
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
        correctIndex: 0,
        explanation: 'Because elements are stored contiguously in memory, the address can be calculated instantly in O(1) time.',
      },
      {
        id: 'q2',
        question: 'By what factor does `ArrayList` expand when its internal array is full in Java 8+?',
        options: ['Doubles (2.0x)', 'Expands by 50% (1.5x old capacity)', 'Adds a fixed 10 slots', 'Triples (3.0x)'],
        correctIndex: 1,
        explanation: 'The growth formula `oldCapacity + (oldCapacity >> 1)` increases capacity by 50% (1.5x).',
      },
      {
        id: 'q3',
        question: 'Why does ArrayList outperform LinkedList in iteration loops on modern computers?',
        options: [
          'Because Java optimizes ArrayList with native assembly',
          'Because contiguous memory layout leverages CPU L1/L2 hardware cache lines and prefetching',
          'Because LinkedList does not support for-each loops',
          'Because ArrayList cannot contain null',
        ],
        correctIndex: 1,
        explanation: 'Contiguous arrays allow CPU hardware prefetchers to load entire blocks of elements into fast L1/L2 caches ahead of time.',
      },
    ],
  },
  {
    id: 'java-generics',
    subject: 'java',
    category: 'Generics',
    title: 'Java Generics & Type Erasure',
    subtitle: 'Compile-Time Type Safety and the PECS Principle',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Generics', 'Type Erasure', 'Wildcards', 'PECS', 'Bounded Types'],
    quickRecall: {
      oneLiner:
        'Generics enforce compile-time type safety; at runtime, the compiler erases all type parameters to their bounds (Type Erasure) to maintain backward compatibility.',
      simpleAnalogy:
        'Security guard check-in analogy: The security guard (compiler) checks your ticket at the entrance and guarantees that only VIP ticket holders enter the VIP lounge (compile-time safety). Once you are inside the party (runtime), everyone takes off their wristbands (type erasure): the JVM just sees generic partygoers (`Object`).',
      whenToUse:
        'Writing reusable collections, utility algorithms, and API frameworks without messy manual casting.',
      whyItMatters:
        'Eliminates runtime `ClassCastException` by detecting invalid type assignments at compile time.',
      keyPoints: [
        'Type Erasure: `List<String>` and `List<Integer>` both become raw `List` (or bounded type) at runtime in bytecode.',
        'No Primitive Generics: Cannot use `List<int>` because primitives do not inherit from `Object`; must use wrapper `List<Integer>`.',
        'Cannot instantiate generic types directly: `new T()` is illegal because `T` does not exist at runtime.',
        'PECS Rule: "Producer Extends, Consumer Super": Use `<? extends T>` when reading items out of a collection; use `<? super T>` when writing items in.',
      ],
      formulaOrSyntax: {
        label: 'PECS Wildcard Syntax',
        codeOrLatex: '// Producer (Read-only):\npublic void copyFrom(List<? extends Number> source) { ... }\n// Consumer (Write-only):\npublic void copyTo(List<? super Number> destination) { ... }',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Zero runtime overhead (Types erased, synthetic casts inserted by compiler)',
        space: 'Single compiled bytecode class shared by all generic instantiations',
      },
      commonMistakeOrTrap: {
        mistake: 'Assuming that `List<String>` is a subclass of `List<Object>`.',
        fix: 'Generics are INVARIANT! `List<String>` does NOT inherit from `List<Object>`; if it did, you could add an `Integer` to a `List<String>` through the object reference, causing runtime crashes.',
        interviewTrap:
          'Question: "Can you create an array of generic types like `new T[10]` or `new List<String>[10]`?" Answer: No! Generic array creation is forbidden in Java because arrays are reified (store type at runtime) while Generics are erased, creating heap pollution.',
      },
      examCheatsheet: [
        'Type Erasure removes type arguments at runtime',
        'Generics are invariant: `List<String>` is NOT a `List<Object>`',
        'PECS: Producer Extends, Consumer Super',
        'Cannot instantiate `new T()` or `new T[10]` directly',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Compile-Time Safety vs. Runtime Type Erasure',
      caption:
        'The compiler verifies types and inserts casts, then erases generic parameters to Object in bytecode.',
      visualKey: 'java-generics-erasure-viz',
      details: {
        comparison: {
          headers: ['Construct', 'Compile-Time View', 'Runtime Bytecode View (After Erasure)'],
          rows: [
            ['`List<String> list`', 'Enforces String-only elements', 'Raw `List` holding `Object` instances'],
            ['`list.get(0)`', 'Returns String type directly', 'Returns `(String) list.get(0)` (Synthetic cast)'],
            ['`<T extends Number>`', 'Requires Number or subclasses', 'Replaced with `Number` type in bytecode'],
          ],
        },
      },
    },
    animation: {
      type: 'java-generics-interactive',
      title: 'PECS Wildcard Producer vs Consumer Simulator',
      description:
        'Step through reading from <? extends T> vs writing to <? super T>.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Generics and the PECS Principle in Java',
      language: 'java',
      code: `import java.util.*;

public class GenericsDemo {
    // Producer Extends: Only reads numbers from source
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) {
            sum += n.doubleValue(); // Reading is safe!
        }
        return sum;
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.5, 2.5);

        System.out.println("Ints Sum:    " + sumOfList(ints));    // 6.0
        System.out.println("Doubles Sum: " + sumOfList(doubles)); // 4.0
    }
}`,
      input: 'Pass List<Integer> and List<Double> to sumOfList()',
      output: 'Ints Sum: 6.0 | Doubles Sum: 4.0',
      explanation:
        '`? extends Number` accepts both Integer and Double lists safely while enabling polymorphic reads.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is Type Erasure in Java Generics?',
        options: [
          'A feature that deletes unused classes from memory',
          'The process where the compiler checks types and removes generic type arguments from bytecode for backward compatibility',
          'An error that occurs when casting to String',
          'A garbage collection technique',
        ],
        correctIndex: 1,
        explanation: 'Type Erasure removes all generic type annotations during compilation, replacing them with Object or bounds.',
      },
      {
        id: 'q2',
        question: 'Under the PECS rule, when should you use `<? extends T>`?',
        options: [
          'When you only write/add elements into the collection (Consumer)',
          'When you only read/produce elements from the collection (Producer)',
          'When the collection is empty',
          'When you need multi-threading',
        ],
        correctIndex: 1,
        explanation: 'PECS stands for Producer Extends, Consumer Super: use extends when you want to read items out of a collection.',
      },
      {
        id: 'q3',
        question: 'Why does `List<String> list = new ArrayList<Object>();` fail to compile?',
        options: [
          'Because Java generics are invariant: List<String> is not a subtype of List<Object>',
          'Because Object cannot be instantiated',
          'Because ArrayList does not support generics',
          'Because String is final',
        ],
        correctIndex: 0,
        explanation: 'Generics are invariant; allowing this would permit adding arbitrary non-String objects into what claims to be a String list.',
      },
    ],
  },

  {
    "id": "java-control-flow",
    "subject": "java",
    "category": "Operators and Control Flow",
    "title": "Short-Circuit Operators & Switch Expressions",
    "subtitle": "&& vs &, || vs |, and Modern Arrow Switch Expressions with yield",
    "difficulty": "Beginner",
    "isInterviewFavorite": true,
    "readTimeSeconds": 45,
    "tags": [
      "Operators",
      "Short-Circuit",
      "Switch",
      "yield",
      "Control Flow"
    ],
    "quickRecall": {
      "oneLiner": "Java provides short-circuit boolean operators (&&, ||) to safely prevent NullPointerExceptions, alongside modern enhanced switch expressions with 'yield'.",
      "simpleAnalogy": "A security checklist before entering a bank vault: Check #1: 'Is your badge valid?' If the answer is NO, the guard stops checking immediately without bothering to check #2: 'Do you know the password?' (Short-circuit &&). Testing check #2 when badge is null would trigger an alarm (NullPointerException)!",
      "whenToUse": "Safe null checks (if (user != null && user.isActive())), bitwise flag masks with & and |, and exhaustive multi-branch value returns with switch expressions.",
      "whyItMatters": "Using single & or | evaluates both sides unconditionally. If the right-hand side accesses a property of a null reference on the left, your app crashes with NullPointerException.",
      "keyPoints": [
        "&& vs &: && short-circuits (skips right-hand side if left is false); & evaluates BOTH sides unconditionally (also used for bitwise AND).",
        "|| vs |: || short-circuits (skips right-hand side if left is true); | evaluates BOTH sides unconditionally.",
        "Modern Switch Expressions (Java 14+): Arrow syntax 'case X -> value' avoids fall-through bugs and does NOT require break statements.",
        "The 'yield' Keyword: Returns a value from a multi-line switch block statement.",
        "Exhaustiveness: Switch expressions returning a value MUST cover every possible case or provide a 'default' branch."
      ],
      "formulaOrSyntax": {
        "label": "Short-Circuit Null Check & Switch Expression",
        "codeOrLatex": "if (obj != null && obj.isValid()) { ... }\n\nString label = switch (status) {\n    case ACTIVE -> \"Live\";\n    case PENDING -> { log(); yield \"In Review\"; }\n    default -> \"Unknown\";\n};",
        "isLatex": false,
        "language": "java"
      },
      "complexity": {
        "time": "O(1) constant time boolean and jump-table switch evaluation",
        "space": "O(1) memory"
      },
      "commonMistakeOrTrap": {
        "mistake": "Writing 'if (str != null & str.length() > 0)' using single '&'.",
        "fix": "Use double '&&'! Single '&' evaluates str.length() even when str is null, immediately throwing NullPointerException.",
        "interviewTrap": "Question: 'What happens in classic switch without break statements?' Answer: Fall-through! Execution flows uncontrollably into all subsequent cases until the switch block ends. Modern arrow syntax (->) eliminates this trap."
      },
      "examCheatsheet": [
        "&& and ||: Short-circuit (stops evaluation early)",
        "& and |: Unconditional evaluation (evaluates both operands)",
        "Modern switch: 'case X -> result;' does NOT fall through",
        "'yield' returns values from multi-line switch branches"
      ]
    },
    "visual": {
      "type": "flowchart",
      "title": "Short-Circuit Operator Evaluation Path",
      "caption": "In 'A && B', if A evaluates to false, evaluation terminates immediately, returning false without touching B.",
      "visualKey": "java-control-flow",
      "details": {
        "comparison": {
          "headers": [
            "Operator",
            "Behavior",
            "Right Side Evaluated if Left is False?",
            "Null Safety"
          ],
          "rows": [
            [
              "&&",
              "Logical AND (Short-circuit)",
              "NO (Skipped)",
              "100% Safe (obj != null && obj.fn())"
            ],
            [
              "&",
              "Bitwise / Unconditional AND",
              "YES (Always evaluated)",
              "DANGEROUS: Throws NullPointerException"
            ],
            [
              "||",
              "Logical OR (Short-circuit)",
              "YES (if left is false)",
              "Safe"
            ],
            [
              "|",
              "Bitwise / Unconditional OR",
              "YES (Always evaluated)",
              "DANGEROUS: Evaluates both sides"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Short-Circuit Evaluation vs Unconditional Evaluation",
      "description": "Trace how the JVM skips evaluating null.length() when using &&, preventing a crash.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Safe Short-Circuit Null Checks & Modern Switch Expression",
      "language": "java",
      "code": "public class ControlFlowDemo {\n    public static void main(String[] args) {\n        String user = null;\n\n        // 1. Safe short-circuit: user.length() is NEVER evaluated\n        if (user != null && user.length() > 0) {\n            System.out.println(\"User present: \" + user);\n        } else {\n            System.out.println(\"Safe check passed: user is null\");\n        }\n\n        // 2. Modern Java Switch Expression returning a value\n        int statusCode = 200;\n        String message = switch (statusCode) {\n            case 200, 201 -> \"Success: Request Processed\";\n            case 404 -> \"Client Error: Resource Not Found\";\n            case 500 -> \"Server Error: Internal Failure\";\n            default -> {\n                System.out.println(\"Logging unmapped code: \" + statusCode);\n                yield \"Unknown Status\";\n            }\n        };\n        System.out.println(\"HTTP Status: \" + message);\n    }\n}",
      "input": "user = null, statusCode = 200",
      "output": "Safe check passed: user is null | HTTP Status: Success: Request Processed",
      "explanation": "&& prevents evaluating user.length() on null, and modern switch returns a value cleanly without break statements."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What happens when executing: String s = null; if (s != null & s.length() > 0)?",
        "options": [
          "It prints false safely",
          "It compiles with an error",
          "It throws NullPointerException at runtime because single & evaluates both sides",
          "It automatically initializes s to empty string"
        ],
        "correctIndex": 2,
        "explanation": "Single & is unconditional and always evaluates both sides. Calling s.length() on null throws NullPointerException."
      },
      {
        "id": "q2",
        "question": "In modern Java switch expressions (Java 14+), what keyword is used to return a value from a multi-line block?",
        "options": [
          "return",
          "yield",
          "send",
          "break"
        ],
        "correctIndex": 1,
        "explanation": "The 'yield' keyword yields a value from inside a multi-line block within a switch expression."
      },
      {
        "id": "q3",
        "question": "Why does arrow switch syntax (case X -> result) prevent classic Java switch bugs?",
        "options": [
          "It runs in parallel threads",
          "It eliminates accidental fall-through into subsequent cases without needing 'break'",
          "It only allows integers",
          "It compiles to C++"
        ],
        "correctIndex": 1,
        "explanation": "Arrow syntax executes strictly only the matched branch and automatically terminates without falling through."
      }
    ]
  },
  {
    "id": "java-loops-arrays",
    "subject": "java",
    "category": "Loops and Arrays",
    "title": "Array Memory Allocation & Enhanced for-each Loop",
    "subtitle": "Contiguous Heap Memory, Bounds Checking, Arrays.copyOf vs clone()",
    "difficulty": "Beginner",
    "isInterviewFavorite": true,
    "readTimeSeconds": 50,
    "tags": [
      "Arrays",
      "Heap",
      "for-each",
      "System.arraycopy",
      "Memory"
    ],
    "quickRecall": {
      "oneLiner": "In Java, arrays are fixed-length reference objects allocated contiguously in Heap memory with automatic 0-based boundary checks.",
      "simpleAnalogy": "A reserved row of lockers at a gym: when you ask for 'new int[5]', the gym manager reserves 5 adjacent lockers in a row (Heap). The locker row cannot expand or shrink. If you attempt to open locker #5 (when lockers are indexed 0 to 4), the manager stops you instantly: 'ArrayIndexOutOfBoundsException'!",
      "whenToUse": "Fixed-size performance-critical collections, multidimensional matrices, and primitive data storage without Integer/Double wrapper boxing overhead.",
      "whyItMatters": "Unlike C++, Java arrays carry their length (.length property) and cannot access memory outside bounds, guaranteeing JVM memory safety.",
      "keyPoints": [
        "Fixed Size: Once created, array length is immutable. To resize, you must allocate a new array and copy elements.",
        "Memory Layout: The array object itself lives on the Heap. Local array reference variables live on the Stack.",
        "Default Initialization: Primitive numeric elements default to 0/0.0, booleans to false, object references to null.",
        "Enhanced For-Each (for (int x : arr)): Read-only traversal. Modifying the loop variable 'x' does NOT change the array element!",
        "Fast Array Copy: System.arraycopy() is a native C-level memcpy, running 10x faster than manual element-by-element copy loops."
      ],
      "formulaOrSyntax": {
        "label": "Array Declaration & Copying",
        "codeOrLatex": "int[] arr = new int[5];  // Heap allocated, initialized to 0\nint[] copy = Arrays.copyOf(arr, arr.length);\nSystem.arraycopy(src, 0, dest, 0, len);  // Native memcpy",
        "isLatex": false,
        "language": "java"
      },
      "complexity": {
        "time": "Index access O(1) constant time; Linear search O(N); Copying O(N)",
        "space": "O(N) contiguous Heap allocation"
      },
      "commonMistakeOrTrap": {
        "mistake": "Attempting to modify array elements inside an enhanced for-each loop: for (int x : arr) { x = 99; }",
        "fix": "x is just a local copy of the element! Use standard indexed loop to mutate: for (int i = 0; i < arr.length; i++) { arr[i] = 99; }",
        "interviewTrap": "Question: 'Is int[] an Object in Java?' Answer: Yes! Every array in Java inherits directly from java.lang.Object and possesses methods like clone(), equals(), and getClass()."
      },
      "examCheatsheet": [
        "Array length is fixed and read via .length (field, not method!)",
        "Primitive arrays default to 0 / false; Object arrays default to null",
        "Enhanced for-each loop cannot mutate array elements",
        "System.arraycopy() is native C-speed block memory copy"
      ]
    },
    "visual": {
      "type": "memory-layout",
      "title": "Java Array Memory Layout: Stack Reference to Heap Object",
      "caption": "The array variable 'nums' on the Stack stores a 64-bit reference address pointing to contiguous memory cells in the Heap.",
      "visualKey": "java-loops-arrays",
      "details": {
        "comparison": {
          "headers": [
            "Type",
            "Memory Storage",
            "Default Value",
            "Size Mutability"
          ],
          "rows": [
            [
              "int[] (Primitive)",
              "Contiguous raw 32-bit ints in Heap",
              "0",
              "Fixed length"
            ],
            [
              "String[] (Reference)",
              "Contiguous references to String pool",
              "null",
              "Fixed length"
            ],
            [
              "ArrayList<Integer>",
              "Dynamic array of boxed Integer objects",
              "Empty (size 0)",
              "Automatically resizes"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Array Heap Allocation & Index Traversal",
      "description": "Watch stack pointer link to contiguous Heap slots, initializing default values, and accessing elements via index offsets.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Array Allocation, Mutation, and Native System.arraycopy",
      "language": "java",
      "code": "import java.util.Arrays;\n\npublic class ArrayDemo {\n    public static void main(String[] args) {\n        // 1. Heap allocation initialized with default 0s\n        int[] numbers = new int[]{10, 20, 30, 40, 50};\n\n        // 2. Traversal with enhanced for-each\n        int sum = 0;\n        for (int val : numbers) {\n            sum += val;\n        }\n        System.out.println(\"Sum of elements: \" + sum);\n\n        // 3. Native fast memory copying (System.arraycopy)\n        int[] enlarged = new int[8];\n        System.arraycopy(numbers, 0, enlarged, 0, numbers.length);\n        enlarged[5] = 60;\n\n        System.out.println(\"Original Array: \" + Arrays.toString(numbers));\n        System.out.println(\"Enlarged Array: \" + Arrays.toString(enlarged));\n    }\n}",
      "input": "int[] {10, 20, 30, 40, 50} copied to larger array of size 8",
      "output": "Sum of elements: 150 | Enlarged Array: [10, 20, 30, 40, 50, 60, 0, 0]",
      "explanation": "System.arraycopy quickly transfers raw contiguous bytes, and trailing elements retain default 0 values."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What is the default value of elements in a newly allocated boolean[] array of size 10 in Java?",
        "options": [
          "true",
          "false",
          "null",
          "0"
        ],
        "correctIndex": 1,
        "explanation": "In Java, primitive boolean array elements default to false."
      },
      {
        "id": "q2",
        "question": "Can you resize an existing Java array after its creation?",
        "options": [
          "Yes, by calling arr.resize(10)",
          "Yes, if it is declared with var",
          "No, arrays have fixed immutable length; resizing requires allocating a new array and copying elements",
          "Yes, if initialized with new int[]"
        ],
        "correctIndex": 2,
        "explanation": "Java arrays have fixed size. If you need dynamic resizing, use ArrayList."
      },
      {
        "id": "q3",
        "question": "What happens if you execute: for (int x : arr) { x = x * 2; }?",
        "options": [
          "Every element in arr is doubled",
          "The array is cleared",
          "Only local variable x is doubled; arr remains completely unchanged",
          "A compilation error is thrown"
        ],
        "correctIndex": 2,
        "explanation": "In an enhanced for-each loop, x is a local copy of each primitive value. Modifying x does not affect the array in Heap."
      }
    ]
  },
  {
    "id": "java-methods-recursion",
    "subject": "java",
    "category": "Methods and Recursion",
    "title": "Pass-By-Value Mechanics & Stack Frames in Java",
    "subtitle": "Reference Passing vs Value Passing, Call Stack Activation Records & StackOverflowError",
    "difficulty": "Intermediate",
    "isInterviewFavorite": true,
    "readTimeSeconds": 55,
    "tags": [
      "Pass-By-Value",
      "Stack Frames",
      "Recursion",
      "StackOverflowError",
      "Memory"
    ],
    "quickRecall": {
      "oneLiner": "Java is strictly 100% Pass-By-Value: primitives pass copies of bits, and object references pass copies of pointer addresses.",
      "simpleAnalogy": "You write down your home address on a piece of paper and hand it to a painter (pass-by-value of a reference). The painter can drive to your house and paint your front door blue (modifies internal object state). But if the painter burns the piece of paper and writes a different address on it (reassigns the reference parameter), your actual house does not move!",
      "whenToUse": "Method design, recursive algorithms (tree traversal, divide-and-conquer), and debugging unexpected parameter mutations.",
      "whyItMatters": "The single most frequently failed Java interview question: 'Does Java pass objects by reference?' NO! It passes object references by value.",
      "keyPoints": [
        "Strictly Pass-By-Value: Java NEVER passes variables by reference. A copy of the value is ALWAYS pushed onto the callee's stack frame.",
        "Primitives: Passing int, double, etc. copies the raw value. Changes inside the method never affect the caller.",
        "Object References: The value being copied IS the memory address. Both caller and callee reference the same Heap object.",
        "Reassignment Trap: Reassigning 'obj = new Car()' inside a method reassigns the local parameter copy only. The caller's reference remains unchanged!",
        "StackOverflowError: Recursion without a working base case exhausts the thread's Stack memory (default ~1MB per thread)."
      ],
      "formulaOrSyntax": {
        "label": "Method Stack Frame Lifecycle",
        "codeOrLatex": "void mutate(Dog d) {\n    d.setName(\"Buddy\"); // MUTATES caller's heap object\n    d = new Dog(\"Max\"); // REASSIGNS local copy only (caller unaffected!)\n}",
        "isLatex": false,
        "language": "java"
      },
      "complexity": {
        "time": "Method dispatch O(1) constant time; Recursion O(depth)",
        "space": "O(1) stack frame per invocation; O(depth) call stack memory"
      },
      "commonMistakeOrTrap": {
        "mistake": "Believing a swap method 'void swap(Person a, Person b) { Person temp = a; a = b; b = temp; }' will swap the caller's objects.",
        "fix": "It does nothing! It only swaps local copies of the reference pointers inside the method frame.",
        "interviewTrap": "Question: 'Is Java pass-by-reference or pass-by-value?' Answer: Strictly pass-by-value! When an object is passed, a copy of the reference address is passed by value."
      },
      "examCheatsheet": [
        "Java is 100% strictly Pass-By-Value (no exceptions!)",
        "Passing an object passes a copy of its 64-bit reference address",
        "Reassigning a method parameter does NOT affect the caller",
        "StackOverflowError: Thrown when call stack exceeds thread limit (-Xss)"
      ]
    },
    "visual": {
      "type": "memory-layout",
      "title": "Java Method Call Stack & Reference Value Copy",
      "caption": "Both caller stack frame and callee stack frame hold independent copies of address 0x4A, pointing to the same Heap object.",
      "visualKey": "java-methods-recursion",
      "details": {
        "comparison": {
          "headers": [
            "Type Passed",
            "What is Copied",
            "Can Mutate Original Object?",
            "Can Reassign Caller Variable?"
          ],
          "rows": [
            [
              "Primitive (int, boolean)",
              "Raw bits of value (e.g. 42)",
              "NO (Caller independent)",
              "NO"
            ],
            [
              "Object (e.g. List, Person)",
              "Reference memory address (0x4A)",
              "YES (via setters/mutators)",
              "NO (Reassignment is local)"
            ],
            [
              "Immutable Object (String)",
              "Reference address to string pool",
              "NO (Strings are immutable)",
              "NO"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Pass-By-Value Stack Frame Trace",
      "description": "Trace method invocation: pushing stack frame, copying reference address, mutating Heap field, and destroying frame on return.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Proving Java Pass-by-Value with Primitive and Object Mutator",
      "language": "java",
      "code": "public class PassByValueDemo {\n    static class Box {\n        int value = 10;\n    }\n\n    static void modify(int num, Box b) {\n        num = 999;          // Primitive copy modified -> Caller unaffected\n        b.value = 50;       // Heap object mutated via reference copy -> Caller sees change!\n        b = new Box();      // Reassignment -> Only affects local variable 'b'!\n        b.value = 1000;\n    }\n\n    public static void main(String[] args) {\n        int x = 10;\n        Box myBox = new Box();\n\n        modify(x, myBox);\n\n        System.out.println(\"x after method: \" + x);             // 10\n        System.out.println(\"myBox.value after: \" + myBox.value); // 50 (NOT 1000!)\n    }\n}",
      "input": "x = 10, myBox.value = 10",
      "output": "x after method: 10 | myBox.value after: 50",
      "explanation": "Primitive x remains 10. myBox.value changed to 50 via setter, but reassigning b = new Box() had zero effect on myBox."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "Which statement correctly describes parameter passing in Java?",
        "options": [
          "Primitives are passed by value; objects are passed by reference",
          "All arguments in Java are strictly passed by value",
          "Objects are passed by reference if marked with final",
          "Methods can choose passing mode via annotations"
        ],
        "correctIndex": 1,
        "explanation": "Java is strictly pass-by-value. When an object is passed, the value of the reference address is copied."
      },
      {
        "id": "q2",
        "question": "What happens to the caller's variable if a method reassigns an object parameter: 'void test(Person p) { p = new Person(); }'?",
        "options": [
          "The caller's variable now points to the new Person",
          "The original Person object in Heap is deleted",
          "The caller's variable is completely unaffected and points to the original Person",
          "A compilation error occurs"
        ],
        "correctIndex": 2,
        "explanation": "Reassigning the parameter only changes the local reference variable inside test()'s stack frame; the caller's variable remains unchanged."
      },
      {
        "id": "q3",
        "question": "What error occurs when a recursive method has no terminating base case?",
        "options": [
          "OutOfMemoryError",
          "StackOverflowError",
          "IllegalStateException",
          "NullPointerException"
        ],
        "correctIndex": 1,
        "explanation": "Infinite recursive calls push stack frames until the thread stack memory limit is breached, throwing StackOverflowError."
      }
    ]
  },
  {
    "id": "java-encapsulation-abstraction",
    "subject": "java",
    "category": "Encapsulation and Abstraction",
    "title": "Encapsulation, Data Hiding & Access Modifiers",
    "subtitle": "private, default (package-private), protected & public Scope Boundaries",
    "difficulty": "Beginner",
    "isInterviewFavorite": true,
    "readTimeSeconds": 45,
    "tags": [
      "OOP",
      "Encapsulation",
      "Abstraction",
      "Access Modifiers",
      "Data Hiding"
    ],
    "quickRecall": {
      "oneLiner": "Encapsulation bundles data with code and hides internal state via private fields; Abstraction exposes essential behavior while hiding complex implementation details.",
      "simpleAnalogy": "A car accelerator pedal: you press the pedal to accelerate (Abstraction: clean public interface). You don't need to know how fuel injection, spark plugs, or hydraulic valves work, and you cannot directly touch the fuel intake valve with your bare hands while driving (Encapsulation: private internal state).",
      "whenToUse": "Every domain entity class to protect business invariants, prevent invalid state (e.g. negative balance), and decouple API consumers from internal implementation.",
      "whyItMatters": "Public fields allow outside code to corrupt internal state directly. Encapsulation enables validation, thread-safety, and future implementation changes without breaking client code.",
      "keyPoints": [
        "Encapsulation: Make fields 'private' and expose controlled access via public getters and setters with validation logic.",
        "Abstraction: Achieved using Abstract Classes and Interfaces, specifying WHAT an object does rather than HOW it does it.",
        "private: Accessible ONLY within the defining class.",
        "default (no keyword): Accessible within classes in the SAME package.",
        "protected: Accessible within the same package PLUS subclasses in other packages.",
        "public: Accessible everywhere across all packages."
      ],
      "formulaOrSyntax": {
        "label": "Access Modifier Visibility Matrix",
        "codeOrLatex": "Class | Package | Subclass (outside) | World\nprivate   : Yes   | No      | No                 | No\ndefault   : Yes   | Yes     | No                 | No\nprotected : Yes   | Yes     | Yes                | No\npublic    : Yes   | Yes     | Yes                | Yes",
        "isLatex": false
      },
      "complexity": {
        "time": "O(1) access control checked at compile-time by javac with zero runtime penalty",
        "space": "O(1) memory overhead"
      },
      "commonMistakeOrTrap": {
        "mistake": "Returning direct references to mutable internal objects from getters (e.g. 'public Date getDob() { return this.dob; }').",
        "fix": "Return a defensive copy: 'return new Date(this.dob.getTime());' or use immutable types like java.time.LocalDate.",
        "interviewTrap": "Question: 'What is package-private in Java?' Answer: When no access modifier is specified (default), the member is accessible ONLY to classes within the exact same package, but NOT to subclasses in other packages."
      },
      "examCheatsheet": [
        "private -> class only",
        "default (package-private) -> same package only",
        "protected -> same package + subclasses anywhere",
        "public -> everywhere",
        "Encapsulation = Data Hiding; Abstraction = Implementation Hiding"
      ]
    },
    "visual": {
      "type": "diagram",
      "title": "Java Access Modifier Visibility Hierarchy",
      "caption": "Visibility expands outward: private (innermost) -> default (package) -> protected (package + subclasses) -> public (world).",
      "visualKey": "java-encapsulation-abstraction",
      "details": {
        "comparison": {
          "headers": [
            "Modifier",
            "Same Class",
            "Same Package",
            "Subclass (Different Pkg)",
            "Everywhere"
          ],
          "rows": [
            [
              "private",
              "YES",
              "NO",
              "NO",
              "NO"
            ],
            [
              "default (no modifier)",
              "YES",
              "YES",
              "NO",
              "NO"
            ],
            [
              "protected",
              "YES",
              "YES",
              "YES",
              "NO"
            ],
            [
              "public",
              "YES",
              "YES",
              "YES",
              "YES"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Access Boundary Check at Compile-Time",
      "description": "Watch the compiler check package scopes and subclass relationships, enforcing private and protected boundaries.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Encapsulating Business Invariants with Defensive Setters",
      "language": "java",
      "code": "public class BankAccount {\n    // 1. Private fields hide internal state from outside tampering\n    private double balance;\n    private final String accountNumber;\n\n    public BankAccount(String accountNumber, double initialDeposit) {\n        this.accountNumber = accountNumber;\n        if (initialDeposit < 0) throw new IllegalArgumentException(\"Deposit cannot be negative\");\n        this.balance = initialDeposit;\n    }\n\n    // 2. Controlled mutation enforcing business rules\n    public void deposit(double amount) {\n        if (amount <= 0) throw new IllegalArgumentException(\"Amount must be > 0\");\n        this.balance += amount;\n    }\n\n    // 3. Read-only getter\n    public double getBalance() {\n        return this.balance;\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(\"ACC-9812\", 500.0);\n        acc.deposit(250.0);\n        // acc.balance = -10000; // COMPILATION ERROR: balance has private access!\n        System.out.println(\"Verified Balance: $\" + acc.getBalance());\n    }\n}",
      "input": "Create BankAccount with $500, deposit $250",
      "output": "Verified Balance: $750.0",
      "explanation": "Private fields guarantee that external callers cannot corrupt balance into an invalid negative number."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "Which access modifier allows access to subclasses in other packages, but NOT to unrelated classes in other packages?",
        "options": [
          "public",
          "protected",
          "default (package-private)",
          "private"
        ],
        "correctIndex": 1,
        "explanation": "protected members are accessible to all classes in the same package AND to subclasses in any other package."
      },
      {
        "id": "q2",
        "question": "What is the access level when no modifier is written before a field or method?",
        "options": [
          "public",
          "private",
          "default (package-private)",
          "protected"
        ],
        "correctIndex": 2,
        "explanation": "When omitted, Java assigns package-private access, visible only to classes in the same package."
      },
      {
        "id": "q3",
        "question": "What is the primary difference between Encapsulation and Abstraction?",
        "options": [
          "Encapsulation is for variables; Abstraction is for loops",
          "Encapsulation hides internal state and data; Abstraction hides implementation complexity and exposes behavior",
          "Encapsulation is deprecated in Java 17",
          "Abstraction requires private constructors"
        ],
        "correctIndex": 1,
        "explanation": "Encapsulation protects data via private fields; Abstraction exposes simple interfaces (like a steering wheel) while hiding complex machinery."
      }
    ]
  },
  {
    "id": "java-constructors-super",
    "subject": "java",
    "category": "Constructors and this / super",
    "title": "Constructor Chaining with this() and super()",
    "subtitle": "Object Initialization Sequence: Static Blocks, Instance Initializers & super() Delegation",
    "difficulty": "Beginner",
    "isInterviewFavorite": true,
    "readTimeSeconds": 50,
    "tags": [
      "Constructors",
      "this()",
      "super()",
      "Initialization",
      "Inheritance"
    ],
    "quickRecall": {
      "oneLiner": "Constructors initialize new object instances, delegating within the same class via this() or to the parent class via super(), which must be the very first statement.",
      "simpleAnalogy": "Building a 2-story house: before you can build the second floor (child class), the foundation and first floor (parent class super()) MUST be completed first. If you don't explicitly call the parent foundation contractor, Java automatically calls the default parent constructor for you!",
      "whenToUse": "Overloaded constructors for default arguments, initializing immutable final fields, and setting up subclass state.",
      "whyItMatters": "Failing to understand constructor order causes subtle bugs where child constructor logic references uninitialized parent fields.",
      "keyPoints": [
        "First Statement Rule: A call to this(...) or super(...) MUST be the absolute first statement in a constructor body.",
        "Default super(): If a constructor does not explicitly call this() or super(), the compiler automatically inserts 'super();' calling the parent's no-arg constructor.",
        "No-Arg Constructor Trap: If parent defines a parameterized constructor and NO no-arg constructor, child classes MUST explicitly call super(args) or they will fail to compile!",
        "Initialization Order: 1. Parent static blocks -> 2. Child static blocks -> 3. Parent instance blocks & constructor -> 4. Child instance blocks & constructor.",
        "Constructors are NOT inherited: Subclasses do not inherit parent constructors; they merely invoke them."
      ],
      "formulaOrSyntax": {
        "label": "Constructor Chaining Pattern",
        "codeOrLatex": "class Child extends Parent {\n    Child() { this(\"Default\"); }       // Calls overloaded constructor\n    Child(String name) { super(name); } // Calls parent constructor (MUST BE FIRST!)\n}",
        "isLatex": false,
        "language": "java"
      },
      "complexity": {
        "time": "O(1) allocation and sequential field initialization",
        "space": "O(1) object header + fields allocated in Heap"
      },
      "commonMistakeOrTrap": {
        "mistake": "Placing any code before super() or this(), such as System.out.println() or logging statements.",
        "fix": "super() and this() must strictly be the first statement on line 1 of the constructor body.",
        "interviewTrap": "Question: 'What happens if a parent class has only Parent(int x) and child defines Child() { }?' Answer: Compile Error! The compiler attempts to insert super(), but Parent has no no-arg constructor."
      },
      "examCheatsheet": [
        "this(...) calls overloaded constructor in the same class",
        "super(...) calls parent class constructor",
        "Must be the FIRST statement in the constructor",
        "Static initializers run ONCE when class is loaded; constructors run on every 'new'"
      ]
    },
    "visual": {
      "type": "flowchart",
      "title": "Java Object Initialization Order: Static -> Parent -> Child",
      "caption": "Class loading triggers static initializers first. Then 'new' triggers parent constructor, followed by child fields and constructor.",
      "visualKey": "java-constructors-super",
      "details": {
        "comparison": {
          "headers": [
            "Step",
            "What Runs",
            "When",
            "Frequency"
          ],
          "rows": [
            [
              "1. Static Initializers",
              "Parent static -> Child static",
              "Class loading by ClassLoader",
              "Once per JVM lifetime"
            ],
            [
              "2. Parent Instance",
              "Parent instance variables & super()",
              "Object instantiation via 'new'",
              "Every time 'new' is called"
            ],
            [
              "3. Child Instance",
              "Child instance variables & constructor",
              "After parent constructor returns",
              "Every time 'new' is called"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Constructor Chaining Execution Sequence",
      "description": "Watch Child() invoke this(param), which invokes super(param), initializing the parent before running child body.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Constructor Chaining with this() and super() Delegation",
      "language": "java",
      "code": "class Vehicle {\n    String brand;\n    Vehicle(String brand) {\n        this.brand = brand;\n        System.out.println(\"1. Vehicle constructor initialized: \" + brand);\n    }\n}\n\nclass Car extends Vehicle {\n    int wheels;\n\n    // Overloaded constructor chains to sibling constructor\n    Car() {\n        this(\"Tesla\", 4); // Delegating to overloaded Car constructor\n    }\n\n    Car(String brand, int wheels) {\n        super(brand);     // MUST be first statement: calls Vehicle(brand)\n        this.wheels = wheels;\n        System.out.println(\"2. Car constructor initialized with \" + wheels + \" wheels\");\n    }\n}\n\npublic class ConstructorDemo {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n    }\n}",
      "input": "new Car() with no arguments",
      "output": "1. Vehicle constructor initialized: Tesla | 2. Car constructor initialized with 4 wheels",
      "explanation": "Car() chains to Car(String, int), which invokes super(brand) before running its own body."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "Where must this() or super() be placed inside a constructor?",
        "options": [
          "Anywhere in the constructor body",
          "Strictly as the very first statement",
          "At the end of the constructor",
          "Inside a try-catch block"
        ],
        "correctIndex": 1,
        "explanation": "Java enforces that this() or super() must be the first statement to ensure parent state is initialized before child execution."
      },
      {
        "id": "q2",
        "question": "Can a constructor contain BOTH a call to this() AND a call to super()?",
        "options": [
          "Yes, if this() is first and super() is second",
          "No, because both require being the first statement, so only one can be used",
          "Yes, in abstract classes",
          "Yes, if one is empty"
        ],
        "correctIndex": 1,
        "explanation": "Both calls must be the first statement, which is physically impossible. Calling this() will eventually chain to a constructor that calls super()."
      },
      {
        "id": "q3",
        "question": "What constructor does the Java compiler generate if a class defines zero constructors?",
        "options": [
          "No constructor is created",
          "A public/package-private no-argument default constructor with a body of 'super();'",
          "A private constructor",
          "A constructor that takes null"
        ],
        "correctIndex": 1,
        "explanation": "The compiler creates a synthetic default no-argument constructor that simply calls super()."
      }
    ]
  },
  {
    "id": "java-collections-hierarchy",
    "subject": "java",
    "category": "Collections Framework",
    "title": "Java Collections Hierarchy & Iterable/Iterator Core",
    "subtitle": "List vs Set vs Queue, Fail-Fast vs Fail-Safe Iterators & ConcurrentModificationException",
    "difficulty": "Intermediate",
    "isInterviewFavorite": true,
    "readTimeSeconds": 55,
    "tags": [
      "Collections",
      "Iterable",
      "Fail-Fast",
      "ConcurrentModificationException",
      "List",
      "Set",
      "Queue"
    ],
    "quickRecall": {
      "oneLiner": "The Collections Framework is a unified architecture rooted in Iterable and Collection, categorized into ordered Lists, unique Sets, and FIFO Queues (with Maps existing as a parallel hierarchy).",
      "simpleAnalogy": "A buffet line: A List is a tray where items are kept in the exact order you picked them (duplicates allowed). A Set is a bouncer who checks stamps at the door—nobody gets in twice (strictly unique). A Queue is the line of people waiting for food (first-come, first-served). A Map is the coat check room (ticket number → coat).",
      "whenToUse": "Storing and manipulating groups of objects dynamically: List for ordered indexed data, Set for uniqueness/membership tests, Queue for task processing, Map for key-value lookups.",
      "whyItMatters": "Understanding the interface hierarchy prevents coding to concrete implementations (always write 'List<String> list = new ArrayList<>()', never 'ArrayList<String>').",
      "keyPoints": [
        "Root Interface: java.lang.Iterable -> java.util.Collection -> List, Set, Queue. (Map does NOT implement Collection!).",
        "List: Ordered, allows duplicates, positional index access (ArrayList, LinkedList).",
        "Set: Unordered, guarantees uniqueness (HashSet, LinkedHashSet, TreeSet).",
        "Queue / Deque: FIFO order or double-ended queues (ArrayDeque, PriorityQueue).",
        "Fail-Fast Iterators: Iterators on ArrayList/HashMap throw ConcurrentModificationException if the collection is structurally modified during iteration!",
        "Safe Element Removal: Use Iterator.remove() or collection.removeIf(predicate); NEVER use list.remove() inside a for-each loop!"
      ],
      "formulaOrSyntax": {
        "label": "Safe Iterator Removal vs removeIf",
        "codeOrLatex": "// Safe: iterator.remove()\nIterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n    if (it.next().equals(\"bad\")) it.remove();\n}\n// Modern Java 8+ idiom:\nlist.removeIf(s -> s.equals(\"bad\"));",
        "isLatex": false,
        "language": "java"
      },
      "complexity": {
        "time": "Iteration O(N); Collection.contains(): O(1) for HashSet vs O(N) for ArrayList",
        "space": "O(N) heap storage"
      },
      "commonMistakeOrTrap": {
        "mistake": "Calling list.remove(x) inside an enhanced for-each loop: for (String s : list) { if (s.equals(\"x\")) list.remove(s); }",
        "fix": "Throws ConcurrentModificationException! Use list.removeIf(s -> s.equals(\"x\")) or iterator.remove().",
        "interviewTrap": "Question: 'Does java.util.Map implement Collection or Iterable?' Answer: NO! Map is an independent top-level interface because it works with key-value pairs (Map.Entry), not individual elements. You access its views via map.keySet(), map.values(), or map.entrySet()."
      },
      "examCheatsheet": [
        "Iterable -> Collection -> List, Set, Queue",
        "Map is NOT a Collection (independent hierarchy)",
        "Modifying collection inside for-each loop = ConcurrentModificationException",
        "Safe removal: use iterator.remove() or list.removeIf()"
      ]
    },
    "visual": {
      "type": "diagram",
      "title": "Java Collections Framework Interface Hierarchy",
      "caption": "Iterable sits at the top. Collection branches into List, Set, and Queue. Map stands alongside as a parallel key-value hierarchy.",
      "visualKey": "java-collections-hierarchy",
      "details": {
        "comparison": {
          "headers": [
            "Interface",
            "Duplicates Allowed?",
            "Ordered?",
            "Key Implementations"
          ],
          "rows": [
            [
              "List",
              "YES",
              "YES (Index-based)",
              "ArrayList, LinkedList, Vector, CopyOnWriteArrayList"
            ],
            [
              "Set",
              "NO",
              "NO (TreeSet is sorted, LinkedHashSet preserves insertion)",
              "HashSet, LinkedHashSet, TreeSet"
            ],
            [
              "Queue / Deque",
              "YES",
              "FIFO / Priority order",
              "ArrayDeque, PriorityQueue, LinkedList"
            ],
            [
              "Map (Parallel)",
              "Keys: NO, Values: YES",
              "NO (TreeMap is sorted, LinkedHashMap is insertion order)",
              "HashMap, LinkedHashMap, TreeMap, ConcurrentHashMap"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Fail-Fast modCount Verification Check",
      "description": "Watch the iterator compare expectedModCount with modCount. When they differ, it triggers ConcurrentModificationException.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Safe Collection Removal: Iterator.remove vs removeIf",
      "language": "java",
      "code": "import java.util.*;\n\npublic class CollectionDemo {\n    public static void main(String[] args) {\n        // List allows duplicates and preserves insertion order\n        List<String> fruits = new ArrayList<>(Arrays.asList(\"Apple\", \"Banana\", \"Cherry\", \"Banana\"));\n\n        // Modern safe removal without ConcurrentModificationException\n        fruits.removeIf(f -> f.equals(\"Banana\"));\n        System.out.println(\"After removeIf: \" + fruits);\n\n        // Set guarantees uniqueness\n        Set<String> uniqueFruits = new HashSet<>(fruits);\n        uniqueFruits.add(\"Apple\"); // Duplicate ignored!\n        System.out.println(\"Unique Set: \" + uniqueFruits);\n    }\n}",
      "input": "List: [Apple, Banana, Cherry, Banana]",
      "output": "After removeIf: [Apple, Cherry] | Unique Set: [Apple, Cherry]",
      "explanation": "removeIf safely strips elements without triggering fail-fast exceptions, and HashSet guarantees duplicate suppression."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "Does java.util.Map extend the java.util.Collection interface?",
        "options": [
          "Yes, Map extends Collection",
          "No, Map is a separate hierarchy because it represents key-value pairs rather than individual elements",
          "Yes, but only in Java 8 and above",
          "Map extends Iterable, but not Collection"
        ],
        "correctIndex": 1,
        "explanation": "Map has a distinct contract based on key-value pairs and does not implement Collection or Iterable."
      },
      {
        "id": "q2",
        "question": "What exception is thrown when modifying a collection directly during an active for-each loop iteration?",
        "options": [
          "IllegalStateException",
          "ConcurrentModificationException",
          "IndexOutOfBoundsException",
          "UnsupportedOperationException"
        ],
        "correctIndex": 1,
        "explanation": "Fail-fast iterators detect that modCount != expectedModCount and immediately throw ConcurrentModificationException."
      },
      {
        "id": "q3",
        "question": "Which Collection implementation provides O(1) amortized add, O(1) get-by-index, and faster iteration than LinkedList?",
        "options": [
          "Vector",
          "LinkedList",
          "ArrayList",
          "TreeSet"
        ],
        "correctIndex": 2,
        "explanation": "ArrayList stores elements in contiguous memory arrays, offering O(1) random index access and superior CPU cache locality."
      }
    ]
  },
  {
    "id": "java-collections-complexity",
    "subject": "java",
    "category": "Time and Space Complexity",
    "title": "Java Collections Framework Big-O Reference",
    "subtitle": "ArrayList vs LinkedList vs ArrayDeque vs HashSet vs TreeMap Performance Profiles",
    "difficulty": "Intermediate",
    "isInterviewFavorite": true,
    "readTimeSeconds": 55,
    "tags": [
      "Big-O",
      "Complexity",
      "ArrayList",
      "LinkedList",
      "HashMap",
      "ArrayDeque"
    ],
    "quickRecall": {
      "oneLiner": "Choosing the right Java collection hinges on algorithmic complexity: ArrayList wins for random access, ArrayDeque for queues/stacks, and HashMap/HashSet for O(1) lookups.",
      "simpleAnalogy": "Choosing a vehicle: an ArrayList is a high-speed bullet train (blazing fast along its fixed track O(1), but changing the track layout mid-way is costly O(N)). A LinkedList is a bicycle (can hop on and off anywhere O(1) at the ends, but riding to mile marker #500 takes a long time O(N)). In 99% of real-world cases, ArrayList wins due to CPU cache locality!",
      "whenToUse": "System design, high-frequency low-latency pipelines, and technical coding interview algorithmic optimization.",
      "whyItMatters": "Using LinkedList where ArrayList is needed or using ArrayList where ArrayDeque is needed causes 10x to 100x slowdowns in throughput.",
      "keyPoints": [
        "ArrayList: Random access get(i) is O(1). Append is O(1) amortized. Insert/remove in middle is O(N) due to System.arraycopy shifts.",
        "LinkedList: get(i) is slow O(N) linear traversal! Insert/remove at head/tail is O(1). Rarely preferred in modern Java due to pointer cache misses.",
        "ArrayDeque: Double-ended queue backed by circular array. O(1) push/pop at both ends. Beats LinkedList as a Queue and beats java.util.Stack!",
        "HashSet / HashMap: O(1) average get/put/contains. Degrades to O(log N) worst-case with high collisions (Red-Black tree binning).",
        "TreeSet / TreeMap: O(log N) guaranteed for get/put/contains because it is backed by a balanced Red-Black Tree."
      ],
      "formulaOrSyntax": {
        "label": "Collections Complexity Quick Matrix",
        "codeOrLatex": "Collection  | Get(i)  | Add(end) | Add(mid) | Contains\nArrayList   | O(1)    | O(1)*    | O(N)     | O(N)\nLinkedList  | O(N)    | O(1)     | O(N)     | O(N)\nArrayDeque  | N/A     | O(1)     | N/A      | O(N)\nHashMap     | O(1)*   | O(1)*    | N/A      | O(1)*\nTreeMap     | O(logN) | O(logN)  | N/A      | O(logN)",
        "isLatex": false
      },
      "complexity": {
        "time": "ArrayList get(i): O(1); HashMap lookup: O(1) average; TreeMap: O(log N)",
        "space": "ArrayList: Contiguous memory; LinkedList: Heavy overhead (24 bytes per node for pointers)"
      },
      "commonMistakeOrTrap": {
        "mistake": "Using LinkedList because you heard 'insertions are O(1)'.",
        "fix": "Insertion in LinkedList is ONLY O(1) if you already possess the Node reference! Finding position i requires an O(N) linear walk.",
        "interviewTrap": "Question: 'Why is ArrayList faster than LinkedList even when iterating?' Answer: CPU Cache Locality! ArrayList elements sit in contiguous memory so the CPU pre-fetches entire cache lines. LinkedList nodes are scattered randomly across the Heap, causing constant CPU cache misses."
      },
      "examCheatsheet": [
        "ArrayList: O(1) index access, best overall general list",
        "ArrayDeque: O(1) push/pop at both ends (better than Stack & LinkedList)",
        "HashMap: O(1) average, O(log N) worst-case (treeified bucket)",
        "TreeMap: O(log N) sorted keys (Red-Black Tree)",
        "Avoid LinkedList in 99% of applications"
      ]
    },
    "visual": {
      "type": "comparison-table",
      "title": "Java Collections Time & Space Complexity Master Reference",
      "caption": "Comparison of access, insertion, deletion, and space overhead across primary Java collection classes.",
      "visualKey": "java-collections-complexity",
      "details": {
        "comparison": {
          "headers": [
            "Collection",
            "Index Access",
            "Insert at Head",
            "Insert at Tail",
            "Lookup / Search",
            "Memory Overhead"
          ],
          "rows": [
            [
              "ArrayList",
              "O(1)",
              "O(N)",
              "O(1) amortized",
              "O(N)",
              "Low (Contiguous array)"
            ],
            [
              "LinkedList",
              "O(N)",
              "O(1)",
              "O(1)",
              "O(N)",
              "High (3 references per node)"
            ],
            [
              "ArrayDeque",
              "N/A",
              "O(1)",
              "O(1)",
              "O(N)",
              "Low (Circular array buffer)"
            ],
            [
              "HashSet / HashMap",
              "N/A",
              "N/A",
              "O(1) average",
              "O(1) average",
              "Medium (Node objects + array)"
            ],
            [
              "TreeSet / TreeMap",
              "N/A",
              "N/A",
              "O(log N)",
              "O(log N)",
              "Medium-High (Red-Black Tree)"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "ArrayList Array Resizing & Amortized O(1) Mechanics",
      "description": "Trace internal capacity expansion: 10 elements reach capacity -> new array of size 15 created -> elements copied -> new item inserted.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Benchmarking ArrayList vs ArrayDeque for Queue Operations",
      "language": "java",
      "code": "import java.util.*;\n\npublic class ComplexityDemo {\n    public static void main(String[] args) {\n        // 1. ArrayDeque: Preferred LIFO stack and FIFO queue (O(1) at both ends)\n        Deque<Integer> deque = new ArrayDeque<>();\n        deque.addLast(100);  // Enqueue O(1)\n        deque.addLast(200);\n        int front = deque.pollFirst(); // Dequeue O(1)\n        System.out.println(\"Deque Poll Front: \" + front);\n\n        // 2. HashMap: O(1) average lookup\n        Map<String, Integer> scores = new HashMap<>();\n        scores.put(\"Alice\", 95);\n        scores.put(\"Bob\", 88);\n        System.out.println(\"Alice's Score (O(1) lookup): \" + scores.get(\"Alice\"));\n\n        // 3. TreeMap: O(log N) sorted keys\n        NavigableMap<Integer, String> tree = new TreeMap<>();\n        tree.put(30, \"Thirty\");\n        tree.put(10, \"Ten\");\n        tree.put(20, \"Twenty\");\n        System.out.println(\"TreeMap Sorted Keys (O(log N)): \" + tree.keySet());\n    }\n}",
      "input": "ArrayDeque operations, HashMap lookups, and TreeMap sorted traversal",
      "output": "Deque Poll Front: 100 | Alice's Score: 95 | TreeMap Sorted Keys: [10, 20, 30]",
      "explanation": "ArrayDeque provides O(1) double-ended queue operations without pointer overhead, and TreeMap maintains natural sorted order."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "Why is ArrayList almost always preferred over LinkedList in real-world Java applications?",
        "options": [
          "LinkedList is not thread-safe",
          "ArrayList has superior CPU cache locality and lower memory overhead, whereas LinkedList causes cache misses and allocates 24 bytes per node",
          "LinkedList cannot hold strings",
          "ArrayList uses less CPU clock cycles for sorting"
        ],
        "correctIndex": 1,
        "explanation": "Contiguous array storage enables CPU cache pre-fetching, making ArrayList significantly faster even for many insertion patterns."
      },
      {
        "id": "q2",
        "question": "What is the worst-case time complexity of HashMap get() in Java 8+ when all keys collide into the same bucket?",
        "options": [
          "O(1)",
          "O(N)",
          "O(log N)",
          "O(N log N)"
        ],
        "correctIndex": 2,
        "explanation": "In Java 8+, when a bucket exceeds TREEIFY_THRESHOLD (8 items), the linked list converts to a balanced Red-Black tree with O(log N) search."
      },
      {
        "id": "q3",
        "question": "Which Java collection should be used when implementing a LIFO Stack or FIFO Queue with maximum performance?",
        "options": [
          "java.util.Stack",
          "java.util.LinkedList",
          "java.util.ArrayDeque",
          "java.util.Vector"
        ],
        "correctIndex": 2,
        "explanation": "ArrayDeque is faster than Stack (which incurs synchronized method lock overhead) and faster than LinkedList (which creates node objects)."
      }
    ]
  }
];
