import fs from 'fs';
import path from 'path';

const dirs = [
  'packages/diamond-sutra/src/data/chapters',
  'packages/diamond-sutra/src/data/tao-te-ching',
  'packages/diamond-sutra/src/data/yijing',
];

function isCJK(cp) { return cp >= 0x4E00 && cp <= 0x9FFF; }
function isCJKP(c) { return '，。！？；：（）【】《》—…、·'.includes(c); }

let totalFixed = 0;

for (const dir of dirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');
    let fixed = 0;
    let result = '';

    for (let i = 0; i < content.length; i++) {
      const ch = content[i];
      const prev = i > 0 ? content[i - 1] : '';
      const next = i < content.length - 1 ? content[i + 1] : '';

      // Fix single quotes between CJK/CJKP chars
      if (ch === "'" && (isCJK(prev.codePointAt(0)) || isCJKP(prev)) && (isCJK(next.codePointAt(0)) || isCJKP(next))) {
        result += "\\'";
        fixed++;
      } else {
        result += ch;
      }
    }

    if (fixed > 0) {
      totalFixed += fixed;
      fs.writeFileSync(fp, result, 'utf8');
      console.log(`${file}: ${fixed} fixes`);
    }
  }
}

console.log(`\nTotal fixes: ${totalFixed}`);
