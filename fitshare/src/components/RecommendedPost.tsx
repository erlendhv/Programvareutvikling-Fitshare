import React from 'react';
import firebase from "firebase/compat/app";
import { useState, useEffect } from 'react';


interface UserProps {
    currentUser: firebase.User;
}

export function RecommendedPost(props: UserProps) {
    const [interest, setInterest] = useState(0);

    useEffect(() => {
        const usersCollection = firebase.firestore().collection("users");
        const currentUserDoc = usersCollection.doc(props.currentUser.uid);
        currentUserDoc.get().then(doc => {
          if (doc.exists) {
            const data = doc.data();
            setInterest(data!.interest);
          } else {
            console.log("No such document!");
          }
        }).catch(error => {
          console.log("Error getting document:", error);
        });
      }, []);

    if (interest === 1) {
        return (<Post
            key={1}
            id={"1"}
            name={"Lance Armstrong"}
            program={[{
                workoutName: "Cycling",
                exercises: [
                    { name: "Up the hill", sets: 3, reps: 10 },
                    { name: "Squat", sets: 3, reps: 10 },
                ]
            }]}
            image={"https://www.cyclingweekly.com/wp-content/uploads/2020/09/lance-armstrong-1.jpg"}
          />)
    } else if (interest === 2) {
        return (<Post
            key={2}
            id={"2"}
            name={"Arnold Schwarzenegger"}
            program={[{
                workoutName: "Chest",
                exercises: [
                    { name: "Bench Press", sets: 3, reps: 10 },
                    { name: "Squat", sets: 3, reps: 10 },
                ]
            }]}
            image={"https://www.arnoldsportsfestival.com/wp-content/uploads/2019/10/Arnold-Schwarzenegger-1.jpg"}
            />)
    } else if (interest === 3) {
        return (<Post
            
            key={3}
            id={"3"}
            name={"Roger Federer"}
            program={[{
                workoutName: "Tennis",
                exercises: [
                    { name: "Up the hill", sets: 3, reps: 10 },
                    { name: "Squat", sets: 3, reps: 10 },
                ]
            }]}
            image={"https://www.tennisworldusa.org/imgb/2020/09/roger-federer-1.jpg"}
            />)
    }
    return (<div></div>)
}

function Post(props: {
    id: string,
    name: string,
    program: { workoutName: string; exercises: { name: string; sets: number; reps: number }[] }[],
    image: string
  }) {
    return (
      <div className="Post">
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
        </div>
        {props.image ? <><br></br> <img src={props.image} className="Post-image" alt="Exercise" /></> : ""}
      </div>
    );
  }