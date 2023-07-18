import React, { Component } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'

const DialogClose = (props) => {
  return (
    <div>
      <StyledIconButton {...props}>
        <Close />
      </StyledIconButton>
    </div>
  )
}

const StyledIconButton = styled(IconButton)`
  color: white;
  padding: 0;
  .light-mode & {
    color: #151515;
  }
`

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  line-height: 1;
`
const DialogInnerTitleWrapper = styled.div``
const DialogInnerTitle = styled.span`
  font-weight: bold;
  vertical-align: middle;
`
const Expand = styled.span`
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  user-select: none;
  vertical-align: middle;
`
const Highlight = styled.span`
  color: #69c;
`
const DialogImgWrapper = styled.div`
  position: relative;
`
const ModalImg = styled.img`
  display: block;
  width: 100%;
`
const DescriptionBox = styled.div`
  background: rgba(64, 64, 64, 0.4);
  left: 15px;
  padding: 10px;
  position: absolute;
  text-shadow: 1px 1px 1px rgba(64, 64, 64, 0.4);
  top: 15px;
  @media (max-width:925px) {
    background: none;
    max-width: none;
    padding: 10px 0 0;
    position: static;
  }
`
const DescriptionColumnWrapper = styled.div`
  width: auto;
  @media (max-width:925px) {
    display: flex;
  }
  @media (max-width:630px) {
    display: block;
  }
`
const DescriptionColumn = styled.div`
  width: auto;
  @media (max-width:925px) {
    width: 50%;
  }
  @media (max-width:630px) {
    width: auto;
  }
`
const DescriptionDetail = styled.div`
  color: white;
  text-shadow: 1px 1px 1px rgba(64, 64, 64, 0.4);
`

export {
  DialogClose,
  StyledDialogTitle as DialogTitle,
  DialogInnerTitleWrapper,
  DialogInnerTitle,
  Expand,
  Highlight,
  DialogImgWrapper,
  ModalImg,
  DescriptionBox,
  DescriptionColumnWrapper,
  DescriptionColumn,
  DescriptionDetail,
}
