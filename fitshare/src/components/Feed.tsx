import React, { useEffect, useState } from "react";
import { useAuth, useFirestore } from "reactfire";
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Post } from "./Post";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
}

interface Workout {
  id: string;
  name: string;
  exercises: string[];
}

interface Program {
  id: string;
  owner: string;
  name: string;
  workouts: Workout[];
}

interface Friend {
  id: string;
  displayName: string;
  programs: any[]; // You can replace "any" with the type definition for your program data
  groups: any[]; // You can replace "any" with the type definition for your group data
  posts: any[]; // You can replace "any" with the type definition for your post data
}


interface Post {
  id: string;
  name: string;
  program: Program;
  timeStamp: firebase.firestore.Timestamp;
  likes: number;
  owner: string;
  caption?: string;
  image?: string;
}
interface UserProps {
  currentUser: firebase.User;
}

const Feed: React.FC<UserProps> = ({currentUser}) => {
  const [friendsData, setFriendsData] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //const { currentUser } = useAuth();
  const currentUserRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUser.uid);
  const [currentUserData] = useDocumentData(currentUserRef as any);

  useEffect(() => {
    let friendsUnsubscribe: firebase.Unsubscribe | undefined;

    if (currentUserData) {
      if (currentUserData.friends.length > 0) {
        const friendsRef = firebase
          .firestore()
          .collection("users")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            currentUserData.friends
          );

        friendsUnsubscribe = friendsRef.onSnapshot((querySnapshot) => {
          const friends: any = [];
          querySnapshot.forEach((doc) => {
            friends.push(doc.data());
          });
          setFriendsData(friends);
        });
      } else {
        setFriendsData([]);
      }

      return () => {
        if (friendsUnsubscribe) friendsUnsubscribe();
      };
    }
  }, [currentUserData]);

  const [postsData, setPostsData] = useState<Post[]>([]);
 // const [programData, setProgramData] = useState<Program[]>([]);
const [exercisesData, setExercisesData] = useState<{ [id: string]: Exercise[] }>({});
const [workoutsData, setWorkoutsData] = useState<{ [id: string]: Workout }>({});

useEffect(() => {
  let postsUnsubscribe: firebase.Unsubscribe | undefined;

  if (friendsData.length > 0) {
    const friendIds = friendsData.map((friend) => friend.id);
    const friendPostsRef = firebase.firestore()
      .collection("posts")
      .where("owner", "in", friendIds);
      //.orderBy("timeStamp", "desc")
      //.limit(10);
    postsUnsubscribe = friendPostsRef.onSnapshot(async (querySnapshot: any) => {
      const posts: Post[] = [];

      for (const doc of querySnapshot.docs) {
        const post = {...doc.data(), id: doc.id } as any;

        // Fetch program data
        const programId = post.program;

        try {
          // Fetch workouts data
          const programDoc = await firebase.firestore()
            .collection("programs")
            .doc(programId)
            .get();

          if (programDoc.exists) {
            const programData = programDoc.data();
            const workoutIds = programData?.workouts;

            const workouts: { [id: string]: Workout } = {};
            const workoutDocs = await Promise.all(
              workoutIds.map((workoutId: string) =>
                firebase.firestore()
                  .collection("workout")
                  .doc(workoutId)
                  .get()
              )
            );

            workoutDocs.forEach((workoutDoc) => {
              if (workoutDoc.exists) {
                const workout = workoutDoc.data() as Workout;
                workouts[workout.id] = workout;
              }
            });

            setWorkoutsData((prevWorkoutsData) => ({
              ...prevWorkoutsData,
              ...workouts,
            }));

            // Fetch exercises data
            const exercises: { [id: string]: Exercise[] } = {};
            for (const workoutId in workouts) {
              const workout = workouts[workoutId];
              const exerciseDocs = await Promise.all(
                workout.exercises.map((exerciseId) =>
                  firebase.firestore()
                    .collection("exercise")
                    .doc(exerciseId)
                    .get()
                )
              );

              const workoutExercises: Exercise[] = [];
              exerciseDocs.forEach((exerciseDoc) => {
                if (exerciseDoc.exists) {
                  const exercise = exerciseDoc.data() as Exercise;
                  workoutExercises.push(exercise);
                }
              });
              exercises[workoutId] = workoutExercises;
            }

            setExercisesData((prevExercisesData) => ({
              ...prevExercisesData,
              ...exercises,
            }));
          }
        } catch (error) {
          console.log("Error fetching program data:", error);
        }

        posts.push(post);
      }

      setPostsData(posts);
      setLoading(false);
    }, (error: any) => {
      setError(error.message);
      setLoading(false);
    });
  } else {
    setLoading(false);
  }

  return () => {
    if (postsUnsubscribe) postsUnsubscribe();
  };
}, [firebase.firestore(), friendsData]);

 /* if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }*/
  console.log("postsData", postsData);
  //console.log("programsData", programData);
  console.log("exercisesData", exercisesData);
  console.log("workoutsData", workoutsData);

  
  return (
    <div className="Feed">
      {postsData.map((post: Post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.name}
          program={{
            id: post.program.id,
            owner: post.program.owner,
            name: post.program.name,
            workouts: post.program.workouts.map((workout) => ({
              id: workout.id,
              name: workout.name,
              exercises: workout.exercises.map((exerciseId) => ({
                ...exercisesData[exerciseId],
                id: exerciseId,
              })),
            })),
          }}
          likes={post.likes}
          liked={post.liked}
          comments={post.comments}
          toggleLiked={togglePostLiked}
          addComment={addPostComment}
        />
      ))}
    </div>
  );
};

export default Feed;
