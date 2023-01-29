import { useCallback, useContext, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  OutputContainer,
  OutputImageContainer,
  OutputCount,
} from '../../styles'
import { TableContext } from 'contexts/Table/TableContext'
import Tooltip from '../../Tooltip'

const OutputItem = () => {
  const {
    data,
    fontSizes: { outputItemCount },
  } = useContext(TableContext)

  const getImage = useCallback(
    (id: string | null) =>
      id === null
        ? null
        : data?.textures?.find((item) => id === item.id)?.texture ?? null,
    [data]
  )

  const outputItemImage = useMemo(
    () => data && getImage(data.id),
    [data, getImage]
  )

  const [tooltipShown, setTooltipShown] = useState(false)

  if (!data) return null

  return (
    <OutputContainer>
      <OutputImageContainer
        style={{
          position: 'relative',
          backgroundColor: tooltipShown
            ? 'var(--c-inventory-hover-background-color)'
            : undefined,
        }}
        onFocus={() => setTooltipShown(true)}
        onBlur={() => setTooltipShown(false)}
        tabIndex={0}
      >
        {outputItemImage && (
          <>
            <Tooltip
              ids={[data.id]}
              hidden={!tooltipShown}
              side="right"
            />
            <Image
              src={outputItemImage}
              fill
              alt={data.id}
            />
          </>
        )}
      </OutputImageContainer>
      {data.count > 1 && (
        <OutputCount style={{ fontSize: `${outputItemCount}px` }}>
          {data.count}
        </OutputCount>
      )}
    </OutputContainer>
  )
}

export default OutputItem
