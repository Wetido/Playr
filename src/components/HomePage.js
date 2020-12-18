import React, {useState, useEffect} from 'react';
import "../css/add-song.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import base from "../db/firebase"
import 'firebase/firestore';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


const MainPage = () => {

    const [songName, setSongName] = useState(null)
    const [songAuthor, setSongAuthor] = useState(null)
    const [coverImageFile, setCoverImageFile] = useState(null)
    const [audioFile, setAudoFile] = useState(null)


    const handleChangeAudio = async (e) => {
        setAudoFile(e.target.files[0])
    }

    const handleChangeCoverImage = async (e) => {
        setCoverImageFile(e.target.files[0])
    }
    
    return (

        <div>
            <div className="recomendedSongs">
                Recomendet songs <br></br>
                <button class="recoButton">
                    <img src="#">title</img>
                </button>
                <button class="recoButton">
                    <img src="#">title</img>
                </button>
                <button class="recoButton">
                    <img src="#"></img>
                </button>
                <button class="recoButton">
                    <img src="#"></img>
                </button>
                <button class="recoButton">
                    <img src="#"></img>
                </button>
            </div>
            <div className="lastPlayingSongs">
                Last Playing<br></br>
                <button class="lastButton">
                    <img src="#"></img>
                </button>
                <button class="lastButton">
                    <img src="#"></img>
                </button>
                <button class="lastButton">
                    <img src="#"></img>
                </button>
                <button class="lastButton">
                    <img src="#"></img>
                </button>
                <button class="lastButton">
                    <img src="#"></img>
                </button>
            </div>
        </div>
    );
}

export default MainPage;
