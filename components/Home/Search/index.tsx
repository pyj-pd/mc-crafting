import { Input, Button } from '@/components/Components'
import {
  useRef,
  FormEvent,
  useContext,
  useState,
  FocusEvent,
  useEffect,
} from 'react'
import SearchResult from './SearchResult'
import { Form, Container, Title, TitleContainer, FormContainer } from './styles'
import { SearchContext, useSearch } from 'contexts/SearchContext'
import SelectLanguage from './SelectLanguage'

const Search = () => {
  const {
    searchQuery: { state: searchQuery },
    selected: { state: selectedId },
  } = useContext(SearchContext)

  const { setQuery } = useSearch()

  const inputRef = useRef<HTMLInputElement>(null)

  const [resultHidden, setResultHidden] = useState(true)

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const query = inputRef.current?.value
    if (query) {
      setResultHidden(false)
      setQuery(query)
    }
  }

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setResultHidden(true)
  }

  useEffect(() => setResultHidden(true), [selectedId])

  return (
    <Container>
      <TitleContainer>
        <Title href="/">Crafting Recipe</Title>
        <SelectLanguage />
      </TitleContainer>
      <FormContainer
        onFocus={() => setResultHidden(false)}
        onBlur={onBlur}
      >
        <Form onSubmit={onSearch}>
          <Input
            type="search"
            placeholder="Search"
            defaultValue={searchQuery}
            ref={inputRef}
            autoFocus
          />
          <Button type="submit">Search</Button>
        </Form>
        <SearchResult hidden={resultHidden} />
      </FormContainer>
    </Container>
  )
}

export default Search
