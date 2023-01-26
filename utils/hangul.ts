import hangul from 'hangul-js'

interface KeyType {
  [key: string]: string
}

const JAUM: KeyType = {
  ㄱ: 'r',
  ㄴ: 's',
  ㄷ: 'e',
  ㄹ: 'f',
  ㅁ: 'a',
  ㅂ: 'q',
  ㅅ: 't',
  ㅇ: 'd',
  ㅈ: 'w',
  ㅊ: 'c',
  ㅋ: 'z',
  ㅌ: 'x',
  ㅍ: 'v',
  ㅎ: 'g',

  ㄲ: 'R',
  ㄸ: 'E',
  ㅃ: 'Q',
  ㅆ: 'T',
  ㅉ: 'W',

  ㄳ: 'rt',
  ㄵ: 'sw',
  ㄶ: 'sg',
  ㄺ: 'fr',
  ㄻ: 'fa',
  ㄼ: 'fq',
  ㄽ: 'ft',
  ㄾ: 'fx',
  ㄿ: 'fv',
  ㅀ: 'fg',
  ㅄ: 'qt',
}

const MOEUM: KeyType = {
  ㅏ: 'k',
  ㅑ: 'i',
  ㅓ: 'j',
  ㅕ: 'u',
  ㅗ: 'h',
  ㅛ: 'y',
  ㅜ: 'n',
  ㅠ: 'b',
  ㅡ: 'm',
  ㅣ: 'l',

  ㅐ: 'o',
  ㅒ: 'O',
  ㅔ: 'p',
  ㅖ: 'P',
  ㅘ: 'hk',
  ㅙ: 'ho',
  ㅚ: 'hl',
  ㅝ: 'nj',
  ㅞ: 'np',
  ㅟ: 'nl',
  ㅢ: 'ml',
}

/**
 * Convert Hangul to English
 *
 * - `간` -> `rks`
 * - `대` -> `eo`
 * @param text Text to convert
 * @returns Converted text in string
 */
export const hangulToEnglish = (text: string) => {
  const disassembled = hangul.d(text)
  const converted: string[] = disassembled.map((t) => JAUM[t] ?? MOEUM[t] ?? '')

  const result = converted.join('')
  return result
}
