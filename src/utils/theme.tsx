import { createTheme } from '@material-ui/core/styles';
import { grey, deepPurple, amber } from '@material-ui/core/colors';
import COLORS from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY_BLUE,
    },
    secondary: {
      main: COLORS.SECONDARY_RED,
    },
    info: {
      main: COLORS.GREY,
    }
  },
});

theme.props = {
  MuiInputLabel: {
    shrink: true,
  },
};

theme.overrides = {
  MuiFormLabel: {
    root: {
      color: COLORS.GREY,
      marginTop: "1.5rem",
      marginBottom: "-.7rem",
    }
  },
  MuiInputLabel: {
    root: {
      marginTop: 0,
      marginBottom: 0,
    }
  }
  
};

export default theme;