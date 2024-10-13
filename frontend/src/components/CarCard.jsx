import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

const CarCard = ({ car }) => (
  <Card
    sx={{
      maxWidth: 300,
      borderRadius: 2,
      overflow: "hidden",
      boxShadow: 2,
      transition: "transform 0.3s, box-shadow 0.3s",
      background: "#f9f9f9",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: 4,
        cursor: "pointer",
      },
    }}
  >
    <CardMedia
      component="img"
      height="180"
      image={car.image}
      alt={`${car.make} ${car.model}`}
      sx={{ objectFit: "cover" }} // Ensures the image covers the area nicely
    />
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="body2" component="div" sx={{ marginBottom: 1 }}>
        {car.make}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: "bold", marginBottom: 1 }}
      >
        {car.model}
      </Typography>
      <Divider
        sx={{
          width: "25%",
          margin: "0 auto",
          backgroundColor: "black",
          marginY: 1,
        }}
      />
      <Typography variant="h6" color="primary" sx={{ marginY: 1 }}>
        ₹{car.price}
      </Typography>
      {/* <Typography variant="body2" color="text.secondary">
        {car.description}
      </Typography> */}
    </CardContent>
  </Card>
);

export default CarCard;
