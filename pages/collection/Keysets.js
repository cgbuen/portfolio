import { useContext, useState, useEffect } from 'react'
import Context from 'store/context'
import classnames from 'classnames'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogCloseButton from 'components/DialogCloseButton'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createOptimizedSrc } from 'helpers/imageService'

export default function Builds() {
  const [openKeyset, setOpenKeyset] = useState({})
  const [keysetDetailsOpen, setKeysetDetailsOpen] = useState(false)

  const { globalState, globalDispatch } = useContext(Context)
  const { keysets, keysetSort, keysetDesc } = globalState

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
    <>
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
        <DialogTitle disableTypography>
          {openKeyset &&
            <>
              <DialogInnerTitle>{openKeyset.keyset}</DialogInnerTitle>
              <Expand onClick={handleKeysetDetailsOpen(!keysetDetailsOpen)}>
                <Highlight>[</Highlight>
                  {keysetDetailsOpen ? <>&ndash; hide</> : '+ show'} keyset details
                <Highlight>]</Highlight>
              </Expand>
            </>
          }
          <DialogCloseButton onClick={() => closeDialog()} />
        </DialogTitle>
        <DialogContent>
          <DialogImgWrapper>
            <img alt={openKeyset.name} src={openKeyset && openKeyset.src && createOptimizedSrc(openKeyset.src, { quality: 90 })} width="1080" />
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
    </>
  )
}

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
const DialogInnerTitle = styled.span`
  font-weight: bold;
  vertical-align: middle;
`
const Expand = styled.span`
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  user-select: none;
  vertical-align: middle;
`
const Highlight = styled.span`
  color: #69c;
`
const DialogImgWrapper = styled.div`
  position: relative;
`
const DescriptionBox = styled.div`
  background: rgba(64, 64, 64, 0.4);
  left: 15px;
  padding: 10px;
  position: absolute;
  text-shadow: 1px 1px 1px rgba(64, 64, 64, 0.4);
  top: 15px;
  @media (max-width:925px) {
    background: none;
    max-width: none;
    padding: 10px 0 0;
    position: static;
  }
`
const DescriptionColumnWrapper = styled.div`
  width: auto;
  @media (max-width:925px) {
    display: flex;
  }
  @media (max-width:630px) {
    display: block;
  }
`
const DescriptionColumn = styled.div`
  width: auto;
  @media (max-width:925px) {
    width: 50%;
  }
  @media (max-width:630px) {
    width: auto;
  }
`
const DescriptionDetail = styled.div`
  text-shadow: 1px 1px 1px rgba(64, 64, 64, 0.4);
`
