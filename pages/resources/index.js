import { useContext, useState, useEffect } from 'react'
import Router from 'next/router'
import Context from 'store/context'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import LinkBlank from 'components/LinkBlank'
import Card from 'components/Card'
import { createOptimizedSrc } from 'helpers/imageService'

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default function Resources() {
  useEffect(() => {
    getLinks()
  }, [])

  const goTo = link => {
    return () => {
      Router.push(link)
    }
  }

  const getLinks = async () => {
    const linksResponse = await fetch(`/api/links`)
    const linksResponseJson = await linksResponse.json()
    globalDispatch({ type: 'SET_LINKS', payload: linksResponseJson })
  }

  const { globalState, globalDispatch } = useContext(Context)
  const { links } = globalState

  const descriptionize = (x, linkVisible) => {
    return (
      <Text>
        {x.description !== 'N/A' ? x.description : ''}{" "}
        {x.author_link !== 'N/A' && linkVisible ? (<>By <LinkBlank className={"clickable"} to={x.author_link}>{x.author_name}</LinkBlank>. Not by me.</>) : ''}
        {x.author_link !== 'N/A' && !linkVisible ? (<div>By {x.author_name}. Not by me.</div>) : ''}
      </Text>
    )
  }
  return (
    <ResourcesContainer>
      <Typography variant="h1">Resources</Typography>
      <p>Below is a list of other resources that don't fall under any of the other categories on this site. Some are not mine, but are just added here for my own personal reference.</p>
      {links.map(x => {
        const LinkType = x.href.startsWith('https://') ? LinkBlank : FakeLink
        const link = (
          <LinkType
            className={"linkContainer"}
            to={LinkType === LinkBlank && x.href}
            onClick={LinkType === FakeLink ? goTo(x.href) : undefined}
            key={x.id}
          >
            <Card
              classes={{ cardTitle: 'cardTitle', cardDescription: 'cardDescription', cardImg: 'visible' }}
              name={x.name}
              src={createOptimizedSrc(x.src, { quality: 80, width: 570 })}
              description={descriptionize(x, false)}
            />
          </LinkType>
        )
        if (x.author_link && x.author_link !== 'N/A') {
          return (
            <CardDupeContainer key={x.id}>
              {link}
              <Card
                className={"cheat"}
                classes={{ cardTitle: 'cardTitle', cardDescription: 'visible', cardImg: 'cardImg' }}
                name={x.name}
                src={createOptimizedSrc(x.src, { quality: 80, width: 570 })}
                description={descriptionize(x, true)}
              />
            </CardDupeContainer>
          )
        } else {
          return link
        }
      })}
    </ResourcesContainer>
  )
}

const ResourcesContainer = styled.div`
  .linkContainer {
    text-decoration: none;
  }
  .cardTitle {
    text-decoration: underline;
  }
  .cardDescription {
    font-weight: normal;
  }
  .cardImg {
    visibility: visible;
  }
  .cheat {
    background: none;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: -15px;
    width: 100%;
    .cardTitle {
      visibility: hidden;
    }
  }
`
const Text = styled.div`
  color: white;
`
const CardDupeContainer = styled.div`
  position: relative;
  .cardDescription, .cardImg {
    visibility: hidden;
  }
`
const FakeLink = styled.span`
  color: #69c;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
`
