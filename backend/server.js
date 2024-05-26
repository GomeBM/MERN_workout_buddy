//FOR ENVIRONMENT VARIABLES:
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const PORT = process.env.PORT;

//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //accessing request.body

//routes
app.use("/api/workouts", workoutRoutes);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `connected to DB and listening running on : http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
