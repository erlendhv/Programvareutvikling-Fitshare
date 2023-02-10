import React from "react";
import { FiThumbsUp } from "react-icons/fi";
import { AiOutlineComment } from "react-icons/ai";

export function Post(props: {
  id: string, name: string,
  program: { workoutName: string; exercises: { name: string; sets: number; reps: number; }[]; }[],
  image: string, likes: number, liked: boolean, comments: string[], toggleLiked: (id: string) => void
}) {



  return <div className="Post">
    {/* <div className="Post-likes"></div> */}
    <div className="Post-likes">{props.likes} </div>
    {/* <input> */}
    <FiThumbsUp key={props.id} className="Thumb-icon"
      style={{ fill: props.liked ? "yellow" : "" }} onClick={() => {
        props.toggleLiked(props.id)
      }} />
    {/* </input> */}
    <strong>{props.name}</strong>
    <br></br>
    <div className="Post-content">
      <strong>{props.program.length > 0 ? "Program" : ""}</strong>
      <br></br>

      {props.program.map((workout, key) => (
        <div className="Workout" key={key}>
          <br></br>
          <strong>{workout.workoutName}</strong>
          <br></br>
          {workout.exercises.map((exercise, key) => (
            <div className="Exercise" key={key}>
              <strong>{exercise.name}</strong>
              <br></br>
              {exercise.sets} sets of {exercise.reps} reps
              <br></br>
            </div>
          ))}
        </div>
      ))}

      {props.image ? <><br></br> <img src={props.image} className="Post-image" alt="Exercise" /></> : ""}

      <div className="Comment-icon">
        Comment
        <AiOutlineComment key={props.id} />
      </div>

    </div>
  </div>;
}
