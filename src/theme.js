import { createTheme } from '@mui/material/styles'
import '@fontsource/oxygen'

const colors = {
  primary: '#d4d4d4',
  secondary: '#000000',
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.secondary,
    },
  },
  typography: {
    fontFamily: 'Oxygen, Arsenal, Ubuntu, Roboto sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0e0e0e',
          borderBottom: 'solid 1px #333',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          minHeight: 64,
          maxHeight: 64,
          boxSizing: 'content-box',
          backgroundColor: '#0e0e0e',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          padding: 11,
        },
        label: {
          color: '#e4e4e4',
          fontSize: 12,
          '&.Mui-selected': {
            fontSize: 12,
          },
        },
      },
    },
  },
})

export default theme
