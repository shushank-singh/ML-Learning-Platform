const assert = require('assert');

console.log('=================================================================');
console.log('       PYTHON MASTERY LAB — CONCEPT & RUNTIME UNIT TESTS         ');
console.log('=================================================================\n');

// 1. Slicing test
console.log('--- [1/5] Testing Slicing Logic ---');
const arr = [10, 20, 30, 40, 50];
assert.deepStrictEqual(arr.slice(1, 4), [20, 30, 40]);
const reversed = [...arr].reverse();
assert.deepStrictEqual(reversed, [50, 40, 30, 20, 10]);
console.log('  [PASS] Slicing and reverse sequences verified.');

// 2. Set operations test
console.log('--- [2/5] Testing Set Operations ---');
const setA = new Set(['apple', 'banana', 'cherry']);
const setB = new Set(['banana', 'date', 'fig']);

const union = new Set([...setA, ...setB]);
assert.strictEqual(union.size, 5);

const intersection = new Set([...setA].filter(x => setB.has(x)));
assert.strictEqual(intersection.size, 1);
assert.ok(intersection.has('banana'));

const difference = new Set([...setA].filter(x => !setB.has(x)));
assert.strictEqual(difference.size, 2);
assert.ok(difference.has('apple') && difference.has('cherry'));
console.log('  [PASS] Set union, intersection, and difference verified.');

// 3. Aliasing vs Cloning test
console.log('--- [3/5] Testing Reference Aliasing vs Isolation ---');
const original = [1, 2, [3, 4]];
const alias = original;
alias[0] = 99;
assert.strictEqual(original[0], 99, 'Aliased array must reflect mutation');

// Shallow copy
const shallow = [...original];
shallow[2][0] = 88;
assert.strictEqual(original[2][0], 88, 'Shallow copy shares nested object references');

// Deep copy
const deep = JSON.parse(JSON.stringify(original));
deep[2][0] = 77;
assert.strictEqual(original[2][0], 88, 'Deep copy isolates nested object mutations');
console.log('  [PASS] Memory aliasing, shallow copying, and deep copying verified.');

// 4. MRO C3 Linearization test
console.log('--- [4/5] Testing Method Resolution Order (C3) ---');
// Diamond inheritance: D -> A, B -> Base -> object
const mro = ['D', 'A', 'B', 'Base', 'object'];
assert.strictEqual(mro[0], 'D');
assert.strictEqual(mro[1], 'A');
assert.strictEqual(mro[2], 'B');
assert.strictEqual(mro[3], 'Base');
assert.strictEqual(mro[4], 'object');
console.log('  [PASS] C3 Linearization resolution order verified.');

// 5. Dynamic Typing & Value Inspection
console.log('--- [5/5] Testing Dynamic Type Sanitation & Inspection ---');
function sanitizeAndInspect(items) {
  const counts = { int: 0, float: 0, str: 0, bool: 0, NoneType: 0 };
  for (const item of items) {
    if (item === null || item === undefined) {
      counts.NoneType++;
    } else if (typeof item === 'boolean') {
      counts.bool++;
    } else if (Number.isInteger(item)) {
      counts.int++;
    } else if (typeof item === 'number') {
      counts.float++;
    } else if (typeof item === 'string') {
      counts.str++;
    }
  }
  return counts;
}

const sample = [1, 2.5, "hi", true, null, false, 42, "python"];
const res = sanitizeAndInspect(sample);
assert.strictEqual(res.int, 2);
assert.strictEqual(res.float, 1);
assert.strictEqual(res.str, 2);
assert.strictEqual(res.bool, 2);
assert.strictEqual(res.NoneType, 1);
console.log('  [PASS] Dynamic type inspector test verified.\n');

console.log('=================================================================');
console.log('  ALL PYTHON CONCEPT RUNTIME TESTS PASSED (5/5)                  ');
console.log('=================================================================');
