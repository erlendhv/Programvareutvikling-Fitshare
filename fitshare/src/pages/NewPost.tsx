import React, { PureComponent, useState, useEffect } from "react";
import "./../style/NewProgram.css";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "./../style/NewPost.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { PostPreview } from "./../components/PostPreview";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  id: string;
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface Program {
  id: string;
  name: string;
  workouts: Workout[];
}

export function NewPost(props: { currentUser: firebase.User }) {
  const [description, setDescription] = useState<string>("");

  const [programs, setPrograms] = useState<Program[]>([
    {
      id: "0",
      name: "Your programs",
      workouts: [],
    },
  ]);

  const [currentProgram, setCurrentProgram] = useState<Program>(programs[0]);

  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: "0",
      name: "Your workouts",
      exercises: [],
    },
  ]);

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
    // setWorkouts(workouts);
    setWorkouts(matchingWorkouts);
    console.log(workouts);
  }, [currentProgram]);

  const currentUserRef = firebase
    .firestore()
    .collection("users")
    .doc(props.currentUser.uid);
  const [currentUserData] = useDocumentData(currentUserRef as any);

  useEffect(() => {
    let unsubscribe: firebase.Unsubscribe | undefined;
    if (currentUserData) {
      if (currentUserData.programs.length > 0) {
        const programsRef = firebase
          .firestore()
          .collection("programs")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            currentUserData.programs
          );
        unsubscribe = programsRef.onSnapshot((querySnapshot) => {
          const programs: any = [];
          querySnapshot.forEach((doc) => {
            programs.push(doc.data());
          });
          setPrograms(programs);
        });
      } else {
        setPrograms([]);
      }
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [currentUserData]);

  return (
    <div className="New-Post">
      <h1>Select program to post</h1>
      <div className="Overviews">
        <div className="Overview">
          {programs.map((program, key) => (
            <div
              key={key}
              className={
                currentProgram.id === program.id ? "Option-selected" : "Option"
              }
              onClick={() => {
                setCurrentProgram(program);
              }}
            >
              {program.name}
            </div>
          ))}
        </div>
        <div className="Overview">
          <PostPreview
            id={currentProgram.id}
            name={currentProgram.name}
            program={currentProgram}
          />
        </div>
      </div>
      <div className="New-post-button">Post</div>
    </div>
  );
}

export default NewPost;
