// import { useState } from "react";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// const WorkoutForm = () => {
//   const { dispatch } = useWorkoutsContext();
//   const [title, setTitle] = useState("");
//   const [load, setLoad] = useState("");
//   const [reps, setReps] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const workout = { title, load, reps };
//     console.log("Submitting workout:", workout);
//     const response = await fetch("http://localhost:4000/api/workouts", {
//       method: "POST",
//       body: JSON.stringify(workout),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("Response:", response);

//     const json = await response.json();

//     if (!response.ok) {
//       setError(json.message);
//     }
//     if (response.ok) {
//       setError(null);
//       setTitle("");
//       setLoad("");
//       setReps("");
//       console.log("New workout added");
//       dispatch({ type: "CREATE_WORKOUT", payload: json });
//     }
//   };

//   return (
//     <form className="create" onSubmit={handleSubmit}>
//       <h3>Add a new Workout</h3>

//       <label>Exercise Title: </label>
//       <input
//         type="text"
//         value={title}
//         onChange={(event) => setTitle(event.target.value)}
//       />

//       <label>Load (in Kg): </label>
//       <input
//         type="number"
//         value={load}
//         onChange={(event) => setLoad(event.target.value)}
//       />

//       <label>Number of reps:</label>
//       <input
//         type="number"
//         value={reps}
//         onChange={(event) => setReps(event.target.value)}
//       />

//       <button>Add Workout</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default WorkoutForm;

import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const workout = { title, load, reps };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Exercise Title: </label>
      <input
        className={emptyFields.includes("title") ? "error" : ""}
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label>Load (in Kg): </label>
      <input
        className={emptyFields.includes("load") ? "error" : ""}
        type="number"
        value={load}
        onChange={(event) => setLoad(event.target.value)}
      />

      <label>Number of reps:</label>
      <input
        className={emptyFields.includes("reps") ? "error" : ""}
        type="number"
        value={reps}
        onChange={(event) => setReps(event.target.value)}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
