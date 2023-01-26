import { getLanguageList, getTranslation } from 'utils/language'
import { LANGUAGE_CODE } from '../value/test'
import { describe, expect, it } from 'vitest'

describe('Language util', () => {
  it('gets language list', async () => {
    const languageList = await getLanguageList()

    expect(languageList).not.toBeFalsy()
  })

  it('gets translation of an item', async () => {
    const translation = await getTranslation(LANGUAGE_CODE)

    expect(translation).toMatchSnapshot()
  })
})
