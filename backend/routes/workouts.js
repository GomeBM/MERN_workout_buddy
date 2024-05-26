const express = require("express");
const workoutController = require("../controllers/workoutController");

const router = express.Router();

//GET ALL WORKOUTS
router.get("/", workoutController.getAllWorkouts);

//GET A SINGLE WORKOUT
router.get("/:id", workoutController.getWorkout);

//POST a new workout
router.post("/", workoutController.createWorkout);

//DELETE a workout
router.delete("/:id", workoutController.deleteWorkout);

//UPDATE a workout
router.patch("/:id", workoutController.updateWorkout);

module.exports = router;
