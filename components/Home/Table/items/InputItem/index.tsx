import InputImage from './InputImage'
import { InputContainer } from '../../styles'
import { useContext, useMemo, useState } from 'react'
import { TableContext } from 'contexts/Table/TableContext'
import { useItem } from 'contexts/SearchContext'

interface HoverIndex {
  [index: number]: number
}

const InputItem = () => {
  const { data } = useContext(TableContext)
  const { setItem } = useItem()

  const [hoverIndex, setHoverIndex] = useState<HoverIndex>({})

  const events = useMemo(
    () => ({
      onClick: (id: string, index: number) => {
        if (hoverIndex[index] > 0) setItem(id)
        else
          setHoverIndex((state) => {
            const result = { ...state }
            result[index] += 1

            return result
          })
      },
      onFocus: (index: number) => {
        if (!hoverIndex[index])
          setHoverIndex((state) => ({ ...state, [index]: 0 }))
      },
      onBlur: (index: number) =>
        setHoverIndex((state) => {
          const result = { ...state }
          delete result[index]

          return result
        }),
    }),
    [hoverIndex, setItem]
  )

  return (
    <InputContainer>
      {data?.pattern.map((key, index) => {
        const ids = (data.key[key] ?? []) as string[] | []
        const selected = index in hoverIndex

        return (
          <InputImage
            ids={ids}
            index={index}
            key={index}
            selected={selected}
            {...events}
          />
        )
      })}
    </InputContainer>
  )
}

export default InputItem
