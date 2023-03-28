import { useContext, useState, useEffect } from 'react'
import Context from 'store/context'
import classnames from 'classnames'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import LinkBlank from 'components/LinkBlank'
import { createOptimizedSrc } from 'helpers/imageService'

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default function About() {
  const { globalState, globalDispatch } = useContext(Context)
  const { social } = globalState

  const bioPhoto = `${ASSET_DOMAIN}/0245+04+bio.jpg?2020010102`

  return (
    <>
      <Typography variant="h1">About</Typography>
      <p>
        Hi! I&rsquo;m Chris, a software engineer, photographer, and content
        creator based in San Francisco, California. This website serves as a
        portfolio of work completed both professionally and for leisure.
      </p>
      <p>
        I stream a few different types of content on <LinkBlank to={social.twitch}>Twitch</LinkBlank>,
        including:
      </p>
      <ul>
        <li>Custom mechanical keyboard builds</li>
        <li>Photo film shoots, development, and scans</li>
        <li>Personal software projects</li>
        <li>Splatoon gameplay</li>
      </ul>
      <p>
        (Past broadcasts can be found <LinkBlank to={social.youtubeV}>here</LinkBlank>.)
      </p>
      <p>
        Send me a message for any inquiries. I&rsquo;m best reached by Discord
        ({social.discordP}), <LinkBlank to={social.instagram}>Instagram</LinkBlank>{" "}
        DM, or <LinkBlank to={`mailto:${social.email}`}>email</LinkBlank>.
      </p>
      <Image alt={"cgbuen"} src={createOptimizedSrc(bioPhoto, { quality: 90 })} />
    </>
  )
}

const Image = styled.img`
  display: block;
  width: 100%;
`

export function getStaticProps() {
  return {
    props: { name: 'About' }
  }
}
