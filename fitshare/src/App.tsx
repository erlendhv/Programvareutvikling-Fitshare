import { Post } from './components/Post';
import { Group } from './components/Group';
import { Friend } from './components/Friend';
import './App.css';
import ExercisePhoto from './ExercisePhoto.jpeg';
import FitShareLogo from './FitShareLogo.png';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [currentGroup, setCurrentGroup] = useState("Group 1");

  const [groups, setGroups] = useState([
    { id: 0, name: "Group 1" },
    { id: 1, name: "Group 2" },
    { id: 2, name: "Group 3" },
    { id: 3, name: "Group 4" },
    { id: 4, name: "Group 5" },
    { id: 5, name: "Group 6" },
    { id: 6, name: "Group 7" },
    { id: 7, name: "Group 8" },
  ]);

  const [friends, setFriends] = useState([
    { id: 0, name: "Friends 1" },
    { id: 1, name: "Friends 2" },
    { id: 2, name: "Friends 3" },
    { id: 3, name: "Friends 4" },
    { id: 4, name: "Friends 5" },
    { id: 5, name: "Friends 6" },
    { id: 6, name: "Friends 7" },
    { id: 7, name: "Friends 8" },
    { id: 8, name: "Friends 9" },
    { id: 9, name: "Friends 10" },
    { id: 10, name: "Friends 11" },
    { id: 11, name: "Friends 12" },
  ]);

  const [posts, setPosts] = useState([
    { id: uuidv4(), name: "Gunnhild Pedersen", program: [{ workoutName: "Leg day", exercises: [{ name: "Bench Press", sets: 3, reps: 10 }, { name: "Squat", sets: 3, reps: 10 }] }, { workoutName: "Workout 2", exercises: [{ name: "Bench Press", sets: 3, reps: 10 }, { name: "Squat", sets: 3, reps: 10 }] }], image: ExercisePhoto, likes: 0, liked: false, comments: ["Thats crazy!", "No way!", "Dude, that is the most crazy thing I have ever seen in my entire life!"] },
    { id: uuidv4(), name: "Gunnhild Pedersen", program: [{ workoutName: "Pull", exercises: [{ name: "Bench Press", sets: 3, reps: 10 }, { name: "Squat", sets: 3, reps: 10 }] }, { workoutName: "Workout 2", exercises: [{ name: "Bench Press", sets: 3, reps: 10 }, { name: "Squat", sets: 3, reps: 10 }] }], image: "", likes: 499, liked: true, comments: [] },
  ]);

  function toggleLiked(id: string) {
    const newPosts = [...posts]
    const post = newPosts.find(post => post.id === id)

    if (post != null) {
      post.liked = !post.liked
      if (post.liked) {
        post.likes += 1
      } else {
        post.likes -= 1
      }
    }
    setPosts(newPosts)
  }


  return (
    <div className="App">
      {/* LEFT SIDE */}
      <div className="Left-side-bar">

        <img className="FitSharelogo" src={FitShareLogo}>

        </img>
        <div className="Groups">
          <strong>Groups</strong>

          {groups.map((group) => (
            <Group key={group.id} name={group.name} />
          ))}

        </div>
      </div>

      {/* MIDDLE */}
      <div className="Middle">
        <div className="Top-bar">
          {currentGroup}
        </div>

        <div className="Post-buttons">
          <div className="Post-button">
            Post Program
          </div>

          <div className="Post-button">
            Post Image
          </div>
        </div>

        <div className="Group-icon-feed">

          {posts.map((post) => (
            <Post key={post.id} id={post.id} name={post.name} program={post.program} image={post.image}
              likes={post.likes} liked={post.liked} comments={post.comments} toggleLiked={toggleLiked} />
          ))}

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="Right-side-bar">
        <div className="Programs-button">
          Programs
        </div>

        <div className="Friends">
          <strong>Friends</strong>

          {friends.map((friend) => (
            <Friend key={friend.id} name={friend.name} />
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;
