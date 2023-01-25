import Layout from '@/components/Layout'
import '@/styles/global.css'
import localFont from '@next/font/local'
import { SpinnerContextProvider } from 'contexts/SpinnerContext'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const pretendard = localFont({
  src: '../assets/font/PretendardVariable.woff2',
})

const minecraft = localFont({
  src: [
    {
      path: '../assets/font/Minecraft.otf',
      weight: 'normal',
    },
    {
      path: '../assets/font/Minecraft-Bold.otf',
      weight: 'bold',
    },
  ],
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <SpinnerContextProvider>
        <Head>
          <title>Minecraft Crafting Recipe</title>
        </Head>
        <Component {...pageProps} />
        <style
          jsx
          global
        >{`
          :root {
            --f-pretendard: ${pretendard.style.fontFamily};
            --f-minecraft: ${minecraft.style.fontFamily};
          }
        `}</style>
      </SpinnerContextProvider>
    </Layout>
  )
}

export default MyApp
