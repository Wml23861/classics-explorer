import type { Hexagram } from '../../types/hexagram'
import h04 from './04'
import  h05 from './05'
import  h06 from './06'
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
  h04, h05, h06, h07, h08, h09, h16, h17, h18, h19,
  h20, h27, h28, h29, h30, h31, h32, h37, h38, h39,
  h40, h41, h42, h43, h44, h45, h61, h62, h64,
]

export function getHexagramById(id: number): Hexagram | undefined {
  return hexagrams.find(h => h.id === id)
}

export const upperCanonHexagrams = (): Hexagram[] => hexagrams.filter(h => h.id <= 30)
export const lowerCanonHexagrams = (): Hexagram[] => hexagrams.filter(h => h.id >= 31)
