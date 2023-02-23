const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    flight: { type: mongoose.Schema.Types.ObjectId, ref: "flight" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const booking = mongoose.model("booking", bookingSchema);
module.exports = booking;
