import React, {useState, useEffect} from 'react';
import Navbar from "../components/navbar"
import AddSong from "../components/AddSong"
import SongList from "../components/SongList"
import HomePage from "../components/HomePage"
import "../css/main.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import base from "../db/firebase"
import 'firebase/firestore';

const MainPage = () => {

    const [active, setActive] = useState(0)
    const [requests, setRequests] = useState([]);
    const [currentSongId, setCurrentSongId] = useState(0)

    const handleChangeSong = (id) => {
        console.log(id)
        setCurrentSongId(id)
    }
    
    useEffect(() => {
        
        const fetchData = async () => {
            const db = base.firestore();
            const date = await db.collection("songs")
            
            date.onSnapshot((data) => {
                setRequests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })
        }

        fetchData();
    }, []);



    return (

        <div className="main-container">
            <Navbar songs={requests} currentSongId={currentSongId}></Navbar> 
            <div className="row">
                <div className="menu col-sm-2 card">
                    <ul class="list-group list-group-flush">
                        <li class={active === 0 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(0)}>Home</li>
                        <li class={active === 1 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(1)}>Explore</li>
                        <li class={active === 2 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(2)}>Search</li>
                        <li class={active === 3 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(3)}>Liblary</li>
                        <li class={active === 4 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(4)}>Accound & Settings</li>
                        <li class={active === 5 ? "active list-group-item" : "inactive list-group-item"} onClick={() => setActive(5)}>Add song</li>
                    </ul>
                </div>
                <div className="main col-sm-9 card">
                    {active === 0 ? <HomePage></HomePage> : null} 
                    {active === 3 ? <SongList songs={requests} handleChangeSong={handleChangeSong}></SongList> : null}
                    {active === 5 ? <AddSong></AddSong> : null}

                </div>
            </div>
        </div>
    );
}

export default MainPage;
