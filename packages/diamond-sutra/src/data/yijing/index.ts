import type { Hexagram } from '../../types/hexagram'
import h01 from './01'
import h02 from './02'
import h03 from './03'
import h04 from './04'
import h10 from './10'; import h11 from './11'; import h12 from './12'; import h13 from './13'
import h14 from './14'; import h15 from './15'
import h21 from './21'; import h22 from './22'; import h23 from './23'
import h24 from './24'; import h25 from './25'; import h26 from './26'
import h33 from './33'
import h34 from './34'
import h35 from './35'
import h36 from './36'
import h46 from './46'
import h47 from './47'
import h48 from './48'
import h49 from './49'
import h50 from './50'
import h52 from './52'
import h53 from './53'
import h54 from './54'
import h56 from './56'
import h55 from './55'
import h59 from './59'; import h57 from './57'; import h58 from './58'
import h05 from './05'
import h06 from './06'
import  h07 from './07'
import  h08 from './08'
import  h09 from './09'
import  h16 from './16'
import  h17 from './17'
import  h18 from './18'
import  h19 from './19'
import  h20 from './20'
import  h27 from './27'
import  h28 from './28'
import  h29 from './29'
import  h30 from './30'
import  h31 from './31'
import  h32 from './32'
import  h37 from './37'
import  h38 from './38'
import  h39 from './39'
import  h40 from './40'
import  h41 from './41'
import  h42 from './42'
import  h43 from './43'
import  h44 from './44'
import  h45 from './45'
import  h61 from './61'
import  h62 from './62'
import  h64 from './64';

export const hexagrams: Hexagram[] = [
  h01, h02, h03, h04, h05, h06, h07, h08, h09, h10,
  h11, h12, h13, h14, h15, h16, h17, h18, h19,
  h20, h21, h22, h23, h24, h25, h26, h27, h28, h29,
  h30, h31, h32, h33, h34, h35, h36, h37, h38, h39,
  h40, h41, h42, h43, h44, h45, h46, h47, h48, h49, h50, h51, h52, h53, h54, h55, h56, h57, h58, h59,
  h61, h62, h64,
]

export function getHexagramById(id: number): Hexagram | undefined {
  return hexagrams.find(h => h.id === id)
}

export const upperCanonHexagrams = (): Hexagram[] => hexagrams.filter(h => h.id <= 30)
export const lowerCanonHexagrams = (): Hexagram[] => hexagrams.filter(h => h.id >= 31)
