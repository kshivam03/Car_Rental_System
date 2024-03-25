const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const Car = require("../models/carModel");

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/addcar", upload.single("image"), async (req, res) => {
  try {
    const fullImagePath = req.file.path;
    const imageName = fullImagePath.slice(18);

    const newCar = new Car({
      name: req.body.name,
      image: imageName,
      capacity: req.body.capacity,
      fuelType: req.body.fuelType,
      bookedTimeSlots: [],
      rentPerHour: req.body.rentPerHour,
    });

    await newCar.save();

    res.send("Car added successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/editcar", upload.single("image1"), async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });

    car.name = req.body.name;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    if (req.file) {
      const fullImagePath = req.file.path;
      const imageName = fullImagePath.slice(18);
      car.image = imageName;
    }

    await car.save();

    res.send("Car details updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });
    res.send("Car deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
