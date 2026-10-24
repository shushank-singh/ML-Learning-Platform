'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimationData } from '@/data/revision/types';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sliders,
  Activity,
} from 'lucide-react';

interface AnimatedVisualizerProps {
  data: AnimationData;
}

export const AnimatedVisualizer: React.FC<AnimatedVisualizerProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [customInputValue, setCustomInputValue] = useState<any>(
    data.inputConfig?.defaultVal ?? 1
  );

  const totalSteps = data.stepsTotal || 4;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset animation state when user changes topic
  useEffect(() => {
    setIsPlaying(false);
    setCurrentStep(1);
    setCustomInputValue(data.inputConfig?.defaultVal ?? 1);
  }, [data.type, data.title, data.inputConfig?.defaultVal]);

  // Play / Pause auto-tick
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.round(1400 / speedMultiplier);
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps) {
            setIsPlaying(false);
            return totalSteps;
          }
          return prev + 1;
        });
      }, delay);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speedMultiplier, totalSteps]);

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  // -------------------------------------------------------------
  // DEDICATED GRAPHICAL SIMULATORS BASED ON ANIMATION TYPE
  // -------------------------------------------------------------
  const renderInteractiveCanvas = () => {
    switch (data.type) {
      // 1. GRADIENT DESCENT BALL ROLLING
      case 'gradient-descent-interactive': {
        const ballPositions = [
          { x: 90, y: 45, label: 'Start (High Loss)' },
          { x: 140, y: 95, label: 'Step 1: Rapid descent' },
          { x: 190, y: 145, label: 'Step 2: Approaching minimum' },
          { x: 235, y: 175, label: 'Step 3: Slowing down' },
          { x: 250, y: 180, label: 'Converged at Global Minimum!' },
        ];
        const current = ballPositions[Math.min(currentStep - 1, ballPositions.length - 1)];

        return (
          <svg viewBox="0 0 500 210" className="w-full h-auto">
            <path d="M 60 30 Q 250 240 440 30" fill="none" stroke="#4F46E5" strokeWidth="3" />
            <line x1="60" y1="190" x2="440" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
            <text x="250" y="205" fill="#64748B" fontSize="10" textAnchor="middle">Parameter θ Axis</text>

            <circle cx={current.x} cy={current.y} r="9" fill="#10B981" stroke="#ECFDF5" strokeWidth="2" className="transition-all duration-500 ease-out shadow-lg" />
            <line x1={current.x} y1={current.y} x2={current.x} y2="190" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            <rect x="290" y="50" width="180" height="40" rx="8" fill="#1E293B" stroke="#475569" />
            <text x="380" y="68" fill="#10B981" fontSize="11" fontWeight="bold" textAnchor="middle">
              {current.label}
            </text>
            <text x="380" y="82" fill="#94A3B8" fontSize="9" textAnchor="middle">
              Update: θ = θ - η · ∇L(θ)
            </text>
          </svg>
        );
      }

      // 2. LINEAR REGRESSION LINE ROTATION
      case 'linear-regression-interactive': {
        const slopes = [0.05, 0.15, 0.22, 0.25, 0.25];
        const m = slopes[Math.min(currentStep - 1, slopes.length - 1)];
        const yStart = 180 - m * 50;
        const yEnd = 180 - m * 400;

        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto">
            <line x1="50" y1="180" x2="450" y2="180" stroke="#475569" strokeWidth="1.5" />
            <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" strokeWidth="1.5" />
            <line x1="50" y1={yStart} x2="450" y2={yEnd} stroke="#4F46E5" strokeWidth="3" className="transition-all duration-500 ease-out" />
            {[
              { x: 100, y: 150 }, { x: 180, y: 130 }, { x: 260, y: 110 }, { x: 340, y: 90 }, { x: 420, y: 70 }
            ].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="5" fill="#10B981" />
            ))}
            <text x="250" y="25" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Step {currentStep}: Current Slope w = {m.toFixed(2)} | Minimizing MSE Residuals
            </text>
          </svg>
        );
      }

      // 3. LOGISTIC REGRESSION THRESHOLD
      case 'logistic-regression-interactive': {
        const thresholds = [0.3, 0.4, 0.5, 0.6, 0.7];
        const t = thresholds[Math.min(currentStep - 1, thresholds.length - 1)];
        const threshX = 50 + t * 400;

        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto">
            <path d="M 60 170 C 180 170, 220 160, 250 100 C 280 40, 320 30, 440 30" fill="none" stroke="#06B6D4" strokeWidth="3" />
            <line x1={threshX} y1="20" x2={threshX} y2="180" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" className="transition-all duration-300" />
            <text x={threshX} y="15" fill="#FCD34D" fontSize="10" fontWeight="bold" textAnchor="middle">Threshold = {t.toFixed(2)}</text>
            <circle cx="150" cy="165" r="5" fill="#EF4444" />
            <circle cx="350" cy="35" r="5" fill="#10B981" />
            <text x="250" y="195" fill="#94A3B8" fontSize="10" textAnchor="middle">Points left of threshold = Class 0 | Points right = Class 1</text>
          </svg>
        );
      }

      // 4. K-MEANS CENTROID MIGRATION
      case 'kmeans-clustering-interactive': {
        const centroidStates = [
          { c1: { x: 100, y: 150 }, c2: { x: 400, y: 50 }, label: 'Step 1: Random centroid seeds' },
          { c1: { x: 120, y: 120 }, c2: { x: 360, y: 80 }, label: 'Step 2: Assigning points to closest centroid' },
          { c1: { x: 140, y: 95 }, c2: { x: 340, y: 110 }, label: 'Step 3: Shifting centroids to cluster means' },
          { c1: { x: 140, y: 90 }, c2: { x: 340, y: 115 }, label: 'Step 4: Converged! Centroids stable.' },
        ];
        const s = centroidStates[Math.min(currentStep - 1, centroidStates.length - 1)];

        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto">
            {/* Cluster 1 Points */}
            {[{ x: 120, y: 70 }, { x: 160, y: 75 }, { x: 130, y: 110 }, { x: 155, y: 105 }, { x: 110, y: 95 }].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3B82F6" />
            ))}
            {/* Cluster 2 Points */}
            {[{ x: 320, y: 95 }, { x: 360, y: 100 }, { x: 330, y: 135 }, { x: 365, y: 130 }, { x: 310, y: 120 }].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#F59E0B" />
            ))}
            {/* Centroids */}
            <circle cx={s.c1.x} cy={s.c1.y} r="9" fill="#38BDF8" stroke="#FFF" strokeWidth="2" className="transition-all duration-500 ease-out" />
            <circle cx={s.c2.x} cy={s.c2.y} r="9" fill="#FCD34D" stroke="#FFF" strokeWidth="2" className="transition-all duration-500 ease-out" />
            <text x="250" y="25" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">{s.label}</text>
          </svg>
        );
      }

      // 5. TWO POINTERS CONVERGING
      case 'two-pointers-converge-interactive': {
        const leftIdx = Math.min(currentStep - 1, 2);
        const rightIdx = Math.max(5 - (currentStep - 1), 2);
        const arr = [2, 7, 11, 15, 19, 24];
        const sum = arr[leftIdx] + arr[rightIdx];

        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto">
            <text x="250" y="25" fill="#94A3B8" fontSize="11" textAnchor="middle">
              Target = 26 | Step {currentStep}: Left=[{leftIdx}], Right=[{rightIdx}] → Sum = {sum}
            </text>
            {arr.map((val, idx) => {
              const isLeft = idx === leftIdx;
              const isRight = idx === rightIdx;
              const isPair = sum === 26 && (isLeft || isRight);

              return (
                <g key={idx} transform={`translate(${45 + idx * 70}, 50)`}>
                  <rect
                    x="0"
                    y="0"
                    width="60"
                    height="50"
                    rx="8"
                    fill={isPair ? '#059669' : isLeft ? '#6D28D9' : isRight ? '#BE185D' : '#0F172A'}
                    stroke={isPair ? '#34D399' : isLeft ? '#C4B5FD' : isRight ? '#FBCFE8' : '#334155'}
                    strokeWidth={isLeft || isRight ? 2.5 : 1}
                    className="transition-all duration-300"
                  />
                  <text x="30" y="32" fill="#F8FAFC" fontSize="15" fontWeight="bold" textAnchor="middle">
                    {val}
                  </text>
                  <text x="30" y="-8" fill="#64748B" fontSize="10" textAnchor="middle">idx {idx}</text>
                  {isLeft && <text x="30" y="70" fill="#C4B5FD" fontSize="11" fontWeight="bold" textAnchor="middle">Left ↑</text>}
                  {isRight && <text x="30" y="70" fill="#FBCFE8" fontSize="11" fontWeight="bold" textAnchor="middle">Right ↑</text>}
                </g>
              );
            })}
            <text x="250" y="170" fill={sum === 26 ? '#34D399' : '#CBD5E1'} fontSize="12" fontWeight="bold" textAnchor="middle">
              {sum === 26 ? 'Target 26 Found! Indices [0, 5]' : sum < 26 ? 'Sum < 26 → Increment Left Pointer' : 'Sum > 26 → Decrement Right Pointer'}
            </text>
          </svg>
        );
      }

      // 6. BINARY SEARCH INTERVAL SHRINK
      case 'binary-search-shrink-interactive': {
        const steps = [
          { low: 0, high: 8, mid: 4, msg: 'Comparing mid (18) with Target (23) → 18 < 23 → Search Right half' },
          { low: 5, high: 8, mid: 6, msg: 'Comparing mid (29) with Target (23) → 29 > 23 → Search Left half' },
          { low: 5, high: 5, mid: 5, msg: 'Comparing mid (23) with Target (23) → 23 == 23 → Match Found at index 5!' },
        ];
        const s = steps[Math.min(currentStep - 1, steps.length - 1)];
        const nums = [3, 7, 11, 14, 18, 23, 29, 35, 42];

        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto">
            <text x="250" y="25" fill="#94A3B8" fontSize="11" textAnchor="middle">
              Target = 23 | Search Window [low={s.low}, high={s.high}], mid={s.mid}
            </text>
            {nums.map((num, i) => {
              const inRange = i >= s.low && i <= s.high;
              const isMid = i === s.mid;
              const isTarget = num === 23 && isMid && currentStep >= 3;

              return (
                <g key={i} transform={`translate(${20 + i * 52}, 50)`}>
                  <rect
                    x="0"
                    y="0"
                    width="44"
                    height="45"
                    rx="6"
                    fill={isTarget ? '#047857' : isMid ? '#4338CA' : inRange ? '#1E293B' : '#090D16'}
                    stroke={isTarget ? '#10B981' : isMid ? '#818CF8' : inRange ? '#3B82F6' : '#1E293B'}
                    strokeWidth={isMid ? 2 : 1}
                    opacity={inRange ? 1 : 0.25}
                    className="transition-all duration-300"
                  />
                  <text x="22" y="28" fill="#F8FAFC" fontSize="13" fontWeight="bold" textAnchor="middle">
                    {num}
                  </text>
                  <text x="22" y="-6" fill="#64748B" fontSize="9" textAnchor="middle">{i}</text>
                  {isMid && (
                    <text x="22" y="62" fill={isTarget ? '#34D399' : '#818CF8'} fontSize="10" fontWeight="bold" textAnchor="middle">
                      {isTarget ? 'Found!' : 'mid'}
                    </text>
                  )}
                </g>
              );
            })}
            <text x="250" y="160" fill="#E2E8F0" fontSize="11" textAnchor="middle">
              {s.msg}
            </text>
          </svg>
        );
      }

      // 7. STACK PUSH AND POP
      case 'monotonic-stack-push-pop-interactive': {
        const stackStates = [
          { stack: [73], label: 'Push 73 onto empty stack' },
          { stack: [74], label: '74 > 73: Pop 73, then Push 74' },
          { stack: [75], label: '75 > 74: Pop 74, then Push 75' },
          { stack: [75, 71], label: '71 < 75: Push 71 on top of 75' },
          { stack: [75, 71, 69], label: '69 < 71: Push 69 on top of 71' },
          { stack: [75, 72], label: '72 > 69 & 71: Pop 69, Pop 71, then Push 72' },
        ];
        const s = stackStates[Math.min(currentStep - 1, stackStates.length - 1)];

        return (
          <svg viewBox="0 0 500 200" className="w-full h-auto">
            <rect x="60" y="30" width="110" height="150" rx="8" fill="#0F172A" stroke="#475569" strokeWidth="2" />
            <text x="115" y="20" fill="#94A3B8" fontSize="11" textAnchor="middle" fontWeight="bold">LIFO Stack</text>

            {s.stack.map((val, idx) => (
              <g key={idx} transform={`translate(70, ${145 - idx * 36})`}>
                <rect x="0" y="0" width="90" height="30" rx="6" fill="#312E81" stroke="#818CF8" strokeWidth="1.5" />
                <text x="45" y="20" fill="#E0E7FF" fontSize="13" fontWeight="bold" textAnchor="middle">
                  {val}
                </text>
              </g>
            ))}

            <rect x="220" y="55" width="250" height="80" rx="10" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
            <text x="345" y="85" fill="#818CF8" fontSize="12" fontWeight="bold" textAnchor="middle">
              Step {currentStep}: Monotonic Order
            </text>
            <text x="345" y="112" fill="#E2E8F0" fontSize="11" textAnchor="middle">
              {s.label}
            </text>
          </svg>
        );
      }

      // 8. LINKED LIST IN-PLACE REVERSAL
      case 'linked-list-pointer-interactive': {
        const step = Math.min(currentStep, 4);

        return (
          <svg viewBox="0 0 500 180" className="w-full h-auto">
            <text x="250" y="25" fill="#94A3B8" fontSize="11" textAnchor="middle">
              In-Place Reversal: prev moves forward, curr.next points backward
            </text>
            {[1, 2, 3, 4].map((val, idx) => (
              <g key={idx} transform={`translate(${60 + idx * 105}, 60)`}>
                <circle cx="25" cy="25" r="22" fill={idx < step ? '#065F46' : '#1E293B'} stroke={idx < step ? '#34D399' : '#475569'} strokeWidth="2" />
                <text x="25" y="30" fill="#F8FAFC" fontSize="14" fontWeight="bold" textAnchor="middle">
                  {val}
                </text>
                {idx < 3 && (
                  <path
                    d={idx < step - 1 ? 'M 90 25 L 55 25' : 'M 50 25 L 85 25'}
                    stroke={idx < step - 1 ? '#34D399' : '#64748B'}
                    strokeWidth="2.5"
                    className="transition-all duration-300"
                  />
                )}
              </g>
            ))}
            <text x="250" y="150" fill="#34D399" fontSize="12" fontWeight="bold" textAnchor="middle">
              {step === 1 && 'Step 1: Save next, Point Node(1).next to null'}
              {step === 2 && 'Step 2: Point Node(2).next to Node(1)'}
              {step === 3 && 'Step 3: Point Node(3).next to Node(2)'}
              {step >= 4 && 'Step 4: Point Node(4).next to Node(3). New Head is Node(4)!'}
            </text>
          </svg>
        );
      }

      // 9. PYTHON MUTABILITY ALIASSING ANIMATOR
      case 'py-mutability-interactive': {
        const states = [
          { val: '[1, 2]', note: 'Step 1: a = [1, 2] allocated on heap' },
          { val: '[1, 2]', note: 'Step 2: b = a binds tag b to same object' },
          { val: '[1, 2, 99]', note: 'Step 3: b.append(99) mutates heap in-place!' },
          { val: '[1, 2, 99]', note: 'Step 4: Checking a reveals [1, 2, 99]!' },
        ];
        const s = states[Math.min(currentStep - 1, states.length - 1)];

        return (
          <svg viewBox="0 0 500 180" className="w-full h-auto">
            <rect x="50" y="30" width="100" height="40" rx="6" fill="#1E293B" stroke="#6366F1" />
            <text x="100" y="55" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle">tag: a</text>
            <rect x="50" y="90" width="100" height="40" rx="6" fill="#1E293B" stroke="#6366F1" />
            <text x="100" y="115" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle">tag: b</text>

            <path d="M 150 50 L 260 75" stroke="#6366F1" strokeWidth="2.5" markerEnd="url(#arrow)" />
            {currentStep >= 2 && <path d="M 150 110 L 260 75" stroke="#6366F1" strokeWidth="2.5" markerEnd="url(#arrow)" />}

            <rect x="260" y="45" width="180" height="65" rx="8" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
            <text x="350" y="70" fill="#6EE7B7" fontSize="10" textAnchor="middle">Heap Object (0x7F2A)</text>
            <text x="350" y="95" fill="#A7F3D0" fontSize="14" fontWeight="bold" textAnchor="middle">{s.val}</text>
            <text x="250" y="160" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">{s.note}</text>
          </svg>
        );
      }

      // 10. JAVA STACK VS HEAP INTERACTIVE
      case 'java-stack-heap-interactive': {
        return (
          <svg viewBox="0 0 500 180" className="w-full h-auto">
            <rect x="40" y="30" width="120" height="120" rx="8" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />
            <text x="100" y="20" fill="#93C5FD" fontSize="11" fontWeight="bold" textAnchor="middle">Stack Frame</text>
            <rect x="50" y="45" width="100" height="30" rx="4" fill="#0F172A" />
            <text x="100" y="65" fill="#93C5FD" fontSize="10" textAnchor="middle">age = 25</text>
            <rect x="50" y="90" width="100" height="30" rx="4" fill="#0F172A" stroke="#60A5FA" />
            <text x="100" y="110" fill="#60A5FA" fontSize="10" fontWeight="bold" textAnchor="middle">ref: 0x4A</text>

            <path d="M 150 105 L 260 85" stroke="#60A5FA" strokeWidth="2.5" markerEnd="url(#arrow)" />

            <rect x="260" y="35" width="180" height="90" rx="8" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
            <text x="350" y="65" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle">User Instance (0x4A)</text>
            <text x="350" y="90" fill="#6EE7B7" fontSize="10" textAnchor="middle">name: &quot;Bob&quot;</text>
            <text x="250" y="160" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">
              Step {currentStep}: Primitive value resides on Stack; Object allocated in Heap
            </text>
          </svg>
        );
      }

      // 11. GENERAL HIGH-YIELD STEP PROGRESSION
      default: {
        return (
          <div className="w-full flex flex-col items-center justify-center space-y-4 py-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              {Array.from({ length: totalSteps }).map((_, i) => {
                const stepNum = i + 1;
                const isCurrent = stepNum === currentStep;
                const isPassed = stepNum < currentStep;

                return (
                  <div
                    key={i}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(stepNum);
                    }}
                    className={`cursor-pointer w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white scale-110 shadow-lg shadow-indigo-500/30 ring-2 ring-emerald-400'
                        : isPassed
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>#{stepNum}</span>
                    <span className="text-[9px] opacity-75 font-sans">
                      {stepNum === 1 ? 'Start' : stepNum === totalSteps ? 'Final' : 'Step'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 max-w-md text-center">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Visual State Progression (Step {currentStep} of {totalSteps})
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentStep === 1 && 'Phase 1: Initial state loaded. Parameters calibrated and references linked.'}
                {currentStep === 2 && 'Phase 2: Conditions evaluated. Iterating algorithm invariants across elements.'}
                {currentStep === 3 && 'Phase 3: Transforming state. Updating pointers, weights, and caches.'}
                {currentStep >= 4 && 'Phase 4: Execution complete! Verified optimal result with zero violations.'}
              </p>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Section C • See It in Action (30%)
            </span>
            <h4 className="text-sm font-bold text-slate-100">{data.title}</h4>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/80 font-mono text-xs text-slate-300 font-semibold">
            Step {currentStep} / {totalSteps}
          </span>
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700/80 text-[11px] font-mono">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2 py-0.5 rounded transition-all ${
                  speedMultiplier === s
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-slate-950 border border-slate-800 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[220px]">
        {renderInteractiveCanvas()}
      </div>

      {data.inputConfig && (
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Sliders className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{data.inputConfig.label}</span>
          </div>

          {data.inputConfig.type === 'slider' && (
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={data.inputConfig.min ?? 1}
                max={data.inputConfig.max ?? 10}
                step={data.inputConfig.step ?? 1}
                value={customInputValue}
                onChange={(e) => setCustomInputValue(parseFloat(e.target.value))}
                className="w-32 sm:w-48 accent-emerald-500 cursor-pointer"
              />
              <span className="font-mono text-xs text-emerald-400 font-bold min-w-[2rem]">
                {customInputValue}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleStepBackward}
            disabled={currentStep <= 1}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs transition-colors"
          >
            <SkipBack className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            onClick={handleStepForward}
            disabled={currentStep >= totalSteps}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
