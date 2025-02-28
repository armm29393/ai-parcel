import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "Kanit",
  },
  palette: {
    primary: {
      main: "#AC1754",
    },
    secondary: {
      main: "#003566",
    },
    error: {
      main: red.A400,
    },
  },
  overrides: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Kanit",
        },
      },
    },
  },
});

export default theme;
