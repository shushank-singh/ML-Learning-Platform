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
// MODULE 5: METHODS AND RECURSION
// ==========================================
const m5Data = {
  id: 'java-module-5',
  number: 5,
  title: 'Methods and Recursion',
  subtitle: 'Signatures, Return Values, Overloading, Call Stacks & Recursive Unwinding',
  order: 5,
  icon: 'Layers',
  badge: 'Modular Programming',
  estimatedHours: 9,
  topicsCount: 10,
  description: 'Write reusable, modular Java code. Master method signatures, pass-by-value semantics, method overloading, static vs instance methods, call stack frames, base cases in recursion, and StackOverflow prevention.',
  lessons: [
    { id: 'java-methods-structure', moduleId: 'java-module-5', title: 'Methods in Java: Structure, Signature & Return Types', description: 'Deconstructing access modifiers, return types, method identifiers, and parameter lists.', order: 1, readTimeMinutes: 14, visualizerType: 'call-stack', difficulty: 'Beginner' },
    { id: 'java-pass-by-value', moduleId: 'java-module-5', title: 'Pass-by-Value Semantics: Primitives vs References', description: 'Understanding why Java is strictly pass-by-value and how reference copying affects objects.', order: 2, readTimeMinutes: 16, visualizerType: 'memory-model', difficulty: 'Beginner' },
    { id: 'java-method-overloading', moduleId: 'java-module-5', title: 'Method Overloading (Compile-Time Polymorphism)', description: 'Same method name with distinct parameter counts, types, or order.', order: 3, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-varargs', moduleId: 'java-module-5', title: 'Variable-Length Arguments (Varargs ...)', description: 'Handling arbitrary numbers of method parameters cleanly as syntactic arrays.', order: 4, readTimeMinutes: 12, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-static-methods', moduleId: 'java-module-5', title: 'Static Utility Methods vs Instance Methods', description: 'Class-level methods (Math.sqrt) vs object-level stateful instance methods.', order: 5, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-call-stack-frames', moduleId: 'java-module-5', title: 'Understanding the JVM Call Stack & Stack Frames', description: 'How methods push and pop frames, local variable lifecycles, and return address tracking.', order: 6, readTimeMinutes: 16, visualizerType: 'call-stack', difficulty: 'Beginner' },
    { id: 'java-recursion-fundamentals', moduleId: 'java-module-5', title: 'Introduction to Recursion: Base Case vs Recursive Call', description: 'The anatomy of a recursive function, termination conditions, and self-referential steps.', order: 7, readTimeMinutes: 16, visualizerType: 'call-stack', difficulty: 'Beginner' },
    { id: 'java-factorial-recursion', moduleId: 'java-module-5', title: 'Call Stack Analysis of Factorials and Countdown', description: 'Step-by-step tracing of stack frame allocation, base case hit, and value unwinding.', order: 8, readTimeMinutes: 18, visualizerType: 'call-stack', difficulty: 'Beginner' },
    { id: 'java-fibonacci-recursion', moduleId: 'java-module-5', title: 'Branching Recursion: Fibonacci & Call Trees', description: 'Binary recursion, visualizing exponential call trees, and redundant computation.', order: 9, readTimeMinutes: 18, visualizerType: 'call-stack', difficulty: 'Intermediate' },
    { id: 'java-recursion-vs-iteration', moduleId: 'java-module-5', title: 'Recursion vs Iteration: Tradeoffs & StackOverflow Prevention', description: 'Performance comparison, tail recursion, memory limits (-Xss), and iterative conversion.', order: 10, readTimeMinutes: 18, visualizerType: 'call-stack', difficulty: 'Intermediate' }
  ]
};

const m5Lessons = {};
const m5TopicTemplates = [
  {
    id: 'java-methods-structure',
    title: 'Methods in Java: Structure, Signature & Return Types',
    subtitle: 'Parameters, Return Statements, and the DRY (Don\'t Repeat Yourself) Principle',
    order: 1,
    code: `public class Main {
    // Method declaration: public static <returnType> <name>(<parameters>)
    public static double calculateTotal(double subtotal, double taxRate) {
        return subtotal + (subtotal * taxRate);
    }

    public static void main(String[] args) {
        double bill = calculateTotal(100.0, 0.08);
        System.out.println("Total Bill with tax: $" + bill);
    }
}`,
    expected: "Total Bill with tax: $108.0",
    analogy: "A microwave oven: you open the door, pass in food and cooking time (parameters), it does the internal cooking, and beeps returning warm food (return value).",
    mistake: "Forgetting to return a value in a method with a non-void return type, causing a compile error.",
    quizQ: "What must match between a method signature and its return statement?",
    quizOpts: ["The parameter names", "The return type declared in the method header and the returned expression type", "The class name", "The static keyword"],
    correctIdx: 1
  },
  {
    id: 'java-pass-by-value',
    title: 'Pass-by-Value Semantics: Primitives vs References',
    subtitle: 'Why Java Is Strictly Pass-by-Value and How Object References Behave',
    order: 2,
    code: `class Box { int val = 10; }

public class Main {
    public static void modifyPrimitive(int x) { x = 99; }
    public static void modifyObject(Box b) { b.val = 99; }

    public static void main(String[] args) {
        int a = 10;
        modifyPrimitive(a);
        System.out.println("Primitive after method: " + a); // Still 10!

        Box box = new Box();
        modifyObject(box);
        System.out.println("Object field after method: " + box.val); // 99!
    }
}`,
    expected: "Primitive after method: 10\\nObject field after method: 99",
    analogy: "Handing someone a photocopy of your notes vs handing them the house key. Modifying the photocopy leaves your original intact. Modifying the house through the key changes the house itself.",
    mistake: "Assuming reassigning an object reference parameter inside a method changes the caller's variable.",
    quizQ: "Is Java pass-by-reference or pass-by-value?",
    quizOpts: ["Strictly pass-by-reference", "Strictly pass-by-value (object references are copied by value)", "Pass-by-name", "Hybrid based on operating system"],
    correctIdx: 1
  },
  {
    id: 'java-method-overloading',
    title: 'Method Overloading (Compile-Time Polymorphism)',
    subtitle: 'Defining Multiple Methods with the Same Name but Distinct Signatures',
    order: 3,
    code: `public class Main {
    public static int add(int a, int b) { return a + b; }
    public static double add(double a, double b) { return a + b; }
    public static String add(String a, String b) { return a + b; }

    public static void main(String[] args) {
        System.out.println("Add ints: " + add(5, 10));
        System.out.println("Add doubles: " + add(2.5, 4.5));
        System.out.println("Add strings: " + add("Java", "Lab"));
    }
}`,
    expected: "Add ints: 15\\nAdd doubles: 7.0\\nAdd strings: JavaLab",
    analogy: "The word 'open': you can open a door, open a bank account, or open a conversation. The exact action depends on what noun you give it.",
    mistake: "Attempting to overload a method by changing ONLY the return type, which the compiler rejects as a duplicate signature.",
    quizQ: "Can two methods in the same class differ ONLY by their return type?",
    quizOpts: ["Yes, the compiler chooses based on assignment", "No, method signatures in Java only consist of method name and parameter types", "Yes, if one is static", "Yes, in Java 17+"],
    correctIdx: 1
  },
  {
    id: 'java-varargs',
    title: 'Variable-Length Arguments (Varargs ...)',
    subtitle: 'Simplifying Methods Accepting an Arbitrary Count of Parameters',
    order: 4,
    code: `public class Main {
    public static int sumAll(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    public static void main(String[] args) {
        System.out.println("Sum 0 items: " + sumAll());
        System.out.println("Sum 3 items: " + sumAll(10, 20, 30));
        System.out.println("Sum 5 items: " + sumAll(1, 2, 3, 4, 5));
    }
}`,
    expected: "Sum 0 items: 0\\nSum 3 items: 60\\nSum 5 items: 15",
    analogy: "A shopping cart conveyor that can accept 0 items, 3 items, or 50 items into the same checkout lane.",
    mistake: "Placing varargs before regular parameters in a method signature (varargs must ALWAYS be the final parameter).",
    quizQ: "Where must the varargs parameter (...) be positioned in a parameter list?",
    quizOpts: ["At the very beginning", "Anywhere in the list", "As the last parameter only", "In the return statement"],
    correctIdx: 2
  },
  {
    id: 'java-static-methods',
    title: 'Static Utility Methods vs Instance Methods',
    subtitle: 'Understanding Class-Level Invocation vs Object-Level Behavior',
    order: 5,
    code: `public class Main {
    // Static method: called directly on class without 'new'
    public static int square(int x) { return x * x; }

    public static void main(String[] args) {
        int result = Main.square(8);
        System.out.println("8 squared via static method: " + result);
    }
}`,
    expected: "8 squared via static method: 64",
    analogy: "A town hall public clock (static, shared by everyone in town) vs a personal wristwatch (instance, unique to each individual wearer).",
    mistake: "Attempting to access non-static instance fields or 'this' keyword inside a static method.",
    quizQ: "Can a static method access an instance variable directly without creating an object?",
    quizOpts: ["Yes, anytime", "No, because static methods exist at class level before any instances are created", "Yes, using super", "Only in the main method"],
    correctIdx: 1
  },
  {
    id: 'java-call-stack-frames',
    title: 'Understanding the JVM Call Stack & Stack Frames',
    subtitle: 'How the JVM Manages Method Invocations, Parameters, and Return Addresses',
    order: 6,
    code: `public class Main {
    public static void stepC() { System.out.println("In Step C (Top of stack)"); }
    public static void stepB() { stepC(); }
    public static void stepA() { stepB(); }

    public static void main(String[] args) {
        System.out.println("main() starts -> pushes frames");
        stepA();
        System.out.println("main() ends -> all frames popped");
    }
}`,
    expected: "main() starts -> pushes frames\\nIn Step C (Top of stack)\\nmain() ends -> all frames popped",
    analogy: "A stack of dinner plates in a cafeteria: each method call pushes a new plate on top. Methods can only finish and pop from the top of the stack.",
    mistake: "Assuming local variables persist in memory after their enclosing method frame pops off the stack.",
    quizQ: "What data structure does the JVM use to track active method invocations per thread?",
    quizOpts: ["Queue (FIFO)", "Call Stack (LIFO)", "Binary Tree", "Hash Map"],
    correctIdx: 1
  },
  {
    id: 'java-recursion-fundamentals',
    title: 'Introduction to Recursion: Base Case vs Recursive Call',
    subtitle: 'Solving Self-Similar Subproblems and Preventing Infinite Recursion',
    order: 7,
    code: `public class Main {
    public static void countdown(int n) {
        // 1. Base case: Stops recursion!
        if (n <= 0) {
            System.out.println("Liftoff!");
            return;
        }
        // 2. Work & Recursive step
        System.out.print(n + "... ");
        countdown(n - 1);
    }

    public static void main(String[] args) {
        countdown(5);
    }
}`,
    expected: "5... 4... 3... 2... 1... Liftoff!",
    analogy: "Russian nesting dolls (Matryoshka): you open each doll to reveal a smaller version of itself, until you hit the solid core doll (the base case).",
    mistake: "Omitting the base case, causing infinite recursive calls and a StackOverflowError.",
    quizQ: "What must every valid recursive method contain to avoid infinite execution?",
    quizOpts: ["A loop", "A base case (termination condition)", "A static variable", "A try-catch block"],
    correctIdx: 1
  },
  {
    id: 'java-factorial-recursion',
    title: 'Call Stack Analysis of Factorials and Countdown',
    subtitle: 'Stack Frame Growth During Computation and Return Value Unwinding',
    order: 8,
    code: `public class Main {
    public static long factorial(int n) {
        if (n <= 1) return 1; // Base case
        return n * factorial(n - 1); // Recursive call
    }

    public static void main(String[] args) {
        int number = 5;
        System.out.println(number + "! = " + factorial(number));
    }
}`,
    expected: "5! = 120",
    analogy: "Climbing down a ladder to fetch a book: you climb down 5 steps (calls), pick up the book at the bottom (base case), and climb back up multiplying on each rung.",
    mistake: "Using int for factorials above 12, causing integer overflow (13! exceeds int max 2.14B).",
    quizQ: "What is factorial(4)?",
    quizOpts: ["10", "24", "12", "16"],
    correctIdx: 1
  },
  {
    id: 'java-fibonacci-recursion',
    title: 'Branching Recursion: Fibonacci & Call Trees',
    subtitle: 'Binary Recursion, Exponential Call Growth O(2^n), and Redundancy',
    order: 9,
    code: `public class Main {
    public static int fibonacci(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.print("Fibonacci series: ");
        for (int i = 0; i <= 6; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
    }
}`,
    expected: "Fibonacci series: 0 1 1 2 3 5 8 ",
    analogy: "A family tree that branches into two parents at every level, doubling the number of ancestors with each generation.",
    mistake: "Using naive recursion for large Fibonacci numbers (e.g. fib(50)) which performs over a trillion redundant method calls.",
    quizQ: "What is the time complexity of naive recursive Fibonacci fib(n)?",
    quizOpts: ["O(n)", "O(log n)", "O(2^n) exponential", "O(1)"],
    correctIdx: 2
  },
  {
    id: 'java-recursion-vs-iteration',
    title: 'Recursion vs Iteration: Tradeoffs & StackOverflow Prevention',
    subtitle: 'Comparing Stack Overhead, Speed, Readability, and JVM Thread Limits (-Xss)',
    order: 10,
    code: `public class Main {
    // Iterative version: O(1) auxiliary space, no stack growth
    public static long factorialIterative(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println("Iterative factorial 6: " + factorialIterative(6));
    }
}`,
    expected: "Iterative factorial 6: 720",
    analogy: "Using an elevator to go up 100 floors (iteration, steady loop) vs having 100 people stand on each other's shoulders (recursion, stacking up until it collapses).",
    mistake: "Assuming recursion is always faster than iteration; recursion carries function call and stack frame overhead.",
    quizQ: "What exception is thrown when recursive depth exceeds the JVM stack size limit?",
    quizOpts: ["OutOfMemoryError", "StackOverflowError", "RecursionDepthException", "IndexOutOfBoundsException"],
    correctIdx: 1
  }
];

m5TopicTemplates.forEach(t => {
  m5Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-5',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 15,
    difficulty: t.order > 8 ? 'Intermediate' : 'Beginner',
    visualizerType: t.id.includes('pass-by-value') ? 'memory-model' : 'call-stack',
    objectives: [`Master ${t.title}.`, 'Understand stack memory and parameter passing.', 'Trace recursive call unwinding.'],
    prerequisites: ['Module 4: Arrays and Strings'],
    analogy: { title: t.title + ' Analogy', text: t.analogy, metaphor: t.analogy },
    problemSolved: {
      title: 'Code Reusability and Stack Management',
      description: 'Modularizes logic into clean functions and provides mathematical recursion mechanisms.',
      keyPoints: ['DRY principle', 'LIFO stack execution', 'Clean subproblem breakdown']
    },
    intuition: {
      overview: `Internal JVM mechanisms behind ${t.title}.`,
      steps: [
        { step: 1, title: 'Method Invocation', description: 'Pushes new stack frame with local variables.' },
        { step: 2, title: 'Execution & Evaluation', description: 'Evaluates parameters and executes method body.' },
        { step: 3, title: 'Return & Pop', description: 'Returns result to caller and deallocates stack frame.' }
      ]
    },
    codeExample: { title: `Demonstrating ${t.title}`, code: t.code, explanation: `Examine the execution of ${t.title}.` },
    runnableCode: { code: t.code, expectedOutput: t.expected },
    lineByLineExplanation: [
      { lines: '1-4', codeSnippet: 'public class Main { ... }', explanation: 'Class structure and method declaration.' },
      { lines: '5-12', codeSnippet: '// Method execution and logic', explanation: 'Method invocation and stack handling.' }
    ],
    commonMistakes: [{ mistake: t.mistake, solution: 'Follow standard Java practices.', whyWrong: 'Improper method or recursion design causes errors.' }],
    bestPractices: ['Keep methods focused on doing one single task well.', 'Always test base cases thoroughly in recursion.'],
    applications: [{ industry: 'Compiler & Parsing', useCase: 'Recursive descent parsers and syntax tree evaluations.' }],
    practiceQuestions: [{ id: `pq-${t.id}`, question: t.quizQ, answer: t.quizOpts[t.correctIdx], explanation: 'Standard Java behavior.' }],
    quiz: [{ id: `qz-${t.id}`, question: t.quizQ, options: t.quizOpts, correctIndex: t.correctIdx, explanation: 'Adheres to Java standards.' }],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Beginner',
      description: `Implement ${t.title} to complete the task.`,
      starterCode: t.code,
      hints: ['Review the lesson example above.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [`Mastered ${t.title}.`, 'Understood call stack frame lifecycles.', 'Ready for OOP Fundamentals in Module 6.'],
      nextLessonId: t.order === 10 ? 'java-oop-paradigms' : m5Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'OOP Paradigms: Why Object-Oriented Programming Matters' : m5Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-6' : 'java-module-5'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-5.ts'), 'javaModule5Data', 'javaModule5Lessons', m5Data, m5Lessons);

// ==========================================
// MODULE 6: OOP FUNDAMENTALS
// ==========================================
const m6Data = {
  id: 'java-module-6',
  number: 6,
  title: 'OOP Fundamentals',
  subtitle: 'Classes, Objects, Constructors, this Keyword, Encapsulation & Modifiers',
  order: 6,
  icon: 'Boxes',
  badge: 'Object-Oriented',
  estimatedHours: 10,
  topicsCount: 10,
  description: 'Step into real Java engineering. Understand classes as blueprints and objects as heap instances, master constructors, explore the this keyword, enforce encapsulation with private fields and getters/setters, understand access modifiers, and study object lifecycle and garbage collection.',
  lessons: [
    { id: 'java-oop-paradigms', moduleId: 'java-module-6', title: 'OOP Paradigms: Why Object-Oriented Programming Matters', description: 'Moving from procedural code to modeling domain entities with state and behavior.', order: 1, readTimeMinutes: 14, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-classes-and-objects', moduleId: 'java-module-6', title: 'Classes as Blueprints and Objects on the Heap', description: 'Class definition in the Method Area vs instantiated objects allocated on the Heap.', order: 2, readTimeMinutes: 16, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-instance-variables', moduleId: 'java-module-6', title: 'Instance Variables & Field Initialization', description: 'Heap storage per object, default value rules, and variable shadowing.', order: 3, readTimeMinutes: 14, visualizerType: 'memory-model', difficulty: 'Beginner' },
    { id: 'java-constructors', moduleId: 'java-module-6', title: 'Constructors in Java: Default, No-Arg, and Parameterized', description: 'Object initialization protocols, constructor overloading, and the new operator.', order: 4, readTimeMinutes: 16, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-this-keyword', moduleId: 'java-module-6', title: 'The this Keyword & Constructor Chaining this()', description: 'Disambiguating field names from parameters and delegating constructors.', order: 5, readTimeMinutes: 14, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-encapsulation-getters', moduleId: 'java-module-6', title: 'Encapsulation: Data Hiding, Getters & Setters', description: 'Protecting object invariants, read-only properties, and defensive validation.', order: 6, readTimeMinutes: 16, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-access-modifiers', moduleId: 'java-module-6', title: 'Access Modifiers: public, private, protected & package-private', description: 'The 4 levels of encapsulation visibility and access control boundaries.', order: 7, readTimeMinutes: 15, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-static-fields-blocks', moduleId: 'java-module-6', title: 'Static Variables & Static Initialization Blocks', description: 'Class-level state shared across all instances and static {} execution order.', order: 8, readTimeMinutes: 16, visualizerType: 'memory-model', difficulty: 'Beginner' },
    { id: 'java-object-lifecycle', moduleId: 'java-module-6', title: 'Object Lifecycle, References & Garbage Collection', description: 'Creation, reachability graphs, orphan objects, and automatic memory reclamation.', order: 9, readTimeMinutes: 18, visualizerType: 'memory-model', difficulty: 'Beginner' },
    { id: 'java-oop-bank-project', moduleId: 'java-module-6', title: 'Project: Encapsulated Bank Account & ATM Engine', description: 'Building a production-style banking class with balance protection and audit logging.', order: 10, readTimeMinutes: 20, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' }
  ]
};

const m6Lessons = {};
const m6TopicTemplates = [
  {
    id: 'java-oop-paradigms',
    title: 'OOP Paradigms: Why Object-Oriented Programming Matters',
    subtitle: 'Encapsulation, Abstraction, Inheritance, and Polymorphism in Software Design',
    order: 1,
    code: `class Car {
    String brand;
    int speed;

    void accelerate(int increase) { speed += increase; }
    void brake(int decrease) { speed = Math.max(0, speed - decrease); }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.brand = "Tesla";
        car.accelerate(45);
        System.out.println(car.brand + " running at " + car.speed + " mph.");
    }
}`,
    expected: "Tesla running at 45 mph.",
    analogy: "A physical car: the engine, fuel injection, and pistons are encapsulated under the hood. You interact through an abstract interface (steering wheel and pedals) without needing to touch raw wires.",
    mistake: "Treating Java as purely procedural by making every method static and dumping everything into Main.",
    quizQ: "What are the four core pillars of Object-Oriented Programming?",
    quizOpts: ["HTML, CSS, JS, SQL", "Encapsulation, Abstraction, Inheritance, Polymorphism", "Compilation, Interpretation, JIT, GC", "Stack, Heap, Method Area, Registers"],
    correctIdx: 1
  },
  {
    id: 'java-classes-and-objects',
    title: 'Classes as Blueprints and Objects on the Heap',
    subtitle: 'The Architectural Schema vs The Tangible Physical Instance',
    order: 2,
    code: `class User {
    String username;
    int loginCount;
}

public class Main {
    public static void main(String[] args) {
        // user1 and user2 are distinct heap objects
        User user1 = new User();
        user1.username = "Alice";
        user1.loginCount = 5;

        User user2 = new User();
        user2.username = "Bob";
        user2.loginCount = 12;

        System.out.println("User 1: " + user1.username + ", Logins: " + user1.loginCount);
        System.out.println("User 2: " + user2.username + ", Logins: " + user2.loginCount);
    }
}`,
    expected: "User 1: Alice, Logins: 5\\nUser 2: Bob, Logins: 12",
    analogy: "A cookie cutter (the class) vs the actual sugar cookies baked from it (the objects). The cookie cutter is one piece of metal; you can stamp 100 cookies from it.",
    mistake: "Confusing the class name with object reference variables.",
    quizQ: "Where are instantiated Java objects stored in memory?",
    quizOpts: ["The CPU registers", "The JVM Stack", "The JVM Heap", "The hard disk directly"],
    correctIdx: 2
  },
  {
    id: 'java-instance-variables',
    title: 'Instance Variables & Field Initialization',
    subtitle: 'Default Field Values in Java (0, 0.0, false, null) vs Local Variables',
    order: 3,
    code: `class Employee {
    String name;      // Defaults to null
    int employeeId;   // Defaults to 0
    double salary;    // Defaults to 0.0
    boolean isActive; // Defaults to false
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee();
        System.out.println("name default: " + emp.name);
        System.out.println("id default: " + emp.employeeId);
        System.out.println("salary default: " + emp.salary);
        System.out.println("active default: " + emp.isActive);
    }
}`,
    expected: "name default: null\\nid default: 0\\nsalary default: 0.0\\nactive default: false",
    analogy: "A brand new smartphone fresh out of the factory box: before you customize it, it has standard factory default settings.",
    mistake: "Assuming local variables inside methods get default values like instance fields do (they do not).",
    quizQ: "What is the default value of an uninitialized boolean instance field in a Java class?",
    quizOpts: ["true", "false", "null", "0"],
    correctIdx: 1
  },
  {
    id: 'java-constructors',
    title: 'Constructors in Java: Default, No-Arg, and Parameterized',
    subtitle: 'Ensuring Proper Object Initialization at Creation Time',
    order: 4,
    code: `class Book {
    String title;
    double price;

    // Parameterized constructor
    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
}

public class Main {
    public static void main(String[] args) {
        Book b = new Book("Effective Java", 45.0);
        System.out.println("Book: " + b.title + ", Price: $" + b.price);
    }
}`,
    expected: "Book: Effective Java, Price: $45.0",
    analogy: "A newborn baby birth certificate: you cannot create the record without filling in the baby's name and birth time right at the moment of birth.",
    mistake: "Giving a constructor a return type (e.g. public void Book()); doing so turns it into a normal method, not a constructor!",
    quizQ: "What is the return type of a Java constructor?",
    quizOpts: ["void", "The class type", "Constructors have NO return type declared", "Object"],
    correctIdx: 2
  },
  {
    id: 'java-this-keyword',
    title: 'The this Keyword & Constructor Chaining this()',
    subtitle: 'Self-Reference to the Current Object and Reusing Constructors',
    order: 5,
    code: `class Rectangle {
    int width;
    int height;

    // No-arg constructor delegates to 2-arg constructor
    public Rectangle() {
        this(10, 10); // Constructor chaining!
    }

    public Rectangle(int width, int height) {
        this.width = width;   // this.width disambiguates field from parameter
        this.height = height;
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();
        Rectangle r2 = new Rectangle(20, 30);
        System.out.println("r1: " + r1.width + "x" + r1.height);
        System.out.println("r2: " + r2.width + "x" + r2.height);
    }
}`,
    expected: "r1: 10x10\\nr2: 20x30",
    analogy: "Pointing to yourself and saying 'me' or 'my': this.width means 'my width field, not the parameter you just passed me'.",
    mistake: "Calling this(...) anywhere other than the very first line of a constructor body.",
    quizQ: "Where must constructor chaining this(...) appear in a constructor?",
    quizOpts: ["Anywhere in the constructor", "As the very first statement", "In the return statement", "At the very end"],
    correctIdx: 1
  },
  {
    id: 'java-encapsulation-getters',
    title: 'Encapsulation: Data Hiding, Getters & Setters',
    subtitle: 'Protecting Object State with private Fields and Public Validation Mutators',
    order: 6,
    code: `class BankAccount {
    private double balance; // Data hidden from outside tampering

    public BankAccount(double initialBalance) {
        if (initialBalance >= 0) this.balance = initialBalance;
    }

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(100.0);
        acc.deposit(50.0);
        System.out.println("Protected Balance: $" + acc.getBalance());
    }
}`,
    expected: "Protected Balance: $150.0",
    analogy: "A capsule pill: the active medicine is safely enclosed inside a protective gelatin shell so outside dirt cannot touch it directly.",
    mistake: "Making fields public, allowing any external class to corrupt internal state (e.g. acc.balance = -9999).",
    quizQ: "What is the primary objective of Encapsulation in OOP?",
    quizOpts: ["To make code compile faster", "To hide internal data and restrict direct access through controlled methods", "To eliminate classes", "To share code across packages"],
    correctIdx: 1
  },
  {
    id: 'java-access-modifiers',
    title: 'Access Modifiers: public, private, protected & package-private',
    subtitle: 'Defining Visibility Boundaries Across Classes, Packages, and Subclasses',
    order: 7,
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Access Modifier Matrix:");
        System.out.println("- public: Accessible everywhere");
        System.out.println("- protected: Same package + subclasses");
        System.out.println("- (default): Same package only");
        System.out.println("- private: Enclosing class only");
    }
}`,
    expected: "Access Modifier Matrix:\\n- public: Accessible everywhere\\n- protected: Same package + subclasses\\n- (default): Same package only\\n- private: Enclosing class only",
    analogy: "Security clearance badges: public is the lobby open to everyone, private is the CEO's personal locked safe.",
    mistake: "Confusing default package-private visibility (no modifier) with protected.",
    quizQ: "Which access modifier restricts access exclusively to the enclosing class?",
    quizOpts: ["public", "protected", "private", "package-private"],
    correctIdx: 2
  },
  {
    id: 'java-static-fields-blocks',
    title: 'Static Variables & Static Initialization Blocks',
    subtitle: 'Shared Class-Level State and the static {} Pre-Execution Block',
    order: 8,
    code: `class Counter {
    static int globalCount = 0; // Shared across all instances
    int instanceId;

    public Counter() {
        globalCount++;
        this.instanceId = globalCount;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();

        System.out.println("c1 ID: " + c1.instanceId);
        System.out.println("c3 ID: " + c3.instanceId);
        System.out.println("Total Instances: " + Counter.globalCount);
    }
}`,
    expected: "c1 ID: 1\\nc3 ID: 3\\nTotal Instances: 3",
    analogy: "A shared ticket dispenser at a bakery: every customer takes a ticket from the same shared roll, incrementing the master counter.",
    mistake: "Accessing static variables through an instance reference (c1.globalCount) instead of the class name (Counter.globalCount).",
    quizQ: "How many copies of a static variable exist in memory regardless of how many objects are instantiated?",
    quizOpts: ["One copy per instance", "Exactly one copy shared across all instances", "None until instantiated", "Two copies"],
    correctIdx: 1
  },
  {
    id: 'java-object-lifecycle',
    title: 'Object Lifecycle, References & Garbage Collection',
    subtitle: 'Allocation via new, Reference Reachability, and Automatic Deallocation',
    order: 9,
    code: `public class Main {
    public static void main(String[] args) {
        String obj1 = new String("Temporary Data");
        System.out.println("Created object: " + obj1);

        obj1 = null; // Sever the reference!
        // The String object on the heap is now an orphan with 0 references.
        // It is eligible for Garbage Collection by the JVM.
        System.out.println("Reference cleared to null. Memory eligible for GC.");
    }
}`,
    expected: "Created object: Temporary Data\\nReference cleared to null. Memory eligible for GC.",
    analogy: "A helium balloon held by a string: as long as someone holds the string (reference), the balloon stays grounded. Let go of the string (null), and the balloon floats away to be recycled.",
    mistake: "Assuming System.gc() forces immediate garbage collection; it is merely a non-binding hint to the JVM.",
    quizQ: "When does a Java object on the heap become eligible for Garbage Collection?",
    quizOpts: ["Immediately after creation", "When it is no longer reachable by any live reference", "When System.gc() is called", "When the method ends"],
    correctIdx: 1
  },
  {
    id: 'java-oop-bank-project',
    title: 'Project: Encapsulated Bank Account & ATM Engine',
    subtitle: 'Consolidating Classes, Encapsulation, Validation, and Transaction Auditing',
    order: 10,
    code: `class ATM {
    private double balance;
    private int pin;

    public ATM(double initialBalance, int pin) {
        this.balance = initialBalance;
        this.pin = pin;
    }

    public boolean withdraw(int enteredPin, double amount) {
        if (enteredPin != this.pin) {
            System.out.println("Error: Invalid PIN.");
            return false;
        }
        if (amount <= 0 || amount > balance) {
            System.out.println("Error: Insufficient funds or invalid amount.");
            return false;
        }
        balance -= amount;
        System.out.printf("Success: Withdrew $%.2f. New Balance: $%.2f%n", amount, balance);
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        ATM atm = new ATM(500.0, 1234);
        atm.withdraw(9999, 50.0);  // Invalid PIN
        atm.withdraw(1234, 150.0); // Valid withdrawal
    }
}`,
    expected: "Error: Invalid PIN.\\nSuccess: Withdrew $150.00. New Balance: $350.00",
    analogy: "A real ATM machine with an armored safe: users cannot reach inside to grab cash directly; they must provide credentials and valid transaction requests.",
    mistake: "Allowing negative deposits or withdrawals without bounds checks.",
    quizQ: "What principle ensures that an ATM's cash balance cannot be manipulated directly from external classes?",
    quizOpts: ["Polymorphism", "Encapsulation with private access", "Inheritance", "Generics"],
    correctIdx: 1
  }
];

m6TopicTemplates.forEach(t => {
  m6Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-6',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 16,
    difficulty: 'Beginner',
    visualizerType: t.id.includes('lifecycle') || t.id.includes('instance-variables') ? 'memory-model' : 'oop-hierarchy',
    objectives: [`Master ${t.title}.`, 'Apply encapsulation and constructor patterns.', 'Structure maintainable object-oriented code.'],
    prerequisites: ['Module 5: Methods and Recursion'],
    analogy: { title: t.title + ' Metaphor', text: t.analogy, metaphor: t.analogy },
    problemSolved: {
      title: 'Modeling Complex Real-World Domains Safely',
      description: 'Encapsulating state and operations prevents unauthorized mutations and architectural chaos.',
      keyPoints: ['Information hiding', 'Reliable constructor initialization', 'Object reusability']
    },
    intuition: {
      overview: `Architectural principles behind ${t.title}.`,
      steps: [
        { step: 1, title: 'Class Blueprint', description: 'Defines schema and behaviors.' },
        { step: 2, title: 'Heap Instantiation', description: 'new allocates memory and calls constructor.' },
        { step: 3, title: 'Method Invocation', description: 'Object interacts via controlled public APIs.' }
      ]
    },
    codeExample: { title: `Demonstrating ${t.title}`, code: t.code, explanation: `Examine the OOP structure of ${t.title}.` },
    runnableCode: { code: t.code, expectedOutput: t.expected },
    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'class ... { ... }', explanation: 'Class declaration and field definitions.' },
      { lines: '7-15', codeSnippet: '// Object instantiation and usage', explanation: 'Heap object lifecycle and method execution.' }
    ],
    commonMistakes: [{ mistake: t.mistake, solution: 'Follow OOP best practices.', whyWrong: 'Breaks encapsulation or violates Java syntax.' }],
    bestPractices: ['Make all fields private by default.', 'Expose minimal required public API.'],
    applications: [{ industry: 'Enterprise Banking', useCase: 'Modeling financial accounts, ledgers, and transactions.' }],
    practiceQuestions: [{ id: `pq-${t.id}`, question: t.quizQ, answer: t.quizOpts[t.correctIdx], explanation: 'Standard Java OOP specification.' }],
    quiz: [{ id: `qz-${t.id}`, question: t.quizQ, options: t.quizOpts, correctIndex: t.correctIdx, explanation: 'Adheres to Java standards.' }],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Beginner',
      description: `Implement ${t.title} to complete the object-oriented task.`,
      starterCode: t.code,
      hints: ['Review the lesson example above.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [`Mastered ${t.title}.`, 'Understood classes, objects, and encapsulation.', 'Ready for Advanced OOP in Module 7.'],
      nextLessonId: t.order === 10 ? 'java-inheritance-extends' : m6Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'Inheritance with the extends Keyword' : m6Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-7' : 'java-module-6'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-6.ts'), 'javaModule6Data', 'javaModule6Lessons', m6Data, m6Lessons);

// ==========================================
// MODULE 7: ADVANCED OOP
// ==========================================
const m7Data = {
  id: 'java-module-7',
  number: 7,
  title: 'Advanced OOP',
  subtitle: 'Inheritance, Polymorphism, Abstraction, Interfaces & Composition',
  order: 7,
  icon: 'GitBranch',
  badge: 'Polymorphic Design',
  estimatedHours: 11,
  topicsCount: 10,
  description: 'Master enterprise-level object-oriented architecture. Explore single inheritance with extends, superclass constructor chaining, dynamic method dispatch, the Object class root hierarchy, abstract classes vs interfaces, default methods, and composition.',
  lessons: [
    { id: 'java-inheritance-extends', moduleId: 'java-module-7', title: 'Inheritance with the extends Keyword (IS-A)', description: 'Subclassing, inheriting fields and methods, and the IS-A conceptual relationship.', order: 1, readTimeMinutes: 15, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-super-keyword', moduleId: 'java-module-7', title: 'The super Keyword: Superclass Constructors & Methods', description: 'Chaining parent constructors super() and accessing shadowed superclass methods.', order: 2, readTimeMinutes: 14, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-method-overriding', moduleId: 'java-module-7', title: 'Method Overriding and the @Override Annotation', description: 'Providing specialized subclass behavior while preserving method signatures.', order: 3, readTimeMinutes: 15, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-polymorphism-dispatch', moduleId: 'java-module-7', title: 'Runtime Polymorphism & Dynamic Method Dispatch', description: 'Superclass references pointing to subclass instances and JVM vtable lookups.', order: 4, readTimeMinutes: 18, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-object-methods', moduleId: 'java-module-7', title: 'The Root java.lang.Object Class (toString, equals, hashCode)', description: 'Overriding standard contract methods for all Java reference types.', order: 5, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-abstract-classes', moduleId: 'java-module-7', title: 'Abstract Classes and Abstract Methods', description: 'Incomplete base classes that mandate implementation in concrete subclasses.', order: 6, readTimeMinutes: 15, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-interfaces', moduleId: 'java-module-7', title: 'Interfaces in Java: Strict Behavioral Contracts', description: 'The implements keyword, multiple interface implementation, and decoupling.', order: 7, readTimeMinutes: 16, visualizerType: 'oop-hierarchy', difficulty: 'Beginner' },
    { id: 'java-default-methods', moduleId: 'java-module-7', title: 'Default and Static Methods in Interfaces (Java 8+)', description: 'Evolving interfaces without breaking backward compatibility using default methods.', order: 8, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-composition-over-inheritance', moduleId: 'java-module-7', title: 'Composition vs Inheritance (HAS-A vs IS-A)', description: 'Why favoring composition yields more flexible, loosely coupled software designs.', order: 9, readTimeMinutes: 16, visualizerType: 'oop-hierarchy', difficulty: 'Intermediate' },
    { id: 'java-final-immutable', moduleId: 'java-module-7', title: 'Final Classes, Final Methods & Immutable Design', description: 'Preventing subclassing, securing method logic, and crafting immutable value objects.', order: 10, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Intermediate' }
  ]
};

const m7Lessons = {};
const m7TopicTemplates = [
  {
    id: 'java-inheritance-extends',
    title: 'Inheritance with the extends Keyword (IS-A)',
    subtitle: 'Reusing Base Logic and Specializing Domain Classes with Single Inheritance',
    order: 1,
    code: `class Vehicle {
    String brand = "Ford";
    void honk() { System.out.println("Beep! Beep!"); }
}

class Car extends Vehicle {
    int doors = 4;
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.honk(); // Inherited from Vehicle!
        System.out.println("Brand: " + myCar.brand + ", Doors: " + myCar.doors);
    }
}`,
    expected: "Beep! Beep!\\nBrand: Ford, Doors: 4",
    analogy: "Biological inheritance: a child inherits genetic traits (eye color, hair) from their biological parents, and can also develop unique talents of their own.",
    mistake: "Attempting multiple class inheritance (class Car extends Vehicle, Machine); Java permits extending only ONE class.",
    quizQ: "Can a Java class extend more than one superclass directly?",
    quizOpts: ["Yes, separated by commas", "No, Java supports single inheritance of state only", "Yes, in Java 17+", "Only if both are abstract"],
    correctIdx: 1
  },
  {
    id: 'java-super-keyword',
    title: 'The super Keyword: Superclass Constructors & Methods',
    subtitle: 'Invoking Parent Constructors and Accessing Overridden Superclass Methods',
    order: 2,
    code: `class Animal {
    String name;
    public Animal(String name) { this.name = name; }
}

class Dog extends Animal {
    String breed;
    public Dog(String name, String breed) {
        super(name); // Must be first line!
        this.breed = breed;
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Buddy", "Golden Retriever");
        System.out.println(d.name + " is a " + d.breed);
    }
}`,
    expected: "Buddy is a Golden Retriever",
    analogy: "Phoning your parent for instructions: super() delegates the foundation setup to the parent class before you do your own specialized work.",
    mistake: "Calling super() after doing other assignments; super() MUST be the very first line of a subclass constructor.",
    quizQ: "What keyword is used to call a superclass constructor from a subclass constructor?",
    quizOpts: ["this()", "super()", "parent()", "base()"],
    correctIdx: 1
  },
  {
    id: 'java-method-overriding',
    title: 'Method Overriding and the @Override Annotation',
    subtitle: 'Redefining Inherited Methods to Provide Subclass-Specific Implementations',
    order: 3,
    code: `class Animal {
    void makeSound() { System.out.println("Some generic animal sound"); }
}

class Cat extends Animal {
    @Override
    void makeSound() { System.out.println("Meow! Purr!"); }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Animal();
        Animal c = new Cat();
        a.makeSound();
        c.makeSound(); // Overridden method invoked!
    }
}`,
    expected: "Some generic animal sound\\nMeow! Purr!",
    analogy: "A musical cover song: you take the standard sheet music (superclass method) but play it in your own unique jazz style (overridden subclass method).",
    mistake: "Accidentally overloading instead of overriding (e.g. changing the parameter type); @Override catches this error at compile time.",
    quizQ: "What is the purpose of the @Override annotation in Java?",
    quizOpts: ["Makes code run faster", "Instructs compiler to verify the method accurately overrides an inherited method", "Allows multiple inheritance", "Eliminates need for public"],
    correctIdx: 1
  },
  {
    id: 'java-polymorphism-dispatch',
    title: 'Runtime Polymorphism & Dynamic Method Dispatch',
    subtitle: 'Superclass References, Subclass Instances, and Virtual Method Tables',
    order: 4,
    code: `class Shape {
    void draw() { System.out.println("Drawing a shape"); }
}

class Circle extends Shape {
    @Override void draw() { System.out.println("Drawing a Circle ⭕"); }
}

class Square extends Shape {
    @Override void draw() { System.out.println("Drawing a Square ⬛"); }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(), new Square(), new Shape() };
        for (Shape s : shapes) {
            s.draw(); // Dynamic dispatch determines exact method at runtime!
        }
    }
}`,
    expected: "Drawing a Circle ⭕\\nDrawing a Square ⬛\\nDrawing a shape",
    analogy: "A universal remote control with a 'Play' button: if pointed at a DVD player it spins the disc; if pointed at Netflix it streams video. The remote button is the same (Shape.draw), but the target device reacts accordingly.",
    mistake: "Assuming the compiler decides which overridden method to run; the decision happens at runtime via dynamic dispatch.",
    quizQ: "What determines which overridden method executes in runtime polymorphism?",
    quizOpts: ["The variable reference type", "The actual heap object type at runtime", "The compiler's optimization level", "The package location"],
    correctIdx: 1
  },
  {
    id: 'java-object-methods',
    title: 'The Root java.lang.Object Class (toString, equals, hashCode)',
    subtitle: 'Implementing Universal Contracts for String Representation and Structural Equality',
    order: 5,
    code: `class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public String toString() { return "(" + x + ", " + y + ")"; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return this.x == p.x && this.y == p.y;
    }
}

public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(3, 4);
        Point p2 = new Point(3, 4);
        System.out.println("Point p1: " + p1);
        System.out.println("p1.equals(p2): " + p1.equals(p2));
    }
}`,
    expected: "Point p1: (3, 4)\\np1.equals(p2): true",
    analogy: "A passport photo and fingerprint: toString() is the readable human photo; equals() & hashCode() verify physical biometric match.",
    mistake: "Overriding equals() without overriding hashCode(), which breaks HashMaps and HashSets completely.",
    quizQ: "What class is the ultimate superclass of all classes in Java?",
    quizOpts: ["Class", "java.lang.Object", "java.lang.System", "Root"],
    correctIdx: 1
  },
  {
    id: 'java-abstract-classes',
    title: 'Abstract Classes and Abstract Methods',
    subtitle: 'Defining Incomplete Blueprints That Cannot Be Directly Instantiated',
    order: 6,
    code: `abstract class Employee {
    String name;
    Employee(String name) { this.name = name; }

    // Abstract method: no body! Must be implemented by subclasses
    abstract double calculateSalary();
}

class FullTimeEmployee extends Employee {
    double monthlySalary;
    FullTimeEmployee(String name, double salary) {
        super(name);
        this.monthlySalary = salary;
    }
    @Override double calculateSalary() { return monthlySalary; }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new FullTimeEmployee("Sarah", 5000.0);
        System.out.println(emp.name + " earns: $" + emp.calculateSalary());
    }
}`,
    expected: "Sarah earns: $5000.0",
    analogy: "An architectural blueprint marked 'Residential Building': you cannot sleep inside a blueprint on paper; you must construct an actual concrete house from it first.",
    mistake: "Attempting to create an object directly from an abstract class (new Employee()).",
    quizQ: "Can an abstract class be instantiated directly with the new keyword?",
    quizOpts: ["Yes, if it has a constructor", "No, abstract classes cannot be directly instantiated", "Yes, in Java 17+", "Only inside the same package"],
    correctIdx: 1
  },
  {
    id: 'java-interfaces',
    title: 'Interfaces in Java: Strict Behavioral Contracts',
    subtitle: 'The implements Keyword, Multiple Interface Support, and Total Decoupling',
    order: 7,
    code: `interface Drivable { void drive(); }
interface Flyable { void fly(); }

// A class can implement multiple interfaces!
class FlyingCar implements Drivable, Flyable {
    @Override public void drive() { System.out.println("Driving on highway..."); }
    @Override public void fly() { System.out.println("Flying in the sky..."); }
}

public class Main {
    public static void main(String[] args) {
        FlyingCar fc = new FlyingCar();
        fc.drive();
        fc.fly();
    }
}`,
    expected: "Driving on highway...\\nFlying in the sky...",
    analogy: "A USB-C port standard: any device (mouse, keyboard, monitor) that implements the USB-C contract can plug into your laptop seamlessly.",
    mistake: "Forgetting that all interface methods without a body are public and abstract by default.",
    quizQ: "How many interfaces can a single Java class implement?",
    quizOpts: ["Only one", "Up to two", "Any number of interfaces", "None"],
    correctIdx: 2
  },
  {
    id: 'java-default-methods',
    title: 'Default and Static Methods in Interfaces (Java 8+)',
    subtitle: 'Evolving Interfaces Without Breaking Existing Implementing Classes',
    order: 8,
    code: `interface Logger {
    void log(String message);

    // Default method provides fallback implementation
    default void logWarning(String message) {
        log("[WARNING] " + message);
    }
}

class ConsoleLogger implements Logger {
    @Override public void log(String message) {
        System.out.println(message);
    }
}

public class Main {
    public static void main(String[] args) {
        Logger logger = new ConsoleLogger();
        logger.log("System normal");
        logger.logWarning("Disk space low");
    }
}`,
    expected: "System normal\\n[WARNING] Disk space low",
    analogy: "Adding a new USB accessory to an existing computer: default methods provide built-in default drivers so old hardware doesn't crash.",
    mistake: "Assuming default methods make interfaces identical to abstract classes (interfaces still cannot hold instance state).",
    quizQ: "What keyword allows an interface method to provide a default implementation body?",
    quizOpts: ["static", "default", "concrete", "virtual"],
    correctIdx: 1
  },
  {
    id: 'java-composition-over-inheritance',
    title: 'Composition vs Inheritance (HAS-A vs IS-A)',
    subtitle: 'Favoring Object Composition to Avoid Fragile Base Class Hierarchies',
    order: 9,
    code: `class Engine {
    void start() { System.out.println("V8 Engine roaring to life!"); }
}

// Composition: Car HAS-AN Engine (not IS-AN Engine)
class Car {
    private Engine engine = new Engine();
    void drive() {
        engine.start();
        System.out.println("Car is moving forward.");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.drive();
    }
}`,
    expected: "V8 Engine roaring to life!\\nCar is moving forward.",
    analogy: "Assembling a modular desktop PC: you don't 'inherit' from a graphics card; your computer 'has a' graphics card plugged into a slot.",
    mistake: "Forcing inheritance where a HAS-A relationship exists (e.g. class Car extends Engine).",
    quizQ: "What relationship does Composition represent in software design?",
    quizOpts: ["IS-A", "HAS-A", "USES-A-POINTER", "EXTENDS-A"],
    correctIdx: 1
  },
  {
    id: 'java-final-immutable',
    title: 'Final Classes, Final Methods & Immutable Design',
    subtitle: 'Preventing Inheritance, Locking Down Security-Critical Logic, and Pure Values',
    order: 10,
    code: `// Final class cannot be extended by anyone!
final class SecureToken {
    private final String token; // Immutable field

    public SecureToken(String token) {
        this.token = token;
    }
    public String getToken() { return token; }
}

public class Main {
    public static void main(String[] args) {
        SecureToken st = new SecureToken("AUTH_XYZ_987");
        System.out.println("Secure Immutable Token: " + st.getToken());
    }
}`,
    expected: "Secure Immutable Token: AUTH_XYZ_987",
    analogy: "A wax-sealed confidential envelope: no one can tamper with the contents, and no one can forge an extension of it.",
    mistake: "Allowing mutable objects to leak out of an immutable class without defensive copying.",
    quizQ: "What happens if you attempt to create a subclass of a class declared as 'final'?",
    quizOpts: ["The subclass is marked private", "The code fails to compile", "It runs with a warning", "It creates a proxy class"],
    correctIdx: 1
  }
];

m7TopicTemplates.forEach(t => {
  m7Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-7',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 16,
    difficulty: t.order > 7 ? 'Intermediate' : 'Beginner',
    visualizerType: 'oop-hierarchy',
    objectives: [`Master ${t.title}.`, 'Apply enterprise OOP principles.', 'Design loosely coupled, polymorphic software.'],
    prerequisites: ['Module 6: OOP Fundamentals'],
    analogy: { title: t.title + ' Metaphor', text: t.analogy, metaphor: t.analogy },
    problemSolved: {
      title: 'Enterprise Architecture & Polymorphic Extensibility',
      description: 'Allows systems to scale and adapt to new business requirements without rewriting base logic.',
      keyPoints: ['Loose coupling', 'Open-Closed Principle (OCP)', 'Dynamic dispatch']
    },
    intuition: {
      overview: `Architectural mechanics of ${t.title}.`,
      steps: [
        { step: 1, title: 'Contract or Base Definition', description: 'Superclass or interface defines the public specification.' },
        { step: 2, title: 'Concrete Specialization', description: 'Subclasses implement or override behaviors.' },
        { step: 3, title: 'Polymorphic Invocation', description: 'Client code interacts via universal abstractions.' }
      ]
    },
    codeExample: { title: `Demonstrating ${t.title}`, code: t.code, explanation: `Examine the OOP structure of ${t.title}.` },
    runnableCode: { code: t.code, expectedOutput: t.expected },
    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'class ... extends/implements ...', explanation: 'Class hierarchy declaration.' },
      { lines: '7-15', codeSnippet: '// Polymorphic dispatch and execution', explanation: 'Dynamic method invocation.' }
    ],
    commonMistakes: [{ mistake: t.mistake, solution: 'Follow advanced OOP conventions.', whyWrong: 'Causes compiler errors or fragile architectures.' }],
    bestPractices: ['Favor composition over inheritance.', 'Use @Override on every overridden method.'],
    applications: [{ industry: 'Framework Architecture', useCase: 'Spring Framework and Java standard library core contracts.' }],
    practiceQuestions: [{ id: `pq-${t.id}`, question: t.quizQ, answer: t.quizOpts[t.correctIdx], explanation: 'Standard Java OOP specification.' }],
    quiz: [{ id: `qz-${t.id}`, question: t.quizQ, options: t.quizOpts, correctIndex: t.correctIdx, explanation: 'Adheres to Java standards.' }],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Beginner',
      description: `Implement ${t.title} to complete the polymorphic design task.`,
      starterCode: t.code,
      hints: ['Review the lesson example above.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [`Mastered ${t.title}.`, 'Understood inheritance, polymorphism, and interfaces.', 'Ready for Packages and Generics in Module 8.'],
      nextLessonId: t.order === 10 ? 'java-packages-structure' : m7Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'Java Packages and Directory Structure' : m7Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-8' : 'java-module-7'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-7.ts'), 'javaModule7Data', 'javaModule7Lessons', m7Data, m7Lessons);
console.log('Modules 5, 6, 7 authored successfully!');
