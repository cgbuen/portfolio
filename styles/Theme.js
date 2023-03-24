import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    color: 'white',
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
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          zIndex: 1310,
        },
        paper: {
          background: '#151515',
          color: 'white',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#69c',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'white'
        },
      },
    },
  },
})

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
