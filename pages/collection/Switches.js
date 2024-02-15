import { useContext, useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import Context from 'store/context'
import classnames from 'classnames'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createOptimizedSrc } from 'helpers/imageService'

const mountTypes = {
  IR: 'i-Rocks',
  AL: 'Alps',
  BS: 'Buckling spring',
  HE: 'Hall effect'
}

function Switches({ router }) {
  const { globalState, globalDispatch } = useContext(Context)
  const { switches, switchesSort, switchesDesc } = globalState
  const [readySortedOnce, setReadySortedOnce] = useState(false)

  const sortSwitches = sort => {
    if (switchesSort === sort && !(router.query.switch_mount_status === 'ready' && sort === 'mount_status' && !readySortedOnce)) {
      globalDispatch({ type: 'SET_SWITCHES', payload: switches.reverse() })
      globalDispatch({ type: 'SET_SWITCHESDESC', payload: !switchesDesc })
    } else {
      const sorted = switches.sort((x, y) => {
        if (x[sort] === '') {
          return 1
        }
        if (y[sort] === '') {
          return -1
        }
        return x[sort].localeCompare(y[sort])
      })
      globalDispatch({ type: 'SET_SWITCHES', payload: sorted })
      globalDispatch({ type: 'SET_SWITCHESSORT', payload: sort })
      globalDispatch({ type: 'SET_SWITCHESDESC', payload: true })
      setReadySortedOnce(true)
    }
  }

  const renderSortCell = (sortField, displayName) => {
    return (
      <TableCell className={classnames({
          sorted: switchesSort === sortField,
          reversed: !switchesDesc,
      })} onClick={() => sortSwitches(sortField)}>
        <HeaderText>{displayName}</HeaderText>
      </TableCell>
    )
  }

  return (
    <StyledPaper>
      <Table>
        <TableHead>
          <StyledTableHeaderRow>
            {renderSortCell('name', 'Name')}
            {renderSortCell('purchase_date', 'Purchased')}
            {renderSortCell('mount', 'Mount')}
            {renderSortCell('switch_type', 'Type')}
            {renderSortCell('mount_status', 'Status')}
            {renderSortCell('keyboard', 'Keyboard')}
            {renderSortCell('weight_springs', 'Weight')}
          </StyledTableHeaderRow>
        </TableHead>
        <TableBody>
          {switches.map(x => (
            <TableRow key={x.id}>
              <TableCell>{x.name}</TableCell>
              <TableCell><DateDetail>{x.purchase_date}</DateDetail></TableCell>
              <TableCell>{mountTypes[x.mount] || x.mount}</TableCell>
              <TableCell>{x.switch_type}</TableCell>
              <TableCell>{x.mount_status}</TableCell>
              <TableCell>{x.keyboard}</TableCell>
              <TableCell>{!['springswap', 'alps', 'matias', 'halleffect', 'buckling'].includes(x.weight_springs) && x.weight_springs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  )
}

export default withRouter(Switches)

const StyledPaper = styled(Paper)`
  background: #151515;
  box-shadow: none;
  overflow-x: auto;
  padding: 0 10px;
  margin: 0 10px;
  .light-mode & {
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
const DateDetail = styled.span`
  white-space: nowrap;
`
