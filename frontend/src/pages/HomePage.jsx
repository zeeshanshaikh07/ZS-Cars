import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/CarCard"; // Ensure this is correctly imported
import CircularProgress from "@mui/material/CircularProgress"; // For loading indicator
import Typography from "@mui/material/Typography"; // For consistent typography
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // For navigation
import AddIcon from "@mui/icons-material/Add";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch car data from the backend
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cars");
        setCars(response.data);
      } catch (error) {
        console.error("There was an error fetching the car data!", error);
        setError("Failed to load car data. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCars();
  }, []);

  const handleAddCar = () => {
    navigate("/admin"); // Navigate to the Admin page
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "1rem" }}>
          Loading cars...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "2rem",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCar} // Handle button click
          startIcon={<AddIcon />}
        >
          Add New Car
        </Button>
      </div>
      <Grid container spacing={4} justifyContent="center">
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={3}>
            <CarCard car={car} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
