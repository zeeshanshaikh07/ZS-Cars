from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# CORS (so that frontend can access the backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup with proper MongoDB Atlas URI
try:
    MONGO_URI = os.getenv("MONGO_URI")
    client = AsyncIOMotorClient(MONGO_URI)
    db = client["carDetailsDB"]
    car_collection = db["cars"]
except Exception as e:
    logging.error(f"Error connecting to MongoDB: {e}")
    raise HTTPException(status_code=500, detail="Database connection failed")


# Pydantic model for car
class Car(BaseModel):
    make: str  # Car make (e.g., Toyota, Honda)
    model: str  # Car model (e.g., Corolla, Civic)
    price: str  # Price of the car
    image: str  # URL of the car image


# Helper function to convert ObjectId to string
def car_helper(car) -> dict:
    return {
        "id": str(car["_id"]),  # Convert ObjectId to string
        "make": car["make"],  # Retrieve car make
        "model": car["model"],  # Retrieve car model
        "price": car["price"],  # Retrieve price
        "image": car["image"],  # Retrieve image URL
    }


# Route to get all cars
@app.get(
    "/cars", summary="Get all cars", description="Retrieve a list of all available cars"
)
async def get_cars():
    cars = []
    async for car in car_collection.find():
        cars.append(car_helper(car))
    return cars


# Route to add a new car
@app.post("/cars", summary="Add a new car", description="Add a new car to the database")
async def add_car(car: Car):
    car_data = car.model_dump()
    result = await car_collection.insert_one(car_data)
    if result.inserted_id:
        return {"message": "Car added successfully"}
    raise HTTPException(status_code=400, detail="Car addition failed")


# Route to delete a car
@app.delete(
    "/cars/{car_id}",
    summary="Delete a car",
    description="Remove a car from the database by its ID",
)
async def delete_car(car_id: str):
    result = await car_collection.delete_one({"_id": ObjectId(car_id)})
    if result.deleted_count:
        return {"message": "Car deleted successfully"}
    raise HTTPException(status_code=404, detail="Car not found")
