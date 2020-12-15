import React, {useState, useEffect} from 'react';
import "../css/add-song.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import base from "../db/firebase"
import 'firebase/firestore';

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
        const body = {
            name : songName,
            author : songAuthor
        }

        const db = base.firestore();

        await db.collection('songs').add(body)

    }

    useEffect(()=>{
        console.log(songName)
        console.log(songAuthor)
        console.log(coverImageFile)
        console.log(audioFile)
    },[songName])

    return (

        <div>
            <form>
                <input type="text" placeholder="Nazwa piosenki" value={songName} onChange={(e) => setSongName(e.target.value)}></input><br></br>
                <input type="text" placeholder="Autor" value={songAuthor} onChange={(e) => setSongAuthor(e.target.value)}></input><br></br>
                <input type="file" className="file-input" onChange={handleChangeCoverImage}></input><br></br>
                <input type="file" className="file-input" onChange={handleChangeAudio}></input><br></br>
            </form>
            <button onClick={()=>addData()}>Dodaj</button>
        </div>
    );
}

export default AddSong;
