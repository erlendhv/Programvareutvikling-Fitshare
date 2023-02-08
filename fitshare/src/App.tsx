import React from 'react';
import './App.css';
import { FiThumbsUp } from "react-icons/fi";
import { useState } from 'react';
import ExercisePhoto from './ExercisePhoto.jpeg';
import { AiOutlineComment } from "react-icons/ai";

function App() {

  const [post, setPost] = useState({
    name: "Gunnhild Pedersen",
    program: "Mitt program",
    likes: 0,
    liked: false
  });

  return (
    <div className="App">
      <div className="Left-side-bar">

        <div className="Home-icon-box">FS</div>
        <div className="Groups">
          <strong>Groups</strong>

          <div className="Group">
          </div>
          <div className="Group">
          </div>
          <div className="Group">
          </div>
          <div className="Group">
          </div>

        </div>
      </div>
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

        <div className="Group-feed">
          <div className="Post">
            <div className="Post-likes">{post.likes}</div>
            <FiThumbsUp className={"Thumb-icon"}

              style={{ fill: post.liked ? "yellow" : "" }}
              onClick={() => {
                if (post.liked) {
                  setPost({ ...post, likes: post.likes - 1, liked: false })
                } else {
                  setPost({ ...post, likes: post.likes + 1, liked: true })
                }
              }} />
            <strong>Gunnhild Pedersen</strong>
            <br></br>
            <div className="Post-content">
              Program
            </div>
          </div>

          <div className="Post">
            <div className="Post-likes">{post.likes}</div>
            <FiThumbsUp className={"Thumb-icon"}

              style={{ fill: post.liked ? "yellow" : "" }}
              onClick={() => {
                if (post.liked) {
                  setPost({ ...post, likes: post.likes - 1, liked: false })
                } else {
                  setPost({ ...post, likes: post.likes + 1, liked: true })
                }
              }} />
            <strong>Gunnhild Pedersen</strong>
            <br></br>
            <div className="Post-content">
              <img src={ExercisePhoto} className="Post-image" alt="Exercise" />
            </div>
            <div className="Comment-icon">
              Comment
              <AiOutlineComment />
            </div>
          </div>

        </div>

      </div>
      <div className="Right-side-bar">
        <div className="Programs-button">
          Programs
        </div>

        <div className="Friends">
          <strong>Friends</strong>

          <div className="Friend">
            <div className="Friend-profile-pic"></div>
            <div className="Friend-name">Andresen Andersen</div>
          </div>
          <div className="Friend">
            <div className="Friend-profile-pic"></div>
            <div className="Friend-name">Friend 1</div>
          </div>
          <div className="Friend">
            <div className="Friend-profile-pic"></div>
            <div className="Friend-name">Friend 1</div>
          </div>
          <div className="Friend">
            <div className="Friend-profile-pic"></div>
            <div className="Friend-name">Friend 1</div>
          </div>
          <div className="Friend">
            <div className="Friend-profile-pic"></div>
            <div className="Friend-name">Friend 1</div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
