import { Post } from '../components/Post';
import { Group } from '../components/Group';
import { Friend } from '../components/Friend';
import './../App.css';
import './../NewProgram.css';
import ExercisePhoto from './../ExercisePhoto.jpeg';
import FitShareLogo from './../FitShareLogo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {AiOutlineUserAdd} from 'react-icons/ai'


function App() {

  const [currentUser, setCurrentUser] = useState("Gunnhild Pedersen");

  const [isShowingPopUp, setIsShowingPopUp] = useState<boolean>(false); 


  const navigate = useNavigate();

  const handlePrograms = () => {
    navigate('/programs');
  }

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
    { id: 0, name: "Friend 1" },
    { id: 1, name: "Friend 2" },
    { id: 2, name: "Friend 3" },
    { id: 3, name: "Friend 4" },
    { id: 4, name: "Friend 5" },
    { id: 5, name: "Friend 6" },
    { id: 6, name: "Friend 7" },
    { id: 7, name: "Friend 8" },
    { id: 8, name: "Friend 9" },
    { id: 9, name: "Friend 10" },
    { id: 10, name: "Friend 11" },
    { id: 11, name: "Friend 12" },
  ]);

  const [posts, setPosts] = useState([
    { id: uuidv4(), name: "Gunnhild Pedersen", program: [{ workoutName: "Leg day", exercises: [{ name: "Bench Press", sets: 3, reps: 10 }, { name: "Squat", sets: 3, reps: 10 }] }, { workoutName: "Workout 2", exercises: [{ name: "Bench Press", sets: 3, reps: 10 }, { name: "Squat", sets: 3, reps: 10 }] }], image: ExercisePhoto, likes: 0, liked: false, comments: [{ person: "Roger", content: "Thats crazy!" }, { person: "Roger", content: "No way!" }, { person: "Kenneth", content: "That is the most crazy thing I have ever seen in my entire life! I really hope I can look just like you in the future! You are the person I dream of being in my sleep!" }, { person: "Sen", content: "I want you!" }] },
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

  function addComment(id: string, comment: string) {
    const newPosts = [...posts]

    const post = newPosts.find(post => post.id === id)

    if (post && comment !== "") {
      post.comments.push({ person: currentUser, content: comment })
    }

    setPosts(newPosts)
    console.log(newPosts)
  }


  return (
    <div className="App">
      {/* LEFT SIDE */}
      <div className="Left-side-bar">

        <img className="FitSharelogo" src={FitShareLogo} alt="FitShareLogo">

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
              likes={post.likes} liked={post.liked} comments={post.comments}
              toggleLiked={toggleLiked} addComment={addComment} />
          ))}

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="Right-side-bar">
        <div className="Programs-button" onClick={handlePrograms}>
          Programs
        </div>

        <div className="Friends">
          <strong>Friends</strong>
          <AiOutlineUserAdd className="Add-friend-button" 
          onClick={() => {setIsShowingPopUp(true)}}/>
          
          {friends.map((friend) => (
            <Friend key={friend.id} name={friend.name} />
          ))}

        </div>

      </div>
      
          {
            isShowingPopUp ? (
              <Popup removePopup={() => {setIsShowingPopUp(false)}}/>
            ) : null
          }
    </div>
  );
}

function Popup(props: {removePopup: any} ) {

  const [searchWord, setSearchWord] = useState("");

  return (
    <>
      <div className="Overlay" onClick={props.removePopup}/>
      <div className="Popup">
        <div className="Popup-inner">
        <button onClick={props.removePopup}>Close</button>
        <h3>Add Friend</h3>
        <div className="Popup-content">
          <input className="Input-field" type="text" placeholder="Search for friends" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
        </div>
        <div className="Friends-popup">
          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>
          
          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>

          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>

          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>

          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>

          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>

          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>

          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>

          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>

          <div className="Friends-popup-inner">
            <Friend name="Gunnhild Pedersen" />
            <div className="Add-button">Add</div>
          </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
