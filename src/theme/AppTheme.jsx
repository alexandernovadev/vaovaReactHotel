import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { voavaTheme } from "./voavaTheme";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={voavaTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
