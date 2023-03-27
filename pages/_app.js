import React from 'react'
import Head from 'next/head'
import GlobalStateProvider from 'store/GlobalStateProvider'
import Header from 'components/Header'
import Footer from 'components/Footer'
import styled from 'styled-components'
import Theme from 'styles/Theme'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const pageName = Component.prototype.constructor.name
  const Wrapper = pageName === 'Home' ? HomePageWrapper : PageWrapper
  return (
    <GlobalStateProvider>
      <Head>
        <title>{`${pageName} — cgbuen`}</title>
        <link rel="stylesheet" href="https://use.typekit.net/kgo8rkq.css" />
        <link rel="shortcut icon" href="/icons/favicon.ico?v=2021052000" />
      </Head>
      <Theme>
        <Header />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
        <Footer />
      </Theme>
    </GlobalStateProvider>
  )
}

const HomePageWrapper = styled.div``
const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 15px;
`
