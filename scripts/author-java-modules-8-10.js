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
// MODULE 8: PACKAGES AND GENERICS
// ==========================================
const m8Data = {
  id: 'java-module-8',
  number: 8,
  title: 'Packages and Generics',
  subtitle: 'Namespaces, Enums, Nested Classes, Generics & Type Safety',
  order: 8,
  icon: 'Shield',
  badge: 'Type Systems',
  estimatedHours: 9,
  topicsCount: 10,
  description: 'Organize large software systems and write compile-time type-safe code. Master packages, imports, enum types with methods, inner and anonymous classes, generic classes and methods, bounded type parameters, and wildcard PECS rules.',
  lessons: [
    { id: 'java-packages-structure', moduleId: 'java-module-8', title: 'Java Packages and Directory Structure', description: 'Namespaces, reverse domain conventions, and organizing source code on disk.', order: 1, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-imports-static', moduleId: 'java-module-8', title: 'The import Statement and Static Imports', description: 'Explicit imports, wildcard imports, and importing static members directly.', order: 2, readTimeMinutes: 12, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-package-access', moduleId: 'java-module-8', title: 'Access Modifiers Across Packages', description: 'Package-private visibility vs public, protected, and private in modular apps.', order: 3, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-enums', moduleId: 'java-module-8', title: 'Enumerations (enum) with Fields & Methods', description: 'Type-safe constants, custom enum constructors, and switch integration.', order: 4, readTimeMinutes: 15, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-nested-classes', moduleId: 'java-module-8', title: 'Nested Classes: Static Nested vs Inner Classes', description: 'Encapsulating helper classes, enclosing instances, and the static difference.', order: 5, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-anonymous-classes', moduleId: 'java-module-8', title: 'Anonymous Inner Classes & Local Classes', description: 'Inline class instantiation for single-use callbacks and event handlers.', order: 6, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-generics-intro', moduleId: 'java-module-8', title: 'Introduction to Java Generics: Type Safety', description: 'Eliminating ClassCastExceptions, compile-time type checks, and raw types.', order: 7, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-generic-classes-methods', moduleId: 'java-module-8', title: 'Generic Classes & Generic Methods (<T>, <K, V>)', description: 'Creating reusable data containers and type-parameterized functions.', order: 8, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-bounded-generics', moduleId: 'java-module-8', title: 'Bounded Type Parameters (<T extends Comparable>)', description: 'Restricting generic type arguments to subclasses of specific base types.', order: 9, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-generics-wildcards', moduleId: 'java-module-8', title: 'Wildcards in Generics: ?, ? extends, and PECS', description: 'Producer Extends, Consumer Super (PECS) rule for flexible API signatures.', order: 10, readTimeMinutes: 18, visualizerType: 'none', difficulty: 'Intermediate' }
  ]
};

const m8Lessons = {};
const m8TopicTemplates = [
  {
    id: 'java-packages-structure',
    title: 'Java Packages and Directory Structure',
    subtitle: 'Preventing Name Collisions with Reverse-Domain Namespaces (com.company.app)',
    order: 1,
    code: `// package declaration must be the first non-comment line!
// package com.javalab.models;

public class Main {
    public static void main(String[] args) {
        System.out.println("Package namespace: com.javalab.models");
        System.out.println("Directory path: src/com/javalab/models/Main.java");
    }
}`,
    expected: "Package namespace: com.javalab.models\\nDirectory path: src/com/javalab/models/Main.java",
    analogy: "Postal ZIP codes: if two different cities both have a 'Main Street', the ZIP code (package) ensures the mail carrier delivers to the right address.",
    mistake: "Placing a package statement anywhere other than the very first line of a Java file.",
    quizQ: "What convention is standard for Java package naming?",
    quizOpts: ["ALL_CAPS", "Reverse domain name in lowercase (e.g. com.google.common)", "PascalCase", "CamelCase"],
    correctIdx: 1
  },
  {
    id: 'java-imports-static',
    title: 'The import Statement and Static Imports',
    subtitle: 'Importing Types and Calling Math Constants/Methods Directly',
    order: 2,
    code: `import static java.lang.Math.PI;
import static java.lang.Math.sqrt;

public class Main {
    public static void main(String[] args) {
        // Direct access without Math. prefix thanks to static import!
        double radius = 5.0;
        double area = PI * radius * radius;
        System.out.println("Area: " + area);
        System.out.println("Square root of 25: " + sqrt(25));
    }
}`,
    expected: "Area: 78.53981633974483\\nSquare root of 25: 5.0",
    analogy: "Creating a speed-dial button on your phone: instead of dialing the full 10-digit number (Math.sqrt), you press one button (sqrt).",
    mistake: "Overusing static imports, causing confusing namespace pollution.",
    quizQ: "Which package is automatically imported by Java into every single file without an import statement?",
    quizOpts: ["java.util", "java.lang", "java.io", "java.net"],
    correctIdx: 1
  },
  {
    id: 'java-package-access',
    title: 'Access Modifiers Across Packages',
    subtitle: 'Package-Private Default Scope vs Protected Subclasses Across Boundaries',
    order: 3,
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Package Boundaries:");
        System.out.println("- Same package: public, protected, package-private");
        System.out.println("- Different package subclass: public, protected");
        System.out.println("- Different package non-subclass: public only");
    }
}`,
    expected: "Package Boundaries:\\n- Same package: public, protected, package-private\\n- Different package subclass: public, protected\\n- Different package non-subclass: public only",
    analogy: "Neighborhood community gates: neighbors in the same community (package) share the private park; outsiders can only access the public sidewalk.",
    mistake: "Assuming protected members are private outside their class; protected allows access to all classes in the same package as well.",
    quizQ: "Can a package-private method be called from a different package?",
    quizOpts: ["Yes, anytime", "No, package-private is strictly confined to the declaring package", "Yes, if imported", "Only by subclasses"],
    correctIdx: 1
  },
  {
    id: 'java-enums',
    title: 'Enumerations (enum) with Fields & Methods',
    subtitle: 'Type-Safe Fixed Sets of Constants with Full Object Capabilities',
    order: 4,
    code: `enum OrderStatus {
    PENDING("Awaiting payment"),
    SHIPPED("On delivery truck"),
    DELIVERED("Handed to customer");

    private final String description;
    OrderStatus(String desc) { this.description = desc; }
    public String getDescription() { return description; }
}

public class Main {
    public static void main(String[] args) {
        OrderStatus status = OrderStatus.SHIPPED;
        System.out.println("Status name: " + status.name());
        System.out.println("Status note: " + status.getDescription());
    }
}`,
    expected: "Status name: SHIPPED\\nStatus note: On delivery truck",
    analogy: "The four suits in a deck of cards (Hearts, Diamonds, Clubs, Spades): there will never be a 5th suit; enums guarantee no invalid values exist.",
    mistake: "Using arbitrary strings (e.g. \"shipped\" vs \"SHIPPED\") instead of type-safe enums.",
    quizQ: "Can a Java enum have fields, constructors, and methods?",
    quizOpts: ["No, enums are only numbers", "Yes, Java enums are full-fledged classes with custom fields and methods", "Only static methods", "Only in Java 17+"],
    correctIdx: 1
  },
  {
    id: 'java-nested-classes',
    title: 'Nested Classes: Static Nested vs Inner Classes',
    subtitle: 'Encapsulating Helper Classes Within Their Primary Context',
    order: 5,
    code: `class Outer {
    static class StaticNested {
        void display() { System.out.println("Static nested class (no outer instance needed)"); }
    }
}

public class Main {
    public static void main(String[] args) {
        Outer.StaticNested nested = new Outer.StaticNested();
        nested.display();
    }
}`,
    expected: "Static nested class (no outer instance needed)",
    analogy: "A glove box inside a car: it is logically bundled inside the car's compartment, not floating loosely on the street.",
    mistake: "Instantiating an inner class without an instance of the outer class (static nested classes do not require an outer instance).",
    quizQ: "Does a static nested class require an instance of the outer enclosing class to be instantiated?",
    quizOpts: ["Yes, always", "No, it behaves like any top-level class scoped inside the outer namespace", "Only if it has private fields", "Only in subclasses"],
    correctIdx: 1
  },
  {
    id: 'java-anonymous-classes',
    title: 'Anonymous Inner Classes & Local Classes',
    subtitle: 'One-Time On-The-Fly Class Declarations and Interface Implementations',
    order: 6,
    code: `interface Greeter { void greet(); }

public class Main {
    public static void main(String[] args) {
        // Anonymous class instantiated directly on the interface!
        Greeter greeter = new Greeter() {
            @Override public void greet() {
                System.out.println("Hello from an Anonymous Inner Class!");
            }
        };
        greeter.greet();
    }
}`,
    expected: "Hello from an Anonymous Inner Class!",
    analogy: "A disposable rental car: you don't buy and register a whole new car name; you use it once for an afternoon errand and return it.",
    mistake: "Writing huge 100-line anonymous classes; use separate named classes or lambdas for readability.",
    quizQ: "Can an anonymous class have a named constructor?",
    quizOpts: ["Yes, with the same name as the interface", "No, because anonymous classes have no name", "Yes, named constructor()", "Only with private access"],
    correctIdx: 1
  },
  {
    id: 'java-generics-intro',
    title: 'Introduction to Java Generics: Type Safety',
    subtitle: 'Eliminating ClassCastExceptions and Parameterizing Types at Compile Time',
    order: 7,
    code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // Generics enforce that only Strings enter this list
        ArrayList<String> names = new ArrayList<>();
        names.add("Ada Lovelace");
        names.add("James Gosling");

        for (String name : names) {
            System.out.println("Scientist: " + name);
        }
    }
}`,
    expected: "Scientist: Ada Lovelace\\nScientist: James Gosling",
    analogy: "A coin-sorting machine with calibrated slots: the quarter slot physically only accepts quarters, making it impossible to mix up coins.",
    mistake: "Using raw types (ArrayList without <Type>), which disables compile-time type safety.",
    quizQ: "What is the primary benefit of Java Generics?",
    quizOpts: ["Faster memory allocation", "Compile-time type safety without manual casting", "Automatic garbage collection", "Eliminating loops"],
    correctIdx: 1
  },
  {
    id: 'java-generic-classes-methods',
    title: 'Generic Classes & Generic Methods (<T>, <K, V>)',
    subtitle: 'Building Reusable Type-Safe Containers and Utility Functions',
    order: 8,
    code: `class KeyValuePair<K, V> {
    private K key;
    private V value;
    public KeyValuePair(K key, V value) { this.key = key; this.value = value; }
    public K getKey() { return key; }
    public V getValue() { return value; }
}

public class Main {
    public static void main(String[] args) {
        KeyValuePair<String, Integer> score = new KeyValuePair<>("Alice", 98);
        System.out.println("Key: " + score.getKey() + ", Value: " + score.getValue());
    }
}`,
    expected: "Key: Alice, Value: 98",
    analogy: "A transparent shipping container: whether you ship bananas (<Fruit>) or smartphones (<Electronics>), the container safely holds them without mixing types.",
    mistake: "Trying to use primitive types directly as generic type arguments (e.g. ArrayList<int> instead of ArrayList<Integer>).",
    quizQ: "Can primitive types (like int, double) be passed directly as generic type arguments in Java?",
    quizOpts: ["Yes, anytime", "No, Java generics only accept reference types (wrapper classes like Integer, Double)", "Yes, in Java 17+", "Only with byte"],
    correctIdx: 1
  },
  {
    id: 'java-bounded-generics',
    title: 'Bounded Type Parameters (<T extends Comparable>)',
    subtitle: 'Enforcing Upper Bounds to Ensure Capability Guarantees on Generic Types',
    order: 9,
    code: `public class Main {
    // T must implement Comparable<T> so compareTo is guaranteed to exist!
    public static <T extends Comparable<T>> T findMax(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    public static void main(String[] args) {
        System.out.println("Max int: " + findMax(10, 25));
        System.out.println("Max string: " + findMax("Zebra", "Apple"));
    }
}`,
    expected: "Max int: 25\\nMax string: Zebra",
    analogy: "A VIP club entrance that admits anyone (<T>), provided they wear a formal suit (<T extends Suit>).",
    mistake: "Using 'implements' in generic bounds; Java syntax strictly uses 'extends' for both classes and interfaces in bounds (<T extends Interface>).",
    quizQ: "Which keyword is used to specify that a generic parameter T must implement an interface in bounds?",
    quizOpts: ["implements", "extends", "with", "super"],
    correctIdx: 1
  },
  {
    id: 'java-generics-wildcards',
    title: 'Wildcards in Generics: ?, ? extends, and PECS',
    subtitle: 'Producer Extends, Consumer Super: The Secret to Designing Flexible APIs',
    order: 10,
    code: `import java.util.List;
import java.util.Arrays;

public class Main {
    // ? extends Number: accepts List<Integer>, List<Double>, etc.
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) sum += n.doubleValue();
        return sum;
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.5, 2.5);
        System.out.println("Ints sum: " + sumOfList(ints));
        System.out.println("Doubles sum: " + sumOfList(doubles));
    }
}`,
    expected: "Ints sum: 6.0\\nDoubles sum: 4.0",
    analogy: "A food buffet: if you are eating (reading from list), any food (? extends Edible) works. If you are stocking food (writing into list), you need a bin that can hold everything (? super Apple).",
    mistake: "Attempting to add elements into a collection declared with <? extends Type>; it is read-only (producer).",
    quizQ: "What does the PECS mnemonic stand for in Java generics?",
    quizOpts: ["Parameter Extends, Consumer Static", "Producer Extends, Consumer Super", "Private Extends, Concrete Super", "Package Extends, Class Super"],
    correctIdx: 1
  }
];

m8TopicTemplates.forEach(t => {
  m8Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-8',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 15,
    difficulty: t.order > 6 ? 'Intermediate' : 'Beginner',
    visualizerType: 'none',
    objectives: [`Master ${t.title}.`, 'Ensure compile-time type safety.', 'Design scalable modular libraries.'],
    prerequisites: ['Module 7: Advanced OOP'],
    analogy: { title: t.title + ' Metaphor', text: t.analogy, metaphor: t.analogy },
    problemSolved: {
      title: 'Type Safety and Enterprise Modularity',
      description: 'Prevents ClassCastExceptions and organizes code into maintainable packages.',
      keyPoints: ['Compile-time verification', 'Reusable generic containers', 'Strict modularity']
    },
    intuition: {
      overview: `Mechanics behind ${t.title}.`,
      steps: [
        { step: 1, title: 'Type Specification', description: 'Parameterizes types or defines visibility.' },
        { step: 2, title: 'Compile-Time Erasure', description: 'Compiler verifies safety and erases type params for bytecode.' },
        { step: 3, title: 'Runtime Execution', description: 'Runs with zero casting overhead.' }
      ]
    },
    codeExample: { title: `Demonstrating ${t.title}`, code: t.code, explanation: `Examine the implementation of ${t.title}.` },
    runnableCode: { code: t.code, expectedOutput: t.expected },
    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'Generic / Package declaration', explanation: 'Defines type parameter or structure.' },
      { lines: '7-15', codeSnippet: '// Method execution and verification', explanation: 'Type-safe execution.' }
    ],
    commonMistakes: [{ mistake: t.mistake, solution: 'Follow generic guidelines.', whyWrong: 'Causes compile-time errors or type erasure bugs.' }],
    bestPractices: ['Always use generic collections instead of raw types.', 'Follow PECS rule for API parameters.'],
    applications: [{ industry: 'Frameworks & Libraries', useCase: 'Spring Data, Hibernate, and standard Collections Framework.' }],
    practiceQuestions: [{ id: `pq-${t.id}`, question: t.quizQ, answer: t.quizOpts[t.correctIdx], explanation: 'Standard Java specification.' }],
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
      keyTakeaways: [`Mastered ${t.title}.`, 'Understood generics and packaging.', 'Ready for Exception Handling in Module 9.'],
      nextLessonId: t.order === 10 ? 'java-exception-hierarchy' : m8Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'The Java Exception Hierarchy' : m8Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-9' : 'java-module-8'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-8.ts'), 'javaModule8Data', 'javaModule8Lessons', m8Data, m8Lessons);

// ==========================================
// MODULE 9: EXCEPTION HANDLING
// ==========================================
const m9Data = {
  id: 'java-module-9',
  number: 9,
  title: 'Exception Handling',
  subtitle: 'Try-Catch, Finally, Throw, Throws, Custom Exceptions & Debugging',
  order: 9,
  icon: 'AlertTriangle',
  badge: 'Fault Tolerance',
  estimatedHours: 9,
  topicsCount: 10,
  description: 'Write robust, crash-proof Java software. Master the Throwable hierarchy, checked vs unchecked exceptions, try-catch-finally, try-with-resources and AutoCloseable, throw and throws keywords, custom exceptions, and stack trace debugging.',
  lessons: [
    { id: 'java-exception-hierarchy', moduleId: 'java-module-9', title: 'The Java Exception Hierarchy (Throwable)', description: 'Throwable, Error, Exception, and RuntimeException classifications.', order: 1, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-checked-vs-unchecked', moduleId: 'java-module-9', title: 'Checked Exceptions vs Unchecked Exceptions', description: 'Compile-time mandatory handling (IOException) vs runtime logic bugs (NullPointerException).', order: 2, readTimeMinutes: 15, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-try-catch-blocks', moduleId: 'java-module-9', title: 'The try-catch Mechanism & Multi-Catch', description: 'Intercepting exceptions, order of catch blocks, and multi-catch syntax (A | B).', order: 3, readTimeMinutes: 15, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-finally-block', moduleId: 'java-module-9', title: 'The finally Block & Guaranteed Cleanup', description: 'Why finally always runs even on return statements or unhandled exceptions.', order: 4, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-try-with-resources', moduleId: 'java-module-9', title: 'Try-with-Resources & AutoCloseable (Java 7+)', description: 'Automatic resource management preventing connection and file leaks.', order: 5, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-throw-throws', moduleId: 'java-module-9', title: 'The throw and throws Keywords', description: 'Explicitly throwing exception objects vs declaring propagated exceptions in signatures.', order: 6, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-custom-exceptions', moduleId: 'java-module-9', title: 'Creating Domain-Specific Custom Exceptions', description: 'Subclassing Exception and RuntimeException to model application errors.', order: 7, readTimeMinutes: 15, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-exception-chaining', moduleId: 'java-module-9', title: 'Exception Chaining & Preserving Stack Traces', description: 'Wrapping low-level technical errors in domain exceptions using initCause.', order: 8, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-exception-best-practices', moduleId: 'java-module-9', title: 'Best Practices: Avoiding Anti-Patterns', description: 'Why swallowing exceptions with empty catch blocks causes catastrophic system failures.', order: 9, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-debugging-stack-traces', moduleId: 'java-module-9', title: 'Debugging Techniques & Stack Trace Forensics', description: 'Reading line numbers, identifying the root cause, and debugging in IDEs.', order: 10, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Beginner' }
  ]
};

const m9Lessons = {};
const m9TopicTemplates = [
  {
    id: 'java-exception-hierarchy',
    title: 'The Java Exception Hierarchy (Throwable)',
    subtitle: 'Throwable -> (Error vs Exception -> RuntimeException)',
    order: 1,
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java Exception Hierarchy:");
        System.out.println("- Throwable (Root class)");
        System.out.println("  ├── Error (Fatal JVM failures: OutOfMemoryError, StackOverflowError)");
        System.out.println("  └── Exception (Recoverable conditions)");
        System.out.println("      ├── RuntimeException (Unchecked: NullPointerException, ArithmeticException)");
        System.out.println("      └── Checked Exceptions (IOException, SQLException)");
    }
}`,
    expected: "Java Exception Hierarchy:\\n- Throwable (Root class)\\n  ├── Error (Fatal JVM failures: OutOfMemoryError, StackOverflowError)\\n  └── Exception (Recoverable conditions)\\n      ├── RuntimeException (Unchecked: NullPointerException, ArithmeticException)\\n      └── Checked Exceptions (IOException, SQLException)",
    analogy: "An emergency medical triage: an Error is a total catastrophic hospital power failure (cannot be solved by a doctor); an Exception is an injury that a doctor can treat and recover from.",
    mistake: "Catching Error or Throwable directly; never attempt to catch fatal JVM system errors.",
    quizQ: "Which class is the superclass of all errors and exceptions in the Java language?",
    quizOpts: ["Exception", "java.lang.Throwable", "RuntimeException", "Error"],
    correctIdx: 1
  },
  {
    id: 'java-checked-vs-unchecked',
    title: 'Checked Exceptions vs Unchecked Exceptions',
    subtitle: 'Compile-Time Enforced Safety vs Runtime Program Logic Bugs',
    order: 2,
    code: `public class Main {
    public static void main(String[] args) {
        // Unchecked exception: occurs dynamically (program bug)
        try {
            String str = null;
            System.out.println(str.length()); // Throws NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Caught unchecked NullPointerException safely.");
        }
    }
}`,
    expected: "Caught unchecked NullPointerException safely.",
    analogy: "A passport check at an airport (Checked: airport mandates you show it before boarding) vs tripping on your shoelaces (Unchecked: happens unexpectedly due to carelessness).",
    mistake: "Creating checked exceptions for everyday programming logic errors.",
    quizQ: "Which of the following is an Unchecked exception?",
    quizOpts: ["java.io.IOException", "java.sql.SQLException", "java.lang.NullPointerException", "ClassNotFoundException"],
    correctIdx: 2
  },
  {
    id: 'java-try-catch-blocks',
    title: 'The try-catch Mechanism & Multi-Catch',
    subtitle: 'Intercepting Failures and Gracefully Continuing Execution',
    order: 3,
    code: `public class Main {
    public static void main(String[] args) {
        try {
            int[] nums = {1, 2, 3};
            System.out.println(nums[5]); // Out of bounds!
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught error: " + e.getMessage());
        }
        System.out.println("System operational after caught exception.");
    }
}`,
    expected: "Caught error: Index 5 out of bounds for length 3\\nSystem operational after caught exception.",
    analogy: "A trapeze safety net: if the acrobat misses the bar, the net catches them safely so the circus show doesn't end in disaster.",
    mistake: "Ordering catch blocks with the superclass Exception first; child exceptions must be caught before parent exceptions.",
    quizQ: "Can multiple catch blocks be chained to handle different exception types from a single try block?",
    quizOpts: ["No, only one catch per try", "Yes, and they should be ordered from most specific to most general", "Yes, in reverse order", "Only with multi-threading"],
    correctIdx: 1
  },
  {
    id: 'java-finally-block',
    title: 'The finally Block & Guaranteed Cleanup',
    subtitle: 'The Block That ALWAYS Executes, Even on Return Statements',
    order: 4,
    code: `public class Main {
    public static String testFinally() {
        try {
            System.out.println("Inside try block");
            return "Returned from try";
        } finally {
            System.out.println("Inside finally block (Guaranteed execution!)");
        }
    }

    public static void main(String[] args) {
        String res = testFinally();
        System.out.println("Result: " + res);
    }
}`,
    expected: "Inside try block\\nInside finally block (Guaranteed execution!)\\nResult: Returned from try",
    analogy: "Washing your hands before leaving the building: whether your appointment went great or terrible, you ALWAYS wash your hands before exiting.",
    mistake: "Putting return statements inside the finally block, which swallows original return values or exceptions.",
    quizQ: "Does the finally block execute if a return statement is encountered inside the try block?",
    quizOpts: ["No, return terminates immediately", "Yes, finally executes right before the method returns", "Only if an exception occurred", "Only in void methods"],
    correctIdx: 1
  },
  {
    id: 'java-try-with-resources',
    title: 'Try-with-Resources & AutoCloseable (Java 7+)',
    subtitle: 'Eliminating Explicit close() Calls and Resource Leaks Automatically',
    order: 5,
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Scanner implements AutoCloseable; automatically closed at end of block!
        try (Scanner sc = new Scanner("Resource management in Java")) {
            System.out.println("Token: " + sc.next());
        }
        System.out.println("Scanner closed automatically without explicit close().");
    }
}`,
    expected: "Token: Resource\\nScanner closed automatically without explicit close().",
    analogy: "An automatic hotel room door that locks itself when you step out; no need to manually turn the deadbolt.",
    mistake: "Using resources in try-with-resources that do not implement the AutoCloseable interface.",
    quizQ: "What interface must a class implement to be eligible for use inside try-with-resources?",
    quizOpts: ["java.io.Serializable", "java.lang.AutoCloseable", "java.lang.Runnable", "java.lang.Cloneable"],
    correctIdx: 1
  },
  {
    id: 'java-throw-throws',
    title: 'The throw and throws Keywords',
    subtitle: 'Actively Firing an Exception vs Declaring Exceptions in Method Signatures',
    order: 6,
    code: `public class Main {
    public static void validateAge(int age) {
        if (age < 0) {
            // throw: actively creates and fires the exception
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
        System.out.println("Valid age: " + age);
    }

    public static void main(String[] args) {
        try {
            validateAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Handled: " + e.getMessage());
        }
    }
}`,
    expected: "Handled: Age cannot be negative: -5",
    analogy: "throw is physically launching a baseball (creating an exception). throws is the warning sign on the stadium gate: 'Watch out for flying baseballs!'.",
    mistake: "Confusing throw (statement inside method) with throws (clause on method signature).",
    quizQ: "What is the difference between throw and throws?",
    quizOpts: ["They are identical synonyms", "throw triggers an exception; throws declares potential exceptions in the method signature", "throw is for checked, throws is for unchecked", "throw is used in catch only"],
    correctIdx: 1
  },
  {
    id: 'java-custom-exceptions',
    title: 'Creating Domain-Specific Custom Exceptions',
    subtitle: 'Extending Exception to Represent Business Logic Failures',
    order: 7,
    code: `class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) { super(msg); }
}

public class Main {
    public static void main(String[] args) {
        try {
            throw new InsufficientFundsException("Account #123 has only $5 remaining.");
        } catch (InsufficientFundsException e) {
            System.out.println("Custom Business Error: " + e.getMessage());
        }
    }
}`,
    expected: "Custom Business Error: Account #123 has only $5 remaining.",
    analogy: "Customized diagnostic codes in an automobile: instead of a generic 'engine broken' light, the scanner reports 'Error P0301: Cylinder 1 Misfire'.",
    mistake: "Creating hundreds of trivial custom exceptions when standard JDK exceptions (IllegalArgumentException) suffice.",
    quizQ: "To create a checked custom exception, which class should your custom class extend?",
    quizOpts: ["RuntimeException", "java.lang.Exception", "Error", "Throwable directly"],
    correctIdx: 1
  },
  {
    id: 'java-exception-chaining',
    title: 'Exception Chaining & Preserving Stack Traces',
    subtitle: 'Wrapping Low-Level Technical Failures Without Losing the Root Cause',
    order: 8,
    code: `public class Main {
    public static void main(String[] args) {
        try {
            try {
                int x = 10 / 0;
            } catch (ArithmeticException cause) {
                // Wrap in higher-level domain exception while preserving cause
                throw new RuntimeException("Calculation failed during billing", cause);
            }
        } catch (RuntimeException e) {
            System.out.println("High level: " + e.getMessage());
            System.out.println("Original root cause: " + e.getCause());
        }
    }
}`,
    expected: "High level: Calculation failed during billing\\nOriginal root cause: java.lang.ArithmeticException: / by zero",
    analogy: "An investigative chain of custody: the police evidence bag wraps the weapon, preserving the original fingerprint intact inside.",
    mistake: "Catching an exception and throwing a new exception without passing the original cause, destroying the root stack trace.",
    quizQ: "How do you preserve the original exception when rethrowing a new exception?",
    quizOpts: ["Pass the original exception as the cause parameter to the new exception constructor", "Call System.gc()", "Use the finally block", "It is preserved automatically without passing"],
    correctIdx: 0
  },
  {
    id: 'java-exception-best-practices',
    title: 'Best Practices: Avoiding Anti-Patterns',
    subtitle: 'The Evils of Empty Catch Blocks, Swallowing Exceptions, and Clean Logging',
    order: 9,
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Exception Handling Best Practices:");
        System.out.println("1. NEVER swallow exceptions with empty catch {} blocks.");
        System.out.println("2. Catch specific exceptions, not generic Exception.");
        System.out.println("3. Clean up resources using try-with-resources.");
        System.out.println("4. Include meaningful contextual messages with data values.");
    }
}`,
    expected: "Exception Handling Best Practices:\\n1. NEVER swallow exceptions with empty catch {} blocks.\\n2. Catch specific exceptions, not generic Exception.\\n3. Clean up resources using try-with-resources.\\n4. Include meaningful contextual messages with data values.",
    analogy: "Silencing the smoke alarm by ripping out the battery instead of putting out the fire: an empty catch block hides the disaster until the house burns down.",
    mistake: "Empty catch blocks (catch (Exception e) {}), which hide critical bugs and make production systems impossible to debug.",
    quizQ: "Why is swallowing an exception with an empty catch block considered an anti-pattern?",
    quizOpts: ["It slows down the CPU", "It conceals failures and causes silent data corruption that cannot be traced", "Java forbids empty blocks at compile time", "It requires double memory"],
    correctIdx: 1
  },
  {
    id: 'java-debugging-stack-traces',
    title: 'Debugging Techniques & Stack Trace Forensics',
    subtitle: 'Reading Line Numbers, Causality Chains, and Diagnosing Crash Logs',
    order: 10,
    code: `public class Main {
    public static void simulateFailure() {
        int[] arr = new int[2];
        arr[5] = 100; // Line 4
    }

    public static void main(String[] args) {
        try {
            simulateFailure();
        } catch (Exception e) {
            System.out.println("Stack Trace Forensic Details:");
            System.out.println("Exception class: " + e.getClass().getName());
            System.out.println("Message: " + e.getMessage());
            StackTraceElement top = e.getStackTrace()[0];
            System.out.println("Originating Class: " + top.getClassName());
            System.out.println("Originating Method: " + top.getMethodName());
            System.out.println("Originating Line: " + top.getLineNumber());
        }
    }
}`,
    expected: "Stack Trace Forensic Details:\\nException class: java.lang.ArrayIndexOutOfBoundsException\\nMessage: Index 5 out of bounds for length 2\\nOriginating Class: Main\\nOriginating Method: simulateFailure\\nOriginating Line: 4",
    analogy: "An airplane flight data recorder (black box): after a crash, investigators read the telemetry step-by-step to see exactly which altitude, control, and second caused the incident.",
    mistake: "Ignoring the bottom or top of a stack trace without reading the exact line number.",
    quizQ: "What crucial information does the first element of a stack trace provide?",
    quizOpts: ["The compiler version", "The exact class, method, and source line number where the exception occurred", "The free heap memory", "The user's password"],
    correctIdx: 1
  }
];

m9TopicTemplates.forEach(t => {
  m9Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-9',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 15,
    difficulty: t.order > 7 ? 'Intermediate' : 'Beginner',
    visualizerType: 'none',
    objectives: [`Master ${t.title}.`, 'Handle exceptions gracefully.', 'Prevent production crashes and resource leaks.'],
    prerequisites: ['Module 8: Packages and Generics'],
    analogy: { title: t.title + ' Metaphor', text: t.analogy, metaphor: t.analogy },
    problemSolved: {
      title: 'Fault Tolerance and Resilient Software',
      description: 'Isolates runtime failures and prevents entire server crashes.',
      keyPoints: ['Graceful degradation', 'Automatic resource closing', 'Forensic error auditing']
    },
    intuition: {
      overview: `Internal JVM mechanisms behind ${t.title}.`,
      steps: [
        { step: 1, title: 'Exception Trigger', description: 'Exception object allocated on heap and thrown.' },
        { step: 2, title: 'Stack Unwinding', description: 'JVM searches up call stack frames for a matching catch block.' },
        { step: 3, title: 'Handler Execution', description: 'Catch block intercepts control; finally runs guaranteed.' }
      ]
    },
    codeExample: { title: `Demonstrating ${t.title}`, code: t.code, explanation: `Examine the fault-tolerant structure of ${t.title}.` },
    runnableCode: { code: t.code, expectedOutput: t.expected },
    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'try { ... } catch (...) { ... }', explanation: 'Error boundary handling.' },
      { lines: '7-15', codeSnippet: '// Safe handling logic', explanation: 'Graceful recovery.' }
    ],
    commonMistakes: [{ mistake: t.mistake, solution: 'Follow defensive programming guidelines.', whyWrong: 'Causes silent failures or uncaught crashes.' }],
    bestPractices: ['Never swallow exceptions silently.', 'Always use try-with-resources for I/O streams.'],
    applications: [{ industry: 'Distributed Systems', useCase: 'Handling network timeouts, database connection drops, and API retries.' }],
    practiceQuestions: [{ id: `pq-${t.id}`, question: t.quizQ, answer: t.quizOpts[t.correctIdx], explanation: 'Standard Java exception specification.' }],
    quiz: [{ id: `qz-${t.id}`, question: t.quizQ, options: t.quizOpts, correctIndex: t.correctIdx, explanation: 'Adheres to Java standards.' }],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Beginner',
      description: `Implement ${t.title} to complete the fault-tolerant task.`,
      starterCode: t.code,
      hints: ['Review the lesson example above.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [`Mastered ${t.title}.`, 'Understood try-catch-finally and resource management.', 'Ready for Collections Framework in Module 10.'],
      nextLessonId: t.order === 10 ? 'java-collections-overview' : m9Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'The Java Collections Framework Hierarchy' : m9Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-10' : 'java-module-9'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-9.ts'), 'javaModule9Data', 'javaModule9Lessons', m9Data, m9Lessons);

// ==========================================
// MODULE 10: COLLECTIONS FRAMEWORK
// ==========================================
const m10Data = {
  id: 'java-module-10',
  number: 10,
  title: 'Collections Framework',
  subtitle: 'ArrayList, LinkedList, HashSet, HashMap, Queue, Stack, PriorityQueue & Iterators',
  order: 10,
  icon: 'Database',
  badge: 'Data Structures',
  estimatedHours: 11,
  topicsCount: 10,
  description: 'Master the high-performance data structures powering enterprise Java. Deep dive into ArrayList resizing algorithms, LinkedList node pointers, HashSet uniqueness, HashMap hashing and collision buckets, Queue & Deque operations, PriorityQueue heaps, and fail-fast iterators.',
  lessons: [
    { id: 'java-collections-overview', moduleId: 'java-module-10', title: 'The Java Collections Hierarchy Overview', description: 'Iterable, Collection, List, Set, and Queue interfaces and design patterns.', order: 1, readTimeMinutes: 14, visualizerType: 'collections-visual', difficulty: 'Beginner' },
    { id: 'java-arraylist-deep-dive', moduleId: 'java-module-10', title: 'ArrayList: Dynamic Resizing Internals & Complexity', description: 'Capacity growth (1.5x), internal array copying, and O(1) random access vs O(n) insertions.', order: 2, readTimeMinutes: 16, visualizerType: 'collections-visual', difficulty: 'Beginner' },
    { id: 'java-linkedlist-operations', moduleId: 'java-module-10', title: 'LinkedList: Doubly-Linked Nodes as List & Deque', description: 'Node references, O(1) head/tail insertions, and avoiding sequential traversal bottlenecks.', order: 3, readTimeMinutes: 16, visualizerType: 'collections-visual', difficulty: 'Beginner' },
    { id: 'java-hashset-uniqueness', moduleId: 'java-module-10', title: 'HashSet & LinkedHashSet: Set Uniqueness', description: 'How HashSet delegates to a HashMap backing, ensuring unique elements in O(1) time.', order: 4, readTimeMinutes: 15, visualizerType: 'collections-visual', difficulty: 'Beginner' },
    { id: 'java-treeset-ordering', moduleId: 'java-module-10', title: 'TreeSet: Red-Black Tree Balanced Ordering', description: 'NavigableSet, logarithmic O(log n) operations, and custom Comparators.', order: 5, readTimeMinutes: 16, visualizerType: 'collections-visual', difficulty: 'Intermediate' },
    { id: 'java-hashmap-deep-dive', moduleId: 'java-module-10', title: 'HashMap Deep Dive: Hashing, Buckets & Collisions', description: 'hashCode() computation, index masking, linked list chaining, and treeification at 8 entries.', order: 6, readTimeMinutes: 18, visualizerType: 'collections-visual', difficulty: 'Intermediate' },
    { id: 'java-treemap-linkedhashmap', moduleId: 'java-module-10', title: 'TreeMap & LinkedHashMap: Sorting & Insertion Order', description: 'Predictable iteration order vs sorted keys with logarithmic guarantees.', order: 7, readTimeMinutes: 15, visualizerType: 'collections-visual', difficulty: 'Intermediate' },
    { id: 'java-queue-deque', moduleId: 'java-module-10', title: 'Queue & Deque Interfaces: ArrayDeque in Practice', description: 'FIFO queues, double-ended queues, and why ArrayDeque beats java.util.Stack.', order: 8, readTimeMinutes: 15, visualizerType: 'collections-visual', difficulty: 'Beginner' },
    { id: 'java-priority-queue', moduleId: 'java-module-10', title: 'PriorityQueue: Min-Heaps and Max-Heaps in Java', description: 'Natural ordering, heap array representations, and priority scheduling in O(log n).', order: 9, readTimeMinutes: 16, visualizerType: 'collections-visual', difficulty: 'Intermediate' },
    { id: 'java-iterators-failfast', moduleId: 'java-module-10', title: 'Iterators, ListIterator & ConcurrentModificationException', description: 'Safe collection mutation, the Iterator.remove() contract, and modCount fail-fast checks.', order: 10, readTimeMinutes: 16, visualizerType: 'collections-visual', difficulty: 'Intermediate' }
  ]
};

const m10Lessons = {};
const m10TopicTemplates = [
  {
    id: 'java-collections-overview',
    title: 'The Java Collections Hierarchy Overview',
    subtitle: 'Iterable -> Collection -> (List, Set, Queue) and the Map Hierarchy',
    order: 1,
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "A"));
        Set<String> set = new HashSet<>(list); // Deduplicates automatically!

        System.out.println("List (allows duplicates, ordered): " + list);
        System.out.println("Set (unique items only): " + set);
    }
}`,
    expected: "List (allows duplicates, ordered): [A, B, A]\\nSet (unique items only): [A, B]",
    analogy: "A shopping cart vs a stamp collection album vs a bank queue: each holds items, but with different rules on duplicates, ordering, and retrieval.",
    mistake: "Instantiating interfaces directly (new List() instead of new ArrayList()).",
    quizQ: "Which core collection interface guarantees element uniqueness without duplicates?",
    quizOpts: ["List", "Set", "Queue", "Stack"],
    correctIdx: 1
  },
  {
    id: 'java-arraylist-deep-dive',
    title: 'ArrayList: Dynamic Resizing Internals & Complexity',
    subtitle: 'Backing Object[] Array, Default Capacity 10, and 50% Growth Expansion',
    order: 2,
    code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        // ArrayList automatically resizes its internal array as you add items
        for (int i = 1; i <= 5; i++) numbers.add(i * 10);

        System.out.println("ArrayList items: " + numbers);
        System.out.println("Element at index 2 (O(1)): " + numbers.get(2));
    }
}`,
    expected: "ArrayList items: [10, 20, 30, 40, 50]\\nElement at index 2 (O(1)): 30",
    analogy: "An accordion folder that magically doubles in thickness whenever you slide in one more document than it currently holds.",
    mistake: "Adding elements into the front of a huge ArrayList in a loop (O(n) shift per insertion).",
    quizQ: "What is the time complexity of retrieving an item by index in an ArrayList (e.g. list.get(i))?",
    quizOpts: ["O(n)", "O(1) constant time", "O(log n)", "O(n^2)"],
    correctIdx: 1
  },
  {
    id: 'java-linkedlist-operations',
    title: 'LinkedList: Doubly-Linked Nodes as List & Deque',
    subtitle: 'Node Chains with prev and next Pointers for Rapid Head/Tail Operations',
    order: 3,
    code: `import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        list.addFirst("Head");
        list.addLast("Tail");
        list.add(1, "Middle");

        System.out.println("Doubly-linked chain: " + list);
        System.out.println("Popped first: " + list.removeFirst());
    }
}`,
    expected: "Doubly-linked chain: [Head, Middle, Tail]\\nPopped first: Head",
    analogy: "Children holding hands in a line: inserting a new child in the middle just requires two children to let go of hands and hold the new child's hands, without moving everyone else.",
    mistake: "Using get(index) in a for loop on a LinkedList (results in O(n^2) quadratic performance).",
    quizQ: "What is the time complexity of adding an element to the head of a LinkedList?",
    quizOpts: ["O(n)", "O(1) constant time", "O(log n)", "O(n log n)"],
    correctIdx: 1
  },
  {
    id: 'java-hashset-uniqueness',
    title: 'HashSet & LinkedHashSet: Set Uniqueness',
    subtitle: 'Constant Time O(1) Lookups and Eliminating Duplicates with Hashing',
    order: 4,
    code: `import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<String> emailSet = new HashSet<>();
        emailSet.add("user@domain.com");
        emailSet.add("admin@domain.com");
        boolean addedDuplicate = emailSet.add("user@domain.com"); // Duplicate ignored!

        System.out.println("Added duplicate? " + addedDuplicate);
        System.out.println("Total unique emails: " + emailSet.size());
    }
}`,
    expected: "Added duplicate? false\\nTotal unique emails: 2",
    analogy: "A VIP guest list at an exclusive gala: when you arrive, the bouncer checks off your name; if your name is already checked, you cannot enter a second time.",
    mistake: "Adding mutable objects into a HashSet and then modifying their fields, which corrupts the hash bucket and makes them unretrievable.",
    quizQ: "What data structure backs a java.util.HashSet internally?",
    quizOpts: ["An ArrayList", "A HashMap (using dummy PRESENT values)", "A binary tree", "A linked list"],
    correctIdx: 1
  },
  {
    id: 'java-treeset-ordering',
    title: 'TreeSet: Red-Black Tree Balanced Ordering',
    subtitle: 'Self-Balancing Binary Search Trees and Sorted Natural Traversal in O(log n)',
    order: 5,
    code: `import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> scores = new TreeSet<>();
        scores.add(85);
        scores.add(42);
        scores.add(99);
        scores.add(73);

        System.out.println("Automatically sorted order: " + scores);
        System.out.println("Lowest score: " + scores.first());
        System.out.println("Highest score: " + scores.last());
    }
}`,
    expected: "Automatically sorted order: [42, 73, 85, 99]\\nLowest score: 42\\nHighest score: 99",
    analogy: "A book index sorted alphabetically: every time you add a new term, it is slotted into its exact alphabetical position immediately.",
    mistake: "Adding objects to a TreeSet that do not implement Comparable (throws ClassCastException).",
    quizQ: "What is the time complexity for add, remove, and contains operations in a TreeSet?",
    quizOpts: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctIdx: 1
  },
  {
    id: 'java-hashmap-deep-dive',
    title: 'HashMap Deep Dive: Hashing, Buckets & Collisions',
    subtitle: 'Bucket Array Indexing, Collision Chaining, and Treeification at Threshold 8',
    order: 6,
    code: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Double> prices = new HashMap<>();
        prices.put("Laptop", 1299.99);
        prices.put("Mouse", 29.99);
        prices.put("Keyboard", 79.99);

        System.out.println("Laptop price: $" + prices.get("Laptop"));
        System.out.println("Contains 'Monitor'? " + prices.containsKey("Monitor"));
    }
}`,
    expected: "Laptop price: $1299.99\\nContains 'Monitor'? false",
    analogy: "A huge coat check room with 16 numbered racks: you hand the attendant your ticket (key), they hash the number to instantly pick rack 4, and retrieve your coat (value) in O(1) time.",
    mistake: "Using custom objects as HashMap keys without properly overriding both equals() and hashCode().",
    quizQ: "When does a HashMap bucket chain convert from a linked list into a balanced Red-Black tree in Java 8+?",
    quizOpts: ["When bucket contains 2 elements", "When bucket reaches 8 elements (TREEIFY_THRESHOLD)", "Never, it stays a linked list", "At capacity 64"],
    correctIdx: 1
  },
  {
    id: 'java-treemap-linkedhashmap',
    title: 'TreeMap & LinkedHashMap: Sorting & Insertion Order',
    subtitle: 'Predictable Iteration Order (LinkedHashMap) vs Key Sorting (TreeMap)',
    order: 7,
    code: `import java.util.LinkedHashMap;

public class Main {
    public static void main(String[] args) {
        // LinkedHashMap preserves EXACT insertion order!
        LinkedHashMap<String, Integer> ranks = new LinkedHashMap<>();
        ranks.put("Gold", 1);
        ranks.put("Silver", 2);
        ranks.put("Bronze", 3);

        System.out.println("Insertion order preserved: " + ranks.keySet());
    }
}`,
    expected: "Insertion order preserved: [Gold, Silver, Bronze]",
    analogy: "A receipt tape with numbered items: items appear on the tape in the exact chronological order you scanned them.",
    mistake: "Assuming standard HashMap preserves insertion order (standard HashMap order is non-deterministic).",
    quizQ: "Which Map implementation preserves the exact order in which keys were inserted?",
    quizOpts: ["HashMap", "LinkedHashMap", "TreeMap", "Hashtable"],
    correctIdx: 1
  },
  {
    id: 'java-queue-deque',
    title: 'Queue & Deque Interfaces: ArrayDeque in Practice',
    subtitle: 'FIFO Processing with offer/poll and Why ArrayDeque Replaces Legacy Stack',
    order: 8,
    code: `import java.util.ArrayDeque;

public class Main {
    public static void main(String[] args) {
        ArrayDeque<String> queue = new ArrayDeque<>();
        queue.offer("PrintJob1");
        queue.offer("PrintJob2");
        queue.offer("PrintJob3");

        System.out.println("Processing: " + queue.poll()); // Serves PrintJob1
        System.out.println("Remaining queue: " + queue);
    }
}`,
    expected: "Processing: PrintJob1\\nRemaining queue: [PrintJob2, PrintJob3]",
    analogy: "A ticket line at a movie theater: the first person to arrive is the first person served (FIFO).",
    mistake: "Using legacy java.util.Stack, which inherits synchronization locks and is slower than ArrayDeque.",
    quizQ: "Which class is officially recommended by Oracle to implement Stack and Queue operations in modern Java?",
    quizOpts: ["java.util.Stack", "java.util.Vector", "java.util.ArrayDeque", "java.util.ArrayList"],
    correctIdx: 2
  },
  {
    id: 'java-priority-queue',
    title: 'PriorityQueue: Min-Heaps and Max-Heaps in Java',
    subtitle: 'Always Extracting the Element with Highest Priority in O(log n) Time',
    order: 9,
    code: `import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        // PriorityQueue acts as a Min-Heap by default
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(40);
        pq.offer(10);
        pq.offer(30);

        System.out.println("Extracted minimum: " + pq.poll()); // 10!
        System.out.println("Extracted next: " + pq.poll());    // 30!
    }
}`,
    expected: "Extracted minimum: 10\\nExtracted next: 30",
    analogy: "An emergency room hospital triage: patients aren't treated in the order they arrived, but in the order of medical urgency (highest priority first).",
    mistake: "Iterating directly through a PriorityQueue with a for loop expecting sorted order; only poll() guarantees priority ordering.",
    quizQ: "What underlying data structure is used to implement java.util.PriorityQueue?",
    quizOpts: ["Linked list", "Binary Min-Heap represented in an array", "Hash map", "Graph"],
    correctIdx: 1
  },
  {
    id: 'java-iterators-failfast',
    title: 'Iterators, ListIterator & ConcurrentModificationException',
    subtitle: 'Safe Collection Mutation During Traversal and modCount Integrity',
    order: 10,
    code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry"));
        Iterator<String> it = fruits.iterator();

        while (it.hasNext()) {
            String fruit = it.next();
            if (fruit.equals("Banana")) {
                it.remove(); // Safe removal via iterator contract!
            }
        }
        System.out.println("After safe iterator removal: " + fruits);
    }
}`,
    expected: "After safe iterator removal: [Apple, Cherry]",
    analogy: "Walking on a moving escalator: you cannot dismantle the step you are currently standing on with your hands, but the automated track mechanism (the iterator) can safely cycle it out.",
    mistake: "Calling collection.remove() directly inside a for-each loop, which triggers a ConcurrentModificationException.",
    quizQ: "What exception is thrown if you structurally modify a collection directly during an active for-each loop?",
    quizOpts: ["IllegalStateException", "ConcurrentModificationException", "ArrayIndexOutOfBoundsException", "NoSuchElementException"],
    correctIdx: 1
  }
];

m10TopicTemplates.forEach(t => {
  m10Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-10',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 16,
    difficulty: t.order > 5 ? 'Intermediate' : 'Beginner',
    visualizerType: 'collections-visual',
    objectives: [`Master ${t.title}.`, 'Understand collection internals and Big-O performance.', 'Choose the optimal data structure for any engineering task.'],
    prerequisites: ['Module 9: Exception Handling'],
    analogy: { title: t.title + ' Metaphor', text: t.analogy, metaphor: t.analogy },
    problemSolved: {
      title: 'High-Performance In-Memory Data Storage and Retrieval',
      description: 'Provides standardized, heavily optimized data structures with proven mathematical time complexities.',
      keyPoints: ['Optimal time complexity', 'Type-safe generics', 'Memory efficiency']
    },
    intuition: {
      overview: `Internal JVM mechanisms behind ${t.title}.`,
      steps: [
        { step: 1, title: 'Data Structure Allocation', description: 'Allocates backing arrays or node reference chains.' },
        { step: 2, title: 'Element Operations', description: 'Inserts, removes, or searches in guaranteed Big-O time.' },
        { step: 3, title: 'Memory Rebalancing', description: 'Resizes, rehashes, or rotates tree nodes as needed.' }
      ]
    },
    codeExample: { title: `Demonstrating ${t.title}`, code: t.code, explanation: `Examine the collections usage of ${t.title}.` },
    runnableCode: { code: t.code, expectedOutput: t.expected },
    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'Collection initialization', explanation: 'Creates collection instance.' },
      { lines: '7-15', codeSnippet: '// Operations and queries', explanation: 'Manipulates and queries elements.' }
    ],
    commonMistakes: [{ mistake: t.mistake, solution: 'Follow standard collections patterns.', whyWrong: 'Causes performance degradation or runtime exceptions.' }],
    bestPractices: ['Size collections upfront with initial capacity if known.', 'Use interfaces as variable reference types (List<T> list = new ArrayList<>()).'],
    applications: [{ industry: 'Search Engines & Big Data', useCase: 'In-memory caching, graph traversal queues, and inverted index maps.' }],
    practiceQuestions: [{ id: `pq-${t.id}`, question: t.quizQ, answer: t.quizOpts[t.correctIdx], explanation: 'Standard Java collections specification.' }],
    quiz: [{ id: `qz-${t.id}`, question: t.quizQ, options: t.quizOpts, correctIndex: t.correctIdx, explanation: 'Adheres to Java standards.' }],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Beginner',
      description: `Implement ${t.title} to complete the collections task.`,
      starterCode: t.code,
      hints: ['Review the lesson example above.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [`Mastered ${t.title}.`, 'Understood time complexity tradeoffs and collection internals.', 'Ready for DSA Using Java in Module 11.'],
      nextLessonId: t.order === 10 ? 'java-dsa-big-o' : m10Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'Big-O Time & Space Complexity in Java' : m10Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-11' : 'java-module-10'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-10.ts'), 'javaModule10Data', 'javaModule10Lessons', m10Data, m10Lessons);
console.log('Modules 8, 9, 10 authored successfully!');
