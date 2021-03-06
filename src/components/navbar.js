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

    const [listeningCountIncreased, setListeningCountIncreased] = useState(false)

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

        //const currentAudio = audio.src
        try {
            const storageRef = base.storage().ref();
            const fileRef = storageRef.child(songs[songIndex].audio_uuid)
            audio.src = await fileRef.getDownloadURL()  
            setListeningCountIncreased(false)
        }catch(error){}
    }

    const incListeningCount = async () => {

        try {

            const db = base.firestore();
            const listening = {
                listening : songs[songIndex].listening + 1
            }
            await db.collection('songs').doc(songs[songIndex].id).set(listening, {merge: true});

            setListeningCountIncreased(true)
        }catch(error){console.log(error)}
    }


    useEffect(() => {

        setSongs(props.songs)

    },[props.songs])

    useEffect(() => {

        setSongIndex(props.currentSongId)

    },[props.currentSongId])

    useEffect(() => {

        if(isAudioPlaying){
            if(audio.src === null){
                getSongLink()
                audio.load()
            }
            audio.load()
            audio.play()

            if(!listeningCountIncreased){
                incListeningCount()
            } 
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