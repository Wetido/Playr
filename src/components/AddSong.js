import React, {useState, useEffect} from 'react';
import "../css/add-song.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import base from "../db/firebase"
import 'firebase/firestore';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


const AddSong = () => {

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

    const addData = async () => {

        try { 
            const imageUuidTemp = uuidv4()
            const audioUuidTemp = uuidv4()

            const storageRef = base.storage().ref();
            const imageRef = storageRef.child(imageUuidTemp);
            const audioRef = storageRef.child(audioUuidTemp);

            await imageRef.put(coverImageFile);
            await audioRef.put(audioFile);

            const body = {
                name : songName,
                author : songAuthor,
                cover_image_uuid : imageUuidTemp,
                audio_uuid : audioUuidTemp
            }

            const db = base.firestore();

            await db.collection('songs').add(body)

            window.alert("Dodano piosenkę")
            
        }catch(error) {console.log(error)}
    }

    const validate = async (args1, args2) => {
        let proced1 = 0
        let proced2 = 0
        let proced3 = 0
        let proced4 = 0

        if (songName == null || songName == "")
        {
            window.alert("Enter song name!");
            
        }
        else
        {
            proced1 = 1
        }
        
        if (songAuthor == null || songAuthor == "")
        {
            window.alert("Enter author name!");
        }
        else
        {
            proced2 = 1
        }
        
        if (coverImageFile == null || coverImageFile == "")
        {
            window.alert("Upload song cover!");
        }
        else
        {
            proced3 = 1
        }
        
        if (audioFile == null || audioFile == "")
        {
            window.alert("upload song!");
        }
        else
        {
            proced4 = 1
        }


        if (proced1 == 1 && proced2 == 1 && proced3 == 1 && proced4 == 1)
        {
            addData()
        }
        
    }
    
    return (

        <div>
            <form>
                <input type="text" placeholder="Nazwa piosenki" value={songName} onChange={(e) => setSongName(e.target.value)}></input><br></br>
                <input type="text" placeholder="Autor" value={songAuthor} onChange={(e) => setSongAuthor(e.target.value)}></input><br></br>
                <input type="file" placeholder="okładka" className="file-input" onChange={handleChangeCoverImage}></input><br></br>
                <input type="file" className="file-input" onChange={handleChangeAudio}></input><br></br>
            </form>
            <button onClick={()=>validate()}>Dodaj</button>
        </div>
    );
}

export default AddSong;
