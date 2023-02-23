const express = require("express");
const router = express.Router();
const User = require("./../models/user.model");
const Flight = require("./../models/flight.model");
const Booking = require("./../models/booking.model");
// router.route("/register").post();

//user

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.find({ name, email });
    console.log("existingUser:", existingUser);

    if (existingUser.length > 0) {
      res.status(300).json({ data: "user already register" });
      return;
    }

    const newUSer = await User.create({ name, email, password });
    res.status(201).json({ data: newUSer });
  } catch (err) {
    console.log("err:", err);
    res.status(404).json({ data: "something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });

    if (user.length > 0) {
      res.status(201).json({ data: user[0] });
    } else {
      res.status(404).json({ data: "user not found" });
    }
  } catch (err) {
    console.log("err:", err);
    res.status(404).json({ data: "something went wrong" });
  }
});

//flight

router.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.status(200).json({ total_flights: flights.length, data: flights });
  } catch (err) {
    console.log("err:", err);
    res.status(404).json({ data: "something went wrong" });
  }
});

router.get("/flights/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findById(id);
    res.status(200).json({ data: flight });
  } catch (err) {
    console.log("err:", err);
    res.status(404).json({ data: "something went wrong" });
  }
});

router.delete("/flights/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findByIdAndDelete(id);
    res.status(202).json({ data: flight });
  } catch (err) {
    console.log("err:", err);
    res.status(404).json({ data: "something went wrong" });
  }
});

router.patch("/flights/:id", async (req, res) => {
  const { id } = req.params;
  let data = req.body;
  try {
    const flight = await Flight.findByIdAndUpdate(id, data, { new: true });
    res.status(204).json({ data: flight });
  } catch (err) {
    console.log("err:", err);
    res.status(404).json({ data: "something went wrong" });
  }
});
router.post("/flights", async (req, res) => {
  const {
    airline,
    flightNo,
    departure,
    arrival,
    departureTime,
    arrivalTime,
    price,
    seats,
  } = req.body;
  console.log("req.body:", req.body);

  if (
    !airline ||
    !flightNo ||
    !departure ||
    !arrival ||
    !departureTime ||
    !arrivalTime ||
    !price ||
    !seats
  ) {
    res.status(300).json({ data: "Kindly enter all details" });
  } else {
    try {
      const flight = await Flight.create({
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        price,
        seats,
      });
      res.status(201).json({ data: flight });
    } catch (err) {
      console.log("err:", err);
      res.status(404).json({ data: "something went wrong" });
    }
  }
});

//booking

router.post("/booking", async (req, res) => {
  const { user, flight } = req.body;
  if (!user || !flight) {
    res.status(300).json({ data: "Kindly enter all details" });
    return;
  } else {
    try {
      const existingBooking = await Booking.find({ user, flight });

      if (existingBooking.length > 0) {
        res.status(300).json({ data: "booking already register" });
        return;
      }
      const booking = await Booking.create({
        user,
        flight,
      });
      res.status(201).json({ data: booking });
    } catch (err) {
      console.log("err:", err);
      res.status(404).json({ data: "something went wrong" });
    }
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const allBookings = await Booking.find({});
    res
      .status(200)
      .json({ total_bookings: allBookings.length, data: allBookings });
  } catch (err) {
    console.log("err:", err);
    res.status(404).json({ data: "something went wrong" });
  }
});
router.all("/*", async (req, res) => {
  res.status(404).json({ data: "Invalid endPoint" });
});

module.exports = router;
