'use client';

import React from 'react';
import { PythonConceptType } from '@/lib/types';
import { ExecutionVisualizer } from './ExecutionVisualizer';
import { DataStructureVisualizer } from './DataStructureVisualizer';
import { OOPVisualizer } from './OOPVisualizer';
import { MemoryVisualizer } from './MemoryVisualizer';
import { Terminal, Database, Box, Cpu } from 'lucide-react';

interface PythonVisualizerDispatcherProps {
  type: PythonConceptType;
}

export const PythonVisualizerDispatcher: React.FC<PythonVisualizerDispatcherProps> = ({ type }) => {
  if (type === 'none') {
    return null;
  }

  const renderVisualizer = () => {
    switch (type) {
      case 'execution-trace':
        return <ExecutionVisualizer />;
      case 'data-structure-visual':
        return <DataStructureVisualizer />;
      case 'oop-diagram':
        return <OOPVisualizer />;
      case 'memory-model':
        return <MemoryVisualizer />;
      default:
        return null;
    }
  };

  const getMeta = () => {
    switch (type) {
      case 'execution-trace':
        return {
          title: 'Interactive Python Execution Tracer',
          badge: 'Step-by-Step Runtime',
          icon: Terminal,
        };
      case 'data-structure-visual':
        return {
          title: 'Python Collections & Data Structures Explorer',
          badge: 'Memory & Operations',
          icon: Database,
        };
      case 'oop-diagram':
        return {
          title: 'OOP Architecture & Method Resolution Visualizer',
          badge: 'Object-Oriented Python',
          icon: Box,
        };
      case 'memory-model':
        return {
          title: 'Python Memory Model & Identity Inspector',
          badge: 'Stack, Heap & References',
          icon: Cpu,
        };
      default:
        return {
          title: 'Interactive Python Visualizer',
          badge: 'Visualizer',
          icon: Terminal,
        };
    }
  };

  const meta = getMeta();
  const Icon = meta.icon;

  return (
    <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/40 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-950 p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {meta.title}
            </h3>
            <p className="text-[11px] text-slate-500">
              Explore dynamic behavior step by step with zero fabricated abstractions.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          {meta.badge}
        </span>
      </div>

      {/* Render Component */}
      <div>{renderVisualizer()}</div>
    </div>
  );
};
