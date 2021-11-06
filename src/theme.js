import { createTheme } from '@mui/material/styles'
import '@fontsource/oxygen'

const colors = {
  primary: '#d4d4d4',
  secondary: '#000000',
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.primary,
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
          backgroundColor: '#0e0e10',
          borderBottom: 'solid 1px #333',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#0e0e10',
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
