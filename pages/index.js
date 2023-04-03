import Router from 'next/router'
import styled from 'styled-components'
import Social from 'components/Social'
import { createOptimizedSrc } from 'helpers/imageService'

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default function Home() {
  const goTo = link => {
    return () => {
      Router.push(link)
    }
  }

  const items = [
    { name: 'Projects', href: '/projects' },
    { name: 'Photos', href: '/photography' },
    { name: 'Keyboards', href: '/collection' },
  ]
  return (
    <>
      <HeroContainer>
        <HeroTextContainer>
          <Headline>cgbuen</Headline>
          <Headline className="cheat">cgbuen</Headline>
          <HeroSubTextContainer>
            <HeroLink onClick={goTo('/projects')}>Software Engineering.</HeroLink>
            <HeroLink onClick={goTo('/photography')}>Concert Photography.</HeroLink>
            <HeroLink onClick={goTo('/collection')}>Keyboard Building.</HeroLink>
          </HeroSubTextContainer>
          <Social className={"heroBox"} />
        </HeroTextContainer>
        <Social className={"homeOutside"} />
      </HeroContainer>
      <Items>
        {items.map((item, i) => (
          <Item key={i}>
            <ItemLink className={item.name.toLowerCase()} onClick={goTo(item.href)}></ItemLink>
            <ItemText>{item.name}</ItemText>
          </Item>
        ))
        }
      </Items>
    </>
  )
}

const HeroContainer = styled.div`
  background-image: url(${createOptimizedSrc(ASSET_DOMAIN + '/hero-1.jpg?2021052006', { quality: 90 })});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 1228px;
  position: relative;
  @media (max-width:1920px) {
    height: auto;
    padding: 32%;
  }
  @media (max-width:1080px) {
    height: 689px;
    padding: 0;
  }
`

const HeroTextContainer = styled.div`
  background: rgba(128, 128, 128, .5);
  border-radius: 3px;
  font-weight: bold;
  left: 57%;
  line-height: 2;
  overflow: hidden;
  padding: 20px;
  position: absolute;
  top: 45%;
  transform: translateY(-60%);
  @media (max-width:1080px) {
    top: 58%;
  }
  @media (max-width:768px) {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

const Headline = styled.div`
  color: white;
  font-size: 72px;
  line-height: 1;
  margin: 0;
  text-decoration: underline;
  text-decoration-color: #69c;
  &.cheat {
    position: absolute;
    text-decoration: none;
    text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);
    top: 20px;
  }
`

const HeroSubTextContainer = styled.div`
  font-size: 20px;
  padding-top: 15px;
`

const HeroLink = styled.div`
  color: white;
  cursor: pointer;
  display: block;
  text-decoration: none;
`

const Items = styled.div`
  align-items: center;
  display: flex;
  margin: 0 auto;
  max-width: 960px;
  padding: 0 15px;
  @media (max-width:568px) {
    display: block;
  }
`

const Item = styled.div`
  flex: 1;
  margin: 15px;
  position: relative;
`

const ItemLink = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  display: block;
  height: 500px;
  @media (max-width:568px) {
    height: 240px,
  }
  &.projects {
    background-image: url(${createOptimizedSrc(ASSET_DOMAIN + '/projects/moovweb-geico-01.jpg?2021051900', { quality: 80 })});
    background-position: 2% 72%;
    @media (max-width:568px) {
      background-size: cover;
      background-position: center;
    }
  }
  &.photos {
    background-image: url(${createOptimizedSrc(ASSET_DOMAIN + '/concerts/0135%2026.jpg?2021051900', { quality: 80 })});
    background-position: center 75%;
    @media (max-width:568px) {
      background-position: center 60%;
    }
  }
  &.keyboards {
    background-image: url(${createOptimizedSrc(ASSET_DOMAIN + '/keyboards/ai03-polaris.jpg?2021052000', { quality: 80 })});
  }
`

const ItemText = styled.div`
  background: #69c;
  color: white;
  display: inline-block;
  font-weight: bold;
  left: 50%;
  min-width: 120px;
  padding: 10px;
  pointer-events: none;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
`

export function getStaticProps() {
  return {
    props: { name: 'Home' }
  }
}
