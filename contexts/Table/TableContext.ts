import { createContext } from 'react'
import { RecipeData } from 'types/recipe-data'

export interface TableContextData {
  fontSizes: {
    searchFirst: number
    outputItemCount: number
    loadingSpinnerSize: number
  }
  data: RecipeData | null
}

export const initialValue: TableContextData = {
  fontSizes: {
    searchFirst: 0,
    outputItemCount: 0,
    loadingSpinnerSize: 0,
  },
  data: null,
}

export const TableContext = createContext(initialValue)
