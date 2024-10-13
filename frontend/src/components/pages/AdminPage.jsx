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
  CardActions,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminPage = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
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
      setNewCar({ name: "", price: "", image: "", description: "" });
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
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      {/* Car Form */}
      <Card style={{ marginBottom: "2rem", padding: "1rem" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Car
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={newCar.name}
                onChange={handleInputChange}
                variant="outlined"
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
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={newCar.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={addCar}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={24} /> : null}
          >
            {loading ? "Adding..." : "Add Car"}
          </Button>
        </CardActions>
      </Card>
      {/* Available Cars */}
      <Typography variant="h5" gutterBottom align="center">
        Available Cars
      </Typography>
      <Grid container spacing={4}>
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{car.name}</Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: {car.price}
                </Typography>
                <Typography variant="body2">{car.description}</Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "space-between" }}>
                {/* <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeCar(car.id)}
                >
                  Delete
                </Button> */}
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => removeCar(car.id)}
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
    </div>
  );
};

export default AdminPage;
