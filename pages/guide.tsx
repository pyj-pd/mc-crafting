import PostContainer from '@/components/Posts'
import { GetStaticProps } from 'next'
import { loadPost } from 'utils/post'
import { PostProps } from 'value/post'

const Guide = ({ post }: PostProps) => <PostContainer>{post}</PostContainer>

export default Guide

export const getStaticProps: GetStaticProps<PostProps> = async () => {
  const post = await loadPost('./posts/guide.md')

  return {
    props: {
      post,
    },
  }
}
