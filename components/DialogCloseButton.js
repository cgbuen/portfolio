import React, { Component } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'

export default class DialogCloseButton extends Component {
  render() {
    return (
      <StyledIconButton {...this.props}>
        <Close />
      </StyledIconButton>
    )
  }
}

const StyledIconButton = styled(IconButton)`
  color: white;
  padding: 0;
  position: absolute;
  top: 24px;
  right: 24px;
`
