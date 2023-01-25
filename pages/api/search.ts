import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from 'types/api'
import { ItemNamePair } from 'types/recipe-data'
import { apiResponse } from 'value/messages'
import { textToSearch, getItemList } from 'utils/converter'
import Fuse from 'fuse.js'

export const MAX_SEARCH_RESULT = 8

export type SearchApiQuery = {
  query?: string
  lang?: string
}

export type SearchApiResponse = ApiResponse<ItemNamePair[]>

/**
 * Search for item
 * @param query Search query
 * @param lang Language code
 * @returns List of found items
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SearchApiResponse>
) => {
  const { query, lang } = req.query as SearchApiQuery

  if (typeof query !== 'string')
    return res.status(400).json({
      data: null,
      errorMessage: apiResponse.invalidParameter,
    })

  const itemNames = await getItemList(lang, true).catch(() => null)

  if (itemNames === null)
    return res.status(400).json({
      data: null,
      errorMessage: apiResponse.invalidLanguage,
    })

  const fuse = new Fuse(itemNames, { keys: ['id', 'searchName'] })

  const convertedQuery = textToSearch(query)

  const data = fuse
    .search(convertedQuery)
    .map((item) => item.item)
    .slice(0, MAX_SEARCH_RESULT)

  res.json({
    data,
    errorMessage: null,
  })
}

export default handler
