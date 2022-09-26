import { createTheme } from '@mui/material/styles';
import COLORS from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
    info: {
      main: COLORS.GREY,
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 900,
      xl: 1200,
    },
  },
});

export default theme;