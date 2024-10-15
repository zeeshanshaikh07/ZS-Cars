import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  CardContent,
  Card,
  CardMedia,
  CardActions,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

const AdminPage = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false); // Loading state for adding a car
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  useEffect(() => {
    // Fetch the existing cars
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const addCar = async () => {
    setLoading(true); // Set loading to true
    try {
      await axios.post("http://localhost:8000/cars", newCar);
      setSuccessMessage("Car added successfully!");
      // Fetch updated list of cars
      const response = await axios.get("http://localhost:8000/cars");
      setCars(response.data);
      setNewCar({ make: "", model: "", price: "", image: "" });
    } catch (error) {
      console.error("Error adding car:", error);
      setErrorMessage("Error adding car. Please check your input.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const removeCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:8000/cars/${carId}`);
      setCars(cars.filter((car) => car.id !== carId));
      setSuccessMessage("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car:", error);
      setErrorMessage("Error deleting car.");
    }
  };

  return (
    <Box
      sx={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "2rem" }}
      >
        Admin Dashboard
      </Typography>

      {/* Car Form */}
      <Card
        sx={{
          marginBottom: "2rem",
          padding: "2rem",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Add New Car
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Make"
                name="make"
                value={newCar.make}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ marginBottom: "1rem" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                name="model"
                value={newCar.model}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ marginBottom: "1rem" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={newCar.price}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ marginBottom: "1rem" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={newCar.image}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ marginBottom: "1rem" }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={addCar}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={24} /> : null}
            sx={{ boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)" }}
          >
            {loading ? "Adding..." : "Add Car"}
          </Button>
        </CardActions>
      </Card>
      {/* Available Cars */}
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#333", marginBottom: "2rem" }}
      >
        Available Cars
      </Typography>
      <Grid container spacing={4}>
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
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
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#1976d2" }}
                >
                  {car.make}
                </Typography>
                <Typography variant="h6">{car.model}</Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  Price: {car.price}
                </Typography>
                <Typography variant="body2">{car.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => removeCar(car.id)}
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      color: "red",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Snackbar for success/error messages */}
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
        action={
          <Button color="inherit" onClick={() => setErrorMessage("")}>
            Close
          </Button>
        }
      />
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
        action={
          <Button color="inherit" onClick={() => setSuccessMessage("")}>
            Close
          </Button>
        }
      />
    </Box>
  );
};

export default AdminPage;
