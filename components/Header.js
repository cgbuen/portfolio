import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import styled from 'styled-components'
import AppBar from '@mui/material/AppBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import Drawer from '@mui/material/Drawer'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import MenuIcon from 'components/MenuIcon'

export default function Header() {
  const router = useRouter()
  const goTo = link => {
    return () => {
      Router.push(link)
    }
  }

  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = val => {
    return () => {
      setMenuOpen(val)
    }
  }

  const handleHeaderLogoClick = () => {
    goTo('/')()
    handleMenuClick(false)()
  }

  const items = [
    { name: 'Software', href: '/projects' },
    { name: 'Concerts', href: '/photography' },
    { name: 'Keyboards', href: '/collection' },
    { name: 'About', href: '/about' },
    { name: 'Commissions', href: '/commissions' },
    { name: 'Resources', href: '/resources' },
  ]
  return (
    <AppBarStyled
      position="static"
    >
      <AppBarInner>
        <AppBarInner2>
          {useMediaQuery(theme => theme.breakpoints.down('md')) ? (
            <div>
              <MenuIconOuter onClick={handleMenuClick(!menuOpen)}>
                <MenuIcon open={menuOpen} label={false} />
              </MenuIconOuter>
              <Drawer anchor={"left"} open={menuOpen} onClick={handleMenuClick(false)}>
                {
                  items.map((item, i) => (
                    <MenuItem
                      key={i}
                      onClick={goTo(item.href)}
                    >
                      {item.name}
                    </MenuItem>
                  ))
                }
              </Drawer>
            </div>
          ) : null}
          <HeaderLogoWrapper onClick={handleHeaderLogoClick}>
            <HeaderLogo>cgbuen</HeaderLogo>
          </HeaderLogoWrapper>
          {useMediaQuery(theme => theme.breakpoints.up('md')) ? (
            <NavTabs>
              {
                items.map((item, i) => (
                  <NavTab
                    key={i}
                    onClick={goTo(item.href)}
                    className={router.pathname.includes(item.href) ? 'selected' : ''}
                  >
                    {item.name}
                  </NavTab>
                ))
              }
            </NavTabs>
          ) : null}
        </AppBarInner2>
      </AppBarInner>
    </AppBarStyled>
  )
}

const AppBarStyled = styled(AppBar)`
  height: 64px;
  position: relative;
`
const AppBarInner = styled.div`
  background: #151515;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-color: rgba(255, 255, 255, .12);
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1310;
  .light-mode & {
    background: white;
  }
`
const AppBarInner2 = styled.div`
  justify-content: space-between;
  padding: 0 15px;
  max-width: 960px;
  box-sizing: border-box;
  flex: 1;
  height: 64px;
  min-height: 64px;
  display: flex;
  position: relative;
  align-items: center;
  color: white;
  @media (min-width:900px) and (max-width: 950px) {
    justify-content: center;
  }
`
const MenuIconOuter = styled.div`
  padding: 12px;
`
const HeaderLogoWrapper = styled.div`
  cursor: pointer;
  justify-content: left;
  margin-left: 0;
  margin-right: 10px;
  @media (max-width:899px) {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
`
const HeaderLogo = styled.div`
  color: white;
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
  position: relative;
  text-decoration: underline;
  text-decoration-color: #69c;
  top: -4px;
  .light-mode & {
    color: #151515;
  }
`

const NavTabs = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`
const NavTab = styled(Button)`
  align-items: center;
  background-color: transparent;
  border-radius: 0;
  color: white;
  cursor: pointer;
  display: flex;
  font-weight: bold;
  height: 64px;
  min-width: 135px;
  justify-content: center;
  text-transform: none;
  transition: .5s background-color ease-in-out;
  &.selected {
    background-color: #69c;
  }
  .light-mode & {
    color: #151515;
    &.selected {
      color: white;
    }
  }
  @media (max-width:951px) {
    min-width: 126px;
  }
`
