import PostContainer from '@/components/Posts'
import { GetStaticProps } from 'next'
import { loadPost } from 'utils/post'
import { PostProps } from 'value/post'

const About = ({ post }: PostProps) => <PostContainer>{post}</PostContainer>

export default About

export const getStaticProps: GetStaticProps<PostProps> = async () => {
  const post = await loadPost('./posts/about.md')

  return {
    props: {
      post,
    },
  }
}
