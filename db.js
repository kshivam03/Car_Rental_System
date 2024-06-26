const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://shivam:shivam123@cluster0.r7jensu.mongodb.net/car_rental_system",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("MongoDB connection successfull");
  });

  connection.on("error", () => {
    console.log("MongoDB connection error");
  });
}

connectDB();

module.exports = mongoose;
