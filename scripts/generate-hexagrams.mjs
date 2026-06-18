import fs from 'fs';

const dir = 'packages/diamond-sutra/public/hexagrams';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// All 64 hexagrams: [id, name, lines (bottom to top: 1=yang, 0=yin)]
const hexagrams = [
  [1,'乾为天',[1,1,1,1,1,1]],[2,'坤为地',[0,0,0,0,0,0]],[3,'水雷屯',[1,0,0,0,1,0]],[4,'山水蒙',[0,1,0,0,0,1]],
  [5,'水天需',[1,1,1,0,1,0]],[6,'天水讼',[0,1,0,1,1,1]],[7,'地水师',[0,1,0,0,0,0]],[8,'水地比',[0,0,0,0,1,0]],
  [9,'风天小畜',[1,1,1,0,1,1]],[10,'天泽履',[1,1,0,1,1,1]],[11,'地天泰',[1,1,1,0,0,0]],[12,'天地否',[0,0,0,1,1,1]],
  [13,'天火同人',[1,0,1,1,1,1]],[14,'火天大有',[1,1,1,1,0,1]],[15,'地山谦',[0,0,0,1,0,0]],[16,'雷地豫',[0,0,0,1,0,0]],
  [17,'泽雷随',[1,0,0,1,1,0]],[18,'山风蛊',[0,1,1,0,0,1]],[19,'地泽临',[1,1,0,0,0,0]],[20,'风地观',[0,0,0,0,1,1]],
  [21,'火雷噬嗑',[1,0,0,1,0,1]],[22,'山火贲',[1,0,1,0,0,1]],[23,'山地剥',[1,0,0,0,0,0]],[24,'地雷复',[1,0,0,0,0,0]],
  [25,'天雷无妄',[1,0,0,1,1,1]],[26,'山天大畜',[1,1,1,0,0,1]],[27,'山雷颐',[1,0,0,0,0,1]],[28,'泽风大过',[0,1,1,1,1,0]],
  [29,'坎为水',[0,1,0,0,1,0]],[30,'离为火',[1,0,1,1,0,1]],[31,'泽山咸',[0,0,1,1,1,0]],[32,'雷风恒',[0,1,1,1,0,0]],
  [33,'天山遯',[1,1,1,1,0,0]],[34,'雷天大壮',[1,1,1,1,0,0]],[35,'火地晋',[0,0,0,1,0,1]],[36,'地火明夷',[1,0,1,0,0,0]],
  [37,'风火家人',[1,0,1,0,1,1]],[38,'火泽睽',[1,1,0,1,0,1]],[39,'水山蹇',[0,0,1,0,1,0]],[40,'雷水解',[0,1,0,1,0,0]],
  [41,'山泽损',[1,1,0,0,0,1]],[42,'风雷益',[1,0,0,0,1,1]],[43,'泽天夬',[1,1,1,1,1,0]],[44,'天风姤',[0,1,1,1,1,1]],
  [45,'泽地萃',[0,0,0,1,1,0]],[46,'地风升',[0,1,1,0,0,0]],[47,'泽水困',[0,1,0,1,1,0]],[48,'水风井',[0,1,1,0,1,0]],
  [49,'泽火革',[1,0,1,1,1,0]],[50,'火风鼎',[0,1,1,1,0,1]],[51,'震为雷',[1,0,0,1,0,0]],[52,'艮为山',[0,0,1,0,0,1]],
  [53,'风山渐',[0,0,1,0,1,1]],[54,'雷泽归妹',[1,1,0,1,0,0]],[55,'雷火丰',[1,0,1,1,0,0]],[56,'火山旅',[0,0,1,1,0,1]],
  [57,'巽为风',[0,1,1,0,1,1]],[58,'兑为泽',[1,1,0,1,1,0]],[59,'风水涣',[0,1,0,0,1,1]],[60,'水泽节',[1,1,0,0,1,0]],
  [61,'风泽中孚',[1,1,0,0,1,1]],[62,'雷山小过',[0,0,1,1,0,0]],[63,'水火既济',[1,0,1,0,1,0]],[64,'火水未济',[0,1,0,1,0,1]],
];

function makeSvg(id, name, lines) {
  const w = 260, h = 300;
  const top = 45, gap = 36;
  const lineW = 160, lineH = 8, x = (w - lineW) / 2;
  const breakGap = 34; // gap for broken (yin) lines
  const yangColor = '#c0392b'; // red
  const yinColor = '#2c3e50';  // dark

  let linesSvg = '';
  // Draw from top (line 6) to bottom (line 1)
  for (let i = 5; i >= 0; i--) {
    const y = top + (5 - i) * gap;
    const isYang = lines[i] === 1;
    if (isYang) {
      linesSvg += `  <rect x="${x}" y="${y}" width="${lineW}" height="${lineH}" rx="3" fill="${yangColor}"/>\n`;
    } else {
      // Broken line: two segments
      const halfW = (lineW - breakGap) / 2;
      linesSvg += `  <rect x="${x}" y="${y}" width="${halfW}" height="${lineH}" rx="3" fill="${yinColor}"/>\n`;
      linesSvg += `  <rect x="${x + halfW + breakGap}" y="${y}" width="${halfW}" height="${lineH}" rx="3" fill="${yinColor}"/>\n`;
    }
    // Yao label on the right
    const yaoNames = ['初', '二', '三', '四', '五', '上'];
    const yinYangLabel = isYang ? '九' : '六';
    // 初/上: label is position-first (初九, 上六)
    // 二/三/四/五: label is yin-yang first (九二, 六三)
    const label = (i === 0 || i === 5) ? `${yaoNames[i]}${yinYangLabel}` : `${yinYangLabel}${yaoNames[i]}`;
    const labelY = y + lineH / 2 + 5;
    linesSvg += `  <text x="${x + lineW + 14}" y="${labelY}" font-size="13" fill="#666" font-family="sans-serif">${label}</text>\n`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="#fefcf7" rx="8"/>
  <!-- Hexagram name -->
  <text x="${w/2}" y="28" text-anchor="middle" font-size="18" font-weight="bold" fill="#5a4020" font-family="serif">${name}</text>
  <!-- Yao lines -->
${linesSvg}
  <!-- Hexagram number -->
  <text x="${w/2}" y="${h - 8}" text-anchor="middle" font-size="14" fill="#8b6914" font-family="serif">第${id}卦</text>
</svg>`;
}

for (const [id, name, lines] of hexagrams) {
  const svg = makeSvg(id, name, lines);
  const paddedId = String(id).padStart(2, '0');
  fs.writeFileSync(`${dir}/${paddedId}.svg`, svg, 'utf8');
  console.log(`${paddedId}.svg: ${name}`);
}
console.log(`\nDone! ${hexagrams.length} SVGs generated`);
