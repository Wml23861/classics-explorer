import type { Hexagram } from '../../types/hexagram'
import h01 from './01'
import h02 from './02'
import h03 from './03'
import h04 from './04'
import h05 from './05'
import h06 from './06'
import h07 from './07'
// h08/h09 有转义问题待修复
import h10 from './10'
import h11 from './11'
import h12 from './12'
import h13 from './13'
// h14-h16 待修复
import h17 from './17'
import h18 from './18'
import h19 from './19'
import h20 from './20'
// h21-h28 待修复
// h29-h30 待agent补全
// 下经34卦待补全

export const hexagrams: Hexagram[] = [
  h01, h02, h03, h04, h05, h06, h07,
  h10, h11, h12, h13,
  h17, h18, h19, h20,
]

export function getHexagramById(id: number): Hexagram | undefined {
  return hexagrams.find(h => h.id === id)
}

export const upperCanonHexagrams = (): Hexagram[] => hexagrams.filter(h => h.id <= 30)
export const lowerCanonHexagrams = (): Hexagram[] => hexagrams.filter(h => h.id >= 31)
