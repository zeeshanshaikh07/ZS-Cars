import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const CarCard = ({ car }) => (
  <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
    <CardMedia
      component="img"
      height="200"
      image={car.image}
      alt={car.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {car.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {car.price}
      </Typography>
      {/* <Typography variant="body2" color="text.secondary">
        {car.description}
      </Typography> */}
    </CardContent>
  </Card>
);

export default CarCard;
