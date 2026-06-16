export interface LineAnalysis {
  /** 爻位 — 初/二/三/四/五/上 */
  position: string
  /** 阴阳 — 阳(1)或阴(0) */
  yinYang: 0 | 1
  /** 爻辞原文 */
  original: string
  /** 爻辞白话翻译 */
  translation: string
  /** 爻位分析 */
  analysis: string
}

export interface HexagramOverview {
  /** 卦序（通行本） */
  order: number
  /** 六位数组 — 1=阳 0=阴，从下往上 */
  lines: [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1]
  /** 上卦（外卦） */
  upperTrigram: string
  /** 下卦（内卦） */
  lowerTrigram: string
  /** 卦德 — 如乾健、坤顺 */
  hexagramVirtue: string
  /** 五行属性 */
  fiveElement: '金' | '木' | '水' | '火' | '土'
  /** 天干 */
  tianGan: string
  /** 地支 */
  diZhi: string
  /** 十二消息卦标注 */
  messageHexagram?: string
  /** 京房八宫 — 乾宫/震宫/坎宫/艮宫/坤宫/巽宫/离宫/兑宫 */
  palace: string
  /** 世爻位置 (1-6) */
  generationLayer: number
  /** 应爻位置 (1-6) */
  responseLayer: number
}

export interface HexagramRelations {
  /** 综卦（颠倒卦） */
  inverseHexagram?: { id: number; name: string }
  /** 错卦（旁通卦） */
  reverseHexagram?: { id: number; name: string }
  /** 互卦 */
  mutualHexagram?: { id: number; name: string }
}

/** 易门五观 */
export interface YijingFiveViews {
  /** 变 — 阴阳爻变、刚柔相推 */
  change: string
  /** 时 — 卦时消息、当行则行 */
  timing: string
  /** 位 — 六位中正、得位失位 */
  position: string
  /** 中 — 守中用中、亢龙有悔 */
  centrality: string
  /** 通 — 旁通感应、天人合一 */
  connectivity: string
}

/** 六维通贯 */
export interface YijingSixFold {
  /** 儒家十翼 */
  confucianWings: string
  /** 道家老庄 */
  taoistLaozhuang: string
  /** 佛家般若 */
  buddhistPrajna: string
  /** 中医藏象 */
  medicineViscera: string
  /** 系统科学 */
  systemsScience: string
  /** 西方哲学 */
  westernPhilosophy: string
}

/** 易经多经融通 */
export interface YijingClassicsBridge {
  diamondSutra?: string
  taoTeChing?: string
  analects?: string
  artOfWar?: string
}

/** 易经高维视角 */
export interface YijingHigherDimension {
  cosmology?: string
  mathematics?: string
  synchronicity?: string
}

export interface Scenario {
  title: string
  desc: string
}

export interface RuShiDao {
  confucian: string
  buddhist: string
  taoist: string
}

export interface QuestionAnswer {
  question: string
  answer: string
}

export interface RelationshipWisdom {
  romantic: string
  family: string
  friendship: string
  strangers: string
}

export interface CelebrityAnalysis {
  foreignAncient: string
  foreignModern: string
  chineseAncient: string
  chineseModern: string
}

export interface Hexagram {
  id: number
  sutraType: 'yijing'
  title: string
  subtitle: string
  /** 卦形SVG文件路径 */
  symbol: string
  /** 卦辞原文 */
  hexagramOriginal: string
  /** 六爻分析 */
  lineAnalysis: LineAnalysis[]
  /** 彖传原文 */
  tuanZhuan: string
  /** 大象传原文 */
  daXiangZhuan: string
  /** 小象传原文 */
  xiaoXiangZhuan: string
  /** 文言传（仅乾坤二卦） */
  wenYanZhuan?: string
  /** 系辞/说卦/序卦/杂卦相关 */
  otherWings?: string
  /** 卦象总览 */
  overview: HexagramOverview
  /** 综卦/错卦/互卦 */
  relations: HexagramRelations
  /** 核心要义 */
  essence: string
  /** 现实场景 */
  scenarios: Scenario[]
  /** 儒释道汇通 */
  ruShiDao: RuShiDao
  /** 历代注家感悟 */
  insights: string
  /** 现代实践 */
  modernPractice: string
  /** 十问 */
  questions: string[]
  /** 十问答 */
  questionAnswers?: QuestionAnswer[]
  /** 标签 */
  tags: string[]
  /** 易门五观 */
  fiveViews: YijingFiveViews
  /** 六维通贯 */
  sixFold: YijingSixFold
  /** 多经融通 */
  classicsBridge?: YijingClassicsBridge
  /** 高维视角 */
  higherDimension?: YijingHigherDimension
  /** 名人分析 */
  celebrityAnalysis?: CelebrityAnalysis
  /** 人伦修行 */
  relationshipWisdom?: RelationshipWisdom
  /** 冥想引导 */
  meditationGuide?: string
  /** 能量实修 */
  energyPractice?: string
  /** 明心见性 */
  awakeningInsight?: string
  /** 王阳明心学 */
  wangYangming?: string
  /** 六祖慧能 */
  huineng?: string
  /** 现代学者 */
  modernMasters?: string
  /** 创作者说 */
  creatorNote?: string
}
