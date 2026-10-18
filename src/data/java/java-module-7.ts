import { JavaModuleData, JavaLessonContent } from '@/lib/types';

export const javaModule7Data: JavaModuleData = {
  "id": "java-module-7",
  "number": 7,
  "title": "Advanced OOP",
  "subtitle": "Inheritance, Polymorphism, Abstraction, Interfaces & Composition",
  "order": 7,
  "icon": "GitBranch",
  "badge": "Polymorphic Design",
  "estimatedHours": 11,
  "topicsCount": 10,
  "description": "Master enterprise-level object-oriented architecture. Explore single inheritance with extends, superclass constructor chaining, dynamic method dispatch, the Object class root hierarchy, abstract classes vs interfaces, default methods, and composition.",
  "lessons": [
    {
      "id": "java-inheritance-extends",
      "moduleId": "java-module-7",
      "title": "Inheritance with the extends Keyword (IS-A)",
      "description": "Subclassing, inheriting fields and methods, and the IS-A conceptual relationship.",
      "order": 1,
      "readTimeMinutes": 15,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-super-keyword",
      "moduleId": "java-module-7",
      "title": "The super Keyword: Superclass Constructors & Methods",
      "description": "Chaining parent constructors super() and accessing shadowed superclass methods.",
      "order": 2,
      "readTimeMinutes": 14,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-method-overriding",
      "moduleId": "java-module-7",
      "title": "Method Overriding and the @Override Annotation",
      "description": "Providing specialized subclass behavior while preserving method signatures.",
      "order": 3,
      "readTimeMinutes": 15,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-polymorphism-dispatch",
      "moduleId": "java-module-7",
      "title": "Runtime Polymorphism & Dynamic Method Dispatch",
      "description": "Superclass references pointing to subclass instances and JVM vtable lookups.",
      "order": 4,
      "readTimeMinutes": 18,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-object-methods",
      "moduleId": "java-module-7",
      "title": "The Root java.lang.Object Class (toString, equals, hashCode)",
      "description": "Overriding standard contract methods for all Java reference types.",
      "order": 5,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "java-abstract-classes",
      "moduleId": "java-module-7",
      "title": "Abstract Classes and Abstract Methods",
      "description": "Incomplete base classes that mandate implementation in concrete subclasses.",
      "order": 6,
      "readTimeMinutes": 15,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-interfaces",
      "moduleId": "java-module-7",
      "title": "Interfaces in Java: Strict Behavioral Contracts",
      "description": "The implements keyword, multiple interface implementation, and decoupling.",
      "order": 7,
      "readTimeMinutes": 16,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Beginner"
    },
    {
      "id": "java-default-methods",
      "moduleId": "java-module-7",
      "title": "Default and Static Methods in Interfaces (Java 8+)",
      "description": "Evolving interfaces without breaking backward compatibility using default methods.",
      "order": 8,
      "readTimeMinutes": 14,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-composition-over-inheritance",
      "moduleId": "java-module-7",
      "title": "Composition vs Inheritance (HAS-A vs IS-A)",
      "description": "Why favoring composition yields more flexible, loosely coupled software designs.",
      "order": 9,
      "readTimeMinutes": 16,
      "visualizerType": "oop-hierarchy",
      "difficulty": "Intermediate"
    },
    {
      "id": "java-final-immutable",
      "moduleId": "java-module-7",
      "title": "Final Classes, Final Methods & Immutable Design",
      "description": "Preventing subclassing, securing method logic, and crafting immutable value objects.",
      "order": 10,
      "readTimeMinutes": 16,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    }
  ]
};

export const javaModule7Lessons: Record<string, JavaLessonContent> = {
  "java-inheritance-extends": {
    "id": "java-inheritance-extends",
    "moduleId": "java-module-7",
    "title": "Inheritance with the extends Keyword (IS-A)",
    "subtitle": "Reusing Base Logic and Specializing Domain Classes with Single Inheritance",
    "order": 1,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Inheritance with the extends Keyword (IS-A).",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "Inheritance with the extends Keyword (IS-A) Metaphor",
      "text": "Biological inheritance: a child inherits genetic traits (eye color, hair) from their biological parents, and can also develop unique talents of their own.",
      "metaphor": "Biological inheritance: a child inherits genetic traits (eye color, hair) from their biological parents, and can also develop unique talents of their own."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of Inheritance with the extends Keyword (IS-A).",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Inheritance with the extends Keyword (IS-A)",
      "code": "class Vehicle {\n    String brand = \"Ford\";\n    void honk() { System.out.println(\"Beep! Beep!\"); }\n}\n\nclass Car extends Vehicle {\n    int doors = 4;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n        myCar.honk(); // Inherited from Vehicle!\n        System.out.println(\"Brand: \" + myCar.brand + \", Doors: \" + myCar.doors);\n    }\n}",
      "explanation": "Examine the OOP structure of Inheritance with the extends Keyword (IS-A)."
    },
    "runnableCode": {
      "code": "class Vehicle {\n    String brand = \"Ford\";\n    void honk() { System.out.println(\"Beep! Beep!\"); }\n}\n\nclass Car extends Vehicle {\n    int doors = 4;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n        myCar.honk(); // Inherited from Vehicle!\n        System.out.println(\"Brand: \" + myCar.brand + \", Doors: \" + myCar.doors);\n    }\n}",
      "expectedOutput": "Beep! Beep!\\nBrand: Ford, Doors: 4"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting multiple class inheritance (class Car extends Vehicle, Machine); Java permits extending only ONE class.",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-inheritance-extends",
        "question": "Can a Java class extend more than one superclass directly?",
        "answer": "No, Java supports single inheritance of state only",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-inheritance-extends",
        "question": "Can a Java class extend more than one superclass directly?",
        "options": [
          "Yes, separated by commas",
          "No, Java supports single inheritance of state only",
          "Yes, in Java 17+",
          "Only if both are abstract"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-inheritance-extends",
      "title": "Exercise: Inheritance with the extends Keyword (IS-A)",
      "difficulty": "Beginner",
      "description": "Implement Inheritance with the extends Keyword (IS-A) to complete the polymorphic design task.",
      "starterCode": "class Vehicle {\n    String brand = \"Ford\";\n    void honk() { System.out.println(\"Beep! Beep!\"); }\n}\n\nclass Car extends Vehicle {\n    int doors = 4;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n        myCar.honk(); // Inherited from Vehicle!\n        System.out.println(\"Brand: \" + myCar.brand + \", Doors: \" + myCar.doors);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Vehicle {\n    String brand = \"Ford\";\n    void honk() { System.out.println(\"Beep! Beep!\"); }\n}\n\nclass Car extends Vehicle {\n    int doors = 4;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n        myCar.honk(); // Inherited from Vehicle!\n        System.out.println(\"Brand: \" + myCar.brand + \", Doors: \" + myCar.doors);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Inheritance with the extends Keyword (IS-A).",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-super-keyword",
      "nextLessonTitle": "The super Keyword: Superclass Constructors & Methods",
      "nextLessonModuleId": "java-module-7"
    }
  },
  "java-super-keyword": {
    "id": "java-super-keyword",
    "moduleId": "java-module-7",
    "title": "The super Keyword: Superclass Constructors & Methods",
    "subtitle": "Invoking Parent Constructors and Accessing Overridden Superclass Methods",
    "order": 2,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master The super Keyword: Superclass Constructors & Methods.",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "The super Keyword: Superclass Constructors & Methods Metaphor",
      "text": "Phoning your parent for instructions: super() delegates the foundation setup to the parent class before you do your own specialized work.",
      "metaphor": "Phoning your parent for instructions: super() delegates the foundation setup to the parent class before you do your own specialized work."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of The super Keyword: Superclass Constructors & Methods.",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The super Keyword: Superclass Constructors & Methods",
      "code": "class Animal {\n    String name;\n    public Animal(String name) { this.name = name; }\n}\n\nclass Dog extends Animal {\n    String breed;\n    public Dog(String name, String breed) {\n        super(name); // Must be first line!\n        this.breed = breed;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog(\"Buddy\", \"Golden Retriever\");\n        System.out.println(d.name + \" is a \" + d.breed);\n    }\n}",
      "explanation": "Examine the OOP structure of The super Keyword: Superclass Constructors & Methods."
    },
    "runnableCode": {
      "code": "class Animal {\n    String name;\n    public Animal(String name) { this.name = name; }\n}\n\nclass Dog extends Animal {\n    String breed;\n    public Dog(String name, String breed) {\n        super(name); // Must be first line!\n        this.breed = breed;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog(\"Buddy\", \"Golden Retriever\");\n        System.out.println(d.name + \" is a \" + d.breed);\n    }\n}",
      "expectedOutput": "Buddy is a Golden Retriever"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Calling super() after doing other assignments; super() MUST be the very first line of a subclass constructor.",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-super-keyword",
        "question": "What keyword is used to call a superclass constructor from a subclass constructor?",
        "answer": "super()",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-super-keyword",
        "question": "What keyword is used to call a superclass constructor from a subclass constructor?",
        "options": [
          "this()",
          "super()",
          "parent()",
          "base()"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-super-keyword",
      "title": "Exercise: The super Keyword: Superclass Constructors & Methods",
      "difficulty": "Beginner",
      "description": "Implement The super Keyword: Superclass Constructors & Methods to complete the polymorphic design task.",
      "starterCode": "class Animal {\n    String name;\n    public Animal(String name) { this.name = name; }\n}\n\nclass Dog extends Animal {\n    String breed;\n    public Dog(String name, String breed) {\n        super(name); // Must be first line!\n        this.breed = breed;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog(\"Buddy\", \"Golden Retriever\");\n        System.out.println(d.name + \" is a \" + d.breed);\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Animal {\n    String name;\n    public Animal(String name) { this.name = name; }\n}\n\nclass Dog extends Animal {\n    String breed;\n    public Dog(String name, String breed) {\n        super(name); // Must be first line!\n        this.breed = breed;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog(\"Buddy\", \"Golden Retriever\");\n        System.out.println(d.name + \" is a \" + d.breed);\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The super Keyword: Superclass Constructors & Methods.",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-method-overriding",
      "nextLessonTitle": "Method Overriding and the @Override Annotation",
      "nextLessonModuleId": "java-module-7"
    }
  },
  "java-method-overriding": {
    "id": "java-method-overriding",
    "moduleId": "java-module-7",
    "title": "Method Overriding and the @Override Annotation",
    "subtitle": "Redefining Inherited Methods to Provide Subclass-Specific Implementations",
    "order": 3,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Method Overriding and the @Override Annotation.",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "Method Overriding and the @Override Annotation Metaphor",
      "text": "A musical cover song: you take the standard sheet music (superclass method) but play it in your own unique jazz style (overridden subclass method).",
      "metaphor": "A musical cover song: you take the standard sheet music (superclass method) but play it in your own unique jazz style (overridden subclass method)."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of Method Overriding and the @Override Annotation.",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Method Overriding and the @Override Annotation",
      "code": "class Animal {\n    void makeSound() { System.out.println(\"Some generic animal sound\"); }\n}\n\nclass Cat extends Animal {\n    @Override\n    void makeSound() { System.out.println(\"Meow! Purr!\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Animal();\n        Animal c = new Cat();\n        a.makeSound();\n        c.makeSound(); // Overridden method invoked!\n    }\n}",
      "explanation": "Examine the OOP structure of Method Overriding and the @Override Annotation."
    },
    "runnableCode": {
      "code": "class Animal {\n    void makeSound() { System.out.println(\"Some generic animal sound\"); }\n}\n\nclass Cat extends Animal {\n    @Override\n    void makeSound() { System.out.println(\"Meow! Purr!\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Animal();\n        Animal c = new Cat();\n        a.makeSound();\n        c.makeSound(); // Overridden method invoked!\n    }\n}",
      "expectedOutput": "Some generic animal sound\\nMeow! Purr!"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accidentally overloading instead of overriding (e.g. changing the parameter type); @Override catches this error at compile time.",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-method-overriding",
        "question": "What is the purpose of the @Override annotation in Java?",
        "answer": "Instructs compiler to verify the method accurately overrides an inherited method",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-method-overriding",
        "question": "What is the purpose of the @Override annotation in Java?",
        "options": [
          "Makes code run faster",
          "Instructs compiler to verify the method accurately overrides an inherited method",
          "Allows multiple inheritance",
          "Eliminates need for public"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-method-overriding",
      "title": "Exercise: Method Overriding and the @Override Annotation",
      "difficulty": "Beginner",
      "description": "Implement Method Overriding and the @Override Annotation to complete the polymorphic design task.",
      "starterCode": "class Animal {\n    void makeSound() { System.out.println(\"Some generic animal sound\"); }\n}\n\nclass Cat extends Animal {\n    @Override\n    void makeSound() { System.out.println(\"Meow! Purr!\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Animal();\n        Animal c = new Cat();\n        a.makeSound();\n        c.makeSound(); // Overridden method invoked!\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Animal {\n    void makeSound() { System.out.println(\"Some generic animal sound\"); }\n}\n\nclass Cat extends Animal {\n    @Override\n    void makeSound() { System.out.println(\"Meow! Purr!\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Animal();\n        Animal c = new Cat();\n        a.makeSound();\n        c.makeSound(); // Overridden method invoked!\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Method Overriding and the @Override Annotation.",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-polymorphism-dispatch",
      "nextLessonTitle": "Runtime Polymorphism & Dynamic Method Dispatch",
      "nextLessonModuleId": "java-module-7"
    }
  },
  "java-polymorphism-dispatch": {
    "id": "java-polymorphism-dispatch",
    "moduleId": "java-module-7",
    "title": "Runtime Polymorphism & Dynamic Method Dispatch",
    "subtitle": "Superclass References, Subclass Instances, and Virtual Method Tables",
    "order": 4,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Runtime Polymorphism & Dynamic Method Dispatch.",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "Runtime Polymorphism & Dynamic Method Dispatch Metaphor",
      "text": "A universal remote control with a 'Play' button: if pointed at a DVD player it spins the disc; if pointed at Netflix it streams video. The remote button is the same (Shape.draw), but the target device reacts accordingly.",
      "metaphor": "A universal remote control with a 'Play' button: if pointed at a DVD player it spins the disc; if pointed at Netflix it streams video. The remote button is the same (Shape.draw), but the target device reacts accordingly."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of Runtime Polymorphism & Dynamic Method Dispatch.",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Runtime Polymorphism & Dynamic Method Dispatch",
      "code": "class Shape {\n    void draw() { System.out.println(\"Drawing a shape\"); }\n}\n\nclass Circle extends Shape {\n    @Override void draw() { System.out.println(\"Drawing a Circle ⭕\"); }\n}\n\nclass Square extends Shape {\n    @Override void draw() { System.out.println(\"Drawing a Square ⬛\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape[] shapes = { new Circle(), new Square(), new Shape() };\n        for (Shape s : shapes) {\n            s.draw(); // Dynamic dispatch determines exact method at runtime!\n        }\n    }\n}",
      "explanation": "Examine the OOP structure of Runtime Polymorphism & Dynamic Method Dispatch."
    },
    "runnableCode": {
      "code": "class Shape {\n    void draw() { System.out.println(\"Drawing a shape\"); }\n}\n\nclass Circle extends Shape {\n    @Override void draw() { System.out.println(\"Drawing a Circle ⭕\"); }\n}\n\nclass Square extends Shape {\n    @Override void draw() { System.out.println(\"Drawing a Square ⬛\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape[] shapes = { new Circle(), new Square(), new Shape() };\n        for (Shape s : shapes) {\n            s.draw(); // Dynamic dispatch determines exact method at runtime!\n        }\n    }\n}",
      "expectedOutput": "Drawing a Circle ⭕\\nDrawing a Square ⬛\\nDrawing a shape"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming the compiler decides which overridden method to run; the decision happens at runtime via dynamic dispatch.",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-polymorphism-dispatch",
        "question": "What determines which overridden method executes in runtime polymorphism?",
        "answer": "The actual heap object type at runtime",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-polymorphism-dispatch",
        "question": "What determines which overridden method executes in runtime polymorphism?",
        "options": [
          "The variable reference type",
          "The actual heap object type at runtime",
          "The compiler's optimization level",
          "The package location"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-polymorphism-dispatch",
      "title": "Exercise: Runtime Polymorphism & Dynamic Method Dispatch",
      "difficulty": "Beginner",
      "description": "Implement Runtime Polymorphism & Dynamic Method Dispatch to complete the polymorphic design task.",
      "starterCode": "class Shape {\n    void draw() { System.out.println(\"Drawing a shape\"); }\n}\n\nclass Circle extends Shape {\n    @Override void draw() { System.out.println(\"Drawing a Circle ⭕\"); }\n}\n\nclass Square extends Shape {\n    @Override void draw() { System.out.println(\"Drawing a Square ⬛\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape[] shapes = { new Circle(), new Square(), new Shape() };\n        for (Shape s : shapes) {\n            s.draw(); // Dynamic dispatch determines exact method at runtime!\n        }\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Shape {\n    void draw() { System.out.println(\"Drawing a shape\"); }\n}\n\nclass Circle extends Shape {\n    @Override void draw() { System.out.println(\"Drawing a Circle ⭕\"); }\n}\n\nclass Square extends Shape {\n    @Override void draw() { System.out.println(\"Drawing a Square ⬛\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape[] shapes = { new Circle(), new Square(), new Shape() };\n        for (Shape s : shapes) {\n            s.draw(); // Dynamic dispatch determines exact method at runtime!\n        }\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Runtime Polymorphism & Dynamic Method Dispatch.",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-object-methods",
      "nextLessonTitle": "The Root java.lang.Object Class (toString, equals, hashCode)",
      "nextLessonModuleId": "java-module-7"
    }
  },
  "java-object-methods": {
    "id": "java-object-methods",
    "moduleId": "java-module-7",
    "title": "The Root java.lang.Object Class (toString, equals, hashCode)",
    "subtitle": "Implementing Universal Contracts for String Representation and Structural Equality",
    "order": 5,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master The Root java.lang.Object Class (toString, equals, hashCode).",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "The Root java.lang.Object Class (toString, equals, hashCode) Metaphor",
      "text": "A passport photo and fingerprint: toString() is the readable human photo; equals() & hashCode() verify physical biometric match.",
      "metaphor": "A passport photo and fingerprint: toString() is the readable human photo; equals() & hashCode() verify physical biometric match."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of The Root java.lang.Object Class (toString, equals, hashCode).",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating The Root java.lang.Object Class (toString, equals, hashCode)",
      "code": "class Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n\n    @Override\n    public String toString() { return \"(\" + x + \", \" + y + \")\"; }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Point)) return false;\n        Point p = (Point) o;\n        return this.x == p.x && this.y == p.y;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Point p1 = new Point(3, 4);\n        Point p2 = new Point(3, 4);\n        System.out.println(\"Point p1: \" + p1);\n        System.out.println(\"p1.equals(p2): \" + p1.equals(p2));\n    }\n}",
      "explanation": "Examine the OOP structure of The Root java.lang.Object Class (toString, equals, hashCode)."
    },
    "runnableCode": {
      "code": "class Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n\n    @Override\n    public String toString() { return \"(\" + x + \", \" + y + \")\"; }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Point)) return false;\n        Point p = (Point) o;\n        return this.x == p.x && this.y == p.y;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Point p1 = new Point(3, 4);\n        Point p2 = new Point(3, 4);\n        System.out.println(\"Point p1: \" + p1);\n        System.out.println(\"p1.equals(p2): \" + p1.equals(p2));\n    }\n}",
      "expectedOutput": "Point p1: (3, 4)\\np1.equals(p2): true"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Overriding equals() without overriding hashCode(), which breaks HashMaps and HashSets completely.",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-object-methods",
        "question": "What class is the ultimate superclass of all classes in Java?",
        "answer": "java.lang.Object",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-object-methods",
        "question": "What class is the ultimate superclass of all classes in Java?",
        "options": [
          "Class",
          "java.lang.Object",
          "java.lang.System",
          "Root"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-object-methods",
      "title": "Exercise: The Root java.lang.Object Class (toString, equals, hashCode)",
      "difficulty": "Beginner",
      "description": "Implement The Root java.lang.Object Class (toString, equals, hashCode) to complete the polymorphic design task.",
      "starterCode": "class Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n\n    @Override\n    public String toString() { return \"(\" + x + \", \" + y + \")\"; }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Point)) return false;\n        Point p = (Point) o;\n        return this.x == p.x && this.y == p.y;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Point p1 = new Point(3, 4);\n        Point p2 = new Point(3, 4);\n        System.out.println(\"Point p1: \" + p1);\n        System.out.println(\"p1.equals(p2): \" + p1.equals(p2));\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n\n    @Override\n    public String toString() { return \"(\" + x + \", \" + y + \")\"; }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Point)) return false;\n        Point p = (Point) o;\n        return this.x == p.x && this.y == p.y;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Point p1 = new Point(3, 4);\n        Point p2 = new Point(3, 4);\n        System.out.println(\"Point p1: \" + p1);\n        System.out.println(\"p1.equals(p2): \" + p1.equals(p2));\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered The Root java.lang.Object Class (toString, equals, hashCode).",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-abstract-classes",
      "nextLessonTitle": "Abstract Classes and Abstract Methods",
      "nextLessonModuleId": "java-module-7"
    }
  },
  "java-abstract-classes": {
    "id": "java-abstract-classes",
    "moduleId": "java-module-7",
    "title": "Abstract Classes and Abstract Methods",
    "subtitle": "Defining Incomplete Blueprints That Cannot Be Directly Instantiated",
    "order": 6,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Abstract Classes and Abstract Methods.",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "Abstract Classes and Abstract Methods Metaphor",
      "text": "An architectural blueprint marked 'Residential Building': you cannot sleep inside a blueprint on paper; you must construct an actual concrete house from it first.",
      "metaphor": "An architectural blueprint marked 'Residential Building': you cannot sleep inside a blueprint on paper; you must construct an actual concrete house from it first."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of Abstract Classes and Abstract Methods.",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Abstract Classes and Abstract Methods",
      "code": "abstract class Employee {\n    String name;\n    Employee(String name) { this.name = name; }\n\n    // Abstract method: no body! Must be implemented by subclasses\n    abstract double calculateSalary();\n}\n\nclass FullTimeEmployee extends Employee {\n    double monthlySalary;\n    FullTimeEmployee(String name, double salary) {\n        super(name);\n        this.monthlySalary = salary;\n    }\n    @Override double calculateSalary() { return monthlySalary; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new FullTimeEmployee(\"Sarah\", 5000.0);\n        System.out.println(emp.name + \" earns: $\" + emp.calculateSalary());\n    }\n}",
      "explanation": "Examine the OOP structure of Abstract Classes and Abstract Methods."
    },
    "runnableCode": {
      "code": "abstract class Employee {\n    String name;\n    Employee(String name) { this.name = name; }\n\n    // Abstract method: no body! Must be implemented by subclasses\n    abstract double calculateSalary();\n}\n\nclass FullTimeEmployee extends Employee {\n    double monthlySalary;\n    FullTimeEmployee(String name, double salary) {\n        super(name);\n        this.monthlySalary = salary;\n    }\n    @Override double calculateSalary() { return monthlySalary; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new FullTimeEmployee(\"Sarah\", 5000.0);\n        System.out.println(emp.name + \" earns: $\" + emp.calculateSalary());\n    }\n}",
      "expectedOutput": "Sarah earns: $5000.0"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to create an object directly from an abstract class (new Employee()).",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-abstract-classes",
        "question": "Can an abstract class be instantiated directly with the new keyword?",
        "answer": "No, abstract classes cannot be directly instantiated",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-abstract-classes",
        "question": "Can an abstract class be instantiated directly with the new keyword?",
        "options": [
          "Yes, if it has a constructor",
          "No, abstract classes cannot be directly instantiated",
          "Yes, in Java 17+",
          "Only inside the same package"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-abstract-classes",
      "title": "Exercise: Abstract Classes and Abstract Methods",
      "difficulty": "Beginner",
      "description": "Implement Abstract Classes and Abstract Methods to complete the polymorphic design task.",
      "starterCode": "abstract class Employee {\n    String name;\n    Employee(String name) { this.name = name; }\n\n    // Abstract method: no body! Must be implemented by subclasses\n    abstract double calculateSalary();\n}\n\nclass FullTimeEmployee extends Employee {\n    double monthlySalary;\n    FullTimeEmployee(String name, double salary) {\n        super(name);\n        this.monthlySalary = salary;\n    }\n    @Override double calculateSalary() { return monthlySalary; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new FullTimeEmployee(\"Sarah\", 5000.0);\n        System.out.println(emp.name + \" earns: $\" + emp.calculateSalary());\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "abstract class Employee {\n    String name;\n    Employee(String name) { this.name = name; }\n\n    // Abstract method: no body! Must be implemented by subclasses\n    abstract double calculateSalary();\n}\n\nclass FullTimeEmployee extends Employee {\n    double monthlySalary;\n    FullTimeEmployee(String name, double salary) {\n        super(name);\n        this.monthlySalary = salary;\n    }\n    @Override double calculateSalary() { return monthlySalary; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new FullTimeEmployee(\"Sarah\", 5000.0);\n        System.out.println(emp.name + \" earns: $\" + emp.calculateSalary());\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Abstract Classes and Abstract Methods.",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-interfaces",
      "nextLessonTitle": "Interfaces in Java: Strict Behavioral Contracts",
      "nextLessonModuleId": "java-module-7"
    }
  },
  "java-interfaces": {
    "id": "java-interfaces",
    "moduleId": "java-module-7",
    "title": "Interfaces in Java: Strict Behavioral Contracts",
    "subtitle": "The implements Keyword, Multiple Interface Support, and Total Decoupling",
    "order": 7,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Interfaces in Java: Strict Behavioral Contracts.",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "Interfaces in Java: Strict Behavioral Contracts Metaphor",
      "text": "A USB-C port standard: any device (mouse, keyboard, monitor) that implements the USB-C contract can plug into your laptop seamlessly.",
      "metaphor": "A USB-C port standard: any device (mouse, keyboard, monitor) that implements the USB-C contract can plug into your laptop seamlessly."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of Interfaces in Java: Strict Behavioral Contracts.",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Interfaces in Java: Strict Behavioral Contracts",
      "code": "interface Drivable { void drive(); }\ninterface Flyable { void fly(); }\n\n// A class can implement multiple interfaces!\nclass FlyingCar implements Drivable, Flyable {\n    @Override public void drive() { System.out.println(\"Driving on highway...\"); }\n    @Override public void fly() { System.out.println(\"Flying in the sky...\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        FlyingCar fc = new FlyingCar();\n        fc.drive();\n        fc.fly();\n    }\n}",
      "explanation": "Examine the OOP structure of Interfaces in Java: Strict Behavioral Contracts."
    },
    "runnableCode": {
      "code": "interface Drivable { void drive(); }\ninterface Flyable { void fly(); }\n\n// A class can implement multiple interfaces!\nclass FlyingCar implements Drivable, Flyable {\n    @Override public void drive() { System.out.println(\"Driving on highway...\"); }\n    @Override public void fly() { System.out.println(\"Flying in the sky...\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        FlyingCar fc = new FlyingCar();\n        fc.drive();\n        fc.fly();\n    }\n}",
      "expectedOutput": "Driving on highway...\\nFlying in the sky..."
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting that all interface methods without a body are public and abstract by default.",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-interfaces",
        "question": "How many interfaces can a single Java class implement?",
        "answer": "Any number of interfaces",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-interfaces",
        "question": "How many interfaces can a single Java class implement?",
        "options": [
          "Only one",
          "Up to two",
          "Any number of interfaces",
          "None"
        ],
        "correctIndex": 2,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-interfaces",
      "title": "Exercise: Interfaces in Java: Strict Behavioral Contracts",
      "difficulty": "Beginner",
      "description": "Implement Interfaces in Java: Strict Behavioral Contracts to complete the polymorphic design task.",
      "starterCode": "interface Drivable { void drive(); }\ninterface Flyable { void fly(); }\n\n// A class can implement multiple interfaces!\nclass FlyingCar implements Drivable, Flyable {\n    @Override public void drive() { System.out.println(\"Driving on highway...\"); }\n    @Override public void fly() { System.out.println(\"Flying in the sky...\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        FlyingCar fc = new FlyingCar();\n        fc.drive();\n        fc.fly();\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "interface Drivable { void drive(); }\ninterface Flyable { void fly(); }\n\n// A class can implement multiple interfaces!\nclass FlyingCar implements Drivable, Flyable {\n    @Override public void drive() { System.out.println(\"Driving on highway...\"); }\n    @Override public void fly() { System.out.println(\"Flying in the sky...\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        FlyingCar fc = new FlyingCar();\n        fc.drive();\n        fc.fly();\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Interfaces in Java: Strict Behavioral Contracts.",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-default-methods",
      "nextLessonTitle": "Default and Static Methods in Interfaces (Java 8+)",
      "nextLessonModuleId": "java-module-7"
    }
  },
  "java-default-methods": {
    "id": "java-default-methods",
    "moduleId": "java-module-7",
    "title": "Default and Static Methods in Interfaces (Java 8+)",
    "subtitle": "Evolving Interfaces Without Breaking Existing Implementing Classes",
    "order": 8,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Default and Static Methods in Interfaces (Java 8+).",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "Default and Static Methods in Interfaces (Java 8+) Metaphor",
      "text": "Adding a new USB accessory to an existing computer: default methods provide built-in default drivers so old hardware doesn't crash.",
      "metaphor": "Adding a new USB accessory to an existing computer: default methods provide built-in default drivers so old hardware doesn't crash."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of Default and Static Methods in Interfaces (Java 8+).",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Default and Static Methods in Interfaces (Java 8+)",
      "code": "interface Logger {\n    void log(String message);\n\n    // Default method provides fallback implementation\n    default void logWarning(String message) {\n        log(\"[WARNING] \" + message);\n    }\n}\n\nclass ConsoleLogger implements Logger {\n    @Override public void log(String message) {\n        System.out.println(message);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Logger logger = new ConsoleLogger();\n        logger.log(\"System normal\");\n        logger.logWarning(\"Disk space low\");\n    }\n}",
      "explanation": "Examine the OOP structure of Default and Static Methods in Interfaces (Java 8+)."
    },
    "runnableCode": {
      "code": "interface Logger {\n    void log(String message);\n\n    // Default method provides fallback implementation\n    default void logWarning(String message) {\n        log(\"[WARNING] \" + message);\n    }\n}\n\nclass ConsoleLogger implements Logger {\n    @Override public void log(String message) {\n        System.out.println(message);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Logger logger = new ConsoleLogger();\n        logger.log(\"System normal\");\n        logger.logWarning(\"Disk space low\");\n    }\n}",
      "expectedOutput": "System normal\\n[WARNING] Disk space low"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming default methods make interfaces identical to abstract classes (interfaces still cannot hold instance state).",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-default-methods",
        "question": "What keyword allows an interface method to provide a default implementation body?",
        "answer": "default",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-default-methods",
        "question": "What keyword allows an interface method to provide a default implementation body?",
        "options": [
          "static",
          "default",
          "concrete",
          "virtual"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-default-methods",
      "title": "Exercise: Default and Static Methods in Interfaces (Java 8+)",
      "difficulty": "Beginner",
      "description": "Implement Default and Static Methods in Interfaces (Java 8+) to complete the polymorphic design task.",
      "starterCode": "interface Logger {\n    void log(String message);\n\n    // Default method provides fallback implementation\n    default void logWarning(String message) {\n        log(\"[WARNING] \" + message);\n    }\n}\n\nclass ConsoleLogger implements Logger {\n    @Override public void log(String message) {\n        System.out.println(message);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Logger logger = new ConsoleLogger();\n        logger.log(\"System normal\");\n        logger.logWarning(\"Disk space low\");\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "interface Logger {\n    void log(String message);\n\n    // Default method provides fallback implementation\n    default void logWarning(String message) {\n        log(\"[WARNING] \" + message);\n    }\n}\n\nclass ConsoleLogger implements Logger {\n    @Override public void log(String message) {\n        System.out.println(message);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Logger logger = new ConsoleLogger();\n        logger.log(\"System normal\");\n        logger.logWarning(\"Disk space low\");\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Default and Static Methods in Interfaces (Java 8+).",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-composition-over-inheritance",
      "nextLessonTitle": "Composition vs Inheritance (HAS-A vs IS-A)",
      "nextLessonModuleId": "java-module-7"
    }
  },
  "java-composition-over-inheritance": {
    "id": "java-composition-over-inheritance",
    "moduleId": "java-module-7",
    "title": "Composition vs Inheritance (HAS-A vs IS-A)",
    "subtitle": "Favoring Object Composition to Avoid Fragile Base Class Hierarchies",
    "order": 9,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Composition vs Inheritance (HAS-A vs IS-A).",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "Composition vs Inheritance (HAS-A vs IS-A) Metaphor",
      "text": "Assembling a modular desktop PC: you don't 'inherit' from a graphics card; your computer 'has a' graphics card plugged into a slot.",
      "metaphor": "Assembling a modular desktop PC: you don't 'inherit' from a graphics card; your computer 'has a' graphics card plugged into a slot."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of Composition vs Inheritance (HAS-A vs IS-A).",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Composition vs Inheritance (HAS-A vs IS-A)",
      "code": "class Engine {\n    void start() { System.out.println(\"V8 Engine roaring to life!\"); }\n}\n\n// Composition: Car HAS-AN Engine (not IS-AN Engine)\nclass Car {\n    private Engine engine = new Engine();\n    void drive() {\n        engine.start();\n        System.out.println(\"Car is moving forward.\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.drive();\n    }\n}",
      "explanation": "Examine the OOP structure of Composition vs Inheritance (HAS-A vs IS-A)."
    },
    "runnableCode": {
      "code": "class Engine {\n    void start() { System.out.println(\"V8 Engine roaring to life!\"); }\n}\n\n// Composition: Car HAS-AN Engine (not IS-AN Engine)\nclass Car {\n    private Engine engine = new Engine();\n    void drive() {\n        engine.start();\n        System.out.println(\"Car is moving forward.\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.drive();\n    }\n}",
      "expectedOutput": "V8 Engine roaring to life!\\nCar is moving forward."
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forcing inheritance where a HAS-A relationship exists (e.g. class Car extends Engine).",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-composition-over-inheritance",
        "question": "What relationship does Composition represent in software design?",
        "answer": "HAS-A",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-composition-over-inheritance",
        "question": "What relationship does Composition represent in software design?",
        "options": [
          "IS-A",
          "HAS-A",
          "USES-A-POINTER",
          "EXTENDS-A"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-composition-over-inheritance",
      "title": "Exercise: Composition vs Inheritance (HAS-A vs IS-A)",
      "difficulty": "Beginner",
      "description": "Implement Composition vs Inheritance (HAS-A vs IS-A) to complete the polymorphic design task.",
      "starterCode": "class Engine {\n    void start() { System.out.println(\"V8 Engine roaring to life!\"); }\n}\n\n// Composition: Car HAS-AN Engine (not IS-AN Engine)\nclass Car {\n    private Engine engine = new Engine();\n    void drive() {\n        engine.start();\n        System.out.println(\"Car is moving forward.\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.drive();\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "class Engine {\n    void start() { System.out.println(\"V8 Engine roaring to life!\"); }\n}\n\n// Composition: Car HAS-AN Engine (not IS-AN Engine)\nclass Car {\n    private Engine engine = new Engine();\n    void drive() {\n        engine.start();\n        System.out.println(\"Car is moving forward.\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.drive();\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Composition vs Inheritance (HAS-A vs IS-A).",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-final-immutable",
      "nextLessonTitle": "Final Classes, Final Methods & Immutable Design",
      "nextLessonModuleId": "java-module-7"
    }
  },
  "java-final-immutable": {
    "id": "java-final-immutable",
    "moduleId": "java-module-7",
    "title": "Final Classes, Final Methods & Immutable Design",
    "subtitle": "Preventing Inheritance, Locking Down Security-Critical Logic, and Pure Values",
    "order": 10,
    "readTimeMinutes": 16,
    "difficulty": "Intermediate",
    "visualizerType": "oop-hierarchy",
    "objectives": [
      "Master Final Classes, Final Methods & Immutable Design.",
      "Apply enterprise OOP principles.",
      "Design loosely coupled, polymorphic software."
    ],
    "prerequisites": [
      "Module 6: OOP Fundamentals"
    ],
    "analogy": {
      "title": "Final Classes, Final Methods & Immutable Design Metaphor",
      "text": "A wax-sealed confidential envelope: no one can tamper with the contents, and no one can forge an extension of it.",
      "metaphor": "A wax-sealed confidential envelope: no one can tamper with the contents, and no one can forge an extension of it."
    },
    "problemSolved": {
      "title": "Enterprise Architecture & Polymorphic Extensibility",
      "description": "Allows systems to scale and adapt to new business requirements without rewriting base logic.",
      "keyPoints": [
        "Loose coupling",
        "Open-Closed Principle (OCP)",
        "Dynamic dispatch"
      ]
    },
    "intuition": {
      "overview": "Architectural mechanics of Final Classes, Final Methods & Immutable Design.",
      "steps": [
        {
          "step": 1,
          "title": "Contract or Base Definition",
          "description": "Superclass or interface defines the public specification."
        },
        {
          "step": 2,
          "title": "Concrete Specialization",
          "description": "Subclasses implement or override behaviors."
        },
        {
          "step": 3,
          "title": "Polymorphic Invocation",
          "description": "Client code interacts via universal abstractions."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Final Classes, Final Methods & Immutable Design",
      "code": "// Final class cannot be extended by anyone!\nfinal class SecureToken {\n    private final String token; // Immutable field\n\n    public SecureToken(String token) {\n        this.token = token;\n    }\n    public String getToken() { return token; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SecureToken st = new SecureToken(\"AUTH_XYZ_987\");\n        System.out.println(\"Secure Immutable Token: \" + st.getToken());\n    }\n}",
      "explanation": "Examine the OOP structure of Final Classes, Final Methods & Immutable Design."
    },
    "runnableCode": {
      "code": "// Final class cannot be extended by anyone!\nfinal class SecureToken {\n    private final String token; // Immutable field\n\n    public SecureToken(String token) {\n        this.token = token;\n    }\n    public String getToken() { return token; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SecureToken st = new SecureToken(\"AUTH_XYZ_987\");\n        System.out.println(\"Secure Immutable Token: \" + st.getToken());\n    }\n}",
      "expectedOutput": "Secure Immutable Token: AUTH_XYZ_987"
    },
    "lineByLineExplanation": [
      {
        "lines": "1-6",
        "codeSnippet": "class ... extends/implements ...",
        "explanation": "Class hierarchy declaration."
      },
      {
        "lines": "7-15",
        "codeSnippet": "// Polymorphic dispatch and execution",
        "explanation": "Dynamic method invocation."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Allowing mutable objects to leak out of an immutable class without defensive copying.",
        "solution": "Follow advanced OOP conventions.",
        "whyWrong": "Causes compiler errors or fragile architectures."
      }
    ],
    "bestPractices": [
      "Favor composition over inheritance.",
      "Use @Override on every overridden method."
    ],
    "applications": [
      {
        "industry": "Framework Architecture",
        "useCase": "Spring Framework and Java standard library core contracts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-java-final-immutable",
        "question": "What happens if you attempt to create a subclass of a class declared as 'final'?",
        "answer": "The code fails to compile",
        "explanation": "Standard Java OOP specification."
      }
    ],
    "quiz": [
      {
        "id": "qz-java-final-immutable",
        "question": "What happens if you attempt to create a subclass of a class declared as 'final'?",
        "options": [
          "The subclass is marked private",
          "The code fails to compile",
          "It runs with a warning",
          "It creates a proxy class"
        ],
        "correctIndex": 1,
        "explanation": "Adheres to Java standards."
      }
    ],
    "codingChallenge": {
      "id": "ch-java-final-immutable",
      "title": "Exercise: Final Classes, Final Methods & Immutable Design",
      "difficulty": "Beginner",
      "description": "Implement Final Classes, Final Methods & Immutable Design to complete the polymorphic design task.",
      "starterCode": "// Final class cannot be extended by anyone!\nfinal class SecureToken {\n    private final String token; // Immutable field\n\n    public SecureToken(String token) {\n        this.token = token;\n    }\n    public String getToken() { return token; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SecureToken st = new SecureToken(\"AUTH_XYZ_987\");\n        System.out.println(\"Secure Immutable Token: \" + st.getToken());\n    }\n}",
      "hints": [
        "Review the lesson example above."
      ],
      "solutionCode": "// Final class cannot be extended by anyone!\nfinal class SecureToken {\n    private final String token; // Immutable field\n\n    public SecureToken(String token) {\n        this.token = token;\n    }\n    public String getToken() { return token; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SecureToken st = new SecureToken(\"AUTH_XYZ_987\");\n        System.out.println(\"Secure Immutable Token: \" + st.getToken());\n    }\n}"
    },
    "summary": {
      "keyTakeaways": [
        "Mastered Final Classes, Final Methods & Immutable Design.",
        "Understood inheritance, polymorphism, and interfaces.",
        "Ready for Packages and Generics in Module 8."
      ],
      "nextLessonId": "java-packages-structure",
      "nextLessonTitle": "Java Packages and Directory Structure",
      "nextLessonModuleId": "java-module-8"
    }
  }
};
