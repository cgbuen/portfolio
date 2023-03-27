/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class MenuIcon extends PureComponent {
  static propTypes = {
    /**
     * Set to true when the menu is open, otherwise false
     */
    open: PropTypes.bool,

    /**
     * Set to `false` to hide the text "menu" underneath the button when the menu is closed.
     */
    label: PropTypes.bool
  }

  static defaultProps = {
    open: false,
    label: true
  }

  renderIcon = (open, label) => {
    return (
      <div
        className={classnames({
          root: true,
          active: open,
          withLabel: label
        })}
      >
        <div className="rsf-hamburger">
          <span className="rsf-hamburger-box">
            <span className="rsf-hamburger-inner" />
          </span>
        </div>
        {label && <div className={"label"}>menu</div>}
      </div>
    )
  }

  render() {
    const {
      open,
      label,
    } = this.props

    return (
      <MenuIconWrapper>
        {this.renderIcon(open, label)}
      </MenuIconWrapper>
    )
  }
}

const MenuIconWrapper = styled.div`
  .root {
    position: relative;
    height: 24px;
    width: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .rsf-hamburger {
      display: block;
      margin-top: 5px;
    }
    .rsf-hamburger-box {
      width: 20px;
      height: 20px;
      display: block;
      position: relative;
    }
    .rsf-hamburger-inner {
      display: block;
      top: 50%;
      margin-top: -4px;
    }
    .rsf-hamburger-inner, .rsf-hamburger-inner::before, .rsf-hamburger-inner::after {
      width: 20px;
      height: 2px;
      background-color: white;
      border-radius: 4px;
      position: absolute;
      transition-property: transform;
      transition-duration: .2s;
      transition-timing-function: ease;
    }
    .rsf-hamburger-inner::before, .rsf-hamburger-inner::after {
      content: '';
      display: block;
    }
    .rsf-hamburger-inner::before {
      top: -10px;
    }
    .rsf-hamburger-inner::after {
      bottom: -10px;
    }
    .rsf-hamburger .rsf-hamburger-inner {
      top: 5px;
    }
    .rsf-hamburger .rsf-hamburger-inner::before {
      top: 5px;
      transition-property: transform, opacity;
      transition-timing-function: ease;
      transition-duration: .2s
    }
    .rsf-hamburger .rsf-hamburger-inner::after {
      top: 10px;
    }
  }
  .active {
    .rsf-hamburger .rsf-hamburger-inner {
      transform: translate3d(0, 5px, 0) rotate(45deg);
    }
    .rsf-hamburger .rsf-hamburger-inner::before {
      transform: rotate(-45deg) translate3d(-5.71429px, -5px, 0);
      opacity: 0;
    }
    .rsf-hamburger .rsf-hamburger-inner::after {
      transform: translate3d(0, -10px, 0) rotate(-90deg);
    }
  }
  .withLabel {
    .rsf-hamburger {
      margin-top: 0;
    }
  }
  .label {
    font-size: 9px;
    line-height: 9px;
    font-weight: bold;
    letter-spacing: 0px;
    margin-top: -3px;
    color: white;
  }
`
