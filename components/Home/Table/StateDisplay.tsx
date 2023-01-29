import Loading from '@/components/Loading'
import { SearchContext } from 'contexts/SearchContext'
import { useContext } from 'react'
import { TextContainer } from './styles'
import { TableContext } from 'contexts/Table/TableContext'

const StateDisplay = () => {
  const { state } = useContext(SearchContext)
  const {
    fontSizes: { loadingSpinnerSize, searchFirst },
  } = useContext(TableContext)

  return (
    <TextContainer>
      {state === 'loading' ? (
        <Loading height={`${loadingSpinnerSize}px`} />
      ) : (
        <span style={{ fontSize: `${searchFirst}px` }}>Search first.</span>
      )}
    </TextContainer>
  )
}

export default StateDisplay
