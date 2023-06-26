import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#7230C7'
    },
    secondary: {
      main: '#C73800'
    },
    error: {
      main: red.A400
    }
  }
});

export default theme;
