import { useContext, useState, useEffect, useCallback } from 'react'
import { withRouter } from 'next/router'
import qs from 'qs'
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

function Collection({ router }) {
  const { globalState, globalDispatch } = useContext(Context)
  const { collectionUpdated, social, switches } = globalState
  const [tab, setTab] = useState(0)

  const getCollection = useCallback(async (options) => {
    const qsOpts = {}
    let keysetSort = 'purchase_date'
    let switchesSort = 'purchase_date'
    if (options.keyset_mount_status) {
      qsOpts.keyset_mount_status = options.keyset_mount_status
      keysetSort = 'mount_status'
    }
    if (options.switch_mount_status) {
      qsOpts.switch_mount_status = options.switch_mount_status
      switchesSort = 'mount_status'
    }
    globalDispatch({ type: 'SET_LOADING', payload: true })
    const collectionResponse = await fetch(`/api/collection?${qs.stringify(qsOpts)}`)
    const collectionResponseJson = await collectionResponse.json()
    globalDispatch({ type: 'SET_BUILDS', payload: collectionResponseJson.builds })
    globalDispatch({ type: 'SET_KEYSETS', payload: collectionResponseJson.keysets })
    globalDispatch({ type: 'SET_SWITCHES', payload: collectionResponseJson.switches })
    globalDispatch({ type: 'SET_COLLECTIONUPDATED', payload: collectionResponseJson.date })
    globalDispatch({ type: 'SET_BUILDFILTERSACTIVE', payload: { Built: true } })
    globalDispatch({ type: 'SET_KEYSETSORT', payload: keysetSort })
    globalDispatch({ type: 'SET_KEYSETDESC', payload: false })
    globalDispatch({ type: 'SET_SWITCHESSORT', payload: switchesSort })
    globalDispatch({ type: 'SET_SWITCHESDESC', payload: false })
    globalDispatch({ type: 'SET_LOADING', payload: false })
  }, [globalDispatch])

  useEffect(() => {
    router.query.tab && setTab(parseInt(router.query.tab))
    getCollection({
      keyset_mount_status: router.query.tab === '1' && router.query.keyset_mount_status,
      switch_mount_status: router.query.tab === '2' && router.query.switch_mount_status
    })
  }, [getCollection, setTab])

  const handleSectionChange = (e, v) => {
    setTab(v)
  }

  return (
    <CollectionContainer>
      <Typography variant="h1">Keyboard Collection</Typography>
      <p>Below is my personal collection of computer keyboards (primarily in HHKB-inspired layouts) and accompanying keysets and switches. I stream my build process to <LinkBlank to={social.twitch}>Twitch</LinkBlank>.</p>
      <p><i>Last updated: {collectionUpdated} GMT</i></p>
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

export default withRouter(Collection)

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
