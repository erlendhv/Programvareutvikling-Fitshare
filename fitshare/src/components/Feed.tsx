import React, { useEffect, useState } from "react";
import { useAuth, useFirestore } from "reactfire";
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

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

  const [postsData, setPostsData] = useState<Post[]>([]);
  const [exercisesData, setExercisesData] = useState<{ [id: string]: Exercise[] }>({});
  const [workoutsData, setWorkoutsData] = useState<{ [id: string]: Workout }>({});

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
          console.log(friends)
        });
      } else {
        setFriendsData([]);
      }

      return () => {
        if (friendsUnsubscribe) friendsUnsubscribe();
      };
    }
  }, [currentUserData]);

  useEffect(() => {
    let postsUnsubscribe: firebase.Unsubscribe | undefined;

    if (friendsData.length > 0) {
      const friendIds = friendsData.map((friend) => friend.id);
      const friendPostsRef = firebase.firestore()
        .collection("posts")
        .where("owner", "in", friendIds)
        .orderBy("timeStamp", "desc")
        .limit(10);

        postsUnsubscribe = friendPostsRef.onSnapshot((querySnapshot: any) => {
        const posts: Post[] = [];
        querySnapshot.forEach((doc: any) => {
          const post = { id: doc.id, ...doc.data() } as Post;

          // Fetch program data
          post.program.forEach((program: any) => {
            const programId = program.id;

            // Fetch workout data
            firebase.firestore()
              .collection("workout")
              .doc(programId)
              .get()
              .then((workoutDoc: any) => {
                console.log(5454545454545)
                if (workoutDoc.exists) {
                  const workout = workoutDoc.data() as Workout;
                  setWorkoutsData((prevWorkoutsData) => ({
                    ...prevWorkoutsData,
                    [programId]: workout,
                  }));

                  // Fetch exercise data
                  const exercisePromises = workout.exercises.map((exerciseId) =>
                  firebase.firestore().collection("exercise").doc(exerciseId).get()
                  );

                  Promise.all(exercisePromises).then((exerciseDocs) => {
                    const exercises: Exercise[] = [];

                    exerciseDocs.forEach((exerciseDoc) => {
                      if (exerciseDoc.exists) {
                        exercises.push(exerciseDoc.data() as Exercise);
                      }
                    });

                    setExercisesData((prevExercisesData) => ({
                      ...prevExercisesData,
                      [programId]: exercises,
                    }));
                  });
                }
              });
          });

          posts.push(post);
        });

        setPostsData(posts);
        console.log(11111111111111111111)
        console.log(postsData);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Feed">
      {postsData.map((post: Post) => (
      <h1>Please</h1>))}
    </div>
  );
};

export default Feed;
