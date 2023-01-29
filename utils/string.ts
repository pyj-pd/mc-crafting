import { hangulToEnglish } from './hangul'
import hangul from 'hangul-js'

/**
 * Disassemble Korean characters and make it one string
 * @param text Text to disassemble
 * @returns Disassembled text in string
 */
export const disassembleHangul = (text: string): string =>
  hangul.d(text).join('')

/**
 * Convert Korean characters into English
 * @param text Text to convert
 * @returns Converted text
 */
export const koreanToEnglish = (text: string): string => hangulToEnglish(text)

/**
 * Convert text to work well with searching
 * @param text Text to convert
 * @returns Converted text
 */
export const textToSearch = (text: string): string =>
  koreanToEnglish(disassembleHangul(text))

/** Convert array of item ID to readable string
 * @param ids Arrays that contain item IDs
 * @returns ID text in string
 */
export const getItemIdString = (ids: string[]): string => {
  const result =
    ids.length > 2 ? `${ids[0]} and other ${ids.length - 1}` : ids.join(', ')

  return result
}
