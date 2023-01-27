import { ApiFunction, ApiResponse } from 'types/api'
import { RecipeData } from 'types/recipe-data'
import { getRecipeData } from 'utils/converter'
import { convertRecipeData } from 'utils/recipe-data'
import { apiResponse } from 'value/messages'

export type InfoApiArgs = Partial<{
  file?: string
  id?: string
}>

export type InfoApiResponse = ApiResponse<RecipeData>

/**
 * Get crafting recipe
 * @param file Item file name
 * @param id Item ID
 * @returns Crafting recipe of that item
 */
export const runInfoApi: ApiFunction<InfoApiResponse, InfoApiArgs> = async ({
  file,
  id,
}) => {
  if (typeof file !== 'string' && typeof id !== 'string')
    return {
      data: null,
      errorMessage: apiResponse.invalidParameter,
    }

  const rawData = await getRecipeData({ file, id }).catch(() => null)

  if (rawData === null)
    return {
      data: null,
      errorMessage: apiResponse.couldNotFindItem,
    }

  const data = await convertRecipeData(rawData)

  return {
    data,
    errorMessage: null,
  }
}
