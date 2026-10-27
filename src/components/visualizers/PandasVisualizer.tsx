'use client';

import React, { useState } from 'react';
import {
  Table,
  Filter,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Split,
  Layers,
  Database,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface EmployeeRecord {
  id: string;
  name: string;
  dept: string;
  salary: number;
  rating: number;
}

export const PandasVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'indexing' | 'filtering' | 'groupby' | 'cleaning'>('groupby');

  // Indexing mode: loc vs iloc
  const [indexMode, setIndexMode] = useState<'loc' | 'iloc'>('loc');
  const [selectedRowLabel, setSelectedRowLabel] = useState<string>('E102');
  const [selectedColName, setSelectedColName] = useState<string>('Salary');

  // Filtering threshold
  const [salaryThreshold, setSalaryThreshold] = useState<number>(60000);

  // Groupby step player
  const [groupbyStep, setGroupbyStep] = useState<number>(0); // 0: Raw table, 1: Split into buckets, 2: Apply mean(), 3: Combined Series

  // Cleaning mode: missing values
  const [imputeMethod, setImputeMethod] = useState<'raw' | 'median' | 'drop'>('raw');

  const dataset: EmployeeRecord[] = [
    { id: 'E101', name: 'Alice', dept: 'Engineering', salary: 95000, rating: 4.8 },
    { id: 'E102', name: 'Bob', dept: 'Marketing', salary: 62000, rating: 3.9 },
    { id: 'E103', name: 'Charlie', dept: 'Engineering', salary: 88000, rating: 4.5 },
    { id: 'E104', name: 'Diana', dept: 'Design', salary: 71000, rating: 4.2 },
    { id: 'E105', name: 'Evan', dept: 'Marketing', salary: 54000, rating: 3.5 },
  ];

  const columns = ['name', 'dept', 'salary', 'rating'] as const;

  // Filtered dataset
  const filteredData = dataset.filter((r) => r.salary >= salaryThreshold);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
      {/* Top Header */}
      <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center font-bold">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Pandas Interactive DataFrame Laboratory</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Live Data Wrangler
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore loc vs iloc coordinate indexing, boolean masks, and the GroupBy split-apply-combine lifecycle.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('groupby')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'groupby'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            GroupBy Mechanics
          </button>
          <button
            onClick={() => setActiveTab('indexing')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'indexing'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            loc vs iloc
          </button>
          <button
            onClick={() => setActiveTab('filtering')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'filtering'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Boolean Filter
          </button>
          <button
            onClick={() => setActiveTab('cleaning')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'cleaning'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Null Imputation
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* ========================================================================= */}
        {/* 1. GROUPBY SPLIT-APPLY-COMBINE */}
        {/* ========================================================================= */}
        {activeTab === 'groupby' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-emerald-400 font-bold">
                  df.groupby(&apos;dept&apos;)[&apos;salary&apos;].mean()
                </span>
                <p className="text-slate-400">
                  Step {groupbyStep + 1} of 4:{' '}
                  {groupbyStep === 0 && '1. Raw rectangular table with homogeneous rows.'}
                  {groupbyStep === 1 && '2. SPLIT: Partitioning rows into groups by unique Department keys.'}
                  {groupbyStep === 2 && '3. APPLY: Computing statistical reduction (.mean()) within each isolated bucket.'}
                  {groupbyStep === 3 && '4. COMBINE: Gluing reduced values back into a clean aggregated Series.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGroupbyStep((prev) => (prev + 1) % 4)}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Next Phase ({groupbyStep + 1}/4)</span>
                </button>
                <button
                  onClick={() => setGroupbyStep(0)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stages Display */}
            {groupbyStep === 0 && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
                <div className="text-xs font-mono text-slate-400 mb-3">1. Initial DataFrame:</div>
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2 font-mono">Index</th>
                      <th className="p-2">Name</th>
                      <th className="p-2 font-semibold text-emerald-400">Department (Key)</th>
                      <th className="p-2 font-semibold text-cyan-400">Salary (Value)</th>
                      <th className="p-2">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
                    {dataset.map((row) => (
                      <tr key={row.id}>
                        <td className="p-2 text-slate-500">{row.id}</td>
                        <td className="p-2">{row.name}</td>
                        <td className="p-2 text-emerald-300 font-bold">{row.dept}</td>
                        <td className="p-2 text-cyan-300 font-bold">${row.salary.toLocaleString()}</td>
                        <td className="p-2 text-slate-400">{row.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {groupbyStep === 1 && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400">
                  2. SPLIT: Rows segregated into distinct hash groups:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Engineering Bucket */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/50 space-y-2">
                    <div className="text-xs font-bold text-indigo-400">Group: &apos;Engineering&apos; (2 rows)</div>
                    <div className="space-y-1 text-xs font-mono text-slate-300">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                        <span>Alice</span>
                        <span className="text-cyan-400 font-bold">$95,000</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                        <span>Charlie</span>
                        <span className="text-cyan-400 font-bold">$88,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Bucket */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/50 space-y-2">
                    <div className="text-xs font-bold text-emerald-400">Group: &apos;Marketing&apos; (2 rows)</div>
                    <div className="space-y-1 text-xs font-mono text-slate-300">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                        <span>Bob</span>
                        <span className="text-cyan-400 font-bold">$62,000</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                        <span>Evan</span>
                        <span className="text-cyan-400 font-bold">$54,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Design Bucket */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/50 space-y-2">
                    <div className="text-xs font-bold text-amber-400">Group: &apos;Design&apos; (1 row)</div>
                    <div className="space-y-1 text-xs font-mono text-slate-300">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                        <span>Diana</span>
                        <span className="text-cyan-400 font-bold">$71,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {groupbyStep === 2 && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400">
                  3. APPLY: Executing mean() aggregation on each bucket independently:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500 space-y-2 text-center">
                    <div className="text-xs font-bold text-indigo-300">Engineering Mean</div>
                    <div className="text-xs font-mono text-slate-400">(95,000 + 88,000) / 2</div>
                    <div className="text-xl font-bold font-mono text-indigo-400">$91,500.00</div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500 space-y-2 text-center">
                    <div className="text-xs font-bold text-emerald-300">Marketing Mean</div>
                    <div className="text-xs font-mono text-slate-400">(62,000 + 54,000) / 2</div>
                    <div className="text-xl font-bold font-mono text-emerald-400">$58,000.00</div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500 space-y-2 text-center">
                    <div className="text-xs font-bold text-amber-300">Design Mean</div>
                    <div className="text-xs font-mono text-slate-400">71,000 / 1</div>
                    <div className="text-xl font-bold font-mono text-amber-400">$71,000.00</div>
                  </div>
                </div>
              </div>
            )}

            {groupbyStep === 3 && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400">
                  4. COMBINE: Final clean Pandas Series output:
                </div>
                <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/50 max-w-sm mx-auto space-y-3 font-mono text-xs">
                  <div className="flex justify-between pb-2 border-b border-slate-800 text-slate-400 font-bold">
                    <span>Department (Index)</span>
                    <span>Salary Mean</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Design</span>
                    <span className="text-emerald-400 font-bold">$71,000.00</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Engineering</span>
                    <span className="text-emerald-400 font-bold">$91,500.00</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Marketing</span>
                    <span className="text-emerald-400 font-bold">$58,000.00</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                    Name: salary, dtype: float64
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. LOC VS ILOC */}
        {/* ========================================================================= */}
        {activeTab === 'indexing' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-emerald-400 font-bold">
                  {indexMode === 'loc'
                    ? `df.loc['${selectedRowLabel}', '${selectedColName}']`
                    : `df.iloc[1, 2]`}
                </span>
                <p className="text-slate-400">
                  {indexMode === 'loc'
                    ? '.loc uses explicit index labels (e.g. index="E102", column="Salary").'
                    : '.iloc uses zero-based numerical integer positions (e.g. row 1, col 2).'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIndexMode('loc')}
                  className={`px-3.5 py-2 rounded-lg font-semibold transition-all ${
                    indexMode === 'loc' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  .loc (Label-based)
                </button>
                <button
                  onClick={() => setIndexMode('iloc')}
                  className={`px-3.5 py-2 rounded-lg font-semibold transition-all ${
                    indexMode === 'iloc' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  .iloc (Integer-based)
                </button>
              </div>
            </div>

            {/* Interactive Grid Table with Highlighted Target */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 font-mono">Row Label</th>
                    <th className={`p-2 ${selectedColName === 'Name' ? 'text-emerald-400 font-bold' : ''}`}>
                      Name [0]
                    </th>
                    <th className={`p-2 ${selectedColName === 'Department' ? 'text-emerald-400 font-bold' : ''}`}>
                      Department [1]
                    </th>
                    <th className={`p-2 ${selectedColName === 'Salary' ? 'text-emerald-400 font-bold' : ''}`}>
                      Salary [2]
                    </th>
                    <th className={`p-2 ${selectedColName === 'Rating' ? 'text-emerald-400 font-bold' : ''}`}>
                      Rating [3]
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
                  {dataset.map((row, rIdx) => {
                    const isTargetRow =
                      indexMode === 'loc' ? row.id === selectedRowLabel : rIdx === 1;

                    return (
                      <tr
                        key={row.id}
                        className={`transition-colors ${
                          isTargetRow ? 'bg-emerald-950/30' : 'hover:bg-slate-900/50'
                        }`}
                      >
                        <td
                          onClick={() => setSelectedRowLabel(row.id)}
                          className={`p-2 cursor-pointer font-bold ${
                            isTargetRow ? 'text-emerald-400' : 'text-slate-500'
                          }`}
                        >
                          {row.id} <span className="text-[10px] font-normal text-slate-600">[{rIdx}]</span>
                        </td>
                        <td className="p-2">{row.name}</td>
                        <td className="p-2">{row.dept}</td>
                        <td
                          className={`p-2 font-bold ${
                            isTargetRow && (indexMode === 'iloc' || selectedColName === 'Salary')
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded scale-105'
                              : 'text-slate-300'
                          }`}
                        >
                          ${row.salary.toLocaleString()}
                        </td>
                        <td className="p-2 text-slate-400">{row.rating}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. BOOLEAN FILTERING */}
        {/* ========================================================================= */}
        {activeTab === 'filtering' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-bold">
                  df[df[&apos;Salary&apos;] &gt;= {salaryThreshold.toLocaleString()}]
                </span>
                <span className="text-slate-400">
                  Active Filter: {filteredData.length} of {dataset.length} Rows Pass
                </span>
              </div>

              <div>
                <input
                  type="range"
                  min="50000"
                  max="100000"
                  step="5000"
                  value={salaryThreshold}
                  onChange={(e) => setSalaryThreshold(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>$50,000</span>
                  <span>$75,000</span>
                  <span>$100,000</span>
                </div>
              </div>
            </div>

            {/* Filtered Records */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 font-mono">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Department</th>
                    <th className="p-2 font-bold text-emerald-400">Salary</th>
                    <th className="p-2 font-mono">Mask Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {dataset.map((row) => {
                    const passes = row.salary >= salaryThreshold;

                    return (
                      <tr
                        key={row.id}
                        className={`transition-colors ${
                          passes ? 'text-slate-200 bg-emerald-950/15' : 'text-slate-600 line-through opacity-40'
                        }`}
                      >
                        <td className="p-2">{row.id}</td>
                        <td className="p-2">{row.name}</td>
                        <td className="p-2">{row.dept}</td>
                        <td className="p-2 font-bold">${row.salary.toLocaleString()}</td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              passes
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {passes ? 'True' : 'False'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. MISSING VALUES IMPUTATION */}
        {/* ========================================================================= */}
        {activeTab === 'cleaning' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-emerald-400 font-bold">
                  {imputeMethod === 'raw' && 'Raw Data with NaN missing values'}
                  {imputeMethod === 'median' && 'df.fillna(df.median(numeric_only=True))'}
                  {imputeMethod === 'drop' && 'df.dropna()'}
                </span>
                <p className="text-slate-400">
                  Auditing null values and testing median imputation vs dropping records.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setImputeMethod('raw')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    imputeMethod === 'raw' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Raw (with NaN)
                </button>
                <button
                  onClick={() => setImputeMethod('median')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    imputeMethod === 'median' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Impute Median ($71,000)
                </button>
                <button
                  onClick={() => setImputeMethod('drop')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    imputeMethod === 'drop' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Drop NA
                </button>
              </div>
            </div>

            {/* Table with NaN handling */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 font-mono">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Department</th>
                    <th className="p-2 font-bold text-cyan-400">Salary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2">E101</td>
                    <td className="p-2">Alice</td>
                    <td className="p-2">Engineering</td>
                    <td className="p-2">$95,000</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2">E102</td>
                    <td className="p-2">Bob</td>
                    <td className="p-2">Marketing</td>
                    <td className="p-2">
                      {imputeMethod === 'raw' ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          NaN (Missing)
                        </span>
                      ) : imputeMethod === 'median' ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                          $71,000 (Imputed)
                        </span>
                      ) : (
                        <span className="text-slate-600">[Dropped]</span>
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2">E103</td>
                    <td className="p-2">Charlie</td>
                    <td className="p-2">Engineering</td>
                    <td className="p-2">$88,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

