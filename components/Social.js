import { useContext } from 'react'
import Context from 'store/context'
import styled from 'styled-components'
import LinkBlank from 'components/LinkBlank'
import Twitch from '../public/assets/twitch.svg'
import Instagram from '../public/assets/instagram.svg'
import YouTube from '../public/assets/youtube.svg'
import GitHub from '../public/assets/github.svg'
import Discord from '../public/assets/discord-2.svg'
import Twitter from '../public/assets/twitter.svg'
import Mail from '@mui/icons-material/MailOutline'


export default function Social({ className }) {
  const { globalState } = useContext(Context)
  const { social } = globalState
  const allIcons = [
    {name: 'twitch', icon: Twitch },
    {name: 'instagram', icon: Instagram },
    {name: 'youtubeM', icon: YouTube },
    {name: 'github', icon: GitHub },
    {name: 'discordS', icon: Discord },
    {name: 'twitter', icon: Twitter },
  ]
  const inHero = ['heroBox', 'homeOutside'].includes(className)
  const iconsLine1 = allIcons.slice(0, inHero ? 3 : 4)
  const iconsLine2 = allIcons.slice(inHero ? 3 : 4)
  return (
    <SocialContainer className={className}>
      <Line>
        {
          iconsLine1.map((x, i) => (
            <LinkBlankIcon key={i} to={social[x.name]}>
              <x.icon className={"icon"} />
            </LinkBlankIcon>
          ))
        }
      </Line>
      <Line>
        {
          iconsLine2.map((x, i) => (
            <LinkBlankIcon key={i} to={social[x.name]}>
              <x.icon className={"icon"} />
            </LinkBlankIcon>
          ))
        }
        {!inHero && (
          <LinkBlankIcon to={`mailto:${social.email}`}>
            <Mail className={"icon"} />
          </LinkBlankIcon>
)}
      </Line>
    </SocialContainer>
  )
}

const Line = styled.div`
  display: inline-block;
  @media (max-width:1080px), (min-width:1920px) {
    display: block;
  }
`
const LinkBlankIcon = styled(LinkBlank)`
  color: white;
  display: inline-block;
  height: 48px;
  margin: 0 8px;
  padding: 5px;
  vertical-align: middle;
  width: 48px;
  @media (min-width:1920px) {
    display: block;
    margin: 8px;
  }
  .icon {
    fill: currentColor;
    filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, .5));
    height: 100%;
    user-select: none;
    width: 100%;
  }
`
const SocialContainer = styled.div`
  bottom: 15%;
  position: absolute;
  right: 15%;
  @media (max-width:1080px) {
    display: none;
  }
  &.heroBox {
    display: none;
    margin-top: 15px;
    position: static;
    text-align: center;
    @media (max-width:1080px) {
      display: block;
    }
  }
  &.footer {
    position: static;
    @media (max-width:1080px) {
      display: block;
    }
    ${Line} {
      @media (max-width:1080px), (min-width:1920px) {
        display: inline-block;
      }
    }
    ${LinkBlankIcon} {
      height: 32px;
      width: 32px;
      @media (max-width:1080px), (min-width:1920px) {
        display: inline-block;
      }
      @media (prefers-color-scheme: light) {
        .icon {
          fill: #151515;
          filter: none;
        }
      }
    }
  }
`
