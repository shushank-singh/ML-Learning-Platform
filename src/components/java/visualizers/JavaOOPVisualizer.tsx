'use client';

import React, { useState } from 'react';
import {
  Boxes,
  ArrowRight,
  GitBranch,
  Shield,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export const JavaOOPVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'class-object' | 'inheritance' | 'polymorphism' | 'interface'>('polymorphism');
  const [selectedAnimal, setSelectedAnimal] = useState<'dog' | 'cat' | 'duck'>('dog');

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Interactive Java OOP Architecture & Dynamic Dispatch
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore classes vs objects, inheritance hierarchies, polymorphism, and interface contracts
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('polymorphism')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'polymorphism'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Polymorphism
          </button>
          <button
            onClick={() => setActiveTab('inheritance')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'inheritance'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Inheritance
          </button>
          <button
            onClick={() => setActiveTab('interface')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'interface'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Interfaces
          </button>
          <button
            onClick={() => setActiveTab('class-object')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'class-object'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Class vs Object
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* POLYMORPHISM TAB */}
        {activeTab === 'polymorphism' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-pink-100 dark:border-pink-950/60 bg-pink-50/40 dark:bg-pink-950/20 p-4">
              <span className="text-xs font-bold text-pink-700 dark:text-pink-300 block mb-1">
                Dynamic Method Dispatch (Runtime Polymorphism):
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A superclass reference <code className="font-mono font-bold text-pink-600">Animal a</code> can hold any subclass object. When calling <code className="font-mono font-bold text-pink-600">a.makeSound()</code>, the JVM checks the <em>actual heap object type</em> at runtime and dispatches to that specific overridden method!
              </p>
            </div>

            {/* Interactive Object Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Instantiate Subclass into Reference <code className="font-mono text-pink-600">Animal a</code>:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedAnimal('dog')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedAnimal === 'dog'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  new Dog("Buddy")
                </button>
                <button
                  onClick={() => setSelectedAnimal('cat')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedAnimal === 'cat'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  new Cat("Milo")
                </button>
                <button
                  onClick={() => setSelectedAnimal('duck')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedAnimal === 'duck'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  new Duck("Donald")
                </button>
              </div>
            </div>

            {/* Polymorphic Execution Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Stack Reference */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  1. Compile-Time Reference
                </div>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
                  <span className="text-pink-600 font-bold">Animal</span> a;
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Compiler verifies method <code className="font-mono">makeSound()</code> exists in <code className="font-mono">Animal</code>.
                </p>
              </div>

              {/* Dynamic Dispatch Arrow */}
              <div className="flex flex-col items-center justify-center text-center p-2">
                <div className="text-[11px] font-mono font-bold text-pink-600 dark:text-pink-400 mb-1">
                  JVM vtable Lookup ➔
                </div>
                <div className="w-full h-0.5 bg-gradient-to-r from-pink-500 to-indigo-500" />
                <div className="text-[10px] text-slate-400 mt-1">
                  Resolves target object at runtime
                </div>
              </div>

              {/* Heap Instance & Method Dispatched */}
              <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20">
                <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-wider mb-1">
                  2. Heap Object & Override Invoked
                </div>
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {selectedAnimal === 'dog' && 'Dog.makeSound() ➔ "Woof! Woof!"'}
                  {selectedAnimal === 'cat' && 'Cat.makeSound() ➔ "Meow! Purr!"'}
                  {selectedAnimal === 'duck' && 'Duck.makeSound() ➔ "Quack! Quack!"'}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  Actual instance: <code className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">{selectedAnimal.toUpperCase()}</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INHERITANCE TAB */}
        {activeTab === 'inheritance' && (
          <div className="space-y-6">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Inheritance creates an <strong>IS-A</strong> relationship using the <code className="font-mono font-bold text-pink-600">extends</code> keyword. Subclasses inherit fields and methods, and can invoke superclass constructors using <code className="font-mono font-bold text-pink-600">super()</code>.
            </div>

            <div className="flex flex-col items-center space-y-3">
              {/* Parent Class */}
              <div className="w-full max-w-md p-4 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30">
                <div className="flex items-center justify-between pb-1.5 border-b border-amber-200 dark:border-amber-900/60 mb-2">
                  <span className="font-bold font-mono text-xs text-amber-800 dark:text-amber-300">
                    class Animal (Superclass)
                  </span>
                  <span className="text-[10px] font-mono text-amber-600 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded">
                    Parent
                  </span>
                </div>
                <div className="font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
                  <div># String name;</div>
                  <div>+ Animal(String name) {`{ ... }`}</div>
                  <div>+ void sleep() {`{ System.out.println("Zzz..."); }`}</div>
                  <div>+ void makeSound() {`{ ... }`}</div>
                </div>
              </div>

              <div className="flex flex-col items-center text-slate-400 font-mono text-xs">
                <div>▲ extends (IS-A)</div>
                <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />
              </div>

              {/* Subclass */}
              <div className="w-full max-w-md p-4 rounded-xl border border-indigo-300 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/30">
                <div className="flex items-center justify-between pb-1.5 border-b border-indigo-200 dark:border-indigo-900/60 mb-2">
                  <span className="font-bold font-mono text-xs text-indigo-800 dark:text-indigo-300">
                    class Dog extends Animal (Subclass)
                  </span>
                  <span className="text-[10px] font-mono text-indigo-600 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded">
                    Child
                  </span>
                </div>
                <div className="font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
                  <div>- String breed;</div>
                  <div>+ Dog(String name, String breed) {`{ super(name); this.breed = breed; }`}</div>
                  <div>+ @Override void makeSound() {`{ System.out.println("Woof!"); }`}</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">+ void fetchBall() {`{ ... }`}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INTERFACE TAB */}
        {activeTab === 'interface' && (
          <div className="space-y-6">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              In Java, a class can inherit from only <strong>one</strong> class, but can implement <strong>multiple interfaces</strong>. Interfaces define contracts of behavior.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
                <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-300 block mb-1">
                  interface Swimmable
                </span>
                <div className="font-mono text-xs text-slate-600 dark:text-slate-400 mt-2">
                  void swim();
                </div>
              </div>

              <div className="p-4 rounded-xl border border-sky-300 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20">
                <span className="font-mono font-bold text-xs text-sky-700 dark:text-sky-300 block mb-1">
                  interface Flyable
                </span>
                <div className="font-mono text-xs text-slate-600 dark:text-slate-400 mt-2">
                  void fly();
                </div>
              </div>

              <div className="p-4 rounded-xl border border-violet-300 dark:border-violet-900/60 bg-violet-50/40 dark:bg-violet-950/20">
                <span className="font-mono font-bold text-xs text-violet-700 dark:text-violet-300 block mb-1">
                  class Duck implements Swimmable, Flyable
                </span>
                <div className="font-mono text-xs text-slate-600 dark:text-slate-400 mt-2 space-y-1">
                  <div>+ void swim() {`{ ... }`}</div>
                  <div>+ void fly() {`{ ... }`}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CLASS VS OBJECT TAB */}
        {activeTab === 'class-object' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-2">
                The Class (The Architectural Blueprint)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                A class defines the template of attributes and behaviors. It occupies only metadata memory in the Method Area until instantiated.
              </p>
              <pre className="p-3 bg-slate-950 text-amber-400 rounded-lg text-xs font-mono overflow-x-auto">
{`public class Account {
    private String owner;
    private double balance;

    public Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
}`}
              </pre>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-2">
                Objects (Heap Instances Created via new)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Each object has its own distinct copy of instance fields living on the Heap at its own memory address.
              </p>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs">
                  <span className="text-indigo-600 font-bold">@0x4A10</span> : Account owner=&quot;Alice&quot;, balance=1500.0
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs">
                  <span className="text-indigo-600 font-bold">@0x4A28</span> : Account owner=&quot;Bob&quot;, balance=3200.0
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
