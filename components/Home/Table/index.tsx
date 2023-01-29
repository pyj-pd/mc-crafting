import { RecipeData } from 'types/recipe-data'
import { Arrow, Container, TableContainer } from './styles'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { SearchContext } from 'contexts/SearchContext'
import { TableContext, TableContextData } from 'contexts/Table/TableContext'
import StateDisplay from './StateDisplay'
import InputItem from './items/InputItem'
import OutputItem from './items/OutputItem'

interface TableProps {
  data?: RecipeData | null
}

type TextureContextData = RecipeData['textures']

export const initialValue = [] as TextureContextData

export const TextureContext = createContext(initialValue)

const Table = ({ data = null }: TableProps) => {
  const { state } = useContext(SearchContext)

  const tableRef = useRef<HTMLDivElement>(null)
  const [tableWidth, setTableWidth] = useState(0)

  const fontSizes: TableContextData['fontSizes'] = useMemo(
    () => ({
      loadingSpinnerSize: tableWidth * 0.06,
      outputItemCount: tableWidth * 0.03,
      searchFirst: tableWidth * 0.03,
    }),
    [tableWidth]
  )

  const tableResizeHandler = () =>
    setTableWidth(tableRef.current?.clientWidth ?? 0)

  // Resize font size when table is resized
  useEffect(() => {
    const eventListener = () => tableResizeHandler()

    window.addEventListener('resize', eventListener)
    return () => window.removeEventListener('resize', eventListener)
  }, [])

  useEffect(() => tableResizeHandler(), [])

  return (
    <Container>
      <TableContext.Provider
        value={{
          fontSizes,
          data,
        }}
      >
        <TableContainer ref={tableRef}>
          {state !== 'done' ? (
            <StateDisplay />
          ) : (
            data && (
              <TextureContext.Provider value={data.textures}>
                <InputItem />
                <Arrow />
                <OutputItem />
              </TextureContext.Provider>
            )
          )}
        </TableContainer>
      </TableContext.Provider>
    </Container>
  )
}

export default Table
