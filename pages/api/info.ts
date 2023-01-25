import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from 'types/api'
import { RecipeData } from 'types/recipe-data'
import { getRecipeData } from 'utils/converter'
import { convertRecipeData } from 'utils/recipe-data'
import { apiResponse } from 'value/messages'

export type InfoApiQuery = {
  file?: string
  id?: string
}

export type InfoApiResponse = ApiResponse<RecipeData>

/**
 * Get crafting recipe
 * @param file Item file name
 * @param id Item ID
 * @returns Crafting recipe of that item
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<InfoApiResponse>
) => {
  const { file, id } = req.query as InfoApiQuery

  if (typeof file !== 'string' && typeof id !== 'string')
    return res.status(400).json({
      data: null,
      errorMessage: apiResponse.invalidParameter,
    })

  const rawData = await getRecipeData({ file, id }).catch(() => null)

  if (rawData === null)
    return res.status(400).json({
      data: null,
      errorMessage: apiResponse.couldNotFindItem,
    })

  const data = await convertRecipeData(rawData)

  res.json({
    data,
    errorMessage: null,
  })
}

export default handler
