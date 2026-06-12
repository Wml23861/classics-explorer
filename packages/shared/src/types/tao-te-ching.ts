import type { BaseChapter, Scenario, QuestionAnswer, RelationshipWisdom, CelebrityAnalysis } from './base-chapter'
import type { RuShiDao } from './diamond-sutra'

/**
 * 道门五镜 — 玄虚柔反自然
 *
 * 玄：道的深不可测，认知的极限与敞开
 * 虚：心性的空灵，最大的容受力
 * 柔：柔弱胜刚强，水的智慧
 * 反：道的循环运动——物极必反、归根复命
 * 自然：万物自化的本然境界
 */
export interface TaoistFiveMirrors {
  mystery: string
  emptiness: string
  softness: string
  return: string
  spontaneity: string
}

/** 六维分析 */
export interface TaoistSixFoldAnalysis {
  yiJing: string
  zhuangZi: string
  maoZeDong: string
  confucian: string
  chanZong: string
  westernPhilosophy: string
}

/** 经典融通 */
export interface TaoistClassicsBridge {
  diamondSutra?: string
  analects?: string
  artOfWar?: string
  zhuangZi?: string
}

/** 高维视角 */
export interface TaoistHigherDimension {
  cosmogony?: string
  systemsView?: string
  empiricalPractice?: string
}

export interface TaoTeChingChapter extends BaseChapter {
  sutraType: 'taoist'
  ruShiDao: RuShiDao
  fiveMirrors?: TaoistFiveMirrors
  sixFoldAnalysis?: TaoistSixFoldAnalysis
  classicsBridge?: TaoistClassicsBridge
  higherDimension?: TaoistHigherDimension
  celebrityAnalysis?: CelebrityAnalysis
  relationshipWisdom?: RelationshipWisdom
  wangYangming?: string
  huineng?: string
  modernMasters?: string
}
