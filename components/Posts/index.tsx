import { useRouter } from 'next/router'
import { Article, Container, Title } from './styles'
import ReactMarkdown from 'react-markdown'
import { markdownProps } from 'value/post'
import { useMemo } from 'react'
import { routes } from 'value/routes'

const PostContainer = ({ children }: { children: string }) => {
  const router = useRouter()

  const title = useMemo(
    () => routes.find(({ href }) => href === router.pathname)?.title,
    [router.pathname]
  )

  return (
    <Container>
      <Title>{title}</Title>
      <Article>
        <ReactMarkdown {...markdownProps}>{children}</ReactMarkdown>
      </Article>
    </Container>
  )
}

export default PostContainer
