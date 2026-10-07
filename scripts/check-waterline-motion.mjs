import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
function load(file, dependencies = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  new Function('require', 'exports', code)(name => { assert.ok(name in dependencies); return dependencies[name]; }, exports);
  return exports;
}
const { crossesDownward } = load('src/components/sections/waterlineMotion.ts');
assert.equal(crossesDownward(99, 101, 100), true, 'Downward crossing triggers the waterline');
assert.equal(crossesDownward(101, 99, 100), false, 'Approaching from the footer does not trigger');
assert.equal(crossesDownward(101, 102, 100), false, 'Moving within the footer does not trigger');
assert.equal(crossesDownward(99, 99, 100), false, 'Hovering above does not trigger');
assert.equal(crossesDownward(100, 100, 100), false, 'Resting on the line does not retrigger');
const { OPENING, easeBetween } = load('src/components/giants/openingTimeline.ts');
assert.ok(easeBetween(...OPENING.pinkIn, 1) > 0, 'Pink begins during the opening bloom');
assert.equal(easeBetween(...OPENING.pinkIn, 4), 1, 'Pink finishes before the profile appears');
console.log('Waterline direction and hero color timing checks passed.');
