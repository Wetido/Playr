import React, {useState, useEffect, useContext } from 'react';
import base from "../db/firebase"
import 'firebase/storage';
import "../css/song-list.css"

const Navbar = (props) => {


    const [songs, setSongs] = useState([])
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

    useEffect(() => {

        setSongs(props.songs)
    },[props.songs])

    useEffect(() =>{

        getSongLink()
    },[songs])

    return (
        <div className="song-list-wrapper">
            {songs.length !== 0 ? songs.map((song, i) => (
                <div className="song-wrapper"onClick={() => props.handleChangeSong(i)}>
                    <img className="cover-image" src={coverImageUrls[i]}></img>
                    <div className="song-name">{song.name}</div>
                </div>
            )) : null}
        </div>
        
    );
}

export default Navbar;