import React, { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

export default class Card extends Component {
  render() {
    const { classes={}, className, src, name, description, onClick, right } = this.props
    return (
      <CardWrapper className={className || ''} onClick={onClick}>
        <CardBody className={right ? 'right' : ''}>
          {!right && <img className={classnames('cardImgFigure', classes.cardImg)} src={src} alt={name} />}
          <CardHeaderWrapper>
            <CardTitle className={classes.cardTitle}>{name}</CardTitle>
            <CardDescription className={classes.cardDescription}>{description}</CardDescription>
          </CardHeaderWrapper>
          {right && <img className={'cardImgFigure', 'right', classes.cardImg} src={src} alt={name} />}
        </CardBody>
      </CardWrapper>
    )
  }
}

const CardWrapper = styled.div`
  background: rgba(128, 128, 128, .15);
  box-shadow: 1px 1px 7px 0 rgba(32, 32, 32, .3);
  margin-bottom: 20px;
  padding: 20px;
  transition: background .2s ease-in-out;
  &:hover {
    background: rgba(128, 128, 128, .35);
  }
`

const CardBody = styled.div`
  align-items: center;
  display: flex;
  @media (max-width:568px) {
    display: 'block'
  }
  &.right, .right {
    margin: 0 0 0 15px;
    @media (max-width:568px) {
      margin: 15px 0 0 0;
    }
  }
  .cardImgFigure {
    display: block;
    margin: 0 15px 0 0;
    visibility: visible;
    width: 250px;
    @media (max-width:568px) {
      display: block;
      margin: 0 0 15px 0;
      width: 100%;
    },
  }
`

const CardHeaderWrapper = styled.div``

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const CardDescription = styled.div`
  visibility: visible;
`
