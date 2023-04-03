import { useContext, useEffect, useState } from 'react'
import Context from 'store/context'
import classnames from 'classnames'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

export default function Keysets() {
  const [openKeyset, setOpenKeyset] = useState({})
  const [keysetDetailsOpen, setKeysetDetailsOpen] = useState(false)

  const { globalState, globalDispatch } = useContext(Context)
  const { keysets, keysetSort, keysetDesc } = globalState

  const escListener = e => {
    if (e.keyCode === 27) {
      return closeDialog()
    }
  }

  const arrowListener = e => {
    window.removeEventListener('keyup', arrowListener)
    if (openKeyset.id) {
      if (e.keyCode === 37) { // newer
        openDialog(determineNewerKeyset())
      }
      if (e.keyCode === 39) { // older
        openDialog(determineOlderKeyset())
      }
    }
  }

  useEffect(() => {
    window.removeEventListener('keyup', escListener)
    window.addEventListener('keyup', escListener)
  }, [])
  useEffect(() => {
    window.addEventListener('keyup', arrowListener)
  }, [openKeyset])

  const determineNewerKeyset = () => {
    const activeKeysets = keysets.filter(x => x.mount_status != 'On the way' && !x.src.includes('unavailable'))
    const currentKeysetIndex = activeKeysets.findIndex(x => x.id === openKeyset.id)
    const toOpenIndex = (activeKeysets.length + currentKeysetIndex - 1) % activeKeysets.length
    return activeKeysets[toOpenIndex]
  }

  const determineOlderKeyset = () => {
    const activeKeysets = keysets.filter(x => x.mount_status != 'On the way' && !x.src.includes('unavailable'))
    const currentKeysetIndex = activeKeysets.findIndex(x => x.id === openKeyset.id)
    const toOpenIndex = (activeKeysets.length + currentKeysetIndex + 1) % activeKeysets.length
    return activeKeysets[toOpenIndex]
  }

  const sortKeysets = sort => {
    if (keysetSort === sort) {
      globalDispatch({ type: 'SET_KEYSETS', payload: keysets.reverse() })
      globalDispatch({ type: 'SET_KEYSETDESC', payload: !keysetDesc })
    } else {
      const sorted = keysets.sort((x, y) => {
        if (x[sort] === '') {
          return 1
        }
        if (y[sort] === '') {
          return -1
        }
        return x[sort].localeCompare(y[sort])
      })
      globalDispatch({ type: 'SET_KEYSETS', payload: sorted })
      globalDispatch({ type: 'SET_KEYSETSORT', payload: sort })
      globalDispatch({ type: 'SET_KEYSETDESC', payload: true })
    }
  }

  const renderSortCell = (sortField, displayName) => {
    return (
      <TableCell className={classnames({
          sorted: keysetSort === sortField,
          reversed: !keysetDesc,
      })} onClick={() => sortKeysets(sortField)}>
        <HeaderText>{displayName}</HeaderText>
      </TableCell>
    )
  }

  const handleKeysetDetailsOpen = (val) => {
    return () => {
      setKeysetDetailsOpen(val)
    }
  }

  const openDialog = (keyset) => {
    if (!keyset.src.includes('unavailable')) {
      setOpenKeyset(keyset)
    }
  }

  const closeDialog = () => {
    setOpenKeyset({})
    setKeysetDetailsOpen(false)
  }

  const renderDetailKeyboard = (x) => {
    if (x.keyboard) {
      let val = `Current keyboard: ${x.keyboard}`
      if (x.pictured && x.keyboard !== x.pictured) {
        val += ` (pictured here on: ${x.pictured})`
      }
      return <DescriptionDetail>{val}</DescriptionDetail>
    } else if (x.pictured) {
      return <DescriptionDetail>Pictured on: {x.pictured}</DescriptionDetail>
    }
  }

  const descriptionize = (x) => {
    return (
      <DescriptionColumnWrapper>
        <DescriptionColumn>
          <DescriptionDetail>Purchased: {x.purchase_date} ({x.purchase_status})</DescriptionDetail>
          <DescriptionDetail>Mount: {x.mount}</DescriptionDetail>
          <DescriptionDetail>Color: {x.color}</DescriptionDetail>
          <DescriptionDetail>Status: {x.mount_status}</DescriptionDetail>
          <DescriptionDetail>HHKB?: {x.tkl_only ? 'No' : 'Yes'}</DescriptionDetail>
          {renderDetailKeyboard(x)}
          {x.notes && <DescriptionDetail>Notes: {x.notes}</DescriptionDetail>}
        </DescriptionColumn>
      </DescriptionColumnWrapper>
    )
  }

  return (
    <StyledPaper>
      <Table>
        <TableHead>
          <StyledTableHeaderRow>
            <TableCell></TableCell>
            {renderSortCell('keyset', 'Name')}
            {renderSortCell('purchase_date', 'Purchased')}
            {renderSortCell('mount', 'Mount')}
            {renderSortCell('category', 'Category')}
            {renderSortCell('mount_status', 'Status')}
            {renderSortCell('keyboard', 'Keyboard')}
          </StyledTableHeaderRow>
        </TableHead>
        <TableBody>
          {keysets.map(x => (
            <TableRow key={x.id} className={x.src.includes('unavailable') ? '' : 'clickable'} onClick={() => openDialog(x)}>
              <TableCell>{<KeysetImg src={createOptimizedSrc(x.src, { quality: 90, width: 200 })} alt={x.keyset} width="100" />}</TableCell>
              <TableCell>{x.keyset}</TableCell>
              <TableCell><DateDetail>{x.purchase_date}</DateDetail></TableCell>
              <TableCell>{x.mount}</TableCell>
              <TableCell>{x.category}</TableCell>
              <TableCell>{x.mount_status}</TableCell>
              <TableCell>{x.keyboard}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog maxWidth="xl" open={!!openKeyset.keyset}>
        <DialogTitle>
          {openKeyset &&
            <DialogInnerTitleWrapper>
              <DialogInnerTitle>{openKeyset.keyset}</DialogInnerTitle>
              <Expand onClick={handleKeysetDetailsOpen(!keysetDetailsOpen)}>
                <Highlight>[</Highlight>
                  {keysetDetailsOpen ? <>&ndash; hide</> : '+ show'} keyset details
                <Highlight>]</Highlight>
              </Expand>
            </DialogInnerTitleWrapper>
          }
          <DialogClose onClick={() => closeDialog()} />
        </DialogTitle>
        <DialogContent>
          <DialogImgWrapper>
            <ModalImg alt={openKeyset.name} src={openKeyset && openKeyset.src && createOptimizedSrc(openKeyset.src, { quality: 90 })} width="1080" />
            {
              keysetDetailsOpen && (
                <DescriptionBox>
                  {descriptionize(openKeyset)}
                </DescriptionBox>
              )
            }
          </DialogImgWrapper>
        </DialogContent>
      </Dialog>
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)`
  background: #151515;
  box-shadow: none;
  overflow-x: auto;
  padding: 0 10px;
  margin: 0 10px;
  @media (prefers-color-scheme: light) {
    background: white;
  }
`
const StyledTableHeaderRow = styled(TableRow)`
  height: auto;
  th {
    padding-top: 0;
    padding-bottom: 12px;
    white-space: nowrap;
  }
  .sorted {
    &:after {
      content: '';
      width: 0;
      height: 0;
      display: inline-block;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid white;
      margin-left: 5px;
    }
  }
  .reversed {
    &:after {
      border-bottom: 5px solid white;
      border-top: 0;
    }
  }
`
const HeaderText = styled.span`
  cursor: pointer;
  font-weight: bold;
  vertical-align: middle;
`
const KeysetImg = styled.img`
  display: block;
  width: 100px;
`
const DateDetail = styled.span`
  white-space: nowrap;
`
