import {
  red as error,
  indigo as primary,
} from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    primary,
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: error.A400,
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontSize: 15,
    fontFamily: "Ubuntu, Oxygen, Roboto, Helvetica, Arial, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default theme;
