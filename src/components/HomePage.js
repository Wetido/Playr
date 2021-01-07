import React, {useState, useEffect} from 'react';
import "../css/Home.css"
import base from "../db/firebase"
import 'firebase/firestore';

const HomePage = (props) => {

    const [songs, setSongs] = useState([]);
    const [coverImageUrls, setCoverImageUrls] = useState([])

    const getSongLink = async () =>{

        try {
            const tempList = []
            for(let i = 0; i < songs.length; i++){
                const storageRef = base.storage().ref();
                const fileRef = storageRef.child(songs[i].cover_image_uuid)
                tempList.push(await fileRef.getDownloadURL())
            }
            setCoverImageUrls(tempList)
        
        }catch(error){}
    }

    useEffect(() =>{

        getSongLink()
    },[songs])

    useEffect(() => {
        
        const fetchData = async () => {
            const db = base.firestore();
            const date = await db.collection("songs").orderBy("listening", "desc").limit(5)
            
            date.onSnapshot((data) => {
                setSongs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })
        }

        fetchData();
        
    }, []);



    return (

        <div>
            <div className="recomendedSongs">
                Recomended songs <br></br>
                {songs.map((song, i) => (
                    <button class="recoButton"  onClick={() => props.handleChangeSong(song.id)}>
                        <img class="recoImg" src={coverImageUrls[i]}></img>
                    </button>
                ))}
                {/* <button class="recoButton">
                    <img></img>
                </button>
                <button class="recoButton">
                    <img></img>
                </button>
                <button class="recoButton">
                    <img></img>
                </button>
                <button class="recoButton">
                <   img></img>
                </button>
                <button class="recoButton">
                    <img></img>
                </button> */}
            </div>
            <div className="lastPlayingSongs">
                Recomended Artists<br></br>
                {songs.map((songs, i) => (
                    <button class="recoButton"  onClick={() => props.handleChangeSong(songs.id)}>
                        <img class="recoImg" src={coverImageUrls[i]}></img>
                    </button>
                ))}

                {/*<button class="lastButton">
                    <img></img>
                </button>
                <button class="lastButton">
                    <img></img>
                </button>
                <button class="lastButton">
                    <img></img>
                </button>
                <button class="lastButton">
                    <img></img>
                </button>
                <button class="lastButton">
                    <img></img>
            </button>*/}
            </div>
        </div>
    );
}

export default HomePage;
