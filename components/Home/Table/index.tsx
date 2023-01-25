import { RecipeData } from 'types/recipe-data'
import {
  Arrow,
  Container,
  Input,
  InputContainer,
  TextContainer,
  OutputContainer,
  OutputCount,
  OutputImageContainer,
  TableContainer,
} from './styles'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import InputImage from './InputImage'
import { SearchContext, useItem } from 'contexts/SearchContext'
import Loading from '@/components/Loading'

interface TableProps {
  data?: RecipeData | null
}

type TextureContextData = RecipeData['textures']

export const initialValue = [] as TextureContextData

export const TextureContext = createContext(initialValue)

const Table = ({ data }: TableProps) => {
  const { state } = useContext(SearchContext)
  const { setItem } = useItem()

  const getImage = useCallback(
    (id: string | null) =>
      id === null
        ? null
        : data?.textures?.find((item) => id === item.id)?.texture ?? null,
    [data]
  )

  const tableRef = useRef<HTMLDivElement>(null)
  const [tableWidth, setTableWidth] = useState(0)
  const searchFirstSize = useMemo(() => tableWidth * 0.04, [tableWidth])
  const outputCountSize = useMemo(() => tableWidth * 0.03, [tableWidth])
  const loadingSize = useMemo(() => tableWidth * 0.06, [tableWidth])

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
      <TableContainer ref={tableRef}>
        {state !== 'done' ? (
          <TextContainer>
            {state === 'loading' ? (
              <Loading height={`${loadingSize}px`} />
            ) : (
              <span style={{ fontSize: `${searchFirstSize}px` }}>
                Search first.
              </span>
            )}
          </TextContainer>
        ) : (
          data && (
            <TextureContext.Provider value={data.textures}>
              <InputContainer>
                {data.pattern.map((key, index) => {
                  const empty = key === ' '

                  const id = data.key[key]

                  const onClick = empty ? undefined : () => setItem(id[0])

                  return (
                    <Input
                      key={index}
                      type="button"
                      $empty={empty}
                      tabIndex={empty ? -1 : 0}
                      onClick={onClick}
                    >
                      {key !== ' ' && <InputImage id={id} />}
                    </Input>
                  )
                })}
              </InputContainer>
              <Arrow />
              <OutputContainer>
                <OutputImageContainer style={{ position: 'relative' }}>
                  <Image
                    src={getImage(data.id) ?? '/vercel.svg'}
                    fill
                    alt={data.id}
                  />
                </OutputImageContainer>
                {data.count > 1 && (
                  <OutputCount style={{ fontSize: `${outputCountSize}px` }}>
                    {data.count}
                  </OutputCount>
                )}
              </OutputContainer>
            </TextureContext.Provider>
          )
        )}
      </TableContainer>
    </Container>
  )
}

export default Table
