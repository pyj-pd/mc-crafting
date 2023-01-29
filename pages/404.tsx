import { Button } from '@/components/Components'
import {
  Container,
  Description,
  NotFoundText,
  TextContainer,
} from '@/components/ErrorPage/styles'
import Link from 'next/link'

const NotFoundPage = () => (
  <Container>
    <TextContainer>
      <NotFoundText>404 Not Found</NotFoundText>
      <Description>
        We couldn&apos;t find the page you are looking for.
      </Description>
      <Link
        href="/"
        tabIndex={-1}
      >
        <Button type="button">Go back</Button>
      </Link>
    </TextContainer>
  </Container>
)

export default NotFoundPage
