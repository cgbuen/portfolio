import { useContext, useEffect, useCallback } from 'react'
import Router from 'next/router'
import Context from 'store/context'
import classnames from 'classnames'
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
import Card from 'components/Card'
import { createOptimizedSrc } from 'helpers/imageService'

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default function Gear() {
  const { globalState, globalDispatch } = useContext(Context)
  const { gear, gearDescriptions } = globalState

  const getGear = useCallback(async () => {
    const gearResponse = await fetch(`/api/gear`)
    const gearResponseJson = await gearResponse.json()
    globalDispatch({ type: 'SET_GEAR', payload: gearResponseJson.gear })
    globalDispatch({ type: 'SET_GEARDESCRIPTIONS', payload: gearResponseJson.gearDescriptions })
  }, [globalDispatch])

  useEffect(() => {
    getGear()
  }, [getGear])

  const renderAccordion = (name, extras) => {
    return (
      <Accordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>{name}</StyledAccordionSummary>
        <AccordionDetails>
          <div>
            {(gearDescriptions.find(x => x.name === name) || { description: '' })
              .description
              .split('\n\n')
              .map(x => (<p key={x.id}>{x}</p>))
            }
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>Item</StyledTableHeaderCell>
                <StyledTableHeaderCell>Notes</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {gear
                  .filter(x => {
                    return x.active && (x.kind === name || (extras && extras.includes(x.kind)))
                  })
                  .map(x => (
                    <TableRow key={x.id}>
                      <TableCellItem>
                        <LinkBlank to={x.url}>{x.name}</LinkBlank>
                      </TableCellItem>
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
      <Typography variant="h1">Gear</Typography>
      <p>A list of gear that I recommend.</p>
      <div>
        {/*renderAccordion('Primary PC')*/}
        {/*renderAccordion('Streaming PC')*/}
        {/*renderAccordion('Development / Everyday Machine')*/}
        {/*renderAccordion('Displays')*/}
        {/*renderAccordion('Mice')*/}
        {/*renderAccordion('Desktop Audio')*/}
        {/*renderAccordion('Home Theater Audio')*/}
        {renderAccordion('Stream Video')}
        {renderAccordion('Stream Audio')}
        {renderAccordion('Lighting')}
        {renderAccordion('Soldering')}
        {/*renderAccordion('Film Photography')*/}
        {renderAccordion('Film Development')}
        {renderAccordion('Film Scanning')}
        {renderAccordion('Nintendo Switch')}
        {/*renderAccordion('Music')*/}
        {/*renderAccordion('Other')*/}
      </div>
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
  width: 45%;
`
const TableCellDescription = styled(TableCell)`
  width: 55%;
`

export function getStaticProps() {
  return {
    props: { name: 'Gear' }
  }
}
