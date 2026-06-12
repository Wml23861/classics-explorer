export interface Scenario {
  title: string
  desc: string
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

export interface BaseChapter {
  id: number
  title: string
  subtitle: string
  original: string
  essence: string
  scenarios: Scenario[]
  insights: string
  modernPractice: string
  questions: string[]
  questionAnswers?: QuestionAnswer[]
  tags: string[]
  meditationGuide?: string
  energyPractice?: string
  awakeningInsight?: string
  creatorNote?: string
}
