# classics-explorer — Monorepo 经典参究系统

## 项目概述

金刚经 + 道德经的深度多维度分析系统。单服务 Vue 3 应用，可在同一个界面中切换阅读两部经典。

## 技术栈

- Vue 3 + TypeScript + Vite
- Vue Router 4 (hash 模式)
- Tailwind CSS v4
- pnpm workspaces (monorepo)

## 目录结构

```
e:\classics-explorer\
├── packages/
│   ├── shared/          — 共享类型、组件、composables (目前未被钻石项目直接引用)
│   ├── diamond-sutra/   — **主项目**，包含两部经典的全部代码
│   │   └── src/
│   │       ├── types/chapter.ts     — 统一类型定义 (Chapter 接口同时支持 Diamond/Taoist 字段)
│   │       ├── data/
│   │       │   ├── index.ts         — 金刚经 32 章
│   │       │   ├── chapters/01-32.ts
│   │       │   └── tao-te-ching/    — 道德经 81 章
│   │       │       ├── index.ts
│   │       │       └── 01.ts, 08.ts, 25.ts (目前仅 3 章样板)
│   │       ├── components/          — AppHeader, AppFooter, ChapterCard
│   │       ├── views/               — Home, Chapters, ChapterDetail
│   │       └── router/index.ts
│   └── tao-te-ching/   — **已废弃**，代码已合并到 diamond-sutra
```

## 路由结构

| 路径 | 说明 |
|------|------|
| `/` | 首页，两部经典的入口 |
| `/diamond` | 金刚经 32 品目录 |
| `/diamond/:id` | 金刚经单品详情 |
| `/tao` | 道德经 81 章目录 |
| `/tao/:id` | 道德经单章详情 |

## 启动方式

```bash
cd e:\classics-explorer
pnpm install
pnpm -F @classics/diamond-sutra dev   # 端口 5173
```

只起一个服务即可，两部经典都在里面。

## Chapter 类型系统

统一类型定义在 `src/types/chapter.ts`。Chapter 接口通过 `sutraType?: 'diamond' | 'taoist'` 区分经典类型。

### 金刚经 (diamond) 专用字段
- `fiveMirrors`: 静(stillness) / 净(purity) / 敬(reverence) / 镜(mirror) / 境(realm)
- `fourFoldAnalysis`: 易经 / 庄子 / 毛泽东思想 / 禅宗
- `classicsBridge`: 道德经 / 心经 / 清静经 / 阴符经
- `higherDimension`: physics / cosmology / empirical

### 道德经 (taoist) 专用字段
- `taoistFiveMirrors`: mystery(玄) / emptiness(虚) / softness(柔) / return(反) / spontaneity(自然)
- `sixFoldAnalysis`: 易经 / 庄子 / 毛泽东思想 / 儒家 / 禅宗 / 西方哲学
- `taoistClassicsBridge`: diamondSutra / analects / artOfWar / zhuangZi
- `taoistHigherDimension`: cosmogony / systemsView / empiricalPractice

### 两经典共用字段
id, title, subtitle, original, essence, scenarios, ruShiDao (儒释道), insights, modernPractice, questions, questionAnswers, tags, meditationGuide, energyPractice, awakeningInsight, creatorNote, wangYangming, huineng, modernMasters, relationshipWisdom, celebrityAnalysis

## 视觉风格

统一使用金刚经的暖金色/纸质感配色（CSS 变量定义在 `main.css` 和 themes 中）。

## 数据文件格式

每个章节一个 `.ts` 文件，export default 一个对象，以 `satisfies Chapter` 结尾。每个文件约 800-1500 行。

## 当前进度

- 金刚经：32 品全部完成
- 道德经：81 章全部完成（2026-06-12）
- 易经(yijing)：64 卦数据已添加

## 情关参究模块

新增独立维度 `heartBarrier`（情关参究），每品以该品般若智慧参究亲密关系中的情执与觉醒。

### 类型结构 (`HeartBarrierPractice`)
| 字段 | 说明 |
|------|------|
| trigger | 叩关 - 1-2句真实情境切入 |
| analysis | 参究 - 深度散文，以本品般若智慧参究情关 |
| understandHer | 观她 - 理解回避型内心世界 |
| observeSelf | 观己 - 觉察自己的焦虑与执取 |
| middleWay | 中道 - 在执与舍之间的平衡智慧 |
| practice | 觉察练习 - 带身体引导的step-by-step练习 |
| heartMantra | 一句心法 - 焦虑涌上来时能用的短句 |
| dailyAction | 行动指令 - 今天具体做什么 |
| forbidden | 禁行 - 此刻绝不做的事（戒律式棒喝） |
| treatHer | 待她之道 - 她回来时如何以本品智慧待她 |

### 写作风格
- 禅宗棒喝型，以痛治痛，直指本质
- 保持金刚经现有古典沉稳风格
- 每品入口用用户真实情境（端午节见家长导致断联）
- 侧重理解她 > 修自己
- 每个练习必含身体层面觉察引导

### 当前进度
- 第1品（法会因由分）✓
- 第2品（善现启请分）✓
- 第3品（大乘正宗分）✓
- 第4-32品：待推进
