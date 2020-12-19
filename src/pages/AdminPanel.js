import React, {useState, useEffect} from 'react';
import base from "../db/firebase"
import 'firebase/firestore';
import { Spinner } from "react-spinners-css";


const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const [pending, setPending] = useState(true)
    const [requests, setRequests] = useState([])
    const [requestImagesUrls, setRequestImagesUrls] = useState([])
    const [requestAudiosUrls, setRequestsAudioUrls] = useState([])


    const acceptSong = async (id) => {

        const body = {
            name : requests[id].name,
            author : requests[id].author,
            cover_image_uuid : requests[id].cover_image_uuid,
            audio_uuid :  requests[id].audio_uuid
        }

        const db = base.firestore();
        await db.collection('songs').add(body)

        await db.collection('requests').doc(requests[id].id).delete()
        
        window.alert("Akceptowano piosenkę")
    }
    const getSongLink = async () =>{

        try {
            const audioList = []
            const imageList = []
            for(let i = 0; i < requests.length; i++){
                const storageRef = base.storage().ref();
                const fileRef = storageRef.child(requests[i].cover_image_uuid)
                const fileRef2 = storageRef.child(requests[i].audio_uuid)
                imageList.push(await fileRef.getDownloadURL())
                audioList.push(await fileRef2.getDownloadURL())
            }
            setRequestImagesUrls(imageList)
            setRequestsAudioUrls(audioList)
        
        }catch(error){}
    }


    useEffect(() => {
        
        const fetchData = async () => {
            const db = base.firestore();
            const date = await db.collection("users")
            
            date.onSnapshot((data) => {
                setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })
        }

        fetchData();
        if(!!users){
            setPending(false)
        }
    }, []);


    useEffect(() => {
        
        const fetchData = async () => {
            const db = base.firestore();
            const date = await db.collection("requests")
            
            date.onSnapshot((data) => {
                setRequests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })
        }

        fetchData();
    }, []);

    useEffect(() => {

        getSongLink()
    }, [requests])


    if (pending) {
        return <div className="elipsis-padding-box">
            <Spinner color="grey"/>
        </div>;
    }

    return (
        <div>

            <div>Witaj w panelu administratora</div><br></br>
            <div>
                <div>Lista uzytkowników:</div>
                {users.map(user => (
                    <div>
                        {user.id}
                    </div>
                ))}
                <br></br>
                {requests.map((request, i) => (
                    <div>
                        <div>Autor - {request.author}</div>
                        <img className="cover-image" src={requestImagesUrls[i]}></img>
                        <a href={requestAudiosUrls[i]}> Nazwa - {request.name}</a>
                        <button onClick={() => acceptSong(i)}>Akceptuj</button> 
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;