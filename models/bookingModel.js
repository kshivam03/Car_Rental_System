const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "cars", required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookedTimeSlots: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
    totalHours: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    driverRequired: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);
module.exports = bookingModel;
