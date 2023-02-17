import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import { Friend } from './Friend'

export function Popup(props: { removePopup: any, isShowingFriends: boolean }) {

    const [searchWord, setSearchWord] = useState("");

    const [friendNames, setFriendNames] = useState([
        "Gunnhild Pedersen",
        "Tord",
        "Man",
        "Tor",
        "Herman Hermansen Hermansen",
        "Tommy",
        "Gard",
        "Zebra",
        "Peder"
    ])

    return (
        <>
            <div className="Overlay" onClick={props.removePopup} />
            <div className="Popup">
                <div className="Popup-inner">
                    <AiOutlineCloseCircle className="Friend-close-button" onClick={props.removePopup} />
                    {/* <button className="Friend-close-button" onClick={props.removePopup}>Close</button> */}
                    <h3>{`Add ${props.isShowingFriends ? "Friends" : "Groups"}`}</h3>
                    <div className="Popup-content">
                        <input className="Input-field" type="text" placeholder={`${props.isShowingFriends ? "Friend" : "Group"} name`} value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
                        <AiOutlineSearch className="Search-for-new-friend" />
                    </div>

                    <div className="Friends-popup">

                        {props.isShowingFriends ? null :
                            <div className="Friends-popup-inner">
                                <div className="Friend">
                                    <div className="Friend-name">Make new Group</div>
                                </div>
                            </div>
                        }

                        {friendNames.map((friendName) => (
                            <div className="Friends-popup-inner">
                                <Friend name={friendName} />
                                <div className="Add-friend-button">{props.isShowingFriends ? "Add" : "Join"}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}