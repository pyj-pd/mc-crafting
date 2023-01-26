import { RecipeDataQuery } from 'types/recipe-data'
import { getRecipeData } from 'utils/converter'
import { convertRecipeData } from 'utils/recipe-data'
import { CRAFTING_RECIPE_ITEMS } from 'value/test'
import { describe, it, expect } from 'vitest'

/**
 * Get recipe data from file or item and convert
 * @returns Converted recipe data
 */
const getRecipeAndConvert = async ({ file, id }: RecipeDataQuery) => {
  const rawRecipeData = await getRecipeData({ file, id })

  const data = await convertRecipeData(rawRecipeData)

  return data
}

describe('Recipe data converter', () => {
  it('converts shaped item', async () => {
    const data = await getRecipeAndConvert(CRAFTING_RECIPE_ITEMS.shaped)

    expect(data).toMatchSnapshot()
  })

  it('converts shapeless item', async () => {
    const data = await getRecipeAndConvert(CRAFTING_RECIPE_ITEMS.shapeless)

    expect(data).toMatchSnapshot()
  })
})
