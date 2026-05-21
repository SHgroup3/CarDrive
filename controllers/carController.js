const Car = require("../models/carModel");
const CarImage = require("../models/carImage");

exports.createCar = async (req, res) => {
  try {
    const added_by = req.user.id;
    const { 
      make, model, year, price, 
      color, fuel_type, mileage, transmission, status, images 
    } = req.body;

   
    const newCar = new Car({
      added_by, make, model, year, price, 
      color, fuel_type, mileage, transmission, status
    });
    const savedCar = await newCar.save();


    if (images && images.length > 0) {
      const carImages = images.map((img) => ({
        car_id: savedCar._id,
        image_url: img.url,
        is_primary: img.is_primary || false
      }));
      await CarImage.insertMany(carImages);
    }

    res.status(201).json({ message: "Car and images added successfully", car: savedCar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate("added_by", "name email");
    
  
    const carsWithImages = await Promise.all(
      cars.map(async (car) => {
        const images = await CarImage.find({ car_id: car._id });
        return {
          ...car._doc,
          images: images
        };
      })
    );

    res.status(200).json(carsWithImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate("added_by", "name email");
    if (!car) return res.status(404).json({ message: "Car not found" });

    const images = await CarImage.find({ car_id: car._id });

    res.status(200).json({ car, images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCar) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car updated successfully", car: updatedCar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });

    await CarImage.deleteMany({ car_id: carId });

    res.status(200).json({ message: "Car and its images deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};