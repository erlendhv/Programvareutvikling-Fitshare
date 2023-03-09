import { Post } from '../components/Post';
import { Group } from '../components/Group';
import { Friend } from '../components/Friend';
import { Popup } from '../components/Popup';
// import './../style/App.css';
import './../style/NewExecution.css';
import ExercisePhoto from '.m../ExercisePhoto.jpeg';
import FitShareLogo from './../FitShareLogo.png';
import { useState, useEffect, Key } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineUserAdd } from 'react-icons/ai'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import firebase from "firebase/compat/app"
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai'


interface Exercise {
    name: string;
    sets: number;
    reps: number;
    id: string;
    owner: string;
}

interface UserData {
    id: string;
    displayName: string;
}


export function NewExecution(Props: { currentUser: firebase.User }) {

    const handleBack = () => {
        navigate('/programs');
    };

    const handleAddExecution = (exerciseId: string) => {
        console.log("Add execution");
    };

    const navigate = useNavigate();

    const [exercises, setExercises] = useState<Exercise[]>([
        {
            name: "Your exercises",
            sets: 0,
            reps: 0,
            id: "1",
            owner: Props.currentUser.uid,
        }
    ]);

    const [searchWord, setSearchWord] = useState("");

    const [users, setUsers] = useState<UserData[]>([]);

    const handleSearch = async () => {
        const usersCollection = firebase.firestore().collection("exercise");
        const querySnapshot = await usersCollection.where("name", ">=", searchWord).get();
        const matchingExercises: Exercise[] = [];
        querySnapshot.forEach((doc) => {
            const exercise = doc.data() as Exercise;
            if (exercise.owner === Props.currentUser.uid) {
                matchingExercises.push(exercise);
            }
        });
        setExercises(matchingExercises);
    };


    return (
        <div className="Execution-container">
            <BiArrowBack className="Back-button" onClick={handleBack} />
            <></>
            <></>
            <h1>New Execution</h1>
            <div className="Searchbar-content">
                <input className="Input-field" type="text" placeholder={"Exercise"} value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
                <AiOutlineSearch className="Popup-search-icon" onClick={handleSearch} />
            </div>
            <div>
                {exercises.map((exercise, key) => (
                    <>
                        {
                            exercise.name.toLowerCase().includes(searchWord.toLowerCase()) ?
                                <div key={key} className="Exercise-popup-inner">
                                    <Friend name={exercise.name} />
                                    <div className="Log-execution-button" onClick={() => handleAddExecution(exercise.id)}>{'Log'}</div>
                                </div>
                                : null
                        }
                    </>
                ))
                }
            </div>
        </div>
    );
}

export default NewExecution;