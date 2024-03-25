const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

router.post("/bookcar", async (req, res) => {
  const lineItem = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Hello",
        },
        unit_amount: item.totalAmount * 100,
      },
      quantity: 1,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItem,
      billing_address_collection: 'required',
      success_url: "http://localhost:3000/userbookings",
      cancel_url: "http://localhost:3000/",
    });

    req.body.items[0]["transactionId"] = session.id;

    const newbooking = new Booking(req.body.items[0]);
    await newbooking.save();
    const car = await Car.findOne({ _id: req.body.items[0].car });
    car.bookedTimeSlots.push(req.body.items[0].bookedTimeSlots);
    
    await car.save();

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/deletebooking", async (req, res) => {
  try {    
    await Booking.findOneAndDelete({ _id: req.body.bookingid });
    res.send("Booking deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
