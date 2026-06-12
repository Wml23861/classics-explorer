import type { BaseChapter, Scenario, QuestionAnswer, RelationshipWisdom, CelebrityAnalysis } from './base-chapter'

export interface RuShiDao {
  confucian: string
  buddhist: string
  taoist: string
}

export interface DiamondClassicsBridge {
  taoTeChing?: string
  heartSutra?: string
  qingJingSutra?: string
  yinFuSutra?: string
}

export interface DiamondHigherDimension {
  physics?: string
  cosmology?: string
  empirical?: string
}

/** 五镜 — 静净敬镜境 */
export interface DiamondFiveMirrors {
  stillness: string
  purity: string
  reverence: string
  mirror: string
  realm: string
}

/** 四维分析 */
export interface DiamondFourFoldAnalysis {
  yiJing: string
  zhuangZi: string
  maoZeDong: string
  chanZong: string
}

export interface DiamondChapter extends BaseChapter {
  sutraType: 'diamond'
  ruShiDao: RuShiDao
  fiveMirrors?: DiamondFiveMirrors
  fourFoldAnalysis?: DiamondFourFoldAnalysis
  classicsBridge?: DiamondClassicsBridge
  higherDimension?: DiamondHigherDimension
  wangYangming?: string
  huineng?: string
  modernMasters?: string
  relationshipWisdom?: RelationshipWisdom
  celebrityAnalysis?: CelebrityAnalysis
}
