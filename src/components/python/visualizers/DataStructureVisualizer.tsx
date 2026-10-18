'use client';

import React, { useState } from 'react';
import {
  List,
  Database,
  Layers,
  CircleDot,
  Plus,
  Trash2,
  Search,
  RotateCcw,
  AlertCircle,
  Check,
  ArrowRight,
} from 'lucide-react';

type DSMode = 'list' | 'dict' | 'set' | 'tuple';

export const DataStructureVisualizer: React.FC = () => {
  const [mode, setMode] = useState<DSMode>('list');

  // List State
  const [listItems, setListItems] = useState<string[]>(['"python"', '42', 'True', '3.14']);
  const [newItemInput, setNewItemInput] = useState<string>('"data"');
  const [sliceStart, setSliceStart] = useState<number>(1);
  const [sliceStop, setSliceStop] = useState<number>(3);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  // Dict State
  const [dictItems, setDictItems] = useState<{ key: string; value: string }[]>([
    { key: '"name"', value: '"Alice"' },
    { key: '"role"', value: '"Engineer"' },
    { key: '"level"', value: '7' },
  ]);
  const [newKey, setNewKey] = useState<string>('"skills"');
  const [newVal, setNewVal] = useState<string>('["ML", "DSA"]');
  const [dictSearchKey, setDictSearchKey] = useState<string>('');
  const [dictSearchResult, setDictSearchResult] = useState<string | null>(null);

  // Set State
  const [setA, setSetA] = useState<string[]>(['"apple"', '"banana"', '"cherry"']);
  const [setB, setSetB] = useState<string[]>(['"banana"', '"date"', '"fig"']);
  const [setOp, setSetOp] = useState<'union' | 'intersection' | 'difference'>('intersection');
  const [newSetItem, setNewSetItem] = useState<string>('"orange"');
  const [setError, setSetError] = useState<string | null>(null);

  // Tuple State
  const [tupleItems] = useState<string[]>(['"HTTP"', '200', '"OK"']);
  const [tupleError, setTupleError] = useState<string | null>(null);
  const [unpackNames, setUnpackNames] = useState<string[]>(['protocol', 'status_code', 'status_text']);

  // List actions
  const handleAppend = () => {
    if (!newItemInput.trim()) return;
    setListItems([...listItems, newItemInput.trim()]);
    setHighlightIndex(listItems.length);
  };

  const handlePop = () => {
    if (listItems.length === 0) return;
    setListItems(listItems.slice(0, -1));
    setHighlightIndex(null);
  };

  const handleInsert = (index: number) => {
    if (!newItemInput.trim()) return;
    const next = [...listItems];
    next.splice(index, 0, newItemInput.trim());
    setListItems(next);
    setHighlightIndex(index);
  };

  const handleResetList = () => {
    setListItems(['"python"', '42', 'True', '3.14']);
    setHighlightIndex(null);
  };

  // Dict actions
  const handleSetDictItem = () => {
    if (!newKey.trim()) return;
    const existing = dictItems.findIndex((d) => d.key === newKey.trim());
    if (existing >= 0) {
      const copy = [...dictItems];
      copy[existing].value = newVal.trim();
      setDictItems(copy);
    } else {
      setDictItems([...dictItems, { key: newKey.trim(), value: newVal.trim() }]);
    }
  };

  const handleDeleteDictItem = (key: string) => {
    setDictItems(dictItems.filter((d) => d.key !== key));
  };

  const handleLookupDict = () => {
    const found = dictItems.find((d) => d.key === dictSearchKey.trim());
    if (found) {
      setDictSearchResult(`Found: ${found.value}`);
    } else {
      setDictSearchResult(`KeyError: '${dictSearchKey}' not found in dict`);
    }
  };

  // Set actions
  const handleAddSetA = () => {
    const val = newSetItem.trim();
    if (setA.includes(val)) {
      setSetError(`Duplicate rejected! Sets contain only unique elements.`);
      setTimeout(() => setSetError(null), 3000);
      return;
    }
    setSetA([...setA, val]);
    setSetError(null);
  };

  const getSetResult = (): string[] => {
    if (setOp === 'union') {
      return Array.from(new Set([...setA, ...setB]));
    }
    if (setOp === 'intersection') {
      return setA.filter((x) => setB.includes(x));
    }
    if (setOp === 'difference') {
      return setA.filter((x) => !setB.includes(x));
    }
    return [];
  };

  // Tuple mutation attempt
  const handleAttemptTupleMutation = () => {
    setTupleError("TypeError: 'tuple' object does not support item assignment. Tuples are immutable!");
    setTimeout(() => setTupleError(null), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Structure:</span>
        {[
          { id: 'list', label: 'List (Mutable Array)', icon: List },
          { id: 'dict', label: 'Dict (Hash Map)', icon: Database },
          { id: 'set', label: 'Set (Unique Collection)', icon: CircleDot },
          { id: 'tuple', label: 'Tuple (Immutable Sequence)', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = mode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id as DSMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* LIST VIEW */}
      {mode === 'list' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <List className="w-4 h-4 text-emerald-600" />
                  Python `list` Memory Representation
                </h3>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                  len = {listItems.length} | dynamic array
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Notice positive indices from left (0 to {listItems.length - 1}) and negative indices from right ({-listItems.length || 0} to -1).
              </p>
            </div>

            {/* List Slots Visualization */}
            <div className="overflow-x-auto pb-4">
              <div className="flex items-center gap-3 min-w-max p-2">
                {listItems.length === 0 ? (
                  <div className="p-8 text-center w-full text-slate-400 text-xs italic">
                    List is currently empty []
                  </div>
                ) : (
                  listItems.map((val, idx) => {
                    const isHighlighted = highlightIndex === idx;
                    const inSlice = idx >= sliceStart && idx < sliceStop;
                    return (
                      <div key={idx} className="flex flex-col items-center space-y-1">
                        {/* Positive index */}
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
                          [{idx}]
                        </span>

                        {/* Cell box */}
                        <div
                          className={`w-24 h-16 rounded-xl border flex flex-col items-center justify-center p-2 text-center transition-all ${
                            isHighlighted
                              ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/60 ring-2 ring-emerald-500 shadow-md'
                              : inSlice
                              ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30'
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 truncate w-full">
                            {val}
                          </span>
                          <span className="text-[10px] text-slate-400 font-sans">
                            ptr &rarr; obj
                          </span>
                        </div>

                        {/* Negative index */}
                        <span className="text-[10px] font-mono text-slate-500">
                          [{idx - listItems.length}]
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Slicing Demonstration */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Interactive Slice Visualizer: <code className="text-emerald-600 dark:text-emerald-400 font-bold">my_list[{sliceStart}:{sliceStop}]</code>
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                  Result: [{listItems.slice(sliceStart, sliceStop).join(', ')}]
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Start Index ({sliceStart}):</label>
                  <input
                    type="range"
                    min={0}
                    max={listItems.length}
                    value={sliceStart}
                    onChange={(e) => setSliceStart(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Stop Index ({sliceStop}):</label>
                  <input
                    type="range"
                    min={0}
                    max={listItems.length}
                    value={sliceStop}
                    onChange={(e) => setSliceStop(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* List Controls */}
            <div className="flex items-center gap-3 flex-wrap pt-2">
              <input
                type="text"
                value={newItemInput}
                onChange={(e) => setNewItemInput(e.target.value)}
                placeholder='Item e.g. "val" or 99'
                className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-36"
              />
              <button
                onClick={handleAppend}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> .append(x)
              </button>
              <button
                onClick={handlePop}
                disabled={listItems.length === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> .pop()
              </button>
              <button
                onClick={() => handleInsert(0)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                .insert(0, x)
              </button>
              <button
                onClick={handleResetList}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DICT VIEW */}
      {mode === 'dict' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                Python `dict` (Hash Table Key-Value Pairs)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Keys must be immutable and hashable (e.g. str, int, tuple). Values can be any object. O(1) average lookup.
              </p>
            </div>

            {/* Key-Value Buckets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {dictItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col justify-between space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                      key: hash({item.key})
                    </span>
                    <button
                      onClick={() => handleDeleteDictItem(item.key)}
                      title="del dict[k]"
                      className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="font-mono text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{item.key}</span>
                    <span className="text-slate-400 mx-1">:</span>
                    <span className="text-emerald-700 dark:text-emerald-300 font-medium">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lookup Tester */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                O(1) Key Lookup Tester:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={dictSearchKey}
                  onChange={(e) => setDictSearchKey(e.target.value)}
                  placeholder='e.g. "name" or "role"'
                  className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex-1"
                />
                <button
                  onClick={handleLookupDict}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" /> d[k] Lookup
                </button>
              </div>
              {dictSearchResult && (
                <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
                  {dictSearchResult}
                </div>
              )}
            </div>

            {/* Add / Update key-value */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder='key: "attr"'
                className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-36"
              />
              <span className="text-slate-400 font-mono">:</span>
              <input
                type="text"
                value={newVal}
                onChange={(e) => setNewVal(e.target.value)}
                placeholder='val: "test"'
                className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-36"
              />
              <button
                onClick={handleSetDictItem}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> d[k] = v
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SET VIEW */}
      {mode === 'set' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CircleDot className="w-4 h-4 text-emerald-600" />
                Python `set` (Unique Elements &amp; Mathematical Operations)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Unordered collections of unique elements. Duplicates are discarded automatically.
              </p>
            </div>

            {/* Sets A & B view */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Set A ({setA.length} items)</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {setA.map((el, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 font-mono text-xs text-slate-800 dark:text-slate-200">
                      {el}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-sky-50/30 dark:bg-sky-950/20 space-y-2">
                <span className="text-xs font-bold text-sky-700 dark:text-sky-300">Set B ({setB.length} items)</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {setB.map((el, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-sky-200 dark:border-sky-800 font-mono text-xs text-slate-800 dark:text-slate-200">
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Set Operation Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Operation:</span>
              {[
                { id: 'intersection', label: 'Intersection (A & B)' },
                { id: 'union', label: 'Union (A | B)' },
                { id: 'difference', label: 'Difference (A - B)' },
              ].map((op) => (
                <button
                  key={op.id}
                  onClick={() => setSetOp(op.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    setOp === op.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>

            {/* Set Operation Result */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="text-xs text-slate-400 font-mono">
                Resulting Set:
              </div>
              <div className="flex items-center gap-2 flex-wrap font-mono text-sm text-emerald-400">
                {'{' + getSetResult().join(', ') + '}'}
              </div>
            </div>

            {/* Add duplicate tester */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newSetItem}
                onChange={(e) => setNewSetItem(e.target.value)}
                placeholder='item e.g. "apple"'
                className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-44"
              />
              <button
                onClick={handleAddSetA}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add to Set A
              </button>
            </div>
            {setError && (
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {setError}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TUPLE VIEW */}
      {mode === 'tuple' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                Python `tuple` (Immutable Sequence &amp; Unpacking)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tuples cannot be altered after creation. They are memory-efficient and can be used as dictionary keys.
              </p>
            </div>

            {/* Tuple visual box */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="text-xs font-mono text-slate-500">
                response = ({tupleItems.join(', ')})
              </div>
              <div className="flex items-center gap-3">
                {tupleItems.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-mono text-xs font-bold text-slate-900 dark:text-slate-100"
                  >
                    <span className="block text-[10px] text-slate-400 font-sans mb-1">Index {idx}</span>
                    {val}
                  </div>
                ))}
              </div>
            </div>

            {/* Unpacking demonstration */}
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Tuple Unpacking: <code className="font-mono">protocol, status_code, status_text = response</code>
              </span>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                {unpackNames.map((name, i) => (
                  <div key={name} className="p-2 rounded bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-center">
                    <span className="text-slate-400 text-[10px] block">{name}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{tupleItems[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Immutability violation test */}
            <div className="pt-2">
              <button
                onClick={handleAttemptTupleMutation}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors"
              >
                <AlertCircle className="w-4 h-4" />
                Attempt Mutation: <code>response[1] = 404</code>
              </button>

              {tupleError && (
                <div className="mt-3 p-3 rounded-xl bg-red-100/80 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-xs font-mono text-red-800 dark:text-red-300">
                  {tupleError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
