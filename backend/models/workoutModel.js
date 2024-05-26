const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
); //timestamps adds a date and time for each object created

module.exports = mongoose.model("Workout", workoutSchema); //Creates and exports a model called Workout which follows the
