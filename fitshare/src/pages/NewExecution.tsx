import { Post } from '../components/Post';
import { Group } from '../components/Group';
import { Friend } from '../components/Friend';
import { Popup } from '../components/Popup';
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
import { GiWeightLiftingUp } from 'react-icons/gi'
import { Execution } from '../components/Execution';


interface Exercise {
    name: string;
    sets: number;
    reps: number;
    id: string;
    owner: string;
}

interface Execution {
    id: string;
    name: string;
    owner: string;
    weight: string;
    date: Date;
}


export function NewExecution(Props: { currentUser: firebase.User }) {

    const handleBack = () => {
        navigate('/programs');
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

    const [weight, setWeight] = useState("");

    const [loggedExercises, setLoggedExercises] = useState<Exercise[]>([]);

    const [searchWord, setSearchWord] = useState("");

    const [exerciseNames, setExerciseNames] = useState<string[]>([]);

    const handleSearch = async () => {
        exerciseNames.splice(0);
        const usersCollection = firebase.firestore().collection("exercise");
        const querySnapshot = await usersCollection.where("name", ">=", searchWord).get();
        const matchingExercises: Exercise[] = [];
        querySnapshot.forEach((doc) => {
            const exercise = doc.data() as Exercise;
            if (exercise.owner === Props.currentUser.uid && !exerciseNames.includes(exercise.name)) {
                matchingExercises.push(exercise);
                exerciseNames.push(exercise.name);
            }
        });
        setExercises(matchingExercises);
    };

    const handleAddExecution = (exercise: Exercise) => {
        console.log("Add execution");
        if (weight !== "") {
            setLoggedExercises([...loggedExercises, exercise]);
            saveWeight(exercise);
        }
    };

    const saveWeight = async (exercise: Exercise) => {
        const newExecution: Execution = {
            id: uuidv4(),
            name: exercise.name,
            owner: Props.currentUser.uid,
            weight: weight,
            date: new Date(),
        };

        const executionCollection = firebase.firestore().collection("execution");
        executionCollection.doc(newExecution.id).set(newExecution);
        setWeight("");
    }

    return (
        <div className="Execution-container">
            <BiArrowBack className="Back-button" onClick={handleBack} />
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
                                    <Execution name={exercise.name} />
                                    <input className="Input-field" type="text" placeholder={"Weight"}
                                        onChange={(e) => Number.isInteger(parseInt(e.target.value)) ? setWeight(e.target.value) : null} />
                                    <div className="Log-execution-button"
                                        onClick={() => handleAddExecution(exercise)}>{loggedExercises.includes(exercise) ? 'Logged' : 'Log'}</div>
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