import firebase from "firebase/compat/app";
import './../style/NewProgram.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface AdPost {
    owner: string;
    id: string,
    description: string
    image: string;
}

const NewAd = (props: { currentAdvertiserId: string }) => {

    const [description, setDescription] = useState<string>("Dette er en description");
    const [url, setURL] = useState("");

    const [businessName, setBusinessName] = useState<string>("");

    const [postedFeedback, setPostedFeedback] = useState<boolean>(false);

    useEffect(() => {
        const advertiserRef = firebase.firestore().collection("advertiser").doc(props.currentAdvertiserId);
        advertiserRef.get().then((doc) => {
            if (doc.exists) {
                setBusinessName(doc.data()?.businessName);
            }
        });
    }, []);

    async function handleImage(file: File) {
        const path = `/images/${file?.name}`;
        const ref = firebase.storage().ref(path);
        await ref.put(file as File);
        const url = await ref.getDownloadURL();
        setURL(url);
    }

    const publishPost = async () => {

        const newPost: AdPost = {
            owner: businessName,
            id: uuidv4(),
            description: description,
            image: url,
        };

        const programCollection = firebase.firestore().collection("ads");
        programCollection.doc(newPost.id).set(newPost);

        setURL("");
        setPostedFeedback(true);
    };

    const handleSignOut = () => {
        window.location.reload();
    };

    return (
        <div className="New-Post">
            <button className="Sign-out-button" style={{ position: "absolute", top: "20px", right: "20px" }} onClick={handleSignOut}>Sign out</button>
            <h1>Customize your advertisement</h1>
            <div className="Overviews">
                <div className="Overview">
                    <AdPostPreview
                        id={uuidv4()}
                        name={"Ad: " + businessName}
                        setDescription={setDescription}
                        handleImage={handleImage}
                        image={url}
                    />
                </div>
            </div>
            <div className="New-post-button" onClick={publishPost}>Post</div>
            {postedFeedback ? <div className="Feedback">Your post has been posted!</div> : null}
        </div>
    );
}

export default NewAd;

function AdPostPreview(props: {
    id: string;
    name: string;
    setDescription: (description: string) => void;
    handleImage: (image: File) => void;
    image: string;
}) {

    const [newPostDescription, setNewPostDescription] = useState<string>("");

    return (
        <div className="Post">
            <strong>{props.name}</strong>
            <br></br>
            <div className="Post-content">
                <input className="Input-field" type="text" placeholder="Description" value={newPostDescription} onChange={(e) => {
                    setNewPostDescription(e.target.value);
                    props.setDescription(e.target.value)
                }} />
                <br></br>
                {props.image ? <><br></br> <img src={props.image} className="Post-image" alt="Exercise" /><br></br></> : null}
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            props.handleImage(e.target.files[0]);
                        }
                    }}
                />
            </div>
        </div>
    );
}