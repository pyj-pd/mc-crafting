import { ITEM_ID, TAG_ID } from 'value/test'
import {
  getImage,
  getItemFiles,
  getItemList,
  getRecipeData,
  getTagData,
} from '../utils/converter'
import { hangulToEnglish } from '../utils/hangul'
import { describe, it, expect } from 'vitest'

const HANGUL_TO_ENGLISH = {
  input: '갅닮안',
  result: 'rkswekfadks',
}

describe('Data converter', () => {
  it('converts Hangul to English', () => {
    const { input, result } = HANGUL_TO_ENGLISH

    const test = hangulToEnglish(input)

    expect(test).toBe(result)
  })

  it('loads item files', async () => {
    const itemFiles = await getItemFiles()

    expect(itemFiles.length).toMatchInlineSnapshot('754')
  })

  it('loads recipe', async () => {
    const recipeData = await getItemList()

    expect(recipeData.length).toMatchInlineSnapshot('754')
  })

  it('loads recipe of an item', async () => {
    const recipeData = await getRecipeData({ id: ITEM_ID })

    expect(recipeData).toMatchSnapshot()
  })

  it('loads item image', () => {
    const image = getImage(ITEM_ID)

    expect(image).not.toBeNull()
  })

  it('loads tag data', async () => {
    const tagData = await getTagData(TAG_ID)

    expect(tagData).not.toBeFalsy()
  })
})
