import React, { useEffect, useState } from "react";
import { useAuth, useFirestore } from "reactfire";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface Workout {
  name: string;
  exercises: string[];
}

interface Program {
  workoutName: string;
  exercises: Exercise[];
}

interface Post {
  id: string;
  name: string;
  program: Program[];
  timeStamp: firebase.firestore.Timestamp;
  likes: number;
  owner: string;
  caption?: string;
  image?: string;
}

const Feed: React.FC = () => {
  const [friendsData, setFriendsData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    let friendsUnsubscribe: firebase.Unsubscribe | undefined;

    if (currentUser) {
      const friendsRef = firestore
        .collection("users")
        .doc(currentUser.uid)
        .collection("friends");

      friendsUnsubscribe = friendsRef.onSnapshot((querySnapshot: any) => {
        const friends: any = [];
        querySnapshot.forEach((doc: any) => {
          friends.push(doc.id);
        });
        setFriendsData(friends);
      });
    }

    return () => {
      if (friendsUnsubscribe) friendsUnsubscribe();
    };
  }, [currentUser, firestore]);

  const [postsData, setPostsData] = useState<Post[]>([]);
  const [exercisesData, setExercisesData] = useState<{ [id: string]: Exercise[] }>({});
  const [workoutsData, setWorkoutsData] = useState<{ [id: string]: Workout }>({});

  useEffect(() => {
    let postsUnsubscribe: firebase.Unsubscribe | undefined;

    if (friendsData.length > 0) {
      const friendPostsRef = firestore
        .collection("posts")
        .where("owner", "in", friendsData)
        .orderBy("timeStamp", "desc")
        .limit(10);

      postsUnsubscribe = friendPostsRef.onSnapshot((querySnapshot) => {
        const posts: any = [];
        querySnapshot.forEach((doc) => {
          const post = { id: doc.id, ...doc.data() } as Post;

          // Fetch program data
          post.program.forEach((program) => {
            const programWorkoutId = program.workoutName;

            // Fetch workout data
            firestore
              .collection("workouts")
              .doc(programWorkoutId)
              .get()
              .then((workoutDoc) => {
                if (workoutDoc.exists) {
                  const workout = workoutDoc.data() as Workout;
                  setWorkoutsData((prevWorkoutsData) => ({
                    ...prevWorkoutsData,
                    [programWorkoutId]: workout,
                  }));

                  // Fetch exercise data
                  const exercisePromises = workout.exercises.map((exerciseId) =>
                    firestore.collection("exercises").doc(exerciseId).get()
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
                      [programWorkoutId]: exercises,
                    }));
                  });
                }
              });
          });

          posts.push(post);
        });

        setPostsData(posts);
        setLoading(false);
      }, (error) => {
        setError(error.message);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    return () => {
      if (postsUnsubscribe) postsUnsubscribe();
    };
  }, [firestore, friendsData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Feed">
      {postsData.map((post: Post) => (
        <div key={post.id} className="Post">
          <div className="Post-header">
            <div className="Post-name">{post.name}</div>
            <div className="Post-timestamp">{post.timeStamp.toDate().toLocaleString()}</div>
          </div>
          <div className="Post-body">
            <div className="Post-image-container">
              {post.image && <img src={post.image} alt="Post" />}
            </div>
            <div className="Post-caption">{post.caption}</div>
            <div className="Post-program">
              {post.program.map((program: Program) => {
                const workout = workoutsData[program.workoutName];
                const exercises = exercisesData[program.workoutName] || [];

                return (
                  <div key={program.workoutName}>
                    <div className="Program-name">{workout ? workout.name : program.workoutName}</div>
                    <ul className="Program-exercises">
                      {program.exercises.map((exercise: Exercise, index: number) => {
                        const exerciseData = exercises[index] || exercise;

                        return (
                          <li key={index} className="Exercise">
                            <div className="Exercise-name">{exerciseData.name}</div>
                            <div className="Exercise-sets">{exerciseData.sets} sets</div>
                            <div className="Exercise-reps">{exerciseData.reps} reps</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="Post-likes">{post.likes} likes</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
