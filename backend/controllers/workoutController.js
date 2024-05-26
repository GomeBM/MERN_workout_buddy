const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get ALL workouts
exports.getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json({ status: "success", results: workouts });
};

//get a single workout
exports.getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: "Failed",
      message: `There is no workout with the id : ${id}`,
    });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({
      status: "Failed",
      message: `There is no workout with the id : ${id}`,
    });
  }
  res.status(200).json(workout);
};

//create a new workout
exports.createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill in all the fields", emptyFields });
  }
  //Add doc to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error.message });
  }
};

//delete a workout
exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: "Failed",
      message: `There is no workout with the id : ${id}`,
    });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({
      status: "Failed",
      message: `There is no workout with the id : ${id}`,
    });
  }
  res.status(200).json({ status: "Success", deleted_workout: workout });
};

//update a workout
exports.updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: "Failed",
      message: `There is no workout with the id : ${id}`,
    });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(404).json({
      status: "Failed",
      message: `There is no workout with the id : ${id}`,
    });
  }
  res.status(200).json({ status: "Success", updated_workout: workout });
};
