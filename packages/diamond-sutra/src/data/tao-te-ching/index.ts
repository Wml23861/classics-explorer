import type { Chapter } from '../../types/chapter'
import ch01 from './01'
import ch08 from './08'
import ch25 from './25'

export const taoChapters: Chapter[] = [
  ch01,
  ch08,
  ch25,
]

export function getTaoChapterById(id: number): Chapter | undefined {
  return taoChapters.find(c => c.id === id)
}

export const daoJingChapters = () => taoChapters.filter(c => c.id <= 37)
export const deJingChapters = () => taoChapters.filter(c => c.id >= 38)
