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
import {
  ButtonContainer,
  Form,
  Container,
  Title,
  TitleContainer,
} from './styles'
import { SearchContext } from 'contexts/SearchContext'
import SelectLanguage from './SelectLanguage'

const Search = () => {
  const {
    searchQuery: { setState },
    selected: { state: selectedId },
  } = useContext(SearchContext)

  const inputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setState(inputRef.current?.value ?? '')
  }

  const [resultHidden, setResultHidden] = useState(false)

  const onBlur = (e: FocusEvent<HTMLFormElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setResultHidden(true)
  }

  useEffect(() => setResultHidden(true), [selectedId])

  return (
    <Container>
      <TitleContainer>
        <Title href="/">Crafting Recipe</Title>
        <SelectLanguage />
      </TitleContainer>
      <Form
        onSubmit={submitHandler}
        onFocus={() => setResultHidden(false)}
        onBlur={onBlur}
      >
        <ButtonContainer>
          <Input
            type="search"
            placeholder="Item Name"
            ref={inputRef}
          />
          <Button type="submit">Search</Button>
        </ButtonContainer>
        <SearchResult hidden={resultHidden} />
      </Form>
    </Container>
  )
}

export default Search
