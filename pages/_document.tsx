import { Head, Html, Main, NextScript } from 'next/document'

const MyDocument = () => (
  <Html>
    <Head>
      <link
        rel="search"
        type="application/opensearchdescription+xml"
        title="Crafting Recipe"
        href="/opensearch.xml"
      />
    </Head>
    <body>
      <div id="__portal" />
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default MyDocument
