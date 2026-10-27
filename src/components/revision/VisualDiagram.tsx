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

      case 'ml-regularization-geometry':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 220" className="w-full h-auto text-slate-300">
              <g transform="translate(130, 110)">
                <line x1="-90" y1="0" x2="90" y2="0" stroke="#475569" strokeWidth="1.5" />
                <line x1="0" y1="-80" x2="0" y2="80" stroke="#475569" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="50" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
                <ellipse cx="50" cy="-50" rx="45" ry="28" transform="rotate(-30 50 -50)" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="35" cy="-35" r="4" fill="#10B981" />
                <text x="0" y="70" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">Ridge (L2 Circle)</text>
                <text x="0" y="84" fill="#94A3B8" fontSize="8" textAnchor="middle">w shrinks smoothly</text>
              </g>
              <g transform="translate(370, 110)">
                <line x1="-90" y1="0" x2="90" y2="0" stroke="#475569" strokeWidth="1.5" />
                <line x1="0" y1="-80" x2="0" y2="80" stroke="#475569" strokeWidth="1.5" />
                <polygon points="0,-50 50,0 0,50 -50,0" fill="#EC4899" fillOpacity="0.15" stroke="#EC4899" strokeWidth="2" />
                <ellipse cx="50" cy="-50" rx="45" ry="28" transform="rotate(-30 50 -50)" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="0" cy="-50" r="4" fill="#10B981" />
                <text x="0" y="70" fill="#F472B6" fontSize="11" fontWeight="bold" textAnchor="middle">Lasso (L1 Diamond)</text>
                <text x="0" y="84" fill="#34D399" fontSize="8" fontWeight="bold" textAnchor="middle">Corner hit: w₁ = 0 (Sparse!)</text>
              </g>
            </svg>
          </div>
        );

      case 'ml-knn-neighborhood-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <circle cx="250" cy="100" r="55" fill="#6366F1" fillOpacity="0.12" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="250" cy="100" r="7" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
              <text x="250" y="85" fill="#FCD34D" fontSize="10" fontWeight="bold" textAnchor="middle">Query x_q</text>
              {/* Neighbors */}
              <circle cx="230" cy="80" r="5" fill="#3B82F6" />
              <circle cx="270" cy="90" r="5" fill="#3B82F6" />
              <circle cx="240" cy="130" r="5" fill="#F43F5E" />
              {/* Distant points */}
              <circle cx="150" cy="50" r="5" fill="#3B82F6" />
              <circle cx="340" cy="150" r="5" fill="#F43F5E" />
              <circle cx="170" cy="140" r="5" fill="#3B82F6" />
              <text x="250" y="175" fill="#94A3B8" fontSize="11" textAnchor="middle">
                K = 3 Neighbors: 2 Blue vs 1 Red → Majority Predicts Blue Class
              </text>
            </svg>
          </div>
        );

      case 'ml-decision-tree-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 210" className="w-full h-auto text-slate-300">
              {/* Root */}
              <rect x="180" y="15" width="140" height="36" rx="6" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
              <text x="250" y="38" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle">Age ≤ 35 ?</text>
              {/* Branches */}
              <line x1="210" y1="51" x2="130" y2="85" stroke="#475569" strokeWidth="2" />
              <text x="160" y="65" fill="#94A3B8" fontSize="9">Yes</text>
              <line x1="290" y1="51" x2="370" y2="85" stroke="#475569" strokeWidth="2" />
              <text x="340" y="65" fill="#94A3B8" fontSize="9">No</text>
              {/* Level 1 Nodes */}
              <rect x="60" y="85" width="140" height="36" rx="6" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />
              <text x="130" y="108" fill="#93C5FD" fontSize="10" fontWeight="bold" textAnchor="middle">Income &gt; $50k ?</text>
              <rect x="300" y="85" width="140" height="36" rx="6" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
              <text x="370" y="108" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle">Class: Approved (100%)</text>
              {/* Level 2 Leaves */}
              <line x1="95" y1="121" x2="70" y2="155" stroke="#475569" strokeWidth="1.5" />
              <line x1="165" y1="121" x2="190" y2="155" stroke="#475569" strokeWidth="1.5" />
              <rect x="20" y="155" width="100" height="30" rx="4" fill="#064E3B" stroke="#10B981" />
              <text x="70" y="174" fill="#D1FAE5" fontSize="9" fontWeight="bold" textAnchor="middle">Class: Approved</text>
              <rect x="140" y="155" width="100" height="30" rx="4" fill="#7F1D1D" stroke="#EF4444" />
              <text x="190" y="174" fill="#FEE2E2" fontSize="9" fontWeight="bold" textAnchor="middle">Class: Denied</text>
            </svg>
          </div>
        );

      case 'ml-svm-margin-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <line x1="80" y1="180" x2="420" y2="20" stroke="#6366F1" strokeWidth="3" />
              <line x1="40" y1="150" x2="380" y2="-10" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="120" y1="210" x2="460" y2="50" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="180" cy="70" r="6" fill="#3B82F6" stroke="#F59E0B" strokeWidth="2" />
              <text x="195" y="70" fill="#FCD34D" fontSize="10">Support Vector (+1)</text>
              <rect x="300" y="115" width="10" height="10" fill="#F43F5E" stroke="#F59E0B" strokeWidth="2" />
              <text x="320" y="125" fill="#FCD34D" fontSize="10">Support Vector (-1)</text>
              <text x="250" y="185" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">
                Maximum Margin = 2 / ||w||
              </text>
            </svg>
          </div>
        );

      case 'ml-metrics-roc-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 210" className="w-full h-auto text-slate-300">
              <line x1="70" y1="170" x2="430" y2="170" stroke="#475569" strokeWidth="2" />
              <line x1="70" y1="20" x2="70" y2="170" stroke="#475569" strokeWidth="2" />
              <line x1="70" y1="170" x2="430" y2="20" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="250" y="195" fill="#94A3B8" fontSize="11" textAnchor="middle">False Positive Rate (FPR) →</text>
              <text x="25" y="95" fill="#94A3B8" fontSize="11" textAnchor="middle" transform="rotate(-90 25 95)">True Positive Rate (TPR) →</text>
              {/* ROC Curve */}
              <path d="M 70 170 C 80 40, 160 30, 430 20" fill="none" stroke="#10B981" strokeWidth="3" />
              <text x="260" y="55" fill="#34D399" fontSize="12" fontWeight="bold">AUC = 0.94 (Excellent)</text>
              <text x="320" y="120" fill="#94A3B8" fontSize="10">Random Guess (AUC = 0.5)</text>
            </svg>
          </div>
        );

      case 'ml-ensembles-architecture':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <rect x="200" y="15" width="100" height="30" rx="4" fill="#1E293B" stroke="#475569" />
              <text x="250" y="34" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Dataset X</text>
              <line x1="220" y1="45" x2="110" y2="80" stroke="#6366F1" strokeWidth="1.5" />
              <line x1="250" y1="45" x2="250" y2="80" stroke="#6366F1" strokeWidth="1.5" />
              <line x1="280" y1="45" x2="390" y2="80" stroke="#6366F1" strokeWidth="1.5" />
              <rect x="60" y="80" width="100" height="35" rx="6" fill="#1E1B4B" stroke="#6366F1" />
              <text x="110" y="102" fill="#A5B4FC" fontSize="10" fontWeight="bold" textAnchor="middle">Model 1</text>
              <rect x="200" y="80" width="100" height="35" rx="6" fill="#1E1B4B" stroke="#6366F1" />
              <text x="250" y="102" fill="#A5B4FC" fontSize="10" fontWeight="bold" textAnchor="middle">Model 2</text>
              <rect x="340" y="80" width="100" height="35" rx="6" fill="#1E1B4B" stroke="#6366F1" />
              <text x="390" y="102" fill="#A5B4FC" fontSize="10" fontWeight="bold" textAnchor="middle">Model 3</text>
              <rect x="150" y="145" width="200" height="35" rx="6" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
              <text x="250" y="167" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle">Majority Vote / Blend → Final ŷ</text>
            </svg>
          </div>
        );

      case 'ml-kmeans-cluster-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              {/* Cluster 1 */}
              <circle cx="140" cy="90" r="45" fill="#3B82F6" fillOpacity="0.12" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="140" cy="90" r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
              <text x="140" y="75" fill="#FCA5A5" fontSize="9" fontWeight="bold" textAnchor="middle">Centroid μ₁</text>
              <circle cx="120" cy="80" r="4" fill="#60A5FA" />
              <circle cx="155" cy="105" r="4" fill="#60A5FA" />
              <circle cx="145" cy="70" r="4" fill="#60A5FA" />
              {/* Cluster 2 */}
              <circle cx="360" cy="110" r="50" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="360" cy="110" r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
              <text x="360" y="95" fill="#FCA5A5" fontSize="9" fontWeight="bold" textAnchor="middle">Centroid μ₂</text>
              <circle cx="340" cy="120" r="4" fill="#34D399" />
              <circle cx="380" cy="95" r="4" fill="#34D399" />
              <circle cx="370" cy="135" r="4" fill="#34D399" />
              <text x="250" y="180" fill="#94A3B8" fontSize="11" textAnchor="middle">
                Iteratively reassign points to nearest μ_k and recalculate center of mass
              </text>
            </svg>
          </div>
        );

      case 'ml-pca-projection-viz':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <line x1="80" y1="160" x2="420" y2="40" stroke="#6366F1" strokeWidth="2.5" />
              <text x="430" y="45" fill="#818CF8" fontSize="11" fontWeight="bold">PC1 (Max Variance)</text>
              <line x1="210" y1="50" x2="290" y2="150" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
              <text x="300" y="160" fill="#FCD34D" fontSize="10">PC2 (Orthogonal)</text>
              {/* Projected Points along PC1 */}
              <circle cx="150" cy="135" r="4" fill="#3B82F6" />
              <circle cx="210" cy="114" r="4" fill="#3B82F6" />
              <circle cx="270" cy="93" r="4" fill="#3B82F6" />
              <circle cx="330" cy="72" r="4" fill="#3B82F6" />
              <text x="250" y="190" fill="#94A3B8" fontSize="11" textAnchor="middle">
                Project d dimensions onto top k eigenvectors to retain maximum information
              </text>
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

      case 'ml-feature-scaling':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <rect x="20" y="20" width="210" height="150" rx="8" fill="#0F172A" stroke="#475569" strokeWidth="1" />
              <text x="125" y="42" fill="#F87171" fontSize="11" fontWeight="bold" textAnchor="middle">Before Scaling (Salary: 30k-140k)</text>
              <ellipse cx="125" cy="110" rx="80" ry="25" fill="#EF4444" fillOpacity="0.1" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="125" y="114" fill="#FCA5A5" fontSize="10" textAnchor="middle">Distorted Gradient Ravine</text>

              <path d="M 245 95 L 275 95" stroke="#6366F1" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="273,91 281,95 273,99" fill="#6366F1" />

              <rect x="290" y="20" width="190" height="150" rx="8" fill="#0F172A" stroke="#10B981" strokeWidth="1" />
              <text x="385" y="42" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">After Z-Score (Mean=0, Std=1)</text>
              <circle cx="385" cy="105" r="45" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2" />
              <text x="385" y="108" fill="#A7F3D0" fontSize="10" textAnchor="middle">Isotropic Circular Contour</text>
              <text x="250" y="190" fill="#94A3B8" fontSize="10" textAnchor="middle">Equal scaling ensures gradient descent marches directly toward minimum</text>
            </svg>
          </div>
        );

      case 'ml-neural-networks':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <text x="70" y="30" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">Input Layer x</text>
              <text x="250" y="30" fill="#A78BFA" fontSize="11" fontWeight="bold" textAnchor="middle">Hidden Layer a = ReLU(Wx+b)</text>
              <text x="430" y="30" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">Output y = σ(z)</text>

              {/* Input nodes */}
              {[60, 110, 160].map((y, i) => (
                <circle key={`in-${i}`} cx="70" cy={y} r="14" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
              ))}
              {/* Hidden nodes */}
              {[45, 90, 135, 175].map((y, i) => (
                <circle key={`hid-${i}`} cx="250" cy={y} r="14" fill="#312E81" stroke="#8B5CF6" strokeWidth="2" />
              ))}
              {/* Output node */}
              <circle cx="430" cy="110" r="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />

              {/* Connections */}
              {[60, 110, 160].map((y1) =>
                [45, 90, 135, 175].map((y2, j) => (
                  <line key={`c-${y1}-${j}`} x1="84" y1={y1} x2="236" y2={y2} stroke="#475569" strokeWidth="0.8" opacity="0.6" />
                ))
              )}
              {[45, 90, 135, 175].map((y, i) => (
                <line key={`out-${i}`} x1="264" y1={y} x2="414" y2="110" stroke="#8B5CF6" strokeWidth="1.2" opacity="0.7" />
              ))}

              <text x="250" y="196" fill="#F472B6" fontSize="10" textAnchor="middle">
                Forward: a^[l] = ReLU(W*a^[l-1] + b)  |  Backward: ∂L/∂W via Chain Rule
              </text>
            </svg>
          </div>
        );

      case 'dsa-prefix-sum':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <text x="250" y="24" fill="#94A3B8" fontSize="11" fontWeight="bold" textAnchor="middle">
                Query: Sum of subarray [L=2 .. R=4] in O(1) Time
              </text>

              {/* Original Array */}
              <text x="50" y="65" fill="#60A5FA" fontSize="11" fontWeight="bold">arr[i]:</text>
              {[3, 1, 4, 2, 7].map((val, idx) => (
                <g key={`a-${idx}`} transform={`translate(${110 + idx * 70}, 45)`}>
                  <rect x="0" y="0" width="55" height="30" rx="5" fill={idx >= 2 && idx <= 4 ? '#1E3A8A' : '#1E293B'} stroke={idx >= 2 && idx <= 4 ? '#60A5FA' : '#475569'} />
                  <text x="27" y="20" fill="#F1F5F9" fontSize="12" fontWeight="bold" textAnchor="middle">{val}</text>
                  <text x="27" y="-5" fill="#64748B" fontSize="9" textAnchor="middle">i={idx}</text>
                </g>
              ))}

              {/* Prefix Array */}
              <text x="50" y="130" fill="#34D399" fontSize="11" fontWeight="bold">P[i]:</text>
              {[3, 4, 8, 10, 17].map((val, idx) => {
                const isR = idx === 4;
                const isLminus1 = idx === 1;
                return (
                  <g key={`p-${idx}`} transform={`translate(${110 + idx * 70}, 110)`}>
                    <rect x="0" y="0" width="55" height="30" rx="5" fill={isR ? '#064E3B' : isLminus1 ? '#7C2D12' : '#1E293B'} stroke={isR ? '#10B981' : isLminus1 ? '#F97316' : '#475569'} strokeWidth={isR || isLminus1 ? 2 : 1} />
                    <text x="27" y="20" fill="#F1F5F9" fontSize="12" fontWeight="bold" textAnchor="middle">{val}</text>
                  </g>
                );
              })}

              <text x="250" y="180" fill="#FBBF24" fontSize="12" fontWeight="bold" textAnchor="middle">
                Formula: P[R] - P[L - 1] = 17 - 4 = 13  (Instant O(1) subtraction!)
              </text>
            </svg>
          </div>
        );

      case 'dsa-tries':
        return (
          <div className="w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <svg viewBox="0 0 500 200" className="w-full h-auto text-slate-300">
              <text x="250" y="22" fill="#94A3B8" fontSize="11" fontWeight="bold" textAnchor="middle">
                Trie Prefix Tree storing 'cat', 'car', and 'card'
              </text>

              {/* Root */}
              <circle cx="250" cy="50" r="16" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
              <text x="250" y="54" fill="#A5B4FC" fontSize="10" fontWeight="bold" textAnchor="middle">Root</text>

              {/* Level 1: 'c' */}
              <line x1="250" y1="66" x2="250" y2="94" stroke="#6366F1" strokeWidth="2" />
              <circle cx="250" cy="105" r="14" fill="#1E293B" stroke="#818CF8" strokeWidth="2" />
              <text x="250" y="109" fill="#E0E7FF" fontSize="12" fontWeight="bold" textAnchor="middle">c</text>

              {/* Level 2: 'a' */}
              <line x1="250" y1="119" x2="250" y2="140" stroke="#818CF8" strokeWidth="2" />
              <circle cx="250" cy="150" r="14" fill="#312E81" stroke="#A78BFA" strokeWidth="2" />
              <text x="250" y="154" fill="#EDE9FE" fontSize="12" fontWeight="bold" textAnchor="middle">a</text>

              {/* Branches: 't' and 'r' */}
              <line x1="240" y1="160" x2="180" y2="175" stroke="#10B981" strokeWidth="2" />
              <circle cx="170" cy="180" r="14" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
              <text x="170" y="184" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle">t ✓</text>

              <line x1="260" y1="160" x2="320" y2="175" stroke="#10B981" strokeWidth="2" />
              <circle cx="330" cy="180" r="14" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
              <text x="330" y="184" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle">r ✓</text>

              {/* 'd' child of 'r' */}
              <line x1="344" y1="180" x2="410" y2="180" stroke="#10B981" strokeWidth="2" />
              <circle cx="420" cy="180" r="14" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
              <text x="420" y="184" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle">d ✓</text>
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
