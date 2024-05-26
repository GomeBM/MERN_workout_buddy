// import { useEffect, useState } from "react";
// import WorkoutDetails from "../components/WorkoutsDetails";
// import WorkoutForm from "../components/WorkoutForm";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// const Home = () => {
//   const { workouts, dispatch } = useWorkoutsContext();

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       const response = await fetch("http://localhost:4000/api/workouts");
//       const json = await response.json();
//       if (response.ok) {
//         dispatch({ type: "SET_WORKOUTS", payload: json });
//       }
//     };

//     fetchWorkouts();
//   }, []);

//   return (
//     <div className="home">
//       <div className="workouts">
//         {workouts &&
//           workouts.results.map((workout) => (
//             <WorkoutDetails key={workout._id} workout={workout} />
//           ))}
//       </div>
//       <WorkoutForm />
//     </div>
//   );
// };

// export default Home;

import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutsDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json.results }); // Ensure payload is the workouts array
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
