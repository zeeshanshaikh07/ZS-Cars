import React from "react";
import { Typography, Box } from "@mui/material";

const AboutPage = () => {
  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        About ZS Cars
      </Typography>
      <Typography variant="body1">
        ZS Cars offers a wide range of vehicles with the best deals and customer
        service.
      </Typography>
    </Box>
  );
};

export default AboutPage;
