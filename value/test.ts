// All of these data are for testing only

import { RecipeDataQuery } from 'types/recipe-data'

export const ITEM_ID = 'minecraft:white_wool'
export const FILE_NAME = 'light_blue_bed_from_white_bed.json'
export const FILE_RESULT = 'minecraft:light_blue_bed'
export const TAG_ID = 'minecraft:acacia_logs'

export const LANGUAGE_CODE = 'ko'

export const POST_FILE = 'posts/about.md'

export const CRAFTING_RECIPE_ITEMS: Record<
  'shaped' | 'shapeless',
  RecipeDataQuery
> = {
  shaped: { id: ITEM_ID },
  shapeless: { id: FILE_RESULT, file: FILE_NAME },
}

export const SEARCH_QUERY = {
  en: 'Red bed',
  ko: '빨간침대',
}

export const SEARCH_QUERY_TYPO = {
  en: 'ersdg bed',
  ko: 'qkfrskstor claeo',
}
