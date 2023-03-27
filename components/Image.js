import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import Person from '@mui/icons-material/Person'
import Typography from '@mui/material/Typography'

const Image = ({
  index,
  photo,
  top,
  left,
  margin,
  direction,
  descriptionVisible,
  isMobile,
  classes,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleOnClick = e => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  useEffect(() => {
    setIsDescriptionVisible(isDescriptionVisible);
  }, [descriptionVisible, isDescriptionVisible]);

  const cleanPhoto = {
    alt: photo.alt,
    src: photo.src,
    height: photo.height,
    width: photo.width,
  }

  const style = direction === 'row' ? { margin } : {
    margin,
    height: photo.height,
    width: photo.width,
    position: 'absolute',
    top,
    left,
  }
  return (
    <ImageWrapper key={index} onClick={isMobile ? handleOnClick : undefined} style={style}>
      <ItemWrapper>
        <ImgEl
          key={index}
          alt={""}
          loading={"lazy"}
          {...cleanPhoto}
        />
        {isMobile ? <StyledPersonIcon /> : ''}
      </ItemWrapper>
      <Description>
        <DescriptionInner className={isDescriptionVisible ? 'descriptionVisible' : ''}>
          <DescriptionLine variant="subtitle1">{photo.alt1}</DescriptionLine>
          <DescriptionLine variant="subtitle1">{photo.alt2}</DescriptionLine>
        </DescriptionInner>
      </Description>
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div`
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0)
`
const ImgEl = styled.img`
  display: block;
  user-drag: none;
`
const ItemWrapper = styled.div`
  position: relative;
`
const StyledPersonIcon = styled(Person)`
  fill: white;
  position: absolute;
  left: 10px;
  bottom: 10px;
  background: rgba(17, 17, 17, .85);
  border-radius: 50%;
  padding: 5px;
  width: 24px;
  height: 24px;
`
const Description = styled.div`
  bottom: 10px;
  pointer-events: none;
  position: absolute;
  text-align: center;
  width: 100%;
`
const DescriptionInner = styled.div`
  background: rgba(17, 17, 17, .85);
  border-radius: 5px;
  display: inline-block;
  max-width: 90%;
  opacity: 0;
  padding: 10px;
  text-align: center;
  transition: opacity .3s ease-in-out;
  &.descriptionVisible {
    opacity: 1;
  }
`
const DescriptionLine = styled(Typography)`
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
`

export default Image
