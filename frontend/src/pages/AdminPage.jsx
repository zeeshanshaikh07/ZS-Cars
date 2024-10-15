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
      sx={{
        padding: "2rem",
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: "2rem",
          color: "#2c3e50",
          textTransform: "uppercase",
          letterSpacing: "0.1rem",
        }}
      >
        Admin Dashboard
      </Typography>

      {/* Car Form */}
      <Card
        sx={{
          marginBottom: "2rem",
          padding: "2rem",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          backgroundColor: "#fff",
          maxWidth: "950px", // Increased width for a better fit
          width: "100%",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#2980b9",
              fontSize: "1.4rem", // Slightly larger font size for emphasis
              textAlign: "center"
            }}
          >
            Add New Car
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Make"
                name="make"
                value={newCar.make}
                onChange={handleInputChange}
                variant="outlined"
                sx={{
                  marginBottom: "1.5rem", // Increased bottom margin for spacing
                  borderRadius: "8px",
                }}
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
                sx={{
                  marginBottom: "1.5rem", // Increased bottom margin for spacing
                  borderRadius: "8px",
                }}
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
                sx={{
                  marginBottom: "1.5rem", // Increased bottom margin for spacing
                  borderRadius: "8px",
                }}
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
                sx={{
                  marginBottom: "1.5rem", // Increased bottom margin for spacing
                  borderRadius: "8px",
                }}
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
            sx={{
              background: "linear-gradient(45deg, #2980b9, #3498db)", // Bluish gradient
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              color: "#fff",
              borderRadius: "10px",
              padding: "0.8rem 2rem", // Padding for a bold button appearance
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(45deg, #3498db, #2980b9)", // Hover effect with reversed gradient
              },
            }}
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
        sx={{
          fontWeight: "bold",
          color: "#34495e",
          marginBottom: "2rem",
          textTransform: "uppercase",
          letterSpacing: "0.08rem",
        }}
      >
        Available Cars
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                transition: "0.3s",
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                  cursor: "pointer",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={car.image}
                alt={`${car.make} ${car.model}`}
                sx={{ objectFit: "cover", borderRadius: "15px 15px 0 0" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#2980b9" }}
                >
                  {car.make}
                </Typography>
                <Typography variant="h6">{car.model}</Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  Price: ₹{car.price}
                </Typography>
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
