import GlobalStateProvider from 'store/GlobalStateProvider'
import Header from 'components/Header'
import styled from 'styled-components'
import Theme from 'styles/Theme'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <link rel="stylesheet" href="https://use.typekit.net/kgo8rkq.css" />
      <link rel="shortcut icon" href="/icons/favicon.ico?v=2021052000" />
      <Theme>
        <Header />
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </Theme>
    </GlobalStateProvider>
  )
}

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 15px;
`
