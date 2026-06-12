export interface Scenario {
  title: string
  desc: string
}

export interface RuShiDao {
  confucian: string
  buddhist: string
  taoist: string
}

export interface ClassicsBridge {
  taoTeChing?: string
  heartSutra?: string
  qingJingSutra?: string
  yinFuSutra?: string
}

export interface HigherDimension {
  physics?: string
  cosmology?: string
  empirical?: string
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
  /** 外国古代名人 — 苏格拉底、柏拉图、亚里士多德、马可·奥勒留等 */
  foreignAncient: string
  /** 外国现代名人 — 荣格、马斯洛、弗兰克尔、爱因斯坦等 */
  foreignModern: string
  /** 中国古代名人 — 孔子、老子、孙子、诸葛亮、王阳明等 */
  chineseAncient: string
  /** 中国现代名人 — 鲁迅、钱钟书、南怀瑾、金庸等 */
  chineseModern: string
}

export interface FourFoldAnalysis {
  /** 易经 — 以易道阴阳变化观照现实人生与心灵问题 */
  yiJing: string
  /** 庄子 — 以逍遥齐物之智解构世间困扰与心灵束缚 */
  zhuangZi: string
  /** 毛泽东思想 — 以实践论矛盾论透析现实问题与心灵辩证法 */
  maoZeDong: string
  /** 禅宗 — 以禅门直指人心之机点化生活烦恼与心灵迷悟 */
  chanZong: string
}

export interface FiveMirrors {
  /** 静 — 内观寂静：本品所显的内在安定与心念止息之道 */
  stillness: string
  /** 净 — 心性清净：本品所显的净化烦恼、离染无著之道 */
  purity: string
  /** 敬 — 恭敬虔诚：本品所显的恭敬心、信心与法之尊贵 */
  reverence: string
  /** 镜 — 般若明镜：本品所显的如实观照、心如明镜之智 */
  mirror: string
  /** 境 — 证悟境界：本品所显的修行位次与究竟证悟之果 */
  realm: string
}

export interface Chapter {
  id: number
  /** 'diamond' = 金刚经, 'taoist' = 道德经 */
  sutraType?: 'diamond' | 'taoist'
  title: string
  subtitle: string
  original: string
  essence: string
  scenarios: Scenario[]
  ruShiDao: RuShiDao
  insights: string
  modernPractice: string
  questions: string[]
  questionAnswers?: QuestionAnswer[]
  tags: string[]
  classicsBridge?: ClassicsBridge
  higherDimension?: HigherDimension
  wangYangming?: string
  huineng?: string
  modernMasters?: string
  relationshipWisdom?: RelationshipWisdom
  meditationGuide?: string
  energyPractice?: string
  awakeningInsight?: string
  creatorNote?: string
  fiveMirrors?: FiveMirrors
  fourFoldAnalysis?: FourFoldAnalysis
  celebrityAnalysis?: CelebrityAnalysis

  // === 道德经专用字段 ===
  /** 道门五镜 — 玄/虚/柔/反/自然 */
  taoistFiveMirrors?: TaoistFiveMirrors
  /** 六维分析 */
  sixFoldAnalysis?: SixFoldAnalysis
  /** 道德经经典融通 */
  taoistClassicsBridge?: TaoistClassicsBridge
  /** 道德经高维视角 */
  taoistHigherDimension?: TaoistHigherDimension
}

// === 道德经专用类型 ===

/** 道门五镜 — 玄虚柔反自然 */
export interface TaoistFiveMirrors {
  mystery: string
  emptiness: string
  softness: string
  return: string
  spontaneity: string
}

/** 六维分析 */
export interface SixFoldAnalysis {
  yiJing: string
  zhuangZi: string
  maoZeDong: string
  confucian: string
  chanZong: string
  westernPhilosophy: string
}

/** 道德经经典融通 */
export interface TaoistClassicsBridge {
  diamondSutra?: string
  analects?: string
  artOfWar?: string
  zhuangZi?: string
}

/** 道德经高维视角 */
export interface TaoistHigherDimension {
  cosmogony?: string
  systemsView?: string
  empiricalPractice?: string
}
