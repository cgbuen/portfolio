import { useContext, useEffect, useCallback } from 'react'
import Context from 'store/context'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import LinkBlank from 'components/LinkBlank'

export default function Plates() {
  const { globalState, globalDispatch } = useContext(Context)
  const { plates } = globalState

  const getPlates = useCallback(async () => {
    globalDispatch({ type: 'SET_LOADING', payload: true })
    const platesResponse = await fetch(`/api/plates`)
    const platesResponseJson = await platesResponse.json()
    globalDispatch({ type: 'SET_PLATES', payload: platesResponseJson })
    globalDispatch({ type: 'SET_LOADING', payload: false })
  }, [globalDispatch])

  useEffect(() => {
    getPlates()
  }, [getPlates])

  const renderNotes = () => {
    return (
      <Accordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>Notes</StyledAccordionSummary>
        <AccordionDetails>
          <ul>
            <li>Each plate is for an HHKB-style layout, including: split right shift, split backspace, and blocked bottom corners (even for tray mount designs, so they&rsquo;ll be blocked solely by the plate themselves, not by any top case).</li>
            <li>Unless otherwise specified, plates will: have a 1u-1.5u-7u-1.5u-1u bottom row; use MX PCB-mount stabilizer cutouts; and exclude center- and spacebar-position screwholes (specifically for tray-mount plates).</li>
            <li>For MX, you&rsquo;ll want to get these cut in materials that are around 1.5mm thick. For Alps, it&rsquo;s recommended to cut these in materials between 1.0mm to 1.2mm thick (but I have personally gone down as low as 0.8mm and retaining backing layers).</li>
            <li>I use Ponoko to cut plates. They (as with any other service) won&rsquo;t necessarily provide every material in every thickness. These files are all in SVG format, which upload rather quickly to their application (compared to DXF).</li>
            <li>Generally, I&rsquo;ll use softer materials for higher kerf values (e.g. 0.2mm), and harder materials for lower values (e.g. 0.15mm), but your mileage may vary. I have only included one kerf variation for each plate.</li>
          </ul>
        </AccordionDetails>
      </Accordion>
    )
  }
  const renderTable = (name, extras) => {
    return (
      <Accordion defaultExpanded={true}>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>Plates</StyledAccordionSummary>
        <AccordionDetails>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>Plate</StyledTableHeaderCell>
                <StyledTableHeaderCell>Kerf</StyledTableHeaderCell>
                <StyledTableHeaderCell>Notes</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {plates
                  .map(x => (
                    <TableRow key={x.id}>
                      <TableCellItem>
                      {x.src.includes('n/a') ? x.name : (<LinkBlank to={x.src}>{x.name}</LinkBlank>)}
                      </TableCellItem>
                      <TableCellKerf>
                        {x.kerf}mm
                      </TableCellKerf>
                      <TableCellDescription>
                        {x.notes}
                      </TableCellDescription>
                    </TableRow>
                  ))
                }
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    )
  }
  return (
    <>
      <Typography variant="h1">Plates</Typography>
      <p>Below is a list of HHKB plate files that I have used for different keyboard build projects.</p>
      {renderNotes()}
      {renderTable()}
    </>
  )
}

const StyledAccordionSummary = styled(AccordionSummary)`
  font-weight: bold;
`
const StyledTableHeaderCell = styled(TableCell)`
  font-weight: bold;
`
const TableCellItem = styled(TableCell)`
  width: 25%;
`
const TableCellKerf = styled(TableCell)`
  width: 12.5%;
`
const TableCellDescription = styled(TableCell)`
  width: 62.5%;
`

export function getStaticProps() {
  return {
    props: { name: 'Plates' }
  }
}
