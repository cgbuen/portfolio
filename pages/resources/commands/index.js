import { useContext, useEffect, useCallback } from 'react'
import Router from 'next/router'
import Context from 'store/context'
import classnames from 'classnames'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import LinkBlank from 'components/LinkBlank'
import Card from 'components/Card'
import { createOptimizedSrc } from 'helpers/imageService'

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default function Commands() {
  const { globalState, globalDispatch } = useContext(Context)
  const { commands } = globalState

  const getCommands = useCallback(async () => {
    const commandsResponse = await fetch(`/api/commands`)
    const commandsResponseJson = await commandsResponse.json()
    globalDispatch({ type: 'SET_COMMANDS', payload: commandsResponseJson })
  }, [globalDispatch])

  useEffect(() => {
    getCommands()
  }, [getCommands])

  const codifyCommands = (str) => {
    return (
      str.split(/(!.*?)(\W|$)/).map((x, i) => {
        if (x.startsWith('!')) {
          return <StyledCode key={i}>{x}</StyledCode>
        } else {
          return x
        }
      })
    )
  }

  const renderMainDescription = (x) => {
    if (x.href && x.command === 'chrissucks') {
      const separator = 'Many slight misspelling variants'
      const arr = x.description.split(separator)
      return (
        <p>
        {codifyCommands(arr[0])}{" "}
        <LinkBlank to={x.href}>{separator}</LinkBlank>{" "}
        {codifyCommands(arr[1])}
        </p>
      )
    } else if (x.href && x.command !== 'commands') {
      const arr = x.description.split('ink to')
      return (
        <p>
          <LinkBlank to={x.href}>{codifyCommands(arr[0])}ink</LinkBlank> to {codifyCommands(arr[1])}
        </p>
      )
    } else {
      return (<p>{codifyCommands(x.description)}</p>)
    }
  }

  const renderAliases = (x) => {
    const updatedAliases = x.aliases
      .split(', ')
      .map(y => {
        return `${y.includes('many others') ? '' : '!'}${y}`
      })
      .join(', ')
    return x.aliases && (
      <Aliases>
        <AliasesTitle>Alias{x.aliases.split(',').length === 1 ? '' : 'es'}:</AliasesTitle>{""}
        {codifyCommands(updatedAliases)}
      </Aliases>
    )
  }

  return (
    <>
      <Typography variant="h1">Commands</Typography>
      <p>A list of commands that can be used for my Twitch channel chat.</p>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Command</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {commands
              .sort((a, b) => a.command.localeCompare(b.command))
              .map(x => (
                <TableRow key={x.id}>
                  <TableCellCommand>
                    <StyledCode>!{x.command}</StyledCode>
                  </TableCellCommand>
                  <TableCellDescription>
                    {renderMainDescription(x)}
                    {renderAliases(x)}
                  </TableCellDescription>
                </TableRow>
              ))
            }
        </TableBody>
      </Table>
    </>
  )
}

const StyledCode = styled.code`
  background: rgba(128, 128, 128, .5);
  font-size: 14px;
  font-weight: bold;
  padding: 3px 6px 3px 5px;
`
const Aliases = styled.p`
  code {
    background: rgba(128, 128, 128, .2);
    color: rgba(255, 255, 255, .8);
    font-size: 13px;
  }
`
const AliasesTitle = styled.i`
  margin-right: 3px;
`
const TableCellCommand = styled(TableCell)`
  width: 20%;
  min-width: 180px;
  @media (max-width:430px) {
    min-width: 0;
    padding-left: 10px;
  }
`
const TableCellDescription = styled(TableCell)`
  width: 80%;
  @media (max-width:430px) {
    padding-left: 0;
    word-break: break-word;
  }
`

export function getStaticProps() {
  return {
    props: { name: 'Chatbot commands' }
  }
}
