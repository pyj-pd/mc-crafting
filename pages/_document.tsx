import { Head, Html, Main, NextScript } from 'next/document'

const MyDocument = () => (
  <Html>
    <Head></Head>
    <body>
      <div id="__portal" />
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default MyDocument
