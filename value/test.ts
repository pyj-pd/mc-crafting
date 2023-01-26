// All of these data are for testing only

import { RecipeDataQuery } from 'types/recipe-data'

export const ITEM_ID = 'minecraft:white_wool'
export const TAG_ID = 'minecraft:acacia_logs'

export const LANGUAGE_CODE = 'ko'

export const POST_FILE = 'posts/about.md'

export const CRAFTING_RECIPE_ITEMS: Record<
  'shaped' | 'shapeless',
  RecipeDataQuery
> = {
  shaped: { id: ITEM_ID },
  shapeless: { file: 'light_blue_bed_from_white_bed.json' },
}
