import React, { useState } from "react";
import './../NewProgram.css';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

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

export function TrainingPrograms() {

  const handleBack = () => {
    navigate('/');
  };

  const navigate = useNavigate();

  const addProgram = () => {
    navigate('/newprogram');
  };

  const addExecution = () => {
    navigate('/newexecution');
  };

  const [programs, setPrograms] = useState<Program[]>([
    {
      id: 0,
      name: "Program 1",
      workouts: [
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
      ],
    },
    {
      id: 1,
      name: "Program 2",
      workouts: [
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
      ],
    },
  ]);

  const [currentProgram, setCurrentProgram] = useState<Program | Program>(programs[0]);

  const [newProgramName, setNewProgramName] = useState<string>("");

  const [newWorkoutName, setNewWorkoutName] = useState<string>("");

  const [newExerciseName, setNewExerciseName] = useState<string>("");

  const [newExerciseSets, setNewExerciseSets] = useState<string>("");

  const [newExerciseReps, setNewExerciseReps] = useState<string>("");


  return (
    <div className="NewProgram">
      <BiArrowBack className="Back-button" onClick={handleBack} />

      <h1>Your Programs</h1>
      <div className="Overviews">
        <div className="Overview">
          <h2>Programs</h2>
          <div className="Create-new-button" onClick={addProgram}>Create New Program</div>

          {programs.map((program, key) => (
            <div key={key} className="Option" onClick={() => setCurrentProgram(program)}>
              {program.name}
            </div>
          ))}

        </div>
        <br></br>
        <div className="Overview">
          <h2>Excecutions</h2>
          <div className="Create-new-button" onClick={addExecution}>Add new Execution</div>
        </div>
      </div >
    </div>
  );
}

export default TrainingPrograms;
