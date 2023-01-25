import {
  CraftingShaped,
  CraftingShapeless,
  RawRecipeData,
  RecipeData,
} from 'types/recipe-data'
import { getImage, getTagData } from './converter'
import { craftingShapelessId } from 'value/recipe-data'

/**
 * Get each texture for items
 * @param ids Array of item IDs
 * @returns Array of item ID and its texture
 */
const getTextures = (ids: string[]) =>
  ids.map((id) => ({
    id,
    texture: getImage(id),
  }))

type ConvertedData = Pick<RecipeData, 'key' | 'pattern' | 'textures'>

const keyNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
const convertShapelessData = async (
  data: CraftingShapeless
): Promise<ConvertedData> => {
  const {
    ingredients,
    result: { item },
  } = data

  const items: string[] = [item] // Used to add textures

  // Convert ingredients into keys
  const key: ConvertedData['key'] = {}

  for (const [index, item] of ingredients.entries()) {
    const keyName = keyNames[index] // Key name to be used in pattern
    const keyData = item // Key data with item or tag

    const keyItems = []

    if (keyData.item) {
      items.push(keyData.item)
      keyItems.push(keyData.item)
    } else if (keyData.tag) {
      // If it's tag instead of single item,
      // add all items into texture list

      const tagItems = await getTagData(keyData.tag)

      tagItems.forEach((i) => {
        items.push(i)
        keyItems.push(i)
      })
    }

    key[keyName] = keyItems
  }

  const textures = getTextures(items)

  // Make patterns
  const pattern = Object.keys(key)

  return {
    key,
    pattern,
    textures,
  }
}

const convertShapedData = async (
  data: CraftingShaped
): Promise<ConvertedData> => {
  const {
    key: rawKey,
    result: { item },
  } = data

  const items: string[] = [item] // Used to add textures

  const key: ConvertedData['key'] = {}

  for (const keyName in rawKey) {
    const keyData = rawKey[keyName] // Key data with item or tag
    const keyItems = []

    if (keyData.item) {
      items.push(keyData.item)
      keyItems.push(keyData.item)
    } else if (keyData.tag) {
      // If it's tag instead of single item,
      // add all items into texture list

      const tagItems = await getTagData(keyData.tag)

      tagItems.forEach((i) => {
        items.push(i)
        keyItems.push(i)
      })
    }

    key[keyName] = keyItems
  }

  const textures = getTextures(items)

  const pattern = data.pattern.map((row) => row.padEnd(3, ' ').split('')).flat()

  return { key, pattern, textures }
}

/**
 * Converts raw recipe data into key & pattern data
 * @param data Raw crafting recipe data
 * @returns Converted recipe data
 */
export const convertRecipeData = async (
  data: RawRecipeData
): Promise<RecipeData> => {
  const toAdd = {
    count: data.result.count ?? 1,
    id: data.result.item,
  }

  const id = data.type

  if (id === craftingShapelessId) {
    // Shapeless data
    const converted = await convertShapelessData(data as CraftingShapeless)

    return {
      ...toAdd,
      ...converted,
    }
  } else {
    // Shaped data
    const converted = await convertShapedData(data as CraftingShaped)

    return {
      ...toAdd,
      ...converted,
    }
  }
}
