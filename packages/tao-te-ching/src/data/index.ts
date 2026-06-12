import type { TaoTeChingChapter } from '@shared/types'
import ch01 from './chapters/01'
import ch08 from './chapters/08'
import ch25 from './chapters/25'

export const chapters: TaoTeChingChapter[] = [
  ch01,
  ch08,
  ch25,
]

export function getChapterById(id: number): TaoTeChingChapter | undefined {
  return chapters.find(c => c.id === id)
}

export const daoJing = () => chapters.filter(c => c.id <= 37)
export const deJing = () => chapters.filter(c => c.id >= 38)
