import React, { useState } from "react";
import { Program } from "../components/Program";
import './../NewProgram.css';
import App from "./App";

interface Excersise {
  name: string;
  sets: number;
  reps: number;
}

interface Workout {
  id: number;
  name: string;
  exercises: Excersise[];
}

interface Program {
  id: number;
  name: string;
  workouts: Workout[];
}

export function NewProgram() {

  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: 0,
      name: "Workout 1",
      exercises: [
        {
          name: "Bench Press",
          sets: 3,
          reps: 10,
        },
        {
          name: "Squat",
          sets: 3,
          reps: 10,
        },
      ],
    },
    {
      id: 1,
      name: "Workout 2",
      exercises: [
        {
          name: "Bench Press",
          sets: 3,
          reps: 10,
        },
        {
          name: "Squat",
          sets: 3,
          reps: 10,
        },
      ],
    },
  ]);

  const [currentWorkout, setCurrentWorkout] = useState<Workout>(workouts[0]);

  const [newProgramName, setNewProgramName] = useState<string>("");

  const [newWorkoutName, setNewWorkoutName] = useState<string>("");

  const [newExerciseName, setNewExerciseName] = useState<string>("");

  const [newExerciseSets, setNewExerciseSets] = useState<string>("0");

  const [newExerciseReps, setNewExerciseReps] = useState<string>("0");

  const addWorkout = () => {
    if (newWorkoutName === "" || workouts.find((workout) => workout.name === newWorkoutName)) {
      return;
    }

    const newWorkout: Workout = {
      id: workouts.length,
      name: newWorkoutName,
      exercises: [],
    };

    setWorkouts([...workouts, newWorkout]);
    setCurrentWorkout(newWorkout);
    setNewWorkoutName("");
  };

  const addExercise = () => {
    if (newExerciseName === "") {
      return;
    }

    const newExercise: Excersise = {
      name: newExerciseName,
      sets: parseInt(newExerciseSets),
      reps: parseInt(newExerciseReps),
    }

    const newWorkouts = [...workouts];
    const workout = newWorkouts.find((workout) => workout.id === currentWorkout.id);

    if (workout) {
      workout.exercises.push(newExercise);
    }

    setWorkouts(newWorkouts);
    setNewExerciseName("");
  };


  return (
    <div className="NewProgram">
      <input className="New-program-header" placeholder="New Program..." value={newProgramName} onChange={(e) => setNewProgramName(e.target.value)} />
      <div className="Overviews">
        <div className="Overview">
          <h2>Workouts</h2>
          <div className="Option-input">
            <input className="Input-field" placeholder="New Workout..."
              value={newWorkoutName} onChange={(e) => setNewWorkoutName(e.target.value)} />
            <div className="Add-button" onClick={addWorkout}>Add</div>
          </div>

          {workouts.map((program) => (
            <div className={currentWorkout.id === program.id ? "Option-selected" : "Option"}
              onClick={() => setCurrentWorkout(program)}
            >{program.name}
            </div>
          ))}

        </div>
        <br></br>
        <div className="Overview">
          <h2>Exercises</h2>
          <div className="Option-input">
            <input className="Input-field" placeholder="New Exercise..." value={newExerciseName} onChange={(e) => setNewExerciseName(e.target.value)} />
            <input className="Input-field" placeholder="Sets..." value={newExerciseSets} onChange={(e) => setNewExerciseSets(e.target.value)} />
            <input className="Input-field" placeholder="Reps..." value={newExerciseReps} onChange={(e) => setNewExerciseReps(e.target.value)} />
            <div className="Add-button" onClick={addExercise}>Add</div>
          </div>
          {currentWorkout.exercises.map((exercise) => (
            <div className="Exercise-info">
              {exercise.name}
              <br></br>
              {exercise.sets} sets of {exercise.reps} reps
            </div>
          ))}
        </div>
      </div >
    </div>
  );
}

export default NewProgram;
