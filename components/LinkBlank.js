import React, { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

export default class LinkBlank extends Component {
  render() {
    const { className, to, onClick, children } = this.props
    return (
      <Link className={className} href={to} onClick={onClick} target="_blank" rel="noopener noreferrer">{children}</Link>
    )
  }
}

const Link = styled.a`
  color: #69c;
  font-weight: bold;
  text-decoration: underline;
`
