import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const javaModule1Data: JavaModuleData = {
  id: 'java-module-1',
  number: 1,
  title: 'Java Fundamentals',
  subtitle: 'JDK, JRE, JVM, Program Structure, Compilation & Execution',
  description:
    'Start your Java journey from absolute zero. Understand the Write Once, Run Anywhere philosophy, master the relationship between JDK, JRE, and JVM, dissect class structures, compile and execute bytecode, format console output, and handle interactive user input.',
  icon: 'Terminal',
  badge: 'Fundamentals',
  estimatedHours: 8,
  topicsCount: 10,
  lessons: [
    {
      id: 'java-intro-history',
      moduleId: 'java-module-1',
      title: 'Java Introduction & The WORA Philosophy',
      description: 'Discover the origins of Java, platform independence, and the Write Once, Run Anywhere principle.',
      order: 1,
      readTimeMinutes: 12,
      visualizerType: 'jvm-architecture',
      difficulty: 'Beginner',
    },
    {
      id: 'java-jdk-jre-jvm',
      moduleId: 'java-module-1',
      title: 'JDK vs JRE vs JVM Demystified',
      description: 'Break down the developer kit, runtime environment, and virtual machine layers with real-world analogies.',
      order: 2,
      readTimeMinutes: 15,
      visualizerType: 'jvm-architecture',
      difficulty: 'Beginner',
    },
    {
      id: 'java-jvm-architecture',
      moduleId: 'java-module-1',
      title: 'JVM Internal Architecture & Execution Pipeline',
      description: 'Follow the journey of Java bytecode through ClassLoaders, Memory Areas, the Interpreter, and the JIT compiler.',
      order: 3,
      readTimeMinutes: 18,
      visualizerType: 'jvm-architecture',
      difficulty: 'Beginner',
    },
    {
      id: 'java-program-structure',
      moduleId: 'java-module-1',
      title: 'Anatomy of a Java Program: Class, main, and System.out',
      description: 'Deconstruct public class Main, public static void main(String[] args), and System.out.println line by line.',
      order: 4,
      readTimeMinutes: 14,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'java-compilation-execution',
      moduleId: 'java-module-1',
      title: 'Compiling & Running via CLI (javac and java)',
      description: 'Master the command line workflow: creating .java files, compiling into .class bytecode, and executing.',
      order: 5,
      readTimeMinutes: 15,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'java-comments-style',
      moduleId: 'java-module-1',
      title: 'Comments, Whitespace & Clean Java Style Conventions',
      description: 'Learn single-line, multi-line, and Javadoc comments, along with official Oracle Java naming standards.',
      order: 6,
      readTimeMinutes: 12,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'java-console-output',
      moduleId: 'java-module-1',
      title: 'Console Output Formatting: print vs println vs printf',
      description: 'Format numbers, strings, and decimals cleanly using format specifiers (%d, %s, %.2f) and escape codes.',
      order: 7,
      readTimeMinutes: 15,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'java-scanner-input',
      moduleId: 'java-module-1',
      title: 'Reading Interactive User Input with Scanner',
      description: 'Capture console keystrokes, parse integers, doubles, and strings using java.util.Scanner.',
      order: 8,
      readTimeMinutes: 16,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'java-syntax-vs-runtime-errors',
      moduleId: 'java-module-1',
      title: 'Compiler Syntax Errors vs Runtime Exceptions',
      description: 'Differentiate between compilation errors caught by javac and runtime crashes thrown by the JVM.',
      order: 9,
      readTimeMinutes: 14,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
    {
      id: 'java-cli-project',
      moduleId: 'java-module-1',
      title: 'Project: Building a Robust CLI Utility Application',
      description: 'Combine program structure, formatted output, and interactive input into a production-grade CLI utility.',
      order: 10,
      readTimeMinutes: 20,
      visualizerType: 'none',
      difficulty: 'Beginner',
    },
  ],
};

export const javaModule1Lessons: Record<string, JavaLessonContent> = {
  'java-intro-history': {
    id: 'java-intro-history',
    moduleId: 'java-module-1',
    title: 'Java Introduction & The WORA Philosophy',
    subtitle: 'Write Once, Run Anywhere: How Java Revolutionized Software Portability',
    order: 1,
    readTimeMinutes: 12,
    difficulty: 'Beginner',
    visualizerType: 'jvm-architecture',
    objectives: [
      'Understand the historical problem of platform-dependent C/C++ binaries.',
      'Explain the Write Once, Run Anywhere (WORA) philosophy.',
      'Identify how the Java Virtual Machine (JVM) acts as an abstraction layer over hardware.',
      'Recognize Java as an object-oriented, strongly-typed, memory-safe language.',
    ],
    prerequisites: ['No programming background required.'],
    analogy: {
      title: 'The Universal Translator & Audio Cassette',
      text: 'Before Java, compiling code was like manufacturing a physical gear specifically carved for one single engine (Windows x86). If you wanted to run on Mac or Linux, you had to re-carve the entire gear. Java introduced the concept of an audio cassette: you record the music onto tape once (Bytecode), and as long as each car has a compatible cassette player (the JVM), the exact same tape plays identically everywhere.',
      metaphor: 'Java Source = Sheet Music; Bytecode (.class) = Audio Cassette; JVM = Cassette Player tailored to each car model.',
    },
    problemSolved: {
      title: 'Eliminating Costly Cross-Platform Recompilation & Memory Leaks',
      description:
        'In traditional compiled languages, building software for multiple operating systems required separate toolchains, platform-specific system calls, and manual memory freeing that caused catastrophic memory leaks. Java solved this with a standardized intermediate format and automated garbage collection.',
      keyPoints: [
        'Platform Independence: Bytecode runs on any device possessing a JVM.',
        'Automatic Garbage Collection: No manual malloc() or free() pointer bugs.',
        'Strict Type Safety: Errors caught ahead-of-time during compilation.',
      ],
    },
    intuition: {
      overview:
        'Java divides program execution into two distinct stages: Ahead-of-Time Bytecode Translation and Just-in-Time Native Execution.',
      steps: [
        {
          step: 1,
          title: 'Authoring .java files',
          description: 'The engineer writes human-readable Java code conforming to strict language rules.',
        },
        {
          step: 2,
          title: 'Compilation to .class Bytecode',
          description: 'The javac compiler validates types and generates standardized JVM bytecode opcodes.',
        },
        {
          step: 3,
          title: 'Execution by Platform JVM',
          description: 'The JVM installed on Windows, Mac, or Linux translates those opcodes into the native CPU instruction set.',
        },
      ],
    },
    codeExample: {
      title: 'A Minimal, Idiomatic Java Program',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Mastery Lab!");
        System.out.println("Write Once, Run Anywhere (WORA) in action.");
    }
}`,
      explanation: 'Every Java application starts inside a class definition with an entry point named main.',
    },
    runnableCode: {
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Mastery Lab!");
        System.out.println("Write Once, Run Anywhere (WORA) in action.");
    }
}`,
      expectedOutput: `Welcome to Java Mastery Lab!\nWrite Once, Run Anywhere (WORA) in action.`,
    },
    lineByLineExplanation: [
      {
        lines: '1',
        codeSnippet: 'public class Main {',
        explanation: 'Declares an accessible class named Main. In Java, all code must reside inside a class.',
      },
      {
        lines: '2',
        codeSnippet: 'public static void main(String[] args) {',
        explanation: 'The JVM entry point. public allows the runtime to invoke it; static lets it run without creating an object; void means it returns no value.',
      },
      {
        lines: '3-4',
        codeSnippet: 'System.out.println(...);',
        explanation: 'Sends text to the standard console output stream followed by a newline character.',
      },
      {
        lines: '5-6',
        codeSnippet: '}',
        explanation: 'Closes the main method and Main class blocks.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Naming the file differently than the public class name.',
        solution: 'If the class is declared as "public class Main", the file MUST be saved as "Main.java".',
        whyWrong: 'Java enforces a strict 1-to-1 mapping between public top-level classes and file names on disk.',
      },
      {
        mistake: 'Forgetting the semicolon at the end of statements.',
        solution: 'Always end executable statements with a semicolon (;).',
        whyWrong: 'Java uses semicolons as statement terminators, not newlines.',
      },
    ],
    bestPractices: [
      'Use PascalCase for class names (e.g., HelloWorld, FinancialEngine).',
      'Keep one public class per source file.',
      'Always structure your code with 4-space indentation for readability.',
    ],
    applications: [
      { industry: 'Enterprise Banking', useCase: 'High-volume transaction backends at JPMorgan and Visa.' },
      { industry: 'Android Mobile', useCase: 'Millions of native Android mobile applications.' },
      { industry: 'Big Data', useCase: 'Apache Spark, Hadoop, and Kafka infrastructure running on the JVM.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What does WORA stand for, and why is it significant?',
        answer: 'Write Once, Run Anywhere.',
        explanation: 'It means compiled Java bytecode (.class) can execute without modification on any operating system running a compatible JVM.',
      },
      {
        id: 'q2',
        question: 'Does the javac compiler produce machine code for Intel or AMD processors?',
        answer: 'No, javac produces bytecode for the JVM.',
        explanation: 'Bytecode is an intermediate representation. The JVM Execution Engine translates bytecode to native CPU machine code at runtime.',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'Which component is responsible for translating Java Bytecode into native machine instructions at runtime?',
        options: ['The javac compiler', 'The Java Virtual Machine (JVM)', 'The text editor', 'The operating system kernel directly'],
        correctIndex: 1,
        explanation: 'The JVM is the runtime engine that interprets and JIT-compiles bytecode into native machine instructions.',
      },
      {
        id: 'quiz-2',
        question: 'What is the required extension for compiled Java bytecode files?',
        options: ['.java', '.class', '.exe', '.jvm'],
        correctIndex: 1,
        explanation: 'Source code is saved with .java, and the compiler outputs portable .class files containing bytecode.',
      },
    ],
    codingChallenge: {
      id: 'ch-1',
      title: 'Custom Startup Banner Generator',
      difficulty: 'Beginner',
      description: 'Write a Java program that outputs a three-line startup banner showing the software title, version, and copyright notice.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Write your code here to output:
        // System: Java Mastery Lab
        // Version: 1.0.0
        // Status: Operational
    }
}`,
      hints: [
        'Use System.out.println() three times with the exact strings requested.',
        'Double check spelling, punctuation, and capitalization.',
      ],
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("System: Java Mastery Lab");
        System.out.println("Version: 1.0.0");
        System.out.println("Status: Operational");
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'Java source code (.java) compiles to bytecode (.class) using javac.',
        'The JVM abstracts CPU and OS differences, delivering true platform independence.',
        'Every Java statement ends in a semicolon, and all code lives inside classes.',
      ],
      nextLessonId: 'java-jdk-jre-jvm',
      nextLessonTitle: 'JDK vs JRE vs JVM Demystified',
      nextLessonModuleId: 'java-module-1',
    },
  },

  'java-jdk-jre-jvm': {
    id: 'java-jdk-jre-jvm',
    moduleId: 'java-module-1',
    title: 'JDK vs JRE vs JVM Demystified',
    subtitle: 'The Three Pillars of the Java Ecosystem and Their Concentric Hierarchy',
    order: 2,
    readTimeMinutes: 15,
    difficulty: 'Beginner',
    visualizerType: 'jvm-architecture',
    objectives: [
      'Differentiate between JDK (Java Development Kit), JRE (Java Runtime Environment), and JVM (Java Virtual Machine).',
      'Identify which package a software developer needs versus an end-user.',
      'Understand how tools like javac, jdb, and jar fit into the JDK.',
    ],
    prerequisites: ['Basic familiarity with Java introduction.'],
    previousLesson: { id: 'java-intro-history', title: 'Java Introduction & The WORA Philosophy', moduleId: 'java-module-1' },
    analogy: {
      title: 'Kitchen, Recipe Book, and Chef',
      text: 'Think of JVM as the Chef who cooks the meal according to instructions. The JRE is the complete Dining Kitchen equipped with ingredients, plates, and the chef (JVM + Core Libraries). The JDK is the Culinary Academy and Tool Workshop, containing the kitchen plus recipe creation tools, chef knives, measuring scales, and test equipment (javac, jdb, jar).',
      metaphor: 'JDK = Developer Workshop; JRE = Consumer Kitchen; JVM = The Engine/Chef.',
    },
    problemSolved: {
      title: 'Separating Development Overhead from Lean Production Deployments',
      description:
        'End users running a game or business app do not need compiler tools or debuggers. By packaging JVM, JRE, and JDK hierarchically, Java allows lightweight runtime deployments while offering comprehensive SDKs to engineers.',
      keyPoints: [
        'JVM: The core execution engine executing bytecode.',
        'JRE = JVM + Core Standard Libraries (rt.jar / java.base).',
        'JDK = JRE + Development Tools (javac, javadoc, jar, jdb).',
      ],
    },
    intuition: {
      overview: 'Each layer wraps the inner layer to provide targeted functionality.',
      steps: [
        { step: 1, title: 'JVM at the Center', description: 'Understands bytecode instructions and manages runtime memory.' },
        { step: 2, title: 'JRE Wraps the JVM', description: 'Provides essential classes like java.lang.String, java.util.List, and I/O streams.' },
        { step: 3, title: 'JDK Wraps the JRE', description: 'Adds developer command-line tools to compile, package, and test.' },
      ],
    },
    codeExample: {
      title: 'Querying Runtime System Information',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java Runtime Version: " + System.getProperty("java.version"));
        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));
        System.out.println("JVM Architecture: " + System.getProperty("os.arch"));
    }
}`,
      explanation: 'System.getProperty inspects properties supplied by the active JVM and JRE environment.',
    },
    runnableCode: {
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java Runtime Version: " + System.getProperty("java.version"));
        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));
        System.out.println("JVM Architecture: " + System.getProperty("os.arch"));
    }
}`,
      expectedOutput: `Java Runtime Version: 15.0.2\nJava Vendor: Oracle Corporation\nJVM Architecture: amd64`,
    },
    lineByLineExplanation: [
      {
        lines: '1-2',
        codeSnippet: 'public class Main { public static void main(String[] args) {',
        explanation: 'Standard application declaration and entry point.',
      },
      {
        lines: '3-5',
        codeSnippet: 'System.getProperty(...)',
        explanation: 'Calls the java.lang.System class from the JRE standard library to retrieve JVM runtime metadata.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Installing only the JRE when attempting to compile code.',
        solution: 'Always install the JDK if you intend to write and compile Java software.',
        whyWrong: 'JRE does not include the javac compiler executable.',
      },
    ],
    bestPractices: [
      'Target Long-Term Support (LTS) JDK releases (JDK 17 or JDK 21) for production systems.',
      'Use modern OpenJDK distributions like Eclipse Temurin, Amazon Corretto, or Azul Zulu.',
    ],
    applications: [
      { industry: 'Cloud Infrastructure', useCase: 'Minimal JRE docker containers minimizing cloud memory footprint.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'Which tool inside the JDK compiles source code into bytecode?',
        answer: 'javac',
        explanation: 'javac is the Java Compiler binary bundled inside the JDK bin directory.',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'Which of the following is the correct concentric relationship?',
        options: ['JDK contains JRE, which contains JVM', 'JVM contains JRE, which contains JDK', 'JRE contains JDK, which contains JVM', 'They are independent, identical packages'],
        correctIndex: 0,
        explanation: 'JDK is the outermost development suite, enclosing the JRE runtime and JVM engine.',
      },
    ],
    codingChallenge: {
      id: 'ch-2',
      title: 'Display JVM Memory Statistics',
      difficulty: 'Beginner',
      description: 'Write a program that queries the Runtime class to print total memory available to the JVM in megabytes.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Hint: Runtime.getRuntime().totalMemory() / (1024 * 1024)
    }
}`,
      hints: ['Call Runtime.getRuntime() to access the runtime object.', 'Divide by (1024 * 1024) to convert bytes to megabytes.'],
      solutionCode: `public class Main {
    public static void main(String[] args) {
        long totalMemoryMB = Runtime.getRuntime().totalMemory() / (1024 * 1024);
        System.out.println("JVM Total Memory: " + totalMemoryMB + " MB");
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'JVM executes bytecode and manages memory.',
        'JRE provides the JVM and standard class libraries for running apps.',
        'JDK is the full toolkit required for developers to compile, build, and debug.',
      ],
      nextLessonId: 'java-jvm-architecture',
      nextLessonTitle: 'JVM Internal Architecture & Execution Pipeline',
      nextLessonModuleId: 'java-module-1',
    },
  },

  'java-jvm-architecture': {
    id: 'java-jvm-architecture',
    moduleId: 'java-module-1',
    title: 'JVM Internal Architecture & Execution Pipeline',
    subtitle: 'From ClassLoader Subsystem to JIT Compilation and Hardware Execution',
    order: 3,
    readTimeMinutes: 18,
    difficulty: 'Beginner',
    visualizerType: 'jvm-architecture',
    objectives: [
      'Trace the 3 primary JVM subsystems: ClassLoader, Runtime Data Areas, and Execution Engine.',
      'Explain the difference between the Bytecode Interpreter and Just-In-Time (JIT) Compiler.',
      'Understand the 5 JVM memory areas: Heap, Stack, Method Area, PC Registers, and Native Stack.',
    ],
    prerequisites: ['Understanding of JDK vs JRE vs JVM.'],
    previousLesson: { id: 'java-jdk-jre-jvm', title: 'JDK vs JRE vs JVM Demystified', moduleId: 'java-module-1' },
    analogy: {
      title: 'The Modern Power Plant & Turbine',
      text: 'The ClassLoader is the fuel intake conveyor, bringing raw fuel rods (.class files) into the plant. The Memory Areas are the organized storage reservoirs (Heap for water, Stack for operator controls). The Execution Engine contains an immediate small boiler (Interpreter) for immediate startup, and a high-efficiency nuclear turbine (JIT compiler) that kicks in when high throughput is demanded.',
      metaphor: 'ClassLoader = Fuel intake; Memory areas = Reservoirs; Interpreter = Quick furnace; JIT = High-speed turbine.',
    },
    problemSolved: {
      title: 'Combining Fast Startup with Peak C/C++ Native Execution Speeds',
      description:
        'Pure interpreters are notoriously slow, while pure ahead-of-time compilers take a long time to build and lack runtime optimization data. The JVM Execution Engine combines both: it interprets bytecode instantly, monitors hotspots, and dynamically compiles heavy loops into ultra-fast machine code.',
      keyPoints: [
        'Tiered Compilation: C1 compiler for fast warmup, C2 compiler for heavy optimization.',
        'Garbage Collection: Non-blocking automatic memory deallocation.',
        'Bytecode Verification: Prevents memory corruption before code ever touches CPU registers.',
      ],
    },
    intuition: {
      overview: 'How Java achieves high speed without compromising cross-platform safety.',
      steps: [
        { step: 1, title: 'Loading & Linking', description: 'ClassLoader verifies byte integrity and loads classes on demand.' },
        { step: 2, title: 'Runtime Memory Allocation', description: 'Stack frames created for method calls; objects stored on the Heap.' },
        { step: 3, title: 'Execution & HotSpot JIT', description: 'Frequently called methods are identified and converted to assembly.' },
      ],
    },
    codeExample: {
      title: 'Observing JIT Loop Optimization Performance',
      code: `public class Main {
    public static void main(String[] args) {
        long start = System.nanoTime();
        long sum = 0;
        for (int i = 0; i < 1_000_000; i++) {
            sum += i;
        }
        long duration = System.nanoTime() - start;
        System.out.println("Computed sum: " + sum);
        System.out.println("Execution time: " + (duration / 1_000_000.0) + " ms");
    }
}`,
      explanation: 'HotSpot detects the 1-million iteration loop, optimizes it, and executes in mere fractions of a millisecond.',
    },
    runnableCode: {
      code: `public class Main {
    public static void main(String[] args) {
        long start = System.nanoTime();
        long sum = 0;
        for (int i = 0; i < 1_000_000; i++) {
            sum += i;
        }
        long duration = System.nanoTime() - start;
        System.out.println("Computed sum: " + sum);
        System.out.println("Execution completed successfully.");
    }
}`,
      expectedOutput: `Computed sum: 499999500000\nExecution completed successfully.`,
    },
    lineByLineExplanation: [
      { lines: '3', codeSnippet: 'long start = System.nanoTime();', explanation: 'Captures high-resolution timestamp before execution.' },
      { lines: '5-7', codeSnippet: 'for (int i = 0; i < 1_000_000; i++)', explanation: 'A tight counting loop that qualifies as a hot code path for JIT compilation.' },
      { lines: '9-10', codeSnippet: 'System.out.println(...)', explanation: 'Outputs the aggregated result to standard output.' },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming Java is purely an interpreted language.',
        solution: 'Remember Java is both compiled (to bytecode) and JIT-compiled (to native machine code).',
        whyWrong: 'The modern JVM produces assembly code that rivals compiled C++ in throughput.',
      },
    ],
    bestPractices: [
      'Write clean, readable code; let the JIT compiler handle micro-optimizations like loop unrolling and inlining.',
    ],
    applications: [
      { industry: 'High-Frequency Trading', useCase: 'Low-latency trading desks tuned with zero-allocation JVM parameters.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is the role of the JIT compiler inside the JVM Execution Engine?',
        answer: 'To compile hot bytecode into native CPU machine instructions at runtime.',
        explanation: 'JIT eliminates interpretation overhead for frequently executed methods.',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'Where do instantiated Java objects (created via new) reside in memory?',
        options: ['JVM Stack', 'Heap Memory', 'Program Counter Register', 'Native Method Stack'],
        correctIndex: 1,
        explanation: 'All objects in Java are dynamically allocated on the Heap and managed by Garbage Collection.',
      },
    ],
    codingChallenge: {
      id: 'ch-3',
      title: 'Warmup vs Hot Execution Benchmark',
      difficulty: 'Beginner',
      description: 'Write a program with a helper method computeSquare(int n) that computes and prints the square of 100.',
      starterCode: `public class Main {
    public static int computeSquare(int n) {
        // Return n squared
        return 0;
    }

    public static void main(String[] args) {
        System.out.println("Square of 100: " + computeSquare(100));
    }
}`,
      hints: ['Return n * n from the computeSquare method.'],
      solutionCode: `public class Main {
    public static int computeSquare(int n) {
        return n * n;
    }

    public static void main(String[] args) {
        System.out.println("Square of 100: " + computeSquare(100));
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'The JVM consists of ClassLoaders, Memory Areas, and an Execution Engine.',
        'The Execution Engine utilizes both an Interpreter for instant boot and JIT for native speed.',
        'Memory is segmented into Heap (objects) and Stack (frames & primitives).',
      ],
      nextLessonId: 'java-program-structure',
      nextLessonTitle: 'Anatomy of a Java Program: Class, main, and System.out',
      nextLessonModuleId: 'java-module-1',
    },
  },

  'java-program-structure': {
    id: 'java-program-structure',
    moduleId: 'java-module-1',
    title: 'Anatomy of a Java Program: Class, main, and System.out',
    subtitle: 'Deconstructing Keywords: public, class, static, void, String[] args, and System.out',
    order: 4,
    readTimeMinutes: 14,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Understand why Java requires every function to be inside a class.',
      'Explain every single keyword in public static void main(String[] args).',
      'Learn how System.out interacts with operating system standard output.',
    ],
    prerequisites: ['Basic familiarity with Java introduction.'],
    previousLesson: { id: 'java-jvm-architecture', title: 'JVM Internal Architecture & Execution Pipeline', moduleId: 'java-module-1' },
    analogy: {
      title: 'The Secure Government Building and Official Entry Gate',
      text: 'A Java class is like a secure building. Nothing can sit outside in the rain; everything must be inside a named room. The main method is the official front security gate with a sign saying: "Enter here, bring your ID luggage (String[] args), and do not expect a gift upon departure (void)".',
      metaphor: 'Class = Building; main method = Front Gate; String[] args = Visitor Briefcase.',
    },
    problemSolved: {
      title: 'Eliminating Ambiguous Application Entry Points and Global Variable Sprawl',
      description:
        'In C or Python, code can be written loose at file-level, leading to unpredictable initialization order and spaghetti globals. Java enforces strict encapsulation: every statement belongs to a method, and every method belongs to a class.',
      keyPoints: [
        'Deterministic entry: The JVM always targets public static void main.',
        'No rogue global variables: All state belongs to classes or objects.',
        'Consistent command-line argument passing via String[] args.',
      ],
    },
    intuition: {
      overview: 'Each keyword serves a non-negotiable architectural requirement for the JVM launcher.',
      steps: [
        { step: 1, title: 'public', description: 'Allows the JVM runtime environment outside the class package to invoke main.' },
        { step: 2, title: 'static', description: 'Enables the JVM to call the method without instantiating an object first.' },
        { step: 3, title: 'void', description: 'Specifies that the main method does not return a value when terminating.' },
      ],
    },
    codeExample: {
      title: 'Dissecting Program Structure and Command-Line Arguments',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Program name: Main");
        System.out.println("Arguments received: " + args.length);
        System.out.println("Status: Java program structure verified.");
    }
}`,
      explanation: 'args is an array of strings passed when running the program from the shell.',
    },
    runnableCode: {
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Program name: Main");
        System.out.println("Arguments received: " + args.length);
        System.out.println("Status: Java program structure verified.");
    }
}`,
      expectedOutput: `Program name: Main\nArguments received: 0\nStatus: Java program structure verified.`,
    },
    lineByLineExplanation: [
      { lines: '1', codeSnippet: 'public class Main {', explanation: 'Class definition. Must match file name Main.java.' },
      { lines: '2', codeSnippet: 'public static void main(String[] args) {', explanation: 'Exact signature recognized by the JVM launcher.' },
      { lines: '3-5', codeSnippet: 'System.out.println(...)', explanation: 'Standard printing statements.' },
    ],
    commonMistakes: [
      {
        mistake: 'Declaring main without static (public void main(String[] args)).',
        solution: 'Always declare main with the static keyword.',
        whyWrong: 'Without static, the JVM would have to guess how to construct an instance of the class before running.',
      },
      {
        mistake: 'Using lowercase String or system.',
        solution: 'Remember Java is case-sensitive: String and System must start with a capital S.',
        whyWrong: 'In Java, standard library classes begin with an uppercase letter.',
      },
    ],
    bestPractices: [
      'Name your primary driver class clearly (e.g., Application, Launcher, or Main).',
      'Keep your main method concise: parse arguments and delegate to helper classes.',
    ],
    applications: [
      { industry: 'Serverless Functions', useCase: 'AWS Lambda Java handlers implementing standard method entry points.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What happens if you omit the static keyword from the main method?',
        answer: 'The code compiles, but the JVM throws a NoSuchMethodError at runtime.',
        explanation: 'The JVM launcher explicitly looks for a static method signature.',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'Why does the main method have a return type of void?',
        options: ['Because Java cannot return integers', 'Because the method terminates by returning control to the JVM, not another Java method', 'Because void is faster than int', 'Because static methods cannot return values'],
        correctIndex: 1,
        explanation: 'When main finishes, control returns directly to the JVM runtime launcher.',
      },
    ],
    codingChallenge: {
      id: 'ch-4',
      title: 'Formatted Welcome Card',
      difficulty: 'Beginner',
      description: 'Write a program that prints a formatted 3-line card bordered with asterisks.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Output:
        // **********************
        // *  Java Mastery Lab  *
        // **********************
    }
}`,
      hints: ['Use three separate System.out.println() calls.'],
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("**********************");
        System.out.println("*  Java Mastery Lab  *");
        System.out.println("**********************");
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'All code in Java resides inside classes.',
        'public static void main(String[] args) is the universal application entry point.',
        'Java is strictly case-sensitive.',
      ],
      nextLessonId: 'java-compilation-execution',
      nextLessonTitle: 'Compiling & Running via CLI (javac and java)',
      nextLessonModuleId: 'java-module-1',
    },
  },

  'java-compilation-execution': {
    id: 'java-compilation-execution',
    moduleId: 'java-module-1',
    title: 'Compiling & Running via CLI (javac and java)',
    subtitle: 'Mastering the Terminal Workflow: Source Code, Compiler Flags, Classpaths, and Execution',
    order: 5,
    readTimeMinutes: 15,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Execute the complete compile-and-run cycle via the command line.',
      'Understand the role of the javac compiler versus the java launcher.',
      'Learn how the classpath (-cp or -classpath) directs the JVM to classes.',
    ],
    prerequisites: ['Anatomy of a Java program.'],
    previousLesson: { id: 'java-program-structure', title: 'Anatomy of a Java Program: Class, main, and System.out', moduleId: 'java-module-1' },
    analogy: {
      title: 'Baking the Bread vs Eating the Bread',
      text: 'Running javac is like mixing dough and baking raw wheat into a loaf of bread (turning source code into bytecode). Running java is taking that baked loaf and slicing/eating it (the JVM executing the bytecode). You cannot eat raw wheat directly, and you do not need the oven once the bread is baked.',
      metaphor: 'javac = The Oven baking .java into .class; java = Slicing and serving the baked .class.',
    },
    problemSolved: {
      title: 'Understanding What IDEs (IntelliJ, Eclipse, VS Code) Hide Under the Hood',
      description:
        'Modern IDEs compile automatically on save with a single click, blinding developers to how compilation works. Understanding terminal compilation empowers you to configure Docker images, CI/CD pipelines, and cloud buildpacks.',
      keyPoints: [
        'javac App.java produces App.class in the same directory.',
        'java App launches the JVM without appending .class.',
        'Classpath flag (-cp) specifies external libraries and package roots.',
      ],
    },
    intuition: {
      overview: 'The two-step build and execution protocol.',
      steps: [
        { step: 1, title: 'Step 1: javac Hello.java', description: 'Checks syntax, verifies types, and outputs Hello.class.' },
        { step: 2, title: 'Step 2: java Hello', description: 'Starts the JVM, loads Hello.class, and invokes its main method.' },
      ],
    },
    codeExample: {
      title: 'A Self-Reporting Execution Script',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Step 1: Code compiled with 'javac Main.java'");
        System.out.println("Step 2: Bytecode executed with 'java Main'");
        System.out.println("Success: Command-line lifecycle complete.");
    }
}`,
      explanation: 'Demonstrates the standard output of a program built from terminal commands.',
    },
    runnableCode: {
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Step 1: Code compiled with 'javac Main.java'");
        System.out.println("Step 2: Bytecode executed with 'java Main'");
        System.out.println("Success: Command-line lifecycle complete.");
    }
}`,
      expectedOutput: `Step 1: Code compiled with 'javac Main.java'\nStep 2: Bytecode executed with 'java Main'\nSuccess: Command-line lifecycle complete.`,
    },
    lineByLineExplanation: [
      { lines: '1-6', codeSnippet: 'System.out.println(...)', explanation: 'Outputs each stage of the compilation lifecycle.' },
    ],
    commonMistakes: [
      {
        mistake: 'Running "java Main.class" instead of "java Main".',
        solution: 'When running with java, supply the class name (Main), NOT the file name (Main.class).',
        whyWrong: 'The java launcher expects a fully qualified class name, not a file path.',
      },
    ],
    bestPractices: [
      'Separate source files and output classes using the -d flag: javac -d bin src/Main.java.',
    ],
    applications: [
      { industry: 'DevOps & CI/CD', useCase: 'GitHub Actions and Jenkins build pipelines running headless javac.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'Why does "java Main.class" result in a ClassNotFoundException?',
        answer: 'Because the JVM interprets "Main.class" as a class named "class" inside package "Main".',
        explanation: 'Always invoke the launcher with just the class name: "java Main".',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'What is the correct terminal command to run a compiled class named Application?',
        options: ['javac Application', 'java Application.class', 'java Application', 'run Application'],
        correctIndex: 2,
        explanation: 'The java command takes the class name without the .class extension.',
      },
    ],
    codingChallenge: {
      id: 'ch-5',
      title: 'Build Info Output',
      difficulty: 'Beginner',
      description: 'Write a program that prints "Compiler: javac" on line 1, and "Runtime: JVM" on line 2.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`,
      hints: ['Use two println statements.'],
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Compiler: javac");
        System.out.println("Runtime: JVM");
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'javac transforms human Java files into portable bytecode.',
        'java invokes the JVM and executes the specified class.',
        'Never append .class when executing with the java command.',
      ],
      nextLessonId: 'java-comments-style',
      nextLessonTitle: 'Comments, Whitespace & Clean Java Style Conventions',
      nextLessonModuleId: 'java-module-1',
    },
  },

  'java-comments-style': {
    id: 'java-comments-style',
    moduleId: 'java-module-1',
    title: 'Comments, Whitespace & Clean Java Style Conventions',
    subtitle: 'Writing Maintainable Code: Single-Line, Multi-Line, Javadoc, and Naming Standards',
    order: 6,
    readTimeMinutes: 12,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Master the three types of Java comments: //, /* */, and /** */.',
      'Generate documentation using Javadoc tags (@param, @return, @author).',
      'Adopt official Java naming conventions (camelCase, PascalCase, UPPER_SNAKE_CASE).',
    ],
    prerequisites: ['Basic Java program structure.'],
    previousLesson: { id: 'java-compilation-execution', title: 'Compiling & Running via CLI (javac and java)', moduleId: 'java-module-1' },
    analogy: {
      title: 'Architectural Blueprints and Sticky Notes',
      text: 'Writing code without comments is like constructing a skyscraper without schematics. Single-line comments (//) are quick pencil notes on a beam. Javadoc comments (/** */) are the official municipal building code documents that generate searchable website documentation for other engineers.',
      metaphor: 'Code = The building; // = Margin notes; /** */ = Official published blueprints.',
    },
    problemSolved: {
      title: 'Preventing Code Decay and Onboarding Headaches in Large Teams',
      description:
        'Software is read 10 times more often than it is written. Clean conventions and Javadoc ensure that teams can collaborate and auto-generate web documentation using the javadoc utility.',
      keyPoints: [
        'Single-line: // for quick explanations.',
        'Multi-line: /* ... */ for temporary blocks.',
        'Javadoc: /** ... */ for generating API documentation.',
      ],
    },
    intuition: {
      overview: 'Standardizing naming rules across the entire global Java community.',
      steps: [
        { step: 1, title: 'Classes and Interfaces', description: 'PascalCase: BankAccount, OrderProcessor.' },
        { step: 2, title: 'Methods and Variables', description: 'camelCase: calculateInterest(), accountBalance.' },
        { step: 3, title: 'Constants', description: 'UPPER_SNAKE_CASE: MAX_RETRY_COUNT, PI.' },
      ],
    },
    codeExample: {
      title: 'Clean Style with Full Javadoc Documentation',
      code: `/**
 * Demonstrates clean Java naming conventions and documentation.
 * @author Java Mastery Lab
 * @version 1.0
 */
public class Main {
    // Constant following UPPER_SNAKE_CASE convention
    public static final int MAX_USERS = 100;

    /**
     * Entry point of the application.
     * @param args Command-line arguments
     */
    public static void main(String[] args) {
        // Declare a variable in camelCase
        int activeUsers = 42;

        System.out.println("Active Users: " + activeUsers);
        System.out.println("Capacity Limit: " + MAX_USERS);
    }
}`,
      explanation: 'Clear documentation combined with standard naming makes code self-documenting.',
    },
    runnableCode: {
      code: `public class Main {
    public static final int MAX_USERS = 100;

    public static void main(String[] args) {
        int activeUsers = 42;
        System.out.println("Active Users: " + activeUsers);
        System.out.println("Capacity Limit: " + MAX_USERS);
    }
}`,
      expectedOutput: `Active Users: 42\nCapacity Limit: 100`,
    },
    lineByLineExplanation: [
      { lines: '1-5', codeSnippet: '/** ... */', explanation: 'Javadoc comment block documenting the class.' },
      { lines: '7', codeSnippet: 'public static final int MAX_USERS = 100;', explanation: 'Constant declared in all caps with underscores.' },
      { lines: '14', codeSnippet: 'int activeUsers = 42;', explanation: 'Local variable named in camelCase.' },
    ],
    commonMistakes: [
      {
        mistake: 'Using snake_case for Java variables (e.g., active_users).',
        solution: 'Use camelCase for variables and methods in Java (activeUsers).',
        whyWrong: 'snake_case is common in Python/C, but violates Java style conventions.',
      },
    ],
    bestPractices: [
      'Document the "why", not the obvious "what".',
      'Keep lines under 120 characters wide.',
    ],
    applications: [
      { industry: 'Open Source Software', useCase: 'Spring Framework and Google Guava published Javadocs.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is the syntax for starting a Javadoc comment?',
        answer: '/**',
        explanation: 'Javadoc starts with /** and ends with */, whereas regular block comments start with /*.',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'Which of the following follows the official Java naming convention for a constant?',
        options: ['maxItems', 'MaxItems', 'MAX_ITEMS', 'max_items'],
        correctIndex: 2,
        explanation: 'Java constants declared with static final use UPPER_SNAKE_CASE.',
      },
    ],
    codingChallenge: {
      id: 'ch-6',
      title: 'Clean Style Refactor',
      difficulty: 'Beginner',
      description: 'Declare a constant named APP_NAME = "JavaLab" and a variable userCount = 25, then print them.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Declare constant and variable properly
    }
}`,
      hints: ['Use final String APP_NAME = "JavaLab";', 'Use int userCount = 25;'],
      solutionCode: `public class Main {
    public static final String APP_NAME = "JavaLab";

    public static void main(String[] args) {
        int userCount = 25;
        System.out.println(APP_NAME + " - Users: " + userCount);
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'Use // for inline notes and /** */ for API documentation.',
        'Follow PascalCase for classes, camelCase for methods/variables, and UPPER_SNAKE_CASE for constants.',
      ],
      nextLessonId: 'java-console-output',
      nextLessonTitle: 'Console Output Formatting: print vs println vs printf',
      nextLessonModuleId: 'java-module-1',
    },
  },

  'java-console-output': {
    id: 'java-console-output',
    moduleId: 'java-module-1',
    title: 'Console Output Formatting: print vs println vs printf',
    subtitle: 'Precise Text Alignment, Floating-Point Precision, and Format Specifiers',
    order: 7,
    readTimeMinutes: 15,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Differentiate between print(), println(), and printf().',
      'Use format specifiers (%d, %s, %f, %c, %n).',
      'Control floating-point decimal precision (e.g., %.2f).',
      'Align tabular text columns using field width flags (e.g., %-15s).',
    ],
    prerequisites: ['Basic program structure.'],
    previousLesson: { id: 'java-comments-style', title: 'Comments, Whitespace & Clean Java Style Conventions', moduleId: 'java-module-1' },
    analogy: {
      title: 'The Typewriter vs The Grid Printing Press',
      text: 'print() is a typewriter typing characters continuously without moving to the next line. println() types the text and automatically hits the Carriage Return lever. printf() is a high-precision printing press with pre-carved slots where you drop in numbers, currency decimals, and dates into exact column widths.',
      metaphor: 'print = continuous typing; println = typing + Enter; printf = templated grid formatting.',
    },
    problemSolved: {
      title: 'Eliminating Clunky String Concatenation for Numbers and Reports',
      description:
        'Chaining strings with "+ + +" to format financial reports or aligned tables is unreadable and slow. System.out.printf allows templated, professional formatting in a single statement.',
      keyPoints: [
        'print(): Does not append a newline.',
        'println(): Appends a platform-specific newline.',
        'printf(): Supports C-style formatting templates (%s, %d, %.2f).',
      ],
    },
    intuition: {
      overview: 'Common format specifiers in Java.',
      steps: [
        { step: 1, title: '%s', description: 'String values.' },
        { step: 2, title: '%d', description: 'Decimal integers (byte, short, int, long).' },
        { step: 3, title: '%.2f', description: 'Floating-point number rounded to 2 decimal places.' },
      ],
    },
    codeExample: {
      title: 'Building a Formatted Receipt Table with printf',
      code: `public class Main {
    public static void main(String[] args) {
        String item1 = "Java Book";
        double price1 = 39.95;
        int qty1 = 2;

        String item2 = "Coffee Mug";
        double price2 = 12.50;
        int qty2 = 1;

        // Header
        System.out.printf("%-15s %-6s %-10s%n", "Item", "Qty", "Price");
        System.out.println("----------------------------------");

        // Formatted rows
        System.out.printf("%-15s %-6d $%-9.2f%n", item1, qty1, price1);
        System.out.printf("%-15s %-6d $%-9.2f%n", item2, qty2, price2);
    }
}`,
      explanation: '%-15s left-aligns a string within a 15-character column. %n creates a portable newline.',
    },
    runnableCode: {
      code: `public class Main {
    public static void main(String[] args) {
        String item1 = "Java Book";
        double price1 = 39.95;
        int qty1 = 2;

        String item2 = "Coffee Mug";
        double price2 = 12.50;
        int qty2 = 1;

        System.out.printf("%-15s %-6s %-10s%n", "Item", "Qty", "Price");
        System.out.println("----------------------------------");
        System.out.printf("%-15s %-6d $%-9.2f%n", item1, qty1, price1);
        System.out.printf("%-15s %-6d $%-9.2f%n", item2, qty2, price2);
    }
}`,
      expectedOutput: `Item            Qty    Price     \n----------------------------------\nJava Book       2      $39.95    \nCoffee Mug      1      $12.50    `,
    },
    lineByLineExplanation: [
      { lines: '11', codeSnippet: 'System.out.printf("%-15s %-6s %-10s%n", ...)', explanation: 'Creates 3 left-aligned header columns.' },
      { lines: '15-16', codeSnippet: '$%-9.2f', explanation: 'Formats the floating-point price with exactly two decimals.' },
    ],
    commonMistakes: [
      {
        mistake: 'Using %d for a floating-point double number.',
        solution: 'Use %f for float/double and %d for integers.',
        whyWrong: 'Passing a double to %d throws an IllegalFormatConversionException.',
      },
    ],
    bestPractices: [
      'Use %n instead of \\n inside printf for cross-platform newline safety.',
    ],
    applications: [
      { industry: 'Financial Reporting', useCase: 'Aligning ledger tables and currency figures.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'How do you format a double to display exactly 3 decimal places using printf?',
        answer: '%.3f',
        explanation: 'The .3 indicates precision count after the decimal point.',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'Which method prints text without moving the cursor to a new line?',
        options: ['System.out.println()', 'System.out.print()', 'System.out.writeLine()', 'System.out.newline()'],
        correctIndex: 1,
        explanation: 'System.out.print() outputs characters and keeps the cursor on the same line.',
      },
    ],
    codingChallenge: {
      id: 'ch-7',
      title: 'Formatted Percentage Output',
      difficulty: 'Beginner',
      description: 'Print a test score percentage 87.6543 formatted as exactly two decimal places with a percent sign (e.g. "Score: 87.65%").',
      starterCode: `public class Main {
    public static void main(String[] args) {
        double score = 87.6543;
        // Format with printf: Score: 87.65%
    }
}`,
      hints: ['Use %% to print a literal percent symbol in printf.'],
      solutionCode: `public class Main {
    public static void main(String[] args) {
        double score = 87.6543;
        System.out.printf("Score: %.2f%%%n", score);
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'print() writes continuously; println() appends a newline.',
        'printf() provides templated string formatting (%s, %d, %.2f).',
        'Use %n for portable cross-platform newlines.',
      ],
      nextLessonId: 'java-scanner-input',
      nextLessonTitle: 'Reading Interactive User Input with Scanner',
      nextLessonModuleId: 'java-module-1',
    },
  },

  'java-scanner-input': {
    id: 'java-scanner-input',
    moduleId: 'java-module-1',
    title: 'Reading Interactive User Input with Scanner',
    subtitle: 'Capturing Console Keystrokes, Parsing Tokens, and Handling the Newline Pitfall',
    order: 8,
    readTimeMinutes: 16,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Import and initialize java.util.Scanner with System.in.',
      'Read integers (nextInt), doubles (nextDouble), and strings (next, nextLine).',
      'Solve the infamous nextInt() newline consumption pitfall.',
      'Close resource streams cleanly.',
    ],
    prerequisites: ['Basic Java program structure.'],
    previousLesson: { id: 'java-console-output', title: 'Console Output Formatting: print vs println vs printf', moduleId: 'java-module-1' },
    analogy: {
      title: 'The Token Conveyor Belt',
      text: 'Imagine user keystrokes placed onto a conveyor belt. When you call nextInt(), Scanner inspects the belt, picks off the integer digits, and leaves any trailing Enter key (newline \\n) sitting right on the belt! If you immediately call nextLine(), it reads that leftover newline and returns empty text. You must eat that newline to clear the belt.',
      metaphor: 'Scanner = Conveyor belt token sorter; nextInt() = Grabs number only; nextLine() = Grabs everything up to Enter.',
    },
    problemSolved: {
      title: 'Transforming Static Scripts into Dynamic Interactive Applications',
      description:
        'Programs that only print hardcoded data are static. Reading from System.in allows CLI utilities, prompts, menus, and automated test runners to accept dynamic external parameters.',
      keyPoints: [
        'Scanner parses text into primitive types directly.',
        'scanner.nextLine() reads an entire line including spaces.',
        'scanner.nextInt() leaves the newline token in the buffer.',
      ],
    },
    intuition: {
      overview: 'How Scanner consumes tokens from the standard input buffer.',
      steps: [
        { step: 1, title: 'Import java.util.Scanner', description: 'Scanner resides in the util package, requiring an explicit import.' },
        { step: 2, title: 'Instantiate Scanner', description: 'Scanner sc = new Scanner(System.in); binds to terminal input.' },
        { step: 3, title: 'Consume & Parse', description: 'Call nextLine(), nextInt(), or nextDouble() to parse user responses.' },
      ],
    },
    codeExample: {
      title: 'Interactive User Profile Form with Buffer Flushing',
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Simulated input or user console input
        String mockInput = "Alex\\n24\\nSoftware Engineer\\n";
        Scanner scanner = new Scanner(mockInput);

        System.out.println("Reading user profile...");
        String name = scanner.nextLine();
        int age = scanner.nextInt();
        scanner.nextLine(); // Flush newline buffer!
        String occupation = scanner.nextLine();

        System.out.println("--- Profile Created ---");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Role: " + occupation);
        scanner.close();
    }
}`,
      explanation: 'Notice the extra scanner.nextLine() called right after nextInt() to flush the leftover newline character.',
    },
    runnableCode: {
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String mockInput = "Alex\\n24\\nSoftware Engineer\\n";
        Scanner scanner = new Scanner(mockInput);

        String name = scanner.nextLine();
        int age = scanner.nextInt();
        scanner.nextLine(); // Flush newline
        String occupation = scanner.nextLine();

        System.out.println("Profile: " + name + ", " + age + " years old, " + occupation);
        scanner.close();
    }
}`,
      expectedOutput: `Profile: Alex, 24 years old, Software Engineer`,
    },
    lineByLineExplanation: [
      { lines: '1', codeSnippet: 'import java.util.Scanner;', explanation: 'Imports the Scanner class from Java standard library.' },
      { lines: '9-12', codeSnippet: 'scanner.nextLine(); ... scanner.nextInt();', explanation: 'Sequentially parses text and numeric tokens.' },
      { lines: '11', codeSnippet: 'scanner.nextLine(); // Flush newline', explanation: 'Vital flush line preventing occupation from reading an empty string.' },
    ],
    commonMistakes: [
      {
        mistake: 'Skipped input when calling nextLine() right after nextInt().',
        solution: 'Always insert an extra scanner.nextLine() after nextInt() or nextDouble() to flush the newline.',
        whyWrong: 'nextInt() does not consume the trailing \\n character triggered by pressing Enter.',
      },
    ],
    bestPractices: [
      'Always close scanners when done, or use try-with-resources.',
      'Check scanner.hasNextInt() before calling nextInt() to avoid InputMismatchException.',
    ],
    applications: [
      { industry: 'Command Line Interfaces', useCase: 'Interactive CLI setup wizards for cloud deployment tools.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'Why does scanner.nextLine() return empty text if called directly after scanner.nextInt()?',
        answer: 'Because nextInt() leaves the Enter newline character (\\n) in the input buffer.',
        explanation: 'nextLine() immediately encounters that \\n and returns an empty line.',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'Which package contains the Scanner class?',
        options: ['java.lang', 'java.util', 'java.io', 'java.net'],
        correctIndex: 1,
        explanation: 'Scanner is located in java.util and must be imported explicitly.',
      },
    ],
    codingChallenge: {
      id: 'ch-8',
      title: 'Interactive Area Calculator',
      difficulty: 'Beginner',
      description: 'Write a program that uses Scanner to read two integers (width and height) and prints the rectangle area (width * height).',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String simulatedInput = "5\\n8\\n";
        Scanner scanner = new Scanner(simulatedInput);
        // Read width and height, print "Area: " + (width * height)
    }
}`,
      hints: ['Use scanner.nextInt() twice.'],
      solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String simulatedInput = "5\\n8\\n";
        Scanner scanner = new Scanner(simulatedInput);
        int width = scanner.nextInt();
        int height = scanner.nextInt();
        System.out.println("Area: " + (width * height));
        scanner.close();
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'Scanner parses primitive tokens and lines from input streams.',
        'Flush the input buffer with scanner.nextLine() after reading numbers.',
        'Always close resources to prevent memory leaks.',
      ],
      nextLessonId: 'java-syntax-vs-runtime-errors',
      nextLessonTitle: 'Compiler Syntax Errors vs Runtime Exceptions',
      nextLessonModuleId: 'java-module-1',
    },
  },

  'java-syntax-vs-runtime-errors': {
    id: 'java-syntax-vs-runtime-errors',
    moduleId: 'java-module-1',
    title: 'Compiler Syntax Errors vs Runtime Exceptions',
    subtitle: 'Understanding the Two Failure Modes: Compile-Time Verification vs Runtime Crashes',
    order: 9,
    readTimeMinutes: 14,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Distinguish compile-time errors (syntax, missing semicolons, type mismatches) from runtime exceptions.',
      'Read and decode compiler error messages with line numbers.',
      'Interpret Java runtime stack traces (e.g. NullPointerException, ArithmeticException).',
    ],
    prerequisites: ['Basic Java compilation workflow.'],
    previousLesson: { id: 'java-scanner-input', title: 'Reading Interactive User Input with Scanner', moduleId: 'java-module-1' },
    analogy: {
      title: 'The Grammar Check vs The Flat Tire',
      text: 'A compiler error is like a spell-checker: if you spell words wrong or violate grammar rules, the publisher refuses to print the book before it ever reaches readers. A runtime error is like getting a flat tire on the highway: the car was completely legal and inspected, but encountered an unexpected spike while actively driving.',
      metaphor: 'Compile-time error = Spell check rejects the manuscript; Runtime exception = Flat tire while driving.',
    },
    problemSolved: {
      title: 'Demystifying Error Messages and Accelerating Debugging',
      description:
        'Beginners often panic when faced with red compiler messages or stack traces. Understanding error classifications turns terrifying error text into precise debugging coordinates.',
      keyPoints: [
        'Compile errors: Code never runs; no .class file generated.',
        'Runtime errors: Code compiled successfully, but crashed during execution.',
        'Stack traces list the exact class, method, and line number where the failure occurred.',
      ],
    },
    intuition: {
      overview: 'How Java protects systems through compile-time guarantees.',
      steps: [
        { step: 1, title: 'Compile Phase', description: 'javac verifies type safety, syntax, and variable scopes.' },
        { step: 2, title: 'Runtime Phase', description: 'JVM executes operations (division by zero, null access, array bounds).' },
      ],
    },
    codeExample: {
      title: 'Gracefully Catching a Runtime Exception',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Starting computation...");
        try {
            int numerator = 50;
            int denominator = 0;
            int result = numerator / denominator; // Throws ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Caught Runtime Exception: " + e.getMessage());
            System.out.println("Handled gracefully: Division by zero is undefined.");
        }
        System.out.println("Program survived and exited cleanly.");
    }
}`,
      explanation: 'try-catch prevents an ArithmeticException from crashing the entire JVM process.',
    },
    runnableCode: {
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Starting computation...");
        try {
            int numerator = 50;
            int denominator = 0;
            int result = numerator / denominator;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Caught Runtime Exception: " + e.getMessage());
            System.out.println("Handled gracefully: Division by zero is undefined.");
        }
        System.out.println("Program survived and exited cleanly.");
    }
}`,
      expectedOutput: `Starting computation...\nCaught Runtime Exception: / by zero\nHandled gracefully: Division by zero is undefined.\nProgram survived and exited cleanly.`,
    },
    lineByLineExplanation: [
      { lines: '7', codeSnippet: 'int result = numerator / denominator;', explanation: 'Attempts integer division by zero, causing the JVM to generate an ArithmeticException.' },
      { lines: '9-12', codeSnippet: 'catch (ArithmeticException e) { ... }', explanation: 'Intercepts the runtime crash, allowing the program to report the issue safely.' },
    ],
    commonMistakes: [
      {
        mistake: 'Believing that clean compilation means code has no bugs.',
        solution: 'Remember compiler only checks syntax and types; logic and data bugs still happen at runtime.',
        whyWrong: 'Dividing by zero or accessing null references compiles cleanly but crashes at runtime.',
      },
    ],
    bestPractices: [
      'Read the first error in a compiler output list; subsequent errors are often cascading noise.',
      'Validate inputs proactively to prevent runtime exceptions.',
    ],
    applications: [
      { industry: 'Aerospace & Mission Critical', useCase: 'Static type checking catching syntax bugs prior to satellite flight.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'Does a missing semicolon cause a compile-time error or runtime exception?',
        answer: 'Compile-time error.',
        explanation: 'The javac compiler flags syntax issues before bytecode is emitted.',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'Which of the following occurs exclusively at runtime?',
        options: ['Missing closing curly brace', 'Calling System.out.println with a typo in System', 'ArrayIndexOutOfBoundsException', 'Assigning "hello" to an int variable without casting'],
        correctIndex: 2,
        explanation: 'Array index boundary violations occur dynamically when invalid indices are accessed at runtime.',
      },
    ],
    codingChallenge: {
      id: 'ch-9',
      title: 'Safe Division Function',
      difficulty: 'Beginner',
      description: 'Write a program that safely checks if denominator is zero before dividing, printing "Error: Cannot divide by zero" if it is.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int a = 20;
        int b = 0;
        // Check b before dividing!
    }
}`,
      hints: ['Use an if (b == 0) check.'],
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int a = 20;
        int b = 0;
        if (b == 0) {
            System.out.println("Error: Cannot divide by zero");
        } else {
            System.out.println("Result: " + (a / b));
        }
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'Compile errors are syntax and type violations identified by javac.',
        'Runtime exceptions occur while the JVM executes valid bytecode.',
        'Defensive coding and try-catch blocks protect applications from crashing.',
      ],
      nextLessonId: 'java-cli-project',
      nextLessonTitle: 'Project: Building a Robust CLI Utility Application',
      nextLessonModuleId: 'java-module-1',
    },
  },

  'java-cli-project': {
    id: 'java-cli-project',
    moduleId: 'java-module-1',
    title: 'Project: Building a Robust CLI Utility Application',
    subtitle: 'Consolidating Program Structure, Console Formatting, and Interactive Input',
    order: 10,
    readTimeMinutes: 20,
    difficulty: 'Beginner',
    visualizerType: 'none',
    objectives: [
      'Synthesize class structure, scanner input, printf formatting, and exception handling.',
      'Build a complete, production-ready Command-Line Financial Expense Logger.',
      'Format tabular output cleanly with totals and currency signs.',
    ],
    prerequisites: ['All Module 1 lessons.'],
    previousLesson: { id: 'java-syntax-vs-runtime-errors', title: 'Compiler Syntax Errors vs Runtime Exceptions', moduleId: 'java-module-1' },
    analogy: {
      title: 'The Master Carpenter Final Apprenticeship Project',
      text: 'You have learned the hammer (classes), the saw (methods), the tape measure (types & formatting), and safety goggles (exceptions). Now you assemble all these tools to build a beautiful, functional wooden chair (a complete working application).',
      metaphor: 'Tool mastery leads to real-world software creation.',
    },
    problemSolved: {
      title: 'Building Complete, Standalone Utility Tools from Scratch',
      description:
        'Putting isolated concepts together bridges the gap between learning syntax and writing real software.',
      keyPoints: [
        'Integrates Scanner input parsing.',
        'Calculates running totals and VAT taxes.',
        'Renders aligned tabular receipts using printf.',
      ],
    },
    intuition: {
      overview: 'Full workflow of an interactive CLI terminal utility.',
      steps: [
        { step: 1, title: 'Input Collection', description: 'Prompts user for transaction records.' },
        { step: 2, title: 'Business Logic', description: 'Calculates tax, discounts, and aggregate totals.' },
        { step: 3, title: 'Report Generation', description: 'Renders a beautiful ASCII receipt report.' },
      ],
    },
    codeExample: {
      title: 'The Financial Ledger Application',
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String testData = "CloudHosting\\n120.50\\nDomainName\\n15.00\\nCoffee\\n8.75\\n";
        Scanner scanner = new Scanner(testData);

        System.out.println("========================================");
        System.out.println("       CLI EXPENSE REPORT GENERATOR     ");
        System.out.println("========================================");

        double total = 0.0;
        int count = 0;

        System.out.printf("%-4s %-20s %10s%n", "#", "Expense Category", "Amount");
        System.out.println("----------------------------------------");

        while (scanner.hasNextLine() && count < 3) {
            String category = scanner.nextLine();
            if (!scanner.hasNextDouble()) break;
            double cost = scanner.nextDouble();
            scanner.nextLine(); // flush

            count++;
            total += cost;
            System.out.printf("%-4d %-20s $%9.2f%n", count, category, cost);
        }

        double tax = total * 0.08;
        double grandTotal = total + tax;

        System.out.println("----------------------------------------");
        System.out.printf("%-24s $%10.2f%n", "Subtotal:", total);
        System.out.printf("%-24s $%10.2f%n", "Tax (8%):", tax);
        System.out.printf("%-24s $%10.2f%n", "Grand Total:", grandTotal);
        System.out.println("========================================");
        scanner.close();
    }
}`,
      explanation: 'A complete end-to-end command-line utility showcasing real-world Java engineering.',
    },
    runnableCode: {
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String testData = "CloudHosting\\n120.50\\nDomainName\\n15.00\\nCoffee\\n8.75\\n";
        Scanner scanner = new Scanner(testData);

        System.out.println("========================================");
        System.out.println("       CLI EXPENSE REPORT GENERATOR     ");
        System.out.println("========================================");

        double total = 0.0;
        int count = 0;

        System.out.printf("%-4s %-20s %10s%n", "#", "Expense Category", "Amount");
        System.out.println("----------------------------------------");

        while (scanner.hasNextLine() && count < 3) {
            String category = scanner.nextLine();
            if (!scanner.hasNextDouble()) break;
            double cost = scanner.nextDouble();
            scanner.nextLine();

            count++;
            total += cost;
            System.out.printf("%-4d %-20s $%9.2f%n", count, category, cost);
        }

        double tax = total * 0.08;
        double grandTotal = total + tax;

        System.out.println("----------------------------------------");
        System.out.printf("%-24s $%10.2f%n", "Subtotal:", total);
        System.out.printf("%-24s $%10.2f%n", "Tax (8%):", tax);
        System.out.printf("%-24s $%10.2f%n", "Grand Total:", grandTotal);
        System.out.println("========================================");
        scanner.close();
    }
}`,
      expectedOutput: `========================================\n       CLI EXPENSE REPORT GENERATOR     \n========================================\n#    Expense Category         Amount\n----------------------------------------\n1    CloudHosting         $   120.50\n2    DomainName           $    15.00\n3    Coffee               $     8.75\n----------------------------------------\nSubtotal:                $    144.25\nTax (8%):                $     11.54\nGrand Total:             $    155.79\n========================================`,
    },
    lineByLineExplanation: [
      { lines: '5-6', codeSnippet: 'Scanner scanner = new Scanner(testData);', explanation: 'Initializes input parser.' },
      { lines: '18-28', codeSnippet: 'while (scanner.hasNextLine() && count < 3) { ... }', explanation: 'Iteratively processes each expense entry, tracking cumulative totals.' },
      { lines: '30-35', codeSnippet: 'double tax = total * 0.08; ... printf(...)', explanation: 'Calculates tax and prints a formatted summary receipt.' },
    ],
    commonMistakes: [
      {
        mistake: 'Using integer arithmetic for currency calculations.',
        solution: 'Use double (or BigDecimal for production banking) to avoid losing fractional cents.',
        whyWrong: 'Integer division truncates decimals immediately (5 / 2 = 2 instead of 2.5).',
      },
    ],
    bestPractices: [
      'In high-stakes financial applications, use java.math.BigDecimal instead of floating-point double.',
      'Modularize input reading, calculations, and reporting.',
    ],
    applications: [
      { industry: 'FinTech & Accounting', useCase: 'Automated invoice and transaction reconciliation engines.' },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'Why is printf preferred over string concatenation for generating financial tables?',
        answer: 'Because printf guarantees uniform column alignment and precise decimal rounding.',
        explanation: 'Width flags like %-20s ensure columns align cleanly regardless of text length.',
      },
    ],
    quiz: [
      {
        id: 'quiz-1',
        question: 'What is the primary benefit of building modular CLI programs in Java?',
        options: ['They run without the JVM', 'They combine I/O, type safety, and business logic into deployable utilities', 'They eliminate the need for classes', 'They execute in the browser directly'],
        correctIndex: 1,
        explanation: 'CLI programs exercise the entire core language foundation in a self-contained, testable format.',
      },
    ],
    codingChallenge: {
      id: 'ch-10',
      title: 'Temperature Conversion Utility',
      difficulty: 'Beginner',
      description: 'Write a program that takes Celsius temperature 25.0, converts it to Fahrenheit using (celsius * 9/5) + 32, and prints the result formatted to 1 decimal place.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        double celsius = 25.0;
        // Formula: fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
        // Print: 25.0 C = 77.0 F
    }
}`,
      hints: ['Make sure to use 9.0 / 5.0 so floating-point division is used.'],
      solutionCode: `public class Main {
    public static void main(String[] args) {
        double celsius = 25.0;
        double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
        System.out.printf("%.1f C = %.1f F%n", celsius, fahrenheit);
    }
}`,
    },
    summary: {
      keyTakeaways: [
        'You have mastered Java program architecture, compilation, output formatting, and user input.',
        'Module 1 establishes the rock-solid foundation for variables, data types, and memory models.',
      ],
      nextLessonId: 'java-variables-declaration',
      nextLessonTitle: 'Variables and Static Typing in Java',
      nextLessonModuleId: 'java-module-2',
    },
  },
};
