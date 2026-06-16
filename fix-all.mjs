import fs from 'fs';
import path from 'path';

const dir = 'packages/diamond-sutra/src/data/yijing';

function isCJK(cp) { return cp >= 0x4E00 && cp <= 0x9FFF; }
function isCJKP(c) { return '，。！？；：（）【】《》—…、·'.includes(c); }

let totalFixed = 0;

for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts')) {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');
  let fixed = 0;

  // Step 1: Fix double-backslash single quotes
  content = content.replace(/\\\\'/g, "\\'");

  // Step 2: Escape CJK-adjacent single quotes
  let result = '';
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (ch === "'") {
      const prev = i > 0 ? content[i - 1] : '';
      const next = i < content.length - 1 ? content[i + 1] : '';
      const pp = prev ? prev.codePointAt(0) : 0;
      const pn = next ? next.codePointAt(0) : 0;
      if ((isCJK(pp) || isCJKP(prev)) && (isCJK(pn) || isCJKP(next))) {
        result += "\\'";
        fixed++;
      } else {
        result += ch;
      }
    } else {
      result += ch;
    }
  }

  if (result !== fs.readFileSync(fp, 'utf8')) {
    totalFixed += fixed;
    fs.writeFileSync(fp, result);
    console.log(file + ': ' + fixed + ' fixes');
  }
}
console.log('Total fixes:', totalFixed);
