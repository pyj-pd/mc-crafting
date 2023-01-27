import { runInfoApi } from 'utils/api/info'
import { FILE_NAME, FILE_RESULT, ITEM_ID } from 'value/test'
import { describe, expect, it } from 'vitest'

describe('Item Info API', () => {
  it('gets information of an item', async () => {
    const apiResponse = await runInfoApi({ id: ITEM_ID })

    expect(apiResponse.errorMessage).toBeNull()
    expect(apiResponse.data?.id).toEqual(ITEM_ID)
  })

  it('gets information of a file', async () => {
    const apiResponse = await runInfoApi({ file: FILE_NAME })

    expect(apiResponse.errorMessage).toBeNull()
    expect(apiResponse.data?.id).toEqual(FILE_RESULT)
  })
})
