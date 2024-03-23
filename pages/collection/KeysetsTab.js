import { useContext, useEffect, useState, useCallback } from 'react'
import Context from 'store/context'
import classnames from 'classnames'
import styled from 'styled-components'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { StyledTableCell, ListImg, HeaderText, DateDetail, StyledPaper, StyledTableHeaderRow } from 'components/TableHelpers'
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

  const openDialog = useCallback((keyset) => {
    if (!keyset.src.includes('unavailable')) {
      setOpenKeyset(keyset)
    }
  }, [])

  const closeDialog = useCallback(() => {
    setOpenKeyset({})
    setKeysetDetailsOpen(false)
  }, [])

  const escListener = useCallback(e => {
    if (e.keyCode === 27) {
      return closeDialog()
    }
  }, [closeDialog])

  const determineNewerKeyset = useCallback(() => {
    const activeKeysets = keysets.filter(x => x.mount_status != 'On the way' && !x.src.includes('unavailable'))
    const currentKeysetIndex = activeKeysets.findIndex(x => x.id === openKeyset.id)
    const toOpenIndex = (activeKeysets.length + currentKeysetIndex - 1) % activeKeysets.length
    return activeKeysets[toOpenIndex]
  }, [keysets, openKeyset.id])

  const determineOlderKeyset = useCallback(() => {
    const activeKeysets = keysets.filter(x => x.mount_status != 'On the way' && !x.src.includes('unavailable'))
    const currentKeysetIndex = activeKeysets.findIndex(x => x.id === openKeyset.id)
    const toOpenIndex = (activeKeysets.length + currentKeysetIndex + 1) % activeKeysets.length
    return activeKeysets[toOpenIndex]
  }, [keysets, openKeyset.id])

  const arrowListener = useCallback(e => {
    window.removeEventListener('keyup', arrowListener)
    if (openKeyset.id) {
      if (e.keyCode === 37) { // newer
        openDialog(determineNewerKeyset())
      }
      if (e.keyCode === 39) { // older
        openDialog(determineOlderKeyset())
      }
    }
  }, [determineNewerKeyset, determineOlderKeyset, openKeyset.id, openDialog])

  useEffect(() => {
    window.removeEventListener('keyup', escListener)
    window.addEventListener('keyup', escListener)
  }, [escListener])

  useEffect(() => {
    window.addEventListener('keyup', arrowListener)
  }, [openKeyset, arrowListener])

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

  const renderSortCell = (sortField, displayName1, displayName2) => {
    return (
      <TableCell className={classnames({
          sorted: keysetSort === sortField,
          reversed: !keysetDesc,
      })} onClick={() => sortKeysets(sortField)}>
        <HeaderText>{displayName1}</HeaderText>
        {displayName2 && <><br /><HeaderText>{displayName2}</HeaderText></>}
      </TableCell>
    )
  }

  const handleKeysetDetailsOpen = (val) => {
    return () => {
      setKeysetDetailsOpen(val)
    }
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

  const legendQuality = [, 'Low', 'Acceptable', 'High']

  return (
    <StyledPaper>
      <Table>
        <TableHead>
          <StyledTableHeaderRow>
            <TableCell></TableCell>
            {renderSortCell('keyset', 'Name')}
            {renderSortCell('purchase_date', 'Date')}
            {renderSortCell('mount', 'Type')}
            {renderSortCell('category', 'Category')}
            {renderSortCell('mount_status', 'Status')}
            {renderSortCell('keyboard', 'Keyboard')}
            {renderSortCell('s_accuracy', 'Legend', 'Quality')}
          </StyledTableHeaderRow>
        </TableHead>
        <TableBody>
          {keysets.map(x => (
            <TableRow key={x.id} className={x.src.includes('unavailable') ? '' : 'clickable'} onClick={() => openDialog(x)}>
              <TableCell>{<ListImg src={createOptimizedSrc(x.src, { quality: 90, width: 200 })} alt={x.keyset} width="100" />}</TableCell>
              <TableCell>{x.keyset}</TableCell>
              <TableCell><DateDetail>{x.purchase_date}</DateDetail></TableCell>
              <StyledTableCell>{x.mount}</StyledTableCell>
              <TableCell>{x.category}</TableCell>
              <TableCell>{x.mount_status}</TableCell>
              <TableCell>{x.keyboard}</TableCell>
              <TableCell>{legendQuality[x.lq]}</TableCell>
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
