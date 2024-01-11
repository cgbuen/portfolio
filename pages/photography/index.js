import { useContext, useState, useEffect, useCallback } from 'react'
import Context from 'store/context'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import Gallery from 'components/react-photo-gallery/Gallery'
import Image from 'components/Image'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

export default function Photography() {
  const { globalState, globalDispatch } = useContext(Context)
  const { photos } = globalState
  const [isLandscape, setIsLandscape] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [index, setIndex] = useState(-1)

  const getPhotos = useCallback(async () => {
    globalDispatch({ type: 'SET_LOADING', payload: true })
    const photographyResponse = await fetch(`/api/photography`)
    const photographyResponseJson = await photographyResponse.json()
    globalDispatch({ type: 'SET_PHOTOS', payload: photographyResponseJson })
    globalDispatch({ type: 'SET_LOADING', payload: false })
  }, [globalDispatch])

  useEffect(() => {
    getPhotos()
    updateWindowDimensions()
    window.addEventListener('resize', updateWindowDimensions)
  }, [getPhotos])

  const updateWindowDimensions = () => {
    setIsLandscape(window.innerWidth > window.innerHeight)
    setIsMobile(window.innerWidth < 645)
  }

  const columnsATF = (containerWidth) => {
    let columns = 1;
    if (containerWidth >= 645) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
  }

  const columnsBTF = (containerWidth) => {
    let columns = 1;
    if (containerWidth >= 600) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
  }

  const imageRenderer = () => {
    return function renderer({ index, photo, direction, top, left, key }) {
      return (
        <Image
          key={key}
          index={index}
          photo={photo}
          alt={photo.alt}
          direction={direction}
          top={top}
          left={left}
          margin={2}
          descriptionVisible={false}
          isMobile={isMobile}
        />
      )
    }
  }

  const handleClick = (event, { index }) => {
    setIndex(index)
  }

  const Page = (
    <>
      <Typography variant="h1">Concert Photography</Typography>
      <p>Here are a few live music events that I&rsquo;m lucky to have shot. Click each image for more info.</p>
      <Gallery
        photos={photos.slice(0, 2)}
        direction={isMobile ? "column" : "row"}
        columns={columnsATF}
        onClick={handleClick}
        renderImage={isMobile ? imageRenderer() : undefined}
      />
      <Gallery
        photos={photos.slice(2, 7)}
        direction={isMobile ? "column" : "row"}
        columns={columnsATF}
        onClick={handleClick}
        renderImage={isMobile ? imageRenderer() : undefined}
      />
      <Gallery
        photos={photos.slice(7)}
        direction={"column"}
        columns={columnsBTF}
        onClick={handleClick}
        renderImage={isMobile ? imageRenderer() : undefined}
      />
    </>
  )

  return (
    <>
      {Page}
      {!isMobile &&
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={
            photos.map(photo => {
              photo.srcSet = [
                { src: photo.src, width: photo.origWidth, height: photo.origHeight }
              ]
              return photo
            })
          }
          animation={{ swipe: 250 }}
          plugins={[Captions]}
        />
      }
    </>
  )
}

const StyledIconButton = styled(IconButton)`
  color: white;
  position: absolute;
  top: 0;
  right: 0;
`

const ModalImg = styled.img`
  width: 100%;
`

export function getStaticProps() {
  return {
    props: { name: 'Photography' }
  }
}
