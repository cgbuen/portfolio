import { useContext } from 'react'
import Context from 'store/context'
import Router from 'next/router'
import styled from 'styled-components'
import LinkBlank from 'components/LinkBlank'
import Twitch from '../public/assets/twitch.svg'
import Instagram from '../public/assets/instagram.svg'
import YouTube from '../public/assets/youtube.svg'
import GitHub from '../public/assets/github.svg'
import Discord from '../public/assets/discord-2.svg'
import Twitter from '../public/assets/twitter.svg'
import Mail from '@mui/icons-material/MailOutline'


export default function Header() {
  const { globalState } = useContext(Context)
  const { social } = globalState
  return (
    <FooterContainer>
      <Social>
        <Line>
          {
            [
              {name: 'twitch', icon: Twitch },
              {name: 'instagram', icon: Instagram },
              {name: 'youtubeM', icon: YouTube },
              {name: 'github', icon: GitHub },
            ].map((x, i) => (
              <LinkBlankIcon key={i} to={social[x.name]}>
                <x.icon className={"icon"} />
              </LinkBlankIcon>
            ))
          }
        </Line>
        <Line>
          {
            [
              {name: 'discordS', icon: Discord },
              {name: 'twitter', icon: Twitter },
            ].map((x, i) => (
              <LinkBlankIcon key={i} to={social[x.name]}>
                <x.icon className={"icon"} />
              </LinkBlankIcon>
            ))
          }
          <LinkBlankIcon to={`mailto:${social.email}`}>
            <Mail className={"icon"} />
          </LinkBlankIcon>
        </Line>
      </Social>
      <Copyright>
        &copy; {(new Date()).getYear() + 1900} cgbuen
      </Copyright>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  bottom: 0;
  max-width: none;
  text-align: center;
  width: 100%;
`
const Social = styled.div``
const Copyright = styled.div``
const Line = styled.div`
  display: inline-block;
`
const LinkBlankIcon = styled(LinkBlank)`
  color: rgba(255, 255, 255, .65);
  display: inline-block;
  height: 32px;
  margin: 0 5px;
  padding: 5px;
  transition: color .2s ease-in-out;
  verticalAlign: middle;
  width: 32px;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
  @media (max-width:568px) {
    height: 48px;
    margin: 0 8px;
    width: 48px;
  }
  .icon {
    fill: currentColor;
    height: 100%;
    user-select: none;
    width: 100%;
  }
`
