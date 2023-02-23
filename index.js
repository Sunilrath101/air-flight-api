require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Air india Flight");
});

app.use("/api", userRouter);

app.all("/*", async (req, res) => {
  res.status(404).json({ data: "Invalid endPoint" });
});

app.listen(PORT, () => {
  db();
  console.log(`Server is running at ${PORT}`);
});
