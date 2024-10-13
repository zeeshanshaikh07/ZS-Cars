// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
  <AppBar position="static" style={{ backgroundColor: "#2196f3" }}>
    <Toolbar>
      <Typography
        variant="h6"
        component={Link}
        to="/"
        sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }} // Ensures the title looks like plain text
      >
        ZS Cars
      </Typography>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/about">
        About
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
