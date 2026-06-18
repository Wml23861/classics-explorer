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

  // === 情关参究（金刚经专用） ===
  heartBarrier?: HeartBarrierPractice
  /** 她心即佛心 — 以本品般若智慧帮她找回安全感、觉察自己、做自己 */
  herHeart?: HerHeartPractice

  // === 道德经专用字段 ===
  /** 情关参究（道家版） — 以本章道门智慧参究亲密关系中的情执与觉醒 */
  taoHeartBarrier?: TaoHeartBarrierPractice
  /** 她心即道心 — 帮她找回安全感、觉察自己、做自己，以道养心 */
  taoHerHeart?: TaoHerHeartPractice
  /** 道门五镜 — 玄/虚/柔/反/自然 */
  taoistFiveMirrors?: TaoistFiveMirrors
  /** 六维分析 */
  sixFoldAnalysis?: SixFoldAnalysis
  /** 道德经经典融通 */
  taoistClassicsBridge?: TaoistClassicsBridge
  /** 道德经高维视角 */
  taoistHigherDimension?: TaoistHigherDimension
}

// === 情关参究（金刚经专用） ===

/** 情关参究 — 以本品般若智慧参究亲密关系中的情执与觉醒 */
export interface HeartBarrierPractice {
  /** 叩关 — 1-2句真实情境切入 */
  trigger: string
  /** 参究 — 深度散文，以本品般若智慧参究情关 */
  analysis: string
  /** 观她 — 理解她的回避型内心世界 */
  understandHer: string
  /** 观己 — 觉察自己的焦虑与执取 */
  observeSelf: string
  /** 中道 — 在执与舍之间的平衡智慧 */
  middleWay: string
  /** 觉察练习 — 带身体引导的step-by-step练习 */
  practice: string
  /** 一句心法 — 在焦虑涌上来的瞬间能用上的短句 */
  heartMantra: string
  /** 行动指令 — 今天具体做什么 */
  dailyAction: string
  /** 禁行 — 此刻绝不做的事（戒律式棒喝） */
  forbidden: string
  /** 待她之道 — 当她回来时，如何以本品智慧待她 */
  treatHer: string
}

/** 她心即佛心 — 帮她找回安全感、觉察自己、做自己 */
export interface HerHeartPractice {
  /** 安处 — 她想回去却不确定能不能回去的安静角落 */
  safeCorner: string
  /** 水镜 — 以本品智慧为镜，照见她的内心波纹，不强迫 */
  waterMirror: string
  /** 他眼 — 你在她眼中是什么样子 */
  hisEyes: string
  /** 自湖 — 她独处时的内心在经历什么 */
  herLake: string
  /** 双岸 — 她的中道：不因亲密失去自己，不因恐惧永远逃离 */
  twoShores: string
  /** 一息 — 极简身体锚定，窒息感涌上时可以悄悄做 */
  oneBreath: string
  /** 微风 — 一句不要求回复的温柔话 */
  breeze: string
  /** 微风默念 — 你自己心里为她默念的祝福 */
  breezeSilent: string
  /** 你手 — 你今天具体做什么，成为她的安全地基 */
  yourHands: string
  /** 雷池 — 你绝对不能越过的边界 */
  thunderPool: string
  /** 归灯 — 她回来了，你如何亮着一盏不追问不审判的灯 */
  returnLight: string
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

// === 情关参究（道家版）类型 ===

/** 情关参究（道家版） — 以本章道门智慧参究情关 */
export interface TaoHeartBarrierPractice {
  /** 守中 — 1-2句真实情境切入 */
  trigger: string
  /** 观复 — 以本章道门智慧观照情之循环往复 */
  analysis: string
  /** 鉴水 — 以上善若水为镜，映照她的内心 */
  understandHer: string
  /** 自知 — 觉察自己的执着与恐惧 */
  observeSelf: string
  /** 玄同 — 在执与舍之间，找到玄同之径 */
  middleWay: string
  /** 致虚 — 身体锚定，虚极生静的练习 */
  practice: string
  /** 得一 — 一句不散的道枢之言 */
  heartMantra: string
  /** 执古 — 今日以道御事的具体行动 */
  dailyAction: string
  /** 守柔 — 此刻绝不可做之事 */
  forbidden: string
  /** 若水 — 以水之姿，待她归来 */
  treatHer: string
}

/** 她心即道心 — 帮她找回安全感、觉察自己、做自己 */
export interface TaoHerHeartPractice {
  /** 谷神 — 她内心幽深的安静角落 */
  safeCorner: string
  /** 澄明 — 以本章道门智慧帮她慢慢澄清 */
  waterMirror: string
  /** 袭明 — 你在她眼中是什么模样 */
  hisEyes: string
  /** 渊兮 — 她独处时的内心深渊 */
  herLake: string
  /** 玄牝 — 绵延不绝的中道 */
  twoShores: string
  /** 绵绵 — 极简身体锚定，如丝如缕不绝 */
  oneBreath: string
  /** 希言 — 少说、不说，说了就飘走的温柔话（可发） */
  breeze: string
  /** 守静 — 默念的祝福 */
  breezeSilent: string
  /** 执左 — 你做了好事不留债的具体行动 */
  yourHands: string
  /** 不割 — 你绝不可越过的边界 */
  thunderPool: string
  /** 复归 — 她回来了，归于朴素的迎接 */
  returnLight: string
}
