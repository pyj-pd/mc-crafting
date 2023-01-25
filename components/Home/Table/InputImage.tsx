import Image from 'next/image'
import { useContext, useEffect, useMemo, useState } from 'react'
import { TextureContext } from '.'
import { InputImageContainer } from './styles'

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
      alt={id.join(', ')}
    />
  )
}

/**
 * Component to display single items
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

const InputImage = ({ id }: ImageProps) => {
  const ImageComponent = id.length > 1 ? TagImage : ItemImage

  return (
    <InputImageContainer style={{ position: 'relative' }}>
      <ImageComponent id={id} />
    </InputImageContainer>
  )
}

export default InputImage
