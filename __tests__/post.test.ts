import { loadPost } from 'utils/post'
import { POST_FILE } from 'value/test'
import { describe, expectTypeOf, it } from 'vitest'

describe('Post loader', () => {
  it('loads post', async () => {
    const post = await loadPost(POST_FILE)

    expectTypeOf(post).toBeString()
  })
})
