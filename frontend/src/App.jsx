import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/Navbar";
import AdminPage from "./components/pages/AdminPage";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, sans-serif",
  },
});

function App() {
  // const [count, setCount] = useState(0)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This resets the styles */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
