import { useContext, useState, useEffect, useCallback } from 'react'
import Context from 'store/context'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Card from 'components/Card'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import {
  DialogClose,
  DialogTitle,
  DialogInnerTitleWrapper,
  DialogInnerTitle,
  DialogImgWrapper,
  ModalImg,
} from 'components/DialogHelpers'
import { createOptimizedSrc } from 'helpers/imageService'

export default function Projects() {
  const { globalState, globalDispatch } = useContext(Context)
  const { projects } = globalState
  const [modal, setModal] = useState({})

  const getProjects = useCallback(async () => {
    globalDispatch({ type: 'SET_LOADING', payload: true })
    const projectsResponse = await fetch(`/api/projects`)
    const projectsResponseJson = await projectsResponse.json()
    globalDispatch({ type: 'SET_PROJECTS', payload: projectsResponseJson })
    globalDispatch({ type: 'SET_LOADING', payload: false })
  }, [globalDispatch])

  const escListener = e => {
    if (e.keyCode === 27) {
      return closeDialog()
    }
  }

  const closeDialog = () => {
    setModal({})
  }

  useEffect(() => {
    window.removeEventListener('keyup', escListener)
    window.addEventListener('keyup', escListener)
  }, [escListener])

  useEffect(() => {
    getProjects()
  }, [getProjects])

  return (
    <>
      <Typography variant="h1">Software & Design Projects</Typography>
      <p>I work as a software engineer / architect for a living, solving fun problems on the web. These are the projects that I&rsquo;ve worked on.</p>
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
      <Dialog maxWidth="md" open={!!modal.name}>
        <DialogTitle>
          <DialogInnerTitleWrapper>
            <DialogInnerTitle>{modal.name}</DialogInnerTitle>
          </DialogInnerTitleWrapper>
          <DialogClose onClick={() => setModal({})} />
        </DialogTitle>
        <DialogContent>
          <DialogImgWrapper>
            <ModalImg alt={modal.name} src={modal.src && createOptimizedSrc(modal.src, { quality: 90 })} />
          </DialogImgWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function getStaticProps() {
  return {
    props: { name: 'Projects' }
  }
}
