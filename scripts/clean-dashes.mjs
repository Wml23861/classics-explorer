import fs from 'fs';

const dir = 'packages/diamond-sutra/src/data/yijing';
const files = fs.readdirSync(dir).filter(f => /^\d+\.ts$/.test(f));

for (const f of files) {
  const fp = dir + '/' + f;
  let c = fs.readFileSync(fp, 'utf8');
  const before = (c.match(/——/g) || []).length;
  if (before === 0) continue;

  // Only one rule: merge CJK——CJK into CJK+CJK
  // "以——不——被" → "以不被"
  // Repeat until no more matches (handles chains of dashes)
  let prev = '';
  while (prev !== c) {
    prev = c;
    c = c.replace(/([\u4e00-\u9fff])——([\u4e00-\u9fff])/g, '$1$2');
  }

  const after = (c.match(/——/g) || []).length;
  if (before !== after) {
    fs.writeFileSync(fp, c);
    console.log(f + ': ' + before + ' → ' + after + ' dashes');
  }
}
console.log('Done');
