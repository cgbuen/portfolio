import styled from 'styled-components'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'

export const StyledPaper = styled(Paper)`
  background: #151515;
  box-shadow: none;
  overflow-x: auto;
  padding: 0 10px;
  margin: 0 10px;
  .light-mode & {
    background: white;
  }
`

export const StyledTableHeaderRow = styled(TableRow)`
  height: auto;
  th {
    line-height: 1.4;
    padding-top: 0;
    padding-bottom: 12px;
    vertical-align: bottom;
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

export const ListImg = styled.img`
  display: block;
  height: auto;
  width: 100px;
`
export const DateDetail = styled.span`
  white-space: nowrap;
`
export const StyledTableHeaderCell = styled(TableCell)`
  font-weight: bold;
  vertical-align: middle;
`
export const StyledTableCell = styled(TableCell)`
  text-align: center;
`
export const HeaderText = styled.span`
  cursor: pointer;
  font-weight: bold;
  vertical-align: middle;
`