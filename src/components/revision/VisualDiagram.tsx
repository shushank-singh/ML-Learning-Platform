'use client';

import React from 'react';
import { VisualData } from '@/data/revision/types';
import { Layers, ArrowRight } from 'lucide-react';

interface VisualDiagramProps {
  data: VisualData;
}

export const VisualDiagram: React.FC<VisualDiagramProps> = ({ data }) => {
  // Render custom educational SVG visualizations based on visualKey
  const renderVisualContent = () => {
    switch (data.visualKey) {
      // -------------------------------------------------------------
      // MACHINE LEARNING VISUALIZERS
      // -------------------------------------------------------------
      case 'ml-bias-variance-plot':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 240" className="w-full h-auto text-slate-300">
              {/* Axes */}
              <line x1="60" y1="200" x2="460" y2="200" stroke="#475569" strokeWidth="2" />
              <line x1="60" y1="20" x2="60" y2="200" stroke="#475569" strokeWidth="2" />
              <text x="260" y="230" fill="#94A3B8" fontSize="12" textAnchor="middle" fontWeight="bold">Model Complexity (Degrees / Capacity) →</text>
              <text x="25" y="110" fill="#94A3B8" fontSize="12" textAnchor="middle" fontWeight="bold" transform="rotate(-90 25 110)">Error Rate →</text>

              {/* Shaded Regions */}
              <rect x="60" y="20" width="110" height="180" fill="#3B82F6" fillOpacity="0.08" />
              <text x="115" y="45" fill="#60A5FA" fontSize="11" textAnchor="middle" fontWeight="bold">Underfitting</text>
              <text x="115" y="60" fill="#93C5FD" fontSize="9" textAnchor="middle">High Bias</text>

              <rect x="330" y="20" width="130" height="180" fill="#EF4444" fillOpacity="0.08" />
              <text x="395" y="45" fill="#F87171" fontSize="11" textAnchor="middle" fontWeight="bold">Overfitting</text>
              <text x="395" y="60" fill="#FCA5A5" fontSize="9" textAnchor="middle">High Variance</text>

              {/* Optimal Zone */}
              <line x1="240" y1="20" x2="240" y2="200" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="240" cy="115" r="5" fill="#10B981" />
              <text x="240" y="105" fill="#34D399" fontSize="10" textAnchor="middle" fontWeight="bold">Sweet Spot (Min Error)</text>

              {/* Irreducible Error line */}
              <line x1="60" y1="180" x2="460" y2="180" stroke="#64748B" strokeWidth="1.5" strokeDasharray="5 4" />
              <text x="450" y="174" fill="#94A3B8" fontSize="9" textAnchor="end">Irreducible Noise (σ²)</text>

              {/* Bias Curve (Decreasing) */}
              <path d="M 70 40 Q 140 130 450 185" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
              <text x="90" y="90" fill="#60A5FA" fontSize="11" fontWeight="bold">Bias²</text>

              {/* Variance Curve (Increasing) */}
              <path d="M 70 190 Q 240 180 450 40" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
              <text x="430" y="80" fill="#FBBF24" fontSize="11" fontWeight="bold">Variance</text>

              {/* Total Test Error Curve (U-Shape) */}
              <path d="M 70 70 Q 240 150 450 65" fill="none" stroke="#EC4899" strokeWidth="3" />
              <text x="360" y="125" fill="#F472B6" fontSize="12" fontWeight="bold">Total Test MSE</text>
            </svg>
          </div>
        );

      case 'ml-gradient-descent-plot':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 220" className="w-full h-auto text-slate-300">
              {/* Loss parabola */}
              <path d="M 50 30 Q 250 220 450 30" fill="none" stroke="#6366F1" strokeWidth="3" />
              <text x="250" y="215" fill="#A5B4FC" fontSize="11" textAnchor="middle" fontWeight="bold">Global Minimum Loss θ*</text>

              {/* Step Trajectory Points */}
              <circle cx="80" cy="50" r="6" fill="#F59E0B" />
              <text x="95" y="45" fill="#FCD34D" fontSize="10">θ₀ (Initial)</text>
              <line x1="80" y1="50" x2="130" y2="105" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />

              <circle cx="130" cy="105" r="5" fill="#F59E0B" />
              <text x="145" y="100" fill="#FCD34D" fontSize="10">θ₁ = θ₀ - η∇L</text>
              <line x1="130" y1="105" x2="185" y2="148" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />

              <circle cx="185" cy="148" r="5" fill="#F59E0B" />
              <text x="200" y="145" fill="#FCD34D" fontSize="10">θ₂</text>
              <line x1="185" y1="148" x2="250" y2="180" stroke="#10B981" strokeWidth="2" />

              <circle cx="250" cy="180" r="7" fill="#10B981" />
              <text x="250" y="170" fill="#34D399" fontSize="11" textAnchor="middle" fontWeight="bold">Converged!</text>

              {/* Overshoot comparison on right */}
              <path d="M 370 70 L 420 40" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="420" cy="40" r="5" fill="#EF4444" />
              <text x="420" y="25" fill="#F87171" fontSize="10" textAnchor="middle">Overshooting (η too large)</text>
            </svg>
          </div>
        );

      case 'ml-linear-regression-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 220" className="w-full h-auto text-slate-300">
              <line x1="50" y1="190" x2="450" y2="190" stroke="#475569" strokeWidth="2" />
              <line x1="50" y1="20" x2="50" y2="190" stroke="#475569" strokeWidth="2" />
              <text x="250" y="210" fill="#94A3B8" fontSize="11" textAnchor="middle">Feature X →</text>
              <text x="20" y="105" fill="#94A3B8" fontSize="11" textAnchor="middle" transform="rotate(-90 20 105)">Target y →</text>

              {/* Fitted Line */}
              <line x1="70" y1="165" x2="430" y2="45" stroke="#6366F1" strokeWidth="3" />
              <text x="430" y="38" fill="#818CF8" fontSize="11" fontWeight="bold">y = wx + b</text>

              {/* Residual Vertical Lines & Points */}
              <line x1="120" y1="148" x2="120" y2="115" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="120" cy="115" r="5" fill="#06B6D4" />
              <text x="130" y="132" fill="#F87171" fontSize="10">e₁ = y₁ - ŷ₁</text>

              <line x1="200" y1="122" x2="200" y2="145" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="200" cy="145" r="5" fill="#06B6D4" />

              <line x1="290" y1="92" x2="290" y2="60" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="290" cy="60" r="5" fill="#06B6D4" />
              <text x="300" y="78" fill="#F87171" fontSize="10">Residual (e₃)</text>

              <line x1="370" y1="65" x2="370" y2="90" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="370" cy="90" r="5" fill="#06B6D4" />
            </svg>
          </div>
        );

      case 'ml-logistic-boundary-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <line x1="50" y1="170" x2="450" y2="170" stroke="#475569" strokeWidth="2" />
              <line x1="250" y1="20" x2="250" y2="170" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
              <text x="250" y="190" fill="#94A3B8" fontSize="11" textAnchor="middle">z = wᵀx + b (Log-Odds)</text>

              {/* Threshold 0.5 Line */}
              <line x1="50" y1="95" x2="450" y2="95" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="445" y="90" fill="#34D399" fontSize="10" textAnchor="end">Decision Threshold θ = 0.5</text>

              {/* Sigmoid S Curve */}
              <path d="M 60 165 C 180 165, 200 95, 250 95 C 300 95, 320 25, 440 25" fill="none" stroke="#6366F1" strokeWidth="3" />
              <circle cx="250" cy="95" r="5" fill="#10B981" />
              <text x="260" y="112" fill="#A5B4FC" fontSize="10">z=0 → p=0.5</text>

              {/* Class regions */}
              <text x="120" y="140" fill="#94A3B8" fontSize="12" fontWeight="bold">Predict Class 0 (p &lt; 0.5)</text>
              <text x="370" y="50" fill="#818CF8" fontSize="12" fontWeight="bold">Predict Class 1 (p ≥ 0.5)</text>
            </svg>
          </div>
        );

      // -------------------------------------------------------------
      // PYTHON & JAVA & DSA VISUALIZERS
      // -------------------------------------------------------------
      case 'py-memory-references-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              {/* Namespace Scope */}
              <rect x="30" y="30" width="130" height="140" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <text x="95" y="52" fill="#94A3B8" fontSize="11" fontWeight="bold" textAnchor="middle">Namespace (Names)</text>

              <rect x="45" y="70" width="100" height="30" rx="4" fill="#0F172A" stroke="#64748B" />
              <text x="95" y="90" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">variable "a"</text>

              <rect x="45" y="115" width="100" height="30" rx="4" fill="#0F172A" stroke="#64748B" />
              <text x="95" y="135" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">variable "b" = a</text>

              {/* Pointers to Shared Heap Object */}
              <path d="M 145 85 C 220 85, 230 100, 290 100" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <path d="M 145 130 C 220 130, 230 100, 290 100" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arrow)" />

              {/* Heap Object */}
              <rect x="290" y="45" width="170" height="110" rx="10" fill="#064E3B" fillOpacity="0.4" stroke="#10B981" strokeWidth="2" />
              <text x="375" y="70" fill="#34D399" fontSize="12" fontWeight="bold" textAnchor="middle">PyListObject @ 0x7FFF</text>
              <text x="375" y="90" fill="#6EE7B7" fontSize="10" textAnchor="middle">ob_refcnt: 2 | ob_size: 3</text>
              <rect x="310" y="105" width="130" height="35" rx="4" fill="#022C22" stroke="#059669" />
              <text x="375" y="127" fill="#A7F3D0" fontSize="11" fontWeight="mono" textAnchor="middle">[ 1, 2, 3 ]</text>
            </svg>
          </div>
        );

      case 'java-stack-heap-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              {/* Stack Side */}
              <rect x="30" y="20" width="160" height="160" rx="8" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
              <text x="110" y="42" fill="#FBBF24" fontSize="12" fontWeight="bold" textAnchor="middle">Thread Stack Memory</text>
              <rect x="45" y="55" width="130" height="30" rx="4" fill="#78350F" fillOpacity="0.6" stroke="#D97706" />
              <text x="110" y="74" fill="#FEF3C7" fontSize="10" textAnchor="middle">int x = 42 (Primitive)</text>
              <rect x="45" y="95" width="130" height="40" rx="4" fill="#78350F" fillOpacity="0.6" stroke="#D97706" />
              <text x="110" y="112" fill="#FEF3C7" fontSize="10" textAnchor="middle">Person p (Ref Handle)</text>
              <text x="110" y="126" fill="#FCD34D" fontSize="9" fontStyle="italic" textAnchor="middle">0x4A20 (64-bit)</text>

              {/* Pointer to Heap */}
              <path d="M 175 115 C 230 115, 240 85, 290 85" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 2" />

              {/* Heap Side */}
              <rect x="290" y="20" width="180" height="160" rx="8" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />
              <text x="380" y="42" fill="#60A5FA" fontSize="12" fontWeight="bold" textAnchor="middle">Java Heap (Shared)</text>
              <rect x="305" y="60" width="150" height="70" rx="6" fill="#1E3A8A" fillOpacity="0.5" stroke="#2563EB" />
              <text x="380" y="80" fill="#BFDBFE" fontSize="11" fontWeight="bold" textAnchor="middle">new Person() @ 0x4A20</text>
              <text x="380" y="100" fill="#93C5FD" fontSize="10" textAnchor="middle">name: "Alice" (Ref to pool)</text>
              <text x="380" y="116" fill="#93C5FD" fontSize="10" textAnchor="middle">age: 28</text>
            </svg>
          </div>
        );

      case 'dsa-two-pointers-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <text x="250" y="30" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle">Sorted Array: [ 2, 7, 11, 15, 19, 24 ] | Target = 26</text>

              {/* Array Cells */}
              {[2, 7, 11, 15, 19, 24].map((val, idx) => (
                <g key={idx} transform={`translate(${55 + idx * 65}, 65)`}>
                  <rect
                    x="0"
                    y="0"
                    width="55"
                    height="50"
                    rx="6"
                    fill={idx === 1 || idx === 4 ? '#4C1D95' : '#0F172A'}
                    stroke={idx === 1 || idx === 4 ? '#A78BFA' : '#334155'}
                    strokeWidth={idx === 1 || idx === 4 ? 2 : 1}
                  />
                  <text x="27" y="32" fill={idx === 1 || idx === 4 ? '#EDE9FE' : '#94A3B8'} fontSize="14" fontWeight="bold" textAnchor="middle">
                    {val}
                  </text>
                  <text x="27" y="-8" fill="#64748B" fontSize="10" textAnchor="middle">idx {idx}</text>
                </g>
              ))}

              {/* Pointer Arrows */}
              <g transform="translate(147, 130)">
                <path d="M 0 35 L 0 5" stroke="#A78BFA" strokeWidth="2.5" />
                <polygon points="-5,10 5,10 0,0" fill="#A78BFA" />
                <text x="0" y="52" fill="#C4B5FD" fontSize="11" fontWeight="bold" textAnchor="middle">Left Pointer</text>
              </g>

              <g transform="translate(342, 130)">
                <path d="M 0 35 L 0 5" stroke="#F472B6" strokeWidth="2.5" />
                <polygon points="-5,10 5,10 0,0" fill="#F472B6" />
                <text x="0" y="52" fill="#FBCFE8" fontSize="11" fontWeight="bold" textAnchor="middle">Right Pointer</text>
              </g>

              <text x="250" y="190" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">
                Current Sum: 7 + 19 = 26 == Target! Match Found in O(N).
              </text>
            </svg>
          </div>
        );

      case 'dsa-binary-search-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <text x="250" y="25" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle">
                Search Target = 23 in Monotonic Sorted Array
              </text>

              {/* Sorted Numbers */}
              {[3, 7, 11, 14, 18, 23, 29, 35, 42].map((val, idx) => {
                const isMid = idx === 5;
                const inRange = idx >= 4 && idx <= 8;
                return (
                  <g key={idx} transform={`translate(${25 + idx * 50}, 60)`}>
                    <rect
                      x="0"
                      y="0"
                      width="42"
                      height="45"
                      rx="6"
                      fill={isMid ? '#047857' : inRange ? '#1E293B' : '#0F172A'}
                      stroke={isMid ? '#34D399' : inRange ? '#3B82F6' : '#1E293B'}
                      strokeWidth={isMid ? 2 : 1}
                      opacity={inRange ? 1 : 0.4}
                    />
                    <text x="21" y="28" fill={isMid ? '#ECFDF5' : inRange ? '#F1F5F9' : '#475569'} fontSize="13" fontWeight="bold" textAnchor="middle">
                      {val}
                    </text>
                    <text x="21" y="-6" fill="#64748B" fontSize="9" textAnchor="middle">{idx}</text>
                  </g>
                );
              })}

              {/* Mid Indicator */}
              <g transform="translate(296, 120)">
                <path d="M 0 30 L 0 5" stroke="#34D399" strokeWidth="2.5" />
                <polygon points="-5,10 5,10 0,0" fill="#34D399" />
                <text x="0" y="45" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">mid = 5 (Match!)</text>
              </g>

              {/* Range Bracket */}
              <text x="250" y="185" fill="#94A3B8" fontSize="11" textAnchor="middle">
                Left Halved: [0..3] discarded because 14 &lt; 23 → low = mid + 1
              </text>
            </svg>
          </div>
        );

      // Default fallback rich SVG diagram
      default:
        return (
          <div className="w-full bg-slate-950/70 p-5 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
            <svg viewBox="0 0 500 160" className="w-full h-auto text-slate-300">
              {/* Generalized Architectural Flow */}
              <rect x="30" y="45" width="100" height="60" rx="8" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
              <text x="80" y="73" fill="#A5B4FC" fontSize="11" fontWeight="bold" textAnchor="middle">Input State</text>
              <text x="80" y="90" fill="#64748B" fontSize="9" textAnchor="middle">Pre-Conditions</text>

              <path d="M 130 75 L 180 75" stroke="#6366F1" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="175,71 185,75 175,79" fill="#6366F1" />

              <rect x="185" y="35" width="130" height="80" rx="10" fill="#312E81" fillOpacity="0.4" stroke="#818CF8" strokeWidth="2" />
              <text x="250" y="70" fill="#C7D2FE" fontSize="12" fontWeight="bold" textAnchor="middle">Core Transform</text>
              <text x="250" y="88" fill="#94A3B8" fontSize="10" textAnchor="middle">Invariant Rules</text>

              <path d="M 315 75 L 365 75" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="360,71 370,75 360,79" fill="#10B981" />

              <rect x="370" y="45" width="100" height="60" rx="8" fill="#064E3B" fillOpacity="0.4" stroke="#10B981" strokeWidth="1.5" />
              <text x="420" y="73" fill="#6EE7B7" fontSize="11" fontWeight="bold" textAnchor="middle">Optimal Output</text>
              <text x="420" y="90" fill="#34D399" fontSize="9" textAnchor="middle">O(1) / O(N)</text>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
              Section B • Visual Understanding (50%)
            </span>
            <h4 className="text-sm font-bold text-slate-100">{data.title}</h4>
          </div>
        </div>
      </div>

      {/* Main Educational Graphic */}
      {renderVisualContent()}

      {/* Caption & Pedagogical Takeaway */}
      <p className="text-xs text-slate-400 italic leading-relaxed px-1">
        {data.caption}
      </p>

      {/* Optional Structured Comparison Table */}
      {data.details?.comparison && (
        <div className="overflow-x-auto rounded-xl border border-slate-800 mt-3">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300 font-semibold">
                {data.details.comparison.headers.map((h, i) => (
                  <th key={i} className="p-2.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 font-mono text-[11px]">
              {data.details.comparison.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? 'font-sans font-medium text-slate-300' : 'text-slate-400'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Optional Input/Output or Step Pipeline */}
      {data.details?.inputOutput && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Input</span>
            <span className="text-slate-300">{data.details.inputOutput.input}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold text-emerald-400 uppercase block font-sans">Output</span>
            <span className="text-emerald-300">{data.details.inputOutput.output}</span>
          </div>
        </div>
      )}
    </div>
  );
};
