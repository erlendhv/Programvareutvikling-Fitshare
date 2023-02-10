import React from "react";
import { FiThumbsUp } from "react-icons/fi";

export function Post(props: { name: string, program: { workoutName: string; exercises: { name: string; sets: number; reps: number; }[]; }[], image: string }) {
  return <div className="Post">
    <div className="Post-likes"></div>
    <FiThumbsUp className="Thumb-icon" />
    <strong>{props.name}</strong>
    <br></br>
    <div className="Post-content">
      <strong>{props.program.length > 0 ? "Program" : ""}</strong>
      <br></br>

      {props.program.map((workout) => (
        <div className="Workout">
          <br></br>
          <strong>{workout.workoutName}</strong>
          <br></br>
          {workout.exercises.map((exercise) => (
            <div className="Exercise">
              <strong>{exercise.name}</strong>
              <br></br>
              {exercise.sets} sets of {exercise.reps} reps
              <br></br>
            </div>
          ))}
        </div>
      ))}


      {props.image ? <><br></br> <img src={props.image} className="Post-image" alt="Exercise" /></> : ""}

    </div>
  </div>;
}
