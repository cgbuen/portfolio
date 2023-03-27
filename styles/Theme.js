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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#151515',
          color: 'white',
          marginTop: 65,
          width: 330,
        },
        root: {
          '& .MuiMenuItem-root': {
            fontSize: 18,
            fontWeight: 'bold',
            padding: 21,
          },
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: 'rgba(128, 128, 128, .2)',
          color: 'white',
          '& .MuiSvgIcon-root': {
            fill: 'white'
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
  },
})

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
