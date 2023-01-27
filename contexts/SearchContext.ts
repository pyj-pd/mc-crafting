import { useRouter } from 'next/router'
import { createContext, useCallback } from 'react'
import { Language } from 'types/language'
import { DEFAULT_LANGUAGE_CODE } from 'value/language'

export type SelectedItem = {
  file: string | null
  id: string | null
}
export type SearchQuery = string

export type DataState = 'done' | 'loading' | 'waiting'

export interface SearchContextData {
  selected: {
    state: SelectedItem
    setState: React.Dispatch<React.SetStateAction<SelectedItem>>
  }
  searchQuery: {
    state: SearchQuery
    setState: React.Dispatch<React.SetStateAction<SearchQuery>>
  }
  languages: Language[]
  language: string
  state: DataState
}

export const initialValue: SearchContextData = {
  selected: { state: { file: null, id: null }, setState: () => null },
  searchQuery: { state: '', setState: () => null },
  languages: [],
  language: DEFAULT_LANGUAGE_CODE,
  state: 'waiting',
}

export const SearchContext = createContext(initialValue)

/**
 * Hook for setting current item
 * @returns Function for setting current item
 */
export const useItem = () => {
  const router = useRouter()

  /**
   * Set current item
   * @param id Item ID or file name
   */
  const setItem = useCallback(
    (id: string) =>
      router.push({ pathname: '/', hash: id }, undefined, { shallow: true }),
    [router]
  )

  return { setItem }
}

/**
 * Hook for setting search query
 * @returns Function for setting search query
 */
export const useSearch = () => {
  const router = useRouter()

  /**
   * Set search query
   * @param query Search query
   */
  const setQuery = useCallback(
    (query: string) =>
      router.push({ pathname: '/', query: { q: query } }, undefined, {
        shallow: true,
      }),
    [router]
  )

  return { setQuery }
}
