'use client';

import React, { useState } from 'react';
import {
  Cpu,
  FileCode,
  Binary,
  Layers,
  Zap,
  Play,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Info,
  Server,
  HardDrive,
  RefreshCw,
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  shortName: string;
  tool: string;
  fileExt: string;
  desc: string;
  details: string[];
  codeSample: string;
}

const STAGES: Stage[] = [
  {
    id: 'source',
    name: '1. Java Source Code',
    shortName: 'Source Code',
    tool: 'Developer writes in IDE',
    fileExt: 'HelloWorld.java',
    desc: 'Human-readable, strictly typed Java code following language specifications.',
    details: [
      'Platform independent at source level',
      'Requires explicit class declaration',
      'Stored in plain UTF-8 text files with .java extension',
    ],
    codeSample: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
  },
  {
    id: 'compiler',
    name: '2. Java Compiler (javac)',
    shortName: 'Compiler (javac)',
    tool: 'javac HelloWorld.java',
    fileExt: 'javac frontend',
    desc: 'Translates high-level Java code into compact, verified intermediate instructions called bytecode.',
    details: [
      'Lexical, syntactic, and semantic type analysis',
      'Checks type safety and access modifiers at compile-time',
      'Does NOT produce machine code for any specific CPU',
    ],
    codeSample: `$ javac HelloWorld.java
// Checks syntax... OK
// Type checks... OK
// Emits HelloWorld.class bytecode`,
  },
  {
    id: 'bytecode',
    name: '3. Portable Bytecode (.class)',
    shortName: 'Bytecode',
    tool: 'JVM Instruction Set',
    fileExt: 'HelloWorld.class',
    desc: 'A binary format of 1-byte opcodes designed to run on any computer with a JVM installed.',
    details: [
      'Write Once, Run Anywhere (WORA) foundation',
      'Magic number: 0xCAFEBABE',
      'Contains constant pool, methods, and stack instructions',
    ],
    codeSample: `// javap -c HelloWorld.class disassembly:
0: getstatic     #2 // Field System.out
3: ldc           #3 // String "Hello, Java!"
5: invokevirtual #4 // Method PrintStream.println
8: return`,
  },
  {
    id: 'classloader',
    name: '4. JVM ClassLoader & Verifier',
    shortName: 'ClassLoader',
    tool: 'Bootstrap, Extension, App ClassLoaders',
    fileExt: 'Runtime Loading',
    desc: 'Loads .class bytes into memory, verifies security integrity, and allocates static storage.',
    details: [
      'Loading: Reads binary data from disk/network',
      'Bytecode Verifier: Guarantees no stack corruption or pointer forging',
      'Initialization: Executes static initializers and static fields',
    ],
    codeSample: `ClassLoader Flow:
[Bootstrap Loader] -> java.base (Object, String)
       ↓
[Platform Loader]  -> SQL, XML extensions
       ↓
[App Loader]       -> HelloWorld.class (Your app)`,
  },
  {
    id: 'jvm-execution',
    name: '5. JVM Execution Engine (Interpreter + JIT)',
    shortName: 'Execution Engine',
    tool: 'HotSpot JIT (C1/C2 Compiler)',
    fileExt: 'Machine Code',
    desc: 'The heart of the JVM. Interprets bytecode line-by-line, while compiling hot code directly into machine instructions.',
    details: [
      'Interpreter: Fast startup, converts opcodes to CPU instructions on the fly',
      'JIT (Just-In-Time) Compiler: Compiles frequently executed loops/methods to native x86/ARM code',
      'Garbage Collector: Automatically tracks and reclaims unreferenced heap memory',
    ],
    codeSample: `Execution Workflow:
1. Bytecode -> Interpreter executes immediately
2. Method executed 10,000+ times? (Hot code detected!)
3. JIT compiles bytecode -> Native AMD64 / ARM64 assembly
4. Native code runs at near-C/C++ peak speeds!`,
  },
];

export const JVMArchitectureVisualizer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'flow' | 'memory'>('flow');

  const stage = STAGES[currentStep];

  const handleNext = () => {
    setCurrentStep((prev) => (prev < STAGES.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : STAGES.length - 1));
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Interactive JVM Architecture & Execution Pipeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trace how Java code goes from human text to CPU machine execution
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('flow')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'flow'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Pipeline Stepper
            </button>
            <button
              onClick={() => setActiveTab('memory')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'memory'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              JVM Runtime Memory Map
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'flow' ? (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Step Breadcrumbs */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {STAGES.map((s, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 shadow-sm ring-1 ring-amber-500/50'
                      : isPast
                      ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-700 dark:text-slate-300'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold">
                      0{idx + 1}
                    </span>
                    {isPast && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                  </div>
                  <div className="text-xs font-bold truncate">{s.shortName}</div>
                </button>
              );
            })}
          </div>

          {/* Current Stage Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                    {stage.name}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    File: <code className="text-amber-600 dark:text-amber-400 font-bold">{stage.fileExt}</code>
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {stage.tool}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  {stage.desc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    Key Architectural Responsibilities:
                  </span>
                  {stage.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ← Previous Stage
                </button>
                <div className="text-xs text-slate-500 font-mono">
                  Step {currentStep + 1} of {STAGES.length}
                </div>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>{currentStep === STAGES.length - 1 ? 'Start Over' : 'Next Stage'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Code / Visual Output */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs font-mono shadow-inner">
                <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <Binary className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] font-semibold text-slate-300">Representation at this stage</span>
                  </div>
                  <span className="text-[10px] text-slate-500">ReadOnly</span>
                </div>
                <pre className="p-4 text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
                  {stage.codeSample}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* JVM Runtime Memory Map Tab */
        <div className="p-5 sm:p-6 space-y-6">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            When the JVM executes your program, it partitions physical memory into 5 distinct architectural runtime data areas:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-1">
                <HardDrive className="w-4 h-4" />
                <span>Method Area</span>
              </div>
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono block mb-2">
                Shared across all threads
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Stores loaded class structure, runtime constant pool, field and method metadata, and static variables.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-sm mb-1">
                <Layers className="w-4 h-4" />
                <span>Heap Memory</span>
              </div>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-mono block mb-2">
                Shared across all threads (GC Managed)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Holds all instantiated objects created with <code className="font-mono font-bold text-amber-600">new</code> and all array instances. Scanned continuously by the Garbage Collector.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm mb-1">
                <Server className="w-4 h-4" />
                <span>JVM Stacks</span>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono block mb-2">
                Private per thread (LIFO)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Created with each thread. Every method invocation pushes a new Stack Frame holding local primitive variables, operand stacks, and references to heap objects.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
                PC (Program Counter) Registers
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Each active Java thread possesses its own PC Register storing the memory address of the JVM instruction currently being executed.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
                Native Method Stacks
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Allocated to support methods written in native languages (C, C++, Assembly) called via JNI (Java Native Interface), such as OS filesystem and network hooks.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
