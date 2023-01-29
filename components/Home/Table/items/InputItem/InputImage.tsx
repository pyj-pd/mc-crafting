import Image from 'next/image'
import { KeyboardEvent, useContext, useEffect, useMemo, useState } from 'react'
import { TextureContext } from '../..'
import { Input, InputImageContainer } from '../../styles'
import { getItemIdString } from 'utils/string'
import { BlurHandler, ClickHandler, FocusHandler } from 'types/input-item'
import Tooltip from '../../Tooltip'

const IMAGE_CHANGE_INTERVAL = 1000

const useTextureContext = () => useContext(TextureContext)

interface ImageProps {
  id: string[]
}

/**
 * Component to display multiple items
 */
export const TagImage = ({ id }: ImageProps) => {
  const textures = useTextureContext()
  const images = textures.filter((image) => id.includes(image.id))

  const [currentIndex, setCurrentIndex] = useState(0)
  const currentImage = useMemo(
    () => images[currentIndex].texture,
    [currentIndex, images]
  )

  // Change image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((state) => {
        const nextIndex = state + 1

        if (nextIndex >= images.length) return 0
        else return nextIndex
      })
    }, IMAGE_CHANGE_INTERVAL)

    return () => clearInterval(interval)
  }, [images])

  if (currentImage === null) return null

  return (
    <Image
      src={currentImage}
      fill
      alt={getItemIdString(id)}
    />
  )
}

/**
 * Component to display single item
 */
export const ItemImage = ({ id }: ImageProps) => {
  const textures = useTextureContext()
  const image = textures.find((image) => id[0] === image.id)?.texture ?? null

  if (image === null) return null

  return (
    <Image
      src={image}
      fill
      alt={id[0]}
    />
  )
}

interface InputImageProps {
  ids: string[]
  index: number
  selected?: boolean
  onClick: ClickHandler
  onFocus: FocusHandler
  onBlur: BlurHandler
}

const InputImage = ({
  ids,
  index,
  selected,
  onClick,
  onFocus,
  onBlur,
}: InputImageProps) => {
  const ImageComponent = ids.length > 1 ? TagImage : ItemImage

  const empty = ids.length < 1

  const onKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') onClick(ids[0], index, true)
  }

  return (
    <Input
      key={index}
      type="button"
      $empty={empty}
      tabIndex={empty ? -1 : 0}
      onMouseUp={() => onClick(ids[0], index)}
      onFocus={() => onFocus(index)}
      onBlur={() => onBlur(index)}
      onKeyUp={onKeyUp}
    >
      {ids && (
        <Tooltip
          ids={ids}
          hidden={!selected}
        />
      )}
      {!empty && ids && (
        <InputImageContainer
          style={{
            position: 'relative',
            pointerEvents: 'none',
            backgroundColor: selected
              ? 'var(--c-inventory-hover-background-color)'
              : undefined,
          }}
        >
          <ImageComponent id={ids} />
        </InputImageContainer>
      )}
    </Input>
  )
}

export default InputImage
