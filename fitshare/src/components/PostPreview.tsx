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
  program: Program;
}) {

  const [workouts, setWorkouts] = useState<Workout[]>();

  const [currentProgram, setCurrentProgram] = useState<Program>(props.program);

  useEffect(() => {
    console.log("useEffect");
    console.log(currentProgram);
    const matchingWorkouts: Workout[] = [];
    currentProgram.workouts.forEach(async (workoutId) => {
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
    setWorkouts(matchingWorkouts);
  }, [currentProgram]);

  return (
    <div className="Post">
      <strong>{props.name}</strong>
      <br></br>
      <div className="Post-content">
        <strong>{props.program.workouts.length > 0 ? "Program" : ""}</strong>
        <br></br>

        {props.program.workouts.map((workout, key) => (
          <div className="Workout" key={key}>
            <br></br>
            <strong>{currentProgram.name}</strong>
            <br></br>
            {workouts ? workouts.map((workout, key) => (
              <div className="Exercise" key={key}>
                <strong>{workout.name} Wrk</strong>
                <br></br>
                {workout.exercises.map((exercise, key) => (
                  <div className="Exercise" key={key}>
                    <strong>{exercise}</strong>
                    <br></br>

                  </div>
                ))}
                <br></br>
              </div>
            )) :
              <div>No workouts</div>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
