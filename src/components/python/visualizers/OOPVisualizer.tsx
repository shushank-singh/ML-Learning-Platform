'use client';

import React, { useState } from 'react';
import { Box, GitMerge, ArrowDown, Sparkles, Check, ChevronRight } from 'lucide-react';

type OOPTab = 'instance-self' | 'inheritance' | 'mro';

export const OOPVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OOPTab>('instance-self');

  // Instance-self state
  const [selectedInstance, setSelectedInstance] = useState<'dog1' | 'dog2'>('dog1');
  const [callingMethod, setCallingMethod] = useState<boolean>(false);
  const [methodMessage, setMethodMessage] = useState<string | null>(null);

  // Inheritance state
  const [selectedSubclass, setSelectedSubclass] = useState<'Dog' | 'Cat'>('Dog');

  // MRO state
  const [mroStep, setMroStep] = useState<number>(0);

  const handleCallBark = () => {
    setCallingMethod(true);
    const instName = selectedInstance === 'dog1' ? 'dog1 ("Buddy")' : 'dog2 ("Bella")';
    setMethodMessage(
      `Python internally executes: Dog.bark(self=${selectedInstance})\n-> self.name is "${
        selectedInstance === 'dog1' ? 'Buddy' : 'Bella'
      }" -> Returns "Woof! My name is ${selectedInstance === 'dog1' ? 'Buddy' : 'Bella'}!"`
    );
    setTimeout(() => setCallingMethod(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Concept:</span>
        {[
          { id: 'instance-self', label: 'Classes, Instances & self' },
          { id: 'inheritance', label: 'Inheritance & super()' },
          { id: 'mro', label: 'Multiple Inheritance & MRO' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as OOPTab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === t.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: INSTANCES & SELF */}
      {activeTab === 'instance-self' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Box className="w-4 h-4 text-emerald-600" />
                Class Blueprint vs Instance State (`__dict__`)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                A class defines shared behavior and class attributes. Each instance has its own private dictionary of attributes and passes itself as the first parameter <code>self</code> to methods.
              </p>
            </div>

            {/* Visual Class Blueprint and Instances */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Class Blueprint Card */}
              <div className="p-4 rounded-xl border-2 border-emerald-500/50 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-300">
                    class Dog:
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-semibold">
                    Class Object
                  </span>
                </div>
                <div className="space-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                  <div className="text-slate-400 text-[10px]"># Class Attribute (shared):</div>
                  <div>species = &quot;Canis familiaris&quot;</div>
                  <div className="text-slate-400 text-[10px] pt-1"># Methods:</div>
                  <div>def __init__(self, name):</div>
                  <div className="pl-3 text-slate-500">self.name = name</div>
                  <div>def bark(self):</div>
                  <div className="pl-3 text-slate-500">return f&quot;Woof! I&apos;m &#123;self.name&#125;&quot;</div>
                </div>
              </div>

              {/* Instance 1 */}
              <div
                onClick={() => setSelectedInstance('dog1')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedInstance === 'dog1'
                    ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 ring-2 ring-emerald-500/30 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">
                    dog1 = Dog(&quot;Buddy&quot;)
                  </span>
                  <span className="text-[10px] text-slate-400">Instance 1</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-slate-400 text-[10px]"># Instance __dict__:</div>
                  <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    &#123; &quot;name&quot;: &quot;Buddy&quot; &#125;
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Points to Dog.__class__
                  </div>
                </div>
              </div>

              {/* Instance 2 */}
              <div
                onClick={() => setSelectedInstance('dog2')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedInstance === 'dog2'
                    ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 ring-2 ring-emerald-500/30 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">
                    dog2 = Dog(&quot;Bella&quot;)
                  </span>
                  <span className="text-[10px] text-slate-400">Instance 2</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-slate-400 text-[10px]"># Instance __dict__:</div>
                  <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    &#123; &quot;name&quot;: &quot;Bella&quot; &#125;
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Points to Dog.__class__
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Method Invocation */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Selected instance: <code className="text-emerald-600 font-bold">{selectedInstance}</code>
                </span>
                <button
                  onClick={handleCallBark}
                  disabled={callingMethod}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Call {selectedInstance}.bark()
                </button>
              </div>

              {methodMessage && (
                <div className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-xs whitespace-pre-line leading-relaxed">
                  {methodMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INHERITANCE & SUPER */}
      {activeTab === 'inheritance' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <GitMerge className="w-4 h-4 text-emerald-600" />
                Inheritance Hierarchy &amp; `super()` Resolution
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Subclasses inherit attributes and methods from base classes. <code>super()</code> delegates method calls up the inheritance chain.
              </p>
            </div>

            {/* Tree Diagram */}
            <div className="flex flex-col items-center space-y-3 py-2">
              {/* Parent Class */}
              <div className="w-64 p-3.5 rounded-xl border-2 border-sky-400 bg-sky-50 dark:bg-sky-950/30 text-center font-mono text-xs">
                <div className="font-bold text-sky-700 dark:text-sky-300">class Animal:</div>
                <div className="text-[11px] text-slate-500 mt-1">def __init__(self, name)</div>
                <div className="text-[11px] text-slate-500">def speak(self) &rarr; &quot;...&quot;</div>
              </div>

              <div className="flex items-center text-slate-400">
                <ArrowDown className="w-5 h-5" />
              </div>

              {/* Subclasses */}
              <div className="flex items-center gap-6">
                <div
                  onClick={() => setSelectedSubclass('Dog')}
                  className={`w-44 p-3 rounded-xl border cursor-pointer font-mono text-xs transition-all ${
                    selectedSubclass === 'Dog'
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">class Dog(Animal):</div>
                  <div className="text-[10px] text-slate-500 mt-1">super().__init__(name)</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">speak() &rarr; &quot;Woof!&quot;</div>
                </div>

                <div
                  onClick={() => setSelectedSubclass('Cat')}
                  className={`w-44 p-3 rounded-xl border cursor-pointer font-mono text-xs transition-all ${
                    selectedSubclass === 'Cat'
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-purple-700 dark:text-purple-400">class Cat(Animal):</div>
                  <div className="text-[10px] text-slate-500 mt-1">super().__init__(name)</div>
                  <div className="text-[10px] text-purple-600 font-semibold">speak() &rarr; &quot;Meow!&quot;</div>
                </div>
              </div>
            </div>

            {/* Explanation box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Method Overriding in {selectedSubclass}:
              </span>
              <p className="leading-relaxed">
                When <code>{selectedSubclass.toLowerCase()}.speak()</code> is invoked, Python checks <code>{selectedSubclass}</code> first. Since <code>{selectedSubclass}</code> defines its own <code>speak()</code>, it overrides the implementation in <code>Animal</code>. If a method is not found on <code>{selectedSubclass}</code>, Python automatically looks up into <code>Animal</code>, and finally <code>object</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MRO */}
      {activeTab === 'mro' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <GitMerge className="w-4 h-4 text-emerald-600" />
                C3 Linearization &amp; Method Resolution Order (`__mro__`)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                When classes use multiple inheritance (e.g. Diamond Problem), Python computes an unambiguous lookup order using C3 Linearization.
              </p>
            </div>

            {/* Diamond diagram */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-3">
              <div className="text-slate-400">
                # Class Hierarchy:
              </div>
              <div className="text-emerald-400">
                class Base: ...<br />
                class A(Base): ...<br />
                class B(Base): ...<br />
                class D(A, B): ...  # Diamond inheritance
              </div>
            </div>

            {/* Step through MRO order */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                D.__mro__ Resolution Order:
              </div>
              <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
                {['D', 'A', 'B', 'Base', 'object'].map((clsName, idx) => (
                  <React.Fragment key={clsName}>
                    <div
                      className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                        mroStep === idx
                          ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm scale-105'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {clsName}
                    </div>
                    {idx < 4 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setMroStep((s) => (s + 1) % 5)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                Next Lookup Step ({mroStep + 1}/5)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
