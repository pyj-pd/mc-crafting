import { ListContainer } from './styles'
import Image from 'next/image'
import { useItem } from 'contexts/SearchContext'

interface ListProps {
  file: string
  name: string
  texture: string
}

const List = ({ file, name, texture }: ListProps) => {
  const { setItem } = useItem()

  const selectItem = () => setItem(file)

  return (
    <ListContainer onClick={selectItem}>
      <Image
        src={texture}
        width={25}
        height={25}
        style={{ imageRendering: 'pixelated' }}
        alt={`Image of ${name}`}
      />
      <span>{name}</span>
    </ListContainer>
  )
}

export default List
