const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    airline: String,
    flightNo: String,
    departure: String,
    arrival: String,
    departureTime: Date,
    arrivalTime: Date,
    seats: Number,
    price: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const flight = mongoose.model("flight", flightSchema);
module.exports = flight;
