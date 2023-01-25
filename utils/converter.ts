import path from 'path'
import { readFile, readdir } from 'fs/promises'
import {
  ItemFile,
  ItemNamePair,
  RawRecipeData,
  RawTag,
  TagData,
} from 'types/recipe-data'
import { minecraftPrefix } from 'value/minecraft'
import textures from 'minecraft-textures/dist/textures/1.19'
import { getTranslation } from './language'
import { DEFAULT_LANGUAGE_CODE } from 'value/language'
import { craftingShapedId, craftingShapelessId } from 'value/recipe-data'
import hangul from 'hangul-js'
import Inko from 'inko'

/**
 * Disassemble Korean characters and make it one string
 * @param text Text to disassemble
 * @returns Disassembled text in string
 */
export const disassembleHangul = (text: string): string =>
  hangul.d(text).join('')

const inko = new Inko()

/**
 * Convert Korean characters into English
 * @param text Text to convert
 * @returns Converted text
 */
export const koreanToEnglish = (text: string): string => inko.ko2en(text)

/**
 * Convert text to work well with searching
 * @param text Text to convert
 * @returns Converted text
 */
export const textToSearch = (text: string): string =>
  koreanToEnglish(disassembleHangul(text))

const pureIdRegex = new RegExp(`^${minecraftPrefix}`)

/**
 * Get pure ID of item
 * @param id Item ID
 * @returns Item ID without the prefix
 */
const getPureId = (id: string) => id.replace(pureIdRegex, '')

const recipeListDir = path.resolve(process.cwd(), 'data', 'recipes')
const tagListDir = path.resolve(process.cwd(), 'data', 'tags')

/**
 * Get list of recipe items
 * @returns Item IDs in array
 * @deprecated Use `getItemFiles`
 */
export const getRecipeList = async () => {
  const files = await readdir(recipeListDir)

  return files
}

/**
 * Get ID and file name of items
 * @returns Array that contains items' ID and their file name
 */
export const getItemFiles = async (): Promise<ItemFile[]> => {
  const files = await readdir(recipeListDir)

  const data: ItemFile[] = []

  for (const file of files) {
    const fileData = JSON.parse(
      await readFile(path.join(recipeListDir, file), 'utf-8')
    )

    const type = fileData.type
    const isRecipe =
      (type === craftingShapedId || type === craftingShapelessId) &&
      typeof fileData.result.item === 'string'

    if (!isRecipe) continue

    const id = fileData.result.item

    const item: ItemFile = {
      id,
      file,
    }

    data.push(item)
  }

  return data
}

const itemFiles = await getItemFiles()

/**
 * Item list with recipes
 * @param code Language code
 * @param convert Whether to convert names. Used for searching.
 * @returns Array that contains id, name, and texture of each item
 */
export const getItemList = async (
  code = DEFAULT_LANGUAGE_CODE,
  convert = false
): Promise<ItemNamePair[]> => {
  const translation = await getTranslation(code)

  const itemNames: ItemNamePair[] = []

  for (const { id, file } of itemFiles) {
    const itemData = textures.items.find((item) => item.id === id)

    if (!itemData) continue

    const { texture } = itemData

    const name = translation[id]
    const searchName = convert ? textToSearch(name) : name

    const item: ItemNamePair = {
      id,
      file,
      name,
      searchName,
      texture,
    }

    itemNames.push(item)
  }

  return itemNames
}

const itemList = await getItemList()

/**
 * Get crafting recipe
 * @param file Item file name
 * @param id Item ID
 * @returns Crafting recipe of that item
 */
export const getRecipeData = async ({
  file,
  id,
}: {
  file?: string
  id?: string
}) => {
  const item = itemFiles.find((item) =>
    file ? item.file === file : item.id === id
  )

  if (!item) throw new Error('No recipe.')

  const fileDir = path.join(recipeListDir, item.file)

  const data = JSON.parse(await readFile(fileDir, 'utf-8')) as RawRecipeData

  return data
}

/**
 * Get image of the item
 * @param id Item ID
 */
export const getImage = (id: string) =>
  textures.items.find((item) => item.id === id)?.texture ?? null

/**
 * Get list of item and block in a tag
 * @param id Tag ID
 * @returns Array that contains item or block id
 */
export const getTagData = async (id: string): Promise<TagData> => {
  const tagPureId = getPureId(id)
  const tagFileName = `${tagPureId}.json`
  const tagTypes = await readdir(tagListDir)

  let tagFileDir: string | null = null

  for (const dir of tagTypes) {
    // Search through tag files
    const tagList = await readdir(path.join(tagListDir, dir))
    if (tagList.includes(tagFileName)) {
      tagFileDir = path.join(tagListDir, dir, tagFileName)
      break
    }
  }

  if (tagFileDir === null) throw new Error('No such file.')

  const tagFile = JSON.parse(await readFile(tagFileDir, 'utf-8')) as RawTag

  const data: TagData = tagFile.values

  return data
}

/**
 * Check if crafting recipe for the item exists
 * @param id Item ID
 * @returns boolean
 * @deprecated
 */
export const checkRecipeExists = async (id: string) => {
  const exists = itemList.findIndex((item) => item.id === id) !== -1

  return exists
}
