import React, {useState, useEffect} from 'react';
import base from "../db/firebase"
import 'firebase/firestore';
import { Spinner } from "react-spinners-css";
import {Button} from "react-bootstrap"
import "../css/admin-panel.css"


const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const [pending, setPending] = useState(true)
    const [requests, setRequests] = useState([])
    const [requestImagesUrls, setRequestImagesUrls] = useState([])
    const [requestAudiosUrls, setRequestsAudioUrls] = useState([])


    const changeUserBanStatus = async (id, status) => {

        const body = {
            banned: status
        }

        const db = base.firestore()
        await db.collection('users').doc(id).set(body, {merge: true});
    }

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
        <div className="admin-wrapper">
            <div className="main-header">Witaj w panelu administratora</div><br></br>
            <div>
                <div className="header">Lista uzytkowników:</div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Użytkownik</th>
                                <th scope="col">Ban</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map((user,i) => (
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{user.id}</td>
                                <th>{user.banned === false ? <Button className="btn-danger" onClick={() => changeUserBanStatus(user.id, true)}>Zbanuj</Button> 
                                    : <Button className="btn-secondary" onClick={()=>changeUserBanStatus(user.id, false)}>Odbanuj</Button>}</th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                <br></br>

                <div className="header">Lista requestów:</div>
                <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nazwa</th>
                                <th scope="col">Autor</th>
                                <th scope="col">Okladka</th>
                                <th scope="col">Plik</th>
                                <th scope="col">Dodał</th>
                                <th scope="col">Akceptuj</th>
                            </tr>
                        </thead>
                        <tbody>
                        {requests.map((request,i) => (
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{request.name}</td>
                                <td>{request.author}</td>
                                <td><a href={requestImagesUrls[i]} target="_blank"><img className="cover-image" src={requestImagesUrls[i]}></img></a></td>
                                <td><a href={requestAudiosUrls[i]} target="_blank">Odsłuchaj</a></td>
                                <td>{request.user}</td>
                                <td><Button onClick={() => acceptSong(i)}>Akceptuj</Button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
        </div>
    );
}

export default AdminPanel;