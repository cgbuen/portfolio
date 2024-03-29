import { useContext, useState, useEffect, useCallback } from 'react'
import Context from 'store/context'
import classnames from 'classnames'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Builds from './Builds'
import Keysets from './Keysets'
import Switches from './Switches'
import LinkBlank from 'components/LinkBlank'

export default function Collection() {
  const { globalState, globalDispatch } = useContext(Context)
  const { collectionUpdated, social } = globalState
  const [tab, setTab] = useState(0)

  const getCollection = useCallback(async () => {
    globalDispatch({ type: 'SET_LOADING', payload: true })
    const collectionResponse = await fetch(`/api/collection`)
    const collectionResponseJson = await collectionResponse.json()
    globalDispatch({ type: 'SET_BUILDS', payload: collectionResponseJson.builds })
    globalDispatch({ type: 'SET_KEYSETS', payload: collectionResponseJson.keysets })
    globalDispatch({ type: 'SET_SWITCHES', payload: collectionResponseJson.switches })
    globalDispatch({ type: 'SET_COLLECTIONUPDATED', payload: collectionResponseJson.date })
    globalDispatch({ type: 'SET_BUILDFILTERSACTIVE', payload: { Built: true } })
    globalDispatch({ type: 'SET_KEYSETSORT', payload: 'purchase_date' })
    globalDispatch({ type: 'SET_KEYSETDESC', payload: false })
    globalDispatch({ type: 'SET_SWITCHESSORT', payload: 'purchase_date' })
    globalDispatch({ type: 'SET_SWITCHESDESC', payload: false })
    globalDispatch({ type: 'SET_LOADING', payload: false })
  }, [globalDispatch])

  useEffect(() => {
    getCollection()
  }, [getCollection])

  const handleSectionChange = (e, v) => {
    setTab(v)
  }

  return (
    <CollectionContainer>
      <Typography variant="h1">Keyboard Collection</Typography>
      <p>Below is my personal collection of computer keyboards (primarily in HHKB-inspired layouts) and accompanying keysets and switches. I stream my build process to <LinkBlank to={social.twitch}>Twitch</LinkBlank>.</p>
      <p><i>Last updated: {collectionUpdated}</i></p>
      <Tabs
        classes={{
          root: 'collectionTabsRoot',
          flexContainer: 'collectionTabsFlexContainer',
          scroller: 'collectionTabsScroller',
        }}
        variant="fullWidth"
        onChange={handleSectionChange}
        value={tab}
      >
        {['Keyboards', 'Keysets', 'Switches'].map((y, i) => (
          <Tab
            classes={{
              root: classnames({
                collectionTabRoot: true,
                collectionTabRootActive: i === tab,
              }),
            }}
            key={i}
            label={y}
          />
        ))}
      </Tabs>
      <>
        {0 === tab && <Builds />}
        {1 === tab && <Keysets />}
        {2 === tab && <Switches />}
      </>
    </CollectionContainer>
  )
}

const CollectionContainer = styled.div`
  .collectionTabsRoot {
    margin-bottom: 20px;
    min-height: 0;
  }
  .collectionTabsFlexContainer {
    display: block;
  }
  .collectionTabsScroller {
    border-bottom: 2px solid #69c;
  }
  .collectionTabRoot {
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    min-height: 0;
    min-width: 0;
    opacity: 1;
    text-transform: none;
    .light-mode & {
      color: #151515;
    }
  }
  .collectionTabRootActive {
    background: #69c;
    &, .light-mode & {
      color: white;
    }
  }
`

export function getStaticProps() {
  return {
    props: { name: 'Collection' }
  }
}
