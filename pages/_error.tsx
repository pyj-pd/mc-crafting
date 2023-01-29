import { Button } from '@/components/Components'
import {
  Container,
  Description,
  NotFoundText,
  TextContainer,
} from '@/components/ErrorPage/styles'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { errorAlert, errorPageMessage } from 'value/messages'

interface ErrorPageProps {
  statusCode: number
  message: string
}

const ErrorPage = ({ statusCode, message }: ErrorPageProps) => (
  <Container>
    <TextContainer>
      <NotFoundText>{statusCode}</NotFoundText>
      <Description>{message}</Description>
      <Link
        href="/"
        tabIndex={-1}
      >
        <Button type="button">Go back</Button>
      </Link>
    </TextContainer>
  </Container>
)

export default ErrorPage

export const getServerSideProps: GetServerSideProps<ErrorPageProps> = async ({
  res,
}) => {
  const statusCode = res.statusCode
  const message =
    res.statusMessage ??
    errorPageMessage[statusCode] ??
    errorPageMessage.default

  return {
    props: {
      statusCode,
      message,
    },
  }
}
