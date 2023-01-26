export interface RecipeDataQuery {
  file?: string
  id?: string
}

interface RecipeCommonData {
  type: string
  category?: string
  group?: string
  result: {
    count?: number
    item: string
  }
}

/**
 * Type for recipes with type crafting_shaped
 * @see https://minecraft.fandom.com/wiki/Recipe#crafting_shaped
 */
export interface CraftingShaped extends RecipeCommonData {
  pattern: string[]
  key: {
    [key: string]: {
      item?: string
      tag?: string
    }
  }
}

/**
 * Type for recipes with type crafting_shapeless
 * @see https://minecraft.fandom.com/wiki/Recipe#crafting_shapeless
 */
export interface CraftingShapeless extends RecipeCommonData {
  ingredients: { item?: string; tag?: string }[]
}

/**
 * Default crafting recipe data
 * made by Minecraft itself
 */
export type RawRecipeData = CraftingShaped | CraftingShapeless

/**
 * Crafting recipe data that is converted
 *
 * Pattern is different from Minecraft's one.
 * Patterns contain each key, instead of each row.
 */
export type RecipeData = {
  id: string
  count: number
  key: {
    [key: string]: string[]
  }
  pattern: string[]
  textures: { id: string; texture: string | null }[]
}

/**
 * Item ID and name in pair
 */
export interface ItemNamePair {
  id: string
  file: string
  name: string
  searchName: string
  texture: string
}

/**
 * Data with item ID and its file name
 */
export interface ItemFile {
  id: string
  file: string
}

export type TagValue = string

/**
 * Default tag data
 * made by Minecraft itself
 * @see https://minecraft.fandom.com/wiki/Tag
 */
export interface RawTag {
  replace?: boolean
  values: TagValue[]
}

/**
 * Tag data
 */
export type TagData = TagValue[]
