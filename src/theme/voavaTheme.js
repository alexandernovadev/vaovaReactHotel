import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const voavaTheme = createTheme({
  typography: {
    fontFamily: ['Niramit', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: "#00dec5",
      light: "#ffffff",
      dark: "#00a887",
      contrastText: "#000000",
    },
    secondary: {
      main: "#54595f",
      contrastText: "#fff",
    },
    error: {
      main: red.A400,
    },
  },
});
