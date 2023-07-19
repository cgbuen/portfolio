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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#151515',
        },
        '#__next': {
          display: 'none'
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background: 'transparent',
          boxShadow: 'none',
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
          '.light-mode &': {
            background: 'white',
            color: '#151515'
          },
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
          color: 'white',
          '.light-mode &': {
            color: '#151515',
            borderBottomColor: 'rgba(212, 212, 212, 1)'
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: 'rgba(128, 128, 128, .2)',
          boxShadow: 'none',
          color: 'white',
          '.light-mode &': {
            color: '#151515'
          },
          '& .MuiSvgIcon-root': {
            fill: 'white',
            '.light-mode &': {
              fill: '#151515'
            },
          },
          '&.Mui-expanded': {
            margin: 0,
            '&:before': {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          height: 'inherit',
          transition: 'none',
          width: 'inherit',
        }
      },
    },
  },
})

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
