import Router from 'next/router'
import styled from 'styled-components'
import LinkBlank from 'components/LinkBlank'
import Social from 'components/Social'

export default function Footer() {
  return (
    <FooterContainer>
      <Social className={"footer"} />
      <Copyright>
        &copy; {(new Date()).getYear() + 1900} cgbuen
      </Copyright>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  bottom: 0;
  margin-bottom: 15px;
  max-width: none;
  text-align: center;
  width: 100%;
`
const Copyright = styled.div``
