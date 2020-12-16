import React, {useState, useEffect, useContext } from 'react';
import base from "../db/firebase"
import 'firebase/storage';
import { AuthContext } from "../db/auth";

const Navbar = (props) => {

    const { currentUser } = useContext(AuthContext);

    const [songs, setSongs] = useState([])
    const [audio] = useState(new Audio())

    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [songIndex, setSongIndex] = useState(0)

    const [fetched, setFetched] = useState(false)

    const changeAudioHandler = () => {
        setIsAudioPlaying(!isAudioPlaying)
    }
    
    const handlePrevSong = () => {
        if(songIndex - 1 >= 0){
            setSongIndex(songIndex - 1);
        }

    }

    const handleNextSong = () => {
        if(songIndex + 1 < songs.length){
            setSongIndex(songIndex + 1);
        }
    }

    const getSongLink = async () =>{

        try {
            const storageRef = base.storage().ref();
            const fileRef = storageRef.child(songs[songIndex].audio_uuid)
            audio.src = await fileRef.getDownloadURL()
        }catch(error){}
    }


    useEffect(() => {

        setSongs(props.songs)
        //getSongLink()

    },[props.songs])


    useEffect(() => {

        if(isAudioPlaying){
            if(audio.src === null){
                getSongLink()
                audio.load()
            }
            audio.play()
        }else{
            audio.pause()
        }
    }, [isAudioPlaying])


    useEffect(() => {

        getSongLink()
        setIsAudioPlaying(false)
    },[songIndex])


    return (
        <div className="navbar">
            <div>
                Aktualnie gra - {songs.length !== 0 ? songs[songIndex].name : "Brak piosenki"}
            </div>
            <div>
                <button onClick={handlePrevSong}>Previous</button>
            </div>
            <div>
                {isAudioPlaying === true ? 
                <button onClick={changeAudioHandler}>Stop</button> 
                : <button onClick={changeAudioHandler}>Start</button>}
            </div>
            <div>
                <button onClick={handleNextSong}>Next</button>
            </div>
            <div>
                {currentUser.email}
            </div>
            <a class="nav-link" onClick={() => base.auth().signOut()}>
                Sign Out <span class="sr-only">(current)</span>
            </a>
        </div>
        
    );
}

export default Navbar;