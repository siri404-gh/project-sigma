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
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
  },
})

export default theme
