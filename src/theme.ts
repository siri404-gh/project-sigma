import { createTheme } from '@mui/material/styles'
import '@fontsource/oxygen'

const colors = {
  primary: '#000000',
  secondary: '#ffffff',
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
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
  },
})

export default theme
