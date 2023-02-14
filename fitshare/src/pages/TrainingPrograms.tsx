import React, { useState } from "react";
import { Program } from "../components/Program";
import './../TrainingPrograms.css';

interface Excersise {
  name: string;
  sets: number;
  reps: number;
}

interface Workout {
  name: string;
  exercises: Excersise[];
}

interface Program {
  id: number;
  name: string;
  workouts: Workout[];
}

export function TrainingPrograms() {

  const [currentProgram, setCurrentProgram] = useState<Program>({
    id: 0,
    name: "Program 1",
    workouts: [
      {
        name: "Legs",
        exercises: [
          {
            name: "Exercise 1",
            sets: 3,
            reps: 10,
          },
          {
            name: "Exercise 2",
            sets: 3,
            reps: 10,
          },
        ],
      },
      {
        name: "Upper Body",
        exercises: [
          {
            name: "Exercise 1",
            sets: 3,
            reps: 10,
          },
          {
            name: "Exercise 2",
            sets: 3,
            reps: 10,
          },
        ],
      },
    ],
  });



  const [programs, setPrograms] = useState<Program[]>([
    {
      id: 0,
      name: "Program 1",
      workouts: [
        {
          name: "Lower Body",
          exercises: [
            {
              name: "Exercise 1",
              sets: 3,
              reps: 10,
            },
            {
              name: "Exercise 2",
              sets: 3,
              reps: 10,
            },
          ],
        },
        {
          name: "Running",
          exercises: [
            {
              name: "Exercise 1",
              sets: 3,
              reps: 10,
            },
            {
              name: "Exercise 2",
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
          name: "Legs",
          exercises: [
            {
              name: "Exercise 1",
              sets: 3,
              reps: 10,
            },
            {
              name: "Exercise 2",
              sets: 3,
              reps: 10,
            },
          ],
        },
        {
          name: "Upper Body",
          exercises: [
            {
              name: "Exercise 1",
              sets: 3,
              reps: 10,
            },
            {
              name: "Exercise 2",
              sets: 3,
              reps: 10,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="TrainingPrograms">
      <div className="Overview">
        <h2>Training Programs</h2>
        <div className="Program-input">
          <input className="Input-field" placeholder="Name of new program" />
          <div className="Add-button">Add</div>
        </div>

        {programs.map((program) => (
          <div className="Option" onClick={() => setCurrentProgram(program)}>{program.name}</div>
        ))}
      </div>
      <br></br>
      <div className="Overview">
        <h2>Workouts</h2>
        <input className="Input-field" placeholder="Name of new workout" />
        {currentProgram.workouts.map((workout) => (
          <div className="Option">{workout.name}</div>
        ))}
      </div>
    </div>
  );
}

export default TrainingPrograms;
