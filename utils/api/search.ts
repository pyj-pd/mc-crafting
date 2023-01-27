import Fuse from 'fuse.js'
import { ApiFunction, ApiResponse } from 'types/api'
import { ItemNamePair } from 'types/recipe-data'
import { getItemList, textToSearch } from 'utils/converter'
import { apiResponse } from 'value/messages'

export const MAX_SEARCH_RESULT = 8

export type SearchApiArgs = Partial<{
  query: string
  lang?: string
}>

export type SearchApiResponse = ApiResponse<ItemNamePair[]>

/**
 * Search for item
 * @param query Search query
 * @param lang Language code
 * @returns List of found items
 */
export const runSearchApi: ApiFunction<
  SearchApiResponse,
  SearchApiArgs
> = async ({ query, lang }): Promise<SearchApiResponse> => {
  if (typeof query !== 'string')
    return {
      data: null,
      errorMessage: apiResponse.invalidParameter,
      statusCode: 400,
    }

  const itemNames = await getItemList(lang, true).catch(() => null)

  if (itemNames === null)
    return {
      data: null,
      errorMessage: apiResponse.invalidLanguage,
      statusCode: 400,
    }

  const fuse = new Fuse(itemNames, { keys: ['id', 'searchName'] })

  const convertedQuery = textToSearch(query)

  const data = fuse
    .search(convertedQuery)
    .map((item) => item.item)
    .slice(0, MAX_SEARCH_RESULT)

  return {
    data,
    errorMessage: null,
  }
}
