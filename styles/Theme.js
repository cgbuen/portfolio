import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: 'ff-meta-web-pro',
    h1: {
      fontWeight: 700,
      fontSize: 24,
      margin: '15px 0',
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background: 'transparent',
        }
      },
    },
  },
})

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
