import React from 'react';
import firebase from "firebase/compat/app";
import { useState, useEffect } from 'react';
import { NonInteractablePost } from './NonInteractablePost';


interface UserProps {
  inGroupFeed: boolean;
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


  if (props.inGroupFeed) {
    return null
  }
  if (interest === 1) {
    return (<NonInteractablePost
      key={1}
      id={"1"}
      name={"Recommended Weight Loss Program For You"}
      description="Since you are interested in weight loss, we recommend this program. This program will help you increase metabolism over time, meaning you will burn more calories which can contribute to the calorie deficit required for weight loss."
      program={[{
        workoutName: "Lower Body Strength",
        exercises: [
          { name: "Goblet squat", sets: 3, reps: 12 },
          { name: "Deadlift", sets: 3, reps: 12 },
          { name: "Walking lunge with dumbells (10 on each side)", sets: 3, reps: 20 },
          { name: "Leg curl", sets: 3, reps: 12 },
          { name: "Leg extension", sets: 3, reps: 12 },
        ]
      }, {
        workoutName: "Low intensity cardio",
        exercises: [
          { name: "Walking, light jogging, or your preferred method of cardio for at least 20 minutes", sets: 1, reps: 1 },
        ]
      }, {
        workoutName: "Upper Body Strenght",
        exercises: [
          { name: "Lat pulldown", sets: 3, reps: 12 },
          { name: "Dumbbell overhead press", sets: 3, reps: 12 },
          { name: "Dumbbell row", sets: 3, reps: 12 },
          { name: "Dumbbell bench press", sets: 3, reps: 12 },
          { name: "Biceps curl", sets: 3, reps: 12 },
          { name: "Triceps extension", sets: 3, reps: 12 },
        ]
      }, {
        workoutName: "Low intensity cardio",
        exercises: [
          { name: "Walking, light jogging, or your preferred method of cardio for at least 20 minutes", sets: 1, reps: 1 },
        ]
      }, {
        workoutName: "Interval conditioning (perform each exercise at a hard pace)",
        exercises: [
          { name: "Jump squat", sets: 3, reps: 15 },
          { name: "Dumbbell overhead press", sets: 3, reps: 15 },
          { name: "Dumbbell row", sets: 3, reps: 15 },
          { name: "Dumbbell bench press", sets: 3, reps: 15 },
          { name: "Biceps curl", sets: 3, reps: 15 },
          { name: "Triceps extension", sets: 3, reps: 15 },
        ]
      }]}
      image={"https://firebasestorage.googleapis.com/v0/b/fitshare-7b3ca.appspot.com/o/images%2Fweight_loss.jpg?alt=media&token=1e8c6983-4182-4250-8e85-8ef32ead0f62"}
      isAd={false}
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
      isAd={false}
    />)
  } else if (interest === 3) {
    return (<NonInteractablePost
      key={3}
      id={"3"}
      name={"Recommended Endurance Program For You"}
      description="Since you are interested in endurance training, we recommended this program for you. It is a 3 day split program that focuses on improving your endurance."
      program={[{
        workoutName: "Interval training",
        exercises: [
          { name: "Warm up: 5-10 minutes of light cardio (e.g. jogging, cycling)", sets: 1, reps: 1 },
          { name: "Intervals: Alternate between 30 seconds of all-out effort (e.g. sprints, jumping jacks) and 30 seconds of active recovery (e.g. jogging, walking) for a total of 20-30 minutes", sets: 1, reps: 1 },
          { name: "Cool-down: 5-10 minutes of stretching", sets: 1, reps: 1 }
        ]
      }, {
        workoutName: "Steady-State Cardio (30 seconds rest between each exercise",
        exercises: [
          { name: "Warm up: 5-10 minutes of light cardio (e.g. jogging, cycling)", sets: 1, reps: 1 },
          { name: "Steady-State Cardio: 30-60 minutes of continuous cardio at a moderate intensity (e.g. jogging, cycling, swimming)", sets: 1, reps: 1 },
          { name: "Cool-down: 5-10 minutes of stretching", sets: 1, reps: 1 }
        ]
      }, {
        workoutName: "Hill repeats",
        exercises: [
          { name: "Warm up: 5-10 minutes of light cardio", sets: 1, reps: 1 },
          { name: "Run as fast as you can up the hill, walk or jog down. Rest for 3 minutes betweeen each set", sets: 3, reps: 10 },
          { name: "Cool-down: 5-10 minutes of stretching", sets: 1, reps: 1 }
        ]
      }
      ]}
      image={"https://firebasestorage.googleapis.com/v0/b/fitshare-7b3ca.appspot.com/o/images%2Fendurance.jpg?alt=media&token=0c57bf30-8e98-459d-9e26-667ecda3e604"}
      isAd={false}
    />)
  }
  return (<div></div>)
}