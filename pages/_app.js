import React from 'react'
import Head from 'next/head'
import GlobalStateProvider from 'store/GlobalStateProvider'
import CssBaseline from '@mui/material/CssBaseline';
import Header from 'components/Header'
import Footer from 'components/Footer'
import ColorSchemePicker from 'components/ColorSchemePicker'
import Loading from 'components/Loading'
import styled from 'styled-components'
import GlobalStyles from 'styles/GlobalStyles'
import Theme from 'styles/Theme'

export default function App({ Component, pageProps }) {
  const pageName = pageProps.name
  const Wrapper = pageName === 'Home' ? HomePageWrapper : PageWrapper
  return (
    <GlobalStateProvider>
      <GlobalStyles />
      <Head>
        <title>{`${pageName} — cgbuen`}</title>
      </Head>
      <Theme>
        <CssBaseline />
        <Header />
        <OuterWrapper>
          <Wrapper>
            <Loading />
            <Component {...pageProps} />
          </Wrapper>
        </OuterWrapper>
        <Footer />
        <ColorSchemePicker />
      </Theme>
    </GlobalStateProvider>
  )
}

const OuterWrapper = styled.div`
  position: relative;
`
const HomePageWrapper = styled.div``
const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  overflow: hidden;
  padding: 0 15px;
`
