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
    return (<NonInteractablePost
      key={1}
      id={"1"}
      name={"Lance Armstrong"}
      description="WOOW"
      program={[{
        workoutName: "NAME",
        exercises: [
          { name: "Up the hill", sets: 3, reps: 10 },
          { name: "Squat", sets: 3, reps: 10 },
        ]
      }]}
      image={"https://www.cyclingweekly.com/wp-content/uploads/2020/09/lance-armstrong-1.jpg"}
    />)
  } else if (interest === 2) {
    return (<NonInteractablePost
      key={2}
      id={"2"}
      name={"Recommended Program For You"}
      description="Since you are interested in strength, we recommend this program. It is a 3 day split program that focuses on the major muscle groups. It is a beginner program, so you can start with this and then move on to more advanced programs."
      program={[{
        workoutName: "Upper A",
        exercises: [
          { name: "Bench Press", sets: 3, reps: 10 },
          { name: "Incline Bench Press", sets: 3, reps: 8 },
          { name: "One Arm Dumbbell Row", sets: 3, reps: 10 },
          { name: "Seated Barbell Press", sets: 3, reps: 8 },
          { name: "Pull Ups", sets: 3, reps: 10 },
          { name: "Skullcrushers", sets: 3, reps: 10 },
          { name: "Dumbbell Curl", sets: 3, reps: 10 }
        ],
      }, {
        workoutName: "Lower A",
        exercises: [
          { name: "Squat", sets: 3, reps: 10 },
          { name: "Leg Press", sets: 3, reps: 10 },
          { name: "Leg Extension", sets: 3, reps: 10 },
          { name: "Leg Curl", sets: 3, reps: 10 },
          { name: "Calf Raise", sets: 3, reps: 10 },
          { name: "Seated Calf Raise", sets: 3, reps: 10 },
        ],
      }, {
        workoutName: "Upper B",
        exercises: [
          { name: "Dumbbell Bench Press", sets: 3, reps: 10 },
          { name: "Barbell Row", sets: 3, reps: 8 },
          { name: "Lat Pull Down", sets: 3, reps: 10 },
          { name: "Pull Ups", sets: 3, reps: 10 },
          { name: "Cable Tricep Extensions", sets: 3, reps: 10 },
          { name: "Dumbbell Curl", sets: 3, reps: 10 }
        ],
      }, {
        workoutName: "Lower B",
        exercises: [
          { name: "Stiff Leg Deadlift", sets: 3, reps: 15 },
          { name: "Leg Press", sets: 3, reps: 8 },
          { name: "Walking Dumbbell Lunge", sets: 3, reps: 10 },
          { name: "Cable Crunch", sets: 3, reps: 15 },
          { name: "Calf Raise", sets: 3, reps: 20 },
          { name: "Russian Twist", sets: 3, reps: 20 },
        ],
      }]}
      image={"https://firebasestorage.googleapis.com/v0/b/fitshare-7b3ca.appspot.com/o/images%2FRipped%20Guy.webp?alt=media&token=41327429-4dbc-4303-b70c-10ee8c8b57c8"}
    />)
  } else if (interest === 3) {
    return (<NonInteractablePost
      key={3}
      id={"3"}
      name={"Roger Federer"}
      description=""
      program={[{
        workoutName: "Tennis",
        exercises: [
          { name: "Up the hill", sets: 3, reps: 10 },
          { name: "Squat", sets: 3, reps: 10 },
        ]
      }]}
      image={"https://firebasestorage.googleapis.com/v0/b/fitshare-7b3ca.appspot.com/o/images%2FRipped%20Guy.webp?alt=media&token=41327429-4dbc-4303-b70c-10ee8c8b57c8"}
    />)
  }
  return (<div></div>)
}

function NonInteractablePost(props: {
  id: string,
  name: string,
  description: string,
  program: { workoutName: string; exercises: { name: string; sets: number; reps: number }[] }[],
  image: string
}) {
  return (
    <div className="Post">
      <strong>{props.name}</strong>
      <br></br>
      <div className="Post-content">
        <p className="Post-description">{props.description}</p>
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