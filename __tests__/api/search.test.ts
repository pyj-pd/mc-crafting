import { runSearchApi } from 'utils/api/search'
import { SEARCH_QUERY, SEARCH_QUERY_TYPO } from 'value/test'
import { describe, expect, it } from 'vitest'

describe('Search API', () => {
  it('searches in normal environment', async () => {
    const englishSearchResult = await runSearchApi({ query: SEARCH_QUERY.en })

    expect(englishSearchResult.errorMessage).toBeNull()
    expect(englishSearchResult.data?.length).toMatchInlineSnapshot('8')

    const koreanSearchResult = await runSearchApi({
      query: SEARCH_QUERY.ko,
      lang: 'ko',
    })

    expect(koreanSearchResult.errorMessage).toBeNull()
    expect(koreanSearchResult.data?.length).toMatchInlineSnapshot('8')
  })

  it('searches in typo', async () => {
    const englishSearchResult = await runSearchApi({
      query: SEARCH_QUERY_TYPO.en,
    })

    expect(englishSearchResult.errorMessage).toBeNull()
    expect(englishSearchResult.data?.length).toMatchInlineSnapshot('8')

    const koreanSearchResult = await runSearchApi({
      query: SEARCH_QUERY_TYPO.ko,
      lang: 'ko',
    })

    expect(koreanSearchResult.errorMessage).toBeNull()
    expect(koreanSearchResult.data?.length).toMatchInlineSnapshot('8')
  })
})
