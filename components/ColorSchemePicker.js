import { useEffect, useState } from 'react'
import styled from 'styled-components'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ColorSchemePicker() {
  const [isLightMode, setIsLightMode] = useState(false)
  useEffect(() => {
    document.body.classList.toggle('light-mode', isLightMode)
    return () => document.body.classList.remove('light-mode')
  }, [isLightMode])

  const Icon = isLightMode ? DarkModeIcon : LightModeIcon
  return (
    <IconWrapper onClick={() => setIsLightMode(!isLightMode)}>
      <Icon />
    </IconWrapper>
  )
}

const IconWrapper = styled.div`
  background: rgba(128, 128, 128, .5);
  border-radius: 5px;
  bottom: 25px;
  cursor: pointer;
  left: 25px;
  padding: 10px;
  position: fixed;
  svg {
    display: block;
  }
`
