import { useContext, useState, useEffect } from 'react'
import Context from 'store/context'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Card from 'components/Card'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogCloseButton from 'components/DialogCloseButton'
import { createOptimizedSrc } from 'helpers/imageService'

export default function Projects() {
  useEffect(() => {
    getProjects()
  }, [])

  const [modal, setModal] = useState({})

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
            className={"clickable"}
            name={x.name}
            src={createOptimizedSrc(x.src, { quality: 80, width: 570 })}
            description={x.description}
            onClick={() => setModal(x)}
          />
        ))}
      </div>
      <Dialog maxWidth="md" open={modal.name}>
        <DialogTitle>
          <Typography variant="h1" component="h6">{modal.name}</Typography>
          <DialogCloseButton onClick={() => setModal({})} />
        </DialogTitle>
        <DialogContent>
          <ModalImg alt={modal.name} src={createOptimizedSrc(modal.src, { quality: 90 })} />
        </DialogContent>
      </Dialog>
    </>
  )
}

const ModalImg = styled.img`
  width: 100%;
`
