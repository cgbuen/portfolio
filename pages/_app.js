import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import GlobalStateProvider from 'store/GlobalStateProvider'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ColorSchemePicker from 'components/ColorSchemePicker'
import styled from 'styled-components'
import Theme from 'styles/Theme'
import '@/styles/globals.css'

/**
 * Fix for Chrome: Turns off transitions during load to prevent
 * transition animations from unstyled content to styled content.
 * See: https://github.com/vercel/next.js/issues/25487
 */
const ChromeFixUnstyledTransitions = () => {
  const [allowTransitions, setAllowTransitions] = useState(false);

  // Run this once during render.
  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("load", function () {
        setAllowTransitions(true);
      });
    }
  }, []);

  if (allowTransitions) {
    return null;
  }
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: ` *, *::before, *::after { transition: none!important; } `,
      }}
    />
  );
};

export default function App({ Component, pageProps }) {
  ChromeFixUnstyledTransitions()
  const pageName = pageProps.name
  const Wrapper = pageName === 'Home' ? HomePageWrapper : PageWrapper
  return (
    <GlobalStateProvider>
      <Head>
        <title>{`${pageName} — cgbuen`}</title>
      </Head>
      <Theme>
        <Header />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
        <Footer />
        <ColorSchemePicker />
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
