import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";


interface Exercise {
  name: string;
  sets: number;
  reps: number;
  id: string;
}

interface Workout {
  id: string;
  name: string;
  exercises: string[];
}

interface Program {
  id: string;
  name: string;
  workouts: string[];
}

export function PostPreview(props: {
  id: string;
  name: string;
  program: {
    workoutName: string;
    exercises: { name: string; sets: number; reps: number }[];
  }[];
}) {

  const [currentProgram, setCurrentProgram] = useState(props.program);

  useEffect(() => {
    console.log("useEffect");
    console.log(currentProgram);
    const matchingWorkouts: Workout[] = [];
    currentProgram.forEach(async (workoutId) => {
      const workoutCollection = firebase.firestore().collection("workout");
      const querySnapshot = await workoutCollection
        .where("id", "==", workoutId)
        .get();
      querySnapshot.forEach((doc) => {
        const workout = doc.data() as Workout;
        matchingWorkouts.push(workout);
        // workouts.push(workout);
      });
    });
  }, [currentProgram]);

  return (
    <div className="Post">
      <strong>{props.name}</strong>
      <br></br>
      <div className="Post-content">
      <input type="text"  id="postDescription" />
      <br></br>
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
      </div>
    </div>
  );
}


//style input og lagre content 