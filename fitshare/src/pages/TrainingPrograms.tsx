import { useState } from "react";
import './../style/NewProgram.css';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

interface Excersise {
  name: string;
  sets: number;
  reps: number;
  id: string;
}

interface Workout {
  id: string;
  name: string;
  exercises: Excersise[];
}

interface Program {
  id: string;
  name: string;
  workouts: Workout[];
}

export function TrainingPrograms(props: { currentUser: firebase.User }) {

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
    // {
    //   id: "0",
    //   name: "Program 1",
    //   workouts: [
    //     {
    //       id: "1",
    //       name: "Workout 1",
    //       exercises: [
    //         {
    //           name: "Bench Press",
    //           sets: 3,
    //           reps: 10,
    //           id: "1",
    //         },
    //         {
    //           name: "Squat",
    //           sets: 3,
    //           reps: 10,
    //           id: "2",
    //         },
    //       ],
    //     },
    //     {
    //       id: "2",
    //       name: "Workout 2",
    //       exercises: [
    //         {
    //           name: "Bench Press",
    //           sets: 3,
    //           reps: 10,
    //           id: "3",
    //         },
    //         {
    //           name: "Squat",
    //           sets: 3,
    //           reps: 10,
    //           id: "4",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: "5",
    //   name: "Program 2",
    //   workouts: [
    //     {
    //       id: "8",
    //       name: "Workout 1",
    //       exercises: [
    //         {
    //           name: "Bench Press",
    //           sets: 3,
    //           reps: 10,
    //           id: "6",
    //         },
    //         {
    //           name: "Squat",
    //           sets: 3,
    //           reps: 10,
    //           id: "7",
    //         },
    //       ],
    //     },
    //     {
    //       id: "10",
    //       name: "Workout 2",
    //       exercises: [
    //         {
    //           name: "Bench Press",
    //           sets: 3,
    //           reps: 10,
    //           id: "9",
    //         },
    //         {
    //           name: "Squat",
    //           sets: 3,
    //           reps: 10,
    //           id: "10",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]);

  const [currentProgram, setCurrentProgram] = useState<Program | Program>(programs[0]);

  return (
    <div className="NewProgram">
      <BiArrowBack className="Back-button" onClick={handleBack} />

      <h1>Your Programs</h1>
      <div className="Overviews">
        <div className="Overview">
          <h2>Programs</h2>
          <div className="Create-new-button" onClick={addProgram}>Create New Program</div>

          {programs.map((program, key) => (
            <div key={key} className={currentProgram.id === program.id ? "Option-selected" : "Option"}
              onClick={() => setCurrentProgram(program)}>
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
