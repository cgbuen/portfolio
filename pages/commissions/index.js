import { useContext, useState, useEffect } from 'react'
import Context from 'store/context'
import classnames from 'classnames'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import LinkBlank from 'components/LinkBlank'
import Card from 'components/Card'
import { createOptimizedSrc } from 'helpers/imageService'

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default function Commissions() {
  const { globalState, globalDispatch } = useContext(Context)
  const { social } = globalState

  return (
    <CommissionsContainer>
      <Typography variant="h1">Commissions</Typography>
      <p>A few things you can commission me for.</p>
      <Card
        classes={{ cardTitle: 'cardTitle' }}
        name="Shoots"
        src={createOptimizedSrc("https://ph-1080.cgbuen.com/resources/shoots.jpg", { quality: 80, width: 570 })}
        description={(
          <Text>
            Send me a message on Discord ({social.discordP}) or {" "}
            <LinkBlank to={social.instagram}>Instagram</LinkBlank>, or by {" "}
            <LinkBlank to={`mailto:${social.email}`}>email</LinkBlank>.
          </Text>
        )}
      />
      <LinkBlankContainer to="https://forms.gle/tefHXyEh9WsAJjBs9">
        <Card
          classes={{ cardTitle: 'cardTitle' }}
          name="Film Development & Scanning"
          src={createOptimizedSrc("https://ph-1080.cgbuen.com/resources/film.jpg", { quality: 80, width: 570 })}
          description={(
            <Text>
              I'll develop and scan your photo film, ready for print or social media, starting at $3 per roll.{" "}
              For the fastest response, fill out <FakeLink>this form</FakeLink>.
            </Text>
          )}
        />
      </LinkBlankContainer>
      <Card
        classes={{ cardTitle: 'cardTitle' }}
        name="Keyboard Builds"
        src={createOptimizedSrc("https://ph-1080.cgbuen.com/resources/keyboards.jpg", { quality: 80, width: 570 })}
        description={(
          <Text>
            Send me a message on Discord ({social.discordP}),{" "}
            <LinkBlank to={social.instagram}>Instagram</LinkBlank>, or {" "}
            <LinkBlank to={`mailto:${social.email}`}>email</LinkBlank>.
          </Text>
        )}
      />
    </CommissionsContainer>
  )
}

const CommissionsContainer = styled.div`
  .cardTitle {
    color: white;
  }
`
const Text = styled.div`
  color: white;
  font-weight: normal;
`
const LinkBlankContainer = styled(LinkBlank)`
  text-decoration: none;
`
const FakeLink = styled.span`
  color: #69c;
  font-weight: bold;
  text-decoration: underline;
`
