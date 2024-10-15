import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// import AppRoutes from "./Routes";
import AppRoutes from "./Routes";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, sans-serif",
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* This resets the styles */}
    <AppRoutes />
  </ThemeProvider>
);

export default App;
