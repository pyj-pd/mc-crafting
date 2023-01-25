import { spinnerValue } from 'value/loading'
import { LoadingContainer, S } from './styles'
import { CSSProperties, useContext } from 'react'
import { DOTS_COUNT, MAX_DOTS, SpinnerContext } from 'contexts/SpinnerContext'

/**
 * Check if the dot is selected
 * @param index Dot index
 * @param current Current index
 */
const isSelected = (index: number, current: number): boolean => {
  const condition =
    current + MAX_DOTS - 1 > DOTS_COUNT
      ? // If current + max dots exceeds dots count:
        index >= current || index <= ((current + MAX_DOTS) % DOTS_COUNT) - 1
      : current <= index && index <= current + MAX_DOTS - 1

  return condition
}

interface LoadingProps {
  height?: string
}

const Loading = ({ height }: LoadingProps) => {
  const index = useContext(SpinnerContext)

  return (
    <LoadingContainer style={{ height }}>
      {spinnerValue.map((row, top) =>
        row.map(
          (column, left) =>
            column > 0 && (
              <S
                key={column}
                style={
                  {
                    '--t': top,
                    '--l': left,
                  } as CSSProperties
                }
                $selected={isSelected(column, index)}
              />
            )
        )
      )}
    </LoadingContainer>
  )
}

export default Loading
