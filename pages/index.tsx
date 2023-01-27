import { Container } from '@/components/Home/styles'
import { useEffect, useMemo, useState } from 'react'
import Search from '@/components/Home/Search'
import { DataState, SearchContext, SelectedItem } from 'contexts/SearchContext'
import Table from '@/components/Home/Table'
import { useAlerts } from 'contexts/AlertsContext'
import { errorAlert } from 'value/messages'
import { GetServerSideProps } from 'next'
import { Language } from 'types/language'
import { DEFAULT_LANGUAGE_CODE } from 'value/language'
import { getLanguageList } from 'utils/language'
import { useRouter } from 'next/router'
import { InfoApiResponse } from 'utils/api/info'
import axios, { AxiosError } from 'axios'

interface CurrentData {
  data: InfoApiResponse | null
  error: AxiosError<InfoApiResponse> | null
  loading: boolean
}

interface HomeProps {
  languages: Language[]
  currentLang: string
}

const Home = ({ languages, currentLang }: HomeProps) => {
  const [selectedId, setSelectedId] = useState<SelectedItem>({
    file: null,
    id: null,
  })
  const [searchQuery, setSearchQuery] = useState('')

  const { addAlert } = useAlerts()

  const [currentData, setCurrentData] = useState<CurrentData>({
    data: null,
    error: null,
    loading: false,
  })

  const router = useRouter()

  // Get item ID or file name from path hash
  useEffect(() => {
    const id = window.location.hash.slice(1) || null

    if (id?.endsWith('.json'))
      setSelectedId({
        file: id,
        id: null,
      })
    else setSelectedId({ file: null, id })
  }, [router.asPath])

  const dataState: DataState = useMemo(
    () =>
      currentData.loading
        ? 'loading'
        : currentData.data === null
        ? 'waiting'
        : 'done',
    [currentData]
  )

  // Data fetcher
  useEffect(() => {
    if (selectedId.file === null && selectedId.id === null)
      return setCurrentData({
        data: null,
        error: null,
        loading: false,
      })

    const controller = new AbortController()
    const { signal } = controller

    setCurrentData((state) => ({
      ...state,
      loading: true,
    }))

    axios
      .get<InfoApiResponse>('/api/info', {
        params: {
          file: selectedId.file,
          id: selectedId.id,
        },
        signal,
      })
      .then((res) => setCurrentData((state) => ({ ...state, data: res.data })))
      .catch((error) => setCurrentData((state) => ({ ...state, error })))
      .finally(() => setCurrentData((state) => ({ ...state, loading: false })))

    return () => controller.abort()
  }, [selectedId])

  // If error occurs add message to alert
  useEffect(() => {
    if (currentData.error === null) return

    const alertMessage =
      currentData.error?.response?.data?.errorMessage ??
      errorAlert.itemSearchFail

    setSelectedId({ file: null, id: null })
    addAlert(alertMessage, 'info')
  }, [currentData.error, addAlert])

  return (
    <SearchContext.Provider
      value={{
        selected: { state: selectedId, setState: setSelectedId },
        searchQuery: { state: searchQuery, setState: setSearchQuery },
        languages,
        language: currentLang,
        state: dataState,
      }}
    >
      <Container>
        <Search />
        <Table data={currentData?.data?.data ?? null} />
      </Container>
    </SearchContext.Provider>
  )
}

export default Home

const languages = await getLanguageList()

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const lang = locale ?? null
  const currentLang =
    languages.findIndex(({ code }) => code === lang) === -1
      ? DEFAULT_LANGUAGE_CODE
      : lang

  return {
    props: {
      languages,
      currentLang,
    },
  }
}
