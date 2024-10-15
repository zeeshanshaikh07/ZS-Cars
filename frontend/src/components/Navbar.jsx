import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const Navbar = () => (
  <AppBar
    position="static"
    sx={{
      background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 2rem",
      }}
    >
      <Typography
        component={Link}
        to="/"
        sx={{
          textDecoration: "none",
          color: "white",
          fontWeight: "bold",
          letterSpacing: "0.1rem",
          fontSize: "1.5rem",
          "&:hover": {
            color: "#ffeb3b", // Yellow hover effect on logo
          },
        }}
      >
        ZS Cars
      </Typography>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", gap: "1.5rem" }}>
        <Button
          component={Link}
          to="/"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            textTransform: "none",
            borderRadius: "0.5rem",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/about"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            textTransform: "none",
            borderRadius: "0.5rem",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          About
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
