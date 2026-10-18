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
// MODULE 2: VARIABLES AND DATA TYPES
// ==========================================
const m2Data = {
  id: 'java-module-2',
  number: 2,
  title: 'Variables and Data Types',
  subtitle: 'Primitives, Strings, Constants, Type Casting & Operators',
  description: 'Master how Java handles memory and types. Explore all 8 primitive types, understand String immutability and the String Constant Pool, use the final keyword, perform widening and narrowing type casts, and utilize operators.',
  icon: 'Layers',
  badge: 'Core Syntax',
  estimatedHours: 9,
  topicsCount: 10,
  lessons: [
    { id: 'java-variables-declaration', moduleId: 'java-module-2', title: 'Variables and Static Typing in Java', description: 'Variable declaration, memory allocation, and the compile-time type safety contract.', order: 1, readTimeMinutes: 14, visualizerType: 'memory-model', difficulty: 'Beginner' },
    { id: 'java-primitive-integers', moduleId: 'java-module-2', title: 'Primitive Integral Types (byte, short, int, long)', description: 'Bit sizes, two\'s complement ranges, integer overflow, and numeric literals.', order: 2, readTimeMinutes: 15, visualizerType: 'memory-model', difficulty: 'Beginner' },
    { id: 'java-floating-point', moduleId: 'java-module-2', title: 'Floating-Point Types (float, double, and IEEE 754)', description: '32-bit float vs 64-bit double, precision gotchas, and why banking uses BigDecimal.', order: 3, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-char-boolean', moduleId: 'java-module-2', title: 'Character and Boolean Types (char and boolean)', description: '16-bit Unicode characters, ASCII codes, and boolean logic flags.', order: 4, readTimeMinutes: 12, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-strings-immutability', moduleId: 'java-module-2', title: 'Strings in Java: The String Constant Pool', description: 'Why Strings are immutable reference objects and how the JVM optimizes string storage.', order: 5, readTimeMinutes: 18, visualizerType: 'memory-model', difficulty: 'Beginner' },
    { id: 'java-constants-final', moduleId: 'java-module-2', title: 'Constants with the final Keyword', description: 'Preventing variable reassignment, immutable constants, and naming conventions.', order: 6, readTimeMinutes: 12, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-type-casting', moduleId: 'java-module-2', title: 'Type Casting: Widening vs Narrowing', description: 'Implicit widening promotions and explicit narrowing casts with potential data loss.', order: 7, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-arithmetic-operators', moduleId: 'java-module-2', title: 'Arithmetic and Assignment Operators', description: 'Addition, subtraction, integer division /, modulo %, and compound operators (+=, -=).', order: 8, readTimeMinutes: 14, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-relational-logical', moduleId: 'java-module-2', title: 'Relational & Logical Operators (Short-Circuit)', description: 'Comparison operators (==, !=, <, >) and short-circuit logic (&&, ||, !).', order: 9, readTimeMinutes: 15, visualizerType: 'control-flow', difficulty: 'Beginner' },
    { id: 'java-bitwise-operators', moduleId: 'java-module-2', title: 'Bitwise and Bit-Shift Operations in Java', description: 'Bitwise AND (&), OR (|), XOR (^), bit inversion (~), and binary shifts (<<, >>, >>>).', order: 10, readTimeMinutes: 18, visualizerType: 'none', difficulty: 'Intermediate' }
  ]
};

const m2Lessons = {};

m2Lessons['java-variables-declaration'] = {
  id: 'java-variables-declaration',
  moduleId: 'java-module-2',
  title: 'Variables and Static Typing in Java',
  subtitle: 'Strong Typing, Memory Allocation on the Stack, and Variable Scope',
  order: 1,
  readTimeMinutes: 14,
  difficulty: 'Beginner',
  visualizerType: 'memory-model',
  objectives: [
    'Define variable declaration, initialization, and assignment in Java.',
    'Understand why Java is statically and strongly typed.',
    'Distinguish variable scopes: local variables vs class fields.'
  ],
  prerequisites: ['Module 1: Java Fundamentals'],
  analogy: {
    title: 'The Labeled Wooden Storage Slots',
    text: 'In dynamic languages like JavaScript or Python, variables are sticky labels you can peel off a number and paste onto a text sentence. In Java, a variable declaration is like building a fixed wooden compartment into your desk: if you carve an "int" slot, it is physically sized for 32-bit whole numbers only. Trying to cram a word or decimal into it causes the carpenter (javac) to reject it before it even leaves the shop.',
    metaphor: 'Declaration = Carving the slot; Initialization = Storing the first item; Static Typing = The strict slot dimensions.'
  },
  problemSolved: {
    title: 'Preventing Catastrophic Type Mismatch Bugs in Production',
    description: 'In dynamically typed code, assigning a string to a price variable causes runtime crashes hours later when a customer pays. Java requires every variable to declare its type upfront, catching bugs at compile time.',
    keyPoints: [
      'Static Typing: Types are validated before running.',
      'Strong Typing: No implicit hazardous type coercion.',
      'Memory Efficiency: JVM reserves exact required bytes.'
    ]
  },
  intuition: {
    overview: 'Syntax: DataType variableName = initialValue;',
    steps: [
      { step: 1, title: 'DataType', description: 'Specifies the memory size and permissible operations (e.g. int, double, boolean).' },
      { step: 2, title: 'variableName', description: 'The identifier used to reference this memory location in camelCase.' },
      { step: 3, title: 'initialValue', description: 'The literal or computed expression stored in the variable.' }
    ]
  },
  codeExample: {
    title: 'Declaring and Reassigning Strongly Typed Variables',
    code: `public class Main {
    public static void main(String[] args) {
        int studentAge = 20;
        double gpa = 3.85;
        boolean isEnrolled = true;
        char letterGrade = 'A';

        System.out.println("Student Age: " + studentAge);
        System.out.println("GPA: " + gpa);
        System.out.println("Enrolled: " + isEnrolled);
        System.out.println("Grade: " + letterGrade);

        // Reassignment with same type is valid:
        studentAge = 21;
        System.out.println("Updated Age next year: " + studentAge);
    }
}`,
    explanation: 'Variables must match their declared type on every assignment.'
  },
  runnableCode: {
    code: `public class Main {
    public static void main(String[] args) {
        int studentAge = 20;
        double gpa = 3.85;
        boolean isEnrolled = true;
        char letterGrade = 'A';

        System.out.println("Student Age: " + studentAge);
        System.out.println("GPA: " + gpa);
        System.out.println("Enrolled: " + isEnrolled);
        System.out.println("Grade: " + letterGrade);

        studentAge = 21;
        System.out.println("Updated Age next year: " + studentAge);
    }
}`,
    expectedOutput: `Student Age: 20\nGPA: 3.85\nEnrolled: true\nGrade: A\nUpdated Age next year: 21`
  },
  lineByLineExplanation: [
    { lines: '3', codeSnippet: 'int studentAge = 20;', explanation: 'Allocates a 32-bit integer variable named studentAge initialized to 20.' },
    { lines: '4', codeSnippet: 'double gpa = 3.85;', explanation: 'Allocates a 64-bit double precision floating point variable.' },
    { lines: '12', codeSnippet: 'studentAge = 21;', explanation: 'Mutates the existing variable with a new integer value.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using an uninitialized local variable.',
      solution: 'Always assign a value to local variables before reading them.',
      whyWrong: 'Java does NOT assign default values to local variables inside methods; reading them causes a compilation error.'
    }
  ],
  bestPractices: [
    'Declare variables as close as possible to their first use point.',
    'Use meaningful, descriptive variable names rather than cryptic abbreviations.'
  ],
  applications: [
    { industry: 'Core Software', useCase: 'Tracking state safely across enterprise financial workflows.' }
  ],
  practiceQuestions: [
    {
      id: 'q1',
      question: 'Can you reassign a Java variable declared as "int count = 5;" to a string "five"?',
      answer: 'No, Java enforces static typing.',
      explanation: 'Once count is declared as int, it can only store 32-bit integer values.'
    }
  ],
  quiz: [
    {
      id: 'quiz-1',
      question: 'Which of the following occurs if you try to print an uninitialized local variable in Java?',
      options: ['It prints null', 'It prints 0', 'The code fails to compile with an "uninitialized variable" error', 'It prints undefined'],
      correctIndex: 2,
      explanation: 'Local variables inside methods must be explicitly initialized before use.'
    }
  ],
  codingChallenge: {
    id: 'ch-m2-1',
    title: 'Product Inventory Variable Tracker',
    difficulty: 'Beginner',
    description: 'Declare variables for productId (int = 101), price (double = 49.99), and inStock (boolean = true), then print them formatted.',
    starterCode: `public class Main {
    public static void main(String[] args) {
        // Declare and print productId, price, and inStock
    }
}`,
    hints: ['int productId = 101;', 'double price = 49.99;', 'boolean inStock = true;'],
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int productId = 101;
        double price = 49.99;
        boolean inStock = true;

        System.out.println("ID: " + productId);
        System.out.println("Price: $" + price);
        System.out.println("In Stock: " + inStock);
    }
}`
  },
  summary: {
    keyTakeaways: [
      'Java variables are strongly and statically typed.',
      'Local variables must be initialized before they are read.',
      'Types dictate memory size and available operations.'
    ],
    nextLessonId: 'java-primitive-integers',
    nextLessonTitle: 'Primitive Integral Types (byte, short, int, long)',
    nextLessonModuleId: 'java-module-2'
  }
};

// Add standard template lessons for m2 (2 to 10)
const m2TopicTemplates = [
  {
    id: 'java-primitive-integers',
    title: 'Primitive Integral Types (byte, short, int, long)',
    subtitle: 'Bit Widths, Signed Ranges, Integer Overflow, and Numeric Underscores',
    order: 2,
    code: `public class Main {
    public static void main(String[] args) {
        byte smallNumber = 127;          // 8-bit (-128 to 127)
        short mediumNumber = 32000;      // 16-bit (-32,768 to 32,767)
        int standardInt = 2_147_483_647; // 32-bit (underscores for readability)
        long bigNumber = 9_000_000_000L; // 64-bit (L suffix required)

        System.out.println("byte: " + smallNumber);
        System.out.println("short: " + mediumNumber);
        System.out.println("int: " + standardInt);
        System.out.println("long: " + bigNumber);
    }
}`,
    expected: "byte: 127\\nshort: 32000\\nint: 2147483647\\nlong: 9000000000",
    analogy: "Like shipping boxes of 4 fixed sizes: byte is a pocket envelope, short is a shoe box, int is a moving box, and long is a shipping container.",
    mistake: "Forgetting the 'L' or 'l' suffix on long literals that exceed 32-bit integer limits.",
    quizQ: "What suffix is required when assigning a long literal that exceeds 2 billion?",
    quizOpts: ["f", "L", "d", "b"],
    correctIdx: 1
  },
  {
    id: 'java-floating-point',
    title: 'Floating-Point Types (float, double, and IEEE 754)',
    subtitle: 'Single vs Double Precision, Decimal Rounding Gotchas, and Scientific Notation',
    order: 3,
    code: `public class Main {
    public static void main(String[] args) {
        float f = 3.14159f; // 32-bit (requires f suffix)
        double d = 3.141592653589793; // 64-bit default
        
        System.out.println("Float: " + f);
        System.out.println("Double: " + d);

        // IEEE 754 floating point gotcha:
        double diff = 0.1 + 0.2;
        System.out.println("0.1 + 0.2 = " + diff);
    }
}`,
    expected: "Float: 3.14159\\nDouble: 3.141592653589793\\n0.1 + 0.2 = 0.30000000000000004",
    analogy: "Writing decimals in base 10 is easy (1/2 = 0.5), but 1/3 = 0.33333... never terminates. In computer binary, 0.1 cannot be represented finitely, causing tiny rounding fractions.",
    mistake: "Using double or float for financial banking transactions instead of BigDecimal.",
    quizQ: "Why is 0.1 + 0.2 not exactly equal to 0.3 in Java floating-point arithmetic?",
    quizOpts: ["The JVM is bugged", "Binary floating point cannot precisely represent base-10 fractions like 0.1", "Java truncates all calculations to 1 decimal place", "It requires the float suffix"],
    correctIdx: 1
  },
  {
    id: 'java-char-boolean',
    title: 'Character and Boolean Types (char and boolean)',
    subtitle: '16-bit Unicode Characters, ASCII Character Codes, and Boolean Logic Flags',
    order: 4,
    code: `public class Main {
    public static void main(String[] args) {
        char ch = 'A';
        char unicodeHeart = '\\u2764';
        boolean isReady = true;

        System.out.println("Char: " + ch + " (ASCII code: " + (int)ch + ")");
        System.out.println("Unicode symbol: " + unicodeHeart);
        System.out.println("Boolean flag: " + isReady);
    }
}`,
    expected: "Char: A (ASCII code: 65)\\nUnicode symbol: ❤\\nBoolean flag: true",
    analogy: "char is like a single glyph stamp in a universal typewriter containing every world language symbol. boolean is a simple light switch with only two physical positions: ON or OFF.",
    mistake: "Using double quotes for a char ('A' is a char, \"A\" is a String object).",
    quizQ: "What is the size of the char primitive in Java?",
    quizOpts: ["8 bits (ASCII only)", "16 bits (UTF-16 code unit)", "32 bits", "64 bits"],
    correctIdx: 1
  },
  {
    id: 'java-strings-immutability',
    title: 'Strings in Java: The String Constant Pool',
    subtitle: 'Why Java Strings Cannot Be Mutated and How the Heap String Pool Conserves Memory',
    order: 5,
    code: `public class Main {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java"; // Points to the same pool object!
        String s3 = new String("Java"); // Forces new heap allocation

        System.out.println("s1 == s2: " + (s1 == s2)); // true (same pool reference)
        System.out.println("s1 == s3: " + (s1 == s3)); // false (different addresses)
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true (same content)
    }
}`,
    expected: "s1 == s2: true\\ns1 == s3: false\\ns1.equals(s3): true",
    analogy: "Like published books in a library: once printed, you cannot erase words on page 5. If you want a modified version, you print an entirely new edition. The String Constant Pool is the shared library shelf so identical book titles are not duplicated.",
    mistake: "Using == instead of .equals() to compare string text contents.",
    quizQ: "What operator should ALWAYS be used to compare the content of two String variables?",
    quizOpts: ["==", ".equals()", "===", ".compare()"],
    correctIdx: 1
  },
  {
    id: 'java-constants-final',
    title: 'Constants with the final Keyword',
    subtitle: 'Locking Variable Reassignment, Immutable Values, and the static final Idiom',
    order: 6,
    code: `public class Main {
    public static final double PI = 3.141592653589793;
    public static final int DAYS_IN_WEEK = 7;

    public static void main(String[] args) {
        final int localLimit = 100;
        System.out.println("PI: " + PI);
        System.out.println("Days in week: " + DAYS_IN_WEEK);
        System.out.println("Local limit: " + localLimit);
    }
}`,
    expected: "PI: 3.141592653589793\\nDays in week: 7\\nLocal limit: 100",
    analogy: "final is like engraving text into solid stone rather than writing in pencil on a whiteboard: once engraved, no one can erase or overwrite it.",
    mistake: "Attempting to reassign a final variable after initial assignment, causing a compiler error.",
    quizQ: "What Java keyword makes a variable constant so it cannot be reassigned?",
    quizOpts: ["const", "final", "static", "immutable"],
    correctIdx: 1
  },
  {
    id: 'java-type-casting',
    title: 'Type Casting: Widening vs Narrowing',
    subtitle: 'Automatic Type Promotion (No Loss) vs Explicit Casting with Potential Overflow',
    order: 7,
    code: `public class Main {
    public static void main(String[] args) {
        // Widening (Implicit): int -> double (Safe)
        int num = 100;
        double wide = num;
        System.out.println("Widened int to double: " + wide);

        // Narrowing (Explicit): double -> int (Truncates decimal)
        double price = 99.95;
        int dollars = (int) price;
        System.out.println("Narrowed price to int: " + dollars);

        // Overflow narrowing gotcha:
        int huge = 130;
        byte overflow = (byte) huge; // 130 exceeds byte max 127
        System.out.println("130 cast to byte overflows to: " + overflow);
    }
}`,
    expected: "Widened int to double: 100.0\\nNarrowed price to int: 99\\n130 cast to byte overflows to: -126",
    analogy: "Pouring water from a teacup into a gallon bucket (widening) is completely safe and never spills. Pouring water from a gallon bucket into a teacup (narrowing) requires explicit permission and will spill excess water.",
    mistake: "Expecting (int) 9.99 to round to 10; casting truncates the decimal portion entirely (yields 9).",
    quizQ: "What happens when you cast 15.9 to an int using (int) 15.9?",
    quizOpts: ["Rounds to 16", "Truncates to 15", "Throws an ArithmeticException", "Produces 15.90"],
    correctIdx: 1
  },
  {
    id: 'java-arithmetic-operators',
    title: 'Arithmetic and Assignment Operators',
    subtitle: 'Addition, Subtraction, Multiplication, Integer Truncation Division, and Modulo',
    order: 8,
    code: `public class Main {
    public static void main(String[] args) {
        int a = 17;
        int b = 5;

        System.out.println("Addition (a + b): " + (a + b));
        System.out.println("Integer Division (17 / 5): " + (a / b));
        System.out.println("Floating Division (17.0 / 5): " + (17.0 / b));
        System.out.println("Remainder Modulo (17 % 5): " + (a % b));

        int counter = 10;
        counter += 5; // Compound assignment
        System.out.println("Counter after += 5: " + counter);
    }
}`,
    expected: "Addition (a + b): 22\\nInteger Division (17 / 5): 3\\nFloating Division (17.0 / 5): 3.4\\nRemainder Modulo (17 % 5): 2\\nCounter after += 5: 15",
    analogy: "Modulo (%) is like the leftover change when buying identical items: if tickets cost $5 and you pay with $17, 17 % 5 = $2 change remaining.",
    mistake: "Dividing two integers (5 / 2) expecting 2.5, but getting integer 2.",
    quizQ: "What is the result of 14 % 4 in Java?",
    quizOpts: ["3", "2", "3.5", "0"],
    correctIdx: 1
  },
  {
    id: 'java-relational-logical',
    title: 'Relational & Logical Operators (Short-Circuit)',
    subtitle: 'Boolean Comparisons and Short-Circuit Evaluation Efficiency',
    order: 9,
    code: `public class Main {
    public static void main(String[] args) {
        int age = 22;
        boolean hasLicense = true;

        // Logical AND (&&): Both must be true
        boolean canDrive = (age >= 18) && hasLicense;
        System.out.println("Can Drive: " + canDrive);

        // Short-circuit demonstration:
        int x = 0;
        // x != 0 is false, so (10 / x > 1) is NEVER evaluated, avoiding division by zero!
        boolean safeCheck = (x != 0) && (10 / x > 1);
        System.out.println("Safe short-circuit check passed: " + safeCheck);
    }
}`,
    expected: "Can Drive: true\\nSafe short-circuit check passed: false",
    analogy: "A security guard with a checklist of 2 badges: if the person fails the first badge (false in &&), the guard stops immediately and denies entry without wasting time checking the second badge.",
    mistake: "Using single & or | instead of && or ||, which disables short-circuit protection and evaluates dangerous second operands.",
    quizQ: "Why does (false && (10 / 0 == 0)) NOT throw an ArithmeticException?",
    quizOpts: ["Because 10 / 0 is valid in Java", "Because && short-circuits: the right side is never evaluated when left is false", "Because it is in parentheses", "Because of operator precedence"],
    correctIdx: 1
  },
  {
    id: 'java-bitwise-operators',
    title: 'Bitwise and Bit-Shift Operations in Java',
    subtitle: 'Manipulating Raw Bits: AND (&), OR (|), XOR (^), NOT (~), and Shifts (<<, >>, >>>)',
    order: 10,
    code: `public class Main {
    public static void main(String[] args) {
        int a = 5;  // Binary: 0101
        int b = 3;  // Binary: 0011

        System.out.println("Bitwise AND (5 & 3): " + (a & b)); // 0001 = 1
        System.out.println("Bitwise OR  (5 | 3): " + (a | b)); // 0111 = 7
        System.out.println("Bitwise XOR (5 ^ 3): " + (a ^ b)); // 0110 = 6

        // Bit shift left: a << 1 is equivalent to multiplying by 2
        System.out.println("Shift Left (5 << 1): " + (a << 1)); // 10
        // Bit shift right: a >> 1 is equivalent to dividing by 2
        System.out.println("Shift Right (5 >> 1): " + (a >> 1)); // 2
    }
}`,
    expected: "Bitwise AND (5 & 3): 1\\nBitwise OR  (5 | 3): 7\\nBitwise XOR (5 ^ 3): 6\\nShift Left (5 << 1): 10\\nShift Right (5 >> 1): 2",
    analogy: "Like a row of 8 light switches on a control panel: bitwise operators toggle each individual switch on or off simultaneously in one single CPU clock cycle.",
    mistake: "Confusing logical && with bitwise &.",
    quizQ: "What is the effect of shifting an integer x left by 1 bit (x << 1)?",
    quizOpts: ["Divides x by 2", "Multiplies x by 2", "Adds 1 to x", "Inverts all bits"],
    correctIdx: 1
  }
];

m2TopicTemplates.forEach(t => {
  m2Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-2',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 15,
    difficulty: t.order === 10 ? 'Intermediate' : 'Beginner',
    visualizerType: t.id.includes('strings') ? 'memory-model' : t.id.includes('relational') ? 'control-flow' : 'none',
    objectives: [
      `Understand the core concepts of ${t.title}.`,
      'Avoid common syntax and logic pitfalls.',
      'Apply standard Java conventions in production code.'
    ],
    prerequisites: ['Previous lessons in Module 2'],
    analogy: {
      title: t.title + ' Analogy',
      text: t.analogy,
      metaphor: t.analogy
    },
    problemSolved: {
      title: 'Precision, Performance, and Safety in Java',
      description: `Without ${t.title}, writing robust, memory-safe, and high-performance software would be impossible.`,
      keyPoints: ['Strong typing', 'Predictable runtime behavior', 'Optimal memory usage']
    },
    intuition: {
      overview: `A deep dive into ${t.title} mechanisms in the Java Virtual Machine.`,
      steps: [
        { step: 1, title: 'Concept Definition', description: t.subtitle },
        { step: 2, title: 'Evaluation Mechanism', description: 'Evaluated according to Java Language Specification rules.' },
        { step: 3, title: 'Output Result', description: 'Yields verified runtime behavior.' }
      ]
    },
    codeExample: {
      title: `Demonstrating ${t.title}`,
      code: t.code,
      explanation: `Examine how ${t.title} functions in runnable code.`
    },
    runnableCode: {
      code: t.code,
      expectedOutput: t.expected
    },
    lineByLineExplanation: [
      { lines: '1-4', codeSnippet: 'public class Main { ... }', explanation: 'Class and main method definition.' },
      { lines: '5-10', codeSnippet: '// Core demonstration logic', explanation: 'Demonstrates the specific operator or type conversion.' }
    ],
    commonMistakes: [
      {
        mistake: t.mistake,
        solution: 'Follow standard Java practices outlined in the lesson.',
        whyWrong: 'Violating type rules results in either compile-time errors or unexpected data loss.'
      }
    ],
    bestPractices: [
      'Write clean, intention-revealing code.',
      'Check data boundaries and test with edge cases.'
    ],
    applications: [
      { industry: 'Enterprise Systems', useCase: 'High-throughput data processing and calculation engines.' }
    ],
    practiceQuestions: [
      {
        id: `pq-${t.id}`,
        question: t.quizQ,
        answer: t.quizOpts[t.correctIdx],
        explanation: 'Detailed explanation adhering to Java standards.'
      }
    ],
    quiz: [
      {
        id: `qz-${t.id}`,
        question: t.quizQ,
        options: t.quizOpts,
        correctIndex: t.correctIdx,
        explanation: 'Verified by the Java Language Specification.'
      }
    ],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Beginner',
      description: `Write a Java program that demonstrates the principle of ${t.title}.`,
      starterCode: t.code,
      hints: ['Review the lesson explanation.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [
        `Mastered ${t.title}.`,
        'Understood JVM internal representations.',
        'Ready for the next lesson in the curriculum.'
      ],
      nextLessonId: t.order === 10 ? 'java-if-else-branching' : m2Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'If, Else-If, and Else Control Branching' : m2Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-3' : 'java-module-2'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-2.ts'), 'javaModule2Data', 'javaModule2Lessons', m2Data, m2Lessons);

// ==========================================
// MODULE 3: CONDITIONS AND LOOPS
// ==========================================
const m3Data = {
  id: 'java-module-3',
  number: 3,
  title: 'Conditions and Loops',
  subtitle: 'If-Else, Switch Expressions, For, While, Do-While & Control Flow',
  description: 'Master program decision making and iterative processing. Compare if-else branching with modern enhanced switch expressions, analyze for, while, and do-while loops, utilize break and continue, and solve practical algorithmic challenges.',
  icon: 'GitFork',
  badge: 'Control Flow',
  estimatedHours: 9,
  topicsCount: 10,
  lessons: [
    { id: 'java-if-else-branching', moduleId: 'java-module-3', title: 'If, Else-If, and Else Conditional Branching', description: 'Nested conditions, relational comparisons, and executing exclusive blocks.', order: 1, readTimeMinutes: 14, visualizerType: 'control-flow', difficulty: 'Beginner' },
    { id: 'java-ternary-operator', moduleId: 'java-module-3', title: 'The Ternary Operator (? :) in Java', description: 'Compact inline conditional expressions for clean value assignments.', order: 2, readTimeMinutes: 10, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-switch-statement', moduleId: 'java-module-3', title: 'Switch Statements & Modern Switch Expressions', description: 'Traditional switch with break vs modern arrow syntax (->) and yield keyword.', order: 3, readTimeMinutes: 16, visualizerType: 'control-flow', difficulty: 'Beginner' },
    { id: 'java-while-loop', moduleId: 'java-module-3', title: 'The While Loop (Pre-Condition Loops)', description: 'Loop conditions, iteration counters, and avoiding infinite loops.', order: 4, readTimeMinutes: 12, visualizerType: 'control-flow', difficulty: 'Beginner' },
    { id: 'java-do-while-loop', moduleId: 'java-module-3', title: 'The Do-While Loop (Post-Condition Loops)', description: 'Guaranteed at-least-once execution and menu driven console interactions.', order: 5, readTimeMinutes: 12, visualizerType: 'control-flow', difficulty: 'Beginner' },
    { id: 'java-for-loop', moduleId: 'java-module-3', title: 'The Classic Counting For Loop', description: 'Initialization, condition, and step increment in a single statement header.', order: 6, readTimeMinutes: 14, visualizerType: 'control-flow', difficulty: 'Beginner' },
    { id: 'java-enhanced-for', moduleId: 'java-module-3', title: 'The Enhanced For Loop (For-Each Traversal)', description: 'Traversing arrays and collections cleanly without manual index management.', order: 7, readTimeMinutes: 12, visualizerType: 'control-flow', difficulty: 'Beginner' },
    { id: 'java-nested-loops', moduleId: 'java-module-3', title: 'Nested Loops and Multi-Dimensional Coordinates', description: 'Row-major matrix traversals, grid coordinate systems, and quadratic complexity.', order: 8, readTimeMinutes: 16, visualizerType: 'control-flow', difficulty: 'Beginner' },
    { id: 'java-break-continue', moduleId: 'java-module-3', title: 'Loop Control: break, continue, and Labeled Statements', description: 'Early loop exits, skipping iterations, and breaking outer nested loops with labels.', order: 9, readTimeMinutes: 15, visualizerType: 'control-flow', difficulty: 'Beginner' },
    { id: 'java-loops-practice', moduleId: 'java-module-3', title: 'Practical Problem Solving: FizzBuzz, Primes & Palindromes', description: 'Combining branching and iteration to solve classic interview programming challenges.', order: 10, readTimeMinutes: 20, visualizerType: 'control-flow', difficulty: 'Beginner' }
  ]
};

const m3Lessons = {};
const m3TopicTemplates = [
  {
    id: 'java-if-else-branching',
    title: 'If, Else-If, and Else Conditional Branching',
    subtitle: 'Decision Trees, Exclusive Code Paths, and Logical Evaluations',
    order: 1,
    code: `public class Main {
    public static void main(String[] args) {
        int score = 88;
        char grade;

        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 70) {
            grade = 'C';
        } else {
            grade = 'F';
        }

        System.out.println("Final Grade: " + grade);
    }
}`,
    expected: "Final Grade: B",
    analogy: "Like a train track switch: depending on which lever is pulled (true condition), the train is diverted onto one specific track, ignoring all other routes.",
    mistake: "Using = (assignment) instead of == (equality comparison) in condition checks.",
    quizQ: "Which block executes if all if and else-if conditions evaluate to false?",
    quizOpts: ["The first if block", "The default else block", "The program crashes", "The compiler throws an error"],
    correctIdx: 1
  },
  {
    id: 'java-ternary-operator',
    title: 'The Ternary Operator (? :) in Java',
    subtitle: 'Compact Conditional Expressions: condition ? valueIfTrue : valueIfFalse',
    order: 2,
    code: `public class Main {
    public static void main(String[] args) {
        int age = 19;
        String status = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Status: " + status);

        int max = (10 > 25) ? 10 : 25;
        System.out.println("Maximum: " + max);
    }
}`,
    expected: "Status: Adult\\nMaximum: 25",
    analogy: "A rapid two-way fork in the road: you pick the left path if green, right path if red, with no extra paperwork.",
    mistake: "Nesting ternary operators deeply, resulting in unreadable 'spaghetti' code.",
    quizQ: "What is the return type of (5 > 2 ? 10 : 20.5)?",
    quizOpts: ["int", "double (due to numeric promotion)", "boolean", "compiler error"],
    correctIdx: 1
  },
  {
    id: 'java-switch-statement',
    title: 'Switch Statements & Modern Switch Expressions',
    subtitle: 'Multi-Way Branching, Fall-Through Pitfalls, and Java 14+ Arrow Syntax (->)',
    order: 3,
    code: `public class Main {
    public static void main(String[] args) {
        int dayOfWeek = 3;

        // Modern switch expression (Java 14+) with no break needed!
        String dayName = switch (dayOfWeek) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            default -> "Weekend";
        };

        System.out.println("Day 3 is: " + dayName);
    }
}`,
    expected: "Day 3 is: Wednesday",
    analogy: "A hotel elevator with numbered floor buttons: press 3 and you go straight to floor 3 without stopping at floors 1 and 2.",
    mistake: "Forgetting break in traditional switch statements, causing unintended 'fall-through' execution.",
    quizQ: "What is the main benefit of modern switch expressions using arrow syntax (->)?",
    quizOpts: ["They execute twice as fast", "No manual 'break' is required and they can return a value directly", "They only work on strings", "They eliminate the default case"],
    correctIdx: 1
  },
  {
    id: 'java-while-loop',
    title: 'The While Loop (Pre-Condition Loops)',
    subtitle: 'Executing Code as Long as a Boolean Condition Remains True',
    order: 4,
    code: `public class Main {
    public static void main(String[] args) {
        int count = 1;
        while (count <= 5) {
            System.out.println("Iteration: " + count);
            count++; // Essential update step!
        }
        System.out.println("Loop finished successfully.");
    }
}`,
    expected: "Iteration: 1\\nIteration: 2\\nIteration: 3\\nIteration: 4\\nIteration: 5\\nLoop finished successfully.",
    analogy: "Checking if you have enough gas in your car: before each mile, you check if gas > 0. If yes, you drive. If no, you stop immediately.",
    mistake: "Forgetting to update the loop condition variable inside the body, creating an infinite loop that freezes the thread.",
    quizQ: "When is the condition in a while loop evaluated?",
    quizOpts: ["After the body executes", "Before each iteration of the body", "Only once when entering the program", "At compile-time"],
    correctIdx: 1
  },
  {
    id: 'java-do-while-loop',
    title: 'The Do-While Loop (Post-Condition Loops)',
    subtitle: 'Guaranteeing at Least One Execution Cycle Before Evaluating the Condition',
    order: 5,
    code: `public class Main {
    public static void main(String[] args) {
        int number = 100;
        // Condition is false immediately (100 < 5), but body still runs once!
        do {
            System.out.println("Guaranteed execution: number = " + number);
            number++;
        } while (number < 5);

        System.out.println("Exited do-while loop.");
    }
}`,
    expected: "Guaranteed execution: number = 100\\nExited do-while loop.",
    analogy: "A 'taste before you buy' policy: you take a sip of coffee first, and then decide if you want to keep drinking.",
    mistake: "Forgetting the semicolon at the end of the while condition: do { ... } while (condition);",
    quizQ: "What is the minimum number of times a do-while loop body will execute?",
    quizOpts: ["0", "1", "2", "Infinite"],
    correctIdx: 1
  },
  {
    id: 'java-for-loop',
    title: 'The Classic Counting For Loop',
    subtitle: 'Initialization, Loop Condition, and Update Step in a Single Compact Header',
    order: 6,
    code: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
            System.out.println("Step i=" + i + ", running sum=" + sum);
        }
        System.out.println("Final total: " + sum);
    }
}`,
    expected: "Step i=1, running sum=1\\nStep i=2, running sum=3\\nStep i=3, running sum=6\\nStep i=4, running sum=10\\nStep i=5, running sum=15\\nFinal total: 15",
    analogy: "A lap runner on a stadium track: start at lap 1, keep running while lap <= 5, and tick off one lap after each circuit.",
    mistake: "Off-by-one errors (using < when <= is intended, or vice-versa).",
    quizQ: "Which part of the for loop header executes only once?",
    quizOpts: ["Condition", "Update expression", "Initialization", "The loop body"],
    correctIdx: 2
  },
  {
    id: 'java-enhanced-for',
    title: 'The Enhanced For Loop (For-Each Traversal)',
    subtitle: 'Clean, Safe Iteration Over Arrays and Iterable Collections',
    order: 7,
    code: `public class Main {
    public static void main(String[] args) {
        String[] languages = {"Java", "Kotlin", "Scala", "Clojure"};

        System.out.println("JVM Languages:");
        for (String lang : languages) {
            System.out.println("- " + lang);
        }
    }
}`,
    expected: "JVM Languages:\\n- Java\\n- Kotlin\\n- Scala\\n- Clojure",
    analogy: "A conveyor belt inspector picking up each item as it passes, with no need to check an index counter.",
    mistake: "Attempting to modify the array or collection structure (remove items) inside an enhanced for-each loop.",
    quizQ: "Can you get the current numerical index directly from an enhanced for-each loop syntax?",
    quizOpts: ["Yes, using index variable", "No, you must track an external counter or use classic for", "Yes, using this.index", "Yes, with the at() function"],
    correctIdx: 1
  },
  {
    id: 'java-nested-loops',
    title: 'Nested Loops and Multi-Dimensional Coordinates',
    subtitle: 'Iterating Over Rows and Columns in Grids, Matrices, and Patterns',
    order: 8,
    code: `public class Main {
    public static void main(String[] args) {
        // Print a 3x4 multiplication grid
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 4; col++) {
                System.out.printf("%3d", row * col);
            }
            System.out.println(); // Newline after each row
        }
    }
}`,
    expected: "  1  2  3  4\\n  2  4  6  8\\n  3  6  9 12",
    analogy: "The clock face: the minute hand must complete 60 ticks (inner loop) for every single tick of the hour hand (outer loop).",
    mistake: "Accidentally using the outer loop variable in the inner loop increment (e.g. i++ instead of j++).",
    quizQ: "If an outer loop runs 5 times and an inner loop runs 4 times, how many total times does the inner loop body run?",
    quizOpts: ["9 times", "20 times", "5 times", "4 times"],
    correctIdx: 1
  },
  {
    id: 'java-break-continue',
    title: 'Loop Control: break, continue, and Labeled Statements',
    subtitle: 'Terminating Loops Early, Bypassing Iterations, and Labeled Multi-Level Jumps',
    order: 9,
    code: `public class Main {
    public static void main(String[] args) {
        // continue skips odd numbers
        System.out.print("Even numbers: ");
        for (int i = 1; i <= 6; i++) {
            if (i % 2 != 0) continue;
            System.out.print(i + " ");
        }
        System.out.println();

        // break exits immediately upon finding target
        int target = 4;
        for (int i = 1; i <= 10; i++) {
            if (i == target) {
                System.out.println("Found target " + target + "! Breaking.");
                break;
            }
        }
    }
}`,
    expected: "Even numbers: 2 4 6 \\nFound target 4! Breaking.",
    analogy: "break is the fire alarm (evacuate the building immediately). continue is skipping a damaged item on the conveyor belt and moving directly to inspect the next one.",
    mistake: "Putting code directly after break or continue in the same block, causing an 'unreachable statement' error.",
    quizQ: "What does the continue statement do in a loop?",
    quizOpts: ["Terminates the entire loop", "Skips the rest of the current iteration and jumps to the next iteration", "Restarts the program", "Exits the method"],
    correctIdx: 1
  },
  {
    id: 'java-loops-practice',
    title: 'Practical Problem Solving: FizzBuzz, Primes & Palindromes',
    subtitle: 'Classic Algorithmic Challenges Combining Conditionals, Loops, and State Flags',
    order: 10,
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("FizzBuzz [1..15]:");
        for (int i = 1; i <= 15; i++) {
            if (i % 15 == 0) {
                System.out.print("FizzBuzz ");
            } else if (i % 3 == 0) {
                System.out.print("Fizz ");
            } else if (i % 5 == 0) {
                System.out.print("Buzz ");
            } else {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
}`,
    expected: "FizzBuzz [1..15]:\\n1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz ",
    analogy: "The classic programming interview rite of passage: filtering multiples using modulo checks in precise precedence order.",
    mistake: "Checking i % 3 before i % 15, which prematurely prints Fizz for 15 instead of FizzBuzz.",
    quizQ: "Why must the condition (i % 15 == 0) be tested BEFORE (i % 3 == 0)?",
    quizOpts: ["It executes faster", "Because numbers divisible by 15 are also divisible by 3 and would trigger the wrong branch", "Because 15 is larger than 3", "Java requires descending order in modulo"],
    correctIdx: 1
  }
];

m3TopicTemplates.forEach(t => {
  m3Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-3',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 14,
    difficulty: 'Beginner',
    visualizerType: 'control-flow',
    objectives: [
      `Master ${t.title}.`,
      'Understand loop control mechanics and branch evaluation.',
      'Trace variable states step by step.'
    ],
    prerequisites: ['Module 2: Variables and Data Types'],
    analogy: {
      title: t.title + ' Metaphor',
      text: t.analogy,
      metaphor: t.analogy
    },
    problemSolved: {
      title: 'Controlling Flow and Iteration in Software',
      description: 'Enables computers to make dynamic choices and process repetitive workloads efficiently.',
      keyPoints: ['Deterministic decision branches', 'High-throughput iteration', 'Early exit controls']
    },
    intuition: {
      overview: `Step-by-step logic behind ${t.title}.`,
      steps: [
        { step: 1, title: 'Evaluate Condition', description: 'Computes boolean expression.' },
        { step: 2, title: 'Execute Branch or Body', description: 'Runs matching block.' },
        { step: 3, title: 'Update State', description: 'Advances loop counter or terminates.' }
      ]
    },
    codeExample: {
      title: `Demonstrating ${t.title}`,
      code: t.code,
      explanation: `Examine the control flow of ${t.title}.`
    },
    runnableCode: {
      code: t.code,
      expectedOutput: t.expected
    },
    lineByLineExplanation: [
      { lines: '1-4', codeSnippet: 'public class Main { ... }', explanation: 'Class structure and entry point.' },
      { lines: '5-12', codeSnippet: '// Control flow logic', explanation: 'Condition testing and loop advancement.' }
    ],
    commonMistakes: [
      {
        mistake: t.mistake,
        solution: 'Follow structured control flow guidelines.',
        whyWrong: 'Improper condition logic causes infinite loops or skipped branches.'
      }
    ],
    bestPractices: [
      'Keep conditions clean and simple.',
      'Always ensure loop termination conditions are reachable.'
    ],
    applications: [
      { industry: 'Algorithm Engineering', useCase: 'Search, filter, and batch processing loops.' }
    ],
    practiceQuestions: [
      {
        id: `pq-${t.id}`,
        question: t.quizQ,
        answer: t.quizOpts[t.correctIdx],
        explanation: 'Standard Java execution behavior.'
      }
    ],
    quiz: [
      {
        id: `qz-${t.id}`,
        question: t.quizQ,
        options: t.quizOpts,
        correctIndex: t.correctIdx,
        explanation: 'Adheres to Java Language Specification.'
      }
    ],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Beginner',
      description: `Implement ${t.title} to solve the specified control flow task.`,
      starterCode: t.code,
      hints: ['Review the lesson example above.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [
        `Mastered ${t.title}.`,
        'Understood loop and branching evaluation order.',
        'Ready for Arrays and Strings in Module 4.'
      ],
      nextLessonId: t.order === 10 ? 'java-arrays-1d' : m3Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'Single-Dimensional Arrays in Java' : m3Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-4' : 'java-module-3'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-3.ts'), 'javaModule3Data', 'javaModule3Lessons', m3Data, m3Lessons);

// ==========================================
// MODULE 4: ARRAYS AND STRINGS
// ==========================================
const m4Data = {
  id: 'java-module-4',
  number: 4,
  title: 'Arrays and Strings',
  subtitle: '1D Arrays, 2D Matrices, String Internals, StringBuilder & Algorithms',
  description: 'Master linear and multidimensional memory blocks in Java. Learn heap allocation of arrays, in-place traversals, utility sorting and binary searching, string manipulation, StringBuilder performance, and regex pattern matching.',
  icon: 'BarChart',
  badge: 'Data Structures',
  estimatedHours: 9,
  topicsCount: 10,
  lessons: [
    { id: 'java-arrays-1d', moduleId: 'java-module-4', title: 'Single-Dimensional Arrays in Java', description: 'Array declaration, contiguous heap allocation, default initialization, and indexing.', order: 1, readTimeMinutes: 15, visualizerType: 'array-algorithm', difficulty: 'Beginner' },
    { id: 'java-array-traversal', moduleId: 'java-module-4', title: 'Array Traversals and In-Place Reversals', description: 'Forward and backward loops, two-pointer in-place array reversal, and min/max finding.', order: 2, readTimeMinutes: 15, visualizerType: 'array-algorithm', difficulty: 'Beginner' },
    { id: 'java-arrays-utility', moduleId: 'java-module-4', title: 'The java.util.Arrays Utility Class', description: 'Built-in sorting, binary searching, array copying, and deep string representations.', order: 3, readTimeMinutes: 14, visualizerType: 'array-algorithm', difficulty: 'Beginner' },
    { id: 'java-2d-matrices', moduleId: 'java-module-4', title: 'Multidimensional Arrays (2D Matrices & Grids)', description: 'Rows and columns, matrix addition, and nested traversal loops.', order: 4, readTimeMinutes: 16, visualizerType: 'array-algorithm', difficulty: 'Beginner' },
    { id: 'java-jagged-arrays', moduleId: 'java-module-4', title: 'Jagged (Ragged) Arrays in Java', description: 'Arrays of arrays with non-uniform row lengths and dynamic row allocation.', order: 5, readTimeMinutes: 14, visualizerType: 'array-algorithm', difficulty: 'Intermediate' },
    { id: 'java-string-methods', moduleId: 'java-module-4', title: 'String Class Internals & Essential Methods', description: 'length, charAt, substring, indexOf, toLowerCase, and trim.', order: 6, readTimeMinutes: 15, visualizerType: 'none', difficulty: 'Beginner' },
    { id: 'java-string-equality', moduleId: 'java-module-4', title: 'String Equality: == vs .equals() vs compareTo()', description: 'Memory reference identity vs character content equality and lexicographic sorting.', order: 7, readTimeMinutes: 14, visualizerType: 'memory-model', difficulty: 'Beginner' },
    { id: 'java-stringbuilder', moduleId: 'java-module-4', title: 'StringBuilder vs StringBuffer vs String', description: 'Mutable char buffers, append efficiency, and preventing quadratic memory churn.', order: 8, readTimeMinutes: 16, visualizerType: 'memory-model', difficulty: 'Beginner' },
    { id: 'java-regex-patterns', moduleId: 'java-module-4', title: 'Regular Expressions & Pattern Matching', description: 'Validating emails, phone numbers, splitting tokens, and String.replaceAll.', order: 9, readTimeMinutes: 16, visualizerType: 'none', difficulty: 'Intermediate' },
    { id: 'java-string-algorithms', moduleId: 'java-module-4', title: 'Practical String Algorithms: Palindromes & Anagrams', description: 'Frequency counting, string normalization, and two-pointer validation.', order: 10, readTimeMinutes: 18, visualizerType: 'array-algorithm', difficulty: 'Intermediate' }
  ]
};

const m4Lessons = {};
const m4TopicTemplates = [
  {
    id: 'java-arrays-1d',
    title: 'Single-Dimensional Arrays in Java',
    subtitle: 'Contiguous Heap Memory, Zero-Based Indexing, and Array Bounds Checking',
    order: 1,
    code: `public class Main {
    public static void main(String[] args) {
        // Declare and allocate array of size 4
        int[] scores = new int[4];
        scores[0] = 95;
        scores[1] = 82;
        scores[2] = 88;
        scores[3] = 91;

        System.out.println("Array Length: " + scores.length);
        System.out.println("First element: " + scores[0]);
        System.out.println("Last element: " + scores[scores.length - 1]);
    }
}`,
    expected: "Array Length: 4\\nFirst element: 95\\nLast element: 91",
    analogy: "An apartment building with numbered mailboxes [0], [1], [2], [3] all in a single row. The building has a fixed size from the moment it is built.",
    mistake: "Accessing index scores[scores.length], which throws an ArrayIndexOutOfBoundsException.",
    quizQ: "What is the default value of elements in a newly allocated int[] array in Java?",
    quizOpts: ["null", "0", "garbage memory", "-1"],
    correctIdx: 1
  },
  {
    id: 'java-array-traversal',
    title: 'Array Traversals and In-Place Reversals',
    subtitle: 'Iterating Forward, Backward, and Reversing Elements with Two Pointers',
    order: 2,
    code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        // In-place two-pointer reversal
        int left = 0;
        int right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }

        System.out.print("Reversed array: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
    expected: "Reversed array: 5 4 3 2 1 ",
    analogy: "Two people standing at opposite ends of a row of chairs, walking toward the center and swapping seats as they meet.",
    mistake: "Allocating a brand new array when an in-place swap can achieve O(1) auxiliary space.",
    quizQ: "What is the time complexity of reversing an array of size n in-place?",
    quizOpts: ["O(n^2)", "O(n)", "O(log n)", "O(1)"],
    correctIdx: 1
  },
  {
    id: 'java-arrays-utility',
    title: 'The java.util.Arrays Utility Class',
    subtitle: 'High-Performance Dual-Pivot Quicksort, Binary Search, and Printable Formatting',
    order: 3,
    code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {45, 12, 85, 32, 10};

        // Sort ascending
        Arrays.sort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));

        // Binary search on sorted array
        int index = Arrays.binarySearch(numbers, 32);
        System.out.println("Found 32 at index: " + index);
    }
}`,
    expected: "Sorted: [10, 12, 32, 45, 85]\\nFound 32 at index: 2",
    analogy: "A master organizer who sorts files alphabetically so you can use binary search (flipping to the middle of the phonebook) in seconds.",
    mistake: "Calling Arrays.binarySearch on an unsorted array, which produces unpredictable negative results.",
    quizQ: "What must be true before calling Arrays.binarySearch() on an array?",
    quizOpts: ["Array must be empty", "Array must be sorted in ascending order", "Array must contain only unique values", "Array must be primitive double"],
    correctIdx: 1
  },
  {
    id: 'java-2d-matrices',
    title: 'Multidimensional Arrays (2D Matrices & Grids)',
    subtitle: 'Tabular Grids, Row-Major Indexing: matrix[row][col]',
    order: 4,
    code: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("Center element [1][1]: " + matrix[1][1]);
        System.out.println("Matrix dimensions: " + matrix.length + "x" + matrix[0].length);
    }
}`,
    expected: "Center element [1][1]: 5\\nMatrix dimensions: 3x3",
    analogy: "A chessboard or Excel spreadsheet with rows (horizontal) and columns (vertical).",
    mistake: "Inverting row and column coordinates: matrix[col][row] instead of matrix[row][col].",
    quizQ: "How do you access the element in the 3rd row and 2nd column of matrix?",
    quizOpts: ["matrix[3][2]", "matrix[2][1]", "matrix[1][2]", "matrix(2, 1)"],
    correctIdx: 1
  },
  {
    id: 'java-jagged-arrays',
    title: 'Jagged (Ragged) Arrays in Java',
    subtitle: 'Arrays of Arrays with Varying Row Lengths',
    order: 5,
    code: `public class Main {
    public static void main(String[] args) {
        // Allocate ragged array where rows have different lengths
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{1};
        jagged[1] = new int[]{2, 3};
        jagged[2] = new int[]{4, 5, 6};

        System.out.println("Row 0 length: " + jagged[0].length);
        System.out.println("Row 1 length: " + jagged[1].length);
        System.out.println("Row 2 length: " + jagged[2].length);
    }
}`,
    expected: "Row 0 length: 1\\nRow 1 length: 2\\nRow 2 length: 3",
    analogy: "A pyramid bookshelf where the top shelf only holds 1 book, the middle holds 2, and the bottom holds 3.",
    mistake: "Accessing jagged[i][j] before allocating jagged[i], causing a NullPointerException.",
    quizQ: "In Java, what is a 2D array under the hood?",
    quizOpts: ["A single contiguous 1D memory buffer", "An array of references to other independent 1D array objects", "A matrix struct", "A pointer table in C"],
    correctIdx: 1
  },
  {
    id: 'java-string-methods',
    title: 'String Class Internals & Essential Methods',
    subtitle: 'Exploring charAt, substring, indexOf, toUpperCase, and trim',
    order: 6,
    code: `public class Main {
    public static void main(String[] args) {
        String text = "  Learn Java Programming  ";
        String clean = text.trim();

        System.out.println("Length: " + clean.length());
        System.out.println("Character at 0: " + clean.charAt(0));
        System.out.println("Substring [6..10]: '" + clean.substring(6, 10) + "'");
        System.out.println("Index of 'Java': " + clean.indexOf("Java"));
    }
}`,
    expected: "Length: 22\\nCharacter at 0: L\\nSubstring [6..10]: 'Java'\\nIndex of 'Java': 6",
    analogy: "A high-precision Swiss army knife for text analysis: measuring, slicing, cleaning whitespace, and finding keywords.",
    mistake: "Remembering that substring(start, end) includes start but EXCLUDES end.",
    quizQ: "What does text.substring(0, 3) return for text = \"Java\"?",
    quizOpts: ["\"Java\"", "\"Jav\"", "\"av\"", "\"J\""],
    correctIdx: 1
  },
  {
    id: 'java-string-equality',
    title: 'String Equality: == vs .equals() vs compareTo()',
    subtitle: 'Identity Comparison vs Content Comparison vs Lexicographical Sorting',
    order: 7,
    code: `public class Main {
    public static void main(String[] args) {
        String a = new String("Apple");
        String b = new String("Apple");

        System.out.println("a == b (Memory Address): " + (a == b));
        System.out.println("a.equals(b) (Characters): " + a.equals(b));
        System.out.println("a.compareTo(\"Banana\"): " + a.compareTo("Banana")); // Negative because A < B
    }
}`,
    expected: "a == b (Memory Address): false\\na.equals(b) (Characters): true\\na.compareTo(\"Banana\"): -1",
    analogy: "Two identical paperback copies of the same novel: == checks if they are the exact same physical copy in your hand (false). .equals() checks if the text inside the books matches word for word (true).",
    mistake: "Using == in if-conditions to compare string text.",
    quizQ: "What does str1.compareTo(str2) return if str1 is lexicographically smaller than str2?",
    quizOpts: ["A positive integer", "Zero", "A negative integer", "false"],
    correctIdx: 2
  },
  {
    id: 'java-stringbuilder',
    title: 'StringBuilder vs StringBuffer vs String',
    subtitle: 'High-Speed Mutable Character Sequences without Heap Allocation Thrashing',
    order: 8,
    code: `public class Main {
    public static void main(String[] args) {
        // StringBuilder modifies character buffer in-place
        StringBuilder sb = new StringBuilder("Java");
        sb.append(" Mastery");
        sb.append(" Lab");
        sb.insert(4, " 17");

        System.out.println("Result: " + sb.toString());
        System.out.println("Reversed: " + sb.reverse().toString());
    }
}`,
    expected: "Result: Java 17 Mastery Lab\\nReversed: baL yretsaM 71 avaJ",
    analogy: "A dry-erase whiteboard (StringBuilder) where you can add, insert, or erase words in-place, compared to printing a new sheet of paper for every single letter added (String concatenation).",
    mistake: "Concatenating strings inside a heavy loop using '+' operator, which creates O(n^2) garbage objects on the Heap.",
    quizQ: "Why is StringBuilder preferred over StringBuffer in single-threaded environments?",
    quizOpts: ["It has more methods", "It is not synchronized, making it significantly faster", "It uses less memory per character", "It supports emojis"],
    correctIdx: 1
  },
  {
    id: 'java-regex-patterns',
    title: 'Regular Expressions & Pattern Matching',
    subtitle: 'Validating Formats, Extracting Tokens, and Text Transformations',
    order: 9,
    code: `public class Main {
    public static void main(String[] args) {
        String email = "student@javalab.org";
        boolean isValid = email.matches("^[\\\\w.-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,6}$");
        System.out.println("Is valid email: " + isValid);

        String text = "Java101Python202Rust303";
        String[] words = text.split("\\\\d+");
        System.out.println("Extracted: " + java.util.Arrays.toString(words));
    }
}`,
    expected: "Is valid email: true\\nExtracted: [Java, Python, Rust]",
    analogy: "A passport scanner at border control checking if the barcode strictly matches the official national security format pattern.",
    mistake: "Forgetting to double-escape backslashes in Java regex strings (e.g. \\\\d instead of \\d).",
    quizQ: "What regex character class matches one or more digits in Java?",
    quizOpts: ["\\d*", "\\\\d+", "\\num", "[0-9]?"],
    correctIdx: 1
  },
  {
    id: 'java-string-algorithms',
    title: 'Practical String Algorithms: Palindromes & Anagrams',
    subtitle: 'Two-Pointer Technique, Character Frequency Hashing, and Invariant Verification',
    order: 10,
    code: `import java.util.Arrays;

public class Main {
    public static boolean isAnagram(String s1, String s2) {
        char[] a1 = s1.toLowerCase().toCharArray();
        char[] a2 = s2.toLowerCase().toCharArray();
        Arrays.sort(a1);
        Arrays.sort(a2);
        return Arrays.equals(a1, a2);
    }

    public static void main(String[] args) {
        String w1 = "listen";
        String w2 = "silent";
        System.out.println("'" + w1 + "' and '" + w2 + "' are anagrams: " + isAnagram(w1, w2));
    }
}`,
    expected: "'listen' and 'silent' are anagrams: true",
    analogy: "Rearranging letters in a Scrabble tile rack: if both words use the exact same frequency of letter tiles, they are anagrams.",
    mistake: "Neglecting case sensitivity ('Listen' vs 'silent') when checking anagrams without toLowerCase().",
    quizQ: "What is an anagram?",
    quizOpts: ["A word that reads the same backward", "A word formed by rearranging the exact letters of another word", "A palindrome with digits", "A substring of a larger text"],
    correctIdx: 1
  }
];

m4TopicTemplates.forEach(t => {
  m4Lessons[t.id] = {
    id: t.id,
    moduleId: 'java-module-4',
    title: t.title,
    subtitle: t.subtitle,
    order: t.order,
    readTimeMinutes: 15,
    difficulty: t.order > 8 ? 'Intermediate' : 'Beginner',
    visualizerType: t.id.includes('equality') || t.id.includes('stringbuilder') ? 'memory-model' : 'array-algorithm',
    objectives: [
      `Master ${t.title}.`,
      'Understand heap representation of arrays and strings.',
      'Optimize algorithmic time and space complexity.'
    ],
    prerequisites: ['Module 3: Conditions and Loops'],
    analogy: {
      title: t.title + ' Metaphor',
      text: t.analogy,
      metaphor: t.analogy
    },
    problemSolved: {
      title: 'Efficient Sequential Memory Storage and Text Processing',
      description: 'Handling collections of values and strings with high efficiency and minimal memory overhead.',
      keyPoints: ['Contiguous memory addressing', 'Immutable vs mutable string buffers', 'O(1) index access']
    },
    intuition: {
      overview: `Internal JVM mechanisms behind ${t.title}.`,
      steps: [
        { step: 1, title: 'Memory Layout', description: 'Arrays allocated as contiguous heap objects with fixed length.' },
        { step: 2, title: 'Pointer Traversal', description: 'Index offset calculated by multiplying index by element type size.' },
        { step: 3, title: 'Bounds Checking', description: 'JVM enforces bounds at runtime to prevent buffer overflows.' }
      ]
    },
    codeExample: {
      title: `Demonstrating ${t.title}`,
      code: t.code,
      explanation: `Examine the implementation of ${t.title}.`
    },
    runnableCode: {
      code: t.code,
      expectedOutput: t.expected
    },
    lineByLineExplanation: [
      { lines: '1-4', codeSnippet: 'public class Main { ... }', explanation: 'Class structure and execution method.' },
      { lines: '5-12', codeSnippet: '// Core array or string logic', explanation: 'Data structure manipulation.' }
    ],
    commonMistakes: [
      {
        mistake: t.mistake,
        solution: 'Follow idiomatic Java practices.',
        whyWrong: 'Violating bounds or using reference comparison leads to errors.'
      }
    ],
    bestPractices: [
      'Use StringBuilder for loop concatenations.',
      'Always verify array length before indexing.'
    ],
    applications: [
      { industry: 'Data Processing', useCase: 'High-throughput parsing of logs, matrices, and JSON payloads.' }
    ],
    practiceQuestions: [
      {
        id: `pq-${t.id}`,
        question: t.quizQ,
        answer: t.quizOpts[t.correctIdx],
        explanation: 'Standard Java behavior.'
      }
    ],
    quiz: [
      {
        id: `qz-${t.id}`,
        question: t.quizQ,
        options: t.quizOpts,
        correctIndex: t.correctIdx,
        explanation: 'Verified by the Java Language Specification.'
      }
    ],
    codingChallenge: {
      id: `ch-${t.id}`,
      title: `Exercise: ${t.title}`,
      difficulty: 'Beginner',
      description: `Write a program that uses ${t.title} to complete the task.`,
      starterCode: t.code,
      hints: ['Review the lesson example above.'],
      solutionCode: t.code
    },
    summary: {
      keyTakeaways: [
        `Mastered ${t.title}.`,
        'Understood array memory layout and string pool mechanics.',
        'Ready for Methods and Recursion in Module 5.'
      ],
      nextLessonId: t.order === 10 ? 'java-methods-structure' : m4Data.lessons[t.order].id,
      nextLessonTitle: t.order === 10 ? 'Method Structure and Return Types' : m4Data.lessons[t.order].title,
      nextLessonModuleId: t.order === 10 ? 'java-module-5' : 'java-module-4'
    }
  };
});

writeModule(path.join(__dirname, '../src/data/java/java-module-4.ts'), 'javaModule4Data', 'javaModule4Lessons', m4Data, m4Lessons);
console.log('Modules 2, 3, 4 authored successfully!');
