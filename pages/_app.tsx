import Layout from '@/components/Layout'
import '@/styles/global.css'
import { SpinnerContextProvider } from 'contexts/SpinnerContext'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { metadata } from 'value/metadata'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <SpinnerContextProvider>
        <Head>
          <title>Minecraft Crafting Recipe</title>
          <meta
            name="description"
            content={metadata.description}
          />
          <meta
            property="og:title"
            content={metadata['og:title']}
          />
          <meta
            property="og:description"
            content={metadata['og:description']}
          />
        </Head>
        <Component {...pageProps} />
      </SpinnerContextProvider>
    </Layout>
  )
}

export default MyApp
