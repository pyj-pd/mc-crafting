import { ChangeEvent, useContext } from 'react'
import { Select } from './styles'
import { SearchContext } from 'contexts/SearchContext'
import { useRouter } from 'next/router'

const SelectLanguage = () => {
  const router = useRouter()
  const {
    searchQuery: { setState },
    languages,
    language,
  } = useContext(SearchContext)

  const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value

    setState('')
    router.push('/', undefined, {
      shallow: false,
      locale: lang,
    })
  }

  return (
    <Select
      onChange={changeLanguage}
      defaultValue={language}
    >
      {languages.map(({ code, name }) => (
        <option
          value={code}
          key={code}
        >
          {name}
        </option>
      ))}
    </Select>
  )
}

export default SelectLanguage
