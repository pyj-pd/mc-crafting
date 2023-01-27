import { useContext, useEffect } from 'react'
import { Container, LoadingContainer } from './styles'
import List from './List'
import { SearchContext } from 'contexts/SearchContext'
import fetcher from 'utils/fetcher'
import useSWR from 'swr'
import { useAlerts } from 'contexts/AlertsContext'
import { errorAlert } from 'value/messages'
import Loading from '@/components/Loading'
import { SearchApiResponse } from 'utils/api/search'

interface SearchResultProps {
  hidden?: boolean
}

const SearchResult = ({ hidden }: SearchResultProps) => {
  const {
    searchQuery: { state: searchQuery },
    language,
  } = useContext(SearchContext)

  const { addAlert } = useAlerts()

  const { data: searchResult, isLoading } = useSWR<SearchApiResponse>(
    searchQuery.trim().length > 0
      ? { url: '/api/search', params: { query: searchQuery, lang: language } }
      : null,
    fetcher
  )

  useEffect(() => {
    if (!searchResult?.data) return

    const length = searchResult.data.length ?? 0

    if (length < 1) addAlert(errorAlert.noResult, 'info')
  }, [addAlert, searchResult])

  return (
    <Container $hidden={hidden}>
      {isLoading && (
        <LoadingContainer>
          <Loading height="30px" />
        </LoadingContainer>
      )}
      {searchResult?.data?.map((item, index) => (
        <List
          key={index}
          {...item}
        />
      ))}
    </Container>
  )
}

export default SearchResult
