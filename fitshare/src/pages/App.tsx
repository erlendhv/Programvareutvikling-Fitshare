import firebase from "firebase/compat/app";
import { Post } from '../components/Post';
import { Group } from '../components/Group';
import { Friend } from '../components/Friend';
import { Popup } from '../components/Popup';
import './../style/App.css';
import './../style/NewProgram.css';
import ExercisePhoto from './../ExercisePhoto.jpeg';
import FitShareLogo from './../FitShareLogo.png';
import { useState, useEffect, Key } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import { Feed } from "../components/Feed";


interface UserProps {
  currentUser: firebase.User;
}

interface GroupData {
  id: string;
  name: string;
  members: string[];
  admin: string;
}

interface Friend {
  id: string;
  displayName: string;
  programs: any[]; // You can replace "any" with the type definition for your program data
  groups: any[]; // You can replace "any" with the type definition for your group data
  posts: any[]; // You can replace "any" with the type definition for your post data
}

const App: React.FC<UserProps> = ({ currentUser }) => {
  const [isShowingFriendPopUp, setIsShowingFriendPopUp] =
    useState<boolean>(false);

  const [isShowingGroupPopUp, setIsShowingGroupPopUp] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handlePrograms = () => {
    navigate("/programs");
  };

  const [inGroupFeed, setInGroupFeed] =
    useState<boolean>(false);


  const handleSetCurrentPage = (group: GroupData) => {

  }

  const goToHomePage = () => {
    setInGroupFeed(false);
    setCurrentPageName("Homepage")
  }

  const [currentPageName, setCurrentPageName] = useState<string>("Homepage");


  // This is to get data about currentuser's friends
  // ref to current user in users collection firebase
  const currentUserRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUser.uid);
  const [currentUserData] = useDocumentData(currentUserRef as any);

  const [friendsData, setFriendsData] = useState<any>(null);
  const [groupsData, setGroupsData] = useState<any>(null);


  useEffect(() => {
    let friendsUnsubscribe: firebase.Unsubscribe | undefined;
    let groupsUnsubcribe: firebase.Unsubscribe | undefined;

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

      if (currentUserData.groups.length > 0) {
        const groupsRef = firebase
          .firestore()
          .collection("groups")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            currentUserData.groups
          );

        groupsUnsubcribe = groupsRef.onSnapshot((querySnapshot) => {
          const groups: any = [];
          querySnapshot.forEach((doc) => {
            groups.push(doc.data());
          });
          setGroupsData(groups);
        });
      } else {
        setGroupsData([]);
      }

      return () => {
        if (friendsUnsubscribe) friendsUnsubscribe();
        if (groupsUnsubcribe) groupsUnsubcribe();
      };
    }
  }, [currentUserData]);
  return (
    <div className="App">
      {/* LEFT SIDE */}
      <div className="Left-side-bar">
        <img
          className="FitSharelogo"
          src={FitShareLogo}
          alt="FitShareLogo"
          onClick={goToHomePage}
        ></img>
        <div className="Groups">
          <strong>Groups</strong>
          <AiOutlineUsergroupAdd
            className="Add-group"
            onClick={() => {
              setIsShowingGroupPopUp(true);
            }}
          />
          {groupsData
            ? groupsData.map((group: GroupData) => (
              <Group key={group.id} name={group.name}
                onClick={() => handleSetCurrentPage(group)} />
            ))
            : null}
        </div>
      </div>

      {/* MIDDLE */}
      <div className="Middle">
        <div className="Top-bar">{currentPageName}</div>

        <div className="Post-button" onClick={handlePost}>
          Create Post
        </div>

        <Feed currentUser={currentUser} />
      </div>

      {/* RIGHT SIDE */}
      <div className="Right-side-bar">
        <div className="Programs-button" onClick={handlePrograms}>
          Programs
        </div>

        <div className="Friends">
          <strong>Friends</strong>
          <AiOutlineUserAdd
            className="Add-friend-icon"
            onClick={() => {
              setIsShowingFriendPopUp(true);
            }}
          />
          {friendsData
            ? friendsData.map((friend: any) => (
              <Friend key={friend.id} name={friend.displayName} />
            ))
            : null}
        </div>
      </div>

      {isShowingFriendPopUp || isShowingGroupPopUp ? (
        <Popup
          removePopup={() => {
            setIsShowingFriendPopUp(false);
            setIsShowingGroupPopUp(false);
          }}
          isShowingFriends={isShowingFriendPopUp}
          currentUser={currentUser}
          friendsData={friendsData}
          groupsData={groupsData}
        />
      ) : null}

      <div>
        {inGroupFeed ? (
          // Code to execute if `inGroupFeed` is true
          <>
            handleSetCurrentPage()
          </>
        ) : (
          // Code to execute if `inGroupFeed` is false
          <>

          </>
        )}
      </div>
    </div>
  );
};

export default App;
