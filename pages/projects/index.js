import { useContext, useEffect } from 'react'
import Router from 'next/router'
import Context from 'store/context'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Card from 'components/Card'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const createOptimizedSrc = x => x

export default function Projects() {
  useEffect(() => {
    getProjects()
  }, [])

  const openDialog = x => {
  }

  const getProjects = async () => {
    const projectsResponse = await fetch(`/api/projects`)
    const projectsResponseJson = await projectsResponse.json()
    globalDispatch({ type: 'SET_PROJECTS', payload: projectsResponseJson })
  }

  const { globalState, globalDispatch } = useContext(Context)
  const { projects } = globalState

  return (
    <>
      <Typography variant="h1">Software & Design Projects</Typography>
      <p>I work as a software engineer / architect for a living, solving fun problems on the web. These are the projects that I've worked on.</p>
      <div>
        {projects.map(x => (
          <Card
            key={x.id}
            name={x.name}
            src={createOptimizedSrc(x.src, { width: 570 })}
            description={x.description}
            onClick={() => openDialog(x)}
          />
        ))}
      </div>
    </>
  )
}

