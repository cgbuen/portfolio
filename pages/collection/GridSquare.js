import React, { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

export default class GridSquare extends Component {
  render() {
    const { classes, className, src, name, description, onClick } = this.props
    return (
      <CardWrapper className={className} onClick={onClick}>
        <Card>
          <CardBody>
            <CardFigure>
              <CardImg src={src} alt={name} width="250" height="166.66" />
            </CardFigure>
          </CardBody>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </Card>
      </CardWrapper>
    )
  }
}

const CardWrapper = styled.div`
  @media (max-width:630px) {
    text-align: center;
    width: 100%;
  }
`
const Card = styled.div`
  background: rgba(128, 128, 128, .15);
  box-shadow: 1px 1px 7px 0 rgba(32, 32, 32, .3);
  margin: 0 10px 10px;
  padding: 15px;
  text-align: center;
  transition: background .2s ease-in-out;
  &:hover {
    background: rgba(128, 128, 128, .35);
  }
  @media (max-width:630px) {
    display: inline-block;
  }
`
const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`
const CardBody = styled.div`
  display: flex;
  align-items: center;
  @media (max-width:630px) {
    display: block;
  }
`
const CardFigure = styled.div`
  margin-bottom: 5px;
  position: relative;
  width: 250px;
  @media (max-width:630px) {
    display: block;
    margin: 0 auto 5px;
  }
`
const CardImg = styled.img`
  display: block;
  height: auto;
  width: 100%;
`
const CardDescription = styled.div`
  font-size: 16px;
`
