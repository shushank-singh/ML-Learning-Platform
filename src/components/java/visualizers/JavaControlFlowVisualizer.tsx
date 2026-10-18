'use client';

import React, { useState, useEffect } from 'react';
import {
  GitFork,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  ChevronRight,
  Sliders,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface TraceStep {
  lineNum: number;
  codeSnippet: string;
  conditionText?: string;
  conditionResult?: boolean;
  variables: Record<string, string | number>;
  activeArrayIndex?: number;
  explanation: string;
}

interface FlowScenario {
  id: string;
  title: string;
  type: 'condition' | 'loop';
  code: string[];
  steps: TraceStep[];
}

const FLOW_SCENARIOS: FlowScenario[] = [
  {
    id: 'if-else-grades',
    title: 'If-Else-If Branching (Grade Classifier)',
    type: 'condition',
    code: [
      'int score = 85;',
      'char grade;',
      'if (score >= 90) {',
      '    grade = \'A\';',
      '} else if (score >= 80) {',
      '    grade = \'B\';',
      '} else {',
      '    grade = \'C\';',
      '}',
      'System.out.println("Grade: " + grade);',
    ],
    steps: [
      {
        lineNum: 1,
        codeSnippet: 'int score = 85;',
        variables: { score: 85 },
        explanation: 'Initialize integer variable score with 85 on the stack.',
      },
      {
        lineNum: 2,
        codeSnippet: 'char grade;',
        variables: { score: 85, grade: '?' },
        explanation: 'Declare char variable grade.',
      },
      {
        lineNum: 3,
        codeSnippet: 'if (score >= 90) {',
        conditionText: '85 >= 90',
        conditionResult: false,
        variables: { score: 85, grade: '?' },
        explanation: 'First condition evaluates to FALSE. Execution bypasses the A block.',
      },
      {
        lineNum: 5,
        codeSnippet: '} else if (score >= 80) {',
        conditionText: '85 >= 80',
        conditionResult: true,
        variables: { score: 85, grade: '?' },
        explanation: 'Second condition evaluates to TRUE! Execution enters this block.',
      },
      {
        lineNum: 6,
        codeSnippet: '    grade = \'B\';',
        variables: { score: 85, grade: "'B'" },
        explanation: 'Assign character \'B\' to variable grade.',
      },
      {
        lineNum: 10,
        codeSnippet: 'System.out.println("Grade: " + grade);',
        variables: { score: 85, grade: "'B'" },
        explanation: 'Prints "Grade: B" to console. Remaining else branch was skipped.',
      },
    ],
  },
  {
    id: 'for-loop-array',
    title: 'For Loop Array Traversal & Summation',
    type: 'loop',
    code: [
      'int[] numbers = {4, 7, 2, 9};',
      'int sum = 0;',
      'for (int i = 0; i < numbers.length; i++) {',
      '    sum += numbers[i];',
      '}',
      'System.out.println("Sum: " + sum);',
    ],
    steps: [
      {
        lineNum: 1,
        codeSnippet: 'int[] numbers = {4, 7, 2, 9};',
        variables: { 'numbers.length': 4 },
        explanation: 'Array allocated in heap with 4 integers.',
      },
      {
        lineNum: 2,
        codeSnippet: 'int sum = 0;',
        variables: { sum: 0 },
        explanation: 'Initialize accumulator variable sum = 0.',
      },
      {
        lineNum: 3,
        codeSnippet: 'for (int i = 0; i < numbers.length; i++)',
        conditionText: 'i (0) < 4',
        conditionResult: true,
        variables: { i: 0, sum: 0 },
        activeArrayIndex: 0,
        explanation: 'Loop iteration 0: i = 0. Condition 0 < 4 is TRUE.',
      },
      {
        lineNum: 4,
        codeSnippet: '    sum += numbers[i];',
        variables: { i: 0, sum: 4, 'numbers[0]': 4 },
        activeArrayIndex: 0,
        explanation: 'sum becomes 0 + 4 = 4.',
      },
      {
        lineNum: 3,
        codeSnippet: 'for (int i = 0; i < numbers.length; i++)',
        conditionText: 'i (1) < 4',
        conditionResult: true,
        variables: { i: 1, sum: 4 },
        activeArrayIndex: 1,
        explanation: 'Loop iteration 1: i incremented to 1. 1 < 4 is TRUE.',
      },
      {
        lineNum: 4,
        codeSnippet: '    sum += numbers[i];',
        variables: { i: 1, sum: 11, 'numbers[1]': 7 },
        activeArrayIndex: 1,
        explanation: 'sum becomes 4 + 7 = 11.',
      },
      {
        lineNum: 3,
        codeSnippet: 'for (int i = 0; i < numbers.length; i++)',
        conditionText: 'i (2) < 4',
        conditionResult: true,
        variables: { i: 2, sum: 11 },
        activeArrayIndex: 2,
        explanation: 'Loop iteration 2: i = 2. 2 < 4 is TRUE.',
      },
      {
        lineNum: 4,
        codeSnippet: '    sum += numbers[i];',
        variables: { i: 2, sum: 13, 'numbers[2]': 2 },
        activeArrayIndex: 2,
        explanation: 'sum becomes 11 + 2 = 13.',
      },
      {
        lineNum: 3,
        codeSnippet: 'for (int i = 0; i < numbers.length; i++)',
        conditionText: 'i (3) < 4',
        conditionResult: true,
        variables: { i: 3, sum: 13 },
        activeArrayIndex: 3,
        explanation: 'Loop iteration 3: i = 3. 3 < 4 is TRUE.',
      },
      {
        lineNum: 4,
        codeSnippet: '    sum += numbers[i];',
        variables: { i: 3, sum: 22, 'numbers[3]': 9 },
        activeArrayIndex: 3,
        explanation: 'sum becomes 13 + 9 = 22.',
      },
      {
        lineNum: 3,
        codeSnippet: 'for (int i = 0; i < numbers.length; i++)',
        conditionText: 'i (4) < 4',
        conditionResult: false,
        variables: { i: 4, sum: 22 },
        explanation: 'Loop termination: 4 < 4 is FALSE. Loop exits!',
      },
      {
        lineNum: 6,
        codeSnippet: 'System.out.println("Sum: " + sum);',
        variables: { sum: 22 },
        explanation: 'Final output: "Sum: 22".',
      },
    ],
  },
];

export const JavaControlFlowVisualizer: React.FC = () => {
  const [scenarioIdx, setScenarioIdx] = useState<number>(0);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const scenario = FLOW_SCENARIOS[scenarioIdx];
  const step = scenario.steps[stepIdx];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (stepIdx < scenario.steps.length - 1) {
          setStepIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, stepIdx, scenario.steps.length]);

  const handleReset = () => {
    setIsPlaying(false);
    setStepIdx(0);
  };

  const handleNext = () => {
    if (stepIdx < scenario.steps.length - 1) {
      setStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (stepIdx > 0) {
      setStepIdx((prev) => prev - 1);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Interactive Java Control Flow & Loop Animator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Watch line-by-line branch evaluation, variable state mutations, and loop traversal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
          {FLOW_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setScenarioIdx(idx);
                setStepIdx(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1 rounded-md transition-all ${
                idx === scenarioIdx
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {sc.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              onClick={handlePrev}
              disabled={stepIdx === 0}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold disabled:opacity-40"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={stepIdx === scenario.steps.length - 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold disabled:opacity-40"
            >
              Next
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Step {stepIdx + 1} of {scenario.steps.length}
          </div>
        </div>

        {/* Code View with Active Line Highlighting + Live Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Code listing */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
            <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px] font-bold">
              Java Source Line Execution
            </div>
            <div className="p-3 space-y-1">
              {scenario.code.map((line, idx) => {
                const lineNum = idx + 1;
                const isCurrent = lineNum === step.lineNum;
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-2 py-1 rounded transition-colors ${
                      isCurrent
                        ? 'bg-amber-500/20 text-amber-200 border-l-2 border-amber-400 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="w-7 shrink-0 text-slate-600 select-none text-right pr-3">
                      {lineNum}
                    </span>
                    <span className="font-mono whitespace-pre">{line}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Condition Evaluation & Variables */}
          <div className="lg:col-span-5 space-y-4">
            {/* Condition Evaluation Card */}
            {step.conditionText !== undefined && (
              <div
                className={`p-4 rounded-xl border ${
                  step.conditionResult
                    ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-red-300 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Condition Evaluated:
                  </span>
                  {step.conditionResult ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      true
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 font-mono">
                      <XCircle className="w-3.5 h-3.5" />
                      false
                    </span>
                  )}
                </div>
                <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-800">
                  {step.conditionText} ➔ {step.conditionResult ? 'TRUE' : 'FALSE'}
                </div>
              </div>
            )}

            {/* Array Traversal Visual if available */}
            {scenario.type === 'loop' && (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Array Elements & Pointer i:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[4, 7, 2, 9].map((val, idx) => {
                    const isPointer = step.activeArrayIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          isPointer
                            ? 'border-amber-500 bg-amber-100 dark:bg-amber-950/80 ring-2 ring-amber-500'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400 font-mono">[{idx}]</div>
                        <div className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">
                          {val}
                        </div>
                        {isPointer && (
                          <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                            ▲ i={idx}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Live Variable State Inspector */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Live Variables in Current Scope:
              </span>
              <div className="space-y-1.5">
                {Object.entries(step.variables).map(([name, val]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  >
                    <span className="text-slate-500">{name}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation box */}
            <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              {step.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
