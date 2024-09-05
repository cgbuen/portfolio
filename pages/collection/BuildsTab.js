import { useContext, useEffect, useState, useCallback } from 'react'
import Context from 'store/context'
import styled from 'styled-components'
import classnames from 'classnames'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ListImg, DateDetail, StyledTableCell, StyledTableHeaderRow, StyledTableHeaderCell } from 'components/TableHelpers'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import LinkBlank from 'components/LinkBlank'
import GridSquare from './GridSquare'
import GridViewIcon from '@mui/icons-material/GridView'
import ListViewIcon from '@mui/icons-material/ViewList'
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp'
import InstagramIcon from '../../public/assets/instagram.svg'
import BuildIcon from '@mui/icons-material/Build'
import SoundIcon from '@mui/icons-material/VolumeUp'
import {
  DialogClose,
  DialogTitle,
  DialogInnerTitleWrapper,
  DialogInnerTitle,
  Expand,
  Highlight,
  DialogImgWrapper,
  ModalImg,
  DescriptionBox,
  DescriptionColumnWrapper,
  DescriptionColumn,
  DescriptionDetail,
} from 'components/DialogHelpers'
import { createOptimizedSrc } from 'helpers/imageService'

export default function Builds() {
  const [gridView, setGridView] = useState(true)
  const [openBuild, setOpenBuild] = useState({})
  const [variantVal, setVariantVal] = useState(0)
  const [buildDetailsOpen, setBuildDetailsOpen] = useState(false)
  const [dialogImg, setDialogImg] = useState('')

  const { globalState, globalDispatch } = useContext(Context)
  const { builds, buildFiltersActive } = globalState

  const openDialog = useCallback((build) => {
    if (!(build.src.includes('unavailable') || build.otw_link)) {
      let variantVal = 0
      if (build.assembly_variant !== 'A0') {
        const variants = builds.filter(y => y.board_id === build.board_id).sort((x, y) => x.id - y.id)
        variants.some((x, i) => {
          if (x.assembly_variant === build.assembly_variant) {
            variantVal = i
            return true
          }
        })
      }
      setOpenBuild(build)
      setVariantVal(variantVal)
      setBuildDetailsOpen(false)
      setDialogImg(build.src)
    }
  }, [builds])

  const closeDialog = useCallback(() => {
    setOpenBuild({})
    setVariantVal(0)
    setBuildDetailsOpen(false)
    setDialogImg('')
  }, [])

  const escListener = useCallback(e => {
    if (e.keyCode === 27) {
      return closeDialog()
    }
  }, [closeDialog])

  const determineNewerBuild = useCallback(() => {
    const activeBuilds = builds.filter(x => x.displayed && !x.src.includes('unavailable') && x.build_status !== 'On the way')
    const currentBuildIndex = activeBuilds.findIndex(x => x.id === openBuild.id)
    const toOpenIndex = (activeBuilds.length + currentBuildIndex - 1) % activeBuilds.length
    return activeBuilds[toOpenIndex]
  }, [builds, openBuild.id])

  const determineOlderBuild = useCallback(() => {
    const activeBuilds = builds.filter(x => x.displayed && !x.src.includes('unavailable') && x.build_status !== 'On the way')
    const currentBuildIndex = activeBuilds.findIndex(x => x.id === openBuild.id)
    const toOpenIndex = (activeBuilds.length + currentBuildIndex + 1) % activeBuilds.length
    return activeBuilds[toOpenIndex]
  }, [builds, openBuild.id])

  const arrowListener = useCallback(e => {
    window.removeEventListener('keyup', arrowListener)
    if (openBuild.id) {
      if (e.keyCode === 37) { // newer
        openDialog(determineNewerBuild())
      }
      if (e.keyCode === 39) { // older
        openDialog(determineOlderBuild())
      }
    }
  }, [determineNewerBuild, determineOlderBuild, openBuild.id, openDialog])

  useEffect(() => {
    window.removeEventListener('keyup', escListener)
    window.addEventListener('keyup', escListener)
  }, [escListener])
  useEffect(() => {
    window.addEventListener('keyup', arrowListener)
  }, [openBuild, arrowListener])

  const toggleFilteredBuilds = (val) => {
    const updatedBuilds = builds.map(x => {
      if (x.assembly_variant.includes('A') && x.build_status === val) {
        x.loaded = true
        x.displayed = !x.displayed
      }
      return x
    })
    globalDispatch({ type: 'SET_BUILDS', payload: updatedBuilds })
    const updatedBuildFiltersActive = {
      ...buildFiltersActive,
      [val]: !buildFiltersActive[val]
    }
    globalDispatch({ type: 'SET_BUILDFILTERSACTIVE', payload: updatedBuildFiltersActive })
  }

  const handleVariantChange = variants => {
    return (e, v) => {
      setVariantVal(v)
      setDialogImg(variants[v].src)
    }
  }

  const handleBuildDetailsOpen = (val) => {
    return () => {
      setBuildDetailsOpen(val)
    }
  }

  const handleViewClick = (val) => {
    return () => {
      setGridView(val)
    }
  }

  const showable = (x) => {
    return x && !x.includes('TBD') && !x.includes('?') && !x.includes('[planned]') && !x.includes('[prop]') && !x.includes('[stock]') && !x.includes('Stock') && !x.includes('N/A')
  }

  const buildLinks = (x, cheat) => {
    const links = []
    if (x.build_video) {
      links.push(
        <DescriptionLink to={x.build_video}>
          <BuildIcon className={"featureIcon"} />
          Build video
        </DescriptionLink>
      )
    }
    if (x.type_test) {
      links.push(
        <DescriptionLink to={x.type_test}>
          <SoundIcon className={"featureIcon"} />
          Type test
        </DescriptionLink>
      )
    }
    if (showable(x.instagram)) {
      links.push(
        <DescriptionLink to={x.instagram}>
          <InstagramIcon className={"featureIcon"} />
          Instagram post
        </DescriptionLink>
      )
    }
    return (
      <LinkContainer className={cheat ? 'linkContainerCheat' : ''}>
        {links.map((y, i) => (<div key={i}>{y}</div>))}
      </LinkContainer >
    )
  }

  const descriptionize = (x) => { // figure out what to do with classes
    if (!x === 'Built' || x.assembly_variant === 'A0') {
      return descriptionizeIndividual(x)
    } else {
      const variants = builds.filter(y => y.board_id === x.board_id).sort((x, y) => x.id - y.id)
      return (
        <>
          <Tabs
            classes={{
              root: 'buildTabsRoot',
              flexContainer: 'buildTabsFlexContainer',
            }}
            variant="fullWidth"
            onChange={handleVariantChange(variants)}
            value={variantVal}
          >
            {variants.map((y, i) => (
              <Tab
                classes={{
                  root: classnames({
                    buildTabRoot: true,
                    buildTabRootActive: i === variantVal,
                  }),
                  textColorInherit: 'buildTabTextColorInherit',
                  labelContainer: 'buildTabLabelContainer',
                  label: 'buildTabLabel',
                }}
                key={i}
                label={`Build ${i+1}`}
              />
            ))}
          </Tabs>
          <div>
            {variants.map((y, i) => i === variantVal && <div key={i}>{descriptionizeIndividual(y, { variant: true })}</div>)}
          </div>
        </>
      )
    }
  }

  const renderDetailKeycaps = (x) => {
    if (showable(x.keycaps)) {
      let val = `Current keyset: ${x.keycaps}`
      if (['(back)', '(none)'].includes(x.pictured)) {
        val += ` (not pictured)`
      } else if (showable(x.pictured) && x.keycaps !== x.pictured) {
        val += ` (pictured here with ${x.pictured})`
      }
      return <DescriptionDetail>{val}</DescriptionDetail>
    } else if (showable(x.pictured)) {
      return <DescriptionDetail>Pictured keyset: {x.pictured}</DescriptionDetail>
    }
  }

  const descriptionizeIndividual = (x, options={}) => {
    return (
      <DescriptionColumnWrapper>
        <DescriptionColumn>
          {options.variant && x.build_status !== 'Built' && <DescriptionDetail>(Unbuilt)</DescriptionDetail>}
          <DescriptionDetail>Purchased: {x.date_bought}</DescriptionDetail>
          {showable(x.date_built) && <DescriptionDetail>Built: {x.date_built} {showable(x.date_built_init) && x.date_built !== x.date_built_init ? `(initially ${x.date_built_init})` : ''}</DescriptionDetail>}
          <DescriptionDetail>Color: {x.color}</DescriptionDetail>
          {showable(x.layout) && !['60% HHKB 7u', '60% HHKB 6u'].includes(x.layout) && <DescriptionDetail>Layout: {x.layout}</DescriptionDetail>}
          {showable(x.mount) && <DescriptionDetail>Mounting Style: {x.mount} {showable(x.pcb_thickness) && x.pcb_thickness !== '1.6mm' ? `(${x.pcb_thickness} PCB)` : ''}</DescriptionDetail>}
        </DescriptionColumn>
        <DescriptionColumn>
          {showable(x.plate) && <DescriptionDetail>Plate: {x.plate}</DescriptionDetail>}
          {showable(x.stabilizers) && <DescriptionDetail>Stabilizers: {x.stabilizers}</DescriptionDetail>}
          {showable(x.switches) && <DescriptionDetail>Switches: {x.switches}</DescriptionDetail>}
          {renderDetailKeycaps(x)}
          {x.notes && (<DescriptionDetail>Notes: {x.notes}</DescriptionDetail>)}
          <LinkContainerWrapper>
            {buildLinks(x, false)}
            {buildLinks(x, true)}
          </LinkContainerWrapper>
        </DescriptionColumn>
      </DescriptionColumnWrapper>
    )
  }
  const renderFilter = ({ id, name }) => {
    return (
      <Filter className={buildFiltersActive[id] ? 'filterActive' : ''} key={id} onClick={() => toggleFilteredBuilds(id)}>
        <Icon>
          <IconUnchecked></IconUnchecked>
          <StyledCheckBoxSharpIcon />
        </Icon>
        <FilterText>{name} ({builds.filter(x => x.assembly_variant.includes('A') && x.build_status === id).length})</FilterText>
      </Filter>
    )
  }

  const determineDate = (x) => {
    if (x.build_status === 'Built') {
      return `Built ${x.date_built_latest}`
    } else {
      return `Purchased ${x.date_bought}`
    }
  }

  const renderGrid = (builds) => (
    <ContentContainer>
      {builds
        .map(x => {
          return x.loaded && (
            <GridSquare
              className={classnames(!x.displayed && 'hide', !(x.src.includes('unavailable') || x.otw_link) && 'clickable')}
              key={x.id}
              name={x.name}
              description={determineDate(x)}
              src={createOptimizedSrc(x.src, { quality: 80, width: 555 })}
              onClick={() => openDialog(x)}
            />
          )
        })
      }
      {builds.filter(x => x.displayed).length % 3 === 2 && (<PlaceholderBox></PlaceholderBox>)}
      {builds.filter(x => x.displayed).length % 3 === 1 && (<><PlaceholderBox></PlaceholderBox><PlaceholderBox></PlaceholderBox></>)}
      {builds.filter(x => x.displayed).length === 0 && <NoResults>Select a filter above to see results.</NoResults>}
    </ContentContainer>
  )

  const renderTable = (builds) => (
    <ContentContainer>
      {builds.filter(x => x.displayed).length === 0
        ? (<NoResults>Select a filter above to see results.</NoResults>)
        : (
            <Table>
              <TableHead>
                <StyledTableHeaderRow>
                  <TableCell></TableCell>
                  <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Type</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Builds</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Last built</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Plate</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Switches</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Keycaps</StyledTableHeaderCell>
                </StyledTableHeaderRow>
              </TableHead>
              <TableBody>
                {builds.map(x => x.loaded && (
                  <TableRow key={x.id} className={classnames(!x.displayed && 'hide', !(x.src.includes('unavailable') || x.otw_link) && 'clickable')} onClick={() => openDialog(x)}>
                    <TableCell>{<ListImg src={createOptimizedSrc(x.src, { quality: 90, width: 200 })} alt={x.name} width="100" height="66.49" />}</TableCell>
                    <TableCell>{x.name}</TableCell>
                    <StyledTableCell>{x.type}</StyledTableCell>
                    <StyledTableCell>{builds.filter(y => y.board_id === x.board_id).length}</StyledTableCell>
                    <TableCell><DateDetail>{x.date_built_latest}</DateDetail></TableCell>
                    <TableCell>{x.plate}</TableCell>
                    <TableCell>{x.switches}</TableCell>
                    <TableCell>{x.keycaps}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
      }
    </ContentContainer>
  )

  return (
    <>
      <TopSection>
        <FiltersWhole>
          <FiltersLabel>Filters: </FiltersLabel>
          <FiltersOnlyContainer>
            {
              ['Built', 'Unbuilt', 'On the way']
                .filter(x => builds.filter(y => y.build_status === x && y.assembly_variant.includes('A')).length > 0)
                .map(x => renderFilter({ id: x, name: x }))
            }
          </FiltersOnlyContainer>
        </FiltersWhole>
        <ViewOptions>
          <GridViewIcon className={gridView ? 'active' : ''} onClick={handleViewClick(true)} />
          <ListViewIcon className={gridView ? '' : 'active'} onClick={handleViewClick(false)} />
        </ViewOptions>
        <Results>{builds.filter(x => x.displayed).length} Results</Results>
      </TopSection>
      {gridView ? renderGrid(builds) : renderTable(builds)}
      <Dialog maxWidth="xl" open={!!openBuild.name}>
        <DialogTitle>
          {openBuild &&
            <DialogInnerTitleWrapper>
              <DialogInnerTitle>{openBuild.name}</DialogInnerTitle>
              <Expand onClick={handleBuildDetailsOpen(!buildDetailsOpen)}>
                <Highlight>[</Highlight>
                  {buildDetailsOpen ? <>&ndash; hide</> : '+ show'} build details
                <Highlight>]</Highlight>
              </Expand>
            </DialogInnerTitleWrapper>
          }
          <DialogClose onClick={() => closeDialog()} />
        </DialogTitle>
        <DialogContent>
          <DialogImgWrapper>
            <ModalImg alt={openBuild.name} src={dialogImg} width="1080" height="720" />
            {
              buildDetailsOpen && (
                <DescriptionBoxWithBuilds>
                  {descriptionize(openBuild)}
                </DescriptionBoxWithBuilds>
              )
            }
          </DialogImgWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

const TopSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  @media (max-width:568px) {
    display: block;
  }
`
const ViewOptions = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: end;
  padding: 5px 10px 15px 0;
  @media (max-width:925px) {
    display: none;
  }
  svg {
    cursor: pointer;
    opacity: 0.5;
    width: 24px;
    transition: opacity .2s ease;
    &:hover {
      opacity: .75;
    }
  }
  .active {
    opacity: 1;
    &:hover {
      opacity: 1;
    }
  }
`
const Results = styled.div`
  font-weight: bold;
  padding: 5px 0 15px;
  white-space: nowrap;
  @media (max-width:568px) {
    text-align: right;
  }
`
const FiltersWhole = styled.div`
  display: flex;
  margin-bottom: 10px;
`
const FiltersLabel = styled.div`
  display: inline-block;
  font-weight: bold;
  margin: 6px 15px 0 0;
`
const FiltersOnlyContainer = styled.div``
const IconUnchecked = styled.div`
  border: 3px solid white;
  display: block;
  height: 24px;
  width: 24px;
  .filterActive & {
    display: none;
  }
  .light-mode & {
    border-color: #151515;
  }
`
const StyledCheckBoxSharpIcon = styled(CheckBoxSharpIcon)`
  display: none;
  .filterActive & {
    background: white;
    display: block;
    fill: #69c;
    height: 24px;
    width: 24px;
  }
  .light-mode & {
    .filterActive & {
      background: #151515;
      fill: white;
    }
  }
`
const Filter = styled.div`
  background: #333;
  border-radius: 3px
  color: white;
  cursor: pointer;
  display: inline-block;
  flex: 1;
  font-weight: bold;
  margin: 0 15px 10px 0;
  padding: 5px 10px;
  .light-mode & {
    background: white;
  }
`
const Icon = styled.div`
  border-radius: 2px;
  display: inline-block;
  margin-right: 5px;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
`
const FilterText = styled.div`
  display: inline-block;
  vertical-align: middle;
`
const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -10px;
  @media (max-width:925px) {
    justify-content: center;
  }
`
const PlaceholderBox = styled.div`
  width: 300px;
`
const NoResults = styled.div`
  font-style: italic;
  margin: 10px;
`
const DescriptionBoxWithBuilds = styled(DescriptionBox)`
  .buildTabsRoot {
    min-height: 0;
  }
  .buildTabsFlexContainer {
    display: block;
  }
  .buildTabRoot {
    color: white;
    font-weight: bold;
    margin-right: 10px;
    min-height: 0;
    min-width: 0;
    padding: 0;
    text-transform: none;
  }
`
const DescriptionLink = styled(LinkBlank)`
  color: white;
  display: block;
  font-weight: bold;
  @media (max-width:925px) {
    color: #69c;
  }
  .featureIcon {
    fill: #69c;
    filter: drop-shadow(1px 1px 1px rgba(255, 255, 255, .6));
    display: inline-block;
    height: 16px;
    margin-right: 5px;
    vertical-align: middle;
    width: 16px;
    @media (max-width:925px) {
      filter: none;
    }
  }
`
const LinkContainerWrapper = styled.div`
  position: relative;
`
const LinkContainer = styled.div`
  text-shadow: 1px 1px 1px rgba(64, 64, 64, 0.4);
  ${DescriptionLink} {
    text-decoration: none;
  }
  @media (max-width:925px) {
    text-shadow: none;
  }
  &.linkContainerCheat {
    left: 0;
    position: absolute;
    text-shadow: none;
    top: 0;
    .featureIcon {
      visibility: hidden;
    }
    ${DescriptionLink} {
      color: transparent;
      text-decoration: underline;
      text-decoration-color: #69c;
      text-decoration-thickness: 2px;
      @media (max-width:925px) {
        text-decoration-thickness: 1px;
      }
    }
  }
`