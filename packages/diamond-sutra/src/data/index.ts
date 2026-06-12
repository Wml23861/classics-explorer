import type { Chapter } from '../types/chapter'
import ch01 from './chapters/01'
import ch02 from './chapters/02'
import ch03 from './chapters/03'
import ch04 from './chapters/04'
import ch05 from './chapters/05'
import ch06 from './chapters/06'
import ch07 from './chapters/07'
import ch08 from './chapters/08'
import ch09 from './chapters/09'
import ch10 from './chapters/10'
import ch11 from './chapters/11'
import ch12 from './chapters/12'
import ch13 from './chapters/13'
import ch14 from './chapters/14'
import ch15 from './chapters/15'
import ch16 from './chapters/16'
import ch17 from './chapters/17'
import ch18 from './chapters/18'
import ch19 from './chapters/19'
import ch20 from './chapters/20'
import ch21 from './chapters/21'
import ch22 from './chapters/22'
import ch23 from './chapters/23'
import ch24 from './chapters/24'
import ch25 from './chapters/25'
import ch26 from './chapters/26'
import ch27 from './chapters/27'
import ch28 from './chapters/28'
import ch29 from './chapters/29'
import ch30 from './chapters/30'
import ch31 from './chapters/31'
import ch32 from './chapters/32'

export const chapters: Chapter[] = [
  ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08,
  ch09, ch10, ch11, ch12, ch13, ch14, ch15, ch16,
  ch17, ch18, ch19, ch20, ch21, ch22, ch23, ch24,
  ch25, ch26, ch27, ch28, ch29, ch30, ch31, ch32,
]

export function getChapterById(id: number): Chapter | undefined {
  return chapters.find(c => c.id === id)
}
