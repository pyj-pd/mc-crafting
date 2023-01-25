import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { Language, Translation } from 'types/language'

const ALLOWED_PREFIX = ['item', 'block']

const languageListDir = path.resolve(process.cwd(), 'data', 'lang')

/**
 * Get language list
 * @returns Array that contains name and code of each language
 */
export const getLanguageList = async (): Promise<Language[]> => {
  const languageFiles = await readdir(languageListDir)

  const languages: Language[] = []

  for (const languageFile of languageFiles) {
    const languageData = JSON.parse(
      await readFile(path.join(languageListDir, languageFile), 'utf-8')
    )

    const name = languageData['language.name'] as string
    const code = languageFile.split('.')[0]

    languages.push({ name, code })
  }

  return languages
}

/**
 * Get translation list of a language
 * @param code Language code
 * @returns Translations for the language
 */
export const getTranslation = async (code: string): Promise<Translation> => {
  // Read translation file
  const languageFile = JSON.parse(
    await readFile(path.join(languageListDir, `${code}.json`), 'utf-8')
  )

  const data: Translation = {}

  for (const key in languageFile) {
    const split = key.split('.') // item.minecraft.iron_sword

    if (ALLOWED_PREFIX.includes(split[0])) {
      // If the translation is for an item or a block.

      const keyName = split.slice(1).join(':') // minecraft:iron_sword
      data[keyName] = languageFile[key]
    }
  }

  return data
}
