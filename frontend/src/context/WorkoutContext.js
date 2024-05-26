// // import { createContext, useReducer } from "react";

// // export const WorkoutsContext = createContext();

// // export const workoutsReducer = (state, action) => {
// //   switch (action.type) {
// //     case "SET_WORKOUTS":
// //       return {
// //         workouts: action.payload,
// //       };
// //     case "CREATE_WORKOUT":
// //       return {
// //         workouts: [action.payload, ...state.workouts],
// //       };
// //     default:
// //       return state;
// //   }
// // };

// // export const WorkoutsContextProvider = ({ children }) => {
// //   const [state, dispatch] = useReducer(workoutsReducer, {
// //     workouts: null,
// //   });

// //   return (
// //     <WorkoutsContext.Provider value={{ ...state, dispatch }}>
// //       {children}
// //     </WorkoutsContext.Provider>
// //   );
// // };

// import { createContext, useReducer } from "react";

// export const WorkoutsContext = createContext();

// export const workoutsReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_WORKOUTS":
//       return {
//         workouts: action.payload, // Make sure payload is an array
//       };
//     case "CREATE_WORKOUT":
//       return {
//         workouts: [action.payload, ...state.workouts], // Ensure workouts is an array
//       };
//     case "DELETE_WORKOUT":
//       return {
//         workouts: state.workouts.filter((w) => w._id !== action.payload._id),
//       };
//     default:
//       return state;
//   }
// };

// export const WorkoutsContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(workoutsReducer, {
//     workouts: [], // Initialize as an empty array
//   });

//   return (
//     <WorkoutsContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </WorkoutsContext.Provider>
//   );
// };

import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload, // Ensure payload is an array
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts], // Ensure workouts is an array
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: [], // Initialize as an empty array
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
