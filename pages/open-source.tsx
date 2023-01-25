import PostContainer from '@/components/Posts'
import { GetStaticProps } from 'next'
import { loadPost } from 'utils/post'
import { PostProps } from 'value/post'

const OpenSource = ({ post }: PostProps) => (
  <PostContainer>{post}</PostContainer>
)

export default OpenSource

export const getStaticProps: GetStaticProps<PostProps> = async () => {
  const post = await loadPost('./posts/open-source.md')

  return {
    props: {
      post,
    },
  }
}
