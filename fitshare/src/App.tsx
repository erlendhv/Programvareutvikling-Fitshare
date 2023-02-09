import { Post } from './components/Post';
import { Group } from './components/Group';
import { Friend } from './components/Friend';
import './App.css';
import ExercisePhoto from './ExercisePhoto.jpeg';
import FitShareLogo from './FitShareLogo.png';
import { useState } from 'react';

function App() {

  const [groups, setGroups] = useState([
    { name: "Group 1" },
    { name: "Group 2" },
    { name: "Group 3" },
    { name: "Group 4" },
    { name: "Group 5" },
    { name: "Group 6" },
    { name: "Group 7" },
    { name: "Group 8" },
  ]);

  const [friends, setFriends] = useState([
    { name: "Friends 1" },
    { name: "Friends 2" },
    { name: "Friends 3" },
    { name: "Friends 4" },
    { name: "Friends 5" },
    { name: "Friends 6" },
    { name: "Friends 7" },
    { name: "Friends 8" },
    { name: "Friends 9" },
    { name: "Friends 10" },
    { name: "Friends 11" },
    { name: "Friends 12" },
  ]);

  const [posts, setPosts] = useState([
    { name: "Post 1", program: "Program" },
    { name: "Post 2", program: "Program" },
    { name: "Post 3", program: "Program" },
    { name: "Post 4", program: "Program" },
  ]);

  return (
    <div className="App">
      {/* LEFT SIDE */}
      <div className="Left-side-bar">

        <img className="FitSharelogo" src={FitShareLogo}>

        </img>
        <div className="Groups">
          <strong>Groups</strong>

          {groups.map((group) => (
            <Group name={group.name} />
          ))}

        </div>
      </div>

      {/* MIDDLE */}
      <div className="Middle">
        <div className="Top-bar">
          Group 1
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
            <Post name={post.name} program={post.program} image={ExercisePhoto} />
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
            <Friend name={friend.name} />
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;
