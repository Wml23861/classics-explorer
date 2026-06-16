import type { Hexagram } from '../../types/hexagram'
import h01 from './01'; import h02 from './02'; import h03 from './03'; import h04 from './04'
import h05 from './05'; import h06 from './06'; import h07 from './07'; import h08 from './08'
import h09 from './09'; import h10 from './10'; import h11 from './11'; import h12 from './12'
import h13 from './13'; import h14 from './14'; import h15 from './15'; import h16 from './16'
import h17 from './17'; import h18 from './18'; import h19 from './19'; import h20 from './20'
import h21 from './21'; import h22 from './22'; import h23 from './23'; import h24 from './24'
import h26 from './26'; import h27 from './27'; import h28 from './28'

export const hexagrams: Hexagram[] = [
  h01, h02, h03, h04, h05, h06, h07, h08, h09, h10,
  h11, h12, h13, h14, h15, h16, h17, h18, h19, h20,
  h21, h22, h23, h24, h26, h27, h28,
]

export function getHexagramById(id: number): Hexagram | undefined {
  return hexagrams.find(h => h.id === id)
}

export const upperCanonHexagrams = (): Hexagram[] => hexagrams.filter(h => h.id <= 30)
export const lowerCanonHexagrams = (): Hexagram[] => hexagrams.filter(h => h.id >= 31)
